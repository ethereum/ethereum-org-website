---
title: ERC-1155 다중 토큰 표준
description: 단일 컨트랙트에서 대체 가능 토큰과 대체 불가능 토큰을 결합하는 다중 토큰 표준인 ERC-1155에 대해 알아봅니다.
lang: ko
---

## 소개 {#introduction}

여러 토큰 유형을 관리하는 컨트랙트를 위한 표준 인터페이스입니다. 배포된 단일 컨트랙트에는 대체 가능 토큰, 대체 불가능 토큰 또는 기타 구성(예: 반대체 가능 토큰)의 모든 조합이 포함될 수 있습니다.

**다중 토큰 표준이란 무엇을 의미하나요?**

이 아이디어는 단순하며, 원하는 수만큼의 대체 가능 토큰 및 대체 불가능 토큰 유형을 나타내고 제어할 수 있는 스마트 컨트랙트 인터페이스를 만드는 것을 목표로 합니다. 이러한 방식으로 ERC-1155 토큰은 [ERC-20](/developers/docs/standards/tokens/erc-20/) 및 [ERC-721](/developers/docs/standards/tokens/erc-721/) 토큰과 동일한 기능을 수행할 수 있으며, 심지어 두 가지 기능을 동시에 수행할 수도 있습니다. 이는 ERC-20 및 ERC-721 표준의 기능을 모두 개선하여 더 효율적으로 만들고 명백한 구현 오류를 수정합니다.

ERC-1155 토큰은 [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)에 자세히 설명되어 있습니다.

## 전제 조건 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [토큰 표준](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) 및 [ERC-721](/developers/docs/standards/tokens/erc-721/)에 대해 읽어보는 것을 권장합니다.

## ERC-1155 기능 및 특징: {#body}

- [일괄 전송(Batch Transfer)](#batch-transfers): 단일 호출로 여러 자산을 전송합니다.
- [일괄 잔액(Batch Balance)](#batch-balance): 단일 호출로 여러 자산의 잔액을 가져옵니다.
- [일괄 승인(Batch Approval)](#batch-approval): 주소에 대한 모든 토큰을 승인합니다.
- [훅(Hooks)](#receive-hook): 토큰 수신 훅입니다.
- [NFT 지원](#nft-support): 공급량이 1인 경우 NFT로 취급합니다.
- [안전한 전송 규칙(Safe Transfer Rules)](#safe-transfer-rule): 안전한 전송을 위한 규칙 세트입니다.

### 일괄 전송 {#batch-transfers}

일괄 전송은 일반적인 ERC-20 전송과 매우 유사하게 작동합니다. 일반적인 ERC-20 `transferFrom` 함수를 살펴보겠습니다.

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

ERC-1155의 유일한 차이점은 값을 배열로 전달하고 ID 배열도 함께 전달한다는 것입니다. 예를 들어 `ids=[3, 6, 13]` 및 `values=[100, 200, 5]`이 주어지면 결과 전송은 다음과 같습니다.

1. `_from`에서 `_to`(으)로 ID가 3인 토큰 100개를 전송합니다.
2. `_from`에서 `_to`(으)로 ID가 6인 토큰 200개를 전송합니다.
3. `_from`에서 `_to`(으)로 ID가 13인 토큰 5개를 전송합니다.

ERC-1155에는 `transferFrom`만 있고 `transfer`는 없습니다. 일반적인 `transfer`처럼 사용하려면 발신자(from) 주소를 함수를 호출하는 주소로 설정하기만 하면 됩니다.

### 일괄 잔액 {#batch-balance}

마찬가지로 해당 ERC-20 `balanceOf` 호출에도 일괄 처리를 지원하는 파트너 함수가 있습니다. 참고로 다음은 ERC-20 버전입니다.

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

잔액 호출의 경우 훨씬 더 간단하게 단일 호출로 여러 잔액을 검색할 수 있습니다. 소유자 배열을 전달한 다음 토큰 ID 배열을 전달합니다.

예를 들어 `_ids=[3, 6, 13]` 및 `_owners=[0xbeef..., 0x1337..., 0x1111...]`가 주어지면 반환 값은 다음과 같습니다.

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 일괄 승인 {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

승인은 ERC-20과 약간 다릅니다. 특정 금액을 승인하는 대신 `setApprovalForAll`를 통해 운영자(operator)를 승인됨 또는 승인되지 않음으로 설정합니다.

현재 상태는 `isApprovedForAll`를 통해 읽을 수 있습니다. 보시다시피 이는 전부 아니면 전무(all-or-nothing) 방식의 작업입니다. 승인할 토큰 수나 토큰 클래스를 정의할 수 없습니다.

이는 의도적으로 단순성을 염두에 두고 설계되었습니다. 하나의 주소에 대해 모든 것만 승인할 수 있습니다.

### 수신 훅 {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

[EIP-165](https://eips.ethereum.org/EIPS/eip-165) 지원을 고려할 때, ERC-1155는 스마트 컨트랙트에 대해서만 수신 훅을 지원합니다. 훅 함수는 다음과 같이 미리 정의된 매직 bytes4 값을 반환해야 합니다.

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

수신 컨트랙트가 이 값을 반환하면 해당 컨트랙트가 전송을 수락하고 ERC-1155 토큰을 처리하는 방법을 알고 있는 것으로 간주됩니다. 훌륭합니다. 더 이상 컨트랙트에 토큰이 갇히는 일이 없습니다!

### NFT 지원 {#nft-support}

공급량이 단 하나일 때, 해당 토큰은 본질적으로 대체 불가능 토큰(NFT)입니다. 그리고 ERC-721의 표준과 마찬가지로 메타데이터 URL을 정의할 수 있습니다. 클라이언트는 이 URL을 읽고 수정할 수 있습니다. [여기](https://eips.ethereum.org/EIPS/eip-1155#metadata)를 참조하세요.

### 안전한 전송 규칙 {#safe-transfer-rule}

이전 설명에서 이미 몇 가지 안전한 전송 규칙을 다루었습니다. 하지만 가장 중요한 규칙을 살펴보겠습니다.

1. 호출자는 `_from` 주소에 대해 토큰을 사용하도록 승인되어야 하거나 호출자가 `_from`와 같아야 합니다.
2. 다음과 같은 경우 전송 호출은 되돌리기 되어야 합니다.
   1. `_to` 주소가 0인 경우.
   2. `_ids`의 길이가 `_values`의 길이와 같지 않은 경우.
   3. `_ids`에 있는 토큰에 대한 보유자의 잔액 중 하나라도 수신자에게 전송되는 `_values`의 해당 금액보다 적은 경우.
   4. 기타 다른 오류가 발생하는 경우.

_참고_: 훅을 포함한 모든 일괄 처리 함수는 일괄 처리가 없는 버전으로도 존재합니다. 단일 자산을 전송하는 것이 여전히 가장 일반적으로 사용되는 방법일 가능성이 높다는 점을 고려하여 가스 효율성을 위해 이렇게 만들어졌습니다. 안전한 전송 규칙을 포함하여 설명을 단순화하기 위해 여기서는 생략했습니다. 이름은 동일하며 'Batch'만 제거하면 됩니다.

## 더 읽어보기 {#further-reading}

- [EIP-1155: 다중 토큰 표준](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: 오픈제플린 문서](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub 리포지토리](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)