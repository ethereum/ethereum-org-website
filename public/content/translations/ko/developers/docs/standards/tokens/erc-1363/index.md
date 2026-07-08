---
title: "ERC-1363 지불 가능 토큰 표준"
description: "ERC-1363은 단일 트랜잭션 내에서 전송 후 수신자 컨트랙트에서, 또는 승인 후 지출자 컨트랙트에서 사용자 지정 로직을 실행할 수 있도록 지원하는 ERC-20 토큰용 확장 인터페이스입니다."
lang: ko
---

## 소개 {#introduction}

### ERC-1363이란 무엇인가요? {#what-is-erc1363}

ERC-1363은 단일 트랜잭션 내에서 전송 후 수신자 컨트랙트에서, 또는 승인 후 지출자 컨트랙트에서 사용자 지정 로직을 실행할 수 있도록 지원하는 ERC-20 토큰용 확장 인터페이스입니다.

### ERC-20과의 차이점 {#erc20-differences}

`transfer`, `transferFrom` 및 `approve`와 같은 표준 ERC-20 작업은 별도의 트랜잭션 없이는 수신자 또는 지출자 컨트랙트에서 코드를 실행할 수 없습니다.
사용자가 첫 번째 트랜잭션이 실행될 때까지 기다린 다음 두 번째 트랜잭션을 제출해야 하므로, 이는 UI 개발의 복잡성을 증가시키고 채택에 마찰을 일으킵니다.
또한 가스를 두 번 지불해야 합니다.

ERC-1363은 대체 가능 토큰이 더 쉽게 작업을 수행하고 오프체인 리스너를 사용하지 않고도 작동할 수 있게 해줍니다.
이를 통해 단일 트랜잭션으로 전송 또는 승인 후에 수신자 또는 지출자 컨트랙트에서 콜백을 수행할 수 있습니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하기 위해 다음 내용을 먼저 읽어보시기를 권장합니다.

- [토큰 표준](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 본문 {#body}

ERC-1363은 `transfer`, `transferFrom` 또는 `approve` 이후에 ERC-20 토큰이 스마트 컨트랙트와 상호 작용할 수 있는 표준 API를 도입합니다.

이 표준은 토큰을 전송하는 기본 기능뿐만 아니라, 다른 온체인 제3자가 지출할 수 있도록 토큰을 승인한 다음 수신자 또는 지출자 컨트랙트에서 콜백을 수행할 수 있는 기능을 제공합니다.

ERC-20 콜백을 수락할 수 있는 스마트 컨트랙트의 다양한 활용 사례가 제안되었습니다.

예시는 다음과 같습니다.

- **크라우드세일**: 전송된 토큰이 즉각적인 보상 할당을 트리거합니다.
- **서비스**: 결제 시 단일 단계로 서비스 접근 권한이 활성화됩니다.
- **청구서**: 토큰이 청구서를 자동으로 정산합니다.
- **구독**: 연간 요금을 승인하면 첫 달 결제와 함께 구독이 활성화됩니다.

이러한 이유로 원래 <strong>"지불 가능 토큰(Payable Token)"</strong>이라고 명명되었습니다.

콜백 동작은 그 유용성을 더욱 확장하여 다음과 같은 원활한 상호 작용을 가능하게 합니다.

- **스테이킹**: 전송된 토큰이 스테이킹 컨트랙트에서 자동 잠금을 트리거합니다.
- **투표**: 수신된 토큰이 거버넌스 시스템에 투표를 등록합니다.
- **스왑**: 토큰 승인이 단일 단계로 스왑 로직을 활성화합니다.

ERC-1363 토큰은 전송 또는 승인을 받은 후 콜백을 실행해야 하는 모든 경우에 특정 유틸리티로 사용할 수 있습니다.
또한 ERC-1363은 수신자가 토큰을 처리할 수 있는 능력을 검증함으로써 스마트 컨트랙트에서 토큰이 손실되거나 잠기는 것을 방지하는 데 유용합니다.

다른 ERC-20 확장 제안과 달리, ERC-1363은 ERC-20의 `transfer` 및 `transferFrom` 메서드를 재정의하지 않으며, ERC-20과의 하위 호환성을 유지하면서 구현할 인터페이스 ID를 정의합니다.

[EIP-1363](https://eips.ethereum.org/EIPS/eip-1363) 발췌:

### 메서드 {#methods}

ERC-1363 표준을 구현하는 스마트 컨트랙트는 `ERC20` 및 `ERC165` 인터페이스뿐만 아니라 `ERC1363` 인터페이스의 모든 함수를 **반드시** 구현해야 합니다.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev 단일 트랜잭션에서 `transfer` 또는 `transferFrom` 이후 수신자 컨트랙트에서 코드를 실행하거나, `approve` 이후 지출자 컨트랙트에서 코드를 실행하는 것을 지원하는 ERC-20 토큰용 확장 인터페이스입니다.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * 참고: 이 인터페이스의 ERC-165 식별자는 0xb0202a11입니다.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 호출자의 계정에서 `to`로 `value`만큼의 토큰을 전송한 다음 `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.
   * @param to 토큰이 전송되는 주소입니다.
   * @param value 전송할 토큰의 양입니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 호출자의 계정에서 `to`로 `value`만큼의 토큰을 전송한 다음 `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.
   * @param to 토큰이 전송되는 주소입니다.
   * @param value 전송할 토큰의 양입니다.
   * @param data 지정된 형식이 없는 추가 데이터로, `to` 호출 시 전송됩니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 허용량(allowance) 메커니즘을 사용하여 `from`에서 `to`로 `value`만큼의 토큰을 전송한 다음 `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.
   * @param from 토큰을 보낼 주소입니다.
   * @param to 토큰이 전송되는 주소입니다.
   * @param value 전송할 토큰의 양입니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev 허용량(allowance) 메커니즘을 사용하여 `from`에서 `to`로 `value`만큼의 토큰을 전송한 다음 `to`에서 `ERC1363Receiver::onTransferReceived`를 호출합니다.
   * @param from 토큰을 보낼 주소입니다.
   * @param to 토큰이 전송되는 주소입니다.
   * @param value 전송할 토큰의 양입니다.
   * @param data 지정된 형식이 없는 추가 데이터로, `to` 호출 시 전송됩니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 호출자의 토큰에 대해 `spender`의 허용량으로 `value`만큼의 토큰을 설정한 다음 `spender`에서 `ERC1363Spender::onApprovalReceived`를 호출합니다.
   * @param spender 자금을 지출할 주소입니다.
   * @param value 지출할 토큰의 양입니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 호출자의 토큰에 대해 `spender`의 허용량으로 `value`만큼의 토큰을 설정한 다음 `spender`에서 `ERC1363Spender::onApprovalReceived`를 호출합니다.
   * @param spender 자금을 지출할 주소입니다.
   * @param value 지출할 토큰의 양입니다.
   * @param data 지정된 형식이 없는 추가 데이터로, `spender` 호출 시 전송됩니다.
   * @return 예외가 발생하지 않는 한 작업이 성공했음을 나타내는 부울 값입니다.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

`transferAndCall` 또는 `transferFromAndCall`를 통해 ERC-1363 토큰을 수락하려는 스마트 컨트랙트는 **반드시** `ERC1363Receiver` 인터페이스를 구현해야 합니다.

```solidity
/**
 * @title ERC1363Receiver
 * @dev ERC-1363 토큰 컨트랙트에서 `transferAndCall` 또는 `transferFromAndCall`을 지원하려는 모든 컨트랙트를 위한 인터페이스입니다.
 */
interface ERC1363Receiver {
  /**
   * @dev `operator`가 `from`에서 `ERC1363::transferAndCall` 또는 `ERC1363::transferFromAndCall`을 통해 이 컨트랙트로 ERC-1363 토큰을 전송할 때마다 이 함수가 호출됩니다.
   *
   * 참고: 전송을 수락하려면 이 함수는 반드시
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (즉, 0x88a7ca5c 또는 자체 함수 선택자)를 반환해야 합니다.
   *
   * @param operator `transferAndCall` 또는 `transferFromAndCall` 함수를 호출한 주소입니다.
   * @param from 토큰이 전송되는 출발지 주소입니다.
   * @param value 전송된 토큰의 양입니다.
   * @param data 지정된 형식이 없는 추가 데이터입니다.
   * @return 예외가 발생하지 않고 전송이 허용되는 경우 `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`를 반환합니다.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

`approveAndCall`를 통해 ERC-1363 토큰을 수락하려는 스마트 컨트랙트는 **반드시** `ERC1363Spender` 인터페이스를 구현해야 합니다.

```solidity
/**
 * @title ERC1363Spender
 * @dev ERC-1363 토큰 컨트랙트에서 `approveAndCall`을 지원하려는 모든 컨트랙트를 위한 인터페이스입니다.
 */
interface ERC1363Spender {
  /**
   * @dev ERC-1363 토큰의 `owner`가 자신의 토큰을 지출하도록 `ERC1363::approveAndCall`을 통해 이 컨트랙트를 승인할 때마다 이 함수가 호출됩니다.
   *
   * 참고: 승인을 수락하려면 이 함수는 반드시
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (즉, 0x7b04a2d0 또는 자체 함수 선택자)를 반환해야 합니다.
   *
   * @param owner `approveAndCall` 함수를 호출하고 이전에 토큰을 소유했던 주소입니다.
   * @param value 지출할 토큰의 양입니다.
   * @param data 지정된 형식이 없는 추가 데이터입니다.
   * @return 예외가 발생하지 않고 승인이 허용되는 경우 `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`를 반환합니다.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 더 읽어보기 {#further-reading}

- [ERC-1363: 지불 가능 토큰 표준](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: GitHub 리포지토리](https://github.com/vittominacori/erc1363-payable-token)