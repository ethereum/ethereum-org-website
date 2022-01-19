---
title: 如何通过Geth运行轻节点
description: 如何下载、安装和运行Geth。 包括同步模式、javescript控制台及更多内容
author: "Brian Gu"
tags:
  - "客户端"
  - "geth"
  - "节点"
skill: 中级
lang: zh
sidebar: true
published: 2020-06-14
---

您可能会对运行[以太坊节点](/developers/docs/nodes-and-clients/)感兴趣。 最简单的实现方式就是下载、安装和运行 Geth。 通过 Geth，我们只需数分钟便能设置并运行一个轻节点。

首先，您需要[安装 Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)。

安装 Geth 之后，只需在命令行中键入

```bash
$ geth
```

（无美元符号）便可运行以太坊完整节点。 先不要这么做！ 当您运行`geth`时，Geth 将会：

- 初始化空白状态 EVM 的本地副本
- 从区块 0 开始下载以太坊历史记录中的所有区块
- 重新播放所有区块中的所有交易订单，更新每个交易的 EVM 状态，直到到达当前状态。

这个过程可能需要几个小时到几天的时间，并且需要几百 GB 的可用空间。 现在，我们将在测试网上运行一个轻节点来熟悉如何使用 Geth。 要做到这一点，我们必须了解一些重要的命令行选项和工具。

## 主网和测试网 {#mainnet-and-testnet}

默认情况下，Geth 会运行一个主网节点。 您可以通过运行 `geth --testnet`，来运行一个 Ropsten 测试网全节点。 您可以通过将 `ropsten` 替换为 `rinkeby` 来运行 Rinkeby 上的节点。

[详细了解不同的网络](/developers/docs/networks/)。

## 同步模式 {#syncmode}

Geth 有三个`syncmode`

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

`"full"`完全按照您的预期运行一个完整的节点--您的机器以其原始的干净状态初始化 EVM 的本地副本，下载自区块链开始以来的每个区块，并执行每个区块中的每个交易，更新 EVM 状态，直到它达到当前的 EVM 状态。

`"fast"`下载所有区块，但也从对等点下载 EVM 状态的最新快照（当前为过去 EVM 64 块的状态），仅在最新的区块中执行事务，直到它达到当前 EVM 状态。 `"fast"`的优点是同步到当前状态所需的时间要短得多；但是，它依赖于状态快照的完整存档节点对等项，因此它不会自己验证所有内容。

最后，`"light"`运行一个轻节点，我们在上面已经讨论过了。

有关这三种同步模式之间差异的详细说明，请参阅此[stack exchange 回答](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast)。

## 文档和其他命令行选项 {#documentation-and-other-command-line-options}

- [完整文档](https://geth.ethereum.org/docs/)
- [所有命令行选项](https://geth.ethereum.org/docs/interface/command-line-options)

## 运行您的轻节点 {#running-your-light-node}

我们将运行一个轻测试网节点来熟悉如何管理节点并与之交互。 为此，只需运行

```bash
$ geth --ropsten --syncmode "light"
```

请稍等几秒钟，希望您能得到类似于以下内容的输出：

```bash
$ geth --ropsten --syncmode "light"
INFO [11-18|14:04:47] Maximum peer count                       ETH=0 LES=100 total=25
INFO [11-18|14:04:47] Starting peer-to-peer node               instance=Geth/v1.8.11-stable/darwin-amd64/go1.10.3
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
INFO [11-18|14:04:47] Persisted trie from memory database      nodes=355 size=51.89kB time=561.839µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [11-18|14:04:47] Initialised chain configuration          config="{ChainID: 3 Homestead: 0 DAO: <nil> DAOSupport: true EIP150: 0 EIP155: 10 EIP158: 10 Byzantium: 1700000 Constantinople: <nil> Engine: ethash}"
INFO [11-18|14:04:47] Disk storage enabled for ethash caches   dir=/Users/bgu/Library/Ethereum/testnet/geth/ethash count=3
INFO [11-18|14:04:47] Disk storage enabled for ethash DAGs     dir=/Users/bgu/.ethash                              count=2
INFO [11-18|14:04:47] Added trusted checkpoint                 chain=ropsten block=3375103 hash=9017ab…249e89
INFO [11-18|14:04:47] Loaded most recent local header          number=0 hash=419410…ca4a2d td=1048576
INFO [11-18|14:04:47] Starting P2P networking
INFO [11-18|14:04:49] UDP listener up                          net=enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303
WARN [11-18|14:04:49] Light client mode is an experimental feature
INFO [11-18|14:04:49] RLPx listener up                         self="enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303?discport=0"
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
INFO [11-18|14:04:51] Mapped network port                      proto=udp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:04:51] Mapped network port                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:08:55] Block synchronisation started
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=1.574s number=3375295 hash=62f6b1…95c47f ignored=0
INFO [11-18|14:08:58] Imported new block headers               count=192 elapsed=127.088ms number=3375487 hash=ae759b…453ac5 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=960 elapsed=582.125ms number=3376447 hash=4cab62…445b82 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=169.936ms number=3376639 hash=470614…85ce15 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=384 elapsed=245.745ms number=3377023 hash=dad8ee…2862d2 ignored=0
INFO [11-18|14:08:59] Imported new block headers               count=192 elapsed=128.514ms number=3377215 hash=ebcd84…ea26cb ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=125.427ms number=3377407 hash=fca10c…8ed04d ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.536ms number=3377599 hash=9aa141…f34080 ignored=0
INFO [11-18|14:09:00] Imported new block headers               count=192 elapsed=109.849ms number=3377791 hash=499f2d…e0c713 ignored=0
```

注意：可能在几分钟时间内都看不到“Block synchronisation started”（区块同步开始）和随后的“Imported new block headers”（已导入新区块头）消息， 或者如果特别不幸，甚至几小时都看不到。 在此期间，您的客户端正在尝试查找愿意为轻客户端提供服务的完整节点对等点。 在上面的例子中，我们可以从时间戳看出，机器从开始查找对等点到实际找到要从中下载区块的对等点之间必须等待大约 4 分钟。 这目前在以太坊社区内是一个悬而未决的问题--我们如何激励人们运行服务于轻客户端的完整节点？

一旦区块同步开始，您的机器将需要几分钟时间才能赶上区块链上的最新区块。 此时，您的输出将开始如下所示：

```bash
INFO [11-18|16:06:04.025] Imported new block headers               count=2   elapsed=6.253ms   number=4456862 hash=ce0a0b…6ab128
INFO [11-18|16:06:27.819] Imported new block headers               count=2   elapsed=5.982ms   number=4456864 hash=04a054…b4f661
INFO [11-18|16:06:34.080] Imported new block headers               count=2   elapsed=4.774ms   number=4456866 hash=15a43c…efc782
INFO [11-18|16:06:45.464] Imported new block headers               count=2   elapsed=5.213ms   number=4456868 hash=eb02d5…227564
INFO [11-18|16:07:11.630] Imported new block headers               count=2   elapsed=5.835ms   number=4456870 hash=67daa7…66892d
```

此时，消息将开始每 10-30 秒传入一次，并且每条消息的`count`值将都是个位数。

## 区块链和 EVM 的数据存储在哪里？ {#where-is-the-blockchain-and-evm-data-stored}

Geth 用于存储原始区块链数据的目录取决于您的操作系统。 在运行 Geth 时，查找如下所示的消息

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

`“database=”`后面的路径应该会告诉您区块链数据存储在您的机器上的何处。 如果您运行的是完整节点，则此目录将包含有关已提交到区块链的每个区块的所有数据。 因为我们正在运行轻节点，此目录仅包含区块头。

这里值得强调的是，这是区块链能够维持活跃度的最低限度。 区块链的完整内容和 EVM 状态存储在以太网络中的每个完整节点上，存储在与您计算机上的目录非常相似的目录中。

## 附加到 Javascript 控制台 {#attaching-to-the-javascript-console}

除非我们能够与节点真正交互，否则运行节点没有用处。 例如，我们可能想要广播交易请求或查看 EVM/区块链数据（例如帐户余额）。 Geth 有一个内置的 Javascript 控制台和一个名为[web3js](https://github.com/ethereum/web3.js/)的 Javascript API，您可以使用它与您的节点进行交互。

使用 Javascript 控制台：

1. 在终端窗口开始运行一个节点，不管是完整节点还是轻节点都可以。
2. 查找类似于如下的消息：

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

应在数据块同步开始之前记录此消息。

3. 此消息指明 IPC（进程间通信）端点的路径。 复制这个路径（在上面的示例中，它是 `/Userss/bgu/Library/Ethereum/testnet/geth.ipc`）。
4. 打开一个新的终端窗口或标签，然后运行以下命令： `$ geth attach [您的IPC端点路径]`

这应会打开 Javascript 控制台。 我们现在可以使用 web3js 与节点进行交互。

[完整 web3js 文档](http://web3js.readthedocs.io/)

以下是此 API 公开的一些有用的对象。 您可以通过在 Javascript 控制台中输入这些对象来访问它们。

- 如果您的节点已经开始但尚未完成区块同步，`eth.syncing` 返回一个对象；或者，如果它已完成同步或尚未启动，则返回`false`值。 如果节点仍在同步，`eth.syncing`会告诉您收到数据的最新区块编号，以及当前区块链中的区块总数。
- `net.peerCount`返回您连接到的对等点的数量。 如果此数量为 0，您可能需要等待几分钟，或者开始搜索解决方案（可能是防火墙或网络问题，或者其他问题）。
- `admin.peers`将列出您的节点所连接到的所有对等点。 如果列表为空，则说明您的节点未连接到任何其他对等点。

我们还可以使用 web3js 来初始化帐户、向网络写入和广播交易请求、查找帐户余额和元数据等等。 我们将在后面的部分中介绍这些操作；现在，尝试运行以下命令来查找我在 Ropsten 测试网上的一个帐户的余额：

```js
eth.getBalance('0x85d918c2B7F172d033D190152AEc58709Fb6D048')
# 截至11-18-2018，返回1059286000000000000。 此值以“Wei”为单位报告。
# 一个Wei的面值相当于10 ^-18 ETH（以太币）。
# 此帐户的以太币余额约为1.059eth。
```

## 停止和重启节点 {#stopping-and-restarting-your-node}

您可以随时通过按 `CTRL+C` 停止节点。 如果要重启节点，Geth 将需要几秒钟或几分钟来重新同步（从上次节点停止运行时停止的位置下载区块和/或区块头）。 如果上述任何指引均不起作用，您应首先尝试重启您的节点。

```bash
$ geth --ropsten --syncmode "light"
```

根据需要将“ropsten”替换为其他测试网的名称，或使用“主网”。

如果您对运行以太坊完整节点感兴趣，通常最好是从具有良好网络连接的专用计算机上运行，而不是从个人计算机上运行。 以下是使用 AWS 运行节点的指南（这有点过时了，所引用的 AMI 不再是最新或可用的，因此您可能需要做一些搜索）：[如何在 AWS 上运行节点](https://medium.com/mercuryprotocol/how-to-run-an-ethereum-node-on-aws-a8774ed3acf6)
