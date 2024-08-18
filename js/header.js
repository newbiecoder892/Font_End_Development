
document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is already logged in
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const signInButton = document.getElementById('signInButton');

    if (loggedInUser) {
        // Update the "Sign In" button with the user's first name
        if (signInButton) {
            signInButton.textContent = loggedInUser.First_Name;
            signInButton.href = "#"; 
        }

        // Create and add a "Logout" button next to the "Sign In" button
        const logoutButton = document.createElement('a');
        logoutButton.textContent = 'Logout';
        logoutButton.href = '#';
        logoutButton.id = 'logoutButton';
        logoutButton.style.marginLeft = '5px'; 

        // Append the logout button to the navbar or wherever appropriate
        signInButton.parentNode.insertBefore(logoutButton, signInButton.nextSibling);

        // Add logout event listener
        logoutButton.addEventListener('click', function() {
            sessionStorage.removeItem('loggedInUser'); // Remove session storage item
            alert('Successful Logged out!');
            window.location.href = 'index.html'; 
        });
    }
});
