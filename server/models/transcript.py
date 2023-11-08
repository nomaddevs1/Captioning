from pydantic import BaseModel


class TranscriptBlock(BaseModel):
    start: str
    end: str
    text: str


class TranscriptSettings(BaseModel):
    bg_color: str = None
    font_color: str = None
    font_size: str = None
    font: str = None


class TranscriptData(BaseModel):
    settings: TranscriptSettings
    transcript: list[TranscriptBlock]
