---
title: 스마트 컨트랙트 조합성
description: 기존 컴포넌트를 재사용하여 레고 블록처럼 스마트 컨트랙트를 결합해 복잡한 탈중앙화 애플리케이션(dapp)을 구축하는 방법을 배워보세요.
lang: ko
incomplete: true
---

## 간단한 소개 {#a-brief-introduction}

스마트 컨트랙트는 이더리움에 공개되어 있으며 오픈 API로 생각할 수 있습니다. 탈중앙화 애플리케이션 (dapp) 개발자가 되기 위해 자체 스마트 컨트랙트를 작성할 필요는 없으며, 상호작용하는 방법만 알면 됩니다. 예를 들어, 탈중앙화 거래소인 [유니스왑](https://uniswap.exchange/swap)의 기존 스마트 컨트랙트를 사용하여 앱의 모든 토큰 스왑 로직을 처리할 수 있으므로 처음부터 시작할 필요가 없습니다. 유니스왑의 [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) 및 [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts) 컨트랙트 중 일부를 확인해 보세요.

## 조합성이란 무엇인가요? {#what-is-composability}

조합성은 서로 다른 컴포넌트를 결합하여 새로운 시스템이나 결과물을 만드는 것입니다. 소프트웨어 개발에서 조합성이란 개발자가 기존 소프트웨어 컴포넌트를 재사용하여 새로운 애플리케이션을 구축할 수 있음을 의미합니다. 조합성을 이해하는 좋은 방법은 조합 가능한 요소를 레고 블록으로 생각하는 것입니다. 각 레고는 다른 레고와 결합할 수 있으므로, 다양한 레고를 결합하여 복잡한 구조를 만들 수 있습니다.

이더리움에서 모든 스마트 컨트랙트는 일종의 레고와 같습니다. 다른 프로젝트의 스마트 컨트랙트를 프로젝트의 구성 요소로 사용할 수 있습니다. 즉, 이미 있는 것을 다시 만들거나 처음부터 구축하는 데 시간을 낭비할 필요가 없습니다.

## 조합성은 어떻게 작동하나요? {#how-does-composability-work}

이더리움 스마트 컨트랙트는 퍼블릭 API와 같으므로 누구나 컨트랙트와 상호작용하거나 추가 기능을 위해 dapp에 통합할 수 있습니다. 스마트 컨트랙트 조합성은 일반적으로 모듈성(modularity), 자율성(autonomy), 발견 가능성(discoverability)이라는 세 가지 원칙에 따라 작동합니다.

**1. 모듈성**: 개별 컴포넌트가 특정 작업을 수행할 수 있는 능력입니다. 이더리움의 모든 스마트 컨트랙트에는 특정 사용 사례가 있습니다(유니스왑 예시 참조).

**2. 자율성**: 조합 가능한 컴포넌트는 독립적으로 작동할 수 있어야 합니다. 이더리움의 각 스마트 컨트랙트는 자체 실행되며 시스템의 다른 부분에 의존하지 않고 기능할 수 있습니다.

**3. 발견 가능성**: 외부 컨트랙트나 소프트웨어 라이브러리가 공개적으로 사용 가능하지 않다면 개발자는 이를 호출하거나 애플리케이션에 통합할 수 없습니다. 설계상 스마트 컨트랙트는 오픈 소스이므로 누구나 스마트 컨트랙트를 호출하거나 코드베이스를 포크할 수 있습니다.

## 조합성의 이점 {#benefits-of-composability}

### 개발 주기 단축 {#shorter-development-cycle}

조합성은 개발자가 [dapp](/apps/#what-are-dapps)을 만들 때 해야 할 작업을 줄여줍니다. [나발 라비칸트(Naval Ravikant)가 말했듯이](https://twitter.com/naval/status/1444366754650656770), "오픈 소스란 모든 문제를 한 번만 해결하면 된다는 것을 의미합니다."

한 문제를 해결하는 스마트 컨트랙트가 있다면 다른 개발자가 이를 재사용할 수 있으므로 같은 문제를 다시 해결할 필요가 없습니다. 이런 방식으로 개발자는 기존 소프트웨어 라이브러리를 가져와 추가 기능을 더해 새로운 dapp을 만들 수 있습니다.

### 더 큰 혁신 {#greater-innovation}

조합성은 개발자가 원하는 결과를 만들기 위해 오픈 소스 코드를 자유롭게 재사용, 수정, 복제 또는 통합할 수 있기 때문에 혁신과 실험을 장려합니다. 결과적으로 개발 팀은 기본 기능에 소요되는 시간을 줄이고 새로운 기능을 실험하는 데 더 많은 시간을 할애할 수 있습니다.

### 더 나은 사용자 경험 {#better-user-experience}

이더리움 생태계 컴포넌트 간의 상호운용성은 사용자 경험을 향상시킵니다. 애플리케이션이 서로 통신할 수 없는 파편화된 생태계보다 dapp이 외부 스마트 컨트랙트를 통합할 때 사용자는 더 많은 기능에 접근할 수 있습니다.

차익 거래의 예를 들어 상호운용성의 이점을 설명해 보겠습니다.

토큰이 `exchange B`보다 `exchange A`에서 더 높은 가격에 거래되고 있다면, 가격 차이를 이용해 수익을 낼 수 있습니다. 하지만 이는 트랜잭션에 자금을 조달할 충분한 자본이 있는 경우(즉, `exchange B`에서 토큰을 구매하고 `exchange A`에서 판매하는 경우)에만 가능합니다.

거래를 감당할 충분한 자금이 없는 상황에서는 플래시 론이 이상적일 수 있습니다. [플래시 론](/defi/#flash-loans)은 고도의 기술이 필요하지만, 기본 개념은 (담보 없이) 자산을 빌리고 _단일_ 트랜잭션 내에서 동일한 자산을 반환할 수 있다는 것입니다.

처음 예시로 돌아가서, 차익 거래자는 대규모 플래시 론을 받아 `exchange B`에서 토큰을 구매하고 `exchange A`에서 판매한 다음, 원금과 이자를 갚고 수익을 챙기는 모든 과정을 동일한 트랜잭션 내에서 수행할 수 있습니다. 이 복잡한 로직은 여러 컨트랙트에 대한 호출을 결합해야 하며, 스마트 컨트랙트에 상호운용성이 없다면 불가능할 것입니다.

## 이더리움의 조합성 예시 {#composability-in-ethereum}

### 토큰 스왑 {#token-swaps}

트랜잭션 비용을 ETH로 지불해야 하는 dapp을 만드는 경우, 토큰 스왑 로직을 통합하여 사용자가 다른 ERC-20 토큰으로 지불하도록 허용할 수 있습니다. 코드는 컨트랙트가 호출된 함수를 실행하기 전에 사용자의 토큰을 자동으로 ETH로 변환합니다.

### 거버넌스 {#governance}

[DAO](/dao/)를 위한 맞춤형 거버넌스 시스템을 구축하는 것은 비용과 시간이 많이 들 수 있습니다. 대신 [Aragon Client](https://client.aragon.org/)와 같은 오픈 소스 거버넌스 툴킷을 사용하여 DAO를 부트스트랩하고 거버넌스 프레임워크를 빠르게 만들 수 있습니다.

### 신원 관리 {#identity-management}

맞춤형 인증 시스템을 구축하거나 중앙화된 제공업체에 의존하는 대신, 탈중앙화 신원증명 (DID) 도구를 통합하여 사용자의 인증을 관리할 수 있습니다. 사용자가 이더리움 지갑으로 신원을 인증할 수 있는 "이더리움으로 로그인(Sign in with Ethereum)" 기능을 제공하는 오픈 소스 툴킷인 [SpruceID](https://www.spruceid.com/)가 그 예입니다.

## 관련 튜토리얼 {#related-tutorials}

- [create-eth-app으로 dapp 프론트엔드 개발 시작하기](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– create-eth-app을 사용하여 별도 설정 없이 인기 있는 스마트 컨트랙트가 포함된 앱을 만드는 방법에 대한 개요입니다._

## 더 읽을거리 {#further-reading}

_도움이 된 커뮤니티 리소스를 알고 계신가요? 이 페이지를 편집하여 추가해 주세요!_

- [조합성은 혁신이다(Composability is Innovation)](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Web3에서 조합성이 중요한 이유(Why Composability Matters For Web3)](https://hackernoon.com/why-composability-matters-for-web3)
- [조합성이란 무엇인가?(What is Composability?)](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)