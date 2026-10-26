document.addEventListener("DOMContentLoaded", function () {

    const loginButton = document.getElementById("login");

    loginButton.addEventListener("click", async function () {

        const username = document.getElementById("username").
        value.trim();

        const password = document.getElementById("password").
        value.trim();

        if (username === "" || password === "") {
            alert("Please enter username and password");
            return;
        }

        try {

            const response = await fetch("http://localhost:5000/api/login", {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();

            if (data.success) {

                alert("Login successful!");

                window.location.href = "interview.html";

            } else {

                alert(data.message);

            }

        } catch (error) {

            console.error(error);

            alert("Backend server is not running!");

        }

    });

});