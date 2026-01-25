---
title: 스마트 계약 테스트
description: Ethereum 스마트 계약을 테스트하기 위한 기술 및 고려 사항의 개요입니다.
lang: ko
---

Ethereum과 같은 공공 블록체인은 불변성이 있어, 배포 후 스마트 계약 코드를 변경하는 것이 어렵습니다. “가상 업그레이드”를 수행하기 위한 `[계약 업그레이드 패턴](/developers/docs/smart-contracts/upgrading/)`이 존재하지만, 이는 구현하기 어렵고 사회적 합의가 필요합니다. 또한 업그레이드는 오류가 발견된 `<em>후에만</em>` 수정할 수 있습니다. 만약 공격자가 취약점을 먼저 발견하면 스마트 계약은 공격에 노출될 위험이 있습니다.

이러한 이유로 `[배포](/developers/docs/smart-contracts/deploying/)`하기 전에 스마트 계약을 테스트하는 것은 `[보안](/developers/docs/smart-contracts/security/)`을 위한 최소한의 요구 사항입니다. 스마트 계약을 테스트하고 코드의 정확성을 평가하기 위한 다양한 기술이 존재하며, 사용자는 필요에 따라 적절한 방법을 선택할 수 있습니다. 그러나 경미한 보안 결함부터 주요 결함까지 잡아내기 위해서는 다양한 도구와 접근 방식을 포함한 테스트 스위트가 이상적입니다.

## 필수 구성 요소 {#prerequisites}

이 페이지는 Ethereum 네트워크에 배포하기 전에 스마트 계약을 테스트하는 방법을 설명합니다. 이 문서는 독자가 `[스마트 계약](/developers/docs/smart-contracts/)`에 익숙하다고 가정합니다.

## 스마트 계약 테스트란 무엇입니까? 스마트 계약 테스트란? {#what-is-smart-contract-testing}

스마트 계약 테스트는 스마트 계약 코드가 예상대로 작동하는지 확인하는 과정입니다. 테스트는 특정 스마트 계약이 신뢰성, 사용성 및 보안 요구 사항을 충족하는지 확인하는 데 유용합니다.

접근 방식은 다양하지만, 대부분의 테스트 방법은 스마트 계약이 처리할 것으로 예상되는 데이터의 소규모 샘플로 계약을 실행하는 것이 필요합니다. 계약이 샘플 데이터에 대해 올바른 결과를 생성하면 정상적으로 작동하는 것으로 간주됩니다. 대부분의 테스트 도구는 계약의 실행이 예상 결과와 일치하는지 확인하기 위해 `[테스트 케이스](https://en.m.wikipedia.org/wiki/Test_case)`를 작성하고 실행하기 위한 리소스를 제공합니다.

### 스마트 계약을 테스트하는 것이 왜 중요한가요? 스마트 계약 테스트의 중요성 {#importance-of-testing-smart-contracts}

스마트 계약은 종종 고가의 금융 자산을 관리하기 때문에, 사소한 프로그래밍 오류가 `[사용자에게 막대한 손실](https://rekt.news/leaderboard/)`로 이어질 수 있으며, 실제로도 종종 그렇습니다. 엄격한 테스트를 통해 스마트 계약 코드의 결함과 문제를 조기에 발견하고 메인넷에 배포하기 전에 수정할 수 있습니다.

버그가 발견되면 계약을 업그레이드할 수 있지만, 업그레이드는 복잡하며 부적절하게 처리될 경우 `[오류를 초래](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/)`할 수 있습니다. 계약을 업그레이드하는 것은 불변성의 원칙을 무시하고 사용자가 추가 신뢰 가정을 가지게 합니다. 반대로, 계약 테스트에 대한 포괄적인 계획은 스마트 계약 보안 위험을 완화하고 배포 후 복잡한 논리 업그레이드 수행 필요성을 줄입니다.

## 스마트 계약 테스트 방법 {#methods-for-testing-smart-contracts}

이더리움 스마트 계약 테스트 방법은 **자동화된 테스트**와 **수동 테스트**라는 두 가지 큰 범주로 나뉩니다. 자동화 테스트와 수동 테스트는 각각 고유한 장점과 단점을 제공하지만, 두 가지를 결합하여 계약 분석을 위한 강력한 계획을 수립할 수 있습니다.

### 자동화된 테스트 {#automated-testing}

자동화 테스트는 스마트 계약 코드의 실행 오류를 자동으로 검사하는 도구를 사용합니다. 자동화된 테스트의 이점은 계약 기능성 평가를 안내하기 위해 `[스크립트](https://www.techtarget.com/whatis/definition/script?amp=1)`를 사용하는 데서 비롯됩니다. 스크립트화된 테스트는 최소한의 인간 개입으로 반복적으로 실행되도록 예약할 수 있어 수동 테스트 접근 방식보다 효율적입니다.

자동화 테스트는 테스트가 반복적이거나 시간 소모적일 때, 수동으로 수행하기 어려울 때, 인간의 실수가 발생할 수 있을 때 또는 중요한 계약 기능을 평가할 때 특히 유용합니다. 그러나 자동화된 테스트 도구는 특정 버그를 놓치거나 많은 `[오탐](https://www.contrastsecurity.com/glossary/false-positive)`을 생성할 수 있다는 단점이 있을 수 있습니다. 따라서 스마트 계약의 경우 자동화 테스트와 수동 테스트를 결합하는 것이 이상적입니다.

### 수동 테스트 {#manual-testing}

수동 테스트는 인간의 도움이 필요하며 스마트 계약의 정확성을 분석할 때 테스트 케이스를 하나씩 실행하는 것입니다. 이는 계약에서 여러 독립 테스트를 동시에 실행하고 모든 실패 및 성공 테스트를 보여주는 보고서를 얻는 자동화 테스트와 다릅니다.

수동 테스트는 다양한 테스트 시나리오를 포함하는 작성된 테스트 계획에 따라 단일 개인이 수행할 수도 있습니다. 또한 여러 개인 또는 그룹이 지정된 기간 동안 스마트 계약과 상호 작용하는 수동 테스트의 일환으로 참여할 수 있습니다. 테스터는 계약의 실제 동작을 예상 동작과 비교하고 차이점이 발견되면 이를 버그로 표시합니다.

효과적인 수동 테스트에는 상당한 자원(기술, 시간, 비용, 노력)이 필요하며, 실행 중 실수로 인해 특정 오류가 누락될 수 있습니다. 그러나 수동 테스트는 직관을 사용하여 자동화 테스트 도구에서 놓칠 수 있는 경계 사례를 탐지하는 인간 테스터(예: 감사자)에게 유용할 수 있습니다.

## 스마트 계약을 위한 자동화된 테스트 {#automated-testing-for-smart-contracts}

### 단위 테스트 {#unit-testing-for-smart-contracts}

유닛 테스트는 계약 기능을 개별적으로 평가하고 각 구성 요소가 올바르게 작동하는지 확인합니다. 좋은 유닛 테스트는 간단하고 실행이 빠르며, 테스트 실패 시 어떤 문제가 발생했는지 명확하게 알 수 있습니다.

유닛 테스트는 함수가 예상된 값을 반환하고 함수 실행 후 계약 저장소가 제대로 업데이트되는지 확인하는 데 유용합니다. 또한, 계약 코드베이스에 변경 사항을 추가한 후 유닛 테스트를 실행하면 새로운 로직이 오류를 도입하지 않았는지 확인할 수 있습니다. 다음은 효과적인 유닛 테스트를 실행하기 위한 몇 가지 지침입니다:

#### 스마트 계약 단위 테스트 지침 {#unit-testing-guidelines}

##### 1. 계약의 비즈니스 로직과 워크플로를 이해하세요

유닛 테스트를 작성하기 전에 스마트 계약이 제공하는 기능과 사용자가 해당 기능에 액세스하고 사용하는 방법을 아는 것이 좋습니다. 이는 계약의 함수가 유효한 사용자 입력에 대해 올바른 출력을 반환하는지 판단하는 `[해피 패스 테스트](https://en.m.wikipedia.org/wiki/Happy_path)`를 실행하는 데 특히 유용합니다. 이 개념을 `[경매 계약](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)`의 (축약된) 예시를 사용하여 설명하겠습니다.

```solidity
constructor(
        uint biddingTime,
        address payable beneficiaryAddress
    ) {
        beneficiary = beneficiaryAddress;
        auctionEndTime = block.timestamp + biddingTime;
    }

function bid() external payable {

      if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

      if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

 if (highestBid != 0) {
    pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

 function withdraw() external returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
           pendingReturns[msg.sender] = 0;

        if (!payable(msg.sender).send(amount)) {
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

function auctionEnd() external {
       if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        beneficiary.transfer(highestBid);
    }
}
```

이것은 입찰 기간 동안 입찰을 받도록 설계된 간단한 경매 계약입니다. `highestBid`가 증가하면 이전 최고 입찰자는 자신의 돈을 돌려받습니다. 입찰 기간이 끝나면 `beneficiary`는 계약을 호출하여 자신의 돈을 받습니다.

이와 같은 계약에 대한 유닛 테스트는 사용자가 계약과 상호 작용할 때 호출할 수 있는 다양한 기능을 다룹니다. 예를 들어, 경매가 진행 중일 때 사용자가 입찰할 수 있는지 확인하는 단위 테스트(`bid()` 호출이 성공하는지)나 사용자가 현재의 `highestBid`보다 높은 입찰을 할 수 있는지 확인하는 테스트가 있을 수 있습니다.

계약의 운영 워크플로를 이해하면 실행이 요구 사항을 충족하는지 확인하는 유닛 테스트를 작성하는 데 도움이 됩니다. 예를 들어, 경매 계약은 경매가 종료되었을 때(즉, `auctionEndTime`이 `block.timestamp`보다 낮을 때) 사용자가 입찰할 수 없다고 명시합니다. 따라서 개발자는 경매가 끝났을 때(즉, `auctionEndTime` > `block.timestamp`일 때) `bid()` 함수 호출이 성공하는지 또는 실패하는지를 확인하는 단위 테스트를 실행할 수 있습니다.

##### 2. 계약 실행과 관련된 모든 가정을 평가하세요

계약의 실행에 대한 모든 가정을 문서화하고 해당 가정의 타당성을 확인하는 유닛 테스트를 작성하는 것이 중요합니다. 예상치 못한 실행에 대한 보호를 제공할 뿐만 아니라, 테스트 가정을 통해 스마트 계약의 보안 모델을 위반할 수 있는 작업에 대해 생각하게 합니다. 유용한 팁은 "행복한 사용자 테스트"를 넘어서 잘못된 입력에 대해 함수가 실패하는지 확인하는 부정 테스트를 작성하는 것입니다.

많은 유닛 테스트 프레임워크는 계약이 할 수 있는 것과 할 수 없는 것을 명시하는 간단한 문장인 어설션을 생성하고, 해당 어설션이 실행 중에 유지되는지 확인하는 테스트를 실행할 수 있습니다. 위에서 설명한 경매 계약을 작업하는 개발자는 부정 테스트를 실행하기 전에 다음과 같은 행동에 대한 어설션을 만들 수 있습니다:

- 경매가 종료되었거나 시작되지 않았을 때 사용자는 입찰할 수 없습니다.

- 입찰이 허용 가능한 기준에 미달하면 경매 계약이 복구됩니다.

- 입찰에 실패한 사용자는 자금이 반환됩니다.

**참고**: 가정을 테스트하는 또 다른 방법은 계약에서, 특히 `require`, `assert`, `if…else` 문과 같은 `[함수 제어자](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers)`를 트리거하는 테스트를 작성하는 것입니다.

##### 3. 코드 커버리지 측정

`[코드 커버리지](https://en.m.wikipedia.org/wiki/Code_coverage)`는 테스트 중에 실행된 코드의 분기, 줄, 문의 수를 추적하는 테스트 지표입니다. 테스트되지 않은 취약점의 위험을 최소화하기 위해 테스트는 우수한 코드 커버리지를 가져야 합니다. 충분한 커버리지가 없으면 모든 테스트가 통과하기 때문에 계약이 안전하다고 잘못 가정할 수 있지만, 테스트되지 않은 코드 경로에는 여전히 취약점이 존재합니다. 높은 코드 커버리지를 기록하면 스마트 계약의 모든 문장/함수가 충분히 테스트되어 올바르게 작동함을 보장합니다.

##### 4. 잘 개발된 테스트 프레임워크를 사용하십시오.

스마트 계약의 단위 테스트를 실행할 때 사용하는 도구의 품질은 매우 중요합니다. 이상적인 테스트 프레임워크는 정기적으로 유지 보수되고, 유용한 기능(예: 로깅 및 보고 기능)을 제공하며, 다른 개발자들에 의해 광범위하게 사용되고 검증된 프레임워크입니다.

Solidity 스마트 계약을 위한 단위 테스트 프레임워크는 다양한 언어(주로 JavaScript, Python, Rust) 로 제공됩니다. 아래 가이드에서 다양한 테스트 프레임워크로 단위 테스트를 시작하는 방법에 대한 정보를 확인하십시오:

- **[Brownie로 단위 테스트 실행하기](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundry로 단위 테스트 실행하기](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffle로 단위 테스트 실행하기](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remix로 단위 테스트 실행하기](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ape로 단위 테스트 실행하기](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhat으로 단위 테스트 실행하기](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wake로 단위 테스트 실행하기](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 통합 테스트 {#integration-testing-for-smart-contracts}

단위 테스트가 계약 함수들을 개별적으로 디버깅하는 동안, 통합 테스트는 스마트 계약의 모든 구성 요소를 평가합니다. 통합 테스트는 다른 스마트 계약 간의 상호작용이나 같은 스마트 계약 내의 다양한 함수 간의 호출로 인해 발생하는 문제를 감지할 수 있습니다. 예를 들어, 통합 테스트는 `[상속](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance)` 및 종속성 주입과 같은 기능이 제대로 작동하는지 확인하는 데 도움이 될 수 있습니다.

통합 테스트는 계약이 모듈식 아키텍처를 채택하거나 실행 중에 다른 온체인 계약과 인터페이스하는 경우에 유용합니다. 통합 테스트를 실행하는 한 가지 방법은 특정 높이에서 `[블록체인을 포크](/glossary/#fork)`하고(`[Forge](https://book.getfoundry.sh/forge/fork-testing)` 또는 `[Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)`과 같은 도구 사용) 계약과 배포된 계약 간의 상호 작용을 시뮬레이션하는 것입니다.

포크된 블록체인은 메인넷과 유사하게 작동하며 관련 상태와 잔액을 가진 계정을 포함합니다. 그러나 이 환경은 로컬 개발 환경에만 국한되므로 예를 들어 실제 이더리움(ETH)이 트랜잭션에 필요하지 않으며, 실제 이더리움 프로토콜에 영향을 주지 않습니다.

### 속성 기반 테스트 {#property-based-testing-for-smart-contracts}

속성 기반 테스트는 스마트 계약이 정의된 속성을 충족하는지 확인하는 과정입니다. 속성은 계약의 동작에 대해 다양한 시나리오에서 참으로 유지될 것으로 예상되는 사실을 나타냅니다—예를 들어, "계약의 산술 연산은 오버플로 또는 언더플로를 발생시키지 않는다"라는 것이 스마트 계약 속성의 예일 수 있습니다.

**정적 분석**과 **동적 분석**은 속성 기반 테스트를 실행하기 위한 두 가지 일반적인 기술이며, 두 기술 모두 프로그램(이 경우 스마트 계약)의 코드가 미리 정의된 속성을 만족하는지 확인할 수 있습니다. 일부 속성 기반 테스트 도구는 예상되는 계약 속성에 대한 미리 정의된 규칙을 제공하며, 코드가 이러한 규칙을 준수하는지 확인합니다. 다른 도구는 스마트 계약에 대한 사용자 지정 속성을 생성할 수 있도록 합니다.

#### 정적 분석 {#static-analysis}

정적 분석 도구는 스마트 계약의 소스 코드를 입력으로 받아 계약이 속성을 충족하는지 여부를 선언하는 결과를 출력합니다. 동적 분석과는 달리, 정적 분석은 계약을 실행하지 않고 올바름을 분석합니다. 정적 분석은 대신 계약이 실행 중에 가질 수 있는 모든 경로를 추론하며(즉, 소스 코드 구조를 검사하여 런타임에 계약의 작동이 어떻게 되는지 결정합니다).

`[린팅](https://www.perforce.com/blog/qac/what-is-linting)`과 `[정적 테스트](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)`는 계약에 대한 정적 분석을 실행하는 일반적인 방법입니다. 두 방법 모두 컴파일러가 출력하는 `[추상 구문 트리](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree)` 및 `[제어 흐름 그래프](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)`와 같은 계약 실행의 저수준 표현을 분석해야 합니다.

대부분의 경우, 정적 분석은 코드에서 안전하지 않은 구조물 사용, 구문 오류 또는 코딩 표준 위반과 같은 안전 문제를 감지하는 데 유용합니다. 그러나 정적 분석기는 더 깊은 취약점을 감지하는 데는 일반적으로 효과적이지 않으며, 과도한 거짓 양성 결과를 생성할 수 있습니다.

#### 동적 분석 {#dynamic-analysis}

동적 분석은 스마트 계약 함수의 `[심볼릭 실행](https://en.m.wikipedia.org/wiki/Symbolic_execution)`에서의 심볼릭 입력이나 `[퍼징](https://owasp.org/www-community/Fuzzing)`에서의 구체적인 입력과 같은 것을 생성하여 실행 추적이 특정 속성을 위반하는지 확인합니다. 이러한 속성 기반 테스트는 테스트 케이스가 여러 시나리오를 포괄하며 프로그램이 테스트 케이스를 생성하는 방식에서 단위 테스트와 다릅니다.

`[퍼징](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing)`은 스마트 계약에서 임의의 속성을 검증하기 위한 동적 분석 기법의 한 예입니다. 퍼저는 정의된 입력 값의 무작위 또는 잘못된 변형으로 대상 계약의 함수를 호출합니다. 스마트 계약이 오류 상태(예: 단언이 실패하는 상태)에 들어가면 문제가 플래그 처리되며 취약한 경로로 실행을 유도하는 입력이 보고서에 생성됩니다.

퍼징은 스마트 계약의 입력 유효성 검사 메커니즘을 평가하는 데 유용합니다. 예상치 못한 입력을 적절히 처리하지 않으면 의도치 않은 실행이 발생하고 위험한 영향을 초래할 수 있기 때문입니다. 이러한 속성 기반 테스트는 여러 이유로 이상적일 수 있습니다:

1. **많은 시나리오를 다루는 테스트 케이스를 작성하는 것은 어렵습니다.** 속성 테스트는 동작을 정의하고 해당 동작을 테스트할 데이터의 범위를 정의하기만 하면 됩니다. 프로그램은 정의된 속성을 기반으로 테스트 케이스를 자동으로 생성합니다.

2. **테스트 스위트가 프로그램 내의 모든 가능한 경로를 충분히 다루지 못할 수 있습니다.** 100%의 커버리지를 달성하더라도 에지 케이스를 놓칠 수 있습니다.

3. **단위 테스트는 샘플 데이터에 대해 계약이 올바르게 실행됨을 증명하지만, 샘플 외부의 입력에 대해 계약이 올바르게 실행되는지는 알 수 없습니다.** 속성 테스트는 주어진 입력 값의 다양한 변형으로 대상 계약을 실행하여 어설션 실패를 유발하는 실행 추적을 찾습니다. 따라서 속성 테스트는 계약이 광범위한 입력 데이터 클래스에 대해 올바르게 실행됨을 더 많이 보장합니다.

### 스마트 계약의 속성 기반 테스트 실행 지침 {#running-property-based-tests}

속성 기반 테스트 실행은 일반적으로 스마트 계약에서 검증하려는 속성(예: `[정수 오버플로](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow)`의 부재) 또는 속성 모음을 정의하는 것으로 시작됩니다. 속성 테스트를 작성할 때 트랜잭션 입력에 대해 프로그램이 생성할 수 있는 값의 범위를 정의해야 할 수도 있습니다.

적절하게 구성된 속성 테스트 도구는 무작위로 생성된 입력을 사용하여 스마트 계약 기능을 실행합니다. 어설션 위반이 있으면 평가 중인 속성을 위반하는 구체적인 입력 데이터를 포함한 보고서를 받을 수 있습니다. 다음 가이드를 통해 다양한 도구로 속성 기반 테스트를 실행하는 방법을 시작할 수 있습니다:

- **[Slither를 사용한 스마트 계약의 정적 분석](https://github.com/crytic/slither)**
- **[Wake를 사용한 스마트 계약의 정적 분석](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownie를 사용한 속성 기반 테스트](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundry를 사용한 계약 퍼징](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[Echidna를 사용한 계약 퍼징](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wake를 사용한 계약 퍼징](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[Manticore를 사용한 스마트 계약의 심볼릭 실행](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythril을 사용한 스마트 계약의 심볼릭 실행](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 스마트 계약의 수동 테스트 {#manual-testing-for-smart-contracts}

스마트 계약의 수동 테스트는 일반적으로 자동화된 테스트를 실행한 후 개발 주기 후반에 수행됩니다. 이 형태의 테스트는 스마트 계약을 하나의 통합된 제품으로 평가하여 기술 요구 사항에 지정된 대로 성능을 발휘하는지 확인합니다.

### 로컬 블록체인에서 계약 테스트하기 {#testing-on-local-blockchain}

로컬 개발 환경에서 수행된 자동화 테스트는 유용한 디버깅 정보를 제공할 수 있지만, 프로덕션 환경에서 스마트 계약이 어떻게 작동하는지 알아야 합니다. 그러나 메인 이더리움 체인에 배포하면 가스 요금이 발생하며, 스마트 계약에 여전히 버그가 있을 경우 실제 돈을 잃을 수도 있습니다.

로컬 블록체인(`[개발 네트워크](/developers/docs/development-networks/)`라고도 함)에서 계약을 테스트하는 것은 메인넷에서 테스트하는 것에 대한 권장 대안입니다. 로컬 블록체인은 컴퓨터에서 로컬로 실행되는 이더리움 블록체인의 사본으로 이더리움의 실행 레이어의 동작을 시뮬레이션합니다. 따라서 상당한 오버헤드 없이 계약과 상호 작용하는 트랜잭션을 프로그래밍할 수 있습니다.

로컬 블록체인에서 계약을 실행하는 것은 수동 통합 테스트의 한 형태로 유용할 수 있습니다. `[스마트 계약은 구성성이 높기 때문에](/developers/docs/smart-contracts/composability/)` 기존 프로토콜과 통합할 수 있습니다. 하지만 이러한 복잡한 온체인 상호 작용이 올바른 결과를 생성하는지 확인해야 합니다.

`[개발 네트워크에 대해 자세히 알아보기](/developers/docs/development-networks/)`

### 테스트넷에서 계약 테스트하기 {#testing-contracts-on-testnets}

테스트 네트워크 또는 테스트넷은 실제 가치가 없는 이더(ETH)를 사용한다는 점을 제외하면 이더리움 메인넷과 똑같이 작동합니다. 계약을 `[테스트넷](/developers/docs/networks/#ethereum-testnets)`에 배포하면 누구나 자금의 위험 없이 계약과 상호 작용할 수 있습니다(예: 탈중앙화앱의 프론트엔드를 통해).

이 형태의 수동 테스트는 애플리케이션의 엔드투엔드 플로우를 사용자의 관점에서 평가하는 데 유용합니다. 여기에서 베타 테스터도 시운전을 수행하고 계약의 비즈니스 논리 및 전반적인 기능과 관련된 문제를 보고할 수 있습니다.

로컬 블록체인에서 테스트한 후 테스트넷에 배포하는 것이 이상적입니다. 테스트넷의 동작이 이더리움 가상 머신과 유사하기 때문입니다. 따라서 많은 이더리움 네이티브 프로젝트가 실제 조건에서 스마트 계약 작동을 평가하기 위해 테스트넷에 dapp을 배포하는 것이 일반적입니다.

`[이더리움 테스트넷에 대해 자세히 알아보기](/developers/docs/development-networks/#public-beacon-testchains)`

## 테스트와 형식 검증 비교 {#testing-vs-formal-verification}

테스트는 특정 데이터 입력에 대해 계약이 예상 결과를 반환하는지 확인하는 데 도움이 되지만, 테스트에 사용되지 않은 입력에 대해 동일한 결과를 확정적으로 입증할 수는 없습니다. 따라서 스마트 계약을 테스트하는 것은 '기능적 정확성'을 보장할 수 없습니다(즉, 프로그램이 `<em>모든</em>` 입력값 세트에 대해 요구되는 대로 동작한다는 것을 보여줄 수 없습니다).

형식 검증은 프로그램의 형식 모델이 형식 명세와 일치하는지 확인하여 소프트웨어의 정확성을 평가하는 접근 방식입니다. 형식 모델은 프로그램의 추상적 수학적 표현이며, 형식 명세는 프로그램의 속성(즉, 프로그램 실행에 대한 논리적 어설션)을 정의합니다.

속성이 수학적 용어로 작성되므로 시스템의 형식(수학적) 모델이 논리적 추론 규칙을 사용하여 명세를 충족하는지 검증할 수 있습니다. 따라서 형식 검증 도구는 시스템의 정확성에 대한 '수학적 증거'를 제공한다고 합니다.

테스트와 달리, 형식 검증은 샘플 데이터로 실행할 필요 없이 `<em>모든</em>` 실행에 대해 스마트 계약 실행이 형식 사양을 만족하는지(즉, 버그가 없는지) 확인하는 데 사용할 수 있습니다. 이는 수많은 단위 테스트를 실행하는 데 걸리는 시간을 줄일 뿐만 아니라 숨겨진 취약점을 잡는 데도 더 효과적입니다. 말하자면, 형식 검증 기술은 구현의 난이도와 유용성에 따라 범위에 따라 다릅니다.

`[스마트 계약의 형식 검증에 대해 자세히 알아보기](/developers/docs/smart-contracts/formal-verification)`

## 테스트와 감사 및 버그 바운티 비교 {#testing-vs-audits-bug-bounties}

앞서 언급했듯이, 엄격한 테스트는 계약에서 버그가 없음을 보장하기 어렵습니다. 형식 검증 접근 방식은 더 강력한 정확성 보증을 제공할 수 있지만, 현재 사용하기 어렵고 상당한 비용이 듭니다.

그럼에도 불구하고 타인으로 하여금 계약을 분석하도록 하여 계약의 취약점을 포착할 가능성을 높일 수 있습니다. `[스마트 계약 감사](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)`와 `[버그 바운티](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)`는 다른 사람이 여러분의 계약을 분석하게 하는 두 가지 방법입니다.

감사는 스마트 계약에서 보안 결함 및 개발 관행의 부족한 사례를 찾는 데 경험이 많은 감사자가 수행합니다. 감사는 테스트(그리고 가능하면 형식 검증)뿐만 아니라 전체 코드베이스에 대한 수동 검토도 포함됩니다.

반대로 버그 바운티 프로그램은 일반적으로 스마트 계약의 취약점을 발견하여 개발자에게 공개하는 개인(`[화이트햇 해커](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>)`라고 흔히 칭함)에게 금전적 보상을 제공하는 것을 포함합니다. 버그 바운티는 스마트 계약에서 결함을 찾는 데 다른 사람의 도움을 요청하는 점에서 감사와 유사합니다.

주요 차이점은 버그 바운티 프로그램이 더 넓은 개발자/해커 커뮤니티에 개방되어 있으며 독특한 기술과 경험을 가진 다양한 윤리적 해커와 독립 보안 전문가들을 끌어들인다는 것입니다. 이것은 제한되거나 좁은 전문 지식을 가진 팀에 의존하는 스마트 계약 감사를 능가하는 장점이 될 수 있습니다.

## 테스트 도구 및 라이브러리 {#testing-tools-and-libraries}

### 단위 테스트 도구 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity로 작성된 스마트 계약을 위한 코드 커버리지 도구입니다._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _고급 스마트 계약 개발 및 테스트를 위한 프레임워크(ethers.js 기반)입니다._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidity 스마트 계약 테스트용 도구입니다._ Remix IDE의 "Solidity Unit Testing" 플러그인을 통해 계약의 테스트 케이스를 작성하고 실행하는 데 사용됩니다._

- **[OpenZeppelin Test Helpers](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _이더리움 스마트 계약 테스트를 위한 어설션 라이브러리입니다._ 계약이 예상대로 작동하는지 확인하세요!_

- **[Brownie 단위 테스트 프레임워크](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie는 기능이 풍부한 테스트 프레임워크인 Pytest를 활용하여 최소한의 코드로 작은 테스트를 작성하고, 대규모 프로젝트에 맞게 확장하며, 높은 확장성을 제공합니다._

- **[Foundry 테스트](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry는 간단한 단위 테스트, 가스 최적화 확인, 계약 퍼징을 실행할 수 있는 빠르고 유연한 이더리움 테스트 프레임워크인 Forge를 제공합니다._

- **[Hardhat 테스트](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _ethers.js, Mocha, Chai를 기반으로 한 스마트 계약 테스트용 프레임워크입니다._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _이더리움 가상 머신을 대상으로 하는 스마트 계약을 위한 Python 기반 개발 및 테스트 프레임워크입니다._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _강력한 디버깅 기능과 교차 체인 테스트를 지원하는 단위 테스트 및 퍼징을 위한 Python 기반 프레임워크로, 최상의 사용자 경험과 성능을 위해 pytest와 Anvil을 활용합니다._

### 속성 기반 테스트 도구 {#property-based-testing-tools}

#### 정적 분석 도구 {#static-analysis-tools}

- **[Slither](https://github.com/crytic/slither)** - _취약점 발견, 코드 이해도 향상, 스마트 계약을 위한 맞춤형 분석 작성을 위한 Python 기반 Solidity 정적 분석 프레임워크입니다._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidity 스마트 계약 프로그래밍 언어에 대한 스타일 및 보안 모범 사례를 적용하기 위한 린터입니다._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Web3 스마트 계약 보안 및 개발을 위해 특별히 설계된 Rust 기반 정적 분석기입니다._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _취약성 및 코드 품질 감지기, 코드에서 유용한 정보를 추출하기 위한 프린터, 맞춤형 하위 모듈 작성을 지원하는 Python 기반 정적 분석 프레임워크입니다._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Solidity를 위한 간단하고 강력한 린터입니다._

#### 동적 분석 도구 {#dynamic-analysis-tools}

- **[Echidna](https://github.com/crytic/echidna/)** - _속성 기반 테스트를 통해 스마트 계약의 취약점을 탐지하는 빠른 계약 퍼저입니다._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _스마트 계약 코드에서 속성 위반을 탐지하는 데 유용한 자동화된 퍼징 도구입니다._

- **[Manticore](https://manticore.readthedocs.io/en/latest/index.html)** - _EVM 바이트코드 분석을 위한 동적 심볼릭 실행 프레임워크입니다._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _테인트 분석, 콘콜릭 분석 및 제어 흐름 검사를 사용하여 계약 취약점을 탐지하는 EVM 바이트코드 평가 도구입니다._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble은 명세 언어이자 런타임 검증 도구로, 스마트 계약에 속성을 주석으로 달아 Diligence Fuzzing이나 MythX와 같은 도구로 계약을 자동으로 테스트할 수 있게 해줍니다._

## 관련 튜토리얼 {#related-tutorials}

- [다양한 테스트 제품 개요 및 비교](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [Echidna를 사용하여 스마트 계약을 테스트하는 방법](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [Manticore를 사용하여 스마트 계약 버그를 찾는 방법](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [Slither를 사용하여 스마트 계약 버그를 찾는 방법](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [테스트를 위해 Solidity 계약을 모의하는 방법](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundry를 사용하여 Solidity에서 단위 테스트를 실행하는 방법](https://www.rareskills.io/post/foundry-testing-solidity)

## 더 읽어보기 {#further-reading}

- [이더리움 스마트 계약 테스트에 대한 심층 가이드](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [이더리움 스마트 계약을 테스트하는 방법](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [MolochDAO의 개발자를 위한 단위 테스트 가이드](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [록스타처럼 스마트 계약을 테스트하는 방법](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)
