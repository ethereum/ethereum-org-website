---
title: "Standard tokenów płatnych ERC-1363"
description: "ERC-1363 to rozszerzony interfejs dla tokenów ERC-20, który umożliwia wykonanie niestandardowej logiki w kontrakcie odbiorcy po transferach lub w kontrakcie wydającego po zatwierdzeniach, a wszystko to w ramach jednej transakcji."
lang: pl
---

## Wprowadzenie {#introduction}

### Czym jest ERC-1363? {#what-is-erc1363}

ERC-1363 to rozszerzony interfejs dla tokenów ERC-20, który umożliwia wykonanie niestandardowej logiki w kontrakcie odbiorcy po transferach lub w kontrakcie wydającego po zatwierdzeniach, a wszystko to w ramach jednej transakcji.

### Różnice w stosunku do ERC-20 {#erc20-differences}

Standardowe operacje ERC-20, takie jak `transfer`, `transferFrom` i `approve`, nie pozwalają na wykonanie kodu w kontrakcie odbiorcy lub wydającego bez oddzielnej transakcji.
Wprowadza to złożoność w tworzeniu interfejsu użytkownika i utrudnia adaptację, ponieważ użytkownicy muszą czekać na wykonanie pierwszej transakcji, a następnie przesłać drugą.
Muszą również dwukrotnie zapłacić za GAZ.

ERC-1363 sprawia, że tokeny zamienne mogą łatwiej wykonywać działania i działać bez użycia jakiegokolwiek nasłuchiwacza off-chain.
Pozwala to na wykonanie wywołania zwrotnego w kontrakcie odbiorcy lub wydającego po transferze lub zatwierdzeniu, w ramach jednej transakcji.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o:

- [Standardy tokenów](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Treść {#body}

ERC-1363 wprowadza standardowe API dla tokenów ERC-20 do interakcji z inteligentnymi kontraktami po operacjach `transfer`, `transferFrom` lub `approve`.

Standard ten zapewnia podstawową funkcjonalność transferu tokenów, a także umożliwia zatwierdzanie tokenów, aby mogły być wydawane przez inną stronę trzecią on-chain, a następnie wykonanie wywołania zwrotnego w kontrakcie odbiorcy lub wydającego.

Istnieje wiele proponowanych zastosowań inteligentnych kontraktów, które mogą akceptować wywołania zwrotne ERC-20.

Przykłady:

- **Crowdsale**: wysłane tokeny powodują natychmiastową alokację nagród.
- **Usługi**: płatność aktywuje dostęp do usługi w jednym kroku.
- **Faktury**: tokeny automatycznie regulują faktury.
- **Subskrypcje**: zatwierdzenie rocznej stawki aktywuje subskrypcję wraz z płatnością za pierwszy miesiąc.

Z tych powodów pierwotnie nazwano go **"Tokenem płatnym"**.

Zachowanie wywołania zwrotnego dodatkowo rozszerza jego użyteczność, umożliwiając płynne interakcje, takie jak:

- **Staking**: przetransferowane tokeny powodują automatyczną blokadę w kontrakcie stakingowym.
- **Głosowanie**: otrzymane tokeny rejestrują głosy w systemie zarządzania.
- **Wymiana**: zatwierdzenia tokenów aktywują logikę wymiany w jednym kroku.

Tokeny ERC-1363 mogą być używane do określonych zastosowań we wszystkich przypadkach, które wymagają wykonania wywołania zwrotnego po otrzymaniu transferu lub zatwierdzenia.
ERC-1363 jest również przydatny do unikania utraty lub blokowania tokenów w inteligentnych kontraktach poprzez weryfikację zdolności odbiorcy do obsługi tokenów.

W przeciwieństwie do innych propozycji rozszerzeń ERC-20, ERC-1363 nie nadpisuje metod `transfer` i `transferFrom` z ERC-20 i definiuje ID interfejsów do zaimplementowania, zachowując wsteczną kompatybilność z ERC-20.

Na podstawie [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metody {#methods}

Inteligentne kontrakty implementujące standard ERC-1363 **MUSZĄ** implementować wszystkie funkcje z interfejsu `ERC1363`, a także interfejsy `ERC20` i `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Interfejs rozszerzający dla tokenów ERC-20, który umożliwia wykonanie kodu w kontrakcie odbiorcy
 * po `transfer` lub `transferFrom` lub kodu w kontrakcie wydającego po `approve`, w ramach jednej transakcji.
 */
interface ERC1363 is ERC20, ERC165 {
  /*
   * UWAGA: identyfikator ERC-165 dla tego interfejsu to 0xb0202a11.
   * 0xb0202a11 ===
   *   bytes4(keccak256('transferAndCall(address,uint256)')) ^
   *   bytes4(keccak256('transferAndCall(address,uint256,bytes)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256)')) ^
   *   bytes4(keccak256('transferFromAndCall(address,address,uint256,bytes)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256)')) ^
   *   bytes4(keccak256('approveAndCall(address,uint256,bytes)'))
   */

  /**
   * @dev Przenosi `value` tokenów z konta wywołującego do `to`,
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adres, na który tokeny są przesyłane.
   * @param value Ilość tokenów do przesłania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Przenosi `value` tokenów z konta wywołującego do `to`,
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adres, na który tokeny są przesyłane.
   * @param value Ilość tokenów do przesłania.
   * @param data Dodatkowe dane bez określonego formatu, wysyłane w wywołaniu do `to`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Przenosi `value` tokenów z `from` do `to` za pomocą mechanizmu allowance
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adres, z którego wysyłane są tokeny.
   * @param to Adres, na który tokeny są przesyłane.
   * @param value Ilość tokenów do przesłania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Przenosi `value` tokenów z `from` do `to` za pomocą mechanizmu allowance
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adres, z którego wysyłane są tokeny.
   * @param to Adres, na który tokeny są przesyłane.
   * @param value Ilość tokenów do przesłania.
   * @param data Dodatkowe dane bez określonego formatu, wysyłane w wywołaniu do `to`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Ustawia `value` tokenów jako allowance dla `spender` nad tokenami wywołującego
   * i następnie wywołuje `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adres, który wyda środki.
   * @param value Ilość tokenów do wydania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Ustawia `value` tokenów jako allowance dla `spender` nad tokenami wywołującego
   * i następnie wywołuje `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adres, który wyda środki.
   * @param value Ilość tokenów do wydania.
   * @param data Dodatkowe dane bez określonego formatu, wysyłane w wywołaniu do `spender`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, chyba że zostanie zgłoszony błąd.
   */
  function approveAndCall(address spender, uint256 value, bytes calldata data) external returns (bool);
}

interface ERC20 {
  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
  function transfer(address to, uint256 value) external returns (bool);
  function transferFrom(address from, address to, uint256 value) external returns (bool);
  function approve(address spender, uint256 value) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address account) external view returns (uint256);
  function allowance(address owner, address spender) external view returns (uint256);
}

interface ERC165 {
  function supportsInterface(bytes4 interfaceId) external view returns (bool);
}
```

Inteligentny kontrakt, który chce akceptować tokeny ERC-1363 za pośrednictwem `transferAndCall` lub `transferFromAndCall`, **MUSI** zaimplementować interfejs `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interfejs dla każdego kontraktu, który chce wspierać `transferAndCall` lub `transferFromAndCall` z kontraktów tokenów ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Ilekroć tokeny ERC-1363 są przesyłane do tego kontraktu za pośrednictwem `ERC1363::transferAndCall` lub `ERC1363::transferFromAndCall`
   * przez `operator` z `from`, ta funkcja jest wywoływana.
   *
   * UWAGA: Aby zaakceptować transfer, funkcja musi zwrócić
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (tj. 0x88a7ca5c lub własny selektor funkcji).
   *
   * @param operator Adres, który wywołał funkcję `transferAndCall` lub `transferFromAndCall`.
   * @param from Adres, z którego przesyłane są tokeny.
   * @param value Ilość przesłanych tokenów.
   * @param data Dodatkowe dane bez określonego formatu.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` jeśli transfer jest dozwolony, chyba że zostanie zgłoszony błąd.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Inteligentny kontrakt, który chce akceptować tokeny ERC-1363 za pośrednictwem `approveAndCall`, **MUSI** zaimplementować interfejs `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interfejs dla każdego kontraktu, który chce wspierać `approveAndCall` z kontraktów tokenów ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Ilekroć `owner` tokenów ERC-1363 zatwierdzi ten kontrakt za pośrednictwem `ERC1363::approveAndCall`
   * do wydawania swoich tokenów, ta funkcja jest wywoływana.
   *
   * UWAGA: Aby zaakceptować zatwierdzenie, funkcja musi zwrócić
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (tj. 0x7b04a2d0 lub własny selektor funkcji).
   *
   * @param owner Adres, który wywołał funkcję `approveAndCall` i wcześniej posiadał tokeny.
   * @param value Ilość tokenów do wydania.
   * @param data Dodatkowe dane bez określonego formatu.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` jeśli zatwierdzenie jest dozwolone, chyba że zostanie zgłoszony błąd.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Dalsza lektura {#further-reading}

- [ERC-1363: Standard tokenów płatnych](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repozytorium GitHub](https://github.com/vittominacori/erc1363-payable-token)
