---
title: "节点即服务"
description: "节点服务的入门级概述、优缺点以及热门提供商。"
lang: zh
sidebarDepth: 2
---

## 简介 {#introduction}

运行你自己的[以太坊节点](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)可能具有挑战性，尤其是在刚开始或快速扩展时。有[许多服务](#popular-node-services)可以为你运行优化的节点基础设施，因此你可以专注于开发你的应用或产品。我们将解释节点服务的工作原理、使用它们的优缺点，并列出提供商，以供有兴趣开始使用的用户参考。

## 前提条件 {#prerequisites}

如果你还不了解什么是节点和客户端，请查看[节点和客户端](/developers/docs/nodes-and-clients/)。

## 质押者 {#stakoooooooooooooors}

单独质押者必须运行自己的基础设施，而不是依赖第三方提供商。这意味着运行一个执行客户端并结合一个共识客户端。在[合并](/roadmap/merge)之前，可以只运行共识客户端并使用中心化提供商获取执行数据；这现在已不再可能——单独质押者必须同时运行两个客户端。然而，有一些服务可以简化这个过程。

[阅读更多关于运行节点的信息](/developers/docs/nodes-and-clients/run-a-node/)。

本页描述的服务适用于非质押节点。

## 节点服务是如何工作的？ {#how-do-node-services-work}

节点服务提供商在后台为你运行分布式节点客户端，因此你无需自己运行。

这些服务通常提供一个 API 密钥，你可以使用它来向区块链写入和读取数据。除了主网之外，它们通常还包括对[以太坊测试网](/developers/docs/networks/#ethereum-testnets)的访问。

一些服务为你提供由他们管理的专用节点，而另一些服务则使用负载均衡器在节点之间分配活动。

几乎所有的节点服务都非常容易集成，只需在代码中更改一行即可替换自托管节点，甚至在服务本身之间进行切换。

通常，节点服务会运行各种[节点客户端](/developers/docs/nodes-and-clients/#execution-clients)和[类型](/developers/docs/nodes-and-clients/#node-types)，允许你在一个 API 中访问全节点和归档节点以及客户端特定的方法。

需要注意的是，节点服务不会也不应该存储你的私钥或信息。

## 使用节点服务有什么好处？ {#benefits-of-using-a-node-service}

使用节点服务的主要好处是不必花费工程时间自己维护和管理节点。这使你能够专注于构建产品，而不必担心基础设施的维护。

运行自己的节点可能非常昂贵，从存储到带宽再到宝贵的工程时间。在扩展时启动更多节点、将节点升级到最新版本以及确保状态一致性等事情，可能会分散你构建和将资源投入到所需的 Web3 产品上的注意力。

## 使用节点服务有什么缺点？ {#cons-of-using-a-node-service}

通过使用节点服务，你正在将产品的基础设施方面中心化。因此，将去中心化视为重中之重的项目可能更喜欢自托管节点，而不是外包给第三方。

阅读更多关于[运行自己的节点的好处](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 热门节点服务 {#popular-node-services}

以下是一些最受欢迎的以太坊节点提供商列表，欢迎补充任何遗漏的提供商！除了免费或付费层级之外，每个节点服务都提供不同的优势和功能，在做出决定之前，你应该调查哪些最适合你的需求。

- [**Alchemy**](https://alchemy.com/)
  - [文档](https://www.alchemy.com/docs/)
  - 功能
    - 最大的免费层级，每月 3 亿个计算单元（约 3000 万次 getLatestBlock 请求）
    - 支持 Polygon、Starknet、Optimism、Arbitrum 等多链
    - 为约 70% 的最大以太坊去中心化应用 (dapp) 和去中心化金融 (DeFi) 交易量提供支持
    - 通过 Alchemy Notify 提供实时 Webhook 警报
    - 一流的支持和可靠性/稳定性
    - Alchemy 的 NFT API
    - 带有请求浏览器、内存池观察器和 Composer 的仪表板
    - 集成的测试网水龙头访问
    - 拥有 1.8 万用户的活跃 Discord 构建者社区

- [**Allnodes**](https://www.allnodes.com/)
  - [文档](https://docs.allnodes.com/)
  - 功能
    - 使用在 Allnodes 投资组合页面上创建的 PublicNode 代币没有速率限制。
    - 在 [PublicNode](https://www.publicnode.com) 上提供注重隐私的免费 RPC 端点（100 多条区块链）
    - 为 90 多条区块链提供无速率限制的专用节点
    - 为 30 多条区块链提供专用归档节点
    - 在 3 个地区（美国、欧盟、亚洲）可用
    - 在 [PublicNode](https://www.publicnode.com/snapshots) 上提供 100 多条区块链的快照
    - 24/7 技术支持，99.90%-99.98% 的正常运行时间 SLA（取决于计划）。
    - 按小时计费
    - 使用信用卡、贝宝或加密货币支付

- [**All That Node**](https://allthatnode.com/)
  - [文档](https://docs.allthatnode.com/)
  - 功能
    - 免费层级每天 50,000 次请求
    - 支持 40 多种协议
    - 支持 JSON-RPC（EVM、Tendermint）、REST 和 Websocket API
    - 无限制访问归档数据
    - 24/7 技术支持和超过 99.9% 的正常运行时间
    - 多链可用的水龙头
    - 无限制的端点访问和无限数量的 API 密钥
    - 支持 Trace/Debug API
    - 自动更新

- [**Amazon Managed Blockchain**](https://aws.amazon.com/managed-blockchain/)
  - [文档](https://aws.amazon.com/managed-blockchain/resources/)
  - 功能
    - 完全托管的以太坊节点
    - 在六个地区可用
    - 基于 HTTP 和安全 WebSockets 的 JSON-RPC
    - 支持 3 条链
    - SLA，AWS 24/7 支持
    - Go以太坊 (Geth) 和莱特豪斯

- [**Ankr**](https://www.ankr.com/)
  - [文档](https://docs.ankr.com/)
  - 功能
    - Ankr 协议 - 开放访问 8 条以上链的公共 RPC API 端点
    - 负载均衡和节点健康监控，提供通往最近可用节点的快速可靠网关
    - 高级层级支持 WSS 端点和无上限速率限制
    - 一键部署 40 多条链的全节点和验证者节点
    - 按需扩展
    - 分析工具
    - 仪表板
    - RPC、HTTPS 和 WSS 端点
    - 直接支持

- [**Blast**](https://blastapi.io/)
  - [文档](https://docs.blastapi.io/)
  - 功能
    - 支持 RPC 和 WSS
    - 多区域节点托管
    - 去中心化基础设施
    - 公共 API
    - 专属免费计划
    - 多链支持（17 条以上区块链）
    - 归档节点
    - 24/7 Discord 支持
    - 24/7 监控和警报
    - 总体 SLA 为 99.9%
    - 使用加密货币支付

- [**BlockDaemon**](https://blockdaemon.com/)
  - [文档](https://ubiquity.docs.blockdaemon.com/)
  - 优势
    - 仪表板
    - 按节点计费
    - 分析

- [**BlockPI**](https://blockpi.io/)
  - [文档](https://docs.blockpi.io/)
  - 功能
    - 强大且分布式的节点结构
    - 多达 40 个 HTTPS 和 WSS 端点
    - 免费注册套餐和月度套餐
    - 支持 Trace 方法 + 归档数据
    - 套餐有效期长达 90 天
    - 自定义计划和按需付费
    - 使用加密货币支付
    - 直接支持和技术支持

- [**Chainbase**](https://www.chainbase.com/)
  - [文档](https://docs.chainbase.com)
  - 功能
    - 高可用、快速且可扩展的 RPC 服务
    - 多链支持
    - 免费资费
    - 用户友好的仪表板
    - 提供除 RPC 之外的区块链数据服务

- [**Chainstack**](https://chainstack.com/)
  - [文档](https://docs.chainstack.com/)
  - 功能
    - 免费共享节点
    - 共享归档节点
    - 支持 GraphQL
    - RPC 和 WSS 端点
    - 专用全节点和归档节点
    - 专用部署的快速同步时间
    - 自带云
    - 按小时计费
    - 24/7 直接支持

- [**dRPC**](https://drpc.org/)
  - [文档](https://drpc.org/docs)
  - NodeCloud：即插即用的 RPC 基础设施，起价 10 美元——全速，无限制
  - NodeCloud 功能：
    - 支持 185 个网络的 API
    - 40 多个提供商的分布式池
    - 覆盖全球的九 (9) 个地理集群
    - AI 驱动的负载均衡系统
    - 按需付费的统一价格——不涨价、不过期、无锁定
    - 无限密钥、细粒度密钥调整、团队角色、前端保护
    - 方法统一费率，每种方法 20 个计算单元 (CU)
    - [公共端点链列表](https://drpc.org/chainlist)
    - [定价计算器](https://drpc.org/pricing#calculator)
  - NodeCore：面向希望获得完全控制权的组织的开源堆栈

- [**GetBlock**](https://getblock.io/)
  - [文档](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 功能
    - 访问 40 多条区块链节点
    - 每天 4 万次免费请求
    - 无限数量的 API 密钥
    - 1GB/秒的高连接速度
    - Trace+归档
    - 高级分析
    - 自动更新
    - 技术支持

- [**InfStones**](https://infstones.com/)
  - 功能
    - 免费层级选项
    - 按需扩展
    - 分析
    - 仪表板
    - 独特的 API 端点
    - 专用全节点
    - 专用部署的快速同步时间
    - 24/7 直接支持
    - 访问 50 多条区块链节点

- [**Infura**](https://infura.io/)
  - [文档](https://infura.io/docs)
  - 功能
    - 免费层级选项
    - 按需扩展
    - 付费归档数据
    - 直接支持
    - 仪表板

- [**Kaleido**](https://kaleido.io/)
  - [文档](https://docs.kaleido.io/)
  - 功能
    - 免费入门层级
    - 一键部署以太坊节点
    - 可定制的客户端和算法（Geth、Quorum 和贝苏 || PoA、IBFT 和 Raft）
    - 500 多个管理和服务 API
    - 用于以太坊交易提交的 RESTful 接口（由 Apache Kafka 支持）
    - 用于事件传递的出站流（由 Apache Kafka 支持）
    - 深入收集“链下”和辅助服务（例如，双边加密消息传输）
    - 具有治理和基于角色的访问控制的简单网络用户引导
    - 针对管理员和最终用户的复杂用户管理
    - 高度可扩展、有弹性、企业级的基础设施
    - 云 HSM 私钥管理
    - 以太坊主网锚定
    - ISO 27k 和 SOC 2 Type 2 认证
    - 动态运行时配置（例如，添加云集成、更改节点入口等）
    - 支持多云、多区域和混合部署编排
    - 基于 SaaS 的简单按小时定价
    - SLA 和 24x7 支持

- [**Lava Network**](https://www.lavanet.xyz/)
  - [文档](https://docs.lavanet.xyz/)
  - 功能
    - 免费测试网使用
    - 去中心化冗余以实现高正常运行时间
    - 开源
    - 完全去中心化的 SDK
    - Ethers.js 集成
    - 直观的项目管理界面
    - 基于共识的数据完整性
    - 多链支持

- [**Moralis**](https://moralis.io/)
  - [文档](https://docs.moralis.io/)
  - 功能
    - 免费共享节点
    - 免费共享归档节点
    - 注重隐私（无日志政策）
    - 跨链支持
    - 按需扩展
    - 仪表板
    - 独特的以太坊 SDK
    - 独特的 API 端点
    - 直接的技术支持

- [**NodeReal MegaNode**](https://nodereal.io/)
  - [文档](https://docs.nodereal.io/docs/introduction)
  - 功能
    - 可靠、快速且可扩展的 RPC API 服务
    - 面向 Web3 开发者的增强型 API
    - 多链支持
    - 免费开始使用

- [**NodeFlare**](https://nodeflare.app/)
  - [文档](https://nodeflare.app/docs/quick-start)
  - 功能
    - 8 条 EVM 链，包括以太坊、Base、Arbitrum One 和 Optimism
    - 4 个区域（欧洲、亚洲、北美），自动故障转移到最近的健康节点
    - 免费公共端点（无 API 密钥）+ 每月 300 万计算单元的免费计划
    - 计算单元计费——只为你使用的内容付费，较重的调用成本更高
    - 付费计划无节流

- [**NOWNodes**](https://nownodes.io/)
  - 功能
    - 访问 50 多条区块链节点
    - 免费 API 密钥
    - 区块浏览器
    - API 响应时间 ⩽ 1 秒
    - 24/7 支持团队
    - 个人客户经理
    - 共享、归档、备份和专用节点

- [**Pocket Network**](https://www.pokt.network/)
  - [文档](https://docs.pokt.network/)
  - 功能
    - 去中心化 RPC 协议和市场
    - 每天 100 万次请求的免费层级（每个端点，最多 2 个）
    - Pre-Stake+ 计划（如果你每天需要超过 100 万次请求）
    - 支持 15 条以上区块链
    - 6400 多个节点通过为应用提供服务赚取 POKT
    - 支持归档节点、带 Tracing 的归档节点和测试网节点
    - 以太坊主网节点客户端多样性
    - 无单点故障
    - 零停机时间
    - 具有成本效益的近零代币经济学（质押一次 POKT 即可获得网络带宽）
    - 无每月沉没成本，将你的基础设施转化为资产
    - 协议内置负载均衡
    - 按需无限扩展每天的请求数和每小时的节点数
    - 最私密、抗审查的选项
    - 实践开发者支持
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 仪表板和分析

- [**QuickNode**](https://www.quicknode.com)
  - [文档](https://www.quicknode.com/docs/)
  - 功能
    - 24/7 技术支持和开发者 Discord 社区
    - 地理均衡、多云/裸机、低延迟网络
    - 多链支持（Optimism、Arbitrum、Polygon + 其他 11 条链）
    - 用于速度和稳定性的中间层（调用路由、缓存、索引）
    - 通过 Webhooks 进行智能合约监控
    - 直观的仪表板、分析套件、RPC composer
    - 高级安全功能（JWT、掩码、白名单）
    - NFT 数据和分析 API
    - [SOC2 认证](https://www.quicknode.com/security)
    - 适合从开发者到企业的各类用户

- [**Rivet**](https://rivet.cloud/)
  - [文档](https://rivet.readthedocs.io/en/latest/)
  - 功能
    - 免费层级选项
    - 按需扩展

- [**SenseiNode**](https://senseinode.com)
  - [文档](https://docs.senseinode.com/)
  - 功能
    - 专用和共享节点
    - 仪表板
    - 在拉丁美洲不同地点的多个托管提供商上脱离 AWS 托管
    - 普莱斯姆和莱特豪斯客户端

- [**SettleMint**](https://console.settlemint.com/)
  - [文档](https://docs.settlemint.com/)
  - 功能
    - 免费试用
    - 按需扩展
    - 支持 GraphQL
    - RPC 和 WSS 端点
    - 专用全节点
    - 自带云
    - 分析工具
    - 仪表板
    - 按小时计费
    - 直接支持

- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [文档](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 功能
    - 免费层级，包括每月 2500 万个 Tenderly 单元
    - 免费访问历史数据
    - 读密集型工作负载速度提升高达 8 倍
    - 100% 一致的读取访问
    - JSON-RPC 端点
    - 基于 UI 的 RPC 请求构建器和请求预览
    - 与 Tenderly 的开发、调试和测试工具紧密集成
    - 交易模拟
    - 使用情况分析和过滤
    - 轻松的访问密钥管理
    - 通过聊天、电子邮件和 Discord 提供专门的工程支持

- [**Tokenview**](https://services.tokenview.io/)
  - [文档](https://services.tokenview.io/docs?type=nodeService)
  - 功能
    - 24/7 技术支持和开发者电报社区
    - 多链支持（比特币、以太坊、Tron、BNB Smart Chain、以太坊经典）
    - RPC 和 WSS 端点均开放使用
    - 无限制访问归档数据 API
    - 带有请求浏览器和内存池观察器的仪表板
    - NFT 数据 API 和 Webhook 通知
    - 使用加密货币支付
    - 对额外行为要求的外部支持

- [**Watchdata**](https://watchdata.io/)
  - [文档](https://docs.watchdata.io/)
  - 功能
    - 数据可靠性
    - 无停机时间的不间断连接
    - 流程自动化
    - 免费资费
    - 适合任何用户的高限制
    - 支持各种节点
    - 资源扩展
    - 高处理速度

- [**ZMOK**](https://zmok.io/)
  - [文档](https://docs.zmok.io/)
  - 功能
    - 抢跑即服务
    - 具有搜索/过滤方法的全球交易内存池
    - 发送交易的无限交易费用和无限 Gas
    - 最快获取新区块和读取区块链
    - 保证每次 API 调用的最佳价格

- [**Zeeve**](https://www.zeeve.io/)
  - [文档](https://www.zeeve.io/docs/)
  - 功能
    - 企业级无代码自动化平台，提供区块链节点和网络的部署、监控和管理
    - 支持 30 多种协议和集成，并不断增加
    - 增值 Web3 基础设施服务，如去中心化存储、去中心化身份和用于现实世界用例的区块链账本数据 API
    - 24/7 支持和主动监控始终确保节点的健康。
    - RPC 端点提供对 API 的经过身份验证的访问，通过直观的仪表板和分析实现无忧管理。
    - 提供托管云和自带云选项供选择，并支持所有主要云提供商，如 AWS、Azure、Google Cloud、Digital Ocean 和本地部署。
    - 我们使用智能路由，每次都命中离你的用户最近的节点


## 延伸阅读 {#further-reading}

- [以太坊节点服务列表](https://ethereumnodes.com/)

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)

## 相关教程 {#related-tutorials}

- [使用 Alchemy 开始以太坊开发](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [使用 Web3 和 Alchemy 发送交易指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)