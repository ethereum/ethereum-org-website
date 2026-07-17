---
title: Introduzione agli smart contract
description: Una panoramica sugli smart contract, incentrata sulle loro caratteristiche uniche e limitazioni.
lang: it
---

## Cos'è uno smart contract? {#what-is-a-smart-contract}

Uno "smart contract" è semplicemente un programma che viene eseguito sulla blockchain di [Ethereum](/). È un insieme di codice (le sue funzioni) e dati (il suo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

Gli smart contract sono un tipo di [account Ethereum](/developers/docs/accounts/). Questo significa che hanno un saldo e possono essere la destinazione di transazioni. Tuttavia, non sono controllati da un utente, ma vengono distribuiti sulla rete ed eseguiti come programmati. Gli account utente possono quindi interagire con uno smart contract inviando transazioni che eseguono una funzione definita nello smart contract stesso. Gli smart contract possono definire regole, come un contratto normale, e applicarle automaticamente tramite il codice. Di default, gli smart contract non possono essere eliminati e le interazioni con essi sono irreversibili.

## Prerequisiti {#prerequisites}

Se hai appena iniziato o cerchi un'introduzione meno tecnica, ti consigliamo la nostra [introduzione agli smart contract](/smart-contracts/).

Assicurati di aver letto le informazioni su [account](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e sulla [Ethereum Virtual Machine](/developers/docs/evm/) prima di tuffarti nel mondo degli smart contract.

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la migliore metafora per uno smart contract è un distributore automatico, come descritto da [Nick Szabo](https://unenumerated.blogspot.com/). Con gli input giusti, è garantito un certo output.

Per ottenere uno snack da un distributore automatico:

```
denaro + selezione dello snack = snack erogato
```

Questa logica è programmata nel distributore automatico.

Uno smart contract, come un distributore automatico, ha una logica programmata al suo interno. Ecco un semplice esempio di come apparirebbe questo distributore automatico se fosse uno smart contract scritto in Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Dichiara le variabili di stato del contratto
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando il contratto 'VendingMachine' viene distribuito:
    // 1. imposta l'indirizzo di distribuzione come proprietario del contratto
    // 2. imposta il saldo di cupcake dello smart contract distribuito a 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Consenti al proprietario di aumentare il saldo di cupcake dello smart contract
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

Proprio come un distributore automatico elimina la necessità di un dipendente addetto alla vendita, gli smart contract possono sostituire gli intermediari in molti settori.

## Permissionless {#permissionless}

Chiunque può scrivere uno smart contract e distribuirlo sulla rete. Devi solo imparare a programmare in un [linguaggio per smart contract](/developers/docs/smart-contracts/languages/) e avere abbastanza ETH per distribuire il tuo contratto. Distribuire uno smart contract è tecnicamente una transazione, quindi devi pagare il [gas](/developers/docs/gas/) nello stesso modo in cui devi pagare il gas per un semplice trasferimento di ETH. Tuttavia, i costi del gas per la distribuzione del contratto sono molto più alti.

Ethereum dispone di linguaggi adatti agli sviluppatori per scrivere smart contract:

- Solidity
- Vyper

[Maggiori informazioni sui linguaggi](/developers/docs/smart-contracts/languages/)

Tuttavia, devono essere compilati prima di poter essere distribuiti, in modo che la macchina virtuale di Ethereum possa interpretare e memorizzare il contratto. [Maggiori informazioni sulla compilazione](/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

Gli smart contract sono pubblici su Ethereum e possono essere pensati come API aperte. Questo significa che puoi chiamare altri smart contract nel tuo smart contract per estendere notevolmente ciò che è possibile fare. I contratti possono persino distribuire altri contratti.

Scopri di più sulla [componibilità degli smart contract](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

Gli smart contract da soli non possono ottenere informazioni sugli eventi del "mondo reale" perché non possono recuperare dati da fonti offchain. Questo significa che non possono rispondere agli eventi nel mondo reale. Questo è intenzionale. Affidarsi a informazioni esterne potrebbe compromettere il consenso, che è importante per la sicurezza e la decentralizzazione.

Tuttavia, è importante che le applicazioni blockchain siano in grado di utilizzare dati offchain. La soluzione sono gli [oracoli](/developers/docs/oracles/), che sono strumenti che acquisiscono dati offchain e li rendono disponibili agli smart contract.

Un'altra limitazione degli smart contract è la dimensione massima del contratto. Uno smart contract può avere una dimensione massima di 24KB, altrimenti esaurirà il gas. Questo limite può essere aggirato utilizzando [Il Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Contratti multisig {#multisig}

I contratti multisig (a firma multipla) sono account smart contract che richiedono più firme valide per eseguire una transazione. Questo è molto utile per evitare singoli punti di vulnerabilità per i contratti che detengono quantità sostanziali di ether o altri token. I multisig dividono anche la responsabilità per l'esecuzione del contratto e la gestione delle chiavi tra più parti e impediscono che la perdita di una singola chiave privata porti alla perdita irreversibile di fondi. Per questi motivi, i contratti multisig possono essere utilizzati per la semplice governance delle DAO. I multisig richiedono N firme su M possibili firme accettabili (dove N ≤ M e M > 1) per essere eseguiti. `N = 3, M = 5` e `N = 4, M = 7` sono comunemente usati. Un multisig 4/7 richiede quattro firme valide su sette possibili. Questo significa che i fondi sono ancora recuperabili anche se si perdono tre firme. In questo caso, significa anche che la maggioranza dei detentori di chiavi deve essere d'accordo e firmare affinché il contratto venga eseguito.

## Risorse sugli smart contract {#smart-contract-resources}

**Contratti OpenZeppelin -** **_Libreria per lo sviluppo sicuro di smart contract._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

## Letture consigliate {#further-reading}

- [Coinbase: Cos'è uno smart contract?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Cos'è uno smart contract?](https://chain.link/education/smart-contracts)
- [Video: Spiegazione semplice - Smart Contract](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Piattaforma di apprendimento e auditing Web3](https://updraft.cyfrin.io)

## Tutorial: Firme degli smart contract (EIP-1271) su Ethereum {#tutorials}

- [EIP-1271: Firma e verifica delle firme degli smart contract](/developers/tutorials/eip-1271-smart-contract-signatures/) _– Come l'EIP-1271 consente agli smart contract di verificare le firme, con una guida dettagliata dell'implementazione di Safe._