---
title: "数据结构与编码"
description: "以太坊基础数据结构概述。"
lang: zh
sidebarDepth: 2
---

以太坊创建、存储和传输大量数据。这些数据必须以标准化且内存高效的方式进行格式化，以便任何人都能在相对普通的消费级硬件上[运行节点](/run-a-node/)。为了实现这一点，以太坊技术栈中使用了几种特定的数据结构。

## 前提条件 {#prerequisites}

你应该了解以太坊和[客户端软件](/developers/docs/nodes-and-clients/)的基础知识。建议熟悉网络层和[以太坊白皮书](/whitepaper/)。

## 数据结构 {#data-structures}

### 帕特里夏默克尔前缀树 {#patricia-merkle-tries}

帕特里夏默克尔前缀树 (Patricia Merkle Tries) 是一种将键值对编码为确定性且经过密码学认证的前缀树的结构。它们在以太坊的执行层中被广泛使用。

[更多关于帕特里夏默克尔前缀树的信息](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 递归长度前缀 {#recursive-length-prefix}

递归长度前缀 (RLP) 是一种在以太坊执行层中被广泛使用的序列化方法。

[更多关于 RLP 的信息](/developers/docs/data-structures-and-encoding/rlp)

### 简单序列化 {#simple-serialize}

简单序列化 (SSZ) 是以太坊共识层上的主要序列化格式，因为它与默克尔化兼容。

[更多关于 SSZ 的信息](/developers/docs/data-structures-and-encoding/ssz)