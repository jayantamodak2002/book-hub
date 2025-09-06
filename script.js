// Fetch books from JSON file
let books = [];

async function loadBooks() {
    try {
        const response = await fetch("books.json");
        books = await response.json();
        displayBooks("all"); // show all books by default
    } catch (error) {
        console.error("Error loading books:", error);
    }
}

function getLabel(text) {
    switch (text) {
        case "fiction":
            return "Fiction"
            break;
        case "non-fiction":
            return "Non Fiction"
            break;
        case "academic":
            return "Academic"
            break;
    }
}
// Display books in grid
function displayBooks(category) {
    const booksGrid = document.getElementById("booksGrid");
    booksGrid.innerHTML = "";

    const filteredBooks = category === "all" ? books : books.filter(book => book.category === category);

    if (filteredBooks.length === 0) {
        booksGrid.innerHTML = "<p>No books found in this category.</p>";
        return;
    }

    filteredBooks.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookCard.innerHTML = `
            <img src="${book.image}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <span class="category">${getLabel(book.category)}</span>
        `;
        booksGrid.appendChild(bookCard);
    });
}

// Category filter button click
document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelector(".filter-btn.active").classList.remove("active");
        button.classList.add("active");
        const category = button.getAttribute("data-filter");
        displayBooks(category);
    });
});

// Load books when page starts
window.addEventListener("DOMContentLoaded", loadBooks);



// auth js
let users = JSON.parse(localStorage.getItem("users")) || [];

// Switch between Login and Register
function showForm(type) {
    document.getElementById("loginForm").classList.remove("active");
    document.getElementById("registerForm").classList.remove("active");
    document.getElementById("loginTab").classList.remove("active");
    document.getElementById("registerTab").classList.remove("active");

    if (type === "login") {
        document.getElementById("loginForm").classList.add("active");
        document.getElementById("loginTab").classList.add("active");
    } else {
        document.getElementById("registerForm").classList.add("active");
        document.getElementById("registerTab").classList.add("active");
    }
}

// Register User
function registerUser() {
    const name = document.getElementById("regName").value.trim();
    const email = document.getElementById("regEmail").value.trim();
    const password = document.getElementById("regPassword").value.trim();

    if (!name || !email || !password) {
        showMessage("⚠ Please fill all fields.");
        return;
    }

    if (users.find(user => user.email === email)) {
        showMessage("❌ Email already registered.");
        return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));
    showMessage("✅ Registration successful!");
}

// Login User
function loginUser() {
    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPassword").value.trim();

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
        showMessage(`🎉 Welcome, ${user.name}!`);
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    } else {
        showMessage("❌ Invalid email or password.");
    }
}

// Export Data as JSON
function exportData() {
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "users.json";
    a.click();
    URL.revokeObjectURL(url);
}

// Import Data from JSON
function importData(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);
            if (Array.isArray(data)) {
                users = data;
                localStorage.setItem("users", JSON.stringify(users));
                showMessage("✅ Data imported successfully!");
            } else {
                showMessage("⚠ Invalid JSON file.");
            }
        } catch (error) {
            showMessage("❌ Error reading file.");
        }
    };
    reader.readAsText(file);
}

// Show messages
function showMessage(msg) {
    document.getElementById("message").textContent = msg;
}
