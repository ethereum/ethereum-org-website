---
title: "ERC-1363 지불 가능 토큰 표준"
description: "ERC-1363은 단일 트랜잭션 내에서 전송 후 수신자 계약에서 또는 승인 후 지출자 계약에서 맞춤형 로직 실행을 지원하는 ERC-20 토큰의 확장 인터페이스입니다."
lang: ko
---

## 소개 {#introduction}

### ERC-1363은 무엇인가요? {#what-is-erc1363}

ERC-1363은 단일 트랜잭션 내에서 전송 후 수신자 계약에서 또는 승인 후 지출자 계약에서 맞춤형 로직 실행을 지원하는 ERC-20 토큰의 확장 인터페이스입니다.

### ERC-20과의 차이점 {#erc20-differences}

`transfer`, `transferFrom` 및 `approve`와 같은 표준 ERC-20 작업은 별도의 트랜잭션 없이는 수신자 또는 지출자 계약에서 코드 실행을 허용하지 않습니다.
사용자는 첫 번째 트랜잭션을 실행한 다음 두 번째 트랜잭션을 제출해야 하므로 이는 UI 개발의 복잡성을 가중시키고 채택에 마찰을 일으킵니다.
또한 가스를 두 번 지불해야 합니다.

ERC-1363을 사용하면 대체 가능 토큰이 더 쉽게 작업을 수행하고 오프체인 리스너 없이 작동할 수 있습니다.
단일 트랜잭션에서 전송 또는 승인 후 수신자 또는 지출자 계약에 대한 콜백을 수행할 수 있습니다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 다음에 대해 읽어보는 것을 권장합니다.

- [토큰 표준](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 본문 {#body}

ERC-1363은 `transfer`, `transferFrom` 또는 `approve` 이후 ERC-20 토큰이 스마트 계약과 상호 작용할 수 있는 표준 API를 도입합니다.

이 표준은 토큰을 전송하는 기본 기능을 제공하며, 토큰이 다른 온체인 제3자에 의해 사용될 수 있도록 승인한 다음 수신자 또는 지출자 계약에 대한 콜백을 수행할 수 있도록 합니다.

ERC-20 콜백을 수락할 수 있는 스마트 계약의 제안된 용도가 많이 있습니다.

예는 다음과 같습니다.

- **크라우드세일**: 전송된 토큰이 즉시 보상 할당을 트리거합니다.
- **서비스**: 결제로 한 단계에서 서비스 액세스가 활성화됩니다.
- **인보이스**: 토큰이 자동으로 인보이스를 정산합니다.
- **구독**: 연간 요금을 승인하면 첫 달 결제 내에서 구독이 활성화됩니다.

이러한 이유로 원래 \*\*\"Payable Token\"\*\*이라고 명명되었습니다.

콜백 동작은 유틸리티를 더욱 확장하여 다음과 같은 원활한 상호 작용을 가능하게 합니다.

- **스테이킹**: 전송된 토큰이 스테이킹 계약에서 자동 잠금을 트리거합니다.
- **투표**: 수신된 토큰이 거버넌스 시스템에 투표를 등록합니다.
- **스왑**: 토큰 승인으로 한 단계에서 스왑 로직이 활성화됩니다.

ERC-1363 토큰은 전송 또는 승인 수신 후 콜백을 실행해야 하는 모든 경우에 특정 유틸리티에 사용될 수 있습니다.
ERC-1363은 수신자의 토큰 처리 능력을 확인함으로써 스마트 계약에서 토큰 손실이나 토큰 잠김을 방지하는 데에도 유용합니다.

다른 ERC-20 확장 제안과 달리, ERC-1363은 ERC-20 `transfer` 및 `transferFrom` 메서드를 재정의하지 않고 ERC-20과의 하위 호환성을 유지하면서 구현할 인터페이스 ID를 정의합니다.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363)에서:

### 메서드 {#methods}

ERC-1363 표준을 구현하는 스마트 계약은 `ERC1363` 인터페이스의 모든 함수와 `ERC20` 및 `ERC165` 인터페이스를 **반드시** 구현해야 합니다.

```solidity
pragma solidity ^0.8.0;\n\n/**\n * @title ERC1363\n * @dev 단일 트랜잭션에서 `transfer` 또는 `transferFrom` 후 수신자 계약에서 코드를 실행하거나, `approve` 후 지출자 계약에서 코드를 실행하는 것을 지원하는 ERC-20 토큰의 확장 인터페이스입니다.\n */\ninterface ERC1363 is ERC20, ERC165 {\n  /*\n   * 참고: 이 인터페이스의 ERC-165 식별자는 0xb0202a11입니다.\n   * 0xb0202a11 ===\n   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^\n   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^\n   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^\n   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^\n   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^\n   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))\n   */\n\n  /**\n   * @dev 호출자의 계정에서 `to`로 `value` 양의 토큰을 이동시킨 다음\n   * `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.\n   * @param to 토큰이 전송될 주소입니다.\n   * @param value 전송될 토큰의 양입니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function transferAndCall(address to, uint256 value) external returns (bool);\n\n  /**\n   * @dev 호출자의 계정에서 `to`로 `value` 양의 토큰을 이동시킨 다음\n   * `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.\n   * @param to 토큰이 전송될 주소입니다.\n   * @param value 전송될 토큰의 양입니다.\n   * @param data 지정된 형식이 없는 추가 데이터로, `to`를 호출할 때 전송됩니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);\n\n  /**\n   * @dev 허용량 메커니즘을 사용하여 `from`에서 `to`로 `value` 양의 토큰을 이동시킨 다음\n   * `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.\n   * @param from 토큰을 보낼 주소입니다.\n   * @param to 토큰이 전송될 주소입니다.\n   * @param value 전송될 토큰의 양입니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);\n\n  /**\n   * @dev 허용량 메커니즘을 사용하여 `from`에서 `to`로 `value` 양의 토큰을 이동시킨 다음\n   * `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.\n   * @param from 토큰을 보낼 주소입니다.\n   * @param to 토큰이 전송될 주소입니다.\n   * @param value 전송될 토큰의 양입니다.\n   * @param data 지정된 형식이 없는 추가 데이터로, `to`를 호출할 때 전송됩니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);\n\n  /**\n   * @dev 호출자의 토큰에 대해 `spender`의 허용량으로 `value` 양의 토큰을 설정한 다음\n   * `spender`에서 `ERC1363Spender::onApprovalReceived`를 호출합니다.\n   * @param spender 자금을 사용할 주소입니다.\n   * @param value 사용될 토큰의 양입니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function approveAndCall(address spender, uint256 value) external returns (bool);\n\n  /**\n   * @dev 호출자의 토큰에 대해 `spender`의 허용량으로 `value` 양의 토큰을 설정한 다음\n   * `spender`에서 `ERC1363Spender::onApprovalReceived`를 호출합니다.\n   * @param spender 자금을 사용할 주소입니다.\n   * @param value 사용될 토큰의 양입니다.\n   * @param data 지정된 형식이 없는 추가 데이터로, `spender`를 호출할 때 전송됩니다.\n   * @return 예외를 발생시키지 않는 한 작업이 성공했음을 나타내는 불리언 값입니다.\n   */\n  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);\n}\n\ninterface ERC20 {\n  event Transfer(address indexed from, address indexed to, uint256 value);\n  event Approval(address indexed owner, address indexed spender, uint256 value);\n  function transfer(address to, uint256 value) external returns (bool);\n  function transferFrom(address from, address to, uint256 value) external returns (bool);\n  function approve(address spender, uint256 value) external returns (bool);\n  function totalSupply() external view returns (uint256);\n  function balanceOf(address account) external view returns (uint256);\n  function allowance(address owner, address spender) external view returns (uint256);\n}\n\ninterface ERC165 {\n  function supportsInterface(bytes4 interfaceId) external view returns (bool);\n}
```

`transferAndCall` 또는 `transferFromAndCall`을 통해 ERC-1363 토큰을 수락하려는 스마트 계약은 `ERC1363Receiver` 인터페이스를 **반드시** 구현해야 합니다.

```solidity
/**\n * @title ERC1363Receiver\n * @dev ERC-1363 토큰 계약에서 `transferAndCall` 또는 `transferFromAndCall`을 지원하려는 모든 계약을 위한 인터페이스입니다.\n */\ninterface ERC1363Receiver {\n  /**\n   * @dev `operator`가 `from`에서 `ERC1363::transferAndCall` 또는 `ERC1363::transferFromAndCall`을 통해\n   * ERC-1363 토큰을 이 계약으로 전송할 때마다 이 함수가 호출됩니다.\n   *\n   * 참고: 전송을 수락하려면 이 함수는\n   * `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))`\n   * (예: 0x88a7ca5c 또는 자체 함수 선택자)를 반환해야 합니다.\n   *\n   * @param operator `transferAndCall` 또는 `transferFromAndCall` 함수를 호출한 주소입니다.\n   * @param from 토큰이 전송된 주소입니다.\n   * @param value 전송된 토큰의 양입니다.\n   * @param data 지정된 형식이 없는 추가 데이터입니다.\n   * @return 예외를 발생시키지 않는 한 전송이 허용되는 경우 `bytes4(keccak256(\"onTransferReceived(address,address,uint256,bytes)\"))`입니다.\n   */\n  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);\n}
```

`approveAndCall`을 통해 ERC-1363 토큰을 수락하려는 스마트 계약은 `ERC1363Spender` 인터페이스를 **반드시** 구현해야 합니다.

```solidity
/**\n * @title ERC1363Spender\n * @dev ERC-1363 토큰 계약에서 `approveAndCall`을 지원하려는 모든 계약을 위한 인터페이스입니다.\n */\ninterface ERC1363Spender {\n  /**\n   * @dev ERC-1363 토큰 `owner`가 `ERC1363::approveAndCall`을 통해 이 계약이\n   * 자신의 토큰을 사용하도록 승인할 때마다 이 함수가 호출됩니다.\n   *\n   * 참고: 승인을 수락하려면 이 함수는\n   * `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))`\n   * (예: 0x7b04a2d0 또는 자체 함수 선택자)를 반환해야 합니다.\n   *\n   * @param owner `approveAndCall` 함수를 호출하고 이전에 토큰을 소유했던 주소입니다.\n   * @param value 사용될 토큰의 양입니다.\n   * @param data 지정된 형식이 없는 추가 데이터입니다.\n   * @return 예외를 발생시키지 않는 한 승인이 허용되는 경우 `bytes4(keccak256(\"onApprovalReceived(address,uint256,bytes)\"))`입니다.\n   */\n  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);\n}
```

## 더 읽어보기 {#further-reading}

- [ERC-1363: 지불 가능 토큰 표준](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub 리포지토리](https://github.com/vittominacori/erc1363-payable-token)
