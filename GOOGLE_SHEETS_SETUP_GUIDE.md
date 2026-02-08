# 🎯 CELEBRIFRAME PHOTOBOOTH - GOOGLE SHEETS SETUP GUIDE

## 📋 OVERVIEW

This guide will help you set up Google Sheets to receive bookings, user registrations, and newsletter subscriptions from your Celebriframe Photobooth website.

---

## 🚀 STEP 1: CREATE GOOGLE SHEET

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"Blank"** to create a new spreadsheet
3. Rename it to: **"Celebriframe Bookings Database"**

---

## 📊 STEP 2: CREATE REQUIRED SHEETS

Create 4 sheets (tabs) with these exact names:

### Sheet 1: **BOOKINGS**

**Columns (Row 1):**
```
A: Booking ID
B: Customer Name
C: Email
D: Phone
E: Location
F: Date
G: Time Slot
H: Package
I: Package Price
J: Add-ons
K: Total Amount
L: Guest Count
M: Special Requests
N: Booking Date
O: Status
P: Payment Status
```

### Sheet 2: **USERS**

**Columns (Row 1):**
```
A: User ID
B: Full Name
C: Email
D: Phone
E: Password Hash
F: Registration Date
G: Status
```

### Sheet 3: **NEWSLETTER**

**Columns (Row 1):**
```
A: Email
B: Subscription Date
C: Status
```

### Sheet 4: **CONFIG**

**Columns (Row 1):**
```
A: Setting Name
B: Value
```

**Add these rows:**
```
Row 2: Total Bookings | 0
Row 3: Total Users | 0
Row 4: Total Revenue | 0
```

---

## 💻 STEP 3: CREATE APPS SCRIPT

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste this COMPLETE code:

```javascript
// ===================================
// CELEBRIFRAME PHOTOBOOTH - APPS SCRIPT
// Google Sheets Backend Integration
// ===================================

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    switch(action) {
      case 'booking':
        return handleBooking(data.data);
      case 'registerUser':
        return handleUserRegistration(data.data);
      case 'newsletter':
        return handleNewsletter(data.email, data.date);
      default:
        return createResponse({ error: 'Unknown action' }, 400);
    }
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return createResponse({ error: error.toString() }, 500);
  }
}

function handleBooking(bookingData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const bookingSheet = ss.getSheetByName('BOOKINGS');
  
  // Prepare data row
  const row = [
    bookingData.bookingId,
    bookingData.customer.name,
    bookingData.customer.email,
    bookingData.customer.phone,
    bookingData.location,
    bookingData.date,
    bookingData.time,
    bookingData.package,
    bookingData.packagePrice,
    JSON.stringify(bookingData.addons),
    bookingData.totalAmount,
    bookingData.customer.guestCount,
    bookingData.customer.specialRequests || '',
    new Date().toISOString(),
    bookingData.status,
    'Pending'
  ];
  
  // Append to sheet
  bookingSheet.appendRow(row);
  
  // Update config
  updateConfig('Total Bookings', 1, true);
  updateConfig('Total Revenue', bookingData.totalAmount, true);
  
  // Send confirmation email
  sendBookingConfirmation(bookingData);
  
  return createResponse({ 
    success: true, 
    bookingId: bookingData.bookingId 
  });
}

function handleUserRegistration(userData) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const userSheet = ss.getSheetByName('USERS');
  
  // Check if email already exists
  const emails = userSheet.getRange(2, 3, userSheet.getLastRow() - 1, 1).getValues();
  const emailExists = emails.some(row => row[0] === userData.email);
  
  if (emailExists) {
    return createResponse({ error: 'Email already registered' }, 400);
  }
  
  // Prepare data row
  const row = [
    userData.userId,
    userData.name,
    userData.email,
    userData.phone,
    userData.passwordHash,
    new Date().toISOString(),
    userData.status
  ];
  
  // Append to sheet
  userSheet.appendRow(row);
  
  // Update config
  updateConfig('Total Users', 1, true);
  
  // Send welcome email
  sendWelcomeEmail(userData);
  
  return createResponse({ 
    success: true, 
    userId: userData.userId 
  });
}

function handleNewsletter(email, date) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const newsletterSheet = ss.getSheetByName('NEWSLETTER');
  
  // Check if already subscribed
  const emails = newsletterSheet.getRange(2, 1, newsletterSheet.getLastRow() - 1, 1).getValues();
  const alreadySubscribed = emails.some(row => row[0] === email);
  
  if (alreadySubscribed) {
    return createResponse({ error: 'Already subscribed' }, 400);
  }
  
  // Append subscription
  newsletterSheet.appendRow([email, date, 'Active']);
  
  return createResponse({ success: true });
}

function updateConfig(settingName, value, increment = false) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const configSheet = ss.getSheetByName('CONFIG');
  
  const settings = configSheet.getRange(2, 1, configSheet.getLastRow() - 1, 2).getValues();
  
  for (let i = 0; i < settings.length; i++) {
    if (settings[i][0] === settingName) {
      const currentValue = parseFloat(settings[i][1]) || 0;
      const newValue = increment ? currentValue + value : value;
      configSheet.getRange(i + 2, 2).setValue(newValue);
      break;
    }
  }
}

function sendBookingConfirmation(bookingData) {
  const subject = `🎉 Booking Confirmed - ${bookingData.bookingId}`;
  const body = `
Dear ${bookingData.customer.name},

Thank you for booking with Celebriframe Photobooth!

📸 BOOKING DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Booking ID: ${bookingData.bookingId}
Location: ${bookingData.location}
Date: ${new Date(bookingData.date).toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
Time: ${bookingData.time}
Package: ${bookingData.package}

Total Amount: ₱${bookingData.totalAmount.toLocaleString()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT'S NEXT:
1. Complete payment to secure your slot
2. Arrive 5-10 minutes before your session
3. Bring valid ID for verification

PAYMENT OPTIONS:
• GCash: 0917-123-4567 (Juan Dela Cruz)
• Bank Transfer: BPI - 1234567890
• Cash (on-site, subject to availability)

Send payment proof to: payments@celebriframe.ph

For questions, contact us:
📧 hello@celebriframe.ph
📱 +63 917 123 4567

See you soon!
— Celebriframe Team

Celebrate Life, Frame the Moments
  `;
  
  try {
    MailApp.sendEmail({
      to: bookingData.customer.email,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
  }
}

function sendWelcomeEmail(userData) {
  const subject = '✨ Welcome to Celebriframe!';
  const body = `
Dear ${userData.name},

Welcome to Celebriframe Photobooth! 🎉

Your account has been successfully created. You can now:
✓ Book sessions faster
✓ Track your bookings
✓ Access exclusive member discounts
✓ Get priority slots

Ready to capture your moments? Book your first session now!

Best regards,
— Celebriframe Team

Celebrate Life, Frame the Moments
  `;
  
  try {
    MailApp.sendEmail({
      to: userData.email,
      subject: subject,
      body: body
    });
  } catch (error) {
    Logger.log('Email error: ' + error.toString());
  }
}

function createResponse(data, code = 200) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// Test function
function testBooking() {
  const testData = {
    action: 'booking',
    data: {
      bookingId: 'TEST-001',
      customer: {
        name: 'Test User',
        email: 'test@example.com',
        phone: '+63 917 123 4567',
        guestCount: 2
      },
      location: 'Celebriframe Manila',
      date: '2026-03-15',
      time: '14:00-15:00',
      package: 'Duo Package',
      packagePrice: 1200,
      addons: [],
      totalAmount: 1200,
      status: 'Confirmed'
    }
  };
  
  const result = handleBooking(testData.data);
  Logger.log(result);
}
```

4. Click **Save** (💾 icon) and name it: **"CelebriframeBackend"**

---

## 🌐 STEP 4: DEPLOY AS WEB APP

1. In Apps Script, click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description:** "Celebriframe Booking System v1"
   - **Execute as:** "Me"
   - **Who has access:** "Anyone"
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to CelebriframeBackend (unsafe)**
9. Click **Allow**
10. **COPY THE WEB APP URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

---

## 🔗 STEP 5: UPDATE WEBSITE CODE

1. Open `js/main.js` in your website files
2. Find line 10:
```javascript
GOOGLE_SHEETS_URL: 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE',
```
3. Replace with your actual URL:
```javascript
GOOGLE_SHEETS_URL: 'https://script.google.com/macros/s/AKfycby.../exec',
```
4. Save the file

---

## ✅ STEP 6: TEST THE INTEGRATION

### Test Booking:
1. Go to your website
2. Click "Book a Session"
3. Complete the booking form
4. Check your Google Sheet → BOOKINGS tab
5. You should see the new booking appear!

### Test Newsletter:
1. Scroll to footer
2. Enter email in newsletter form
3. Check NEWSLETTER tab in Google Sheets

### Test User Registration:
1. Click user icon → Sign Up
2. Create account
3. Check USERS tab in Google Sheets

---

## 📧 EMAIL NOTIFICATIONS

The script automatically sends:
- ✉️ Booking confirmation emails
- ✉️ Welcome emails for new users

**Make sure:**
- Your Gmail allows sending from Apps Script
- Emails go to spam first time (mark as "Not Spam")

---

## 🔒 SECURITY NOTES

1. **Never share your Apps Script URL publicly**
2. **Password hashes** are used (not plain text)
3. **Access control** is set to "Anyone" for the web app to work
4. The sheet itself remains **private** to you

---

## 📊 VIEWING YOUR DATA

### Dashboard View (in Google Sheets):

Create a new sheet called **DASHBOARD** with formulas:

```
A1: TOTAL BOOKINGS
B1: =COUNTA(BOOKINGS!A:A)-1

A2: TOTAL REVENUE
B2: =SUM(BOOKINGS!K:K)

A3: PENDING BOOKINGS
B3: =COUNTIF(BOOKINGS!O:O,"Pending Payment")

A4: CONFIRMED BOOKINGS
B4: =COUNTIF(BOOKINGS!O:O,"Confirmed")

A5: TOTAL USERS
B5: =COUNTA(USERS!A:A)-1
```

---

## 🎨 CUSTOMIZATION

### Change Email Content:
Edit the `sendBookingConfirmation()` and `sendWelcomeEmail()` functions in Apps Script.

### Add More Fields:
1. Add column in Google Sheet
2. Update the `row` array in Apps Script
3. Update website form to collect the data

### Change Payment Info:
Edit the payment section in `sendBookingConfirmation()` function.

---

## 🐛 TROUBLESHOOTING

### Bookings not appearing?
- Check Apps Script execution logs: View → Logs
- Verify the Web App URL in `main.js`
- Ensure deployment is set to "Anyone"

### Emails not sending?
- Check Gmail quota (100 emails/day for free Gmail)
- Verify email address is correct
- Check spam folder

### "Permission denied" error?
- Re-authorize the script
- Check "Execute as: Me" in deployment

---

## 📱 MANAGING BOOKINGS

### Daily Workflow:
1. Check BOOKINGS sheet for new entries
2. Verify payment received
3. Update "Payment Status" to "Paid"
4. Update "Status" to "Confirmed"
5. Send reminder email 1 day before session

### Export Data:
- **To Excel:** File → Download → Microsoft Excel
- **To PDF:** File → Download → PDF
- **To CSV:** File → Download → CSV

---

## 🚀 GOING LIVE CHECKLIST

Before launching your website:

- [ ] Google Sheet created with all 4 tabs
- [ ] Apps Script code pasted and saved
- [ ] Web app deployed successfully
- [ ] Web app URL copied
- [ ] `main.js` updated with correct URL
- [ ] Test booking completed successfully
- [ ] Test email received
- [ ] Payment instructions updated with real details
- [ ] Contact email updated to real email

---

## 💡 PRO TIPS

1. **Use Google Forms** alternative:
   - If Apps Script is too complex, create a Google Form
   - Link it to a Google Sheet
   - Embed form on your website

2. **Zapier Integration:**
   - Connect Google Sheets to other apps
   - Automate email sequences
   - Sync with calendar

3. **Google Data Studio:**
   - Create visual dashboards
   - Track booking trends
   - Monitor revenue

4. **Conditional Formatting:**
   - Highlight pending payments in red
   - Confirmed bookings in green
   - Today's bookings in yellow

---

## 📞 SUPPORT

Having trouble? Common solutions:

**Q: Can I use this with multiple locations?**
A: Yes! The location is stored in the database. Filter by location in Sheets.

**Q: How do I limit time slots?**
A: Add logic in Apps Script to check existing bookings and return available slots only.

**Q: Can customers cancel bookings?**
A: Add a cancellation form that updates the Status column to "Cancelled".

**Q: How do I backup data?**
A: Google Sheets auto-saves. Additionally: File → Make a copy weekly.

---

## 🎉 YOU'RE READY!

Your Celebriframe Photobooth website is now fully functional with:
✅ Real-time booking system
✅ User registration
✅ Newsletter subscriptions
✅ Email notifications
✅ Excel-compatible tracking

**Next Steps:**
1. Add real photos to the gallery
2. Update pricing if needed
3. Add your actual payment details
4. Launch your website!

**Good luck with your photobooth business! 📸✨**

---

*Last updated: February 8, 2026*
