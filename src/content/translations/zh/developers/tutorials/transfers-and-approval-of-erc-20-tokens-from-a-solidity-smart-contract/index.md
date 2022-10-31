---
title: 通过Solidity智能合约转移和批准ERC-20通证
description: 如何使用智能合约与使用 Solidity 语言的代币进行交互
author: "jdourlens"
tags:
  - "智能合约"
  - "通证"
  - "solidity"
  - "入门指南"
  - "erc-20"
skill: intermediate
lang: zh
published: 2020-04-07
source: EthereumDev
sourceUrl: https://ethereumdev.io/transfers-and-approval-or-erc20-tokens-from-a-solidity-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

在之前的教程中，我们学习了[对以太坊区块链上基于 Solidity 的 ERC-20 通证的剖析](/developers/tutorials/understand-the-erc-20-token-smart-contract/)。 在本文中，我们将看到如何借助 Solidity 语言使用智能合约来与通证进行交互。

对于此智能合约，我们将创建一个真正虚拟的去中心化交易所，用户可以在这里使用我们新部署的[ERC-20 通证](/developers/docs/standards/tokens/erc-20/)进行以太坊交易。

对于此教程，我们将使用我们在上一个教程中编写的代码作为基础。 我们的 DEX 将在它的构造函数中实例化一个合约中的实例，并进行以下操作：

- 将通证换成 ETH
- 把 ETH 换成通证

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }
}


```

我们新的 DEX 智能合约将部署 ERC-20 并生成总量供应：

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

所以我们现在有了我们的 DEX，它所有的代币储备都已准备好。 合约有两个函数：

- `buy`：用户可以发送 ETH 并在交易所中获得通证
- `sell`：用户可以决定发送通证换回 ETH

## buy 函数 {#the-buy-function}

让我们编写 buy 函数的代码。 我们首先需要检查消息中包含的 ETH 数量，并验证合约中是否拥有足够的通证，以及消息中是否有一些 ETH。 如果合约拥有足够的通证，它将会向用户发送通证数量，并发出`Bought`事件。

请注意，如果我们在出错的情况下调用所需的函数，则发送的 ETH 将会直接还原并退回给用户。

为简单起见，我们只需将 1 个代币换成 1 个 Wei。

```solidity
function buy() payable public {
    uint256 amountTobuy = msg.value;
    uint256 dexBalance = token.balanceOf(address(this));
    require(amountTobuy > 0, "You need to send some ether");
    require(amountTobuy <= dexBalance, "Not enough tokens in the reserve");
    token.transfer(msg.sender, amountTobuy);
    emit Bought(amountTobuy);
}

Text
XPath: /pre[3]/code

```

在购买成功的情况下，我们应会在交易中看到两个事件：通证`Transfer`和`Bought`事件。

![交易中的两个事件：Transfer和Bought](./transfer-and-bought-events.png)

## sell 函数 {#the-sell-function}

负责卖出的函数将首先要求用户事先通过调用 approve 函数来批准金额。 要批准转账，用户需要调用由去中心化交易所 (DEX) 实例化的 ERC20Basic 代币。 为此，首先需要调用去中心化交易所 (DEX) 合约的 `token()` 函数来检索 DEX 部署名为 `token` 的 ERC20Basic 合约的地址。 然后，我们需要在会话中创建该合约的实例并调用它的 `approve` 函数。 接着，我们可以调用 DEX 的 `sell` 函数并将我们的代币换成以太币。 例如，该过程在交互式 Brownie 会话中显示如下：

```python
#### Python in interactive brownie console...

# 部署 DEX
dex = DEX.deploy({'from':account1})

# 调用buy函数将ETH换成代币
# 1e18 是 1 个以 wei 计价的ETH
dex.buy({'from': account2, 1e18})

# 获取 ERC20 代币的部署地址
# 在 DEX 合约创建期间部署的
# dex.token() 返回token的部署地址
token = ERC20Basic.at(dex.token())

# 调用token的approve函数
# 批准dex地址为spender
# 以及允许花费你的多少代币
token.approve(dex.address, 3e18, {'from':account2})

```

然后当调用 sell 函数时，我们会检查从调用者地址到合约地址的转账是否成功，然后将以太币发送回调用者地址。

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

如果一切正常，您应该在交易中看到两个事件（`Transfer` 和 `Sold`），并且代币余额和以太坊余额已更新。

![交易中的两个事件：Transfer 和 Sold](./transfer-and-sold-events.png)

<Divider />

在本教程中，我们了解到如何检查 ERC-20 代币的余额和余量，以及如何使用接口调用 ERC20 智能合约的 `Transfer` 和 `TransferFrom` 函数。

完成交易后，我们即会提供一个 JavaScript 教程[来等待并获取在您的合约中进行的交易的详细信息](https://ethereumdev.io/waiting-for-a-transaction-to-be-mined-on-ethereum-with-js/)，还会提供[教程来解码由代币转账或任何其他事件生成的事件](https://ethereumdev.io/how-to-decode-event-logs-in-javascript-using-abi-decoder/)，但前提是您有应用程序二进制接口。

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
        allowed[owner][msg.sender] = allowed[owner][msg.sender]+numTokens;
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
