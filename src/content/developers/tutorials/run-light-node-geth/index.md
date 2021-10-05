---
title: How to run a light node with Geth
description: How to download, install and run Geth. Covering syncmodes, the Javascript console, and more
author: "Brian Gu"
tags: ["clients", "geth", "nodes"]
skill: intermediate
lang: en
sidebar: true
published: 2020-06-14
---

You may be interested in running an [Ethereum node](/developers/docs/nodes-and-clients/). One of the easiest ways to do so is by downloading, installing, and running Geth. With Geth, we can have a light node up and running in minutes.

First, you’ll want to [install Geth](https://github.com/ethereum/go-ethereum/wiki/Building-Ethereum).

Once you’ve installed Geth, running an Ethereum full node is as simple as typing

```bash
$ geth
```

into the command line (without the dollar sign). Don’t do this just yet! When you run `geth`, Geth will:

- Initialize a local copy of a blank-state EVM
- Start downloading all blocks in Ethereum history, starting from block 0.
- Replay all transactions in all blocks in order, updating the state of the EVM with each transaction until it reaches the present-day state.

This process may take anywhere from hours to days, and requires a few hundred GB of free space. For now, we’ll just run a light node on a testnet to familiarize ourselves with how to use Geth. To do this, we'll have to go through a few important command-line options and tools.

## Mainnet and Testnet {#mainnet-and-testnet}

By default, Geth runs a Mainnet node. You can run `geth --ropsten` to run a Ropsten testnet full node. You can run a node on Rinkeby by swapping `ropsten` for `rinkeby`.

[Learn more about different networks](/developers/docs/networks/).

## Syncmode {#syncmode}

Geth has three `syncmode`s.

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

`"full"` runs a full node exactly as you’d expect - your machine initializes a local copy of the EVM in its original clean state, downloads every block since the beginning of the blockchain, and executes every transaction in every block, updating the EVM state until it reaches the present-day EVM state.

`"fast"` downloads all blocks, but also downloads a recent snapshot of the EVM state from a peer (currently the state of the EVM 64 blocks in the past), executing transactions in only the most recent blocks until it reaches the current EVM state. The advantage of `"fast"` is that it takes much less time to synchronize to the present state; however, it relies on a full archival node peer for a state snapshot, so it isn’t verifying everything for itself.

Finally, `"light"` runs a light node, which we discussed above.

For a great explanation of the differences between the three syncmodes, see this [stack exchange answer](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast).

## Documentation and other command line options {#documentation-and-other-command-line-options}

- [Full documentation](https://geth.ethereum.org/docs/)
- [All command line options](https://geth.ethereum.org/docs/interface/command-line-options)

## Running your light node {#running-your-light-node}

We’ll run a light testnet node to familiarize ourselves with how to manage and interact with a node. To do so, simply run

```bash
$ geth --ropsten --syncmode "light"
```

Wait a few seconds, and hopefully you should get output that looks something like:

```bash
$ geth --ropsten --syncmode "light"
INFO [11-18|14:04:47] Maximum peer count                       ETH=0 LES=100 total=25
INFO [11-18|14:04:47] Starting peer-to-peer node               instance=Geth/v1.8.11-stable/darwin-amd64/go1.10.3
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
INFO [11-18|14:04:47] Persisted trie from memory database      nodes=355 size=51.89kB time=561.839µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [11-18|14:04:47] Initialised chain configuration          config="{ChainID: 3 Homestead: 0 DAO: <nil> DAOSupport: true EIP150: 0 EIP155: 10 EIP158: 10 Byzantium: 1700000 Constantinople: <nil> Engine: ethash}"
INFO [11-18|14:04:47] Disk storage enabled for ethash caches   dir=/Users/bgu/Library/Ethereum/testnet/geth/ethash count=3
INFO [11-18|14:04:47] Disk storage enabled for ethash DAGs     dir=/Users/bgu/.ethash                              count=2
INFO [11-18|14:04:47] Added trusted checkpoint                 chain=ropsten block=3375103 hash=9017ab…249e89
INFO [11-18|14:04:47] Loaded most recent local header          number=0 hash=419410…ca4a2d td=1048576
INFO [11-18|14:04:47] Starting P2P networking
INFO [11-18|14:04:49] UDP listener up                          net=enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303
WARN [11-18|14:04:49] Light client mode is an experimental feature
INFO [11-18|14:04:49] RLPx listener up                         self="enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303?discport=0"
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
INFO [11-18|14:04:51] Mapped network port                      proto=udp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:04:51] Mapped network port                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:08:55] Block synchronisation started
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=1.574s number=3375295 hash=62f6b1…95c47f ignored=0
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=127.088ms number=3375487 hash=ae759b…453ac5 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=960 elapsed=582.125ms number=3376447 hash=4cab62…445b82 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=169.936ms number=3376639 hash=470614…85ce15 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=384 elapsed=245.745ms number=3377023 hash=dad8ee…2862d2 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=128.514ms number=3377215 hash=ebcd84…ea26cb ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=125.427ms number=3377407 hash=fca10c…8ed04d ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.536ms number=3377599 hash=9aa141…f34080 ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.849ms number=3377791 hash=499f2d…e0c713 ignored=0
```

Note: You may not see “Block synchronisation started” and the following “Imported new block headers” messages for several minutes, or even hours if you’re particularly unlucky. During this time, your client is trying to find full node peers willing to serve light clients. In the example above, we can tell by the timestamps that my machine had to wait about four minutes between starting to look for peers and actually finding a peer to download blocks from. This is currently an open issue within the Ethereum community - how do we incentivize people to run full nodes which serve light clients?

Once block synchronization starts, it’ll take a few minutes for your machine to catch up to the latest blocks on the blockchain. At that point, your output will start looking like:

```bash
INFO [11-18|16:06:04.025] Imported new block headers               count=2   elapsed=6.253ms   number=4456862 hash=ce0a0b…6ab128
INFO [11-18|16:06:27.819] Imported new block headers               count=2   elapsed=5.982ms   number=4456864 hash=04a054…b4f661
INFO [11-18|16:06:34.080] Imported new block headers               count=2   elapsed=4.774ms   number=4456866 hash=15a43c…efc782
INFO [11-18|16:06:45.464] Imported new block headers               count=2   elapsed=5.213ms   number=4456868 hash=eb02d5…227564
INFO [11-18|16:07:11.630] Imported new block headers               count=2   elapsed=5.835ms   number=4456870 hash=67daa7…66892d
```

At this point, messages will start coming in only every 10-30 seconds, and the value of `count` will be in the single digits for each message.

## Where is the blockchain and EVM data stored? {#where-is-the-blockchain-and-evm-data-stored}

The directory which Geth uses to store raw blockchain data depends on your operating system. Upon running Geth, look for a message that looks like

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

The path following `“database=”` should tell you where the blockchain data is stored on your machine. If you’re running a full node, this directory will contain all of the data about every block that has ever been committed to the blockchain. Since we’re running a light node, this directory only contains the block headers.

It’s worth emphasizing here that, at the lowest level, this is where the blockchain lives. The full contents of the blockchain and the EVM state are stored on every full node in the Ethereum network, in directories that look very much like the one on your computer.

## Attaching to the Javascript Console {#attaching-to-the-javascript-console}

Running a node isn’t useful unless we can actually interact with it. For example, we might want to broadcast transaction requests or look up EVM/blockchain data (such as an account balance). Geth has a built-in Javascript console and a Javascript API called [web3js](https://github.com/ethereum/web3.js/) that you can use to interact with your node.

To use the Javascript console:

1. Start running a node in a terminal window (either full and light node are OK).
2. Look for a message that looks like:

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

This message should be logged before block synchronization starts.

3. This message indicates the path to the IPC (inter-process communication) endpoint. Copy this path (in the example above, it’s `/Users/bgu/Library/Ethereum/testnet/geth.ipc`).
4. Open a new terminal window or tab, and run the following command:
   `$ geth attach [your IPC endpoint path]`

This should open the Javascript console. We can now use web3js to interact with the node.

[Full web3js documentation](http://web3js.readthedocs.io/)

Here are a few helpful objects exposed by this API. You access these by typing them into the Javascript console.

- `eth.syncing` returns an object if your node has started but not completed block synchronization, or the value `false` if it has either completed synchronization or has not started. If the node is still synchronizing, `eth.syncing` will tell you the latest block number whose data you’ve received, as well as the total number of blocks in the current blockchain.
- `net.peerCount` returns the number of peers you’re connected to. If this is 0, you’ll probably have to either wait a few minutes or else start Googling for solutions (could be a firewall or network issue, or something else).
- `admin.peers` will give you a list of all peers that your node is connected to. If this is empty, then your node is not connected to any other peers.

We can also use web3js to initialize accounts, write and broadcast transaction requests to the network, look up account balances and metadata, and more. We’ll cover these operations in a later section; for now, try running the following to look up the balance of one of my accounts on the Ropsten testnet:

```js
eth.getBalance('0x85d918c2B7F172d033D190152AEc58709Fb6D048')
# returns 1059286000000000000 as of 11-18-2018. This value is reported in "Wei".
# One Wei is a denomination which is equivalent to 10^-18 ether.
# The balance of this account in ether is about 1.059eth.
```

## Stopping and restarting your node {#stopping-and-restarting-your-node}

You can stop your node at any time by pressing `CTRL+C`. If you want to restart the node, Geth will take a few seconds or minutes to re-synchronize (downloading the blocks and/or block headers from where it left off when the node last stopped running). If any of the above instructions aren’t working, the first thing you should do is try restarting your node.

```bash
$ geth --ropsten --syncmode "light"
```

Replace 'ropsten' with other testnet names as needed, or use 'mainnet'.

If you are interested in running an Ethereum full node, it is generally best to do so from a dedicated machine with good network connectivity, rather than from a personal computer. Here is a guide to running a node with AWS (this is a little outdated and the referenced AMIs are no longer recent or available, so you might have to do some Googling): [How to run a node on AWS](https://medium.com/mercuryprotocol/how-to-run-an-ethereum-node-on-aws-a8774ed3acf6)
