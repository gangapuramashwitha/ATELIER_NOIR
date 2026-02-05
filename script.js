// Portfolio Data
const portfolioData = {
    1: {
        title: "Minimalist Penthouse",
        category: "Residential",
        price: "$15,000",
        description: "A stunning penthouse transformation featuring clean lines, neutral tones, and carefully curated furnishings. This project emphasizes space, light, and the beauty of simplicity.",
        area: "2,400 sq ft",
        duration: "4 months",
        year: "2025",
        image: "linear-gradient(135deg, #2c2c2c 0%, #1a1a1a 100%)"
    },
    2: {
        title: "Executive Office Suite",
        category: "Commercial",
        price: "$25,000",
        description: "A sophisticated corporate environment designed to inspire productivity and creativity. Features include custom millwork, integrated technology, and premium materials throughout.",
        area: "3,800 sq ft",
        duration: "6 months",
        year: "2024",
        image: "linear-gradient(135deg, #4a4a4a 0%, #2c2c2c 100%)"
    },
    3: {
        title: "Coastal Retreat",
        category: "Residential",
        price: "$18,500",
        description: "A serene beach house that blends indoor and outdoor living. Natural materials, ocean-inspired colors, and sustainable design principles create a peaceful sanctuary.",
        area: "2,800 sq ft",
        duration: "5 months",
        year: "2025",
        image: "linear-gradient(135deg, #3a3a3a 0%, #252525 100%)"
    },
    4: {
        title: "Custom Walnut Credenza",
        category: "Furniture",
        price: "$8,500",
        description: "Handcrafted from solid American walnut with brass hardware. This bespoke piece combines traditional craftsmanship with contemporary design sensibilities.",
        area: "N/A",
        duration: "6 weeks",
        year: "2025",
        image: "linear-gradient(135deg, #3d3d3d 0%, #1f1f1f 100%)"
    },
    5: {
        title: "Boutique Hotel Lobby",
        category: "Commercial",
        price: "$45,000",
        description: "An elegant lobby space that sets the tone for luxury hospitality. Features dramatic lighting, custom furniture, and art installations that create an unforgettable first impression.",
        area: "5,200 sq ft",
        duration: "8 months",
        year: "2024",
        image: "linear-gradient(135deg, #454545 0%, #2a2a2a 100%)"
    },
    6: {
        title: "Modern Loft Conversion",
        category: "Residential",
        price: "$22,000",
        description: "Industrial elements meet refined living in this stunning loft transformation. Exposed brick, steel beams, and contemporary furnishings create a unique urban oasis.",
        area: "3,200 sq ft",
        duration: "7 months",
        year: "2024",
        image: "linear-gradient(135deg, #353535 0%, #202020 100%)"
    },
    7: {
        title: "Sculptural Dining Table",
        category: "Furniture",
        price: "$12,000",
        description: "A statement piece that serves as both functional furniture and art. Hand-carved from a single piece of walnut with a natural edge, supported by a geometric steel base.",
        area: "N/A",
        duration: "8 weeks",
        year: "2025",
        image: "linear-gradient(135deg, #424242 0%, #282828 100%)"
    },
    8: {
        title: "Luxury Master Suite",
        category: "Residential",
        price: "$16,500",
        description: "An intimate retreat designed for relaxation and rejuvenation. Custom cabinetry, spa-like bathroom, and carefully considered lighting create the ultimate private sanctuary.",
        area: "1,200 sq ft",
        duration: "4 months",
        year: "2025",
        image: "linear-gradient(135deg, #383838 0%, #232323 100%)"
    },
    9: {
        title: "Creative Agency Office",
        category: "Commercial",
        price: "$32,000",
        description: "A dynamic workspace that fosters collaboration and innovation. Flexible layouts, vibrant accents, and integrated technology support the creative process.",
        area: "4,500 sq ft",
        duration: "6 months",
        year: "2024",
        image: "linear-gradient(135deg, #474747 0%, #2d2d2d 100%)"
    }
};

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    if (window.location.pathname.includes('cart.html')) {
        displayCart();
    }
    initMobileMenu();
    initPortfolioFilters();
    initContactForm();
});

// Mobile Menu
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Portfolio Filters
function initPortfolioFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter items
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Modal Functions
function openModal(id) {
    const modal = document.getElementById('projectModal');
    const data = portfolioData[id];
    
    if (!data) return;
    
    document.getElementById('modalImage').style.background = data.image;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalCategory').textContent = data.category;
    document.getElementById('modalDescription').textContent = data.description;
    document.getElementById('modalArea').textContent = data.area;
    document.getElementById('modalDuration').textContent = data.duration;
    document.getElementById('modalYear').textContent = data.year;
    document.getElementById('modalPrice').textContent = data.price;
    
    const addToCartBtn = document.getElementById('modalAddToCart');
    addToCartBtn.onclick = function() {
        addToCart(id);
        closeModal();
    };
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Click outside modal to close
window.addEventListener('click', function(e) {
    const modal = document.getElementById('projectModal');
    if (e.target === modal) {
        closeModal();
    }
});

// Cart Functions
function addToCart(id) {
    const data = portfolioData[id];
    if (!data) return;
    
    // Check if item already in cart
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        alert('This item is already in your cart!');
        return;
    }
    
    cart.push({
        id: id,
        title: data.title,
        category: data.category,
        price: data.price,
        image: data.image
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show success message
    alert('Item added to cart!');
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    displayCart();
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    cartCounts.forEach(count => {
        count.textContent = cart.length;
    });
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        emptyCart.style.display = 'block';
        updateCartSummary();
        return;
    }
    
    cartItemsContainer.style.display = 'flex';
    emptyCart.style.display = 'none';
    
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background: ${item.image};"></div>
            <div class="cart-item-details">
                <h3>${item.title}</h3>
                <span class="cart-item-category">${item.category}</span>
                <p class="cart-item-price">${item.price}</p>
            </div>
            <div class="cart-item-actions">
                <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');
    
    updateCartSummary();
}

function updateCartSummary() {
    let subtotal = 0;
    
    cart.forEach(item => {
        const price = parseFloat(item.price.replace(/[$,]/g, ''));
        subtotal += price;
    });
    
    const consultationFee = cart.length > 0 ? 500 : 0;
    const tax = (subtotal + consultationFee) * 0.08;
    const total = subtotal + consultationFee + tax;
    
    document.getElementById('subtotal').textContent = `$${subtotal.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('consultationFee').textContent = `$${consultationFee.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('tax').textContent = `$${tax.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
    document.getElementById('total').textContent = `$${total.toLocaleString('en-US', {minimumFractionDigits: 2})}`;
}

function applyPromo() {
    const promoInput = document.getElementById('promoInput');
    const promoMessage = document.getElementById('promoMessage');
    const code = promoInput.value.trim().toUpperCase();
    
    // Demo promo codes
    const validCodes = {
        'DESIGN10': 10,
        'LUXURY15': 15,
        'FIRST20': 20
    };
    
    if (validCodes[code]) {
        promoMessage.textContent = `Promo code applied! ${validCodes[code]}% discount.`;
        promoMessage.className = 'promo-message success';
        promoMessage.style.display = 'block';
    } else if (code) {
        promoMessage.textContent = 'Invalid promo code.';
        promoMessage.className = 'promo-message error';
        promoMessage.style.display = 'block';
    }
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }
    alert('Thank you for your interest! This is a demo website. In a production environment, you would be redirected to a secure checkout page.');
}

// Contact Form
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formMessage = document.getElementById('formMessage');
            const formData = new FormData(contactForm);
            
            // Simulate form submission
            setTimeout(() => {
                formMessage.textContent = 'Thank you for your message! We will get back to you within 24 hours.';
                formMessage.className = 'form-message success';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.className = 'form-message';
                }, 5000);
            }, 1000);
        });
    }
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation to elements
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.service-card, .portfolio-item, .stat-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
