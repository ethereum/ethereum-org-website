---
title: 如何通过刷写MicroSD卡将您的Raspberry Pi 4变为一个节点
description: 刷写您的树莓派 4，插入以太网电缆，连接固态硬盘并打开设备电源，将树莓派 4 转变为运行执行层或共识层的完整以太坊节点（信标链/验证者）
author: "EthereumOnArm"
tags:
  - "客户端"
  - "执行层"
  - "共识层"
  - "节点"
lang: zh
skill: intermediate
published: 2020-05-07
source: r/ethereum
sourceUrl: https://www.reddit.com/r/ethereum/comments/gf3nhg/ethereum_on_arm_raspberry_pi_4_images_release/
---

**TL;DR**：刷写您的树莓派 4，插入以太网电缆，连接固态硬盘并打开设备电源，将树莓派 4 转变为运行执行层或共识层的完整以太坊节点（信标链/验证者）

[了解有关以太坊升级的信息](/upgrades/)

首先是一些背景。 如您所知，运行 Raspberry Pi 4 镜像时，我们已经遇到了一些内存问题[[1]](/developers/tutorials/run-node-raspberry-pi/#references)，因为 Raspbian 操作系统仍然是 32 位操作系统[[2]](/developers/tutorials/run-node-raspberry-pi/#references)（至少用户区是如此）。 虽然我们更愿意坚持使用官方操作系统，但我们得出的结论是，为了解决这些问题，我们需要迁移原生的 64 位操作系统。

此外，[共识客户端](/upgrades/get-involved/#clients)不支持 32 位二进制文件，因此使用 Raspbian 会阻止树莓派 4 运行共识层节点（以及质押的可能性）。

因此，几经测试，我们现将发布基于 64 位 Ubuntu 20.04 [[3]](/developers/tutorials/run-node-raspberry-pi/#references) 的两个不同映像：执行层版和共识层版。

基本上，两者都是相同的映像，并且包含基于 Raspbian 的映像的相同功能。 但它们被设置为默认运行执行层或共识层软件。

**程序负责所有必要的步骤**，从设置环境和格式化 SSD 磁盘到安装和运行以太坊软件，以及启动区块链同步。

## 主要特性 {#main-features}

- 基于 Ubuntu 20.04 64 位
- 自动完成 USB 磁盘分区和格式化
- 在 Armbian 工作的基础上增加了交换内存（ZRAM 内核模块 + 一个交换文件）[[7]](/developers/tutorials/run-node-raspberry-pi/#references)。
- 根据 MAC 哈希值将主机名改为像“ethnode-e2a3e6fe”这样的名称。
- 将软件作为 systemd 服务运行并开始同步区块链
- 包括一个用于安装和升级以太坊软件的 APT 存储库
- 包括一个基于 Grafana/Prometheus 的监控仪表板

## 包含的软件 {#software-included}

两个映像都包含相同的软件包，它们之间唯一的区别是执行版默认运行 Geth，而共识版则默认运行 Prysm 信标链。

### 执行客户端 {#execution-clients}

- Geth[[8]](/developers/tutorials/run-node-raspberry-pi/#references)：1.9.13 (官方二进制文件)
- Parity[[9]](/developers/tutorials/run-node-raspberry-pi/#references)：2.7.2（交叉编译）。
- Nethermind [[10]](/developers/tutorials/run-node-raspberry-pi/#references)：1.8.28（交叉编译）。
- Hyperledger Besu[[11]](/developers/tutorials/run-node-raspberry-pi/#references)：1.4.4（已编译）。

### 共识客户端 {#consensus-clients}

- Prysm[[12]](/developers/tutorials/run-node-raspberry-pi/#references)：1.0.0-alpha6（官方二进制文件）。
- Lighthouse[[13]](/developers/tutorials/run-node-raspberry-pi/#references)：0.1.1（已编译）。

### 以太坊框架 {#ethereum-framework}

- Swarm[[14]](/developers/tutorials/run-node-raspberry-pi/#references)：0.5.7（官方二进制文件）。
- Raiden Network[[15]](/developers/tutorials/run-node-raspberry-pi/#references)：0.200.0~rc1（官方二进制文件）。
- IPFS[[16]](/developers/tutorials/run-node-raspberry-pi/#references)：0.5.0（官方二进制文件）。
- Statusd[[17]](/developers/tutorials/run-node-raspberry-pi/#references)：0.52.3（已编译）。
- Vipnode[[18]](/developers/tutorials/run-node-raspberry-pi/#references)：2.3.3（官方二进制文件）。

## 安装指南和使用方法 {#installation-guide-and-usage}

### 推荐的硬件和设置 {#recommended-hardware-and-setup}

- Raspberry 4（B 型）- 4GB
- MicroSD 卡（最小 16 GB，10 级）
- SSD USB 3.0 磁盘（见存储部分）
- 电源
- 以太网电缆
- 30303 端口转发（执行层）和 13000 端口转发（共识层）[[4]](/developers/tutorials/run-node-raspberry-pi/#references)
- 带散热片和风扇的机箱（可选，但强烈推荐）
- USB 键盘、显示器和 HDMI 电缆（微型 HDMI）（可选）。

## 存储 {#storage}

你将需要一个固态硬盘来运行以太坊客户端（没有固态硬盘，就绝对没有机会同步以太坊区块链）。 有两种选择：

- 使用 USB 便携式 SSD 磁盘，如三星 T5 便携式 SSD。
- 使用带有 SSD 磁盘的 USB3.0 外置硬盘盒。 在我们的例子中，我们使用了 Inateck 2.5 硬盘盒 FE2011。 请确保购买带有 UAS 兼容芯片的机箱，特别是这些芯片之一：JMicron（JMS567 或 JMS578）或 ASMedia（ASM1153E）。

在两种情况下，都需避免使用劣质 SSD 磁盘，因为它是节点的关键组成部分，可能会极大地影响性能（及同步时间）。

请记住，需要将磁盘插入 USB 3.0 端口（蓝色）

## 映像下载和安装 {#image-download-and-installation}

### 1. 下载执行层和共识层映像 {#1-download-execution-or-consensus-images}

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip">
  下载执行层映像
</ButtonLink>

sha256 7fa9370d13857dd6abcc8fde637c7a9a7e3a66b307d5c28b0c0d29a09c73c55c

<ButtonLink to="https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth2.img.zip">
  下载共识层映像
</ButtonLink>

sha256 74c0c15b708720e5ae5cac324f1afded6316537fb17166109326755232cd316e

### 2. 刷写映像 {#2-flash-the-image}

在您的台式机/笔记本电脑中插入 microSD，然后下载文件（例如执行层）。

```bash
wget https://ethraspbian.com/downloads/ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
```

注意：如果您不习惯使用命令行，或者运行的是 Windows，则可以使用[Etcher](https://etcher.io)。

打开终端并检查您的 MicroSD 设备名称是否正在运行：

```bash
sudo fdisk -l
```

您应会看到一个名为 mcblk0 或 sdd 的设备。 解压缩并刷写镜像：

```bash
unzip ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img.zip
sudo dd bs=1M if=ubuntu-20.04-preinstalled-server-arm64+raspi-eth1.img of=/dev/mmcblk0 && sync
```

### 3. 将 MicroSD 插入 Raspberry Pi 4。 连接以太网电缆并插入 USB SSD 硬盘（确保您使用的是蓝色端口）。 {#3-insert-the-microsd-into-the-raspberry-pi-4-connect-an-ethernet-cable-and-attach-the-usb-ssd-disk-make-sure-you-are-using-a-blue-port}

### 4. 打开设备电源 {#4-power-on-the-device}

Ubuntu 操作系统将在一分钟内启动，但**您将需要等待大约 10 分钟**，以便让脚本执行必要的任务，来将设备变成以太坊节点并重新启动 Raspberry。

根据镜像，您将运行：

- 执行客户端：Geth 作为同步区块链的默认客户端
- 共识客户端：Prysm 作为同步信标链的默认客户端（Prater 测试网）。

### 5. 登录 {#5-log-in}

您可以通过 SSH 或使用控制台登录（如果连接了显示器和键盘）。

```bash
User: ethereum
Password: ethereum
```

第一次登录时会提示您更改密码，因此需要登录两次。

### 6. 为 Geth 打开 30303 端口，如果您正在运行 Prysm 信标链，则打开 13000 端口。 如果不知道如何执行此操作，请搜索 "端口转发"，后跟您的路由器型号。 {#6-open-30303-port-for-geth-and-13000-if-you-are-running-prysm-beacon-chain-if-you-dont-know-how-to-do-this-google-port-forwarding-followed-by-your-router-model}

### 7. 获取控制台输出 {#7-get-console-output}

您可以通过输入以下命令查看后台发生了什么：

```bash
sudo tail -f /var/log/syslog
```

**恭喜！ 您现在正在您的 Raspberry Pi 4 上运行一个完整的以太坊节点。**

## 同步区块链 {#syncing-the-blockchain}

现在您需要等待区块链同步。 对于执行层，这将需要几天的时间，具体取决于若干因素，但预计最多需要约 5-7 天。

如果运行的是共识层 Prater 测试网，则可以预期约 1-2 天的信标链同步时间。 请记住，您需要稍后设置验证器才能启动权益质押过程。 [如何运行共识层验证器](/developers/tutorials/run-node-raspberry-pi/#validator)

## 监测仪表板 {#monitoring-dashboards}

在这第一个版本中，包括了 3 个基于 Prometheus 的监测仪表板[[5]](/developers/tutorials/run-node-raspberry-pi/#references) / Grafana[[6]](/developers/tutorials/run-node-raspberry-pi/#references)，以便监测节点和客户端的数据（Geth 和 Besu）。 您可以通过您的 Web 浏览器访问：

```bash
URL: http://your_raspberrypi_IP:3000
User: admin
Password: ethereum
```

## 切换客户端 {#switching-clients}

所有客户端都作为 systemd 服务运行。 这一点很重要，因为如果出现问题，系统将自动重启进程。

Geth 和 Prysm 信标链会默认运行（具体取决于您所同步的内容、执行层或共识层），因此如果您想切换到其他客户端（例如从 Geth 切换到 Nethermind），您需要先停止并禁用 Geth，然后启用并启动另一个客户端：

```bash
sudo systemctl stop geth && sudo systemctl disable geth
```

启用和运行执行客户端的命令：

```bash
sudo systemctl enable besu && sudo systemctl start besu
sudo systemctl enable nethermind && sudo systemctl start nethermind
sudo systemctl enable parity && sudo systemctl start parity
```

共识客户端：

```bash
sudo systemctl stop prysm-beacon && sudo systemctl disable prysm-beacon
sudo systemctl start lighthouse && sudo systemctl enable lighthouse
```

## 更改参数 {#changing-parameters}

客户端的配置文件位于/etc/ethereum/目录中。 您可以编辑这些文件，并重启 systemd 服务，以使更改生效。 唯一的例外是 Nethermind，它还有一个在以下位置的主网配置文件：

```bash
/etc/nethermind/configs/mainnet.cfg
```

区块链客户端的数据存储在以太坊主帐户上，如下所示（注意目录名称前的点）。

### 执行层 {#execution-layer}

```bash
/home/ethereum/.geth
/home/ethereum/.parity
/home/ethereum/.besu
/home/ethereum/.nethermind
```

### 共识层 {#consensus-layer}

```bash
/home/ethereum/.eth2
/home/ethereum/.eth2validators
/home/ethereum/.lighthouse
```

## Nethermind 和 Hyperledger Besu {#nethermind-and-hyperledger-besu}

这两个出色的执行层客户端已经成为 Geth 和 Parity 的绝佳替代方案。 网络的多样性越多越好，所以您可以试一试，为网络健康作出贡献。

两者都需要进一步的测试，所以请随时使用它们并报告您的反馈。

## 如何运行共识验证器（质押） {#validator}

Prater 测试网信标链同步后，您便可以在同一设备中运行验证器。 您需要遵循[这些参与步骤](https://prylabs.net/participate)。

第一次，您需要通过运行 "验证器 "二进制文件手动创建一个帐户，并设置一个密码。 一旦您完成了这一步，就可以将密码添加到`/etc/ethereum/prysm-validator.conf`，并将验证器作为一个 systemd 服务启动。

## 感谢反馈 {#feedback-appreciated}

我们投入了大量的工作，试图将 Raspberry Pi 4 设置为一个完整的以太坊节点，因为我们知道这个设备的庞大用户群可能对网络产生非常积极的影响。

请考虑到这是基于 Ubuntu 20.04 的第一个映像，所以可能会有一些错误。 如果确实出现了错误，请在 [GitHub](https://github.com/diglos/ethereumonarm) 上开一个 issue 或在 [Twitter](https://twitter.com/EthereumOnARM) 上联系我们。

## 参考： {#references}

1. [Geth 反复出现 SIGSEGV 崩溃](https://github.com/ethereum/go-ethereum/issues/20190)
2. [https://github.com/diglos/ethereumonarm](https://github.com/diglos/ethereumonarm)
3. https://ubuntu.com/download/raspberry-pi
4. https://wikipedia.org/wiki/Port_forwarding
5. https://prometheus.io
6. https://grafana.com
7. https://forum.armbian.com/topic/5565-zram-vs-swap/
8. https://geth.ethereum.org
9. https://github.com/openethereum/openethereum \* **注意，OpenEthereum [已经废弃](https://medium.com/openethereum/gnosis-joins-erigon-formerly-turbo-geth-to-release-next-gen-ethereum-client-c6708dd06dd)并停止维护。**请谨慎使用，最好切换至其他客户端实现。
10. https://nethermind.io
11. https://www.hyperledger.org/projects/besu
12. https://github.com/prysmaticlabs/prysm
13. https://lighthouse.sigmaprime.io
14. https://ethersphere.github.io/swarm-home
15. https://raiden.network
16. https://ipfs.io
17. https://status.im
18. https://vipnode.org
