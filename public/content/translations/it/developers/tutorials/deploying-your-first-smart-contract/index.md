---
title: Distribuire il tuo primo smart contract
description: Un'introduzione alla distribuzione del tuo primo smart contract su una rete di test di Ethereum
author: "jdourlens"
tags: ["smart contract", "Remix", "Solidity", "distribuzione"]
skill: beginner
breadcrumb: Distribuire il primo contratto
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Immagino che tu sia entusiasta quanto noi di [distribuire](/developers/docs/smart-contracts/deploying/) e interagire con il tuo primo [smart contract](/developers/docs/smart-contracts/) sulla blockchain di Ethereum.

Non preoccuparti, dato che è il nostro primo smart contract, lo distribuiremo su una [rete di test locale](/developers/docs/networks/) in modo che non ti costi nulla distribuirlo e giocarci quanto vuoi.

## Scrivere il nostro contratto {#writing-our-contract}

Il primo passo è [visitare Remix](https://remix.ethereum.org/) e creare un nuovo file. Nella parte in alto a sinistra dell'interfaccia di Remix, aggiungi un nuovo file e inserisci il nome del file che desideri.

![Adding a new file in the Remix interface](./remix.png)

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

Se hai familiarità con la programmazione, puoi facilmente intuire cosa fa questo programma. Ecco una spiegazione riga per riga:

- Riga 4: Definiamo un contratto con il nome `Counter`.
- Riga 7: Il nostro contratto memorizza un intero senza segno (unsigned integer) chiamato `count` che parte da 0.
- Riga 10: La prima funzione modificherà lo stato del contratto e incrementerà (`increment()`) la nostra variabile `count`.
- Riga 15: La seconda funzione è solo un getter per poter leggere il valore della variabile `count` all'esterno dello smart contract. Nota che, poiché abbiamo definito la nostra variabile `count` come pubblica, questo non è necessario ma è mostrato come esempio.

Questo è tutto per il nostro primo semplice smart contract. Come forse saprai, assomiglia a una classe dei linguaggi di programmazione orientata agli oggetti (OOP) come Java o C++. Ora è il momento di giocare con il nostro contratto.

## Distribuire il nostro contratto {#deploying-our-contract}

Avendo scritto il nostro primissimo smart contract, ora lo distribuiremo sulla blockchain per poterci giocare.

[Distribuire lo smart contract sulla blockchain](/developers/docs/smart-contracts/deploying/) consiste in realtà nell'inviare una transazione contenente il codice dello smart contract compilato senza specificare alcun destinatario.

Per prima cosa [compileremo il contratto](/developers/docs/smart-contracts/compiling/) cliccando sull'icona di compilazione sul lato sinistro:

![The compile icon in the Remix toolbar](./remix-compile-button.png)

Quindi clicca sul pulsante di compilazione:

![The compile button in the Remix solidity compiler](./remix-compile.png)

Puoi scegliere di selezionare l'opzione "Auto compile" in modo che il contratto venga sempre compilato quando salvi il contenuto nell'editor di testo.

Quindi naviga alla schermata "deploy and run transactions":

![The deploy icon in the Remix toolbar](./remix-deploy.png)

Una volta nella schermata "deploy and run transactions", verifica che appaia il nome del tuo contratto e clicca su Deploy. Come puoi vedere nella parte superiore della pagina, l'ambiente corrente è "JavaScript VM", il che significa che distribuiremo e interagiremo con il nostro smart contract su una blockchain di test locale per poter testare più velocemente e senza alcuna commissione.

![The deploy button in the Remix solidity compiler](./remix-deploy-button.png)

Dopo aver cliccato sul pulsante "Deploy", vedrai apparire il tuo contratto in basso. Clicca sulla freccia a sinistra per espanderlo in modo da vedere il contenuto del nostro contratto. Questa è la nostra variabile `counter`, la nostra funzione `increment()` e il getter `getCounter()`.

Se clicchi sul pulsante `count` o `getCount`, recupererà effettivamente il contenuto della variabile `count` del contratto e lo visualizzerà. Poiché non abbiamo ancora chiamato la funzione `increment`, dovrebbe visualizzare 0.

![The function button in the Remix solidity compiler](./remix-function-button.png)

Chiamiamo ora la funzione `increment` cliccando sul pulsante. Vedrai i log delle transazioni effettuate apparire nella parte inferiore della finestra. Noterai che i log sono diversi quando premi il pulsante per recuperare i dati rispetto al pulsante `increment`. Questo perché la lettura dei dati sulla blockchain non richiede alcuna transazione (scrittura) o commissione. Infatti, solo la modifica dello stato della blockchain richiede di effettuare una transazione:

![A log of transactions](./transaction-log.png)

Dopo aver premuto il pulsante di incremento che genererà una transazione per chiamare la nostra funzione `increment()`, se clicchiamo di nuovo sui pulsanti count o getCount leggeremo il nuovo stato aggiornato del nostro smart contract con la variabile count maggiore di 0.

![Newly updated state of the smart contract](./updated-state.png)

Nel prossimo tutorial, tratteremo [come aggiungere eventi ai tuoi smart contract](/developers/tutorials/logging-events-smart-contracts/). Registrare i log degli eventi è un modo conveniente per eseguire il debug del tuo smart contract e capire cosa sta succedendo durante la chiamata di una funzione.