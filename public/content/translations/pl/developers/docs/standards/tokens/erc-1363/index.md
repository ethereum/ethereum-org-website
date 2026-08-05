---
title: "Standard tokena płatnego ERC-1363"
description: "ERC-1363 to interfejs rozszerzający dla tokenów ERC-20, który obsługuje wykonywanie niestandardowej logiki na kontrakcie odbiorcy po transferach lub na kontrakcie wydającego po zatwierdzeniach, wszystko w ramach jednej transakcji."
lang: pl
---

## Wprowadzenie {#introduction}

### Czym jest ERC-1363? {#what-is-erc1363}

ERC-1363 to interfejs rozszerzający dla tokenów ERC-20, który obsługuje wykonywanie niestandardowej logiki na kontrakcie odbiorcy po transferach lub na kontrakcie wydającego po zatwierdzeniach, wszystko w ramach jednej transakcji.

### Różnice w stosunku do ERC-20 {#erc20-differences}

Standardowe operacje ERC-20, takie jak `transfer`, `transferFrom` i `approve`, nie pozwalają na wykonanie kodu na kontrakcie odbiorcy lub wydającego bez oddzielnej transakcji.
Wprowadza to złożoność w rozwoju interfejsu użytkownika (UI) i utrudnia adopcję, ponieważ użytkownicy muszą czekać na wykonanie pierwszej transakcji, a następnie przesłać drugą.
Muszą również dwukrotnie zapłacić za gaz.

ERC-1363 sprawia, że tokeny zamienne (fungible tokens) mogą łatwiej wykonywać akcje i działać bez użycia jakiegokolwiek nasłuchiwacza pozałańcuchowego.
Pozwala to na wywołanie zwrotne (callback) na kontrakcie odbiorcy lub wydającego, po transferze lub zatwierdzeniu, w ramach jednej transakcji.

## Wymagania wstępne {#prerequisites}

Aby lepiej zrozumieć tę stronę, zalecamy najpierw przeczytać o:

- [Standardach tokenów](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Treść {#body}

ERC-1363 wprowadza standardowe API dla tokenów ERC-20 do interakcji z inteligentnymi kontraktami po `transfer`, `transferFrom` lub `approve`.

Ten standard zapewnia podstawową funkcjonalność do transferu tokenów, a także pozwala na zatwierdzanie tokenów, aby mogły zostać wydane przez inną stronę trzecią onchain, a następnie wykonuje wywołanie zwrotne na kontrakcie odbiorcy lub wydającego.

Istnieje wiele proponowanych zastosowań inteligentnych kontraktów, które mogą akceptować wywołania zwrotne ERC-20.

Przykłady to:

- **Crowdsales**: wysłane tokeny uruchamiają natychmiastową alokację nagrody.
- **Usługi**: płatność aktywuje dostęp do usługi w jednym kroku.
- **Faktury**: tokeny automatycznie rozliczają faktury.
- **Subskrypcje**: zatwierdzenie rocznej stawki aktywuje subskrypcję w ramach płatności za pierwszy miesiąc.

Z tych powodów pierwotnie nazwano go **„Payable Token”**.

Zachowanie wywołania zwrotnego dodatkowo rozszerza jego użyteczność, umożliwiając płynne interakcje, takie jak:

- **Staking**: przetransferowane tokeny uruchamiają automatyczne blokowanie w kontrakcie stakingowym.
- **Głosowanie**: otrzymane tokeny rejestrują głosy w systemie zarządzania.
- **Wymiana**: zatwierdzenia tokenów aktywują logikę wymiany w jednym kroku.

Tokeny ERC-1363 mogą być używane do określonych celów we wszystkich przypadkach, które wymagają wykonania wywołania zwrotnego po otrzymaniu transferu lub zatwierdzenia.
ERC-1363 jest również przydatny do unikania utraty tokenów lub ich blokowania w inteligentnych kontraktach poprzez weryfikację zdolności odbiorcy do obsługi tokenów.

W przeciwieństwie do innych propozycji rozszerzeń ERC-20, ERC-1363 nie nadpisuje metod ERC-20 `transfer` i `transferFrom` oraz definiuje identyfikatory interfejsów do zaimplementowania, zachowując kompatybilność wsteczną z ERC-20.

Z [EIP-1363](https://eips.ethereum.org/EIPS/eip-1363):

### Metody {#methods}

Inteligentne kontrakty implementujące standard ERC-1363 **MUSZĄ** implementować wszystkie funkcje w interfejsie `ERC1363`, a także interfejsy `ERC20` i `ERC165`.

```solidity
pragma solidity ^0.8.0;

/**
 * @title ERC1363
 * @dev Interfejs rozszerzenia dla tokenów ERC-20, który obsługuje wykonywanie kodu na kontrakcie odbiorcy
 * po `transfer` lub `transferFrom`, lub kodu na kontrakcie wydającego po `approve`, w pojedynczej transakcji.
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
   * @dev Przenosi tokeny w ilości `value` z konta wywołującego do `to`
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adres, na który transferowane są tokeny.
   * @param value Ilość tokenów do przetransferowania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
   */
  function transferAndCall(address to, uint256 value) external returns (bool);

  /**
   * @dev Przenosi tokeny w ilości `value` z konta wywołującego do `to`
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param to Adres, na który transferowane są tokeny.
   * @param value Ilość tokenów do przetransferowania.
   * @param data Dodatkowe dane bez określonego formatu, wysłane w wywołaniu do `to`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
   */
  function transferAndCall(address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Przenosi tokeny w ilości `value` z `from` do `to` przy użyciu mechanizmu przydziału (allowance)
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adres, z którego mają zostać wysłane tokeny.
   * @param to Adres, na który transferowane są tokeny.
   * @param value Ilość tokenów do przetransferowania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
   */
  function transferFromAndCall(address from, address to, uint256 value) external returns (bool);

  /**
   * @dev Przenosi tokeny w ilości `value` z `from` do `to` przy użyciu mechanizmu przydziału (allowance)
   * a następnie wywołuje `ERC1363Receiver::onTransferReceived` na `to`.
   * @param from Adres, z którego mają zostać wysłane tokeny.
   * @param to Adres, na który transferowane są tokeny.
   * @param value Ilość tokenów do przetransferowania.
   * @param data Dodatkowe dane bez określonego formatu, wysłane w wywołaniu do `to`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
   */
  function transferFromAndCall(address from, address to, uint256 value, bytes calldata data) external returns (bool);

  /**
   * @dev Ustawia tokeny w ilości `value` jako przydział (allowance) dla `spender` na tokenach wywołującego
   * a następnie wywołuje `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adres, który wyda środki.
   * @param value Ilość tokenów do wydania.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
   */
  function approveAndCall(address spender, uint256 value) external returns (bool);

  /**
   * @dev Ustawia tokeny w ilości `value` jako przydział (allowance) dla `spender` na tokenach wywołującego
   * a następnie wywołuje `ERC1363Spender::onApprovalReceived` na `spender`.
   * @param spender Adres, który wyda środki.
   * @param value Ilość tokenów do wydania.
   * @param data Dodatkowe dane bez określonego formatu, wysłane w wywołaniu do `spender`.
   * @return Wartość logiczna wskazująca, że operacja się powiodła, o ile nie zgłoszono wyjątku.
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

Inteligentny kontrakt, który chce akceptować tokeny ERC-1363 za pośrednictwem `transferAndCall` lub `transferFromAndCall` **MUSI** implementować interfejs `ERC1363Receiver`:

```solidity
/**
 * @title ERC1363Receiver
 * @dev Interfejs dla dowolnego kontraktu, który chce obsługiwać `transferAndCall` lub `transferFromAndCall` z kontraktów tokenów ERC-1363.
 */
interface ERC1363Receiver {
  /**
   * @dev Zawsze, gdy tokeny ERC-1363 są transferowane do tego kontraktu przez `ERC1363::transferAndCall` lub `ERC1363::transferFromAndCall`
   * przez `operator` z `from`, wywoływana jest ta funkcja.
   *
   * UWAGA: Aby zaakceptować transfer, musi ona zwrócić
   * `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))`
   * (tj. 0x88a7ca5c, lub własny selektor funkcji).
   *
   * @param operator Adres, który wywołał funkcję `transferAndCall` lub `transferFromAndCall`.
   * @param from Adres, z którego transferowane są tokeny.
   * @param value Ilość przetransferowanych tokenów.
   * @param data Dodatkowe dane bez określonego formatu.
   * @return `bytes4(keccak256("onTransferReceived(address,address,uint256,bytes)"))` jeśli transfer jest dozwolony, o ile nie zgłoszono wyjątku.
   */
  function onTransferReceived(address operator, address from, uint256 value, bytes calldata data) external returns (bytes4);
}
```

Inteligentny kontrakt, który chce akceptować tokeny ERC-1363 za pośrednictwem `approveAndCall` **MUSI** implementować interfejs `ERC1363Spender`:

```solidity
/**
 * @title ERC1363Spender
 * @dev Interfejs dla dowolnego kontraktu, który chce obsługiwać `approveAndCall` z kontraktów tokenów ERC-1363.
 */
interface ERC1363Spender {
  /**
   * @dev Zawsze, gdy `owner` tokenów ERC-1363 zatwierdzi ten kontrakt przez `ERC1363::approveAndCall`
   * do wydawania swoich tokenów, wywoływana jest ta funkcja.
   *
   * UWAGA: Aby zaakceptować zatwierdzenie, musi ona zwrócić
   * `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))`
   * (tj. 0x7b04a2d0, lub własny selektor funkcji).
   *
   * @param owner Adres, który wywołał funkcję `approveAndCall` i wcześniej posiadał tokeny.
   * @param value Ilość tokenów do wydania.
   * @param data Dodatkowe dane bez określonego formatu.
   * @return `bytes4(keccak256("onApprovalReceived(address,uint256,bytes)"))` jeśli zatwierdzenie jest dozwolone, o ile nie zgłoszono wyjątku.
   */
  function onApprovalReceived(address owner, uint256 value, bytes calldata data) external returns (bytes4);
}
```

## Dalsza lektura {#further-reading}

- [ERC-1363: Standard tokena płatnego](https://eips.ethereum.org/EIPS/eip-1363)
- [ERC-1363: Repozytorium GitHub](https://github.com/vittominacori/erc1363-payable-token)