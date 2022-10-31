---
title: How to run a light node with Geth
description: How to download, install and run a lightclient with Geth.
author: "Brian Gu"
tags: ["clients", "geth", "nodes"]
skill: beginner
lang: en
published: 2022-03-04
postMergeBannerTranslation: page-upgrades-post-merge-banner-tutorial-light-node-ood
---

**Please note that Geth light clients can be very slow to find peers. This is because they rely on full-node operators volunteering themselves as light servers from which the light clients can request data. There are usually only a small number of light servers available.**

**Also, note that after [The Merge](/upgrades/merge/), a Geth node alone will not be sufficient - a consensus client must be connected to it to track the head of the chain.**

You may be interested in running an [Ethereum node](/developers/docs/nodes-and-clients/). One of the easiest ways to do so is by downloading, installing, and running [Geth](https://geth.ethereum.org). With Geth, we can have a light node up and running in minutes.

A light client requires less than 400MB of storage whilst still allowing full interactivity with the Ethereum state. Light clients retrieve data from remote peers, so some queries may take longer to respond to than other sync modes.

For an explanation of the differences between the different sync modes, read our [nodes and clients developer docs](/developers/docs/nodes-and-clients/#node-types).

## Install and run {#install-and-run}

First, [install Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

After installing Geth, you can run an Ethereum node in "light" mode by running the following command in a Terminal window:

```bash
geth --syncmode light
```

Once launched, Geth will begin connecting to other nodes on Ethereum - known as "peers". The process of connecting to peers may take a while.

When your Geth node has enough peers, it will import headers from new blocks on the chain.

When new block headers no longer have an "age", Geth will be synced to the chain's head.

## Stopping and restarting your node {#stopping-and-restarting-your-node}

You can stop your node at any time by pressing <kbd>CTRL</kbd>+<kbd>C</kbd>.

When restarting the node, Geth will take a few minutes to download block headers created since the node was last run.

## Enable the HTTP-RPC server {#enable-the-http-rpc-server}

Enabling the HTTP-RPC server lets you connect your Ethereum node to other software like wallets, browser extensions, or custom software libraries.

You can enable the HTTP-RPC server by running the following command when launching Geth:

```bash
geth --syncmode light --http
```

Once enabled, run `curl http://127.0.0.1:8545`. This should report no error.

### Allow remote connections {#allow-remote-connections}

To allow remote hosts to connect to your node, launch Geth with the following command:

```
geth --syncmode light --http --http.addr 0.0.0.0
```

Note: this assumes that there is no process blocking requests to your localhost, such as a firewall.

## Geth JavaScript console {#geth-javascript-console}

Geth has a built-in JavaScript console and a JavaScript API called [web3js](https://github.com/ethereum/web3.js/) that you can use to interact with your node.

To use the JavaScript console run:

```bash
geth attach
```

This console allows direct interaction with Ethereum. For example, running the `eth.blockNumber` command will print the latest known block number.

[Full web3js documentation](http://web3js.readthedocs.io/)

## Mainnet and testnets {#mainnet-and-testnets}

Geth runs your node on [Ethereum Mainnet](/glossary/#mainnet) by default.

It is also possible to use Geth to run a node on one of the [public test networks](/developers/docs/networks/#ethereum-testnets), by running one of the following commands in Terminal:

```bash
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## Where is the blockchain and EVM data stored? {#where-is-the-blockchain-and-evm-data-stored}

The directory which Geth uses to store raw blockchain data depends on your operating system. Upon running Geth, look for a message that looks like this:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

The path following `“database=”` should tell you where the blockchain data is stored on your machine. If you’re running a full node, this directory will contain all of the data about every block that has ever been committed to the blockchain. Since we’re running a light node, this directory only contains the block headers.

It’s worth emphasizing here that, at the lowest level, this is where the blockchain lives. The full contents of the blockchain and the EVM state are stored on every full node in the Ethereum network, in directories that look very much like the one on your computer.

## Further reading {#further-reading}

- [Learn more about different networks](/developers/docs/networks/).
- [Run a full node](/run-a-node/)
