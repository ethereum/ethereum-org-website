---
title: "EIP-1271：签署和验证智能合约签名"
description: 基于 EIP-1271 的智能合约签名生成与验证概述。 我们还介绍了 Safe（原 Gnosis Safe）中使用的 EIP-1271 实现，以此为智能合约开发者提供一个可参考的具体例子。
author: Nathan H. Leung
lang: zh
tags:
  - "eip-1271"
  - "智能合约"
  - "验证"
  - "签名"
skill: intermediate
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 标准允许智能合约验证签名。

在本教程中，我们概述了数字签名、EIP-1271 的背景，以及 [Safe](https://safe.global/)（原 Gnosis Safe）使用的 EIP-1271 的具体实现。 总之，这可以作为在你自己的合约中实现 EIP-1271 的起点。

## 什么是签名？

在这种情况下，签名（更准确地说“数字签名”）是一条信息加上某种证明，该证明表明信息来自某个特定的人/发件人/地址。

例如，数字签名可能如下所示：

1. 信息：“我想用我的以太坊钱包登录这个网站”
2. 签名者：我的地址是 `0x000…`
3. 证明：这里有一些证明，证明我，`0x000…`，确实创建了这整条信息（通常会加密）。

值得注意的是，数字签名包括“信息”和“签名”两部分。

为什么? 例如，如果你给我一份合同让我签字，然后我剪掉了签名页，只把我的签名还给你，而没有合同的其他部分，那么这份合同就无效。

同样，如果没有相关信息，数字签名也将没有任何意义！

## 为什么会有 EIP-1271？

要在基于以太坊的区块链上创建数字签名，通常需要一个别人不知道的秘密私钥。 这样，你的签名才是你的（如果其他人不知道密钥，则无法创建相同的签名）。

你的以太坊帐户（即你的外部帐户/EOA）有一个与之关联的私钥，这是通常在网站或去中心化应用程序要求你签名时使用的私钥（例如“使用以太坊登录”）。

应用程序可以在[不知道你的私钥](https://en.wikipedia.org/wiki/Public-key_cryptography)的情况下[验证你使用 ethers.js 等第三方库创建的签名](https://docs.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)，并且确认_你_是那个创建签名的人。

> 事实上，由于外部帐户数字签名使用公钥加密，可以在**链下**生成和验证! 这就是无燃料去中心化自治组织投票的工作原理—并非在链上提交投票，而是使用加密库在链下创建和验证数字签名。

虽然外部帐户帐户有私钥，但智能合约帐户没有任何类型的私钥或密钥（因此“使用以太坊登录”等自然不适用于智能合约帐户）。

EIP-1271 旨在解决：如果智能合约没有可以合并到签名中的密匙，我们如何判断智能合约签名是有效的？

## EIP-1271 是如何工作的？

智能合约没有可用于签署信息的私钥。 那么，我们如何辨别签名的真伪呢？

有一种想法是，我们可以直接_询问_智能合约签名是否真实！

EIP-1271 所做的就是将“询问”智能合约给定签名是否有效这一想法标准化。

实现 EIP-1271 的合约必须有一个名为 `isValidSignature` 的函数，该函数接收信息和签名。 然后，合约可以运行一些验证逻辑（规范并没有在此强制执行任何特定内容），然后返回一个表示签名是否有效的值。

如果 `isValidSignature` 返回表示签名有效的结果，这就相当于合约在说“是的，我承认这个签名和信息！”

### 接口

以下是 EIP-1271 规范中的确切接口（我们将在下文中讨论 `_hash` 参数，但现在请将其视为正在验证的信息）：

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev Should return whether the signature provided is valid for the provided hash
   * @param _hash      Hash of the data to be signed
   * @param _signature Signature byte array associated with _hash
   *
   * MUST return the bytes4 magic value 0x1626ba7e when function passes.
   * MUST NOT modify state (using STATICCALL for solc < 0.5, view modifier for solc > 0.5)
   * MUST allow external calls
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## EIP-1271 实现示例：安全

合约可通过多种方式实现 `isValidSignature`—规范本身对具体实现没有做出太多要求。

实现 EIP-1271 的一个代表性合约是 Safe（原 Gnosis Safe）。

在 Safe 的代码中，[实现了 ](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) `isValidSignature`，从而使签名可通过以下[两种方式](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support)创建和验证：

1. 链上消息
   1. 创建：一个安全的所有者创建一个新的安全交易来“签名”一则消息，并将消息作为数据传入交易中。 一旦足够的所有者对交易进行签名，使签名数量达到多签名阈值后，交易就会被广播并运行。 在交易中，会调用一个安全函数，将消息添加到“已批准”消息列表中。
   2. 验证：调用 Safe 合约的 `isValidSignature` 函数，并传入待验证的消息作为消息参数，传入[一个空值作为签名参数](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32)（即 `0x`）。 Safe 合约会看到签名参数为空，将不会对签名进行密码验证，而是直接检查消息是否在“已批准”消息列表中。
2. 链下信息：
   1. 创建：安全的所有者在链下创建一条消息，然后让其他安全的所有者分别对消息进行签名，直到有足够的签名来达到多签名批准阈值。
   2. 验证：调用 `isValidSignature`。 在消息参数中，传入要验证的消息。 在签名参数中，传入每个安全所有者的签名，所有签名都是背靠背连接在一起的。 Safe 合约会检查是否有足够签名以达到阈值，**并**检查每个签名的有效性。 如果是，它将返回一个表示签名验证成功的值。

## `_hash` 参数到底是什么？ 为什么不传递整条消息？

你可能已经发现，[EIP-1271 接口](https://eips.ethereum.org/EIPS/eip-1271)中的 `isValidSignature` 函数并不接收消息本身，而是使用 `_hash` 参数。 这意味着我们只需将消息的 32 个字节长的哈希值（一般通过 keccak256）传入 `isValidSignature`，而不是传入任意长度的完整消息。

calldata 的每一个字节（即传入智能合约函数的函数参数数据）都会[花费 16 个单位燃料（若为空字节，则会花费 4 上单位燃料）](https://eips.ethereum.org/EIPS/eip-2028)，因此在消息较长时，这可以节省很多的燃料费。

### 先前的 EIP-1271 规范

现有 EIP-1271 规范中的 `isValidSignature` 函数，其第一个参数为 `bytes` 类型（任意长度，而不是固定长度的 `bytes32`），并且参数名为 `message`。 这是 EIP-1271 标准的一个[旧版本](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206)。

## 如何在我的合约中实现 EIP-1271？

这是一个非常开放式的规范。 Safe 的实现有一些不错的思路：

- 你可以认为合约“所有者”的外部帐户签名是有效的。
- 你可以存储已批准消息的列表，并且只认为这些消息是有效的。

最终，都将由作为合约开发者的你来决定！

## 结论

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 是一个允许智能合约验证签名的通用标准。 它为智能合约打开了一扇门，使其行为更像外部帐户（例如，为“使用以太坊登录”提供一种与智能合约协同工作的方式），而且它可通过多种方式实现（例如 Safe 有一个有用且有趣的实现方式值得考虑)。
