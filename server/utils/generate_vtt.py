from models.web_vtt import WebVTTData, WebVTTCue
from .render_template import render_template

def generate_vtt(data: WebVTTData) -> str:
    vtt_str = render_template("transcript.vtt", cues=data.cues)
    return vtt_str