var multer = require('multer');
var multipart = multer();

var db = require('./dbconnect');

module.exports = function (app) {

    /* Get all company */
    app.get('/api/company', function (req, res) {
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
};
