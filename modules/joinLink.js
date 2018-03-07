const login = require('facebook-chat-api')
const facebook_email = process.env.BOILER_BOT_EMAIL || "email@gmail.com"
const facebook_pass = process.env.BOILER_BOT_PASS || "password"
const facebook_group = process.env.BOILER_BOT_GROUP || "12345678"

function sendLink(api) {
	var message = {};
	message.body = "Reminder to create a bracket and pay your buy in. Links in the spreadsheet:  http://bit.ly/2H47Xhz";
	message.url = "http://bit.ly/2H47Xhz";
	api.sendMessage(message, facebook_group);
}

module.exports.sendJoinLink = sendLink