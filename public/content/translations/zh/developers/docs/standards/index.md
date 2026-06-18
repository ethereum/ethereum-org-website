---
title: 以太坊开发标准
description: 了解以太坊标准，包括以太坊改进提案 (EIP)、ERC-20 和 ERC-721 等代币标准以及开发约定。
lang: zh
incomplete: true
---

## 标准概述 {#standards-overview}

以太坊社区采用了许多标准，这些标准有助于保持项目（例如[以太坊客户端](/developers/docs/nodes-and-clients/)和钱包）在不同实现之间可互操作，并确保智能合约和去中心化应用 (dapp) 保持可组合。

通常，标准作为[以太坊改进提案](/eips/) (EIP) 引入，社区成员通过[标准流程](https://eips.ethereum.org/EIPS/eip-1)对其进行讨论。

- [EIP 简介](/eips/)
- [EIP 列表](https://eips.ethereum.org/)
- [EIP GitHub 仓库](https://github.com/ethereum/EIPs)
- [EIP 讨论板](https://ethereum-magicians.org/c/eips)
- [以太坊治理简介](/governance/)
- [以太坊治理概述](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _2019 年 3 月 31 日 - Boris Mann_
- [以太坊协议开发治理与网络升级协调](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _2020 年 3 月 23 日 - Hudson Jameson_
- [所有以太坊核心开发者会议播放列表](https://www.youtube.com/@EthereumProtocol) _(YouTube 播放列表)_

## 标准类型 {#types-of-standards}

EIP 有 3 种类型：

- 标准跟踪 (Standards Track)：描述影响大多数或所有以太坊实现的任何更改
- [元跟踪 (Meta Track)](https://eips.ethereum.org/meta)：描述围绕以太坊的流程或提议对流程进行更改
- [信息跟踪 (Informational Track)](https://eips.ethereum.org/informational)：描述以太坊设计问题，或向以太坊社区提供一般性指南或信息

此外，标准跟踪又细分为 4 个类别：

- [核心 (Core)](https://eips.ethereum.org/core)：需要共识分叉的改进
- [网络 (Networking)](https://eips.ethereum.org/networking)：围绕 devp2p 和轻量级以太坊子协议的改进，以及对 whisper 和蜂群 (Swarm) 网络协议规范的拟议改进。
- [接口 (Interface)](https://eips.ethereum.org/interface)：围绕客户端 API/RPC 规范和标准的改进，以及某些语言级别的标准，如方法名称和合约 ABI。
- [ERC](https://eips.ethereum.org/erc)：应用级标准和约定

有关这些不同类型和类别的更详细信息，请参阅 [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### 代币标准 {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - 同质化（可互换）代币的标准接口，如投票代币、质押代币或虚拟货币。
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - 一种同质化代币标准，使代币的行为与以太币完全相同，并支持在接收方处理代币转移。
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - ERC-20 代币的扩展接口，支持在单笔交易中对接收方合约执行回调。
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - 非同质化代币的标准接口，如艺术品或歌曲的契约。
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - 使用连续的代币标识符创建/转移一个或多个非同质化代币时发出的标准化事件。
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - EIP-721 消费者角色的接口扩展。
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - 为 ERC-721 代币添加具有受限权限且有时间限制的角色。
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **（不推荐）**对 ERC-20 进行改进的代币标准。
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - 可同时包含同质化和非同质化资产的代币标准。
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - 一种代币化金库标准，旨在优化和统一生息金库的技术参数。

了解有关[代币标准](/developers/docs/standards/tokens/)的更多信息。

## 延伸阅读 {#further-reading}

- [以太坊改进提案 (EIP)](/eips/)

_知道对您有帮助的社区资源吗？编辑本页面并添加它！_