---
title: 默克尔帕特里夏字典树
description: 默克尔帕特里夏树简介。
lang: zh
sidebarDepth: 2
---

默克尔帕特里字典树夏树提供了一种经过加密认证的数据结构，可用于存储所有 `(key, value)` 对。

默克尔帕特里夏树是完全确定性的，这意味着有相同 `(key, value)` 对的字典树肯定是完全相同的，就连最后一个字节也相同。 这代表它们有着相同的根哈希，让插入、查找和删除操作具有难以企及的 `O(log(n))` 效率。 此外，相较于更复杂的基于比较的其他字典树（如红黑树），默克尔帕特里夏树更易于理解和编码。

## 前提条件 {#prerequisites}

为了更好地理解本文，具备以下基础知识将有所帮助：[哈希](https://en.wikipedia.org/wiki/Hash_function)、[默克尔树](https://en.wikipedia.org/wiki/Merkle_tree)、[字典树](https://en.wikipedia.org/wiki/Trie)和[序列化](https://en.wikipedia.org/wiki/Serialization)。

## 基数树 {#basic-radix-tries}

在一个基数树中，每个节点如下所示：

```
    [i_0, i_1 ... i_n, value]
```

其中，`i_0 ... i_n` 代表字母表的符号（通常是二进制或十六进制），`value` 是节点的终点值，`i_0, i_1 ... i_n` 插槽的值要么是 `NULL`，要么是指向其他节点（在本例中，是其他节点的哈希）的指针。 这形成了基本的 `(key, value)` 存储。

假设你想使用基数树数据结构永久保存一组键值对的次序。 为了在字典树中找到与键 `dog` 映射的值，首先需要把 `dog` 转换成字母表中的字母（给出 `64 6f 67`），然后沿着该路径向下遍历字典树，直到找到该值。 也就是说，为了找到字典树的根节点，你先在平面键/值数据库中查找根哈希。 它表示一组指向其他节点的键。 你会使用索引 `6` 的值作为键，并通过在平面键/值数据库中查找该键来获取下一层的节点。 然后使用索引 `4` 查找下一个值，再使用索引 `6`，以此类推，直到遍历路径 `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` 后，你将找到该节点的值并且返回结果。

从前缀树中查询和从其底层的固定“键/值”数据库中查询存在差异。 它们都定义了“键/值”对，但底层数据库能实现传统的 1 步查询，得到键对应的值。 而在前缀树中查询一个键对应的值则需要在底层数据库中查询多次才能得到最终结果。 我们把后者的查询方式称作 `path`，以避免描述上的模糊。

基数树的更新和删除操作定义如下：

```
    def update(node,path,value):
        if path == '':
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
            newnode[-1] = value
        else:
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

“默克尔”基数树是通过使用确定性生成的加密哈希摘要链接节点来构建的。 这种内容寻址（在键/值数据库中 `key == keccak256(rlp(value))`）提供了存储数据的加密认证。 如果给定字典树的根哈希是公开的，那么任何人都可以通过提供将特定值与树根连接的每个节点的哈希，来证明该字典树在特定路径中包含给定值。

对于攻击者来说，他们无法证明 `(path, value)` 对不存在，因为根哈希从根本上基于它下方的所有哈希。 任何底层的修改都会改变根哈希。

我们把基数树的原子单位（例如单个十六进制字符或 4 位二进制数）称为“半字节”。 如上文所述，以半字节为单位遍历路径时，节点最多可指向 16 个子节点，不过还包含一个 `value` 元素。 因此，我们把它们表示为具有长度的数组。 我们把这些有 17 个元素的数组称为“分支节点”。

## 默克尔帕特里夏树 {#merkle-patricia-trees}

基数树有一个主要限制：效率低下。 如果你想将一个 `(path, value)` 对存储在路径长度为 64 个字符（`bytes32` 中的半字节数）的位置（如以太坊中），我们需要超过一千字节的额外空间将每个字符存储一个层级，并且每次查询或删除都需要执行完整的 64 个步骤。 下文介绍的帕特里夏字典树可以解决这个问题。

### 优化 {#optimization}

默克尔帕特里夏树的节点可以是以下任意一种：

1.  `NULL`（表示为空字符串）
2.  `branch`，一个 17 元素节点 ` [ v0 ... v15, vt ]`
3.  `leaf`，一个双元素节点 `[ encodedPath, value ]`
4.  `extension`，一个双元素节点 `[ encodedPath, key ]`

在 64 个字符的路径中，遍历前缀树的前几层后，一定会到达这样的节点：至少部分下游再无分支路径。 为了避免在路径中创建多达 15 个稀疏 `NULL` 节点，我们通过设置一个形式为 `[ encodedPath, key ]` 的 `extension` 节点来精简向下遍历，其中 `encodedPath` 包含要跳过的“部分路径”（使用下面描述的压缩编码），`key` 用于下一次数据库查询。

对于 `leaf` 节点，可以使用 `encodedPath` 的第一个半字节中的标志来标记，其路径编码了所有先前节点的路径片段，并且我们可以直接查询 `value`。

然而，上述优化造成了模棱两可。

当以半字节遍历路径时，最后我们可能需要遍历奇数个半字节，但是所有数据都需要以 `bytes` 格式存储。 两者之间是无法区分的，例如，半字节 `1` 和半字节 `01`（两者都必须存储为 `<01>`）。 要指定奇数个半字节的长度，这部分路径要使用标记位作为前缀。

### 规范：带有可选终止符的十六进制序列的压缩编码 {#specification}

如上文所述，*剩余部分路径长度为奇数 vs 偶数*和*叶节点 vs 扩展节点*的标记位位于任意双元素节点中部分路径的第一个半字节。 从而产生以下结果：

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

对于剩余路径长度为偶数的情况（`0` 或 `2`），一定会附加一个 `0`“占位”半字节。

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray now has an even length whose first nibble is the flags.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

示例：

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

以下为获取默克尔帕特里夏树中节点的扩展代码：

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### 前缀树示例 {#example-trie}

假定我们想要包含四个路径/值对 `('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coin')`、`('horse', 'stallion')` 的前缀树。

首先，我们将路径和值都转换为 `bytes`。 在下方代码中，*路径*的实际字节代表用 `<>` 表示。而*值*仍然显示为字符串，用 `''` 表示，以便于理解（值也应为 `bytes`）：

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coin'
    <68 6f 72 73 65> : 'stallion'
```

现在，我们使用底层数据库中的以下键/值对构建了这样一棵前缀树：

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashD ]
    hashD:    [ <>, <>, <>, <>, <>, <>, hashE, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashE:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coin' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

当一个节点在另一个节点内部引用时，包含的是 `H(rlp.encode(x))`，其中 `H(x) = keccak256(x) if len(x) > > = 32 else x` 和 `rlp.encode` 是[递归长度前缀](/developers/docs/data-structures-and-encoding/rlp)编码函数。

请注意，更新前缀树时，*如果*新创建节点的长度 >= 32，则需要将键/值对 `(keccak256(x), x)` 存储在一个持久的查询表中。 然而，如果节点比这短，则不需要存储任何数据，因为函数 f(x) = x 是可逆的。

## 以太坊中的前缀树 {#tries-in-ethereum}

以太坊执行层中的所有默克尔树均使用默克尔帕特里夏树。

在区块头，有来自 3 棵前缀树的 3 个根。

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### 状态树 {#state-trie}

有一个全局状态字典树，每次客户端处理一个区块时它都会更新。 其中，`path` 始终为：`keccak256(ethereumAddress)`，`value` 始终为：`rlp(ethereumAccount)`。 更具体地说，一个以太坊 `account` 是包含 4 个元素的数组：`[nonce,balance,storageRoot,codeHash]`。 关于这一点值得注意的是，`storageRoot` 是另一个帕特里夏字典树的根：

### 存储树 {#storage-trie}

存储树是*所有*合同数据存放之处。 每个帐户都有一棵单独的存储树。 要用给定地址在特定的存储位置检索值，需要存储地址、存储器中存储数据的整数位置，以及区块 ID。 之后，这些数据可以作为参数传入 JSON-RPC 应用程序接口中定义的 `eth_getStorageAt`，例如用于检索地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的存储插槽 0 中的数据：

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

更多的是检索存储器中的其他元素，因为必须首先计算存储树中的位置。 该位置作为地址和存储位置的 `keccak256` 哈希值进行计算，两者都从左侧开始用零填充 32 个字节的长度。 例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 的数据在存储时隙 1 中的位置是：

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 控制台中，可以按以下方式计算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 是 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。 与以前相同，此地址现在可用于从存储树检索数据：

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### 交易树 {#transaction-trie}

每个区块都有一个独立的交易字典树，也用于存储 `(key, value)` 对。 路径为：`rlp(transactionIndex)`，代表了对应一个值的键，值由以下决定：

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

关于这个问题的更多信息可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档中找到。

### 收据树 {#receipts-trie}

每个区块都有自己的收据树。 此处的 `path` 是：`rlp(transactionIndex)`。 `transactionIndex` 是它在挖矿区块中的索引。 收据字典树从不更新。 与交易字典树类似，它也有当前和以前的收据。 为了在收据字典树中查询特定的收据，需要提供区块中交易的索引、收据有效载荷以及交易类型。 返回的收据可以是 `Receipt` 类型，定义为 `transaction type` 和 `transaction payload` 的串接，也可以是 `LegacyReceipt` 类型，定义为 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

关于这个问题的更多信息可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档中找到。

## 延伸阅读 {#further-reading}

- [修改后的默克尔帕特里夏字典树 — 如何保存以太坊状态](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克尔树](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [了解以太坊的字典树](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
