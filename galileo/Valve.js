/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var mraa = require('mraa');
var threshold = require('../configuration/Threshold');
var schedule = require('../configuration/Schedule');
var configManager = require('../configuration/ConfigManager').config.rules;
var learning = require('../configuration/Learning');

function Valve(pinNumber, enabled, alias, blinker, openState) {
    this.pinNumber = pinNumber;
    this.pin = new mraa.Gpio(pinNumber);
    this.pin.dir(mraa.DIR_OUT);
    this.alias = alias;
    this.blinker = blinker;
    this.enabled = enabled;
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

Valve.prototype.check = function(time){
    if(configManager == 'learning'){
        console.log(this.pinNumber + ": " + learning.classify(this.pin.read() === this.OPEN, this.pinNumber));
       if(learning.classify(this.pin.read() === this.OPEN, this.pinNumber) > 0.5){
            this.pin.write(this.OPEN);
            return 1;
        }
        else{
            this.pin.write(this.CLOSED);
            return 0;
        }
    }
    else if(configManager == 'threshold' || configManager == 'schedule'){
        if(this.threshold.checkThreshold() && this.schedule.checkSchedule(time)){
            this.open()
            return 1;
        }
        else{
            this.close();
            return 0;
        }
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
