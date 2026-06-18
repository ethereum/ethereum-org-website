---
title: 토큰 연동 체크리스트
description: 토큰과 상호작용할 때 고려해야 할 사항들의 체크리스트
author: "트레일오브비츠"
lang: ko
tags: ["solidity", "스마트 컨트랙트", "보안", "토큰"]
skill: intermediate
breadcrumb: 토큰 연동
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

임의의 토큰과 상호작용할 때 이 체크리스트를 따르세요. 각 항목과 관련된 위험을 이해하고, 이 규칙에 대한 예외가 있다면 그 이유를 정당화할 수 있어야 합니다.

편의를 위해, 모든 슬리더(Slither) [유틸리티](https://github.com/crytic/slither#tools)는 다음과 같이 토큰 주소에서 직접 실행할 수 있습니다.

[슬리더 사용 튜토리얼](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

```bash
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken
```

이 체크리스트를 따르려면, 해당 토큰에 대한 슬리더의 다음 출력이 필요합니다.

```bash
- slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
- slither [target] --print human-summary
- slither [target] --print contract-summary
- slither-prop . --contract ContractName # 설정 및 에키드나와 맨티코어 사용이 필요합니다.
```

## 일반적인 고려 사항 {#general-considerations}

- **컨트랙트가 보안 감사를 받았습니다.** 보안 감사를 받지 않은 컨트랙트와의 상호작용은 피하세요. 평가 기간(일명 "노력 수준"), 보안 업체의 평판, 발견된 문제의 수와 심각도를 확인하세요.
- **개발자에게 연락을 취했습니다.** 사고 발생 시 해당 팀에 알려야 할 수도 있습니다. [블록체인 보안 연락처(blockchain-security-contacts)](https://github.com/crytic/blockchain-security-contacts)에서 적절한 연락처를 찾아보세요.
- **중요한 공지를 위한 보안 메일링 리스트가 있습니다.** 해당 팀은 중요한 문제가 발견되거나 업그레이드가 발생할 때 사용자(여러분과 같은!)에게 알려야 합니다.

## ERC 규격 준수 {#erc-conformity}

슬리더에는 토큰이 여러 관련 ERC 표준을 준수하는지 검토하는 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance) 유틸리티가 포함되어 있습니다. slither-check-erc를 사용하여 다음 사항을 검토하세요.

- **transfer 및 transferFrom이 불리언(boolean) 값을 반환합니다.** 일부 토큰은 이 함수들에서 불리언 값을 반환하지 않습니다. 그 결과, 컨트랙트 내에서 해당 함수 호출이 실패할 수 있습니다.
- **name, decimals, symbol 함수가 사용되는 경우 존재합니다.** 이 함수들은 ERC-20 표준에서 선택 사항이므로 존재하지 않을 수도 있습니다.
- **decimals가 uint8을 반환합니다.** 일부 토큰은 잘못하여 uint256을 반환합니다. 이 경우 반환된 값이 255 미만인지 확인하세요.
- **토큰이 알려진 [ERC-20 경쟁 상태(race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)를 완화합니다.** ERC-20 표준에는 공격자가 토큰을 훔치는 것을 방지하기 위해 반드시 완화해야 하는 알려진 ERC-20 경쟁 상태 문제가 있습니다.
- **토큰이 ERC-777 토큰이 아니며 transfer 및 transferFrom에 외부 함수 호출이 없습니다.** 전송 함수 내의 외부 호출은 재진입(reentrancy) 공격으로 이어질 수 있습니다.

슬리더에는 일반적인 여러 ERC 결함을 발견할 수 있는 단위 테스트와 보안 속성을 생성하는 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation) 유틸리티가 포함되어 있습니다. slither-prop을 사용하여 다음 사항을 검토하세요.

- **컨트랙트가 slither-prop의 모든 단위 테스트와 보안 속성을 통과합니다.** 생성된 단위 테스트를 실행한 다음, [에키드나(Echidna)](https://github.com/crytic/echidna)와 [맨티코어(Manticore)](https://manticore.readthedocs.io/en/latest/verifier.html)를 사용하여 속성을 확인하세요.

마지막으로, 자동으로 식별하기 어려운 특정 특성들이 있습니다. 이러한 조건들은 수동으로 검토하세요.

- **transfer 및 transferFrom은 수수료를 부과하지 않아야 합니다.** 디플레이션 토큰은 예상치 못한 동작을 유발할 수 있습니다.
- **토큰에서 얻을 수 있는 잠재적 이자를 고려합니다.** 일부 토큰은 토큰 보유자에게 이자를 분배합니다. 이를 고려하지 않으면 이자가 컨트랙트 내에 갇힐 수 있습니다.

## 컨트랙트 구성 {#contract-composition}

- **컨트랙트는 불필요한 복잡성을 피합니다.** 토큰은 단순한 컨트랙트여야 합니다. 복잡한 코드를 가진 토큰은 더 높은 수준의 검토가 필요합니다. 슬리더의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)를 사용하여 복잡한 코드를 식별하세요.
- **컨트랙트가 SafeMath를 사용합니다.** SafeMath를 사용하지 않는 컨트랙트는 더 높은 수준의 검토가 필요합니다. SafeMath 사용 여부를 수동으로 검사하세요.
- **컨트랙트에 토큰과 관련 없는 함수가 거의 없습니다.** 토큰과 관련 없는 함수는 컨트랙트에서 문제가 발생할 가능성을 높입니다. 슬리더의 [contract-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 컨트랙트에 사용된 코드를 전반적으로 검토하세요.
- **토큰이 단 하나의 주소만 가집니다.** 잔액 업데이트를 위한 진입점이 여러 개인 토큰은 주소 기반의 내부 장부 기록을 망가뜨릴 수 있습니다(예: `balances[token_address][msg.sender]`가 실제 잔액을 반영하지 않을 수 있음).

## 소유자 권한 {#owner-privileges}

- **토큰은 업그레이드할 수 없습니다.** 업그레이드 가능한 컨트랙트는 시간이 지남에 따라 규칙이 변경될 수 있습니다. 슬리더의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 컨트랙트가 업그레이드 가능한지 확인하세요.
- **소유자의 발행 권한이 제한되어 있습니다.** 악의적이거나 손상된 소유자는 발행 권한을 남용할 수 있습니다. 슬리더의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 발행 권한을 검토하고, 코드를 수동으로 검토하는 것을 고려하세요.
- **토큰은 일시 중지할 수 없습니다.** 악의적이거나 손상된 소유자는 일시 중지 가능한 토큰에 의존하는 컨트랙트를 가둘 수 있습니다. 일시 중지 가능한 코드를 수동으로 식별하세요.
- **소유자는 컨트랙트를 블랙리스트에 추가할 수 없습니다.** 악의적이거나 손상된 소유자는 블랙리스트 기능이 있는 토큰에 의존하는 컨트랙트를 가둘 수 있습니다. 블랙리스트 기능을 수동으로 식별하세요.
- **토큰의 개발팀이 알려져 있으며 남용에 대해 책임을 질 수 있습니다.** 익명의 개발팀이 만들었거나 법적 보호 구역에 있는 컨트랙트는 더 높은 수준의 검토가 필요합니다.

## 토큰 희소성 {#token-scarcity}

토큰 희소성 문제에 대한 검토는 수동으로 진행해야 합니다. 다음 조건들을 확인하세요.

- **어떤 사용자도 공급량의 대부분을 소유하지 않습니다.** 소수의 사용자가 토큰의 대부분을 소유하고 있다면, 토큰의 분배 상태를 바탕으로 운영에 영향을 미칠 수 있습니다.
- **총 공급량이 충분합니다.** 총 공급량이 적은 토큰은 쉽게 조작될 수 있습니다.
- **토큰이 여러 거래소에 분산되어 있습니다.** 모든 토큰이 하나의 거래소에만 있다면, 해당 거래소가 손상될 경우 토큰에 의존하는 컨트랙트도 손상될 수 있습니다.
- **사용자가 대규모 자금이나 플래시 론(flash loan)과 관련된 위험을 이해하고 있습니다.** 토큰 잔액에 의존하는 컨트랙트는 대규모 자금을 가진 공격자나 플래시 론을 통한 공격을 신중하게 고려해야 합니다.
- **토큰이 플래시 발행(flash minting)을 허용하지 않습니다.** 플래시 발행은 잔액과 총 공급량에 상당한 변동을 일으킬 수 있으며, 이는 토큰 운영 시 엄격하고 포괄적인 오버플로 검사를 필요로 합니다.