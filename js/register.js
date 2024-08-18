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




