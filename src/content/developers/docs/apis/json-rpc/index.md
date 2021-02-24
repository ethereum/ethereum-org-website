---
title: JSON RPC APIs
description: A stateless, light-weight remote procedure call (RPC) protocol
lang: en
sidebar: true
---

A remote procedure call, or RPC, is a method of retrieving or being notified of information from a given data source in an asynchronous manner. [JSON-RPC](http://www.jsonrpc.org/specification) is a stateless, light-weight RPC protocol, that defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses [JSON](http://json.org/) as data format.

JSON-RPC creates an application programming interface (API), similar to REST or GraphQL, with endpoints served from an Ethereum node, that enable a developer to utilize up-to-date on-chain Ethereum data while building [web3](/glossary/#web3) enabled [Dapps](/glossary/#dapp).

_[Jump ahead to endpoints](/developers/docs/apis/json-rpc/reference)_

## Prerequisites {#prerequisites}

Beyond being familiar with how API endpoints can be used to fetch JSON data, it might be helpful to understand the [Ethereum stack](/developers/docs/ethereum-stack/) and [Ethereum clients](/developers/docs/nodes-and-clients/).

## Publish / Subscribe {#pub-sub}

Publish / subscribe (pub/sub) is a method of using JSON-RPC notifications to subscribe to Ethereum events without needing to poll for them:

- [Geth v1.4](https://geth.ethereum.org/docs/rpc/pubsub)

- [Hyperledger Besu 1.3](https://besu.hyperledger.org/en/stable/HowTo/Interact/APIs/RPC-PubSub/)

## JavaScript API {#javascript_api}

To talk to an Ethereum node from inside a JavaScript application use the [web3.js](https://github.com/ethereum/web3.js) library, which gives a convenient interface for the RPC methods.

See the [JavaScript API](/developers/docs/apis/javascript) for more details.

## JSON-RPC Endpoint {#json-rpc_endpoints}

Default JSON-RPC endpoints:

| Client           |          URL          |
| ---------------- | :-------------------: |
| C++              | http://localhost:8545 |
| Go               | http://localhost:8545 |
| Py               | http://localhost:4000 |
| Parity           | http://localhost:8545 |
| Hyperledger Besu | http://localhost:8545 |

### Go {#go}

You can start the HTTP JSON-RPC with the `--rpc` flag:

```bash
geth --rpc
```

change the default port (8545) and listing address (localhost) with:

```bash
geth --rpc --rpcaddr <ip> --rpcport <portnumber>
```

If accessing the RPC from a browser, CORS will need to be enabled with the appropriate domain set. Otherwise, JavaScript calls are limit by the same-origin policy and requests will fail:

```bash
geth --rpc --rpccorsdomain "http://localhost:3000"
```

The JSON RPC can also be started from the [geth console](https://github.com/ethereum/go-ethereum/wiki/JavaScript-Console) using the `admin.startRPC(addr, port)` command.

### C++ {#cpp}

You can start it by running `eth` application with `-j` option:

```bash
./eth -j
```

You can also specify JSON-RPC port (default is 8545):

```bash
./eth -j --json-rpc-port 8079
```

### Python {#python}

In python the JSONRPC server is currently started by default and listens on `127.0.0.1:4000`

You can change the port and listen address by giving a config option.

`pyethapp -c jsonrpc.listen_port=4002 -c jsonrpc.listen_host=127.0.0.2 run`

### Java {#java}

Run a Besu node on mainnet with the HTTP JSON-RPC service enabled:

```bash
besu --rpc-http-enabled
```

More details can be found in the [documentation](https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#rpc-http-enabled).

## JSON-RPC support {#json-rpc_support}

|                | cpp-ethereum | go-ethereum | py-ethereum |  parity  | hyperledger-besu |
| -------------- | :----------: | :---------: | :---------: | :------: | :--------------: |
| JSON-RPC 1.0   |   &#x2713;   |             |             |          |                  |
| JSON-RPC 2.0   |   &#x2713;   |  &#x2713;   |  &#x2713;   | &#x2713; |     &#x2713;     |
| Batch requests |   &#x2713;   |  &#x2713;   |  &#x2713;   | &#x2713; |     &#x2713;     |
| HTTP           |   &#x2713;   |  &#x2713;   |  &#x2713;   | &#x2713; |     &#x2713;     |
| IPC            |   &#x2713;   |  &#x2713;   |             | &#x2713; |                  |
| WS             |              |  &#x2713;   |             | &#x2713; |     &#x2713;     |

## HEX value encoding {#hex_value_encoding}

At present there are two key datatypes that are passed over JSON: unformatted byte arrays and quantities. Both are passed with a hex encoding, however with different requirements to formatting:

When encoding **QUANTITIES** (integers, numbers): encode as hex, prefix with "0x", the most compact representation (slight exception: zero should be represented as "0x0"). Examples:

- 0x41 (65 in decimal)
- 0x400 (1024 in decimal)
- WRONG: 0x (should always have at least one digit - zero is "0x0")
- WRONG: 0x0400 (no leading zeroes allowed)
- WRONG: ff (must be prefixed 0x)

When encoding **UNFORMATTED DATA** (byte arrays, account addresses, hashes, bytecode arrays): encode as hex, prefix with "0x", two hex digits per byte. Examples:

- 0x41 (size 1, "A")
- 0x004200 (size 3, "\0B\0")
- 0x (size 0, "")
- WRONG: 0xf0f0f (must be even number of digits)
- WRONG: 004200 (must be prefixed 0x)

Currently [cpp-ethereum](https://github.com/ethereum/cpp-ethereum),[go-ethereum](https://github.com/ethereum/go-ethereum), and [parity](https://github.com/paritytech/parity) provide JSON-RPC communication over http and IPC (unix socket Linux and OSX/named pipes on Windows). Version 1.4 of go-ethereum, version 1.6 of Parity and version 1.3 of Hyperledger Besu onwards have websocket support.

## The default block parameter {#default_block_parameter}

The following methods have an extra default block parameter:

- [eth_getBalance](/developers/docs/apis/json-rpc/reference/#eth_getbalance)
- [eth_getCode](/developers/docs/apis/json-rpc/reference/#eth_getcode)
- [eth_getTransactionCount](/developers/docs/apis/json-rpc/reference/#eth_gettransactioncount)
- [eth_getStorageAt](/developers/docs/apis/json-rpc/reference/#eth_getstorageat)
- [eth_call](/developers/docs/apis/json-rpc/reference/#eth_call)

When requests are made that act on the state of Ethereum, the last default block parameter determines the height of the block.

The following options are possible for the defaultBlock parameter:

- `HEX String` - an integer block number
- `String "earliest"` for the earliest/genesis block
- `String "latest"` - for the latest mined block
- `String "pending"` - for the pending state/transactions

## Curl Examples Explained {#curl_examples_explained}

The curl options below might return a response where the node complains about the content type, this is because the --data option sets the content type to application/x-www-form-urlencoded . If your node does complain, manually set the header by placing -H "Content-Type: application/json" at the start of the call.

The examples also do not include the URL/IP & port combination which must be the last argument given to curl e.x. 127.0.0.1:8545
