// Validate Login
document.addEventListener('DOMContentLoaded', () => {
    // Get the form and attach the submit event handler
    const loginForm = document.querySelector('#loginForm form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Retrieve existing accounts from local storage
        const retrievedAccsJSON = localStorage.getItem('accounts');
        const retrievedAccs = retrievedAccsJSON ? JSON.parse(retrievedAccsJSON) : {};

        let isFound = false;
        let loggedInUser = null;

        // Check credentials
        for (const key in retrievedAccs) {
            if (retrievedAccs.hasOwnProperty(key)) {
                const account = retrievedAccs[key];
                if (account.Email === email && account.Password === password) {
                    isFound = true;
                    loggedInUser = account; // Set the correct logged in user
                    break;
                }
            }
        }

        if (isFound) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
            alert('Login Successful!!!');

            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            alert('Invalid Email or Password, Please Try Again');
        }
    });

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        // Automatically log in the user if they have a session
        alert("Welcome back, " + loggedInUser.First_Name + "!");

        window.location.href = "index.html";
    }
});
