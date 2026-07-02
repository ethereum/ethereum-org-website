---
title: "智能合约语言"
description: "两种主要智能合约语言（Solidity 和 Vyper）的概述与比较。"
lang: zh
---

[以太坊](/)的一大优势在于，可以使用对开发者相对友好的语言来编写智能合约。如果你有 Python 或任何[大括号语言](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)的经验，你可以找到语法熟悉的语言。

两种最活跃且维护良好的语言是：

- Solidity
- Vyper

Remix IDE 提供了一个全面的开发环境，用于创建和测试 Solidity 和 Vyper 合约。[尝试使用浏览器中的 Remix IDE](https://remix.ethereum.org) 开始编写代码。

更有经验的开发者可能还想使用 Yul（一种用于[以太坊虚拟机 (EVM)](/developers/docs/evm/)的中间语言）或 Yul+（Yul 的扩展）。

如果你很好奇，并且喜欢帮助测试仍在大量开发中的新语言，你可以尝试使用 Fe，这是一种新兴的智能合约语言，目前仍处于起步阶段。

## 前提条件 {#prerequisites}

具备编程语言（尤其是 JavaScript 或 Python）的基础知识，有助于你理解智能合约语言之间的差异。我们还建议你在深入了解语言比较之前，先理解智能合约的概念。[智能合约简介](/developers/docs/smart-contracts/)。

## Solidity {#solidity}

- 用于实现智能合约的面向对象的高级语言。
- 受 C++ 影响最深的大括号语言。
- 静态类型（变量的类型在编译时已知）。
- 支持：
  - 继承（你可以扩展其他合约）。
  - 库（你可以创建可重用的代码，并从不同的合约中调用——就像其他面向对象编程语言中静态类里的静态函数一样）。
  - 复杂的用户定义类型。

### 重要链接 {#important-links}

- [文档](https://docs.soliditylang.org/en/latest/)
- [Solidity 语言门户](https://soliditylang.org/)
- [Solidity 示例](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter 聊天室](https://gitter.im/ethereum/solidity)（已桥接至 [Solidity Matrix 聊天室](https://matrix.to/#/#ethereum_solidity:gitter.im)）
- [速查表](https://reference.auditless.com/cheatsheet)
- [Solidity 博客](https://blog.soliditylang.org/)
- [Solidity 推特](https://twitter.com/solidity_lang)

### 示例合约 {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // 关键字“public”使变量
    // 可以从其他合约访问
    address public minter;
    mapping (address => uint) public balances;

    // 事件允许客户端对特定的
    // 您声明的合约更改做出反应
    event Sent(address from, address to, uint amount);

    // 构造函数代码仅在合约
    // 创建时运行
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

    // 发送一定数量的现有代币
    // 从任何调用者到一个地址
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

这个示例应该能让你对 Solidity 合约的语法有所了解。有关函数和变量的更详细描述，[请参阅文档](https://docs.soliditylang.org/en/latest/contracts.html)。

## Vyper {#vyper}

- Python 风格的编程语言
- 强类型
- 编译器代码小巧易懂
- 高效的字节码生成
- 故意减少了比 Solidity 更多的功能，旨在使合约更安全、更容易审计。Vyper 不支持：
  - 修饰符
  - 继承
  - 内联汇编
  - 函数重载
  - 运算符重载
  - 递归调用
  - 无限长度循环
  - 二进制定点数

欲了解更多信息，[请阅读 Vyper 的设计原理](https://vyper.readthedocs.io/en/latest/index.html)。

### 重要链接 {#important-links-1}

- [文档](https://vyper.readthedocs.io)
- [Vyper 示例](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [更多 Vyper 示例](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper 社区 Discord 聊天室](https://discord.gg/SdvKC79cJk)
- [速查表](https://reference.auditless.com/cheatsheet)
- [Vyper 智能合约开发框架和工具](/developers/docs/programming-languages/python/)
- [VyperPunk - 学习保护和破解 Vyper 智能合约](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper 开发中心](https://github.com/zcor/vyper-dev)
- [Vyper 经典智能合约示例](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper 精选资源](https://github.com/spadebuilders/awesome-vyper)

### 示例 {#example}

```python
# 公开拍卖

# 拍卖参数
# 受益人从最高出价者处收到资金
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# 拍卖的当前状态
highestBidder: public(address)
highestBid: public(uint256)

# 在结束时设置为 true，不允许任何更改
ended: public(bool)

# 跟踪已退款的出价，以便我们可以遵循提款模式
pendingReturns: public(HashMap[address, uint256])

# 创建一个简单的拍卖，竞价时间为 `_bidding_time`
# 秒，代表
# 受益人地址 `_beneficiary`。
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# 使用与此交易一起发送的
# 价值对拍卖进行出价。
# 仅当未赢得拍卖时，
# 该价值才会被退还。
@external
@payable
def bid():
    # 检查竞价期是否结束。
    assert block.timestamp < self.auctionEnd
    # 检查出价是否足够高
    assert msg.value > self.highestBid
    # 跟踪前一个最高出价者的退款
    self.pendingReturns[self.highestBidder] += self.highestBid
    # 跟踪新的最高出价
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# 提取先前退还的出价。此处使用提款模式
# 是为了避免安全问题。如果退款作为 bid() 的一部分直接
# 发送，恶意的竞价合约可能会阻止
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
    # 将交互的函数结构化是一个很好的准则
    # （与其他合约交互，即调用函数或发送以太币）
    # 分为三个阶段：
    # 1. 检查条件
    # 2. 执行操作（可能会改变条件）
    # 3. 与其他合约交互
    # 如果这些阶段混合在一起，其他合约可能会回调
    # 到当前合约中并修改状态或导致
    # 多次执行效果（以太币支付）。
    # 如果内部调用的函数包含与外部
    # 合约的交互，它们也必须被视为与
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

这个示例应该能让你对 Vyper 合约的语法有所了解。有关函数和变量的更详细描述，[请参阅文档](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction)。

## Yul 和 Yul+ {#yul}

如果你是以太坊新手，并且还没有使用智能合约语言编写过任何代码，我们建议你从 Solidity 或 Vyper 开始。只有当你熟悉了智能合约安全最佳实践以及使用 EVM 的具体细节后，再去研究 Yul 或 Yul+。

**Yul**

- 以太坊的中间语言。
- 支持 [EVM](/developers/docs/evm) 和 [Ewasm](https://github.com/ewasm)（一种以太坊风格的 WebAssembly），旨在成为这两个平台可用的共同基础。
- 是高级优化阶段的良好目标，可以同等惠及 EVM 和 Ewasm 平台。

**Yul+**

- Yul 的一种低级、高效的扩展。
- 最初是为[乐观 Rollup](/developers/docs/scaling/optimistic-rollups/) 合约设计的。
- Yul+ 可以被视为 Yul 的实验性升级提案，为其添加了新功能。

### 重要链接 {#important-links-2}

- [Yul 文档](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ 文档](https://github.com/fuellabs/yulp)
- [Yul+ 介绍文章](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### 示例合约 {#example-contract-2}

以下简单示例实现了一个幂函数。可以使用 `solc --strict-assembly --bin input.yul` 进行编译。该示例应存储在 input.yul 文件中。

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

如果你已经对智能合约有丰富的经验，可以在[这里](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example)找到 Yul 中完整的 ERC-20 实现。

## Fe {#fe}

- 用于以太坊虚拟机 (EVM) 的静态类型语言。
- 受 Python 和 Rust 启发。
- 旨在易于学习——即使对于刚接触以太坊生态系统的开发者也是如此。
- Fe 的开发仍处于早期阶段，该语言于 2021 年 1 月发布了 Alpha 版本。

### 重要链接 {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe 发布公告](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 路线图](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord 聊天室](https://discord.com/invite/ywpkAXFjZH)
- [Fe 推特](https://twitter.com/official_fe)

### 示例合约 {#example-contract-3}

以下是用 Fe 实现的一个简单合约。

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

与任何其他编程语言一样，这主要取决于为合适的工作选择合适的工具，以及个人的偏好。

如果你还没有尝试过任何一种语言，这里有一些需要考虑的事情：

### Solidity 有什么优点？ {#solidity-advantages}

- 如果你是初学者，外面有很多教程和学习工具。在[通过编码学习](/developers/learning-tools/)部分查看更多相关信息。
- 拥有良好的开发者工具。
- Solidity 拥有庞大的开发者社区，这意味着你很可能很快就能找到问题的答案。

### Vyper 有什么优点？ {#vyper-advatages}

- 对于想要编写智能合约的 Python 开发者来说，这是一个很好的入门方式。
- Vyper 的功能较少，这使其非常适合快速进行想法的原型设计。
- Vyper 旨在易于审计并最大程度地提高人类可读性。

### Yul 和 Yul+ 有什么优点？ {#yul-advantages}

- 简单且实用的低级语言。
- 允许更接近原生 EVM，这有助于优化合约的 Gas 使用。

## 语言比较 {#language-comparisons}

有关基本语法、合约生命周期、接口、运算符、数据结构、函数、控制流等方面的比较，请查看这份 [Auditless 制作的速查表](https://reference.auditless.com/cheatsheet/)。

## 延伸阅读 {#further-reading}

- [欧本齐柏林 (OpenZeppelin) 的 Solidity 合约库](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity 示例](https://solidity-by-example.org)
