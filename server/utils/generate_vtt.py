from models.web_vtt import WebVTTData, WebVTTCueOptions
from typing import List, TextIO
import math


def vtt_timestamp(seconds) -> str:
    h = int(seconds // 3600)
    m = int((seconds // 60) % 60)
    s = math.floor(seconds) % 60
    x = int((seconds * 1000) % 1000)  # milliseconds

    return f"{h:02d}:{m:02d}:{s:02d}.{x:03d}"


def vtt_append_timestamp_and_options_line(
    start: str, end: str, options: WebVTTCueOptions, lines: List[str]
):
    option_strs = []

    if options:
        append_kv = lambda k, v: option_strs.append(f"{k}:{v}")

        potential_kv_tuples = [
            ("vertical", options.vertical),
            ("line", options.line),
            ("position", options.position),
            ("size", options.size),
            ("align", options.align),
        ]

        for pkvt in potential_kv_tuples:
            if pkvt[1]:
                append_kv(*pkvt)

        lines.append(f'{start} --> {end} {" ".join(option_strs)}')
    else:
        lines.append(f"{start} --> {end}")


def vtt_append_styles(styles: List[tuple], lines):
    if len(styles) > 0:
        lines.append("STYLE\n")

        for id, style in styles:
            if id:
                lines.append(f'::cue(#{id}) {"{"}')
            else:
                lines.append("::cue {")
            for property, value in style.items():
                lines.append(f"  {property}: {value};")

            lines.append("}\n")


def generate_vtt(data: WebVTTData) -> str:
    lines = ["WEBVTT\n"]

    style_tuples = []
    if data.style:
        style_tuples.append((None, data.style))

    for cue in data.cues:
        if cue.style and cue.id:
            style_tuples.append((cue.id, cue.style))

    # write styles
    vtt_append_styles(style_tuples, lines)

    # write cue data (caption data for a given time period)
    for cue in data.cues:
        if cue.id:
            lines.append(cue.id)

        start_time = vtt_timestamp(cue.start)
        end_time = vtt_timestamp(cue.end)
        vtt_append_timestamp_and_options_line(start_time, end_time, cue.options, lines)

        for line in cue.payload:
            lines.append(line)

        lines.append("")  # for an extra newline

    return "\n".join(lines)
