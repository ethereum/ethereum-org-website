---
title: API JSON-RPC
description: Un protocollo di chiamata di procedura remota (RPC) leggero e senza stato per i client di Ethereum.
lang: it
---

Affinché un'applicazione software possa interagire con la blockchain di [Ethereum](/) - sia leggendo i dati della blockchain che inviando transazioni alla rete - deve connettersi a un nodo di Ethereum.

A questo scopo, ogni [client di Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implementa una [specifica JSON-RPC](https://github.com/ethereum/execution-apis), in modo che ci sia un insieme uniforme di metodi su cui le applicazioni possono fare affidamento indipendentemente dalla specifica implementazione del nodo o del client.

[JSON-RPC](https://www.jsonrpc.org/specification) è un protocollo di chiamata di procedura remota (RPC) leggero e senza stato. Definisce diverse strutture di dati e le regole per la loro elaborazione. È indipendente dal trasporto, in quanto i concetti possono essere utilizzati all'interno dello stesso processo, tramite socket, tramite HTTP o in molti ambienti diversi di passaggio di messaggi. Utilizza JSON (RFC 4627) come formato dei dati.

## Implementazioni dei client {#client-implementations}

I client di Ethereum possono utilizzare linguaggi di programmazione diversi nell'implementazione della specifica JSON-RPC. Consulta la [documentazione dei singoli client](/developers/docs/nodes-and-clients/#execution-clients) per ulteriori dettagli relativi a specifici linguaggi di programmazione. Consigliamo di controllare la documentazione di ciascun client per le informazioni più recenti sul supporto delle API.

## Librerie di utilità {#convenience-libraries}

Sebbene tu possa scegliere di interagire direttamente con i client di Ethereum tramite l'API JSON-RPC, ci sono spesso opzioni più semplici per gli sviluppatori di dApp. Esistono molte librerie [JavaScript](/developers/docs/apis/javascript/#available-libraries) e [API di backend](/developers/docs/apis/backend/#available-libraries) che forniscono wrapper sopra l'API JSON-RPC. Con queste librerie, gli sviluppatori possono scrivere metodi intuitivi di una sola riga nel linguaggio di programmazione scelto per inizializzare richieste JSON-RPC (dietro le quinte) che interagiscono con Ethereum.

## API dei client di consenso {#consensus-clients}

Questa pagina tratta principalmente l'API JSON-RPC utilizzata dai client di esecuzione di Ethereum. Tuttavia, anche i client di consenso dispongono di un'API RPC che consente agli utenti di richiedere informazioni sul nodo, richiedere blocchi Beacon, lo stato Beacon e altre informazioni relative al consenso direttamente da un nodo. Questa API è documentata sulla [pagina web dell'API Beacon](https://ethereum.github.io/beacon-APIs/#/).

Un'API interna viene utilizzata anche per la comunicazione tra client all'interno di un nodo, ovvero consente al client di consenso e al client di esecuzione di scambiarsi dati. Questa è chiamata 'Engine API' e le specifiche sono disponibili su [GitHub](https://github.com/ethereum/execution-apis/blob/main/src/engine/common.md).

## Specifiche del client di esecuzione {#spec}

[Leggi le specifiche complete dell'API JSON-RPC su GitHub](https://github.com/ethereum/execution-apis). Questa API è documentata sulla [pagina web dell'API di esecuzione](https://ethereum.github.io/execution-apis/) e include un Inspector per provare tutti i metodi disponibili.

## Convenzioni {#conventions}

### Codifica dei valori esadecimali {#hex-encoding}

Due tipi di dati chiave vengono passati tramite JSON: array di byte non formattati e quantità. Entrambi vengono passati con una codifica esadecimale ma con requisiti diversi per la formattazione.

#### Quantità {#quantities-encoding}

Quando si codificano quantità (interi, numeri): codificare come esadecimale, prefissare con "0x", la rappresentazione più compatta (piccola eccezione: lo zero dovrebbe essere rappresentato come "0x0").

Ecco alcuni esempi:

- 0x41 (65 in decimale)
- 0x400 (1024 in decimale)
- SBAGLIATO: 0x (dovrebbe avere sempre almeno una cifra - lo zero è "0x0")
- SBAGLIATO: 0x0400 (non sono ammessi zeri iniziali)
- SBAGLIATO: ff (deve essere prefissato con 0x)

### Dati non formattati {#unformatted-data-encoding}

Quando si codificano dati non formattati (array di byte, indirizzi di account, hash, array di bytecode): codificare come esadecimale, prefissare con "0x", due cifre esadecimali per byte.

Ecco alcuni esempi:

- 0x41 (dimensione 1, "A")
- 0x004200 (dimensione 3, "0B0")
- 0x (dimensione 0, "")
- SBAGLIATO: 0xf0f0f (deve essere un numero pari di cifre)
- SBAGLIATO: 004200 (deve essere prefissato con 0x)

### Il parametro del blocco {#block-parameter}

I seguenti metodi hanno un parametro del blocco:

- [eth_getBalance](#eth_getbalance)
- [eth_getCode](#eth_getcode)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_call](#eth_call)

Quando vengono fatte richieste che interrogano lo stato di Ethereum, il parametro del blocco fornito determina l'altezza del blocco.

Le seguenti opzioni sono possibili per il parametro del blocco:

- `Stringa HEX` - un numero di blocco intero
- `Stringa "earliest"` per il primo blocco o blocco genesi
- `Stringa "latest"` - per l'ultimo blocco proposto
- `Stringa "safe"` - per l'ultimo blocco head sicuro
- `Stringa "finalized"` - per l'ultimo blocco finalizzato
- `Stringa "pending"` - per lo stato o le transazioni in sospeso

## Esempi

In questa pagina forniamo esempi di come utilizzare i singoli endpoint dell'API JSON_RPC usando lo strumento a riga di comando, [curl](https://curl.se). Questi esempi di singoli endpoint si trovano di seguito nella sezione [Esempi di curl](#curl-examples). Più in basso nella pagina, forniamo anche un [esempio end-to-end](#usage-example) per compilare e distribuire un contratto intelligente utilizzando un nodo Geth, l'API JSON_RPC e curl.

## Esempi con curl {#curl-examples}

Di seguito sono forniti esempi di utilizzo dell'API JSON_RPC effettuando richieste [curl](https://curl.se) a un nodo Ethereum. Ogni esempio include una descrizione dell'endpoint specifico, i suoi parametri, il tipo di ritorno e un esempio pratico di come dovrebbe essere utilizzato.

Le richieste curl potrebbero restituire un messaggio di errore relativo al tipo di contenuto. Questo perché l'opzione `--data` imposta il tipo di contenuto su `application/x-www-form-urlencoded`. Se il tuo nodo segnala un problema al riguardo, imposta manualmente l'intestazione inserendo `-H "Content-Type: application/json"` all'inizio della chiamata. Inoltre, gli esempi non includono la combinazione di URL/IP e porta, che deve essere l'ultimo argomento fornito a curl (es. `127.0.0.1:8545`). Una richiesta curl completa che include questi dati aggiuntivi assume la seguente forma:

```shell
curl -H "Content-Type: application/json" -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}' 127.0.0.1:8545
```

## Gossip, Stato, Cronologia {#gossip-state-history}

Una manciata di metodi JSON-RPC principali richiede dati dalla rete di Ethereum e rientra ordinatamente in tre categorie principali: _Gossip, Stato e Cronologia_. Usa i link in queste sezioni per passare a ciascun metodo, oppure usa il sommario per esplorare l'intero elenco dei metodi.

### Metodi di Gossip {#gossip-methods}

> Questi metodi tracciano la testa della catena. È così che le transazioni si fanno strada nella rete, trovano posto nei blocchi e come i client scoprono i nuovi blocchi.

- [eth_blockNumber](#eth_blocknumber)
- [eth_sendRawTransaction](#eth_sendrawtransaction)

### Metodi di Stato {#state_methods}

> Metodi che riportano lo stato attuale di tutti i dati memorizzati. Lo "stato" è come un grande pezzo di RAM condivisa e include i saldi degli account, i dati dei contratti e le stime del gas.

- [eth_getBalance](#eth_getbalance)
- [eth_getStorageAt](#eth_getstorageat)
- [eth_getTransactionCount](#eth_gettransactioncount)
- [eth_getCode](#eth_getcode)
- [eth_call](#eth_call)
- [eth_estimateGas](#eth_estimategas)

### Metodi di Cronologia {#history_methods}

> Recupera i registri storici di ogni blocco fino alla genesi. Questo è come un grande file di sola aggiunta e include tutte le intestazioni dei blocchi, i corpi dei blocchi, i blocchi uncle e le ricevute delle transazioni.

- [eth_getBlockTransactionCountByHash](#eth_getblocktransactioncountbyhash)
- [eth_getBlockTransactionCountByNumber](#eth_getblocktransactioncountbynumber)
- [eth_getUncleCountByBlockHash](#eth_getunclecountbyblockhash)
- [eth_getUncleCountByBlockNumber](#eth_getunclecountbyblocknumber)
- [eth_getBlockByHash](#eth_getblockbyhash)
- [eth_getBlockByNumber](#eth_getblockbynumber)
- [eth_getTransactionByHash](#eth_gettransactionbyhash)
- [eth_getTransactionByBlockHashAndIndex](#eth_gettransactionbyblockhashandindex)
- [eth_getTransactionByBlockNumberAndIndex](#eth_gettransactionbyblocknumberandindex)
- [eth_getTransactionReceipt](#eth_gettransactionreceipt)
- [eth_getUncleByBlockHashAndIndex](#eth_getunclebyblockhashandindex)
- [eth_getUncleByBlockNumberAndIndex](#eth_getunclebyblocknumberandindex)

## Playground dell'API JSON-RPC

Puoi usare lo [strumento playground](https://ethereum-json-rpc.com) per scoprire e provare i metodi dell'API. Ti mostra anche quali metodi e reti sono supportati dai vari provider di nodi.

## Metodi dell'API JSON-RPC {#json-rpc-methods}

### web3_clientVersion {#web3_clientversion}

Restituisce la versione attuale del client.

**Parametri**

Nessuno

**Restituisce**

`String` - La versione attuale del client

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_clientVersion","params":[],"id":67}'
// Risultato
{
  "id":67,
  "jsonrpc":"2.0",
  "result": "Geth/v1.12.1-stable/linux-amd64/go1.19.1"
}
```

### web3_sha3 {#web3_sha3}

Restituisce il Keccak-256 (_non_ lo SHA3-256 standardizzato) dei dati forniti.

**Parametri**

1. `DATA` - I dati da convertire in un hash SHA3

```js
params: ["0x68656c6c6f20776f726c64"]
```

**Restituisce**

`DATA` - Il risultato SHA3 della stringa fornita.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"web3_sha3","params":["0x68656c6c6f20776f726c64"],"id":64}'
// Risultato
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad"
}
```

### net_version {#net_version}

Restituisce l'id attuale della rete.

**Parametri**

Nessuno

**Restituisce**

`String` - L'id attuale della rete.

L'elenco completo degli ID di rete attuali è disponibile su [chainlist.org](https://chainlist.org). Alcuni tra i più comuni sono:

- `1`: Rete principale di Ethereum
- `11155111`: Rete di test di Sepolia
- `560048` : Rete di test di Hoodi

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"net_version","params":[],"id":67}'
// Risultato
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "3"
}
```

### net_listening {#net_listening}

Restituisce `true` se il client è in ascolto attivo per le connessioni di rete.

**Parametri**

Nessuno

**Restituisce**

`Boolean` - `true` quando è in ascolto, altrimenti `false`.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"net_listening","params":[],"id":67}'
// Risultato
{
  "id":67,
  "jsonrpc":"2.0",
  "result":true
}
```

### net_peerCount {#net_peercount}

Restituisce il numero di peer attualmente connessi al client.

**Parametri**

Nessuno

**Restituisce**

`QUANTITY` - intero del numero di peer connessi.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"net_peerCount","params":[],"id":74}'
// Risultato
{
  "id":74,
  "jsonrpc": "2.0",
  "result": "0x2" // 2
}
```

### eth_protocolVersion {#eth_protocolversion}

Restituisce la versione attuale del protocollo di Ethereum. Nota che questo metodo [non è disponibile in Geth](https://github.com/ethereum/go-ethereum/pull/22064#issuecomment-788682924).

**Parametri**

Nessuno

**Restituisce**

`String` - La versione attuale del protocollo di Ethereum

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_protocolVersion","params":[],"id":67}'
// Risultato
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "54"
}
```

### eth_syncing {#eth_syncing}

Restituisce un oggetto con i dati sullo stato della sincronizzazione o `false`.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_syncing">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

I dati precisi restituiti variano tra le implementazioni dei client. Tutti i client restituiscono `False` quando il nodo non si sta sincronizzando e tutti i client restituiscono i seguenti campi.

`Object|Boolean`, Un oggetto con i dati dello stato di sincronizzazione o `FALSE`, quando non in sincronizzazione:

- `startingBlock`: `QUANTITY` - Il blocco al quale è iniziata l'importazione (sarà ripristinato solo dopo che la sincronizzazione avrà raggiunto la sua testa)
- `currentBlock`: `QUANTITY` - Il blocco attuale, uguale a eth_blockNumber
- `highestBlock`: `QUANTITY` - Il blocco più alto stimato

Tuttavia, i singoli client possono anche fornire dati aggiuntivi. Ad esempio, Geth restituisce quanto segue:

```json
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "currentBlock": "0x3cf522",
    "healedBytecodeBytes": "0x0",
    "healedBytecodes": "0x0",
    "healedTrienodes": "0x0",
    "healingBytecode": "0x0",
    "healingTrienodes": "0x0",
    "highestBlock": "0x3e0e41",
    "startingBlock": "0x3cbed5",
    "syncedAccountBytes": "0x0",
    "syncedAccounts": "0x0",
    "syncedBytecodeBytes": "0x0",
    "syncedBytecodes": "0x0",
    "syncedStorage": "0x0",
    "syncedStorageBytes": "0x0"
  }
}
```

Mentre Besu restituisce:

```json
{
  "jsonrpc": "2.0",
  "id": 51,
  "result": {
    "startingBlock": "0x0",
    "currentBlock": "0x1518",
    "highestBlock": "0x9567a3",
    "pulledStates": "0x203ca",
    "knownStates": "0x200636"
  }
}
```

Fai riferimento alla documentazione del tuo client specifico per maggiori dettagli.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_syncing","params":[],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": {
    startingBlock: '0x384',
    currentBlock: '0x386',
    highestBlock: '0x454'
  }
}
// O quando non è in sincronizzazione
{
  "id":1,
  "jsonrpc": "2.0",
  "result": false
}
```

### eth_coinbase {#eth_coinbase}

Restituisce l'indirizzo coinbase del client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_coinbase">
  Prova l'endpoint nel playground
</ButtonLink>

> **Nota:** Questo metodo è stato deprecato a partire dalla **v1.14.0** e non è più supportato. Il tentativo di utilizzare questo metodo comporterà un errore "Method not supported".

**Parametri**

Nessuno

**Restituisce**

`DATA`, 20 byte - l'indirizzo coinbase attuale.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_coinbase","params":[],"id":64}'
// Risultato
{
  "id":64,
  "jsonrpc": "2.0",
  "result": "0x407d73d8a49eeb85d32cf465507dd71d507100c1"
}
```

### eth_chainId {#eth_chainId}

Restituisce l'ID della catena utilizzato per firmare le transazioni protette da replay.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_chainId">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`chainId`, valore esadecimale come stringa che rappresenta l'intero dell'id della catena attuale.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":67}'
// Risultato
{
  "id":67,
  "jsonrpc": "2.0",
  "result": "0x1"
}
```

### eth_mining {#eth_mining}

Restituisce `true` se il client sta attivamente minando nuovi blocchi. Questo può restituire `true` solo per le reti a prova di lavoro e potrebbe non essere disponibile in alcuni client da [La Fusione](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_mining">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`Boolean` - restituisce `true` se il client sta minando, altrimenti `false`.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_mining","params":[],"id":71}'

{
  "id":71,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_hashrate {#eth_hashrate}

Restituisce il numero di hash al secondo con cui il nodo sta minando. Questo può restituire `true` solo per le reti a prova di lavoro e potrebbe non essere disponibile in alcuni client da [La Fusione](/roadmap/merge/).

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_hashrate">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`QUANTITY` - numero di hash al secondo.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_hashrate","params":[],"id":71}'
// Risultato
{
  "id":71,
  "jsonrpc": "2.0",
  "result": "0x38a"
}
```

### eth_gasPrice {#eth_gasprice}

Restituisce una stima del prezzo del gas attuale in wei. Ad esempio, il client Besu esamina gli ultimi 100 blocchi e restituisce il prezzo unitario mediano del gas per impostazione predefinita.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_gasPrice">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`QUANTITY` - intero del prezzo del gas attuale in wei.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_gasPrice","params":[],"id":73}'
// Risultato
{
  "id":73,
  "jsonrpc": "2.0",
  "result": "0x1dfd14000" // 8049999872 Wei
}
```

### eth_accounts {#eth_accounts}

Restituisce un elenco di indirizzi posseduti dal client.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_accounts">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`Array di DATA`, 20 Byte - indirizzi posseduti dal client.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": ["0x407d73d8a49eeb85d32cf465507dd71d507100c1"]
}
```

### eth_blockNumber {#eth_blocknumber}

Restituisce il numero del blocco più recente.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_blockNumber">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Nessuno

**Restituisce**

`QUANTITY` - intero del numero di blocco attuale su cui si trova il client.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_blockNumber","params":[],"id":83}'
// Risultato
{
  "id":83,
  "jsonrpc": "2.0",
  "result": "0x4b7" // 1207
}
```

### eth_getBalance {#eth_getbalance}

Restituisce il saldo dell'account a un dato indirizzo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBalance">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 20 Byte - indirizzo di cui controllare il saldo.
2. `QUANTITY|TAG` - numero di blocco intero, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"`, o `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: ["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"]
```

**Restituisce**

`QUANTITY` - intero del saldo attuale in wei.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBalance","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1", "latest"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0234c8a3397aab58" // 158972490234375000
}
```

### eth_getStorageAt {#eth_getstorageat}

Restituisce il valore da una posizione di archiviazione a un dato indirizzo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getStorageAt">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 20 Byte - indirizzo dell'archiviazione.
2. `QUANTITY` - intero della posizione nell'archiviazione.
3. `QUANTITY|TAG` - numero di blocco intero, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"`, `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

**Restituisce**

`DATA` - il valore in questa posizione di archiviazione.

**Esempio**
Il calcolo della posizione corretta dipende dall'archiviazione da recuperare. Considera il seguente contratto distribuito a `0x295a70b2de5e3953354a6a8344e616ed314d7251` dall'indirizzo `0x391694e7e0b0cce554cb130d723a9d27458f9298`.

```
contract Storage {
    uint pos0;
    mapping(address => uint) pos1;
    constructor() {
        pos0 = 1234;
        pos1[msg.sender] = 5678;
    }
}
```

Recuperare il valore di pos0 è semplice:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x0", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x00000000000000000000000000000000000000000000000000000000000004d2"}
```

Recuperare un elemento della mappa è più difficile. La posizione di un elemento nella mappa è calcolata con:

```js
keccak(LeftPad32(key, 0), LeftPad32(map position, 0))
```

Questo significa che per recuperare l'archiviazione su pos1["0x391694e7e0b0cce554cb130d723a9d27458f9298"] dobbiamo calcolare la posizione con:

```js
keccak(
  decodeHex(
    "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" +
      "0000000000000000000000000000000000000000000000000000000000000001"
  )
)
```

La console di geth fornita con la libreria web3 può essere utilizzata per effettuare il calcolo:

```js
> var key = "000000000000000000000000391694e7e0b0cce554cb130d723a9d27458f9298" + "0000000000000000000000000000000000000000000000000000000000000001"
undefined
> web3.sha3(key, {"encoding": "hex"})
"0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9"
```

Ora per recuperare l'archiviazione:

```js
curl -X POST --data '{"jsonrpc":"2.0", "method": "eth_getStorageAt", "params": ["0x295a70b2de5e3953354a6a8344e616ed314d7251", "0x6661e9d6d8b923d5bbaab1b96e1dd51ff6ea2a93520fdc9eb75d059238b8c5e9", "latest"], "id": 1}' localhost:8545
{"jsonrpc":"2.0","id":1,"result":"0x000000000000000000000000000000000000000000000000000000000000162e"}
```

### eth_getTransactionCount {#eth_gettransactioncount}

Restituisce il numero di transazioni _inviate_ da un indirizzo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionCount">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 20 Byte - indirizzo.
2. `QUANTITY|TAG` - numero di blocco intero, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0x407d73d8a49eeb85d32cf465507dd71d507100c1",
  "latest", // stato all'ultimo blocco
]
```

**Restituisce**

`QUANTITY` - intero del numero di transazioni inviate da questo indirizzo.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionCount","params":["0x407d73d8a49eeb85d32cf465507dd71d507100c1","latest"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getBlockTransactionCountByHash {#eth_getblocktransactioncountbyhash}

Restituisce il numero di transazioni in un blocco da un blocco che corrisponde all'hash del blocco fornito.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByHash">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - hash di un blocco

```js
params: ["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"]
```

**Restituisce**

`QUANTITY` - intero del numero di transazioni in questo blocco.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByHash","params":["0xd03ededb7415d22ae8bac30f96b2d1de83119632693b963642318d87d1bece5b"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getBlockTransactionCountByNumber {#eth_getblocktransactioncountbynumber}

Restituisce il numero di transazioni in un blocco che corrisponde al numero di blocco fornito.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockTransactionCountByNumber">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `QUANTITY|TAG` - intero di un numero di blocco, o la stringa `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, come nel [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter).

```js
params: [
  "0x13738ca", // 20396234
]
```

**Restituisce**

`QUANTITY` - intero del numero di transazioni in questo blocco.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockTransactionCountByNumber","params":["0x13738ca"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x8b" // 139
}
```

### eth_getUncleCountByBlockHash {#eth_getunclecountbyblockhash}

Restituisce il numero di uncle in un blocco da un blocco che corrisponde all'hash del blocco fornito.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockHash">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - hash di un blocco

```js
params: ["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"]
```

**Restituisce**

`QUANTITY` - intero del numero di uncle in questo blocco.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockHash","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_getUncleCountByBlockNumber {#eth_getunclecountbyblocknumber}

Restituisce il numero di uncle in un blocco da un blocco che corrisponde al numero di blocco fornito.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleCountByBlockNumber">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `QUANTITY|TAG` - intero di un numero di blocco, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xe8", // 232
]
```

**Restituisce**

`QUANTITY` - intero del numero di uncle in questo blocco.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleCountByBlockNumber","params":["0xe8"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x0" // 0
}
```

### eth_getCode {#eth_getcode}

Restituisce il codice a un dato indirizzo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getCode">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 20 Byte - indirizzo
2. `QUANTITY|TAG` - numero di blocco intero, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

```js
params: [
  "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
  "0x5daf3b", // 6139707
]
```

**Restituisce**

`DATA` - il codice dal dato indirizzo.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getCode","params":["0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", "0x5daf3b"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x6060604052600436106100af576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806306fdde03146100b9578063095ea7b31461014757806318160ddd146101a157806323b872dd146101ca5780632e1a7d4d14610243578063313ce5671461026657806370a082311461029557806395d89b41146102e2578063a9059cbb14610370578063d0e30db0146103ca578063dd62ed3e146103d4575b6100b7610440565b005b34156100c457600080fd5b6100cc6104dd565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561010c5780820151818401526020810190506100f1565b50505050905090810190601f1680156101395780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561015257600080fd5b610187600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061057b565b604051808215151515815260200191505060405180910390f35b34156101ac57600080fd5b6101b461066d565b6040518082815260200191505060405180910390f35b34156101d557600080fd5b610229600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803590602001909190505061068c565b604051808215151515815260200191505060405180910390f35b341561024e57600080fd5b61026460048080359060200190919050506109d9565b005b341561027157600080fd5b610279610b05565b604051808260ff1660ff16815260200191505060405180910390f35b34156102a057600080fd5b6102cc600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610b18565b6040518082815260200191505060405180910390f35b34156102ed57600080fd5b6102f5610b30565b6040518080602001828103825283818151815260200191508051906020019080838360005b8381101561033557808201518184015260208101905061031a565b50505050905090810190601f1680156103625780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b341561037b57600080fd5b6103b0600480803573ffffffffffffffffffffffffffffffffffffffff16906020019091908035906020019091905050610bce565b604051808215151515815260200191505060405180910390f35b6103d2610440565b005b34156103df57600080fd5b61042a600480803573ffffffffffffffffffffffffffffffffffffffff1690602001909190803573ffffffffffffffffffffffffffffffffffffffff16906020019091905050610be3565b6040518082815260200191505060405180910390f35b34600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055503373ffffffffffffffffffffffffffffffffffffffff167fe1fffcc4923d04b559f4d29a8bfc6cda04eb5b0d3c460751c2402c5c5cc9109c346040518082815260200191505060405180910390a2565b60008054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105735780601f1061054857610100808354040283529160200191610573565b820191906000526020600020905b81548152906001019060200180831161055657829003601f168201915b505050505081565b600081600460003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508273ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925846040518082815260200191505060405180910390a36001905092915050565b60003073ffffffffffffffffffffffffffffffffffffffff1631905090565b600081600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054101515156106dc57600080fd5b3373ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff16141580156107b457507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205414155b156108cf5781600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020541015151561084457600080fd5b81600460008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055505b81600360008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000206000828254039250508190555081600360008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef846040518082815260200191505060405180910390a3600190509392505050565b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020019081526020016000205410151515610a2757600080fd5b80600360003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825403925050819055503373ffffffffffffffffffffffffffffffffffffffff166108fc829081150290604051600060405180830381858888f193505050501515610ab457600080fd5b3373ffffffffffffffffffffffffffffffffffffffff167f7fcf532c15f0a6db0bd6d0e038bea71d30d808c7d98cb3bf7268a95bf5081b65826040518082815260200191505060405180910390a250565b600260009054906101000a900460ff1681565b60036020528060005260406000206000915090505481565b60018054600181600116156101000203166002900480601f016020809104026020016040519081016040528092919081815260200182805460018160011615610100020316600290048015610bc65780601f10610b9b57610100808354040283529160200191610bc6565b820191906000526020600020905b815481529060010190602001808311610ba957829003601f168201915b505050505081565b6000610bdb33848461068c565b905092915050565b60046020528160005260406000206020528060005260406000206000915091505054815600a165627a7a72305820deb4c2ccab3c2fdca32ab3f46728389c2fe2c165d5fafa07661e4e004f6c344a0029"
}
```

### eth_sign {#eth_sign}

Il metodo sign calcola una firma specifica di Ethereum con: `sign(keccak256("\x19Ethereum Signed Message:\n" + len(message) + message)))`.

L'aggiunta di un prefisso al messaggio rende la firma calcolata riconoscibile come una firma specifica di Ethereum. Questo previene abusi in cui una dApp malevola può firmare dati arbitrari (es. una transazione) e utilizzare la firma per impersonare la vittima.

Nota: l'indirizzo con cui firmare deve essere sbloccato.

**Parametri**

1. `DATA`, 20 Byte - indirizzo
2. `DATA`, N Byte - messaggio da firmare

**Restituisce**

`DATA`: Firma

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sign","params":["0x9b2055d370f73ec7d8a03e965129118dc8f5bf83", "0xdeadbeaf"],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_signTransaction {#eth_signtransaction}

Firma una transazione che può essere inviata alla rete in un momento successivo utilizzando [eth_sendRawTransaction](#eth_sendrawtransaction).

**Parametri**

1. `Object` - L'oggetto della transazione

- `type`:
- `from`: `DATA`, 20 Byte - L'indirizzo da cui viene inviata la transazione.
- `to`: `DATA`, 20 Byte - (opzionale quando si crea un nuovo contratto) L'indirizzo a cui è diretta la transazione.
- `gas`: `QUANTITY` - (opzionale, predefinito: 90000) Intero del gas fornito per l'esecuzione della transazione. Restituirà il gas non utilizzato.
- `gasPrice`: `QUANTITY` - (opzionale, predefinito: Da determinare) Intero del gasPrice utilizzato per ogni gas pagato, in Wei.
- `value`: `QUANTITY` - (opzionale) Intero del valore inviato con questa transazione, in Wei.
- `data`: `DATA` - Il codice compilato di un contratto OPPURE l'hash della firma del metodo invocato e dei parametri codificati.
- `nonce`: `QUANTITY` - (opzionale) Intero di un nonce. Questo consente di sovrascrivere le proprie transazioni in sospeso che utilizzano lo stesso nonce.

**Restituisce**

`DATA`, L'oggetto della transazione codificato in RLP firmato dall'account specificato.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"id": 1,"jsonrpc": "2.0","method": "eth_signTransaction","params": [{"data":"0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675","from": "0xb60e8dd61c5d32be8058bb8eb970870f07233155","gas": "0x76c0","gasPrice": "0x9184e72a000","to": "0xd46e8dd67c5d32be8058bb8eb970870f07244567","value": "0x9184e72a"}]}'
// Risultato
{
    "id": 1,
    "jsonrpc": "2.0",
    "result": "0xa3f20717a250c2b0b729b7e5becbff67fdaef7e0699da4de7ca5895b02a170a12d887fd3b17bfdce3481f10bea41f45ba9f709d39ce8325427b57afcfc994cee1b"
}
```

### eth_sendTransaction {#eth_sendtransaction}

Crea una nuova transazione di chiamata di messaggio o la creazione di un contratto, se il campo dati contiene codice, e la firma utilizzando l'account specificato in `from`.

**Parametri**

1. `Object` - L'oggetto della transazione

- `from`: `DATA`, 20 Byte - L'indirizzo da cui viene inviata la transazione.
- `to`: `DATA`, 20 Byte - (opzionale quando si crea un nuovo contratto) L'indirizzo a cui è diretta la transazione.
- `gas`: `QUANTITY` - (opzionale, predefinito: 90000) Intero del gas fornito per l'esecuzione della transazione. Restituirà il gas non utilizzato.
- `gasPrice`: `QUANTITY` - (opzionale, predefinito: Da determinare) Intero del gasPrice utilizzato per ogni gas pagato.
- `value`: `QUANTITY` - (opzionale) Intero del valore inviato con questa transazione.
- `input`: `DATA` - Il codice compilato di un contratto OPPURE l'hash della firma del metodo invocato e dei parametri codificati.
- `nonce`: `QUANTITY` - (opzionale) Intero di un nonce. Questo consente di sovrascrivere le proprie transazioni in sospeso che utilizzano lo stesso nonce.

```js
params: [
  {
    from: "0xb60e8dd61c5d32be8058bb8eb970870f07233155",
    to: "0xd46e8dd67c5d32be8058bb8eb970870f07244567",
    gas: "0x76c0", // 30400
    gasPrice: "0x9184e72a000", // 10000000000000
    value: "0x9184e72a", // 2441406250
    input:
      "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
  },
]
```

**Restituisce**

`DATA`, 32 Byte - l'hash della transazione, o l'hash zero se la transazione non è ancora disponibile.

Usa [eth_getTransactionReceipt](#eth_gettransactionreceipt) per ottenere l'indirizzo del contratto, dopo che la transazione è stata proposta in un blocco, quando hai creato un contratto.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendTransaction","params":[{see above}],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_sendRawTransaction {#eth_sendrawtransaction}

Crea una nuova transazione di chiamata di messaggio o la creazione di un contratto per le transazioni firmate.

**Parametri**

1. `DATA`, I dati della transazione firmata.

```js
params: [
  "0xd46e8dd67c5d32be8d46e8dd67c5d32be8058bb8eb970870f072445675058bb8eb970870f072445675",
]
```

**Restituisce**

`DATA`, 32 Byte - l'hash della transazione, o l'hash zero se la transazione non è ancora disponibile.

Usa [eth_getTransactionReceipt](#eth_gettransactionreceipt) per ottenere l'indirizzo del contratto, dopo che la transazione è stata proposta in un blocco, quando hai creato un contratto.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_sendRawTransaction","params":[{see above}],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0xe670ec64341771606e55d6b4ca35a1a6b75ee3d5145a99d05921026d1527331"
}
```

### eth_call {#eth_call}

Esegue immediatamente una nuova chiamata di messaggio senza creare una transazione sulla blockchain. Spesso utilizzato per eseguire funzioni di contratto intelligente di sola lettura, ad esempio il `balanceOf` per un contratto ERC-20.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_call">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `Object` - L'oggetto della chiamata di transazione

- `from`: `DATA`, 20 Byte - (opzionale) L'indirizzo da cui viene inviata la transazione.
- `to`: `DATA`, 20 Byte - L'indirizzo a cui è diretta la transazione.
- `gas`: `QUANTITY` - (opzionale) Intero del gas fornito per l'esecuzione della transazione. eth_call consuma zero gas, ma questo parametro potrebbe essere necessario per alcune esecuzioni.
- `gasPrice`: `QUANTITY` - (opzionale) Intero del gasPrice utilizzato per ogni gas pagato
- `value`: `QUANTITY` - (opzionale) Intero del valore inviato con questa transazione
- `input`: `DATA` - (opzionale) Hash della firma del metodo e dei parametri codificati. Per i dettagli vedi [Ethereum Contract ABI nella documentazione di Solidity](https://docs.soliditylang.org/en/latest/abi-spec.html).

2. `QUANTITY|TAG` - numero di blocco intero, o la stringa `"latest"`, `"earliest"`, `"pending"`, `"safe"` o `"finalized"`, vedi il [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter)

**Restituisce**

`DATA` - il valore restituito dal contratto eseguito.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_call","params":[{see above}],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x"
}
```

### eth_estimateGas {#eth_estimategas}

Genera e restituisce una stima di quanto gas è necessario per consentire il completamento della transazione. La transazione non verrà aggiunta alla blockchain. Nota che la stima potrebbe essere significativamente superiore alla quantità di gas effettivamente utilizzata dalla transazione, per una serie di motivi tra cui le meccaniche della EVM e le prestazioni del nodo.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_estimateGas">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

Vedi i parametri di [eth_call](#eth_call), tranne per il fatto che tutte le proprietà sono opzionali. Se non viene specificato alcun limite del gas, geth utilizza il limite del gas del blocco dal blocco in sospeso come limite superiore. Di conseguenza, la stima restituita potrebbe non essere sufficiente per eseguire la chiamata/transazione quando la quantità di gas è superiore al limite del gas del blocco in sospeso.

**Restituisce**

`QUANTITY` - la quantità di gas utilizzata.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_estimateGas","params":[{see above}],"id":1}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x5208" // 21000
}
```

### eth_getBlockByHash {#eth_getblockbyhash}

Restituisce informazioni su un blocco tramite hash.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByHash">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - Hash di un blocco.
2. `Boolean` - Se `true` restituisce gli oggetti completi della transazione, se `false` solo gli hash delle transazioni.

```js
params: [
  "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
  false,
]
```

**Restituisce**

`Object` - Un oggetto blocco, o `null` quando non è stato trovato alcun blocco:

- `number`: `QUANTITY` - il numero del blocco. `null` quando è un blocco in sospeso.
- `hash`: `DATA`, 32 Byte - hash del blocco. `null` quando è un blocco in sospeso.
- `parentHash`: `DATA`, 32 Byte - hash del blocco genitore.
- `nonce`: `DATA`, 8 Byte - hash della prova di lavoro generata. `null` quando è un blocco in sospeso, `0x0` per i blocchi a prova di stake (da La Fusione)
- `sha3Uncles`: `DATA`, 32 Byte - SHA3 dei dati degli uncle nel blocco.
- `logsBloom`: `DATA`, 256 Byte - il filtro bloom per i log del blocco. `null` quando è un blocco in sospeso.
- `transactionsRoot`: `DATA`, 32 Byte - la radice del trie delle transazioni del blocco.
- `stateRoot`: `DATA`, 32 Byte - la radice del trie dello stato finale del blocco.
- `receiptsRoot`: `DATA`, 32 Byte - la radice del trie delle ricevute del blocco.
- `miner`: `DATA`, 20 Byte - l'indirizzo del beneficiario a cui sono state date le ricompense del blocco.
- `difficulty`: `QUANTITY` - intero della difficoltà per questo blocco.
- `totalDifficulty`: `QUANTITY` - intero della difficoltà totale della catena fino a questo blocco.
- `extraData`: `DATA` - il campo "dati extra" di questo blocco.
- `size`: `QUANTITY` - intero della dimensione di questo blocco in byte.
- `gasLimit`: `QUANTITY` - il limite del gas massimo consentito in questo blocco.
- `gasUsed`: `QUANTITY` - il gas totale utilizzato da tutte le transazioni in questo blocco.
- `timestamp`: `QUANTITY` - il timestamp unix di quando il blocco è stato collazionato.
- `transactions`: `Array` - Array di oggetti transazione, o hash di transazione di 32 Byte a seconda dell'ultimo parametro fornito.
- `uncles`: `Array` - Array di hash degli uncle.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByHash","params":["0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae", false],"id":1}'
// Risultato
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "difficulty": "0x4ea3f27bc",
    "extraData": "0x476574682f4c5649562f76312e302e302f6c696e75782f676f312e342e32",
    "gasLimit": "0x1388",
    "gasUsed": "0x0",
    "hash": "0xdc0818cf78f21a8e70579cb46a43643f78291264dda342ae31049421c82d21ae",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "miner": "0xbb7b8287f3f0a933474a79eae42cbca977791171",
    "mixHash": "0x4fffe9ae21f1c9e15207b1f472d5bbdd68c9595d461666602f2be20daf5e7843",
    "nonce": "0x689056015818adbe",
    "number": "0x1b4",
    "parentHash": "0xe99e022112df268087ea7eafaf4790497fd21dbeeb6bd7a1721df161a6657a54",
    "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "size": "0x220",
    "stateRoot": "0xddc8b0234c2e0cad087c8b389aa7ef01f7d79b2570bccb77ce48648aa61c904d",
    "timestamp": "0x55ba467c",
    "totalDifficulty": "0x78ed983323d",
    "transactions": [
    ],
    "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
    "uncles": [
    ]
  }
}
```

### eth_getBlockByNumber {#eth_getblockbynumber}

Restituisce informazioni su un blocco tramite numero di blocco.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getBlockByNumber">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `QUANTITY|TAG` - intero di un numero di blocco, o la stringa `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, come nel [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter).
2. `Boolean` - Se `true` restituisce gli oggetti completi della transazione, se `false` solo gli hash delle transazioni.

```js
params: [
  "0x1b4", // 436
  true,
]
```

**Restituisce**
Vedi [eth_getBlockByHash](#eth_getblockbyhash)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["0x1b4", true],"id":1}'
```

Per il risultato vedi [eth_getBlockByHash](#eth_getblockbyhash)

### eth_getTransactionByHash {#eth_gettransactionbyhash}

Restituisce le informazioni su una transazione richiesta tramite hash della transazione.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByHash">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - hash di una transazione

```js
params: ["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"]
```

**Restituisce**

`Object` - Un oggetto transazione, o `null` quando non è stata trovata alcuna transazione:

- `blockHash`: `DATA`, 32 Byte - hash del blocco in cui si trovava questa transazione. `null` quando è in sospeso.
- `blockNumber`: `QUANTITY` - numero del blocco in cui si trovava questa transazione. `null` quando è in sospeso.
- `from`: `DATA`, 20 Byte - indirizzo del mittente.
- `gas`: `QUANTITY` - gas fornito dal mittente.
- `gasPrice`: `QUANTITY` - prezzo del gas fornito dal mittente in Wei.
- `hash`: `DATA`, 32 Byte - hash della transazione.
- `input`: `DATA` - i dati inviati insieme alla transazione.
- `nonce`: `QUANTITY` - il numero di transazioni effettuate dal mittente prima di questa.
- `to`: `DATA`, 20 Byte - indirizzo del destinatario. `null` quando è una transazione di creazione di un contratto.
- `transactionIndex`: `QUANTITY` - intero della posizione dell'indice della transazione nel blocco. `null` quando è in sospeso.
- `value`: `QUANTITY` - valore trasferito in Wei.
- `v`: `QUANTITY` - id di recupero ECDSA
- `r`: `QUANTITY` - firma ECDSA r
- `s`: `QUANTITY` - firma ECDSA s

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByHash","params":["0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b"],"id":1}'
// Risultato
{
  "jsonrpc":"2.0",
  "id":1,
  "result":{
    "blockHash":"0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
    "blockNumber":"0x5daf3b", // 6139707
    "from":"0xa7d9ddbe1f17865597fbd27ec712455208b6b76d",
    "gas":"0xc350", // 50000
    "gasPrice":"0x4a817c800", // 20000000000
    "hash":"0x88df016429689c079f3b2f6ad39fa052532c56795b733da78a91ebe6a713944b",
    "input":"0x68656c6c6f21",
    "nonce":"0x15", // 21
    "to":"0xf02c1c8e6114b1dbe8937a39260b5b0a374432bb",
    "transactionIndex":"0x41", // 65
    "value":"0xf3dbb76162000", // 4290000000000000
    "v":"0x25", // 37
    "r":"0x1b5e176d927f8e9ab405058b2d2457392da3e20f328b16ddabcebc33eaac5fea",
    "s":"0x4ba69724e8f69de52f0125ad8b3c5c2cef33019bac3249e2c0a2192766d1721c"
  }
}
```

### eth_getTransactionByBlockHashAndIndex {#eth_gettransactionbyblockhashandindex}

Restituisce informazioni su una transazione tramite hash del blocco e posizione dell'indice della transazione.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockHashAndIndex">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - hash di un blocco.
2. `QUANTITY` - intero della posizione dell'indice della transazione.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Restituisce**
Vedi [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Per il risultato vedi [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionByBlockNumberAndIndex {#eth_gettransactionbyblocknumberandindex}

Restituisce informazioni su una transazione tramite numero di blocco e posizione dell'indice della transazione.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getTransactionByBlockNumberAndIndex">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `QUANTITY|TAG` - un numero di blocco, o la stringa `"earliest"`, `"latest"`, `"pending"`, `"safe"` o `"finalized"`, come nel [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la posizione dell'indice della transazione.

```js
params: [
  "0x9c47cf", // 10241999
  "0x24", // 36
]
```

**Restituisce**
Vedi [eth_getTransactionByHash](#eth_gettransactionbyhash)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionByBlockNumberAndIndex","params":["0x9c47cf", "0x24"],"id":1}'
```

Per il risultato vedi [eth_getTransactionByHash](#eth_gettransactionbyhash)

### eth_getTransactionReceipt {#eth_gettransactionreceipt}

Restituisce la ricevuta di una transazione tramite hash della transazione.

**Nota** Che la ricevuta non è disponibile per le transazioni in sospeso.

**Parametri**

1. `DATA`, 32 Byte - hash di una transazione

```js
params: ["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"]
```

**Restituisce**
`Object` - Un oggetto ricevuta della transazione, o `null` quando non è stata trovata alcuna ricevuta:

- `transactionHash `: `DATA`, 32 Byte - hash della transazione.
- `transactionIndex`: `QUANTITY` - intero della posizione dell'indice della transazione nel blocco.
- `blockHash`: `DATA`, 32 Byte - hash del blocco in cui si trovava questa transazione.
- `blockNumber`: `QUANTITY` - numero del blocco in cui si trovava questa transazione.
- `from`: `DATA`, 20 Byte - indirizzo del mittente.
- `to`: `DATA`, 20 Byte - indirizzo del destinatario. null quando è una transazione di creazione di un contratto.
- `cumulativeGasUsed` : `QUANTITY ` - La quantità totale di gas utilizzata quando questa transazione è stata eseguita nel blocco.
- `effectiveGasPrice` : `QUANTITY` - La somma della commissione di base e della mancia pagata per unità di gas.
- `gasUsed `: `QUANTITY ` - La quantità di gas utilizzata solo da questa specifica transazione.
- `contractAddress `: `DATA`, 20 Byte - L'indirizzo del contratto creato, se la transazione era una creazione di un contratto, altrimenti `null`.
- `logs`: `Array` - Array di oggetti log, che questa transazione ha generato.
- `logsBloom`: `DATA`, 256 Byte - Filtro Bloom per i client leggeri per recuperare rapidamente i log correlati.
- `type`: `QUANTITY` - intero del tipo di transazione, `0x0` per le transazioni legacy, `0x1` per i tipi di lista di accesso, `0x2` per le commissioni dinamiche.

Restituisce anche _uno dei seguenti_ :

- `root` : `DATA` 32 byte della radice dello stato post-transazione (pre Byzantium)
- `status`: `QUANTITY` o `1` (successo) o `0` (fallimento)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getTransactionReceipt","params":["0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5"],"id":1}'
// Risultato
{
  "jsonrpc": "2.0",
  "id": 1,
  "result": {
    "blockHash":
      "0xa957d47df264a31badc3ae823e10ac1d444b098d9b73d204c40426e57f47e8c3",
    "blockNumber": "0xeff35f",
    "contractAddress": null, // stringa dell'indirizzo se è stato creato
    "cumulativeGasUsed": "0xa12515",
    "effectiveGasPrice": "0x5a9c688d4",
    "from": "0x6221a9c005f6e47eb398fd867784cacfdcfff4e7",
    "gasUsed": "0xb4c8",
    "logs": [{
      // log come restituiti da getFilterLogs, ecc.
    }],
    "logsBloom": "0x00...0", // filtro bloom di 256 byte
    "status": "0x1",
    "to": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    "transactionHash":
      "0x85d995eba9763907fdf35cd2034144dd9d53ce32cbec21349d4b12823c6860c5",
    "transactionIndex": "0x66",
    "type": "0x2"
  }
}
```

### eth_getUncleByBlockHashAndIndex {#eth_getunclebyblockhashandindex}

Restituisce informazioni su un uncle di un blocco tramite hash e posizione dell'indice dell'uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockHashAndIndex">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `DATA`, 32 Byte - L'hash di un blocco.
2. `QUANTITY` - La posizione dell'indice dell'uncle.

```js
params: [
  "0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2",
  "0x0", // 0
]
```

**Restituisce**
Vedi [eth_getBlockByHash](#eth_getblockbyhash)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockHashAndIndex","params":["0x1d59ff54b1eb26b013ce3cb5fc9dab3705b415a67127a003c3e61eb445bb8df2", "0x0"],"id":1}'
```

Per il risultato vedi [eth_getBlockByHash](#eth_getblockbyhash)

**Nota**: Un uncle non contiene transazioni individuali.

### eth_getUncleByBlockNumberAndIndex {#eth_getunclebyblocknumberandindex}

Restituisce informazioni su un uncle di un blocco tramite numero e posizione dell'indice dell'uncle.

<ButtonLink size="sm" variant="outline" href="https://ethereum-json-rpc.com/?method=eth_getUncleByBlockNumberAndIndex">
  Prova l'endpoint nel playground
</ButtonLink>

**Parametri**

1. `QUANTITY|TAG` - un numero di blocco, o la stringa `"earliest"`, `"latest"`, `"pending"`, `"safe"`, `"finalized"`, come nel [parametro del blocco](/developers/docs/apis/json-rpc/#block-parameter).
2. `QUANTITY` - la posizione dell'indice dell'uncle.

```js
params: [
  "0x29c", // 668
  "0x0", // 0
]
```

**Restituisce**
Vedi [eth_getBlockByHash](#eth_getblockbyhash)

**Nota**: Un uncle non contiene transazioni individuali.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getUncleByBlockNumberAndIndex","params":["0x29c", "0x0"],"id":1}'
```

Per il risultato vedi [eth_getBlockByHash](#eth_getblockbyhash)

### eth_newFilter {#eth_newfilter}

Crea un oggetto filtro, basato sulle opzioni del filtro, per notificare quando lo stato cambia (log).
Per verificare se lo stato è cambiato, chiama [eth_getFilterChanges](#eth_getfilterchanges).

**Una nota sulla specifica dei filtri degli argomenti (topic):**
Gli argomenti dipendono dall'ordine. Una transazione con un log con argomenti [A, B] corrisponderà ai seguenti filtri di argomenti:

- `[]` "qualsiasi cosa"
- `[A]` "A in prima posizione (e qualsiasi cosa dopo)"
- `[null, B]` "qualsiasi cosa in prima posizione E B in seconda posizione (e qualsiasi cosa dopo)"
- `[A, B]` "A in prima posizione E B in seconda posizione (e qualsiasi cosa dopo)"
- `[[A, B], [A, B]]` "(A O B) in prima posizione E (A O B) in seconda posizione (e qualsiasi cosa dopo)"
- **Parametri**

1. `Object` - Le opzioni del filtro:

- `fromBlock`: `QUANTITY|TAG` - (opzionale, predefinito: `"latest"`) Numero di blocco intero, o `"latest"` per l'ultimo blocco proposto, `"safe"` per l'ultimo blocco sicuro, `"finalized"` per l'ultimo blocco finalizzato, o `"pending"`, `"earliest"` per le transazioni non ancora in un blocco.
- `toBlock`: `QUANTITY|TAG` - (opzionale, predefinito: `"latest"`) Numero di blocco intero, o `"latest"` per l'ultimo blocco proposto, `"safe"` per l'ultimo blocco sicuro, `"finalized"` per l'ultimo blocco finalizzato, o `"pending"`, `"earliest"` per le transazioni non ancora in un blocco.
- `address`: `DATA|Array`, 20 Byte - (opzionale) Indirizzo del contratto o un elenco di indirizzi da cui dovrebbero originare i log.
- `topics`: `Array di DATA`, - (opzionale) Array di argomenti `DATA` di 32 Byte. Gli argomenti dipendono dall'ordine. Ogni argomento può anche essere un array di DATA con opzioni "o".

```js
params: [
  {
    fromBlock: "0x1",
    toBlock: "0x2",
    address: "0x8888f1f195afa192cfee860698584c030f4c9db1",
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
      null,
      [
        "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
        "0x0000000000000000000000000aff3454fce5edbc8cca8697c15331677e6ebccc",
      ],
    ],
  },
]
```

**Restituisce**
`QUANTITY` - Un id del filtro.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newFilter","params":[{"topics":["0x12341234"]}],"id":73}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": "0x1" // 1
}
```

### eth_newBlockFilter {#eth_newblockfilter}

Crea un filtro nel nodo, per notificare quando arriva un nuovo blocco.
Per verificare se lo stato è cambiato, chiama [eth_getFilterChanges](#eth_getfilterchanges).

**Parametri**
Nessuno

**Restituisce**
`QUANTITY` - Un id del filtro.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newBlockFilter","params":[],"id":73}'
// Risultato
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_newPendingTransactionFilter {#eth_newpendingtransactionfilter}

Crea un filtro nel nodo, per notificare quando arrivano nuove transazioni in sospeso.
Per verificare se lo stato è cambiato, chiama [eth_getFilterChanges](#eth_getfilterchanges).

**Parametri**
Nessuno

**Restituisce**
`QUANTITY` - Un id del filtro.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_newPendingTransactionFilter","params":[],"id":73}'
// Risultato
{
  "id":1,
  "jsonrpc":  "2.0",
  "result": "0x1" // 1
}
```

### eth_uninstallFilter {#eth_uninstallfilter}

Disinstalla un filtro con l'id fornito. Dovrebbe sempre essere chiamato quando l'osservazione non è più necessaria.
Inoltre, i filtri scadono quando non vengono richiesti con [eth_getFilterChanges](#eth_getfilterchanges) per un periodo di tempo.

**Parametri**

1. `QUANTITY` - L'id del filtro.

```js
params: [
  "0xb", // 11
]
```

**Restituisce**
`Boolean` - `true` se il filtro è stato disinstallato con successo, altrimenti `false`.

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_uninstallFilter","params":["0xb"],"id":73}'
// Risultato
{
  "id":1,
  "jsonrpc": "2.0",
  "result": true
}
```

### eth_getFilterChanges {#eth_getfilterchanges}

Metodo di polling per un filtro, che restituisce un array di log che si sono verificati dall'ultimo polling.

**Parametri**

1. `QUANTITY` - l'id del filtro.

```js
params: [
  "0x16", // 22
]
```

**Restituisce**
`Array` - Array di oggetti log, o un array vuoto se nulla è cambiato dall'ultimo polling.

- Per i filtri creati con `eth_newBlockFilter` il ritorno sono hash di blocco (`DATA`, 32 Byte), es., `["0x3454645634534..."]`.
- Per i filtri creati con `eth_newPendingTransactionFilter ` il ritorno sono hash di transazione (`DATA`, 32 Byte), es., `["0x6345343454645..."]`.
- Per i filtri creati con `eth_newFilter` i log sono oggetti con i seguenti parametri:
  - `removed`: `TAG` - `true` quando il log è stato rimosso, a causa di una riorganizzazione della catena. `false` se è un log valido.
  - `logIndex`: `QUANTITY` - intero della posizione dell'indice del log nel blocco. `null` quando è un log in sospeso.
  - `transactionIndex`: `QUANTITY` - intero della posizione dell'indice della transazione da cui è stato creato il log. `null` quando è un log in sospeso.
  - `transactionHash`: `DATA`, 32 Byte - hash delle transazioni da cui è stato creato questo log. `null` quando è un log in sospeso.
  - `blockHash`: `DATA`, 32 Byte - hash del blocco in cui si trovava questo log. `null` quando è in sospeso. `null` quando è un log in sospeso.
  - `blockNumber`: `QUANTITY` - il numero del blocco in cui si trovava questo log. `null` quando è in sospeso. `null` quando è un log in sospeso.
  - `address`: `DATA`, 20 Byte - indirizzo da cui ha avuto origine questo log.
  - `data`: `DATA` - dati di log non indicizzati a lunghezza variabile. (In _solidity_: zero o più argomenti di log non indicizzati di 32 Byte.)
  - `topics`: `Array di DATA` - Array da 0 a 4 `DATA` di 32 Byte di argomenti di log indicizzati. (In _solidity_: Il primo argomento è l'_hash_ della firma dell'evento (es., `Deposit(address,bytes32,uint256)`), a meno che tu non abbia dichiarato l'evento con lo specificatore `anonymous`.)

- **Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterChanges","params":["0x16"],"id":73}'
// Risultato
{
  "id":1,
  "jsonrpc":"2.0",
  "result": [{
    "logIndex": "0x1", // 1
    "blockNumber":"0x1b4", // 436
    "blockHash": "0x8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "transactionHash":  "0xdf829c5a142f1fccd7d8216c5785ac562ff41e2dcfdf5785ac562ff41e2dcf",
    "transactionIndex": "0x0", // 0
    "address": "0x16c5785ac562ff41e2dcfdf829c5a142f1fccd7d",
    "data":"0x0000000000000000000000000000000000000000000000000000000000000000",
    "topics": ["0x59ebeb90bc63057b6515673c3ecf9438e5058bca0f92585014eced636878c9a5"]
    },{
      ...
    }]
}
```

### eth_getFilterLogs {#eth_getfilterlogs}

Restituisce un array di tutti i log che corrispondono al filtro con l'id fornito.

**Parametri**

1. `QUANTITY` - L'id del filtro.

```js
params: [
  "0x16", // 22
]
```

**Restituisce**
Vedi [eth_getFilterChanges](#eth_getfilterchanges)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getFilterLogs","params":["0x16"],"id":74}'
```

Per il risultato vedi [eth_getFilterChanges](#eth_getfilterchanges)

### eth_getLogs {#eth_getlogs}

Restituisce un array di tutti i log che corrispondono a un dato oggetto filtro.

**Parametri**

1. `Object` - Le opzioni del filtro:

- `fromBlock`: `QUANTITY|TAG` - (opzionale, predefinito: `"latest"`) Numero di blocco intero, o `"latest"` per l'ultimo blocco proposto, `"safe"` per l'ultimo blocco sicuro, `"finalized"` per l'ultimo blocco finalizzato, o `"pending"`, `"earliest"` per le transazioni non ancora in un blocco.
- `toBlock`: `QUANTITY|TAG` - (opzionale, predefinito: `"latest"`) Numero di blocco intero, o `"latest"` per l'ultimo blocco proposto, `"safe"` per l'ultimo blocco sicuro, `"finalized"` per l'ultimo blocco finalizzato, o `"pending"`, `"earliest"` per le transazioni non ancora in un blocco.
- `address`: `DATA|Array`, 20 Byte - (opzionale) Indirizzo del contratto o un elenco di indirizzi da cui dovrebbero originare i log.
- `topics`: `Array di DATA`, - (opzionale) Array di argomenti `DATA` di 32 Byte. Gli argomenti dipendono dall'ordine. Ogni argomento può anche essere un array di DATA con opzioni "o".
- `blockHash`: `DATA`, 32 Byte - (opzionale, **futuro**) Con l'aggiunta dell'EIP-234, `blockHash` sarà una nuova opzione di filtro che limita i log restituiti al singolo blocco con l'hash di 32 byte `blockHash`. L'utilizzo di `blockHash` equivale a `fromBlock` = `toBlock` = il numero di blocco con hash `blockHash`. Se `blockHash` è presente nei criteri di filtro, non sono consentiti né `fromBlock` né `toBlock`.

```js
params: [
  {
    topics: [
      "0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    ],
  },
]
```

**Restituisce**
Vedi [eth_getFilterChanges](#eth_getfilterchanges)

**Esempio**

```js
// Richiesta
curl -X POST --data '{"jsonrpc":"2.0","method":"eth_getLogs","params":[{"topics":["0x000000000000000000000000a94f5374fce5edbc8e2a8697c15331677e6ebf0b"]}],"id":74}'
```

Per il risultato vedi [eth_getFilterChanges](#eth_getfilterchanges)

## Esempio di utilizzo {#usage-example}

### Distribuire un contratto usando JSON_RPC {#deploying-contract}

Questa sezione include una dimostrazione di come distribuire un contratto usando solo l'interfaccia RPC. Esistono percorsi alternativi per distribuire contratti in cui questa complessità viene astratta, ad esempio, usando librerie costruite sopra l'interfaccia RPC come [web3.js](https://web3js.readthedocs.io/) e [web3.py](https://github.com/ethereum/web3.py). Queste astrazioni sono generalmente più facili da comprendere e meno soggette a errori, ma è comunque utile capire cosa succede dietro le quinte.

Di seguito è riportato un semplice contratto intelligente chiamato `Multiply7` che verrà distribuito usando l'interfaccia JSON-RPC su un nodo Ethereum. Questo tutorial presuppone che il lettore stia già eseguendo un nodo Geth. Maggiori informazioni su nodi e client sono disponibili [qui](/developers/docs/nodes-and-clients/run-a-node). Si prega di fare riferimento alla documentazione dei singoli [client](/developers/docs/nodes-and-clients/) per vedere come avviare l'HTTP JSON-RPC per i client non Geth. La maggior parte dei client serve per impostazione predefinita su `localhost:8545`.

```javascript
contract Multiply7 {
    event Print(uint);
    function multiply(uint input) returns (uint) {
        Print(input * 7);
        return input * 7;
    }
}
```

La prima cosa da fare è assicurarsi che l'interfaccia HTTP RPC sia abilitata. Ciò significa che forniamo a Geth il flag `--http` all'avvio. In questo esempio usiamo il nodo Geth su una catena di sviluppo privata. Usando questo approccio non abbiamo bisogno di ether sulla rete reale.

```bash
geth --http --dev console 2>>geth.log
```

Questo avvierà l'interfaccia HTTP RPC su `http://localhost:8545`.

Possiamo verificare che l'interfaccia sia in esecuzione recuperando l'indirizzo coinbase (ottenendo il primo indirizzo dall'array degli account) e il saldo usando [curl](https://curl.se). Si prega di notare che i dati in questi esempi differiranno sul proprio nodo locale. Se si desidera provare questi comandi, sostituire i parametri di richiesta nella seconda richiesta curl con il risultato restituito dalla prima.

```bash
curl --data '{"jsonrpc":"2.0","method":"eth_accounts","params":[], "id":1}' -H "Content-Type: application/json" localhost:8545
{"id":1,"jsonrpc":"2.0","result":["0x9b1d35635cc34752ca54713bb99d38614f63c955"]}

curl --data '{"jsonrpc":"2.0","method":"eth_getBalance", "params": ["0x9b1d35635cc34752ca54713bb99d38614f63c955", "latest"], "id":2}' -H "Content-Type: application/json" localhost:8545
{"id":2,"jsonrpc":"2.0","result":"0x1639e49bba16280000"}
```

Poiché i numeri sono codificati in esadecimale, il saldo viene restituito in wei come stringa esadecimale. Se vogliamo avere il saldo in ether come numero, possiamo usare web3 dalla console di Geth.

```javascript
web3.fromWei("0x1639e49bba16280000", "ether")
// "410"
```

Ora che c'è un po' di ether sulla nostra catena di sviluppo privata, possiamo distribuire il contratto. Il primo passo è compilare il contratto Multiply7 in byte code che può essere inviato all'EVM. Per installare solc, il compilatore Solidity, seguire la [documentazione di Solidity](https://docs.soliditylang.org/en/latest/installing-solidity.html). (Potresti voler usare una versione precedente di `solc` per farla corrispondere alla [versione del compilatore usata per il nostro esempio](https://github.com/ethereum/solidity/releases/tag/v0.4.20)).

Il passo successivo è compilare il contratto Multiply7 in byte code che può essere inviato all'EVM.

```bash
echo 'pragma solidity ^0.4.16; contract Multiply7 { event Print(uint); function multiply(uint input) public returns (uint) { Print(input * 7); return input * 7; } }' | solc --bin

======= <stdin>:Multiply7 =======
Binary:
6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029
```

Ora che abbiamo il codice compilato dobbiamo determinare quanto gas costa distribuirlo. L'interfaccia RPC ha un metodo `eth_estimateGas` che ci fornirà una stima.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_estimateGas", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 5}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":5,"result":"0x1c31e"}
```

E infine distribuire il contratto.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0x9b1d35635cc34752ca54713bb99d38614f63c955", "gas": "0x1c31e", "data": "0x6060604052341561000f57600080fd5b60eb8061001d6000396000f300606060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063c6888fa1146044575b600080fd5b3415604e57600080fd5b606260048080359060200190919050506078565b6040518082815260200191505060405180910390f35b60007f24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da600783026040518082815260200191505060405180910390a16007820290509190505600a165627a7a7230582040383f19d9f65246752244189b02f56e8d0980ed44e7a56c0b200458caad20bb0029"}], "id": 6}' -H "Content-Type: application/json" localhost:8545
{"id":6,"jsonrpc":"2.0","result":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"}
```

La transazione viene accettata dal nodo e viene restituito un hash della transazione. Questo hash può essere usato per tracciare la transazione. Il passo successivo è determinare l'indirizzo in cui è distribuito il nostro contratto. Ogni transazione eseguita creerà una ricevuta. Questa ricevuta contiene varie informazioni sulla transazione, come in quale blocco è stata inclusa la transazione e quanto gas è stato usato dall'EVM. Se una transazione crea un contratto, conterrà anche l'indirizzo del contratto. Possiamo recuperare la ricevuta con il metodo RPC `eth_getTransactionReceipt`.

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_getTransactionReceipt", "params": ["0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf"], "id": 7}' -H "Content-Type: application/json" localhost:8545
{"jsonrpc":"2.0","id":7,"result":{"blockHash":"0x77b1a4f6872b9066312de3744f60020cbd8102af68b1f6512a05b7619d527a4f","blockNumber":"0x1","contractAddress":"0x4d03d617d700cf81935d7f797f4e2ae719648262","cumulativeGasUsed":"0x1c31e","from":"0x9b1d35635cc34752ca54713bb99d38614f63c955","gasUsed":"0x1c31e","logs":[],"logsBloom":"0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000","status":"0x1","to":null,"transactionHash":"0xe1f3095770633ab2b18081658bad475439f6a08c902d0915903bafff06e6febf","transactionIndex":"0x0"}}
```

Il nostro contratto è stato creato su `0x4d03d617d700cf81935d7f797f4e2ae719648262`. Un risultato nullo invece di una ricevuta significa che la transazione non è ancora stata inclusa in un blocco. Attendi un momento, controlla se il tuo client di consenso è in esecuzione e riprova.

#### Interagire con i contratti intelligenti {#interacting-with-smart-contract}

In questo esempio invieremo una transazione usando `eth_sendTransaction` al metodo `multiply` del contratto.

`eth_sendTransaction` richiede diversi argomenti, in particolare `from`, `to` e `data`. `From` è l'indirizzo pubblico del nostro account e `to` è l'indirizzo del contratto. L'argomento `data` contiene un payload che definisce quale metodo deve essere chiamato e con quali argomenti. È qui che entra in gioco l'[ABI (interfaccia binaria dell'applicazione)](https://docs.soliditylang.org/en/latest/abi-spec.html). L'ABI è un file JSON che definisce come definire e codificare i dati per l'EVM.

I byte del payload definiscono quale metodo nel contratto viene chiamato. Si tratta dei primi 4 byte dall'hash Keccak sul nome della funzione e sui tipi dei suoi argomenti, codificati in esadecimale. La funzione multiply accetta un uint che è un alias per uint256. Questo ci lascia con:

```javascript
web3.sha3("multiply(uint256)").substring(0, 10)
// "0xc6888fa1"
```

Il passo successivo è codificare gli argomenti. C'è solo un uint256, diciamo, il valore 6. L'ABI ha una sezione che specifica come codificare i tipi uint256.

`int<M>: enc(X)` è la codifica in complemento a due big-endian di X, riempita sul lato di ordine superiore (sinistra) con 0xff per X negativo e con zero byte per X positivo in modo tale che la lunghezza sia un multiplo di 32 byte.

Questo si codifica in `0000000000000000000000000000000000000000000000000000000000000006`.

Combinando il selettore della funzione e l'argomento codificato, i nostri dati saranno `0xc6888fa10000000000000000000000000000000000000000000000000000000000000006`.

Questo può ora essere inviato al nodo:

```bash
curl --data '{"jsonrpc":"2.0","method": "eth_sendTransaction", "params": [{"from": "0xeb85a5557e5bdc18ee1934a89d8bb402398ee26a", "to": "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d", "data": "0xc6888fa10000000000000000000000000000000000000000000000000000000000000006"}], "id": 8}' -H "Content-Type: application/json" localhost:8545
{"id":8,"jsonrpc":"2.0","result":"0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74"}
```

Poiché è stata inviata una transazione, è stato restituito un hash della transazione. Recuperando la ricevuta si ottiene:

```javascript
{
   blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
   blockNumber: 268,
   contractAddress: null,
   cumulativeGasUsed: 22631,
   gasUsed: 22631,
   logs: [{
      address: "0x6ff93b4b46b41c0c3c9baee01c255d3b4675963d",
      blockHash: "0xbf0a347307b8c63dd8c1d3d7cbdc0b463e6e7c9bf0a35be40393588242f01d55",
      blockNumber: 268,
      data: "0x000000000000000000000000000000000000000000000000000000000000002a",
      logIndex: 0,
      topics: ["0x24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"],
      transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
      transactionIndex: 0
  }],
  transactionHash: "0x759cf065cbc22e9d779748dc53763854e5376eea07409e590c990eafc0869d74",
  transactionIndex: 0
}
```

La ricevuta contiene un log. Questo log è stato generato dall'EVM all'esecuzione della transazione e incluso nella ricevuta. La funzione `multiply` mostra che l'evento `Print` è stato sollevato con l'input moltiplicato per 7. Poiché l'argomento per l'evento `Print` era un uint256, possiamo decodificarlo secondo le regole dell'ABI, il che ci lascerà con il decimale atteso 42. A parte i dati, vale la pena notare che i topic possono essere usati per determinare quale evento ha creato il log:

```javascript
web3.sha3("Print(uint256)")
// "24abdb5865df5079dcc5ac590ff6f01d5c16edbc5fab4e195d9febd1114503da"
```

Questa era solo una breve introduzione ad alcune delle attività più comuni, che dimostra l'uso diretto della JSON-RPC.

## Argomenti correlati {#related-topics}

- [Specifica JSON-RPC](http://www.jsonrpc.org/specification)
- [Nodi e client](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API di backend](/developers/docs/apis/backend/)
- [Client di esecuzione](/developers/docs/nodes-and-clients/#execution-clients)