var Rx = require('rxjs/Rx');

const dbConfig = {
    user: 'part4',
    host: '116.203.243.136',
    database: 'remote_info',
    password: 'q1w2e3r4t5',
    port: 5432,
};

const {Pool} = require('pg');
const pool = new Pool(dbConfig);

function getCustomers(callback) {
    qgc = "SELECT * FROM rdata.company";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qgc);
            callback (result.rows);
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function getClient(cuid, callback) {
    qgcl = "SELECT * FROM rdata.clients";
    if (cuid) {
        qgcl += " WHERE rdata.clients.customers_id = " + cuid;
    }
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qgcl);
            callback (result.rows);
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function getAddress(callback) {
    qga = "SELECT * FROM rdata.address";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qga);
            callback (result.rows);
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function getDevices(cuid, cid, on, callback) {
    qda = "SELECT * FROM rdata.devices WHERE company_id = "+cuid+" AND client_id= "+ cid+"  AND enabled ="+on+";";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qda);
            callback (result.rows);
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function getInfo(devid, callback) {
    qgi = "SELECT rdata.devices.productname, rdata.devices.article, rdata.devices.client_article, rdata.devices.sn, " +
        "rdata.devices.url, rdata.info.printcycles, rdata.info.scancycles, rdata.info.status, rdata.info.kit, " +
        "rdata.info.cartridge, rdata.info.maintenancekitcount, rdata.info.log, rdata.info.adfcycles, " +
        "rdata.info.datetime " +
        "FROM rdata.devices " +
        "INNER JOIN rdata.info ON rdata.info.device_id = rdata.devices.\"id\"";
    if (devid !== 0) {
        qgi += " WHERE rdata.info.device_id = " + devid;
    }
    qgi += " ORDER BY datetime DESC";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qgi);
            callback ({"content": result.rows});
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function getErrors(callback) {
    var oldD = new Date();
    var newD = new Date();
    newD.setTime(oldD.getTime() - (30 * 60 * 1000));
    qea = "SELECT * FROM rdata.errors where datetime >=" + newD;
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qea);
            callback (result.rows);
            return result.rows;
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}

function addCustomer(title, description, callback) {
    qac = "INSERT INTO rdata.company (title, description) VALUES ('"+ title +"', '"+ description +"');";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qac);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        callback ({status: 'error', result: e.detail});
        return {status: 'error', result: e.detail};
    });
}

function addClient(name, customers_id, callback) {
    qacl = "INSERT INTO rdata.clients (name, customers_id) VALUES ('"+ name  +"', "+ customers_id +");";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qacl);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        callback ({status: 'error', result: e.detail});
        return {error: e.detail};
    });
}

function addAddress(address, callback) {
    qaa = "INSERT INTO rdata.address (address) VALUES ('"+ address +"') RETURNING id;";
    console.log(qaa);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qaa);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        callback ({status: 'error', result: e.detail});
        return {error: e.detail};
    });
}

function addDevice(productName, url, init_client, company_id, article, client_article, serialNumber, enable, callback) {
    qda = "INSERT INTO rdata.devices (productname, url, client_id, company_id, article, client_article, sn, enabled) " +
        "VALUES ('"+productName+"', '"+url+"', "+init_client+", "+company_id;
    if (article) {qda += ", '" + article + "'";} else {qda += ", NULL";}
    if (client_article) {qda += ", '" + client_article + "'";} else {qda += ", NULL";}
    if (serialNumber) {qda += ", '" + serialNumber + "'";} else {qda += ", NULL";}
    if (enable) {qda += ", " + enable;} else {qda += ", NULL";}
    qda += ");";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qda);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        callback ({status: 'error', result: e.detail});
        return {error: e.detail};
    });
}

function addInfo (init_client, company_id, address_id, url, status, cartridge, KIT,
                  productName, serialNumber, maintenanceKitCount, printCycles,
                  scanCycles, adfCycles, log, article, client_article, callback) {
    var d = new Date();
    var n = d.toJSON();
    qai = "DO $$ " +
        "DECLARE lastId INTEGER = 0; " +
        "BEGIN " +
        "SELECT devices.id INTO lastID FROM rdata.devices WHERE client_id = 2 AND sn = 'VCG7428977'; " +
        "INSERT INTO rdata.info (printcycles, scancycles, status, kit, cartridge, log, maintenancekitcount, adfcycles, datetime, device_id) " +
        "VALUES (";
    if (printCycles) {qai += printCycles;} else {qai += "NULL"}
    if (scanCycles) {qai += ", "+scanCycles;} else {qai += ", NULL"}
    if (status) {qai += ", '" + status + "'";} else {qai += ", NULL"}
    if (KIT) {qai += ", '" + JSON.stringify(KIT) + "'";} else {qai += ", NULL"}
    if (cartridge) {qai += ", '" + JSON.stringify(cartridge) + "'";} else {qai += ", NULL"}
    if (log) {qai += ", '" + JSON.stringify(log) + "'";} else {qai += ", NULL"}
    if (maintenanceKitCount) {qai += ", " + maintenanceKitCount;} else {qai += ", NULL"}
    if (adfCycles) {qai += ", " + adfCycles;} else {qai += ", NULL"}
    qai += ", '"+n+"', lastId);" +
        "END $$";
    console.log(qai);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qai);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        callback ({status: 'error', result: e.detail});
        return {error: e.detail};
    });
}

function addError(init_client_error, url, error, callback) {
    var d = new Date();
    var n = d.toJSON();
    qaa = "INSERT INTO rdata.errors VALUES ("+init_client_error+", '"+ url +"', '"+ error +"',"+n+") RETURNING id;";
    console.log(qaa);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qaa);
            callback ({status: 'success', result: result.rows});
            return {status: 'success', result: result.rows};
        } finally {
            client.release()
        }
    })().catch(e => {
        console.log(e.stack);
        return {error: e.detail};
    });
}


module.exports = {
    addCustomerO: Rx.Observable.bindCallback(addCustomer),

    addClientO: Rx.Observable.bindCallback(addClient),

    addAddressO: Rx.Observable.bindCallback(addAddress),

    addDeviceO: Rx.Observable.bindCallback(addDevice),

    addInfoO: Rx.Observable.bindCallback(addInfo),

    addErrorO: Rx.Observable.bindCallback(addError),

    getCustomersO: Rx.Observable.bindCallback(getCustomers),

    getClientsO: Rx.Observable.bindCallback(getClient),

    getAddressO: Rx.Observable.bindCallback(getAddress),

    getDevicesO: Rx.Observable.bindCallback(getDevices),

    getInfoO: Rx.Observable.bindCallback(getInfo),

    getErrorsO: Rx.Observable.bindCallback(getErrors)
};
