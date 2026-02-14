---
title: "ERC-223 토큰 표준"
description: "ERC-223 대체 가능 토큰 표준에 대한 개요, 작동 방식 및 ERC-20과의 비교."
lang: ko
---

## 소개 {#introduction}

### ERC-223은 무엇인가요? {#what-is-erc223}

ERC-223은 ERC-20 표준과 유사한 대체 가능 토큰 표준입니다. 주요 차이점은 ERC-223이 토큰 API뿐만 아니라 발신자에서 수신자로 토큰을 전송하는 로직도 정의한다는 것입니다. 수신자 측에서 토큰 전송을 처리할 수 있는 통신 모델을 도입합니다.

### ERC-20과의 차이점 {#erc20-differences}

ERC-223은 ERC-20의 몇 가지 한계를 해결하고 토큰 계약과 토큰을 받을 수 있는 계약 간의 새로운 상호 작용 방법을 도입합니다. ERC-20에서는 불가능하지만 ERC-223에서는 가능한 몇 가지 사항이 있습니다.

- 수신자 측에서의 토큰 전송 처리: 수신자는 ERC-223 토큰이 입금되고 있음을 감지할 수 있습니다.
- 부적절하게 전송된 토큰 거부: 사용자가 토큰을 받지 않아야 하는 계약에 ERC-223 토큰을 보내는 경우, 해당 계약은 트랜잭션을 거부하여 토큰 손실을 방지할 수 있습니다.
- 전송 시 메타데이터: ERC-223 토큰은 메타데이터를 포함할 수 있어 토큰 트랜잭션에 임의의 정보를 첨부할 수 있습니다.

## 필수 구성 요소 {#prerequisites}

- [계정](/developers/docs/accounts)
- [스마트 계약](/developers/docs/smart-contracts/)
- [토큰 표준](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 본문 {#body}

ERC-223은 스마트 계약 내의 토큰을 위한 API를 구현하는 토큰 표준입니다. 또한 ERC-223 토큰을 받도록 되어 있는 계약을 위한 API를 선언합니다. ERC-223 수신자 API를 지원하지 않는 계약은 ERC-223 토큰을 받을 수 없어 사용자 실수를 방지합니다.

스마트 계약이 다음 메서드와 이벤트를 구현하면 ERC-223 호환 토큰 계약이라고 할 수 있습니다. 배포되면 이더리움에서 생성된 토큰을 추적할 책임이 있습니다.

계약이 이러한 함수만 가질 의무는 없으며, 개발자는 다른 토큰 표준의 다른 기능을 이 계약에 추가할 수 있습니다. 예를 들어, `approve` 및 `transferFrom` 함수는 ERC-223 표준의 일부는 아니지만 필요한 경우 구현할 수 있습니다.

[EIP-223](https://eips.ethereum.org/EIPS/eip-223)에서:

### 메서드 {#methods}

ERC-223 토큰은 다음 메서드를 구현해야 합니다.

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

ERC-223 토큰을 받도록 되어 있는 계약은 다음 메서드를 구현해야 합니다.

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

`tokenReceived(..)` 함수를 구현하지 않는 계약으로 ERC-223 토큰을 보내면 전송이 실패해야 하며, 토큰이 발신자의 잔액에서 이동해서는 안 됩니다.

### 이벤트 {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### 예시 {#examples}

ERC-223 토큰의 API는 ERC-20과 유사하므로 UI 개발 관점에서 차이가 없습니다. 여기서 유일한 예외는 ERC-223 토큰에 `approve` + `transferFrom` 함수가 없을 수 있다는 것입니다. 이 함수들은 이 표준에서 선택 사항이기 때문입니다.

#### 솔리디티 예제 {#solidity-example}

다음 예제는 기본 ERC-223 토큰 계약이 어떻게 작동하는지 보여줍니다.

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

이제 tokenA가 ERC-223 토큰이라고 가정하고, `tokenA`의 입금을 수락하는 다른 계약을 원합니다. 계약은 tokenA만 수락하고 다른 모든 토큰은 거부해야 합니다. 계약이 tokenA를 받으면 `Deposit()` 이벤트를 발생시키고 내부 `deposits` 변수의 값을 증가시켜야 합니다.

코드는 다음과 같습니다.

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // 우리가 수락하려는 유일한 토큰입니다.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // 이 함수 내에서 다음을 이해하는 것이 중요합니다
        // msg.sender는 수신 중인 토큰의 주소이며,
        // msg.value는 대부분의 경우 토큰 계약이 이더를 소유하거나 전송하지 않으므로 항상 0입니다,
        // _from은 토큰 전송의 발신자이고,
        // _value는 입금된 토큰의 양입니다.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## 자주 묻는 질문 {#faq}

### 계약에 tokenB를 보내면 어떻게 될까요? {#sending-tokens}

트랜잭션이 실패하고 토큰 전송이 발생하지 않습니다. 토큰은 발신자의 주소로 반환됩니다.

### 이 계약에 어떻게 입금할 수 있나요? {#contract-deposits}

ERC-223 토큰의 `transfer(address,uint256)` 또는 `transfer(address,uint256,bytes)` 함수를 호출하여 `RecipientContract`의 주소를 지정합니다.

### 이 계약에 ERC-20 토큰을 전송하면 어떻게 될까요? {#erc-20-transfers}

`RecipientContract`에 ERC-20 토큰을 보내면 토큰은 전송되지만, 전송이 인식되지 않습니다(`Deposit()` 이벤트가 발생하지 않으며, deposits 값도 변경되지 않음). 원치 않는 ERC-20 입금은 필터링하거나 방지할 수 없습니다.

### 토큰 입금이 완료된 후 일부 함수를 실행하려면 어떻게 해야 할까요? {#function-execution}

여러 가지 방법이 있습니다. 이 예제에서는 ERC-223 전송을 이더 전송과 동일하게 만드는 방법을 따릅니다.

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // 수락하려는 유일한 토큰입니다.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // 들어오는 트랜잭션을 처리하고 후속 함수 호출을 수행합니다.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

`RecipientContract`가 ERC-223 토큰을 받으면, 계약은 이더리움 트랜잭션이 트랜잭션 `data`로 함수 호출을 인코딩하는 방식과 동일하게 토큰 트랜잭션의 `_data` 매개변수로 인코딩된 함수를 실행합니다. 자세한 내용은 [데이터 필드](/developers/docs/transactions/#the-data-field)를 읽어보세요.

위 예에서 ERC-223 토큰은 `transfer(address,uin256,bytes calldata _data)` 함수를 사용하여 `RecipientContract`의 주소로 전송되어야 합니다. 데이터 매개변수가 `0xc2985578`(`foo()` 함수의 서명)인 경우, 토큰 입금이 수신된 후 foo() 함수가 호출되고 Foo() 이벤트가 발생합니다.

매개변수는 토큰 전송의 `data`에도 인코딩될 수 있습니다. 예를 들어, `_someNumber`에 12345 값을 사용하여 bar() 함수를 호출할 수 있습니다. 이 경우 `data`는 `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2`여야 합니다. 여기서 `0x0423a132`는 `bar(uint256)` 함수의 서명이고 `00000000000000000000000000000000000000000000000000000000000004d2`는 uint256으로서의 12345입니다.

## 한계 {#limitations}

ERC-223이 ERC-20 표준에서 발견된 여러 문제를 해결하지만, 자체적인 한계도 있습니다.

- 채택 및 호환성: ERC-223은 아직 널리 채택되지 않아 기존 도구 및 플랫폼과의 호환성이 제한될 수 있습니다.
- 하위 호환성: ERC-223은 ERC-20과 하위 호환되지 않습니다. 즉, 기존 ERC-20 계약 및 도구는 수정 없이는 ERC-223 토큰과 작동하지 않습니다.
- 가스 비용: ERC-223 전송의 추가 확인 및 기능으로 인해 ERC-20 트랜잭션에 비해 가스 비용이 더 많이 발생할 수 있습니다.

## 더 읽어보기 {#further-reading}

- [EIP-223: ERC-223 토큰 표준](https://eips.ethereum.org/EIPS/eip-223)
- [초기 ERC-223 제안](https://github.com/ethereum/eips/issues/223)
