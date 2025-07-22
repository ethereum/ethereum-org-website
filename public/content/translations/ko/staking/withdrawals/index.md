---
title: 스테이킹 인출
description: 스테이킹 푸시 인출이 무엇인지, 어떻게 작동하는지 및 스테이커가 보상을 받기 위해 해야 할 일을 요약한 페이지
lang: ko
template: staking
image: /images/staking/leslie-withdrawal.png
alt: Staking 보상을 들고 있는 코뿔소 Leslie
sidebarDepth: 2
summaryPoints:
  - 상하이/카펠라 업그레이드는 이더리움에서 스테이킹 인출을 가능하게 함
  - 검증인 운영자는 출금 주소를 제공하여 활성화해야 함
  - 보상은 며칠마다 자동으로 분배
  - 스테이킹을 완전히 종료한 검증자는 남은 잔액을 수령
---

<UpgradeStatus dateKey="page-staking-withdrawals-when">
스테이킹 출금은 2023년 4월 12일에 적용된 상하이/카펠라 업그레이드로 활성화되었습니다. &nbsp; <a href="#when" customEventOptions={{ eventCategory: "Anchor link", eventAction: "When's it shipping?", eventName: "click" }}>상하이/카펠라에 대한 추가 정보</a>
</UpgradeStatus>

**스테이킹 인출**은 이더리움 합의 계층(비콘 체인)의 검증자 계정에서 거래가 가능한 실행 계층으로 ETH를 전송하는 것을 말합니다.

**초과 잔액** 32 ETH 이상의 보상 지급은 각 검증자에 연결된 출금 주소로 자동으로 정기적으로 이체됩니다(사용자가 제공한 경우). 사용자는 또한 **완전히 스테이킹에서 탈퇴**하여 전체 검증자 잔액을 수령할 수도 있습니다.

## 스테이킹 보상 {#staking-rewards}

보상 지불은 최대 유효 잔액이 32 ETH인 활동 중인 검증자 계정에 대해 자동으로 처리됩니다.

보상을 통해 얻은 32 ETH 이상의 잔액은 실제로 원금에 기여하지 않으며, 네트워크에서 이 검증자의 가중치 또한 증가하지 않으므로 며칠마다 자동으로 보상 지급으로 인출됩니다. 이러한 보상에는 한 번 출금 주소를 제공하는 것 외에 검증 운영자가 취해야 할 다른 작업은 없습니다. 이 작업은 모두 합의 계층에서 시작되므로 어떤 단계에서도 가스(거래 수수료)가 필요하지 않습니다.

### 당사의 여정 {#how-did-we-get-here}

지난 몇 년 동안 이더리움은 예전의 에너지 집약적인 채굴 대신 ETH 자체가 보호하는 네트워크로 전환하는 다양한 네트워크 업그레이드를 거쳤습니다. 이제 이더리움에서 합의에 참여하는 것을 "스테이킹"이라고 합니다. 이는 참가자들이 자발적으로 ETH를 잠그고 네트워크에 참여할 수 있는 능력을 "성패가 걸린 작업(스테이킹)"이라고 부르는 데서 유래했습니다. 규칙을 따르는 사용자는 보상을 받는 한편, 속이려는 시도는 불이익을 받을 수 있습니다.

2020년 11월 스테이킹 예금 계약을 론칭한 이후, 일부 용감한 이더리움 개척자는 네트워크 규칙에 따라 블록을 공식적으로 증명하고 제안할 권리가 있는 특별 계정인 "검증자"를 활성화하기 위해 자발적으로 자금을 묶었습니다.

상하이/카펠라 업그레이드 전에는 스테이킹 ETH를 사용하거나 접근할 수 없었습니다. 그러나 이제 선택한 계정으로 자동으로 보상을 받도록 선택할 수 있으며, 원할 때마다 스테이킹 ETH를 인출할 수도 있습니다.

### 어떻게 준비해야 하나요? {#how-do-i-prepare}

<WithdrawalsTabComparison />

### 중요 공지 {#important-notices}

잔액에서 ETH를 인출할 수 있으려면 검증자 계정에 대한 출금 주소를 제공해야 합니다.

<InfoBanner emoji="⚠️" isWarning>
  <strong>각 검증자 계정은 단 한 번, 한 개의 출금 주소만 할당받을 수 있습니다.</strong> 주소를 선택하고 합의 계층에 제출하면 취소하거나 다시 변경할 수 없습니다. 제출하기 전에 제공된 주소의 소유권과 정확성을 다시 확인하십시오.
</InfoBanner>

니모닉/시드 문구가 오프라인에서 안전하게 유지되고 어떤 식으로든 손상되지 않았다고 가정할 때 이 정보를 제공하지 않아도 <strong>그동안 자금에 대한 위협은 없습니다</strong>. 단, 출금 자격 증명을 추가하지 않으면 출금 주소가 제공될 때까지 검증자 계정에 ETH가 묶여 있게 됩니다.

## 스테이킹 완전히 종료 {#exiting-staking-entirely}

_모든_ 자금을 검증자 계정 잔액에서 이체하려면 출금 주소를 제공해야 합니다.

스테이킹을 완전히 종료하고 전체 잔액을 회수하려는 사용자는 스테이킹 종료 과정을 시작하는 검증자 키로 "자발적 종료" 메시지에 서명하고 브로드캐스팅해야 합니다. 이 작업은 검증자 클라이언트를 통해 완료되며, 가스를 쓰지 않고 합의 노드에 제출됩니다.

검증자가 스테이킹을 종료하는 프로세스에는 동시에 종료하는 다른 사용자의 수에 따라 다양한 시간이 소요됩니다. 완료된 후에 이 계정은 더 이상 검증자 네트워크 의무를 수행할 책임이 없고, 더 이상 보상을 받을 자격이 없으며, 더 이상 ETH를 "스테이킹"하지 않습니다. 이때 해당 계좌는 전체 "인출 가능"으로 표시됩니다.

계정이 "인출 가능"으로 표시되고 출금 자격 증명이 제공된 후에 사용자는 기다리는 것 외에 추가로 실행할 작업이 없습니다. 적합한 종료 자금에 대해 블록 제안자는 계정을 자동으로 꾸준히 정리하며, 계정 잔액은 다음 <a href="#validator-sweeping" customEventOptions={{ eventCategory: "Anchor link", eventAction: "Exiting staking entirely (sweep)", eventName: "click" }}>정리</a> 중에 전액 이체("전체 출금"이라고도 함)됩니다.

## 스테이킹 인출은 언제 가능한가요? {#when}

스테이킹 출금은 실시간으로 진행됩니다! 인출 기능은 2023년 4월 12일에 적용된 상하이/카펠라 업그레이드의 일환으로 활성화되었습니다.

상하이/카펠라 업그레이드는 이전에 스테이킹된 ETH를 일반 이더리움 계정으로 회수할 수 있게 했습니다. 이 작업을 통해 스테이킹 유동성을 마무리했으며, 이더리움은 지속 가능하고 확장 가능하며 탈중앙화 생태계를 구축하는 여정에 한 걸음 더 가까워졌습니다.

- [이더리움 역사에 대해 자세히 알아보기](/history/)
- [이더리움 로드맵에 대해 자세히 알아보기](/roadmap/)

## 인출 지급은 어떻게 작동하나요? {#how-do-withdrawals-work}

특정 검증자에게 인출 자격이 있는지 여부는 검증자 계정 자체의 상태에 따라 결정됩니다. 사용자가 계정에서 인출을 시작해야 하는지 여부를 결정하기 위해 취해야 하는 특별한 작업은 없습니다. 전체 프로세스는 합의 계층에서 자동으로 수행됩니다.

### 시각적으로 알아보고 싶습니까? {#visual-learner}

Finematics 제공 이더리움 스테이킹 출금에 대한 다음 설명을 확인하십시오.

<YouTube id="RwwU3P9n3uo" />

### 검증자 "정리" {#validator-sweeping}

검증자가 다음 블록을 제안할 예정이면 최대 16개의 적합한 출금으로 구성된 출금 대기열을 구축해야 합니다. 이 작업은 원래 검증자 인덱스 0부터 시작하여 프로토콜 규칙에 따라 이 계정에 대한 적합한 출금이 있는지 확인한 후 대기열에 추가합니다. 다음 블록을 제안하도록 설정된 검증자는 마지막 블록이 중단된 부분부터 무기한 순서대로 진행합니다.

<InfoBanner emoji="🕛">
이는 아날로그 시계와 유사합니다. 시계의 시침은 시간을 가리키고, 한 방향으로 진행하며, 어떤 시간도 거르지 않고, 마지막 시간에 도달하면 다시 처음으로 돌아갑니다.<br/><br/>
이제 1에서 12까지가 아니라 시계가 0에서 N 까지라고 상상해 보세요<em>(합의 계층에 등록된 검증자 계정의 총합. 2023년 1월 기준 500,000개 이상).</em><br/><br/>
시계에 있는 시침이 다음 검증자를 가리키고 다음 검증자가 적합한 인출 여부를 확인합니다. 이는 0에서 시작하며, 어떤 계정도 건너뛰지 않고 계속 진행됩니다. 마지막 검증자에 도달하면 주기는 처음부터 다시 계속됩니다.
</InfoBanner>

#### 출금 계좌 확인하기 {#checking-an-account-for-withdrawals}

제안자가 가능한 인출에 대한 검증자를 정리하는 동안, 확인된 각 검증자는 출금을 시작해야 하는지, 그렇다면 얼마나 많은 ETH를 회수해야 하는지를 결정하기 위해 짧은 일련의 질문으로 평가됩니다.

1. **출금 주소를 제공했나요? **출금 주소가 제공되지 않으면 계정은 건너뛰고 인출이 시작되지 않습니다.
2. **검증자에서 탈퇴하고 출금할 수 있습니까?** 검증자가 완전히 종료되었고, 관련 계좌가 "인출 가능"으로 간주되면 전액 출금이 처리됩니다. 이 작업은 전체 잔액을 출금 주소로 이체합니다.
3. **유효 잔액이 최대 32인가요?** 계정에 출금 자격 증명이 있고, 완전히 종료되지 않았으며, 32 이상의 보상이 있는 경우, 32ETH 이상의 보상만 사용자의 출금 주소로 전송되는 부분 인출이 처리됩니다.

검증자의 수명 주기 동안 검증 운영자가 이 흐름에 직접 영향을 미치는 작업에는 두 가지가 있습니다.

- 모든 형태의 인출을 가능하게 할 출금 자격 증명 제공
- 네트워크에서 탈퇴하여 전액 인출을 시작

### 가스 무료 {#gas-free}

스테이킹 출금에 대한 이러한 접근 방식은 스테이커가 특정 양의 ETH를 회수하도록 요청하는 거래를 수동으로 제출하게 요구하는 작업을 건너뜁니다. 즉, **가스(거래 수수료)가 필요하지 않으며**, 인출은 기존 실행 계층 블록 공간과 경쟁하지 않습니다.

### 얼마나 자주 스테이킹 보상을 받을 수 있나요? {#how-soon}

한 블록에서 최대 16개의 출금을 처리할 수 있습니다. 이러한 속도로 하루에 115,200개의 검증자 인출을 처리할 수 있습니다(슬롯을 건너뛰지 않는다는 가정하에). 앞서 언급한 대로 적합한 출금이 없는 검증자는 건너뛰기 때문에 정리를 완료하는 시간은 줄어들 수 있습니다.

이 계산을 적용해 보면 특정 인출을 처리하는 데 걸리는 시간을 다음과 같이 추정해 볼 수 있습니다.

<TableContainer>

| 인출 수 | 완료 시간 |

| :-------------------: | :--------------: |

| 400,000 | 3.5일 |

| 500,000 | 4.3일 |

| 600,000 | 5.2일 |

| 700,000 | 6.1일 |

| 800,000 | 7.0일 |

</TableContainer>

이와 같이 네트워크에 검증자가 많을수록 속도는 느려집니다. 누락된 슬롯의 증가는 이에 비례하여 속도를 늦출 수 있지만, 일반적으로 이는 느린 측면의 결과를 나타냅니다.

## 자주 묻는 질문 {#faq}

<ExpandableCard
title="출금 주소를 한 번 제공하면 대체 출금 주소로 변경할 수 있나요?"
eventCategory="FAQ"
eventAction="Once I have provided a withdrawal address, can I change it to an alternative withdrawal address?"
eventName="read more">
아니요. 출금 자격 증명을 제공하는 과정은 일회성이며, 한 번 제출하면 변경할 수 없습니다.
</ExpandableCard>

<ExpandableCard
title="출금 주소를 한 번만 설정할 수 있는 이유는 무엇인가요?"
eventCategory="FAQ"
eventAction="Why can a withdrawal address only be set once?"
eventName="read more">
실행 계층 출금 주소를 설정함으로써 해당 검증자의 출금 자격 증명은 영구 변경됩니다. 즉, 이전의 자격 증명은 더 이상 작동하지 않으며, 새로운 자격 증명이 실행 계층 계정으로 직접 전달됩니다.

출금 주소는 스마트 계약(코드로 제어됨) 또는 외부 소유 계정(EOA, 개인 키로 제어됨)일 수 있습니다. 현재 이러한 계정은 검증자 자격 증명의 변경을 알리는 메시지를 합의 계층에 다시 전달할 방법이 없으며, 이 기능을 추가하면 프로토콜에 불필요한 복잡함이 추가됩니다.

특정 검증자의 출금 주소를 변경하는 대안으로, 사용자는 안전(Safe)과 같은 키 회전을 처리할 수 있는 출금 주소로 스마트 계약을 설정하도록 선택할 수 있습니다. 자신의 EOA로 자금을 설정한 사용자는 스테이킹된 모든 자금을 인출하기 위해 전체 탈퇴를 수행한 후 새로운 자격 증명을 사용하여 다시 스테이킹할 수 있습니다.
</ExpandableCard>

<ExpandableCard
title="토큰 스테이킹 또는 풀 스테이킹에 참여하면 어떻게 되나요?"
eventCategory="FAQ"
eventAction="What if I participate in staking tokens or pooled staking"
eventName="read more">

<a href="/staking/pools/">스테이킹 풀</a>에 속해 있거나 스테이킹 토큰을 갖고 있는 경우, 스테이킹 출금 처리 방법에 대한 자세한 사항은 제공업체에 문의해야 합니다. 각 서비스마다 운영 방식은 다를 수 있습니다.

일반적으로 사용자는 기본 스테이킹 ETH를 자유롭게 회수하거나, 사용하는 스테이킹 제공 업체를 변경할 수 있습니다. 특정 풀이 너무 커지면 자금은 인출 또는 상환되거나 <a href="https://rated.network/">소규모 공급 업체</a>로 다시 스테이킹할 수 있습니다. 또는 ETH가 충분한 경우 <a href="/staking/solo/">홈에서 스테이킹</a>할 수도 있습니다.

</ExpandableCard>

<ExpandableCard
title="보상 지급(부분 인출) 은 자동으로 발생하나요?"
eventCategory="FAQ"
eventAction="Do reward payments (partial withdrawals) happen automatically?"
eventName="read more">
맞습니다. 검증자에게 출금 주소를 제공했으면 가능합니다. 이는 처음으로 출금을 활성화하려면 반드시 제공되어야 하며, 각 검증자 정리 과정을 통해 보상 지급은 며칠마다 자동으로 실행됩니다.
</ExpandableCard>

<ExpandableCard
title="전액 인출은 자동으로 발생하나요?"
eventCategory="FAQ"
eventAction="Do full withdrawals happen automatically?"
eventName="read more">

아니요, 검증자가 아직도 네트워크에서 활동하고 있는 경우 전액 인출은 자동으로 발생하지 않습니다. 이러한 경우 수동으로 자발적인 종료를 시작해야 합니다.

검증자가 종료 프로세스를 완료하고 계정에 출금 자격 증명이 있다고 <em>가정하면</em> <a href="#validator-sweeping">검증자 정리</a> 중에 남은 잔액이 출금됩니다.

</ExpandableCard>

<ExpandableCard title="특정 금액을 인출할 수 있나요?"
eventCategory="FAQ"
eventAction="Can I withdraw a custom amount?"
eventName="read more">
인출은 자동으로 송금되도록 설계되어 스테이킹에 적극적으로 기여하지 않는 ETH를 전송합니다. 여기에는 종료 과정을 완료한 계정의 전체 잔액이 포함됩니다.

특정 양의 ETH를 수동으로 인출하도록 요청하는 것은 불가능합니다.
</ExpandableCard>

<ExpandableCard
title="검증자입니다. 인출 활성화에 대한 더 많은 정보는 어디에서 찾을 수 있나요?"
eventCategory="FAQ"
eventAction="I operate a validator. Where can I find more information on enabling withdrawals?"
eventName="read more">

검증자는 <a href="https://launchpad.ethereum.org/withdrawals/">스테이킹 런치패드 인출</a> 페이지에서 출금을 준비하는 방법, 실행 타이밍 및 인출 기능에 대한 자세한 내용을 확인할 것을 권장합니다.

먼저 테스트넷에서 설정을 사용해 보고 싶으면 <a href="https://holesky.launchpad.ethereum.org">Holesky 테스트넷 스테이킹 런치패드</a>를 방문하여 시작하십시오.

</ExpandableCard>

<ExpandableCard
title="종료한 후 ETH를 더 입금하여 나의 검증자를 다시 활성화할 수 있나요?"
eventCategory="FAQ"
eventAction="Can I re-activate my validator after exiting by depositing more ETH?"
eventName="read more">
아니요. 검증자가 종료되고 전체 잔액이 인출되면, 해당 검증자에게 입금된 추가 자금은 다음 검증자 정리 작업 중에 자동으로 출금 주소로 인출됩니다. ETH를 다시 스테이크하려면 새로운 검증자를 활성화해야 합니다.
</ExpandableCard>

## 부록 {#further-reading}

- [스테이킹 런치패드 출금](https://launchpad.ethereum.org/withdrawals)
- [EIP-4895: 작업으로 비콘 체인 푸시 출금](https://eips.ethereum.org/EIPS/eip-4895)
- [이더리움 고양이 양치기 - 상하이](https://www.ethereumcatherders.com/shanghai_upgrade/index.html)
- [PEEPanEIP #94: 포투즈 및 시아오 웨이 왕과 스테이킹한 ETH 출금(테스트)](https://www.youtube.com/watch?v=G8UstwmGtyE)
- [PEEPanEIP#68: EIP-4895: 알렉스 스톡스와 함께 작업으로 비콘 체인 푸시 출금](https://www.youtube.com/watch?v=CcL9RJBljUs)
- [검증자의 유효한 잔액 이해](https://www.attestant.io/posts/understanding-validator-effective-balance/)
