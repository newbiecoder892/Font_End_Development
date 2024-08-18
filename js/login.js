//Registration
function storeUser(event) {
    event.preventDefault();

    var first = document.getElementById("firstName").value;
    var last = document.getElementById("lastName").value;
    var email = document.getElementById("email").value;
    var pass = document.getElementById("Password").value;

    if (!first || !last || !email || !pass) {
        alert("Invalid Registration: Please fill in all the fields.");
        return;
    }

    // Create a new account object
    var newAccount = {
        First_Name: first,
        Last_Name: last,
        Email: email,
        Password: pass
    };

    // Retrieve existing accounts from local storage or initialize an empty object
    var retrieveAccsJSON = localStorage.getItem("accounts");
    var retrieveAccs = retrieveAccsJSON ? JSON.parse(retrieveAccsJSON) : {};

    // Add the new account to the accounts object
    var accountKey = "account" + (Object.keys(retrieveAccs).length + 1);
    retrieveAccs[accountKey] = newAccount;

    // Store the updated accounts object in local storage
    localStorage.setItem("accounts", JSON.stringify(retrieveAccs));

    alert("Yeah, Account Registered Successfully!!!");
    window.location.href = "login.html";
}

//Validate Login
document.addEventListener('DOMContentLoaded', () => {
    // Get the form and attach the submit event handler
    const loginForm = document.querySelector('#loginForm form');
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Get input values
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Retrieve existing accounts from local storage
        const retrievedAccountsJSON = localStorage.getItem('accounts');
        const retrievedAccounts = retrievedAccountsJSON ? JSON.parse(retrievedAccountsJSON) : {};

        let isFound = false;

        // Check credentials
        for (const key in retrievedAccounts) {
            if (retrievedAccounts.hasOwnProperty(key)) {
                const account = retrievedAccounts[key];
                if (account.Email === email && account.Password === password) {
                    isFound = true;
                    // Optionally, store account key in cookies
                    document.cookie = `account-key=${key}`;
                    break;
                }
            }
        }

        if (isFound) {
            alert('Login Successful!!!');
            setLoginCookie('true');
            window.location.href = 'index.html'; // Redirect to the main page
        } else {
            alert('Invalid Email or Password, Please Try Again');
            // Optionally, redirect back to the login page or show an error
        }
    });

    function setLoginCookie(isLoggedIn) {
        document.cookie = `login=${isLoggedIn}`;
    }
});


