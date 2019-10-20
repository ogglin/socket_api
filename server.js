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
app.use(cors());
app.options('*', cors());


function IsJsonString(str) {
    try { JSON.parse(str); }
    catch (e) { return false; }
    return true;
}

// подключённые клиенты
var clients = {};

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);
    ws.on('message', function incoming(data) {
        var isJson = IsJsonString(data);
        if (ws.readyState === WebSocket.OPEN) {
            console.log(data, isJson);
            if (isJson) {
                var obj = JSON.parse(data);
                if (obj['init_client']) {
                    db.addInfo(
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
                        obj['client_article']
                    ).subscribe(res => {
                        ws.send(JSON.stringify(res));
                    });
                }
                if (obj['test']) {
                    ws.send('{"status": "server is ok"}');
                }
                if (obj['server_init'] === 'getDevices' && !obj['status']) {
                    for (var key in clients) {
                        clients[key].send('{"status":' + data + '}');
                    }
                }
                //{"server_init": "getInfo", "client": 1}
                if (obj['server_init'] === 'getInfo' && !obj['status']) {
                    if (obj['client'] !== undefined) {
                        db.getInfoO(obj['client']).subscribe(res => {
                            ws.send(JSON.stringify(res));
                        });
                    }
                }
                //{"server_init": "getCustomers"}
                if (obj['server_init'] === 'getCustomers' && !obj['status']) {
                    db.getCustomersO().subscribe(res => {
                        ws.send(JSON.stringify(res));
                    });
                }
                //{"server_init": "getClient", "cuid": 1}
                if (obj['server_init'] === 'getClient' && !obj['status']) {
                    if (obj['cuid'] !== undefined) {
                        db.addClientO(obj['cuid']).subscribe(res => {
                            ws.send(JSON.stringify(res));
                        });
                    }
                }
                //{"server_init": "getAddress"}
                if (obj['server_init'] === 'getAddress' && !obj['status']) {
                    db.getAddressO().subscribe(res => {
                        ws.send(JSON.stringify(res));
                    });
                }
            } else {
                ws.send(data);
            }
        }
    });
});

require('./routes')(app);

app.listen(5000, function(err) {
    if (!err)
        console.log("Site is live");
    else console.log(err)
});

/*server.listen(8081, function() {
    console.log((new Date()) + ' Server is listening on port 8081');
});*/

