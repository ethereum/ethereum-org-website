---
title: 以太坊帐户
description: 对 以太坊帐户的解释--它们的数据结构以及它们与密钥对密码学的关系。
lang: zh
---

一个以太坊帐户是一个具有以太币 (ETH) 余额的实体，可以在以太坊上发送交易。 帐户可以由用户控制，也可以作为智能合约部署。

## 前提条件 {#prerequisites}

为了帮助你更好地理解这个页面，我们建议你首先阅读我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

## 帐户类型 {#types-of-account}

以太坊有两种帐户类型：

- 外部所有的帐户 (EOA) – 由任何拥有私钥的人控制
- 合约帐户 – 部署到网络上的智能合约，由代码控制。 了解[智能合约](/developers/docs/smart-contracts/)。

这两种帐户类型都能：

- 接收、持有和发送 ETH 和 token
- 与已部署的智能合约进行交互

### 主要区别 {#key-differences}

**外部持有**

- 创建帐户是免费的
- 可以发起交易
- 外部所有的帐户之间只能进行以太币和代币交易
- 由一对加密密钥组成：控制帐户活动的公钥和私钥

**合约**

- 创建合约存在成本，因为需要使用网络存储空间
- 只能在收到交易时发送交易
- 从外部帐户向合约帐户发起的交易能触发可执行多种操作的代码，例如转移代币甚至创建新合约
- 合约帐户没有私钥。 相反，它们由智能合约代码逻辑控制

## 理解帐户 {#an-account-examined}

以太坊帐户有四个字段：

- `nonce` - 一个计数器，用来显示外部帐户发送的交易数量或合约帐户创建的合约数量。 每个帐户只能执行具有一个给定随机数的一笔交易，以防范重放攻击，重放攻击指多次广播和重复执行已签署的交易。
- `balance` – 这个地址拥有的 Wei 数量。 Wei 是以太币的计数单位，每个 ETH 有 1e+18 个 Wei。
- `codeHash` - 该哈希表示以太坊虚拟机 (EVM) 上的帐户_代码_。 合约帐户具有编程的代码片段，可以执行不同的操作。 如果帐户收到消息调用，则执行此 EVM 代码。 与其他帐户字段不同，不能更改。 所有代码片段都被保存在状态数据库的相应哈希下，供后续检索。 此哈希值称为 codeHash。 对于外部所有的帐户，codeHash 字段是空字符串的哈希。
- `storageRoot` – 有时被称为存储哈希。 Merkle Patricia trie 根节点的 256 位哈希已编码了帐户的存储内容（256 位整数值映射），并编码为 Trie，作为来自 256 的 Keccak 256 位哈希的映射位整数键，用于 RLP 编码的256位整数值。 此 Trie 对此帐户存储内容的哈希进行编码，默认情况下为空。

![显示帐户组成部分的图表](./accounts.png) _示意图节选自[以太坊虚拟机图解](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 外部持有的帐户和密钥对 {#externally-owned-accounts-and-key-pairs}

帐户由公钥和私钥加密对组成。 它们有助于证明交易实际上是由发送者签名的，并防止伪造。 你的私钥是你用来签名交易的密钥，所以它保障你对与自己帐户相关的资金进行管理。 你从未真正持有加密货币，你持有私钥 – 资金总是在以太坊的账本上。

这将防止恶意参与者广播虚假交易，因为你总是可以验证交易的发送者。

如果 Alice 想要从她自己的帐户发送 ETH 到 Bob 的帐户，Alice 需要创建交易请求并将其发送到网络进行验证。 以太坊对公钥加密的使用确保了 Alice 可以证明她最初发起了交易请求。 没有加密机制，恶意对手 Eve 可以简单地公开广播一个看起来像“从 Alice 的帐户发送 5 ETH 到 Eve 帐户”的请求。而且没有人能够证实请求不是由 Alice 发送。

## 帐户创建 {#account-creation}

当你想要创建一个帐户时，大多数库将生成一个随机的私钥。

私钥由 64 个十六进制字符组成，可以用密码加密保存。

例如：

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

使用[椭圆曲线加密法](https://wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm)从私钥生成公钥。 通过获取公钥 Keccak-256 哈希的最后 20 个字节并校验码前面添加 `0x`，可以为帐户获取公共地址。

下面的示例显示如何使用一种名为 [Clef](https://geth.ethereum.org/docs/tools/clef/introduction) 的签名工具生成一个新帐户。 Clef 是一个集成在以太坊客户端 [Geth](https://geth.ethereum.org) 中的帐户管理和签名工具。 `clef newaccount` 命令创建一个新的密钥对并保存在加密的密钥库中。

```
> clef newaccount --keystore <path>

Please enter a password for the new account to be created:
> <password>

------------
INFO [10-28|16:19:09.156] Your new key was generated       address=0x5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please backup your key file      path=/home/user/go-ethereum/data/keystore/UTC--2022-10-28T15-19-08.000825927Z--5e97870f263700f46aa00d967821199b9bc5a120
WARN [10-28|16:19:09.306] Please remember your password!
生成帐户 0x5e97870f263700f46aa00d967821199b9bc5a120
```

[Geth 相关文档](https://geth.ethereum.org/docs)

可以通过你的私钥获取公钥，但你不能通过公钥获取私钥。 这意味着保持私人密钥的安全至关重要，如同名称所建议的 **PRIVATE**。

你需要一个私钥来签署消息和交易并输出签名。 然后其他人可以使用签名获取你的公钥，证明信息的作者。 在你的应用程序中，可以使用 javascript 库向网络发送交易。

## 合约帐户 {#contract-accounts}

合约帐户也有一个 42 个字符组成的十六进制地址：

例如：

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

合约地址通常在将合约部署到以太坊区块链时给出。 地址产生自创建人的地址和从创建人地址发送的交易数量（“nonce”）。

## 验证者密钥 {#validators-keys}

以太坊还有一另种类型的密钥，它们是在以太坊从工作量证明过渡到权益证明共识时引入的。 它们是“BLS”密钥，用来识别验证者。 这些密钥可以有效地聚合，减少网络达成共识所需要的带宽。 没有这种密钥集合，验证者的最小质押金额将会高出许多。

[更多关于验证者密钥的信息](/developers/docs/consensus-mechanisms/pos/keys/)。

## 关于钱包的说明 {#a-note-on-wallets}

帐户和钱包不同。 帐户是用户拥有的以太坊帐户的密钥对。 钱包是界面或应用程序，可以让你与以太坊帐户交互。

## 视频演示 {#a-visual-demo}

跟随 Austin 了解哈希函数和密钥对。

<YouTube id="QJ010l-pBpE" />

<YouTube id="9LtBDy67Tho" />

## 延伸阅读 {#further-reading}

- [了解以太坊帐户](https://info.etherscan.com/understanding-ethereum-accounts/) - etherscan

_还有哪些社区资源对你有所帮助？ 请编辑本页面并添加！_

## 相关主题 {#related-topics}

- [智能合约](/developers/docs/smart-contracts/)
- [交易](/developers/docs/transactions/)
