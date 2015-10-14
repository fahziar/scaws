/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting

var serialize = require('node-serialize');
var jsonfile = require('jsonfile');
var brain = require("brain");
var STOP_DATA_FILE = './configuration/data/stopLearningData.json';
var START_DATA_FILE = './configuration/data/startLearningData.json';
var STOP_MODEL_FILE = './configuration/data/stopLearningModel.model';
var START_MODEL_FILE = './configuration/data/startLearningModel.model';

function Learning() {
    this.startModel = new brain.NeuralNetwork();
    this.stopModel = new brain.NeuralNetwork();
    this.startDataSet = [];
    this.stopDataSet = [];
}

Learning.prototype.createModel = function() {
    this.startModel.train(this.startDataSet);
    this.stopModel.train(this.stopDataSet);
};

Learning.prototype.addDataSet = function(data, watering) {
    if(watering) {
        this.stopDataSet.push(data);
    }
    else{
        this.startDataSet.push(data);
    }
};

Learning.prototype.classify = function(test, watering) {
    var output = 0;
    if(watering) {
        output = this.stopModel.run(test);
    }
    else{
        output = this.startModel.run(test);
    }
    if(output > 0.5){
        return true;
    }
    else{
        return false;
    }
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
    var fs = require('fs');
    fs.readFile(STOP_MODEL_FILE, function (err, data) {
        if (err) throw err;
        this.stopModel = serialize.unserialize(data);
    });
    var fs = require('fs');
    fs.readFile(START_MODEL_FILE, function (err, data) {
        if (err) throw err;
        this.startModel = serialize.unserialize(data);
    });
};

Learning.prototype.writeModel = function() {
    var temp = serialize.serialize(this.stopModel);
    typeof temp === 'string';
    var fs = require('fs');
    fs.writeFile(STOP_MODEL_FILE, temp, function(err) {
        if(err) {
            return console.log(err);
        }
    });

    var temp = serialize.serialize(this.startModel);
    typeof temp === 'string';
    var fs = require('fs');
    fs.writeFile(START_MODEL_FILE, temp, function(err) {
        if(err) {
            return console.log(err);
        }
    });
};

module.exports = new Learning();