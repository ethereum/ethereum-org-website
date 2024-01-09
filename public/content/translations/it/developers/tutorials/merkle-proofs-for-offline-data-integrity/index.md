---
title: Prove di Merkle per l'integrità dei dati offline
description: Garantire l'integrità dei dati sulla catena per i dati memorizzati principalmente al di fuori di essa
author: Ori Pomerantz
tags:
  - "archiviazione"
skill: advanced
lang: it
published: 2021-12-30
---

## Introduzione {#introduction}

Idealmente, vorremmo archiviare tutto nell'archiviazione di Ethereum, memorizzata tra migliaia di computer e avente una disponibilità estremamente elevata (i dati non sono censurabili) e integrità (i dati non sono modificabili in un modo non autorizzato), ma archiviare una parola di 32 byte costa tipicamente 20.000 gas. Mentre scriviamo il presente articolo, tale costo equivale a 6,60 dollari. Ne consegue che 21 centesimi per byte sia un costo impraticabile per molti utilizzi.

Per risolvere questo problema l'ecosistema di Ethereum ha sviluppato [molti metodi alternativi per memorizzare dati in modo decentralizzato](/developers/docs/storage/). Solitamente occorre raggiungere un compromesso tra disponibilità e prezzo, mentre l'integrità è generalmente garantita.

In questo articolo imparerai **come** garantire l'integrità dei dati senza memorizzare i dati sulla blockchain, usando le [prove di Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Come funziona? {#how-does-it-work}

In teoria, potremmo semplicemente memorizzare l'hash dei dati sulla catena e inviare tutti i dati nelle transazioni che lo richiedono. Anche questo però sarebbe troppo costoso. Un byte di dati per una transazione costa circa 16 gas, correntemente circa mezzo centesimo, o circa 5 dollari per kilobyte. 5.000 dollari per megabyte è un prezzo comunque proibitivo per molti utilizzi, anche senza il costo supplementare connesso all'hashing dei dati.

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

Codificando ogni voce in un unico numero intero da 256 bit si ottiene un codice meno leggibile rispetto, ad esempio, all'utilizzo di JSON. Tuttavia, ciò comporta un'elaborazione significativamente ridotta per recuperare i dati nel contratto, quindi costi del gas molto inferiori. [JSON può essere letto sulla catena](https://github.com/chrisdotn/jsmnSol), ma è una cattiva idea, quindi se possibile consigliamo di evitarlo.

```javascript
// L'insieme di valori di hash, come BigInts
const hashArray = dataArray
```

In questo caso, per iniziare i nostri dati sono valori da 256 bit, quindi non è necessaria alcuna elaborazione. Se usiamo una struttura di dati più complicata, come le stringhe, dovremo assicurarci di eseguire per prima cosa l'hashing dei dati, così da ottenere un insieme di hash. Anche questo, ricordiamo che non importa se gli utenti conoscono le informazioni altrui. In caso contrario, dovremmo eseguire l'hashing in modo tale che l'utente 1 non conosca il valore per l'utente 0, l'utente 2 non conosca il valore per l'utente 3, ecc.

```javascript
// Converte tra la stringa che la funzione di hash prevede e
// BigInt che usiamo ovunque.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La funzione hash di ethers prevede di ottenere una stringa in JavaScript con un numero esadecimale, come `0x60A7` e rispondere con un'altra stringa con la stessa struttura. Tuttavia, per il resto del codice è più facile usare `BigInt`, in modo da poter convertire in una stringa esadecimale e tornare indietro.

```javascript
// Hash simmetrico di una coppia, così che non ci importerà se l'ordine è invertito.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Questa funzione è simmetrica (hash di una b [xor](https://en.wikipedia.org/wiki/Exclusive_or)). Questo significa che quando controlliamo la prova di Merkle, non dobbiamo preoccuparci di mettere il valore dalla prova prima o dopo il valore calcolato. Il controllo della prova di Merkle ha luogo sulla catena, quindi meno bisogna fare lì, meglio è.

Attenzione: La crittografia è più complessa di quanto sembri. La versione iniziale di questo articolo conteneva la funzione di hash `hash(a^b)`. Quella era una **cattiva** idea, poiché comportava che, conoscendo i valori legittimi di `a` e `b` avresti potuto usare `b' = a^b^a'` per provare qualsiasi valore `a'` desiderato. Con questa funzione dovresti calcolare `b'` così che `hash(a') ^ hash(b')` sia pari a un valore noto (il ramo successivo verso la radice), il che è molto più difficile.

```javascript
// Il valore denota che un certo ramo è vuoto, non
// ha un valore
const empty = 0n
```

Quando il numero di valori non è una potenza intera di due, dobbiamo gestire i rami vuoti. A tale scopo, questo programma inserisce zero come segnaposto.

![Albero di Merkle con rami mancanti](merkle-empty-hash.png)

```javascript
// Calcola un livello in alto nell'albero di un insieme di hash prenendo l'hash
// di ogni coppia in sequenza
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Per evitare l'eccesso di input // Aggiunge un valore vuoto se necessario (necessitiamo che tutte le uscite siano accoppiate a //)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Questa funzione "scala" un livello nell'albero di Merkle eseguendo l'hashing di coppie di valori al livello corrente. Nota che questa non è l'implementazione più efficiente: avremmo potuto evitare di copiare l'input e aggiungere semplicemente `hashEmpty` nel punto appropriato del ciclo, ma questo codice è ottimizzato per migliorare la leggibilità.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Scala l'albero finché c'è solo un valore, questa è la radice //. // // Se un livello ha un numero dispari di voci, il // codice in oneLevelUp aggiunge un valore vuoto, quindi abbiamo, ad esempio, // 10 foglie, avremo 5 rami al secondo livello, 3 // rami al terzo, 2 al quarto e la radice al quinto

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Per ottenere la radice, scala finché non resta un solo valore.

#### Creare una prova di Merkle {#creating-a-merkle-proof}

Una prova di Merkle è data dai valori da sottoporre all'hashing insieme al valore dimostrato in modo da ottenere nuovamente il root di Merkle. Il valore da provare spesso è ricavabile da altri dati, quindi preferisco fornirlo separatamente anziché come parte del codice.

```javascript
// Una prova di merkle consiste nel valore dell'elenco di voci con
// cui eseguire l'hash. Poiché usiamo una funzione di hash simmetrica, non
// ci serve la posizione dell'elemento per verificare la prova, solo per crearla
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Finché arriviamo in cima
    while (currentLayer.length > 1) {
        // Nessun livello dalla lunghezza dispari
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Se currentN è dispari, aggiungiamo il valore precedente alla prova
            ? currentLayer[currentN-1]
               // Se è pari, aggiungi il valore successivo
            : currentLayer[currentN+1])

```

Eseguiamo l'hashing di `(v[0],v[1])`, `(v[2],v[3])`, ecc. Quindi per i valori pari ci serve quello successivo, mentre per i valori dispari ci serve quello precedente.

```javascript
        // Sposta al livello successivo superiore
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Codice on-chain {#on-chain-code}

Finalmente abbiamo il codice che verifica la prova. Il codice on-chain è scritto in [Solidity](https://docs.soliditylang.org/en/v0.8.11/). L'ottimizzazione è molto più importante qui, perché il gas è relativamente costoso.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

L'ho scritto usando l'[ambiente di sviluppo Hardhat](https://hardhat.org/), che ci consente di avere l'[output della console da Solidity](https://hardhat.org/tutorial/debugging-with-hardhat-network.html) durante lo sviluppo.

```solidity

contract MerkleProof {
    uint merkleRoot;

    function getRoot() public view returns (uint) {
      return merkleRoot;
    }

    // Estremamente insicuro, nel codice di produzione l'accesso a
    // questa funzione DEVE ESSERE rigorosamente limitato, probabilmente a un
    // proprietario
    function setRoot(uint _merkleRoot) external {
      merkleRoot = _merkleRoot;
    }   // setRoot
```

Imposta e ottieni le funzioni per il root di Merkle. Consentire a chiunque di aggiornare il root di Merkle è un'_idea assolutamente pessima_ in un sistema di produzione. Qui lo faccio per motivi di semplicità del codice di esempio. **Sconsiglio di farlo su un sistema in cui l'integrità dei dati è importante**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Questa funzione genera l'hash di una coppia. È semplicemente la traduzione di Solidity del codice in JavaScript per `hash` e `pairHash`.

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

}  // MarkleProof
```

Nella notazione matematica, la verifica della prova di Merkle somiglia a questa: `H(proof_n, H(proof_n-1, H(proof_n-2, ... H(proof_1, H(proof_0, value))...)))`. Questo codice la implementa.

## Prove di Merkle e rollup non si mescolano {#merkle-proofs-and-rollups}

Le prove di Merkle non funzionano bene con i [rollup](/developers/docs/scaling/#rollups). Il motivo è che i rollup scrivono tutti i dati della transazione su L1, ma elaborano su L2. Il costo medio per inviare una prova di Merkle con una transazione è di 638 gas per livello (correntemente, un byte nei dati della chiamata costa 16 gas se non è zero, e 4 se è zero). Se abbiamo 1024 parole di dati, una prova di Merkle richiede dieci livelli, o un totale di 6380 gas.

Ad esempio, guardando a [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), la scrittura del gas del L1 costa circa 100 gwei e del L2 circa 0,001 gwei (questo è il prezzo normale, può aumentare con la congestione). Quindi, per il costo di un gas del L1, possiamo consumare centomila gas sull'elaborazione del L2. Supponendo di non sovrascrivere l'archiviazione, ciò significa che possiamo scrivere circa cinque parole all'archiviazione sul L2, per il prezzo di un gas del L1. Per una singola prova di Merkle, possiamo scrivere tutte le 1024 parole all'archiviazione (supponendo innanzitutto che siano calcolabili sulla catena, piuttosto che fornite in una transazione) e comunque avere una rimanenza di gran parte del gas.

## Conclusione {#conclusion}

Nella vita reale potresti non trovarti mai a implementare alberi di Merkle per conto tuo. Esistono librerie ben note e controllate che puoi usare e, in generale, è meglio non implementare primitivi crittografici autonomamente. Ma spero che ora tu abbia compreso meglio le prove di Merkle e possa decidere quando vale la pena usarle.

Nota che benché le prove di Merkle preservino l'_integrità_, non preservano la _disponibilità_. Sapere che nessun altro può prendere le tue risorse è una magra consolazione se la memoria dati decide di non consentire l'accesso e non puoi neanche costruire un albero di Merkle per accedervi. Quindi gli alberi di Merkle funzionano meglio con qualche tipo di memoria decentralizzata, come IPFS.
