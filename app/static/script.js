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
}


chatForm.addEventListener("submit", async (event) => {

    event.preventDefault();


    const message = messageInput.value.trim();


    if (!message) {
        return;
    }


    addMessage(message, "user");

    messageInput.value = "";

    const button = chatForm.querySelector("button");

    button.disabled = true;
    button.textContent = "Thinking...";


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

            const errorData = await response.json();

            throw new Error(
            errorData.detail?.[0]?.msg || "Something went wrong."
            );
        }


        const data = await response.json();


        addMessage(data.response, "bot");

        conversationHistory.push({
            role: "user",
            content: message
        });

        conversationHistory.push({
            role: "assistant",
            content: data.response
        });


    } catch (error) {

        addMessage(
            error.message,
            "bot"
        );

        console.error(error);

    } finally {

        button.disabled = false;
        button.textContent = "Send";

    }

});