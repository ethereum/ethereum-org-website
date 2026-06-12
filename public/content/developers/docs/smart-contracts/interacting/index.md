---
title: Interacting with smart contracts
description: Learn how to read from and write to smart contracts that are already deployed on Ethereum.
lang: en
---

You don't always need to write and deploy your own smart contract. Most of the time as a developer, you'll want to interact with smart contracts that others have already deployed to the Ethereum network.

This page covers the two fundamental ways to interact with a smart contract — **reading** data and **writing** data — and the tools you need to do both.

## Prerequisites {#prerequisites}

You should understand:

- [How smart contracts work](/developers/docs/smart-contracts/)
- [Ethereum accounts and how they sign transactions](/developers/docs/accounts/)
- [What a transaction is](/developers/docs/transactions/)

## Two ways to interact with a smart contract {#two-ways}

Interacting with a smart contract falls into two categories:

### Reading from a contract {#reading-from-a-contract}

Reading is a **free** operation that does not create a transaction and does not change any state on the blockchain.

When you read from a contract, you're simply querying data that already exists. For example:

- Checking an ERC-20 token balance
- Reading the current price from a decentralized exchange
- Getting the owner of an NFT

Because reads don't modify state, they don't cost [gas](/developers/docs/gas/) and can be performed by anyone without needing ETH.

### Writing to a contract {#writing-to-a-contract}

Writing is a **state-changing** operation that requires a transaction and costs gas.

When you write to a contract, you're triggering a function that modifies the blockchain state. For example:

- Transferring tokens
- Swapping tokens on a decentralized exchange
- Minting an NFT

Writing always requires:

1. An [Externally Owned Account (EOA)](/developers/docs/accounts/#types-of-account) with enough ETH for gas
2. A transaction signed by the account's private key
3. The transaction to be mined and included in a block

## Understanding contract ABIs {#understanding-contract-abis}

To interact with a smart contract, your application needs to know *what* the contract can do. This is where the **Application Binary Interface (ABI)** comes in.

An ABI is a JSON document that describes:

- Every function the contract exposes (name, inputs, outputs)
- Every event the contract can emit
- How to encode and decode data when talking to the contract

Think of the ABI as the contract's instruction manual — without it, your application doesn't know which functions exist or what parameters they expect.

### Where to find a contract's ABI {#where-to-find-abis}

- **Verified contracts on Etherscan** — [Etherscan](https://etherscan.io) automatically exposes the ABI for verified source code
- **From the developer** — many projects publish their ABIs in their documentation or npm packages
- **Generate from source** — if you have the Solidity source code, you can [compile it](/developers/docs/smart-contracts/compiling/) to produce the ABI

## Tools and libraries for interacting with contracts {#tools-and-libraries}

Developers typically use a JavaScript/TypeScript library to interact with contracts from a web app, backend, or script.

### Client libraries (JavaScript/TypeScript) {#client-libraries}

- **[Viem](https://viem.sh)** — Modern, lightweight TypeScript interface for Ethereum with first-class type safety
- **[ethers.js](https://docs.ethers.org/)** — Battle-tested library for interacting with the Ethereum blockchain
- **[web3.js](https://web3js.org/)** — The original Ethereum JavaScript API

### Backend libraries {#backend-libraries}

- **[ethers.js](https://docs.ethers.org/)** — Also works in Node.js for server-side scripts and bots
- **[web3.py](https://web3py.readthedocs.io/)** — Python library for Ethereum interaction
- **[go-ethereum](https://geth.ethereum.org/docs/interact-with-geth)** — Official Go library from the Geth team

### Example: reading a token balance with Viem {#example-viem}

```ts
import { createPublicClient, http, formatUnits } from 'viem'
import { mainnet } from 'viem/chains'

// USDC contract address and ABI (partial, for balanceOf)
const USDC = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'
const abi = [{
  name: 'balanceOf',
  type: 'function',
  stateMutability: 'view',
  inputs: [{ name: 'account', type: 'address' }],
  outputs: [{ name: '', type: 'uint256' }],
}] as const

const client = createPublicClient({ chain: mainnet, transport: http() })

const balance = await client.readContract({
  address: USDC,
  abi,
  functionName: 'balanceOf',
  args: ['0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045'], // vitalik.eth
})

console.log(formatUnits(balance, 6)) // USDC has 6 decimals
```

### Example: sending a transaction with ethers.js {#example-ethers}

```js
const { ethers } = require('ethers')

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

// ERC-20 transfer ABI
const abi = ['function transfer(address to, uint256 amount) returns (bool)']
const contract = new ethers.Contract(tokenAddress, abi, wallet)

const tx = await contract.transfer(recipient, ethers.parseUnits('10', 18))
await tx.wait() // wait for the transaction to be mined
console.log(`Transferred! TX: ${tx.hash}`)
```

## Events and logs {#events-and-logs}

Smart contracts can emit **events** to signal that something happened. Your application can listen for these events to react in real time.

```ts
import { createPublicClient, http, parseAbiItem } from 'viem'
import { mainnet } from 'viem/chains'

const client = createPublicClient({ chain: mainnet, transport: http() })

// Watch for USDC Transfer events
const unwatch = client.watchEvent({
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  onLogs: (logs) => console.log(logs),
})
```

## Simulating transactions {#simulating}

Before sending a transaction, you can **simulate** it to check if it would succeed — and to see its return value — without spending gas. This is useful for catching errors early and for previewing outcomes.

Most client libraries support this through `eth_call`:

```ts
// With Viem
const result = await client.simulateContract({
  address: contractAddress,
  abi,
  functionName: 'swap',
  args: [amountIn],
  account: userAddress,
})
```

## Wallets and signing {#wallets-and-signing}

In a dapp, the user's wallet (like MetaMask, Rainbow, or WalletConnect) handles signing. You don't manage private keys directly.

[Wallet libraries and connection tools](/developers/docs/apis/javascript/) abstract this so you can focus on building your application logic.

## Related tutorials {#related-tutorials}

- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Sending transactions using web3.js and Alchemy](/developers/tutorials/sending-transactions-using-web3js-and-alchemy/)
- [How to view NFT metadata with JavaScript](/developers/tutorials/how-to-view-nft-in-metamask/)

## Further reading {#further-reading}

- [Viem documentation: Reading and writing to contracts](https://viem.sh/docs/contract/readContract)
- [ethers.js documentation: Contracts](https://docs.ethers.org/v6/api/contract/)
- [Solidity ABI specification](https://docs.soliditylang.org/en/latest/abi-spec.html)
- [What is an ABI? — Alchemy](https://www.alchemy.com/overviews/what-is-an-abi)

## Related topics {#related-topics}

- [Compiling smart contracts](/developers/docs/smart-contracts/compiling/)
- [Deploying smart contracts](/developers/docs/smart-contracts/deploying/)
- [JavaScript APIs](/developers/docs/apis/javascript/)
- [Backend APIs](/developers/docs/apis/backend/)
