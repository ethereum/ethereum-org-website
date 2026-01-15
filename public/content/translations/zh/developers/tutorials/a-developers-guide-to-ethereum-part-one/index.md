---
title: 面向 Python 开发者的以太坊介绍，第一部分
description: 这是一篇介绍以太坊开发的文章，对那些熟悉 Python 编程语言的人来说尤其有用。
author: Marc Garreau
lang: zh
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

想必你已经听说过以太坊，那么，你准备好深入研究这个领域了吗？ 本篇文章将快速介绍一些区块链基础知识，然后让你与模拟的以太坊节点进行互动，比如读取区块数据、检查帐户余额和发送交易。 在这个过程中，我们会着重强调用传统方式构建应用与这种新的去中心化范式之间的差异。

## （软）前提条件 {#soft-prerequisites}

本文希望面向广大开发者。 本文会涉及 [Python 工具](/developers/docs/programming-languages/python/)，不过它们只是思想的载体，如果你不是 Python 开发者也没问题。 不过，我将对你已经了解的知识作一些假设，以便我们能够迅速地进入以太坊部分。

本文假定：

- 你熟悉终端操作，
- 你写过一些 Python 代码，
- 你的机器上安装了 Python 3.6 或更高版本（强烈建议使用[虚拟环境](https://realpython.com/effective-python-environment/#virtual-environments)），并且
- 你使用过 `pip` (Python 的软件包安装程序)。
  再次强调，如果你不符合其中任何一条，或者你不打算复现本文中的代码，你很可能仍然可以顺利地跟上进度。

## 区块链简介 {#blockchains-briefly}

描述以太坊有很多方法，但其核心还是区块链。 区块链由一系列区块组成，所以我们从区块开始讲起。 用最简单的话来说，以太坊区块链上的每个区块只是一些元数据和一个交易列表。 在 JSON 格式中，它看起来像这样：

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

每个[区块](/developers/docs/blocks/)都引用它前面的区块；`parentHash` 就是前一个区块的哈希。

<FeaturedText>注：以太坊广泛使用<a href="https://wikipedia.org/wiki/Hash_function">哈希函数</a>来生成固定大小的值（“哈希”）。 哈希在以太坊中扮演着重要角色，但暂时你可以放心地把它们看作是唯一 ID。</FeaturedText>

![描述区块链的示意图，其中包括每个区块内的数据](./blockchain-diagram.png)

_区块链本质上是一个链表；每个区块都有一个对前一个区块的引用。_

这种数据结构并不新颖，但治理网络的规则（即点对点协议）却很新颖。 区块链没有中央机构；网络中的对等节点必需协作以维持网络，并且通过竞争决定将哪些交易纳入下一个区块。 因此，当你想给朋友转账时，你需要将这笔交易广播到网络上，然后等待它被纳入即将产生的区块。

区块链验证资金确实从一个用户发送给另一个用户的唯一方法是使用该区块链原生货币（即，由该区块链创建和管理的货币）。 在以太坊，这种货币被称为以太币，以太坊区块链包含账户余额的唯一官方记录。

## 新范式 {#a-new-paradigm}

这种新的去中心化技术栈催生了新的开发者工具。 许多编程语言都有这样的工具，但我们将通过 Python 的视角来观察。 重申一下：即使 Python 不是你的首选语言，跟上文章也不会有什么太大的问题。

想要与以太坊进行交互的 Python 开发者可能会用到 [Web3.py](https://web3py.readthedocs.io/)。 Web3.py 是一个程序库，可以极大简化连接以太坊节点以及收发数据的过程。

<FeaturedText>注：“以太坊节点”和“以太坊客户端”可互换使用。 这两种说法都是指以太坊网络中参与者所运行的软件。 该软件可以读取区块数据，在新区块添加到链中时接收更新，广播新交易等等。 从技术角度讲，客户端是软件，节点是运行软件的计算机。</FeaturedText>

[以太坊客户端](/developers/docs/nodes-and-clients/)可配置为通过 [IPC](https://wikipedia.org/wiki/Inter-process_communication)、HTTP 或 Websockets 访问，因此 Web3.py 也需要进行相应配置。 Web3.py 将这些连接选项称为**提供者**。 你需要从三个提供者中选择一个来连接 Web3.py 实例和你的节点。

![描述 web3.py 如何使用 IPC 将你的应用程序连接到以太坊节点的示意图](./web3py-and-nodes.png)

_配置以太坊节点和 Web3.py 通过相同协议（例如本图中的 IPC）进行通信。_

正确配置了 Web3.py 之后，你就可以开始与区块链交互了。 下面是一些 Web3.py 使用示例，算是抛砖引玉：

```python
# 读取区块数据：
w3.eth.get_block('latest')

# 发送一笔交易：
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 安装 {#installation}

在这个演练中，我们仅在 Python 解释器中进行。 我们不会创建任何目录、文件、类或函数。

<FeaturedText>注：在下面的例子中，以“$”开头的命令是要在终端中运行的。 （不要输入 `$`，它只是表示行的开始。）</FeaturedText>

首先，安装 [IPython](https://ipython.org/)，以获得一个便于探索的用户友好环境。 IPython 提供了 tab 补全等功能，使得我们更容易看到 Web3.py 中有哪些可用方法。

```bash
pip install ipython
```

Web3.py 以 `web3` 的名称发布。 安装方式如下：

```bash
pip install web3
```

另外，我们后面要模拟一个区块链，这就需要更多依赖项。 可以通过下面的命令安装这些依赖项：

```bash
pip install 'web3[tester]'
```

你已经设置完毕！

请注意：`web3[tester]` 软件包最高支持 Python 3.10.xx

## 启动一个沙盒 {#spin-up-a-sandbox}

在终端中运行 `ipython`，打开一个新的 Python 环境。 这与运行 `python` 类似，但功能更丰富。

```bash
ipython
```

这将打印出一些关于你正在运行的 Python 和 IPython 版本的信息，然后你应该会看到一个等待输入的提示：

```python
In [1]:
```

你现在看到的是一个交互式的 Python shell， 从根本上说，这是一个沙盒。 如果你已经走到这一步，那么现在就可以导入Web3.py了：

```python
In [1]: from web3 import Web3
```

## Web3 模块简介 {#introducing-the-web3-module}

除了作为以太坊的网关，[Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 模块还提供了一些便捷函数。 让我们来探究探究。

在以太坊应用中，你通常需要转换货币面额。 Web3 模块为此提供了几个辅助方法：[from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) 和 [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei)。

<FeaturedText>
注：计算机不擅长处理十进制数学。 为了规避这个问题，开发者通常会以美分存储美元。 例如，价格为 5.99 美元的物品在数据库中存储为 599。

在以 <b>ETH</b> 处理交易时，也使用了类似的模式。 但是，ETH 不是只有两个小数位，而是有 18 位。 以太币的最小单位是 <b>wei</b>，因此发送交易时指定的是该值。

1 以太币 = 1000000000000000000 wei

1 wei = 0.000000000000000001 以太币

</FeaturedText>

试一下将一些数值转换为 wei 或反向转换。 请注意，在以太币和 wei 之间[还有许多其他面额单位的名称](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations)。 其中比较有名的是**gwei**，因为它通常用于表示交易费用。

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 模块上的其他实用方法包括数据格式转换器（例如 [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)）、地址辅助工具（例如 [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)）和哈希函数（例如 [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)）。 其中许多内容将在后面的系列文章中介绍。 要查看所有可用的方法和属性，可以利用 IPython 的自动补全功能，输入 `Web3`。 然后在点号后面按两次 tab 键。

## 与链对话 {#talk-to-the-chain}

这些便捷方法很棒，但我们还是继续来了解区块链吧。 接下来配置 Web3.py 与以太坊节点通信。 在这里，我们可以选择使用 IPC、HTTP 或 Websocket 提供者。

我们不会完整地进行这个步骤，但一个使用 HTTP 提供者的完整工作流程的例子可能如下所示：

- 下载一个以太坊节点，例如 [Geth](https://geth.ethereum.org/)。
- 在一个终端窗口启动 Geth，等待它同步网络。 默认的 HTTP 端口是 `8545`，但可以配置。
- 让 Web3.py 通过 HTTP 连接到 `localhost:8545` 上的节点。
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- 使用 `w3` 实例与节点交互。

虽然这是一种“真实”的方式，但同步过程需要几个小时，如果你只是想要一个开发环境，则没必要进行同步。 Web3.py 为此公开了第四个提供者，即 **EthereumTesterProvider**。 这个测试器提供者连接到一个模拟的以太坊节点，它有更宽松的权限，还有虚拟以太币可供操作。

![显示 EthereumTesterProvider 将你的 web3.py 应用程序链接到模拟以太坊节点的示意图](./ethereumtesterprovider.png)

_EthereumTesterProvider 连接到一个模拟节点，对于快速开发环境来说非常方便。_

这个模拟节点叫做 [eth-tester](https://github.com/ethereum/eth-tester)，我们已通过 `pip install web3[tester]` 命令将其安装。 配置 Web3.py 来使用这个测试器提供者很简单：

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

现在，你已经准备好在链上冲浪了！ 人们一般不这么说。 我刚编的。 我们来快速了解一下。

## 快速概览 {#the-quick-tour}

首先，我们来检查一下是否一切正常：

```python
In [5]: w3.is_connected()
Out[5]: True
```

由于我们使用的是测试器提供者，这不是一个非常有价值的测试，但如果它确实失败了，很可能是在实例化 `w3` 变量时发生了输入错误。 仔细检查你是否包含了内括号，即 `Web3.EthereumTesterProvider()`。

## 概览第一站：[账户](/developers/docs/accounts/) {#tour-stop-1-accounts}

为了方便起见，测试器提供者创建了一些帐户，并预先分配了测试以太币。

首先，我们来看看这些帐户的列表：

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

如果运行这个命令，你应该会看到一个以 `0x` 开头的十个字符串的列表。 每个都是一个**公共地址**，在某些方面类似于银行支票账户的账号。 如果有人要给你转 ETH，你可以把这个地址给他。

如前所述，测试提供者已经为这些帐户中的每一个帐户预分配了一些测试以太币。 我们来看看第一个帐户上有多少 ETH。

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

好多零啊！ 在你偷着乐之前，先回忆一下之前关于货币面额的介绍。 以太币值用最小的面额 wei 来表示。 将其转换为 ETH：

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

100 万测试以太币，也不算太寒酸。

## 概览第二站：区块数据 {#tour-stop-2-block-data}

我们来看看这个模拟区块链的状态：

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

这里返回了大量关于区块的信息，但这里只介绍以下几点：

- 该区块编号是零 —无论你在多久以前配置了测试器提供者。 与每 12 秒添加一个新区块的真实以太坊网络不同，此模拟区块链则需要你给它一些工作去做才添加区块。
- `transactions` 是一个空列表，原因相同：我们还没有做任何事情。 第一个区块是一个**空区块**，只是为了开个头。
- 注意，`parentHash` 只是一堆空的字节。 这标志着它是链条上的第一个区块，也就是所谓的**创世区块**。

## 概览第三站：[交易](/developers/docs/transactions/) {#tour-stop-3-transactions}

在没有待处理交易之前，我们停留在零区块处，所以我们给它一个交易。 从一个帐户向另一个帐户发送一些测试 ETH：

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

这时你通常会等上几秒钟，等待交易添加到新区块中。 完整的流程是这样的：

1. 提交交易并持有交易哈希。 在包含交易的区块被创建并广播之前，交易一直处于“待处理”状态。
   `tx_hash = w3.eth.send_transaction({ … })`
2. 等待交易被纳入区块：
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 继续应用逻辑。 要查看成功交易：
   `w3.eth.get_transaction(tx_hash)`

我们的模拟环境会在一个新的区块中即时添加交易，所以我们可以立即查看交易：

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

你将在这里看到一些熟悉的细节：`from`、`to` 和 `value` 字段应该与我们 `send_transaction` 调用的输入相匹配。 另一个令人欣慰的是，这项交易被列为 1 号区块内的第一笔交易（`'transactionIndex': 0`）。

我们也可以通过检查两个相关帐户的余额，轻松验证此次交易是否成功。 三个 ETH 应从一个帐户转移到另一个帐户。

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

后者看起来不错！ 余额从 1,000,000 增加到 1,000,003 个 ETH。 但第一个帐户发生了什么情况？ 它减少的数量看起来略大于三个 ETH？ 是的，没有免费的午餐，使用以太坊公网需要向为你提供支持的对等节点支付报酬。 从提交交易的帐户中扣除一小笔交易费用——这笔费用是燃料消耗量（ETH 转账需消耗 21000 单位燃料）乘以根据网络活动而变化的基本费用，再加上给将交易打包到区块中的验证者的小费。

更多关于[燃料](/developers/docs/gas/#post-london)的信息

<FeaturedText>注：在公共网络上，交易费用根据网络需求和你希望交易处理的速度而变化。 如果你对费用的计算方式感兴趣，请查看我之前关于<a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">如何将交易包含在一个区块中</a>的文章。</FeaturedText>

## 喘口气 {#and-breathe}

我们已经学习一段时间，现在可以休息一下。 要学习的内容还有很多，我们将在本系列的第二部分继续进行探索。 即将介绍的概念：连接真实节点、智能合约和代币。 仍有后续问题？ 请告诉我！ 你的反馈对我们今后的学习至关重要！ 欢迎通过 [Twitter](https://twitter.com/wolovim) 提出请求。
