/* ============================================
   GALLERY PAGE JAVASCRIPT
   ============================================ */

// Gallery data with all images from folders and Facebook links
const galleryData = [
    // Birthday Sessions
    {
        id: 1,
        title: "Eris Jaelie's 1st Birthday",
        category: 'birthday',
        previewImage: 'images/Eris Jaelie\'s 1st birthday/1.jpg',
        folderPath: 'images/Eris Jaelie\'s 1st birthday',
        totalImages: 10,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.862175569445017&type=3',
        description: 'A joyful celebration of Eris Jaelie\'s first birthday with beautiful moments captured.'
    },
    {
        id: 2,
        title: "Earl's 7th Birthday",
        category: 'birthday',
        previewImage: 'images/Earl\'s 7th birthday/1.jpg',
        folderPath: 'images/Earl\'s 7th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.924055999923640&type=3',
        description: 'Earl\'s 7th birthday celebration filled with fun and laughter.'
    },
    {
        id: 3,
        title: "Aaliyah Isabelle's 7th Birthday",
        category: 'birthday',
        previewImage: 'images/Aaliyah Isabelle\'s 7th birthday/1.jpg',
        folderPath: 'images/Aaliyah Isabelle\'s 7th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.974672688195304&type=3',
        description: 'Aaliyah Isabelle\'s special 7th birthday photoshoot.'
    },
    {
        id: 4,
        title: "Raian Celestina's Birthday",
        category: 'birthday',
        previewImage: 'images/Raian Celestina \'s birthday/1.jpg',
        folderPath: 'images/Raian Celestina \'s birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.911951077800799&type=3',
        description: 'Raian Celestina\'s birthday celebration captured beautifully.'
    },
    {
        id: 5,
        title: "Zonta's 105th Celebration",
        category: 'birthday',
        previewImage: 'images/Zonta\'s 105th Celebration/1.jpg',
        folderPath: 'images/Zonta\'s 105th Celebration',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.901832845479289&type=3',
        description: 'A milestone celebration for Zonta\'s 105th birthday.'
    },
    {
        id: 6,
        title: "King Tyler's 7th Birthday",
        category: 'birthday',
        previewImage: 'images/King Tyler\'s 7th birthday/1.jpg',
        folderPath: 'images/King Tyler\'s 7th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.872286585100582&type=3',
        description: 'King Tyler\'s 7th birthday party with amazing photos.'
    },
    {
        id: 7,
        title: "Nicholas PaulJan's 1st Birthday",
        category: 'birthday',
        previewImage: 'images/Nicholas PaulJan\'s 1st birthday/1.jpg',
        folderPath: 'images/Nicholas PaulJan\'s 1st birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.813083834354191&type=3',
        description: 'Nicholas PaulJan\'s first birthday milestone captured.'
    },
    {
        id: 8,
        title: "Nathan PaulJay's 7th Birthday",
        category: 'birthday',
        previewImage: 'images/Nathan PaulJay\'s 7th birhday/1.jpg',
        folderPath: 'images/Nathan PaulJay\'s 7th birhday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.778224221173486&type=3',
        description: 'Nathan PaulJay\'s 7th birthday celebration.'
    },
    {
        id: 9,
        title: "Jerome Raphael's 7th Birthday",
        category: 'birthday',
        previewImage: 'images/Jerome Raphael\'s 7th birthday/1.jpg',
        folderPath: 'images/Jerome Raphael\'s 7th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.775032278159347&type=3',
        description: 'Jerome Raphael\'s 7th birthday party photos.'
    },
    {
        id: 10,
        title: "Kiel Henrick's 10th Birthday",
        category: 'birthday',
        previewImage: 'images/Kiel Henrick\'s 10th birthday/1.jpg',
        folderPath: 'images/Kiel Henrick\'s 10th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.773453514983890&type=3',
        description: 'Kiel Henrick\'s 10th birthday celebration.'
    },
    {
        id: 11,
        title: "Lolo Lito's 74th Birthday",
        category: 'birthday',
        previewImage: 'images/Lolo Lito\'s 74th birthday/1.jpg',
        folderPath: 'images/Lolo Lito\'s 74th birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.759809033015005&type=3',
        description: 'Lolo Lito\'s 74th birthday celebration with family.'
    },
    {
        id: 12,
        title: "Maria Maxine's 1st Birthday",
        category: 'birthday',
        previewImage: 'images/Maria Maxine\'s 1st birthday/1.jpg',
        folderPath: 'images/Maria Maxine\'s 1st birthday',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.748264880836087&type=3',
        description: 'Maria Maxine\'s first birthday milestone.'
    },
    
    // Wedding Sessions
    {
        id: 13,
        title: "Emcee and Cy Wedding",
        category: 'wedding',
        previewImage: 'images/Emcee and Cy Wedding/1.jpg',
        folderPath: 'images/Emcee and Cy Wedding',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.924101283252445&type=3',
        description: 'Emcee and Cy\'s beautiful wedding day captured.'
    },
    {
        id: 14,
        title: "Eljan and Princess Wedding",
        category: 'wedding',
        previewImage: 'images/Eljan and Princess Wedding/1.jpg',
        folderPath: 'images/Eljan and Princess Wedding',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.924075359921704&type=3',
        description: 'Eljan and Princess\'s wedding celebration.'
    },
    {
        id: 15,
        title: "Dolly's 70th & Wedding Vows",
        category: 'wedding',
        previewImage: 'images/Dolly\'s 70th & Wedding Vows/1.jpg',
        folderPath: 'images/Dolly\'s 70th & Wedding Vows',
        totalImages: 5,
        facebookLink: 'https://www.facebook.com/media/set/?set=a.761054639557111&type=3',
        description: 'Dolly\'s 70th birthday and wedding vows renewal.'
    }
];

let currentFilter = 'all';
let currentLightboxIndex = 0;
let currentImageIndex = 0;
let currentFolderImages = [];
let filteredGallery = [...galleryData];

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    initializeFilters();
    initializeLightbox();
});

// ============================================
// GALLERY INITIALIZATION
// ============================================

function initializeGallery() {
    renderGallery();
}

function renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    galleryGrid.innerHTML = '';
    
    filteredGallery.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${item.previewImage}" alt="${item.title}">
            <div class="gallery-overlay">
                <div class="gallery-overlay-content">
                    <div class="gallery-overlay-category">${item.category.toUpperCase()}</div>
                    <div class="gallery-overlay-title">${item.title}</div>
                    <button class="gallery-overlay-btn" data-index="${index}">View Slideshow</button>
                </div>
            </div>
        `;
        
        galleryItem.addEventListener('click', function() {
            openLightbox(index);
        });
        
        galleryGrid.appendChild(galleryItem);
    });
}

// ============================================
// FILTERS
// ============================================

function initializeFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentFilter = this.dataset.filter;
            filterGallery();
        });
    });
}

function filterGallery() {
    if (currentFilter === 'all') {
        filteredGallery = [...galleryData];
    } else {
        filteredGallery = galleryData.filter(item => item.category === currentFilter);
    }
    
    renderGallery();
}

// ============================================
// LIGHTBOX WITH SLIDESHOW
// ============================================

function initializeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    
    if (lightboxOverlay) {
        lightboxOverlay.addEventListener('click', closeLightbox);
    }
    
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', previousImage);
    }
    
    if (lightboxNext) {
        lightboxNext.addEventListener('click', nextImage);
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (lightbox && lightbox.classList.contains('active')) {
            if (e.key === 'ArrowLeft') previousImage();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'Escape') closeLightbox();
        }
    });
}

function generateImageArray(item) {
    // Generate array of all images in the folder based on actual totalImages count
    const images = [];
    for (let i = 1; i <= item.totalImages; i++) {
        images.push(`${item.folderPath}/${i}.jpg`);
    }
    return images;
}

function openLightbox(index) {
    currentLightboxIndex = index;
    currentImageIndex = 0;
    const item = filteredGallery[index];
    
    // Generate all images for this folder
    currentFolderImages = generateImageArray(item);
    
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const lightboxCounter = document.getElementById('lightboxCounter');
    const lightboxFacebookLink = document.getElementById('lightboxFacebookLink');
    
    // Set initial image
    lightboxImage.src = currentFolderImages[currentImageIndex];
    lightboxTitle.textContent = item.title;
    lightboxDescription.textContent = item.description;
    
    // Update counter
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentFolderImages.length}`;
    }
    
    // Set Facebook link
    if (lightboxFacebookLink) {
        lightboxFacebookLink.href = item.facebookLink;
        lightboxFacebookLink.textContent = item.title;
    }
    
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function previousImage() {
    currentImageIndex = (currentImageIndex - 1 + currentFolderImages.length) % currentFolderImages.length;
    updateLightboxImage();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % currentFolderImages.length;
    updateLightboxImage();
}

function updateLightboxImage() {
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCounter = document.getElementById('lightboxCounter');
    
    lightboxImage.src = currentFolderImages[currentImageIndex];
    
    if (lightboxCounter) {
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${currentFolderImages.length}`;
    }
}

// ============================================
// LOAD MORE
// ============================================

const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
        // Add more items to gallery
        const newItems = [
            {
                id: 16,
                title: "Maternity Photoshoot",
                category: 'family',
                previewImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23F0E68C" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle"%3EMaternity%3C/text%3E%3C/svg%3E',
                folderPath: 'images/maternity',
                totalImages: 5,
                facebookLink: '#',
                description: 'Beautiful maternity photos celebrating motherhood.'
            },
            {
                id: 17,
                title: "New Year Party",
                category: 'friends',
                previewImage: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400"%3E%3Crect fill="%23FFB347" width="400" height="400"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle"%3ENew Year%3C/text%3E%3C/svg%3E',
                folderPath: 'images/newyear',
                totalImages: 5,
                facebookLink: '#',
                description: 'Ringing in the new year with friends and family.'
            }
        ];
        
        galleryData.push(...newItems);
        filterGallery();
        loadMoreBtn.style.display = 'none';
    });
}

// ============================================
// EXPORT FOR TESTING
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        galleryData,
        filterGallery,
        openLightbox,
        closeLightbox
    };
}
