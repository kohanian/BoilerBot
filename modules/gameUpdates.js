var request = require('request')
var schedule = require('node-schedule')
var driver = require('node-phantom-simple');
var phantomjs = require('phantomjs');
var cheerio = require('cheerio')
var Team = require('../models/Team.js')

function startUpdates(api,url) {
	var task = schedule.scheduleJob('*/10 * * * * *', callbackClosure(api, url, function(api, url) {
		console.log("Starting innerJob for game updates....");
		runUpdates(api, url)
	}));
}


function getGameUpdates(api) {
	console.log("Starting job for checking games....");
	// var testTeam = new Team("1", "1");
	// testTeam.print()
	runGameCheck(api)
}

function runGameCheck(api) {
	console.log("Running phantom....");
	var $ = require("jquery");
	return driver.create({ path: phantomjs.path }, function (err, browser) {
	  return browser.createPage(function (err, page) {
	  	setTimeout(function() {
	  		return page.open('http://www.espn.com/mens-college-basketball/scoreboard/_/group/50', function (err,status) {
		      console.log("opened site? ", status);
		      console.log(new Team("2","2"))
		      page.Team = Team
		      return page.evaluate(function() {
		      	try {
			      	var teams = []
			        $('div.sb-content.competitors').each(function() {
				    	var awayTeamRef = $(this).find('tr.away').first()
				    	var awayTeamName = awayTeamRef.find('span.sb-team-short').first().text();
				    	var awayTeamFinal = awayTeamRef.find('td.total').first().find('span').first().text();
				    	var homeTeamRef = $(this).find('tr.home').first()
				    	var homeTeamName = homeTeamRef.find('span.sb-team-short').first().text();
				    	var homeTeamFinal = homeTeamRef.find('td.total').first().find('span').first().text();
				    	var Team = this.Team
				    	teams.push(new Team(awayTeamName, awayTeamFinal))
				    });
				    return {
			          teams: teams,
			        };
			    }
			    catch(error) {
			    	return {error: error.message, trace: error.trace}
			    }
		      },  
		      function (err,result) {
		      	console.log(err)
		      	console.log(result)
		      	var finalStr = ""
		      	console.log("Length: " + result.teams.length)
		        for (var i = 0; i < result.teams.length; i++) { 
		          var obj = result.teams[i]
		          obj.print()
		        }
		        browser.exit();
		      });
		    });
	  	}, 5000);
	  });
	});
}


function runUpdates(api, url) {
	console.log("Running phantom....");
	console.log("URL: " + url);
	var $ = require("jquery");
	return driver.create({ path: phantomjs.path }, function (err, browser) {
	  return browser.createPage(function (err, page) {
	  	setTimeout(function() {
	  		return page.open(url, function (err,status) {
		      console.log("opened site? ", status);
		      return page.evaluate(function () {
		        var plays = []
		        $('table.play-item').each(function () { 
		          var play = {}
				  var desc = $(this).find('td.description').text();
		          play.desc = desc;
		          play.time = 
		          plays.push(play); 
		        });
		        return {
		          plays: plays,
		        };
		      }, 
		      function (err,result) {
		      	var finalStr = ""
		      	console.log("Length: " + result.plays.length)
		        for (var i = 0; i < result.plays.length; i++) { 
		          var obj = result.plays[i]
		          console.log("%s\n", obj.desc)
		        }
		        browser.exit();
		      });
		    });
	  	}, 2000);
	  });
	});
}

module.exports.getGameUpdates = getGameUpdates