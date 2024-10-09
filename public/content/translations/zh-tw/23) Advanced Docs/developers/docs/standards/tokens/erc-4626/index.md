---
title: ERC-4626 代幣化金庫標準
description: 收益金庫的標準。
lang: zh-tw
---

## 簡介 {#introduction}

ERC-4626 是優化和統一收益金庫技術參數的標準。 它為表示單一底層 ERC-20 代幣的份額的代幣化收益金庫，提供標準應用程式介面。 ERC-4626 還概述了使用 ERC-20 的代幣化金庫的可選擴展，提供存款、提取代幣和讀取餘額的基本功能。

**ERC-4626 在收益金庫的作用**

借貸市場、聚合器和本息代幣可協助使用者透過執行不同的策略，找到加密代幣的最佳收益率。 這些策略在執行時會略有不同，可能會容易出錯或浪費開發資源。

收益金庫的 ERC-4626 標準透過創建更一致和健壯的實作模式，無需開發者提供專門的工作，就能減少整合工作量並解鎖在各種應用程式中獲取收益的途徑。

ERC-4626 代幣在 [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) 中有完整描述。

## 基本資訊 {#prerequisites}

為了更好地理解本頁，我們建議你先閱讀[代幣標準](/developers/docs/standards/tokens/)和[ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-4626 的函式和功能： {#body}

### 方法 {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

此函數傳回用於金庫記帳、存款、提款的基礎代幣的地址。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

此函數傳回金庫持有的相關資產總金額。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

此函數傳回 `shares` 的數量，該數量將由金庫兌換為提供的 `assets` 數量。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

此函數傳回 `assets` 的數量，該數量將由金庫兌換為提供的 `shares` 數量。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

該函數返回 `receiver` 的單個 [`deposit`](#deposit) 調用中可以存入的最大標的資產數量。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

該函數允許用戶模擬其在當前區塊的存款效果。

#### 存款 {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

該函數將標的代幣的 `assets`存入金庫，並將 `shares` 的所有權授予 `receiver`。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

該函數返回 `receiver` 在單個 [`mint`](#mint) 調用中可以鑄造的最大數量。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

該函數允許用戶在當前區塊模擬其鑄造的效果。

#### 鑄造 {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

該函數透過存入標的代筆的 `assets`，將 `shares` 金庫份額準確鑄造到 `receiver`。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

該函數返回可以透過單個 [`withdraw`](#withdraw) 調用從 `owner` 餘額中提取的最大標的資產數量。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

該函數允許用戶模擬其在當前區塊的提款效果。

#### 提款 {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

該函數從 `owner` 銷毀 `shares`，並將 `assets` 代幣從金庫準確發送到 `receiver`。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

該函數返回可以透過 [`redeem`](#redeem)調用從 `owner` 餘額中贖回的最大份額。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

該函數允許允許用戶在當前區塊中模擬其贖回效果。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

該函數從 `owner` 贖回特定數量的 `shares`，並將標的代幣的 `assets` 從金庫發送到 `receiver`。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

返回流通中未贖回的資金庫份額總數。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

返回 `owner` 目前擁有的資金庫份額總量。

### 介面圖 {#mapOfTheInterface}

![ERC-4626 介面圖](./map-of-erc-4626.png)

### 事件 {#events}

#### 存款事件

**必須**在通過[`mint`](#mint) 和[`deposit`](#deposit) 方法將代幣存入資金庫前發出

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中`sender` 是用`assets` 兌換`shares`，並將這些`shares` 轉移給`owner`的用戶。

#### 提款事件

**必須**在存款人用[`redeem`](#redeem) 或[ `withdraw`](#withdraw) 方法從資金庫中取出份額時發出。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是觸發提款並將 `owner` 擁有的 `shares` 兌換為 `assets` 的使用者。 `receiver` 是收到被提取的 `assets` 的使用者。

## 衍生閱讀 {#further-reading}

- [ERC-4626：代幣化金庫標準](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
