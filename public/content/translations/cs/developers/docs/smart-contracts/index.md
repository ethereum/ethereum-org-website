---
title: "Úvod do chytrých kontraktů"
description: "Přehled chytrých kontraktů se zaměřením na jejich jedinečné vlastnosti a omezení."
lang: cs
---

## Co je to chytrý kontrakt? {#what-is-a-smart-contract}

„Chytrý kontrakt“ je jednoduše program, který běží na blockchainu [Etherea](/). Je to sbírka kódu (jeho funkcí) a dat (jeho stavu), která se nachází na konkrétní adrese na blockchainu Etherea.

Chytré kontrakty jsou typem [účtu na Ethereu](/developers/docs/accounts/). To znamená, že mají zůstatek a mohou být cílem transakcí. Nejsou však ovládány uživatelem, místo toho jsou nasazeny do sítě a běží podle naprogramování. Uživatelské účty pak mohou s chytrým kontraktem interagovat odesíláním transakcí, které spustí funkci definovanou v chytrém kontraktu. Chytré kontrakty mohou definovat pravidla, podobně jako běžný kontrakt, a automaticky je vynucovat prostřednictvím kódu. Chytré kontrakty nelze ve výchozím nastavení smazat a interakce s nimi jsou nevratné.

## Předpoklady {#prerequisites}

Pokud teprve začínáte nebo hledáte méně technický úvod, doporučujeme náš [úvod do chytrých kontraktů](/smart-contracts/).

Než se vrhnete do světa chytrých kontraktů, ujistěte se, že jste si přečetli o [účtech](/developers/docs/accounts/), [transakcích](/developers/docs/transactions/) a [virtuálním stroji Etherea](/developers/docs/evm/).

## Digitální prodejní automat {#a-digital-vending-machine}

Asi nejlepší metaforou pro chytrý kontrakt je prodejní automat, jak jej popsal [Nick Szabo](https://unenumerated.blogspot.com/). Se správnými vstupy je zaručen určitý výstup.

Chcete-li získat svačinu z prodejního automatu:

```
peníze + výběr svačiny = vydaná svačina
```

Tato logika je naprogramována v prodejním automatu.

Chytrý kontrakt má, podobně jako prodejní automat, naprogramovanou logiku. Zde je jednoduchý příklad toho, jak by tento prodejní automat vypadal, kdyby to byl chytrý kontrakt napsaný v jazyce Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Deklarovat stavové proměnné kontraktu
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Když je kontrakt 'VendingMachine' nasazen:
    // 1. nastavit nasazující adresu jako vlastníka kontraktu
    // 2. nastavit zůstatek cupcaků nasazeného chytrého kontraktu na 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Umožnit vlastníkovi zvýšit zůstatek cupcaků chytrého kontraktu
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Umožnit komukoliv nakupovat cupcaky
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Stejně jako prodejní automat odstraňuje potřebu zaměstnance prodejce, mohou chytré kontrakty nahradit zprostředkovatele v mnoha odvětvích.

## Nevyžadující povolení {#permissionless}

Kdokoli může napsat chytrý kontrakt a nasadit jej do sítě. Stačí se jen naučit programovat v [jazyce pro chytré kontrakty](/developers/docs/smart-contracts/languages/) a mít dostatek ETH na nasazení vašeho kontraktu. Nasazení chytrého kontraktu je technicky vzato transakce, takže musíte zaplatit [gas](/developers/docs/gas/) stejným způsobem, jako musíte platit gas za jednoduchý převod ETH. Náklady na gas pro nasazení kontraktu jsou však mnohem vyšší.

Ethereum má pro psaní chytrých kontraktů jazyky přívětivé pro vývojáře:

- Solidity
- Vyper

[Více o jazycích](/developers/docs/smart-contracts/languages/)

Před nasazením však musí být zkompilovány, aby virtuální stroj Etherea mohl kontrakt interpretovat a uložit. [Více o kompilaci](/developers/docs/smart-contracts/compiling/)

## Skládatelnost {#composability}

Chytré kontrakty jsou na Ethereu veřejné a lze je považovat za otevřená API. To znamená, že ve svém vlastním chytrém kontraktu můžete volat jiné chytré kontrakty, a tím výrazně rozšířit to, co je možné. Kontrakty mohou dokonce nasazovat další kontrakty.

Zjistěte více o [skládatelnosti chytrých kontraktů](/developers/docs/smart-contracts/composability/).

## Omezení {#limitations}

Samotné chytré kontrakty nemohou získávat informace o událostech v „reálném světě“, protože nemohou načítat data z offchain zdrojů. To znamená, že nemohou reagovat na události v reálném světě. To je záměr. Spoléhání se na externí informace by mohlo ohrozit konsensus, který je důležitý pro bezpečnost a decentralizaci.

Pro blockchainové aplikace je však důležité, aby mohly využívat offchain data. Řešením jsou [orákula](/developers/docs/oracles/), což jsou nástroje, které přijímají offchain data a zpřístupňují je chytrým kontraktům.

Dalším omezením chytrých kontraktů je maximální velikost kontraktu. Chytrý kontrakt může mít maximálně 24 KB, jinak mu dojde gas. To lze obejít pomocí [vzoru Diamond](https://eips.ethereum.org/EIPS/eip-2535).

## Multisig kontrakty {#multisig}

Multisig kontrakty (s vícenásobným podpisem) jsou účty chytrých kontraktů, které k provedení transakce vyžadují více platných podpisů. To je velmi užitečné pro zamezení jediným bodům selhání u kontraktů, které drží značné množství etheru nebo jiných tokenů. Multisig kontrakty také rozdělují odpovědnost za provádění kontraktu a správu klíčů mezi více stran a zabraňují tomu, aby ztráta jednoho soukromého klíče vedla k nevratné ztrátě prostředků. Z těchto důvodů lze multisig kontrakty použít pro jednoduchou správu DAO. Multisig kontrakty vyžadují k provedení N podpisů z M možných přijatelných podpisů (kde N ≤ M a M > 1). Běžně se používají `N = 3, M = 5` a `N = 4, M = 7`. Multisig 4/7 vyžaduje čtyři ze sedmi možných platných podpisů. To znamená, že prostředky jsou stále dostupné, i když se ztratí tři podpisy. V tomto případě to také znamená, že většina držitelů klíčů musí souhlasit a podepsat, aby se kontrakt mohl provést.

## Zdroje o chytrých kontraktech {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Knihovna pro bezpečný vývoj chytrých kontraktů._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunitní fórum](https://forum.openzeppelin.com/c/general/16)

## Další čtení {#further-reading}

- [Coinbase: Co je to chytrý kontrakt?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Co je to chytrý kontrakt?](https://chain.link/education/smart-contracts)
- [Video: Jednoduše vysvětleno - Chytré kontrakty](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Platforma pro výuku a auditování Web3](https://updraft.cyfrin.io)

## Návody: Podpisy chytrých kontraktů (EIP-1271) na Ethereu {#tutorials}

- [EIP-1271: Podepisování a ověřování podpisů chytrých kontraktů](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Jak EIP-1271 umožňuje chytrým kontraktům ověřovat podpisy, s ukázkou implementace Safe._