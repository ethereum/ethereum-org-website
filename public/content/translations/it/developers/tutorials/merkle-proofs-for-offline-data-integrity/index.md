---
title: "Prove di Merkle per l'integrità dei dati offline"
description: "Garantire l'integrità dei dati sulla catena per i dati che sono archiviati, per lo più, fuori dalla catena"
author: Ori Pomerantz
tags: [ "archiviazione" ]
skill: advanced
lang: it
published: 2021-12-30
---

## Introduzione {#introduction}

Idealmente, vorremmo archiviare tutto nell'archiviazione di Ethereum, memorizzata tra migliaia di computer e avente una disponibilità estremamente elevata (i dati non sono censurabili) e integrità (i dati non sono modificabili in un modo non autorizzato), ma archiviare una parola di 32 byte costa tipicamente 20.000 gas. Mentre scriviamo il presente articolo, tale costo equivale a 6,60 dollari. Ne consegue che 21 centesimi per byte sia un costo impraticabile per molti utilizzi.

Per risolvere questo problema, l'ecosistema di Ethereum ha sviluppato molti modi alternativi per memorizzare i dati in modo decentralizzato
. Solitamente occorre raggiungere un compromesso tra disponibilità e prezzo, mentre l'integrità è generalmente garantita.

In questo articolo imparerà **come** garantire l'integrità dei dati senza memorizzare i dati sulla blockchain, utilizzando
le [prove di Merkle](https://computersciencewiki.org/index.php/Merkle_proof).

## Come funziona? {#how-does-it-work}

In teoria, potremmo semplicemente memorizzare l'hash dei dati sulla catena e inviare tutti i dati nelle transazioni che lo richiedono. Anche questo però sarebbe troppo costoso. Un byte di dati per una transazione costa circa 16 gas, correntemente circa mezzo centesimo, o circa 5 dollari per kilobyte. 5.000 dollari per megabyte è un prezzo comunque proibitivo per molti utilizzi, anche senza il costo supplementare connesso all'hashing dei dati.

La soluzione consiste nel procedere ripetutamente all'hashing di diverse sottoserie di dati, quindi per i dati che non devono essere inviati è sufficiente inviare un hash. A tale scopo puoi utilizzare un albero di Merkle, una struttura di dati ad albero in cui ogni nodo rappresenta un hash dei nodi sottostanti:

![Albero di Merkle](tree.png)

L'hash radice è l'unica parte che deve essere memorizzata sulla catena. Per provare un dato valore, occorre fornire tutti gli hash che devono essere combinati con esso per ottenere il root. Ad esempio, per provare `C` occorre fornire `D`, `H(A-B)` e `H(E-H)`.

![Prova del valore di C](proof-c.png)

## Implementazione {#implementation}

[Il codice di esempio è fornito qui](https://github.com/qbzzt/merkle-proofs-for-offline-data-integrity).

### Codice fuori dalla catena {#offchain-code}

In questo articolo usiamo JavaScript per i calcoli fuori dalla catena. La maggior parte delle applicazioni decentralizzate ha la propria componente fuori dalla catena in JavaScript.

#### Creazione della radice di Merkle {#creating-the-merkle-root}

Prima dobbiamo fornire il root di Merkle alla catena.

```javascript
const ethers = require("ethers")
```

[Utilizziamo la funzione hash dal pacchetto Ethers](https://docs.ethers.io/v5/api/utils/hashing/#utils-keccak256).

```javascript
// I dati grezzi di cui dobbiamo verificare l'integrità. I primi due byte
// sono un identificatore utente e gli ultimi due byte la quantità di token che
// l'utente possiede al momento.
const dataArray = [
  0x0bad0010, 0x60a70020, 0xbeef0030, 0xdead0040, 0xca110050, 0x0e660060,
  0xface0070, 0xbad00080, 0x060d0091,
]
```

Codificando ogni voce in un unico numero intero da 256 bit si ottiene un codice meno leggibile rispetto, ad esempio, all'utilizzo di JSON. Tuttavia, ciò comporta un'elaborazione significativamente ridotta per recuperare i dati nel contratto, quindi costi del gas molto inferiori. [È possibile leggere JSON sulla catena](https://github.com/chrisdotn/jsmnSol), ma è una pessima idea se evitabile.

```javascript
// L'insieme di valori di hash, come BigInts
const hashArray = dataArray
```

In questo caso, per iniziare i nostri dati sono valori da 256 bit, quindi non è necessaria alcuna elaborazione. Se usiamo una struttura di dati più complicata, come le stringhe, dovremo assicurarci di eseguire per prima cosa l'hashing dei dati, così da ottenere un insieme di hash. Anche questo, ricordiamo che non importa se gli utenti conoscono le informazioni altrui. In caso contrario, dovremmo eseguire l'hashing in modo tale che l'utente 1 non conosca il valore per l'utente 0, l'utente 2 non conosca il valore per l'utente 3, ecc.

```javascript
// Converte tra la stringa che la funzione hash si aspetta e il
// BigInt che usiamo altrove.
const hash = (x) =>
  BigInt(ethers.utils.keccak256("0x" + x.toString(16).padStart(64, 0)))
```

La funzione hash di Ethers si aspetta di ricevere una stringa JavaScript con un numero esadecimale, come `0x60A7`, e risponde con un'altra stringa con la stessa struttura. Tuttavia, per il resto del codice è più facile usare `BigInt`, quindi convertiamo in una stringa esadecimale e viceversa.

```javascript
// Hash simmetrico di una coppia, così non ci importerà se l'ordine viene invertito.
const pairHash = (a, b) => hash(hash(a) ^ hash(b))
```

Questa funzione è simmetrica (hash di a [xor](https://en.wikipedia.org/wiki/Exclusive_or) b). Questo significa che quando controlliamo la prova di Merkle, non dobbiamo preoccuparci di mettere il valore dalla prova prima o dopo il valore calcolato. Il controllo della prova di Merkle avviene sulla catena, quindi meno è necessario fare lì, meglio è.

Attenzione:
La crittografia è più complessa di quanto sembri.
La versione iniziale di questo articolo aveva la funzione hash `hash(a^b)`.
È stata una **pessima** idea perché significava che, se si fossero conosciuti i valori legittimi di `a` e `b`, si sarebbe potuto usare `b' = a^b^a'` per provare qualsiasi valore `a'` desiderato.
Con questa funzione si dovrebbe calcolare `b'` in modo che `hash(a') ^ hash(b')` sia uguale a un valore noto (il ramo successivo verso la radice), il che è molto più difficile.

```javascript
// Il valore denota che un certo ramo è vuoto, non
// ha un valore
const empty = 0n
```

Quando il numero di valori non è una potenza intera di due, dobbiamo gestire i rami vuoti. A tale scopo, questo programma inserisce zero come segnaposto.

![Albero di Merkle con rami mancanti](merkle-empty-hash.png)

```javascript
// Calcola un livello superiore dell'albero di un array di hash, prendendo l'hash di
// ogni coppia in sequenza
const oneLevelUp = (inputArray) => {
  var result = []
  var inp = [...inputArray] // Per evitare di sovrascrivere l'input // Aggiunge un valore vuoto se necessario (abbiamo bisogno che tutte le foglie siano // accoppiate)

  if (inp.length % 2 === 1) inp.push(empty)

  for (var i = 0; i < inp.length; i += 2)
    result.push(pairHash(inp[i], inp[i + 1]))

  return result
} // oneLevelUp
```

Questa funzione "scala" un livello nell'albero di Merkle eseguendo l'hashing di coppie di valori al livello corrente. Si noti che questa non è l'implementazione più efficiente; avremmo potuto evitare di copiare l'input e aggiungere `hashEmpty` quando appropriato nel ciclo, ma questo codice è ottimizzato per la leggibilità.

```javascript
const getMerkleRoot = (inputArray) => {
  var result

  result = [...inputArray] // Si risale l'albero finché non rimane un solo valore, che è la // radice. // // Se un livello ha un numero dispari di voci, il // codice in oneLevelUp aggiunge un valore vuoto, quindi se abbiamo, ad esempio, // 10 foglie, avremo 5 rami nel secondo livello, 3 // rami nel terzo, 2 nel quarto e la radice è il quinto

  while (result.length > 1) result = oneLevelUp(result)

  return result[0]
}
```

Per ottenere la radice, scala finché non resta un solo valore.

#### Creazione di una prova di Merkle {#creating-a-merkle-proof}

Una prova di Merkle è data dai valori da sottoporre all'hashing insieme al valore dimostrato in modo da ottenere nuovamente il root di Merkle. Il valore da provare spesso è ricavabile da altri dati, quindi preferisco fornirlo separatamente anziché come parte del codice.

```javascript
// Una prova di Merkle consiste nel valore dell'elenco di voci con cui
// eseguire l'hashing. Poiché usiamo una funzione hash simmetrica, non
// abbiamo bisogno della posizione dell'elemento per verificare la prova, ma solo per crearla
const getMerkleProof = (inputArray, n) => {
    var result = [], currentLayer = [...inputArray], currentN = n

    // Finché non raggiungiamo la cima
    while (currentLayer.length > 1) {
        // Nessun livello di lunghezza dispari
        if (currentLayer.length % 2)
            currentLayer.push(empty)

        result.push(currentN % 2
               // Se currentN è dispari, aggiungi alla prova il valore che lo precede
            ? currentLayer[currentN-1]
               // Se è pari, aggiungi il valore che lo segue
            : currentLayer[currentN+1])

```

Eseguiamo l'hashing di `(v[0],v[1])`, `(v[2],v[3])`, ecc. Quindi per i valori pari ci serve quello successivo, mentre per i valori dispari ci serve quello precedente.

```javascript
        // Passa al livello superiore
        currentN = Math.floor(currentN/2)
        currentLayer = oneLevelUp(currentLayer)
    }   // while currentLayer.length > 1

    return result
}   // getMerkleProof
```

### Codice sulla catena {#onchain-code}

Finalmente abbiamo il codice che verifica la prova. Il codice sulla catena è scritto in [Solidity](https://docs.soliditylang.org/en/v0.8.11/). L'ottimizzazione è molto più importante qui, perché il gas è relativamente costoso.

```solidity
//SPDX-License-Identifier: Public Domain
pragma solidity ^0.8.0;

import "hardhat/console.sol";
```

L'ho scritto usando l'ambiente di sviluppo [Hardhat](https://hardhat.org/), che ci consente di avere [l'output della console da Solidity](https://hardhat.org/docs/cookbook/debug-logs) durante lo sviluppo.

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

Imposta e ottieni le funzioni per il root di Merkle. Consentire a tutti di aggiornare la radice di Merkle è un'_idea estremamente pessima_ in un sistema di produzione. Qui lo faccio per motivi di semplicità del codice di esempio. **Non va fatto su un sistema in cui l'integrità dei dati è davvero importante**.

```solidity
    function hash(uint _a) internal pure returns(uint) {
      return uint(keccak256(abi.encode(_a)));
    }

    function pairHash(uint _a, uint _b) internal pure returns(uint) {
      return hash(hash(_a) ^ hash(_b));
    }
```

Questa funzione genera l'hash di una coppia. È solo la traduzione in Solidity del codice JavaScript per `hash` e `pairHash`.

**Nota:** questo è un altro caso di ottimizzazione per la leggibilità. In base alla [definizione della funzione](https://www.tutorialspoint.com/solidity/solidity_cryptographic_functions.htm), potrebbe essere possibile memorizzare i dati come un valore [`bytes32`](https://docs.soliditylang.org/en/v0.5.3/types.html#fixed-size-byte-arrays) ed evitare le conversioni.

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

Nella notazione matematica, la verifica della prova di Merkle si presenta così: `H(proof_n, H(proof_n-1, H(proof_n-2, ...` `H(proof_1, H(proof_0, value))...)))`. Questo codice la implementa.

## Le prove di Merkle e i rollup non sono compatibili {#merkle-proofs-and-rollups}

Le prove di Merkle non funzionano bene con i [rollup](/developers/docs/scaling/#rollups). Il motivo è che i rollup scrivono tutti i dati della transazione su L1, ma elaborano su L2. Il costo medio per inviare una prova di Merkle con una transazione è di 638 gas per livello (correntemente, un byte nei dati della chiamata costa 16 gas se non è zero, e 4 se è zero). Se abbiamo 1024 parole di dati, una prova di Merkle richiede dieci livelli, o un totale di 6380 gas.

Prendendo ad esempio [Optimism](https://public-grafana.optimism.io/d/9hkhMxn7z/public-dashboard?orgId=1&refresh=5m), il gas per scrivere su L1 costa circa 100 gwei, mentre il gas per L2 costa 0,001 gwei (questo è il prezzo normale, che può aumentare con la congestione). Quindi, per il costo di un gas del L1, possiamo consumare centomila gas sull'elaborazione del L2. Supponendo di non sovrascrivere l'archiviazione, ciò significa che possiamo scrivere circa cinque parole all'archiviazione sul L2, per il prezzo di un gas del L1. Per una singola prova di Merkle, possiamo scrivere tutte le 1024 parole in archivio (supponendo che possano essere calcolate sulla catena, invece di essere fornite in una transazione) e avere comunque la maggior parte del gas rimanente.

## Conclusione {#conclusion}

Nella vita reale potresti non trovarti mai a implementare alberi di Merkle per conto tuo. Esistono librerie ben note e controllate che puoi usare e, in generale, è meglio non implementare primitivi crittografici autonomamente. Ma spero che ora tu abbia compreso meglio le prove di Merkle e possa decidere quando vale la pena usarle.

Si noti che, sebbene le prove di Merkle preservino l'_integrità_, non preservano la _disponibilità_. Sapere che nessun altro può prendere le tue risorse è una magra consolazione se la memoria dati decide di non consentire l'accesso e non puoi neanche costruire un albero di Merkle per accedervi. Quindi gli alberi di Merkle funzionano meglio con qualche tipo di memoria decentralizzata, come IPFS.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).
