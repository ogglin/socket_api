var multer = require('multer');
var multipart = multer();
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();
var db = require('./dbconnect');

module.exports = function (app) {

    /* Get all company */
    app.get('/api/company', function (req, res) {
        var d = new Date();
        var n = d.toJSON();
        console.log(n);
        db.getCustomersO().subscribe(result => {
            return res.send(result);
        });
    });

    /* Get Client */
    app.get('/api/client', function (req, res) {
        if (req.query['cuid']) {
            db.getClientsO(req.query['cuid']).subscribe(result => {
                return res.send(result);
            });
        } else {
            res.send('Error: need customer id - cuid');
        }
    });

    /* Get Address */
    app.get('/api/address', function (req, res) {
        db.getAddressO().subscribe(result => {
            res.send(result);
        });
    });

    /* Get Info */
    app.get('/api/info', function (req, res) {
        if (req.query['client']) {
            db.getInfoO(req.query['client']).subscribe(result => {
                res.send(result);
            });
        } else {
            res.send('Error: need client id - client');
        }
    });

    /* Get Errors */
    app.get('/api/errors', function (req, res) {
        db.getErrorsO(req.query['did']).subscribe(result => {
            res.send(result);
        });
    });

    /* Get Devices */
    app.get('/api/devices', function (req, res) {
        db.getDevicesO(req.query['cuid'], req.query['cid'], req.query['on']).subscribe(result => {
            res.send(result);
        });
    });

    /* Get info to cvs */
    app.get('/api/cvs', function (req, res) {
       db.getInfoCSVO(req.query['cuid'], req.query['smonth'], req.query['emonth']).subscribe(result => {
           res.send(result);
       });
    });

    /* Put company */
    app.put('/api/company', jsonParser, function (req, res) {
        db.addCustomerO(req.body['title'], req.body['desc']).subscribe(result => {
            res.send(result);
        });
    });

    /* Put client */
    app.put('/api/client', multipart.array(), function (req, res) {
        db.addClientO(req.body['name'], req.body['customers_id']).subscribe(result => {
            res.send(result);
        });
    });

    /* Put device */
    app.put('/api/device', multipart.array(), function (req, res) {
        db.addDeviceO(req.body['productName'], req.body['url'], req.body['init_client'], req.body['company_id'],
            req.body['article'], req.body['client_article'], req.body['serialNumber'], req.body['enable']
        ).subscribe(result => {
            res.send(result);
        });
    });

    /* Edit device */
    app.post('/api/device', multipart.array(), function (req, res) {
        db.editDeviceO(req.body['id'], req.body['productName'], req.body['url'], req.body['init_client'], req.body['company_id'],
            req.body['article'], req.body['client_article'], req.body['serialNumber'], req.body['enable']).subscribe(result => {
            res.send(result);
        });
    });

    /* Edit company */
    app.post('/api/company', multipart.array(), function (req, res) {
        db.editCompanyO(req.body['id'], req.body['title']).subscribe(result => {
            res.send(result);
        });
    });

    /* Edit client */
    app.post('/api/client', multipart.array(), function (req, res) {
        db.editClientO(req.body['id'], req.body['name']).subscribe(result => {
            res.send(result);
        });
    });
};
