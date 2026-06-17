---
title: "Logování dat z chytrých kontraktů pomocí událostí"
description: "Úvod do událostí chytrých kontraktů a jak je můžete využít k logování dat"
author: "jdourlens"
tags:
  - chytré kontrakty
  - remix
  - solidity
  - události
skill: intermediate
breadcrumb: "Logování událostí"
lang: cs
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V Solidity jsou [události](/developers/docs/smart-contracts/anatomy/#events-and-logs) odesílané signály, které mohou chytré kontrakty vyvolat. Decentralizované aplikace (dapps), nebo cokoliv připojeného k Ethereum JSON-RPC API, mohou těmto událostem naslouchat a podle toho jednat. Událost může být také indexována, aby bylo možné v historii událostí později vyhledávat.

## Události {#events}

Nejběžnější událostí na blockchainu Etherea v době psaní tohoto článku je událost Transfer, kterou emitují tokeny ERC-20, když někdo provede převod tokenů.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Podpis události je deklarován uvnitř kódu kontraktu a může být emitován pomocí klíčového slova emit. Například událost transfer loguje, kdo převod odeslal (_from_), komu (_to_) a kolik tokenů bylo převedeno (_value_).

Pokud se vrátíme k našemu chytrému kontraktu Counter a rozhodneme se logovat každou změnu hodnoty. Jelikož tento kontrakt není určen k tomu, aby byl nasazen, ale slouží jako základ pro budování dalšího kontraktu jeho rozšířením: nazývá se abstraktní kontrakt. V případě našeho příkladu s počítadlem by to vypadalo takto:

```solidity
pragma solidity 0.5.17;

contract Counter {

    event ValueChanged(uint oldValue, uint256 newValue);

    // Privátní proměnná typu unsigned int pro uchování počtu
    uint256 private count = 0;

    // Funkce, která inkrementuje náš čítač
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Getter pro získání hodnoty počtu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Všimněte si, že:

- **Řádek 5**: deklarujeme naši událost a co obsahuje, starou hodnotu a novou hodnotu.

- **Řádek 13**: Když inkrementujeme naši proměnnou count, emitujeme událost.

Pokud nyní nasadíme kontrakt a zavoláme funkci increment, uvidíme, že Remix ji automaticky zobrazí, pokud kliknete na novou transakci uvnitř pole s názvem logs.

![Remix screenshot](./remix-screenshot.png)

Logy jsou opravdu užitečné pro ladění vašich chytrých kontraktů, ale jsou také důležité, pokud budujete aplikace používané různými lidmi, a usnadňují tvorbu analytiky pro sledování a pochopení toho, jak je váš chytrý kontrakt používán. Logy generované transakcemi se zobrazují v populárních prohlížečích bloků a můžete je například také použít k vytvoření offchain skriptů pro naslouchání specifickým událostem a provádění akcí, když nastanou.