---
title: Jak mockować inteligentne kontrakty w Solidity do testowania
description: Dlaczego warto naśmiewać się ze swoich kontraktów podczas testowania
author: Markus Waas
lang: pl
tags: ["solidity", "inteligentne kontrakty", "testowanie", "mockowanie"]
skill: intermediate
breadcrumb: Mockowanie kontraktów
published: 2020-05-02
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/mocking-contracts
---

[Obiekty mock (makiety)](https://wikipedia.org/wiki/Mock_object) to popularny wzorzec projektowy w programowaniu obiektowym. Pochodzące od starofrancuskiego słowa „mocquer”, oznaczającego „naśmiewać się”, ewoluowało do „imitowania czegoś prawdziwego”, co w rzeczywistości robimy w programowaniu. Naśmiewaj się ze swoich inteligentnych kontraktów tylko wtedy, gdy masz na to ochotę, ale mockuj je, kiedy tylko możesz. To ułatwia życie.

## Testowanie jednostkowe kontraktów za pomocą mocków {#unit-testing-contracts-with-mocks}

Mockowanie kontraktu w zasadzie oznacza stworzenie jego drugiej wersji, która zachowuje się bardzo podobnie do oryginału, ale w sposób, który może być łatwo kontrolowany przez programistę. Często kończy się to na złożonych kontraktach, w których chcesz jedynie [przetestować jednostkowo małe części kontraktu](/developers/docs/smart-contracts/testing/). Problem polega na tym, co jeśli testowanie tej małej części wymaga bardzo specyficznego stanu kontraktu, który jest trudny do osiągnięcia?

Możesz za każdym razem pisać złożoną logikę konfiguracji testów, która wprowadza kontrakt w wymagany stan, albo napisać mocka. Mockowanie kontraktu jest proste dzięki dziedziczeniu. Wystarczy utworzyć drugi kontrakt mockujący, który dziedziczy po oryginalnym. Teraz możesz nadpisywać funkcje w swoim mocku. Zobaczmy to na przykładzie.

## Przykład: Prywatny ERC-20 {#example-private-erc20}

Użyjemy przykładowego kontraktu ERC-20, który ma początkowy czas prywatny. Właściciel może zarządzać prywatnymi użytkownikami i tylko oni będą mogli otrzymywać tokeny na początku. Po upływie określonego czasu wszyscy będą mogli korzystać z tokenów. Jeśli jesteś ciekaw, używamy hooka [`_beforeTokenTransfer`](https://docs.openzeppelin.com/contracts/5.x/extending-contracts#using-hooks) z nowych kontraktów OpenZeppelin v3.

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

        require(_validRecipient(to), "PrivateERC20: invalid recipient");
    }

    function _validRecipient(address to) private view returns (bool) {
        if (isPublic()) {
            return true;
        }

        return isPrivateUser[to];
    }
}
```

A teraz go zamockujmy.

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

Otrzymasz jeden z następujących komunikatów o błędzie:

- `PrivateERC20Mock.sol: TypeError: Overriding function is missing "override" specifier.`
- `PrivateERC20.sol: TypeError: Trying to override non-virtual function. Did you forget to add "virtual"?.`

Ponieważ używamy nowej wersji Solidity 0.6, musimy dodać słowo kluczowe `virtual` dla funkcji, które mogą zostać nadpisane, oraz override dla funkcji nadpisującej. Dodajmy je więc do obu funkcji `isPublic`.

Teraz w swoich testach jednostkowych możesz użyć `PrivateERC20Mock`. Kiedy chcesz przetestować zachowanie w czasie prywatnego użytkowania, użyj `setIsPublic(false)`, a podobnie `setIsPublic(true)` do testowania czasu publicznego użytkowania. Oczywiście w naszym przykładzie moglibyśmy po prostu użyć [pomocników czasu (time helpers)](https://docs.openzeppelin.com/test-helpers/0.5/api#increase), aby odpowiednio zmienić czas. Ale idea mockowania powinna być już jasna i można wyobrazić sobie scenariusze, w których nie jest to tak proste, jak zwykłe przesunięcie czasu.

## Mockowanie wielu kontraktów {#mocking-many-contracts}

Tworzenie kolejnego kontraktu dla każdego pojedynczego mocka może stać się uciążliwe. Jeśli Ci to przeszkadza, możesz przyjrzeć się bibliotece [MockContract](https://github.com/gnosis/mock-contract). Pozwala ona na nadpisywanie i zmianę zachowań kontraktów w locie. Działa to jednak tylko w przypadku mockowania wywołań do innego kontraktu, więc nie sprawdziłoby się w naszym przykładzie.

## Mockowanie może być jeszcze potężniejsze {#mocking-can-be-even-more-powerful}

Możliwości mockowania na tym się nie kończą.

- Dodawanie funkcji: Przydatne jest nie tylko nadpisywanie konkretnej funkcji, ale także po prostu dodawanie dodatkowych funkcji. Dobrym przykładem dla tokenów jest posiadanie dodatkowej funkcji `mint`, która pozwala każdemu użytkownikowi na darmowe otrzymanie nowych tokenów.
- Użycie w sieciach testowych: Kiedy wdrażasz i testujesz swoje kontrakty w sieciach testowych razem ze swoją zdecentralizowaną aplikacją (dapp), rozważ użycie zmockowanej wersji. Unikaj nadpisywania funkcji, chyba że naprawdę musisz. W końcu chcesz przetestować prawdziwą logikę. Ale dodanie na przykład funkcji resetowania może być przydatne, ponieważ po prostu resetuje stan kontraktu do początku, bez konieczności nowego wdrożenia. Oczywiście nie chciałbyś mieć czegoś takiego w kontrakcie w Sieci głównej.