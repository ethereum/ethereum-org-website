---
title: 交易
description: 以太坊交易 – 工作原理、数据结构以及如何通过应用发送。
lang: zh
sidebar: true
---

交易是由帐户发出，带密码学签名的指令。 帐户将发起交易以更新以太坊网络的状态。 最简单的交易是将 ETH 从一个账户转到另一个帐户。

## 前置要求 {#prerequisites}

为了帮助您更好地理解这个页面，我们建议您先阅读[帐户](/developers/docs/accounts/)和我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是交易？ {#whats-a-transaction}

以太坊交易是指由外部持有的帐户发起的行动，换句话说，是指由人管理而不是智能合约管理的帐户。 例如，如果 Bob 发送 Alice 1 ETH，Bob 的帐户必须减少，Alice 必须被增加。 此状态更改的操作发生在交易中。

![显示交易导致状态更改的图表](../../../../../developers/docs/transactions/tx.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

改变 EVM 状态的交易需要向整个网络广播。 任何节点都可以在 EVM 上广播交易请求； 此后，矿工将执行交易并将由此产生的状态变化传播到网络的其他部分。

交易需要收费并且必须开采才能有效。 为了使这种概述更加简单，我们将其称为 Gas 费和挖矿。

所提交的交易包括下列信息：

- `recipient` – 接收地址（如果为一个外部持有的帐户，交易将传输值。 如果为合约帐户，交易将执行合约代码）
- `signature` – 发送者的标识符。 当通过发送者的私钥签名交易来确保发送者已授权此交易时，生成此签名。
- `value` – 从发件人向收件人转移 ETH 的金额 （以 WEI 为单位，ETH 的一种面值单位）
- `data` – 可包括任意数据的可选字段
- `gasLimit` – 交易可以消耗的 Gas 的最大数量。 Gas 单位代表了计算步骤
- `maxPriorityFeePerGas` - 作为矿工小费包含的最大 gas 数量
- `maxFeePerGas` - 愿意为交易支付的最大 gas 数量（包括 `baseFeePerGas` 和 `maxPriorityFeePerGas`）

Gas 是指矿工处理交易所需的算力。 用户必须为计算支付费用。 `gasLimit` 和 `gasPrice` 决定支付给矿工的最高交易费用。 [关于 Gas 的更多信息](/developers/docs/gas/)。

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

但交易对象需要使用发送者的私钥签名。 这证明交易只可能来自发送者，而不是以欺诈方式发送。

Geth 这样的以太坊客户端将处理此签名过程。

示例 [JSON-RPC](https://eth.wiki/json-rpc/API) 调用：

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

- `raw` 是已签名交易的 RLP（Recursive Length Prefix）编码形式。
- `tx` 是已签名交易的 JSON 形式。

具备签名哈希，可通过加密技术证明交易来自发送者并提交网络。

## 交易类型 {#types-of-transactions}

以太坊有几种不同类型的交易：

- 常规交易：从一个钱包到另一个钱包的交易。
- 合约部署交易：没有“to”地址的交易，数据字段用于合约代码。

### 关于 Gas {#on-gas}

如上所述，执行交易需要花费 [Gas](/developers/docs/gas/)。 简单的转让交易需要 21000 个 Gas。

假设 Bob 要为 Alice 发送 1ETH，需支付 190 gwei 的 `baseFeePergas` 和 10 gwei 的 `maxPriorityFeePerGas`，Bob 需要支付以下费用：

```
(190 + 10) * 21000 = 4,200,000 gwei
--or--
0.0042 ETH
```

Bob 的帐户将会减少 **-1.0042 ETH**

Alice 的帐户将会增加 **+1.0 ETH**

此基本费用将会燃烧 **-0.00399 ETH**

矿工保留小费 **+0.000210 ETH**

任何智能合约交互也需要 Gas。

![未使用的 Gas 退款情况图](../../../../../developers/docs/transactions/gas-tx.png) _该图改编自 [以太坊 EVM 说明](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

任何未用于交易的 gas 都退还给用户帐户。

## 交易生命周期 {#transaction-lifecycle}

一旦交易被提交，就会发生以下情况：

1. 一旦您发送交易，加密法生成交易哈希： `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 然后将该交易转播到网络，并且与大量其他交易一起包含在一个集合中。
3. 矿工必须选择您的交易并将它包含在一个区块中，以便验证交易并认为它“成功”。
   - 如果网络繁忙，矿工无法跟上，您可能会在这个阶段等候。
4. 您的交易将收到"确认"。 确认的数量是自包含您交易的区块以来创建的区块数。 这个数字越大，交易被网络处理和承认的确定性就越强。
   - 最近的区块可能会被重组，给人留下交易失败的印象；但交易可能仍然有效，但包含在另一个区块中。
   - 重组的概率随着其后每一次挖掘的区块而降低，即确认次数越多，交易就越不可改变。

## 直观演示 {#a-visual-demo}

跟随 Austin 了解交易、Gas 和挖矿。

<YouTube id="er-0ihqFQB0" />

## Typed Transaction Envelope 交易 {#typed-transaction-envelope}

以太坊最初有一个交易格式。 每笔交易都包含一个随机数、gas 价格、gas 限额、发送地址、价值、数据、v、r 和 s。 这些字段采用 RLP 编码，如下所示：

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

以太坊经过演变，已经支持多种类型的交易，从而能够在不影响传统交易格式的情况下实现访问列表和 [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) 等新功能。

[EIP-2718：Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718) 定义了交易类型，是未来交易类型的”信封“。

EIP-2718 是用于类型化交易的新通用信封。 在新的标准中，交易被理解为：

`TransactionType || TransactionPayload`

字段定义为：

## 视觉演示 {#a-visual-demo}

观看 Austin 引导您了解交易、Gas 和挖矿。

<YouTube id="er-0ihqFQB0" />

## 延伸阅读 {#further-reading}

- [EIP-2718：Typed Transaction Envelope](https://eips.ethereum.org/EIPS/eip-2718)

_还有哪些社区资源对您有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [帐户](/developers/docs/accounts/)
- [以太坊虚拟机 (EVM)](/developers/docs/evm/)
- [Gas](/developers/docs/gas/)
- [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)
