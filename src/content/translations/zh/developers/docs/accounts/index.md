---
title: 以太坊帐户
description: 对 以太坊帐户的解释--它们的数据结构以及它们与密钥对密码学的关系。
lang: zh
sidebar: true
---

一个以太坊帐户是一个具有以太币 (ETH) 余额的实体，可以在以太坊上发送交易。 帐户可以由用户控制，也可以作为智能合约部署。

## 前置要求 {#prerequisites}

帐户是一个很适合初学者的主题。 但为了帮助您更好地理解这个页面，我们建议您首先阅读我们的 [以太坊简介](/developers/docs/intro-to-ethereum/)。

## 帐户类型 {#types-of-account}

以太坊有两种帐户类型：

- 外部持有 – 私钥的所有者控制
- 合约 – 一种由代码控制，部署在网络上的智能合约。 了解 [智能合约](/developers/docs/smart-contracts/)。

这两种帐户类型都能：

- 接收、持有和发送 ETH 和 token
- 与已部署的智能合约进行交互

### 主要区别 {#key-differences}

**外部持有**

- 创建账户是免费的
- 可以发起交易
- 外部持有的帐户之间的交易只能是 ETH 转账

**合约**

- 创建帐户是有成本的，因为您使用的是网络存储。
- 只能在收到交易时发送交易
- 从外部帐户到合约帐户的交易可以触发代码，可以执行许多不同的操作，例如转移 token，甚至创建一个新的合约

## 理解帐户 {#an-account-examined}

以太坊帐户有四个字段：

- `nonce` – 显示从帐户发送的交易数量的计数器。 这将确保交易只处理一次。 在合约帐户中，这个数字代表该帐户创建的合约数量
- `balance` – 这个地址拥有的 Wei 数量。 Wei 是以太币的计数单位，每个 以太币 ETH 有 1e+18 个 Wei。
- `codeHash` – 所有代码片段都被保存在状态数据库的相应哈希下，供后续检索。 对于合约帐户，合约代码经过哈希处理并存储为 codeHash。 对于外部持有的帐户，codeHash 字段是空字符串的哈希值。
<!--this hash refers to the code of this account on the Ethereum virtual machine (EVM). This EVM code gets executed if the account gets a message call. It cannot be changed unlike the other account fields.  -->
- `storageRoot` – 有时被称为一个存储哈希。 Merkle Patricia 树的根节点的 256 位哈希，Merkle Patricia 树编码了帐户的存储内容（256 位整数值键值对），256 位整数值的 Keccak 256 位哈希作为 Key，RLP 编码的 256 位整数值作为值。 此树编码帐户存储内容的哈希，默认情况下是空。

![显示帐户组成部分的图表](./accounts.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 外部持有的帐户和密钥对 {#externally-owned-accounts-and-key-pairs}

帐户由公钥和私钥加密对组成。 它们有助于证明交易实际上是由发送者签名的，并防止伪造。 您的私钥是您用来签名交易的密钥，所以它保障您对与您帐户相关的资金进行管理。 您从未真正持有加密货币，您持有私钥 – 资金总是在以太坊的账本上。

这将防止恶意行为者广播虚假交易，因为您总是可以验证交易的发送者。

如果 Alice 想要从她自己的帐户发送 ETH 到 Bob 的帐户，Alice 需要创建交易请求并将其发送到网络进行验证。 以太坊对公钥加密的使用确保了 Alice 可以证明她最初发起了交易请求。 没有加密机制，恶意对手 Eve 可以简单地公开广播一个看起来像“从 Alice 的帐户发送 5 ETH 到 Eve 帐户”的请求。而且没有人能够证实它不是来自 Alice 的。

## 帐户创建 {#account-creation}

当你想要创建一个帐户时，大多数库将生成一个随机的私钥。

私钥由 64 个十六进制字符组成，可以用密码加密保存。

例如：

`fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd036415f`

公钥是使用椭圆曲线数字签名算法从私钥生成的。 您可以将公钥的最后 20 字节前面添加 `0x` 来获得您帐户的公共地址。

下面是使用 GETH 的 `personal_newAccount` 在控制台中创建一个帐户的例子

```go
> personal.newAccount()
Passphrase:
Repeat passphrase:
"0x5e97870f263700f46aa00d967821199b9bc5a120"

> personal.newAccount("h4ck3r")
"0x3d80b31a78c30fc628f20b2c89d7ddbf6e53cedc"
```

[GETH 文档](https://geth.ethereum.org/docs)

可以通过您的私钥获取公钥，但您不能通过公钥获取私钥。 这意味着保持私人密钥的安全至关重要，如同名称所建议的 **PRIVATE**。

您需要一个私钥来签署消息和交易并输出签名。 然后其他人可以使用签名获取您的公钥，证明信息的作者。 在您的应用程序中，您可以使用 javascript 库向网络发送交易。<!-- **WEB3JS example**

```jsx
web3.eth.accounts.recoverTransaction('0xf86180808401ef364594f0109fc8df283027b6285cc889f5aa624eac1f5580801ca031573280d608f75137e33fc14655f097867d691d5c4c44ebe5ae186070ac3d5ea0524410802cdc025034daefcdfa08e7d2ee3f0b9d9ae184b2001fe0aff07603d9');
> "0xF0109fC8DF283027b6285cc889F5aA624EaC1F55"
```

[Web3js documentation](https://web3js.readthedocs.io/)

[code for creating an account in JS?] + links to how to do it in other languages maybe?

`$ geth account new` -->## 合约帐户 {#contract-accounts}

合约帐户也有一个 42 个字符组成的十六进制地址：

例如：

`0x06012c8cf97bead5deae237070f9587f8e7a266d`

合约地址是在将合约部署到 Ethereum 区块链时给出的。 地址产生自创建者的地址和从创建者地址发送的交易数量（“nonce”字段）。<!-- @Sam Richards is there a line of code you can use to return your contract's address – in the same way that we have personal.newAccount() above? – Don't know if what I found below is helpful?

```jsx
ethers.utils.getContractAddress( transaction ) ⇒ string< Address >
```

TODO: add a contract address example--><!-- ## Managing an account

Most users will want to interact with their account via a wallet. Note that an account is not a wallet. A wallet is the keypair associated with a user-owned account, which allow a user to make transactions from or manage the account

For dapp development, you'll want access to dummy accounts with test ETH so you can experiment. When you create a local chain, you'll get test accounts wth fake ETH which you can then import using MetaMask and use on your dapp's frontend. -->

## 关于钱包的说明 {#a-note-on-wallets}

帐户不是一个钱包。 钱包是与用户拥有的帐户相关联的密钥对，允许用户对帐户进行交易或管理。

## 延伸阅读 {#further-reading}

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [智能合约](/developers/docs/smart-contracts/)
- [交易](/developers/docs/transactions/)
