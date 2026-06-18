---
title: "EIP-1271：签署和验证智能合约签名"
description: 概述使用 EIP-1271 生成和验证智能合约签名。我们还将逐步介绍 Safe（原 Gnosis Safe）中使用的 EIP-1271 实现，为智能合约开发者提供一个可供参考的具体示例。
author: 内森·H·梁
lang: zh
tags: ["eip-1271", "智能合约", "验证", "签名"]
skill: intermediate
breadcrumb: EIP-1271 签名
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 标准允许智能合约验证签名。

在本教程中，我们将概述数字签名、EIP-1271 的背景，以及 [Safe](https://safe.global/)（原 Gnosis Safe）所使用的 EIP-1271 具体实现。总而言之，这可以作为在你自己的合约中实现 EIP-1271 的起点。

## 什么是签名？ {#what-is-a-signature}

在此语境下，签名（更准确地说是“数字签名”）是一条消息加上某种证明，证明该消息来自特定的人/发送者/地址。

例如，数字签名可能如下所示：

1. 消息：“我想用我的以太坊钱包登录这个网站。”
2. 签名者：我的地址是 `0x000…`
3. 证明：这里有一些证明，证明我（`0x000…`）确实创建了这整条消息（这通常是密码学证明）。

需要注意的是，数字签名既包含“消息”，也包含“签名”。

为什么？例如，如果你给我一份合同让我签字，然后我把签名页剪下来，只把签名还给你，而没有合同的其余部分，那么这份合同就是无效的。

同理，如果没有关联的消息，数字签名就没有任何意义！

## 为什么会有 EIP-1271？ {#why-does-eip-1271-exist}

为了创建用于基于以太坊的区块链的数字签名，你通常需要一个只有你自己知道的秘密私钥。这就是让你的签名属于你的原因（如果没有这个秘密密钥，其他人都无法创建相同的签名）。

你的以太坊账户（即你的外部拥有账户/EOA）关联着一个私钥，当网站或去中心化应用 (dapp) 要求你提供签名（例如“使用以太坊登录”）时，通常使用的就是这个私钥。

应用程序可以使用像 Ethers.js 这样的第三方库[验证你创建的签名](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)，而[无需知道你的私钥](https://en.wikipedia.org/wiki/Public-key_cryptography)，并确信_你_就是创建该签名的人。

> 事实上，由于 EOA 数字签名使用公钥密码学，它们可以在**链下**生成和验证！这就是免 Gas 的 DAO 投票的工作原理——无需在链上提交投票，而是可以使用密码学库在链下创建和验证数字签名。

虽然 EOA 账户拥有私钥，但智能合约账户没有任何形式的私钥或秘密密钥（因此“使用以太坊登录”等功能无法原生支持智能合约账户）。

EIP-1271 旨在解决的问题是：如果智能合约没有可以合并到签名中的“秘密”，我们如何判断智能合约签名是否有效？

## EIP-1271 是如何工作的？ {#how-does-eip-1271-work}

智能合约没有可用于签署消息的私钥。那么我们如何判断签名是否真实呢？

嗯，一个想法是我们可以直接_询问_智能合约某个签名是否真实！

EIP-1271 所做的就是将这种“询问”智能合约给定签名是否有效的想法标准化。

实现 EIP-1271 的合约必须有一个名为 `isValidSignature` 的函数，该函数接收一条消息和一个签名。然后，合约可以运行一些验证逻辑（规范在此没有强制要求任何具体内容），并返回一个值来指示签名是否有效。

如果 `isValidSignature` 返回有效结果，这基本上就等同于合约在说：“是的，我批准这个签名 + 消息！”

### 接口 {#interface}

以下是 EIP-1271 规范中的确切接口（我们将在下面讨论 `_hash` 参数，但现在，请将其视为正在验证的消息）：

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev 应该返回提供的签名对于提供的哈希是否有效
   * @param _hash      要签名的数据的哈希
   * @param _signature 与 _hash 关联的签名字节数组
   *
   * 当函数通过时，必须返回 bytes4 魔术值 0x1626ba7e。
   * 不得修改状态（对于 solc < 0.5 使用 STATICCALL，对于 solc > 0.5 使用 view 修饰符）
   * 必须允许外部调用
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## EIP-1271 实现示例：Safe {#example-eip-1271-implementation-safe}

合约可以通过多种方式实现 `isValidSignature` —— 规范对具体实现并没有太多规定。

一个实现 EIP-1271 的著名合约是 Safe（原 Gnosis Safe）。

在 Safe 的代码中，`isValidSignature` [的实现](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)使得签名可以通过[两种方式](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support)进行创建和验证：

1. 链上消息
   1. 创建：Safe 所有者创建一个新的 Safe 交易来“签署”一条消息，将该消息作为数据传递到交易中。一旦有足够多的所有者签署了该交易以达到多重签名阈值，该交易就会被广播并执行。在交易中，有一个名为 (`signMessage(bytes calldata _data)`) 的 Safe 函数，它将该消息添加到一个“已批准”消息列表中。
   2. 验证：在 Safe 合约上调用 `isValidSignature`，并将要验证的消息作为消息参数传入，同时[为签名参数传入一个空值](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32)（即 `0x`）。Safe 会发现签名参数为空，因此它不会通过密码学验证签名，而是知道直接去检查该消息是否在“已批准”消息列表中。
2. 链下消息：
   1. 创建：Safe 所有者在链下创建一条消息，然后让其他 Safe 所有者分别签署该消息，直到有足够的签名达到多重签名批准阈值。
   2. 验证：调用 `isValidSignature`。在消息参数中，传入要验证的消息。在签名参数中，传入每个 Safe 所有者的个人签名，将它们首尾相连拼接在一起。Safe 将检查是否有足够的签名满足阈值，**并且**每个签名都是有效的。如果是，它将返回一个指示签名验证成功的值。

## `_hash` 参数到底是什么？为什么不传递完整的消息？ {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

你可能已经注意到，[EIP-1271 接口](https://eips.ethereum.org/EIPS/eip-1271)中的 `isValidSignature` 函数并不接收消息本身，而是接收一个 `_hash` 参数。这意味着我们不是将完整的任意长度消息传递给 `isValidSignature`，而是传递该消息的 32 字节哈希（通常是 keccak256）。

调用数据（即传递给智能合约函数的函数参数数据）的每个字节[消耗 16 Gas（如果是零字节则消耗 4 Gas）](https://eips.ethereum.org/EIPS/eip-2028)，因此如果消息很长，这可以节省大量的 Gas。

### 以前的 EIP-1271 规范 {#previous-eip-1271-specifications}

在实际应用中，有一些 EIP-1271 规范的 `isValidSignature` 函数的第一个参数类型为 `bytes`（任意长度，而不是固定长度的 `bytes32`），参数名为 `message`。这是 EIP-1271 标准的[旧版本](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206)。

## 应该如何在我自己的合约中实现 EIP-1271？ {#how-should-eip-1271-be-implemented-in-my-own-contracts}

规范在这里非常开放。Safe 的实现提供了一些好主意：

- 你可以认为来自合约“所有者”的 EOA 签名是有效的。
- 你可以存储一个已批准消息的列表，并仅认为这些消息是有效的。

最终，这取决于作为合约开发者的你！

## 结论 {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 是一个多功能标准，允许智能合约验证签名。它为智能合约表现得更像 EOA 打开了大门——例如，为“使用以太坊登录”与智能合约协同工作提供了一种方式——并且它可以通过多种方式实现（Safe 有一个值得考虑的、非同寻常且有趣的实现）。