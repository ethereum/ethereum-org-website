---
title: Come eseguire un nodo leggero con Geth
description: Come scaricare, installare ed eseguire Geth. Verranno trattate le syncmode, la console di JavaScript e altro
author: "Brian Gu"
tags:
  - "client"
  - "geth"
  - "nodi"
skill: intermediate
lang: it
sidebar: true
published: 2020-06-14
---

Se ti interessa eseguire un [nodo Ethereum](/developers/docs/nodes-and-clients/), uno dei modi più facili è scaricare, installare ed eseguire Geth. Con Geth, possiamo ottenere un nodo leggero attivo in pochi minuti.

Innanzi tutto, occorre [installare Geth](https://geth.ethereum.org/docs/install-and-build/installing-geth).

Una volta installato Geth, per eseguire un nodo completo di Ethereum basta digitare

```bash
$ geth
```

nella riga di comando (senza il simbolo del dollaro). Aspetta però! Quando esegui `geth`, Geth:

- Inizializzerà una copia locale di un'EVM vuota
- Avvierà il download di tutti i blocchi nella cronologia di Ethereum, a partire dal blocco 0.
- Eseguirà tutte le transazioni di tutti i blocchi in ordine, aggiornando lo stato dell'EVM con ogni transazione fino a raggiungere lo stato odierno.

Questo processo potrebbe impiegare da ore a giorni, e richiede qualche centinaio di GB di spazio libero. Per ora, eseguiremo semplicemente un nodo leggero su una rete di prova per familiarizzare con l'uso di Geth. A questo scopo, dovremo vedere alcuni strumenti e alcune opzioni importanti da riga di comando.

## Rete principale e di prova {#mainnet-and-testnet}

Di default, Geth esegue un nodo sulla rete principale. Puoi eseguire `geth --ropsten` per eseguire un nodo completo della rete di prova di Ropsten. Puoi eseguire un nodo su Rinkeby scambiando `ropsten` con `rinkeby`.

[Scopri di più sulle diverse reti](/developers/docs/networks/).

## Syncmode {#syncmode}

Geth ha tre `syncmode`.

```bash
$ geth --syncmode "full"
$ geth --syncmode "fast"
$ geth --syncmode "light"
```

`"full"` esegue un nodo completo esattamente previsto: il computer inizializza una copia locale dell'EVM allo stato vuoto originale, scarica ogni blocco dall'inizio della blockchain ed esegue ogni transazione di ogni blocco, aggiornando lo stato dell'EVM finché non raggiunge quello odierno.

`"fast"` scarica tutti i blocchi ma anche un'istantanea recente dello stato dell'EVM da un peer (correntemente lo stato dei 64 blocchi dell'EVM nel passato), eseguendo le transazioni solo nei blocchi più recenti finché raggiunge lo stato corrente dell'EVM. Il vantaggio di `"fast"` è che impiega molto meno tempo per sincronizzarsi sullo stato corrente; tuttavia, si basa su un peer del nodo dell'archivio completo per avere un'istantanea dello stato, quindi non verifica tutto in modo autonomo.

Infine, `"light"` esegue un nodo leggero, come discusso in precedenza.

Per un'utile spiegazione delle differenze tra le tre modalità di sincronizzazione, vedi questa [risposta sullo scambio di stack](https://ethereum.stackexchange.com/questions/11297/what-is-geths-light-sync-and-why-is-it-so-fast).

## Documentazione e altre opzioni della riga di comando {#documentation-and-other-command-line-options}

- [Documentazione completa](https://geth.ethereum.org/docs/)
- [Tutte le opzioni della riga di comando](https://geth.ethereum.org/docs/interface/command-line-options)

## Eseguire un nodo leggero {#running-your-light-node}

Eseguiremo un nodo leggero della rete di prova per capire come gestire un nodo e interagirvi. Per farlo, basta eseguire

```bash
$ geth --ropsten --syncmode "light"
```

Attendi qualche secondo e dovresti ottenere un output simile al seguente:

```bash
$ geth --ropsten --syncmode "light"
INFO [11-18|14:04:47] Massimo conteggio di pari                       ETH=0 LES=100 total=25
INFO [11-18|14:04:47] Avviando il nodo peer-to-peer               instance=Geth/v1.8.11-stable/darwin-amd64/go1.10.3
INFO [11-18|14:04:47] Handle di cache e file allocati         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
INFO [11-18|14:04:47] Trie persistito dal database di memoria      nodes=355 size=51.89kB time=561.839µs gcnodes=0 gcsize=0.00B gctime=0s livenodes=1 livesize=0.00B
INFO [11-18|14:04:47] Inizializzata la configurazione della catena          config="{ChainID: 3 Homestead: 0 DAO: <nil> DAOSupport: true EIP150: 0 EIP155: 10 EIP158: 10 Byzantium: 1700000 Constantinople: <nil> Engine: ethash}"
INFO [11-18|14:04:47] Archiviazione su disco abilitata per le cache di ethash   dir=/Users/bgu/Library/Ethereum/testnet/geth/ethash count=3
INFO [11-18|14:04:47] Archiviazione su disco abilitata per DAG di ethash     dir=/Users/bgu/.ethash                              count=2
INFO [11-18|14:04:47] Aggiunto checkpoint attendibile                 chain=ropsten block=3375103 hash=9017ab…249e89
INFO [11-18|14:04:47] Caricata intestazione locale più recente          number=0 hash=419410…ca4a2d td=1048576
INFO [11-18|14:04:47] Avviando la rete P2P
INFO [11-18|14:04:49] Ascoltatore UDP attivo                          net=enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303
WARN [11-18|14:04:49] La modalità leggera del è una funzionalità sperimentale
INFO [11-18|14:04:49] Ascoltatore RLPx attivo                         self="enode://3ef47be442520e4708b5ff25e6e213c496046f443f8393ff5e7ec55f1cf27c374e2e93e78235bde651a5734a012a40eacfc16deab762ee0f380b95d117ac530c@[::]:30303?discport=0"
INFO [11-18|14:04:49] Endpoint IPC aperto                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
INFO [11-18|14:04:51] Porta di rete mappata                      proto=udp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:04:51] Porta di rete mappata                      proto=tcp extport=30303 intport=30303 interface="UPNP IGDv1-IP1"
INFO [11-18|14:08:55] Sincronizzazione del blocco avviata
INFO [11-18|14:08:58] Importate le intestazioni del nuovo blocco               count=192 elapsed=1.574s number=3375295 hash=62f6b1…95c47f ignored=0
INFO [11-18|14:08:58] Importate le intestazioni del nuovo blocco               count=192 elapsed=127.088ms number=3375487 hash=ae759b…453ac5 ignored=0
INFO [11-18|14:08:59] Importate le intestazioni del nuovo blocco               count=960 elapsed=582.125ms number=3376447 hash=4cab62…445b82 ignored=0
INFO [11-18|14:08:59] Importate le intestazioni del nuovo blocco               count=192 elapsed=169.936ms number=3376639 hash=470614…85ce15 ignored=0
INFO [11-18|14:08:59] Importate le intestazioni del nuovo blocco               count=384 elapsed=245.745ms number=3377023 hash=dad8ee…2862d2 ignored=0
INFO [11-18|14:08:59] Importate le intestazioni del nuovo blocco               count=192 elapsed=128.514ms number=3377215 hash=ebcd84…ea26cb ignored=0
INFO [11-18|14:09:00] Importate le intestazioni del nuovo blocco               count=192 elapsed=125.427ms number=3377407 hash=fca10c…8ed04d ignored=0
INFO [11-18|14:09:00] Importate le intestazioni del nuovo blocco               count=192 elapsed=109.536ms number=3377599 hash=9aa141…f34080 ignored=0
INFO [11-18|14:09:00] Importate le intestazioni del nuovo blocco               count=192 elapsed=109.849ms number=3377791 hash=499f2d…e0c713 ignored=0
```

Nota: potresti non vedere i messaggi "Block synchronisation started" e il seguente "Imported new block headers" per diversi minuti o persino ore. Durante questo periodo, il client sta cercando peer di nodo completo che possano fornire client leggeri. Nell'esempio sopra, dagli indicatori di data/ora possiamo dire che il mio computer ha dovuto attendere circa quattro minuti tra l'avvio della ricerca dei peer e il rilevamento di un peer da cui scaricare i blocchi. Attualmente questo è un problema nella community di Ethereum: come incentiviamo le persone a eseguire nodi completi che forniscano client leggeri?

Una volta avviata la sincronizzazione dei blocchi, ci vorrà qualche minuto prima che il computer recuperi i blocchi più recenti della blockchain. A quel punto, l'output sarà:

```bash
INFO [11-18|16:06:04.025] Imported new block headers               count=2   elapsed=6.253ms   number=4456862 hash=ce0a0b…6ab128
INFO [11-18|16:06:27.819] Imported new block headers               count=2   elapsed=5.982ms   number=4456864 hash=04a054…b4f661
INFO [11-18|16:06:34.080] Imported new block headers               count=2   elapsed=4.774ms   number=4456866 hash=15a43c…efc782
INFO [11-18|16:06:45.464] Imported new block headers               count=2   elapsed=5.213ms   number=4456868 hash=eb02d5…227564
INFO [11-18|16:07:11.630] Imported new block headers               count=2   elapsed=5.835ms   number=4456870 hash=67daa7…66892d
```

I messaggi inizieranno a comparire solo ogni 10-30 secondi, e il valore di `count` sarà nelle singole cifre di ogni messaggio.

## Dove sono memorizzati i dati della blockchain e dell'EVM? {#where-is-the-blockchain-and-evm-data-stored}

La directory che Geth usa per memorizzare i dati grezzi della blockchain dipende dal sistema operativo. Dopo aver eseguito Geth, cerca un messaggio simile a:

```bash
INFO [11-18|14:04:47] Allocated cache and file handles         database=/Users/bgu/Library/Ethereum/testnet/geth/lightchaindata cache=768 handles=128
```

Il percorso dopo `"database="` dovrebbe indicare dove sono memorizzati i dati della blockchain sul computer locale. Se esegui un nodo completo, questa directory conterrà tutti i dati su ogni blocco salvato nella blockchain. Poiché noi eseguiamo un nodo leggero, questa directory contiene solo le intestazioni dei blocchi.

Vale la pena ribadire che, al livello più basso, questo percorso è la posizione in cui si trova la blockchain. I contenuti completi della blockchain e dello stato dell'EVM sono memorizzati in ogni nodo completo nella rete di Ethereum, in directory che somigliano molto a quella presente sul tuo computer.

## Collegare la console JavaScript {#attaching-to-the-javascript-console}

Eseguire un nodo è inutile se non possiamo interagirci. Per esempio, potremmo voler trasmettere richieste di transazione o cercare dati dell'EVM/blockchain (come il saldo di un account). Geth ha una console JavaScript integrata e un'API JavaScript denominata [web3js](https://github.com/ethereum/web3.js/) che si può usare per interagire con il nodo.

Per usare la console JavaScript:

1. Inizia a eseguire un nodo in una finestra di terminale (il nodo leggero o il nodo completo, è indifferente).
2. Cerca un messaggio simile a:

```bash
INFO [11-18|14:04:49] IPC endpoint opened                      url=/Users/bgu/Library/Ethereum/testnet/geth.ipc
```

Questo messaggio dovrebbe essere registrato prima dell'avvio della sincronizzazione.

3. Il messaggio indica il percorso dell'endpoint IPC (comunicazione interprocessuale). Copia il percorso (nell'esempio sopra, `/Users/bgu/Library/Ethereum/testnet/geth.ipc`).
4. Apri una nuova finestra o scheda del terminale ed esegui il comando: `$ geth attach [percorso dell'endpoint IPC]`

Si dovrebbe aprire la console JavaScript. Possiamo ora usare web3js per interagire con il nodo.

[Documentazione completa di web3js](http://web3js.readthedocs.io/)

Ecco alcuni utili oggetti esposti da quest'API. Vi puoi accedere digitandoli nella console di JavaScript.

- `eth.syncing` restituisce un oggetto se il nodo ha avviato ma non completato la sincronizzazione dei blocchi o il valore `false` se ha completato o non ancora avviato la sincronizzazione. Se il nodo si sta ancora sincronizzando, `eth.syncing` indica il numero dell'ultimo blocco di cui sono stati ricevuti i dati, nonché il numero totale di blocchi nella blockchain corrente.
- `net.peerCount` restituisce il numero di peer a cui sei connesso. Se è 0, probabilmente dovrai attendere qualche minuto o iniziare a cercare su Google le soluzioni (potrebbe essere un problema di rete o del firewall o altro).
- `admin.peers` indicherà un elenco di tutti i peer a cui è connesso il tuo nodo. Se è vuoto, il nodo non è connesso ad alcun peer.

Possiamo usare web3js anche per inizializzare account, scrivere e trasmettere richieste di transazione alla rete, cercare saldi e metadati di account e altro. Parleremo di queste operazioni in una sezione successiva; per ora, prova ad eseguire quanto segue per cercare il saldo di uno dei miei account sulla rete di prova Ropsten:

```js
eth.getBalance('0x85d918c2B7F172d033D190152AEc58709Fb6D048')
# restituisce 1059286000000000000 in data 11-18-2018. Il valore è riportato in "Wei".
# Wei è un taglio che equivale a 10^-18 ether.
# Il saldo dell'account in ether è di circa 1,059eth.
```

## Arrestare e riavviare il nodo {#stopping-and-restarting-your-node}

Puoi interrompere il tuo nodo quando vuoi premendo `CTRL+C`. Se vuoi riavviare il nodo, Geth impiegherà qualche secondo o minuto per risincronizzarsi (scaricare le intestazioni dei blocchi e/o i blocchi da dove aveva interrotto quando il nodo era stato messo in pausa). Se una o più delle istruzioni indicate sopra non funzionano, la prima cosa da fare è provare a riavviare il nodo.

```bash
$ geth --ropsten --syncmode "light"
```

Sostituisci "ropsten" con i nomi di altre reti di prova, se necessario, o usa "mainnet".

Se ti interessa eseguire un nodo completo di Ethereum, generalmente è meglio utilizzare un computer dedicato con una buona connettività di rete, anziché un personal computer. Ecco una guida per eseguire un nodo con AWS (è un po' obsoleta e le AMI a cui si fa riferimento non sono più recenti o disponibili, quindi potrebbe essere necessario fare qualche ricerca su Google): [Come eseguire un nodo su AWS](https://medium.com/mercuryprotocol/how-to-run-an-ethereum-node-on-aws-a8774ed3acf6)
