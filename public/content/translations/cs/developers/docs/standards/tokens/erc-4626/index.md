---
title: Standard tokenizovaného trezoru ERC-4626
description: Standard pro výnosové trezory.
lang: cs
---

## Úvod {#introduction}

ERC-4626 je standard, který optimalizuje a sjednocuje technické parametry výnosových trezorů. Poskytuje standardní API pro tokenizované výnosové trezory, které představují podíly na jednom základním tokenu ERC-20. ERC-4626 také definuje volitelné rozšíření pro tokenizované trezory využívající ERC-20, které nabízí základní funkce pro vkládání, vybírání tokenů a čtení zůstatků.

**Role ERC-4626 ve výnosových trezorech**

Trhy s půjčkami, agregátory a tokeny s vnitřním úročením pomáhají uživatelům dosáhnout největšího výnosu z jejich kryptotokenů. Tyto strategie se provádějí s mírnými variacemi, což může být náchylné k chybám nebo plýtvání vývojovými zdroji.

ERC-4626 ve výnosových trezorech sníží náročnost integrace a otevře přístup k výnosům v různých aplikacích s minimálním specializovaným úsilím od vývojářů tím, že vytvoří konzistentnější a robustnější implementační vzory.

Token ERC-4626 je plně popsán v [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Asynchronní rozšíření trezoru (ERC-7540)**

ERC-4626 je optimalizován pro atomické vklady a odkupy až do určitého limitu. Pokud je limitu dosaženo, nelze odeslat žádné nové vklady ani odkupy. Toto omezení nefunguje dobře pro žádný systém chytrých kontraktů s asynchronními akcemi nebo zpožděními jako předpokladem pro propojení s trezorem (např. protokoly reálných aktiv, protokoly pro půjčky s nedostatečným zajištěním, protokoly pro cross-chain půjčky, tokeny likvidního stakingu nebo bezpečnostní moduly pojištění).

ERC-7540 rozšiřuje použitelnost trezorů ERC-4626 pro asynchronní případy použití. Stávající rozhraní trezoru (`deposit`/`withdraw`/`mint`/`redeem`) je plně využito k nárokování asynchronních požadavků.

Rozšíření ERC-7540 je plně popsáno v [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Rozšíření trezoru s více aktivy (ERC-7575)**

Jedním z chybějících případů použití, který ERC-4626 nepodporuje, jsou trezory, které mají více aktiv nebo vstupních bodů, jako jsou tokeny poskytovatele likvidity (LP). Ty jsou obecně těžkopádné nebo nevyhovující kvůli požadavku, aby samotný standard ERC-4626 byl ERC-20.

ERC-7575 přidává podporu pro trezory s více aktivy externalizací implementace tokenu ERC-20 z implementace ERC-4626.

Rozšíření ERC-7575 je plně popsáno v [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve přečíst si o [standardech tokenů](/developers/docs/standards/tokens/) a [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funkce a vlastnosti ERC-4626: {#body}

### Metody {#methods}

#### aktivum {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Tato funkce vrací adresu základního tokenu, který je používán pro účetnictví, vklady a výběry v trezoru.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Tato funkce vrací celkové množství základních aktiv držených v trezoru.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Tato funkce vrací množství `shares`, které by trezor vyměnil za poskytnuté množství `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Tato funkce vrací množství `assets`, které by trezor vyměnil za poskytnuté množství `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Tato funkce vrací maximální množství podkladových aktiv, které lze vložit v jediném volání [`deposit`](#deposit), přičemž jsou podíly vyraženy pro `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Tato funkce umožňuje uživatelům simulovat účinky jejich vkladu v aktuálním bloku.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Tato funkce vkládá `assets` podkladových tokenů do trezoru a uděluje `receiver`ovi vlastnictví `shares`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Tato funkce vrací maximální množství podílů, které mohou být vyraženy v jediném volání [`mint`](#mint), přičemž jsou podíly vyraženy pro `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Tato funkce umožňuje uživatelům simulovat účinky své ražby v aktuálním bloku.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Tato funkce razí přesně `shares` podílů trezoru `receiver`ovi, a to vložením `assets` podkladových tokenů.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Tato funkce vrací maximální množství podkladových aktiv, které lze vybrat ze zůstatku `owner`a jediným voláním [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Tato funkce umožňuje uživatelům simulovat účinky svého výběru v aktuálním bloku.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Tato funkce spálí `shares` od `owner`a a odešle z trezoru přesně `assets` tokenů `receiver`ovi.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Tato funkce vrací maximální množství podílů, které lze odkoupit ze zůstatku `owner`a prostřednictvím volání [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Tato funkce umožňuje uživatelům simulovat účinky svého odkupu v aktuálním bloku.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Tato funkce odkoupí určitý počet `shares` od `owner`a a odešle `assets` podkladového tokenu z trezoru `receiver`ovi.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Vrací celkový počet neodkoupených podílů v trezoru v oběhu.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Vrací celkové množství podílů v trezoru, které `owner` aktuálně má.

### Mapa rozhraní {#mapOfTheInterface}

![Mapa rozhraní ERC-4626](./map-of-erc-4626.png)

### Události {#events}

#### Událost vkladu

**MUSÍ** být emitována při vložení tokenů do trezoru pomocí metod [`mint`](#mint) a [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Kde `sender` je uživatel, který vyměnil `assets` za `shares` a převedl tyto `shares` na `owner`a.

#### Událost výběru

**MUSÍ** být emitována, když jsou podíly vybrány z trezoru vkladatelem v metodách [`redeem`](#redeem) nebo [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Kde `sender` je uživatel, který spustil výběr a vyměnil `shares` ve vlastnictví `owner`a za `assets`. `receiver` je uživatel, který obdržel vybrané `assets`.

## Další čtení {#further-reading}

- [EIP-4626: Standard tokenizovaného trezoru](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: GitHub repozitář](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
