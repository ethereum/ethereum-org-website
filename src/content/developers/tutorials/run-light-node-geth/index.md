---
title: How to run a "light" node with Geth
description: How to download, install and run Geth "light".
authors: ["Brian Gu", "Chris Hobcroft"]
tags: ["clients", "geth", "nodes"]
skill: beginner
lang: en
sidebar: true
published: 2022-03-04
---

You may be interested in running your own [node](/developers/docs/nodes-and-clients/), in order to interact with Ethereum. One of the easiest ways to do so is by downloading, installing, and running Geth. With Geth, we can have a "light" node up and running in minutes.

The advantage of running in "light" syncmode is that it requires less than 400MB of available storage, whilst still allowing full interactivity with the chainstate. Some queries may take longer to respond compared with other syncmodes, as data must be retrieved from remote peers.

For an explanation of the differences between the different syncmodes, see this [stack exchange answer](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast).

## Install and run {#install-and-run}

First, [install Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

Once installed, running an Ethereum node in "light" mode is as simple as running the following command in a Terminal window:
```
geth --syncmode light
```

Once launched, Geth will begin connecting to other nodes on Ethereum - known as "peers".

Once it has sufficient peers, it will begin to import headers from new blocks in the chain.

When new block headers no longer have an "age", Geth will be synced to the chain's head.

## Stopping and restarting your node {#stopping-and-restarting-your-node}

You can stop your node at any time by pressing `ctrl-C`.

When restarting the node, Geth will take a few minutes to download block headers created since the node was last stopped.

## Enable the HTTP-RPC server {#enable-the-http-rpc-server}

Enabling the HTTP-RPC server allows connections to Ethereum from other software. Such software may include wallets, browser extensions, or custom software libraries.

The HTTP-RPC server can be enabled by running the following command when to launch Geth:
```
geth --syncmode light --http
```

Once enabled, run `curl http://127.0.0.1:8545`. This should report no error.

### Allow remote connections {#allow-remote-connections}

Remote hosts will be able to connect to your node if the following command is used to launch Geth:
```
geth --syncmode light --http --http.addr 0.0.0.0
```

Note: this assumes that there is no process blocking requests to your localhost, such as a firewall.

## Geth JavaScript console {#geth-javascript-console}

It is possible to interact directly with Ethereum by using the Geth JavaScript console.

To do so, simply run:
```
geth attach
```

This console allows direct interaction with Ethereum. For example, running the `eth.blockNumber` command will print the latest known block number.

## Mainnet and Testnets {#mainnet-and-testnets}

By default, Geth runs a node on Ethereum's main network ("Mainnet").

It is also possible to use Geth to run a node on one of the public test networks, by running one of the following commands in Terminal:
```
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

[Learn more about different networks](/developers/docs/networks/).
