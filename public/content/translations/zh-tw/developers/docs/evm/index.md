---
title: "以太坊虛擬機 (EVM)"
description: "以太坊虛擬機及其與網路狀態、交易、智慧型合約之間關係之介紹。"
lang: zh-tw
---

以太坊虛擬機 (EVM) 是去中心化的虛擬環境，可以跨所有以太坊節點一致且安全地執行程式碼。 節點運行 EVM 來執行智能合約，使用「[gas](/developers/docs/gas/)」來衡量[運算](/developers/docs/evm/opcodes/)所需的計算量，確保資源有效分配和網路安全。

## 先決條件 {#prerequisites}

若要了解 EVM，必須對電腦科學中的常用術語，例如 [bytes](https://wikipedia.org/wiki/Byte)、[memory](https://wikipedia.org/wiki/Computer_memory) 和 [stack](https://wikipedia.org/wiki/Stack_\(abstract_data_type\)) 等有基本認識。 熟悉[哈希函數](https://wikipedia.org/wiki/Cryptographic_hash_function)和[默克爾樹](https://wikipedia.org/wiki/Merkle_tree)等密碼學／區塊鏈概念也會很有幫助。

## 從帳本到狀態機 {#from-ledger-to-state-machine}

我們經常使用「分佈式帳本」這一比喻來描述比特幣一類的區塊鏈，區塊鏈透過使用一些基礎加密工具來支持去中心化貨幣。 帳本維護著活動記錄，並且必須遵守一套管控帳本修改相關操作的規則。 例如，比特幣地址無法花費超出其先前接受數量之比特幣。 此類規則構成比特幣及其他區塊鏈上所有交易的基礎。

雖然以太坊有自己的原生加密貨幣 (以太幣)，遵循著幾乎完全相同的直觀規則，但它也啟用了一項更強大的功能：[智能合約](/developers/docs/smart-contracts/)。 對於此更為複雜的功能，需要一種更貼切之比喻來形容以太坊。 以太坊不是分散式帳本，而是分散式[狀態機](https://wikipedia.org/wiki/Finite-state_machine)。 以太坊的狀態是一個龐大的資料結構，不僅保存了所有帳戶和餘額，還保存了一個「_機器狀態_」。這個狀態可以根據預先定義的一組規則，在區塊之間變更，並且可以執行任意機器程式碼。 在區塊之間變更狀態的具體規則由以太坊虛擬機定義。

![一張顯示 EVM 構成的圖表](./evm.png)
_圖表改編自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## 以太坊狀態轉換函數 {#the-ethereum-state-transition-function}

以太坊虛擬機的運行類似於數學函式：提供一個輸入，就會生成確定的輸出。 因此，將以太坊更正式地描述為具有**狀態轉換函數**會很有幫助：

```
Y(S, T)= S'
```

給定一個舊的有效狀態 `(S)` 和一組新的有效交易 `(T)`，以太坊狀態轉換函數 `Y(S, T)` 會產生一個新的有效輸出狀態 `S'`。

### 狀態 {#state}

在以太坊的脈絡中，狀態是一個龐大的資料結構，稱為[改良式 Merkle Patricia 樹](/developers/docs/data-structures-and-encoding/patricia-merkle-trie/)，它將所有[帳戶](/developers/docs/accounts/)以哈希連結，並可歸納為儲存在區塊鏈上的單一根哈希。

### 交易 {#transactions}

交易是帳戶發出的帶密碼學簽章的指令。 交易主要有兩種類型：一種交易發起訊息調用，一種啟動合約建立。

創建合約會產生一個新的合約帳戶，其中包含已編譯的[智能合約](/developers/docs/smart-contracts/anatomy/)位元組碼。 當其他帳戶對該合約進行訊息調用時，將執行該合約的位元組碼。

## EVM 指令 {#evm-instructions}

EVM 作為[堆疊機](https://wikipedia.org/wiki/Stack_machine)執行，深度為 1024 個項目。 每個專案均為 256 位元的字，選擇它是為了方便用於 256 位元加密（例如，Keccak-256 雜湊或 secp256k1 簽章）。

在執行期間，EVM 會維護一個暫時性的「_記憶體_」（一個字組定址的位元組陣列），此記憶體在不同交易之間不會留存。

### 暫時性儲存

暫時性儲存是每個交易的鍵值儲存庫，可透過 `TSTORE` 和 `TLOAD` 操作碼存取。 它會在同個交易內的所有內部呼叫中持續存在，但在交易結束時會被清除。 與記憶體不同，暫時性儲存被塑模為 EVM 狀態的一部分，而非執行框架，但它不會被提交到全域狀態。 暫時性儲存可以在交易期間，讓內部呼叫以符合 gas 效益的方式共享暫時狀態。

### 儲存

合約包含一個 Merkle Patricia _儲存_樹（一個字組定址的字組陣列），與相關帳戶關聯，並且是全域狀態的一部分。 這種永久性儲存與暫時性儲存不同，暫時性儲存僅在單一交易期間可用，且不構成帳戶永久性儲存樹的一部分。

### 作業碼

已編譯的智能合約位元組碼會以多個 EVM [操作碼](/developers/docs/evm/opcodes)的形式執行，這些操作碼會執行標準的堆疊操作，例如 `XOR`、`AND`、`ADD`、`SUB` 等。 EVM 也實作了一些區塊鏈專用的堆疊操作，例如 `ADDRESS`、`BALANCE`、`BLOCKHASH` 等。 操作碼集還包括 `TSTORE` 和 `TLOAD`，可用來存取暫時性儲存。

![顯示 EVM 操作中何處需要 gas 的圖表](../gas/gas.png)
_圖表改編自 [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## EVM 實作 {#evm-implementations}

所有以太坊虛擬機實作均須遵照以太坊黃皮書中規定的相關規範。

在以太坊十年的歷史中，EVM 經歷了數次修訂，並且有以各種程式語言撰寫的數種 EVM 實作版本。

[以太坊執行用戶端](/developers/docs/nodes-and-clients/#execution-clients)包含一個 EVM 實作。 此外，還有一些獨立的實作，包括：

- [Py-EVM](https://github.com/ethereum/py-evm) - _Python_
- [evmone](https://github.com/ethereum/evmone) - _C++_
- [ethereumjs-vm](https://github.com/ethereumjs/ethereumjs-vm) - _JavaScript_
- [revm](https://github.com/bluealloy/revm) - _Rust_

## 延伸閱讀 {#further-reading}

- [以太坊黃皮書](https://ethereum.github.io/yellowpaper/paper.pdf)
- [Jellopaper 又名 KEVM：K 框架中的 EVM 語意學](https://jellopaper.org/)
- [米色論文](https://github.com/chronaeon/beigepaper)
- [以太坊虛擬機操作碼](https://www.ethervm.io/)
- [以太坊虛擬機操作碼互動式參考](https://www.evm.codes/)
- [Solidity 文件中的簡短介紹](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#index-6)
- [精通以太坊 - 以太坊虛擬機](https://github.com/ethereumbook/ethereumbook/blob/openedition/13evm.asciidoc)

## 相關主題 {#related-topics}

- [Gas](/developers/docs/gas/)
