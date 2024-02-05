from pydantic import BaseModel
from typing import List
from transcriber import TranscriptBlock


class TranscriptSettings(BaseModel):
    bg_color: str = None
    font_color: str = None
    font_size: str = None
    font: str = None
    line_height: str = None
    word_spacing: str = None
    font_weight: str = None
    font_style: str = None
    text_decoration: str = None


class TranscriptDataModel(BaseModel):
    settings: TranscriptSettings = None
    transcript: List[TranscriptBlock] = None
    raw_html: str = None
