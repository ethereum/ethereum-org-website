---
title: Interacting with smart contracts
description: Learn how to read data from and write data to smart contracts using web applications and scripts.
lang: en
---

Once a smart contract is deployed on Ethereum, you can interact with it from your applications. This page explains the different ways to interact with smart contracts and the tools available.

## Prerequisites {#prerequisites}

Make sure you understand [smart contracts](/developers/docs/smart-contracts/), [accounts](/developers/docs/accounts/), and [transactions](/developers/docs/transactions/) before reading this page. You should also be familiar with [compiling smart contracts](/developers/docs/smart-contracts/compiling/) and the concept of an ABI.

## Types of interactions {#types-of-interactions}

There are two main ways to interact with a smart contract:

### Reading data (calls) {#reading-data}

Reading data from a smart contract doesn't require a transaction. These are called **calls** or **view calls**. When you read data:

- No gas is required
- No transaction is sent to the network
- The state of the blockchain is not modified
- Results are returned immediately

Examples of reading data:
- Checking your token balance
- Getting the name or symbol of a token
- Reading the current price from an oracle

```javascript
// Example: Reading data from a contract
const balance = await contract.balanceOf(userAddress);
const name = await contract.name();
```

### Writing data (transactions) {#writing-data}

Writing data to a smart contract requires sending a **transaction**. When you write data:

- Gas is required and must be paid in ETH
- A transaction is sent and must be mined
- The state of the blockchain is modified
- You must wait for transaction confirmation

Examples of writing data:
- Transferring tokens to another address
- Swapping tokens on a DEX
- Minting an NFT
- Voting in a DAO

```javascript
// Example: Writing data to a contract (sending a transaction)
const tx = await contract.transfer(recipientAddress, amount);
await tx.wait(); // Wait for confirmation
```

## The Application Binary Interface (ABI) {#the-abi}

To interact with a smart contract, you need its **ABI** (Application Binary Interface). The ABI is a JSON file that describes:

- The functions available in the contract
- The parameters each function accepts
- The return types of each function
- Events the contract can emit

The ABI acts as a bridge between your application and the contract. Client libraries use the ABI to encode function calls and decode responses.

```json
// Example: Partial ABI for an ERC-20 token
[
  {
    "name": "balanceOf",
    "type": "function",
    "stateMutability": "view",
    "inputs": [{ "name": "account", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }]
  },
  {
    "name": "transfer",
    "type": "function",
    "stateMutability": "nonpayable",
    "inputs": [
      { "name": "to", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "outputs": [{ "name": "", "type": "bool" }]
  }
]
```

You can get a contract's ABI from:
- The source code after compilation
- Block explorers like [Etherscan](https://etherscan.io) (for verified contracts)
- The project's documentation or GitHub repository

## Tools for interacting with contracts {#tools}

### JavaScript libraries {#javascript-libraries}

The most common way to interact with contracts is through JavaScript libraries in web applications:

- [**Ethers.js**](/developers/docs/apis/javascript/#ethers-js-libraries) - Lightweight and complete library for Ethereum
- [**Web3.js**](/developers/docs/apis/javascript/#web3-js-libraries) - The original Ethereum JavaScript API
- [**Viem**](https://viem.sh) - Modern TypeScript-first library

Example using Ethers.js:

```javascript
import { ethers } from "ethers";

// Connect to Ethereum
const provider = new ethers.BrowserProvider(window.ethereum);
const signer = await provider.getSigner();

// Create contract instance
const contract = new ethers.Contract(contractAddress, abi, signer);

// Read data
const balance = await contract.balanceOf(userAddress);

// Write data
const tx = await contract.transfer(recipient, amount);
await tx.wait();
```

### Backend libraries {#backend-libraries}

For server-side applications:

- [**Web3.py**](/developers/docs/apis/backend/#python) - Python library for Ethereum
- [**Web3j**](/developers/docs/apis/backend/#java-and-android) - Java library for Ethereum
- [**Nethereum**](/developers/docs/apis/backend/#net) - .NET library for Ethereum

### Command-line tools {#cli-tools}

For quick interactions and scripting:

- [**Cast**](https://book.getfoundry.sh/cast/) - Command-line tool from Foundry
- [**eth-cli**](https://github.com/protofire/eth-cli) - CLI for Ethereum interactions

```bash
# Example: Read data using Cast
cast call 0x... "balanceOf(address)" 0x...

# Example: Send transaction using Cast
cast send 0x... "transfer(address,uint256)" 0x... 1000000
```

### Block explorers {#block-explorers}

Block explorers like Etherscan allow you to interact with verified contracts directly in your browser:

1. Go to the contract address on Etherscan
2. Click the "Contract" tab
3. Use "Read Contract" for view functions
4. Use "Write Contract" for state-changing functions (requires wallet connection)

## Interacting from another contract {#contract-to-contract}

Smart contracts can also call other contracts. This is common in DeFi protocols where contracts interact with DEXs, lending protocols, and other services.

```solidity
// Example: Calling another contract from Solidity
interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract MyContract {
    function sendTokens(address token, address to, uint256 amount) external {
        IERC20(token).transfer(to, amount);
    }
}
```

## Listening to events {#events}

Contracts emit **events** to log important actions. Your application can listen for these events to react to contract activity in real-time.

```javascript
// Example: Listening to Transfer events
contract.on("Transfer", (from, to, amount, event) => {
  console.log(`${from} sent ${amount} tokens to ${to}`);
});
```

Events are also useful for:
- Tracking historical activity
- Building notification systems
- Indexing data for faster queries

## Further reading {#further-reading}

- [Ethers.js documentation](https://docs.ethers.org/)
- [Viem documentation](https://viem.sh)
- [Foundry Book - Cast](https://book.getfoundry.sh/cast/)

## Related tutorials {#related-tutorials}

- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/)

## Related topics {#related-topics}

- [Smart contracts](/developers/docs/smart-contracts/)
- [Compiling smart contracts](/developers/docs/smart-contracts/compiling/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [Backend APIs](/developers/docs/apis/backend/)
