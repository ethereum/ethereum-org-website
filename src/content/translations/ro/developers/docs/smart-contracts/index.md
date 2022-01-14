---
title: Introducere în contractele inteligente
description: O prezentare generală a contractelor inteligente, concentrându-se pe caracteristicile unice și limitările lor.
lang: ro
sidebar: true
---

## Ce este un contract inteligent? {#what-is-a-smart-contract}

Un „contract inteligent” este un program care rulează pe blockchain-ul Ethereum. Este o colecție de cod (funcțiile sale) și date (starea sa) care se află la o anumită adresă din blockchain-ul Ethereum.

Contractele inteligente sunt un tip de [cont Ethereum](/developers/docs/accounts/). Aceasta înseamnă că au un sold și pot trimite tranzacții prin rețea. Cu toate acestea, ele nu sunt controlate de un utilizator, ci sunt implementate în rețea și funcționează conform programării. Conturile de utilizator pot apoi interacționa cu un contract inteligent prin trimiterea de tranzacții care execută o funcție definită în contractul inteligent. Contractele inteligente pot defini reguli, cum ar fi un contract regulat, și le pot aplica automat prin intermediul codului.

## Condiții prealabile {#prerequisites}

Asigură-te că ai citit despre [conturi](/developers/docs/accounts/), [tranzacții](/developers/docs/transactions/) și [mașina virtuală Ethereum](/developers/docs/evm/) înainte de a sări în lumea contractelor inteligente.

## Un distribuitor automat digital {#a-digital-vending-machine}

Poate că cea mai bună metaforă pentru un contract inteligent este un distribuitor automat, așa cum este descris de Nick Szabo. Cu intrările potrivite, o anumită ieșire este garantată.

Pentru a obține o gustare de la un distribuitor automat:

```
bani + selecție gustare = gustare distribuită
```

Această logică este programată în automat.

Un contract inteligent, ca un distribuitor automat, are o logică programată în el. Iată un simplu exemplu de cum acest distribuitor automat ar putea arăta ca un contract inteligent:

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // Declararea variabilelor de stare ale contractului
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Când contractul 'VendingMachine' este implementat:
    // 1. setează adresa de implementare ca proprietar al contractului
    // 2. setează soldul de brioșe al contractului inteligent implementat la 100
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Permite proprietarului să mărească soldul de brioșe al contractului inteligent
    function refill(uint amount) public {
        require(msg.sender == owner, „Numai proprietarul îl poate umple din nou.”);
        cupcakeBalances[address(this)] += amount;
    }

    // Permite oricui să cumpere brioșe
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, „Trebuie să plătești cel puțin 1 ETH pe brioșă”);
        require(cupcakeBalances[address(this)] >= amount, „Nu avem suficiente brioșe în stoc pentru a finaliza această achiziție”);
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Asemenea unui distributor automat, care elimină necesitatea unui angajat al vânzătorului, contractele inteligente pot înlocui intermediarii din multe industrii.

## Fără permisiune {#permissionless}

Oricine poate scrie un contract inteligent și îl poate implementa în rețea. Trebuie doar să înveți să programezi într-un [limbaj de contract inteligent](/developers/docs/smart-contracts/languages/) și să ai suficient ETH pentru a implementa contractul. Implementarea unui contract inteligent este din punct de vedere tehnic o tranzacție, astfel încât trebuie să plătești [Gas](/developers/docs/gas/) în același mod în care trebuie să plătești gaz pentru un simplu transfer ETH. Cu toate acestea, costul de gaz pentru implementarea contractelor este mult mai ridicat.

Ethereum are limbaje prietenoase-programator pentru scrierea contractelor inteligente:

- Solidity
- Vyper

[Mai multe despre limbaje](/developers/docs/smart-contracts/languages/)

Cu toate acestea, ele trebuie să fie compilate înainte de a putea fi implementate, astfel încât mașina virtuală Ethereum să poată interpreta și stoca aceste contracte. [Mai multe despre compilare](/developers/docs/smart-contracts/compiling/)

## Combinabilitatea {#composability}

Contractele inteligente sunt publice pe Ethereum și pot fi considerate API-uri deschise. Acest lucru înseamnă că poți apela alte contracte inteligente în propriul contract pentru a extinde foarte mult posibilitățile lor. Contractele pot chiar implementa alte contracte.

Află mai multe informații despre [combinabilitatea contractului inteligent](/developers/docs/smart-contracts/composability/).

## Limitări {#limitations}

Contractele inteligente singure nu pot obține informații despre evenimentele din „lumea reală”, deoarece nu pot trimite cereri HTTP. Acest lucru este prin design, deoarece bazarea pe informații externe ar putea periclita consensul, care este important pentru securitate și descentralizare.

Există modalități de a evita acest lucru folosind [oracole](/developers/docs/oracles/).

## Resurse pentru contractele inteligente {#smart-contract-resources}

**Contracte OpenZeppelin -** **_Bibliotecă pentru dezvoltare de contracte inteligente securizate._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum comunitate](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocuri de construcții sigure, simple, flexibile pentru contracte inteligente._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Referințe suplimentare {#further-reading}

- [Contracte inteligente: Tehnologia blockchain care va înlocui avocații](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Cele mai bune practici pentru dezvoltarea contractelor inteligente](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 noiembrie 2019 - Yos Riady_
