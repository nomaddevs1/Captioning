from typing import List, BinaryIO
from pydantic import BaseModel
from utils import srt_time_to_seconds
from .util import chunkify_mp3, compress_audio_file
import re
import openai
import os


class TranscriptBlock(BaseModel):
    start: float
    end: float
    text: str

    def from_data(start: float, end: float, text: str) -> "TranscriptBlock":
        return TranscriptBlock(start=start, end=end, text=text)

    def from_dict(data: dict) -> "TranscriptBlock":
        return TranscriptBlock.from_data(**data)


class Transcript(BaseModel):
    transcript: List[TranscriptBlock] = []

    def from_blocks(blocks: List[TranscriptBlock]) -> "Transcript":
        return Transcript(transcript=blocks)

    def from_srt(srt_response: str) -> "Transcript":
        transcript: List[TranscriptBlock] = []
        srt_blocks = srt_response.strip().split("\n\n")

        for block in srt_blocks:
            lines = block.strip().split("\n")
            if len(lines) >= 3:
                # Extract the index, time range, and text
                time_range = lines[1]
                text = " ".join(lines[2:])

                # Extract the start and end times
                match = re.match(r"(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)", time_range)
                if match:
                    start_time_str, end_time_str = match.groups()
                    start_time = srt_time_to_seconds(start_time_str)
                    end_time = srt_time_to_seconds(end_time_str)

                    # Append the data to the transcript data list
                    transcript.append(
                        TranscriptBlock.from_data(start_time, end_time, text)
                    )

        return Transcript.from_blocks(transcript)

    def from_dict(data: list) -> "Transcript":
        blocks: List[TranscriptBlock] = []
        for block in data:
            blocks.append(TranscriptBlock.from_dict(block))

        return Transcript.from_blocks(blocks)

    def __add__(self, other: "Transcript") -> "Transcript":
        """
        This allows for appending transcripts with the + operator.

        The "other" transcript will have it's start and end times increased by
        whatever the last end time in the "self" transcript is.

        ex.
        mega_transcript = transcript1 + transcript2
                          ^ self        ^ other
        """
        self_blocks_copy = [block.model_copy() for block in self.transcript]
        other_blocks_copy = [block.model_copy() for block in other.transcript]
        self_end_time = self_blocks_copy[-1].end

        # update the times for the transcript on the right hand side of the
        # expression "self + other"
        for block in other_blocks_copy:
            block.start += self_end_time
            block.end += self_end_time

        return Transcript.from_blocks(self_blocks_copy + other_blocks_copy)

    def __iadd__(self, other):
        """
        This allows for appending transcripts using the += operator

        See `Transcript.__add__()`
        """
        return self + other


def transcribe_files(
    files: List[BinaryIO], language: str, file_size_limit: int
) -> Transcript:
    transcript: Transcript = None
    for file in files:
        if transcript == None:
            transcript = transcribe_file(file, language, file_size_limit)
        else:
            transcript += transcribe_file(file, language, file_size_limit)

    # close the temporary audio files; since they were created using tempfile,
    # they should be automatically deleted when we close them.
    for file in files:
        file.close()

    return transcript


def transcribe_file(file: BinaryIO, language: str, file_size_limit: int) -> Transcript:
    """
    Transcribe an audio file using the Whisper API. If the file is over the limit
    imposed by `file_size_limit`, it is split into chunks of audio that contain
    less than `file_size_limit` bytes.

    Potentially raises a pydub.exceptions.CouldntDecodeError
    """
    file.seek(0, os.SEEK_END)  # find the end of the file
    file_size_bytes = file.tell()  # get the size of the file in bytes
    file.seek(0, os.SEEK_SET)  # return the file pointer to the beginning of the file

    transcript = None
    if file_size_bytes > file_size_limit:
        # if the file size exceeds the limit of the Whisper API (25 MB), split
        # the audio into multiple files:
        compressed_audio_file, compressed_file_size = compress_audio_file(file)
        if compressed_file_size > file_size_limit:
            files = chunkify_mp3(
                compressed_audio_file, compressed_file_size, file_size_limit
            )
            transcript = transcribe_files(files, language, file_size_limit)
        else:
            whisper_transcript_srt = openai.Audio.transcribe(
                compressed_audio_file,
                model="whisper-1",
                response_format="srt",
                language=language,
            )
            transcript = Transcript.from_srt(whisper_transcript_srt)
    else:
        whisper_transcript_srt = openai.Audio.transcribe(
            file, model="whisper-1", response_format="srt", language=language
        )
        transcript = Transcript.from_srt(whisper_transcript_srt)

    return transcript
