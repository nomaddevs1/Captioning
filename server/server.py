import openai
from config import LOCAL_URL, OPEN_API_KEY, PRODUCTION_URL, LOG_FILE
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import pdf_routes, transcribe_routes
from logger import init_logger
import logging

openai.api_key = OPEN_API_KEY

init_logger(LOG_FILE)

app = FastAPI()
logging.info(f"Server listening at {LOCAL_URL}")
# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[LOCAL_URL, PRODUCTION_URL, "*"],  # List of allowed origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

app.include_router(transcribe_routes.router)
app.include_router(pdf_routes.router)
