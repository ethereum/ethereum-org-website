---
title: 엔터프라이즈
description: 엔터프라이즈용 공개 및 비공개 이더리움 블록체인 개발을 위한 각종 가이드, 문서 및 도구
lang: ko
sidebar: true
sidebarDepth: 1
---

# 엔터프라이즈용 이더리움 {#ethereum-for-enterprise}

<div class="featured">엔터프라이즈용 공개 및 비공개 이더리움 블록체인 개발을 위한 각종 가이드, 문서 및 도구.</div>

## 엔터프라이즈 이더리움을 선택하는 이유? {#why-enterprise-ethereum}

기업들은 왜 엔터프라이즈 이더리움을 선택해야 하나요?

- 새로운 비즈니스 모델 및 가치 창출 기회
- 비즈니스 당사자 간 신뢰 및 조율 비용 감소
- 비즈니스 네트워크의 책임성 및 운용 효율성 향상
- 비즈니스의 미래 경쟁력 강화
- 공용 메인넷 또는 사용 권한이 필요한 사설 네트워크와의 호환성

자세한 정보가 필요하시면 다음 문서들을 참고하시기 바랍니다.

- [엔터프라이즈 이더리움이 분산원장 기술보다 앞선 이유 5가지](https://media.consensys.net/5-reasons-why-enterprise-ethereum-is-so-much-more-than-a-distributed-ledger-technology-c9a89db82cb5)
- [산업별 블록체인 이용 및 응용 사례](https://media.consensys.net/enterprise-ethereum-blockchain-use-cases-and-applications-by-industry-3914d1210049)
- [EY가 블록체인 프라이버시 표준의 발전을 위하여 영지식 증명(ZKP) 블록체인 트랜잭션 기술을 공개함](https://www.ey.com/en_gl/news/2019/04/ey-releases-zero-knowledge-proof-blockchain-transaction-technology-to-the-public-domain-to-advance-blockchain-privacy-standards)
- [쿼럼 소개: 금융 분야를 위한 블록체인](https://medium.com/blockchain-at-berkeley/introduction-to-quorum-blockchain-for-the-financial-sector-58813f84e88c)

## 조직 {#organizations}

여러 조직이 함께 협력하여 기업 친화적인 이더리움을 만들기 위해 노력하고 있습니다.

- [EEA](https://entethalliance.org/) _엔터프라이즈 이더리움 얼라이언스(Enterprise Ethereum Alliance)는 회원 주도형 표준화 기구로서 전 세계 기업과 소비자의 조화와 상호 운용성을 촉진할 목적으로 개방형 블록체인 규격을 개발하는 것을 목적으로 하고 있습니다. 이 조직의 회원 커뮤니티는 지도자, 채택자(어답터), 혁신자, 개발자, 기업으로 구성되어 있으며, 모든 사람의 이익을 위해 개방형, 탈중앙화 웹을 만들고자 협력하고 있습니다._

- [Hyperledger Foundation](https://hyperledger.org) _Hyperledger는 산업 간 블록체인 기술의 발전을 위해 결성된 오픈 소스 커뮤니티입니다. It is a global collaboration, hosted by The Linux Foundation, including leaders in finance, banking, Internet of Things, supply chains, manufacturing and Technology._ _The foundation has some projects in it that work with the Ethereum stack:_ - [Hyperledger Besu](https://www.hyperledger.org/blog/2019/08/29/announcing-hyperledger-besu) - [Hyperledger Burrow](https://www.hyperledger.org/projects/hyperledger-burrow)

## Enterprise Focused Services {#enterprise-focused-services}

The following projects provide blockchain services for enterprises grade systems:

- [Blockapps](https://blockapps.net/) _implementation of the Enterprise Ethereum protocol, tooling and APIs that form the STRATO platform_
- [Clearmatics](https://www.clearmatics.com/about) _protocols and peer-to-peer platform architecture, blockchain R&D company_
- [PegaSys Plus](https://pegasys.tech/enterprise/) _offers the same features and functionalities as HF Besu, plus additional enterprise focused benefits_
- [Quorum](https://www.goquorum.com/) _open source blockchain platform that combines the innovation of the public Ethereum community with enhancements to support enterprise needs_

## Protocol and Infrastructure {#protocol-and-infrastructure}

- [Hyperledger Besu](https://www.hyperledger.org/projects/besu) _open-source Ethereum client developed under the Apache 2.0 license and written in Java_
- [Hyperledger Burrow](https://www.hyperledger.org/projects/hyperledger-burrow) _modular blockchain client with a permissioned smart contract interpreter partially developed to the specification of the Ethereum Virtual Machine (EVM)_
- [Infura](https://infura.io/) _scalable API access to the Ethereum and IPFS networks_
- [Kaleido](https://kaleido.io/) _full-stack platform for building and running cross-cloud, hybrid enterprise ecosystems_
- [Autonity](https://www.clearmatics.com/about/) _protocol suite that implements p2p protocols and provides client software and infrastructure_
- [Chainstack](https://chainstack.com/) _multi-cloud and multi-protocol Platform as a Service empowering businesses to rapidly build, deploy, and manage decentralized networks and services_

## Enterprise Features {#enterprise-features}

Public and private Ethereum networks might need specific features required by network participants. The following are some of those features:

### Permissioning {#permissioning}

- [Pegasys Permissioning Contracts](https://github.com/PegaSysEng/permissioning-smart-contracts)
- [Quorum Permissioning solution](https://github.com/jpmorganchase/quorum/wiki/Security)

### Privacy {#privacy}

- [Ernst & Young's ‘Nightfall'](https://github.com/EYBlockchain/nightfall) _More information [here](https://bravenewcoin.com/insights/ernst-and-young-rolls-out-'nightfall-to-enable-private-transactions-on)_
- [Pegasys' Orion](https://docs.pantheon.pegasys.tech/en/stable/Concepts/Privacy/Privacy-Overview/) _More information [here](https://pegasys.tech/privacy-in-pantheon-how-it-works-and-why-your-enterprise-should-care/)_
- [Quorum's Tessera](https://docs.goquorum.com/en/latest/Privacy/Tessera/Tessera/) _More information [here](https://github.com/jpmorganchase/tessera/wiki/How-Tessera-works)_

### Security {#security}

- [Clef](https://geth.ethereum.org/clef/Overview) _used to sign transactions and data and is meant as a replacement for geth’s account management_
- [EthSigner](https://gitter.im/PegaSysEng/EthSigner) _A transaction signing application to be used with a web3 provider_

### Tooling {#tooling}

- [Alethio](https://aleth.io/) _Ethereum Data Analytics Platform_
- [Treum](https://treum.io/) _bringing transparency, traceability, and tradability to supply chains, using blockchain technology_
- [Truffle Suite](https://trufflesuite.com) _blockchain development suite (Truffle, Ganache, Drizzle)_

## Enterprise Developer Community {#enterprise-developer-community}

- [Alethio Discord](https://discord.gg/d2t8NuU)
- [Infura Discourse](https://community.infura.io/)
- [Kaleido Twitter](https://twitter.com/Kaleido_io)
- [Hyperledger Rocketchat](https://chat.hyperledger.org/)
- [Hyperledger Rocketchat (Besu channel)](https://chat.hyperledger.org/channel/besu)
- [Hyperledger Rocketchat (Burrow channel)](https://chat.hyperledger.org/channel/burrow)
- [PegaSys Twitter](https://twitter.com/Kaleido_io)
- [Quorum Slack channel](http://bit.ly/quorum-slack)
- [Chainstack Gitter](https://gitter.im/chainstack/Lobby)
