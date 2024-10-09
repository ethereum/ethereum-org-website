---
title: 以太坊的引导节点介绍
description: 了解以太坊引导节点所需的基本信息
lang: zh
---

当新节点加入以太坊网络时，它需要连接到已经在网络上的节点，以便在后期发现新的对等节点。 这些进入以太坊网络的节点被称作引导节点。 客户端通常有一个硬编码的引导节点列表。 这些引导节点通常由以太坊基金会的开发团队或客户团队自己运行。 请注意，引导节点与静态节点不同。 静态节点会被重复调用，而引导节点仅在没有足够的对等节点可以连接时被调用，并且需要有一个节点来引导一些新的连接。

## 连接到引导节点 {#connect-to-a-bootnode}

大多数客户端都有内置的引导节点列表，但你可能也想运行自己的引导节点，或使用不在客户端硬编码列表中的引导节点。 在这种情况下，你可以在启动客户端时指定这些节点，如下所示（示例为 Geth，请查看你的客户端文档）：

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## 运行引导节点 {#run-a-bootnode}

引导节点是不在 NAT（[网络地址转换](https://www.geeksforgeeks.org/network-address-translation-nat/)）后面的全节点。 只要全节点可以公开访问，它就可以充当引导节点。

在启动节点时，它应该记录你的 [enode](/developers/docs/networking-layer/network-addresses/#enode)，也就是其他人用来连接该节点的公开标识符。

一般来说，每次重启都会重新生成 enode，因此请确保查看你的客户端文档，了解如何为引导节点生成长期的 enode。

为了成为一个良好的引导节点，你可以增加能够与之连接的对等节点的最大数量。 运行能与许多对等节点连接的引导节点，这样做将大幅提高对带宽的要求。

## 可用的引导节点 {#available-bootnodes}

请在[此处](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23)查看 go-ethereum 中内建的引导节点列表。 这些引导节点由以太坊基金会和 go-ethereum 团队负责维护。

你还可以找到一些由志愿者维护的其他引导节点列表。 请务必始终包含至少一个官方引导节点，否则你可能会受到日蚀攻击。
