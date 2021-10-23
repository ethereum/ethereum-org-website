---
title: 💻 Executing and Interacting with a Smart Contract (Part 2/4 of Hello World dApp Series)
description: Step by step guide on interacting with a deployed Ethereum smart contract by updating a smart contract variable.
author: "nstrike2"
tags:
  [
    "solidity",
    "hardhat",
    "truffle",
    "alchemy",
    "smart contracts",
    "getting started",
    "deploying"
  ]
skill: beginner
lang: en
sidebar: true
published: 2021-10-06
---
# 💻 Executing and Interacting with a Smart Contract

Before starting this tutorial on interacting with a smart contract, you should have completed part 1 — [Hello World Smart Contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract) \(creating and deploying a smart contract\). In part 3 we'll go over [submitting our contract to Etherscan](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan) so anyone can understand how to interact with it!

And if you haven't already, you'll definitely need an Alchemy account to complete this tutorial as well as build anything on the blockchain. Sign up for a free account [here](https://alchemy.com/?a=eth-org-executing)!

## Part 2: Interact with your Smart Contract

Now that we've successfully deployed a smart contract to the ropsten network, let's test out our web3 skills and interact with it! We'll be using [Alchemy](https://alchemy.com/?a=interact) and our [enhanced web3 library](https://docs.alchemy.com/alchemy/documentation/alchemy-web3) for our node infrastructure, with either Hardhat or Truffle as our development environments.
### Hardhat vs Truffle

There are two versions of this tutorial: one using **Hardhat** and one using **Truffle**. They are both development environments for building on Ethereum and have similar functionality so it's totally up to you to decide which you want to use. Hardhat is the newer kid on the block and tends to be a bit cleaner/easier to use, they also have lots of plugins to make it more customizable.

## 📋 Steps to execute and interact with your smart contract using Alchemy

This guide assumes you already have an [Alchemy account](https://alchemy.com/?r=e68b2f77-7fc7-4ef7-8e9c-cdfea869b9b5), access to our [Dashboard](https://dashboard.alchemyapi.io/) and have gone through our [Hello World Smart Contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract) tutorial. 

**🛠 Step 1:** [Install web3 library](#step-1-install-web3-library)

**🧑‍🎨 Step 2:**  [Create a contract-interact.js file](#step-2-create-a-contract-interact.js-file)

**🤝 Step 3:** [Grab your contract ABI](#step-3-grab-your-contract-ABI)

**💻 Step 4:** [Create an instance of your contract](#step-4-create-an-instance-of-your-contract)

**📖 Step 5:** [Read the init message](#step-5-read-the-init-message)

**🔺 Step 6:** [Update the message](#step-6-update-the-message)

**⏫ Step 7:** [Update the .env file](#step-7-update-the-.env-file)

**🪄 Step 8:** [Create the transaction](#step-8-create-the-transaction)

**✍️ Step 9:** [Sign the transaction](#step-9-sign-the-transaction)

**📞 Step 10:** [Call updateMessage and run contract-interact.js](#step-10-call-updatemessage-and-run-contract-interact.js)

### Step 1: Install web3 library {#step-1-install-web3-library}

If you followed the tutorial on [creating your smart contract using Hardhat](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/#create-and-deploy-your-smart-contract-using-hardhat), you already have experience using Ethers.js. Web3 is similar to Ethers as it is a library used to make creating requests to the Ethereum chain easier. There are a handful of [web3 providers](https://docs.alchemy.com/alchemy/introduction/getting-started/#other-web3-libraries) you can choose from, however in this tutorial we'll be using [Alchemy Web3](https://docs.alchemy.com/alchemy/documentation/alchemy-web3), which is an enhanced web3 library that offers automatic retries and robust WebSocket support. 

In your project home directory run:

```text
npm install @alch/alchemy-web3
```

### Step 2: Create a contract-interact.js file {#step-2-create-a-contract-interact.js-file}

Inside your `scripts/` folder for the hardhat tutorial, or your home directory for the [Truffle tutorial](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract#create-and-deploy-your-smart-contract-using-truffle), create a `contract-interact.js` file and add the following lines of code:

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);
```

### Step 3: Grab your contract ABI {#step-3-grab-your-contract-ABI}

Our contract ABI \(Application Binary Interface\) is the interface to interact with our smart contract. You can learn more about Contract ABIs [here](https://docs.alchemy.com/alchemy/guides/eth_getlogs#what-are-ab-is). Hardhat \(and Truffle\) automatically generates an ABI for us and saves it in the HelloWorld.json file.  In order to use this we'll need to parse out the contents by adding the following lines of code to our `contract-interact.js` file:

```javascript
// For Truffle
const contract = require("./build/contracts/HelloWorld.json"); 

// For Hardhat 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
```

If you want to see the ABI you can print it to your console:

```javascript
console.log(JSON.stringify(contract.abi));
```

To run `contract-interact.js` and see your ABI printed to the console navigate to your terminal and run

**Hardhat:**

```bash
node scripts/contract-interact.js
```

**Truffle:**

```bash
node contract-interact.js
```

### Step 4: Create an instance of your contract {#step-4-create-an-instance-of-your-contract}

In order to interact with our contract we need to create an instance of it in our code. To do so we'll need our contract address which we can get from the deployment or [Etherscan](https://ropsten.etherscan.io/) by looking up the address you used to deploy the contract. In the above example our contract address is `0x70c86b8d660eBd0adef24E9ACcb389BFb6611B2b`. 

Next we will use the web3 [contract method](https://web3js.readthedocs.io/en/v1.2.0/web3-eth-contract.html?highlight=constructor#web3-eth-contract) to create our contract using the ABI and address:

```javascript
const contractAddress = "0x70c86b8d660eBd0adef24E9ACcb389BFb6611B2b";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);
```

### Step 5: Read the init message {#step-5-read-the-init-message}

Remember when we deployed our contract with the`initMessage = "Hello world!"`? We are now going to read that message stored in our smart contract and print it to the console. 

In JavaScript we use asynchronous functions to interact with networks. Check out this [article](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff) to learn more about this. 

Use the code below to call the `message` function in our smart contract and read the init message:

```javascript
async function main() {
  const message = await helloWorldContract.methods.message().call();
  console.log("The message is: " + message);
}
main();
```

After running the file using `node scripts/contract-interact.js` in the terminal we should see this response:

```text
The message is: Hello world! 
```

Congrats! You've just successfully read smart contract data from the Ethereum blockchain, way to go! 

### Step 6: Update the message {#step-6-update-the-message}

Now instead of just reading the message, we'll update the messaged saved in our smart contract using the `update` function. ‌

In order to do so we'll need to create a transaction, sign it, and send it inside another async function that we'll call`updateMessage(newMessage)`. This can be pretty confusing when you first get started so we'll split it up into multiple steps. 

### Step 7: Update the `.env` file {#step-7-update-the-.env-file}

In order to create and send transactions to the Ethereum chain, we'll need to add a couple more things to our .env file. 

* `PUBLIC_KEY`: Your public ethereum account address, we'll need this to get the account `nonce` \(will explain later\)
* `PRIVATE_KEY`: If you completed the Truffle version of the tutorial, you'll also need to add your private key from Metamask in order to sign our transaction. You can export the private key using [these instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key). This ensures the transaction is coming from the account owner. Again, don't worry, this will live in our `.env` file!

If you completed the [Hardhat version](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/#create-and-deploy-your-smart-contract-using-hardhat) of this tutorial, your .`env` file should now look like this:

```javascript
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-private-account-address"
PUBLIC_KEY = "your-public-account-address"
```

If you completed the [Truffle version](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/#create-and-deploy-your-smart-contract-using-truffle) of this tutorial, your .`env` file should now look like this:

```javascript
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
MNEMONIC = "your-metamask-seed-reference"
PUBLIC_KEY = "your-public-account-address"
PRIVATE_KEY = "your-private-account-address"
```

If you haven't already, sign up for Alchemy [here](https://alchemy.com/?a=eth-org-executing)!

### Step 8: Create the transaction {#step-8-create-the-transaction}

Define `updateMessage(newMessage)` and create our transaction. 

1. First grab your `PUBLIC_KEY` __and __`PRIVATE_KEY` from the .env file.
2. Next, we'll need to grab the account `nonce`. The nonce specification is used to keep track of the number of transactions sent from your address. We need this for security purposes and to prevent [replay attacks](https://docs.alchemy.com/alchemy/resources/blockchain-glossary/#account-nonce). To get the number of transactions sent from your address we use [getTransactionCount](https://docs.alchemy.com/alchemy/apis/ethereum#eth_gettransactioncount). 
3. Next, we'll use [eth\_estimateGas](https://docs.alchemy.com/alchemy/apis/ethereum/eth_estimategas) to figure out the right amount of gas to include in order to complete our transaction. This avoids the risk of a failed transaction due to insufficient gas. 
4. Finally we'll create our `transaction` with the following info:

* `'from': PUBLIC_KEY` : The origin of our transaction is our public address
* `'to': contractAddress` : The contract we wish to interact with and send the transaction
* `'nonce': nonce` : The account nonce with the number of transactions sent from our address
* `'gas': estimatedGas` :  The estimated gas needed to complete the transaction
* `'maxFeePerGas': estimatedGasPrice`: The estimated total fee to pay per gas. This value should be set to the baseFee of the pending block plus an estimated tip for the miner, usually retrieved from `eth_maxPriorityFeePerGas`.
* `'data': helloWorldContract.methods.update("<new message>").encodeABI()` : The computation we wish to perform in this transaction \(updating the contract message\)

Your `contract-interact.js` file should look like this now: 

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contract = require("./build/contracts/HelloWorld.json"); // for Truffle 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); // for Hardhat
const contractAddress = "0x0d6261a5D3102b565B75Fc680B64093820a17612";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);

async function updateMessage(newMessage) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas(); // estimate gas

    // Create the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': gasEstimate, 
      'maxFeePerGas': 1000000108,
      'data': helloWorldContract.methods.update(newMessage).encodeABI()
    };
}


async function main() {
    const message = await helloWorldContract.methods.message().call();
    console.log("The message is: " + message);
  }

main();
```

### Step 9: Sign the transaction {#step-9-sign-the-transaction}

Now that we've created our transaction, we need to sign it in order to send it off. Here is where we'll use our private key. 

`web3.eth.sendSignedTransaction` will give us the transaction hash, which we can use to make sure our transaction was mined and didn't get dropped by the network. 

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contract = require("./build/contracts/HelloWorld.json"); // for Truffle 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); // for Hardhat
const contractAddress = "0x0d6261a5D3102b565B75Fc680B64093820a17612";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);

async function updateMessage(newMessage) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas(); // estimate gas

    // Create the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': gasEstimate, 
      'maxFeePerGas': 1000000108,
      'data': helloWorldContract.methods.update(newMessage).encodeABI()
    };

    // Sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        }
      });
    }).catch((err) => {
      console.log("Promise failed:", err);
    });
}

async function main() {
    const message = await helloWorldContract.methods.message().call();
    console.log("The message is: " + message);
}

main();
```

### Step 10: Call `updateMessage` and run `contract-interact.js` {#step-10-call-updatemessage-and-run-contract-interact.js}

Finally, we can call `updateMessage` with our new message by making an `await` call in `main` for `updateMessage` with your `newMessage.` 

```javascript
require('dotenv').config();
const API_URL = process.env.API_URL;
const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

// const contract = require("./build/contracts/HelloWorld.json"); // for Truffle 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json"); // for Hardhat
const contractAddress = "0x0d6261a5D3102b565B75Fc680B64093820a17612";
const helloWorldContract = new web3.eth.Contract(contract.abi, contractAddress);

async function updateMessage(newMessage) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); // get latest nonce
    const gasEstimate = await helloWorldContract.methods.update(newMessage).estimateGas(); // estimate gas

    // Create the transaction
    const tx = {
      'from': PUBLIC_KEY,
      'to': contractAddress,
      'nonce': nonce,
      'gas': gasEstimate, 
      'maxFeePerGas': 1000000108,
      'data': helloWorldContract.methods.update(newMessage).encodeABI()
    };

    // Sign the transaction
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);
    signPromise.then((signedTx) => {
      web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(err, hash) {
        if (!err) {
          console.log("The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
        } else {
          console.log("Something went wrong when submitting your transaction:", err)
        }
      });
    }).catch((err) => {
      console.log("Promise failed:", err);
    });
}

async function main() {
    const message = await helloWorldContract.methods.message().call();
    console.log("The message is: " + message);
    await updateMessage("Hello Drupe!");
}

main();
```

Then run `node scripts/contract-interact.js` in your terminal.

You should see a response that looks like:

```text
The message is: Hello world!
The hash of your transaction is: 0xd6b89d1e31d53b732afc461e04ed0cebc451cfe6e8470519fe06eb4295f5b504 
Check Alchemy's Mempool to view the status of your transaction!
```

Next visit your [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) to see the status of your transaction \(whether it's pending, mined, or got dropped by the network\). If your transaction got dropped, it's also helpful to check [Ropsten Etherscan](https://ropsten.etherscan.io/) and search for your transaction hash. 

Once your transaction gets mined, comment out the `await updateMessage("Hello Drupe!");` line in `main()` and re-run `node scripts/contract-interact.js` to print out the new message. 

Your `main()` should look like \(everything else in your code should stay the same\)

```javascript
async function main() {
    const message = await helloWorldContract.methods.message().call();
    console.log("The message is: " + message);
    // await updateMessage("Hello Drupe!");
}
```

After running `node scripts/contract-interact.js` you should now see the new message printed to your console:

```javascript
The message is: Hello Drupe!
```

And that's it! You've now deployed AND interacted with an Ethereum smart contract. If you'd like to publish your contract to Etherscan so that anyone will know how to interact with it, check out [part 3: submitting your smart contract to etherscan](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan)! 🎉

Once you complete this tutorial, let us know how your experience was or if you have any feedback by tagging us on Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
