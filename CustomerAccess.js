/**
 * JORDS DATALINK
 * Customer access registry
 */

/**
 * Looks up a customer by Google email.
 * Internal helper; not directly callable from the browser.
 */
function getCustomerLicenseStatus_(email) {
  if (!email || typeof email !== 'string') {
    return {
      enrolled: false,
      reason: 'INVALID_EMAIL'
    };
  }

  const normalizedEmail = email.trim().toLowerCase();

  const spreadsheet = SpreadsheetApp.openById(
    CUSTOMER_REGISTRY_SPREADSHEET_ID
  );

  const sheet = spreadsheet.getSheetByName(
    CUSTOMER_REGISTRY_SHEET_NAME
  );

  if (!sheet) {
    throw new Error('Customer registry sheet was not found.');
  }

  const records = sheet.getDataRange().getValues();

  if (records.length < 2) {
    return {
      enrolled: false,
      reason: 'NOT_ENROLLED'
    };
  }

  for (let i = 1; i < records.length; i++) {
    const registeredEmail = String(records[i][2])
      .trim()
      .toLowerCase();

    if (registeredEmail === normalizedEmail) {
      const license = String(records[i][3])
        .trim()
        .toUpperCase();

      const expiryDate = records[i][5];

      if (license !== 'ACTIVE') {
        return {
          enrolled: true,
          authorized: false,
          reason: license
        };
      }

      if (expiryDate instanceof Date &&
          !isNaN(expiryDate.getTime())) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);

        if (expiry < today) {
          return {
            enrolled: true,
            authorized: false,
            reason: 'EXPIRED'
          };
        }
      }

      return {
        enrolled: true,
        authorized: true,
        reason: 'ACTIVE',
        customerId: records[i][0],
        customerName: records[i][1],
        plan: records[i][4]
      };
    }
  }

  return {
    enrolled: false,
    authorized: false,
    reason: 'NOT_ENROLLED'
  };
}

function testCustomerRegistry() {
  const spreadsheet = SpreadsheetApp.openById(
    CUSTOMER_REGISTRY_SPREADSHEET_ID
  );

  const sheet = spreadsheet.getSheetByName(
    CUSTOMER_REGISTRY_SHEET_NAME
  );

  if (!sheet) {
    throw new Error('Customers sheet not found.');
  }

  Logger.log('Registry connected: ' + spreadsheet.getName());
  Logger.log('Customer records: ' + (sheet.getLastRow() - 1));

  return 'Customer registry connected successfully.';
}