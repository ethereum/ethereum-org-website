---
title: Interacting with smart contracts
description: Learn how to read data from and write data to Ethereum smart contracts using JavaScript libraries like ethers.js and viem.
lang: en
---

# Interacting with smart contracts

Smart contracts live on the Ethereum blockchain. Once deployed, you can interact with them — reading data, executing functions, and listening for events. This page covers everything you need to know.

## Prerequisites {#prerequisites}

Before diving in, make sure you understand:

- [What smart contracts are](/developers/docs/smart-contracts/)
- [How Ethereum transactions work](/developers/docs/transactions/)
- [JavaScript and async/await patterns](/developers/docs/apis/javascript/)

## Two types of interaction {#two-types}

Interacting with a smart contract falls into two categories:

| Type | Description | Gas required? | Example |
|------|-------------|:-------------:|---------|
| **Read (Call)** | Query data from the contract | No | Get a token balance |
| **Write (Send)** | Modify state on the blockchain | Yes | Transfer tokens |

### Read operations (calls) {#read-operations}

Read operations don't change the blockchain state. They are free (no gas) and instant. Any function marked `view` or `pure` in Solidity is a read operation.

```javascript
// Example: Reading an ERC-20 token balance
const balance = await token.balanceOf("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045");
```

### Write operations (transactions) {#write-operations}

Write operations modify contract state. They require:

- A signed transaction
- ETH for gas fees
- Confirmation from the network (block inclusion)

```javascript
// Example: Transferring ERC-20 tokens
const tx = await token.transfer("0xRecipientAddress", amount);
await tx.wait(); // Wait for confirmation
```

## Contract ABIs {#contract-abis}

Every smart contract exposes an **Application Binary Interface (ABI)** — a JSON description of its functions, events, and parameters.

### What an ABI contains {#abi-contents}

```json
{
  "type": "function",
  "name": "balanceOf",
  "inputs": [{ "name": "account", "type": "address" }],
  "outputs": [{ "name": "", "type": "uint256" }],
  "stateMutability": "view"
}
```

### Where to find an ABI {#where-to-find-abi}

- **Explorers like Etherscan** — Under the "Contract" tab → "Contract ABI"
- **Compilation output** — Your Solidity compiler generates it as a JSON file
- **Standard interfaces** — ERC-20, ERC-721 have well-known, publicly available ABIs

### Why ABIs matter {#why-abis-matter}

Without an ABI, a library doesn't know:

- What functions the contract has
- What parameters they expect
- What data types to encode and decode

## Libraries for interaction {#libraries}

### ethers.js (most popular) {#ethersjs}

ethers.js is a complete and compact library for interacting with the Ethereum blockchain and its ecosystem.

```javascript
import { ethers } from "ethers";

// Connect to a provider
const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_KEY");

// Create a contract instance
const contract = new ethers.Contract(
  "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // USDC contract
  abi,              // Contract ABI
  provider          // Read-only provider
);

// Read data (no gas needed)
const name = await contract.name();
const symbol = await contract.symbol();

// For write operations, attach a signer
const signer = new ethers.Wallet(privateKey, provider);
const contractWithSigner = contract.connect(signer);
const tx = await contractWithSigner.transfer("0xRecipient", amount);
await tx.wait();
```

### viem (modern TypeScript-first) {#viem}

viem is a TypeScript-first library that provides type-safe Ethereum interaction.

```javascript
import { createPublicClient, createWalletClient, http } from "viem";
import { mainnet } from "viem/chains";

// Public client (read only)
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

// Read data
const balance = await publicClient.readContract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  functionName: "balanceOf",
  args: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"],
});

// Wallet client (write)
const walletClient = createWalletClient({
  chain: mainnet,
  transport: http(),
});
const hash = await walletClient.writeContract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  functionName: "transfer",
  args: ["0xRecipient", amount],
});
```

### Web3.js (legacy) {#web3js}

```javascript
const Web3 = require("web3");
const web3 = new Web3("https://mainnet.infura.io/v3/YOUR_KEY");
const contract = new web3.eth.Contract(abi, "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
const result = await contract.methods.balanceOf("0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045").call();
```

## Step-by-step: read data (calls) {#read-step-by-step}

### Check an ERC-20 balance {#check-erc20-balance}

```javascript
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// Minimal ERC-20 ABI
const erc20Abi = [
  {
    inputs: [{ name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [{ type: "uint8" }],
    stateMutability: "view",
    type: "function",
  },
];

const [balance, decimals] = await Promise.all([
  client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: erc20Abi,
    functionName: "balanceOf",
    args: ["0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045"],
  }),
  client.readContract({
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    abi: erc20Abi,
    functionName: "decimals",
  }),
]);

console.log(`Balance: ${Number(balance) / 10 ** decimals} USDC`);
```

## Step-by-step: write data (transactions) {#write-step-by-step}

### Transfer ERC-20 tokens {#transfer-erc20}

```javascript
import { createWalletClient, http, parseUnits } from "viem";
import { mainnet } from "viem/chains";
import { privateKeyToAccount } from "viem/accounts";

const account = privateKeyToAccount("0xYOUR_PRIVATE_KEY");
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});

const hash = await walletClient.writeContract({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  functionName: "transfer",
  args: ["0xRecipientAddress", parseUnits("100", 6)], // 100 USDC (6 decimals)
});
```

## Listening to events {#listening-to-events}

Smart contracts emit events that your application can subscribe to:

```javascript
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

const client = createPublicClient({ chain: mainnet, transport: http() });

// Listen for Transfer events from a USDC contract
const unwatch = client.watchContractEvent({
  address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
  abi: erc20Abi,
  eventName: "Transfer",
  onLogs: (logs) => {
    console.log("New transfer:", logs);
  },
});

// Stop listening later
// unwatch();
```

## Common patterns {#common-patterns}

### Batch reading {#batch-reading}

```javascript
const [totalSupply, name, symbol, decimals] = await Promise.all([
  contract.totalSupply(),
  contract.name(),
  contract.symbol(),
  contract.decimals(),
]);
```

### Estimating gas {#estimating-gas}

```javascript
const gasEstimate = await contract.transfer.estimateGas("0xRecipient", amount);
```

### Multi-call (efficient batch) {#multicall}

For reading many contract state values at once, use the Multicall pattern:

```javascript
const results = await publicClient.multicall({
  contracts: [
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      abi: erc20Abi,
      functionName: "balanceOf",
      args: ["0xUser1"],
    },
    {
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
      abi: erc20Abi,
      functionName: "balanceOf",
      args: ["0xUser2"],
    },
  ],
});
```

## Tools and resources {#tools}

| Tool | Description |
|------|-------------|
| [Etherscan](https://etherscan.io) | Read contract data, verify source code |
| [ethers.js](https://docs.ethers.org) | JavaScript library for Ethereum |
| [viem](https://viem.sh) | TypeScript library for Ethereum |
| [Web3.js](https://web3js.org) | Legacy JavaScript library |
| [Tenderly](https://tenderly.co) | Transaction simulator and debugger |
| [The Graph](https://thegraph.com) | Indexed blockchain data via GraphQL |
| [Foundry](https://book.getfoundry.sh) | Rust-based Ethereum development toolkit |

## Tutorials {#tutorials}

- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [How to write and deploy a smart contract](/developers/tutorials/how-to-write-a-smart-contract/)
- [Using The Graph to query Ethereum data](/developers/tutorials/using-the-graph-to-query-ethereum-data/)

## Further reading {#further-reading}

- [Smart contract anatomy](/developers/docs/smart-contracts/anatomy/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [Backend APIs](/developers/docs/apis/backend/)
- [Ethereum for JavaScript developers](/developers/docs/programming-languages/javascript/)
