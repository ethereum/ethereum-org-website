---
title: 스마트 계약의 구조
description: 스마트 컨트랙트 구성 요소에 대해 자세히 알아보기 - 함수, 데이터, 변수
lang: ko
---

스마트 컨트랙트는 이더리움 주소 체계 상에서 실행되는 프로그램이며, 거래가 발생할 때 실행되는 데이터와 함수로 구성되어 있습니다. 지금부터 그 구성 요소에 대해 전반적으로 살펴보도록 하겠습니다.

## 필수 구성 요소 {#prerequisites}

[스마트 계약](/developers/docs/smart-contracts/)에 대해 먼저 읽어보시기 바랍니다. 자바 스크립트나 파이썬과 같은 프로그래밍 언어에 상당히 익숙하다는 것을 전제합니다.

## 데이터 {#data}

모든 계약 데이터는 `storage` 또는 `memory` 위치에 할당되어야 합니다. 이 중 스토리지 사용은 비용이 더 발생하므로 여러분은 어떤 것을 활용할 지 미리 고려해야 합니다.

### 저장 공간 {#storage}

영구적인 데이터는 스토리지로 간주되며 상태 변수 형태로 표현됩니다. 이런 값은 블록체인 상에 영구히 남게 되므로, 컨트랙트 컴파일 시에 스토리지 형태로 사용할 변수를 명확히 구분할 필요가 있습니다.

```solidity
// Solidity 예시
contract SimpleStorage {
    uint storedData; // 상태 변수
    // ...
}
```

```python
# Vyper 예시
storedData: int128
```

여러분이 객체 지향적인 언어를 사용해 보았다면 대부분의 변수 타입에는 익숙할 것입니다. 하지만 이더리움 개발이 처음이라면 `address`는 생소할 수 있습니다.

`address` 유형은 이더리움 주소를 저장할 수 있으며, 이는 20바이트 또는 160비트와 같습니다. 또한 16진수로 표기되며 0x로 시작합니다.

기타 유형에는 다음이 포함됩니다:

- 불리언
- 정수
- 고정 소수점 숫자
- 고정 크기 바이트 배열
- 동적 크기 바이트 배열
- 유리수 및 정수 리터럴
- 문자열 리터럴
- 16진수 리터럴
- 열거형

더 많은 설명은 문서를 참고하십시오:

- [Vyper 유형 보기](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity 유형 보기](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 메모리 {#memory}

메모리 변수는 컨트랙스 함수가 실행되는 시간에만 사용이 가능하기 때문에, 블록체인에는 저장되지 않고 비용도 저렴합니다.

[Solidity 문서](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)에서 EVM이 데이터(저장 공간, 메모리, 스택)를 저장하는 방법에 대해 자세히 알아보세요.

### 환경 변수 {#environment-variables}

여러분이 컨트랙트에 정의한 변수 외에도 특별하게 사용할 수 있는 전역 변수가 있습니다. 그것을 통해 주로 블록체인과 현재 트랜잭션에 대한 정보를 알 수 있습니다.

예시:

| **속성**            | **상태 변수** | **설명**                             |
| ----------------- | --------- | ---------------------------------- |
| `block.timestamp` | uint256   | 현재 블록 에포크 타임스탬프                    |
| `msg.sender`      | 주소        | 메시지의 발신자(현재 호출) |

## 함수 {#functions}

함수는 거래에 대한 정보를 간단한 방법으로 가져오거나 설정할 수 있습니다.

함수 호출에는 두 가지 방법이 있습니다.

- `internal` – EVM 호출을 생성하지 않습니다
  - 내부 함수와 상태 변수는 내부에서만 (즉, 현재 계약 또는 그로부터 파생된 계약 내에서만) 접근할 수 있습니다
- `external` – EVM 호출을 생성합니다
  - 외부 함수는 계약 인터페이스의 일부로, 다른 계약 및 트랜잭션을 통해 호출할 수 있습니다. 외부 함수 `f`는 내부에서 호출할 수 없습니다(예: `f()`는 작동하지 않지만 `this.f()`는 작동합니다).

`public` 또는 `private`일 수도 있습니다

- `public` 함수는 계약 내에서 내부적으로 또는 메시지를 통해 외부에서 호출할 수 있습니다
- `private` 함수는 정의된 계약에서만 볼 수 있으며 파생된 계약에서는 볼 수 없습니다

함수와 상태 변수 모두 public 또는 private 설정이 가능합니다.

계약의 상태 변수를 업데이트하는 함수 예제입니다:

```solidity
// Solidity 예시
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` 유형의 매개변수 `value`가 `update_name` 함수에 전달됩니다
- `public`으로 선언되어 누구나 접근할 수 있습니다
- `view`로 선언되지 않았으므로 계약 상태를 수정할 수 있습니다

### View 함수 {#view-functions}

이 함수들은 컨트랙트 데이터를 변경하지 않습니다. 흔히 "getter" 함수라고도 하며 사용자의 지갑의 잔액을 얻을 때 사용될 때의 예시입니다.

```solidity
// Solidity 예시
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

상태를 수정하는 것으로 간주되는 것:

1. 상태 변수에 쓰기
2. [이벤트 발생시키기](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [다른 계약 생성하기](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` 사용하기.
5. 호출을 통해 이더 전송
6. `view` 또는 `pure`로 표시되지 않은 함수 호출하기.
7. 저수준 호출 사용
8. 특정 오프코드를 포함하는 인라인 어셈블리 사용

### 생성자 함수 {#constructor-functions}

`constructor` 함수는 계약이 처음 배포될 때 한 번만 실행됩니다. 많은 클래스 기반 프로그래밍 언어의 `constructor`와 마찬가지로, 이 함수는 종종 상태 변수를 지정된 값으로 초기화합니다.

```solidity
// Solidity 예시
// 계약의 데이터를 초기화하고, `owner`를
// 계약 생성자의 주소로 설정합니다.
constructor() public {
    // 모든 스마트 계약은 외부 트랜잭션에 의존하여 함수를 실행합니다.
    // `msg`는 보낸 사람의 주소 및 트랜잭션에 포함된 ETH 값과 같은
    // 주어진 트랜잭션의 관련 데이터를 포함하는 전역 변수입니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper 예시

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### 내장 함수 {#built-in-functions}

컨트랙트를 작성할 때 정의하는 변수와 함수 외에 추가적으로 사용할 수 있는 특별한 내장 함수가 있습니다. 대표적인 함수에는 아래가 있으며,

- `address.send()` – 솔리디티
- `send(address)` – Vyper

다른 계정으로 ETH를 송금할 때 사용할 수 있습니다.

## 함수 작성하기 {#writing-functions}

당신의 함수에는 다음이 필요합니다:

- 매개변수 변수 및 타입(매개변수를 받는 경우)
- 내부/외부 선언
- 순수(pure)/뷰(view)/지급(payable) 선언
- 반환 타입(값을 반환하는 경우)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 상태 변수

    // 계약이 배포될 때 호출되어 값을 초기화합니다
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get 함수
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set 함수
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

완전한 계약은 다음과 같을 수 있습니다. 여기서 `constructor` 함수는 `dapp_name` 변수에 대한 초기값을 제공합니다.

## 이벤트와 로그 {#events-and-logs}

이벤트는 스마트 계약이 프론트엔드나 다른 구독 애플리케이션과 통신할 수 있게 합니다. 트랜잭션이 검증되어 블록에 추가되면, 스마트 계약은 이벤트를 방출하고 정보를 로그로 기록할 수 있으며, 프론트엔드는 이를 처리하고 활용할 수 있습니다.

## 주석이 달린 예시 {#annotated-examples}

이것들은 Solidity로 작성된 몇 가지 예시입니다. 코드를 사용해보고 싶다면 [Remix](http://remix.ethereum.org)에서 상호작용할 수 있습니다.

### Hello world {#hello-world}

```solidity
// 시맨틱 버저닝을 사용하여 Solidity 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld`라는 이름의 계약을 정의합니다.
// 계약은 함수와 데이터(상태)의 모음입니다.
// 배포된 계약은 이더리움 블록체인의 특정 주소에 존재합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` 유형의 상태 변수 `message`를 선언합니다.
    // 상태 변수는 계약 저장 공간에 영구적으로 저장되는 변수입니다.
    // `public` 키워드를 사용하면 계약 외부에서 변수에 접근할 수 있으며
    // 다른 계약이나 클라이언트가 값을 접근하기 위해 호출할 수 있는 함수를 생성합니다.
    string public message;

    // 많은 클래스 기반 객체 지향 언어와 마찬가지로, 생성자는
    // 계약 생성 시에만 실행되는 특별한 함수입니다.
    // 생성자는 계약의 데이터를 초기화하는 데 사용됩니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 문자열 인수 `initMessage`를 받아 계약의 `message` 저장 공간 변수에
        // 값을 설정합니다.
        message = initMessage;
    }

    // 문자열 인수를 받아
    // `message` 저장 공간 변수를 업데이트하는 public 함수입니다.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 토큰 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address`는 이메일 주소와 비슷하며, 이더리움에서 계정을 식별하는 데 사용됩니다.
    // 주소는 스마트 계약 또는 외부(사용자) 계정을 나타낼 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping`은 기본적으로 해시 테이블 데이터 구조입니다.
    // 이 `mapping`은 부호 없는 정수(토큰 잔액)를 주소(토큰 보유자)에 할당합니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 이벤트를 통해 블록체인 활동을 기록할 수 있습니다.
    // 이더리움 클라이언트는 계약 상태 변경에 반응하기 위해 이벤트를 수신할 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 계약 데이터를 초기화하고, `owner`를
    // 계약 생성자의 주소로 설정합니다.
    constructor() public {
        // 모든 스마트 계약은 외부 트랜잭션에 의존하여 함수를 실행합니다.
        // `msg`는 보낸 사람의 주소 및 트랜잭션에 포함된 ETH 값과 같은
        // 주어진 트랜잭션의 관련 데이터를 포함하는 전역 변수입니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 새로운 토큰을 생성하여 주소로 보냅니다.
    function mint(address receiver, uint amount) public {
        // `require`는 특정 조건을 강제하는 데 사용되는 제어 구조입니다.
        // `require`문이 `false`로 평가되면 예외가 발생하며,
        // 현재 호출 동안 상태에 적용된 모든 변경 사항이 되돌려집니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 계약 소유자만 이 함수를 호출할 수 있습니다
        require(msg.sender == owner, "당신은 소유자가 아닙니다.");

        // 토큰의 최대량을 강제합니다
        require(amount < 1e60, "최대 발행량을 초과했습니다");

        // `receiver`의 잔액을 `amount`만큼 증가시킵니다
        balances[receiver] += amount;
    }

    // 호출자로부터 주소로 기존 토큰을 보냅니다.
    function transfer(address receiver, uint amount) public {
        // 보내는 사람은 보낼 만큼의 충분한 토큰을 가지고 있어야 합니다
        require(amount <= balances[msg.sender], "잔액이 부족합니다.");

        // 두 주소의 토큰 잔액을 조정합니다
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 이전에 정의된 이벤트를 발생시킵니다
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 고유 디지털 자산 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 다른 파일의 심볼을 현재 계약으로 가져옵니다.
// 이 경우 OpenZeppelin의 일련의 헬퍼 계약입니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 키워드는 외부 계약에서 함수와 키워드를 상속받는 데 사용됩니다.
// 이 경우, `CryptoPizza`는 `IERC721` 및 `ERC165` 계약에서 상속받습니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // OpenZeppelin의 SafeMath 라이브러리를 사용하여 산술 연산을 안전하게 수행합니다.
    // 자세히 알아보기: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity의 상수 상태 변수는 다른 언어와 유사하지만
    // 컴파일 시에 상수인 표현식에서 할당해야 합니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct 유형을 사용하면 자신만의 유형을 정의할 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza 구조체의 빈 배열을 생성합니다.
    Pizza[] public pizzas;

    // 피자 ID에서 소유자 주소로의 매핑
    mapping(uint256 => address) public pizzaToOwner;

    // 소유자 주소에서 소유한 토큰 수로의 매핑
    mapping(address => uint256) public ownerPizzaCount;

    // 토큰 ID에서 승인된 주소로의 매핑
    mapping(uint256 => address) pizzaApprovals;

    // 매핑을 중첩할 수 있습니다. 이 예는 소유자를 운영자 승인에 매핑합니다.
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 문자열(이름)과 DNA로부터 임의의 피자를 생성하는 내부 함수
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 키워드는 이 함수가 이 계약과
        // 이 계약을 파생하는 계약 내에서만 보인다는 것을 의미합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`는 피자가 이미 존재하는지 확인하는 함수 제어자입니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 피자 배열에 피자를 추가하고 id를 얻습니다.
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 피자 소유자가 현재 사용자와 동일한지 확인합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0)은 제로 주소이며,
        // pizza[id]가 아직 특정 사용자에게 할당되지 않았음을 나타냅니다.

        assert(pizzaToOwner[id] == address(0));

        // 피자를 소유자에게 매핑합니다.
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 문자열(이름)로부터 임의의 피자를 생성합니다.
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 문자열(이름)과 소유자 주소(생성자)로부터 임의의 DNA를 생성합니다.
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`로 표시된 함수는 상태를 읽거나 수정하지 않을 것을 약속합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 문자열(이름) + 주소(소유자)로부터 임의의 uint를 생성합니다.
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 소유자가 찾은 피자 배열을 반환합니다.
    function getPizzasByOwner(address _owner)
        public
        // `view`로 표시된 함수는 상태를 수정하지 않을 것을 약속합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // `memory` 저장 위치를 사용하여 이 함수 호출의
        // 수명 주기 동안만 값을 저장합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // 피자와 소유권을 다른 주소로 이전합니다.
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "유효하지 않은 주소입니다.");
        require(_exists(_pizzaId), "피자가 존재하지 않습니다.");
        require(_from != _to, "같은 주소로 전송할 수 없습니다.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "주소가 승인되지 않았습니다.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 가져온 IERC721 계약에 정의된 이벤트를 발생시킵니다.
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 안전하게 이전합니다.
     * 대상 주소가 계약인 경우, `onERC721Received`를 구현해야 하며,
     * 이는 안전한 전송 시 호출되고 매직 값
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`을 반환해야 합니다.
     * 그렇지 않으면 전송이 되돌려집니다.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 안전하게 이전합니다.
     * 대상 주소가 계약인 경우, `onERC721Received`를 구현해야 하며,
     * 이는 안전한 전송 시 호출되고 매직 값
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`을 반환해야 합니다.
     * 그렇지 않으면 전송이 되돌려집니다.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "onERC721Received를 구현해야 합니다.");
    }

    /**
     * 대상 주소에서 `onERC721Received`를 호출하는 내부 함수
     * 대상 주소가 계약이 아닌 경우 호출이 실행되지 않습니다.
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // 피자를 소각합니다 - 토큰을 완전히 파괴합니다.
    // `external` 함수 제어자는 이 함수가
    // 계약 인터페이스의 일부이며 다른 계약이 호출할 수 있음을 의미합니다.
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "유효하지 않은 주소입니다.");
        require(_exists(_pizzaId), "피자가 존재하지 않습니다.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "주소가 승인되지 않았습니다.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // 주소별 피자 수를 반환합니다.
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // id로 찾은 피자의 소유자를 반환합니다.
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "유효하지 않은 피자 ID입니다.");
        return owner;
    }

    // 다른 주소가 피자의 소유권을 이전하도록 승인합니다.
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "피자 소유자여야 합니다.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 특정 피자에 대해 승인된 주소를 반환합니다.
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "피자가 존재하지 않습니다.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 주어진 토큰 ID의 현재 승인을 지우는 비공개 함수
     * 주어진 주소가 토큰의 소유자가 아닌 경우 되돌립니다.
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "피자 소유자여야 합니다.");
        require(_exists(_pizzaId), "피자가 존재하지 않습니다.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 주어진 운영자의 승인을 설정하거나 해제합니다.
     * 운영자는 보낸 사람을 대신하여 모든 토큰을 이전할 수 있습니다.
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "자신의 주소를 승인할 수 없습니다.");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 주어진 소유자가 운영자를 승인했는지 여부를 알려줍니다.
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 피자 소유권을 가져옵니다 - 승인된 사용자만 가능합니다.
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "주소가 승인되지 않았습니다.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 피자가 존재하는지 확인합니다.
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 주소가 소유자인지 또는 피자를 이전하도록 승인되었는지 확인합니다.
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 다음으로 인해 solium 검사를 비활성화합니다.
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // 피자가 고유하고 아직 존재하지 않는지 확인합니다.
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "같은 이름의 피자가 이미 존재합니다.");
        _;
    }

    // 대상 주소가 계약인지 여부를 반환합니다.
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 현재 주소에 계약이 있는지 확인하는 더 좋은 방법은 없습니다.
        // 해당 주소의 코드 크기를 확인하는 것보다.
        // 이것이 어떻게 작동하는지에 대한 자세한 내용은 https://ethereum.stackexchange.com/a/14016/36603을
        // 참조하세요.
        // TODO Serenity 릴리스 전에 이것을 다시 확인하세요. 모든 주소가
        // 계약이 될 것이기 때문입니다.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 더 읽어보기 {#further-reading}

스마트 계약에 대한 더 완전한 개요를 원한다면 Solidity와 Vyper의 문서를 확인하세요:

- [솔리디티](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 관련 주제 {#related-topics}

- [스마트 계약](/developers/docs/smart-contracts/)
- [이더리움 가상 머신](/developers/docs/evm/)

## 관련 튜토리얼 {#related-tutorials}

- [계약 크기 제한에 대응하기 위한 계약 축소](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 스마트 계약의 크기를 줄이기 위한 몇 가지 실용적인 팁입니다._
- [이벤트를 사용하여 스마트 계약에서 데이터 기록하기](/developers/tutorials/logging-events-smart-contracts/) _– 스마트 계약 이벤트에 대한 소개와 이를 사용하여 데이터를 기록하는 방법입니다._
- [Solidity에서 다른 계약과 상호작용하기](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 기존 계약에서 스마트 계약을 배포하고 상호작용하는 방법입니다._
