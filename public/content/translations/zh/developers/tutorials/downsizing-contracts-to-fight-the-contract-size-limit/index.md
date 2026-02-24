---
title: "如何缩减合约以规避合约大小限制"
description: "你可以做些什么避免智能合约变得太大？"
author: Markus Waas
lang: zh
tags: [ "Solidity", "智能合同", "存储" ]
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 为什么会有限制？ {#why-is-there-a-limit}

在 [2016 年 11 月 22 日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)，Spurious Dragon 硬分叉引入了 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)，增加了 24.576 kb 的智能合约大小限制。 对于 Solidity 开发者来说，这意味着当你向合约中添加越来越多的功能时，在某个时候你会达到限制，并且在部署时会看到错误：

`警告：合约代码大小超过 24576 字节（Spurious Dragon 分叉中引入的限制）。 该合约可能无法在主网上部署。 请考虑启用优化器（“运行”值较低！）、关闭 revert 字符串或使用程序库。`

引入这一限制是为了防止拒绝服务 (DOS) 攻击。 就燃料而言，对合约的任何调用都相对便宜。 然而，根据被调用合约代码的大小（从磁盘读取代码、预处理代码、将数据添加到 Merkle 证明），合约调用对以太坊节点的影响会不成比例地增加。 每当你出现这样的情况，攻击者只需要很少的资源就能给别人造成大量的工作，你就有可能遭受 DOS 攻击。

最初，这不是什么大问题，因为一个天然的合约大小限制就是区块燃料限制。 显然，合约必须和其所有字节码一起部署在交易内。 如果只将单个交易添加到区块中，可能会用完所有燃料，而燃料并非无限。 自从[伦敦升级](/ethereum-forks/#london)后，区块燃料限制便可根据网络需求在 15M 和 30M 单位之间变化。

在下文中，我们将根据其潜在的影响顺序来研究一些方法。 从减肥的角度来谈一谈。 对于一个人来说，要达到他们的目标体重（在我们的例子中是 24 kb），最好的策略是首先关注影响较大的方法。 在大多数情况下，只要调整你的饮食就能达到目标，但有时你需要做得更多一些。 然后你可以增加一些锻炼（中等影响）或甚至补充剂（小影响）。

## 重大影响 {#big-impact}

### 拆分合约 {#separate-your-contracts}

这应始终是你的首选方法。 如何将合约分成多个较小的合约？ 一般来说，它会迫使你为你的合约想出一个好的架构。 从代码可读性的角度来看，较小的合约总是首选。 对于拆分合约，问问你自己：

- 哪些函数属于同一类？ 每一组函数最好能在自己的合约中。
- 哪些函数不需要读取合约状态或仅需要读取状态的特定子集？
- 你能把存储和功能分开吗？

### 程序库 {#libraries}

将功能代码与存储分离的一个简单方法是使用[程序库](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)。 不要将程序库函数声明为 internal，因为它们会在编译期间直接[添加到合约中](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)。 但是，如果你使用 public 函数，那么这些函数实际上会位于一个单独的程序库合约中。 考虑[使用 using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for) 使程序库的使用更加方便。

### 代理 {#proxies}

一个更先进的策略是代理系统。 程序库在后台使用 `DELEGATECALL`，它只是用调用合约的状态来执行另一个合约的函数。 查看[这篇博文](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)以了解更多关于代理系统的信息。 它们提供了更多功能（例如，支持可升级性），但同时也增加了很多复杂性。 我不会仅仅为了减少合约大小而添加这些，除非出于某种原因这是你唯一的选择。

## 中等影响 {#medium-impact}

### 移除函数 {#remove-functions}

这一点应该很明显。 函数会显著增加合约的大小。

- **外部**：我们常常为了方便而添加许多视图函数。 这完全没问题，直到你达到大小限制。 这时，你可能就要认真考虑，只保留绝对必要的函数。
- **Internal**：只要函数只被调用一次，你也可以移除 internal/private 函数，并直接内联代码。

### 避免使用额外的变量 {#avoid-additional-variables}

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

这样一个简单的改动就能产生 **0.28kb** 的差异。 你有可能在合约中找到许多类似的情况，这些情况加起来可以达到很大的数额。

### 缩短错误信息 {#shorten-error-message}

过长的 revert 信息，特别是许多不同的 revert 信息，可能会使合约变得臃肿。 可以改用简短的错误代码，然后在你的客户端解码它们。 一条长信息可以变得短很多：

```solidity
require(msg.sender == owner, "只有本合约的所有者才能调用此函数");
```

```solidity
require(msg.sender == owner, "OW1");
```

### 使用自定义错误代替错误信息

[Solidity 0.8.4](https://blog.soliditylang.org/2021/04/21/custom-errors/) 引入了自定义错误。 它们是减小合约大小的极佳方法，因为它们和函数一样，被 ABI 编码为选择器。

```solidity
error Unauthorized();

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### 考虑在优化器中使用较低的运行值 {#consider-a-low-run-value-in-the-optimizer}

你也可以更改优化器设置。 默认值为 200，表示它试图在一个函数被调用 200 次的情况下优化字节码。 如果将其更改为 1，基本上就是告诉优化器针对每个函数只运行一次的情况进行优化。 一个仅运行一次的优化函数意味着它对部署本身进行了优化。 请注意，**这会增加运行函数的[燃料成本](/developers/docs/gas/)**，所以你可能不希望这样做。

## 较小影响 {#small-impact}

### 避免将结构体传递给函数 {#avoid-passing-structs-to-functions}

如果你正在使用 [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)，不将结构体传递给函数会有所帮助。 不要将参数作为结构体传递，而是直接传递所需的参数。 在这个例子中，我们又节省了 **0.1kb**。

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

- 函数或变量只从外部调用？ 将它们声明为 `external` 而不是 `public`。
- 函数或变量只从合约内部调用？ 将它们声明为 `private` 或 `internal` 而不是 `public`。

### 移除修饰符 {#remove-modifiers}

修饰符，尤其是在密集使用的情况下，可能会对合约大小产生重大影响。 可以考虑移除它们，改用函数。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

这些技巧应该能帮助你显著减小合约的大小。 我要再次强调的是，如果可能的话，务必将重点放在拆分合约上，以获得最大的效果。
