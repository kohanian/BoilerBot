var driver = require('node-phantom-simple');
var phantomjs = require('phantomjs');
var $ = require('cheerio');
var stringformatter = require('./stringformatter.js')
function getLeaderboard(api, group) {
	driver.create({ path: phantomjs.path }, function (err, browser) {
	  return browser.createPage(function (err, page) {
	  	setTimeout(function() {
	  		return page.open("https://bracketchallenge.ncaa.com/picks/group/726554", function (err,status) {
		      console.log("opened site? ", status);
		      return page.evaluate(function () {
		        var nameArr = []
		        $('a.leaderboard__row.flx.txt-inh').each(function () { 
		          var bracket = {}
		          var name = $(this).find('div.leaderboard__entry-name').first().text();
		          var realName = $(this).find('div.leaderboard__real-name').first().text();
		          var rank = $(this).find('div.leaderboard__col--pts').first().text();
		          var points = $(this).find('div.leaderboard__col--rank').first().text();
		          bracket.name = name;
		          bracket.realName = realName;
		          bracket.rank = rank;
		          bracket.points = points;
		          nameArr.push(bracket); 
		        });
		        return {
		          names: nameArr,
		        };
		      }, 
		      function (err,result) {
		      	var finalStr = ""
		        for (var i = 0; i < result.names.length; i++) { 
		          var obj = result.names[i]
		          var formattedStr = stringformatter.formatString("{0}. {1}: {2}pts\n", 
		          	obj.rank, obj.realName, obj.points)
		          finalStr += formattedStr
		          console.log("%s. %s: %spts\n", obj.rank, obj.realName, obj.points)
		        }
		        api.sendMessage(finalStr, group)
		        browser.exit();
		      });
		    });
	  	}, 2000);
	  });
	});
}

module.exports.getLeaderboard = getLeaderboard;