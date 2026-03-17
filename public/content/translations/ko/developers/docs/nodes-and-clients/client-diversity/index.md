---
title: "클라이언트의 다양성"
description: "이더리움 클라이언트 다양성의 중요성에 대한 고급 설명"
lang: ko
sidebarDepth: 2
---

이더리움 노드의 동작은 클라이언트 소프트웨어가 제어한다. 프로덕션 레벨의 이더리움 클라이언트는 다수 존재하는데 제각각 서로 다른 팀과 언어로 유지되고 있다. 클라이언트는 서로간의 원활한 통신을 보장하며 똑같은 기능과 UX를 가지는 공통 스펙이다. 하지만 노드 간 클라이언트 배포 시에는 해당 네트워크가 최대한으로 강해지게 할 만큼 충분하지는 않다. 이상적인 상황은 유저들이 서로다른 클라이언트들 사이로 엇비슷하게 나뉘어져서 네트워크에 클라이언트 다양성을 최대한으로 이끌어내는 것이다.

## 필수 구성 요소 {#prerequisites}

노드와 클라이언트가 무엇인지 아직 이해하지 못했다면 [노드와 클라이언트](/developers/docs/nodes-and-clients/)를 확인해 보세요. [실행](/glossary/#execution-layer) 레이어와 [합의](/glossary/#consensus-layer) 레이어는 용어집에 정의되어 있습니다.

## 왜 클라이언트는 여러 개 있는가? {#why-multiple-clients}

복수의 독립적으로 개발되고 유지되는 클라이언트는 클라이언트 다양성이 네트워크를 해킹과 버그에 더 내성이 강하기 때문에 존재한다. 복수의 클라이언트는 이더리움에 국한된 장점이다.  - 다른 블록체인은 단일 클라이언트에 의존한다. 하지만 단순히 여러 클라이언트를 사용할 수 있는 것만으로는 충분하지 않으며, 커뮤니티에서 이를 채택하고 총 활성 노드가 여러 클라이언트에 걸쳐 비교적 고르게 분산되어야 합니다.

## 클라이언트 다양성이 왜 중요한가요? {#client-diversity-importance}

독립적으로 개발되고 유지되는 다수의 클라이언트는 탈중앙화 네트워크의 상태를 좌지우지 한다. 왜 그런지 알아본다.

### 버그 {#bugs}

이더리움 노드의 작은 부분만을 차지하는 개별 클라이언트 내 버그는 전체 네트워크에 미치는 영향이 보다 덜 위협적이다. 다수의 클라이언트에 균등하게 분배된 노드라면 대부분의 클라이언트들이 공통 이슈를 겪게 될 확률이 적다. 따라서 보다 더 안정적인 네트워크가 된다.

### 공격에 대한 복원력 {#resilience}

클라이언트 다양성은 해킹 방어에도 도움이 된다. 예를 들어, [특정 클라이언트를 속여](https://twitter.com/vdWijden/status/1437712249926393858) 특정 체인 분기로 유도하는 공격은 성공할 가능성이 낮습니다. 다른 클라이언트는 동일한 방식으로 악용될 가능성이 낮고 정식 체인은 손상되지 않은 상태로 유지되기 때문입니다. 클라이언드 다양성이 크지 않으면 몇몇 클라이언트가 해킹되면 다른 클라이언트들도 취약해진다.  클라이언트 다양성은 네트워크에 대한 악의적인 공격에 대한 중요한 방어 수단임이 이미 입증되었습니다. 예를 들어, 2016년 상하이 서비스 거부 공격은 공격자가 지배적인 클라이언트(Geth)를 속여 블록당 수만 번의 느린 디스크 I/O 작업을 실행하도록 할 수 있었기 때문에 가능했습니다. 반면 이더리움은 클라이언트들이 해당 해킹에 취약점을 보이지 않았기 때문에 피해를 받지 않았으며 Geth 취약점이 보완될 때까지 문제없이 작동하였다.

### 지분증명 완결성 {#finality}

이더리움 노드의 33% 이상을 차지하는 합의 클라이언트의 버그는 합의 레이어의 완결을 막을 수 있습니다. 이는 사용자가 어느 시점에서 트랜잭션이 되돌려지거나 변경되지 않을 것이라고 신뢰할 수 없음을 의미합니다. 이것은 이더리움 위에 구축된 많은 앱, 특히 DeFi에 매우 문제가 될 것이다.

<Emoji text="🚨" className="me-4" /> 설상가상으로, 3분의 2의 다수를 차지하는 클라이언트의 심각한 버그는 체인이 <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">잘못 분할되고 완결되는</a> 원인이 될 수 있으며, 이는 많은 검증자들이 유효하지 않은 체인에 갇히게 되는 결과로 이어질 수 있습니다. 만약 그들이 올바른 체인에 다시 가입하기를 원한다면, 이러한 검증자들은 쫒겨나거나 느리고 비용이 많이 드는 자발적인 탈퇴와 재활성화에 직면하게 된다. 슬래싱의 크기는 최대로 대폭 삭감(32 ETH)된 2/3 다수의 과실이 있는 노드의 수에 따라 확장된다.

비록 발생 확률이 적은 시나리오이지만, 이더리움 에코 시스템은 활성 노드들 간 클라이언트 분산을 더 반반하게 함으로서 위험성을 줄일 수 있다. 이상적으로는 컨센서스 클라이언트가 전체 노드의 33% 이상의 지분을 갖지 않는 것이 좋다.

### 공동 책임 {#responsibility}

다수의 클라이언트를 소유하는 것은 인건비가 들지 않기도 하다. 그러나 소규모 개발팀에는 과중된 업무와 책임이 될 수 있다. 클라이언트 다양성이 작을수록 개발자들은 다수 클라이언트를 유지하기 위한 책임이 더 커진다는 의미이다. 이러한 책임을 여러 팀들에 분담하는 것이 이더리움 네트워크 노드와 이용자들에게 더 좋은 일이다.

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

이 다이어그램은 오래된 정보일 수 있습니다. 최신 정보는 [ethernodes.org](https://ethernodes.org) 및 [clientdiversity.org](https://clientdiversity.org)를 참조하세요.

위의 두 파이 차트는 실행 및 합의 레이어에 대한 현재 클라이언트 다양성의 스냅샷을 보여줍니다(2025년 10월 작성 시점 기준). 수년에 걸쳐 클라이언트 다양성이 개선되었으며, 실행 레이어에서는 [Geth](https://geth.ethereum.org/)의 지배력이 감소했습니다. [Nethermind](https://www.nethermind.io/nethermind-client)가 근소한 차이로 2위를, [Besu](https://besu.hyperledger.org/)가 3위, [Erigon](https://github.com/ledgerwatch/erigon)이 4위를 차지했으며, 다른 클라이언트들은 네트워크의 3% 미만을 구성합니다. 합의 레이어에서 가장 일반적으로 사용되는 클라이언트인 [Lighthouse](https://lighthouse.sigmaprime.io/)는 두 번째로 많이 사용되는 클라이언트와 점유율이 비슷합니다. [Prysm](https://prysmaticlabs.com/#projects)과 [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/)가 각각 약 31%와 14%를 차지하며, 다른 클라이언트는 거의 사용되지 않습니다.

실행 레이어 데이터는 2025년 10월 26일 [supermajority.info](https://supermajority.info/)에서 가져왔습니다. 합의 클라이언트 데이터는 [Michael Sproul](https://github.com/sigp/blockprint)에게서 얻었습니다. 합의 클라이언트 데이터는 합의 레이어 클라이언트가 항상 식별에 사용할 수 있는 명확한 흔적을 가지고 있는 것은 아니기 때문에 얻기가 더 어렵습니다. 데이터는 분류 알고리즘을 사용하여 생성되었으며, 이 알고리즘은 때때로 일부 소수 클라이언트를 혼동하기도 합니다(자세한 내용은 [여기](https://twitter.com/sproulM_/status/1440512518242197516) 참조). 위 다이어그램에서 이러한 모호한 분류는 '또는' 형식의 레이블(예: Nimbus/Teku)로 처리됩니다. 그럼에도 불구하고, 대다수의 네트워크가 Prysm을 운영하고 있는 것은 분명하다. 스냅샷에 불과하지만 다이어그램의 값은 클라이언트 다양성의 현재 상태에 대한 일반적인 느낌을 제공합니다.

합의 레이어에 대한 최신 클라이언트 다양성 데이터는 이제 [clientdiversity.org](https://clientdiversity.org/)에서 확인할 수 있습니다.

## 실행 레이어 {#execution-layer}

지금까지, 클라이언트 다양성에 대한 대화는 주로 합의 계층에 초점을 맞추었다. 그러나 실행 클라이언트인 [Geth](https://geth.ethereum.org)는 현재 모든 노드의 약 85%를 차지합니다. 이 비율은 컨센서스 클라이언트과 같은 이유로 문제가 있습니다. 예를 들어, Geth의 버그가 트랜잭션 처리에 영향을 미치거나 실행 페이로드를 구성하면 합의된 클라이언트가 문제가 있거나 버그가 있는 트랜잭션을 finalizing할 수 있습니다. 따라서 이더리움은 네트워크의 33% 이상을 대표하는 클라이언트가 없는 것이 이상적이며 실행 클라이언트가 더 고르게 분포되어 있어 더 건강할 것이다.

## 소수 클라이언트 사용하기 {#use-minority-client}

클라이언트 다양성 문제를 해결하려면 개인 사용자가 소수 클라이언트를 선택하는 것 이상이 필요합니다. 주요 탈중앙화앱 및 거래소와 같은 검증자 풀 및 기관도 클라이언트를 전환해야 합니다. 그러나 모든 사용자는 현재의 불균형을 시정하고 사용 가능한 모든 이더리움 소프트웨어의 사용을 정상화하는 데 자신의 역할을 할 수 있다. The Merge 이후 모든 노드 운영자는 실행 클라이언트와 합의 클라이언트를 실행해야 합니다. 아래에서 제안된 클라이언트 조합을 선택하면 클라이언트의 다양성을 높이는 데 도움이 됩니다.

### 실행 클라이언트 {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### 합의 클라이언트 {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

기술 사용자는 소수 클라이언트를 위한 더 많은 튜토리얼과 문서를 작성하고 노드 운영 피어가 지배적인 클라이언트로부터 벗어나도록 권장함으로써 이 프로세스를 가속화할 수 있습니다. 소수 합의 클라이언트로 전환하기 위한 가이드는 [clientdiversity.org](https://clientdiversity.org/)에서 확인할 수 있습니다.

## 클라이언트 다양성 대시보드 {#client-diversity-dashboards}

여러 대시보드는 실행 및 합의 계층에 대한 실시간 클라이언트 다양성 통계를 제공합니다.

**합의 계층:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**실행 계층:**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## 더 읽어보기 {#further-reading}

- [이더리움 합의 레이어의 클라이언트 다양성](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [이더리움 병합: 다수 클라이언트 실행의 위험성!](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 2022년 3월 24일_
- [클라이언트 다양성의 중요성](https://our.status.im/the-importance-of-client-diversity/)
- [이더리움 노드 서비스 목록](https://ethereumnodes.com/)
- ["Five Whys"의 클라이언트 다양성 문제](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [이더리움 다양성 및 해결 방법 (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## 관련 주제 {#related-topics}

- [이더리움 노드 운영하기](/run-a-node/)
- [노드 및 클라이언트](/developers/docs/nodes-and-clients/)
