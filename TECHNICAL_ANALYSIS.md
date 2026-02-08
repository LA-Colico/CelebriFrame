# CELEBRIFRAME PHOTOBOOTH - TECHNICAL ANALYSIS & ARCHITECTURE

## 🎯 PROJECT OVERVIEW
Clone of ATOMM Studios website for Celebriframe Photobooth with full functionality including user authentication, booking system, and Excel-based tracking.

---

## 📊 DETAILED FEATURE ANALYSIS (Based on ATOMM Studios)

### 1. **HEADER & NAVIGATION**
- Logo (Celebriframe branding)
- Navigation menu: Home, Book a Session, Booking Policies, Our Works, FAQs
- User account icon (Sign in/Sign up)
- Shopping cart icon (if needed)
- Search functionality
- Responsive mobile menu

### 2. **HOME PAGE**
**Hero Section:**
- Full-width background image/video
- Headline: "This studio is for you."
- Subheadline: "Welcome to the Philippines' First Self-Photo Studio"
- CTA Buttons: "Book now" & "Learn More"

**Feature Cards:**
- "Level-up your portraits" (Solo/Personal shoots)
- "Make core memories" (Group/Family shoots)
- "Quality time = Quality photos" (Couples)
- "Bring your furry friends!" (Pet photoshoots)

**Customer Testimonials:**
- Rotating carousel with 5-star reviews
- Customer names and photos

**Atommica Section:**
- "Bring ATOMM to your events"
- Mobile photo booth rental service

**Booking Steps:**
1. Select location and schedule
2. Customize your package
3. Secure your spot (checkout)

### 3. **BOOK A SESSION PAGE**
**Location Selection:**
- Display available studio locations with:
  - Studio name
  - Address
  - Photos of the studio
  - Operating hours (e.g., Sat-Sun 1pm-8pm)
  - Available backdrops (color swatches)
  - "Get directions" link

**Booking Flow:**
- Step 1: Choose location
- Step 2: Select date and time slot
- Step 3: Choose package (number of people, duration, edited photos)
- Step 4: Add-ons selection
- Step 5: Customer information form
- Step 6: Payment details
- Step 7: Confirmation

### 4. **BOOKING POLICIES PAGE**
**Policies to Display:**
1. Number of Pax
   - Only booked pax allowed
   - Children count as 1 pax
   - Up to 2 non-participating companions
   - Max 11 pax per session

2. Late Policy
   - 15-minute grace period
   - Session ends at scheduled time regardless

3. Rescheduling Policy
4. Cancellation Policy
5. Payment Terms
6. House Rules

### 5. **OUR WORKS PAGE** (Replacing Gift Cards)
**Photo Gallery Features:**
- Grid/Masonry layout of photobooth sessions
- Filter by:
  - Event type (Birthday, Wedding, Corporate, etc.)
  - Year
  - Location
- Lightbox viewer for full-size images
- Album organization
- Load more / Infinite scroll
- Social media integration (#LightsCameraATOMM equivalent)

### 6. **FAQs PAGE**
**Category Filters:**
- All
- General Questions
- Package Inclusions
- During your Session
- Studio Policies
- Booking Information

**Search Functionality:**
- Search bar to find specific questions

**Accordion/Expandable Q&A:**
- What is Celebriframe?
- How does a self-photo booth work?
- Do I need to bring my own camera?
- Etc.

### 7. **USER AUTHENTICATION**
**Sign Up:**
- Full name
- Email address
- Phone number
- Password
- Confirm password
- Terms & conditions acceptance

**Sign In:**
- Email/Username
- Password
- "Forgot password?" link
- "Remember me" checkbox

**User Dashboard:**
- View upcoming bookings
- Booking history
- Profile management
- Download photos (if applicable)

---

## 🛠️ TECHNICAL STACK RECOMMENDATION

### ⚠️ PROBLEM: Excel Sheet Integration + Free Hosting

**CHALLENGE:**
You want bookings saved to an Excel file, but free static hosting (Netlify, Vercel, GitHub Pages) **cannot write to Excel files** because:
- They are **static hosts** (no server-side processing)
- Excel files require backend logic to write data
- No database or file system access

### ✅ SOLUTIONS:

#### **OPTION 1: Google Sheets Integration (RECOMMENDED)**
**Technology Stack:**
- **Frontend:** HTML + CSS + JavaScript (Vanilla)
- **Backend:** Google Apps Script (Free)
- **Database:** Google Sheets (Free)
- **Hosting:** Netlify / Vercel / GitHub Pages (Free)

**How it Works:**
1. User fills booking form
2. JavaScript sends data to Google Apps Script Web App
3. Apps Script writes to Google Sheets
4. Instant Excel-like tracking
5. Can export to Excel anytime

**ADVANTAGES:**
- ✅ 100% FREE
- ✅ Real-time updates
- ✅ Excel-compatible (export as .xlsx)
- ✅ Multiple users can access
- ✅ Automatic email notifications possible
- ✅ Works on any free static hosting

**DISADVANTAGES:**
- ❌ Requires Google account
- ❌ Daily quotas (but very generous for small businesses)

---

#### **OPTION 2: Firebase (Real-time Database)**
**Technology Stack:**
- **Frontend:** HTML + CSS + JavaScript
- **Backend:** Firebase (Free tier)
- **Database:** Firebase Realtime Database / Firestore
- **Auth:** Firebase Authentication
- **Hosting:** Firebase Hosting (Free)

**How it Works:**
1. User authentication via Firebase Auth
2. Bookings stored in Firebase Database
3. Admin dashboard to view/export bookings
4. Can create Excel export function

**ADVANTAGES:**
- ✅ Built-in authentication
- ✅ Real-time updates
- ✅ Generous free tier
- ✅ Scalable
- ✅ Security rules

**DISADVANTAGES:**
- ❌ Not direct Excel output (requires export script)
- ❌ More complex setup

---

#### **OPTION 3: Supabase (PostgreSQL)**
**Technology Stack:**
- **Frontend:** HTML + CSS + JavaScript
- **Backend:** Supabase (Free tier)
- **Database:** PostgreSQL
- **Auth:** Supabase Auth
- **Hosting:** Netlify + Supabase

**ADVANTAGES:**
- ✅ SQL database (more powerful)
- ✅ Built-in auth
- ✅ REST API automatically generated
- ✅ Can export to CSV/Excel

**DISADVANTAGES:**
- ❌ More technical
- ❌ Not direct Excel integration

---

#### **OPTION 4: Netlify Functions + Airtable**
**Technology Stack:**
- **Frontend:** HTML + CSS + JavaScript
- **Backend:** Netlify Serverless Functions
- **Database:** Airtable (Free tier)
- **Hosting:** Netlify (Free)

**ADVANTAGES:**
- ✅ Spreadsheet-like interface
- ✅ Easy to view/manage
- ✅ API access
- ✅ Can export to Excel

**DISADVANTAGES:**
- ❌ Airtable free tier limited to 1,200 records
- ❌ Requires some backend coding

---

## 🏆 FINAL RECOMMENDATION

### **PRIMARY CHOICE: Google Sheets + Apps Script**

**Why?**
1. ✅ **Closest to Excel** - You literally get a spreadsheet
2. ✅ **100% Free** - No hidden costs
3. ✅ **Easy to Access** - Anyone can view the Google Sheet
4. ✅ **Excel Export** - Download as .xlsx anytime
5. ✅ **No Backend Server Needed** - Works with static hosting
6. ✅ **Real-time Updates** - See bookings instantly
7. ✅ **Email Notifications** - Apps Script can send emails

---

## 📁 FILE STRUCTURE

```
celebriframe-website/
│
├── index.html                 # Home page
├── book-session.html          # Booking page
├── our-works.html             # Photo gallery
├── booking-policies.html      # Policies page
├── faqs.html                  # FAQs page
├── auth.html                  # Sign in / Sign up page
├── dashboard.html             # User dashboard (after login)
│
├── css/
│   ├── style.css              # Main stylesheet
│   ├── responsive.css         # Mobile responsiveness
│   └── animations.css         # Smooth transitions
│
├── js/
│   ├── main.js                # General site functionality
│   ├── auth.js                # Authentication logic
│   ├── booking.js             # Booking system logic
│   ├── gallery.js             # Photo gallery functionality
│   ├── faqs.js                # FAQ search & filter
│   └── google-sheets.js       # Google Sheets API integration
│
├── images/
│   ├── logo.png               # Celebriframe logo
│   ├── hero-bg.jpg            # Hero background
│   ├── studio-photos/         # Studio location photos
│   └── client-works/          # Client photoshoot albums
│
├── assets/
│   └── icons/                 # UI icons
│
└── README.md                  # Documentation
```

---

## 🔐 AUTHENTICATION FLOW

### **Sign Up:**
```
1. User fills form (name, email, phone, password)
2. Validation (email format, password strength)
3. Data sent to Google Sheets (User Database tab)
4. Password hashed (using CryptoJS or bcrypt.js)
5. Welcome email sent
6. User logged in automatically
7. Redirect to dashboard
```

### **Sign In:**
```
1. User enters email + password
2. Check against Google Sheets user database
3. Password verification
4. Create session (localStorage/sessionStorage)
5. Redirect to dashboard
```

### **Session Management:**
```javascript
// Store in localStorage
const userSession = {
  userId: "unique-id",
  email: "user@email.com",
  name: "John Doe",
  loginTime: Date.now()
};
localStorage.setItem('celebriframe_user', JSON.stringify(userSession));
```

---

## 📝 BOOKING FLOW & DATA STRUCTURE

### **Booking Form Fields:**
```javascript
const bookingData = {
  // User Info
  userId: "user-123",
  customerName: "John Doe",
  email: "john@email.com",
  phone: "+639123456789",
  
  // Booking Details
  bookingId: "CFB-20260208-001",
  location: "Celebriframe Studio Manila",
  date: "2026-02-15",
  timeSlot: "2:00 PM - 3:00 PM",
  
  // Package
  packageType: "Group Package",
  numberOfPax: 5,
  duration: "60 minutes",
  editedPhotos: 20,
  backdrop: "Sage Green",
  
  // Add-ons
  addOns: [
    { name: "Extra 10 photos", price: 500 },
    { name: "Printed photos", price: 300 }
  ],
  
  // Payment
  totalAmount: 2500,
  paymentStatus: "Pending",
  paymentMethod: "GCash",
  
  // Metadata
  bookingDate: "2026-02-08 14:30:00",
  status: "Confirmed",
  confirmationCode: "ABC123XYZ"
};
```

### **Google Sheets Tabs:**
1. **Bookings** - All booking records
2. **Users** - User accounts
3. **Availability** - Time slot management
4. **Packages** - Package pricing
5. **Revenue** - Financial tracking

---

## 🎨 DESIGN SYSTEM

### **Color Palette (From Celebriframe Logo):**
```css
:root {
  /* Primary Colors */
  --black: #000000;
  --gold: #00ccff;
  --yellow: #FFC300;
  
  /* Accent Colors */
  --white: #FFFFFF;
  --gray-light: #F5F5F5;
  --gray-medium: #CCCCCC;
  --gray-dark: #333333;
  
  /* Status Colors */
  --success: #28A745;
  --warning: #FFC107;
  --error: #DC3545;
  --info: #17A2B8;
}
```

### **Typography:**
```css
/* Headings */
font-family: 'Montserrat', sans-serif; /* Bold, modern */

/* Body Text */
font-family: 'Open Sans', sans-serif; /* Readable */
```

### **Components:**
- Buttons: Black with gold hover effect
- Cards: White with subtle shadow
- Forms: Clean, minimal, with gold focus states
- Icons: Gold filmstrip theme

---

## 📱 RESPONSIVE BREAKPOINTS

```css
/* Mobile */
@media (max-width: 768px) { ... }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { ... }

/* Desktop */
@media (min-width: 1025px) { ... }
```

---

## 🔌 GOOGLE SHEETS INTEGRATION SETUP

### **Step 1: Create Google Sheet**
Create sheets with these columns:

**BOOKINGS Sheet:**
| Booking ID | Date | Time | Customer Name | Email | Phone | Location | Package | Pax | Amount | Status |

**USERS Sheet:**
| User ID | Name | Email | Phone | Password Hash | Date Registered | Status |

### **Step 2: Google Apps Script**
```javascript
// Code.gs in Google Apps Script
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
                  .getSheetByName('Bookings');
  const data = JSON.parse(e.postData.contents);
  
  sheet.appendRow([
    data.bookingId,
    data.date,
    data.time,
    data.customerName,
    data.email,
    data.phone,
    data.location,
    data.package,
    data.pax,
    data.amount,
    data.status
  ]);
  
  return ContentService.createTextOutput(
    JSON.stringify({success: true})
  ).setMimeType(ContentService.MimeType.JSON);
}
```

### **Step 3: Deploy as Web App**
1. Click "Deploy" > "New deployment"
2. Select "Web app"
3. Execute as: "Me"
4. Who has access: "Anyone"
5. Copy the Web App URL

### **Step 4: Frontend Integration**
```javascript
// js/google-sheets.js
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

async function submitBooking(bookingData) {
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    
    console.log('Booking submitted successfully');
    return true;
  } catch (error) {
    console.error('Error:', error);
    return false;
  }
}
```

---

## 📊 PHOTO GALLERY IMPLEMENTATION

### **Data Structure:**
```javascript
const clientWorks = [
  {
    id: 1,
    title: "Sarah's 25th Birthday Bash",
    date: "2026-01-15",
    category: "Birthday",
    location: "Celebriframe Manila",
    images: [
      "img1.jpg",
      "img2.jpg",
      "img3.jpg"
    ],
    thumbnail: "thumb.jpg",
    featured: true
  }
];
```

### **Gallery Features:**
- Isotope.js for filtering
- Lightbox2 for image viewing
- Lazy loading for performance
- Pinterest-style masonry layout

---

## ✅ FEATURE CHECKLIST

### **Phase 1: Foundation (Week 1)**
- [ ] Set up project structure
- [ ] Create responsive header/footer
- [ ] Design home page
- [ ] Implement navigation

### **Phase 2: Core Pages (Week 2)**
- [ ] Book a Session page
- [ ] Booking Policies page
- [ ] FAQs page with search
- [ ] Our Works gallery

### **Phase 3: Authentication (Week 3)**
- [ ] Sign up form
- [ ] Sign in form
- [ ] Password hashing
- [ ] Session management
- [ ] User dashboard

### **Phase 4: Booking System (Week 4)**
- [ ] Location selection
- [ ] Date/time picker
- [ ] Package selection
- [ ] Payment form
- [ ] Confirmation page

### **Phase 5: Backend Integration (Week 5)**
- [ ] Google Sheets setup
- [ ] Apps Script deployment
- [ ] Form submission testing
- [ ] Email notifications

### **Phase 6: Polish & Deploy (Week 6)**
- [ ] Mobile optimization
- [ ] Performance optimization
- [ ] Browser testing
- [ ] Deploy to Netlify/Vercel
- [ ] Domain setup

---

## 🚀 DEPLOYMENT CHECKLIST

### **Pre-Deployment:**
- [ ] Test all forms
- [ ] Verify Google Sheets connection
- [ ] Check mobile responsiveness
- [ ] Optimize images
- [ ] Minify CSS/JS
- [ ] Test on multiple browsers

### **Hosting Setup (Netlify):**
1. Create Netlify account
2. Connect GitHub repository (or drag & drop)
3. Configure build settings
4. Add custom domain (optional)
5. Enable HTTPS
6. Set up contact form (Netlify Forms)

### **Post-Deployment:**
- [ ] Test live site
- [ ] Submit booking test
- [ ] Check Google Sheets
- [ ] Set up analytics (Google Analytics)
- [ ] Monitor performance

---

## 📈 FUTURE ENHANCEMENTS

1. **Payment Integration**
   - GCash API
   - PayMaya
   - Credit card processing

2. **Advanced Features**
   - Calendar availability sync
   - Automated email confirmations
   - SMS notifications
   - Photo download portal
   - Review system

3. **Admin Dashboard**
   - Manage bookings
   - Edit availability
   - View analytics
   - Export reports

4. **Mobile App** (Future)
   - React Native app
   - Push notifications
   - Mobile booking

---

## 🎯 SUMMARY

**RECOMMENDED TECH STACK:**
- **Frontend:** HTML + CSS + JavaScript
- **Backend:** Google Apps Script
- **Database:** Google Sheets
- **Hosting:** Netlify (Free)
- **Auth:** Custom (localStorage + Google Sheets)

**TOTAL COST:** $0 (100% FREE)

**DEVELOPMENT TIME:** 4-6 weeks

**RESULT:** Fully functional website with:
✅ User authentication
✅ Interactive booking system
✅ Excel-compatible tracking (Google Sheets)
✅ Photo gallery
✅ Mobile responsive
✅ Easy to maintain

---

## ❓ QUESTIONS BEFORE PROCEEDING:

1. **Do you have a Google account for Google Sheets?** (Yes/No)
2. **Do you have Celebriframe logo files?** (PNG/SVG)
3. **Do you have sample client photos?** (For gallery)
4. **Studio locations?** (Addresses, photos)
5. **Package pricing?** (Different tiers)
6. **Payment methods?** (GCash, Bank transfer, etc.)
7. **Operating hours?** (Days and times)

---

**READY TO BUILD?** 🚀

If you approve this architecture, I'll start creating:
1. Complete HTML/CSS/JS website
2. Google Sheets integration code
3. Deployment instructions
4. User manual

Let me know if you want any modifications to this plan!
