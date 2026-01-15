---
title: 在树莓派 4 上运行以太坊节点
description: 刷写你的树莓派 4，插入网线，连接固态硬盘并启动设备，将树莓派 4 变成一个完整的以太坊节点 + 验证者。
author: "EthereumOnArm"
tags: [ "客户端", "执行层", "共识层", "节点" ]
lang: zh
skill: intermediate
published: 2022-06-10
source: Ethereum on ARM
sourceUrl: https://ethereum-on-arm-documentation.readthedocs.io/en/latest/
---

**Ethereum on Arm 是一个自定义的 Linux 镜像，可将树莓派转变为以太坊节点。**

要使用 Ethereum on Arm 将树莓派转变为以太坊节点，推荐使用以下硬件：

- 树莓派 4（B 型 8GB）、Odroid M1 或 Rock 5B（8GB/16GB RAM）板
- MicroSD 卡（最低 16 GB，Class 10）
- 最低 2 TB 的 USB 3.0 固态硬盘，或带有 USB 转 SATA 硬盘盒的固态硬盘。
- 电源
- 以太网电缆
- 端口转发（更多信息请参见客户端）
- 带散热片和风扇的外壳
- USB 键盘、显示器和 HDMI 线（micro-HDMI）（可选）

## 为什么要在 ARM 上运行以太坊？ {#why-run-ethereum-on-arm}

ARM 单板机是非常实惠、灵活的小型计算机。 它们是运行以太坊节点的理想选择，因为它们价格低廉，可配置为将所有资源专用于节点，从而提高效率，而且功耗低、体积小，可以不引人注目地放置在任何家庭中。 启动节点也非常容易，因为树莓派的 MicroSD 卡只需用预构建的镜像刷写即可，无需下载或构建软件。

## 工作原理 {#how-does-it-work}

使用预构建的镜像刷写树莓派的存储卡。 此镜像包含运行以太坊节点所需的一切。 刷好卡后，用户只需启动树莓派即可。 运行节点所需的所有进程都会自动启动。 这是可行的，因为存储卡中包含一个基于 Linux 的操作系统 (OS)，系统级进程在其上自动运行，从而将该设备转变为以太坊节点。

以太坊无法在使用流行的树莓派 Linux 操作系统“Raspbian”上运行，因为 Raspbian 仍使用 32 位架构，这会导致以太坊用户遇到内存问题，并且共识客户端不支持 32 位二进制文件。 为了克服这个问题，Ethereum on Arm 团队迁移到了一个名为“Armbian”的原生 64 位操作系统。

**镜像会处理所有必要的步骤**，从设置环境和格式化固态硬盘，到安装和运行以太坊软件，以及启动区块链同步。

## 关于执行客户端和共识客户端的说明 {#note-on-execution-and-consensus-clients}

Ethereum on Arm 镜像包含作为服务预构建的执行客户端和共识客户端。 以太坊节点需要两个客户端都已同步并正在运行。 您只需下载并刷写镜像，然后启动服务。 该镜像预装了以下执行客户端：

- Geth
- Nethermind
- Besu

以及以下共识客户端：

- Lighthouse
- Nimbus
- Prysm
- Teku

您应该各选择一个来运行——所有执行客户端都与所有共识客户端兼容。 如果您没有明确选择客户端，节点将回退到其默认设置——Geth 和 Lighthouse，并在单板机通电时自动运行它们。 您必须在路由器上打开 30303 端口，以便 Geth 能够找到并连接到对等节点。

## 下载镜像 {#downloading-the-image}

树莓派 4 以太坊镜像是“即插即用”镜像，它会自动安装并设置执行客户端和共识客户端，配置它们相互通信并连接到以太坊网络。 用户所要做的就是使用一个简单的命令来启动其进程。

从 [Ethereum on Arm](https://ethereumonarm-my.sharepoint.com/:u:/p/dlosada/Ec_VmUvr80VFjf3RYSU-NzkBmj2JOteDECj8Bibde929Gw?download=1) 下载树莓派镜像，并验证 SHA256 哈希值：

```sh
# 从包含已下载镜像的目录中
shasum -a 256 ethonarm_22.04.00.img.zip
# 哈希值应输出：fb497e8f8a7388b62d6e1efbc406b9558bee7ef46ec7e53083630029c117444f
```

请注意，Rock 5B 和 Odroid M1 单板机的镜像可在 Ethereum-on-Arm [下载页面](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/quick-guide/download-and-install.html)获取。

## 刷写 MicroSD {#flashing-the-microsd}

应首先将用于树莓派的 MicroSD 卡插入台式机或笔记本电脑，以便进行刷写。 然后，使用以下终端命令将下载的镜像刷写到 SD 卡上：

```shell
# 检查 MicroSD 卡名称
sudo fdisk -l

>> sdxxx
```

正确获取名称非常重要，因为下一个命令包含 `dd`，它会在将镜像写入卡上之前完全擦除卡上的现有内容。 要继续，请导航到包含压缩镜像的目录：

```shell
# 解压缩并刷写镜像
unzip ethonarm_22.04.00.img.zip
sudo dd bs=1M if=ethonarm_22.04.00.img of=/dev/<sdxx> conv=fdatasync status=progress
```

现在卡已刷写完毕，可以将其插入树莓派了。

## 启动节点 {#start-the-node}

将 SD 卡插入树莓派后，连接以太网电缆和固态硬盘，然后打开电源。 操作系统将启动并自动开始执行预配置的任务，将树莓派转变为以太坊节点，包括安装和构建客户端软件。 这可能需要 10-15 分钟。

一旦所有内容都安装和配置完毕，请通过 ssh 连接登录设备，或者如果单板机连接了显示器和键盘，则直接使用终端。 使用 `ethereum` 帐户登录，因为该帐户具有启动节点所需的权限。

```shell
用户：ethereum
密码：ethereum
```

默认的执行客户端 Geth 将自动启动。 您可以通过使用以下终端命令检查日志来确认这一点：

```sh
sudo journalctl -u geth -f
```

共识客户端需要显式启动。 为此，请先在路由器上打开 9000 端口，以便 Lighthouse 能够找到并连接到对等节点。 然后启用并启动 lighthouse 服务：

```sh
sudo systemctl enable lighthouse-beacon
sudo systemctl start lighthouse-beacon
```

使用日志检查客户端：

```sh
sudo journalctl -u lighthouse-beacon
```

请注意，共识客户端将在几分钟内同步，因为它使用检查点同步。 执行客户端将需要更长的时间——可能需要几个小时，并且在共识客户端完成同步之前它不会启动（这是因为执行客户端需要一个同步目标，而同步后的共识客户端会提供这个目标）。

随着 Geth 和 Lighthouse 服务运行并同步，您的树莓派现在就是一个以太坊节点了！ 与以太坊网络交互最常见的方式是使用 Geth 的 Javascript 控制台，它可以附加到端口 8545 上的 Geth 客户端。 也可以使用像 Curl 这样的请求工具，以 JSON 对象格式提交命令。 在 [Geth 文档](https://geth.ethereum.org/)中查看更多信息。

Geth 预先配置为将指标报告到一个 Grafana 仪表板，该仪表板可以在浏览器中查看。 更高级的用户可能希望通过导航到 `ipaddress:3000`，并传递 `user: admin` 和 `passwd: ethereum`，来使用此功能监控其节点的健康状况。

## 验证者 {#validators}

也可以选择性地将验证者添加到共识客户端。 验证者软件允许您的节点积极参与共识，并为网络提供加密经济安全保障。 您会因为这项工作获得 ETH 奖励。 要运行验证者，您必须首先拥有 32 ETH，这些 ETH 必须存入存款合约中。 您可以按照 [Launchpad](https://launchpad.ethereum.org/) 上的分步指南进行存款。 请在台式机/笔记本电脑上执行此操作，但不要生成密钥——这可以直接在树莓派上完成。

在树莓派上打开一个终端，并运行以下命令以生成存款密钥：

```
sudo apt-get update
sudo apt-get install staking-deposit-cli
cd && deposit new-mnemonic --num_validators 1
```

（或者下载 [staking-deposit-cli](https://github.com/ethereum/staking-deposit-cli) 在离线计算机上运行，并运行 `deposit new-mnemnonic` 命令）

请妥善保管助记词！ 上面的命令在节点的密钥库中生成了两个文件：验证者密钥和存款数据文件。 存款数据需要上传到 Launchpad，因此必须从树莓派复制到台式机/笔记本电脑。 这可以通过 ssh 连接或任何其他复制/粘贴方法完成。

一旦存款数据文件在运行 Launchpad 的计算机上可用，就可以将其拖放到 Launchpad 屏幕上的 `+` 号上。 按照屏幕上的说明向存款合约发送一笔交易。

回到树莓派上，可以启动一个验证者。 这需要导入验证者密钥，设置领取奖励的地址，然后启动预配置的验证者进程。 下面的示例适用于 Lighthouse——其他共识客户端的说明可在 [Ethereum on Arm 文档](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/)中找到：

```shell
# 导入验证者密钥
lighthouse account validator import --directory=/home/ethereum/validator_keys

# 设置奖励地址
sudo sed -i 's/<ETH_ADDRESS>' /etc/ethereum/lighthouse-validator.conf

# 启动验证者
sudo systemctl start lighthouse-validator
```

恭喜，您现在有了一个在树莓派上运行的完整以太坊节点和验证者！

## 更多详细信息 {#more-details}

本页概述了如何使用树莓派设置 Geth-Lighthouse 节点和验证者。 更详细的说明可在 [Ethereum-on-Arm 网站](https://ethereum-on-arm-documentation.readthedocs.io/en/latest/index.html)上找到。

## 感谢您的反馈 {#feedback-appreciated}

我们知道树莓派拥有庞大的用户群，可以对以太坊网络的健康产生非常积极的影响。
请深入研究本教程中的详细信息，尝试在测试网上运行，查看 Ethereum on Arm GitHub，提供反馈、提出问题和拉取请求，并帮助改进技术和文档！

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
