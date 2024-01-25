import audioread
from fastapi import APIRouter, UploadFile, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from models.status import ErrorMessage
from transcriber import Transcript, transcribe_file
from utils import duration_detector

router = APIRouter()

AUDIO_FILE_BYTES_LIMIT = 25_000_000  # 25 MB
SUPPORTED_FILE_EXTENSIONS = ["mp3", "mp4", "mpeg", "mpga", "wav", "webm", "m4a"]


@router.post(
    "/transcribe/", responses={200: {"model": Transcript}, 400: {"model": ErrorMessage}}
)
async def transcribe_audio(audio_file: UploadFile, language: str):
    audio_filename = audio_file.filename
    file_extension = audio_filename.split(".")[-1]

    if file_extension not in SUPPORTED_FILE_EXTENSIONS:
        return JSONResponse(
            ErrorMessage(
                error=f"unsupported file format {file_extension}"
            ).model_dump_json(),
            status.HTTP_400_BAD_REQUEST,
        )

    with open(audio_filename, "wb") as f:
        f.write(audio_file.file.read())

    with audioread.audio_open(audio_filename) as audio_file:
        totalsec = audio_file.duration
        hours, mins, seconds = duration_detector(int(totalsec))

    audio_file = open(audio_filename, "rb")
    try:
        transcript = transcribe_file(audio_file, language, AUDIO_FILE_BYTES_LIMIT)
    except Exception as e:
        audio_file.close()
        return JSONResponse(
            ErrorMessage(error="error transcribing the file").model_dump_json(),
            status.HTTP_400_BAD_REQUEST,
        )

    audio_file.close()

    return transcript
