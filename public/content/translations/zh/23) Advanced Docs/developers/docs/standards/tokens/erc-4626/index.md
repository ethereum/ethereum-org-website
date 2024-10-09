---
title: ERC-4626 代币化资金库标准
description: 收益资金库的标准
lang: zh
---

## 介绍 {#introduction}

ERC-4626 是优化和统一收益资金库技术参数的标准。 它为表示单个底层 ERC-20 代币的份额的代币化收益资金库提供标准应用程序接口。 ERC-4626 还概述了使用 ERC-20 的代币化资金库的可选扩展，提供存款、提取代币和读取余额的基本功能。

**ERC-4626 在收益资金库中的作用**

借贷市场、聚合器和本质上计息的代币可以帮助用户通过执行不同的策略来找到他们的加密代币的最佳收益。 这些策略的完成方式略有不同，这可能容易出错或浪费开发资源。

收益资金库的 ERC-4626 标准通过创建更加一致和健壮的实现模式，无需开发者提供专门的工作，就能减少集成工作量并解锁在各种应用程序中获取收益的途径。

[EIP-4626](https://eips.ethereum.org/EIPS/eip-4626) 中对 ERC-4626 代币进行了全面的描述。

## 前提条件 {#prerequisites}

为了更好地理解这个页面，我们建议你首先阅读[代币标准](/developers/docs/standards/tokens/)和 [ERC-20](/developers/docs/standards/tokens/erc-20/)。

## ERC-4626 的函数和功能： {#body}

### 方法 {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

此函数返回用于资金库记帐、存款和取款的标的代币的地址。

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

此函数返回资金库持有的标的资产总量。

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

此函数返回 `shares` 的数量，该数量将由资金库兑换为提供的 `assets` 数量。

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

此函数返回 `assets` 的数量，该数量将由资金库兑换为提供的 `shares` 数量。

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

此函数返回 `receiver` 的一次 [`deposit`](#deposit) 调用中可以存入的最大标的资产数量。

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

此函数允许用户模拟他们在当前区块的存款效果。

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

此函数将标的代币的 `assets` 存入资金库，并将 `shares` 的所有权授予 `receiver`。

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

此函数返回 `receiver` 在单次 [`mint`](#mint) 调用中可以铸造的最大份额。

#### previewMint {#previewmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

此函数允许用户在当前区块模拟他们的铸币效果。

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

此函数通过存入标的代币的 `assets`，将 `shares` 资金库份额准确铸造到 `receiver`。

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

此函数返回可以通过单次 [`withdraw`](#withdraw) 调用从 `owner` 余额中提取的最大标的资产数量。

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

此函数允许用户模拟他们在当前区块取款的效果。

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

此函数从 `owner` 烧录 `shares`，并将 `assets` 代币从资金库准确发送到 `receiver`。

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

此函数返回可以通过 [`redeem`](#redeem) 调用从 `owner` 余额中赎回的最大份额。

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

此函数允许用户在当前区块模拟他们的赎回效果。

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

此函数从 `owner` 赎回特定数量的 `shares` 并将底层代币的 `assets` 从资金库发送到 `receiver`。

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

返回流通中未赎回的资金库份额总数。

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

返回 `owner` 当前拥有的资金库份额总量。

### 接口图 {#mapOfTheInterface}

![ERC-4626 接口图](./map-of-erc-4626.png)

### 事件 {#events}

#### Deposit 事件

**必须**在通过 [`mint`](#mint) 和 [`deposit`](#deposit) 方法将代币存入资金库之前发出

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是用 `assets` 兑换 `shares`，并将这些 `shares` 转移给 `owner` 的用户。

#### 提款事件

**必须**在存款人用 [`redeem`](#redeem) 或 [`withdraw`](#withdraw) 方法从资金库中取出份额时发出。

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

其中 `sender` 是触发取款并将 `owner` 拥有的 `shares` 兑换为 `assets` 的用户。 `receiver` 是收到提取的 `assets` 的用户。

## 延伸阅读 {#further-reading}

- [EIP-4626：代币化资金库标准](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
