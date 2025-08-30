// Display books in grid
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = '';

    if (books.length === 0) {
        booksGrid.innerHTML = '<p style="text-align: center; color: white; font-size: 1.2rem;">No books found</p>';
        return;
    }

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.animationDelay = `${index * 0.1}s`;

        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover" onerror="this.src='https://via.placeholder.com/300x400/667eea/ffffff?text=Book+Cover'">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <span class="book-category">${book.category.replace('-', ' ').toUpperCase()}</span>
            <div class="book-price">${book.price}</div>
            <button class="add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
        `;

        booksGrid.appendChild(bookCard);
    });
}

// Filter books by category
function filterBooks(category) {
    currentFilter = category;
    const filteredBooks = category === 'all' ? booksData : booksData.filter(book => book.category === category);
    displayBooks(filteredBooks);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
}

// Search functionality
function searchBooks(query) {
    const searchTerm = query.toLowerCase().trim();
    if (searchTerm === '') {
        displayBooks(booksData);
        return;
    }

    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
}

// Add to cart function
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
        // Store in memory instead of localStorage
        let cart = window.cart || [];
        const existingItem = cart.find(item => item.id === bookId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        window.cart = cart;
        showNotification(`"${book.title}" added to cart!`);
        updateCartCount();
    }
}

// Update cart count in navbar (if you want to add cart icon later)
function updateCartCount() {
    const cart = window.cart || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    // You can add cart icon and count display here
    console.log(`Total items in cart: ${totalItems}`);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    const bgColor = type === 'error' ? 'linear-gradient(45deg, #ff6b6b, #ee5a52)' : 'linear' '''''''''''''''''''''''''''// Global variables
    let booksData = [];
    let currentFilter = 'all';

    // Load books data from public JSON file
    async function loadBooksData() {
        try {
            // Replace this URL with your actual public JSON file URL
            // Example: 'https://your-domain.com/api/books.json'
            // For GitHub: 'https://raw.githubusercontent.com/username/repo/main/books.json'
            // For now, using a placeholder that will fall back to local data
            const response = await fetch('books.json');

            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            booksData = await response.json();
            displayBooks(booksData);
            showNotification('Books loaded successfully!');

        } catch (error) {
            console.error('Error loading books data:', error);
            showNotification('Using offline data - could not connect to server');
            // Fallback data if JSON file is not available
            booksData = getFallbackData();
            displayBooks(booksData);
        }
    }

    // Alternative function to load from a public API or CDN
    async function loadFromPublicAPI(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();
            booksData = Array.isArray(data) ? data : data.books || [];
            displayBooks(booksData);
            showNotification('Books loaded from public API!');

        } catch (error) {
            console.error('Error loading from public API:', error);
            loadBooksData(); // Fallback to local JSON
        }
    }
    
}

// Fallback data in case JSON file is not loaded
function getFallbackData() {
    return [
        {
            id: 1,
            title: "The Great Gatsby",
            author: "F. Scott Fitzgerald",
            category: "fiction",
            price: 12.99,
            cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop"
        },
        {
            id: 2,
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
            category: "fiction",
            price: 14.99,
            cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop"
        },
        {
            id: 3,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            category: "non-fiction",
            price: 18.99,
            cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&h=400&fit=crop"
        },
        {
            id: 4,
            title: "Educated",
            author: "Tara Westover",
            category: "non-fiction",
            price: 16.99,
            cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop"
        },
        {
            id: 5,
            title: "Introduction to Algorithms",
            author: "Thomas H. Cormen",
            category: "academic",
            price: 89.99,
            cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=400&fit=crop"
        },
        {
            id: 6,
            title: "Calculus Early Transcendentals",
            author: "James Stewart",
            category: "academic",
            price: 79.99,
            cover: "https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?w=300&h=400&fit=crop"
        },
        {
            id: 7,
            title: "1984",
            author: "George Orwell",
            category: "fiction",
            price: 13.99,
            cover: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop"
        },
        {
            id: 8,
            title: "Atomic Habits",
            author: "James Clear",
            category: "non-fiction",
            price: 17.99,
            cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop"
        }
    ];
}

// Display books in grid
function displayBooks(books) {
    const booksGrid = document.getElementById('booksGrid');
    booksGrid.innerHTML = '';

    books.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.style.animationDelay = `${index * 0.1}s`;

        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}" class="book-cover">
            <h3 class="book-title">${book.title}</h3>
            <p class="book-author">by ${book.author}</p>
            <span class="book-category">${book.category.replace('-', ' ').toUpperCase()}</span>
            <div class="book-price">$${book.price}</div>
            <button class="add-to-cart" onclick="addToCart(${book.id})">Add to Cart</button>
        `;

        booksGrid.appendChild(bookCard);
    });
}

// Filter books by category
function filterBooks(category) {
    currentFilter = category;
    const filteredBooks = category === 'all' ? booksData : booksData.filter(book => book.category === category);
    displayBooks(filteredBooks);

    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-filter="${category}"]`).classList.add('active');
}

// Search functionality
function searchBooks(query) {
    const searchTerm = query.toLowerCase();
    const filteredBooks = booksData.filter(book =>
        book.title.toLowerCase().includes(searchTerm) ||
        book.author.toLowerCase().includes(searchTerm) ||
        book.category.toLowerCase().includes(searchTerm)
    );
    displayBooks(filteredBooks);
}

// Add to cart function
function addToCart(bookId) {
    const book = booksData.find(b => b.id === bookId);
    if (book) {
        // Store in memory instead of localStorage
        let cart = window.cart || [];
        const existingItem = cart.find(item => item.id === bookId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        window.cart = cart;
        showNotification(`"${book.title}" added to cart!`);
    }
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Modal functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form validation
function validateForm(formData, isSignup = false) {
    const { email, password, name, confirmPassword } = formData;

    if (!email || !email.includes('@')) {
        return 'Please enter a valid email address';
    }

    if (!password || password.length < 6) {
        return 'Password must be at least 6 characters long';
    }

    if (isSignup) {
        if (!name || name.trim().length < 2) {
            return 'Name must be at least 2 characters long';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match';
        }
    }

    return null;
}

// Handle form submissions
function handleLogin(e) {
    e.preventDefault();
    const formData = {
        email: document.getElementById('loginEmail').value,
        password: document.getElementById('loginPassword').value
    };

    const error = validateForm(formData);
    if (error) {
        showNotification(error);
        return;
    }

    // Simulate login
    showNotification('Login successful!');
    closeModal('loginModal');
    document.getElementById('loginForm').reset();
}

function handleSignup(e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('signupName').value,
        email: document.getElementById('signupEmail').value,
        password: document.getElementById('signupPassword').value,
        confirmPassword: document.getElementById('confirmPassword').value
    };

    const error = validateForm(formData, true);
    if (error) {
        showNotification(error);
        return;
    }

    // Simulate signup
    showNotification('Account created successfully!');
    closeModal('signupModal');
    document.getElementById('signupForm').reset();
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Load books data
    loadBooksData();

    // Navigation category links
    document.querySelectorAll('.nav-link[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category');
            filterBooks(category);
        });
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filter = e.target.getAttribute('data-filter');
            filterBooks(filter);
        });
    });
});