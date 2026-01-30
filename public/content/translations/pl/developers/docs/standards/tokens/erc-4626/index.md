---
title: Standard tokenizowanego skarbca ERC-4626
description: Standard dla skarbców przynoszących zyski.
lang: pl
---

## Wprowadzenie {#introduction}

ERC-4626 to standard mający na celu optymalizację i ujednolicenie parametrów technicznych skarbców przynoszących zyski. Zapewnia on standardowe API dla tokenizowanych skarbców przynoszących zyski, które reprezentują udziały pojedynczego bazowego tokena ERC-20. ERC-4626 określa również opcjonalne rozszerzenie dla tokenizowanych skarbców wykorzystujących ERC-20, oferując podstawową funkcjonalność do wpłacania i wypłacania tokenów oraz odczytywania sald.

**Rola ERC-4626 w skarbcach przynoszących zyski**

Rynki pożyczkowe, agregatory i samoistnie przynoszące oprocentowanie tokeny pomagają użytkownikom znaleźć najlepszy zysk z ich tokenów kryptowalutowych poprzez wykonywanie różnych strategii. Strategie te są realizowane z niewielkimi różnicami, które mogą być podatne na błędy lub marnować zasoby programistyczne.

ERC-4626 w skarbcach przynoszących zyski zmniejszy wysiłek związany z integracją i odblokuje dostęp do zysków w różnych aplikacjach przy niewielkim specjalistycznym wysiłku ze strony deweloperów, tworząc bardziej spójne i solidne wzorce implementacji.

Token ERC-4626 jest w pełni opisany w [EIP-4626](https://eips.ethereum.org/EIPS/eip-4626).

**Asynchroniczne rozszerzenie skarbca (ERC-7540)**

ERC-4626 jest zoptymalizowany pod kątem atomowych depozytów i wykupów do określonego limitu. Jeśli limit zostanie osiągnięty, nie można złożyć nowych depozytów, ani wykupów. To ograniczenie nie sprawdza się w przypadku systemu inteligentnych kontraktów, w których warunkiem interakcji ze skarbcem są asynchroniczne działania lub opóźnienia (np. protokoły aktywów ze świata rzeczywistego, protokoły pożyczek niezabezpieczonych w pełni, protokoły pożyczania międzyłańcuchowego, tokeny płynnego stakingu czy moduły bezpieczeństwa ubezpieczeniowego).

ERC-7540 rozszerza użyteczność skarbców ERC-4626 na potrzeby przypadków użycia asynchronicznego. Istniejący interfejs skarbca (`deposit`/`withdraw`/`mint`/`redeem`) jest w pełni wykorzystywany do obsługi asynchronicznych żądań.

Rozszerzenie ERC-7540 jest w pełni opisane w [ERC-7540](https://eips.ethereum.org/EIPS/eip-7540).

**Wieloaktywowe rozszerzenie skarbca (ERC-7575)**

Jednym z brakujących przypadków użycia, których nie obsługuje ERC-4626, są skarbce posiadające wiele aktywów lub punkty wejścia, takie jak tokeny dostawców płynności (LP). Zazwyczaj są one niepraktyczne lub niezgodne ze standardem ze względu na wymóg, aby ERC-4626 sam w sobie był ERC-20.

ERC-7575 dodaje obsługę skarbców z wieloma aktywami poprzez wyodrębnienie implementacji tokena ERC-20 z implementacji ERC-4626.

Rozszerzenie ERC-7575 jest w pełni opisane w [ERC-7575](https://eips.ethereum.org/EIPS/eip-7575).

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [standardach tokenów](/developers/docs/standards/tokens/) i [ERC-20](/developers/docs/standards/tokens/erc-20/).

## Funkcje i cechy ERC-4626: {#body}

### Metody {#methods}

#### aktywo {#asset}

```solidity
function asset() public view returns (address assetTokenAddress)
```

Ta funkcja zwraca adres bazowego tokena wykorzystanego w skarbcu do księgowania, wpłacania i wypłacania.

#### totalAssets {#totalassets}

```solidity
function totalAssets() public view returns (uint256)
```

Ta funkcja zwraca całkowitą ilość bazowych aktywów przechowywanych przez skarbiec.

#### convertToShares {#convertoshares}

```solidity
function convertToShares(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja zwraca ilość `shares`, na które skarbiec wymieniłby podaną ilość `assets`.

#### convertToAssets {#convertoassets}

```solidity
function convertToAssets(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja zwraca ilość `assets`, na które skarbiec wymieniłby podaną ilość `shares`.

#### maxDeposit {#maxdeposit}

```solidity
function maxDeposit(address receiver) public view returns (uint256 maxAssets)
```

Ta funkcja zwraca maksymalną ilość aktywów bazowych, które mogą zostać zdeponowane w jednym wywołaniu [`deposit`](#deposit), przy czym udziały są wybijane dla `receiver`.

#### previewDeposit {#previewdeposit}

```solidity
function previewDeposit(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja pozwala użytkownikom na symulowanie efektów ich wpłaty w bieżącym bloku.

#### deposit {#deposit}

```solidity
function deposit(uint256 assets, address receiver) public returns (uint256 shares)
```

Ta funkcja deponuje `assets` tokenów bazowych w skarbcu i przyznaje prawo własności do `shares` dla `receiver`.

#### maxMint {#maxmint}

```solidity
function maxMint(address receiver) public view returns (uint256 maxShares)
```

Ta funkcja zwraca maksymalną liczbę udziałów, które mogą zostać wybite w jednym wywołaniu [`mint`](#mint), przy czym udziały są wybijane dla `receiver`.

#### previewMint {#previewmint}

```solidity
function previewMint(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja pozwala użytkownikom na symulowanie efektów ich wybicia w bieżącym bloku.

#### mint {#mint}

```solidity
function mint(uint256 shares, address receiver) public returns (uint256 assets)
```

Ta funkcja wybija dokładnie `shares` udziałów skarbca dla `receiver` poprzez zdeponowanie `assets` tokenów bazowych.

#### maxWithdraw {#maxwithdraw}

```solidity
function maxWithdraw(address owner) public view returns (uint256 maxAssets)
```

Ta funkcja zwraca maksymalną ilość aktywów bazowych, które można wypłacić z salda `owner` w jednym wywołaniu [`withdraw`](#withdraw).

#### previewWithdraw {#previewwithdraw}

```solidity
function previewWithdraw(uint256 assets) public view returns (uint256 shares)
```

Ta funkcja pozwala użytkownikom na symulowanie efektów ich wypłaty w bieżącym bloku.

#### withdraw {#withdraw}

```solidity
function withdraw(uint256 assets, address receiver, address owner) public returns (uint256 shares)
```

Ta funkcja spala `shares` od `owner` i wysyła dokładnie `assets` tokenów ze skarbca do `receiver`.

#### maxRedeem {#maxredeem}

```solidity
function maxRedeem(address owner) public view returns (uint256 maxShares)
```

Ta funkcja zwraca maksymalną liczbę udziałów, które można wykupić z salda `owner` za pomocą wywołania [`redeem`](#redeem).

#### previewRedeem {#previewredeem}

```solidity
function previewRedeem(uint256 shares) public view returns (uint256 assets)
```

Ta funkcja pozwala użytkownikom na symulowanie efektów ich wykupienia w bieżącym bloku.

#### redeem {#redeem}

```solidity
function redeem(uint256 shares, address receiver, address owner) public returns (uint256 assets)
```

Ta funkcja wykupuje określoną liczbę `shares` od `owner` i wysyła `assets` tokena bazowego ze skarbca do `receiver`.

#### totalSupply {#totalsupply}

```solidity
function totalSupply() public view returns (uint256)
```

Zwraca całkowitą liczbę niewykupionych udziałów skarbca w obiegu.

#### balanceOf {#balanceof}

```solidity
function balanceOf(address owner) public view returns (uint256)
```

Zwraca całkowitą liczbę udziałów skarbca, jaką aktualnie posiada `owner`.

### Mapa interfejsu {#mapOfTheInterface}

![Mapa interfejsu ERC-4626](./map-of-erc-4626.png)

### Zdarzenia {#events}

#### Wydarzenie Deposit

**MUSI** być emitowane, gdy tokeny są deponowane w skarbcu za pomocą metod [`mint`](#mint) i [`deposit`](#deposit).

```solidity
event Deposit(
    address indexed sender,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Gdzie `sender` to użytkownik, który wymienił `assets` na `shares` i przeniósł te `shares` na `owner`.

#### Wydarzenie Withdraw

**MUSI** być emitowane, gdy udziały są wypłacane ze skarbca przez deponenta za pomocą metod [`redeem`](#redeem) lub [`withdraw`](#withdraw).

```solidity
event Withdraw(
    address indexed sender,
    address indexed receiver,
    address indexed owner,
    uint256 assets,
    uint256 shares
)
```

Gdzie `sender` to użytkownik, który zainicjował wypłatę i wymienił `shares` należące do `owner` na `assets`. `receiver` jest użytkownikiem, który otrzymał wypłacone `assets`.

## Dalsza lektura {#further-reading}

- [EIP-4626: Standard tokenizowanego skarbca](https://eips.ethereum.org/EIPS/eip-4626)
- [ERC-4626: Repozytorium na GitHubie](https://github.com/transmissions11/solmate/blob/main/src/tokens/ERC4626.sol)
