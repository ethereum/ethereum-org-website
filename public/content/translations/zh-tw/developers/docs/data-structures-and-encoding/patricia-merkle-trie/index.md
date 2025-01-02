---
title: 默克爾帕特里夏樹
description: 介紹默克爾帕特里夏樹。
lang: zh-tw
sidebarDepth: 2
---

以太坊的狀態（所有帳戶、餘額和智慧型合約的總體）被編碼成一種特殊版本的資料結構，這種結構在計算機科學界通常被稱作默克爾樹。 這種結構在密碼學中的許多應用中都非常有用，因為它會在默克爾樹中所有互相有關的資料片段之間建立了一種可驗證的關係，產生可用於驗證相關資料的單一**根**值。

以太坊的資料結構是「改良版的默克爾帕特里夏樹」，之所以會這樣命名，是因為它借鑒了一些 PATRICIA（字母數字編碼的資訊擷取實用演算法）的部分特徵，同時它是為了對構成以太坊狀態的項目進行有效率的資料**擷取**而設計的。

默克爾帕特里夏樹是確定性的，並且可以透過加密方式驗證：生成狀態根的唯一方式是從每個單獨的狀態進行計算，且兩個相同的狀態可以透過比較根雜湊和其父雜湊（_默克爾證明_）來簡單地證明相同。 相反，無法用同一個根雜湊建立兩個不同的狀態，任何用不同值修改狀態的嘗試都會導致不同的狀態根雜湊。 從理論上講，這種結構為置入、查找和刪除提供了完美的 `O(log(n))` 效率。

在不久的將來，以太坊計劃遷移到[沃克爾樹](https://ethereum.org/en/roadmap/verkle-trees)結構，這將為未來的協定改進帶來更多新的可能性。

## 前置要求 {#prerequisites}

為了更容易理解本文，具備以下基礎知識會很有幫助：[雜湊](https://en.wikipedia.org/wiki/Hash_function)、[默克爾樹](https://en.wikipedia.org/wiki/Merkle_tree)、[字典树](https://en.wikipedia.org/wiki/Trie)和[序列化](https://en.wikipedia.org/wiki/Serialization)。 本文從基本的[基數樹](https://en.wikipedia.org/wiki/Radix_tree)描述開始，然後逐步介紹使以太坊資料結構更爲優化的必要修改。

## 基數樹 {#basic-radix-tries}

在基數樹中，每個節點看起來如下:

```
    [i_0, i_1 ... i_n, value]
```

其中，`i_0 ... i_n` 代表字母表的符號（通常是二進位或十六進位），`value` 是節點的終值，`i_0, i_1 ... i_n` 插槽中的值為 `NULL` 或指向其他節點（在我們的示例中，是其他節點的雜湊）的指針。 這形成了基本的 `(key, value)` 存儲。

假設你想使用基數樹資料結構永久保存一組鍵值對的順序。 爲了在字典樹中找到目前與鍵 `dog` 對應的值，你首先需要把 `dog` 轉換為字母表中的字母（提供 `64 6f 67`），然後沿著該路徑向下遍歷字典樹，直到找到該值。 也就是説，爲了找到字典樹的根節點，你首先需要在平面鍵/值資料庫中找到根雜湊。 它表示指向其他節點的一個鍵陣列。 你將使用索引 `6` 的值作爲鍵，並通過在平面鍵/值資料庫中查找該鍵來獲取下一級的節點。 然後選取索引 `4` 查找下一個值，再選取索引 `6`，依此類推，直到遍歷路徑 `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` 后，你會找到該節點的值並返回結果。

從「樹」中和從底層平面鍵/值「資料庫」中進行查找有所區別。 它們都定義了鍵/值排列，但底層資料庫能夠對鍵執行傳統的一步查找。 在樹中查找一個鍵對應的值則需要在底層資料庫中查詢多次，才能得到上述的最終值。 讓我們將後者稱爲 `path`，以消除歧義。

基數樹的更新和刪除操作可被定義如下:

```
    def update(node,path,value):
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = value
        else:
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

「默克爾」基數樹是透過使用確定性產生的加密雜湊摘要連結節點來構建的。 這種（鍵/值資料庫中 `key == keccak256(rlp(value))`）内容尋址提供了儲存資料的加密完整性保證。 如果給定字典樹的根雜湊是公開的，則任何能夠訪問底層葉資料的人都可以透過提供將特定值與樹根連結的每個節點的雜湊，來證明該字典樹在特定路徑中包含給定值。

對於攻擊者來講，他們無法證明 `(path, value)` 對不存在，因爲根雜湊最終基於其下方的所有雜湊。 任何底層修改都會改變根雜湊。 你可以將雜湊想做是資料結構資訊的一種壓縮表示，並透過雜湊函式的預映射保護保證安全。

我們將基數樹的原子單位（例如單個十六進位字元或 4 位二進位數字）稱爲「nibble」。 如上所述，以 nibble 為單位遍歷路徑時，節點最多可以指向 16 個子節點，但是還包括一個 `value` 元素。 因此，我們將它們表示爲長度 17 的陣列。 我們將這 17 個元素的陣列稱爲「分支節點」。

## 默克爾帕特里夏樹 {#merkle-patricia-trees}

基數樹有一個主要限制：效率低下。 如果你希望將一個 `(path, value)` 繫結儲存在路徑長度為 64 字符（`bytes32` 中的 nibble 數）的位置，如以太坊中，我們需要超過一千個位元組的額外空間將每個字元存儲一個等級，並且每次查詢或刪除都需要執行完整的 64 步。 下文介紹的帕特里夏樹解決了這個問題。

### 最佳化 {#optimization}

默克爾帕特里夏樹中的節點可以是以下其中一種：

1.  `NULL`（表示爲空字串）
2.  `branch` 一個 17 項目節點 `[ v0 ... v15, vt ]`
3.  `leaf` 一個 2 項目節點 `[ encodedPath, value ]`
4.  `extension` 一個 2 項目節點 `[ encodedPath, key ]`

在 64 字元的路徑中，遍歷樹的前幾層后，你將會達到一個至少下游部分不再有分支路徑的節點。 爲了避免在路徑中建立多達 15 個稀疏 `NULL` 節點，我們需要透過設置一個形式爲 `[ encodedPath, key ]` 的 `extension` 節點來簡化向下遍歷，其中 `encodedPath` 包含要跳過的「部分路徑」（使用下面描述的壓縮編碼），`key` 用於下一次資料庫查詢。

對於 `leaf` 節點，可以使用 `encodedPath` 的第一個 nibble 中的標記來標注，該路徑編碼了所有先前節點的路徑片段，並且我們可以直接查找 `value`。

然而，上述優化帶來了歧義。

當 nibble 遍歷路徑時，最後我們可能需要遍歷奇數個 nibble，但是所有資料都需要以 `bytes` 形式儲存。 兩者之間是無法區分的，例如，nibble `1` 和 nibble `01`（兩者都必須存儲爲 `<01>`）。 爲了指定奇數長度，這部分路徑需要用標記作爲前置詞。

### 規範：具有可選終止符的十六進位序列壓縮編碼 {#specification}

如上所述，_剩餘部分路徑長度為奇數 vs 偶數_和_葉節點 vs 擴展節點_的標記位於任意 2 項目節點中部分路徑的第一個 nibble。 它們會產生以下結果:

    hex char    bits    |    node type partial     path length
    ----------------------------------------------------------
       0        0000    |       extension              even
       1        0001    |       extension              odd
       2        0010    |   terminating (leaf)         even
       3        0011    |   terminating (leaf)         odd

對於剩餘路徑長度為偶數的情況（`0` 或 `2`），一定會附加一個 `0`「填充」nibble。

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

範例:

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

下面是獲取默克爾帕特里夏樹中節點的擴展程式碼：

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

### 示例樹 {#example-trie}

假設我們想要一個包含四個路徑/值對 `('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')` 的樹。

首先，我們需要將路徑和值都轉換爲 `bytes`。 如下，_paths_ 的實際位元組代表由 `<>` 表示，而 _values_ 仍然顯示爲字串，由 `"` 表示，以方便理解（值也應該為 `bytes`）：

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

現在，我們使用底層資料庫中的以下鍵/值對構建了這樣一顆樹：

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

當一個節點在另一個節點内部被引用時，包含的内容是 `H(rlp.encode(node))`，其中 `H(x) = keccak256(x) if len(x) >= 32 else x` 並且 `rlp.encode` 是[遞迴長度前置詞](/developers/docs/data-structures-and-encoding/rlp)編碼函式。

請注意，更新樹時，_如果_新建立的節點長度 >= 32，則需要將鍵/值對 `(keccak256(x), x)` 儲存在一個持續不變的查找表中。 然而，如果節點比這短，則不需要儲存任何資料，因爲函式 f(x) = x 是可逆的。

## 以太坊中的樹 {#tries-in-ethereum}

以太坊執行層中的所有默克爾樹都使用默克爾帕特里夏樹。

在區塊頭，有來自其中 3 棵樹的 3 個根。

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### 狀態樹 {#state-trie}

有一個全域狀態樹，每次用戶端處理一個區塊時它都會更新。 其中，`path` 始終為 `keccak256(ethereumAddress)`，並且 `value` 始終為 `rlp(ethereumAccount)`。 具體來講，一個以太坊 `account` 是包含 4 個項目的陣列：`[nonce,balance,storageRoot,codeHash]`。 此時，值得注意的是，該 `storageRoot` 是另一個帕特里夏樹的根：

### 存儲樹 {#storage-trie}

存儲樹是保存_所有_合約資料的地方。 每個帳戶都有一棵單獨的存儲樹。 爲了用給定地址檢索位於特定存儲位置的值，需要有存儲地址、存儲中所儲存資料的整數位置，以及區塊 ID。 之後，這些資料可以作爲引數傳入 JSON-RPC 應用程式介面中定義的 `eth_getStorageAt`，例如，用於檢索地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的存儲插槽 0 中的資料：

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

檢索存儲中的其他元素稍微複雜一些，因爲必須首先計算存儲樹中的位置。 該位置作爲地址和存儲位置的 `keccak256` 雜湊進行計算，兩者都從左側開始，用零填充 32 位元組的長度。 例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 存儲插槽 1 中的資料位置是：

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 主控台中，可以按以下方式計算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 為 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。 與之前一樣，該地址現在可用於從存儲樹檢索資料：

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注：如果不是合約帳戶，以太坊帳戶的 `storageRoot` 預設為空。

### 交易樹 {#transaction-trie}

每個區塊都有一個獨立的交易樹，也用於儲存 `(key, value)` 對。 此處的路徑為：`rlp(transactionIndex)`，代表了對應一個值的鍵，該值由以下程式碼決定：

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文件中可以找到更多相關資訊。

### 收據樹 {#receipts-trie}

每個區塊都有其收據樹。 此處的 `path` 是：`rlp(transactionIndex)`。 `transactionIndex` 是其所在區塊中的索引。 收據樹從不更新。 與交易樹類似，它也有當前和以前的收據。 爲了在收據樹中查詢特定的收據，需要提供區塊中交易的索引、收據承載以及交易類型。 返回的收據可以是 `Receipt` 類型，該類型被定義爲 `TransactionType` 和 `ReceiptPayload` 的串聯，也可以是 `LegacyReceipt` 類型，該類型被定義爲 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文件中可以找到更多相關資訊。

## 衍生閱讀 {#further-reading}

- [修改後的默克爾帕特里夏樹 — 以太坊如何保存狀態](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克爾](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [瞭解以太坊樹](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
