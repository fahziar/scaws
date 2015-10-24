 /**
 * Created by fahziar on 23/10/2015.
 */

var Firebase = require('firebase');
var Config = require('./ConfigManager');

function getSensorsUri(){
    return Config.config.endpoint + "/gardens/" + Config.config.idTaman + "/galileos/" + Config.config.nodeId + "/sensors";
}

function getValvesUri(){
    return Config.config.endpoint + "/gardens/" + Config.config.idTaman + "/galileos/" + Config.config.nodeId + "/valves";
}

function getNodeuri(){
    return Config.config.endpoint + "/gardens/" + Config.config.idTaman + "/galileos/" + Config.config.nodeId;
}

function getEndpoint(){
    return Config.config.endpoint;
}

module.exports.getSensorsUri = getSensorsUri;
module.exports.getValvesUri = getValvesUri;
module.exports.getNodeUri = getNodeuri;
module.exports.getEndponint = getEndpoint;