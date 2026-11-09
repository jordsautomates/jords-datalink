/**
 * JORDS DATALINK
 * Telegram integration
 */

/**
 * Retrieves the configured Telegram bot token.
 * Credentials will be stored securely server-side.
 */
function getTelegramBotToken() {
  const token = PropertiesService
    .getScriptProperties()
    .getProperty('TELEGRAM_BOT_TOKEN');

  if (!token) {
    throw new Error('Telegram bot token is not configured.');
  }

  return token;
}

/**
 * Tests the Telegram bot connection.
 */
function testTelegramConnection() {
  const token = getTelegramBotToken();

  const url = 'https://api.telegram.org/bot' + token + '/getMe';

  const response = UrlFetchApp.fetch(url, {
    method: 'get',
    muteHttpExceptions: true
  });

  const result = JSON.parse(response.getContentText());

  if (!result.ok) {
    throw new Error('Telegram connection failed.');
  }

  return {
    success: true,
    botName: result.result.first_name,
    username: result.result.username
  };
}