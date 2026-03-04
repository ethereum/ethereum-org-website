---
title: "ERC-4626 代幣化金庫標準"
description: "收益金庫的標準。"
lang: zh-tw
---

## 介紹 {#introduction}

ERC-4626 是優化和統一收益金庫技術參數的標準。 它為表示單一底層 ERC-20 代幣的份額的代幣化收益金庫，提供標準應用程式介面。 ERC-4626 還概述了使用 ERC-20 的代幣化金庫的可選擴展，提供存款、提取代幣和讀取餘額的基本功能。

**ERC-4626 在收益金庫的作用**

借貸市場、聚合器和本息代幣可協助使用者透過執行不同的策略，找到加密代幣的最佳收益率。 這些策略在執行時會略有不同，可能會容易出錯或浪費開發資源。

收益金庫的 ERC-4626 標準透過創建更一致和健壯的實作模式，無需開發者提供專門的工作，就能減少整合工作量並解鎖在各種應用程式中獲取收益的途徑。

[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) 中完整說明了 ERC-4626 代幣。

**非同步金庫擴充功能 (ERC-7540)**

ERC-4626 針對原子存款和贖回限制進行了優化。 如果達到限制，則無法提交新的存款或贖回。 對於任何以非同步動作或延遲作為與金庫互動的先決條件的智慧合約系統而言，這項限制的成效不彰 (例如：現實世界資產協議、抵押不足的借貸協議、跨鏈借貸協議、流動性質押代幣，或保險安全模組)。

ERC-7540 擴展了 ERC-4626 金庫在非同步使用案例中的實用性。 現有的金庫介面 (`deposit`/`withdraw`/`mint`/`redeem`) 已被充分利用來宣告非同步請求。

[ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) 中完整說明了 ERC-7540 擴充功能。

**多鏈資產金庫擴充功能 (ERC-7575)**

ERC-4626 不支援的一個缺失使用案例是具有多種資產或介入點的金庫，例如流動資產提供者 (LP) 代幣。 由於 ERC-4626 要求其本身是 ERC-20，這些使用案例通常難以操作或不兼容。

ERC-7575 透過將 ERC-20 代幣從 ERC-4626 實現外部化，增加了對多資產金庫的支援。

[ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) 中完整說明了 ERC-7575 擴充功能。

## 先決條件 {#prerequisites}

為更清楚瞭解此頁面，建議您先閱讀 [代幣標準](/developers/docs/standards/tokens/) 和 [ERC-20](/developers/docs/standards/tokens/erc-20/) 的相關資訊。

## ERC-4626 函式與功能： {#body}

### 方法 {#methods}

#### 資產 {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

此函數傳回用於金庫記帳、存款、提款的基礎代幣的地址。

#### 總資產 {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

此函數傳回金庫持有的相關資產總金額。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

此函式會傳回金庫為所提供的 `assets` 數量所兌換的 `shares` 數量。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

此函式會傳回金庫為所提供的 `shares` 數量所兌換的 `assets` 數量。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

此函式傳回在單次 [`deposit`](#deposit) 呼叫中可存入的底層資產最大數量，並將份額鑄造給 `receiver`。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

該函數允許用戶模擬其在當前區塊的存款效果。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

此函式會將底層代幣的 `assets` 存入金庫，並將 `shares` 的所有權授予 `receiver`。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

此函式傳回在單次 [`mint`](#mint) 呼叫中可鑄造的最大份額數量，並將份額鑄造給 `receiver`。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

該函數允許用戶在當前區塊模擬其鑄造的效果。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

此函式透過存入底層代幣的 `assets`，為 `receiver` 精確鑄造 `shares` 數量的金庫份額。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

此函式傳回可透過單次 [`withdraw`](#withdraw) 呼叫，從 `owner` 餘額中提出的最大底層資產數量。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

該函數允許用戶模擬其在當前區塊的提款效果。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

此函式會銷毀 `owner` 的 `shares`，並從金庫傳送確切 `assets` 數量的代幣給 `receiver`。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

此函式傳回可透過 [`redeem`](#redeem) 呼叫，從 `owner` 餘額中贖回的最大份額數量。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

該函數允許允許用戶在當前區塊中模擬其贖回效果。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

此函式從 `owner` 贖回特定數量的 `shares`，並從金庫傳送 `assets` 數量的底層代幣給 `receiver`。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

返回流通中未贖回的資金庫份額總數。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

傳回 `owner` 目前擁有的金庫份額總量。

### 介面地圖 {#mapOfTheInterface}

![ERC-4626 介面地圖](./map-of-erc-4626.png)

### Events {#events}

#### 存款事件

透過 [`mint`](#mint) 和 [`deposit`](#deposit) 方法將代幣存入金庫時，**必須**發出。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是將 `assets` 兌換成 `shares`，並將這些 `shares` 轉移給 `owner` 的使用者。

#### 提款事件

當存款人透過 [`redeem`](#redeem) 或 [`withdraw`](#withdraw) 方法從金庫提出份額時，**必須**發出。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是觸發提款，並將 `owner` 擁有的 `shares` 兌換成 `assets` 的使用者。 `receiver` 是收到所提出 `assets` 的使用者。

## 延伸閱讀 {#further-reading}

- [EIP-4626：代幣化金庫標準](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626：GitHub 儲存庫](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
