---
title: 交易
description: 以太坊交易 – 工作原理、数据结构以及如何通过应用发送。
lang: zh
---

交易是由帐户发出，带密码学签名的指令。 帐户将发起交易以更新以太坊网络的状态。 最简单的交易是将 ETH 从一个帐户转到另一个帐户。

## 前提条件 {#prerequisites}

为了帮助你更好地理解这个页面，我们建议先阅读[帐户](/developers/docs/accounts/)和我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是交易？ {#whats-a-transaction}

以太坊交易是指由外部持有帐户发起的行动，换句话说，是指由人管理而不是智能合约管理的帐户。 例如，如果 Bob 发送 Alice 1 ETH，则 Bob 的帐户必须减少 1 ETH，而 Alice 的帐户必须增加 1 ETH。 交易会造成状态的改变。

![显示交易导致状态更改的图表](./tx.png) _示意图节选自[以太坊虚拟机图解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

改变 EVM 状态的交易需要广播到整个网络。 任何节点都可以广播在以太坊虚拟机上执行交易的请求；此后，验证者将执行交易并将由此产生的状态变化传播到网络的其他部分。

交易需要付费并且必须包含在一个有效区块中。 为了使本概述更加简洁，我们将另行介绍燃料费和验证。

所提交的交易包括下列信息：

- `from` - 发送者的地址，该地址将签署交易。 这将是一个外部帐户，因为合约帐户不能发送交易。
- `to` — 接收地址（如果是外部帐户，交易将传输值。 如果是合约帐户，交易将执行合约代码）
- `signature` – 发送者的标识符。 当发送者的私钥签署交易并确保发送者已授权此交易时，生成此签名。
- `nonce` - 一个有序递增的计数器，表示来自帐户的交易数量
- `value` – 发送者向接收者转移的以太币数量（面值为 WEI，1 个以太币 = 1e+18wei）
- `input data` – 可包括任意数据的可选字段
- `gasLimit` – 交易可以消耗的最大数量的燃料单位。 [以太坊虚拟机](/developers/docs/evm/opcodes)指定每个计算步骤所需的燃料单位
- `maxPriorityFeePerGas` - 作为小费提供给验证者的已消耗燃料的最高价格
- `maxFeePerGas` - 愿意为交易支付的每单位燃料的最高费用（包括 `baseFeePerGas` 和 `maxPriorityFeePerGas`）

燃料是指验证者处理交易所需的计算。 用户必须为此计算支付费用。 `gasLimit` 和 `maxPriorityFeePerGas` 决定支付给验证者的最高交易费。 [关于燃料的更多信息](/developers/docs/gas/)。

交易对象看起来像这样：

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300"
  maxPriorityFeePerGas: "10"
  nonce: "0",
  value: "10000000000",
}
```

但交易对象需要使用发送者的私钥签名。 这证明交易只可能来自发送者，而不是欺诈。

Geth 这样的以太坊客户端将处理此签名过程。

示例 [JSON-RPC](/developers/docs/apis/json-rpc) 调用：

```json
{
  "id": 2,
  "jsonrpc": "2.0",
  "method": "account_signTransaction",
  "params": [
    {
      "from": "0x1923f626bb8dc025849e00f99c25fe2b2f7fb0db",
      "gas": "0x55555",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "input": "0xabcd",
      "nonce": "0x0",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234"
    }
  ]
}
```

示例响应：

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "raw": "0xf88380018203339407a565b7ed7d7a678680a4c162885bedbb695fe080a44401a6e4000000000000000000000000000000000000000000000000000000000000001226a0223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20ea02aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
    "tx": {
      "nonce": "0x0",
      "maxFeePerGas": "0x1234",
      "maxPriorityFeePerGas": "0x1234",
      "gas": "0x55555",
      "to": "0x07a565b7ed7d7a678680a4c162885bedbb695fe0",
      "value": "0x1234",
      "input": "0xabcd",
      "v": "0x26",
      "r": "0x223a7c9bcf5531c99be5ea7082183816eb20cfe0bbc322e97cc5c7f71ab8b20e",
      "s": "0x2aadee6b34b45bb15bc42d9c09de4a6754e7000908da72d48cc7704971491663",
      "hash": "0xeba2df809e7a612a0a0d444ccfa5c839624bdc00dd29e3340d46df3870f8a30e"
    }
  }
}
```

- `raw` 是采用[递归长度前缀 (RLP) ](/developers/docs/data-structures-and-encoding/rlp)编码形式的签名交易
- `tx` 是已签名交易的 JSON 形式。

如有签名哈希，可通过加密技术证明交易来自发送者并提交网络。

### `data`字段 {#the-data-field}

绝大多数交易都是从外部所有的帐户访问合约。 大多数合约用 Solidity 语言编写，并根据[应用程序二进制接口 (ABI)](/glossary/#abi) 解释其`data`字段。

前四个字节使用函数名称和参数的哈希指定要调用的函数。 有时可以使用[本数据库](https://www.4byte.directory/signatures/)根据选择器识别函数。

调用数据的其余部分是参数，[按照应用程序二进制接口规范中的规定进行编码](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)。

例如，我们来看一下[这笔交易](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)。 使用 **Click to see More（单击查看更多）**查看调用数据。

函数选择器是 `0xa9059cbb`。 有几个[具有此签名的已知函数](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)。 本例中[合约源代码](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)已经上传到 Etherscan，所以我们知道该函数是 `transfer(address, uint256)`。

其余数据如下：

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

根据应用程序二进制接口规范，整型值（例如地址，它是 20 字节整型）在应用程序二进制接口中显示为 32 字节的字，前面用零填充。 所以我们知道 `to` 地址是 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)。 `value` 是 0x3b0559f4 = 990206452。

## 交易类型 {#types-of-transactions}

以太坊有几种不同类型的交易：

- 常规交易：从一个帐户到另一个帐户的交易。
- 合约部署交易：没有“to”地址的交易，数据字段用于合约代码。
- 执行合约：与已部署的智能合约进行交互的交易。 在这种情况下，“to”地址是智能合约地址。

### 关于燃料 {#on-gas}

如上所述，执行交易需要耗费[燃料](/developers/docs/gas/)。 简单的转账交易需要 21000 单位燃料。

因此，如果 Bob 要在 `baseFeePerGas` 为 190 Gwei 且 `maxPriorityFeePerGas` 为 10 Gwei 时给 Alice 发送一个以太币，Bob 需要支付以下费用：

```
(190 + 10) * 21000 = 4,200,000 gwei
--或--
0.0042 ETH
```

Bob 的帐户将会扣除 **1.0042 个以太币**（1 个以太币给 Alice，0.0042 个以太币作为燃料费用）

Alice 的帐户将会增加 **+1.0 ETH**

基础费将会燃烧 **-0.00399 ETH**

验证者获得 **0.000210 个以太币**的小费


![未使用燃料退还示意图](./gas-tx.png) _示意图节选自[以太坊虚拟机图解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

任何未用于交易的燃料都会退还给用户帐户。

### 智能合约交互 {#smart-contract-interactions}

任何涉及智能合约的交易都需要燃料。

智能合约还可以包含被称为 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 或 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 的函数，这不会改变合约的状态。 像这样，从外部帐户调用这些函数不需要任何燃料。 这种情况下的 RPC 底层调用为 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)。

不同于使用 `eth_call` 进行访问，`view` 或 `pure` 函数通常也在内部（即从合约自身或其他合约）调用并消耗燃料。

## 交易生命周期 {#transaction-lifecycle}

交易提交后，就会发生以下情况：

1. 以加密方式生成的交易哈希： `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 然后，该交易被广播到网络，并添加到由所有其他待处理的网络交易组成的交易池中。
3. 验证者必须选择你的交易并将它包含在一个区块中，以便验证交易并认为它“成功”。
4. 随着时间的流逝，包含你的交易的区块将升级成“合理”状态，然后变成“最后确定”状态。 通过这些升级，可以进一步确定 你的交易已经成功并将无法更改。 区块一旦“最终确定”，只能通过耗费数十亿美元 的网络级攻击来更改。

## 视频演示 {#a-visual-demo}

跟随 Austin 了解交易、燃料和挖矿。

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope交易 {#typed-transaction-envelope}

以太坊最初有一种交易形式。 每笔交易都包含 Nonce、燃料价格、燃料限制、目的地地址、价值、数据、v、r 和 s。 这些字段为 [RLP 编码](/developers/docs/data-structures-and-encoding/rlp/)，看起来像这样：

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

以太坊经过演变，已经支持多种类型的交易，从而能够在不影响传统交易形式的情况下实现访问列表和 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 等新功能。

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718)是允许这种行为的。 交易解释如下：

`TransactionType || TransactionPayload`

其中，字段定义如下：

- `TransactionType` - 一个在 0 到 0x7f 之间的数字，总共为 128 种可能的交易类型。
- `TransactionPayload` - 由交易类型定义的任意字节数组。

基于 `TransactionType` 值，交易可被分为以下几类：

1. **Type 0（传统）交易：**自以太坊推出以来使用的原始交易格式。 它们不包含 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中的功能，例如动态燃料费计算或智能合约访问列表。 传统交易缺少以序列化形式表明其类型的特定前缀，在使用[递归长度前缀编码 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 时以 `0xf8` 字节开头。 这些交易的 TransactionType 值为 `0x0`。

2. **Type 1 交易：** 作为以太坊[柏林升级](/history/#berlin)的一部分在 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中引入，这些交易包含一个 `accessList` 参数。 该列表指定了交易预期访问的地址和存储密钥，有助于降低涉及智能合约的复杂交易的潜在[燃料](/developers/docs/gas/)花费。 EIP-1559 的费用市场变化不包含在 Type 1 交易中。 Type 1 交易还包括一个 `yParity` 参数，它可以是 `0x0` 或 `0x1`，表示 secp256k1 签名的 y 值奇偶性。 它们以字节 `0x01` 开头进行标识，其交易类型 (TransactionType) 值为 `0x1`。

3. **Type 2 交易**通常称为 EIP-1559 交易，是在以太坊[伦敦升级](/history/#london)的 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 中引入的。 它们已成为以太坊网络上的标准交易类型。 这些交易引入了一种新的费用市场机制，通过将交易费分为基础费用和优先费用来提高可预测性。 它们以字节 `0x02` 开头，并包括 `maxPriorityFeePerGas` 和 `maxFeePerGas` 的字段。 Type 2 交易因其灵活性和效率，现已成为默认选择，特别是在网络严重拥堵期间，由于它能够帮助用户提高管理交易费用的可预测性，因此特别受到青睐。 这些交易的 TransactionType 值为 `0x2`。



## 延伸阅读 {#further-reading}

- [EIP-2718：Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [帐户](/developers/docs/accounts/)
- [以太坊虚拟机 (EVM)](/developers/docs/evm/)
- [燃料](/developers/docs/gas/)
