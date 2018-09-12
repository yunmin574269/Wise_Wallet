"use strict";

var sqlite3 = require('sqlite3');
var fs = require('fs');

class SqliteHandle {
    constructor() {}

    init() {
        var path = __dirname + "/../../../keystore";
        if(!fs.existsSync(path)) fs.mkdirSync(path);
        var fileName = path + "/wallet.dat";
        if(!fs.existsSync(fileName)) {
            var db = new sqlite3.Database(fileName,function() {
                db.run("create table account_date (" +
                        "private_key varchar(600) PRIMARY KEY     NOT NULL," +
                        "address varchar(100) NOT NULL," +
                        "name varchar(50) NOT NULL)",function(){
                    db.close();
                });
            });
        }
    }

    add() {
    }

    getOne() {

    }

    modifyName() {
        
    }
}

module.exports = SqliteHandle;