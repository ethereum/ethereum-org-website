---
title: 启动自己的以太坊节点
description: 如何运行自己的以太坊客户端简介
lang: zh
sidebarDepth: 2
---

运行你自己的节点为你提供各种好处，打开新的可能性，并为支持生态系统提供帮助。 这个页面将引导你启动自己的节点，并参与验证以太坊交易。

注意，在[合并](/roadmap/merge)之后，运行以太坊节点需要两种客户端，即**执行层 (EL) **客户端和**共识层 (CL) **客户端。 本页面将展示如何安装、配置和连接这两种客户端以运行以太坊节点。

## 前提条件 {#prerequisites}

你应该明白什么是以太坊节点，以及你可能想要运行客户端的原因。 [节点和客户端](/developers/docs/nodes-and-clients/)涵盖了这一主题。

如果你不熟悉运行节点这一主题，或者正在寻找技术含量较低的方式，建议你先参阅我们为了便于用户理解而编撰的[运行以太坊节点](/run-a-node)简介。

## 选择一种方式 {#choosing-approach}

要启动自己的以太坊节点，第一步是选择你的运行方式。 根据要求和各种可能性，你必须选择客户端实现（执行客户端和共识客户端）、环境（硬件、系统）和客户端设置参数。

本页面将指导你做出这些决定，并帮助你找到运行以太坊实例的最合适方式。

要选择客户端实现，请查看所有可用的主网就绪[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)，并了解[客户端多样性](/developers/docs/nodes-and-clients/client-diversity)。

决定是在自己的[硬件还是云端](#local-vs-cloud)运行软件，同时考虑客户端的[要求](#requirements)。

准备好环境后，使用带有高级选项的终端，通过[初学者友好界面](#automatized-setup)或[手动](#manual-setup)安装所选客户端。

在节点运行和同步后，你便随时可以[使用该节点](#using-the-node)，但请务必留意节点的[维护](#operating-the-node)。

![客户端设置](./diagram.png)

### 运行环境和硬件设施 {#environment-and-hardware}

#### 本地或云端 {#local-vs-cloud}

以太坊客户端能够在消费级电脑上运行，并且不需要任何专用硬件，例如矿机。 因此，你可以根据需要选择多种节点部署方案。 简而言之，我们考虑在本地物理计算机和云端服务器上运行节点：

- 云端
  - 服务商提供了高可用的服务器以及静态公共 IP 地址
  - 获得专用或虚拟服务器比自己搭建更加方便
  - 取舍是：是否需要信赖云服务商三方
  - 由于全节点所需的存储大小，租用服务器的价格可能会很高
- 自有硬件
  - 更去信任并且更有主动权
  - 只需一次性投入
  - 可以购买预先配置好的机器
  - 你必须亲自准备并维护机器和网络，并有可能亲自对机器和网络进行故障排除

上面两种方案各有优点，总结如上。 如果你正在寻找云端解决方案，除了许多传统云计算服务商外，还有一些专注于部署以太坊节点的服务商， 查看[节点即服务](/developers/docs/nodes-and-clients/nodes-as-a-service/)，了解有关托管节点的更多选项。

#### 硬件 {#hardware}

不过，一个抗审查的去中心化网络不应该依赖于云服务提供商。 而且，在自己的本地硬件上运行节点对该生态系统来说更健康。 从[估算数据](https://www.ethernodes.org/networkType/Hosting)来看，在云端运行大部分节点可能引发单点故障。

以太坊客户端可以在你的计算机、笔记本电脑、服务器甚至单板计算机上运行。 虽然可以在你的个人计算机上运行客户端，但为你的节点配备一台专用机器可以显著提高其性能和安全性，同时最大限度地减少对你的主计算机的影响。

使用自己的硬件非常容易。 一般人可以选择一些简单的选项，技术水平较高的人士则可以在高级设置当中进行抉择。 接下来，我们了解一下在你的机器上运行以太坊客户端的要求和方法。

#### 要求 {#requirements}

硬件要求因客户端不同而异，但通常不是很高，因为节点只需保持同步即可。 不要将其与需要更多算力的挖矿混淆。 不过，功能更强大的硬件的确可以优化同步时间和性能。

在安装任何客户端之前，请确保计算机有足够的资源运行它。 你可以在下面找到最低要求和推荐要求。

硬件的瓶颈通常是磁盘空间。 同步以太坊区块链是一种高强度的输入/输出密集型操作，并且需要大量空间。 最好使用在同步完成后还有数百 GB 可用空间的**固态硬盘 (SSD)**。

数据库的大小和初始同步速度取决于所选客户端、其配置和[同步策略](/developers/docs/nodes-and-clients/#sync-modes)。

你还要确保网络连接没有[带宽限制](https://wikipedia.org/wiki/Data_cap)。 我们建议你使用不计流量的网络连接，因为初始同步和广播到网络的数据可能超过你的限额。

##### 操作系统

所有客户端都支持主流操作系统——Linux、MacOS、Windows。 这意味着你可以在普通台式机或服务器上运行节点，并在这些设备上安装最适合你的操作系统 (OS)。 为了避免出现潜在的问题和安全漏洞，请确保你的操作系统为最新。

##### 最低要求

- 2 核以上 CPU
- 8 GB 内存
- 2 TB 固态硬盘
- 10 MB/秒以上带宽

##### 推荐的规格要求

- 4 核以上高速 CPU
- 16GB 以上内存
- 2TB 以上高速固态硬盘
- 25 MB/秒以上带宽

你选择的同步模式和客户端将影响磁盘空间要求，但我们估计了下面每种客户端需要的磁盘空间。

| 客户端     | 磁盘大小（快照同步） | 磁盘大小（完整归档） |
| ---------- | -------------------- | -------------------- |
| Geth       | 500GB+               | 12TB 以上            |
| Nethermind | 500GB+               | 12TB 以上            |
| Besu       | 800GB 以上           | 12TB 以上            |
| Erigon     | 未提供               | 2.5TB 以上           |

- 注意：Erigon 未提供快照同步，但可以进行完全修剪 (~500GB)

对于共识客户端，空间要求也取决于客户端实现和启用的功能（例如验证者、罚没者），但通常需要另外 200GB 磁盘空间存储信标数据。 由于验证者数量巨大，带宽负载也会增加。 你可以[在此分析中找到关于共识客户端要求的详细信息](https://mirror.xyz/0x934e6B4D7eee305F8C9C42b46D6EEA09CcFd5EDc/b69LBy8p5UhcGJqUAmT22dpvdkU-Pulg2inrhoS9Mbc)。

#### 即插即用解决方案 {#plug-and-play}

即插即用解决方案是使用自身硬件运行节点的最简单方式。 来自供应商的预配置机器提供最简洁的体验：订购、连接、运行。 一切都已预配置好并自动运行，你可以通过直观的指南和仪表板监测和控制软件。

- [DappNode](https://dappnode.io/)
- [Avado](https://ava.do/)

#### 在单板计算机上运行以太坊 {#ethereum-on-a-single-board-computer}

运行以太坊节点的一种经济简便的方法是使用单板计算机，甚至可以使用 ARM 架构的单板机，如树莓派。 [ARM 上的以太坊](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)为树莓派和其他 ARM 单板机提供便于运行的多种执行客户端和共识客户端映像。

这类小型、实惠且高效的设备非常适合在家中运行节点，但请记住它们的性能有限。

## 启动节点 {#spinning-up-node}

实际的客户端设置可以使用自动启动器完成，或者通过直接设置客户端软件手动完成。

对于初级用户，推荐的方法是使用启动器，这种软件可以指导你完成安装并自动执行客户端设置过程。 但是，如果你有一些终端使用经验，手动设置步骤应该很容易完成。

### 引导式设置 {#automatized-setup}

一些用户友好的项目旨在改善客户端设置体验。 这些启动器提供自动客户端安装和配置，有些甚至提供图形界面用于引导式设置和监测客户端。

以下是一些可以帮助你安装和控制客户端的项目，只需单击几下即可：

- [DappNode](https://docs.dappnode.io/user/quick-start/first-steps/) - DappNode 不仅仅可以在供应商提供的机器上安装。 该软件、实际的节点启动器和具有许多功能的控制中心可以在任意硬件上使用。
- [eth-docker](https://eth-docker.net/) - 使用 Docker 进行的自动化设置专注于简便和安全的质押，它需要用户具备基本的终端和 Docker 知识。我们推荐进阶用户可以选择此项目。
- [Stereum](https://stereum.net/ethereum-node-setup/) - 通过 SSH 连接在远程服务器上安装客户端的启动器，配备 GUI 设置指南、控制中心和许多其他功能。
- [NiceNode](https://www.nicenode.xyz/) - 提供简便用户体验的启动器，可在你的计算机上运行节点。 只需选择客户端并单击几下即可启动它们。 仍在开发中。
- [Sedge](https://docs.sedge.nethermind.io/docs/intro) - 节点设置工具，使用 CLI 向导自动生成 Docker 配置。 由 Nethermind 使用 Go 编写。

### 手动客户端设置 {#manual-setup}

另一种选择是手动下载、验证和配置客户端软件。 即使一些客户端提供图形界面，手动设置仍然需要一些基本的终端使用技能，但它可以提供更多功能。

如上所述，设置自己的以太坊节点需要运行一对共识客户端和执行客户端。 一些客户端可能包括另一类型的轻客户端，并且无需任何其他软件即可同步。 但是，完全去信任验证需要同时实现这两种客户端。

#### 获取客户端软件 {#getting-the-client}

首先，你需要获取自己喜欢的[执行客户端](/developers/docs/nodes-and-clients/#execution-clients)和[共识客户端](/developers/docs/nodes-and-clients/#consensus-clients)软件。

你可以仅下载适合你的操作系统和架构的可执行应用或安装包。 始终验证下载安装包的签名和校验和。 一些客户端还提供存储库或 Docker 映像，以简化安装和更新。 所有客户端都是开源的，因此你也可以使用源代码构建它们。 这是一种更高阶的方法，但在某些情况下，你可能需要这么做。

上述客户端列表中的链接文档提供各个客户端的安装说明。

以下是客户端的发布页面，你可以在其中找到它们的预构建二进制文件或安装说明：

##### 执行客户端

- [Besu](https://github.com/hyperledger/besu/releases)
- [Erigon](https://github.com/ledgerwatch/erigon#usage)（不提供预构建的二进制文件，必须编译）
- [Geth](https://geth.ethereum.org/downloads/)
- [Nethermind](https://downloads.nethermind.io/)

另外值得注意的是，客户端多样性有关[执行层的问题](/developers/docs/nodes-and-clients/client-diversity/#execution-layer)之一。 我们建议读者考虑运行非主流执行客户端。

##### 共识客户端

- [Lighthouse](https://github.com/sigp/lighthouse/releases/latest)
- [Lodestar](https://chainsafe.github.io/lodestar/install/source/)（不提供预构建的二进制文件，仅提供 Docker 映像或使用源代码进行构建）
- [Nimbus](https://github.com/status-im/nimbus-eth2/releases/latest)
- [Prysm](https://github.com/prysmaticlabs/prysm/releases/latest)
- [Teku](https://github.com/ConsenSys/teku/releases)

[客户端多样性](/developers/docs/nodes-and-clients/client-diversity/)对于运行验证者的共识节点来说至关重要。 如果大多数验证者都在运行单一客户端实现，那么网络安全就会面临风险。 因此，我们建议考虑选择非主流客户端。

[查看最新的网络客户端使用情况](https://clientdiversity.org/)，并了解关于[客户端多样性](/developers/docs/nodes-and-clients/client-diversity)的更多信息。

##### 验证软件

从互联网下载软件时，建议验证其完整性。 此步骤是可选的，但特别是对于像以太坊客户端这样的关键基础设施，务必要了解潜在的攻击向量并避免它们。 如果下载了预构建的二进制文件，则需要信任它，并冒着攻击者将可执行文件替换为恶意文件的风险。

开发者使用他们的 PGP 密钥签署已发布的二进制文件，这样你就可以通过加密方式验证你正在运行他们创建的软件。 你只需要获取开发者使用的公钥，公钥可以在客户端发布页面或文档中找到。 下载客户端版本及其签名后，你可以使用 PGP 实现（例如 [GnuPG](https://gnupg.org/download/index.html)）轻松验证它们。 查看有关在 [Linux](https://www.tecmint.com/verify-pgp-signature-downloaded-software/) 或 [Windows/MacOS](https://freedom.press/training/verifying-open-source-software/) 上使用 `gpg` 验证开源软件的教程。

另一种验证方式是确保所下载软件的哈希（一种唯一的加密指纹）与开发者提供的哈希相符。 这种方式甚至比使用 PGP 更容易，并且一些客户端仅提供此选项。 只需在下载的软件上运行哈希函数并将其与发布页面中的哈希进行比较。 例如：

```
sha256sum teku-22.6.1.tar.gz

9b2f8c1f8d4dab0404ce70ea314ff4b3c77e9d27aff9d1e4c1933a5439767dde
```

#### 客户端设置 {#client-setup}

安装、下载或编译客户端软件后，你就可以运行它了。 这仅意味着必须使用正确的配置执行客户端。 客户端提供丰富的配置选项，你可以通过它们启用各种功能。

我们从可以显著影响客户端性能和数据使用的选项开始介绍。 [同步模式](/developers/docs/nodes-and-clients/#sync-modes)是指下载和验证区块链数据的不同方法。 在启动节点前，你应该决定使用哪种网络和同步模式。 最重要的考虑因素是客户端需要的磁盘空间和同步时间。 关注客户端文档以便确定默认的同步模式。 如果默认的同步模式不适合你，请根据安全级别、可用数据和成本选择另一种同步模式。 除了同步算法之外，你还可以设置修剪不同类型的旧数据。 修剪可以删除过时的数据，例如删除最近区块上无法访问的状态树节点。

其他基本配置选项包括：选择网络（主网或测试网）、为远程过程调用或 WebSocket 启用超文本传输协议端点等。 你可以在客户端相关文档中找到所有功能和选项。 你可以通过使用对应的标记在 CLI 或配置文件中直接执行客户端，以便设置不同的客户端配置。 每种客户端都有一点差异；有关配置选项的详细信息，请始终参阅其官方文档或帮助页面。

进行测试时，你可能更愿意在其中一个测试网上运行客户端。 [参阅受支持网络概览](/developers/docs/nodes-and-clients/#execution-clients)。

要了解如何运行具有基本配置的执行客户端，请见下一节中的示例。

#### 启动执行客户端 {#starting-the-execution-client}

启动以太坊客户端软件之前，请最后检查环境是否已就绪。 例如，请确保：

- 针对所选的网络和同步模式，磁盘空间足够。
- 内存和 CPU 未被其他程序停止。
- 操作系统已更新至最新版本。
- 系统有正确的时间和日期。
- 路由器和防火墙接受监听端口上的连接。 默认情况下，以太坊客户端使用监听 (TCP) 端口和发现端口 (UDP)，两者默认均在 30303 上。

首先在测试网上运行客户端，这有助于确保一切都正常运行。

你需要在一开始就声明所有非默认的客户端配置。 你可以使用标记或配置文件来声明你的首选配置。 每种客户端的功能集和配置语法都不同。 请查看你的客户端相关文档，了解具体细节。

执行客户端和共识客户端通过[引擎应用程序接口](https://github.com/ethereum/execution-apis/tree/main/src/engine)中指定的经过身份验证的端点进行通信。 为了连接到共识客户端，执行客户端必须在已知路径上生成 [`jwtsecret`](https://jwt.io/)。 出于安全和稳定性的原因，客户端应该在同一台机器上运行，并且两种客户端都必须知道该路径，因为该路径用于验证它们之间的本地远程过程调用连接。 执行客户端还必须为经过身份验证的应用程序接口定义一个监听端口。

此令牌由客户端软件自动生成，但在某些情况下，你可能需要自己生成它。 你可以使用 [OpenSSL](https://www.openssl.org/) 生成该令牌：

```
openssl rand -hex 32 > jwtsecret
```

#### 运行执行客户端 {#running-an-execution-client}

本节将指导你启动执行客户端。 它仅提供基本配置示例，该示例将使用以下设置启动客户端：

- 指定要连接的网络，在我们的示例中为主网
  - 你也可以选择[任一测试网络](/developers/docs/networks/)，用于设置的初步测试
- 定义数据目录，包括区块链在内的所有数据都将存储在其中
  - 确保用真实路径代替该路径，例如指向外置驱动器的路径
- 启用与客户端通信的接口
  - 包括用于与共识客户端通信的 JSON 远程过程调用和引擎应用程序接口
- 为经过身份验证的应用程序接口定义 `jwtsecret` 的路径
  - 确保将示例路径替换为客户端可以访问的真实路径，例如 `/tmp/jwtsecret`

请记住，这只是一个基本示例，所有其他设置都将设置为默认值。 请关注每种客户端的相关文档以了解默认的值、设置和功能。 有关更多功能的信息，例如运行验证者、监测等，请参考具体客户端的相关文档。

> 请注意，示例中的反斜杠 `\` 仅用于设置格式；配置标记可以在一行中定义。

##### 运行 Besu

此示例在主网上启动 Besu，将区块链数据以默认格式存储在 `/data/ethereum` 下，启用 JSON 远程过程调用和引擎应用程序接口以连接共识客户端。 使用令牌 `jwtsecret` 对引擎应用程序接口进行身份验证，并且只允许来自 `localhost` 的调用。

```
besu --network=mainnet \
    --data-path=/data/ethereum \
    --rpc-http-enabled=true \
    --engine-rpc-enabled=true \
    --engine-host-allowlist="*" \
    --engine-jwt-enabled=true \
    --engine-jwt-secret=/path/to/jwtsecret
```

Besu 还带有一个启动器选项，它会询问一系列问题并生成配置文件。 使用以下命令运行交互式启动器：

```
besu --Xlauncher
```

[Besu 相关文档](https://besu.hyperledger.org/en/latest/HowTo/Get-Started/Starting-node/)包含更多选项和配置详细信息。

##### 运行 Erigon

此示例在主网上启动 Erigon，将区块链数据存储在 `/data/ethereum` 下，启用 JSON 远程过程调用，定义允许的命名空间，并启用身份验证以连接由 `jwtsecret` 路径定义的共识客户端。

```
erigon --chain mainnet \
    --datadir /data/ethereum  \
    --http --http.api=engine,eth,web3,net \
    --authrpc.jwtsecret=/path/to/jwtsecret
```

默认情况下，Erigon 使用 8GB 机械硬盘执行完全同步，这将产生超过 2TB 的归档数据。 确保 `datadir` 指向有足够可用空间的磁盘，或者考虑使用可以修剪不同类型数据的 `--prune` 标记。 查看 Erigon 的 `--help` 了解更多信息。

##### 运行 Geth

此示例在主网上启动 Geth，将区块链数据存储在 `/data/ethereum` 下，启用 JSON 远程过程调用并定义允许的命名空间。 它还会启用身份验证（以便连接需要使用 `jwtsecret` 路径的共识客户端）以及定义允许哪些连接的选项，在我们的示例中仅允许来自 `localhost` 的连接。

```
geth --mainnet \
    --datadir "/data/ethereum" \
    --http --authrpc.addr localhost \
    --authrpc.vhosts="localhost" \
    --authrpc.port 8551
    --authrpc.jwtsecret=/path/to/jwtsecret
```

查看[相关文档中的所有配置选项](https://geth.ethereum.org/docs/fundamentals/command-line-options)，并了解关于[运行 Geth 和共识客户端](https://geth.ethereum.org/docs/getting-started/consensus-clients)的更多信息。

##### 运行 Nethermind

Nethermind 提供各种[安装选项](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/getting-started)。 该软件包附带各种二进制文件，包括一个带有引导式设置的启动器，它将帮助你以交互方式创建配置。 或者，你会找到可执行文件 Runner，并且可以使用配置标记运行它。 默认情况下启用 JSON 远程过程调用。

```
Nethermind.Runner --config mainnet \
    --datadir /data/ethereum \
    --JsonRpc.JwtSecretFile=/path/to/jwtsecret
```

Nethermind 相关文档提供了有关运行 Nethermind 和共识客户端的[完整指南](https://docs.nethermind.io/nethermind/first-steps-with-nethermind/running-nethermind-post-merge)。

执行客户端将启动其核心功能及所选端点，并开始寻找对等节点。 成功发现对等节点后，该客户端开始同步。 执行客户端将等待来自共识客户端的连接。 当客户端成功同步到最新状态时，最新的区块链数据将可用。

#### 启动共识客户端 {#starting-the-consensus-client}

共识客户端必须以正确的端口配置启动，才能与执行客户端建立本地远程过程调用连接。 它在运行时必须使用公开的执行客户端端口作为配置参数。

共识客户端还需要执行客户端的 `jwt-secret` 的路径，以便对它们之间的远程过程调用连接进行身份验证。 与上面的执行示例类似，每种共识客户端都有一个配置标记，该标记使用 jwt 令牌文件的路径作为参数。 此路径必须与提供给执行客户端的 `jwt-secret` 路径一致。

如果你打算运行验证者，确保添加一个配置标记以指定接收费用的以太坊地址。 这是为你的验证者积攒以太币奖励的地址。 每种共识客户端都有一个将以太坊地址作为参数的选项，例如 `--suggested-fee-recipient=0xabcd1`。

在测试网上启动信标节点时，可以使用公共端点进行[检查点同步](https://notes.ethereum.org/@launchpad/checkpoint-sync)，从而大大节省同步时间。

#### 运行共识客户端

##### 运行 Lighthouse

在运行 Lighthouse 之前，请在 [Lighthouse 手册](https://lighthouse-book.sigmaprime.io/installation.html)中详细了解如何安装和配置它。

```
lighthouse beacon_node \
    --network mainnet \
    --datadir /data/ethereum \
    --http \
    --execution-endpoint http://127.0.0.1:8551 \
    --execution-jwt /path/to/jwtsecret
```

##### 运行 Lodestar

通过编译或下载 Docker 映像来安装 Lodestar 软件。 在[相关文档](https://chainsafe.github.io/lodestar/)和更全面的[设置指南](https://hackmd.io/@philknows/rk5cDvKmK)中了解更多信息。

```
lodestar beacon \
    --rootDir="/data/ethereum" \
    --network=mainnet \
    --eth1.enabled=true \
    --execution.urls="http://127.0.0.1:8551" \
    --jwt-secret="/path/to/jwtsecret"
```

##### 运行 Nimbus

Nimbus 包括共识客户端和执行客户端。 它也可以在各种设备上运行，甚至可以在算力很一般的设备上运行。 [安装依赖项和 Nimbus](https://nimbus.guide/quick-start.html)后，你可以运行它的共识客户端：

```
nimbus_beacon_node \
    --network=mainnet \
    --web3-url=http://127.0.0.1:8551 \
    --rest \
    --jwt-secret="/path/to/jwtsecret"
```

##### 运行 Prysm

Prysm 带有脚本，可实现轻松自动安装。 详细信息可以在 [Prysm 相关文档](https://docs.prylabs.network/docs/install/install-with-script)中找到。

```
./prysm.sh beacon-chain \
    --mainnet \
    --datadir /data/ethereum  \
    --execution-endpoint=http://localhost:8551  \
    --jwt-secret=/path/to/jwtsecret
```

##### 运行 Teku

```
teku --network mainnet \
    --data-path "/data/ethereum" \
    --ee-endpoint http://localhost:8551 \
    --ee-jwt-secret-file "/path/to/jwtsecret"
```

当共识客户端连接到执行客户端读取存款合约并识别验证者时，它也连接到其他对等信标节点并开始从创世块同步共识时隙。 信标节点达到当前时段后，信标应用程序接口将可供验证者使用。 了解关于[信标节点应用程序接口](https://eth2docs.vercel.app/)的更多信息。

### 添加验证者 {#adding-validators}

共识客户端充当验证者要连接的信标节点。 每种共识客户端都有自己的验证者软件，后者在各自的相关文档中都有详细描述。

运行自己的验证者便可以进行[单独质押](/staking/solo/)，这是支持以太坊网络的最有影响的去信任方法。 然而，单独质押需要存入 32 个以太币。 若想在自己的节点上运行验证者并质押较少数量的以太币，你可能会对由无需许可的节点运营商组成的去中心化池感兴趣，例如 [Rocket Pool](https://rocketpool.net/node-operators)。

开始质押和生成验证者密钥的最简单方法是使用 [Goerli 测试网质押启动板](https://goerli.launchpad.ethereum.org/)，它允许你通过[在 Goerli 上运行节点](https://notes.ethereum.org/@launchpad/goerli)来测试你的设置。 当准备好使用主网时，你可以使用[主网质押启动板](https://launchpad.ethereum.org/)重复这些步骤。

研读[质押页面](/staking)以了解质押选项概述。

### 使用节点 {#using-the-node}

执行客户端提供[远程过程调用应用程序接口端点](/developers/docs/apis/json-rpc/)；在以太坊网络上，你可以通过多种方式使用这些端点提交交易、与智能合约交互或部署智能合约：

- 使用合适的协议（例如，`curl`）手动调用端点
- 附加提供的控制台（例如 `geth attach`）
- 使用 Web3 库在应用中实现端点，例如 [web3.py](https://web3py.readthedocs.io/en/stable/overview.html#overview) 和 [ethers](https://github.com/ethers-io/ethers.js/)

不同的客户端有不同的远程过程调用端点实现。 不过，你可以选择一种标准 JSON-RPC 与每种客户端搭配使用。 想要了解概况，[请阅读 JSON-RPC 文档](/developers/docs/apis/json-rpc/)。 需要从以太坊网络中获取信息的应用，可以使用此远程过程调用。 例如，受欢迎的钱包 MetaMask 可让你[连接到自己的远程过程调用端点](https://metamask.zendesk.com/hc/en-us/articles/360015290012-Using-a-Local-Node)，该端点具有卓越的隐私和安全优势。

共识客户端都公开一个[信标应用程序接口](https://ethereum.github.io/beacon-APIs)，可用于检查共识客户端的状态，或者通过使用 [Curl](https://curl.se) 等工具发送请求来下载区块和共识数据。 更多相关信息可在每种共识客户端的相关文档中找到。

#### 访问远程过程调用 {#reaching-rpc}

执行客户端 JSON-RPC 的默认端口是 `8545`，但可以在配置中修改本地端点的端口。 默认情况下，远程过程调用接口只能在计算机的本地主机上访问。 为了让该端口可被远程访问，你可以通过将地址改为 `0.0.0.0` 公开它。 这样就可以通过本地网络或公共互联网协议地址访问该端口。 大多数情况下，你还需要在路由器上设置端口转发。

在互联网上公开端口时应保持谨慎，因为这会让互联网上的任何人都可以控制你的节点。 恶意行为者可以通过访问你的节点让你的系统下线，或者如果你将客户端用作钱包，他们会窃取你的资金。

解决该问题的办法是，禁止修改可能有危害的远程过程调用方法。 例如，对于 Geth，你可以使用标记 `—http.api web3,eth,txpool` 声明可修改的方法。

开发边缘层应用程序接口或 Web 服务器应用（如 Nginx）并将它们连接到客户端的本地地址和端口，这样做可扩展对远程过程调用接口的访问。 利用中间层还让开发者能够设置远程过程调用接口的安全 `https` 连接证书。

设置 Web 服务器、代理或面向外部的表现层状态转换应用程序接口，并不是访问节点的远程过程调用端点的唯一方法。 另一种设置可公开访问端点且保护隐私的方法是，将节点托管在自己的 [Tor](https://www.torproject.org/) 洋葱服务上。 这将让你在本地网络外部无需静态公共互联网协议地址或开放的端口也能访问此远程过程调用端口。 然而，使用此配置可能只允许通过 Tor 网络访问远程过程调用端点，但并非所有应用程序都支持 Tor 网络，从而可能导致发生连接问题。

为此，你必须创建自己的[洋葱服务](https://community.torproject.org/onion-services/)。 查看有关洋葱服务设置的[相关文档](https://community.torproject.org/onion-services/setup/)以托管你自己的节点。 你可以将其指向具有远程过程调用端口代理的 Web 服务器，或者直接指向远程过程调用。

最后，访问内部网络最流行的方式之一是通过虚拟专用网连接。 根据你的用例和需要访问节点的用户数，也许可以选择安全的虚拟专用网连接。 [OpenVPN](https://openvpn.net/) 是一种功能完善的安全套接层虚拟专用网，它使用行业标准安全套接字层/传输层安全协议实现了开放式系统互联二层或三层安全网络扩展，支持基于证书、智能卡和/或用户名/密码凭据的灵活客户端身份验证方法，并允许用户或群组特定的访问控制策略（使用应用于虚拟专用网虚拟接口的防火墙规则）。

### 运行节点 {#operating-the-node}

你应该定期监控你的节点，确保它正常运行。 你可能还需要偶尔对它进行维护。

#### 保持节点在线 {#keeping-node-online}

你的节点不必一直在线，但你应该尽可能让节点保持在线，使其与网络保持同步。 你可以将其关闭以重新启动，但请记住：

- 如果正在向磁盘写入最近的网络状态，关闭节点可能需要花费几分钟。
- 强制关闭会破坏数据库，这可能需要你重新同步整个节点。
- 客户端将无法与网络同步，重启后，客户端需要重新同步。 虽然节点可以从它最近一次关闭的位置开始同步，但此过程需要的时间取决于它离线的时间。

*但是，共识层的验证者节点就需要一直在线。*验证者节点离线将影响所有依赖它的服务。 如果你是为了*质押*而运行节点，应该尽可能地减少停机时间。

#### 创建客户端服务 {#creating-client-services}

考虑创建一个在启动时自动运行客户端的服务。 例如，在 Linux 服务器上，最佳做法是创建一种服务，例如使用 `systemd`，为有限权限的用户执行配置正确的客户端并自动重启。

#### 更新客户端 {#updating-clients}

你应该通过安装最新的安全补丁、功能和[以太坊改进提案](/eips/)，让客户端软件更新到最新版本。 特别是在[硬分叉](/history/)之前，确保运行正确的客户端版本。

> 在重要的网络更新之前，以太坊基金会在其[博客](https://blog.ethereum.org)上发布相关文章。 你可以[订阅这些公告](https://groups.google.com/a/ethereum.org/g/announcements)，以便在你的节点需要更新时收到邮件通知。

更新客户端非常简单。 每种客户端在其相关文档中都有具体说明，但通常更新过程仅包括下载最新版本并使用正确的可执行文件重启而已。 客户端应该会从上一次中断的位置继续，但请应用所有更新。

每种客户端实现都有一个人类可读的版本字符串，该字符串在点对点协议中使用但也可以从命令行访问。 该版本字符串让用户可以检查他们运行的客户端版本是否正确，并支持区块浏览器和用来量化网络上特定客户端分布的其他分析工具。 有关版本字符串的更多信息，请参阅各客户端相关文档。

#### 运行额外服务 {#running-additional-services}

运行自己的节点，可以让你使用需要直接访问以太坊客户端远程过程调用的服务。 这些服务构建在以太坊上，如[二层网络解决方案](/developers/docs/scaling/#layer-2-scaling)、钱包后端、区块浏览器、开发者工具和其他以太坊基础设施。

#### 监测节点 {#monitoring-the-node}

为了正确监测节点，请考虑收集指标。 客户端提供了指标端点，因此你可以获得有关节点的全面数据。 使用 [InfluxDB](https://www.influxdata.com/get-influxdb/) 或 [Prometheus](https://prometheus.io/) 等工具创建数据库，并且可以在 [Grafana](https://grafana.com/) 等软件中将其可视化并转换成图表。 在可视化节点和整个网络时，Grafana 有许多设置和各种仪表版可供使用。 例如，查看[有关监测 Geth 的教程](/developers/tutorials/monitoring-geth-with-influxdb-and-grafana/)。

在监测过程中，请务必密切关注机器的性能。 在节点初始同步期间，客户端软件可能会占用大量 CPU 和内存资源。 除了 Grafana，你也可以使用操作系统自带的 `htop` 或 `uptime` 等工具来监测节点。

## 延伸阅读 {#further-reading}

- [以太坊质押指南](https://github.com/SomerEsat/ethereum-staking-guides) _ – Somer Esat，定期更新_
- [指南 | 如何在主网上为以太坊质押设置验证者](https://www.coincashew.com/coins/overview-eth/guide-or-how-to-setup-a-validator-on-eth2-mainnet) _– CoinCashew，定期更新_
- [有关在测试网上运行验证者的 ETHStaker 指南](https://github.com/remyroy/ethstaker#guides) – _ETHStaker，定期更新_
- [面向节点运营商的合并常见问题解答](https://notes.ethereum.org/@launchpad/node-faq-merge) - _2022 年 7 月_
- [分析成为已验证以太坊全节点的硬件要求](https://medium.com/coinmonks/analyzing-the-hardware-requirements-to-be-an-ethereum-full-validated-node-dc064f167902)_ - Albert Palau，2018 年 9 月 24 日_
- [运行以太坊全节点：勉励者指南](https://medium.com/@JustinMLeroux/running-ethereum-full-nodes-a-guide-for-the-barely-motivated-a8a13e7a0d31) _– Justin Leroux，2019 年 11 月 7 日_
- [在以太坊主网上运行 Hyperledger Besu 节点：优点、要求和设置](https://pegasys.tech/running-a-hyperledger-besu-node-on-the-ethereum-mainnet-benefits-requirements-and-setup/) _– Felipe Faraggi，2020 年 5 月 7 日_
- [部署具有监测堆栈的 Nethermind 以太坊客户端](https://medium.com/nethermind-eth/deploying-nethermind-ethereum-client-with-monitoring-stack-55ce1622edbd) _– Nethermind.eth，2020 年 7 月 8 日_

## 相关主题 {#related-topics}

- [节点和客户端](/developers/docs/nodes-and-clients/)
- [区块](/developers/docs/blocks/)
- [网络](/developers/docs/networks/)
