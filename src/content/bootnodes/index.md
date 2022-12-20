---
title: Bootnodes
description: The basic information you need to understand bootnodes
lang: en
---

# Introduction to Ethereum Bootnodes {#bootnodes}

## What are bootnodes? {#what-are-bootnodes}

When a new node joins the Ethereum network it needs to connect to nodes that are already on the network in order to discover new nodes. These entrypoints into the Ethereum network are called bootnodes. Clients usually have a list of bootnodes built in that are run by the Ethereum Foundation or the client teams themselves.

## Connect to a bootnode {#connect-to-bootnode}

Most clients have a list of bootnodes build in, but you might want to connect to other bootnodes to connect by specifiying them when starting your client:
```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Run a bootnode {#run-a-bootnode}

Bootnodes are full nodes that are not behind a NAT. Every full node can act as a bootnode as long as it is publicly available.
When you start up a node it should log your enode, which is a public identifier that others can use to connect to your node.
The enode is usually regenerated on every restart, so make sure to look at your clients documentation on how to generate a persistent enode for your bootnode. 

In order to be a good bootnode it's a good idea to increase the maximum number of peers that can connect to it. Running a bootnode with many peers will increase the bandwith requirement significantly.

## Available bootnodes

A list of builtin bootnodes within go-ethereum can be found [here](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). These bootnodes are maintained by the Ethereum Foundation and the go-ethereum team. 

There are other lists of bootnodes maintained by volunteers available. Please make sure to always include at least one official bootnode, otherwise you could be eclipse attacked.
