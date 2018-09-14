"use strict";

var sqlite3 = require('sqlite3').verbose();
var fs = require('fs');

var path = __dirname + "/../../../keystore";
var fileName = path + "/wallet.dat";

class SqliteHandle {
    constructor() {}

    init() {
        if(!fs.existsSync(path)) fs.mkdirSync(path);
        if(!fs.existsSync(fileName)) {
            var db = new sqlite3.Database(fileName,function(err) {
                db.run("create table account_data (" +
                        "private_key varchar(600) PRIMARY KEY     NOT NULL," +
                        "address varchar(100) NOT NULL," +
                        "name varchar(50) NOT NULL)",function(){
                    db.close();
                });
            });
        }
    }

    add(private_key, address, name) {
        var db = new sqlite3.Database(fileName,  function(err){
            db.run("insert into account_data(" +
                    "private_key, address, name) " +
                    "values($key,$address,$name)",
                    {
                        $key:private_key,
                        $address:address,
                        $name:name
                    }, function(err){
                        db.close();
                    });
        });
    }

    getOne(private_key, callback) {
        var db = new sqlite3.Database(fileName, function(err){
            db.get("select * from account_data " +
                    "where private_key=$key", 
                    {
                        $key: private_key
                    },
                    function(err,row){
                        db.close();
                        if(callback != undefined) callback(row);
                    });
        });
    }

    getAll(callback) {
        var db = new sqlite3.Database(fileName, function(err) {
            db.all("select * from account_data",
            function(err, rows) {
                db.close();
                if(callback != undefined) callback(rows);
            });
        });
    }

    modifyName(private_key, name) {
        var db = new sqlite3.Database(fileName, function(err){
            db.run("update account_data " +
                    "set name=$name " +
                    "where private_key = $key",
                    {
                        $key: private_key,
                        $name: name
                    }),
                    function(err){
                        db.close();
                    }
        });
    }
}

module.exports = SqliteHandle;