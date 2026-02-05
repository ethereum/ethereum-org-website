---
title: 資料結構和編碼
description: 以太坊基本資料結構概覽。
lang: zh-tw
sidebarDepth: 2
---

以太坊會建立、儲存和傳送大量資料。 此資料必須以標準化且高記憶體效率的方式格式化，讓任何人都可以在相對平價的消費級硬體上[執行節點](/run-a-node/)。 爲了實現這一點，以太坊堆棧中使用了一些特定的資料結構。

## 先決條件 {#prerequisites}

您應該了解以太坊的基礎知識以及[用戶端軟體](/developers/docs/nodes-and-clients/)。 建議您熟悉網路層和[以太坊白皮書](/whitepaper/)。

## 數據結構 {#data-structures}

### 派翠西亞·梅克爾前綴樹 {#patricia-merkle-tries}

帕特里夏默克爾樹是一種資料結構，將鍵值對編碼為具有確定性且經過加密驗證的樹。 這些資料結構被廣泛用於以太坊執行層。

[更多關於派翠西亞·梅克爾前綴樹的資訊](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 遞迴長度前綴 {#recursive-length-prefix}

遞迴長度前置詞 (RLP) 是一種在以太坊執行層中廣泛使用的序列化方法。

[更多關於 RLP 的資訊](/developers/docs/data-structures-and-encoding/rlp)

### 簡單序列化 {#simple-serialize}

簡單序列化 (SSZ) 因爲與默克爾化功能相容，是以太坊共識層主要序列化格式。

[更多關於 SSZ 的資訊](/developers/docs/data-structures-and-encoding/ssz)
