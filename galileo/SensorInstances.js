/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */

var Sensor = require('./Sensor');

var instances = {
    soils : {
        soil1 : new Sensor(1),
        soil2 : new Sensor(2),
        soil3 : new Sensor(3),
//        soil4 : new Sensor(4),
//        soil5 : new Sensor(5),
    },
	light : new Sensor(0)
}

module.exports = instances;