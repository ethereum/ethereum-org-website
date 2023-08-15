---
title: Wprowadzenie do inteligentnych kontraktów
description: Przegląd inteligentnych kontraktów ze szczególnym uwzględnieniem ich unikalnych cech i ograniczeń.
lang: pl
---

## Czym jest inteligentny kontrakt?

„Inteligentny kontrakt" jest po prostu programem, który działa w blockchainie Ethereum. Jest to zbiór kodu (jego funkcje) i danych (jego stan), które znajdują się pod określonym adresem w blockchainie Ethereum.

Inteligentne kontrakty są rodzajem [konta Ethereum](/developers/docs/accounts/). Oznacza to, że mają one saldo i mogą wysyłać transakcje przez sieć. Jednak nie są one kontrolowane przez użytkownika, zamiast tego są wdrażane do sieci i uruchamiane w sposób zaprogramowany. Konta użytkowników mogą następnie wchodzić w interakcję z inteligentnym kontraktem poprzez przesyłanie transakcji, które wykonują funkcję zdefiniowaną w inteligentnym kontrakcie. Inteligentne kontrakty mogą definiować reguły, tak jak zwykłe kontrakty, i automatycznie egzekwować je za pośrednictwem kodu.

## Warunki wstępne {#prerequisites}

Upewnij się, że zapoznałeś się z [kontami](/developers/docs/accounts/), [transakcjami](/developers/docs/transactions/) i

## Cyfrowy automat do sprzedaży {#a-digital-vending-machine}

Być może najlepszą metaforą dla inteligentnego kontraktu jest automat do sprzedaży opisany przez Nicka Szabo. Przy odpowiednich nakładach gwarantowany jest określony wynik.

Aby uzyskać przekąskę z automatu do sprzedaży:

```
pieniądze + wybór przekąsek = przekąski wydane
```

Ta logika jest zaprogramowana w automacie sprzedającym.

Inteligentny kontrakt, jak automat sprzedający, ma zaprogramowaną logikę. Oto prosty przykład, jak taki automat może wyglądać jako inteligentny kontrakt:

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // Deklaracja zmiennych stanu kontraktu
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Kiedy kontrakt 'VendingMachine' jest wdrożony:
    // 1. ustawia adres podmiotu wdrażającego jako właściciela kontraktu
    // 2. ustawia bilans babeczek wdrożonego inteligentnego kontraktu na 100
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Umożliwia właścicielowi zwiększenie salda babeczek inteligentnego kontraktu
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Umożliwia każdemu zakup babeczek
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Podobnie jak automat sprzedający eliminuje potrzebę zatrudniania pracownika sprzedawcy, inteligentne kontrakty mogą zastąpić pośredników w wielu branżach.

## Nie wymaga pozwolenia {#permissionless}

Każdy może napisać inteligentny kontrakt i wdrożyć go do sieci. Musisz tylko nauczyć się kodowania w [języku inteligentnego kontraktu](/developers/docs/smart-contracts/languages/) i mieć wystarczająco dużo ETH, aby go wdrożyć. Wdrożenie inteligentnego kontraktu jest transakcją techniczną, więc musisz zapłacić Koszty gazu związane z wdrożeniem kontraktów są jednak znacznie wyższe.

Ethereum ma przyjazne dla deweloperów języki do pisania inteligentnych kontraktów:

- Solidity
- Vyper

[Więcej języków](/developers/docs/smart-contracts/languages/)

Muszą one jednak zostać skompilowane przed ich uruchomieniem, tak aby maszyna wirtualna Ethereum mogła zinterpretować i przechowywać kontrakt. [Więcej na temat kompilacji](/developers/docs/smart-contracts/compiling/)

## Kompozycyjność – o wzajemnej zależności komponentów {#composability}

Inteligentne kontrakty są publiczne w Ethereum i można je uznać za otwarte API. Oznacza to, że możesz wywoływać inne inteligentne kontrakty w swoim własnym inteligentnym kontrakcie, aby znacznie rozszerzyć zakres możliwości. Kontrakty mogą nawet wdrażać inne kontrakty.

Dowiedz się więcej o [kompozycyjności kontraktów inteligentnych](/developers/docs/smart-contracts/composability/).

## Ograniczenia {#limitations}

Same inteligentne kontrakty nie mogą uzyskać informacji o zdarzeniach z „prawdziwego świata”, ponieważ nie mogą wysyłać żądań HTTP. Jest to celowe, ponieważ poleganie na informacjach z zewnątrz mogłoby zagrozić konsensusowi, który jest ważny dla bezpieczeństwa i decentralizacji.

Istnieją sposoby na obejście tego za pomocą [wyroczni](/developers/docs/oracles/).

## Zasoby inteligentnych kontraktów {#smart-contract-resources}

**Kontrakty OpenZeppelin –** **<em x-id="4">biblioteka do bezpiecznego tworzenia inteligentnych kontraktów.</em>**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum społeczności](https://forum.openzeppelin.com/c/general/16)

**DappSys –** **<em x-id="4">bezpieczne, proste, elastyczne elementy konstrukcyjne do inteligentnych kontraktów.</em>**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Dalsza lektura {#further-reading}

- [Inteligentne kontrakty: technologia blockchain, która zastąpi prawników](https://blockgeeks.com/guides/smart-contracts/) <em x-id="4">– Blockgeeks</em>
- [Najlepsze praktyki opracowywania inteligentnych kontraktów](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 listopada 2019 r. – Yos Riady_
