/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
var jsonfile = require('jsonfile');
var CONFIG_FILE = './configuration/data/schedule/schedule.json';

function Schedule(pinNumber) {
    this.times = [];
    CONFIG_FILE = './configuration/data/schedule/schedule' + pinNumber + '.json';
    this.times = jsonfile.readFileSync(CONFIG_FILE, {throws: false});
}

Schedule.prototype.readFile = function() {
    this.times = jsonfile.readFileSync(CONFIG_FILE, {throws: false});
};

Schedule.prototype.writeFile = function() {
    jsonfile.writeFileSync(CONFIG_FILE, this.times, {spaces: 3});
};

Schedule.prototype.addSchedule = function(time) {
    if(time >= 0 && time <=23) {
        var index = this.times.indexOf(time);
        if (index == -1) {
            this.times.push(time);
        }
        this.writeFile();
    }
};

Schedule.prototype.editSchedule = function(index, time) {
    this.times[index] = time;
    this.writeFile();
};

Schedule.prototype.removeSchedule = function(index) {
    this.times.splice(index, 1);
    this.writeFile();
};

Schedule.prototype.checkSchedule = function(time) {
    if(this.times.indexOf(time) > -1){
        return true;
    }
    else{
        return false;   
    }
};

module.exports = Schedule;