---
title: "Python 开发者以太坊入门指南（第一部分）"
description: "以太坊开发简介，特别适合具备 Python 编程语言知识的开发者"
author: "马克·加罗"
lang: zh
tags: ["Python", "web3.py"]
skill: beginner
breadcrumb: "使用 Python 开发以太坊"
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

那么，你已经听说过以太坊，并准备好一探究竟了吗？本文将快速介绍一些区块链基础知识，然后带你与一个模拟的以太坊节点进行交互——读取区块数据、检查账户余额以及发送交易。在此过程中，我们将重点介绍传统应用程序构建方式与这种全新的去中心化范式之间的区别。

## （软）先决条件 {#soft-prerequisites}

本文旨在让广大开发者都能轻松理解。其中会涉及 [Python 工具](/developers/docs/programming-languages/python/)，但它们只是表达概念的载体——如果你不是 Python 开发者也没关系。不过，我会假设你已经具备一些基础知识，以便我们能快速进入以太坊相关的部分。

假设条件：

- 你能在终端中进行基本操作，
- 你写过几行 Python 代码，
- 你的机器上安装了 Python 3.6 或更高版本（强烈建议使用[虚拟环境](https://realpython.com/effective-python-environment/#virtual-environments)），并且
- 你使用过 Python 的包安装程序 `pip`。
  再次强调，即使你不满足上述任何条件，或者不打算重现本文中的代码，你也很可能可以毫无障碍地跟上进度。

## 区块链简介 {#blockchains-briefly}

描述以太坊的方式有很多，但其核心是一个区块链。区块链由一系列区块组成，所以让我们从这里开始。简单来说，以太坊区块链上的每个区块只是一些元数据和交易列表。它的 JSON 格式看起来像这样：

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

每个[区块](/developers/docs/blocks/)都包含对前一个区块的引用；`parentHash` 仅仅是前一个区块的哈希。

<FeaturedText>注意：以太坊经常使用<a href="https://wikipedia.org/wiki/Hash_function">哈希函数</a>来生成固定大小的值（“哈希”）。哈希在以太坊中扮演着重要角色，但你现在可以放心地将它们视为唯一 ID。</FeaturedText>

![A diagram depicting a blockchain including the data inside  each block](./blockchain-diagram.png)

_区块链本质上是一个链表；每个区块都有对前一个区块的引用。_

这种数据结构并不新奇，但管理网络的规则（即点对点协议）却是全新的。这里没有中央权威机构；对等节点网络必须协作以维持网络运行，并竞争决定将哪些交易包含在下一个区块中。因此，当你想给朋友汇款时，你需要将该交易广播到网络，然后等待它被包含在即将生成的区块中。

区块链验证资金是否真正从一个用户发送到另一个用户的唯一方法，是使用该区块链原生的（即由其创建和管理的）货币。在以太坊中，这种货币被称为以太币，而以太坊区块链包含账户余额的唯一官方记录。

## 一种新范式 {#a-new-paradigm}

这种全新的去中心化技术栈催生了新的开发者工具。许多编程语言中都存在此类工具，但我们将从 Python 的角度进行探讨。再次重申：即使 Python 不是你首选的语言，跟上进度也不会有太大困难。

想要与以太坊交互的 Python 开发者很可能会使用 [Web3.py](https://web3py.readthedocs.io/)。Web3.py 是一个库，它极大地简化了连接以太坊节点以及向其发送和接收数据的方式。

<FeaturedText>注意：“以太坊节点”和“以太坊客户端”通常可以互换使用。无论哪种情况，它都指的是以太坊网络参与者运行的软件。该软件可以读取区块数据、在链上添加新区块时接收更新、广播新交易等。从技术上讲，客户端是软件，而节点是运行该软件的计算机。</FeaturedText>

[以太坊客户端](/developers/docs/nodes-and-clients/)可以配置为通过 [IPC](https://wikipedia.org/wiki/Inter-process_communication)、HTTP 或 Websockets 进行访问，因此 Web3.py 需要与此配置保持一致。Web3.py 将这些连接选项称为**提供者 (providers)**。你需要选择这三种提供者之一，将 Web3.py 实例与你的节点连接起来。

![A diagram showing how web3.py uses IPC to connect your application to an Ethereum node](./web3py-and-nodes.png)

_配置以太坊节点和 Web3.py 以通过相同的协议进行通信，例如本图中的 IPC。_

正确配置 Web3.py 后，你就可以开始与区块链进行交互了。以下是几个 Web3.py 的使用示例，作为后续内容的预览：

```python
# 读取区块数据：
w3.eth.get_block('latest')

# 发送交易：
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 安装 {#installation}

在本演练中，我们将仅在 Python 解释器中工作。我们不会创建任何目录、文件、类或函数。

<FeaturedText>注意：在下面的示例中，以 `$` 开头的命令旨在在终端中运行。（不要输入 `$`，它只是表示行的开始。）</FeaturedText>

首先，安装 [IPython](https://ipython.org/) 以获得一个用户友好的探索环境。IPython 提供了 Tab 键自动补全等功能，让你更容易了解 Web3.py 中可用的操作。

```bash
pip install ipython
```

Web3.py 以 `web3` 的名称发布。像这样安装它：

```bash
pip install web3
```

还有一件事——我们稍后将模拟一个区块链，这需要几个额外的依赖项。你可以通过以下方式安装它们：

```bash
pip install 'web3[tester]'
```

一切准备就绪！

注意：`web3[tester]` 包最高支持 Python 3.10.xx 版本。

## 启动沙盒 {#spin-up-a-sandbox}

在终端中运行 `ipython` 打开一个新的 Python 环境。这类似于运行 `python`，但附带了更多实用功能。

```bash
ipython
```

这将打印出有关你正在运行的 Python 和 IPython 版本的一些信息，然后你应该会看到一个等待输入的提示符：

```python
In [1]:
```

你现在看到的是一个交互式 Python shell。本质上，它是一个供你游玩的沙盒。如果你已经进行到这一步，是时候导入 Web3.py 了：

```python
In [1]: from web3 import Web3
```

## Web3 模块简介 {#introducing-the-web3-module}

除了作为通往以太坊的网关之外，[Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 模块还提供了一些便捷函数。让我们来探索几个。

在以太坊应用程序中，你通常需要转换货币面额。Web3 模块专门为此提供了几个辅助方法：[from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) 和 [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei)。

<FeaturedText>
注意：众所周知，计算机在处理小数数学运算方面表现不佳。为了解决这个问题，开发者通常以美分为单位存储美元金额。例如，价格为 5.99 美元的商品在数据库中可能存储为 599。

在处理<b>以太币</b>交易时也使用了类似的模式。然而，以太币不是两位小数，而是 18 位！以太币的最小面额称为 <b>Wei</b>，因此在发送交易时指定的就是这个值。

1 ether = 1000000000000000000 wei

1 wei = 0.000000000000000001 ether

</FeaturedText>

尝试将一些值与 Wei 进行相互转换。请注意，在以太币和 Wei 之间[有许多面额名称](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations)。其中最著名的一个是 **Gwei**，因为它通常用于表示交易费。

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 模块上的其他实用方法包括数据格式转换器（例如 [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)）、地址辅助工具（例如 [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)）和哈希函数（例如 [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)）。其中许多内容将在本系列的后续部分中介绍。要查看所有可用的方法和属性，请利用 IPython 的自动补全功能：输入 `Web3`. 并在句点后按两次 Tab 键。

## 与链对话 {#talk-to-the-chain}

便捷方法很棒，但让我们继续探讨区块链。下一步是配置 Web3.py 以与以太坊节点进行通信。在这里，我们可以选择使用 IPC、HTTP 或 Websocket 提供者。

我们不会采用这种方式，但使用 HTTP 提供者的完整工作流程示例可能如下所示：

- 下载一个以太坊节点，例如 [Geth](https://geth.ethereum.org/)。
- 在一个终端窗口中启动 Geth 并等待它同步网络。默认的 HTTP 端口是 `8545`，但可以进行配置。
- 告诉 Web3.py 通过 HTTP 连接到 `localhost:8545` 上的节点。
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- 使用 `w3` 实例与节点进行交互。

虽然这是一种“真实”的操作方式，但同步过程需要数小时，如果你只是想要一个开发环境，则完全没有必要。为此，Web3.py 暴露了第四种提供者，即 **EthereumTesterProvider**。这个测试提供者链接到一个模拟的以太坊节点，该节点具有宽松的权限和用于测试的假币。

![A diagram showing the EthereumTesterProvider linking your web3.py application to a simulated Ethereum node](./ethereumtesterprovider.png)

_EthereumTesterProvider 连接到一个模拟节点，非常适合快速搭建开发环境。_

那个模拟节点被称为 [eth-tester](https://github.com/ethereum/eth-tester)，我们在执行 `pip install web3[tester]` 命令时已经安装了它。配置 Web3.py 以使用此测试提供者非常简单：

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

现在你已经准备好在链上冲浪了！其实没人这么说，我刚编的。让我们快速浏览一下。

## 快速浏览 {#the-quick-tour}

首先，进行一次健全性检查：

```python
In [5]: w3.is_connected()
Out[5]: True
```

由于我们使用的是测试提供者，这并不是一个非常有价值的测试，但如果它确实失败了，很可能是你在实例化 `w3` 变量时输入有误。仔细检查你是否包含了内层括号，即 `Web3.EthereumTesterProvider()`。

## 第一站：[账户](/developers/docs/accounts/) {#tour-stop-1-accounts}

为了方便起见，测试提供者创建了一些账户，并为它们预充了测试以太币。

首先，让我们看看这些账户的列表：

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

如果你运行此命令，你应该会看到一个包含十个以 `0x` 开头的字符串列表。每一个都是一个**公共地址**，在某些方面类似于支票账户的账号。你可以将此地址提供给想要向你发送以太币的人。

如前所述，测试提供者已经为每个账户预充了一些测试以太币。让我们看看第一个账户里有多少钱：

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

好多零啊！在你高兴地跑去假银行之前，回想一下之前关于货币面额的课程。以太币的值以最小面额 Wei 表示。将其转换为以太币：

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

一百万测试以太币——依然相当可观。

## 第二站：区块数据 {#tour-stop-2-block-data}

让我们看一眼这个模拟区块链的状态：

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

关于区块会返回很多信息，但这里只指出几点：

- 区块号为零——无论你多久前配置了测试提供者。与每 12 秒添加一个新区块的真实以太坊网络不同，此模拟将一直等待，直到你给它分配任务。
- `transactions` 是一个空列表，原因相同：我们还没有做任何事情。这第一个区块是一个**空区块**，仅仅是为了启动链。
- 请注意，`parentHash` 只是一堆空字节。这表明它是链中的第一个区块，也称为**创世区块**。

## 第三站：[交易](/developers/docs/transactions/) {#tour-stop-3-transactions}

在有待处理交易之前，我们将一直停留在区块零，所以让我们发起一笔交易。将一些测试以太币从一个账户发送到另一个账户：

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

通常在这个时候，你需要等待几秒钟，让你的交易被包含在一个新区块中。完整的过程大致如下：

1. 提交交易并保留交易哈希。在包含该交易的区块被创建并广播之前，该交易处于“待处理”状态。
   `tx_hash = w3.eth.send_transaction({ … })`
2. 等待交易被包含在区块中：
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 继续应用程序逻辑。要查看成功的交易：
   `w3.eth.get_transaction(tx_hash)`

我们的模拟环境会立即将交易添加到一个新区块中，因此我们可以立即查看该交易：

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

你会在这里看到一些熟悉的细节：`from`、`to` 和 `value` 字段应与我们调用 `send_transaction` 时的输入相匹配。另一个令人欣慰的地方是，这笔交易作为第一笔交易（`'transactionIndex': 0`）被包含在 1 号区块中。

我们还可以通过检查涉及的两个账户的余额来轻松验证此交易是否成功。应该有三个以太币从一个账户转移到了另一个账户。

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

后者看起来不错！余额从 1,000,000 变成了 1,000,003 以太币。但是第一个账户怎么了？它似乎损失了略多于三个以太币。唉，天下没有免费的午餐，使用以太坊公共网络需要你补偿对等节点所提供的支持。提交交易的账户被扣除了一小笔交易费——这笔费用是消耗的 Gas 量（ETH 转账为 21000 单位 Gas）乘以根据网络活动变化的的基础费用，再加上支付给将交易包含在区块中的验证者的优先费。

了解更多关于 [Gas](/developers/docs/gas/#post-london) 的信息

<FeaturedText>注意：在公共网络上，交易费是可变的，具体取决于网络需求以及你希望交易被处理的速度。如果你对费用计算的详细分类感兴趣，请参阅我之前关于<a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">交易如何被包含在区块中</a>的文章。</FeaturedText>

## 稍作休息 {#and-breathe}

我们已经进行了一段时间，所以现在似乎是个休息的好时机。探索之旅还在继续，我们将在本系列的第二部分中继续深入。接下来的一些概念包括：连接到真实节点、智能合约和代币。有后续问题吗？请告诉我！你的反馈将影响我们接下来的方向。欢迎通过[推特](https://twitter.com/wolovim)提出请求。