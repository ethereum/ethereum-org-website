---
title: "Standard tokenizovaného trezoru ERC-4626"
description: "Standard pro trezory nesoucí výnos."
lang: cs
---

## Úvod {#introduction}

ERC-4626 je standard pro optimalizaci a sjednocení technických parametrů trezorů nesoucích výnos. Poskytuje standardní API pro tokenizované trezory nesoucí výnos, které představují podíly jediného podkladového tokenu ERC-20. ERC-4626 také nastiňuje volitelné rozšíření pro tokenizované trezory využívající ERC-20, které nabízí základní funkce pro vkládání, výběr tokenů a čtení zůstatků.

**Role ERC-4626 v trezorech nesoucích výnos**

Trhy pro půjčování, agregátory a tokeny, které ze své podstaty nesou úrok, pomáhají uživatelům najít nejlepší výnos z jejich krypto tokenů prováděním různých strategií. Tyto strategie se provádějí s drobnými odchylkami, což může být náchylné k chybám nebo plýtvat vývojářskými zdroji.

ERC-4626 v trezorech nesoucích výnos sníží úsilí při integraci a odemkne přístup k výnosům v různých aplikacích s minimálním specializovaným úsilím vývojářů tím, že vytvoří konzistentnější a robustnější vzorce implementace.

Token ERC-4626 je plně popsán v [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Asynchronní rozšíření trezoru (ERC-7540)**

ERC-4626 je optimalizován pro atomické vklady a odkupy až do určitého limitu. Pokud je limit dosažen, nelze zadávat žádné nové vklady ani odkupy. Toto omezení nefunguje dobře pro žádný systém chytrých kontraktů s asynchronními akcemi nebo zpožděními jako předpokladem pro propojení s trezorem (např. protokoly reálných aktiv, protokoly pro půjčování s nedostatečným zajištěním, meziřetězcové protokoly pro půjčování, tokeny likvidního stakingu (LST) nebo bezpečnostní moduly pojištění).

ERC-7540 rozšiřuje užitečnost trezorů ERC-4626 pro asynchronní případy použití. Stávající rozhraní trezoru (`deposit`/`withdraw`/`mint`/`redeem`) je plně využito k nárokování asynchronních požadavků.

Rozšíření ERC-7540 je plně popsáno v [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Rozšíření trezoru pro více aktiv (ERC-7575)**

Jedním chybějícím případem použití, který ERC-4626 nepodporuje, jsou trezory, které mají více aktiv nebo vstupních bodů, jako jsou tokeny poskytovatele likvidity (LP). Ty jsou obecně nepraktické nebo nevyhovující kvůli požadavku, aby samotný ERC-4626 byl ERC-20.

ERC-7575 přidává podporu pro trezory s více aktivy tím, že externalizuje implementaci tokenu ERC-20 z implementace ERC-4626.

Rozšíření ERC-7575 je plně popsáno v [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Předpoklady {#prerequisites}

Pro lepší pochopení této stránky doporučujeme nejprve si přečíst o [standardech tokenů](/developers/docs/standards/tokens/) a [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funkce a vlastnosti ERC-4626: {#body}

### Metody {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Tato funkce vrací adresu podkladového tokenu používaného pro trezor k účtování, vkládání a výběrům.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Tato funkce vrací celkové množství podkladových aktiv držených trezorem.

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

Tato funkce vrací maximální množství podkladových aktiv, které lze vložit v jediném volání [`deposit`](#deposit), přičemž podíly jsou raženy pro `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Tato funkce umožňuje uživatelům simulovat účinky jejich vkladu v aktuálním bloku.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Tato funkce vloží `assets` podkladových tokenů do trezoru a udělí vlastnictví `shares` uživateli `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Tato funkce vrací maximální množství podílů, které lze razit v jediném volání [`mint`](#mint), přičemž podíly jsou raženy pro `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Tato funkce umožňuje uživatelům simulovat účinky jejich ražby v aktuálním bloku.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Tato funkce vyrazí přesně `shares` podílů trezoru pro `receiver` vložením `assets` podkladových tokenů.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Tato funkce vrací maximální množství podkladových aktiv, které lze vybrat ze zůstatku `owner` jediným voláním [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Tato funkce umožňuje uživatelům simulovat účinky jejich výběru v aktuálním bloku.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Tato funkce spálí `shares` od `owner` a odešle přesně `assets` tokenů z trezoru uživateli `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Tato funkce vrací maximální množství podílů, které lze odkoupit ze zůstatku `owner` prostřednictvím volání [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Tato funkce umožňuje uživatelům simulovat účinky jejich odkupu v aktuálním bloku.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Tato funkce odkoupí konkrétní počet `shares` od `owner` a odešle `assets` podkladového tokenu z trezoru uživateli `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Vrací celkový počet neodkoupených podílů trezoru v oběhu.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Vrací celkové množství podílů trezoru, které `owner` aktuálně má.

### Mapa rozhraní {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Události {#events}

#### Událost vkladu {#deposit-event}

**MUSÍ** být vyvolána, když jsou tokeny vloženy do trezoru prostřednictvím metod [`mint`](#mint) a [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Kde `sender` je uživatel, který vyměnil `assets` za `shares` a převedl tyto `shares` na `owner`.

#### Událost výběru {#withdraw-event}

**MUSÍ** být vyvolána, když jsou podíly vybrány z trezoru vkladatelem v metodách [`redeem`](#redeem) nebo [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Kde `sender` je uživatel, který inicioval výběr a vyměnil `shares`, vlastněné `owner`, za `assets`. `receiver` je uživatel, který obdržel vybrané `assets`.

## Další čtení {#further-reading}

- [EIP-4626: Standard tokenizovaného trezoru](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repozitář na GitHubu](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)