"use strict";

const bs58 = require('./base58');
const keccak512 = require('./sha3').keccak512;
const hash = require('./hashes.min.js');
const nacl = require('./nacl.min.js');
const NetType = {
    'Public_Net': 1,
    'Test_Net': 2,
    'RegTest_Net': 3
};

class AccountHandle {
    constructor() {}

    createAccount (netType = NetType.Public_Net) {
        let keyPair = this.createKeyPair();
        
        let s1 = keccak512(keyPair.publicKey);
        let s2 = new hash.RMD160().hex(s1);
        let s3 = '00' + s2;
        if(netType == NetType.Test_Net) {
            s3 = 'S'.charCodeAt() + s2;
        }
        let v = keccak512(s3).substring(0, 8);
        let s4 = s3 + v;
        let addr = new bs58().encode(s4);
        return {
            'secretKey': keyPair.secretKey,
            'publicKey': keyPair.publicKey,
            'addr': addr
        }
    }

    createKeyPair() {
        return new nacl.sign.keyPair();
    }
}

module.exports = AccountHandle;