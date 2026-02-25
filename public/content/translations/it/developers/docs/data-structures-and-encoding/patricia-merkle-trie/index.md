---
title: Trie di Patricia Merkle
description: Introduzione al Trie di Patricia Merkle.
lang: it
sidebarDepth: 2
---

Lo stato di Ethereum (la totalità di tutti i conti, i saldi e i contratti intelligenti) è codificato in una versione speciale della struttura dei dati, nota generalmente in informatica come un Albero di Merkle. Questa struttura è utile per molte applicazioni in crittografia, poiché crea una relazione verificabile tra tutti i singoli dati intrecciati nell'albero, risultando in un singolo valore di **radice** che può essere utilizzato per dimostrare fatti relativi ai dati.

La struttura dati di Ethereum è un 'trie di Merkle-Patricia modificato', così chiamato perché prende in prestito alcune funzionalità di PATRICIA (Practical Algorithm To Retrieve Information Coded in Alphanumeric) e perché è progettato per il recupero efficiente dei dati che compongono lo stato di Ethereum.

Un trie di Merkle-Patricia è deterministico e crittograficamente verificabile: l'unico modo per generare una radice di stato è calcolandola da ogni singolo pezzo dello stato, e si può facilmente dimostrare che due stati sono identici confrontando l'hash della radice e gli hash che hanno portato a esso (_una prova di Merkle_). Per contro, non esiste alcun modo per creare due stati differenti con lo stesso hash di radice, e qualsiasi tentativo di modificare lo stato con valori differenti risulterà in un hash della radice di stato differente. Teoricamente, questa struttura rappresenta il "Sacro Graal" dell'efficienza `O(log(n))` per inserimenti, ricerche ed eliminazioni.

In un futuro prossimo, Ethereum prevede di migrare a una struttura ad [Albero di Verkle](/roadmap/verkle-trees), che aprirà molte nuove possibilità per futuri miglioramenti del protocollo.

## Prerequisiti {#prerequisites}

Per comprendere meglio questa pagina, sarebbe utile avere una conoscenza di base di [hash](https://en.wikipedia.org/wiki/Hash_function), [alberi di Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) e [serializzazione](https://en.wikipedia.org/wiki/Serialization). Questo articolo inizia con la descrizione di un [albero radix](https://en.wikipedia.org/wiki/Radix_tree) di base, per poi introdurre gradualmente le modifiche necessarie per la struttura dati più ottimizzata di Ethereum.

## Trie radix di base {#basic-radix-tries}

In un trie della radice di base, ogni nodo si presenta così:

```
    [i_0, i_1 ... i_n, value]
```

Dove `i_0 ...` `i_n` rappresentano i simboli dell'alfabeto (spesso binario o esadecimale), `value` è il valore terminale nel nodo e i valori in `i_0, i_1 ...` gli slot `i_n` sono o `NULL` o puntatori a (nel nostro caso, hash di) altri nodi. Questo forma un archivio di base `(chiave, valore)`.

Ipotizziamo che si voglia utilizzare una struttura dei dati ad albero radicato per perdurare un ordine su una serie di coppie chiave-valore. Per trovare il valore attualmente mappato alla chiave `dog` nel trie, si dovrebbe prima convertire `dog` in lettere dell'alfabeto (ottenendo `64 6f 67`), e poi scendere lungo il trie seguendo quel percorso fino a trovare il valore. Quindi, iniziare guardando l'hash radice in un database chiave/valore piatto per trovare il nodo radice dell'albero. È rappresentato come un insieme di chiavi che puntano ad altri nodi. Si utilizzerebbe il valore all'indice `6` come chiave e lo si cercherebbe nel DB flat chiave/valore per ottenere il nodo di un livello inferiore. Poi si sceglie l'indice `4` per cercare il valore successivo, poi l'indice `6` e così via, finché, una volta seguito il percorso: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, si cerca il valore del nodo e si restituisce il risultato.

Esiste una differenza tra cercare qualcosa nel 'trie' e nel 'DB' flat chiave/valore sottostante. Entrambi definiscono degli schemi chiave/valore, ma il DB sottostante può effettuare una tradizionale ricerca di una chiave in 1 passaggio. Cercare una chiave nel trie richiede diverse ricerche DB sottostanti, per ottenere il valore finale descritto sopra. Facciamo riferimento a quest'ultimo come `path`, per eliminare ogni ambiguità.

Le operazioni di aggiornamento ed eliminazione per gli alberi radicati sono definibili come segue:

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

Un albero Radicato di "Merkle" è costruito collegando i nodi utilizzando sinossi di hash crittografici generati deterministicamente. Questo indirizzamento del contenuto (nel DB chiave/valore `key == keccak256(rlp(value))`) fornisce una garanzia d'integrità crittografica dei dati archiviati. Se l'hash radice di un dato albero è noto pubblicamente,  allora chiunque abbia accesso ai dati delle foglie sottostanti può costruire  una prova che l'albero include un dato valore a un percorso specifico, fornendo gli hash di ogni nodo che unisce un valore specifico alla radice dell'albero.

È impossibile per un utente malintenzionato fornire la prova di una coppia `(percorso, valore)` che non esiste, poiché l'hash della radice si basa in definitiva su tutti gli hash sottostanti. Qualsiasi modifica sottostante modificherebbe l'hash radice. Si può pensare all'hash come una rappresentazione compressa delle informazioni strutturali sui dati, assicurata da una protezione pre-immagine della funzione di hashing.

Ci riferiremo a un'unità atomica di un albero radix (ad esempio, un singolo carattere esadecimale o un numero binario a 4 bit) come "nibble". Durante l'attraversamento di un percorso, un nibble alla volta, come descritto sopra, i nodi possono fare riferimento al massimo a 16 figli ma includono un elemento `value`. Dunque, li rappresentiamo come un insieme di lunghezza 17. Chiamiamo questi insiemi da 17 elementi "nodi ramo".

## Trie Merkle Patricia {#merkle-patricia-trees}

Gli alberi radicati hanno una grande limitazione: non sono efficienti. Se si vuole archiviare un'associazione `(percorso, valore)` in cui il percorso, come in Ethereum, è lungo 64 caratteri (il numero di nibble in `bytes32`), servirà oltre un kilobyte di spazio extra per archiviare un livello per carattere, e ogni ricerca o eliminazione richiederà tutti i 64 passaggi. L'albero di Patricia introdotto di seguito risolve tale problema.

### Ottimizzazione {#optimization}

Un nodo in un trie di Patricia Merkle è uno dei seguenti:

1. `NULL` (rappresentato come stringa vuota)
2. `branch` Un nodo a 17 elementi `[ v0 ...` `v15, vt ]`
3. `leaf` Un nodo a 2 elementi `[ encodedPath, value ]`
4. `extension` Un nodo a 2 elementi `[ encodedPath, key ]`

Con i percorsi da 64 caratteri è inevitabile che dopo aver attraversato i primi pochi livelli del trie, si raggiunge un nodo privo di alcun percorso divergente per almeno parte del percorso. Per evitare di dover creare fino a 15 nodi `NULL` sparsi lungo il percorso, si abbrevia la discesa impostando un nodo di `extension` della forma `[ encodedPath, key ]`, dove `encodedPath` contiene il "percorso parziale" da saltare (usando una codifica compatta descritta di seguito), e `key` è per la successiva ricerca nel DB.

Per un nodo `leaf`, che può essere contrassegnato da un flag nel primo nibble di `encodedPath`, il percorso codifica tutti i frammenti di percorso del nodo precedente e possiamo cercare direttamente il `value`.

Tale suddetta ottimizzazione, tuttavia, introduce delle ambiguità.

Quando si attraversano i percorsi in nibble, si può finire con un numero dispari di nibble da attraversare, ma poiché tutti i dati sono memorizzati in formato `bytes`. Non è possibile distinguere, ad esempio, tra il nibble `1` e i nibble `01` (entrambi devono essere memorizzati come `<01>`). Per specificare una lunghezza dispari, il percorso parziale è prefissato con un flag.

### Specifica: codifica compatta della sequenza esadecimale con terminatore facoltativo {#specification}

La segnalazione sia della _lunghezza del percorso parziale rimanente pari o dispari_ sia del _nodo leaf o di estensione_, come descritto sopra, risiede nel primo nibble del percorso parziale di qualsiasi nodo a 2 elementi. Il risultato è il seguente:

| carattere esadecimale | bit  | tipo di nodo parziale               | lunghezza percorso |
| --------------------- | ---- | ----------------------------------- | ------------------ |
| 0                     | 0000 | estensione                          | pari               |
| 1                     | 0001 | estensione                          | dispari            |
| 2                     | 0010 | terminale (leaf) | pari               |
| 3                     | 0011 | terminale (leaf) | dispari            |

Per una lunghezza del percorso rimanente pari (`0` o `2`), seguirà sempre un altro nibble di "padding" `0`.

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
        # hexarray ora ha una lunghezza pari il cui primo nibble sono i flag.
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

Ecco il codice esteso per ottenere un nodo nel trie di Patricia Merkle:

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

### Esempio di trie {#example-trie}

Supponiamo di volere un trie contenente quattro coppie percorso/valore: `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Per prima cosa, convertiamo sia i percorsi che i valori in `bytes`. Di seguito, le rappresentazioni effettive in byte per i _percorsi_ sono indicate da `<>`, anche se i _valori_ sono ancora mostrati come stringhe, indicate da `''`, per una più facile comprensione (anch'essi, in realtà, sarebbero `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coins'
    <68 6f 72 73 65> : 'stallion'
```

Ora, costruiamo un trie di questo tipo con le seguenti coppie chiave/valore nel DB sottostante:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashC ]
    hashC:    [ <>, <>, <>, <>, <>, <>, hashD, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashD:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coins' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Quando si fa riferimento a un nodo all'interno di un altro, ciò che viene incluso è `keccak256(rlp.encode(node))`, se `len(rlp.encode(node)) >= 32`, altrimenti `node`, dove `rlp.encode` è la funzione di codifica [RLP](/developers/docs/data-structures-and-encoding/rlp).

Si noti che durante l'aggiornamento di un trie, è necessario archiviare la coppia chiave/valore `(keccak256(x), x)` in una tabella di ricerca persistente _se_ il nodo appena creato ha una lunghezza >= 32. Se invece il nodo è inferiore a questo valore, non è necessario memorizzare nulla, poiché la funzione f(x) = x è reversibile.

## I trie in Ethereum {#tries-in-ethereum}

Tutti i trie di Merkle nel livello d'esecuzione di Ethereum usano un Trie di Patricia Merkle.

Dall'intestazione di un blocco ci sono 3 radici provenienti da 3 di questi trie.

1. stateRoot
2. transactionsRoot
3. receiptsRoot

### Trie di stato {#state-trie}

Esiste un albero di stato globale ed è aggiornato ogni volta che un client elabora un blocco. In esso, un `path` è sempre: `keccak256(ethereumAddress)` e un `value` è sempre: `rlp(ethereumAccount)`. Più specificamente, un `account` Ethereum è un array di 4 elementi: `[nonce,balance,storageRoot,codeHash]`. A questo punto, vale la pena notare che questo `storageRoot` è la radice di un altro trie di Patricia:

### Trie di archiviazione {#storage-trie}

Il trie di archiviazione è dove risiedono _tutti_ i dati del contratto. Esiste un albero d'archiviazione separato per ogni conto. Per recuperare i valori a posizioni d'archiviazione specifiche a un dato indirizzo, servono l'indirizzo d'archiviazione, la posizione intera dei dati memorizzati in archiviazione e l'ID del blocco. Questi possono quindi essere passati come argomenti a `eth_getStorageAt` definito nell'API JSON-RPC, ad esempio per recuperare i dati nello slot di archiviazione 0 per l'indirizzo `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Il recupero di altri elementi in archiviazione è lievemente più impegnativo, poiché deve essere calcolata prima la posizione nel trie d'archiviazione. La posizione è calcolata come l'hash `keccak256` dell'indirizzo e della posizione di archiviazione, entrambi con riempimento a sinistra di zeri (left-padded) fino a una lunghezza di 32 byte. Ad esempio, la posizione per i dati nello slot di archiviazione 1 per l'indirizzo `0x391694e7e0b0cce554cb130d723a9d27458f9298` è:

```python
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

In una console Geth, si può calcolare in questo modo:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Il `path` è quindi `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Questo è ora utilizzabile per recuperare i dati dal trie d'archiviazione come sopra:

```bash
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: lo `storageRoot` per un account Ethereum è vuoto per impostazione predefinita se non è un account di contratto.

### Trie delle transazioni {#transaction-trie}

Esiste un trie delle transazioni separato per ogni blocco, che archivia sempre coppie `(chiave, valore)`. Un percorso qui è: `rlp(transactionIndex)` che rappresenta la chiave che corrisponde a un valore determinato da:

```python
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maggiori informazioni su questo argomento si possono trovare nella documentazione dell'[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie delle ricevute {#receipts-trie}

Ogni blocco ha il proprio trie delle ricevute. Un `path` qui è: `rlp(transactionIndex)`. `transactionIndex` è il suo indice all'interno del blocco in cui è stato incluso. L'albero delle ricevute non è mai aggiornato. Analogamento all'albero delle Transazioni, esistono ricevute correnti e legacy. Per interrogare una ricevuta specifica nell'albero delle Ricevute, l'indice della transazione nel suo blocco, il carico utile di ricevute e il tipo di transazione sono necessari. La ricevuta restituita può essere di tipo `Receipt`, che è definita come la concatenazione di `TransactionType` e `ReceiptPayload` o può essere di tipo `LegacyReceipt` che è definita come `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Maggiori informazioni su questo argomento si possono trovare nella documentazione dell'[EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Ulteriori letture {#further-reading}

- [Trie Merkle Patricia Modificato — Come Ethereum salva uno stato](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Il "Merkling" in Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Comprendere il trie di Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
