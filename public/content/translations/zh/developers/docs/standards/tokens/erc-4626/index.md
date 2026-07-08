---
title: "ERC-4626 代币化金库标准"
description: "生息金库的标准。"
lang: zh
---

## 简介 {#introduction}

ERC-4626 是一个旨在优化和统一生息金库技术参数的标准。它为代表单一基础 ERC-20 代币份额的代币化生息金库提供了一个标准 API。ERC-4626 还概述了利用 ERC-20 的代币化金库的可选扩展，提供了存入、提取代币和读取余额的基本功能。

**ERC-4626 在生息金库中的作用**

借贷市场、聚合器和本质上生息的代币通过执行不同的策略，帮助用户为其加密货币代币找到最佳收益。这些策略的执行方式略有不同，这可能容易出错或浪费开发资源。

生息金库中的 ERC-4626 将通过创建更一致和稳健的实现模式，降低集成工作量，并使开发者无需花费太多专门精力即可在各种应用中解锁收益获取途径。

ERC-4626 代币在 [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) 中有完整描述。

**异步金库扩展 (ERC-7540)**

ERC-4626 针对达到上限的原子存款和赎回进行了优化。如果达到上限，则无法提交新的存款或赎回。这种限制对于任何将异步操作或延迟作为与金库交互先决条件的智能合约系统（例如，现实世界资产协议、抵押不足借贷协议、跨链借贷协议、流动性质押代币 (LST) 或保险安全模块）来说效果不佳。

ERC-7540 扩展了 ERC-4626 金库在异步用例中的实用性。现有的金库接口（`deposit`/`withdraw`/`mint`/`redeem`）被充分利用来申领异步请求。

ERC-7540 扩展在 [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540) 中有完整描述。

**多资产金库扩展 (ERC-7575)**

ERC-4626 不支持的一个缺失用例是具有多种资产或入口点（例如流动性提供者 (LP) 代币）的金库。由于 ERC-4626 要求其本身必须是 ERC-20，这些金库通常显得笨重或不合规。

ERC-7575 通过将 ERC-20 代币实现从 ERC-4626 实现中外部化，增加了对多资产金库的支持。

ERC-7575 扩展在 [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575) 中有完整描述。

## 前提条件 {#prerequisites}

为了更好地理解本页面，我们建议你首先阅读有关[代币标准](/developers/docs/standards/tokens/)和 [ERC-20](/developers/docs/standards/tokens/erc-20/) 的内容。

## ERC-4626 功能与特性： {#body}

### 方法 {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

此函数返回金库用于记账、存款和提款的基础代币的地址。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

此函数返回金库持有的基础资产总额。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

此函数返回金库将为所提供的 `assets` 数量兑换的 `shares` 数量。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

此函数返回金库将为所提供的 `shares` 数量兑换的 `assets` 数量。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

此函数返回在单次 [`deposit`](#deposit) 调用中可以存入的最大基础资产数量，并为 `receiver` 铸造份额。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

此函数允许用户模拟其在当前区块存款的效果。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

此函数将 `assets` 数量的基础代币存入金库，并将 `shares` 的所有权授予 `receiver`。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

此函数返回在单次 [`mint`](#mint) 调用中可以铸造的最大份额数量，并为 `receiver` 铸造份额。

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

此函数允许用户模拟其在当前区块铸造的效果。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

此函数通过存入 `assets` 数量的基础代币，向 `receiver` 铸造恰好 `shares` 数量的金库份额。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

此函数返回通过单次 [`withdraw`](#withdraw) 调用可以从 `owner` 余额中提取的最大基础资产数量。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

此函数允许用户模拟其在当前区块提款的效果。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

此函数从 `owner` 销毁 `shares`，并从金库向 `receiver` 发送恰好 `assets` 数量的代币。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

此函数返回通过 [`redeem`](#redeem) 调用可以从 `owner` 余额中赎回的最大份额数量。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

此函数允许用户模拟其在当前区块赎回的效果。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

此函数从 `owner` 赎回特定数量的 `shares`，并从金库向 `receiver` 发送 `assets` 数量的基础代币。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

返回流通中未赎回的金库份额总数。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

返回 `owner` 当前拥有的金库份额总额。

### 接口映射 {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### 事件 {#events}

#### Deposit 事件 {#deposit-event}

当通过 [`mint`](#mint) 和 [`deposit`](#deposit) 方法将代币存入金库时，**必须**触发此事件。

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是将 `assets` 兑换为 `shares`，并将这些 `shares` 转移给 `owner` 的用户。

#### Withdraw 事件 {#withdraw-event}

当存款人通过 [`redeem`](#redeem) 或 [`withdraw`](#withdraw) 方法从金库中提取份额时，**必须**触发此事件。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是触发提款并将 `owner` 拥有的 `shares` 兑换为 `assets` 的用户。`receiver` 是接收提取的 `assets` 的用户。

## 延伸阅读 {#further-reading}

- [EIP-4626：代币化金库标准](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626：GitHub 仓库](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)