---
title: 数据结构与编码
description: 以太坊基础数据结构概览。
lang: zh
sidebarDepth: 2
---

以太坊会产生、存储和传输大量的数据。 这些数据必须以标准且节约内存的方式格式化，以便任何人都能在相对普通的消费级硬件上[运行节点](/run-a-node/)。 为实现这一目的，以太坊协议栈中使用了一些特殊的数据结构。

## 前提条件 {#prerequisites}

在继续阅读本文章之前，您应当对以太坊和[客户端软件](/developers/docs/nodes-and-clients/)的基本原理已经有所了解。 若是熟悉网络层这一概念和[以太坊白皮书](/whitepaper/)的话会更好。

## 数据结构 {#data-structures}

### 默克尔前缀树 {#patricia-merkle-tries}

默克尔前缀树是一种数据结构，将给定的键值对编码成具有确定性且经过加密验证的前缀树。 以太坊在其执行层中广泛运用这一数据结构。

[详细了解默克尔前缀树](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 递归长度前缀 {#recursive-length-prefix}

递归长度前缀 (RLP) 是一种在以太坊执行层中广泛使用的序列化方法。

[详细了解递归长度前缀](/developers/docs/data-structures-and-encoding/rlp)

### 简单序列化 {#simple-serialize}

简单序列化 (SSZ) 是一种序列化格式。它能够进行默克尔化，因而成为了以太坊共识层主要的序列化格式。

[详细了解简单序列化](/developers/docs/data-structures-and-encoding/ssz)
