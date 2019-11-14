"use strict";
var fs = require('fs');
var db = require('./dbconnect');
var bodyParser = require('body-parser');
var WebSocket  = require('ws');
var https = require('https');
var cors = require('cors');
var express = require('express');
var app = express();

const server = https.createServer({
    cert: fs.readFileSync('cert/rootCA.pem'),
    key: fs.readFileSync('cert/rootCA-key.pem')
});

//For BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// For cors
const whitelist = ['http://localhost:4200', 'http://localhost:3000', 'http://socket.api.part4.info', '*'];
const corsOptions = {
    credentials: true, // This is important.
    origin: (origin, callback) => {
        if(whitelist.includes(origin))
            return callback(null, true);

        callback(new Error('Not allowed by CORS'));
    }
};
app.use(cors(corsOptions));
/*app.use(cors());
app.options('*', cors());*/

var http = require('http').createServer(app);
var io = require('socket.io')(http);

function IsJsonString(str) {
    try { JSON.parse(str); }
    catch (e) { return false; }
    return true;
}

// подключённые клиенты
var clients = {};

const wss = new WebSocket.Server({ port: 8080 });

var get = io.of('/get').on('connection', function () {

});

io.on('connection', function(socket){
    clients[socket.id] = true;
    console.log(clients);
    socket.on('message', function(data){
        console.log(data);
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            if (obj['server_init'] === 'getDevices' && !obj['status']) {
                console.log('get: ', data);
                socket.broadcast.emit('message', '{"status":' + data + '}');
                get.emit('a message', '{"status":' + data + '}');
                /*for (var key in clients) {
                    //socket.emit('message', '{"status":' + data + '}');
                    clients[key].send('{"status":' + data + '}');
                }*/
            }
            //{"client_init": "putDevices", "company_id":26, "device_id":8, "cartridge":[{"black":"99"}],"serialNumber":"VCG7428977","scanCycles":29974,
            // "url":"http://192.168.1.205","article":"0","printCycles":87268,"productName":"Kyocera ECOSYS M2540dn","status":"Режим ожидания...."}
            if (obj['init_client']==='putDevices') {
                db.addInfoO(
                    obj['company_id'],
                    obj['device_id'],
                    obj['cartridge'],
                    obj['serialNumber'],
                    obj['scanCycles'],
                    obj['url'],
                    obj['article'],
                    obj['printCycles'],
                    obj['productName'],
                    obj['status'],
                    obj['KIT'],
                    obj['maintenanceKitCount'],
                    obj['adfCycles'],
                    obj['log']
                ).subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                });
            }
            /*if (obj['init_client'] && obj['new'] === 1) {
                db.addDeviceO(
                    obj['init_client'],
                    obj['company_id'],
                    obj['address_id'],
                    obj['url'],
                    obj['status'],
                    obj['cartridge'],
                    obj['KIT'],
                    obj['productName'],
                    obj['serialNumber'],
                    obj['maintenanceKitCount'],
                    obj['printCycles'],
                    obj['scanCycles'],
                    obj['adfCycles'],
                    obj['log'],
                    obj['article'],
                    obj['client_article'],
                    obj['company_id']
                ).subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                });
            }*/
            //{"init_client_error": 1, "device_id": 1, "error": "Нет связи с устройством, по адресу: https://192.168.1.233"}
            if (obj['init_client_error']) {
                socket.emit('message', '{"status": '+ obj['error'] +'}');
                db.addErrorO(
                    obj['init_client_error'],
                    obj['device_id'],
                    obj['error']
                ).subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                });
            }
            if (obj['status']) {
                console.log(data);
            }
            //{"server_init": "getInfo", "client": 1} - old variant
            /*if (obj['server_init'] === 'getInfo' && !obj['status']) {
                if (obj['client'] !== undefined) {
                    db.getInfoO(obj['client']).subscribe(res => {
                        ws.send(JSON.stringify(res));
                    });
                }
            }*/
            //{"server_init": "getCustomers"}
            if (obj['server_init'] === 'getCustomers' && !obj['status']) {
                db.getCompanyO(req.query['uid']).subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                });
            }
            //{"server_init": "getClient", "cuid": 1}
            if (obj['server_init'] === 'getClient' && !obj['status']) {
                if (obj['cuid'] !== undefined) {
                    db.addClientO(obj['cuid']).subscribe(res => {
                        socket.emit('message', JSON.stringify(res));
                    });
                }
            }
            //{"server_init": "getAddress"}
            if (obj['server_init'] === 'getAddress' && !obj['status']) {
                db.getAddressO().subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                });
            }
            if (obj['test']) {
                console.log(obj);
                socket.emit('message', obj['test']);
            }
        } else {
            socket.emit('message', data);
        }
    });
});

require('./routes')(app);

app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
