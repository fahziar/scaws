/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:false */
// Leave the above lines for propper jshinting

var mraa = require("mraa");

function Sensor(pinNumber, enabled, alias) {
    this.pinNumber = pinNumber;
    this.enabled = enabled;
    this.alias = alias;
    this.pin = new mraa.Aio(pinNumber);
}

Sensor.prototype.getValue = function() {
	if (this.enabled){
    	return this.pin.read();   
	} else {
		return 1023;
	}
};

module.exports = Sensor;