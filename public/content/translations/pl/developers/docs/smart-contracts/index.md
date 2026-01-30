---
title: "Wprowadzenie do inteligentnych kontraktów"
description: "Przegląd inteligentnych kontraktów ze szczególnym uwzględnieniem ich unikalnych cech i ograniczeń."
lang: pl
---

## Czym jest inteligentny kontrakt? {#what-is-a-smart-contract}
„Inteligentny kontrakt" jest po prostu programem, który działa w blockchainie Ethereum. Jest to zbiór kodu (jego funkcje) i danych (jego stan), które znajdują się pod określonym adresem w blockchainie Ethereum.

Inteligentne kontrakty to rodzaj [konta Ethereum](/developers/docs/accounts/). Oznacza to, że mają saldo i mogą być celem transakcji. Jednak nie są one kontrolowane przez użytkownika, zamiast tego są wdrażane do sieci i uruchamiane w sposób zaprogramowany. Konta użytkowników mogą następnie wchodzić w interakcję z inteligentnym kontraktem poprzez przesyłanie transakcji, które wykonują funkcję zdefiniowaną w inteligentnym kontrakcie. Inteligentne kontrakty mogą definiować reguły, tak jak zwykłe kontrakty, i automatycznie egzekwować je za pośrednictwem kodu. Inteligentnych kontraktów nie można domyślnie usunąć, a interakcje z nimi są nieodwracalne.

## Wymagania wstępne {#prerequisites}

Jeśli dopiero zaczynasz lub szukasz mniej technicznego wprowadzenia, polecamy nasze [wprowadzenie do inteligentnych kontraktów](/smart-contracts/).

Przed zagłębieniem się w świat inteligentnych kontraktów, należy zapoznać się z [kontami](/developers/docs/accounts/), [transakcjami](/developers/docs/transactions/) oraz [Wirtualną Maszyną Ethereum](/developers/docs/evm/).

## Cyfrowy automat sprzedający {#a-digital-vending-machine}

Prawdopodobnie najlepszą metaforą inteligentnego kontraktu jest automat sprzedający, zgodnie z opisem [Nicka Szabo](https://unenumerated.blogspot.com/). Przy odpowiednich danych wejściowych gwarantowany jest określony wynik.

Aby uzyskać przekąskę z automatu do sprzedaży:

```
pieniądze + wybór przekąsek = przekąski wydane
```

Ta logika jest zaprogramowana w automacie sprzedającym.

Inteligentny kontrakt, jak automat sprzedający, ma zaprogramowaną logikę. Oto prosty przykład tego, jak wyglądałby ten automat, gdyby był inteligentnym kontraktem napisanym w Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Zadeklaruj zmienne stanu kontraktu
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Gdy kontrakt „VendingMachine” jest wdrażany:
    // 1. ustaw adres wdrażający jako właściciela kontraktu
    // 2. ustaw saldo babeczek we wdrożonym inteligentnym kontrakcie na 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Zezwól właścicielowi na zwiększenie salda babeczek w inteligentnym kontrakcie
    function refill(uint amount) public {
        require(msg.sender == owner, "Tylko właściciel może uzupełnić.");
        cupcakeBalances[address(this)] += amount;
    }

    // Zezwól każdemu na zakup babeczek
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Musisz zapłacić co najmniej 1 ETH za babeczkę");
        require(cupcakeBalances[address(this)] >= amount, "Za mało babeczek w magazynie, aby sfinalizować ten zakup");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Podobnie jak automat sprzedający eliminuje potrzebę zatrudniania sprzedawcy, inteligentne kontrakty mogą zastąpić pośredników w wielu branżach.

## Niewymagający zezwoleń {#permissionless}

Każdy może napisać inteligentny kontrakt i wdrożyć go do sieci. Wystarczy nauczyć się programować w [języku inteligentnych kontraktów](/developers/docs/smart-contracts/languages/) i mieć wystarczająco dużo ETH, aby wdrożyć swój kontrakt. Wdrożenie inteligentnego kontraktu jest technicznie transakcją, więc trzeba zapłacić za [gaz](/developers/docs/gas/) w taki sam sposób, w jaki trzeba płacić za gaz przy prostym transferze ETH. Jednak koszty gazu w przypadku wdrożenia kontraktu są znacznie wyższe.

Ethereum ma przyjazne dla deweloperów języki do pisania inteligentnych kontraktów:

- Solidity
- Vyper

[Więcej o językach](/developers/docs/smart-contracts/languages/)

Muszą one jednak zostać skompilowane przed ich wdrożeniem, tak aby maszyna wirtualna Ethereum mogła zinterpretować i przechowywać kontrakt. [Więcej o kompilacji](/developers/docs/smart-contracts/compiling/)

## Kompozycyjność {#composability}

Inteligentne kontrakty są publiczne w Ethereum i można je uznać za otwarte API. Oznacza to, że możesz wywoływać inne inteligentne kontrakty w swoim własnym inteligentnym kontrakcie, aby znacznie rozszerzyć zakres możliwości. Kontrakty mogą nawet wdrażać inne kontrakty.

Dowiedz się więcej o [kompozycyjności inteligentnych kontraktów](/developers/docs/smart-contracts/composability/).

## Ograniczenia {#limitations}

Inteligentne kontrakty nie mogą same uzyskiwać informacji o wydarzeniach "świata rzeczywistego", ponieważ nie mogą pozyskiwać danych ze źródeł spoza łańcucha. Oznacza to, że nie mogą reagować na wydarzenia w prawdziwym świecie. Jest to celowe. Poleganie na informacjach z zewnątrz mogłoby zagrozić konsensusowi, który jest ważny dla bezpieczeństwa i decentralizacji.

Ważna jest jednakże dla aplikacji blockchain możliwość używania danych spoza łańcucha. Rozwiązaniem są [wyrocznie](/developers/docs/oracles/), czyli narzędzia, które pobierają dane spoza łańcucha i udostępniają je inteligentnym kontraktom.

Kolejnym ograniczeniem inteligentnych kontraktów jest ich maksymalny rozmiar. Inteligentny kontrakt może mieć maksymalnie 24KB, w przeciwnym razie skończy mu się gaz. Można to obejść, używając wzorca [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Kontrakty multisig {#multisig}

Kontrakty multisig (wielopodpisowe) to konta inteligentnych kontraktów, które wymagają wielu ważnych podpisów do wykonania transakcji. Jest to bardzo przydatne w celu uniknięcia pojedynczych punktów awarii w przypadku kontraktów zawierających znaczne ilości etheru lub innych tokenów. Kontrakty multisig dzielą również odpowiedzialność za wykonanie kontraktu i zarządzanie kluczami między wiele stron i zapobiegają utracie pojedynczego klucza prywatnego, co prowadzi do nieodwracalnej utraty środków. Z tych powodów kontrakty multisig mogą być wykorzystywane do prostego zarządzania DAO. Kontrakty multisig wymagają N podpisów z M możliwych do zaakceptowania podpisów (gdzie N ≤ M i M > 1) w celu wykonania. `N = 3, M = 5` i `N = 4, M = 7` są powszechnie używane. Kontrakt multisig 4/7 wymaga czterech z siedmiu możliwych ważnych podpisów. Oznacza to, że środki można odzyskać nawet w przypadku utraty trzech podpisów. W tym przypadku oznacza to również, że większość posiadaczy kluczy musi się zgodzić i podpisać, aby kontrakt został wykonany.

## Zasoby dotyczące inteligentnych kontraktów {#smart-contract-resources}

**Kontrakty OpenZeppelin -** **_Biblioteka do bezpiecznego tworzenia inteligentnych kontraktów._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

## Dalsza lektura {#further-reading}

- [Coinbase: Czym jest inteligentny kontrakt?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Czym jest inteligentny kontrakt?](https://chain.link/education/smart-contracts)
- [Wideo: Proste wyjaśnienie – Inteligentne kontrakty](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: platforma do nauki i audytu Web3](https://updraft.cyfrin.io)
