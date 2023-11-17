from fastapi.testclient import TestClient
from transcriber import Transcript
import pytest
from unittest.mock import patch
import json
from server import app

@pytest.fixture
def transcript_dict() -> dict:
    with open("tests/fixtures/transcript.json", "r") as file:
        data = json.load(file)
        yield data


@pytest.fixture
def transcript(transcript_dict) -> Transcript:
    yield Transcript.from_dict(transcript_dict)


@pytest.fixture
def mock_client() -> TestClient:
    with TestClient(app) as c:
        yield c


@pytest.fixture
def srt_response() -> str:
    with open("tests/fixtures/srt_response.txt", "r") as file:
        yield file.read()


@pytest.fixture
def mock_openai_transcribe(srt_response):
    with patch(
        "server.openai.Audio.transcribe",
        return_value=srt_response,
    ) as mock:
        yield mock
