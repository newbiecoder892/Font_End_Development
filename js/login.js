// Validate Login
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm form');
    
    // Auto-fill email and password if cookies are set
    const savedEmail = getCookie('rememberedEmail');
    const savedPassword = getCookie('rememberedPassword');
    if (savedEmail && savedPassword) {
        loginForm.querySelector('input[type="email"]').value = savedEmail;
        loginForm.querySelector('input[type="password"]').value = savedPassword;
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const retrievedAccsJSON = localStorage.getItem('accounts');
        const retrievedAccs = retrievedAccsJSON ? JSON.parse(retrievedAccsJSON) : {};

        let isFound = false;
        let loggedInUser = null;

        for (const key in retrievedAccs) {
            if (retrievedAccs.hasOwnProperty(key)) {
                const account = retrievedAccs[key];
                if (account.Email === email && account.Password === password) {
                    isFound = true;
                    loggedInUser = account;
                    break;
                }
            }
        }

        if (isFound) {
            sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));

            const rememberMeCheckbox = document.getElementById("rememberMe");
            if (rememberMeCheckbox.checked) {
                // Set cookies to remember the email and password
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 3); // 3-day expiration

                setCookie('rememberedEmail', email, expirationDate);
                setCookie('rememberedPassword', password, expirationDate);
            } else {
                // Clear cookies if "Remember Me" is not checked
                setCookie('rememberedEmail', '', new Date(0));
                setCookie('rememberedPassword', '', new Date(0));
            }

            alert('Login Successful!!!');
            window.location.href = 'index.html';
        } else {
            alert('Invalid Email or Password, Please Try Again');
        }
    });

    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    if (loggedInUser) {
        alert("Welcome back, " + loggedInUser.First_Name + "!");
        window.location.href = "index.html";
    }
});

// Helper functions to handle cookies
function setCookie(name, value, expirationDate) {
    const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=None; Secure`;
    document.cookie = cookieString;
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookiesArray = document.cookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}
