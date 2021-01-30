---
title: Backend API libraries
description: An introduction to the Ethereum client APIs that let you interact with the blockchain from your application.
lang: en
sidebar: true
---

In order for a software application to interact with the Ethereum blockchain (i.e. read blockchain data and/or send transactions to the network), it must connect to an Ethereum node.

For this purpose, every Ethereum client implements the JSON-RPC specification, so there are a uniform set of endpoints that applications can rely on.

If you want to use a specific programming language to connect with an Ethereum node, there are many convenience libraries within the ecosystem that make this much easier. With these libraries, developers can write intuitive, one-line methods to initialize JSON-RPC requests (under the hood) that interact with Ethereum.

## Prerequisites {#prerequisites}

It might be helpful to understand the [Ethereum stack](/developers/docs/ethereum-stack/) and [Ethereum clients](/docs/nodes-and-clients/).

## Why use a library? {#why-use-a-library}

These libraries abstract away much of the complexity of interacting directly with an Ethereum node. They also provide utility functions (e.g. converting ETH to Gwei) so as a developer you can spend less time dealing with the intricacies of Ethereum clients and more time focused on the unique functionality of your application.

## Available libraries {#available-libraries}

<!-- TODO separate APIs-as-a-service vs. connect your own -->

**Alchemy -** **_Ethereum Development Platform._**

- [alchemyapi.io](https://alchemyapi.io)
- [Documentation](https://docs.alchemyapi.io/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.gg/kwqVnrA)

**BlockCypher -** **_Ethereum Web APIs_**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Infura -** **_The Ethereum API as a service._**

- [infura.io](https://infura.io)
- [Documentation](https://infura.io/docs)
- [GitHub](https://github.com/INFURA)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://cloudflare-eth.com)

**Nodesmith -** **_JSON-RPC API access to Ethereum mainnet and testnets._**

- [nodesmith.io](https://nodesmith.io/network/ethereum/)
- [Documentation](https://nodesmith.io/docs/#/ethereum/apiRef)

**Ethercluster -** **_Run your own Ethereum API service supporting both ETH and ETC._**

- [ethercluster.com](https://www.ethercluster.com/)

**Chainstack -** **_Shared and dedicated Ethereum nodes as a service._**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainstack.com)

**QuikNode -** **_Blockchain developer platform._**

- [quiknode.io](https://quiknode.io)

**Python Tooling -** **_Variety of libraries for Ethereum interaction via Python._**

- [py.ethereum.org](http://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**web3j -** **_A Java/Android/Kotlin/Scala integration library for Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

**Rivet -** **_Ethereum and Ethereum Classic APIs as a service powered by open source software._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Nethereum -** **_An open source .NET integration library for blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
- [Development frameworks](/developers/docs/frameworks/)

## Related tutorials {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in Javascript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions for getting web3.js set up in your project._
- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Using the DAI token, see how to call contracts function using JavaScript._
