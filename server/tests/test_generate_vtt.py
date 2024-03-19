import pytest
from typing import Generator
from models.web_vtt import WebVTTData, WebVTTCue
import json

from utils.generate_vtt import generate_vtt


@pytest.fixture
def basic_vtt_data() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/basic_data.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(cues=data)
        

@pytest.fixture
def basic_vtt_data_with_ids() -> Generator[WebVTTData, None, None]:
    with open("tests/fixtures/vtt/basic_data_with_ids.json", "r") as file:
        data = json.load(file)
        yield WebVTTData(cues=data)


def test_generate_vtt_with_basic_data(basic_vtt_data):
    vtt_str = generate_vtt(basic_vtt_data)
    
    with open("tests/fixtures/vtt/basic_data.vtt", "r") as file:
        expected = file.read()
        assert vtt_str == expected


def test_generate_vtt_with_basic_data_with_ids(basic_vtt_data_with_ids):
    vtt_str = generate_vtt(basic_vtt_data_with_ids)
    
    with open("tests/fixtures/vtt/basic_data_with_ids.vtt", "r") as file:
        expected = file.read()
        print(expected)
        print(vtt_str)
        assert vtt_str == expected
    
