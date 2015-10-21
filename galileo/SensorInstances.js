/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var Sensor = require('./Sensor');
var Config = require('../configuration/ConfigManager').config;

var instances = {
    soils : {
        soil1 : new Sensor(1, 'soil1' in Config.sensors && Config.sensors['soil1']),
        soil2 : new Sensor(2, 'soil2' in Config.sensors && Config.sensors['soil2']),
        soil3 : new Sensor(3, 'soil3' in Config.sensors && Config.sensors['soil3']),
        soil4 : new Sensor(4, 'soil4' in Config.sensors && Config.sensors['soil4']),
        soil5 :  new Sensor(5, 'soil5' in Config.sensors && Config.sensors['soil5'])
    },
	light : new Sensor(0, true)
}

module.exports = instances;