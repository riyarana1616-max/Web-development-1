// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET ELEMENTS
    // ==========================================

    let emailInput = document.getElementById("email");
    let passwordInput = document.getElementById("password");
    let remember = document.getElementById("remember");
    let loginButton = document.getElementById("loginButton");
    let errorMessage = document.getElementById("errorMessage");


    // ==========================================
    // LOAD REMEMBERED EMAIL
    // ==========================================

    let savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {

        emailInput.value = savedEmail;

        remember.checked = true;

    }


    // ==========================================
    // LOGIN BUTTON
    // ==========================================

    loginButton.addEventListener("click", function () {

        let email = emailInput.value.trim();

        let password = passwordInput.value.trim();


        // ==========================================
        // CHECK EMPTY EMAIL
        // ==========================================

        if (email === "") {

            errorMessage.style.display = "block";

            errorMessage.style.color = "#ff4d7d";

            errorMessage.innerText =
                "❌ Please enter your email.";

            return;
        }


        // ==========================================
        // CHECK EMAIL FORMAT
        // ==========================================

        if (!emailInput.checkValidity()) {

            errorMessage.style.display = "block";

            errorMessage.style.color = "#ff4d7d";

            errorMessage.innerText =
                "❌ Please enter a valid email address.";

            return;
        }


        // ==========================================
        // CHECK PASSWORD
        // ==========================================

        if (password === "") {

            errorMessage.style.display = "block";

            errorMessage.style.color = "#ff4d7d";

            errorMessage.innerText =
                "❌ Please enter your password.";

            return;
        }


        // ==========================================
        // REMEMBER ME
        // ==========================================

        if (remember.checked) {

            localStorage.setItem(
                "savedEmail",
                email
            );

        } else {

            localStorage.removeItem(
                "savedEmail"
            );

        }


        // ==========================================
        // LOGIN SUCCESS
        // ==========================================

        errorMessage.style.display = "block";

        errorMessage.style.color = "#45e68b";

        errorMessage.innerText =
            "✅ Login Successful!";


        // ==========================================
        // OPEN DASHBOARD
        // ==========================================

        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 700);

    });


    // ==========================================
    // FORGOT PASSWORD
    // ==========================================

    document
        .getElementById("forgotPassword")
        .addEventListener("click", function (event) {

            event.preventDefault();

            alert("Forgot Password option clicked!");

        });


    // ==========================================
    // SIGN UP
    // ==========================================

    document
        .getElementById("signup")
        .addEventListener("click", function (event) {

            event.preventDefault();

            alert("Sign Up page will be created here.");

        });


    // ==========================================
    // GOOGLE LOGIN
    // ==========================================

    document
        .getElementById("googleButton")
        .addEventListener("click", function () {

            alert("Google Login will be connected later.");

        });


    // ==========================================
    // AI POWERED FEEDBACK
    // ==========================================

    document
        .getElementById("feedbackFeature")
        .addEventListener("click", function () {

            alert("AI Powered Feedback selected!");

        });


    // ==========================================
    // SMART PRACTICE
    // ==========================================

    document
        .getElementById("smartFeature")
        .addEventListener("click", function () {

            alert("Smart Practice selected!");

        });


    // ==========================================
    // TRACK PROGRESS
    // ==========================================

    document
        .getElementById("trackFeature")
        .addEventListener("click", function () {

            alert("Track Progress selected!");

        });

});


document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // GET CHATBOT ELEMENTS
    // ==========================================

    const chatbotContainer =
        document.getElementById("chatbot-container");

    const chatbotIcon =
        document.getElementById("chatbot-icon");

    const closeBtn =
        document.getElementById("close-btn");

    const sendBtn =
        document.getElementById("send-btn");

    const chatbotInput =
        document.getElementById("chatbot-input");

    const chatbotMessages =
        document.getElementById("chatbot-messages");


    // ==========================================
    // OPEN CHATBOT
    // ==========================================

    chatbotIcon.addEventListener("click", function () {

        chatbotContainer.classList.remove("hidden");

        chatbotIcon.style.display = "none";

        chatbotInput.focus();

    });


    // ==========================================
    // CLOSE CHATBOT
    // ==========================================

    closeBtn.addEventListener("click", function () {

        chatbotContainer.classList.add("hidden");

        chatbotIcon.style.display = "flex";

    });


    // ==========================================
    // SEND BUTTON
    // ==========================================

    sendBtn.addEventListener("click", function () {

        sendMessage();

    });


    // ==========================================
    // ENTER KEY
    // ==========================================

    chatbotInput.addEventListener("keypress", function (event) {

        if (event.key === "Enter") {

            sendMessage();

        }

    });


    // ==========================================
    // SEND MESSAGE
    // ==========================================

    function sendMessage() {

        const userMessage =
            chatbotInput.value.trim();


        if (userMessage === "") {

            return;

        }


        // Show user message

        appendMessage(
            "user",
            userMessage
        );


        // Clear input

        chatbotInput.value = "";


        // Get bot response

        getBotResponse(userMessage);

    }


    // ==========================================
    // ADD MESSAGE
    // ==========================================

    function appendMessage(sender, message) {

        const messageElement =
            document.createElement("div");


        messageElement.classList.add(
            "message",
            sender
        );


        messageElement.textContent =
            message;


        chatbotMessages.appendChild(
            messageElement
        );


        // Scroll to bottom

        chatbotMessages.scrollTop =
            chatbotMessages.scrollHeight;

    }


    // ==========================================
    // BOT RESPONSE
    // ==========================================

    function getBotResponse(userMessage) {

        let message =
            userMessage.toLowerCase();


        let response =
            "I'm here to help you with your interview preparation! 🤖";


        // Greeting

        if (
            message.includes("hello") ||
            message.includes("hi") ||
            message.includes("hey")
        ) {

            response =
                "Hello! 👋 I'm InterviewAI. How can I help you today?";

        }


        // Interview

        else if (
            message.includes("interview")
        ) {

            response =
                "Sure! I can help you prepare for your interview. You can practice common interview questions with me. 🎯";

        }


        // Resume

        else if (
            message.includes("resume") ||
            message.includes("cv")
        ) {

            response =
                "You can upload your resume from the Resume Upload section on your dashboard. 📄";

        }


        // Questions

        else if (
            message.includes("question")
        ) {

            response =
                "Here's a common interview question: Tell me about yourself. Try answering it and I'll help you improve your response. 💡";

        }


        // Help

        else if (
            message.includes("help")
        ) {

            response =
                "I can help you with interview questions, resume preparation, interview tips, and practice. 😊";

        }


        // Thank you

        else if (
            message.includes("thank")
        ) {

            response =
                "You're welcome! Good luck with your interview! 🚀";

        }


        // Display response after small delay

        setTimeout(function () {

            appendMessage(
                "bot",
                response
            );

        }, 500);

    }

});
// Start Interview button
document.getElementById("startInterview").addEventListener("click", function () {
    window.location.href = "interview.html";
});


// Practice Now buttons
document.querySelectorAll(".interview-card button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "interview.html";
    });
});


// New Interview
document.getElementById("newInterview").addEventListener("click", function() {
    window.location.href = "interview.html";
});