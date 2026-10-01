# AI Chatbot

A simple AI chatbot built with Python and the Google Gemini API. The chatbot accepts a user's message through the command line, sends it to Gemini, receives an AI-generated response, and displays the response in the terminal.

## Features

* Accepts user messages through the command line
* Uses the Google Gemini API to generate responses
* Displays AI responses in the terminal
* Allows the user to continue the conversation
* Provides an `exit` command to close the chatbot
* Uses environment variables to keep the API key secure

## Technologies Used

* Python
* Google Gemini API
* Google GenAI Python SDK
* python-dotenv

## Project Structure

```text
ai-chatbot/
│
├── app/
│   ├── ai.py
│   ├── main.py
│   └── cli.py
│
├── .env
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

## How It Works

The chatbot follows a simple flow:

```text
User
  ↓
CLI
  ↓
Python application
  ↓
Gemini API
  ↓
AI response
  ↓
Terminal
```

The `cli.py` file accepts the user's message and passes it to the `get_ai_response()` function from `ai.py`.

The `ai.py` file uses the Google GenAI SDK to send the message to the Gemini model. The generated response is then returned to the CLI and displayed to the user.

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

### 5. Run the chatbot

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
* Send user input to an AI model
* Process and display API responses
* Use environment variables for API credentials
* Protect API keys using `.gitignore`
* Structure a small Python application into separate modules
* Build a basic command-line AI application

## What I Would Improve Next

Some possible improvements for the next version include:

* Add persistent conversation history
* Add a system prompt to control the chatbot's behavior
* Add better error handling for API failures
* Add a web-based user interface
* Add Markdown formatting for AI responses
* Add streaming responses
* Add voice input and output
* Add user authentication and persistent chat storage

## Security

API keys and other secrets should never be committed to GitHub.

The project uses a `.env` file for the Gemini API key and includes `.env` in `.gitignore`.

## Author

Mujtaba Chohan
