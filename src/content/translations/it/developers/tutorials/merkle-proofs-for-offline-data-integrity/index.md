---
title: Prove di Merkle per l'integrità dei dati offline
description: Garantire l'integrità dei dati sulla catena per i dati memorizzati principalmente al di fuori di essa
author: Ori Pomerantz
tags:
  - "merkle"
  - "integrità"
  - "archiviazione"
skill: advanced
lang: it
published: 2021-12-30
---

## Introduzione {#introduction}

Idealmente, vorremmo poter salvare qualsiasi cosa nella memoria di Ethereum, che è conservata su migliaia di computer e presenta un'altissima disponibilità (i dati non sono censurabili) ma anche integrità (i dati non sono modificabili in modo non autorizzato), ma occorre ricordare che memorizzare una parola di 32 byte costa solitamente 20.000 unità di carburante. Mentre scriviamo il presente articolo, tale costo equivale a 6,60 dollari. Ne consegue che 21 centesimi per byte sia un costo impraticabile per molti utilizzi.

Per risolvere questo problema l'ecosistema di Ethereum ha sviluppato [molti metodi alternativi per memorizzare dati in modo decentralizzato](/developers/docs/storage/). Solitamente occorre raggiungere un compromesso tra disponibilità e prezzo, mentre l'integrità è generalmente garantita.

In questo articolo imparerai **come** garantire l'integrità dei dati senza memorizzare i dati sulla blockchain, usando le [prove di Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Come funziona? {#how-does-it-work}

In teoria, potremmo semplicemente memorizzare l'hash dei dati sulla catena e inviare tutti i dati nelle transazioni che lo richiedono. Anche questo però sarebbe troppo costoso. Un byte di dati per una transazione costa circa 16 unità di carburante, al momento circa mezzo centesimo, o 5 dollari per kilobyte. 5.000 dollari per megabyte è un prezzo comunque proibitivo per molti utilizzi, anche senza il costo supplementare connesso all'hashing dei dati.

La soluzione consiste nel procedere ripetutamente all'hashing di diverse sottoserie di dati, quindi per i dati che non devono essere inviati è sufficiente inviare un hash. A tale scopo puoi utilizzare un albero di Merkle, una struttura di dati ad albero in cui ogni nodo rappresenta un hash dei nodi sottostanti:

![Albero di Merkle](tree.png)

L'hash principale è l'unica parte che deve essere memorizzata sulla catena. Per provare un dato valore, occorre fornire tutti gli hash che devono essere combinati con esso per ottenere il root. Ad esempio, per provare `C`, occorre fornire `D`, `H(A-B)` e `H(E-H)`.

![Prova del valore di C](proof-c.png)

## Implementazione {#implementation}

[Il campione di codice è disponibile qui](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Codice esterno alla catena {#off-chain-code}

In questo articolo usiamo JavaScript per i calcoli al di fuori della catena. Gran parte delle app decentralizzate hanno i propri componenti esterni alla catena su JavaScript.

#### Creare il root di Merkle {#creating-the-merkle-root}

Prima dobbiamo fornire il root di Merkle alla catena.

```javascript
const ethers = require("ethers")
```

[Usiamo la funzione hash dal pacchetto ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// The raw data whose integrity we have to verify. The first two bytes a
// are a user identifier, and the last two bytes the amount of tokens the
// user owns at present.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificando ogni voce in un unico numero intero da 256 bit si ottiene un codice meno leggibile rispetto, ad esempio, all'utilizzo di JSON. Tuttavia, significa anche che occorre molta meno elaborazione per recuperare i dati nel contratto, quindi costi molto inferiori in termini di carburante. [JSON può essere letto sulla catena](https://github.com/chrisdotn/jsmnSol), ma è una cattiva idea, quindi se possibile consigliamo di evitarlo.

```javascript
// L'insieme di valori di hash, come BigInts
const hashArray = dataArray
```

In questo caso, per iniziare i nostri dati sono valori da 256 bit, quindi non è necessaria alcuna elaborazione. Se usiamo una struttura di dati più complicata, come le stringhe, dovremo assicurarci di eseguire per prima cosa l'hashing dei dati, così da ottenere un insieme di hash. Anche questo, ricordiamo che non importa se gli utenti conoscono le informazioni altrui. In caso contrario, dovremmo eseguire l'hashing in modo tale che l'utente 1 non conosca il valore per l'utente 0, l'utente 2 non conosca il valore per l'utente 3, ecc.

```javascript
const pairHash = (a, b) =>
  BigInt(ethers.utils.keccak256("0x" + (a ^ b).toString(16).padStart(64, 0)))
```

La funzione hash di ethers prevede di ottenere una stringa in JavaScript con un numero esadecimale, come `0x60A7` e rispondere con un'altra stringa con la stessa struttura. Tuttavia, per il resto del codice è più facile usare `BigInt`, in modo da poter convertire in una stringa esadecimale e tornare indietro.

Questa funzione è simmetrica (hash di una b [xor](https://en.wikipedia.org/wiki/Exclusive_or)). Questo significa che quando controlliamo la prova di Merkle, non dobbiamo preoccuparci di mettere il valore dalla prova prima o dopo il valore calcolato. Il controllo della prova di Merkle ha luogo sulla catena, quindi meno bisogna fare lì, meglio è.

```javascript
// The value to denote that a certain branch is empty, doesn't
// have a value
const empty = 0n
```

Quando il numero di valori non è una potenza intera di due, dobbiamo gestire i rami vuoti. A tale scopo, questo progamma inserisce zero come segnaposto.

![Albero di Merkle con rami mancanti](merkle-empty-hash.png)

```javascript
// Calcola un livello superiore dell'albero di un insieme di hash prendendo l'hash di
// ogni coppia in sequenza
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Per evitare di scrivere eccessivamente l'input

  // Aggiungi un valore vuoto se necessario (ci serve che ogni foglia sia
  // accoppiata)
  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Questa funzione "scala" un livello nell'albero di Merkle eseguendo l'hashing di coppie di valori al livello corrente. Nota che questa è l'implementazione più efficiente: avremmo potuto evitare di copiare l'input e aggiungere semplicemente `hashEmpty` nel punto appropriato del ciclo, ma questo codice è ottimizzato per migliorare la leggibilità.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray]

  // Scala l'albero finché non c'è un solo valore, ovvero la
  // radice.
  //
  // Se un livello ha un numero dispari di voci, il
  // codice in oneLevelUp aggiunge un valore vuoto, quindi se abbiamo, ad esempio,
  // 10 foglie, avremo 5 rami nel secondo livello, 3
  // nel terzo, 2 nel quarto e la radice sarà la quinta
  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Per ottenere il root, scala finché non resta solo un valore.

#### Creare una prova di Merkle {#creating-a-merkle-proof}

Una prova di Merkle è data dai valori da sottoporre all'hash insieme al valore dimostrato in modo da ottenere nuovamente il root del Merkle. Il valore da provare spesso è ricavabile da altri dati, quindi preferisco fornirlo separatamente anziché come parte del codice.

```javascript
// Una prova di merkle consiste nel valore dell'elenco di voci con
// cui eseguire l'hash. Poiché usiamo una funzione di hash, non ci
// serve la posizione dell'elemento per verificare la prova, solo per crearla
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Finché non raggiungiamo la cima
    while (currentLayer.length > 1) {
        // Nessun livello di lunghezza dispari
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Se currentN è dispari, aggiungi il valore prima di esso alla prova
            ? currentLayer[currentN-1]
               // Se è pari, aggiungi il valore successivo
            : currentLayer[currentN+1])

```

Eseguiamo l'hashing di `(v[0],v[1])`, `(v[2],v[3])`, ecc. Quindi per i valori pari ci serve quello successivo, mentre per i valori dispari ci serve quello precedente.

```javascript
        // Move to the next layer up
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Codice sulla catena {#off-chain-code}

Infine abbiamo il codice che verifica la prova. Il codice sulla catena è scritto in [Solidity](https://docs.soliditylang.org/en/v0.8.11/). L'ottimizzazione è molto più importante qui, perché il gas è relativamente costoso.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

Ho scritto questo usando l'[ambiente di sviluppo Hardhat](https://hardhat.org/), che ci consente di avere l'[output della console da Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html), durante lo sviluppo.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Extremely insecure, in production code access to
    // this function MUST BE strictly limited, probably to an
    // owner
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Imposta e ottieni le funzioni per il root di Merkle. Far aggiornare a tutti il root di Merkle è un'_idea estremamente pessima_ in un sistema di produzione. Qui lo faccio per la semplicità del codice campione. **Sconsiglio di farlo su un sistema in cui l'integrità dei dati è importante**.

```solidity
    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a ^ _b)));
    }
```

Questa funzione genera l'hash di una coppia. È solo la traduzione in Solidity del codice JavaScript per `pairHash`.

**Nota:** Questo è un altro caso d'ottimizzazione per migliorare la leggibilità. In base alla [definizione della funzione](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), potrebbe essere possibile memorizzare i dati come valore [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) ed evitare le conversioni.

```solidity
    // Verifica una prova di Merkle
    function verifyProof(uint _value, uint[] calldata _proof)
        public view returns (bool) {
      uint temp = _value;
      uint i;

      for(i=0; i<_proof.length; i++) {
        temp = pairHash(temp, _proof[i]);
      }

      return temp == merkleRoot;
    }

}  // MarkleProof
```

Nella notazione matematica, la verifica della prova di Merkle somiglia a questa: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Questo codice la implementa.

## Prove di Merkle e rollup non si mescolano {#merkle-proofs-and-rollups}

Le prove di Merkle non funzionano bene con i [rollup](/developers/docs/scaling/#rollups). Il motivo è che i rollup scrivono tutti i dati della transazione su L1, ma elaborano su L2. Il costo per inviare una prova di Merkle con una transazione è in media di 638 unità di carburante per livello (attualmente un byte in dati di chiamata costa 16 unità di carburante se non è zero e 4 se è zero). Se abbiamo 1.024 parole di dati, una prova di Merkle richiede 10 livelli, o un totale di 6.380 unità di carburante.

Guardando ad esempio [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m)., se scriviamo L1, il gas costa circa 100 gwei e L2 costa 0,001 gwei di gas (questo è il prezzo normale, che può aumentare in caso di congestione). Quindi per il costo di un gas di L1, possiamo spendere centinaia di migliaia di unitàù di acrburante per l'elaborazione su L2. Supponendo che non sovrascriviamo la memoria, significa che possiamo scrivere circa 5 parole in memoria su L2 al prezzo di un gas di L1. Per una sola prova di Merkle possiamo scrivere tutte le 1.024 parole in memoria (presumendo innanzi tutto che siano calcolabili sulla catena, anziché fornite in una transazione) e avremo ancora gran parte del gas rimanente.

## Conclusioni {#conclusion}

Nella vita reale potresti non implementare mai gli alberi di Merkle per conto tuo. Esistono librerie ben note e controllate che puoi usare e, in generale, è meglio non implementare primitivi crittografici autonomamente. Ma spero che ora tu abbia compreso meglio le prove di Merkle e possa decidere quando vale la pena usarle.

Nota che mentre le prove di Merkle preservano l'_integrità_, non preservano la _disponibilità_. Sapendo che nessun altro può prendere le tue risorse è una piccola consolazione se la memoria dati decide di non consentire l'accesso e risulta impossibile decostruire un albero di Merkle per accedervi. Quindi gli alberi di Merkle funzionano meglio con qualche tipo di memoria decentralizzata, come IPFS.
