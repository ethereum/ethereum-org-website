---
title: Simple Serialize
description: Spiegazione del formato SSZ di Ethereum.
lang: it
sidebarDepth: 2
---

**Simple Serialize (SSZ)** è il metodo di serializzazione utilizzato sulla Beacon Chain. Sostituisce la serializzazione RLP utilizzata sul livello di esecuzione ovunque nel livello di consenso, tranne che nel protocollo di scoperta dei peer. Per saperne di più sulla serializzazione RLP, consulta [Prefisso di lunghezza ricorsiva (RLP)](/developers/docs/data-structures-and-encoding/rlp/). SSZ è progettato per essere deterministico e anche per essere merkleizzato in modo efficiente. Si può pensare a SSZ come composto da due componenti: uno schema di serializzazione e uno schema di merkleizzazione progettato per funzionare in modo efficiente con la struttura dei dati serializzata.

## Come funziona SSZ? {#how-does-ssz-work}

### Serializzazione {#serialization}

SSZ è uno schema di serializzazione che non è autodescrittivo, ma si basa piuttosto su uno schema che deve essere noto in anticipo. L'obiettivo della serializzazione SSZ è rappresentare oggetti di complessità arbitraria come stringhe di byte. Questo è un processo molto semplice per i "tipi di base". L'elemento viene semplicemente convertito in byte esadecimali. I tipi di base includono:

- interi senza segno
- booleani

Per i tipi "compositi" complessi, la serializzazione è più complicata perché il tipo composito contiene più elementi che potrebbero avere tipi o dimensioni diverse, o entrambi. Quando questi oggetti hanno tutti lunghezze fisse (ovvero, la dimensione degli elementi sarà sempre costante indipendentemente dai loro valori effettivi), la serializzazione è semplicemente una conversione di ogni elemento nel tipo composito ordinato in stringhe di byte little-endian. Queste stringhe di byte vengono unite insieme. L'oggetto serializzato ha la rappresentazione in lista di byte degli elementi a lunghezza fissa nello stesso ordine in cui appaiono nell'oggetto deserializzato.

Per i tipi con lunghezze variabili, i dati effettivi vengono sostituiti da un valore di "offset" nella posizione di quell'elemento nell'oggetto serializzato. I dati effettivi vengono aggiunti a un heap alla fine dell'oggetto serializzato. Il valore di offset è l'indice per l'inizio dei dati effettivi nell'heap, fungendo da puntatore ai byte rilevanti.

L'esempio seguente illustra come funziona l'offset per un contenitore con elementi sia a lunghezza fissa che variabile:

```Rust

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

`serialized` avrebbe la seguente struttura (qui riempita solo a 4 bit, nella realtà riempita a 32 bit, e mantenendo la rappresentazione `int` per chiarezza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset per    number 3   valore per
                            il vettore               il vettore
```

diviso su più righe per chiarezza:

```
[
  37, 0, 0, 0,  # codifica little-endian di `number1`.
  55, 0, 0, 0,  # codifica little-endian di `number2`.
  16, 0, 0, 0,  # L'"offset" che indica dove inizia il valore di `vector` (16 in little-endian).
  22, 0, 0, 0,  # codifica little-endian di `number3`.
  1, 2, 3, 4,   # I valori effettivi in `vector`.
]
```

Questa è ancora una semplificazione: gli interi e gli zeri negli schemi precedenti sarebbero in realtà memorizzati come liste di byte, in questo modo:

```
[
  10100101000000000000000000000000  # codifica little-endian di `number1`
  10110111000000000000000000000000  # codifica little-endian di `number2`.
  10010000000000000000000000000000  # L'"offset" che indica dove inizia il valore di `vector` (16 in little-endian).
  10010110000000000000000000000000  # codifica little-endian di `number3`.
  10000001100000101000001110000100   # Il valore effettivo del campo `bytes`.
]
```

Quindi i valori effettivi per i tipi a lunghezza variabile sono memorizzati in un heap alla fine dell'oggetto serializzato, con i loro offset memorizzati nelle posizioni corrette nella lista ordinata dei campi.

Ci sono anche alcuni casi speciali che richiedono un trattamento specifico, come il tipo `BitList` che richiede l'aggiunta di un limite di lunghezza durante la serializzazione e la sua rimozione durante la deserializzazione. I dettagli completi sono disponibili nelle [specifiche SSZ](https://github.com/ethereum/consensus-specs/blob/master/ssz/simple-serialize.md).

### Deserializzazione {#deserialization}

Per deserializzare questo oggetto è necessario lo <b>schema</b>. Lo schema definisce il layout preciso dei dati serializzati in modo che ogni elemento specifico possa essere deserializzato da un blob di byte in un oggetto significativo con gli elementi che hanno il tipo, il valore, la dimensione e la posizione corretti. È lo schema che dice al deserializzatore quali valori sono valori effettivi e quali sono offset. Tutti i nomi dei campi scompaiono quando un oggetto viene serializzato, ma vengono reistanziati durante la deserializzazione in base allo schema.

Consulta [ssz.dev](https://www.ssz.dev/overview) per una spiegazione interattiva al riguardo.

## Merkleizzazione {#merkleization}

Questo oggetto serializzato SSZ può quindi essere merkleizzato, ovvero trasformato in una rappresentazione ad albero di Merkle degli stessi dati. Innanzitutto, viene determinato il numero di blocchi da 32 byte nell'oggetto serializzato. Queste sono le "foglie" dell'albero. Il numero totale di foglie deve essere una potenza di 2 in modo che l'hashing congiunto delle foglie produca infine una singola radice dell'albero di hash (hash-tree-root). Se questo non è naturalmente il caso, vengono aggiunte foglie aggiuntive contenenti 32 byte di zeri. Sotto forma di diagramma:

```
radice dell'albero di hash
            /     \
           /       \
          /         \
         /           \
   hash delle foglie  hash delle foglie
     1 e 2              3 e 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 foglia1   foglia2 foglia3   foglia4
```

Ci sono anche casi in cui le foglie dell'albero non si distribuiscono naturalmente in modo uniforme come nell'esempio precedente. Ad esempio, la foglia 4 potrebbe essere un contenitore con più elementi che richiedono l'aggiunta di ulteriore "profondità" all'albero di Merkle, creando un albero irregolare.

Invece di riferirci a questi elementi dell'albero come foglia X, nodo X, ecc., possiamo assegnare loro degli indici generalizzati, partendo dalla radice = 1 e contando da sinistra a destra lungo ogni livello. Questo è l'indice generalizzato spiegato in precedenza. Ogni elemento nella lista serializzata ha un indice generalizzato pari a `2**depth + idx` dove idx è la sua posizione indicizzata a zero nell'oggetto serializzato e la profondità è il numero di livelli nell'albero di Merkle, che può essere determinato come il logaritmo in base due del numero di elementi (foglie).

## Indici generalizzati {#generalized-indices}

Un indice generalizzato è un intero che rappresenta un nodo in un albero di Merkle binario in cui ogni nodo ha un indice generalizzato `2 ** depth + index in row`.

```
1           --profondità = 0  2**0 + 0 = 1
    2       3       --profondità = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --profondità = 2  2**2 + 0 = 4, 2**2 + 1 = 5...
```

Questa rappresentazione produce un indice del nodo per ogni porzione di dati nell'albero di Merkle.

## Multiprove {#multiproofs}

Fornire la lista di indici generalizzati che rappresentano un elemento specifico ci consente di verificarlo rispetto alla radice dell'albero di hash (hash-tree-root). Questa radice è la nostra versione accettata della realtà. Qualsiasi dato ci venga fornito può essere verificato rispetto a quella realtà inserendolo nel posto giusto nell'albero di Merkle (determinato dal suo indice generalizzato) e osservando che la radice rimane costante. Ci sono funzioni nelle specifiche [qui](https://github.com/ethereum/consensus-specs/blob/master/ssz/merkle-proofs.md#merkle-multiproofs) che mostrano come calcolare l'insieme minimo di nodi richiesto per verificare i contenuti di un particolare insieme di indici generalizzati.

Ad esempio, per verificare i dati nell'indice 9 nell'albero sottostante, abbiamo bisogno dell'hash dei dati agli indici 8, 9, 5, 3, 1.
L'hash di (8,9) dovrebbe essere uguale all'hash (4), che viene sottoposto a hashing con 5 per produrre 2, che viene sottoposto a hashing con 3 per produrre la radice dell'albero 1. Se venissero forniti dati errati per 9, la radice cambierebbe: lo rileveremmo e la verifica del ramo fallirebbe.

```
* = dati richiesti per generare la prova

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