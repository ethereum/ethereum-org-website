---
title: 스마트 계약 보안 도구 가이드
description: 세 가지 다른 테스팅 및 프로그램 분석 기법 개요
author: "Trailofbits"
lang: ko
tags: [ "솔리디티", "스마트 계약", "보안" ]
skill: intermediate
published: 2020-09-07
source: 안전한 계약 구축하기
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

세 가지 독특한 테스팅 및 프로그램 분석 기법을 사용할 것입니다.

- **[Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)를 사용한 정적 분석.** 프로그램의 모든 경로를 다양한 프로그램 표현(예: 제어 흐름 그래프)을 통해 동시에 근사화하고 분석합니다.
- **[Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/)를 사용한 퍼징.** 트랜잭션을 의사 난수 생성하여 코드를 실행합니다. 퍼저는 주어진 속성을 위반하는 트랜잭션 시퀀스를 찾으려고 시도합니다.
- **[Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/)를 사용한 심볼릭 실행.** 각 실행 경로를 수학 공식으로 변환하고 그 위에 제약 조건을 확인할 수 있는 정형 검증 기법입니다.

각 기법은 장점과 단점이 있으며 [특정 사례](#determining-security-properties)에서 유용합니다.

| 기법     | 도구        | 사용 방식              | 속도    | 놓친 버그 | 오탐 |
| ------ | --------- | ------------------ | ----- | ----- | -- |
| 정적 분석  | Slither   | CLI 및 스크립트         | 초 단위  | 보통    | 낮음 |
| 퍼징     | Echidna   | Solidity 속성        | 분 단위  | 낮음    | 없음 |
| 심볼릭 실행 | Manticore | Solidity 속성 및 스크립트 | 시간 단위 | 없음\*  | 없음 |

\* 시간 초과 없이 모든 경로를 탐색하는 경우

**Slither**는 몇 초 안에 계약을 분석하지만 정적 분석은 오탐을 유발할 수 있으며 복잡한 검사(예: 산술 검사)에는 덜 적합합니다. API를 통해 Slither를 실행하여 내장된 탐지기에 간편하게 액세스하거나 사용자 정의 검사를 수행할 수 있습니다.

**Echidna**는 몇 분 동안 실행해야 하며 실제 참(true positive)만 생성합니다. Echidna는 Solidity로 작성된 사용자 제공 보안 속성을 확인합니다. 무작위 탐색을 기반으로 하므로 버그를 놓칠 수 있습니다.

**Manticore**는 가장 "무거운" 분석을 수행합니다. Echidna와 마찬가지로 Manticore는 사용자가 제공한 속성을 확인합니다. 실행하는 데 더 많은 시간이 필요하지만 속성의 유효성을 증명할 수 있으며 오탐을 보고하지 않습니다.

## 권장 워크플로 {#suggested-workflow}

Slither의 내장 탐지기로 시작하여 간단한 버그가 현재 존재하지 않거나 나중에 유입되지 않도록 하세요. Slither를 사용하여 상속, 변수 종속성 및 구조적 문제와 관련된 속성을 확인하세요. 코드베이스가 커짐에 따라 Echidna를 사용하여 상태 머신의 더 복잡한 속성을 테스트하세요. Solidity에서 사용할 수 없는 보호 기능(예: 함수 재정의 방지)을 위해 Slither를 다시 사용하여 맞춤형 검사를 개발하세요. 마지막으로 Manticore를 사용하여 중요한 보안 속성(예: 산술 연산)의 대상 검증을 수행하세요.

- Slither의 CLI를 사용하여 일반적인 문제 발견
- Echidna를 사용하여 계약의 상위 수준 보안 속성 테스트
- Slither를 사용하여 맞춤형 정적 검사 작성
- 중요한 보안 속성에 대한 심층적인 보증을 원할 때 Manticore 사용

**단위 테스트에 대한 참고 사항**. 단위 테스트는 고품질 소프트웨어를 구축하는 데 필요합니다. 그러나 이러한 기법은 보안 결함을 찾는 데 가장 적합하지는 않습니다. 일반적으로 코드의 긍정적인 동작(즉, 코드가 일반적인 컨텍스트에서 예상대로 작동함)을 테스트하는 데 사용되는 반면, 보안 결함은 개발자가 고려하지 않은 엣지 케이스에 있는 경향이 있습니다. 수십 건의 스마트 계약 보안 검토에 대한 저희의 연구에서, [저희가 고객의 코드에서 발견한 보안 결함의 수나 심각도에 단위 테스트 커버리지는 영향을 미치지 않았습니다](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/).

## 보안 속성 결정하기 {#determining-security-properties}

코드를 효과적으로 테스트하고 검증하려면 주의가 필요한 영역을 식별해야 합니다. 보안에 사용하는 리소스는 제한적이므로, 코드베이스의 취약하거나 가치가 높은 부분의 범위를 정하는 것이 노력을 최적화하는 데 중요합니다. 위협 모델링이 도움이 될 수 있습니다. 다음을 검토해 보세요.

- [신속한 위험 평가](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html)(시간이 부족할 때 선호하는 접근 방식)
- [데이터 중심 시스템 위협 모델링 가이드](https://csrc.nist.gov/pubs/sp/800/154/ipd)(일명 NIST 800-154)
- [Shostack 위협 모델링](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [단언문 사용](https://blog.regehr.org/archives/1091)

### 구성 요소 {#components}

확인하려는 내용을 알면 적절한 도구를 선택하는 데도 도움이 됩니다.

스마트 계약과 자주 관련된 광범위한 영역은 다음과 같습니다.

- **상태 머신.** 대부분의 계약은 상태 머신으로 표현될 수 있습니다. (1) 유효하지 않은 상태에 도달할 수 없는지, (2) 상태가 유효할 경우 도달할 수 있는지, (3) 어떤 상태도 계약을 가두지 않는지 확인하는 것을 고려해 보세요.

  - Echidna와 Manticore는 상태 머신 사양을 테스트하는 데 선호되는 도구입니다.

- **액세스 제어.** 시스템에 권한 있는 사용자(예: 소유자, 컨트롤러 등)가 있는 경우 (1) 각 사용자는 승인된 작업만 수행할 수 있고, (2) 어떤 사용자도 더 많은 권한을 가진 사용자의 작업을 차단할 수 없도록 보장해야 합니다.

  - Slither, Echidna, Manticore는 올바른 액세스 제어를 확인할 수 있습니다. 예를 들어, Slither는 화이트리스트에 있는 함수에만 onlyOwner 수정자가 없는지 확인할 수 있습니다. Echidna와 Manticore는 계약이 특정 상태에 도달한 경우에만 권한이 부여되는 것과 같은 더 복잡한 액세스 제어에 유용합니다.

- **산술 연산.** 산술 연산의 건전성을 확인하는 것은 매우 중요합니다. 모든 곳에서 `SafeMath`를 사용하는 것은 오버플로우/언더플로우를 방지하는 좋은 방법이지만, 반올림 문제와 계약을 가두는 결함을 포함한 다른 산술적 결함도 여전히 고려해야 합니다.

  - 여기서는 Manticore가 최선의 선택입니다. 산술이 SMT 솔버의 범위를 벗어나는 경우 Echidna를 사용할 수 있습니다.

- **상속 정확성.** Solidity 계약은 다중 상속에 크게 의존합니다. `super` 호출이 누락된 섀도잉 함수, 잘못 해석된 c3 선형화 순서와 같은 실수가 쉽게 발생할 수 있습니다.

  - Slither는 이러한 문제를 확실하게 탐지할 수 있는 도구입니다.

- **외부 상호작용.** 계약은 서로 상호작용하며, 일부 외부 계약은 신뢰해서는 안 됩니다. 예를 들어, 계약이 외부 오라클에 의존하는 경우 사용 가능한 오라클의 절반이 손상되어도 안전하게 유지될까요?

  - Manticore와 Echidna는 계약과의 외부 상호작용을 테스트하는 데 최선의 선택입니다. Manticore에는 외부 계약을 스텁하는 내장 메커니즘이 있습니다.

- **표준 준수.** 이더리움 표준(예: ERC20)은 설계에 결함이 있었던 이력이 있습니다. 구축 기반이 되는 표준의 한계를 인지하고 있어야 합니다.
  - Slither, Echidna, Manticore는 주어진 표준에서 벗어나는 것을 탐지하는 데 도움이 될 것입니다.

### 도구 선택 치트 시트 {#tool-selection-cheatsheet}

| 구성 요소   | 도구                          | 예시                                                                                                                                                                                                                                                                      |
| ------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 상태 머신   | Echidna, Manticore          |                                                                                                                                                                                                                                                                         |
| 액세스 제어  | Slither, Echidna, Manticore | [Slither 연습 문제 2](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Echidna 연습 문제 2](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| 산술 연산   | Manticore, Echidna          | [Echidna 연습 문제 1](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Manticore 연습 문제 1 - 3](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)      |
| 상속 정확성  | Slither                     | [Slither 연습 문제 1](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                      |
| 외부 상호작용 | Manticore, Echidna          |                                                                                                                                                                                                                                                                         |
| 표준 준수   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                 |

목표에 따라 다른 영역도 확인해야 하지만, 이러한 대략적인 집중 영역은 모든 스마트 계약 시스템에 좋은 시작입니다.

저희의 공개 감사에는 검증되거나 테스트된 속성의 예가 포함되어 있습니다. 실제 보안 속성을 검토하려면 다음 보고서의 `자동화된 테스트 및 검증` 섹션을 읽어보세요.

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
