/*
- set: log, isOnline, valve
- get: mode, senson enable/disable, threshold, schedule, learning dataset(default/ambil data dulu)
*/

var sensors = require('./SensorInstances');
var valves = require('./ValveInstances');
var FbUriFactory = require('../configuration/FirebaseUriFactory');
var Firebase = require('firebase');

var UPDATE_INTERVAL = 200;

function pushSensorValues(){
    var fburl = FbUriFactory.getSensorsUri();
    
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

function pushValveValues(){
    var fburl = FbUriFactory.getValvesUri();

    //update soil sensor value
    for(var key in  valves){
        var url = fburl + '/' + key;
        var valveFb = new Firebase(url);
        valveFb.update({
            opened : valves[key].status() == true
        });
    };

}

module.exports.pushSensorValues = pushSensorValues;
module.exports.pushValveValues = pushValveValues;