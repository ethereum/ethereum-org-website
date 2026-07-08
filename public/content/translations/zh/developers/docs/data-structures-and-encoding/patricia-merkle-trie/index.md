---
title: "默克尔帕特里夏树"
description: "默克尔帕特里夏树简介。"
lang: zh
sidebarDepth: 2
---

[以太坊](/)的状态（所有账户、余额和智能合约的总和）被编码为计算机科学中通常称为默克尔树的数据结构的特殊版本。这种结构在密码学的许多应用中非常有用，因为它在树中纠缠的所有独立数据片段之间创建了可验证的关系，从而产生一个单一的**根**值，可用于证明有关数据的信息。

以太坊的数据结构是“修改版的默克尔帕特里夏树”，之所以这样命名，是因为它借用了 PATRICIA（检索字母数字编码信息的实用算法）的一些特征，并且它是为高效检索（re**trie**val）构成以太坊状态的项而设计的。

默克尔帕特里夏树是确定性的且在密码学上可验证：生成状态根的唯一方法是从状态的每个独立片段计算它，并且通过比较根哈希和导致它的哈希（*默克尔证明*），可以轻松证明两个相同的状态。相反，无法创建具有相同根哈希的两个不同状态，并且任何使用不同值修改状态的尝试都会导致不同的状态根哈希。从理论上讲，这种结构为插入、查找和删除提供了 `O(log(n))` 效率的“圣杯”。

在不久的将来，以太坊计划迁移到 [Verkle 树](/roadmap/verkle-trees)结构，这将为未来的协议改进开辟许多新的可能性。

## 前提条件 {#prerequisites}

为了更好地理解本页面，具备[哈希](https://en.wikipedia.org/wiki/Hash_function)、[默克尔树](https://en.wikipedia.org/wiki/Merkle_tree)、[前缀树](https://en.wikipedia.org/wiki/Trie)和[序列化](https://en.wikipedia.org/wiki/Serialization)的基础知识会很有帮助。本文首先描述了基本的[基数树](https://en.wikipedia.org/wiki/Radix_tree)，然后逐步介绍了以太坊更优化的数据结构所需的修改。

## 基本基数树 {#basic-radix-tries}

在基本的基数树中，每个节点如下所示：

```
[i_0, i_1 ... i_n, value]
```

其中 `i_0 ... i_n` 代表字母表的符号（通常是二进制或十六进制），`value` 是节点处的终端值，而 `i_0, i_1 ... i_n` 槽中的值要么是 `NULL`，要么是指向其他节点的指针（在我们的例子中是哈希）。这构成了一个基本的 `(key, value)` 存储。

假设你想使用基数树数据结构来持久化一组键值对的顺序。要在前缀树中找到当前映射到键 `dog` 的值，你首先需要将 `dog` 转换为字母表中的字母（得到 `64 6f 67`），然后沿着该路径在树中向下查找，直到找到该值。也就是说，你首先在扁平的键/值数据库中查找根哈希，以找到前缀树的根节点。它表示为一个指向其他节点的键数组。你将使用索引 `6` 处的值作为键，并在扁平的键/值数据库中查找它，以获取下一层的节点。然后选择索引 `4` 查找下一个值，接着选择索引 `6`，依此类推，直到你沿着路径：`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` 走完，你将查找该节点的值并返回结果。

在“前缀树”中查找内容与在底层的扁平键/值“数据库”中查找内容是有区别的。它们都定义了键/值排列，但底层数据库可以对键进行传统的单步查找。在前缀树中查找键需要多次底层数据库查找才能获得上述最终值。为了消除歧义，我们将后者称为 `path`。

基数树的更新和删除操作可以定义如下：

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

“默克尔”基数树是通过使用确定性生成的密码学哈希摘要链接节点来构建的。这种内容寻址（在键/值数据库 `key == keccak256(rlp(value))` 中）提供了存储数据的密码学完整性保证。如果给定前缀树的根哈希是公开已知的，那么任何有权访问底层叶子数据的人都可以通过提供将特定值连接到树根的每个节点的哈希，来构建一个证明，证明该前缀树在特定路径包含给定值。

攻击者不可能提供不存在的 `(path, value)` 对的证明，因为根哈希最终基于其下方的所有哈希。任何底层修改都会改变根哈希。你可以将哈希视为有关数据结构信息的压缩表示，由哈希函数的原像保护来确保安全。

我们将基数树的原子单位（例如，单个十六进制字符或 4 位二进制数）称为“半字节（nibble）”。如上所述，在一次遍历一个半字节的路径时，节点最多可以引用 16 个子节点，但包含一个 `value` 元素。因此，我们将它们表示为长度为 17 的数组。我们将这些 17 元素数组称为“分支节点”。

## 默克尔帕特里夏树 {#merkle-patricia-trees}

基数树有一个主要限制：它们效率低下。如果你想存储一个 `(path, value)` 绑定，其中路径（如在以太坊中）长达 64 个字符（`bytes32` 中的半字节数），我们将需要超过一千字节的额外空间来为每个字符存储一层，并且每次查找或删除都将花费完整的 64 步。下面介绍的帕特里夏树解决了这个问题。

### 优化 {#optimization}

默克尔帕特里夏树中的节点是以下之一：

1.  `NULL`（表示为空字符串）
2.  `branch` 一个 17 项节点 `[ v0 ... v15, vt ]`
3.  `leaf` 一个 2 项节点 `[ encodedPath, value ]`
4.  `extension` 一个 2 项节点 `[ encodedPath, key ]`

对于 64 个字符的路径，不可避免的是，在遍历了前缀树的前几层之后，你将到达一个节点，在该节点向下的至少一部分路径中不存在分叉路径。为了避免在路径上创建多达 15 个稀疏的 `NULL` 节点，我们通过设置形式为 `[ encodedPath, key ]` 的 `extension` 节点来缩短下降过程，其中 `encodedPath` 包含要跳过的“部分路径”（使用下面描述的紧凑编码），而 `key` 用于下一次数据库查找。

对于 `leaf` 节点（可以通过 `encodedPath` 的第一个半字节中的标志来标记），该路径对所有先前节点的路径片段进行编码，我们可以直接查找 `value`。

然而，上述优化引入了歧义。

当以半字节为单位遍历路径时，我们最终可能会遇到奇数个半字节需要遍历，但因为所有数据都以 `bytes` 格式存储。例如，无法区分半字节 `1` 和半字节 `01`（两者都必须存储为 `<01>`）。为了指定奇数长度，部分路径会加上一个标志前缀。

### 规范：带有可选终止符的十六进制序列的紧凑编码 {#specification}

如上所述，_剩余部分路径长度的奇偶性_和_叶子节点与扩展节点_的标志都位于任何 2 项节点的部分路径的第一个半字节中。它们产生以下结果：

| 十六进制字符 | 位 | 节点类型部分 | 路径长度 |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | 扩展节点          | 偶数        |
| 1        | 0001 | 扩展节点          | 奇数         |
| 2        | 0010 | 终止节点（叶子） | 偶数        |
| 3        | 0011 | 终止节点（叶子） | 奇数         |

对于偶数剩余路径长度（`0` 或 `2`），将始终跟随另一个 `0` “填充”半字节。

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray 现在长度为偶数，其第一个半字节为标志位。
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

示例：

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

以下是在默克尔帕特里夏树中获取节点的扩展代码：

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### 前缀树示例 {#example-trie}

假设我们需要一个包含四个路径/值对的前缀树：`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`。

首先，我们将路径和值都转换为 `bytes`。在下面，_路径_的实际字节表示由 `<>` 表示，尽管_值_仍然显示为字符串，由 `''` 表示，以便于理解（它们实际上也会是 `bytes`）：

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

现在，我们在底层数据库中使用以下键/值对构建这样一个前缀树：

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

当一个节点在另一个节点内部被引用时，包含的内容是 `keccak256(rlp.encode(node))`，如果 `len(rlp.encode(node)) >= 32` 否则为 `node`，其中 `rlp.encode` 是 [RLP](/developers/docs/data-structures-and-encoding/rlp) 编码函数。

请注意，在更新前缀树时，_如果_新创建的节点长度 >= 32，则需要将键/值对 `(keccak256(x), x)` 存储在持久化查找表中。但是，如果节点短于该长度，则不需要存储任何内容，因为函数 f(x) = x 是可逆的。

## 以太坊中的前缀树 {#tries-in-ethereum}

以太坊执行层中的所有默克尔树都使用默克尔帕特里夏树。

从区块头中，有来自这 3 个前缀树的 3 个根。

1.  stateRoot（状态根）
2.  transactionsRoot（交易根）
3.  receiptsRoot（收据根）

### 状态树 {#state-trie}

存在一个全局状态树，并且每次客户端处理区块时都会更新它。在其中，`path` 始终是：`keccak256(ethereumAddress)`，而 `value` 始终是：`rlp(ethereumAccount)`。更具体地说，以太坊 `account` 是一个包含 4 个项的 `[nonce,balance,storageRoot,codeHash]` 数组。在这一点上，值得注意的是，这个 `storageRoot` 是另一个帕特里夏树的根：

### 存储前缀树 {#storage-trie}

存储前缀树是_所有_合约数据所在的地方。每个账户都有一个独立的存储前缀树。要在给定地址的特定存储位置检索值，需要存储地址、存储数据在存储中的整数位置以及区块 ID。然后可以将这些作为参数传递给 JSON-RPC API 中定义的 `eth_getStorageAt`，例如，检索地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的存储槽 0 中的数据：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

检索存储中的其他元素稍微复杂一些，因为必须首先计算在存储前缀树中的位置。该位置计算为地址和存储位置的 `keccak256` 哈希，两者都用零左填充到 32 字节的长度。例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 的存储槽 1 中数据的位置是：

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 控制台中，可以按如下方式计算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 是 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。现在可以像以前一样使用它从存储前缀树中检索数据：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注意：如果不是合约账户，以太坊账户的 `storageRoot` 默认是空的。

### 交易树 {#transaction-trie}

每个区块都有一个独立的交易树，同样存储 `(key, value)` 对。这里的路径是：`rlp(transactionIndex)`，它表示对应于由以下方式确定的值的键：

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

有关此内容的更多信息，请参阅 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 文档。

### 收据树 {#receipts-trie}

每个区块都有自己的收据树。这里的 `path` 是：`rlp(transactionIndex)`。`transactionIndex` 是它在包含它的区块中的索引。收据树永远不会更新。与交易树类似，有当前收据和传统收据。要在收据树中查询特定收据，需要交易在其区块中的索引、收据有效负载和交易类型。返回的收据可以是 `Receipt` 类型，它被定义为 `TransactionType` 和 `ReceiptPayload` 的串联，或者它可以是 `LegacyReceipt` 类型，它被定义为 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

有关此内容的更多信息，请参阅 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 文档。

## 延伸阅读 {#further-reading}

- [修改版的默克尔帕特里夏树——以太坊如何保存状态](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克尔化](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [理解以太坊前缀树](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)