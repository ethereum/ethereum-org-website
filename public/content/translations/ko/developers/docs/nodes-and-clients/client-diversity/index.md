---
title: "클라이언트 다양성"
description: "이더리움 클라이언트 다양성의 중요성에 대한 개괄적인 설명입니다."
lang: ko
sidebarDepth: 2
---

[이더리움](/) 노드의 동작은 실행 중인 클라이언트 소프트웨어에 의해 제어됩니다. 여러 프로덕션 수준의 이더리움 클라이언트가 있으며, 각각 서로 다른 팀에서 다양한 언어로 개발 및 유지 관리합니다. 클라이언트는 서로 원활하게 통신하고 동일한 기능을 가지며 동등한 사용자 경험을 제공하도록 공통 사양에 따라 구축됩니다. 하지만 현재 노드 간 클라이언트 분포는 이러한 네트워크 강화의 잠재력을 최대한 실현할 만큼 균등하지 않습니다. 이상적으로는 사용자가 다양한 클라이언트에 거의 균등하게 나뉘어 네트워크에 최대한의 클라이언트 다양성을 가져오는 것입니다.

## 전제 조건 {#prerequisites}

노드와 클라이언트가 무엇인지 아직 이해하지 못했다면 [노드와 클라이언트](/developers/docs/nodes-and-clients/)를 확인해 보세요. [실행 계층](/glossary/#execution-layer)과 [합의 레이어](/glossary/#consensus-layer)는 용어집에 정의되어 있습니다.

## 왜 여러 클라이언트가 있나요? {#why-multiple-clients}

클라이언트 다양성이 네트워크를 공격과 버그에 더 탄력적으로 만들기 때문에 독립적으로 개발되고 유지 관리되는 여러 클라이언트가 존재합니다. 다중 클라이언트는 이더리움만의 고유한 강점입니다. 다른 블록체인은 단일 클라이언트의 무결성에 의존합니다. 하지만 단순히 여러 클라이언트를 사용할 수 있는 것만으로는 충분하지 않으며, 커뮤니티에서 이를 채택하고 전체 활성 노드가 비교적 균등하게 분산되어야 합니다.

## 클라이언트 다양성이 왜 중요한가요? {#client-diversity-importance}

독립적으로 개발되고 유지 관리되는 여러 클라이언트를 보유하는 것은 탈중앙화된 네트워크의 건전성을 위해 필수적입니다. 그 이유를 살펴보겠습니다.

### 버그 {#bugs}

개별 클라이언트의 버그는 이더리움 노드의 소수를 차지할 때 네트워크에 미치는 위험이 적습니다. 여러 클라이언트에 노드가 거의 균등하게 분산되어 있으면 대부분의 클라이언트가 공통된 문제를 겪을 가능성이 작아지며, 결과적으로 네트워크는 더 강력해집니다.

### 공격에 대한 복원력 {#resilience}

클라이언트 다양성은 공격에 대한 복원력도 제공합니다. 예를 들어, [특정 클라이언트를 속여](https://twitter.com/vdWijden/status/1437712249926393858) 체인의 특정 브랜치로 유도하는 공격은 다른 클라이언트가 동일한 방식으로 악용될 가능성이 낮고 표준 체인이 손상되지 않은 상태로 유지되기 때문에 성공할 가능성이 낮습니다. 클라이언트 다양성이 낮으면 지배적인 클라이언트에 대한 해킹과 관련된 위험이 커집니다. 클라이언트 다양성은 이미 네트워크에 대한 악의적인 공격을 방어하는 중요한 수단임이 입증되었습니다. 예를 들어, 2016년 상하이 서비스 거부 공격은 공격자가 지배적인 클라이언트인 고 이더리움 (geth)을 속여 블록당 수만 번의 느린 디스크 I/O 작업을 실행하도록 만들 수 있었기 때문에 가능했습니다. 해당 취약점을 공유하지 않는 대체 클라이언트도 온라인 상태였기 때문에, 이더리움은 공격에 저항하고 고 이더리움 (geth)의 취약점이 수정되는 동안 계속 작동할 수 있었습니다.

### 지분 증명 (PoS) 완결성 {#finality}

이더리움 노드의 33% 이상을 차지하는 합의 클라이언트에 버그가 발생하면 합의 레이어가 완결성을 달성하지 못할 수 있으며, 이는 사용자가 어느 시점에서 트랜잭션이 되돌려지거나 변경되지 않을 것이라고 신뢰할 수 없음을 의미합니다. 이는 이더리움 위에 구축된 많은 앱, 특히 탈중앙화 금융 (DeFi)에 매우 큰 문제가 될 것입니다.

<Emoji text="🚨" className="me-4" /> 더 나쁜 것은, 3분의 2 이상의 절대다수를 차지하는 클라이언트에 치명적인 버그가 발생하면 체인이 <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">잘못 분할되고 완결성을 달성</a>하여 대규모 검증자 세트가 유효하지 않은 체인에 갇히게 될 수 있다는 점입니다. 올바른 체인에 다시 합류하려면 이러한 검증자는 슬래싱을 당하거나 느리고 비용이 많이 드는 자발적 인출 및 재활성화를 거쳐야 합니다. 슬래싱의 규모는 책임이 있는 노드의 수에 비례하며, 3분의 2 이상의 절대다수가 최대치(32 ETH)로 슬래싱됩니다.

이러한 시나리오가 발생할 가능성은 낮지만, 이더리움 생태계는 활성 노드 전체에 클라이언트 분포를 균등하게 함으로써 그 위험을 완화할 수 있습니다. 이상적으로는 어떤 합의 클라이언트도 전체 노드의 33% 점유율에 도달하지 않아야 합니다.

### 책임 분담 {#responsibility}

다수 클라이언트를 보유하는 데에는 인적 비용도 따릅니다. 소규모 개발 팀에 과도한 부담과 책임을 지웁니다. 클라이언트 다양성이 낮을수록 다수 클라이언트를 유지 관리하는 개발자의 책임 부담이 커집니다. 여러 팀에 이 책임을 분산시키는 것은 이더리움의 노드 네트워크와 인적 네트워크 모두의 건전성에 좋습니다.

## 현재 클라이언트 다양성 {#current-client-diversity}

### 실행 클라이언트 {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### 합의 클라이언트 {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "기타", value: 0.07 }
]}
/>

이 다이어그램은 최신 정보가 아닐 수 있습니다. 최신 정보는 [ethernodes.org](https://ethernodes.org) 및 [clientdiversity.org](https://clientdiversity.org)에서 확인하세요.

위의 두 원형 차트는 실행 계층과 합의 레이어의 현재 클라이언트 다양성 스냅샷을 보여줍니다(2025년 10월 작성 기준). 클라이언트 다양성은 수년에 걸쳐 개선되었으며, 실행 계층에서는 [고 이더리움 (geth)](https://geth.ethereum.org/)의 지배력이 감소했습니다. [네더마인드](https://www.nethermind.io/nethermind-client)가 근소한 차이로 2위, [베수](https://besu.hyperledger.org/)가 3위, [에리곤](https://github.com/ledgerwatch/erigon)이 4위를 차지했으며, 기타 클라이언트는 네트워크의 3% 미만을 구성합니다. 합의 레이어에서 가장 많이 사용되는 클라이언트인 [라이트하우스](https://lighthouse.sigmaprime.io/)는 두 번째로 많이 사용되는 클라이언트와 꽤 근접해 있습니다. [프리즘](https://prysmaticlabs.com/#projects)과 [테쿠](https://consensys.net/knowledge-base/ethereum-2/teku/)는 각각 약 31%와 약 14%를 차지하며, 다른 클라이언트는 거의 사용되지 않습니다.

실행 계층 데이터는 2025년 10월 26일에 [supermajority.info](https://supermajority.info/)에서 가져왔습니다. 합의 클라이언트 데이터는 [Michael Sproul](https://github.com/sigp/blockprint)에서 가져왔습니다. 합의 레이어 클라이언트는 항상 식별하는 데 사용할 수 있는 명확한 흔적을 남기지 않기 때문에 합의 클라이언트 데이터를 얻는 것은 더 어렵습니다. 이 데이터는 때때로 일부 소수 클라이언트를 혼동하는 분류 알고리즘을 사용하여 생성되었습니다(자세한 내용은 [여기](https://twitter.com/sproulM_/status/1440512518242197516) 참조). 위 다이어그램에서 이러한 모호한 분류는 양자택일 레이블(예: 님버스/테쿠)로 처리됩니다. 그럼에도 불구하고 네트워크의 대다수가 프리즘을 실행하고 있다는 것은 분명합니다. 스냅샷에 불과하지만 다이어그램의 값은 현재 클라이언트 다양성 상태에 대한 좋은 전반적인 감각을 제공합니다.

합의 레이어에 대한 최신 클라이언트 다양성 데이터는 이제 [clientdiversity.org](https://clientdiversity.org/)에서 확인할 수 있습니다.

## 실행 계층 {#execution-layer}

지금까지 클라이언트 다양성에 대한 논의는 주로 합의 레이어에 집중되었습니다. 하지만 실행 클라이언트인 [고 이더리움 (geth)](https://geth.ethereum.org)가 현재 전체 노드의 약 85%를 차지하고 있습니다. 이 비율은 합의 클라이언트와 동일한 이유로 문제가 됩니다. 예를 들어, 트랜잭션 처리나 실행 페이로드 구성에 영향을 미치는 고 이더리움 (geth)의 버그는 합의 클라이언트가 문제가 있거나 버그가 있는 트랜잭션에 완결성을 부여하는 결과를 초래할 수 있습니다. 따라서 이더리움은 실행 클라이언트가 더 균등하게 분산될 때 더 건전해질 것이며, 이상적으로는 어떤 클라이언트도 네트워크의 33% 이상을 차지하지 않아야 합니다.

## 소수 클라이언트 사용 {#use-minority-client}

클라이언트 다양성 문제를 해결하려면 개별 사용자가 소수 클라이언트를 선택하는 것 이상이 필요합니다. 검증자 풀과 주요 탈중앙화 애플리케이션 (dapp) 및 거래소와 같은 기관도 클라이언트를 전환해야 합니다. 하지만 모든 사용자는 현재의 불균형을 바로잡고 사용 가능한 모든 이더리움 소프트웨어의 사용을 정상화하는 데 각자의 역할을 다할 수 있습니다. 머지 이후 모든 노드 운영자는 실행 클라이언트와 합의 클라이언트를 실행해야 합니다. 아래 제안된 클라이언트 조합을 선택하면 클라이언트 다양성을 높이는 데 도움이 됩니다.

### 실행 클라이언트 {#execution-clients}

- [베수](https://www.hyperledger.org/use/besu)
- [네더마인드](https://downloads.nethermind.io/)
- [에리곤](https://github.com/ledgerwatch/erigon)
- [고 이더리움 (geth)](https://geth.ethereum.org/)
- [레스](https://reth.rs/)

### 합의 클라이언트 {#consensus-clients}

- [님버스](https://nimbus.team/)
- [라이트하우스](https://github.com/sigp/lighthouse)
- [테쿠](https://consensys.io/teku)
- [로드스타](https://github.com/ChainSafe/lodestar)
- [프리즘](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

기술 사용자는 소수 클라이언트를 위한 더 많은 튜토리얼과 문서를 작성하고 노드를 운영하는 동료들이 지배적인 클라이언트에서 마이그레이션하도록 장려함으로써 이 과정을 가속화하는 데 도움을 줄 수 있습니다. 소수 합의 클라이언트로 전환하기 위한 가이드는 [clientdiversity.org](https://clientdiversity.org/)에서 확인할 수 있습니다.

## 클라이언트 다양성 대시보드 {#client-diversity-dashboards}

여러 대시보드에서 실행 계층 및 합의 레이어에 대한 실시간 클라이언트 다양성 통계를 제공합니다.

**합의 레이어:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**실행 계층:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 더 읽을거리 {#further-reading}

- [이더리움 합의 레이어의 클라이언트 다양성](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [이더리움 머지: 다수 클라이언트 실행의 위험성!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 2022년 3월 24일_
- [클라이언트 다양성의 중요성](https://our.status.im/the-importance-of-client-diversity/)
- [이더리움 노드 서비스 목록](https://ethereumnodes.com/)
- [클라이언트 다양성 문제의 "5가지 이유(Five Whys)"](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [이더리움 다양성과 해결 방법 (유튜브)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 관련 주제 {#related-topics}

- [이더리움 노드 실행하기](/run-a-node/)
- [노드와 클라이언트](/developers/docs/nodes-and-clients/)
