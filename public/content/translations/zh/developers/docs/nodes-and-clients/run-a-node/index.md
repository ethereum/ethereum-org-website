---
title: "运行你自己的以太坊节点"
description: "关于运行你自己的以太坊客户端实例的总体介绍。"
lang: zh
sidebarDepth: 2
---

运行你自己的节点能为你提供各种好处，开启新的可能性，并有助于支持生态系统。本页面将指导你启动自己的节点并参与验证[以太坊](/)交易。

请注意，在[合并](/roadmap/merge)之后，运行一个以太坊节点需要两个客户端：一个**执行层 (EL)** 客户端和一个**共识层 (CL)** 客户端。本页面将展示如何安装、配置并连接这两个客户端以运行以太坊节点。

## 前提条件 {#prerequisites}

你应该了解什么是以太坊节点以及为什么你可能想要运行一个客户端。这在[节点和客户端](/developers/docs/nodes-and-clients/)中有所介绍。

如果你是运行节点的新手，或者正在寻找一条技术性较低的途径，我们建议你首先查看我们关于[运行以太坊节点](/run-a-node)的用户友好型介绍。

## 选择一种方法 {#choosing-approach}

启动节点的第一步是选择你的方法。根据要求和各种可能性，你必须选择客户端实现（包括执行客户端和共识客户端）、环境（硬件、系统）以及客户端设置的参数。

本页面将指导你完成这些决策，并帮助你找到运行以太坊实例的最合适方式。

要从客户端实现中进行选择，请查看所有可用于主网的[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)、[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)，并了解[客户端多样性](/developers/docs/nodes-and-clients/client-diversity)。

考虑到客户端的[要求](#requirements)，决定是在你自己的[硬件上还是在云端](#local-vs-cloud)运行该软件。

准备好环境后，使用[对初学者友好的界面](#automatized-setup)或使用带有高级选项的终端[手动](#manual-setup)安装所选的客户端。

当节点正在运行并同步时，你就可以[使用它](#using-the-node)了，但请务必留意其[维护](#operating-the-node)。

![Client setup](./diagram.png)

### 环境与硬件 {#environment-and-hardware}

#### 本地或云端 {#local-vs-cloud}

以太坊客户端能够在消费级计算机上运行，不需要任何特殊硬件（例如挖矿机）。因此，你可以根据自己的需求选择各种部署节点的选项。
简而言之，让我们考虑在本地物理机和云服务器上运行节点：

- 云端
  - 提供商提供高服务器正常运行时间和静态公共 IP 地址
  - 获取专用或虚拟服务器可能比自己构建更方便
  - 代价是需要信任第三方——服务器提供商
  - 由于全节点所需的存储空间较大，租用服务器的价格可能会很高
- 自有硬件
  - 更加无须信任和自主的方法
  - 一次性投资
  - 可以选择购买预配置的机器
  - 你必须在物理上准备、维护并可能需要对机器和网络进行故障排除

这两种选项都有上面总结的不同优势。如果你正在寻找云解决方案，除了许多传统的云计算提供商之外，还有专注于部署节点的服务。查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)以获取有关托管节点的更多选项。

#### 硬件 {#hardware}

然而，一个抗审查的、去中心化的网络不应依赖云提供商。相反，在你自己的本地硬件上运行节点对生态系统更健康。[估计](https://www.ethernodes.org/networkType/cl/Hosting)显示很大一部分节点在云端运行，这可能成为单点故障。

以太坊客户端可以在你的计算机、笔记本电脑、服务器甚至单板计算机上运行。虽然在个人计算机上运行客户端是可能的，但拥有一台专门用于节点的机器可以显著提高其性能和安全性，同时最大限度地减少对主计算机的影响。

使用你自己的硬件可能非常简单。有许多简单的选项，也有适合技术人员的高级设置。因此，让我们看看在你的机器上运行以太坊客户端的要求和方法。

#### 要求 {#requirements}

硬件要求因客户端而异，但通常不会太高，因为节点只需要保持同步。不要将其与挖矿混淆，后者需要更多的计算能力。不过，更强大的硬件确实能缩短同步时间并提高性能。

在安装任何客户端之前，请确保你的计算机有足够的资源来运行它。你可以在下面找到最低和推荐的要求。

硬件的瓶颈主要是磁盘空间。同步以太坊区块链是非常密集的输入/输出操作，需要大量空间。最好有一个**固态硬盘 (SSD)**，即使在同步之后也有数百 GB 的可用空间。

数据库的大小和初始同步的速度取决于所选的客户端、其配置和[同步策略](/developers/docs/nodes-and-clients/#sync-modes)。

还要确保你的互联网连接不受[带宽上限](https://wikipedia.org/wiki/Data_cap)的限制。建议使用不计量的连接，因为初始同步和广播到网络的数据可能会超出你的限制。

##### 操作系统

所有客户端都支持主流操作系统——Linux、macOS、Windows。这意味着你可以在最适合你的操作系统 (OS) 的常规桌面或服务器机器上运行节点。确保你的操作系统是最新的，以避免潜在的问题和安全漏洞。

##### 最低要求

- 2 核以上的 CPU
- 8 GB 内存
- 2TB SSD
- 10+ MBit/s 带宽

##### 推荐规格

- 4 核以上的快速 CPU
- 16 GB 以上内存
- 2+TB 的快速 SSD
- 25+ MBit/s 带宽

你选择的同步模式和客户端将影响空间要求，但我们在下面估算了每个客户端所需的磁盘空间。

| 客户端     | 磁盘大小（快照同步） | 磁盘大小（完整归档） |
| ---------- | --------------------- | ------------------------ |
| 贝苏       | 800GB+                | 12TB+                    |
| 埃里贡     | 不适用                   | 2.5TB+                   |
| Geth       | 500GB+                | 12TB+                    |
| 奈瑟曼德 | 500GB+                | 12TB+                    |
| 瑞斯       | 不适用                   | 2.2TB+                   |

- 注意：埃里贡和瑞斯不提供快照同步，但可以进行完全修剪（埃里贡约为 2TB，瑞斯约为 1.2TB）

对于共识客户端，空间要求还取决于客户端实现和启用的功能（例如，验证者罚没者），但通常需要额外的 200GB 用于信标数据。随着验证者数量的增加，带宽负载也会增加。你可以在[此分析中找到有关共识客户端要求的详细信息](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)。

#### 即插即用解决方案 {#plug-and-play}

使用自有硬件运行节点的最简单选项是使用即插即用盒子。来自供应商的预配置机器提供了最直接的体验：订购、连接、运行。一切都已预先配置并自动运行，带有直观的指南和用于监控和控制软件的仪表板。

- [DAppNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 单板计算机上的以太坊 {#ethereum-on-a-single-board-computer}

运行以太坊节点的一种简单且便宜的方法是使用单板计算机，即使是像 Raspberry Pi 这样具有 ARM 架构的计算机。[ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)为 Raspberry Pi 和其他 ARM 板提供了多个执行和共识客户端的易于运行的镜像。

像这样小巧、实惠且高效的设备非常适合在家里运行节点，但请记住它们的性能有限。

## 启动节点 {#spinning-up-node}

实际的客户端设置可以通过自动启动器完成，也可以手动直接设置客户端软件。

对于不太高级的用户，推荐的方法是使用启动器，这是一种指导你完成安装并自动执行客户端设置过程的软件。但是，如果你有一些使用终端的经验，手动设置的步骤应该很容易遵循。

### 引导式设置 {#automatized-setup}

多个用户友好的项目旨在改善设置客户端的体验。这些启动器提供自动的客户端安装和配置，有些甚至提供图形界面用于引导式设置和监控客户端。

以下是一些只需点击几下即可帮助你安装和控制客户端的项目：

- [DAppNode](https://docs.dappnode.io/docs/user/getting-started/choose-your-path) - DAppNode 不仅仅随供应商的机器一起提供。该软件、实际的节点启动器和具有许多功能的控制中心可以在任意硬件上使用。
- [EthPillar](https://www.coincashew.com/coins/overview-eth/ethpillar) - 设置全节点的最快、最简单的方法。单行设置工具和节点管理 TUI。免费。开源。由独立质押者为以太坊提供的公共物品。支持 ARM64 和 AMD64。
- [eth-docker](https://eth-docker.net/) - 使用 Docker 进行自动设置，专注于简单安全的质押，需要基本的终端和 Docker 知识，推荐给稍微高级一点的用户。
- [Stereum](https://stereum-dev.github.io/ethereum-node-web-docs) - 用于通过 SSH 连接在远程服务器上安装客户端的启动器，带有 GUI 设置指南、控制中心和许多其他功能。
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - 节点设置工具，使用 CLI 向导自动生成 Docker 配置。由奈瑟曼德使用 Go 编写。
- [Chainstack Self-Hosted](https://docs.chainstack.com/docs/self-hosted/introduction) - 用于在 Kubernetes 上部署执行和共识客户端的 Web UI 和 CLI。包含快照引导和内置监控。免费。不需要 Chainstack 账户。由 Chainstack 构建。

### 手动客户端设置 {#manual-setup}

另一个选项是手动下载、验证和配置客户端软件。即使某些客户端提供图形界面，手动设置仍然需要基本的终端技能，但提供了更多的多功能性。

如前所述，设置你自己的以太坊节点将需要运行一对共识和执行客户端。某些客户端可能包含另一种类型的轻客户端，并且无需任何其他软件即可同步。然而，完全的无须信任验证需要这两种实现。

#### 获取客户端软件 {#getting-the-client}

首先，你需要获取你首选的[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)软件。

你可以简单地下载适合你的操作系统和架构的可执行应用程序或安装包。始终验证下载包的签名和校验和。一些客户端还提供存储库或 Docker 镜像，以便更轻松地安装和更新。所有客户端都是开源的，因此你也可以从源代码构建它们。这是一种更高级的方法，但在某些情况下，可能是必需的。

上面客户端列表中链接的文档提供了安装每个客户端的说明。

以下是客户端的发布页面，你可以在其中找到它们预构建的二进制文件或安装说明：

##### 执行客户端

- [贝苏](https://github.com/hyperledger/besu/releases)
- [埃里贡](https://github.com/ledgerwatch/erigon/releases)
- [Geth](https://geth.ethereum.org/downloads)
- [奈瑟曼德](https://downloads.nethermind.io/)
- [瑞斯](https://reth.rs/installation/installation.html)

值得注意的是，客户端多样性是[执行层上的一个问题](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)。建议读者考虑运行少数派执行客户端。

##### 共识客户端

- [莱特豪斯](https://github.com/sigp/lighthouse/releases/latest)
- [洛德斯塔](https://chainsafe.github.io/lodestar/run/getting-started/installation#build-from-source/)（不提供预构建的二进制文件，仅提供 Docker 镜像或从源代码构建）
- [尼姆巴斯](https://github.com/status-im/nimbus-eth2/releases/latest)
- [普莱斯姆](https://github.com/prysmaticlabs/prysm/releases/latest)
- [泰库](https://github.com/ConsenSys/teku/releases)

[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)对于运行验证者的共识节点至关重要。如果大多数验证者运行单一的客户端实现，网络安全就会面临风险。因此，建议考虑选择少数派客户端。

[查看最新的网络客户端使用情况](https://clientdiversity.org/)并了解有关[客户端多样性](/developers/docs/nodes-and-clients/client-diversity)的更多信息。

##### 验证软件

从互联网下载软件时，建议验证其完整性。此步骤是可选的，但特别是对于像以太坊客户端这样的关键基础设施，了解潜在的攻击媒介并避免它们非常重要。如果你下载了预构建的二进制文件，你需要信任它，并承担攻击者可能将可执行文件替换为恶意文件的风险。

开发人员使用他们的 PGP 密钥对发布的二进制文件进行签名，因此你可以通过密码学验证你运行的正是他们创建的软件。你只需要获取开发人员使用的公钥，这些公钥可以在客户端发布页面或文档中找到。下载客户端版本及其签名后，你可以使用 PGP 实现（例如 [GnuPG](https://gnupg.org/download/index.html)）轻松验证它们。查看关于在 [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 或 [Windows/macOS](https://freedom.press/training/verifying-open-source-software/) 上使用 `gpg` 验证开源软件的教程。

另一种验证形式是确保你下载的软件的哈希（一种独特的密码学指纹）与开发人员提供的哈希匹配。这比使用 PGP 更容易，并且某些客户端仅提供此选项。只需在下载的软件上运行哈希函数，并将其与发布页面上的哈希进行比较。例如：

```sh
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 客户端设置 {#client-setup}

安装、下载或编译客户端软件后，你就可以运行它了。这仅仅意味着必须使用正确的配置来执行它。客户端提供丰富的配置选项，可以启用各种功能。

让我们从可能显著影响客户端性能和数据使用的选项开始。[同步模式](/developers/docs/nodes-and-clients/#sync-modes)代表下载和验证区块链数据的不同方法。在启动节点之前，你应该决定使用什么网络和同步模式。最需要考虑的是客户端所需的磁盘空间和同步时间。请注意客户端的文档以确定哪种同步模式是默认的。如果这不适合你，请根据安全级别、可用数据和成本选择另一种。除了同步算法之外，你还可以设置对不同类型的旧数据进行修剪。修剪可以删除过时的数据，即删除从最近区块无法访问的状态树节点。

其他基本配置选项包括，例如，选择网络——主网或测试网，为 RPC 或 WebSockets 启用 HTTP 端点等。你可以在客户端的文档中找到所有功能和选项。可以通过在 CLI 或配置文件中直接使用相应的标志执行客户端来设置各种客户端配置。每个客户端都略有不同；请始终参考其官方文档或帮助页面以获取有关配置选项的详细信息。

出于测试目的，你可能更喜欢在其中一个测试网网络上运行客户端。[查看支持的网络概述](/developers/docs/nodes-and-clients/#execution-clients)。

在下一节中可以找到使用基本配置运行执行客户端的示例。

#### 启动执行客户端 {#starting-the-execution-client}

在启动以太坊客户端软件之前，执行最后一次检查以确保你的环境已准备就绪。例如，确保：

- 考虑到所选的网络和同步模式，有足够的磁盘空间。
- 内存和 CPU 没有被其他程序占用。
- 操作系统已更新到最新版本。
- 系统具有正确的时间和日期。
- 你的路由器和防火墙接受监听端口上的连接。默认情况下，以太坊客户端使用监听器 (TCP) 端口和发现 (UDP) 端口，默认均为 30303。

首先在测试网上运行你的客户端，以帮助确保一切正常工作。

你需要在启动时声明任何非默认的客户端设置。你可以使用标志或配置文件来声明你首选的配置。每个客户端的功能集和配置语法各不相同。查看你的客户端文档以了解具体信息。

执行和共识客户端通过[引擎 API](https://github.com/ethereum/execution-apis/tree/main/src/engine)中指定的经过身份验证的端点进行通信。为了连接到共识客户端，执行客户端必须在已知路径生成一个 [`jwtsecret`](https://jwt.io/)。出于安全和稳定性的原因，客户端应在同一台机器上运行，并且两个客户端都必须知道此路径，因为它用于验证它们之间的本地 RPC 连接。执行客户端还必须为经过身份验证的 API 定义一个监听端口。

此代币由客户端软件自动生成，但在某些情况下，你可能需要自己生成。你可以使用 [OpenSSL](https://www.openssl.org/) 生成它：

```sh
openssl rand -hex 32 > jwtsecret
```

#### 运行执行客户端 {#running-an-execution-client}

本节将指导你启动执行客户端。它仅作为基本配置的示例，将使用以下设置启动客户端：

- 指定要连接的网络，在我们的示例中为主网
  - 你可以改为选择[其中一个测试网](/developers/docs/networks/)对你的设置进行初步测试
- 定义数据目录，所有数据（包括区块链）都将存储在此处
  - 确保将路径替换为真实路径，例如，指向你的外部驱动器
- 启用与客户端通信的接口
  - 包括用于与共识客户端通信的 JSON-RPC 和引擎 API
- 定义用于经过身份验证的 API 的 `jwtsecret` 路径
  - 确保将示例路径替换为客户端可以访问的真实路径，例如 `/tmp/jwtsecret`

请记住，这只是一个基本示例，所有其他设置都将设置为默认值。请注意每个客户端的文档，以了解默认值、设置和功能。有关更多功能，例如运行验证者、监控等，请参阅特定客户端的文档。

> 请注意，示例中的反斜杠 `\` 仅用于格式化目的；配置标志可以在单行中定义。

##### 运行贝苏

此示例在主网上启动贝苏，将区块链数据以默认格式存储在 `/data/ethereum`，启用 JSON-RPC 和引擎 RPC 以连接共识客户端。引擎 API 使用代币 `jwtsecret` 进行身份验证，并且仅允许来自 `localhost` 的调用。

```sh
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

贝苏还带有一个启动器选项，它会询问一系列问题并生成配置文件。使用以下命令运行交互式启动器：

```sh
besu --Xlauncher
```

[贝苏的文档](https://besu.hyperledger.org/public-networks/get-started/start-node/)包含其他选项和配置详细信息。

##### 运行埃里贡

此示例在主网上启动埃里贡，将区块链数据存储在 `/data/ethereum`，启用 JSON-RPC，定义允许哪些命名空间，并启用用于连接共识客户端的身份验证（由 `jwtsecret` 路径定义）。

```sh
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

埃里贡默认使用 8GB HDD 执行完全同步，这将产生超过 2TB 的归档数据。确保 `datadir` 指向具有足够可用空间的磁盘，或者查看可以修剪不同类型数据的 `--prune` 标志。查看埃里贡的 `--help` 以了解更多信息。

##### 运行 Geth

此示例在主网上启动 Geth，将区块链数据存储在 `/data/ethereum`，启用 JSON-RPC 并定义允许哪些命名空间。它还启用了用于连接共识客户端的身份验证，这需要 `jwtsecret` 的路径以及定义允许哪些连接的选项，在我们的示例中仅允许来自 `localhost` 的连接。

```sh
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

查看[所有配置选项的文档](https://geth.ethereum.org/docs/fundamentals/command-line-options)，并了解有关[与共识客户端一起运行 Geth](https://geth.ethereum.org/docs/getting-started/consensus-clients) 的更多信息。

##### 运行奈瑟曼德

奈瑟曼德提供各种[安装选项](https://docs.nethermind.io/get-started/installing-nethermind)。该软件包带有各种二进制文件，包括一个带有引导式设置的启动器，它将帮助你交互式地创建配置。或者，你可以找到 Runner，它是可执行文件本身，你可以直接使用配置标志运行它。默认情况下启用 JSON-RPC。

```sh
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

奈瑟曼德文档提供了有关与共识客户端一起运行奈瑟曼德的[完整指南](https://docs.nethermind.io/get-started/running-node/)。

执行客户端将启动其核心功能、选定的端点，并开始寻找对等节点。成功发现对等节点后，客户端开始同步。执行客户端将等待来自共识客户端的连接。一旦客户端成功同步到当前状态，当前的区块链数据将可用。

##### 运行瑞斯

此示例在主网上启动瑞斯，使用默认数据位置。启用 JSON-RPC 和引擎 RPC 身份验证以连接共识客户端（由 `jwtsecret` 路径定义），并且仅允许来自 `localhost` 的调用。

```sh
reth node \
    --authrpc.jwtsecret /path/to/jwtsecret \
    --authrpc.addr 127.0.0.1 \
    --authrpc.port 8551
```

请参阅[配置瑞斯](https://reth.rs/run/config.html?highlight=data%20directory#configuring-reth)以了解有关默认数据目录的更多信息。[瑞斯的文档](https://reth.rs/run/mainnet.html)包含其他选项和配置详细信息。

#### 启动共识客户端 {#starting-the-consensus-client}

必须使用正确的端口配置启动共识客户端，以建立与执行客户端的本地 RPC 连接。共识客户端必须使用暴露的执行客户端端口作为配置参数来运行。

共识客户端还需要执行客户端的 `jwt-secret` 路径，以便验证它们之间的 RPC 连接。与上面的执行示例类似，每个共识客户端都有一个配置标志，该标志将 jwt 代币文件路径作为参数。这必须与提供给执行客户端的 `jwtsecret` 路径一致。

如果你计划运行验证者，请确保添加一个配置标志，指定费用接收者的以太坊地址。这是你的验证者的以太币奖励累积的地方。每个共识客户端都有一个选项，例如 `--suggested-fee-recipient=0xabcd1`，它将以太坊地址作为参数。

在测试网上启动信标节点时，你可以通过使用公共端点进行[检查点同步](https://notes.ethereum.org/@launchpad/checkpoint-sync)来节省大量的同步时间。

#### 运行共识客户端 {#running-a-consensus-client}

##### 运行莱特豪斯

在运行莱特豪斯之前，请在[莱特豪斯手册](https://lighthouse-book.sigmaprime.io/installation.html)中了解有关如何安装和配置它的更多信息。

```sh
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 运行洛德斯塔

通过编译或下载 Docker 镜像来安装洛德斯塔软件。在[文档](https://chainsafe.github.io/lodestar/)和更全面的[设置指南](https://hackmd.io/@philknows/rk5cDvKmK)中了解更多信息。

```sh
lodestar beacon \
    --dataDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 运行尼姆巴斯

尼姆巴斯同时带有共识和执行客户端。它可以在各种设备上运行，即使计算能力非常有限。
在[安装依赖项和尼姆巴斯本身](https://nimbus.guide/quick-start.html)之后，你可以运行其共识客户端：

```sh
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 运行普莱斯姆

普莱斯姆带有允许轻松自动安装的脚本。详细信息可以在[普莱斯姆文档](https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/)中找到。

```sh
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### 运行泰库

```sh
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

当共识客户端连接到执行客户端以读取存款合约并识别验证者时，它还会连接到其他信标节点对等节点，并开始从创世区块同步共识时段。一旦信标节点达到当前时段，信标 API 就可以供你的验证者使用了。了解有关[信标节点 API](https://ethereum.github.io/beacon-APIs) 的更多信息。

### 添加验证者 {#adding-validators}

共识客户端充当供验证者连接的信标节点。每个共识客户端都有自己的验证者软件，在其各自的文档中有详细描述。

运行你自己的验证者允许进行[独立质押](/staking/solo/)，这是支持以太坊网络最具影响力和无须信任的方法。然而，这需要存入 32 个 ETH。要以较小的金额在你自己的节点上运行验证者，具有无需许可的节点运营商的去中心化池（例如 [Rocket Pool](https://rocketpool.net/node-operators)）可能会让你感兴趣。

开始质押和生成验证者密钥的最简单方法是使用 [Hoodi 测试网质押启动板](https://hoodi.launchpad.ethereum.org/)，它允许你通过[在 Hoodi 上运行节点](https://notes.ethereum.org/@launchpad/hoodi)来测试你的设置。当你为主网做好准备时，你可以使用[主网质押启动板](https://launchpad.ethereum.org/)重复这些步骤。

查看[质押页面](/staking)以获取有关质押选项的概述。

### 使用节点 {#using-the-node}

执行客户端提供 [RPC API 端点](/developers/docs/apis/json-rpc/)，你可以使用它们以各种方式在以太坊网络上提交交易、交互或部署智能合约：

- 使用合适的协议手动调用它们（例如，使用 `curl`）
- 附加提供的控制台（例如，`geth attach`）
- 使用 Web3 库在应用程序中实现它们，例如 [Web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview)、[ethers](https://github.com/ethers-io/ethers.js/)

不同的客户端对 RPC 端点有不同的实现。但是有一个标准的 JSON-RPC，你可以与每个客户端一起使用。有关概述，请[阅读 JSON-RPC 文档](/developers/docs/apis/json-rpc/)。需要来自以太坊网络信息的应用程序可以使用此 RPC。例如，流行的钱包梅塔马斯克允许你[连接到你自己的 RPC 端点](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)，这具有很强的隐私和安全优势。

共识客户端都公开了一个[信标 API](https://ethereum.github.io/beacon-APIs)，可用于检查共识客户端的状态，或通过使用 [Curl](https://curl.se) 等工具发送请求来下载区块和共识数据。有关此内容的更多信息，请参阅每个共识客户端的文档。

#### 访问 RPC {#reaching-rpc}

执行客户端 JSON-RPC 的默认端口是 `8545`，但你可以在配置中修改本地端点的端口。默认情况下，RPC 接口只能在你的计算机的 localhost 上访问。要使其可远程访问，你可能希望通过将地址更改为 `0.0.0.0` 来将其公开。这将使其可以通过本地网络和公共 IP 地址访问。在大多数情况下，你还需要在路由器上设置端口转发。

谨慎对待向互联网暴露端口，因为这将让互联网上的任何人控制你的节点。如果你将客户端用作钱包，恶意行为者可能会访问你的节点以破坏你的系统或窃取你的资金。

解决此问题的一种方法是防止潜在有害的 RPC 方法被修改。例如，使用 Geth，你可以使用标志声明可修改的方法：`--http.api web3,eth,txpool`。

可以通过开发边缘层 API 或 Web 服务器应用程序（如 Nginx）并将它们连接到客户端的本地地址和端口来扩展对 RPC 接口的访问。利用中间层还可以让开发人员能够设置证书，以实现与 RPC 接口的安全 `https` 连接。

设置 Web 服务器、代理或面向外部的 Rest API 并不是提供对节点 RPC 端点访问的唯一方法。另一种保护隐私的设置可公开访问端点的方法是将节点托管在你自己的 [Tor](https://www.torproject.org/) 洋葱服务上。这将让你在没有静态公共 IP 地址或开放端口的情况下，在本地网络之外访问 RPC。然而，使用此配置可能只允许通过 Tor 网络访问 RPC 端点，这并非所有应用程序都支持，并且可能会导致连接问题。

为此，你必须创建自己的[洋葱服务](https://community.torproject.org/onion-services/)。查看有关洋葱服务设置的[文档](https://community.torproject.org/onion-services/setup/)以托管你自己的服务。你可以将其指向带有 RPC 端口代理的 Web 服务器，或者直接指向 RPC。

最后，提供对内部网络访问的最流行方法之一是通过 VPN 连接。根据你的用例和需要访问你的节点的用户数量，安全的 VPN 连接可能是一个选项。[OpenVPN](https://openvpn.net/) 是一个功能齐全的 SSL VPN，它使用行业标准的 SSL/TLS 协议实现 OSI 第 2 层或第 3 层安全网络扩展，支持基于证书、智能卡和/或用户名/密码凭据的灵活客户端身份验证方法，并允许使用应用于 VPN 虚拟接口的防火墙规则来实现特定于用户或组的访问控制策略。

### 运行节点 {#operating-the-node}

你应该定期监控你的节点以确保其正常运行。你可能需要进行偶尔的维护。

#### 保持节点在线 {#keeping-node-online}

你的节点不必一直在线，但你应该尽可能保持其在线，以使其与网络保持同步。你可以将其关闭以重新启动，但请记住：

- 如果最近的状态仍在写入磁盘，关闭可能需要几分钟时间。
- 强制关闭可能会损坏数据库，要求你重新同步整个节点。
- 你的客户端将与网络失去同步，并在你重新启动时需要重新同步。虽然节点可以从上次关闭的地方开始同步，但该过程可能需要一些时间，具体取决于它离线的时间长短。

_这不适用于共识层验证者节点。_ 使你的节点离线将影响所有依赖它的服务。如果你出于_质押_目的运行节点，你应该尽量减少停机时间。

#### 创建客户端服务 {#creating-client-services}

考虑创建一个服务以在启动时自动运行你的客户端。例如，在 Linux 服务器上，良好的做法是创建一个服务（例如，使用 `systemd`），该服务在具有有限权限的用户下使用正确的配置执行客户端，并自动重新启动。

#### 更新客户端 {#updating-clients}

你需要使用最新的安全补丁、功能和 [EIP](/eips/) 保持你的客户端软件是最新的。特别是在[硬分叉](/ethereum-forks/)之前，请确保你运行的是正确的客户端版本。

> 在重要的网络更新之前，以太坊基金会 (EF) 会在其[博客](https://blog.ethereum.org)上发布一篇文章。你可以[订阅这些公告](https://blog.ethereum.org/category/protocol#subscribe)，以便在你的节点需要更新时收到邮件通知。

更新客户端非常简单。每个客户端在其文档中都有具体的说明，但该过程通常只是下载最新版本并使用新的可执行文件重新启动客户端。客户端应该从它停止的地方继续，但应用了更新。

每个客户端实现都有一个人类可读的版本字符串，用于点对点协议，但也可以从命令行访问。此版本字符串让用户检查他们是否运行了正确的版本，并允许有兴趣量化特定客户端在网络上分布的区块浏览器和其他分析工具使用。有关版本字符串的更多信息，请参阅各个客户端文档。

#### 运行其他服务 {#running-additional-services}

运行你自己的节点让你能够使用需要直接访问以太坊客户端 RPC 的服务。这些是构建在以太坊之上的服务，例如[二层网络 (l2) 解决方案](/developers/docs/scaling/#layer-2-scaling)、钱包后端、区块浏览器、开发人员工具和其他以太坊基础设施。

#### 监控节点 {#monitoring-the-node}

为了正确监控你的节点，请考虑收集指标。客户端提供指标端点，因此你可以获取有关节点的全面数据。使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具创建数据库，你可以在 [Grafana](https://grafana.com/) 等软件中将其转换为可视化和图表。有许多使用此软件的设置和不同的 Grafana 仪表板供你可视化你的节点和整个网络。例如，查看[关于监控 Geth 的教程](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)。

作为监控的一部分，请务必留意机器的性能。在节点的初始同步期间，客户端软件可能会大量占用 CPU 和内存。除了 Grafana 之外，你还可以使用操作系统提供的工具（如 `htop` 或 `uptime`）来执行此操作。

## 延伸阅读 {#further-reading}

- [以太坊质押指南](https://github.com/SomerEsat/ethereum-staking-guides) - _Somer Esat，经常更新_
- [指南 | 如何在主网上设置以太坊质押的验证者](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew，经常更新_
- [EthStaker 关于在测试网上运行验证者的指南](https://github.com/remyroy/ethstaker#guides) – _EthStaker，定期更新_
- [用于以太坊节点的示例 AWS 区块链节点运行器应用程序](https://aws-samples.github.io/aws-blockchain-node-runners/docs/blueprints/ethereum) - _AWS，经常更新_
- [节点运营商的合并常见问题解答](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022 年 7 月_
- [分析成为以太坊完全验证节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902) _– Albert Palau，2018 年 9 月 24 日_
- [运行以太坊全节点：给动力不足者的指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [在以太坊主网上运行 Hyperledger 贝苏节点：优势、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [使用监控堆栈部署奈瑟曼德以太坊客户端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)
