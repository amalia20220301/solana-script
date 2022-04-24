import { getPrivKey } from "./address.js"
import nacl from 'tweetnacl'

export const signMessage = (msg) => {
  const path = "m/44'/501'/0'/0'"
  const privKey = getPrivKey(path)
  const message = new TextEncoder().encode(msg);
  const signature = nacl.sign.detached(message, privKey)
  console.log('---signature-------'); console.log('signature', Buffer.from(signature).toString('hex')); console.log('-----signature-----');
  return signature
}

export const signTransaction = (tx) => {
  const signature = nacl.sign.detached(tx.serializeMessage(), privKey)
  tx.addSignature(signature)
  return tx
}

// signMessage('To avoid digital dognappers, sign below to authenticate with CryptoCorgis.')
