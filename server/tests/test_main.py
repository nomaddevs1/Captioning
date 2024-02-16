# tests/test_main.py

import sys
from io import BytesIO
from pathlib import Path
from unittest.mock import MagicMock, mock_open, patch

import pytest
from fastapi.testclient import TestClient

# Add the parent directory to sys.path so the server module can be found
sys.path.append(str(Path(__file__).resolve().parents[1]))
from utils import duration_detector, parse_srt, srt_time_to_seconds
from common_fixtures import (
    mock_client,
    srt_response,
    transcript,
    mock_openai_transcribe,
)
from server import app


# Testing srt_time_to_seconds function
def test_srt_time_to_seconds():
    assert srt_time_to_seconds("00:01:02,000") == 62
    assert srt_time_to_seconds("01:00:00,000") == 3600
    assert srt_time_to_seconds("00:00:00,500") == 0.5


# Testing duration_detector function
def test_duration_detector():
    assert duration_detector(3665) == (1, 1, 5)
    assert duration_detector(60) == (0, 1, 0)
    assert duration_detector(125) == (0, 2, 5)


# Testing parse_srt function
def test_parse_srt(srt_response):
    transcribe_data = parse_srt(srt_response)
    assert (
        len(transcribe_data) == 23
    )  # Assuming there are 23 entries in the full SRT string.
    assert transcribe_data[0]["text"].startswith("The Speech-to-Text API provides")
    assert transcribe_data[-1]["text"] == "Where are you heading today?"


class MockAudioFile:
    # Simulate the behavior of the audioread API as needed for your tests
    duration = 300  # for example, 5 minutes

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        pass

    # Add other methods and properties as required by your application code


@pytest.fixture
def mock_audioread():
    with patch("audioread.audio_open", return_value=MockAudioFile()) as mock:
        yield mock


def test_transcribe_endpoint(mock_openai_transcribe, mock_audioread, mock_client):
    audio_content = b"fake audio file content"
    audio_buffer = BytesIO(audio_content)
    audio_buffer.name = "testfile.mp3"

    response = mock_client.post(
        "/transcribe/",
        files={"audio_file": (audio_buffer.name, audio_buffer, "audio/mpeg")},
        params={"language": "en"},
    )

    assert response.status_code == 200, response.text

    # Extracting the response data to assert on the transcription content
    response_data = response.json()
    assert "transcript" in response_data

    # Asserting on the length of the transcription
    # (You need to adjust this according to the expected number of transcriptions)
    assert len(response_data["transcript"]) == 23

    # Assert on the actual content of the first and last transcription texts
    assert response_data["transcript"][0]["text"].startswith(
        "The Speech-to-Text API provides"
    )
    assert response_data["transcript"][-1]["text"] == "Where are you heading today?"
