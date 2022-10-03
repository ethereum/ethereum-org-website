---
title: Cara menjalankan node ringan dengan Geth
description: How to download, install and run a lightclient with Geth.
author: "Brain Gu"
tags:
  - "klien"
  - "geth"
  - "node"
skill: beginner
lang: id
published: 2022-03-04
---

Anda mungkin tertarik menjalankan [node Ethereum](/developers/docs/nodes-and-clients/). Salah satu cara termudah untuk melakukannya adalah dengan mengunduh, menginstal, dan menjalankan Geth. Dengan Geth, kita bisa mengaktifkan node ringan dan menjalankannya dalam hitungan menit.

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

## Menghentikan dan memulai kembali node Anda {#stopping-and-restarting-your-node}

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

[Dokumentasi web3js lengkap](http://web3js.readthedocs.io/)

## Mainnet and testnets {#mainnet-and-testnets}

Geth runs your node on [Ethereum Mainnet](/glossary/#mainnet) by default.

It is also possible to use Geth to run a node on one of the [public test networks](/networks/#testnets), by running one of the following commands in Terminal:

```bash
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## Di mana data blockchain dan EVM disimpan? {#where-is-the-blockchain-and-evm-data-stored}

Direktori yang digunakan Geth untuk menyimpan data blockchain mentah tergantung pada sistem operasi Anda. Upon running Geth, look for a message that looks like this:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Jalur yang mengikuti `“database=”` akan memberi tahu Anda di mana data blockchain disimpan dalam mesin Anda. Jika Anda menjalankan node penuh, direktori ini akan berisi semua data tentang setiap blok yang pernah diserahkan ke blockchain. Karena kita menjalankan node ringan, direktori ini hanya berisi header blok.

Penting untuk ditekankan di sini bahwa, pada tingkat paling bawah, inilah tempat di mana blockchain tinggal. Konten lengkap blockchain dan state EVM disimpan dalam setiap node penuh di jaringan Ethereum, dalam direktori yang tampak sangat mirip dengan direktori di komputer Anda.

## Bacaan lebih lanjut {#further-reading}

- [Pelajari selengkapnya tentang jaringan yang berbeda](/developers/docs/networks/).
- [Run a full node](/run-a-node/)
