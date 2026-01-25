---
title: 리스테이킹
metaTitle: 리스테이킹이란 무엇인가요? | 리스테이킹의 이점과 용도
description: 스테이킹된 ETH를 사용하여 다른 탈중앙화 서비스를 보호하고 추가 보상을 받으세요.
lang: ko
template: use-cases
emoji: ":recycle:"
image: /images/use-cases/restaking.png
alt: 이더리움의 리스테이킹을 시각적으로 표현한 것입니다.
sidebarDepth: 2
summaryPoint1: 스테이킹된 ETH를 사용하여 다른 탈중앙화 서비스를 보호하고 추가 보상을 받으세요.
buttons:
  - content: 리스테이킹이란 무엇인가요?
    toId: what-is-restaking
  - content: 어떻게 작동하나요?
    toId: how-does-restaking-work
    isSecondary: false
---

이더리움 네트워크는 연중무휴 24시간 수십억 달러의 가치를 보호합니다. 어떻게요?

전 세계 사람들은 스마트 계약에 [이더(ETH)](/eth/)를 예치(또는 '스테이킹')하여 이더리움 트랜잭션을 처리하고 이더리움 네트워크를 보호하는 소프트웨어를 실행합니다. 그 대가로 더 많은 ETH를 보상으로 받습니다.

리스테이킹은 [스테이커](/staking/)가 이 보안을 다른 서비스, 애플리케이션 또는 네트워크로 확장하기 위해 구축된 기술입니다. 그 대가로 추가 리스테이킹 보상을 받습니다. 하지만, 스테이킹된 ETH가 더 큰 위험에 노출되기도 합니다.

**18분 안에 리스테이킹 설명**

<YouTube id="rOJo7VwPh7I" />

## 리스테이킹이란 무엇인가요? {#what-is-restaking}

리스테이킹은 스테이커가 이미 스테이킹된 ETH를 사용하여 다른 탈중앙화 서비스를 보호하는 것입니다. 그 대가로 리스테이커는 일반적인 ETH 스테이킹 보상 외에 다른 서비스로부터 추가 보상을 받을 수 있습니다.

리스테이킹으로 보호되는 탈중앙화 서비스는 "능동적으로 검증된 서비스(AVS)"라고 합니다.
많은 ETH 스테이커가 이더리움 검증 소프트웨어를 실행하는 것과 같은 방식으로, 많은 리스테이커가 특화된 AVS 소프트웨어를 실행합니다.

<br/>
<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>유용한 정보</strong></p>
  <p className="mt-2">"능동적으로 검증된 서비스(AVS)"가 가장 일반적이지만, 리스테이킹 플랫폼에 따라 "자율적으로 검증된 서비스", "분산된 보안 서비스" 또는 "네트워크"와 같이 보안을 지원하는 탈중앙화 서비스에 다른 이름을 사용할 수 있습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 스테이킹 vs 리스테이킹 {#staking-vs-restaking}

| 스테이킹              | 리스테이킹                      |
| ----------------- | -------------------------- |
| ETH 보상 획득         | ETH 보상 + AVS 보상 획득         |
| 이더리움 네트워크 보호      | 이더리움 네트워크 + AVS 보호         |
| 최소 ETH 없음         | 최소 ETH 없음                  |
| 낮은 위험 수준          | 낮음에서 높음까지의 위험 수준           |
| 출금 시간은 대기열에 따라 다름 | 출금 시간은 대기열 + 언본딩 기간에 따라 다름 |

## 왜 리스테이킹이 필요한가요? {#why-do-we-need-restaking}

리스테이킹이 있는 세상과 없는 세상, 두 가지를 상상해 보세요.

 <TabbedSection />

리스테이킹이 있는 이 세상에서는 AVS와 스테이커 모두 서로를 찾고 추가 보상을 위해 보안을 교환함으로써 이익을 얻습니다.

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>리스테이킹의 추가 이점</strong></p>
  <p className="mt-2">AVS는 탈중앙화와 보안에 신경 쓰지 않고 모든 리소스를 서비스 구축 및 마케팅에 쏟을 수 있습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹은 어떻게 작동하나요? {#how-does-restaking-work}

리스테이킹에는 여러 주체가 관련되어 있으며, 각 주체는 중요한 역할을 합니다.

| **용어**         | **설명**                                                                                                                                                                                                                                  |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **리스테이킹 플랫폼**  | 리스테이킹 플랫폼은 AVS, ETH 스테이커 및 운영자를 연결하는 서비스입니다. 리스테이킹 플랫폼은 스테이커가 ETH를 리스테이킹할 수 있는 탈중앙화 애플리케이션과 스테이커, AVS, 운영자가 서로를 찾을 수 있는 마켓플레이스를 구축합니다.                                                                  |
| **네이티브 리스테이커** | 자체 이더리움 검증자를 운영하여 ETH를 스테이킹하는 사람들은 EigenLayer 및 기타 리스테이킹 플랫폼에 스테이킹된 ETH를 연결하여 ETH 검증자 보상 외에 추가적인 리스테이킹 보상을 받을 수 있습니다.                                                                                                   |
|                |                                                                                                                                                                                                                                         |
| **유동성 리스테이커**  | Lido 또는 Rocket Pool과 같은 제3자 유동 스테이킹 제공업체를 통해 ETH를 스테이킹하는 사람들은 스테이킹된 ETH를 나타내는 유동 스테이킹 토큰(LST)을 받습니다. 원래 스테이킹된 ETH를 유지하면서 이러한 LST를 리스테이킹하여 리스테이킹 보상을 받을 수 있습니다.                       |
|                |                                                                                                                                                                                                                                         |
| **운영자**        | 운영자는 AVS의 리스테이킹 소프트웨어를 실행하여 각 AVS에 필요한 검증 작업을 수행합니다. 운영자는 일반적으로 가동 시간 및 성능과 같은 사항을 보장하는 전문 서비스 제공업체입니다. 운영자가 아닌 리스테이커와 마찬가지로 운영자도 스테이킹된 ETH를 사용하여 AVS를 보호하지만, 운영자는 작업의 대가로 추가 보상을 받습니다. |
|                |                                                                                                                                                                                                                                         |
| **AVS**        | 이는 가격 오라클, 토큰 브리지 및 데이터 시스템과 같은 탈중앙화 서비스로, 리스테이커로부터 보안을 제공받고 그 대가로 토큰 보상을 제공합니다.                                                                                                                                        |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>유용한 정보</strong></p>
  <p className="mt-2">네이티브 및 유동성 리스테이커는 AVS를 직접 보호하기 위해 소프트웨어를 실행하는 대신 스테이킹된 ETH를 운영자에게 위임하는 경우가 많습니다.</p>
  <p className="mt-2">이러한 방식으로 AVS의 복잡한 기술 요구 사항에 대해 걱정할 필요가 없지만 운영자보다 낮은 보상률을 받습니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹의 예시에는 어떤 것들이 있나요? {#what-are-some-examples-of-restaking}

새로운 아이디어이지만, 리스테이킹의 가능성을 탐구하기 위해 몇 가지 프로젝트가 등장했습니다.

<RestakingList/>

<br/>

<Alert variant="warning" className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>잘못된 명칭 경고</strong></p>
  <p className="mt-2">일부 사람들은 "리스테이킹"을 디파이(DeFi)에서 LST를 대출하고 차입하는 것과 혼동합니다. 둘 다 스테이킹된 ETH를 활용하지만, 리스테이킹은 단순히 LST로 수익을 얻는 것이 아니라 AVS를 보호하는 것을 의미합니다.</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹으로 얼마나 벌 수 있나요? {#how-much-can-i-make-from-restaking}

AVS마다 다른 이율을 제공하지만, eETH와 같은 유동성 리스테이킹 토큰(LRT)을 통해 얼마나 벌 수 있는지 가늠할 수 있습니다. ETH를 스테이킹하여 stETH와 같은 LST를 얻는 것과 같은 방식으로, stETH를 리스테이킹하여 eETH와 같은 LRT를 얻을 수 있습니다. 이러한 토큰은 ETH 스테이킹 및 리스테이킹 보상을 얻습니다.

**리스테이킹과 관련된 위험을 인지하는 것이 중요합니다. 잠재적 보상은 매력적일 수 있지만 위험이 없는 것은 아닙니다.**

## 리스테이킹의 위험은 무엇인가요? {#what-are-the-risks-of-restaking}

| **위험**                               | **설명**                                                                                                                                             |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **페널티(또는 '슬래싱')** | ETH 스테이킹과 마찬가지로 리스테이커/운영자가 오프라인 상태가 되거나, 메시지를 검열하거나, 네트워크를 손상시키려고 시도하면 스테이킹된 자산이 부분적으로 또는 전체적으로 삭감(소각)될 수 있습니다. |
| **중앙화**                              | 소수의 운영자가 대부분의 리스테이킹을 지배하게 되면 리스테이커, AVS, 심지어 리스테이킹 플랫폼에 큰 영향을 미칠 수 있습니다.                                                           |
| **연쇄 반응**                            | 리스테이커가 여러 AVS를 보호하는 동안 슬래싱을 당하면 다른 AVS의 보안 수준이 낮아져 취약해질 수 있습니다.                                                                    |
| **자금에 대한 즉각적인 접근**                   | 리스테이킹된 ETH를 출금하는 데는 대기 시간(또는 '언본딩 기간')이 있으므로 항상 즉시 접근할 수는 없습니다.                                                 |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>이더리움 공동 창업자가 입력 중…</strong></p>
  <p className="mt-2">
    이더리움의 공동 창업자인 비탈릭은 2021년 블로그 게시물 <a href = "https://vitalik.eth.limo/general/2023/05/21/dont_overload.html">합의에 과부하를 주지 마세요(Don't Overload Consensus)</a>에서 리스테이킹의 잠재적 위험에 대해 경고했습니다. </a>  
</p>
</AlertDescription>
</AlertContent>
</Alert>

## 리스테이킹을 시작하는 방법은 무엇인가요? {#how-to-get-started-with-restaking}

| 🫡 입문자                                                                                         | 🤓 고급 사용자                                                                               |
| ---------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| 1. Lido 또는 Rocket Pool과 같은 플랫폼에서 ETH를 스테이킹하여 LST를 받으세요. | 1. 이더리움에서 검증자로서 ETH를 스테이킹하세요.                    |
| 2. 해당 LST를 사용하여 리스테이킹 서비스에서 리스테이킹을 시작하세요.               | 2. EigenLayer, Symbiotic 등과 같은 리스테이킹 서비스를 비교하세요. |
|                                                                                                | 3. 안내에 따라 검증자를 리스테이킹 스마트 계약에 연결하세요.              |

<br/>

<Alert className="justify-between">
<AlertEmoji text=":eyes:"/>
<AlertContent>
<AlertDescription>
  <p className="mt-0"><strong>이더리움 스테이킹:</strong> 어떻게 작동하나요?</p>
  <ButtonLink href="/staking/">
    더 알아보기
  </ButtonLink>
</AlertDescription>
</AlertContent>
</Alert>

## 고급 {#advanced}

<YouTube id="-V-fG4J1N_M" />

## 더 읽어보기 {#further-reading}

1. [ethereum.org - ETH 스테이킹 가이드](https://ethereum.org/en/staking/)
2. [Ledger Academy - 이더리움 리스테이킹이란?](https://www.ledger.com/academy/what-is-ethereum-restaking)
3. [Consensys - EigenLayer: 탈중앙화 이더리움 리스테이킹 프로토콜 설명](https://consensys.io/blog/eigenlayer-decentralized-ethereum-restaking-protocol-explained)
4. [비탈릭 부테린 - 이더리움의 합의에 과부하를 주지 마세요(Don't overload Ethereum's consensus)](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)
5. [Cointelegraph - EigenLayer란 무엇인가요? 이더리움의 리스테이킹 프로토콜 설명](https://cointelegraph.com/explained/what-is-eigenlayer-ethereums-restaking-protocol-explained)
6. [a16z crypto research - EigenLayer: Sreeram Kannan과 함께하는 이더리움에 대한 무허가 기능 추가](https://www.youtube.com/watch?v=-V-fG4J1N_M)
7. [Junion - EigenLayer 설명: 리스테이킹이란?](https://www.youtube.com/watch?v=5r0SooSQFJg)
8. [The Block - 리스테이킹 데이터 대시](https://www.theblock.co/data/decentralized-finance/restaking)
