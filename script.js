// Registration Validation
function validateRegister() {
    let email = document.getElementById("email").value;
    let fname = document.getElementById("fname").value;
    let lname = document.getElementById("lname").value;
    let password = document.getElementById("password").value;

    if (!email || !fname || !lname || !password) {
        alert("All fields are required!");
        return false;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters.");
        return false;
    }

    alert("Registration successful!");
    return true;
}

// Login Simulation
function loginUser() {
    let email = document.getElementById("loginEmail").value;
    let password = document.getElementById("loginPassword").value;

    if (!email || !password) {
        alert("Please fill in all fields!");
        return false;
    }

    alert("Login successful!");
    window.location.href = "dashboard.html";
    return false;
}

// Display user placeholder name on dashboard
document.addEventListener("DOMContentLoaded", () => {
    let nameHolder = document.getElementById("usernamePlaceholder");
    if (nameHolder) {
        nameHolder.textContent = "User";
    }
});
