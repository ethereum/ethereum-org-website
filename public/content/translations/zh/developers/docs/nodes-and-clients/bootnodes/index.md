---
title: "以太坊引导节点简介"
description: "了解引导节点所需的基本信息"
lang: zh
---

当一个新节点加入以太坊网络时，它需要连接到网络上已有的节点，以便随后发现新的对等节点。这些进入以太坊网络的入口点被称为引导节点。客户端通常硬编码了一组引导节点列表。这些引导节点通常由以太坊基金会的开发运维团队或客户端团队自己运行。请注意，引导节点与静态节点不同。静态节点会被反复调用，而引导节点只有在没有足够的对等节点可供连接，且节点需要引导建立一些新连接时才会被调用。

## 连接到引导节点 {#connect-to-a-bootnode}

大多数客户端都内置了引导节点列表，但你可能也想运行自己的引导节点，或者使用不在客户端硬编码列表中的引导节点。在这种情况下，你可以在启动客户端时指定它们，如下所示（以 Geth 为例，请查阅你所用客户端的文档）：

```
geth --bootnodes "enode://<node ID>@<IP address>:<port>"
```

## 运行引导节点 {#run-a-bootnode}

引导节点是不在 NAT（[网络地址转换](https://www.geeksforgeeks.org/network-address-translation-nat/)）后面的全节点。只要公开可用，每个全节点都可以充当引导节点。

当你启动一个节点时，它应该会在日志中记录你的 [enode](/developers/docs/networking-layer/network-addresses/#enode)，这是一个公共标识符，其他人可以使用它来连接到你的节点。

enode 通常在每次重启时重新生成，因此请务必查阅客户端文档，了解如何为你的引导节点生成持久的 enode。

为了成为一个优秀的引导节点，最好增加可以连接到它的最大对等节点数量。运行具有许多对等节点的引导节点将显著增加带宽需求。

## 可用的引导节点 {#available-bootnodes}

可以在[此处](https://github.com/ethereum/go-ethereum/blob/master/params/bootnodes.go#L23)找到 go-ethereum 内置的引导节点列表。这些引导节点由以太坊基金会和 go-ethereum 团队维护。

还有其他由志愿者维护的可用引导节点列表。请确保始终包含至少一个官方引导节点，否则你可能会遭受日蚀攻击。