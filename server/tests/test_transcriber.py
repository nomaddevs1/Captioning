from typing import Tuple
from transcriber import Transcript
from pydub import AudioSegment
from tempfile import NamedTemporaryFile
import os

from common_fixtures import srt_response, transcript_dict, transcript, mock_openai_transcribe, mock_client
from transcriber import transcribe_file
from transcriber.util import chunkify_mp3


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


def test_chunkify_mp3():
    audio, _ = generate_silent_audio_segment(
        desired_file_size_bytes=1_000_000,  # 1 MB
        bits_per_sample=16,  # cd quality
        channels=2,  # stereo audio
        sample_rate=44_100,  # 44.1 kHz
    )

    file = NamedTemporaryFile("w+b", suffix=".mp3")
    filename = file.name

    audio.export(filename, "mp3", bitrate="64k")
    file.seek(0, os.SEEK_END)
    file_size = file.tell()
    file.seek(0, os.SEEK_SET)

    chunks = chunkify_mp3(file, file_size, 10_000)

    for chunk in chunks:
        chunk.seek(0, os.SEEK_END)
        assert chunk.tell() <= 1_000_000
        chunk.close()

    file.close()


def test_transcribe_large_file(mock_openai_transcribe):
    audio, _ = generate_silent_audio_segment(
        desired_file_size_bytes=1_000_000,  # 1 MB
        bits_per_sample=16,  # cd quality
        channels=2,  # stereo audio
        sample_rate=44_100,  # 44.1 kHz
    )

    file = NamedTemporaryFile("w+b", suffix=".wav")
    audio.export(file.name, "wav", bitrate="64k")
    transcript_result = transcribe_file(file, "english", 10_000)

    assert len(transcript_result.transcript) == 138


def test_transcribe_compressable_to_lt_25MB_file(mock_openai_transcribe):
    audio, _ = generate_silent_audio_segment(
        desired_file_size_bytes=101_000_000,  # 101 MB
        bits_per_sample=16,  # cd quality
        channels=2,  # stereo audio
        sample_rate=44_100,  # 44.1 kHz
    )

    file = NamedTemporaryFile("w+b", suffix=".wav")
    audio.export(file.name, "wav")
    transcript_result = transcribe_file(file, "english", 25_000_000)

    assert len(transcript_result.transcript) == 23

def test_transcribe_route_filetype_validation(mock_openai_transcribe, mock_client):
    audio, _ = generate_silent_audio_segment(
        desired_file_size_bytes=1_000_000,  # 1 MB
        bits_per_sample=16,  # cd quality
        channels=2,  # stereo audio
        sample_rate=44_100,  # 44.1 kHz
    )

    file = NamedTemporaryFile("w+b", suffix=".flac")
    audio.export(file.name, "flac", bitrate="64k")

    response = mock_client.post("/transcribe/", files={"audio_file": {"test.flac", file, "audio/x-flac" }})
    assert response.status_code == 400
