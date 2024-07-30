---
title: 更安全的以太坊
description: 以太坊是现有的最安全和去中心化的智能合约平台。 不过，我们仍有改进空间，从而确保以太坊能够抵御未来任何程度的攻击。
lang: zh
image: /images/roadmap/roadmap-security.png
alt: "以太坊路线图"
template: roadmap
---

**以太坊已经是一个非常安全的**去中心化[智能合约](/glossary/#smart-contract)平台。 然而，我们仍可以进行一些改进，以确保以太坊能够抵御未来各种攻击。 这些改进包括对[以太坊客户端](/glossary/#consensus-client)处理竞争[区块](/glossary/#block)的方式进行微调，以及提高网络认为区块[“最终确定”](/developers/docs/consensus-mechanisms/pos/#finality)（这意味着在不对攻击者造成巨大经济损失的情况下无法改变区块）的速度。

此外，还可以进行一些改进，使审查交易变得更加困难，比如对区块提议者隐藏区块的实际内容，或者采用新的方法来识别客户端何时在审查。 这些改进将共同升级[权益证明](/glossary/#pos)协议，使从个人到企业在内的所有用户都对他们在以太坊上的应用程序、数据和资产随即产生信心。

## 质押提款 {#staking-withdrawals}

从[工作量证明](/glossary/#pow)升级到权益证明的过程始于以太坊的先驱们在存款合约中“质押”以太币。 这些以太币用于保护网络。 2023 年 4 月 12 日进行了第二次更新，允许提取质押的以太币。 自那时起，验证者可以自由地质押或提取以太币。

<ButtonLink variant="outline-color" href="/staking/withdrawals/">阅读关于提款的信息</ButtonLink>

## 防御攻击 {#defending-against-attacks}

可以对以太坊的权益证明协议进行一些改进。 其中一项称为[视图合并](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - 这是一种更安全的[分叉](/glossary/#fork)选择算法，可以增加实施某些复杂攻击的难度。

减少以太坊[最终确定](/glossary/#finality)区块所需的时间可以改善用户体验，并防止复杂的“重组”攻击，即攻击者试图重组最近的区块以获取利润或审查特定交易。 [**单时隙最终确定性 (SSF)**](/roadmap/single-slot-finality/) 是一种**尽可能减少最终确定延迟的方式**。 现在，攻击者理论上可以说服其他验证者重新配置 15 分钟的区块。 采用单时隙确定性后，该数值为 0。 从个人到应用程序和交易所，所有用户都可以从中受益，快速确保他们的交易不会被撤销，而网络也可以从中受益，防范一整类攻击。

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">了解单时隙确定性</ButtonLink>

## 防范审查 {#defending-against-censorship}

去中心化可以防止个人或一小部分[验证者](/glossary/#validator)的影响力过大。 新型质押技术有助于确保以太坊的验证者尽可能保持去中心化，同时还能防范硬件、软件和网络故障。 其中包括将验证者责任分散到多个[节点](/glossary/#node)的软件。 这被称为**分布式验证者技术 (DVT)**。 由于分布式验证者技术允许多台计算机共同参与验证，从而增加了冗余和容错性，因此我们鼓励[质押池](/glossary/#staking-pool)使用分布式验证者技术。 它还能将验证者密钥分散到多个系统中，而不是由一个运营商运行多个验证者。 这增加了不诚实运营商协调对以太坊的攻击的难度。 总之，它的想法是由_社区_而非个人运行验证者，从而提高安全性。

<ButtonLink variant="outline-color" href="/staking/dvt/">了解分布式验证者技术</ButtonLink>

实施**提议者-构建者器分离 (PBS)** 将大大提高以太坊对审查的固有防范能力。 提议者-构建者器分离可以让一个验证者创建区块，另一个验证者在以太坊网络中广播区块。 这可以确保在整个网络中更加公平地分享利润最大化的区块构建算法带来的收益，**防止质押随着时间的推移集中到表现最好的机构质押人**。 区块提议者可以从区块建造商市场中选择收益最高的区块。 要进行审查，区块提议者往往需要选择收益较低的区块，这**在经济上不合理，而且很容易被网络上的其他验证者发现**。

提议者-构建者器分离还有一些潜在的附件功能，如加密交易和纳入清单，可以进一步提高以太坊的抗审查性。 这使得区块构建者和提议者无法看到其区块中包含的实际交易。

<ButtonLink variant="outline-color" href="/roadmap/pbs/">了解提议者-构建者分离</ButtonLink>

## 保护验证者 {#protecting-validators}

老练的攻击者有可能识别出即将到来的验证者，并向它们发送垃圾邮件，以阻止它们提议区块。这被称为**拒绝服务 (DoS)**攻击。 实施[**秘密领袖选举 (SLE)**](/roadmap/secret-leader-election)可防止预先知道区块提议者，从而防范此类攻击。 其工作原理是对代表候选区块提议者的加密承诺进行不断混洗，并利用它们的顺序来决定选择哪个验证者，从而使验证者自己才能事先知道它们的顺序。

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">了解秘密领袖选举</ButtonLink>

## 当前进展 {#current-progress}

**路线图上的安全升级已进入高级研究阶段**，但预计在一段时间内不会实现。 视图合并、提议者-构建者器分离、单时隙确定性和秘密领袖选举的下一步工作是最终确定规范并开始构建原型。
