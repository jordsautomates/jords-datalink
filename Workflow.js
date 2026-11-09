/**
 * JORDS DATALINK
 * Workflow management
 */

/**
 * Creates a new workflow configuration.
 */
function createWorkflow(config) {
  if (!config || !config.name) {
    throw new Error('Workflow name is required.');
  }

  return {
    id: Utilities.getUuid(),
    name: config.name,
    source: config.source || '',
    destination: config.destination || '',
    parserType: config.parserType || APP_CONFIG.DEFAULTS.PARSER_TYPE,
    fields: config.fields || [],
    status: 'DRAFT',
    createdAt: new Date().toISOString()
  };
}