---
title: Standard stokenizowanego skarbca ERC-4626
description: Standard dla skarbców przynoszących zysk.
lang: pl
---

## Wprowadzenie {#introduction}

ERC-4626 to standard optymalizujący i ujednolicający parametry techniczne skarbców przynoszących zysk. Zapewnia on standardowe API dla stokenizowanych skarbców przynoszących zysk, które reprezentują udziały w pojedynczym bazowym tokenie ERC-20. ERC-4626 określa również opcjonalne rozszerzenie dla stokenizowanych skarbców wykorzystujących ERC-20, oferując podstawową funkcjonalność deponowania, wypłacania tokenów i odczytywania sald.

**Rola ERC-4626 w skarbcach przynoszących zysk**

Rynki pożyczkowe, agregatory i tokeny z natury przynoszące odsetki pomagają użytkownikom znaleźć najlepszy zysk na ich tokenach krypto poprzez realizację różnych strategii. Strategie te są realizowane z niewielkimi różnicami, co może być podatne na błędy lub marnować zasoby programistyczne.

ERC-4626 w skarbcach przynoszących zysk zmniejszy wysiłek integracyjny i odblokuje dostęp do zysków w różnych aplikacjach przy niewielkim specjalistycznym wysiłku ze strony programistów, tworząc bardziej spójne i solidne wzorce implementacji.

Token ERC-4626 jest w pełni opisany w [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Asynchroniczne rozszerzenie skarbca (ERC-7540)**

ERC-4626 jest zoptymalizowany pod kątem atomowych depozytów i umorzeń do określonego limitu. Jeśli limit zostanie osiągnięty, nie można składać nowych depozytów ani umorzeń. To ograniczenie nie sprawdza się dobrze w żadnym systemie inteligentnych kontraktów z asynchronicznymi działaniami lub opóźnieniami jako warunkiem wstępnym do interakcji ze Skarbcem (np. protokoły aktywów ze świata rzeczywistego, protokoły pożyczkowe z niepełnym zabezpieczeniem, międzyłańcuchowe protokoły pożyczkowe, tokeny płynnego stakingu (LST) lub ubezpieczeniowe moduły bezpieczeństwa).

ERC-7540 rozszerza użyteczność Skarbców ERC-4626 dla przypadków użycia asynchronicznego. Istniejący interfejs Skarbca (`deposit`/`withdraw`/`mint`/`redeem`) jest w pełni wykorzystywany do odbierania asynchronicznych Żądań.

Rozszerzenie ERC-7540 jest w pełni opisane w [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Wieloaktywowe rozszerzenie skarbca (ERC-7575)**

Jednym z brakujących przypadków użycia, który nie jest obsługiwany przez ERC-4626, są Skarbce posiadające wiele aktywów lub punktów wejścia, takie jak tokeny dostawcy płynności (LP). Są one na ogół nieporęczne lub niezgodne ze standardem ze względu na wymóg, aby sam ERC-4626 był tokenem ERC-20.

ERC-7575 dodaje obsługę Skarbców z wieloma aktywami poprzez wyodrębnienie implementacji tokena ERC-20 z implementacji ERC-4626.

Rozszerzenie ERC-7575 jest w pełni opisane w [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [standardach tokenów](/developers/docs/standards/tokens/) i [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funkcje i cechy ERC-4626: {#body}

### Metody {#methods}

#### asset {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Ta funkcja zwraca adres bazowego tokena używanego przez skarbiec do księgowania, deponowania i wypłacania.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Ta funkcja zwraca całkowitą kwotę aktywów bazowych przechowywanych przez skarbiec.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja zwraca ilość `shares`, która zostałaby wymieniona przez skarbiec na podaną ilość `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja zwraca ilość `assets`, która zostałaby wymieniona przez skarbiec na podaną ilość `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Ta funkcja zwraca maksymalną kwotę aktywów bazowych, które można zdeponować w pojedynczym wywołaniu [`deposit`](#deposit), z udziałami wybitymi dla `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja pozwala użytkownikom symulować efekty ich depozytu w bieżącym bloku.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Ta funkcja deponuje `assets` tokenów bazowych w skarbcu i przyznaje własność `shares` dla `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Ta funkcja zwraca maksymalną liczbę udziałów, które można wybić w pojedynczym wywołaniu [`mint`](#mint), z udziałami wybitymi dla `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja pozwala użytkownikom symulować efekty ich wybicia w bieżącym bloku.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Ta funkcja wybija dokładnie `shares` udziałów skarbca dla `receiver` poprzez zdeponowanie `assets` tokenów bazowych.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Ta funkcja zwraca maksymalną kwotę aktywów bazowych, które można wypłacić z salda `owner` za pomocą pojedynczego wywołania [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja pozwala użytkownikom symulować efekty ich wypłaty w bieżącym bloku.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Ta funkcja spala `shares` z `owner` i wysyła dokładnie `assets` tokenów ze skarbca do `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Ta funkcja zwraca maksymalną liczbę udziałów, które można umorzyć z salda `owner` poprzez wywołanie [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja pozwala użytkownikom symulować efekty ich umorzenia w bieżącym bloku.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Ta funkcja umarza określoną liczbę `shares` z `owner` i wysyła `assets` tokena bazowego ze skarbca do `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Zwraca całkowitą liczbę nieumorzonych udziałów skarbca w obiegu.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Zwraca całkowitą liczbę udziałów skarbca, które obecnie posiada `owner`.

### Mapa interfejsu {#mapoftheinterface}

![Map of the ERC-4626 interface](./map-of-erc-4626.png)

### Zdarzenia {#events}

#### Zdarzenie Deposit {#deposit-event}

**MUSI** zostać wyemitowane, gdy tokeny są deponowane w skarbcu za pomocą metod [`mint`](#mint) i [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Gdzie `sender` to użytkownik, który wymienił `assets` na `shares` i przetransferował te `shares` do `owner`.

#### Zdarzenie Withdraw {#withdraw-event}

**MUSI** zostać wyemitowane, gdy udziały są wypłacane ze skarbca przez deponenta w metodach [`redeem`](#redeem) lub [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Gdzie `sender` to użytkownik, który zainicjował wypłatę i wymienił `shares`, należące do `owner`, na `assets`. `receiver` to użytkownik, który otrzymał wypłacone `assets`.

## Dalsza lektura {#further-reading}

- [EIP-4626: Standard stokenizowanego skarbca](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repozytorium GitHub](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)