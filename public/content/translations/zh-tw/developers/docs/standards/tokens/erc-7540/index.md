---
title: ERC-7540 非同步代幣化金庫標準
description: ERC-4626 的擴充功能，為代幣化金庫新增了非同步存款與贖回流程。
lang: zh-tw
---

## 簡介 {#introduction}

ERC-7540 擴充了 [ERC-4626 代幣化金庫標準](/developers/docs/standards/tokens/erc-4626/)，新增對非同步存款與贖回流程的支援。它引入了「先請求後申領」的模式：使用者首先提交請求（鎖定其資產或份額），然後在金庫處理完畢後申領結果。

當金庫無法在單筆交易中立即結算時，就需要此功能，例如：

- 真實世界資產 (RWA) 協定，如代幣化國債、私人信貸以及其他具有 T+1 或 T+2 結算週期的資產
- 信用評估在鏈下發生的抵押不足借貸
- 跨鏈金庫策略，其中橋接會引入延遲
- 具有解除綁定期的流動性質押代幣

金庫可以選擇僅在存款、僅在贖回或兩者皆採用非同步。這種靈活性讓金庫開發者只需在底層策略需要時加入非同步流程，同時保持另一端為同步。

## 先決條件 {#prerequisites}

為了更了解本頁面，我們建議您先閱讀[代幣標準](/developers/docs/standards/tokens/)、[ERC-20](/developers/docs/standards/tokens/erc-20/) 以及 [ERC-4626](/developers/docs/standards/tokens/erc-4626/)。

## ERC-4626 與 ERC-7540 比較 {#comparison}

在 ERC-4626 中，存款是原子化結算的：投資者發送資產並在單筆交易中收回份額。

![ERC-4626 synchronous deposit flow](./erc-4626-sync-flow.svg)

ERC-7540 將此分為兩個步驟。投資者首先呼叫 `requestDeposit()` 來鎖定資產，然後等待金庫管理者處理請求。一旦完成，投資者呼叫 `deposit()` 來申領其份額。匯率是在完成時決定的，而不是在請求時。

![ERC-7540 asynchronous deposit flow](./erc-7540-async-flow.svg)

贖回流程的運作方式相同：`requestRedeem()` 鎖定份額，一旦完成，投資者呼叫 `redeem()` 來申領資產。

## ERC-7540 函式與功能 {#body}

ERC-7540 繼承了完整的 ERC-4626 介面，但將 `deposit`/`mint`/`withdraw`/`redeem` 重新用作申領函式。新的 `requestDeposit` 和 `requestRedeem` 函式負責處理初始請求步驟。

每個請求會經歷三個狀態：待處理（已提交，等待處理）、可申領（已完成並定價）以及已申領（投資者已領取其份額或資產）。

![Request lifecycle: Pending, Claimable, Claimed](./request-lifecycle.svg)

### 存款請求流程 {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

將 `assets` 從 `owner` 轉帳到金庫並提交存款請求。`controller` 地址獲得該請求的控制權。回傳一個識別請求批次的 `requestId`。

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

回傳給定 `controller` 和 `requestId` 的待處理（尚未可申領）存款請求中的 `assets` 數量。

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

回傳給定 `controller` 和 `requestId` 的可申領（已完成但尚未申領）存款請求中的 `assets` 數量。

#### 申領存款 {#claiming-deposits}

一旦存款請求變為可申領，使用者即可呼叫標準的 ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) 或 [`mint`](/developers/docs/standards/tokens/erc-4626/#mint) 函式來申領其份額。在 ERC-7540 中，這些函式不再轉帳資產（這在請求時已經發生）。它們只會向接收者鑄造份額。

### 贖回請求流程 {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

鎖定來自 `owner` 的 `shares` 並提交贖回請求。`controller` 地址獲得該請求的控制權。

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

回傳給定 `controller` 和 `requestId` 的待處理贖回請求中的 `shares` 數量。

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

回傳給定 `controller` 和 `requestId` 的可申領贖回請求中的 `shares` 數量。

#### 申領贖回 {#claiming-redemptions}

一旦贖回請求變為可申領，使用者即可呼叫標準的 ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) 或 [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw) 函式來申領其資產。

### 操作員管理 {#operator-management}

ERC-7540 包含一個操作員模式（來自 [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)），允許第三方代表使用者管理請求。

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

核准或撤銷 `operator` 代表 `msg.sender` 執行存款/贖回請求與申領。

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

回傳 `operator` 是否獲准代表 `controller` 執行操作。

### 請求 ID {#request-ids}

請求 ID 用於區分不同批次的請求。所有共用相同 `requestId` 的請求都是同質化的：它們會一起在狀態之間轉換，並獲得相同的匯率。

當金庫對所有請求回傳 `requestId = 0` 時，只有 `controller` 地址能區分請求狀態。來自同一控制者的多個請求將被彙總。

### 事件 {#events}

#### DepositRequest 事件 {#depositrequest-event}

當透過 [`requestDeposit`](#requestdeposit) 提交存款請求時，必須 (MUST) 觸發此事件。

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### RedeemRequest 事件 {#redeemrequest-event}

當透過 [`requestRedeem`](#requestredeem) 提交贖回請求時，必須 (MUST) 觸發此事件。

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### OperatorSet 事件 {#operatorset-event}

當透過 [`setOperator`](#setoperator) 核准或撤銷操作員時，必須 (MUST) 觸發此事件。

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### 預覽函式 {#preview-functions}

預覽函式必須僅針對非同步的流程進行回滾，因為在請求完成之前無法得知匯率。在非同步存款金庫中，`previewDeposit` 和 `previewMint` 必須 (MUST) 回滾，而 `previewRedeem` 和 `previewWithdraw` 則保持與 ERC-4626 中相同的運作方式（對於非同步贖回金庫則反之亦然）。這是與 ERC-4626 的一個關鍵行為差異。

## 延伸閱讀 {#further-reading}

- [EIP-7540：非同步 ERC-4626 代幣化金庫](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626：代幣化金庫標準](https://eips.ethereum.org/EIPS/eip-4626)
- [歐本齊柏林 ERC-7540 實作](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)