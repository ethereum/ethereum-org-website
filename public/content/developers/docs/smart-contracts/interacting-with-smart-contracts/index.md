---
title: Interacting with smart contracts
description: Learn how applications, wallets, and services interact with smart contracts on Ethereum
lang: en
---

## What is a smart contract? {#what-is-a-smart-contract}

A smart contract is a program that runs on the Ethereum blockchain. It consists of code (its functions) and data (its state) stored at a specific address on Ethereum.

Smart contracts can define and automatically enforce rules without requiring an intermediary. Developers can deploy contracts to the network, and users, applications, or other smart contracts can interact with them by calling their functions.

For example, applications may interact with smart contracts to:

* Read token balances
* Transfer assets
* Execute trades on decentralized exchanges
* Mint NFTs
* Participate in governance systems

Each deployed smart contract has its own Ethereum address, allowing applications and users to interact with it in a standardized way.

In this guide, you'll learn how applications communicate with deployed smart contracts, how contract ABIs work, and how developer tools interact with Ethereum nodes to execute contract functions.


---

## Simple smart contract example {#simple-example}

The following Solidity contract stores a number on Ethereum and allows users to read or update it.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleStorage {
    uint256 private storedNumber;

    // Read the stored value
    function getNumber() public view returns (uint256) {
        return storedNumber;
    }

    // Update the stored value
    function setNumber(uint256 newNumber) public {
        storedNumber = newNumber;
    }
}
```

This contract exposes two functions:

* `getNumber()` is a `view` function that reads blockchain state without modifying it.
* `setNumber()` updates the contract's state by storing a new value on-chain.

Once deployed, applications, wallets, or other smart contracts can interact with these functions using the contract's address and ABI.

In the following sections, we'll explore how these interactions work and how developer tools communicate with deployed smart contracts on Ethereum.


---

## Prerequisites {#prerequisites}

Before learning how to interact with smart contracts, it helps to understand some core Ethereum concepts:

* [Ethereum accounts](https://ethereum.org/developers/docs/accounts/) – Learn about externally owned accounts (EOAs), contract accounts, and how users interact with Ethereum.
* [Transactions](https://ethereum.org/developers/docs/transactions/) – Understand how transactions are created, signed, and executed on the network.
* [The Ethereum Virtual Machine (EVM)](https://ethereum.org/developers/docs/evm/) – Explore the execution environment that processes smart contract code.
* [Smart contracts](https://ethereum.org/developers/docs/smart-contracts/) – Review how smart contracts work, how they are deployed, and their role in Ethereum applications.

These concepts provide the foundation for understanding how applications communicate with deployed smart contracts on Ethereum.

---

## What does it mean to interact with a smart contract? {#what-is-contract-interaction}

Smart contracts expose functions that can be called by users, applications, wallets, backend services, or other smart contracts.

Interacting with a smart contract means communicating with a deployed contract to execute one of its functions. These interactions generally fall into two categories:

* Reading blockchain state
* Modifying blockchain state

For example, an application may read a user's token balance from an ERC-20 contract, while a decentralized exchange may execute a state-changing function to swap tokens between users.

Interactions with smart contracts can happen from many different environments, including:

* Frontend applications
* Browser wallets
* Backend services
* Command-line tools
* Other smart contracts

Applications communicate with deployed contracts using the contract's address and ABI. Under the hood, developer libraries encode function calls into data that Ethereum nodes can understand and execute.

In the following sections, we'll explore the different types of contract interactions and how they work internally on Ethereum.

### Reading data from smart contracts {#reading-data}

Read operations retrieve data from a smart contract without modifying blockchain state. These interactions are commonly used to fetch information such as token balances, ownership data, or protocol configuration values.

Read operations:

* Do not change blockchain state
* Do not require a transaction
* Do not require gas fees from the user
* Are typically executed locally by Ethereum nodes using `eth_call`

In Solidity, read-only functions are commonly marked with the `view` or `pure` keywords.

Examples of read operations include:

* Checking an ERC-20 token balance
* Reading NFT ownership
* Fetching staking information
* Querying governance proposals

The following example uses `ethers.js` to read a value from a deployed smart contract:

```javascript
import { ethers } from "ethers";

const provider = new ethers.JsonRpcProvider(RPC_URL);

const abi = [
  "function getNumber() view returns (uint256)"
];

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  provider
);

const value = await contract.getNumber();

console.log(value.toString());
```

In this example:

* `provider` connects the application to an Ethereum node
* `abi` describes the contract function interface
* `contract.getNumber()` performs a read-only contract call

Because this interaction does not modify state, no transaction is created and no wallet signature is required.

### Writing data to smart contracts {#writing-data}

Write operations modify blockchain state by executing a transaction on Ethereum. These interactions require gas fees and must be signed by an externally owned account (EOA), such as a wallet.

Examples of write operations include:

* Transferring tokens
* Swapping assets on a decentralized exchange
* Minting NFTs
* Staking tokens
* Voting in governance systems

Unlike read operations, write operations:

* Create blockchain transactions
* Require gas fees
* Must be signed by a wallet or account
* Need confirmation from the network before becoming finalized

When a transaction is submitted:

1. The transaction is signed by the user's wallet
2. It is broadcast to the Ethereum network
3. Ethereum nodes execute the contract function
4. The transaction is included in a block
5. The updated blockchain state becomes available

The following example uses `ethers.js` to update state in a deployed smart contract:

```javascript
import { ethers } from "ethers";

const provider = new ethers.BrowserProvider(window.ethereum);

const signer = await provider.getSigner();

const abi = [
  "function setNumber(uint256 newNumber)"
];

const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  signer
);

const tx = await contract.setNumber(42);

await tx.wait();

console.log("Transaction confirmed");
```

In this example:

* `signer` is used to sign the transaction
* `setNumber(42)` modifies blockchain state
* `tx.wait()` waits for the transaction to be confirmed on-chain

Because write operations change blockchain state, they require consensus from the Ethereum network before the changes become permanent.

---

## Externally owned accounts and contract accounts {#accounts}

Ethereum has two types of accounts:

* Externally owned accounts (EOAs)
* Contract accounts

Understanding the difference between these account types is important because they interact with smart contracts differently.

### Externally owned accounts (EOAs)

Externally owned accounts are controlled by private keys and are typically managed by wallets such as MetaMask or hardware wallets.

EOAs can:

* Initiate transactions
* Sign messages
* Pay gas fees
* Interact with smart contracts

When a user submits a transaction from a wallet, the transaction originates from an EOA.

### Contract accounts

Contract accounts are controlled by smart contract code instead of private keys.

Contract accounts can:

* Store data
* Execute predefined logic
* Interact with other smart contracts
* Hold ETH and tokens

However, contract accounts cannot independently initiate transactions. They can only execute code when triggered by an external transaction or another contract call.

### Comparing account types

| Feature                   | Externally owned account (EOA) | Contract account    |
| ------------------------- | ------------------------------ | ------------------- |
| Controlled by             | Private key                    | Smart contract code |
| Can initiate transactions | Yes                            | No                  |
| Can sign messages         | Yes                            | No                  |
| Can hold ETH/tokens       | Yes                            | Yes                 |
| Executes custom logic     | No                             | Yes                 |

### Internal contract calls

Smart contracts can call functions on other smart contracts during execution. These are known as internal contract calls.

For example:

* A decentralized exchange contract may call a token contract to transfer assets
* A lending protocol may interact with a price oracle contract
* A multisig wallet contract may execute transactions on behalf of users

These interactions enable Ethereum's composability, where multiple smart contracts work together within a single transaction.

### Understanding msg.sender

In Solidity, `msg.sender` refers to the account or contract that directly called the current function.

For example:

* If a user calls a contract from a wallet, `msg.sender` is the user's EOA
* If one smart contract calls another contract, `msg.sender` becomes the calling contract's address

Many smart contracts use `msg.sender` for:

* Access control
* Ownership checks
* Tracking users
* Authorization logic

```solidity
contract Example {
    address public owner;

    function setOwner() public {
        owner = msg.sender;
    }
}
```

Understanding how EOAs, contract accounts, and `msg.sender` work is fundamental to understanding how smart contracts interact on Ethereum.

---

## How smart contract interaction works {#how-interaction-works}

Applications do not communicate with smart contracts directly. Instead, contract interactions pass through several layers of tools and infrastructure before being executed by the Ethereum Virtual Machine (EVM).

A typical interaction flow looks like this:

```text
User / Backend Application
            ↓
Developer Library (ethers.js, viem, web3.js)
            ↓
ABI encoding
            ↓
JSON-RPC request
            ↓
Ethereum node / RPC provider
            ↓
EVM execution
            ↓
Response returned to application
```

Understanding this flow helps explain how wallets, frontend applications, backend services, and smart contracts communicate with Ethereum.

### User or backend application

Contract interactions often begin from:

* Frontend applications
* Browser wallets
* Backend services
* Scripts or automation tools
* Other smart contracts

For example:

* A wallet may submit a token transfer transaction
* A frontend may query an ERC-20 token balance
* A backend service may monitor smart contract events

Applications usually use developer libraries such as `ethers.js`, `viem`, or `web3.js` to simplify communication with Ethereum.

### Developer libraries

Libraries provide high-level APIs for interacting with smart contracts.

Instead of manually constructing low-level Ethereum requests, developers can call contract functions directly in code:

```javascript
const balance = await contract.balanceOf(userAddress);
```

Under the hood, the library prepares the request data required by Ethereum nodes.

Developer libraries commonly handle:

* ABI parsing
* Function encoding
* Transaction creation
* Response decoding
* Event subscriptions

### ABI encoding and calldata

Ethereum nodes do not understand human-readable function calls directly. Contract function calls must first be encoded into a machine-readable format called calldata.

Developer libraries use the contract ABI (Application Binary Interface) to encode function calls and arguments into calldata.

For example, this Solidity function:

```solidity
function transfer(address to, uint256 amount) public
```

may be encoded into binary calldata before being sent to the network.

Calldata typically contains:

* A function selector
* Encoded function arguments

The function selector is derived from the first four bytes of the Keccak-256 hash of the function signature.

### JSON-RPC requests

After encoding calldata, the application sends a JSON-RPC request to an Ethereum node or RPC provider.

Ethereum nodes expose JSON-RPC APIs that applications use to:

* Read blockchain data
* Submit transactions
* Query logs and events
* Execute contract calls

Common JSON-RPC methods include:

* `eth_call`
* `eth_sendRawTransaction`
* `eth_getLogs`

A read operation may use `eth_call`, while a state-changing transaction is typically submitted using `eth_sendRawTransaction`.

### Ethereum nodes and RPC providers

Ethereum nodes receive JSON-RPC requests and interact with the Ethereum network.

Developers may:

* Run their own Ethereum node
* Use third-party RPC providers

Common RPC providers include:

* Infura
* Alchemy
* QuickNode

Nodes execute contract code inside the Ethereum Virtual Machine (EVM).

### EVM execution

The EVM processes smart contract instructions and executes the requested function.

During execution, the EVM may:

* Read or update blockchain state
* Transfer ETH or tokens
* Call other smart contracts
* Emit events
* Revert transactions on failure

For read-only calls, execution happens locally without changing blockchain state.

For transactions that modify state, the execution result must be validated and included in a block by the Ethereum network.

### Returning and decoding responses

After execution, Ethereum nodes return the result to the application.

Developer libraries then decode the response data using the contract ABI so applications can work with human-readable values.

For example, a raw binary response may be decoded into:

* Numbers
* Addresses
* Strings
* Arrays
* Structs

This allows applications to display contract data in a usable format for developers and users.

---

## Contract addresses {#contract-addresses}

Every deployed smart contract on Ethereum has its own unique address. Applications use this address to locate and interact with a specific contract on the blockchain.

A contract address is created when a smart contract is deployed to the network. Once deployed, the contract's code and state become accessible at that address.

Applications typically need two things to interact with a contract:

* The contract address
* The contract ABI

For example:

```javascript
const contract = new ethers.Contract(
  CONTRACT_ADDRESS,
  abi,
  provider
);
```

In this example, `CONTRACT_ADDRESS` tells the application which deployed contract to communicate with.

### Different networks use different addresses

A smart contract may be deployed to multiple Ethereum networks, such as:

* Ethereum mainnet
* Sepolia testnet
* Holesky testnet
* Local development networks

Each deployment generates a different contract address.

For example:

```text
Mainnet  → 0x1234...
Sepolia  → 0xabcd...
Local    → 0x9876...
```

Because of this, applications must use the correct contract address for the network they are connected to.

### Chain IDs

Ethereum networks are identified using chain IDs. Chain IDs help applications and wallets distinguish between networks and prevent transactions from being replayed across multiple chains.

Examples of Ethereum chain IDs include:

| Network          | Chain ID |
| ---------------- | -------- |
| Ethereum mainnet | 1        |
| Sepolia          | 11155111 |
| Holesky          | 17000    |

Applications often check the current chain ID before interacting with a contract to ensure users are connected to the correct network.

Using the wrong network or contract address may cause:

* Failed transactions
* Incorrect data
* Interaction with unintended contracts

For this reason, developers should always verify contract addresses and network configuration before sending transactions.

---

## Understanding contract ABIs {#abis}

ABI stands for **Application Binary Interface**.

An ABI defines how applications and other smart contracts interact with a deployed smart contract. It describes the contract's external interface in a machine-readable format that developer tools and Ethereum nodes can understand.

Applications use ABIs to:

* Encode function calls into calldata
* Decode values returned from contract execution
* Listen for contract events
* Decode transaction logs and errors

Without an ABI, applications would not know:

* Which functions a contract exposes
* What arguments functions expect
* What values functions return
* Which events a contract emits

### What information does an ABI contain?

An ABI commonly includes definitions for:

* Functions
* Function inputs
* Function outputs
* Events
* Errors

For example, consider the following Solidity function:

```solidity
function balanceOf(address account) public view returns (uint256)
```

A simplified ABI representation may look like this:

```json
[
  {
    "type": "function",
    "name": "balanceOf",
    "stateMutability": "view",
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "outputs": [
      {
        "type": "uint256"
      }
    ]
  }
]
```

This ABI entry tells applications:

* The contract exposes a function named `balanceOf`
* The function accepts an `address`
* The function returns a `uint256`
* The function is read-only (`view`)

Developer libraries such as `ethers.js`, `viem`, and `web3.js` use this ABI information to correctly encode requests and decode responses.

### Functions

Function definitions describe callable contract functions and their parameters.

For example:

```solidity
function transfer(address to, uint256 amount)
```

The ABI defines:

* Function name
* Parameter types
* Return types
* State mutability

Applications use this information to construct valid contract calls.

### Inputs and outputs

ABIs define the types of data a function accepts and returns.

Examples of common Solidity types include:

* address
* uint256
* bool
* string
* arrays
* structs

Developer libraries use ABI definitions to properly encode and decode these values when interacting with Ethereum.

### Events

Contracts can emit events during execution. ABIs describe event names and parameters so applications can listen for and decode logs.

For example:

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Applications use ABI event definitions to:

* Monitor blockchain activity
* Build analytics dashboards
* Track token transfers
* Trigger notifications

### Errors

ABIs may also define custom errors returned during failed execution.

For example:

```solidity
error Unauthorized(address caller);
```

Developer tools can use ABI error definitions to decode revert data into human-readable messages.

### Why applications need ABIs

Ethereum nodes only process low-level binary data. They do not understand human-readable function names or parameter types directly.

ABIs act as a translation layer between applications and smart contracts.

When an application calls a function such as:

```javascript
await contract.balanceOf(userAddress);
```

the developer library uses the ABI to:

1. Encode the function call into calldata
2. Send the request to an Ethereum node
3. Decode the returned data into readable values

This standardized interface allows applications, wallets, and other smart contracts to interact reliably with deployed contracts across the Ethereum ecosystem.

---

## ABI encoding and calldata {#calldata}

Ethereum nodes and the EVM do not understand human-readable function calls directly. Before a smart contract function can be executed, the function call and its arguments must be converted into a machine-readable format called calldata.

Developer libraries such as `ethers.js`, `viem`, and `web3.js` automatically handle this process using the contract ABI.

### What is calldata?

Calldata is encoded data sent to a smart contract during a function call or transaction.

It typically contains:

* A function selector
* Encoded function arguments

For example:

```solidity
function transfer(address to, uint256 amount)
```

When an application calls this function, the function name and arguments are encoded into calldata before being sent to the Ethereum network.

### Function selectors

Every contract function has a unique function selector.

A function selector is generated by:

1. Taking the function signature
2. Computing its Keccak-256 hash
3. Using the first 4 bytes of the hash

The function signature includes:

* Function name
* Parameter types

For example:

```text
transfer(address,uint256)
```

After hashing this signature with Keccak-256, the first 4 bytes become the function selector:

```text
a9059cbb
```

This selector tells the EVM which contract function should be executed.

### Encoding function arguments

After the function selector, the function arguments are ABI-encoded and appended to the calldata.

For example:

```text
Function selector
+ encoded address
+ encoded uint256
```

The final calldata may look similar to:

```text
0xa9059cbb000000000000000000000000...
```

Although this format appears complex, developer libraries handle the encoding automatically.

### How calldata is used

When an Ethereum node receives a contract interaction:

1. The EVM reads the first 4 bytes of calldata
2. The function selector identifies which function to execute
3. The remaining calldata is decoded into function arguments
4. The contract function executes using those values

This standardized encoding system allows applications and smart contracts to communicate consistently across the Ethereum ecosystem.

In most cases, developers do not need to manually encode calldata because developer libraries perform ABI encoding automatically behind the scenes.

---

## JSON-RPC and Ethereum nodes {#json-rpc}

Applications communicate with Ethereum networks through Ethereum nodes using a standard communication protocol called JSON-RPC.

JSON-RPC allows applications, wallets, and developer tools to send requests to Ethereum nodes and receive blockchain data or execution results in response.

For example, applications use JSON-RPC to:

* Read blockchain state
* Submit transactions
* Query contract events
* Fetch account balances
* Interact with smart contracts

### Ethereum nodes and clients

Ethereum nodes are software instances that participate in the Ethereum network.

Nodes:

* Store blockchain data
* Validate transactions and blocks
* Execute smart contract code
* Expose APIs for applications

Ethereum nodes are run using Ethereum clients such as:

* Geth
* Nethermind
* Besu
* Erigon

Applications typically do not communicate with the blockchain directly. Instead, they send JSON-RPC requests to an Ethereum node.

### RPC providers

Developers can either:

* Run their own Ethereum node
* Use third-party RPC providers

RPC providers operate Ethereum nodes and expose APIs that applications can use without managing node infrastructure themselves.

Common RPC providers include:

* Infura
* Alchemy
* QuickNode
* Cloudflare Ethereum Gateway

Developer libraries such as `ethers.js`, `viem`, and `web3.js` use these providers to communicate with Ethereum networks.

For example:

```javascript
const provider = new ethers.JsonRpcProvider(RPC_URL);
```

In this example, the provider connects the application to an Ethereum node using an RPC endpoint.

### Common JSON-RPC methods

Ethereum nodes expose many JSON-RPC methods for interacting with the blockchain.

Some commonly used methods include:

| Method                   | Description                                                       |
| ------------------------ | ----------------------------------------------------------------- |
| `eth_call`               | Executes a read-only contract call without creating a transaction |
| `eth_sendRawTransaction` | Broadcasts a signed transaction to the network                    |
| `eth_getLogs`            | Retrieves contract events and logs                                |
| `eth_getBalance`         | Returns the ETH balance of an account                             |
| `eth_blockNumber`        | Returns the latest block number                                   |

### Read operations with `eth_call`

Read-only interactions typically use `eth_call`.

These calls:

* Do not modify blockchain state
* Do not require gas fees from the user
* Are executed locally by the node

For example, applications often use `eth_call` to:

* Read token balances
* Query protocol state
* Fetch NFT ownership data

### Transactions with `eth_sendRawTransaction`

State-changing interactions are submitted using transactions.

After a wallet signs a transaction, the signed transaction data is broadcast to the network using `eth_sendRawTransaction`.

Ethereum nodes then:

1. Validate the transaction
2. Execute the contract function
3. Include the transaction in a block if successful

### Querying events with `eth_getLogs`

Smart contract events are stored as transaction logs on Ethereum.

Applications use `eth_getLogs` to:

* Retrieve historical events
* Monitor token transfers
* Track protocol activity
* Build analytics systems

Developer libraries often provide higher-level abstractions for working with logs and events, but these tools ultimately rely on JSON-RPC methods under the hood.

JSON-RPC provides the communication layer that connects applications and developer tools to Ethereum networks.

---

## Interacting with contracts using JavaScript {#javascript}

JavaScript is one of the most common ways to interact with Ethereum smart contracts. Frontend applications, backend services, scripts, and browser wallets often use JavaScript libraries to communicate with Ethereum nodes and deployed contracts.

Popular JavaScript libraries for Ethereum development include:

* `ethers.js`
* `viem`
* `web3.js`

These libraries provide APIs for:

* Reading contract data
* Sending transactions
* Encoding and decoding ABI data
* Listening for events
* Managing wallets and signers
* Communicating with Ethereum nodes through JSON-RPC

For example, developer libraries allow applications to interact with contracts using high-level function calls instead of manually constructing calldata and JSON-RPC requests.

Different libraries may provide different APIs and developer experiences, but they generally perform the same underlying tasks when communicating with Ethereum networks.

Learn more about Ethereum JavaScript libraries in the [JavaScript API documentation](https://ethereum.org/developers/docs/apis/javascript/).

For a hands-on example of calling smart contract functions from a JavaScript application, see [Calling a smart contract from JavaScript](https://ethereum.org/developers/tutorials/calling-a-smart-contract-from-javascript/).

---

## Wallet interaction {#wallets}

Wallets allow users to manage Ethereum accounts and interact with smart contracts securely.

Most wallets manage:

* Private keys
* Account addresses
* Transaction signing
* Network connections

When users interact with a smart contract from a frontend application, the wallet is typically responsible for authorizing and signing the transaction before it is sent to the Ethereum network.

### Transaction signing

State-changing smart contract interactions require a signed transaction from an externally owned account (EOA).

For example, wallets are commonly used when users:

* Transfer tokens
* Swap assets
* Mint NFTs
* Stake tokens
* Vote in governance systems

Before a transaction is submitted, the wallet usually prompts the user to:

* Review transaction details
* Approve gas fees
* Confirm the contract interaction

After approval, the wallet signs the transaction using the user's private key and broadcasts it to the network through an Ethereum node or RPC provider.

### Frontend wallet connection flow

Frontend applications commonly connect to browser wallets to interact with smart contracts on behalf of users.

A typical interaction flow looks like this:

```text
Frontend application
            ↓
Browser wallet
            ↓
User approves request
            ↓
Wallet signs transaction
            ↓
Transaction sent to Ethereum network
```

This connection allows applications to request account access and submit transactions using the user's wallet.

### Injected providers

Many browser wallets inject an Ethereum provider object into web applications.

This provider allows frontend applications to:

* Request account access
* Read blockchain data
* Send transactions
* Interact with smart contracts

For example, browser wallets often expose:

```javascript
window.ethereum
```

Developer libraries such as `ethers.js`, `viem`, and `web3.js` can use this provider to communicate with the wallet and Ethereum network.

### EIP-1193

[EIP-1193](https://eips.ethereum.org/EIPS/eip-1193) defines a standard interface for Ethereum providers used by wallets and applications.

This standard improves compatibility between wallets, developer tools, and frontend applications by defining consistent methods and events for Ethereum interactions.

### MetaMask and other wallets

MetaMask is one of the most widely used Ethereum browser wallets and supports smart contract interactions through injected providers.

Other wallets may also implement the EIP-1193 provider standard, allowing applications to interact with different wallets using a similar interface.

Wallets play an important role in Ethereum applications by enabling users to securely authorize smart contract interactions without exposing private keys to frontend applications.

---

## Events and logs {#events}

Smart contracts can emit **events** during execution to record important actions on the blockchain. Events provide an efficient way for applications to track contract activity without repeatedly querying contract state.

When an event is emitted, it is stored in the transaction receipt as a **log**. Applications, indexers, and analytics platforms can then retrieve and process these logs.

Common uses for events include:

* Tracking token transfers
* Monitoring governance actions
* Recording NFT mints
* Triggering notifications
* Building analytics dashboards

### Defining events in Solidity

Events are declared using the `event` keyword.

For example, the ERC-20 token standard defines a `Transfer` event:

```solidity
event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
);
```

A contract can emit the event during execution:

```solidity
emit Transfer(msg.sender, recipient, amount);
```

When the transaction is included in a block, the event data becomes available in the transaction logs.

### Indexed parameters

Event parameters can be marked as `indexed`.

Indexed parameters are stored separately as topics, making them easier to search and filter.

In the previous example:

```solidity
event Transfer(
    address indexed from,
    address indexed to,
    uint256 value
);
```

The `from` and `to` addresses are indexed, allowing applications to efficiently find transfers involving specific accounts.

Up to three event parameters can be marked as `indexed` (excluding the event signature topic).

### Filtering logs

Applications often filter logs to retrieve only relevant events.

Examples include:

* Transfers involving a specific address
* Events emitted by a particular contract
* Events within a specific block range

Ethereum nodes expose methods such as `eth_getLogs` that allow applications to search and filter historical event data.

### Listening for events in JavaScript

Developer libraries provide APIs for subscribing to contract events.

For example, using `ethers.js`:

```javascript
contract.on("Transfer", (from, to, value) => {
  console.log(
    `Transfer from ${from} to ${to}: ${value}`
  );
});
```

When a new `Transfer` event is emitted, the callback function receives the decoded event data.

### Events versus contract storage

Events and contract storage serve different purposes:

| Contract storage            | Events and logs                  |
| --------------------------- | -------------------------------- |
| Stores persistent state     | Records execution activity       |
| Accessible by contract code | Accessible off-chain             |
| More expensive to update    | Generally cheaper than storage   |
| Used for application state  | Used for monitoring and indexing |

Events are a key part of the Ethereum ecosystem because they allow applications, wallets, explorers, and indexing services to efficiently track smart contract activity without continuously reading contract state.

---

## Contract-to-contract interaction {#contract-to-contract}

Smart contracts are not limited to interacting with users and applications. They can also interact with other smart contracts, allowing multiple protocols and applications to work together on-chain.

This ability is often referred to as **composability**, one of Ethereum's most powerful features. Because smart contracts are publicly accessible and follow standardized interfaces, developers can build applications that integrate with existing contracts instead of creating everything from scratch.

For example, a decentralized finance (DeFi) protocol may:

* Retrieve token balances from an ERC-20 contract
* Obtain price data from an oracle
* Deposit assets into a lending protocol
* Execute token swaps through a decentralized exchange

All of these interactions can occur within a single transaction.

### Using interfaces

Contracts typically interact with other contracts through **interfaces**.

An interface defines the functions that another contract exposes without including the implementation details.

For example:

```solidity
interface IERC20 {
    function balanceOf(address account)
        external
        view
        returns (uint256);

    function transfer(
        address to,
        uint256 amount
    ) external returns (bool);
}
```

A contract can then use the interface to call functions on an ERC-20 token contract:

```solidity
IERC20 token = IERC20(tokenAddress);

uint256 balance = token.balanceOf(msg.sender);
```

This allows contracts to interact with external contracts without needing access to their source code.

### External calls

When one contract calls a function on another contract, it performs an **external call**.

For example:

```solidity
token.transfer(recipient, amount);
```

During execution:

1. The calling contract sends a request to the target contract
2. The target contract executes the requested function
3. Control returns to the calling contract

External calls may:

* Return data
* Emit events
* Update blockchain state
* Revert if execution fails

Because external calls can fail, developers often include error handling and validation when integrating with other contracts.

### Composability in practice

Composability enables developers to combine multiple protocols and services into more complex applications.

Examples include:

* Lending protocols that integrate price oracles
* Yield aggregators that interact with multiple DeFi platforms
* NFT marketplaces that interact with ERC-721 contracts
* Smart contract wallets that execute transactions on behalf of users

This "building block" approach allows developers to reuse existing infrastructure and accelerate innovation across the Ethereum ecosystem.

Learn more about [smart contract composability](https://ethereum.org/developers/docs/smart-contracts/composability/).

---

## Backend and server-side interaction {#backend}

Smart contract interactions are not limited to frontend applications and wallets. Many Ethereum applications rely on backend services to monitor blockchain activity, automate workflows, and process on-chain data.

Backend systems can interact with smart contracts in much the same way as frontend applications by using Ethereum libraries and RPC providers. However, backend services often operate continuously without direct user interaction.

Common backend use cases include:

* Monitoring contract activity
* Processing events and logs
* Automating transactions
* Running trading or arbitrage bots
* Building analytics dashboards
* Synchronizing blockchain data with databases

### Monitoring smart contracts

Backend services often monitor contracts for specific events or state changes.

For example, a backend service may:

* Track token transfers
* Monitor NFT minting activity
* Detect governance proposals
* Watch staking deposits and withdrawals

By listening to contract events, applications can react to on-chain activity in near real time.

### Automation and bots

Backend services can automate smart contract interactions based on predefined rules.

Examples include:

* Liquidation bots for lending protocols
* Trading and arbitrage bots
* Reward distribution systems
* Automated treasury management
* Scheduled maintenance tasks

These systems typically monitor blockchain data and submit transactions when specific conditions are met.

### Indexers and analytics

Reading blockchain data directly from Ethereum nodes can become inefficient for complex applications.

To improve performance, many applications use indexers that process blockchain data and store it in databases optimized for searching and analytics.

Indexers are commonly used for:

* Transaction history
* Token analytics
* Portfolio tracking
* Blockchain explorers
* DeFi dashboards

Rather than querying blockchain state repeatedly, applications can retrieve preprocessed data from indexed databases.

### Common backend languages

Developers use a variety of programming languages to build backend systems that interact with Ethereum.

Popular choices include:

* Node.js
* Python
* Go

These languages have mature Ethereum libraries and tooling for interacting with nodes, processing events, and submitting transactions.

### Connecting to Ethereum

Backend services typically communicate with Ethereum through RPC providers or self-hosted Ethereum nodes.

A common backend interaction flow looks like this:

```text
Backend Service
        ↓
Ethereum Library
        ↓
RPC Provider / Node
        ↓
Ethereum Network
```

This architecture enables applications to monitor blockchain activity, query contract data, and submit transactions programmatically.

Learn more about backend APIs and infrastructure providers in the [Backend API documentation](https://ethereum.org/developers/docs/apis/backend/).

---

## Security considerations {#security}

Interacting with smart contracts often involves managing assets, permissions, and sensitive operations. Before interacting with a contract, developers and users should understand the potential risks and follow security best practices.

### Malicious contracts

Not all deployed contracts are trustworthy. A contract's code may contain vulnerabilities, hidden functionality, or intentionally malicious behavior.

Examples include:

* Unauthorized fund transfers
* Misleading user interfaces
* Hidden administrative privileges
* Fraudulent token contracts

Before interacting with a contract, developers should review the contract's source code when available and verify that the contract address matches the intended deployment.

### Approval risks

Many applications require users to approve token spending permissions before assets can be transferred on their behalf.

For example, ERC-20 tokens commonly use the `approve` function to grant spending permissions to another contract.

Excessive approvals can introduce risk because a contract may be able to spend more tokens than intended if permissions are not managed carefully.

Developers and users should:

* Understand what permissions are being granted
* Review approval amounts before confirming transactions
* Revoke unused approvals when they are no longer needed

### Verifying contract addresses

Applications rely on contract addresses to identify deployed contracts.

Using an incorrect address can result in:

* Failed transactions
* Incorrect data
* Interaction with malicious contracts

Before interacting with a contract, verify:

* The contract address
* The network being used
* The expected deployment source

Official documentation, project websites, and verified blockchain explorers can help confirm deployment addresses.

### Chain mismatch

Smart contracts often exist on multiple networks, each with different contract addresses.

For example, a contract deployed on Ethereum mainnet will typically have a different address on a testnet.

If an application is connected to the wrong network:

* Transactions may fail
* Contract calls may return unexpected results
* Users may interact with unintended contracts

Applications should verify the current chain ID and prompt users to switch networks when necessary.

### Upgradeable contracts

Some smart contracts are designed to be upgradeable, allowing their implementation logic to change after deployment.

Upgradeable contracts can provide flexibility and enable bug fixes, but they also introduce additional trust assumptions.

When interacting with upgradeable contracts, consider:

* Who controls upgrades
* Whether upgrades are governed by a multisig or DAO
* The protocol's upgrade process
* Potential changes to contract behavior over time

Understanding the upgrade model helps users and developers evaluate the risks associated with a protocol.

### Security best practices

When interacting with smart contracts:

* Verify contract addresses before sending transactions
* Confirm the correct network and chain ID
* Review transaction details before signing
* Understand token approval permissions
* Prefer audited and well-established protocols when possible
* Monitor contract upgrades and governance changes
* Test integrations on testnets before deploying to production
* Handle transaction failures and contract reverts gracefully

Security is a shared responsibility between protocol developers, application developers, and users. Taking time to verify contracts and understand permissions can help reduce the risk of unintended interactions and asset loss.

---

## Further reading {#further-reading}

To continue learning about smart contract development and interaction on Ethereum, explore the following resources:

### Core Ethereum concepts

* [Smart contracts](/developers/docs/smart-contracts/) – Learn how smart contracts work, their capabilities, and limitations.
* [Ethereum accounts](/developers/docs/accounts/) – Understand externally owned accounts (EOAs) and contract accounts.
* [Transactions](/developers/docs/transactions/) – Learn how transactions are created, signed, and executed.
* [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) – Explore the execution environment for smart contracts.

### Ethereum APIs and infrastructure

* [JavaScript APIs](/developers/docs/apis/javascript/) – Learn about popular Ethereum JavaScript libraries such as ethers.js, viem, and web3.js.
* [Backend APIs](/developers/docs/apis/backend/) – Explore infrastructure providers and backend tools for interacting with Ethereum.
* [JSON-RPC API](/developers/docs/apis/json-rpc/) – Learn about the standard API used by applications to communicate with Ethereum nodes.

### Tutorials

* [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) – A step-by-step guide to interacting with deployed contracts using JavaScript.
* [Developer tutorials](/developers/tutorials/) – Explore additional Ethereum development tutorials and guides.

### Related topics

* [Smart contract composability](https://ethereum.org/developers/docs/smart-contracts/composability/) – Learn how smart contracts can interact with one another.
* [Oracles](https://ethereum.org/developers/docs/oracles/) – Understand how smart contracts access offchain data.
* [Gas and fees](https://ethereum.org/developers/docs/gas/) – Learn how transaction fees work on Ethereum.
* [ERC-20 token standard](https://ethereum.org/developers/docs/standards/tokens/erc-20/) – Explore the most widely used token standard on Ethereum.
