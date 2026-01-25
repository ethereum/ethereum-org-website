---
title: "스마트 콘트랙트 감사"
description: "안전한 이더리움 스마트 계약을 구축하기 위한 가이드라인 개요"
lang: ko
---

스마트 계약은 블록체인에 배포된 코드를 기반으로 변경 불가능한 로직을 실행하면서, 매우 유연하고 막대한 가치와 데이터를 제어할 수 있습니다. 이로 인해 기존 시스템보다 많은 이점을 제공하는 무신뢰 및 탈중앙화 애플리케이션의 활발한 생태계가 조성되었습니다. 또한 스마트 계약의 취약점을 악용하여 이익을 얻으려는 공격자에게는 기회가 되기도 합니다.

이더리움과 같은 퍼블릭 블록체인은 스마트 계약 보안 문제를 더욱 복잡하게 만듭니다. 배포된 계약 코드는 _보통_ 보안 결함을 패치하기 위해 변경될 수 없으며, 스마트 계약에서 도난당한 자산은 불변성 때문에 추적이 매우 어렵고 대부분 복구할 수 없습니다.

수치는 다양하지만, 스마트 계약의 보안 결함으로 인해 도난당하거나 손실된 총 가치는 10억 달러를 훌쩍 넘는 것으로 추정됩니다. 여기에는 [DAO 해킹](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)(360만 ETH 도난, 현재 시가로 10억 달러 이상), [Parity 다중 서명 지갑 해킹](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach)(해커에게 3,000만 달러 손실), [Parity 지갑 동결 문제](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)(3억 달러 이상의 ETH가 영구적으로 동결) 등 세간의 이목을 끈 사건들이 포함됩니다.

앞서 언급한 문제들로 인해 개발자들은 안전하고, 견고하며, 복원력 있는 스마트 계약을 구축하는 데 노력을 기울여야 합니다. 스마트 계약 보안은 중요한 문제이며, 모든 개발자가 잘 배워두면 좋은 것입니다. 이 가이드에서는 이더리움 개발자를 위한 보안 고려 사항을 다루고 스마트 계약 보안을 개선하기 위한 참고 자료를 알아봅니다.

## 필수 구성 요소 {#prerequisites}

보안 문제를 다루기 전에 [스마트 계약 개발의 기초](/developers/docs/smart-contracts/)에 익숙해지도록 하세요.

## 안전한 이더리움 스마트 계약을 구축하기 위한 가이드라인 {#smart-contract-security-guidelines}

### 1. 적절한 접근 제어 설계 {#design-proper-access-controls}

스마트 계약에서 `public` 또는 `external`로 표시된 함수는 모든 외부 소유 계정(EOA) 또는 계약 계정에서 호출할 수 있습니다. 다른 사람이 사용자의 계약과 상호 작용하기를 원한다면 함수에 공용 가시성을 지정해야 합니다. 그러나 `private`로 표시된 함수는 스마트 계약 내의 함수에서만 호출할 수 있으며 외부 계정에서는 호출할 수 없습니다. 모든 네트워크 참여자에게 계약 함수에 대한 접근 권한을 부여하면 문제가 발생할 수 있으며, 특히 누구나 민감한 작업(예: 새로운 토큰 발행)을 수행할 수 있다는 것을 의미하는 경우 더욱 그렇습니다.

스마트 계약 함수의 무단 사용을 방지하려면 안전한 접근 제어를 구현해야 합니다. 접근 제어 메커니즘은 스마트 계약에서 특정 함수를 사용할 수 있는 권한을 계약 관리를 책임지는 계정과 같이 승인된 주체로 제한합니다. **소유 가능 패턴**과 **역할 기반 제어**는 스마트 계약에서 접근 제어를 구현하는 데 유용한 두 가지 패턴입니다.

#### 소유 가능 패턴 {#ownable-pattern}

소유 가능 패턴에서는 계약 생성 과정에서 주소가 계약의 '소유자'로 설정됩니다. 보호된 함수에는 `OnlyOwner` 수정자가 할당되어 계약이 함수를 실행하기 전에 호출 주소의 신원을 인증하도록 합니다. 계약 소유자가 아닌 다른 주소에서 보호된 함수를 호출하면 항상 되돌려지므로 원치 않는 접근을 방지할 수 있습니다.

#### 역할 기반 접근 제어 {#role-based-access-control}

스마트 계약에서 단일 주소를 `Owner`로 등록하면 중앙화의 위험이 발생하고 단일 실패 지점이 됩니다. 소유자의 계정 키가 손상되면 공격자가 소유 계약을 공격할 수 있습니다. 이것이 여러 관리 계정이 있는 역할 기반 접근 제어 패턴을 사용하는 것이 더 나은 선택일 수 있는 이유입니다.

역할 기반 접근 제어에서 민감한 기능에 대한 접근은 신뢰할 수 있는 참여자 집합 간에 분산됩니다. 예를 들어, 한 계정은 토큰 발행을 담당하고 다른 계정은 계약을 업그레이드하거나 일시 중지하는 작업을 수행할 수 있습니다. 이러한 방식으로 접근 제어를 분산하면 단일 실패 지점을 제거하고 사용자에 대한 신뢰 가정을 줄일 수 있습니다.

##### 다중 서명 지갑 사용

안전한 접근 제어를 구현하는 또 다른 방법은 [다중 서명 계정](/developers/docs/smart-contracts/#multisig)을 사용하여 계약을 관리하는 것입니다. 일반 EOA와 달리 다중 서명 계정은 여러 엔티티가 소유하며 트랜잭션을 실행하려면 최소 계정 수(예: 5개 중 3개)의 서명이 필요합니다.

접근 제어에 다중 서명을 사용하면 대상 계약에 대한 조치에 여러 당사자의 동의가 필요하므로 보안 계층이 추가됩니다. 이는 공격자나 불량 내부자가 악의적인 목적으로 민감한 계약 기능을 조작하기 어렵게 만들기 때문에 소유 가능 패턴을 사용하는 것이 필요한 경우 특히 유용합니다.

### 2. require(), assert() 및 revert() 문을 사용하여 계약 작업을 보호하세요 {#use-require-assert-revert}

언급했듯이 스마트 계약이 블록체인에 배포되면 누구나 스마트 계약의 공용 함수를 호출할 수 있습니다. 외부 계정이 계약과 어떻게 상호 작용할지 미리 알 수 없으므로 배포하기 전에 문제가 있는 작업에 대한 내부 보호 장치를 구현하는 것이 이상적입니다. 실행이 특정 요구 사항을 충족하지 못하는 경우 예외를 트리거하고 상태 변경을 되돌리기 위해 `require()`, `assert()` 및 `revert()` 문을 사용하여 스마트 계약에서 올바른 동작을 적용할 수 있습니다.

**`require()`**: `require`는 함수 시작 부분에 정의되며 호출된 함수가 실행되기 전에 미리 정의된 조건이 충족되도록 합니다. `require` 문은 함수를 진행하기 전에 사용자 입력을 검증하거나, 상태 변수를 확인하거나, 호출 계정의 신원을 인증하는 데 사용할 수 있습니다.

**`assert()`**: `assert()`는 내부 오류를 감지하고 코드의 '불변' 위반을 확인하는 데 사용됩니다. 불변은 모든 함수 실행에 대해 사실이어야 하는 계약의 상태에 대한 논리적 주장입니다. 불변의 예는 토큰 계약의 최대 총 공급량 또는 잔액입니다. `assert()`를 사용하면 계약이 취약한 상태에 도달하지 않도록 하고, 만약 그렇게 되면 상태 변수에 대한 모든 변경 사항이 롤백됩니다.

**`revert()`**: `revert()`는 필요한 조건이 충족되지 않으면 예외를 트리거하는 if-else 문에서 사용할 수 있습니다. 아래 샘플 계약은 `revert()`를 사용하여 함수 실행을 보호합니다.

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("제공된 이더가 충분하지 않습니다.");
        // 구매를 수행합니다.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. 스마트 계약 테스트 및 코드 정확성 확인 {#test-smart-contracts-and-verify-code-correctness}

[이더리움 가상 머신](/developers/docs/evm/)에서 실행되는 코드의 불변성은 스마트 계약이 개발 단계에서 더 높은 수준의 품질 평가를 요구함을 의미합니다. 계약을 광범위하게 테스트하고 예기치 않은 결과가 있는지 관찰하면 보안이 크게 향상되고 장기적으로 사용자를 보호할 수 있습니다.

일반적인 방법은 계약이 사용자로부터 받을 것으로 예상되는 모의 데이터를 사용하여 작은 단위 테스트를 작성하는 것입니다. [단위 테스트](/developers/docs/smart-contracts/testing/#unit-testing)는 특정 기능의 기능을 테스트하고 스마트 계약이 예상대로 작동하는지 확인하는 데 좋습니다.

불행히도 단위 테스트는 단독으로 사용될 때 스마트 계약 보안을 향상시키는 데 최소한의 효과만 있습니다. 단위 테스트는 모의 데이터에 대해 함수가 제대로 실행됨을 증명할 수 있지만, 단위 테스트는 작성된 테스트만큼만 효과적입니다. 이로 인해 스마트 계약의 안전을 위협할 수 있는 누락된 엣지 케이스와 취약점을 감지하기가 어렵습니다.

더 나은 접근 방식은 [정적 및 동적 분석](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)을 사용하여 수행되는 속성 기반 테스트와 단위 테스트를 결합하는 것입니다. 정적 분석은 [제어 흐름 그래프](https://en.wikipedia.org/wiki/Control-flow_graph) 및 [추상 구문 트리](https://deepsource.io/glossary/ast/)와 같은 저수준 표현에 의존하여 도달 가능한 프로그램 상태 및 실행 경로를 분석합니다. 한편, [스마트 계약 퍼징](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)과 같은 동적 분석 기술은 임의의 입력 값으로 계약 코드를 실행하여 보안 속성을 위반하는 작업을 감지합니다.

[공식 검증](/developers/docs/smart-contracts/formal-verification)은 스마트 계약의 보안 속성을 검증하는 또 다른 기술입니다. 일반 테스트와 달리 공식 검증은 스마트 계약에 오류가 없음을 결정적으로 증명할 수 있습니다. 이는 원하는 보안 속성을 캡처하는 공식 사양을 만들고 계약의 공식 모델이 이 사양을 준수함을 증명함으로써 달성됩니다.

### 4. 코드에 대한 독립적인 검토를 요청하세요 {#get-independent-code-reviews}

계약을 테스트한 후 다른 사람들에게 소스 코드에 보안 문제가 있는지 확인하도록 요청하는 것이 좋습니다. 테스트를 통해 스마트 계약의 모든 결함을 발견할 수는 없지만 독립적인 검토를 받으면 취약점을 발견할 가능성이 높아집니다.

#### 감사 {#audits}

스마트 계약 감사를 의뢰하는 것은 독립적인 코드 검토를 수행하는 한 가지 방법입니다. 감사자는 스마트 계약이 안전하고 품질 결함 및 설계 오류가 없는지 확인하는 데 중요한 역할을 합니다.

그렇다고 감사를 만병통치약으로 취급해서는 안 됩니다. 스마트 계약 감사는 모든 버그를 잡지 못하며 대부분 추가 검토를 제공하도록 설계되어 개발자가 초기 개발 및 테스트 중에 놓친 문제를 감지하는 데 도움이 될 수 있습니다. 또한 스마트 계약 감사의 이점을 극대화하려면 코드를 적절하게 문서화하고 인라인 주석을 추가하는 등 감사자와 작업하기 위한 모범 사례를 따라야 합니다.

- [스마트 계약 감사 팁 및 요령](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [감사를 최대한 활용하기](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### 버그 포상금 {#bug-bounties}

버그 포상금 프로그램을 설정하는 것은 외부 코드 검토를 구현하는 또 다른 접근 방식입니다. 버그 포상금은 애플리케이션에서 취약점을 발견한 개인(보통 화이트햇 해커)에게 주어지는 금전적 보상입니다.

적절하게 사용하면 버그 포상금은 해커 커뮤니티 구성원에게 코드에 중요한 결함이 있는지 검사하도록 인센티브를 제공합니다. 실제 예는 이더리움에서 실행되는 [레이어 2](/layer-2/) 프로토콜인 [Optimism](https://www.optimism.io/)에서 공격자가 무제한의 이더를 생성할 수 있었던 '무한 돈 버그'입니다. 다행히 화이트햇 해커가 [결함을 발견하고](https://www.saurik.com/optimism.html) 팀에 통보하여 [그 과정에서 큰 포상금을 받았습니다](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

유용한 전략은 이해 관계가 있는 자금의 양에 비례하여 버그 포상금 프로그램의 지불금을 설정하는 것입니다. “[스케일링 버그 포상금](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)”으로 설명되는 이 접근 방식은 개인이 취약점을 악용하는 대신 책임감 있게 공개하도록 재정적 인센티브를 제공합니다.

### 5. 스마트 계약 개발 중 모범 사례 따르기 {#follow-smart-contract-development-best-practices}

감사 및 버그 포상금의 존재가 고품질 코드를 작성해야 할 책임을 면제해주지는 않습니다. 우수한 스마트 계약 보안은 적절한 설계 및 개발 프로세스를 따르는 것에서 시작됩니다.

- git과 같은 버전 제어 시스템에 모든 코드를 저장

- 풀 리퀘스트를 통해 모든 코드 수정하기

- 풀 리퀘스트에 최소 한 명의 독립적인 검토자가 있는지 확인하세요. 프로젝트에서 단독으로 작업하는 경우 다른 개발자를 찾아 코드 검토를 교환하는 것을 고려하세요.

- 스마트 계약 테스트, 컴파일, 배포를 위해 [개발 환경](/developers/docs/frameworks/)을 사용하세요.

- 코드를 [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril 및 Slither와 같은 기본 코드 분석 도구로 실행하세요. 이상적으로는 각 풀 리퀘스트가 병합되기 전에 이 작업을 수행하고 출력의 차이점을 비교해야 합니다.

- 코드가 오류 없이 컴파일되고 솔리디티 컴파일러가 경고를 내보내지 않도록 확인하세요.

- 코드를 ([NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html)을 사용하여) 적절히 문서화하고 계약 아키텍처에 대한 세부 정보를 이해하기 쉬운 언어로 설명하세요. 이렇게 하면 다른 사람들이 코드를 감사하고 검토하기가 더 쉬워집니다.

### 6. 견고한 재해 복구 계획 구현 {#implement-disaster-recovery-plans}

안전한 접근 제어 설계, 기능 수정자 구현 및 기타 제안은 스마트 계약 보안을 향상시킬 수 있지만 악의적인 공격의 가능성을 배제할 수는 없습니다. 안전한 스마트 계약을 구축하려면 '실패에 대비'하고 공격에 효과적으로 대응하기 위한 대체 계획을 마련해야 합니다. 적절한 재해 복구 계획에는 다음 구성 요소의 일부 또는 전부가 포함됩니다.

#### 계약 업그레이드 {#contract-upgrades}

이더리움 스마트 계약은 기본적으로 불변이지만 업그레이드 패턴을 사용하여 어느 정도의 가변성을 달성할 수 있습니다. 계약 업그레이드는 중요한 결함으로 인해 기존 계약을 사용할 수 없게 되고 새로운 로직을 배포하는 것이 가장 실현 가능한 옵션인 경우에 필요합니다.

계약 업그레이드 메커니즘은 다르게 작동하지만 '프록시 패턴'은 스마트 계약 업그레이드를 위한 더 인기 있는 접근 방식 중 하나입니다. [프록시 패턴](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)은 애플리케이션의 상태와 로직을 _두_ 계약으로 나눕니다. 첫 번째 계약('프록시 계약')은 상태 변수(예: 사용자 잔액)를 저장하고, 두 번째 계약('로직 계약')은 계약 기능을 실행하기 위한 코드를 보유합니다.

계정은 프록시 계약과 상호 작용하며, 프록시 계약은 [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 저수준 호출을 사용하여 모든 함수 호출을 로직 계약으로 보냅니다. 일반 메시지 호출과 달리 `delegatecall()`은 로직 계약의 주소에서 실행되는 코드가 호출 계약의 컨텍스트에서 실행되도록 보장합니다. 이는 로직 계약이 항상 자신의 저장 공간 대신 프록시의 저장 공간에 쓰고 `msg.sender` 및 `msg.value`의 원래 값이 보존됨을 의미합니다.

로직 계약에 대한 호출을 위임하려면 해당 주소를 프록시 계약의 저장 공간에 저장해야 합니다. 따라서 계약의 로직을 업그레이드하는 것은 다른 로직 계약을 배포하고 새 주소를 프록시 계약에 저장하는 문제일 뿐입니다. 프록시 계약에 대한 후속 호출은 자동으로 새 로직 계약으로 라우팅되므로 실제로 코드를 수정하지 않고도 계약을 '업그레이드'하게 됩니다.

[계약 업그레이드에 대해 더 알아보기](/developers/docs/smart-contracts/upgrading/).

#### 긴급 중지 {#emergency-stops}

언급했듯이 광범위한 감사 및 테스트로 스마트 계약의 모든 버그를 발견할 수는 없습니다. 배포 후 코드에 취약점이 나타나면 계약 주소에서 실행되는 코드를 변경할 수 없으므로 패치하는 것이 불가능합니다. 또한 업그레이드 메커니즘(예: 프록시 패턴)은 구현하는 데 시간이 걸릴 수 있으며(종종 다른 당사자의 승인이 필요함), 이는 공격자에게 더 많은 피해를 입힐 시간을 줄 뿐입니다.

핵심 옵션은 계약의 취약한 기능에 대한 호출을 차단하는 '긴급 중지' 기능을 구현하는 것입니다. 긴급 중지는 일반적으로 다음 구성 요소로 구성됩니다.

1. 스마트 계약이 중지된 상태인지 여부를 나타내는 전역 부울 변수입니다. 이 변수는 계약 설정 시 `false`로 설정되지만 계약이 중지되면 `true`로 되돌아갑니다.

2. 실행 시 부울 변수를 참조하는 함수. 이러한 함수는 스마트 계약이 중지되지 않았을 때 접근할 수 있으며, 긴급 중지 기능이 트리거되면 접근할 수 없게 됩니다.

3. 부울 변수를 `true`로 설정하는 긴급 중지 기능에 접근할 수 있는 엔티티입니다. 악의적인 행위를 방지하기 위해 이 함수에 대한 호출은 신뢰할 수 있는 주소(예: 계약 소유자)로 제한될 수 있습니다.

계약이 긴급 중지를 활성화하면 특정 함수를 호출할 수 없게 됩니다. 이는 전역 변수를 참조하는 수정자로 선택 함수를 래핑하여 달성됩니다. 아래는 계약에서 이 패턴의 구현을 설명하는 [예제](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)입니다.

```solidity
// 이 코드는 전문적인 감사를 받지 않았으며 안전성이나 정확성에 대해 어떠한 약속도 하지 않습니다. 자신의 책임 하에 사용하세요.

contract EmergencyStop {

    bool isStopped = false;

    modifier stoppedInEmergency {
        require(!isStopped);
        _;
    }

    modifier onlyWhenStopped {
        require(isStopped);
        _;
    }

    modifier onlyAuthorized {
        // 여기에서 msg.sender의 권한을 확인하세요
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // 입금 로직이 여기서 발생합니다
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // 긴급 인출이 여기서 발생합니다
    }
}
```

이 예제는 긴급 중지의 기본 기능을 보여줍니다.

- `isStopped`는 처음에 `false`로 평가되고 계약이 긴급 모드로 들어가면 `true`로 평가되는 부울입니다.

- 함수 수정자 `onlyWhenStopped`와 `stoppedInEmergency`는 `isStopped` 변수를 확인합니다. `stoppedInEmergency`는 계약이 취약할 때 접근할 수 없어야 하는 함수(예: `deposit()`)를 제어하는 데 사용됩니다. 이러한 함수에 대한 호출은 단순히 되돌려집니다.

`onlyWhenStopped`는 긴급 상황 시 호출 가능해야 하는 함수(예: `emergencyWithdraw()`)에 사용됩니다. 이러한 함수는 상황 해결에 도움이 될 수 있으므로 '제한된 함수' 목록에서 제외됩니다.

긴급 중지 기능을 사용하면 스마트 계약의 심각한 취약점을 처리하기 위한 효과적인 임시 방편을 제공합니다. 그러나 사용자가 개발자가 이기적인 이유로 이를 활성화하지 않을 것이라고 신뢰해야 할 필요성이 증가합니다. 이를 위해 온체인 투표 메커니즘, 타임락 또는 다중 서명 지갑의 승인을 통해 긴급 중지 제어를 분산하는 것이 가능한 해결책입니다.

#### 이벤트 모니터링 {#event-monitoring}

[이벤트](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)를 사용하면 스마트 계약 함수에 대한 호출을 추적하고 상태 변수의 변경 사항을 모니터링할 수 있습니다. 어떤 당사자가 안전에 중요한 조치(예: 자금 인출)를 취할 때마다 이벤트를 발생시키도록 스마트 계약을 프로그래밍하는 것이 이상적입니다.

이벤트를 로깅하고 오프체인에서 모니터링하면 계약 운영에 대한 통찰력을 제공하고 악의적인 행동을 더 빨리 발견하는 데 도움이 됩니다. 이는 팀이 해킹에 더 빨리 대응하고 기능 일시 중지 또는 업그레이드 수행과 같은 사용자에게 미치는 영향을 완화하기 위한 조치를 취할 수 있음을 의미합니다.

누군가 계약과 상호 작용할 때마다 자동으로 알림을 전달하는 기성 모니터링 도구를 선택할 수도 있습니다. 이러한 도구를 사용하면 트랜잭션 양, 함수 호출 빈도 또는 관련된 특정 함수와 같은 다양한 트리거를 기반으로 사용자 지정 알림을 만들 수 있습니다. 예를 들어, 단일 트랜잭션에서 인출된 금액이 특정 임계값을 초과할 때 들어오는 알림을 프로그래밍할 수 있습니다.

### 7. 안전한 거버넌스 시스템 설계 {#design-secure-governance-systems}

핵심 스마트 계약의 통제권을 커뮤니티 구성원에게 넘겨 애플리케이션을 분산화할 수 있습니다. 이 경우 스마트 계약 시스템에는 거버넌스 모듈, 즉 커뮤니티 구성원이 온체인 거버넌스 시스템을 통해 관리 조치를 승인할 수 있는 메커니즘이 포함됩니다. 예를 들어, 프록시 계약을 새 구현으로 업그레이드하자는 제안은 토큰 보유자들의 투표에 부쳐질 수 있습니다.

분산형 거버넌스는 특히 개발자와 최종 사용자의 이익을 일치시키기 때문에 유익할 수 있습니다. 그럼에도 불구하고 스마트 계약 거버넌스 메커니즘은 잘못 구현될 경우 새로운 위험을 초래할 수 있습니다. 있을 법한 시나리오는 공격자가 [플래시 론](/defi/#flash-loans)을 이용하여 엄청난 투표권(보유 토큰 수로 측정)을 획득하고 악의적인 제안을 통과시키는 경우입니다.

온체인 거버넌스와 관련된 문제를 예방하는 한 가지 방법은 [타임락을 사용하는 것](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)입니다. 타임락은 스마트 계약이 특정 시간이 지날 때까지 특정 작업을 실행하지 못하도록 합니다. 다른 전략으로는 각 토큰이 잠겨 있던 기간에 따라 '투표 가중치'를 할당하거나, 현재 블록이 아닌 과거의 특정 기간(예: 2-3 블록 전)에 주소의 투표권을 측정하는 것이 있습니다. 두 방법 모두 온체인 투표를 흔들기 위해 투표권을 빠르게 축적할 가능성을 줄여줍니다.

공유된 링크에서 [안전한 거버넌스 시스템 설계](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [DAO의 다양한 투표 메커니즘](https://hackernoon.com/governance-is-the-holy-grail-for-daos) 및 [DeFi를 활용한 일반적인 DAO 공격 벡터](https://dacian.me/dao-governance-defi-attacks)에 대해 더 자세히 알아보세요.

### 8. 코드의 복잡성을 최소화하세요 {#reduce-code-complexity}

기존 소프트웨어 개발자들은 소프트웨어 설계에 불필요한 복잡성을 도입하지 말 것을 권고하는 KISS('keep it simple, stupid') 원칙에 익숙합니다. 이는 '복잡한 시스템은 복잡한 방식으로 실패한다'는 오랜 생각에 따른 것으로, 비용이 많이 드는 오류에 더 취약합니다.

스마트 계약은 잠재적으로 막대한 가치를 제어하므로 스마트 계약을 작성할 때 단순함을 유지하는 것이 특히 중요합니다. 스마트 계약을 작성할 때 단순성을 달성하기 위한 팁은 가능한 경우 [OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)와 같은 기존 라이브러리를 재사용하는 것입니다. 이러한 라이브러리는 개발자들에 의해 광범위하게 감사되고 테스트되었기 때문에, 이를 사용하면 처음부터 새로운 기능을 작성함으로써 버그를 도입할 가능성을 줄일 수 있습니다.

또 다른 일반적인 조언은 작은 함수를 작성하고 비즈니스 로직을 여러 계약에 분산하여 계약을 모듈식으로 유지하는 것입니다. 더 간단한 코드를 작성하면 스마트 계약의 공격 표면을 줄일 수 있을 뿐만 아니라 전체 시스템의 정확성을 추론하고 가능한 설계 오류를 조기에 감지하기가 더 쉬워집니다.

### 9. 일반적인 스마트 계약 취약점 방어 {#mitigate-common-smart-contract-vulnerabilities}

#### 재진입 {#reentrancy}

EVM은 동시성을 허용하지 않으므로 메시지 호출에 관련된 두 계약이 동시에 실행될 수 없습니다. 외부 호출은 호출이 반환될 때까지 호출 계약의 실행과 메모리를 일시 중지하며, 그 시점에서 실행은 정상적으로 진행됩니다. 이 과정은 다른 계약으로 [제어 흐름](https://www.computerhope.com/jargon/c/contflow.htm)을 이전하는 것으로 공식적으로 설명될 수 있습니다.

대부분 무해하지만 신뢰할 수 없는 계약으로 제어 흐름을 이전하면 재진입과 같은 문제가 발생할 수 있습니다. 재진입 공격은 악성 계약이 원래 함수 호출이 완료되기 전에 취약한 계약으로 다시 호출할 때 발생합니다. 이 유형의 공격은 예시를 통해 가장 잘 설명됩니다.

누구나 이더를 입금하고 인출할 수 있는 간단한 스마트 계약('Victim')을 고려해 보세요.

```solidity
// 이 계약은 취약합니다. 프로덕션에서 사용하지 마세요

contract Victim {
    mapping (address => uint256) public balances;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
        balances[msg.sender] = 0;
    }
}
```

이 계약은 사용자가 이전에 계약에 입금한 ETH를 인출할 수 있도록 `withdraw()` 함수를 노출합니다. 인출을 처리할 때 계약은 다음 작업을 수행합니다.

1. 사용자의 ETH 잔액 확인
2. 호출 주소로 자금 전송
3. 사용자의 추가 인출을 방지하기 위해 잔액을 0으로 재설정

`Victim` 계약의 `withdraw()` 함수는 '확인-상호작용-효과' 패턴을 따릅니다. 실행에 필요한 조건이 충족되었는지 _확인_(즉, 사용자가 양의 ETH 잔액을 가지고 있는지)하고, 트랜잭션의 _효과_(즉, 사용자 잔액 감소)를 적용하기 전에 호출자의 주소로 ETH를 전송하여 _상호작용_을 수행합니다.

`withdraw()`가 외부 소유 계정(EOA)에서 호출되면 함수는 예상대로 실행됩니다. `msg.sender.call.value()`는 호출자에게 ETH를 보냅니다. 그러나 `msg.sender`가 스마트 계약 계정이고 `withdraw()`를 호출하면, `msg.sender.call.value()`를 사용하여 자금을 보내는 것은 해당 주소에 저장된 코드를 실행하게 합니다.

이것이 계약 주소에 배포된 코드라고 상상해보세요.

```solidity
 contract Attacker {
    function beginAttack() external payable {
        Victim(victim_address).deposit.value(1 ether)();
        Victim(victim_address).withdraw();
    }

    function() external payable {
        if (gasleft() > 40000) {
            Victim(victim_address).withdraw();
        }
    }
}
```

이 계약은 세 가지를 하도록 설계되었습니다.

1. 다른 계정(공격자의 EOA일 가능성 있음)으로부터 입금 받기
2. Victim 계약에 1 ETH 입금하기
3. 스마트 계약에 저장된 1 ETH 인출하기

여기에는 아무런 문제가 없지만, `Attacker`는 들어오는 `msg.sender.call.value`에서 남은 가스가 40,000 이상이면 `Victim`에서 `withdraw()`를 다시 호출하는 또 다른 함수를 가지고 있습니다. 이는 `Attacker`가 `Victim`에 재진입하여 첫 번째 `withdraw` 호출이 완료되기 _전에_ 더 많은 자금을 인출할 수 있는 능력을 부여합니다. 주기는 다음과 같습니다.

```solidity
- 공격자의 EOA가 1 ETH로 `Attacker.beginAttack()`을 호출합니다
- `Attacker.beginAttack()`이 `Victim`에 1 ETH를 입금합니다
- `Attacker`가 `Victim`에서 `withdraw()`를 호출합니다
- `Victim`이 `Attacker`의 잔액(1 ETH)을 확인합니다
- `Victim`이 `Attacker`에게 1 ETH를 전송합니다(기본 함수를 트리거함)
- `Attacker`가 `Victim.withdraw()`를 다시 호출합니다(`Victim`은 첫 번째 인출에서 `Attacker`의 잔액을 줄이지 않았음에 유의)
- `Victim`이 `Attacker`의 잔액을 확인합니다(첫 번째 호출의 효과를 적용하지 않았기 때문에 여전히 1 ETH임)
- `Victim`이 `Attacker`에게 1 ETH를 전송합니다(기본 함수를 트리거하고 `Attacker`가 `withdraw` 함수에 재진입할 수 있게 함)
- `Attacker`가 가스를 모두 소진할 때까지 프로세스가 반복되며, 그 시점에서 `msg.sender.call.value`는 추가 인출을 트리거하지 않고 반환됩니다
- `Victim`은 마침내 첫 번째 트랜잭션(및 후속 트랜잭션)의 결과를 상태에 적용하므로 `Attacker`의 잔액은 0으로 설정됩니다
```

요약하자면, 함수 실행이 완료될 때까지 호출자의 잔액이 0으로 설정되지 않기 때문에 후속 호출이 성공하여 호출자가 잔액을 여러 번 인출할 수 있게 됩니다. [2016년 DAO 해킹](https://www.coindesk.com/learn/understanding-the-dao-attack)에서 일어난 것처럼, 이러한 종류의 공격은 스마트 계약의 자금을 고갈시키는 데 사용될 수 있습니다. [재진입 공격의 공개 목록](https://github.com/pcaversaccio/reentrancy-attacks)에서 알 수 있듯이, 재진입 공격은 오늘날에도 여전히 스마트 계약의 중요한 문제입니다.

##### 재진입 공격을 예방하는 방법

재진입을 처리하는 한 가지 방법은 [확인-효과-상호작용 패턴](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)을 따르는 것입니다. 이 패턴은 실행을 진행하기 전에 필요한 확인을 수행하는 코드가 먼저 오고, 그 다음 계약 상태를 조작하는 코드가 오고, 마지막으로 다른 계약이나 EOA와 상호작용하는 코드가 오도록 함수 실행 순서를 정합니다.

확인-효과-상호작용 패턴은 아래에 표시된 `Victim` 계약의 수정된 버전에서 사용됩니다.

```solidity
contract NoLongerAVictim {
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        balances[msg.sender] = 0;
        (bool success, ) = msg.sender.call.value(amount)("");
        require(success);
    }
}
```

이 계약은 사용자의 잔액을 _확인_하고, `withdraw()` 함수의 _효과_(사용자 잔액을 0으로 재설정)를 적용한 후 _상호작용_(사용자 주소로 ETH 전송)을 수행합니다. 이를 통해 계약은 외부 호출 전에 저장 공간을 업그레이드하여 첫 번째 공격을 가능하게 했던 재진입 조건을 제거합니다. `Attacker` 계약은 여전히 `NoLongerAVictim`을 다시 호출할 수 있지만, `balances[msg.sender]`가 0으로 설정되었기 때문에 추가 인출은 오류를 발생시킵니다.

또 다른 옵션은 함수 호출이 완료될 때까지 계약 상태의 일부를 잠그는 상호 배제 잠금(일반적으로 '뮤텍스'라고 함)을 사용하는 것입니다. 이는 함수가 실행되기 전에 `true`로 설정되고 호출이 완료된 후 `false`로 되돌아가는 부울 변수를 사용하여 구현됩니다. 아래 예에서 볼 수 있듯이, 뮤텍스를 사용하면 원래 호출이 아직 처리 중인 동안 재귀 호출로부터 함수를 보호하여 재진입을 효과적으로 막을 수 있습니다.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "재진입이 차단되었습니다.");
        locked = true;
        _;
        locked = false;
    }
    // 이 함수는 뮤텍스로 보호되므로 'msg.sender.call' 내에서 재진입 호출을 통해 'withdraw'를 다시 호출할 수 없습니다.
    //  'return'문은 'true'로 평가되지만 여전히 수정자에서 'locked = false'문을 평가합니다
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "인출할 잔액이 없습니다.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

계정으로 자금을 보내는 '푸시 지불' 시스템 대신, 사용자가 스마트 계약에서 자금을 인출해야 하는 [풀 지불](https://docs.openzeppelin.com/contracts/5.x/api/security#PullPayment) 시스템을 사용할 수도 있습니다. 이는 알 수 없는 주소에서 의도치 않게 코드를 트리거할 가능성을 제거하고 특정 서비스 거부 공격을 예방할 수도 있습니다.

#### 정수 언더플로우 및 오버플로우 {#integer-underflows-and-overflows}

정수 오버플로우는 산술 연산의 결과가 허용 가능한 값 범위를 벗어나 가장 낮은 표현 가능한 값으로 '롤오버'될 때 발생합니다. 예를 들어, `uint8`은 2^8-1=255까지의 값만 저장할 수 있습니다. 값이 `255`보다 큰 산술 연산은 오버플로우되어 `uint`를 `0`으로 재설정합니다. 이는 자동차의 주행 거리계가 최대 주행 거리(999999)에 도달하면 0으로 재설정되는 것과 유사합니다.

정수 언더플로우도 비슷한 이유로 발생합니다. 산술 연산의 결과가 허용 가능한 범위 아래로 떨어지는 것입니다. 예를 들어 `uint8`에서 `0`을 감소시키려고 하면 결과는 단순히 표현 가능한 최대값(`255`)으로 롤오버됩니다.

정수 오버플로우와 언더플로우 모두 계약의 상태 변수에 예기치 않은 변경을 초래하고 계획되지 않은 실행을 초래할 수 있습니다. 아래는 공격자가 스마트 계약에서 산술 오버플로우를 악용하여 잘못된 작업을 수행하는 방법을 보여주는 예입니다.

```
pragma solidity ^0.7.6;

// 이 계약은 시간 금고 역할을 하도록 설계되었습니다.
// 사용자는 이 계약에 입금할 수 있지만 최소 일주일 동안은 인출할 수 없습니다.
// 사용자는 1주 대기 기간을 초과하여 대기 시간을 연장할 수도 있습니다.

/*
1. TimeLock 배포
2. TimeLock의 주소로 Attack 배포
3. 1이더를 보내는 Attack.attack 호출. 즉시 이더를 인출할 수 있습니다.

무슨 일이 일어났나요?
Attack은 TimeLock.lockTime을 오버플로우시켜 1주 대기 기간 전에 인출할 수 있었습니다.
*/

contract TimeLock {
    mapping(address => uint) public balances;
    mapping(address => uint) public lockTime;

    function deposit() external payable {
        balances[msg.sender] += msg.value;
        lockTime[msg.sender] = block.timestamp + 1 weeks;
    }

    function increaseLockTime(uint _secondsToIncrease) public {
        lockTime[msg.sender] += _secondsToIncrease;
    }

    function withdraw() public {
        require(balances[msg.sender] > 0, "자금 부족");
        require(block.timestamp > lockTime[msg.sender], "잠금 시간이 만료되지 않았습니다");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "이더 전송 실패");
    }
}

contract Attack {
    TimeLock timeLock;

    constructor(TimeLock _timeLock) {
        timeLock = TimeLock(_timeLock);
    }

    fallback() external payable {}

    function attack() public payable {
        timeLock.deposit{value: msg.value}();
        /*
        t가 현재 잠금 시간이라면 x + t = 2**256 = 0이 되는 x를 찾아야 합니다
        따라서 x = -t
        2**256 = type(uint).max + 1
        따라서 x = type(uint).max + 1 - t
        */
        timeLock.increaseLockTime(
            type(uint).max + 1 - timeLock.lockTime(address(this))
        );
        timeLock.withdraw();
    }
}
```

##### 정수 언더플로우 및 오버플로우 예방 방법

버전 0.8.0부터 솔리디티 컴파일러는 정수 언더플로우 및 오버플로우를 초래하는 코드를 거부합니다. 그러나 더 낮은 컴파일러 버전으로 컴파일된 계약은 산술 연산과 관련된 함수에 대한 확인을 수행하거나 언더플로우/오버플로우를 확인하는 라이브러리(예: [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math))를 사용해야 합니다.

#### 오라클 조작 {#oracle-manipulation}

[오라클](/developers/docs/oracles/)은 오프체인 정보를 소싱하여 스마트 계약이 사용할 수 있도록 온체인으로 보냅니다. 오라클을 사용하면 자본 시장과 같은 오프체인 시스템과 상호 운용되는 스마트 계약을 설계하여 애플리케이션을 크게 확장할 수 있습니다.

그러나 오라클이 손상되어 잘못된 정보를 온체인으로 보내면 스마트 계약은 잘못된 입력을 기반으로 실행되어 문제가 발생할 수 있습니다. 이것이 블록체인 오라클의 정보가 정확하고 최신이며 시기적절한지 확인하는 작업을 다루는 '오라클 문제'의 기초입니다.

관련된 보안 문제는 탈중앙화 거래소와 같은 온체인 오라클을 사용하여 자산의 현물 가격을 얻는 것입니다. [탈중앙화 금융(DeFi)](/defi/) 산업의 대출 플랫폼은 사용자가 얼마나 빌릴 수 있는지 결정하기 위해 사용자의 담보 가치를 결정하기 위해 종종 이 작업을 수행합니다.

DEX 가격은 주로 차익 거래자들이 시장의 균형을 회복하기 때문에 종종 정확합니다. 그러나 특히 온체인 오라클이 역사적 거래 패턴에 따라 자산 가격을 계산하는 경우(보통 그렇듯이) 조작에 개방되어 있습니다.

예를 들어, 공격자는 대출 계약과 상호 작용하기 직전에 플래시 론을 받아 자산의 현물 가격을 인위적으로 부풀릴 수 있습니다. DEX에서 자산 가격을 조회하면 (공격자의 대규모 '매수 주문'이 자산 수요를 왜곡하기 때문에) 평소보다 높은 가치가 반환되어 실제보다 더 많이 빌릴 수 있습니다. 이러한 '플래시 론 공격'은 디파이 애플리케이션 간의 가격 오라클 의존도를 악용하는 데 사용되어 프로토콜에 수백만 달러의 자금 손실을 초래했습니다.

##### 오라클 조작 예방 방법

[오라클 조작을 피하기 위한](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) 최소 요구 사항은 단일 실패 지점을 피하기 위해 여러 소스에서 정보를 쿼리하는 탈중앙화 오라클 네트워크를 사용하는 것입니다. 대부분의 경우 탈중앙화 오라클에는 오라클 노드가 올바른 정보를 보고하도록 장려하는 암호경제적 인센티브가 내장되어 있어 중앙화 오라클보다 더 안전합니다.

자산 가격에 대해 온체인 오라클을 쿼리할 계획이라면 시간 가중 평균 가격(TWAP) 메커니즘을 구현하는 오라클을 사용하는 것을 고려하세요. [TWAP 오라클](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)은 서로 다른 두 시점(수정 가능)에서 자산 가격을 쿼리하고 얻은 평균을 기반으로 현물 가격을 계산합니다. 더 긴 기간을 선택하면 최근에 실행된 대규모 주문이 자산 가격에 영향을 미칠 수 없으므로 프로토콜을 가격 조작으로부터 보호할 수 있습니다.

## 개발자를 위한 스마트 계약 보안 참고 자료 {#smart-contract-security-resources-for-developers}

### 스마트 계약 분석 및 코드 정확성 검증 도구 {#code-analysis-tools}

- **[테스트 도구 및 라이브러리](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _스마트 계약에 대한 단위 테스트, 정적 분석 및 동적 분석을 수행하기 위한 업계 표준 도구 및 라이브러리 모음._

- **[공식 검증 도구](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _스마트 계약의 기능적 정확성을 검증하고 불변을 확인하기 위한 도구._

- **[스마트 계약 감사 서비스](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _이더리움 개발 프로젝트를 위한 스마트 계약 감사 서비스를 제공하는 조직 목록._

- **[버그 포상금 플랫폼](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _버그 포상금을 조정하고 스마트 계약의 중요한 취약점에 대한 책임 있는 공개를 보상하기 위한 플랫폼._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _포크된 계약에 관한 모든 사용 가능한 정보를 확인하기 위한 무료 온라인 도구._

- **[ABI Encoder](https://abi.hashex.org/)** - _솔리디티 계약 기능 및 생성자 인수를 인코딩하기 위한 무료 온라인 서비스._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _추상 구문 트리(AST)를 순회하여 의심되는 취약점을 찾아내고 문제를 쉽게 소비할 수 있는 마크다운 형식으로 출력하는 솔리디티 정적 분석기._

### 스마트 계약 모니터링 도구 {#smart-contract-monitoring-tools}

- **[Tenderly 실시간 알림](https://tenderly.co/monitoring)** - _스마트 계약이나 지갑에서 비정상적이거나 예상치 못한 이벤트가 발생했을 때 실시간 알림을 받기 위한 도구._

### 스마트 계약의 안전한 관리를 위한 도구 {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _이더리움에서 실행되는 스마트 계약 지갑으로, 트랜잭션이 발생하기 전에 최소한의 사람들이 승인해야 합니다(M-of-N)._

- **[OpenZeppelin Contracts](https://docs.openzeppelin.com/contracts/5.x/)** - _계약 소유권, 업그레이드, 접근 제어, 거버넌스, 일시 중지 기능 등을 포함한 관리 기능을 구현하기 위한 계약 라이브러리._

### 스마트 계약 감사 서비스 {#smart-contract-auditing-services}

- **[ConsenSys Diligence](https://diligence.consensys.io/)** - _블록체인 생태계 전반의 프로젝트가 프로토콜을 출시할 준비가 되어 있고 사용자를 보호하도록 구축되었는지 확인하는 데 도움이 되는 스마트 계약 감사 서비스._

- **[CertiK](https://www.certik.com/)** - _스마트 계약 및 블록체인 네트워크에 대한 최첨단 공식 검증 기술 사용을 개척하는 블록체인 보안 회사._

- **[Trail of Bits](https://www.trailofbits.com/)** - _보안 연구와 공격자 사고방식을 결합하여 위험을 줄이고 코드를 강화하는 사이버 보안 회사._

- **[PeckShield](https://peckshield.com/)** - _전체 블록체인 생태계의 보안, 개인 정보 보호 및 유용성을 위한 제품과 서비스를 제공하는 블록체인 보안 회사._

- **[QuantStamp](https://quantstamp.com/)** - _보안 및 위험 평가 서비스를 통해 블록체인 기술의 주류 채택을 촉진하는 감사 서비스._

- **[OpenZeppelin](https://www.openzeppelin.com/security-audits)** - _분산 시스템에 대한 보안 감사를 제공하는 스마트 계약 보안 회사._

- **[Runtime Verification](https://runtimeverification.com/)** - _스마트 계약의 공식 모델링 및 검증을 전문으로 하는 보안 회사._

- **[Hacken](https://hacken.io)** - _360도 접근 방식을 블록체인 보안에 도입하는 웹3 사이버 보안 감사자._

- **[Nethermind](https://www.nethermind.io/smart-contract-audits)** - _솔리디티 및 Cairo 감사 서비스로, 이더리움 및 Starknet 전반에 걸쳐 스마트 계약의 무결성과 사용자 안전을 보장합니다._

- **[HashEx](https://hashex.org/)** - _HashEx는 암호화폐의 보안을 보장하기 위해 블록체인 및 스마트 계약 감사에 중점을 두며, 스마트 계약 개발, 침투 테스트, 블록체인 컨설팅과 같은 서비스를 제공합니다._

- **[Code4rena](https://code4rena.com/)** - _스마트 계약 보안 전문가들이 취약점을 찾아내고 웹3를 더 안전하게 만드는 데 도움을 주도록 인센티브를 제공하는 경쟁적인 감사 플랫폼._

- **[CodeHawks](https://codehawks.com/)** - _보안 연구원들을 위한 스마트 계약 감사 대회를 개최하는 경쟁적인 감사 플랫폼._

- **[Cyfrin](https://cyfrin.io)** - _제품 및 스마트 계약 감사 서비스를 통해 암호화 보안을 육성하는 웹3 보안 강자._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _경험 많은 감사자 팀과 최고 수준의 도구를 통해 블록체인 시스템에 대한 보안 감사를 제공하는 웹3 보안 회사._

- **[Oxorio](https://oxor.io/)** - _암호화 회사 및 디파이 프로젝트를 위한 EVM, 솔리디티, ZK, 크로스체인 기술 전문 지식을 갖춘 스마트 계약 감사 및 블록체인 보안 서비스._

- **[Inference](https://inference.ag/)** - _EVM 기반 블록체인을 위한 스마트 계약 감사를 전문으로 하는 보안 감사 회사._ 전문 감사자 덕분에 잠재적인 문제를 식별하고 배포 전에 이를 해결하기 위한 실행 가능한 해결책을 제안합니다.

### 버그 포상금 플랫폼 {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _스마트 계약 및 디파이 프로젝트를 위한 버그 포상금 플랫폼으로, 보안 연구원들이 코드를 검토하고, 취약점을 공개하고, 보상을 받고, 암호화폐를 더 안전하게 만듭니다._

- **[HackerOne](https://www.hackerone.com/)** - _기업과 침투 테스터 및 사이버 보안 연구원을 연결하는 취약점 조정 및 버그 포상금 플랫폼._

- **[HackenProof](https://hackenproof.com/)** - _암호화 프로젝트(디파이, 스마트 계약, 지갑, CEX 등)를 위한 전문 버그 포상금 플랫폼으로, 보안 전문가들이 분류 서비스를 제공하고 연구원들은 관련 있고 검증된 버그 보고서에 대해 보상을 받습니다._

- **[Sherlock](https://www.sherlock.xyz/)** - _스마트 계약 보안을 위한 웹3의 보험사로, 스마트 계약을 통해 감사자에게 지급되는 보상금을 관리하여 관련 버그가 공정하게 지급되도록 보장합니다._

- **[CodeHawks](https://www.codehawks.com/)** - _감사자들이 보안 대회 및 챌린지에 참여하고 (곧) 자신들의 개인 감사에도 참여하는 경쟁적인 버그 포상금 플랫폼._

### 알려진 스마트 계약 취약점 및 공격 사례 발표 {#common-smart-contract-vulnerabilities-and-exploits}

- **[ConsenSys: 스마트 계약 알려진 공격](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _가장 중요한 계약 취약점에 대한 초보자 친화적인 설명으로, 대부분의 경우에 대한 샘플 코드가 포함되어 있습니다._

- **[SWC 레지스트리](https://swcregistry.io/)** - _이더리움 스마트 계약에 적용되는 공통 취약점 목록(CWE) 항목의 선별된 목록._

- **[Rekt](https://rekt.news/)** - _주목할 만한 암호화폐 해킹 및 공격 사례에 대한 정기적으로 업데이트되는 간행물로, 상세한 사후 보고서가 함께 제공됩니다._

### 스마트 계약 보안 학습을 위한 챌린지 {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _블록체인 보안 워게임, 챌린지 및 [캡처 더 플래그](https://www.webopedia.com/definitions/ctf-event/amp/) 대회 및 솔루션 풀이의 선별된 목록._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _디파이 스마트 계약의 공격적 보안을 배우고 버그 헌팅 및 보안 감사 기술을 구축하기 위한 워게임._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _각 레벨이 '해킹'되어야 하는 스마트 계약인 웹3/솔리디티 기반 워게임._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _판타지 모험을 배경으로 한 스마트 계약 해킹 챌린지._ 챌린지를 성공적으로 완료하면 비공개 버그 포상금 프로그램에 접근할 수도 있습니다.

### 스마트 계약 보안을 위한 모범 사례 {#smart-contract-security-best-practices}

- **[ConsenSys: 이더리움 스마트 계약 보안 모범 사례](https://consensys.github.io/smart-contract-best-practices/)** - _이더리움 스마트 계약 보안을 위한 포괄적인 가이드라인 목록._

- **[Nascent: 단순 보안 툴킷](https://github.com/nascentxyz/simple-security-toolkit)** - _스마트 계약 개발을 위한 실용적인 보안 중심 가이드 및 체크리스트 모음._

- **[솔리디티 패턴](https://fravoll.github.io/solidity-patterns/)** - _스마트 계약 프로그래밍 언어인 솔리디티를 위한 안전한 패턴 및 모범 사례의 유용한 모음집._

- **[솔리디티 문서: 보안 고려 사항](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _솔리디티로 안전한 스마트 계약을 작성하기 위한 가이드라인._

- **[스마트 계약 보안 검증 표준](https://github.com/securing/SCSVS)** - _개발자, 설계자, 보안 검토자 및 공급업체를 위해 스마트 계약의 보안을 표준화하기 위해 만들어진 14개 부분으로 구성된 체크리스트._

- **[스마트 계약 보안 및 감사 학습](https://updraft.cyfrin.io/courses/security)** - _보안 모범 사례를 향상시키고 보안 연구원이 되고자 하는 스마트 계약 개발자를 위해 만들어진 최고의 스마트 계약 보안 및 감사 과정._

### 스마트 계약 보안에 관한 튜토리얼 {#tutorials-on-smart-contract-security}

- [안전한 스마트 계약 작성 방법](/developers/tutorials/secure-development-workflow/)

- [Slither를 사용하여 스마트 계약 버그를 찾는 방법](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [Manticore를 사용하여 스마트 계약 버그를 찾는 방법](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [스마트 계약 보안 가이드라인](/developers/tutorials/smart-contract-security-guidelines/)

- [토큰 계약을 임의의 토큰과 안전하게 통합하는 방법](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - 스마트 계약 보안 및 감사 전체 과정](https://updraft.cyfrin.io/courses/security)
