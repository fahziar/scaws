/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:false */
// Leave the above lines for propper jshinting

var mraa = require("mraa");

function Sensor(pinNumber, alias) {
    this.pinNumber = pinNumber;
    this.alias = alias;
    this.pin = new mraa.Aio(pinNumber);
}

Sensor.prototype.getValue = function() {
    return this.pin.read();   
};

module.exports = Sensor;