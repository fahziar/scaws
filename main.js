
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var mraa = require('mraa');
var watering = false;
var valves = require('./galileo/ValveInstances');
var times = require('./configuration/Time');
var learning = require('./configuration/Learning');
var sensorInstances = require('./galileo/SensorInstances');
var firebase = require('./galileo/Firebase');
var timetemp = (new Date()).getTime();
var getDataDuration = 30 * 60 * 1000;
var isWatering = [0, 0, 0, 0];
var modelCreated = false;
var Firebase = require('firebase');
var FbUriFactory = require('./configuration/FirebaseUriFactory');

var date = new Date();
console.log(date);
times(10, 20, 23, 1, 2, 2000);
date = new Date();
console.log(date);

var open = false;
var time = 1;
var moist = 0;
var classify = [];
var jam = 1;
function periodicActivity(){
    //Kodenya agi
    jam = (new Date()).getHours();
    var i = 0;
    for (var key in valves){
        isWatering[i] = valves[key].check(jam);
        i++;
    }
    console.log(isWatering);
    getData();
    setModel();

    //Kodenya oji
    new Firebase(FbUriFactory.getEndponint() + '/.info/connected').once('value', function(data){console.log('status: ' + data.val());});
    firebase.pushSensorValues();
    firebase.pushValveValues();
    setTimeout(periodicActivity, 500);

    setTimeout(periodicActivity, 2000);
}

function getData(){
    var currentTime = (new Date()).getTime();
    if(currentTime-timetemp >=getDataDuration){
        var data = {};
        var soil1 = sensorInstances.soils['soil1'].getValue()/1023;
        var soil2 = sensorInstances.soils['soil2'].getValue()/1023;
        var soil3 = sensorInstances.soils['soil3'].getValue()/1023;
        var soil4 = sensorInstances.soils['soil4'].getValue()/1023;
        var soil5 = sensorInstances.soils['soil5'].getValue()/1023;
        var light = sensorInstances['light'].getValue();
        data.input =  [soil1, soil2, soil3, soil4, soil5, light];
        data.output = isWatering;
        console.log(data);
        var watering = false;
        if(isWatering.indexOf(1) != -1){
            watering = true;
        }
        learning.addDataSet(data, watering);
        timetemp = currentTime;
    }
}

function setModel(){
    var currentTime = new Date();
    if(currentTime.getHours == 23 && !modelCreated){
        console.log("Creating Model");
        learning.createModel();
        modelCreated = true;
        console.log("Creating Model: Done");
        timetemp = (new Date()).getTime();
    }
    else if(currentTime.getHours != 23 && modelCreated){
        modelCreated = false;
    }
}

firebase.connectionManager();
firebase.modeListener();
firebase.initForceOpenListener();
firebase.initSensorEnabledListener();
firebase.initThresholdListener();
firebase.initScheduleListener();

periodicActivity();