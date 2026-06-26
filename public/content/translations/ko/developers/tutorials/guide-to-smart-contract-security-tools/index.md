---
title: "스마트 컨트랙트 보안 도구 가이드"
description: "세 가지 다른 테스트 및 프로그램 분석 기법에 대한 개요"
author: "Trailofbits"
lang: ko
tags: ["Solidity", "스마트 컨트랙트", "보안"]
skill: intermediate
breadcrumb: "보안 도구"
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

세 가지의 독특한 테스트 및 프로그램 분석 기법을 사용할 것입니다:

- **[슬리더](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)를 이용한 정적 분석.** 프로그램의 모든 경로를 근사화하여 다양한 프로그램 표현(예: 제어 흐름 그래프)을 통해 동시에 분석합니다.
- **[에키드나](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)를 이용한 퍼징.** 의사 난수(pseudo-random)로 생성된 트랜잭션으로 코드를 실행합니다. 퍼저는 주어진 속성을 위반하는 트랜잭션 시퀀스를 찾으려고 시도합니다.
- **[맨티코어](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)를 이용한 심볼릭 실행.** 각 실행 경로를 수학적 공식으로 변환하고 그 위에 제약 조건을 확인할 수 있는 정형 검증 기법입니다.

각 기법은 장단점이 있으며, [특정 사례](#determining-security-properties)에서 유용하게 쓰일 수 있습니다:

| 기법 | 도구 | 용도 | 속도 | 놓친 버그 | 오탐 |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| 정적 분석 | 슬리더 | CLI 및 스크립트 | 수 초 | 보통 | 낮음 |
| 퍼징 | 에키드나 | Solidity 속성 | 수 분 | 낮음 | 없음 |
| 심볼릭 실행 | 맨티코어 | Solidity 속성 및 스크립트 | 수 시간 | 없음\* | 없음 |

\* 시간 초과 없이 모든 경로를 탐색한 경우

<strong>슬리더</strong>는 수 초 내에 컨트랙트를 분석하지만, 정적 분석은 오탐을 유발할 수 있으며 복잡한 검사(예: 산술 검사)에는 덜 적합합니다. 내장된 탐지기에 버튼 하나로 접근하거나 사용자 정의 검사를 수행하려면 API를 통해 슬리더를 실행하세요.

<strong>에키드나</strong>는 실행하는 데 몇 분이 걸리며 실제 버그(true positives)만 찾아냅니다. 에키드나는 사용자가 제공한 Solidity로 작성된 보안 속성을 검사합니다. 무작위 탐색을 기반으로 하기 때문에 버그를 놓칠 수도 있습니다.

<strong>맨티코어</strong>는 가장 "무거운" 분석을 수행합니다. 에키드나와 마찬가지로 맨티코어는 사용자가 제공한 속성을 검증합니다. 실행하는 데 더 많은 시간이 필요하지만, 속성의 유효성을 증명할 수 있으며 오탐을 보고하지 않습니다.

## 권장 워크플로 {#suggested-workflow}

슬리더의 내장 탐지기로 시작하여 현재 단순한 버그가 없거나 나중에 유입되지 않도록 확인하세요. 슬리더를 사용하여 상속, 변수 종속성 및 구조적 문제와 관련된 속성을 검사합니다. 코드베이스가 커짐에 따라 에키드나를 사용하여 상태 머신의 더 복잡한 속성을 테스트하세요. 함수가 오버라이드되는 것을 방지하는 등 Solidity에서 제공하지 않는 보호 기능을 위한 사용자 정의 검사를 개발하려면 슬리더를 다시 활용하세요. 마지막으로 맨티코어를 사용하여 산술 연산과 같은 중요한 보안 속성에 대한 표적 검증을 수행합니다.

- 슬리더의 CLI를 사용하여 일반적인 문제를 포착합니다.
- 에키드나를 사용하여 컨트랙트의 고수준 보안 속성을 테스트합니다.
- 슬리더를 사용하여 사용자 정의 정적 검사를 작성합니다.
- 중요한 보안 속성에 대한 심층적인 보증이 필요할 때 맨티코어를 사용합니다.

**단위 테스트에 대한 참고 사항**. 단위 테스트는 고품질 소프트웨어를 구축하는 데 필수적입니다. 그러나 이러한 기법은 보안 결함을 찾는 데 가장 적합하지는 않습니다. 단위 테스트는 일반적으로 코드의 긍정적인 동작(즉, 코드가 정상적인 컨텍스트에서 예상대로 작동함)을 테스트하는 데 사용되는 반면, 보안 결함은 개발자가 고려하지 않은 엣지 케이스(edge case)에 존재하는 경향이 있습니다. 수십 건의 스마트 컨트랙트 보안 검토를 연구한 결과, [단위 테스트 커버리지는 고객의 코드에서 발견된 보안 결함의 수나 심각도에 아무런 영향을 미치지 않았습니다](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/).

## 보안 속성 결정 {#determining-security-properties}

코드를 효과적으로 테스트하고 검증하려면 주의가 필요한 영역을 식별해야 합니다. 보안에 투자할 수 있는 리소스는 제한되어 있으므로, 노력을 최적화하기 위해 코드베이스의 취약하거나 가치가 높은 부분의 범위를 지정하는 것이 중요합니다. 위협 모델링이 도움이 될 수 있습니다. 다음을 검토해 보세요:

- [신속한 위험 평가(Rapid Risk Assessments)](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (시간이 부족할 때 선호하는 접근 방식)
- [데이터 중심 시스템 위협 모델링 가이드](https://csrc.nist.gov/pubs/sp/800/154/ipd) (NIST 800-154)
- [Shostack 위협 모델링](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [어설션(Assertion) 사용](https://blog.regehr.org/archives/1091)

### 구성 요소 {#components}

무엇을 검사할지 아는 것은 올바른 도구를 선택하는 데에도 도움이 됩니다.

스마트 컨트랙트와 자주 관련되는 광범위한 영역은 다음과 같습니다:

- **상태 머신.** 대부분의 컨트랙트는 상태 머신으로 표현될 수 있습니다. (1) 유효하지 않은 상태에 도달할 수 없는지, (2) 상태가 유효하다면 도달할 수 있는지, (3) 어떤 상태도 컨트랙트를 갇히게(trap) 하지 않는지 확인해 보세요.

  - 에키드나와 맨티코어는 상태 머신 사양을 테스트하는 데 선호되는 도구입니다.

- **접근 제어.** 시스템에 권한이 있는 사용자(예: 소유자, 컨트롤러 등)가 있는 경우, (1) 각 사용자는 승인된 작업만 수행할 수 있고 (2) 어떤 사용자도 더 높은 권한을 가진 사용자의 작업을 차단할 수 없도록 보장해야 합니다.

  - 슬리더, 에키드나, 맨티코어는 올바른 접근 제어를 검사할 수 있습니다. 예를 들어, 슬리더는 화이트리스트에 있는 함수에만 onlyOwner 제어자(modifier)가 누락되어 있는지 확인할 수 있습니다. 에키드나와 맨티코어는 컨트랙트가 특정 상태에 도달한 경우에만 권한이 부여되는 등 더 복잡한 접근 제어에 유용합니다.

- **산술 연산.** 산술 연산의 건전성을 확인하는 것은 매우 중요합니다. 모든 곳에 `SafeMath`를 사용하는 것은 오버플로/언더플로를 방지하기 위한 좋은 단계이지만, 반올림 문제나 컨트랙트를 갇히게 하는 결함을 포함한 다른 산술적 결함도 여전히 고려해야 합니다.

  - 여기서는 맨티코어가 최선의 선택입니다. 산술 연산이 SMT 솔버의 범위를 벗어나는 경우 에키드나를 사용할 수 있습니다.

- **상속의 정확성.** Solidity 컨트랙트는 다중 상속에 크게 의존합니다. 섀도잉(shadowing) 함수에 `super` 호출이 누락되거나 C3 선형화(linearization) 순서를 잘못 해석하는 등의 실수가 쉽게 발생할 수 있습니다.

  - 슬리더는 이러한 문제를 확실하게 탐지할 수 있는 도구입니다.

- **외부 상호작용.** 컨트랙트는 서로 상호작용하며, 일부 외부 컨트랙트는 신뢰해서는 안 됩니다. 예를 들어, 컨트랙트가 외부 오라클에 의존하는 경우, 사용 가능한 오라클의 절반이 손상되더라도 안전하게 유지될까요?

  - 맨티코어와 에키드나는 컨트랙트와의 외부 상호작용을 테스트하는 데 가장 적합한 선택입니다. 맨티코어에는 외부 컨트랙트를 스텁(stub) 처리하는 메커니즘이 내장되어 있습니다.

- **표준 준수.** 이더리움 표준(예: ERC-20)은 설계상 결함이 있었던 역사가 있습니다. 기반으로 삼고 있는 표준의 한계를 인지해야 합니다.
  - 슬리더, 에키드나, 맨티코어는 주어진 표준에서 벗어난 부분을 탐지하는 데 도움을 줍니다.

### 도구 선택 치트시트 {#tool-selection-cheatsheet}

| 구성 요소 | 도구 | 예시 |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상태 머신 | 에키드나, 맨티코어 |
| 접근 제어 | 슬리더, 에키드나, 맨티코어 | [슬리더 연습 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [에키드나 연습 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md)       |
| 산술 연산 | 맨티코어, 에키드나 | [에키드나 연습 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [맨티코어 연습 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| 상속의 정확성 | 슬리더 | [슬리더 연습 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                     |
| 외부 상호작용 | 맨티코어, 에키드나 |
| 표준 준수 | 슬리더, 에키드나, 맨티코어 | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                         |

목표에 따라 다른 영역도 확인해야 하지만, 이러한 굵직한 초점 영역은 모든 스마트 컨트랙트 시스템에 있어 좋은 출발점입니다.

공개된 감사(audit) 보고서에는 검증되거나 테스트된 속성의 예시가 포함되어 있습니다. 실제 보안 속성을 검토하려면 다음 보고서의 `Automated Testing and Verification` 섹션을 읽어보세요:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)