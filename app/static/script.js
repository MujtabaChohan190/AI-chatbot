const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");

let conversationHistory = [];


function addMessage(message, sender) {

    const messageElement = document.createElement("div");

    messageElement.classList.add("message", sender);

    if (sender === "bot") {

        const html = marked.parse(message);

        messageElement.innerHTML = DOMPurify.sanitize(html);

    } else {

        messageElement.textContent = message;

    }

    chatBox.appendChild(messageElement);

    chatBox.scrollTop = chatBox.scrollHeight;

    return messageElement;
}


chatForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const message = messageInput.value.trim();

    if (!message) {
        return;
    }


    // Display user's message
    addMessage(message, "user");

    messageInput.value = "";


    const button = chatForm.querySelector("button");

    button.disabled = true;
    button.textContent = "Thinking...";


    // Create an empty bot message.
    // We will fill it as the response streams in.
    const botMessageElement = addMessage("", "bot");

    let botResponse = "";


    try {

        const response = await fetch("/chat", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                message: message,
                history: conversationHistory
            })

        });


        if (!response.ok) {

            const errorText = await response.text();

            throw new Error(
                errorText || "Something went wrong."
            );
        }


        if (!response.body) {

            throw new Error(
                "Streaming is not supported by this response."
            );
        }


        // Read the response stream
        const reader = response.body.getReader();

        const decoder = new TextDecoder();


        while (true) {

            const { value, done } = await reader.read();


            if (done) {
                break;
            }


            const chunk = decoder.decode(value, {
                stream: true
            });


            botResponse += chunk;


            // Render the response as it arrives
            const html = marked.parse(botResponse);

            botMessageElement.innerHTML =
                DOMPurify.sanitize(html);


            chatBox.scrollTop = chatBox.scrollHeight;
        }


        // Save the completed conversation
        conversationHistory.push({
            role: "user",
            content: message
        });

        conversationHistory.push({
            role: "assistant",
            content: botResponse
        });


    } catch (error) {

        botMessageElement.textContent = error.message;

        console.error(error);

    } finally {

        button.disabled = false;
        button.textContent = "Send";

        messageInput.focus();

    }

});