const createWallet = `const ethers = require("ethers")

// Create a wallet instance from a mnemonic...
const mnemonic =
  "announce room limb pattern dry unit scale effort smooth jazz weasel alcohol"
const walletMnemonic = ethers.Wallet.fromMnemonic(mnemonic)

// ...or from a private key
const walletPrivateKey = new ethers.Wallet(walletMnemonic.privateKey)

// ...or create a wallet from a random private key
const randomWallet = ethers.Wallet.createRandom()

walletMnemonic.address
// '0x71CB05EE1b1F506fF321Da3dac38f25c0c9ce6E1'

// The internal cryptographic components
walletMnemonic.privateKey
// '0x1da6847600b0ee25e9ad9a52abbd786dd2502fa4005dd5af9310b7cc7a3b25db'
walletMnemonic.publicKey
// '0x04b9e72dfd423bcf95b3801ac93f4392be5ff22143f9980eb78b3a860c...d64'

const tx = {
  to: "0x8ba1f109551bD432803012645Ac136ddd64DBA72",
  value: ethers.utils.parseEther("1.0"),
}

// Sign a transaction
walletMnemonic.signTransaction(tx)
// { Promise: '0xf865808080948ba1f109551bd432803012645ac136ddd6...dfc' }

// Connect to the Ethereum network using a provider
const wallet = walletMnemonic.connect(provider)

// Query the network
wallet.getBalance()
// { Promise: { BigNumber: "42" } }
wallet.getTransactionCount()
// { Promise: 0 }

// Send ether
wallet.sendTransaction(tx)

// Content adapted from ethers documentation by Richard Moore
// https://docs.ethers.io/v5/api/signer/#Wallet
// https://github.com/ethers-io/ethers.js/blob/master/docs/v5/api/signer/README.md#methods
// Content is licensed under the Creative Commons License:
// https://choosealicense.com/licenses/cc-by-4.0/
`

export default createWallet
