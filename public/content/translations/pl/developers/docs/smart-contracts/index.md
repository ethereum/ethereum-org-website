---
title: "Wprowadzenie do inteligentnych kontraktów"
description: "Przegląd inteligentnych kontraktów, skupiający się na ich unikalnych cechach i ograniczeniach."
lang: pl
---

## Czym jest inteligentny kontrakt? {#what-is-a-smart-contract}

"Inteligentny kontrakt" to po prostu program działający na blockchainie [Ethereum](/). Jest to zbiór kodu (jego funkcji) i danych (jego stanu), który znajduje się pod określonym adresem na blockchainie Ethereum.

Inteligentne kontrakty to rodzaj [konta Ethereum](/developers/docs/accounts/). Oznacza to, że mają saldo i mogą być celem transakcji. Nie są one jednak kontrolowane przez użytkownika, lecz wdrażane do sieci i działają zgodnie z zaprogramowaniem. Konta użytkowników mogą następnie wchodzić w interakcje z inteligentnym kontraktem, wysyłając transakcje, które wykonują funkcję zdefiniowaną w inteligentnym kontrakcie. Inteligentne kontrakty mogą definiować zasady, podobnie jak zwykły kontrakt, i automatycznie egzekwować je za pomocą kodu. Domyślnie inteligentnych kontraktów nie można usunąć, a interakcje z nimi są nieodwracalne.

## Wymagania wstępne {#prerequisites}

Jeśli dopiero zaczynasz lub szukasz mniej technicznego wprowadzenia, polecamy nasze [wprowadzenie do inteligentnych kontraktów](/smart-contracts/).

Zanim zagłębisz się w świat inteligentnych kontraktów, upewnij się, że przeczytałeś o [kontach](/developers/docs/accounts/), [transakcjach](/developers/docs/transactions/) i [wirtualnej maszynie Ethereum](/developers/docs/evm/).

## Cyfrowy automat sprzedający {#a-digital-vending-machine}

Być może najlepszą metaforą inteligentnego kontraktu jest automat sprzedający, jak opisał to [Nick Szabo](https://unenumerated.blogspot.com/). Przy odpowiednich danych wejściowych gwarantowany jest określony wynik.

Aby otrzymać przekąskę z automatu:

```
pieniądze + wybór przekąski = wydana przekąska
```

Ta logika jest zaprogramowana w automacie sprzedającym.

Inteligentny kontrakt, podobnie jak automat sprzedający, ma w sobie zaprogramowaną logikę. Oto prosty przykład tego, jak wyglądałby ten automat, gdyby był inteligentnym kontraktem napisanym w języku Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Zadeklaruj zmienne stanu kontraktu
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Gdy kontrakt 'VendingMachine' zostanie wdrożony:
    // 1. ustaw adres wdrażający jako właściciela kontraktu
    // 2. ustaw saldo babeczek wdrożonego inteligentnego kontraktu na 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Pozwól właścicielowi zwiększyć saldo babeczek inteligentnego kontraktu
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Pozwól każdemu na zakup babeczek
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Podobnie jak automat sprzedający eliminuje potrzebę zatrudniania sprzedawcy, inteligentne kontrakty mogą zastąpić pośredników w wielu branżach.

## Niewymagający pozwoleń {#permissionless}

Każdy może napisać inteligentny kontrakt i wdrożyć go do sieci. Musisz tylko nauczyć się kodować w [języku inteligentnych kontraktów](/developers/docs/smart-contracts/languages/) i mieć wystarczająco dużo ETH, aby wdrożyć swój kontrakt. Wdrożenie inteligentnego kontraktu jest technicznie transakcją, więc musisz zapłacić za [gaz](/developers/docs/gas/) w taki sam sposób, w jaki płacisz za gaz przy zwykłym transferze ETH. Jednak koszty gazu za wdrożenie kontraktu są znacznie wyższe.

Ethereum posiada przyjazne dla programistów języki do pisania inteligentnych kontraktów:

- Solidity
- Vyper

[Więcej o językach](/developers/docs/smart-contracts/languages/)

Muszą one jednak zostać skompilowane przed wdrożeniem, aby wirtualna maszyna Ethereum mogła zinterpretować i przechować kontrakt. [Więcej o kompilacji](/developers/docs/smart-contracts/compiling/)

## Kompozycyjność {#composability}

Inteligentne kontrakty są publiczne na Ethereum i można je traktować jako otwarte API. Oznacza to, że możesz wywoływać inne inteligentne kontrakty we własnym inteligentnym kontrakcie, aby znacznie rozszerzyć jego możliwości. Kontrakty mogą nawet wdrażać inne kontrakty.

Dowiedz się więcej o [kompozycyjności inteligentnych kontraktów](/developers/docs/smart-contracts/composability/).

## Ograniczenia {#limitations}

Same inteligentne kontrakty nie mogą uzyskiwać informacji o zdarzeniach z „prawdziwego świata”, ponieważ nie mogą pobierać danych ze źródeł pozałańcuchowych. Oznacza to, że nie mogą reagować na zdarzenia w świecie rzeczywistym. Jest to celowe działanie. Poleganie na zewnętrznych informacjach mogłoby zagrozić konsensusowi, który jest ważny dla bezpieczeństwa i decentralizacji.

Jednak dla aplikacji blockchain ważne jest, aby mogły korzystać z danych pozałańcuchowych. Rozwiązaniem są [wyrocznie (oracles)](/developers/docs/oracles/), czyli narzędzia, które pobierają dane pozałańcuchowe i udostępniają je inteligentnym kontraktom.

Kolejnym ograniczeniem inteligentnych kontraktów jest ich maksymalny rozmiar. Inteligentny kontrakt może mieć maksymalnie 24 KB, w przeciwnym razie zabraknie mu gazu. Można to obejść, stosując [wzorzec diamentu (The Diamond Pattern)](https://eips.ethereum.org/EIPS/eip-2535).

## Kontrakty multisig {#multisig}

Kontrakty multisig (z wieloma podpisami) to konta inteligentnych kontraktów, które wymagają wielu ważnych podpisów do wykonania transakcji. Jest to bardzo przydatne w celu uniknięcia pojedynczych punktów awarii dla kontraktów przechowujących znaczne ilości etheru lub innych tokenów. Multisigi dzielą również odpowiedzialność za wykonanie kontraktu i zarządzanie kluczami między wiele stron i zapobiegają sytuacji, w której utrata pojedynczego klucza prywatnego prowadzi do nieodwracalnej utraty środków. Z tych powodów kontrakty multisig mogą być używane do prostego zarządzania DAO. Multisigi wymagają N podpisów z M możliwych akceptowalnych podpisów (gdzie N ≤ M i M > 1) w celu wykonania. Powszechnie używane są `N = 3, M = 5` i `N = 4, M = 7`. Multisig 4/7 wymaga czterech z siedmiu możliwych ważnych podpisów. Oznacza to, że środki można nadal odzyskać, nawet jeśli trzy podpisy zostaną utracone. W tym przypadku oznacza to również, że większość posiadaczy kluczy musi wyrazić zgodę i złożyć podpis, aby kontrakt został wykonany.

## Zasoby dotyczące inteligentnych kontraktów {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Biblioteka do bezpiecznego tworzenia inteligentnych kontraktów._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

## Dalsza lektura {#further-reading}

- [Coinbase: Czym jest inteligentny kontrakt?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Czym jest inteligentny kontrakt?](https://chain.link/education/smart-contracts)
- [Wideo: Po prostu wyjaśnione - Inteligentne kontrakty](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Platforma do nauki i audytu Web3](https://updraft.cyfrin.io)

## Samouczki: Podpisy inteligentnych kontraktów (EIP-1271) na Ethereum {#tutorials}

- [EIP-1271: Podpisywanie i weryfikacja podpisów inteligentnych kontraktów](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Jak EIP-1271 umożliwia inteligentnym kontraktom weryfikację podpisów, wraz z omówieniem implementacji Safe._