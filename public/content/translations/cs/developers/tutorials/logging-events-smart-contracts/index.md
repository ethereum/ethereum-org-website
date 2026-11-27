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
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V Solidity jsou [události](/developers/docs/smart-contracts/anatomy/#events-and-logs) odesílané signály, které mohou chytré kontrakty vyvolat. Decentralizované aplikace (dapps), nebo cokoliv připojeného k Ethereum JSON-RPC API, mohou těmto událostem naslouchat a podle toho jednat. Událost může být také indexována, aby bylo možné v historii událostí později vyhledávat.

## Události {#events}

Jednou z nejběžnějších událostí na blockchainu Etherea je událost `Transfer`, kterou emitují tokeny ERC-20, když někdo provede převod tokenů.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Podpis události je deklarován uvnitř kódu kontraktu a může být emitován pomocí klíčového slova emit. Například událost převodu loguje, kdo převod odeslal (_from_), komu (_to_) a kolik tokenů bylo převedeno (_value_).

Vraťme se k chytrému kontraktu `Counter` z [nasazení vašeho prvního chytrého kontraktu](/developers/tutorials/deploying-your-first-smart-contract/) a logujme každou změnu hodnoty. Vypadalo by to takto:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract Counter {

    event ValueChanged(uint256 oldValue, uint256 newValue);

    // Veřejná proměnná typu unsigned int pro uchování počtu
    uint256 public count = 0;

    // Funkce, která inkrementuje náš čítač
    function increment() public {
        count += 1;
        emit ValueChanged(count - 1, count);
    }

    // Nepotřebný getter pro získání hodnoty počtu
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Všimněte si, že:

- **Řádek 6**: deklarujeme naši událost a co obsahuje, starou hodnotu a novou hodnotu.

- **Řádek 14**: Když inkrementujeme naši proměnnou count, emitujeme událost.

Pokud nyní nasadíme kontrakt a zavoláme funkci increment, uvidíme, že ji Remix automaticky zobrazí, pokud kliknete na novou transakci uvnitř pole s názvem logs.

![Snímek obrazovky Remix](./remix-screenshot.png)

Logy jsou opravdu užitečné pro ladění vašich chytrých kontraktů, ale jsou také důležité, pokud budujete aplikace používané různými lidmi, a usnadňují tvorbu analytiky pro sledování a pochopení toho, jak je váš chytrý kontrakt používán. Logy generované transakcemi se zobrazují v populárních prohlížečích bloků a můžete je také například použít k vytvoření offchain skriptů pro naslouchání specifickým událostem a provádění akcí, když nastanou.
