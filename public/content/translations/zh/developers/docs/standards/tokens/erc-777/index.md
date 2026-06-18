---
title: "ERC-777 代币标准"
description: "了解 ERC-777，这是一种带有钩子（hook）的改进型同质化代币标准，但出于安全考虑，建议使用 ERC-20。"
lang: zh
---

## 警告 {#warning}

**由于[容易受到不同形式的攻击](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)，ERC-777 很难正确实现。建议改用 [ERC-20](/developers/docs/standards/tokens/erc-20/)。** 本页面仅作为历史存档保留。

## 简介？ {#introduction}

ERC-777 是一种同质化代币标准，它改进了现有的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 标准。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议你先阅读有关 [ERC-20](/developers/docs/standards/tokens/erc-20/) 的内容。

## ERC-777 对 ERC-20 提出了哪些改进？ {#-erc-777-vs-erc-20}

ERC-777 对 ERC-20 提供了以下改进。

### 钩子（Hook） {#hooks}

钩子（Hook）是智能合约代码中描述的一种函数。当通过合约发送或接收代币时，钩子会被调用。这使得智能合约能够对转入或转出的代币做出反应。

钩子使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 标准进行注册和发现。

#### 为什么钩子很好用？ {#why-are-hooks-great}

1. 钩子允许在单笔交易中向合约发送代币并通知该合约，而不像 [ERC-20](https://eips.ethereum.org/EIPS/eip-20) 那样需要双重调用（`approve`/`transferFrom`）才能实现这一点。
2. 未注册钩子的合约与 ERC-777 不兼容。当接收合约未注册钩子时，发送合约将中止交易。这可以防止意外将代币转移到非 ERC-777 智能合约中。
3. 钩子可以拒绝交易。

### 小数位数（Decimals） {#decimals}

该标准还解决了 ERC-20 中由 `decimals` 引起的混乱。这种清晰度改善了开发者的体验。

### 向后兼容 ERC-20 {#backwards-compatibility-with-erc-20}

可以像与 ERC-20 合约交互一样与 ERC-777 合约进行交互。

## 延伸阅读 {#further-reading}

[EIP-777：代币标准](https://eips.ethereum.org/EIPS/eip-777)