---
title: 帕特里夏默克尔树
description: 帕特里夏默克尔树简介。
lang: zh
sidebarDepth: 2
---

帕特里夏默克尔树提供经加密认证的数据结构，可用于存储所有 `(key, value)` 对。

帕特里夏默克尔树完全具有决定性，意味着可以保证具有相同 `(key, value)` 对的前缀树从第一个到最后一个字节完全相同。 这意味着他们有相同的根哈希值，从而提供强大的 `O(log(n))` 级别的插入、查找和删除效率。 此外，与其他更复杂的基于比较的数据结构（如红黑树）相比，它们更容易理解和编码。

## 前提条件 {#prerequisites}

了解默克尔树和序列化的基础知识将有助于理解本页中的内容。

## 基数树 {#basic-radix-tries}

在一个基数树中，每个节点如下所示：

```
    [0, i1 ... in , 值]

```

其中，`i0 ... in` 表示字母表中符号（通常以二进制或十六进制方式表示），`value` 是该节点的终值，而 `i0 ... in` 时隙中的值要么是 `NULL`，要么是其他节点的指针（在我们的用例中，为哈希值）。 这形成了基本的 `(key, value)` 存储。 例如，如果你想获取当前映射到 `dog` 的值，首先需要将 `dog` 转换成字母表中的字母（分别为 `64 6f 67`），然后按该路径依次向下遍历前缀树，直至找到对应的值。 也就是说，首先要从一个固定“键/值”数据库中查询根哈希值，以找到前缀树的根节点（一个其他节点的键数组），然后将索引 `6` 的值用作键（并在固定“键/值”数据库中查询它对应的值）找到下一个节点。继续选择索引 `4` 来查找下一个值。再选择索引 `6`，循环往复，直到走过了以下路径：`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`，此时所在节点的值就是要查询的值，然后返回结果。

从前缀树中查询和从其底层的固定“键/值”数据库中查询存在差异。 它们都定义了“键/值”对，但底层数据库能实现传统的 1 步查询，得到键对应的值。 而在前缀树中查询一个键对应的值则需要在底层数据库中查询多次才能得到最终结果。 我们把后者的查询方式称作 `path`，以避免描述上的模糊。

更新和删除基数树的操作很简单，可以大致定义如下：

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

            if len(filter(x -> x is not NULL, newnode)) == 0:
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

基数树的“默克尔”部分表现为一个节点的确定加密哈希值被用作指向该节点的指针（每次在“键/值”数据库 `key == keccak256(rlp(value))` 中查找时，而不是传统的用 C 语言实现的前缀树中可能使用的 32 位或 64 位内存地址。默克尔性质为这种数据结构提供了一种加密认证方式：如果给定前缀树的根哈希值已公开，那么任何人都可以提供将一个特定值连接到树根上的所有节点的总哈希值，以此证明该前缀树在特定路径上有特定的值。 攻击者不可能为一个不存在于树中的（路径/值）对提供证明，因为根哈希值最终取决于它下面所有节点的哈希值，所以任何修改都会改变根哈希值。

如上文所述，虽然在遍历路径时每次经过半个字节，但大多数节点都包含一个具有 17 个元素的数组。 路径中，下一个十六进制字符（半个字节）所有的每一个可能值都有一个索引，如果已经遍历完整个路径，则有一个索引保存最终目标值。 这些 17 元素数组的节点称为 `branch` 节点。

## 默克尔帕特里夏树 {#merkle-patricia-trees}

然而，基数树有一个主要限制：效率低下。 如果只想存储一个（路径/值）对，而路径（若为以太坊状态前缀树）长 64 个字符（`bytes32` 中的半字节数），以一层一个字符的方式存储，你将需要超过一千字节的额外空间，并且每次查询或删除都将需要所有 64 步。 而本文介绍的帕特里夏树可以解决这个问题。

### 优化 {#optimization}

默克尔帕特里夏树通过给数据结构增加额外的复杂性来解决效率低下的问题。 默克尔帕特里夏树的节点可以是以下任意一种：

1.  `NULL`（表示为空字符串）
2.  `branch`，一个 17 元素节点 ` [ v0 ... v15, vt ]`
3.  `leaf`，一个双元素节点 `[ encodedPath, value ]`
4.  `extension`，一个双元素节点 `[ encodedPath, key ]`

在 64 个字符的路径中，遍历前缀树的前几层后，一定会到达这样的节点：至少部分下游再无分支路径。 要求这样一个节点中除目标索引（路径中的下一个半字节）外的每个索引（16 个十六进制字符中的每一个）都是空值是不太可能的。 相反，我们通过设置 `[ encodedPath, key ]` 格式的 `extension` 节点来缩短向下遍历的耗时。其中，`encodedPath` 包含可以跳过的“部分路径”（使用下述压缩编码），而 `key` 则用于下一次数据库查询。

`leaf` 节点可以通过 `encodedPath` 的第一个半字节中的标志位确定。对于这种节点，以上情况也可能发生，且需要跳过的“部分路径”表示了路径的全部剩余部分。 在这种情况下，`key` 即为目标值。

然而，上述优化会造成一定程度的含混不清。

以半字节遍历路径时，最终可能会在经过奇数个半字节后结束，但由于所有数据都以 `bytes` 格式存储，所以无法区分诸如：半字节 `1` 和半字节 `01`（两者都必须存储为 `<01>`）。 要指定奇数个半字节的长度，这部分路径要使用标记位作为前缀。

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

当一个节点在另一个节点中被引用时，包含的是 `H(rlp.encode(x))`，其中 `H(x) = keccak256(x) if len(x) > > = 32 else x` 和 `rlp.encode` 是[递归长度前缀](/fundamentals/rlp)编码函数。

请注意，更新前缀树时，*如果*新创建节点的长度 >= 32，则需要将键/值对 `(keccak256(x), x)` 存储在一个持久的查询表中。 然而，如果节点比这短，则不需要存储任何数据，因为函数 f(x) = x 是可逆的。

## 以太坊中的前缀树 {#tries-in-ethereum}

以太坊执行层中的所有默克尔树均使用默克尔帕特里夏树。

在区块头，有来自 3 棵前缀树的 3 个根。

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### 状态树 {#state-trie}

有一棵全局状态树，随着时间的推移而更新。 其中，`path` 始终为：`keccak256(ethereumAddress)`，`value` 始终为：`rlp(ethereumAccount)`。 更具体地说，一个以太坊 `account` 是包含 4 个元素的数组：`[nonce,balance,storageRoot,codeHash]`。 关于这一点值得注意的是，此 `storageRoot` 是另一个帕特里夏树的根：

### 存储树 {#storage-trie}

存储树是*所有*合同数据存放之处。 每个帐户都有一棵单独的存储树。 要用给定地址在特定的存储位置检索值，需要存储地址、存储器中存储数据的整数位置，以及区块 ID。 之后，这些数据可以作为参数传递至 JSON-RPC 应用程序接口中定义的 `eth_getStorageAt`，用于在存储时隙 0 中为地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 检索数据：

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

更多的是检索存储器中的其他元素，因为必须首先计算存储树中的位置。 该位置作为地址和存储位置的 `keccak256` 哈希值进行计算，两者都从左侧开始用零填充 32 个字节的长度。 例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 的数据在存储时隙 1 中的位置是：

```keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))

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

每个区块都有一棵单独的交易树，也用于存储（键/值）对。 路径为：rlp(transactionIndex)，代表对应于以下代码所确定值的键：

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

关于这个问题的更多信息可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档中找到。

### 收据树 {#receipts-trie}

每个区块都有自己的收据树。 此处的 `path` 是：`rlp(transactionIndex)`。 `transactionIndex` 是它在挖矿区块中的索引。 收据树不会更新。 与交易树类似，也有当前和遗留的收据。 要查询收据树中的特定收据，需要区块中的交易索引、收据有效载荷和交易类型。 返回的收据可以是 `Receipt` 类型，定义为 `transaction type` 和 `transaction payload` 的串接，也可以是 `LegacyReceipt` 类型，定义为 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

关于这个问题的更多信息可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档中找到。

## 延伸阅读 {#further-reading}

[修改版默克尔帕特里夏树 — 以太坊如何保存状态](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd) [以太坊中的默克尔](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/) [了解以太坊树](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
