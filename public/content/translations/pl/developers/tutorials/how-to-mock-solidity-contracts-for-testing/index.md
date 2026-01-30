---
title: "Jak mockować inteligentne kontrakty Solidity na potrzeby testowania"
description: "Dlaczego podczas testowania powinieneś naśmiewać się ze swoich kontraktów"
author: Markus Waas
lang: pl
tags:
  [
    "solidity",
    "smart kontrakty",
    "testowanie",
    "tworzenie atrap"
  ]
skill: intermediate
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Obiekty typu mock](https://wikipedia.org/wiki/Mock_object) to popularny wzorzec projektowy w programowaniu zorientowanym obiektowo. Pochodzi od starofrancuskiego słowa „mocquer”, oznaczającego „naśmiewać się”, które ewoluowało w „imitowanie czegoś prawdziwego”, co jest dokładnie tym, co robimy w programowaniu. Proszę, naśmiewajcie się ze swoich inteligentnych kontraktów tylko, jeśli chcecie, ale twórzcie ich atrapy (mocki), kiedy tylko możecie. To ułatwia życie.

## Testowanie jednostkowe kontraktów z użyciem atrap (mocków) {#unit-testing-contracts-with-mocks}

Mockowanie kontraktu w istocie oznacza stworzenie jego drugiej wersji, która zachowuje się bardzo podobnie do oryginału, ale w sposób, który deweloper może łatwo kontrolować. Często masz do czynienia ze złożonymi kontraktami, w których chcesz tylko [przetestować jednostkowo małe części kontraktu](/developers/docs/smart-contracts/testing/). Problem pojawia się, gdy testowanie tej małej części wymaga bardzo specyficznego stanu kontraktu, który jest trudny do osiągnięcia.

Możesz za każdym razem pisać złożoną logikę konfiguracji testu, która doprowadza kontrakt do wymaganego stanu, albo napisać atrapę (mock). Mockowanie kontraktu jest łatwe dzięki dziedziczeniu. Po prostu utwórz drugi kontrakt-atrapę, który dziedziczy po oryginalnym. Teraz możesz nadpisywać funkcje do swojej atrapy (mocka). Zobaczmy to na przykładzie.

## Przykład: Prywatny ERC20 {#example-private-erc20}

Używamy przykładowego kontraktu ERC-20, który ma początkowy okres prywatny. Właściciel może zarządzać prywatnymi użytkownikami i tylko oni będą mogli na początku otrzymywać tokeny. Gdy upłynie określony czas, wszyscy będą mogli używać tokenów. Jeśli jesteś ciekaw, używamy hooka [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) z nowych kontraktów OpenZeppelin v3.

```solidity
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PrivateERC20 is ERC20, Ownable {
    mapping (address => bool) public isPrivateUser;
    uint256 private publicAfterTime;

    constructor(uint256 privateERC20timeInSec) ERC20("PrivateERC20", "PRIV") public {
        publicAfterTime = now + privateERC20timeInSec;
    }

    function addUser(address user) external onlyOwner {
        isPrivateUser[user] = true;
    }

    function isPublic() public view returns (bool) {
        return now >= publicAfterTime;
    }

    function _beforeTokenTransfer(address from, address to, uint256 amount) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);

        require(_validRecipient(to), "PrivateERC20: nieprawidłowy odbiorca");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

A teraz stwórzmy jego atrapę (mocka).

```solidity
pragma solidity ^0.6.0;
import "../PrivateERC20.sol";

contract PrivateERC20Mock is PrivateERC20 {
    bool isPublicConfig;

    constructor() public PrivateERC20(0) {}

    function setIsPublic(bool isPublic) external {
        isPublicConfig = isPublic;
    }

    function isPublic() public view returns (bool) {
        return isPublicConfig;
    }
}
```

Otrzymasz jeden z następujących komunikatów o błędach:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function.` `Czy zapomniałeś dodać „virtual”?`

Ponieważ używamy nowej wersji Solidity 0.6, musimy dodać słowo kluczowe `virtual` dla funkcji, które można nadpisać, i `override` dla funkcji nadpisującej. Dodajmy je więc do obu funkcji `isPublic`.

Teraz w swoich testach jednostkowych możesz zamiast tego użyć `PrivateERC20Mock`. Gdy chcesz przetestować zachowanie w czasie użytkowania prywatnego, użyj `setIsPublic(false)`, a do testowania w czasie użytkowania publicznego `setIsPublic(true)`. Oczywiście w naszym przykładzie moglibyśmy również użyć [funkcji pomocniczych do obsługi czasu](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), aby odpowiednio zmienić czas. Ale idea mockowania powinna być już jasna i możesz sobie wyobrazić scenariusze, w których nie jest to tak proste, jak samo przesunięcie czasu.

## Mockowanie wielu kontraktów {#mocking-many-contracts}

Tworzenie kolejnego kontraktu dla każdej pojedynczej atrapy (mocka) może stać się kłopotliwe. Jeśli to ci przeszkadza, możesz zapoznać się z biblioteką [MockContract](https://github.com/gnosis/mock-contract). Pozwala ona na nadpisywanie i zmienianie zachowań kontraktów w locie. Działa ona jednak tylko w przypadku mockowania wywołań do innego kontraktu, więc nie zadziała w naszym przykładzie.

## Mockowanie może być jeszcze potężniejsze {#mocking-can-be-even-more-powerful}

Na tym nie kończą się możliwości mockowania.

- Dodawanie funkcji: przydatne jest nie tylko nadpisywanie określonej funkcji, ale również dodawanie nowych. Dobrym przykładem dla tokenów jest posiadanie dodatkowej funkcji `mint`, aby umożliwić każdemu użytkownikowi otrzymywanie nowych tokenów za darmo.
- Użycie w sieciach testowych: wdrażając i testując swoje kontrakty w sieciach testowych razem ze swoją dappką, rozważ użycie wersji mockowanej. Unikaj nadpisywania funkcji, chyba że jest to absolutnie konieczne. W końcu chcesz przetestować prawdziwą logikę. Ale przydatne może być dodanie na przykład funkcji resetowania, która po prostu przywraca stan kontraktu do stanu początkowego, bez konieczności ponownego wdrożenia. Oczywiście nie chcesz mieć tego w kontrakcie w sieci głównej (Mainnet).
