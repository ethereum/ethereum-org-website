---
title: Distribuzione del primo Smart Contract
description: Introduzione alla distribuzione del primo Smart Contract su una rete di prova Ethereum
author: "jdourlens"
tags:
  - "smart contract"
  - "remix"
  - "Solidity"
  - "distribuzione"
skill: beginner
lang: it
published: 2020-04-03
source: EthereumDev
sourceUrl: https://ethereumdev.io/deploying-your-first-smart-contract/
address: "0x19dE91Af973F404EDF5B4c093983a7c6E3EC8ccE"
---

Sicuramente sarai entusiasta almeno quanto noi di [distribuire](/developers/docs/smart-contracts/deploying/) il tuo primo [Smart Contract](/developers/docs/smart-contracts/) e interagirvi sulla blockchain Ethereum.

Non preoccuparti, essendo il nostro primo smart contract, lo distribuiremo su una [rete locale di prova](/developers/docs/networks/) così che non ti costi nulla distribuirlo e giocarci quanto vuoi.

## Scrittura del contratto {#writing-our-contract}

Il primo passaggio consiste nel [visitare Remix](https://remix.ethereum.org/) e creare un nuovo file. Nella parte in alto a sinistra dell'interfaccia di Remix, aggiungi un nuovo file e inserisci il nome che preferisci.

![Aggiunta di un nuovo file all'interfaccia di Remix](./remix.png)

Nel nuovo file, incolleremo il seguente codice.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.17;

contract Counter {

    // Public variable of type unsigned int to keep the number of counts
    uint256 public count = 0;

    // Function that increments our counter
    function increment() public {
        count += 1;
    }

    // Not necessary getter to get the count value
    function getCount() public view returns (uint256) {
        return count;
    }

}
```

Se sei familiare con la programmazione, puoi facilmente intuire cosa faccia questo programma. Ecco una spiegazione riga per riga:

- Riga 4: definiamo un contratto con il nome `Counter`.
- Riga 7: il nostro contratto memorizza un numero intero senza firma `count` a partire da 0.
- Riga 10: la prima funzione modificherà lo stato del contratto e incrementerà (`increment()`) la nostra variabile `count`.
- Riga 15: la seconda funzione è solo un getter per leggere il valore della variabile `count` al di fuori dello Smart Contract. Nota che, dato che abbiamo definito la variabile `count` come pubblica, questo non è necessario. Lo indichiamo come esempio.

Questo è tutto per il nostro primo semplice Smart Contract. Come forse saprai, somiglia un po' un linguaggio di OOP (Programmazione Orientata agli Oggetti), come Java o C++. Ora è il momento di sperimentare con il contratto.

## Distribuzione del contratto {#deploying-our-contract}

Una volta scritto il nostro primo Smart Contract, è il momento di distribuirlo sulla blockchain per potervi interagire.

[Distribuire il primo Smart Contract sulla blockchain](/developers/docs/smart-contracts/deploying/) significa semplicemente inviare una transazione contenente il codice dello Smart Contract compilato senza specificare nessun destinatario.

Dovremo per prima cosa [compilare il contratto](/developers/docs/smart-contracts/compiling/) facendo clic sull'icona di compilazione sul lato sinistro:

![L'icona compile nella toolbar di Remix](./remix-compile-button.png)

Poi facciamo clic sul pulsante di compilazione:

![Il pulsante compile nel compilatore Solidity di Remix](./remix-compile.png)

Puoi scegliere di selezionare l'opzione "Auto compile" in modo che il contratto venga sempre compilato quando salvi il contenuto nell'editor di testo.

Poi passa alla schermata per la distribuzione e l'esecuzione delle transazioni:

![L'icona deploy nella toolbar di Remix](./remix-deploy.png)

Una volta sulla schermata di distribuzione ed esecuzione, controlla bene che appaia il nome del tuo contratto e fai clic su Deploy. Come puoi vedere in alto nella pagina, l'ambiente corrente è "JavaScript VM", che significa che distribuiremo il nostro Smart Contract e interagiremo con esso su una blockchain di test locale per poter effettuare test in modo più veloce e senza commissioni.

![Il pulsante deploy nel compilatore Solidity di Remix](./remix-deploy-button.png)

Una volta fatto clic sul pulsante "Deploy", il tuo contratto apparirà nella parte inferiore. Fai clic sulla freccia a sinistra per espanderlo, così da vederne il contenuto. Questa è la nostra variabile `counter`, la nostra funzione `increment()` e il getter `getCounter()`.

Se fai clic sul pulsante `count` o `getCount`, verrà recuperato e mostrato il contenuto della variabile `count` del contratto. Dato che non abbiamo ancora chiamato la funzione `increment`, questa dovrebbe indicare 0.

![Il pulsante function nel compilatore Solidity di Remix](./remix-function-button.png)

Chiamiamo ora la funzione `increment` facendo clic sul pulsante. Appariranno i log delle transazioni nella parte inferiore della finestra. Vedrai che i log sono diversi quando premi il pulsante per recuperare i dati invece del pulsante `increment`. Questo perché leggere dati sulla blockchain non richiede alcuna transazione (scrittura) o commissione. Perché una transazione è richiesta solo quando si modifica lo stato della blockchain:

![Un log delle transazioni](./transaction-log.png)

Dopo aver scelto il pulsante increment che genererà una transazione per chiamare la funzione `increment()`, se facciamo clic di nuovo sui pulsanti count o getCount, leggiamo lo stato aggiornato del nostro Smart Contract con la variabile count maggiore di 0.

![Il nuovo stato dello Smart Contract aggiornato](./updated-state.png)

Nel prossimo tutorial spiegheremo [come aggiungere eventi agli Smart Contract](/developers/tutorials/logging-events-smart-contracts/). Avere un log degli eventi è un modo comodo per eseguire il debug di uno Smart Contract e per capire cosa succede quando si chiama una funzione.
