---
title: Networks
description: An overview of Ethereum's networks and where to get testnet ether (ETH) for testing your application.
lang: en
---

Ethereum networks are groups of connected computers that communicate using the Ethereum protocol. There is only one Ethereum Mainnet, but independent networks conforming to the same protocol rules can be created for testing and development purposes. There are many independent "networks" that conform to the protocol without interacting with each other. You can even start one locally on your own computer for testing your smart contracts and web3 apps.

Your Ethereum account will work across the different networks, but your account balance and transaction history won't carry over from the main Ethereum network. For testing purposes, it's useful to know which networks are available and how to get testnet ETH to play around with. In general, for security considerations, it's not recommended to reuse mainnet accounts on testnets or vice versa.

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

Most testnets started by using a permissioned proof-of-authority consensus mechanism. This means a small number of nodes are chosen to validate transactions and create new blocks – staking their identity in the process. Alternatively, some testnets feature an open proof-of-stake consensus mechanism where everyone can test running a validator, just like Ethereum Mainnet.

ETH on testnets is supposed to have no real value; however, there have been markets created for certain types of testnet ETH that have become scarce or hard to obtain. Since you need ETH to actually interact with Ethereum (even on testnets), most people get testnet ETH for free from faucets. Most faucets are webapps where you can input an address which you request ETH to be sent to.

#### Which Testnet should I use?

The two public testnets that client developers are currently maintaining are Sepolia and Hoodi. Sepolia is a network for contract and application developers to test their applications. The Hoodi network lets protocol developers test network upgrades, and lets stakers test running validators.

#### Sepolia {#sepolia}

**Sepolia is the recommended default testnet for application development**. The Sepolia network uses a permissioned validator set controlled by client & testing teams.

##### Resources

- [Website](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [PoW faucet](https://sepolia-faucet.pk910.de/)
- [Alchemy Sepolia faucet](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Infura Sepolia faucet](https://www.infura.io/faucet)
- [Chainstack Sepolia faucet](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystem faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [Google Cloud Web3 Sepolia faucet](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi is a testnet for testing validating and staking. The Hoodi network is open for users wanting to run a testnet validator. Stakers wanting to test protocol upgrades before they are deployed to mainnet should therefore use Hoodi.

- Open validator set, stakers can test network upgrades
- Large state, useful for testing complex smart contract interactions
- Longer to sync and requires more storage to run a node

##### Resources

- [Website](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [Explorer](https://explorer.hoodi.ethpandaops.io/)
- [Checkpoint Sync](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Hoodi Faucet](https://hoodi.ethpandaops.io/)
- [PoW faucet](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery is a unique kind of testnet that fully resets every month. The execution and consensus state reverts back to genesis every 28 days, which means anything that happens on the testnet is ephemeral. This makes it ideal for a short term testing, fast node bootstrap and 'hello world' kind of applications that don't need permanence. 

- Always fresh state, short term testing of validators and apps
- Includes only basic set of contracts
- Open validator set and easy to access large amounts of funds
- Smallest node requirements and quickest sync, &lt;5GB on average

##### Resources

- [Website](https://ephemery.dev/)
- [Github]( https://github.com/ephemery-testnet/ephemery-resources)
- [Community chat](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [Beacon explorer](https://beaconlight.ephemery.dev/)
- [Checkpoint Sync](https://checkpoint-sync.ephemery.ethpandaops.io)
- [Launchpad]( https://launchpad.ephemery.dev/)

#### Faucets

- [Bordel Faucet](https://faucet.bordel.wtf/)
- [Pk910 PoW Faucet](https://ephemery-faucet.pk910.de/)

#### Holesky {#holesky}

The Holesky testnet will be [deprecated in September 2025](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky). Staking operators and infrastructure providers should use Hoodi for validator testing instead.

##### Resources

- [Website](https://holesky.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/holesky)
- [Otterscan](https://holesky.otterscan.io/)
- [Etherscan](https://holesky.etherscan.io/)
- [Blockscout](https://eth-holesky.blockscout.com/)

##### Faucets

- [QuickNode Holesky Faucet](https://faucet.quicknode.com/ethereum/holesky)
- [PoW faucet](https://holesky-faucet.pk910.de/)
- [Alchemy Holesky Faucet](https://www.alchemy.com/faucets/ethereum-holesky)
- [Chainstack Holesky faucet](https://faucet.chainstack.com/holesky-testnet-faucet)
- [Ethereum Ecosystem faucet](https://www.ethereum-ecosystem.com/faucets/ethereum-holesky)
- [Google Cloud Web3 Holesky faucet](https://cloud.google.com/application/web3/faucet/ethereum/holesky)

To launch a Validator on Hoodi testnet, use [Hoodi launchpad](https://hoodi.launchpad.ethereum.org/en/).

### Layer 2 testnets {#layer-2-testnets}

[Layer 2 (L2)](/layer-2/) is a collective term to describe a specific set of Ethereum scaling solutions. A layer 2 is a separate blockchain that extends Ethereum and inherits the security guarantees of Ethereum. Layer 2 testnets are usually tightly coupled to public Ethereum testnets.

#### Arbitrum Sepolia {#arbitrum-sepolia}

A testnet for [Arbitrum](https://arbitrum.io/).

##### Resources

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/arbitrum-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [QuickNode Arbitrum Sepolia Faucet](https://faucet.quicknode.com/arbitrum/sepolia)
- [Alchemy Arbitrum Sepolia Faucet](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia faucet](https://faucets.chain.link/arbitrum-sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

A testnet for [Optimism](https://www.optimism.io/).

##### Resources

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Chainlink faucet](https://faucets.chain.link/optimism-sepolia)
- [Alchemy faucet](https://www.alchemy.com/faucets/optimism-sepolia)
- [Testnet faucets](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

A testnet for [Starknet](https://www.starknet.io).

##### Resources

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Alchemy faucet](https://www.alchemy.com/faucets/starknet-sepolia)
- [Starknet faucet](https://starknet-faucet.vercel.app/)
- [Blast Starknet Sepolia faucet](https://blastapi.io/faucets/starknet-sepolia-eth)

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

- [Proposal: Predictable Ethereum Testnet Lifecycle](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [The Evolution of Ethereum Testnets](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
