var multer = require('multer');
var multipart = multer();

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
        if(req.query['cuid']) {
            db.getClientsO(req.query['cuid']).subscribe(result=>{
                return res.send(result);
            });
        } else {
            res.send('Error: need customer id - cuid');
        }
    });

    /* Get Address */
    app.get('/api/address', function (req, res) {
        db.getAddressO().subscribe(result=>{
            res.send(result);
        });
    });

    /* Get Info */
    app.get('/api/info', function (req, res) {
        if(req.query['client']) {
            db.getInfoO(req.query['client']).subscribe(result=>{
                res.send(result);
            });
        } else {
            res.send('Error: need client id - client');
        }
    });

    /* Get Errors */
    app.get('/api/errors', function (req, res) {
        db.getErrorsO().subscribe(result=>{
            res.send(result);
        });
    });

    /* Get Devices */
    app.get('/api/devices', function (req, res) {
        db.getDevicesO(req.query['cuid'], req.query['cid'], req.query['on']).subscribe(result=>{
            res.send(result);
        });
    });
};
