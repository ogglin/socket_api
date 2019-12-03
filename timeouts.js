var Rx = require('rxjs/Rx');
//var n = dt.toJSON();

// запрошенные устройства
var devices = [];
function addTimeout(devs, callback) {
    var dt = new Date();
    devs.forEach(d => {
        pos = devices.map(function(e) { return e.id; }).indexOf(d.id);
        if (pos < 0 && d.id !== null) {
            devices.push({
                id: d.id,
                time: dt
            })
        } else if(d.id !== null) {
            dat = new Date(devices[pos].time);
            var tm = dt - dat;
            if(tm > 60000) {
                devices[pos].time = dt;
            }
            devices = devices.filter(dev=>{(dt - dev.time) < 60000});
        }
    });
    console.log('devices:' + JSON.stringify(devices));
    callback(devices);
}
function checkDevice(devs, callback) {
    var dt = new Date();
    var devicesF = [];
    if(devices.length > 0) {
        devices.forEach(d=>{
            if((dt - d.time) < 60000){
                console.log(d);
                devicesF.push(d);
            }
        });
    }
    console.log('devices:' + JSON.stringify(devices));
    console.log(devicesF);
    callback(devicesF);
}

module.exports = {
    addTimeoutO: Rx.Observable.bindCallback(addTimeout),
    checkDeviceO: Rx.Observable.bindCallback(checkDevice)
};
