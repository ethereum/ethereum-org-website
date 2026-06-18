---
title: "집에서 ETH 스테이킹하기"
description: "ETH 홈 스테이킹을 시작하는 방법에 대한 개요"
lang: ko
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-solo.png
alt: "자신의 컴퓨터 칩 위에 있는 코뿔소 레슬리(Leslie)."
sidebarDepth: 2
summaryPoints:
  - 검증자가 제대로 작동하고 온라인 상태를 유지하도록 하여 프로토콜로부터 직접 최대 보상을 받으세요.
  - 가정용 하드웨어를 실행하여 이더리움 네트워크의 보안과 탈중앙화에 직접 기여하세요.
  - 신뢰를 제거하고, 자금에 대한 키의 통제권을 절대 포기하지 마세요.
---

## 홈 스테이킹이란 무엇인가요? {#what-is-solo-staking}

홈 스테이킹은 인터넷에 연결된 [이더리움 노드를 실행](/run-a-node/)하고 32 ETH를 예치하여 [검증자](#faq)를 활성화함으로써 네트워크 합의에 직접 참여할 수 있는 권한을 얻는 행위입니다.

**홈 스테이킹은 이더리움 네트워크의 탈중앙화를 높여**, [이더리움](/)이 검열에 더 잘 저항하고 공격에 더 강력하게 대응할 수 있도록 합니다. 다른 스테이킹 방법은 이와 같은 방식으로 네트워크에 도움이 되지 않을 수 있습니다. 홈 스테이킹은 이더리움을 보호하기 위한 최고의 스테이킹 옵션입니다.

이더리움 노드는 실행 계층(EL) 클라이언트와 합의 레이어(CL) 클라이언트로 구성됩니다. 이러한 클라이언트는 유효한 서명 키 세트와 함께 작동하여 트랜잭션과 블록을 검증하고, 체인의 올바른 헤드를 증명하며, 증명을 집계하고, 블록을 제안하는 소프트웨어입니다.

홈 스테이커는 이러한 클라이언트를 실행하는 데 필요한 하드웨어를 운영할 책임이 있습니다. 집에서 운영하는 전용 기기를 사용하는 것을 강력히 권장하며, 이는 네트워크의 건전성에 매우 유익합니다.

홈 스테이커는 검증자가 제대로 작동하고 온라인 상태를 유지하도록 하여 프로토콜로부터 직접 보상을 받습니다.

## 왜 홈 스테이킹을 해야 하나요? {#why-stake-solo}

홈 스테이킹은 더 많은 책임이 따르지만, 자금과 스테이킹 설정에 대한 최대한의 통제권을 제공합니다.

<Grid>
  <Card title="새로운 ETH 얻기" emoji="💸" description="검증자가 온라인 상태일 때 중개인의 수수료 없이 프로토콜에서 직접 ETH 단위의 보상을 얻으세요." />
  <Card title="완전한 제어권" emoji="🎛️" description="자신의 키를 직접 보관하세요. 위험을 최소화하고 네트워크의 건전성과 보안에 가장 잘 기여할 수 있는 클라이언트와 하드웨어의 조합을 선택하세요. 타사 스테이킹 서비스는 여러분을 대신하여 이러한 결정을 내리며, 항상 가장 안전한 선택을 하는 것은 아닙니다." />
  <Card title="네트워크 보안" emoji="🔐" description="홈 스테이킹은 가장 영향력 있는 스테이킹 방법입니다. 집에서 자신의 하드웨어로 검증자를 실행함으로써 이더리움 프로토콜의 견고성, 탈중앙화 및 보안을 강화할 수 있습니다." />
</Grid>

## 홈 스테이킹 전 고려 사항 {#considerations-before-staking-solo}

홈 스테이킹이 모든 사람에게 접근 가능하고 위험이 없기를 바라지만, 현실은 그렇지 않습니다. ETH 홈 스테이킹을 선택하기 전에 명심해야 할 실용적이고 중요한 고려 사항이 있습니다.

<ExpandableCard title="필독 자료" eventCategory="SoloStaking" eventName="clicked required reading">
자체 노드를 운영할 때는 선택한 소프트웨어의 사용법을 배우는 데 시간을 투자해야 합니다. 여기에는 관련 문서를 읽고 해당 개발 팀의 커뮤니케이션 채널에 귀를 기울이는 것이 포함됩니다.

실행 중인 소프트웨어와 지분 증명(PoS)의 작동 방식을 더 많이 이해할수록 스테이커로서의 위험이 줄어들고, 노드 운영자로서 과정 중에 발생할 수 있는 문제를 더 쉽게 해결할 수 있습니다.
</ExpandableCard>

<ExpandableCard title="컴퓨터에 익숙함" eventCategory="SoloStaking" eventName="clicked comfortable with computers">
새로운 도구들이 시간이 지남에 따라 이 과정을 더 쉽게 만들고 있지만, 노드 설정은 컴퓨터 작업에 어느 정도 익숙해야 합니다. 명령줄 인터페이스(CLI)에 대한 이해가 도움이 되지만, 더 이상 엄격하게 요구되지는 않습니다.

또한 매우 기본적인 하드웨어 설정과 최소 권장 사양에 대한 약간의 이해가 필요합니다.
</ExpandableCard>

<ExpandableCard title="안전한 키 관리" eventCategory="SoloStaking" eventName="clicked secure key management">
개인 키가 이더리움 주소를 보호하는 것과 마찬가지로, 검증자를 위한 전용 키를 생성해야 합니다. 시드 구문이나 개인 키를 안전하게 보관하는 방법을 이해해야 합니다.{' '}

[이더리움 보안 및 스캠 예방](/security/)
</ExpandableCard>

<ExpandableCard title="유지보수" eventCategory="SoloStaking" eventName="clicked maintenance">
하드웨어는 때때로 고장 나고, 네트워크 연결에 오류가 발생하며, 클라이언트 소프트웨어는 가끔 업그레이드가 필요합니다. 노드 유지보수는 불가피하며 때때로 주의를 기울여야 합니다. 예상되는 네트워크 업그레이드나 기타 중요한 클라이언트 업그레이드를 항상 인지하고 있어야 합니다.
</ExpandableCard>

<ExpandableCard title="안정적인 가동 시간" eventCategory="SoloStaking" eventName="clicked reliable uptime">
보상은 검증자가 온라인 상태를 유지하고 제대로 증명하는 시간에 비례합니다. 다운타임은 동시에 오프라인 상태인 다른 검증자의 수에 비례하여 페널티를 발생시키지만, <a href="#faq">슬래싱으로 이어지지는 않습니다</a>. 제때 수신되지 않은 증명에 대해서는 보상이 감소하므로 대역폭도 중요합니다. 요구 사항은 다양하지만, 최소 10 Mb/s의 업로드 및 다운로드 속도가 권장됩니다.
</ExpandableCard>

<ExpandableCard title="슬래싱 위험" eventCategory="SoloStaking" eventName="clicked slashing risk">
오프라인 상태로 인한 비활동 페널티와 달리, <em>슬래싱</em>은 악의적인 위반에 대해 부과되는 훨씬 더 심각한 페널티입니다. 한 번에 한 대의 기기에만 키를 로드하여 소수 클라이언트를 실행하면 슬래싱 위험이 최소화됩니다. 그렇긴 하지만, 모든 스테이커는 슬래싱의 위험성을 인지하고 있어야 합니다.

<a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50/"> 슬래싱 및 검증자 수명 주기에 대해 자세히 알아보기</a>
</ExpandableCard>

<StakingComparison page="solo" />

## 작동 방식 {#how-it-works}

<StakingHowSoloWorks />

활성 상태인 동안 ETH 보상을 얻게 되며, 이는 주기적으로 인출 주소로 예치됩니다.

원한다면 언제든지 검증자를 종료할 수 있으며, 이 경우 온라인 상태를 유지해야 하는 요구 사항이 사라지고 추가 보상도 중단됩니다. 그런 다음 남은 잔고는 설정 중에 지정한 인출 주소로 인출됩니다.

[스테이킹 인출에 대해 자세히 알아보기](/staking/withdrawals/)

## 스테이킹 런치패드에서 시작하기 {#get-started-on-the-staking-launchpad}

스테이킹 런치패드(Staking Launchpad)는 스테이커가 될 수 있도록 돕는 오픈 소스 애플리케이션입니다. 클라이언트 선택, 키 생성, 스테이킹 예치금 컨트랙트에 ETH를 예치하는 과정을 안내합니다. 검증자를 안전하게 설정하기 위해 모든 사항을 확인했는지 점검할 수 있는 체크리스트가 제공됩니다.

<StakingLaunchpadWidget />

## 노드 및 클라이언트 설정 도구 고려 사항 {#node-tool-considerations}

ETH 홈 스테이킹을 돕는 도구와 서비스가 점점 늘어나고 있지만, 각각 다른 위험과 이점을 가지고 있습니다.

아래의 속성 지표는 나열된 스테이킹 도구가 가질 수 있는 주목할 만한 강점이나 약점을 나타내는 데 사용됩니다. 스테이킹 여정에 도움이 될 도구를 선택할 때 이러한 속성을 어떻게 정의하는지 참고용으로 이 섹션을 활용하세요.

<StakingConsiderations page="solo" />

## 노드 및 클라이언트 설정 도구 살펴보기 {#node-and-client-tools}

설정을 돕기 위해 사용할 수 있는 다양한 옵션이 있습니다. 위의 지표를 사용하여 아래 도구들을 살펴보세요.

<ProductDisclaimer />

### 노드 도구 {#node-tools}

<StakingProductsCardGrid category="nodeTools" />

네트워크의 보안을 향상시키고 위험을 제한하므로 [소수 클라이언트](/developers/docs/nodes-and-clients/client-diversity/)를 선택하는 것이 중요하다는 점에 유의하세요. 소수 클라이언트를 설정할 수 있는 도구는 <em style={{ textTransform: "uppercase" }}>"다중 클라이언트(multi-client)"</em>로 표시됩니다.

### 키 생성기 {#key-generators}

이러한 도구는 키 생성을 돕기 위해 [스테이킹 예치금 CLI(Staking Deposit CLI)](https://github.com/ethereum/staking-deposit-cli/)의 대안으로 사용할 수 있습니다.

<StakingProductsCardGrid category="keyGen" />

저희가 놓친 스테이킹 도구에 대한 제안이 있으신가요? [제품 등록 정책](/contributing/adding-staking-products/)을 확인하여 적합한지 알아보고 검토를 위해 제출해 주세요.

## 홈 스테이킹 가이드 살펴보기 {#staking-guides}

<StakingGuides />

## 자주 묻는 질문 {#faq}

다음은 알아둘 가치가 있는 스테이킹에 관한 가장 일반적인 질문들입니다.

<ExpandableCard title="검증자란 무엇인가요?">

<em>검증자</em>는 이더리움에 존재하며 이더리움 프로토콜의 합의에 참여하는 가상 엔티티입니다. 검증자는 잔고, 공개키 및 기타 속성으로 표시됩니다. <em>검증자 클라이언트</em>는 개인 키를 보유하고 사용하여 검증자를 대신하여 작동하는 소프트웨어입니다. 단일 검증자 클라이언트는 여러 키 쌍을 보유하여 여러 검증자를 제어할 수 있습니다.

</ExpandableCard>

<ExpandableCard title="32 ETH 이상을 예치할 수 있나요?">
네, 최신 검증자 계정은 최대 2048 ETH까지 보유할 수 있습니다. 32 ETH를 초과하는 추가 ETH는 단계적으로 복리 적용되며, 실제 잔고가 증가함에 따라 정수 단위로 증가합니다. 이를 <a href="https://www.attestant.io/posts/understanding-validator-effective-balance/">유효 잔고</a>라고 합니다.

계정의 유효 잔고를 늘려 보상을 증가시키려면, 전체 ETH 임계값보다 0.25 ETH 높은 버퍼를 넘어야 합니다. 예를 들어, 실제 잔고가 32.9 ETH이고 유효 잔고가 32 ETH인 계정은 유효 잔고 증가를 트리거하기 전에 실제 잔고를 33.25 ETH 이상으로 만들기 위해 0.35 ETH를 추가로 얻어야 합니다.

이 버퍼는 또한 현재 유효 잔고보다 0.25 ETH 아래로 떨어질 때까지 유효 잔고가 감소하는 것을 방지합니다.

검증자와 연결된 각 키 쌍을 활성화하려면 최소 32 ETH가 필요합니다. 이를 초과하는 잔고는 해당 주소로 서명된 트랜잭션을 통해 언제든지 연결된 인출 주소로 인출할 수 있습니다. 최대 유효 잔고를 초과하는 자금은 주기적으로 자동 인출됩니다.

홈 스테이킹이 너무 부담스럽다면 [서비스형 스테이킹(staking-as-a-service)](/staking/saas/) 제공업체를 이용하는 것을 고려해 보거나, 32 ETH 미만으로 참여하려는 경우 [스테이킹 풀](/staking/pools/)을 확인해 보세요.
</ExpandableCard>

<ExpandableCard title="오프라인 상태가 되면 슬래싱되나요? (요약: 아니요.)">
네트워크가 정상적으로 완결된 상태일 때 오프라인이 되더라도 슬래싱이 발생하지는 않습니다. 주어진 에포크(각 6.4분 길이) 동안 검증자가 증명할 수 없는 경우 작은 <em>비활동 페널티</em>가 부과되지만, 이는 <em>슬래싱</em>과는 매우 다릅니다. 이러한 페널티는 검증자가 증명할 수 있었을 때 얻었을 보상보다 약간 적으며, 다시 온라인 상태로 돌아와 대략 동일한 시간을 보내면 손실을 만회할 수 있습니다.

비활동에 대한 페널티는 동시에 오프라인 상태인 검증자의 수에 비례한다는 점에 유의하세요. 네트워크의 상당 부분이 한꺼번에 오프라인 상태가 되는 경우, 단일 검증자를 사용할 수 없을 때보다 이러한 각 검증자에 대한 페널티가 더 커집니다.

극단적인 경우, 검증자의 3분의 1 이상이 오프라인 상태가 되어 네트워크 완결이 중단되면, 해당 사용자들은 오프라인 검증자 계정에서 ETH가 기하급수적으로 빠져나가는 <em>2차 비활동 누수(quadratic inactivity leak)</em>를 겪게 됩니다. 이를 통해 네트워크는 비활성 검증자의 잔고가 16 ETH에 도달할 때까지 ETH를 소각하여 결국 스스로 치유할 수 있으며, 이 시점에서 해당 검증자는 검증자 풀에서 자동으로 퇴출됩니다. 남은 온라인 검증자들은 결국 다시 네트워크의 3분의 2 이상을 차지하게 되어, 체인을 다시 완결하는 데 필요한 절대다수를 충족하게 됩니다.
</ExpandableCard>

<ExpandableCard title="슬래싱되지 않으려면 어떻게 해야 하나요?">
간단히 말해, 이를 완전히 보장할 수는 없지만, 선의로 행동하고 소수 클라이언트를 실행하며 한 번에 한 대의 기기에만 서명 키를 보관한다면 슬래싱을 당할 위험은 거의 0에 가깝습니다.

검증자가 슬래싱을 당하고 네트워크에서 퇴출되는 구체적인 방법은 몇 가지뿐입니다. 이 글을 쓰는 시점에서 발생한 슬래싱은 서명 키가 두 대의 개별 기기에 동시에 저장되는 중복 하드웨어 설정의 결과로만 발생했습니다. 이는 의도치 않게 키에서 <em>이중 투표(double vote)</em>를 발생시킬 수 있으며, 이는 슬래싱 대상이 되는 위반 행위입니다.

절대다수 클라이언트(네트워크의 3/2 이상이 사용하는 클라이언트)를 실행하는 것 역시 해당 클라이언트에 체인 포크를 유발하는 버그가 있을 경우 잠재적인 슬래싱 위험을 안고 있습니다. 이로 인해 잘못된 포크가 완결될 수 있습니다. 의도한 체인으로 다시 수정하려면 완결된 블록을 실행 취소하려고 시도하여 <em>포위 투표(surround vote)</em>를 제출해야 합니다. 이 또한 슬래싱 대상이 되는 위반 행위이며, 대신 소수 클라이언트를 실행하는 것만으로도 피할 수 있습니다.

<em>소수 클라이언트</em>의 동일한 버그는 <em>결코 완결되지 않으므로</em> 포위 투표로 이어지지 않으며, <em>슬래싱이 아닌</em> 단순한 비활동 페널티만 발생시킵니다.

<ul>
  <li><a href="https://hackernoon.com/ethereums-client-diversity-problem">소수 클라이언트 실행의 중요성에 대해 자세히 알아보기</a></li>
  <li><a href="https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50">슬래싱 예방에 대해 자세히 알아보기</a></li>
</ul>
</ExpandableCard>

<ExpandableCard title="어떤 클라이언트가 가장 좋나요?">
개별 클라이언트는 다양한 프로그래밍 언어를 사용하여 서로 다른 팀에서 개발하므로 성능과 사용자 인터페이스 측면에서 약간 다를 수 있습니다. 그렇긴 하지만, 그중 어느 것도 "최고"는 아닙니다. 모든 프로덕션 클라이언트는 블록체인과 동기화하고 상호 작용하는 동일한 핵심 기능을 수행하는 훌륭한 소프트웨어입니다.

모든 프로덕션 클라이언트가 동일한 기본 기능을 제공하므로, 현재 네트워크의 대다수 검증자가 사용하지 않는 클라이언트를 의미하는 <strong>소수 클라이언트</strong>를 선택하는 것이 실제로 매우 중요합니다. 직관에 어긋나는 것처럼 들릴 수 있지만, 다수 또는 절대다수 클라이언트를 실행하면 해당 클라이언트에 버그가 발생할 경우 슬래싱 위험이 증가합니다. 소수 클라이언트를 실행하면 이러한 위험이 크게 제한됩니다.

<a href="https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA">클라이언트 다양성이 중요한 이유에 대해 자세히 알아보기</a>
</ExpandableCard>

<ExpandableCard title="VPS(가상 사설 서버)를 사용해도 되나요?">
가상 사설 서버(VPS)를 가정용 하드웨어의 대체품으로 사용할 수 있지만, 검증자 클라이언트의 물리적 접근성과 위치는 <em>중요합니다</em>. Amazon Web Services나 Digital Ocean과 같은 중앙화된 클라우드 솔루션은 하드웨어를 확보하고 운영할 필요가 없는 편리함을 제공하지만, 네트워크를 중앙화하는 대가를 치릅니다.

단일 중앙화된 클라우드 스토리지 솔루션에서 실행되는 검증자 클라이언트가 많을수록 해당 사용자에게는 더 위험해집니다. 공격, 규제 요구, 또는 단순한 전력/인터넷 중단 등 이러한 제공업체를 오프라인 상태로 만드는 모든 이벤트는 이 서버에 의존하는 모든 검증자 클라이언트를 동시에 오프라인 상태로 만듭니다.

오프라인 페널티는 동시에 오프라인 상태인 다른 검증자의 수에 비례합니다. VPS를 사용하면 오프라인 페널티가 더 심각해질 위험이 크게 증가하며, 중단 규모가 충분히 클 경우 2차 누수 또는 슬래싱의 위험이 증가합니다. 자신의 위험과 네트워크에 대한 위험을 최소화하기 위해 사용자는 자체 하드웨어를 확보하고 운영할 것을 강력히 권장합니다.
</ExpandableCard>

<ExpandableCard title="보상을 잠금 해제하거나 ETH를 돌려받으려면 어떻게 해야 하나요?">

비콘 체인에서 어떤 종류의 인출이든 인출 자격 증명을 설정해야 합니다.

신규 스테이커는 키 생성 및 예치 시에 이를 설정합니다. 아직 설정하지 않은 기존 스테이커는 이 기능을 지원하도록 키를 업그레이드할 수 있습니다.

인출 자격 증명이 설정되면, 보상 지급액(초기 32 ETH를 초과하여 누적된 ETH)이 주기적으로 인출 주소로 자동 분배됩니다.

전체 잔고를 잠금 해제하고 돌려받으려면 검증자 종료 프로세스도 완료해야 합니다.

<ButtonLink href="/staking/withdrawals/">스테이킹 인출에 대해 자세히 알아보기</ButtonLink>
</ExpandableCard>

## 추가 읽을거리 {#further-reading}

- [이더리움 스테이킹 디렉토리(The Ethereum Staking Directory)](https://www.staking.directory/) - _Eridian 및 Spacesider_
- [이더리움의 클라이언트 다양성 문제(Ethereum's Client Diversity Problem)](https://hackernoon.com/ethereums-client-diversity-problem) - _@emmanuelawosika 2022_
- [클라이언트 다양성 돕기(Helping Client Diversity)](https://www.attestant.io/posts/helping-client-diversity/) - _Jim McDonald 2022_
- [이더리움 합의 레이어의 클라이언트 다양성(Client diversity on Ethereum's consensus layer)](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA) - _jmcook.eth 2022_
- [방법: 이더리움 검증자 하드웨어 쇼핑하기(How To: Shop For Ethereum Validator Hardware)](https://www.youtube.com/watch?v=C2wwu1IlhDc) - _EthStaker 2022_
- [이더2 슬래싱 예방 팁(Eth2 Slashing Prevention Tips)](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50) - _Raul Jordan 2020_

<QuizWidget quizKey="staking-solo" />