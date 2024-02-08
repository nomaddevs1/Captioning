from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response
from models.transcript import TranscriptDataModel
from models.status import ErrorMessage
from pdf_generator import generate_pdf, render_html
import logging

router = APIRouter()


@router.post(
    "/generate-pdf/",
    responses={200: {"content": {"application/pdf": {}}}, 400: {"model": ErrorMessage}},
)
async def generate_pdf_route(transcript_data: TranscriptDataModel):
    if transcript_data.raw_html:
        if transcript_data.transcript:
            logging.warning(
                "User provided raw transcript data and raw html at the same "
                "time. This is undefined behavior since we only handle either "
                "raw transcript data or raw html."
            )
            return JSONResponse(
                ErrorMessage(
                    error="User cannot provide both raw transcript data and "
                    "raw html at the same time."
                ).model_dump_json(),
                400,
            )
        html_str = transcript_data.raw_html
    elif transcript_data.transcript:
        data = dict(transcript_data)
        html_str = render_html(data)
    else:
        logging.warning(
            "User provided no transcript data nor raw html data for transcript "
            "generation."
        )
        return JSONResponse({"error": "No transcription content provided."}, 400)

    pdf_data = generate_pdf(html_str)

    logging.info("Sending generated transcript to user...")
    response = Response(content=pdf_data, media_type="application/pdf", status_code=200)
    response.headers[
        "Content-Disposition"
    ] = "inline"  # Set to inline instead of attachment
    return response
