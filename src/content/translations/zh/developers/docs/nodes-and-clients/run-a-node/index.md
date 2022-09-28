---
title: 启动您自己的以太坊节点
description: 如何运行自己的以太坊客户端简介
lang: zh
sidebarDepth: 2
---

运行您自己的节点为您提供各种好处，打开新的可能性，并为支持生态系统提供帮助。 这个页面将引导您启动您自己的节点，并参与验证以太坊交易。

请注意，在[合并](/upgrades/merge)之后，至少需要两种客户端才能运行以太坊节点。 一种是执行客户端，另一种是共识客户端。 本页面将展示如何安装、配置和连接这两种客户端，从而搭建以太坊节点。

## 前提条件 {#prerequisites}

你应该明白什么是以太坊节点，以及你可能想要运行客户端的原因。 [节点和客户端](/developers/docs/nodes-and-clients/)涵盖了这一主题。

如果你不熟悉运行节点这一主题，或者正在寻找技术含量较低的方式，建议你先参阅我们为了便于用户理解而编撰的[运行以太坊节点](/run-a-node)简介。

## 选择一种方式 {#choosing-approach}

要启动自己的以太坊节点，第一步是选择你的运行方式。 你需要选择客户端（软件）、环境以及初始参数。 其中包括硬件（NUC 迷你电脑、笔记本电脑、虚拟机等）、操作系统（Linux、Windows、macOS 等）、客户端实现和配置。 用户可以根据自己的偏好选择每种选项。

#### 客户端设置 {#client-settings}

客户端实现支持不同的同步模式和各种其他选项。 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)是指不同的区块链数据下载和验证方式。 在启动节点前，你应该决定使用哪种网络和同步模式。 做决定时最重要的考虑因素是，客户端需要的磁盘空间和同步时间。 请注意，在[合并](/upgrades/merge)之后，轻执行客户端将不再运行，需要的是全节点。

所有功能和选项都可以在客户端的文档中找到。 通过执行有相应标记的客户端，就可以设置各种客户端配置。 可以从客户端相关文档获取更多关于标记的信息。

进行测试时，你可能更愿意在其中一个测试网上运行客户端。 [参阅受支持网络概览](/developers/docs/nodes-and-clients/#execution-clients)。

### 运行环境和硬件设施 {#environment-and-hardware}

#### 本地或云端 {#local-vs-cloud}

以太坊客户端可以在消费级电脑上运行，不需要专用硬件，比如矿机。 因此，可以根据你的需要选择各种部署方案。 简而言之，我们考虑在本地物理计算机和云端服务器上运行节点：

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

上面两种方案各有优点。 如果你正在寻找云端解决方案，除了许多传统云计算服务商外，还有一些专注于部署以太坊节点的服务商， 例如：

- [QuickNode](https://www.quicknode.com/)
- [BlockDaemon](https://blockdaemon.com)
- [LunaNode](https://www.lunanode.com/)
- [Alchemy](https://www.alchemy.com/)

#### 硬件 {#hardware}

然而，一个抗审查的去中心化网络不应该依赖于云服务商。 如果在自己的硬件设备上运行节点，对整个生态系统来说更健康。 最简单的做法就是购买预先配置好的机器，比如：

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

查看[每种客户端和同步模式所需的最小和推荐磁盘空间要求](/developers/docs/nodes-and-clients/#requirements)。 一般来说，普通的算力应该足够了。 问题通常在于驱动器速度。 首次同步期间，以太坊客户端会执行大量读/写操作。 因此强烈推荐使用固态硬盘。 客户端甚至可能[无法在机械硬盘上同步到最新状态](https://github.com/ethereum/go-ethereum/issues/16796#issuecomment-391649278)，会卡在主网后的几个区块上。 可以使用 [ARM 架构单板机](/developers/docs/nodes-and-clients/#ethereum-on-a-single-board-computer/)运行大多数客户端。 也可以使用带有 [Ethbian](https://ethbian.org/index.html) 操作系统的 Raspberry Pi 4。 这使你可以[通过刷新安全数码卡来运行客户端](/developers/tutorials/run-node-raspberry-pi/)。 根据你的软硬件选择，首次同步时间和存储要求可能不同。 请务必[查看同步时间和存储要求](/developers/docs/nodes-and-clients/#recommended-specifications)， 也请确保你的网络连接没有[带宽限制](https://wikipedia.org/wiki/Data_cap)。 推荐使用不计流量的网络连接，因为首次同步和广播到网络的数据可能超过您的限额。

#### 操作系统 {#operating-system}

所有客户端都支持主流操作系统 — Linux、MacOS、Windows。 这意味着你可以在操作系统最适合你的普通台式机或服务器上运行节点。 为了避免出现潜在的问题和安全漏洞，请确保你的操作系统是最新的。

## 启动节点 {#spinning-up-node}

### 获取执行客户端软件 {#getting-the-execution-client}

首先，下载你的首选[执行客户端软件](/developers/docs/nodes-and-clients/#execution-clients)

可以仅下载适合你的操作系统和架构的可执行应用程序或安装包。 始终验证所下载软件包的签名和校验和。 为了简化安装和更新，有些客户端将软件发布在存储库中。 如果你喜欢的话，可以从源代码开始构建客户端。 所有客户端都是开源的，因此你可以用合适的编译器从源代码开始构建客户端。

可以从发布页面下载二进制可执行文件，以帮助实现稳定的主网客户端：

- [Geth](https://geth.ethereum.org/downloads/)
- [OpenEthereum](https://github.com/openethereum/openethereum/releases)
- [Nethermind](https://downloads.nethermind.io/)
- [Besu](https://besu.hyperledger.org/en/stable/)
- [Erigon](https://github.com/ledgerwatch/erigon)

另外值得注意的是，客户端多样性是一个[执行层上的问题](https://clientdiversity.org/)。 Geth 在所有以太坊节点中占绝对主导地位 (>66%)。 建议阅读本页面的读者考虑运行非大多数人运行的执行客户端。

**注意，OpenEthereum [已废用](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并已停止维护。**请谨慎使用，最好改用其他客户端实现。

### 启动执行客户端 {#starting-the-execution-client}

在启动以太坊客户端软件之前，请最后检查环境是否已就绪。 例如，请确保：

- 选定的网络和同步模式下有足够的磁盘空间
- 内存和 CPU 未被其他程序停止。
- 操作系统更新到最新版本。
- 系统有正确的时间和日期。
- 您的路由器和防火墙接受监听端口上的连接。 默认情况下，以太坊客户端使用监听 (TCP) 端口和探测端口 (UDP)，两者均默认为 30303。

首先在测试网上运行客户端，这有助于确保一切正常工作。 你需要在一开始就进行非默认的所有客户端配置。 为了连接到共识客户端，执行客户端必须在已知路径上生成一个 `jwtsecret`。 这个路径必须为两个客户端所知，因为它被用来 对客户端之间的本地远程过程调用连接进行身份验证。 执行客户端还必须为经过身份验证的应用程序接口定义一个监听端口。

**请注意，建议目前只在测试网（如 Kiln）上连接执行客户端和共识客户端，并等待可直接适用于合并的客户端发行版本，然后再在主网上重复该过程。**

执行客户端有多种配置方法。 可以使用标记或配置文件设置你的首选配置。 请查看你的客户端相关文档，了解具体细节。

客户端执行将启动其核心功能及所选端点，并开始寻找对等节点。 在成功发现对等节点后，客户端开始同步。 当客户端成功同步到最新状态时，最新的区块链数据将可用。

### 获取共识客户端 {#getting-the-consensus-client}

目前有五种共识客户端可供选择。 它们是：

- [Lighthouse](https://lighthouse-book.sigmaprime.io/)：用 Rust 编写
- [Nimbus](https://nimbus.team/)：用 Nim 编写
- [Prysm](https://docs.prylabs.network/docs/getting-started/)：用 Go 编写
- [Teku](https://pegasys.tech/teku)：用 Java 编写

现在，出现了一个[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)问题，即占据绝对主导地位的 Prysm 客户端对 整个网络的健康带来了风险。 为了响应最初的平衡客户端多样性行动，许多 Prysm 节点改用 Lighthouse，以至于现在 Lighthouse 的市场占比也出现了问题。 因此，建议考虑选择非主流 客户端。 [查看最新的网络客户端使用情况](https://clientdiversity.org/)

有几种下载和安装共识客户端的方法，包括预构建的二进制文件、docker 容器 或从源代码构建。 上述客户端的相关文档提供有各个客户端的说明。 用户可以选择适合他们的方法。

### 启动共识客户端 {#starting-the-consensus-client}

共识客户端必须以正确的端口配置启动，以便与执行客户端建立本地 远程过程调用连接。 共识客户端都有一个类似于 `--http-webprovider` 的命令，该命令将公开的执行客户端 端口作为参数。

共识客户端还需要执行客户端的 `jwt-secret` 的路径，以便对它们之间 的远程过程调用连接进行身份验证。 每个共识客户端都有一个类似于 `--jwt-secret` 的命令，该命令将此文件路径 作为参数。 此路径必须与提供给执行客户端的 `jwtsecret` 路径一致。

**请注意，我们建议在以太坊主网上执行此操作之前，等待可直接适用于合并的客户端发行版本 - 现在只需在 Kiln 等测试网上练习**

### 添加验证者 {#adding-validators}

每种共识客户端都有自己的验证者软件，后者在各自的文档中都有详细描述。 最简便的开始 质押和验证者密钥生成的方法是使用 [Goerli 测试网质押启动板](https://goerli.launchpad.ethereum.org/)，让你可以测试你的设置。 当准备好使用主网时，你可以使用[主网质押启动板](https://launchpad.ethereum.org/)重复这些步骤。

### 使用节点 {#using-the-node}

执行客户端提供远程过程调用应用程序接口端点，在以太坊网络上，可以用这些端点以各种方式提交交易、与智能合约互动或部署智能合约。

- 使用合适的协议（例如，使用 `curl`）手动调用端点
- 附加提供的控制台（例如 `geth attache`）
- 在应用程序中实现端点

不同的客户端对远程过程调用端点有不同的实现方式。 但是有一个标准 JSON-RPC，每种客户端都可以使用。 想要了解概况，[请阅读 JSON-RPC 文档](https://eth.wiki/json-rpc/API)。 需要从以太坊网络中获取信息的应用程序，可以使用此远程过程调用。 例如，通过受欢迎的钱包 MetaMask，你可以[运行一个本地区块链实例并连接到该钱包](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)。

共识客户端都公开了一个[信标应用程序接口](https://ethereum.github.io/beacon-APIs)，可用于检查共识客户端的状态或通过使用 [Curl](https://curl.se) 等工具发送请求来下载区块和共识数据。 更多相关信息可以在每种共识客户端的相关文档中找到。

#### 访问 RPC {#reaching-rpc}

执行客户端的 JSON-RPC 默认端口是 `8545`，不过可以在配置文件中修改本地端点的端口。 默认情况下，远程过程调用接口只能在计算机的本地主机上访问。 为了让该端口可以被远程访问，可以通过将地址改为 `0.0.0.0` 公开它。 这样就可以通过本地或公共 IP 地址访问该端口。 大多数情况下，还需要在路由器上设置端口转发。

设置远程访问时应该保持谨慎，因为这会让互联网上的任何人都有可能控制你的节点。 不怀好意者可以访问你的节点让你的系统下线，或者如果你将客户端作为钱包，他们会窃取你的资金。

解决该问题的办法是，防止可能有危害的远程过程调用访问方法可以被修改。 例如，使用 Geth 时，可使用标记 `—http.api web3,eth,txpool` 设置可以被修改的方法。

还可以将你的远程过程调用接口访问托管，即将网络服务器的服务（比如 Nginx）指向你的客户端的本地地址和端口。

设置可公开访问端点的最保护隐私、最简单的方法，是将其托管在自己的 [Tor](https://www.torproject.org/) 洋葱服务上。 这将让你在本地网络外部无需静态公共 IP 地址或开放的端口也能访问此远程过程调用端口。 操作如下：

- 安装 `tor`
- 编辑 `torrc` 配置文件以启用隐藏客户端远程过程调用地址和端口的服务
- 重启 `tor` 服务

重启 Tor 后，你将在自己设置的目录中获得隐藏服务的密钥和主机名。 之后，你的远程过程调用端口就可以通过以 `.onion` 结尾的主机名进行访问。

### 运行节点 {#operating-the-node}

应该定期监控节点，确保它正常运行。 偶尔也可能需要维护。

#### 保持节点在线 {#keeping-node-online}

节点不需要一直在线，但是为了保持和网络同步，应该尽可能多地让节点在线。 可以关闭节点并重启，但牢记：

- 如果正在向磁盘写入最近的网络状态，关闭节点可能需要花费几分钟。
- 强制关闭会导致数据库损坏。
- 客户端将无法与网络同步，重启后，客户端需要重新同步。

*但是，共识层的验证者节点就需要一直在线。*验证者节点离线将影响所有依赖它的服务。 如果你是为了*质押*而运行节点，应该尽可能地减少停机时间。

#### 创建客户端服务 {#creating-client-services}

如果需要在启动时自动运行客户端，可以考虑创建客户端服务。 例如，在 Linux 服务器上，最佳做法是创建一种服务，为有限权限的用户执行配置正确的客户端并自动重启。

#### 更新客户端 {#updating-clients}

必须通过安装最新的安全补丁、功能和[以太坊改进提案](/eips/)，让客户端软件更新到最新版本。 特别是在[硬分叉](/history/)之前，确保运行正确的客户端版本。 更新客户端非常简单。 每种客户端在其相关文档中都有具体说明，但通常更新过程包括关闭客户端，下载最新版本并重启。 客户端应该从上次版本开始更新，并且需要应用所有更新。

每种客户端实现都有一个人类可读的版本字符串，该字符串在点对点协议中使用但也可以从命令行访问。 该版本字符串允许用户检查他们运行的客户端版本是否正确，并允许区块浏览器和其他分析工具得以量化网络上特定客户端的分布。 关于版本字符串的更多信息，请参阅各客户端相关文档。

#### 运行额外服务 {#running-additional-services}

运行自己的节点，可以让你使用需要直接访问以太坊客户端远程过程调用的服务。 这些服务都构建于以太坊之上，比如[二层网络解决方案](/developers/docs/scaling/#layer-2-scaling)以及其他以太坊基础设施。

#### 监测节点 {#monitoring-the-node}

为了正确监测节点，请考虑收集指标。 客户端提供了指标端点，因此你可以获得有关节点的全面数据。 使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具创建数据库，并且可以在 [Grafana](https://grafana.com/) 等软件中将其可视化并转换成图表。 在可视化节点和整个网络时，Grafana 有许多设置和各种仪表版可供使用。 在监测过程中，请务必密切关注机器的性能。 在节点初始同步期间，客户端软件可能会占用大量 CPU 和 RAM。 除了 Grafana，也可以使用操作系统自带的 `htop` 或 `uptime` 等工具来监测节点。

## 延伸阅读 {#further-reading}

- [分析成为已验证以太坊全节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _- Albert Palau，2018 年 9 月 24 日_
- [运行以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _- Justin Leroux，2019 年 11 月 7 日_
- [运行以太坊节点](https://docs.ethhub.io/using-ethereum/running-an-ethereum-node/) _- ETHHub，经常更新_
- [在以太坊主网上运行 Hyperledger Besu 节点：优点、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _- Felipe Faraggi，2020 年 5 月 7 日_
- [部署具有监测堆栈的 Nethermind 以太坊客户端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)
