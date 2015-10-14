
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var mraa = require('mraa');
var watering = false;
var valves = require('./galileo/ValveInstances');
var times = require('./configuration/Time');
var learning = require('./configuration/Learning');

//var date = new Date();
//console.log(date);
//times(10, 20, 23, 1, 2, 2000);
//date = new Date();
//console.log(date);

//var pin1 = new mraa.Aio(2);
//function periodicActivity(){
//    
//    watering = threshold.checkThreshold();
//    console.log(watering);
//    setTimeout(periodicActivity, 500);
//}

var open = false;
var time = 1;
var moist = 0;
var classify = [];
function periodicActivity(){
    console.log(moist);
    classify = learning.classify([moist, moist, moist, moist, moist, 0]);
    console.log(classify);
    moist += 0.1;
//    open = !open;
//    console.log(time);
//    for (var key in valves){
////        if (open){
////            valves[key].open();
////        } else {
////            valves[key].close()
////        }
//        valves[key].check(time);
//         console.log(key + ":" + valves[key].status());
//    }
//    time = time + 2;
//    if(time > 7){
//        time = 1;
//    }
    setTimeout(periodicActivity, 2000);
}


periodicActivity();
