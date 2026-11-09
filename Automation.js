
/**
 * JORDS DATALINK
 * Automation execution management
 */

/**
 * Checks whether a workflow can be activated.
 */
function validateAutomation(workflow) {
  validateWorkflowConfig(workflow);

  if (!isValidText(workflow.source)) {
    throw new Error('A data source must be configured.');
  }

  if (!isValidText(workflow.destination)) {
    throw new Error('A destination must be configured.');
  }

  return true;
}

/**
 * Changes the workflow status.
 */
function setWorkflowStatus(workflow, status) {
  const allowedStatuses = ['DRAFT', 'ACTIVE', 'PAUSED'];

  if (!workflow || !workflow.id) {
    throw new Error('Invalid workflow.');
  }

  if (!allowedStatuses.includes(status)) {
    throw new Error('Invalid workflow status.');
  }

  workflow.status = status;
  workflow.updatedAt = new Date().toISOString();

  return workflow;
}

/**
 * Checks whether a workflow is ready for automation generation.
 */
function prepareAutomationGeneration(workflow) {
  validateAutomation(workflow);

  if (!workflow.spreadsheet ||
      !workflow.spreadsheet.spreadsheetId) {
    throw new Error('A Google Spreadsheet must be configured.');
  }

  return {
    success: true,
    ready: true,
    workflowId: workflow.id || null,
    workflowName: workflow.name,
    source: workflow.source,
    destination: workflow.destination,
    spreadsheetId: workflow.spreadsheet.spreadsheetId,
    message: 'Workflow is ready for automation generation.'
  };
}