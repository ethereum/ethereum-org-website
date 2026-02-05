---
title: Úvod do smart kontraktů
description: Přehled smart kontraktů se zaměřením na jejich jedinečné vlastnosti a omezení.
lang: cs
---

## Co to je smart kontrakt? Co je to chytrý kontrakt? {#what-is-a-smart-contract}

„Smart kontrakt“ je jednoduše program, který je spuštěn na blockchainu Ethereum. Je to sbírka kódu (jeho funkcí) a dat (jeho stavu), které sídlí na specifické adrese na blockchainu Ethereum.

Chytré kontrakty jsou typem [účtu na Ethereu](/developers/docs/accounts/). To znamená, že mají zůstatek a mohou být cílem transakcí. Nejsou však ovládány uživatelem, místo toho jsou nasazeny na síť a běží podle toho, jak jsou naprogramovány. Uživatelé pak mohou interagovat se smart kontraktem prostřednictvím transakcí, které spouštějí funkce definované na smart kontraktu. Smart kontrakty mohou definovat pravidla, podobně jako běžné smlouvy, a automaticky je vynucovat prostřednictvím kódu. Smart kontrakty nelze ve výchozím nastavení smazat a interakce s nimi jsou nevratné.

## Předpoklady {#prerequisites}

Pokud teprve začínáte nebo hledáte méně technický úvod, doporučujeme naši [úvodní příručku k chytrým kontraktům](/smart-contracts/).

Než se pustíte do světa chytrých kontraktů, přečtěte si o [účtech](/developers/docs/accounts/), [transakcích](/developers/docs/transactions/) a [Ethereum Virtual Machine (EVM)](/developers/docs/evm/).

## Digitální prodejní automat {#a-digital-vending-machine}

Možná nejlepší metaforou pro chytrý kontrakt je prodejní automat, jak ho popsal [Nick Szabo](https://unenumerated.blogspot.com/). S těmi správnými vstupy je zaručen určitý výstup.

Pakliže chcete svačinu z prodejního automatu:

```
peníze + výběr občerstvení = vydané občerstvení
```

Tato logika je naprogramována do automatu.

Smart kontrakt má do sebe naprogramovanou logiku, podobně jako prodejní automat. Zde je jednoduchý příklad, jak by takový prodejní automat vypadal, kdyby to byl smart kontrakt napsaný v Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Deklarace stavových proměnných kontraktu
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Když je kontrakt 'VendingMachine' nasazen:
    // 1. nastaví adresu nasazujícího jako vlastníka kontraktu
    // 2. nastaví zůstatek cupcake v nasazeném chytrém kontraktu na 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Umožní vlastníkovi navýšit zůstatek cupcake v chytrém kontraktu
    function refill(uint amount) public {
        require(msg.sender == owner, "Doplňovat může pouze vlastník.");
        cupcakeBalances[address(this)] += amount;
    }

    // Umožní komukoliv zakoupit cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Za jeden cupcake musíte zaplatit alespoň 1 ETH");
        require(cupcakeBalances[address(this)] >= amount, "Na skladě není dostatek cupcaků k dokončení tohoto nákupu");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Podobně jako prodejní automat odstraňuje potřebu zaměstnance prodejce, smart kontrakty mohou nahradit prostředníky v mnoha průmyslových odvětvích.

## Bez povolení {#permissionless}

Kdokoli může napsat smart kontrakt a vypustit ho na síť. Stačí se naučit programovat v [jazyce pro chytré kontrakty](/developers/docs/smart-contracts/languages/) a mít dostatek ETH k nasazení vašeho kontraktu. Nasazení chytrého kontraktu je technicky transakce, takže musíte zaplatit [gas](/developers/docs/gas/) stejným způsobem, jako platíte gas za jednoduchý převod ETH. Náklady na palivo jsou však při nasazení kontraktu mnohem vyšší.

Ethereum má programovací jazyky pro psaní smart kontraktů, které jsou vývojářsky přívětivé:

- Solidity
- Vyper

[Více o jazycích](/developers/docs/smart-contracts/languages/)

Je však třeba je před nasazením zkompilovat, aby je Virtuální stroj Etherea mohl interpretovat a uložit. [Více o kompilaci](/developers/docs/smart-contracts/compiling/)

## Složitelnost {#composability}

Chytré kontrakty na Ethereu jsou veřejné a lze je považovat za otevřená API. To znamená, že ve svém smart kontraktu můžete volat jiné smart kontrakty, což značně rozšiřuje vaše možnosti. Kontrakty mohou dokonce nasazovat další kontrakty.

Zjistěte více o [složitelnosti chytrých kontraktů](/developers/docs/smart-contracts/composability/).

## Omezení {#limitations}

Samotné chytré kontrakty nemohou získávat informace o „skutečných“ událostech, protože nemohou získávat data ze zdrojů mimo blockchain. To znamená, že nemohou reagovat na události ve skutečném světě. Tento design je úmyslný. Spoléhat se na externí informace by mohlo ohrozit konsenzus, což je důležité pro bezpečnost a decentralizaci.

Nicméně je důležité, aby blockchainové aplikace mohly používat data, která jsou mimo blockchain. Řešením jsou [orákula](/developers/docs/oracles/), což jsou nástroje, které přijímají data mimo blockchain a zpřístupňují je chytrým kontraktům.

Dalším omezením smart kontraktů je maximální velikost kontraktu. Smart kontrakt může mít maximálně 24 Kb, jinak dojde k vyčerpání paliva. Tomu se lze vyhnout použitím [The Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Multisig kontrakty {#multisig}

Multisig (vícepodpisové) kontrakty jsou smart kontraktové účty, které vyžadují více platných podpisů k provedení transakce. To je velmi užitečné pro zabránění jednotlivým bodům selhání u kontraktů držících značné množství etheru nebo jiných tokenů. Multisigy také mohou rozdělit odpovědnost za provádění kontraktů a správu klíčů mezi více stran a zabraňují ztrátě prostředků v případě ztráty jediného soukromého klíče. Z těchto důvodů lze multisig kontrakty použít pro jednoduchou správu DAO. Multisigy vyžadují N podpisů z M možných přijatelných podpisů (kde N ≤ M a M > 1) k provedení. Běžně se používají hodnoty `N = 3, M = 5` a `N = 4, M = 7`. Multisig 4/7 vyžaduje čtyři ze sedmi možných platných podpisů. To znamená, že prostředky jsou stále dostupné, i když jsou ztraceny tři podpisy. V tomto případě to také znamená, že většina držitelů klíčů musí souhlasit a podepsat, aby mohl být kontrakt exekuován.

## Zdroje k chytrým kontraktům {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Knihovna pro bezpečný vývoj chytrých kontraktů._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunitní fórum](https://forum.openzeppelin.com/c/general/16)

## Další čtení {#further-reading}

- [Coinbase: Co je to chytrý kontrakt?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Co je to chytrý kontrakt?](https://chain.link/education/smart-contracts)
- [Video: Jednoduše vysvětleno – Chytré kontrakty](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 výuková a auditovací platforma](https://updraft.cyfrin.io)
