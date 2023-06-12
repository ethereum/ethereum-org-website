---
title: Academic certificates with Truffle
description: Ethereum smart contract tutorial. Learn how to develop and deploy a contract that issues academic certificates. Built using Truffle suite.
author: Ake Gaviar
lang: en
tags: ["chainstack", "truffle", "solidity"]
skill: intermediate
published: 2023-01-31
source: Chainstack
sourceUrl: https://docs.chainstack.com/docs/ethereum-tutorial-academic-certificates-with-truffle
---

In this tutorial, you will:

- Create a DApp that generates an academic certificate.
- Deploy the DApp on a public Ethereum node using Chainstack.

The contract and the Truffle configuration are in the [GitHub repository](https://github.com/chainstack/ethereum-certificates-tutorial).

## Prerequisites

- [Chainstack account](https://console.chainstack.com/user/login) to deploy an Ethereum node
- [Truffle Suite](https://trufflesuite.com/docs/truffle/how-to/install/) to create and deploy contracts

## Overview

To get from zero to a deployed DApp on the Ethereum Goerli testnet, do the following:

1. With Chainstack, create a <<glossary:public chain project>>.
2. With Chainstack, join the Ethereum Goerli testnet.
3. With Chainstack, access your Ethereum node credentials.
4. With Truffle, create and compile the DApp contract.
5. With Truffle, deploy the contract to your local development network.
6. With Truffle, interact with the contract on your local development network.
7. With Truffle, create and run the contract test.
8. With Truffle, deploy the contract to your Ethereum node running with Chainstack.

## Step-by-step

### Create a public chain project

See [Create a project](doc:manage-your-project#create-a-project).

### Join the Ethereum Goerli testnet

See [Join a public network](doc:manage-your-networks#join-a-public-network).

### Get your Ethereum node access and credentials

See [View node access and credentials](doc:manage-your-node#view-node-access-and-credentials).

### Get Goerli testnet ether from a faucet

In your MetaMask, fund each account with Goerli ether; [Chainstack's faucet](https://faucet.chainstack.com/).

### Create and compile the contracts

1. On your machine, create a directory for the contract. Initialize Truffle in the directory:

   ```shell
   truffle init
   ```

   This will generate the Truffle boilerplate structure:

   ```shell
   .
   ├── contracts  
   │   └── .gitkeep  
   ├── migrations  
   │   └── .gitkeep  
   ├── test  
   │   └── .gitkeep  
   └── truffle-config.js
   ```

2. Go to the `contracts` directory. In the directory, create two files: `Ownable.sol` and `DocStamp.sol`.

   ```sol Ownable.sol
   //SPDX-License-Identifier:MIT
   // Ownable.sol

   pragma solidity ^0.5.0;

   contract Ownable {
     address public owner;
     event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

     constructor() public {
       owner = msg.sender;
     }

     modifier onlyOwner() {
       require(msg.sender == owner);
       _;
     }

     function transferOwnership(address newOwner) onlyOwner public {
       require(newOwner != address(0));
       emit OwnershipTransferred(owner, newOwner);
       owner = newOwner;
     }
   }

   ```

   This is an ownable contract. The contract implementation is the following:

   - Only an authority can generate a certificate. On contract deployment, the authority is the account that deploys the contract. The authority is the contract owner.
   - The contract owner can transfer their authority.

     ```sol DocStamp.sol
     //SPDX-License-Identifier:MIT
     // DocStamp.sol

     pragma solidity ^0.5.0;

     import './Ownable.sol';

     contract DocStamp is Ownable {
       mapping (bytes32 => address) public records;

       event CertificateIssued(bytes32 indexed record, uint256 timestamp, bool returnValue);

       function issueCertificate(string calldata name, string calldata details) external onlyOwner {
         bytes32 certificate = keccak256(abi.encodePacked(name, details));
         require(certificate != keccak256(abi.encodePacked("")));
         records[certificate] = msg.sender;
         emit CertificateIssued(certificate, block.timestamp, true);
       }

       function owningAuthority() external view returns (address) {
         return owner;
       }

       function verifyCertificate(string calldata name, string calldata details, bytes32 certificate) external view 
        returns (bool) {
         bytes32 certificate2 = keccak256(abi.encodePacked(name, details));
         // are certificates the same?
         if (certificate == certificate2) {
           // does the certificate exist on the blockchain?
           if (records[certificate] == owner) {
             return true;
           }
         }
         return false;
       }
     }

     ```

   This is the main contract. The contract handles the generation and verification of certificates.

   - `issueCertificate()` — generates a certificate by calculating a hash of the student name and details.
     - Can be called only by the owner.
     - Emits a certificate generation event with the timestamp.
     - The issuer puts the certificate on the blockchain by storing it in the global variable records by passing `records[certificate] = msg.sender`.
   - `owningAuthority()` — returns the address of issuer/authority.
   - `verifyCertificate()` — calculates a hash of the student name and details, and checks if the contract is on the blockchain.
     - Can be called by anyone.

3. Create `2_deploy_contracts.js` in the `migrations` directory.

   ```javascript
   var DocStamp = artifacts.require("./DocStamp.sol");

   module.exports = function(deployer) {
   deployer.deploy(DocStamp);
   };
   ```

   > 📘 Deployment details
   > 
   > Since DocStamp inherits from Ownable, Ownable will be deployed together with DocStamp.

4. Compile the contracts:

   ```shell
   truffle compile
   ```

   This will compile the contracts and put them in your `build/contracts` directory in the `.json` format. If the contract does not compile, check the compiler version in your `truffle-config.js` file and ensure that your compiler version matches the pragma solidity version of the contract.

### Deploy the contract to your local development network

1. Start the development network on your machine:

   ```shell
   truffle develop
   ```

2. Without exiting the Truffle console, deploy the contract to the local development network:

   ```shell
   truffle(develop)>  migrate
   ```

   This will deploy the contract to the development network as specified in the`truffle-config.js`.

### Interact with the contract on your local development network

1. In your Truffle console, create an instance of the deployed contract:

   ```javascript
   let instance = await DocStamp.deployed()
   ```

   You can run `instance` to see the contract object ABI, bytecode, and methods.

2. Declare the contract owner:

   ```javascript
   let owner = await instance.owningAuthority()
   ```

   You can run `owner` to see the account that deployed the contract and owns the contract.

3. Issue the certificate:

   ```javascript
   let result = await instance.issueCertificate("John", "graduate", {from: owner})
   ```

   This issues the certificate.

   Run `result.logs` to view the full certificate details.

   > 📘 Getting certificate details
   > 
   > Running result will not print the certificate details in Truffle console. You must run `result.logs`.
   > 
   > See also [Processing transaction results](https://www.trufflesuite.com/docs/truffle/getting-started/interacting-with-your-contracts#processing-transaction-results).

   Example output:

   ```shell
   logIndex: 0,
     transactionIndex: 0,
     transactionHash: '0xb3ef241d76bd4d3a3d92ad4fd382785589033a4f561baa2895136a3315b3561b',
     blockHash: '0x29343b9fc5b88bb8c85287463a37a00e8fecce36553880365ca5395d9fb18eeb',
     blockNumber: 7,
     address: '0x3113Aa54D455142a254b43b83FB16c18eD30ba33',
     type: 'mined',
     id: 'log_dbbbec7e',
     event: 'CertificateIssued',
     args: Result {
       '0': '0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153',
       '1': [BN],
       '2': true,
       __length__: 3,
       record: '0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153',
       timestamp: [BN],
       returnValue: true
   ```

   Note the `record` value in the output. This is the hash of the certificate values: name and details. You will need this hash to create the contract test later in this tutorial.

4. Run the certificate verification:

   ```javascript
   let verify = await instance.verifyCertificate("NAME", "DETAILS", "CERTIFICATE_HASH", {from: owner})
   ```

   where

   - NAME — the student name on the certificate used on the issuing step.
   - DETAILS — any details
   - CERTIFICATE_HASH — the hash of DETAILS and NAME. You should have received this hash in the record field at the previous step by running `result.logs`.

   Example:

   ```javascript
   let verified = await instance.verifyCertificate("John", "graduate", 
   "0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153", {from: owner})
   ```

   Running `verify` will now print `true` if there is a match, and `false` if there is no match.

### Test the contract

1. Navigate to the `test` directory.

2. Create a `test.js` file:

   ```javascript
   const DocStamp = artifacts.require('./DocStamp.sol')

   contract('DocStamp', function(accounts) {
     it('should issue a certificate', async function() {
       const account = accounts[0]

       try {
         const instance = await DocStamp.deployed()
         await instance.issueCertificate("NAME", "DETAILS")
         const authority = await instance.owningAuthority()

         assert.equal(authority, account)
       } catch(error) {
         assert.equal(error, undefined)
       }
     })

     it('should verify a certificate', async function() {
       const account = accounts[0]

       try {
         const instance = await DocStamp.deployed()
         const verified = await instance.verifyCertificate("NAME", "DETAILS", "CERTIFICATE_HASH")

         assert.equal(verified, true)
       } catch(error) {
         assert.equal(error, undefined)
       }
     })
   })
   ```

   where

   - NAME — the student name on the certificate used on the issuing step.
   - DETAILS — any details
   - CERTIFICATE_HASH — the hash of DETAILS and NAME. You should have received this hash in the record field at one of the previous steps by running `result.logs`.

   Example:

   ```javascript
   const DocStamp = artifacts.require('./DocStamp.sol')

   contract('DocStamp', function(accounts) {
     it('should issue a certificate', async function() {
       const account = accounts[0]

       try {
         const instance = await DocStamp.deployed()
         await instance.issueCertificate("John", "graduate")
         const authority = await instance.owningAuthority()

         assert.equal(authority, account)
       } catch(error) {
         assert.equal(error, undefined)
       }
     })

     it('should verify a certificate', async function() {
       const account = accounts[0]

       try {
         const instance = await DocStamp.deployed()
         const verified = await instance.verifyCertificate("John", "graduate", 
   "0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153")

         assert.equal(verified, true)
       } catch(error) {
         assert.equal(error, undefined)
       }
     })
   })
   ```

3. Run the test:

   ```shell
   truffle test
   ```

   The test run output should be `Passing`.

> 📘 See also
> 
> [Truffle: Writing Tests in JavaScript](https://trufflesuite.com/docs/truffle/how-to/debug-test/write-tests-in-javascript/)

### Deploy the contract to your Ethereum node

1. Install `HDWalletProvider`.

   [HDWalletProvider](https://github.com/trufflesuite/truffle/tree/develop/packages/hdwallet-provider) is Truffle's separate npm package used to sign transactions.

   Run:

   ```shell
   npm install @truffle/hdwallet-provider
   ```

2. Edit `truffle-config.js` to add:

   - HDWalletProvider
   - Your Ethereum node access and credentials. Example:

     ```javascript
     const HDWalletProvider = require("@truffle/hdwallet-provider");
     const mnemonic = "misery walnut expose ...";

     module.exports = {
      networks: {
         development: {
             host: "127.0.0.1",
             port: 9545,
             network_id: "5777"
         },
         goerli: {
             provider: () => new HDWalletProvider(mnemonic, "YOUR_CHAINSTACK_ENDPOINT"),
             network_id: 5,
             gas: 4500000,
             gasPrice: 10000000000
         }
        }
     };
     ```

   where

   - `goerli` — any network name that you will pass to the `truffle migrate --network` command.
   - `HDWalletProvider` — Truffle's custom provider to sign transactions
   - `mnemonic` — your mnemonic that generates your accounts. You can also generate a mnemonic online with [Mnemonic Code Converter](https://iancoleman.io/bip39/). Make sure you generate a 15-word mnemonic.
   - YOUR_CHAINSTACK_ENDPOINT — your Chainstack node endpoint. See [View node access and credentials](doc:manage-your-node#view-node-access-and-credentials) and [Ethereum tooling](doc:ethereum-tooling).
   - `network_id` — the Ethereum Goerli testnet network ID: `5`.

3. Run:

   ```shell
   truffle migrate --network goerli
   ```

   This will engage `2_deploy_contracts.js` and deploy the contract to the Ethereum Goerli testnet as specified in `truffle-config.js`.

> 🚧 Get testnet ether
> 
> You must get the Goerli testnet ether to deploy the contract to the testnet.