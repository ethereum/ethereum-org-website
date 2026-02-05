---
title: 默克爾帕特里夏樹
description: 介紹默克爾帕特里夏樹。
lang: zh-tw
sidebarDepth: 2
---

以太坊的狀態（所有帳戶、餘額和智慧型合約的總體）被編碼成一種特殊版本的資料結構，這種結構在計算機科學界通常被稱作默克爾樹。 這種結構在密碼學中的許多應用程式中非常有用，因為它會在樹中所有互相纏繞的資料片段之間建立一種可驗證的關係，產生可用於驗證相關資料的單一 **根** 值。

以太坊的資料結構是「改良版默克爾-派翠西亞樹」，之所以如此命名，是因為它借鑒了 PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) 的一些功能，並且其設計是為了能有效率地對構成以太坊狀態的項目進行資料**擷取**。

默克爾-派翠西亞樹是確定性且可加密驗證的：產生狀態根的唯一方法是透過狀態的每個獨立部分來計算，而兩個相同的狀態可以透過比較根雜湊以及導出根雜湊的那些雜湊 (_默克爾證明_) 來輕易地證明其相同性。 相反，無法用同一個根雜湊建立兩個不同的狀態，任何用不同值修改狀態的嘗試都會導致不同的狀態根雜湊。 理論上，此結構為插入、查詢和刪除提供了 `O(log(n))` 效率的「終極目標」。

在不久的將來，以太坊計劃遷移到[沃克爾樹](/roadmap/verkle-trees)結構，這將為未來的協定改進帶來更多新的可能性。

## 先決條件 {#prerequisites}

為了能更佳理解此頁面，最好對 [雜湊](https://en.wikipedia.org/wiki/Hash_function)、[默克爾樹](https://en.wikipedia.org/wiki/Merkle_tree)、[前綴樹](https://en.wikipedia.org/wiki/Trie) 和 [序列化](https://en.wikipedia.org/wiki/Serialization) 有基本了解。 本文從基本的 [基數樹](https://en.wikipedia.org/wiki/Radix_tree) 描述開始，然後逐步介紹讓以太坊資料結構更優化所做的必要修改。

## 基本基數前綴樹 {#basic-radix-tries}

在基數樹中，每個節點看起來如下:

```
    [i_0, i_1 ... i_n, value]
```

其中 `i_0 ...` i_n` 代表字母表的符號 (通常是二進制或十六進制)，`value`是節點的終端值，而`i_0, i_1 ...` 中的值 i_n` 位置的值要不是 `NULL`，就是指向其他節點的指標 (在我們的例子中，是其他節點的雜湊)。 這形成了基本的 `(key, value)` 儲存。

假設你想使用基數樹資料結構永久保存一組鍵值對的順序。 要在前綴樹中找到目前映射至鍵 `dog` 的值，您要先將 `dog` 轉換成字母表中的字母 (得到 `64 6f 67`)，然後沿著該路徑向下遍歷前綴樹，直到找到值為止。 也就是説，爲了找到字典樹的根節點，你首先需要在平面鍵/值資料庫中找到根雜湊。 它表示指向其他節點的一個鍵陣列。 您可以使用索引 `6` 的值作為鍵，並在平面鍵/值資料庫中查詢，以取得下一層的節點。 然後選擇索引 `4` 來查詢下一個值，接著選擇索引 `6`，依此類推，直到您遵循路徑：`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`，您便會查詢到節點的值並回傳結果。

從「樹」中和從底層平面鍵/值「資料庫」中進行查找有所區別。 它們都定義了鍵/值排列，但底層資料庫能夠對鍵執行傳統的一步查找。 在樹中查找一個鍵對應的值則需要在底層資料庫中查詢多次，才能得到上述的最終值。 為消除歧義，我們將後者稱為 `path` (路徑)。

基數樹的更新和刪除操作可被定義如下:

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

「默克爾」基數樹是透過使用確定性產生的加密雜湊摘要連結節點來構建的。 這種內容定址 (在鍵/值資料庫中 `key == keccak256(rlp(value))`) 為儲存的資料提供了加密完整性保證。 如果給定字典樹的根雜湊是公開的，則任何能夠訪問底層葉資料的人都可以透過提供將特定值與樹根連結的每個節點的雜湊，來證明該字典樹在特定路徑中包含給定值。

攻擊者不可能提供不存在的 `(path, value)` 配對證明，因為根雜湊最終是基於其下的所有雜湊。 任何底層修改都會改變根雜湊。 你可以將雜湊想做是資料結構資訊的一種壓縮表示，並透過雜湊函式的預映射保護保證安全。

我們會將基數樹的一個原子單位 (例如單一的十六進制字元，或 4 位元的二進制數) 稱為「半位元組 (nibble)」。 如上所述，在一次遍歷一個半位元組的路徑時，節點最多可以引用 16 個子節點，但包含一個 `value` 元素。 因此，我們將它們表示爲長度 17 的陣列。 我們將這 17 個元素的陣列稱爲「分支節點」。

## 默克爾-派翠西亞樹 {#merkle-patricia-trees}

基數樹有一個主要限制：效率低下。 如果您想儲存一個 `(path, value)` 綁定，其中路徑的長度 (像在以太坊一樣) 為 64 個字元 (即 `bytes32` 中的半位元組數)，那麼每個字元都需要超過 1 KB 的額外空間來儲存一個層級，且每次查詢或刪除都將需要整整 64 個步驟。 下文介紹的帕特里夏樹解決了這個問題。

### 優化 {#optimization}

默克爾帕特里夏樹中的節點可以是以下其中一種：

1. `NULL` (以空字串表示)
2. `branch` 一個 17 項的節點 `[ v0 ...` `v15, vt ]`
3. `leaf` 一個 2 項的節點 `[ encodedPath, value ]`
4. `extension` 一個 2 項的節點 `[ encodedPath, key ]`

在 64 字元的路徑中，遍歷樹的前幾層后，你將會達到一個至少下游部分不再有分支路徑的節點。 為避免沿路徑建立多達 15 個稀疏的 `NULL` 節點，我們透過設定 `[ encodedPath, key ]` 形式的 `extension` 節點來簡化向下搜尋，其中 `encodedPath` 包含要跳過的「部分路徑」 (使用下述的緊湊編碼)，而 `key` 則用於下一次資料庫查詢。

對於 `leaf` 節點，可以在 `encodedPath` 的第一個半位元組中以旗標標記，路徑會編碼所有先前節點的路徑片段，而我們可以直接查詢 `value`。

然而，上述優化帶來了歧義。

以半位元組為單位遍歷路徑時，我們最終可能需要遍歷奇數個半位元組，但是所有資料都是以 `bytes` 格式儲存的。 例如，我們無法區分半位元組 `1` 和半位元組 `01` (兩者都必須儲存為 `<01>`)。 爲了指定奇數長度，這部分路徑需要用標記作爲前置詞。

### 規格：帶有可選終端符的十六進制序列的緊湊編碼 {#specification}

如上所述，關於_剩餘部分路徑長度為奇數還是偶數_以及是_葉節點還是擴充節點_的旗標，都位於任何 2 項節點的部分路徑的第一個半位元組中。 它們會產生以下結果:

| 十六進位字符 | 比特   | 部分節點類型                    | 路徑長度 |
| ------ | ---- | ------------------------- | ---- |
| 0      | 0000 | 擴充                        | 偶數   |
| 1      | 0001 | 擴充                        | 奇數   |
| 2      | 0010 | 終端 (葉) | 偶數   |
| 3      | 0011 | 終端 (葉) | 奇數   |

對於偶數的剩餘路徑長度 (`0` 或 `2`)，後面將總會跟著另一個 `0`「填充」半位元組。

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
        # hexarray 現在的長度為偶數，其第一個半位元組為旗標。
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

範例：

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

下面是獲取默克爾帕特里夏樹中節點的擴展程式碼：

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

### 前綴樹範例 {#example-trie}

假設我們想要一個前綴樹，其中包含四個路徑/值配對：`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`。

首先，我們將路徑和值都轉換為 `bytes`。 下面，_路徑_ 的實際位元組表示法以 `<>` 表示，但為了方便理解，_值_ 仍然以字串 (`''`) 顯示 (值實際上也應是 `bytes`)：

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

當一個節點在另一個節點中被引用時，所包含的是 `keccak256(rlp.encode(node))` (若 `len(rlp.encode(node)) >= 32`) 或 `node` (若否)，其中 `rlp.encode` 是 [RLP](/developers/docs/data-structures-and-encoding/rlp) 編碼函式。

請注意，在更新前綴樹時，如果新建立的節點長度 >= 32，則需要將鍵/值配對 `(keccak256(x), x)` 儲存在持久性查詢表中。 然而，如果節點比這短，則不需要儲存任何資料，因爲函式 f(x) = x 是可逆的。

## 以太坊中的前綴樹 {#tries-in-ethereum}

以太坊執行層中的所有默克爾樹都使用默克爾帕特里夏樹。

在區塊頭，有來自其中 3 棵樹的 3 個根。

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### 狀態前綴樹 {#state-trie}

有一個全域狀態樹，每次用戶端處理一個區塊時它都會更新。 在其中，`path` 始終為：`keccak256(ethereumAddress)`，而 `value` 始終為：`rlp(ethereumAccount)`。 更具體地說，以太坊 `account` (帳戶) 是一個 4 項陣列，包含 `[nonce,balance,storageRoot,codeHash]`。 此時，值得注意的是，這個 `storageRoot` 是另一個派翠西亞樹的根：

### 儲存前綴樹 {#storage-trie}

儲存前綴樹是_所有_合約資料儲存的地方。 每個帳戶都有一棵單獨的存儲樹。 爲了用給定地址檢索位於特定存儲位置的值，需要有存儲地址、存儲中所儲存資料的整數位置，以及區塊 ID。 然後，這些資料可以作為引數傳遞給 JSON-RPC API 中定義的 `eth_getStorageAt`，例如，要擷取位址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 的儲存槽 0 中的資料：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

檢索存儲中的其他元素稍微複雜一些，因爲必須首先計算存儲樹中的位置。 此位置是透過計算地址和儲存位置的 `keccak256` 雜湊所得，兩者都向左填充零，直到長度為 32 位元組。 例如，位址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 的儲存槽 1 中資料的位置是：

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 主控台中，可以按以下方式計算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 是 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。 與之前一樣，該地址現在可用於從存儲樹檢索資料：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注意：如果不是合約帳戶，以太坊帳戶的 `storageRoot` 預設為空。

### 交易前綴樹 {#transaction-trie}

每個區塊都有一個獨立的交易前綴樹，同樣儲存 `(key, value)` 配對。 這裡的路徑是：`rlp(transactionIndex)`，它代表對應於由以下方式決定的值的鍵：

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

更多相關資訊可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文件中找到。

### 收據前綴樹 {#receipts-trie}

每個區塊都有其收據樹。 這裡的 `path` 是：`rlp(transactionIndex)`。 `transactionIndex` 是它在所包含區塊中的索引。 收據樹從不更新。 與交易樹類似，它也有當前和以前的收據。 爲了在收據樹中查詢特定的收據，需要提供區塊中交易的索引、收據承載以及交易類型。 回傳的收據可以是 `Receipt` 類型，其定義為 `TransactionType` 和 `ReceiptPayload` 的串接；或者也可以是 `LegacyReceipt` 類型，其定義為 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

更多相關資訊可以在 [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718) 文件中找到。

## 延伸閱讀 {#further-reading}

- [改良版默克爾-派翠西亞樹 — 以太坊如何儲存狀態](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克爾化](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [了解以太坊前綴樹](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
