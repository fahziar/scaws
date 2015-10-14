/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var Valve = require('./Valve');

var instances = {
	valve1 : new Valve(2),
	valve2 : new Valve(3),
	valve3 : new Valve(4),
	valve4 : new Valve(5),
}

module.exports = instances;
