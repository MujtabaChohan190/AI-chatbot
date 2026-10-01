from app.ai import get_ai_response


print("AI Chatbot")
print("Type 'exit' to quit.")
print()


while True:
    message = input("You: ")

    if message.lower() == "exit":
        print("Goodbye!")
        break

    if not message.strip():
        continue

    response = get_ai_response(message)

    print("AI:", response)
    print()