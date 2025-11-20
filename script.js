scripts.js
// Form Validation and Navigation
document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("registerForm")
  const loginForm = document.getElementById("loginForm")

  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister)
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin)
  }

  // Dashboard logic
  initializeDashboard()
  setupTabs()
  setupLogout()
})

// Registration Validation
function handleRegister(e) {
  e.preventDefault()

  const email = document.getElementById("email").value
  const firstName = document.getElementById("firstName").value
  const lastName = document.getElementById("lastName").value
  const password = document.getElementById("password").value
  const confirmPassword = document.getElementById("confirmPassword").value
  const gender = document.querySelector('input[name="gender"]:checked')

  let isValid = true

  // Clear previous errors
  clearErrors()

  // Email validation
  if (!isValidEmail(email)) {
    showError("emailError", "Please enter a valid email address")
    isValid = false
  }

  // First name validation
  if (firstName.trim().length < 2) {
    showError("firstNameError", "First name must be at least 2 characters")
    isValid = false
  }

  // Last name validation
  if (lastName.trim().length < 2) {
    showError("lastNameError", "Last name must be at least 2 characters")
    isValid = false
  }

  // Password validation
  const passwordValidation = validatePassword(password)
  if (!passwordValidation.isValid) {
    showError("passwordError", passwordValidation.message)
    isValid = false
  }

  // Confirm password
  if (password !== confirmPassword) {
    showError("confirmPasswordError", "Passwords do not match")
    isValid = false
  }

  // Gender validation
  if (!gender) {
    showError("genderError", "Please select a gender")
    isValid = false
  }

  if (isValid) {
    // Simulate password hashing
    const hashedPassword = simpleHash(password)

    // Store user data in localStorage
    const userData = {
      email,
      firstName,
      lastName,
      gender: gender.value,
      password: hashedPassword,
    }

    localStorage.setItem("user_" + email, JSON.stringify(userData))
    localStorage.setItem("currentUser", email)

    alert("Account created successfully! Redirecting to login...")
    window.location.href = "login.html"
  }
}

// Login Validation
function handleLogin(e) {
  e.preventDefault()

  const email = document.getElementById("loginEmail").value
  const password = document.getElementById("loginPassword").value

  let isValid = true
  clearErrors()

  if (!isValidEmail(email)) {
    showError("loginEmailError", "Please enter a valid email address")
    isValid = false
  }

  // Updated: 6 characters minimum
  if (password.length < 6) {
    showError("loginPasswordError", "Password must be at least 6 characters")
    isValid = false
  }

  if (isValid) {
    // Check if user exists
    const userData = localStorage.getItem("user_" + email)

    if (!userData) {
      showError("loginEmailError", "User not found")
      return
    }

    const user = JSON.parse(userData)
    const hashedPassword = simpleHash(password)

    if (user.password === hashedPassword) {
      localStorage.setItem("currentUser", email)
      alert("Login successful! Redirecting to dashboard...")
      window.location.href = "dashboard.html"
    } else {
      showError("loginPasswordError", "Incorrect password")
    }
  }
}

// Dashboard Initialization
function initializeDashboard() {
  const userNameDisplay = document.getElementById("userNameDisplay")

  if (userNameDisplay) {
    const currentUser = localStorage.getItem("currentUser")

    if (!currentUser) {
      window.location.href = "login.html"
      return
    }

    const userData = JSON.parse(localStorage.getItem("user_" + currentUser))
    if (userData) {
      userNameDisplay.textContent = userData.firstName
    }
  }
}

// Tab Functionality
function setupTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active")
      })

      // Add active class to clicked button and corresponding content
      this.classList.add("active")
      document.getElementById(tabId).classList.add("active")
    })
  })
}

// Logout Function
function setupLogout() {
  const logoutBtn = document.getElementById("logoutBtn")

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("currentUser")
      alert("Logged out successfully!")
      window.location.href = "login.html"
    })
  }
}

// Utility Functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword(password) {
  // UPDATED: Only require 6 characters. No uppercase, no numbers, no lowercase rules.
  if (password.length < 6) {
    return { isValid: false, message: "Password must be at least 6 characters" }
  }
  return { isValid: true }
}

// Simple hash function (for simulation only)
function simpleHash(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash
  }
  return "hash_" + Math.abs(hash)
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId)
  if (errorElement) {
    errorElement.textContent = message
    errorElement.classList.add("show")
  }
}

function clearErrors() {
  document.querySelectorAll(".error-message").forEach((element) => {
    element.textContent = ""
    element.classList.remove("show")
  })
}