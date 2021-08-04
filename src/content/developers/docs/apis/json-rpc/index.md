---
title: JSON-RPC API
description: A stateless, light-weight remote procedure call (RPC) protocol for Ethereum clients.
lang: en
sidebar: true
---

In order for a software application to interact with the Ethereum blockchain (by reading blockchain data and/or sending transactions to the network), it must connect to an Ethereum node.

For this purpose, every Ethereum client implements a [JSON-RPC specification](http://www.jsonrpc.org/specification), so there are a uniform set of methods that applications can rely on.

JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. Primarily the specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format.

## JSON-RPC resources {#smart-contract-resources}

- [JSON-RPC Spec](https://github.com/ethereum/eth1.0-apis)
- [JSON-RPC Playground ](https://github.com/OpenZeppelin/openzeppelin-contracts)
