---
title: "Vyper ERC-721 컨트랙트 연습"
description: "Ryuya Nakamura의 ERC-721 컨트랙트와 작동 방식"
author: "오리 포메란츠"
lang: ko
tags: ["Vyper", "erc-721", "Python"]
skill: beginner
breadcrumb: "Vyper ERC-721"
published: 2021-04-01
---

## 소개 {#introduction}

[ERC-721](/developers/docs/standards/tokens/erc-721/) 표준은 대체 불가능한 토큰(NFT)의 소유권을 보유하는 데 사용됩니다.
[ERC-20](/developers/docs/standards/tokens/erc-20/) 토큰은 개별 토큰 간에 차이가 없기 때문에 상품처럼 작동합니다.
이와 대조적으로, ERC-721 토큰은 서로 다른 [고양이 만화](https://www.cryptokitties.co/)나 서로 다른 부동산의 소유권과 같이 유사하지만 동일하지 않은 자산을 위해 설계되었습니다.

이 글에서는 [Ryuya Nakamura의 ERC-721 컨트랙트](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)를 분석해 보겠습니다.
이 컨트랙트는 Solidity보다 안전하지 않은 코드를 작성하기 어렵게 설계된 Python과 유사한 컨트랙트 언어인 [Vyper](https://vyper.readthedocs.io/en/latest/index.html)로 작성되었습니다.

## 컨트랙트 {#contract}

```python
# @dev ERC-721 대체 불가능한 토큰 표준의 구현입니다.
# @author Ryuya Nakamura (@nrryuya)
# 수정된 출처: https://github.com/vyperlang/vyper/blob/de74722bf2d8718cca46902be165f9fe0e3641dd/examples/tokens/ERC721.vy
```

Vyper의 주석은 Python과 마찬가지로 해시(`#`)로 시작하여 줄 끝까지 이어집니다. `@<keyword>`가 포함된 주석은 사람이 읽을 수 있는 문서를 생성하기 위해 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)에서 사용됩니다.

```python
from vyper.interfaces import ERC721

implements: ERC721
```

ERC-721 인터페이스는 Vyper 언어에 내장되어 있습니다.
[여기에서 코드 정의를 확인할 수 있습니다](https://github.com/vyperlang/vyper/blob/master/vyper/builtin_interfaces/ERC721.py).
인터페이스 정의는 Vyper가 아닌 Python으로 작성됩니다. 인터페이스는 블록체인 내부뿐만 아니라 외부 클라이언트(Python으로 작성될 수 있음)에서 블록체인으로 트랜잭션을 전송할 때도 사용되기 때문입니다.

첫 번째 줄은 인터페이스를 가져오고(import), 두 번째 줄은 여기서 해당 인터페이스를 구현하고 있음을 지정합니다.

### ERC721Receiver 인터페이스 {#receiver-interface}

```python
# safeTransferFrom()에 의해 호출되는 컨트랙트의 인터페이스
interface ERC721Receiver:
    def onERC721Received(
```

ERC-721은 두 가지 유형의 전송을 지원합니다.

- `transferFrom`: 발신자가 임의의 목적지 주소를 지정할 수 있으며 전송에 대한 책임을 발신자에게 부여합니다. 즉, 유효하지 않은 주소로 전송할 수 있으며, 이 경우 NFT는 영원히 손실됩니다.
- `safeTransferFrom`: 목적지 주소가 컨트랙트인지 확인합니다. 컨트랙트인 경우, ERC-721 컨트랙트는 수신 컨트랙트에게 NFT를 받을 것인지 묻습니다.

`safeTransferFrom` 요청에 응답하려면 수신 컨트랙트가 `ERC721Receiver`를 구현해야 합니다.

```python
            _operator: address,
            _from: address,
```

`_from` 주소는 토큰의 현재 소유자입니다. `_operator` 주소는 전송을 요청한 주소입니다(허용량 때문에 이 둘은 같지 않을 수 있습니다).

```python
            _tokenId: uint256,
```

ERC-721 토큰 ID는 256비트입니다. 일반적으로 토큰이 나타내는 대상의 설명을 해싱하여 생성됩니다.

```python
            _data: Bytes[1024]
```

요청에는 최대 1024바이트의 사용자 데이터가 포함될 수 있습니다.

```python
        ) -> bytes32: view
```

컨트랙트가 실수로 전송을 수락하는 경우를 방지하기 위해 반환 값은 부울(boolean)이 아니라 특정 값을 가진 256비트입니다.

이 함수는 `view`이며, 이는 블록체인의 상태를 읽을 수는 있지만 수정할 수는 없음을 의미합니다.

### 이벤트 {#events}

[이벤트](/developers/docs/smart-contracts/anatomy/#events-and-logs)는 블록체인 외부의 사용자 및 서버에 이벤트를 알리기 위해 발생(emit)합니다. 이벤트의 내용은 블록체인 상의 컨트랙트에서 사용할 수 없다는 점에 유의하세요.

```python
# @dev 어떤 메커니즘으로든 NFT의 소유권이 변경될 때 발생합니다. 이 이벤트는 NFT가
#      생성(`from` == 0)되거나 파괴(`to` == 0)될 때 발생합니다. 예외: 컨트랙트 생성 중에는 어떠한
#      수의 NFT도 Transfer 이벤트를 발생시키지 않고 생성 및 할당될 수 있습니다. 어떠한
#      전송 시에도 해당 NFT에 대해 승인된 주소(있는 경우)는 없음으로 초기화됩니다.
# @param _from NFT의 송신자 (주소가 제로 주소인 경우 토큰 생성을 나타냄).
# @param _to NFT의 수신자 (주소가 제로 주소인 경우 토큰 파괴를 나타냄).
# @param _tokenId 전송된 NFT.
event Transfer:
    sender: indexed(address)
    receiver: indexed(address)
    tokenId: indexed(uint256)
```

이것은 금액 대신 `tokenId`를 보고한다는 점을 제외하면 ERC-20 전송 이벤트와 유사합니다. 제로 주소를 소유한 사람은 없으므로, 관례적으로 토큰의 생성 및 소각을 보고하는 데 사용합니다.

```python
# @dev NFT에 대해 승인된 주소가 변경되거나 재확인될 때 발생합니다. 제로
#      주소는 승인된 주소가 없음을 나타냅니다. Transfer 이벤트가 발생할 때, 이는 또한
#      해당 NFT에 대해 승인된 주소(있는 경우)가 없음으로 초기화됨을 나타냅니다.
# @param _owner NFT의 소유자.
# @param _approved 승인하려는 주소.
# @param _tokenId 승인하려는 NFT.
event Approval:
    owner: indexed(address)
    approved: indexed(address)
    tokenId: indexed(uint256)
```

ERC-721 승인(approval)은 ERC-20 허용량과 유사합니다. 특정 주소가 특정 토큰을 전송하도록 허용됩니다. 이는 컨트랙트가 토큰을 수락할 때 응답할 수 있는 메커니즘을 제공합니다. 컨트랙트는 이벤트를 수신할 수 없으므로, 단순히 토큰을 전송하기만 하면 컨트랙트는 이를 '알지' 못합니다. 이 방식을 사용하면 소유자가 먼저 승인을 제출한 다음 컨트랙트에 요청을 보냅니다. "토큰 X를 전송하도록 승인했으니, 처리해 주세요..."와 같은 식입니다.

이것은 ERC-721 표준을 ERC-20 표준과 유사하게 만들기 위한 설계상의 선택입니다. ERC-721 토큰은 대체 불가능하므로, 컨트랙트는 토큰의 소유권을 확인하여 특정 토큰을 받았음을 식별할 수도 있습니다.

```python
# @dev 소유자에 대해 운영자가 활성화되거나 비활성화될 때 발생합니다. 운영자는 소유자의
#      모든 NFT를 관리할 수 있습니다.
# @param _owner NFT의 소유자.
# @param _operator 운영자 권한을 설정하려는 주소.
# @param _approved 운영자 권한의 상태 (운영자 권한이 부여되면 true, 취소되면
# false).
event ApprovalForAll:
    owner: indexed(address)
    operator: indexed(address)
    approved: bool
```

위임장과 유사하게, 특정 유형(특정 컨트랙트에서 관리하는 토큰)의 계정 토큰을 모두 관리할 수 있는 <em>운영자(operator)</em>를 두는 것이 유용할 때가 있습니다. 예를 들어, 6개월 동안 연락이 없었는지 확인하고 그렇다면 상속인에게 자산을 분배하는 컨트랙트에 이러한 권한을 부여하고 싶을 수 있습니다(상속인 중 한 명이 요청하는 경우에 한함. 컨트랙트는 트랜잭션에 의해 호출되지 않으면 아무것도 할 수 없습니다). ERC-20에서는 상속 컨트랙트에 높은 허용량을 부여하기만 하면 되지만, ERC-721에서는 토큰이 대체 불가능하기 때문에 이 방법이 작동하지 않습니다. 이것이 그에 상응하는 기능입니다.

`approved` 값은 이벤트가 승인을 위한 것인지, 아니면 승인 철회를 위한 것인지 알려줍니다.

### 상태 변수 {#state-vars}

이 변수들은 토큰의 현재 상태(어떤 토큰을 사용할 수 있고 누가 소유하고 있는지)를 포함합니다. 이들 대부분은 `HashMap` 객체로, [두 유형 사이에 존재하는 단방향 매핑](https://vyper.readthedocs.io/en/latest/types.html#mappings)입니다.

```python
# @dev NFT ID에서 이를 소유한 주소로의 매핑.
idToOwner: HashMap[uint256, address]

# @dev NFT ID에서 승인된 주소로의 매핑.
idToApprovals: HashMap[uint256, address]
```

이더리움에서 사용자 및 컨트랙트 신원은 160비트 주소로 표시됩니다. 이 두 변수는 토큰 ID를 소유자 및 전송하도록 승인된 사람(각각 최대 1명)에게 매핑합니다. 이더리움에서 초기화되지 않은 데이터는 항상 0이므로, 소유자나 승인된 전송자가 없는 경우 해당 토큰의 값은 0입니다.

```python
# @dev 소유자 주소에서 그가 소유한 토큰 수로의 매핑.
ownerToNFTokenCount: HashMap[address, uint256]
```

이 변수는 각 소유자의 토큰 수를 보유합니다. 소유자에서 토큰으로의 매핑은 없으므로, 특정 소유자가 소유한 토큰을 식별하는 유일한 방법은 블록체인의 이벤트 기록을 되돌아보고 적절한 `Transfer` 이벤트를 확인하는 것입니다. 이 변수를 사용하면 모든 NFT를 언제 확보했는지 알 수 있으므로 시간을 더 거슬러 올라가 확인할 필요가 없습니다.

이 알고리즘은 사용자 인터페이스와 외부 서버에서만 작동한다는 점에 유의하세요. 블록체인 자체에서 실행되는 코드는 과거 이벤트를 읽을 수 없습니다.

```python
# @dev 소유자 주소에서 운영자 주소의 매핑으로의 매핑.
ownerToOperators: HashMap[address, HashMap[address, bool]]
```

계정에는 둘 이상의 운영자가 있을 수 있습니다. 각 키가 단일 값으로 이어지기 때문에 단순한 `HashMap`로는 이들을 추적하기에 충분하지 않습니다. 대신 `HashMap[address, bool]`를 값으로 사용할 수 있습니다. 기본적으로 각 주소의 값은 `False`이며, 이는 운영자가 아님을 의미합니다. 필요에 따라 값을 `True`로 설정할 수 있습니다.

```python
# @dev 토큰을 발행할 수 있는 발행자의 주소
minter: address
```

새로운 토큰은 어떻게든 생성되어야 합니다. 이 컨트랙트에는 이를 수행할 수 있는 단일 엔터티인 `minter`가 있습니다. 예를 들어 게임의 경우 이것으로 충분할 수 있습니다. 다른 목적을 위해서는 더 복잡한 비즈니스 로직을 만들어야 할 수도 있습니다.

```python
# @dev 인터페이스 ID에서 지원 여부에 대한 bool로의 매핑
supportedInterfaces: HashMap[bytes32, bool]

# @dev ERC-165의 ERC-165 인터페이스 ID
ERC165_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000001ffc9a7

# @dev ERC-721의 ERC-165 인터페이스 ID
ERC721_INTERFACE_ID: constant(bytes32) = 0x0000000000000000000000000000000000000000000000000000000080ac58cd
```

[ERC-165](https://eips.ethereum.org/EIPS/eip-165)는 컨트랙트가 애플리케이션과 통신하는 방법과 준수하는 ERC를 공개하는 메커니즘을 지정합니다. 이 경우 컨트랙트는 ERC-165 및 ERC-721을 준수합니다.

### 함수 {#functions}

이것들은 실제로 ERC-721을 구현하는 함수들입니다.

#### 생성자 {#constructor}

```python
@external
def __init__():
```

Vyper에서는 Python과 마찬가지로 생성자 함수를 `__init__`라고 부릅니다.

```python
    """
    @dev 컨트랙트 생성자.
    """
```

Python과 Vyper에서는 여러 줄 문자열(`"""`로 시작하고 끝남)을 지정하고 이를 어떤 방식으로도 사용하지 않음으로써 주석을 만들 수도 있습니다. 이러한 주석에는 [NatSpec](https://vyper.readthedocs.io/en/latest/natspec.html)도 포함될 수 있습니다.

```python
    self.supportedInterfaces[ERC165_INTERFACE_ID] = True
    self.supportedInterfaces[ERC721_INTERFACE_ID] = True
    self.minter = msg.sender
```

상태 변수에 액세스하려면 `self.<variable name>`를 사용합니다(이 역시 Python과 동일합니다).

#### 뷰 함수 {#views}

이것들은 블록체인의 상태를 수정하지 않는 함수이므로 외부에서 호출될 경우 무료로 실행될 수 있습니다. 뷰 함수가 컨트랙트에 의해 호출되는 경우 여전히 모든 노드에서 실행되어야 하므로 가스 비용이 발생합니다.

```python
@view
@external
```

함수 정의 앞에 오며 골뱅이 기호(`@`)로 시작하는 이러한 키워드를 <em>데코레이션(decoration)</em>이라고 합니다. 이들은 함수를 호출할 수 있는 상황을 지정합니다.

- `@view`는 이 함수가 뷰(view)임을 지정합니다.
- `@external`는 이 특정 함수가 트랜잭션 및 다른 컨트랙트에 의해 호출될 수 있음을 지정합니다.

```python
def supportsInterface(_interfaceID: bytes32) -> bool:
```

Python과 달리 Vyper는 [정적 타입 언어](https://wikipedia.org/wiki/Type_system#Static_type_checking)입니다. [데이터 타입](https://vyper.readthedocs.io/en/latest/types.html)을 식별하지 않고는 변수나 함수 매개변수를 선언할 수 없습니다. 이 경우 입력 매개변수는 256비트 값인 `bytes32`입니다(256비트는 [이더리움 가상 머신(EVM)](/developers/docs/evm/)의 기본 워드 크기입니다). 출력은 부울 값입니다. 관례적으로 함수 매개변수의 이름은 밑줄(`_`)로 시작합니다.

```python
    """
    @dev 인터페이스 식별은 ERC-165에 명시되어 있습니다.
    @param _interfaceID 인터페이스의 ID
    """
    return self.supportedInterfaces[_interfaceID]
```

생성자(`__init__`)에서 설정된 `self.supportedInterfaces` HashMap의 값을 반환합니다.

```python
### 뷰 함수 ###
```

이것들은 사용자 및 다른 컨트랙트가 토큰에 대한 정보를 사용할 수 있게 해주는 뷰 함수입니다.

```python
@view
@external
def balanceOf(_owner: address) -> uint256:
    """
    @dev `_owner`가 소유한 NFT의 수를 반환합니다.
         `_owner`가 제로 주소인 경우 예외를 발생시킵니다. 제로 주소에 할당된 NFT는 유효하지 않은 것으로 간주됩니다.
    @param _owner 잔액을 조회할 주소.
    """
    assert _owner != ZERO_ADDRESS
```

이 줄은 `_owner`가 0이 아님을 [단언(assert)](https://vyper.readthedocs.io/en/latest/statements.html#assert)합니다. 0인 경우 오류가 발생하고 작업이 되돌려집니다(revert).

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

이더리움 가상 머신(EVM)에서 값이 저장되지 않은 모든 스토리지는 0입니다. `_tokenId`에 토큰이 없으면 `self.idToOwner[_tokenId]`의 값은 0입니다. 이 경우 함수는 되돌려집니다.

```python
@view
@external
def getApproved(_tokenId: uint256) -> address:
    """
    @dev 단일 NFT에 대해 승인된 주소를 가져옵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @param _tokenId 승인을 조회할 NFT의 ID.
    """
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] != ZERO_ADDRESS
    return self.idToApprovals[_tokenId]
```

`getApproved`는 0을 반환할 _수_ 있다는 점에 유의하세요. 토큰이 유효하면 `self.idToApprovals[_tokenId]`를 반환합니다. 승인자가 없으면 해당 값은 0입니다.

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

이 함수는 `_operator`가 이 컨트랙트에서 `_owner`의 모든 토큰을 관리하도록 허용되었는지 확인합니다. 여러 운영자가 있을 수 있으므로 이것은 2단계 HashMap입니다.

#### 전송 헬퍼 함수 {#transfer-helpers}

이 함수들은 토큰 전송 또는 관리의 일부인 작업을 구현합니다.

```python

### 전송 함수 헬퍼 ###

@view
@internal
```

이 데코레이션인 `@internal`는 동일한 컨트랙트 내의 다른 함수에서만 해당 함수에 액세스할 수 있음을 의미합니다. 관례적으로 이러한 함수 이름도 밑줄(`_`)로 시작합니다.

```python
def _isApprovedOrOwner(_spender: address, _tokenId: uint256) -> bool:
    """
    @dev 주어진 지출자가 주어진 토큰 ID를 전송할 수 있는지 여부를 반환합니다
    @param spender 조회할 지출자의 주소
    @param tokenId 전송할 토큰의 uint256 ID
    @return bool msg.sender가 주어진 토큰 ID에 대해 승인되었는지, 소유자의 운영자인지, 또는 토큰의 소유자인지 여부
    """
    owner: address = self.idToOwner[_tokenId]
    spenderIsOwner: bool = owner == _spender
    spenderIsApproved: bool = _spender == self.idToApprovals[_tokenId]
    spenderIsApprovedForAll: bool = (self.ownerToOperators[owner])[_spender]
    return (spenderIsOwner or spenderIsApproved) or spenderIsApprovedForAll
```

주소가 토큰을 전송하도록 허용되는 방법에는 세 가지가 있습니다.

1. 주소가 토큰의 소유자인 경우
2. 주소가 해당 토큰을 사용하도록 승인된 경우
3. 주소가 토큰 소유자의 운영자인 경우

위의 함수는 상태를 변경하지 않으므로 뷰가 될 수 있습니다. 운영 비용을 줄이려면 뷰가 될 수 _있는_ 모든 함수는 뷰가 되어야 _합니다_.

```python
@internal
def _addTokenTo(_to: address, _tokenId: uint256):
    """
    @dev 주어진 주소에 NFT를 추가합니다
         `_tokenId`를 누군가 소유하고 있는 경우 예외를 발생시킵니다.
    """
    # `_tokenId`를 누군가 소유하고 있는 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == ZERO_ADDRESS
    # 소유자 변경
    self.idToOwner[_tokenId] = _to
    # 개수 추적 변경
    self.ownerToNFTokenCount[_to] += 1


@internal
def _removeTokenFrom(_from: address, _tokenId: uint256):
    """
    @dev 주어진 주소에서 NFT를 제거합니다
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
    """
    # `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == _from
    # 소유자 변경
    self.idToOwner[_tokenId] = ZERO_ADDRESS
    # 개수 추적 변경
    self.ownerToNFTokenCount[_from] -= 1
```

전송에 문제가 발생하면 호출을 되돌립니다.

```python
@internal
def _clearApproval(_owner: address, _tokenId: uint256):
    """
    @dev 주어진 주소의 승인을 지웁니다
         `_owner`가 현재 소유자가 아닌 경우 예외를 발생시킵니다.
    """
    # `_owner`가 현재 소유자가 아닌 경우 예외를 발생시킵니다
    assert self.idToOwner[_tokenId] == _owner
    if self.idToApprovals[_tokenId] != ZERO_ADDRESS:
        # 승인 초기화
        self.idToApprovals[_tokenId] = ZERO_ADDRESS
```

필요한 경우에만 값을 변경하세요. 상태 변수는 스토리지에 존재합니다. 스토리지에 쓰는 것은 EVM(이더리움 가상 머신)이 수행하는 가장 비용이 많이 드는 작업 중 하나입니다([가스](/developers/docs/gas/) 측면에서). 따라서 이를 최소화하는 것이 좋으며, 기존 값을 쓰는 것조차도 높은 비용이 듭니다.

```python
@internal
def _transferFrom(_from: address, _to: address, _tokenId: uint256, _sender: address):
    """
    @dev NFT의 전송을 실행합니다.
         `msg.sender`가 현재 소유자, 권한이 있는 운영자, 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다. (참고: private 함수에서는 `msg.sender`가 허용되지 않으므로 `_sender`를 전달합니다.)
         `_to`가 제로 주소인 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    """
```

토큰을 전송하는 방법에는 두 가지(일반 및 안전)가 있지만, 감사를 더 쉽게 하기 위해 코드에서 전송을 수행하는 위치를 단 한 곳으로 유지하고자 이 내부 함수를 사용합니다.

```python
    # 요구 사항 확인
    assert self._isApprovedOrOwner(_sender, _tokenId)
    # `_to`가 제로 주소인 경우 예외를 발생시킵니다
    assert _to != ZERO_ADDRESS
    # 승인을 지웁니다. `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다
    self._clearApproval(_from, _tokenId)
    # NFT를 제거합니다. `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    self._removeTokenFrom(_from, _tokenId)
    # NFT 추가
    self._addTokenTo(_to, _tokenId)
    # 전송 기록
    log Transfer(_from, _to, _tokenId)
```

Vyper에서 이벤트를 발생시키려면 `log` 문을 사용합니다([자세한 내용은 여기를 참조하세요](https://vyper.readthedocs.io/en/latest/event-logging.html#event-logging)).

#### 전송 함수 {#transfer-funs}

```python

### 전송 함수 ###

@external
def transferFrom(_from: address, _to: address, _tokenId: uint256):
    """
    @dev `msg.sender`가 현재 소유자, 권한이 있는 운영자, 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 제로 주소인 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @notice 호출자는 `_to`가 NFT를 수신할 수 있는지 확인할 책임이 있으며, 그렇지 않으면 영구적으로 손실될 수 있습니다.
    @param _from NFT의 현재 소유자.
    @param _to 새로운 소유자.
    @param _tokenId 전송할 NFT.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

이 함수를 사용하면 임의의 주소로 전송할 수 있습니다. 해당 주소가 사용자이거나 토큰 전송 방법을 아는 컨트랙트가 아닌 한, 전송한 모든 토큰은 해당 주소에 갇혀 쓸모없게 됩니다.

```python
@external
def safeTransferFrom(
        _from: address,
        _to: address,
        _tokenId: uint256,
        _data: Bytes[1024]=b""
    ):
    """
    @dev 한 주소에서 다른 주소로 NFT의 소유권을 전송합니다.
         `msg.sender`가 현재 소유자, 권한이 있는 운영자, 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_from`이 현재 소유자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 제로 주소인 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
         `_to`가 스마트 컨트랙트인 경우, `_to`에서 `onERC721Received`를 호출하고 반환 값이 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`가 아니면 예외를 발생시킵니다.
         참고: bytes4는 패딩이 있는 bytes32로 표현됩니다
    @param _from NFT의 현재 소유자.
    @param _to 새로운 소유자.
    @param _tokenId 전송할 NFT.
    @param _data 지정된 형식이 없는 추가 데이터로, `_to` 호출 시 전송됩니다.
    """
    self._transferFrom(_from, _to, _tokenId, msg.sender)
```

문제가 발생하면 어차피 되돌릴 것이므로 전송을 먼저 수행해도 괜찮습니다. 호출에서 수행된 모든 작업이 취소되기 때문입니다.

```python
    if _to.is_contract: # `_to`가 컨트랙트 주소인지 확인합니다
```

먼저 주소가 컨트랙트인지(코드가 있는지) 확인합니다. 그렇지 않은 경우 사용자 주소로 간주하며, 사용자는 토큰을 사용하거나 전송할 수 있을 것입니다. 하지만 이것이 잘못된 보안 의식을 심어주게 해서는 안 됩니다. 아무도 개인 키를 모르는 주소로 토큰을 전송하면 `safeTransferFrom`를 사용하더라도 토큰을 잃을 수 있습니다.

```python
        returnValue: bytes32 = ERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenId, _data)
```

대상 컨트랙트를 호출하여 ERC-721 토큰을 받을 수 있는지 확인합니다.

```python
        # 전송 목적지가 'onERC721Received'를 구현하지 않은 컨트랙트인 경우 예외를 발생시킵니다
        assert returnValue == method_id("onERC721Received(address,address,uint256,bytes)", output_type=bytes32)
```

목적지가 컨트랙트이지만 ERC-721 토큰을 수락하지 않는 경우(또는 이 특정 전송을 수락하지 않기로 결정한 경우) 되돌립니다.

```python
@external
def approve(_approved: address, _tokenId: uint256):
    """
    @dev NFT에 대해 승인된 주소를 설정하거나 재확인합니다. 제로 주소는 승인된 주소가 없음을 나타냅니다.
         `msg.sender`가 현재 NFT 소유자이거나 현재 소유자의 권한이 있는 운영자가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다. (참고: 이는 EIP에 작성되어 있지 않습니다)
         `_approved`가 현재 소유자인 경우 예외를 발생시킵니다. (참고: 이는 EIP에 작성되어 있지 않습니다)
    @param _approved 주어진 NFT ID에 대해 승인될 주소.
    @param _tokenId 승인될 토큰의 ID.
    """
    owner: address = self.idToOwner[_tokenId]
    # `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다
    assert owner != ZERO_ADDRESS
    # `_approved`가 현재 소유자인 경우 예외를 발생시킵니다
    assert _approved != owner
```

관례적으로 승인자를 두지 않으려면 자신을 지정하는 것이 아니라 제로 주소를 지정합니다.

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
         `_operator`가 `msg.sender`인 경우 예외를 발생시킵니다. (참고: 이는 EIP에 작성되어 있지 않습니다)
    @notice 이는 송신자가 당시 토큰을 소유하고 있지 않더라도 작동합니다.
    @param _operator 권한이 있는 운영자 집합에 추가할 주소.
    @param _approved 운영자가 승인되면 true, 승인을 취소하려면 false.
    """
    # `_operator`가 `msg.sender`인 경우 예외를 발생시킵니다
    assert _operator != msg.sender
    self.ownerToOperators[msg.sender][_operator] = _approved
    log ApprovalForAll(msg.sender, _operator, _approved)
```

#### 새 토큰 발행 및 기존 토큰 소각 {#mint-burn}

컨트랙트를 생성한 계정은 새로운 NFT를 발행할 권한이 있는 슈퍼 유저인 `minter`입니다. 그러나 이 계정조차도 기존 토큰을 소각할 수는 없습니다. 소유자 또는 소유자가 승인한 엔터티만 소각할 수 있습니다.

```python
### 발행 및 소각 함수 ###

@external
def mint(_to: address, _tokenId: uint256) -> bool:
```

이 함수는 항상 `True`를 반환합니다. 작업이 실패하면 되돌려지기 때문입니다.

```python
    """
    @dev 토큰을 발행하는 함수
         `msg.sender`가 발행자가 아닌 경우 예외를 발생시킵니다.
         `_to`가 제로 주소인 경우 예외를 발생시킵니다.
         `_tokenId`를 누군가 소유하고 있는 경우 예외를 발생시킵니다.
    @param _to 발행된 토큰을 수신할 주소.
    @param _tokenId 발행할 토큰 ID.
    @return 작업이 성공했는지 여부를 나타내는 부울.
    """
    # `msg.sender`가 발행자가 아닌 경우 예외를 발생시킵니다
    assert msg.sender == self.minter
```

발행자(ERC-721 컨트랙트를 생성한 계정)만 새 토큰을 발행할 수 있습니다. 이는 향후 발행자의 신원을 변경하려는 경우 문제가 될 수 있습니다. 프로덕션 컨트랙트에서는 발행자가 다른 사람에게 발행 권한을 전송할 수 있는 함수가 필요할 것입니다.

```python
    # `_to`가 제로 주소인 경우 예외를 발생시킵니다
    assert _to != ZERO_ADDRESS
    # NFT를 추가합니다. `_tokenId`를 누군가 소유하고 있는 경우 예외를 발생시킵니다
    self._addTokenTo(_to, _tokenId)
    log Transfer(ZERO_ADDRESS, _to, _tokenId)
    return True
```

관례적으로 새 토큰의 발행은 제로 주소로부터의 전송으로 간주됩니다.

```python

@external
def burn(_tokenId: uint256):
    """
    @dev 특정 ERC-721 토큰을 소각합니다.
         `msg.sender`가 현재 소유자, 권한이 있는 운영자, 또는 이 NFT에 대해 승인된 주소가 아닌 경우 예외를 발생시킵니다.
         `_tokenId`가 유효한 NFT가 아닌 경우 예외를 발생시킵니다.
    @param _tokenId 소각할 ERC-721 토큰의 uint256 ID.
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

토큰을 전송하도록 허용된 사람은 누구나 토큰을 소각할 수 있습니다. 소각은 제로 주소로 전송하는 것과 같아 보이지만, 제로 주소는 실제로 토큰을 받지 않습니다. 이를 통해 토큰에 사용된 모든 스토리지를 확보할 수 있으며, 이는 트랜잭션의 가스 비용을 줄일 수 있습니다.

## 이 컨트랙트 사용하기 {#using-contract}

Solidity와 달리 Vyper에는 상속이 없습니다. 이는 코드를 더 명확하게 만들어 보안을 강화하기 위한 의도적인 설계 선택입니다. 따라서 자신만의 Vyper ERC-721 컨트랙트를 생성하려면 [이 컨트랙트](https://github.com/vyperlang/vyper/blob/master/examples/tokens/ERC721.vy)를 가져와 원하는 비즈니스 로직을 구현하도록 수정하면 됩니다.

## 결론 {#conclusion}

복습을 위해 이 컨트랙트에서 가장 중요한 몇 가지 아이디어를 정리해 보았습니다.

- 안전한 전송으로 ERC-721 토큰을 받으려면 컨트랙트가 `ERC721Receiver` 인터페이스를 구현해야 합니다.
- 안전한 전송을 사용하더라도 개인 키를 모르는 주소로 토큰을 보내면 토큰이 갇힐 수 있습니다.
- 작업에 문제가 있을 때 단순히 실패 값을 반환하는 것보다 호출을 `revert`(되돌리기)하는 것이 좋습니다.
- ERC-721 토큰은 소유자가 있을 때 존재합니다.
- NFT 전송 권한을 부여받는 방법에는 세 가지가 있습니다. 소유자이거나, 특정 토큰에 대해 승인을 받거나, 소유자의 모든 토큰에 대한 운영자가 될 수 있습니다.
- 과거 이벤트는 블록체인 외부에서만 볼 수 있습니다. 블록체인 내부에서 실행되는 코드는 이를 볼 수 없습니다.

이제 안전한 Vyper 컨트랙트를 구현해 보세요.

[제 작업물은 여기에서 더 볼 수 있습니다](https://cryptodocguy.pro/).