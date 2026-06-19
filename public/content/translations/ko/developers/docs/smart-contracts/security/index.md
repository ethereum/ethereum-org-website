---
title: "스마트 컨트랙트 보안"
description: "안전한 이더리움 스마트 컨트랙트 구축을 위한 가이드라인 개요"
lang: ko
---

스마트 컨트랙트는 매우 유연하며, 블록체인에 배포된 코드를 기반으로 불변의 로직을 실행하면서 대량의 가치와 데이터를 제어할 수 있습니다. 이는 기존 시스템에 비해 많은 이점을 제공하는 무신뢰 및 탈중앙화된 애플리케이션의 활기찬 생태계를 조성했습니다. 또한 이는 스마트 컨트랙트의 취약점을 악용하여 이익을 얻으려는 공격자들에게 기회가 되기도 합니다.

[이더리움](/)과 같은 퍼블릭 블록체인은 스마트 컨트랙트 보안 문제를 더욱 복잡하게 만듭니다. 배포된 컨트랙트 코드는 보안 결함을 패치하기 위해 _일반적으로_ 변경할 수 없으며, 스마트 컨트랙트에서 도난당한 자산은 추적하기가 매우 어렵고 불변성으로 인해 대부분 복구할 수 없습니다.

수치는 다양하지만, 스마트 컨트랙트의 보안 결함으로 인해 도난당하거나 손실된 가치의 총액은 쉽게 10억 달러를 넘는 것으로 추정됩니다. 여기에는 [DAO 해킹](https://hackingdistributed.com/2016/06/18/analysis-of-the-dao-exploit/)(360만 ETH 도난, 현재 가치로 10억 달러 이상), [Parity 다중 서명 지갑 해킹](https://www.coindesk.com/markets/2017/07/19/30-million-ether-reported-stolen-due-to-parity-wallet-breach)(해커에게 3천만 달러 손실), 그리고 [Parity 동결 지갑 문제](https://www.theguardian.com/technology/2017/nov/08/cryptocurrency-300m-dollars-stolen-bug-ether)(3억 달러 이상의 ETH가 영구적으로 잠김)와 같은 세간의 이목을 끄는 사건들이 포함됩니다.

앞서 언급한 문제들로 인해 개발자는 안전하고 견고하며 복원력 있는 스마트 컨트랙트를 구축하는 데 노력을 기울여야 합니다. 스마트 컨트랙트 보안은 매우 중요한 문제이며, 모든 개발자가 잘 배워두어야 할 분야입니다. 이 가이드에서는 이더리움 개발자를 위한 보안 고려 사항을 다루고 스마트 컨트랙트 보안을 개선하기 위한 리소스를 살펴봅니다.

## 전제 조건 {#prerequisites}

보안을 다루기 전에 [스마트 컨트랙트 개발의 기초](/developers/docs/smart-contracts/)를 숙지하시기 바랍니다.

## 안전한 이더리움 스마트 컨트랙트 구축을 위한 가이드라인 {#smart-contract-security-guidelines}

### 1. 적절한 접근 제어 설계 {#design-proper-access-controls}

스마트 컨트랙트에서 `public` 또는 `external`로 표시된 함수는 모든 외부 소유 계정(EOA)이나 컨트랙트 계정에서 호출할 수 있습니다. 다른 사용자가 컨트랙트와 상호작용할 수 있게 하려면 함수의 가시성을 public으로 지정해야 합니다. 하지만 `private`로 표시된 함수는 외부 계정이 아닌 스마트 컨트랙트 내부의 함수에서만 호출할 수 있습니다. 모든 네트워크 참여자에게 컨트랙트 함수에 대한 접근 권한을 부여하면 문제가 발생할 수 있으며, 특히 누구나 민감한 작업(예: 새로운 토큰 발행)을 수행할 수 있는 경우 더욱 그렇습니다.

스마트 컨트랙트 함수의 무단 사용을 방지하려면 안전한 접근 제어를 구현해야 합니다. 접근 제어 메커니즘은 스마트 컨트랙트의 특정 함수를 사용할 수 있는 권한을 컨트랙트 관리를 담당하는 계정과 같이 승인된 주체로 제한합니다. <strong>Ownable 패턴</strong>과 <strong>역할 기반 제어(role-based control)</strong>는 스마트 컨트랙트에서 접근 제어를 구현하는 데 유용한 두 가지 패턴입니다.

#### Ownable 패턴 {#ownable-pattern}

Ownable 패턴에서는 컨트랙트 생성 과정에서 특정 주소가 컨트랙트의 "소유자(owner)"로 설정됩니다. 보호되는 함수에는 `OnlyOwner` 제어자(modifier)가 할당되며, 이는 컨트랙트가 함수를 실행하기 전에 호출하는 주소의 신원을 인증하도록 보장합니다. 컨트랙트 소유자 이외의 다른 주소에서 보호되는 함수를 호출하면 항상 되돌리기(revert)가 발생하여 원치 않는 접근을 방지합니다.

#### 역할 기반 접근 제어 {#role-based-access-control}

스마트 컨트랙트에서 단일 주소를 `Owner`로 등록하면 중앙화의 위험이 발생하며 단일 장애점(single point-of-failure)이 될 수 있습니다. 소유자의 계정 키가 손상되면 공격자가 해당 컨트랙트를 공격할 수 있습니다. 이것이 여러 관리자 계정을 사용하는 역할 기반 접근 제어 패턴을 사용하는 것이 더 나은 선택일 수 있는 이유입니다.

역할 기반 접근 제어에서는 민감한 함수에 대한 접근 권한이 신뢰할 수 있는 참여자 그룹 간에 분산됩니다. 예를 들어, 한 계정은 토큰 발행을 담당하고 다른 계정은 업그레이드를 수행하거나 컨트랙트를 일시 중지할 수 있습니다. 이런 방식으로 접근 제어를 탈중앙화하면 단일 장애점을 제거하고 사용자의 신뢰 가정을 줄일 수 있습니다.

##### 다중 서명 지갑 사용
안전한 접근 제어를 구현하는 또 다른 방법은 컨트랙트 관리에 [다중 서명 계정](/developers/docs/smart-contracts/#multisig)을 사용하는 것입니다. 일반적인 EOA와 달리 다중 서명 계정은 여러 주체가 소유하며 트랜잭션을 실행하려면 최소한의 계정(예: 5개 중 3개)의 서명이 필요합니다.

접근 제어에 다중서명을 사용하면 대상 컨트랙트에 대한 작업에 여러 당사자의 동의가 필요하므로 추가적인 보안 계층이 도입됩니다. 이는 Ownable 패턴을 사용해야 하는 경우 특히 유용한데, 공격자나 악의적인 내부자가 악의적인 목적으로 민감한 컨트랙트 함수를 조작하는 것을 더 어렵게 만들기 때문입니다.

### 2. require(), assert(), revert() 문을 사용하여 컨트랙트 작업 보호 {#use-require-assert-revert}

앞서 언급했듯이, 스마트 컨트랙트가 블록체인에 배포되면 누구나 public 함수를 호출할 수 있습니다. 외부 계정이 컨트랙트와 어떻게 상호작용할지 미리 알 수 없으므로, 배포 전에 문제가 될 수 있는 작업에 대한 내부 안전장치를 구현하는 것이 이상적입니다. `require()`, `assert()`, `revert()` 문을 사용하여 예외를 발생시키고 실행이 특정 요구 사항을 충족하지 못할 경우 상태 변경을 되돌리기함으로써 스마트 컨트랙트에서 올바른 동작을 강제할 수 있습니다.

**`require()`**: `require`는 함수의 시작 부분에 정의되며 호출된 함수가 실행되기 전에 사전 정의된 조건이 충족되는지 확인합니다. `require` 문은 함수를 진행하기 전에 사용자 입력을 검증하거나, 상태 변수를 확인하거나, 호출하는 계정의 신원을 인증하는 데 사용할 수 있습니다.

**`assert()`**: `assert()`는 내부 오류를 감지하고 코드의 "불변성(invariants)" 위반을 확인하는 데 사용됩니다. 불변성이란 모든 함수 실행에 대해 참이어야 하는 컨트랙트 상태에 대한 논리적 단언입니다. 불변성의 예로는 토큰 컨트랙트의 최대 총 공급량이나 잔액이 있습니다. `assert()`를 사용하면 컨트랙트가 취약한 상태에 도달하지 않도록 보장하며, 만약 도달하더라도 상태 변수에 대한 모든 변경 사항이 롤백됩니다.

**`revert()`**: `revert()`는 필수 조건이 충족되지 않을 경우 예외를 발생시키는 if-else 문에서 사용할 수 있습니다. 아래의 샘플 컨트랙트는 함수의 실행을 보호하기 위해 `revert()`를 사용합니다.

```
pragma solidity ^0.8.4;

contract VendingMachine {
    address owner;
    error Unauthorized();
    function buy(uint amount) public payable {
        if (amount > msg.value / 2 ether)
            revert("Not enough Ether provided.");
        // 구매를 수행합니다.
    }
    function withdraw() public {
        if (msg.sender != owner)
            revert Unauthorized();

        payable(msg.sender).transfer(address(this).balance);
    }
}
```

### 3. 스마트 컨트랙트 테스트 및 코드 정확성 검증 {#test-smart-contracts-and-verify-code-correctness}

[이더리움 가상 머신(EVM)](/developers/docs/evm/)에서 실행되는 코드의 불변성으로 인해 스마트 컨트랙트는 개발 단계에서 더 높은 수준의 품질 평가가 요구됩니다. 컨트랙트를 광범위하게 테스트하고 예상치 못한 결과가 있는지 관찰하면 보안이 크게 향상되고 장기적으로 사용자를 보호할 수 있습니다.

일반적인 방법은 컨트랙트가 사용자로부터 받을 것으로 예상되는 모의 데이터를 사용하여 작은 단위 테스트를 작성하는 것입니다. [단위 테스트](/developers/docs/smart-contracts/testing/#unit-testing)는 특정 함수의 기능을 테스트하고 스마트 컨트랙트가 예상대로 작동하는지 확인하는 데 유용합니다.

안타깝게도 단위 테스트만 단독으로 사용할 경우 스마트 컨트랙트 보안을 향상시키는 데는 최소한의 효과만 있습니다. 단위 테스트는 모의 데이터에 대해 함수가 제대로 실행됨을 증명할 수 있지만, 작성된 테스트만큼만 효과적입니다. 이로 인해 스마트 컨트랙트의 안전성을 깨뜨릴 수 있는 놓친 엣지 케이스(edge cases)와 취약점을 발견하기 어렵습니다.

더 나은 접근 방식은 단위 테스트를 [정적 및 동적 분석](/developers/docs/smart-contracts/testing/#static-dynamic-analysis)을 사용하여 수행되는 속성 기반 테스트(property-based testing)와 결합하는 것입니다. 정적 분석은 도달 가능한 프로그램 상태와 실행 경로를 분석하기 위해 [제어 흐름 그래프(control flow graphs)](https://en.wikipedia.org/wiki/Control-flow_graph) 및 [추상 구문 트리(abstract syntax trees)](https://deepsource.io/glossary/ast/)와 같은 저수준 표현에 의존합니다. 한편, [스마트 컨트랙 퍼징(fuzzing)](https://www.cyfrin.io/blog/smart-contract-fuzzing-and-invariants-testing-foundry)과 같은 동적 분석 기술은 무작위 입력 값으로 컨트랙트 코드를 실행하여 보안 속성을 위반하는 작업을 감지합니다.

[정형 검증](/developers/docs/smart-contracts/formal-verification)은 스마트 컨트랙트의 보안 속성을 검증하는 또 다른 기술입니다. 일반적인 테스트와 달리 정형 검증은 스마트 컨트랙트에 오류가 없음을 결정적으로 증명할 수 있습니다. 이는 원하는 보안 속성을 포착하는 정형 명세(formal specification)를 생성하고 컨트랙트의 정형 모델이 이 명세를 준수함을 증명함으로써 달성됩니다.

### 4. 코드에 대한 독립적인 검토 요청 {#get-independent-code-reviews}

컨트랙트를 테스트한 후에는 다른 사람에게 소스 코드에 보안 문제가 없는지 확인해 달라고 요청하는 것이 좋습니다. 테스트가 스마트 컨트랙트의 모든 결함을 발견하지는 못하지만, 독립적인 검토를 받으면 취약점을 발견할 가능성이 높아집니다.

#### 감사(Audits) {#audits}

스마트 컨트랙트 감사를 의뢰하는 것은 독립적인 코드 검토를 수행하는 한 가지 방법입니다. 감사자는 스마트 컨트랙트가 안전하고 품질 결함 및 설계 오류가 없도록 보장하는 데 중요한 역할을 합니다.

그렇긴 하지만, 감사를 만병통치약으로 취급해서는 안 됩니다. 스마트 컨트랙트 감사가 모든 버그를 잡아내는 것은 아니며, 주로 초기 개발 및 테스트 중에 개발자가 놓친 문제를 감지하는 데 도움이 될 수 있는 추가적인 검토 단계를 제공하도록 설계되었습니다. 또한 스마트 컨트랙트 감사의 이점을 극대화하려면 코드를 적절하게 문서화하고 인라인 주석을 추가하는 등 감사자와 협력하기 위한 모범 사례를 따라야 합니다.

- [스마트 컨트랙트 감사 팁과 요령](https://twitter.com/tinchoabbate/status/1400170232904400897) - _@tinchoabbate_
- [감사 최대한 활용하기](https://inference.ag/blog/2023-08-14-tips/) - _Inference_

#### 버그 바운티 {#bug-bounties}

버그 바운티 프로그램을 설정하는 것은 외부 코드 검토를 구현하는 또 다른 접근 방식입니다. 버그 바운티는 애플리케이션에서 취약점을 발견한 개인(주로 화이트햇 해커)에게 주어지는 재정적 보상입니다.

적절하게 사용될 경우, 버그 바운티는 해커 커뮤니티 구성원들이 코드의 치명적인 결함을 검사하도록 동기를 부여합니다. 실제 사례로는 공격자가 이더리움에서 실행되는 [레이어 2 (l2)](/layer-2/) 프로토콜인 [옵티미즘](https://www.optimism.io/)에서 무제한의 이더를 생성할 수 있었던 "무한 돈 버그(infinite money bug)"가 있습니다. 다행히도 한 화이트햇 해커가 [이 결함을 발견](https://www.saurik.com/optimism.html)하여 팀에 알렸고, [그 과정에서 큰 보상금을 받았습니다](https://cryptoslate.com/critical-bug-in-ethereum-l2-optimism-2m-bounty-paid/).

유용한 전략은 버그 바운티 프로그램의 보상금을 위험에 처한 자금의 양에 비례하여 설정하는 것입니다. "[스케일링 버그 바운티(scaling bug bounty)](https://medium.com/immunefi/a-defi-security-standard-the-scaling-bug-bounty-9b83dfdc1ba7)"라고 불리는 이 접근 방식은 개인이 취약점을 악용하는 대신 책임감 있게 공개하도록 재정적 인센티브를 제공합니다.

### 5. 스마트 컨트랙트 개발 중 모범 사례 준수 {#follow-smart-contract-development-best-practices}

감사와 버그 바운티가 존재한다고 해서 고품질 코드를 작성해야 하는 책임이 면제되는 것은 아닙니다. 훌륭한 스마트 컨트랙트 보안은 적절한 설계 및 개발 프로세스를 따르는 것에서 시작됩니다.

- git과 같은 버전 관리 시스템에 모든 코드를 저장합니다.

- 모든 코드 수정은 풀 리퀘스트(pull requests)를 통해 수행합니다.

- 풀 리퀘스트에 최소 한 명의 독립적인 리뷰어가 있는지 확인합니다. 프로젝트를 혼자 진행하는 경우 다른 개발자를 찾아 코드 리뷰를 교환하는 것을 고려해 보세요.

- 스마트 컨트랙트의 테스트, 컴파일링, 배포를 위해 [개발 환경](/developers/docs/frameworks/)을 사용합니다.

- [Cyfrin Aderyn](https://github.com/Cyfrin/aderyn), Mythril, 슬리더와 같은 기본 코드 분석 도구를 통해 코드를 실행합니다. 이상적으로는 각 풀 리퀘스트가 병합되기 전에 이 작업을 수행하고 출력의 차이를 비교해야 합니다.

- 코드가 오류 없이 컴파일링되고 Solidity 컴파일러에서 경고가 발생하지 않는지 확인합니다.

- 코드를 적절하게 문서화하고([NatSpec](https://solidity.readthedocs.io/en/develop/natspec-format.html) 사용) 이해하기 쉬운 언어로 컨트랙트 아키텍처에 대한 세부 정보를 설명합니다. 이렇게 하면 다른 사람들이 코드를 감사하고 검토하기가 더 쉬워집니다.

### 6. 강력한 재해 복구 계획 구현 {#implement-disaster-recovery-plans}

안전한 접근 제어 설계, 함수 제어자 구현 및 기타 제안 사항은 스마트 컨트랙트 보안을 향상시킬 수 있지만 악의적인 익스플로잇(exploits)의 가능성을 완전히 배제할 수는 없습니다. 안전한 스마트 컨트랙트를 구축하려면 "실패에 대비"하고 공격에 효과적으로 대응하기 위한 대체 계획(fallback plan)을 마련해야 합니다. 적절한 재해 복구 계획에는 다음 구성 요소 중 일부 또는 전체가 포함됩니다.

#### 컨트랙트 업그레이드 {#contract-upgrades}

이더리움 스마트 컨트랙트는 기본적으로 불변이지만, 업그레이드 패턴을 사용하여 어느 정도의 가변성을 달성할 수 있습니다. 치명적인 결함으로 인해 기존 컨트랙트를 사용할 수 없게 되어 새로운 로직을 배포하는 것이 가장 실현 가능한 옵션인 경우 컨트랙트 업그레이드가 필요합니다.

컨트랙트 업그레이드 메커니즘은 다양하게 작동하지만, "프록시 패턴(proxy pattern)"은 스마트 컨트랙트를 업그레이드하는 데 가장 널리 사용되는 접근 방식 중 하나입니다. [프록시 패턴](https://www.cyfrin.io/blog/upgradeable-proxy-smart-contract-pattern)은 애플리케이션의 상태와 로직을 _두 개의_ 컨트랙트로 분리합니다. 첫 번째 컨트랙트('프록시 컨트랙트'라고 함)는 상태 변수(예: 사용자 잔액)를 저장하고, 두 번째 컨트랙트('로직 컨트랙트'라고 함)는 컨트랙트 함수를 실행하기 위한 코드를 보유합니다.

계정은 프록시 컨트랙트와 상호작용하며, 프록시 컨트랙트는 [`delegatecall()`](https://docs.soliditylang.org/en/v0.8.16/introduction-to-smart-contracts.html?highlight=delegatecall#delegatecall-callcode-and-libraries) 저수준 호출을 사용하여 모든 함수 호출을 로직 컨트랙트로 전달합니다. 일반적인 메시지 호출과 달리 `delegatecall()`는 로직 컨트랙트의 주소에서 실행되는 코드가 호출하는 컨트랙트의 컨텍스트에서 실행되도록 보장합니다. 즉, 로직 컨트랙트는 항상 (자신의 스토리지가 아닌) 프록시의 스토리지에 기록하며 `msg.sender` 및 `msg.value`의 원래 값이 보존됩니다.

로직 컨트랙트에 호출을 위임하려면 프록시 컨트랙트의 스토리지에 해당 주소를 저장해야 합니다. 따라서 컨트랙트의 로직을 업그레이드하는 것은 단순히 다른 로직 컨트랙트를 배포하고 프록시 컨트랙트에 새 주소를 저장하는 문제일 뿐입니다. 프록시 컨트랙트에 대한 후속 호출이 자동으로 새 로직 컨트랙트로 라우팅되므로, 코드를 실제로 수정하지 않고도 컨트랙트를 "업그레이드"한 것이 됩니다.

[컨트랙트 업그레이드에 대해 더 알아보기](/developers/docs/smart-contracts/upgrading/).

#### 비상 정지(Emergency stops) {#emergency-stops}

앞서 언급했듯이, 광범위한 감사와 테스트로도 스마트 컨트랙트의 모든 버그를 발견할 수는 없습니다. 배포 후 코드에 취약점이 나타나면 컨트랙트 주소에서 실행되는 코드를 변경할 수 없으므로 패치하는 것이 불가능합니다. 또한 업그레이드 메커니즘(예: 프록시 패턴)을 구현하는 데 시간이 걸릴 수 있으며(종종 여러 당사자의 승인이 필요함), 이는 공격자에게 더 많은 피해를 입힐 수 있는 시간을 줄 뿐입니다.

최후의 수단은 컨트랙트의 취약한 함수에 대한 호출을 차단하는 "비상 정지" 함수를 구현하는 것입니다. 비상 정지는 일반적으로 다음 구성 요소로 이루어집니다.

1. 스마트 컨트랙트가 정지 상태인지 여부를 나타내는 전역 부울(Boolean) 변수. 이 변수는 컨트랙트를 설정할 때 `false`로 설정되지만, 컨트랙트가 정지되면 `true`로 되돌아갑니다.

2. 실행 시 부울 변수를 참조하는 함수. 이러한 함수는 스마트 컨트랙트가 정지되지 않았을 때 접근할 수 있으며, 비상 정지 기능이 트리거되면 접근할 수 없게 됩니다.

3. 부울 변수를 `true`로 설정하는 비상 정지 함수에 접근할 수 있는 주체. 악의적인 행동을 방지하기 위해 이 함수에 대한 호출을 신뢰할 수 있는 주소(예: 컨트랙트 소유자)로 제한할 수 있습니다.

컨트랙트가 비상 정지를 활성화하면 특정 함수를 호출할 수 없게 됩니다. 이는 전역 변수를 참조하는 제어자로 선택한 함수를 래핑하여 달성됩니다. 아래는 컨트랙트에서 이 패턴의 구현을 설명하는 [예시](https://github.com/fravoll/solidity-patterns/blob/master/EmergencyStop/EmergencyStop.sol)입니다.

```solidity
// 이 코드는 전문적인 감사를 받지 않았으며 안전성이나 정확성에 대해 어떠한 보장도 하지 않습니다. 본인의 책임하에 사용하십시오.

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
        // 여기서 msg.sender의 권한을 확인합니다.
        _;
    }

    function stopContract() public onlyAuthorized {
        isStopped = true;
    }

    function resumeContract() public onlyAuthorized {
        isStopped = false;
    }

    function deposit() public payable stoppedInEmergency {
        // 여기서 입금 로직이 실행됩니다.
    }

    function emergencyWithdraw() public onlyWhenStopped {
        // 여기서 긴급 출금이 실행됩니다.
    }
}
```

이 예시는 비상 정지의 기본 기능을 보여줍니다.

- `isStopped`는 처음에는 `false`로 평가되고 컨트랙트가 비상 모드에 들어가면 `true`로 평가되는 부울입니다.

- 함수 제어자 `onlyWhenStopped` 및 `stoppedInEmergency`는 `isStopped` 변수를 확인합니다. `stoppedInEmergency`는 컨트랙트가 취약할 때 접근할 수 없어야 하는 함수(예: `deposit()`)를 제어하는 데 사용됩니다. 이러한 함수에 대한 호출은 단순히 되돌리기(revert)됩니다.

`onlyWhenStopped`는 비상 상황 중에 호출할 수 있어야 하는 함수(예: `emergencyWithdraw()`)에 사용됩니다. 이러한 함수는 상황을 해결하는 데 도움이 될 수 있으므로 "제한된 함수" 목록에서 제외됩니다.

비상 정지 기능을 사용하면 스마트 컨트랙트의 심각한 취약점을 처리하기 위한 효과적인 임시방편을 제공합니다. 그러나 사용자가 개발자가 이기적인 이유로 이를 활성화하지 않을 것이라고 신뢰해야 할 필요성이 커집니다. 이를 위해 온체인 투표 메커니즘, 타임락(timelock) 또는 다중서명 지갑의 승인을 거치도록 하여 비상 정지의 제어를 탈중앙화하는 것이 가능한 해결책입니다.

#### 이벤트 모니터링 {#event-monitoring}

[이벤트](https://docs.soliditylang.org/en/v0.8.15/contracts.html#events)를 사용하면 스마트 컨트랙트 함수에 대한 호출을 추적하고 상태 변수의 변경 사항을 모니터링할 수 있습니다. 누군가가 안전에 중요한 작업(예: 자금 인출)을 수행할 때마다 이벤트를 발생시키도록 스마트 컨트랙트를 프로그래밍하는 것이 이상적입니다.

이벤트를 로깅하고 오프체인에서 모니터링하면 컨트랙트 작업에 대한 통찰력을 제공하고 악의적인 행동을 더 빨리 발견하는 데 도움이 됩니다. 즉, 팀이 해킹에 더 빠르게 대응하고 함수 일시 중지 또는 업그레이드 수행과 같이 사용자에게 미치는 영향을 완화하기 위한 조치를 취할 수 있습니다.

누군가 컨트랙트와 상호작용할 때마다 자동으로 알림을 전달하는 기성 모니터링 도구를 선택할 수도 있습니다. 이러한 도구를 사용하면 트랜잭션 볼륨, 함수 호출 빈도 또는 관련된 특정 함수와 같은 다양한 트리거를 기반으로 사용자 지정 알림을 생성할 수 있습니다. 예를 들어, 단일 트랜잭션에서 인출된 금액이 특정 임계값을 초과할 때 들어오는 알림을 프로그래밍할 수 있습니다.

### 7. 안전한 거버넌스 시스템 설계 {#design-secure-governance-systems}

핵심 스마트 컨트랙트의 제어권을 커뮤니티 구성원에게 넘겨 애플리케이션을 탈중앙화하고 싶을 수 있습니다. 이 경우 스마트 컨트랙트 시스템에는 커뮤니티 구성원이 온체인 거버넌스 시스템을 통해 관리 작업을 승인할 수 있는 메커니즘인 거버넌스 모듈이 포함됩니다. 예를 들어, 프록시 컨트랙트를 새로운 구현으로 업그레이드하려는 제안에 대해 토큰 보유자가 투표할 수 있습니다.

탈중앙화된 거버넌스는 특히 개발자와 최종 사용자의 이익을 일치시키기 때문에 유익할 수 있습니다. 그럼에도 불구하고 스마트 컨트랙 거버넌스 메커니즘이 잘못 구현되면 새로운 위험이 발생할 수 있습니다. 그럴듯한 시나리오는 공격자가 [플래시 론](/defi/#flash-loans)을 받아 막대한 투표권(보유한 토큰 수로 측정)을 획득하고 악의적인 제안을 통과시키는 경우입니다.

온체인 거버넌스와 관련된 문제를 예방하는 한 가지 방법은 [타임락을 사용하는 것](https://blog.openzeppelin.com/protect-your-users-with-smart-contract-timelocks/)입니다. 타임락은 특정 시간이 지날 때까지 스마트 컨트랙트가 특정 작업을 실행하는 것을 방지합니다. 다른 전략으로는 토큰이 잠긴 기간에 따라 각 토큰에 "투표 가중치"를 할당하거나, 현재 블록 대신 과거의 특정 시점(예: 과거 2\~3 블록)에서 주소의 투표권을 측정하는 방법이 있습니다. 두 방법 모두 온체인 투표를 좌우하기 위해 투표권을 빠르게 축적할 가능성을 줄여줍니다.

공유된 링크에서 [안전한 거버넌스 시스템 설계](https://blog.openzeppelin.com/smart-contract-security-guidelines-4-strategies-for-safer-governance-systems/), [DAO의 다양한 투표 메커니즘](https://hackernoon.com/governance-is-the-holy-grail-for-daos), [탈중앙화 금융 (DeFi)을 활용한 일반적인 DAO 공격 벡터](https://dacian.me/dao-governance-defi-attacks)에 대해 자세히 알아보세요.

### 8. 코드의 복잡성을 최소화 {#reduce-code-complexity}

전통적인 소프트웨어 개발자들은 소프트웨어 설계에 불필요한 복잡성을 도입하지 말라고 조언하는 KISS("keep it simple, stupid") 원칙에 익숙합니다. 이는 "복잡한 시스템은 복잡한 방식으로 실패한다"는 오랜 생각에 따른 것이며, 비용이 많이 드는 오류에 더 취약합니다.

스마트 컨트랙트가 잠재적으로 많은 양의 가치를 제어한다는 점을 고려할 때, 스마트 컨트랙트를 작성할 때 단순성을 유지하는 것은 특히 중요합니다. 스마트 컨트랙트를 작성할 때 단순성을 달성하기 위한 팁은 가능한 경우 [오픈제플린 컨트랙트(OpenZeppelin Contracts)](https://docs.openzeppelin.com/contracts/5.x/)와 같은 기존 라이브러리를 재사용하는 것입니다. 이러한 라이브러리는 개발자들에 의해 광범위하게 감사되고 테스트되었기 때문에, 이를 사용하면 처음부터 새로운 기능을 작성하여 버그를 도입할 가능성이 줄어듭니다.

또 다른 일반적인 조언은 작은 함수를 작성하고 비즈니스 로직을 여러 컨트랙트로 분할하여 컨트랙트를 모듈화하는 것입니다. 더 단순한 코드를 작성하면 스마트 컨트랙트의 공격 표면(attack surface)이 줄어들 뿐만 아니라 전체 시스템의 정확성을 추론하고 가능한 설계 오류를 조기에 발견하기가 더 쉬워집니다.

### 9. 일반적인 스마트 컨트랙트 취약점 방어 {#mitigate-common-smart-contract-vulnerabilities}

#### 재진입(Reentrancy) {#reentrancy}

EVM은 동시성(concurrency)을 허용하지 않으므로 메시지 호출에 관련된 두 컨트랙트가 동시에 실행될 수 없습니다. 외부 호출은 호출이 반환될 때까지 호출하는 컨트랙트의 실행과 메모리를 일시 중지하며, 반환 시점에 실행이 정상적으로 진행됩니다. 이 과정은 공식적으로 [제어 흐름(control flow)](https://www.computerhope.com/jargon/c/contflow.htm)을 다른 컨트랙트로 전송하는 것으로 설명할 수 있습니다.

대부분 무해하지만, 신뢰할 수 없는 컨트랙트로 제어 흐름을 전송하면 재진입과 같은 문제가 발생할 수 있습니다. 재진입 공격은 원래의 함수 호출이 완료되기 전에 악의적인 컨트랙트가 취약한 컨트랙트를 다시 호출할 때 발생합니다. 이러한 유형의 공격은 예시를 통해 가장 잘 설명할 수 있습니다.

누구나 이더를 입금하고 인출할 수 있는 간단한 스마트 컨트랙트('Victim')를 생각해 보겠습니다.

```solidity
// 이 컨트랙트는 취약합니다. 프로덕션 환경에서 사용하지 마십시오.

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

이 컨트랙트는 사용자가 이전에 컨트랙트에 입금한 ETH를 인출할 수 있도록 `withdraw()` 함수를 노출합니다. 인출을 처리할 때 컨트랙트는 다음 작업을 수행합니다.

1. 사용자의 ETH 잔액 확인
2. 호출하는 주소로 자금 전송
3. 잔액을 0으로 재설정하여 사용자의 추가 인출 방지

`Victim` 컨트랙트의 `withdraw()` 함수는 "확인-상호작용-효과(checks-interactions-effects)" 패턴을 따릅니다. 실행에 필요한 조건이 충족되는지 <em>확인(checks)</em>하고(즉, 사용자의 ETH 잔액이 양수인지), 트랜잭션의 <em>효과(effects)</em>를 적용하기 전에(즉, 사용자의 잔액 감소) 호출자의 주소로 ETH를 전송하여 <em>상호작용(interaction)</em>을 수행합니다.

외부 소유 계정(EOA)에서 `withdraw()`가 호출되면 함수는 예상대로 실행됩니다. `msg.sender.call.value()`는 호출자에게 ETH를 전송합니다. 그러나 `msg.sender`가 스마트 컨트랙트 계정이고 `withdraw()`를 호출하는 경우, `msg.sender.call.value()`를 사용하여 자금을 전송하면 해당 주소에 저장된 코드도 실행되도록 트리거됩니다.

컨트랙트 주소에 배포된 코드가 다음과 같다고 상상해 보세요.

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

이 컨트랙트는 세 가지 작업을 수행하도록 설계되었습니다.

1. 다른 계정(아마도 공격자의 EOA)으로부터 입금 수락
2. Victim 컨트랙트에 1 ETH 입금
3. 스마트 컨트랙트에 저장된 1 ETH 인출

들어오는 `msg.sender.call.value`에서 남은 가스가 40,000보다 많을 경우 `Attacker`에 `Victim`의 `withdraw()`를 다시 호출하는 또 다른 함수가 있다는 점을 제외하면 여기에는 아무런 문제가 없습니다. 이로 인해 `Attacker`는 `withdraw`의 첫 번째 호출이 완료되기 _전에_ `Victim`에 재진입하여 더 많은 자금을 인출할 수 있는 능력을 갖게 됩니다. 그 주기는 다음과 같습니다.

```solidity
- Attacker's EOA calls `Attacker.beginAttack()` with 1 ETH
- `Attacker.beginAttack()` deposits 1 ETH into `Victim`
- `Attacker` calls `withdraw() in `Victim`
- `Victim` checks `Attacker`’s balance (1 ETH)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function)
- `Attacker` calls `Victim.withdraw()` again (note that `Victim` hasn’t reduced `Attacker`’s balance from the first withdrawal)
- `Victim` checks `Attacker`’s balance (which is still 1 ETH because it hasn’t applied the effects of the first call)
- `Victim` sends 1 ETH to `Attacker` (which triggers the default function and allows `Attacker` to reenter the `withdraw` function)
- The process repeats until `Attacker` runs out of gas, at which point `msg.sender.call.value` returns without triggering additional withdrawals
- `Victim` finally applies the results of the first transaction (and subsequent ones) to its state, so `Attacker`’s balance is set to 0
```

요약하자면, 함수 실행이 완료될 때까지 호출자의 잔액이 0으로 설정되지 않기 때문에 후속 호출이 성공하고 호출자가 잔액을 여러 번 인출할 수 있게 됩니다. 이러한 종류의 공격은 [2016년 DAO 해킹](https://www.coindesk.com/learn/understanding-the-dao-attack)에서 발생했던 것처럼 스마트 컨트랙트의 자금을 고갈시키는 데 사용될 수 있습니다. [재진입 익스플로잇의 공개 목록](https://github.com/pcaversaccio/reentrancy-attacks)에서 볼 수 있듯이 재진입 공격은 오늘날에도 여전히 스마트 컨트랙트의 중요한 문제입니다.

##### 재진입 공격을 방지하는 방법
재진입을 처리하는 한 가지 접근 방식은 [확인-효과-상호작용(checks-effects-interactions) 패턴](https://docs.soliditylang.org/en/develop/security-considerations.html#use-the-checks-effects-interactions-pattern)을 따르는 것입니다. 이 패턴은 실행을 진행하기 전에 필요한 확인을 수행하는 코드가 먼저 오고, 그 다음 컨트랙트 상태를 조작하는 코드가 오며, 다른 컨트랙트나 EOA와 상호작용하는 코드가 마지막에 오도록 함수의 실행 순서를 지정합니다.

확인-효과-상호작용 패턴은 아래에 표시된 `Victim` 컨트랙트의 수정된 버전에 사용됩니다.

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

이 컨트랙트는 사용자의 잔액을 <em>확인(check)</em>하고, (사용자의 잔액을 0으로 재설정하여) `withdraw()` 함수의 <em>효과(effects)</em>를 적용한 다음, _상호작용(interaction)_ (사용자의 주소로 ETH 전송)을 수행합니다. 이렇게 하면 외부 호출 전에 컨트랙트가 스토리지를 업데이트하도록 보장하여 첫 번째 공격을 가능하게 했던 재진입 조건을 제거합니다. `Attacker` 컨트랙트는 여전히 `NoLongerAVictim`를 다시 호출할 수 있지만, `balances[msg.sender]`가 0으로 설정되었으므로 추가 인출 시 오류가 발생합니다.

또 다른 옵션은 함수 호출이 완료될 때까지 컨트랙트 상태의 일부를 잠그는 상호 배제 잠금(일반적으로 "뮤텍스(mutex)"라고 함)을 사용하는 것입니다. 이는 함수가 실행되기 전에 `true`로 설정되고 호출이 완료된 후 `false`로 되돌아가는 부울 변수를 사용하여 구현됩니다. 아래 예시에서 볼 수 있듯이 뮤텍스를 사용하면 원래 호출이 아직 처리되는 동안 재귀적 호출로부터 함수를 보호하여 재진입을 효과적으로 중지합니다.

```solidity
pragma solidity ^0.7.0;

contract MutexPattern {
    bool locked = false;
    mapping(address => uint256) public balances;

    modifier noReentrancy() {
        require(!locked, "Blocked from reentrancy.");
        locked = true;
        _;
        locked = false;
    }
    // 이 함수는 뮤텍스로 보호되므로, `msg.sender.call` 내에서의 재진입 호출은 `withdraw`를 다시 호출할 수 없습니다.
    //  `return` 문은 `true`로 평가되지만, modifier의 `locked = false` 문은 여전히 평가됩니다.
    function withdraw(uint _amount) public payable noReentrancy returns(bool) {
        require(balances[msg.sender] >= _amount, "No balance to withdraw.");

        balances[msg.sender] -= _amount;
        (bool success, ) = msg.sender.call{value: _amount}("");
        require(success);

        return true;
    }
}
```

계정으로 자금을 보내는 "푸시 결제(push payments)" 시스템 대신 사용자가 스마트 컨트랙트에서 자금을 인출하도록 요구하는 [풀 결제(pull payments)](https://docs.openzeppelin.com/contracts/5.x/api/utils#security#PullPayment) 시스템을 사용할 수도 있습니다. 이렇게 하면 알 수 없는 주소에서 코드를 의도치 않게 트리거할 가능성이 제거됩니다(또한 특정 서비스 거부 공격을 방지할 수도 있습니다).

#### 정수 언더플로 및 오버플로 {#integer-underflows-and-overflows}

정수 오버플로는 산술 연산의 결과가 허용 가능한 값의 범위를 벗어나 표현할 수 있는 가장 낮은 값으로 "롤오버(roll over)"될 때 발생합니다. 예를 들어, `uint8`는 최대 2^8-1=255까지의 값만 저장할 수 있습니다. `255`보다 큰 값을 초래하는 산술 연산은 오버플로되어 `uint`를 `0`으로 재설정합니다. 이는 자동차의 주행 거리계가 최대 주행 거리(999999)에 도달하면 0으로 재설정되는 것과 유사합니다.

정수 언더플로도 비슷한 이유로 발생합니다. 산술 연산의 결과가 허용 가능한 범위 아래로 떨어지는 경우입니다. `uint8`에서 `0`을 감소시키려고 하면 결과는 단순히 표현할 수 있는 최대값(`255`)으로 롤오버됩니다.

정수 오버플로와 언더플로 모두 컨트랙트의 상태 변수에 예상치 못한 변경을 일으키고 계획되지 않은 실행을 초래할 수 있습니다. 아래는 공격자가 스마트 컨트랙트에서 산술 오버플로를 악용하여 유효하지 않은 작업을 수행하는 방법을 보여주는 예시입니다.

```
pragma solidity ^0.7.6;

// 이 컨트랙트는 타임 볼트(time vault) 역할을 하도록 설계되었습니다.
// 사용자는 이 컨트랙트에 입금할 수 있지만 최소 일주일 동안은 인출할 수 없습니다.
// 사용자는 1주일의 대기 기간을 넘어 대기 시간을 연장할 수도 있습니다.

/*
1. TimeLock 배포
2. TimeLock의 주소로 Attack 배포
3. 1 이더를 보내며 Attack.attack 호출. 즉시 이더를 인출할 수 있게 됩니다.

무슨 일이 일어났을까요?
Attack은 TimeLock.lockTime을 오버플로시켜 1주일의 대기 기간 전에 인출할 수 있었습니다.
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
        require(balances[msg.sender] > 0, "Insufficient funds");
        require(block.timestamp > lockTime[msg.sender], "Lock time not expired");

        uint amount = balances[msg.sender];
        balances[msg.sender] = 0;

        (bool sent, ) = msg.sender.call{value: amount}("");
        require(sent, "Failed to send Ether");
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
        t = 현재 잠금 시간이라면, 다음을 만족하는 x를 찾아야 합니다.
        x + t = 2**256 = 0
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

##### 정수 언더플로 및 오버플로를 방지하는 방법
버전 0.8.0부터 Solidity 컴파일러는 정수 언더플로 및 오버플로를 초래하는 코드를 거부합니다. 그러나 더 낮은 컴파일러 버전으로 컴파일링된 컨트랙트는 산술 연산이 포함된 함수에 대해 확인을 수행하거나 언더플로/오버플로를 확인하는 라이브러리(예: [SafeMath](https://docs.openzeppelin.com/contracts/2.x/api/math))를 사용해야 합니다.

#### 오라클 조작 {#oracle-manipulation}

[오라클](/developers/docs/oracles/)은 오프체인 정보를 소싱하여 스마트 컨트랙트가 사용할 수 있도록 온체인으로 전송합니다. 오라클을 사용하면 자본 시장과 같은 오프체인 시스템과 상호 운용되는 스마트 컨트랙트를 설계하여 그 적용 범위를 크게 확장할 수 있습니다.

그러나 오라클이 손상되어 잘못된 정보를 온체인으로 전송하면 스마트 컨트랙트가 잘못된 입력을 기반으로 실행되어 문제가 발생할 수 있습니다. 이것이 "오라클 문제"의 근간이며, 블록체인 오라클의 정보가 정확하고 최신이며 시기적절한지 확인하는 작업과 관련이 있습니다.

관련된 보안 문제로는 자산의 현물 가격을 얻기 위해 탈중앙화 거래소와 같은 온체인 오라클을 사용하는 것이 있습니다. [탈중앙화 금융 (DeFi)](/defi/) 산업의 대출 플랫폼은 사용자가 얼마나 빌릴 수 있는지 결정하기 위해 사용자의 담보 가치를 평가할 때 종종 이 방법을 사용합니다.

DEX 가격은 주로 차익 거래자들이 시장의 패리티(parity)를 회복시키기 때문에 종종 정확합니다. 그러나 특히 온체인 오라클이 (일반적인 경우처럼) 과거 거래 패턴을 기반으로 자산 가격을 계산하는 경우 조작에 노출될 수 있습니다.

예를 들어, 공격자는 대출 컨트랙트와 상호작용하기 직전에 플래시 론을 받아 자산의 현물 가격을 인위적으로 펌핑할 수 있습니다. DEX에 자산 가격을 쿼리하면 (공격자의 대규모 "매수 주문"이 자산에 대한 수요를 왜곡하기 때문에) 정상보다 높은 값이 반환되어 공격자가 원래보다 더 많은 금액을 빌릴 수 있게 됩니다. 이러한 "플래시 론 공격"은 DeFi 애플리케이션 간의 가격 오라클 의존성을 악용하는 데 사용되어 프로토콜에 수백만 달러의 자금 손실을 입혔습니다.

##### 오라클 조작을 방지하는 방법
[오라클 조작을 피하기 위한](https://www.cyfrin.io/blog/price-oracle-manipultion-attacks-with-examples) 최소한의 요구 사항은 단일 장애점을 피하기 위해 여러 출처에서 정보를 쿼리하는 탈중앙화된 오라클 네트워크를 사용하는 것입니다. 대부분의 경우 탈중앙화된 오라클에는 오라클 노드가 올바른 정보를 보고하도록 장려하는 암호경제학적 인센티브가 내장되어 있어 중앙화된 오라클보다 더 안전합니다.

자산 가격에 대해 온체인 오라클을 쿼리할 계획이라면 시간 가중 평균 가격(TWAP) 메커니즘을 구현하는 오라클을 사용하는 것을 고려해 보세요. [TWAP 오라클](https://docs.uniswap.org/contracts/v2/concepts/core-concepts/oracles)은 (수정 가능한) 두 개의 다른 시점에서 자산 가격을 쿼리하고 얻은 평균을 기반으로 현물 가격을 계산합니다. 더 긴 기간을 선택하면 최근에 실행된 대규모 주문이 자산 가격에 영향을 미칠 수 없으므로 가격 조작으로부터 프로토콜을 보호할 수 있습니다.

## 개발자를 위한 스마트 컨트랙트 보안 리소스 {#smart-contract-security-resources-for-developers}

### 스마트 컨트랙트 분석 및 코드 정확성 검증 도구 {#code-analysis-tools}

- **[테스트 도구 및 라이브러리](/developers/docs/smart-contracts/testing/#testing-tools-and-libraries)** - _스마트 컨트랙트에 대한 단위 테스트, 정적 분석 및 동적 분석을 수행하기 위한 업계 표준 도구 및 라이브러리 모음입니다._

- **[정형 검증 도구](/developers/docs/smart-contracts/formal-verification/#formal-verification-tools)** - _스마트 컨트랙트의 기능적 정확성을 검증하고 불변성을 확인하기 위한 도구입니다._

- **[스마트 컨트랙트 감사 서비스](/developers/docs/smart-contracts/testing/#smart-contract-auditing-services)** - _이더리움 개발 프로젝트에 스마트 컨트랙트 감사 서비스를 제공하는 조직 목록입니다._

- **[버그 바운티 플랫폼](/developers/docs/smart-contracts/testing/#bug-bounty-platforms)** - _버그 바운티를 조율하고 스마트 컨트랙트의 심각한 취약점을 책임감 있게 공개한 것에 대해 보상하는 플랫폼입니다._

- **[Fork Checker](https://forkchecker.hashex.org/)** - _포크된 컨트랙트와 관련된 모든 사용 가능한 정보를 확인할 수 있는 무료 온라인 도구입니다._

- **[ABI Encoder](https://abi.hashex.org/)** - _Solidity 컨트랙트 함수 및 생성자 인수를 인코딩하기 위한 무료 온라인 서비스입니다._

- **[Aderyn](https://github.com/Cyfrin/aderyn)** - _추상 구문 트리(AST)를 순회하여 의심되는 취약점을 찾아내고, 읽기 쉬운 마크다운 형식으로 문제를 출력하는 Solidity 정적 분석기입니다._

### 스마트 컨트랙트 모니터링 도구 {#smart-contract-monitoring-tools}

- **[Tenderly 실시간 알림](https://tenderly.co/monitoring)** - _스마트 컨트랙트나 지갑에서 비정상적이거나 예상치 못한 이벤트가 발생할 때 실시간 알림을 받을 수 있는 도구입니다._

### 스마트 컨트랙트의 안전한 관리를 위한 도구 {#smart-contract-administration-tools}

- **[Safe](https://safe.global/)** - _트랜잭션이 발생하기 전에 최소 인원의 승인이 필요한 이더리움 기반 스마트 컨트랙트 지갑입니다(M-of-N)._

- **[오픈제플린 컨트랙트](https://docs.openzeppelin.com/contracts/5.x/)** - _컨트랙트 소유권, 업그레이드, 접근 제어, 거버넌스, 일시 중지 기능 등 관리 기능을 구현하기 위한 컨트랙트 라이브러리입니다._

### 스마트 컨트랙트 감사 서비스 {#smart-contract-auditing-services}

- **[컨센시스 딜리전스(ConsenSys Diligence)](https://diligence.consensys.io/)** - _블록체인 생태계 전반의 프로젝트가 프로토콜 출시 준비를 마치고 사용자를 보호하도록 구축되었는지 확인하도록 돕는 스마트 컨트랙트 감사 서비스입니다._

- **[CertiK](https://www.certik.com/)** - _스마트 컨트랙트 및 블록체인 네트워크에 최첨단 정형 검증 기술의 사용을 개척하는 블록체인 보안 회사입니다._

- **[Trail of Bits](https://www.trailofbits.com/)** - _보안 연구와 공격자의 사고방식을 결합하여 위험을 줄이고 코드를 강화하는 사이버 보안 회사입니다._

- **[PeckShield](https://peckshield.com/)** - _전체 블록체인 생태계의 보안, 프라이버시 및 사용성을 위한 제품과 서비스를 제공하는 블록체인 보안 회사입니다._

- **[QuantStamp](https://quantstamp.com/)** - _보안 및 위험 평가 서비스를 통해 블록체인 기술의 주류 채택을 촉진하는 감사 서비스입니다._

- **[오픈제플린](https://www.openzeppelin.com/security-audits)** - _분산 시스템에 대한 보안 감사를 제공하는 스마트 컨트랙트 보안 회사입니다._

- **[Runtime Verification](https://runtimeverification.com/)** - _스마트 컨트랙트의 정형 모델링 및 검증을 전문으로 하는 보안 회사입니다._

- **[Hacken](https://hacken.io)** - _블록체인 보안에 360도 접근 방식을 도입하는 Web3 사이버 보안 감사 기관입니다._

- **[네더마인드](https://www.nethermind.io/smart-contract-audits)** - _이더리움 및 스타크넷 전반에 걸쳐 스마트 컨트랙트의 무결성과 사용자의 안전을 보장하는 Solidity 및 Cairo 감사 서비스입니다._

- **[HashEx](https://hashex.org/)** - _HashEx는 암호화폐의 보안을 보장하기 위해 블록체인 및 스마트 컨트랙트 감사에 중점을 두며, 스마트 컨트랙트 개발, 모의 해킹, 블록체인 컨설팅과 같은 서비스를 제공합니다._

- **[Code4rena](https://code4rena.com/)** - _스마트 컨트랙트 보안 전문가가 취약점을 찾고 Web3를 더 안전하게 만들도록 장려하는 경쟁형 감사 플랫폼입니다._

- **[CodeHawks](https://codehawks.com/)** - _보안 연구원을 위한 스마트 컨트랙트 감사 대회를 주최하는 경쟁형 감사 플랫폼입니다._

- **[Cyfrin](https://cyfrin.io)** - _제품 및 스마트 컨트랙트 감사 서비스를 통해 암호화폐 보안을 인큐베이팅하는 Web3 보안 강자입니다._

- **[ImmuneBytes](https://immunebytes.com/smart-contract-audit/)** - _경험이 풍부한 감사 팀과 동급 최고의 도구를 통해 블록체인 시스템에 대한 보안 감사를 제공하는 Web3 보안 회사입니다._

- **[Oxorio](https://oxor.io/)** - _암호화폐 기업 및 탈중앙화 금융(DeFi) 프로젝트를 위해 EVM, Solidity, ZK, 크로스체인 기술에 대한 전문 지식을 갖춘 스마트 컨트랙트 감사 및 블록체인 보안 서비스입니다._

- **[Inference](https://inference.ag/)** - _EVM 기반 블록체인의 스마트 컨트랙트 감사를 전문으로 하는 보안 감사 회사입니다. 전문 감사관을 통해 잠재적인 문제를 식별하고 배포 전에 이를 수정할 수 있는 실행 가능한 솔루션을 제안합니다._

### 버그 바운티 플랫폼 {#bug-bounty-platforms}

- **[Immunefi](https://immunefi.com/)** - _보안 연구원이 코드를 검토하고, 취약점을 공개하며, 보상을 받고, 암호화폐를 더 안전하게 만드는 스마트 컨트랙트 및 탈중앙화 금융(DeFi) 프로젝트용 버그 바운티 플랫폼입니다._

- **[HackerOne](https://www.hackerone.com/)** - _기업과 모의 해킹 전문가 및 사이버 보안 연구원을 연결하는 취약점 조율 및 버그 바운티 플랫폼입니다._

- **[HackenProof](https://hackenproof.com/)** - _보안 전문가가 분류 서비스를 제공하고 연구원이 관련성 있고 검증된 버그 보고서에 대해 보상을 받는 암호화폐 프로젝트(탈중앙화 금융(DeFi), 스마트 컨트랙트, 지갑, CEX 등)를 위한 전문 버그 바운티 플랫폼입니다._

-  **[Sherlock](https://www.sherlock.xyz/)** - _스마트 컨트랙트 보안을 위한 Web3의 보험업자로, 관련 버그에 대해 공정하게 보상받을 수 있도록 스마트 컨트랙트를 통해 감사관에 대한 지급을 관리합니다._

-  **[CodeHawks](https://www.codehawks.com/)** - _감사관이 보안 콘테스트 및 챌린지에 참여하고, (곧) 자체 비공개 감사에도 참여할 수 있는 경쟁형 버그 바운티 플랫폼입니다._

### 알려진 스마트 컨트랙트 취약점 및 익스플로잇 간행물 {#common-smart-contract-vulnerabilities-and-exploits}

- **[컨센시스: 알려진 스마트 컨트랙트 공격](https://consensysdiligence.github.io/smart-contract-best-practices/attacks/)** - _대부분의 경우에 대한 샘플 코드와 함께 가장 중요한 컨트랙트 취약점을 초보자도 이해하기 쉽게 설명합니다._

- **[SWC 레지스트리](https://swcregistry.io/)** - _이더리움 스마트 컨트랙트에 적용되는 공통 취약점 목록(CWE) 항목의 선별된 목록입니다._

- **[Rekt](https://rekt.news/)** - _세간의 이목을 끄는 암호화폐 해킹 및 익스플로잇에 대한 정기적으로 업데이트되는 간행물과 상세한 사후 분석 보고서입니다._

### 스마트 컨트랙트 보안 학습을 위한 챌린지 {#challenges-for-learning-smart-contract-security}

- **[Awesome BlockSec CTF](https://github.com/blockthreat/blocksec-ctfs)** - _블록체인 보안 워게임, 챌린지, [Capture The Flag](https://www.webopedia.com/definitions/ctf-event/amp/) 대회 및 솔루션 풀이의 선별된 목록입니다._

- **[Damn Vulnerable DeFi](https://www.damnvulnerabledefi.xyz/)** - _탈중앙화 금융(DeFi) 스마트 컨트랙트의 공격적 보안을 배우고 버그 헌팅 및 보안 감사 기술을 구축하기 위한 워게임입니다._

- **[Ethernaut](https://ethernaut.openzeppelin.com/)** - _각 레벨이 '해킹'되어야 하는 스마트 컨트랙트로 구성된 Web3/Solidity 기반 워게임입니다._

- **[HackenProof x HackTheBox](https://app.hackthebox.com/tracks/HackenProof-Track)** - _판타지 모험을 배경으로 한 스마트 컨트랙트 해킹 챌린지입니다. 챌린지를 성공적으로 완료하면 비공개 버그 바운티 프로그램에 접근할 수 있는 권한도 부여됩니다._

### 스마트 컨트랙트 보안을 위한 모범 사례 {#smart-contract-security-best-practices}

- **[컨센시스: 이더리움 스마트 컨트랙트 보안 모범 사례](https://consensys.github.io/smart-contract-best-practices/)** - _이더리움 스마트 컨트랙트 보안을 위한 포괄적인 가이드라인 목록입니다._

- **[Nascent: Simple Security Toolkit](https://github.com/nascentxyz/simple-security-toolkit)** - _스마트 컨트랙트 개발을 위한 실용적인 보안 중심 가이드 및 체크리스트 모음입니다._

- **[Solidity Patterns](https://fravoll.github.io/solidity-patterns/)** - _스마트 컨트랙트 프로그래밍 언어인 Solidity를 위한 안전한 패턴과 모범 사례의 유용한 모음입니다._

- **[Solidity 문서: 보안 고려 사항](https://docs.soliditylang.org/en/v0.8.16/security-considerations.html)** - _Solidity로 안전한 스마트 컨트랙트를 작성하기 위한 가이드라인입니다._

- **[스마트 컨트랙트 보안 검증 표준](https://github.com/securing/SCSVS)** - _개발자, 아키텍트, 보안 검토자 및 공급업체를 위해 스마트 컨트랙트의 보안을 표준화하기 위해 만들어진 14개 부분의 체크리스트입니다._

- **[스마트 컨트랙트 보안 및 감사 배우기](https://updraft.cyfrin.io/courses/security)** - _보안 모범 사례를 한 단계 높이고 보안 연구원이 되고자 하는 스마트 컨트랙트 개발자를 위해 만들어진 궁극의 스마트 컨트랙트 보안 및 감사 과정입니다._

### 스마트 컨트랙트 보안 튜토리얼 {#tutorials-on-smart-contract-security}

- [안전한 스마트 컨트랙트를 작성하는 방법](/developers/tutorials/secure-development-workflow/)

- [슬리더를 사용하여 스마트 컨트랙트 버그를 찾는 방법](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

- [맨티코어를 사용하여 스마트 컨트랙트 버그를 찾는 방법](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)

- [스마트 컨트랙트 보안 가이드라인](/developers/tutorials/smart-contract-security-guidelines/)

- [토큰 컨트랙트를 임의의 토큰과 안전하게 통합하는 방법](/developers/tutorials/token-integration-checklist/)

- [Cyfrin Updraft - 스마트 컨트랙트 보안 및 감사 전체 과정](https://updraft.cyfrin.io/courses/security)