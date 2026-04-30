---
title: 스테이킹 출금
description: 스테이킹 푸시 출금이 무엇인지, 어떻게 작동하는지, 스테이커가 보상을 받기 위해 무엇을 해야 하는지 요약한 페이지
lang: ko
template: staking
image: /images/staking/leslie-withdrawal.png
alt: 스테이킹 보상을 받은 코뿔소 레슬리
sidebarDepth: 2
summaryPoints:
  - 검증자 운영자는 출금을 활성화하기 위해 출금 주소를 제공해야 합니다.
  - 레거시 검증자는 32 ETH를 초과하는 잔액이 며칠마다 자동으로 출금됩니다.
  - 복리 검증자는 최대 2048 ETH까지 전체 잔액에 대해 보상을 얻습니다.
  - 스테이킹을 완전히 종료한 검증자는 남은 잔액을 받게 됩니다.
---

**스테이킹 출금**은 이더리움의 합의 레이어(비콘 체인)에 있는 검증자 계정에서 트랜잭션이 가능한 실행 레이어로 ETH를 전송하는 것을 의미합니다.

출금 작동 방식은 검증자의 출금 자격 증명(withdrawal credential) 유형에 따라 다릅니다:

- **레거시 검증자(Type 1)**: 32 ETH를 초과하는 잔액은 검증자와 연결된 출금 주소로 정기적으로 자동 전송됩니다. 32 ETH를 초과하는 보상은 네트워크에서 검증자의 가중치에 기여하지 않습니다.
- **복리 검증자(Type 2)**: 보상은 최대 2048 ETH까지 검증자의 유효 잔액에 복리로 적용되어 검증자의 가중치를 높이고 더 많은 보상을 얻게 합니다. 2048 ETH를 초과하는 잔액만 자동으로 스윕(sweep)됩니다.

사용자는 또한 **스테이킹을 완전히 종료**하여 전체 검증자 잔액의 잠금을 해제할 수 있습니다.

## 스테이킹 보상 {#staking-rewards}

보상 처리 방식은 검증자의 자격 증명 유형에 따라 다릅니다:

**레거시 검증자(Type 1)**의 유효 잔액은 32 ETH로 제한됩니다. 보상을 통해 얻은 32 ETH를 초과하는 잔액은 원금에 기여하거나 네트워크에서 해당 검증자의 가중치를 높이지 않으며, 며칠마다 보상금으로 자동 출금됩니다. 출금 주소를 한 번 제공하는 것 외에, 이러한 보상은 검증자 운영자의 어떠한 조치도 필요하지 않습니다. 이 모든 과정은 합의 레이어에서 시작되므로, 어떤 단계에서도 가스비(트랜잭션 수수료)가 필요하지 않습니다.

**복리 검증자(Type 2)**는 32 ETH에서 2048 ETH 사이의 유효 잔액을 가질 수 있습니다. 이 검증자들이 얻은 보상은 유효 잔액에 복리로 적용되어 검증자의 가중치와 향후 보상을 증가시킵니다. 자동 스윕은 2048 ETH를 초과하는 잔액에 대해서만 발생합니다. 2048 ETH 임계값 미만의 보상을 출금하려면, 복리 검증자는 실행 레이어에서 수동으로 부분 출금을 트리거해야 하며, 이 과정에는 가스비가 필요합니다.

### 어떻게 여기까지 왔을까요? {#how-did-we-get-here}

지난 몇 년 동안 [이더리움](/)은 과거의 에너지 집약적인 채굴 방식 대신 ETH 자체로 보호되는 네트워크로 전환하기 위해 여러 차례의 네트워크 업그레이드를 거쳤습니다. 이더리움의 합의에 참여하는 것은 이제 "스테이킹"으로 알려져 있으며, 참여자들은 네트워크에 참여할 수 있는 권한을 얻기 위해 자발적으로 ETH를 잠그고 "스테이킹(at stake)"합니다. 규칙을 따르는 사용자는 보상을 받지만, 속이려는 시도는 페널티를 받을 수 있습니다.

2020년 11월 스테이킹 예치 계약이 출시된 이후, 일부 용감한 이더리움 개척자들은 네트워크 규칙에 따라 블록을 공식적으로 증명하고 제안할 권리가 있는 특수 계정인 "검증자"를 활성화하기 위해 자발적으로 자금을 잠갔습니다.

상하이/카펠라(Shanghai/Capella) 업그레이드 이전에는 스테이킹된 ETH를 사용하거나 접근할 수 없었습니다. 하지만 이제는 선택한 계정으로 보상을 자동으로 받도록 설정할 수 있으며, 원할 때 언제든지 스테이킹된 ETH를 출금할 수도 있습니다.

### 어떻게 준비해야 하나요? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 중요 공지 {#important-notices}

출금 주소를 제공하는 것은 검증자 계정의 잔액에서 ETH를 출금할 수 있는 자격을 얻기 위한 필수 단계입니다.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**각 검증자 계정에는 단 하나의 출금 주소만 한 번 할당될 수 있습니다.** 주소를 선택하고 합의 레이어에 제출한 후에는 이를 취소하거나 다시 변경할 수 없습니다. 제출하기 전에 제공된 주소의 소유권과 정확성을 다시 한 번 확인하세요.
</AlertDescription>
</AlertContent>
</Alert>

니모닉/시드 문구가 오프라인에서 안전하게 보관되어 있고 어떤 식으로든 손상되지 않았다고 가정할 때, 이를 제공하지 않는다고 해서 **당장 자금에 위협이 되는 것은 아닙니다**. 출금 자격 증명을 추가하지 않으면 출금 주소가 제공될 때까지 ETH가 검증자 계정에 잠긴 상태로 유지될 뿐입니다.

## 복리 검증자 {#compounding-validators}

검증자는 출금 자격 증명을 Type 1에서 Type 2로 변환하여 **복리**를 선택할 수 있습니다. 이렇게 하면 최대 유효 잔액이 32 ETH에서 **2048 ETH**로 증가하여, 보상이 자동으로 스윕되는 대신 검증자의 유효 잔액에 복리로 적용될 수 있습니다.

복리가 활성화된 경우:

- 보상은 1 ETH 단위로 검증자의 유효 잔액을 증가시키며(작은 [히스테리시스 버퍼(hysteresis buffer)](https://www.attestant.io/posts/understanding-validator-effective-balance/) 적용), 시간이 지남에 따라 더 많은 보상을 얻습니다.
- 자동 스윕은 2048 ETH를 초과하는 잔액에 대해서만 발생합니다.
- 2048 ETH 임계값 미만의 부분 출금은 실행 레이어에서 수동으로 트리거해야 합니다(가스비 발생).
- 여러 검증자를 단일 복리 검증자로 **통합(consolidate)**하여 운영 오버헤드를 줄일 수 있습니다.

<Alert variant="warning">
<AlertEmoji text="⚠️"/>
<AlertContent>
<AlertDescription>
**Type 1에서 Type 2 출금 자격 증명으로의 변환은 되돌릴 수 없습니다.** 이 변환을 위한 공식 도구로 [스테이킹 런치패드(Staking Launchpad)](https://launchpad.ethereum.org/validator-actions)를 사용하세요. 변환 프로세스, 위험 및 통합에 대한 자세한 내용은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</AlertDescription>
</AlertContent>
</Alert>

## 스테이킹 완전히 종료하기 {#exiting-staking-entirely}

검증자 계정 잔액에서 자금을 이체하려면 _반드시_ 출금 주소를 제공해야 합니다.

스테이킹을 완전히 종료하고 전체 잔액을 돌려받으려는 사용자는 "자발적 종료(voluntary exit)"를 시작해야 합니다. 이는 두 가지 방법으로 수행할 수 있습니다:

- **검증자 키 사용**: 검증자 클라이언트를 사용하여 자발적 종료 메시지에 서명하고 브로드캐스트하여 합의 노드에 제출합니다. 이 과정에는 가스비가 필요하지 않습니다.
- **출금 자격 증명 사용**: 검증자 서명 키에 접근할 필요 없이 출금 주소를 사용하여 실행 레이어에서 종료를 트리거합니다. 이 과정에는 트랜잭션이 필요하며 가스비가 발생합니다.

검증자가 스테이킹을 종료하는 과정은 동시에 종료하는 다른 검증자의 수에 따라 걸리는 시간이 달라집니다. 완료되면 이 계정은 더 이상 검증자 네트워크 임무를 수행할 책임이 없고, 보상을 받을 자격이 없으며, 더 이상 ETH를 "스테이킹"하지 않습니다. 이때 계정은 완전히 "출금 가능(withdrawable)"으로 표시됩니다.

계정이 "출금 가능"으로 표시되고 출금 자격 증명이 제공되면 사용자는 기다리는 것 외에 더 이상 할 일이 없습니다. 블록 제안자는 출금 가능한 종료 자금을 찾기 위해 계정을 자동으로 지속해서 스윕하며, 다음 <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>스윕</a> 중에 계정 잔액이 전액 이체(이를 "전체 출금"이라고도 함)됩니다.

## 스테이킹 출금은 언제 활성화되었나요? {#when}

출금 기능은 원래 **2023년 4월 12일** 상하이/카펠라 업그레이드의 일부로 활성화되었습니다. 이후 [펙트라(Pectra) 업그레이드](/roadmap/pectra/)(2025년 5월)에서는 최대 유효 잔액이 2048 ETH로 더 높은 복리 검증자와 실행 레이어에서 트리거되는 종료 및 부분 출금이 도입되었습니다.

상하이/카펠라 업그레이드를 통해 이전에 스테이킹된 ETH를 일반 이더리움 계정으로 회수할 수 있게 되었습니다. 이는 스테이킹 유동성의 순환을 완성했으며, 지속 가능하고 확장 가능하며 안전한 탈중앙화 생태계를 구축하려는 이더리움의 여정을 한 걸음 더 진전시켰습니다.

- [이더리움 역사에 대해 더 알아보기](/ethereum-forks/)
- [이더리움 로드맵에 대해 더 알아보기](/roadmap/)

## 출금 지급은 어떻게 작동하나요? {#how-do-withdrawals-work}

특정 검증자가 출금 자격이 있는지 여부는 검증자 계정 자체의 상태에 따라 결정됩니다. 계정의 출금 시작 여부를 결정하기 위해 특정 시점에 사용자의 입력이 필요하지 않습니다. 전체 프로세스는 합의 레이어에 의해 지속적인 루프에서 자동으로 수행됩니다.

### 시각적인 설명이 필요하신가요? {#visual-learner}

Finematics의 이더리움 스테이킹 출금에 대한 다음 설명을 확인해 보세요:

<YouTube id="RwwU3P9n3uo" />

### 검증자 "스윕(sweeping)" {#validator-sweeping}

검증자가 다음 블록을 제안하도록 예약된 경우, 최대 16개의 적격 출금으로 구성된 출금 대기열을 구축해야 합니다. 이는 원래 검증자 인덱스 0부터 시작하여 프로토콜 규칙에 따라 이 계정에 적격 출금이 있는지 확인하고, 있는 경우 대기열에 추가하는 방식으로 수행됩니다. 다음 블록을 제안하도록 설정된 검증자는 이전 검증자가 중단한 부분부터 시작하여 무기한 순서대로 진행합니다.

<Alert variant="update">
<AlertEmoji text="🕛"/>
<AlertContent>
<AlertDescription>
아날로그 시계를 생각해 보세요. 시곗바늘은 시간을 가리키고, 한 방향으로 진행하며, 어떤 시간도 건너뛰지 않고, 마지막 숫자에 도달하면 결국 다시 처음으로 돌아갑니다.

이제 1부터 12까지 대신 시계에 0부터 N까지 있다고 상상해 보세요 _(합의 레이어에 등록된 적이 있는 검증자 계정의 총 수, 2023년 1월 기준 500,000개 이상)._

시곗바늘은 적격 출금을 확인해야 하는 다음 검증자를 가리킵니다. 0에서 시작하여 어떤 계정도 건너뛰지 않고 끝까지 진행합니다. 마지막 검증자에 도달하면 주기가 다시 처음부터 계속됩니다.
</AlertDescription>
</AlertContent>
</Alert>

#### 출금을 위한 계정 확인 {#checking-an-account-for-withdrawals}

제안자가 가능한 출금을 위해 검증자를 스윕하는 동안, 확인 중인 각 검증자는 출금을 트리거해야 하는지, 그렇다면 얼마나 많은 ETH를 출금해야 하는지 결정하기 위해 일련의 짧은 질문에 대해 평가됩니다.

1. **출금 주소가 제공되었나요?** 출금 주소가 제공되지 않은 경우 계정을 건너뛰고 출금이 시작되지 않습니다.
2. **검증자가 종료되었고 출금 가능한가요?** 검증자가 완전히 종료되었고 계정이 "출금 가능"한 것으로 간주되는 에포크에 도달한 경우 전체 출금이 처리됩니다. 이렇게 하면 남은 잔액 전체가 출금 주소로 이체됩니다.
3. **잔액이 최대 유효 잔액을 초과하나요?** 레거시(Type 1) 검증자의 경우 이 임계값은 32 ETH입니다. 복리(Type 2) 검증자의 경우 이 임계값은 2048 ETH입니다. 계정에 출금 자격 증명이 있고, 완전히 종료되지 않았으며, 임계값을 초과하는 잔액이 있는 경우 초과분만 사용자의 출금 주소로 이체하는 부분 출금이 처리됩니다.

검증자의 수명 주기 동안 검증자 운영자가 취하는 조치 중 이 흐름에 직접적인 영향을 미치는 것은 두 가지뿐입니다:

- 모든 형태의 출금을 활성화하기 위해 출금 자격 증명 제공
- 네트워크에서 종료하여 전체 출금 트리거

### 가스비 무료 {#gas-free}

자동 출금 스윕은 스테이커가 수동으로 트랜잭션을 제출할 필요가 없습니다. 즉, 자동 스윕에는 **가스비(트랜잭션 수수료)가 필요하지 않으며**, 기존 실행 레이어 블록 공간을 두고 경쟁하지 않습니다.

2048 ETH 임계값 미만의 부분 출금을 트리거하려는 [복리 검증자](#compounding-validators)는 실행 레이어에서 수동으로 수행해야 하며, 이 과정에는 가스비가 필요합니다.

### 스테이킹 보상은 얼마나 자주 받을 수 있나요? {#how-soon}

단일 블록에서 최대 16개의 출금을 처리할 수 있습니다. 이 속도라면 하루에 115,200개의 검증자 출금을 처리할 수 있습니다(누락된 슬롯이 없다고 가정). 위에서 언급했듯이 적격 출금이 없는 검증자는 건너뛰어 스윕을 완료하는 데 걸리는 시간이 줄어듭니다.

이 계산을 확장하면 주어진 수의 출금을 처리하는 데 걸리는 시간을 추정할 수 있습니다:

<TableContainer>

| 출금 수 | 완료 시간 |
| :-------------------: | :--------------: |
|        400,000        |     3.5일     |
|        500,000        |     4.3일     |
|        600,000        |     5.2일     |
|        700,000        |     6.1일     |
|        800,000        |     7.0일     |

</TableContainer>

보시다시피 네트워크에 검증자가 많아질수록 속도가 느려집니다. 누락된 슬롯이 증가하면 이에 비례하여 속도가 느려질 수 있지만, 이는 일반적으로 가능한 결과 중 느린 편에 속합니다.

## 자주 묻는 질문 {#faq}

<ExpandableCard
title="출금 주소를 제공한 후 다른 출금 주소로 변경할 수 있나요?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
아니요, 출금 자격 증명을 제공하는 과정은 일회성이며 제출 후에는 변경할 수 없습니다.
</ExpandableCard>

<ExpandableCard
title="출금 주소를 한 번만 설정할 수 있는 이유는 무엇인가요?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
실행 레이어 출금 주소를 설정하면 해당 검증자의 출금 자격 증명이 영구적으로 변경됩니다. 즉, 이전 자격 증명은 더 이상 작동하지 않으며 새 자격 증명은 실행 레이어 계정으로 연결됩니다.

출금 주소는 스마트 컨트랙트(코드에 의해 제어됨) 또는 외부 소유 계정(EOA, 개인키에 의해 제어됨)일 수 있습니다. 현재 이러한 계정은 검증자 자격 증명의 변경을 알리는 메시지를 합의 레이어로 다시 전달할 방법이 없으며, 이 기능을 추가하면 프로토콜에 불필요한 복잡성이 추가됩니다.

특정 검증자의 출금 주소를 변경하는 대안으로, 사용자는 Safe와 같이 키 순환(key rotating)을 처리할 수 있는 스마트 컨트랙트를 출금 주소로 설정할 수 있습니다. 자금을 자신의 EOA로 설정한 사용자는 전체 종료를 수행하여 스테이킹된 자금을 모두 출금한 다음 새 자격 증명을 사용하여 다시 스테이킹할 수 있습니다.
</ExpandableCard>

<ExpandableCard
title="스테이킹 토큰이나 풀링된 스테이킹에 참여하는 경우는 어떻게 되나요?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

[스테이킹 풀](/staking/pools/)의 일부이거나 스테이킹 토큰을 보유하고 있는 경우, 각 서비스마다 운영 방식이 다르므로 스테이킹 출금 처리 방식에 대한 자세한 내용은 해당 제공업체에 확인해야 합니다.

일반적으로 사용자는 기본 스테이킹된 ETH를 자유롭게 회수하거나 이용하는 스테이킹 제공업체를 변경할 수 있어야 합니다. 특정 풀이 너무 커지면 자금을 종료하고 상환한 다음 [더 작은 제공업체](https://rated.network/)에 다시 스테이킹할 수 있습니다. 또는 충분한 ETH를 모았다면 [집에서 스테이킹](/staking/solo/)할 수도 있습니다.

</ExpandableCard>

<ExpandableCard
title="보상 지급(부분 출금)은 자동으로 이루어지나요?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
**레거시(Type 1) 검증자**의 경우, 예 — 검증자가 출금 주소를 제공한 경우에 한합니다. 출금을 처음 활성화하려면 이 주소를 한 번 제공해야 하며, 이후에는 각 검증자 스윕과 함께 며칠마다 보상 지급이 자동으로 트리거됩니다.

**복리(Type 2) 검증자**의 경우, 보상은 스윕되는 대신 유효 잔액에 복리로 적용됩니다. 자동 스윕은 2048 ETH를 초과하는 잔액에 대해서만 발생합니다. 이 임계값 미만의 보상을 출금하려면 실행 레이어에서 수동으로 부분 출금을 트리거해야 합니다.
</ExpandableCard>

<ExpandableCard
title="전체 출금은 자동으로 이루어지나요?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

아니요, 검증자가 네트워크에서 여전히 활성 상태인 경우 전체 출금은 자동으로 발생하지 않습니다. 이를 위해서는 수동으로 자발적 종료를 시작해야 합니다.

검증자가 종료 프로세스를 완료하고 계정에 출금 자격 증명이 있다고 가정하면, 남은 잔액은 다음 <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "FAQ happen automatically (sweep)", eventName: "click" }}>검증자 스윕</a> 중에 출금됩니다.

</ExpandableCard>

<ExpandableCard title="원하는 금액만큼 출금할 수 있나요?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
**레거시(Type 1) 검증자**의 경우 출금이 자동으로 푸시되어 스테이킹에 적극적으로 기여하지 않는 모든 ETH가 이체됩니다. 여기에는 종료 프로세스를 완료한 계정의 전체 잔액이 포함됩니다. Type 1 검증자의 경우 특정 금액의 ETH 출금을 수동으로 요청할 수 없습니다.

**복리(Type 2) 검증자**는 남은 잔액이 32 ETH 이상으로 유지되는 한 실행 레이어에서 특정 금액의 부분 출금을 트리거할 수 있습니다. 이 과정에는 트랜잭션이 필요하며 가스비가 발생합니다.
</ExpandableCard>

<ExpandableCard
title="검증자를 운영하고 있습니다. 출금 활성화에 대한 자세한 정보는 어디서 찾을 수 있나요?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

검증자 운영자는 [스테이킹 런치패드 출금(Staking Launchpad Withdrawals)](https://launchpad.ethereum.org/withdrawals/) 페이지를 방문하는 것이 좋습니다. 이 페이지에서 출금을 위해 검증자를 준비하는 방법, 이벤트 타이밍 및 출금 기능에 대한 자세한 내용을 확인할 수 있습니다.

테스트넷에서 설정을 먼저 시도해 보려면 [후디 테스트넷 스테이킹 런치패드(Hoodi Testnet Staking Launchpad)](https://hoodi.launchpad.ethereum.org)를 방문하여 시작하세요.

</ExpandableCard>

<ExpandableCard
title="종료 후 ETH를 더 예치하여 검증자를 다시 활성화할 수 있나요?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
아니요. 검증자가 종료되고 전체 잔액이 출금된 후 해당 검증자에 예치된 추가 자금은 다음 검증자 스윕 중에 출금 주소로 자동 이체됩니다. ETH를 다시 스테이킹하려면 새 검증자를 활성화해야 합니다.
</ExpandableCard>

<ExpandableCard
title="레거시 검증자와 복리 검증자의 차이점은 무엇인가요?"
eventCategory="FAQ"
eventAction="What is the difference between legacy and compounding validators?"
eventName="read more">
레거시 검증자는 **Type 1** 출금 자격 증명을 사용하며 유효 잔액이 32 ETH로 제한됩니다. 초과분은 며칠마다 출금 주소로 자동 스윕됩니다.

복리 검증자는 **Type 2** 출금 자격 증명을 사용하며 최대 2048 ETH의 유효 잔액을 가질 수 있습니다. 보상은 유효 잔액에 복리로 적용되어 네트워크에서 검증자의 가중치와 향후 보상을 증가시킵니다. 자동 스윕은 2048 ETH를 초과하는 잔액에 대해서만 발생합니다. 이 임계값 미만으로 출금하려면 실행 레이어에서 수동 부분 출금을 트리거해야 합니다.

자세한 내용은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</ExpandableCard>

<ExpandableCard
title="복리 검증자로 어떻게 변환하나요?"
eventCategory="FAQ"
eventAction="How do I convert to a compounding validator?"
eventName="read more">
[스테이킹 런치패드](https://launchpad.ethereum.org/validator-actions)를 사용하여 Type 1에서 Type 2 출금 자격 증명으로 변환할 수 있습니다. 이 작업은 **되돌릴 수 없습니다** — 한 번 변환하면 Type 1 자격 증명으로 돌아갈 수 없습니다.

변환 후에는 여러 검증자를 하나로 **통합(consolidate)**하여 잔액을 단일 복리 검증자로 결합할 수도 있습니다. 변환 프로세스, 위험 및 통합 도구에 대한 전체 연습은 [MaxEB 심층 분석](/roadmap/pectra/maxeb/)을 참조하세요.
</ExpandableCard>

## 더 읽어보기 {#further-reading}

- [스테이킹 런치패드 출금(Staking Launchpad Withdrawals)](https://launchpad.ethereum.org/withdrawals)
- [스테이킹 런치패드 검증자 작업(Staking Launchpad Validator Actions)](https://launchpad.ethereum.org/validator-actions)
- [MaxEB 심층 분석: 복리 및 통합](/roadmap/pectra/maxeb/)
- [EIP-4895: 작업으로서의 비콘 체인 푸시 출금(Beacon chain push withdrawals as operations)](https://eips.ethereum.org/EIPS/eip-4895)
- [PEEPanEIP #94: 스테이킹된 ETH 출금(테스트) - Potuz & Hsiao-Wei Wang](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: 작업으로서의 비콘 체인 푸시 출금 - Alex Stokes](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [검증자 유효 잔액의 이해(Understanding Validator Effective Balance)](https://www.attestant.io/posts/understanding-validator-effective-balance/)