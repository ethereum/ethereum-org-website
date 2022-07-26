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

#### deposit {#deposit}

```solidity
function deposit(address _to, uint256 _value) public returns (uint256 _shares)
```

This function deposits the `_value` tokens into the vault and grants ownership to `_to`.

#### withdraw {#withdraw}

```solidity
function withdraw(address _to, uint256 _value) public returns (uint256 _shares)
```

This function withdraws `_value` token from the vault and transfers them to `_to`.

#### totalHoldings {#totalholdings}

```solidity
function totalHoldings() public view returns (uint256)
```

This function returns the total amount of underlying tokens held by the vault.

#### balanceOfUnderlying {#balanceofunderlying}

```solidity
function balanceOfUnderlying(address _owner) public view returns (uint256)
```

This function returns the total amount of underlying tokens held in the vault for `_owner`.

#### underlying {#underlying}

```solidity
function underlying() public view returns (address)
```

Returns the address of the token the vault uses for accounting, depositing, and withdrawing.

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

#### redeem {#redeem}

```solidity
function redeem(address _to, uint256 _shares) public returns (uint256 _value)
```

Redeems a specific number of `_shares` for underlying tokens and transfers them to `_to`.

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

**MUST** be emitted when tokens are deposited into the Vault via the [`mint`](#mint) and [`deposit`](#deposit) methods

```solidity
event Deposit(address indexed sender, address indexed owner, uint256 assets, uint256 shares)
```

Where `owner` is the user who exchanged `assets` for `shares`, and transferred those `shares` to `owner`.

#### Widthdraw Event

**MUST** be emitted when tokens are withdrawn from the vault by a depositor.

```solidity
event Withdraw(address indexed _owner, address indexed _to, uint256 _value)
```

Where `_from` is the user who triggered the withdrawal and held `_value` underlying tokens in the vault, and `_to` is the user who received the withdrawn tokens.

_Note_: All batch functions, including the hook, are also available in non-batch versions. This is done to save gas, as transferring just one asset will likely remain to be the most common method. For clarity in the explanations, we've left them out, including the safe transfer rules. Remove the 'Batch' and the names are identical.

## Further reading {#further-reading}

- [EIP-4626: Tokenized vault Standard](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub Repo](https://github.com/Rari-Capital/solmate/blob/main/src/mixins/ERC4626.sol)
