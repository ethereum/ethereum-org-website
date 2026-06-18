---
title: "네트워크"
description: "이더리움 네트워크에 대한 개요와 애플리케이션 테스트를 위해 테스트넷 이더(ETH)를 얻을 수 있는 곳을 알아봅니다."
lang: ko
---

[이더리움](/) 네트워크는 이더리움 프로토콜을 사용하여 통신하는 연결된 컴퓨터들의 그룹입니다. 이더리움 메인넷은 단 하나뿐이지만, 테스트 및 개발 목적으로 동일한 프로토콜 규칙을 따르는 독립적인 네트워크를 만들 수 있습니다. 서로 상호작용하지 않으면서 프로토콜을 따르는 독립적인 "네트워크"가 많이 있습니다. 스마트 컨트랙트와 Web3 앱을 테스트하기 위해 자신의 컴퓨터에서 로컬로 네트워크를 시작할 수도 있습니다.

이더리움 계정은 여러 다른 네트워크에서 작동하지만, 계정 잔액과 트랜잭션 내역은 기본 이더리움 네트워크에서 이월되지 않습니다. 테스트 목적으로는 어떤 네트워크를 사용할 수 있는지, 그리고 테스트해 볼 수 있는 테스트넷 ETH를 어떻게 얻는지 아는 것이 유용합니다. 일반적으로 보안상의 이유로 메인넷 계정을 테스트넷에서 재사용하거나 그 반대로 사용하는 것은 권장하지 않습니다.

## 전제 조건 {#prerequisites}

테스트 네트워크는 저렴하고 안전하게 이더리움을 다뤄볼 수 있는 환경을 제공하므로, 다양한 네트워크에 대해 읽기 전에 [이더리움의 기초](/developers/docs/intro-to-ethereum/)를 이해해야 합니다.

## 퍼블릭 네트워크 {#public-networks}

퍼블릭 네트워크는 인터넷이 연결된 전 세계 누구나 접근할 수 있습니다. 누구나 퍼블릭 블록체인에서 트랜잭션을 읽거나 생성할 수 있으며, 실행되는 트랜잭션을 검증할 수 있습니다. 피어 간의 합의를 통해 트랜잭션 포함 여부와 네트워크의 상태가 결정됩니다.

### 이더리움 메인넷 {#ethereum-mainnet}

메인넷은 분산 원장에서 실제 가치를 지닌 트랜잭션이 발생하는 주요 퍼블릭 이더리움 프로덕션 블록체인입니다.

사람들과 거래소에서 ETH 가격을 논할 때, 이는 메인넷 ETH를 의미합니다.

### 이더리움 테스트넷 {#ethereum-testnets}

메인넷 외에도 퍼블릭 테스트넷이 있습니다. 이러한 네트워크는 프로토콜 개발자나 스마트 컨트랙트 개발자가 메인넷에 배포하기 전에 프로덕션과 유사한 환경에서 프로토콜 업그레이드와 잠재적인 스마트 컨트랙트를 모두 테스트하는 데 사용됩니다. 이를 프로덕션 서버와 스테이징 서버의 관계와 유사하다고 생각하면 됩니다.

작성한 모든 컨트랙트 코드는 메인넷에 배포하기 전에 테스트넷에서 테스트해야 합니다. 기존 스마트 컨트랙트와 통합되는 탈중앙화 애플리케이션(dapp) 중 대부분의 프로젝트는 테스트넷에 배포된 복사본을 가지고 있습니다.

대부분의 테스트넷은 허가형 권위 증명(PoA) 합의 메커니즘을 사용하여 시작되었습니다. 이는 소수의 노드가 트랜잭션을 검증하고 새로운 블록을 생성하도록 선택되며, 이 과정에서 자신의 신원을 스테이킹한다는 것을 의미합니다. 대안으로, 일부 테스트넷은 이더리움 메인넷처럼 누구나 검증자 실행을 테스트할 수 있는 개방형 지분 증명 (PoS) 합의 메커니즘을 특징으로 합니다.

테스트넷의 ETH는 실제 가치가 없는 것으로 간주되지만, 희소해지거나 구하기 어려워진 특정 유형의 테스트넷 ETH를 위한 시장이 형성되기도 했습니다. 이더리움과 실제로 상호작용하려면 (테스트넷에서도) ETH가 필요하므로, 대부분의 사람들은 퍼싯에서 무료로 테스트넷 ETH를 얻습니다. 대부분의 퍼싯은 ETH를 받을 주소를 입력하여 요청할 수 있는 웹앱입니다.

#### 어떤 테스트넷을 사용해야 하나요? {#which-testnet-should-i-use}

현재 클라이언트 개발자들이 유지 관리하고 있는 두 개의 퍼블릭 테스트넷은 Sepolia와 Hoodi입니다. Sepolia는 컨트랙트 및 애플리케이션 개발자가 애플리케이션을 테스트하기 위한 네트워크입니다. Hoodi 네트워크를 통해 프로토콜 개발자는 네트워크 업그레이드를 테스트할 수 있으며, 스테이커는 검증자 실행을 테스트할 수 있습니다.

#### Sepolia {#sepolia}

**Sepolia는 애플리케이션 개발을 위해 권장되는 기본 테스트넷입니다**. Sepolia 네트워크는 클라이언트 및 테스트 팀이 제어하는 허가형 검증자 세트를 사용합니다.

##### 리소스 {#} {#}

- [웹사이트](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### 퍼싯 {#} {#}

- [Alchemy Sepolia 퍼싯](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia 퍼싯](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia 퍼싯](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [이더리움 생태계 퍼싯](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia 퍼싯](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia 퍼싯](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia 퍼싯](https://www.infura.io/faucet)
- [PoW 퍼싯](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia 퍼싯](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi는 검증 및 스테이킹을 테스트하기 위한 테스트넷입니다. Hoodi 네트워크는 테스트넷 검증자를 실행하고자 하는 사용자에게 열려 있습니다. 따라서 메인넷에 배포되기 전에 프로토콜 업그레이드를 테스트하려는 스테이커는 Hoodi를 사용해야 합니다.

- 개방형 검증자 세트, 스테이커가 네트워크 업그레이드를 테스트할 수 있음
- 대규모 상태, 복잡한 스마트 컨트랙트 상호작용을 테스트하는 데 유용함
- 동기화에 더 오랜 시간이 걸리며 노드를 실행하는 데 더 많은 스토리지가 필요함

##### 리소스 {#}

- [웹사이트](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [익스플로러](https://explorer.hoodi.ethpandaops.io/)
- [체크포인트 동기화](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### 퍼싯 {#}

- [Chain Platform Hoodi 퍼싯](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi 퍼싯](https://hoodi.ethpandaops.io/)
- [PoW 퍼싯](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery는 매달 완전히 초기화되는 독특한 종류의 테스트넷입니다. 실행 및 합의 상태가 28일마다 제네시스로 되돌아가므로, 테스트넷에서 일어나는 모든 일은 일시적입니다. 따라서 단기 테스트, 빠른 노드 부트스트랩, 영구성이 필요 없는 'hello world' 종류의 애플리케이션에 이상적입니다.

- 항상 새로운 상태, 검증자 및 앱의 단기 테스트
- 기본 컨트랙트 세트만 포함
- 개방형 검증자 세트 및 대량의 자금에 쉽게 접근 가능
- 최소한의 노드 요구 사항 및 가장 빠른 동기화, 평균 5GB 미만

##### 리소스 {#}

- [웹사이트](https://ephemery.dev/)
- [GitHub](https://github.com/ephemery-testnet/ephemery-resources)
- [커뮤니티 채팅](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [비콘 익스플로러](https://beaconlight.ephemery.dev/)
- [체크포인트 동기화](https://checkpoint-sync.ephemery.ethpandaops.io)
- [런치패드](https://launchpad.ephemery.dev/)

#### 퍼싯 {#faucets}

- [Bordel 퍼싯](https://faucet.bordel.wtf/)
- [Pk910 PoW 퍼싯](https://ephemery-faucet.pk910.de/)

#### 홀스카이 (사용 중단됨) {#holesky}

홀스카이 테스트넷은 2025년 9월부로 사용이 중단되었습니다. 스테이킹 운영자와 인프라 제공자는 검증자 테스트를 위해 대신 Hoodi를 사용해야 합니다.

- [홀스카이 테스트넷 종료 공지](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF 블로그, 2025년 9월 1일_
- [홀스카이 및 Hoodi 테스트넷 업데이트](https://blog.ethereum.org/2025/03/18/hoodi-holesky) - _EF 블로그, 2025년 3월 18일_

### 레이어 2 테스트넷 {#layer-2-testnets}

[레이어 2 (l2)](/layer-2/)는 특정 이더리움 확장 솔루션 세트를 설명하는 총칭입니다. 레이어 2는 이더리움을 확장하고 이더리움의 보안 보장을 상속받는 별도의 블록체인입니다. 레이어 2 테스트넷은 일반적으로 퍼블릭 이더리움 테스트넷과 밀접하게 결합되어 있습니다.

#### 아비트럼 Sepolia {#arbitrum-sepolia}

[아비트럼](https://arbitrum.io/)을 위한 테스트넷입니다.

##### 리소스 {#}

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### 퍼싯 {#}

- [Alchemy 아비트럼 Sepolia 퍼싯](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [체인링크 아비트럼 Sepolia 퍼싯](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com 아비트럼 Sepolia 퍼싯](https://ethfaucet.com/networks/arbitrum)
- [QuickNode 아비트럼 Sepolia 퍼싯](https://faucet.quicknode.com/arbitrum/sepolia)

#### 옵티미스틱 Sepolia {#optimistic-sepolia}

[옵티미즘](https://www.optimism.io/)을 위한 테스트넷입니다.

##### 리소스 {#}

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### 퍼싯 {#}

- [Alchemy 퍼싯](https://www.alchemy.com/faucets/optimism-sepolia)
- [체인링크 퍼싯](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com 옵티미즘 Sepolia 퍼싯](https://ethfaucet.com/networks/optimism)
- [테스트넷 퍼싯](https://docs.optimism.io/builders/tools/build/faucets)

#### 스타크넷 Sepolia {#starknet-sepolia}

[스타크넷](https://www.starknet.io)을 위한 테스트넷입니다.

##### 리소스

- [Voyager Sepolia Scan](https://sepolia.voyager.online/)

##### 퍼싯

- [Alchemy 퍼싯](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast 스타크넷 Sepolia 퍼싯](https://blastapi.io/faucets/starknet-sepolia-eth)
- [스타크넷 퍼싯](https://starknet-faucet.vercel.app/)

## 프라이빗 네트워크 {#private-networks}

이더리움 네트워크의 노드가 퍼블릭 네트워크(예: 메인넷 또는 테스트넷)에 연결되어 있지 않다면 이는 프라이빗 네트워크입니다. 이 문맥에서 프라이빗은 보호되거나 안전하다는 의미보다는 예약되거나 격리되어 있다는 의미에 가깝습니다.

### 개발 네트워크 {#development-networks}

이더리움 애플리케이션을 개발할 때, 배포하기 전에 프라이빗 네트워크에서 실행하여 어떻게 작동하는지 확인하는 것이 좋습니다. 웹 개발을 위해 컴퓨터에 로컬 서버를 만드는 것과 유사하게, 로컬 블록체인 인스턴스를 생성하여 탈중앙화 애플리케이션(dapp)을 테스트할 수 있습니다. 이를 통해 퍼블릭 테스트넷보다 훨씬 빠른 반복 작업이 가능합니다.

이를 지원하는 전용 프로젝트와 도구들이 있습니다. [개발 네트워크](/developers/docs/development-networks/)에 대해 자세히 알아보세요.

### 컨소시엄 네트워크 {#consortium-networks}

합의 프로세스는 신뢰할 수 있는 사전 정의된 노드 세트에 의해 제어됩니다. 예를 들어, 알려진 학술 기관들이 각각 단일 노드를 관리하는 프라이빗 네트워크가 있으며, 블록은 네트워크 내 서명자의 임계값에 의해 검증됩니다.

퍼블릭 이더리움 네트워크가 퍼블릭 인터넷과 같다면, 컨소시엄 네트워크는 프라이빗 인트라넷과 같습니다.

## <Emoji text="🚉" /> 이더리움 테스트넷의 이름은 왜 지하철역 이름에서 따왔나요? {#why-naming}

많은 이더리움 테스트넷은 실제 지하철역이나 기차역의 이름을 따서 명명되었습니다. 이러한 명명 전통은 일찍부터 시작되었으며 기여자들이 거주하거나 일했던 글로벌 도시들을 반영합니다. 이는 상징적이고 기억하기 쉬우며 실용적입니다. 테스트넷이 이더리움 메인넷과 격리되어 있는 것처럼, 지하철 노선도 지상 교통과 분리되어 운행됩니다.

### <Emoji text="🚧" /> 일반적으로 사용되는 테스트넷 및 레거시 테스트넷 {#common-and-legacy-testnets}

- **Sepolia** - 그리스 아테네의 지하철과 연결된 지역입니다. 현재 스마트 컨트랙트 및 탈중앙화 애플리케이션(dapp) 테스트에 사용됩니다.
- **Hoodi** - 인도 벵갈루루의 Hoodi 지하철역 이름을 따서 명명되었습니다. 검증자 및 프로토콜 업그레이드 테스트에 사용됩니다.
- **괴를리** _(사용 중단됨)_ - 독일 베를린의 Görlitzer Bahnhof 이름을 따서 명명되었습니다.
- **Rinkeby** _(사용 중단됨)_ - 지하철역이 있는 스톡홀름 교외 지역의 이름을 따서 명명되었습니다.
- **롭스텐** _(사용 중단됨)_ - 스톡홀름의 한 지역이자 과거 페리/지하철 터미널을 가리킵니다.
- **Kovan** _(사용 중단됨)_ - 싱가포르 MRT 역 이름을 따서 명명되었습니다.
- **Morden** _(사용 중단됨)_ - 런던 지하철역 이름을 따서 명명되었습니다. 이더리움의 첫 번째 퍼블릭 테스트넷입니다.

### <Emoji text="🧪" /> 기타 특수 테스트넷 {#other-testnets}

일부 테스트넷은 단기 또는 특정 업그레이드 테스트를 위해 생성되었으며 반드시 지하철을 테마로 하지는 않습니다.

- **홀스카이** _(사용 중단됨)_ - 프라하의 Holešovice 역 이름을 따서 명명되었습니다. 검증자 테스트에 사용되었으며 2025년에 사용이 중단되었습니다.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(모두 사용 중단됨)_ 및 **Ephemery** - 머지, 상하이와 같은 업그레이드 시뮬레이션이나 검증자 실험을 위해 특수 목적으로 구축되었습니다. 일부 이름은 지하철 기반이 아니라 지역적이거나 테마 기반입니다.

지하철역 이름을 사용하면 개발자가 숫자 체인 ID에 의존할 필요 없이 테스트넷을 빠르게 식별하고 기억하는 데 도움이 됩니다. 이는 또한 실용적이고 글로벌하며 인간 중심적인 이더리움의 문화를 반영합니다.

## 관련 도구 {#related-tools}

- [Chainlist](https://chainlist.org/) _지갑과 제공자를 적절한 체인 ID 및 네트워크 ID에 연결하기 위한 EVM 네트워크 목록_
- [EVM 기반 체인](https://github.com/ethereum-lists/chains) _Chainlist를 구동하는 체인 메타데이터의 GitHub 리포지토리_

## 더 읽을거리 {#further-reading}

- [제안: 예측 가능한 이더리움 테스트넷 수명 주기](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [이더리움 테스트넷의 진화](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)