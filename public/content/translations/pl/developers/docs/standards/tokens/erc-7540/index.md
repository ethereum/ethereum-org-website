---
title: Standard asynchronicznego stokenizowanego skarbca ERC-7540
description: "Rozszerzenie ERC-4626, które dodaje asynchroniczne przepływy depozytów i umorzeń dla stokenizowanych skarbców."
lang: pl
---

## Wprowadzenie {#introduction}

ERC-7540 rozszerza [standard stokenizowanego skarbca ERC-4626](/developers/docs/standards/tokens/erc-4626/), dodając obsługę asynchronicznych przepływów depozytów i umorzeń. Wprowadza wzorzec żądania, a następnie odbioru (request-then-claim): użytkownicy najpierw przesyłają żądanie (przekazując swoje aktywa lub udziały do skarbca), a następnie odbierają wynik po jego przetworzeniu przez skarbiec.

Jest to potrzebne, gdy skarbiec nie może dokonać natychmiastowego rozrachunku w jednej transakcji, na przykład:

- Protokoły aktywów świata rzeczywistego (RWA), takie jak stokenizowane obligacje skarbowe, kredyty prywatne i inne aktywa z cyklami rozrachunku T+1 lub T+2
- Pożyczanie z niepełnym zabezpieczeniem, gdzie ocena zdolności kredytowej odbywa się pozałańcuchowo
- Międzyłańcuchowe strategie skarbca, gdzie mostowanie wprowadza opóźnienia
- Tokeny płynnego stakingu (LST) z okresami odwiązania

Skarbce mogą zdecydować się na asynchroniczność tylko dla depozytów, tylko dla umorzeń lub dla obu. Ta elastyczność pozwala deweloperom skarbców dodawać przepływy asynchroniczne tylko tam, gdzie wymaga tego bazowa strategia, zachowując drugą stronę jako synchroniczną.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o [standardach tokenów](/developers/docs/standards/tokens/), [ERC-20](/developers/docs/standards/tokens/erc-20/) oraz [ERC-4626](/developers/docs/standards/tokens/erc-4626/).

## ERC-4626 a ERC-7540 {#comparison}

W ERC-4626 rozrachunek depozytu następuje atomowo: inwestor wysyła aktywa i otrzymuje z powrotem udziały w pojedynczej transakcji.

<VaultDepositDiagram />

ERC-7540 dzieli to na dwa kroki. Inwestor najpierw wywołuje `requestDeposit()`, co transferuje jego aktywa do skarbca, a następnie czeka, aż skarbiec przetworzy żądanie. To, jak i kiedy to nastąpi, zależy od skarbca, na przykład po zakończeniu pozałańcuchowego rozrachunku. Po zrealizowaniu, inwestor wywołuje `deposit()`, aby odebrać swoje udziały. Kurs wymiany nie jest ustalony w momencie żądania: skarbiec ustala go, zazwyczaj w momencie realizacji żądania, więc otrzymane udziały mogą różnić się od tego, co zwróciło `convertToShares()` w momencie składania żądania.

<AsyncVaultDiagram />

Przepływ umorzenia działa w ten sam sposób: `requestRedeem()` pobiera udziały od inwestora, a po zrealizowaniu inwestor wywołuje `redeem()`, aby odebrać aktywa.

## Funkcje i cechy ERC-7540 {#body}

ERC-7540 dziedziczy pełny interfejs ERC-4626, ale zmienia przeznaczenie `deposit`/`mint`/`withdraw`/`redeem` na funkcje odbioru. Nowe funkcje `requestDeposit` i `requestRedeem` obsługują początkowy krok żądania.

Każde żądanie przechodzi przez trzy stany: oczekujące (przesłane, oczekujące na przetworzenie), możliwe do odebrania (zrealizowane i wycenione) oraz odebrane (inwestor odebrał swoje udziały lub aktywa). Skarbiec może sprawić, że żądanie będzie możliwe do odebrania natychmiast, pomijając stan oczekiwania, ale odbiór jest zawsze oddzielnym wywołaniem. Standard nie definiuje żadnego zdarzenia dla momentu, w którym żądanie staje się możliwe do odebrania.

<VaultRequestDiagram />

### Przepływ żądania depozytu {#deposit-request-flow}

#### requestDeposit {#requestdeposit}

```solidity
function requestDeposit(uint256 assets, address controller, address owner) external returns (uint256 requestId)
```

Wykonuje transfer `assets` z `owner` do skarbca i przesyła żądanie depozytu. Adres `controller` otrzymuje kontrolę nad żądaniem. Zwraca `requestId` identyfikujący partię żądań.

#### pendingDepositRequest {#pendingdepositrequest}

```solidity
function pendingDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Zwraca kwotę `assets` w oczekującym (jeszcze niemożliwym do odebrania) żądaniu depozytu dla danego `controller` i `requestId`.

#### claimableDepositRequest {#claimabledepositrequest}

```solidity
function claimableDepositRequest(uint256 requestId, address controller) external view returns (uint256 assets)
```

Zwraca kwotę `assets` w możliwym do odebrania (zrealizowanym, ale jeszcze nieodebranym) żądaniu depozytu dla danego `controller` i `requestId`.

#### Odbieranie depozytów {#claiming-deposits}

Gdy żądanie depozytu staje się możliwe do odebrania, użytkownik wywołuje standardową funkcję ERC-4626 [`deposit`](/developers/docs/standards/tokens/erc-4626/#deposit) lub [`mint`](/developers/docs/standards/tokens/erc-4626/#mint), aby odebrać swoje udziały. W ERC-7540 funkcje te nie wykonują już transferu aktywów (to nastąpiło w momencie żądania). Wybijają one jedynie udziały dla odbiorcy.

### Przepływ żądania umorzenia {#redemption-request-flow}

#### requestRedeem {#requestredeem}

```solidity
function requestRedeem(uint256 shares, address controller, address owner) external returns (uint256 requestId)
```

Przejmuje kontrolę nad `shares` od `owner` i przesyła żądanie umorzenia. Skarbiec może zatrzymać udziały do momentu odebrania żądania lub spalić je od razu. Adres `controller` otrzymuje kontrolę nad żądaniem.

#### pendingRedeemRequest {#pendingredeemrequest}

```solidity
function pendingRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Zwraca kwotę `shares` w oczekującym żądaniu umorzenia dla danego `controller` i `requestId`.

#### claimableRedeemRequest {#claimableredeemrequest}

```solidity
function claimableRedeemRequest(uint256 requestId, address controller) external view returns (uint256 shares)
```

Zwraca kwotę `shares` w możliwym do odebrania żądaniu umorzenia dla danego `controller` i `requestId`.

#### Odbieranie umorzeń {#claiming-redemptions}

Gdy żądanie umorzenia staje się możliwe do odebrania, użytkownik wywołuje standardową funkcję ERC-4626 [`redeem`](/developers/docs/standards/tokens/erc-4626/#redeem) lub [`withdraw`](/developers/docs/standards/tokens/erc-4626/#withdraw), aby odebrać swoje aktywa.

### Zarządzanie operatorami {#operator-management}

ERC-7540 zawiera wzorzec operatora (z [ERC-6909](https://eips.ethereum.org/EIPS/eip-6909)), który pozwala stronom trzecim zarządzać żądaniami w imieniu użytkownika.

#### setOperator {#setoperator}

```solidity
function setOperator(address operator, bool approved) external returns (bool)
```

Zatwierdza lub odwołuje `operator` do działania w imieniu `msg.sender` w przypadku żądań depozytu/umorzenia i roszczeń.

#### isOperator {#isoperator}

```solidity
function isOperator(address controller, address operator) external view returns (bool)
```

Zwraca informację, czy `operator` jest zatwierdzony do działania w imieniu `controller`.

### Identyfikatory żądań {#request-ids}

Identyfikatory żądań odróżniają od siebie różne partie żądań. Wszystkie żądania współdzielące ten sam `requestId` są zamienne: przechodzą między stanami razem i otrzymują ten sam kurs wymiany.

Gdy skarbiec zwraca `requestId = 0` dla wszystkich żądań, tylko adres `controller` różnicuje stan żądania. Wiele żądań od tego samego kontrolera jest agregowanych.

### Zdarzenia {#events}

#### Zdarzenie DepositRequest {#depositrequest-event}

MUSI zostać wyemitowane, gdy żądanie depozytu zostanie przesłane za pośrednictwem [`requestDeposit`](#requestdeposit).

```solidity
event DepositRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 assets
)
```

#### Zdarzenie RedeemRequest {#redeemrequest-event}

MUSI zostać wyemitowane, gdy żądanie umorzenia zostanie przesłane za pośrednictwem [`requestRedeem`](#requestredeem).

```solidity
event RedeemRequest(
    address indexed controller,
    address indexed owner,
    uint256 indexed requestId,
    address sender,
    uint256 shares
)
```

#### Zdarzenie OperatorSet {#operatorset-event}

MUSI zostać wyemitowane, gdy operator zostanie zatwierdzony lub odwołany za pośrednictwem [`setOperator`](#setoperator).

```solidity
event OperatorSet(
    address indexed controller,
    address indexed operator,
    bool approved
)
```

### Funkcje podglądu {#preview-functions}

Funkcje podglądu muszą zostać wycofane tylko dla przepływów, które są asynchroniczne, ponieważ kurs wymiany nie jest znany, dopóki żądanie nie zostanie zrealizowane. W skarbcu z asynchronicznym depozytem `previewDeposit` i `previewMint` MUSZĄ zostać wycofane, podczas gdy `previewRedeem` i `previewWithdraw` nadal działają jak w ERC-4626 (i odwrotnie dla skarbca z asynchronicznym umorzeniem). Jest to kluczowa różnica w zachowaniu w stosunku do ERC-4626.

## Dalsza lektura {#further-reading}

- [EIP-7540: Asynchroniczne stokenizowane skarbce ERC-4626](https://eips.ethereum.org/EIPS/eip-7540)
- [EIP-4626: Standard stokenizowanego skarbca](https://eips.ethereum.org/EIPS/eip-4626)
- [Implementacja ERC-7540 od OpenZeppelin](https://github.com/OpenZeppelin/openzeppelin-community-contracts/blob/master/contracts/token/ERC20/extensions/ERC7540.sol)
