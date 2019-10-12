var Rx = require('rxjs/Rx');

const dbConfig = {
    user: 'part4',
    host: 'localhost',
    database: 'remote_info',
    password: 'q1w2e3r4t5',
    port: 5433,
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

function getInfo(clid, callback) {
    qgi = "SELECT * FROM rdata.info ";
    if (clid !== 0) {
        qgi += "WHERE rdata.info.client_id = " + clid;
    }
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

function addInfo (init_client, company_id, address_id, url, status, cartridge, KIT,
                  productName, serialNumber, maintenanceKitCount, printCycles,
                  scanCycles, adfCycles, log, article, client_article, callback) {
    qai = "INSERT INTO rdata.info (productName, client_id";
    if (company_id) {qai += ", company_id";}
    if (address_id) {qai += ", address_id";}
    if (url) {qai += ", url";}
    if (status) {qai += ", status";}
    if (cartridge) {qai += ", cartridge";}
    if (KIT) {qai += ", KIT";}
    if (serialNumber) {qai += ", serialNumber";}
    if (maintenanceKitCount) {qai += ", maintenanceKitCount";}
    if (printCycles) {qai += ", printCycles";}
    if (scanCycles) {qai += ", scanCycles";}
    if (adfCycles) {qai += ", adfCycles";}
    if (log) {qai += ", log";}
    if (article) {qai += ", article";}
    if (client_article) {qai += ", client_article";}

    qai += ") VALUES ('" + productName + "', " + init_client;

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
        return {error: e.detail};
    });
}


module.exports = {
    addCustomerO: Rx.Observable.bindCallback(addCustomer),

    addClientO: Rx.Observable.bindCallback(addClient),

    addInfo: Rx.Observable.bindCallback(addInfo),

    getCustomersO: Rx.Observable.bindCallback(getCustomers),

    getClientsO: Rx.Observable.bindCallback(getClient),

    getInfoO: Rx.Observable.bindCallback(getInfo)
};
