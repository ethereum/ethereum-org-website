---
title: "스마트 컨트랙트 보안 체크리스트"
description: "안전한 스마트 컨트랙트 작성을 위해 권장되는 워크플로"
author: "Trailofbits"
tags:
  - 스마트 컨트랙트
  - 보안
  - solidity
skill: intermediate
breadcrumb: "보안 체크리스트"
lang: ko
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 스마트 컨트랙트 개발 체크리스트 {#smart-contract-development-checklist}

스마트 컨트랙트를 작성할 때 따를 것을 권장하는 개략적인 프로세스는 다음과 같습니다.

알려진 보안 문제 확인:

- [슬리더](https://github.com/crytic/slither)를 사용하여 컨트랙트를 검토하세요. 일반적인 취약점에 대한 100개 이상의 내장 탐지기가 있습니다. 새 코드를 체크인할 때마다 실행하여 깨끗한 보고서를 받는지 확인하세요(또는 특정 문제를 무시하려면 분류(triage) 모드를 사용하세요).
- 보안 문제가 풀 리퀘스트(pull request)에 나타나도록 CI에서 슬리더를 실행하세요. 예를 들어 GitHub의 [slither-action](https://github.com/crytic/slither-action)을 사용할 수 있습니다.

컨트랙트의 특수 기능 고려:

- 컨트랙트가 업그레이드 가능한가요? [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks)를 사용하여 업그레이드 가능성 코드에 결함이 있는지 검토하세요. 업그레이드 시 문제가 발생할 수 있는 17가지 방법을 문서화했습니다.
- 컨트랙트가 ERC를 준수한다고 주장하나요? [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)로 확인해 보세요. 이 도구는 6가지 일반적인 사양에서 벗어난 부분을 즉시 식별합니다.
- 타사 토큰과 통합하나요? 외부 컨트랙트에 의존하기 전에 [토큰 통합 체크리스트](/developers/tutorials/token-integration-checklist/)를 검토하세요.

코드의 중요한 보안 기능을 시각적으로 검사:

- 슬리더의 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 프린터를 검토하세요. 의도치 않은 섀도잉(shadowing) 및 C3 선형화(linearization) 문제를 피하세요.
- 슬리더의 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 프린터를 검토하세요. 함수 가시성(visibility) 및 접근 제어를 보고합니다.
- 슬리더의 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 프린터를 검토하세요. 상태 변수에 대한 접근 제어를 보고합니다.

중요한 보안 속성을 문서화하고 자동화된 테스트 생성기를 사용하여 평가:

- [코드의 보안 속성을 문서화하는 방법](/developers/tutorials/guide-to-smart-contract-security-tools/)을 알아보세요. 처음에는 어렵지만, 좋은 결과를 얻기 위한 가장 중요한 단일 활동입니다. 또한 이 튜토리얼의 고급 기술을 사용하기 위한 전제 조건이기도 합니다.
- [에키드나](https://github.com/crytic/echidna) 및 [Medusa](https://github.com/crytic/medusa)와 같은 퍼저(fuzzer)와 [hevm](https://hevm.dev/)과 같은 심볼릭 실행(symbolic execution) 도구에서 사용할 수 있도록 Solidity에서 보안 속성을 정의하세요. 상태 머신, 접근 제어, 산술 연산, 외부 상호 작용 및 표준 준수에 집중하세요.
- [슬리더의 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)를 사용하여 보안 속성을 정의하세요. 상속, 변수 종속성, 접근 제어 및 기타 구조적 문제에 집중하세요.
- 팀의 모든 사람이 테스트 통과 여부를 쉽게 확인할 수 있도록 CI(예: GitHub Actions)의 모든 커밋에서 속성 테스트를 실행하세요. 실패한 테스트는 병합(merge)을 차단할 수 있습니다.

마지막으로, 자동화된 도구가 쉽게 찾을 수 없는 문제에 유의하세요:

- 프라이버시 부족: 트랜잭션이 풀(pool)에 대기 중인 동안 다른 모든 사람이 트랜잭션을 볼 수 있습니다.
- 프론트 러닝(Front running) 트랜잭션
- 암호화 작업
- 외부 DeFi 구성 요소와의 위험한 상호 작용

## 도움 요청하기 {#ask-for-help}

[이더리움 오피스 아워](https://meetings.hubspot.com/trailofbits/office-hours)는 매주 화요일 오후에 진행됩니다. 이 1시간짜리 1대1 세션은 보안에 관한 질문을 하고, 도구를 사용하여 문제를 해결하며, 현재 접근 방식에 대해 전문가의 피드백을 받을 수 있는 기회입니다. 이 가이드를 잘 활용할 수 있도록 도와드리겠습니다.

Slack에 참여하세요: [Empire Hacking](https://slack.empirehacking.nyc/). 질문이 있으시면 언제든지 #crytic 및 #ethereum 채널에서 답변해 드립니다.
