---
title: "스마트 컨트랙트의 구조"
description: "스마트 컨트랙트의 구조(함수, 데이터, 변수)에 대한 심층적인 살펴보기."
lang: ko
---

스마트 컨트랙트는 이더리움의 특정 주소에서 실행되는 프로그램입니다. 스마트 컨트랙트는 트랜잭션을 수신할 때 실행할 수 있는 데이터와 함수로 구성됩니다. 다음은 스마트 컨트랙트를 구성하는 요소에 대한 개요입니다.

## 전제 조건 {#prerequisites}

먼저 [스마트 컨트랙트](/developers/docs/smart-contracts/)에 대해 읽어보시기 바랍니다. 이 문서는 JavaScript나 Python 같은 프로그래밍 언어에 이미 익숙하다고 가정합니다.

## 데이터 {#data}

모든 컨트랙트 데이터는 `storage` 또는 `memory` 중 하나의 위치에 할당되어야 합니다. 스마트 컨트랙트에서 스토리지를 수정하는 것은 비용이 많이 들기 때문에 데이터가 어디에 저장되어야 할지 신중하게 고려해야 합니다.

### 스토리지 (Storage) {#storage}

영구적인 데이터는 스토리지라고 부르며 상태 변수로 표현됩니다. 이 값들은 블록체인에 영구적으로 저장됩니다. 컴파일 시 컨트랙트가 블록체인에서 얼마나 많은 스토리지를 필요로 하는지 추적할 수 있도록 타입을 선언해야 합니다.

```solidity
// Solidity 예제
contract SimpleStorage {
    uint storedData; // 상태 변수
    // ...
}
```

```python
# Vyper 예제
storedData: int128
```

객체 지향 언어로 프로그래밍해 본 적이 있다면 대부분의 타입에 익숙할 것입니다. 하지만 [이더리움](/) 개발이 처음이라면 `address` 타입은 생소할 것입니다.

`address` 타입은 20바이트 또는 160비트에 해당하는 이더리움 주소를 담을 수 있습니다. 이 값은 앞에 0x가 붙은 16진수 표기법으로 반환됩니다.

다른 타입들은 다음과 같습니다:

- 불리언 (boolean)
- 정수 (integer)
- 고정 소수점 숫자 (fixed point numbers)
- 고정 크기 바이트 배열 (fixed-size byte arrays)
- 동적 크기 바이트 배열 (dynamically sized byte arrays)
- 유리수 및 정수 리터럴 (rational and integer literals)
- 문자열 리터럴 (string literals)
- 16진수 리터럴 (hexadecimal literals)
- 열거형 (enums)

더 자세한 설명은 문서를 참조하세요:

- [Vyper 타입 보기](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity 타입 보기](https://docs.soliditylang.org/en/latest/types.html#value-types)

### 메모리 (Memory) {#memory}

컨트랙트 함수가 실행되는 동안에만 저장되는 값을 메모리 변수라고 합니다. 이 변수들은 블록체인에 영구적으로 저장되지 않기 때문에 사용하는 데 훨씬 저렴합니다.

EVM이 데이터를 저장하는 방법(스토리지, 메모리, 스택)에 대해 더 알아보려면 [Solidity 문서](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack)를 참조하세요.

### 환경 변수 {#environment-variables}

컨트랙트에 정의하는 변수 외에도 몇 가지 특별한 전역 변수가 있습니다. 이 변수들은 주로 블록체인이나 현재 트랜잭션에 대한 정보를 제공하는 데 사용됩니다.

예시:

| **속성**          | **상태 변수** | **설명**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | 현재 블록의 에포크 타임스탬프        |
| `msg.sender`      | address            | 메시지 발신자 (현재 호출) |

## 함수 {#functions}

가장 단순하게 말하자면, 함수는 들어오는 트랜잭션에 대한 응답으로 정보를 가져오거나 설정할 수 있습니다.

함수 호출에는 두 가지 유형이 있습니다:

- `internal` – EVM 호출을 생성하지 않습니다.
  - 내부 함수와 상태 변수는 내부적으로만 접근할 수 있습니다(즉, 현재 컨트랙트 내부 또는 이를 상속받은 컨트랙트에서만).
- `external` – EVM 호출을 생성합니다.
  - 외부 함수는 컨트랙트 인터페이스의 일부이므로 다른 컨트랙트나 트랜잭션을 통해 호출될 수 있습니다. 외부 함수 `f`는 내부적으로 호출할 수 없습니다(즉, `f()`는 작동하지 않지만 `this.f()`는 작동합니다).

또한 `public` 또는 `private`일 수 있습니다.

- `public` 함수는 컨트랙트 내부에서 내부적으로 호출되거나 메시지를 통해 외부에서 호출될 수 있습니다.
- `private` 함수는 해당 함수가 정의된 컨트랙트에서만 볼 수 있으며 파생된 컨트랙트에서는 볼 수 없습니다.

함수와 상태 변수 모두 public 또는 private으로 설정할 수 있습니다.

다음은 컨트랙트의 상태 변수를 업데이트하는 함수입니다:

```solidity
// Solidity 예제
function update_name(string value) public {
    dapp_name = value;
}
```

- `string` 타입의 매개변수 `value`가 함수에 전달됩니다: `update_name`
- `public`으로 선언되어 누구나 접근할 수 있습니다.
- `view`로 선언되지 않았으므로 컨트랙트 상태를 수정할 수 있습니다.

### View 함수 {#view-functions}

이 함수들은 컨트랙트 데이터의 상태를 수정하지 않을 것을 보장합니다. 일반적인 예로는 "getter" 함수가 있으며, 예를 들어 사용자의 잔액을 가져올 때 사용할 수 있습니다.

```solidity
// Solidity 예제
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

상태를 수정하는 것으로 간주되는 작업:

1. 상태 변수에 쓰기.
2. [이벤트 발생시키기](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [다른 컨트랙트 생성하기](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. `selfdestruct` 사용하기.
5. 호출을 통해 이더 전송하기.
6. `view` 또는 `pure`로 표시되지 않은 함수 호출하기.
7. 저수준(low-level) 호출 사용하기.
8. 특정 연산 코드(opcode)가 포함된 인라인 어셈블리 사용하기.

### 생성자 함수 {#constructor-functions}

`constructor` 함수는 컨트랙트가 처음 배포될 때 단 한 번만 실행됩니다. 많은 클래스 기반 프로그래밍 언어의 `constructor`와 마찬가지로, 이 함수들은 종종 상태 변수를 지정된 값으로 초기화합니다.

```solidity
// Solidity 예제
// 컨트랙트의 데이터를 초기화하고, `owner`를
// 컨트랙트 생성자의 주소로 설정합니다.
constructor() public {
    // 모든 스마트 컨트랙트는 함수를 트리거하기 위해 외부 트랜잭션에 의존합니다.
    // `msg`는 주어진 트랜잭션에 대한 관련 데이터를 포함하는 전역 변수입니다.
    // 예를 들어 발신자의 주소와 트랜잭션에 포함된 ETH 값 등이 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper 예제

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### 내장 함수 {#built-in-functions}

컨트랙트에 정의하는 변수와 함수 외에도 몇 가지 특별한 내장 함수가 있습니다. 가장 대표적인 예는 다음과 같습니다:

- `address.send()` – Solidity
- `send(address)` – Vyper

이를 통해 컨트랙트가 다른 계정으로 ETH를 전송할 수 있습니다.

## 함수 작성하기 {#writing-functions}

함수에는 다음이 필요합니다:

- 매개변수 변수 및 타입 (매개변수를 허용하는 경우)
- internal/external 선언
- pure/view/payable 선언
- 반환 타입 (값을 반환하는 경우)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // 상태 변수

    // 컨트랙트가 배포될 때 호출되며 값을 초기화합니다.
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

완전한 컨트랙트는 다음과 같은 모습일 수 있습니다. 여기서 `constructor` 함수는 `dapp_name` 변수에 초기값을 제공합니다.

## 이벤트 및 로그 {#events-and-logs}

이벤트를 통해 스마트 컨트랙트는 프론트엔드나 다른 구독 애플리케이션과 통신할 수 있습니다. 트랜잭션이 검증되어 블록에 추가되면, 스마트 컨트랙트는 이벤트를 발생시키고 정보를 로그로 남길 수 있으며, 프론트엔드는 이를 처리하고 활용할 수 있습니다.

## 주석이 달린 예제 {#annotated-examples}

다음은 Solidity로 작성된 몇 가지 예제입니다. 코드를 직접 다뤄보고 싶다면 [Remix](https://remix.ethereum.org)에서 상호작용해 볼 수 있습니다.

### Hello world {#hello-world}

```solidity
// 유의적 버전(semantic versioning)을 사용하여 Solidity의 버전을 지정합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// `HelloWorld`라는 이름의 컨트랙트를 정의합니다.
// 컨트랙트는 함수와 데이터(상태)의 모음입니다.
// 배포된 컨트랙트는 이더리움 블록체인의 특정 주소에 상주합니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // `string` 타입의 상태 변수 `message`를 선언합니다.
    // 상태 변수는 그 값이 컨트랙트 스토리지에 영구적으로 저장되는 변수입니다.
    // `public` 키워드는 컨트랙트 외부에서 변수에 접근할 수 있게 하며
    // 다른 컨트랙트나 클라이언트가 값을 읽기 위해 호출할 수 있는 함수를 생성합니다.
    string public message;

    // 많은 클래스 기반 객체 지향 언어와 유사하게, 생성자는
    // 컨트랙트 생성 시에만 실행되는 특수한 함수입니다.
    // 생성자는 컨트랙트의 데이터를 초기화하는 데 사용됩니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // 문자열 인수 `initMessage`를 받아 그 값을
        // 컨트랙트의 `message` 스토리지 변수에 설정합니다.
        message = initMessage;
    }

    // 문자열 인수를 받아들이고
    // `message` 스토리지 변수를 업데이트하는 public 함수입니다.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### 토큰 {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `address`(주소)는 이메일 주소와 비슷하며, 이더리움에서 계정을 식별하는 데 사용됩니다.
    // 주소는 스마트 컨트랙트 또는 외부(사용자) 계정을 나타낼 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping`은 본질적으로 해시 테이블 데이터 구조입니다.
    // 이 `mapping`은 부호 없는 정수(토큰 잔액)를 주소(토큰 보유자)에 할당합니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // 이벤트는 블록체인 상의 활동을 로깅할 수 있게 해줍니다.
    // 이더리움 클라이언트는 컨트랙트 상태 변경에 반응하기 위해 이벤트를 수신할 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // 컨트랙트의 데이터를 초기화하고, `owner`를
    // 컨트랙트 생성자의 주소로 설정합니다.
    constructor() public {
        // 모든 스마트 컨트랙트는 함수를 트리거하기 위해 외부 트랜잭션에 의존합니다.
        // `msg`는 주어진 트랜잭션에 대한 관련 데이터를 포함하는 전역 변수입니다.
        // 예를 들어 발신자의 주소와 트랜잭션에 포함된 ETH 값 등이 있습니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // 일정량의 새로운 토큰을 생성하여 주소로 전송합니다.
    function mint(address receiver, uint amount) public {
        // `require`는 특정 조건을 강제하는 데 사용되는 제어 구조입니다.
        // `require` 문이 `false`로 평가되면 예외가 트리거되며,
        // 현재 호출 중에 상태에 적용된 모든 변경 사항을 되돌립니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // 컨트랙트 소유자만이 이 함수를 호출할 수 있습니다.
        require(msg.sender == owner, "You are not the owner.");

        // 토큰의 최대 수량을 강제합니다.
        require(amount < 1e60, "Maximum issuance exceeded");

        // `receiver`의 잔액을 `amount`만큼 증가시킵니다.
        balances[receiver] += amount;
    }

    // 호출자로부터 특정 주소로 일정량의 기존 토큰을 전송합니다.
    function transfer(address receiver, uint amount) public {
        // 발신자는 전송할 충분한 토큰을 가지고 있어야 합니다.
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // 두 주소의 토큰 잔액을 조정합니다.
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // 앞서 정의한 이벤트를 발생시킵니다.
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### 고유한 디지털 자산 {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// 다른 파일의 심볼을 현재 컨트랙트로 가져옵니다.
// 이 경우, OpenZeppelin의 일련의 헬퍼 컨트랙트들입니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// `is` 키워드는 외부 컨트랙트로부터 함수와 키워드를 상속받는 데 사용됩니다.
// 이 경우, `CryptoPizza`는 `IERC721` 및 `ERC165` 컨트랙트를 상속받습니다.
// 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // 산술 연산을 안전하게 수행하기 위해 OpenZeppelin의 SafeMath 라이브러리를 사용합니다.
    // 자세히 알아보기: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Solidity의 상수 상태 변수는 다른 언어와 유사하지만
    // 컴파일 타임에 상수인 표현식에서 할당해야 합니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // 구조체(Struct) 타입을 사용하면 사용자 정의 타입을 정의할 수 있습니다.
    // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Pizza 구조체의 빈 배열을 생성합니다.
    Pizza[] public pizzas;

    // 피자 ID에서 소유자의 주소로의 매핑
    mapping(uint256 => address) public pizzaToOwner;

    // 소유자의 주소에서 소유한 토큰 수로의 매핑
    mapping(address => uint256) public ownerPizzaCount;

    // 토큰 ID에서 승인된 주소로의 매핑
    mapping(uint256 => address) pizzaApprovals;

    // 매핑을 중첩할 수 있으며, 이 예제는 소유자를 운영자 승인에 매핑합니다.
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // 문자열(이름)과 DNA로부터 무작위 피자를 생성하는 내부(internal) 함수
    function _createPizza(string memory _name, uint256 _dna)
        // `internal` 키워드는 이 함수가 현재 컨트랙트와
        // 이 컨트랙트를 상속받는 컨트랙트 내에서만 접근할 수 있음을 의미합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique`는 피자가 이미 존재하는지 확인하는 함수 제어자(modifier)입니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // 피자 배열에 피자를 추가하고 ID를 가져옵니다.
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // 피자 소유자가 현재 사용자와 동일한지 확인합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // address(0)은 영(zero) 주소이며,
        // 이는 pizza[id]가 아직 특정 사용자에게 할당되지 않았음을 나타냅니다.

        assert(pizzaToOwner[id] == address(0));

        // 피자를 소유자에게 매핑합니다.
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // 문자열(이름)로부터 무작위 피자를 생성합니다.
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // 문자열(이름)과 소유자(생성자)의 주소로부터 무작위 DNA를 생성합니다.
    function generateRandomDna(string memory _str, address _owner)
        public
        // `pure`로 표시된 함수는 상태를 읽거나 수정하지 않을 것을 보장합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // 문자열(이름) + 주소(소유자)로부터 무작위 uint를 생성합니다.
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // 소유자가 찾은 피자 배열을 반환합니다.
    function getPizzasByOwner(address _owner)
        public
        // `view`로 표시된 함수는 상태를 수정하지 않을 것을 보장합니다.
        // 자세히 알아보기: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // 이 함수 호출의 수명 주기 동안에만 값을 저장하기 위해
        // `memory` 스토리지 위치를 사용합니다.
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

    // 피자와 소유권을 다른 주소로 전송합니다.
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // 가져온 IERC721 컨트랙트에 정의된 이벤트를 발생시킵니다.
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 안전하게 전송합니다.
     * 대상 주소가 컨트랙트인 경우, 안전한 전송 시 호출되는 `onERC721Received`를 구현해야 하며,
     * 매직 값 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`를 반환해야 합니다.
     * 그렇지 않으면 전송이 되돌려집니다.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * 주어진 토큰 ID의 소유권을 다른 주소로 안전하게 전송합니다.
     * 대상 주소가 컨트랙트인 경우, 안전한 전송 시 호출되는 `onERC721Received`를 구현해야 하며,
     * 매직 값 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`를 반환해야 합니다.
     * 그렇지 않으면 전송이 되돌려집니다.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * 대상 주소에서 `onERC721Received`를 호출하는 내부 함수입니다.
     * 대상 주소가 컨트랙트가 아닌 경우 호출이 실행되지 않습니다.
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
    // 컨트랙트 인터페이스의 일부이며 다른 컨트랙트에서 호출할 수 있음을 의미합니다.
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // 주소별 피자 개수를 반환합니다.
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // ID로 찾은 피자의 소유자를 반환합니다.
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // 피자의 소유권을 전송할 수 있도록 다른 주소를 승인합니다.
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // 특정 피자에 대해 승인된 주소를 반환합니다.
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * 주어진 토큰 ID의 현재 승인을 지우는 private 함수입니다.
     * 주어진 주소가 실제로 토큰의 소유자가 아닌 경우 되돌립니다.
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * 주어진 운영자의 승인을 설정하거나 해제합니다.
     * 운영자는 발신자를 대신하여 발신자의 모든 토큰을 전송할 수 있습니다.
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // 운영자가 주어진 소유자에 의해 승인되었는지 여부를 알려줍니다.
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // 피자의 소유권을 가져옵니다 - 승인된 사용자만 가능합니다.
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // 피자가 존재하는지 확인합니다.
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // 주소가 소유자인지 또는 피자를 전송하도록 승인되었는지 확인합니다.
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // 다음 이유로 solium 검사를 비활성화합니다:
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // 피자가 고유하며 아직 존재하지 않는지 확인합니다.
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // 대상 주소가 컨트랙트인지 여부를 반환합니다.
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // 현재 주소에 컨트랙트가 있는지 확인하는 더 나은 방법은
        // 해당 주소의 코드 크기를 확인하는 것 외에는 없습니다.
        // https://ethereum.stackexchange.com/a/14016/36603 을 참조하여
        // 이것이 어떻게 작동하는지에 대한 자세한 내용을 확인하세요.
        // TODO Serenity 릴리스 전에 이를 다시 확인하세요. 그때는 모든 주소가
        // 컨트랙트가 될 것이기 때문입니다.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## 더 읽어보기 {#further-reading}

스마트 컨트랙트에 대한 더 완전한 개요를 보려면 Solidity와 Vyper의 문서를 확인하세요:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## 관련 주제 {#related-topics}

- [스마트 컨트랙트](/developers/docs/smart-contracts/)
- [이더리움 가상 머신(EVM)](/developers/docs/evm/)

## 관련 튜토리얼 {#related-tutorials}

- [컨트랙트 크기 제한에 대처하기 위한 컨트랙트 축소](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– 스마트 컨트랙트의 크기를 줄이기 위한 몇 가지 실용적인 팁입니다._
- [이벤트를 사용하여 스마트 컨트랙트에서 데이터 로깅하기](/developers/tutorials/logging-events-smart-contracts/) _– 스마트 컨트랙트 이벤트에 대한 소개와 이를 사용하여 데이터를 로깅하는 방법입니다._
- [Solidity에서 다른 컨트랙트와 상호작용하기](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– 기존 컨트랙트에서 스마트 컨트랙트를 배포하고 상호작용하는 방법입니다._