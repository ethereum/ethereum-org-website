---
title: "默克爾帕特里夏樹"
description: "默克爾帕特里夏樹簡介。"
lang: zh-tw
sidebarDepth: 2
---

[以太坊](/)的狀態（所有帳戶、餘額和智能合約的總和）被編碼為一種特殊版本的資料結構，在電腦科學中通常被稱為默克爾樹 (Merkle Tree)。這種結構在密碼學的許多應用中非常有用，因為它在樹中交織的所有單獨資料片段之間建立了一種可驗證的關係，從而產生一個單一的**根 (root)** 值，可用於證明有關資料的資訊。

以太坊的資料結構是一種「修改版的默克爾帕特里夏樹 (Merkle-Patricia Trie)」，之所以如此命名，是因為它借鑒了 PATRICIA（檢索字母數字編碼資訊的實用演算法，Practical Algorithm To Retrieve Information Coded in Alphanumeric）的一些特徵，並且它是為了高效地檢索 (re**trie**val) 構成以太坊狀態的項目而設計的。

默克爾帕特里夏樹是確定性且在密碼學上可驗證的：產生狀態根的唯一方法是從狀態的每個單獨片段計算得出，並且透過比較根雜湊和產生它的雜湊（*默克爾證明 (Merkle proof)*），可以輕鬆證明兩個相同的狀態是相同的。相反地，無法建立具有相同根雜湊的兩個不同狀態，任何嘗試使用不同值修改狀態的行為都會導致不同的狀態根雜湊。理論上，這種結構為插入、尋找和刪除操作提供了 `O(log(n))` 效率的「聖杯」。

在不久的將來，以太坊計畫遷移到 [沃克爾樹 (Verkle Tree)](/roadmap/verkle-trees) 結構，這將為未來的協定改進開啟許多新的可能性。

## 先決條件 {#prerequisites}

為了更易於理解本頁面，具備[雜湊](https://en.wikipedia.org/wiki/Hash_function)、[默克爾樹](https://en.wikipedia.org/wiki/Merkle_tree)、[前綴樹 (trie)](https://en.wikipedia.org/wiki/Trie)和[序列化](https://en.wikipedia.org/wiki/Serialization)的基礎知識會很有幫助。本文首先描述基本的[基數樹 (radix tree)](https://en.wikipedia.org/wiki/Radix_tree)，然後逐步介紹以太坊更優化的資料結構所需的修改。

## 基本基數前綴樹 {#basic-radix-tries}

在基本的基數前綴樹中，每個節點如下所示：

```
[i_0, i_1 ... i_n, value]
```

其中 `i_0 ... i_n` 代表字母表的符號（通常是二進位或十六進位），`value` 是節點的終端值，而 `i_0, i_1 ... i_n` 時槽中的值要麼是 `NULL`，要麼是指向其他節點的指標（在我們的例子中是雜湊）。這構成了一個基本的 `(key, value)` 儲存。

假設你想使用基數樹資料結構來持久化一組鍵值對的順序。要在前綴樹中尋找目前對應到金鑰 `dog` 的值，你首先要將 `dog` 轉換為字母表中的字母（得到 `64 6f 67`），然後沿著該路徑在前綴樹中向下尋找，直到找到該值。也就是說，你首先在扁平的鍵/值資料庫中尋找根雜湊，以找到前綴樹的根節點。它表示為一個指向其他節點的金鑰陣列。你會使用索引 `6` 處的值作為金鑰，並在扁平的鍵/值資料庫中尋找它，以獲得下一層的節點。然後選擇索引 `4` 來尋找下一個值，接著選擇索引 `6`，依此類推，直到你遵循路徑：`root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` 後，你將尋找該節點的值並回傳結果。

在「前綴樹」中尋找內容與在底層扁平鍵/值「資料庫」中尋找內容是有區別的。它們都定義了鍵/值排列，但底層資料庫可以對金鑰進行傳統的單步尋找。在前綴樹中尋找金鑰需要多次底層資料庫尋找才能獲得上述的最終值。為了消除歧義，我們將後者稱為 `path`。

基數前綴樹的更新和刪除操作可以定義如下：

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

「默克爾」基數樹是透過使用確定性產生的密碼學雜湊摘要來連結節點而建立的。這種內容定址（在鍵/值資料庫 `key == keccak256(rlp(value))` 中）為儲存的資料提供了密碼學完整性保證。如果給定前綴樹的根雜湊是公開已知的，那麼任何可以存取底層葉節點資料的人，都可以透過提供將特定值連接到樹根的每個節點的雜湊，來建構一個證明，證明該前綴樹在特定路徑包含給定值。

攻擊者不可能提供不存在的 `(path, value)` 對的證明，因為根雜湊最終是基於其下方的所有雜湊。任何底層修改都會改變根雜湊。你可以將雜湊視為資料結構資訊的壓縮表示，並受到雜湊運算函數的抗原像性 (pre-image protection) 保護。

我們將基數樹的原子單位（例如，單個十六進位字元或 4 位元二進位數字）稱為「半位元組 (nibble)」。如上所述，在一次遍歷一個半位元組的路徑時，節點最多可以參照 16 個子節點，但包含一個 `value` 元素。因此，我們將它們表示為長度為 17 的陣列。我們稱這些 17 元素陣列為「分支節點 (branch nodes)」。

## 默克爾帕特里夏樹 {#merkle-patricia-trees}

基數前綴樹有一個主要限制：它們效率低下。如果你想儲存一個 `(path, value)` 綁定，而路徑像在以太坊中一樣長達 64 個字元（`bytes32` 中的半位元組數量），我們將需要超過一千位元組 (kilobyte) 的額外空間來為每個字元儲存一個層級，並且每次尋找或刪除都需要完整的 64 個步驟。以下介紹的帕特里夏樹解決了這個問題。

### 最佳化 {#optimization}

默克爾帕特里夏樹中的節點是以下之一：

1.  `NULL`（表示為空字串）
2.  `branch` 一個 17 項的節點 `[ v0 ... v15, vt ]`
3.  `leaf` 一個 2 項的節點 `[ encodedPath, value ]`
4.  `extension` 一個 2 項的節點 `[ encodedPath, key ]`

對於 64 個字元的路徑，在遍歷前綴樹的前幾層之後，不可避免地會到達一個節點，在該節點向下至少一部分路徑中不存在分歧路徑。為了避免必須沿著路徑建立多達 15 個稀疏的 `NULL` 節點，我們透過設定一個形式為 `[ encodedPath, key ]` 的 `extension` 節點來捷徑下降過程，其中 `encodedPath` 包含要跳過的「部分路徑」（使用下面描述的緊湊編碼），而 `key` 用於下一次資料庫尋找。

對於 `leaf` 節點（可以透過 `encodedPath` 第一個半位元組中的標記來標示），該路徑編碼了所有先前節點的路徑片段，我們可以直接尋找 `value`。

然而，上述最佳化引入了歧義。

當以半位元組遍歷路徑時，我們最終可能會遇到奇數個半位元組需要遍歷，但因為所有資料都以 `bytes` 格式儲存。例如，無法區分半位元組 `1` 和半位元組 `01`（兩者都必須儲存為 `<01>`）。為了指定奇數長度，部分路徑會加上一個標記作為前綴。

### 規範：帶有可選終止符的十六進位序列緊湊編碼 {#specification}

如上所述，_剩餘部分路徑長度為奇數或偶數_以及_葉節點或擴展節點_的標記，都位於任何 2 項節點的部分路徑的第一個半位元組中。它們產生以下結果：

| 十六進位字元 | 位元 | 節點類型部分 | 路徑長度 |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | 擴展 (extension)          | 偶數        |
| 1        | 0001 | 擴展 (extension)          | 奇數         |
| 2        | 0010 | 終止（葉節點） | 偶數        |
| 3        | 0011 | 終止（葉節點） | 奇數         |

對於偶數的剩餘路徑長度（`0` 或 `2`），後面將始終跟隨另一個 `0`「填充」半位元組。

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

以下是在默克爾帕特里夏樹中取得節點的擴展程式碼：

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

假設我們想要一個包含四個路徑/值對的前綴樹：`('do', 'verb')`、`('dog', 'puppy')`、`('doge', 'coins')`、`('horse', 'stallion')`。

首先，我們將路徑和值都轉換為 `bytes`。在下方，_路徑_的實際位元組表示由 `<>` 表示，儘管_值_仍然顯示為字串，由 `''` 表示，以便於理解（它們實際上也會是 `bytes`）：

```
<64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

現在，我們在底層資料庫中使用以下鍵/值對建立這樣一個前綴樹：

```
rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

當一個節點在另一個節點內部被參照時，包含的內容是 `keccak256(rlp.encode(node))`，如果 `len(rlp.encode(node)) >= 32` 則為 `node`，其中 `rlp.encode` 是 [RLP](/developers/docs/data-structures-and-encoding/rlp) 編碼函數。

請注意，在更新前綴樹時，_如果_新建立的節點長度 >= 32，則需要將鍵/值對 `(keccak256(x), x)` 儲存在持久的尋找表中。然而，如果節點短於該長度，則不需要儲存任何內容，因為函數 f(x) = x 是可逆的。

## 以太坊中的前綴樹 {#tries-in-ethereum}

以太坊執行層中的所有默克爾樹都使用默克爾帕特里夏樹。

從區塊頭中，有來自這 3 個前綴樹的 3 個根。

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### 狀態樹 {#state-trie}

有一個全域狀態樹，每次用戶端處理區塊時都會更新它。在其中，`path` 始終是：`keccak256(ethereumAddress)`，而 `value` 始終是：`rlp(ethereumAccount)`。更具體地說，以太坊 `account` 是一個包含 4 個項目的 `[nonce,balance,storageRoot,codeHash]` 陣列。在這一點上，值得注意的是，這個 `storageRoot` 是另一個帕特里夏樹的根：

### 儲存前綴樹 {#storage-trie}

儲存前綴樹是_所有_合約資料存放的地方。每個帳戶都有一個獨立的儲存前綴樹。要在給定地址的特定儲存位置檢索值，需要儲存地址、儲存資料在儲存中的整數位置以及區塊 ID。然後可以將這些作為參數傳遞給 JSON-RPC API 中定義的 `eth_getStorageAt`，例如，檢索地址 `0x295a70b2de5e3953354a6a8344e616ed314d7251` 在儲存時槽 0 中的資料：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

檢索儲存中的其他元素稍微複雜一些，因為必須首先計算在儲存前綴樹中的位置。該位置計算為地址和儲存位置的 `keccak256` 雜湊，兩者都在左側補零至 32 位元組的長度。例如，地址 `0x391694e7e0b0cce554cb130d723a9d27458f9298` 在儲存時槽 1 中資料的位置是：

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

在 Geth 主控台中，可以按如下方式計算：

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

因此，`path` 是 `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`。現在可以像以前一樣使用它從儲存前綴樹中檢索資料：

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

注意：如果不是合約帳戶，以太坊帳戶的 `storageRoot` 預設為空。

### 交易前綴樹 {#transaction-trie}

每個區塊都有一個獨立的交易前綴樹，同樣儲存 `(key, value)` 對。這裡的路徑是：`rlp(transactionIndex)`，它代表對應於由以下決定的值的金鑰：

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

有關此內容的更多資訊，請參閱 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 文件。

### 收據前綴樹 {#receipts-trie}

每個區塊都有自己的收據前綴樹。這裡的 `path` 是：`rlp(transactionIndex)`。`transactionIndex` 是它在包含它的區塊中的索引。收據前綴樹永遠不會更新。與交易前綴樹類似，有目前和傳統的收據。要在收據前綴樹中查詢特定收據，需要交易在其區塊中的索引、收據有效負載和交易類型。回傳的收據可以是 `Receipt` 類型，定義為 `TransactionType` 和 `ReceiptPayload` 的串聯，或者可以是 `LegacyReceipt` 類型，定義為 `rlp([status, cumulativeGasUsed, logsBloom, logs])`。

有關此內容的更多資訊，請參閱 [EIP-2718](https://eips.ethereum.org/EIPS/eip-2718) 文件。

## 延伸閱讀 {#further-reading}

- [修改版的默克爾帕特里夏樹 — 以太坊如何儲存狀態](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [以太坊中的默克爾化 (Merkling)](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [理解以太坊前綴樹](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)