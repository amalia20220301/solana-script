const web3 = require("@solana/web3.js")

async function generate_tx() {
  let payer = web3.Keypair.generate()
  let connection = new web3.Connection(
    web3.clusterApiUrl("devnet"),
    "confirmed"
  )

  let airdropSignature = await connection.requestAirdrop(
    payer.publicKey,
    web3.LAMPORTS_PER_SOL
  )
  await connection.confirmTransaction(airdropSignature)
  let toAccount = web3.Keypair.generate()

  // Create Simple Transaction
  let transaction = new web3.Transaction()

  // Add an instruction to execute
  transaction.add(
    web3.SystemProgram.transfer({
      fromPubkey: payer.publicKey,
      toPubkey: toAccount.publicKey,
      lamports: 1000,
    })
  )
  return transaction.serialize()
}

generate_tx().then(console.log)
