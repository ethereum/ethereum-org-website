---
title: "Solidity 스마트 컨트랙트에서 ERC-20 토큰 전송 및 승인"
description: "Solidity를 사용하여 ERC-20 토큰 전송 및 승인을 처리하는 DEX 스마트 컨트랙트를 구축합니다."
author: "jdourlens"
tags: ["스마트 컨트랙트", "토큰", "Solidity", "erc-20"]
skill: intermediate
breadcrumb: "ERC-20 전송"
lang: ko
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

이전 튜토리얼에서는 이더리움 블록체인에서 [Solidity로 작성된 ERC-20 토큰의 구조](/developers/tutorials/understand-the-erc-20-token-smart-contract/)를 살펴보았습니다. 이 글에서는 Solidity 언어를 사용하여 스마트 컨트랙트로 토큰과 상호작용하는 방법을 알아보겠습니다.

이 스마트 컨트랙트를 위해, 사용자가 이더를 새로 배포된 [ERC-20 토큰](/developers/docs/standards/tokens/erc-20/)으로 거래할 수 있는 실제 더미 탈중앙화 거래소(DEX)를 만들 것입니다.

이 튜토리얼에서는 이전 튜토리얼에서 작성한 코드를 기반으로 사용합니다. 우리의 DEX는 생성자에서 컨트랙트 인스턴스를 인스턴스화하고 다음 작업을 수행합니다.

- 토큰을 이더로 교환
- 이더를 토큰으로 교환

간단한 ERC20 코드베이스를 추가하여 탈중앙화 거래소 코드를 시작하겠습니다.

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

우리의 새로운 DEX 스마트 컨트랙트는 ERC-20을 배포하고 공급된 모든 토큰을 가져옵니다.

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // TODO
    }

    function sell(uint256 amount) public {
        // TODO
    }

}
```

이제 DEX가 준비되었으며 사용 가능한 모든 토큰 예비량을 보유하고 있습니다. 이 컨트랙트에는 두 가지 함수가 있습니다.

- `buy`: 사용자는 이더를 전송하고 그 대가로 토큰을 받을 수 있습니다.
- `sell`: 사용자는 토큰을 전송하고 이더를 돌려받기로 결정할 수 있습니다.

## buy 함수 {#the-buy-function}

buy 함수를 코딩해 보겠습니다. 먼저 메시지에 포함된 이더의 양을 확인하고, 컨트랙트가 충분한 토큰을 소유하고 있는지, 그리고 메시지에 이더가 포함되어 있는지 검증해야 합니다. 컨트랙트가 충분한 토큰을 소유하고 있다면 사용자에게 해당 수량의 토큰을 전송하고 `Bought` 이벤트를 발생시킵니다.

오류가 발생하여 require문을 호출하는 경우, 전송된 이더는 즉시 되돌려져(revert) 사용자에게 반환된다는 점에 유의하세요.

간단하게 설명하기 위해 1 토큰을 1 Wei로 교환하겠습니다.

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

구매가 성공적으로 이루어진 경우 트랜잭션에서 두 가지 이벤트를 확인할 수 있습니다. 토큰 `Transfer` 이벤트와 `Bought` 이벤트입니다.

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell 함수 {#the-sell-function}

판매를 담당하는 함수는 먼저 사용자가 사전에 approve 함수를 호출하여 해당 금액을 승인하도록 요구합니다. 전송을 승인하려면 사용자가 DEX에 의해 인스턴스화된 ERC20Basic 토큰을 호출해야 합니다. 이는 먼저 DEX 컨트랙트의 `token()` 함수를 호출하여 DEX가 `token`라는 ERC20Basic 컨트랙트를 배포한 주소를 검색함으로써 달성할 수 있습니다. 그런 다음 세션에서 해당 컨트랙트의 인스턴스를 생성하고 `approve` 함수를 호출합니다. 이후 DEX의 `sell` 함수를 호출하여 토큰을 다시 이더로 스왑할 수 있습니다. 예를 들어, 대화형 Brownie 세션에서는 다음과 같이 보입니다.

```python
#### 대화형 Brownie 콘솔의 Python...

# DEX를 배포합니다
dex = DEX.deploy({'from':account1})

# buy 함수를 호출하여 이더를 토큰으로 스왑합니다
# 1e18은 Wei 단위로 표시된 1 이더입니다
dex.buy({'from': account2, 1e18})

# ERC20 토큰의 배포 주소를 가져옵니다
# 이는 DEX 컨트랙트 생성 중에 배포되었습니다
# dex.token()은 토큰이 배포된 주소를 반환합니다
token = ERC20Basic.at(dex.token())

# 토큰의 approve 함수를 호출합니다
# dex 주소를 spender로 승인합니다
# 그리고 얼마나 많은 토큰을 사용할 수 있도록 허용할지 지정합니다
token.approve(dex.address, 3e18, {'from':account2})

```

그런 다음 sell 함수가 호출되면, 호출자 주소에서 컨트랙트 주소로의 전송이 성공했는지 확인한 후 이더를 호출자 주소로 다시 보냅니다.

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "You need to sell at least some tokens");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "Check the token allowance");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

모든 것이 정상적으로 작동하면 트랜잭션에서 2개의 이벤트(`Transfer` 및 `Sold`)가 표시되고 토큰 잔액과 이더 잔액이 업데이트된 것을 확인할 수 있습니다.

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

이 튜토리얼을 통해 ERC-20 토큰의 잔액과 허용량을 확인하는 방법과 인터페이스를 사용하여 ERC20 스마트 컨트랙트의 `Transfer` 및 `TransferFrom`를 호출하는 방법을 살펴보았습니다.

트랜잭션을 생성한 후에는 컨트랙트에서 발생한 [트랜잭션을 대기하고 세부 정보를 가져오는](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/) JavaScript 튜토리얼과, ABI가 있는 한 [토큰 전송이나 기타 이벤트에 의해 생성된 이벤트를 디코딩하는 튜토리얼](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)이 준비되어 있습니다.

다음은 이 튜토리얼의 전체 코드입니다.

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


contract DEX {

    event Bought(uint256 amount);
    event Sold(uint256 amount);


    IERC20 public token;

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        uint256 amountTobuy = msg.value;
        uint256 dexBalance = token.balanceOf(address(this));
        require(amountTobuy > 0, "You need to send some ether");
        require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "You need to sell at least some tokens");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "Check the token allowance");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```