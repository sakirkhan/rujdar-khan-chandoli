/**
 * Google Apps Script for Gram Panchayat Chandoli Problem Submission Form
 * This script receives form data and saves it to Google Sheets
 * 
 * IMPORTANT: Make sure this script is bound to your Google Sheet:
 * https://docs.google.com/spreadsheets/d/1GwFgx8YHvHtJz2jRx70YFtjz7i5SOdUdOqyhNStshmM/edit
 * 
 * Column Order: Name | Village | Problem Description | Timestamp
 */

// Handle GET requests (for testing/verification)
function doGet(e) {
  return HtmlService.createHtmlOutput(
    '<html><body style="font-family: Arial, sans-serif; padding: 20px;">' +
    '<h2>✅ Google Apps Script is Working!</h2>' +
    '<p>This script is ready to receive form submissions.</p>' +
    '<p><strong>Sheet URL:</strong><br><a href="https://docs.google.com/spreadsheets/d/1GwFgx8YHvHtJz2jRx70YFtjz7i5SOdUdOqyhNStshmM/edit" target="_blank">https://docs.google.com/spreadsheets/d/1GwFgx8YHvHtJz2jRx70YFtjz7i5SOdUdOqyhNStshmM/edit</a></p>' +
    '<p style="color: #666; font-size: 14px; margin-top: 20px;">Form data will be saved to the first sheet automatically.</p>' +
    '</body></html>'
  );
}

// Handle POST requests (form submissions)
function doPost(e) {
  try {
    // Get the specific spreadsheet by ID
    // Your Google Sheet ID: 1GwFgx8YHvHtJz2jRx70YFtjz7i5SOdUdOqyhNStshmM
    const spreadsheetId = '1GwFgx8YHvHtJz2jRx70YFtjz7i5SOdUdOqyhNStshmM';
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getActiveSheet();
    
    // Parse the incoming data - handle both JSON and form data
    let data = {};
    
    if (e.postData && e.postData.contents) {
      // Try to parse as JSON first (this is what the HTML form sends)
      try {
        data = JSON.parse(e.postData.contents);
      } catch (jsonError) {
        // If not JSON, try to parse as form data
        const params = e.parameter;
        data = {
          timestamp: params.timestamp || '',
          name: params.name || '',
          village: params.village || '',
          description: params.description || ''
        };
      }
    } else if (e.parameter) {
      // Handle form-encoded data
      data = {
        timestamp: e.parameter.timestamp || '',
        name: e.parameter.name || '',
        village: e.parameter.village || '',
        description: e.parameter.description || ''
      };
    }
    
    // Prepare row data: [Name, Village, Description, Timestamp]
    // Order changed: Timestamp moved to last column
    const timestamp = data.timestamp || new Date().toLocaleString('en-IN', { 
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
    
    // Prepare row data in order: [Name, Village, Description, Timestamp]
    const rowData = [
      data.name || '',
      data.village || '',
      data.description || '',
      timestamp
    ];
    
    // Append the row to the sheet
    sheet.appendRow(rowData);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: true, 
        message: 'Data saved successfully',
        timestamp: timestamp
      })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({ 
        success: false, 
        error: error.toString(),
        message: 'Failed to save data. Please check the script logs.'
      })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Optional: Test function to verify setup
 * Run this from the Apps Script editor to test if everything works
 */
function test() {
  const testData = {
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    name: 'Test User',
    village: 'Chandoli',
    description: 'This is a test problem submission'
  };
  
  const e = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(e);
  Logger.log(result.getContent());
  
  // Check your sheet - you should see a new row with the test data
}

