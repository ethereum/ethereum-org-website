---
title: Introduzione ai contratti intelligenti
description: Una panoramica sui contratti intelligenti, concentrandosi sulle loro caratteristiche uniche e limitazioni.
lang: it
---

## Cos'è un contratto intelligente? {#what-is-a-smart-contract}

Un "contratto intelligente" è semplicemente un programma che viene eseguito sulla blockchain di [Ethereum](/). È una raccolta di codice (le sue funzioni) e dati (il suo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

I contratti intelligenti sono un tipo di [account di Ethereum](/developers/docs/accounts/). Ciò significa che hanno un saldo e possono essere l'obiettivo di transazioni. Tuttavia, non sono controllati da un utente, ma vengono distribuiti sulla rete ed eseguiti come programmati. Gli account utente possono quindi interagire con un contratto intelligente inviando transazioni che eseguono una funzione definita sul contratto intelligente. I contratti intelligenti possono definire regole, come un contratto normale, e applicarle automaticamente tramite il codice. I contratti intelligenti non possono essere eliminati per impostazione predefinita e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

Se hai appena iniziato o cerchi un'introduzione meno tecnica, ti consigliamo la nostra [introduzione ai contratti intelligenti](/smart-contracts/).

Assicurati di aver letto le informazioni su [account](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e sulla [macchina virtuale di Ethereum](/developers/docs/evm/) prima di tuffarti nel mondo dei contratti intelligenti.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la migliore metafora per un contratto intelligente è un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con gli input giusti, è garantito un certo output.

Per ottenere uno spuntino da un distributore automatico:

```
money + snack selection = snack dispensed
```

Questa logica è programmata nel distributore automatico.

Un contratto intelligente, come un distributore automatico, ha una logica programmata al suo interno. Ecco un semplice esempio di come apparirebbe questo distributore automatico se fosse un contratto intelligente scritto in Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Dichiara le variabili di stato del contratto
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando il contratto 'VendingMachine' viene distribuito:
    // 1. imposta l'indirizzo di distribuzione come proprietario del contratto
    // 2. imposta il saldo dei cupcake dello smart contract distribuito a 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Consenti al proprietario di aumentare il saldo dei cupcake dello smart contract
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Consenti a chiunque di acquistare cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Così come un distributore automatico elimina la necessità di un dipendente addetto alla vendita, i contratti intelligenti possono sostituire gli intermediari in molti settori.

## Senza permessi {#permissionless}

Chiunque può scrivere un contratto intelligente e distribuirlo sulla rete. Devi solo imparare a programmare in un [linguaggio per contratti intelligenti](/developers/docs/smart-contracts/languages/) e avere abbastanza ETH per distribuire il tuo contratto. La distribuzione di un contratto intelligente è tecnicamente una transazione, quindi devi pagare il [gas](/developers/docs/gas/) nello stesso modo in cui devi pagare il gas per un semplice trasferimento di ETH. Tuttavia, i costi del gas per la distribuzione del contratto sono molto più alti.

Ethereum ha linguaggi adatti agli sviluppatori per scrivere contratti intelligenti:

- Solidity
- Vyper

[Maggiori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

Tuttavia, devono essere compilati prima di poter essere distribuiti, in modo che la macchina virtuale di Ethereum possa interpretare e memorizzare il contratto. [Maggiori informazioni sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

I contratti intelligenti sono pubblici su Ethereum e possono essere pensati come API aperte. Ciò significa che puoi chiamare altri contratti intelligenti nel tuo contratto intelligente per estendere notevolmente ciò che è possibile fare. I contratti possono persino distribuire altri contratti.

Scopri di più sulla [componibilità dei contratti intelligenti](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

I contratti intelligenti da soli non possono ottenere informazioni sugli eventi del "mondo reale" perché non possono recuperare dati da fonti fuori catena. Ciò significa che non possono rispondere agli eventi nel mondo reale. Questo è intenzionale. Affidarsi a informazioni esterne potrebbe compromettere il consenso, che è importante per la sicurezza e la decentralizzazione.

Tuttavia, è importante che le applicazioni blockchain siano in grado di utilizzare dati fuori catena. La soluzione sono gli [oracoli](/developers/docs/oracles/), che sono strumenti che acquisiscono dati fuori catena e li rendono disponibili ai contratti intelligenti.

Un'altra limitazione dei contratti intelligenti è la dimensione massima del contratto. Un contratto intelligente può avere una dimensione massima di 24KB, altrimenti esaurirà il gas. Questo problema può essere aggirato utilizzando [Il Pattern Diamond](https://eips.ethereum.org/EIPS/eip-2535).

## Contratti multifirma {#multisig}

I contratti multifirma (firme multiple) sono account di contratti intelligenti che richiedono più firme valide per eseguire una transazione. Questo è molto utile per evitare singoli punti di vulnerabilità per i contratti che detengono quantità sostanziali di ether o altri token. I multifirma dividono anche la responsabilità per l'esecuzione del contratto e la gestione delle chiavi tra più parti e impediscono che la perdita di una singola chiave privata porti alla perdita irreversibile di fondi. Per questi motivi, i contratti multifirma possono essere utilizzati per la semplice governance delle DAO. I multifirma richiedono N firme su M possibili firme accettabili (dove N ≤ M e M > 1) per essere eseguiti. `N = 3, M = 5` e `N = 4, M = 7` sono comunemente usati. Un multifirma 4/7 richiede quattro firme valide su sette possibili. Ciò significa che i fondi sono ancora recuperabili anche se si perdono tre firme. In questo caso, significa anche che la maggioranza dei detentori delle chiavi deve essere d'accordo e firmare affinché il contratto venga eseguito.

## Risorse sui contratti intelligenti {#smart-contract-resources}

**Contratti OpenZeppelin -** **_Libreria per lo sviluppo sicuro di contratti intelligenti._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

## Letture consigliate {#further-reading}

- [Coinbase: Cos'è un contratto intelligente?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Cos'è un contratto intelligente?](https://chain.link/education/smart-contracts)
- [Video: Spiegato in modo semplice - Contratti intelligenti](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Piattaforma di apprendimento e auditing Web3](https://updraft.cyfrin.io)

## Tutorial: Firme dei contratti intelligenti (EIP-1271) su Ethereum {#tutorials}

- [EIP-1271: Firmare e verificare le firme dei contratti intelligenti](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Come l'EIP-1271 consente ai contratti intelligenti di verificare le firme, con una guida all'implementazione di Safe._