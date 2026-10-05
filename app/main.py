from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, StreamingResponse
from pydantic import BaseModel, Field

from app.ai import get_ai_response


app = FastAPI()


app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


class HistoryMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[HistoryMessage]


@app.get("/")
def home():
    return FileResponse("app/static/index.html")


@app.post("/chat")
def chat(request: ChatRequest):

    response_stream = get_ai_response(
        request.message,
        request.history
    )

    return StreamingResponse(
        response_stream,
        media_type="text/plain"
    )