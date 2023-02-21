---
title: Introduzione ai contratti intelligenti
description: Una panoramica sui contratti intelligenti, incentrata sulle loro caratteristiche e limitazioni uniche.
lang: it
---

## Cos'è un contratto intelligente? {#what-is-a-smart-contract}

Un "contratto intelligente" è semplicemente un programma eseguito sulla blockchain di Ethereum. È una raccolta di codice (le funzioni) e dati (lo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

I contratti intelligenti sono un tipo di [conto di Ethereum](/developers/docs/accounts/). Ciò significa che hanno un saldo e possono essere oggetto di transazioni. Però non sono controllati da un utente, ma distribuiti in rete ed eseguiti come programmato. I conti degli utenti possono quindi interagire con un contratto intelligente, inviando transazioni che eseguono una funzione definita sul contratto intelligente. I contratti intelligenti possono definire delle regole, come un contratto normale, e imporle automaticamente tramite il codice. I contratti intelligenti non possono esser eliminati di default e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

Se stai solo muovendo i primi passi o stai cercando un'introduzione meno tecnica, consigliamo la nostra [introduzione ai contratti intelligenti](/smart-contracts/).

Assicurati di aver letto a riguardo di [conti](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e della [Macchina Virtuale di Ethereum](/developers/docs/evm/), prima di saltare nel mondo dei contratti intelligenti.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la migliore metafora per un contratto intelligente è un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con i giusti input si ottiene un determinato output.

Per ottenere uno snack da un distributore:

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

Proprio come un distributore automatico rimuove la necessità di un addetto alla vendita, i contratti intelligenti possono sostituire gli intermediari in molte industrie.

## Senza autorizzazioni {#permissionless}

Chiunque può scrivere un contratto intelligente e distribuirlo sulla rete. Devi solo imparare come programmare nel [linguaggio di un contratto intelligente](/developers/docs/smart-contracts/languages/) e avere ETH sufficienti per distribuire il tuo contratto. Distribuire un contratto intelligente è tecnicamente una transazione, quindi dovrai pagare del [Gas](/developers/docs/gas/) allo stesso modo in cui devi pagarlo per un semplice trasferimento di ETH. Tuttavia, i costi del gas per la distribuzione del contratto sono molto più elevati.

Ethereum prevede dei linguaggi pratici per gli sviluppatori per scrivere i contratti intelligenti:

- Solidity
- Vyper

[Ulteriori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

I contratti devono però essere compilati prima di poter essere distribuiti, affinché la macchina virtuale Ethereum possa interpretarli e memorizzarli. [Di più sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

Gli smart contract sono pubblici su Ethereum e possono essere paragonati ad API aperte. Questo significa che puoi chiamare altri contratti intelligenti nel tuo contratto, così da estendere ampiamente ciò che è possibile. I contratti possono anche distribuire altri contratti.

Scopri di più sulla [componibilità dei contratti intelligenti](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

I soli contratti intelligenti non possono ottenere informazioni sugli eventi del "mondo reale", poiché non possono inviare richieste HTTP. È così per progettazione. Basarsi su informazioni esterne potrebbe pregiudicare il consenso, importante per la sicurezza e la decentralizzazione.

Esistono modi per aggirare questa condizione, grazie agli [oracoli](/developers/docs/oracles/).

Un'altra limitazione dei contratti intelligenti è la dimensione massima del contratto. Un contratto intelligente può avere una dimensione massima di 24 Kb; altrimenti, esaurirà il gas. Questo problema può essere aggirato usando [il Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535) (schema a diamante).

## Contratti multifirma {#multisig}

I contratti multifirma (a firma multipla), sono conti del contratto intelligente che richiedono più firme valide per eseguire una transazione. Ciò è molto utile per evitare singoli punti di fallimento per i contratti che detengono importi sostanziali di ether o altri token. I multifirma dividono inoltre la responsabilità per l'esecuzione del contratto e la gestione delle chiavi tra diverse parti e impediscono la perdita di una singola chiave privata, che si tradurrebbe in una perdita di fondi irreversibile. Per questi motivi, i contratti multifirma sono utilizzabili per una semplice governance DAO. Per poter esser eseguiti i multifirma richiedono N di M firme accettabili possibili (dove N ≤ M e M > 1). `N = 3, M = 5` e `N = 4, M = 7` sono comunemente usati. Un multifirma 4/7 richiede quattro di sette possibili firme valide. Questo significa che i fondi possono comunque essere recuperati, anche se vengono perse tre firme. In questo caso, significa anche che la maggioranza dei possessori della chiave deve acconsentire e firmare affinché il contratto venga eseguito.

## Risorse dei contratti intelligenti {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Libreria per lo sviluppo sicuro di contratti intelligenti._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di programmazione sicuri, semplici e flessibili per contratti intelligenti._**

- [Dappsys](https://dappsys.readthedocs.io/)
- [GitHub](https://github.com/dapphub/dappsys)

## Letture consigliate {#further-reading}

- [Contratti Intelligenti: La Tecnologia della Blockchain Che Sostituirà gli Avvocati](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Migliori Pratiche per lo Sviluppo dei Contratti Intelligenti](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 novembre 2019 - Yos Riady_
- [Contratti puliti - Una guida a modelli e pratiche per i contratti intelligenti](https://www.wslyvh.com/clean-contracts/) _– 30 luglio 2020 - wslyvh_
