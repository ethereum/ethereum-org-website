---
title: 이더리움 연구의 활발한 분야
description: 다양한 공개 연구 분야를 탐색하고 참여하는 방법을 알아보세요.
lang: ko
---

이더리움의 주요 강점 중 하나는 활발한 연구 및 엔지니어링 커뮤니티가 지속적으로 이를 개선하고 있다는 점입니다. 전 세계의 열정적이고 숙련된 많은 사람들이 이더리움의 미해결 문제에 기여하고 싶어 하지만, 그 문제가 무엇인지 알아내는 것이 항상 쉬운 일은 아닙니다. 이 페이지는 이더리움의 최첨단 기술에 대한 대략적인 가이드로서 주요 활성 연구 분야를 간략히 설명합니다.

## 이더리움 연구 방식 {#how-ethereum-research-works}

이더리움 연구는 개방적이고 투명합니다. 실행 가능한 노트북 등을 통해 연구 도구와 결과물을 최대한 개방적이고 상호작용할 수 있도록 만드는 것이 문화입니다. 이더리움 연구는 빠르게 진행되며, 새로운 발견은 여러 차례의 동료 평가(peer review)를 거친 후 전통적인 출판물을 통해 커뮤니티에 도달하기보다는 [ethresear.ch](https://ethresear.ch/)와 같은 포럼에 공개적으로 게시되고 논의됩니다. 이더리움 재단(Ethereum Foundation)은 또한 무엇을 우선순위로 두고 있으며 그 이유는 무엇인지 발표하므로, 현재 어떤 문제가 시급한 것으로 간주되는지 누구나 확인할 수 있습니다.

## 일반 연구 리소스 {#general-research-resources}

특정 주제와 관계없이 [ethresear.ch](https://ethresear.ch)와 [Eth R&D 디스코드 채널](https://discord.gg/qGpsxSA)에서 이더리움 연구에 대한 풍부한 정보를 찾을 수 있습니다. 이곳은 이더리움 연구자들이 최신 아이디어와 개발 기회를 논의하는 주요 장소입니다.

프로토콜이 나아갈 방향에 대한 개요를 보려면 [이더리움 로드맵](/roadmap/)부터 시작하여 이더리움 재단의 [2026년 프로토콜 우선순위 업데이트](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)와 이에 대한 진행 상황을 보고하는 [프로토콜 클러스터 업데이트](https://blog.ethereum.org/2026/05/11/protocol-update-may-26)를 읽어보세요. [이더리움 프로토콜 스터디(Ethereum Protocol Studies)](https://blog.ethereum.org/2026/02/17/ethereum-protocol-studies-26)는 프로토콜 자체에 대해 작업하고자 하는 사람들을 위한 체계적인 진입점입니다.

## 자금 지원 출처 {#sources-of-funding}

이더리움 연구에 참여하고 그에 대한 보상을 받을 수 있습니다. [이더리움 재단](/foundation/)은 해결되기를 바라는 문제를 설명하는 위시리스트 항목과 제안 요청서를 게시하는 [생태계 지원 프로그램(Ecosystem Support Program)](https://esp.ethereum.foundation/applicants)을 통해 연구 및 공공재에 자금을 지원합니다. 진행 중이거나 예정된 자금 지원 기회에 대한 정보는 [이더리움 보조금 페이지](/community/grants/)에서 확인할 수 있습니다.

## 프로토콜 연구 {#protocol-research}

프로토콜 연구는 이더리움의 기본 레이어, 즉 노드가 연결, 통신, 이더리움 데이터를 교환 및 저장하고 블록체인의 상태에 대해 합의에 도달하는 방법을 정의하는 규칙 세트와 관련이 있습니다. 오랫동안 유지되어 온 두 가지 범주는 합의와 실행이며, 현재 여러 연구 주제가 이 두 가지를 모두 아우르고 있습니다.

### 합의 {#consensus}

합의 연구는 [이더리움의 지분 증명 (PoS) 메커니즘](/developers/docs/consensus-mechanisms/pos/)과 관련이 있습니다. 여기에는 포크 선택 규칙 및 완결성 가젯의 보안, 스테이킹의 암호경제학, 블록, 증명 및 블롭 데이터를 전달하는 피어 투 피어 네트워크, 검증자가 서명하는 데 사용하는 암호학이 포함됩니다. 합의 연구 주제의 몇 가지 예는 다음과 같습니다.

- 취약점 식별 및 패치
- 암호경제학적 보안 정량화
- 블록이 완결성을 갖추는 데 걸리는 시간 단축
- 합의 클라이언트 간의 피어 투 피어 네트워킹의 효율성, 안전성 및 모니터링 개선

이러한 작업의 대부분은 논문에서 사양(specification)으로 이동했습니다. 데이터 가용성 샘플링은 [푸사카](/roadmap/fusaka/) 업그레이드에 포함되어 출시되었으며, 블록이 생성되는 방식과 트랜잭션 포함이 보장되는 방식에 대한 변경 사항은 향후 업그레이드를 위해 지정되어 있습니다. 또한 린 합의(lean consensus)로 알려진 장기적인 재설계는 양자 내성 서명(post-quantum signatures)과 함께 더 빠른 완결성을 탐구하고 있습니다.

#### 배경 지식 읽기 {#background-reading}

- [지분 증명 (PoS) 소개](/developers/docs/consensus-mechanisms/pos/)
- [단일 슬롯 완결성](/roadmap/single-slot-finality/)
- [캐스퍼 FFG 논문](https://arxiv.org/abs/1710.09437)
- [Gasper 논문](https://arxiv.org/abs/2003.03052)
- [린 이더리움(lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)

#### 최근 연구 {#recent-research}

- [Ethresear.ch 합의](https://ethresear.ch/c/consensus/29)
- [가용성/완결성 딜레마](https://arxiv.org/abs/2009.04987)
- [3-슬롯 완결성: SSF는 "단일" 슬롯에 관한 것이 아닙니다](https://ethresear.ch/t/3-slot-finality-ssf-is-not-about-single-slot/20927)

### 실행 {#execution}

실행 계층은 트랜잭션을 실행하고, [이더리움 가상 머신(EVM)](/developers/docs/evm/)을 구동하며, 합의 레이어에 전달할 실행 페이로드를 생성하는 것과 관련이 있습니다. 이 분야의 연구는 두 가지 갈래로 나뉩니다. 하나는 상태를 유지하고 증명하는 비용을 저렴하게 만드는 것이고, 다른 하나는 노드를 운영하는 사람들에게 더 많은 비용을 부담시키지 않으면서 처리량을 높이는 것입니다. 다음과 같은 많은 활발한 연구 분야가 있습니다.

- 상태를 생성하는 작업의 가스 비용 재조정
- 노드가 더 이상 제공할 필요가 없는 기록 만료
- 트랜잭션을 병렬로 검증할 수 있게 해주는 블록 수준 액세스 목록
- 상태, 데이터 및 연산의 가격을 별도로 책정하는 다차원 수수료 시장
- 그리고 zkEVM을 사용하여 레이어 1 (l1) 블록의 실행 증명

#### 배경 지식 읽기 {#background-reading-1}

- [EVM 소개](/developers/docs/evm/)
- [Ethresear.ch 실행 계층](https://ethresear.ch/c/execution-layer-research/37)
- [이더리움 실행 계층 사양](https://github.com/ethereum/execution-specs)
- [데이터베이스 최적화](https://github.com/erigontech/erigon/blob/main/docs/programmers_guide/db_faq.md)

#### 최근 연구 {#recent-research-1}

- [EIP-7928: 블록 수준 액세스 목록](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-8037: 상태 생성 가스 비용 증가](https://eips.ethereum.org/EIPS/eip-8037)
- [EIP-7999: 통합 다차원 수수료 시장](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7642: eth/69, 기록 만료 및 더 단순한 영수증](https://eips.ethereum.org/EIPS/eip-7642)
- [레이어 1 (l1) zkEVM 출시: 실시간 증명](https://blog.ethereum.org/2025/07/10/realtime-proving)

### 검열 저항성 및 블록 생성 {#censorship-resistance-and-block-building}

현재 대부분의 이더리움 블록은 소수의 전문화된 빌더에 의해 조립되며, 이로 인해 어떤 트랜잭션을 포함할지 결정하는 권한이 집중됩니다. 이 분야의 연구는 빌더 시장을 프로토콜 자체로 가져와 블록을 제안하고 생성하는 역할이 프로토콜 외부 소프트웨어가 아닌 합의 규칙에 의해 분리되도록 하는 것과, 빌더가 누락한 트랜잭션의 포함을 검증자가 강제할 수 있는 방법을 제공하는 것을 다룹니다.

#### 배경 지식 읽기 {#background-reading-21}

- [제안자-빌더 분리 (PBS)](/roadmap/pbs/)
- [단일 비밀 리더 선출(Single secret leader election)](/roadmap/secret-leader-election/)

#### 최근 연구 {#recent-research-21}

- [EIP-7732: 프로토콜 내재화된 제안자-빌더 분리 (PBS)](https://eips.ethereum.org/EIPS/eip-7732)
- [EIP-7805: 포크 선택 강제 포함 목록](https://eips.ethereum.org/EIPS/eip-7805)
- [제안자-빌더 분리 (PBS) 하에서 트랜잭션의 검열 저항성 증가](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 상태 증가 및 무상태성 {#state-growth-and-statelessness}

모든 풀 노드는 이더리움의 상태를 저장하므로, 해당 상태가 증가하는 속도는 노드 운영 비용의 하한선을 설정합니다. 단기적으로 연구는 상태를 생성하는 작업의 가격을 재조정하고 노드가 더 이상 유지할 필요가 없는 기록 만료에 중점을 둡니다. 장기적인 계획은 이더리움의 16진수 머클-패트리샤 트라이(hexary Merkle-Patricia trie)를 훨씬 더 작은 증거를 생성하는 이진 트리로 교체하고, 노드가 전체 상태를 보유하지 않고도 블록을 검증할 수 있도록 무상태성으로 나아가는 것입니다. 이 분야의 초기 작업은 버클 트리를 가정했습니다. 현재 제안은 통합 이진 트리(unified binary tree)이며, 이는 초기 작업 라인에 지정된 증거 가스 일정을 이어받습니다.

#### 배경 지식 읽기 {#background-reading-22}

- [무상태성 및 상태 만료](/roadmap/statelessness/)
- [이더리움 무상태성 책(Ethereum stateless book)](https://stateless.fyi/)

#### 최근 연구 {#recent-research-22}

- [EIP-7864: 통합 이진 트리를 사용하는 이더리움 상태](https://eips.ethereum.org/EIPS/eip-7864)
- [EIP-4762: 무상태성 가스 비용 변경](https://eips.ethereum.org/EIPS/eip-4762)
- [이더리움에서 탈중앙화된 상태가 중요한 이유](https://ethresear.ch/t/why-decentralized-state-is-important-for-ethereum/25622)

### 양자 내성 암호학 {#post-quantum-cryptography}

이더리움의 검증자 서명과 애플리케이션 계층의 대부분은 타원 곡선 암호학에 의존하고 있으며, 이는 충분한 성능을 갖춘 양자 컴퓨터에 의해 해독될 수 있습니다. 이더리움을 양자 내성으로 만든다는 것은 이러한 서명을 해시 기반 또는 격자 기반 대안으로 교체하고, 대규모 검증자 세트에 대해 서명 집계를 충분히 효율적으로 유지하며, 기존 계정에 마이그레이션 경로를 제공하는 것을 의미합니다. 이더리움 재단은 전담 양자 내성 팀을 운영하고 있으며, 이는 로드맵에서 가장 장기적인 프로그램 중 하나입니다.

#### 배경 지식 읽기 {#background-reading-23}

- [양자 내성](/roadmap/security/quantum-resistance/)
- [포스트 퀀텀 이더리움](https://pq.ethereum.org/)

#### 최근 연구 {#recent-research-23}

- [린 이더리움(lean Ethereum)](https://blog.ethereum.org/2025/07/31/lean-ethereum)
- [Ethresear.ch 암호학](https://ethresear.ch/c/cryptography/28)
- [린 이더리움 구현](https://github.com/leanEthereum)

## 클라이언트 개발 {#client-development}

이더리움 클라이언트는 이더리움 프로토콜의 구현체입니다. 클라이언트 개발은 프로토콜 연구의 결과를 이러한 클라이언트에 구축하여 현실로 만듭니다. 클라이언트 개발에는 특정 구현체를 구축하는 것뿐만 아니라 클라이언트 사양을 업데이트하는 것도 포함됩니다.

이더리움 노드는 두 가지 소프트웨어를 실행해야 합니다.

1. 블록체인의 헤드를 추적하고, 블록을 가십(gossip)하며, 합의 로직을 처리하는 합의 클라이언트
2. 이더리움 가상 머신을 지원하고 트랜잭션 및 스마트 컨트랙트를 실행하는 실행 클라이언트

이 두 가지와 함께 레이어 1 (l1) 블록의 실행을 증명하는 클라이언트와 양자 내성 서명을 중심으로 구축된 린 합의 클라이언트를 포함하여 새로운 클래스의 클라이언트가 프로토타입으로 제작되고 있습니다.

노드 및 클라이언트에 대한 자세한 내용과 현재 모든 클라이언트 구현체 목록은 [노드 및 클라이언트 페이지](/developers/docs/nodes-and-clients/)를 참조하세요. 또한 [기록 페이지](/ethereum-forks/)에서 모든 이더리움 업그레이드 기록을 확인할 수 있습니다.

### 실행 클라이언트 {#execution-clients}

- [실행 클라이언트 사양](https://github.com/ethereum/execution-specs)
- [실행 API 사양](https://github.com/ethereum/execution-apis)

### 합의 클라이언트 {#consensus-clients}

- [합의 클라이언트 사양](https://github.com/ethereum/consensus-specs)
- [비콘 API 사양](https://ethereum.github.io/beacon-APIs/)

### zkEVM 클라이언트 {#zkevm-clients}

- [zkEVM](/roadmap/zkevm/)
- [Ethproofs](https://ethproofs.org/)
- [레이어 1 (l1) zkEVM 출시: 보안 기반](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

## 확장성 및 성능 {#scaling-and-performance}

이더리움 확장은 이더리움 연구자들의 주요 관심 분야이며, 레이어 1 (l1) 자체의 처리량을 높이는 것과 데이터를 이더리움에 게시하는 롤업으로 실행을 이동하는 두 가지 트랙으로 동시에 진행됩니다. 현재 작업에는 블록 가스 한도 증가, 상태 증가 가격 재조정, 롤업 데이터를 위한 블롭 용량 확장, 노드가 저장하고 검증해야 하는 항목 축소 등이 포함됩니다. 이더리움 확장에 대한 소개 정보는 [확장성 페이지](/developers/docs/scaling/)와 [확장성 로드맵](/roadmap/scaling/)에서 확인할 수 있습니다.

### 레이어 2 (l2) {#layer-2}

현재 트랜잭션을 일괄 처리하고 이더리움 레이어 1 (l1)에서 이를 보호하기 위해 다양한 기술을 사용하여 이더리움을 확장하는 여러 레이어 2 (l2) 프로토콜이 있습니다. 공개 연구에는 증명 지연 시간 및 비용 감소, 트랜잭션이 무신뢰 완결성에 도달하는 데 걸리는 시간 단축, 여러 롤업에 걸쳐 사용자에게 일관된 단일 경험 제공 등이 포함됩니다.

#### 배경 지식 읽기 {#background-reading-2}

- [레이어 2 (l2) 소개](/layer-2/)
- [L2BEAT: 확장성 요약](https://l2beat.com/scaling/summary)
- [롤업 중심의 이더리움 로드맵](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)

#### 최근 연구 {#recent-research-2}

- [Ethresear.ch 레이어 2 (l2)](https://ethresear.ch/c/layer-2/32)
- [L2BEAT: 온체인 비용](https://l2beat.com/scaling/costs)
- [2026년 이더리움 기반 구축: 무엇이 바뀌었나](/latest/building-on-ethereum-in-2026/)

### 상호운용성 {#interoperability}

사용자와 자산은 이더리움 레이어 1 (l1)과 여러 레이어 2 (l2)에 분산되어 있으며, 연구 과제는 중개자를 신뢰하지 않고도 이러한 체인 간에 이동하고 활동할 수 있도록 하는 것입니다. 이 작업은 인텐트 기반 전송, 표준화된 크로스체인 주소 지정 및 이름 지정, 일반 메시지 전달, 지갑 수준의 체인 추상화를 다룹니다. 이는 수탁형 브리지가 자산을 보유하던 모델을 대체합니다. 브리지는 역사적으로 생태계에서 가장 큰 손실 원인 중 하나였으므로, 모든 크로스체인 메커니즘의 보안은 여전히 주요 관심사입니다.

#### 배경 지식 읽기 {#background-reading-3}

- [블록체인 브리지 소개](/bridges/)
- [이더리움을 다시 하나의 체인처럼 느끼게 만들기](https://blog.ethereum.org/2025/11/18/eil)
- [오픈 인텐트 프레임워크(Open Intents Framework)](https://openintents.xyz/)
- [브리지 검증](https://stonecoldpat.github.io/images/validatingbridges.pdf)

#### 최근 연구 {#recent-research-3}

- [ERC-7683: 크로스체인 인텐트](https://eips.ethereum.org/EIPS/eip-7683)
- [ERC-7930: 상호운용 가능한 주소](https://eips.ethereum.org/EIPS/eip-7930)
- [ERC-7828: 상호운용 가능한 이름](https://eips.ethereum.org/EIPS/eip-7828)

### 데이터 가용성 및 블롭 확장 {#data-availability-and-blob-scaling}

롤업은 데이터를 블롭 형태로 이더리움에 게시하며, 해당 데이터 레이어를 확장하는 것은 실행 확장과는 별개의 독립적인 연구 과제입니다. 이더리움은 이제 데이터 가용성 샘플링을 사용하므로, 검증자는 블롭 데이터를 모두 다운로드하는 대신 일부를 샘플링하여 게시되었는지 확인할 수 있으며, 전용 블롭 매개변수 전용 포크를 통해 블롭 용량이 점진적으로 증가합니다. 미해결 질문으로는 샘플링을 어디까지 추진할 수 있는지, 집에서 스테이킹하는 사람들을 위해 대역폭 요구 사항을 어떻게 관리 가능한 수준으로 유지할지, 블롭 가격 책정이 수요에 어떻게 반응해야 하는지 등이 있습니다.

#### 배경 지식 읽기 {#background-reading-4}

- [PeerDAS](/roadmap/fusaka/peerdas/)
- [푸사카 업그레이드](/roadmap/fusaka/)
- [댕크샤딩](/roadmap/danksharding/)
- [데이터 가용성](/developers/docs/data-availability/)
- [EIP-4844: 샤드 블롭 트랜잭션](https://eips.ethereum.org/EIPS/eip-4844)
- [프로토 댕크샤딩 노트](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)

#### 최근 연구 {#recent-research-4}

- [EIP-7594: PeerDAS](https://eips.ethereum.org/EIPS/eip-7594)
- [EIP-7892: 블롭 매개변수 전용 하드포크](https://eips.ethereum.org/EIPS/eip-7892)
- [Ethresear.ch 샤딩](https://ethresear.ch/c/sharding/6)

### 하드웨어 {#hardware}

적당한 하드웨어에서 [노드를 실행](/developers/docs/nodes-and-clients/run-a-node/)하는 것은 이더리움을 탈중앙화된 상태로 유지하는 데 기본이 되므로, 처리량의 모든 증가는 노드 운영자의 비용과 비교하여 평가되어야 합니다. 블록 가스 한도가 증가하고 추가 증가가 계획됨에 따라, 활발한 연구는 상태 증가 및 가격 책정 방법, 더 큰 상태에서의 동기화 및 데이터베이스 성능, 기록 만료를 통해 얻을 수 있는 디스크 절약, 그리고 궁극적으로 무상태성을 다룹니다.

#### 배경 지식 읽기 {#background-reading-5}

- [자체 이더리움 노드 구축하기](/developers/docs/nodes-and-clients/run-a-node/)
- [무상태성 및 상태 만료](/roadmap/statelessness/)
- [ARM 기반 이더리움](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 최근 연구 {#recent-research-5}

- [이더리움 확장: 더 높은 가스 한도와 그 너머로 가는 길](https://ethpandaops.io/posts/gaslimit-scaling/)
- [EIP-8261: 가스 한도 일정](https://eips.ethereum.org/EIPS/eip-8261)
- [EIP-8037: 상태 생성 가스 비용 증가](https://eips.ethereum.org/EIPS/eip-8037)

## 보안 {#security}

보안은 스팸 및 스캠 방지, 지갑 보안, 하드웨어 보안, 암호경제학적 보안, 검열 저항성, 양자 내성 준비, 버그 헌팅, 애플리케이션 및 클라이언트 소프트웨어의 테스트 및 검증을 포함할 수 있는 광범위한 주제입니다. 이더리움의 [보안 로드맵](/roadmap/security/)은 프로토콜 수준의 작업을 다룹니다.

### 암호학 및 ZKP {#cryptography--zkp}

영지식 증명(ZKP)과 암호학은 이더리움과 그 애플리케이션에 프라이버시와 보안을 구축하는 데 매우 중요합니다. 영지식 증명은 연구 단계에서 프로덕션 인프라로 이동했습니다. 실제 이더리움 블록을 증명하는 증명자(prover)는 이제 지연 시간, 비용 및 건전성(soundness)에 대해 공개적으로 벤치마킹됩니다. 이에 따라 미해결 문제도 실시간으로 수행할 수 있을 만큼 빠르게 레이어 1 (l1) 블록을 증명하고, 사용 중인 증명 시스템의 보안을 엄격하게 설명하며, 양자 내성 암호학을 준비하는 방향으로 전환되었습니다.

#### 배경 지식 읽기 {#background-reading-6}

- [zkEVM](/roadmap/zkevm/)
- [프라이버시](/roadmap/privacy/)
- [영지식 팟캐스트](https://zeroknowledge.fm/)

#### 최근 연구 {#recent-research-6}

- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)
- [Ethresear.ch 암호학](https://ethresear.ch/c/cryptography/28)
- [해시 기반 zkEVM 증명 시스템을 위한 건전성 계산기](https://github.com/ethereum/soundcalc)
- [레이어 1 (l1) zkEVM 출시: 보안 기반](https://blog.ethereum.org/2025/12/18/zkevm-security-foundations)

### 지갑 {#wallets}

이더리움 지갑은 브라우저 확장 프로그램, 데스크톱 및 모바일 앱, 또는 이더리움의 스마트 컨트랙트일 수 있습니다. 계정 추상화는 더 이상 실험적인 기능이 아닙니다. ERC-4337은 프로토콜 변경 없이 스마트 계정을 제공하며, EIP-7702는 일반 계정이 코드를 설정할 수 있게 하여 사용자가 이미 가지고 있는 주소로 트랜잭션 일괄 처리, 가스 스폰서십 및 소셜 복구가 작동하도록 합니다. 현재 공개 연구는 프로토콜 자체의 네이티브 계정 추상화, 모듈식이고 감사 가능한 계정 아키텍처, 일반인이 안전하게 운영할 수 있는 키 관리 및 복구에 집중되어 있습니다.

#### 배경 지식 읽기 {#background-reading-7}

- [지갑 소개](/wallets/)
- [지갑 보안 소개](/security/)
- [계정 추상화](/roadmap/account-abstraction/)
- [EIP-7702](/roadmap/pectra/7702/)
- [Ethresear.ch 보안](https://ethresear.ch/c/security/25)

#### 최근 연구 {#recent-research-7}

- [EIP-8141: 프레임 트랜잭션](https://eips.ethereum.org/EIPS/eip-8141)
- [ERC-5792: 지갑 호출 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-6963: 다중 주입 프로바이더 디스커버리](https://eips.ethereum.org/EIPS/eip-6963)
- [검증 중심의 스마트 컨트랙트 지갑](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)

## 커뮤니티, 교육 및 아웃리치 {#community-education-and-outreach}

새로운 사용자를 이더리움에 온보딩하려면 새로운 교육 리소스와 아웃리치 접근 방식이 필요합니다. 여기에는 블로그 게시물 및 기사, 책, 팟캐스트, 밈, 교육 리소스, 이벤트 등 커뮤니티를 구축하고, 초보자를 환영하며, 사람들에게 이더리움에 대해 교육하는 모든 것이 포함될 수 있습니다.

### 디자인 및 UX {#design-and-ux}

더 많은 사람들을 이더리움에 온보딩하려면 생태계의 디자인과 사용자 경험을 개선해야 합니다. 이를 위해서는 디자이너와 제품 전문가가 지갑과 앱의 작동 방식을 재검토해야 하며, 이는 점점 더 일괄 처리된 지갑 호출, 가스 스폰서십, 복구 가능한 계정, 속한 체인을 전달하는 사람이 읽을 수 있는 주소 등 이미 존재하는 표준에 맞춰 디자인하는 것을 의미합니다. Web3 UX 연구를 위한 권위 있는 장소가 비교적 적기 때문에, 발표된 연구와 디자인 지침이 흩어져 있는 경향이 있습니다.

#### 배경 지식 읽기 {#background-reading-8}

- [Web3의 디자인 및 UX](/developers/docs/design-and-ux/)
- [이더리움 사용자 경험 로드맵](/roadmap/user-experience/)
- [Web3 디자인 플레이북](https://learnweb3.design/)
- [Web3 UX 디자인 핸드북](https://web3ux.design/)

#### 최근 연구 {#recent-research-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)
- [ERC-5792: 지갑 호출 API](https://eips.ethereum.org/EIPS/eip-5792)
- [ERC-7828: 상호운용 가능한 이름](https://eips.ethereum.org/EIPS/eip-7828)

### 경제학 {#economics}

이더리움의 경제학 연구는 크게 두 가지 접근 방식을 따릅니다. 경제적 인센티브에 의존하는 메커니즘의 보안을 검증하는 것("미시경제학")과 프로토콜, 애플리케이션 및 사용자 간의 가치 흐름을 분석하는 것("거시경제학")입니다. 이더리움의 기본 자산(이더) 및 그 위에 구축된 토큰(예: NFT 및 ERC-20 토큰)과 관련된 복잡한 암호경제학적 요인이 있습니다.

#### 배경 지식 읽기 {#background-reading-9}

- [강력한 인센티브 그룹(Robust Incentives Group)](https://rig.ethereum.org/)
- [이더리움 경제학 마스터클래스 및 경제 모델](https://github.com/CADLabs/ethereum-economic-model)

#### 최근 연구 {#recent-research-9}

- [Ethresear.ch 경제학](https://ethresear.ch/c/economics/16)
- [유통량 균형](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV 정량화: 숲은 얼마나 어두운가?](https://arxiv.org/abs/2101.05511)

### 블록 공간 및 수수료 시장 {#blockspace-fee-markets}

블록 공간 시장은 이더리움(레이어 1 (l1))에 직접 또는 브리지된 네트워크(예: 롤업(레이어 2 (l2)))에서 최종 사용자 트랜잭션의 포함을 관리합니다. 이더리움에서 트랜잭션은 EIP-1559로 프로토콜 내에 배포된 수수료 시장에 제출되어 스팸으로부터 체인을 보호하고 혼잡에 대한 가격을 책정합니다. 두 레이어 모두에서 트랜잭션은 최대 추출 가능 가치(MEV)로 알려진 외부 효과를 생성할 수 있으며, 이는 이러한 외부 효과를 포착하거나 관리하기 위한 새로운 시장 구조를 유도합니다. 현재 작업은 상태, 데이터 및 연산이 독립적으로 혼잡해지기 때문에 여러 리소스의 가격을 한 번에 책정하는 것과, 블록을 조립하는 주체 및 조건을 변경하는 것으로 확장됩니다.

#### 배경 지식 읽기 {#background-reading-10}

- [이더리움 블록체인을 위한 트랜잭션 수수료 메커니즘 설계: EIP-1559의 경제적 분석 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 시뮬레이션 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [제1원칙에서 본 롤업 경제학](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [플래시 보이즈 2.0: 탈중앙화 거래소에서의 선행 매매, 트랜잭션 재정렬 및 합의 불안정성](https://arxiv.org/abs/1904.05234)

#### 최근 연구 {#recent-research-10}

- [EIP-7999: 통합 다차원 수수료 시장](https://eips.ethereum.org/EIPS/eip-7999)
- [EIP-7928: 블록 수준 액세스 목록](https://eips.ethereum.org/EIPS/eip-7928)
- [크로스 도메인 MEV](https://arxiv.org/abs/2112.01472)

### 지분 증명 (PoS) 인센티브 {#proof-of-stake-incentives}

검증자는 부정직한 행동에 대한 담보로 이더리움의 기본 자산(이더)을 사용합니다. 이것의 암호경제학이 네트워크의 보안을 결정합니다. 정교한 검증자는 인센티브 레이어의 미묘한 차이를 악용하여 명시적인 공격을 시작할 수 있습니다. 펙트라 업그레이드 이후, 검증자는 훨씬 더 큰 유효 잔고를 보유하고 수익을 얻을 수 있으며 여러 검증자를 하나로 통합할 수 있어 검증자 운영의 경제성이 변경되었습니다.

#### 배경 지식 읽기 {#background-reading-11}

- [최대 유효 잔고](/roadmap/pectra/maxeb/)
- [이더리움 경제학 마스터클래스 및 경제 모델](https://github.com/CADLabs/ethereum-economic-model)
- [지분 증명 (PoS) 인센티브 시뮬레이션 (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### 최근 연구 {#recent-research-11}

- [강력한 인센티브 그룹(Robust Incentives Group)](https://rig.ethereum.org/)
- [지분 증명 (PoS) 이더리움에 대한 세 가지 공격](https://arxiv.org/abs/2110.10086)

### 유동성 스테이킹 및 파생상품 {#liquid-staking-and-derivatives}

유동성 스테이킹을 사용하면 32 ETH 미만을 보유한 사용자도 이더를 탈중앙화 금융 (DeFi)에서 사용할 수 있는 스테이킹된 이더를 나타내는 토큰으로 교환하여 스테이킹 수익을 받을 수 있습니다. 그러나 유동성 스테이킹과 관련된 인센티브 및 시장 역학, 그리고 이더리움의 보안에 미치는 영향(예: 중앙화 위험)은 아직 밝혀지고 있는 중입니다.

#### 배경 지식 읽기 {#background-reading-12}

- [Ethresear.ch 유동성 스테이킹](https://ethresear.ch/search?q=liquid%20staking)
- [리도: 무신뢰 이더리움 스테이킹으로 가는 길](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)

#### 최근 연구 {#recent-research-12}

- [유동성 스테이킹 파생상품의 위험성](https://notes.ethereum.org/@djrtwo/risks-of-lsd)
- [리도에서의 출금 처리](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)

## 테스트 {#testing}

### 클라이언트 및 네트워크 테스트 {#client-and-network-testing}

이더리움의 사양은 실행 가능하며, 여기서 생성된 테스트 픽스처(test fixtures)는 클라이언트 팀이 구현을 확인하는 기준이 됩니다. 이와 함께 공유 테스트 하네스(test harnesses)는 클라이언트를 서로 대조하고 의도적으로 적대적인 네트워크 조건에 대해 실행하며, 퍼블릭 테스트넷은 메인넷에 도달하기 전에 업그레이드를 실행합니다. 이 인프라를 개선하는 것은 버그가 사용자에게 도달하기 전에 포착하는 방법이기 때문에 가장 영향력 있는 작업 중 하나입니다.

#### 배경 지식 읽기 {#background-reading-24}

- [이더리움 실행 계층 사양](https://github.com/ethereum/execution-specs)
- [합의 클라이언트 사양](https://github.com/ethereum/consensus-specs)

#### 최근 연구 {#recent-research-24}

- [엔드투엔드 클라이언트 테스트 하네스, hive](https://github.com/ethereum/hive)
- [테스트넷 테스트 도구, Assertoor](https://github.com/ethpandaops/assertoor)

### 정형 검증 {#formal-verification}

정형 검증은 기계가 확인한 수학적 증명을 사용하여 사양이나 구현이 의도한 대로 작동하는지 확인합니다. 이더리움에서 이는 EVM 구현이 정형 의미론(formal semantics)과 일치함을 증명하고, 영지식 증명자가 의존하는 회로 및 증명 시스템의 건전성을 증명하며, 그 아래에 있는 암호학적 기본 요소를 검증하는 것을 다룹니다. 추가 연구를 통해 이러한 증명을 강화하고 스택의 더 많은 부분으로 확장할 수 있습니다.

#### 배경 지식 읽기 {#background-reading-13}

- [검증된 zkEVM](https://verified-zkevm.org/)
- [정형 검증 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 최근 연구 {#recent-research-13}

- [검증된 zkEVM 프로젝트 개요](https://github.com/Verified-zkEVM/Overview)
- [KEVM: K 프레임워크에서의 EVM 의미론](https://github.com/runtimeverification/evm-semantics)
- [예치 컨트랙트의 정형 검증](https://github.com/runtimeverification/deposit-contract-verification)

## 데이터 과학 및 분석 {#data-science-and-analytics}

이더리움의 활동과 네트워크 상태에 대한 자세한 정보를 제공하는 더 많은 데이터 분석 도구와 대시보드가 필요합니다. 기본 데이터의 대부분은 공개되어 있고 쿼리할 수 있으므로, 일반적으로 접근성보다는 분석 및 프레젠테이션에 격차가 있습니다.

### 배경 지식 읽기 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [클라이언트 다양성 대시보드](https://clientdiversity.org/)
- [이더리움 JSON-RPC 실행 API 사양](https://ethereum.github.io/execution-apis/)

#### 최근 연구 {#recent-research-14}

- [강력한 인센티브 그룹 데이터 분석](https://rig.ethereum.org/)
- [ethPandaOps 오픈 데이터](https://ethpandaops.io/data/)
- [L2BEAT: 확장성 요약](https://l2beat.com/scaling/summary)

## 앱 및 도구 {#apps-and-tooling}

애플리케이션 계층은 이더리움의 기본 레이어에서 트랜잭션을 결제하는 다양한 프로그램 생태계를 지원합니다. 개발 팀은 이더리움을 활용하여 중요한 웹2 앱의 조합 가능하고 무허가성이며 검열 저항성을 갖춘 버전을 만들거나 완전히 새로운 Web3 네이티브 개념을 창출하는 새로운 방법을 끊임없이 찾고 있습니다. 동시에 이더리움에서 탈중앙화 애플리케이션 (dapp)을 구축하는 것을 덜 복잡하게 만드는 새로운 도구가 개발되고 있습니다.

### 탈중앙화 금융 (DeFi) {#defi}

탈중앙화 금융 (DeFi)은 이더리움 위에 구축된 주요 애플리케이션 클래스 중 하나입니다. 탈중앙화 금융 (DeFi)은 사용자가 스마트 컨트랙트를 사용하여 암호화폐 자산을 저장, 전송, 대출, 차입 및 투자할 수 있도록 하는 조합 가능한 "머니 레고(money legos)"를 만드는 것을 목표로 합니다. 탈중앙화 금융 (DeFi)은 끊임없이 업데이트되는 빠르게 변화하는 공간입니다. 안전하고 효율적이며 접근 가능한 프로토콜에 대한 연구가 지속적으로 필요합니다.

#### 배경 지식 읽기 {#background-reading-15}

- [탈중앙화 금융 (DeFi)](/defi/)
- [코인베이스: 탈중앙화 금융 (DeFi)이란 무엇인가?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 최근 연구 {#recent-research-15}

- [탈중앙화 금융, 중앙화된 소유권?](https://arxiv.org/pdf/2012.09306.pdf)
- [Ethresear.ch 애플리케이션](https://ethresear.ch/c/applications/18)

### DAO {#daos}

이더리움의 영향력 있는 사용 사례는 DAO를 사용하여 탈중앙화된 방식으로 조직할 수 있는 능력입니다. 이더리움의 DAO가 신뢰 최소화 조정 도구로서 개선된 형태의 거버넌스를 실행하기 위해 어떻게 개발되고 활용될 수 있는지에 대한 활발한 연구가 많이 진행되고 있으며, 이는 전통적인 기업 및 조직을 넘어 사람들의 선택권을 크게 확장합니다.

#### 배경 지식 읽기 {#background-reading-16}

- [DAO 소개](/dao/)

#### 최근 연구 {#recent-research-16}

- [DAO 생태계 매핑](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 개발자 도구 {#developer-tools}

이더리움 개발자를 위한 도구는 빠르게 개선되고 있습니다. 이 일반적인 분야에서 수행해야 할 활발한 연구 및 개발이 많이 있습니다.

#### 배경 지식 읽기 {#background-reading-17}

- [프로그래밍 언어별 도구](/developers/docs/programming-languages/)
- [개발자 프레임워크](/developers/docs/frameworks/)
- [탈중앙화 애플리케이션 (dapp) 소개](/developers/docs/dapps/)
- [토큰 표준](/developers/docs/standards/tokens/)

#### 최근 연구 {#recent-research-17}

- [Eth R&D 디스코드](https://discord.gg/qGpsxSA)
- [이더리움 실행 API 사양](https://github.com/ethereum/execution-apis)

### 오라클 {#oracles}

오라클은 무허가성 및 탈중앙화된 방식으로 오프체인 데이터를 블록체인으로 가져옵니다. 이 데이터를 온체인으로 가져오면 탈중앙화 애플리케이션 (dapp)이 실제 자산의 가격 변동, 오프체인 앱의 이벤트 또는 날씨 변화와 같은 실제 현상에 반응할 수 있습니다.

#### 배경 지식 읽기 {#background-reading-18}

- [오라클 소개](/developers/docs/oracles/)

#### 최근 연구 {#recent-research-18}

- [블록체인 오라클 설문조사](https://arxiv.org/pdf/2004.07140.pdf)

### 앱 보안 {#app-security}

이더리움에서의 해킹은 일반적으로 프로토콜 자체가 아닌 개별 애플리케이션의 취약점을 악용합니다. 해커와 앱 개발자는 새로운 공격과 방어를 개발하기 위한 군비 경쟁에 갇혀 있습니다. 이는 해킹으로부터 앱을 안전하게 유지하기 위해 항상 중요한 연구 및 개발이 필요함을 의미합니다.

#### 배경 지식 읽기 {#background-reading-19}

- [스마트 컨트랙트 보안](/developers/docs/smart-contracts/security/)
- [웜홀(Wormhole) 익스플로잇 보고서](https://www.chainalysis.com/blog/wormhole-hack-february-2022/)
- [이더리움 컨트랙트 해킹 사후 분석 목록](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://rekt.news/)

#### 최근 연구 {#recent-research-19}

- [Ethresear.ch 애플리케이션](https://ethresear.ch/c/applications/18)

### 기술 스택 {#technology-stack}

전체 이더리움 기술 스택을 탈중앙화하는 것은 중요한 연구 분야입니다. 현재 이더리움의 탈중앙화 애플리케이션 (dapp)은 중앙화된 도구나 인프라에 의존하기 때문에 일반적으로 일부 중앙화 지점을 가지고 있습니다. 이러한 의존성을 줄인다는 것은 단일 프로바이더를 신뢰하지 않고도 애플리케이션이 이더리움을 읽을 수 있도록 실용적으로 만드는 것을 의미하며, 여기서 라이트 클라이언트와 노드 데이터에 대한 무신뢰 액세스가 도입됩니다.

#### 배경 지식 읽기 {#background-reading-20}

- [이더리움 스택](/developers/docs/ethereum-stack/)
- [라이트 클라이언트](/developers/docs/nodes-and-clients/light-clients/)
- [스마트 컨트랙트 소개](/developers/docs/smart-contracts/)
- [탈중앙화 스토리지 소개](/developers/docs/storage/)

#### 최근 연구 {#recent-research-20}

- [스마트 컨트랙트 조합성](/developers/docs/smart-contracts/composability/)
- [코인베이스: Web3 스택 소개](https://www.coinbase.com/blog/a-simple-guide-to-the-web3-stack)