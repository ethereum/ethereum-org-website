---
title: Introduzione agli Smart Contract
description: Panoramica sugli Smart Contract, incentrata sulle loro caratteristiche e limitazioni uniche.
lang: it
sidebar: true
---

## Cos'è uno smart contract? {#what-is-a-smart-contract}

Uno Smart Contract è semplicemente un programma eseguito sulla blockchain di Ethereum. È una raccolta di codice (le funzioni) e dati (lo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

Gli smart contract sono un tipo di [account Ethereum](/developers/docs/accounts/). Significa che hanno un saldo e possono inviare transazioni in rete. Però non sono controllati da un utente, ma distribuiti in rete ed eseguiti come programmato. Gli account degli utenti possono quindi interagire con uno Smart Contract inviando transazioni che eseguono una funzione definita sul contratto. Gli Smart Contract possono definire regole, come un normale contratto, e imporle automaticamente tramite codice. Gli smart contract non sono eliminabili di default e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

È importante aver letto gli argomenti su [account](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e [macchina virtuale di Ethereum](/developers/docs/evm/) prima di entrare nel mondo degli Smart Contract.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la migliore metafora per capire cos’è uno smart contract è quella di un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con i giusti input, è garantito un determinato output.

Per ricevere uno snack da un distributore la logica necessaria è la seguente:

```
denaro + scelta dello snack = snack erogato
```

Questa logica è programmata nel distributore.

Uno Smart Contract, proprio come un distributore automatico, ha al suo interno una logica programmata. Ecco un semplice esempio di come un distributore automatico potrebbe essere scritto come smart contract:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Dichiara le variabili di stato del contratto
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando il contratto 'VendingMachine' è distribuito:
    // 1. imposta l'indirizzo di distribuzione come proprietario del contratto
    // 2. imposta il saldo di cupcake del contratto intelligente distribuito a 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Consenti al proprietario di aumentare il saldo di cupcake del contratto intelligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Solo il proprietario può rifornire.");
        cupcakeBalances[address(this)] += amount;
    }

    // Consenti a chiunque di comprare cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Devi pagare almeno 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Non ci sono abbastanza cupcake in magazzino per completare questo acquisto");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Proprio come un distributore automatico, che elimina la necessità di avere un addetto alla vendita, anche gli smart contract possono sostituire gli intermediari in molti settori.

## Senza autorizzazioni {#permissionless}

Chiunque può scrivere uno smart contract e distribuirlo nella rete. Per distribuire un contratto, è sufficiente sapere programmare in un [linguaggio per Smart Contract](/developers/docs/smart-contracts/languages/) e avere abbastanza ETH. Distribuire uno Smart Contract è tecnicamente una transazione, quindi occorre pagare del[carburante](/developers/docs/gas/) così come avviene per un semplice trasferimento di ETH. I costi del carburante per la distribuzione di un contratto sono però molto più elevati.

Per scrivere Smart Contract, Ethereum prevede linguaggi comodi per gli sviluppatori:

- Solidity
- Vyper

[Ulteriori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

I contratti devono però essere compilati prima di poter essere distribuiti affinché la macchina virtuale Ethereum possa interpretarli e memorizzarli. [Maggiori informazioni sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

Gli Smart Contract sono pubblici su Ethereum e possono essere considerati come API aperte. Significa che è possibile chiamare altri Smart Contract nel proprio contratto in modo da ampliare enormemente quello che è possibile fare con uno Smart Contract. I contratti possono anche distribuire altri contratti.

Scopri di più sulla [componibilità degli Smart Contract](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

Gli Smart Contract da soli non possono ottenere informazioni sugli eventi del mondo reale perché non possono inviare richieste HTTP. Sono stati progettati così. Basarsi su informazioni esterne potrebbe pregiudicare il consenso, importante per la sicurezza e la decentralizzazione.

Esistono modi per aggirare questa condizione, grazie agli [oracoli](/developers/docs/oracles/).

Un altro limite degli smart contract è la dimensione massima del contratto. Uno smart contract può avere una dimensione massima di 24KB, altrimenti esaurirà il carburante. Questo problema può essere aggirato usando [il Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535) (Schema a Diamante).

## Risorse degli Smart Contract {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Libreria per lo sviluppo sicuro di Smart Contract._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di programmazione sicuri, semplici e flessibili per Smart Contract._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Letture consigliate {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 novembre 2019 - Yos Riady_
- [Contratti puliti - Una guida a modelli e pratiche per gli smart contract](https://www.wslyvh.com/clean-contracts/) _– 30 luglio 2020 - wslyvh_
