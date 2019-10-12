"use strict";
var http = require('http');
var fs = require('fs');
var db = require('./dbconnect');
var Rx = require('rxjs/Rx');

var server = http.createServer(function (req, res) {
   fs.readFile('./index.html', 'utf-8', function (error, connect) {
       res.writeHead(200, {'Content-Type': 'text/html'});
       res.end(connect);
   })
});

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

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function(ws) {

    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);
    ws.on('message', function incoming(data) {
        var isJson = IsJsonString(data);
        if (ws.readyState === WebSocket.OPEN) {
            console.log(data, isJson);
            if (isJson) {
                var obj = JSON.parse(data);
                if(obj['init_client']) {
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
                        clients[key].send('{"status":'+ data +'}');
                    }
                }
                if (obj['server_init'] === 'getInfo' && !obj['status']) {
                    if(obj['client'] !== undefined) {
                        db.getInfoO(obj['client']).subscribe(res => {
                            ws.send(JSON.stringify(res));
                        });
                    }
                }
            } else {
                ws.send(data);
            }
        }
    });
});


