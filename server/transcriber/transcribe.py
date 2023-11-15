from typing import List, BinaryIO
from pydantic import BaseModel
from utils import srt_time_to_seconds
from .util import chunkify
import re
import openai
import os


class TranscriptBlock(BaseModel):
    start: str
    end: str
    text: str


class Transcript(BaseModel):
    blocks: TranscriptBlock = []

    def __init__(self, blocks: List[TranscriptBlock] = []):
        self.blocks = blocks

    def from_srt(srt_response: str) -> "Transcript":
        blocks: List[TranscriptBlock] = []
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
                    blocks.append(TranscriptBlock(start_time, end_time, text))

        return Transcript(blocks)

    def __add__(self, other: "Transcript") -> "Transcript":
        """
        This allows for appending transcripts with the + operator.

        The "other" transcript will have it's start and end times increased by
        whatever the last end time in the "self" transcript is.

        ex.
        mega_transcript = transcript1 + transcript2
                          ^ self        ^ other
        """
        self_blocks_copy = [block for block in self.blocks]
        other_blocks_copy = [block for block in other.blocks]
        self_end_time = self_blocks_copy[-1].end

        # update the times for the transcript on the right hand side of the
        # expression "self + other"
        for block in other_blocks_copy:
            block.start += self_end_time
            block.end += self_end_time

        return Transcript(self_blocks_copy + other_blocks_copy)

    def __iadd__(self, other):
        """
        This allows for appending transcripts using the += operator

        See `Transcript.__add__()`
        """
        return self + other


def transcribe_files(files: List[BinaryIO], language: str) -> Transcript:
    transcript: Transcript = None
    for file in files:
        if transcript == None:
            transcript = transcribe_file(file, language)
        else:
            transcript += transcribe_file(file, language)

    return transcript


def transcribe_file(file: BinaryIO, language: str) -> Transcript:
    file.seek(os.SEEK_END)  # find the end of the file
    file_size_bytes = file.tell()  # get the size of the file in bytes
    file.seek(os.SEEK_SET, 0)  # return the file pointer to the beginning of the file

    transcript = None
    if file_size_bytes > 25_000_000:
        # if the file size exceeds the limit of the Whisper API (25 MB), split
        # the audio into multiple files:
        files = chunkify(file, 25_000_000)
        transcript = transcribe_files(files)
    else:
        whisper_transcript_srt = openai.Audio.transcribe(
            file, model="whisper-1", response_format="srt", language=language
        )
        # os.remove(audio_filename)  # Optionally delete the audio file after processing
        transcript = Transcript.from_srt(whisper_transcript_srt)

    return transcript
