---
title: Simple serialize
description: Spiegazione del formato SSZ di Ethereum.
lang: it
sidebarDepth: 2
---

**Simple serialize (SSZ)** è il metodo di serializzazione utilizzato sulla beacon chain. Sostituisce la serializzazione RLP utilizzata sul livello di esecuzione ovunque nel livello di consenso, tranne che nel protocollo di scoperta dei peer. Per saperne di più sulla serializzazione RLP, consulta [Prefisso di lunghezza ricorsiva (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ è progettato per essere deterministico e anche per essere merkleizzato in modo efficiente. Si può pensare a SSZ come composto da due componenti: uno schema di serializzazione e uno schema di merkleizzazione progettato per funzionare in modo efficiente con la struttura dei dati serializzata.

## Come funziona SSZ? {#how-does-ssz-work}

### Serializzazione {#serialization}

SSZ è uno schema di serializzazione che non è auto-descrittivo, ma si basa piuttosto su uno schema che deve essere noto in anticipo. L'obiettivo della serializzazione SSZ è rappresentare oggetti di complessità arbitraria come stringhe di byte. Questo è un processo molto semplice per i "tipi di base". L'elemento viene semplicemente convertito in byte esadecimali. I tipi di base includono:

- interi senza segno
- booleani

Per i tipi "compositi" complessi, la serializzazione è più complicata perché il tipo composito contiene più elementi che potrebbero avere tipi o dimensioni diverse, o entrambi. Laddove questi oggetti hanno tutti lunghezze fisse (cioè, la dimensione degli elementi sarà sempre costante indipendentemente dai loro valori effettivi), la serializzazione è semplicemente una conversione di ogni elemento nel tipo composito ordinato in stringhe di byte little-endian. Queste stringhe di byte vengono unite insieme. L'oggetto serializzato ha la rappresentazione in lista di byte degli elementi a lunghezza fissa nello stesso ordine in cui appaiono nell'oggetto deserializzato.

Per i tipi con lunghezze variabili, i dati effettivi vengono sostituiti da un valore di "offset" nella posizione di quell'elemento nell'oggetto serializzato. I dati effettivi vengono aggiunti a un heap alla fine dell'oggetto serializzato. Il valore di offset è l'indice per l'inizio dei dati effettivi nell'heap, agendo come un puntatore ai byte rilevanti.

L'esempio seguente illustra come funziona l'offset per un contenitore con elementi sia a lunghezza fissa che variabile:

```rust

    struct Dummy {

        number1: u64,
        number2: u64,
        vector: Vec<u8>,
        number3: u64
    }

    dummy = Dummy{

        number1: 37,
        number2: 55,
        vector: vec![1,2,3,4],
        number3: 22,
    }

    serialized = ssz.serialize(dummy)

```

`serialized` avrebbe la seguente struttura (qui riempita solo a 4 bit, riempita a 32 bit nella realtà, e mantenendo la rappresentazione `int` per chiarezza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset for    number 3    value for
                              vector                   vector

```

diviso su più righe per chiarezza:

```
[
  37, 0, 0, 0,  # little-endian encoding of `number1`.
  55, 0, 0, 0,  # little-endian encoding of `number2`.
  16, 0, 0, 0,  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  22, 0, 0, 0,  # little-endian encoding of `number3`.
  1, 2, 3, 4,   # The actual values in `vector`.
]
```

Questa è ancora una semplificazione: gli interi e gli zeri negli schemi precedenti sarebbero in realtà liste di byte memorizzate, in questo modo:

```
[
  10100101000000000000000000000000  # little-endian encoding of `number1`
  10110111000000000000000000000000  # little-endian encoding of `number2`.
  10010000000000000000000000000000  # The "offset" that indicates where the value of `vector` starts (little-endian 16).
  10010110000000000000000000000000  # little-endian encoding of `number3`.
  10000001100000101000001110000100   # The actual value of the `bytes` field.
]
```

Quindi i valori effettivi per i tipi a lunghezza variabile sono memorizzati in un heap alla fine dell'oggetto serializzato con i loro offset memorizzati nelle loro posizioni corrette nella lista ordinata dei campi.

Ci sono anche alcuni casi speciali che richiedono un trattamento specifico, come il tipo `BitList` che richiede l'aggiunta di un limite di lunghezza durante la serializzazione e la sua rimozione durante la deserializzazione. I dettagli completi sono disponibili nelle [specifiche SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserializzazione {#deserialization}

Per deserializzare questo oggetto è necessario lo <b>schema</b>. Lo schema definisce il layout preciso dei dati serializzati in modo che ogni elemento specifico possa essere deserializzato da un blob di byte in un oggetto significativo con gli elementi che hanno il tipo, il valore, la dimensione e la posizione corretti. È lo schema che dice al deserializzatore quali valori sono valori effettivi e quali sono offset. Tutti i nomi dei campi scompaiono quando un oggetto viene serializzato, ma vengono reistanziati durante la deserializzazione in base allo schema.

Consulta [ssz.dev](https://www.ssz.dev/overview) per una spiegazione interattiva al riguardo.

## Merkleizzazione {#merkleization}

Questo oggetto serializzato SSZ può quindi essere merkleizzato, ovvero trasformato in una rappresentazione ad albero di Merkle degli stessi dati. Innanzitutto, viene determinato il numero di blocchi da 32 byte nell'oggetto serializzato. Queste sono le "foglie" dell'albero. Il numero totale di foglie deve essere una potenza di 2 in modo che l'hashing delle foglie produca alla fine una singola radice dell'albero di hash (hash-tree-root). Se questo non è naturalmente il caso, vengono aggiunte foglie aggiuntive contenenti 32 byte di zeri. Schematicamente:

```
        hash tree root
            /     \
           /       \
          /         \
         /           \
   hash of leaves  hash of leaves
     1 and 2         3 and 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Ci sono anche casi in cui le foglie dell'albero non si distribuiscono naturalmente in modo uniforme come nell'esempio precedente. Ad esempio, la foglia 4 potrebbe essere un contenitore con più elementi che richiedono l'aggiunta di ulteriore "profondità" all'albero di Merkle, creando un albero irregolare.

Invece di riferirci a questi elementi dell'albero come foglia X, nodo X ecc., possiamo assegnare loro indici generalizzati, iniziando con radice = 1 e contando da sinistra a destra lungo ogni livello. Questo è l'indice generalizzato spiegato sopra. Ogni elemento nella lista serializzata ha un indice generalizzato uguale a `2**depth + idx` dove idx è la sua posizione indicizzata a zero nell'oggetto serializzato e la profondità (depth) è il numero di livelli nell'albero di Merkle, che può essere determinato come il logaritmo in base due del numero di elementi (foglie).

## Indici generalizzati {#generalized-indices}

Un indice generalizzato è un intero che rappresenta un nodo in un albero di Merkle binario in cui ogni nodo ha un indice generalizzato `2 ** depth + index in row`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Questa rappresentazione produce un indice di nodo per ogni pezzo di dati nell'albero di Merkle.

## Multiprove {#multiproofs}

Fornire la lista di indici generalizzati che rappresentano un elemento specifico ci consente di verificarlo rispetto alla radice dell'albero di hash (hash-tree-root). Questa radice è la nostra versione accettata della realtà. Qualsiasi dato ci venga fornito può essere verificato rispetto a quella realtà inserendolo nel posto giusto nell'albero di Merkle (determinato dal suo indice generalizzato) e osservando che la radice rimane costante. Ci sono funzioni nelle specifiche [qui](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) che mostrano come calcolare l'insieme minimo di nodi necessari per verificare i contenuti di un particolare insieme di indici generalizzati.

Ad esempio, per verificare i dati nell'indice 9 nell'albero sottostante, abbiamo bisogno dell'hash dei dati agli indici 8, 9, 5, 3, 1.
L'hash di (8,9) dovrebbe essere uguale all'hash (4), che esegue l'hashing con 5 per produrre 2, che esegue l'hashing con 3 per produrre la radice dell'albero 1. Se venissero forniti dati errati per 9, la radice cambierebbe: lo rileveremmo e non riusciremmo a verificare il ramo.

```
* = data required to generate proof

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Letture consigliate {#further-reading}

- [Aggiornare Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Aggiornare Ethereum: Merkleizzazione](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementazioni SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calcolatore SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)