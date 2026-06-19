---
title: "머지"
description: "이더리움 메인넷이 지분 증명(PoS)을 도입한 머지에 대해 알아보세요."
lang: ko
template: upgrade
image: /images/upgrades/merge.png
alt: 
summaryPoints:
  - "이더리움 메인넷은 지분 증명(PoS)을 사용하지만, 항상 그랬던 것은 아닙니다."
  - "기존 작업증명(PoW) 메커니즘에서 지분 증명(PoS)으로의 업그레이드를 머지라고 불렀습니다."
  - "머지는 기존 이더리움 메인넷이 비콘 체인이라는 별도의 지분 증명(PoS) 블록체인과 병합되어 현재 하나의 체인으로 존재하는 것을 의미합니다."
  - "머지를 통해 이더리움의 에너지 소비량이 약 99.95% 감소했습니다."
---

<UpgradeStatus isShipped dateKey="page-upgrades:page-upgrades-beacon-date">
  머지는 2022년 9월 15일에 실행되었습니다. 이로써 이더리움의 지분 증명(PoS) 합의 전환이 완료되었으며, 작업증명(PoW)이 공식적으로 중단되고 에너지 소비량이 약 99.95% 감소했습니다.
</UpgradeStatus>

## 머지란 무엇인가요? {#what-is-the-merge}

머지는 이더리움의 기존 실행 계층([제네시스](/ethereum-forks/#frontier)부터 존재해 온 메인넷)과 새로운 지분 증명(PoS) 합의 레이어인 비콘 체인의 결합이었습니다. 이를 통해 에너지 집약적인 채굴의 필요성이 사라지고, 대신 스테이킹된 ETH를 사용하여 네트워크를 보호할 수 있게 되었습니다. 이는 더 높은 확장성, 보안 및 지속 가능성이라는 [이더리움](/)의 비전을 실현하는 데 있어 진정으로 흥미로운 단계였습니다.

<MergeInfographic />

초기에 [비콘 체인](/roadmap/beacon-chain/)은 [메인넷](/glossary/#mainnet)과 별도로 출시되었습니다. 비콘 체인이 [지분 증명(PoS)](/developers/docs/consensus-mechanisms/pos/)을 사용하여 병렬로 실행되는 동안에도, 모든 계정, 잔액, 스마트 컨트랙트 및 블록체인 상태를 포함한 이더리움 메인넷은 계속해서 [작업증명(PoW)](/developers/docs/consensus-mechanisms/pow/)에 의해 보호되었습니다. 머지는 이 두 시스템이 마침내 하나로 합쳐지고 작업증명(PoW)이 지분 증명(PoS)으로 영구적으로 대체된 시점입니다.

이더리움을 성간 여행을 떠날 준비가 완전히 끝나기 전에 발사된 우주선이라고 상상해 보세요. 커뮤니티는 비콘 체인을 통해 새로운 엔진과 단단한 선체를 만들었습니다. 상당한 테스트를 거친 후, 비행 중에 기존 엔진을 새 엔진으로 교체할 때가 되었습니다. 이를 통해 새롭고 더 효율적인 엔진이 기존 우주선에 병합되어, 우주선이 엄청난 광년을 비행하며 우주로 나아갈 수 있게 되었습니다.

## 메인넷과의 병합 {#merging-with-mainnet}

작업증명(PoW)은 제네시스부터 머지까지 이더리움 메인넷을 보호했습니다. 이를 통해 트랜잭션, 스마트 컨트랙트, 계정 등 우리에게 친숙한 모든 기능을 갖춘 이더리움 블록체인이 2015년 7월에 탄생할 수 있었습니다.

이더리움의 역사 전반에 걸쳐 개발자들은 작업증명(PoW)에서 지분 증명(PoS)으로의 궁극적인 전환을 준비했습니다. 2020년 12월 1일, 비콘 체인은 메인넷과 별개의 블록체인으로 생성되어 병렬로 실행되었습니다.

비콘 체인은 원래 메인넷 트랜잭션을 처리하지 않았습니다. 대신 활성 검증자와 그들의 계정 잔액에 동의함으로써 자체 상태에 대한 합의에 도달하고 있었습니다. 광범위한 테스트를 거친 후, 비콘 체인이 실제 데이터에 대한 합의에 도달할 때가 되었습니다. 머지 이후 비콘 체인은 실행 계층 트랜잭션 및 계정 잔액을 포함한 모든 네트워크 데이터의 합의 엔진이 되었습니다.

머지는 비콘 체인을 블록 생성 엔진으로 사용하는 공식적인 전환을 의미했습니다. 채굴은 더 이상 유효한 블록을 생성하는 수단이 아닙니다. 대신 지분 증명(PoS) 검증자가 이 역할을 맡아 모든 트랜잭션의 유효성을 처리하고 블록을 제안할 책임을 지게 되었습니다.

머지 과정에서 손실된 기록은 없습니다. 메인넷이 비콘 체인과 병합되면서 이더리움의 전체 트랜잭션 기록도 함께 병합되었습니다.

<Alert variant="update">
<AlertContent>
<AlertDescription>
지분 증명(PoS)으로의 전환은 이더 발행 방식을 변경했습니다. [머지 전후의 이더 발행](/roadmap/merge/issuance/)에 대해 자세히 알아보세요.
</AlertDescription>
</AlertContent>
</Alert>

### 사용자와 보유자 {#users-holders}

**머지는 보유자/사용자에게 아무런 변화도 주지 않았습니다.**

_다시 한번 강조합니다_: 이더리움의 ETH나 기타 디지털 자산의 사용자 또는 보유자, 그리고 노드를 운영하지 않는 스테이커는 **머지를 위해 자금이나 지갑에 아무런 조치도 취할 필요가 없습니다.** ETH는 그냥 ETH입니다. "구 ETH"/"신 ETH" 또는 "이더1"/"이더2" 같은 것은 존재하지 않으며, 지갑은 머지 이전과 똑같이 작동합니다. 다르게 말하는 사람은 사기꾼일 가능성이 높습니다.

작업증명(PoW)을 교체했음에도 불구하고, 제네시스 이후 이더리움의 전체 기록은 지분 증명(PoS)으로의 전환에 의해 변경되지 않고 그대로 유지되었습니다. 머지 이전에 지갑에 보관된 모든 자금은 머지 이후에도 여전히 접근할 수 있습니다. **업그레이드를 위해 여러분이 취해야 할 조치는 없습니다.**

[이더리움 보안에 대해 더 알아보기](/security/#eth2-token-scam)

### 노드 운영자 및 탈중앙화 애플리케이션 (dapp) 개발자 {#node-operators-dapp-developers}

<ExpandableCard
title="Staking node operators and providers"
contentPreview="If you are a staker running your own node setup or a node infrastructure provider, there are a few things you need to be aware of after The Merge."
id="staking-node-operators">

주요 조치 사항은 다음과 같습니다:

1. 합의 클라이언트와 실행 클라이언트를 _모두_ 실행하세요. 머지 이후에는 실행 데이터를 얻기 위한 서드파티 엔드포인트가 더 이상 작동하지 않습니다.
2. 실행 클라이언트와 합의 클라이언트가 안전하게 통신할 수 있도록 공유 JWT 시크릿으로 두 클라이언트를 모두 인증하세요.
3. 획득한 트랜잭션 수수료 팁/MEV를 받을 `fee recipient` 주소를 설정하세요.

위의 처음 두 항목을 완료하지 않으면 두 레이어가 동기화되고 인증될 때까지 노드가 "오프라인"으로 표시됩니다.

`fee recipient`를 설정하지 않아도 검증자는 평소처럼 작동하지만, 소각되지 않은 수수료 팁과 검증자가 제안하는 블록에서 얻을 수 있었던 MEV를 놓치게 됩니다.
</ExpandableCard>

<ExpandableCard
title="Non-validating node operators and infrastructure providers"
contentPreview="If you're operating a non-validating Ethereum node, the most significant change that came with The Merge was the requirement to run clients for BOTH the execution layer AND the consensus layer."
id="node-operators">

머지 이전까지는 실행 클라이언트(고 이더리움 (geth), 에리곤, 베수 또는 네더마인드 등)만으로도 네트워크에서 가십되는 블록을 수신하고, 적절히 검증하며, 전파하기에 충분했습니다. <em>머지 이후</em>에는 실행 페이로드에 포함된 트랜잭션의 유효성이 해당 트랜잭션이 포함된 "합의 블록"의 유효성에도 의존하게 되었습니다.

결과적으로 이제 완전한 이더리움 노드에는 실행 클라이언트와 합의 클라이언트가 모두 필요합니다. 이 두 클라이언트는 새로운 엔진 API를 사용하여 함께 작동합니다. 엔진 API는 JWT 시크릿을 사용한 인증이 필요하며, 이는 두 클라이언트에 제공되어 안전한 통신을 가능하게 합니다.

주요 조치 사항은 다음과 같습니다:

- 실행 클라이언트 외에 합의 클라이언트 설치
- 실행 클라이언트와 합의 클라이언트가 서로 안전하게 통신할 수 있도록 공유 JWT 시크릿으로 인증

위 항목을 완료하지 않으면 두 레이어가 동기화되고 인증될 때까지 노드가 "오프라인"으로 표시됩니다.

</ExpandableCard>

<ExpandableCard
title="Dapp and smart contract developers"
contentPreview="The Merge was designed to have minimal impact on smart contract and dapp developers."
id="developers">

머지와 함께 합의에 변경 사항이 생겼으며, 여기에는 다음과 관련된 변경 사항도 포함됩니다:

<ul>
  <li>블록 구조</li>
  <li>슬롯/블록 타이밍</li>
  <li>연산 코드 변경</li>
  <li>온체인 무작위성 소스</li>
  <li><em>안전한 헤드(safe head)</em> 및 <em>완결된 블록</em>의 개념</li>
</ul>

자세한 내용은 Tim Beiko의 블로그 게시물인 <a href="https://blog.ethereum.org/2021/11/29/how-the-merge-impacts-app-layer">머지가 이더리움의 애플리케이션 레이어에 미치는 영향(How The Merge Impacts Ethereum’s Application Layer)</a>을 확인하세요.

</ExpandableCard>

## 머지와 에너지 소비 {#merge-and-energy}

머지는 이더리움에서 작업증명(PoW)의 종말을 알리고 더 지속 가능하고 친환경적인 이더리움 시대의 시작을 열었습니다. 이더리움의 에너지 소비량은 약 99.95% 감소하여 이더리움은 친환경 블록체인이 되었습니다. [이더리움 에너지 소비](/energy-consumption/)에 대해 자세히 알아보세요.

## 머지와 확장성 {#merge-and-scaling}

또한 머지는 작업증명(PoW)에서는 불가능했던 추가적인 확장성 업그레이드의 발판을 마련하여, 이더리움이 [로드맵](/roadmap/)에서 목표로 하는 완전한 확장성, 보안 및 지속 가능성을 달성하는 데 한 걸음 더 다가서게 했습니다.

## 머지에 대한 오해 {#misconceptions}

<ExpandableCard
title="Misconception: &quot;Running a node requires staking 32 ETH.&quot;"
contentPreview="False. Anyone is free to sync their own self-verified copy of Ethereum (i.e., run a node). No ETH is required—not before The Merge, not after The Merge, not ever.">

이더리움 노드에는 블록을 제안할 수 있는 노드와 그렇지 않은 노드의 두 가지 유형이 있습니다.

블록을 제안하는 노드는 이더리움 전체 노드 중 소수에 불과합니다. 이 범주에는 작업증명(PoW)의 채굴 노드와 지분 증명(PoS)의 검증자 노드가 포함됩니다. 이 범주는 가끔 다음 블록을 제안하고 프로토콜 보상을 얻는 대가로 경제적 자원(작업증명(PoW)의 GPU 해시 파워 또는 지분 증명(PoS)의 스테이킹된 ETH 등)을 투입해야 합니다.

네트워크의 다른 노드(즉, 대다수)는 1\~2TB의 가용 스토리지가 있는 소비자용 컴퓨터와 인터넷 연결 외에는 어떠한 경제적 자원도 투입할 필요가 없습니다. 이러한 노드는 블록을 제안하지는 않지만, 새로운 블록을 수신하고 네트워크 합의 규칙에 따라 도착 시 유효성을 검증하여 모든 블록 제안자에게 책임을 물음으로써 네트워크를 보호하는 중요한 역할을 합니다. 블록이 유효하면 노드는 네트워크를 통해 블록을 계속 전파합니다. 어떤 이유로든 블록이 유효하지 않으면 노드 소프트웨어는 이를 무효로 간주하고 전파를 중지합니다.

블록을 생성하지 않는 노드를 실행하는 것은 두 합의 메커니즘(작업증명(PoW) 또는 지분 증명(PoS)) 모두에서 누구나 가능하며, 여건이 된다면 모든 사용자에게 <em>강력히 권장</em>됩니다. 노드를 실행하는 것은 이더리움에 엄청난 가치가 있으며, 노드를 실행하는 개인에게는 향상된 보안, 프라이버시 및 검열 저항성과 같은 추가적인 이점을 제공합니다.

누구나 자신의 노드를 실행할 수 있는 능력은 이더리움 네트워크의 탈중앙화를 유지하는 데 <em>절대적으로 필수적</em>입니다.

[자체 노드 실행에 대해 더 알아보기](/run-a-node/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge failed to reduced gas fees.&quot;"
contentPreview="False. The Merge was a change of consensus mechanism, not an expansion of network capacity, and was never intended to lower gas fees.">

가스 수수료는 네트워크 용량 대비 네트워크 수요의 산물입니다. 머지는 작업증명(PoW) 사용을 중단하고 합의를 위해 지분 증명(PoS)으로 전환했지만, 네트워크 용량이나 처리량에 직접적인 영향을 미치는 매개변수를 크게 변경하지는 않았습니다.

<a href="https://ethereum-magicians.org/t/a-rollup-centric-ethereum-roadmap/4698">롤업 중심 로드맵</a>을 통해 [레이어 2 (l2)](/layer-2/)에서 사용자 활동을 확장하는 데 노력을 집중하는 한편, 레이어 1 (l1) 메인넷을 롤업 데이터 스토리지에 최적화된 안전한 탈중앙화 정산 레이어로 활성화하여 롤업 트랜잭션을 기하급수적으로 저렴하게 만들고 있습니다. 지분 증명(PoS)으로의 전환은 이를 실현하기 위한 중요한 전제 조건입니다. [가스 및 수수료에 대해 더 알아보기.](/developers/docs/gas/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Transactions were accelerated substantially by The Merge.&quot;"
contentPreview="False. Though some slight changes exist, transaction speed is mostly the same on layer 1 now as it was before The Merge.">
트랜잭션의 "속도"는 블록에 포함되는 시간과 완결성까지의 시간을 포함하여 몇 가지 방법으로 측정할 수 있습니다. 이 두 가지 모두 약간 변경되지만 사용자가 알아차릴 정도는 아닙니다.

역사적으로 작업증명(PoW)에서는 약 13.3초마다 새 블록을 생성하는 것이 목표였습니다. 지분 증명(PoS)에서는 슬롯이 정확히 12초마다 발생하며, 각 슬롯은 검증자가 블록을 게시할 수 있는 기회입니다. 대부분의 슬롯에는 블록이 있지만 반드시 모든 슬롯에 있는 것은 아닙니다(예: 검증자가 오프라인인 경우). 지분 증명(PoS)에서는 작업증명(PoW)보다 블록이 약 10% 더 자주 생성됩니다. 이는 상당히 미미한 변화이며 사용자가 알아차릴 가능성은 낮습니다.

지분 증명(PoS)은 이전에는 존재하지 않았던 트랜잭션 완결성 개념을 도입했습니다. 작업증명(PoW)에서는 트랜잭션 위에 채굴되는 블록이 지날 때마다 블록을 되돌리는 능력이 기하급수적으로 어려워지지만, 결코 0에 도달하지는 않습니다. 지분 증명(PoS)에서는 블록이 에포크(블록을 생성할 수 있는 32번의 기회가 포함된 6.4분의 시간)로 묶이고 검증자가 이에 대해 투표합니다. 에포크가 끝나면 검증자는 해당 에포크를 '정당화된' 것으로 간주할지 여부에 대해 투표합니다. 검증자가 에포크를 정당화하는 데 동의하면 다음 에포크에서 완결된 상태가 됩니다. 완결된 트랜잭션을 취소하는 것은 총 스테이킹된 ETH의 3분의 1 이상을 확보하고 소각해야 하므로 경제적으로 불가능합니다.

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;The Merge enabled staking withdrawals.&quot;"
contentPreview="False, but staking withdrawals have since been enabled via the Shanghai/Capella upgrade.">

머지 직후 초기에 스테이커는 블록 제안의 결과로 얻은 수수료 팁과 MEV에만 접근할 수 있었습니다. 이러한 보상은 검증자가 제어하는 비스테이킹 계정(<em>수수료 수취인(fee recipient)</em>이라고 함)에 적립되며 즉시 사용할 수 있습니다. 이 보상은 검증자 의무를 수행하여 받는 프로토콜 보상과는 별개입니다.

상하이/카펠라 네트워크 업그레이드 이후, 스테이커는 이제 <em>인출 주소</em>를 지정하여 초과 스테이킹 잔액(프로토콜 보상으로 얻은 32 ETH 초과분)의 자동 지급을 받기 시작할 수 있습니다. 또한 이 업그레이드를 통해 검증자가 네트워크에서 종료할 때 전체 잔액을 잠금 해제하고 회수할 수 있는 기능이 활성화되었습니다.

[스테이킹 인출에 대해 더 알아보기](/staking/withdrawals/)

</ExpandableCard>

<ExpandableCard
title="Misconception: &quot;Now that The Merge is complete, and withdrawals are enabled, stakers could all exit at once.&quot;"
contentPreview="False. Validator exits are rate limited for security reasons.">
상하이/카펠라 업그레이드로 인출이 가능해짐에 따라, 검증자는 32 ETH를 초과하는 스테이킹 잔액을 인출할 유인이 생겼습니다. 이 자금은 수익률을 높이지 않으며 그렇지 않으면 잠겨 있기 때문입니다. APR(총 스테이킹된 ETH에 의해 결정됨)에 따라 검증자를 종료하여 전체 잔액을 회수하거나, 보상을 사용하여 더 많은 수익을 얻기 위해 잠재적으로 더 많이 스테이킹할 유인이 생길 수 있습니다.

여기서 중요한 주의 사항은 전체 검증자 종료가 프로토콜에 의해 속도 제한을 받으며, 에포크(6.4분마다)당 제한된 수의 검증자만 종료할 수 있다는 것입니다. 이 한도는 활성 검증자 수에 따라 변동하지만, 하루에 네트워크에서 종료할 수 있는 양은 총 스테이킹된 ETH의 약 0.33%에 해당합니다.

이는 스테이킹된 자금의 대규모 이탈을 방지합니다. 또한 총 스테이킹된 ETH의 상당 부분에 접근할 수 있는 잠재적 공격자가 슬래싱 가능한 위반을 저지르고, 프로토콜이 슬래싱 페널티를 집행하기 전에 동일한 에포크에서 위반한 검증자 잔액을 모두 종료/인출하는 것을 방지합니다.

APR 또한 의도적으로 동적으로 설정되어, 스테이커 시장이 네트워크 보안을 돕는 대가로 얼마를 받을 의향이 있는지 균형을 맞출 수 있도록 합니다. 이율이 너무 낮으면 검증자는 프로토콜에 의해 제한된 속도로 종료할 것입니다. 점진적으로 이는 남아 있는 모든 사람의 APR을 높여 신규 또는 복귀 스테이커를 다시 유치할 것입니다.
</ExpandableCard>

## '이더2'는 어떻게 되었나요? {#eth2}

'이더2'라는 용어는 더 이상 사용되지 않습니다. '이더1'과 '이더2'를 단일 체인으로 병합한 후에는 더 이상 두 이더리움 네트워크를 구분할 필요가 없습니다. 오직 이더리움만 존재할 뿐입니다.

혼란을 줄이기 위해 커뮤니티는 다음 용어를 업데이트했습니다:

- '이더1'은 이제 트랜잭션과 실행을 처리하는 '실행 계층'입니다.
- '이더2'는 이제 지분 증명(PoS) 합의를 처리하는 '합의 레이어'입니다.

이러한 용어 업데이트는 명명 규칙만 변경할 뿐, 이더리움의 목표나 로드맵을 변경하지는 않습니다.

['이더2' 이름 변경에 대해 더 알아보기](https://blog.ethereum.org/2022/01/24/the-great-eth2-renaming)

## 업그레이드 간의 관계 {#relationship-between-upgrades}

이더리움 업그레이드는 모두 어느 정도 상호 연관되어 있습니다. 그럼 머지가 다른 업그레이드와 어떻게 관련되어 있는지 요약해 보겠습니다.

### 머지와 비콘 체인 {#merge-and-beacon-chain}

머지는 기존 메인넷 실행 계층에 대한 새로운 합의 레이어로 비콘 체인을 공식적으로 채택했음을 의미합니다. 머지 이후 검증자는 이더리움 메인넷을 보호하도록 할당되며, [작업증명(PoW)](/developers/docs/consensus-mechanisms/pow/)에서의 채굴은 더 이상 유효한 블록 생성 수단이 아닙니다.

대신 합의에 참여할 권리를 대가로 ETH를 스테이킹한 검증 노드가 블록을 제안합니다. 이러한 업그레이드는 샤딩을 포함한 향후 확장성 업그레이드의 발판을 마련합니다.

<ButtonLink href="/roadmap/beacon-chain/">
  비콘 체인
</ButtonLink>

### 머지와 상하이 업그레이드 {#merge-and-shanghai}

성공적인 지분 증명(PoS) 전환에 대한 집중도를 단순화하고 극대화하기 위해, 머지 업그레이드에는 스테이킹된 ETH를 인출하는 기능과 같은 일부 예상된 기능이 포함되지 않았습니다. 이 기능은 상하이/카펠라 업그레이드와 함께 별도로 활성화되었습니다.

궁금하신 분들은 2021년 4월 ETHGlobal 이벤트에서 Vitalik이 발표한 [머지 이후에 일어나는 일(What Happens After The Merge)](https://youtu.be/7ggwLccuN5s?t=101)에 대해 자세히 알아보세요.

### 머지와 샤딩 {#merge-and-data-sharding}

원래 계획은 확장성 문제를 해결하기 위해 머지 이전에 샤딩 작업을 진행하는 것이었습니다. 그러나 [레이어 2 (l2) 확장 솔루션](/layer-2/)의 붐과 함께 우선순위가 작업증명(PoW)을 지분 증명(PoS)으로 먼저 교체하는 것으로 바뀌었습니다.

샤딩에 대한 계획은 빠르게 발전하고 있지만, 트랜잭션 실행을 확장하기 위한 레이어 2 (l2) 기술의 부상과 성공을 고려할 때, 샤딩 계획은 롤업 컨트랙트에서 압축된 콜 데이터를 저장하는 부담을 분산시키는 가장 최적의 방법을 찾는 것으로 전환되어 네트워크 용량의 기하급수적인 성장을 가능하게 합니다. 이는 지분 증명(PoS)으로 먼저 전환하지 않고는 불가능했을 것입니다.

<ButtonLink href="/roadmap/danksharding/">
  샤딩
</ButtonLink>

## 더 읽어보기 {#further-reading}

<MergeArticleList />

<QuizWidget quizKey="merge" />