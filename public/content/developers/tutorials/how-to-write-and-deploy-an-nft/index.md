---
title: How to Write & Deploy an NFT (Part 1/3 of NFT Tutorial Series)
description: This tutorial is Part 1 of a series on NFTs that will take you step by step on how to write and deploy a Non Fungible Token (ERC-721 token) smart contract using Ethereum and Inter Planetary File System (IPFS).
author: "Sumi Mudgil"
tags: ["ERC-721", "Alchemy", "Solidity", "smart contracts"]
skill: beginner
breadcrumb: Write and deploy NFT
lang: en
published: 2021-04-22
---

With NFTs bringing blockchain into the public eye, now is an excellent opportunity to understand the hype yourself by publishing your own NFT contract (ERC-721 Token) on the Ethereum blockchain!

In this tutorial, we will walk through creating and deploying an ERC-721 smart contract on the Sepolia test network using [MetaMask](https://metamask.io/), [Solidity](https://docs.soliditylang.org/), [Hardhat](https://hardhat.org/), [Pinata](https://pinata.cloud/) and [Alchemy](https://alchemy.com/signup/eth) (don’t fret if you don’t understand what any of this means yet — we will explain it!).

In Part 2 of this tutorial we’ll go through how we can use our smart contract to mint an NFT, and in Part 3 we’ll explain how to view your NFT on MetaMask.

And of course, if you have questions at any point, don’t hesitate to reach out in the [Alchemy Discord](https://discord.gg/gWuC7zB) or visit [Alchemy's NFT API docs](https://www.alchemy.com/docs/reference/nft-api-quickstart)!

## Step 1: Connect to the Ethereum network {#connect-to-ethereum}

There are a bunch of ways to make requests to the Ethereum blockchain, but to make things easy, we’ll use a free account on [Alchemy](https://alchemy.com/signup/eth), a blockchain developer platform and API that allows us to communicate with the Ethereum chain without having to run our own nodes.

In this tutorial, we’ll also take advantage of Alchemy’s developer tools for monitoring and analytics to understand what’s going on under the hood in our smart contract deployment. If you don’t already have an Alchemy account, you can sign up for free [here](https://alchemy.com/signup/eth).

## Step 2: Create your app (and API key) {#make-api-key}

Once you’ve created an Alchemy account, you can generate an API key by creating an app. This will allow us to make requests to the Sepolia test network. Check out [this guide](https://www.alchemy.com/docs/choosing-a-web3-network) if you’re curious to learn more about test networks.

1. Navigate to the "Create new app" page in your Alchemy Dashboard by selecting "Select an app" in the nav bar and clicking "Create new app"

![Create your app](./alchemy-create-new-app.png)

2. Name your app (we chose “My First NFT!”), offer a short description, and choose a use case. Next, search for "Ethereum" and select the network. We’ll use Sepolia, the recommended testnet for application development (see [Ethereum networks](/developers/docs/networks/#ethereum-testnets)).

3. Click "Next" to proceed, then “Create app” and that’s it! Your app should appear in the nav bar dropdown menu, with an API Key available to copy.

## Step 3: Create an Ethereum account (address) {#create-eth-address}

We need an Ethereum account to send and receive transactions. For this tutorial, we’ll use MetaMask, a virtual wallet in the browser used to manage your Ethereum account address. If you want to understand more about how transactions on Ethereum work, check out [this page](/developers/docs/transactions/) from the Ethereum foundation.

You can download and create a MetaMask account for free [here](https://metamask.io/download). When you are creating an account, or if you already have an account, make sure to switch over to the "Sepolia" test network using the network selection menu (so that we’re not dealing with real money). If you do not see Sepolia listed, open the menu in the top right corner, select "Networks", and toggle "Show test networks" on (see [MetaMask's guide to viewing testnets](https://support.metamask.io/configure/networks/how-to-view-testnets-in-metamask/)).

![Set Sepolia as your network](./metamask-sepolia.png)

## Step 4: Add ether from a Faucet {#step-4-add-ether-from-a-faucet}

In order to deploy our smart contract to the test network, we’ll need some fake ETH. To get Sepolia ETH, pick one of the faucets listed in the [Sepolia network details](/developers/docs/networks/#sepolia) and enter your account address. If one doesn't work, try another as they can sometimes run dry, and some have eligibility rules: for example, the [Alchemy Sepolia faucet](https://www.alchemy.com/faucets/ethereum-sepolia) requires the receiving address to hold at least 0.001 ETH on Ethereum Mainnet. You should see ETH in your MetaMask account soon after!

## Step 5: Check your Balance {#check-balance}

To double check our balance is there, let’s make an [eth_getBalance](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-balance) request using [Alchemy’s sandbox tool](https://sandbox.alchemy.com/?network=ETH_SEPOLIA&method=eth_getBalance&body.id=1&body.jsonrpc=2.0&body.method=eth_getBalance&body.params%5B0%5D=&body.params%5B1%5D=latest). This will return the amount of ETH in our wallet. After you input your MetaMask account address and click “Send Request”, you should see a response like this:

```json
{ "jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000" }
```

> **Note** This result is in wei, not ETH. Wei is used as the smallest denomination of ether. The conversion from wei to ETH is 1 eth = 10<sup>18</sup> wei. So if we convert 0xde0b6b3a7640000 to decimal we get 1\*10<sup>18</sup> wei, which equals 1 ETH.

Phew! Our fake money is all there.

## Step 6: Initialize our project {#initialize-project}

First, we’ll need to create a folder for our project. Navigate to your command line and type:

```sh
mkdir my-nft
cd my-nft
```

Now that we’re inside our project folder, we’ll use npm init to initialize the project. If you don’t already have npm installed, follow [the Node.js installation instructions](https://nodejs.org/en/download/) (we’ll need Node.js and npm for this tutorial).

```sh
npm init
```

It doesn’t really matter how you answer the installation questions; here is how we did it for reference:

```console
package name: (my-nft)
version: (1.0.0)
description: My first NFT!
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to /Users/thesuperb1/Desktop/my-nft/package.json:

{
  "name": "my-nft",
  "version": "1.0.0",
  "description": "My first NFT!",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}
```

Approve the package.json. Hardhat 3, which we install next, only supports ES module projects, so mark the project as one:

```sh
npm pkg set type=module
```

And we’re good to go!

## Step 7: Install [Hardhat](https://hardhat.org/docs/getting-started) {#install-hardhat}

Hardhat is a development environment to compile, deploy, test, and debug your Ethereum software. It helps developers when building smart contracts and dapps locally before deploying to the live chain.

Hardhat 3 requires Node.js v22.13.0 or later. Inside our my-nft project run:

```sh
npm install --save-dev hardhat
```

Check out this page for more details on [installation instructions](https://hardhat.org/docs/getting-started).

## Step 8: Create Hardhat project {#create-hardhat-project}

Running `npx hardhat --init` would generate a complete sample project, but for this tutorial we’ll set things up by hand so you can see every piece. In the root of your project folder, create a file called `hardhat.config.js` with the following contents:

```js
import { defineConfig } from "hardhat/config"

export default defineConfig({
  solidity: "0.8.34",
})
```

This is where we’ll specify all of the set up for our project (on step 13). For now, it just tells Hardhat which version of the Solidity compiler to use.

## Step 9: Add project folders {#add-project-folders}

To keep our project organized, we’ll create two new folders. Navigate to the root directory of your project in your command line and type:

```sh
mkdir contracts
mkdir scripts
```

- contracts/ is where we’ll keep our NFT smart contract code

- scripts/ is where we’ll keep scripts to deploy and interact with our smart contract

## Step 10: Write our contract {#write-contract}

Now that our environment is set up, on to more exciting stuff: _writing our smart contract code!_

Open up the my-nft project in your favorite editor (we like [VSCode](https://code.visualstudio.com/)). Smart contracts are written in a language called Solidity which is what we will use to write our MyNFT.sol smart contract.‌

1. Navigate to the `contracts` folder and create a new file called MyNFT.sol

2. Below is our NFT smart contract code, which we based on the [OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/erc721) library’s ERC-721 implementation. Copy and paste the contents below into your MyNFT.sol file.

   ```solidity
   // Contract based on https://docs.openzeppelin.com/contracts/5.x/erc721
   // SPDX-License-Identifier: MIT
   pragma solidity ^0.8.24;

   import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
   import "@openzeppelin/contracts/access/Ownable.sol";
   import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

   contract MyNFT is ERC721URIStorage, Ownable {
       uint256 private _nextTokenId;

       constructor(address initialOwner)
           ERC721("MyNFT", "NFT")
           Ownable(initialOwner)
       {}

       function mintNFT(address recipient, string memory tokenURI)
           public onlyOwner
           returns (uint256)
       {
           uint256 newItemId = ++_nextTokenId;
           _mint(recipient, newItemId);
           _setTokenURI(newItemId, tokenURI);

           return newItemId;
       }
   }
   ```

3. Because we are inheriting classes from the OpenZeppelin contracts library, in your command line run `npm install @openzeppelin/contracts` to install the library into our folder. This tutorial uses OpenZeppelin Contracts 5.x, which requires Solidity 0.8.24 or later.

So, what does this code _do_ exactly? Let’s break it down, line-by-line.

At the top of our smart contract, we import three [OpenZeppelin](https://openzeppelin.com/) smart contract classes:

- @openzeppelin/contracts/token/ERC721/ERC721.sol contains the implementation of the ERC-721 standard, which our NFT smart contract will inherit. (To be a valid NFT, your smart contract must implement all the methods of the ERC-721 standard.) To learn more about the inherited ERC-721 functions, check out the interface definition [here](https://eips.ethereum.org/EIPS/eip-721).

- @openzeppelin/contracts/access/Ownable.sol sets up [access control](https://docs.openzeppelin.com/contracts/5.x/access-control) on our smart contract, so only the owner of the smart contract (you) can mint NFTs. The owner is the `initialOwner` address passed to the constructor. (Note, including access control is entirely a preference. If you'd like anyone to be able to mint an NFT using your smart contract, remove `Ownable` and `Ownable(initialOwner)` from the contract definition and constructor, and `onlyOwner` from the `mintNFT` function.)

- @openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol extends ERC-721 so that each token can store its own metadata URI, which we set when minting.

After our import statements, we have our custom NFT smart contract, which is surprisingly short — it only contains a counter, a constructor, and single function! This is thanks to our inherited OpenZeppelin contracts, which implement most of the methods we need to create an NFT, such as `ownerOf` which returns the owner of the NFT, and `transferFrom`, which transfers ownership of the NFT from one account to another.

The counter, `_nextTokenId`, keeps track of the total number of NFTs minted and sets the unique ID on our new NFT. (Each NFT minted using a smart contract must be assigned a unique ID—here our unique ID is just determined by the total number of NFTs in existence. `++_nextTokenId` increases the counter before it is used, so the first NFT we mint with our smart contract has an ID of "1," our second NFT has an ID of "2," etc.)

In our ERC-721 constructor, you’ll notice we pass 2 strings, “MyNFT” and “NFT.” The first variable is the smart contract’s name, and the second is its symbol. You can name each of these variables whatever you wish!

Finally, we have our function `mintNFT(address recipient, string memory tokenURI)` that allows us to mint an NFT! You'll notice this function takes in two variables:

- `address recipient` specifies the address that will receive your freshly minted NFT

- `string memory tokenURI` is a string that should resolve to a JSON document that describes the NFT's metadata. An NFT's metadata is really what brings it to life, allowing it to have configurable properties, such as a name, description, image, and other attributes. In part 2 of this tutorial, we will describe how to configure this metadata.

`mintNFT` calls some methods from the inherited ERC-721 library, and ultimately returns a number that represents the ID of the freshly minted NFT.

## Step 11: Connect MetaMask & Alchemy to your project {#connect-metamask-and-alchemy}

Now that we’ve created a MetaMask wallet, Alchemy account, and written our smart contract, it’s time to connect the three.

Every transaction sent from your virtual wallet requires a signature using your unique private key. To provide our program with this permission, we can safely store our private key (and Alchemy API key) in an environment file.

To learn more about sending transactions, check out the [transactions documentation](/developers/docs/transactions/).

Create a `.env` file in the root directory of our project, and add your MetaMask private key and HTTP Alchemy API URL to it.

- Follow [these instructions](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/) to export your private key from MetaMask

- See below to get HTTP Alchemy API URL and copy it to your clipboard

![Copy your Alchemy API URL](./copy-alchemy-api-url.mp4#842x480)

Your `.env` should now look like this:

```text
API_URL="https://eth-sepolia.g.alchemy.com/v2/your-api-key"
PRIVATE_KEY="your-metamask-private-key"
```

To actually connect these to our code, we’ll reference these variables in our hardhat.config.js file in step 13. Node.js can read `.env` files on its own, so there's no extra package to install.

<EnvWarningBanner />

## Step 12: Install Ethers.js {#install-ethers}

Ethers.js is a library that makes it easier to interact and make requests to Ethereum by wrapping [standard JSON-RPC methods](/developers/docs/apis/json-rpc/) with more user friendly methods.

Hardhat makes it super easy to integrate [Plugins](https://hardhat.org/docs/plugins/official-plugins) for additional tooling and extended functionality. We’ll be taking advantage of the [Ethers plugin](https://hardhat.org/docs/plugins/hardhat-ethers) for contract deployment ([Ethers.js](https://docs.ethers.org/v6/) has some super clean contract deployment methods).

In your project directory type:

```sh
npm install --save-dev @nomicfoundation/hardhat-ethers ethers
```

We’ll also add the plugin to our hardhat.config.js in the next step.

## Step 13: Update hardhat.config.js {#update-hardhat-config}

We’ve added several dependencies and plugins so far, now we need to update hardhat.config.js so that our project knows about all of them.

Update your hardhat.config.js to look like this:

```js
import { existsSync } from "node:fs"
import hardhatEthers from "@nomicfoundation/hardhat-ethers"
import { configVariable, defineConfig } from "hardhat/config"

// Load API_URL and PRIVATE_KEY from the .env file into process.env, if it exists
if (existsSync(".env")) process.loadEnvFile()

export default defineConfig({
  plugins: [hardhatEthers],
  solidity: "0.8.34",
  networks: {
    sepolia: {
      type: "http",
      url: configVariable("API_URL"),
      accounts: [configVariable("PRIVATE_KEY")],
    },
  },
})
```

`configVariable` tells Hardhat to read each value from an environment variable only when it's needed, so commands like `compile` work even before the values are set. If you'd rather not keep your private key in a plain text file, Hardhat can also read [configuration variables from an encrypted keystore](https://hardhat.org/docs/guides/configuration-variables).

## Step 14: Compile our contract {#compile-contract}

To make sure everything is working so far, let’s compile our contract. The compile task is one of the built-in hardhat tasks.

From the command line run:

```sh
npx hardhat compile
```

The first time you compile, Hardhat downloads the Solidity compiler. You should then see something like `Compiled 1 Solidity file with solc 0.8.34`. If not, you can always message in the [Alchemy Discord](https://discord.gg/gWuC7zB).

## Step 15: Write our deploy script {#write-deploy}

Now that our contract is written and our configuration file is good to go, it’s time to write our contract deploy script.

Navigate to the `scripts/` folder and create a new file called `deploy.js`, adding the following contents to it:

```js
import { network } from "hardhat"

const { ethers } = await network.create()

const [deployer] = await ethers.getSigners()
const MyNFT = await ethers.getContractFactory("MyNFT")

// Start deployment, returning a promise that resolves to a contract object
const myNFT = await MyNFT.deploy(deployer.address)
await myNFT.waitForDeployment()
console.log("Contract deployed to address:", await myNFT.getAddress())
```

Let’s go through what each of these lines of code does.

```js
const { ethers } = await network.create()
```

In Hardhat 3, a script opens a connection to a network explicitly. `network.create()` connects to the network you choose with the `--network` option when you run the script, and the `hardhat-ethers` plugin adds an `ethers` object to that connection.

```js
const [deployer] = await ethers.getSigners()
```

`getSigners()` returns the accounts configured for the network. On Sepolia, that is the account whose private key you put in `.env`. We pass its address to the constructor so that you become the owner of the contract.

```js
const MyNFT = await ethers.getContractFactory("MyNFT")
```

A ContractFactory in ethers.js is an abstraction used to deploy new smart contracts, so MyNFT here is a factory for instances of our NFT contract. When using the hardhat-ethers plugin ContractFactory and Contract instances are connected to the first signer by default.

```js
const myNFT = await MyNFT.deploy(deployer.address)
```

Calling deploy() on a ContractFactory will start the deployment, and return a Promise that resolves to a Contract. This is the object that has a method for each of our smart contract functions. The arguments you pass to deploy() go to the contract's constructor, here the `initialOwner` address.

`waitForDeployment()` waits until the deployment transaction is included in a block, and `getAddress()` returns the address of the new contract. See the [ethers.js contract documentation](https://docs.ethers.org/v6/api/contract/) for more details.

## Step 16: Deploy our contract {#deploy-contract}

We’re finally ready to deploy our smart contract! Navigate back to the root of your project directory, and in the command line run:

```sh
npx hardhat run scripts/deploy.js --network sepolia
```

You should then see something like:

```text
Contract deployed to address: 0x4C5266cCc4b3F426965d2f51b6D910325a0E7650
```

If we go to the [Sepolia etherscan](https://sepolia.etherscan.io/) and search for our contract address we should be able to see that it has been deployed successfully. If you can't see it immediately, please wait a while as it can take some time. The transaction will look something like this:

![View your transaction address on Etherscan](./etherscan-sepoila-contract-creation.png)

The From address should match your MetaMask account address and the To address will say “Contract Creation”. If we click into the transaction, we’ll see our contract address in the To field:

![View your contract address on Etherscan](./etherscan-sepolia-tx-details.png)

Yasssss! You just deployed your NFT smart contract to the Ethereum (testnet) chain!

To understand what’s going on under the hood, you can look at the requests your app received in your [Alchemy dashboard](https://dashboard.alchemy.com/).

There you’ll see a handful of JSON-RPC calls that Hardhat/Ethers made under the hood for us when we called the .deploy() function. Two important ones to call out here are [eth_sendRawTransaction](/developers/docs/apis/json-rpc/#eth-sendrawtransaction), which is the request to actually write our smart contract onto the Sepolia chain, and [eth_getTransactionByHash](/developers/docs/apis/json-rpc/#eth-gettransactionbyhash) which is a request to read information about our transaction given the hash (a typical pattern when sending transactions). To learn more about sending transactions, check out the [transactions documentation](/developers/docs/transactions/).

That’s all for Part 1 of this tutorial. In [Part 2, we’ll actually interact with our smart contract by minting an NFT](/developers/tutorials/how-to-mint-an-nft/), and in [Part 3 we’ll show you how to view your NFT in your Ethereum wallet](/developers/tutorials/how-to-view-nft-in-metamask/)!
