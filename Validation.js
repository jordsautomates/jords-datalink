/**
 * JORDS DATALINK
 * Input validation utilities
 */

/**
 * Checks whether a value is a non-empty string.
 */
function isValidText(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates a workflow configuration.
 */
function validateWorkflowConfig(config) {
  if (!config || typeof config !== 'object') {
    throw new Error('Invalid workflow configuration.');
  }

  if (!isValidText(config.name)) {
    throw new Error('Workflow name is required.');
  }

  if (!Array.isArray(config.fields)) {
    throw new Error('Workflow fields must be an array.');
  }

  return true;
}