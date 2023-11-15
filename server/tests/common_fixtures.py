from fastapi.testclient import TestClient
from transcriber import Transcript
import pytest
from unittest.mock import patch
import json
from server import app


@pytest.fixture
def mock_transcript() -> dict():
    with open("tests/fixtures/transcript.json", "r") as file:
        data = json.load(file)
        yield Transcript.from_dict(data)


@pytest.fixture
def mock_client() -> TestClient:
    with TestClient(app) as c:
        yield c


@pytest.fixture
def mock_srt_response() -> str:
    with open("tests/fixtures/srt_response.txt", "r") as file:
        yield file.read()


@pytest.fixture
def mock_openai_transcribe(mock_srt_response):
    with patch(
        "server.openai.Audio.transcribe",
        return_value=mock_srt_response,
    ) as mock:
        yield mock
