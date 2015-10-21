/*
- set: log, isOnline, valve
- get: mode, senson enable/disable, threshold, schedule, learning dataset(default/ambil data dulu)
*/

var sensors = require('./SensorInstances');
var Firebase = require('firebase');

function pushSensorValues(){
    var fburl = 'https://sws.firebaseio.com/gardens/pramuka/galileos/galileo2/sensors';
    
    //update soil sensor value
    var soils = fburl + '/soils';
    for(var key in  sensors.soils){
        var url = soils + '/' + key;
        var soilFb = new Firebase(url);
        soilFb.update({
            value : sensors.soils[key].getValue()
        });
    };
    
    //update light sensor value
    lightFb = new Firebase(fburl);
    lightFb.update({
        light: sensors['light'].getValue()
    });
}

module.exports.pushSensorValues = pushSensorValues;