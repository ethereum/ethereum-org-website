---
title: 활발한 이더리움 연구 분야
description: 다양한 공개 연구 분야를 탐색하고 참여하는 방법을 알아보세요.
lang: ko
---

이더리움의 주요 강점 중 하나는 활발한 연구 및 엔지니어링 커뮤니티가 지속적으로 이를 개선하고 있다는 점입니다. 전 세계의 열정적이고 숙련된 많은 사람들이 이더리움의 미해결 문제에 기여하고 싶어 하지만, 그 문제가 무엇인지 알아내는 것이 항상 쉬운 일은 아닙니다. 이 페이지는 이더리움의 최신 동향에 대한 대략적인 가이드로서 주요 활성 연구 분야를 간략하게 설명합니다.

## 이더리움 연구 진행 방식 {#how-ethereum-research-works}

이더리움 연구는 개방적이고 투명하며, [탈중앙화 과학(DeSci)](https://hackernoon.com/desci-decentralized-science-as-our-chance-to-recover-the-real-science)의 원칙을 구현합니다. 실행 가능한 노트북 등을 통해 연구 도구와 결과물을 최대한 개방적이고 상호 작용할 수 있도록 만드는 것이 문화입니다. 이더리움 연구는 빠르게 진행되며, 여러 차례의 동료 평가를 거친 후 전통적인 출판물을 통해 커뮤니티에 도달하기보다는 [ethresear.ch](https://ethresear.ch/)와 같은 포럼에 새로운 발견이 공개적으로 게시되고 논의됩니다.

## 일반 연구 리소스 {#general-research-resources}

특정 주제와 관계없이 [ethresear.ch](https://ethresear.ch) 및 [Eth R&D 디스코드 채널](https://discord.gg/qGpsxSA)에서 이더리움 연구에 대한 풍부한 정보를 찾을 수 있습니다. 이곳은 이더리움 연구자들이 최신 아이디어와 개발 기회를 논의하는 주요 장소입니다.

2022년 5월 [DelphiDigital](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum)에서 발행한 이 보고서는 이더리움 로드맵에 대한 훌륭한 개요를 제공합니다.

## 자금 지원 출처 {#sources-of-funding}

이더리움 연구에 참여하고 그에 대한 보상을 받을 수 있습니다! 예를 들어, [이더리움 재단](/foundation/)은 최근 [학술 보조금(Academic Grants) 자금 지원 라운드](https://esp.ethereum.foundation/academic-grants)를 진행했습니다. 진행 중이거나 예정된 자금 지원 기회에 대한 정보는 [이더리움 보조금 페이지](/community/grants/)에서 확인할 수 있습니다.

## 프로토콜 연구 {#protocol-research}

프로토콜 연구는 이더리움의 기본 레이어, 즉 노드가 연결, 통신, 이더리움 데이터를 교환 및 저장하고 블록체인의 상태에 대해 합의에 도달하는 방법을 정의하는 규칙 세트와 관련이 있습니다. 프로토콜 연구는 합의와 실행이라는 두 가지 최상위 범주로 나뉩니다.

### 합의 {#consensus}

합의 연구는 [이더리움의 지분 증명(PoS) 메커니즘](/developers/docs/consensus-mechanisms/pos/)과 관련이 있습니다. 합의 연구 주제의 몇 가지 예는 다음과 같습니다.

- 취약점 식별 및 패치
- 암호경제학적 보안 정량화
- 클라이언트 구현의 보안 또는 성능 향상
- 경량 클라이언트 개발

미래 지향적인 연구뿐만 아니라, 이더리움의 상당한 개선을 가능하게 하기 위해 단일 슬롯 완결성과 같은 프로토콜의 근본적인 재설계도 연구되고 있습니다. 또한 합의 클라이언트 간의 피어 투 피어 네트워킹의 효율성, 안전성 및 모니터링도 중요한 연구 주제입니다.

#### 배경 지식 읽기 {#background-reading}

- [지분 증명 소개](/developers/docs/consensus-mechanisms/pos/)
- [캐스퍼 FFG 논문](https://arxiv.org/abs/1710.09437)
- [캐스퍼 FFG 설명](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Gasper 논문](https://arxiv.org/abs/2003.03052)

#### 최근 연구 {#recent-research}

- [Ethresear.ch 합의](https://ethresear.ch/c/consensus/29)
- [가용성/완결성 딜레마](https://arxiv.org/abs/2009.04987)
- [단일 슬롯 완결성](https://ethresear.ch/t/a-model-for-cumulative-committee-based-finality/10259)
- [제안자-빌더 분리(PBS)](https://notes.ethereum.org/@vbuterin/pbs_censorship_resistance)

### 실행 {#execution}

실행 계층은 트랜잭션을 실행하고, [이더리움 가상 머신(EVM)](/developers/docs/evm/)을 구동하며, 합의 레이어에 전달할 실행 페이로드를 생성하는 것과 관련이 있습니다. 다음과 같은 여러 활발한 연구 분야가 있습니다.

- 경량 클라이언트 지원 구축
- 가스 한도 연구
- 새로운 데이터 구조(예: 버클 트리) 통합

#### 배경 지식 읽기 {#background-reading-1}

- [EVM 소개](/developers/docs/evm)
- [Ethresear.ch 실행 계층](https://ethresear.ch/c/execution-layer-research/37)

#### 최근 연구 {#recent-research-1}

- [데이터베이스 최적화](https://github.com/ledgerwatch/erigon/blob/devel/docs/programmers_guide/db_faq.md)
- [상태 만료](https://notes.ethereum.org/@vbuterin/state_expiry_eip)
- [상태 만료로 가는 길](https://hackmd.io/@vbuterin/state_expiry_paths)
- [버클 및 상태 만료 제안](https://notes.ethereum.org/@vbuterin/verkle_and_state_expiry_proposal)
- [기록 관리](https://eips.ethereum.org/EIPS/eip-4444)
- [버클 트리](https://vitalik.eth.limo/general/2021/06/18/verkle.html)
- [데이터 가용성 샘플링](https://github.com/ethereum/research/wiki/A-note-on-data-availability-and-erasure-coding)

## 클라이언트 개발 {#client-development}

이더리움 클라이언트는 이더리움 프로토콜의 구현체입니다. 클라이언트 개발은 프로토콜 연구의 결과를 이러한 클라이언트에 구축하여 현실로 만듭니다. 클라이언트 개발에는 특정 구현체를 구축하는 것뿐만 아니라 클라이언트 사양을 업데이트하는 것도 포함됩니다.

이더리움 노드는 두 가지 소프트웨어를 실행해야 합니다.

1. 블록체인의 헤드를 추적하고, 블록을 가십(gossip)하며, 합의 로직을 처리하는 합의 클라이언트
2. 이더리움 가상 머신을 지원하고 트랜잭션 및 스마트 컨트랙트를 실행하는 실행 클라이언트

노드 및 클라이언트에 대한 자세한 내용과 현재 모든 클라이언트 구현체 목록은 [노드 및 클라이언트 페이지](/developers/docs/nodes-and-clients/)를 참조하세요. 또한 [기록 페이지](/ethereum-forks/)에서 모든 이더리움 업그레이드 기록을 확인할 수 있습니다.

### 실행 클라이언트 {#execution-clients}

- [실행 클라이언트 사양](https://github.com/ethereum/execution-specs)
- [실행 API 사양](https://github.com/ethereum/execution-apis)

### 합의 클라이언트 {#consensus-clients}

- [합의 클라이언트 사양](https://github.com/ethereum/consensus-specs)
- [비콘 API 사양](https://ethereum.github.io/beacon-APIs/#/Beacon/getStateRoot)

## 확장성 및 성능 {#scaling-and-performance}

이더리움 확장은 이더리움 연구자들의 주요 관심 분야입니다. 현재의 접근 방식에는 트랜잭션을 롤업으로 오프로드하고 데이터 블롭을 사용하여 트랜잭션 비용을 최대한 낮추는 것이 포함됩니다. 이더리움 확장에 대한 소개 정보는 [확장성 페이지](/developers/docs/scaling)에서 확인할 수 있습니다.

### 레이어 2 (l2) {#layer-2}

현재 트랜잭션을 일괄 처리하고 이더리움 레이어 1 (l1)에서 이를 보호하는 다양한 기술을 사용하여 이더리움을 확장하는 여러 레이어 2 (l2) 프로토콜이 있습니다. 이는 연구 및 개발 잠재력이 매우 크며 빠르게 성장하고 있는 주제입니다.

#### 배경 지식 읽기 {#background-reading-2}

- [레이어 2 (l2) 소개](/layer-2/)
- [Polynya: 롤업, DA 및 모듈형 체인](https://polynya.medium.com/rollups-data-availability-layers-modular-blockchains-introductory-meta-post-5a1e7a60119d)

#### 최근 연구 {#recent-research-2}

- [아비트럼 시퀀서를 위한 공정 정렬(fair-ordering)](https://eprint.iacr.org/2021/1465)
- [Ethresear.ch 레이어 2 (l2)](https://ethresear.ch/c/layer-2/32)
- [롤업 중심 로드맵](https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698)
- [L2BEAT](https://l2beat.com/)

### 브릿지 {#bridges}

더 많은 연구와 개발이 필요한 레이어 2 (l2)의 특정 분야 중 하나는 안전하고 성능이 뛰어난 브릿지입니다. 여기에는 다양한 레이어 2 (l2) 간의 브릿지와 레이어 1 (l1) 및 레이어 2 (l2) 간의 브릿지가 포함됩니다. 브릿지는 해커의 주요 표적이 되기 때문에 이는 특히 중요한 연구 분야입니다.

#### 배경 지식 읽기 {#background-reading-3}

- [블록체인 브릿지 소개](/bridges/)
- [브릿지에 대한 비탈릭의 견해](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/)
- [블록체인 브릿지 기사](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8)
- [브릿지에 예치된 가치(TVL)](<https://dune.com/eliasimos/Bridge-Away-(from-Ethereum)>)

#### 최근 연구 {#recent-research-3}

- [브릿지 검증](https://stonecoldpat.github.io/images/validatingbridges.pdf)

### 샤딩 {#sharding}

이더리움 블록체인의 샤딩은 오랫동안 개발 로드맵의 일부였습니다. 그러나 현재는 "댕크샤딩"과 같은 새로운 확장성 솔루션이 중심을 차지하고 있습니다.

완전한 댕크샤딩의 전신인 프로토 댕크샤딩은 칸쿤-데네브("덴쿤") 네트워크 업그레이드와 함께 활성화되었습니다.

[덴쿤 업그레이드에 대해 더 알아보기](/roadmap/dencun/)

#### 배경 지식 읽기 {#background-reading-4}

- [프로토 댕크샤딩 노트](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq)
- [Bankless 댕크샤딩 비디오](https://www.youtube.com/watch?v=N5p0TB77flM)
- [이더리움 샤딩 연구 개요](https://notes.ethereum.org/@serenity/H1PGqDhpm?type=view)
- [댕크샤딩 (Polynya)](https://polynya.medium.com/danksharding-36dc0c8067fe)

#### 최근 연구 {#recent-research-4}

- [EIP-4844: 프로토 댕크샤딩](https://eips.ethereum.org/EIPS/eip-4844)
- [샤딩 및 데이터 가용성 샘플링에 대한 비탈릭의 견해](https://hackmd.io/@vbuterin/sharding_proposal)

### 하드웨어 {#hardware}

적당한 사양의 하드웨어에서 [노드를 실행](/developers/docs/nodes-and-clients/run-a-node/)하는 것은 이더리움을 탈중앙화된 상태로 유지하는 데 필수적입니다. 따라서 노드 실행을 위한 하드웨어 요구 사항을 최소화하기 위한 활발한 연구는 중요한 연구 분야입니다.

#### 배경 지식 읽기 {#background-reading-5}

- [ARM 기반 이더리움](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)

#### 최근 연구 {#recent-research-5}

- [FPGA에서의 ECDSA](https://ethresear.ch/t/does-ecdsa-on-fpga-solve-the-scaling-problem/6738)

## 보안 {#security}

보안은 스팸/스캠 방지, 지갑 보안, 하드웨어 보안, 암호경제학적 보안, 버그 헌팅, 애플리케이션 및 클라이언트 소프트웨어 테스트, 키 관리 등을 포함할 수 있는 광범위한 주제입니다. 이러한 분야의 지식에 기여하는 것은 주류 채택을 촉진하는 데 도움이 될 것입니다.

### 암호학 및 ZKP {#cryptography--zkp}

영지식 증명(ZKP)과 암호학은 이더리움과 그 애플리케이션에 프라이버시와 보안을 구축하는 데 매우 중요합니다. 영지식은 비교적 초기 단계이지만 빠르게 발전하고 있는 분야로, 많은 공개 연구 및 개발 기회가 있습니다. 몇 가지 가능성으로는 [Keccak 해싱 알고리즘](https://hackmd.io/sK7v0lr8Txi1bgION1rRpw?view#Overview)의 더 효율적인 구현 개발, 현재 존재하는 것보다 더 나은 다항식 약정(polynomial commitments) 찾기, 또는 ECDSA 공개키 생성 및 서명 검증 회로의 비용 절감 등이 있습니다.

#### 배경 지식 읽기 {#background-reading-6}

- [0xparc 블로그](https://0xparc.org/blog)
- [zkp.science](https://zkp.science/)
- [Zero Knowledge 팟캐스트](https://zeroknowledge.fm/)

#### 최근 연구 {#recent-research-6}

- [타원 곡선 암호학의 최근 발전](https://ethresear.ch/t/the-ec-fft-algorithm-without-elliptic-curve-and-isogenies/11346)
- [Ethresear.ch ZK](https://ethresear.ch/c/zk-s-nt-arks/13)

### 지갑 {#wallets}

이더리움 지갑은 브라우저 확장 프로그램, 데스크톱 및 모바일 앱, 또는 이더리움의 스마트 컨트랙트일 수 있습니다. 개별 사용자의 키 관리와 관련된 위험을 줄여주는 소셜 복구 지갑에 대한 활발한 연구가 진행되고 있습니다. 지갑 개발과 관련하여 초기 연구의 중요한 분야인 대안적인 형태의 계정 추상화에 대한 연구도 이루어지고 있습니다.

#### 배경 지식 읽기 {#background-reading-7}

- [지갑 소개](/wallets/)
- [지갑 보안 소개](/security/)
- [Ethresear.ch 보안](https://ethresear.ch/tag/security)
- [EIP-2938 계정 추상화](https://eips.ethereum.org/EIPS/eip-2938)
- [EIP-4337 계정 추상화](https://eips.ethereum.org/EIPS/eip-4337)

#### 최근 연구 {#recent-research-7}

- [검증 중심의 스마트 컨트랙트 지갑](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [계정의 미래](https://ethereum-magicians.org/t/validation-focused-smart-contract-wallets/6603)
- [EIP-3074 AUTH 및 AUTHCALL 연산 코드(Opcodes)](https://eips.ethereum.org/EIPS/eip-3074)
- [EOA 주소에 코드 게시](https://eips.ethereum.org/EIPS/eip-5003)

## 커뮤니티, 교육 및 아웃리치 {#community-education-and-outreach}

새로운 사용자를 이더리움에 온보딩하려면 새로운 교육 리소스와 아웃리치 접근 방식이 필요합니다. 여기에는 블로그 게시물 및 기사, 책, 팟캐스트, 밈, 교육 자료, 이벤트 등 커뮤니티를 구축하고, 초보자를 환영하며, 사람들에게 이더리움에 대해 교육하는 모든 것이 포함될 수 있습니다.

### UX/UI {#uxui}

더 많은 사람들을 이더리움에 온보딩하려면 생태계의 UX/UI를 개선해야 합니다. 이를 위해서는 디자이너와 제품 전문가가 지갑과 앱의 디자인을 재검토해야 합니다.

#### 배경 지식 읽기 {#background-reading-8}

- [Ethresear.ch UX/UI](https://ethresear.ch/c/ui-ux/24)

#### 최근 연구 {#recent-research-8}

- [Web3 디자인 디스코드](https://discord.gg/FsCFPMTSm9)
- [Web3 디자인 원칙](https://www.web3designprinciples.com/)
- [Ethereum Magicians UX 토론](https://ethereum-magicians.org/t/og-council-ux-follow-up/9032/3)

### 경제학 {#economics}

이더리움의 경제학 연구는 크게 두 가지 접근 방식을 따릅니다. 경제적 인센티브에 의존하는 메커니즘의 보안을 검증하는 것("미시경제학")과 프로토콜, 애플리케이션 및 사용자 간의 가치 흐름을 분석하는 것("거시경제학")입니다. 이더리움의 기본 자산(이더) 및 그 위에 구축된 토큰(예: NFT 및 ERC-20 토큰)과 관련된 복잡한 암호경제학적 요소가 존재합니다.

#### 배경 지식 읽기 {#background-reading-9}

- [강력한 인센티브 그룹(Robust Incentives Group)](https://rig.ethereum.org/)
- [데브커넥트(Devconnect)의 ETHconomics 워크숍](https://www.youtube.com/playlist?list=PLTLjFJ0OQOj5PHRvA2snoOKt2udVsyXEm)

#### 최근 연구 {#recent-research-9}

- [EIP-1559의 실증적 분석](https://arxiv.org/abs/2201.05574)
- [유통량 균형](https://ethresear.ch/t/circulating-supply-equilibrium-for-ethereum-and-minimum-viable-issuance-during-the-proof-of-stake-era/10954)
- [MEV 정량화: 숲은 얼마나 어두운가?](https://arxiv.org/abs/2101.05511)

### 블록 공간 및 수수료 시장 {#blockspace-fee-markets}

블록 공간 시장은 이더리움(레이어 1 (l1))에 직접 또는 브릿지된 네트워크(예: 롤업(레이어 2 (l2)))에 최종 사용자 트랜잭션을 포함하는 것을 관리합니다. 이더리움에서 트랜잭션은 EIP-1559로 프로토콜 내에 배포된 수수료 시장에 제출되어 스팸 및 가격 혼잡으로부터 체인을 보호합니다. 두 레이어 모두에서 트랜잭션은 최대 추출 가능 가치(MEV)로 알려진 외부 효과를 생성할 수 있으며, 이는 이러한 외부 효과를 포착하거나 관리하기 위한 새로운 시장 구조를 유도합니다.

#### 배경 지식 읽기 {#background-reading-10}

- [이더리움 블록체인을 위한 트랜잭션 수수료 메커니즘 설계: EIP-1559의 경제적 분석 (Tim Roughgarden, 2020)](https://timroughgarden.org/papers/eip1559.pdf)
- [EIP-1559 시뮬레이션 (Robust Incentives Group)](https://ethereum.github.io/abm1559)
- [제1원칙에서 본 롤업 경제학](https://barnabe.substack.com/p/understanding-rollup-economics-from?utm_source=url)
- [플래시 보이즈 2.0: 탈중앙화 거래소에서의 선행 매매(Frontrunning), 트랜잭션 재정렬 및 합의 불안정성](https://arxiv.org/abs/1904.05234)

#### 최근 연구 {#recent-research-10}

- [다차원 EIP-1559 비디오 프레젠테이션](https://youtu.be/QbR4MTgnCko)
- [크로스 도메인 MEV](https://arxiv.org/abs/2112.01472)
- [MEV 경매](https://ethresear.ch/t/mev-auction-auctioning-transaction-ordering-rights-as-a-solution-to-miner-extractable-value/6788)

### 지분 증명(PoS) 인센티브 {#proof-of-stake-incentives}

검증자는 부정직한 행동에 대한 담보로 이더리움의 기본 자산(이더)을 사용합니다. 이것의 암호경제학이 네트워크의 보안을 결정합니다. 정교한 검증자는 인센티브 레이어의 미묘한 차이를 악용하여 명시적인 공격을 시작할 수 있습니다.

#### 배경 지식 읽기 {#background-reading-11}

- [이더리움 경제학 마스터클래스 및 경제 모델](https://github.com/CADLabs/ethereum-economic-model)
- [지분 증명(PoS) 인센티브 시뮬레이션 (Robust Incentives Group)](https://ethereum.github.io/beaconrunner/)

#### 최근 연구 {#recent-research-11}

- [제안자-빌더 분리(PBS) 하에서 트랜잭션의 검열 저항성 증가](https://notes.ethereum.org/s3JToeApTx6CKLJt8AbhFQ)
- [지분 증명(PoS) 이더리움에 대한 세 가지 공격](https://arxiv.org/abs/2110.10086)

### 유동성 스테이킹 및 파생상품 {#liquid-staking-and-derivatives}

유동성 스테이킹을 통해 32 ETH 미만을 보유한 사용자도 이더를 탈중앙화 금융(DeFi)에서 사용할 수 있는 스테이킹된 이더를 나타내는 토큰으로 교환하여 스테이킹 수익을 얻을 수 있습니다. 그러나 유동성 스테이킹과 관련된 인센티브 및 시장 역학, 그리고 이것이 이더리움의 보안에 미치는 영향(예: 중앙화 위험)은 여전히 연구 중입니다.

#### 배경 지식 읽기 {#background-reading-12}

- [Ethresear.ch 유동성 스테이킹](https://ethresear.ch/search?q=liquid%20staking)
- [리도: 무신뢰 이더리움 스테이킹으로 가는 길](https://blog.lido.fi/the-road-to-trustless-ethereum-staking/)
- [Rocket Pool: 스테이킹 프로토콜 소개](https://medium.com/rocket-pool/rocket-pool-staking-protocol-part-1-8be4859e5fbd)

#### 최근 연구 {#recent-research-12}

- [리도에서의 인출 처리](https://ethresear.ch/t/handling-withdrawals-in-lidos-eth-liquid-staking-protocol/8873)
- [인출 자격 증명](https://ethresear.ch/t/withdrawal-credential-rotation-from-bls-to-eth1/8722)
- [유동성 스테이킹 파생상품의 위험성](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## 테스트 {#testing}

### 정형 검증 {#formal-verification}

정형 검증은 이더리움의 합의 사양이 정확하고 버그가 없는지 검증하기 위해 코드를 작성하는 것입니다. 유지 관리 및 개발이 필요한 Python으로 작성된 실행 가능한 버전의 사양이 있습니다. 추가 연구를 통해 사양의 Python 구현을 개선하고 정확성을 보다 강력하게 검증하고 문제를 식별할 수 있는 도구를 추가할 수 있습니다.

#### 배경 지식 읽기 {#background-reading-13}

- [정형 검증 소개](https://ptolemy.berkeley.edu/projects/embedded/research/vis/doc/VisUser/vis_user/node4.html)
- [정형 검증 (Intel)](https://www.cl.cam.ac.uk/~jrh13/papers/mark10.pdf)

#### 최근 연구 {#recent-research-13}

- [예치 컨트랙트의 정형 검증](https://github.com/runtimeverification/deposit-contract-verification)
- [비콘 체인 사양의 정형 검증](https://github.com/runtimeverification/deposit-contract-verification)

## 데이터 과학 및 분석 {#data-science-and-analytics}

이더리움의 활동과 네트워크의 상태에 대한 자세한 정보를 제공하는 더 많은 데이터 분석 도구와 대시보드가 필요합니다.

### 배경 지식 읽기 {#background-reading-14}

- [Dune Analytics](https://dune.com/browse/dashboards)
- [클라이언트 다양성 대시보드](https://clientdiversity.org/)

#### 최근 연구 {#recent-research-14}

- [강력한 인센티브 그룹(Robust Incentives Group) 데이터 분석](https://rig.ethereum.org/)

## 앱 및 도구 {#apps-and-tooling}

애플리케이션 레이어는 이더리움의 기본 레이어에서 트랜잭션을 처리하는 다양한 프로그램 생태계를 지원합니다. 개발 팀은 이더리움을 활용하여 중요한 웹2 앱의 조합 가능하고 무허가성이며 검열 저항적인 버전을 만들거나 완전히 새로운 Web3 네이티브 개념을 창출하는 새로운 방법을 끊임없이 찾고 있습니다. 동시에 이더리움에서 탈중앙화 애플리케이션(dapp)을 구축하는 복잡성을 줄여주는 새로운 도구도 개발되고 있습니다.

### 탈중앙화 금융(DeFi) {#defi}

탈중앙화 금융(DeFi)은 이더리움 위에 구축된 주요 애플리케이션 클래스 중 하나입니다. 탈중앙화 금융(DeFi)은 사용자가 스마트 컨트랙트를 사용하여 암호화폐 자산을 저장, 전송, 대출, 차입 및 투자할 수 있도록 하는 조합 가능한 "머니 레고(money legos)"를 만드는 것을 목표로 합니다. 탈중앙화 금융(DeFi)은 끊임없이 업데이트되는 빠르게 변화하는 분야입니다. 안전하고 효율적이며 접근 가능한 프로토콜에 대한 연구가 지속적으로 필요합니다.

#### 배경 지식 읽기 {#background-reading-15}

- [탈중앙화 금융(DeFi)](/defi/)
- [코인베이스: 탈중앙화 금융(DeFi)이란 무엇인가?](https://www.coinbase.com/learn/crypto-basics/what-is-defi)

#### 최근 연구 {#recent-research-15}

- [탈중앙화 금융, 중앙화된 소유권?](https://arxiv.org/pdf/2012.09306.pdf)
- [옵티미즘: 1달러 미만 트랜잭션으로 가는 길](https://medium.com/ethereum-optimism/the-road-to-sub-dollar-transactions-part-2-compression-edition-6bb2890e3e92)

### DAO {#daos}

이더리움의 영향력 있는 사용 사례 중 하나는 DAO를 사용하여 탈중앙화된 방식으로 조직을 구성하는 기능입니다. 이더리움의 DAO가 신뢰 최소화 조정 도구로서 개선된 형태의 거버넌스를 실행하기 위해 어떻게 개발되고 활용될 수 있는지에 대한 활발한 연구가 진행되고 있으며, 이는 전통적인 기업 및 조직을 넘어 사람들의 선택권을 크게 확장합니다.

#### 배경 지식 읽기 {#background-reading-16}

- [DAO 소개](/dao/)
- [DAO Collective](https://daocollective.xyz/)

#### 최근 연구 {#recent-research-16}

- [DAO 생태계 매핑](https://www.researchgate.net/publication/358694594_Mapping_out_the_DAO_Ecosystem_and_Assessing_DAO_Autonomy)

### 개발자 도구 {#developer-tools}

이더리움 개발자를 위한 도구는 빠르게 개선되고 있습니다. 이 일반적인 분야에서 수행해야 할 활발한 연구 및 개발이 많이 있습니다.

#### 배경 지식 읽기 {#background-reading-17}

- [프로그래밍 언어별 도구](/developers/docs/programming-languages/)
- [개발자 프레임워크](/developers/docs/frameworks/)
- [합의 개발자 도구 목록](https://github.com/ConsenSys/ethereum-developer-tools-list)
- [토큰 표준](/developers/docs/standards/tokens/)
- [CryptoDevHub: EVM 도구](https://cryptodevhub.io/wiki/ethereum-virtual-machine-tools)

#### 최근 연구 {#recent-research-17}

- [Eth R&D 디스코드 합의 도구 채널](https://discordapp.com/channels/595666850260713488/746343380900118528)

### 오라클 {#oracles}

오라클은 무허가성 및 탈중앙화된 방식으로 오프체인 데이터를 블록체인으로 가져옵니다. 이 데이터를 온체인으로 가져오면 탈중앙화 애플리케이션(dapp)이 실제 자산의 가격 변동, 오프체인 앱의 이벤트 또는 날씨 변화와 같은 실제 현상에 반응할 수 있습니다.

#### 배경 지식 읽기 {#background-reading-18}

- [오라클 소개](/developers/docs/oracles/)

#### 최근 연구 {#recent-research-18}

- [블록체인 오라클 조사](https://arxiv.org/pdf/2004.07140.pdf)
- [체인링크 백서](https://chain.link/whitepaper)

### 앱 보안 {#app-security}

이더리움에서의 해킹은 일반적으로 프로토콜 자체가 아닌 개별 애플리케이션의 취약점을 악용합니다. 해커와 앱 개발자는 새로운 공격과 방어를 개발하기 위한 군비 경쟁에 갇혀 있습니다. 이는 앱을 해킹으로부터 안전하게 유지하기 위해 항상 중요한 연구 및 개발이 필요함을 의미합니다.

#### 배경 지식 읽기 {#background-reading-19}

- [Wormhole 익스플로잇 보고서](https://blog.chainalysis.com/reports/wormhole-hack-february-2022/)
- [이더리움 컨트랙트 해킹 사후 분석 목록](https://forum.openzeppelin.com/t/list-of-ethereum-smart-contracts-post-mortems/1191)
- [Rekt News](https://x.com/RektHQ?s=20&t=3otjYQdM9Bqk8k3n1a1Adg)

#### 최근 연구 {#recent-research-19}

- [Ethresear.ch 애플리케이션](https://ethresear.ch/c/applications/18)

### 기술 스택 {#technology-stack}

전체 이더리움 기술 스택을 탈중앙화하는 것은 중요한 연구 분야입니다. 현재 이더리움의 탈중앙화 애플리케이션(dapp)은 중앙화된 도구나 인프라에 의존하기 때문에 일반적으로 일부 중앙화 지점을 가지고 있습니다.

#### 배경 지식 읽기 {#background-reading-20}

- [이더리움 스택](/developers/docs/ethereum-stack/)
- [코인베이스: Web3 스택 소개](https://blog.coinbase.com/a-simple-guide-to-the-web3-stack-785240e557f0)
- [스마트 컨트랙트 소개](/developers/docs/smart-contracts/)
- [탈중앙화 스토리지 소개](/developers/docs/storage/)

#### 최근 연구 {#recent-research-20}

- [스마트 컨트랙트 조합성](/developers/docs/smart-contracts/composability/)