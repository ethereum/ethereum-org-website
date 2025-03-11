---
title: ERC-777 代币标准
description: null
lang: zh
---

## 警告 {#warning}

\*\*由于 ERC-777 [容易受到各种类型的攻击](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)，正确实现相当困难。 建议使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代替。\*\*保留本页面作为历史档案。

## 简介? {#introduction}

ERC-777 是一种可替代代币标准，它对现有的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 标准进行了改进。

## 前提条件 {#prerequisites}

为了更好理解本页面，建议你首先了解 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-777 对 ERC-20 提出了哪些改进？ {#-erc-777-vs-erc-20}

与 ERC-20 相比，ERC-777 提供了以下改进。

### 钩子 {#hooks}

钩子是智能合约代码中描述的一种函数。 在通过合约发送或者接收代币时会调用钩子。 这允许智能合约对接收和发送的代币做出响应。

钩子是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 标准进行注册和发现的。

#### 为什么钩子很棒？ {#why-are-hooks-great}

1. 钩子允许在单笔交易中向合约发送代币并通知合约，而 [ERC-20](https://eips.ethereum.org/EIPS/eip-20) 则需要进行双重调用 (`approve`/`transferFrom`) 来完成同样的操作。
2. 未注册钩子的合约与 ERC-777 不相容。 接收合约未注册钩子时，发送合约会中止交易。 这可以防止意外向非 ERC-777 智能合约转账。
3. 钩子可以拒绝交易。

### 小数 {#decimals}

该标准还解决了 ERC-20 中有关 `decimals` 的混淆。 这项澄清提升了开发者体验。

### 向后兼容 ERC-20 {#backwards-compatibility-with-erc-20}

可以和 ERC-777 合约互动，就好像它们是 ERC-20 合约一样。

## 扩展阅读 {#further-reading}

[EIP-777：代币标准](https://eips.ethereum.org/EIPS/eip-777)
