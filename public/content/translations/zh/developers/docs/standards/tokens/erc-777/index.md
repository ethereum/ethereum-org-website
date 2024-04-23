---
title: ERC-777 代币标准
description:
lang: zh
---

## 警告 {#warning}

**由于[容易遭受不同形式的攻击](https://github.com/OpenZeppelin/openzeppelin-contracts/issues/2620)，ERC-777 很难正确实现。 建议使用 [ERC-20](/developers/docs/standards/tokens/erc-20/) 代替。**本页面做为历史档案保留。

## 简介? {#introduction}

ERC-777 是一个同质化代币标准，是对现有 [ERC-20](/developers/docs/standards/tokens/erc-20/) 标准的改进。

## 前言 {#prerequisites}

为了更好地理解本文，我们建议你首先阅读 [ERC-20](/developers/docs/standards/tokens/erc-20/) 相关内容。

## ERC-777 对 ERC-20 提出了哪些改进？ {#-erc-777-vs-erc-20}

与 ERC-20 相比，ERC-777 提供了以下改进。

### 钩子 {#hooks}

钩子是智能合约代码中描述的一种函数。 在通过合约发送或者接收代币时会调用钩子。 这允许智能合约对接收和发送的代币做出响应。

钩子是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 标准注册及发现的。

#### 为什么钩子很棒？ {#why-are-hooks-great}

1. 钩子允许向合同发送代币并在单笔交易中通知合约，不像 [ERC-20](https://eips.ethereum.org/EIPS/eip-20)，需要双重呼叫（`同意`/`转账自`）才能实现这一点。
2. 未登记钩子的合约与 ERC-777 不相容。 接收合约没有注册钩子时，发送合约会中止交易。 这可以防止意外向非 ERC-777 智能合约转账。
3. 钩子可以拒绝交易。

### 小数位数 {#decimals}

该标准还解决了 ERC-20 中和 `decimals` 有关的混乱。 这次澄清提升了开发者体验。

### 后向兼容ERC-20 {#backwards-compatibility-with-erc-20}

可以和 ERC-777 合约互动，就好像它们是 ERC-20 合约一样。

## 了解更多 {#further-reading}

[EIP-777：代币标准](https://eips.ethereum.org/EIPS/eip-777)
