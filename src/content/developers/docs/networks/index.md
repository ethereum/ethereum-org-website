---
title: Networks
description: An overview of Ethereum's networks and where to get testnet ether (ETH) for testing your application.
lang: en
---

Networks are different Ethereum environments you can access for development, testing, or production use cases. Since Ethereum is a protocol, there can be multiple independent "networks" that conform to the protocol without interacting with each other.

Your Ethereum account will work across the different networks, but your account balance and transaction history won't carry over from the main Ethereum network. For testing purposes, it's useful to know which networks are available and how to get testnet ETH to play around with.

## Prerequisites {#prerequisites}

You should understand the [basics of Ethereum](/developers/docs/intro-to-ethereum/) before reading up on the different networks, as the test networks will give you a cheap, safe version of Ethereum to play around with.

## Public networks {#public-networks}

Public networks are accessible to anyone in the world with an internet connection. Anyone can read or create transactions on a public blockchain and validate the transactions being executed. The consensus among peers decides on the inclusion of transactions and the state of the network.

### Ethereum Mainnet {#ethereum-mainnet}

Mainnet is the primary public Ethereum production blockchain, where actual-value transactions occur on the distributed ledger.

When people and exchanges discuss ETH prices, they're talking about Mainnet ETH.

### Ethereum Testnets {#ethereum-testnets}

In addition to Mainnet, there are public testnets. These are networks used by protocol developers or smart contract developers to test both protocol upgrades as well as potential smart contracts in a production-like environment before deployment to Mainnet. Think of this as an analog to production versus staging servers.

You should test any contract code you write on a testnet before deploying to Mainnet. Among dapps that integrate with existing smart contracts, most projects have copies deployed to testnets.

Most testnets started by using a proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. Alternatively, some testnets started off using a proof-of-work consensus mechanism with just a few permissioned miners. However, in preparation for [The Merge](/upgrades/merge), these testnets underwent their own transitions to proof-of-stake, offering the opportunity for multiple 'dress-rehearsals' before developers merged Ethereum Mainnet. The Ethereum testnets are now proof-of-stake, just like Ethereum Mainnet.

ETH on testnets has no real value; therefore, there are no markets for testnet ETH. Since you need ETH to actually interact with Ethereum, most people get testnet ETH from faucets. Most faucets are webapps where you can input an address which you request ETH to be sent to.

#### Which Testnet should I use?

The two public proof-of-stake testnets (which client developers are maintaining post-merge) are Goerli and Sepolia. The Goerli network was merged with the Prater Beacon Chain testnet. The Sepolia network was created to test the transition to proof-of-stake.

**[Sepolia](#sepolia) is the recommended default testnet for application development**.
The Sepolia network uses a permissioned validator set. It's fairly new, meaning its state and history are both quite small. This means the network is quick to sync to and that running a node on it requires less storage. This is useful for users who want to quickly spin up a node and interact with the network directly.

- Closed validator set, controlled by client & testing teams
- New testnet, less applications deployed than other testnets
- Fast to sync and running a node requires minimal disk space

**[Goerli](#goerli) is the recommended default testnet for testing of validating and staking**.
The Goerli network is open for users wanting to run a testnet validator. Stakers wanting to test protocol upgrades before they are deployed to mainnet should therefore use Goerli.

- Open validator set, stakers can test network upgrades
- Large state, useful for testing complex smart contract interactions
- Longer to sync and requires more storage to run a node

#### Sepolia {#sepolia}

Sepolia is a proof-of-stake testnet, and is the recommended default testnet for application development.

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/goerli/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Sepolia faucets

- [Sepolia faucet](https://faucet.sepolia.dev/)
- [FaucETH](https://fauceth.komputing.org)

#### Goerli {#goerli}

Goerli is a proof-of-stake testnet, and is the recommended default testnet for testing of validating and staking.

- [Website](https://goerli.net/)
- [GitHub](https://github.com/goerli/testnet)
- [Etherscan](https://goerli.etherscan.io)

##### Goerli faucets

- [Goerli faucet](https://faucet.goerli.mudit.blog/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)
- [All That Node Goerli Faucet](https://www.allthatnode.com/faucet/ethereum.dsrv)

To launch a Validator on Goerli testnet, use ethstaker's ["cheap goerli validator" launchpad](https://goerli.launchpad.ethstaker.cc/en/).

#### Ropsten _(deprecated)_ {#ropsten}

_Note, [the Ropsten testnet is deprecated](https://github.com/ethereum/pm/issues/460) and will no longer receive protocol upgrades. Please consider migrating your applications to Sepolia or Goerli._

Ropsten is a proof-of-stake testnet. Ropsten will be deprecated in late 2022. Before undergoing The Merge in May 2022, Ropsten was a proof-of-work testnet.

##### Ropsten faucets

- [FaucETH](https://fauceth.komputing.org) (multi-Chain faucet without the need for social account)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Rinkeby _(deprecated)_ {#rinkeby}

_Note: [the Rinkeby testnet is deprecated](https://github.com/ethereum/pm/issues/460) and will no longer receive protocol upgrades. Please consider migrating your applications to Sepolia or Goerli._

A proof-of-authority testnet for those running old versions of the Geth client.

##### Rinkeby faucets

- [FaucETH](https://fauceth.komputing.org) (multi-Chain faucet without the need for social account)
- [Alchemy faucet](https://RinkebyFaucet.com)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)
- [Rinkeby faucet](https://faucet.rinkeby.io/)

#### Kovan _(deprecated)_ {#kovan}

_Note: [the Kovan testnet is deprecated](https://github.com/ethereum/pm/issues/460) and will no longer receive protocol upgrades. Please consider migrating your applications to Sepolia or Goerli._

A very old proof-of-authority testnet for those still running OpenEthereum clients.

##### Kovan faucets

- [FaucETH](https://fauceth.komputing.org) (multi-Chain faucet without the need for social account)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

### Layer 2 testnets {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) is a collective term to describe a specific set of Ethereum scaling solutions. A layer 2 is a separate blockchain that extends Ethereum and inherits the security guarantees of Ethereum. Layer 2 testnets are usually tightly coupled to public Ethereum testnets.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

A testnet for [Arbitrum](https://arbitrum.io/).

Arbitrum Rinkeby faucets:

- [FaucETH](https://fauceth.komputing.org) (multi-Chain faucet without the need for social account)
- [Chainlink faucet](https://faucets.chain.link/)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

A testnet for [Optimism](https://www.optimism.io/).

Optimistic Kovan faucets:

- [FaucETH](https://fauceth.komputing.org) (multi-Chain faucet without the need for social account)
- [Paradigm faucet](https://faucet.paradigm.xyz/)

## Private networks {#private-networks}

An Ethereum network is a private network if its nodes are not connected to a public network (i.e. Mainnet or a testnet). In this context, private only means reserved or isolated, rather than protected or secure.

### Development networks {#development-networks}

To develop an Ethereum application, you'll want to run it on a private network to see how it works before deploying it. Similar to how you create a local server on your computer for web development, you can create a local blockchain instance to test your dapp. This allows for much faster iteration than a public testnet.

There are projects and tools dedicated to assist with this. Learn more about [development networks](/developers/docs/development-networks/).

### Consortium networks {#consortium-networks}

The consensus process is controlled by a pre-defined set of nodes that are trusted. For example, a private network of known academic institutions that each govern a single node, and blocks are validated by a threshold of signatories within the network.

If a public Ethereum network is like the public internet, a consortium network is like a private intranet.

## Related tools {#related-tools}

- [Chainlist](https://chainlist.org/) _list of EVM networks to connect wallets and providers to the appropriate Chain ID and Network ID_
- [EVM-based Chains](https://github.com/ethereum-lists/chains) _GitHub repo of chain metadata that powers Chainlist_

## Further reading {#further-reading}

- [The Evolution of Ethereum Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
