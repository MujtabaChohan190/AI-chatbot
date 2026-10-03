from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel

from app.ai import get_ai_response


app = FastAPI()


app.mount(
    "/static",
    StaticFiles(directory="app/static"),
    name="static"
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def home():
    return FileResponse("app/static/index.html")


@app.post("/chat")
def chat(request: ChatRequest):

    response = get_ai_response(request.message)

    return {
        "response": response
    }