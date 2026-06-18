---
title: 了解 ERC-20 代币智能合约
description: 学习如何通过完整的 Solidity 智能合约示例和解释来实现 ERC-20 代币标准。
author: "jdourlens"
tags: ["智能合约", "代币", "solidity", "erc-20"]
skill: beginner
breadcrumb: ERC-20 代币基础
lang: zh
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

以太坊上最重要的[智能合约标准](/developers/docs/standards/)之一被称为 [ERC-20](/developers/docs/standards/tokens/erc-20/)，它已经成为以太坊区块链上所有用于实现同质化代币的智能合约的技术标准。

ERC-20 定义了一组所有以太坊同质化代币都应遵守的通用规则。因此，该代币标准使各类开发者能够准确预测新代币在更广泛的以太坊系统中的运作方式。这简化并减轻了开发者的任务，因为他们可以继续推进工作，并且知道只要代币遵循这些规则，就不必在每次发布新代币时重做每一个新项目。

下面以接口的形式展示了 ERC-20 必须实现的函数。如果你不确定什么是接口：请查看我们关于 [Solidity 中的面向对象编程 (OOP)](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) 的文章。

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

下面逐行解释每个函数的用途。在此之后，我们将展示一个简单的 ERC-20 代币实现。

## 获取器 {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

返回存在的代币数量。此函数是一个获取器，不会修改合约的状态。请记住，Solidity 中没有浮点数。因此，大多数代币采用 18 位小数，并会返回总供应量和其他结果，例如 1 个代币表示为 1000000000000000000。并非每个代币都有 18 位小数，这是在处理代币时需要特别注意的地方。

```solidity
function balanceOf(address account) external view returns (uint256);
```

返回某个地址 (`account`) 拥有的代币数量。此函数是一个获取器，不会修改合约的状态。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 标准允许一个地址向另一个地址提供授权额度，使其能够从中提取代币。此获取器返回 `spender` 被允许代表 `owner` 消费的剩余代币数量。此函数是一个获取器，不会修改合约的状态，并且默认应返回 0。

## 函数 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

将 `amount` 数量的代币从函数调用者地址 (`msg.sender`) 转账到接收者地址。此函数会触发稍后定义的 `Transfer` 事件。如果转账成功，则返回 true。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

设置允许 `spender` 从函数调用者 (`msg.sender`) 余额中转账的 `allowance` 数量。此函数会触发 Approval 事件。该函数返回授权额度是否成功设置。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

使用授权额度机制将 `amount` 数量的代币从 `sender` 转账到 `recipient`。然后从调用者的授权额度中扣除该数量。此函数会触发 `Transfer` 事件。

## 事件 {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

当代币数量 (value) 从 `from` 地址发送到 `to` 地址时，会触发此事件。

在铸造新代币的情况下，转账通常是 `from` 0x00..0000 地址，而在销毁代币的情况下，转账是 `to` 0x00..0000。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

当代币数量 (`value`) 被 `owner` 批准供 `spender` 使用时，会触发此事件。

## ERC-20 代币的基本实现 {#a-basic-implementation-of-erc-20-tokens}

以下是构建你的 ERC-20 代币的最简单代码基础：

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

ERC-20 代币标准的另一个优秀实现是 [欧本齐柏林 ERC-20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。