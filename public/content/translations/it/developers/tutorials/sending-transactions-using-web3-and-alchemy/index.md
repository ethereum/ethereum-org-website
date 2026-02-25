---
title: Invio di transazioni con Web3
description: "Questa è una guida per principianti all'invio di transazioni Ethereum tramite Web3. Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Li esamineremo tutti e tre."
author: "Elan Halpern"
tags: [ "transazioni", "web3.js", "alchemy" ]
skill: beginner
lang: it
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Questa è una guida per principianti all'invio di transazioni Ethereum tramite Web3. Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creare, firmare e trasmettere. Li esamineremo tutti e tre, sperando di rispondere a tutte le tue domande! In questa guida, useremo [Alchemy](https://www.alchemy.com/) per inviare le nostre transazioni alla catena di Ethereum. Puoi [creare un account Alchemy gratuito qui](https://auth.alchemyapi.io/signup).

**NOTA:** questa guida riguarda la firma delle tue transazioni sul _backend_ della tua app. Se vuoi integrare la firma delle tue transazioni sul frontend, consulta l'integrazione di [Web3 con un provider del browser](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Le basi {#the-basics}

Come la maggior parte degli sviluppatori blockchain all'inizio, potresti aver fatto qualche ricerca su come inviare una transazione (qualcosa che dovrebbe essere abbastanza semplice) ed esserti imbattuto in una pletora di guide, ognuna con indicazioni diverse, che ti hanno lasciato un po' sopraffatto e confuso. Se ti trovi in questa situazione, non preoccuparti; ci siamo passati tutti a un certo punto! Quindi, prima d'iniziare, mettiamo in chiaro alcune cose:

### 1. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per conto tuo. Il motivo è la sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata e non dovresti mai condividerla con un nodo ospitato (o con chiunque altro, se è per questo).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scrivere dovrai usare qualcos'altro per firmare le transazioni prima di inviarle tramite Alchemy (così come per ogni altro [servizio di nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2. Cos'è un "firmatario"? {#what-is-a-signer}

- I firmatari firmano le transazioni per te usando la tua chiave privata. In questa guida useremo [Alchemy web3](https://docs.alchemyapi.io/alchemy/documentation/alchemy-web3) per firmare la nostra transazione, ma puoi anche usare qualsiasi altra libreria web3.
- Sul frontend, un buon esempio di firmatario è [MetaMask](https://metamask.io/), che firmerà e invierà le transazioni per tuo conto.

### 3. Perché devo firmare le mie transazioni? {#why-do-i-need-to-sign-my-transactions}

- Ogni utente che desidera inviare una transazione sulla rete di Ethereum deve firmare la transazione (usando la propria chiave privata), per poter convalidare che l'origine della transazione sia quella affermata.
- È molto importante proteggere questa chiave privata, poiché avervi accesso garantisce il pieno controllo del tuo account Ethereum, consentendo a te (o a chiunque vi abbia accesso) di eseguire transazioni per tuo conto.

### 4. Come proteggo la mia chiave privata? {#how-do-i-protect-my-private-key}

- Ci sono molti modi per proteggere la tua chiave privata e usarla per inviare le transazioni. In questa guida useremo un file `.env`. Tuttavia, potresti anche usare un provider separato che memorizzi le chiavi private, usare un file keystore o altre opzioni.

### 5. Qual è la differenza tra `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` sono entrambe funzioni dell'API di Ethereum che trasmettono una transazione alla rete di Ethereum affinché venga aggiunta a un blocco futuro. Differiscono nel modo in cui gestiscono la firma delle transazioni.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) è usato per inviare transazioni _non firmate_, il che significa che il nodo a cui stai inviando deve gestire la tua chiave privata in modo da poter firmare la transazione prima di trasmetterla alla catena. Poiché Alchemy non detiene le chiavi private degli utenti, non supporta questo metodo.
- [`eth_sendRawTransaction`](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_sendrawtransaction) è usato per trasmettere transazioni che sono già state firmate. Ciò significa che devi prima usare [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), poi passare il risultato in `eth_sendRawTransaction`.

Quando si usa web3, si accede a `eth_sendRawTransaction` chiamando la funzione [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Questo è ciò che useremo in questa guida.

### 6. Cos'è la libreria web3? {#what-is-the-web3-library}

- Web3.js è una libreria wrapper basata sulle chiamate JSON RPC standard, utilizzata abbastanza comunemente nello sviluppo di Ethereum.
- Esistono molte librerie web3 per diversi linguaggi. In questa guida useremo [Alchemy Web3](https://docs.alchemy.com/reference/api-overview), che è scritto in JavaScript. Puoi consultare altre opzioni [qui](https://docs.alchemyapi.io/guides/getting-started#other-web3-libraries), come [ethers.js](https://docs.ethers.org/v5/).

Ok, ora che abbiamo chiarito alcune di queste domande, passiamo alla guida. Sentiti libero di fare domande in qualsiasi momento nel [discord](https://discord.gg/gWuC7zB) di Alchemy!

### 7. Come inviare transazioni sicure, ottimizzate per il gas e private? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ha una suite di API Transact](https://docs.alchemy.com/reference/transact-api-quickstart). Puoi usarle per inviare transazioni rinforzate, simulare transazioni prima che avvengano, inviare transazioni private e inviare transazioni ottimizzate per il gas.
- Puoi anche usare l'[API Notify](https://docs.alchemy.com/docs/alchemy-notify) per essere avvisato quando la tua transazione viene estratta dalla mempool e aggiunta alla catena.

**NOTA:** questa guida richiede un account Alchemy, un indirizzo Ethereum o un portafoglio MetaMask e l'installazione di NodeJs e npm. In caso contrario, segui questi passaggi:

1. [Crea un account Alchemy gratuito](https://auth.alchemyapi.io/signup)
2. [Crea un account MetaMask](https://metamask.io/) (o ottieni un indirizzo Ethereum)
3. [Segui questi passaggi per installare NodeJs e NPM](https://docs.alchemy.com/alchemy/guides/alchemy-for-macs)

## Passaggi per inviare la tua transazione {#steps-to-sending-your-transaction}

### 1. Creare un'app Alchemy sulla rete di test Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Vai al tuo [Pannello di controllo di Alchemy](https://dashboard.alchemyapi.io/) e crea una nuova app, scegliendo Sepolia (o qualsiasi altra rete di test) come rete.

### 2. Richiedere ETH dal faucet di Sepolia {#request-eth-from-sepolia-faucet}

Segui le istruzioni sul [faucet di Sepolia di Alchemy](https://www.sepoliafaucet.com/) per ricevere ETH. Assicurati di includere il tuo indirizzo Ethereum di **Sepolia** (da MetaMask) e non quello di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3. Creare una nuova directory di progetto ed entrarvi con `cd` {#create-a-new-project-direction}

Crea una nuova directory di progetto dalla riga di comando (terminale per Mac) e naviga al suo interno:

```
mkdir sendtx-example
cd sendtx-example
```

### 4. Installare Alchemy Web3 (o qualsiasi libreria web3) {#install-alchemy-web3}

Esegui il seguente comando nella tua directory di progetto per installare [Alchemy Web3](https://docs.alchemy.com/reference/api-overview):

Nota: se desideri utilizzare la libreria ethers.js, [segui le istruzioni qui](https://docs.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5. Installare dotenv {#install-dotenv}

Useremo un file `.env` per memorizzare in sicurezza la nostra chiave API e la chiave privata.

```
npm install dotenv --save
```

### 6. Creare il file `.env` {#create-the-dotenv-file}

Crea un file `.env` nella tua directory di progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare il tuo URL dell'API di Alchemy, vai alla pagina dei dettagli dell'app che hai appena creato sul tuo pannello di controllo, fai clic su "View Key" in alto a destra e prendi l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, consulta questa [guida](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non eseguire il commit di <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando un sistema di controllo di versione, aggiungi il tuo file <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">.gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7. Creare il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo protetto i nostri dati sensibili in un file .env, iniziamo a programmare. Per il nostro esempio di invio di transazione, invieremo ETH al faucet di Sepolia.

Crea un file `sendTx.js`, dove configureremo e invieremo la nostra transazione d'esempio, e aggiungi le seguenti righe di codice:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' //TODO: sostituisci questo indirizzo con il tuo indirizzo pubblico

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // il nonce parte da 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // indirizzo del faucet per restituire l'ETH
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo dati facoltativo per inviare un messaggio o eseguire uno smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 L'hash della tua transazione è: ", hash, "\n Controlla la Mempool di Alchemy per visualizzare lo stato della tua transazione!");
    } else {
      console.log("❗Si è verificato un errore durante l'invio della transazione:", error)
    }
   });
}

main();
```

Assicurati di sostituire l'indirizzo alla **riga 6** con il tuo indirizzo pubblico.

Ora, prima di passare all'esecuzione di questo codice, parliamo di alcuni dei suoi componenti.

- `nonce`: la specifica del nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ne abbiamo bisogno per motivi di sicurezza e per prevenire i [replay attack](https://docs.alchemyapi.io/resources/blockchain-glossary#account-nonce). Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://docs.alchemyapi.io/documentation/alchemy-api-reference/json-rpc#eth_gettransactioncount).
- `transaction`: l'oggetto della transazione ha alcuni aspetti che dobbiamo specificare
  - `to`: questo è l'indirizzo a cui vogliamo inviare ETH. In questo caso, stiamo rinviando ETH al [faucet di Sepolia](https://sepoliafaucet.com/) da cui li avevamo inizialmente richiesti.
  - `value`: questo è l'importo che desideriamo inviare, specificato in Wei dove 10^18 Wei = 1 ETH
  - `gas`: esistono molti modi per determinare la giusta quantità di gas da includere nella transazione. Alchemy ha anche un [webhook per il prezzo del gas](https://docs.alchemyapi.io/guides/alchemy-notify#address-activity-1) per avvisarti quando il prezzo del gas scende al di sotto di una certa soglia. Per le transazioni sulla Rete Principale, è buona norma controllare uno stimatore di gas come [ETH Gas Station](https://ethgasstation.info/) per determinare la giusta quantità di gas da includere. 21000 è la quantità minima di gas che un'operazione su Ethereum utilizzerà, quindi, per garantire che la nostra transazione venga eseguita, qui inseriamo 30000.
  - `nonce`: vedi sopra la definizione di nonce. Il nonce inizia a contare da zero.
  - [FACOLTATIVO] dati: usato per inviare informazioni aggiuntive con il tuo trasferimento, o per chiamare uno smart contract; non è richiesto per i trasferimenti di saldo, controlla la nota qui sotto.
- `signedTx`: per firmare il nostro oggetto di transazione, useremo il metodo `signTransaction` con la nostra `PRIVATE_KEY`
- `sendSignedTransaction`: una volta che abbiamo una transazione firmata, possiamo inviarla per includerla in un blocco successivo usando `sendSignedTransaction`

**Una nota sui dati**
Ci sono due tipi principali di transazioni che possono essere inviate in Ethereum.

- Trasferimento di saldo: invia ETH da un indirizzo a un altro. Nessun campo dati richiesto; tuttavia, se desideri inviare informazioni aggiuntive insieme alla transazione, puoi includere tali informazioni in formato HEX in questo campo.
  - Ad esempio, supponiamo di voler scrivere l'hash di un documento IPFS sulla catena di Ethereum per dargli una marca temporale immutabile. Il nostro campo dati dovrebbe quindi assomigliare a: `web3.utils.toHex('hash IPFS')`. E ora chiunque può interrogare la catena e vedere quando quel documento è stato aggiunto.
- Transazione di smart contract: esegui del codice di uno smart contract sulla catena. In questo caso, il campo dati dovrebbe contenere la funzione dello smart contract che desideri eseguire, insieme a eventuali parametri.
  - Per un esempio pratico, consulta il Passaggio 8 di questa [Guida Hello World](https://docs.alchemyapi.io/alchemy/tutorials/hello-world-smart-contract#step-8-create-the-transaction).

### 8. Eseguire il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al tuo terminale o alla riga di comando ed esegui:

```
node sendTx.js
```

### 9. Visualizzare la tua transazione nella Mempool {#see-your-transaction-in-the-mempool}

Apri la [pagina della Mempool](https://dashboard.alchemyapi.io/mempool) nel tuo pannello di controllo di Alchemy e filtra per l'app che hai creato per trovare la tua transazione. Qui possiamo osservare la transizione della nostra transazione dallo stato in sospeso allo stato minato (se riuscita) o allo stato scartato in caso di insuccesso. Assicurati di mantenerlo su "All" in modo da catturare le transazioni "mined", "pending" e "dropped". Puoi anche cercare la tua transazione cercando le transazioni inviate all'indirizzo `0x31b98d14007bdee637298086988a0bbd31184523`.

Per visualizzare i dettagli della tua transazione una volta trovata, seleziona l'hash tx, che dovrebbe portarti a una visualizzazione come questa:

![Screenshot del watcher della Mempool](./mempool.png)

Da lì puoi visualizzare la tua transazione su Etherscan facendo clic sull'icona cerchiata in rosso!

**Evviva!** Hai appena inviato la tua prima transazione Ethereum usando Alchemy 🎉\*\*

_Per feedback e suggerimenti su questa guida, invia un messaggio a Elan sul [Discord](https://discord.gg/A39JVCM) di Alchemy!_

_Pubblicato originariamente su [https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy](https://docs.alchemyapi.io/tutorials/sending-transactions-using-web3-and-alchemy)_
