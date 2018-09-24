"use strict";

const AccountHandle = require('./account-handle');
const aesjs = require('./aes-js');
const argon2 = require('argon2');
const fs = require('fs');
const crypto = require('crypto');
const path = __dirname + "/../../../keystore";

class KeyStore {
    constructor() {
    }

    Create (pwd) {
        let keyStore = {};
        const account = new AccountHandle().createAccount();
        keyStore.address = account.addr;
        keyStore.crypto = {};
        keyStore.crypto.cipher = "aes-256-ctr";
        keyStore.crypto.ciphertext = "";
        keyStore.crypto.cipherparams = {};
        keyStore.crypto.cipherparams.iv = crypto.randomBytes(16);  // must be 128 bit, random 
        keyStore.kdf = "Argon2id";
        keyStore.kdfparams = {};
        keyStore.kdfparams.timeCost = "4";
        keyStore.kdfparams.memoryCost = "4096";
        keyStore.kdfparams.parallelism = "2";
        keyStore.kdfparams.salt = ""; // random
        keyStore.mac = "";
        keyStore.id = "";
        keyStore.version = "1";

        return keyStore;
    }

    EncryptSecretKey() {

    }

    DecryptSecretKey() {

    }

    Argon2idEncrypt() {
        const options = {
            timeCost: 4, memoryCost: 4096, parallelism: 2, type: argon2.argon2id
        };
        
    }

    Save (keystore) {
        if(!fs.existsSync(path)) fs.mkdirSync(path);
        const filePath = path + "/" + keystore.address;
        const content = JSON.stringify(keystore, null, 4);

        fs.writeFile(filePath, content, {flag: 'w'}, function (err) {
            if(err) {
                console.error(err);
            } else {
                console.log('keystore create success');
            }
         });
    }

    Read (fileName) {
        const filePath = path + "/" + fileName;
    }

    Check() {
    }
}

module.exports = KeyStore;