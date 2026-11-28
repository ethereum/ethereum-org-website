---
title: "在 Raspberry Pi 5 上运行以太坊节点"
description: "刷写你的 Raspberry Pi 5，插入以太网电缆，连接 NVMe 磁盘并启动设备，将 Raspberry Pi 5 变成一个完整的以太坊节点和验证者"
author: "EthereumOnArm"
tags: ["客户端", "执行层", "共识层", "节点"]
lang: zh
skill: intermediate
breadcrumb: "Raspberry Pi 节点"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一个自定义 Linux 镜像，可以将 Raspberry Pi 变成一个以太坊节点。**

要使用 Ethereum on Arm 将 Raspberry Pi 变成以太坊节点，建议使用以下硬件：

- 具有 16 GB RAM 的 Raspberry Pi 5
- 适用于 Raspberry Pi 5 的 NVMe HAT，用于连接 NVMe 磁盘
- NVMe SSD (M.2 2280)，至少 4 TB。避免使用带有 Phison 控制器的磁盘，这些磁盘存在已知的兼容性问题。
- MicroSD 卡（至少 16 GB Class 10）
- 电源
- 以太网电缆
- 端口转发（有关更多信息，请参阅客户端）
- 带有散热器的外壳
- USB 键盘、显示器和 HDMI 电缆 (micro-HDMI)（可选）

Ethereum on Arm 还支持其他 ARM 主板，例如 NanoPC T6、Rock 5B 和 Orange Pi 5 Plus。这些主板具有原生 NVMe 支持，因此如果你要购买新硬件，Ethereum on Arm 团队建议使用它们而不是 Raspberry Pi 5。有关详细信息，请参阅[推荐硬件列表](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/overview/supported-hardware.html)。本教程的其余部分对于所有受支持的主板都是相同的，除了你下载的镜像文件。

## 为什么在 ARM 上运行以太坊？ {#why-run-ethereum-on-arm}

ARM 主板是非常实惠、灵活的小型计算机。它们是运行以太坊节点的绝佳选择，因为它们价格低廉，可以进行配置以将其所有资源仅集中在节点上，从而提高效率；它们功耗低且体积小，因此可以毫不显眼地放置在任何家庭中。启动节点也非常容易，因为只需使用预构建的镜像刷写 Raspberry Pi 的 MicroSD 卡即可，无需下载或构建软件。

## 它是如何工作的？ {#how-does-it-work}

Raspberry Pi 的存储卡被刷入了一个预构建的镜像。该镜像包含运行以太坊节点所需的一切。使用刷写好的存储卡，用户只需开启 Raspberry Pi 的电源即可。运行节点所需的所有进程都会自动启动。这是因为存储卡包含一个基于 Linux 的操作系统 (OS)，在该系统之上会自动运行系统级进程，从而将该设备变成一个以太坊节点。

Ethereum on Arm 镜像基于针对运行以太坊节点进行了优化的 64 位 Linux 发行版，并且包含预构建的以太坊客户端。

**镜像负责所有必要的步骤**，从设置环境和格式化 NVMe 磁盘到安装以太坊软件。

## 关于执行客户端和共识客户端的说明 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 镜像包含作为服务预构建的执行客户端和共识客户端。以太坊节点需要这两个客户端都保持同步并运行。你只需下载并刷写镜像，然后启动服务即可。该镜像预装了多个执行客户端（例如 Geth、Nethermind、Besu、Erigon 和 Reth）和共识客户端（例如 Lighthouse、Prysm、Teku、Nimbus 和 Lodestar）。有关当前列表，请参阅 [Ethereum on Arm 文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/running-a-node/managing-clients.html)。

你应该各选择一个来运行——所有执行客户端都与所有共识客户端兼容。本教程使用 Geth 和 Lighthouse。

## 下载镜像 {#downloading-the-image}

Ethereum on Arm 镜像是一个“即插即用”的镜像，它会自动安装和设置执行客户端和共识客户端，配置它们相互通信并连接到以太坊网络。用户只需使用一个简单的命令启动它们的进程即可。

从 [Ethereum on Arm 下载页面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/getting-started/installation.html#image-downloads)下载适用于你的主板的最新镜像。下载页面还列出了每个镜像的 SHA-256 校验和。根据它验证下载的文件：

```sh
# 在包含已下载镜像的目录中
sha256sum ethonarm_rpi5_<version>.img.zip
# 将输出与下载页面上的校验和进行比较
```

## 刷写 MicroSD {#flashing-the-microsd}

将用于 Raspberry Pi 的 MicroSD 卡应首先插入台式机或笔记本电脑，以便对其进行刷写。然后，以下终端命令会将下载的镜像刷写到 SD 卡上：

```shell
# 检查 MicroSD 卡名称
sudo fdisk -l

>> sdxxx
```

确保名称正确非常重要，因为下一个命令包含 `dd`，它会在将镜像推送到卡上之前完全擦除卡的现有内容。要继续，请导航到包含压缩镜像的目录：

```shell
# 解压并烧录镜像
unzip ethonarm_rpi5_<version>.img.zip
sudo dd bs=1M if=ethonarm_rpi5_<version>.img of=/dev/<sdxx> conv=fdatasync status=progress
```

现在卡已刷写完毕，可以将其插入 Raspberry Pi。

## 启动节点 {#start-the-node}

将 SD 卡插入 Raspberry Pi 后，连接以太网电缆和 NVMe 磁盘，然后打开电源。操作系统将启动并自动开始执行将 Raspberry Pi 变成以太坊节点的预配置任务，包括格式化 NVMe 磁盘和安装客户端软件。这可能需要 10-15 分钟，完成后主板会自动重启。在此期间请勿中断电源。

安装和配置完所有内容后，通过 ssh 连接登录设备，或者如果主板连接了显示器和键盘，则直接使用终端登录。使用 `ethereum` 账户登录，因为该账户具有启动节点所需的权限。

```shell
User: ethereum
Password: ethereum
```

首次登录时，系统会要求你更改默认密码。请务必更改，否则任何可以访问你节点的人都可以使用默认密码登录。系统防火墙默认处于禁用状态，因此如果你的节点具有公共 IP 地址，请参阅 [Ethereum on Arm 安全指南](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/system/security.html)以启用它。

首先启动共识客户端。在你的路由器上打开端口 9000（TCP 和 UDP），以便 Lighthouse 可以找到并连接到对等节点。然后启用并启动 lighthouse 服务，以便它在重启后也会重新启动：

```sh
sudo systemctl enable --now lighthouse-beacon
```

使用日志检查客户端：

```sh
sudo journalctl -u lighthouse-beacon -f
```

接下来，启动执行客户端。在你的路由器上打开端口 30303（TCP 和 UDP），以便 Geth 可以找到并连接到对等节点。然后启用并启动 geth 服务：

```sh
sudo systemctl enable --now geth
```

你可以通过检查日志来确认它正在运行：

```sh
sudo journalctl -u geth -f
```

请注意，共识客户端将在几分钟内同步，因为它使用检查点同步。执行客户端将需要更长的时间——可能需要几个小时。两个客户端同时运行：共识客户端告诉执行客户端哪个区块是链的头部，执行客户端下载并验证直到该区块的区块。

随着 Geth 和 Lighthouse 服务运行并同步，你的 Raspberry Pi 现在是一个以太坊节点了！最常见的是使用 Geth 的 JavaScript 控制台与以太坊网络进行交互，该控制台可以附加到端口 8545 上的 Geth 客户端。也可以使用 Curl 等请求工具提交格式化为 JSON 对象的命令。在 [Geth 文档](https://geth.ethereum.org/)中了解更多信息。

该镜像还包含一个 Grafana 仪表板，高级用户可以通过在浏览器中导航到 `ipaddress:3000` 来使用它监控其节点的运行状况。

## 验证者 {#validators}

也可以选择将验证者添加到共识客户端。验证者软件允许你的节点积极参与共识，并为网络提供加密经济安全性。你将获得 ETH 作为这项工作的奖励。要运行验证者，你必须首先拥有 32 个 ETH，这些 ETH 必须存入存款合约。可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的分步指南进行存款。在台式机/笔记本电脑上执行此操作，但不要生成密钥——这可以直接在 Raspberry Pi 上完成。

[ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) 工具生成验证者密钥。当前的镜像包含它；如果你运行的是较旧的镜像，请先安装它。然后生成存款密钥，将 `<YOUR_ETH_ADDRESS>` 替换为应接收你提款的地址：

```sh
sudo apt-get update
sudo apt-get install ethstaker-deposit-cli
cd && deposit new-mnemonic --num_validators 1 --execution_address <YOUR_ETH_ADDRESS> --chain mainnet
```

（或者下载 [ethstaker-deposit-cli](https://github.com/ethstaker/ethstaker-deposit-cli) 以在物理隔离的机器上运行，并在那里运行 `deposit new-mnemonic` 命令）

妥善保管助记词！上面的命令在 `validator_keys` 目录中生成了两个文件：验证者密钥和存款数据文件。存款数据需要上传到 launchpad，因此必须将其从 Raspberry Pi 复制到台式机/笔记本电脑。这可以使用 ssh 连接或任何其他复制/粘贴方法来完成。

一旦运行 launchpad 的计算机上有了存款数据文件，就可以将其拖放到 launchpad 屏幕上的 `+` 中。按照屏幕上的说明向存款合约发送交易。

回到 Raspberry Pi，可以启动验证者。这需要导入验证者密钥，设置收集奖励的地址，然后启动预配置的验证者进程。以下示例适用于 Lighthouse——其他共识客户端的说明可在 [Ethereum on Arm 文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/staking/solo-staking.html)中找到：

```shell
# 导入验证者密钥
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 设置奖励地址（将 <YOUR_ETH_ADDRESS> 替换为您的地址）
sudo sed -i 's/changeme/<YOUR_ETH_ADDRESS>/' /etc/ethereum/lighthouse-validator.conf

# 启动验证者
sudo systemctl enable --now lighthouse-validator
```

恭喜，你现在已经在 Raspberry Pi 上运行了一个完整的以太坊节点和验证者！

## 更多详细信息 {#more-details}

本页面概述了如何使用 Raspberry Pi 设置 Geth-莱特豪斯节点和验证者。更详细的说明可在 [Ethereum-on-Arm 网站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)上找到。

## 欢迎提供反馈 {#feedback-appreciated}

我们知道 Raspberry Pi 拥有庞大的用户群，这可能对以太坊网络的健康产生非常积极的影响。
请深入了解本教程中的详细信息，尝试在测试网上运行，查看 [Ethereum on Arm GitHub](https://github.com/EOA-Blockchain-Labs/ethereumonarm)，提供反馈，提出问题和拉取请求，并帮助推进技术和文档！

## 参考文献 {#references}

1. https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://geth.ethereum.org
6. https://lighthouse.sigmaprime.io
7. https://github.com/ethstaker/ethstaker-deposit-cli
