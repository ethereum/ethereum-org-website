---
title: Uncovering the power of eth_getBlockReceipts
description: Explaining eth_getBlockReceipts and how to leverage it to create more powerful and efficient applications.
author: Davide Zambiasi
lang: en
tags: ["chainstack", "ethers.js", "nodes"]
skill: intermediate
published: 2023-03-07
source: Chainstack
sourceUrl: https://docs.chainstack.com/docs/uncovering-the-power-of-ethgetblockreceipts
---
## Overview

`eth_getBlockReceipts` is a powerful JSON-RPC method available on nodes running the [Erigon client](https://github.com/ledgerwatch/erigon). This article will explore how it works and how you can use it to make powerful and more efficient applications.

## The Erigon client

Erigon is one of the most popular Ethereum clients and is written in [Go](https://go.dev/). It is very much inspired by [Go Ethereum](https://geth.ethereum.org/). Still, it focuses on efficiency, which allows a user to synchronize a new node much faster and use fewer resources, especially when talking about storage requirements.

This is why Erigon is gaining popularity, and you can read our [Erigon vs Geth guide](https://chainstack.com/ethereum-clients-geth-and-erigon/) if you are interested in understanding more about the underlying principles and architecture. 

Compared to Geth, Erigon comes with some unique JSON-RPC methods, and `eth_getBlockReceipts` is one of them. Let’s dive into it.

## `eth_getBlockReceipts` explained

The `eth_getBlockReceipts` method is a JSON-RPC method that allows you to retrieve the receipts for all transactions included in a block and takes the block identifier as a parameter.

You can send a [curl](https://curl.se/) request to call this method using the following syntax:

```curl
curl -X POST "CHAINSTACK_ARCHIVE_NODE_URL" \
  -H 'Content-Type: application/json' \
  --data '{"method":"eth_getBlockReceipts","params":["latest"], "jsonrpc":"2.0","id":1}'
```

## Parameters accepted

`eth_getBlockReceipts` only takes one parameter to identify the block, and you have a few options, a string tag or a block identifier.

For `tag`, you can use one of the following options:

- `latest` — the latest validated block. At this stage, it is likely that the chain will be reorganized, so be careful using this one.
- `safe` — a safe head of the chain block. Under normal circumstances, a safe block will not be reorganized.
- `finalized` — the block that is accepted by two-thirds of the Ethereum validators, and a reorganization at this point is extremely unlikely.
- `earliest` — the earliest available or genesis block.
- `pending` — the pending state and transactions block.

Alternatively, you can also specify `blocknumber` either as a decimal or encoded as hexadecimal starting with `0x`. For example:

- Block number `16341960` will be `0xF95BC8` in hexadecimal.

  > 📘 Decimal \<> hexadecimal converter
  > 
  > To convert a decimal integer to hexadecimal, you can use an [online converter](https://www.rapidtables.com/convert/number/decimal-to-hex.html) or a library like Ethers.

As a bonus, here is an example showing how to make a simple function to convert to hexadecimal using one of ethers.js utilities.

```js block number converter
// Import the ethers library
const ethers = require('ethers');

// The function takes a decimal integer as a parameter 
function toHex(decimal) {
    const hex = ethers.utils.hexlify(decimal)
    const fixPadding = ethers.utils.hexStripZeros(hex)

    return fixPadding  
}

// Call the function and display the result
const blockInHex = toHex(16341960)
console.log(blockInHex)

// result -> 0xf95bc8
```

Using a web3.js library has its benefits since it already adds `0x`.

## eth_getBlockReceipts response

The response returned by this method will be an array of **transaction receipts** for all the transactions included in the block specified in the method call. 

So, what is a transaction receipt? A transaction receipt is a record of a transaction that has been processed by the network. When you send a transaction on the Ethereum blockchain, for example, the transaction is broadcast to all nodes on the network. Once the transaction has been included in a block and added to the blockchain, a receipt is generated that contains information about the transaction.

Here is an example of such a response:

```json
{
         "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
         "blockNumber":"0xf959a7",
         "contractAddress":null,
         "cumulativeGasUsed":"0x2aa60",
         "effectiveGasPrice":"0x1033e0d411",
         "from":"0xeb00c0f8bb1ddf074b464dbcbe32164ad00e1a4b",
         "gasUsed":"0x2aa60",
         "logs":[
            {
               "address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
               "topics":[
                  "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
                  "0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d"
               ],
               "data":"0x0000000000000000000000000000000000000000000000000058d15e17628000",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x0",
               "removed":false
            },
            {
               "address":"0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
               "topics":[
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  "0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d",
                  "0x0000000000000000000000009ac96265a4e63dacc86c6e3f4ab547fbcf93e899"
               ],
               "data":"0x0000000000000000000000000000000000000000000000000058d15e17628000",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x1",
               "removed":false
            },
            {
               "address":"0xa6cd7dbfb83e2d963d6867eb3d65c64013217fc7",
               "topics":[
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  "0x0000000000000000000000009ac96265a4e63dacc86c6e3f4ab547fbcf93e899",
                  "0x000000000000000000000000a6cd7dbfb83e2d963d6867eb3d65c64013217fc7"
               ],
               "data":"0x0000000000000000000000000000000000000000000000000039d4c88723482c",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x2",
               "removed":false
            },
            {
               "address":"0xa6cd7dbfb83e2d963d6867eb3d65c64013217fc7",
               "topics":[
                  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                  "0x0000000000000000000000009ac96265a4e63dacc86c6e3f4ab547fbcf93e899",
                  "0x000000000000000000000000eb00c0f8bb1ddf074b464dbcbe32164ad00e1a4b"
               ],
               "data":"0x000000000000000000000000000000000000000000000000044acae2079e7280",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x3",
               "removed":false
            },
            {
               "address":"0x9ac96265a4e63dacc86c6e3f4ab547fbcf93e899",
               "topics":[
                  "0x1c411e9a96e071241c2f21f7726b17ae89e3cab4c78be50e062b03a9fffbbad1"
               ],
               "data":"0x0000000000000000000000000000000000000000000000016978e1b70b8b28fa0000000000000000000000000000000000000000000000001c0576b9739871d1",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x4",
               "removed":false
            },
            {
               "address":"0x9ac96265a4e63dacc86c6e3f4ab547fbcf93e899",
               "topics":[
                  "0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822",
                  "0x0000000000000000000000007a250d5630b4cf539739df2c5dacb4c659f2488d",
                  "0x000000000000000000000000eb00c0f8bb1ddf074b464dbcbe32164ad00e1a4b"
               ],
               "data":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000058d15e1762800000000000000000000000000000000000000000000000000004849faa8ec1baac0000000000000000000000000000000000000000000000000000000000000000",
               "blockNumber":"0xf959a7",
               "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
               "transactionIndex":"0x0",
               "blockHash":"0x72b42a924425d37e4529b9e1bb0082bfad4d6b13761878a2ba641b13cad7d21f",
               "logIndex":"0x5",
               "removed":false
            }
         ],
         "logsBloom":"0x00200000000000000000000080000000000000020000000000010000000000000000000000200000000000000000004082000000080000000000000000000000000000000000804000000008000000600000000000000000000000008000000000000000000000000000000000000000000000000000000000000010000000000000000000000000004000000000000000000001000000080000004000000800000000000800000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000001000000000808020000000200000c00000000000800000000000000000000000410000000000000000",
         "status":"0x1",
         "to":"0x7a250d5630b4cf539739df2c5dacb4c659f2488d",
         "transactionHash":"0x0edddb16d2ab807043427090f46a7bc2196908d4a1d4ae2125ce220d4a9c0a4d",
         "transactionIndex":"0x0",
         "type":"0x2"
      },
```

> 📘 
> 
> Check the details about the `eth_getBlockReceipts` response in the [Chainstack docs](https://docs.chainstack.com/reference/ethereum-getblockreceipts).

A `eth_getBlockReceipts` call will return the following parameters:

- `result` — an array of objects with:
  - `Transaction receipt` — the object with:
    - `blockHash` — the block hash. Identifies the block in which the transaction was included. This field is `null` for transactions that have not yet been included in a block.
    - `blockNumber` — the number of the block in which the transaction was included. This field is `null` for transactions that have not yet been included in a block.
    - `contractAddress` — the address of the contract created by the transaction if it was a contract creation transaction. Otherwise, the value is `null`.
    - `cumulativeGasUsed` — the total amount of gas used in the block until this transaction was executed.
    - `effectiveGasPrice` — the actual value deducted from the sender's account for this transaction.
    - `from` — the address of the sender who initiated the transaction.
    - `gasUsed` — the amount of gas used by this specific transaction alone.
    - `logs` — an array of log objects generated by this transaction, if any. Logs are generated by smart contracts.
    - `logsBloom` — the bloom filter used by light clients to quickly retrieve logs related to the transaction.
    - `status` — the success status of the transaction, represented as `1` for success or `0` for failure.
    - `to` — the address of the recipient of the transaction if it was a transaction to an address. For contract creation transactions, this field is `null`.
    - `transactionHash` — the hash that uniquely identifies the transaction.
    - `transactionIndex` — the index of the transaction within the block.
    - `type` — the [type](https://ethereum.org/en/developers/docs/transactions/#types-of-transactions) of the transaction. `0` indicates a regular transfer; `2` indicates a contract creation or smart contract function call.

Transaction receipts contain details such as the transaction hash (a unique identifier for the transaction), the block number and hash in which the transaction was included, the amount of gas used by the transaction, and the status of the transaction (whether it was successful or encountered an error). Receipts also include the contract address of any contract created as a result of the transaction.

Transaction receipts are useful because they provide a way to track the success or failure of a transaction, as well as the amount of gas used and any logs emitted by the transaction.

## Difference between `eth_getBlockReceipts` and `eth_getBlockByNumber`

At this point, you are probably wondering why I’m talking about this specific method when `eth_getBlockByNumber` and `eth_getBlockByHash` are available in Geth and can also return the detail of each transaction in a block if we call it with the second parameter as `true`. The difference is that  `eth_getBlockReceipts` returns the receipt directly, including extra information you might want to extract. 

More noticeably, the receipt returns the event logs that might have been emitted by a smart contract during the transaction, the status of the transaction (_1 if successful and 0 if failed_), gas used, and more. 

Of course, you can use `eth_getTransactionReceipt` to get the receipt of a transaction that you might have identified using `eth_getBlockByNumber` instead of `eth_getBlockReceipts`, but why make more requests when you can be more efficient?

> 📘 Erigon code base on GitHub
> 
> Check out the Erigon code base on GitHub to see the source code of this method and how the data is retrieved:
> 
> - [eth_receipts.go](https://github.com/ledgerwatch/erigon/blob/devel/cmd/rpcdaemon/commands/eth_receipts.go#L593)

## Deploy an Erigon node with Chainstack

Chainstack supports the Erigon client on Ethereum, Polygon, and BNB smart chain [archive nodes](https://chainstack.com/evm-nodes-a-dive-into-the-full-vs-archive-mode/). This option is available on the [Business subscription plan](https://chainstack.com/pricing/) and higher on elastic nodes or starting from the [Growth subscription plan](https://chainstack.com/pricing/) for dedicated nodes.

Follow the steps to deploy an archive node running Erigon on elastic nodes:

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).
2. [Create a project](doc:manage-your-project#create-a-project).

After you created a project:

1. Select the project with the network.
2. Select the network.
3. Click **Add node**.
4. Provide a node name.
5. Under **Type**, select **Elastic**.
6. Under **Mode**, select **Archive**. With an archive node, you can query historical states for the entire chain.
7. Under **Debug and trace APIs**, select **On**.
8. Under **Hosting**, select **Chainstack**.
9. For Chainstack hosting, select a cloud provider and a region.
10. Review your changes and click **Add node**.

The node status will change from **Pending** to **Running** once deployed. You will also see the **Debug and trace** tag next to the node name. You can then verify in the Chainstack console that the client running is indeed Erigon. To do that, open your node details and check the **Clients** column.

Now you only need to copy your RPC endpoint and go BUIDL cool stuff.

## Let’s BUIDL

Now that you know how `eth_getBlockReceipts` works and how to get a node running Erigon for it, I want to show you how to use it with a practical example.

For this project, we’ll use [ethers.js](https://docs.ethers.org/v5/) to build a ‘smart contracts watcher’ tool that can examine a block using `eth_getBlockReceipts`, identify which transaction deploys a new smart contract, and give us details about it.

## The projects structure

The project is built in node.js and interacts with the blockchain using the Ethers library. 

> 📘 Project source code
> 
> Find the full code in the repository:
> 
> - [smart-contract-watcher](https://github.com/soos3d/smart-contract-watcher-chainstack)

This is what the structure looks like:

```sh
├── Root directory
    ├── index.js
    │
    │── src
    │   ├── provider.js
    │   ├── analyzer.js
    │ 	├── latestBlock.js
    │ 	├── parser.js
    │ 	├── ToHex.js
    │  
    ├──.env
```

Let’s explain what each file does:

| File           | Explanation                                                                                                                                                      |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| index.js       | The entry point of the project. It runs the main program.                                                                                                        |
| provider.js    | Creates a provider instance to be used from the other scripts.                                                                                                   |
| latestBlock.js | It holds the function to retrieve the latest block using ethers.js.                                                                                              |
| ToHex.js       | It has a function to convert a decimal number to hexadecimal using ethers.js utils.                                                                              |
| analyzer.js    | This file uses the functions from toHex.js and latestBlock.js; it calls `eth_getBlockReceipts` on the latest block and looks for new smart contract deployments. |
| parser.js      | It extracts the desired data from the transaction receipt and prints them to the console.                                                                        |
| .env           | It holds the node RPC URL.                                                                                                                                       |

## Inside the code

The bulk of the process is managed by the function in the `analyzer.js` file, which connects to the node and calls the `eth_getBlockReceipts` method.

```js
// Import the support scripts
const provider = require('./provider');
const { toHex } = require('./toHex')
const { latestBlock } = require('./latestBlock')
const { parseTransaction } = require('./parser')

const findSmartContract = async () => {

    // Find the latest block
    const blockToAnalyze = await latestBlock();

    // Convert the latest block to Hex
    const blockInHex = toHex(blockToAnalyze)

    // Sometimes Erigon returns an invalid response; try/catch will tell you if something is wrong.
    try {

        // Get the transaction receipts
        const blockReceipt = await provider.send("eth_getBlockReceipts", [blockInHex]);
        //console.log(blockReceipt);

        // Iterate over the transactions in the block
        for (const tx of blockReceipt) {

            if (tx.contractAddress != null) {

                // This function parses and prints the result
                parseTransaction(tx)
            }
        }
    } catch (error) {
        console.log(`An error occurred, please try again. \n ERROR: ${error}`)
    }
}

module.exports = {
    findSmartContract
}
```

This modular design helps keep the code clean and organized. Now onto the meat and potatoes.

The `findSmartContract` calls the `latestBlock` function to find the latest block on the network. It converts this block to hexadecimal format using the `toHex` function and then uses the `eth_getBlockReceipts` method of the `provider` instance to get the transaction receipts for the specified block.

> 📘 
> 
> The provider instance is created in the `provider.js` file and exported to be used where necessary.

The function then iterates over the transaction receipts in the block. For each transaction that has a non-null `contractAddress` field, it calls the `parseTransaction` function and passes the transaction as an argument. The logic here is that if the `contractAddress` field of the receipt is not empty, a new smart contract is deployed, and the field holds its address.

The `parseTransaction` then isolates the fields we are interested in and prints them to the console.

Sometimes the `latestBlock` and `toHex` functions might return a ‘non-iterable object’ from Erigon; this stops the program. For this, we use a `try`-`catch` block, and the error message will be logged to the console. You can also add some logic that does not stop the program in case there is an error and tries again automatically.

Finally, the function exports an object containing the `findSmartContract` function so that it can be imported and used by other parts of the program, the `main` function in `index.js` in this case.

This is a very simple example of how you can use `eth_getBlockReceipts` in the real world, and you can, for instance, add a listener to pick up every new block header and automatically scan the block for new contracts if you want to make it more advanced.

This is what you will get when the watcher finds a new smart contract:

```shell
$ npm run start
> smart-contract-watcher-chainstack@1.0.0 start
> node index.js

New smart contract detected! 
New smart contract address: 0x00e9a503b88732ee3e28a0fec3343c405f5e963d
Deployed by address: 0x984380fc12cc3bdb894e1f35111dd992fb52a231
Deployed by transaction: 0xad8d3a6647a4ad7e2f8eedef258b4c3233d54e5999a855ca59500f5df70d35de
```

> 📘 
> 
> Note that you might need to run the script multiple times before you find a contract deployment on mainnet.

## Conclusion

In summary, the `eth_getBlockReceipts` method is a powerful tool for developers working with the Erigon client. It allows them to retrieve the receipts for all of the transactions in a given block, which can be very useful to avoid calling multiple methods and keep programs easy and efficient.

Chainstack supports the Erigon client on Ethereum, BNB Smart Chain, and Polygon.

In this article, we also showed you a program that uses the `eth_getBlockReceipts` method to find new smart contracts deployed on the blockchain. It then uses the `eth_getBlockReceipts` method to retrieve the transaction receipts for the block and iterates over these receipts to find transactions deploying new smart contracts.
