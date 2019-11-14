var Rx = require('rxjs/Rx');

const dbConfig = {
    user: 'part4',
    host: 'localhost',
    //host: '116.203.243.136',
    database: 'remote_info',
    password: 'q1w2e3r4t5',
    port: 5432,
};

const {Pool} = require('pg');
const pool = new Pool(dbConfig);

function getCompany(uid, callback) {
    console.log(uid);
    var qgc = '';
    if(uid != 0) {
        qgc = "SELECT * FROM rdata.company WHERE id = " + uid;
    } else {
        qgc = "SELECT * FROM rdata.company WHERE id != 0";
    }
    console.log(qgc);
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
        qgcl += " WHERE rdata.clients.company_id = " + cuid;
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
    qda = "SELECT * FROM rdata.devices WHERE company_id = "+cuid+" AND client_id= "+ cid + " ORDER BY rdata.devices.enabled desc";
     //if(on){qda += " AND enabled ="+on+";";}
    console.log(qda);
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
    qgi = "SELECT rdata.info.device_id, rdata.devices.productname, rdata.devices.article, rdata.devices.placement, rdata.devices.sn, " +
        "rdata.devices.url, rdata.info.printcycles, rdata.info.scancycles, rdata.info.status, rdata.info.kit, " +
        "rdata.info.cartridge, rdata.info.maintenancekitcount, rdata.info.log, rdata.info.adfcycles, " +
        "rdata.info.datetime, rdata.info.error " +
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

function getErrors(did, callback) {
    /*var oldD = new Date();
    var newD = new Date();
    newD.setTime(oldD.getTime() - (30 * 60 * 1000));*/
    qea = "SELECT * FROM rdata.errors WHERE device_id =" + did + ";";
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

function getInfoCSV(cuid, smonth, emonth, callback) {
    var qgic = "SELECT * FROM ( SELECT rank() over (partition by \"productname\" order by i.datetime desc) n, " +
        "date_part('month', datetime) ts, co.title company, c.name office, d.productname, d.article," +
        " d.placement, d.sn, d.url, i.printcycles, i.datetime " +
        "FROM rdata.devices d " +
        "INNER JOIN rdata.info i ON i.device_id = d.id " +
        "INNER JOIN rdata.clients c on d.client_id = c.id " +
        "INNER JOIN rdata.company co on co.id = c.company_id " +
        "WHERE d.company_id = "+cuid+" AND i.printcycles is not NULL " +
        "AND datetime BETWEEN (now() - '"+smonth+" month'::interval) and (now() - '"+emonth+" month'::interval) ) A WHERE n = 1";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qgic);
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

function addCompany(title, description, callback) {
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

function addDevice(productName, url, init_client, company_id, article, placement, serialNumber, enable, callback) {
    qda = "INSERT INTO rdata.devices (productname, url, client_id, company_id, article, placement, sn, enabled) " +
        "VALUES ('"+productName+"', '"+url+"', "+init_client+", "+company_id;
    if (article) {qda += ", '" + article + "'";} else {qda += ", NULL";}
    if (placement) {qda += ", '" + placement + "'";} else {qda += ", NULL";}
    if (serialNumber) {qda += ", '" + serialNumber + "'";} else {qda += ", NULL";}
    if (enable) {qda += ", " + enable;} else {qda += ", NULL";}
    qda += ");";
    console.log(qda);
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

/*
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
*/

function addInfo(company_id, device_id, cartridge, serialNumber, scanCycles, url, article, printCycles, productName,
                 status, KIT, maintenanceKitCount, adfCycles, log, callback) {
    var d = new Date();
    var n = d.toJSON();
    qai = "INSERT INTO rdata.info (printcycles, scancycles, status, kit, cartridge, log, maintenancekitcount, adfcycles, datetime, device_id) VALUES (";
    if (printCycles) {qai += printCycles;} else {qai += "NULL"}
    if (scanCycles) {qai += ", "+scanCycles;} else {qai += ", NULL"}
    if (status) {qai += ", '" + status + "'";} else {qai += ", NULL"}
    if (KIT) {qai += ", '" + JSON.stringify(KIT) + "'";} else {qai += ", NULL"}
    if (cartridge) {qai += ", '" + JSON.stringify(cartridge) + "'";} else {qai += ", NULL"}
    if (log) {qai += ", '" + JSON.stringify(log) + "'";} else {qai += ", NULL"}
    if (maintenanceKitCount) {qai += ", " + maintenanceKitCount;} else {qai += ", NULL"}
    if (adfCycles) {qai += ", " + adfCycles;} else {qai += ", NULL"}
    qai += ", '"+n+"', "+device_id+");" ;
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

/*function addInfo(init_client, company_id, address_id, url, status, cartridge, KIT,
                  productName, serialNumber, maintenanceKitCount, printCycles,
                  scanCycles, adfCycles, log, article, placement, callback) {
    var d = new Date();
    var n = d.toJSON();
    qai = "DO $$ " +
        "DECLARE lastId INTEGER = 0; " +
        "BEGIN " +
        "SELECT devices.id INTO lastID FROM rdata.devices WHERE client_id = "+init_client+" AND sn = '"+serialNumber+"'; " +
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
}*/

function addError(init_client_error, device_id, error, callback) {
    var d = new Date();
    var n = d.toJSON();
    qaa = "INSERT INTO rdata.info (error, datetime, device_id) VALUES ('"+error+"', '"+n+"', "+ device_id+");";
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

function editCompany(id, title, callback) {
    var qec = "UPDATE rdata.company SET title = '"+title+"' WHERE company.id = "+id+";";
    console.log(qec);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qec);
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

function editClient(id, name, callback) {
    var qecl = "UPDATE rdata.clients SET name = '"+name+"' WHERE clients.id = "+id+";";
    console.log(qecl);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qecl);
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

function editDevice(id, productName, url, init_client, company_id, article, placement, serialNumber, enable, callback) {
    var qed = "UPDATE rdata.devices SET (";
    if(productName) {qed += "productname"}
    if(url) {qed += ",url"}
    if(init_client) {qed += ",client_id"}
    if(company_id) {qed += ",company_id"}
    if(article) {qed += ",article"}
    if(placement) {qed += ",placement"}
    if(serialNumber) {qed += ",sn"}
    if(enable !== undefined) {qed += ",enabled"}
    qed += ") = (";
    if(productName) {qed += "'"+productName+"'"}
    if(url) {qed += ",'"+url+"'"}
    if(init_client) {qed += ","+init_client}
    if(company_id) {qed += ","+company_id}
    if(article) {qed += ",'"+article+"'"}
    if(placement) {qed += ",'"+placement+"'"}
    if(serialNumber) {qed += ",'"+serialNumber+"'"}
    if(enable !== undefined) {qed += ","+enable}
    qed += ") WHERE devices.id = "+id+";";
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qed);
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

// Auth
function Auth(login, pass, callback) {
    var qau = "SELECT rdata.users.company_id FROM rdata.users WHERE rdata.users.login = '"+login+"' AND rdata.users.pass = '"+pass+"';";
    console.log(qau);
    (async () => {
        const client = await pool.connect();
        try {
            const result = await client.query(qau);
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

module.exports = {
    addCompanyO: Rx.Observable.bindCallback(addCompany),
    addClientO: Rx.Observable.bindCallback(addClient),
    addAddressO: Rx.Observable.bindCallback(addAddress),
    addDeviceO: Rx.Observable.bindCallback(addDevice),
    addInfoO: Rx.Observable.bindCallback(addInfo),
    addErrorO: Rx.Observable.bindCallback(addError),
    getCompanyO: Rx.Observable.bindCallback(getCompany),
    getClientsO: Rx.Observable.bindCallback(getClient),
    getAddressO: Rx.Observable.bindCallback(getAddress),
    getDevicesO: Rx.Observable.bindCallback(getDevices),
    getInfoO: Rx.Observable.bindCallback(getInfo),
    getErrorsO: Rx.Observable.bindCallback(getErrors),
    editDeviceO: Rx.Observable.bindCallback(editDevice),
    editCompanyO: Rx.Observable.bindCallback(editCompany),
    editClientO: Rx.Observable.bindCallback(editClient),
    getInfoCSVO: Rx.Observable.bindCallback(getInfoCSV),
    AuthO: Rx.Observable.bindCallback(Auth)
};
