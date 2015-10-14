/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var mraa = require('mraa');
var threshold = require('./configuration/Threshold');
var schedule = require('./configuration/Schedule');

function Valve(pinNumber, alias, blinker, openState) {
    this.pinNumber = pinNumber;
    this.pin = new mraa.Gpio(pinNumber);
    this.pin.dir(mraa.DIR_OUT);
    this.alias = alias;
    this.blinker = blinker;
    console.log(pinNumber);
    this.threshold = new threshold(pinNumber); 
    this.schedule = new schedule(pinNumber);
    
    if (openState === 0){
        this.OPEN = 0;
        this.CLOSED = 1;
    } else {
        this.OPEN = 1;
        this.CLOSED = 0;
    }
    
    this.pin.write(this.CLOSED);
}

Valve.prototype.check = function(){
    if(this.threshold.checkThreshold()){
        this.pin.write(this.OPEN);
    };
    else{
        this.pin.write(this.CLOSED); 
    }
}

Valve.prototype.open = function() {
    this.pin.write(this.OPEN);
};

Valve.prototype.close = function() {
    this.pin.write(this.CLOSED); 
};

Valve.prototype.status = function(){
    return this.pin.read() === this.OPEN;
}

module.exports = Valve;
