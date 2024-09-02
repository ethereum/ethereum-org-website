---
title: Decentralized Storage
description: Overview of what decentralized storage is and the available tools to integrate it into a dapp.
lang: en
---

Unlike a centralized server operated by a single company or organization, decentralized storage systems consist of a peer-to-peer network of user-operators who hold a portion of the overall data, creating a resilient file storage sharing system. These can be in a blockchain-based application or any peer-to-peer-based network.

Ethereum itself can be used as a decentralized storage system, and it is when it comes to code storage in all the smart contracts. However, when it comes to large amounts of data, that isn't what Ethereum was designed for. The chain is steadily growing, but at the time of writing, the Ethereum chain is around 500GB - 1TB ([depending on the client](https://etherscan.io/chartsync/chaindefault)), and every node on the network needs to be able to store all of the data. If the chain were to expand to large amounts of data (say 5TBs) it wouldn't be feasible for all nodes to continue to run. Also, the cost of deploying this much data to Mainnet would be prohibitively expensive due to [gas](/developers/docs/gas) fees.

Due to these constraints, we need a different chain or methodology to store large amounts of data in a decentralized way.

When looking at decentralized storage (dStorage) options, there are a few things a user must keep in mind.

- Persistence mechanism / incentive structure
- Data retention enforcement
- Decentrality
- Consensus

## Persistence mechanism / incentive structure {#persistence-mechanism}

### Blockchain-based {#blockchain-based}

For a piece of data to persist forever, we need to use a persistence mechanism. For example, on Ethereum, the persistence mechanism is that the whole chain needs to be accounted for when running a node. New pieces of data get tacked onto the end of the chain, and it continues to grow - requiring every node to replicate all the embedded data.

This is known as **blockchain-based** persistence.

The issue with blockchain-based persistence is that the chain could get far too big to upkeep and store all the data feasibly (e.g. [many sources](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estimate the Internet to require over 40 Zetabytes of storage capacity).

The blockchain must also have some type of incentive structure. For blockchain-based persistence, there is a payment made to the validator. When the data is added to the chain, the validators are paid to add the data on.

Platforms with blockchain-based persistence:

- Ethereum
- [Arweave](https://www.arweave.org/)

### Contract-based {#contract-based}

**Contract-based** persistence has the intuition that data cannot be replicated by every node and stored forever, and instead must be upkept with contract agreements. These are agreements made with multiple nodes that have promised to hold a piece of data for a period of time. They must be refunded or renewed whenever they run out to keep the data persisted.

In most cases, instead of storing all data on-chain, the hash of where the data is located on a chain gets stored. This way, the entire chain doesn't need to scale to keep all of the data.

Platforms with contract-based persistence:

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Additional considerations {#additional-consideration}

IPFS is a distributed system for storing and accessing files, websites, applications, and data. It doesn't have a built-in incentive scheme, but can instead be used with any of the contract-based incentive solutions above for longer-term persistence. Another way to persist data on IPFS is to work with a pinning service, which will "pin" your data for you. You can even run your own IPFS node and contribute to the network to persist your and/or other's data for free!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS pinning service)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin pinning service)_
- [Infura](https://infura.io/product/ipfs) _(IPFS pinning service)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS pinning explorer)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS pinning service）_
- [Filebase](https://filebase.com) _(IPFS Pinning Service)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin pinning service)_

SWARM is a decentralized data storage and distribution technology with a storage incentive system and a storage rent price oracle.

## Data retention {#data-retention}

In order to retain data, systems must have some sort of mechanism to make sure data is retained.

### Challenge mechanism {#challenge-mechanism}

One of the most popular ways to make sure data is retained, is to use some type of cryptographic challenge that is issued to the nodes to make sure they still have the data. A simple one is looking at Arweave's proof-of-access. They issue a challenge to the nodes to see if they have the data at both the most recent block and a random block in the past. If the node can't come up with the answer, they are penalized.

Types of dStorage with a challenge mechanism:

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Decentrality {#decentrality}

There aren't great tools to measure the level of decentralization of platforms, but in general, you'll want to use tools that don't have some form of KYC to provide evidence they are not centralized.

Decentralized tools without KYC:

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consensus {#consensus}

Most of these tools have their own version of a [consensus mechanism](/developers/docs/consensus-mechanisms/) but generally they are based on either [**proof-of-work (PoW)**](/developers/docs/consensus-mechanisms/pow/) or [**proof-of-stake (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Proof-of-work based:

- Skynet
- Arweave

Proof-of-stake based:

- Ethereum
- Filecoin
- Züs
- Crust Network

## Related tools {#related-tools}

**IPFS - _InterPlanetary File System is a decentralized storage and file referencing system for Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Secure, private, and S3-compatible decentralized cloud object storage for developers._**

- [Storj.io](https://storj.io/)
- [Documentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _Skynet is a decentralized PoW chain dedicated to a decentralized web._**

- [Skynet.net](https://siasky.net/)
- [Documentation](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin was created from the same team behind IPFS. It is an incentive layer on top of the IPFS ideals._**

- [Filecoin.io](https://filecoin.io/)
- [Documentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave is a dStorage platform for storing data._**

- [Arweave.org](https://www.arweave.org/)
- [Documentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs is a proof-of-stake dStorage platform with sharding and blobbers._**

- [zus.network](https://zus.network/)
- [Documentation](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust is a dStorage platform on top of the IPFS._**

- [Crust.network](https://crust.network)
- [Documentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _A distributed storage platform and content distribution service for the Ethereum web3 stack._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentation](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _A decentralized peer to peer database on top of IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Decentralized cloud project (database, file storage, computing and DID). A unique blend of offchain and onchain peer-to-peer technology. IPFS and multi-chain compatibility._**

- [Aleph.im](https://aleph.im/)
- [Documentation](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _User-controlled IPFS database storage for data-rich and engaging applications._**

- [Ceramic.network](https://ceramic.network/)
- [Documentation](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3-compatible decentralized storage and geo-redundant IPFS pinning service. All files uploaded to IPFS through Filebase are automatically pinned to the Filebase infrastructure with 3x replication across the globe._**

- [Filebase.com](https://filebase.com/)
- [Documentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _A Web 3.0 cloud computing platform that integrates storage, compute and networking core capabilities, is S3 compatible and provides synchronous data storage on decentralized storage networks such as IPFS and Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _A blockchain-as-a-service platform with click-button IPFS Nodes_**

- [Kaleido](https://kaleido.io/)
- [Documentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron is a platform-as-a-service (PaaS) designed for dApps looking to launch their applications on decentralized infra with best performance. It provides compute, decentralized storage, CDN & web hosting out of the box._**

- [spheron.network](https://spheron.network/)
- [Documentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Further reading {#further-reading}

- [What Is Decentralized Storage?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Busting Five Common Myths about Decentralized Storage](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Know of a community resource that helped you? Edit this page and add it!_

## Related topics {#related-topics}

- [Development frameworks](/developers/docs/frameworks/)
