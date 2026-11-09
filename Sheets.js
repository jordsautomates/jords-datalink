
/**
 * JORDS DATALINK
 * Google Sheets integration
 */

/**
 * Opens a spreadsheet using its ID.
 */
function connectGoogleSheet(spreadsheetId) {
  if (!isValidText(spreadsheetId)) {
    throw new Error('Google Spreadsheet ID is required.');
  }

  try {
    const spreadsheet = SpreadsheetApp.openById(
      spreadsheetId.trim()
    );

    return {
      success: true,
      spreadsheetId: spreadsheet.getId(),
      spreadsheetName: spreadsheet.getName()
    };

  } catch (error) {
    throw new Error(
      'Unable to connect to Google Sheets. Check the spreadsheet ID and permissions.'
    );
  }
}

/**
 * Retrieves the available sheet tabs.
 */
function getSpreadsheetTabs(spreadsheetId) {
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);

  return spreadsheet.getSheets().map(function(sheet) {
    return {
      name: sheet.getName(),
      sheetId: sheet.getSheetId()
    };
  });
}

/**
 * Creates a Google Spreadsheet using the workflow's configured fields.
 */
function createWorkflowSpreadsheet(spreadsheetName, fields) {
  if (!isValidText(spreadsheetName)) {
    throw new Error('Spreadsheet name is required.');
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('At least one data field is required.');
  }

  const headers = fields.map(function(field) {
    if (!isValidText(field.name)) {
      throw new Error('Invalid field name.');
    }
    return field.name.trim();
  });

  const spreadsheet = SpreadsheetApp.create(spreadsheetName.trim());
  const sheet = spreadsheet.getSheets()[0];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);

  return {
    success: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetName: spreadsheet.getName(),
    spreadsheetUrl: spreadsheet.getUrl(),
    sheetName: sheet.getName()
  };
}

function getSheetsIntegrationStatus() {
  return {
    success: true,
    message: 'Google Sheets integration is reachable.'
  };
}

