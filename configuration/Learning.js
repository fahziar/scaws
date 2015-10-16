/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var serialize = require('node-serialize');
var jsonfile = require('jsonfile');
var brain = require("brain");
var sensorInstances = require('../galileo/SensorInstances');

var STOP_DATA_FILE = './configuration/data/learning/stopLearningData.json';
var START_DATA_FILE = './configuration/data/learning/startLearningData.json';
var STOP_MODEL_FILE = './configuration/data/learning/stopLearningModel.model';
var START_MODEL_FILE = './configuration/data/learning/startLearningModel.model';

function Learning() {
    //read dataset
    this.stopDataSet = [];
    this.startDataSet = [];
    this.readData();
    
    this.startModel = new brain.NeuralNetwork();
    this.stopModel = new brain.NeuralNetwork();
//    this.createModel();
//    this.writeModel();
    this.readModel();
}

Learning.prototype.createModel = function() {
    this.startModel.train(this.startDataSet);
    this.stopModel.train(this.stopDataSet);
    this.writeModel();
};

Learning.prototype.addDataSet = function(data, watering) {
    if(watering) {
        this.stopDataSet.push(data);
    }
    else{
        this.startDataSet.push(data);
    }
    this.writeData();
};

Learning.prototype.classify = function(watering, pinNumber) {
    var output = 0;
    var soil1 = sensorInstances.soils['soil1'].getValue()/1023;
    var soil2 = sensorInstances.soils['soil2'].getValue()/1023;
    var soil3 = sensorInstances.soils['soil3'].getValue()/1023;
    var soil4 = (soil1 + soil2 + soil3)/3;
    var soil5 = (soil1 + soil2 + soil3)/3;
    var test = [soil1, soil1, soil1, soil1, soil1, 0];
    if(watering) {
        output = this.stopModel.run(test);
    }
    else{
        output = this.startModel.run(test);
    }
    return output[pinNumber-2];
};

Learning.prototype.readData = function() {
    this.stopDataSet = jsonfile.readFileSync(STOP_DATA_FILE, {throws: false});
    this.startDataSet = jsonfile.readFileSync(START_DATA_FILE, {throws: false});
};

Learning.prototype.writeData = function() {
    jsonfile.writeFileSync(STOP_DATA_FILE, this.stopDataSet, {spaces: 3});
    jsonfile.writeFileSync(START_DATA_FILE, this.startDataSet, {spaces: 3});
};

Learning.prototype.readModel = function() {
    this.stopModel.fromJSON(jsonfile.readFileSync(STOP_MODEL_FILE, {throws: false}));
    this.startModel.fromJSON(jsonfile.readFileSync(START_MODEL_FILE, {throws: false}));
};

Learning.prototype.writeModel = function() {
    jsonfile.writeFileSync(STOP_MODEL_FILE, this.stopModel, {spaces: 3});
    jsonfile.writeFileSync(START_MODEL_FILE, this.startModel, {spaces: 3});
};

module.exports = new Learning();