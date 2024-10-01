---
title: "如何缩减合约以规避合约大小限制"
description: 您可以做些什么避免智能合约变得太大？
author: Markus Waas
lang: zh
tags:
  - "solidity"
  - "智能合约"
  - "存储"
skill: intermediate
published: 2020-06-26
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/max-contract-size
---

## 为什么会有限制？ {#why-is-there-a-limit}

在 [2016 年 11 月 22 日](https://blog.ethereum.org/2016/11/18/hard-fork-no-4-spurious-dragon/)，伪龙硬分叉引入了 [EIP-170](https://eips.ethereum.org/EIPS/eip-170)，将智能合约的大小限制在 24.576 kb。 对于作为 Solidity 开发者的您来说，这意味着当您向合约中添加越来越多的功能时，在某个时候您会达到极限，并且在部署时会看到错误：

`警告：合约代码大小超过 24576 字节（Spurious Dragon 分叉中引入的限制）。 该合约可能无法在主网上部署。 请考虑启用优化器（其“运行”值较低！），关闭 revert 字符串，或使用库。`

引入这一限制是为了防止拒绝服务 (DOS) 攻击。 任何对合约的调用从矿工费上来说都是相对便宜的。 然而，根据被调用合约代码的大小（从磁盘读取代码、预处理代码、将数据添加到 Merkle 证明），合约调用对以太坊节点的影响会不成比例地增加。 每当您出现这样的情况，攻击者只需要很少的资源就能给别人造成大量的工作，您就有可能遭受 DOS 攻击。

最初，这不是什么大问题，因为一个自然合约大小限制是区块燃料限制。 显然，合约必须和其所有字节码一起部署在交易内。 如果只将单个交易添加到区块中，可能会用完所有燃料，而燃料并非无限。 [伦敦升级](/history/#london)后，区块燃料限制已能够根据网络需求在 15M 和 30M 单位之间变动。

在下文中，我们将根据其潜在的影响顺序来研究一些方法。 从减肥的角度来谈一谈。 对于一个人来说，要达到他们的目标体重（在我们的例子中是 24 kb），最好的策略是首先关注影响较大的方法。 在大多数情况下，只要调整您的饮食就能达到目标，但有时您需要做得更多一些。 然后您可以增加一些锻炼（中等影响）或甚至补充剂（小影响）。

## 较大影响 {#big-impact}

### 把合约分开 {#separate-your-contracts}

这应始终是您的第一个方法。 如何将合约分成多个较小的合约？ 一般来说，它会迫使您为您的合约想出一个好的架构。 从代码可读性的角度来看，较小的合约总是首选。 对于拆分合同，请问您自己：

- 哪些函数属于同一类？ 每一组函数最好能在自己的合约中。
- 哪些函数不需要读取合约状态或仅需要读取状态的特定子集？
- 您能把存储和功能分开吗？

### 使用库 {#libraries}

将功能代码移出存储空间的一个简单方法是使用[库](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#libraries)。 不要将库函数声明为内部函数，因为这些函数将在编译过程中直接被[添加到合约中](https://ethereum.stackexchange.com/questions/12975/are-internal-functions-in-libraries-not-covered-by-linking)。 但是，如果您使用公共函数，那么这些函数事实上将在一个单独的库合约中。 可以考虑使用命令 [using for](https://solidity.readthedocs.io/en/v0.6.10/contracts.html#using-for)，使库的使用更加方便。

### 使用代理 {#proxies}

一个更先进的策略是代理系统。 库在后台使用 `DELEGATECALL`，它只是用调用合约的状态执行另一个合约的函数。 查看[这篇博客文章](https://hackernoon.com/how-to-make-smart-contracts-upgradable-2612e771d5a2)来了解更多关于代理系统的信息。 它们可以为您提供了更多的功能，例如它们能够升级，但它们也增加了很多复杂性。 我不会仅仅为了减少合约的大小而增加这些东西，除非由于某种原因这是唯一的选择。

## 中等影响 {#medium-impact}

### 移除函数 {#remove-functions}

这一点应该是显而易见的， 即函数在一定程度上会增加合约的大小。

- **外部函数**：为了方便起见，我们常常添加大量视图函数。 这完全没有问题，直到您遇到大小限制。 然后，您可能需要真正考虑，移除绝对必要以外的所有内容。
- **内部函数**：您也可以移除内部/ 私有函数，只要函数只被调用一次，就可以简单地内联代码。

### 避免额外的变量 {#avoid-additional-variables}

像这样一个简单的更改：

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

大小差异为** 0.28kb**。 您有可能在合约中找到许多类似的情况，这些情况加起来可以达到很大的数额。

### 缩短错误信息 {#shorten-error-message}

长的恢复信息，尤其是许多不同的回滚消息可能会使合约变得臃肿。 相反，使用简短的错误代码，并在合约中对其进行解码。 一条长信息可以变得很短：

```solidity
require(msg.sender == owner, "Only the owner of this contract can call this function");

```

```solidity
require(msg.sender == owner, "OW1");
```

### 在优化器中考虑一个低运行值 {#consider-a-low-run-value-in-the-optimizer}

您也可以更改优化器设置。 默认值为 200，表示它试图在一个函数被调用 200 次的情况下优化字节码。 如果您将其改为 1，相当于告诉优化器针对每个函数只运行一次的情况进行优化。 一个仅运行一次的优化函数意味着它对部署本身进行了优化。 请注意，**这将会增加运行函数的 [gas 成本](/developers/docs/gas/)**，所以，您可能不想这样做。

## 轻微的影响 {#small-impact}

### 避免将结构体传递给函数 {#avoid-passing-structs-to-functions}

如果您正在使用 [ABIEncoderV2](https://solidity.readthedocs.io/en/v0.6.10/layout-of-source-files.html#abiencoderv2)，它可以帮助您不将结构体传递给函数。 不会将参数作为结构体传递...

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

... 而是直接传递所需参数。 在此示例中，我们又节省了 **0.1kb**。

### 声明函数和变量的正确可见性 {#declare-correct-visibility-for-functions-and-variables}

- 函数或变量仅从外部调用？ 那么，将他们声明为 `external` 而不是 `public`。
- 函数或变量仅从合约内调用？ 那么，将它们声明为 `private` 或 `internal` 而不是 `public`。

### 移除修改器 {#remove-modifiers}

修改器，尤其是在密集使用的情况下，可能会对合约大小产生重大影响。 可以考虑移除它们，而改用函数。

```solidity
modifier checkStuff() {}

function doSomething() checkStuff {}
```

```solidity
function checkStuff() private {}

function doSomething() { checkStuff(); }
```

这些提示应有助您大幅度减少合约的大小。 我要再次强调的是，如果可能的话，务必将重点放在拆分合约上，以获得最大的效果。
