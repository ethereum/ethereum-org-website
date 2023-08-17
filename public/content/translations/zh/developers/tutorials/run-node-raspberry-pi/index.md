---
title: 如何通过刷写MicroSD卡将您的Raspberry Pi 4变为一个节点
description: 刷写树莓派 4，插入以太网电缆，连接固态硬盘并打开设备电源，将树莓派 4 变为以太坊全节点 + 验证者。
author: "EthereumOnArm"
tags:
  - "客户端"
  - "执行层"
  - "共识层"
  - "节点"
lang: zh
skill: advanced
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html
postMergeBannerTranslation: page-upgrades-post-merge-banner-tutorial-ood
---

**Ethereum on Arm 是一个定制 Linux 映像，它可以将树莓派转变成以太坊节点。**

为了使用 Ethereum on Arm 将树莓派转变成以太坊节点，推荐使用以下硬件：

- 树莓派 4（B 型，8 GB）
- MicroSD 卡（最小 16 GB，Class 10）
- 最小 2TB 的 USB3.0 固态硬盘或使用 USB3.0 转 SATA 转接盒的固态硬盘
- 电源
- 以太网电缆
- 端口转发（详情请查看客户端）
- 带散热片和风扇的外壳
- USB 键盘、显示器和 HDMI 数据线（微型 HDMI）（可选）

## 为什么要在 ARM 上运行以太坊？ {#why-run-ethereum-on-arm}

ARM 单板机是一种便宜、灵活的小型计算机。 它们价格低廉、效率高、可配置成将全部资源专用于节点、能耗低、体积小，可以很顺利地安装在任何家庭中，因此成为运行以太坊节点的不二之选。 启动节点也非常容易，因为树莓派的 MicroSD 卡可以简单地使用预建映像刷写，无需下载或构建软件。

## 工作原理 {#how-does-it-work}

使用预先构建的映像刷写树莓派的内存卡。 此映像包含了运行以太坊节点所需的一切。 在刷写完内存卡后，用户只需要启动树莓派即可。 运行节点所需的所有进程自动启动。 这是可行的，因为内存卡中有基于 Linux 的操作系统，系统级进程在此操作系统上自动运行，将树莓派转变成以太坊节点。

以太坊不能在流行的树莓派 Linux 操作系统“Raspbian”下运行，因为 Raspbian 还在使用 32 位指令集架构，这会给以太坊用户带来内存问题，而且共识客户端也不支持 32 位二进制文件。 为了解决这一问题，Ethereum on Arm 团队迁移到原生 64 位操作系统“Armbian”。

**映像负责处理所有必要的步骤**，包括从设置环境和格式化固态磁盘，到安装和运行以太坊软件，以及启动区块链同步。

## 执行客户端和共识客户端说明 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 相关文档解释了如何设置执行客户端*或*共识客户端，两个以太坊测试网（Kiln 和 Ropsten）除外。 这种可选性只有在以太坊从工作量证明过渡到权益证明（称为[合并](/roadmap/merge)）之前才有可能。

<InfoBanner>
合并后，将无法单独运行执行客户端和共识客户端 — 它们必须成对运行。 因此，在本教程中，我们将在以太坊测试网 (Kiln) 上运行一对执行客户端和共识客户端。
</InfoBanner>

## Kiln 树莓派 4 映像 {#the-kiln-raspberry-pi-4-image}

Kiln 是一个专门用于测试合并的公共测试网。 Ethereum on Arm 团队开发了一个映像，让用户可以在这个合并测试网上快速启动一对以太坊客户端。 Kiln 合并已经发生，但该网络仍在运行，因此可用于本教程。 Kiln 上的以太币没有实际价值。

Kiln 树莓派 4 映像是一种“即插即用”映像，它会自动安装和设置执行客户端与共识客户端，配置它们相互通信并连接到 Kiln 网络。 用户需要做的就是使用一个简单的命令启动他们的进程。 该映像包含四种执行客户端（Geth、Nethermind、Besu 和 Erigon）和四种共识客户端（Lighthouse、Prysm、Nimbus、Teku），可供用户选择。

从 [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/ES56R_SuvaVFkiMO1Tgnf6kB7lEbBfla5c2c18E3WQRJzA?download=1) 下载树莓派映像并验证 SHA256 哈希：

```sh
# From directory containing the downloaded image
shasum -a 256 ethonarm_kiln_22.03.01.img.zip
# Hash should output: 485cf36128ca60a41b5de82b5fee3ee46b7c479d0fc5dfa5b9341764414c4c57
```

请注意，对于没有树莓派但有 AWS 帐户的用户，提供的 ARM 实例可以运行相同的映像。 说明和 AWS 映像可从 Ethereum on Arm (https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html) 下载。

## 刷写 MicroSD 卡 {#flashing-the-microsd}

首先，应将用于树莓派的 MicroSD 卡插入台式机或笔记本电脑中，以便可以刷写。 接着，在终端执行以下命令，将下载的映像刷写到 SD 卡中：

```shell
# 检查 Micro SD 卡名
sudo fdisk -I

>> sdxxx
```

正确的 SD 卡名称非常重要，因为下一条命令中的指令 `dd` 会在写入映像前彻底清除 SD 卡上的全部已有内容。 接下来，导航到包含压缩映像文件的目录：

```shell
# 解压并烧录镜像
unzip ethonarm_kiln_22.03.01.img.zip
sudo dd bs=1M if=ethonarm_kiln_22.03.01.img of=/dev/mmcblk0 conv=fdatasync status=progress
```

现在 SD 卡已刷写完成，可以将其插入树莓派中了。

## 启动节点 {#start-the-node}

将 SD 卡插入树莓派后，连接以太网电缆和固态硬盘，然后打开电源。 操作系统将启动并自动执行预先配置好的任务，包括安装和构建客户端软件，从而将树莓派转变成以太坊节点。 此过程大约需要 10-15 分钟。

所有安装和配置完成后，通过安全外壳连接登录设备，或者如果单板机已经连接了键盘和显示器，也可以直接使用终端。 使用 `ethereum` 帐户登录，因为此帐户有启动节点所需的权限。

```shell
User: ethereum
Password: ethereum
```

然后，用户可以选择他们希望运行的执行客户端和共识客户端组合，并按如下方式启动他们的 systemctl 进程（示例中运行 Geth 和 Lighthouse）：

```shell
sudo systemctl start geth-lh
sudo systemctl start lh-geth-beacon
```

可以使用以下指令检查日志

```shell
# logs for Geth
sudo journalctl -u geth-lh -f
#logs for lighthouse
sudo journalctl -u lh-geth-beacon -f
```

[Ethereum on Arm 相关文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#id2)中提供有每一对客户端组合的特定服务名称。 它们可用于更新此处提供的命令，以用于任何客户端组合。

## 验证者 {#validators}

为了运行验证者，必须首先访问 32 个测试网以太币，它们必须存入 Kiln 存款合约。 这可以按照 [Kiln 启动板](https://kiln.launchpad.ethereum.org/en/)上的分步指南来完成。 在台式机/笔记本电脑上执行此操作，但不要生成密钥 — 密钥生成可以直接在树莓派上完成。

在树莓派上打开一个终端并运行以下命令来生成存款密钥：

```
cd && deposit new-mnemonic --num_validators 1 --chain kiln
```

保持助记词安全！ 上面的命令在节点的密钥库中生成了两个文件：验证者密钥和存款数据文件。 存款数据需要上传到启动板，因此必须要从树莓派复制到台式机/笔记本电脑。 这可以使用安全外壳连接或任何其他复制/粘贴方法来完成。

在存款数据文件在运行启动板的计算机上可用后，就可以将其拖放到启动板界面上的 `+` 上。 按照屏幕上的说明将交易发送到存款合约。

返回树莓派，可以启动验证者。 这需要导入验证者密钥，设置领取奖励的地址，然后启动预先配置好的验证者进程。 以下示例适用于 Lighthouse — 其他共识客户端的说明见 [Ethereum on Arm 相关文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/kiln/kiln-testnet.html#lighthouse)：

```shell
#导入验证器密钥
lighthouse-kl account validator import --directory=/home/ethereum/validator_keys --datadir=/home/ethereum/.lh-geth/kiln/testnet-lh

#设置收款地址地址
sudo sed -i ‘<ETH_ADDRESS>’ /etc/ethereum/kiln/lh-geth-validator.conf

#启动验证器
sudo systemctl start lh-geth-validator
```

恭喜，你现在拥有运行在树莓派上的以太坊全节点和验证者！

## 感谢反馈 {#feedback-appreciated}

我们知道树莓派拥有庞大的用户群体，能对以太坊网络的健康产生非常积极的影响。 请深入了解本教程中的详细信息，尝试在其他测试网甚至以太坊主网上运行，查看 Ethereum on Arm GitHub，提供反馈，提出问题并拉取请求，并帮助改进技术和相关文档！

## 参考文献 {#references}

1. https://ubuntu.com/download/raspberry-pi
2. https://wikipedia.org/wiki/Port_forwarding
3. https://prometheus.io
4. https://grafana.com
5. https://forum.armbian.com/topic/5565-zram-vs-swap/
6. https://geth.ethereum.org
7. https://nethermind.io
8. https://www.hyperledger.org/projects/besu
9. https://github.com/prysmaticlabs/prysm
10. https://lighthouse.sigmaprime.io
11. https://ethersphere.github.io/swarm-home
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org
