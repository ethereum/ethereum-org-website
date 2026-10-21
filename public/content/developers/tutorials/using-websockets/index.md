---
title: Using WebSockets
description: Guide to using WebSockets to make JSON-RPC requests and subscribe to events, with any Ethereum node provider.
author: "Elan Halpern"
lang: en
tags: ["alchemy", "websockets", "querying", "javascript"]
skill: beginner
breadcrumb: WebSockets
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/reference/best-practices-for-using-websockets-in-web3
published: 2020-12-01
---

This is an entry level guide to using WebSockets to make requests to the Ethereum blockchain. The examples use standard JSON-RPC methods, so they work with any node or node provider that offers a WebSocket endpoint, including Alchemy.

## WebSockets vs. HTTP {#websockets-vs-http}

Unlike HTTP, with WebSockets, you don't need to continuously make requests when you want specific information. WebSockets maintain a network connection for you (if done right) and listen for changes.

As with any network connection, you should not assume that a WebSocket will remain open forever without interruption, but correctly handling dropped connections and reconnection by hand can be challenging to get right. Another downside of WebSockets is that you do not get HTTP status codes in the response, but only the error message.

Client libraries can handle this for you. For example, [viem's WebSocket transport](https://viem.sh/docs/clients/transports/websocket) reconnects on socket failure and sends keep-alive pings by default.

## Try it out {#try-it-out}

You need a WebSocket URL for an Ethereum node. Node providers give you one when you create an API key, usually in the form `wss://<provider-host>/<your-api-key>`. For example, an Alchemy Ethereum Mainnet URL looks like `wss://eth-mainnet.g.alchemy.com/v2/<your-api-key>` ([sign up for a free Alchemy account](https://auth.alchemy.com/signup)). See [nodes as a service](/developers/docs/nodes-and-clients/nodes-as-a-service/) for other providers, or use the WebSocket endpoint of [your own node](/developers/docs/nodes-and-clients/run-a-node/). Public endpoints such as `wss://ethereum-rpc.publicnode.com` also work for quick experiments, but they are rate-limited and may not support every subscription type.

The easiest way to test out WebSockets is to install a command line tool for making WebSocket requests such as [wscat](https://github.com/websockets/wscat). Using wscat, you can send requests as follows:

```sh
npx wscat -c wss://<provider-host>/<your-api-key>

> {"jsonrpc": "2.0", "id": 0, "method": "eth_gasPrice"}

< {"jsonrpc": "2.0", "result": "0x41f9de2", "id": 0}
```

Lines starting with `>` are what you type, and lines starting with `<` are what the node sends back.

## How to use WebSockets {#how-to-use-websockets}

To begin, open a WebSocket using your provider's WebSocket URL. With Alchemy, you can find it by opening your app in [the dashboard](https://dashboard.alchemy.com/) and viewing its API key. Note that the URL for WebSockets (`wss://`) is different from the URL for HTTP requests (`https://`), although most providers use the same API key for both.

![Where to find your WebSocket URL in your Alchemy dashboard](./use-websockets.mp4#602x280)

Any of the [JSON-RPC methods](/developers/docs/apis/json-rpc/) your provider supports can be used via WebSocket. To do so, use the same payload that would be sent as the body of a HTTP POST request, but instead send that payload through the WebSocket.

## With Web3 {#with-web3}

Transitioning to WebSockets while using a client library like [viem](https://viem.sh/) is simple. Use the `webSocket` transport with your WebSocket URL instead of the `http` transport. For example, after `npm install viem`, save this as `index.mjs` and run `node index.mjs`:

```js
import { createPublicClient, webSocket } from "viem"
import { mainnet } from "viem/chains"

const client = createPublicClient({
  chain: mainnet,
  transport: webSocket("wss://<provider-host>/<your-api-key>"),
})

console.log(await client.getBlockNumber()) // -> 26243602n

// Subscribe to new blocks over the same WebSocket
const unwatch = client.watchBlocks({
  onBlock: (block) => {
    console.log(block.number, block.hash)
    unwatch()
    process.exit(0)
  },
})
```

## Subscription API {#subscription-api}

When connected through a WebSocket, you may use two additional methods: `eth_subscribe` and `eth_unsubscribe`. These methods will allow you to listen for particular events and be notified immediately.

### `eth_subscribe` {#eth-subscribe}

Creates a new subscription for specified events. [Learn more about `eth_subscribe`](https://geth.ethereum.org/docs/interacting-with-geth/rpc/pubsub).

#### Parameters {#parameters}

1. Subscription types
2. Optional params

The first argument specifies the type of event for which to listen. The second argument contains additional options which depend on the first argument. The different description types, their options, and their event payloads are described below.

#### Returns {#returns}

The subscription ID: This ID will be attached to any received events, and can also be used to cancel the subscription using `eth_unsubscribe`.

#### Subscription events {#subscription-events}

While the subscription is active, you will receive events which are objects with the following fields:

- `jsonrpc`: Always "2.0"
- `method`: Always "eth_subscription"
- `params`: An object with the following fields:
  - `subscription`: The subscription ID returned by the `eth_subscribe` call which created this subscription.
  - `result`: An object whose contents vary depending on the type of subscription.

#### Subscription types {#subscription-types}

1. `newHeads`

Emits an event any time a new header is added to the chain, including during a chain reorganization.

When a chain reorganization occurs, this subscription will emit an event containing all new headers for the new chain. In particular, this means that you may see multiple headers emitted with the same height, and when this happens the later header should be taken as the correct one after a reorganization.

Example:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newHeads"]}

< {"jsonrpc":"2.0","result":"0xe0d4abf5caf333fbf94c5f02182e6469","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "baseFeePerGas": "0x41f9de2",
      "blobGasUsed": "0xc0000",
      "difficulty": "0x0",
      "excessBlobGas": "0xa88af38",
      "extraData": "0xe29ca82051756173617220287175617361722e77696e2920e29ca8",
      "gasLimit": "0x3938700",
      "gasUsed": "0x1a17224",
      "hash": "0xedc43a71b7ff13880bdbe7b748a225b91a11a91e79173fe28011363c10acaea5",
      "logsBloom": "0x4beaef4e7dbb1bfdb3df673fab6cdf1cf9fc0e7f743d672c761551767b7dad953d79cf86e56e6195ae1b57dff20a0fd46e57c545af166ff49394df3839e269a6ff877b6baf9d899fd9666c58b7dfa7add4febf78b466e7f71af2dcbad53fdcfa3f7277d2fbfffcff953f9ef37b3af8fffb296a3adb94dc463ff0d6d5173f1beda0fd662d77eaedb34ff99f3eeed38a77e7d0cd63e917d4efbdfcb7d0d19437f98ff60773d0effbfbdfdbef9ebbf6a2c35efedd677a795d3ccd777e127eeb657f6a8dffaf64f3b8d998b516c78e661ef77fded57fb66d687fab17739b3ef5aa2765777d8cce0ef59a9ceebeceabbb7f76ed7fc65df7e8bccf7938eb3fb7de57f7",
      "miner": "0x396343362be2a4da1ce0c1c210945346fb82aa49",
      "mixHash": "0xa72c9201f502df607d0d7551ccc171ce37a5146747f04c6c495b0aebecb045c7",
      "nonce": "0x0000000000000000",
      "number": "0x1907212",
      "parentBeaconBlockRoot": "0x34f3f289459913dd80ec9c20aa535866cd2bd310ac26e47570601e263d593735",
      "parentHash": "0xe62c150ffbbd04e95343f945b70fa53756aba6c0bf96c0440d1ae354fa007a7c",
      "receiptsRoot": "0x94951d882544da76e30b145b26a39b126e8acfba9db929351b84b2f4c847e3ed",
      "requestsHash": "0xe3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
      "size": "0x1f4bc",
      "stateRoot": "0x12771ea73858277034cf6604aee0abbf889c15091ab8ef9be81bf7258458a036",
      "timestamp": "0x6ad92b47",
      "transactionsRoot": "0xbd58ebe5c8c5519e458266a7db3ad049a7bffa106dc9a14f2fe6edb3f8ad5d70",
      "withdrawalsRoot": "0x56a083b6140663c9e98c30167ee90a1ffb157505ba89cb584583b71cba100d2a"
    },
    "subscription": "0xe0d4abf5caf333fbf94c5f02182e6469"
  }
}
```

2. `logs`

Emits logs which are part of newly added blocks that match specified filter criteria.

When a chain reorganization occurs, logs which are part of blocks on the old chain will be emitted again with the property `removed` set to `true`. Further, logs which are part of the blocks on the new chain are emitted, meaning that it is possible to see logs for the same transaction multiple times in the case of a reorganization.

Parameters

1. An object with the following fields:
   - `address` (optional): either a string representing an address or an array of such strings.
     - Only logs created from one of these addresses will be emitted.
   - `topics`: an array of topic specifiers.
     - Each topic specifier is either `null`, a string representing a topic, or an array of strings.
     - Each position in the array which is not `null` restricts the emitted logs to only those who have one of the given topics in that position.

Some examples of topic specifications:

- `[]`: Any topics allowed.
- `[A]`: A in first position (and anything after).
- `[null, B]`: Anything in first position and B in second position (and anything after).
- `[A, B]`: A in first position and B in second position (and anything after).
- `[[A, B], [A, B]]`: (A or B) in first position and (A or B) in second position (and anything after).

Example:

This example listens for `Deposit` events from the [WETH contract](https://etherscan.io/address/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2) on Ethereum Mainnet:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["logs", {"address": "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "topics": ["0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c"]}]}

< {"jsonrpc":"2.0","result":"0x69a0e61ae8e3d61a93479858e8f1b43a","id":1}
< {
  "jsonrpc": "2.0",
  "method": "eth_subscription",
  "params": {
    "result": {
      "address": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
      "blockHash": "0x168e06e5733df993078bb635cb9925f80ff39d12a36bd301052c44d7bf6b6068",
      "blockNumber": "0x190720e",
      "blockTimestamp": "0x6ad92b17",
      "data": "0x000000000000000000000000000000000000000000000000039ed0c3d7848a1c",
      "logIndex": "0x11",
      "removed": false,
      "topics": [
        "0xe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c",
        "0x00000000000000000000000023617e59a5925b2a4bf75d73ff6711cd0b29de85"
      ],
      "transactionHash": "0xc956e7012c2af8ff87db88e059336842ee872bfc93de1eac9760510d0bd801be",
      "transactionIndex": "0xb"
    },
    "subscription": "0x69a0e61ae8e3d61a93479858e8f1b43a"
  }
}
```

3. `newPendingTransactions`

Emits the hash of each transaction that is added to the node's pending state (its mempool).

Example:

```json
> {"jsonrpc": "2.0", "id": 1, "method": "eth_subscribe", "params": ["newPendingTransactions"]}

< {"jsonrpc":"2.0","result":"0x1c2365b029179adf1e84b9e327315249","id":1}
< {"jsonrpc":"2.0","method":"eth_subscription","params":{"result":"0x4a62d0ad7c8868fbbfa10604e68638e637c6fc6f64fd1fb4ca042dcd0158c992","subscription":"0x1c2365b029179adf1e84b9e327315249"}}
```

Some providers also offer their own subscription types. For example, Alchemy's [`alchemy_pendingTransactions`](https://www.alchemy.com/docs/reference/alchemy-pendingtransactions) emits _full transaction objects_ instead of just hashes, and accepts optional `fromAddress`, `toAddress` and `hashesOnly` filters. These are not part of the standard JSON-RPC API, so they only work with that provider.

### `eth_unsubscribe` {#eth-unsubscribe}

Cancels an existing subscription so that no further events are sent.

Parameters

1. Subscription ID, as previously returned from an `eth_subscribe` call.

Returns

`true` if a subscription was successfully cancelled, or `false` if no subscription existed with the given ID.

A subscription only exists on the WebSocket connection that created it, so `eth_unsubscribe` must be sent over that same connection. It can't be sent as a separate HTTP request. Closing the connection also cancels all of its subscriptions.

Example:

```json
> {"jsonrpc": "2.0", "id": 2, "method": "eth_unsubscribe", "params": ["0xe0d4abf5caf333fbf94c5f02182e6469"]}

< {"jsonrpc":"2.0","result":true,"id":2}
```

---

[Sign up with Alchemy](https://auth.alchemy.com) for free, check out [Alchemy's documentation](https://www.alchemy.com/docs/), and for the latest news, follow Alchemy on [X](https://x.com/Alchemy).
