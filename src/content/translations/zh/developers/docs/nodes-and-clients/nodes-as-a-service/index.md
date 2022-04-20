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

通常节点服务会运行各种[节点客户端](/developers/docs/nodes-and-clients/#execution-clients)和[各种节点](/developers/docs/nodes-and-clients/#node-types)，使得用户可以仅通过一个 API 获得全部和存档的节点。

值得注意的是，节点服务不会也不应该存储你的私钥或信息。

## 使用节点服务的好处是什么？ {#benefits-of-using-a-node-service}

使用节点服务的主要好处是不需要自己花费用来维护和管理节点的工程时间。 这使你能够专注于构建你的产品，而不必担心基础设施的维护。

从存储到带宽再到宝贵的工程时间，运行自己的节点都是非常昂贵的， 像在扩展时运转更多的节点、将节点升级到最新的版本以及确保状态的一致性，这些都会影响到你在所需的 web3 产品上的建设和花费的资源。

## 使用节点服务的缺点是什么？ {#cons-of-using-a-node-service}

使用了节点服务，意味着你产品的基础设施部分走向了集中化。 因此，那些把去中心化奉为圭臬的项目可能更喜欢自我托管的节点，而不是外包给第三方。

阅读更多关于[运行自己节点的好处](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 热门节点服务 {#popular-node-services}

这里列出了一些最受欢迎的以太坊节点服务提供商，如有缺失，随时添加！ 每个节点服务除了免费或付费等级外，还提供不同的福利和功能。 在做出决定之前，你应该调查哪些最符合你的需求。

- [**Alchemy**](https://www.alchemy.com/)
  - [相关文档](https://docs.alchemyapi.io/)
  - 特性
    - 免费等级选项
    - 随时扩展
    - 免费归档数据
    - 分析工具
    - 仪表板
    - 唯一 API 端点
    - 网钩
    - 点对点支持
- [**Ankr**](https://www.ankr.com/)
  - [相关文档](https://docs.ankr.com/)
  - 特性
    - Ankr 协议 - 为超过 8 条链提供公共 RPC API 端点
    - 负载平衡和节点健康监测，为最近的可用节点提供快速可靠的网关。
    - 支持 WSS 端点和无上限速率限制的高级层
    - 一键式全节点和验证者节点部署，可用于 40 多条链
    - 随时扩展
    - 分析工具
    - 仪表板
    - RPC、HTTP 和 WSS 端点
    - 点对点支持
- [**BlockDaemon**](https://blockdaemon.com/)
  - [相关文档](https://ubiquity.docs.blockdaemon.com/)
  - 优势
    - 仪表板
    - 基于每个节点
    - 数据分析
- [**ChainStack**](https://chainstack.com/)
  - [相关文档](https://docs.chainstack.com/)
  - 特性
    - 免费共享节点
    - 共享归档节点
    - GraphQL 支持
    - RPC 和 WSS 端点
    - 专用完整归档节点
    - 专用部署快速同步
    - 用自己的云服务
    - 按小时计费定价
    - 全天候点对点支持
- [**GetBlock**](https://getblock.io/)
  - [相关文档](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 特性
    - 接入 40 多个区块链节点
    - 40K 每日免费请求
    - 无限量 API 秘钥
    - 1GB/秒的高连接速度
    - 追踪 + 归档
    - 高级分析
    - 自动更新
    - 技术支持
- [**InfStones**](https://infstones.com/)
  - 特性
    - 免费层级选择
    - 随时扩展
    - 分析
    - 仪表板
    - 唯一 API 端点
    - 专用完整节点
    - 专用部署快速同步
    - 全天候点对点支持
    - 接入 50 多个区块链节点
- [**Infura**](https://infura.io/)
  - [相关文档](https://infura.io/docs)
  - 特性
    - 免费层级选择
    - 随时扩展
    - 付费归档数据
    - 点对点支持
    - 仪表板
- [**Moralis**](https://moralis.io/)
  - [相关文档](https://docs.moralis.io/)
  - 特性
    - 免费共享节点
    - 免费共享归档节点
    - 注重隐私（无日志政策）
    - 跨链支持
    - 随时扩展
    - 仪表板
    - 唯一以太坊 SDK
    - 唯一 API 端点
    - 直接技术支持
- [**Pocket Network**](https://www.pokt.network/)
  - [相关文档](https://docs.pokt.network/home/)
  - 功能
    - 去中心化 RPC 协议和市场
    - 每天一百万个免费层级请求（每个端点，最多 2 个）
    - [公共端点](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Pre-Stake+ 项目（如果需要每天超一百万次的请求）
    - 支持多于 15 个区块链
    - 6400 多个节点为应用程服务赚取 POKT
    - 归档节点，具有追踪及测试网节点支持的归档节点
    - 以太坊主网节点客户端多样性
    - 无单点故障
    - 零停机时间
    - 具有成本效益的近零通证经济（质押 POKT 获得网络带宽）
    - 没有每月沉没成本，将您的基础设施变成资产
    - 协议中规定的负载平衡
    - 每日请求数量和每小时节点数量无限变化
    - 最私密的抗审查选择
    - 实践型开发者支持
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 仪表板和分析
- [**QuikNode**](https://www.quiknode.io/)
  - 功能
    - 7 天免费试用
    - 多样化支持
    - Webhooks
    - 仪表板
    - 数据分析
- [**Rivet**](https://rivet.cloud/)
  - [相关文档](https://rivet.readthedocs.io/en/latest/)
  - 特性
    - 免费层级选择
    - 随时扩展
- [**SettleMint**](https://console.settlemint.com/)
  - [相关文档](https://docs.settlemint.com/)
  - 特性
    - 免费试用
    - 随时扩展
    - GraphQL 支持
    - RPC 和 WSS 端点
    - 专用完整节点
    - 用自己的云服务
    - 分析工具
    - 仪表板
    - 按小时计费定价
    - 点对点支持

## 延伸阅读 {#further-reading}

- [以太坊节点服务列表](https://ethereumnodes.com/)

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)

## 相关教程 {#related-tutorials}

- [使用 Alchemy 开始以太坊开发](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [使用 web3 和 Alchemy 发送交易指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
