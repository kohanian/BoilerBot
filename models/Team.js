function Team(name, points) {
	"use strict"
	if (!(this instanceof Team)) {
		return new Team(name, points);
	}
    this.name = name;
    this.points = points;
}

Team.prototype.print = function print() {
	console.log(this)
};

module.exports = Team;