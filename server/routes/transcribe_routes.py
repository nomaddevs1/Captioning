import audioread
import openai
from fastapi import APIRouter, UploadFile
from fastapi.responses import JSONResponse
from utils import duration_detector, parse_srt

router = APIRouter()


@router.post("/transcribe/")
async def transcribe_audio(audio_file: UploadFile, language: str):
    audio_filename = audio_file.filename
    with open(audio_filename, "wb") as f:
        f.write(audio_file.file.read())

    with audioread.audio_open(audio_filename) as audio_file:
        totalsec = audio_file.duration
        hours, mins, seconds = duration_detector(int(totalsec))
    with open(audio_filename, "rb") as audio_file:
        transcript = openai.Audio.transcribe(
            file=audio_file, model="whisper-1", response_format="srt", language=language
        )

    # os.remove(audio_filename)  # Optionally delete the audio file after processing
    transcribe_data = parse_srt(transcript)
    return JSONResponse(content={"transcription": transcribe_data})
