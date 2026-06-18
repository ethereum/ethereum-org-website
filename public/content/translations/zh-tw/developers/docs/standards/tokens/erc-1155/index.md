---
title: ERC-1155 多代幣標準
description: 了解 ERC-1155，這是一種在單一合約中結合了同質化與非同質化代幣的多代幣標準。
lang: zh-tw
---

## 簡介 {#introduction}

管理多種代幣類型的合約標準介面。單一已部署的合約可以包含同質化代幣、非同質化代幣或其他配置（例如半同質化代幣）的任何組合。

**多代幣標準是什麼意思？**

這個概念很簡單，旨在建立一個可以代表並控制任意數量的同質化與非同質化代幣類型的智能合約介面。透過這種方式，ERC-1155 代幣可以執行與 [ERC-20](/developers/docs/standards/tokens/erc-20/) 和 [ERC-721](/developers/docs/standards/tokens/erc-721/) 代幣相同的功能，甚至能同時具備兩者的功能。它改善了 ERC-20 和 ERC-721 標準的功能，使其更有效率並修正了明顯的實作錯誤。

ERC-1155 代幣在 [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) 中有完整的描述。

## 先決條件 {#prerequisites}

為了更了解本頁面，我們建議你先閱讀[代幣標準](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 以及 [ERC-721](/developers/docs/standards/tokens/erc-721/)。

## ERC-1155 功能與特色： {#body}

- [批次轉帳](#batch-transfers)：在單次呼叫中轉帳多個資產。
- [批次餘額](#batch-balance)：在單次呼叫中取得多個資產的餘額。
- [批次授權](#batch-approval)：將所有代幣授權給一個地址。
- [掛鉤 (Hooks)](#receive-hook)：接收代幣掛鉤。
- [NFT 支援](#nft-support)：如果供應量只有 1，則將其視為非同質化代幣 (NFT)。
- [安全轉帳規則](#safe-transfer-rule)：安全轉帳的規則集合。

### 批次轉帳 {#batch-transfers}

批次轉帳的運作方式與一般的 ERC-20 轉帳非常相似。讓我們來看看一般的 ERC-20 `transferFrom` 函式：

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

ERC-1155 唯一的差別在於我們將值作為陣列傳遞，並且也傳遞一個 ID 陣列。例如，給定 `ids=[3, 6, 13]` 和 `values=[100, 200, 5]`，結果的轉帳將會是：

1. 將 100 個 ID 為 3 的代幣從 `_from` 轉帳到 `_to`。
2. 將 200 個 ID 為 6 的代幣從 `_from` 轉帳到 `_to`。
3. 將 5 個 ID 為 13 的代幣從 `_from` 轉帳到 `_to`。

在 ERC-1155 中，我們只有 `transferFrom`，沒有 `transfer`。若要像一般的 `transfer` 那樣使用它，只需將發送方地址設定為呼叫該函式的地址即可。

### 批次餘額 {#batch-balance}

相應的 ERC-20 `balanceOf` 呼叫同樣具有支援批次處理的對應函式。作為提醒，這是 ERC-20 版本：

```solidity
// ERC-20
function balanceOf(address owner) external view returns (uint256);

// ERC-1155
function balanceOfBatch(
    address[] calldata _owners,
    uint256[] calldata _ids
) external view returns (uint256[] memory);
```

對於餘額呼叫來說甚至更簡單，我們可以在單次呼叫中擷取多個餘額。我們傳遞擁有者陣列，接著傳遞代幣 ID 陣列。

例如，給定 `_ids=[3, 6, 13]` 和 `_owners=[0xbeef..., 0x1337..., 0x1111...]`，回傳值將會是：

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

授權與 ERC-20 略有不同。你不是授權特定數量，而是透過 `setApprovalForAll` 將操作者設定為已授權或未授權。

可以透過 `isApprovedForAll` 讀取目前狀態。如你所見，這是一個全有或全無的操作。你無法定義要授權多少代幣，甚至無法定義哪個代幣類別。

這是為了保持簡單而刻意設計的。你只能將所有東西授權給一個地址。

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

基於對 [EIP-165](https://eips.ethereum.org/EIPS/eip-165) 的支援，ERC-1155 僅支援智能合約的接收掛鉤。掛鉤函式必須回傳一個預先定義的魔術 bytes4 值，其給定如下：

```solidity
bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))
```

當接收合約回傳此值時，即假設該合約接受轉帳並知道如何處理 ERC-1155 代幣。太棒了，合約中不再有卡住的代幣！

### NFT 支援 {#nft-support}

當供應量只有一個時，該代幣本質上就是一個非同質化代幣 (NFT)。如同 ERC-721 的標準，你可以定義一個中繼資料 URL。該 URL 可以被客戶端讀取和修改，請參閱[這裡](https://eips.ethereum.org/EIPS/eip-1155#metadata)。

### 安全轉帳規則 {#safe-transfer-rule}

在前面的解釋中，我們已經提到了一些安全轉帳規則。但讓我們來看看其中最重要的規則：

1. 呼叫者必須被授權花費 `_from` 地址的代幣，或者呼叫者必須等於 `_from`。
2. 轉帳呼叫必須回滾，如果：
   1. `_to` 地址為 0。
   2. `_ids` 的長度與 `_values` 的長度不同。
   3. 持有者在 `_ids` 中任何代幣的餘額低於發送給接收者的 `_values` 中相應的數量。
   4. 發生任何其他錯誤。

_注意_：所有批次函式（包含掛鉤）也都存在非批次版本。這是為了燃料效率而設計的，考慮到只轉帳一個資產可能仍然是最常用的方式。為了簡化解釋，我們省略了它們，包含安全轉帳規則。名稱是相同的，只需移除「Batch」即可。

## 延伸閱讀 {#further-reading}

- [EIP-1155：多代幣標準](https://eips.ethereum.org/EIPS/eip-1155)
- [ERC-1155：歐本齊柏林文件](https://docs.openzeppelin.com/contracts/5.x/erc1155)
- [ERC-1155：GitHub 儲存庫](https://github.com/enjin/erc-1155)
- [Alchemy NFT API](https://www.alchemy.com/docs/reference/nft-api-quickstart)