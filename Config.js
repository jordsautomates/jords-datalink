/**
 * JORDS DATALINK
 * Central application configuration
 */

const APP_CONFIG = {
  NAME: 'Jords DataLink',
  VERSION: '1.0.0',
  BRAND: 'Jords | Automates',
  TAGLINE: 'Connect. Organize. Automate.',

  DEFAULTS: {
    PARSER_TYPE: 'LABEL_BASED',
    DUPLICATE_CHECK: true,
    SAVE_ORIGINAL_MESSAGE: true,
    SAVE_TIMESTAMP: true
  }
};

/**
 * Customer access registry
 */
const CUSTOMER_REGISTRY_SPREADSHEET_ID =
  '1x0qpFprNkXrW8ZMHSyQKLTKgsI7KVyrF9aizd_fFAEE';

const CUSTOMER_REGISTRY_SHEET_NAME = 'Customers';