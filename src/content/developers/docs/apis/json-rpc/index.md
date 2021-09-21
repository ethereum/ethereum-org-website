---
title: JSON-RPC API
description: A stateless, light-weight remote procedure call (RPC) protocol for Ethereum clients.
lang: en
sidebar: true
---

In order for a software application to interact with the Ethereum blockchain (by reading blockchain data and/or sending transactions to the network), it must connect to an Ethereum node.

For this purpose, every [Ethereum client](/developers/docs/nodes-and-clients/#clients) implements a [JSON-RPC specification](http://www.jsonrpc.org/specification), so there are a uniform set of methods that applications can rely on.

JSON-RPC is a stateless, light-weight remote procedure call (RPC) protocol. Primarily the specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format.

## JSON-RPC resources {#json-rpc-resources}

- [Ethereum JSON-RPC Specification](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [Ethereum JSON-RPC Specification GitHub repo](https://github.com/ethereum/eth1.0-apis)

## Client implementations {#client-implementations}

Ethereum clients each may utilize different programming languages when implementing the JSON-RPC specification. See individual [client documentation](/developers/docs/nodes-and-clients/#clients) for further details related to specific programming languages. We recommend checking the documentation of each client for the latest API support information.

## Convenience Libraries {#convenience-libraries}

While you may choose to interact directly with Ethereum clients via the JSON-RPC API, there are often easier options for dapp developers. Many [JavaScript](/developers/docs/apis/javascript/#available-libraries) and [backend API](/developers/docs/apis/backend/#available-libraries) libraries exist to provide wrappers on top of the JSON-RPC API. With these libraries, developers can write intuitive, one-line methods in the programming language of their choice to initialize JSON-RPC requests (under the hood) that interact with Ethereum.

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
- [Javascript APIs](/developers/docs/apis/javascript/)
- [Backend APIs](/developers/docs/apis/backend/)
