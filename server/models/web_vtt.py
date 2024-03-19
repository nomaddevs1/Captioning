from pydantic import BaseModel
from typing import List


class WebVTTCue(BaseModel):
    id: str = None
    start: float
    end: float
    payload: str


class WebVTTData(BaseModel):
    cues: List[WebVTTCue]
