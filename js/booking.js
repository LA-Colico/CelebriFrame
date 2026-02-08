/* ============================================
   BOOKING PAGE JAVASCRIPT
   ============================================ */

let currentStep = 1;
const totalSteps = 4;

const packagePrices = {
    solo: 1500,
    duo: 2500,
    group: 3500,
    family: 4500
};

const bookingData = {
    location: null,
    date: null,
    time: null,
    package: null,
    price: 0
};

document.addEventListener('DOMContentLoaded', function() {
    initializeBookingForm();
    initializeLocationSelection();
    initializeTimeSlots();
    initializePackageSelection();
    initializeFormNavigation();
});

// ============================================
// BOOKING FORM INITIALIZATION
// ============================================

function initializeBookingForm() {
    const form = document.getElementById('bookingForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            handleBookingSubmit();
        });
    }
}

// ============================================
// LOCATION SELECTION
// ============================================

function initializeLocationSelection() {
    const locationCards = document.querySelectorAll('.location-card');
    
    locationCards.forEach(card => {
        card.addEventListener('click', function() {
            locationCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const location = this.dataset.location;
            bookingData.location = location;
            document.getElementById('selectedLocation').value = location;
            
            updateSummary();
        });
    });
}

// ============================================
// TIME SLOT SELECTION
// ============================================

function initializeTimeSlots() {
    const timeSlots = document.querySelectorAll('.time-slot');
    
    timeSlots.forEach(slot => {
        slot.addEventListener('click', function(e) {
            e.preventDefault();
            timeSlots.forEach(s => s.classList.remove('selected'));
            this.classList.add('selected');
            
            const time = this.dataset.time;
            bookingData.time = time;
            document.getElementById('selectedTime').value = time;
            
            updateSummary();
        });
    });
}

// ============================================
// PACKAGE SELECTION
// ============================================

function initializePackageSelection() {
    const packageCards = document.querySelectorAll('.package-card');
    
    packageCards.forEach(card => {
        card.addEventListener('click', function() {
            packageCards.forEach(c => c.classList.remove('selected'));
            this.classList.add('selected');
            
            const packageType = this.dataset.package;
            bookingData.package = packageType;
            bookingData.price = packagePrices[packageType];
            document.getElementById('selectedPackage').value = packageType;
            
            updateSummary();
        });
    });
}

// ============================================
// FORM NAVIGATION
// ============================================

function initializeFormNavigation() {
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (validateCurrentStep()) {
                if (currentStep < totalSteps) {
                    goToStep(currentStep + 1);
                }
            }
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (currentStep > 1) {
                goToStep(currentStep - 1);
            }
        });
    }
}

function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.step-item').forEach(s => s.classList.remove('active'));
    
    // Show current step
    document.querySelector(`.form-step[data-step="${step}"]`).classList.add('active');
    document.querySelector(`.step-item[data-step="${step}"]`).classList.add('active');
    
    // Update buttons
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const submitBtn = document.getElementById('submitBtn');
    const confirmBtn = document.getElementById('confirmBookingBtn');
    
    if (step === 1) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'inline-block';
    }
    
    if (step === totalSteps) {
        nextBtn.style.display = 'none';
        submitBtn.style.display = 'inline-block';
        confirmBtn.style.display = 'block';
    } else {
        nextBtn.style.display = 'inline-block';
        submitBtn.style.display = 'none';
        confirmBtn.style.display = 'none';
    }
    
    currentStep = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================================
// VALIDATION
// ============================================

function validateCurrentStep() {
    switch(currentStep) {
        case 1:
            if (!bookingData.location) {
                showNotification('Please select a location', 'error');
                return false;
            }
            return true;
        case 2:
            if (!bookingData.date) {
                showNotification('Please select a date', 'error');
                return false;
            }
            if (!bookingData.time) {
                showNotification('Please select a time slot', 'error');
                return false;
            }
            return true;
        case 3:
            if (!bookingData.package) {
                showNotification('Please select a package', 'error');
                return false;
            }
            return true;
        case 4:
            return validateCustomerForm();
        default:
            return true;
    }
}

function validateCustomerForm() {
    const form = document.getElementById('bookingForm');
    const fullName = form.querySelector('input[name="fullName"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const phone = form.querySelector('input[name="phone"]').value;
    const agreeTerms = form.querySelector('input[name="agreeTerms"]').checked;
    
    if (!fullName) {
        showNotification('Please enter your full name', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showNotification('Please enter a valid email address', 'error');
        return false;
    }
    
    if (!phone) {
        showNotification('Please enter your phone number', 'error');
        return false;
    }
    
    if (!agreeTerms) {
        showNotification('Please agree to the booking policies', 'error');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ============================================
// UPDATE SUMMARY
// ============================================

function updateSummary() {
    const locationNames = {
        manila: 'Celebriframe Manila',
        cebu: 'Celebriframe Cebu',
        davao: 'Celebriframe Davao'
    };
    
    const packageNames = {
        solo: 'Solo Package',
        duo: 'Duo Package',
        group: 'Group Package',
        family: 'Family Package'
    };
    
    document.getElementById('summaryLocation').textContent = 
        bookingData.location ? locationNames[bookingData.location] : '-';
    
    document.getElementById('summaryDate').textContent = 
        bookingData.date ? formatDate(bookingData.date) : '-';
    
    document.getElementById('summaryTime').textContent = 
        bookingData.time || '-';
    
    document.getElementById('summaryPackage').textContent = 
        bookingData.package ? packageNames[bookingData.package] : '-';
    
    document.getElementById('summaryTotal').textContent = 
        bookingData.price ? `₱${bookingData.price.toLocaleString()}` : '₱0';
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// ============================================
// BOOKING SUBMISSION
// ============================================

function handleBookingSubmit() {
    if (!validateCustomerForm()) {
        return;
    }
    
    const form = document.getElementById('bookingForm');
    const formData = new FormData(form);
    
    const booking = {
        location: bookingData.location,
        date: bookingData.date,
        time: bookingData.time,
        package: bookingData.package,
        price: bookingData.price,
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        requests: formData.get('requests'),
        bookingDate: new Date().toISOString(),
        bookingId: generateBookingId()
    };
    
    // Save to localStorage
    saveBooking(booking);
    
    // Show success message
    showNotification('Booking submitted successfully! Check your email for confirmation.', 'success');
    
    // Redirect after delay
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

function generateBookingId() {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `CFB-${timestamp}-${random}`;
}

// ============================================
// DATE PICKER SETUP
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('bookingDate');
    
    if (dateInput) {
        // Set minimum date to today
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set maximum date to 3 months from now
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3);
        dateInput.max = maxDate.toISOString().split('T')[0];
        
        dateInput.addEventListener('change', function() {
            bookingData.date = this.value;
            updateSummary();
        });
    }
});

// ============================================
// UTILITY FUNCTIONS
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

function saveBooking(bookingData) {
    localStorage.setItem('celebriframe_booking', JSON.stringify(bookingData));
}

function getBooking() {
    const booking = localStorage.getItem('celebriframe_booking');
    return booking ? JSON.parse(booking) : null;
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        goToStep,
        validateCurrentStep,
        handleBookingSubmit,
        generateBookingId
    };
}
