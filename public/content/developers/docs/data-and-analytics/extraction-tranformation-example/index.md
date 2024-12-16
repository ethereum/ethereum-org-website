---
title: A Simple Extraction and Transformation Example
description: A practical example of extracting and decoding Ethereum transaction data, highlighting the steps in the process. Perfect for developers, analysts, and enthusiasts looking to explore Web3 data workflows.
lang: en
sidebarDepth: 3
---

Understanding Ethereum data and analysis is easiest when you see it in action. Let’s start with a simple yet practical scenario: a user makes a transaction, and we want to uncover the resulting actions (events) recorded on the blockchain.

This example is tailored for a wide audience—whether you're an app developer looking to display a transaction data in your application, a data analyst building metrics for token insights report, or simply a user or enthusiast curious about how Ethereum data is processed.

No matter your perspective, this example provides a hands-on way to understand Ethereum data extraction and transformation. For those who are not developers, don’t worry—we’ll include some code examples below, but focus on the comments and explanations that will break down the operations. The goal is to make the process clear and approachable for everyone, regardless of technical background.

## Extracting a transaction {#extraction}

```python
# Import the helpers libraries
import requests # Simplifies sending requests to APIs
import json # parse JSON objects (structured text) from simple text strings
from web3 import Web3 # library with functions helping interact with Ethereum, used here for decoding

# Define the connection to a node-as-a-service provider, avoiding the need to run our own node
node_as_service_api_url = "https://eth.llamarpc.com"
# Define the JSON-RPC method and the input parameters
payload = {
    "jsonrpc": "2.0",
    "method": "eth_getTransactionReceipt",
    "params": ["0x2f8edd9bba379efa228bf8f39396e908d83ea418c602a3dd1bf178749c1714c0"] #transaction_hash
}
# Send the data request, receive the response, and save it
response = requests.post(url=node_as_service_api_url, json=payload)
# Read the response
transaction_receipt = response.json()['result']
```

Accessing blockchain data starts by connecting with a [client node](/developers/docs/nodes-and-clients/). Running your own node can be daunting, so this example uses a [node-as-a-service](/developers/docs/nodes-and-clients/nodes-as-a-service/) provider. This service allows us to request the same data, using the same methods, as if we were running a node ourselves. Although connecting directly to a self-hosted node via its port would yield the same results, the node-as-a-service approach is more accessible and easily replicable.

Numerous methods are available via [JSON-RPC](/developers/docs/apis/json-rpc/) for requesting different types of data from an Ethereum node. For instance, you can retrieve a full block's information, query an account's ETH balance, or access transaction details. For those interested, a comprehensive list of methods and their expected outputs, which nodes must support, is available [here](https://ethereum.github.io/execution-apis/).

In this example, we’ll use the `eth_getTransactionReceipt` method, which retrieves detailed information about a specific transaction using its unique identifier (`transaction_hash`).

To handle the request, we use the `requests` library. The communication with the node, the call for data, and the storage of the response happen in a single line of code. The result is then translated into a [JSON object](https://en.wikipedia.org/wiki/JSON), which contains the transaction receipt—a structured summary of the transaction's execution details:

```json
{
	"blockHash": "0xf3cc3aa91392fb6dc9d4200ce2640b278f658ce3be2cb3ace288a42bdadeeee9",
	"blockNumber": "0xb504e1",
	"from": "0x37918a209697488c3e4c25a8a7e7e21e5532adfb",
	"to": "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
	"gasUsed": "0x909c",
	"logs": [
		{
			"address": "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
			"blockTimestamp": "0x602acc4c",
			"logIndex": "0xad",
			"removed": false,
			"data": "0x000000000000000000000000000000000000000000000030ca024f987b900000",
			"topics": [
				"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
				"0x00000000000000000000000037918a209697488c3e4c25a8a7e7e21e5532adfb",
				"0x000000000000000000000000dd1693bd8e307ecfdbe51d246562fc4109f871f8"
			],
		}
	]
}
```

The information retrieved contains many raw details about the transaction, such as the block number where it was included, the sender's address, and the amount of gas used. Additionally, it reveals that during the transaction execution, the address `0x03a...` emitted a single log containing pieces of information about an event that occurred. We identify it as the [RAI token](https://etherscan.io/token/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919) because the `address` field (`0x03a...`) belongs to it.

## Decoding the event{#decoding}

The main challenge lies in the lack of context—what do the data field or the topic's values represent? Moreover, all the information is stored in bytes (hexadecimal format), making it difficult to interpret at a glance.

To make sense of the log, we need to decode it. Decoding involves translating the raw log data into a human-readable format, complete with function and parameter names. This process relies on the contract [ABI (Application Binary Interface)](https://docs.soliditylang.org/en/latest/abi-spec.html), which serves as a translation guide for understanding the data structure. Here's the code to perform the decoding:

```python
# Extracting the log from the transaction_receipt
transaction_log = transaction_receipt["logs"][0]
# Manually inputing the ABI for the contract the emmited the log
# Here we simplified it to only the piece we will use, the standard ERC20 Transfer event
abi = [{
    "anonymous": False,
    "inputs": [
        {"indexed": True, "name": "from", "type": "address"},
        {"indexed": True, "name": "to", "type": "address"},
        {"indexed": False, "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
}]

# Using the web3 library to call a method(process_log) to decode the log using the ABI.
decoded_log = Web3().eth.contract(address=Web3.to_checksum_address(transaction_log['address']), abi=abi).events.Transfer().process_log(transaction_log)
```

First, we extract the relevant log from the transaction receipt obtained earlier. This log contains raw, unstructured data emitted by a contract during the transaction.

Next, we manually define the ABI for the contract that emitted the log. Since ABIs are not stored onchain, we must source them separately—either by checking platforms like Etherscan or compiling the contract code directly, if known. For simplicity, we’ve hardcoded a minimal ABI here, focusing only on the standard ERC20 `Transfer` event.

With both the raw log and the ABI, we leverage the `web3` library to decode the log. Most coding languages have libraries that help programmers interact with Ethereum interfaces and data. This method simplifies the decoding process, translating raw hexadecimal data into meaningful information like the sender (`from`), receiver (`to`), and transfer amount (`value`).

Here’s the decoded result:

```json
{
  "address": "0x03ab458634910aad20ef5f1c8ee96f1d6ac54919",
  "event": "Transfer",
  "logIndex": "0xad",
  "args": {
    "from": "0x37918A209697488c3E4C25a8A7e7E21E5532ADFB",
    "to": "0xdD1693BD8E307eCfDbe51D246562fc4109f871f8",
    "value": 900000000000000000000
  }
}
```

Now, we can see that the transaction transferred 900.000000000000000000 [RAI tokens](https://etherscan.io/token/0x03ab458634910aad20ef5f1c8ee96f1d6ac54919) (including decimals) from `0x379...` to `0xdD1...`. 

## Data Transformation {#transformation}

While our example could end here, we want to highlight an essential aspect of blockchain data exploration: the need to incorporate external data that isn’t part of the blockchain itself. This mirrors common practices in traditional (non-Web3) data analysis.

In this example, we already encountered external data when sourcing the ABI. However, let’s consider a simpler and more frequent scenario: determining the USD value of a token transfer amount. Token prices aren’t recorded on the blockchain; instead, price discovery happens across various exchanges (both centralized, CEXes, and decentralized, DEXes). Price providers aggregate this information to offer consolidated price data.

The following code demonstrates how to fetch this price data using a similar request-based process as we used for onchain data:

```python
# Define the connection with a price provider.
price_api_url = "https://api.coingecko.com/api/v3/simple/price"
# Define the request params.
params = {
    "ids": "rai",
    "vs_currencies": "usd"
}
# Request, receive and store the RAI price.
rai_price = requests.get(url, params=params).json()
# Transform the vol, evaluating is USD value.
transfer_vol_in_current_price = decoded_log['args']['value'] / 10**18 * rai_price['rai']['usd']
# Final output data.
combined_final_data = f"Transaction hash: {transaction_receipt['transactionHash']}\n" \
       f"Token Trasfered Address: {decoded_log['address']}\n" \
       f"From: {decoded_log['args']['from']}\n" \
       f"To: {decoded_log['args']['to']}\n" \
       f"Value Raw: {decoded_log['args']['value']}\n" \
       f"Value: {decoded_log['args']['value']/ 10**18}\n" \
       f"Price: {rai_price['rai']['usd']} USD\n" \
       f"Current value transfered: {transfer_vol_in_current_price} USD"
```

```
Transaction hash: 0x2f8edd9bba379efa228bf8f39396e908d83ea418c602a3dd1bf178749c1714c0
Token Trasfered Address: 0x03ab458634910aad20ef5f1c8ee96f1d6ac54919
From: 0x37918A209697488c3E4C25a8A7e7E21E5532ADFB
To: 0xdD1693BD8E307eCfDbe51D246562fc4109f871f8
Value Raw: 900000000000000000000
Value: 900.0
Price: 3.03 USD
Current value transfered: 2727.0 USD
```

This process produces a consolidated analysis of a single transaction. The same approach can be scaled to handle multiple transactions, with the results organized into a table with many transactions. Furthermore, additional data retrieved from the Ethereum node can be integrated, aggregated, and transformed into various metrics.

## Code Wrap-up {#wrap-up}

The final code demonstrates the entire workflow, and we’ll now revisit it, this time highlighting in the code the key steps that will be explored in detail in the upcoming topics: client node, request pipelines, raw data, ABI db, decoding, offchain inputs and transformed data.

```python
import requests
import json
from web3 import Web3
### Client Node
node_as_service_api_url = "https://eth.llamarpc.com"
payload = {
    "jsonrpc": "2.0",
    "method": "eth_getTransactionReceipt",
    "params": ["0x2f8edd9bba379efa228bf8f39396e908d83ea418c602a3dd1bf178749c1714c0"]
}
### Request pipeline process
response = requests.post(url=node_as_service_api_url, json=payload)
### Raw data (transaction and log)
transaction_receipt = response.json()['result']
transaction_log = transaction_receipt["logs"][0]
### ABI db Input
abi = [{
    "anonymous": False,
    "inputs": [
        {"indexed": True, "name": "from", "type": "address"},
        {"indexed": True, "name": "to", "type": "address"},
        {"indexed": False, "name": "value", "type": "uint256"}
    ],
    "name": "Transfer",
    "type": "event"
}]
### Decoding Process
decoded_log = Web3().eth.contract(address=Web3.to_checksum_address(transaction_log['address']), abi=abi).events.Transfer().process_log(transaction_log)
### Offchain Price Input
price_api_url = "https://api.coingecko.com/api/v3/simple/price"
params = {
    "ids": "rai",
    "vs_currencies": "usd"
}
rai_price = requests.get(url, params=params).json()
### Transformed Data
transfer_vol_in_current_price = decoded_log['args']['value'] / 10**18 * rai_price['rai']['usd']
combined_final_data = f"Transaction hash: {transaction_receipt['transactionHash']}\n" \
       f"Token Trasfered Address: {decoded_log['address']}\n" \
       f"From: {decoded_log['args']['from']}\n" \
       f"To: {decoded_log['args']['to']}\n" \
       f"Value Raw: {decoded_log['args']['value']}\n" \
       f"Value: {decoded_log['args']['value']/ 10**18}\n" \
       f"Price: {rai_price['rai']['usd']} USD\n" \
       f"Current value transfered: {transfer_vol_in_current_price} USD"
```