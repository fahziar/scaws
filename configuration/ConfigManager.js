var jsonfile = require('jsonfile');

var CONFIG_FILE = './configuration/data/config.json';

var defaultConfig = {
    rules : 'learning',
    valves: {},
    sensors: {},
    endpoint: 'https://sws.firebaseio.com', //do not put slash behind uri
    nodeId : 'galileo2',
    namaTaman : 'pramuka'
};

var ConfigManager = function() {
    this.config = jsonfile.readFileSync(CONFIG_FILE, {throws: false});
    console.log(this.config === null);
    console.log
    if (this.config === null){
        this.config = defaultConfig;
        jsonfile.writeFileSync(CONFIG_FILE, this.config, {spaces: 3});
    }
};

ConfigManager.prototype.loadConfig = function() {
    this.config = jsonfile.readFileSync(CONFIG_FILE, {throws: false});
    if (this.config === null){
        this.config = defaultConfig;
        jsonfile.writeFileSync(CONFIG_FILE, this.config, {spaces: 3});
    }
};

ConfigManager.prototype.saveConfig = function() {
    jsonfile.writeFileSync(CONFIG_FILE, this.config, {spaces: 3});
};

console.log(__filename);

module.exports = new ConfigManager();