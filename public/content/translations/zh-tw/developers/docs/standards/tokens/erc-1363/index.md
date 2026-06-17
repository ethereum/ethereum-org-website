---
title: ERC-1363 可支付代幣標準
description: ERC-1363 是 ERC-20 代幣的擴充介面，支援在單筆交易中，於轉帳後在接收方合約上執行自訂邏輯，或在授權後於花費方合約上執行自訂邏輯。
lang: zh-tw
---

## 簡介 {#introduction}

### 什麼是 ERC-1363？ {#what-is-erc1363}

ERC-1363 是 ERC-20 代幣的擴充介面，支援在單筆交易中，於轉帳後在接收方合約上執行自訂邏輯，或在授權後於花費方合約上執行自訂邏輯。

### 與 ERC-20 的差異 {#erc20-differences}

標準的 ERC-20 操作（如 `transfer`、`transferFrom` 和 `approve`）不允許在沒有獨立交易的情況下，於接收方或花費方合約上執行程式碼。
這增加了使用者介面開發的複雜性，並在採用上產生摩擦，因為使用者必須等待第一筆交易執行完畢後，才能送出第二筆交易。
他們還必須支付兩次燃料費用。

ERC-1363 讓同質化代幣能夠更輕鬆地執行動作，且無需使用任何鏈下監聽器即可運作。
它允許在單筆交易中，於轉帳或授權後，對接收方或花費方合約進行回呼 (callback)。

## 先決條件 {#prerequisites}

為了更了解本頁面，我們建議您先閱讀以下內容：

- [代幣標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 內文 {#body}

ERC-1363 為 ERC-20 代幣引入了標準 API，以便在 `transfer`、`transferFrom` 或 `approve` 之後與智能合約進行互動。

此標準提供了轉帳代幣的基本功能，並允許代幣被授權以便由另一個鏈上第三方花費，然後在接收方或花費方合約上進行回呼。

有許多關於可接受 ERC-20 回呼的智能合約的提議用途。

例如：

- **群眾募資**：發送代幣會觸發即時的獎勵分配。
- **服務**：付款可一步到位地啟用服務存取權限。
- **發票**：代幣會自動結算發票。
- **訂閱**：授權年費會在第一個月的付款中啟用訂閱。

基於這些原因，它最初被命名為 **「可支付代幣 (Payable Token)」**。

回呼行為進一步擴展了其效用，實現了無縫互動，例如：

- **質押**：轉帳的代幣會觸發在質押合約中的自動鎖定。
- **投票**：接收到的代幣會在治理系統中登記投票。
- **兌換**：代幣授權可一步到位地啟用兌換邏輯。

在所有需要於轉帳或收到授權後執行回呼的情況下，ERC-1363 代幣可用於特定的公用程式。
ERC-1363 也可用於透過驗證接收方處理代幣的能力，來避免代幣遺失或在智能合約中被鎖定。

與其他 ERC-20 擴充提案不同，ERC-1363 不會覆寫 ERC-20 的 `transfer` 和 `transferFrom` 方法，並定義了要實作的介面 ID，以維持與 ERC-20 的向下相容性。

摘自 [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363)：

### 方法 {#methods}

實作 ERC-1363 標準的智能合約**必須**實作 `ERC1363` 介面中的所有函式，以及 `ERC20` 和 `ERC165` 介面。

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 代幣的擴展介面，支援在單筆交易中，於 `transfer` 或 `transferFrom` 之後在接收者合約上執行程式碼，或在 `approve` 之後在花費者合約上執行程式碼。
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * NOTE: 此介面的 ERC-165 識別碼為 0xb0202a11。
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 將 `value` 數量的代幣從呼叫者的帳戶轉移至 `to`
   * 然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param to 代幣被轉帳到的地址。
   * @param value 要轉帳的代幣數量。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 將 `value` 數量的代幣從呼叫者的帳戶轉移至 `to`
   * 然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param to 代幣被轉帳到的地址。
   * @param value 要轉帳的代幣數量。
   * @param data 沒有指定格式的附加資料，在呼叫 `to` 時發送。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 使用授權機制將 `value` 數量的代幣從 `from` 轉移至 `to`
   * 然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param from 發送代幣的來源地址。
   * @param to 代幣被轉帳到的地址。
   * @param value 要轉帳的代幣數量。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev 使用授權機制將 `value` 數量的代幣從 `from` 轉移至 `to`
   * 然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param from 發送代幣的來源地址。
   * @param to 代幣被轉帳到的地址。
   * @param value 要轉帳的代幣數量。
   * @param data 沒有指定格式的附加資料，在呼叫 `to` 時發送。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 將 `value` 數量的代幣設定為 `spender` 對呼叫者代幣的授權額度
   * 然後在 `spender` 上呼叫 `ERC1363Spender::onApprovalReceived`。
   * @param spender 將花費資金的地址。
   * @param value 要花費的代幣數量。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 將 `value` 數量的代幣設定為 `spender` 對呼叫者代幣的授權額度
   * 然後在 `spender` 上呼叫 `ERC1363Spender::onApprovalReceived`。
   * @param spender 將花費資金的地址。
   * @param value 要花費的代幣數量。
   * @param data 沒有指定格式的附加資料，在呼叫 `spender` 時發送。
   * @return 一個布林值，表示操作是否成功（除非拋出錯誤）。
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

想要透過 `transferAndCall` 或 `transferFromAndCall` 接受 ERC-1363 代幣的智能合約**必須**實作 `ERC1363Receiver` 介面：

```solidity
/**
 * @title ERC1363Receiver
 * @dev 任何想要支援來自 ERC-1363 代幣合約的 `transferAndCall` 或 `transferFromAndCall` 的合約介面。
 */
interface ERC1363Receiver {
  /**
   * @dev 每當 `operator` 透過 `ERC1363::transferAndCall` 或 `ERC1363::transferFromAndCall` 將 ERC-1363 代幣從 `from` 轉帳至此合約時，就會呼叫此函式。
   *
   * NOTE: 若要接受轉帳，此函式必須回傳
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * （即 0x88a7ca5c，或其自身的函式選擇器）。
   *
   * @param operator 呼叫 `transferAndCall` 或 `transferFromAndCall` 函式的地址。
   * @param from 代幣轉帳的來源地址。
   * @param value 轉帳的代幣數量。
   * @param data 沒有指定格式的附加資料。
   * @return 如果允許轉帳，則回傳 `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`（除非拋出錯誤）。
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

想要透過 `approveAndCall` 接受 ERC-1363 代幣的智能合約**必須**實作 `ERC1363Spender` 介面：

```solidity
/**
 * @title ERC1363Spender
 * @dev 任何想要支援來自 ERC-1363 代幣合約的 `approveAndCall` 的合約介面。
 */
interface ERC1363Spender {
  /**
   * @dev 每當 ERC-1363 代幣的 `owner` 透過 `ERC1363::approveAndCall` 授權此合約
   * 花費其代幣時，就會呼叫此函式。
   *
   * NOTE: 若要接受授權，此函式必須回傳
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * （即 0x7b04a2d0，或其自身的函式選擇器）。
   *
   * @param owner 呼叫 `approveAndCall` 函式且先前擁有代幣的地址。
   * @param value 要花費的代幣數量。
   * @param data 沒有指定格式的附加資料。
   * @return 如果允許授權，則回傳 `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`（除非拋出錯誤）。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 延伸閱讀 {#further-reading}

- [ERC-1363：可支付代幣標準](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363：GitHub 儲存庫](https://github.com/vittominacori/erc1363-payable-token)