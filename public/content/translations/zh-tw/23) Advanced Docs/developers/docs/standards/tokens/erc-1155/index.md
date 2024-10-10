---
title: ERC-1155 多代幣標準
description:
lang: zh-tw
---

## 簡介 {#introduction}

用於多種代幣管理的合約標準介面 單一部署的合約可以包括同質化代幣、非同質化代幣或其他配置（例如半同質化代幣）的任意組合。

**多代幣標準是什麼意思？**

這個想法很簡單，旨在創建一個智慧型合約介面，可以表示和控制任意數量的同質化和非同質化代幣類型。 這樣，ERC-1155 代幣就可以實現與 [ERC-20](/developers/docs/standards/tokens/erc-20/)和 [ERC-721](/developers/docs/standards/tokens/erc-721/)代幣相同的功能，甚至可以同時實現這兩種功能。 它改進了 ERC-20 和 ERC-721 標準的功能，使其更有效率並修正了明顯的實作錯誤。

ERC-1155 代幣在 [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中有完整描述。

## 基本資訊 {#prerequisites}

為了更好地理解本頁，我們建議你先閱讀[代幣標準](/developers/docs/standards/tokens/)，[ERC-20](/developers/docs/standards/tokens/erc-20/)和[ERC-721](/developers/docs/standards/tokens/erc-721/)。

## ERC-1155 的函式和功能： {#body}

- [批量傳送](#batch_transfers)：在一次調用內傳送多種資產。
- [批量餘額](#batch_balance)：在一次調用內取得多種資產的餘額。
- [批量允許](#batch_approval)：允許某個地址的所有代幣。
- [Hook](#receive_hook)：接收代幣的鉤子函數。
- [非同質化代幣支援](#nft_support)：如果供應量只有 1，則視為非同質化代幣。
- [安全轉帳規則](#safe_transfer_rule)：安全轉帳規則集。

### 批量傳送 {#batch-transfers}

批量傳送的工作原理與常規 ERC-20 傳送非常相似。 讓我們來看看常規的 ERC-20 `transferFrom` 函數：

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

ERC-1155 中唯一的區別是我們將值作爲陣列傳輸，同時也傳輸了 ids 陣列。 例如，給定 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，傳送結果將會是

1. 將 100 個 ID 為 3 的代幣從 `_from` 傳送到 `_to`。
2. 將 200 個 ID 為 6 的代幣從 `_from` 傳送到 `_to`。
3. 將 5 個 ID 為 13 的代幣從 `_from` 傳送到 `_to`。

在 ERC-1155 中，我們只有 `transferFrom`，沒有 `transsfer`。 爲了像常規的 `transfer` 一樣使用它，只需要將 from 地址設置爲調用該函數的地址。

### 批量餘額 {#batch-balance}

對應的 ERC-20 `balanceOf` 呼叫同樣具有支援批次的對應函數。 作爲對比，這是 ERC-20 的版本:

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

例如，給定 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，傳回值將為

```solidity
[
    balanceOf(0xbeef...),
    balanceOf(0x1337...),
    balanceOf(0x1111...)
]
```

### 批量審批 {#batch-approval}

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

批准與 ERC-20 略有不同。 與批准特定金額不同，你透過 `setApprovalForAll` 函數將操作者設置爲已批准或未批准。

查看目前的審批狀態可以透過 `isApprovedForAll` 完成。 如你所見，要么全部批准，要么不批准。 不能定義要批准代幣的數量，甚至代幣類型。

這是考慮到簡潔性而故意設計的。 你只能批准一個地址的所有代幣。

### 接收鉤子 {#receive-hook}

```solidity
function onERC1155BatchReceived(
    address _operator,
    address _from,
    uint256[] calldata _ids,
    uint256[] calldata _values,
    bytes calldata _data
) external returns(bytes4);
```

基於 [EIP-165](https://eips.ethereum.org/EIPS/eip-165) 的協定支持，ERC-1155 只支援智慧合約的接收鉤子函數。 鉤子函數必須傳回一個事先預先定義的 4 位元組值，這個值被指定為：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

當接收合約傳回此值時，表示合約知道如何處理 ERC-1155 代幣並接受轉帳。 太好了，代幣不會再卡在合約中了！

### 支援非同質化代幣 {#nft-support}

當供應量只有 1 時，該代幣本質上是非同質化代幣 (NFT)。 依照 ERC-721 標準，你可以定義一個元數據網址。 用戶端可以讀取和修改該網址，請參閱[此處](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全轉帳規則 {#safe-transfer-rule}

在前面的解釋中，我們已經提到過一些安全轉帳規則。 現在我們來看看最重要的規則：

1. 呼叫者必須獲得批准才能從 `_from` 的帳戶地址消費代幣，或者呼叫者帳戶地址必須與 `_from` 的帳戶地址相同。
2. 在以下情況下，轉帳呼叫將回退
   1. `_to` 地址為 0。
   2. `_ids` 的長度與 `_values` 的長度不同。
   3. `_ids` 中代幣持有者的任何餘額都低於發送給接收者的對應 `_value` 金額。
   4. 出現任何其他錯誤。

_注意_：包括鉤子在內的所有批次函數也均以非批次的版本存在。 這樣做是為了提高燃料效率，考慮到只轉移一種資產可能仍然是最常用的方式。 簡潔起見，我們在這裡沒有介紹這些非批次的版本，包括安全轉帳規則。 名稱是相同的，只需移除 'Batch'。

## 衍生閱讀 {#further-reading}

- [EIP-1155：多代幣標準](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：Openzeppelin 文檔](https://docs.openzeppelin.com/contracts/3.x/erc1155)
- [ERC-1155: GitHub Repo](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://docs.alchemy.com/alchemy/enhanced-apis/nft-api)
