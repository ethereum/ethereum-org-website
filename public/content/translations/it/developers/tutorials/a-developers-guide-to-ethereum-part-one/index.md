---
title: Introduzione a Ethereum per sviluppatori Python, parte 1
description: Un'introduzione allo sviluppo su Ethereum, particolarmente utile per chi conosce il linguaggio di programmazione Python
author: Marc Garreau
lang: it
tags: [ "python", "web3.py" ]
skill: beginner
published: 2020-09-08
source: Snake charmers
sourceUrl: https://snakecharmers.ethereum.org/a-developers-guide-to-ethereum-pt-1/
---

Quindi hai sentito parlare di questo Ethereum e sei pronto ad avventurarti nella tana del coniglio? Questo post tratterà rapidamente alcune nozioni di base sulla blockchain, per poi farti interagire con un nodo Ethereum simulato, leggendo i dati dei blocchi, controllando i saldi dei conti e inviando transazioni. Lungo il percorso, evidenzieremo le differenze tra i modi tradizionali di creare app e questo nuovo paradigma decentralizzato.

## Prerequisiti (non vincolanti) {#soft-prerequisites}

Questo post aspira a essere accessibile a un'ampia gamma di sviluppatori. Saranno coinvolti [strumenti Python](/developers/docs/programming-languages/python/), ma sono solo un veicolo per le idee: non c'è problema se non sei uno sviluppatore Python. Tuttavia, farò solo alcune supposizioni su ciò che già sai, in modo da poter passare rapidamente alle parti specifiche di Ethereum.

Presupposti:

- Sai muoverti in un terminale,
- Hai scritto qualche riga di codice Python,
- Python versione 3.6 o superiore è installata sul tuo computer (l'uso di un [ambiente virtuale](https://realpython.com/effective-python-environment/#virtual-environments) è fortemente incoraggiato), e
- hai usato `pip`, il programma di installazione dei pacchetti di Python.
  Ancora una volta, se uno di questi presupposti non è vero, o se non hai intenzione di riprodurre il codice di questo articolo, probabilmente puoi comunque seguirlo senza problemi.

## Blockchain, in breve {#blockchains-briefly}

Ci sono molti modi per descrivere Ethereum, ma il suo fulcro è una blockchain. Le blockchain sono composte da una serie di blocchi, quindi iniziamo da qui. In termini più semplici, ogni blocco sulla blockchain di Ethereum è solo una serie di metadati e un elenco di transazioni. In formato JSON, ha un aspetto simile a questo:

```json
{
   "number": 1234567,
   "hash": "0xabc123...",
   "parentHash": "0xdef456...",
   ...,
   "transactions": [...]
}
```

Ogni [blocco](/developers/docs/blocks/) ha un riferimento al blocco che lo precede; il `parentHash` è semplicemente l'hash del blocco precedente.

<FeaturedText>Nota: Ethereum fa un uso regolare delle <a href="https://wikipedia.org/wiki/Hash_function">funzioni di hash</a> per produrre valori di dimensione fissa ("hash"). Gli hash svolgono un ruolo importante in Ethereum, ma per ora puoi tranquillamente considerarli come ID univoci.</FeaturedText>

![Un diagramma che raffigura una blockchain, compresi i dati all'interno di ogni blocco](./blockchain-diagram.png)

_Una blockchain è essenzialmente una lista concatenata; ogni blocco ha un riferimento al blocco precedente._

Questa struttura dati non è una novità, ma lo sono le regole (cioè, i protocolli peer-to-peer) che governano la rete. Non c'è un'autorità centrale; la rete di peer deve collaborare per sostenere la rete e competere per decidere quali transazioni includere nel blocco successivo. Quindi, quando vuoi inviare del denaro a un amico, devi trasmettere la transazione alla rete e attendere che venga inclusa in un blocco successivo.

L'unico modo per la blockchain di verificare che il denaro sia stato effettivamente inviato da un utente a un altro è usare una valuta nativa di quella blockchain (cioè creata e governata da essa). In Ethereum, questa valuta è chiamata ether e la blockchain di Ethereum contiene l'unico registro ufficiale dei saldi dei conti.

## Un nuovo paradigma {#a-new-paradigm}

Questo nuovo stack tecnologico decentralizzato ha dato vita a nuovi strumenti per sviluppatori. Tali strumenti esistono in molti linguaggi di programmazione, ma noi li esamineremo attraverso la lente di Python. Per ribadire: anche se Python non è il tuo linguaggio preferito, non dovrebbe essere difficile seguirlo.

Gli sviluppatori Python che vogliono interagire con Ethereum probabilmente useranno [Web3.py](https://web3py.readthedocs.io/). Web3.py è una libreria che semplifica notevolmente il modo in cui ci si connette a un nodo Ethereum, per poi inviare e ricevere dati da esso.

<FeaturedText>Nota: "Nodo Ethereum" e "client Ethereum" sono usati in modo intercambiabile. In entrambi i casi, si riferisce al software che un partecipante esegue nella rete Ethereum. Questo software può leggere i dati dei blocchi, ricevere aggiornamenti quando nuovi blocchi vengono aggiunti alla catena, trasmettere nuove transazioni e altro ancora. Tecnicamente, il client è il software, il nodo è il computer che esegue il software.</FeaturedText>

I [client di Ethereum](/developers/docs/nodes-and-clients/) possono essere configurati per essere raggiungibili tramite [IPC](https://wikipedia.org/wiki/Inter-process_communication), HTTP o Websocket, quindi Web3.py dovrà rispecchiare questa configurazione. Web3.py si riferisce a queste opzioni di connessione come **provider**. Dovrai scegliere uno dei tre provider per collegare l'istanza di Web3.py con il tuo nodo.

![Un diagramma che mostra come web3.py utilizza IPC per collegare la tua applicazione a un nodo Ethereum](./web3py-and-nodes.png)

_Configura il nodo Ethereum e Web3.py per comunicare tramite lo stesso protocollo, ad esempio IPC in questo diagramma._

Una volta che Web3.py è configurato correttamente, puoi iniziare a interagire con la blockchain. Ecco un paio di esempi di utilizzo di Web3.py come anteprima di ciò che sta per arrivare:

```python
# leggere i dati dei blocchi:
w3.eth.get_block('latest')

# inviare una transazione:
w3.eth.send_transaction({'from': ..., 'to': ..., 'value': ...})
```

## Installazione {#installation}

In questa guida, lavoreremo solo all'interno di un interprete Python. Non creeremo directory, file, classi o funzioni.

<FeaturedText>Nota: negli esempi seguenti, i comandi che iniziano con `$` devono essere eseguiti nel terminale. (Non digitare il `$`, indica solo l'inizio della riga.)</FeaturedText>

Per prima cosa, installa [IPython](https://ipython.org/) per avere un ambiente intuitivo da esplorare. IPython offre, tra le altre funzionalità, il completamento automatico tramite tasto Tab, rendendo molto più facile vedere cosa è possibile fare con Web3.py.

```bash
pip install ipython
```

Web3.py è pubblicato con il nome `web3`. Installalo così:

```bash
pip install web3
```

Ancora una cosa: più avanti simuleremo una blockchain, il che richiede un altro paio di dipendenze. Puoi installarle tramite:

```bash
pip install 'web3[tester]'
```

Ora è tutto pronto!

Nota: il pacchetto `web3[tester]` funziona fino a Python 3.10.xx

## Avviare una sandbox {#spin-up-a-sandbox}

Apri un nuovo ambiente Python eseguendo `ipython` nel tuo terminale. È paragonabile all'esecuzione di `python`, ma con più funzionalità.

```bash
ipython
```

Questo stamperà alcune informazioni sulle versioni di Python e IPython che stai eseguendo, dopodiché dovresti vedere un prompt in attesa di input:

```python
In [1]:
```

Ora stai guardando una shell interattiva di Python. In sostanza, è una sandbox in cui sperimentare. Se sei arrivato fin qui, è il momento di importare Web3.py:

```python
In [1]: from web3 import Web3
```

## Introduzione al modulo Web3 {#introducing-the-web3-module}

Oltre a essere un gateway per Ethereum, il modulo [Web3](https://web3py.readthedocs.io/en/stable/overview.html#base-api) offre alcune comode funzioni. Esploriamone un paio.

In un'applicazione Ethereum, avrai comunemente bisogno di convertire le denominazioni di valuta. Il modulo Web3 fornisce un paio di metodi di supporto proprio per questo: [from_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.from_wei) e [to_wei](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.to_wei).

<FeaturedText>
Nota: i computer sono notoriamente scarsi nella gestione della matematica decimale. Per ovviare a questo problema, gli sviluppatori spesso memorizzano gli importi in dollari in centesimi. Ad esempio, un articolo con un prezzo di 5,99 $ può essere memorizzato nel database come 599.

Un modello simile viene utilizzato quando si gestiscono le transazioni in <b>ether</b>. Tuttavia, invece di due cifre decimali, l'ether ne ha 18! La più piccola denominazione di ether si chiama <b>wei</b>, quindi è questo il valore specificato quando si inviano le transazioni.

1 ether = 1000000000000000000 wei

1 wei = 0,000000000000000001 ether

</FeaturedText>

Prova a convertire alcuni valori da e verso wei. Nota che [ci sono nomi per molte delle denominazioni](https://web3py.readthedocs.io/en/stable/troubleshooting.html#how-do-i-convert-currency-denominations) tra ether e wei. Uno dei più noti tra questi è **gwei**, poiché è spesso così che vengono rappresentate le commissioni di transazione.

```python
In [2]: Web3.to_wei(1, 'ether')
Out[2]: 1000000000000000000

In [3]: Web3.from_wei(500000000, 'gwei')
Out[3]: Decimal('0.5')
```

Altri metodi di utilità sul modulo Web3 includono convertitori di formato dati (ad es. [`toHex`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.toHex)), helper di indirizzi (ad es. [`isAddress`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.isAddress)) e funzioni di hash (ad es. [`keccak`](https://web3py.readthedocs.io/en/stable/web3.main.html#web3.Web3.keccak)). Molti di questi saranno trattati più avanti nella serie. Per visualizzare tutti i metodi e le proprietà disponibili, utilizza il completamento automatico di IPython digitando `Web3`. e premendo due volte il tasto tab dopo il punto.

## Interagire con la blockchain {#talk-to-the-chain}

I metodi di convenienza sono ottimi, ma passiamo alla blockchain. Il passo successivo è configurare Web3.py per comunicare con un nodo Ethereum. Qui abbiamo la possibilità di utilizzare i provider IPC, HTTP o Websocket.

Non seguiremo questa strada, ma un esempio di un flusso di lavoro completo che utilizza il provider HTTP potrebbe assomigliare a questo:

- Scarica un nodo Ethereum, ad esempio, [Geth](https://geth.ethereum.org/).
- Avvia Geth in una finestra del terminale e attendi che si sincronizzi con la rete. La porta HTTP predefinita è `8545`, ma è configurabile.
- Indica a Web3.py di connettersi al nodo tramite HTTP, su `localhost:8545`.
  `w3 = Web3(Web3.HTTPProvider('http://127.0.0.1:8545'))`
- Usa l'istanza `w3` per interagire con il nodo.

Anche se questo è un modo "reale" per farlo, il processo di sincronizzazione richiede ore ed è superfluo se si desidera solo un ambiente di sviluppo. Web3.py espone un quarto provider per questo scopo, l'**EthereumTesterProvider**. Questo provider di test si collega a un nodo Ethereum simulato con permessi ridotti e valuta fittizia con cui giocare.

![Un diagramma che mostra EthereumTesterProvider che collega la tua applicazione web3.py a un nodo Ethereum simulato](./ethereumtesterprovider.png)

_EthereumTesterProvider si connette a un nodo simulato ed è utile per ambienti di sviluppo rapidi._

Quel nodo simulato si chiama [eth-tester](https://github.com/ethereum/eth-tester) e lo abbiamo installato come parte del comando `pip install web3[tester]`. Configurare Web3.py per utilizzare questo provider di test è semplice:

```python
In [4]: w3 = Web3(Web3.EthereumTesterProvider())
```

Ora sei pronto a navigare sulla catena! Non è una cosa che si dice. L'ho appena inventato. Facciamo un rapido tour.

## Il tour rapido {#the-quick-tour}

Innanzitutto, un controllo di integrità:

```python
In [5]: w3.is_connected()
Out[5]: True
```

Dato che stiamo usando il provider di test, questo non è un test molto utile, ma se fallisce, è probabile che tu abbia digitato qualcosa di sbagliato durante l'istanziazione della variabile `w3`. Verifica di aver incluso le parentesi interne, ovvero `Web3.EthereumTesterProvider()`.

## Fermata del tour n. 1: [account](/developers/docs/accounts/) {#tour-stop-1-accounts}

Per comodità, il provider di test ha creato alcuni account e li ha precaricati con ether di prova.

Per prima cosa, vediamo un elenco di quegli account:

```python
In [6]: w3.eth.accounts
Out[6]: ['0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
 '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
 '0x6813Eb9362372EEF6200f3b1dbC3f819671cBA69', ...]
```

Se esegui questo comando, dovresti vedere un elenco di dieci stringhe che iniziano con `0x`. Ciascuno è un **indirizzo pubblico** ed è, per certi versi, analogo al numero di un conto corrente. Forniresti questo indirizzo a qualcuno che volesse inviarti ether.

Come accennato, il provider di test ha precaricato ciascuno di questi account con alcuni ether di prova. Scopriamo quanto c'è nel primo account:

```python
In [7]: w3.eth.get_balance(w3.eth.accounts[0])
Out[7]: 1000000000000000000000000
```

Sono un sacco di zeri! Prima di andare a ridere fino alla banca finta, ricorda la lezione sulle denominazioni di valuta di prima. I valori di ether sono rappresentati nella denominazione più piccola, wei. Convertilo in ether:

```python
In [8]: w3.from_wei(1000000000000000000000000, 'ether')
Out[8]: Decimal('1000000')
```

Un milione di ether di prova: non è affatto male.

## Fermata del tour n. 2: dati del blocco {#tour-stop-2-block-data}

Diamo un'occhiata allo stato di questa blockchain simulata:

```python
In [9]: w3.eth.get_block('latest')
Out[9]: AttributeDict({
   'number': 0,
   'hash': HexBytes('0x9469878...'),
   'parentHash': HexBytes('0x0000000...'),
   ...
   'transactions': []
})
```

Vengono restituite molte informazioni su un blocco, ma ci sono solo un paio di cose da sottolineare qui:

- Il numero del blocco è zero, non importa quanto tempo fa hai configurato il provider di test. A differenza della vera rete Ethereum, che aggiunge un nuovo blocco ogni 12 secondi, questa simulazione attenderà che tu le dia del lavoro da fare.
- `transactions` è un elenco vuoto, per lo stesso motivo: non abbiamo ancora fatto nulla. Questo primo blocco è un **blocco vuoto**, solo per dare il via alla catena.
- Nota che il `parentHash` è solo un mucchio di byte vuoti. Questo significa che è il primo blocco della catena, noto anche come **blocco genesi**.

## Fermata del tour n. 3: [transazioni](/developers/docs/transactions/) {#tour-stop-3-transactions}

Siamo bloccati al blocco zero finché non c'è una transazione in sospeso, quindi creiamone una. Invia alcuni ether di prova da un account a un altro:

```python
In [10]: tx_hash = w3.eth.send_transaction({
   'from': w3.eth.accounts[0],
   'to': w3.eth.accounts[1],
   'value': w3.to_wei(3, 'ether'),
   'gas': 21000
})
```

Questo è in genere il punto in cui aspetteresti diversi secondi affinché la tua transazione venga inclusa in un nuovo blocco. Il processo completo è più o meno questo:

1. Invia una transazione e conserva l'hash della transazione. Finché il blocco contenente la transazione non viene creato e trasmesso, la transazione è "in sospeso".
   `tx_hash = w3.eth.send_transaction({ … })`
2. Attendi che la transazione venga inclusa in un blocco:
   `w3.eth.wait_for_transaction_receipt(tx_hash)`
3. Continua la logica dell'applicazione. Per visualizzare la transazione andata a buon fine:
   `w3.eth.get_transaction(tx_hash)`

Il nostro ambiente simulato aggiungerà la transazione in un nuovo blocco istantaneamente, quindi possiamo visualizzare immediatamente la transazione:

```python
In [11]: w3.eth.get_transaction(tx_hash)
Out[11]: AttributeDict({
   'hash': HexBytes('0x15e9fb95dc39...'),
   'blockNumber': 1,
   'transactionIndex': 0,
   'from': '0x7E5F4552091A69125d5DfCb7b8C2659029395Bdf',
   'to': '0x2B5AD5c4795c026514f8317c7a215E218DcCD6cF',
   'value': 3000000000000000000,
   ...
})
```

Qui vedrai alcuni dettagli familiari: i campi `from`, `to` e `value` dovrebbero corrispondere agli input della nostra chiamata `send_transaction`. L'altro dato rassicurante è che questa transazione è stata inclusa come prima transazione (`'transactionIndex': 0`) nel blocco numero 1.

Possiamo anche verificare facilmente il successo di questa transazione controllando i saldi dei due account coinvolti. Tre ether dovrebbero essere passati da uno all'altro.

```python
In [12]: w3.eth.get_balance(w3.eth.accounts[0])
Out[12]: 999996999979000000000000

In [13]: w3.eth.get_balance(w3.eth.accounts[1])
Out[13]: 1000003000000000000000000
```

Quest'ultimo sembra a posto! Il saldo è passato da 1.000.000 a 1.000.003 ether. Ma cosa è successo al primo account? Sembra che abbia perso poco più di tre ether. Ahimè, nulla nella vita è gratis, e l'uso della rete pubblica di Ethereum richiede che tu compensi i tuoi pari per il loro ruolo di supporto. Una piccola commissione di transazione è stata detratta dall'account che ha inviato la transazione: questa commissione è l'importo di gas bruciato (21000 unità di gas per un trasferimento di ETH) moltiplicato per una commissione di base che varia a seconda dell'attività della rete più una mancia che va al validatore che include la transazione in un blocco.

Maggiori informazioni sul [gas](/developers/docs/gas/#post-london)

<FeaturedText>Nota: sulla rete pubblica, le commissioni di transazione sono variabili in base alla domanda della rete e alla velocità con cui si desidera che una transazione venga elaborata. Se sei interessato a un'analisi dettagliata di come vengono calcolate le commissioni, consulta il mio post precedente su <a href="https://medium.com/ethereum-grid/ethereum-101-how-are-transactions-included-in-a-block-9ae5f491853f">come le transazioni vengono incluse in un blocco</a>.</FeaturedText>

## E ora, un respiro di sollievo {#and-breathe}

Siamo su questo argomento da un po', quindi questo sembra un buon punto per fare una pausa. La tana del coniglio continua, e continueremo a esplorare nella seconda parte di questa serie. Alcuni concetti a venire: connessione a un nodo reale, contratti intelligenti e token. Hai altre domande? Fammelo sapere! Il tuo feedback influenzerà la direzione che prenderemo da qui. Le richieste sono benvenute tramite [Twitter](https://twitter.com/wolovim).
