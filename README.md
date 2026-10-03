# AI Chatbot

A simple web-based AI chatbot built with Python, FastAPI, JavaScript, and the Google Gemini API. The chatbot allows users to send messages through a web interface, receives AI-generated responses, and maintains conversation history so the AI can understand previous messages.

## Features

* Web-based chatbot interface
* Accepts user messages through the browser
* Uses the Google Gemini API to generate responses
* FastAPI backend for handling API requests
* Conversation history and context
* Markdown formatting for AI responses
* Loading state while waiting for an AI response
* Frontend and backend error handling
* Input validation
* Limits conversation history to prevent unnecessary context growth
* CLI version of the chatbot
* Uses environment variables to keep the API key secure
* Sanitizes AI-generated HTML using DOMPurify

## Technologies Used

* Python
* FastAPI
* JavaScript
* HTML
* CSS
* Google Gemini API
* Google GenAI Python SDK
* Pydantic
* python-dotenv
* Marked.js
* DOMPurify

## Project Structure

```text
ai-chatbot/
│
├── app/
│   ├── ai.py
│   ├── main.py
│   ├── cli.py
│   └── static/
│       ├── index.html
│       ├── style.css
│       └── script.js
│
├── .env
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## How It Works

The chatbot follows this flow:

```text
User
  ↓
Web Interface
  ↓
JavaScript
  ↓
FastAPI /chat endpoint
  ↓
AI service
  ↓
Gemini API
  ↓
AI response
  ↓
FastAPI
  ↓
JavaScript
  ↓
Web Interface
```

The `index.html` file provides the chatbot interface.

The `script.js` file handles user input, sends requests to the FastAPI backend, displays AI responses, manages conversation history, and handles loading and error states.

The `main.py` file contains the FastAPI application and `/chat` endpoint.

The `ai.py` file uses the Google GenAI SDK to send the conversation and current user message to the Gemini model and returns the generated response.

The `cli.py` file provides a command-line version of the chatbot using the same AI service.

## Conversation History

The chatbot maintains conversation history during the current session.

Previous messages are stored as user and assistant messages:

```text
[
    { role: "user", content: "My name is Mujtaba." },
    { role: "assistant", content: "Nice to meet you, Mujtaba." }
]
```

The previous conversation history is sent along with the current message so that Gemini can use the earlier messages as context.

The current message and previous history are kept separate:

```text
message = current user message
history = previous conversation
```

The backend also limits the history to the most recent 10 messages:

```python
history = history[-10:]
```

This prevents the request from continuously growing and helps reduce unnecessary context usage.

## Input Validation

The application validates user input on both the frontend and backend.

The frontend prevents empty messages from being submitted.

The backend uses Pydantic to validate the request and limits the message length:

```python
class ChatRequest(BaseModel):
    message: str = Field(min_length=1, max_length=2000)
    history: list[HistoryMessage]
```

This helps prevent invalid requests from reaching the AI service.

## Markdown Responses

The chatbot supports Markdown responses from Gemini.

Marked.js converts Markdown into HTML, while DOMPurify sanitizes the generated HTML before it is displayed in the browser.

User messages are displayed using `textContent` so that user input is treated as plain text.

## Error Handling

The application includes error handling on both the frontend and backend.

The frontend checks whether the API request was successful and displays an appropriate error message if something goes wrong.

The backend catches errors from the Gemini API so that an API failure does not crash the application.

The chatbot also uses a loading state while waiting for the AI response.

## API Integration

The Gemini API is accessed using Google's GenAI Python SDK.

The API key is stored in a `.env` file:

```env
GEMINI_API_KEY=your_api_key_here
```

The application loads this key using `python-dotenv`.

The actual `.env` file is excluded from Git using `.gitignore` so that the API key is not uploaded to GitHub.

## How to Run

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
cd ai-chatbot
```

### 2. Create a virtual environment

Windows:

```powershell
python -m venv .venv
```

Activate it:

```powershell
.venv\Scripts\activate
```

### 3. Install dependencies

```powershell
pip install -r requirements.txt
```

### 4. Create the environment file

Create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_actual_gemini_api_key
```

Do not share or commit this file.

### 5. Run the web application

```powershell
uvicorn app.main:app --reload
```

Open the following URL in your browser:

```text
http://127.0.0.1:8000
```

The chatbot interface should appear.

### 6. Run the CLI version

The command-line version can also be run using:

```powershell
python -m app.cli
```

You should see:

```text
AI Chatbot

Type 'exit' to quit.

You:
```

Enter a message and the chatbot will return the AI response.

Type:

```text
exit
```

to close the application.

## What I Learned

Through this project, I learned how to:

* Work with an external AI API
* Use the Google GenAI Python SDK
* Build a REST API using FastAPI
* Connect a JavaScript frontend with a Python backend
* Use `fetch()` to send HTTP requests
* Work with JSON request and response data
* Use `async` and `await` in JavaScript
* Manage conversation history and provide context to an AI model
* Understand the difference between current input and previous conversation history
* Validate API requests using Pydantic
* Handle frontend and backend errors
* Implement loading states
* Render Markdown responses
* Sanitize generated HTML using DOMPurify
* Protect API credentials using environment variables
* Structure a small application into separate modules
* Think about context limits and unnecessary API usage
* Build a more production-oriented AI application

## Problems and Solutions

### Gemini API Issues

During development, some Gemini models returned API errors or were unavailable.

The application was updated to use an available Gemini model and includes error handling around API requests.

### Duplicate Conversation History

At one point, assistant responses were being added to the conversation history more than once.

The issue was identified by printing the conversation contents being sent to Gemini.

The history logic was then corrected so that each user and assistant message is stored only once.

### Current Message Duplication

The chatbot separates the current message from previous conversation history.

```text
message = current user message
history = previous conversation
```

This prevents the same message from being unnecessarily added to the conversation context twice.

## Security

API keys and other secrets should never be committed to GitHub.

The project uses a `.env` file for the Gemini API key and includes `.env` in `.gitignore`.

A `.env.example` file is included so that the required environment variable can be configured without exposing the actual API key.

The application also sanitizes AI-generated HTML before displaying it in the browser.

## What I Would Improve Next

Some possible improvements for the next version include:

* Add persistent conversation storage
* Add user authentication
* Store conversations in a database
* Add Redis for session or conversation storage
* Add a system prompt to control the chatbot's behavior
* Add streaming responses
* Add voice input and output
* Improve the user interface
* Add rate limiting
* Add logging and monitoring
* Deploy the application to a cloud platform
