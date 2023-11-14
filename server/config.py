import os

OPEN_API_KEY = os.environ.get("OPENAI_API_KEY")


# Fetching URLs from environment variables or setting default values
PRODUCTION_URL = os.getenv("PRODUCTION_URL", "https://your-production-url.com")
LOCAL_URL = "http://localhost:3000"
