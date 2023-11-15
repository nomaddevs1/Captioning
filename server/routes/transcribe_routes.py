import audioread
from fastapi import APIRouter, UploadFile
from utils import duration_detector
from transcriber import transcribe_file

router = APIRouter()


@router.post("/transcribe/")
async def transcribe_audio(audio_file: UploadFile, language: str):
    audio_filename = audio_file.filename
    with open(audio_filename, "wb") as f:
        f.write(audio_file.file.read())

    with audioread.audio_open(audio_filename) as audio_file:
        totalsec = audio_file.duration
        hours, mins, seconds = duration_detector(int(totalsec))

    audio_file = open(audio_filename, "rb")
    transcript = transcribe_file(audio_file)
    audio_file.close()

    # os.remove(audio_filename)  # Optionally delete the audio file after processing
    return transcript
