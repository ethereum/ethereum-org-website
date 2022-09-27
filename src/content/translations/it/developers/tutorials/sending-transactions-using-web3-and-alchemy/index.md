---
title: Inviare transazioni usando Web3
description: "Questa è una guida per principianti per inviare transazioni di Ethereum usando web3. Ci sono tre fasi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre."
author: "Elan Halpern"
tags:
  - "transazioni"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: it
published: 2020-11-04
source: Documentazione di Alchemy
sourceUrl: https://docs.alchemy.com/alchemy/introduction/getting-started/sending-txs
---

Questa è una guida per principianti per inviare transazioni di Ethereum usando web3. Ci sono tre fasi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre, sperando di rispondere a tutte le domande che potreste avere! In questo tutorial, useremo [Alchemy](https://www.alchemy.com/) per inviare le nostre transazioni alla catena di Ethereum. Puoi [creare qui un profilo di Alchemy gratuito](https://auth.alchemyapi.io/signup).

**NOTA:** Questa guida riguarda la firma delle transazioni sul _backend_ per la tua app; se desideri integrare la firma delle transazioni sul frontend, dai un'occhiata all'integrazione di [ Web3 con un fornitore del browser](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Le nozioni di base {#the-basics}

Come gran parte degli sviluppatori di blockchain quando iniziano, potresti aver fatto delle ricerche su come inviare una transazione (il che dovrebbe essere abbastanza facile) e potresti essere incappato in una moltitudine di guide, ognuna con indicazioni diverse, che rischiano di lasciare sopraffatti e confusi. Se sei su quella barca, non preoccuparti; ci siamo passati tutti! Quindi, prima d'iniziare, mettiamo in chiaro alcune cose:

### 1\. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per conto tuo. Il motivo di ciò è la sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata e non dovresti mai condividerla con un nodo ospitato (o, se è per questo, con nessuno).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scrivere dovrai usare qualcos'altro per firmare le transazioni prima di inviarle tramite Alchemy (così come per ogni altro [servizio di nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Cos'è un "firmatario"? {#what-is-a-signer}

- I firmatari firmano le transazioni per te usando la tua chiave privata. In questo tutorial useremo [ web3 di Alchemy](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) per firmare la nostra transazione, ma puoi anche usare qualsiasi altra libreria di web3.
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
- Esistono molte librerie web3 per diversi linguaggi. In questo tutorial useremo [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), scritto in JavaScript. Puoi controllare le altre opzioni [qui](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries).

Okay, ora che ci siamo tolti alcune di queste domande, passiamo al tutorial. Sentiti libero di fare domande in qualsiasi momento su [Discord](https://discord.gg/gWuC7zB) di Alchemy!

**NOTA:** Questa guida richiede un profilo di Alchemy, un indirizzo di Ethereum o portafoglio di Metamask, NodeJS e npm installato. Altrimenti, segui questi passaggi:

1.  [Crea un profilo di Alchemy](https://auth.alchemyapi.io/signup)
2.  [Crea un account di MetaMask](https://metamask.io/) (od ottieni un indirizzo di Ethereum)
3.  [Segui questi passaggi per installare NodeJs e NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Fasi per inviare la tua transazione {#steps-to-sending-your-transaction}

### 1\. Crea un'app di Alchemy sulla rete di prova di Rinkeby {#create-an-alchemy-app-on-the-rinkeby-testnet}

Naviga al tuo [Pannello di controllo di Alchemy](https://dashboard.alchemyapi.io/) e crea una nuova app, scegliendo Rinkeby (o un'altra rete di prova) per la tua rete.

### 2\. Richiedi ETH dal faucet di Rinkeby {#request-eth-from-rinkeby-faucet}

Segui le istruzioni sul [faucet di Rinkeby di Alchemy](https://www.rinkebyfaucet.com/) per ricevere Eth. Assicurati di includere il tuo indirizzo di Ethereum di **Rinkeby** (da MetaMask) e non di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3\. Crea la cartella di un nuovo progetto e `cd` al suo interno {#create-a-new-project-direction}

Crea una nuova cartella del progetto dalla riga di comando (terminale per mac) e naviga al suo interno:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installa Alchemy Web3 (o altra libreria di web3) {#install-alchemy-web3}

Esegui il seguente comando nella cartella del tuo progetto per installare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

```
npm install @alch/alchemy-web3
```

### 5\. Installa dotenv {#install-dotenv}

Useremo un file .env per memorizzare in sicurezza la nostra chiave API e la chiave privata.

```
npm install dotenv --save
```

### 6\. Crea il file .env {#create-the-dotenv-file}

Crea un file `.env` nella cartella del tuo progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare l'URL della tua API di Alchemy, naviga alla pagina dei dettagli dell'app che hai appena creato sul tuo pannello di controllo, clicca "Visualizza Chiave" nell'angolo in alto a destra e prendi l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, dai un'occhiata a questa [guida](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning={true}>
Non eseguire il commit di <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> con nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando il controllo di versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

### 7\. Crea il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo protetto i nostri dati sensibili in un file .env, iniziamo a programmare. Per il nostro esempio di transazione d'invio, re-invieremo gli ETH al faucet di Rinkeby.

Crea un file `sendTx.js`, dove configureremo e invieremo la nostra transazione d'esempio e aggiungi a esso le seguenti linee di codice:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: sostituisci questo indirizzo con il tuo indirizzo pubblico

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce inizia a contare da 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // indirizzo del faucet per restituire eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo dei dati facoltativo per inviare il messaggio o eseguire il contratto intelligente
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 L'hash della tua transazione è: ", hash, "\n Controlla la Mempool di Alchemy per visualizzare lo stato della tua transazione!");
    } else {
      console.log("❗Qualcosa è andato storto inviando la tua transazione", error)
    }
   });
}

main();
```

Assicurati di sostituire l'indirizzo alla **riga 6** con il tuo indirizzo pubblico.

Prima di passare all'esecuzione di questo codice, vediamo alcuni di questi componenti.

- `nonce`: La specifica nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ci serve per motivi di sicurezza e per prevenire gli [attacchi di riproduzione](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: L'oggetto transazione ha alcuni aspetti che dobbiamo specificare
  - `to`: Questo è l'indirizzo a cui vogliamo inviare ETH. In questo caso, stiamo re-inviando gli ETH al [faucet di Rinkeby](https://faucet.rinkeby.io/) da cui li abbiamo inizialmente richiesti.
  - `value`: Questo è l'importo che desideriamo inviare, specificato in wei, dove 10^18 wei = 1 ETH
  - `gas`: Ci sono molti modi per determinare la giusta quantità di carburante da includere nella tua transazione. Alchemy ha persino un [webhook dei prezzi del carburante](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) per avvisarti quando il prezzo del carburante scende sotto una certa soglia. Per le transazioni della rete principale, è buona pratica controllare uno stimatore del carburante come [ETH Gas Station](https://ethgasstation.info/) per determinare la giusta quantità di carburante da includere. 21.000 è la quantità minima di carburante che un'operazione su Ethereum userà, quindi per assicurarti che la nostra transazione sarà eseguita, ne mettiamo 30.000.
  - `nonce`: vedi sopra la definizione di nonce. Nonce inizia a contare da zero.
  - [FACOLATIVO] data: serve per inviare informazioni aggiuntive con il tuo trasferimento, o per chiamare uno smart contract, non serve per i trasferimenti di saldo; guarda la nota più avanti.
- `signedTx`: Per firmare il nostro oggetto di transazione, useremo il metodo `signTransaction` con la nostra `PRIVATE_KEY`
- `sendSignedTransaction`: Una volta che abbiamo una transazione firmata, possiamo inviarla per includerla in un blocco successivo usando `sendSignedTransaction`

**Una Nota sui dati** Esistono due tipi principali di transazioni che è possibile inviare su Ethereum.

- Trasferimento del saldo: Invia eth da un indirizzo a un altro. Non serve nessun campo di dati, ma se vuoi inviare ulteriori informazioni insieme alla tua transazione, puoi inserire queste informazioni nel formato HEX in questo campo.
  - Ad esempio, ipotizziamo di voler scrivere l'hash di un documento IPFS nella catena di Ethereum per potergli conferire un indicatore data/ora immutabile. Il nostro campo di dati dovrebbe quindi somigliare ai dati: web3.utils.toHex(‘IPFS hash‘). Ora tutti possono interrogare la catena e vedere quando quel documento è stato aggiunto.
- Transazione relativa a uno smart contract: esegue il codice di qualche smart contract sulla catena. In questo caso, il campo di dati dovrebbe contenere la funzione intelligente che vorresti eseguire, insieme a eventuali parametri.
  - Per un esempio pratico, dai un'occhiata alla Fase 8 in questo [Tutorial Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Esegui il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al terminale o alla riga di comando ed esegui:

```
node sendTx.js
```

### 9\. Visualizza la tua transazione nel Mempool {#see-your-transaction-in-the-mempool}

Apri la [pagina del Mempool](https://dashboard.alchemyapi.io/mempool) nel tuo pannello di controllo di Alchemy e filtra per l'app che hai creato per trovare la tua transazione. Qui possiamo guardare la transizione della nostra transazione dallo stato in sospeso allo stato minato (se andata a buon fine) o allo stato abbandonato (se non riuscita). Assicurati di mantenerlo su "Tutti" così da intercettare le transazioni "minate", "in sospeso" e "abbandonate". Puoi anche cercare la tua transazione tra le transazioni inviate all'indirizzo `0x31b98d14007bdee637298086988a0bbd31184523` .

Per visualizzare i dettagli della tua transazione, una volta trovata, seleziona l'hash tx, che dovrebbe portarti a una vista simile a questa:

![Screenshot del Mempool Watcher](./mempool.png)

Da qui puoi visualizzare la tua transazione su Etherscan, cliccando sull'icona cerchiata in rosso!

**Evviva! Hai appena inviato la tua prima transazione di Ethereum usando Alchemy**

_Per feedback e suggerimenti su questa guida, puio scrivere a Elan su [Discord](https://discord.gg/A39JVCM) di Alchemy!_

_Originariamente pubblicato su [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
