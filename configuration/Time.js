var Time = function(hour, min, second, day, month, year){
    var sys = require('sys')
    var exec = require('child_process').exec;
    function puts(error, stdout, stderr) { sys.puts(stdout) }
    exec('date --set "' + year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + second + '"', puts);  
    exec('date -w');  
}

module.exports = Time;