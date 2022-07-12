---
title: Inviare transazioni usando Web3 e Alchemy
description: "Questa è una guida per principianti per inviare transazioni di Ethereum usando web3 e Alchemy. Ci sono tre fasi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre."
author: "Elan Halpern"
tags:
  - "transazioni"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: it
sidebar: true
published: 2020-11-04
source: Documentazione di Alchemy
sourceUrl: https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy
---

Questa è una guida per principianti per inviare transazioni di Ethereum usando web3 e Alchemy. Ci sono tre fasi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre, sperando di rispondere a tutte le domande che potreste avere!

**NOTA:** Questa guida riguarda la firma delle transazioni sul _backend_ per la tua app; se desideri integrare la firma delle transazioni sul frontend, dai un'occhiata all'integrazione di [Alchemy Web3 con un fornitore del browser](https://docs.alchemyapi.io/documentation/alchemy-web3#with-a-browser-provider).

## Le nozioni di base {#the-basics}

Come gran parte degli sviluppatori di blockchain quando iniziano, potresti aver fatto delle ricerche su come inviare una transazione (il che dovrebbe essere abbastanza facile) e potresti essere incappato in una moltitudine di guide, ognuna con indicazioni diverse, che rischiano di lasciare sopraffatti e confusi. Se sei su quella barca, non preoccuparti; ci siamo passati tutti! Quindi, prima d'iniziare, mettiamo in chiaro alcune cose:

### 1\. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per conto tuo. Il motivo di ciò è la sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata e non dovresti mai condividerla con un nodo ospitato (o, se è per questo, con nessuno).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scrivere dovrai usare qualcos'altro per firmare le transazioni prima di inviarle tramite Alchemy.

### 2\. Cos'è un "firmatario"? {#what-is-a-signer}

- I firmatari firmano le transazioni per te usando la tua chiave privata. In questo tutorial useremo web3 di alchemy per firmare la nostra transazione, ma potresti anche usare qualsiasi altra libreria di web3.
- Sul frontend, un buon esempio di un firmatario è [metamask](https://metamask.io/), che firma e invia le transazioni per conto tuo.

### 3\. Perché devo firmare le mie transazioni? {#why-do-i-need-to-sign-my-transactions}

- Ogni utente che desidera inviare una transazione sulla rete di Ethereum deve firmare la transazione (usando la propria chiave privata), per poter convalidare che l'origine della transazione sia quella affermata.
- È super importante proteggere questa chiave privata, poiché avere accesso a essa concede il pieno controllo sul tuo conto privato, consentendoti (o a chiunque acceda) di eseguire transazioni per conto tuo.

### 4\. Come proteggo la mia chiave privata? {#how-do-i-protect-my-private-key}

- Ci sono molti modi per proteggere la tua chiave privata e usarla per inviare le transazioni. In questo tutorial, useremo un file .env. Tuttavia, potresti anche usare un provider separato che memorizzi le chiavi private, usare un file keystore o altre opzioni.

### 5\. Qual è la differenza tra `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` sono entrambe funzioni dell'API di Ethereum che trasmettono una transazione alla rete di Ethereum affinché venga aggiunta a un blocco futuro. Differiscono in come gestiscono la firma delle transazioni.

- [`eth_sendTransaction`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#eth-sendtransaction) è usato per inviare transazioni _non firmate_, il che significa che il nodo a cui stai inviando deve gestire la tua chiave privata in modo che tu possa firmare la transazione prima di trasmetterla alla catena. Poiché Alchemy non detiene le chiavi private dell'utente, non supportiamo questo metodo.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) è usato per trasmettere le transazioni che sono già state firmate. Ciò significa che devi prima usare [`signTransaction(tx, private_key)`](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#signtransaction), poi passare il risultato in `eth_sendRawTransaction`.

Usando web3, l'accesso a `eth_sendRawTransaction` ha luogo chiamando la funzione [web3.eth.sendSignedTransaction](https://web3js.readthedocs.io/en/v1.2.0/web3-eth.html#sendsignedtransaction).

Questo è ciò che useremo nel nostro tutorial.

### 6\. Cos'è la libreria di web3? {#what-is-the-web3-library}

- Web3.js è una libreria di wrapper basata sulle chiamate JSON RPC standard, utilizzata abbastanza comunemente nello sviluppo di Ethereum.
- Esistono molte librerie web3 per diversi linguaggi. In questo tutorial useremo [Alchemy Web3](https://docs.alchemyapi.io/documentation/alchemy-web3), scritto in JavaScript. Puoi controllare le altre opzioni [qui](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries).

Okay, ora che ci siamo tolti alcune di queste domande, passiamo al tutorial. Sentiti libero di fare domande quando vuoi, nel nostro [Discord](https://discord.gg/sqYmQ7fB)!

**NOTA:** Questa guida presume che tu abbia un profilo di Alchemy, un indirizzo di Ethereum o portafoglio di MetaMask, NodeJS e npm installato. Altrimenti, segui questi passaggi:

1.  [Crea un profilo di Alchemy](https://dashboard.alchemyapi.io/signup/)
2.  [Crea un conto di MetaMask ](https://metamask.io/) (od ottieni un indirizzo di Ethereum)
3.  [Segui questi passaggi per installare NodeJs e NPM](https://medium.com/guides/alchemy-for-macs)

## Fasi per inviare la tua transazione {#steps-to-sending-your-transaction}

### 1\. Crea un'app di Alchemy sulla rete di prova di Rinkeby {#create-an-alchemy-app-on-the-rinkeby-testnet}

Naviga al tuo [Pannello di controllo di Alchemy](https://dashboard.alchemyapi.io/) e crea una nuova app, scegliendo Rinkeby (o un'altra rete di prova) per la tua rete.

### 2\. Richiedi ETH dal faucet di Rinkeby {#request-eth-from-rinkeby-faucet}

Segui le istruzioni sul [faucet di Rinkeby](https://faucet.rinkeby.io/) per ricevere Eth. Dovrai condividere sui social media per questo faucet specifico. Assicurati di includere il tuo indirizzo di Ethereum di **Rinkeby** (da MetaMask) e non di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3\. Crea la cartella di un nuovo progetto e `cd` al suo interno {#create-a-new-project-direction}

Crea una nuova cartella del progetto dalla riga di comando (terminale per mac) e naviga al suo interno:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installa Alchemy Web3 (o altra libreria di web3) {#install-alchemy-web3}

Esegui il seguente comando nella cartella del tuo progetto per installare [Alchemy Web3](https://docs.alchemyapi.io/documentation/alchemy-web3):

```
npm install @alch/alchemy-web3
```

### 5\. Installa dotenv {#install-dotenv}

Useremo un file .env per memorizzare in sicurezza la nostra chiave API e la chiave privata.

```
npm install dotenv --save
```

### 6\. Crea il file .env {#create-the-dotenv-file}

Crea un file .env nella cartella del tuo progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare l'URL della tua API di Alchemy, naviga alla pagina dei dettagli dell'app che hai appena creato sul tuo pannello di controllo, clicca "Visualizza Chiave" nell'angolo in alto a destra e prendi l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, dai un'occhiata a questa [guida](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

### 7\. Crea il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo protetto i nostri dati sensibili in un file .env, iniziamo a programmare. Per il nostro esempio di transazione d'invio, re-invieremo gli ETH al faucet di Rinkeby.

Crea un file `sendTx.js`, dove configureremo e invieremo la nostra transazione d'esempio e aggiungi a esso le seguenti linee di codice:

Prima di saltare all'esecuzione di questo codice, vediamo alcuni di questi componenti.

- `nonce`: La specifica nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ci serve per motivi di sicurezza e per prevenire gli [attacchi di riproduzione](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: L'oggetto transazione ha alcuni aspetti che dobbiamo specificare
- `to`: Questo è l'indirizzo a cui vogliamo inviare ETH. In questo caso, stiamo re-inviando gli ETH al [faucet di Rinkeby](https://faucet.rinkeby.io/) da cui li abbiamo inizialmente richiesti.
- `value`: Questo è l'importo che desideriamo inviare, specificato in wei, dove 10^18 wei = 1 ETH
- `gas`: Ci sono molti modi per determinare la giusta quantità di carburante da includere con la tua transazione. Alchemy ha persino un [webhook dei prezzi del carburante](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) per avvisarti quando il prezzo del carburante scende sotto una certa soglia. Per le transazioni della rete principale, è buona pratica controllare uno stimatore del carburante come [ETH Gas Station](https://ethgasstation.info/) per determinare la giusta quantità di carburante da includere. 21.000 è la quantità minima di carburante che un'operazione su Ethereum userà, quindi per assicurarti che la nostra transazione sarà eseguita, ne mettiamo 30.000.
- `nonce`: vedi sopra la definizione di nonce. Nonce inizia a contare da zero.
- `signedTx`: Per firmare il nostro oggetto di transazione, useremo il metodo `signTransaction` con la nostra `PRIVATE_KEY`
- `sendSignedTransaction`: Una volta che abbiamo una transazione firmata, possiamo inviarla per includerla in un blocco successivo usando `sendSignedTransaction`

### 8\. Esegui il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al tuo terminale o riga di comando ed esegui:

```
node sendTx.js
```

### 9\. Visualizza la tua transazione nel Mempool {#see-your-transaction-in-the-mempool}

Apri la [pagina del Mempool](https://dashboard.alchemyapi.io/mempool) nel tuo pannello di controllo di Alchemy e filtra per l'app che hai creato per trovare la tua transazione. Qui possiamo guardare la transizione della nostra transazione dallo stato in sospeso allo stato minato (se andata a buon fine) o allo stato abbandonato (se non riuscita). Assicurati di mantenerlo su "Tutti" così che tu catturi le transazioni "minate", "in sospeso" e "abbandonate". Puoi anche cercare la tua transazione tra le transazioni inviate all'indirizzo `0x31b98d14007bdee637298086988a0bbd31184523` .

Per visualizzare i dettagli della tua transazione, una volta trovata, seleziona l'hash tx, che dovrebbe portarti a una vista simile a questa:

![Istantanea dell'osservatore del Mempool](./mempool.png)

Da qui puoi visualizzare la tua transazione su Etherscan, cliccando sull'icona cerchiata in rosso!

**Evviva! Hai appena inviato la tua prima transazione di Ethereum usando Alchemy 🎉**

_Per feedback e suggerimenti su questa guida, sei pregato di scrivere a Elan sul [Discord](https://discord.gg/A39JVCM) di Alchemy!_

_Originariamente pubblicato su [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
