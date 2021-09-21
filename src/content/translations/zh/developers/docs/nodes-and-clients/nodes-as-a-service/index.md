---
title: 节点服务
description: 节点服务及其利弊和主流供应商的入门级概述。
lang: zh
sidebar: true
sidebarDepth: 2
---

## 介绍 {#Introduction}

运行自己的以太坊节点可能会比较困难，特别是在刚开始时或在快速扩展时。 许多服务都可以为你运行优化的节点基础设施，藉此，你可以专注于开发你的应用程序或产品。 我们将解释节点服务运行的原理以及它们的优缺点，如果有兴趣着手开始，我们将为你列出供应商。

## 前置要求 {#prerequisites}

如果你还不了解什么是节点和客户端，请查看[节点和客户端](/developers/docs/nodes-and-clients/)。

## 节点服务运作原理 {#how-do-node-services-work}

节点服务提供商在幕后为你运行分布式节点客户端，因此你就不必做这些了。

这些服务通常提供一个您可以用来写入和读取区块链 API 密钥。 除了主网之外，通常还包括对以太坊测试网的访问。

有些服务提供由他们替你管理的你自己的专用节点，而另外一些服务则使用负载均衡器在各节点之间分配活动。

几乎所有的节点服务都非常容易集成，只需要在你的代码中修改一行，就可以换掉你自己的托管节点，甚至可以在服务本身之间切换。

通常情况下，节点服务会运行各种节点客户端和类型，除了在一个 API 中的客户端特定方法外，还允许你访问全节点和存档节点。

值得注意的是，节点服务不会也不应该存储你的私钥或信息。

## 使用节点服务的好处是什么？ {#benefits-of-using-a-node-service}

使用节点服务的主要好处是不需要自己花费用来维护和管理节点的工程时间。 这使你能够专注于构建你的产品，而不必担心基础设施的维护。

从存储到带宽再到宝贵的工程时间，运行自己的节点都是非常昂贵的， 像在扩展时运转更多的节点、将节点升级到最新的版本以及确保状态的一致性，这些都会影响到你在所需的 web3 产品上的建设和花费的资源。

## 使用节点服务的缺点是什么？ {#cons-of-using-a-node-service}

使用了节点服务，意味着你产品的基础设施部分走向了集中化。 因此，那些把去中心化奉为圭臬的项目可能更喜欢自我托管的节点，而不是外包给第三方。

阅读更多关于[运行自己节点的好处](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 热门节点服务 {#popular-node-services}

这里列出了一些最受欢迎的以太坊节点服务提供商，如有缺失，随时添加！ 每个节点服务除了免费或付费等级外，还提供不同的福利和功能。 在做出决定之前，你应该调查哪些最符合你的需求。

- [**Alchemy**](https://alchemyapi.io/)
  - [相关文档](https://docs.alchemyapi.io/)
  - 特性
    - 免费等级选项
    - 随时扩展
    - 免费归档数据
    - 分析工具
    - 管理面板
    - 唯一 API 终点
    - 网钩
    - 点对点支持
- [**Infura**](https://infura.io/)
  - [相关文档](https://infura.io/docs)
  - 特性
    - 免费等级选项
    - 随时扩展
    - 付费归档数据
    - 点对点支持
    - 管理面板
- [**QuikNode**](https://www.quiknode.io/)
  - 特性
    - 7 天免费试用
    - 差异化支持
    - 网钩
    - 管理面板
    - 数据分析
- [**Rivet**](https://rivet.cloud/)
  - [相关文档](https://rivet.readthedocs.io/en/latest/)
  - 特性
    - 免费等级选项
    - 随时扩展
- [**BlockDaemon**](https://blockdaemon.com/)
  - [相关文档](https://ubiquity.docs.blockdaemon.com/)
  - 优势
    - 管理面板
    - 基于每个节点
    - 数据分析

## 延伸阅读 {#further-reading}

- [以太坊节点服务列表](https://ethereumnodes.com/)

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)

## 相关教程 {#related-tutorials}

- [使用 Alchemy 开始以太坊开发](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [使用 web3 和 Alchemy 发送交易指南](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
