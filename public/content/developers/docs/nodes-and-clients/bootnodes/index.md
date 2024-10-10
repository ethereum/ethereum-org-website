---
title: Introduction to Ethereum Bootnodes
description: The basic information you need to understand bootnodes
lang: en
---

When a new node joins the Ethereum network it needs to connect to nodes that are already on the network in order to then discover new peers. These entry points into the Ethereum network are called bootnodes. Clients usually have a list of bootnodes hardcoded into them. These bootnodes are typically run by the Ethereum Foundation's devops team or client teams themselves. Note that bootnodes are not the same as static nodes. Static nodes are called over and over again, whereas bootnodes are only called upon if there are not enough peers to connect to and a node needs to bootstrap some new connections.

## Connect to a bootnode {#connect-to-a-bootnode}

Most clients have a list of bootnodes builtin, but you might also want to run your own bootnode, or use one that is not part of the client's hardcoded list. In this case, you can specify them when starting your client, as follows (example is for Geth, please check your client's documentation):

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## Run a bootnode {#run-a-bootnode}

Bootnodes are full nodes that are not behind a NAT ([Network Address Translation](https://www.geeksforgeeks.org/network-address-translation-nat/)). Every full node can act as a bootnode as long as it is publicly available.

When you start up a node it should log your [enode](/developers/docs/networking-layer/network-addresses/#enode), which is a public identifier that others can use to connect to your node.

The enode is usually regenerated on every restart, so make sure to look at your client's documentation on how to generate a persistent enode for your bootnode.

In order to be a good bootnode it's a good idea to increase the maximum number of peers that can connect to it. Running a bootnode with many peers will increase the bandwidth requirement significantly.

## Available bootnodes {#available-bootnodes}

A list of builtin bootnodes within go-ethereum can be found [here](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23). These bootnodes are maintained by the Ethereum Foundation and the go-ethereum team.

There are other lists of bootnodes maintained by volunteers available. Please make sure to always include at least one official bootnode, otherwise you could be eclipse attacked.
