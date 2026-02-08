/* ============================================
   CELEBRIFRAME PHOTOBOOTH - MAIN JAVASCRIPT
   ============================================ */

// Configuration
const CONFIG = {
    GOOGLE_SHEETS_URL: 'https://script.google.com/macros/d/YOUR_SCRIPT_ID/userweb',
    STORAGE_KEY: 'celebriframe_user',
    STORAGE_BOOKING: 'celebriframe_booking'
};

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeSearch();
    initializeModals();
    initializeTestimonials();
    initializeSetupSlider();
    initializeProductGallery();
    initializeNewsletterForm();
    checkUserSession();
    addScrollAnimations();
});

// ============================================
// NAVIGATION
// ============================================

function initializeNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.getElementById('navbar');
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            
            // Update active state
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Navbar shadow on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
}

// ============================================
// SETUP SLIDER
// ============================================
function initializeSetupSlider() {
    // Masonry layout - CSS handles the grid, JS just adds scroll animation
    const masonry = document.getElementById('setupMasonry');
    if (!masonry) return;
    
    const items = masonry.querySelectorAll('.masonry-item');
    items.forEach((item, index) => {
        item.setAttribute('data-aos', 'fade-up');
        item.setAttribute('data-aos-delay', index * 100);
    });
}

// ============================================
// PRODUCT GALLERY + LIGHTBOX
// ============================================
function initializeProductGallery() {
    const grid = document.getElementById('productGrid');
    const lightbox = document.getElementById('productLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const closeBtn = document.getElementById('lightboxClose');
    const nextBtn = document.getElementById('lightboxNext');
    const prevBtn = document.getElementById('lightboxPrev');
    if (!grid || !lightbox) return;

    const items = Array.from(grid.querySelectorAll('.product-item img'));
    let currentIndex = -1;

    function open(index) {
        currentIndex = index;
        lightboxImage.src = items[currentIndex].src;
        lightbox.setAttribute('aria-hidden', 'false');
    }

    function close() {
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImage.src = '';
        currentIndex = -1;
    }

    function next() { if (currentIndex < items.length - 1) open(currentIndex + 1); else open(0); }
    function prev() { if (currentIndex > 0) open(currentIndex - 1); else open(items.length - 1); }

    items.forEach((img, i) => {
        img.addEventListener('click', () => open(i));
    });

    closeBtn.addEventListener('click', close);
    nextBtn.addEventListener('click', next);
    prevBtn.addEventListener('click', prev);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) close();
    });

    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        }
    });
}

// ============================================
// MODALS
// ============================================

function initializeModals() {
    const authModal = document.getElementById('authModal');
    const userBtn = document.getElementById('userBtn');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');
    const signInForm = document.getElementById('signInForm');
    const signUpForm = document.getElementById('signUpForm');
    const showSignUp = document.getElementById('showSignUp');
    const showSignIn = document.getElementById('showSignIn');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Open modal
    if (userBtn) {
        userBtn.addEventListener('click', function() {
            authModal.classList.add('active');
        });
    }
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            authModal.classList.remove('active');
        });
    }
    
    if (modalOverlay) {
        modalOverlay.addEventListener('click', function() {
            authModal.classList.remove('active');
        });
    }
    
    // Switch to sign up
    if (showSignUp) {
        showSignUp.addEventListener('click', function(e) {
            e.preventDefault();
            signInForm.classList.remove('active');
            signUpForm.classList.add('active');
        });
    }
    
    // Switch to sign in
    if (showSignIn) {
        showSignIn.addEventListener('click', function(e) {
            e.preventDefault();
            signUpForm.classList.remove('active');
            signInForm.classList.add('active');
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleLogin();
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleRegister();
        });
    }
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    // Simulate login (in real app, verify against Google Sheets)
    const user = {
        email: email,
        name: email.split('@')[0],
        loginTime: new Date().toISOString()
    };
    
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(user));
    showNotification('Login successful!', 'success');
    
    setTimeout(() => {
        document.getElementById('authModal').classList.remove('active');
        updateUserButton();
    }, 1000);
}

function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const phone = document.getElementById('registerPhone').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('registerConfirmPassword').value;
    
    if (!name || !email || !phone || !password || !confirmPassword) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    if (password !== confirmPassword) {
        showNotification('Passwords do not match', 'error');
        return;
    }
    
    if (password.length < 8) {
        showNotification('Password must be at least 8 characters', 'error');
        return;
    }
    
    // Simulate registration
    const user = {
        name: name,
        email: email,
        phone: phone,
        registeredAt: new Date().toISOString()
    };
    
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(user));
    showNotification('Account created successfully!', 'success');
    
    setTimeout(() => {
        document.getElementById('authModal').classList.remove('active');
        updateUserButton();
    }, 1000);
}

function checkUserSession() {
    const user = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (user) {
        updateUserButton();
    }
}

function updateUserButton() {
    const userBtn = document.getElementById('userBtn');
    const user = localStorage.getItem(CONFIG.STORAGE_KEY);
    
    if (user && userBtn) {
        const userData = JSON.parse(user);
        userBtn.innerHTML = `<span style="font-size: 0.8rem; font-weight: 600;">${userData.name.charAt(0).toUpperCase()}</span>`;
        userBtn.title = `Logged in as ${userData.name}`;
    }
}

// ============================================
// TESTIMONIALS SLIDER
// ============================================

function initializeTestimonials() {
    const slider = document.getElementById('testimonialsSlider');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const sliderDots = document.getElementById('sliderDots');
    
    if (!slider) return;
    
    const cards = slider.querySelectorAll('.testimonial-card');
    let currentIndex = 0;
    
    // Create dots
    if (sliderDots) {
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            sliderDots.appendChild(dot);
        });
    }
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        if (!sliderDots) return; // no dots container — nothing to update
        const dots = sliderDots.querySelectorAll('.slider-dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % cards.length;
            updateSlider();
        });
    }
}

// ============================================
// NEWSLETTER FORM
// ============================================

function initializeNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]').value;
            
            if (!email) {
                showNotification('Please enter your email', 'error');
                return;
            }
            
            // Simulate submission
            // newsletter submitted (debug log removed)
            showNotification('Thank you for subscribing!', 'success');
            form.reset();
        });
    }
}

// ============================================
// SEARCH OVERLAY (current-page)
// ============================================

function initializeSearch() {
    const btn = document.getElementById('searchBtn');
    if (!btn) return;

    const searchSelectors = [
        '.feature-card',
        '.testimonial-card',
        '.gallery-item',
        '.work-item',
        '.faq-item',
        'h1', 'h2', 'h3'
    ];

    btn.addEventListener('click', openSearchOverlay);

    function openSearchOverlay() {
        if (document.getElementById('siteSearchOverlay')) return;

        const overlay = document.createElement('div');
        overlay.id = 'siteSearchOverlay';
        overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:flex-start;justify-content:center;padding-top:6vh;z-index:4000;';

        const panel = document.createElement('div');
        panel.style.cssText = 'width:min(900px,96%);background:#fff;border-radius:8px;padding:18px;box-shadow:0 10px 30px rgba(0,0,0,0.25);max-height:80vh;overflow:auto;';

        const input = document.createElement('input');
        input.type = 'search';
        input.placeholder = 'Search this page — try keywords (min 2 chars)';
        input.style.cssText = 'width:100%;padding:12px 14px;margin-bottom:12px;border:1px solid #ddd;border-radius:6px;font-size:1rem;';

        const results = document.createElement('div');
        results.style.cssText = 'display:block;gap:8px;';

        panel.appendChild(input);
        panel.appendChild(results);
        overlay.appendChild(panel);
        document.body.appendChild(overlay);

        input.focus();

        function close() {
            overlay.remove();
            document.removeEventListener('keydown', onKeydown);
        }

        function onKeydown(e) {
            if (e.key === 'Escape') close();
        }

        overlay.addEventListener('click', function(e) {
            if (e.target === overlay) close();
        });

        document.addEventListener('keydown', onKeydown);

        let lastHighlights = [];

        input.addEventListener('input', function() {
            const q = this.value.trim().toLowerCase();
            results.innerHTML = '';

            // clear previous highlights
            lastHighlights.forEach(el => el.style.outline = '');
            lastHighlights = [];

            if (q.length < 2) {
                const hint = document.createElement('div');
                hint.textContent = 'Type at least 2 characters to search this page.';
                hint.style.cssText = 'color:#666;padding:6px 0;';
                results.appendChild(hint);
                return;
            }

            const nodes = Array.from(document.querySelectorAll(searchSelectors.join(',')));
            const hits = [];

            nodes.forEach(node => {
                const text = (node.textContent || '').toLowerCase();
                if (text.indexOf(q) !== -1) {
                    hits.push(node);
                }
            });

            if (hits.length === 0) {
                const none = document.createElement('div');
                none.textContent = 'No results on this page.';
                none.style.cssText = 'color:#666;padding:6px 0;';
                results.appendChild(none);
                return;
            }

            hits.slice(0, 50).forEach(node => {
                const titleEl = node.querySelector('h3, h2, h1');
                const title = titleEl ? titleEl.textContent.trim() : (node.textContent || '').trim().slice(0, 80);

                const item = document.createElement('button');
                item.type = 'button';
                item.style.cssText = 'display:block;text-align:left;width:100%;padding:10px;border-radius:6px;border:1px solid #f0f0f0;background:#fff;margin-bottom:8px;cursor:pointer;';
                item.textContent = title;
                item.addEventListener('click', function() {
                    close();
                    if (node.id) {
                        location.hash = node.id;
                    } else {
                        node.scrollIntoView({behavior:'smooth',block:'center'});
                        node.style.outline = '3px solid #FFD54A';
                        lastHighlights.push(node);
                        setTimeout(() => { node.style.outline = ''; }, 3000);
                    }
                });

                results.appendChild(item);
            });
        });
    }
}

// ============================================
// NOTIFICATIONS
// ============================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#28A745' : type === 'error' ? '#DC3545' : '#17A2B8'};
        color: white;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

function addScrollAnimations() {
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
    
    // Observe feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
    
    // Observe steps
    document.querySelectorAll('.step').forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateY(20px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function saveBooking(bookingData) {
    localStorage.setItem(CONFIG.STORAGE_BOOKING, JSON.stringify(bookingData));
}

function getBooking() {
    const booking = localStorage.getItem(CONFIG.STORAGE_BOOKING);
    return booking ? JSON.parse(booking) : null;
}

function clearBooking() {
    localStorage.removeItem(CONFIG.STORAGE_BOOKING);
}

// ============================================
// SMOOTH SCROLL
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', function(e) {
    // Close modal with Escape
    if (e.key === 'Escape') {
        const modal = document.getElementById('authModal');
        if (modal && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    }
});

// ============================================
// ANIMATIONS
// ============================================

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CONFIG,
        handleLogin,
        handleRegister,
        showNotification,
        saveBooking,
        getBooking,
        clearBooking
    };
}
