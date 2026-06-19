---
title: 更安全的以太坊
description: 以太坊是目前最安全、最去中心化的智能合约平台。然而，以太坊仍有改进空间，以确保在遥远的未来能够抵御任何级别的攻击。
lang: zh
image: /images/roadmap/roadmap-security.png
alt: "以太坊路线图"
template: roadmap
---

**以太坊已经是一个非常安全**、去中心化的[智能合约](/glossary/#smart-contract)平台。然而，以太坊仍有改进空间，以确保在遥远的未来能够抵御各种攻击。这些改进包括对[以太坊客户端](/glossary/#consensus-client)处理竞争[区块](/glossary/#block)方式的细微调整，以及提高网络将区块视为[“已最终确定”](/developers/docs/consensus-mechanisms/pos/#finality)（意味着除非攻击者承受极大的经济损失，否则无法更改）的速度。

还有一些改进通过让区块提议者无法看到其区块的实际内容，使得审查交易变得更加困难，并且提供了识别客户端何时进行审查的新方法。这些改进将共同升级[权益证明 (PoS)](/glossary/#pos)协议，以便从个人到企业的用户都能对他们在以太坊上的应用、数据和资产充满信心。

## 质押提款 {#staking-withdrawals}

从[工作量证明 (PoW)](/glossary/#pow)到权益证明 (PoS) 的升级始于以太坊先驱们在存款合约中“质押”他们的 ETH。这些 ETH 用于保护网络。2023 年 4 月 12 日进行了第二次更新，允许验证者提取已质押的 ETH。从那时起，验证者可以自由地质押或提取 ETH。

<ButtonLink variant="outline-color" href="/staking/withdrawals/">了解提款</ButtonLink>

## 抵御攻击 {#defending-against-attacks}

以太坊的权益证明 (PoS) 协议还有改进的空间。其中之一被称为[视图合并 (view-merge)](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739)——这是一种更安全的[分叉](/glossary/#fork)选择算法，使得某些复杂的攻击类型变得更加困难。

缩短以太坊[最终确定](/glossary/#finality)区块的时间将提供更好的用户体验，并防止复杂的“重组”攻击，在这种攻击中，攻击者试图重新排列最近的区块以提取利润或审查某些交易。[**单槽最终性 (SSF)**](/roadmap/single-slot-finality/)是**一种将最终确定延迟降至最低的方法**。目前，攻击者在理论上可以说服其他验证者重新配置长达 15 分钟的区块。有了 SSF，这个时间将变为 0。从个人到应用和交易所的用户，都能从交易不会被撤销的快速保证中受益，而网络也因消除了一整类攻击而受益。

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">了解单槽最终性</ButtonLink>

## 抵御审查 {#defending-against-censorship}

去中心化防止了个人或小部分[验证者](/glossary/#validator)群体变得过于具有影响力。新的质押技术有助于确保以太坊的验证者尽可能保持去中心化，同时保护他们免受硬件、软件和网络故障的影响。这包括在多个[节点](/glossary/#node)之间分担验证者责任的软件。这被称为**分布式验证者技术 (DVT)**。[质押池](/glossary/#staking-pool)有动力使用 DVT，因为它允许多台计算机共同参与验证，增加了冗余和容错能力。它还将验证者密钥分散在多个系统中，而不是由单个操作员运行多个验证者。这使得不诚实的操作员更难协调对以太坊的攻击。总的来说，这个想法是通过将验证者作为_社区_而不是个人来运行，从而获得安全收益。

<ButtonLink variant="outline-color" href="/staking/dvt/">了解分布式验证者技术</ButtonLink>

实施**提议者-构建者分离 (PBS)** 将大幅提高以太坊内置的抵御审查能力。PBS 允许一个验证者创建一个区块，并由另一个验证者在以太坊网络上广播它。这确保了从专业的利润最大化区块构建算法中获得的收益在网络中更公平地分享，**防止质押随着时间的推移集中**在表现最好的机构质押者手中。区块提议者可以选择由区块构建者市场提供给他们的最有利可图的区块。为了进行审查，区块提议者通常不得不选择一个利润较低的区块，这在**经济上是不理性的，而且对网络上的其他验证者来说也是显而易见的**。

PBS 还有一些潜在的附加功能，例如加密交易和包含列表，可以进一步提高以太坊的抗审查性。这些功能使得区块构建者和提议者无法看到其区块中包含的实际交易。

<ButtonLink variant="outline-color" href="/roadmap/pbs/">了解提议者-构建者分离</ButtonLink>

## 保护验证者 {#protecting-validators}

复杂的攻击者有可能识别出即将上任的验证者并向他们发送垃圾信息，以阻止他们提议区块；这被称为**拒绝服务 (DoS)** 攻击。实施[**秘密领导者选举 (SLE)**](/roadmap/secret-leader-election)将通过防止区块提议者被提前知晓来抵御此类攻击。它的工作原理是不断洗牌一组代表候选区块提议者的密码学承诺，并使用它们的顺序来决定选择哪个验证者，这种方式使得只有验证者自己才能提前知道他们的顺序。

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">了解秘密领导者选举</ButtonLink>

## 当前进展 {#current-progress}

**路线图上的安全升级正处于高级研究阶段**，但预计还需要一段时间才能实施。视图合并 (view-merge)、PBS、SSF 和 SLE 的下一步是最终确定规范并开始构建原型。