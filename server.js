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

const ssl = {
    key: fs.readFileSync('cert/privkey1.pem'),
    cert: fs.readFileSync('cert/cert1.pem')
};
const serverPort = 443;

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
        console.log(data);
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            if (obj['auth']) {
                db.AuthO(obj['auth']['login'], obj['auth']['pass']).subscribe(res => {
                    get.emit('get', '{"auth":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getCompany'] || obj['getCompany'] === 0) {
                db.getCompanyO(obj['getCompany']).subscribe(res => {
                    get.emit('get', '{"companies":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getOffice'] || obj['getOffice'] === 0) {
                db.getClientsO(obj['getOffice']).subscribe(res => {
                    get.emit('get', '{"offices":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getDevices'] || obj['getDevices'] === 0) {
                db.getDevicesO(obj['cid'], obj['oid'], obj['getDevices']).subscribe(res => {
                    get.emit('get', '{"devices":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getinfo'] || obj['getinfo'] === 0) {
                db.getInfoO(obj['getinfo']).subscribe(res => {
                    get.emit('get', '{"infos":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['getCSV'] || obj['getCSV'] === 0) {
                db.getInfoCSVO(obj['getCSV'], obj['smonth'], obj['emonth']).subscribe(res => {
                    get.emit('get', '{"getCSV":' + JSON.stringify(res) + '}');
                });
            }
        } else {
            socket.emit('get', data);
        }
    });
});
const put = io.of('/put');
put.on('connection', function (socket) {
    socket.on('put', function (data) {
        console.log(data);
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            console.log(obj);
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
                });
            }
            if (obj['client_init'] === 'addCompany') {
                db.addCompanyO(obj['title'], obj['description']).subscribe(res => {
                    get.emit('get', '{"putCompany":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'editCompany') {
                db.editCompanyO(obj['id'], obj['title']).subscribe(res => {
                    get.emit('get', '{"putCompany":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'addOffice') {
                db.addClientO(obj['name'], obj['cid']).subscribe(res => {
                    get.emit('get', '{"putOffice":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['client_init'] === 'editOffice') {
                db.editClientO(obj['id'], obj['name']).subscribe(res => {
                    get.emit('get', '{"putOffice":' + JSON.stringify(res) + '}');
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
                    get.emit('get', '{"putDevice":' + JSON.stringify(res) + '}');
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
                    get.emit('get', '{"putDevice":' + JSON.stringify(res) + '}');
                });
            }
        } else {
            get.emit('get', 'Check, request is not JSON: ' + data)
        }
    });
});

io.on('connection', function (socket) {
    clients[socket.id] = true;
    console.log(clients);
    socket.on('message', function (data) {
        console.log(data);
        var isJson = IsJsonString(data);
        if (isJson) {
            var obj = JSON.parse(data);
            if (obj['server_init'] === 'getDevices' && !obj['status']) {
                socket.broadcast.emit('message', '{"status":' + data + '}');
                get.emit('a message', '{"status":' + data + '}');
            }
            //{"client_init": "putDevices", "company_id":26, "device_id":8, "cartridge":[{"black":"99"}],"serialNumber":"VCG7428977","scanCycles":29974,
            // "url":"http://192.168.1.205","article":"0","printCycles":87268,"productName":"Kyocera ECOSYS M2540dn","status":"Режим ожидания...."}
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
                    socket.emit('message', JSON.stringify(res));
                    get.emit('get', '{"putInfo":' + JSON.stringify(res) + '}');
                });
            }
            //{"init_client_error": 1, "device_id": 1, "error": "Нет связи с устройством, по адресу: https://192.168.1.233"}
            if (obj['client_init_error']) {
                socket.emit('message', '{"status": ' + obj['error'] + '}');
                db.addErrorO(
                    obj['init_client_error'],
                    obj['device_id'],
                    obj['error']
                ).subscribe(res => {
                    socket.emit('message', JSON.stringify(res));
                    get.emit('get', '{"putError":' + JSON.stringify(res) + '}');
                });
            }
            if (obj['status']) {
                console.log(data);
            }
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
