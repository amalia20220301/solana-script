import { SolSignRequest, SolSignature } from "@keystonehq/bc-ur-registry-sol";
import { URDecoder, UREncoder } from "@ngraveio/bc-ur";
import nacl from 'tweetnacl';
import { derivePath } from 'ed25519-hd-key'
import bip39 from 'bip39';
import bs58 from 'bs58';
import 'dotenv/config'
/*
declare type signRequestProps = {
    requestId?: Buffer;
    signData: Buffer;
    derivationPath: CryptoKeypath;
    address?: Buffer;
    origin?: string;
};
*/

/*
generate signature message
*/
const path = "m/44'/501'/0'/0'";

const seed = bip39.mnemonicToSeedSync(process.env.WORDS)
const { key } = derivePath(path, seed.toString('hex'));
const message = new TextEncoder().encode('Hello, world!');
// signingMessage
const signMsgUR = "ur:sol-sign-request/otadtpdagdwdolrdpsrffhgwmklkksrkhfdeamkikeaogtfdihjzjzjldwcxktjljpjzieclaxtaaddyoeadlocsdwykcfadykykaeykaeykaocykscnayaahdsaasla"
const decodedSignMsgUR = URDecoder.decode(signMsgUR);
const solSignMsgDecoded = SolSignRequest.fromCBOR(decodedSignMsgUR.cbor);
// generate signature
const msgSig = nacl.sign.detached(message, nacl.sign.keyPair.fromSeed(key).secretKey)
console.log('address', bs58.encode(nacl.sign.keyPair.fromSeed(key).publicKey))
console.log('message signature', msgSig)
// verify signature
console.log('-----message signature verify------')
console.log(nacl.sign.detached.verify(message, msgSig, nacl.sign.keyPair.fromSeed(key).publicKey), 'pubKey', nacl.sign.keyPair.fromSeed(key).publicKey)
console.log('-----------')
// generate signature ur
console.log(msgSig, 'message signature', Buffer.from(msgSig))
const solMsgSignature = new SolSignature(Buffer.from(msgSig), solSignMsgDecoded.getRequestId());
console.log('solMsgSignature-----11111------------')
console.log(solMsgSignature.toDataItem())
const signatureUR = solMsgSignature.toUREncoder(1000).nextPart();
console.log(signatureUR)
const solMsgSignature2 = new SolSignature(msgSig, solSignMsgDecoded.getRequestId());
console.log('solMsgSignature-----22222------------')
console.log(solMsgSignature2.toDataItem())
const signatureUR2 = solMsgSignature2.toUREncoder(1000).nextPart();
console.log(signatureUR2)


/*
generate signature transaction
*/

// signing request
const signRequestUR = "ur:sol-sign-request/otadtpdagdglqdtymkgedsgwlknesgdpbnvlpmfycpaooeiejykkjoihiyfwkpiyiyihjpieiehsjyhsmkmtadaeadaxcsfwcsdlcshlcshpcscycsmhcsiycscycsfecsencsdecslacsiocsdycslkaecszocswycsrtcssscsrdcslkbycsgacsmocswzcsuocssrcspdcsimcsvtcsvscsroaybecsrocsvlcsdtcstiaocskgcsyncsuecslacsqzcsjkcmcslbcslpcstacscxcslncspkcskecsrtcscwcswdcshdcsdmcsrlcshlcsclcsgecshlaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaeaecslpcsmtcsrlcsfgcsptcsdscsztcsehadcssnbzcsdlcswmcsflcsgtaycsckcszccsiobdcsgacsstcsuecsetcsfscsykcshscsrscstkbkbkcsdladaoaoaeadbnaoaeaeaeadaeaeaeaeaeaeaeaxtaaddyoeadlocsdwykcfadykykaeykaeykaocykscnayaafgzswzhp"
const decodedSignRequestUR = URDecoder.decode(signRequestUR);
const solSignRequestDecoded = SolSignRequest.fromCBOR(decodedSignRequestUR.cbor);
// generate signature
const signRequestSig = nacl.sign.detached(Buffer.from(solSignRequestDecoded.getSignData()), nacl.sign.keyPair.fromSeed(key).secretKey)
console.log('signRequest signature', signRequestSig)
console.log('uuid', solSignRequestDecoded.getRequestId())
//verify signature
console.log('-----verify signRequest------')
console.log(nacl.sign.detached.verify(Buffer.from(solSignRequestDecoded.getSignData()), signRequestSig, nacl.sign.keyPair.fromSeed(key).publicKey), 'pubKey', nacl.sign.keyPair.fromSeed(key).publicKey)
console.log('-----------')
//generate sign request signature UR
const solsignRequestSignature = new SolSignature(Buffer.from(signRequestSig), solSignRequestDecoded.getRequestId());
const solsignRequestSignatureUR = solsignRequestSignature.toUREncoder(1000).nextPart();
console.log(solsignRequestSignatureUR)

