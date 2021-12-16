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
# Executing and Interacting with a Smart Contract {#executing-and-interacting-with-a-smart-contract}

Before starting this tutorial on interacting with a smart contract, you should have completed part 1 — [Hello World Smart Contract](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract) (creating and deploying a smart contract). In part 3 we'll go over [submitting our contract to Etherscan](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan) so anyone can understand how to interact with it!

If you're more into video learning, click on the thumbnail below for a step-by-step walkthrough! 👇

[![](https://img.youtube.com/vi/sQJ-XQBzEuc/maxresdefault.jpg)](https://www.youtube.com/watch?v=sQJ-XQBzEuc)

And if you haven't already, you'll definitely need an Alchemy account to complete this tutorial as well as build anything on the blockchain. Sign up for a free account [here](https://alchemy.com/)!

## Part 2: Interact with your Smart Contract {#interact-with-your-smart-contract}

Now that we've successfully deployed a smart contract to the ropsten network, let's test out our web3 skills and interact with it! We'll be using [Alchemy](https://alchemy.com/?a=interact) as our Ethereum API that lets us read and write to the blockchain.

### Step 1: Create a interact.js file {#step-1-create-a-interact.js-file}

This is the file where we'll write our interaction script. We'll be using the Ethers.js library that you previously installed in Part 1.&#x20;

Inside your `scripts/`folder for the Hardhat tutorial, or your home directory for the Truffle tutorial, create a new file named `interact.js` add the following lines of code:

```javascript
// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
```

### Step 2: Update your .env file {#step-2-update-your-.env-file}

We will be using new environment variables, so we need to define them in our `.env` file and make sure that the `dotenv` module is loading these variables.

We'll need to add a definition for our Alchemy `API_KEY` and the `CONTRACT_ADDRESS` where your smart contract was deployed.

Your `.env` file should look something like this:

```bash
# .env

API_URL = "https://eth-ropsten.alchemyapi.io/v2/<your-api-key>"
API_KEY = "<your-api-key>"
PRIVATE_KEY = "<your-metamask-private-key>"
CONTRACT_ADDRESS = "0x<your contract address>"
```

### Step 3: Grab your contract ABI {#step-3-grab-your-contract-ABI}

Our contract ABI (Application Binary Interface) is the interface to interact with our smart contract. You can learn more about Contract ABIs [here](../../guides/eth\_getlogs.md#what-are-ab-is). Hardhat (and Truffle) automatically generates an ABI for us and saves it in the HelloWorld.json file.  In order to use this we'll need to parse out the contents by adding the following lines of code to our `contract-interact.js` file:

```javascript
// interact.js

// For Truffle
const contract = require("./build/contracts/HelloWorld.json"); 

// For Hardhat 
const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");
```

If you want to see the ABI you can print it to your console:

```javascript
console.log(JSON.stringify(contract.abi));
```

To run `interact.js `and see your ABI printed to the console navigate to your terminal and run

**Hardhat:**

```bash
npx hardhat run scripts/interact.js
```

**Truffle:**

```bash
node interact.js
```

### Step 4: Create an instance of your contract {#step-4-create-an-instance-of-your-contract}

In order to interact with our contract we need to create an instance of it in our code. To do so with Ethers.js, we'll need to work with three concepts:

1. Provider - this is a node provider that gives you read and write access to the blockchain.
2. Signer - this represents an Ethereum account that has the ability to sign transactions.
3. Contract - this is an Ethers.js object that represents a specific contract deployed on-chain.

We'll use the contract ABI from the previous step to create our instance of the contract:

```javascript
// interact.js

// Provider
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);
```

You can read more about Providers, Signers, and Contracts in the [Ethers.js documentation](https://docs.ethers.io/v5/).

### Step 5: Read the init message {#step-5-read-the-init-message}

Remember when we deployed our contract with the`initMessage = "Hello world!"`? We are now going to read that message stored in our smart contract and print it to the console.

In JavaScript we use asynchronous functions to interact with networks. Check out this [article](https://blog.bitsrc.io/understanding-asynchronous-javascript-the-event-loop-74cd408419ff) to learn more about async functions.&#x20;

Use the code below to call the `message` function in our smart contract and read the init message:

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);
}
main();
```

After running the file using `npx hardhat run scripts/interact.js` in the terminal we should see this response:

```
The message is: Hello world! 
```

Congrats! You've just successfully read smart contract data from the Ethereum blockchain, way to go!&#x20;

### Step 6: Update the message {#step-6-update-the-message}

Now instead of just reading the message, we can also update the message saved in our smart contract using the `update` function! Pretty cool, right?

In order to do so we can directly call the `update` function on our instantiated Contract object, like so:&#x20;

```javascript
// interact.js

// ...

async function main() {
  const message = await helloWorldContract.message();
  console.log("The message is: " + message);
  
  console.log("Updating the message...");
  const tx = await helloWorldContract.update("This is the new message.");
  await tx.wait();
}
main();
```

Note that we make a call to `.wait()` on the returned transaction object. This ensures that our script waits for the transaction to be mined on the blockchain before proceeding onwards. If you were to leave this line out, your script may not be able to see the updated `message` value in your contract.

### Step 7: Read the new message {#step-7-read-the-new-message}

You should be able to repeat Step 5 to read the updated `message` value. Take a moment and see if you can make the changes necessary to print out that new value!

If you need a hint, here's what your `interact.js` file should look like at this point:

```javascript
// interact.js

const API_KEY = process.env.API_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const contract = require("../artifacts/contracts/HelloWorld.sol/HelloWorld.json");

// provider - Alchemy
const alchemyProvider = new ethers.providers.AlchemyProvider(network="ropsten", API_KEY);

// signer - you
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// contract instance
const helloWorldContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
    const message = await helloWorldContract.message();
    console.log("The message is: " + message); 

    console.log("Updating the message...");
    const tx = await helloWorldContract.update("this is the new message");
    await tx.wait();

    const newMessage = await helloWorldContract.message();
    console.log("The new message is: " + newMessage); 
}

main();
```

Now just run the script and you should be able to see the old message, the updating status, and the new message printed out to your terminal!

`npx hardhat run scripts/interact.js --network ropsten`

```
The message is: Hello World!
Updating the message...
The new message is: This is the new message.
```

While you are running that script, you may notice that the `Updating the message...` step takes a while to load before the new message is set. That is due to the mining process! If you are curious about how to track transactions while they are being mined, visit the [Alchemy mempool](https://dashboard.alchemyapi.io/mempool) to see the status of your transaction (whether it's pending, mined, or got dropped by the network). If your transaction got dropped, it's also helpful to check [Ropsten Etherscan](https://ropsten.etherscan.io) and search for your transaction hash.

And that's it! You've now deployed AND interacted with an Ethereum smart contract. If you'd like to publish your contract to Etherscan so that anyone will know how to interact with it, check out [part 3: submitting your smart contract to etherscan](https://docs.alchemy.com/alchemy/tutorials/hello-world-smart-contract/submitting-your-smart-contract-to-etherscan)! :tada:

Once you complete this tutorial, let us know how your experience was or if you have any feedback by tagging us on Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
