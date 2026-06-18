---
title: "서비스형 스테이킹"
description: "서비스형 스테이킹에 대해 알아보기"
lang: ko
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-saas.png
alt: "구름 위를 떠다니는 코뿔소 레슬리."
sidebarDepth: 2
summaryPoints:
  - 제3자 노드 운영자가 검증자 클라이언트의 운영을 처리합니다.
  - 32 ETH를 보유하고 있지만 노드 운영의 기술적 복잡성을 다루는 데 부담을 느끼는 분들에게 훌륭한 옵션입니다.
  - 신뢰 가정을 줄이고 인출 키의 제어권을 유지합니다.
---

## 서비스형 스테이킹이란 무엇인가요? {#what-is-staking-as-a-service}

서비스형 스테이킹("SaaS")은 검증자를 위해 자신의 32 ETH를 예치하지만, 노드 운영은 제3자 운영자에게 위임하는 스테이킹 서비스 범주를 나타냅니다. 이 과정은 일반적으로 키 생성 및 예치를 포함한 초기 설정 안내를 받은 다음, 서명 키를 운영자에게 업로드하는 과정을 포함합니다. 이를 통해 서비스는 일반적으로 월별 수수료를 받고 사용자를 대신하여 검증자를 운영할 수 있습니다.

## 왜 서비스를 통해 스테이킹해야 하나요? {#why-stake-with-a-service}

[이더리움](/) 프로토콜은 기본적으로 스테이크 위임을 지원하지 않으므로, 이러한 수요를 충족하기 위해 이러한 서비스가 구축되었습니다. 스테이킹할 32 ETH가 있지만 하드웨어를 다루는 것이 부담스럽다면, SaaS 서비스를 통해 어려운 부분을 위임하고 기본 블록 보상을 얻을 수 있습니다.

<Grid>
  <Card title="나만의 검증자" emoji=":desktop_computer:" description="32 ETH를 예치하여 이더리움 합의에 참여할 나만의 서명 키 세트를 활성화하세요. 대시보드로 진행 상황을 모니터링하며 ETH 보상이 쌓이는 것을 확인하세요." />
  <Card title="간편한 시작" emoji="🏁" description="하드웨어 사양, 설정, 노드 유지보수 및 업그레이드는 잊어버리세요. SaaS 제공업체를 이용하면 서명 자격 증명을 업로드하여 어려운 부분을 아웃소싱하고, 적은 비용으로 대신 검증자를 실행하도록 할 수 있습니다." />
  <Card title="위험 제한" emoji=":shield:" description="많은 경우 사용자는 스테이킹된 자금을 인출하거나 전송할 수 있는 키에 대한 접근 권한을 포기할 필요가 없습니다. 이 키는 서명 키와 다르며, 스테이커로서의 위험을 제한(제거는 아님)하기 위해 별도로 보관할 수 있습니다." />
</Grid>

<StakingComparison page="saas" />

## 고려해야 할 사항 {#what-to-consider}

ETH 스테이킹을 돕는 SaaS 제공업체가 늘어나고 있지만, 각각 고유한 장점과 위험이 있습니다. 모든 SaaS 옵션은 홈 스테이킹에 비해 추가적인 신뢰 가정이 필요합니다. SaaS 옵션에는 공개되지 않거나 감사할 수 없는 이더리움 클라이언트를 래핑하는 추가 코드가 있을 수 있습니다. 또한 SaaS는 네트워크 탈중앙화에 부정적인 영향을 미칩니다. 설정에 따라 검증자를 제어하지 못할 수도 있으며, 운영자가 사용자의 ETH를 사용하여 부정직하게 행동할 수 있습니다.

아래의 속성 지표는 나열된 SaaS 제공업체가 가질 수 있는 주요 강점이나 약점을 나타내는 데 사용됩니다. 스테이킹 여정에 도움이 될 서비스를 선택할 때, 이러한 속성을 어떻게 정의하는지 이 섹션을 참고하세요.

<StakingConsiderations page="saas" />

## 스테이킹 서비스 제공업체 살펴보기 {#saas-providers}

아래는 이용 가능한 몇 가지 SaaS 제공업체입니다. 위의 지표를 활용하여 이러한 서비스를 살펴보세요.

<ProductDisclaimer />

### SaaS 제공업체 {#saas-providers-2}

<StakingProductsCardGrid category="saas" />

네트워크의 보안을 향상시키고 위험을 제한하므로 [클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity/)을 지원하는 것이 중요하다는 점에 유의하세요. 다수 클라이언트 사용을 제한하는 증거가 있는 서비스는 <em style={{ textTransform: "uppercase" }}>"실행 클라이언트 다양성"</em> 및 <em style={{ textTransform: "uppercase" }}>"합의 클라이언트 다양성"</em>으로 표시됩니다.

### 키 생성기 {#key-generators}

<StakingProductsCardGrid category="keyGen" />

저희가 놓친 서비스형 스테이킹 제공업체에 대한 제안이 있으신가요? [제품 등록 정책](/contributing/adding-staking-products/)을 확인하여 적합한지 알아보고 검토를 위해 제출해 주세요.

## 자주 묻는 질문 {#faq}

<ExpandableCard title="내 키는 누가 보관하나요?" eventCategory="SaasStaking" eventName="clicked who holds my keys">
방식은 제공업체마다 다르지만, 일반적으로 필요한 서명 키(32 ETH당 1개)를 설정하고 이를 제공업체에 업로드하여 사용자를 대신해 검증할 수 있도록 안내받게 됩니다. 서명 키만으로는 자금을 인출, 전송 또는 사용할 수 있는 권한이 부여되지 않습니다. 하지만 합의에 투표할 수 있는 권한을 제공하며, 이를 제대로 수행하지 않으면 오프라인 페널티나 슬래싱이 발생할 수 있습니다.
</ExpandableCard>

<ExpandableCard title="그럼 키가 두 세트인가요?" eventCategory="SaasStaking" eventName="clicked so there are two sets of keys">
네. 각 계정은 BLS <em>서명</em> 키와 BLS <em>인출</em> 키로 구성됩니다. 검증자가 체인의 상태를 증명하고, 동기화 위원회에 참여하며, 블록을 제안하려면 검증자 클라이언트가 서명 키에 쉽게 접근할 수 있어야 합니다. 이러한 키는 어떤 형태로든 인터넷에 연결되어 있어야 하므로 본질적으로 "핫(hot)" 키로 간주됩니다. 이는 검증자가 증명할 수 있기 위한 요구 사항이며, 따라서 자금을 전송하거나 인출하는 데 사용되는 키는 보안상의 이유로 분리되어 있습니다.

BLS 인출 키는 스테이킹 보상 및 종료된 자금이 어느 실행 계층 계정으로 이동해야 하는지 선언하는 일회성 메시지에 서명하는 데 사용됩니다. 이 메시지가 브로드캐스트되면 <em>BLS 인출</em> 키는 더 이상 필요하지 않습니다. 대신, 인출된 자금에 대한 제어권은 사용자가 제공한 주소로 영구적으로 위임됩니다. 이를 통해 자체 콜드 스토리지로 보호되는 인출 주소를 설정할 수 있으며, 다른 사람이 검증자 서명 키를 제어하더라도 검증자 자금에 대한 위험을 최소화할 수 있습니다.

인출 자격 증명을 업데이트하는 것은 인출을 활성화하기 위한 필수 단계입니다\*. 이 과정에는 니모닉 시드 구문을 사용하여 인출 키를 생성하는 작업이 포함됩니다.

<strong>이 시드 구문을 안전하게 백업해 두지 않으면 필요할 때 인출 키를 생성할 수 없게 되므로 반드시 백업해 두시기 바랍니다.</strong>

\*초기 예치 시 인출 주소를 제공한 스테이커는 이를 설정할 필요가 없습니다. 검증자를 준비하는 방법에 대한 지원은 SaaS 제공업체에 문의하세요.
</ExpandableCard>

<ExpandableCard title="언제 인출할 수 있나요?" eventCategory="SaasStaking" eventName="clicked when can I withdraw">
스테이커는 인출 주소를 제공해야 하며(초기 예치 시 제공하지 않은 경우), 보상 지급은 며칠마다 주기적으로 자동 분배되기 시작합니다.

검증자는 검증자로서 완전히 종료할 수도 있으며, 이 경우 남은 ETH 잔액의 잠금이 해제되어 인출할 수 있습니다. 실행 인출 주소를 제공하고 종료 과정을 완료한 계정은 다음 검증자 스윕(sweep) 중에 제공된 인출 주소로 전체 잔액을 받게 됩니다.

<ButtonLink href="/staking/withdrawals/">스테이킹 인출에 대해 더 알아보기</ButtonLink>
</ExpandableCard>

<ExpandableCard title="슬래싱을 당하면 어떻게 되나요?" eventCategory="SaasStaking" eventName="clicked what happens if I get slashed">
SaaS 제공업체를 사용하면 노드 운영을 다른 사람에게 맡기는 것입니다. 이로 인해 사용자가 통제할 수 없는 노드 성능 저하의 위험이 따릅니다. 검증자가 슬래싱되는 경우, 검증자 잔액에 페널티가 부과되고 검증자 풀에서 강제로 제거됩니다.

슬래싱/종료 과정이 완료되면 이 자금은 검증자에게 할당된 인출 주소로 전송됩니다. 이를 활성화하려면 인출 주소를 제공해야 합니다. 이는 초기 예치 시 제공되었을 수 있습니다. 그렇지 않은 경우, 검증자 인출 키를 사용하여 인출 주소를 선언하는 메시지에 서명해야 합니다. 인출 주소가 제공되지 않은 경우, 제공될 때까지 자금은 잠긴 상태로 유지됩니다.

보증이나 보험 옵션에 대한 자세한 내용과 인출 주소를 제공하는 방법에 대한 지침은 개별 SaaS 제공업체에 문의하세요. 검증자 설정을 완전히 제어하고 싶다면 [ETH를 솔로 스테이킹하는 방법에 대해 자세히 알아보세요](/staking/solo/).
</ExpandableCard>

## 더 읽을거리 {#further-reading}

- [이더리움 스테이킹 디렉터리(The Ethereum Staking Directory)](https://www.staking.directory/) - _Eridian 및 Spacesider_
- [스테이킹 서비스 평가(Evaluating Staking Services)](https://www.attestant.io/posts/evaluating-staking-services/) - _Jim McDonald 2020_