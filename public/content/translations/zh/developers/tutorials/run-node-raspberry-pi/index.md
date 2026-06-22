---
title: "在 Raspberry Pi 4 上运行以太坊节点"
description: "刷写 Raspberry Pi 4，插入以太网电缆，连接 SSD 磁盘并开启设备，将 Raspberry Pi 4 变成一个完整的以太坊节点和验证者"
author: "EthereumOnArm"
tags: ["客户端", "执行层", "共识层", "节点"]
lang: zh
skill: intermediate
breadcrumb: "Raspberry Pi 节点"
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一个自定义的 Linux 镜像，可以将 Raspberry Pi 变成一个以太坊节点。**

要使用 Ethereum on Arm 将 Raspberry Pi 变成以太坊节点，推荐使用以下硬件：

- Raspberry Pi 4（B 型 8GB）、Odroid M1 或 Rock 5B（8GB/16GB RAM）主板
- MicroSD 卡（至少 16 GB Class 10）
- 至少 2 TB 的 USB 3.0 SSD 磁盘或带有 USB 转 SATA 硬盘盒的 SSD。
- 电源
- 以太网电缆
- 端口转发（有关更多信息，请参阅客户端）
- 带有散热器和风扇的外壳
- USB 键盘、显示器和 HDMI 电缆（micro-HDMI）（可选）

## 为什么在 ARM 上运行以太坊？ {#why-run-ethereum-on-arm}

ARM 主板是非常实惠、灵活的小型计算机。它们是运行以太坊节点的绝佳选择，因为它们价格低廉，可以进行配置以将其所有资源仅集中在节点上，从而提高效率；它们功耗低且体积小，因此可以毫不显眼地放置在任何家庭中。启动节点也非常容易，因为只需使用预构建的镜像刷写 Raspberry Pi 的 MicroSD 卡即可，无需下载或构建软件。

## 它是如何工作的？ {#how-does-it-work}

Raspberry Pi 的存储卡被刷入了一个预构建的镜像。该镜像包含运行以太坊节点所需的一切。使用刷好镜像的存储卡，用户只需开启 Raspberry Pi 的电源即可。运行节点所需的所有进程都会自动启动。这是因为存储卡包含一个基于 Linux 的操作系统 (OS)，在该系统之上会自动运行系统级进程，从而将该设备变成一个以太坊节点。

无法使用流行的 Raspberry Pi Linux 操作系统“Raspbian”运行以太坊，因为 Raspbian 仍然使用 32 位架构，这会导致以太坊用户遇到内存问题，并且共识客户端不支持 32 位二进制文件。为了克服这个问题，Ethereum on Arm 团队迁移到了一个名为“Armbian”的原生 64 位操作系统。

**镜像负责处理所有必要的步骤**，从设置环境和格式化 SSD 磁盘，到安装和运行以太坊软件，以及启动区块链同步。

## 关于执行客户端和共识客户端的注意事项 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 镜像包含作为服务预构建的执行客户端和共识客户端。以太坊节点需要这两个客户端都处于同步和运行状态。你只需下载并刷写镜像，然后启动服务即可。该镜像预装了以下执行客户端：

- Geth
- 奈瑟曼德
- 贝苏

以及以下共识客户端：

- 莱特豪斯
- 尼姆巴斯
- 普莱斯姆
- 泰库

你应该各选择一个来运行——所有执行客户端都与所有共识客户端兼容。如果你没有明确选择客户端，节点将回退到其默认设置（Geth 和莱特豪斯），并在主板通电时自动运行它们。你必须在路由器上打开 30303 端口，以便 Geth 能够找到并连接到对等节点。

## 下载镜像 {#downloading-the-image}

Raspberry Pi 4 以太坊镜像是一个“即插即用”的镜像，它会自动安装并设置执行客户端和共识客户端，配置它们相互通信并连接到以太坊网络。用户只需使用一个简单的命令启动它们的进程即可。

从 [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) 下载 Raspberry Pi 镜像并验证 SHA-256 哈希：

```sh
# 从包含下载镜像的目录
shasum -a 256 ethonarm_22.04.00.img.zip
# 哈希输出应为：fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

请注意，Rock 5B 和 Odroid M1 主板的镜像可在 Ethereum-on-Arm 的[下载页面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)获取。

## 刷写 MicroSD 卡 {#flashing-the-microsd}

将用于 Raspberry Pi 的 MicroSD 卡应首先插入台式机或笔记本电脑中，以便进行刷写。然后，以下终端命令会将下载的镜像刷入 SD 卡：

```shell
# 检查 MicroSD 卡名称
sudo fdisk -l

>> sdxxx
```

确保名称正确非常重要，因为下一个命令包含 `dd`，它会在将镜像推送到卡上之前完全擦除卡上的现有内容。要继续，请导航到包含压缩镜像的目录：

```shell
# 解压并烧录镜像
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

现在卡已刷写完毕，可以将其插入 Raspberry Pi 中。

## 启动节点 {#start-the-node}

将 SD 卡插入 Raspberry Pi 后，连接以太网电缆和 SSD，然后打开电源。操作系统将启动并自动开始执行预配置的任务，将 Raspberry Pi 变成一个以太坊节点，包括安装和构建客户端软件。这可能需要 10-15 分钟。

一旦所有内容都安装和配置完毕，请通过 ssh 连接登录设备，或者如果主板连接了显示器和键盘，则直接使用终端登录。使用 `ethereum` 账户登录，因为该账户具有启动节点所需的权限。

```shell
User: ethereum
Password: ethereum
```

默认的执行客户端 Geth 将自动启动。你可以使用以下终端命令检查日志来确认这一点：

```sh
sudo journalctl -u geth -f
```

共识客户端确实需要显式启动。为此，首先在路由器上打开 9000 端口，以便莱特豪斯能够找到并连接到对等节点。然后启用并启动莱特豪斯服务：

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

使用日志检查客户端：

```sh
sudo journalctl -u lighthouse-beacon
```

请注意，共识客户端将在几分钟内同步，因为它使用检查点同步。执行客户端将需要更长的时间——可能需要几个小时，并且在共识客户端完成同步之前它不会启动（这是因为执行客户端需要一个同步目标，而同步后的共识客户端提供了该目标）。

随着 Geth 和莱特豪斯服务运行并同步，你的 Raspberry Pi 现在就是一个以太坊节点了！最常见的是使用 Geth 的 JavaScript 控制台与以太坊网络进行交互，该控制台可以附加到 8545 端口上的 Geth 客户端。也可以使用 Curl 等请求工具提交格式化为 JSON 对象的命令。在 [Geth 文档](https://geth.ethereum.org/)中查看更多信息。

Geth 预先配置为向 Grafana 仪表板报告指标，可以在浏览器中查看。更高级的用户可能希望使用此功能来监控其节点的运行状况，方法是导航到 `ipaddress:3000`，并传递 `user: admin` 和 `passwd: ethereum`。

## 验证者 {#validators}

也可以选择将验证者添加到共识客户端。验证者软件允许你的节点积极参与共识，并为网络提供加密经济安全性。你将获得 ETH 作为这项工作的奖励。要运行验证者，你必须首先拥有 32 个 ETH，这些 ETH 必须存入存款合约中。可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的分步指南进行存款。在台式机/笔记本电脑上执行此操作，但不要生成密钥——这可以直接在 Raspberry Pi 上完成。

在 Raspberry Pi 上打开终端并运行以下命令以生成存款密钥：

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

（或者下载 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) 以在物理隔离的机器上运行，并运行 `deposit new-mnemnonic` 命令）

妥善保管助记词！上面的命令在节点的密钥库中生成了两个文件：验证者密钥和存款数据文件。存款数据需要上传到 Launchpad，因此必须将其从 Raspberry Pi 复制到台式机/笔记本电脑。这可以使用 ssh 连接或任何其他复制/粘贴方法来完成。

一旦运行 Launchpad 的计算机上有了存款数据文件，就可以将其拖放到 Launchpad 屏幕上的 `+` 中。按照屏幕上的说明向存款合约发送交易。

回到 Raspberry Pi，可以启动验证者了。这需要导入验证者密钥，设置收集奖励的地址，然后启动预配置的验证者进程。以下示例适用于莱特豪斯——其他共识客户端的说明可在 [Ethereum on Arm 文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)中找到：

```shell
# 导入验证者密钥
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 设置奖励地址
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 启动验证者
sudo systemctl start lighthouse-validator
```

恭喜，你现在已经在 Raspberry Pi 上运行了一个完整的以太坊节点和验证者！

## 更多详细信息 {#more-details}

本页面概述了如何使用 Raspberry Pi 设置 Geth-莱特豪斯节点和验证者。更详细的说明可在 [Ethereum-on-Arm 网站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)上找到。

## 欢迎提供反馈 {#feedback-appreciated}

我们知道 Raspberry Pi 拥有庞大的用户群，这可能对以太坊网络的健康产生非常积极的影响。
请深入了解本教程中的详细信息，尝试在测试网上运行，查看 Ethereum on Arm 的 GitHub，提供反馈，提出问题 (issues) 和拉取请求 (pull requests)，并帮助推进技术和文档的发展！

## 参考资料 {#references}

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
11. https://docs.ethswarm.org/
12. https://raiden.network
13. https://ipfs.io
14. https://status.im
15. https://vipnode.org