---
title: ERC-20 토큰 스마트 컨트랙트 이해하기
description: 완전한 Solidity 스마트 컨트랙트 예제와 설명을 통해 ERC-20 토큰 표준을 구현하는 방법을 배워보세요.
author: "jdourlens"
tags:
  - "스마트 컨트랙트"
  - "토큰"
  - "solidity"
  - "erc-20"
skill: beginner
breadcrumb: ERC-20 토큰 기초
lang: ko
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이더리움에서 가장 중요한 [스마트 컨트랙트 표준](/developers/docs/standards/) 중 하나는 [ERC-20](/developers/docs/standards/tokens/erc-20/)으로 알려져 있으며, 이는 대체 가능 토큰 구현을 위해 이더리움 블록체인의 모든 스마트 컨트랙트에서 사용되는 기술 표준으로 자리 잡았습니다.

ERC-20은 모든 대체 가능 이더리움 토큰이 준수해야 하는 공통 규칙 목록을 정의합니다. 결과적으로 이 토큰 표준은 모든 유형의 개발자가 더 큰 이더리움 시스템 내에서 새로운 토큰이 어떻게 작동할지 정확하게 예측할 수 있도록 지원합니다. 이는 개발자의 작업을 단순화하고 쉽게 만들어 줍니다. 토큰이 규칙을 따르는 한, 새로운 토큰이 출시될 때마다 모든 새 프로젝트를 다시 수행할 필요가 없다는 것을 알고 작업을 진행할 수 있기 때문입니다.

다음은 ERC-20이 구현해야 하는 함수들을 인터페이스로 나타낸 것입니다. 인터페이스가 무엇인지 확실하지 않다면 [Solidity의 객체 지향 프로그래밍(OOP)](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/)에 대한 문서를 확인해 보세요.

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

다음은 각 함수가 어떤 역할을 하는지에 대한 줄 단위 설명입니다. 그 후에는 ERC-20 토큰의 간단한 구현을 보여드리겠습니다.

## Getter {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

존재하는 토큰의 양을 반환합니다. 이 함수는 Getter이며 컨트랙트의 상태를 수정하지 않습니다. Solidity에는 부동 소수점(float)이 없다는 점을 명심하세요. 따라서 대부분의 토큰은 18자리의 소수점을 채택하며, 1 토큰에 대해 총 공급량 및 기타 결과를 1000000000000000000과 같이 반환합니다. 모든 토큰이 18자리의 소수점을 가지는 것은 아니며, 이는 토큰을 다룰 때 정말 주의해야 할 부분입니다.

```solidity
function balanceOf(address account) external view returns (uint256);
```

주소(`account`)가 소유한 토큰의 양을 반환합니다. 이 함수는 Getter이며 컨트랙트의 상태를 수정하지 않습니다.

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 표준은 한 주소가 다른 주소에게 자신의 토큰을 가져갈 수 있도록 허용량을 부여할 수 있게 합니다. 이 Getter는 `spender`가 `owner`를 대신하여 사용할 수 있도록 허용된 남은 토큰 수를 반환합니다. 이 함수는 Getter이며 컨트랙트의 상태를 수정하지 않고 기본적으로 0을 반환해야 합니다.

## 함수 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

함수 호출자 주소(`msg.sender`)에서 수신자 주소로 `amount`만큼의 토큰을 전송합니다. 이 함수는 나중에 정의되는 `Transfer` 이벤트를 발생시킵니다. 전송이 가능했다면 true를 반환합니다.

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

`spender`가 함수 호출자(`msg.sender`)의 잔액에서 전송할 수 있도록 허용된 `allowance`을 설정합니다. 이 함수는 Approval 이벤트를 발생시킵니다. 이 함수는 허용량이 성공적으로 설정되었는지 여부를 반환합니다.

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

허용량 메커니즘을 사용하여 `sender`에서 `recipient`로 `amount`만큼의 토큰을 전송합니다. 그런 다음 호출자의 허용량에서 amount가 차감됩니다. 이 함수는 `Transfer` 이벤트를 발생시킵니다.

## 이벤트 {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

이 이벤트는 토큰의 양(value)이 `from` 주소에서 `to` 주소로 전송될 때 발생합니다.

새로운 토큰을 발행하는 경우 전송은 일반적으로 0x00..0000 주소(`from`)에서 이루어지는 반면, 토큰을 소각하는 경우 전송은 0x00..0000 주소(`to`)로 이루어집니다.

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

이 이벤트는 `owner`가 `spender`가 사용할 수 있도록 토큰의 양(`value`)을 승인할 때 발생합니다.

## ERC-20 토큰의 기본 구현 {#a-basic-implementation-of-erc-20-tokens}

다음은 ERC-20 토큰의 기반이 되는 가장 간단한 코드입니다.

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

ERC-20 토큰 표준의 또 다른 훌륭한 구현으로는 [오픈제플린 ERC-20 구현](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)이 있습니다.