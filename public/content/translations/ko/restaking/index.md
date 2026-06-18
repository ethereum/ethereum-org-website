---
title: 리스테이킹
metaTitle: 리스테이킹이란? | 리스테이킹의 이점과 활용
description: 스테이킹된 ETH를 사용하여 다른 탈중앙화된 서비스를 보호하고 추가 보상을 얻으세요.
lang: ko
template: use-cases
image: /images/use-cases/restaking.png
alt: 이더리움의 리스테이킹을 시각적으로 표현한 이미지입니다.
sidebarDepth: 2
summaryPoints:
  - "스테이킹된 ETH를 사용하여 다른 탈중앙화된 서비스를 보호하고 추가 보상을 얻으세요."
buttons:
  - content: 리스테이킹이란?
    toId: what-is-restaking
  - content: 어떻게 작동하나요?
    toId: how-does-restaking-work
    isSecondary: false
---

이더리움 네트워크는 1년 365일 연중무휴로 수십억 달러의 가치를 보호합니다. 어떻게 가능할까요?

전 세계 사람들이 이더리움 트랜잭션을 처리하고 이더리움 네트워크를 보호하는 소프트웨어를 실행하기 위해 스마트 컨트랙트에 [이더(ETH)](/what-is-ether/)를 예치(또는 "스테이킹")합니다. 그 대가로 그들은 더 많은 ETH를 보상으로 받습니다.

리스테이킹은 [스테이커](/staking/)가 이러한 보안을 다른 서비스, 애플리케이션 또는 네트워크로 확장할 수 있도록 구축된 기술입니다. 그 대가로 그들은 추가적인 리스테이킹 보상을 얻습니다. 하지만 스테이킹된 ETH가 더 큰 위험에 노출되기도 합니다.

**18분 만에 알아보는 리스테이킹**

<VideoWatch slug="restaking-explained" />

## 리스테이킹이란? {#what-is-restaking}

리스테이킹은 스테이커가 이미 스테이킹된 ETH를 사용하여 다른 탈중앙화된 서비스를 보호하는 것을 말합니다. 그 대가로 리스테이커는 일반적인 ETH 스테이킹 보상 외에도 해당 서비스에서 추가 보상을 받을 수 있습니다.

리스테이킹을 통해 보호되는 탈중앙화된 서비스는 "능동적 검증 서비스(Actively Validated Services, AVS)"라고 합니다.
많은 ETH 스테이커가 이더리움 검증 소프트웨어를 실행하는 것과 마찬가지로, 많은 리스테이커는 특화된 AVS 소프트웨어를 실행합니다.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>참고하세요</strong></strong>
  <p className="mt-2">"능동적 검증 서비스(AVS)"라는 용어가 가장 일반적이지만, 리스테이킹 플랫폼에 따라 자신들이 보호하는 탈중앙화된 서비스를 "자율 검증 서비스(Autonomously Validated Services)", "분산 보안 서비스(Distributed Secure Services)" 또는 "네트워크(Networks)"와 같은 다른 이름으로 부를 수도 있습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 스테이킹 vs 리스테이킹 {#staking-vs-restaking}

| 스테이킹 | 리스테이킹 |
| ------------------------------ | ------------------------------------------------- |
| ETH 보상 획득 | ETH 보상 + AVS 보상 획득 |
| 이더리움 네트워크 보호 | 이더리움 네트워크 + AVS 보호 |
| 최소 ETH 요구사항 없음 | 최소 ETH 요구사항 없음 |
| 낮은 위험 수준 | 낮음~높음 위험 수준 |
| 출금 시간은 대기열에 따라 다름 | 출금 시간은 대기열 + 결속 해제(unbonding) 기간에 따라 다름 |

## 리스테이킹이 필요한 이유는 무엇인가요? {#why-do-we-need-restaking}

리스테이킹이 있는 세상과 없는 세상, 두 가지를 상상해 보세요.

 <TabbedSection />

리스테이킹이 있는 세상에서는 AVS와 스테이커 모두 서로를 찾아 보안과 추가 보상을 교환할 수 있어 이점을 얻습니다.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>리스테이킹의 추가적인 이점</strong></strong>
  <p className="mt-2">AVS는 탈중앙화와 보안 문제에 신경 쓰는 대신, 서비스 구축과 마케팅에 모든 리소스를 쏟을 수 있습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹은 어떻게 작동하나요? {#how-does-restaking-work}

리스테이킹에는 여러 주체가 관여하며, 각 주체는 중요한 역할을 합니다.

| **용어** | **설명** |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **리스테이킹 플랫폼** | 리스테이킹 플랫폼은 AVS, ETH 스테이커, 운영자를 연결하는 서비스입니다. 이들은 스테이커가 ETH를 리스테이킹할 수 있는 탈중앙화 애플리케이션(dapp)과 스테이커, AVS, 운영자가 서로를 찾을 수 있는 마켓플레이스를 구축합니다. |
| **네이티브 리스테이커** | 자체 이더리움 검증자를 실행하여 ETH를 스테이킹하는 사람들은 스테이킹된 ETH를 EigenLayer 등을 포함한 리스테이킹 플랫폼에 연결하여 ETH 검증자 보상 외에 리스테이킹 보상을 얻을 수 있습니다. |
| **유동성 리스테이커** | 리도(Lido)나 Rocket Pool과 같은 제3자 유동성 스테이킹 제공자를 통해 ETH를 스테이킹하는 사람들은 스테이킹된 ETH를 나타내는 유동성 스테이킹 토큰(LST)을 받습니다. 이들은 원래의 ETH를 스테이킹한 상태로 유지하면서 이 LST를 리스테이킹하여 리스테이킹 보상을 얻을 수 있습니다. |
| **운영자** | 운영자는 AVS의 리스테이킹 소프트웨어를 실행하여 각 AVS가 요구하는 검증 작업을 수행합니다. 운영자는 일반적으로 가동 시간과 성능 등을 보장하는 전문 서비스 제공자입니다. 비운영자 리스테이커와 마찬가지로 운영자도 스테이킹된 ETH를 사용하여 AVS를 보호하지만, 운영자는 작업에 대한 대가로 추가 보상을 받습니다. |
| **AVS** | 가격 오라클, 토큰 브리지, 데이터 시스템과 같은 탈중앙화된 서비스로, 리스테이커로부터 보안을 제공받고 그 대가로 토큰 보상을 제공합니다. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>참고하세요</strong></strong>
  <p className="mt-2">네이티브 및 유동성 리스테이커는 AVS를 보호하기 위해 직접 소프트웨어를 실행하는 대신, 스테이킹된 ETH를 운영자에게 위임하는 경우가 많습니다.</p>
  <p className="mt-2">이렇게 하면 운영자보다 낮은 보상률을 받게 되지만, AVS의 복잡한 기술적 요구사항에 대해 걱정할 필요가 없습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹의 예시에는 어떤 것들이 있나요? {#what-are-some-examples-of-restaking}

새로운 아이디어이긴 하지만, 리스테이킹의 가능성을 탐구하기 위해 몇 가지 프로젝트가 등장했습니다.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>용어 혼동 주의</strong></strong>
  <p className="mt-2">일부 사람들은 "리스테이킹"을 탈중앙화 금융(DeFi)에서 LST를 대출하고 차입하는 것과 혼동합니다. 둘 다 스테이킹된 ETH를 활용하는 것이지만, 리스테이킹은 단순히 LST로 수익을 얻는 것이 아니라 AVS를 보호하는 것을 의미합니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹으로 얼마나 벌 수 있나요? {#how-much-can-i-make-from-restaking}

AVS마다 제공하는 이율은 다르지만, eETH와 같은 유동성 리스테이킹 토큰(Liquid Restaking Tokens, LRT)을 통해 수익 규모를 가늠해 볼 수 있습니다. ETH를 스테이킹하고 stETH와 같은 LST를 받는 것과 마찬가지로, stETH를 리스테이킹하고 eETH와 같은 LRT를 받을 수 있습니다. 이러한 토큰은 ETH 스테이킹 및 리스테이킹 보상을 모두 얻습니다.

**리스테이킹에 수반되는 위험을 인지하는 것이 중요합니다. 잠재적인 보상은 매력적일 수 있지만, 위험이 없는 것은 아닙니다.**

## 리스테이킹의 위험은 무엇인가요? {#what-are-the-risks-of-restaking}

| **위험** | **설명** |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **페널티 (또는 "슬래싱")** | ETH 스테이킹과 마찬가지로, 리스테이커/운영자가 오프라인 상태가 되거나 메시지를 검열하거나 네트워크를 손상시키려 할 경우, 그들의 스테이크가 부분적으로 또는 완전히 슬래싱(소각)될 수 있습니다. |
| **중앙화** | 소수의 운영자가 리스테이킹의 대부분을 지배하게 되면, 이들이 리스테이커, AVS, 심지어 리스테이킹 플랫폼에까지 큰 영향을 미칠 수 있습니다. |
| **연쇄 반응** | 여러 AVS를 보호하는 리스테이커가 슬래싱을 당하면, 다른 AVS의 보안도 낮아져 취약해질 수 있습니다. |
| **자금에 대한 즉각적인 접근** | 리스테이킹된 ETH를 출금하려면 대기 시간(또는 "결속 해제 기간")이 필요하므로 항상 즉시 접근할 수 있는 것은 아닙니다. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>이더리움 공동 창립자의 의견…</strong></strong>
  <p className="mt-2">
    이더리움의 공동 창립자인 비탈릭 부테린은 2021년 블로그 게시물 <a href="https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">이더리움의 합의를 과부하하지 마세요(Don't Overload Consensus)</a>에서 리스테이킹의 잠재적 위험에 대해 경고했습니다.
  </a>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹은 어떻게 시작하나요? {#how-to-get-started-with-restaking}

| 🫡 초보자 | 🤓 고급 사용자 |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| 1. 리도(Lido)나 Rocket Pool 같은 플랫폼에 ETH를 스테이킹하여 LST를 받습니다. | 1. 이더리움에서 검증자로서 ETH를 스테이킹합니다. |
| 2. 해당 LST를 사용하여 리스테이킹 서비스에서 리스테이킹을 시작합니다. | 2. EigenLayer, Symbiotic 등과 같은 리스테이킹 서비스를 비교합니다. |
| | 3. 지침에 따라 검증자를 리스테이킹 스마트 컨트랙트에 연결합니다. |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>이더리움 스테이킹 :</strong> 어떻게 작동하나요?</strong>
  <ButtonLink href="/staking/">
    더 알아보기
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 심화 내용 {#advanced}

<VideoWatch slug="eigenlayer-permissionless-features" />

## 더 읽어보기 {#further-reading}

1. [ethereum.org - ETH 스테이킹 가이드](/staking/)
2. [Ledger Academy - 이더리움 리스테이킹이란?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [컨센시스(Consensys) - EigenLayer: 탈중앙화 이더리움 리스테이킹 프로토콜 설명](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [비탈릭 부테린 - 이더리움의 합의를 과부하하지 마세요](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer란? 이더리움의 리스테이킹 프로토콜 설명](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Sreeram Kannan과 함께하는 이더리움의 무허가성 기능 추가](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 설명: 리스테이킹이란?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 리스테이킹 데이터 대시보드](https://www.theblock.co/data/decentralized-finance/restaking)