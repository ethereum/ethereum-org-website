---
title: "스마트 계약 보안 점검 사항"
description: "안전한 스마트 계약 작성을 위한 워크플로 제안"
author: "Trailofbits"
tags: [ "스마트 컨트랙트", "보안", "솔리디티" ]
skill: intermediate
lang: ko
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/workflow.md
---

## 스마트 계약 개발 체크리스트 {#smart-contract-development-checklist}

스마트 계약을 작성할 때 따르기를 권장하는 개괄적인 절차입니다.

알려진 보안 문제 확인:

- [Slither](https://github.com/crytic/slither)로 계약을 검토하세요. 일반적인 취약점에 대한 40개 이상의 탐지기가 내장되어 있습니다. 새 코드를 체크인할 때마다 실행하여 깔끔한 보고서를 받도록 하세요(또는 트리아지 모드를 사용하여 특정 문제를 무시하세요).
- [Crytic](https://crytic.io/)으로 계약을 검토하세요. Slither가 확인하지 않는 50가지 문제를 확인합니다. 또한 Crytic은 GitHub의 풀 리퀘스트에서 보안 문제를 쉽게 표시하여 팀이 서로의 작업을 파악하는 데 도움을 줄 수 있습니다.

계약의 특별한 기능 고려:

- 계약을 업그레이드할 수 있나요? [`slither-check-upgradeability`](https://github.com/crytic/slither/wiki/Upgradeability-Checks) 또는 [Crytic](https://blog.trailofbits.com/2020/06/12/upgradeable-contracts-made-safer-with-crytic/)으로 업그레이드 가능성 코드의 결함을 검토하세요. 업그레이드가 잘못될 수 있는 17가지 방법을 문서화했습니다.
- 계약이 ERC를 준수한다고 표방합니까? [`slither-check-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)로 확인하세요. 이 도구는 6가지 일반적인 사양과의 편차를 즉시 식별합니다.
- 제3자 토큰과 통합합니까? 외부 계약에 의존하기 전에 [토큰 통합 체크리스트](/developers/tutorials/token-integration-checklist/)를 검토하세요.

코드의 중요한 보안 기능을 시각적으로 검사:

- Slither의 [상속 그래프](https://github.com/trailofbits/slither/wiki/Printer-documentation#inheritance-graph) 프린터를 검토하세요. 의도하지 않은 섀도잉 및 C3 선형화 문제를 방지하세요.
- Slither의 [function-summary](https://github.com/trailofbits/slither/wiki/Printer-documentation#function-summary) 프린터를 검토하세요. 함수 가시성과 접근 제어를 보고합니다.
- Slither의 [vars-and-auth](https://github.com/trailofbits/slither/wiki/Printer-documentation#variables-written-and-authorization) 프린터를 검토하세요. 상태 변수에 대한 접근 제어를 보고합니다.

중요한 보안 속성을 문서화하고 자동화된 테스트 생성기를 사용하여 평가하세요.

- [코드의 보안 속성을 문서화하는 방법](/developers/tutorials/guide-to-smart-contract-security-tools/)을 알아보세요. 처음에는 어렵지만, 좋은 결과를 얻기 위한 가장 중요한 단일 활동입니다. 또한 이 튜토리얼의 고급 기술을 사용하기 위한 필수 조건이기도 합니다.
- [Echidna](https://github.com/crytic/echidna) 및 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)와 함께 사용하기 위해 Solidity에서 보안 속성을 정의하세요. 상태 머신, 접근 제어, 산술 연산, 외부 상호 작용 및 표준 준수에 집중하세요.
- [Slither의 Python API](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)로 보안 속성을 정의하세요. 상속, 변수 종속성, 접근 제어 및 기타 구조적 문제에 집중하세요.
- [Crytic](https://crytic.io)으로 커밋할 때마다 속성 테스트를 실행하세요. Crytic은 보안 속성 테스트를 사용하고 평가할 수 있으므로 팀의 모든 사람이 GitHub에서 테스트를 통과했는지 쉽게 확인할 수 있습니다. 실패한 테스트는 커밋을 차단할 수 있습니다.

마지막으로 자동화된 도구가 쉽게 찾을 수 없는 문제에 유의하세요.

- 개인정보 보호 부족: 트랜잭션이 풀에서 대기하는 동안 다른 모든 사람이 트랜잭션을 볼 수 있습니다.
- 선행 매매 트랜잭션
- 암호화 작업
- 외부 디파이(DeFi) 구성 요소와의 위험한 상호 작용

## 도움 요청하기 {#ask-for-help}

[이더리움 오피스 아워](https://calendly.com/dan-trailofbits/office-hours)는 매주 화요일 오후에 진행됩니다. 이 1시간짜리 1:1 세션은 보안에 대해 궁금한 점을 질문하고, 저희 도구를 사용하여 문제를 해결하며, 현재 접근 방식에 대해 전문가의 피드백을 받을 수 있는 기회입니다. 이 가이드를 끝까지 진행할 수 있도록 도와드리겠습니다.

Slack에 참여하세요: [Empire Hacking](https://join.slack.com/t/empirehacking/shared_invite/zt-h97bbrj8-1jwuiU33nnzg67JcvIciUw). 궁금한 점이 있으시면 언제든지 #crytic 및 #ethereum 채널을 이용하세요.
