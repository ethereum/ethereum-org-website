---
title: ERC-1363 可支付代幣標準
description: ERC-1363 是 ERC-20 代幣的擴充介面，支援在單一交易內，於轉帳後在接收方合約上執行自訂邏輯，或在核准後於支出方合約上執行自訂邏輯。
lang: zh-tw
---

## 介紹 {#introduction}

### 什麼是 ERC-1363？ {#what-is-erc1363}

ERC-1363 是 ERC-20 代幣的擴充介面，支援在單一交易內，於轉帳後在接收方合約上執行自訂邏輯，或在核准後於支出方合約上執行自訂邏輯。

### 與 ERC-20 的區別 {#erc20-differences}

`transfer`、`transferFrom` 和 `approve` 等標準 ERC-20 操作，若沒有另一筆交易，就不允許在接收方或支出方合約上執行程式碼。
這在 UI 開發上增加了複雜性，也為採用帶來阻力，因為使用者必須等待第一筆交易執行完畢後，才能提交第二筆交易。
他們還必須支付兩次 GAS。

ERC-1363 讓同質化代幣能更容易執行動作，且無須使用任何鏈下監聽器即可運作。
它允許在單一交易中，於轉帳或核准後，對接收方或支出方合約進行回呼。

## 先決條件 {#prerequisites}

為更佳地理解本頁面，我們建議您先閱讀關於：

- [代幣標準](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## 主旨 {#body}

ERC-1363 為 ERC-20 代幣引入了標準 API，以便在 `transfer`、`transferFrom` 或 `approve` 之後與智能合約互動。

此標準提供轉帳代幣的基本功能，也允許代幣被核准，以便由另一個鏈上第三方花用，然後對接收方或支出方合約進行回呼。

有許多智能合約的提案用途可以接受 ERC-20 回呼。

範例如下：

- **群眾募資**：送出的代幣會觸發即時獎勵分配。
- **服務**：付款一步驟即可啟用服務存取權限。
- **發票**：代幣會自動結清發票。
- **訂閱**：在支付第一個月款項的交易中核准年費率，即可啟用訂閱。

基於這些原因，它最初被命名為 **「Payable Token」(可支付代幣)**。

回呼行為進一步擴展了它的功用，實現了無縫互動，例如：

- **質押**：轉帳的代幣會觸發在質押合約中的自動鎖定。
- **投票**：收到的代幣會在管理體系中註冊為投票。
- **交換**：代幣核准一步驟即可啟用交換邏輯。

在所有需要在收到轉帳或核准後執行回呼的情況下，都可以使用 ERC-1363 代幣來實現特定的功用。
ERC-1363 也能夠透過驗證接收方處理代幣的能力，來避免智能合約中的代幣遺失或代幣鎖定。

與其他 ERC-20 擴充提案不同，ERC-1363 不會覆寫 ERC-20 的 `transfer` 和 `transferFrom` 方法，而是定義要實作的介面 ID，以維持與 ERC-20 的向後相容性。

來自 [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### 方法 {#methods}

實作 ERC-1363 標準的智能合約**必須**實作 `ERC1363` 介面中的所有函式，以及 `ERC20` 和 `ERC165` 介面。

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev ERC-20 代幣的擴充介面，支援在單一交易內，於 `transfer` 或 `transferFrom` 後在接收方合約上執行程式碼，或在 `approve` 後於支出方合約上執行程式碼。
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * 注意：此介面的 ERC-165 識別碼為 0xb0202a11。
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev 將 `value` 數量的代幣從呼叫者的帳戶移至 `to`，然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param to 代幣要轉入的地址。
   * @param value 要轉帳的代幣數量。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev 將 `value` 數量的代幣從呼叫者的帳戶移至 `to`，然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param to 代幣要轉入的地址。
   * @param value 要轉帳的代幣數量。
   * @param data 額外資料，無特定格式，在呼叫 `to` 時傳送。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 使用額度機制，將 `value` 數量的代幣從 `from` 移至 `to`，然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param from 代幣要轉出的地址。
   * @param to 代幣要轉入的地址。
   * @param value 要轉帳的代幣數量。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev 使用額度機制，將 `value` 數量的代幣從 `from` 移至 `to`，然後在 `to` 上呼叫 `ERC1363Receiver::onTransferReceived`。
   * @param from 代幣要轉出的地址。
   * @param to 代幣要轉入的地址。
   * @param value 要轉帳的代幣數量。
   * @param data 額外資料，無特定格式，在呼叫 `to` 時傳送。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev 將呼叫者代幣中的 `value` 數量設定為 `spender` 的額度，然後在 `spender` 上呼叫 `ERC1363Spender::onApprovalReceived`。
   * @param spender 將花用資金的地址。
   * @param value 要花用的代幣數量。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev 將呼叫者代幣中的 `value` 數量設定為 `spender` 的額度，然後在 `spender` 上呼叫 `ERC1363Spender::onApprovalReceived`。
   * @param spender 將花用資金的地址。
   * @param value 要花用的代幣數量。
   * @param data 額外資料，無特定格式，在呼叫 `spender` 時傳送。
   * @return 一個布林值，表示操作成功，除非擲回錯誤。
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
   * @dev 每當 `operator` 從 `from` 透過 `ERC1363::transferAndCall` 或 `ERC1363::transferFromAndCall` 將 ERC-1363 代幣轉帳到此合約時，此函式就會被呼叫。
   *
   * 注意：為接受轉帳，此函式必須回傳
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (即 0x88a7ca5c，或其自身的函式選擇器)。
   *
   * @param operator 呼叫 `transferAndCall` 或 `transferFromAndCall` 函式的地址。
   * @param from 代幣轉出的來源地址。
   * @param value 轉帳的代幣數量。
   * @param data 額外資料，無特定格式。
   * @return 如果允許轉帳，則回傳 `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`，除非擲回錯誤。
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
   * @dev 每當 ERC-1363 代幣的 `owner` 透過 `ERC1363::approveAndCall` 核准此合約花用其代幣時，此函式就會被呼叫。
   *
   * 注意：為接受核准，此函式必須回傳
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (即 0x7b04a2d0，或其自身的函式選擇器)。
   *
   * @param owner 呼叫 `approveAndCall` 函式且先前擁有代幣的地址。
   * @param value 要花用的代幣數量。
   * @param data 額外資料，無特定格式。
   * @return 如果允許核准，則回傳 `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`，除非擲回錯誤。
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## 延伸閱讀 {#further-reading}

- [ERC-1363：可支付代幣標準](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363：GitHub 儲存庫](https://github.com/vittominacori/erc1363-payable-token)
