# Quick Setup Guide for Google Sheets Integration

You already have your Google Sheet: https://docs.google.com/spreadsheets/d/1P1OT7irNbPE7q6Ru0oIYJezpSLgk76rcW3PDzwpBHoo/edit

## Follow these steps:

### Step 1: Add Column Headers (if not already done)
1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1P1OT7irNbPE7q6Ru0oIYJezpSLgk76rcW3PDzwpBHoo/edit
2. Make sure Row 1 has these headers:
   - Column A: `Timestamp`
   - Column B: `Name`
   - Column C: `Village`
   - Column D: `Problem Description`

### Step 2: Create Google Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script** (top menu)
2. Delete any default code
3. Copy and paste the code from `Code.gs` file (in your project folder)
4. Click **Save** (💾) and name your project: "Form to Sheets"

### Step 3: Deploy as Web App (IMPORTANT!)
1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" → Choose **Web app**
3. Set these settings:
   - **Description**: "Problem Form Handler" (optional)
   - **Execute as**: "Me" (your email)
   - **Who has access**: **"Anyone"** ← This is crucial!
4. Click **Deploy**
5. **COPY THE WEB APP URL** - It will look like:
   ```
   https://script.google.com/macros/s/AKfycbyXXXXXXXX/exec
   ```
6. You'll see an authorization screen - click **Authorize access**
7. Sign in with your Google account
8. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
9. Click **Allow**

### Step 4: Update Your Website Code
1. Open `index.html` in your editor
2. Find this line (around line 717):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace it with your Web App URL from Step 3.5:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_ACTUAL_ID/exec';
   ```
4. Save the file

### Step 5: Test It!
1. Open your website
2. Fill out the problem form
3. Submit it
4. Check your Google Sheet - you should see a new row! 🎉

---

## Need the Code?

The Google Apps Script code is in `Code.gs` file in your project folder. Just copy and paste it into Apps Script editor.

## Troubleshooting

**The Web App URL is different from your sheet URL!**
- Sheet URL: `https://docs.google.com/spreadsheets/d/...`
- Web App URL: `https://script.google.com/macros/s/...`
- You need the **Web App URL** in your HTML code

**Still having issues?** 
- Make sure you deployed as "Web app" (not API executable)
- Make sure "Who has access" is set to "Anyone"
- Check that you authorized the script properly

