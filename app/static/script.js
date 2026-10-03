const chatForm = document.getElementById("chat-form");
const messageInput = document.getElementById("message-input");
const chatBox = document.getElementById("chat-box");


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


    // Show user's message
    addMessage(message, "user");

    // Clear input
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
                message: message
            })

        });


        if (!response.ok) {
            throw new Error("Failed to get AI response");
        }


        const data = await response.json();


        // Show AI response
        addMessage(data.response, "bot");


    } catch (error) {

        addMessage(
            "Sorry, something went wrong. Please try again.",
            "bot"
        );

        console.error(error);

    } finally {

        button.disabled = false;
        button.textContent = "Send";

    }

});