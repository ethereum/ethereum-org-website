---
title: Distribuire il tuo primo contratto intelligente
description: Un'introduzione alla distribuzione del tuo primo contratto intelligente su una rete di test di Ethereum
author: "jdourlens"
tags: ["contratti intelligenti", "Remix", "Solidity", "distribuzione"]
skill: beginner
breadcrumb: Distribuisci il primo contratto
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Immagino che tu sia entusiasta quanto noi di [distribuire](/developers/docs/smart-contracts/deploying/) e interagire con il tuo primo [contratto intelligente](/developers/docs/smart-contracts/) sulla blockchain di Ethereum.

Non preoccuparti, dato che è il nostro primo contratto intelligente, lo distribuiremo su una [rete di test locale](/developers/docs/networks/) in modo che non ti costi nulla distribuirlo e giocarci quanto vuoi.

## Scrivere il nostro contratto {#writing-our-contract}

Il primo passo è [visitare Remix](https://remix.ethereum.org/) e creare un nuovo file. Nella parte in alto a sinistra dell'interfaccia di Remix, aggiungi un nuovo file e inserisci il nome del file che desideri.

![Aggiungere un nuovo file nell'interfaccia di Remix](./remix.png)

Nel nuovo file, incolleremo il seguente codice.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Variabile pubblica di tipo unsigned int per mantenere il numero di conteggi
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

Se sei abituato a programmare, puoi facilmente intuire cosa fa questo programma. Ecco una spiegazione riga per riga:

- Riga 4: Definiamo un contratto con il nome `Counter`.
- Riga 7: Il nostro contratto memorizza un intero senza segno chiamato `count` che parte da 0.
- Riga 10: La prima funzione modificherà lo stato del contratto e incrementerà (`increment()`) la nostra variabile `count`.
- Riga 15: La seconda funzione è solo un getter per poter leggere il valore della variabile `count` all'esterno del contratto intelligente. Nota che, poiché abbiamo definito la nostra variabile `count` come pubblica, questo non è necessario ma viene mostrato come esempio.

Questo è tutto per il nostro primo semplice contratto intelligente. Come forse saprai, assomiglia a una classe dei linguaggi OOP (Programmazione Orientata agli Oggetti) come Java o C++. Ora è il momento di giocare con il nostro contratto.

## Distribuire il nostro contratto {#deploying-our-contract}

Poiché abbiamo scritto il nostro primissimo contratto intelligente, ora lo distribuiremo sulla blockchain per poterci giocare.

[Distribuire il contratto intelligente sulla blockchain](/developers/docs/smart-contracts/deploying/) in realtà consiste solo nell'inviare una transazione contenente il codice del contratto intelligente compilato senza specificare alcun destinatario.

Per prima cosa [compileremo il contratto](/developers/docs/smart-contracts/compiling/) cliccando sull'icona di compilazione sul lato sinistro:

![L'icona di compilazione nella barra degli strumenti di Remix](./remix-compile-button.png)

Quindi clicca sul pulsante di compilazione:

![Il pulsante di compilazione nel compilatore Solidity di Remix](./remix-compile.png)

Puoi scegliere di selezionare l'opzione "Auto compile" in modo che il contratto venga sempre compilato quando salvi il contenuto nell'editor di testo.

Quindi naviga alla schermata "deploy and run transactions" (distribuisci ed esegui transazioni):

![L'icona di distribuzione nella barra degli strumenti di Remix](./remix-deploy.png)

Una volta che sei nella schermata "deploy and run transactions", controlla che appaia il nome del tuo contratto e clicca su Deploy. Come puoi vedere in cima alla pagina, l'ambiente attuale è "JavaScript VM", il che significa che distribuiremo e interagiramo con il nostro contratto intelligente su una blockchain di test locale per poter testare più velocemente e senza alcuna commissione.

![Il pulsante di distribuzione nel compilatore Solidity di Remix](./remix-deploy-button.png)

Una volta cliccato il pulsante "Deploy", vedrai apparire il tuo contratto in basso. Clicca sulla freccia a sinistra per espanderlo in modo da vedere il contenuto del nostro contratto. Questa è la nostra variabile `counter`, la nostra funzione `increment()` e il getter `getCounter()`.

Se clicchi sul pulsante `count` o `getCount`, recupererà effettivamente il contenuto della variabile `count` del contratto e lo visualizzerà. Poiché non abbiamo ancora chiamato la funzione `increment`, dovrebbe visualizzare 0.

![Il pulsante della funzione nel compilatore Solidity di Remix](./remix-function-button.png)

Chiamiamo ora la funzione `increment` cliccando sul pulsante. Vedrai i log delle transazioni effettuate apparire nella parte inferiore della finestra. Vedrai che i log sono diversi quando premi il pulsante per recuperare i dati invece del pulsante `increment`. Questo perché la lettura dei dati sulla blockchain non richiede alcuna transazione (scrittura) o commissione. Perché solo la modifica dello stato della blockchain richiede di effettuare una transazione:

![Un log di transazioni](./transaction-log.png)

Dopo aver premuto il pulsante di incremento che genererà una transazione per chiamare la nostra funzione `increment()`, se clicchiamo di nuovo sui pulsanti count o getCount leggeremo il nuovo stato aggiornato del nostro contratto intelligente con la variabile count maggiore di 0.

![Nuovo stato aggiornato del contratto intelligente](./updated-state.png)

Nel prossimo tutorial, tratteremo [come puoi aggiungere eventi ai tuoi contratti intelligenti](/developers/tutorials/logging-events-smart-contracts/). La registrazione degli eventi è un modo conveniente per eseguire il debug del tuo contratto intelligente e capire cosa sta succedendo durante la chiamata di una funzione.