---
title: 交易
description: 以太坊交易 – 工作原理、数据结构以及如何通过应用发送。
lang: zh
---

交易是由帐户发出，带密码学签名的指令。 帐户将发起交易以更新以太坊网络的状态。 最简单的交易是将 ETH 从一个帐户转到另一个帐户。

## 前提条件 {#prerequisites}

为了帮助你更好地理解本页面，我们建议你先阅读[帐户](/developers/docs/accounts/)和我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 什么是交易？ {#whats-a-transaction}

以太坊交易是指由外部持有帐户发起的行动，换句话说，是指由人管理而不是智能合约管理的帐户。 例如，如果 Bob 发送 Alice 1 ETH，则 Bob 的帐户必须减少 1 ETH，而 Alice 的帐户必须增加 1 ETH。 交易会造成状态的改变。

![显示交易导致状态变化的图表](./tx.png)
_图表改编自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

改变 EVM 状态的交易需要广播到整个网络。 任何节点都可以广播在以太坊虚拟机上执行交易的请求；此后，验证者将执行交易并将由此产生的状态变化传播到网络的其他部分。

交易需要付费并且必须包含在一个有效区块中。 为了使本概述更加简洁，我们将另行介绍燃料费和验证。

所提交的交易包括下列信息：

- `from` – 发送者的地址，该地址将签署交易。 这将是一个外部帐户，因为合约帐户无法发送交易
- `to` – 接收地址（如果是外部所有的帐户，交易将转移价值。 如果是合约帐户，交易将执行合约代码）
- `signature` – 发送者的标识符。 当发送者的私钥签署交易并确保发送者已授权此交易时，生成此签名。
- `nonce` - 一个顺序递增的计数器，表示来自该帐户的交易序号
- `value` – 从发送者转移到接收者的 ETH 数量（以 WEI 为单位，其中 1ETH 等于 1e+18wei）
- `input data` – 包含任意数据的可选字段
- `gasLimit` – 交易可消耗的最大燃料单位数量。 [EVM](/developers/docs/evm/opcodes) 指定了每个计算步骤所需的燃料单位
- `maxPriorityFeePerGas` - 作为给验证者的小费，愿意为每单位燃料支付的最高价格
- `maxFeePerGas` - 愿意为交易支付的每单位燃料的最高费用（包括 `baseFeePerGas` 和 `maxPriorityFeePerGas`）

燃料是指验证者处理交易所需的计算。 用户必须为此计算支付费用。 `gasLimit` 和 `maxPriorityFeePerGas` 决定了支付给验证者的最高交易费用。 [更多关于燃料的信息](/developers/docs/gas/)

交易对象看起来像这样：

```js
{
  from: "0xEA674fdDe714fd979de3EdF0F56AA9716B898ec8",
  to: "0xac03bb73b6a9e108530aff4df5077c2b3d481e5a",
  gasLimit: "21000",
  maxFeePerGas: "300",
  maxPriorityFeePerGas: "10",
  nonce: "0",
  value: "10000000000"
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

- `raw` 是以[递归长度前缀 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 编码格式表示的已签名交易
- `tx` 是 JSON 格式的已签名交易

如有签名哈希，可通过加密技术证明交易来自发送者并提交网络。

### 数据字段 {#the-data-field}

绝大多数交易都是从外部所有的帐户访问合约。
大多数合约用 Solidity 编写，并根据[应用程序二进制接口 (ABI)](/glossary/#abi) 来解析其数据字段。

前四个字节使用函数名称和参数的哈希指定要调用的函数。
有时，你可以使用[这个数据库](https://www.4byte.directory/signatures/)从选择器中识别函数。

calldata 的其余部分是参数，[按照 ABI 规范中的指定进行编码](https://docs.soliditylang.org/en/latest/abi-spec.html#formal-specification-of-the-encoding)。

例如，我们来看[这笔交易](https://etherscan.io/tx/0xd0dcbe007569fcfa1902dae0ab8b4e078efe42e231786312289b1eee5590f6a1)。
点击 **Click to see More** 查看 calldata。

函数选择器是 `0xa9059cbb`。 [具有此签名的已知函数](https://www.4byte.directory/signatures/?bytes4_signature=0xa9059cbb)有多个。
在本例中，[合约源代码](https://etherscan.io/address/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48#code)已上传至 Etherscan，因此我们知道函数是 `transfer(address,uint256)`。

其余数据如下：

```
0000000000000000000000004f6742badb049791cd9a37ea913f2bac38d01279
000000000000000000000000000000000000000000000000000000003b0559f4
```

根据应用程序二进制接口规范，整型值（例如地址，它是 20 字节整型）在应用程序二进制接口中显示为 32 字节的字，前面用零填充。
所以我们知道 `to` 地址是 [`4f6742badb049791cd9a37ea913f2bac38d01279`](https://etherscan.io/address/0x4f6742badb049791cd9a37ea913f2bac38d01279)。
`value` 是 0x3b0559f4 = 990206452。

## 交易类型 {#types-of-transactions}

以太坊有几种不同类型的交易：

- 常规交易：从一个帐户到另一个帐户的交易。
- 合约部署交易：没有“to”地址的交易，数据字段用于合约代码。
- 执行合约：与已部署的智能合约进行交互的交易。 在这种情况下，“to”地址是智能合约地址。

### 关于燃料 {#on-gas}

如前所述，执行交易需要花费[燃料](/developers/docs/gas/)。 简单的转账交易需要 21000 单位燃料。

因此，如果 Bob 在 `baseFeePerGas` 为 190 gwei、`maxPriorityFeePerGas` 为 10 gwei 的情况下，要发送 1 ETH 给 Alice，Bob 需要支付以下费用：

```
(190 + 10) * 21000 = 4,200,000 gwei
--或--
0.0042 ETH
```

Bob 的帐户将被扣除 **-1.0042 ETH**（1 ETH 给 Alice + 0.0042 ETH 作为燃料费）

Alice 的帐户将计入 **+1.0 ETH**

基本费用将被销毁 **-0.00399 ETH**

验证者保留小费 **+0.000210 ETH**

![显示未用燃料如何退还的图表](./gas-tx.png)
_图表改编自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

任何未用于交易的燃料都会退还给用户帐户。

### 智能合约交互 {#smart-contract-interactions}

任何涉及智能合约的交易都需要燃料。

智能合约也可以包含称为 [`view`](https://docs.soliditylang.org/en/latest/contracts.html#view-functions) 或 [`pure`](https://docs.soliditylang.org/en/latest/contracts.html#pure-functions) 的函数，它们不改变合约的状态。 像这样，从外部帐户调用这些函数不需要任何燃料。 此场景的底层 RPC 调用是 [`eth_call`](/developers/docs/apis/json-rpc#eth_call)。

与使用 `eth_call` 访问不同，这些 `view` 或 `pure` 函数也常在内部（即从合约本身或从另一个合约）调用，这会消耗燃料。

## 交易生命周期 {#transaction-lifecycle}

交易提交后，就会发生以下情况：

1. 交易哈希是通过加密方式生成的：
   `0x97d99bc7729211111a21b12c933c949d4f31684f1d6954ff477d0477538ff017`
2. 然后，该交易被广播到网络，并添加到由所有其他待处理的网络交易组成的交易池中。
3. 验证者必须选择你的交易并将它包含在一个区块中，以便验证交易并认为它“成功”。
4. 随着时间的流逝，包含你的交易的区块将升级成“合理”状态，然后变成“最后确定”状态。 这些升级让你更加确信
   你的交易已成功，并且永远不会被更改。 一旦区块被“最终敲定”，它只能被
   耗资数十亿美元的网络级攻击所更改。

## 可视化演示 {#a-visual-demo}

跟随 Austin 了解交易、燃料和挖矿。

<YouTube id="er-0ihqFQB0" />

## 类型化交易信封 {#typed-transaction-envelope}

以太坊最初有一种交易形式。 每笔交易都包含 Nonce、燃料价格、燃料限制、目的地地址、价值、数据、v、r 和 s。 这些字段经过 [RLP 编码](/developers/docs/data-structures-and-encoding/rlP/)后，看起来像这样：

`RLP([nonce, gasPrice, gasLimit, to, value, data, v, r, s])`

以太坊已经发展到支持多种类型的交易，以便在不影响旧有交易格式的情况下，实现访问列表和 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 等新功能。

[EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 实现了这一行为。 交易解释如下：

`TransactionType || TransactionPayload`

其中，字段定义如下：

- `TransactionType` - 一个介于 0 和 0x7f 之间的数字，总共有 128 种可能的交易类型。
- `TransactionPayload` - 由交易类型定义的任意字节数组。

根据 `TransactionType` 的值，交易可以分为：

1. \*\*类型 0（传统）交易：\*\*自以太坊推出以来使用的原始交易格式。 它们不包含 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 的功能，例如动态燃料费计算或智能合约访问列表。 传统交易在其序列化形式中缺少表示其类型的特定前缀，在使用[递归长度前缀 (RLP)](/developers/docs/data-structures-and-encoding/rlp) 编码时，以字节 `0xf8` 开头。 这些交易的 TransactionType 值为 `0x0`。

2. \*\*类型 1 交易：\*\*在 [EIP-2930](https://eips.ethereum.org/EIPS/eip-2930) 中作为以太坊[柏林升级](/ethereum-forks/#berlin)的一部分引入，这些交易包含 `accessList` 参数。 此列表指定交易期望访问的地址和存储密钥，有助于减少涉及智能合约的复杂交易的[燃料](/developers/docs/gas/)成本。 EIP-1559 的费用市场变化不包含在 Type 1 交易中。 类型 1 交易还包含 `yParity` 参数，该参数可以是 `0x0` 或 `0x1`，表示 secp256k1 签名的 y 值的奇偶性。 它们以字节 `0x01` 开头进行标识，其交易类型 (TransactionType) 值为 `0x1`。

3. **类型 2 交易**，通常称为 EIP-1559 交易，是在以太坊[伦敦升级](/ethereum-forks/#london)中通过 [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) 引入的交易。 它们已成为以太坊网络上的标准交易类型。 这些交易引入了一种新的费用市场机制，通过将交易费分为基础费用和优先费用来提高可预测性。 它们以字节 `0x02` 开头，并包括 `maxPriorityFeePerGas` 和 `maxFeePerGas` 等字段。 Type 2 交易因其灵活性和效率，现已成为默认选择，特别是在网络严重拥堵期间，由于它能够帮助用户提高管理交易费用的可预测性，因此特别受到青睐。 这些交易的 TransactionType 值为 `0x2`。

4. **类型 3 (Blob) 交易**是在以太坊[坎昆-Deneb (Dencun) 升级](/ethereum-forks/#dencun)中通过 [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844) 引入的。 这些交易旨在更高效地处理 "blob" 数据 (二进制大对象)，它们提供了一种以更低成本将数据发布到以太坊网络的方法，尤其有利于二层网络卷叠。 Blob 交易包含额外的字段，例如 `blobVersionedHashes`、`maxFeePerBlobGas` 和 `blobGasPrice`。 它们以字节 `0x03` 开头，其 TransactionType 值为 `0x3`。 Blob 交易代表了以太坊在数据可用性和可扩展性方面的重大改进。

5. **类型 4 交易**是在以太坊[Pectra 升级](/roadmap/pectra/)中通过 [EIP-7702](https://eips.ethereum.org/EIPS/eip-7702) 引入的。 这些交易被设计为与账户抽象向前兼容。 它们允许 EOA 临时表现得像智能合约账户，而不会影响其原有功能。 它们包含一个 `authorization_list` 参数，该参数指定了 EOA 将其权限委托给哪个智能合约。 交易之后，EOA 的代码字段将包含被委托的智能合约的地址。

## 扩展阅读{#further-reading}

- [EIP-2718：类型化交易信封](https://eips.ethereum.org/EIPS/eip-2718)

_你还知道哪些对你有帮助的社区资源？ 请编辑本页面并添加进来！_

## 相关话题 {#related-topics}

- [帐户](/developers/docs/accounts/)
- [以太坊虚拟机 (EVM)](/developers/docs/evm/)
- [燃料](/developers/docs/gas/)
