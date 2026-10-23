---
title: Sending Transactions Using viem
description: "This is a beginner friendly guide to sending Ethereum transactions using the viem library. There are three main steps in order to send a transaction to the Ethereum blockchain: create, sign, and broadcast. We’ll go through all three."
author: "Elan Halpern"
tags: ["transactions", "viem", "alchemy"]
skill: beginner
breadcrumb: Send transactions
lang: en
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

This is a beginner friendly guide to sending Ethereum transactions using the [viem](https://viem.sh/) library. There are three main steps in order to send a transaction to the Ethereum blockchain: create, sign, and broadcast. We’ll go through all three, hopefully answering any questions you might have! In this tutorial, we'll be using [Alchemy](https://www.alchemy.com/) to send our transactions to the Ethereum chain. You can [create a free Alchemy account here](https://auth.alchemy.com/signup).

**NOTE:** This guide is for signing your transactions on the _backend_ for your app. If you want to integrate signing your transactions on the frontend, check out the [MetaMask provider API](https://docs.metamask.io/wallet/reference/provider-api/).

## The Basics {#the-basics}

Like most blockchain developers when they first start, you might have done some research on how to send a transaction (something that should be pretty simple) and ran into a plethora of guides, each saying different things and leaving you a bit overwhelmed and confused. If you’re in that boat, don’t worry; we all were at some point! So, before we start, let’s get a few things straight:

### 1\. Alchemy does not store your private keys {#alchemy-does-not-store-your-private-keys}

- This means that Alchemy cannot sign and send transactions on your behalf. The reason for this is security purposes. Alchemy will never ask you to share your private key, and you should never share your private key with a hosted node (or anyone for that matter).
- You can read from the blockchain using Alchemy’s core API, but to write to it you’ll need to use something else to sign your transactions before sending them through Alchemy (this is the same for any other [node service](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. What is a “signer”? {#what-is-a-signer}

- Signers will sign transactions for you using your private key. In this tutorial we’ll be using [viem](https://viem.sh/) to sign our transaction, but you could also use any other web3 library.
- On the frontend, a good example of a signer would be [MetaMask](https://metamask.io/), which will sign and send transactions on your behalf.

### 3\. Why do I need to sign my transactions? {#why-do-i-need-to-sign-my-transactions}

- Every user that wants to send a transaction on the Ethereum network must sign the transaction (using their private key), in order to validate that the origin of the transaction is who it claims to be.
- It is super important to protect this private key, since having access to it grants full control over your Ethereum account, allowing you (or anyone with access) to perform transactions on your behalf.

### 4\. How do I protect my private key? {#how-do-i-protect-my-private-key}

- There are many ways to protect your private key and to use it to send off transactions. In this tutorial we will be using a `.env` file. However, you could also use a separate provider that stores private keys, use a keystore file, or other options.

### 5\. What is the difference between `eth_sendTransaction` and `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` and `eth_sendRawTransaction` are both Ethereum API functions which broadcast a transaction to the Ethereum network so it will be added to a future block. They differ in how they handle signing of the transactions.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) is used for sending _unsigned_ transactions, which means the node you are sending to must manage your private key so it can sign the transaction before broadcasting it to the chain. Since Alchemy doesn't hold user's private keys, they do not support this method.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) is used to broadcast transactions that have already been signed. This means you first have to sign the transaction with your private key (in viem, using [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) with a [local account](https://viem.sh/docs/accounts/local/privateKeyToAccount)), then pass in the result into `eth_sendRawTransaction`.

When using viem, `eth_sendRawTransaction` is accessed by calling the function [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

This is what we will be using in this tutorial.

### 6\. What is the web3 library? {#what-is-the-web3-library}

- A web3 library is a wrapper around the standard [JSON-RPC calls](/developers/docs/apis/json-rpc/) that is quite common to use in Ethereum development.
- There are many web3 libraries for different languages. In this tutorial we’ll be using [viem](https://viem.sh/), which is written in TypeScript and works in any JavaScript project. You can check out other options [here](/developers/docs/apis/javascript/) like [ethers.js](https://docs.ethers.org/v6/).

Okay, now that we have a few of these questions out of the way, let’s move on to the tutorial. Feel free to ask questions anytime in the Alchemy [discord](https://discord.gg/gWuC7zB)!

### 7\. How to send secure, gas-optimized, and private transactions? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy has a set of transaction resources](https://www.alchemy.com/docs/sending-transactions). You can use these to send transactions, simulate transactions before they happen, send private transactions, and send gas-optimized transactions
- You can also use [Alchemy webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) to be alerted when your transaction is pulled from the mempool and added to the chain

**NOTE:** This guide requires an Alchemy account, an Ethereum address or MetaMask wallet, NodeJs, and npm installed. If not, follow these steps:

1.  [Create a free Alchemy account](https://auth.alchemy.com/signup)
2.  [Create MetaMask account](https://metamask.io/) (or get an Ethereum address)
3.  [Install Node.js and npm](https://nodejs.org/en/download/)

## Steps to Sending your Transaction {#steps-to-sending-your-transaction}

### 1\. Create an Alchemy app on the Sepolia testnet {#create-an-alchemy-app-on-the-sepolia-testnet}

Navigate to your [Alchemy Dashboard](https://dashboard.alchemy.com/) and create a new app, choosing Sepolia (or any other testnet) for your network.

### 2\. Request ETH from the Sepolia faucet {#request-eth-from-sepolia-faucet}

Follow the instructions on the [Alchemy Sepolia faucet](https://www.alchemy.com/faucets/ethereum-sepolia) to receive ETH, or use one of the other [Sepolia faucets](/developers/docs/networks/#sepolia). Faucets give out small amounts (the Alchemy faucet gives 0.1 ETH per day), which is plenty for this tutorial. Make sure to include your **Sepolia** Ethereum address (from MetaMask) and not another network. After following the instructions, double-check that you’ve received the ETH in your wallet.

### 3\. Create a new project directory and `cd` into it {#create-a-new-project-direction}

Create a new project directory from the command line (terminal for macs) and navigate into it:

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Install viem (or any web3 library) {#install-alchemy-web3}

Run the following command in your project directory to install [viem](https://viem.sh/):

Note, if you'd like to use the ethers.js library, [follow the instructions here](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Install dotenv {#install-dotenv}

We’ll use a `.env` file to safely store our API key and private key.

```sh
npm install dotenv
```

### 6\. Create the `.env` file {#create-the-dotenv-file}

Create a `.env` file in your project directory and add the following (replacing “`your-api-url`" and "`your-private-key`")

- To find your Alchemy API URL, navigate to the app details page of the app you just created on your dashboard, click “View Key” in the top right corner, and grab the HTTP URL.
- To find your private key using MetaMask, check out this [guide](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Use an account that only holds testnet ETH.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Don't commit <code>.env</code>! Please make sure never to share or expose your <code>.env</code> file with anyone, as you are compromising your secrets in doing so. If you are using version control, add your <code>.env</code> to a <a href="https://git-scm.com/docs/gitignore">gitignore</a> file.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Create `sendTx.js` file {#create-sendtx-js}

Great, now that we have our sensitive data protected in a `.env` file, let’s start coding. For our send transaction example, we’ll be sending 0.001 ETH to another address you control, such as a second account in MetaMask.

Create a `sendTx.js` file, which is where we will configure and send our example transaction, and add the following lines of code to it:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // nonce starts counting from 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: replace with the address you want to send ETH to
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // optional data field to send message or execute smart contract
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Be sure to replace `0xYourSecondAddress` with the address you want to send ETH to. The script derives your own (sending) address from `PRIVATE_KEY`, so you don't need to enter it.

Now, before we jump into running this code, let's talk about some of the components here.

- `account`: A local account created from your private key with [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). Signing happens on your machine, and the private key is never sent to Alchemy.
- `publicClient` and `walletClient`: viem clients that send JSON-RPC requests to your Alchemy URL. The public client reads from the chain, and the wallet client prepares and signs transactions for your account.
- `nonce` : The nonce specification is used to keep track of the number of transactions sent from your address. We need this for security purposes and to prevent replay attacks. To get the number of transactions sent from your address we use [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). viem would also fill this in for you, but we fetch it explicitly here to show where it comes from.
- `transaction`: The transaction object has a few aspects we need to specify. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) fills in the rest for us, including the `chainId` and the [EIP-1559](/developers/docs/gas/) fee fields `maxFeePerGas` and `maxPriorityFeePerGas`, based on current network conditions
  - `to`: This is the address we want to send ETH to.
  - `value`: This is the amount we wish to send, specified in Wei where 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) converts an ETH amount to Wei for us. Your account needs a little more than this, since it also pays for gas
  - `gas`: There are many ways to determine the right amount of gas to include with your transaction. Alchemy supports [webhooks](https://www.alchemy.com/docs/reference/webhooks-overview) that can notify you about onchain activity. For Mainnet transactions, it's good practice to check current gas conditions to determine the right amount of gas to include. A plain ETH transfer to an ordinary address always uses exactly 21000 gas, which is the minimum for any transaction, so we put 21000 here. If you leave `gas` out, viem estimates it for you.
  - `nonce`: see above nonce definition. Nonce starts counting from zero.
  - [OPTIONAL] data: Used for sending additional information with your transfer, or calling a smart contract, not required for balance transfers, check out the note below.
- `signedTx`: To sign our transaction object we will use the `signTransaction` method, which signs it locally with the account created from our `PRIVATE_KEY`
- `sendRawTransaction`: Once we have a signed transaction, we can send it off to be included in a subsequent block by using `sendRawTransaction`, which calls `eth_sendRawTransaction`
- `waitForTransactionReceipt`: Waits until the transaction is included in a block and returns its receipt

**A Note on data**
There are a two main types of transactions that can be sent in Ethereum.

- Balance transfer: Send ETH from one address to another. No data field required, however, if you'd like to send additional information alongside your transaction, you can include that information in HEX format in this field.
  - For example, let's say we wanted to write the hash of an IPFS document to the Ethereum chain in order to give it an immutable timestamp. Our data field should then look like `data: toHex("IPFS hash")`, using viem's [`toHex`](https://viem.sh/docs/utilities/toHex). And now anyone can query the chain and see when that document was added.
- Smart contract transaction: Execute some smart contract code on the chain. In this case, the data field should contain the smart function you wish to execute, alongside any parameters.
  - For a practical example, check out the [Hello World Smart Contract tutorial](/developers/tutorials/hello-world-smart-contract/).

### 8\. Run the code using `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Navigate back to your terminal or command line and run:

```sh
node sendTx.js
```

### 9\. See your transaction on a block explorer {#see-your-transaction-in-the-mempool}

The script prints the transaction hash as soon as the node accepts the transaction, then waits until it is included in a block (usually within a few seconds) and prints the result. To see the details, paste the hash into a Sepolia block explorer such as [Sepolia Etherscan](https://sepolia.etherscan.io/) or [Blockscout](https://eth-sepolia.blockscout.com/). There you can watch the transaction go from pending to included, and see the amount, fees and block it landed in.

If you see an `insufficient funds` error instead, your account doesn't have enough Sepolia ETH to cover the value plus gas. Go back to step 2 and request more from a faucet.

**Yippieeee! You just sent your first Ethereum transaction using Alchemy 🎉**

_For feedback and suggestions about this guide, please message Elan on Alchemy’s [Discord](https://discord.gg/gWuC7zB)!_

_Originally published by Alchemy._
