# tests/test_main.py

import sys
from io import BytesIO
from pathlib import Path
from unittest.mock import MagicMock, mock_open, patch

import pytest
from fastapi.testclient import TestClient

# Add the parent directory to sys.path so the server module can be found
sys.path.append(str(Path(__file__).resolve().parents[1]))

from server import app, duration_detector, parse_srt, srt_time_to_seconds

# This is the mocked response from the OpenAI API.
mock_transcription_response = """
1
00:00:00,000 --> 00:00:09,880
The Speech-to-Text API provides two endpoints, transcription and translation based upon your

2
00:00:09,880 --> 00:00:16,440
state-of-the-art open source large V2 Whisper model.

3
00:00:16,440 --> 00:00:21,340
They can be used to transcribe audio into whatever language the audio is in, translate

4
00:00:21,340 --> 00:00:23,640
and transcribe the audio into English.

5
00:00:23,640 --> 00:00:30,000
The uploads are currently limited to 25 MB and the following input file types are supported

6
00:00:30,000 --> 00:00:36,760
MP3, MP4, MPEG, MPGA, M4A, WAV and WEB.

7
00:00:36,760 --> 00:00:38,320
Quick Stats Transcription

8
00:00:38,320 --> 00:00:43,800
The Transcription API takes as an input audio file you want to transcribe and describes

9
00:00:43,800 --> 00:00:46,560
output file formats for the transcription of the audio.

10
00:00:46,560 --> 00:00:50,760
We currently support multiple input and output files.

11
00:00:50,760 --> 00:00:55,240
By default, the response type will be JSON with the raw text included.

12
00:00:55,240 --> 00:01:00,600
Texts imagine the wildest ideas that you have ever had and you are curious about how it

13
00:01:00,600 --> 00:01:06,280
might scale to something that is a 100, 1000 times bigger.

14
00:01:06,280 --> 00:01:11,600
To set additional parameters in the request, you can add more dash dash form lines with

15
00:01:11,600 --> 00:01:13,320
the relevant options.

16
00:01:13,320 --> 00:01:18,120
For example, if you want to set the output format as text, you would add the following

17
00:01:18,120 --> 00:01:19,880
line.

18
00:01:20,200 --> 00:01:26,160
The Transcription API takes as an input the audio file in any of the supported languages

19
00:01:26,160 --> 00:01:29,640
and transcribe, if necessary, the audio to English.

20
00:01:29,640 --> 00:01:34,320
It differs from our transcription endpoints since the output is not the original input

21
00:01:34,320 --> 00:01:39,120
language and is instead translated to English text.

22
00:01:39,120 --> 00:01:43,160
Hello, my name is Wolfgang and I come from Germany.

23
00:01:43,160 --> 00:01:44,680
Where are you heading today?
"""  # Include the full string you provided earlier here.


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


@pytest.fixture
def mock_openai_transcribe():
    with patch(
        "server.openai.Audio.transcribe",
        return_value=mock_transcription_response,
    ) as mock:
        yield mock


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
def test_parse_srt():
    transcribe_data = parse_srt(mock_transcription_response)
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


def test_transcribe_endpoint(mock_openai_transcribe, mock_audioread, client):
    audio_content = b"fake audio file content"
    audio_buffer = BytesIO(audio_content)
    audio_buffer.name = "testfile.mp3"

    response = client.post(
        "/transcribe/",
        files={"audio_file": (audio_buffer.name, audio_buffer, "audio/mpeg")},
        params={"language": "en"},
    )

    assert response.status_code == 200, response.text

    # Extracting the response data to assert on the transcription content
    response_data = response.json()
    assert "transcription" in response_data

    # Asserting on the length of the transcription
    # (You need to adjust this according to the expected number of transcriptions)
    assert len(response_data["transcription"]) == 23

    # Assert on the actual content of the first and last transcription texts
    assert response_data["transcription"][0]["text"].startswith(
        "The Speech-to-Text API provides"
    )
    assert response_data["transcription"][-1]["text"] == "Where are you heading today?"
