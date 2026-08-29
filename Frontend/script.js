// ==========================================
// PAGE LOADED
// ==========================================

window.addEventListener("DOMContentLoaded", function () {


    // ==========================================
    // GET ELEMENTS
    // ==========================================

    let email = document.getElementById("email");
    let password = document.getElementById("password");
    let remember = document.getElementById("remember");
    let loginButton = document.getElementById("loginButton");
    let errorMessage = document.getElementById("errorMessage");


    // ==========================================
    // LOAD SAVED EMAIL
    // ==========================================

    let savedEmail = localStorage.getItem("savedEmail");

    if (savedEmail) {

        email.value = savedEmail;

        remember.checked = true;

    }


    // ==========================================
    // LOGIN BUTTON
    // ==========================================

    loginButton.addEventListener("click", function () {


        // Get entered values

        let enteredEmail = email.value.trim();

        let enteredPassword = password.value.trim();


        // ==========================================
        // CHECK EMAIL
        // ==========================================

        if (enteredEmail === "") {

            errorMessage.style.display = "block";

            errorMessage.style.color = "#ff4d7d";

            errorMessage.innerText =
                "❌ Please enter your email.";

            return;
        }


        // ==========================================
        // CHECK EMAIL FORMAT
        // ==========================================

        if (!email.checkValidity()) {

            errorMessage.style.display = "block";

            errorMessage.style.color = "#ff4d7d";

            errorMessage.innerText =
                "❌ Please enter a valid email address.";

            return;
        }


        // ==========================================
        // CHECK PASSWORD
        // ==========================================

        if (enteredPassword === "") {

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
                enteredEmail
            );

        } else {

            localStorage.removeItem(
                "savedEmail"
            );

        }


        // ==========================================
        // LOGIN SUCCESSFUL
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