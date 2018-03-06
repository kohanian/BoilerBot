'use strict'
const dotenv = require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const Repeat = require('repeat')

const joinLink = require("./modules/joinLink.js")
const leaderboard = require("./modules/leaderboard.js")
const scoreboard = require("./modules/scoreboard.js")

const login = require('facebook-chat-api')
const facebook_email = process.env.BOILER_BOT_EMAIL || "email@gmail.com"
const facebook_pass = process.env.BOILER_BOT_PASS || "password"
const facebook_group = process.env.BOILER_BOT_GROUP || "12345678"

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

console.log("Running on port......")
app.set('port', (process.env.PORT || 3000))
app.listen(process.env.PORT|| 3000, function(err) {
	if(err) {
		console.log(err);
	}
});
login({email: facebook_email, password: facebook_pass}, (err, api) => {
	    if(err) return console.error(err);
	    api.listen((err, message) => {
	    	if(message !== undefined && message.body === "/scores") {
	    		scoreboard.getScoreboard(api, message.threadID)
	    	}
	    	else {
	    		console.log("Error")
	    	}
	    });
	});


Repeat(joinLink.sendJoinLink).every(360, 'min').provided(function() {
	var date = new Date();
	var hrs = date.getHours();
	return hrs >= 9 && hrs <= 24;

}).start.in(360, 'min');
