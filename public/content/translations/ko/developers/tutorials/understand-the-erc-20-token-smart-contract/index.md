---
title: "ERC-20 토큰 스마트 계약 이해하기"
description: "완벽한 솔리디티 스마트 계약 예제와 설명을 통해 ERC-20 토큰 표준을 구현하는 방법을 알아보세요."
author: "jdourlens"
tags: [ "스마트 계약", "토큰", "솔리디티", "erc-20" ]
skill: beginner
lang: ko
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이더리움에서 가장 대표적인 [스마트 계약 표준](/developers/docs/standards/) 중 하나인 [ERC-20](/developers/docs/standards/tokens/erc-20/)은 이더리움 블록체인 상에서 대체 가능 토큰 구현을 위한 모든 스마트 계약의 기술적 표준으로 등장했습니다.

ERC-20은 모든 대체 가능한 이더리움 토큰이 준수해야 하는 공통 규칙 목록을 정의합니다. 따라서 이 토큰 표준을 통해 모든 유형의 개발자는 새로운 토큰이 더 큰 이더리움 시스템 내에서 어떻게 작동할지 정확하게 예측할 수 있습니다. 토큰이 규정을 따르는 한, 개발자들은 새로운 토큰이 출시될 때마다 프로젝트를 다시 작업할 필요가 없으므로 작업이 더 간단하고 쉬워집니다.

다음은 ERC-20이 구현해야 하는 함수를 인터페이스로 나타낸 것입니다. 인터페이스가 무엇인지 확실하지 않다면 [솔리디티의 객체 지향 프로그래밍(OOP)](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)에 대한 저희 아티클을 확인해 보세요.

```solidity
pragma solidity ^0.6.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}
```

여기에서는 각 줄 별로 각각의 함수가 어떤 역할을 하는지 설명합니다. 이어서 ERC-20 토큰의 간단한 구현을 제시합니다.

## 게터 {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

존재하는 토큰의 양을 반환합니다. 이 함수는 게터(getter)이며 컨트랙트의 상태를 수정하지 않습니다. 솔리디티에는 부동 소수점이 없다는 점에 유의하세요. 따라서 대부분의 토큰은 18개의 소수 자릿수를 사용하며, 1 토큰 = 1000000000000000000으로 취급하여 총공급량 및 기타 결과를 반환합니다. 모든 토큰이 18개의 소수 자릿수를 사용하는 것은 아니므로, 토큰을 다룰 때 이 점에 유의해야 합니다.

```solidity
function balanceOf(address account) external view returns (uint256);
```

특정 주소(`account`)가 소유한 토큰의 양을 반환합니다. 이 함수는 게터(getter)이며 컨트랙트의 상태를 수정하지 않습니다.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 표준에서는 한 주소가 다른 주소에게 자신의 주소에서 토큰을 인출할 수 있는 허용량(allowance)을 부여할 수 있습니다. 이 게터는 `spender`가 `owner`를 대신하여 사용할 수 있도록 허용된 토큰의 남은 수량을 반환합니다. 이 함수는 게터이며 컨트랙트의 상태를 수정하지 않고, 기본적으로 0을 반환해야 합니다.

## 함수 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

`amount` 만큼의 토큰을 함수 호출자 주소(`msg.sender`)에서 수신자 주소로 전송합니다. 이 함수는 나중에 정의될 `Transfer` 이벤트를 발생시킵니다. 전송이 가능했다면 true를 반환합니다.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender`가 함수 호출자(`msg.sender`)의 잔액에서 전송하도록 허용된 `allowance`(허용량)를 설정합니다. 이 함수는 `Approval` 이벤트를 발생시킵니다. 이 함수는 허용량이 성공적으로 설정되었는지 여부를 반환합니다.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

허용량 메커니즘을 사용하여 `sender`에서 `recipient`로 `amount` 만큼의 토큰을 이동시킵니다. `amount`는 호출자의 허용량에서 차감됩니다. 이 함수는 `Transfer` 이벤트를 발생시킵니다.

## 이벤트 {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

이 이벤트는 토큰의 양(`value`)이 `from` 주소에서 `to` 주소로 전송될 때 발생합니다.

새로운 토큰이 발행되는 경우 일반적으로 보내는 주소 `from`이 0x00..0000 이 되며, 소각되는 경우 받는 주소 `to`가 0x00..0000 이 됩니다.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

이 이벤트는 `spender`가 사용할 토큰의 양(`value`)이 `owner`에 의해 승인될 때 발생합니다.

## ERC-20 토큰의 기본 구현 {#a-basic-implementation-of-erc-20-tokens}

아래는 ERC-20 토큰을 구성하는 가장 기본적인 코드입니다.

```solidity
pragma solidity ^0.8.0;

interface IERC20 {

    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);


    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract ERC20Basic is IERC20 {

    string public constant name = "ERC20Basic";
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;


    mapping(address => uint256) balances;

    mapping(address => mapping (address => uint256)) allowed;

    uint256 totalSupply_ = 10 ether;


   constructor() {
	balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
	return totalSupply_;
    }

    function balanceOf(address tokenOwner) public override view returns (uint256) {
        return balances[tokenOwner];
    }

    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }

    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }

    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }

    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner]);
        require(numTokens <= allowed[owner][msg.sender]);

        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}
```

ERC-20 토큰 표준의 또 다른 훌륭한 구현은 [OpenZeppelin ERC-20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)입니다.
