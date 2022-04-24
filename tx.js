import web3, { Transaction, SystemProgram } from '@solana/web3.js'
import { getAddress } from './address.js'
import { signTransaction } from './sig.js'

async function generate_tx() {
  const path = "m/44'/501'/0'/0'"
  let payer = getAddress(path)
  let connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  )
  let transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: payer,
      toPubkey: payer,
      lamports: 100,
    })
  );
  transaction.feePayer = payer;
  const anyTransaction = transaction;
  try {
    const blockhash = await connection.getLatestBlockhash();
    console.log('---blockhash-------'); console.log('blockhash', blockhash); console.log('-----blockhash-----');
    anyTransaction.recentBlockhash = (
      blockhash
    ).blockhash;
    return transaction
  } catch (e) {
    console.log('----generate_tx error------'); console.log('generate_tx error', e); console.log('-----generate_tx error-----');
  }
}

generate_tx().then(tx => {
  console.log('---unsigned Transaction-------'); console.log('unsigned Transaction', tx); console.log('-----unsigned Transaction-----');
  const signTx = signTransaction(tx)
  console.log('---signedTransaction-------'); console.log('signedTransaction', signTx); console.log('-----signedTransaction-----');
  console.log('---signedTransaction-------'); console.log('signedTransaction Signature', signTx.signature); console.log('-----signedTransaction-----');
}).catch(console.log)
