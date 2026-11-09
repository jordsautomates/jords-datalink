/**
 * JORDS DATALINK
 * Message parsing engine
 */

/**
 * Main message parser.
 */
function parseMessage(message, fields, parserType) {
  if (!isValidText(message)) {
    throw new Error('Message cannot be empty.');
  }

  if (!Array.isArray(fields) || fields.length === 0) {
    throw new Error('At least one data field is required.');
  }

  switch (parserType || APP_CONFIG.DEFAULTS.PARSER_TYPE) {
    case 'LABEL_BASED':
      return parseLabelBased(message, fields);

    case 'POSITION_BASED':
      throw new Error('Position-based parsing is not yet implemented.');

    default:
      throw new Error('Unsupported parser type.');
  }
}

/**
 * Extracts values using field labels.
 */
function parseLabelBased(message, fields) {
  const result = {};

  fields.forEach(function(field) {
    result[field.name] = '';
  });

  return result;
}