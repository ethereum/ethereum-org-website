---
title: Inviare transazioni usando il Web3
description: "Questa è una guida per principianti su come inviare transazioni Ethereum usando il Web3. Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creazione, firma e trasmissione. Li esamineremo tutti e tre."
author: "Elan Halpern"
tags: ["transazioni", "web3.js", "Alchemy"]
skill: beginner
breadcrumb: Inviare transazioni
lang: it
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Questa è una guida per principianti su come inviare transazioni Ethereum usando il Web3. Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creazione, firma e trasmissione. Li esamineremo tutti e tre, sperando di rispondere a qualsiasi domanda tu possa avere! In questo tutorial, useremo [Alchemy](https://www.alchemy.com/) per inviare le nostre transazioni alla catena di Ethereum. Puoi [creare un account Alchemy gratuito qui](https://auth.alchemy.com/signup).

**NOTA:** Questa guida riguarda la firma delle tue transazioni sul _backend_ per la tua app. Se vuoi integrare la firma delle tue transazioni sul frontend, dai un'occhiata all'integrazione del [Web3 con un provider del browser](https://docs.alchemy.com/reference/api-overview#with-a-browser-provider).

## Le basi {#the-basics}

Come la maggior parte degli sviluppatori blockchain agli inizi, potresti aver fatto delle ricerche su come inviare una transazione (qualcosa che dovrebbe essere piuttosto semplice) e ti sei imbattuto in una pletora di guide, ognuna delle quali dice cose diverse lasciandoti un po' sopraffatto e confuso. Se ti trovi in questa situazione, non preoccuparti; ci siamo passati tutti a un certo punto! Quindi, prima di iniziare, chiariamo alcune cose:

### 1\. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per tuo conto. Il motivo è legato alla sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata, e non dovresti mai condividere la tua chiave privata con un nodo ospitato (o con chiunque altro, se è per questo).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scriverci dovrai usare qualcos'altro per firmare le tue transazioni prima di inviarle tramite Alchemy (questo vale per qualsiasi altro [servizio di nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Cos'è un "signer"? {#what-is-a-signer}

- I signer ("firmatari") firmeranno le transazioni per tuo conto usando la tua chiave privata. In questo tutorial useremo [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) per firmare la nostra transazione, ma potresti anche usare qualsiasi altra libreria Web3.
- Sul frontend, un buon esempio di signer è [MetaMask](https://metamask.io/), che firmerà e invierà le transazioni per tuo conto.
### 3\. Perché devo firmare le mie transazioni? {#why-do-i-need-to-sign-my-transactions}

- Ogni utente che vuole inviare una transazione sulla rete Ethereum deve firmare la transazione (usando la propria chiave privata), al fine di convalidare che l'origine della transazione sia chi afferma di essere.
- È importantissimo proteggere questa chiave privata, poiché avervi accesso garantisce il pieno controllo sul tuo account Ethereum, consentendo a te (o a chiunque vi abbia accesso) di eseguire transazioni per tuo conto.

### 4\. Come proteggo la mia chiave privata? {#how-do-i-protect-my-private-key}

- Ci sono molti modi per proteggere la tua chiave privata e usarla per inviare transazioni. In questo tutorial useremo un file `.env`. Tuttavia, potresti anche usare un provider separato che memorizza le chiavi private, usare un file keystore o altre opzioni.

### 5\. Qual è la differenza tra `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` sono entrambe funzioni dell'API di Ethereum che trasmettono una transazione alla rete Ethereum in modo che venga aggiunta a un blocco futuro. Differiscono nel modo in cui gestiscono la firma delle transazioni.

- [`eth_sendTransaction`](https://docs.web3js.org/api/web3-eth/function/sendTransaction) è usato per inviare transazioni _non firmate_, il che significa che il nodo a cui stai inviando deve gestire la tua chiave privata in modo da poter firmare la transazione prima di trasmetterla alla catena. Poiché Alchemy non detiene le chiavi private degli utenti, non supporta questo metodo.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) è usato per trasmettere transazioni che sono già state firmate. Questo significa che devi prima usare [`signTransaction(tx, private_key)`](https://docs.web3js.org/api/web3-eth-accounts/function/signTransaction), quindi passare il risultato in `eth_sendRawTransaction`.

Quando si usa il Web3, si accede a `eth_sendRawTransaction` chiamando la funzione [web3.eth.sendSignedTransaction](https://docs.web3js.org/api/web3-eth/function/sendSignedTransaction).

Questo è ciò che useremo in questo tutorial.

### 6\. Cos'è la libreria Web3? {#what-is-the-web3-library}

- Web3.js è una libreria wrapper attorno alle chiamate JSON-RPC standard che è piuttosto comune usare nello sviluppo su Ethereum.
- Ci sono molte librerie Web3 per diversi linguaggi. In questo tutorial useremo [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) che è scritta in JavaScript. Puoi dare un'occhiata ad altre opzioni [qui](/developers/docs/apis/javascript/) come [Ethers.js](https://docs.ethers.org/v5/).

Ok, ora che abbiamo chiarito alcune di queste domande, passiamo al tutorial. Sentiti libero di fare domande in qualsiasi momento nel [Discord](https://discord.gg/gWuC7zB) di Alchemy!

### 7\. Come inviare transazioni sicure, ottimizzate per il gas e private? {#how-to-send-secure-gas-optimized-and-private-transactions}

- [Alchemy ha una serie di risorse per le transazioni](https://www.alchemy.com/docs/sending-transactions). Puoi usarle per inviare transazioni, simulare transazioni prima che avvengano, inviare transazioni private e inviare transazioni ottimizzate per il gas.
- Puoi anche usare i [webhook di Alchemy](https://www.alchemy.com/docs/reference/webhooks-overview) per ricevere un avviso quando la tua transazione viene prelevata dalla mempool e aggiunta alla catena.

**NOTA:** Questa guida richiede un account Alchemy, un indirizzo Ethereum o un portafoglio MetaMask, Node.js e npm installati. In caso contrario, segui questi passaggi:

1.  [Crea un account Alchemy gratuito](https://auth.alchemy.com/signup)
2.  [Crea un account MetaMask](https://metamask.io/) (o ottieni un indirizzo Ethereum)
3.  [Installa Node.js e npm](https://nodejs.org/en/download/)
## Passaggi per inviare la tua transazione {#steps-to-sending-your-transaction}

### 1\. Crea un'app Alchemy sulla testnet Sepolia {#create-an-alchemy-app-on-the-sepolia-testnet}

Vai alla tua [Dashboard di Alchemy](https://dashboard.alchemy.com/) e crea una nuova app, scegliendo Sepolia (o qualsiasi altra testnet) per la tua rete.

### 2\. Richiedi ETH dal faucet di Sepolia {#request-eth-from-sepolia-faucet}

Segui le istruzioni sul [faucet di Sepolia di Alchemy](https://www.sepoliafaucet.com/) per ricevere ETH. Assicurati di includere il tuo indirizzo Ethereum di **Sepolia** (da MetaMask) e non di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3\. Crea una nuova directory di progetto ed entraci con `cd` {#create-a-new-project-direction}

Crea una nuova directory di progetto dalla riga di comando (terminale per Mac) e naviga al suo interno:

```
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installa Alchemy Web3 (o qualsiasi libreria Web3) {#install-alchemy-web3}

Esegui il seguente comando nella tua directory di progetto per installare [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3):

Nota: se desideri usare la libreria Ethers.js, [segui le istruzioni qui](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```
npm install @alch/alchemy-web3
```

### 5\. Installa dotenv {#install-dotenv}

Useremo un file `.env` per memorizzare in modo sicuro la nostra chiave API e la chiave privata.

```
npm install dotenv --save
```

### 6\. Crea il file `.env` {#create-the-dotenv-file}

Crea un file `.env` nella tua directory di progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare l'URL della tua API di Alchemy, vai alla pagina dei dettagli dell'app che hai appena creato sulla tua dashboard, clicca su "View Key" nell'angolo in alto a destra e prendi l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, dai un'occhiata a questa [guida](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).

```
API_URL = "your-api-url"
PRIVATE_KEY = "your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non committare <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando il controllo di versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crea il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo protetto i nostri dati sensibili in un file `.env`, iniziamo a programmare. Per il nostro esempio di invio di una transazione, restituiremo ETH al faucet di Sepolia.

Crea un file `sendTx.js`, dove configureremo e invieremo la nostra transazione di esempio, e aggiungi le seguenti righe di codice:

```
async function main() {
    require('dotenv').config();
    const { API_URL, PRIVATE_KEY } = process.env;
    const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
    const web3 = createAlchemyWeb3(API_URL);
    const myAddress = '0x610Ae88399fc1687FA7530Aac28eC2539c7d6d63' // DA FARE: sostituisci questo indirizzo con il tuo indirizzo pubblico

    const nonce = await web3.eth.getTransactionCount(myAddress, 'latest'); // il conteggio del nonce inizia da 0

    const transaction = {
     'to': '0x31B98D14007bDEe637298086988A0bBd31184523', // indirizzo del faucet per restituire gli eth
     'value': 1000000000000000000, // 1 ETH
     'gas': 30000,
     'nonce': nonce,
     // campo data facoltativo per inviare un messaggio o eseguire uno smart contract
    };

    const signedTx = await web3.eth.accounts.signTransaction(transaction, PRIVATE_KEY);

    web3.eth.sendSignedTransaction(signedTx.rawTransaction, function(error, hash) {
    if (!error) {
      console.log("🎉 L'hash della tua transazione è: ", hash, "\n Controlla la Mempool di Alchemy per vedere lo stato della tua transazione!");
    } else {
      console.log("❗Qualcosa è andato storto durante l'invio della transazione:", error)
    }
   });
}

main();
```

Assicurati di sostituire l'indirizzo alla **riga 6** con il tuo indirizzo pubblico.

Ora, prima di passare all'esecuzione di questo codice, parliamo di alcuni dei componenti qui presenti.

- `nonce`: la specifica del nonce viene utilizzata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ne abbiamo bisogno per motivi di sicurezza e per prevenire attacchi di replay. Per ottenere il numero di transazioni inviate dal tuo indirizzo, usiamo [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count).
- `transaction`: l'oggetto della transazione ha alcuni aspetti che dobbiamo specificare.
  - `to`: questo è l'indirizzo a cui vogliamo inviare gli ETH. In questo caso, stiamo restituendo gli ETH al [faucet di Sepolia](https://sepoliafaucet.com/) a cui li abbiamo inizialmente richiesti.
  - `value`: questo è l'importo che desideriamo inviare, specificato in Wei, dove 10^18 Wei = 1 ETH.
  - `gas`: ci sono molti modi per determinare la giusta quantità di gas da includere nella tua transazione. Alchemy supporta i [webhook](https://www.alchemy.com/docs/reference/webhooks-overview) che possono avvisarti sulle attività onchain. Per le transazioni sulla Mainnet, è buona norma controllare le condizioni attuali del gas per determinare la giusta quantità di gas da includere. 21000 è la quantità minima di gas che un'operazione su Ethereum utilizzerà, quindi per assicurarci che la nostra transazione venga eseguita inseriamo qui 30000.
  - `nonce`: vedi la definizione di nonce sopra. Il conteggio del nonce inizia da zero.
  - data [FACOLTATIVO]: utilizzato per inviare informazioni aggiuntive con il tuo trasferimento o per chiamare uno smart contract, non è richiesto per i trasferimenti di saldo, dai un'occhiata alla nota di seguito.
- `signedTx`: per firmare il nostro oggetto transazione useremo il metodo `signTransaction` con la nostra `PRIVATE_KEY`.
- `sendSignedTransaction`: una volta che abbiamo una transazione firmata, possiamo inviarla affinché venga inclusa in un blocco successivo utilizzando `sendSignedTransaction`.

**Una nota su data**
Ci sono due tipi principali di transazioni che possono essere inviate su Ethereum.

- Trasferimento di saldo: invia ETH da un indirizzo a un altro. Non è richiesto alcun campo `data`, tuttavia, se desideri inviare informazioni aggiuntive insieme alla tua transazione, puoi includere tali informazioni in formato esadecimale in questo campo.
  - Ad esempio, supponiamo di voler scrivere l'hash di un documento IPFS sulla catena di Ethereum per dargli una marca temporale immutabile. Il nostro campo `data` dovrebbe quindi apparire come `data: web3.utils.toHex(‘hash IPFS‘)`. E ora chiunque può interrogare la catena e vedere quando quel documento è stato aggiunto.
- Transazione di smart contract: esegue del codice di smart contract sulla catena. In questo caso, il campo `data` dovrebbe contenere la funzione dello smart contract che desideri eseguire, insieme a eventuali parametri.
  - Per un esempio pratico, dai un'occhiata al [tutorial per lo smart contract Hello World](/developers/tutorials/hello-world-smart-contract/).
### 8\. Esegui il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al tuo terminale o riga di comando ed esegui:

```
node sendTx.js
```

### 9\. Vedi la tua transazione nella mempool {#see-your-transaction-in-the-mempool}

Apri la [pagina Mempool](https://dashboard.alchemy.com/mempool) nella tua dashboard di Alchemy e filtra in base all'app che hai creato per trovare la tua transazione. È qui che possiamo osservare il passaggio della nostra transazione dallo stato in sospeso (pending) allo stato minato (mined) (se ha esito positivo) o allo stato abbandonato (dropped) se non ha esito positivo. Assicurati di mantenerlo su "All" (Tutte) in modo da catturare le transazioni "mined", "pending" e "dropped". Puoi anche cercare la tua transazione cercando le transazioni inviate all'indirizzo `0x31b98d14007bdee637298086988a0bbd31184523`.

Per visualizzare i dettagli della tua transazione una volta trovata, seleziona l'hash della transazione; questo dovrebbe portarti a una visualizzazione simile a questa:

![Screenshot del visualizzatore della mempool](./mempool.png)

Da lì puoi visualizzare la tua transazione su Etherscan cliccando sull'icona cerchiata in rosso!

**Evviva! Hai appena inviato la tua prima transazione Ethereum usando Alchemy 🎉**

_Per feedback e suggerimenti su questa guida, invia un messaggio a Elan sul [Discord](https://discord.gg/A39JVCM) di Alchemy!_

_Pubblicato originariamente da Alchemy._
