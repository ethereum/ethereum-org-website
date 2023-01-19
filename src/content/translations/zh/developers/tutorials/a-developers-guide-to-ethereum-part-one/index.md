---
title: 面向 Python 开发者的以太坊介绍，第一部分
description: 这是一篇介绍以太坊开发的文章，对那些熟悉 Python 编程语言的人来说尤其有用。
author: Marc Garreau
lang: zh
tags:
  - "入门指南"
  - "python"
  - "区块链"
  - "web3.py"
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

想必您已经听说过以太坊，那么，您准备好投身于这个领域了吗？ 本篇文章将快速介绍一些区块链基础知识，然后让您与模拟的以太坊节点进行互动，比如读取区块数据、检查账户余额和发送交易。 在这个过程中，我们会着重强调用传统方式构建应用与这种新的去中心化范式之间的差异。

## （软）前提条件 {#soft-prerequisites}

本文希望面向所有开发者。 在文章里会涉及 [Python 工具](/developers/docs/programming-languages/python/)，不过它们只是思想的载体，如果您不是 Python 开发者也没有问题。 不过，我将对您已经了解的知识作一些假设，以便我们能够迅速地进入以太坊部分。

本文假定：

- 您熟悉终端操作，
- 您写过一些 Python 代码，
- 您的机器上有安装 Python 3.6 或更高版本 (强烈推荐使用 [虚拟环境](https://realpython.com/effective-python-environment/#virtual-environments) )，并且
- 您使用过 `pip`，Python 的软件包安装程序。 再次强调，如果您不符合其中任何一条，或者您不打算敲本文中的代码，您照着学仍然可以学得很好。

## 区块链简述 {#blockchains-briefly}

描述以太坊有很多方法，但其核心还是区块链。 区块链由一系列区块组成，所以让我们从区块链开始。 用最简单的话来说，以太坊区块链上的每个区块只是一些元数据和一个交易的列表。 在 JSON 格式中，它看起来像这样：

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

每个 [块](/developers/docs/blocks/) 会引用它前面的区块； `parentHash` 是前一个区块的哈希值。

<div class="featured">注：以太坊广泛使用<a href="https://wikipedia.org/wiki/Hash_function">哈希函数</a>来生成固定大小的值（“哈希”）。 哈希值在以太坊中发挥着重要作用，但您现在可以放心地将其视为是唯一的 ID 值。</div>

![描述区块链的示意图，其中包括每个区块内的数据](./blockchain-diagram.png)

_区块链本质上是一个链表；每个区块都有一个对前一个区块的引用。_

这种数据结构并不新颖，但治理网络的规则（即点对点协议）却很新颖。 区块链没有中央机构；网络中的对等节点必需协作以维持网络，并且通过竞争决定将哪些交易纳入下一个区块。 因此，当您想给朋友转账时，您需要将这笔交易广播到网络上，然后等待它被纳入即将产生的区块。

区块链验证资金确实从一个用户发送给另一个用户的唯一方法是使用该区块链原生货币（即，由该区块链创建和管理的货币）。 在以太坊，这种货币被称为 ETH，以太坊区块链是账户余额的唯一正式记录。

## 一种新范式 {#a-new-paradigm}

这种新的去中心化技术栈催生了新的开发者工具。 许多编程语言都有这样的工具，但我们将通过 Python 的视角来观察。 重申一下：即使 Python 不是您的首选语言，跟上文章也不会有什么太大的问题。

想要与以太坊进行互动的 Python 开发人员可能会接触到 [Web3.py](https://web3py.readthedocs.io/)。 Web3.py 是一个库，可以帮助我们简化连接以太坊节点，以及发送和接收数据。

<div class="featured">注：“以太坊节点”和“以太坊客户端”可互换使用。 这两种说法都是指以太坊网络中参与者所运行的软件。 该软件可以读取区块数据，在新区块添加到链中时接收更新，广播新交易等等。 从技术角度讲，客户端是软件，节点是运行软件的计算机。</div>

[以太坊客户端](/developers/docs/nodes-and-clients/)可以配置为通过[进程间通信 (IPC)](https://wikipedia.org/wiki/Inter-process_communication)、超文本传输协议 (HTTP) 或网络套接字 (Websockets) 进行访问，因此 Web3.py 也需要完成这个配置。 Web3.py 将这些连接选项称为**提供者**。 您需要从三个提供者中选择一个来连接 Web3.py 实例和您的节点。

![描述 web3.py 如何使用 IPC 将应用程序连接到以太坊节点的示意图](./web3py-and-nodes.png)

_将以太坊节点和 Web3.py 配置为通过相同通信的协议（例如，本图中的 IPC）进行通信。_

正确配置了 Web3.py 之后，您就可以开始与区块链交互了。 下面是一些 Web3.py 使用示例，算是抛砖引玉：

```python
# read block data:
w3.eth.get_block('latest')

# send a transaction:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## 安装 {#installation}

在这个演练中，我们仅在 Python 解释器中进行。 我们不会创建任何目录、文件、类或函数。

<div class="featured">注：在下面的例子中，以“$”开头的命令是要在终端中运行的。 （不要输入 `$`，它只是表示行的开始。）</div>

首先，安装 [IPython](https://ipython.org/)，以方便用户在其中进行探索。 IPython 提供了 tab 补全等功能，使得我们更容易看到 Web3.py 中有哪些可用方法。

```bash
$ pip install ipython
```

Web3.py 以 `web3` 的名称发布。 安装方式如下：

```bash
$ pip install web3
```

另外，我们后面要模拟一个区块链，这就需要更多依赖项。 可以通过下面的命令安装这些依赖项：

```bash
$ pip install 'web3[tester]'
```

您已经设置完毕！

## 开启沙盒环境 {#spin-up-a-sandbox}

在终端中运行 `ipython`，打开一个新的 Python 环境。 这与运行 `python` 类似，但更友好。

```bash
$ ipython
```

这将打印出一些关于您正在运行的 Python 和 IPython 版本的信息，然后您应该会看到一个等待输入的提示：

```python
In [1]:
```

您现在看到的是一个交互式的 Python shell， 实际上，它是一个沙盒。 如果您已经做到了这一点，现在可以导入 Web3.py 了：

```python
In [1]: from web3 import Web3
```

## Web3 模块介绍 {#introducing-the-web3-module}

除了作为以太坊的网关， [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) 模块还提供了一些便利的功能。 让我们来探究探究。

在以太坊应用中，您通常需要转换货币面额。 Web3 模块为此提供几个辅助方法： [fromWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.fromWei) 和 [toWei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toWei)。

<div class="featured">
注：计算机不擅长处理十进制数学。 为了规避这个问题，开发者通常会以美分存储美元。 例如，价格为 5.99 美元的物品在数据库中存储为 599。

在以 <b>ETH</b> 处理交易时，也使用了类似的模式。 但是，ETH 不是只有两个小数位，而是有 18 位。 ether 的最小单位是 <b>wei</b>，所以发送交易时指定的就是这个值。

1 ETH = 1000000000000000000 wei

1 wei = 0.000000000000000001 ETH

</div>

试一下将一些数值转换为 wei 或反向转换。 请注意， [ETH 和 wei 之间还有其他面额](https://web3py.readthedocs.io/en/stable/examples.html#converting-currency-denominations)名称。 其中比较有名的是 **gwei**，因为它通常用于表示交易费用。

```python
In [2]: Web3.toWei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.fromWei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Web3 模块上的其他实用方法包括数据格式转换器（例如 [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)），地址助手，（例如 [`is address`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)），以及哈希函数（例如 [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)）。 其中许多内容将在后面的系列文章中介绍。 要查看所有可用的方法和属性，可以利用 IPython 的自动补全功能，输入 `Web3`。 然后在点号后面按两次 tab 键。

## 与链交互 {#talk-to-the-chain}

方便的方法很受欢迎，但让我们继续来说区块链。 接下来配置 Web3.py 与以太坊节点通信。 在这里，我们可以选择使用 IPC、HTTP 或 Websocket 提供者。

我们不会完整地进行这个步骤，但一个使用 HTTP 提供者的完整工作流程的例子可能如下所示：

- 下载一个以太坊节点，例如 [Geth](https://geth.ethereum.org/)。
- 在一个终端窗口启动 Geth，等待它同步网络。 默认的 HTTP 端口是 `8545`，但可以配置成其它端口。
- 告诉 Web3.py 通过 HTTP 连接到节点，使用 `localhost:8545`。 `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- 使用 `w3` 实例与节点交互。

虽然这是一种“正式”的方式，但同步过程需要几个小时，如果您只是想要一个开发环境，则没有必要同步过程。 Web3.py 为此公开了第四个提供者，即 **EthereumTesterProvider**。 这个测试器提供者连接到一个模拟的以太坊节点，它有更宽松的权限，还有虚拟以太币可供操作。

![描述将 web3.py 应用程序连接到模拟以太坊节点的 EthereumTesterProvider 的示意图](./ethereumtesterprovider.png)

_EthereumTesterProvider 连接到一个模拟节点，对于快速开发环境来说非常方便。_

这个模拟节点叫做 [eth-tester](https://github.com/ethereum/eth-tester)，我们把它作为 `pip install web3[tester]` 命令的一部分进行安装。 配置 Web3.py 来使用这个测试器提供者很简单：

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

现在，您已经准备好在链上冲浪了！ 这不是人们常说的以太链。 我只是虚构了它。 我们来快速了解一下。

## 快速了解 {#the-quick-tour}

第一件事，先进行连接检查。

```python
In [5]: w3.isConnected()
Out[5]: True
```

由于我们使用的是测试器提供者，这不是一个非常有价值的测试，但如果它确实失败了，很可能是在实例化 `w3` 变量时发生了输入错误。 仔细检查您是否包含了内括号，即 `Web3.EthereumTesterProvider()`。

## 第一站：[帐户 ](/developers/docs/accounts/) {#tour-stop-1-accounts}

为了方便起见，测试器提供者创建了一些帐户，并预先分配了测试以太币。

首先，我们来看看这些帐户的列表：

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

如果运行这个命令，您应该会看到一个以 `0x` 开头的十个字符串的列表。 每一个字符串都是一个的**公共地址**，在某些方面，类似于支票帐户上的帐号。 如果有人要给您转 ETH，您可以把这个地址给他。

如前所述，测试提供者已经为这些账户中的每一个账户预分配了一些测试以太币。 我们来看看第一个帐户上有多少 ETH。

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

好多零啊！ 在你一路笑醒之前，先回忆一下之前关于货币面额的介绍。 ETH 币值用最小的面额 wei 来表示。 将其转换为 ETH：

```python
In [8]: w3.fromWei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

100 万测试以太币，也不算太寒酸。

## 第二站：区块数据 {#tour-stop-2-block-data}

我们来看看这个模拟区块链的状态。

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

- 该区块编号是零  —无论您在多久以前配置了测试器提供者。 与每 12 秒添加一个新区块的真实以太坊网络不同，此模拟区块链则需要你给它一些工作去做才添加区块。
- `transactions` 是一个空列表，原因相同：我们还没有做任何事情。 第一个区块是一个**空区块**，只是为了开个头。
- 注意，`parentHash` 只是一堆空的字节。 这标志着它是链条上的第一个区块，也就是所谓的**创世区块**。

## 第三站：[ 交易 ](/developers/docs/transactions/) {#tour-stop-3-transactions}

在没有待处理交易之前，我们停留在零区块处，所以我们给它一个交易。 从一个账户向另一个账户发送一些测试 ETH：

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.toWei(3, 'ether'),
   'gas': 21000
})
```

这时你通常会等上几秒钟，等待交易添加到新区块中。 完整的流程是这样的：

1. 提交交易并持有交易哈希。 在包含交易的区块被创建并广播之前，交易一直处于“待处理”状态。 `tx_hash = w3.eth.send_transaction({ … })`
2. 等待交易添加到区块中： `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. 继续应用逻辑。 查看成功的交易：`w3.eth.get_transaction(tx_hash)`

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

您将在这里看到一些熟悉的细节：`from`、`to `和 `value `字段应该与 `send_transaction `调用的输入相匹配。 另一个令人欣慰的是，这项交易被列为 1 号区块内的第一笔交易（`'transactionIndex': 0`）。

我们也可以通过检查两个相关帐户的余额，轻松验证此次交易是否成功。 三个 ETH 应从一个帐户转移到另一个帐户。

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999999999999969000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

后者看起来不错！ 余额从 1000000 增加到 1000003 个 ETH。 但第一个账户发生了什么情况？ 它减少的数量看起来略大于三个 ETH？ 是的，没有免费的午餐，使用以太坊公网需要支付矿工手续费， 一笔小额交易费从进行交易的帐户中扣除，金额为 31000 wei。

<div class="featured">注：在公共网络上，交易费用根据网络需求和您希望交易处理的速度而变化。 如果您对费用的计算方式感兴趣，请查看我之前关于<a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">如何将交易包含在一个区块中</a>的文章。</div>

## 结尾 {#and-breathe}

我们已经学习一段时间，现在可以休息一下。 要学习的内容还有很多，我们将在本系列的第二部分继续进行探索。 探索这些概念：连接真实节点、智能合约和代币， 仍有后续问题？ 请告诉我！ 您的反馈对我们今后的学习至关重要！ 欢迎通过 [Twitter](https://twitter.com/wolovim) 与我联系。
