---
title: "EIP-1271：簽署與驗證智能合約簽章"
description: 使用 EIP-1271 生成與驗證智能合約簽章的概覽。 我們也會逐步說明 Safe (前身為 Gnosis Safe) 中使用的 EIP-1271 實作，為智能合約開發者提供具體範例以供參考。
author: Nathan H. Leung
lang: zh-tw
tags: [ "eip-1271", "智能合約", "驗證", "簽署" ]
skill: intermediate
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 標準允許智能合約驗證簽章。

在本教學中，我們將概覽數位簽章、EIP-1271 的背景，以及 [Safe](https://safe.global/) (前身為 Gnosis Safe) 所使用的 EIP-1271 特定實作。 總而言之，本篇內容可作為您在自己的合約中實作 EIP-1271 的起點。

## 什麼是簽章？

在此背景下，簽章 (更準確地說，是「數位簽章」) 是一則訊息，加上某种證明，用以證明該訊息來自特定人士/傳送者/地址。

例如，數位簽章可能長這樣：

1. 訊息：「我想用我的以太坊錢包登入這個網站。」
2. 簽署者：我的地址是 `0x000…`
3. 證明：這是一些證明，證明我 (`0x000…`) 確實建立了這整則訊息 (這通常是某种加密的東西)。

請務必注意，數位簽章同時包含「訊息」與「簽章」。

為什麼？ 舉例來說，如果您給我一份合約簽署，然後我把簽章頁撕下來，只把我的簽章還給您，而沒有合約的其他部分，那麼這份合約將無效。

同樣地，如果沒有相關的訊息，數位簽章就沒有任何意義！

## EIP-1271 為何存在？

為了建立在以太坊區塊鏈上使用的數位簽章，您通常需要一個其他人不知道的秘密私密金鑰。 這就是為什麼您的簽章專屬於您 (沒有其他人能在不知道秘密金鑰的情況下建立相同的簽章)。

您的以太坊帳戶 (即您的外部擁有帳戶/EOA) 有一個與其關聯的私密金鑰，當網站或去中心化應用程式要求您簽章 (例如，「用以太坊登入」) 時，通常會使用此私密金鑰。

應用程式可以使用 ethers.js 等第三方庫來 [驗證您建立的簽章](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)，且 [無需知道您的私密金鑰](https://en.wikipedia.org/wiki/Public-key_cryptography)，並確信該簽章是由_您_所建立的。

> 事實上，由於 EOA 數位簽章使用公開金鑰密碼學，因此可以在**鏈外**生成與驗證！ 這就是無 Gas 的 DAO 投票的運作方式 — 不在鏈上提交投票，而是使用加密庫在鏈外建立和驗證數位簽章。

雖然 EOA 帳戶有私密金鑰，但智能合約帳戶沒有任何形式的私密或秘密金鑰 (因此「用以太坊登入」等功能無法原生支援智能合約帳戶)。

EIP-1271 旨在解決的問題是：如果智能合約沒有可以納入簽章的「秘密」，我們如何判斷智能合約簽章是否有效？

## EIP-1271 如何運作？

智能合約沒有可用於簽署訊息的私密金鑰。 那麼，我們如何判斷簽章是否真實？

嗯，一個想法是我們可以直接_詢問_智能合約簽章是否真實！

EIP-1271 的作用是將「詢問」智能合約特定簽章是否有效的這個想法標準化。

實作 EIP-1271 的合約必須有一個名為 `isValidSignature` 的函式，該函式接收一個訊息和一個簽章。 然後，合約可以執行一些驗證邏輯 (規範在此處並未強制要求任何具體內容)，然後傳回一個值，指出簽章是否有效。

如果 `isValidSignature` 傳回有效結果，這基本上就等於合約在說：「是的，我批准這個簽章 + 訊息！」

### 接口

以下是 EIP-1271 規範中的確切介面 (我們稍後會討論 `_hash` 參數，但現在，您可以將其視為正在驗證的訊息)：

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev 應傳回所提供的簽章對於所提供的哈希是否有效
   * @param _hash      待簽署資料的哈希
   * @param _signature 與 _hash 相關的簽章位元組陣列
   *
   * 函式通過時必須傳回 bytes4 魔術值 0x1626ba7e。
   * 不得修改狀態 (對於 solc < 0.5 使用 STATICCALL，對於 solc > 0.5 使用 view 修飾符)
   * 必須允許外部呼叫
   */
  function isValidSignature(
    bytes32 _hash,
    bytes memory _signature)
    public
    view
    returns (bytes4 magicValue);
}
```

## EIP-1271 實作範例：Safe

合約可以透過多種方式實作 `isValidSignature` — 該規範對於確切的實作方式並未多加說明。

一個實作 EIP-1271 的知名合約是 Safe (前身為 Gnosis Safe)。

在 Safe 的程式碼中，`isValidSignature` 的 [實作方式](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol) 讓簽章可以透過 [兩種方式](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support) 建立與驗證：

1. 鏈上訊息
   1. 建立：Safe 持有者建立一筆新的 Safe 交易來「簽署」一則訊息，並將該訊息作為資料傳入交易中。 一旦有足夠的持有者簽署交易，達到多重簽章門檻，交易就會被廣播並執行。 在交易中，有一個名為 (`signMessage(bytes calldata _data)`) 的 Safe 函式，它會將訊息新增到「已批准」的訊息清單中。
   2. 驗證：在 Safe 合約上呼叫 `isValidSignature`，並將要驗證的訊息作為訊息參數傳入，同時為簽章參數傳入 [一個空值](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32) (即 `0x`)。 Safe 將會看到簽章參數為空，於是便不會以加密方式驗證簽章，而是會直接檢查該訊息是否在「已批准」的訊息清單上。
2. 鏈外訊息：
   1. 建立：Safe 持有者在鏈外建立一則訊息，然後讓其他 Safe 持有者各自簽署該訊息，直到簽章數量足以超過多重簽章批准門檻為止。
   2. 驗證：呼叫 `isValidSignature`。 在訊息參數中，傳入要驗證的訊息。 在簽章參數中，將每個 Safe 持有者的個人簽章一個接一個地串接起來傳入。 Safe 將會檢查是否有足夠的簽章來滿足門檻，**並且**每個簽章都有效。 如果是，它將傳回一個值，表示簽章驗證成功。

## `_hash` 參數到底是什麼？ 為什麼不傳遞整個訊息？

您可能已經注意到，[EIP-1271 介面](https://eips.ethereum.org/EIPS/eip-1271) 中的 `isValidSignature` 函式並非直接接收訊息本身，而是接收一個 `_hash` 參數。 這表示我們不是將完整的任意長度訊息傳遞給 `isValidSignature`，而是傳遞該訊息的 32 位元組哈希 (通常是 keccak256)。

calldata 的每個位元組 — 也就是傳遞給智能合約函式的函式參數資料 — [會花費 16 gas (如果為零位元組則為 4 gas)](https://eips.ethereum.org/EIPS/eip-2028)，因此如果訊息很長，這樣可以節省大量 gas。

### 先前的 EIP-1271 規範

現存的一些 EIP-1271 規範中，`isValidSignature` 函式的第一個參數類型為 `bytes` (任意長度，而非固定長度的 `bytes32`)，且參數名稱為 `message`。 這是 EIP-1271 標準的 [舊版](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206)。

## 應如何在自己的合約中實作 EIP-1271？

規範在此處非常有彈性。 Safe 的實作有一些不錯的想法：

- 您可以將來自合約「持有者」的 EOA 簽章視為有效。
- 您可以儲存一份已批准的訊息清單，並只將這些訊息視為有效。

最終，這取決於您這位合約開發者！

## 結論

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 是一個多功能的標準，允許智能合約驗證簽章。 它為智能合約開啟了大門，讓它們的行為更像 EOA — 例如，為「用以太坊登入」提供了一種與智能合約搭配運作的方式 — 並且可以透過多種方式實作 (Safe 有一個值得考慮的、非同小可且有趣的實作)。
