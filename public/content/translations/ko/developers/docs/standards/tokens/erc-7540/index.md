---
title: ERC-7540 비동기 토큰화 볼트 표준
description: 토큰화 볼트에 비동기 입금 및 상환 흐름을 추가하는 ERC-4626의 확장입니다.
lang: ko
---

## 소개 {#introduction}

ERC-7540은 비동기 입금 및 상환 흐름에 대한 지원을 추가하여 [ERC-4626 토큰화 볼트 표준](/developers/docs/standards/tokens/erc-4626/)을 확장합니다. 이 표준은 요청 후 청구(request-then-claim) 패턴을 도입합니다. 사용자는 먼저 요청을 제출하여 자산이나 주식을 잠그고, 볼트가 이를 처리한 후 결과를 청구합니다.

이는 볼트가 단일 트랜잭션으로 즉시 정산할 수 없는 경우에 필요합니다. 예를 들면 다음과 같습니다.

- 토큰화된 국채, 사모 신용 및 T+1 또는 T+2 정산 주기를 가진 기타 자산과 같은 실물 자산 (RWA) 프로토콜
- 신용 평가가 오프체인에서 이루어지는 무담보 대출
- 브리징으로 인해 지연이 발생하는 크로스체인 볼트 전략
- 언본딩(unbonding) 기간이 있는 유동성 스테이킹 토큰 (LST)

볼트는 입금에만, 상환에만, 또는 둘 다에 비동기 방식을 선택할 수 있습니다. 이러한 유연성을 통해 볼트 개발자는 기본 전략에서 요구하는 곳에만 비동기 흐름을 추가하고, 다른 쪽은 동기식으로 유지할 수 있습니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [토큰 표준](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) 및 [ERC-4626](/developers/docs/standards/tokens/erc-4626/)에 대해 읽어보는 것을 권장합니다.

## ERC-4626 대 ERC-7540 {#comparison}

ERC-4626에서 입금은 원자적으로 정산됩니다. 투자자는 단일 트랜잭션으로 자산을 보내고 주식을 돌려받습니다.

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540은 이를 두 단계로 나눕니다. 투자자는 먼저 `requestDeposit()`를 호출하여 자산을 잠근 다음, 볼트 관리자가 요청을 처리할 때까지 기다립니다. 처리가 완료되면 투자자는 `deposit()`를 호출하여 주식을 청구합니다. 환율은 요청 시점이 아닌 처리 완료 시점에 결정됩니다.

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

상환 흐름도 같은 방식으로 작동합니다. `requestRedeem()`는 주식을 잠그고, 처리가 완료되면 투자자는 `redeem()`를 호출하여 자산을 청구합니다.

## ERC-7540 함수 및 기능 {#body}

ERC-7540은 전체 ERC-4626 인터페이스를 상속하지만 `deposit`/`mint`/`withdraw`/`redeem`를 청구 함수로 용도를 변경합니다. 새로운 `requestDeposit` 및 `requestRedeem` 함수는 초기 요청 단계를 처리합니다.

각 요청은 세 가지 상태를 거칩니다. 대기 중(pending, 제출되어 처리를 기다림), 청구 가능(claimable, 처리 완료 및 가격 책정됨), 청구됨(claimed, 투자자가 주식이나 자산을 수령함)입니다.

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### 입금 요청 흐름 {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

`owner`에서 볼트로 `assets`를 전송하고 입금 요청을 제출합니다. `controller` 주소가 요청에 대한 제어권을 받습니다. 요청 배치를 식별하는 `requestId`를 반환합니다.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

주어진 `controller` 및 `requestId`에 대해 대기 중인(아직 청구할 수 없는) 입금 요청의 `assets` 양을 반환합니다.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

주어진 `controller` 및 `requestId`에 대해 청구 가능한(처리는 완료되었으나 아직 청구되지 않은) 입금 요청의 `assets` 양을 반환합니다.

#### 입금 청구 {#claiming-deposits}

입금 요청이 청구 가능해지면, 사용자는 표준 ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) 또는 [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) 함수를 호출하여 주식을 청구합니다. ERC-7540에서 이 함수들은 더 이상 자산을 전송하지 않습니다(이는 이미 요청 시점에 발생했습니다). 수신자에게 주식을 발행하기만 합니다.

### 상환 요청 흐름 {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

`owner`의 `shares`를 잠그고 상환 요청을 제출합니다. `controller` 주소가 요청에 대한 제어권을 받습니다.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

주어진 `controller` 및 `requestId`에 대해 대기 중인 상환 요청의 `shares` 양을 반환합니다.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

주어진 `controller` 및 `requestId`에 대해 청구 가능한 상환 요청의 `shares` 양을 반환합니다.

#### 상환 청구 {#claiming-redemptions}

상환 요청이 청구 가능해지면, 사용자는 표준 ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) 또는 [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) 함수를 호출하여 자산을 청구합니다.

### 오퍼레이터 관리 {#operator-management}

ERC-7540은 제3자가 사용자를 대신하여 요청을 관리할 수 있도록 하는 오퍼레이터 패턴([ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)에서 차용)을 포함합니다.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

입금/상환 요청 및 청구에 대해 `msg.sender`를 대신하여 행동하도록 `operator`를 승인하거나 취소합니다.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

`operator`가 `controller`를 대신하여 행동하도록 승인되었는지 여부를 반환합니다.

### 요청 ID {#request-ids}

요청 ID는 서로 다른 요청 배치를 구분합니다. 동일한 `requestId`를 공유하는 모든 요청은 대체 가능(fungible)합니다. 즉, 함께 상태가 전환되며 동일한 환율을 적용받습니다.

볼트가 모든 요청에 대해 `requestId = 0`을 반환하는 경우, `controller` 주소만이 요청 상태를 구분합니다. 동일한 컨트롤러에서 온 여러 요청은 집계됩니다.

### 이벤트 {#events}

#### DepositRequest 이벤트 {#depositrequest-event}

[`requestDeposit`](#requestdeposit)를 통해 입금 요청이 제출될 때 반드시 발생(emit)해야 합니다.

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest 이벤트 {#redeemrequest-event}

[`requestRedeem`](#requestredeem)를 통해 상환 요청이 제출될 때 반드시 발생해야 합니다.

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet 이벤트 {#operatorset-event}

[`setOperator`](#setoperator)를 통해 오퍼레이터가 승인되거나 취소될 때 반드시 발생해야 합니다.

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### 미리보기 함수 {#preview-functions}

미리보기(preview) 함수는 비동기식 흐름에 대해서만 되돌리기(revert)를 수행해야 합니다. 요청이 처리될 때까지 환율을 알 수 없기 때문입니다. 비동기 입금 볼트에서 `previewDeposit` 및 `previewMint`는 반드시 되돌리기를 수행해야 하는 반면, `previewRedeem` 및 `previewWithdraw`는 ERC-4626에서와 같이 계속 작동합니다(비동기 상환 볼트의 경우는 그 반대). 이는 ERC-4626과의 주요한 동작 차이점입니다.

## 더 읽어보기 {#further-reading}

- [EIP-7540: 비동기 ERC-4626 토큰화 볼트](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: 토큰화 볼트 표준](https://eips.ethereum.org/EIPS/eip-4626)
- [오픈제플린 ERC-7540 구현](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)