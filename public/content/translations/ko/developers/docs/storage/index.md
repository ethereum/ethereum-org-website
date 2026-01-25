---
title: 분산형 스토리지
description: 탈중앙화 저장소의 정의와 이를 하나의 디앱으로 통합하는 데 사용할 수 있는 도구들에 대한 개요
lang: ko
---

하나의 회사나 조직이 운영하는 중앙집중형 서버와 달리, 탈중앙화 저장소 시스템은 전체 데이터의 일부를 보유하는 사용자-운영자들의 P2P 네트워크로 구성되어 안정성 있는 파일 저장소 공유 시스템을 구축합니다. 이런 시스템들은 블록체인 기반 애플리케이션이나 모든 P2P 기반 네트워크에 있을 수 있습니다.

이더리움은 그 자체로 탈중앙화 저장소 시스템으로 활용될 수 있으며, 모든 스마트 컨트랙트에서의 코드 저장공간이 바로 그것입니다. 하지만 많은 양의 데이터를 저장하는 경우, 이더리움이 설계된 목적에 부합하지 않습니다. 체인은 꾸준히 성장하고 있지만, 이 글을 쓰는 시점에서 이더리움 체인은 약 500GB~1TB([클라이언트에 따라 다름](https://etherscan.io/chartsync/chaindefault))이며, 네트워크의 모든 노드는 모든 데이터를 저장할 수 있어야 합니다. 체인을 대량의 데이터(예: 5TB)로 확장해야 하는 경우 모든 노드가 계속 실행되는 것은 실현 가능하지 않을 수 있습니다. 또한, 이 많은 양의 데이터를 메인넷에 배포하는 비용은 [가스](/developers/docs/gas) 수수료 때문에 엄청나게 비쌀 것입니다.

이러한 제약으로 인해, 많은 양의 데이터를 탈중앙화된 방식으로 저장할 수 있는 다른 체인이나 방법론이 필요합니다.

탈중앙화 저장소(dStorage) 옵션을 살펴볼 때, 사용자가 유의해야 할 몇가지 사항이 있습니다.

- 지속성 메카니즘 / 인센티브 구조
- 데이터 보존 시행
- 분산성
- 합의

## 지속성 메커니즘 / 인센티브 구조 {#persistence-mechanism}

### 블록체인 기반 {#blockchain-based}

데이터 조각이 영원히 지속되려면 지속성 메커니즘을 사용해야 합니다. 예를 들어, 이더리움에서 지속성 메커니즘이란 노드를 실행할 때 전체 체인을 고려해야 한다는 것입니다. 새로운 데이터 조각이 체인의 끝에 추가되고 계속해서 성장하여 모든 노드가 임베디드 데이터를 복제해야 합니다.

이를 **블록체인 기반** 지속성이라고 합니다.

블록체인 기반 지속성의 문제점은 체인이 너무 커져서 모든 데이터를 실현 가능한 방식으로 유지하고 저장하기 어렵다는 것입니다(예: [여러 출처](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)에 따르면 인터넷에는 40제타바이트 이상의 저장 공간 용량이 필요하다고 추정됩니다).

블록체인은 또한 일종의 인센티브 구조가 있어야 합니다. 블록체인 기반 지속성을 위해서는 검증자에게 지급되는 대가가 있습니다. 데이터가 체인에 추가될 때 검증자들이 데이터를 추가하기 위해 대가를 받습니다.

블록체인 기반 지속성을 갖춘 플랫폼

- 이더리움
- [Arweave](https://www.arweave.org/)

### 계약 기반 {#contract-based}

**계약 기반** 지속성은 모든 노드에서 데이터를 복제하고 영구적으로 저장할 수 없으며, 대신 계약 합의에 따라 유지되어야 한다는 개념을 기반으로 합니다. 이것은 일정 기간 동안 데이터 조각을 보유하기로 약속한 여러 노드와 맺은 합의입니다. 데이터를 계속 유지하려면 소진될 때마다 재지불하거나 갱신해야 합니다.

대부분의 경우, 모든 데이터를 온체인으로 저장하는 대신, 체인 상에 데이터가 위치하는 곳의 해시가 저장됩니다. 이렇게 하면 모든 데이터를 유지하기 위해 전체 체인을 확장할 필요가 없습니다.

컨트랙트 기반 지속성을 갖춘 플랫폼:

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 추가 고려사항 {#additional-consideration}

IPFS는 파일, 웹사이트, 애플리케이션 및 데이터를 저장하고 액세스하기 위한 분산 시스템입니다. 이 시스템은 내장된 인센티브 체계가 없지만, 장기적인 지속성을 위해 위에 언급된 계약 기반 인센티브 솔루션 중 하나와 함께 사용할 수 있습니다. 또 다른 방법으로 IPFS에서 데이터를 지속시키는 방법은 '고정 서비스'와 협력하는 것입니다. 이 서비스는 사용자의 데이터를 "고정"해 줍니다. 사용자는 자신의 IPFS 노드를 실행하여 자신 또는 다른 사람의 데이터를 무료로 지속시킬 수 있습니다!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS 피닝 서비스)_
- [web3.storage](https://web3.storage/) _(IPFS/Filecoin 피닝 서비스)_
- [Infura](https://infura.io/product/ipfs) _(IPFS 피닝 서비스)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS 피닝 탐색기)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS 피닝 서비스）_
- [Filebase](https://filebase.com) _(IPFS 피닝 서비스)_
- [Spheron Network](https://spheron.network/) _(IPFS/Filecoin 피닝 서비스)_

SWARM은 저장 인센티브 시스템과 저장 임대 가격 예측 시스템을 갖춘 분산 데이터 저장 및 배포 기술입니다.

## 데이터 보존 {#data-retention}

데이터를 보존하기 위해, 시스템은 데이터가 확실히 보존되도록 하는 일종의 메커니즘을 가지고 있어야 합니다.

### 챌린지 메커니즘 {#challenge-mechanism}

확실히 데이터가 보존되도록 하는 가장 일반적인 방법 중 하나는, 노드에 전송되는 일종의 암호학적 문제를 사용하여 노드가 데이터를 가지고 있는지 확인하는 것입니다. 간단한 방법은 아르위브의 PoA를 살펴보는 것입니다. 이것은 노드에게 가장 최근 블록과 과거의 랜덤 블록 하나에 있는 데이터가 모두 있는지 확인하는 문제를 냅니다. 만약 노드가 답을 내놓지 못하면, 해당 노드는 불이익을 받습니다.

챌린지 메커니즘을 갖춘 dStorage 유형:

- Züs
- 스카이넷
- 아르위브
- 파일코인
- Crust Network
- 4EVERLAND

### 탈중앙성 {#decentrality}

플랫폼의 분산화 수준을 측정할 수 있는 좋은 도구는 없지만, 일반적으로 KYC의 형태가 없는 도구를 사용하여 중앙집중화되지 않았다는 증거를 제시하고자 할 것입니다.

KYC가 없는 탈중앙화 도구:

- 스카이넷
- 아르위브
- 파일코인
- IPFS
- 이더리움
- Crust Network
- 4EVERLAND

### 합의 {#consensus}

이 도구 대부분은 자체 버전의 [합의 메커니즘](/developers/docs/consensus-mechanisms/)을 가지고 있지만, 일반적으로 [**작업 증명(PoW)**](/developers/docs/consensus-mechanisms/pow/) 또는 [**지분 증명(PoS)**](/developers/docs/consensus-mechanisms/pos/)에 기반합니다.

작업 증명 기반:

- 스카이넷
- 아르위브

지분 증명 기반:

- 이더리움
- 파일코인
- Züs
- Crust Network

## 관련 도구 {#related-tools}

**IPFS - _InterPlanetary File System은 이더리움을 위한 탈중앙화 저장 공간 및 파일 참조 시스템입니다._**

- [Ipfs.io](https://ipfs.io/)
- [개발문서](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _개발자를 위한 안전하고, 프라이빗하며, S3와 호환되는 탈중앙화 클라우드 객체 저장 공간입니다._**

- [Storj.io](https://storj.io/)
- [개발문서](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _암호학을 활용하여 구매자와 판매자가 직접 거래할 수 있도록 하는 무신뢰 클라우드 저장 공간 마켓플레이스를 만듭니다._**

- [Skynet.net](https://sia.tech/)
- [개발문서](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin은 IPFS를 개발한 바로 그 팀에서 만들었습니다. IPFS 이상 위에 있는 인센티브 계층입니다._**

- [Filecoin.io](https://filecoin.io/)
- [개발문서](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave는 데이터 저장을 위한 dStorage 플랫폼입니다._**

- [Arweave.org](https://www.arweave.org/)
- [개발문서](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs는 샤딩과 블로버(blobber)를 갖춘 지분 증명 dStorage 플랫폼입니다._**

- [zus.network](https://zus.network/)
- [개발문서](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust는 IPFS 위에 구축된 dStorage 플랫폼입니다._**

- [Crust.network](https://crust.network)
- [개발문서](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _이더리움 웹3 스택을 위한 분산형 저장 공간 플랫폼 및 콘텐츠 배포 서비스입니다._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [개발문서](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS 기반의 탈중앙화 P2P 데이터베이스입니다._**

- [OrbitDB.org](https://orbitdb.org/)
- [개발문서](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _탈중앙화 클라우드 프로젝트(데이터베이스, 파일 저장 공간, 컴퓨팅 및 DID)입니다._** 오프체인과 온체인 P2P 기술의 독특한 조합. IPFS와 멀티체인 양립 가능._\*\*

- [Aleph.im](https://aleph.cloud/)
- [개발문서](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _데이터가 풍부하고 흥미로운 애플리케이션을 위한 사용자 제어 IPFS 데이터베이스 저장 공간입니다._**

- [Ceramic.network](https://ceramic.network/)
- [개발문서](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3와 호환되는 탈중앙화 저장 공간 및 지역 중복 IPFS 피닝 서비스. Filebase를 통해 IPFS에 업로드된 모든 파일은 전 세계에 걸쳐 3중으로 복제되어 Filebase 인프라에 자동으로 피닝됩니다._**

- [Filebase.com](https://filebase.com/)
- [개발문서](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _저장 공간, 컴퓨팅, 네트워킹 핵심 기능을 통합한 웹3.0 클라우드 컴퓨팅 플랫폼으로, S3와 호환되며 IPFS, Arweave와 같은 탈중앙화 저장 공간 네트워크에서 동기식 데이터 저장을 제공합니다._**

- [4everland.org](https://www.4everland.org/)
- [개발문서](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _클릭 버튼으로 IPFS 노드를 제공하는 서비스형 블록체인(BaaS) 플랫폼입니다._**

- [Kaleido](https://kaleido.io/)
- [개발문서](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron은 최고의 성능을 갖춘 탈중앙화 인프라에서 애플리케이션을 출시하려는 탈중앙화앱을 위해 설계된 서비스형 플랫폼(PaaS)입니다. 컴퓨팅, 탈중앙화 저장 공간, CDN 및 웹 호스팅을 기본으로 제공합니다._**

- [spheron.network](https://spheron.network/)
- [개발문서](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## 더 읽어보기 {#further-reading}

- [탈중앙화 저장 공간이란?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [탈중앙화 저장 공간에 대한 5가지 일반적인 오해 바로잡기](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_도움이 되었던 커뮤니티 참고 자료를 알고 계신가요? 이 페이지를 편집해서 추가하세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)
