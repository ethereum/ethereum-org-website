---
title: Deprecated software
description: Software which has been deprecated by its maintainers
lang: en
sidebarDepth: 2
---

# Deprecated software {#summary-deprecated-software}

This is a list of key Ethereum-related projects and resources which have been deprecated or are no longer maintained. It is important to highlight deprecated work so that users can find viable alternatives and to prevent malicious versions from being distributed.

This list is curated by our community. If there's something missing or incorrect, please edit this page!

## Proof-of-work {#pow}

[Proof of work](/developers/docs/consensus-mechanisms/pow) is a consensus engine that was implemented in Ethereum until September 2022. It was deprecated when Ethereum swapped to a [proof-of-stake](/developers/docs/consensus-mechanisms/pos) based consensus mechanism. This was achieved by deprecating the parts of the client software related to proof-of-work mining, including [Ethhash](/developers/docs/consensus-mechanisms/pow/mining-algorithms/ethhash) (the mining algorithm) and all the consensus logic and block gossiping functionality that was originally built in to execution clients. The clients themselves were not deprecated but several of their core components were. The concept of proof-of-work was deprecated as the total effect of removing the related components of the client software.

## Software {#software}

This section is for software for the desktop, command line, or server which has been deprecated. The main types are wallets, integrated development environments, languages, and Ethereum clients. Definitely be careful to not install deprecated software unless you are certain it is from the original source, e.g. a repo hosted under https://github.com/ethereum.

### OpenEthereum {#open-ethereum}

<p align="center">
  <img width="300" height="180" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://miro.medium.com/max/1400/1*npKIT4jX5WwlRZmcBPusig.png" />
</p>

Deprecated July 2021

**Summary**

OpenEthereum was the second largest Ethereum implementation by node count. OpenEthereum played an important role in being a key piece of infrastructure for some of the largest users in Ethereum like Etherscan and Gnosis Safe. Its tracing capabilities set it apart from other clients, ensuring reliable and fast synchronization for data providers.

**Archives**

[Archived GitHub repo](https://github.com/openethereum/openethereum)

**History**

OpenEthereum was built for miners, service providers, and exchanges which need fast synchronization and maximum uptime. OpenEthereum provided the core infrastructure essential for speedy and reliable services.

**Alternatives**

[Compare all Ethereum execution client options](/developers/docs/nodes-and-clients/#execution-clients).

### Grid {#grid}

<p align="center">
  <img width="300" height="150" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://user-images.githubusercontent.com/47108/53807420-80433380-3f1d-11e9-80cd-967aabb26506.png" />
</p>

Deprecated on December 10, 2020

**Summary**

Grid was a JavaScript-based desktop application that allowed you to securely access Ethereum, IPFS, and other decentralized networks. It provided a user-friendly interface to assist a less technical audience in safely interacting with dapps, which increased accessibility for everyone.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/grid)

**History**

Grid could be seen as a successor to Mist, also a standalone, JavaScript-based desktop app which included a Geth node. Grid removed the wallet aspect, and added a plugin-style approach for running different kinds of nodes.

**Alternatives**

[DAppNode](https://dappnode.io/) is a platform for deploying and hosting dapps, P2P clients, and blockchain nodes.

### Ethereum Studio {#ethereum-studio}

<p align="center">
  <img width="500" height="350" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://user-images.githubusercontent.com/7814134/78335917-d0f8e600-758e-11ea-91e1-2433eaaef6f4.png" />
</p>

Deprecated on December 7, 2020

**Summary**

Ethereum Studio was a web-based IDE which allowed users to create and test smart contracts, as well as build front-ends for them.

**Archives**

[Archived GitHub repo](https://github.com/SuperblocksHQ/ethereum-studio)

**History**

Ethereum Studio was developed to provide users with an IDE that had a built-in Ethereum blockchain and Solidity compiler. In addition to this it provided the ability to live edit code and export full dapps without the need for a terminal.

**Alternatives**

[Remix](https://remix.ethereum.org/) is an alternative web IDE for Solidity development. Additionally, the [Developer Portal](/developers/) has tools for web and local development, documentation, and more.

### Meteor Dapp Wallet {#meteor-dapp-wallet}

<p align="center">
  <img width="600" height="450" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://miro.medium.com/max/700/0*L222OAjPhe_KL1Iy." />
</p>

Deprecated on March 27, 2019

**Summary**

Meteor Dapp Wallet was a component of Mist, an Ethereum wallet for managing Ethereum accounts and interacting with smart contracts. For many years the Meteor Dapp Wallet web UI was hosted as a subdomain "wallet.ethereum.org".

The Mist Multisig Contract (solidity code) was also included, and Meteor Dapp Wallet featured a user interface for configuring and deploying it.

**Not deprecated: deployed Mist Multisigs**

The Mist Multisig -- deployed as bytecode to Ethereum Mainnet by thousands of users -- continues to be used to store and manage value without incident. [How to Interact with a Mist Multisig Contract](https://support.mycrypto.com/how-to/sending/how-to-interact-with-a-multisig-contract) provides a good overview for how to use these smart contracts.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/meteor-dapp-wallet)

**History**

See Mist below.

**Alternatives**

See the [Ethereum Wallets](/wallets/) page on ethereum.org.

### Mist {#mist}

<p align="center">
  <img width="120" height="200" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://mist.ethereum.org/images/logo@2x.png" />
</p>

Deprecated on March 27, 2019

**Summary**

Mist was a specialized browser built with Electron that enabled users to manage Ethereum accounts and interact with dapps hosted on the traditional web.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/mist)

**History**

Mist was an important early experiment because it explored how to manage Ethereum keys, introduced users to financial tools, like multisigs, and demonstrated how the Web3 would work. It also introduced users to innovations like blockies, cute and memorable 8-bit style graphics representing Ethereum keys.

**Alternatives**

[MetaMask](https://metamask.io/) is an in-browser wallet enabling you to manage Ethereum keys and interact with dapps. It is available as an extension for Google Chrome and Firefox, and is included in [Brave Browser](https://brave.com/).

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

### Minimal {#minimal}

Deprecated in 2020.

**Summary**

Minimal was a modular implementation of the Ethereum blockchain written in Go.

**Archives**

[Archived GitHub repo](https://github.com/umbracle/minimal)

**History**

Minimal was replaced by [polgon-sdk](https://github.com/0xPolygon/polygon-edge)

### Hyperledger Burrow {#hyperledger-burrow}

Deprecated in 2022.

**Summary**

Hyperledger Burrow was a permissioned Ethereum smart-contract blockchain node. It executed Ethereum EVM and WASM smart contract code on permissioned virtual machines.

**Archives**

[Archived GitHub repo](https://github.com/hyperledger/burrow)

### Mana-Ethereum {#mana-ethereum}

**Summary**

Mana-Ethereum was an Ethereum client built using Elixir.

**Archives**

[Archived GitHub repo](https://github.com/mana-ethereum/mana)

**History**

Mana-Ethereum's GitHub repository has not been explicitly archived, but the last commit was in 2019.

### Aleth (cpp-ethereum) {#aleth}

Deprecated on October 6, 2021

**Summary**

Aleth (formerly known as cpp-ethereum) was an Ethereum client written in C++.

**Archives**

[Archived GitHub repo](https://github.com/ethereum/aleth)

**History**

Aleth was the third most popular client for Ethereum before being deprecated on October 6, 2021.

**Alternatives**

[Geth](https://geth.ethereum.org/) is a well-known alternative Ethereum client.

### Ethereum-H {#ethereum-h}

**Archives**

The Ethereum-H archives have been removed from GitHub.

**History**

Ethereum-H was an Ethereum client written in Haskell. It was deprecated around 2015.

**Alternatives**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) and [Erigon](https://github.com/ledgerwatch/erigon) are viable alternative Ethereum clients - there is no current Haskell client.

### ruby-ethereum {#ruby-ethereum}

**Archives**

[ruby-ethereum GitHub repo](https://github.com/cryptape/ruby-ethereum)

**History**

ruby-ethereum was an Ethereum client written in Ruby. It was deprecated around 2018.

**Alternatives**

[Geth](https://geth.ethereum.org/), [Nethermind](http://nethermind.io/), [Besu](https://besu.hyperledger.org/en/stable/) and [Erigon](https://github.com/ledgerwatch/erigon) are viable alternative Ethereum clients. There is no current Ruby client.

### Parity {#parity}

<p align="center">
  <img width="240" height="180" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://davidgerard.co.uk/blockchain/wp-content/uploads/2017/11/parity-logo.png" />
</p>

Deprecated on June 2, 2020

**Summary**

Parity was an Ethereum client written in Rust.

**Archives**

[Archived GitHub repo](https://github.com/openethereum/parity-ethereum)

**History**

As one of two major, viable clients in the early years of Ethereum (the other being Geth), Parity was a crucial part of the ecosystem. During the Shanghai Attacks of 2016 Parity enabled Ethereum network to continue operating when clients like Geth were taken down by the attack, proving the importance of client diversity.

**Alternatives**

[Erigon](https://github.com/ledgerwatch/erigon) Erigon (previously called Turbo-Geth) is a next generation Ethereum client on the efficiency frontier, written in Go.

**Note:** _The successor project to Parity Ethereum client was [OpenEthereum](https://github.com/openethereum/openethereum) **which has since been deprecated.**_

The ["Spin up your own Ethereum node"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) resource on ethereum.org includes a section for downloading, installing, and running an Ethereum client.

### Trinity {#trinity}

<p align="center">
  <img width="230" height="150" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://trinity.ethereum.org/images/trinity-logo-icon.svg" />
</p>

Deprecated on July 1, 2021

**Summary**

Trinity was a python-based Ethereum client which served as a research and educational tool for the community. A large number of python-based modules related to Trinity continue to be maintained by the same team, including [Py-EVM](https://github.com/ethereum/py-evm).

**Archives**

[Archived GitHub repo](https://github.com/ethereum/trinity)

**History**

Trinity was the successor project to [pyethereum](https://github.com/ethereum/pyethereum/tree/b704a5c6577863edc539a1ec3d2620a443b950fb), an early python-based Ethereum client.

**Alternatives**

The ["Spin up your own Ethereum node"](/developers/docs/nodes-and-clients/run-a-node/#getting-the-client) resource on ethereum.org includes a section for downloading, installing, and running an Ethereum client.

The [EthereumJS](https://github.com/ethereumjs) project has a similar research and educational use-case as Trinity did.

## Dapps and Services {#dapps-and-services}

This section is for services deployed to Ethereum Mainnet and other EVM-based networks. Be aware that the dapps and services here may include DeFi applications which have been hacked or may suffer security vulnerabilities due to lack of maintenance, changes in the protocol, etc.

### Cover Protocol {#cover-protocol}

<p align="center">
  <img width="400" height="267" 
  	style="background-color:#fff; padding:0px 0px 0px 0px;"
  	src="https://miro.medium.com/max/1838/0*kA6PGbaYHLJOI66O" />
</p>

Shut down in Fall 2021

**Summary**

Cover was an DeFi insurance protocol running on Ethereum and other EVM-based networks.

**Archives**

[Website](https://wayback.archive-it.org/17679/20211004074635/https://www.coverprotocol.com/)

[Medium articles](https://wayback.archive-it.org/17679/20211004074633/https://coverprotocol.medium.com/)

[GitHub repos](https://github.com/CoverProtocol/cover-core-v1)

[Documentation](https://wayback.archive-it.org/17679/20211004074634/https://docs.coverprotocol.com/)

### The DAO {#the-dao}

Hacked and shut down in Summer 2016

**Summary**

The DAO was a smart contract, dapp, and forum for organizing the funding of projects. A vulnerability was exploited and much of the ETH was drained, leading to a community-organized hard fork in order to return ETH to those who had deposited to The DAO. The UX front-end and forum are discontinued.

**Archives**

[Internet Archive of "daohub.org" on May 14, 2016](https://web.archive.org/web/20160514105232/https://daohub.org/)

**History**

While The DAO failed, the concept endured. The basic technical, social, and governance model innovated for The DAO is widely in use in DeFi, NFT, and project-funding communities.

["DAO Fork" on ethereum.org](/history/#dao-fork)

[Wikipedia entry for "The DAO"](<https://wikipedia.org/wiki/The_DAO_(organization)>)

**Alternatives**

["DAOs" on ethereum.org](/dao/)

[MolochDAO](https://www.molochdao.com/)

[Gitcoin Grants](https://gitcoin.co/grants/)

### SparkPool {#sparkpool}

<p align="center">
  <img width="562" height="124" 
  	style="background-color:#fff; padding:0px 10px 0px 10px;"
  	src="https://cryptodiffer.com/src/images/person/SparkPool-cryptodiffer.png" />
</p>

Shut down in Fall 2021

**Summary**

Headquartered in Hangzhou, the SparkPool service and community was one of the largest Ethereum-centered mining pools in the world.

**Archives**

**History**

Associated with the EthFans community, the service was launched in 2015. SparkPool was disbanded in Fall, 2021 as a result of stricter legal regulations.

**Alternatives**

[Ethermine](https://ethermine.org/)

## Documentation and Information Sources {#documentation-and-information-sources}

There are numerous sources of documentation, articles, tutorials, and forums which are now removed or live but no longer maintained. We have selected a few which are significant or whose current status as deprecated may lead to confusion or scam attempts.

### Legacy Wiki and eth.wiki {#eth-wiki}

**Summary**

Legacy Wiki and eth.wiki were wikis maintained by the Ethereum Foundation for the wider community. They were mainly oriented toward hosting detailed descriptions of key aspects of the Ethereum platform and summarizations of technical roadmaps.

**Archives**

[Archived GitHub repo for eth.wiki](https://github.com/ethereum/eth-wiki)

[Archived GitHub repo for Legacy Wiki](https://github.com/ethereum/wiki/wiki)

**History**

Legacy Wiki was a GitHub wiki and a very early locus of technical content (including the original Ethereum Whitepaper). Over time, Ethereum developers migrated their documentation, specifications, and technical description work to other platforms like [Read the Docs](https://readthedocs.org/) and GitHub-hosted content.

In 2019 and 2020, eth.wiki became the successor to Legacy Wiki, but an enduring community of contributors did not materialize.

**Alternatives**

Community-driven content: [Ethereum.org Website](/), [EthHub Docs](https://docs.ethhub.io/)

Ethereum software projects often host their documentation on [Read the Docs](https://readthedocs.org/)

GitHub-hosted technical specifications: [EIPs](https://github.com/ethereum/eips), [Execution Specs](https://github.com/ethereum/execution-specs), [Consensus Specs](https://github.com/ethereum/consensus-specs)

### forum.ethereum.org {#forum-ethereum-org}

**Summary**

Ethereum Community Forum was a discussion board maintained by the Ethereum Foundation and hosted on Vanilla Forums. It used the subdomain "forum.ethereum.org".

**Archives**

Archive URL: [https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/](https://wayback.archive-it.org/16516/20210618210825/https://forum.ethereum.org/)

**History**

This Forum was an early, "official" discussion board for the Ethereum community. Along with [/r/ethereum](https://reddit.com/r/ethereum) and a handful of Skype channels, it was an important point of coordination for developers, designers, and organizers. Over the years the participants of the Forum moved on and it became more of a place for the mining community.

**Alternatives**

[/r/ethereum](https://reddit.com/r/ethereum), and a large number of DAO Forums and Discord servers.

## Gitter Channels {#gitter-channels}

### AllCoreDevs {#allcorewdevs-gitter}

**Summary**

AllCoreDevs Gitter was the main public coordination comms channel for [Ethereum client core developers](https://github.com/ethereum/pm/).

**Archives**

[ethereum/AllCoreDevs Gitter Channel](https://gitter.im/ethereum/AllCoreDevs)

**Alternatives**

Please use the "allcoredevs" channel on the [EthR&D Discord Server](https://discord.gg/qHv7AjTDuK)

### EthereumJS {#ethereumjs-gitter}

**Summary**

EthereumJS Gitter was the main public coordination comms channel for the [EthereumJS project](https://ethereumjs.github.io/).

**Archives**

[ethereum/EthereumJS Gitter Channel](https://gitter.im/ethereum/ethereumjs)

**Alternatives**

Please use the [EthereumJS Discord Server](https://discord.gg/TNwARpR)
