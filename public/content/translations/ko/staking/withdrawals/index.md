---
title: "스테이킹 인출"
description: "스테이킹 푸시 인출이 무엇인지, 어떻게 작동하는지, 스테이커가 보상을 받기 위해 무엇을 해야 하는지 요약한 페이지입니다."
lang: ko
template: staking
image: /images/staking/leslie-withdrawal.png
alt: "스테이킹 보상을 받은 코뿔소 레슬리"
sidebarDepth: 2
summaryPoints:
  - 검증자 운영자는 인출을 활성화하기 위해 인출 주소를 제공해야 합니다.
  - 레거시 검증자는 며칠마다 32 ETH를 초과하는 잔고가 자동으로 인출됩니다.
  - 복리 검증자는 최대 2048 ETH까지 전체 잔고에 대해 보상을 얻습니다.
  - 스테이킹을 완전히 종료한 검증자는 남은 잔고를 받게 됩니다.
---

<strong>스테이킹 인출</strong>은 이더리움의 합의 레이어(비콘 체인)에 있는 검증자 계정에서 트랜잭션이 가능한 실행 계층으로 ETH를 전송하는 것을 의미합니다.

> [스테이킹 풀](/staking/pools/)에 참여하고 있거나 스테이킹 토큰을 보유하고 있는 경우, 각 서비스마다 운영 방식이 다르므로 스테이킹 인출 처리 방법에 대한 자세한 내용은 해당 제공업체에 확인해야 합니다.

인출 작동 방식은 검증자의 인출 자격 증명 유형에 따라 다릅니다.

- **레거시 검증자(유형 1)**: 32 ETH를 초과하는 잔고는 검증자와 연결된 인출 주소로 정기적으로 자동 전송됩니다. 32 ETH를 초과하는 보상은 네트워크에서 검증자의 가중치에 기여하지 않습니다.
- **복리 검증자(유형 2)**: 보상은 최대 2048 ETH까지 검증자의 유효 잔고에 복리로 적용되어 검증자의 가중치를 높이고 더 많은 보상을 얻게 합니다. 2048 ETH를 초과하는 잔고만 자동으로 스윕(sweep)됩니다.

사용자는 또한 <strong>스테이킹을 완전히 종료</strong>할 수 있으며, 인출 트랜잭션을 제출하고 (네트워크 수요에 따른) 인출 대기열 일정을 기다린 후 전체 검증자 잔고의 잠금을 해제할 수 있습니다.

## 스테이킹 보상 {#staking-rewards}

보상 처리 방식은 검증자의 자격 증명 유형에 따라 다릅니다.

<strong>레거시 검증자(유형 1)</strong>의 유효 잔고는 32 ETH로 제한됩니다. 네트워크 보상으로 받은 32 ETH를 초과하는 잔고는 유효 잔고에 기여하거나 네트워크에서 해당 검증자의 가중치를 높이지 않으며, 이러한 보상은 며칠마다 검증자의 전용 인출 주소로 자동 인출됩니다. 인출 주소를 한 번 제공하는 것 외에, 이러한 보상을 청구하기 위해 검증자 운영자가 취해야 할 조치는 없습니다. 이 모든 과정은 합의 레이어에서 시작되므로 어떤 단계에서도 가스(트랜잭션 수수료)가 필요하지 않습니다.

<strong>복리 검증자(유형 2)</strong>는 32 ETH에서 2048 ETH 사이의 유효 잔고를 가질 수 있습니다. 이러한 검증자가 받은 네트워크 보상은 유효 잔고에 복리로 적용되어 검증자의 가중치와 향후 보상을 받을 가능성을 높입니다. 자동 스윕은 2048 ETH를 초과하는 잔고에 대해서만 발생합니다. 2048 ETH 임계값 미만의 보상을 인출하려면 복리 검증자가 실행 계층에서 수동으로 부분 인출을 트리거해야 하며, 이 경우 가스가 필요합니다.

### 어떻게 여기까지 왔을까요? {#how-did-we-get-here}

지난 몇 년 동안 [이더리움](/)은 과거의 에너지 집약적인 채굴 대신 ETH 자체로 보호되는 네트워크로 전환하기 위해 여러 차례 네트워크 업그레이드를 거쳤습니다. 이더리움의 합의에 참여하는 것은 이제 "스테이킹"으로 알려져 있으며, 참여자들은 자발적으로 ETH를 잠그고 네트워크에 참여할 수 있는 권한을 얻기 위해 이를 "스테이크(at stake)"로 둡니다. 규칙을 따르는 사용자는 보상을 받지만, 속이려는 시도는 페널티를 받을 수 있습니다.

2020년 11월 스테이킹 예치금 컨트랙트가 출시된 이후, 일부 용감한 이더리움 개척자들은 자발적으로 자금을 잠그고 네트워크 규칙에 따라 블록을 공식적으로 증명하고 제안할 권리가 있는 특수 계정인 "검증자"를 활성화했습니다.

상하이/카펠라 업그레이드 이전에는 스테이킹된 ETH를 사용하거나 접근할 수 없었습니다. 하지만 이제는 선택한 계정으로 보상을 자동으로 받도록 설정할 수 있으며, 원할 때 언제든지 스테이킹된 ETH를 인출할 수도 있습니다.

### 어떻게 준비해야 하나요? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 중요 공지 {#important-notices}

검증자 계정은 누적된 네트워크 보상에 접근하여 인출하거나 스테이킹 종료 시 전체 인출을 처리하기 전에 인출 주소를 제공해야 합니다.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**각 검증자 계정에는 단 하나의 인출 주소만 한 번 할당될 수 있습니다.** 주소를 선택하고 합의 레이어에 제출한 후에는 이를 취소하거나 다시 변경할 수 없습니다. 제출하기 전에 제공된 주소의 소유권과 정확성을 다시 한 번 확인하세요.
</AlertDescription>
</AlertContent>
</Alert>

아직 검증자 계정에 대한 인출 주소를 제공하지 않았더라도, 니모닉/시드 구문이 오프라인에서 안전하게 유지되고 어떤 식으로든 손상되지 않았다면 **그동안 자금에 대한 위협은 없습니다**. 인출 자격 증명을 추가하지 않으면 인출 주소가 제공될 때까지 ETH가 검증자 계정에 잠겨 있을 뿐입니다.

## 복리 검증자 {#compounding-validators}

검증자는 인출 자격 증명을 유형 1에서 유형 2로 변환하여 <strong>복리</strong>를 선택할 수 있습니다. 이렇게 하면 최대 유효 잔고가 32 ETH에서 <strong>2048 ETH</strong>로 증가하여 보상이 자동으로 스윕되는 대신 검증자의 유효 잔고에 복리로 적용될 수 있습니다.

복리가 활성화된 경우:

- 보상은 1 ETH 단위로 검증자의 유효 잔고를 증가시키며(작은 [히스테리시스 버퍼(hysteresis buffer)](https://www.attestant.io/posts/understanding-validator-effective-balance/) 적용), 시간이 지남에 따라 더 많은 보상을 얻습니다.
- 자동 스윕은 2048 ETH를 초과하는 잔고에 대해서만 발생합니다.
- 2048 ETH 임계값 미만의 부분 인출은 실행 계층에서 수동으로 트리거해야 합니다(가스 비용 발생).
- 여러 검증자를 단일 복리 검증자로 <strong>통합(consolidate)</strong>하여 운영 오버헤드를 줄일 수 있습니다.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**유형 1에서 유형 2 인출 자격 증명으로의 변환은 되돌릴 수 없습니다.** 이 변환을 위한 공식 도구로 [스테이킹 론치패드](https://launchpad.ethereum.org/validator-actions)를 사용하세요. 변환 프로세스, 위험 및 통합에 대한 자세한 내용은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 스테이킹 완전히 종료하기 {#exiting-staking-entirely}

검증자 계정 잔고에서 자금을 전송하려면 _반드시_ 인출 주소를 제공해야 합니다.

스테이킹을 완전히 종료하고 전체 잔고를 다시 인출하려는 사용자는 "자발적 종료(voluntary exit)"를 시작해야 합니다. 이는 두 가지 방법으로 수행할 수 있습니다.

- **검증자 키 사용**: 검증자 클라이언트를 사용하여 자발적 종료 메시지에 서명하고 브로드캐스트하여 합의 노드에 제출합니다. 이 작업에는 가스가 필요하지 않습니다.
- **인출 자격 증명 사용**: 검증자 서명 키에 접근할 필요 없이 인출 주소를 사용하여 실행 계층에서 종료를 트리거합니다. 이 작업에는 트랜잭션이 필요하며 가스 비용이 발생합니다.

검증자가 스테이킹을 종료하는 과정은 동시에 종료하는 다른 검증자의 수에 따라 걸리는 시간이 달라집니다. 완료되면 이 계정은 더 이상 검증자 네트워크 임무를 수행할 책임이 없고, 더 이상 보상을 받을 자격이 없으며, 더 이상 ETH를 "스테이크" 상태로 두지 않습니다. 이때 계정은 완전히 "인출 가능(withdrawable)"으로 표시됩니다.

계정이 "인출 가능"으로 표시되고 인출 자격 증명이 제공되면 사용자는 기다리는 것 외에 더 이상 할 일이 없습니다. 블록 제안자는 인출 가능한 종료 자금을 찾기 위해 계정을 자동으로 지속해서 스윕하며, 다음 <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>스윕</a> 중에 계정 잔고가 전액 전송됩니다(이를 "전체 인출"이라고도 함).

## 자동 보상은 어떻게 작동하나요(유형 1 검증자)? {#how-do-withdrawals-work}

특정 검증자가 인출 자격이 있는지 여부는 검증자 계정 자체의 상태에 따라 결정됩니다. 계정의 인출을 시작해야 하는지 여부를 결정하기 위해 특정 시점에 사용자의 입력이 필요하지 않습니다. 전체 프로세스는 합의 레이어에 의해 지속적인 루프에서 자동으로 수행됩니다.

### 시각적인 설명을 선호하시나요? {#visual-learner}

Finematics의 이더리움 스테이킹 인출에 대한 다음 설명을 확인해 보세요.

<VideoWatch slug="ethereum-staking-withdrawals" />

### 검증자 "스윕(sweeping)" {#validator-sweeping}

검증자가 다음 블록을 제안하도록 예약되면 최대 16개의 적격 인출로 구성된 인출 대기열을 구축해야 합니다. 이는 원래 검증자 인덱스 0부터 시작하여 프로토콜 규칙에 따라 이 계정에 적격 인출이 있는지 확인하고, 있는 경우 대기열에 추가하는 방식으로 수행됩니다. 다음 블록을 제안하도록 설정된 검증자는 이전 검증자가 중단한 부분부터 시작하여 무기한 순서대로 진행합니다.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
아날로그 시계를 생각해 보세요. 시곗바늘은 시간을 가리키고, 한 방향으로 진행하며, 어떤 시간도 건너뛰지 않고, 마지막 숫자에 도달하면 결국 다시 처음으로 돌아갑니다.

이제 1부터 12까지 대신 시계에 0부터 N까지 있다고 상상해 보세요 _(N은 합의 레이어에 등록된 적이 있는 검증자 계정의 총 수이며, 2026년 4월 기준 120만 개 이상입니다)._

시곗바늘은 적격 인출을 확인해야 하는 다음 검증자를 가리킵니다. 0에서 시작하여 어떤 계정도 건너뛰지 않고 끝까지 진행합니다. 마지막 검증자에 도달하면 주기가 다시 처음부터 계속됩니다.
</AlertDescription>
</AlertContent>
</Alert>

#### 인출을 위한 계정 확인 {#checking-an-account-for-withdrawals}

제안자가 가능한 인출을 위해 검증자를 스윕하는 동안, 확인 중인 각 검증자는 인출을 트리거해야 하는지, 그렇다면 얼마나 많은 ETH를 인출해야 하는지 결정하기 위해 일련의 짧은 질문을 통해 평가됩니다.

1. **인출 주소가 제공되었나요?** 인출 주소가 제공되지 않은 경우 계정을 건너뛰고 인출이 시작되지 않습니다.
2. **검증자가 종료되었고 인출 가능한가요?** 검증자가 완전히 종료되었고 계정이 "인출 가능"한 것으로 간주되는 에포크에 도달한 경우 전체 인출이 처리됩니다. 이렇게 하면 남은 잔고 전체가 인출 주소로 전송됩니다.
3. **잔고가 최대 유효 잔고를 초과하나요?** 레거시(유형 1) 검증자의 경우 이 임계값은 32 ETH입니다. 복리(유형 2) 검증자의 경우 이 임계값은 2048 ETH입니다. 계정에 인출 자격 증명이 있고, 완전히 종료되지 않았으며, 유효 잔고가 최대치이고, 잔고가 이 임계값을 초과하는 경우 초과분만 사용자의 인출 주소로 전송하는 부분 인출이 처리됩니다.

검증자의 수명 주기 동안 검증자 운영자가 취하는 조치 중 이 흐름에 직접적인 영향을 미치는 것은 두 가지뿐입니다.

- 모든 형태의 인출을 활성화하기 위해 인출 자격 증명 제공
- 네트워크에서 종료하여 전체 인출 트리거

### 가스 무료 {#gas-free}

자동 인출 스윕은 스테이커가 수동으로 트랜잭션을 제출할 필요가 없습니다. 즉, 자동 스윕에는 **가스(트랜잭션 수수료)가 필요하지 않으며**, 기존 실행 계층 블록 공간을 두고 경쟁하지 않습니다.

2048 ETH 임계값 미만의 부분 인출을 트리거하려는 [복리 검증자](#compounding-validators)는 실행 계층에서 수동으로 수행해야 하며, 이 경우 가스가 필요합니다.

### 내 스테이킹 보상은 얼마나 자주 잠금 해제되어 지갑에서 사용할 수 있게 되나요? {#how-soon}

단일 블록에서 최대 16개의 인출을 처리할 수 있습니다. 이 속도라면 하루에 115,200개의 검증자 인출을 처리할 수 있습니다(놓친 슬롯이 없다고 가정할 때). 위에서 언급했듯이 적격 인출이 없는 검증자는 건너뛰게 되므로 스윕을 완료하는 데 걸리는 시간이 줄어듭니다.

이 계산을 확장하면 주어진 수의 인출을 처리하는 데 걸리는 시간을 추정할 수 있습니다.

<TableContainer>

| 인출 수 | 완료 시간 |
| :-------------------: | :--------------: |
|        400,000        |     3.5일     |
|        500,000        |     4.3일     |
|        600,000        |     5.2일     |
|        700,000        |     6.1일     |
|        800,000        |     7.0일     |

</TableContainer>

보시다시피 네트워크에 검증자가 많아질수록 속도가 느려집니다. 놓친 슬롯이 증가하면 이에 비례하여 속도가 느려질 수 있지만, 이는 일반적으로 가능한 결과 중 느린 편에 속합니다.

## 자주 묻는 질문(FAQ) {#faq}

<ExpandableCard
title="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
아니요, 인출 자격 증명을 제공하는 과정은 일회성 프로세스이며 제출 후에는 변경할 수 없습니다.
</ExpandableCard>

<ExpandableCard
title="Why can a validator's withdrawal address only be set once?"
eventCategory="FAQ"
eventAction="Why can a validator's withdrawal address only be set once?"
eventName="read more">
검증자의 실행 계층 인출 주소를 설정하는 것은 합의 레이어에 있는 검증자의 자격 증명을 영구적으로 변경하는 것입니다. 합의 레이어 자격 증명이 등록되면 이를 업데이트할 방법이 없습니다.

검증자의 인출 주소 자격 증명은 스마트 컨트랙트(코드에 의해 제어됨) 또는 외부 소유 계정(EOA, 개인 키에 의해 제어됨)을 가리키도록 설정할 수 있습니다. 현재 이러한 계정은 검증자 자격 증명의 변경을 알리는 메시지를 합의 레이어로 다시 전달할 방법이 없으며, 이 기능을 추가하면 프로토콜에 불필요한 복잡성이 추가됩니다.

유연한 인출 관리를 원하는 사용자는 키 순환이 가능한 스마트 컨트랙트 지갑([Safe](https://safe.global/) 등)을 검증자의 인출 주소로 설정하여 최종 수신자 EOA를 효과적으로 업데이트할 수 있습니다. 사용자가 이미 EOA를 인출 자격 증명으로 설정한 경우, 스테이킹된 ETH를 복구하기 위해 전체 종료를 시작한 다음 해당 자금을 사용하여 다른 자격 증명으로 새 검증자를 활성화해야 합니다.
</ExpandableCard>

<ExpandableCard
title="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventCategory="FAQ"
eventAction="How do I withdraw from staking if I stake through a provider, staking pool, or participate with liquid staking tokens?"
eventName="read more">
스테이킹 풀을 사용하거나 스테이킹 토큰을 보유하고 있는 경우, 서비스마다 프로세스가 다르므로 인출 처리 방법에 대해 제공업체에 문의하세요.

일반적으로 제공업체나 풀을 통해 스테이킹할 때, 기본 스테이킹된 ETH를 자유롭게 되찾거나 인출하여 이용 중인 스테이킹 제공업체를 변경할 수 있어야 합니다. 특정 풀이 너무 커지면 스테이킹된 ETH를 종료하고 상환한 다음 [더 작은 제공업체](https://rated.network/)에 다시 스테이킹할 수 있습니다. 또는 충분한 ETH를 모았다면 [집에서 스테이킹](/staking/solo/)할 수도 있습니다.

</ExpandableCard>

<ExpandableCard
title="Does claiming network rewards (partial withdrawals) happen automatically?"
eventCategory="FAQ"
eventAction="Does claiming network rewards (partial withdrawals) happen automatically?"
eventName="read more">
<strong>레거시(유형 1) 검증자</strong>의 경우, 검증자가 인출 주소를 제공했다면 그렇습니다. 모든 인출을 활성화하려면 이를 한 번 제공해야 하며, 이후에는 각 검증자 스윕과 함께 며칠마다 인출 주소로의 네트워크 보상 분배가 자동으로 트리거됩니다.

<strong>복리(유형 2) 검증자</strong>의 경우, 보상은 인출 주소로 스윕되는 대신 검증자의 유효 잔고(최대 2048 ETH)에 복리로 적용됩니다. 자동 스윕은 2048 ETH를 초과하는 잔고에 대해서만 발생합니다. 이 임계값 미만의 보상을 인출하려면 실행 계층에서 수동으로 부분 인출을 트리거해야 합니다.
</ExpandableCard>

<ExpandableCard title="Can I withdraw a custom amount?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
<strong>레거시(유형 1) 검증자</strong>의 경우, 검증자의 32 ETH 유효 잔고를 초과하여 누적된 모든 ETH 네트워크 보상은 인출 주소로 자동 푸시됩니다. 전체 인출 트랜잭션을 제출하고 스테이킹 종료 프로세스를 완료한 유형 1 검증자는 전체 ETH 잔고가 인출 주소로 인출됩니다. 유형 1 검증자가 수동으로 특정 금액의 ETH 인출을 요청하는 것은 불가능합니다.

<strong>복리(유형 2) 검증자</strong>는 검증자의 남은 잔고가 32 ETH 이상으로 유지되는 한 실행 계층에서 특정 금액의 부분 인출을 트리거할 수 있습니다. 이를 위해서는 부분 인출 트랜잭션을 제출해야 하며 가스 비용이 발생합니다.
</ExpandableCard>

<ExpandableCard
title="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information about managing the withdrawal process?"
eventName="read more">

검증자 운영자는 [스테이킹 론치패드 인출](https://launchpad.ethereum.org/withdrawals/) 페이지를 방문하는 것이 좋습니다. 이 페이지에서 인출을 위해 검증자를 준비하는 방법, 이벤트 타이밍 및 인출 기능에 대한 자세한 내용을 확인할 수 있습니다.

테스트넷에서 설정을 먼저 시도해 보려면 [Hoodi 테스트넷 스테이킹 론치패드](https://hoodi.launchpad.ethereum.org)를 방문하여 시작하세요.

</ExpandableCard>

<ExpandableCard
title="Can I re-activate my validator after exiting by depositing more ETH?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
아니요. 검증자가 종료되고 전체 잔고가 인출된 후 해당 검증자에 예치된 추가 ETH는 다음 검증자 스윕 중에 인출 주소로 자동 전송됩니다. 해당 ETH를 사용하여 스테이킹을 다시 시작하려면 새 검증자를 활성화해야 합니다.
</ExpandableCard>

<ExpandableCard
title="What is the difference between legacy and compounding validators?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
레거시 검증자는 **유형 1** 인출 자격 증명(인출 자격 증명 주소가 0x01로 시작)을 사용하며 유효 잔고가 32 ETH로 제한됩니다. 네트워크 보상으로 받은 초과 ETH는 며칠마다 인출 주소로 자동 스윕됩니다.

복리 검증자는 **유형 2** 인출 자격 증명(인출 자격 증명 주소가 0x02로 시작)을 사용하며 최대 2048 ETH의 유효 잔고를 가질 수 있습니다. 보상은 검증자의 유효 잔고에 복리로 적용되어 네트워크에서 검증자의 가중치와 향후 보상을 받을 가능성을 높입니다. 자동 스윕은 2048 ETH를 초과하는 잔고에 대해서만 발생합니다. 이 임계값 미만의 ETH를 인출하려면 실행 계층에서 수동 부분 인출을 트리거해야 합니다.

자세한 내용은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</ExpandableCard>

<ExpandableCard
title="How do I convert to a compounding validator?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
[스테이킹 론치패드](https://launchpad.ethereum.org/validator-actions)를 사용하여 유형 1에서 유형 2 인출 자격 증명으로 변환할 수 있습니다. 이 작업은 **되돌릴 수 없습니다** — 한 번 변환하면 유형 1 자격 증명으로 돌아갈 수 없습니다.

변환 후에는 여러 검증자를 하나로 <strong>통합(consolidate)</strong>하여 잔고를 단일 복리 검증자로 결합할 수도 있습니다. 변환 프로세스, 위험 및 통합 도구에 대한 전체 연습은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</ExpandableCard>

<ExpandableCard
title="When were staking withdrawals enabled?"
eventCategory="FAQ"
eventAction="When were staking withdrawals enabled?"
eventName="read more">
인출 기능은 원래 **2023년 4월 12일** 상하이/카펠라 업그레이드의 일부로 활성화되었습니다. 이후 [펙트라 업그레이드](/roadmap/pectra/)(2025년 5월)에서는 최대 유효 잔고가 2048 ETH로 더 높은 복리 검증자와 실행 계층에서 트리거되는 종료 및 부분 인출이 도입되었습니다.

상하이/카펠라 업그레이드를 통해 이전에 스테이킹된 ETH를 일반 이더리움 계정으로 되찾을 수 있게 되었습니다. 이로써 스테이킹 유동성의 순환 고리가 완성되었으며, 이더리움은 지속 가능하고 확장 가능하며 안전한 탈중앙화된 생태계를 구축하기 위한 여정에서 한 걸음 더 나아갔습니다.

- [이더리움 역사에 대해 더 알아보기](/ethereum-forks/)
- [이더리움 로드맵에 대해 더 알아보기](/roadmap/)
</ExpandableCard>

## 더 읽어보기 {#further-reading}

- [스테이킹 론치패드 인출](https://launchpad.ethereum.org/withdrawals)
- [스테이킹 론치패드 검증자 작업](https://launchpad.ethereum.org/validator-actions)
- [MaxEB 심층 분석: 복리 및 통합](/roadmap/pectra/maxeb/)
- [EIP-4895: 작업으로서의 비콘 체인 푸시 인출](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: Potuz 및 Hsiao-Wei Wang과 함께하는 스테이킹된 ETH 인출(테스트)](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: Alex Stokes와 함께하는 작업으로서의 비콘 체인 푸시 인출](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [검증자 유효 잔고 이해하기](https://www.attestant.io/posts/understanding-validator-effective-balance/)