---
title: Introduzione ai contratti intelligenti
description: Una panoramica sui contratti intelligenti, incentrata sulle loro caratteristiche e limitazioni uniche.
lang: it
---

## Cos'è un contratto intelligente? {#what-is-a-smart-contract}
Un "contratto intelligente" è semplicemente un programma eseguito sulla blockchain di Ethereum. È una raccolta di codice (le funzioni) e dati (lo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

I contratti intelligenti sono un tipo di [conto Ethereum](/developers/docs/accounts/). Ciò significa che hanno un saldo e possono essere oggetto di transazioni. Però non sono controllati da un utente, ma distribuiti in rete ed eseguiti come programmato. I conti degli utenti possono quindi interagire con un contratto intelligente, inviando transazioni che eseguono una funzione definita sul contratto intelligente. I contratti intelligenti possono definire delle regole, come un contratto normale, e imporle automaticamente tramite il codice. I contratti intelligenti non possono esser eliminati di default e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

Se stai solo muovendo i primi passi o cerchi un'introduzione meno tecnica, ti consigliamo la nostra [introduzione ai contratti intelligenti](/smart-contracts/).

Assicurati di aver letto la documentazione su [conti](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e la [macchina virtuale di Ethereum](/developers/docs/evm/) prima di tuffarti nel mondo dei contratti intelligenti.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la metafora migliore per un contratto intelligente è un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con i giusti input si ottiene un determinato output.

Per ricevere uno snack da un distributore la logica necessaria è la seguente:

```
denaro + scelta dello snack = snack erogato
```

Questa logica è programmata nel distributore automatico.

Un contratto intelligente, come un distributore automatico, contiene della logica programmata. Ecco un semplice esempio di come apparirebbe questo distributore automatico se fosse un contratto intelligente scritto in Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Dichiara le variabili di stato del contratto
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando il contratto 'VendingMachine' viene distribuito:
    // 1. imposta l'indirizzo di distribuzione come proprietario del contratto
    // 2. imposta a 100 il saldo di cupcake del contratto intelligente distribuito
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Consenti al proprietario di aumentare il saldo di cupcake del contratto intelligente
    function refill(uint amount) public {
        require(msg.sender == owner, "Solo il proprietario può rifornire.");
        cupcakeBalances[address(this)] += amount;
    }

    // Consenti a chiunque di acquistare cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "Devi pagare almeno 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Non ci sono abbastanza cupcake in magazzino per completare questo acquisto");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Proprio come un distributore automatico rimuove la necessità di un addetto alla vendita, i contratti intelligenti possono sostituire gli intermediari in molte industrie.

## Senza permessi {#permissionless}

Chiunque può scrivere un contratto intelligente e distribuirlo sulla rete. Devi solo imparare a programmare in un [linguaggio di contratto intelligente](/developers/docs/smart-contracts/languages/) e avere abbastanza ETH per distribuire il tuo contratto. La distribuzione di un contratto intelligente è tecnicamente una transazione, quindi devi pagare il [gas](/developers/docs/gas/) allo stesso modo in cui lo paghi per un semplice trasferimento di ETH. Tuttavia, i costi del gas per la distribuzione del contratto sono molto più elevati.

Ethereum prevede dei linguaggi pratici per gli sviluppatori per scrivere i contratti intelligenti:

- Solidity
- Vyper

[Maggiori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

I contratti devono però essere compilati prima di poter essere distribuiti, affinché la macchina virtuale Ethereum possa interpretarli e memorizzarli. [Maggiori informazioni sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

I contratti intelligenti sono pubblici su Ethereum e possono esser considerati come API aperte. Questo significa che puoi chiamare altri contratti intelligenti nel tuo contratto, così da estendere ampiamente ciò che è possibile. I contratti possono anche distribuire altri contratti.

Scopri di più sulla [componibilità dei contratti intelligenti](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

Gli smart contract da soli non possono ottenere informazioni sugli eventi del “mondo reale” perché non sono in grado di recuperare dati da fonti off-chain. Questo significa che non possono rispondere a eventi nel mondo reale. Sono stati progettati così. Basarsi su informazioni esterne potrebbe pregiudicare il consenso, importante per la sicurezza e la decentralizzazione.

However, it is important for blockchain applications to be able to use offchain data. La soluzione sono gli [oracoli](/developers/docs/oracles/), strumenti che acquisiscono dati off-chain e li rendono disponibili ai contratti intelligenti.

Un'altra limitazione dei contratti intelligenti è la dimensione massima del contratto. Un contratto intelligente può avere una dimensione massima di 24 Kb; altrimenti, esaurirà il gas. Questo può essere aggirato usando il [Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Contratti multifirma {#multisig}

I contratti multifirma (a firma multipla), sono conti del contratto intelligente che richiedono più firme valide per eseguire una transazione. Ciò è molto utile per evitare singoli punti di fallimento per i contratti che detengono importi sostanziali di ether o altri token. I multifirma dividono inoltre la responsabilità per l'esecuzione del contratto e la gestione delle chiavi tra diverse parti e impediscono la perdita di una singola chiave privata, che si tradurrebbe in una perdita di fondi irreversibile. Per questi motivi, i contratti multifirma sono utilizzabili per una semplice governance DAO. I multifirma richiedono N firme su M firme accettabili possibili (dove N ≤ M e M > 1) per essere eseguiti. `N = 3, M = 5` e `N = 4, M = 7` sono comunemente usati. Un multifirma 4/7 richiede quattro di sette possibili firme valide. Questo significa che i fondi possono comunque essere recuperati, anche se vengono perse tre firme. In questo caso, significa anche che la maggioranza dei possessori della chiave deve acconsentire e firmare affinché il contratto venga eseguito.

## Risorse sui contratti intelligenti {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Libreria per lo sviluppo sicuro di contratti intelligenti._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

## Letture consigliate {#further-reading}

- [Coinbase: Cos'è un contratto intelligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Cos'è un contratto intelligente?](https://chain.link/education/smart-contracts)
- [Video: Spiegazione Semplice - Contratti Intelligenti](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: piattaforma di apprendimento e auditing Web3](https://updraft.cyfrin.io)
