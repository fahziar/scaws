
/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var mraa = require('mraa');
var watering = false;
var threshold = require('./configuration/Threshold');
var valves = require('./galileo/ValveInstances');

//var pin1 = new mraa.Aio(2);
//function periodicActivity(){
//    
//    watering = threshold.checkThreshold();
//    console.log(watering);
//    setTimeout(periodicActivity, 500);
//}

var open = false;

function periodicActivity(){
    open = !open;
    
    for (var key in valves){
//        if (open){
//            valves[key].open();
//        } else {
//            valves[key].close()
//        }
        valves[key].check();
         console.log(key + ":" + valves[key].status());
    }
    console.log();
    setTimeout(periodicActivity, 2000);
}
periodicActivity();
