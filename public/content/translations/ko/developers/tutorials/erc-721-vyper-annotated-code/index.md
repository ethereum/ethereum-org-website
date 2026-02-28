---
title: "Vyper ERC-721 계약 살펴보기"
description: "Ryuya Nakamura의 ERC-721 계약 및 작동 원리"
author: Ori Pomerantz
lang: ko
tags: [ "vyper", "erc-721", "python" ]
skill: beginner
published: 2021-04-01
---

## 소개 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 표준은 대체 불가능한 토큰(NFT)의 소유권을 보유하는 데 사용됩니다.
[ERC-20](/developers/docs/standards/tokens/erc-20/) 토큰은 개별 토큰 간에 차이가 없으므로 상품처럼 작동합니다.
이와 대조적으로 ERC-721 토큰은 서로 다른 고양이
만화 또는 서로 다른 부동산 소유권과 같이 유사하지만 동일하지는 않은 자산을 위해 설계되었습니다.

이 글에서는 [Ryuya Nakamura의 ERC-721 계약](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)을 분석합니다.
이 계약은 파이썬과 유사한 계약 언어인 [Vyper](https://vyper.readthedocs.io/en/latest/index.html)로 작성되었으며, 솔리디티보다 안전하지 않은 코드를 작성하기 어렵게 설계되었습니다.

## 계약 {#contract}

```python
# @dev ERC-721 대체 불가능한 토큰 표준 구현
# @author Ryuya Nakamura (@nrryuya)
# 수정 출처: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper에서는 파이썬에서처럼 주석이 해시(`#`)로 시작하여 줄 끝까지 이어집니다. `@<keyword>`를 포함하는 주석은 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)에서 사람이 읽을 수 있는 개발문서를 생성하는 데 사용됩니다.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 인터페이스는 Vyper 언어에 내장되어 있습니다.
[여기에서 코드 정의를 볼 수 있습니다](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
인터페이스 정의는 Vyper가 아닌 파이썬으로 작성되었습니다. 인터페이스는 블록체인 내에서뿐만 아니라 외부 클라이언트에서 블록체인으로 트랜잭션을 보낼 때도 사용되며, 이 클라이언트는 파이썬으로 작성될 수 있기 때문입니다.

첫 번째 줄은 인터페이스를 가져오고, 두 번째 줄은 여기서 구현하고 있음을 지정합니다.

### ERC721Receiver 인터페이스 {#receiver-interface}

```python
# safeTransferFrom()에 의해 호출되는 계약의 인터페이스
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721은 두 가지 유형의 전송을 지원합니다.

- `transferFrom`은 전송자가 모든 대상 주소를 지정하고 전송에 대한 책임을 전송자에게 부여할 수 있도록 합니다. 이는 잘못된 주소로 전송할 수 있음을 의미하며, 이 경우 NFT는 영원히 손실됩니다.
- `safeTransferFrom`은 대상 주소가 계약인지 확인합니다. 만약 그렇다면, ERC-721 계약은 수신 계약에 NFT를 수신할 것인지 묻습니다.

`safeTransferFrom` 요청에 응답하려면 수신 계약이 `ERC721Receiver`를 구현해야 합니다.

```python
            _operator: address,
            _from: address,
```

`_from` 주소는 토큰의 현재 소유자입니다. `_operator` 주소는 전송을 요청한 주소입니다(허용량 때문에 이 둘은 같지 않을 수 있습니다).

```python
            _tokenId: uint256,
```

ERC-721 토큰 ID는 256비트입니다. 일반적으로 토큰이 나타내는 것에 대한 설명을 해싱하여 생성됩니다.

```python
            _data: Bytes[1024]
```

요청은 최대 1024바이트의 사용자 데이터를 가질 수 있습니다.

```python
        ) -> bytes32: view
```

계약이 실수로 전송을 수락하는 경우를 방지하기 위해 반환 값은 부울이 아니라 특정 값을 가진 256비트입니다.

이 함수는 `view`이며, 이는 블록체인의 상태를 읽을 수는 있지만 수정할 수는 없음을 의미합니다.

### 이벤트 {#events}

[이벤트](https://media.consensys.net/technical-introduction-to-events-and-logs-in-ethereum-a074d65dd61e)는 블록체인 외부의 사용자와 서버에 이벤트를 알리기 위해 발생됩니다. 이벤트의 내용은 블록체인의 계약에서 사용할 수 없습니다.

```python
# @dev 모든 NFT의 소유권이 어떤 메커니즘으로든 변경될 때 발생합니다. 이 이벤트는 NFT가
# 생성(`from` == 0)되거나 소멸(`to` == 0)될 때 발생합니다. 예외: 계약 생성 중에는
# Transfer를 발생시키지 않고 여러 개의 NFT를 생성하고 할당할 수 있습니다. 전송 시점에
# 해당 NFT에 대해 승인된 주소(있는 경우)는 없음으로 재설정됩니다.
# @param _from NFT의 전송자(주소가 0 주소인 경우 토큰 생성을 나타냄).
# @param _to NFT의 수신자(주소가 0 주소인 경우 토큰 소멸을 나타냄).
# @param _tokenId 전송된 NFT.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

이는 금액 대신 `tokenId`를 보고한다는 점을 제외하면 ERC-20 전송 이벤트와 유사합니다.
아무도 0 주소를 소유하지 않으므로, 관례적으로 토큰의 생성과 소멸을 보고하는 데 사용합니다.

```python
# @dev NFT에 대한 승인된 주소가 변경되거나 재확인될 때 발생합니다. 0 주소는
# 승인된 주소가 없음을 나타냅니다. 전송 이벤트가 발생하면 이는 또한
# 해당 NFT에 대한 승인된 주소(있는 경우)가 없음으로 재설정됨을 나타냅니다.
# @param _owner NFT의 소유자.
# @param _approved 승인하려는 주소.
# @param _tokenId 승인하려는 NFT.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 승인은 ERC-20 허용량과 유사합니다. 특정 주소는 특정 토큰을 전송할 수 있습니다. 이는 계약이 토큰을 수락할 때 응답할 수 있는 메커니즘을 제공합니다. 계약은 이벤트를 수신할 수 없으므로, 토큰을 전송하기만 하면 계약은 이를 "알지" 못합니다. 이러한 방식으로 소유자는 먼저 승인을 제출한 다음 계약에 요청을 보냅니다: "토큰 X를 전송하도록 승인했으니, ...해 주세요."

이는 ERC-721 표준을 ERC-20 표준과 유사하게 만들기 위한 설계상의 선택입니다. ERC-721 토큰은 대체 불가능하기 때문에, 계약은 토큰의 소유권을 보고 특정 토큰을 받았음을 식별할 수도 있습니다.

```python
# @dev 소유자에 대해 운영자가 활성화 또는 비활성화될 때 발생합니다. 운영자는
# 소유자의 모든 NFT를 관리할 수 있습니다.
# @param _owner NFT의 소유자.
# @param _operator 운영자 권한을 설정할 주소.
# @param _approved 운영자 권한 상태(운영자 권한이 부여되면 true, 취소되면 false).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

위임장과 유사하게 특정 유형(특정 계약에 의해 관리되는)의 계정의 모든 토큰을 관리할 수 있는 _운영자_가 있으면 유용할 때가 있습니다. 예를 들어, 6개월 동안 연락이 없으면 자산을 상속인에게 분배하는 계약에 이러한 권한을 부여할 수 있습니다(상속인 중 한 명이 요청하는 경우, 계약은 트랜잭션에 의해 호출되지 않으면 아무것도 할 수 없음). ERC-20에서는 상속 계약에 높은 허용량을 부여할 수 있지만, ERC-721은 토큰이 대체 불가능하기 때문에 작동하지 않습니다. 이것이 그에 상응하는 것입니다.

`approved` 값은 이벤트가 승인을 위한 것인지, 아니면 승인 철회를 위한 것인지를 알려줍니다.

### 상태 변수 {#state-vars}

이 변수에는 토큰의 현재 상태, 즉 어떤 토큰이 사용 가능하고 누가 소유하고 있는지가 포함됩니다. 이들 대부분은 두 유형 사이에 존재하는 단방향 매핑인 `HashMap` 객체입니다[https://vyper.readthedocs.io/en/latest/types.html#mappings].

```python
# @dev NFT ID에서 이를 소유한 주소로의 매핑.
idToOwner: HashMap[uint256, address]

# @dev NFT ID에서 승인된 주소로의 매핑.
idToApprovals: HashMap[uint256, address]
```

이더리움에서 사용자와 계약 신원은 160비트 주소로 표시됩니다. 이 두 변수는 토큰 ID에서 소유자 및 전송이 승인된 자(각각 최대 1명)로 매핑됩니다. 이더리움에서 초기화되지 않은 데이터는 항상 0이므로, 소유자나 승인된 전송자가 없는 경우 해당 토큰의 값은 0입니다.

```python
# @dev 소유자 주소에서 토큰 수로의 매핑.
ownerToNFTokenCount: HashMap[address, uint256]
```

이 변수는 각 소유자의 토큰 수를 보유합니다. 소유자에서 토큰으로의 매핑이 없으므로, 특정 소유자가 소유한 토큰을 식별하는 유일한 방법은 블록체인의 이벤트 기록을 되돌아보고 적절한 `Transfer` 이벤트를 보는 것입니다. 이 변수를 사용하여 모든 NFT를 가지고 있고 더 이상 시간을 거슬러 볼 필요가 없을 때를 알 수 있습니다.

이 알고리즘은 사용자 인터페이스와 외부 서버에서만 작동합니다. 블록체인 자체에서 실행되는 코드는 과거 이벤트를 읽을 수 없습니다.

```python
# @dev 소유자 주소에서 운영자 주소 매핑으로의 매핑.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

하나의 계정은 여러 운영자를 가질 수 있습니다. 단순한 `HashMap`으로는 각 키가 단일 값으로 연결되기 때문에 이를 추적하기에 충분하지 않습니다. 대신, 값으로 `HashMap[address, bool]`를 사용할 수 있습니다. 기본적으로 각 주소의 값은 `False`이며, 이는 운영자가 아님을 의미합니다. 필요에 따라 값을 `True`로 설정할 수 있습니다.

```python
# @dev 토큰을 발행할 수 있는 발행자의 주소
minter: address
```

새로운 토큰은 어떻게든 생성되어야 합니다. 이 계약에는 이를 수행할 수 있는 단일 엔티티, 즉 `minter`가 있습니다. 예를 들어, 게임에는 이것으로 충분할 것입니다. 다른 목적을 위해서는 더 복잡한 비즈니스 로직을 생성해야 할 수도 있습니다.

```python
# @dev 인터페이스 ID에서 지원 여부에 대한 부울로의 매핑
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC165의 ERC165 인터페이스 ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC721의 ERC165 인터페이스 ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)는 계약이 애플리케이션과 통신하는 방법, 즉 어떤 ERC를 준수하는지 공개하는 메커니즘을 지정합니다. 이 경우, 계약은 ERC-165와 ERC-721을 준수합니다.

### 함수 {#functions}

이들은 실제로 ERC-721을 구현하는 함수입니다.

#### 생성자 {#constructor}

```python
@external
def __init__():
```

Vyper에서는 파이썬에서처럼 생성자 함수를 `__init__`이라고 합니다.

```python
    """
    @dev 계약 생성자.
    """
```

파이썬과 Vyper에서는 여러 줄 문자열(`"""`로 시작하고 끝나는)을 지정하고 어떤 방식으로도 사용하지 않음으로써 주석을 만들 수도 있습니다. 이러한 주석에는 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)도 포함될 수 있습니다.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

상태 변수에 액세스하려면 `self.<변수 이름>`을(를) 사용합니다.`(파이썬에서와 동일합니다).

#### 뷰 함수 {#views}

이 함수들은 블록체인의 상태를 수정하지 않으므로 외부에서 호출될 경우 무료로 실행될 수 있습니다. 뷰 함수가 계약에 의해 호출되더라도 모든 노드에서 실행되어야 하므로 가스가 소모됩니다.

```python
@view
@external
```

함수 정의 이전에 `@` 기호로 시작하는 이러한 키워드를 _데코레이션_이라고 합니다. 함수가 호출될 수 있는 상황을 지정합니다.

- `@view`는 이 함수가 뷰임을 지정합니다.
- `@external`은 이 특정 함수가 트랜잭션 및 다른 계약에 의해 호출될 수 있음을 지정합니다.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

파이썬과 달리 Vyper는 [정적 타입 언어](https://wikipedia.org/wiki/Type_system#Static_type_checking)입니다.
[데이터 유형](https://vyper.readthedocs.io/en/latest/types.html)을 식별하지 않고는 변수나 함수 매개변수를 선언할 수 없습니다. 이 경우 입력 매개변수는 256비트 값인 `bytes32`입니다(256비트는 [이더리움 가상 머신](/developers/docs/evm/)의 네이티브 워드 크기입니다). 출력은 부울 값입니다. 관례적으로 함수 매개변수의 이름은 밑줄(`_`)로 시작합니다.

```python
    """
    @dev 인터페이스 식별은 ERC-165에 지정됩니다.
    @param _interfaceID 인터페이스의 ID
    """
    return self.supportedInterfaces[_interfaceID]
```

생성자(`__init__`)에서 설정된 `self.supportedInterfaces` HashMap에서 값을 반환합니다.

```python
### 뷰 함수 ###

```

이들은 토큰에 대한 정보를 사용자 및 다른 계약에서 사용할 수 있도록 하는 뷰 함수입니다.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`가 소유한 NFT 수를 반환합니다.
         `_owner`가 0 주소인 경우 예외를 발생시킵니다. 0 주소에 할당된 NFT는 유효하지 않은 것으로 간주됩니다.
    @param _owner 잔액을 쿼리할 주소.
    """
    assert _owner != ZERO_ADDRESS
```

이 줄은 `_owner`가 0이 아님을 [주장](https://vyper.readthedocs.io/en/latest/statements.html#assert)합니다. 만약 그렇다면 오류가 발생하고 작업이 되돌려집니다.

```python
    return self.ownerToNFTokenCount[_owner]

@view
@external
def ownerOf(_tokenId: uint256) -> address:
    """
    @dev NFT 소유자의 주소를 반환합니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @param _tokenId NFT의 식별자.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert owner != ZERO_ADDRESS
    return owner
```

이더리움 가상 머신(EVM)에서 값이 저장되지 않은 저장 공간은 모두 0입니다.
`_tokenId`에 토큰이 없으면 `self.idToOwner[_tokenId]`의 값은 0입니다. 이 경우 함수는 되돌려집니다.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 단일 NFT에 대한 승인된 주소를 가져옵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @param _tokenId 승인을 쿼리할 NFT의 ID.
    """
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`는 0을 반환할 _수_ 있습니다. 토큰이 유효하면 `self.idToApprovals[_tokenId]`를 반환합니다.
승인자가 없으면 그 값은 0입니다.

```python
@view
@external
def isApprovedForAll(_owner: address, _operator: address) -> bool:
    """
    @dev `_operator`가 `_owner`에 대해 승인된 운영자인지 확인합니다.
    @param _owner NFT를 소유한 주소.
    @param _operator 소유자를 대신하여 행동하는 주소.
    """
    return (self.ownerToOperators[_owner])[_operator]
```

이 함수는 `_operator`가 이 계약에서 `_owner`의 모든 토큰을 관리할 수 있는지 확인합니다.
여러 운영자가 있을 수 있으므로 이는 2단계 HashMap입니다.

#### 전송 헬퍼 함수 {#transfer-helpers}

이 함수는 토큰 전송 또는 관리의 일부인 작업을 구현합니다.

```python

### 전송 함수 헬퍼 ###

@view
@internal
```

이 데코레이션, `@internal`은 함수가 동일한 계약 내의 다른 함수에서만 액세스할 수 있음을 의미합니다. 관례적으로 이러한 함수 이름도 밑줄(`_`)로 시작합니다.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 주어진 지출자가 주어진 토큰 ID를 전송할 수 있는지 여부를 반환합니다.
    @param spender 쿼리할 지출자의 주소
    @param tokenId 전송될 토큰의 uint256 ID
    @return bool msg.sender가 주어진 토큰 ID에 대해 승인되었는지,
        소유자의 운영자인지, 또는 토큰의 소유자인지 여부
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

주소가 토큰을 전송할 수 있도록 허용되는 세 가지 방법이 있습니다.

1. 주소가 토큰의 소유자입니다
2. 주소가 해당 토큰을 사용하도록 승인되었습니다
3. 주소는 토큰 소유자의 운영자입니다

위의 함수는 상태를 변경하지 않으므로 뷰가 될 수 있습니다. 운영 비용을 줄이기 위해, 뷰가 될 _수_ 있는 모든 함수는 뷰가 되어야 _합니다_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 주어진 주소에 NFT 추가
         `_tokenId`가 누군가에 의해 소유된 경우 예외를 발생시킵니다.
    """
    # `_tokenId`가 누군가에 의해 소유된 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 소유자 변경
    self.idToOwner[_tokenId] = _to
    # 수량 추적 변경
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 주어진 주소에서 NFT 제거
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
    """
    # `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == _from
    # 소유자 변경
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 수량 추적 변경
    self.ownerToNFTokenCount[_from] -= 1
```

전송에 문제가 발생하면 호출을 되돌립니다.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 주어진 주소의 승인 취소
         `_owner`가 현재 소유자가 아닌 경우 예외를 발생시킵니다.
    """
    # `_owner`가 현재 소유자가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 승인 재설정
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

필요한 경우에만 값을 변경합니다. 상태 변수는 저장 공간에 있습니다. 저장 공간에 쓰는 것은 EVM(이더리움 가상 머신)이 수행하는 가장 비싼 작업 중 하나입니다([가스](/developers/docs/gas/) 측면에서). 따라서 기존 값을 쓰는 것조차 높은 비용이 들기 때문에 이를 최소화하는 것이 좋습니다.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFT 전송 실행.
         `msg.sender`가 현재 소유자, 승인된 운영자 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         (참고: `msg.sender`는 비공개 함수에서 허용되지 않으므로 `_sender`를 전달합니다.)
         `_to`가 0 주소인 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    """
```

토큰을 전송하는 두 가지 방법(일반 및 안전)이 있지만, 감사를 더 쉽게 하기 위해 코드를 한 곳에서만 수행하기 위해 이 내부 함수를 사용합니다.

```python
    # 요구 사항 확인
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to`가 0 주소인 경우 예외를 발생시킵니다
    assert _to != ZERO_ADDRESS
    # 승인 취소. `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다
    self._clearApproval(_from, _tokenId)
    # NFT 제거. `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    self._removeTokenFrom(_from, _tokenId)
    # NFT 추가
    self._addTokenTo(_to, _tokenId)
    # 전송 기록
    log Transfer(_from, _to, _tokenId)
```

Vyper에서 이벤트를 발생시키려면 `log` 문을 사용합니다([자세한 내용은 여기 참조](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### 전송 함수 {#transfer-funs}

```python

### 전송 함수 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`가 현재 소유자, 승인된 운영자 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 0 주소인 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @notice 호출자는 `_to`가 NFT를 수신할 수 있는지 확인해야 할 책임이 있으며, 그렇지 않으면 영구적으로 손실될 수 있습니다.
    @param _from NFT의 현재 소유자.
    @param _to 새로운 소유자.
    @param _tokenId 전송할 NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

이 함수를 사용하면 임의의 주소로 전송할 수 있습니다. 주소가 사용자이거나 토큰을 전송하는 방법을 아는 계약이 아닌 한, 전송하는 모든 토큰은 해당 주소에 갇혀 쓸모없게 됩니다.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 한 주소에서 다른 주소로 NFT의 소유권을 이전합니다.
         `msg.sender`가 현재 소유자, 승인된 운영자 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 0 주소인 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
         `_to`가 스마트 계약인 경우 `_to`에서 `onERC721Received`를 호출하고 반환 값이 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`가 아닌 경우 예외를 발생시킵니다.
         참고: bytes4는 패딩이 있는 bytes32로 표시됩니다.
    @param _from NFT의 현재 소유자.
    @param _to 새로운 소유자.
    @param _tokenId 전송할 NFT.
    @param _data 지정된 형식이 없는 추가 데이터, `_to` 호출 시 전송됩니다.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

어쨌든 문제가 발생하면 되돌릴 것이므로 먼저 전송을 수행해도 괜찮습니다. 그러면 호출에서 수행된 모든 작업이 취소됩니다.

```python
    if _to.is_contract: # `_to`가 계약 주소인지 확인
```

먼저 주소가 계약인지(코드가 있는지) 확인합니다. 그렇지 않은 경우 사용자 주소라고 가정하고 사용자는 토큰을 사용하거나 전송할 수 있습니다. 그러나 그것이 당신을 잘못된 안도감에 빠지게 하지는 마십시오. `safeTransferFrom`을 사용하더라도 아무도 개인 키를 모르는 주소로 토큰을 전송하면 토큰을 잃을 수 있습니다.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

대상 계약을 호출하여 ERC-721 토큰을 수신할 수 있는지 확인합니다.

```python
        # 전송 대상이 'onERC721Received'를 구현하지 않는 계약인 경우 예외를 발생시킵니다
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

대상이 계약이지만 ERC-721 토큰을 허용하지 않거나(또는 이 특정 전송을 허용하지 않기로 결정한) 경우 되돌립니다.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev NFT에 대해 승인된 주소를 설정하거나 재확인합니다. 0 주소는 승인된 주소가 없음을 나타냅니다.
         `msg.sender`가 현재 NFT 소유자이거나 현재 소유자의 승인된 운영자가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다. (참고: EIP에 기록되지 않음)
         `_approved`가 현재 소유자인 경우 예외를 발생시킵니다. (참고: EIP에 기록되지 않음)
    @param _approved 주어진 NFT ID에 대해 승인될 주소.
    @param _tokenId 승인될 토큰의 ID.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert owner != ZERO_ADDRESS
    # `_approved`가 현재 소유자인 경우 예외를 발생시킵니다
    assert _approved != owner
```

관례적으로 승인자를 두지 않으려면 자신을 지정하는 것이 아니라 0 주소를 지정합니다.

```python
    # 요구 사항 확인
    senderIsOwner: bool = self.idToOwner[_tokenId] == msg.sender
    senderIsApprovedForAll: bool = (self.ownerToOperators[owner])[msg.sender]
    assert (senderIsOwner or senderIsApprovedForAll)
```

승인을 설정하려면 소유자이거나 소유자가 승인한 운영자여야 합니다.

```python
    # 승인 설정
    self.idToApprovals[_tokenId] = _approved
    log Approval(owner, _approved, _tokenId)


@external
def setApprovalForAll(_operator: address, _approved: bool):
    """
    @dev 제3자("운영자")가 `msg.sender`의 모든 자산을 관리할 수 있도록 승인을 활성화하거나 비활성화합니다. 또한 ApprovalForAll 이벤트를 발생시킵니다.
         `_operator`가 `msg.sender`인 경우 예외를 발생시킵니다. (참고: EIP에 기록되지 않음)
    @notice 이는 전송자가 당시 토큰을 소유하지 않은 경우에도 작동합니다.
    @param _operator 승인된 운영자 집합에 추가할 주소.
    @param _approved 운영자가 승인되면 True, 승인을 취소하려면 false입니다.
    """
    # `_operator`가 `msg.sender`인 경우 예외를 발생시킵니다
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 새 토큰 발행 및 기존 토큰 소멸 {#mint-burn}

계약을 생성한 계정은 새로운 NFT를 발행할 권한이 있는 슈퍼 사용자인 `minter`입니다. 그러나 기존 토큰을 소각하는 것은 허용되지 않습니다. 소유자 또는 소유자가 승인한 엔티티만 그렇게 할 수 있습니다.

```python
### 발행 및 소각 함수 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

이 함수는 작업이 실패하면 되돌려지기 때문에 항상 `True`를 반환합니다.

```python
    """
    @dev 토큰을 발행하는 함수
         `msg.sender`가 발행자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 0 주소인 경우 예외를 발생시킵니다.
         `_tokenId`가 누군가에 의해 소유된 경우 예외를 발생시킵니다.
    @param _to 발행된 토큰을 받을 주소.
    @param _tokenId 발행할 토큰 ID.
    @return 작업이 성공했는지 여부를 나타내는 부울 값.
    """
    # `msg.sender`가 발행자가 아닌 경우 예외를 발생시킵니다
    assert msg.sender == self.minter
```

발행자(ERC-721 계약을 생성한 계정)만이 새로운 토큰을 발행할 수 있습니다. 이는 나중에 발행자의 신원을 변경하고자 할 때 문제가 될 수 있습니다. 프로덕션 계약에서는 발행자가 발행자 권한을 다른 사람에게 이전할 수 있도록 하는 함수를 원할 것입니다.

```python
    # `_to`가 0 주소인 경우 예외를 발생시킵니다
    assert _to != ZERO_ADDRESS
    # NFT 추가. `_tokenId`가 누군가에 의해 소유된 경우 예외를 발생시킵니다
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

관례적으로 새로운 토큰 발행은 0 주소로부터의 전송으로 간주됩니다.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 특정 ERC721 토큰을 소각합니다.
         `msg.sender`가 현재 소유자, 승인된 운영자 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @param _tokenId 소각될 ERC721 토큰의 uint256 ID.
    """
    # 요구 사항 확인
    assert self._isApprovedOrOwner(msg.sender, _tokenId)
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert owner != ZERO_ADDRESS
    self._clearApproval(owner, _tokenId)
    self._removeTokenFrom(owner, _tokenId)
    log Transfer(owner, ZERO_ADDRESS, _tokenId)
```

토큰을 전송할 수 있는 사람은 누구나 소각할 수 있습니다. 소각은 0 주소로 전송하는 것과 동일하게 보이지만, 0 주소는 실제로 토큰을 받지 않습니다. 이를 통해 토큰에 사용된 모든 저장 공간을 확보할 수 있으므로 트랜잭션의 가스 비용을 줄일 수 있습니다.

## 이 계약 사용하기 {#using-contract}

솔리디티와 달리 Vyper는 상속이 없습니다. 이는 코드를 더 명확하게 하여 보안을 더 쉽게 하기 위한 의도적인 설계 선택입니다. 따라서 자신만의 Vyper ERC-721 계약을 만들려면 [이 계약](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)을 가져와 원하는 비즈니스 로직을 구현하도록 수정합니다.

## 결론 {#conclusion}

검토를 위해, 이 계약의 가장 중요한 몇 가지 아이디어는 다음과 같습니다:

- 안전한 전송으로 ERC-721 토큰을 받으려면 계약이 `ERC721Receiver` 인터페이스를 구현해야 합니다.
- 안전한 전송을 사용하더라도 개인 키를 알 수 없는 주소로 보내면 토큰이 여전히 갇힐 수 있습니다.
- 작업에 문제가 있을 경우 실패 값을 반환하는 것보다 호출을 `revert`하는 것이 좋습니다.
- ERC-721 토큰은 소유자가 있을 때 존재합니다.
- NFT를 전송할 권한을 부여받는 방법은 세 가지가 있습니다. 소유자가 되거나, 특정 토큰에 대해 승인받거나, 소유자의 모든 토큰에 대한 운영자가 될 수 있습니다.
- 과거 이벤트는 블록체인 외부에서만 볼 수 있습니다. 블록체인 내부에서 실행되는 코드는 이를 볼 수 없습니다.

이제 안전한 Vyper 계약을 구현해 보세요.

[여기서 제 작업에 대한 자세한 내용을 확인하세요](https://cryptodocguy.pro/).

