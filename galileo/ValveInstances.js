/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var Valve = require('./Valve');
var Config = require('../configuration/ConfigManager').config;


var instances = {
	valve1 : new Valve(2, 'valve1' in Config.valves, 'valve1'),
	valve2 : new Valve(3, 'valve2' in Config.valves, 'valve2'),
	valve3 : new Valve(4, 'valve3' in Config.valves, 'valve3'),
	valve4 : new Valve(5, 'valve4' in Config.valves, 'valve4')
}

module.exports = instances;
