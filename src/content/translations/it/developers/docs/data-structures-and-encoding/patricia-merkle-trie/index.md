---
title: Alberi di Patricia Merkle
description: Introduzione ai Trie di Patricia Merkle.
lang: it
sidebarDepth: 2
---

Un Trie di Patricia Merkle fornisce una struttura di dati autenticata crittograficamente, utilizzabile per memorizzare tutte le coppie `(chiave, valore) `.

I Trie di Patricia Merkle sono completamente deterministici, quindi è garantito che un trie con le stesse coppie `(chiave, valore)` sia identico, fino all'ultimo byte. Ciò significa che hanno lo stesso hash di root, fornendo così il sacro graal dell'efficienza di `O(log(n))` per inserimenti, ricerche ed eliminazioni. Inoltre, sono più semplici da comprendere e programmare rispetto ad alternative più complesse basate sul confronto, come gli alberi rosso-neri.

## Prerequisiti {#prerequisites}

Per comprendere questa pagina è utile avere una conoscenza di base degli alberi di Merkle e della serializzazione.

## Trie della radice di base {#basic-radix-tries}

In un trie della radice di base, ogni nodo si presenta così:

```
    [i0, i1 ... in, value]

```

Dove `i0 ... in` rappresenta i simboli dell'alfabeto (spesso binari o esadecimali), `value` è il valore terminale al nodo e i valori negli slot `i0 ... in` sono `NULL` o puntatori ad (nel nostro caso, hash di) altri nodi. Questo forma un'archiviazione di base `(chiave, valore)`. Ad esempio, se sei interessato al valore correntemente mappato a `dog` nel trie, prima devi convertire `dog` in lettere dell'alfabeto (ottenendo `64 6f 67`) e poi scendere dal trie seguendo il percorso, fino a trovare il valore. Dunque, prima dovresti cercare l'hash della radice in un DB flat chiave/valore per trovare il nodo di root del trie (che è un insieme di chiavi ad altri nodi), usando come chiave il valore all'indice `6` (cercando nel DB chiave/valore) per ottenere il nodo al livello inferiore successivo, poi dovresti selezionarne l'indice `4` per cercare il valore successivo, poi prendere l'indice `6` e così via, finché, una volta seguito il percorso: `root -> 6 -> 4 -> 6 -> 15 -> 6 -> 7`, dovresti leggere il valore che hai e restituire il risultato.

Esiste una differenza tra cercare qualcosa nel 'trie' e nel 'DB' flat chiave/valore sottostante. Entrambi definiscono degli schemi chiave/valori, ma il DB sottostante può effettuare una tradizionale ricerca di una chiave in 1 passaggio. Cercare una chiave nel trie richiede diverse ricerche DB sottostanti, per ottenere il valore finale descritto sopra. Facciamo riferimento a quest'ultimo come `path`, per eliminare ogni ambiguità.

Le operazioni di aggiornamento ed eliminazione per i trie di radice sono semplici e possono essere approssimativamente così definite:

```
    def update(node,path,value):
        if path == '':
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
            newnode[-1] = value
        else:
            curnode = db.get(node) if node else [ NULL ] * 17
            newnode = curnode.copy()
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

            if len(filter(x -> x is not NULL, newnode)) == 0:
                return NULL
            else:
                db.put(hash(newnode),newnode)
                return hash(newnode)
```

La parte "Merkle" del trie della radice nasce dal fatto che, come puntatore al nodo, è usato un hash crittografico deterministico di un nodo (per ogni ricerca nel DB chiave/valore `key == keccak256(rlp(value))`, piuttosto che una qualche posizione della memoria a 32 o 64 bit, come potrebbe avvenire in un trie più tradizionale implementato in C. Questo fornisce una forma d'autenticazione crittografica alla struttura dei dati; se l'hash della radice di un dato trie è pubblicamente noto, allora chiunque può fornire una prova che il trie abbia un dato valore a un percorso specifico, fornendo gli hash di ogni nodo che si unisce a un valore specifico alla radice dell'albero. È impossibile per un utente malevolo fornire una prova di una coppia (percorso, valore) che non esiste, poiché l'hash della radice è basato in definitiva su tutti gli hash successivi, quindi, ogni modifica modificherebbe l'hash della radice.

Pur attraversando un percorso un nibble alla volta, come descritto sopra, gran parte dei nodi contiene un insieme di 17 elementi. Un indice per ogni possibile valore tenuto dal carattere esadecimale successivo (nibble) nel percorso e uno per detenere il valore di destinazione finale se il percorso è stato attraversato interamente. Questi nodi dell'array di 17 elementi sono detti nodi del `branch`.

## Trie di Patricia Merkle {#merkle-patricia-trees}

I trie della radice presentano però una grande limitazione: sono inefficienti. Se si vuole memorizzare solo una coppia (percorso, valore) in cui si trova il percorso (nel caso del trie di stato di Ethereum), lunga 64 caratteri (numero di nibble in `bytes32`), servirà oltre un kilobyte di spazio aggiuntivo per memorizzare un livello per carattere, e per ogni ricerca o eliminazione verranno eseguiti tutti i 64 passaggi. Il trie di Patricia risolve questo problema.

### Ottimizzazione {#optimization}

I trie di Patricia Merkle risolvono il problema d'inefficienza aggiungendo una certa complessità aggiuntiva alla struttura dei dati. Un nodo in un trie di Patricia Merkle è uno dei seguenti:

1.  `NULL` (rappresentato come la stringa vuota)
2.  `branch` Un nodo da 17 elementi `[ v0 ... v15, vt ]`
3.  `leaf` Un nodo da 2 elementi `[ encodedPath, value ]`
4.  `extension` Un nodo da 2 elementi `[ encodedPath, key ]`

Con i percorsi da 64 caratteri è inevitabile che dopo aver attraversato i primi pochi livelli del trie, si raggiunge un nodo privo di alcun percorso divergente per almeno parte del percorso. Sarebbe ingenuo richiedere che un nodo simile abbia valori vuoti in ogni indice (uno per ognuno dei 16 caratteri esadecimali), oltre all'indice di destinazione (accanto al nibble nel percorso). Al contrario, accorciamo la discesa configurando un nodo `extension` con la forma `[ encodedPath, key ]`, in cui `encodedPath` contiene il "percorso parziale" per saltare avanti (usando la codifica compatta sopra descritta) e la `key` è per la prossima ricerca DB.

Nel caso di un nodo `leaf`, determinabile da un flag nel primo nibble di `encodedPath`, si verifica la suddetta situazione e anche il "percorso parziale" per saltare avanti completa la restante parte di un percorso. In questo caso, `value` è lo stesso valore di destinazione.

Questa ottimizzazione introduce però delle ambiguità.

Attraversando i percorsi in nibble, potremmo finire con un numero dispari di nibble da attraversare, ma poiché tutti i dati sono memorizzati nel formato `bytes`, non è possibile distinguere, ad esempio, tra il nibble `1` e i nibble `01` (entrambi devono essere memorizzati come `<01>`). Per specificare una lunghezza dispari, il percorso parziale è prefissato con un flag.

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

Supponiamo di volere un trie contenente quattro coppie percorso/valore `('do', 'verb')`, `('dog', 'puppy')`, `('doge', 'coin')`, `('horse', 'stallion')`.

Per prima cosa, convertiamo sia i percorsi che i valori in `bytes`. Di seguito, le rappresentazioni reali dei byte per i _percorsi_ sono denotate da `<>`, sebbene i _valori_ siano mostrati ancora come stringhe, denotate da `"`, per maggiore facilità di comprensione (anch'essi, sarebbero in realtà `bytes`):

```
    <64 6f> : 'verb'
    <64 6f 67> : 'puppy'
    <64 6f 67 65> : 'coin'
    <68 6f 72 73 65> : 'stallion'
```

Ora, costruiamo un trie di questo tipo con le seguenti coppie chiave/valore nel DB sottostante:

```
    rootHash: [ <16>, hashA ]
    hashA:    [ <>, <>, <>, <>, hashB, <>, <>, <>, [ <20 6f 72 73 65>, 'stallion' ], <>, <>, <>, <>, <>, <>, <>, <> ]
    hashB:    [ <00 6f>, hashD ]
    hashD:    [ <>, <>, <>, <>, <>, <>, hashE, <>, <>, <>, <>, <>, <>, <>, <>, <>, 'verb' ]
    hashE:    [ <17>, [ <>, <>, <>, <>, <>, <>, [ <35>, 'coin' ], <>, <>, <>, <>, <>, <>, <>, <>, <>, 'puppy' ] ]
```

Quando in un nodo si fa riferimento a un altro nodo, viene inserito `H(rlp.encode(x))`, dove `H(x) = keccak256(x) if len(x) >= 32 else x` e `rlp.encode` è la funzione di codifica [RLP](/fundamentals/rlp).

Nota che, aggiornando un trie, si deve memorizzare la coppia chiave/valore `(keccak256(x), x)` in una tabella di ricerca persistente _se_ il nodo appena creato ha una lunghezza >= 32. Se invece il nodo è inferiore a questo valore, non è necessario memorizzare nulla, poiché la funzione f(x) = x è reversibile.

## Trie in Ethereum {#tries-in-ethereum}

Tutti i trie di Merkle nel livello d'esecuzione di Ethereum usano un Trie di Patricia Merkle.

Dall'intestazione di un blocco ci sono 3 radici provenienti da 3 di questi trie.

1.  stateRoot
2.  transactionsRoot
3.  receiptsRoot

### Trie di Stato {#state-trie}

Esiste un trie di stato globale che si aggiorna nel tempo. In esso, un `path` è sempre: `keccak256(ethereumAddress)` e un `value` è sempre: `rlp(ethereumAccount)`. Più nello specifico, un `account` di Ethereum è un insieme di 4 elementi di `[nonce,balance,storageRoot,codeHash]`. A questo punto, vale la pena di notare che questo `storageRoot` è la radice di un altro trie di Patricia:

### Trie d'archiviazione {#storage-trie}

Il trie d'archiviazione è dove risiedono _tutti_ i dati del contratto. Esiste un trie d'archiviazione distinto per ogni conto. Per recuperare i valori a posizioni d'archiviazione specifiche a un dato indirizzo, servono l'indirizzo d'archiviazione, la posizione intera dei dati memorizzati in archiviazione e l'ID del blocco. Questi possono poi essere passati come argomenti al `eth_getStorageAt`, definito nell'API JSON-RPC, es. per recuperare i dati allo slot d'archiviazione 0 per l'indirizzo `0x295a70b2de5e3953354a6a8344e616ed314d7251`:

```
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545

{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}

```

Il recupero di altri elementi in archiviazione è lievemente più impegnativo, poiché deve essere calcolata prima la posizione nel trie d'archiviazione. La posizione è calcolata come l'hash `keccak256` dell'indirizzo e della posizione d'archiviazione, entrambi con padding di zeri a sinistra, fino a una lunghezza di 32 byte. Ad esempio, la posizione dei dati nello slot d'archiviazione 1 per l'indirizzo `0x391694e7e0b0cce554cb130d723a9d27458f9298` è:

```keccak256(decodeHex("000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"))

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

### Trie delle transazioni {#transaction-trie}

Esiste un trie delle transazioni distinto per ogni blocco, che memorizza ancora coppie (chiave, valore). Qui, un percorso è: rlp(transactionIndex) che rappresenta la chiave corrispondente a un valore determinato da:

```
if legacyTx:
  value = rlp(tx)
else:
  value = TxType | encode(tx)
```

Maggiori informazioni a riguardo si possono trovare nella documentazione [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

### Trie delle ricevute {#receipts-trie}

Ogni blocco ha il proprio trie delle ricevute. Qui, un `path` è: `rlp(transactionIndex)`. `transactionIndex` è il suo indice nel blocco estratto. Il trie delle ricevute non si aggiorna mai. Analogamente al trie delle transazioni, esistono ricevute correnti e legacy. Per interrogare una ricevuta specifica nel trie delle ricevute, servono l'indice della transazione nel suo blocco, il payload della ricevuta e il tipo di transazione. La ricevuta restituita può essere di tipo `Receipt`, definita come la concatenazione del `transaction type` e del `transaction payload`, oppure può essere di tipo `LegacyReceipt`, definito come `rlp([status, cumulativeGasUsed, logsBloom, logs])`.

Maggiori informazioni a riguardo si possono trovare nella documentazione [EIP 2718](https://eips.ethereum.org/EIPS/eip-2718).

## Letture consigliate {#further-reading}

- [Trie di Patricia Merkle modificato - Come Ethereum salva uno stato](https://medium.com/codechain/modified-merkle-patricia-trie-how-ethereum-saves-a-state-e6d7555078dd)
- [Merkling su Ethereum](https://blog.ethereum.org/2015/11/15/merkling-in-ethereum/) -[Comprendere il trie di Ethereum](https://easythereentropy.wordpress.com/2014/06/04/understanding-the-ethereum-trie/)
