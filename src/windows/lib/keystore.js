"use strict";

const AccountHandle = require('./account-handle');
const aesjs = require('./aes-js');
const keccak512 = require('./sha3').keccak512;
const argon2 = require('argon2');
const fs = require('fs');
const crypto = require('crypto');
const uuidV4 = require('uuid/v4');
const path = __dirname + "/../../../keystore";

class KeyStore {
    constructor() {
    }

    async Create (pwd) {
        let keyStore = {};
        const account = new AccountHandle().createAccount();
        keyStore.address = account.addr;
        keyStore.crypto = {};
        keyStore.crypto.cipher = "aes-256-ctr";
        //keyStore.crypto.ciphertext = "";
        keyStore.crypto.cipherparams = {};
        keyStore.crypto.cipherparams.iv = crypto.randomBytes(16).toString('hex');  // must be 128 bit, random 

        //const aesCtr = new aesjs.ModeOfOperation.ctr(key_256, new aesjs.Counter(5));
        //var encryptedBytes = aesCtr.encrypt(textBytes);
        
        keyStore.kdf = "Argon2id";
        keyStore.kdfparams = {};
        keyStore.kdfparams.timeCost = "4";
        keyStore.kdfparams.memoryCost = "4096";
        keyStore.kdfparams.parallelism = "2";
        keyStore.kdfparams.salt = crypto.randomBytes(32).toString('hex'); // random
        keyStore.version = "1";

        const salt = Buffer.from(keyStore.kdfparams.salt, 'hex');
        const options = {
            timeCost: 4, memoryCost: 4096, parallelism: 2, type: argon2.argon2id, hashLength: 32, 
            version: 0x13, raw: true, salt
        };
        const p1 = Buffer.from(pwd, 'ascii').toString('hex');
        const s1 = keyStore.kdfparams.salt + p1;
        const derivedKey = await argon2.hash(s1, options);

        const vi = Buffer.from(keyStore.crypto.cipherparams.iv, 'hex');
        const aesCtr = new aesjs.ModeOfOperation.ctr(derivedKey, new aesjs.Counter(vi));
        const encryptedBytes = aesCtr.encrypt(account.secretKey);
        keyStore.crypto.ciphertext = aesjs.utils.hex.fromBytes(encryptedBytes);

        const dc = derivedKey.toString('hex') + keyStore.crypto.ciphertext;
        const dc_buf = Buffer.from(dc, 'hex');
        keyStore.mac = keccak512(dc_buf);

        keyStore.id = uuidV4();

        return keyStore;
    }

    EncryptSecretKey() {

    }

    async DecryptSecretKey(addr, pwd) {
        const keyStore = this.Read(addr);
        if(keyStore == null) return null;

        const salt = Buffer.from(keyStore.kdfparams.salt, 'hex');

        const options = {
            timeCost: 4, memoryCost: 4096, parallelism: 2, type: argon2.argon2id, hashLength: 32, 
            version: 0x13, raw: true, salt
        };
        const p1 = Buffer.from(pwd, 'ascii').toString('hex');
        const s1 = keyStore.kdfparams.salt + p1;
        const derivedKey = await argon2.hash(s1, options);

        const dc = derivedKey.toString('hex') + keyStore.crypto.ciphertext;
        const dc_buf = Buffer.from(dc, 'hex');
        const mac = keccak512(dc_buf);

        if(mac != keyStore.mac) return null;

        const vi = Buffer.from(keyStore.crypto.cipherparams.iv, 'hex');
        const aesCtr = new aesjs.ModeOfOperation.ctr(derivedKey, new aesjs.Counter(vi));
        var encryptedBytes = aesjs.utils.hex.toBytes(keyStore.crypto.ciphertext);
        var decryptedBytes = aesCtr.decrypt(encryptedBytes);
        return decryptedBytes;
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
        if(fs.existsSync(filePath) == false) return null;
        const result = JSON.parse(fs.readFileSync( filePath));
        return result;
    }

    Check() {
    }
}

module.exports = KeyStore;