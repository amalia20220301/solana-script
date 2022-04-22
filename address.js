let BIP32Factory = require('bip32').default
const bs58 = require('bs58')
const bip39 = require('bip39')
const solanaWeb3 = require('@solana/web3.js');
const { Keypair } = require("@solana/web3.js");
var bip32Edd25519 = require('bip32-ed25519')
var eddsa = bip32Edd25519.eddsa;
require('dotenv').config()

const path = "m/44'/501'/0'/0'";
const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
const nacl = require('tweetnacl')

// var xprv = bip32Edd25519.generateFromSeed(seed);
// console.log('xprv:', xprv.toString('hex'));
// var xpub = bip32Edd25519.toPublic(xprv);
// console.log('xpub:', xpub.toString('hex'));

// var derivedPrivateKey = xprv;
// var indexes = path.split('/').slice(1);

// for (var j = 0; j < indexes.length; j++) {
//     derivedPrivateKey = bip32Edd25519.derivePrivate(derivedPrivateKey, parseInt(indexes[j]));
//
//     const keyPair = eddsa.keyFromSecret(derivedPrivateKey.slice(0, 32));
//     var publicKey = Buffer.from(keyPair.getPublic(true, true));
//     console.log(`-------${j} round--------`)
//     console.log('publicKey', publicKey.toString('hex'))
//     console.log('keyPair secret', keyPair.secret().toString('hex'))
//     console.log('---------------')
//     let accountFromSecret = new Keypair({publicKey: Buffer.from(keyPair.getPublic(true, true)), secretKey: Buffer.from(keyPair.getSecret(true, true))});
//     console.log('---------------')
//     console.log('accountFromSecret public key', accountFromSecret.publicKey.toBase58())
//     console.log('accountFromSecret secret key', accountFromSecret.secretKey)
//     console.log(`------${j} round---------`)
//
// }


const { derivePath, getMasterKeyFromSeed, getPublicKey } = require('ed25519-hd-key')
const { key } = derivePath(path, seed.toString('hex'));
console.log('address', bs58.encode(nacl.sign.keyPair.fromSeed(key).publicKey))
// console.log('address', bs58.encode(getPublicKey(key)))
// console.log('expected', bs58.decode("53Kpey3CQzBvKny3zUvcUEQCHoRMjFgTyvEedb6pwp5G").toString())


// var xprv = bip32Edd25519.generateFromSeed(seed);
// console.log('xprv:', xprv.toString('hex'));
//
// var xpub = bip32Edd25519.toPublic(xprv);
// console.log('xpub:', xpub.toString('hex'));
//
// var indexes = "m/44/501/0/0".split('/').slice(1);
// var xprv = bip32Edd25519.generateFromSeed(seed);
// var xpub = bip32Edd25519.toPublic(xprv);
//
// var derivedPrivateKey = xprv;
// var derivedPublicKey = xpub;
//
// for (var j = 0; j < indexes.length; j++) {
//     derivedPrivateKey = bip32Edd25519.derivePrivate(derivedPrivateKey, parseInt(indexes[j]));
//     derivedPublicKey = bip32Edd25519.derivePublic(derivedPublicKey, parseInt(indexes[j]));
//
//     const keyPair = eddsa.keyFromSecret(derivedPrivateKey.slice(0, 32));
//     var publicKey = Buffer.from(keyPair.getPublic(true, true));
//     console.log('---------publicKey------')
//     console.log(publicKey)
//     console.log('expected', bs58.decode('5TMoG9qcJJYVLXd7LZN4VV4BQgPBTT3xuZzafjv1MeNs').toString())
//     console.log('---------------')
// }
