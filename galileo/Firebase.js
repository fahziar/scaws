/*
- set: log, isOnline, valve
- get: mode, senson enable/disable, threshold, schedule, learning dataset(default/ambil data dulu)
*/

var sensors = require('./SensorInstances');
var valves = require('./ValveInstances');
var ValveInstances = require('./ValveInstances');
var ConfigManager = require('../configuration/ConfigManager');
var FbUriFactory = require('../configuration/FirebaseUriFactory');
var Firebase = require('firebase');

var UPDATE_INTERVAL = 200;

function pushSensorValues(){
    var fburl = FbUriFactory.getSensorsUri();
    
    //update soil sensor value
    var soils = fburl;
    for(var key in  sensors.soils){
        var url = soils + '/' + key;
        var soilFb = new Firebase(url);
        soilFb.update({
            value : sensors.soils[key].getValue()
        });
    };
    
    //update light sensor value
    lightFb = new Firebase(FbUriFactory.getNodeUri());
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

function connectionManager(){
    var onlineRef = new Firebase(FbUriFactory.getEndponint() + '/.info/connected');
    onlineRef.on('value', function(snap) {
        if (snap.val() === true) {
            // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
            // add this device to my connections list
            // this value could contain info about the device or a timestamp too
            var myConnectionsRef = new Firebase(FbUriFactory.getNodeUri() + "/online");

            // when I disconnect, remove this device
            myConnectionsRef.onDisconnect().set(false);
            // when I disconnect, update the last time I was seen online
            myConnectionsRef.set(true);
        }
    });
}

function modeListener(){
    var modeRef = new Firebase(FbUriFactory.getNodeUri() + '/mode');
    modeRef.on('value', function (val){
        ConfigManager.config.rules = val.val();
        console.log(ConfigManager.config.rules);
    });
}

function initForceOpenListener(){
    var forceOpenRef = new Firebase(FbUriFactory.getNodeUri() + '/command/forceopen');
    forceOpenRef.on('value', function (val){
        if (ConfigManager.config.rules === 'manual') {
            if (val.val() == true) {
                for (var key in valves) {
                    valves[key].open();
                }
            } else {
                for (var key in valves) {
                    valves[key].close();
                }
            }
        }
    });
}

function initSensorEnabledListener(){
    var sensor1 = new Firebase(FbUriFactory.getSensorsUri() + '/soil1' + '/enabled');
    sensor1.on('value', function (val){
        sensors.soils['soil1'].enabled = val.val();
        sensors.soils['soil1'].updateConfig();
        console.log('sensor ' + 'soil1' + ':' + sensors.soils['soil1'].enabled);
        ConfigManager.saveConfig();
    });

    var sensor2 = new Firebase(FbUriFactory.getSensorsUri() + '/soil2' + '/enabled');
    sensor2.on('value', function (val){
        sensors.soils['soil2'].enabled = val.val();
        sensors.soils['soil2'].updateConfig();
        console.log('sensor ' + 'soil2' + ':' + sensors.soils['soil2'].enabled);
        ConfigManager.saveConfig();
    });

    var sensor3 = new Firebase(FbUriFactory.getSensorsUri() + '/soil3' + '/enabled');
    sensor3.on('value', function (val){
        sensors.soils['soil3'].enabled = val.val();
        sensors.soils['soil3'].updateConfig();
        console.log('sensor ' + 'soil3' + ':' + sensors.soils['soil3'].enabled);
        ConfigManager.saveConfig();
    });

    var sensor4 = new Firebase(FbUriFactory.getSensorsUri() + '/soil4' + '/enabled');
    sensor4.on('value', function (val){
        sensors.soils['soil4'].enabled = val.val();
        sensors.soils['soil4'].updateConfig();
        console.log('sensor ' + 'soil4' + ':' + sensors.soils['soil4'].enabled);
        ConfigManager.saveConfig();
    });

    var sensor5 = new Firebase(FbUriFactory.getSensorsUri() + '/soil5' + '/enabled');
    sensor5.on('value', function (val){
        sensors.soils['soil5'].enabled = val.val();
        sensors.soils['soil5'].updateConfig();
        console.log('sensor ' + 'soil5' + ':' + sensors.soils['soil5'].enabled);
        ConfigManager.saveConfig();
    });
}

function initValve(valve){
    var soil1 = new Firebase(FbUriFactory.getValvesUri() + '/'+ valve + '/threshold/soil1');
    soil1.on('value', function (val){
        ValveInstances[valve].threshold.setMoisture(val.val(), 'soil1');
        console.log('valve ' + valve + ' soil1 threshold ' + val.val());
    });

    var soil2 = new Firebase(FbUriFactory.getValvesUri() + '/' + valve + '/threshold/soil2');
    soil2.on('value', function (val){
        ValveInstances[valve].threshold.setMoisture(val.val(), 'soil2');
        console.log('valve ' + valve + ' soil2 threshold ' + val.val());
    });

    var soil3 = new Firebase(FbUriFactory.getValvesUri() + '/'+ valve + '/threshold/soil3');
    soil3.on('value', function (val){
        ValveInstances[valve].threshold.setMoisture(val.val(), 'soil3');
        console.log('valve ' + valve + ' soil3 threshold ' + val.val());
    });

    var soil4 = new Firebase(FbUriFactory.getValvesUri() + '/' + valve + '/threshold/soil4');
    soil4.on('value', function (val){
        ValveInstances[valve].threshold.setMoisture(val.val(), 'soil4');
        console.log('valve ' + valve + ' soil4 threshold ' + val.val());
    });

    var soil5 = new Firebase(FbUriFactory.getValvesUri() + '/' + valve + '/threshold/soil5');
    soil5.on('value', function (val){
        ValveInstances[valve].threshold.setMoisture(val.val(), 'soil5');
        console.log('valve ' + valve + ' soil5 threshold ' + val.val());
    });

    var light = new Firebase(FbUriFactory.getValvesUri() + '/' + valve + '/threshold/light');
    light.on('value', function (val){
        ValveInstances[valve].threshold.setLight(val.val());
        console.log('valve ' + valve + ' light threshold ' + val.val());
    });
}

function initThresholdListener(){
    for (var key in ValveInstances){
        initValve(key);
    }
}

function scheduleListener(valve){
    var scheduleRef = new Firebase(FbUriFactory.getValvesUri() + '/' + valve + '/schedule');
    scheduleRef.on('value', function (val){
        if (typeof val.val() === 'string') {
            ValveInstances[valve].schedule.parse(val.val());
        }
    });
}

function initScheduleListener(){
    for (var key in ValveInstances){
        scheduleListener(key);
    }
}

module.exports.pushSensorValues = pushSensorValues;
module.exports.pushValveValues = pushValveValues;
module.exports.connectionManager = connectionManager;
module.exports.modeListener = modeListener;
module.exports.initForceOpenListener = initForceOpenListener;
module.exports.initSensorEnabledListener = initSensorEnabledListener;
module.exports.initThresholdListener = initThresholdListener;
module.exports.initScheduleListener = initScheduleListener;