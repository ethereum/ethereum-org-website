---
title: "토큰 연동 체크리스트"
description: "토큰과 상호작용할 때 고려해야 할 사항들의 체크리스트"
author: "트레일오브비츠"
lang: ko
tags: ["Solidity", "스마트 컨트랙트", "보안", "토큰"]
skill: intermediate
breadcrumb: "토큰 연동"
published: 2020-08-13
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/blob/master/development-guidelines/token_integration.md
---

임의의 토큰과 상호작용할 때 이 체크리스트를 따르세요. 각 항목과 관련된 위험을 이해하고, 이 규칙에 대한 예외 사항을 정당화할 수 있는지 확인하세요.

편의를 위해 모든 Slither [유틸리티](https://github.com/crytic/slither#tools)는 다음과 같이 토큰 주소에서 직접 실행할 수 있습니다.

[Slither 사용 튜토리얼](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/)

Etherscan에서 검증된 소스 코드를 가져오려면 [Etherscan API 키](https://docs.etherscan.io/set-up-your-api-key)가 필요합니다(무료 키도 작동합니다). `--etherscan-apikey`와 함께 전달하거나, Slither도 읽을 수 있는 `ETHERSCAN_API_KEY` 환경 변수를 설정하세요.

```sh
export ETHERSCAN_API_KEY=<your-etherscan-api-key>
slither-check-erc 0xdac17f958d2ee523a2206206994597c13d831ec7 TetherToken --erc erc20 --etherscan-apikey $ETHERSCAN_API_KEY
slither-check-erc 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d KittyCore --erc erc721 --etherscan-apikey $ETHERSCAN_API_KEY
```

키가 없으면 명령이 `Invalid etherscan API Key` 오류와 함께 실패합니다.

이 체크리스트를 따르려면 토큰에 대한 Slither의 다음 출력이 필요합니다.

```sh
slither-check-erc [target] [contractName] [optional: --erc ERC_NUMBER]
slither [target] --print human-summary
slither [target] --print contract-summary
slither-prop . --contract ContractName # 설정 및 Echidna 사용이 필요합니다
```

## 일반적인 고려 사항 {#general-considerations}

- **컨트랙트가 보안 감사를 받았습니다.** 보안 감사를 받지 않은 컨트랙트와의 상호작용은 피하세요. 평가 기간(일명 "노력 수준"), 보안 업체의 평판, 발견된 문제의 수와 심각도를 확인하세요.
- **개발자에게 연락을 취했습니다.** 사고 발생 시 해당 팀에 알려야 할 수도 있습니다. [블록체인 보안 연락처(blockchain-security-contacts)](https://github.com/crytic/blockchain-security-contacts)에서 적절한 연락처를 찾아보세요.
- **중요한 공지를 위한 보안 메일링 리스트가 있습니다.** 해당 팀은 중요한 문제가 발견되거나 업그레이드가 발생할 때 사용자(여러분과 같은!)에게 알려야 합니다.

## ERC 적합성 {#erc-conformity}

Slither에는 토큰이 여러 관련 ERC 표준을 준수하는지 검토하는 [slither-check-erc](https://github.com/crytic/slither/wiki/ERC-Conformance)라는 유틸리티가 포함되어 있습니다. slither-check-erc를 사용하여 다음을 검토하세요.

- **transfer 및 transferFrom이 부울(boolean)을 반환합니다.** 일부 토큰은 이 함수들에서 부울을 반환하지 않습니다. 결과적으로 컨트랙트 내에서 해당 호출이 실패할 수 있습니다.
- **사용되는 경우 name, decimals 및 symbol 함수가 존재합니다.** 이 함수들은 ERC-20 표준에서 선택 사항이므로 존재하지 않을 수 있습니다.
- **decimals가 uint8을 반환합니다.** 일부 토큰은 잘못하여 uint256을 반환합니다. 이 경우 반환된 값이 255 미만인지 확인하세요.
- **토큰이 알려진 [ERC-20 경쟁 조건(race condition)](https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729)을 완화합니다.** ERC-20 표준에는 공격자가 토큰을 훔치는 것을 방지하기 위해 완화해야 하는 알려진 ERC-20 경쟁 조건이 있습니다.
- **토큰이 ERC-777 토큰이 아니며 transfer 및 transferFrom에 외부 함수 호출이 없습니다.** 전송 함수 내의 외부 호출은 재진입(reentrancy)으로 이어질 수 있습니다.

Slither에는 여러 일반적인 ERC 결함을 발견할 수 있는 단위 테스트 및 보안 속성을 생성하는 [slither-prop](https://github.com/crytic/slither/wiki/Property-generation)이라는 유틸리티가 포함되어 있습니다. slither-prop을 사용하여 다음을 검토하세요.

- **컨트랙트가 slither-prop의 모든 단위 테스트 및 보안 속성을 통과합니다.** 생성된 단위 테스트를 실행한 다음, [Echidna](https://github.com/crytic/echidna)로 속성을 확인하세요.

마지막으로, 자동으로 식별하기 어려운 특정 특성들이 있습니다. 이러한 조건은 수동으로 검토하세요.

- **transfer 및 transferFrom은 수수료를 받지 않아야 합니다.** 디플레이션 토큰은 예기치 않은 동작을 유발할 수 있습니다.
- **토큰에서 얻을 수 있는 잠재적 이자를 고려합니다.** 일부 토큰은 토큰 보유자에게 이자를 분배합니다. 이를 고려하지 않으면 이자가 컨트랙트에 갇힐 수 있습니다.

## 컨트랙트 구성 {#contract-composition}

- **컨트랙트가 불필요한 복잡성을 피합니다.** 토큰은 단순한 컨트랙트여야 합니다. 복잡한 코드를 가진 토큰은 더 높은 수준의 검토가 필요합니다. Slither의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)를 사용하여 복잡한 코드를 식별하세요.
- **컨트랙트가 검사된 산술 연산을 사용합니다.** Solidity 0.8 이상은 기본적으로 오버플로 및 언더플로 발생 시 되돌리기(revert)를 수행합니다. 이전 컨트랙트는 동일한 보호를 위해 SafeMath가 필요합니다. SafeMath 없이 이전 버전으로 컴파일되었거나 `unchecked` 블록을 사용하는 컨트랙트는 더 높은 수준의 검토가 필요합니다. 특히 `unchecked` 블록과 인라인 어셈블리 내부의 산술 연산을 수동으로 검사하세요.
- **컨트랙트에 토큰과 관련 없는 함수가 거의 없습니다.** 토큰과 관련 없는 함수는 컨트랙트에서 문제가 발생할 가능성을 높입니다. Slither의 [contract-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#contract-summary)를 사용하여 컨트랙트에 사용된 코드를 전반적으로 검토하세요.
- **토큰이 단일 주소만 가집니다.** 잔액 업데이트를 위한 진입점이 여러 개인 토큰은 주소를 기반으로 하는 내부 장부 기록을 망가뜨릴 수 있습니다(예: `balances[token_address][msg.sender]`가 실제 잔액을 반영하지 않을 수 있음).

## 소유자 권한 {#owner-privileges}

- **토큰은 업그레이드할 수 없습니다.** 업그레이드 가능한 컨트랙트는 시간이 지남에 따라 규칙이 변경될 수 있습니다. 슬리더의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)를 사용하여 컨트랙트가 업그레이드 가능한지 확인하세요.
- **소유자의 발행 권한이 제한되어 있습니다.** 악의적이거나 손상된 소유자는 발행 권한을 남용할 수 있습니다. 슬리더의 [human-summary 프린터](https://github.com/crytic/slither/wiki/Printer-documentation#human-summary)를 사용하여 발행 권한을 검토하고, 코드를 수동으로 검토하는 것을 고려하세요.
- **토큰은 일시 중지할 수 없습니다.** 악의적이거나 손상된 소유자는 일시 중지 가능한 토큰에 의존하는 컨트랙트를 가둘 수 있습니다. 일시 중지 가능한 코드를 수동으로 식별하세요.
- **소유자는 컨트랙트를 블랙리스트에 추가할 수 없습니다.** 악의적이거나 손상된 소유자는 블랙리스트 기능이 있는 토큰에 의존하는 컨트랙트를 가둘 수 있습니다. 블랙리스트 기능을 수동으로 식별하세요.
- **토큰의 개발팀이 알려져 있으며 남용에 대해 책임을 질 수 있습니다.** 익명의 개발팀이 만들었거나 법적 보호 구역에 있는 컨트랙트는 더 높은 수준의 검토가 필요합니다.

## 토큰 희소성 {#token-scarcity}

토큰 희소성 문제에 대한 검토는 수동 검토가 필요합니다. 다음 조건을 확인하세요.

- **어떤 사용자도 공급량의 대부분을 소유하지 않습니다.** 소수의 사용자가 토큰의 대부분을 소유하고 있다면, 토큰의 분배 상태를 기반으로 운영에 영향을 미칠 수 있습니다.
- **총 공급량이 충분합니다.** 총 공급량이 적은 토큰은 쉽게 조작될 수 있습니다.
- **토큰이 여러 거래소에 위치해 있습니다.** 모든 토큰이 하나의 거래소에 있다면, 해당 거래소가 손상될 경우 토큰에 의존하는 컨트랙트도 손상될 수 있습니다.
- **사용자가 대규모 자금이나 플래시 론(flash loan)과 관련된 위험을 이해하고 있습니다.** 토큰 잔액에 의존하는 컨트랙트는 대규모 자금을 가진 공격자나 플래시 론을 통한 공격을 신중하게 고려해야 합니다.
- **토큰이 플래시 발행(flash minting)을 허용하지 않습니다.** 플래시 발행은 잔액과 총 공급량에 상당한 변동을 초래할 수 있으며, 이는 토큰 운영 시 엄격하고 포괄적인 오버플로 검사를 필요로 합니다.
## 알려진 비표준 ERC-20 토큰 {#known-non-standard-erc20-tokens}

임의의 토큰과의 연동을 허용하는 프로토콜은 잘 알려진 특정 비표준 ERC-20 토큰을 적절히 처리하도록 주의해야 합니다. 추가적인 위험을 수반하는 잘 알려진 토큰에 대해서는 [비표준 토큰 목록](https://secure-contracts.com/development-guidelines/non-standard-tokens.html)을 참조하세요.

## ERC-721 토큰 {#erc721-tokens}

### ERC-721 적합성 검사 {#erc721-conformity-checks}

특정 컨트랙트의 동작은 원래의 ERC 사양과 다를 수 있습니다. 다음 조건을 수동으로 검토하세요.

- **0x0 주소로의 토큰 전송이 되돌리기(revert)됩니다.** 일부 토큰은 0x0으로의 전송을 허용하고 해당 주소로 전송된 토큰을 소각된 것으로 간주합니다. 하지만 ERC-721 표준은 이러한 전송이 되돌리기되어야 한다고 요구합니다.
- **`safeTransferFrom` 함수가 올바른 서명으로 구현되어 있습니다.** 일부 토큰 컨트랙트는 이 함수들을 구현하지 않습니다. 이러한 컨트랙트 중 하나로 NFT를 전송하면 자산 손실이 발생할 수 있습니다.
- **사용되는 경우 `name`, `decimals` 및 `symbol` 함수가 존재합니다.** 이 함수들은 ERC-721 표준에서 선택 사항이므로 존재하지 않을 수 있습니다.
- **사용되는 경우 `decimals`가 `uint8(0)`를 반환합니다.** 다른 값은 유효하지 않습니다.
- **`name` 및 `symbol` 함수는 빈 문자열을 반환할 수 있습니다.** 이 동작은 표준에서 허용됩니다.
- **`tokenId`가 유효하지 않거나 이미 소각된 토큰을 참조하는 경우 `ownerOf` 함수가 되돌리기됩니다.** 이 함수는 0x0을 반환할 수 없습니다. 이 동작은 표준에서 요구되지만 항상 올바르게 구현되어 있지는 않을 수 있습니다.
- **NFT 전송 시 승인(approval)이 초기화됩니다.** 이는 표준에서 요구됩니다.
- **NFT의 토큰 ID는 수명 주기 동안 변경될 수 없습니다.** 이는 표준에서 요구됩니다.

### ERC-721 표준의 일반적인 위험 {#common-risks-of-the-erc721-standard}

다음 조건을 수동으로 검토하여 ERC-721 컨트랙트와 관련된 위험을 완화하세요.

- **`onERC721Received` 콜백이 고려됩니다.** 전송 함수 내의 외부 호출은 특히 콜백이 명시적이지 않을 때(예: [`safeMint`](https://www.paradigm.xyz/writing/the-dangers-of-surprising-code) 호출에서) 재진입으로 이어질 수 있습니다.
- **NFT가 발행될 때 스마트 컨트랙트로 안전하게 전송됩니다.** 발행 함수가 존재하는 경우, `safeTransferFrom`와 유사하게 동작해야 하며 스마트 컨트랙트로의 새로운 토큰 발행을 적절히 처리하여 자산 손실을 방지해야 합니다.
- **토큰 소각 시 승인이 초기화됩니다.** 소각 함수가 존재하는 경우, 토큰의 이전 승인을 초기화해야 합니다.
