---
title: "스마트 컨트랙트 테스트"
description: "이더리움 스마트 컨트랙트 테스트를 위한 기법 및 고려 사항에 대한 개요입니다."
lang: ko
---

이더리움과 같은 퍼블릭 블록체인은 불변이므로 배포 후 스마트 컨트랙트 코드를 변경하기 어렵습니다. "가상 업그레이드"를 수행하기 위한 [컨트랙트 업그레이드 패턴](/developers/docs/smart-contracts/upgrading/)이 존재하지만, 구현하기 어렵고 사회적 합의가 필요합니다. 또한 업그레이드는 오류가 발견된 _이후에만_ 수정할 수 있습니다. 공격자가 취약점을 먼저 발견하면 스마트 컨트랙트가 악용될 위험에 처하게 됩니다.

이러한 이유로 메인넷에 [배포하기](/developers/docs/smart-contracts/deploying/) 전에 스마트 컨트랙트를 테스트하는 것은 [보안](/developers/docs/smart-contracts/security/)을 위한 최소한의 요구 사항입니다. 컨트랙트를 테스트하고 코드의 정확성을 평가하는 기법은 다양하며, 필요에 따라 선택할 수 있습니다. 그럼에도 불구하고 다양한 도구와 접근 방식으로 구성된 테스트 스위트는 컨트랙트 코드의 크고 작은 보안 결함을 모두 잡아내는 데 이상적입니다.

## 전제 조건 {#prerequisites}

이 페이지에서는 이더리움 네트워크에 배포하기 전에 스마트 컨트랙트를 테스트하는 방법을 설명합니다. [스마트 컨트랙트](/developers/docs/smart-contracts/)에 익숙하다고 가정합니다.

## 스마트 컨트랙트 테스트란 무엇인가요? {#what-is-smart-contract-testing}

스마트 컨트랙트 테스트는 스마트 컨트랙트의 코드가 예상대로 작동하는지 검증하는 과정입니다. 테스트는 특정 스마트 컨트랙트가 신뢰성, 사용성 및 보안 요구 사항을 충족하는지 확인하는 데 유용합니다.

접근 방식은 다양하지만, 대부분의 테스트 방법은 처리할 것으로 예상되는 데이터의 작은 샘플로 스마트 컨트랙트를 실행해야 합니다. 컨트랙트가 샘플 데이터에 대해 올바른 결과를 생성하면 제대로 작동하는 것으로 간주됩니다. 대부분의 테스트 도구는 컨트랙트 실행이 예상 결과와 일치하는지 확인하기 위해 [테스트 케이스](https://en.m.wikipedia.org/wiki/Test_case)를 작성하고 실행할 수 있는 리소스를 제공합니다.

### 스마트 컨트랙트를 테스트하는 것이 왜 중요한가요? {#importance-of-testing-smart-contracts}

스마트 컨트랙트는 종종 고가치의 금융 자산을 관리하기 때문에 사소한 프로그래밍 오류가 [사용자에게 막대한 손실](https://rekt.news/leaderboard/)을 초래할 수 있으며 실제로도 자주 발생합니다. 그러나 엄격한 테스트를 통해 스마트 컨트랙트 코드의 결함과 문제를 조기에 발견하고 메인넷에 출시하기 전에 수정할 수 있습니다.

버그가 발견되면 컨트랙트를 업그레이드할 수 있지만, 업그레이드는 복잡하며 부적절하게 처리될 경우 [오류가 발생할 수 있습니다](https://blog.trailofbits.com/2018/09/05/contract-upgrade-anti-patterns/). 컨트랙트를 업그레이드하는 것은 불변성의 원칙을 부정하고 사용자에게 추가적인 신뢰 가정을 부담하게 합니다. 반대로, 컨트랙트 테스트를 위한 포괄적인 계획은 스마트 컨트랙트 보안 위험을 완화하고 배포 후 복잡한 로직 업그레이드를 수행할 필요성을 줄여줍니다.

## 스마트 컨트랙트 테스트 방법 {#methods-for-testing-smart-contracts}

이더리움 스마트 컨트랙트를 테스트하는 방법은 크게 <strong>자동화 테스트</strong>와 **수동 테스트** 두 가지 범주로 나뉩니다. 자동화 테스트와 수동 테스트는 고유한 이점과 장단점을 제공하지만, 두 가지를 결합하여 컨트랙트를 분석하기 위한 강력한 계획을 세울 수 있습니다.

### 자동화 테스트 {#automated-testing}

자동화 테스트는 스마트 컨트랙트 코드의 실행 오류를 자동으로 확인하는 도구를 사용합니다. 자동화 테스트의 이점은 [스크립트](https://www.techtarget.com/whatis/definition/script?amp=1)를 사용하여 컨트랙트 기능 평가를 안내하는 데서 비롯됩니다. 스크립트화된 테스트는 사람의 개입을 최소화하면서 반복적으로 실행되도록 예약할 수 있으므로 수동 테스트 접근 방식보다 자동화 테스트가 더 효율적입니다.

자동화 테스트는 테스트가 반복적이고 시간이 많이 소요되거나, 수동으로 수행하기 어렵거나, 인적 오류가 발생하기 쉽거나, 중요한 컨트랙트 기능을 평가하는 경우에 특히 유용합니다. 그러나 자동화 테스트 도구에는 단점도 있습니다. 특정 버그를 놓치거나 많은 [오탐(false positives)](https://www.contrastsecurity.com/glossary/false-positive)을 생성할 수 있습니다. 따라서 스마트 컨트랙트에 대해 자동화 테스트와 수동 테스트를 병행하는 것이 이상적입니다.

### 수동 테스트 {#manual-testing}

수동 테스트는 사람의 도움을 받아 스마트 컨트랙트의 정확성을 분석할 때 테스트 스위트의 각 테스트 케이스를 차례로 실행하는 것을 포함합니다. 이는 컨트랙트에서 여러 독립된 테스트를 동시에 실행하고 실패 및 통과한 모든 테스트를 보여주는 보고서를 얻을 수 있는 자동화 테스트와는 다릅니다.

수동 테스트는 다양한 테스트 시나리오를 다루는 서면 테스트 계획에 따라 한 개인이 수행할 수 있습니다. 또한 수동 테스트의 일환으로 여러 개인이나 그룹이 지정된 기간 동안 스마트 컨트랙트와 상호 작용하도록 할 수도 있습니다. 테스터는 컨트랙트의 실제 동작을 예상 동작과 비교하여 차이점을 버그로 표시합니다.

효과적인 수동 테스트에는 상당한 리소스(기술, 시간, 비용 및 노력)가 필요하며, 인적 오류로 인해 테스트를 실행하는 동안 특정 오류를 놓칠 수 있습니다. 그러나 수동 테스트도 유익할 수 있습니다. 예를 들어, 사람 테스터(예: 감사자)는 직관을 사용하여 자동화 테스트 도구가 놓칠 수 있는 엣지 케이스를 감지할 수 있습니다.

## 스마트 컨트랙트를 위한 자동화 테스트 {#automated-testing-for-smart-contracts}

### 단위 테스트 {#unit-testing-for-smart-contracts}

단위 테스트는 컨트랙트 기능을 개별적으로 평가하고 각 구성 요소가 올바르게 작동하는지 확인합니다. 좋은 단위 테스트는 간단하고 빠르게 실행되어야 하며, 테스트가 실패할 경우 무엇이 잘못되었는지 명확하게 알 수 있어야 합니다.

단위 테스트는 함수가 예상 값을 반환하는지, 함수 실행 후 컨트랙트 스토리지가 제대로 업데이트되는지 확인하는 데 유용합니다. 또한 컨트랙트 코드베이스를 변경한 후 단위 테스트를 실행하면 새로운 로직을 추가해도 오류가 발생하지 않는지 확인할 수 있습니다. 다음은 효과적인 단위 테스트를 실행하기 위한 몇 가지 지침입니다.

#### 스마트 컨트랙트 단위 테스트 지침 {#unit-testing-guidelines}

##### 1. 컨트랙트의 비즈니스 로직 및 워크플로 이해 {#}

단위 테스트를 작성하기 전에 스마트 컨트랙트가 제공하는 기능과 사용자가 해당 기능에 액세스하고 사용하는 방법을 아는 것이 도움이 됩니다. 이는 유효한 사용자 입력에 대해 컨트랙트의 함수가 올바른 출력을 반환하는지 확인하는 [해피 패스 테스트(happy path tests)](https://en.m.wikipedia.org/wiki/Happy_path)를 실행하는 데 특히 유용합니다. 이 개념을 [경매 컨트랙트](https://docs.soliditylang.org/en/v0.8.17/solidity-by-example.html?highlight=Auction%20contract#simple-open-auction)의 (요약된) 예제를 사용하여 설명하겠습니다.

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

이것은 입찰 기간 동안 입찰을 받도록 설계된 간단한 경매 컨트랙트입니다. `highestBid`가 증가하면 이전 최고 입찰자는 돈을 돌려받고, 입찰 기간이 끝나면 `beneficiary`가 컨트랙트를 호출하여 돈을 받습니다.

이와 같은 컨트랙트의 단위 테스트는 사용자가 컨트랙트와 상호 작용할 때 호출할 수 있는 다양한 기능을 다룹니다. 예를 들어 경매가 진행되는 동안 사용자가 입찰할 수 있는지(즉, `bid()` 호출 성공) 확인하는 단위 테스트나 사용자가 현재 `highestBid`보다 더 높은 입찰가를 제시할 수 있는지 확인하는 단위 테스트가 있습니다.

컨트랙트의 운영 워크플로를 이해하면 실행이 요구 사항을 충족하는지 확인하는 단위 테스트를 작성하는 데도 도움이 됩니다. 예를 들어, 경매 컨트랙트는 경매가 종료되었을 때(즉, `auctionEndTime`가 `block.timestamp`보다 낮을 때) 사용자가 입찰할 수 없도록 지정합니다. 따라서 개발자는 경매가 끝났을 때(즉, `auctionEndTime` > `block.timestamp`일 때) `bid()` 함수 호출이 성공하는지 또는 실패하는지 확인하는 단위 테스트를 실행할 수 있습니다.

##### 2. 컨트랙트 실행과 관련된 모든 가정 평가 {#}

컨트랙트 실행에 대한 모든 가정을 문서화하고 해당 가정의 유효성을 검증하기 위한 단위 테스트를 작성하는 것이 중요합니다. 예상치 못한 실행으로부터 보호하는 것 외에도, 단언(assertion)을 테스트하면 스마트 컨트랙트의 보안 모델을 손상시킬 수 있는 작업에 대해 생각하게 됩니다. 유용한 팁은 "해피 사용자 테스트"를 넘어 잘못된 입력에 대해 함수가 실패하는지 확인하는 네거티브 테스트를 작성하는 것입니다.

많은 단위 테스트 프레임워크를 사용하면 컨트랙트가 할 수 있는 일과 할 수 없는 일을 명시하는 간단한 명령문인 단언을 생성하고, 실행 시 해당 단언이 유지되는지 확인하는 테스트를 실행할 수 있습니다. 앞서 설명한 경매 컨트랙트를 작업하는 개발자는 네거티브 테스트를 실행하기 전에 그 동작에 대해 다음과 같은 단언을 할 수 있습니다.

- 경매가 종료되었거나 시작되지 않았을 때는 사용자가 입찰할 수 없습니다.

- 입찰가가 허용 가능한 임계값 미만인 경우 경매 컨트랙트가 되돌려집니다(revert).

- 입찰에 실패한 사용자에게는 자금이 환불됩니다.

**참고**: 가정을 테스트하는 또 다른 방법은 컨트랙트에서 [함수 제어자(modifier)](https://docs.soliditylang.org/en/v0.8.16/contracts.html#function-modifiers), 특히 `require`, `assert` 및 `if…else` 문을 트리거하는 테스트를 작성하는 것입니다.

##### 3. 코드 커버리지 측정 {#}

[코드 커버리지](https://en.m.wikipedia.org/wiki/Code_coverage)는 테스트 중에 실행된 코드의 분기, 줄 및 명령문 수를 추적하는 테스트 지표입니다. 테스트되지 않은 취약점의 위험을 최소화하려면 테스트의 코드 커버리지가 좋아야 합니다. 커버리지가 충분하지 않으면 모든 테스트가 통과했기 때문에 컨트랙트가 안전하다고 잘못 가정할 수 있으며, 테스트되지 않은 코드 경로에는 여전히 취약점이 존재할 수 있습니다. 그러나 높은 코드 커버리지를 기록하면 스마트 컨트랙트의 모든 명령문/함수가 정확성에 대해 충분히 테스트되었다는 확신을 줍니다.

##### 4. 잘 개발된 테스트 프레임워크 사용 {#}

스마트 컨트랙트의 단위 테스트를 실행하는 데 사용되는 도구의 품질은 매우 중요합니다. 이상적인 테스트 프레임워크는 정기적으로 유지 관리되고, 유용한 기능(예: 로깅 및 보고 기능)을 제공하며, 다른 개발자들이 광범위하게 사용하고 검증한 프레임워크여야 합니다.

Solidity 스마트 컨트랙트를 위한 단위 테스트 프레임워크는 다양한 언어(주로 JavaScript, Python 및 Rust)로 제공됩니다. 다양한 테스트 프레임워크로 단위 테스트를 실행하는 방법에 대한 정보는 아래 가이드 중 일부를 참조하세요.

- **[Brownie로 단위 테스트 실행하기](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)**
- **[Foundry로 단위 테스트 실행하기](https://book.getfoundry.sh/forge/writing-tests)**
- **[Waffle로 단위 테스트 실행하기](https://ethereum-waffle.readthedocs.io/en/latest/getting-started.html#writing-tests)**
- **[Remix로 단위 테스트 실행하기](https://remix-ide.readthedocs.io/en/latest/unittesting.html#write-tests)**
- **[Ape로 단위 테스트 실행하기](https://docs.apeworx.io/ape/stable/userguides/testing.html)**
- **[Hardhat으로 단위 테스트 실행하기](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)**
- **[Wake로 단위 테스트 실행하기](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)**

### 통합 테스트 {#integration-testing-for-smart-contracts}

단위 테스트가 컨트랙트 기능을 독립적으로 디버깅하는 반면, 통합 테스트는 스마트 컨트랙트의 구성 요소를 전체적으로 평가합니다. 통합 테스트는 컨트랙트 간 호출이나 동일한 스마트 컨트랙트 내의 다른 함수 간의 상호 작용에서 발생하는 문제를 감지할 수 있습니다. 예를 들어, 통합 테스트는 [상속](https://docs.soliditylang.org/en/v0.8.12/contracts.html#inheritance) 및 의존성 주입과 같은 기능이 제대로 작동하는지 확인하는 데 도움이 될 수 있습니다.

통합 테스트는 컨트랙트가 모듈식 아키텍처를 채택하거나 실행 중에 다른 온체인 컨트랙트와 인터페이스하는 경우에 유용합니다. 통합 테스트를 실행하는 한 가지 방법은 특정 높이에서 [블록체인을 포크](/glossary/#fork)하고([Forge](https://book.getfoundry.sh/forge/fork-testing) 또는 [Hardhat](https://hardhat.org/hardhat-network/docs/guides/forking-other-networks)과 같은 도구 사용) 컨트랙트와 배포된 컨트랙트 간의 상호 작용을 시뮬레이션하는 것입니다.

포크된 블록체인은 메인넷과 유사하게 작동하며 관련 상태 및 잔액이 있는 계정을 갖게 됩니다. 그러나 샌드박스 처리된 로컬 개발 환경으로만 작동하므로 트랜잭션에 실제 ETH가 필요하지 않으며 변경 사항이 실제 이더리움 프로토콜에 영향을 미치지도 않습니다.

### 속성 기반 테스트 {#property-based-testing-for-smart-contracts}

속성 기반 테스트는 스마트 컨트랙트가 정의된 특정 속성을 충족하는지 확인하는 과정입니다. 속성은 다양한 시나리오에서 참으로 유지될 것으로 예상되는 컨트랙트의 동작에 대한 사실을 단언합니다. 스마트 컨트랙트 속성의 예로는 "컨트랙트의 산술 연산은 절대 오버플로 또는 언더플로되지 않는다"가 있을 수 있습니다.

<strong>정적 분석</strong>과 <strong>동적 분석</strong>은 속성 기반 테스트를 실행하는 두 가지 일반적인 기법이며, 둘 다 프로그램(이 경우 스마트 컨트랙트)의 코드가 미리 정의된 특정 속성을 충족하는지 검증할 수 있습니다. 일부 속성 기반 테스트 도구는 예상되는 컨트랙트 속성에 대해 미리 정의된 규칙과 함께 제공되어 해당 규칙에 따라 코드를 확인하는 반면, 다른 도구는 스마트 컨트랙트에 대한 사용자 지정 속성을 생성할 수 있도록 합니다.

#### 정적 분석 {#static-analysis}

정적 분석기는 스마트 컨트랙트의 소스 코드를 입력으로 받아 컨트랙트가 속성을 충족하는지 여부를 선언하는 결과를 출력합니다. 동적 분석과 달리 정적 분석은 정확성을 분석하기 위해 컨트랙트를 실행하지 않습니다. 대신 정적 분석은 실행 중에 스마트 컨트랙트가 취할 수 있는 모든 가능한 경로를 추론합니다(즉, 소스 코드의 구조를 검사하여 런타임 시 컨트랙트 작동에 어떤 의미가 있는지 결정함).

[린팅(Linting)](https://www.perforce.com/blog/qac/what-is-linting)과 [정적 테스트](https://www.techtarget.com/whatis/definition/static-analysis-static-code-analysis)는 컨트랙트에서 정적 분석을 실행하는 일반적인 방법입니다. 둘 다 컴파일러가 출력하는 [추상 구문 트리(abstract syntax trees)](https://en.m.wikipedia.org/wiki/Abstract_syntax_tree) 및 [제어 흐름 그래프(control flow graphs)](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/amp/)와 같은 컨트랙트 실행의 저수준 표현을 분석해야 합니다.

대부분의 경우 정적 분석은 안전하지 않은 구조의 사용, 구문 오류 또는 컨트랙트 코드의 코딩 표준 위반과 같은 안전 문제를 감지하는 데 유용합니다. 그러나 정적 분석기는 일반적으로 더 깊은 취약점을 감지하는 데 불완전한 것으로 알려져 있으며 과도한 오탐을 생성할 수 있습니다.

#### 동적 분석 {#dynamic-analysis}

동적 분석은 스마트 컨트랙트 함수에 기호 입력(예: [기호 실행(symbolic execution)](https://en.m.wikipedia.org/wiki/Symbolic_execution)) 또는 구체적인 입력(예: [퍼징(fuzzing)](https://owasp.org/www-community/Fuzzing))을 생성하여 실행 추적이 특정 속성을 위반하는지 확인합니다. 이러한 형태의 속성 기반 테스트는 테스트 케이스가 여러 시나리오를 다루고 프로그램이 테스트 케이스 생성을 처리한다는 점에서 단위 테스트와 다릅니다.

[퍼징](https://www.halborn.com/blog/post/what-is-fuzz-testing-fuzzing)은 스마트 컨트랙트의 임의 속성을 검증하기 위한 동적 분석 기법의 한 예입니다. 퍼저는 정의된 입력 값의 무작위 또는 잘못된 변형을 사용하여 대상 컨트랙트의 함수를 호출합니다. 스마트 컨트랙트가 오류 상태(예: 단언이 실패하는 상태)에 들어가면 문제가 표시되고 실행을 취약한 경로로 유도하는 입력이 보고서에 생성됩니다.

예상치 못한 입력을 부적절하게 처리하면 의도하지 않은 실행이 발생하고 위험한 결과를 초래할 수 있으므로 퍼징은 스마트 컨트랙트의 입력 유효성 검사 메커니즘을 평가하는 데 유용합니다. 이러한 형태의 속성 기반 테스트는 여러 가지 이유로 이상적일 수 있습니다.

1. **많은 시나리오를 다루는 테스트 케이스를 작성하는 것은 어렵습니다.** 속성 테스트는 동작과 해당 동작을 테스트할 데이터 범위만 정의하면 됩니다. 프로그램은 정의된 속성을 기반으로 테스트 케이스를 자동으로 생성합니다.

2. **테스트 스위트가 프로그램 내의 모든 가능한 경로를 충분히 다루지 못할 수 있습니다.** 100% 커버리지라도 엣지 케이스를 놓칠 수 있습니다.

3. **단위 테스트는 샘플 데이터에 대해 컨트랙트가 올바르게 실행됨을 증명하지만, 샘플 외부의 입력에 대해 컨트랙트가 올바르게 실행되는지 여부는 알 수 없습니다.** 속성 테스트는 주어진 입력 값의 여러 변형으로 대상 컨트랙트를 실행하여 단언 실패를 일으키는 실행 추적을 찾습니다. 따라서 속성 테스트는 광범위한 입력 데이터 클래스에 대해 컨트랙트가 올바르게 실행된다는 더 많은 보장을 제공합니다.

### 스마트 컨트랙트의 속성 기반 테스트 실행 지침 {#running-property-based-tests}

속성 기반 테스트 실행은 일반적으로 스마트 컨트랙트에서 검증하려는 속성(예: [정수 오버플로](https://github.com/ConsenSys/mythril/wiki/Integer-Overflow) 부재) 또는 속성 모음을 정의하는 것으로 시작됩니다. 속성 테스트를 작성할 때 프로그램이 트랜잭션 입력에 대한 데이터를 생성할 수 있는 값의 범위를 정의해야 할 수도 있습니다.

제대로 구성되면 속성 테스트 도구는 무작위로 생성된 입력으로 스마트 컨트랙트 함수를 실행합니다. 단언 위반이 있는 경우 평가 중인 속성을 위반하는 구체적인 입력 데이터가 포함된 보고서를 받아야 합니다. 다양한 도구로 속성 기반 테스트를 실행하는 방법을 시작하려면 아래 가이드 중 일부를 참조하세요.

- **[슬리더를 사용한 스마트 컨트랙트 정적 분석](https://github.com/crytic/slither)**
- **[Wake를 사용한 스마트 컨트랙트 정적 분석](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)**
- **[Brownie를 사용한 속성 기반 테스트](https://eth-brownie.readthedocs.io/en/stable/tests-hypothesis-property.html)**
- **[Foundry를 사용한 컨트랙트 퍼징](https://book.getfoundry.sh/forge/fuzz-testing)**
- **[에키드나를 사용한 컨트랙트 퍼징](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/echidna#echidna-tutorial)**
- **[Wake를 사용한 컨트랙트 퍼징](https://ackeeblockchain.com/wake/docs/latest/testing-framework/fuzzing/)**
- **[맨티코어를 사용한 스마트 컨트랙트 기호 실행](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore#manticore-tutorial)**
- **[Mythril을 사용한 스마트 컨트랙트 기호 실행](https://mythril-classic.readthedocs.io/en/master/tutorial.html)**

## 스마트 컨트랙트를 위한 수동 테스트 {#manual-testing-for-smart-contracts}

스마트 컨트랙트의 수동 테스트는 종종 자동화 테스트를 실행한 후 개발 주기의 후반부에 이루어집니다. 이러한 형태의 테스트는 스마트 컨트랙트를 하나의 완전히 통합된 제품으로 평가하여 기술 요구 사항에 지정된 대로 수행되는지 확인합니다.

### 로컬 블록체인에서 컨트랙 테스트 {#testing-on-local-blockchain}

로컬 개발 환경에서 수행되는 자동화 테스트는 유용한 디버깅 정보를 제공할 수 있지만, 프로덕션 환경에서 스마트 컨트랙트가 어떻게 동작하는지 알고 싶을 것입니다. 그러나 메인 이더리움 체인에 배포하면 가스 수수료가 발생하며, 스마트 컨트랙트에 여전히 버그가 있는 경우 사용자나 본인이 실제 돈을 잃을 수 있다는 것은 말할 것도 없습니다.

로컬 블록체인([개발 네트워크](/developers/docs/development-networks/)라고도 함)에서 컨트랙트를 테스트하는 것은 메인넷에서 테스트하는 것에 대한 권장 대안입니다. 로컬 블록체인은 컴퓨터에서 로컬로 실행되는 이더리움 블록체인의 복사본으로, 이더리움 실행 계층의 동작을 시뮬레이션합니다. 따라서 상당한 오버헤드를 발생시키지 않고 컨트랙트와 상호 작용하도록 트랜잭션을 프로그래밍할 수 있습니다.

로컬 블록체인에서 컨트랙트를 실행하는 것은 수동 통합 테스트의 한 형태로 유용할 수 있습니다. [스마트 컨트랙트는 조합 가능성이 높기 때문에](/developers/docs/smart-contracts/composability/) 기존 프로토콜과 통합할 수 있지만, 이러한 복잡한 온체인 상호 작용이 올바른 결과를 생성하는지 여전히 확인해야 합니다.

[개발 네트워크에 대해 자세히 알아보기.](/developers/docs/development-networks/)

### 테스트넷에서 컨트랙트 테스트 {#testing-contracts-on-testnets}

테스트 네트워크 또는 테스트넷은 실제 가치가 없는 이더(ETH)를 사용한다는 점을 제외하면 이더리움 메인넷과 똑같이 작동합니다. [테스트넷](/developers/docs/networks/#ethereum-testnets)에 컨트랙트를 배포하면 자금을 위험에 빠뜨리지 않고 누구나(예: 탈중앙화 애플리케이션(dapp)의 프런트엔드를 통해) 컨트랙트와 상호 작용할 수 있습니다.

이러한 형태의 수동 테스트는 사용자 관점에서 애플리케이션의 엔드투엔드 흐름을 평가하는 데 유용합니다. 여기서 베타 테스터는 시험 실행을 수행하고 컨트랙트의 비즈니스 로직 및 전반적인 기능에 대한 문제를 보고할 수도 있습니다.

로컬 블록체인에서 테스트한 후 테스트넷에 배포하는 것이 이상적인데, 이는 테스트넷이 이더리움 가상 머신의 동작에 더 가깝기 때문입니다. 따라서 많은 이더리움 네이티브 프로젝트가 실제 조건에서 스마트 컨트랙트 작동을 평가하기 위해 테스트넷에 디앱(dapp)을 배포하는 것이 일반적입니다.

[이더리움 테스트넷에 대해 자세히 알아보기.](/developers/docs/development-networks/#public-beacon-testchains)

## 테스트 대 정형 검증 {#testing-vs-formal-verification}

테스트는 컨트랙트가 일부 데이터 입력에 대해 예상 결과를 반환하는지 확인하는 데 도움이 되지만, 테스트 중에 사용되지 않은 입력에 대해서도 동일하다는 것을 결정적으로 증명할 수는 없습니다. 따라서 스마트 컨트랙트를 테스트하는 것은 "기능적 정확성"을 보장할 수 없습니다(즉, 프로그램이 _모든_ 입력 값 세트에 대해 요구되는 대로 동작한다는 것을 보여줄 수 없습니다).

정형 검증은 프로그램의 정형 모델이 정형 명세와 일치하는지 확인하여 소프트웨어의 정확성을 평가하는 접근 방식입니다. 정형 모델은 프로그램의 추상적인 수학적 표현인 반면, 정형 명세는 프로그램의 속성(즉, 프로그램 실행에 대한 논리적 단언)을 정의합니다.

속성은 수학적 용어로 작성되기 때문에 논리적 추론 규칙을 사용하여 시스템의 정형(수학적) 모델이 명세를 충족하는지 검증할 수 있습니다. 따라서 정형 검증 도구는 시스템의 정확성에 대한 '수학적 증명'을 생성한다고 합니다.

테스트와 달리 정형 검증은 샘플 데이터로 실행할 필요 없이 스마트 컨트랙 실행이 _모든_ 실행에 대해 정형 명세를 충족하는지(즉, 버그가 없는지) 검증하는 데 사용할 수 있습니다. 이는 수십 개의 단위 테스트를 실행하는 데 소요되는 시간을 줄여줄 뿐만 아니라 숨겨진 취약점을 잡는 데도 더 효과적입니다. 그렇긴 하지만 정형 검증 기법은 구현의 어려움과 유용성에 따라 스펙트럼에 존재합니다.

[스마트 컨트랙트의 정형 검증에 대해 자세히 알아보기.](/developers/docs/smart-contracts/formal-verification)

## 테스트 대 감사 및 버그 바운티 {#testing-vs-audits-bug-bounties}

앞서 언급했듯이 엄격한 테스트가 컨트랙트에 버그가 없음을 보장하는 경우는 거의 없습니다. 정형 검증 접근 방식은 정확성에 대한 더 강력한 보장을 제공할 수 있지만 현재 사용하기 어렵고 상당한 비용이 발생합니다.

그럼에도 불구하고 독립적인 코드 리뷰를 받음으로써 컨트랙트 취약점을 잡을 가능성을 더욱 높일 수 있습니다. [스마트 컨트랙트 감사](https://www.immunebytes.com/blog/what-is-a-smart-contract-audit/)와 [버그 바운티](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)는 다른 사람들이 컨트랙트를 분석하도록 하는 두 가지 방법입니다.

감사는 스마트 컨트랙트의 보안 결함 및 열악한 개발 관행 사례를 찾는 데 경험이 있는 감사자가 수행합니다. 감사에는 일반적으로 전체 코드베이스에 대한 수동 검토뿐만 아니라 테스트(및 가능한 경우 정형 검증)가 포함됩니다.

반대로 버그 바운티 프로그램은 일반적으로 스마트 컨트랙트의 취약점을 발견하고 이를 개발자에게 공개하는 개인(일반적으로 [화이트햇 해커](<https://en.wikipedia.org/wiki/White_hat_(computer_security)>))에게 재정적 보상을 제공하는 것을 포함합니다. 버그 바운티는 다른 사람들에게 스마트 컨트랙트의 결함을 찾는 데 도움을 요청한다는 점에서 감사와 유사합니다.

주요 차이점은 버그 바운티 프로그램이 더 넓은 개발자/해커 커뮤니티에 개방되어 있으며 고유한 기술과 경험을 가진 광범위한 윤리적 해커 및 독립 보안 전문가 클래스를 끌어들인다는 것입니다. 이는 제한적이거나 좁은 전문 지식을 보유할 수 있는 팀에 주로 의존하는 스마트 컨트랙트 감사에 비해 이점이 될 수 있습니다.

## 테스트 도구 및 라이브러리 {#testing-tools-and-libraries}

### 단위 테스트 도구 {#unit-testing-tools}

- **[solidity-coverage](https://github.com/sc-forks/solidity-coverage)** - _Solidity로 작성된 스마트 컨트랙트를 위한 코드 커버리지 도구입니다._

- **[Waffle](https://ethereum-waffle.readthedocs.io/en/latest/)** - _고급 스마트 컨트랙트 개발 및 테스트를 위한 프레임워크입니다(Ethers.js 기반)._

- **[Remix Tests](https://github.com/ethereum/remix-project/tree/master/libs/remix-tests)** - _Solidity 스마트 컨트랙트를 테스트하기 위한 도구입니다. 컨트랙트의 테스트 케이스를 작성하고 실행하는 데 사용되는 Remix IDE "Solidity Unit Testing" 플러그인 아래에서 작동합니다._

- **[오픈제플린 테스트 헬퍼(OpenZeppelin Test Helpers)](https://github.com/OpenZeppelin/openzeppelin-test-helpers)** - _이더리움 스마트 컨트랙트 테스트를 위한 단언 라이브러리입니다. 컨트랙트가 예상대로 작동하는지 확인하세요!_

- **[Brownie 단위 테스트 프레임워크](https://eth-brownie.readthedocs.io/en/v1.0.0_a/tests.html)** - _Brownie는 최소한의 코드로 작은 테스트를 작성할 수 있고, 대규모 프로젝트에 맞게 잘 확장되며, 확장성이 뛰어난 기능이 풍부한 테스트 프레임워크인 Pytest를 활용합니다._

- **[Foundry Tests](https://github.com/foundry-rs/foundry/tree/master/crates/forge)** - _Foundry는 간단한 단위 테스트, 가스 최적화 확인 및 컨트랙트 퍼징을 실행할 수 있는 빠르고 유연한 이더리움 테스트 프레임워크인 Forge를 제공합니다._

- **[Hardhat Tests](https://hardhat.org/hardhat-runner/docs/guides/test-contracts)** - _Ethers.js, Mocha 및 Chai를 기반으로 스마트 컨트랙트를 테스트하기 위한 프레임워크입니다._

- **[ApeWorx](https://docs.apeworx.io/ape/stable/userguides/testing.html)** - _이더리움 가상 머신을 대상으로 하는 스마트 컨트랙트를 위한 Python 기반 개발 및 테스트 프레임워크입니다._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/testing-framework/overview/)** - _최고의 사용자 경험과 성능을 위해 pytest 및 Anvil을 활용하여 강력한 디버깅 기능과 크로스체인 테스트 지원을 갖춘 단위 테스트 및 퍼징을 위한 Python 기반 프레임워크입니다._

### 속성 기반 테스트 도구 {#property-based-testing-tools}

#### 정적 분석 도구 {#static-analysis-tools}

- **[슬리더](https://github.com/crytic/slither)** - _취약점을 찾고, 코드 이해도를 높이며, 스마트 컨트랙트에 대한 사용자 지정 분석을 작성하기 위한 Python 기반 Solidity 정적 분석 프레임워크입니다._

- **[Ethlint](https://ethlint.readthedocs.io/en/latest/)** - _Solidity 스마트 컨트랙트 프로그래밍 언어에 대한 스타일 및 보안 모범 사례를 적용하기 위한 린터입니다._

- **[Cyfrin Aderyn](https://cyfrin.io/tools/aderyn)** - _Web3 스마트 컨트랙트 보안 및 개발을 위해 특별히 설계된 Rust 기반 정적 분석기입니다._

- **[Wake](https://ackeeblockchain.com/wake/docs/latest/static-analysis/using-detectors/)** - _취약점 및 코드 품질 탐지기, 코드에서 유용한 정보를 추출하기 위한 프린터, 사용자 지정 하위 모듈 작성 지원을 갖춘 Python 기반 정적 분석 프레임워크입니다._

- **[Slippy](https://github.com/fvictorio/slippy)** - _Solidity를 위한 간단하고 강력한 린터입니다._

#### 동적 분석 도구 {#dynamic-analysis-tools}

- **[에키드나](https://github.com/crytic/echidna/)** - _속성 기반 테스트를 통해 스마트 컨트랙트의 취약점을 감지하기 위한 빠른 컨트랙트 퍼저입니다._

- **[Diligence Fuzzing](https://consensys.net/diligence/fuzzing/)** - _스마트 컨트랙트 코드에서 속성 위반을 감지하는 데 유용한 자동화된 퍼징 도구입니다._

- **[맨티코어](https://manticore.readthedocs.io/en/latest/index.html)** - _EVM 바이트코드를 분석하기 위한 동적 기호 실행 프레임워크입니다._

- **[Mythril](https://github.com/ConsenSys/mythril-classic)** - _오염 분석(taint analysis), 콘콜릭 분석(concolic analysis) 및 제어 흐름 확인을 사용하여 컨트랙트 취약점을 감지하기 위한 EVM 바이트코드 평가 도구입니다._

- **[Diligence Scribble](https://consensys.net/diligence/scribble/)** - _Scribble은 Diligence Fuzzing 또는 MythX와 같은 도구를 사용하여 컨트랙트를 자동으로 테스트할 수 있는 속성으로 스마트 컨트랙트에 주석을 달 수 있는 명세 언어 및 런타임 검증 도구입니다._

## 관련 튜토리얼 {#related-tutorials}

- [다양한 테스트 제품의 개요 및 비교](/developers/tutorials/guide-to-smart-contract-security-tools/) \_
- [에키드나를 사용하여 스마트 컨트랙트를 테스트하는 방법](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)
- [맨티코어를 사용하여 스마트 컨트랙트 버그를 찾는 방법](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)
- [슬리더를 사용하여 스마트 컨트랙트 버그를 찾는 방법](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)
- [테스트를 위해 Solidity 컨트랙트를 모의(mock)하는 방법](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/)
- [Foundry를 사용하여 Solidity에서 단위 테스트를 실행하는 방법](https://www.rareskills.io/post/foundry-testing-solidity)

## 더 읽어보기 {#further-reading}

- [이더리움 스마트 컨트랙트 테스트에 대한 심층 가이드](https://iamdefinitelyahuman.medium.com/an-in-depth-guide-to-testing-ethereum-smart-contracts-2e41b2770297)
- [이더리움 스마트 컨트랙트를 테스트하는 방법](https://betterprogramming.pub/how-to-test-ethereum-smart-contracts-35abc8fa199d)
- [개발자를 위한 MolochDAO의 단위 테스트 가이드](https://github.com/MolochVentures/moloch/tree/4e786db8a4aa3158287e0935dcbc7b1e43416e38/test#moloch-testing-guide)
- [록스타처럼 스마트 컨트랙트를 테스트하는 방법](https://forum.openzeppelin.com/t/test-smart-contracts-like-a-rockstar/1001)

## 튜토리얼: 이더리움의 스마트 컨트랙트 테스트 {#tutorials}

- [로컬 다중 클라이언트 테스트넷에서 디앱(dApp)을 개발하고 테스트하는 방법](/developers/tutorials/develop-and-test-dapps-with-a-multi-client-local-eth-testnet/) _– 로컬 테스트넷에 스마트 컨트랙트를 배포하고 테스트를 수행하는 연습입니다._
- [테스트를 위해 Solidity 스마트 컨트랙트를 모의(mock)하는 방법](/developers/tutorials/how-to-mock-solidity-contracts-for-testing/) _– 모의 데이터를 사용하고 단위 테스트를 구현하는 방법에 대한 중급 튜토리얼입니다._
- [에키드나를 사용하여 스마트 컨트랙트를 테스트하는 방법](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/) _– 퍼징 및 스마트 컨트랙트 테스트에 대한 고급 접근 방식입니다._