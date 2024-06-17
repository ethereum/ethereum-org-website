---
title: 서비스로서의 스테이킹
description: 풀링된 ETH 스테이킹을 시작하는 방법에 대한 개요
lang: ko
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: 구름 위에 떠 있는 코뿔소 레슬리
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
  <Card title="내 검증자" emoji=":desktop_computer:">
    소유하고 있는 32 ETH를 예치하여 이더리움 합의 메커니즘에 참여할 수 있는 서명 키 세트를 활성화하세요. 대시보드를 통해 ETH 보상이 적립되는 과정을 모니터링합니다.
  </Card>
  <Card title="쉽게 시작하기" emoji="🏁">
    하드웨어 사양, 설치, 노드 점검 및 업그레이드는 더 이상 생각하지 않아도 됩니다.
    SaaS 제공자의 서비스를 사용하면 자신의 서명 자격 증명을 업로드하여 어려운 부분을 외부에 대신 맡기고 적은 비용으로 귀하를 대신하여 검증자를 실행할 수 있게 합니다.
  </Card>
  <Card title="리스크 줄이기" emoji=":shield:">
    대부분의 경우에 사용자는 스테이킹된 자금을 출금하거나 이전할 수 있게 하는 키에 대한 접근 권한을 포기하지 않아도 됩니다. 앞서 말한 키는 서명 키와는 다르며, 스테이커의 위험성을 최소화(제거하지는 않음)하도록 분리하여 저장할 수 있습니다.
  </Card>
</CardGrid>

<StakingComparison page="saas" />

## 고려 사항 {#what-to-consider}

ETH를 스테이킹할 수 있도록 도와주는 서비스형 스테이킹 제공 업체의 수는 점점 증가하고 있지만 각 업체마다 서로 다른 장점과 위험성이 있습니다.

아래의 속성 지표는 현재 목록에 있는 SaaS 제공 업체의 대표적인 강점 및 약점을 나타내기 위해 사용되었습니다. 스테이킹 여정을 도와 줄 서비스를 선택할 때 이 섹션을 참고하여 이러한 속성이 정의되는 방법을 알아보세요.

<StakingConsiderations page="saas" />

## 스테이킹 서비스 제공 업체 찾기 {#saas-providers}

다음은 사용 가능한 SaaS 공급자입니다. 상단의 지표를 사용하면 해당 서비스를 둘러보는 데 도움이 됩니다.

<InfoBanner emoji="⚠️" isWarning>
참고로, <a href="/developers/docs/nodes-and-clients/client-diversity/">클라이언트 다양성</a>에 대한 지원은 네트워크의 보안을 강화하고 위험성을 최소화할 수 있으므로 매우 중요합니다. 대부분 클라이언트의 사용을 제한하는 것으로 밝혀진 서비스는 <em style={{ textTransform: "uppercase" }}>"다양한 클라이언트"</em>로 표시됩니다.
</InfoBanner>

### SaaS 제공업체

<StakingProductsCardGrid category="saas" />

### 키 생성기

<StakingProductsCardGrid category="keyGen" />

저희가 놓친 서비스로서 스테이킹 제공 업체를 제안하고 싶으신가요? 이더리움 [제품 나열 정책](/contributing/adding-staking-products/)을 확인하고 정책에 맞는 제품인 경우 검토를 위해 제출해 주세요.

## 자주 묻는 질문 {#faq}

<ExpandableCard title="내 키는 누가 보유하나요?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
  진행 방식은 업체별로 다를 수 있지만 일반적으로 필요한 서명 키(32 ETH 당 1개)를 설정하고 본인을 대신하여 검증자를 실행할 수 있게 제공 업체에 키를 업로드하도록 안내받게 됩니다. 서명 키만으로는 자금을 인출하거나 이체 또는 소비할 수 없습니다. 다만, 업체는 합의를 위한 투표에 참여할 수 있게 되며, 이는 적절하게 이루어지지 않는 경우에 오프라인에서 벌금 및 슬래싱을 받게 될 수 있습니다.
</ExpandableCard>

<ExpandableCard title="그래서 2개의 키가 있다는 것인가요?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
네. 각 계정은 <em>서명</em> 키와 <em>인출</em> 키를 모두 포함하여 구성됩니다. 검증자가 체인의 상태를 증명하고, 그룹 동기화, 블록 제안 등을 용이하게 하기 위해서는 검증자 클라이언트가 서명 키에 쉽게 접근할 수 있어야 합니다. 이는 어떠한 형태로든 반드시 인터넷에 연결되어 있어야 하므로, 본질적으로 "핫(hot)"키로 고려됩니다. 이는 검증자가 증명되기 위해 필요한 구성 요소이며, 보안을 위해 자금 인출이나 이체를 위해 사용되는 키와 분리되어 있습니다.

이 모든 키는 24개 단어로 구성된 시드 문구를 사용하여 언제든지 재생성될 수 있습니다. <em>이 시드 문구를 안전한 곳에 백업해 두십시오. 그렇지 않으면 필요할 때 인출 키를 생성할 수 없게 됩니다.</em>
</ExpandableCard>

<ExpandableCard title="인출은 언제 할 수 있나요?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
  SaaS 공급 업체를 통해 32 ETH를 스테이킹할 경우, 해당하는 ETH는 여전히 공식 스테이킹 예치 계약 상에 예치됩니다. 따라서 현재 SaaS 스테이커는 솔로 스테이커와 동일하게 인출이 제한됩니다. 이는 현재 ETH 스테이킹이 단방향 입금이라는 것을 의미합니다. 이는 상하이 업그레이드 이전까지 지속될 예정입니다.
</ExpandableCard>

<ExpandableCard title="슬래싱을 당하면 어떻게 되나요?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
SaaS 공급 업체를 사용하면 노드의 운영을 타인에게 맡기게 됩니다. 이는 노드 성능이 양호하지 않을 수도 있는 리스크를 동반하며, 귀하가 제어할 수 없습니다. 검증자가 제거되는 경우, 검증자의 잔액에 불이익이 적용되고 강제적으로 검증자 풀에서 제외됩니다. 해당하는 자금은 프로토콜 수준에서 인출이 가능하게 될 때까지 잠기게 됩니다.

각 SaaS 업체에 연락하여 보증이나 보험 옵션에 대한 자세한 내용을 안내 받으십시오. 검증자 설정을 완전히 제어하고자 하는 경우, <a href="/staking/solo/">ETH를 솔로 스테이킹하는 방법</a>에 대해 자세히 알아보세요.
</ExpandableCard>

## 더 읽을거리 {#further-reading}

- [스테이킹 서비스 평가하기](https://www.attestant.io/posts/evaluating-staking-services/) - _짐 맥도널드 2020_
