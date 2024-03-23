import pytest
from typing import Generator
import json
from io import BytesIO
from unittest.mock import patch
from models.web_vtt import WebVTTData
from common_fixtures import (
    mock_client,
    mock_openai_transcribe,
    srt_response,
    transcript,
    transcript_dict,
)
from utils.generate_vtt import generate_vtt, vtt_timestamp


@pytest.fixture
def basic_vtt_data() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/basic_data.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(**data)


@pytest.fixture
def basic_vtt_data_with_ids() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/basic_data_with_ids.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(**data)


@pytest.fixture
def advanced_vtt_data() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/advanced_data.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(**data)


@pytest.fixture
def advanced_vtt_data_with_styles() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/advanced_data_with_styles.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(**data)


@pytest.fixture
def mock_transcribe(transcript):
    with patch(
        "server.transcribe_route.transcribe_file", return_value=transcript
    ) as mock:
        yield mock


# ========================== UNIT TESTS ==========================


def test_vtt_timestamp():
    times = [1.23, 1000.12, 1023, 49922.123]

    expected = [
        "00:00:01.230",
        "00:16:40.120",
        "00:17:03.000",
        "13:52:02.123",
    ]

    for time, expected in zip(times, expected):
        assert vtt_timestamp(time) == expected


def test_generate_vtt_with_basic_data(basic_vtt_data):
    vtt_str = generate_vtt(basic_vtt_data)

    with open("tests/fixtures/vtt/basic_data.vtt", "r") as file:
        expected = file.read()
        assert vtt_str == expected


def test_generate_vtt_with_basic_data_with_ids(basic_vtt_data_with_ids):
    vtt_str = generate_vtt(basic_vtt_data_with_ids)

    with open("tests/fixtures/vtt/basic_data_with_ids.vtt", "r") as file:
        expected = file.read()
        assert vtt_str == expected


def test_generate_vtt_with_advanced_data(advanced_vtt_data):
    vtt_str = generate_vtt(advanced_vtt_data)

    with open("tests/fixtures/vtt/advanced_data.vtt", "r") as file:
        expected = file.read()
        assert vtt_str == expected


def test_generate_vtt_with_advanced_data_with_styles(advanced_vtt_data_with_styles):
    vtt_str = generate_vtt(advanced_vtt_data_with_styles)

    with open("tests/fixtures/vtt/advanced_data_with_styles.vtt", "r") as file:
        expected = file.read()
        assert vtt_str == expected


# =========================== API TESTS ==========================


def test_generate_vtt_route_successful(
    mock_client,
    basic_vtt_data,
    basic_vtt_data_with_ids,
    advanced_vtt_data,
    advanced_vtt_data_with_styles,
):
    vtt_fixture_paths = [
        "tests/fixtures/vtt/basic_data.vtt",
        "tests/fixtures/vtt/basic_data_with_ids.vtt",
        "tests/fixtures/vtt/advanced_data.vtt",
        "tests/fixtures/vtt/advanced_data_with_styles.vtt",
    ]

    vtt_data = [
        basic_vtt_data,
        basic_vtt_data_with_ids,
        advanced_vtt_data,
        advanced_vtt_data_with_styles,
    ]

    for data, fixture_path in zip(vtt_data, vtt_fixture_paths):
        print(f"testing {fixture_path.split('/')[-1]}")
        response = mock_client.post(
            "/generate-vtt/", json=data.model_dump(exclude_none=True)
        )
        assert response.status_code == 200
        assert response.headers.get("Content-Type") == "text/vtt; charset=utf-8"

        with open(fixture_path, "rb") as file:
            assert response.content == file.read()


def test_generate_vtt_route_bad_data(mock_client):
    data = {"cues": [{"id": "1"}]}

    response = mock_client.post("/generate-vtt/", json=data)
    assert response.status_code == 422

    data = {"cues": [{"id": "1", "start": 12, "end": 13}]}

    response = mock_client.post("/generate-vtt/", json=data)
    assert response.status_code == 422

    data = {"cues": [{"id": "1", "start": 12, "end": 13, "payload": ["hello world"]}]}

    response = mock_client.post("/generate-vtt/", json=data)
    assert response.status_code == 422


def test_transcribe_returns_vtt(mock_transcribe, mock_client):
    video_buffer = BytesIO(b"random bytes in the BytesIO buffer")
    video_buffer.name = "testfile.mp4"

    response = mock_client.post(
        "/transcribe/",
        files={"audio_file": (video_buffer.name, video_buffer, "video/mp4")},
        params={"language": "en", "format": "vtt"},
    )

    video_buffer.close()
    assert response.status_code == 200
    assert response.content
    assert response.headers.get("Content-Type") == "text/vtt; charset=utf-8"
