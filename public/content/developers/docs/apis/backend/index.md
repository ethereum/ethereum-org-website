---
title: Backend API libraries
description: An introduction to the Ethereum client APIs that let you interact with the blockchain from your application.
lang: en
---

In order for a software application to interact with the Ethereum blockchain (i.e. read blockchain data and/or send transactions to the network), it must connect to an Ethereum node.

For this purpose, every Ethereum client implements the [JSON-RPC](/developers/docs/apis/json-rpc/) specification, so there is a uniform set of [methods](/developers/docs/apis/json-rpc/#json-rpc-methods) that applications can rely on.

If you want to use a specific programming language to connect with an Ethereum node, there are many convenience libraries within the ecosystem that make this much easier. With these libraries, developers can write intuitive, one-line methods to initialize JSON-RPC requests (under the hood) that interact with Ethereum.

## Prerequisites {#prerequisites}

It might be helpful to understand the [Ethereum stack](/developers/docs/ethereum-stack/) and [Ethereum clients](/developers/docs/nodes-and-clients/).

## Why use a library? {#why-use-a-library}

These libraries abstract away much of the complexity of interacting directly with an Ethereum node. They also provide utility functions (e.g. converting ETH to Gwei) so as a developer you can spend less time dealing with the intricacies of Ethereum clients and more time focused on the unique functionality of your application.

## Available libraries {#available-libraries}

### Infrastructure and node services {#infrastructure-and-node-services}

**Alchemy -** **_Ethereum Development Platform._**

- [alchemy.com](https://www.alchemy.com/)
- [Documentation](https://docs.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)
  
**All That Node -** **_Node-as-a-Service._**

- [All That Node.com](https://www.allthatnode.com/)
- [Documentation](https://docs.allthatnode.com)
- [Discord](https://discord.gg/GmcdVEUbJM)

**Blast by Bware Labs -** **_Decentralized APIs for Ethereum Mainnet and Testnets._**

- [blastapi.io](https://blastapi.io/)
- [Documentation](https://docs.blastapi.io)
- [Discord](https://discord.gg/bwarelabs)

**BlockPi -** **_Provide more efficient and fast RPC services_**

- [blockpi.io](https://blockpi.io/)
- [Documentation](https://docs.blockpi.io/)
- [GitHub](https://github.com/BlockPILabs)
- [Discord](https://discord.com/invite/xTvGVrGVZv)

**Cloudflare Ethereum Gateway.**

- [cloudflare-eth.com](https://www.cloudflare.com/application-services/products/web3/)

**Etherscan - Block Explorer and Transaction APIs**
- [Documentation](https://docs.etherscan.io/)

**GetBlock-** **_Blockchain-as-a-service for Web3 development_**

- [GetBlock.io](https://getblock.io/)
- [Documentation](https://getblock.io/docs/)

**Infura -** **_The Ethereum API as a service._**

- [infura.io](https://infura.io)
- [Documentation](https://docs.infura.io/api)
- [GitHub](https://github.com/INFURA)

**Node RPC - _Cost-effective EVM JSON-RPC provider_**

- [noderpc.xyz](https://www.noderpc.xyz/)
- [Documentation](https://docs.noderpc.xyz/node-rpc)

**NOWNodes - _Full Nodes and Block Explorers._**

- [NOWNodes.io](https://nownodes.io/)
- [Documentation](https://documenter.getpostman.com/view/13630829/TVmFkLwy#intro)

**QuickNode -** **_Blockchain Infrastructure as a Service._**

- [quicknode.com](https://quicknode.com)
- [Documentation](https://www.quicknode.com/docs/welcome)
- [Discord](https://discord.gg/quicknode)

**Rivet -** **_Ethereum and Ethereum Classic APIs as a service powered by open source software._**

- [rivet.cloud](https://rivet.cloud)
- [Documentation](https://rivet.cloud/docs/)
- [GitHub](https://github.com/openrelayxyz/ethercattle-deployment)

**Zmok -** **_Speed-oriented Ethereum nodes as JSON-RPC/WebSockets API._**

- [zmok.io](https://zmok.io/)
- [GitHub](https://github.com/zmok-io)
- [Documentation](https://docs.zmok.io/)
- [Discord](https://discord.gg/fAHeh3ka6s)

### Development tools {#development-tools}

**ethers-kt -** **_Async, high-performance Kotlin/Java/Android library for EVM-based blockchains._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Examples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Nethereum -** **_An open source .NET integration library for blockchain._**

- [GitHub](https://github.com/Nethereum/Nethereum)
- [Documentation](http://docs.nethereum.com/en/latest/)
- [Discord](https://discord.com/invite/jQPrR58FxX)

**Python Tooling -** **_Variety of libraries for Ethereum interaction via Python._**

- [py.ethereum.org](https://python.ethereum.org/)
- [web3.py GitHub](https://github.com/ethereum/web3.py)
- [web3.py Chat](https://gitter.im/ethereum/web3.py)

**Tatum -** **_The ultimate blockchain development platform._**

- [Tatum](https://tatum.io/)
- [GitHub](https://github.com/tatumio/)
- [Documentation](https://docs.tatum.io/)
- [Discord](https://discord.gg/EDmW3kjTC9)

**web3j -** **_A Java/Android/Kotlin/Scala integration library for Ethereum._**

- [GitHub](https://github.com/web3j/web3j)
- [Docs](https://docs.web3j.io/)
- [Gitter](https://gitter.im/web3j/web3j)

### Blockchain services {#blockchain-services}

**BlockCypher -** **_Ethereum Web APIs._**

- [blockcypher.com](https://www.blockcypher.com/)
- [Documentation](https://www.blockcypher.com/dev/ethereum/)

**Chainbase -** **_All-in-one web3 data infrastructure for Ethereum._**

- [chainbase.com](https://chainbase.com/)
- [Documentation](https://docs.chainbase.com/)
- [Discord](https://discord.gg/Wx6qpqz4AF)

**Chainstack -** **_Elastic and dedicated Ethereum nodes as a service._**

- [chainstack.com](https://chainstack.com)
- [Documentation](https://docs.chainbase.com/docs)
- [Ethereum API reference](https://docs.chainstack.com/reference/ethereum-getting-started)

**Coinbase Cloud Node -** **_Blockchain Infrastructure API._**

- [Coinbase Cloud Node](https://www.coinbase.com/cloud)
- [Documentation](https://docs.cloud.coinbase.com/)

**DataHub by Figment -** **_Web3 API services with Ethereum Mainnet and testnets._**

- [DataHub](https://www.figment.io/)
- [Documentation](https://docs.figment.io/)

**Moralis -** **_Enterprise-Grade EVM API Provider._**

- [moralis.io](https://moralis.io)
- [Documentation](https://docs.moralis.io/)
- [GitHub](https://github.com/MoralisWeb3)
- [Discord](https://moralis.io/joindiscord/)
- [Forum](https://forum.moralis.io/)

**NFTPort -** **_Ethereum Data and Mint APIs._**

- [nftport.xyz](https://www.nftport.xyz/)
- [Documentation](https://docs.nftport.xyz/)
- [GitHub](https://github.com/nftport/)
- [Discord](https://discord.com/invite/K8nNrEgqhE)

**Tokenview -** **_The General Multi-Crypto Blockchain APIs Platform._**

- [services.tokenview.io](https://services.tokenview.io/)
- [Documentation](https://services.tokenview.io/docs?type=api)
- [GitHub](https://github.com/Tokenview)

**Watchdata -** **_Provide simple and reliable API access to Ethereum blockchain._**

- [Watchdata](https://watchdata.io/)
- [Documentation](https://docs.watchdata.io/)
- [Discord](https://discord.com/invite/TZRJbZ6bdn)

**Covalent -** **_Enriched blockchain APIs for 200+ Chains._**

- [covalenthq.com](https://www.covalenthq.com/)
- [Documentation](https://www.covalenthq.com/docs/api/)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)


## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Nodes and clients](/developers/docs/nodes-and-clients/)
- [Development frameworks](/developers/docs/frameworks/)

## Related tutorials {#related-tutorials}

- [Set up Web3js to use the Ethereum blockchain in JavaScript](/developers/tutorials/set-up-web3js-to-use-ethereum-in-javascript/) _– Instructions for getting web3.js set up in your project._
- [Calling a smart contract from JavaScript](/developers/tutorials/calling-a-smart-contract-from-javascript/) _– Using the DAI token, see how to call contracts function using JavaScript._
