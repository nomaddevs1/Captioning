from common_fixtures import srt_response, transcript, mock_openai_transcribe
from typing import Tuple
from transcriber import Transcript
from pydub import AudioSegment
from transcriber.util import chunkify_audio_file
from tempfile import NamedTemporaryFile
import os


def generate_silent_audio_segment(
    desired_file_size_bytes: int, bits_per_sample: int, channels: int, sample_rate: int
) -> Tuple[AudioSegment, int]:
    bit_rate = bits_per_sample * sample_rate * channels
    duration = (8 * desired_file_size_bytes - 44) / bit_rate
    frames = int(sample_rate * duration)
    data = b"\0" * (frames * (bits_per_sample * channels // 8))

    audio = AudioSegment(
        data=data,
        metadata={
            "channels": channels,
            "sample_width": bits_per_sample // 8,
            "frame_rate": sample_rate,
            "frame_width": bit_rate,
        },
    )

    return audio, bit_rate


def test_transcript_from_srt(srt_response):
    transcript = Transcript.from_srt(srt_response)

    assert len(transcript.transcript) == 23

    assert (
        transcript.transcript[0].text
        == "The Speech-to-Text API provides two endpoints, transcription and translation based upon your"
    )
    assert transcript.transcript[0].start == 0
    assert transcript.transcript[0].end == 9.88

    assert transcript.transcript[-1].text == "Where are you heading today?"
    assert transcript.transcript[-1].start == 103.16
    assert transcript.transcript[-1].end == 104.68


def test_transcript_append(transcript):
    transcript1 = transcript
    transcript2 = transcript

    # test addition operator
    big_transcript = transcript1 + transcript2
    assert len(big_transcript.transcript) == 6
    assert big_transcript.transcript[0].text == big_transcript.transcript[3].text
    assert big_transcript.transcript[3].start == 28
    assert big_transcript.transcript[3].end == 33

    # test value increment operator
    transcript3 = transcript
    big_transcript += transcript3
    assert len(big_transcript.transcript) == 9
    assert big_transcript.transcript[0].text == big_transcript.transcript[6].text
    assert big_transcript.transcript[6].start == 54
    assert big_transcript.transcript[6].end == 59


def test_chunkify_wav():
    audio, bitrate = generate_silent_audio_segment(
        desired_file_size_bytes=101_000_000,  # 101 MB
        bits_per_sample=16,  # cd quality
        channels=2,  # stereo audio
        sample_rate=44_100,  # 44.1 kHz
    )

    file = NamedTemporaryFile("w+b", suffix=".wav")
    filename = file.name

    audio.export(filename, "wav", bitrate=bitrate)
    file.seek(0, os.SEEK_END)

    chunks = chunkify_audio_file(file, 25_000_000)
    assert len(chunks) == 5

    for chunk in chunks:
        chunk.seek(0, os.SEEK_END)
        assert chunk.tell() <= 25_000_000
        chunk.close()

    file.close()


def test_transcribe_le_25MB_file(mock_openai_transcribe):
    pass
