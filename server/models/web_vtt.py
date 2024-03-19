from pydantic import BaseModel, constr
from typing import List, Literal, Union


class WebVTTCueOptions(BaseModel):
    # vertical: Literal["lr", "rl"] = None
    vertical: str = None
    line: str = None
    position: str = None
    size: str = None
    # align: Literal["start", "center", "end"] = None
    align: str = None
    

class WebVTTCue(BaseModel):
    id: str = None
    start: float
    end: float
    payload: str
    options: WebVTTCueOptions = None


class WebVTTData(BaseModel):
    cues: List[WebVTTCue]
