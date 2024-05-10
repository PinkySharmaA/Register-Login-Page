document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const showRegisterLink = document.getElementById('showRegister');
    const showLoginLink = document.getElementById('showLogin');

    showRegisterLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
    });

    showLoginLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });

    // Function to retrieve registered users from localStorage
    function getRegisteredUsers() {
        const usersJSON = localStorage.getItem('registeredUsers');
        return usersJSON ? JSON.parse(usersJSON) : [];
    }

    // Function to save registered users to localStorage
    function saveRegisteredUsers(users) {
        localStorage.setItem('registeredUsers', JSON.stringify(users));
    }

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        // Check if username or password fields are empty
        if (!username || !password) {
            alert("Please enter both username and password.");
            return;
        }

        // Retrieve registered users from localStorage
        const registeredUsers = getRegisteredUsers();

        // Check if the entered username and password match any of the registered users
        const user = registeredUsers.find(user => user.username === username && user.password === password);
        if (user) {
            alert("Login Successful!");
        } else {
            alert("Invalid username or password. Please try again.");
        }
    });

    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const gender = document.getElementById('registerGender').value;
        const age = document.getElementById('registerAge').value;

        // Check if any required field is empty
        if (!username || !password || !gender || !age) {
            alert("Please fill out all fields.");
            return;
        }

        // Retrieve registered users from localStorage
        const registeredUsers = getRegisteredUsers();

        // Check if the username is already registered
        if (registeredUsers.some(user => user.username === username)) {
            alert("Username already exists. Please choose a different one.");
            return;
        }

        // Add the new user to the list of registered users
        registeredUsers.push({ username, password, gender, age });

        // Save the updated list of registered users to localStorage
        saveRegisteredUsers(registeredUsers);

        // Hide the register form and show the login form
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
    });
});
