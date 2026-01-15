---
title: 了解 ERC-20 代币智能合约
description: 通过完整的 Solidity 智能合约示例和说明，了解如何实现 ERC-20 代币标准。
author: "jdourlens"
tags: [ "智能合同", "通证", "Solidity", "erc-20" ]
skill: beginner
lang: zh
published: 2020-04-05
source: EthereumDev
sourceUrl: https://ethereumdev.io/understand-the-erc20-token-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

以太坊上最重要的[智能合约标准](/developers/docs/standards/)之一是 [ERC-20](/developers/docs/standards/tokens/erc-20/)，它已成为以太坊区块链上所有用于实现同质化代币的智能合约的技术标准。

ERC-20 定义了一套通用规则，所有同质化以太坊代币都应遵守。 因此，该代币标准使所有类型的开发者能够准确预测新代币在更大的以太坊系统中将如何运作。 这简化并减轻了开发者的任务，因为他们可以继续工作，并且知道只要代币遵循规则，就无需在每次发布新代币时重做每个新项目。

这里以接口的形式介绍了 ERC-20 必须实现的函数。 如果你不确定什么是接口，请查看我们关于 [Solidity 面向对象编程](https://ethereumdev.io/inheritance-in-solidity-contracts-are-classes/) 的文章。

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

下面逐行解释每个函数的用途。 在这之后，我们将展示一个 ERC-20 代币的简单实现。

## 读取函数 {#getters}

```solidity
function totalSupply() external view returns (uint256);
```

返回存在的代币数量。 此函数是一个取值器，不会修改合约的状态。 请记住，Solidity 中没有浮点数。 因此，大多数代币都采用 18 位小数，总供应量及其他结果会以整数形式返回，例如 1 个代币会表示为 1000000000000000000。 并非每个代币都有 18 位小数，在处理代币时需要特别注意这一点。

```solidity
function balanceOf(address account) external view returns (uint256);
```

返回某个地址 (`account`) 拥有的代币数量。 此函数是一个取值器，不会修改合约的状态。

```solidity
function allowance(address owner, address spender) external view returns (uint256);
```

ERC-20 标准允许一个地址向另一个地址授予额度，以便后者能够从前者提取代币。 此取值器返回 `spender` 将被允许代表 `owner` 花费的剩余代币数量。 此函数是一个取值器，不会修改合约的状态，默认应返回 0。

## 函数 {#functions}

```solidity
function transfer(address recipient, uint256 amount) external returns (bool);
```

将 `amount` 数量的代币从函数调用者地址（`msg.sender`）移动到接收者地址。 此函数会触发稍后定义的 `Transfer` 事件。 如果可以转账，则返回 true。

```solidity
function approve(address spender, uint256 amount) external returns (bool);
```

设置 `spender` 可从函数调用者（`msg.sender`）余额中转账的 `allowance`（授权额度）。 此函数会触发 `Approval` 事件。 该函数返回是否成功设置了授权额度。

```solidity
function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
```

使用授权额度机制将 `amount` 数量的代币从 `sender` 移动到 `recipient`。 然后从调用者的授权额度中扣除 `amount`。 此函数会触发 `Transfer` 事件。

## 事件 {#events}

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

当一定数量（`value`）的代币从 `from` 地址发送到 `to` 地址时，会触发此事件。

在铸造新代币时，转账通常从 `from` 0x00..0000 地址进行，而在销毁代币时，转账则转 `to` 0x00..0000 地址。

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value);
```

当 `owner` 批准 `spender` 使用一定数量（`value`）的代币时，会触发此事件。

## ERC-20 代币的基本实现 {#a-basic-implementation-of-erc-20-tokens}

以下是最简单的 ERC-20 代币基础代码：

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

ERC-20 代币标准的另一个优秀实现是 [OpenZeppelin ERC-20 实现](https://github.com/OpenZeppelin/openzeppelin-contracts/tree/master/contracts/token/ERC20)。
