---
title: Merkle Patricia Trie
description: Introduzione al Merkle Patricia Trie.
lang: it
sidebarDepth: 2
---

Lo stato di [Ethereum](/) (la totalità di tutti gli account, i saldi e i contratti intelligenti) è codificato in una versione speciale della struttura dati nota generalmente in informatica come Albero di Merkle (Merkle Tree). Questa struttura è utile per molte applicazioni nella crittografia perché crea una relazione verificabile tra tutti i singoli pezzi di dati intrecciati nell'albero, risultando in un singolo valore **radice** (root) che può essere utilizzato per dimostrare cose sui dati.

La struttura dati di Ethereum è un 'Merkle-Patricia Trie modificato', chiamato così perché prende in prestito alcune caratteristiche di PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric), e perché è progettato per un efficiente recupero (re**trie**val) dei dati degli elementi che compongono lo stato di Ethereum.

Un trie Merkle-Patricia è deterministico e crittograficamente verificabile: l'unico modo per generare una radice di stato è calcolarla da ogni singolo pezzo dello stato, e due stati identici possono essere facilmente dimostrati tali confrontando l'hash radice e gli hash che vi hanno portato (_una prova di Merkle_). Al contrario, non c'è modo di creare due stati diversi con lo stesso hash radice, e qualsiasi tentativo di modificare lo stato con valori diversi risulterà in un hash radice di stato diverso. Teoricamente, questa struttura fornisce il 'Santo Graal' dell'efficienza `O(log(n))` per inserimenti, ricerche ed eliminazioni.

Nel prossimo futuro, Ethereum prevede di migrare a una struttura [Verkle Tree](/roadmap/verkle-trees), che aprirà molte nuove possibilità per futuri miglioramenti del protocollo.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, sarebbe utile avere una conoscenza di base di [hash](https://en.wikipedia.org/wiki/Hash_function), [alberi di Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) e [serializzazione](https://en.wikipedia.org/wiki/Serialization). Questo articolo inizia con una descrizione di un [albero radix](https://en.wikipedia.org/wiki/Radix_tree) di base, per poi introdurre gradualmente le modifiche necessarie per la struttura dati più ottimizzata di Ethereum.

## Trie radix di base {#basic-radix-tries}

In un trie radix di base, ogni nodo si presenta come segue:

```
    [i_0, i_1 ... i_n, value]
```

Dove `i_0 ... i_n` rappresentano i simboli dell'alfabeto (spesso binario o esadecimale), `value` è il valore terminale nel nodo, e i valori negli slot `i_0, i_1 ... i_n` sono `NULL` o puntatori a (nel nostro caso, hash di) altri nodi. Questo forma un archivio `(chiave, valore)` di base.

Supponiamo di voler utilizzare una struttura dati ad albero radix per persistere un ordine su un insieme di coppie chiave-valore. Per trovare il valore attualmente mappato alla chiave `dog` nel trie, dovresti prima convertire `dog` in lettere dell'alfabeto (ottenendo `64 6f 67`), e poi scendere nel trie seguendo quel percorso fino a trovare il valore. Ovvero, inizi cercando l'hash radice in un DB chiave/valore piatto per trovare il nodo radice del trie. È rappresentato come un array di chiavi che puntano ad altri nodi. Useresti il valore all'indice `6` come chiave e lo cercheresti nel DB chiave/valore piatto per ottenere il nodo di un livello inferiore. Poi sceglieresti l'indice `4` per cercare il valore successivo, poi l'indice `6`, e così via, finché, una volta seguito il percorso: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, cercheresti il valore del nodo e restituiresti il risultato.

C'è una differenza tra cercare qualcosa nel 'trie' e nel 'DB' chiave/valore piatto sottostante. Entrambi definiscono disposizioni chiave/valore, ma il DB sottostante può eseguire una tradizionale ricerca in 1 passaggio di una chiave. Cercare una chiave nel trie richiede molteplici ricerche nel DB sottostante per arrivare al valore finale descritto sopra. Riferiamoci a quest'ultimo come a un `percorso` (`path`) per eliminare l'ambiguità.

Le operazioni di aggiornamento ed eliminazione per i trie radix possono essere definite come segue:

```python
    def update(node_hash, path, value):
        curnode = db.get(node_hash) if node_hash else [NULL] * 17
        newnode = curnode.copy()
        if path == "":
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]], path[1:], value)
            newnode[path[0]] = newindex
        db.put(hash(newnode), newnode)
        return hash(newnode)

    def delete(node_hash, path):
        if node_hash is NULL:
            return NULL
        else:
            curnode = db.get(node_hash)
            newnode = curnode.copy()
            if path == "":
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]], path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode), newnode)
                return hash(newnode)
```

Un albero Radix "Merkle" è costruito collegando i nodi utilizzando digest di hash crittografici generati in modo deterministico. Questo indirizzamento basato sul contenuto (nel DB chiave/valore `key == keccak256(rlp(value))`) fornisce una garanzia di integrità crittografica dei dati memorizzati. Se l'hash radice di un dato trie è noto pubblicamente, chiunque abbia accesso ai dati foglia sottostanti può costruire una prova che il trie include un dato valore in un percorso specifico fornendo gli hash di ciascun nodo che unisce un valore specifico alla radice dell'albero.

È impossibile per un utente malintenzionato fornire una prova di una coppia `(percorso, valore)` che non esiste poiché l'hash radice si basa in ultima analisi su tutti gli hash sottostanti. Qualsiasi modifica sottostante cambierebbe l'hash radice. Puoi pensare all'hash come a una rappresentazione compressa delle informazioni strutturali sui dati, protetta dalla protezione della pre-immagine della funzione di hashing.

Ci riferiremo a un'unità atomica di un albero radix (ad es., un singolo carattere esadecimale o un numero binario a 4 bit) come a un "nibble". Durante l'attraversamento di un percorso un nibble alla volta, come descritto sopra, i nodi possono riferirsi al massimo a 16 figli ma includono un elemento `value`. Pertanto, li rappresentiamo come un array di lunghezza 17. Chiamiamo questi array di 17 elementi "nodi ramo" (branch nodes).

## Merkle Patricia Trie {#merkle-patricia-trees}

I trie radix hanno una limitazione principale: sono inefficienti. Se si desidera memorizzare un'associazione `(percorso, valore)` in cui il percorso, come in Ethereum, è lungo 64 caratteri (il numero di nibble in `bytes32`), avremo bisogno di oltre un kilobyte di spazio extra per memorizzare un livello per carattere, e ogni ricerca o eliminazione richiederà tutti i 64 passaggi. Il trie Patricia introdotto di seguito risolve questo problema.

### Ottimizzazione {#optimization}

Un nodo in un Merkle Patricia trie è uno dei seguenti:

1.  `NULL` (rappresentato come stringa vuota)
2.  `branch` (ramo) Un nodo di 17 elementi `[ v0 ... v15, vt ]`
3.  `leaf` (foglia) Un nodo di 2 elementi `[ encodedPath, value ]`
4.  `extension` (estensione) Un nodo di 2 elementi `[ encodedPath, key ]`

Con percorsi di 64 caratteri è inevitabile che, dopo aver attraversato i primi livelli del trie, si raggiunga un nodo in cui non esiste alcun percorso divergente per almeno una parte della discesa. Per evitare di dover creare fino a 15 nodi `NULL` sparsi lungo il percorso, abbreviamo la discesa impostando un nodo `extension` della forma `[ encodedPath, key ]`, dove `encodedPath` contiene il "percorso parziale" per saltare in avanti (utilizzando una codifica compatta descritta di seguito), e la `key` serve per la successiva ricerca nel DB.

Per un nodo `leaf`, che può essere contrassegnato da un flag nel primo nibble dell'`encodedPath`, il percorso codifica tutti i frammenti di percorso del nodo precedente e possiamo cercare direttamente il `value`.

Questa ottimizzazione, tuttavia, introduce ambiguità.

Quando si attraversano percorsi in nibble, potremmo ritrovarci con un numero dispari di nibble da attraversare, ma poiché tutti i dati sono memorizzati in formato `bytes`, non è possibile distinguere tra, ad esempio, il nibble `1` e i nibble `01` (entrambi devono essere memorizzati come `<01>`). Per specificare la lunghezza dispari, il percorso parziale è preceduto da un flag.

### Specifica: Codifica compatta di sequenza esadecimale con terminatore opzionale {#specification}

La segnalazione sia della _lunghezza del percorso parziale rimanente dispari vs. pari_ sia del _nodo foglia vs. estensione_ come descritto sopra risiede nel primo nibble del percorso parziale di qualsiasi nodo a 2 elementi. Risultano in quanto segue:

| carattere esadecimale | bit | tipo di nodo parziale | lunghezza del percorso |
| -------- | ---- | ------------------ | ----------- |
| 0        | 0000 | estensione         | pari        |
| 1        | 0001 | estensione         | dispari     |
| 2        | 0010 | terminante (foglia)| pari        |
| 3        | 0011 | terminante (foglia)| dispari     |

Per la lunghezza del percorso rimanente pari (`0` o `2`), seguirà sempre un altro nibble di "riempimento" (padding) `0`.

```python
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term:
            hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        # hexarray ora ha una lunghezza pari il cui primo nibble rappresenta i flag.
        o = ""
        for i in range(0, len(hexarray), 2):
            o += chr(16 * hexarray[i] + hexarray[i + 1])
        return o
```

Esempi:

```python
    > [1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Ecco il codice esteso per ottenere un nodo nel Merkle Patricia trie:

```python
    def get_helper(node_hash, path):
        if path == []:
            return node_hash
        if node_hash == "":
            return ""
        curnode = rlp.decode(node_hash if len(node_hash) < 32 else db.get(node_hash))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[: len(k2)]:
                return get(v2, path[len(k2) :])
            else:
                return ""
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]], path[1:])

    def get(node_hash, path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node_hash, path2)
```

### Esempio di Trie {#example-trie}

Supponiamo di volere un trie contenente quattro coppie percorso/valore `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Per prima cosa, convertiamo sia i percorsi che i valori in `bytes`. Di seguito, le rappresentazioni effettive in byte per i _percorsi_ sono indicate da `<>`, sebbene i _valori_ siano ancora mostrati come stringhe, indicati da `''`, per una più facile comprensione (anche loro, in realtà, sarebbero `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Ora, costruiamo un tale trie con le seguenti coppie chiave/valore nel DB sottostante:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Quando un nodo è referenziato all'interno di un altro nodo, ciò che viene incluso è `keccak256(rlp.encode(node))`, se `len(rlp.encode(node)) >= 32` altrimenti `node` dove `rlp.encode` è la funzione di codifica [RLP](/developers/docs/data-structures-and-encoding/rlp).

Nota che quando si aggiorna un trie, è necessario memorizzare la coppia chiave/valore `(keccak256(x), x)` in una tabella di ricerca persistente _se_ il nodo appena creato ha una lunghezza >= 32. Tuttavia, se il nodo è più corto, non è necessario memorizzare nulla, poiché la funzione f(x) = x è reversibile.

## Trie in Ethereum {#tries-in-ethereum}

Tutti i trie di Merkle nel livello di esecuzione di Ethereum utilizzano un Merkle Patricia Trie.

Dall'intestazione di un blocco ci sono 3 radici da 3 di questi trie.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie di Stato {#state-trie}

Esiste un trie di stato globale, e viene aggiornato ogni volta che un client elabora un blocco. In esso, un `percorso` è sempre: `keccak256(ethereumAddress)` e un `valore` è sempre: `rlp(ethereumAccount)`. Più specificamente, un `account` Ethereum è un array di 4 elementi di `[nonce,balance,storageRoot,codeHash]`. A questo punto, vale la pena notare che questo `storageRoot` è la radice di un altro trie patricia:

### Trie di Archiviazione {#storage-trie}

Il trie di archiviazione è dove risiedono _tutti_ i dati del contratto. Esiste un trie di archiviazione separato per ogni account. Per recuperare i valori in posizioni di archiviazione specifiche a un dato indirizzo, sono richiesti l'indirizzo di archiviazione, la posizione intera dei dati memorizzati nell'archiviazione e l'ID del blocco. Questi possono poi essere passati come argomenti a `eth_getStorageAt` definito nell'API JSON-RPC, ad es., per recuperare i dati nello slot di archiviazione 0 per l'indirizzo `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Il recupero di altri elementi nell'archiviazione è leggermente più complesso perché la posizione nel trie di archiviazione deve prima essere calcolata. La posizione è calcolata come l'hash `keccak256` dell'indirizzo e della posizione di archiviazione, entrambi riempiti a sinistra con zeri fino a una lunghezza di 32 byte. Ad esempio, la posizione per i dati nello slot di archiviazione 1 per l'indirizzo `0x391694e7e0b0cce554cb130d723a9d27458f9298` è:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

In una console Geth, questo può essere calcolato come segue:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Il `percorso` è quindi `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Questo può ora essere utilizzato per recuperare i dati dal trie di archiviazione come prima:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: lo `storageRoot` per un account Ethereum è vuoto per impostazione predefinita se non è un account di contratto.

### Trie delle Transazioni {#transaction-trie}

Esiste un trie delle transazioni separato per ogni blocco, che memorizza nuovamente coppie `(chiave, valore)`. Un percorso qui è: `rlp(transactionIndex)` che rappresenta la chiave che corrisponde a un valore determinato da:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maggiori informazioni su questo possono essere trovate nella documentazione dell'[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie delle Ricevute {#receipts-trie}

Ogni blocco ha il proprio trie delle Ricevute. Un `percorso` qui è: `rlp(transactionIndex)`. `transactionIndex` è il suo indice all'interno del blocco in cui è stato incluso. Il trie delle ricevute non viene mai aggiornato. Similmente al trie delle Transazioni, ci sono ricevute attuali e legacy. Per interrogare una ricevuta specifica nel trie delle Ricevute, sono richiesti l'indice della transazione nel suo blocco, il payload della ricevuta e il tipo di transazione. La ricevuta restituita può essere di tipo `Receipt` che è definita come la concatenazione di `TransactionType` e `ReceiptPayload` o può essere di tipo `LegacyReceipt` che è definita come `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Maggiori informazioni su questo possono essere trovate nella documentazione dell'[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Letture consigliate {#further-reading}

- [Merkle Patricia Trie modificato — Come Ethereum salva uno stato](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum)
- [Comprendere il trie di Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)