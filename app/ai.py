import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_ai_response(message: str, history):

    try:
        # Keep only the most recent 10 messages
        history = history[-10:]

        contents = []

        for item in history:

            contents.append({
                "role": "user" if item.role == "user" else "model",
                "parts": [
                    {
                        "text": item.content
                    }
                ]
            })

        # Add the current user message
        contents.append({
            "role": "user",
            "parts": [
                {
                    "text": message
                }
            ]
        })

        print("CONTENTS SENT TO GEMINI:")
        print(contents)

        # Stream the response from Gemini
        response = client.models.generate_content_stream(
            model="gemini-3.5-flash-lite",
            contents=contents
        )

        for chunk in response:

            if chunk.text:
                yield chunk.text

    except Exception as error:

        print(f"API Error: {error}")

        yield "Sorry, I could not get a response from the AI."