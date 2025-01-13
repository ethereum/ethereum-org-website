---
title: Úvod do smart kontraktů
description: Přehled smart kontraktů se zaměřením na jejich jedinečné vlastnosti a omezení.
lang: cs
---

## Co to je smart kontrakt? {#what-is-a-smart-contract}

„Smart kontrakt“ je jednoduše program, který je spuštěn na blockchainu Ethereum. Je to sbírka kódu (jeho funkcí) a dat (jeho stavu), které sídlí na specifické adrese na blockchainu Ethereum.

Smart kontrakty jsou typem [účtu na Ethereu](/developers/docs/accounts/). To znamená, že mají zůstatek a mohou být cílem transakcí. Nejsou však ovládány uživatelem, místo toho jsou nasazeny na síť a běží podle toho, jak jsou naprogramovány. Uživatelé pak mohou interagovat se smart kontraktem prostřednictvím transakcí, které spouštějí funkce definované na smart kontraktu. Smart kontrakty mohou definovat pravidla, podobně jako běžné smlouvy, a automaticky je vynucovat prostřednictvím kódu. Smart kontrakty nelze ve výchozím nastavení smazat a interakce s nimi jsou nevratné.

## Předpoklady {#prerequisites}

Pokud teprve začínáte nebo hledáte méně technický úvod, doporučujeme si přečíst naši [úvodní příručku ke smart kontraktům](/smart-contracts/).

Ujistěte se, že jste si přečetli informace o [účtech](/developers/docs/accounts/), [transakcích](/developers/docs/transactions/) a [Virtuálním stroji Etherea](/developers/docs/evm/), než se pustíte do světa smart kontraktů.

## Digitální výdejní automat {#a-digital-vending-machine}

Možná nejlepší metaforou pro smart kontrakt je výdejní automat, jak jej popsal [Nick Szabo](https://unenumerated.blogspot.com/). S těmi správnými vstupy je zaručen určitý výstup.

Pakliže chcete svačinu z prodejního automatu:

```
money + snack selection = snack dispensed
```

Tato logika je naprogramována do automatu.

Smart kontrakt má do sebe naprogramovanou logiku, podobně jako prodejní automat. Zde je jednoduchý příklad, jak by takový prodejní automat vypadal, kdyby to byl smart kontrakt napsaný v Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Podobně jako prodejní automat odstraňuje potřebu zaměstnance prodejce, smart kontrakty mohou nahradit prostředníky v mnoha průmyslových odvětvích.

## Bez nutnosti povolení {#permissionless}

Kdokoli může napsat smart kontrakt a vypustit ho na síť. Stačí se naučit programovat v [jazyce pro smart kontrakty](/developers/docs/smart-contracts/languages/) a mít dostatek ETH k nasazení kontraktu. Nasazení smart kontraktu je z technického hlediska transakcí, takže musíte zaplatit poplatek za [palivo](/developers/docs/gas/), stejně jako při jednoduchém převodu ETH. Náklady na palivo jsou však při nasazení kontraktu mnohem vyšší.

Ethereum má programovací jazyky pro psaní smart kontraktů, které jsou vývojářsky přívětivé:

- Solidity
- Vyper

[Další informace o jazycích](/developers/docs/smart-contracts/languages/)

Je však třeba je před nasazením zkompilovat, aby je Virtuální stroj Etherea mohl interpretovat a uložit. [Více informací o kompilaci](/developers/docs/smart-contracts/compiling/)

## Složitelnost {#composability}

Chytré kontrakty na Ethereu jsou veřejné a lze je považovat za otevřená API. To znamená, že ve svém smart kontraktu můžete volat jiné smart kontrakty, což značně rozšiřuje vaše možnosti. Kontrakty mohou dokonce nasazovat další kontrakty.

Další informace o [komponovatelnosti smart kontraktů](/developers/docs/smart-contracts/composability/).

## Omezení {#limitations}

Samotné smart kontrakty nemohou získávat informace o „skutečných“ událostech, protože nemohou získávat data z off-chain zdrojů. To znamená, že nemohou reagovat na události ve skutečném světě. Tento design je úmyslný. Spoléhat se na externí informace by mohlo ohrozit konsenzus, což je důležité pro bezpečnost a decentralizaci.

Nicméně je důležité, aby blockchainové aplikace mohly používat off-chain data. Řešením jsou [orákly](/developers/docs/oracles/), což jsou nástroje, které přinášejí off-chain data a zpřístupňují je smart kontraktům.

Dalším omezením smart kontraktů je maximální velikost kontraktu. Smart kontrakt může mít maximálně 24 Kb, jinak dojde k vyčerpání paliva. Toto lze obejít pomocí tzv. [Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Multisig kontrakty {#multisig}

Multisig (vícepodpisové) kontrakty jsou smart kontraktové účty, které vyžadují více platných podpisů k provedení transakce. To je velmi užitečné pro zabránění jednotlivým bodům selhání u kontraktů držících značné množství etheru nebo jiných tokenů. Multisigy také mohou rozdělit odpovědnost za provádění kontraktů a správu klíčů mezi více stran a zabraňují ztrátě prostředků v případě ztráty jediného soukromého klíče. Z těchto důvodů lze multisig kontrakty použít pro jednoduchou správu DAO. Multisigy vyžadují N podpisů z M možných přijatelných podpisů (kde N ≤ M a M > 1) k provedení transakce. Běžně se používají multisigy `N = 3, M = 5` a `N = 4, M = 7`. Multisig 4/7 vyžaduje čtyři ze sedmi možných platných podpisů. To znamená, že prostředky jsou stále dostupné, i když jsou ztraceny tři podpisy. V tomto případě to také znamená, že většina držitelů klíčů musí souhlasit a podepsat, aby mohl být kontrakt exekuován.

## Zdroje smart kontraktů {#smart-contract-resources}

**OpenZeppelin Contracts –** **_knihovna pro vývoj bezpečných chytrých kontraktů._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunitní fórum](https://forum.openzeppelin.com/c/general/16)

## Další informace {#further-reading}

- [Coinbase: Co je to smart kontrakt?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Co je to smart kontrakt?](https://chain.link/education/smart-contracts)
- [Video: Simply Explained – Smart Contracts](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 learning and auditing platform](https://updraft.cyfrin.io)
