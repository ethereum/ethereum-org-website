---
title: "Zaznamenávání dat z chytrých kontraktů pomocí událostí"
description: "Úvod do událostí chytrých kontraktů a jak je můžete použít k zaznamenávání dat."
author: "jdourlens"
tags:
  [
    "smart kontrakt účty",
    "remix",
    "solidity",
    "události"
  ]
skill: intermediate
lang: cs
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/logging-data-with-events/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

V Solidity jsou [události](/developers/docs/smart-contracts/anatomy/#events-and-logs) odesílané signály, které mohou chytré kontrakty spouštět. Dapps nebo cokoliv připojené k Ethereum JSON-RPC API může těmto událostem naslouchat a podle toho jednat. Událost může být také indexována, aby byla historie událostí později prohledávatelná.

## Události {#events}

Nejběžnější událostí na blockchainu Etherea v době psaní tohoto článku je událost Transfer, kterou emitují tokeny ERC20, když někdo převádí tokeny.

```solidity
event Transfer(address indexed from, address indexed to, uint256 value);
```

Podpis události je deklarován uvnitř kódu kontraktu a může být emitován pomocí klíčového slova emit. Například událost převodu zaznamenává, kdo převod odeslal (_from_), komu (_to_) a kolik tokenů bylo převedeno (_value_).

Pokud se vrátíme k našemu chytrému kontraktu Counter a rozhodneme se zaznamenávat každou změnu hodnoty. Protože tento kontrakt nemá být nasazen, ale má sloužit jako základ pro vytvoření jiného kontraktu jeho rozšířením, nazývá se abstraktní kontrakt. V případě našeho příkladu s čítačem by to vypadalo takto:

```solidity
pragma solidity 0.5.17;\n\ncontract Counter {\n\n    event ValueChanged(uint oldValue, uint256 newValue);\n\n    // Soukromá proměnná typu unsigned int pro uchování počtu\n    uint256 private count = 0;\n\n    // Funkce, která zvyšuje náš čítač\n    function increment() public {\n        count += 1;\n        emit ValueChanged(count - 1, count);\n    }\n\n    // Getter pro získání hodnoty čítače\n    function getCount() public view returns (uint256) {\n        return count;\n    }\n\n}
```

Všimněte si, že:

- **Řádek 5**: deklarujeme naši událost a co obsahuje, starou a novou hodnotu.

- **Řádek 13**: Když zvýšíme hodnotu naší proměnné count, emitujeme událost.

Pokud nyní kontrakt nasadíme a zavoláme funkci increment, uvidíme, že Remix ji automaticky zobrazí, pokud kliknete na novou transakci v poli s názvem logs.

![Snímek obrazovky Remixu](./remix-screenshot.png)

Záznamy jsou opravdu užitečné pro ladění vašich chytrých kontraktů, ale jsou také důležité, pokud vytváříte aplikace používané různými lidmi, a usnadňují analytiku pro sledování a pochopení toho, jak je váš chytrý kontrakt používán. Záznamy generované transakcemi se zobrazují v populárních prohlížečích bloků a můžete je například použít k vytvoření offchainových skriptů, které naslouchají specifickým událostem a provádějí akce, když k nim dojde.
