---
title: 智能合约语言
description: 两种主要的智能合约语言（Solidity 和 Vyper）的概述和比较。
lang: zh
---

关于以太坊的一个重要方面是，智能合约可以使用相对友好的开发者语言编程。 如果你有 Python 或任何[花括号语言](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)的经验，你可以找到一种语法熟悉的语言。

最受欢迎和维护得最好的两种语言是：

- Solidity
- Vyper

Remix 集成开发环境提供了一个全面的开发环境，用于创建和测试用 Solidity 和 Vyper 语言编写的智能合约。 [试用浏览器内置的 Remix IDE](https://remix.ethereum.org) 开始编码。

经验更丰富的开发者可能还想使用 Yul（一种用于[以太坊虚拟机](/developers/docs/evm/)的中间语言）或 Yul+（Yul 的扩展）。

如果你很好奇，喜欢帮助测试仍在大力发展的新语言，则可以尝试使用 Fe，这是一种新兴的智能合约语言，目前仍处于起步阶段。

## 前提条件 {#prerequisites}

如果已经有编程语言（特别是关于 JavaScript 或 Python）知识，可以帮助你体验到智能合约语言的差异。 同时，我们建议你在深入理解语言差异之前，先理解作为概念的智能合约。 [智能合约简介](/developers/docs/smart-contracts/)。

## Solidity {#solidity}

- 执行智能合约的目标导向高级语言。
- 受 C++ 影响最深的大括号编程语言。
- 静态类型（编译时已知变量类型）。
- 支持：
  - 继承（你可以拓展其它合约）。
  - 库（你可以创建从不同的合约调用的可重用代码 - 就像静态函数在其它面向对象编程语言的静态类中一样）。
  - 复杂的用户自定义类型。

### 重要链接 {#important-links}

- [文档](https://docs.soliditylang.org/en/latest/)
- [Solidity 语言门户](https://soliditylang.org/)
- [Solidity 示例](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter 聊天室](https://gitter.im/ethereum/solidity)桥接至 [Solidity Matrix 聊天室](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [速查表](https://reference.auditless.com/cheatsheet)
- [Solidity 博客](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### 示例合约 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 关键字“public”使变量
    // 可从其他合约访问
    address public minter;
    mapping (address => uint) public balances;

    // 事件允许客户端对你声明的特定
    // 合约更改做出反应
    event Sent(address from, address to, uint amount);

    // 构造函数代码仅在创建
    // 合约时运行
    constructor() {
        minter = msg.sender;
    }

    // 将一定数量的新创建的代币发送到一个地址
    // 只能由合约创建者调用
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // 从任何调用者向一个地址
    // 发送一定数量的现有代币
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "余额不足。");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

这个示例应该能让你感觉到 Solidity 合约语法是什么样子的。 有关函数和变量的更详细说明，[请参阅文档](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- 类 Python 编程语言
- 强类型
- 小而且易懂的编译器代码
- 高效的字节码生成
- 为了让合约更安全和易于审核，特意提供比 Solidity 少的功能。 Vyper 不支持：
  - 修改器
  - 继承
  - 内联汇编
  - 函数重载
  - 操作符重载
  - 递归调用
  - 无限长度循环
  - 二进制定长浮点

更多信息，请[阅读 Vyper 的设计原理](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要链接 {#important-links-1}

- [文档](https://vyper.readthedocs.io)
- [Vyper 示例](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [更多 Vyper 示例](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 社区 Discord 聊天](https://discord.gg/SdvKC79cJk)
- [速查表](https://reference.auditless.com/cheatsheet)
- [适用于 Vyper 的智能合约开发框架和工具](/developers/docs/programming-languages/python/)
- [VyperPunk - 学习如何保护和破解 Vyper 智能合约](https://github.com/SupremacyTeam/VyperPunk)
- [用于开发的 Vyper Hub](https://github.com/zcor/vyper-dev)
- [Vyper 智能合约最佳示例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper 精选资源](https://github.com/spadebuilders/awesome-vyper)

### 示例 {#example}

```python
# 公开拍卖

# 拍卖参数
# 受益人从最高出价者处收款
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 拍卖的当前状态
highestBidder: public(address)
highestBid: public(uint256)

# 结束时设置为 true，不允许任何更改
ended: public(bool)

# 跟踪已退还的出价，以便遵循取款模式
pendingReturns: public(HashMap[address, uint256])

# 创建一个简单拍卖，代表受益人地址 `_beneficiary`，
# 拍卖时间为 `_bidding_time` 秒。
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 使用与此交易一起发送的价值对拍卖进行出价。
# 只有未赢得拍卖，
# 价值才会被退还。
@external
@payable
def bid():
    # 检查出价期是否结束。
    assert block.timestamp < self.auctionEnd
    # 检查出价是否足够高
    assert msg.value > self.highestBid
    # 跟踪先前最高出价者的退款
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 跟踪新的最高出价
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 取回先前已退还的出价。此处使用取款模式
# 以避免安全问题。如果退款直接
# 作为 bid() 的一部分发送，恶意出价合约可能会阻止
# 这些退款，从而阻止新的更高出价进入。
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# 结束拍卖并将最高出价
# 发送给受益人。
@external
def endAuction():
    # 一个好的指导原则是将与其他合约交互的函数（即调用函数或发送以太币）
    # 结构化为三个阶段：
    # 1. 检查条件
    # 2. 执行操作（可能会改变条件）
    # 3. 与其他合约交互
    # 如果这些阶段混合在一起，另一个合约可能会回调
    # 到当前合约并修改状态或导致
    # 效果（以太币支付）被多次执行。
    # 如果内部调用的函数包含与外部合约的交互，
    # 它们也必须被视为与
    # 外部合约的交互。

    # 1. 条件
    # 检查是否已达到拍卖结束时间
    assert block.timestamp >= self.auctionEnd
    # 检查此函数是否已被调用
    assert not self.ended

    # 2. 效果
    self.ended = True

    # 3. 交互
    send(self.beneficiary, self.highestBid)
```

这个例子应该让你了解 Vyper 合约语法是什么样的。 有关函数和变量的更详细说明，[请参阅文档](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## Yul 和 Yul+ {#yul}

如果你是以太坊的新手并且尚未使用智能合约语言进行任何编码，我们建议你开始使用 Solidity 或 Vyper。 只有在你熟知智能合约安全最佳做法和使用 EVM 的具体细节后，才可以查看 Yul 或 Yul+。

**Yul**

- 以太坊的中继语言。
- 支持 [EVM](/developers/docs/evm) 和 [Ewasm](https://github.com/ewasm)（一种以太坊风格的 WebAssembly），旨在成为这两个平台的通用分母。
- 是高级优化阶段的理想目标，可使 EVM 和 Ewasm 平台同等受益。

**Yul+**

- Yul 的低级、高效扩展。
- 最初为[乐观卷叠](/developers/docs/scaling/optimistic-rollups/)合约而设计。
- Yul+ 可以被视为对 Yul 的实验性升级建议，为其添加新功能。

### 重要链接 {#important-links-2}

- [Yul 文档](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 文档](https://github.com/fuellabs/yulp)
- [Yul+ 介绍文章](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 示例合约 {#example-contract-2}

以下简单示例实现了幂函数。 可以使用 `solc --strict-assembly --bin input.yul` 对其进行编译。 这个例子应该
存储在 input.yul 文件中。

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

如果你对智能合约已非常有经验，可以在[此处](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)找到用 Yul 实现的完整 ERC20。

## Fe {#fe}

- 以太坊虚拟机 (EVM) 静态类型语言。
- 受到 Python 和 Rust 的启发。
- 目标是容易学习 - 甚至对以太坊生态系统为新的开发者来说也是如此。
- Fe 开发仍处于早期阶段，该语言于 2021 年 1 月发行。

### 重要链接 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 公告](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 路线图](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord 聊天](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### 示例合约 {#example-contract-3}

以下是在 Fe 中执行的简单的智能合约。

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()
```

## 如何选择 {#how-to-choose}

与任何其他编程语言一样，它主要是关于为合适的工作以及个人喜好选择合适的工具。

如果你还没有尝试过任何一种语言，请考虑以下几点：

### Solidity 的优点是什么？ {#solidity-advantages}

- 如果你是初学者，这里有很多教程和学习工具。 在[“通过编码学习”](/developers/learning-tools/)部分查看更多相关信息。
- 提供出色的开发者工具。
- Solidity 拥有庞大的开发人员社区，这意味着你很可能会很快找到问题的答案。

### Vyper 的优点是什么？ {#vyper-advatages}

- 想要编写智能合约的 Python 开发人员入门的好方法。
- Vyper 的功能较少，因此非常适合快速制作创意原型。
- Vyper 旨在易于审计并最大限度地提高人类可读性。

### Yul 和 Yul+ 的优点是什么？ {#yul-advantages}

- 简单而实用的低级语言。
- 允许更接近原始 EVM，这有助于优化合约的燃料使用量。

## 语言比较 {#language-comparisons}

要比较基本语法、合约生命周期、接口、运算符、数据结构、函数、控制流等，请查看 [Auditless 制作的这份速查表](https://reference.auditless.com/cheatsheet/)

## 扩展阅读{#further-reading}

- [OpenZeppelin 的 Solidity 合约库](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity 示例](https://solidity-by-example.org)
