var cheerio = require('cheerio');
var request = require('request');
var StringBuilder = require('string-builder')

function getScoreboard(api, group) {
	request('https://www.cbssports.com/college-basketball/scoreboard/', function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
	    var sb = new StringBuilder();
	    var length = $('div.single-score-card').length;
	    console.log("Length: " + length)
	    var i = 1
	    $('div.single-score-card').each(function(i, element) {
	    	i++;
	    	var gameStatus = $(this).find('div.game-status').first();

	    	var teamRow = $(this).find('td.team').first();
	    	var teamName = teamRow.find('a').last()
	    	var teamScore = teamRow.parent().find('td').last();

	    	var teamRow2 = $(this).find('td.team').last();
	    	var teamName2 = teamRow2.find('a').last();
	    	var teamScore2 = teamRow2.parent().find('td').last();

	    	var str = teamName.text().trim() + " " + teamScore.text().trim() + ", " + 
	    		teamName2.text().trim() + " " + teamScore2.text().trim();
	    	console.log(gameStatus.text().trim())
	    	console.log(str)
	    	sb.appendLine(gameStatus.text().trim())
	    	sb.appendLine(str)
	    	if(i === length) {
	    		console.log("Building String")
	    		api.sendMessage(sb.toString(), group)
	    	}
	    	// sb.appendLine(str)
	    });
	    // return sb.toString();
	  }
	  else {
	  	return "Error"
	  }
	});
}

module.exports.getScoreboard = getScoreboard