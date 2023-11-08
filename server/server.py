import os
import re

import audioread
import openai
from fastapi import FastAPI, Form, UploadFile
from fastapi.responses import JSONResponse, Response
from pydub import AudioSegment

from models import TranscriptData
from pdf_generator import render_html, generate_pdf

OPEN_API_KEY = os.environ.get("OPENAI_API_KEY")
openai.api_key = OPEN_API_KEY

app = FastAPI()


def parse_srt(srt_string):
    # Split the SRT string into blocks
    blocks = srt_string.strip().split("\n\n")
    transcript_data = []

    for block in blocks:
        lines = block.strip().split("\n")
        if len(lines) >= 3:
            # Extract the index, time range, and text
            index = int(lines[0])
            time_range = lines[1]
            text = " ".join(lines[2:])

            # Extract the start and end times
            match = re.match(r"(\d+:\d+:\d+,\d+) --> (\d+:\d+:\d+,\d+)", time_range)
            if match:
                start_time_str, end_time_str = match.groups()
                start_time = srt_time_to_seconds(start_time_str)
                end_time = srt_time_to_seconds(end_time_str)

                # Append the data to the transcript data list
                transcript_data.append(
                    {"start": start_time, "end": end_time, "text": text}
                )

    return transcript_data


def srt_time_to_seconds(time_str):
    # Convert an SRT time string to seconds
    hours, minutes, seconds, milliseconds = map(int, re.split(r"[:,]", time_str))
    return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000


def duration_detector(length):
    hours = length // 3600
    length %= 3600
    mins = length // 60
    length %= 60
    seconds = length

    return hours, mins, seconds


@app.post("/transcribe/")
async def transcribe_audio(audio_file: UploadFile, language: str):
    audio_filename = audio_file.filename
    with open(audio_filename, "wb") as f:
        f.write(audio_file.file.read())

    with audioread.audio_open(audio_filename) as audio_file:
        totalsec = audio_file.duration
        hours, mins, seconds = duration_detector(int(totalsec))
        print(f"Total Duration: {hours}:{mins}:{seconds}")

    with open(audio_filename, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            file=audio_file, model="whisper-1", response_format="srt", language=language
        )

    # os.remove(audio_filename)  # Optionally delete the audio file after processing
    transcribe_data = parse_srt(transcript)
    return JSONResponse(content={"transcription": transcribe_data})


@app.post("/generate-pdf/")
async def generate_pdf_route(transcript_data: TranscriptData):
    if transcript_data.raw_html:
        if transcript_data.transcript:
            return JSONResponse(
                {"error": "Cannot provide raw transcript data and raw html."}, 401
            )
        html_str = transcript_data.raw_html
    elif transcript_data.transcript:
        data = dict(transcript_data)
        html_str = render_html(data)
    else:
        return JSONResponse({"error": "No transcription content provided."}, 401)

    pdf_data = generate_pdf(html_str)

    return Response(content=pdf_data, media_type="application/pdf", status_code=200)
