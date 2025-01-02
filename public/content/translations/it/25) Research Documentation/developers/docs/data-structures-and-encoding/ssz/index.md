---
title: Simple serialize
description: Spiegazione del formato SSZ di Ethereum.
lang: it
sidebarDepth: 2
---

**Simple serialize ** è il metodo di serializzazione usato sulla Beacon Chain. Sostituisce la serializzazione RLP usata sul livello d'esecuzione ovunque nel livello del consenso, tranne che per il protocollo di scoperta dei peer. SSZ è progettata per essere deterministica e anche efficiente nell'attività di Merkle-zzazione. SSZ può essere pensato come diviso in due componenti: uno schema di serializzazione e uno schema di Merkle-zzazione, progettato per funzionare efficientemente con la struttura di dati serializzati.

## Come funziona SSZ? {#how-does-ssz-work}

### Serializzazione {#serialization}

SSZ è uno schema di serializzazione non auto-descrivente; al contrario si affida a uno schema che deve essere noto in anticipo. L'obiettivo della serializzazione SSZ è rappresentare gli oggetti di complessità arbitraria come stringhe di byte. Questo è un processo molto semplice per i "tipi di base". L'elemento è semplicemente convertito in byte esadecimali. I tipi di base includono:

- interi non firmati
- Booleani

Per tipi "compositi" complessi, la serializzazione è più complicata perché il tipo composito contiene diversi elementi che potrebbero avere tipi o dimensioni o entrambi, differenti. Quando questi oggetti hanno tutti lunghezze fisse (ovvero la dimensione degli elementi è sempre costante, indipendentemente dai valori reali), la serializzazione è semplicemente una conversione di ogni elemento nel tipo composito ordinato in stringhe di byte little-endian. Queste stringhe di byte sono unite tra loro. L'oggetto serializzato ha la rappresentazione della serie di byte degli elementi a lunghezza fissa nello stesso ordine in cui appaiono nell'oggetto deserializzato.

Per i tipi con lunghezze variabili, nell'oggetto serializzato i dati reali sono sostituiti da un valore di "offset" nella posizione di quell'elemento. I dati reali sono aggiunti alla fine dell'oggetto serializzato. Il valore di offset è l'indice per l'inizio dei dati reali nello heap, che serve da puntatore ai byte rilevanti.

L'esempio seguente illustra come funziona l'offset per un contenitore con elementi di lunghezza sia fissa che variabile:

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

`serialized` avrebbe la seguente struttura (padding solo a 4 bit qui, padding a 32 bit nella realtà e mantenendo la rappresentazione di `int` per chiarezza):

```
[37, 0, 0, 0, 55, 0, 0, 0, 16, 0, 0, 0, 22, 0, 0, 0, 1, 2, 3, 4]
------------  -----------  -----------  -----------  ----------
      |             |            |           |            |
   number1       number2    offset per    number 3    valore per
                              vettore                   vettore

```

diviso su righe per chiarezza:

```
[
  37, 0, 0, 0,  # codifica endiana piccola di `number1`.
  55, 0, 0, 0,  # codifica endiana piccola di `number2`.
  16, 0, 0, 0,  # Lo "offset" che indica dove inizia il valore di `vector` (16 endiano piccolo).
  22, 0, 0, 0,  # codifica endiana piccola di `number3`.
  1, 2, 3, 4,   # I valori reali in `vector`.
]
```

Questa è comunque una semplificazione: gli interi e gli zeri negli schemi di cui sopra sarebbero in realtà elenchi di byte memorizzati, come questi:

```
[
  10100101000000000000000000000000  # codifica endiana piccola di `number1`
  10110111000000000000000000000000  # codifica endiana piccola di `number2`.
  10010000000000000000000000000000  # Lo "offset" che indica dove inizia il valore di `vector` (16 endiano piccolo).
  10010110000000000000000000000000  # codifica endiana piccola di `number3`.
  10000001100000101000001110000100   # Il valore reale del campo `bytes`.
]
```

Quindi i valori reali per i tipi di lunghezza variabile sono memorizzati in uno heap alla fine dell'oggetto serializzato, con i propri offset memorizzati nelle posizioni corrette nell'elenco di campi ordinato.

Esistono anche dei casi speciali che richiedono un trattamento specifico, come il tipo `BitList` che richiede che sia aggiunto un limite di lunghezza durante la serializzazione, e poi eliminato durante la deserializzazione. I dettagli completi sono disponibili nella [specifica SSZ](https://github.com/ethereum/consensus-specs/blob/dev/ssz/simple-serialize.md).

### Deserializzazione {#deserialization}

Per deserializzare questo oggetto serve lo <b>schema</b>. Lo schema definisce la disposizione precisa dei dati serializzati, così che ogni elemento specifico sia deserializzabile a partire da un blob di byte in un oggetto significativo con gli elementi aventi il tipo, valore, dimensione e posizione giusti. È lo schema che dice al deserializzatore quali valori sono valori reali e quali sono offset. Tutti i nomi del campo scompaiono quando un oggetto è serializzato, ma sono reistanziati al momento della deserializzazione secondo lo schema.

Vedi [ssz.dev](https://www.ssz.dev/overview) per una spiegazione interattiva a riguardo.

## Merkle-zzazione {#merkleization}

L’oggetto serializzato SSZ può essere poi merkle-zzato, ovvero trasformato in una rappresentazione dell'albero di Merkle di alcuni dati. Per prima cosa, è determinato il numero di blocchi da 32 byte nell'oggetto serializzato. Queste sono le "foglie" dell'albero. Il numero totale di foglie deve essere una potenza di 2, così che l'hashing delle foglie produca infine un albero-radice con un unico hash. Se questo non avviene naturalmente, sono aggiunte delle foglie aggiuntive contenenti 32 byte di zeri. In diagramma:

```
        hash albero radice
            /     \
           /       \
          /         \
         /           \
   hash delle foglie hash delle foglie
     1 e 2         3 e 4
      /   \            /  \
     /     \          /    \
    /       \        /      \
 leaf1     leaf2  leaf3     leaf4
```

Ci sono anche casi in cui le foglie dell'albero non si distribuiscono naturalmente e uniformemente come nell'esempio di cui sopra. Ad esempio, la foglia 4 potrebbe essere un contenitore con diversi elementi che richiedono che sia aggiunta ulteriore "profondità" all'albero di Merkle, creando un albero non equilibrato.

Invece di far riferimento a questi elementi dell'albero come foglia X, nodo X, ecc., possiamo dare loro indici generalizzati che iniziano con radice = 1, contando da sinistra a destra per ogni livello. Questo è l'indice generalizzato spiegato sopra. Ogni elemento nell'elenco serializzato ha un indice generalizzato pari a `2**depth + idx`, dove idx è la posizione indicizzata a zero nell'oggetto serializzato e "depth" è il numero di livelli nell'albero di Merkle, determinabile come il logaritmo a base due del numero di elementi (foglie).

## Indici generalizzati {#generalized-indices}

Un indice generalizzato è un intero rappresentante un nodo in un albero di Merkle binario, in cui ogni nodo ha un indice generalizzato `2 ** depth + index in row`.

```
        1           --depth = 0  2**0 + 0 = 1
    2       3       --depth = 1  2**1 + 0 = 2, 2**1+1 = 3
  4   5   6   7     --depth = 2  2**2 + 0 = 4, 2**2 + 1 = 5...

```

Questa rappresentazione produce un indice del nodo per ogni dato nell'albero di Merkle.

## Prove multiple {#multiproofs}

Fornire l'elenco di indici generalizzati rappresentanti un elemento specifico ci consente di verificarlo rispetto all'hash albero-radice. Questa radice è la nostra versione accettata della realtà. Ogni dato che ci è fornito è verificabile rispetto a quella realtà inserendolo al posto giusto nell'albero di Merkle (determinato dal suo indice generalizzato) e osservando che la radice rimane costante. Ci sono delle funzioni nelle specifiche, [qui](https://github.com/ethereum/consensus-specs/blob/dev/ssz/merkle-proofs.md#merkle-multiproofs), che mostrano come calcolare la serie minima di nodi necessari a verificare i contenuti di una serie particolare di indici generalizzati.

Ad esempio, per verificare i dati nell'indice 9 nell'albero seguente, abbiamo bisogno dell'hash dei dati agli indici 8, 9, 5, 3, 1. L'hash di (8,9) dovrebbe equivalere all'hash (4), il cui hash con 5 produce 2, il cui hash con 3 produce la radice dell'albero 1. Se venissero forniti dei dati errati per 9, la radice cambierebbe: lo rileveremmo e renderemmo impossibile verificare il ramo.

```
* = dati necessari per generare la prova

                    1*
          2                      3*
    4          5*          6          7
8*     9*   10    11   12    13    14    15

```

## Letture consigliate {#further-reading}

- [Aggiornare Ethereum: SSZ](https://eth2book.info/altair/part2/building_blocks/ssz)
- [Aggiornare Ethereum: Merkle-zzazione](https://eth2book.info/altair/part2/building_blocks/merkleization)
- [Implementazioni di SSZ](https://github.com/ethereum/consensus-specs/issues/2138)
- [Calcolatrice SSZ](https://simpleserialize.com/)
- [SSZ.dev](https://www.ssz.dev/)
