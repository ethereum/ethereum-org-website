---
title: 資料結構和編碼
description: 以太坊基本資料結構概覽。
lang: zh-tw
sidebarDepth: 2
---

以太坊會建立、儲存和傳送大量資料。 該資料必須使用標準化格式和節省記憶體的方式，以便任何人都能夠在相對一般的消費級硬體上[運行節點](/run-a-node/)。 爲了實現這一點，以太坊堆棧中使用了一些特定的資料結構。

## 前置要求 {#prerequisites}

你應該對以太坊和[用戶端軟體](/developers/docs/nodes-and-clients/)的基本原理已經有所了解。 熟悉網路層和[以太坊白皮書](/whitepaper/)會更加好。

## 資料結構 {#data-structures}

### 帕特里夏默克爾樹 {#patricia-merkle-tries}

帕特里夏默克爾樹是一種資料結構，將鍵值對編碼為具有確定性且經過加密驗證的樹。 這些資料結構被廣泛用於以太坊執行層。

[有關帕特里夏默克爾樹的更多資訊](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)

### 遞迴長度前置詞 {#recursive-length-prefix}

遞迴長度前置詞 (RLP) 是一種在以太坊執行層中廣泛使用的序列化方法。

[有關遞迴長度前置詞的更多資訊](/developers/docs/data-structures-and-encoding/rlp)

### 簡易序列化 {#simple-serialize}

簡單序列化 (SSZ) 因爲與默克爾化功能相容，是以太坊共識層主要序列化格式。

[有關簡易序列化的更多資訊](/developers/docs/data-structures-and-encoding/ssz)
