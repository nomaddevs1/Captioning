from fastapi import APIRouter
from fastapi.responses import JSONResponse, Response
from models.transcript import TranscriptDataModel
from models.status import ErrorMessage
from pdf_generator import generate_pdf, render_html

router = APIRouter()


@router.post("/generate-pdf/", responses={200: {"content": {"application/pdf": {}}}, 400: {"model": ErrorMessage}})
async def generate_pdf_route(transcript_data: TranscriptDataModel):
    if transcript_data.raw_html:
        if transcript_data.transcript:
            return JSONResponse(ErrorMessage(error="Cannot provide raw transcript data and raw html.").model_dump_json(), 400)
        html_str = transcript_data.raw_html
    elif transcript_data.transcript:
        data = dict(transcript_data)
        html_str = render_html(data)
    else:
        return JSONResponse({"error": "No transcription content provided."}, 400)

    pdf_data = generate_pdf(html_str)

    return Response(content=pdf_data, media_type="application/pdf", status_code=200)
