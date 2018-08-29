require('dotenv').config()

const Telegram = require('node-telegram-bot-api');

const TOKEN = process.env.TOKEN;

const jarne_bot = new Telegram(TOKEN, {
  polling: true
});

const dialog = require('./dialogflow')

// You can find your project ID in your Dialogflow agent settings
const projectId = process.env.projectId;
const sessionId = 'quickstart-session-id';
const languageCode = 'en-US';

// Instantiate a DialogFlow client.
const dialogflow = require('dialogflow');
const sessionClient = new dialogflow.SessionsClient();

// Define session path
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

const trigger = 'I want to travel!';

jarne_bot.on('error', function (msg) {
  var chatId = msg.chat.id;

  console.error(msg);

  jarne_bot.sendMessage(chatId, 'Something gone wrong ! Wait, until i fix myself');
})

jarne_bot.on('polling_error', (error) => {
  console.log(error); // => 'EFATAL'
});

jarne_bot.on('message', function (msg) {
  var chatId = msg.chat.id;
  var message = msg.text.toString()

  console.log(msg.text)

  let options = {
    query: message,
    languageCode
  }

  jarne_bot.sendChatAction(chatId, 'upload_photo')

  jarne_bot.sendPhoto(chatId, 'giphy.gif')
    .catch(err => {
      console.log(err)
    });

  dialog(sessionPath, sessionClient, options).then(result => {
    console.log(result)
    jarne_bot.sendMessage(chatId, result.fulfillmentText);
  });

})