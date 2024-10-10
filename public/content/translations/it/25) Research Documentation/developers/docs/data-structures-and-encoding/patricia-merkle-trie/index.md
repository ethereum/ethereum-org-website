---
title: Trie di Patricia Merkle
description: Introduzione al Trie di Patricia Merkle.
lang: it
sidebarDepth: 2
---

Lo stato di Ethereum (la totalità di tutti i conti, i saldi e i contratti intelligenti) è codificato in una versione speciale della struttura dei dati, nota generalmente in informatica come un Albero di Merkle. Questa struttura è utile per molte applicazioni crittografiche, poiché crea una relazione verificabile tra tutti le singole parti di dati facenti parte dell'albero, dando come risultato un singolo valore di **radice** utilizzabile per provare delle cose sui dati.

La struttura dei dati di Ethereum è un 'Trie di Merkle-Patricia modificato', così detto perché prende in prestito alcune funzionalità di PATRICIA (l'Algoritmo Pratico Per Recuperare Informazioni Codificate in Alfanumerico), e poiché è progetttato per il **recupero** efficiente dei dati che costituiscono lo stato di Ethereum.

Un trie di Merkle-Patricia è deterministico e verificabile crittograficamente: il solo modo per generare una radice di stato è calcolandola da ogni singola parte dello stato, e due stati identici sono facilmente dimostrabili confrontando l'hash di radice e gli hash che hanno portato a esso (_una prova di Merkle_). Per contro, non esiste alcun modo per creare due stati differenti con lo stesso hash di radice, e qualsiasi tentativo di modificare lo stato con valori differenti risulterà in un hash della radice di stato differente. Teoricamente, questa struttura rappresenta il 'Sacro Graal' dell'efficienza di `O(log(n))` per inserimenti, ricerche ed eliminazioni.

Nel prossimo futuro, Ethereum prevede di migrare a una struttura ad [Albero di Verkle](https://ethereum.org/en/roadmap/verkle-trees), che aprirà le porte a molte nuove possibilità per le future migliorie al protocollo.

## Prerequisiti {#prerequisites}

Per meglio comprendere questa pagina, sarebbe utile avere una conoscenza di base di [hash](https://en.wikipedia.org/wiki/Hash_function), [alberi di Merkle](https://en.wikipedia.org/wiki/Merkle_tree), [trie](https://en.wikipedia.org/wiki/Trie) e [serializzazione](https://en.wikipedia.org/wiki/Serialization). Questo articolo si apre con una descrizione di un [albero radicato](https://en.wikipedia.org/wiki/Radix_tree) di base, introducendo poi gradualmente alle modifiche necessarie per la struttura di dati più ottimizzata di Ethereum.

## Trie della radice di base {#basic-radix-tries}

In un trie della radice di base, ogni nodo si presenta così:

```
    [i_0, i_1 ... i_n, value]
```

Dove `i_0 ... i_n` rappresenta i simboli dell'alfabeto (spesso binari o esadecimali), `value` è il valore terminale al nodo e i valori negli spazi `i_0, i_1 ... i_n` sono `NULL` o puntano ad (nel nostro caso, a hash di) altri nodi. Questo forma un'archiviazione di base `(chiave, valore)`.

Ipotizziamo che si voglia utilizzare una struttura dei dati ad albero radicato per perdurare un ordine su una serie di coppie chiave-valore. Per trovare il valore attualmente mappato alla chiave `dog` nell'albero, occorre convertire prima `dog` in lettere dell'alfabeto (restituendo `64 6f 67`) e poi discendere l'albero seguendo tale percorso, fino a trovare il valore. Quindi, iniziare guardando l'hash radice in un database chiave/valore piatto per trovare il nodo radice dell'albero. È rappresentato come un insieme di chiavi che puntano ad altri nodi. Occorre utilizzare il valore all'indice `6` come una chiave e cercarlo nel database chiave/valore piatto per ottenere il nodo al livello inferiore. Poi si deve scegliere l'indice `4` per cercare il valore successivo, quindi, l'indice `6` e così via, finché, una volta seguito il percorso: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7` si cerca il valore del nodo e si trova il risultato.

Esiste una differenza tra cercare qualcosa nel 'trie' e nel 'DB' flat chiave/valore sottostante. Entrambi definiscono degli schemi chiave/valore, ma il DB sottostante può effettuare una tradizionale ricerca di una chiave in 1 passaggio. Cercare una chiave nel trie richiede diverse ricerche DB sottostanti, per ottenere il valore finale descritto sopra. Facciamo riferimento a quest'ultimo come `path`, per eliminare ogni ambiguità.

Le operazioni di aggiornamento ed eliminazione per gli alberi radicati sono definibili come segue:

```
    def update(node,path,value):
        curnode = db.get(node) if node else [ NULL ] * 17
        newnode = curnode.copy()
        if path == '':
            newnode[-1] = value
        else:
            newindex = update(curnode[path[0]],path[1:],value)
            newnode[path[0]] = newindex
        db.put(hash(newnode),newnode)
        return hash(newnode)

    def delete(node,path):
        if node is NULL:
            return NULL
        else:
            curnode = db.get(node)
            newnode = curnode.copy()
            if path == '':
                newnode[-1] = NULL
            else:
                newindex = delete(curnode[path[0]],path[1:])
                newnode[path[0]] = newindex

            if all(x is NULL for x in newnode):
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

Un albero Radicato di "Merkle" è costruito collegando i nodi utilizzando sinossi di hash crittografici generati deterministicamente. Questo indirizzamento del contenuto (nel DB chiave/valore `key == keccak256(rlp(value))`) fornisce una garanzia dell'integrità crittografica dei dati memorizzati. Se l'hash radice di un dato albero è noto pubblicamente,  allora chiunque abbia accesso ai dati delle foglie sottostanti può costruire  una prova che l'albero include un dato valore a un percorso specifico, fornendo gli hash di ogni nodo che unisce un valore specifico alla radice dell'albero.

È impossibile, per un utente malevolo, fornire una prova di una coppia `(percorso, valore)` che non esiste, poiché l'hash radice in definitiva si basa su tutti gli hash inferiori. Qualsiasi modifica sottostante modificherebbe l'hash radice. Si può pensare all'hash come una rappresentazione compressa delle informazioni strutturali sui dati, assicurata da una protezione pre-immagine della funzione di hashing.

Chiameremo "nibble" l'unità atomica di un albero radicato (es., un singolo carattere esadecimale o un numero binario a 4 bit). Attraversando un percorso un "nibble" per volta, come descritto sopra, i nodi possono fare riferimento massimale a 16 figli, ma includono un elemento `value`. Dunque, li rappresentiamo come un insieme di lunghezza 17. Chiamiamo questi insiemi da 17 elementi "nodi ramo".

## Trie di Patricia Merkle {#merkle-patricia-trees}

Gli alberi radicati hanno una grande limitazione: non sono efficienti. Se si desidera memorizzare una coppia `(percorso, valore)` dove il percorso, come in Ethereum, è lungo 64 caratteri (il numero di "nibble" in `bytes32`), servirà oltre un kilobyte di spazio aggiuntivo per memorizzare un livello per carattere e, ogni ricerca o eliminazione, richiederebbe tutti e 64 i passaggi. L'albero di Patricia introdotto di seguito risolve tale problema.

### Ottimizzazione {#optimization}

Un nodo in un trie di Patricia Merkle è uno dei seguenti:

1.  `NULL` (rappresentato come la stringa vuota)
2.  `branch` Un nodo da 17 elementi `[ v0 ... v15, vt ]`
3.  `leaf` Un nodo da 2 elementi `[ encodedPath, value ]`
4.  `extension` Un nodo da 2 elementi `[ encodedPath, key ]`

Con i percorsi da 64 caratteri è inevitabile che dopo aver attraversato i primi pochi livelli del trie, si raggiunge un nodo privo di alcun percorso divergente per almeno parte del percorso. Per evitare di dover creare 15 nodi `NULL` sparsi lungo il percorso, abbreviamo la discesa configurando un nodo `extension` della forma `[ encodedPath, key ]`, in cui `encodedPath` contiene il "percorso parziale" a cui saltare (utilizzando una codifica compatta spiegata di seguito) e `key` è per la prossima ricerca sul database.

Per un nodo `leaf`, contrassegnabile da un flag nel primo nibble del `encodedPath`, il percorso codifica tutti i frammenti precedenti del percorso del nodo e possiamo cercare direttamente il `value`.

Tale suddetta ottimizzazione, tuttavia, introduce delle ambiguità.

Attraversando i percorsi in "nibble", potremmo finire con un numero dispari di nibble da attraversare; questo perché tutti i dati sono memorizzati nel fromato `bytes`. Non è possibile differenziare tra, ad esempio, il nibble `1` e i nibble `01` (entrambi devono essere memorizzati come `<01>`). Per specificare una lunghezza dispari, il percorso parziale è prefissato con un flag.

### Specifica: codifica compatta della sequenza esadecimale con terminatore facoltativo {#specification}

Il flagging sia _della lunghezza del percorso parziale rimanente, dispari o pari,_ sia del _nodo leaf o estensione_, come descritto sopra, risiede nel primo nibble del percorso parziale di qualsiasi nodo di 2 elementi. Il risultato è il seguente:

    char hex    bit    |    parziale tipo nodo     lungh percorso
    ----------------------------------------------------------
       0        0000    |       estensione              pari
       1        0001    |       estensione              dispari
       2        0010    |   terminazione (leaf)         pari
       3        0011    |   terminazione (leaf)         dispari

per la lunghezza del percorso rimanente pari (`0` or `2`), seguirà sempre un altro nibble di "padding" `0`.

```
    def compact_encode(hexarray):
        term = 1 if hexarray[-1] == 16 else 0
        if term: hexarray = hexarray[:-1]
        oddlen = len(hexarray) % 2
        flags = 2 * term + oddlen
        if oddlen:
            hexarray = [flags] + hexarray
        else:
            hexarray = [flags] + [0] + hexarray
        // hexarray ha ora una lunghezza pari, il cui primo nibble si compone dei flag.
        o = ''
        for i in range(0,len(hexarray),2):
            o += chr(16 * hexarray[i] + hexarray[i+1])
        return o
```

Esempi:

```
    > [ 1, 2, 3, 4, 5, ...]
    '11 23 45'
    > [ 0, 1, 2, 3, 4, 5, ...]
    '00 01 23 45'
    > [ 0, f, 1, c, b, 8, 10]
    '20 0f 1c b8'
    > [ f, 1, c, b, 8, 10]
    '3f 1c b8'
```

Ecco il codice esteso per ottenere un nodo nel trie di Patricia Merkle:

```
    def get_helper(node,path):
        if path == []: return node
        if node = '': return ''
        curnode = rlp.decode(node if len(node) < 32 else db.get(node))
        if len(curnode) == 2:
            (k2, v2) = curnode
            k2 = compact_decode(k2)
            if k2 == path[:len(k2)]:
                return get(v2, path[len(k2):])
            else:
                return ''
        elif len(curnode) == 17:
            return get_helper(curnode[path[0]],path[1:])

    def get(node,path):
        path2 = []
        for i in range(len(path)):
            path2.push(int(ord(path[i]) / 16))
            path2.push(ord(path[i]) % 16)
        path2.push(16)
        return get_helper(node,path2)
```

### Esempio di Trie {#example-trie}

Supponiamo di volere un trie che contenga quattro coppie percorso/valore `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coins')`, `('horse', 'stallion')`.

Per prima cosa, convertiamo sia i percorsi che i valori in `bytes`. Di seguito, le rappresentazioni reali dei byte per i _percorsi_ sono denotate da `<>`, sebbene i _valori_ siano mostrati ancora come stringhe, denotate da `"`, per maggiore facilità di comprensione (anch'essi, sarebbero in realtà `bytes`):

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

Quando in un nodo si fa riferimento a un altro nodo, viene inserito `H(rlp.encode(node))`, dove `H(x) = keccak256(x) if len(x) >= 32 else x` e `rlp.encode` è la funzione di codifica [RLP](/developers/docs/data-structures-and-encoding/rlp).

Nota che, aggiornando un trie, si deve memorizzare la coppia chiave/valore `(keccak256(x), x)` in una tabella di ricerca persistente _se_ il nodo appena creato ha una lunghezza >= 32. Se invece il nodo è inferiore a questo valore, non è necessario memorizzare nulla, poiché la funzione f(x) = x è reversibile.

## Trie in Ethereum {#tries-in-ethereum}

Tutti i trie di Merkle nel livello d'esecuzione di Ethereum usano un Trie di Patricia Merkle.

Dall'intestazione di un blocco ci sono 3 radici provenienti da 3 di questi trie.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie di Stato {#state-trie}

Esiste un albero di stato globale ed è aggiornato ogni volta che un client elabora un blocco. In esso, un `path` è sempre: `keccak256(ethereumAddress)` e un `value` è sempre: `rlp(ethereumAccount)`. Più nello specifico, un `account` di Ethereum è un insieme di 4 elementi di `[nonce,balance,storageRoot,codeHash]`. A questo punto, vale la pena di notare che tale `storageRoot` è la radice di un altro albero di Patricia:

### Trie d'archiviazione {#storage-trie}

Il trie d'archiviazione è dove risiedono _tutti_ i dati del contratto. Esiste un albero d'archiviazione separato per ogni conto. Per recuperare i valori a posizioni d'archiviazione specifiche a un dato indirizzo, servono l'indirizzo d'archiviazione, la posizione intera dei dati memorizzati in archiviazione e l'ID del blocco. Questi possono essere passati come argomenti al `eth_getStorageAt`, definito nell'APi di JSON-RPC, es., per recuperare i dati nello slot 0 d'archiviazione per l'indirizzo `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Il recupero di altri elementi in archiviazione è lievemente più impegnativo, poiché deve essere calcolata prima la posizione nel trie d'archiviazione. La posizione è calcolata come l'hash `keccak256` dell'indirizzo e della posizione d'archiviazione, entrambi con padding di zeri a sinistra, fino a una lunghezza di 32 byte. Ad esempio, la posizione dei dati nello slot d'archiviazione 1 per l'indirizzo `0x391694e7e0b0cce554cb130d723a9d27458f9298` è:

```
keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))
```

In una console Geth, si può calcolare in questo modo:

```
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Il `path` è dunque `keccak256(<6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9>)`. Questo è ora utilizzabile per recuperare i dati dal trie d'archiviazione come sopra:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

Nota: la `storageRoot` per un account di Ethereum è vuota per impostazione predefinita se non è l'account di un contratto.

### Trie delle transazioni {#transaction-trie}

Esiste un albero di transazioni separato per ogni blocco, anch'esso che memorizza coppie `(key, value)`. Qui, un percorso è: `rlp(transactionIndex)`, rappresentante la chiave corrispondente a un valore determinato da:

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maggiori informazioni a riguardo si possono trovare nella documentazione [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie delle ricevute {#receipts-trie}

Ogni blocco ha il proprio trie delle ricevute. Qui, un `path` è: `rlp(transactionIndex)`. `transactionIndex` è il suo indice all'interno del blocco in cui è stato incluso. L'albero delle ricevute non è mai aggiornato. Analogamento all'albero delle Transazioni, esistono ricevute correnti e legacy. Per interrogare una ricevuta specifica nell'albero delle Ricevute, l'indice della transazione nel suo blocco, il carico utile di ricevute e il tipo di transazione sono necessari. La ricevuta Restituita può essere di tipo `Receipt`, definita come la concatenazione di `TransactionType` e `ReceiptPayload` o di tipo `LegacyReceipt`, definibile come `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Maggiori informazioni a riguardo si possono trovare nella documentazione [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Letture consigliate {#further-reading}

- [Albero di Patricia Merkle Modificato - Come Ethereum risparmia uno stato](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- ["Merkling" su Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/)
- [Comprendere l'albero di Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
