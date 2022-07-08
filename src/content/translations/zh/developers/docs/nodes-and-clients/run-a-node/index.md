---
title: 运行您自己的以太坊节点
description: 如何运行自己的以太坊客户端简介
lang: zh
sidebar: true
sidebarDepth: 2
---

运行您自己的节点为您提供各种好处，打开新的可能性，并为支持生态系统提供帮助。 这个页面将引导您启动您自己的节点，并参与验证以太坊交易。

## 先决条件 {#prerequisites}

你应该明白什么是以太坊节点，以及你可能想要运行客户端的原因。 [节点和客户端](/developers/docs/nodes-and-clients/)涵盖了这个问题。

如果您不熟悉运行节点这一主题，或者正在寻找技术含量较低的路径，我们建议您首先查看我们关于[运行以太坊节点](/run-a-node)的用户友好介绍。

## 选择一种方式 {#choosing-approach}

要运行自己的以太坊节点，第一步是选择运行方式。 您需要选择要使用的客户端（软件）、运行环境以及参数。 查看所有可用的[主网客户端](/developers/docs/nodes-and-clients/#advantages-of-different-implementations)。

#### 客户端设置 {#client-settings}

客户端实现支持不同的同步模式和各种其他选项。 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)是指不同的区块链数据下载和验证方式。 启动节点前，您应该决定要使用的网络和同步模式。 最重要的考虑因素是，客户端需要的磁盘空间和同步时间。

所有功能和选项都可以在客户端相关文档中找到。 可以通过执行带有相应标记的客户端来设置不同的客户端配置。 关于标记的更多信息，可以查看 [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) 或客户端文档。 要进行测试，您可能选择在其中一个测试网络上运行客户端。 [参阅受支持网络概览](/developers/docs/nodes-and-clients/#execution-clients)。

### 运行环境和硬件设施 {#environment-and-hardware}

#### 本地或云端 {#local-vs-cloud}

以太坊客户端可以在消费级电脑上运行，不像挖矿那样需要专用硬件。 因此，您可以根据需要选择各种部署方案。 简而言之，我们考虑在本地机器和云服务器上运行一个节点：

- 云端
  - 云服务商提供了高可用的服务器以及静态公共 IP 地址
  - 获得专用或虚拟服务器比自己搭建更加方便
  - 取舍是：是否需要信赖云服务商三方
  - 由于全节点需要的内存很大，租用一个服务器的价格可能很贵
- 自有硬件
  - 更可信并且更有主动权
  - 只需一次性投入
  - 可以购买预先配置好的机器
  - 您必须亲自准备、维护和解决潜在的机器故障

两种方案各自的优点在上面进行了总结。 如果您需要云解决方案，除了许多传统的云计算提供商外，还有一些专注于部署以太坊节点的服务商。 例如：

- [QuikNode](https://www.quiknode.io/)
- [BlockDaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### 硬件 {#hardware}

然而，一个抗审查的去中心化网络不应该依赖于云提供商。 如果在自己的硬件设备上运行节点，这对整个生态系统来说更健康。 最简单的方案就是购买预先配置好的机器，比如：

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

查看针对[每种客户端和同步模式的最低和建议磁盘空间要求](/developers/docs/nodes-and-clients/#requirements)。 一般来说，适中的算力应该足够了。 问题通常在于驱动器速度。 首次同步期间，以太坊客户端会执行大量读/写操作。 因此强烈推荐使用固态硬盘 (SSD)。 客户端甚至可能[无法在机械硬盘 (HDD) 上同步到最新状态](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278)，会卡在主网后的几个区块上。 您可以使用[采用 ARM 架构的单板机](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/)运行大多数客户端。 您也可以使用带有 [Ethbian](https://ethbian.org/index.html) 操作系统的 Raspberry Pi 4。 这使您可以[通过刷新 SD 卡来运行客户端](/developers/tutorials/run-node-raspberry-pi/)。 根据您的软件和硬件选择，初始同步时间和存储要求可能不同。 确保[查看同步时间和存储要求](/developers/docs/nodes-and-clients/#recommended-specifications)。 也请确保您的网络连接没有[带宽限制](https://wikipedia.org/wiki/Data_cap)。 推荐您使用不计流量的网络连接，因为初始同步和广播到网络的数据可能超过您的限额。

#### 操作系统 {#operating-system}

所有客户端都支持主流操作系统 — Linux、MacOS、Windows。 这意味着您可以在操作系统 (OS) 最适合您的普通台式机或服务器上运行节点。 为了避免出现潜在的问题和安全漏洞，请确保您的操作系统是最新的。

## 运行节点 {#spinning-up-node}

### 获取客户端软件 {#getting-the-client}

首先，下载您的首选[客户端软件](/developers/docs/nodes-and-clients/#execution-clients)

您可以仅下载适合您的操作系统和架构的可执行应用程序或安装包。 始终验证所下载软件包的签名和校验和。 有些客户端为了简化安装和更新将软件发布在软件库中， 如果您喜欢的话，你可以从源代码开始构建客户端。 当然，所有的客户端都是开源的，您可以用合适的编译器从源代码开始构建客户端。

实现稳定主网客户端的二进制可执行文件可以从其发布页面下载：

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://pegasys.tech/solutions/hyperledger-besu/)
- [Erigon](https://github.com/ledgerwatch/erigon)

**注意，OpenEthereum [已弃用](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，并且最好切换至其他客户端实现。

### 启动客户端 {#starting-the-client}

在启动以太坊客户端软件之前，请最后检查一次您的环境是否已就绪。 例如，请确保：

- 选定的网络和同步模式下有足够的磁盘空间
- 内存和 CPU 未被其他程序停止。
- 操作系统更新到最新版本。
- 系统有正确的时间和日期。
- 您的路由器和防火墙接受监听端口上的连接。 默认情况下，以太坊客户端使用监听 (TCP) 端口和探测端口 (UDP)，两者均默认为 30303。

首先在测试网上运行您的客户端，这有助于确保一切正常工作。 [运行 Geth 轻节点](/developers/tutorials/run-light-node-geth/)应该会有所帮助。 您需要在一开始声明非默认的所有客户端配置。 可以使用标记或配置文件声明您的首选配置。 查看您的客户端文档了解详细信息 客户端执行时将初始化其核心功能及所选端点并开始查找对等节点。 在成功发现对等节点后，客户端开始同步。 当客户端成功同步到最新状态时，最新的区块链数据将可使用。

### 访问客户端 {#using-the-client}

客户端提供 RPC API 端点，您可以用它来控制客户端，并以各种方式与以太坊网络交互：

- 使用合适的协议（例如，使用 `curl`）来手动调用
- 附加一个控制台（例如，`geth attache`）
- 在应用程序中执行

不同的客户端对 RPC 端点有不同的实现方式。 但是有一个标准 JSON RPC，每个客户端都可以使用它。 想了解概况，请阅读 [JSON-RPC 文档](https://eth.wiki/json-rpc/API)。 需要从以太坊网络中获取信息的应用程序，可以使用此远程过程调用 (RPC)。 例如，热门钱包 MetaMask 让您可以[运行一个本地区块链实例并连接到该钱包](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)。

#### 访问 RPC {#reaching-rpc}

JSON-RPC 的默认端口是 `8545`，不过您可以在配置文件中修改本地端点的端口。 默认情况下，这个 RPC 接口只能在您电脑的本地主机上访问。 为了能够远程访问该接口，您可以通过将地址改为 `0.0.0.0` 将其公开。 这样就可以通过本地或公共 IP 地址访问该接口。 大多数情况下，您还需要在您的路由器上设置端口转发。

进行该设置时应该谨慎，因为这会让互联网上的任何人都可以控制您的节点。 不怀好意者可以访问您的节点让您的系统下线，或者如果您将客户端作为钱包时，他们会窃取您的资金。

解决该问题的办法是，防止可能有危害的远程过程调用访问方式被修改。 例如，使用 `Geth` 时，您可以用标记 `—http.api web3,eth,txpool` 声明可修改的方法。

您也可以将您的远程过程调用接口访问托管，即将网络服务器的服务（比如 Nginx）指向您客户端的本地地址和端口。

设置可公开访问端点的最保护隐私、最简单的方法，是将其托管在自己的 [Tor](https://www.torproject.org/) 洋葱服务上。 这将让您在本地网络外部无需静态公共 IP 地址和开放的端口也能连接 RPC。 操作如下：

- 安装 `tor`
- 编辑 `torrc` 配置文件以启用隐藏您客户端 RPC 地址和端口的服务
- 重启 `tor` 服务

重启 Tor 后，您将在您设置的目录中获得隐藏的服务密钥和主机名。 之后，您的 RPC 接口就可以通过以 `.onion` 结尾的主机名进行访问。

### 操作该节点 {#operating-the-node}

您应该定期监控您的节点，以确保它正常运行。 偶尔您也可能需要维护。

#### 保持节点在线 {#keeping-node-online}

您的节点不需要一直在线，但为了和网络保持同步，您应该尽可能让它在线。 您可以关闭节点并重启，但牢记：

- 如果磁盘正在写入，关机需要花费几分钟。
- 强制关机会导致数据库损坏。
- 您的客户端将无法与网络同步，当您重启后，您需要重新同步数据。

_这并不适用于共识层验证者节点_。验证者节点离线会影响所有依赖它的服务。 如果您是为了*质押*而运行节点，应该尽可能减少离线时间。

#### 创建客户端证书 {#creating-client-service}

在启动节点时，考虑创建用来自动运行客户端的服务。 例如，在 Linux 服务器上，一个不错的做法是创建一个服务，为有限权限的用户以适当的配置执行客户端并自动重启。

#### 更新客户端 {#updating-client}

您应该通过最新的安全补丁、功能和[以太坊改进提案](/eips/)让您的客户端软件保持最新。 尤其是在[硬分叉](/history/)之前，请确保您运行正确的客户端版本。

每种客户端实现都有一个在点对点协议中使用的人类可读版本字符串，但也可以从命令行访问该字符串。 此版本字符串允许用户检查他们运行的版本是否正确，并允许对量化网络上特定客户端的分布感兴趣的区块浏览器和其他分析工具。 关于版本字符串的更多信息，请参阅各客户端文档。

#### 运行额外服务 {#running-additional-services}

运行自己的节点，就可以使用需要直接访问以太坊客户端远程过程调用的服务。 这些服务构建在以太坊上，如[第二层解决方案](/developers/docs/scaling/#layer-2-scaling)、[共识客户端](/upgrades/get-involved/#clients)和其它以太坊基础设施。

#### 监测节点 {#monitoring-the-node}

“为了正确监控您的节点，请考虑收集指标。 客户端提供指标端点，因此您可以获得有关节点的全面数据。 使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具创建数据库，您可以在 [Grafana](https://grafana.com/) 等软件中将其可视化并转换成图表。 该软件有许多使用设置和不同的 Grafana 仪表板，您可以用来将您的节点和整个网络可视化。 在监控过程中，请务必密切关注机器的性能。 在您的节点的初始同步期间，客户端软件可能会占用大量 CPU 和 RAM 资源。 除了 Grafana，您还可以使用操作系统提供的工具，如 `htop` 或 `uptime` 来执行此操作。

## 延伸阅读 {#further-reading}

- [分析成为以太坊完全验证节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau，2018 年 9 月 24 日_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub，经常更新_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)
