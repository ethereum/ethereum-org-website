---
title: "탈중앙화 스토리지"
description: "탈중앙화 스토리지가 무엇인지, 그리고 이를 탈중앙화 애플리케이션(dapp)에 통합하는 데 사용할 수 있는 도구에 대한 개요입니다."
lang: ko
authors: ["패트릭 콜린스"]
---

단일 회사나 조직이 운영하는 중앙화된 서버와 달리, 탈중앙화 스토리지 시스템은 전체 데이터의 일부를 보유하는 사용자-운영자들의 피어 투 피어 네트워크로 구성되어 탄력적인 파일 스토리지 공유 시스템을 만듭니다. 이는 블록체인 기반 애플리케이션이나 모든 피어 투 피어 기반 네트워크에 있을 수 있습니다.

이더리움 자체도 탈중앙화 스토리지 시스템으로 사용될 수 있으며, 모든 스마트 컨트랙트의 코드 스토리지가 그 예입니다. 하지만 대용량 데이터의 경우, 이더리움은 이를 위해 설계되지 않았습니다. 체인은 꾸준히 성장하고 있지만, 작성 시점을 기준으로 이더리움 체인은 약 500GB - 1TB([클라이언트에 따라 다름](https://etherscan.io/chartsync/chaindefault))이며, 네트워크의 모든 노드는 모든 데이터를 저장할 수 있어야 합니다. 체인이 대용량 데이터(예: 5TB)로 확장된다면 모든 노드가 계속해서 실행되는 것은 불가능할 것입니다. 또한, 이 정도의 데이터를 메인넷에 배포하는 비용은 [가스](/developers/docs/gas) 수수료로 인해 엄청나게 비쌀 것입니다.

이러한 제약 때문에 대용량 데이터를 탈중앙화된 방식으로 저장하려면 다른 체인이나 방법론이 필요합니다.

탈중앙화 스토리지(dStorage) 옵션을 살펴볼 때 사용자가 명심해야 할 몇 가지 사항이 있습니다.

- 영구 저장 메커니즘 / 인센티브 구조
- 데이터 보존 강제
- 탈중앙성
- 합의

## 영구 저장 메커니즘 / 인센티브 구조 {#persistence-mechanism}

### 블록체인 기반 {#blockchain-based}

데이터가 영원히 지속되려면 영구 저장 메커니즘을 사용해야 합니다. 예를 들어, 이더리움의 영구 저장 메커니즘은 노드를 실행할 때 전체 체인을 고려해야 한다는 것입니다. 새로운 데이터 조각이 체인의 끝에 추가되고 체인은 계속 성장하며, 모든 노드가 포함된 모든 데이터를 복제해야 합니다.

이를 **블록체인 기반** 영구 저장이라고 합니다.

블록체인 기반 영구 저장의 문제는 체인이 너무 커져서 모든 데이터를 현실적으로 유지하고 저장하기 어려울 수 있다는 것입니다(예: [여러 출처](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/)에 따르면 인터넷은 40제타바이트 이상의 스토리지 용량이 필요할 것으로 추정됩니다).

블록체인에는 일종의 인센티브 구조도 있어야 합니다. 블록체인 기반 영구 저장의 경우 검증자에게 지불이 이루어집니다. 데이터가 체인에 추가될 때, 검증자는 데이터를 추가하는 대가로 보상을 받습니다.

블록체인 기반 영구 저장을 지원하는 플랫폼:

- 이더리움
- [Arweave](https://www.arweave.org/)

### 컨트랙트 기반 {#contract-based}

**컨트랙트 기반** 영구 저장은 모든 노드가 데이터를 복제하여 영원히 저장할 수 없으며, 대신 컨트랙트 계약을 통해 유지되어야 한다는 직관을 가지고 있습니다. 이는 일정 기간 동안 데이터 조각을 보관하기로 약속한 여러 노드와 맺은 계약입니다. 데이터가 계속 유지되려면 기간이 만료될 때마다 환불받거나 갱신해야 합니다.

대부분의 경우 모든 데이터를 온체인에 저장하는 대신, 체인 상에서 데이터가 위치한 곳의 해시가 저장됩니다. 이렇게 하면 모든 데이터를 보관하기 위해 전체 체인을 확장할 필요가 없습니다.

컨트랙트 기반 영구 저장을 지원하는 플랫폼:

- [파일코인](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [스웜](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### 추가 고려 사항 {#additional-consideration}

IPFS는 파일, 웹사이트, 애플리케이션 및 데이터에 저장하고 접근하기 위한 분산 시스템입니다. 내장된 인센티브 체계는 없지만, 장기적인 영구 저장을 위해 위의 컨트랙트 기반 인센티브 솔루션과 함께 사용할 수 있습니다. IPFS에 데이터를 영구적으로 저장하는 또 다른 방법은 데이터를 대신 "고정(pin)"해 주는 피닝(pinning) 서비스와 협력하는 것입니다. 심지어 자체 IPFS 노드를 실행하고 네트워크에 기여하여 본인이나 다른 사람의 데이터를 무료로 영구 저장할 수도 있습니다!

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(IPFS 피닝 서비스)_
- [web3.storage](https://web3.storage/) _(IPFS/파일코인 피닝 서비스)_
- [Infura](https://infura.io/product/ipfs) _(IPFS 피닝 서비스)_
- [IPFS Scan](https://ipfs-scan.io) _(IPFS 피닝 탐색기)_
- [4EVERLAND](https://www.4everland.org/)_（IPFS 피닝 서비스）_
- [Filebase](https://filebase.com) _(IPFS 피닝 서비스)_
- [Spheron Network](https://spheron.network/) _(IPFS/파일코인 피닝 서비스)_

스웜(SWARM)은 스토리지 인센티브 시스템과 스토리지 임대 가격 오라클을 갖춘 탈중앙화 데이터 스토리지 및 배포 기술입니다.

## 데이터 보존 {#data-retention}

데이터를 보존하기 위해 시스템은 데이터가 유지되는지 확인하는 일종의 메커니즘을 갖추어야 합니다.

### 챌린지 메커니즘 {#challenge-mechanism}

데이터가 보존되는지 확인하는 가장 인기 있는 방법 중 하나는 노드에 일종의 암호학적 챌린지를 발행하여 여전히 데이터를 가지고 있는지 확인하는 것입니다. 간단한 예로 Arweave의 접근 증명(proof-of-access)을 들 수 있습니다. 이들은 노드에 챌린지를 발행하여 가장 최근 블록과 과거의 무작위 블록 모두에서 데이터를 가지고 있는지 확인합니다. 노드가 답을 제시하지 못하면 페널티를 받습니다.

챌린지 메커니즘이 있는 탈중앙화 스토리지(dStorage) 유형:

- Züs
- Skynet
- Arweave
- 파일코인
- Crust Network
- 4EVERLAND

### 탈중앙성 {#decentrality}

플랫폼의 탈중앙화 수준을 측정할 수 있는 훌륭한 도구는 없지만, 일반적으로 중앙화되지 않았다는 증거를 제공하기 위해 어떤 형태의 KYC도 없는 도구를 사용하는 것이 좋습니다.

KYC가 없는 탈중앙화 도구:

- Skynet
- Arweave
- 파일코인
- IPFS
- 이더리움
- Crust Network
- 4EVERLAND

### 합의 {#consensus}

이러한 도구 대부분은 자체적인 [합의 메커니즘](/developers/docs/consensus-mechanisms/) 버전을 가지고 있지만, 일반적으로 [**작업증명 (PoW)**](/developers/docs/consensus-mechanisms/pow/) 또는 [**지분 증명 (PoS)**](/developers/docs/consensus-mechanisms/pos/)을 기반으로 합니다.

작업증명 (PoW) 기반:

- Skynet
- Arweave

지분 증명 (PoS) 기반:

- 이더리움
- 파일코인
- Züs
- Crust Network

## 관련 도구 {#related-tools}

**IPFS - _InterPlanetary File System은 이더리움을 위한 탈중앙화 스토리지 및 파일 참조 시스템입니다._**

- [Ipfs.io](https://ipfs.io/)
- [문서](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _개발자를 위한 안전하고 프라이빗하며 S3와 호환되는 탈중앙화 클라우드 객체 스토리지입니다._**

- [Storj.io](https://storj.io/)
- [문서](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _암호학을 활용하여 무신뢰 클라우드 스토리지 마켓플레이스를 구축하여 구매자와 판매자가 직접 거래할 수 있도록 합니다._**

- [Skynet.net](https://sia.tech/)
- [문서](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**파일코인 - _파일코인은 IPFS를 만든 팀과 동일한 팀에서 만들었습니다. IPFS의 이상 위에 구축된 인센티브 레이어입니다._**

- [Filecoin.io](https://filecoin.io/)
- [문서](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave는 데이터를 저장하기 위한 탈중앙화 스토리지(dStorage) 플랫폼입니다._**

- [Arweave.org](https://www.arweave.org/)
- [문서](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs는 샤딩과 블로버(blobber)를 갖춘 지분 증명(PoS) 탈중앙화 스토리지(dStorage) 플랫폼입니다._**

- [zus.network](https://zus.network/)
- [문서](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust는 IPFS 위에 구축된 탈중앙화 스토리지(dStorage) 플랫폼입니다._**

- [Crust.network](https://crust.network)
- [문서](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**스웜 - _이더리움 Web3 스택을 위한 분산 스토리지 플랫폼 및 콘텐츠 배포 서비스입니다._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [문서](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _IPFS 위에 구축된 탈중앙화 피어 투 피어 데이터베이스입니다._**

- [OrbitDB.org](https://orbitdb.org/)
- [문서](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _탈중앙화 클라우드 프로젝트(데이터베이스, 파일 스토리지, 컴퓨팅 및 탈중앙화 신원증명(DID)). 오프체인과 온체인 피어 투 피어 기술의 독특한 조합입니다. IPFS 및 멀티 체인 호환성을 제공합니다._**

- [Aleph.im](https://aleph.cloud/)
- [문서](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _데이터가 풍부하고 매력적인 애플리케이션을 위한 사용자 제어 IPFS 데이터베이스 스토리지입니다._**

- [Ceramic.network](https://ceramic.network/)
- [문서](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _S3와 호환되는 탈중앙화 스토리지 및 지리적 이중화 IPFS 피닝 서비스입니다. Filebase를 통해 IPFS에 업로드된 모든 파일은 전 세계에 3배 복제되어 Filebase 인프라에 자동으로 고정(pin)됩니다._**

- [Filebase.com](https://filebase.com/)
- [문서](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _스토리지, 컴퓨팅 및 네트워킹 핵심 기능을 통합한 웹 3.0 클라우드 컴퓨팅 플랫폼으로, S3와 호환되며 IPFS 및 Arweave와 같은 탈중앙화 스토리지 네트워크에서 동기식 데이터 스토리지를 제공합니다._**

- [4everland.org](https://www.4everland.org/)
- [문서](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _클릭 한 번으로 IPFS 노드를 제공하는 서비스형 블록체인(BaaS) 플랫폼입니다._**

- [Kaleido](https://kaleido.io/)
- [문서](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron은 최고의 성능으로 탈중앙화 인프라에서 애플리케이션을 출시하려는 탈중앙화 애플리케이션(dapp)을 위해 설계된 서비스형 플랫폼(PaaS)입니다. 컴퓨팅, 탈중앙화 스토리지, CDN 및 웹 호스팅을 기본으로 제공합니다._**

- [spheron.network](https://spheron.network/)
- [문서](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _eth.limo와 유사한 탈중앙화 웹페이지용 리졸버(resolver)로, ENS 및 IPFS에 국한되지 않고 모든 유형을 지원합니다._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _IPFS 및 ENS 기반 탈중앙화 웹사이트를 위한 검색 엔진입니다._**

- [web3compass.net](https://www.web3compass.net/)
- [문서](https://www.web3compass.net/statistics)

## 더 읽을거리 {#further-reading}

- [탈중앙화 스토리지란 무엇인가?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [탈중앙화 스토리지에 대한 5가지 흔한 오해 타파](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

## 관련 주제 {#related-topics}

- [개발 프레임워크](/developers/docs/frameworks/)