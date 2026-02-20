let hasReplied = false;

function sendMessage() {
    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();

    if (messageText === "") return;

    addMessage(messageText, "user");
    input.value = "";

    if (!hasReplied) {
        setTimeout(() => {
            addMessage("Thank you for contacting Pallavi Bhandari. I will get back to you soon.", "bot");
        }, 1000);
        hasReplied = true;
    }
}

function addMessage(text, type) {
    const chatBox = document.getElementById("chatBox");

    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);

    const time = new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        ${text}
        <div class="time">${time}</div>
    `;

    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("messageInput").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});