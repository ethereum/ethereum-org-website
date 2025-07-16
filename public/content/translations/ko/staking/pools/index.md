---
title: 풀 스테이킹
description: 풀 ETH 스테이킹을 시작하는 방법에 대한 개요
lang: ko
template: staking
emoji: ":money_with_wings:"
image: /images/staking/leslie-pool.png
alt: 수영장에서 수영하는 코뿔소 레슬리.
sidebarDepth: 2
summaryPoints:
  - 다른 사용자와 함께 ETH의 양과 관계없이 스테이킹하고 보상을 받으세요.
  - 어려운 부분은 건너뛰고 검증자 작업은 제3자에게 맡기세요.
  - 본인 지갑에 스테이킹 토큰을 보관하세요.
---

## 스테이킹 풀이란 무엇인가요? {#what-are-staking-pools}

스테이킹 풀은 적은 양의 ETH를 가진 많은 사람이 검증자 키의 세트를 활성화하기 위해 필요한 32 ETH를 얻을 수 있게 하는 협업 방식입니다. 풀링 기능은 프로토콜 내에서 기본적으로 지원되지 않으므로 솔루션은 이러한 요구 사항을 해결하기 위해 별도로 구축되었습니다.

일부 풀은 자금을 계약에 예치할 수 있는 스마트 계약을 사용하여 운영되며, 이 계약은 귀하의 스테이킹을 신뢰 없이 관리 및 추적하고 이 가치를 나타내는 토큰을 발행합니다. 다른 풀에는 스마트 계약이 포함되지 않을 수 있으며 대신 오프체인에서 중개됩니다.

## 풀로 스테이킹하는 이유는 무엇인가요? {#why-stake-with-a-pool}

풀을 통한 스테이킹에는 [스테이킹 소개](/staking/)에서 설명한 이점 외에도 뚜렷한 장점이 많습니다.

<CardGrid>
  <Card title="낮은 진입장벽" emoji="🐟" description="Not a whale? No problem. Most staking pools let you stake virtually any amount of ETH by joining forces with other stakers, unlike staking solo which requires 32 ETH." />
  <Card title="지금 스테이킹하기" emoji=":stopwatch:" description="Staking with a pool is as easy as a token swap. No need to worry about hardware setup and node maintenance. Pools allow you to deposit your ETH which enables node operators to run validators. Rewards are then distributed to contributors minus a fee for node operations." />
  <Card title="스테이킹 토큰" emoji=":droplet:" description="Many staking pools provide a token that represents a claim on your staked ETH and the rewards it generates. This allows you to make use of your staked ETH, e.g. as collateral in DeFi applications." />
</CardGrid>

<StakingComparison page="pools" />

## 고려 사항 {#what-to-consider}

풀 스테이킹 또는 대리 스테이킹은 이더리움 프로토콜이 기본적으로 지원하는 기능은 아니지만, 32 ETH보다 적은 금액을 스테이킹하는 사람들의 수요에 따라 점점 더 많은 솔루션이 구축되었습니다.

사용되는 각 풀과 도구 또는 스마트 계약은 서로 다른 팀이 개발하였으며, 각각의 위험성과 장점이 따릅니다. 풀을 이용하면 사용자는 스테이킹한 ETH를 나타내는 토큰으로 자신의 ETH를 교환할 수 있습니다. 이 토큰은 합의 레이어에서 실제 ETH 스테이킹을 유지하더라도, 탈중앙 거래소에서 스테이킹된 ETH 기초자산에 적용되는 스테이킹 보상을 창출하는 동일 수량의 이자 발생(yield-bearing) 토큰으로 ETH를 교환할 수 있어 유용합니다. 또한 반대로 이자 발생 토큰을 ETH로 교환할 수도 있습니다. 즉, 이자가 발생한 스테이킹된 ETH 제품을 서로 스왑할 수 있으며, "raw ETH"는 빠르고 간편하고 32 ETH의 배수로만 사용하지 않아도 됨을 의미합니다.

단, 이러한 ETH 스테이킹 토큰은 독립적인 다수의 개인에게 분산되기보다는 소수의 중앙집중화된 조직이 통제하는 카르텔과 비슷해지는 경향이 있습니다. 이는 검열이나 가치를 창출하기 위한 조건을 만듭니다. 스테이킹에 있어 최적의 표준은 가능한 한 사용자 자신의 하드웨어에서 검증자를 실행하는 개인이 항상 중심이 되는 것입니다.

[토큰 스테이킹의 위험성에 대한 자세한 내용](https://notes.ethereum.org/@djrtwo/risks-of-lsd).

아래의 속성 지표는 현재 목록에 있는 스테이킹 풀의 대표적인 강점 및 약점을 나타내기 위해 사용되었습니다. 참여할 풀을 선택할 때 이 섹션을 참고하여 이러한 속성이 정의되는 방법을 알아보세요.

<StakingConsiderations page="pools" />

## 스테이킹 풀 살펴보기 {#explore-staking-pools}

설정에 도움이 되는 다양한 옵션이 있습니다. 위의 지표를 사용하여 아래 도구에 대한 안내를 받으세요.

<ProductDisclaimer />

<StakingProductsCardGrid category="pools" />

참고로, [클라이언트 다양성](/developers/docs/nodes-and-clients/client-diversity/)을 고려한 서비스의 선택은 네트워크의 보안을 강화하고 위험성을 최소화할 수 있으므로 매우 중요합니다. 다수 클라이언트의 사용을 제한하는 서비스는 <em style={{ textTransform: "uppercase" }}>"실행 클라이언트 다양성"</em> 및 <em style={{ textTransform: "uppercase" }}>"합의 클라이언트 다양성"</em>으로 표시됩니다.

저희가 놓친 다른 스테이킹 도구가 있습니까? 이더리움 [제품 나열 정책](/contributing/adding-staking-products/)을 확인하고 정책에 맞는 제품인 경우 검토를 위해 제출해 주세요.

## 자주 묻는 질문 {#faq}

<ExpandableCard title="보상은 어떻게 받을 수 있나요?">
일반적으로 ERC-20 스테이킹 토큰은 스테이커에게 발행되며 스테이커가 스테이킹한 ETH에 보상금을 더한 값을 나타냅니다. 각 풀마다 조금씩 다른 방식으로 스테이킹 보상을 사용자에게 분배하지만, 보통 앞서 말한 경우가 일반적입니다.
</ExpandableCard>

<ExpandableCard title="나의 스테이킹은 언제 출금할 수 있나요?">
당장 가능합니다! 2023년 4월 진행된 상하이/카펠라 네트워크 업그레이드를 통해 스테이킹 출금이 도입되었습니다. 스테이킹 풀에 참여한 검증자 계정은 스테이킹을 종료하고 지정된 출금 주소로 ETH를 출금할 수 있습니다. 이를 통해 스테이킹한 ETH 중 본인의 지분을 상환받을 수 있습니다. 제공자에게 문의하여 이 기능을 어떻게 지원하는지 확인하십시오.

또는 ERC-20 스테이킹 토큰을 활용하는 풀을 이용하면 이 토큰을 시장에서 거래하여 스테이킹 포지션을 매도할 수도 있습니다. 이를 통해 스테이킹 계약에서 ETH를 그대로 유지하면서 사실상 "출금"을 실행할 수 있습니다.

<ButtonLink href="/staking/withdrawals/">스테이킹 출금에 대한 자세한 내용</ButtonLink>
</ExpandableCard>

<ExpandableCard title="거래소에서 스테이킹을 진행하는 것과는 다른 것인가요?">
이러한 풀 스테이킹 옵션과 중앙화 거래소 간에는 다양한 유사점이 있으며, 적은 양의 ETH를 스테이킹하고 합쳐 검증자 역할을 활성화할 수 있도록 하는 것이 한 예시입니다.

중앙화 거래소와 달리 풀 스테이킹 옵션 상당수는 스마트 계약 및/또는 스테이킹 토큰을 활용합니다. 이러한 토큰은 다른 토큰처럼 지갑에 보관하고 매매할 수 있는 ERC-20 토큰이 일반적입니다. 이는 자신의 토큰에 대한 제어권을 제공하여 주도성과 보안성을 지닐 수 있게 하지만, 배경에서 귀하를 대신하여 증명하는 검증자 클라이언트에 대한 직접적인 제어권은 제공하지 않습니다.

일부 풀링 옵션은 지원하는 노드에 관해 다른 풀보다 더욱 탈중앙화되어 있습니다. 네트워크의 건전한 상태와 탈중앙화를 장려하기 위해 스테이커는 항상 노드 운영자에게 권한이 집중되지 않는 탈중앙화 체계를 마련할 풀링 서비스를 선택하는 것이 좋습니다.
</ExpandableCard>

## 더 읽을거리 {#further-reading}

- [이더리움 스테이킹 디렉터리](https://www.staking.directory/) - _Eridian and Spacesider_
- [Rocket Pool을 통한 스테이킹 - 스테이킹 개요](https://docs.rocketpool.net/guides/staking/overview.html) - _RocketPool 문서_
- [Lido를 통한 이더리움 스테이킹](https://help.lido.fi/en/collections/2947324-staking-ethereum-with-lido) - _Lido 도움말 문서_
