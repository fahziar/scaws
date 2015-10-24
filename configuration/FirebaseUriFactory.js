/**
 * Created by fahziar on 23/10/2015.
 */

var Firebase = require('firebase');
var Config = require('./ConfigManager');

function getSensorsUri(){
    return Config.config.endpoint + "/gardens/" + Config.config.namaTaman + "/galileos/" + Config.config.nodeId + "/sensors";
}

function getValvesUri(){
    return Config.config.endpoint + "/gardens/" + Config.config.namaTaman + "/galileos/" + Config.config.nodeId + "/valves";
}

module.exports.getSensorsUri = getSensorsUri;
module.exports.getValvesUri = getValvesUri;