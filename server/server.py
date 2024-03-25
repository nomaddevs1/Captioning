import openai
from config import (
    ADDRESS,
    CLIENT_URL,
    HOST_URL,
    OPENAI_API_KEY,
    LOG_FILE,
    PORT,
    MODE,
    scrub_sensitive_environment_variables,
)
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import pdf_route, transcribe_route, vtt_route
from logger import init_logger
import logging
import uvicorn

# remove API keys and other sensitive info from system environment variables:
scrub_sensitive_environment_variables()
openai.api_key = OPENAI_API_KEY
init_logger(LOG_FILE)

app: FastAPI = None
if MODE == "PROD":
    # disable /docs and /redoc endpoints in production
    app = FastAPI(redoc_url=None, docs_url=None)
else:
    app = FastAPI()

logging.info(f"Server listening at {HOST_URL}")
# Add CORS middleware
app.include_router(transcribe_route.router)
app.include_router(pdf_route.router)
app.include_router(vtt_route.router)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[HOST_URL, CLIENT_URL],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
    expose_headers=["*"],
)

if __name__ == "__main__":
    uvicorn.run(app, host=ADDRESS, port=int(PORT))
