---
title: 如何通过Geth运行轻节点
description: 如何使用 Geth 下载、安装和运行轻客户端。
author: "Brian Gu"
tags:
  - "客户端"
  - "geth"
  - "节点"
skill: 入门
lang: zh
sidebar: true
published: 2022-03-04
---

您可能会对运行[以太坊节点](/developers/docs/nodes-and-clients/)感兴趣。 最简单的实现方式就是下载、安装和运行 Geth。 通过 Geth，我们只需数分钟便能设置并运行一个轻节点。

轻量级客户端需要不到 400MB 的存储空间，同时仍允许与以太坊状态进行完全交互。 轻客户端从远程对等点检索数据，因此与其他同步模式相比，某些查询可能需要更长的时间来响应。

有关不同同步模式之间差异的说明，请阅读我们的[节点和客户端开发者文档](/developers/docs/nodes-and-clients/#node-types)。

## 安装并运行 {#install-and-run}

首先，[安装 Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth)。

安装 Geth 后，您可以通过在终端窗口中运行以下命令以“light”模式运行以太坊节点：

```bash
geth --syncmode light
```

一旦启动，Geth 将开始连接到以太坊上的其他节点——称为“对等节点”。 连接到对等节点的过程可能需要一段时间。

当您的 Geth 节点有足够的 peers 时，它将从链上的新块中导入标头。

当新的区块头不再有“age”时，Geth 将同步到链的头部。

## 停止和重启节点 {#stopping-and-restarting-your-node}

您可以随时按 <kbd>CTRL</kbd>+<kbd>C</kbd> 停止您的节点。

重新启动节点时，Geth 将需要几分钟来下载自上次运行节点以来创建的块头。

## 启用 HTTP-RPC 服务器 {#enable-the-http-rpc-server}

启用 HTTP-RPC 服务器可让您将以太坊节点连接到其他软件，如钱包、浏览器扩展或自定义软件库。

您可以在启动 Geth 时通过运行以下命令来启用 HTTP-RPC 服务器：

```bash
geth --syncmode light --http
```

启用后，运行 `curl http://127.0.0.1:8545`。 这应该不会报告错误。

### 允许远程连接 {#allow-remote-connections}

要允许远程主机连接到您的节点，请使用以下命令启动 Geth：

```
geth --syncmode light --http --http.addr 0.0.0.0
```

注意：这假设没有进程阻止对您的 localhost 的请求，例如防火墙。

## Geth JavaScript 控制台 {#geth-javascript-console}

Geth 有一个内置的 JavaScript 控制台和一个名为 [web3js](https://github.com/ethereum/web3.js/) 的 JavaScript API，您可以使用它与您的节点进行交互。

要使用 JavaScript 控制台运行：

```bash
geth attach
```

该控制台允许与以太坊直接交互。 例如，运行 `eth.blockNumber` 命令将打印最新的已知区块编号。

[完整 web3js 文档](http://web3js.readthedocs.io/)

## 主网和测试网 {#mainnet-and-testnets}

Geth 默认在 [以太坊主网](/glossary/#mainnet) 上运行你的节点。

通过在终端中运行以下命令之一，也可以使用 Geth 在 [公共测试网络](/networks/#testnets) 之一上运行节点：

```bash
geth --syncmode light --ropsten
geth --syncmode light --rinkeby
geth --syncmode light --goerli
```

## 区块链和 EVM 的数据存储在哪里？ {#where-is-the-blockchain-and-evm-data-stored}

Geth 用于存储原始区块链数据的目录取决于您的操作系统。 运行 Geth 后，查找如下所示的信息：

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

`“database=”`后面的路径应该会告诉您区块链数据存储在您的机器上的何处。 如果您运行的是完整节点，则此目录将包含有关已提交到区块链的每个区块的所有数据。 因为我们正在运行轻节点，此目录仅包含区块头。

这里值得强调的是，这是区块链能够维持活跃度的最低限度。 区块链的完整内容和 EVM 状态存储在以太网络中的每个完整节点上，存储在与您计算机上的目录非常相似的目录中。

## 延伸阅读 {#further-reading}

- [详细了解不同的网络](/developers/docs/networks/)。
- [运行全节点](/run-a-node/)
