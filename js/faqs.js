/* ============================================
   FAQs PAGE JAVASCRIPT
   ============================================ */

const faqData = [
    {
        id: 1,
        category: 'general',
        question: 'What is Celebriframe?',
        answer: 'Celebriframe is the Philippines\' premier self-photo studio where you can capture professional-quality portraits yourself. We provide the space, equipment, lighting, and creative backdrops—you bring the magic!'
    },
    {
        id: 2,
        category: 'general',
        question: 'How does a self-photo booth work?',
        answer: 'Our self-photo studio is equipped with professional cameras, lighting, and multiple backdrops. You can take as many photos as you want during your session. Our staff will assist with camera setup and provide guidance if needed.'
    },
    {
        id: 3,
        category: 'general',
        question: 'Do I need to bring my own camera?',
        answer: 'No! We provide professional cameras and all necessary equipment. You don\'t need to bring anything except yourself and your friends/family.'
    },
    {
        id: 4,
        category: 'booking',
        question: 'How do I book a session?',
        answer: 'Simply visit our "Book a Session" page, select your preferred location, date, time, and package. Fill in your details and proceed to payment. You\'ll receive a confirmation email with all the details.'
    },
    {
        id: 5,
        category: 'booking',
        question: 'What payment methods do you accept?',
        answer: 'We accept GCash, Bank Transfer, and Cash (on-site, subject to availability). A 50% deposit is required to confirm your booking, with the remaining balance due on the day of your session.'
    },
    {
        id: 6,
        category: 'booking',
        question: 'Can I reschedule my booking?',
        answer: 'Yes! Free rescheduling is available up to 7 days before your session. Rescheduling within 7 days incurs a ₱200 fee, and within 48 hours incurs a ₱500 fee. Rescheduling within 24 hours is not allowed.'
    },
    {
        id: 7,
        category: 'booking',
        question: 'What is your cancellation policy?',
        answer: 'Free cancellation up to 14 days before your session. Cancellations 7-14 days before receive 50% refund, 48 hours-7 days before receive 25% refund, and within 48 hours receive no refund.'
    },
    {
        id: 8,
        category: 'session',
        question: 'What should I wear to my session?',
        answer: 'Wear whatever makes you feel confident and comfortable! We recommend solid colors or patterns that complement our backdrops. Avoid overly busy patterns or logos. Dress code depends on the vibe you\'re going for.'
    },
    {
        id: 9,
        category: 'session',
        question: 'How many people can participate in one session?',
        answer: 'Our packages accommodate 1-11 people. Solo Package (1 person), Duo Package (2 people), Group Package (3-5 people), and Family Package (6-11 people). Additional participants beyond your package limit are ₱300 each.'
    },
    {
        id: 10,
        category: 'session',
        question: 'Can I bring my pet?',
        answer: 'Absolutely! We have a pet-friendly package. Pets are welcome and can be part of your photos. Just let us know when booking so we can prepare accordingly.'
    },
    {
        id: 11,
        category: 'session',
        question: 'What if I\'m late for my session?',
        answer: 'We have a 15-minute grace period for late arrivals. However, your session will end at the scheduled time regardless of when you arrive. No refunds are given for missed time due to late arrival.'
    },
    {
        id: 12,
        category: 'photos',
        question: 'When will I receive my edited photos?',
        answer: 'Edited photos are delivered within 7-10 business days via Google Drive link. The link is valid for 30 days from delivery. Rush delivery is available for ₱500 (3-5 day delivery).'
    },
    {
        id: 13,
        category: 'photos',
        question: 'How many edited photos do I get?',
        answer: 'It depends on your package: Solo Package (20 photos), Duo Package (30 photos), Group Package (50 photos), Family Package (80 photos). You can purchase additional edited photos for ₱50 each.'
    },
    {
        id: 14,
        category: 'photos',
        question: 'Can I get printed photos?',
        answer: 'Yes! Printed photos are available upon request at an additional cost. We offer various sizes and finishes. Contact us for pricing and options.'
    },
    {
        id: 15,
        category: 'photos',
        question: 'Do I own the rights to my photos?',
        answer: 'Yes! You own the rights to your photos. Celebriframe may use photos for portfolio/marketing purposes with your permission. Watermarked versions are available for social media sharing.'
    },
    {
        id: 16,
        category: 'pricing',
        question: 'What are your package prices?',
        answer: 'Solo Package: ₱1,500 | Duo Package: ₱2,500 | Group Package: ₱3,500 | Family Package: ₱4,500. All packages include professional editing and all backdrops.'
    },
    {
        id: 17,
        category: 'pricing',
        question: 'Are there any hidden fees?',
        answer: 'No hidden fees! The price you see is what you pay. Additional charges only apply for add-ons like extra photos, extended time, or special requests.'
    },
    {
        id: 18,
        category: 'pricing',
        question: 'Do you offer group discounts?',
        answer: 'Our Family Package (6-11 people) offers the best value per person. For large corporate events or special requests, please contact us directly for custom pricing.'
    }
];

let currentCategory = 'all';
let filteredFaqs = [...faqData];

document.addEventListener('DOMContentLoaded', function() {
    initializeFaqs();
    initializeFilters();
    initializeSearch();
});

// ============================================
// FAQs INITIALIZATION
// ============================================

function initializeFaqs() {
    renderFaqs();
}

function renderFaqs() {
    const accordion = document.getElementById('faqAccordion');
    accordion.innerHTML = '';
    
    filteredFaqs.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        faqItem.innerHTML = `
            <div class="faq-question">
                <div class="faq-question-text">${faq.question}</div>
                <div class="faq-toggle">+</div>
            </div>
            <div class="faq-answer">
                <div class="faq-answer-text">${faq.answer}</div>
            </div>
        `;
        
        const question = faqItem.querySelector('.faq-question');
        question.addEventListener('click', function() {
            toggleFaq(faqItem);
        });
        
        accordion.appendChild(faqItem);
    });
}

function toggleFaq(faqItem) {
    // Close other open FAQs
    document.querySelectorAll('.faq-item.active').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    faqItem.classList.toggle('active');
}

// ============================================
// FILTERS
// ============================================

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.faq-filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentCategory = this.dataset.category;
            filterFaqs();
        });
    });
}

function filterFaqs() {
    if (currentCategory === 'all') {
        filteredFaqs = [...faqData];
    } else {
        filteredFaqs = faqData.filter(faq => faq.category === currentCategory);
    }
    
    renderFaqs();
}

// ============================================
// SEARCH
// ============================================

function initializeSearch() {
    const searchInput = document.getElementById('faqSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            if (searchTerm === '') {
                filterFaqs();
            } else {
                filteredFaqs = faqData.filter(faq => 
                    faq.question.toLowerCase().includes(searchTerm) ||
                    faq.answer.toLowerCase().includes(searchTerm)
                );
                renderFaqs();
            }
        });
    }
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        faqData,
        filterFaqs,
        toggleFaq
    };
}
