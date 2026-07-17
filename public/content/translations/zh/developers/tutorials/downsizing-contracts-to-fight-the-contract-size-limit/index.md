---
title: "精简合约以应对合约大小限制"
description: "如何防止智能合约变得过大？"
author: "马库斯·瓦斯"
lang: zh
tags:
  - "solidity"
  - "智能合约"
  - "存储"
skill: intermediate
breadcrumb: "精简合约"
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 为什么会有限制？ {#why-is-there-a-limit}

在 [2016 年 11 月 22 日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon)，Spurious Dragon 硬分叉引入了 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)，该提案增加了 24.576 kb 的智能合约大小限制。对于 Solidity 开发者来说，这意味着当你不断向合约添加功能时，在某个时刻你会达到这个限制，并在部署时看到以下错误：

`Warning: Contract code size exceeds 24576 bytes (a limit introduced in Spurious Dragon). This contract may not be deployable on Mainnet. Consider enabling the optimizer (with a low "runs" value!), turning off revert strings, or using libraries.`

引入此限制是为了防止拒绝服务 (DOS) 攻击。任何对合约的调用在 Gas 消耗上都相对便宜。然而，合约调用对以太坊节点的影响会根据被调用合约代码的大小（从磁盘读取代码、预处理代码、将数据添加到默克尔证明）不成比例地增加。每当出现攻击者只需少量资源就能给他人造成大量工作的情况时，就存在 DOS 攻击的潜在风险。

最初这并不是一个大问题，因为一个自然的合约大小限制是区块 gas 上限。显然，合约必须在包含该合约所有字节码的交易中部署。如果你在一个区块中只包含那一笔交易，你可以用光所有的 Gas，但它并不是无限的。自 [伦敦升级](/ethereum-forks/#london) 以来，区块 gas 上限能够根据网络需求在 1500 万到 3000 万单位之间变化。

在下文中，我们将按潜在影响的大小顺序介绍一些方法。你可以用减肥来打比方。一个人达到目标体重（在我们的例子中是 24kb）的最佳策略是首先关注影响最大的方法。在大多数情况下，仅仅调整饮食就能达到目的，但有时你需要做得更多。然后你可能会增加一些运动（中等影响），甚至服用补充剂（较小影响）。

## 较大影响 {#big-impact}

### 拆分合约 {#separate-your-contracts}

这应该始终是你的首选方法。如何将合约拆分成多个较小的合约？这通常会迫使你为合约设计一个良好的架构。从代码可读性的角度来看，较小的合约总是更受欢迎。在拆分合约时，请问自己：

- 哪些函数属于同一类？每组函数最好放在各自的合约中。
- 哪些函数不需要读取合约状态，或者只需要读取状态的特定子集？
- 你能将存储和功能拆分吗？

### 库 {#libraries}

将功能代码与存储分离的一个简单方法是使用 [库](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)。不要将库函数声明为 internal，因为这些函数在编译期间会直接 [添加到合约中](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)。但如果你使用 public 函数，那么它们实际上将位于一个单独的库合约中。考虑使用 [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) 来使库的使用更加方便。

### 代理 {#proxies}

一种更高级的策略是代理系统。库在底层使用 `DELEGATECALL`，它只是使用调用合约的状态来执行另一个合约的函数。查看 [这篇博客文章](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2) 以了解有关代理系统的更多信息。它们为你提供了更多功能，例如，它们支持可升级性，但它们也增加了许多复杂性。除非出于某种原因这是你唯一的选择，否则我不会仅仅为了减小合约大小而添加它们。

## 中等影响 {#medium-impact}

### 移除函数 {#remove-functions}

这一点应该很明显。函数会显著增加合约大小。

- **外部 (External)**：通常为了方便起见，我们会添加许多 view 函数。在你达到大小限制之前，这完全没有问题。但一旦达到限制，你可能需要认真考虑移除除了绝对必要的函数之外的所有函数。
- **内部 (Internal)**：只要函数只被调用一次，你也可以移除 internal/private 函数，并直接将代码内联。

### 避免额外的变量 {#avoid-additional-variables}

```solidity
function get(uint id) returns (address,address) {
    MyStruct memory myStruct = myStructs[id];
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns (address,address) {
    return (myStructs[id].addr1, myStructs[id].addr2);
}
```

像这样简单的更改就能产生 **0.28kb** 的差异。你很可能会在你的合约中发现许多类似的情况，这些情况累积起来可以达到相当可观的数量。

### 缩短错误消息 {#shorten-error-message}

较长的回退消息，特别是许多不同的回退消息，会使合约变得臃肿。相反，请使用简短的错误代码并在你的合约中对其进行解码。一条长消息可以变得短得多：

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 使用自定义错误代替错误消息 {#use-custom-errors-instead-of-error-messages}

自定义错误是在 [Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) 中引入的。它们是减小合约大小的绝佳方法，因为它们被 ABI 编码为选择器（就像函数一样）。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### 考虑在优化器中使用较低的运行值 {#consider-a-low-run-value-in-the-optimizer}

你也可以更改优化器设置。默认值 200 意味着它试图优化字节码，就好像一个函数被调用了 200 次一样。如果你将其更改为 1，你基本上是在告诉优化器针对每个函数只运行一次的情况进行优化。针对只运行一次进行优化的函数意味着它是针对部署本身进行优化的。请注意，**这会增加运行函数的 [Gas 成本](/developers/docs/gas/)**，因此你可能不想这样做。

## 较小影响 {#small-impact}

### 避免将结构体传递给函数 {#avoid-passing-structs-to-functions}

如果你使用的是 [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)，不将结构体传递给函数会有所帮助。不要将参数作为结构体传递，而是直接传递所需的参数。在这个例子中，我们又节省了 **0.1kb**。

```solidity
function get(uint id) returns (address,address) {
    return _get(myStruct);
}

function _get(MyStruct memory myStruct) private view returns(address,address) {
    return (myStruct.addr1, myStruct.addr2);
}
```

```solidity
function get(uint id) returns(address,address) {
    return _get(myStructs[id].addr1, myStructs[id].addr2);
}

function _get(address addr1, address addr2) private view returns(address,address) {
    return (addr1, addr2);
}
```

### 为函数和变量声明正确的可见性 {#declare-correct-visibility-for-functions-and-variables}

- 仅从外部调用的函数或变量？将它们声明为 `external` 而不是 `public`。
- 仅从合约内部调用的函数或变量？将它们声明为 `private` 或 `internal` 而不是 `public`。

### 移除修饰符 {#remove-modifiers}

修饰符，特别是在大量使用时，可能会对合约大小产生重大影响。考虑移除它们并改用函数。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

这些技巧应该能帮助你显著减小合约大小。我再次强调，如果可能的话，始终专注于拆分合约以获得最大的影响。