import 'dotenv/config'
import { derivePath, getMasterKeyFromSeed, getPublicKey } from 'ed25519-hd-key'
import bs58 from 'bs58'
import bip39 from 'bip39'
import nacl from 'tweetnacl';

export const getAddress = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'));
    return bs58.encode(nacl.sign.keyPair.fromSeed(key).publicKey)
}

export const getPrivKey = (path) => {
    const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
    const { key } = derivePath(path, seed.toString('hex'))
    return nacl.sign.keyPair.fromSeed(key).secretKey
}

const path = "m/44'/501'/0'/0'"
// console.log(getAddress(path));
