---
title: ERC-4626 代幣化金庫標準
description: 收益型金庫的標準。
lang: zh-tw
---

## 簡介 {#introduction}

ERC-4626 是一項旨在最佳化並統一收益型金庫技術參數的標準。它為代表單一基礎 ERC-20 代幣份額的代幣化收益型金庫提供了標準 API。ERC-4626 還概述了使用 ERC-20 的代幣化金庫的選用擴充功能，提供存款、提款代幣和讀取餘額的基本功能。

**ERC-4626 在收益型金庫中的作用**

借貸市場、聚合器和內建生息代幣透過執行不同的策略，幫助使用者在他們的加密貨幣代幣上找到最佳收益。這些策略的執行方式略有不同，這可能容易出錯或浪費開發資源。

收益型金庫中的 ERC-4626 將透過建立更一致且穩健的實作模式，降低整合工作量，並讓開發人員幾乎不需要花費專門的精力，就能在各種應用程式中解鎖獲取收益的途徑。

ERC-4626 代幣在 [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) 中有完整描述。

**非同步金庫擴充功能 (ERC-7540)**

ERC-4626 針對達到上限前的原子存款與贖回進行了最佳化。如果達到上限，則無法提交新的存款或贖回。這種限制對於任何將非同步操作或延遲作為與金庫互動先決條件的智能合約系統（例如：真實世界資產協議、抵押不足借貸協議、跨鏈借貸協議、流動性質押代幣或保險安全模組）來說，效果並不理想。

ERC-7540 擴展了 ERC-4626 金庫在非同步使用案例中的實用性。現有的金庫介面（`deposit`/`withdraw`/`mint`/`redeem`）被充分利用來申領非同步請求。

ERC-7540 擴充功能在 [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) 中有完整描述。

**多資產金庫擴充功能 (ERC-7575)**

ERC-4626 不支援的一個缺失使用案例是具有多種資產或進入點（例如流動性提供者 (LP) 代幣）的金庫。由於 ERC-4626 要求其本身必須是 ERC-20，這些金庫通常難以管理或不合規。

ERC-7575 透過將 ERC-20 代幣實作從 ERC-4626 實作中外部化，增加了對多資產金庫的支援。

ERC-7575 擴充功能在 [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) 中有完整描述。

## 先決條件 {#prerequisites}

為了更了解本頁面，我們建議您先閱讀[代幣標準](/developers/docs/standards/tokens/)和 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-4626 函式與功能： {#body}

### 方法 {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

此函式回傳金庫用於記帳、存款、提款的基礎代幣地址。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

此函式回傳金庫持有的基礎資產總額。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

此函式回傳金庫將為所提供的 `assets` 數量兌換的 `shares` 數量。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

此函式回傳金庫將為所提供的 `shares` 數量兌換的 `assets` 數量。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

此函式回傳在單次 [`deposit`](#deposit) 呼叫中可存入的最大基礎資產數量，並為 `receiver` 鑄造份額。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

此函式允許使用者在當前區塊模擬其存款的效果。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

此函式將 `assets` 的基礎代幣存入金庫，並將 `shares` 的所有權授予 `receiver`。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

此函式回傳在單次 [`mint`](#mint) 呼叫中可鑄造的最大份額數量，並為 `receiver` 鑄造份額。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

此函式允許使用者在當前區塊模擬其鑄造的效果。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

此函式透過存入 `assets` 的基礎代幣，精確地為 `receiver` 鑄造 `shares` 個金庫份額。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

此函式回傳單次 [`withdraw`](#withdraw) 呼叫可從 `owner` 餘額中提款的最大基礎資產數量。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

此函式允許使用者在當前區塊模擬其提款的效果。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

此函式從 `owner` 銷毀 `shares`，並從金庫精確地發送 `assets` 代幣給 `receiver`。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

此函式回傳透過 [`redeem`](#redeem) 呼叫可從 `owner` 餘額中贖回的最大份額數量。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

此函式允許使用者在當前區塊模擬其贖回的效果。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

此函式從 `owner` 贖回特定數量的 `shares`，並從金庫發送 `assets` 的基礎代幣給 `receiver`。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

回傳流通中未贖回的金庫份額總數。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

回傳 `owner` 目前擁有的金庫份額總額。

### 介面地圖 {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### 事件 {#events}

#### Deposit 事件 {#deposit-event}

當代幣透過 [`mint`](#mint) 和 [`deposit`](#deposit) 方法存入金庫時，**必須**觸發此事件。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是將 `assets` 兌換為 `shares`，並將這些 `shares` 轉移給 `owner` 的使用者。

#### Withdraw 事件 {#withdraw-event}

當存款人透過 [`redeem`](#redeem) 或 [`withdraw`](#withdraw) 方法從金庫提款份額時，**必須**觸發此事件。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是觸發提款並將 `owner` 擁有的 `shares` 兌換為 `assets` 的使用者。`receiver` 是收到提款 `assets` 的使用者。

## 延伸閱讀 {#further-reading}

- [EIP-4626：代幣化金庫標準](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626：GitHub 儲存庫](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)