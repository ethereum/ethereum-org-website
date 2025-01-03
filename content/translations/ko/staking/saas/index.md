---
title: 서비스로서의 스테이킹
description: 풀링된 ETH 스테이킹을 시작하는 방법에 대한 개요
lang: ko
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: 구름 위에 떠 있는 코뿔소 레슬리
sidebarDepth: 2
summaryPoints:
  - 제3자 노드 운영자가 검증자 클라이언트의 운영을 처리함
  - 32 ETH를 보유하고 있으며 노드를 실행하는 데 필요한 복잡한 기술에 친숙하지 않은 사용자에게 탁월한 옵션
  - 신뢰를 줄이고 출금 키에 대한 보관 유지
---

## 서비스로서 스테이킹이란? {#what-is-staking-as-a-service}

서비스로서 스테이킹(SaaS)은 귀하가 검증자를 위해 32 ETH를 예치하지만 노드 운영은 제3자 운영자에게 지정하는 스테이킹 서비스의 카테고리를 나타냅니다. 일반적으로 이 과정에는 키 생성 및 예치, 운영 업체에 서명 키 업로드와 같은 초기 설정에 대한 안내가 포함됩니다. 이를 통해 서비스가 귀하를 대신하여 검증자를 실행할 수 있으며, 일반적으로 매월 수수료가 부과됩니다.

## 스테이킹을 서비스로 제공하는 이유 {#why-stake-with-a-service}

이더리움 프로토콜 자체는 스테이크의 위임을 지원하지 않기 때문에 이러한 수요를 충족시키기 위해 스테이킹 서비스가 구축되었습니다. 스테이킹할 32 ETH가 있지만 하드웨어를 다루는 데 능숙하지 않은 경우, SaaS 서비스를 통해 어려운 부분은 맡기고 기존의 블록 보상은 계속해서 받을 수 있습니다.

<CardGrid>
  <Card title="내 검증자" emoji=":desktop_computer:" description="Deposit your own 32 ETH to activate your own set of signing keys that will participate in Ethereum consensus. Monitor your progress with dashboards to watch those ETH rewards accumulate." />
  <Card title="쉽게 시작하기" emoji="🏁" description="Forget about hardware specs, setup, node maintenance and upgrades. SaaS providers let you outsource the hard part by uploading your own signing credentials, allowing them to run a validator on your behalf, for a small cost." />
  <Card title="리스크 줄이기" emoji=":shield:" description="In many cases users do not have to give up access to the keys that enable withdrawing or transferring staked funds. These are different from the signing keys, and can be stored separately to limit (but not eliminate) your risk as a staker." />
</CardGrid>

<StakingComparison page="saas" />

## 고려 사항 {#what-to-consider}

사용자가 편리하게 ETH를 스테이킹할 수 있게 도와주는 SaaS 업체의 수는 점점 증가하고 있지만 저마다 장점과 위험이 있습니다. 모든 SaaS 옵션은 홈 스테이킹과 비교했을 때 신뢰 가정이 추가로 필요합니다. SasS 옵션 중에는 공개 또는 감사되지 않는 이더리움 클라이언트를 래핑하는 부가적인 코드가 있을 수 있습니다. 또한 SaaS에는 네트워크 탈중앙화에 부정적인 효과도 있습니다. 설정에 따라 검증자를 제어하지 못할 수도 있습니다. 즉, 운영자는 ETH를 사용하여 옳지 않게 작업할 수도 있습니다.

아래의 속성 지표는 현재 목록에 있는 SaaS 제공 업체의 대표적인 강점 및 약점을 나타내기 위해 사용되었습니다. 스테이킹 여정을 도와 줄 서비스를 선택할 때 이 섹션을 참고하여 이러한 속성이 정의되는 방법을 알아보세요.

<StakingConsiderations page="saas" />

## 스테이킹 서비스 제공 업체 찾기 {#saas-providers}

사용 가능한 몇 가지 SaaS 제공업체는 다음과 같습니다. 상단의 지표를 사용하면 해당 서비스를 둘러보는 데 도움이 됩니다.

<ProductDisclaimer />

### SaaS 제공업체

<StakingProductsCardGrid category="saas" />

참고로, [클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity/)에 대한 지원은 네트워크의 보안을 강화하고 위험성을 최소화할 수 있으므로 매우 중요합니다. 다수 클라이언트의 사용을 제한하는 서비스는 <em style={{ textTransform: "uppercase" }}>"실행 클라이언트 다양성"</em> 및 <em style={{ textTransform: "uppercase" }}>"합의 클라이언트 다양성"</em>으로 표시됩니다.

### 키 생성기

<StakingProductsCardGrid category="keyGen" />

저희가 놓친 서비스형 스테이킹 제공 업체를 제안하고 싶습니까? 이더리움 [제품 나열 정책](/contributing/adding-staking-products/)을 확인하고 정책에 맞는 제품인 경우 검토를 위해 제출해 주세요.

## 자주 묻는 질문 {#faq}

<ExpandableCard title="내 키는 누가 보유하나요?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
진행 방식은 업체별로 다를 수 있지만 일반적으로 필요한 서명 키(32 ETH 당 1개)를 설정하고 본인을 대신하여 검증자를 실행할 수 있게 제공 업체에 키를 업로드하도록 안내받게 됩니다. 서명 키만으로는 자금을 인출하거나 이체 또는 소비할 수 없습니다. 다만, 업체는 합의를 위한 투표에 참여할 수 있게 되며, 이는 적절하게 이루어지지 않는 경우에 오프라인에서 벌금 및 슬래싱을 받게 될 수 있습니다.
</ExpandableCard>

<ExpandableCard title="그래서 2개의 키가 있다는 것인가요?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
네. 각 계정은 BLS <em>서명</em> 키와 BLS <em>출금</em> 키를 모두 포함하여 구성됩니다. 검증자가 체인의 상태를 증명하고, 그룹 동기화, 블록 제안 등을 용이하게 하기 위해서는 검증자 클라이언트가 서명 키에 쉽게 접근할 수 있어야 합니다. 이는 어떠한 형태로든 반드시 인터넷에 연결되어 있어야 하므로, 본질적으로 "핫(hot)"키로 고려됩니다. 이는 검증자가 증명되기 위해 필요한 구성 요소이며, 보안을 위해 자금 인출이나 이체를 위해 사용되는 키와 분리되어 있습니다.

BLS 출금 키는 스테이킹 보상 및 자금 회수를 실행할 실행 레이어 계정을 알리는 일회성 메시지 서명에 사용됩니다. 이 메시지가 브로드캐스팅되면 <em>BLS 출금</em> 키는 더 이상 필요하지 않습니다. 단, 출금된 자금의 통제권은 사용자가 제공한 주소로 영구 위임됩니다. 이를 통해 본인 소유의 콜드 스토리지로 출금 주소를 설정할 수 있으며, 다른 사용자가 검증자 서명 키를 탈취하더라도 검증자 자금에 대한 리스크를 최소화할 수 있습니다.

출금을 활성화하려면 출금 자격 증명을 업데이트해야 합니다\*. 이 프로세스에는 니모닉 시드 문구를 사용하여 출금 키를 생성하는 과정이 포함됩니다.

<strong>이 시드 문구를 안전하게 백업해 두세요. 그렇지 않으면 필요할 때 출금 키를 생성할 수 없게 됩니다.</strong>

\* 첫 예치 시 출금 주소를 제공한 스테이커는 이 항목을 따로 설정하지 않아도 됩니다. 검증자 준비 방법과 관련한 지원은 SaaS 제공업체에 문의하십시오.
</ExpandableCard>

<ExpandableCard title="인출은 언제 할 수 있나요?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
스테이킹 출금은 2023년 4월 상하이/카펠라 업그레이드를 통해 구현되었습니다. 스테이커는 출금 주소를 제공해야 하며(초기 예치 시 제공하지 않은 경우) 보상 지급은 며칠마다 주기적으로 자동 분배됩니다.

검증자는 검증자 활동을 완전히 중단할 수도 있습니다. 이 경우 ETH 잔액의 락업이 해제되어 출금할 수 있습니다. 출금 주소를 제공하고 탈퇴 절차를 완료한 계정은 다음 검증자 정리 과정 중에 제공된 출금 주소로 잔액 전액을 수령합니다.

<ButtonLink href="/staking/withdrawals/">스테이킹 출금에 대한 자세한 내용</ButtonLink>
</ExpandableCard>

<ExpandableCard title="슬래싱을 당하면 어떻게 되나요?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
SaaS 공급 업체를 사용하면 노드의 운영을 타인에게 맡기게 됩니다. 이는 노드 성능이 양호하지 않을 수도 있는 리스크를 동반하며, 귀하가 제어할 수 없습니다. 검증자가 제거되는 경우, 검증자의 잔액에 불이익이 적용되고 강제적으로 검증자 풀에서 제외됩니다.

슬래싱/탈퇴 절차가 완료되면 해당 자금은 검증자에게 할당된 출금 주소로 이체됩니다. 이때 활성화를 위해 출금 주소를 제공해야 합니다. 출금 주소는 최초 예치 시 제공했을 수도 있습니다. 그렇지 않으면 출금 주소를 표시하는 메시지에 서명하기 위해 검증자 출금 키가 필요합니다. 제공된 출금 주소가 없으면 주소가 제공될 때까지 자금의 락업 상태가 유지됩니다.

각 SaaS 제공 업체에 연락하여 보증이나 보험 옵션에 대한 자세한 내용과 출금 주소 제공 방법에 대해 안내를 받을 수 있습니다. 검증자 설정을 완전히 제어하고자 하는 경우, <a href="/staking/solo/">ETH를 솔로 스테이킹하는 방법</a>에 대해 자세히 알아보세요.
</ExpandableCard>

## 더 읽을거리 {#further-reading}

- [이더리움 스테이킹 디렉터리](https://www.staking.directory/) - _Eridian and Spacesider_
- [스테이킹 서비스 평가하기](https://www.attestant.io/posts/evaluating-staking-services/) - _짐 맥도널드 2020_
