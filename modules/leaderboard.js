var cheerio = require('cheerio');
var request = require('request');
function getLeaderboard() {
	request('https://bracketchallenge.ncaa.com/picks/group/726554.html', function (error, response, html) {
	  if (!error && response.statusCode == 200) {
	    var $ = cheerio.load(html);
	    console.log(html.innerHTML);
	    $('a').each(function(i, element){
	      var a = $(this).contents();
	      console.log(a.text());
	    });
	  }
	});
}

module.exports.getLeaderboard = getLeaderboard