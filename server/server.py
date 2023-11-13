import openai
from config import LOCAL_URL, OPEN_API_KEY, PRODUCTION_URL
from fastapi import FastAPI, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from routes import pdf_routes, transcribe_routes

openai.api_key = OPEN_API_KEY

app = FastAPI()
print(LOCAL_URL)
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
