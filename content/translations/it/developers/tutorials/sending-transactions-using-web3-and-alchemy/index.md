---
title: Inviare transazioni usando Web3
description: "Questa è una guida per principianti per inviare transazioni di Ethereum usando Web3. Ci sono tre fasi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre."
author: "Elan Halpern"
tags:
  - "transazioni"
  - "web3.js"
  - "alchemy"
skill: beginner
lang: it
published: 2020-11-04
source: documentazione Alchemy
sourceUrl: https://docs.alchemy.com/alchemy/tutorials/sending-txs
---

Questa è una guida per principianti per inviare transazioni di Ethereum usando Web3. Esistono tre passaggi principali per poter inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Le vedremo tutte e tre, sperando di rispondere a tutte le domande che potreste avere! In questo tutorial, useremo [Alchemy](https://www.alchemy.com/) per inviare le nostre transazioni alla catena di Ethereum. Puoi [creare qui un conto gratuito di Alchemy](https://auth.alchemyapi.io/signup).

**NOTA:** Questa guida è per firmare le tue transazioni sul _backend_ per la tua app. Se desideri integrare la firma delle tue transazioni sul frontend, dai un'occhiata all'integrazione di [Web3 con un fornitore del browser](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Le nozioni di base {#the-basics}

Come gran parte degli sviluppatori di blockchain quando iniziano, potresti aver fatto delle ricerche su come inviare una transazione (il che dovrebbe essere abbastanza facile) e potresti essere incappato in una moltitudine di guide, ognuna con indicazioni diverse, che rischiano di lasciare sopraffatti e confusi. Se sei su quella barca, non preoccuparti; ci siamo passati tutti! Quindi, prima d'iniziare, mettiamo in chiaro alcune cose:

### 1\. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per conto tuo. Il motivo di ciò è la sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata e non dovresti mai condividerla con un nodo ospitato (o, se è per questo, con nessuno).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scrivere dovrai usare qualcos'altro per firmare le transazioni prima di inviarle tramite Alchemy (così come per ogni altro [servizio di nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Cos'è un "firmatario"? {#what-is-a-signer}

- I firmatari firmano le transazioni per te usando la tua chiave privata. In questo tutorial useremo [ web3 di Alchemy](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) per firmare la nostra transazione, ma puoi anche usare qualsiasi altra libreria di web3.
- Sul frontend, un buon esempio di firmatario sarebbe [MetaMask](https://metamask.io/), che firmerà e invierà le transazioni per conto tuo.

### 3\. Perché devo firmare le mie transazioni? {#why-do-i-need-to-sign-my-transactions}

- Ogni utente che desidera inviare una transazione sulla rete di Ethereum deve firmare la transazione (usando la propria chiave privata), per poter convalidare che l'origine della transazione sia quella affermata.
- È davvero importante proteggere questa chiave privata, poiché avere accesso a essa concede il pieno controllo sul tuo conto privato, consentendoti (o a chiunque acceda) di eseguire transazioni per conto tuo.

### 4\. Come proteggo la mia chiave privata? {#how-do-i-protect-my-private-key}

- Ci sono molti modi per proteggere la tua chiave privata e usarla per inviare le transazioni. In questo tutorial useremo un file `.env`. Tuttavia, potresti anche usare un provider separato che memorizzi le chiavi private, usare un file keystore o altre opzioni.

### 5\. Qual è la differenza tra `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` sono entrambe funzioni dell'API di Ethereum che trasmettono una transazione alla rete di Ethereum affinché venga aggiunta a un blocco futuro. Differiscono in come gestiscono la firma delle transazioni.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) è usato per inviare transazioni _non firmate_, il che significa che il nodo a cui stai inviando deve gestire la tua chiave privata in modo che tu possa firmare la transazione prima di trasmetterla alla catena. Poiché Alchemy non detiene le chiavi private dell'utente, non supportiamo questo metodo.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) è usato per trasmettere le transazioni che sono già state firmate. Ciò significa che devi prima usare [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), poi passare il risultato in `eth_sendRawTransaction`.

Usando web3, l'accesso a `eth_sendRawTransaction` ha luogo chiamando la funzione [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Questo è ciò che useremo nel nostro tutorial.

### 6\. Cos'è la libreria di web3? {#what-is-the-web3-library}

- Web3.js è una libreria di wrapper basata sulle chiamate JSON RPC standard, utilizzata abbastanza comunemente nello sviluppo di Ethereum.
- Esistono molte librerie web3 per diversi linguaggi. In questo tutorial useremo [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), scritto in JavaScript. Puoi consultare altre opzioni [qui](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), come [ethers.js](https://docs.ethers.org/v5/).

Okay, ora che ci siamo tolti alcune di queste domande, passiamo al tutorial. Sentiti libero di fare domande in qualsiasi momento su [Discord](https://discord.gg/gWuC7zB) di Alchemy!

### 7\. Come inviare transazioni sicure, ottimizzate a livello di gas e private? {how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ha una suite di API di Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Puoi utilizzarle per inviare delle transazioni reinforzate, simulare le transazioni prima che si verifichino, inviare transazioni private e inviare transazioni ottimizzate a livello di gas
- Inoltre, puoi utilizzare l'[API di Notify](https://docs.alchemy.com/docs/alchemy-notify) per essere avvisato quando la tua transazione è prelevata dal mempool ed è aggiunta alla catena

**NOTA:** Questa guida richiede un conto di Alchemy, un indirizzo di Ethereum o un portafoglio di Metamask, NodeJS e npm installato. Altrimenti, segui questi passaggi:

1.  [Crea un conto gratuito di Alchemy](https://auth.alchemyapi.io/signup)
2.  [Crea un conto di MetaMask](https://metamask.io/) (od ottieni un indirizzo di Ethereum)
3.  [Segui questi passaggi per installare NodeJs e NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Fasi per inviare la tua transazione {#steps-to-sending-your-transaction}

### 1\. Crea un'app di Alchemy sulla rete di prova di Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Accedi al tuo [pannello di controllo di Alchemy](https://dashboard.alchemyapi.io/) e crea una nuova app, scegliendo Sepolia (o qualsiasi altra rete di prova) per la tua rete.

### 2\. Richiedere ETH dal faucet di Sepolia {#request-eth-from-sepolia-faucet}

Segui le istruzioni sul [faucet di Sepolia di Alchemy](https://www.sepoliafaucet.com/) per ricevere gli ETH. Assicurati di includere il tuo indirizzo di Ethereum di **Sepolia** (da MetaMask) e non di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3\. Crea la cartella di un nuovo progetto e `cd` al suo interno {#create-a-new-project-direction}

Crea una nuova cartella del progetto dalla riga di comando (terminale per mac) e naviga al suo interno:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installa Alchemy Web3 (o altra libreria di web3) {#install-alchemy-web3}

Esegui il seguente comando nella cartella del tuo progetto per installare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Nota che per utilizzare la libreria di ethers.js, [devi seguire le istruzioni qui](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Installa dotenv {#install-dotenv}

Useremo un file `.env` per memorizzare in sicurezza la nostra chiave API e la chiave privata.

```
npm install dotenv --save
```

### 6\. Crea il file `.env` {#create-the-dotenv-file}

Crea un file `.env` nella cartella del tuo progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare l'URL della tua API di Alchemy, accedi alla pagina dei dettagli dell'app che hai appena creato sul tuo pannello di controllo, clicca "Visualizza chiave" nell'angolo in alto a destra e individua l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, dai un'occhiata a questa [guida](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<InfoBanner isWarning>
Non eseguire il commit di <code>.env</code>! Sei pregato di assicurarti di non condividere o esporre mai il tuo file <code>.env</code> con nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando il controllo della versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</InfoBanner>

### 7\. Crea il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo protetto i nostri dati sensibili in un file `.env`, iniziamo a programmare. Per il nostro esempio di invio transazione, rinvieremo gli ETH al faucet di Sepolia.

Creare un file `sendTx.js`, dove configureremo e invieremo la nostra transazione d'esempio e aggiungere a esso le seguenti righe di codice:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: replace this address with your own public address

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // nonce starts counting from 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // faucet address to return eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // optional data field to send message or execute smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 The hash of your transaction is: ", hash, "\n Check Alchemy's Mempool to view the status of your transaction!");
    } else {
      console.log("❗Something went wrong while submitting your transaction:", error)
    }
   });
}

main();
```

Assicurati di sostituire l'indirizzo alla **riga 6** con il tuo indirizzo pubblico.

Prima di passare all'esecuzione di questo codice, vediamo alcuni di questi componenti.

- `nonce`: La specifica nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ci serve per motivi di sicurezza e per prevenire gli [attacchi di riproduzione](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: L'oggetto transazione ha alcuni aspetti che dobbiamo specificare
  - `to`: Questo è l'indirizzo a cui vogliamo inviare ETH. In questo caso, stiamo rinviando degli ETH al [faucet di Sepolia](https://sepoliafaucet.com/), da cui li avevamo inizialmente richiesti.
  - `value`: Questo è l'importo che desideriamo inviare, specificato in Wei, dove 10^18 Wei = 1 ETH
  - `gas`: Esistono molti modi per determinare il giusto importo di gas da includere con la tua transazione. Alchemy ha persino un [webhook dei prezzi del gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1), per notificarti quando il prezzo del gas ricade entro una certa soglia. Per le transazioni di Mainnet, è buona pratica controllare uno strumento di stima del gas come [ETH Gas Station](https://ethgasstation.info/) per determinare il giusto importo di gas da includere. 21.000 è l'importo minimo di gas che un'operazione su Ethereum adopererà, quindi, per assicurarci che la nostra transazione sarà eseguita, inseriamo qui 30.000.
  - `nonce`: vedi sopra la definizione di nonce. Nonce inizia a contare da zero.
  - [OPTIONAL] dati: serve per inviare informazioni aggiuntive con il tuo trasferimento, o per chiamare un contratto intelligente, non serve per i trasferimenti di saldo; guarda la nota più avanti.
- `signedTx`: Per firmare il nostro oggetto di transazione, useremo il metodo `signTransaction` con la nostra `PRIVATE_KEY`
- `sendSignedTransaction`: Una volta che abbiamo una transazione firmata, possiamo inviarla per includerla in un blocco successivo usando `sendSignedTransaction`

**Una Nota sui dati** Esistono due tipi principali di transazioni che è possibile inviare su Ethereum.

- Trasferimento del saldo: Invia ETH da un indirizzo a un altro. Non serve nessun campo di dati, ma se vuoi inviare ulteriori informazioni insieme alla tua transazione, puoi inserire queste informazioni nel formato HEX in questo campo.
  - Ad esempio, ipotizziamo di voler scrivere l'hash di un documento IPFS per la catena di Ethereum per dargli una marca oraria immutabile. Il campo dei nostri dati dovrebbe essere così: dati: `web3.utils.toHex(‘IPFS hash‘)`. Ora tutti possono interrogare la catena e vedere quando quel documento è stato aggiunto.
- Transazione del contratto intelligente: esegui il codice di qualche contratto intelligente sulla catena. In questo caso, il campo di dati dovrebbe contenere la funzione intelligente che vorresti eseguire, insieme a eventuali parametri.
  - Per un esempio pratico, dai un'occhiata alla fase 8 in questo [Tutorial Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8\. Esegui il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al terminale o alla riga di comando ed esegui:

```
node sendTx.js
```

### 9\. Visualizza la tua transazione nel Mempool {#see-your-transaction-in-the-mempool}

Apri la [pagina del Mempool](https://dashboard.alchemyapi.io/mempool) nel tuo pannello di controllo di Alchemy e filtra per l'app che hai creato per trovare la tua transazione. Qui possiamo visualizzare la transizione della nostra transazione dallo stato in sospeso allo stato minato (se andata a buon fine) o allo stato abbandonato (se non riuscita). Assicurati di mantenerlo su "Tutti" così da intercettare le transazioni "minate", "in sospeso" e "abbandonate". Puoi anche cercare la tua transazione tra le transazioni inviate all'indirizzo `0x31b98d14007bdee637298086988a0bbd31184523` .

Per visualizzare i dettagli della tua transazione, una volta trovata, seleziona l'hash tx, che dovrebbe portarti a una vista simile a questa:

![Screenshot del Mempool Watcher](./mempool.png)

Da qui puoi visualizzare la tua transazione su Etherscan, cliccando sull'icona cerchiata in rosso!

**Evviva! Hai appena inviato la tua prima transazione di Ethereum usando Alchemy**

_Per feedback e suggerimenti su questa guida, puoi scrivere a Elan su [Discord](https://discord.gg/A39JVCM) di Alchemy!_

_Originariamente pubblicato su [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
