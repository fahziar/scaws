/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
var jsonfile = require('jsonfile');
var sensors = require('../galileo/SensorInstances');
var CONFIG_FILE = './configuration/data/threshold.json';

function Threshold(pinNumber) {
    CONFIG_FILE = './configuration/data/threshold' + pinNumber + '.json';
    this.data = jsonfile.readFileSync(CONFIG_FILE, {throws: true});
}

Threshold.prototype.readFile = function() {
    this.data = jsonfile.readFileSync(CONFIG_FILE, {throws: false});
};

Threshold.prototype.writeFile = function() {
    jsonfile.writeFileSync(CONFIG_FILE, this.data, {spaces: 3});
};

Threshold.prototype.setLight = function(light) {
    this.data.light = light;
    jsonfile.writeFileSync(CONFIG_FILE, this.data, {spaces: 3});
};

Threshold.prototype.setMoisture = function(moisture, key) {
    this.data.moisture[key] = moisture;
    jsonfile.writeFileSync(CONFIG_FILE, this.data, {spaces: 3});
};

Threshold.prototype.checkThreshold = function() {
    var water = false;
    var moistures = sensors.soils;
    for(var key in moistures){
        console.log(key + ":" + moistures[key].getValue());
        if(moistures[key].getValue() < this.data.moisture[key]){
            water = true;
            break;
        }
    }
    console.log();
    return water;
};

module.exports = new Threshold();