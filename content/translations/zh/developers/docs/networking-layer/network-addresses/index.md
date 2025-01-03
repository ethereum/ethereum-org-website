---
title: 网络地址
description: 网络地址简介
lang: zh
sidebarDepth: 2
---

以太坊节点必须用一些基本信息来表明身份，才能连接到其他节点。 为了确保任何潜在对等点能够解析这些信息，它以任何以太坊节点能够理解的三种标准化格式之一进行传递：multiadder、enode 或以太坊节点记录 (ENR)。 以太坊节点记录是以太坊网络地址的现行标准。

## 前提条件 {#prerequisites}

要理解此页，建议首先了解以太坊的[网络层](/developers/docs/networking-layer/)。

## Multiaddr {#multiaddr}

原始以太坊节点地址格式为“multiaddr”（“多地址”的缩写）。 Multiaddr 是一种通用格式，用于对等网络。 地址以键值对表示，键与值之间用正斜杠隔开。 例如，使用 IPv4 地址 `192.168.22.27` 监听 TCP 端口 `33000` 的节点可能具有以下类似的 multiaddr：

`/ip4/192.168.22.27/tcp/33000`

对于以太坊节点，multiaddr 包含节点 ID（其公钥的哈希值）：

`/ip4/192.168.22.27/tcp/33000/p2p/5t7Nv7dG2d6ffbvAiewVsEwWweU3LdebSqX2y1bPrW8br`

## Enode {#enode}

Enode 使用 URL 地址格式来识别以太坊节点。 十六进制节点 ID 编码为 URL 的用户名部分，采用 @ 符号与主机分隔开来。 主机名只能作为 IP 地址给出；不允许给出 DNS 名称。 主机名部分中的端口是 TCP 监听端口。 如果传输控制协议和用户数据报协议（发现）端口不同，用户数据报协议端口将被指定为查询参数“disposport”

在下面的例子中，节点 URL 描述了一个 IP 地址为 `10.3.58.6`、TCP 端口为 `30303`、UDP 发现端口为 `30301` 的节点。

`enode://6f8a80d14311c39f35f516fa664deaaaa13e85b2f7493f37f6144d86991ec012937307647bd3b9a82abe2974e1407241d54947bbb39763a4cac9f77166ad92a0@10.3.58.6:30303?discport=30301`

## 以太坊节点记录 (ENR) {#enr}

以太坊节点记录 (ENR) 是以太坊网络地址的标准格式。 这种地址取代了 multiaddr 和 enode。 由于它们使节点之间能够进行更多的信息交流，因而尤其实用。 以太坊节点记录包含一个签名、序列号和字段，详细说明了用于生成和验证签名的身份识别方案。 以太坊节点记录还可以填充为采用键值对格式的任意数据。 这些键值对包含节点的 IP 地址和节点能够使用的子协议的信息。 共识客户端使用[特定的以太坊节点记录结构](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/p2p-interface.md#enr-structure)来识别引导节点，并包括一个 `eth2` 字段，其中包含有关当前以太坊分叉和认证信息传播子网的信息。上述子网将节点连接至证明被整合在一起的特定对等点集。

## 延伸阅读 {#further-reading}

[EIP-778：以太坊节点记录](https://eips.ethereum.org/EIPS/eip-778) [以太坊中的网络地址](https://dean.eigenmann.me/blog/2020/01/21/network-addresses-in-ethereum/) [LibP2P：Multiaddr-Enode-ENR?!](https://consensys.net/diligence/blog/2020/09/libp2p-multiaddr-enode-enr/)
