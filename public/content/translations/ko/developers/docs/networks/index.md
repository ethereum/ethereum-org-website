---
title: 네트워크
description: 이더리움 네트워크에 대한 설명서 및 테스트용 이더(ETH)를 획득하는 방법
lang: ko
---

이더리움 네트워크는 이더리움 프로토콜을 사용하여 통신하는 연결된 컴퓨터 그룹입니다. 이더리움 메인넷은 하나뿐이지만, 테스트 및 개발 목적으로 동일한 프로토콜 규칙을 따르는 독립적인 네트워크를 생성할 수 있습니다. 서로 상호 작용하지 않으면서 프로토콜을 준수하는 독립적인 "네트워크"가 많이 있습니다. 스마트 계약과 웹3 앱을 테스트하기 위해 자신의 컴퓨터에서 로컬로 네트워크를 시작할 수도 있습니다.

이더리움 주소 (Ethereum account) 는 서로 다른 네트워크에서 똑같이 이용될 수 있습니다. 하지만 주소의 잔액 (balance) 및 거래 내역 (transaction history) 는 네트워크마다 다를 수 있습니다. 테스트 작업을 위해 어떤 네트워크가 필요한지, 그리고 테스트넷 이더리움을 획득하는 방법을 알면 유용합니다. 일반적으로 보안상의 이유로 테스트넷에서 메인넷 계정을 재사용하거나 그 반대의 경우는 권장하지 않습니다.

## 필수 구성 요소 {#prerequisites}

테스트넷은 저렴하고 안전한 버전의 이더리움을 제공하므로 여러 네트워크에 대해 알아보기 전에 [이더리움의 기본 사항](/developers/docs/intro-to-ethereum/)을 이해해야 합니다.

## 공개 네트워크 {#public-networks}

공용 네트워크에는 인터넷에 연결할 수 있는 모든 사람이 접근할 수 있습니다. 누구나 공용 블록체인 상의 트랜잭션을 읽거나 만들고 트랜잭션이 실행되도록 승인할 수 있습니다. 개인간의 합의를 통해 거래의 승인 및 네트워크의 상태가 결정된다.

### 이더리움 메인넷 {#ethereum-mainnet}

메인넷이란 실제 거래가 분산 장부에 기록되는 이더리움 블록체인이다.

코인 거래소에서 보여주는 ETH 가격이 바로 메인넷 이더리움 가격이다.

### 이더리움 테스트넷 {#ethereum-testnets}

메인넷 외에도 공용 테스트넷이 있습니다. 테스트넷은 프로토콜 개발자 또는 스마트계약 개발자들이 메인넷에 배포하기 전 실제 환경과 비슷한 가상의 환경에서 프로토콜 업그레이드 또는 스마트계약 테스트를 위해 활용된다. 비유를 들자면, 프로덕션 서버와 스테이징 서버의 관계와 비슷하다.

사실 메인넷에 배포하기 전 모든 스마트계약 코드는 테스트넷에서 테스트를 거쳐야 한다. 이미 배포된 스마트계약에 통합되는 댑 dapp 들은 대부분 테스트넷에 배포 단계를 거쳤다.

대부분의 테스트넷은 허가된 proof-of-authority 합의 메커니즘을 사용하여 시작되었습니다. 즉, 소수의 노드가 거래 검증 및 새 블록 형성에 사용되며 이 때 각 과정에서 신분확인이 이뤄집니다. 또는 일부 테스트넷은 이더리움 메인넷처럼 모든 사람이 벨리데이터 실행을 테스트할 수 있는 개방형 PoS 합의 메커니즘을 특징으로 합니다.

테스트넷의 ETH는 실제 가치가 없는 것으로 간주되지만, 희소해지거나 구하기 어려워진 특정 유형의 테스트넷 ETH에 대한 시장이 형성되기도 했습니다. 이더리움과 상호작용하려면(테스트넷에서도) ETH가 필요하기 때문에, 대부분의 사람들은 포싯에서 테스트넷 ETH를 무료로 받습니다. faucet은 ETH를 받을 주소를 입력할 수 있는 웹앱인 경우가 많다.

#### 어떤 동기화 방법을 사용해야 할까요?

현재 클라이언트 개발자들이 유지 관리하는 두 개의 공개 테스트넷은 Sepolia와 Hoodi입니다. Sepolia는 컨트랙트와 어플리케이션 개발자들이 그들의 어플리케이션을 테스트하기 위해서 필요한 네트워크입니다. Hoodi 네트워크를 통해 프로토콜 개발자는 네트워크 업그레이드를 테스트하고, 스테이커는 검증자 실행을 테스트할 수 있습니다.

#### Sepolia {#sepolia}

**Sepolia는 어플리케이션 개발을 위한 디폴트 테스트넷으로 많이 쓰인다**. Sepolia 네트워크는 클라이언트 및 테스트 팀이 제어하는 허가된 검증자 세트를 사용합니다.

##### 참고 자료

- [웹사이트](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)
- [Blockscout](https://eth-sepolia.blockscout.com/)

##### Faucets

- [Alchemy Sepolia 포싯](https://www.alchemy.com/faucets/ethereum-sepolia)
- [Chain Platform Sepolia 포싯](https://faucet.chainplatform.co/faucets/ethereum-sepolia/)
- [Chainstack Sepolia 포싯](https://faucet.chainstack.com/sepolia-testnet-faucet)
- [Ethereum Ecosystem 포싯](https://www.ethereum-ecosystem.com/faucets/ethereum-sepolia)
- [ethfaucet.com Sepolia 포싯](https://ethfaucet.com/networks/ethereum)
- [Google Cloud Web3 Sepolia 포싯](https://cloud.google.com/application/web3/faucet/ethereum/sepolia)
- [Grabteeth](https://grabteeth.xyz/)
- [Infura Sepolia 포싯](https://www.infura.io/faucet)
- [PoW 포싯](https://sepolia-faucet.pk910.de/)
- [QuickNode Sepolia 포싯](https://faucet.quicknode.com/ethereum/sepolia)

#### Hoodi {#hoodi}

Hoodi는 검증 및 스테이킹을 테스트하기 위한 테스트넷입니다. Hoodi 네트워크는 테스트넷 검증자를 실행하려는 사용자에게 열려 있습니다. 따라서 메인넷에 배포되기 전에 프로토콜 업그레이드를 테스트하려는 스테이커는 Hoodi를 사용해야 합니다.

- 개방형 검증자 세트, staker가 네트워크 업그레이드를 테스트할 수 있음
- 복잡한 스마트 계약 상호 작용을 테스트하는 데 유용한 대규모 state
- 동기화 시간이 길어지고 노드를 실행하는 데 더 많은 스토리지 필요

##### 참고 자료

- [웹사이트](https://hoodi.ethpandaops.io/)
- [GitHub](https://github.com/eth-clients/hoodi)
- [익스플로러](https://explorer.hoodi.ethpandaops.io/)
- [체크포인트 동기화](https://checkpoint-sync.hoodi.ethpandaops.io/)
- [Otterscan](https://hoodi.otterscan.io/)
- [Etherscan](https://hoodi.etherscan.io/)

##### Faucets

- [Chain Platform Hoodi 포싯](https://faucet.chainplatform.co/faucets/ethereum-hoodi/)
- [Hoodi 포싯](https://hoodi.ethpandaops.io/)
- [PoW 포싯](https://hoodi-faucet.pk910.de/)

#### Ephemery {#ephemery}

Ephemery는 매달 완전히 재설정되는 독특한 종류의 테스트넷입니다. 실행 및 합의 상태는 28일마다 제네시스로 되돌아가는데, 이는 테스트넷에서 발생하는 모든 것이 일시적이라는 것을 의미합니다. 따라서 영속성이 필요 없는 단기 테스트, 빠른 노드 부트스트랩 및 '헬로 월드' 유형의 애플리케이션에 이상적입니다.

- 항상 최신 상태, 검증자 및 앱의 단기 테스트
- 기본 계약 세트만 포함합니다.
- 개방형 검증자 세트 및 대량의 자금에 대한 쉬운 접근성
- 가장 작은 노드 요구 사항과 가장 빠른 동기화, 평균 5GB 미만

##### 참고 자료

- [웹사이트](https://ephemery.dev/)
- [Github](https://github.com/ephemery-testnet/ephemery-resources)
- [커뮤니티 채팅](https://matrix.to/#/#staker-testnet:matrix.org)
- [Blockscout](https://explorer.ephemery.dev/)
- [Otterscan](https://otter.bordel.wtf/)
- [비콘 익스플로러](https://beaconlight.ephemery.dev/)
- [체크포인트 동기화](https://checkpoint-sync.ephemery.ethpandaops.io)
- [런치패드](https://launchpad.ephemery.dev/)

#### Faucets

- [Bordel 포싯](https://faucet.bordel.wtf/)
- [Pk910 PoW 포싯](https://ephemery-faucet.pk910.de/)

#### Holesky(지원 중단) {#holesky}

Holesky 테스트넷은 2025년 9월부터 지원이 중단됩니다. 스테이킹 운영자와 인프라 제공업체는 대신 검증자 테스트에 Hoodi를 사용해야 합니다.

- [Holesky 테스트넷 종료 발표](https://blog.ethereum.org/2025/09/01/holesky-shutdown-announcement) - _EF 블로그, 2025년 9월 1일_
- [Holesky 및 Hoodi 테스트넷 업데이트](https://blog.ethereum.org/en/2025/03/18/hoodi-holesky) - _EF 블로그, 2025년 3월 18일_

### 레이어 2 테스트넷 {#layer-2-testnets}

[레이어 2(L2)](/layer-2/)는 특정 이더리움 확장 솔루션 세트를 설명하는 총칭입니다. 레이어 2는 이더리움 블록체인을 확장하는 또다른 블록체인이며 이더리움의 보안성을 그대로 이어 받는다. 레이어 2에 속한 테스트넷은 주로 이더리움 테스트넷과 큰 연관성을 보인다.

#### Arbitrum Sepolia {#arbitrum-sepolia}

[Arbitrum](https://arbitrum.io/)을 위한 테스트넷입니다.

##### 참고 자료

- [Etherscan](https://sepolia.arbiscan.io/)
- [Blockscout](https://sepolia-explorer.arbitrum.io/)

##### Faucets

- [Alchemy Arbitrum Sepolia 포싯](https://www.alchemy.com/faucets/arbitrum-sepolia)
- [Chainlink Arbitrum Sepolia 포싯](https://faucets.chain.link/arbitrum-sepolia)
- [ethfaucet.com Arbitrum Sepolia 포싯](https://ethfaucet.com/networks/arbitrum)
- [QuickNode Arbitrum Sepolia 포싯](https://faucet.quicknode.com/arbitrum/sepolia)

#### Optimistic Sepolia {#optimistic-sepolia}

[Optimism](https://www.optimism.io/)을 위한 테스트넷입니다.

##### 참고 자료

- [Etherscan](https://sepolia-optimistic.etherscan.io/)
- [Blockscout](https://optimism-sepolia.blockscout.com/)

##### Faucets

- [Alchemy 포싯](https://www.alchemy.com/faucets/optimism-sepolia)
- [Chainlink 포싯](https://faucets.chain.link/optimism-sepolia)
- [ethfaucet.com Optimism Sepolia 포싯](https://ethfaucet.com/networks/optimism)
- [테스트넷 포싯](https://docs.optimism.io/builders/tools/build/faucets)

#### Starknet Sepolia {#starknet-sepolia}

[Starknet](https://www.starknet.io)을 위한 테스트넷입니다.

##### 참고 자료

- [Starkscan](https://sepolia.starkscan.co/)

##### Faucets

- [Alchemy 포싯](https://www.alchemy.com/faucets/starknet-sepolia)
- [Blast Starknet Sepolia 포싯](https://blastapi.io/faucets/starknet-sepolia-eth)
- [Starknet 포싯](https://starknet-faucet.vercel.app/)

## 프라이빗 네트워크 {#private-networks}

이더리움 네트워크의 노드가 공개 네트워크(즉, 메인넷 또는 테스트넷)에 연결되지 않은 경우 해당 네트워크는 프라이빗 네트워크입니다. 여기서 개인 (private) 이란 독립적이란 뜻이며 (reserved, isolated) 안전 (protected, secure) 하다는 뜻은 아니다.

### 개발 네트워크 {#development-networks}

이더리움 애플리케이션을 개발하려면 이를 배포하기 전 개인 네트워크에 돌려보면서 확인하는 것을 선호할 수 있다. 웹 개발자들이 로컬 환경에서 서버를 생성하여 작업하는 방식처럼 블록체인도 로컬 환경에서 인스턴스를 생성하여 댑을 테스트 할 수 있다. 이는 공개 테스트넷보다 속도 면에서 더 빠르다는 장점이 있다.

개발 네트워크에 유용한 프로젝트와 개발툴들이 있다. [개발 네트워크](/developers/docs/development-networks/)에 대해 자세히 알아보세요.

### 컨소시엄 네트워크 {#consortium-networks}

합의 프로세스는 사전에 설정되고 검증된 노드들에 의해 관리된다. 교육 기관들의 개인 네트워크가 각각 단일 노드를 운영하며 네트워크 내 서명자 기준으로 인해 블록이 검증되는 경우를 예로 들을 수 있다.

공개 이더리움 네트워크가 인터넷과 비유할 수 있다면, 공동 네트워크는 인트라넷과 비슷하다고 볼 수 있다.

## <Emoji text="🚉" /> 왜 이더리움 테스트넷은 지하철역의 이름을 따서 명명되었을까요? {#why-naming}

많은 이더리움 테스트넷은 실제 지하철이나 기차역의 이름을 따서 명명되었습니다. 이 명명 전통은 초기에 시작되었으며 기여자들이 거주하거나 일했던 전 세계 도시를 반영합니다. 상징적이고 기억하기 쉬우며 실용적입니다. 테스트넷이 이더리움 메인넷과 분리되어 있는 것처럼, 지하철 노선도 지상 교통과 별도로 운행됩니다.

### <Emoji text="🚧" /> 일반적으로 사용되는 레거시 테스트넷 {#common-and-legacy-testnets}

- **Sepolia** - 그리스 아테네의 지하철과 연결된 지역입니다. 현재 스마트 계약 및 탈중앙화앱 테스트에 사용됩니다.
- **Hoodi** - 인도 벵갈루루에 있는 Hoodi 지하철역의 이름을 딴 것입니다. 검증자 및 프로토콜 업그레이드 테스트에 사용됩니다.
- **Goerli** _(지원 중단)_ - 독일 베를린의 Görlitzer Bahnhof의 이름을 딴 것입니다.
- **Rinkeby** _(지원 중단)_ - 지하철역이 있는 스톡홀름 교외 지역의 이름을 딴 것입니다.
- **Ropsten** _(지원 중단)_ - 스톡홀름의 한 지역이자 이전의 페리/지하철 터미널을 가리킵니다.
- **Kovan** _(지원 중단)_ - 싱가포르 MRT 역의 이름을 딴 것입니다.
- **Morden** _(지원 중단)_ - 런던 지하철역의 이름을 딴 것입니다. 이더리움 최초의 공개 테스트넷입니다.

### <Emoji text="🧪" /> 기타 특수 테스트넷 {#other-testnets}

일부 테스트넷은 단기 또는 업그레이드별 테스트를 위해 만들어졌으며 반드시 지하철을 테마로 하지는 않습니다.

- **Holesky** _(지원 중단)_ - 프라하의 Holešovice 역의 이름을 딴 것입니다. 검증자 테스트에 사용되었으며, 2025년에 지원이 중단되었습니다.
- **Kiln**, **Zhejiang**, **Shandong**, **Prater**, **Pyrmont**, **Olympic** _(모두 지원 중단)_ 및 **Ephemery** - 머지, 상하이 또는 검증자 실험과 같은 업그레이드 시뮬레이션을 위해 특수 제작되었습니다. 일부 이름은 지하철 기반이 아닌 지역적이거나 주제별 이름입니다.

지하철역 이름을 사용하면 개발자가 숫자 체인 ID에 의존할 필요 없이 테스트넷을 신속하게 식별하고 기억하는 데 도움이 됩니다. 또한 실용적이고, 세계적이며, 인간 중심적인 이더리움의 문화를 반영합니다.

## 관련 도구 {#related-tools}

- [Chainlist](https://chainlist.org/) _지갑과 공급자를 적절한 체인 ID 및 네트워크 ID에 연결하기 위한 EVM 네트워크 목록_
- [EVM 기반 체인](https://github.com/ethereum-lists/chains) _Chainlist를 구동하는 체인 메타데이터의 GitHub 리포지토리_

## 더 읽어보기 {#further-reading}

- [제안: 예측 가능한 이더리움 테스트넷 수명 주기](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [이더리움 테스트넷의 진화](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
