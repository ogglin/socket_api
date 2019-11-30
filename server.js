"use strict";
var fs = require('fs');
var db = require('./dbconnect');
var bodyParser = require('body-parser');
var https = require('https');
var cors = require('cors');
var express = require('express');
var app = express();

//var http = require('http').createServer(app);
//var WebSocket  = require('ws');

/*const ssl = {
    key: fs.readFileSync('cert/localhost-key.pem'),
    cert: fs.readFileSync('cert/localhost.pem')
};*/
const ssl = {
    cert: fs.readFileSync('cert/cert1.pem'),
    key: fs.readFileSync('cert/privkey1.pem')
};
const serverPort = 8443;

app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "default-src 'self'");
    return next();
});

//For BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// For cors
const whitelist = ['https://localhost:4200', 'https://localhost:3000', 'https://localhost:443',
    'https://socket.api.part4.info/',
    'https://socket.api.part4.info/*',
    '116.203.243.136:443',
    '116.203.243.136',
    'https://socket.api.part4.info', '*'];
const corsOptions = {
    credentials: true, // This is important.
    methods: "POST, PUT, OPTIONS, DELETE, GET, *",
    optionsSuccessStatus: 200,
    origin: "*"
    /*origin: (origin, callback) => {
        if (whitelist.includes(origin))
            return callback(null, true);
        callback(new Error('Not allowed by CORS'));
    }*/
};
app.use(cors(corsOptions));
/*app.use(cors());
app.options('*', cors());*/

const server = https.createServer(ssl, app);

var io = require('socket.io')(server);

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// подключённые клиенты
var clients = {};

io.set('origins', '*:*');
const get = io.of('/get');
get.on('connection', function (socket) {
    socket.on('get', function (data) {
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            if (obj['auth']) {
                db.AuthO(obj['auth']['login'], obj['auth']['pass']).subscribe(res => {
                    socket.emit('get', '{"auth":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getCompany'] || obj['getCompany'] === 0) {
                db.getCompanyO(obj['getCompany']).subscribe(res => {
                    socket.emit('get', '{"companies":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getOffice'] || obj['getOffice'] === 0) {
                db.getClientsO(obj['getOffice']).subscribe(res => {
                    socket.emit('get', '{"offices":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getDevices'] || obj['getDevices'] === 0) {
                db.getDevicesO(obj['cid'], obj['oid'], obj['getDevices']).subscribe(res => {
                    socket.emit('get', '{"devices":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getinfo'] || obj['getinfo'] === 0) {
                db.getInfoO(obj['getinfo'], obj['start'], obj['end']).subscribe(res => {
                    console.log("infos:" + res);
                    socket.emit('get', '{"infos":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getCSV'] || obj['getCSV'] === 0) {
                db.getInfoCSVO(obj['getCSV'], obj['start'], obj['end']).subscribe(res => {
                    socket.emit('get', '{"getCSV":' + JSON.stringify(res) + '}');
                });
            }
        }
    });
});
const put = io.of('/put');
put.on('connection', function (socket) {
    socket.on('put', function (data) {
        console.log('put: ' + data);
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            if (obj['server_init'] === 'getDevices') {
                put.emit('get', data);
                socket.emit('message', data);
            }
            if (obj['client_init'] === 'putDevices') {
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
                    get.emit('get', JSON.stringify(res));
                    get.emit('get', '{"putDevice":' + JSON.stringify(res) + '}');
                    socket.emit('get', JSON.stringify(res));
                });
            }
            if (obj['client_init'] === 'addCompany') {
                db.addCompanyO(obj['title'], obj['description']).subscribe(res => {
                    socket.emit('get', '{"putCompany":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'editCompany') {
                db.editCompanyO(obj['id'], obj['title']).subscribe(res => {
                    socket.emit('get', '{"putCompany":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'addOffice') {
                db.addClientO(obj['name'], obj['cid']).subscribe(res => {
                    socket.emit('get', '{"putOffice":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'editOffice') {
                db.editClientO(obj['id'], obj['name']).subscribe(res => {
                    socket.emit('get', '{"putOffice":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'addDevice') {
                db.addDeviceO(
                    obj['productName'],
                    obj['url'],
                    obj['oid'],
                    obj['cid'],
                    obj['article'],
                    obj['placement'],
                    obj['serialNumber'],
                    obj['enable']
                ).subscribe(res => {
                    socket.emit('get', '{"putDevice":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'editDevice') {
                db.editDeviceO(
                    obj['id'],
                    obj['productName'],
                    obj['url'],
                    obj['oid'],
                    obj['cid'],
                    obj['article'],
                    obj['placement'],
                    obj['serialNumber'],
                    obj['enable']
                ).subscribe(res => {
                    socket.emit('get', '{"putDevice":' + JSON.stringify(res) + '}');
                });
            }
        } else {
            socket.emit('get', '{"status": {"result":"' + data + '","message":"Request is not JSON"}}');
        }
    });
});


require('./routes')(app);

app.listen(5000, function (err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});

server.listen(serverPort, function () {
    console.log('server up and running at %s port', serverPort);
});
/*http.listen(3000, function(){
    console.log('listening on *:3000');
});*/
