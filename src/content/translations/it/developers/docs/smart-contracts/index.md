---
title: Introduzione agli Smart Contract
description: Panoramica sugli Smart Contract, incentrata sulle loro caratteristiche e limitazioni uniche.
lang: it
---

## Cos'è uno smart contract? {#what-is-a-smart-contract}

Uno Smart Contract è semplicemente un programma eseguito sulla blockchain di Ethereum. È una raccolta di codice (le funzioni) e dati (lo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

Gli smart contract sono un tipo di [account Ethereum](/developers/docs/accounts/). Ciò significa che hanno un saldo e possono essere oggetto di transazioni. Però non sono controllati da un utente, ma distribuiti in rete ed eseguiti come programmato. Gli account degli utenti possono quindi interagire con uno Smart Contract inviando transazioni che eseguono una funzione definita sul contratto. Gli Smart Contract possono definire regole, come un normale contratto, e imporle automaticamente tramite codice. Gli smart contract non sono eliminabili di default e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

Se stai muovendo i primi passi o stai cercando un'introduzione meno tecnica, consigliamo la nostra [introduzione agli smart contract](/smart-contracts/).

È importante aver letto gli argomenti su [account](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e [macchina virtuale di Ethereum](/developers/docs/evm/) prima di entrare nel mondo degli smart contract.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la metafora più efficace per uno smart contract è un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con i giusti input si ottiene un determinato output.

Per ottenere uno snack da un distributore:

```
denaro + scelta dello snack = snack erogato
```

Questa logica è programmata nel distributore automatico.

Uno smart contract, proprio come un distributore automatico, contiene una logica programmata al suo interno. Ecco un semplice esempio di come questo distributore automatico apparirebbe se fosse uno smart contract scritto in Solidity:

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

Chiunque può scrivere uno smart contract e distribuirlo sulla rete. È sufficiente sapere programmare in un [linguaggio per smart contract](/developers/docs/smart-contracts/languages/) e avere ETH sufficienti per distribuire il contratto. Distribuire uno smart contract tecnicamente è una transazione, quindi occorre pagare una certa quantità di [gas](/developers/docs/gas/), proprio come accade per un semplice trasferimento di ETH. Tuttavia, i costi del gas per la distribuzione del contratto sono molto più elevati.

Ethereum prevede linguaggi pratici per gli sviluppatori per la scrittura di smart contract:

- Solidity
- Vyper

[Ulteriori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

I contratti devono però essere compilati prima di poter essere distribuiti, affinché la macchina virtuale Ethereum possa interpretarli e memorizzarli. [Ulteriori informazioni sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

Gli smart contract sono pubblici su Ethereum e possono essere paragonati ad API aperte. Questo significa che puoi chiamare altri smart contract nel tuo contratto in modo da estendere ampiamente quanto possibile. I contratti possono anche distribuire altri contratti.

Scopri di più sulla [componibilità degli smart contract](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

Gli smart contract da soli non possono ottenere informazioni sugli eventi del mondo reale, in quanto non possono inviare richieste HTTP. È così per progettazione. Basarsi su informazioni esterne potrebbe pregiudicare il consenso, importante per la sicurezza e la decentralizzazione.

Esistono modi per aggirare questa condizione, grazie agli [oracoli](/developers/docs/oracles/).

Un altro limite degli smart contract è la dimensione massima del contratto. Uno smart contract può avere una dimensione massima di 24KB o esaurirà il carburante. Questo problema può essere aggirato usando [il Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535) (schema a diamante).

## Contratti multifirma {#multisig}

I contratti multifirma (firma multipla) sono conti per smart contract che richiedono più firme valide per eseguire una transazione. Ciò è molto utile per evitare singoli punti di fallimento per i contratti che detengono importi sostanziali di ether o altri token. I multifirma dividono inoltre la responsabilità per l'esecuzione del contratto e la gestione delle chiavi tra diverse parti e impediscono la perdita di una singola chiave privata, che si tradurrebbe in una perdita di fondi irreversibile. Per questi motivi, i contratti multifirma sono utilizzabili per una semplice governance DAO. Per poter esser eseguiti i multifirma richiedono N di M firme accettabili possibili (dove N ≤ M e M > 1). `N = 3, M = 5` e `N = 4, M = 7` sono comunemente usati. Un multifirma 4/7 richiede quattro di sette possibili firme valide. Questo significa che i fondi possono comunque essere recuperati, anche se vengono perse tre firme. In questo caso, significa anche che la maggioranza dei possessori della chiave deve acconsentire e firmare affinché il contratto venga eseguito.

## Risorse sugli Smart Contract {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Libreria per lo sviluppo sicuro di smart contract._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di programmazione sicuri, semplici e flessibili per smart contract._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Letture consigliate {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 novembre 2019 - Yos Riady_
- [Contratti puliti - Una guida a modelli e pratiche per gli smart contract](https://www.wslyvh.com/clean-contracts/) _– 30 luglio 2020 - wslyvh_
