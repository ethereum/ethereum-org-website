---
title: Deprecated software
description: Software which has been deprecated by its maintainers
lang: en
sidebar: true
sidebarDepth: 2
---

# Deprecated software {#summary-deprecated-software}

This is a list of key Ethereum-related projects and resources which have been deprecated or are no longer maintained. It is important to highlight deprecated work so that users can find viable alternatives and to prevent malicious versions from being distributed.

## Software {#software}

This section is for software for the desktop, command line, or server which has been deprecated. The main types are wallets, integrated development environments, languages, and Ethereum clients. Definitely be careful to not install deprecated software unless you are certain it is from the original source, e.g. a repo hosted under https://github.com/ethereum.

### Grid {#grid}

<p align="center">
  <img width="300" height="150" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://user-images.githubusercontent.com/47108/53807420-80433380-3f1d-11e9-80cd-967aabb26506.png" />
</p>

Deprecated on December 10, 2020

**Summary**

Grid was a desktop application that allowed you to securely download, configure, and use various clients and tools in the Ethereum ecosystem. Grid provided a user-friendly interface to assist a less technical audience in safely interacting with technical tools, which increased accessibility for everyone. 


**Archives**

[Archived GitHub repo](https://github.com/ethereum/grid)


**History**

Grid was a successor to Mist, removing the wallet, but adding the ability to host nodes of multiple protocols.


**Alternatives**

[DappNode](https://dappnode.io/) is a platform for deploying and hosting DApps, P2P clients, and blockchain nodes.


### Meteor Dapp Wallet {#meteor-dapp-wallet}

Deprecated on March 27, 2019

**Summary**

This was an important component of Mist, an Ethereum wallet for managing keys, deploying and interacting with smart contracts. For many years the Meteor Dapp Wallet web UI was hosted as a subdomain on ethereum.org. 

The Mist Multisig Contract (solidity code) was also included, and Meteor Dapp Wallet featured a user interface for configuring and deploying it.

**Not deprecated: deployed Mist Multisigs**

The Mist Multisig -- deployed as bytecode to Ethereum mainnet by thousands of users -- continues to be used to store and manage value without incident. [How to Interact with a Mist Multisig Contract](https://support.mycrypto.com/how-to/sending/how-to-interact-with-a-multisig-contract) provides a good overview for how to use these smart contracts.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/meteor-dapp-wallet)

**History**

See Mist below.

**Alternatives**

See the [Ethereum Wallets](https://ethereum.org/wallets/) page on ethereum.org.


### Mist {#mist}

Deprecated on March 27, 2019

**Summary**

Mist was a specialized browser that enabled users to manage Ethereum keys with a built-in wallet and interact with dapps hosted on traditional web.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/mist)

**History**

Mist was an important early experiment because it explored how to manage Ethereum keys, introduced users to financial tools, like multisigs, and demonstrated how the Web3 would work. It also introduced users to innovations like blockies, cute and memorable 8-bit style graphics representing Ethereum keys.

**Alternatives**

[Metamask](https://metamask.io/) is an in-browser wallet enabling you to manage Ethereum keys and interact with dapps. It is available as an extension for Google Chrome and Firefox, and is included in [Brave Browser](https://brave.com/).


### Mix {#mix}

Deprecated on August 11, 2016

**Summary**

Mix was an IDE built in C++ that allowed developers to build and deploy smart contracts to Ethereum.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/mix)

**History**

Mix was of the earliest Ethereum-related applications. See this [presentation by Gavin Wood at Devcon0](https://www.youtube.com/watch?v=hcP_z_wBlaM).

**Alternatives**

[Remix](https://remix.ethereum.org/) is a browser-hosted IDE for Solidity / smart contract development, testing, and deployment. It also has a desktop option.

### Parity {#parity}

<p align="center">
  <img width="230" height="150" 
  	style="background-color:#ccc; padding:0px 10px 0px 10px;"
  	src="https://raw.githubusercontent.com/openethereum/parity-ethereum/v2.7.2-stable/docs/logo-parity-ethereum.svg" />
</p>

Deprecated on June 2, 2020

**Summary**

**Archives**

[Archived GitHub repo](https://github.com/openethereum/parity-ethereum)

**Alternatives**

The sucessor project to Parity Ethereum client is [Open Ethereum](https://github.com/openethereum/openethereum).

The ["Spin up your own Ethereum node"](https://ethereum.org/en/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) resource on ethereum.org includes a section for downloading, installing, and running an Ethereum client.


### Trinity {#trinity}

<p align="center">
  <img width="230" height="150" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://trinity.ethereum.org/images/trinity-logo-icon.svg" />
</p>

**Summary**

Trinity was a python-based Ethereum client which served as a research tool for the community.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/trinity)

**History**

Trinity was the successor project to [pyethereum](https://github.com/ethereum/pyethereum/tree/b704a5c6577863edc539a1ec3d2620a443b950fb), an early python-based Ethereum client.

**Alternatives**

The ["Spin up your own Ethereum node"](https://ethereum.org/en/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) resource on ethereum.org includes a section for downloading, installing, and running an Ethereum client.


## Dapps and Services {#dapps-and-services}


### Cover Protocol {#cover-protocol}

<p align="center">
  <img width="180" height="180" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://pbs.twimg.com/profile_images/1346933366302650371/XIWyVVDL_400x400.jpg" />
</p>

**Summary**

**Archives**

[Website](https://wayback.archive-it.org/17679/20211004074635/https://www.coverprotocol.com/)

[Medium articles](https://wayback.archive-it.org/17679/20211004074633/https://coverprotocol.medium.com/)

[GitHub repos](https://github.com/CoverProtocol/cover-core-v1)

[Documentation](https://wayback.archive-it.org/17679/20211004074634/https://docs.coverprotocol.com/)


### The DAO {#the-dao}

**Summary**

This was a smart contract, dapp, and forum for organizing the funding of projects. A vulnerability was exploited and much of the ETH was drained, leading to a community-organized hard fork in order to return ETH to those who had deposited to The DAO. The UX front-end and forum are discontinued.

**Archives**

[Internet Archive of "daohub.org" on May 14, 2016](https://web.archive.org/web/20160514105232/https://daohub.org/)

**History**

While The DAO failed, the concept endured. The basic technical, social, and governance model innovated for The DAO is widely in use in DeFi, NFT, and project-funding communities.

["DAO Fork" on ethereum.org](https://ethereum.org/en/history/#dao-fork)

[Wikipedia entry for "The DAO"](https://en.wikipedia.org/wiki/The_DAO_(organization))

**Alternatives**

["DAOs" on ethereum.org](https://ethereum.org/en/dao/)

[MolochDAO](https://www.molochdao.com/)

[Gitcoin Grants](https://gitcoin.co/grants/)


### SparkPool {#sparkpool}

<p align="center">
  <img width="200" height="200" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://pbs.twimg.com/profile_images/1143714781666217984/aUVasr8L_400x400.png" />
</p>

**Summary**

This was an Ethereum-centered mining pool based in the PRC. It was disbanded as a result of stricter legal regulations instituted in Fall, 2021.

**Archives**

**History**

**Alternatives**


## Documentation and Information Sources {#documentation-and-information-sources}


### eth.wiki and Legacy Wiki {#eth-wiki}

**Summary**

**Archives**

**History**

**Alternatives**


### forum.ethereum.org {#forum-ethereum-org}

**Summary**

**Archives**

**History**

**Alternatives**


## Gitter Channels {#gitter-channels}

### AllCoreDevs {#allcorewdevs-gitter}

**Summary**

This was the main public coordination comms channel for [Ethereum client core developers](https://github.com/ethereum/pm/).

**Archives**

[ethereum/AllCoreDevs Gitter Channel](https://gitter.im/ethereum/AllCoreDevs)

**Alternatives**

Go to the "allcoredevs" channel on the [EthR&D Discord Server](https://discord.gg/qHv7AjTDuK)


### EthereumJS {#ethereumjs-gitter}

**Summary**

This was the main public coordination comms channel for the [EthereumJS project](https://ethereumjs.github.io/).

**Archives**

[ethereum/EthereumJS Gitter Channel](https://gitter.im/ethereum/ethereumjs)

**Alternatives**

Go to the [EthereumJS Discord Server](https://discord.gg/TNwARpR)





