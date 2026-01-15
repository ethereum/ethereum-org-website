---
title: 通过 Solidity 智能合约转移和批准 ERC-20 代币
description: 使用 Solidity 构建一个处理 ERC-20 代币转账和批准的 DEX 智能合约。
author: "jdourlens"
tags: [ "智能合同", "通证", "Solidity", "erc-20" ]
skill: intermediate
lang: zh
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在之前的教程中，我们研究了以太坊区块链上[用 Solidity 编写的 ERC-20 代币的结构](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。 在本文中，我们将了解如何使用 Solidity 语言通过智能合约与代币进行交互。

对于此智能合约，我们将创建一个示例去中心化交易所，用户可以用以太币交易我们新部署的 [ERC-20 代币](/developers/docs/standards/tokens/erc-20/)。

在本教程中，我们将使用在上一篇教程中编写的代码作为基础。 我们的 DEX 将在其构造函数中实例化一个合约实例，并执行以下操作：

- 将代币兑换成 ETH
- 将 ETH 兑换成代币

我们将通过添加简单的 ERC20 代码库来开启去中心化交易所代码：

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

我们新的 DEX 智能合约将部署 ERC-20 并获得全部代币供应：

```solidity
contract DEX {

    IERC20 public token;

    event Bought(uint256 amount);
    event Sold(uint256 amount);

    constructor() {
        token = new ERC20Basic();
    }

    function buy() payable public {
        // 待办
    }

    function sell(uint256 amount) public {
        // 待办
    }

}
```

所以我们现在有了我们的 DEX，它所有的代币储备都已准备好。 合约有两个函数：

- `buy`：用户可以发送 ETH 以换取相应的代币
- `sell`：用户可以发送代币以换回 ETH

## buy 函数 {#the-buy-function}

让我们编写 buy 函数的代码。 我们首先需要检查消息中包含的 ETH 数量，并验证合约拥有足够的代币，以及消息中包含一些 ETH。 如果合约拥有足够的代币，它会向用户发送相应数量的代币，并触发 `Bought` 事件。

请注意，如果在出错的情况下调用 `require` 函数，发送的 ETH 将被直接还原并退还给用户。

为简单起见，我们只需将 1 个代币换成 1 个 Wei。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "你需要发送一些 ETH");
    require(amountTobuy <= dexBalance, "储备中的代币不足");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}
```

如果购买成功，我们应该能在交易中看到两个事件：代币 `Transfer` 事件和 `Bought` 事件。

![交易中的两个事件：Transfer 和 Bought](./transfer-and-bought-events.png)

## sell 函数 {#the-sell-function}

负责卖出的函数将首先要求用户事先调用 `approve` 函数来批准金额。 要批准转账，用户需要调用由去中心化交易所 (DEX) 实例化的 ERC20Basic 代币。 为此，首先需要调用去中心化交易所 (DEX) 合约的 `token()` 函数来检索 DEX 部署名为 `token` 的 ERC20Basic 合约的地址。 然后，我们在会话中创建该合约的实例，并调用其 `approve` 函数。 然后我们就可以调用 DEX 的 `sell` 函数，将我们的代币兑换回以太币。 例如，该过程在交互式 Brownie 会话中显示如下：

```python
#### Python in interactive brownie console...

# 部署 DEX
dex = DEX.deploy({'from':account1})

# 调用 buy 函数，用 ETH 兑换代币
# 1e18 是 1 个以 wei 为单位的 ETH
dex.buy({'from': account2, 1e18})

# 获取 ERC20 代币的部署地址
# 该代币在 DEX 合约创建时部署
# dex.token() 返回代币的部署地址
token = ERC20Basic.at(dex.token())

# 调用代币的 approve 函数
# 批准 DEX 地址为 spender
# 以及允许它花费的代币数量
token.approve(dex.address, 3e18, {'from':account2})

```

然后当调用 `sell` 函数时，我们会检查从调用者地址到合约地址的转账是否成功，然后将以太币发送回调用者地址。

```solidity
function sell(uint256 amount) public {
    require(amount > 0, "你至少需要卖出一些代币");
    uint256 allowance = token.allowance(msg.sender, address(this));
    require(allowance >= amount, "检查代币授权额度");
    token.transferFrom(msg.sender, address(this), amount);
    payable(msg.sender).transfer(amount);
    emit Sold(amount);
}
```

如果一切顺利，你应该能在交易中看到 2 个事件（一个 `Transfer` 事件和一个 `Sold` 事件），并且你的代币余额和 ETH 余额也会更新。

![交易中的两个事件：Transfer 和 Sold](./transfer-and-sold-events.png)

<Divider />

在本教程中，我们了解了如何检查 ERC-20 代币的余额和授权额度，以及如何使用接口调用 ERC20 智能合约的 `Transfer` 和 `TransferFrom` 函数。

完成交易后，我们有一个 JavaScript 教程，介绍如何 [等待并获取与你的合约进行的交易相关的详细信息](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)；只要你有 ABI，还可以参考另一个 [教程，学习解码由代币转账或任何其他事件生成的事件](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)。

下面是本教程的完整代码：

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
        require(amountTobuy > 0, "你需要发送一些 ETH");
        require(amountTobuy <= dexBalance, "储备中的代币不足");
        token.transfer(msg.sender, amountTobuy);
        emit Bought(amountTobuy);
    }

    function sell(uint256 amount) public {
        require(amount > 0, "你至少需要卖出一些代币");
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= amount, "检查代币授权额度");
        token.transferFrom(msg.sender, address(this), amount);
        payable(msg.sender).transfer(amount);
        emit Sold(amount);
    }

}
```
