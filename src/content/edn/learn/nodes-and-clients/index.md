---
title: Nodes and clients
description:
lang: en
sidebar: true
---

# Nodes and clients

Application on your device running Ethereum software is reffered to as client. From a network perspective, this client is a node. Connecting to other nodes and verifying provided information it creates what we call Ethereum network.

### Prerequisites

You should understand the concept of decentralized network that underlines Ethereum before diving deeper and running your own instance of Ethereum client.

## What is an Ethereum node?

Running an own node is the best way of using Ethereum. Individually, it allows you to be confident in the integrity of the data transmitted to and from you. Collectively, a diverse network of nodes is important for a blockchain’s health and resiliency. It allows trustless and private Ethereum experience while supporting its ecosystem.

Word node refers to a software - **client**, an implementation of Ethereum, which represents the basic entity in the Ethereum network. Each node verifies all transactions in the each block and thus keeps the network secure and vital.

Visualisation?
Here, it would be nice to have a visualisation of ethereum networks, number, location of nodes for example.
Examples of visuals that could be used, maybe just embedded if it is possible.
[https://matallo.carto.com/builder/e70677d5-1111-40a8-9e19-f27da227a55c/embed](https://matallo.carto.com/builder/e70677d5-1111-40a8-9e19-f27da227a55c/embed)[https://etherscan.io/nodetracker](https://etherscan.io/nodetracker)

## Why should I run an Ethereum node?

Using an Ethereum client has many benefits for **individual users** and **infrastructure** itself.

For an individual, running your own node enables you to use Ethereum in a truly private, self sufficient and trustless manner. **Don't trust, verify.**

- Your node verifies all the transactions and blocks against consensus rules by itself. This means you don’t have to rely on any other nodes in the network or fully trust them.
- It also helps to achieve a higher level of privacy because it prevents you from leaking your addresses and balances to random nodes. Everything can be checked with your own client. Same goes with web3 dapps that use underlying Ethereum infrastructure. Web3 services can be used in a private and trustless way if they communicate through your very own node.

Infura, Web3 services examples?

- Dapps that use Ethereum can be more secure and private if the user uses his own node. Metamask, MyEtherWallet and wallets supported by many dapps can be easily pointed to your own local node. (Visual showing user using wallet and connecting to eth network)

![How you access Ethereum via your application and nodes](./nodes.png)

Full nodes are also fundamental for Ethereum network, its operation and security.

- They provide access to information from blockchain for other lightweight clients that depend on it. Especially in high peaks of usage, there need to be enough full nodes with slots for light nodes to help them sync.
- Since full nodes enforce [consensus rules](https://ethereum.github.io/yellowpaper/paper.pdf), they can’t be tricked into accepting blocks that violets them. That means they also provide security in the network because if all the nodes would be lightweight and wouldn’t do full verification, miners attack the network and for example could create blocks with higher rewards.
- Therefore, if you are running the node, the whole Ethereum network benefits from it.

## Which client to pick?

Ethereum is implemented in different clients, written in different programming languages by different teams. Each client has some unique use cases and advantages. Users should consider picking a client that suits them the best.

(maybe ethernodes visual to show diversity of clients)

In terms of Ethereum network, the ideal goal is to achieve client diversity without any too dominant client ruling majority of the network and so avoid SPoF possibilities.

### Sync modes

Ethereum clients can run different types/modes of nodes - light node, full node and archive node. There are also options of different sync strategies which enables faster synchronization time.

- Full node
  - Stores full blockchain data
  - Participates in block validation, verifies all blocks and states
  - All states can be derived from a full node
  - Serve the network and provides data on request
- Light node
  - Stores the header chain and requests everything else
  - Can verify the validity of the data against the state roots in the block headers
  - Useful for low capacity devices, such as embedded devices or mobile phones, which can't afford to store gigabytes of blockchain data
- Archive node
  - Stores everything kept in the full node and builds an archive of historical states
  - These data represent units of terabytes which makes archive nodes less attractive for average users but can be handy for services like block explorers, wallet vendors, chain analytics…

This table summirzes basic info about different clients. All of the mentioned are actively developed, maintained and passing client [tests](https://github.com/ethereum/tests).

[Untitled](https://www.notion.so/13d665cb956640e6bc2426e3cab36938)

## Hardware

Hardware requirments differ by client but generaly are not that high since the node just need to stay synced - do not confuse it with mining which requires much more computing power. Sync time and performence of course significantly improves with more powerful hardware. Depending on user's needs and wants, Ethereum can be run for example on your computer, home server, ARM SBCs or VPS in a cloud.

Easy way of running your own node are 'plug and play' boxes like [DAppNode](https://dappnode.io/). It provides hardware prepared to run clients and applications depended on them, everything with simple user interface.

### Requirments

Before installing any client, please ensure your computer has sufficient resources to run it. Minimum and recommended requirments can be found below, however key part is the disk. Syncing the Ethereum blockchain is very input/output intensive. It is best to have a solid-state drive (SSD). To run Ethereum client on HDD, you will need at least 8GB of RAM to sue as cache.

- Minimum requirements:
  - CPU with 2+ cores
  - 4 GB RAM minimum with an SSD, 8 GB+ if you have an HDD
  - 8 MBit/s bandwidth
- Recommended specifications:
  - Fast CPU with 4+ cores
  - 16 GB+ RAM
  - Fast SSD with at least 500 GB free space
  - 25+ MBit/s bandwidth

Depending on which software and sync mode are you going to use, hundreds of GBs of disk space is need. Approximate numbers and growth can be found below.

[Untitled](https://www.notion.so/cfd52a314e5c453db6453928de4816a1)

Numbers in the table are just for estimation of what minimal capacity volume of your node should have. Exact numbers for Geth and Parity can be found here. [https://etherscan.io/chartsync/chaindefault](https://etherscan.io/chartsync/chaindefault)

Etherscan - besu, nethermind

#ToDo - bechmarks results
Maybe subpage for benchmarks and tests results of clients. [http://retesteth.ethdevops.io/](http://retesteth.ethdevops.io/)[https://hivetests.ethdevops.io/](https://hivetests.ethdevops.io/) - These are tests results stats but page with nicer UI and clear testing scope would be helpful

### Ethereum on ARM

Convenient and cheap way of running Ethereum node is to use a single board computer with the ARM architecture like Raspberry Pi. [Ethereum on ARM](https://twitter.com/EthereumOnARM) provides images of Geth, Parity, Nethermind, Besu clients and simple [guide](https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/) how to build and setup the device.
Small, affordable and efficient device like this is ideal for running the node at home.

### Further reading

There is a lot of instructions and information about Ethereum clients on the internet, here are few that might be helpful.

[https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a](https://kauri.io/ethereum-101-part-2-understanding-nodes/48d5098292fd4f11b251d1b1814f0bba/a)

[https://kauri.io/ethereum-on-arm-turn-your-arm-device-into-a-full-e/e7b2625208af4382acf070fa8068502b/a](https://kauri.io/ethereum-on-arm-turn-your-arm-device-into-a-full-e/e7b2625208af4382acf070fa8068502b/a)

[https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31)

[https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/)

[https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)

[https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/)
