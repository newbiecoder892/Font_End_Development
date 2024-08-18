document.addEventListener('DOMContentLoaded', () => {
    // Check if the user is already logged in
    const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
    const signInButton = document.getElementById('signInButton');
    const existingLogoutButton = document.getElementById('logoutButton');

    if (loggedInUser) {
        // Update the "Sign In" button with the user's first name
        if (signInButton) {
            signInButton.textContent = loggedInUser.First_Name;
            signInButton.href = "#"; 
        }

        // Only add the "Logout" button if it doesn't already exist
        if (!existingLogoutButton) {
            const logoutButton = document.createElement('a');
            logoutButton.textContent = 'Logout';
            logoutButton.href = '#';
            logoutButton.id = 'logoutButton';
            logoutButton.style.marginLeft = '5px'; 

            // Append the logout button next to the "Sign In" button
            signInButton.parentNode.insertBefore(logoutButton, signInButton.nextSibling);

            // Add logout event listener
            logoutButton.addEventListener('click', function() {
                sessionStorage.removeItem('loggedInUser'); // Remove session storage item
                window.location.href = 'index.html'; 
            });
        }
    }
});
