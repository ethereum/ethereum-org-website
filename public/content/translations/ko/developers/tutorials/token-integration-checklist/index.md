---
title: "토큰 통합 체크리스트"
description: "토큰과 상호작용할 때 고려해야 할 점검 사항"
author: "Trailofbits"
lang: ko
tags: [ "솔리디티", "스마트 계약", "보안", "토큰" ]
skill: intermediate
published: 2020-08-13
source: "안전한 계약 구축하기"
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

임의의 토큰과 상호작용 시 이 체크리스트를 따르세요. 각 항목과 관련된 위험을 반드시 이해하고 이 규칙에 대한 예외 사항은 모두 정당화해야 합니다.

편의를 위해 모든 Slither [유틸리티](https://github.com/crytic/slither#tools)는 다음과 같이 토큰 주소에서 직접 실행할 수 있습니다:

[Slither 사용법 튜토리얼](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

이 체크리스트를 따르려면 토큰에 대한 Slither의 다음 출력이 필요합니다:

```bash
- slither-check-erc [target] [contractName] [선택 사항: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # Echidna와 Manticore의 구성 및 사용이 필요합니다
```

## 일반적인 고려 사항 {#general-considerations}

- **계약에 보안 검토가 있는지 확인하세요.** 보안 검토가 없는 계약과의 상호작용은 피하세요. 평가 기간(즉, '투입된 노력의 수준'), 보안 회사의 평판, 발견된 취약점의 수와 심각도를 확인하세요.
- **개발자에게 연락할 수 있는지 확인하세요.** 사고 발생 시 해당 팀에 알려야 할 수도 있습니다. [blockchain-security-contacts](https://github.com/crytic/blockchain-security-contacts)에서 적절한 연락처를 찾아보세요.
- **중요 공지를 위한 보안 메일링 리스트가 있는지 확인하세요.** 해당 팀은 여러분과 같은 사용자에게 알려야 합니다 중요한 문제가 발견되거나 업그레이드가 발생할 때.

## ERC 준수 {#erc-conformity}

Slither에는 토큰이 여러 관련 ERC 표준을 준수하는지 검토하는 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance) 유틸리티가 포함되어 있습니다. slither-check-erc를 사용하여 다음을 검토하세요:

- **transfer 및 transferFrom이 부울 값을 반환하는지 확인하세요.** 일부 토큰은 이러한 함수에서 부울 값을 반환하지 않습니다. 그 결과 계약 내에서 해당 함수 호출이 실패할 수 있습니다.
- **name, decimals, symbol 함수가 사용되는 경우 존재하는지 확인하세요.** 이 함수들은 ERC20 표준에서 선택 사항이므로 존재하지 않을 수 있습니다.
- **decimals가 uint8을 반환하는지 확인하세요.** 일부 토큰은 잘못된 uint256을 반환합니다. 이 경우 반환된 값이 255 미만인지 확인하세요.
- **토큰이 알려진 [ERC20 경합 조건](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)을 완화하는지 확인하세요.** ERC20 표준에는 공격자가 토큰을 훔치는 것을 방지하기 위해 완화해야 하는 알려진 ERC20 경합 조건이 있습니다.
- **토큰이 ERC777 토큰이 아니며 transfer 및 transferFrom에 외부 함수 호출이 없는지 확인하세요.** 전송 함수 내 외부 호출은 재진입 공격으로 이어질 수 있습니다.

Slither에는 단위 테스트와 보안 속성을 생성하여 많은 일반적인 ERC 결함을 발견할 수 있는 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation) 유틸리티가 포함되어 있습니다. slither-prop을 사용하여 다음을 검토하세요:

- **계약이 slither-prop의 모든 단위 테스트와 보안 속성을 통과하는지 확인하세요.** 생성된 단위 테스트를 실행한 다음 [Echidna](https://github.com/crytic/echidna)와 [Manticore](https://manticore.readthedocs.io/en/latest/verifier.html)로 속성을 확인하세요.

마지막으로, 자동으로 식별하기 어려운 특정 특성들이 있습니다. 다음 조건들을 수동으로 검토하세요:

- **transfer 및 transferFrom은 수수료를 부과하지 않아야 합니다.** 디플레이션 토큰은 예기치 않은 동작을 유발할 수 있습니다.
- **토큰에서 발생할 수 있는 잠재적 이자를 고려해야 합니다.** 일부 토큰은 토큰 보유자에게 이자를 분배합니다. 이를 고려하지 않으면 이 이자가 계약에 묶일 수 있습니다.

## 계약 구성 {#contract-composition}

- **계약에 불필요한 복잡성이 없어야 합니다.** 토큰은 간단한 계약이어야 하며, 복잡한 코드를 가진 토큰은 더 높은 수준의 검토가 필요합니다. Slither의 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)를 사용하여 복잡한 코드를 식별하세요.
- **계약이 SafeMath를 사용하는지 확인하세요.** SafeMath를 사용하지 않는 계약은 더 높은 수준의 검토가 필요합니다. SafeMath 사용 여부를 수동으로 계약을 검사하세요.
- **계약에 토큰과 관련 없는 함수가 거의 없는지 확인하세요.** 토큰과 관련 없는 함수는 계약에 문제가 발생할 가능성을 높입니다. Slither의 [contract-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 계약에 사용된 코드를 전반적으로 검토하세요.
- **토큰은 주소를 하나만 가져야 합니다.** 잔액 업데이트를 위한 진입점이 여러 개인 토큰은 주소 기반의 내부 기록을 손상시킬 수 있습니다(예: `balances[token_address][msg.sender]`가 실제 잔액을 반영하지 않을 수 있습니다).

## 소유자 권한 {#owner-privileges}

- **토큰을 업그레이드할 수 없는지 확인하세요.** 업그레이드 가능한 계약은 시간이 지남에 따라 규칙을 변경할 수 있습니다. Slither의 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 계약이 업그레이드 가능한지 확인하세요.
- **소유자의 발행(민팅) 기능이 제한적인지 확인하세요.** 악의적이거나 권한을 탈취당한 소유자는 발행 기능을 남용할 수 있습니다. Slither의 [human-summary printer](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 발행(민팅) 기능을 검토하고 코드를 수동으로 검토하는 것을 고려하세요.
- **토큰을 일시 중지할 수 없는지 확인하세요.** 악의적이거나 권한을 탈취당한 소유자는 일시 중지 가능한 토큰에 의존하는 계약을 묶어둘 수 있습니다. 일시 중지 가능한 코드를 수동으로 식별하세요.
- **소유자가 계약을 블랙리스트에 추가할 수 없는지 확인하세요.** 악의적이거나 권한을 탈취당한 소유자는 블랙리스트가 있는 토큰에 의존하는 계약을 묶어둘 수 있습니다. 블랙리스트 기능을 수동으로 식별하세요.
- **토큰 개발팀의 신원이 알려져 있고 남용에 대한 책임을 질 수 있는지 확인하세요.** 익명의 개발팀이 만들었거나 법적 보호처에 있는 계약은 더 높은 수준의 검토가 필요합니다.

## 토큰 희소성 {#token-scarcity}

토큰 희소성 문제에 대한 검토는 수동 검토가 필요합니다. 다음 조건을 확인하세요:

- **어떤 사용자도 공급량의 대부분을 소유하고 있지 않아야 합니다.** 소수의 사용자가 대부분의 토큰을 소유하고 있다면 토큰의 분배에 따라 운영에 영향을 미칠 수 있습니다.
- **총공급량이 충분해야 합니다.** 총공급량이 적은 토큰은 쉽게 조작될 수 있습니다.
- **토큰이 소수의 거래소에만 국한되지 않아야 합니다.** 모든 토큰이 하나의 거래소에 있다면 해당 거래소가 손상될 경우 토큰에 의존하는 계약도 손상될 수 있습니다.
- **사용자가 대규모 자금 또는 플래시 론과 관련된 위험을 이해하고 있어야 합니다.** 토큰 잔액에 의존하는 계약은 대규모 자금을 가진 공격자나 플래시 론을 통한 공격을 신중하게 고려해야 합니다.
- **토큰이 플래시 민팅을 허용하지 않아야 합니다.** 플래시 민팅은 잔액과 총공급량에 상당한 변동을 초래할 수 있으며, 이는 토큰 운영 시 엄격하고 포괄적인 오버플로 검사를 필요로 합니다.
