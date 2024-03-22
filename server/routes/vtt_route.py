from fastapi import APIRouter
from fastapi.responses import PlainTextResponse
from utils.generate_vtt import generate_vtt
from models.status import ErrorMessage
from models.web_vtt import WebVTTData

router = APIRouter()


@router.post(
    "/generate-vtt/",
    responses={200: {"content": {"text/vtt": {}}}, 400: {"model": ErrorMessage}},
    response_class=PlainTextResponse
)
async def generate_vtt_route(vtt_data: WebVTTData):
    vtt_str = generate_vtt(vtt_data)
    response = PlainTextResponse(content=vtt_str, media_type="text/vtt", status_code=200)
    return response
