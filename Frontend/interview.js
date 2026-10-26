const questions = [
    "Tell me about yourself.",
    "Why should we hire you?",
    "What are your strengths?",
    "What is your biggest weakness?",
    "Where do you see yourself in five years?"
];

let currentQuestion = 0;

const question = document.getElementById("question");
const answer = document.getElementById("answer");
const status = document.getElementById("status");
const feedback = document.getElementById("feedback");


// Speak the question
function speakQuestion() {

    let text = question.innerText;

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;

    window.speechSynthesis.speak(speech);
}


// Voice recognition
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = function () {
        status.innerText = "🎤 Listening...";
    };

    recognition.onresult = function (event) {

        let text = event.results[0][0].transcript;

        answer.value = text;

        status.innerText = "✅ Answer recorded.";
    };

    recognition.onerror = function () {
        status.innerText = "❌ Could not hear you. Try again.";
    };

    recognition.onend = function () {
        status.innerText = "Click Speak Answer to try again.";
    };

} else {

    status.innerText =
        "Voice recognition is not supported in this browser.";
}


// Start microphone
function startListening() {

    if (recognition) {
        recognition.start();
    }
}


// Stop microphone
function stopListening() {

    if (recognition) {
        recognition.stop();
    }
}


// Next question
function nextQuestion() {

    let userAnswer = answer.value.trim();

    if (userAnswer === "") {
        alert("Please answer the question first.");
        return;
    }

    // Simple feedback
    feedback.style.display = "block";

    if (userAnswer.length > 50) {

        feedback.innerHTML =
            "✅ Good answer! Your answer has enough detail. Keep speaking confidently.";

    } else {

        feedback.innerHTML =
            "💡 Try to give a little more detail in your answer.";
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {

        question.innerText = questions[currentQuestion];

        answer.value = "";

    } else {

        question.innerText =
            "🎉 Interview Completed!";

        answer.value = "";

        feedback.innerHTML =
            "⭐ Great job! You completed your AI interview.";
    }
}document.getElementById("speakBtn")
  .addEventListener("click", function () {

    const questionElement =
      document.getElementById("question");

    if (!questionElement) {
      alert("Question element nahi mila!");
      return;
    }

    const speech = new SpeechSynthesisUtterance(
      questionElement.innerText
    );

    speech.lang = "en-IN";
    speech.rate = 0.9;
    speech.pitch = 1.15;

    const voices = speechSynthesis.getVoices();

    const femaleVoice = voices.find(v =>
      /female|zira|samantha/i.test(v.name)
    );

    if (femaleVoice) speech.voice = femaleVoice;

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
  });