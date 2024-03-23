from fastapi.testclient import TestClient
from transcriber import Transcript
import pytest
from unittest.mock import patch
import json
from typing import Generator
from server import app


@pytest.fixture
def transcript_dict() -> Generator[dict, None, None]:
    with open("tests/fixtures/transcript.json", "r") as file:
        data = json.load(file)
        yield data


@pytest.fixture
def transcript(transcript_dict) -> Generator[Transcript, None, None]:
    yield Transcript.from_dict(transcript_dict)


@pytest.fixture
def mock_client() -> Generator[TestClient, None, None]:
    with TestClient(app) as c:
        yield c


@pytest.fixture
def srt_response() -> Generator[str, None, None]:
    with open("tests/fixtures/srt_response.txt", "r") as file:
        yield file.read()


@pytest.fixture
def mock_openai_transcribe(srt_response):
    with patch(
        "server.openai.Audio.transcribe",
        return_value=srt_response,
    ) as mock:
        yield mock
