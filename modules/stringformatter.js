function formatString(strFormat) {
	var theseArgs = arguments
	String.format = function(format) {
	   var args = Array.prototype.slice.call(theseArgs, 1);
	   return format.replace(/{(\d+)}/g, function(match, number) { 
	     return typeof args[number] != 'undefined'
	       ? args[number] 
	       : match
	     ;
	   });
	  };
	return String.format(strFormat, arguments)
}

module.exports.formatString = formatString