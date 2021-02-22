require('dotenv').config();
// Require the Node Slack SDK package (github.com/slackapi/node-slack-sdk)
const {
    WebClient,
    LogLevel
} = require("@slack/web-api");

// WebClient insantiates a client that can call API methods
// When using Bolt, you can use either `app.client` or the `client` passed to listeners.
const client = new WebClient(process.env.ACCESS_TOKEN, {
    // LogLevel can be imported and used to make debugging simpler
    logLevel: LogLevel.DEBUG
});
// You probably want to use a database to store any conversations information ;)
let conversationsStore = {};

async function populateConversationStore() {
    try {
        // Call the conversations.list method using the WebClient
        const result = await client.conversations.list();

        console.log(result.channels);
        saveConversations(result.channels);
    } catch (error) {
        console.error(error);
    }
}

// Put conversations into the JavaScript object
function saveConversations(conversationsArray) {
    let conversationId = '';

    conversationsArray.forEach(function (conversation) {
        // Key conversation info on its unique ID
        conversationId = conversation["id"];

        // Store the entire conversation object (you may not need all of the info)
        conversationsStore[conversationId] = conversation;
    });
}

populateConversationStore();