from pydantic import BaseModel, Field


class ErrorMessage(BaseModel):
    error: str = "error"
