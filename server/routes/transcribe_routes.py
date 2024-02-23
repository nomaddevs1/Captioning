import audioread
from fastapi import APIRouter, UploadFile, status
from fastapi.responses import JSONResponse
from utils import duration_detector
from models.status import ErrorMessage
from transcriber import transcribe_file, Transcript
import logging

router = APIRouter()

AUDIO_FILE_BYTES_LIMIT = 25_000_000  # 25 MB
SUPPORTED_FILE_EXTENSIONS = ["mp3", "mp4", "mpeg", "mpga", "wav", "webm", "m4a"]


@router.post(
    "/transcribe/", responses={200: {"model": Transcript}, 400: {"model": ErrorMessage}}
)
async def transcribe_audio(audio_file: UploadFile, language: str):
    audio_filename = audio_file.filename
    file_extension = audio_filename.split(".")[-1]

    # we could just convert the file into an mp3 with ffmpeg and be done with it
    if file_extension not in SUPPORTED_FILE_EXTENSIONS:
        logging.warning(
            f"User uploaded a file with unsupported file extension '{file_extension}'."
        )
        return JSONResponse(
            ErrorMessage(
                error=f"unsupported file format {file_extension}"
            ).model_dump_json(),
            status.HTTP_400_BAD_REQUEST,
        )

    with open(audio_filename, "wb") as f:
        f.write(audio_file.file.read())

    audio_file = open(audio_filename, "rb")
    try:
        logging.info(f"Beginning to transcribe audio file {audio_filename}")
        transcript = transcribe_file(audio_file, language, AUDIO_FILE_BYTES_LIMIT)
        logging.info(f"Successfully generated transcript data")
    except Exception as e:
        audio_file.close()
        logging.error(e)
        return JSONResponse(
            ErrorMessage(error="error transcribing the file").model_dump_json(),
            status.HTTP_500_INTERNAL_SERVER_ERROR,
        )

    audio_file.close()

    return transcript
