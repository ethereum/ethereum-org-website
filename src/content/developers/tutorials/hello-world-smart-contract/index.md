---
title: Hello World Smart Contract for Beginners (Part 1/4 of Hello World dApp Series)
description: Introductory tutorial on writing and deploying a simple smart contract on Ethereum.
author: "elanh"
tags:
  [
    "solidity",
    "hardhat",
    "alchemy",
    "smart contracts",
    "getting started",
    "deploying",
  ]
skill: beginner
lang: en
sidebar: true
published: 2021-10-25
---



If you are new to blockchain development and don’t know where to start, or just want to understand how to deploy and interact with smart contracts, this guide is for you. We will walk through creating and deploying a simple, smart contract on the Ropsten test network using a virtual wallet ([Metamask](https://metamask.io)), [Solidity](https://docs.soliditylang.org/en/v0.8.0/), [Hardhat](https://hardhat.org) and [Truffle](https://www.trufflesuite.com), and [Alchemy](https://alchemyapi.io/eth) (don’t worry if you don’t understand what any of this means yet, we will explain it!).


If you're more into video learning, click on the thumbnail below for a step-by-step walkthrough! 👇

[![](https://img.youtube.com/vi/g73EGNKatDw/maxresdefault.jpg)](https://www.youtube.com/watch?v=g73EGNKatDw)

And if you haven't already, you'll definitely need an Alchemy account to complete this tutorial. [Sign up for a free account](https://www.alchemy.com/).

If you have questions at any point, feel free to reach out in the [Alchemy Discord](https://discord.gg/gWuC7zB)!

### Hardhat vs Truffle

There are two versions of this tutorial: one using **Hardhat** and one using **Truffle**. They are both development environments for building on Ethereum and have similar functionality, so it's totally up to you to decide which you want to use. Hardhat is the newer kid on the block and tends to be a bit cleaner to use, and they also have lots of plugins to make it more customizable.

## Create and Deploy your Smart Contract using Hardhat {#hardhat}

### Step 1: Connect to the Ethereum network {#step-1-connect-to-the-ethereum-network}

There are many ways to make requests to the Ethereum chain. For simplicity, we’ll use a free account on Alchemy, a blockchain developer platform and API that allows us to communicate with the Ethereum chain without running a node ourselves. The platform also has developer tools for monitoring and analytics that we’ll take advantage of in this tutorial to understand what’s going on under the hood in our smart contract deployment. If you don’t already have an Alchemy account, [you can sign up for free here](https://www.alchemy.com/).

### Step 2: Create your app and API key {#step-2-create-your-app-and-api-key}

Once you’ve created an Alchemy account, you can generate an API key by creating an app. This will allow us to make requests to the Ropsten test network. If you’re not familiar with testnets, check out [this guide](https://docs.alchemyapi.io/guides/choosing-a-network).

Navigate to the “Create App” page in your Alchemy Dashboard by hovering over “Apps” in the nav bar and clicking “Create App”

![Hello world create app](./hello-world-create-app.png)

Name your app “Hello World”, offer a short description, select “Staging” for the Environment (used for your app bookkeeping), and choose “Ropsten” for your network.

![](./create-app-view-hello-world.png)

Double check that you're selecting the Roptsen testnet!

Click “Create app” and that’s it! Your app should appear in the table below.

### Step 3: Create an Ethereum account {#step-3-create-an-ethereum-account}

We need an Ethereum account to send and receive transactions. For this tutorial, we’ll use Metamask, a virtual wallet in the browser used to manage your Ethereum account address. If you want to understand more about how transactions on Ethereum work, check out [this page](https://ethereum.org/en/developers/docs/transactions/) from the Ethereum foundation.

You can download and create a Metamask account for free [here](https://metamask.io/download.html). When you are creating an account, or if you already have an account, make sure to switch over to the “Ropsten Test Network” in the upper right (so that we’re not dealing with real money).

![](./metamask-ropsten-example.png)

### Step 4: Add ether from a Faucet {#step-4-add-ether-from-a-faucet}

In order to deploy our smart contract to the test network, we’ll need some fake Eth. To get Eth you can go to the [Ropsten faucet ](https://faucet.dimensions.network)and enter your Ropsten account address, then click “Send Ropsten Eth.” It may take some time to receive your fake Eth due to network traffic. (At the time of writing this, it took around 30 minutes.) You should see Eth in your Metamask account soon after!

### Step 5: Check your Balance {#step-5-check-your-balance}

To double check our balance is there, let’s make an [eth\_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_getbalance) request using [Alchemy’s composer tool](https://composer.alchemyapi.io/?composer\_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth\_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). This will return the amount of Eth in our wallet. Check out [this video](https://youtu.be/r6sjRxBZJuU) for instructions on how to use the composer tool!

After you input your Metamask account address and click “Send Request”, you should see a response that looks like this:

```
{"jsonrpc": "2.0", "id": 0, "result": "0x2B5E3AF16B1880000"}
```

**NOTE:** This result is in wei not eth. Wei is used as the smallest denomination of ether. The conversion from wei to eth is: 1 eth = 10^18 wei. So if we convert 0x2B5E3AF16B1880000 to decimal we get 5\*10^18 which equals 5 eth.

Phew! Our fake money is all there🤑 .

### Step 6: Initialize our project {#step-6-initialize-our-project}

First, we’ll need to create a folder for our project. Navigate to your [command line](https://www.computerhope.com/jargon/c/commandi.htm) and type:

```
mkdir hello-world
cd hello-world
```

Now that we’re inside our project folder, we’ll use `npm init` to initialize the project. If you don’t already have npm installed, follow [these instructions](https://docs.alchemyapi.io/alchemy/guides/alchemy-for-macs#1-install-nodejs-and-npm) (we’ll also need Node.js so download that too!).

```bash
npm init # (or npm init --yes)
```

It doesn’t really matter how you answer the installation questions, here is how we did it for reference:

```
package name: (hello-world)
version: (1.0.0)
description: hello world smart contract
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)

About to write to /Users/.../.../.../hello-world/package.json:

{   
   "name": "hello-world",
   "version": "1.0.0",
   "description": "hello world smart contract",
   "main": "index.js",
   "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
   },
   "author": "",
   "license": "ISC"
}
```

Approve the package.json and we’re good to go!

### Step 7: Download Hardhat {#step-7-download-hardhat}

Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers when building smart contracts and dApps locally before deploying to the live chain.

Inside our `hello-world` project run:

```
npm install --save-dev hardhat
```

Check out this page for more details on [installation instructions](https://hardhat.org/getting-started/#overview).

### Step 8: Create Hardhat project {#step-8-create-hardhat-project}

Inside our `hello-world` project folder, run:

```
npx hardhat
```

You should then see a welcome message and option to select what you want to do. Select “create an empty hardhat.config.js”:

```
888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888

👷 Welcome to Hardhat v2.0.11 👷‍

What do you want to do? …
Create a sample project
❯ Create an empty hardhat.config.js
Quit
```

This will generate a `hardhat.config.js` file for us, which is where we’ll specify all of the set up for our project (on step 13).

### Step 9: Add project folders {#step-9-add-project-folders}

To keep our project organized we’ll create two new folders. Navigate to the root directory of your `hello-world` project in your command line and type:

```
mkdir contracts
mkdir scripts
```

* `contracts/` is where we’ll keep our hello world smart contract code file
* `scripts/` is where we’ll keep scripts to deploy and interact with our contract

### Step 10: Write our contract {#step-10-write-our-contract}

You might be asking yourself, when the heck are we going to write code?? Well, here we are, on Step 10 😄

Open up the hello-world project in your favorite editor (we like [VSCode](https://code.visualstudio.com)). Smart contracts are written in a language called Solidity which is what we will use to write our HelloWorld.sol smart contract.‌

1. Navigate to the “contracts” folder and create a new file called `HelloWorld.sol`
2. Below is a sample Hello World smart contract from the [Ethereum Foundation](https://ethereum.org/en/) that we will be using for this tutorial. Copy and paste in the contents below into your `HelloWorld.sol file`, and be sure to read the comments to understand what this contract does:

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.7.3;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state). Once deployed, a contract resides at a specific address on the Ethereum blockchain. Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

   //Emitted when update function is called
   //Smart contract events are a way for your contract to communicate that something happened on the blockchain to your app front-end, which can be 'listening' for certain events and take action when they happen.
   event UpdatedMessages(string oldStr, string newStr);

   // Declares a state variable `message` of type `string`.
   // State variables are variables whose values are permanently stored in contract storage. The keyword `public` makes variables accessible from outside a contract and creates a function that other contracts or clients can call to access the value.
   string public message;

   // Similar to many class-based object-oriented languages, a constructor is a special function that is only executed upon contract creation.
   // Constructors are used to initialize the contract's data. Learn more:https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
   constructor(string memory initMessage) {

      // Accepts a string argument `initMessage` and sets the value into the contract's `message` storage variable).
      message = initMessage;
   }

   // A public function that accepts a string argument and updates the `message` storage variable.
   function update(string memory newMessage) public {
      string memory oldMsg = message;
      message = newMessage;
      emit UpdatedMessages(oldMsg, newMessage);
   }
}
```

This is a super simple smart contract that stores a message upon creation and can be updated by calling the `update` function.

### Step 11: Connect Metamask & Alchemy to your project {#step-11-connect-metamask-&-alchemy-to-your-project}

We’ve created a Metamask wallet, Alchemy account, and written our smart contract, now it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

> To learn more about sending transactions, check out [this tutorial](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) on sending transactions using web3.

First, install the dotenv package in your project directory:

```
npm install dotenv --save
```

Then, create a `.env` file in the root directory of our project, and add your Metamask private key and HTTP Alchemy API URL to it.

Your environment file must be named `.env` or it won't be recognized as an environment file.

Do not name it `process.env` or `.env-custom` or anything else.

* Follow [these instructions](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key) to export your private key
* See below to get HTTP Alchemy API URL

![](./get-alchemy-api-key.gif)

Your `.env` should look like this:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
PRIVATE_KEY = "your-metamask-private-key"
```

To actually connect these to our code, we’ll reference these variables in our `hardhat.config.js` file on step 13.

### Step 12: Install Ethers.js {#step-12-install-ethers.js}

Ethers.js is a library that makes it easier to interact and make requests to Ethereum by wrapping [standard JSON-RPC methods](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc) with more user friendly methods.

Hardhat makes it super easy to integrate [Plugins](https://hardhat.org/plugins/) for additional tooling and extended functionality. We’ll be taking advantage of the [Ethers plugin](https://hardhat.org/plugins/nomiclabs-hardhat-ethers.html) for contract deployment ([Ethers.js](https://github.com/ethers-io/ethers.js/) has some super clean contract deployment methods).

In your project directory type:

```bash
npm install --save-dev @nomiclabs/hardhat-ethers "ethers@^5.0.0"
```

We’ll also require ethers in our `hardhat.config.js` in the next step.

### Step 13: Update hardhat.config.js {#step-13-update-hardhat.config.js}

We’ve added several dependencies and plugins so far, now we need to update `hardhat.config.js` so that our project knows about all of them.

Update your `hardhat.config.js` to look like this:

```javascript
/**
* @type import('hardhat/config').HardhatUserConfig
*/

require('dotenv').config();
require("@nomiclabs/hardhat-ethers");

const { API_URL, PRIVATE_KEY } = process.env;

module.exports = {
   solidity: "0.7.3",
   defaultNetwork: "ropsten",
   networks: {
      hardhat: {},
      ropsten: {
         url: API_URL,
         accounts: [`0x${PRIVATE_KEY}`]
      }
   },
}
```

### Step 14: Compile our contract {#step-14-compile-our-contract}

To make sure everything is working so far, let’s compile our contract. The `compile` task is one of the built-in hardhat tasks.

From the command line run:

```bash
npx hardhat compile
```

You might get a warning about `SPDX license identifier not provided in source file` , but no need to worry about that — hopefully everything else looks good! If not, you can always message in the [Alchemy discord](https://discord.gg/u72VCg3).

### Step 15: Write our deploy script {#step-15-write-our-deploy-script}

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

Navigate to the `scripts/` folder and create a new file called `deploy.js` , adding the following contents to it:

```javascript
async function main() {
   const HelloWorld = await ethers.getContractFactory("HelloWorld");

   // Start deployment, returning a promise that resolves to a contract object
   const hello_world = await HelloWorld.deploy("Hello World!");   
   console.log("Contract deployed to address:", hello_world.address);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
```

Hardhat does an amazing job of explaining what each of these lines of code does in their [Contracts tutorial](https://hardhat.org/tutorial/testing-contracts.html#writing-tests), we’ve adopted their explanations here.

```javascript
const HelloWorld = await ethers.getContractFactory("HelloWorld");
```

A `ContractFactory` in ethers.js is an abstraction used to deploy new smart contracts, so `HelloWorld` here is a [factory](https://en.wikipedia.org/wiki/Factory\_\(object-oriented\_programming\)) for instances of our hello world contract. When using the `hardhat-ethers` plugin `ContractFactory` and `Contract`, instances are connected to the first signer (owner) by default.

```javascript
const hello_world = await HelloWorld.deploy();
```

Calling `deploy()` on a `ContractFactory` will start the deployment, and return a `Promise` that resolves to a `Contract` object. This is the object that has a method for each of our smart contract functions.

### Step 16: Deploy our contract

We’re finally ready to deploy our smart contract! Navigate to the command line and run:

```bash
npx hardhat run scripts/deploy.js --network ropsten
```

You should then see something like:

```bash
Contract deployed to address: 0x6cd7d44516a20882cEa2DE9f205bF401c0d23570
```

**Please copy and paste this address to save it somewhere**, as we will be using this address for later tutorials, so you don't want to lose it.

If we go to the [Ropsten etherscan](https://ropsten.etherscan.io) and search for our contract address we should able to see that it has been deployed successfully. The transaction will look something like this:

![](./etherscan-contract.png)

The `From` address should match your Metamask account address and the To address will say “Contract Creation” but if we click into the transaction we’ll see our contract address in the `To` field:

![](./etherscan-transaction.png)

Congrats! You just deployed a smart contract to the Ethereum chain 🎉

To understand what’s going on under the hood, let’s navigate to the Explorer tab in our [Alchemy dashboard ](https://dashboard.alchemyapi.io/explorer). If you have multiple Alchemy apps make sure to filter by app and select “Hello World”.

![](./hello-world-explorer.png)

Here you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the `.deploy()` function. Two important ones to call out here are [`eth_sendRawTransaction`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_sendrawtransaction), which is the request to actually write our contract onto the Ropsten chain, and [`eth_getTransactionByHash`](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth\_gettransactionbyhash) which is a request to read information about our transaction given the hash (a typical pattern when sending transactions). To learn more about sending transactions, check out this tutorial on [sending transactions using Web3](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy).

That’s all for part 1 of this tutorial, in part 2 we’ll actually [interact with our smart contract](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) by updated our initial message, and in part 3 we’ll [publish our smart contract to Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan) so everyone will know how to interact with it.

## Create and Deploy your Smart Contract using Truffle

If you've already completed steps 1-5 above, **you do not** need to go through these steps. Hardhat and Truffle are alternative development environment tools. You only need to use one or the other.

### Complete steps [1-5 above](./#step-1-connect-to-the-ethereum-network).

### Step 6: Download Truffle

[Truffle](https://www.trufflesuite.com/docs/truffle/overview) is a development environment, testing network, and asset pipeline for Ethereum that we will use to build, compile, and deploy our smart contract. To [download Truffle](https://www.trufflesuite.com/docs/truffle/getting-started/installation) globally, you can install [NodeJS](https://nodejs.org/en/download/) and paste the following command in your terminal:

```
npm install -g truffle
```

### Step 7: Create a Truffle Project

Next we have to create a [Truffle project](https://www.trufflesuite.com/docs/truffle/getting-started/creating-a-project) to store our files.

1. Create a new directory for your Truffle project:

```
mkdir hello-world
cd hello-world
```

1. Get boilerplate files for creating and deploying smart contracts by typing this in the command line:

```
truffle init
```

Once this operation is completed, you'll now have a project structure with the following items:

* **`contracts/`**: Directory for [Solidity contracts](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts)
  * This will contain a few example contracts from truffle, feel free to explore or ignore these
* **`migrations/`**: Directory for [scriptable deployment files](https://www.trufflesuite.com/docs/truffle/getting-started/running-migrations#migration-files)
* **`test/`**: Directory for test files for [testing your application and contracts](https://www.trufflesuite.com/docs/truffle/testing/testing-your-contracts)
  * Testing your contract is super important before you deploy to the mainnet, however, for the purposes of this guide we will not be writing tests
* **`truffle-config.js`**: Truffle [configuration file](https://www.trufflesuite.com/docs/truffle/reference/configuration)

### Step 8: Install HDWalletProvider <a href="step-7-install-hd-wallet-provider" id="step-7-install-hd-wallet-provider"></a>

[Truffle HDWallet provider](https://github.com/trufflesuite/truffle-hdwallet-provider) is an easy way to configure network connection to ethereum through a provider like Alchemy. You can install it using the following command:

```
npm install @truffle/hdwallet-provider
```

### Step 9: Write our Contract

Open up the hello-world project in your favorite editor (we like [VSCode](https://code.visualstudio.com)). Smart contracts are written in a language called Solidity which is what we will use to write our HelloWorld.sol smart contract.

1. Navigate to the “contracts” folder and create a new file called HelloWorld.sol
2. Below is a sample Hello World smart contract from the [Ethereum Foundation](https://ethereum.org/en/) that we will be using for this tutorial. Copy and paste in the contents below into your HelloWorld.sol file, and be sure to read the comments to understand what this contract does:

```
// Specifies the version of Solidity, using semantic versioning.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity >=0.5.2;

// Defines a contract named `HelloWorld`.
// A contract is a collection of functions and data (its state).
// Once deployed, a contract resides at a specific address on the Ethereum blockchain.
// Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Declares a state variable `message` of type `string`.
    // State variables are variables whose values are permanently stored in contract storage.
    // The keyword `public` makes variables accessible from outside a contract
    // and creates a function that other contracts or clients can call to access the value.
    string public message;

    // Similar to many class-based object-oriented languages, a constructor is
    // a special function that is only executed upon contract creation.
    // Constructors are used to initialize the contract's data.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Accepts a string argument `initMessage` and sets the value
        // into the contract's `message` storage variable).
        message = initMessage;
    }

    // A public function that accepts a string argument
    // and updates the `message` storage variable.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

This smart contract is very simple, it stores a message that is passed in when the contract is initialized and can be updated by calling the `update` function.

### Step 10: Connect Metamask & Alchemy to your project

We’ve created a Metamask wallet, Alchemy account, and written our smart contract, now it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key, or mnemonic in this case, (and Alchemy API key) in an environment file.

Truffle's HDWalletProvider actually requires your mnemonic to send transactions rather than your private key. Your mnemonic is the seed phrase Metamask made you write down when you first created your account. If you've forgetten it, don't worry, you can follow these instructions to reveal it again.

Providing your mnemonic rather than private key grants your project with permission to send transactions using your wallet accross _any network_ we instruct it to_,_ not just the Ropsten testnet that we're using for this tutorial. This doesn't mean we'll see a bunch of unauthorized transactions on mainnet, but we won't have to provide our mainnet private key if we wanted to send transactions over mainnet.

> To learn more about sending transactions, check out [this tutorial](https://docs.alchemyapi.io/alchemy/tutorials/sending-transactions-using-web3-and-alchemy) on sending transactions using web3.

**NOTE:** We'll be using dotenv to safely store our mnemonic and API key. This separates your private keys from source code and ensures no secret information will be included if you wish to share your code publicly.

First, install the dotenv package in your project directory:

```
npm install dotenv --save
```

Then, create a `.env` file in the root directory of our project, and add your Metamask mnemonic and HTTP Alchemy API URL to it.

* Follow [these instructions ](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-Reveal-Your-Seed-Phrase)to export your mnemonic (seed phrase)
* See the GIF on [step 11 above](./#step-11-connect-metamask-and-alchemy-to-your-project) to get HTTP Alchemy API URL

Your `.env` should look like this:

```
API_URL = "https://eth-ropsten.alchemyapi.io/v2/your-api-key"
MNEMONIC = "your-metamask-seed-phrase"
```

### Step 11: Configure our Project

The next step is to edit your **`truffle-config.js`** file to use **`HDWalletProvider`** and provide all the necessary configuration for deploying to ropsten.

Truffle provides some comments in your file that explains how your config file works and how to do basic operations. Feel free to keep or delete them, we'll be starting from scratch here.

Copy and paste the contents below into your **`truffle-config.js`** file:

```javascript
require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const { API_URL, MNEMONIC } = process.env;

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(MNEMONIC, API_URL)
      },
      network_id: 3,
      gas: 4000000 //4M is the max
    }
  }
};
```

### Step 12: Compile our Smart Contract

To compile a Truffle project, navigate to the root of the directory where the project is located and then type the following command:

```
truffle compile
```

You should see a response like:

```
Compiling your contracts...
===========================
> Compiling ./contracts/HelloWorld.sol
> Compiling ./contracts/Migrations.sol
> Artifacts written to /Users/elanhalpern/Desktop/Alchemy/hello-world-truffle/build/contracts
> Compiled successfully using:
   - solc: 0.5.16+commit.9c3226ce.Emscripten.clang
```

You should now see a build/contracts/ directory in your project. These artifacts are integral to the inner workings of Truffle, and are important for deploying your smart contract. This includes your contract's [ABI](https://docs.alchemyapi.io/guides/eth\_getlogs#what-are-ab-is), which is something you will encounter down the line. **You should not edit these files.**

### Step 12: Write our deploy script

Navigate to your `migrations/` folder and create a new file specifically called: `2_deploy_contracts.js`

Since our smart contract has a constructor that takes in a parameter, we have to include the parameter in our `deploy()` function.

Add the contents below to your `2_deploy_contracts.js` file:

```
const HelloWorld = artifacts.require("HelloWorld");
const initMessage = "Hello world!";

module.exports = function(deployer) {
  deployer.deploy(HelloWorld, initMessage);
};
```

### Step 13: Deploy our Smart Contract

In order to deploy our smart contract to the Ethereum network, we will use truffle's migrations which are JavaScript files that help you deploy contracts to the Ethereum network.

To run your migrations, run the following command in your terminal:

```
truffle migrate --network ropsten
```

You should then see a response that looks similar to the following:

```
Starting migrations...
======================
> Network name:    'ropsten'
> Network id:      3
> Block gas limit: 8000000 (0x7a1200)

1_initial_migration.js
======================

   Deploying 'Migrations'
   ----------------------
   > transaction hash:    0x61a6c81aaf5be5329c8572ac8de8f9d27064d75f5184f2389f66212b91c9736e
   > Blocks: 1            Seconds: 12
   > contract address:    0x341662A4BD97bf8542bB0d815F99aff47dB2Fc42
   > block number:        8903909
   > block timestamp:     1603052580
   > account:             0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63
   > balance:             4.98766424
   > gas used:            168286 (0x2915e)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00336572 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:          0.00336572 ETH

2_deploy_contracts.js
=====================

   Deploying 'HelloWorld'
   ----------------------
   > transaction hash:    0x1312f26f70bd444a25790215c56aa4d87a56bc40d141f216df0661ddc3df42bb
   > Blocks: 2            Seconds: 32
   > contract address:    0x70c86b8d660eBd0adef24E9ACcb389BFb6611B2b
   > block number:        8903912
   > block timestamp:     1603052602
   > account:             0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63
   > balance:             4.98206016
   > gas used:            237925 (0x3a165)
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.0047585 ETH


   > Saving migration to chain.
   > Saving artifacts
   -------------------------------------
   > Total cost:           0.0047585 ETH

Summary
=======
> Total deployments:   2
> Final cost:          0.00812422 ETH
```

Once this is finished without errors you will have deployed the contract, check it out on [https://ropsten.etherscan.io/](https://ropsten.etherscan.io) by searching for your `transaction hash` or `contract address`!! 🎉

To understand what's going on under the hood using your Alchemy dashboard, check out [Step 16](./#step-16-deploy-our-contract) above! You might notice a difference in the number of transactions sent than using Hardhat, this is because Truffle has a different contract deploy function than the one we wrote using hardhat.

That’s all for part 1 of this tutorial, in part 2 we’ll actually [interact with our smart contract](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#part-2-interact-with-your-smart-contract) by updated our initial message, and in part 3 we’ll [publish our smart contract to Etherscan](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#optional-part-3-publish-your-smart-contract-to-etherscan) so everyone will know how to interact with it.

Once you complete this tutorial, let us know how your experience was or if you have any feedback by tagging us on Twitter [@alchemyplatform](https://twitter.com/AlchemyPlatform)!
