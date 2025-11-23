# Google Sheets Setup Instructions

Follow these steps to connect your form to Google Sheets:

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "Gram Panchayat Problems" or "Chandoli Problems"
4. In the first row (Row 1), add these column headers in this order:
   - Column A: `Name`
   - Column B: `Village`
   - Column C: `Problem Description`
   - Column D: `Timestamp` (at the end)

## Step 2: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any default code that appears
3. Copy and paste this code:

```javascript
function doPost(e) {
  try {
    // Get the active spreadsheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Prepare row data: [Timestamp, Name, Village, Description]
    const rowData = [
      data.timestamp || new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      data.name || '',
      data.village || '',
      data.description || ''
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully' 
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString() 
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Test function to verify setup
function test() {
  const testData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: 'Test User',
    village: 'Chandoli',
    description: 'This is a test problem'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
}
```

4. Click the **Save** icon (💾) or press `Cmd+S` (Mac) / `Ctrl+S` (Windows)
5. Name your project (e.g., "Form to Sheets")

## Step 3: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon (⚙️) next to "Select type" and choose **Web app**
3. Fill in the deployment settings:
   - **Description**: "Form to Sheets Handler" (optional)
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (this is important!)
4. Click **Deploy**
5. **Copy the Web App URL** that appears (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)
6. Click **Authorize access** (you may need to sign in again)
7. Click **Advanced** → **Go to [Your Project Name] (unsafe)**
8. Click **Allow**

## Step 4: Update Your Website

1. Open `index.html` in your editor
2. Find this line (around line 717):
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_SCRIPT_URL_HERE';
   ```
3. Replace `'YOUR_GOOGLE_SCRIPT_URL_HERE'` with your actual Google Apps Script URL (from Step 3.5)
   - Example: `const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby.../exec';`

## Step 5: Test It!

1. Open your website in a browser
2. Fill out the problem submission form
3. Click "Submit Problem"
4. Check your Google Sheet - you should see the new entry!

## Troubleshooting

**Problem: Form submits but data doesn't appear in sheet**
- Make sure you deployed the script as a **Web app** (not an API executable)
- Check that "Who has access" is set to **"Anyone"**
- Verify the URL in your HTML code matches the deployment URL

**Problem: "Access denied" error**
- Re-authorize the script (go back to Apps Script → Deploy → Manage deployments → edit → authorize)

**Problem: CORS error in browser console**
- This is normal when using `no-cors` mode. The form will still work even if you see this error.

## Security Note

Since the script URL is public (in your HTML), anyone can submit data to your sheet. The Apps Script code above only adds data (doesn't delete or modify), so it's relatively safe. For production use, you might want to add:
- Rate limiting
- CAPTCHA
- Data validation

---

**Need Help?** Check the Google Apps Script documentation: https://developers.google.com/apps-script

