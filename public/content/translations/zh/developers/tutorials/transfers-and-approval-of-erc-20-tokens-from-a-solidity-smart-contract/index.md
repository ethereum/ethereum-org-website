---
title: 从 Solidity 智能合约转账和授权 ERC-20 代币
description: 使用 Solidity 构建一个处理 ERC-20 代币转账和授权的 DEX 智能合约。
author: "jdourlens"
tags: ["智能合约", "代币", "solidity", "erc-20"]
skill: intermediate
breadcrumb: ERC-20 转账
lang: zh
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在上一篇教程中，我们学习了以太坊区块链上 [Solidity 中 ERC-20 代币的剖析](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。在本文中，我们将了解如何使用 Solidity 语言通过智能合约与代币进行交互。

对于这个智能合约，我们将创建一个真正的虚拟去中心化交易所 (DEX)，用户可以在其中用以太币兑换我们新部署的 [ERC-20 代币](/developers/docs/standards/tokens/erc-20/)。

在本教程中，我们将使用在上一篇教程中编写的代码作为基础。我们的 DEX 将在其构造函数中实例化该合约的一个实例，并执行以下操作：

- 将代币兑换为以太币
- 将以太币兑换为代币

我们将通过添加简单的 ERC-20 代码库来开始编写去中心化交易所代码：

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

我们新的 DEX 智能合约将部署 ERC-20 并获取所有供应量：

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

现在我们有了 DEX，并且它拥有所有可用的代币储备。该合约有两个函数：

- `buy`：用户可以发送以太币并兑换获得代币
- `sell`：用户可以决定发送代币以换回以太币

## buy（购买）函数 {#the-buy-function}

让我们编写 buy 函数。我们首先需要检查消息中包含的以太币数量，并验证合约是否拥有足够的代币，以及消息中是否包含一些以太币。如果合约拥有足够的代币，它将向用户发送相应数量的代币并触发 `Bought` 事件。

请注意，如果在发生错误时调用 require 函数，发送的以太币将被直接回滚并退还给用户。

为了保持简单，我们只按 1 个代币兑换 1 Wei 的比例进行兑换。

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

在购买成功的情况下，我们应该在交易中看到两个事件：代币的 `Transfer` 事件和 `Bought` 事件。

![Two events in the transaction: Transfer and Bought](./transfer-and-bought-events.png)

## sell（出售）函数 {#the-sell-function}

负责出售的函数首先会要求用户事先调用 approve 函数来授权该金额。授权转账需要用户调用由 DEX 实例化的 ERC20Basic 代币。这可以通过首先调用 DEX 合约的 `token()` 函数来检索 DEX 部署名为 `token` 的 ERC20Basic 合约的地址来实现。然后，我们在会话中创建该合约的实例并调用其 `approve` 函数。接着，我们就可以调用 DEX 的 `sell` 函数并将我们的代币兑换回以太币。例如，在交互式 Brownie 会话中，它的过程如下所示：

```python
#### 交互式 Brownie 控制台中的 Python...

# 部署 DEX
dex = DEX.deploy({'from':account1})

# 调用 buy 函数将以太币兑换为代币
# 1e18 是以 Wei 为单位的 1 个以太币
dex.buy({'from': account2, 1e18})

# 获取 ERC-20 代币的部署地址
# 它是在 DEX 合约创建期间部署的
# dex.token() 返回代币的部署地址
token = ERC20Basic.at(dex.token())

# 调用代币的授权函数
# 授权 dex 地址作为支出方
# 以及允许它花费你的多少代币
token.approve(dex.address, 3e18, {'from':account2})

```

然后，当调用 sell 函数时，我们将检查从调用者地址到合约地址的转账是否成功，然后将以太币发送回调用者地址。

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

如果一切正常，你应该会在交易中看到 2 个事件（一个 `Transfer` 和一个 `Sold`），并且你的代币余额和以太币余额也会更新。

![Two events in the transaction: Transfer and Sold](./transfer-and-sold-events.png)

<Divider />

通过本教程，我们了解了如何检查 ERC-20 代币的余额和授权额度，以及如何使用接口调用 ERC-20 智能合约的 `Transfer` 和 `TransferFrom`。

一旦你进行了一笔交易，我们有一个 JavaScript 教程来教你如何[等待并获取有关向你的合约发起的交易的详细信息](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)，以及一个[教程来解码由代币转账或任何其他事件生成的事件](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)（只要你有 ABI）。

以下是本教程的完整代码：

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