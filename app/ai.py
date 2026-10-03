import os

from dotenv import load_dotenv
from google import genai


load_dotenv()


client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def get_ai_response(message: str, history) -> str:

    try:

        contents = []


        for item in history:

            history = history[-10:]

            contents.append({
                "role": "user" if item.role == "user" else "model",
                "parts": [
                    {
                        "text": item.content
                    }
                ]
            })


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


        response = client.models.generate_content(
            model="gemini-3.5-flash-lite",
            contents=contents
        )


        return response.text


    except Exception as error:

        print(f"API Error: {error}")

        return "Sorry, I could not get a response from the AI."