---
title: ERC-1155 멀티 토큰 표준
description: 단일 계약에서 대체 가능 토큰과 대체 불가 토큰을 결합하는 멀티 토큰 표준인 ERC-1155에 대해 알아보세요.
lang: ko
---

## 소개 {#introduction}

여러 토큰 유형을 관리하는 계약을 위한 표준 인터페이스입니다. 배포된 단일 계약은 대체 가능 토큰, 대체 불가 토큰 또는 기타 구성(예: 준대체 가능 토큰)의 모든 조합을 포함할 수 있습니다.

**멀티 토큰 표준이란 무엇인가요?**

이 아이디어는 간단하며, 모든 수의 대체 가능 토큰 유형과 대체 불가 토큰 유형을 나타내고 제어할 수 있는 스마트 계약 인터페이스를 만드는 것을 목표로 합니다. 이러한 방식으로 ERC-1155 토큰은 [ERC-20](/developers/docs/standards/tokens/erc-20/) 및 [ERC-721](/developers/docs/standards/tokens/erc-721/) 토큰과 동일한 기능을 수행할 수 있으며, 심지어 동시에 두 가지 기능 모두를 수행할 수도 있습니다. ERC-20 및 ERC-721 표준의 기능을 모두 개선하여 더 효율적이고 명백한 구현 오류를 수정합니다.

ERC-1155 토큰은 [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155)에 자세히 설명되어 있습니다.

## 필수 구성 요소 {#prerequisites}

이 페이지를 더 잘 이해하려면 먼저 [토큰 표준](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/), [ERC-721](/developers/docs/standards/tokens/erc-721/)에 대해 읽어보시는 것을 권장합니다.

## ERC-1155의 기능과 특징: {#body}

- [일괄 전송](#batch_transfers): 단일 호출로 여러 자산을 전송합니다.
- [일괄 잔액 조회](#batch_balance): 단일 호출로 여러 자산의 잔액을 조회합니다.
- [일괄 승인](#batch_approval): 주소에 모든 토큰을 승인합니다.
- [훅](#receive_hook): 토큰 수신 훅입니다.
- [NFT 지원](#nft_support): 공급량이 1인 경우 NFT로 취급합니다.
- [안전 전송 규칙](#safe_transfer_rule): 안전한 전송을 위한 규칙 집합입니다.

### 일괄 전송 {#batch-transfers}

일괄 전송은 일반적인 ERC-20 전송과 매우 유사하게 작동합니다. 일반적인 ERC-20의 `transferFrom` 함수를 살펴보겠습니다.

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

ERC-1155의 유일한 차이점은 값을 배열로 전달하고, ID 배열도 전달한다는 것입니다. 예를 들어, `ids=[3, 6, 13]`과 `values=[100, 200, 5]`가 주어지면 결과적인 전송은 다음과 같습니다.

1. `_from`에서 `_to`로 ID가 3인 토큰 100개를 전송합니다.
2. `_from`에서 `_to`로 ID가 6인 토큰 200개를 전송합니다.
3. `_from`에서 `_to`로 ID가 13인 토큰 5개를 전송합니다.

ERC-1155에는 `transfer`는 없고 `transferFrom`만 있습니다. 일반 `transfer`처럼 사용하려면, from 주소를 함수를 호출하는 주소로 설정하기만 하면 됩니다.

### 일괄 잔액 조회 {#batch-balance}

각각의 ERC-20 `balanceOf` 호출에도 마찬가지로 일괄 처리를 지원하는 파트너 함수가 있습니다. 참고로, ERC-20 버전은 다음과 같습니다.

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

잔액 호출의 경우, 단일 호출로 여러 잔액을 훨씬 간단하게 검색할 수 있습니다. 소유자 배열을 전달하고, 이어서 토큰 ID 배열을 전달합니다.

예를 들어 `_ids=[3, 6, 13]`과 `_owners=[0xbeef..., 0x1337..., 0x1111...]`가 주어지면 반환 값은 다음과 같습니다.

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

승인은 ERC-20과 약간 다릅니다. 특정 금액을 승인하는 대신 `setApprovalForAll`을 통해 운영자를 승인 또는 미승인으로 설정합니다.

현재 상태는 `isApprovedForAll`을 통해 확인할 수 있습니다. 보시다시피, 이것은 전부 아니면 전무 방식의 작업입니다. 승인할 토큰 수나 토큰 클래스를 정의할 수 없습니다.

이것은 단순함을 염두에 두고 의도적으로 설계되었습니다. 하나의 주소에 대해서만 모든 것을 승인할 수 있습니다.

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

[EIP-165](https://eips.ethereum.org/EIPS/eip-165) 지원에 따라, ERC-1155는 스마트 계약에 대해서만 수신 훅을 지원합니다. 훅 함수는 다음과 같이 지정된 미리 정의된 특정 bytes4 값을 반환해야 합니다.

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

수신 계약이 이 값을 반환하면, 해당 계약이 전송을 수락하고 ERC-1155 토큰을 처리하는 방법을 알고 있는 것으로 간주됩니다. 더 이상 계약에 토큰이 묶이는 일이 없습니다!

### NFT 지원 {#nft-support}

공급량이 1일 때, 토큰은 본질적으로 대체 불가 토큰(NFT)입니다. 또한 ERC-721의 표준과 마찬가지로, 메타데이터 URL을 정의할 수 있습니다. 클라이언트가 URL을 읽고 수정할 수 있습니다. 자세한 내용은 [여기](https://eips.ethereum.org/EIPS/eip-1155#metadata)를 참조하세요.

### 안전 전송 규칙 {#safe-transfer-rule}

앞선 설명에서 이미 몇 가지 안전 전송 규칙을 다루었습니다. 하지만 가장 중요한 규칙들을 살펴보겠습니다.

1. 호출자는 `_from` 주소의 토큰을 사용할 수 있도록 승인받았거나, 호출자가 `_from`과 같아야 합니다.
2. 다음과 같은 경우 전송 호출이 되돌려져야 합니다.
   1. `_to` 주소가 0인 경우.
   2. `_ids`의 길이가 `_values`의 길이와 같지 않은 경우.
   3. `_ids`에 있는 토큰 보유자의 잔액 중 어느 하나라도 수신자에게 전송된 `_values`의 해당 금액보다 낮은 경우.
   4. 기타 오류가 발생하는 경우.

_참고_: 훅을 포함한 모든 일괄 함수는 일괄 처리 기능이 없는 버전으로도 존재합니다. 단일 자산을 전송하는 것이 여전히 가장 보편적으로 사용되는 방법일 가능성이 높다는 점을 고려할 때, 이는 가스 효율성을 위한 것입니다. 설명을 간단하게 하기 위해 안전 전송 규칙을 포함한 해당 내용들을 생략했습니다. 이름은 동일하며, 'Batch'만 제거하면 됩니다.

## 더 읽어보기 {#further-reading}

- [EIP-1155: 멀티 토큰 표준](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155: Openzeppelin 문서](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155: GitHub 저장소](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
