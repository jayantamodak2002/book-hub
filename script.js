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
            <span class="category">${book.category}</span>
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