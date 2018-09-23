"use strict";

const bs58 = require('./base58');
const keccak512 = require('./sha3').keccak512;
const hash = require('./hashes.js');
const nacl = require('./nacl.min.js');
const crypto = require('crypto');

const NetType = {
    'Public_Net': 1,
    'Test_Net': 2,
    'RegTest_Net': 3
};

class AccountHandle {
    constructor() {}

    createAccount (netType = NetType.Public_Net) {
        const secretKey = crypto.randomBytes(32);
        let keyPair = this.createKeyPairBySecretKey(secretKey);
        
        let s1 = keccak512(keyPair.publicKey);
        let s2 = new hash.RMD160().hex(this.Hex2Str(s1));
        let s3 = '00' + s2;
        if(netType == NetType.Test_Net) {
            s3 = 'S'.charCodeAt() + s2;
        }
        let v = keccak512(this.Hex2Array(s3)).substring(0, 8);
        let s4 = s3 + v;
        let addr = new bs58().encode(this.Hex2Array(s4));
        return {
            'secretKey': keyPair.secretKey,
            'publicKey': keyPair.publicKey,
            'addr': addr
        }
    }

    createAccountWithPubKey (pubKey, netType = NetType.Public_Net) {
        let s1 = keccak512(pubKey);

        let s2 = new hash.RMD160({'utf8':false}).hex(this.Hex2Str(s1));
        let s3 = '00' + s2;
        if(netType == NetType.Test_Net) {
            s3 = 'S'.charCodeAt() + s2;
        }
        
        let v = keccak512(this.Hex2Array(s3)).substring(0, 8);
        let s4 = s3 + v;

        let addr = new bs58().encode(this.Hex2Array(s4));
        return {
            'secretKey': keyPair.secretKey,
            'publicKey': keyPair.publicKey,
            'addr': addr
        }
    }

    createKeyPair() {
        return new nacl.sign.keyPair();
    }

    createKeyPairBySecretKey(secretKey) {
        return new nacl.sign.keyPair.fromSeed(secretKey);
    }

    Hex2Str(hex) {
        let ret = '';
        for(let i=0; i<hex.length; i+=2) {
            ret += String.fromCharCode(parseInt(hex.substr(i,2), 16));
        }
        return ret;
    }

    Hex2Array(hex) {
        let ret = new Array();
        for(let i=0; i<hex.length; i+=2) {
            ret.push(parseInt(hex.substr(i,2), 16));
        }
        return ret;
    }
}

module.exports = AccountHandle;