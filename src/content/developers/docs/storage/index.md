---
title: Decentralized Storage
description: Overview of what decentralized storage is and available tools to integrate into a dapp.
lang: en
sidebar: true
incomplete: true
---

# Introduction 

As opposed to a centrally located server operated by a single company or organization, decentralized storage systems consist of a peer-to-peer network of user-operators who hold a portion of the overall data, creating a resilient system of file storage and sharing. These can be in a blockchain-based application, or any peer-to-peer based network. 

Ethereum itself can be used as a decentralized storage system, and in fact it is when it comes to code storage in all the smart contracts. When it comes to large amounts of data, however, that isn't what the system is designed for. At the time of writing, the Ethereum chain is around 350GB, and every node on the network needs to be able to store all 350GB of data. If the chain were to expand to large amounts of data (say 5TBs) it wouldn't be feasible for all nodes to continue to run. Also, this can get incredibly expensive to deploy new data due to the size. 

Due to these constraints, we need a different chain or methodology to storing large amounts of data in a decentralized manner. 

When looking at decentralized storage (dStorage) options, there are a few things a user must keep in mind.

- Persistence mechanism / incentive structure
- Data retention enforcement
- Decentrality 
- Consensus 

## Persistence mechanism / incentive structure

### Blockchain Based

In order for a piece of data to persist forever, their needs to be some type of persistance mechanism. For example, on Ethereum, the persistance mechanism is that the whole chain needs to be accounted for when running a node. New pieces of data are tacked onto the end of the chain, and it continues to grow. 

This is the first type of persistence: **blockchain based** persistence.

The issue with this, is that again, the chain could get far too big to feasibly upkeep and store all the data.

The blockchain must also have some type of incentive structure. The following chains are generally paid at mining time - when the data is added to the chain, the nodes are paid to add the data on. 

Platforms with blockchain based persistence:
- Ethereum
- [Arweave](https://www.arweave.org/)
- [0Chain](https://0chain.net/)

### Contract Based

Contract based persistence has the intuition that data cannot be stored forever, and instead must be upkept with contract agreements. These are agreements made with multiple nodes that have promised to hold a piece of data for a period of time. They must be refunded or renewed whenever they run out to keep the data persisted. 

Often, instead of storing all the data in a chain, they instead store the hash of where the data is located on a chain. This way, the entire chain doesn't need to store all the data, just a hash of where it's located. 

Platforms with contract based persistence:
- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Stroj](https://storj.io/)

### Additional considerations

As a bonus, IPFS doesn't really have a incentive structure for holding data, but it is a great tool in the community. If you'd like data to persist on IPFS, you have to reach out to a pinning service, which will "pin" your data for you. 

- [IPFS](https://ipfs.io/)

## Data retention

In order to retain data, systems must have some sort of mechanism to make sure data is retained.

### Challenge mechanism

One of the most popular ways to make sure data is retained, is to use some type of cryptographic challenge that is issued to the nodes to make sure they still have the data. A simple one is looking at Arweave's proof of access. They issue a challenge to the nodes to see if they have the data at both the most recent block and a random block in the past. If the node can't come up with the answer, they are penalized.

Types of dStorage with a challenge mechanism:
- 0Chain
- Skynet
- Arweave
- Filecoin


### Decentrality

There isn't great tools to measure the level of decentralization of platforms but in general, you'll want to use tools that don't have some form of KYC to prove they are actually decentralized.

Decentralized tools without KYC:
- 0Chain (implementing a non-KYC edition)
- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum

### Consensus

Most of these tools have their own version of a [consensus mechanism](/developers/docs/consensus-mechanisms/) but generally they are based on either [Proof of Work (PoW)](/developers/docs/consensus-mechanisms/pow/) or [Proof of Stake (PoS)](/developers/docs/consensus-mechanisms/pos/).

PoW based:
- Skynet
- Arweave
- Ethereum

PoS based:
- ETH 2
- Filecoin
- 0Chain

## Related tools {#related-tools}

**IPFS -** **_InterPlanetary File System is a decentralized storage and file referencing system for Ethereum._**

- [ipfs.io](https://ipfs.io/)
- [Documentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Skynet -** **_Skynet is a decentralized PoW chain dedicated to a decentralized web._**
- [Skynet](https://siasky.net/)
- [Documentation](https://siasky.net/docs/)

**Filecoin -** **_Filecoin was created from the same team behind IPFS. It is an incentive layer on top of the IPFS ideals._**
- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Documentation](https://docs.filecoin.io/)
- [Github](https://github.com/filecoin-project)

**Arweave -** **_Arweave is a dStorage platform for storing data._**
- [Arweave](https://www.arweave.org/)
- [Documentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave)

**0chain -** **_0Chain is a proof of stake dStorage platform with sharding and blobbers._**
- [0Chain](https://0chain.net/)
- [Documentation](https://0chain.net/page-documentation.html)
- [Github](https://github.com/0chain)

**Swarm -** **_A distributed storage platform and content distribution service for the Ethereum web3 stack._**

- [Swarm](https://ethersphere.github.io/swarm-home/)
- [GitHub](https://github.com/ethersphere/swarm)

**OrbitDB -** **_A decentralized peer to peer database on top of IPFS._**

- [Documentation](https://github.com/orbitdb/field-manual)
- [GitHub](https://github.com/orbitdb/orbit-db)

**3Box -** **_User-controlled IPFS database storage for data-rich and engaging applications. Support for profiles, encrypted spaces, and messaging, with additional drop-in plugins to simplify development._**

- [3Box](https://3box.io)
- [3Box.js](https://github.com/3box/3box-js)
- [3Box Plugins](https://docs.3box.io/learn/building-a-distributed-appstore-with-3box#5723)

**Aleph.im -** **_Decentralized cloud project (database, file storage, computing and DID). A unique blend of offchain and onchain peer-to-peer technology. IPFS and multi-chain compatibility._**

- [Aleph.im](https://aleph.im/)
- [Documentation](https://aleph.im/#/developers)
- [GitHub](https://github.com/aleph-im/)

## Further reading {#further-reading}

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Development frameworks](/en/developers/docs/frameworks/)
