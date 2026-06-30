---
title: Interacting with smart contracts
description: A guide on how to interact with smart contracts, including querying, mutating, ABIs, and tools.
lang: en
---

Smart contracts are programs living on the Ethereum blockchain. Once deployed, they are not just static code; they are meant to be interacted with. Interactions can come from users (via a frontend interface), offchain scripts, or even other smart contracts.

This page explains the fundamental concepts of interacting with smart contracts, the different types of interactions, and the tools developers use to build these interactions.

## Prerequisites {#prerequisites}

Make sure you've read about [smart contracts](/developers/docs/smart-contracts/), [accounts](/developers/docs/accounts/) and the [Ethereum Virtual Machine (EVM)](/developers/docs/evm/) before jumping into interacting with smart contracts.

## Querying vs mutating data {#querying-vs-mutating}

There are two primary ways to interact with a smart contract: **calling** (querying) and **transacting** (mutating).

### Querying data (calls) {#contract-calls}

Querying data involves reading the state of a smart contract without changing it. This is done using a "call".

- **Cost**: Free (no [gas](/developers/docs/gas/) fees) when executed from offchain (e.g., via a wallet or script)
- **Speed**: Immediate return
- **Mechanism**: The node executes the function locally and returns the result; no transaction is broadcast to the network
- **Example**: Checking the balance of an ERC-20 token using `balanceOf(address)`

### Mutating data (transactions) {#contract-transactions}

Mutating data involves sending a transaction that changes the state of the blockchain.

*   **Cost**: Requires [gas](/developers/docs/gas/) fees (paid in ETH).
*   **Speed**: Asynchronous. You must wait for the transaction to be included in a block and confirmed.
*   **Mechanism**: The transaction is cryptographically signed, broadcast to the network, and executed by all network nodes.
*   **Example**: Sending tokens using `transfer(address, amount)`.

## Contract ABIs {#contract-abis}

To interact with a smart contract, you need to know its **Application Binary Interface (ABI)**. You can learn more about compilation and ABIs in the [compilation guide](/developers/docs/smart-contracts/compiling/).

The ABI is the standard way to interact with contracts in the Ethereum ecosystem, both from outside the blockchain and for contract-to-contract interaction. Data is encoded according to its type, as described in the [ABI specification](https://docs.soliditylang.org/en/latest/abi-spec.html).

### Why do we need ABIs? {#abis-why}

Smart contracts are compiled into **bytecode** (a series of opcodes) which is what the **Ethereum Virtual Machine (EVM)** executes. Bytecode is not human-readable.

When you want to call a function like `transfer`, you cannot just send the string "transfer" to the EVM. Instead, you need to:

1. Calculate the **function selector** (the first 4 bytes of the Keccak-256 hash of the function signature)
2. Encode the arguments according to the ABI specification

The ABI serves as a map between the human-readable function definitions and the machine-readable format required by the EVM.

### What does an ABI look like? {#abis-structure}

An ABI is typically represented as a JSON array of objects. Each object describes a function, event, or error.

Here is a simplified example of an ABI for a function `update(uint value)`:

```json
[
  {
    "type": "function",
    "name": "update",
    "stateMutability": "nonpayable",
    "inputs": [
      {
        "name": "value",
        "type": "uint256"
      }
    ],
    "outputs": []
  }
]
```

Tools and libraries use this JSON to automatically encode your calls and transactions into the correct format for the EVM.

## Tools and libraries {#tools-and-libraries}

Developers rarely manually encode data for the EVM. Instead, they use specialized libraries that handle the complexity of ABIs, JSON-RPC connections, and wallet management.

### JavaScript libraries {#javascript-libraries}

There are many libraries that make it easier to interact with Ethereum. We recommend checking out our dedicated page on [JavaScript API libraries](/developers/docs/apis/javascript/) for a list of available tools and tutorials.

### Backend APIs {#backend-apis}

To interact with the blockchain, your application needs to communicate with an Ethereum node. While you're encouraged to [run your own node](/developers/docs/nodes-and-clients/run-a-node/), many developers use node providers (RPC providers) to handle the infrastructure.

- [Alchemy](https://www.alchemy.com/)
- [Infura](https://www.infura.io/)
- [QuickNode](https://www.quicknode.com/)

These providers expose the [JSON-RPC API](/developers/docs/apis/json-rpc/), which libraries like the ones mentioned above connect to.

## Further reading {#further-reading}

- [Calling a smart contract from JavaScript (tutorial)](/developers/tutorials/calling-a-smart-contract-from-javascript/)
- [Compiling smart contracts](/developers/docs/smart-contracts/compiling/)
- [Ethereum Client APIs](/developers/docs/apis/javascript/)
