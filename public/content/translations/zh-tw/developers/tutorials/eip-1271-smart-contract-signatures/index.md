---
title: "EIP-1271：簽署與驗證智能合約簽章"
description: "使用 EIP-1271 產生與驗證智能合約簽章的概述。我們還將探討 Safe（前身為 Gnosis Safe）中使用的 EIP-1271 實作，為智能合約開發人員提供一個具體的建構範例。"
author: "內森·H·梁"
lang: zh-tw
tags: ["eip-1271", "智能合約", "驗證", "簽署"]
skill: intermediate
breadcrumb: "EIP-1271 簽章"
published: 2023-01-12
---

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 標準允許智能合約驗證簽章。

在本教學中，我們將概述數位簽章、EIP-1271 的背景，以及 [Safe](https://safe.global/)（前身為 Gnosis Safe）所使用的特定 EIP-1271 實作。總而言之，這可以作為在您自己的合約中實作 EIP-1271 的起點。

## 什麼是簽章？ {#what-is-a-signature}

在此語境下，簽章（更準確地說是「數位簽章」）是一則訊息加上某種證明，用以證明該訊息來自特定的人員／發送者／地址。

例如，數位簽章可能看起來像這樣：

1. 訊息：「我想用我的以太坊錢包登入這個網站。」
2. 簽署者：我的地址是 `0x000…`
3. 證明：這裡有一些證明，證明我（`0x000…`）確實建立了這整則訊息（這通常是某種密碼學證明）。

值得注意的是，數位簽章同時包含「訊息」和「簽章」。

為什麼？舉例來說，如果您給我一份合約要我簽署，然後我把簽名頁剪下來，只把我的簽名還給您，而沒有合約的其餘部分，那麼這份合約將會無效。

同理，如果沒有關聯的訊息，數位簽章就沒有任何意義！

## 為什麼會有 EIP-1271？ {#why-does-eip-1271-exist}

為了建立可用於基於以太坊區塊鏈的數位簽章，您通常需要一把無人知曉的秘密私鑰。這正是讓您的簽章專屬於您的原因（如果不知道這把秘密金鑰，沒有人能建立相同的簽章）。

您的以太坊帳戶（即您的外部擁有帳戶／EOA）關聯著一把私鑰，當網站或去中心化應用程式 (dapp) 要求您提供簽章時（例如「使用以太坊登入」），通常就是使用這把私鑰。

應用程式可以使用像 ethers.js 這樣的第三方函式庫來[驗證您建立的簽章](https://www.alchemy.com/docs/how-to-verify-a-message-signature-on-ethereum)，而[無需知道您的私鑰](https://en.wikipedia.org/wiki/Public-key_cryptography)，並確信_您_就是建立該簽章的人。

> 事實上，因為 EOA 數位簽章使用公開金鑰密碼學，所以它們可以在**鏈下**產生和驗證！這就是免燃料 (gasless) DAO 投票的運作方式——不需要在鏈上提交投票，而是可以使用密碼學函式庫在鏈下建立和驗證數位簽章。

雖然 EOA 帳戶擁有私鑰，但智能合約帳戶沒有任何形式的私鑰或秘密金鑰（因此「使用以太坊登入」等功能無法原生支援智能合約帳戶）。

EIP-1271 旨在解決的問題是：如果智能合約沒有可以納入簽章的「秘密」，我們該如何判斷智能合約簽章是否有效？

## EIP-1271 是如何運作的？ {#how-does-eip-1271-work}

智能合約沒有可用於簽署訊息的私鑰。那麼我們該如何判斷簽章是否真實？

嗯，一個想法是我們可以直接_詢問_智能合約該簽章是否真實！

EIP-1271 所做的就是將這種「詢問」智能合約給定簽章是否有效的想法標準化。

實作 EIP-1271 的合約必須有一個名為 `isValidSignature` 的函式，該函式接收一則訊息和一個簽章。然後，合約可以執行一些驗證邏輯（規範在此並未強制規定任何具體內容），並回傳一個值來指示簽章是否有效。

如果 `isValidSignature` 回傳有效結果，這幾乎等同於合約在說：「是的，我授權這個簽章 + 訊息！」

### 介面 {#interface}

以下是 EIP-1271 規範中確切的介面（我們將在下面討論 `_hash` 參數，但現在，請將其視為正在被驗證的訊息）：

```jsx
pragma solidity ^0.5.0;

contract ERC1271 {

  // bytes4(keccak256("isValidSignature(bytes32,bytes)")
  bytes4 constant internal MAGICVALUE = 0x1626ba7e;

  /**
   * @dev 應回傳所提供的簽章對於所提供的雜湊是否有效
   * @param _hash      要簽署的資料的雜湊
   * @param _signature 與 _hash 關聯的簽章位元組陣列
   *
   * 當函式通過時，必須回傳 bytes4 魔術值 0x1626ba7e。
   * 絕對不能修改狀態（對於 solc < 0.5 使用 STATICCALL，對於 solc > 0.5 使用 view 修飾符）
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

## EIP-1271 實作範例：Safe {#example-eip-1271-implementation-safe}

合約可以透過多種方式實作 `isValidSignature`——規範並未對確切的實作方式多加著墨。

一個實作了 EIP-1271 的著名合約是 Safe（前身為 Gnosis Safe）。

在 Safe 的程式碼中，`isValidSignature` [的實作方式](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol)使得簽章可以透過[兩種方式](https://ethereum.stackexchange.com/questions/122635/signing-messages-as-a-gnosis-safe-eip1271-support)建立和驗證：

1. 鏈上訊息
   1. 建立：Safe 擁有者建立一筆新的 Safe 交易來「簽署」一則訊息，並將該訊息作為資料傳遞到交易中。一旦有足夠的擁有者簽署交易以達到多方簽名門檻，交易就會被廣播並執行。在交易中，有一個名為 (`signMessage(bytes calldata _data)`) 的 Safe 函式，它會將該訊息新增到「已授權」訊息清單中。
   2. 驗證：在 Safe 合約上呼叫 `isValidSignature`，並傳入要驗證的訊息作為訊息參數，以及[簽章參數的空值](https://github.com/safe-global/safe-contracts/blob/main/contracts/handler/CompatibilityFallbackHandler.sol#L32)（即 `0x`）。Safe 會看到簽章參數為空，因此不會以密碼學方式驗證簽章，而是知道直接去檢查該訊息是否在「已授權」訊息清單中。
2. 鏈下訊息：
   1. 建立：Safe 擁有者在鏈下建立一則訊息，然後讓其他 Safe 擁有者各自單獨簽署該訊息，直到有足夠的簽章超過多方簽名授權門檻。
   2. 驗證：呼叫 `isValidSignature`。在訊息參數中，傳入要驗證的訊息。在簽章參數中，傳入每個 Safe 擁有者的個別簽章，將它們首尾相連串接在一起。Safe 將檢查是否有足夠的簽章達到門檻，**並且**每個簽章都是有效的。如果是，它將回傳一個指示簽章驗證成功的值。

## `_hash` 參數究竟是什麼？為什麼不傳遞整則訊息？ {#what-exactly-is-the-hash-parameter-why-not-pass-the-whole-message}

您可能已經注意到，[EIP-1271 介面](https://eips.ethereum.org/EIPS/eip-1271)中的 `isValidSignature` 函式並不接收訊息本身，而是接收一個 `_hash` 參數。這意味著我們不是將任意長度的完整訊息傳遞給 `isValidSignature`，而是傳遞該訊息的 32 位元組雜湊值（通常是 keccak256）。

呼叫資料（即傳遞給智能合約函式的函式參數資料）的每個位元組[花費 16 單位燃料（如果為零位元組則為 4 單位燃料）](https://eips.ethereum.org/EIPS/eip-2028)，因此如果訊息很長，這可以節省大量的燃料。

### 以前的 EIP-1271 規範 {#previous-eip-1271-specifications}

在實際應用中，有些 EIP-1271 規範的 `isValidSignature` 函式，其第一個參數的型別為 `bytes`（任意長度，而不是固定長度的 `bytes32`），且參數名稱為 `message`。這是 EIP-1271 標準的[較舊版本](https://github.com/safe-global/safe-contracts/issues/391#issuecomment-1075427206)。

## 我該如何在自己的合約中實作 EIP-1271？ {#how-should-eip-1271-be-implemented-in-my-own-contracts}

規範在這裡非常開放。Safe 的實作提供了一些好主意：

- 您可以將來自合約「擁有者」的 EOA 簽章視為有效。
- 您可以儲存一份已授權訊息的清單，並僅將這些訊息視為有效。

最終，這取決於身為合約開發人員的您！

## 結論 {#conclusion}

[EIP-1271](https://eips.ethereum.org/EIPS/eip-1271) 是一個多功能的標準，允許智能合約驗證簽章。它為智能合約的行為更像 EOA 敞開了大門——例如，提供了一種讓「使用以太坊登入」能與智能合約配合運作的方法——而且它可以透過多種方式實作（Safe 有一個不簡單且有趣的實作值得參考）。