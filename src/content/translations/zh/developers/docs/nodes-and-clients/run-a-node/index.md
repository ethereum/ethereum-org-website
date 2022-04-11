---
title: 运行您自己的以太坊节点
description: 如何运行自己的以太坊客户端简介
lang: zh
sidebar: true
sidebarDepth: 2
---

运行您自己的节点为您提供各种好处，打开新的可能性，并为支持生态系统提供帮助。 这个页面将引导您启动您自己的节点，并参与验证以太坊交易。

## 前提条件 {#prerequisites}

你应该明白什么是以太坊节点，以及你可能想要运行客户端的原因。 [节点和客户端](/developers/docs/nodes-and-clients/)涵盖了这个问题。

## 选择一种方式 {#choosing-approach}

要运行您自己的以太坊节点，第一步是决定您的运行方式。 您需要选择客户端（软件），运行环境以及您的启动参数 查看所有可用的[主网客户端](/developers/docs/nodes-and-clients/#advantages-of-different-implementations)。

#### 客户端设置 {#client-settings}

客户端启用时有不同的同步模式和各种其他选项 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)是指下载和验证区块链数据的不同方法。 在启动节点前，您应该决定使用哪个网络和同步模式 做决定时最重要的考虑因素是，磁盘容量和客户端需要的同步时间。

所有功能和选项都可以在客户端的文档中找到。 您可以通过执行相应参数来为客户端进行不同的配置 关于参数的更多信息，可以从客户端文档或 [EthHub](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/#client-settings) 获取。 为了测试的目的，您可能喜欢在测试网上运行一个客户端。 [查看支持的网络](/developers/docs/nodes-and-clients/#execution-clients)。

### 运行环境和硬件设施 {#environment-and-hardware}

#### 本地或云端 {#local-vs-cloud}

以太坊客户端可以在消费级电脑上运行，不需要特殊的硬件，比如挖矿。 因此，您可以根据您的需要来进行部署。 简单一点，我们考虑在本地物理机器和云服务器上运行一个节点：

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

上面两种方式各有优点。 如果您正在寻找云端的解决方案，除了许多传统云计算服务商外，还有一些专注于部署以太坊节点的服务商， 例如

- [QuikNode](https://www.quiknode.io/),
- [Blockdaemon](https://blockdaemon.com),
- [LunaNode](https://www.lunanode.com/).

#### 硬件 {#hardware}

然而，一个抗审查的去中心化网络不应该依赖于云服务商。 如果您在自己的硬件设备上运行节点，这对整个生态系统来说更健康。 最简单的做法就是购买预先配置好的机器，比如

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/).

查看[每种客户端和同步模式所需要的最小和推荐磁盘容量](/developers/docs/nodes-and-clients/#requirements)。 一般来说，普通的算力就足够了。 问题通常是驱动速度。 在最初的数据同步期，以太坊客户端会执行许多读/写操作， 所以强烈推荐 SSD。 [使用 HDD 的客户端](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278)可能不能同步到最新的以太坊状态，会卡在主网后的几个区块。 您可以使用[带有 ARM 芯片的单板机](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/)来运行大多数客户端。 您也可以使用带有 [Ethbian](https://ethbian.org/index.html) 操作系统的 Raspberry Pi 4。 这让你可以通过使用 [SD 卡来运行客户端](/developers/tutorials/run-node-raspberry-pi/)。 基于您的软件和硬件选择，初始同步时间和存储容量要求可能不一样， 请务必 [查看同步时间和存储容量要求](/developers/docs/nodes-and-clients/#recommended-specifications)， 也请确保您的网络连接没有[宽带流量限制](https://wikipedia.org/wiki/Data_cap)。 推荐您使用不计量的网络连接，因为初始同步和广播到网络的数据可能超过您的限额。

#### 操作系统 {#operating-system}

所有的客户端都支持主流的操作系统 — Linux、MacOS、Windows。 这意味着您可以使用带有最适合您的操作系统（OS）的桌面电脑或者服务器来运行节点。 为了避免潜在的故障和安全漏洞，请确保您的操作系统是最新的。

## 运行节点 {#spinning-up-node}

### 获取客户端软件 {#getting-the-client}

首先，下载您的首选[客户端软件](/developers/docs/nodes-and-clients/#execution-clients)

您可以简单地下载适合您操作系统和架构的可执行应用程序或安装包。 始终验证下载的软件包的签名和校验量。 有些客户端为了简化安装和更新将软件发布在软件库中， 如果您喜欢的话，你可以从源代码开始构建客户端。 当然，所有的客户端都是开源的，您可以用合适的编译器从源码开始构建客户端。

稳定的主网客户端二进制可执行文件可以从其发布页面下载：

- [Geth](https://geth.ethereum.org/downloads/),
- [OpenEthereum,](https://github.com/openethereum/openethereum/releases),
- [Nethermind](https://downloads.nethermind.io/),
- [Besu](https://pegasys.tech/solutions/hyperledger-besu/),
- [Erigon](https://github.com/ledgerwatch/erigon).

**注意，OpenEthereum [已被废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)，并已停止维护。**请谨慎使用，最好切换至其他客户端。

### 启动客户端 {#starting-the-client}

在启动以太坊客户端软件之前，请最后检查您的环境是否已就绪。 例如，请保证：

- 选定的网络和同步模式下有足够的磁盘空间
- 内存和 CPU 未被其他程序停止。
- 操作系统更新到最新版本。
- 系统有正确的时间和日期。
- 您的路由器和防火墙接受监听端口上的连接。 默认情况下，以太坊客户端使用监听 (TCP) 端口和探测端口 (UDP)，两者均默认为 30303。

首先在测试网上运行您的客户端，帮助确保一切正常工作。 [运行一个 Geth 轻节点](/developers/tutorials/run-light-node-geth/)应该会有所帮助。 您需要设置在启动时不是默认好的客户端配置。 您可以使用参与或配置文件设置您的首选配置。 详细信息可以查看您的客户端文档。客户端启动时将初始化其核心功能，选择端点，并开始寻找其他节点。 在成功探测到其他节点后，客户端开始同步数据。 当客户端成功同步到最新状态时，最新的区块链数据将可使用。

### 访问客户端 {#using-the-client}

客户端提供 RPC API 端点，您可以用来控制客户端，并以各种方式与以太坊网络交互：

- 使用合适的协议（例如，使用 `curl`）来手动调用
- 附加一个控制台（例如，`geth attache`）
- 在应用程序中执行

不同的客户端对 RPC 端点有不同的实现方式。 但是有一个标准的 JSON RPC，每个客户端都可以使用。 想要了解，请阅读 [JSON-RPC 文档](https://eth.wiki/json-rpc/API)。 那些需要从以太坊网络中获取信息的应用，可以使用此 RPC。 例如，受欢迎的钱包 MetaMask，您可以[运行一个本地区块链实例并连接到该钱包](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)。

#### 访问 RPC {#reaching-rpc}

JSON-RPC 的默认端口是 `8545`，不过您可以在本地端点的配置文件中修改这个端口。 默认情况下，这个 RPC 接口只能在您电脑的本地主机上访问。 为了能够让该端口可以被远程访问，您可以通过将地址改为 `0.0.0.0` 来进行公开。 这将使该端口可以通过本地或公共 IP 地址访问。 在大多数情况下，您也需要在您的路由器上设置端口转发。

当您设置远程访问时应该保持谨慎，因为这会让互联网上的任何人有可能控制您的节点。 如果您使用您的客户端充当钱包的话，不怀好意者可以让您的钱包系统下线或者窃取您的资金。

与此相应的一个解决办法是防止可能有危害的 RPC 访问方式被修改。 例如，使用 `Geth`时，您可以将可被修改的访问方式用参数声明：`—http.api web3,eth,txpool`。

您也可以使用指向您客户端本地地址和端口的网络服务器，比如 Nginx 来公开您的 RPC 接口。

最保护隐私和简单的方法还是设置一个托管在自己的[洋葱服务器](https://www.torproject.org/)上的可公开访问端点。 这将让您在本地网络外部无需开放的静态公共 IP 地址和端口也能连接 RPC。 操作如下：

- 安装 `tor`
- 编辑 `torrc` 配置文件以启用隐藏您客户端 RPC 地址和端口的服务
- 重启 `tor` 服务

一旦您重启 Tor，您将在您设置的目录中获得隐藏的密钥和主机名。 之后，您的 RPC 接口就可以通过一个以 `.onion` 结尾的主机名进行访问。

### 操作该节点 {#operating-the-node}

您应该定期监控您的节点，以确保它正常运行。 偶尔您也可能需要维护。

#### 保持节点在线 {#keeping-node-online}

您的节点不需要一直在线，但是为了保持和网络同步，您应该尽可能多的让它在线。 当您需要关闭或重启节点时，以下需要注意：

- 如果磁盘正在写入，关机需要花费几分钟。
- 强制关机会导致数据库损坏。
- 您的客户端将无法与网络同步，当您重启后，您需要重新同步数据。

但是，对于用作*进行共识的验证节点*，就需要一直在线。验证节点离线会影响所有使用它的服务。 如果您是为了*权益质押*而运行节点，您应该尽可能地减少离线时间。

#### 创建客户端证书 {#creating-client-service}

在启动节点时，您应该考虑创建一个客户端自动运行的服务。 例如，在 Linux 服务器上，一个不错的做法是创建一个服务，以适当的配置，在有限权限的用户下执行客户端并自动重新启动。

#### 更新客户端 {#updating-client}

您应该让您的客户端软件具有最新的安全补丁、功能和 [EIP](/eips/)。 尤其是在[硬分叉](/history/)之前，请确保您的客户端版本是正确的。

#### 运行额外服务 {#running-additional-services}

运行自己的节点，可以让您使用需要直接访问以太坊客户端 RPC 的服务。 有些服务构建在以太坊架构之上，如[第二层解决方案](/developers/docs/scaling/layer-2-rollups)、[共识客户端](/upgrades/get-involved/#clients)和其它以太坊基础设施。

#### 监测节点 {#monitoring-the-node}

“为了正确地监测您的节点，请考虑收集指标。 客户端提供了节点指标，这样您可以获得关于节点的全面数据。 使用像 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或者 [Prometheus](https://prometheus.io/) 这样的数据库，再加上 [Grafana](https://grafana.com/) 这样的可视化软件，您可以将节点可视化。 在可视化节点和网络时，Grafana 有许多设置和仪表版样式可供您使用。 作为监测的一部分，也需注意您的机器性能。 在您的节点初始同步期间，客户端软件会占用大量 CPU 和 RAM。 除了 Grafana，您也可以使用系统自带的 `htop` 或 `uptime` 等工具。

## 延伸阅读 {#further-reading}

- [Analyzing the hardware requirements to be an Ethereum full validated node](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau，2018 年 9 月 24 日_
- [Running Ethereum Full Nodes: A Guide for the Barely Motivated](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [Running an Ethereum Node](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _– ETHHub，经常更新_
- [Running a Hyperledger Besu Node on the Ethereum Mainnet: Benefits, Requirements, and Setup](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [Deploying Nethermind Ethereum Client with Monitoring Stack](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)
