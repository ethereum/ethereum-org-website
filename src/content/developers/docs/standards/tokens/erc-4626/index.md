---
title: ERC-4626 Tokenized Vault Standard
description: A standard for yield bearing vaults.
lang: en
sidebar: true
---

## Introduction {#introduction}

ERC-4626 is a standard to optimize and unify the technical parameters of yield-bearing vaults. It provides a standard API for tokenized yield-bearing vaults that represent shares of a single underlying ERC-20 token. ERC-4626 also outlines an optional extension for tokenized vaults utilizing ERC-20, offering basic functionality for depositing, withdrawing tokens and reading balances.

**The role of ERC-4626 in yield-bearing vaults**

Lending markets, aggregators, and intrinsically interest-bearing tokens help users find the best yield on their crypto tokens by executing different strategies. These strategies are done with slight variation, which might be error-prone or waste development resources.

ERC-4626 in yield-bearing vaults will lower the integration effort and unlock access to yield in various applications with little specialized effort from developers by creating more consistent and robust implementation patterns.

The ERC-4626 token is described fully in [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

## Prerequisites {#prerequisites}

To better understand this page, we recommend you first read about [token standards](/developers/docs/standards/tokens/) and [ERC-20](/developers/docs/standards/tokens/erc-20/).

## ERC-4626 Functions and Features: {#body}

### Methods {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address _assetTokenAddress)
```

This function returns the address of the underlying token used for the vault for accounting, depositing, withdrawing.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256 _totalManagedAssets)
```

This function returns the total amount of underlying assets held by the vault.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 _assets) public view returns (uint256 _shares)
```

This function returns the amount of `_shares` that will be exchanged by the vault for the amount of `_assets` provided.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 _shares) public view returns (uint256 _assets)
```

This function returns the amount of `_assets` that will be exchanged by the vault for the amount of `_shares` provided.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address _receiver) public view returns (uint256)
```

This function returns the maximum amount of assets that can be deposited in a single [`deposit`](#deposit) call by the `_receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 _assets) public view returns (uint256)
```

This function allows users to simulate the effects of their deposit at the current block.

#### deposit {#deposit}

```solidity
function deposit(uint256 _assets, address _receiver) public returns (uint256 _shares)
```

This function deposits the `_assets` tokens into the vault and grants ownership on the `_shares` to `_receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address _receiver) public view returns (uint256)
```

This function returns the maximum amount of shares that can be minted in a single [`mint`](#mint) call by the `_receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 _shares) public view returns (uint256)
```

This function allows users to simulate the effects of their mint at the current block.

#### mint {#mint}

```solidity
function mint(uint256 _shares, address _receiver) public returns (uint256 _assets)
```

This function mints `_shares` vault shares to `_receiver` by depositing `_assets` tokens.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address _owner) public view returns (uint256)
```

This function returns the maximum amount of assets that can be withdrawn from the `_owner` balance with a single [`withdraw`](#withdraw) call.

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 _assets) public view returns (uint256)
```

This function allows users to simulate the effects of their withdrawal at the current block.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 _assets, address _receiver, address _owner) public returns (uint256 _shares)
```

This function burns `_shares` from `_owner` and send exactly `_assets` token from the vault to `_receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address _owner) public view returns (uint256)
```

This function returns the maximum amount of shares that can be redeem from the `_owner` balance through a [`redeem`](#redeem) call.

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 _shares) public view returns (uint256)
```

This function allows users to simulate the effects of their redeemption at the current block.

#### redeem {#redeem}

```solidity
function redeem(uint256 _shares, address _receiver, address _owner) public returns (uint256 _assets)
```

This function redeems a specific number of `_shares` from `_owner` and send `_assets` token from the vault to `_receiver`.

#### balanceOfUnderlying {#balanceofunderlying}

```solidity
function balanceOfUnderlying(address _owner) public view returns (uint256)
```

This function returns the total amount of underlying tokens held in the vault for `_owner`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Returns the total number of unredeemed vault shares in circulation.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address _owner) public view returns (uint256)
```

Returns the total amount of vault shares the `_owner` currently has.

#### exchangeRate {#exchangerate}

```solidity
function exchangeRate() public view returns (uint256)
```

The amount of underlying tokens one `baseUnit` of vault shares is redeemable for. For example:

```solidity
_shares * exchangeRate() / baseUnit() = _value.
```

```solidity
exchangeRate() * totalSupply() MUST equal totalHoldings().
```

#### baseUnit {#baseunit}

```solidity
function baseUnit() public view returns(uint256)
```

The decimal scalar for vault shares and operations involving `exchangeRate()`.

### Events {#events}

#### Deposit Event

**MUST** be emitted when tokens are deposited into the vault via the [`mint`](#mint) and [`deposit`](#deposit) methods

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Where `sender` is the user who exchanged `assets` for `shares`, and transferred those `shares` to `owner`.

#### Widthdraw Event

**MUST** be emitted when shares are withdrawn from the vault by a depositor in the [`redeem`](#redeem) or [`withdraw`](#withdraw) methods.

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 share
)
```

Where `sender` is the user who triggered the withdrawal and exchanged `shares`, owned by `owner`, for `assets`. `receiver` is the user who received the withdrawn `assets`.

_Note_: All batch functions, including the hook, are also available in non-batch versions. This is done to save gas, as transferring just one asset will likely remain to be the most common method. For clarity in the explanations, we've left them out, including the safe transfer rules. Remove the 'Batch' and the names are identical.

## Further reading {#further-reading}

- [EIP-4626: Tokenized vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol)
