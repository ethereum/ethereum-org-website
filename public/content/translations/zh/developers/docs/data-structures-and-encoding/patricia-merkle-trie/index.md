---
title: "默克尔帕特里夏字典树"
description: "默克尔帕特里夏树简介。"
lang: zh
sidebarDepth: 2
---

以太坊的状态（全体帐户、余额与智能合约）被编码进一个特殊版本的数据结构中，在计算机科学中，这种数据结构通常称为默克尔树。 这种结构可用于许多加密学应用，因为它在树中保存的所有单独数据之间创建了可验证的关系，产生一个可用于证明数据的单独**根**值。

以太坊的数据结构是“修改版默克尔-帕特里夏树”，之所以这样命名，不仅是因为它引入了 PATRICIA 算法（检索用字母数字编码的信息的实用算法）的一些特性，也由于它旨在实现含有以太坊状态的值的高效数据 re**trie**val（检索）。

默克尔-帕特里夏树是确定性的，并且可以通过密码学来验证：生成状态根的唯一方法是从状态的每个单独部分进行计算，并且可以通过比较根哈希以及引向它的哈希（_默克尔证明_）来轻松证明两个相同的状态。 相反，也无法用同一根哈希创建两个不同的状态，任何用不同值修改状态的尝试都会产生不同的状态根哈希。 理论上，该结构为插入、查找和删除提供了 `O(log(n))` 效率的“圣杯”。

在不久的将来，以太坊计划迁移到 [Verkle 树](/roadmap/verkle-trees)结构，这将为未来的协议改进开创更多新的可能性。

## 前提条件 {#prerequisites}

为了更好地理解本页面，掌握一些关于[哈希](https://en.wikipedia.org/wiki/Hash_function)、[默克尔树](https://en.wikipedia.org/wiki/Merkle_tree)、[字典树](https://en.wikipedia.org/wiki/Trie)和[序列化](https://en.wikipedia.org/wiki/Serialization)的基础知识会很有帮助。 本文首先描述基本的[基数树](https://en.wikipedia.org/wiki/Radix_tree)，然后逐步介绍为实现以太坊更优化的数据结构而必需的修改。

## 基本基数树 {#basic-radix-tries}

在一个基数树中，每个节点如下所示：

```
    [i_0, i_1 ... i_n, value]
```

其中 `i_0 ...` i_n` 表示字母表的符号（通常是二进制或十六进制），`value`是节点的终端值，而`i_0, i_1 ...` 中的值 i_n` 槽位要么是 `NULL`，要么是指向其他节点的指针（在我们的例子中，是哈希）。 这形成了基本的 `(key, value)` 存储。

假设你想使用基数树数据结构永久保存一组键值对的次序。 要在树中查找当前映射到键 `dog` 的值，您需要先将 `dog` 转换为字母表中的字母（得出 `64 6f 67`），然后沿着该路径向下遍历树，直到找到该值。 也就是说，为了找到字典树的根节点，你先在平面键/值数据库中查找根哈希。 它表示一组指向其他节点的键。 您将使用索引 `6` 处的值作为键，并在平面键/值数据库中查找它，以获取下一层的节点。 然后选择索引 `4` 来查找下一个值，再选择索引 `6`，依此类推，直到您循着路径：`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`，您就可以查到节点的值并返回结果。

从前缀树中查询和从其底层的固定“键/值”数据库中查询存在差异。 它们都定义了“键/值”对，但底层数据库能对键执行传统的 1 步查找。 而在前缀树中查询一个键对应的值则需要在底层数据库中查询多次才能得到最终结果。 为了消除歧义，我们将后者称为 `path`。

基数树的更新和删除操作定义如下：

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

“默克尔”基数树是通过使用确定性生成的加密哈希摘要链接节点来构建的。 这种内容寻址（在键/值数据库中 `key == keccak256(rlp(value))`）为存储的数据提供了加密完整性保证。 如果给定字典树的根哈希是公开的，那么任何可以访问底层叶数据的人都可以通过提供将特定值与树根连接的每个节点的哈希，来证明该字典树在特定路径中包含给定值。

攻击者不可能提供不存在的 `(path, value)` 对的证明，因为根哈希最终基于其下的所有哈希。 任何底层的修改都会改变根哈希。 可以将哈希看作是数据结构信息的一种压缩表示，并由哈希函数的预映射保护所保障。

我们将基数树的原子单位（例如，单个十六进制字符或 4 位二进制数）称为“nibble”（半字节）。 如上所述，在一次遍历一个半字节的路径时，节点最多可以引用 16 个子节点，但包含一个 `value` 元素。 因此，我们把它们表示为具有长度 17 的数组。 我们把这些有 17 个元素的数组称为“分支节点”。

## 默克尔-帕特里夏树 {#merkle-patricia-trees}

基数树有一个主要限制：效率低下。 如果您想存储一个 `(path, value)` 绑定，其中路径（如在以太坊中）为 64 个字符长（`bytes32` 中的半字节数），我们将需要超过一千字节的额外空间来为每个字符存储一个层级，每次查找或删除都将需要完整的 64 步。 下文介绍的帕特里夏字典树可以解决这个问题。

### 优化 {#optimization}

默克尔帕特里夏树的节点可以是以下任意一种：

1. `NULL`（表示为空字符串）
2. `分支`：一个 17 项节点 `[ v0 ...` v15, vt ]`
3. `叶`：一个双元素节点 `[ encodedPath, value ]`
4. `扩展`：一个双元素节点 `[ encodedPath, key ]`

在 64 个字符的路径中，遍历前缀树的前几层后，一定会到达这样的节点：至少部分下游再无分支路径。 为避免沿路径创建多达 15 个稀疏的 `NULL` 节点，我们通过设置一个 `[ encodedPath, key ]` 形式的 `extension` 节点来简化下降过程，其中 `encodedPath` 包含要跳过的“部分路径”（使用下面描述的紧凑编码），`key` 用于下一次数据库查找。

对于 `leaf` 节点，它可以通过 `encodedPath` 第一个半字节中的标志进行标记，该路径对所有先前节点的路径片段进行编码，我们可以直接查找 `value`。

然而，上述优化造成了模棱两可。

当以半字节为单位遍历路径时，我们最终可能要遍历奇数个半字节，但因为所有数据都以 `bytes` 格式存储。 例如，无法区分半字节 `1` 和半字节 `01`（两者都必须存储为 `<01>`）。 要指定奇数个半字节的长度，这部分路径要使用标记位作为前缀。

### 规范：带可选终止符的十六进制序列的紧凑编码 {#specification}

如上所述，标记_剩余部分路径长度为奇数还是偶数_以及_是叶节点还是扩展节点_，位于任何双元素节点的部分路径的第一个半字节中。 从而产生以下结果：

| 十六进制字符 | 比特   | 部分类型节点   | 路径长度 |
| ------ | ---- | -------- | ---- |
| 0      | 0000 | 扩展       | 偶数   |
| 1      | 0001 | 扩展       | 奇数   |
| 2      | 0010 | 终止（叶子节点） | 偶数   |
| 3      | 0011 | 终止（叶子节点） | 奇数   |

对于偶数长度的剩余路径（`0` 或 `2`），后面将始终跟着另一个 `0` “填充”半字节。

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
        # hexarray 现在的长度为偶数，其第一个半字节为标志位。
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

例子：

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

以下为获取默克尔帕特里夏树中节点的扩展代码：

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

### 示例树 {#example-trie}

假设我们想要一个包含四个路径/值对的字典树：`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`。

首先，我们将路径和值都转换为 `bytes`。 下文中，_路径_的实际字节表示用 `<>` 表示，而_值_仍显示为字符串（用 `''` 表示），以便于理解（它们实际上也应该是 `bytes`）：

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

现在，我们使用底层数据库中的以下键/值对构建了这样一棵前缀树：

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

当一个节点在另一个节点内被引用时，如果 `len(rlp.encode(node)) >= 32`，则包含的是 `keccak256(rlp.encode(node))`，否则是 `node` 本身，其中 `rlp.encode`是 [RLP](/developers/docs/data-structures-and-encoding/rlp) 编码函数。

请注意，更新字典树时，如果新创建的节点长度 >= 32，则需要将键/值对 `(keccak256(x), x)` 存储在持久化查找表中。 然而，如果节点比这短，则不需要存储任何数据，因为函数 f(x) = x 是可逆的。

## 以太坊中的树 {#tries-in-ethereum}

以太坊执行层中的所有默克尔树均使用默克尔帕特里夏树。

在区块头，有来自 3 棵前缀树的 3 个根。

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### 状态树 {#state-trie}

有一个全局状态字典树，每次客户端处理一个区块时它都会更新。 其中，`path` 始终为：`keccak256(ethereumAddress)`，`value` 始终为：`rlp(ethereumAccount)`。 更具体地说，一个以太坊 `account` 是一个包含 4 个元素的数组：`[nonce,balance,storageRoot,codeHash]`。 值得注意的是，此 `storageRoot` 是另一个帕特里夏树的根：

### 存储树 {#storage-trie}

存储树是存放_所有_合约数据的地方。 每个帐户都有一棵单独的存储树。 要用给定地址在特定的存储位置检索值，需要存储地址、存储器中存储数据的整数位置，以及区块 ID。 然后，这些可以作为参数传递给 JSON-RPC API 中定义的 `eth_getStorageAt`，例如，检索地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的存储槽 0 中的数据：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

更多的是检索存储器中的其他元素，因为必须首先计算存储树中的位置。 该位置计算为地址和存储位置的 `keccak256` 哈希，两者都向左填充零至 32 字节长度。 例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 的存储槽 1 中数据的位置是：

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 控制台中，可以按以下方式计算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 为 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。 与以前相同，此地址现在可用于从存储树检索数据：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注意：如果以太坊帐户不是合约帐户，其 `storageRoot` 默认是空的。

### 交易树 {#transaction-trie}

每个区块都有一棵单独的交易树，同样存储 `(key, value)` 对。 这里的路径是：`rlp(transactionIndex)`，它表示与以下确定的值相对应的键：

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

更多相关信息请参阅 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档。

### 收据树 {#receipts-trie}

每个区块都有自己的收据树。 此处的 `path` 是：`rlp(transactionIndex)`。 `transactionIndex` 是它所在区块中的索引。 收据字典树从不更新。 与交易字典树类似，它也有当前和以前的收据。 为了在收据字典树中查询特定的收据，需要提供区块中交易的索引、收据有效载荷以及交易类型。 返回的收据可以是 `Receipt` 类型（定义为 `TransactionType` 和 `ReceiptPayload` 的串联），也可以是 `LegacyReceipt` 类型（定义为 `rlp([status, cumulativeGasUsed, logsBloom, logs])`）。

更多相关信息请参阅 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文档。

## 扩展阅读 {#further-reading}

- [修改后的默克尔-帕特里夏树 — 以太坊如何保存状态](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克尔化](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [理解以太坊树](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
