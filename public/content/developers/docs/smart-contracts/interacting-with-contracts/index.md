---
title: Interacting with smart contracts
description: A comprehensive guide to reading from and writing to smart contracts using JavaScript libraries.
lang: en---

## Introduction {#introduction}

Once a smart contract is deployed to the Ethereum blockchain, anyone can interact with it. Interacting with a smart contract means calling its functions—either to read data from the blockchain or to write data to it.

This guide covers the fundamentals of smart contract interaction using modern JavaScript libraries, with practical examples for common use cases.

## Prerequisites {#prerequisites}

Before interacting with smart contracts, you should understand:

- [Smart contracts](/developers/docs/smart-contracts/) - What they are and how they work
- [Ethereum accounts](/developers/docs/accounts/) - How accounts work on Ethereum
- [Transactions](/developers/docs/transactions/) - How transactions are structured
- [JavaScript API libraries](/developers/docs/apis/javascript/) - Available libraries for blockchain interaction

You'll also need:
- A JavaScript environment (Node.js or browser)
- An Ethereum node connection (via [Infura](https://infura.io/), [Alchemy](https://alchemy.com/), or your own node)
- The smart contract's ABI (Application Binary Interface) and address

## Reading vs Writing {#reading-vs-writing}

Smart contract interactions fall into two categories:

### Reading (Call) {#reading}

**Calls** are used to read data from the blockchain. They don't modify the state and don't require gas or transaction fees.

Common read operations:
- Checking an account balance
- Getting token metadata (name, symbol, decimals)
- Querying contract state variables

### Writing (Transaction) {#writing}

**Transactions** modify the blockchain state. They require gas fees and must be signed by an account with sufficient ETH.

Common write operations:
- Transferring tokens
- Minting NFTs
- Updating contract state
- Calling functions that modify storage

## Setting Up Your Environment {#setup}

### Using Viem (Recommended) {#viem-setup}

[Viem](https://viem.sh/) is a modern, lightweight alternative to ethers.js:

```javascript
import { createPublicClient, createWalletClient, http, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'
import { privateKeyToAccount } from 'viem/accounts'

// For reading (public client)
const publicClient = createPublicClient({
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY')
})

// For writing (wallet client)
const account = privateKeyToAccount('0x...') // Your private key
const walletClient = createWalletClient({
  account,
  chain: mainnet,
  transport: http('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY')
})
```

### Using Ethers.js v6 {#ethers-setup}

```javascript
import { ethers } from 'ethers'

// Provider for reading
const provider = new ethers.JsonRpcProvider('https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY')

// Signer for writing
const privateKey = '0x...' // Your private key
const signer = new ethers.Wallet(privateKey, provider)
```

## Reading from Contracts {#reading-contracts}

### Step 1: Define the ABI {#define-abi}

The ABI tells the library how to encode/decode function calls:

```javascript
const abi = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)'
])
```

### Step 2: Read Contract State {#read-state}

Using Viem:

```javascript
const contractAddress = '0xA0b86a33E6441e0A421e56E4773C3C4b0Db7E5b0' // Example token

// Read token name
const name = await publicClient.readContract({
  address: contractAddress,
  abi,
  functionName: 'name'
})
console.log('Token name:', name) // "USD Coin"

// Read balance
const balance = await publicClient.readContract({
  address: contractAddress,
  abi,
  functionName: 'balanceOf',
  args: ['0x...'] // Address to check
})
console.log('Balance:', balance) // 1000000n (in wei/smallest unit)
```

Using Ethers.js:

```javascript
const contract = new ethers.Contract(contractAddress, abi, provider)

// Read token name
const name = await contract.name()
console.log('Token name:', name)

// Read balance
const balance = await contract.balanceOf('0x...')
console.log('Balance:', balance.toString())
```

### Reading Multiple Values {#multicall}

Use multicall to batch multiple reads into a single RPC call:

```javascript
import { multicall } from 'viem'

const results = await multicall(publicClient, {
  contracts: [
    {
      address: contractAddress,
      abi,
      functionName: 'name'
    },
    {
      address: contractAddress,
      abi,
      functionName: 'symbol'
    },
    {
      address: contractAddress,
      abi,
      functionName: 'totalSupply'
    }
  ]
})

console.log('Name:', results[0].result)
console.log('Symbol:', results[1].result)
console.log('Total Supply:', results[2].result)
```

## Writing to Contracts {#writing-contracts}

### Step 1: Prepare the Transaction {#prepare-transaction}

Using Viem:

```javascript
// Transfer tokens
const hash = await walletClient.writeContract({
  address: contractAddress,
  abi: parseAbi(['function transfer(address to, uint256 amount) returns (bool)']),
  functionName: 'transfer',
  args: [
    '0xRecipientAddress...', // Recipient
    1000000n // Amount (in smallest unit)
  ]
})

console.log('Transaction hash:', hash)
```

Using Ethers.js:

```javascript
const contract = new ethers.Contract(contractAddress, abi, signer)

// Transfer tokens
const tx = await contract.transfer(
  '0xRecipientAddress...',
  ethers.parseUnits('1.0', 6) // 1.0 tokens with 6 decimals
)

console.log('Transaction hash:', tx.hash)
```

### Step 2: Wait for Confirmation {#wait-confirmation}

```javascript
// Viem
const receipt = await publicClient.waitForTransactionReceipt({ hash })
console.log('Transaction confirmed in block:', receipt.blockNumber)

// Ethers.js
const receipt = await tx.wait()
console.log('Transaction confirmed in block:', receipt.blockNumber)
```

## Common Patterns {#common-patterns}

### ERC-20 Token Transfer {#erc20-transfer}

```javascript
const erc20Abi = parseAbi([
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function balanceOf(address account) view returns (uint256)',
  'event Transfer(address indexed from, address indexed to, uint256 value)'
])

// Check balance first
const balance = await publicClient.readContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: 'balanceOf',
  args: [account.address]
})

if (balance >= amount) {
  // Send transfer transaction
  const hash = await walletClient.writeContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'transfer',
    args: [recipientAddress, amount]
  })
  
  // Wait for confirmation
  const receipt = await publicClient.waitForTransactionReceipt({ hash })
  console.log('Transfer confirmed!')
}
```

### Approving Token Spending {#erc20-approve}

```javascript
// Approve a DEX to spend your tokens
const hash = await walletClient.writeContract({
  address: tokenAddress,
  abi: erc20Abi,
  functionName: 'approve',
  args: [
    dexContractAddress, // The contract allowed to spend
    maxUint256 // Amount to approve (use max for unlimited)
  ]
})
```

### Reading Events {#reading-events}

```javascript
// Get past Transfer events
const logs = await publicClient.getLogs({
  address: tokenAddress,
  event: parseAbiItem('event Transfer(address indexed from, address indexed to, uint256 value)'),
  fromBlock: 18000000n,
  toBlock: 'latest'
})

console.log(`Found ${logs.length} transfers`)
```

## Error Handling {#error-handling}

### Common Errors {#common-errors}

```javascript
try {
  const hash = await walletClient.writeContract({...})
} catch (error) {
  if (error.message.includes('insufficient funds')) {
    console.error('Not enough ETH for gas fees')
  } else if (error.message.includes('user rejected')) {
    console.error('Transaction was rejected')
  } else if (error.message.includes('execution reverted')) {
    console.error('Smart contract rejected the transaction')
  } else {
    console.error('Unknown error:', error)
  }
}
```

### Estimating Gas {#gas-estimation}

```javascript
try {
  const gasEstimate = await publicClient.estimateContractGas({
    address: contractAddress,
    abi,
    functionName: 'transfer',
    args: [recipient, amount],
    account: account.address
  })
  
  console.log('Estimated gas:', gasEstimate)
} catch (error) {
  console.error('Transaction will fail:', error.message)
}
```

## Security Best Practices {#security}

### Never Hardcode Private Keys {#no-hardcode}

```javascript
// ❌ BAD
const privateKey = '0x1234567890abcdef...'

// ✅ GOOD
const privateKey = process.env.PRIVATE_KEY
if (!privateKey) {
  throw new Error('PRIVATE_KEY environment variable not set')
}
```

### Validate Inputs {#validate-inputs}

```javascript
import { isAddress } from 'viem'

function transferTokens(recipient, amount) {
  if (!isAddress(recipient)) {
    throw new Error('Invalid recipient address')
  }
  
  if (amount <= 0n) {
    throw new Error('Amount must be positive')
  }
  
  // Proceed with transfer...
}
```

### Use Environment Variables {#env-vars}

```bash
# .env file
RPC_URL=https://eth-mainnet.g.alchemy.com/v2/YOUR_API_KEY
PRIVATE_KEY=0x...
```

```javascript
import dotenv from 'dotenv'
dotenv.config()

const rpcUrl = process.env.RPC_URL
const privateKey = process.env.PRIVATE_KEY
```

## Testing Your Interactions {#testing}

Use a testnet before mainnet:

```javascript
import { sepolia } from 'viem/chains'

const publicClient = createPublicClient({
  chain: sepolia, // Use Sepolia testnet
  transport: http('https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY')
})
```

Get testnet ETH from [Sepolia faucets](/developers/docs/networks/#sepolia).

## Further Reading {#further-reading}

- [Viem Documentation](https://viem.sh/docs/contract/readContract.html)
- [Ethers.js Documentation](https://docs.ethers.org/v6/api/contract/)
- [JSON-RPC API](/developers/docs/apis/json-rpc/)
- [Smart contract anatomy](/developers/docs/smart-contracts/anatomy/)

## Related Tutorials {#related-tutorials}

- [Interact with other contracts from Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/)
- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/)