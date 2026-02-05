---
title: ERC-1155 多代幣標準
description: 了解 ERC-1155，這是一種多代幣標準，可在單一合約中結合同質化代幣和非同質化代幣。
lang: zh-tw
---

## 介紹 {#introduction}

用於多種代幣管理的合約標準介面 單一部署的合約可以包括同質化代幣、非同質化代幣或其他配置（例如半同質化代幣）的任意組合。

**多代幣標準是什麼意思？**

這個想法很簡單，旨在創建一個智慧型合約介面，可以表示和控制任意數量的同質化和非同質化代幣類型。 如此一來，ERC-1155 代幣可以執行與 [ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 代幣相同的功能，甚至可以同時執行兩者的功能。 它改進了 ERC-20 和 ERC-721 標準的功能，使其更有效率並修正了明顯的實作錯誤。

[EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中對 ERC-1155 代幣有完整說明。

## 先決條件 {#prerequisites}

為了更了解此頁面，建議您先閱讀有關[代幣標準](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 的內容。

## ERC-1155 函式和功能：{#body}

- [批次轉帳](#batch_transfers)：在單次呼叫中轉帳多個資產。
- [批次餘額](#batch_balance)：在單次呼叫中取得多個資產的餘額。
- [批次授權](#batch_approval)：將所有代幣授權給一個地址。
- [掛鉤](#receive_hook)：接收代幣掛鉤。
- [支援 NFT](#nft_support)：若供應量只有 1，則視為 NFT。
- [安全轉帳規則](#safe_transfer_rule)：一組用於安全轉帳的規則。

### 批次轉帳 {#batch-transfers}

批量傳送的工作原理與常規 ERC-20 傳送非常相似。 我們來看看標準的 ERC-20 `transferFrom` 函式：

```solidity
// ERC-20
function transferFrom(address from, address to, uint256 value) external returns (bool);

// ERC-1155
function safeBatchTransferFrom(
    address _from,
    address _to,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external;
```

ERC-1155 中唯一的區別是我們將值作爲陣列傳輸，同時也傳輸了 ids 陣列。 例如，給定 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，轉帳結果將是

1. 從 `_from` 將 100 個 ID 為 3 的代幣轉帳到 `_to`。
2. 從 `_from` 將 200 個 ID 為 6 的代幣轉帳到 `_to`。
3. 從 `_from` 將 5 個 ID 為 13 的代幣轉帳到 `_to`。

在 ERC-1155 中，我們只有 `transferFrom`，沒有 `transfer`。 若要像一般的 `transfer` 那樣使用，只需將來源地址設為呼叫此函式的地址。

### 批次餘額 {#batch-balance}

對應的 ERC-20 `balanceOf` 呼叫，同樣也具有支援批次處理的對應函式。 作爲對比，這是 ERC-20 的版本:

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

對於餘額調用來說更簡單，我們可以在一次調用中取得多個餘額。 我們傳輸所有者的陣列，然後是代幣 ids 的陣列。

例如，給定 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，傳回值會是

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 批次授權 {#batch-approval}

```solidity
// ERC-1155
function setApprovalForAll(
    address _operator,
    bool _approved
) external;

function isApprovedForAll(
    address _owner,
    address _operator
) external view returns (bool);
```

批准與 ERC-20 略有不同。 您可以透過 `setApprovalForAll` 將操作者設為已授權或未授權，而不是授權特定數量。

可以透過 `isApprovedForAll` 讀取目前的授權狀態。 如你所見，要么全部批准，要么不批准。 不能定義要批准代幣的數量，甚至代幣類型。

這是考慮到簡潔性而故意設計的。 你只能批准一個地址的所有代幣。

### 接收掛鉤 {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

因為支援 [EIP-165](https://eips.ethereum.org/EIPS/eip-165)，ERC-1155 僅支援智能合約的接收掛鉤。 鉤子函數必須傳回一個事先預先定義的 4 位元組值，這個值被指定為：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

當接收合約傳回此值時，表示合約知道如何處理 ERC-1155 代幣並接受轉帳。 太好了，代幣不會再卡在合約中了！

### 支援 NFT {#nft-support}

當供應量只有 1 時，該代幣本質上是非同質化代幣 (NFT)。 依照 ERC-721 標準，你可以定義一個元數據網址。 用戶端可以讀取和修改該 URL，請參閱[此處](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全轉帳規則 {#safe-transfer-rule}

在前面的解釋中，我們已經提到過一些安全轉帳規則。 現在我們來看看最重要的規則：

1. 呼叫者必須已獲授權，可代表 `_from` 地址花費代幣，或者呼叫者必須等於 `_from`。
2. 在以下情況下，轉帳呼叫將回退
   1. `_to` 地址為 0。
   2. `_ids` 的長度與 `_values` 的長度不同。
   3. `_ids` 中任何代幣持有者的餘額，低於 `_values` 中發送給接收者的對應數量。
   4. 出現任何其他錯誤。

_注意_：所有批次函式 (包含掛鉤) 也都存在非批次版本。 這樣做是為了提高燃料效率，考慮到只轉移一種資產可能仍然是最常用的方式。 簡潔起見，我們在這裡沒有介紹這些非批次的版本，包括安全轉帳規則。 名稱是相同的，只需移除 'Batch'。

## 延伸閱讀 {#further-reading}

- [EIP-1155：多代幣標準](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：OpenZeppelin 文件](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155：GitHub 儲存庫](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)
