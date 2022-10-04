---
title: ERC-777 代币标准
description:
lang: zh
---

## 介绍? {#introduction}

ERC-777 是一个易于交易的通证标准，可改进现有的 [ERC-20](/developers/docs/standards/tokens/erc-20/) 标准。

## 前体条件 {#prerequisites}

为了更好地理解本文，我们建议你首先阅读以下内容 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-777 对 ERC-20 提出了哪些改进？ {#-erc-777-vs-erc-20}

与 ERC-20 相比，ERC-777 提供了以下改进。

### 钩子 {#hooks}

钩子是智能合约代码中描述的一个函数。 钩子将会在代币通过合约发送或者接收时调用。 这将允许智能合约对进出的通证做出互动。

钩子是使用 [ERC-1820](https://eips.ethereum.org/EIPS/eip-1820) 标准注册及发现利用的。

#### 为什么钩子很棒？ {#why-are-hooks-great}

1. 钩子允许向合同发送代币并在单笔交易中通知合约，不像 [ERC-20](https://eips.ethereum.org/EIPS/eip-20)， 需要双重呼叫(`同意`/`转账自`) 才能实现这一点。
2. 未登记钩子的合约与 ERC-777 不相容。 接收合约没有注册钩子时，发送合约会中止交易。 这可以防止意外向非 ERC-777 智能合约转账。
3. 钩子可以拒绝交易。

### 小数位数 {#decimals}

该标准还解决了在 ERC-20 中造成的`decimals`的混乱。 这种清晰度提升了开发者体验。

### 后向兼容 ERC-20 {#backwards-compatibility-with-erc-20}

EC-777 合同可以与类似于 ERC-20 合同的合同进行互动。

## 进一步阅读 {#further-reading}

[ERC-777 代币标准](https://eips.ethereum.org/EIPS/eip-777)
