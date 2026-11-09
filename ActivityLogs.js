
/**
 * JORDS DATALINK
 * Activity logging
 */

/**
 * Creates a standardized activity log entry.
 */
function createActivityLog(workflowId, action, status, details) {
  return {
    id: Utilities.getUuid(),
    workflowId: workflowId || '',
    action: action || 'UNKNOWN',
    status: status || 'INFO',
    details: details || '',
    timestamp: new Date().toISOString()
  };
}
