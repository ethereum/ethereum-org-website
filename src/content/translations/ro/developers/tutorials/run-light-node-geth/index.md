---
title: Cum se execută un nod ușor cu Geth
description: How to download, install and run a lightclient with Geth.
author: "Brian Gu"
tags:
  - "clienți"
  - "noduri"
skill: beginner
lang: ro
published: 2022-03-04
---

Poate sunteţi interesat să rulaţi un [nod Ethereum](/developers/docs/noses-and-clients/). Unul dintre cele mai simple moduri de a face acest lucru este să descărcați, să instalați și să rulați Geth. Utilizând Geth, putem pune în funcţiune un nod ușor în câteva minute.

A light client requires less than 400MB of storage whilst still allowing full interactivity with the Ethereum state. Light clients retrieve data from remote peers, so some queries may take longer to respond in comparison to other sync modes.

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

## Oprirea și repornirea nodului dvs. {#stopping-and-restarting-your-node}

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

It is also possible to use Geth to run a node on one of the [public test networks](/networks/#testnets), by running one of the following commands in Terminal:

```bash
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## Unde sunt stocate datele de pe blockchain și EVM? {#where-is-the-blockchain-and-evm-data-stored}

Directorul pe care îl utilizează Geth pentru a stoca datele brute de pe blockchain depinde de sistemul dvs. de operare. Upon running Geth, look for a message that looks like this:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Calea care urmează `„database=”` (baza de date) ar trebui să vă spună unde sunt stocate datele blockchain-ului pe mașină. Dacă rulaţi un nod complet, acest director va conține toate datele despre fiecare bloc care a fost vreodată alocat la blockchain. Din moment ce rulăm un nod ușor, acest director conține doar anteturile blocului.

Merită subliniat aici că, la cel mai de jos nivel, aici locuieşte blockchain-ul. Conținutul complet al blockchain-ului și starea EVM sunt stocate pe fiecare nod complet din rețeaua Ethereum, în directoare care seamănă foarte mult cu cele de pe computerul dvs.

## Referințe suplimentare {#further-reading}

- [Aflaţi mai multe despre diferite rețele](/developers/docs/Networks/).
- [Run a full node](/run-a-node/)
