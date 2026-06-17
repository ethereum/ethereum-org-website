---
title: 스마트 컨트랙트 보안 체크리스트
description: 안전한 스마트 컨트랙트 작성을 위해 권장되는 워크플로
author: "Trailofbits"
tags:
  - 스마트 컨트랙트
  - 보안
  - solidity
skill: intermediate
breadcrumb: 보안 체크리스트
lang: ko
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 스마트 컨트랙트 개발 체크리스트 {#smart-contract-development-checklist}

스마트 컨트랙트를 작성할 때 따를 것을 권장하는 전반적인 프로세스는 다음과 같습니다.

알려진 보안 문제 확인:

- [슬리더](https://github.com/crytic/slither)를 사용하여 컨트랙트를 검토하세요. 일반적인 취약점을 찾아내는 40개 이상의 내장 탐지기가 있습니다. 새로운 코드를 체크인할 때마다 실행하여 문제없는 보고서를 받는지 확인하세요(또는 특정 문제를 무시하려면 분류(triage) 모드를 사용하세요).
- [Crytic](https://crytic.io/)을 사용하여 컨트랙트를 검토하세요. 슬리더가 확인하지 않는 50가지 문제를 검사합니다. 또한 Crytic은 GitHub의 풀 리퀘스트(Pull Request)에서 보안 문제를 쉽게 드러내어 팀원들이 서로의 코드를 잘 파악할 수 있도록 돕습니다.

컨트랙트의 특수 기능 고려:

- 컨트랙트가 업그레이드 가능한가요? [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 또는 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/)을 사용하여 업그레이드 가능성 코드에 결함이 없는지 검토하세요. 업그레이드가 잘못될 수 있는 17가지 방법을 문서화해 두었습니다.
- 컨트랙트가 ERC를 준수한다고 명시되어 있나요? [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)로 확인해 보세요. 이 도구는 6가지 일반적인 사양에서 벗어난 부분을 즉시 식별합니다.
- 서드파티 토큰과 연동하나요? 외부 컨트랙트에 의존하기 전에 [토큰 연동 체크리스트](/developers/tutorials/token-integration-checklist/)를 검토하세요.

코드의 중요한 보안 기능을 시각적으로 검사:

- 슬리더의 [inheritance-graph](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 프린터를 검토하세요. 의도치 않은 섀도잉(shadowing) 및 C3 선형화 문제를 피하세요.
- 슬리더의 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 프린터를 검토하세요. 함수의 가시성(visibility) 및 접근 제어를 보고합니다.
- 슬리더의 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 프린터를 검토하세요. 상태 변수에 대한 접근 제어를 보고합니다.

중요한 보안 속성을 문서화하고 자동화된 테스트 생성기를 사용하여 평가:

- [코드의 보안 속성을 문서화하는 방법](/developers/tutorials/guide-to-smart-contract-security-tools/)을 배우세요. 처음에는 어렵지만, 좋은 결과를 얻기 위해 가장 중요한 단일 활동입니다. 또한 이 튜토리얼의 고급 기술을 사용하기 위한 전제 조건이기도 합니다.
- [에키드나](https://github.com/crytic/echidna) 및 [맨티코어](https://manticore.readthedocs.io/en/latest/verifier.html)와 함께 사용할 수 있도록 Solidity로 보안 속성을 정의하세요. 상태 머신, 접근 제어, 산술 연산, 외부 상호작용 및 표준 준수에 집중하세요.
- [슬리더의 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)를 사용하여 보안 속성을 정의하세요. 상속, 변수 종속성, 접근 제어 및 기타 구조적 문제에 집중하세요.
- [Crytic](https://crytic.io)을 사용하여 모든 커밋에서 속성 테스트를 실행하세요. Crytic은 보안 속성 테스트를 사용하고 평가할 수 있으므로 팀의 모든 사람이 GitHub에서 테스트 통과 여부를 쉽게 확인할 수 있습니다. 실패한 테스트는 커밋을 차단할 수 있습니다.

마지막으로, 자동화된 도구가 쉽게 찾을 수 없는 문제에 유의하세요:

- 프라이버시 부족: 트랜잭션이 풀(pool)에 대기하는 동안 다른 모든 사람이 이를 볼 수 있습니다.
- 프론트 러닝(Front running) 트랜잭션
- 암호화 연산
- 외부 탈중앙화 금융 (DeFi) 컴포넌트와의 위험한 상호작용

## 도움 요청하기 {#ask-for-help}

[이더리움 오피스 아워](https://calendly.com/dan-trailofbits/office-hours)는 매주 화요일 오후에 진행됩니다. 이 1시간짜리 1대1 세션은 보안에 관한 질문을 하고, 도구를 사용하여 문제를 해결하며, 현재 접근 방식에 대해 전문가의 피드백을 받을 수 있는 기회입니다. 이 가이드를 잘 활용할 수 있도록 도와드리겠습니다.

Slack에 참여하세요: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). 질문이 있으시면 언제든지 #crytic 및 #ethereum 채널에서 답변해 드립니다.