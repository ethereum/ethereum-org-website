---
title: Introduzione agli Smart Contract
description: Panoramica sugli Smart Contract, incentrata sulle loro caratteristiche e limitazioni uniche.
lang: it
sidebar: true
---

## Cos'è uno Smart Contract?

Uno Smart Contract è semplicemente un programma eseguito sulla blockchain di Ethereum. È una raccolta di codice (le funzioni) e dati (lo stato) che risiede a un indirizzo specifico sulla blockchain di Ethereum.

Gli Smart Contract sono un tipo di [account Ethereum](/en/developers/docs/accounts/). Significa che hanno un saldo e possono inviare transazioni in rete. Però non sono controllati da un utente, ma distribuiti in rete ed eseguiti come programmato. Gli account degli utenti possono quindi interagire con uno Smart Contract inviando transazioni che eseguono una funzione definita sul contratto. Gli Smart Contract possono definire regole, come un normale contratto, e imporle automaticamente tramite codice.

## Prerequisiti {#prerequisites}

È importante aver letto gli argomenti su [account](/developers/docs/accounts/), [transazioni](/developers/docs/transactions/) e [macchina virtuale di Ethereum](/developers/docs/evm/) prima di entrare nel mondo degli Smart Contract.

<!-- TODO simpler example... scheduling payments in Ethereum is actually difficult -->
<!-- TODO show an example smart contract, e.g. an implementation of a vending machine -->

## Un distributore automatico digitale {#a-digital-vending-machine}

Forse la migliore metafora per descrivere uno Smart Contract è paragonarlo a un distributore automatico, come ha fatto Nick Szabo. Con i giusti input, un determinato output è garantito.

Per ottenere uno snack da un distributore:

```
denaro + scelta dello snack = snack erogato
```

Questa logica è programmata nel distributore.

Uno Smart Contract, come un distributore automatico, ha all'interno logica programmata. Ecco un semplice esempio di come un distributore automatico potrebbe apparire come Smart Contract:

```solidity
pragma solidity 0.6.11;

contract VendingMachine {

    // Dichiara le variabili di stato del contratto
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // Quando il contratto 'VendingMachine' è distribuito:
    // 1. imposta l'indirizzo di distribuzione come proprietario del contratto
    // 2. imposta il saldo dei cupcake dello Smart Contract distribuito a 100
    constructor() public {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Consente al proprietario di aumentare il saldo dei cupcake dello Smart Contract
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Consente a tutti di acquistare cupcake
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Come un distributore automatico elimina la necessità di avere un addetto alla vendita, anche gli Smart Contract possono sostituire gli intermediari in molti settori.

## Senza autorizzazioni {#permissionless}

Tutti possono scrivere Smart Contract e distribuirli in rete. È sufficiente sapere programmare in un [linguaggio per Smart Contract](/en/developers/docs/smart-contracts/languages/) e avere abbastanza ETH per distribuire un contratto. Distribuire uno Smart Contract è tecnicamente una transazione, quindi devi pagare [carburante](/en/developers/docs/gas/) così come avviene per un semplice trasferimento di ETH. I costi del carburante per la distribuzione di un contratto sono però molto più elevati.

Ethereum prevede linguaggi comodi per gli sviluppatori per scrivere Smart Contract:

- Solidity
- Vyper

[Ulteriori informazioni sui linguaggi](/en/developers/docs/smart-contracts/languages/)

I contratti devono però essere compilati prima di poter essere distribuiti affinché la macchina virtuale Ethereum possa interpretarli e memorizzarli. [Ulteriori informazioni sulla compilazione](/en/developers/docs/smart-contracts/compiling/)

## Componibilità {#composability}

Gli Smart Contract sono pubblici su Ethereum e possono essere paragonati ad API aperte. Significa che puoi chiamare altri Smart Contract dal tuo contratto per la massima estensione possibile. I contratti possono anche distribuire altri contratti.

Scopri di più sulla [componibilità degli Smart Contract](/developers/docs/smart-contracts/composability/).

## Limitazioni {#limitations}

Gli Smart Contract da soli non possono ottenere informazioni sugli eventi del mondo reale perché non possono inviare richieste HTTP. Questo comportamento è voluto, perché basarsi su informazioni esterne potrebbe compromettere il consenso, che invece è importante per la sicurezza e la decentralizzazione.

Esistono modi per aggirare questa condizione, grazie agli [oracoli](/en/developers/docs/oracles/).

## Risorse degli Smart Contract {#smart-contract-resources}

**OpenZeppelin Contracts -** **_Libreria per lo sviluppo sicuro di Smart Contract._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Forum della community](https://forum.openzeppelin.com/c/general/16)

**DappSys -** **_Blocchi di programmazione sicuri, semplici e flessibili per Smart Contract._**

- [dapp.tools/dappsys](https://dapp.tools/dappsys/)
- [GitHub](https://github.com/dapphub/dappsys)

## Letture consigliate {#further-reading}

- [Smart Contracts: The Blockchain Technology That Will Replace Lawyers](https://blockgeeks.com/guides/smart-contracts/) _– Blockgeeks_
- [Best Practices for Smart Contract Development](https://yos.io/2019/11/10/smart-contract-development-best-practices/) _– 10 novembre 2019 - Yos Riady_
