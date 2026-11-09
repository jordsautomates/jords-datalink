
/**
 * JORDS DATALINK
 * Main application entry point
 */

function doGet() {
  return HtmlService
    .createTemplateFromFile('Index')
    .evaluate()
    .setTitle('Jords DataLink – Automation Builder')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/**
 * Loads reusable HTML files.
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
