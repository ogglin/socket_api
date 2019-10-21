var Rx = require('rxjs/Rx');

const dbConfig = {
    user: 'part4',
    host: 'localhost',
    database: 'remote_info',
    password: 'q1w2e3r4t5',
    port: 5432,
};

const {Pool} = require('pg');
const pool = new Pool(dbConfig);

function getCustomers(callback) {
    qgc = "SELECT * FROM rdata.customers";
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

function getInfo(clid, callback) {
    qgi = "SELECT rdata.info.\"id\" as info_id, rdata.devices.\"id\" as device_id, rdata.devices.productname, rdata.devices.url, " +
        "rdata.devices.article, rdata.devices.client_article, rdata.info.scancycles, rdata.info.printcycles, " +
        "rdata.info.status, rdata.info.kit, rdata.info.cartridge, rdata.info.log, rdata.info.serialnumber, " +
        "rdata.info.maintenancekitcount, rdata.info.adfcycles, rdata.info.datetime FROM rdata.info " +
        "INNER JOIN rdata.devices ON rdata.info.device_id = rdata.devices.\"id\"";
    if (clid !== 0) {
        qgi += "WHERE rdata.info.client_id = " + clid;
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

function addCustomer(title, description, callback) {
    qac = "INSERT INTO rdata.customers (title, description) VALUES ('"+ title +"', '"+ description +"');";
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
        return {error: e.detail};
    });
}

function addClient(token, name, url, customers_id, callback) {
    qacl = "INSERT INTO rdata.clients (token, name, url, customers_id) VALUES ('"+ token +"', '"+ name +"', '"+ url +"', "+ customers_id +");";
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
        return {error: e.detail};
    });
}

function addInfo (init_client, company_id, address_id, url, status, cartridge, KIT,
                  productName, serialNumber, maintenanceKitCount, printCycles,
                  scanCycles, adfCycles, log, article, client_article, callback) {
    var d = new Date();
    var n = d.toJSON();
    qai = "INSERT INTO rdata.info (datetime, productName, client_id";
    if (company_id) {qai += ", company_id";}
    if (address_id) {qai += ", address_id";}
    if (url) {qai += ", url";}
    if (status) {qai += ", status";}
    if (cartridge) {qai += ", cartridge";}
    if (KIT) {qai += ", KIT";}
    if (serialNumber) {qai += ", serialnumber";}
    if (maintenanceKitCount) {qai += ", maintenancekitcount";}
    if (printCycles) {qai += ", printcycles";}
    if (scanCycles) {qai += ", scancycles";}
    if (adfCycles) {qai += ", adfcycles";}
    if (log) {qai += ", log";}
    if (article) {qai += ", article";}
    if (client_article) {qai += ", client_article";}

    qai += ") VALUES ('"+n+"', '" + productName + "', " + init_client;

    if (company_id) {qai += ", " + company_id;}
    if (address_id) {qai += ", " + address_id;}
    if (url) {qai += ", '" + url + "'";}
    if (status) {qai += ", '" + status + "'";}
    if (cartridge) {qai += ", '" + JSON.stringify(cartridge) + "'";}
    if (KIT) {qai += ", '" + JSON.stringify(KIT) + "'";}
    if (serialNumber) {qai += ", '" + serialNumber + "'";}
    if (maintenanceKitCount) {qai += ", " + maintenanceKitCount;}
    if (printCycles) {qai += ", " + printCycles;}
    if (scanCycles) {qai += ", " + scanCycles;}
    if (adfCycles) {qai += ", " + adfCycles;}
    if (log) {qai += ", '" + JSON.stringify(log) + "'";}
    if (article) {qai += ", '" + article + "'";}
    if (client_article) {qai += ", '" + client_article + "'";}

    qai += ") RETURNING id";
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
        return {error: e.detail};
    });
}


module.exports = {
    addCustomerO: Rx.Observable.bindCallback(addCustomer),

    addClientO: Rx.Observable.bindCallback(addClient),

    addAddressO: Rx.Observable.bindCallback(addAddress),

    addInfo: Rx.Observable.bindCallback(addInfo),

    getCustomersO: Rx.Observable.bindCallback(getCustomers),

    getClientsO: Rx.Observable.bindCallback(getClient),

    getAddressO: Rx.Observable.bindCallback(getAddress),

    getInfoO: Rx.Observable.bindCallback(getInfo)
};
