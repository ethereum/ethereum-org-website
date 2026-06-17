---
title: 資料結構與編碼
description: 以太坊基本資料結構的概覽。
lang: zh-tw
sidebarDepth: 2
---

以太坊建立、儲存並傳輸大量的資料。這些資料必須以標準化且節省記憶體的方式進行格式化，以允許任何人能在相對普通的消費級硬體上[執行節點](/run-a-node/)。為了實現這一點，以太坊堆疊中使用了幾種特定的資料結構。

## 先決條件 {#prerequisites}

您應該了解以太坊的基礎知識與[用戶端軟體](/developers/docs/nodes-and-clients/)。建議您熟悉網路層與[以太坊白皮書](/whitepaper/)。

## 資料結構 {#data-structures}

### 帕特里夏默克爾樹 (Patricia Merkle Tries) {#patricia-merkle-tries}

帕特里夏默克爾樹 (Patricia Merkle Tries) 是一種將鍵值對編碼為確定性且經過密碼學驗證的樹狀結構。這些結構在以太坊的執行層中被廣泛使用。

[更多關於帕特里夏默克爾樹的資訊](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 遞迴長度前綴 (Recursive Length Prefix) {#recursive-length-prefix}

遞迴長度前綴 (RLP) 是一種在以太坊執行層中被廣泛使用的序列化方法。

[更多關於 RLP 的資訊](/developers/docs/data-structures-and-encoding/rlp)

### 簡單序列化 (Simple Serialize) {#simple-serialize}

簡單序列化 (SSZ) 是以太坊共識層上主要的序列化格式，因為它與默克爾化 (merklelization) 具有良好的相容性。

[更多關於 SSZ 的資訊](/developers/docs/data-structures-and-encoding/ssz)