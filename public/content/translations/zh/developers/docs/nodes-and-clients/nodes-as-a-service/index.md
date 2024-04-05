---
title: 节点即服务
description: 节点服务及其利弊和主流供应商的入门级概述。
lang: zh
sidebarDepth: 2
---

## 简介 {#Introduction}

运行自己的 [以太坊](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients)节点可能会比较困难，特别是在刚开始时或在快速扩展时。 [许多服务](#popular-node-services)都可以为你运行优化的节点基础设施，藉此，你可以专注于开发你的应用程序或产品。 我们将解释节点服务运行的原理以及它们的优缺点，并列出供应商，如果有兴趣，就着手开始吧。

## 前提条件 {#prerequisites}

如果你还不了解什么是节点和客户端，请查看[节点和客户端](/developers/docs/nodes-and-clients/)。

## 质押人 {#stakoooooooooooooors}

单独的质押人必须运行自己的基础设施，而不是依赖第三方提供商。 这意味着运行一个执行客户端和一个共识客户端。 在[合并](/roadmap/merge)之前，可以只运行共识客户端并通过中心化的提供商来获取执行数据；但现在已不存在这种情况——单独的质押人必须同时运行两种客户端。 但是，有一些服务可以简化这个过程。

[阅读有关运行节点的更多信息](/developers/docs/nodes-and-clients/run-a-node/)。

本页描述的服务适用于非质押节点。

## 节点服务运作原理 {#how-do-node-services-work}

节点服务提供商在幕后为你运行分布式节点客户端，因此你无需自己运行。

这些服务通常提供一个可用来写入和读取区块链的应用程序接口密钥。 除了主网之外，通常还包括[以太坊测试网](/developers/docs/networks/#ethereum-testnets)访问权限。

有些服务提供你自己的专用节点但由他们代为管理，而另外一些服务则使用负载均衡器在各节点之间分配活动。

几乎所有的节点服务都非常容易集成，只需要在你的代码中修改一行，就可以替换你自己的托管节点，甚至可以在服务本身之间切换。

通常节点服务会运行各种[节点客户端](/developers/docs/nodes-and-clients/#execution-clients)和[节点](/developers/docs/nodes-and-clients/#node-types)，使得用户可以通过一个应用程序接口访问全节点和归档节点以及客户端特定方法。

值得注意的是，节点服务不存储也不应该存储你的私钥或信息。

## 使用节点服务的好处是什么？ {#benefits-of-using-a-node-service}

使用节点服务的主要好处是不需要耗费工程时间来自己维护和管理节点。 这样，你就能够专注于构建自己的产品，而不必担心基础设施维护。

无论是存储或带宽方面，还是宝贵的工程时间，运行自己的节点代价非常高昂。 在扩容时运行更多节点、将节点升级到最新版本以及确保状态一致性等等，这些事情让用户无法集中精力构建并将资源应用于自己喜爱的 Web3 产品上。

## 使用节点服务的缺点是什么？ {#cons-of-using-a-node-service}

使用节点服务，你产品的基础设施部分走向了中心化。 因此，可能更喜欢对那些极为注重去中心化的项目采用自我托管节点，而不是外包给第三方。

详细了解[运行自己节点的好处](/developers/docs/nodes-and-clients/#benefits-to-you)。

## 主流节点服务 {#popular-node-services}

下面列出了一些最受欢迎的以太坊节点服务提供商，如有遗漏，欢迎随时补充！ 每种节点服务除了免费或付费层级外，还提供各种好处和功能。做出决定之前，你应该调查哪些服务最符合自己的需求。

- [**Alchemy**](https://alchemy.com/)
  - [相关文档](https://docs.alchemyapi.io/)
  - 特性
    - 最大的免费层级，每月有 3 亿个计算单元（约 3000 万个 getLatestBlock 请求）
    - 对 Polygon、Starknet、Optimism、Arbitrum 的多链支持
    - 为大约 70% 的以太坊去中心化应用程序和去中心化金融最大交易量提供支持
    - 通过 Alchemy Notify 发布实时网络钩子警报
    - 一流的支持和可靠性/稳定性
    - Alchemy 的非同质化代币应用程序接口
    - 带有 Request Explorer、Mempool Watcher 和 Composer 的仪表板
    - 集成了测试网水龙头访问权限
    - 拥有 1.8 万用户的活跃 Discord 构建者社区
- [**All That Node**](https://allthatnode.com/)
  - [相关文档](https://docs.allthatnode.com/)
  - 功能
    - 最大型免费套餐，每天可处理多达 150,000 个请求
    - 访问超过 24 个区块链节点
    - 远程过程调用、安全套接字层超文本传输协议和网络套接字安全端点
    - 无限制访问归档数据
    - 全天候支持以及超过 99.9% 的正常运行时间
    - 多链水龙头
    - 使用不受数量限制的应用程序接口密钥无限次访问端点
    - 追踪/调试可用的命名空间
    - 自动更新
    - 技术支持
- [**Ankr**](https://www.ankr.com/)
  - [相关文档](https://docs.ankr.com/)
  - 特性
    - Ankr 协议 - 在超过 8 条链上开放式访问公共远程过程调用应用程序接口端点
    - 通过负载均衡和节点健康监测，为最近可用节点提供快速可靠的网关
    - 启用网络套接字安全端点和无速率上限的高级套餐
    - 一键式全节点和验证者节点部署，可用于 40 多条链
    - 随时扩容
    - 分析工具
    - 仪表板
    - RPC 、 HTTPS 和 WSS 端点
    - 直接支持
- [**Blast**](https://blastapi.io/)
  - [相关文档](https://docs.blastapi.io/)
  - 特性
    - 远程过程调用和网络套接字安全支持
    - 多区域节点托管
    - 去中心化基础设施
    - 公共应用程序接口
    - 专用免费计划
    - 多链支持（超过 17 条区块链）
    - 归档节点
    - 全天候 Discord 支持
    - 全天候监控和提醒
    - 整体服务等级协议 99.9%
    - 加密货币支付
- [**BlockDaemon**](https://blockdaemon.com/)
  - [相关文档](https://ubiquity.docs.blockdaemon.com/)
  - 好处
    - 管理面板
    - 基于每个节点
    - 分析
- [**BlockPI**](https://blockpi.io/)
  - [相关文档](https://docs.blockpi.io/)
  - 特性
    - 稳健的分布式节点结构
    - 多达 40 个安全套接字层超文本传输协议和网络套接字安全端点
    - 免费注册套餐和月度套餐
    - 追踪方法 + 归档数据支持
    - 套餐有效期最长为 90 天
    - 自定义计划和随用随付的付款方式
    - 加密货币支付
    - 直接支持与技术支持
- [**ChainStack**](https://chainstack.com/)
  - [相关文档](https://docs.chainstack.com/)
  - 特性
    - 免费共享节点
    - 共享归档节点
    - GraphQL 支持
    - 远程过程调用和网络套接字安全端点
    - 专用全节点和归档节点
    - 专用部署的快速同步时间
    - 使用自己的云服务
    - 按小时计费定价
    - 全天候直接支持
- [**DataHub**](https://datahub.figment.io)
  - [相关文档](https://docs.figment.io/)
  - 特性
    - 每月 3 百万个请求的免费套餐选项
    - RPC 、 HTTPS 和 WSS 端点
    - 专用全节点和归档节点
    - 自动扩容（容量折扣）
    - 免费归档数据
    - 服务分析
    - 仪表板
    - 全天候直接支持
    - 加密货币支付（企业）
- [DRPC](https://drpc.org/)
  - [相关文档](https://docs.drpc.org/)
  - 功能
    - 去中心化远程过程调用节点
    - 超过 15 个节点提供商
    - 节点平衡
    - 免费套餐每月计算单元无限制
    - 数据验证
    - 自定义端点
    - 超文本传输协议和网络套接字安全端点
    - 无限密钥（免费和付费套餐）
    - 灵活的回退选项
    - [公共端点](https://eth.drpc.org)
    - 免费共享归档节点
- [**GetBlock**](https://getblock.io/)
  - [文档](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - 特性
    - 访问超过 40 个区块链节点
    - 4 万个每日免费请求
    - 无限数量的应用程序接口密钥
    - 1GB/秒的高速连接
    - 追踪 + 归档
    - 高级分析
    - 自动更新
    - 技术支持
- [**InfStones**](https://infstones.com/)
  - 特性
    - 免费套餐选项
    - 随时扩容
    - 分析
    - 仪表板
    - 独有的应用程序接口端点
    - 专用全节点
    - 专用部署的快速同步时间
    - 全天候直接支持
    - 访问超过 50 个区块链节点
- [**Infura**](https://infura.io/)
  - [相关文档](https://infura.io/docs)
  - 功能
    - 免费套餐选项
    - 随时扩容
    - 付费归档数据
    - 直接支持
    - 仪表板
- [**Kaleido**](https://kaleido.io/)
  - [相关文档](https://docs.kaleido.io/)
  - 功能
    - 免费初学者套餐
    - 一键部署以太坊节点
    - 可自定义的客户端和算法（Geth、Quorum 和 Besu || PoA、IBFT 和 Raft）
    - 500 多个管理和服务应用程序接口
    - 用于提交以太坊交易的 RESTful 接口（支持 Apache Kafka）
    - 用于事件传送的出站流（支持 Apache Kafka）
    - “脱链”和辅助服务的深度集合（例如双边加密消息传输）
    - 简单明了的配置入网，提供治理和基于角色的访问控制
    - 适用于管理员和最终用户的精细用户管理
    - 高度可扩展、复原力强的企业级基础设施
    - Cloud HSM 私钥管理
    - 以太坊主网网络共享
    - ISO 27k 和 SOC 2 Type 2 认证
    - 动态运行时配置（例如添加云集成、更改节点入口等）
    - 支持多云端、多区域及混合部署编排
    - 简单的基于质押即服务 (SaaS) 的每小时定价
    - 服务等级协议和全天候支持
- [**Lava Network**](https://www.lavanet.xyz/)
  - [相关文档](https://docs.lavanet.xyz/)
  - 功能
    - 免费使用测试网
    - 适用于高正常运行时间的去中心化冗余
    - 开源
    - 完全去中心化的软件开发工具包
    - Ethers.js 集成
    - 直观的项目管理界面
    - 基于共识的数据完整性
    - 多链支持
- [**Moralis**](https://moralis.io/)
  - [相关文档](https://docs.moralis.io/)
  - 功能
    - 免费共享节点
    - 免费共享归档节点
    - 注重隐私（无日志政策）
    - 跨链支持
    - 随时扩容
    - 仪表板
    - 独特的以太坊软件开发工具包
    - 独有的应用程序接口端点
    - 直接技术支持
- [**NodeReal MegaNode**](https://nodereal.io/)
  - [相关文档](https://docs.nodereal.io/nodereal/meganode/introduction)
  - 功能
    - 可靠、快速而且可扩展的远程过程调用应用程序接口服务
    - 面向 Web3 开发者的增强型应用程序接口
    - 多链支持
    - 免费试用
- [**NOWNodes**](https://nownodes.io/)
  - [相关文档](https://documenter.getpostman.com/view/13630829/TVmFkLwy)
  - 功能
    - 访问超过 50 个区块链节点
    - 免费应用程序接口密钥
    - 区块浏览器
    - 应用程序接口响应时间 ⩽ 1秒
    - 全天候支持团队
    - 个人帐户经理
    - 共享、归档、备份和专用节点
- [**Pocket Network**](https://www.pokt.network/)
  - [相关文档](https://docs.pokt.network/home/)
  - 功能
    - 去中心化的远程过程调用协议和市场
    - 每天 100 万个请求的免费套餐（每个端点，最多 2 个）
    - [公共端点](https://docs.pokt.network/developers/public-endpoints)
    - Pre-Stake+ 计划（如果你每天需要超过 100 万个请求）
    - 支持超过 15 条区块链
    - 6400 多个节点为应用程序服务并赚取 POKT
    - 归档节点、包含追踪数据的归档节点及测试网节点支持
    - 以太坊主网节点客户端多样性
    - 无单点故障
    - 零停机
    - 具有成本效益的近零代币经济学（一次性质押 POKT 以获得网络带宽）
    - 无每月沉没成本，将你的基础设施变成资产
    - 协议中内置负载均衡
    - 随时无限增加每日请求数量和每小时节点数量
    - 最私密的抗审查选项
    - 开发者实战支持
    - [Pocket Portal](https://bit.ly/ETHorg_POKTportal) 仪表板和分析
- [**QuickNode**](https://www.quicknode.com)
  - [文档](https://www.quicknode.com/docs/)
  - 功能
    - 全天候技术支持和开发者 Discord 社区
    - 区域负载均衡、多云端/元模型、低延迟网络
    - 多链支持（Optimism、Arbitrum、Polygon 及 11 个其他网络）
    - 快速且稳定的中间层（调用路由、缓存、索引）
    - 通过网络钩子进行智能合约监控
    - 直观的仪表板、分析套件、远程过程调用编写器
    - 高级安全功能（JWT、屏蔽、白名单）
    - 非同质化代币数据和分析应用程序接口
    - [已获 SOC2 认证](https://www.quicknode.com/security)
    - 适用于企业开发者
- [**Rivet**](https://rivet.cloud/)
  - [文档](https://rivet.readthedocs.io/en/latest/)
  - 功能
    - 免费套餐选项
    - 随时扩容
- [**SenseiNode**](https://senseinode.com)
  - [文档](https://docs.senseinode.com/)
  - 功能
    - 专用和共享节点
    - 仪表板
    - 在拉丁美洲不同地区的多个托管服务提供商上托管 AWS
    - Prysm 和 Lighthouse 客户端
- [**SettleMint**](https://console.settlemint.com/)
  - [文档](https://docs.settlemint.com/)
  - 功能
    - 免费试用
    - 随时扩容
    - GraphQL 支持
    - 远程过程调用和网络套接字安全端点
    - 专用全节点
    - 使用自己的云服务
    - 分析工具
    - 仪表板
    - 按小时计费定价
    - 直接支持
- [**Tenderly**](https://tenderly.co/web3-gateway)
  - [文档](https://docs.tenderly.co/web3-gateway/web3-gateway)
  - 功能
    - 免费套餐包含每月 2500 万个 Tenderly 单位
    - 免费访问历史数据
    - 读取繁重型工作负载的速度最多提高 8 倍
    - 100% 一致的读取访问
    - JSON 远程过程调用端点
    - 基于用户界面的远程过程调用请求构造器以及请求预览
    - 与 Tenderly 开发、调试和测试工具紧密集成
    - 模拟交易
    - 使用分析和过滤
    - 简单的访问密钥管理
    - 通过聊天、电邮和 Discord 提供专门的工程支持
- [**Watchdata**](https://watchdata.io/)
  - [文档](https://docs.watchdata.io/)
  - 特性
    - 数据可靠性
    - 不间断连接，不会出现停机
    - 过程自动化
    - 不收费
    - 适合任何用户的高上限
    - 支持各种节点
    - 资源扩容
    - 处理速度快
- [**ZMOK**](https://zmok.io/)
  - [文档](https://docs.zmok.io/)
  - 特性
    - 前台运行即服务
    - 带有搜索/过滤方法的全局交易内存池
    - 发送交易时，交易手续费和燃料均不受限制
    - 最快获取新区块和读取区块链
    - 每个应用程序接口调用的最优价格保证
- [**Chainbase**](https://www.chainbase.com/)
  - [文档](https://docs.chainbase.com)
  - 特性
    - 高可用性、高速和可扩展的远程过程调用服务
    - 多链支持
    - 不收费
    - 用户友好的仪表板
    - 提供远程过程调用之外的区块链数据服务

[**Zeeve**](https://www.zeeve.io/)

- [文档](https://www.zeeve.io/docs/)
- 特性
  - 企业级无代码自动化平台，提供区块链节点和网络的部署、监控和管理
  - 超过 30 种支持的协议与集成，种类还在增加
  - 增值型 Web3 基础设施服务，如去中心化存储、去中心化身份和用于真实世界用例的区块链账本数据应用程序接口
  - 全天候支持和主动监控始终确保节点的健康
  - 远程过程调用端点要求经过身份验证才能访问应用程序接口，并通过直观的仪表板和分析实现无忧管理
  - 提供托管云和自带云选项，支持所有主要云服务提供商，例如 AWS、Azure、Google Cloud、Digital Ocean 和本地服务
  - 我们每次都会通过智能路由接入到距离你的用户最近的节点

[**Tokenview**](https://services.tokenview.io/)

- [文档](https://services.tokeniew/docs?type=nodeService)
- 特性
  - 全天候技术支持和开发者 Telegram 社区
  - 多链支持（比特币、以太坊、Tron、BNB Smart Chain 和以太坊经典）
  - 远程过程调用和网络套接字安全端点均开放使用
  - 无限制访问归档数据应用程序接口
  - 带有请求浏览器和内存池监视器的仪表板
  - 非同质化代币数据应用程序接口和网络钩子通知
  - 加密货币支付
  - 可满足更多行为需求的外部支持

## 延伸阅读 {#further-reading}

- [以太坊节点服务列表](https://ethereumnodes.com/)

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)

## 相关教程 {#related-tutorials}

- [使用 Alchemy 开始以太坊开发](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [关于使用 Web3 和 Alchemy 发送交易的指南](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
