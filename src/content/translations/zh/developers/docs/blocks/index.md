---
title: 区块
description: 以太坊区块链中区块的概述 – 其数据结构、存在的意义以及区块如何生成
lang: zh
sidebar: true
---

区块是指一批交易的组合，并且包含链中上一个区块的哈希。 这将区块连接在一起（成为一个链），因为哈希是从区块数据中加密得出的。 这可以防止欺诈，因为以前的任何区块中的任何改变都会使后续所有区块无效，而且所有哈希都会改变，所有运行区块链的人都会注意到。

## 前置要求 {#prerequisites}

区块是一个对初学者非常友好的主题。 为了帮助您更好地理解这个页面，我们建议您先阅读[帐户](/developers/docs/accounts/)和我们的[以太坊简介](/developers/docs/intro-to-ethereum/)。

<!--The content below was provided by Brian Gu with exception of "what's in a block"-->

## 为什么要有区块？ {#why-blocks}

为了确保以太坊网络上的所有参与者保持同步状态并就交易的确切历史达成共识，我们将交易分为多个区块。 这意味着一次提交、商定和同步数十个（或数百个）交易。

![区块中的交易导致状态变化的图表](./tx-block.png) _图表来自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

通过间隔提交，即使交易请求每秒发生数十次，我们仍能给所有网络参与者足够的时间达成共识。 以太坊上的区块大约每十五秒提交一次。

## 区块如何工作 {#how-blocks-work}

为了保存交易历史，区块被严格排序（创建的每个新区块都包含一个其父块的引用），区块内的交易也严格排序。 除极少数情况外，在任何特定时间，网络上的所有参与者都同意区块的确切数目和历史， 并且正在努力将当前的活动交易请求分批到下一个区块。

一旦某个区块被网络上的某个矿工放在一起（挖矿），它就会传播到网络的其余部分； 所有节点都将此块添加到其区块链的末尾，并且继续挖掘。 目前，以太坊的“工作量证明”协议指定了确切的块组装（挖矿）过程和提交/共识过程。

### 视觉演示 {#a-visual-demo}

<iframe width="100%" height="315" src="https://www.youtube.com/embed/_160oMzblY8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## 工作量证明协议（POW） {#proof-of-work-protocol}

工作量证明是指：

- 挖矿节点必须花费可变但大量的能源、时间和计算能力，才能为试图提交给网络的区块生成“合法性证明”。 这可以帮助保护网络免受垃圾邮件/拒绝服务攻击等攻击，因为证书的生成成本很高。
- 其他矿工如果听说新区块拥有有效的合法性证书，则必须接受新区块作为区块链上的下一个规范区块。
- 特定矿工生成此证书所需的确切时间是一个随机变量，彼此差异很大。 这确保了两个矿工不太可能同时对提议的下一个区块产生验证；当矿工产生并传播一个经认证的新区块时，他们几乎可以肯定该区块将被网络接受为区块链上规范的下一个区块，没有冲突\*（尽管在几乎同时产生两个认证块链的情况下也有处理冲突的协议）。

[更多关于挖矿的信息](/developers/docs/consensus-mechanisms/pow/mining/)

## 区块包含什么？ {#block-anatomy}

- Timestamp 时间戳 – 该区块被开采的时间。
- Block number 区块编号 – 区块链长度（以区块数计算）。
- Difficulty 难度 – 挖掘该区块所需的努力。
- mixHash – 该区块的唯一标识符。
- A parent hash 父哈希值 – 前一区块的唯一标识符（这是区块形成链的方式）。
- Transactions list 交易列表 – 包含在区块中的交易列表。
- State root 状态根 – 包括系统的整个状态：帐户余额、合约存储、合约代码和帐户随机数值（account nonces）。
- Nonce – 一个哈希值，与 mixHash 结合，可以证明该方块经过了 [工作量证明](/developers/docs/consensus-mechanisms/pow/)。

## 区块大小 {#block-size}

最后一个重要的一点是，区块本身的大小是有界限的。 每个区块都有一个区块 Gas 上限，由网络和矿工集体设定：区块中所有交易所消耗的 Gas 总量必须小于区块 Gas 限制。 这很重要，因为它可以确保区块不能任意大。 如果块可以任意大， 由于空间和速度方面的要求，性能较差的完整节点将逐渐停止与网络保持联系。 区块 0 的区块 Gas 限制被初始化为 5,000；任何矿工都可以根据父区块的 Gas 限制，将新区块的 Gas 限制增加或减少约 0.1％。 截至 2018 年 11 月，Gas 限制值目前约为 8 000 000。

## 延伸阅读 {#further-reading}

_你知道有什么社区资源帮助过你吗？ 编辑并添加本页面！_

## 相关主题 {#related-topics}

- [挖矿](/developers/docs/consensus-mechanisms/pow/mining/)
- [交易](/developers/docs/transactions/)
- [Gas](/developers/docs/gas/)
