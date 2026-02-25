---
title: Distribuzione del tuo primo smart contract
description: Un'introduzione alla distribuzione del tuo primo smart contract su una rete di test di Ethereum
author: "jdourlens"
tags:
  [
    "smart contract",
    "remix",
    "Solidity",
    "distribuzione"
  ]
skill: beginner
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Immagino che tu sia entusiasta quanto noi di [distribuire](/developers/docs/smart-contracts/deploying/) e interagire con il tuo primo [smart contract](/developers/docs/smart-contracts/) sulla blockchain di Ethereum.

Non preoccuparti, essendo il nostro primo smart contract, lo distribuiremo su una [rete di test locale](/developers/docs/networks/), così non ti costerà nulla distribuirlo e giocarci quanto vuoi.

## Scrivere il nostro contratto {#writing-our-contract}

Il primo passaggio è [visitare Remix](https://remix.ethereum.org/) e creare un nuovo file. Nella parte in alto a sinistra dell'interfaccia di Remix, aggiungi un nuovo file e inserisci il nome che preferisci.

![Aggiunta di un nuovo file nell'interfaccia di Remix](./remix.png)

Nel nuovo file, incolleremo il seguente codice.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variabile pubblica di tipo intero senza segno per tenere il numero di conteggi
    uint256 public count = 0;

    // Funzione che incrementa il nostro contatore
    function increment() public {
        count += 1;
    }

    // Getter non necessario per ottenere il valore del conteggio
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Se hai familiarità con la programmazione, puoi intuire facilmente cosa fa questo programma. Ecco una spiegazione riga per riga:

- Riga 4: Definiamo un contratto con il nome `Counter`.
- Riga 7: Il nostro contratto memorizza un intero senza segno di nome `count`, che parte da 0.
- Riga 10: La prima funzione modificherà lo stato del contratto e incrementerà (`increment()`) la nostra variabile `count`.
- Riga 15: La seconda funzione è solo un getter per poter leggere il valore della variabile `count` al di fuori dello smart contract. Nota che, siccome abbiamo definito la nostra variabile `count` come pubblica, questo non è necessario, ma è mostrato come esempio.

Questo è tutto per il nostro primo, semplice smart contract. Come forse saprai, assomiglia a una classe dei linguaggi OOP (programmazione orientata agli oggetti) come Java o C++. Ora è il momento di sperimentare con il nostro contratto.

## Distribuzione del nostro contratto {#deploying-our-contract}

Ora che abbiamo scritto il nostro primo smart contract, lo distribuiremo sulla blockchain per poterci interagire.

[Distribuire lo smart contract sulla blockchain](/developers/docs/smart-contracts/deploying/) in realtà significa solo inviare una transazione contenente il codice dello smart contract compilato, senza specificare alcun destinatario.

Per prima cosa, [compileremo il contratto](/developers/docs/smart-contracts/compiling/) cliccando sull'icona di compilazione sulla sinistra:

![L'icona di compilazione nella barra degli strumenti di Remix](./remix-compile-button.png)

Quindi, clicca sul pulsante di compilazione:

![Il pulsante di compilazione nel compilatore Solidity di Remix](./remix-compile.png)

Puoi scegliere di selezionare l'opzione "Auto compile" in modo che il contratto venga sempre compilato quando salvi il contenuto nell'editor di testo.

Quindi, vai alla schermata "deploy and run transactions":

![L'icona di distribuzione nella barra degli strumenti di Remix](./remix-deploy.png)

Una volta sulla schermata "deploy and run transactions", controlla che il nome del tuo contratto appaia e clicca su Deploy. Come puoi vedere in cima alla pagina, l'ambiente corrente è “JavaScript VM”, il che significa che distribuiremo e interagiremo con il nostro smart contract su una blockchain di test locale, per poterlo testare più velocemente e senza commissioni.

![Il pulsante di distribuzione nel compilatore Solidity di Remix](./remix-deploy-button.png)

Una volta cliccato il pulsante “Deploy”, vedrai il tuo contratto apparire in basso. Clicca la freccia a sinistra per espanderlo e vedere il contenuto del nostro contratto. Questi sono la nostra variabile `counter`, la nostra funzione `increment()` e il getter `getCounter()`.

Se clicchi sul pulsante `count` o `getCount`, recupererà e mostrerà il contenuto della variabile `count` del contratto. Dato che non abbiamo ancora chiamato la funzione `increment`, dovrebbe mostrare 0.

![Il pulsante della funzione nel compilatore Solidity di Remix](./remix-function-button.png)

Ora chiamiamo la funzione `increment` cliccando sul pulsante. Vedrai apparire i log delle transazioni effettuate in fondo alla finestra. Vedrai che i log sono diversi quando premi il pulsante per recuperare i dati invece del pulsante `increment`. Questo perché la lettura dei dati sulla blockchain non richiede transazioni (scrittura) né commissioni. Questo perché solo la modifica dello stato della blockchain richiede una transazione:

![Un log di transazioni](./transaction-log.png)

Dopo aver premuto il pulsante `increment`, che genera una transazione per chiamare la nostra funzione `increment()`, se clicchiamo di nuovo sui pulsanti `count` o `getCount`, leggeremo lo stato appena aggiornato del nostro smart contract, con la variabile `count` che sarà maggiore di 0.

![Stato dello smart contract appena aggiornato](./updated-state.png)

Nella prossima guida, vedremo [come aggiungere eventi ai tuoi smart contract](/developers/tutorials/logging-events-smart-contracts/). La registrazione degli eventi è un modo pratico per eseguire il debug del tuo smart contract e capire cosa succede quando viene chiamata una funzione.
