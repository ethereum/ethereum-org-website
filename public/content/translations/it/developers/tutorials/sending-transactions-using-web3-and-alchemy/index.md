---
title: Inviare transazioni usando Viem
description: "Questa è una guida per principianti su come inviare transazioni Ethereum usando la libreria Viem. Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creazione, firma e trasmissione. Li esamineremo tutti e tre."
author: "Elan Halpern"
tags: ["transazioni", "Viem", "Alchemy"]
skill: beginner
breadcrumb: Inviare transazioni
lang: it
published: 2020-11-04
source: Alchemy docs
sourceUrl: https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum
---

Questa è una guida per principianti su come inviare transazioni Ethereum usando la libreria [Viem](https://viem.sh/). Ci sono tre passaggi principali per inviare una transazione alla blockchain di Ethereum: creazione, firma e trasmissione. Li esamineremo tutti e tre, sperando di rispondere a qualsiasi domanda tu possa avere! In questo tutorial, useremo [Alchemy](https://www.alchemy.com/) per inviare le nostre transazioni alla catena di Ethereum. Puoi [creare un account Alchemy gratuito qui](https://auth.alchemy.com/signup).

**NOTA:** Questa guida serve per firmare le tue transazioni nel _backend_ della tua app. Se vuoi integrare la firma delle tue transazioni nel frontend, dai un'occhiata all'[interfaccia di programmazione delle applicazioni (API) del provider di MetaMask](https://docs.metamask.io/wallet/reference/provider-api/).

## Le basi {#the-basics}

Come la maggior parte degli sviluppatori blockchain agli inizi, potresti aver fatto delle ricerche su come inviare una transazione (qualcosa che dovrebbe essere piuttosto semplice) e ti sei imbattuto in una pletora di guide, ognuna delle quali dice cose diverse lasciandoti un po' sopraffatto e confuso. Se ti trovi in questa situazione, non preoccuparti; ci siamo passati tutti a un certo punto! Quindi, prima di iniziare, chiariamo alcune cose:

### 1\. Alchemy non memorizza le tue chiavi private {#alchemy-does-not-store-your-private-keys}

- Questo significa che Alchemy non può firmare e inviare transazioni per tuo conto. Il motivo è legato alla sicurezza. Alchemy non ti chiederà mai di condividere la tua chiave privata, e non dovresti mai condividere la tua chiave privata con un nodo ospitato (o con chiunque altro, se è per questo).
- Puoi leggere dalla blockchain usando l'API principale di Alchemy, ma per scriverci dovrai usare qualcos'altro per firmare le tue transazioni prima di inviarle tramite Alchemy (questo vale per qualsiasi altro [servizio di nodo](/developers/docs/nodes-and-clients/nodes-as-a-service/)).

### 2\. Cos'è un "signer"? {#what-is-a-signer}

- I signer firmeranno le transazioni per te usando la tua chiave privata. In questo tutorial useremo [Viem](https://viem.sh/) per firmare la nostra transazione, ma potresti anche usare qualsiasi altra libreria Web3.
- Nel frontend, un buon esempio di signer sarebbe [MetaMask](https://metamask.io/), che firmerà e invierà le transazioni per tuo conto.

### 3\. Perché devo firmare le mie transazioni? {#why-do-i-need-to-sign-my-transactions}

- Ogni utente che vuole inviare una transazione sulla rete Ethereum deve firmare la transazione (usando la propria chiave privata), al fine di convalidare che l'origine della transazione sia chi afferma di essere.
- È importantissimo proteggere questa chiave privata, poiché avervi accesso garantisce il pieno controllo sul tuo account Ethereum, consentendo a te (o a chiunque vi abbia accesso) di eseguire transazioni per tuo conto.

### 4\. Come proteggo la mia chiave privata? {#how-do-i-protect-my-private-key}

- Ci sono molti modi per proteggere la tua chiave privata e usarla per inviare transazioni. In questo tutorial useremo un file `.env`. Tuttavia, potresti anche usare un provider separato che memorizza le chiavi private, usare un file keystore o altre opzioni.

### 5\. Qual è la differenza tra `eth_sendTransaction` e `eth_sendRawTransaction`? {#difference-between-send-and-send-raw}

`eth_sendTransaction` e `eth_sendRawTransaction` sono entrambe funzioni dell'API di Ethereum che trasmettono una transazione alla rete Ethereum in modo che venga aggiunta a un blocco futuro. Differiscono nel modo in cui gestiscono la firma delle transazioni.

- [`eth_sendTransaction`](/developers/docs/apis/json-rpc/#eth-sendtransaction) è usato per inviare transazioni _non firmate_, il che significa che il nodo a cui stai inviando deve gestire la tua chiave privata in modo da poter firmare la transazione prima di trasmetterla alla catena. Poiché Alchemy non conserva le chiavi private degli utenti, non supporta questo metodo.
- [`eth_sendRawTransaction`](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-send-raw-transaction) è usato per trasmettere transazioni che sono già state firmate. Questo significa che devi prima firmare la transazione con la tua chiave privata (in Viem, usando [`signTransaction`](https://viem.sh/docs/actions/wallet/signTransaction) con un [account locale](https://viem.sh/docs/accounts/local/privateKeyToAccount)), per poi passare il risultato a `eth_sendRawTransaction`.

Quando si usa Viem, si accede a `eth_sendRawTransaction` chiamando la funzione [`sendRawTransaction`](https://viem.sh/docs/actions/wallet/sendRawTransaction).

Questo è ciò che useremo in questo tutorial.

### 6\. Cos'è la libreria Web3? {#what-is-the-web3-library}

- Una libreria Web3 è un wrapper attorno alle chiamate [JSON-RPC](/developers/docs/apis/json-rpc/) standard, il cui uso è piuttosto comune nello sviluppo su Ethereum.
- Ci sono molte librerie Web3 per diversi linguaggi. In questo tutorial useremo [Viem](https://viem.sh/), che è scritta in TypeScript e funziona in qualsiasi progetto JavaScript. Puoi dare un'occhiata ad altre opzioni [qui](/developers/docs/apis/javascript/) come [Ethers.js](https://docs.ethers.org/v6/).

Ok, ora che abbiamo chiarito alcune di queste domande, passiamo al tutorial. Sentiti libero di fare domande in qualsiasi momento sul [Discord](https://discord.gg/gWuC7zB) di Alchemy!

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

Segui le istruzioni sul [faucet di Sepolia di Alchemy](https://www.alchemy.com/faucets/ethereum-sepolia) per ricevere ETH, oppure usa uno degli altri [faucet di Sepolia](/developers/docs/networks/#sepolia). I faucet distribuiscono piccole quantità (il faucet di Alchemy dà 0,1 ETH al giorno), che sono più che sufficienti per questo tutorial. Assicurati di includere il tuo indirizzo Ethereum di **Sepolia** (da MetaMask) e non di un'altra rete. Dopo aver seguito le istruzioni, ricontrolla di aver ricevuto gli ETH nel tuo portafoglio.

### 3\. Crea una nuova directory di progetto ed entraci con `cd` {#create-a-new-project-direction}

Crea una nuova directory di progetto dalla riga di comando (terminale per Mac) e naviga al suo interno:

```sh
mkdir sendtx-example
cd sendtx-example
```

### 4\. Installa Viem (o qualsiasi libreria Web3) {#install-alchemy-web3}

Esegui il seguente comando nella directory del tuo progetto per installare [Viem](https://viem.sh/):

Nota: se desideri usare la libreria Ethers.js, [segui le istruzioni qui](https://www.alchemy.com/docs/how-to-send-transactions-on-ethereum).

```sh
npm init -y
npm install viem
```

### 5\. Installa dotenv {#install-dotenv}

Useremo un file `.env` per memorizzare in modo sicuro la nostra chiave API e la chiave privata.

```sh
npm install dotenv
```

### 6\. Crea il file `.env` {#create-the-dotenv-file}

Crea un file `.env` nella directory del tuo progetto e aggiungi quanto segue (sostituendo "`your-api-url`" e "`your-private-key`")

- Per trovare l'URL della tua API di Alchemy, vai alla pagina dei dettagli dell'app che hai appena creato nella tua dashboard, clicca su "View Key" nell'angolo in alto a destra e copia l'URL HTTP.
- Per trovare la tua chiave privata usando MetaMask, dai un'occhiata a questa [guida](https://support.metamask.io/configure/accounts/how-to-export-an-accounts-private-key/). Usa un account che contiene solo ETH della testnet.

```sh
API_URL="your-api-url"
PRIVATE_KEY="your-private-key"
```

<Alert variant="warning">
<AlertContent>
<AlertDescription>
Non committare il file <code>.env</code>! Assicurati di non condividere o esporre mai il tuo file <code>.env</code> a nessuno, poiché così facendo comprometteresti i tuoi segreti. Se stai usando il controllo di versione, aggiungi il tuo <code>.env</code> a un file <a href="https://git-scm.com/docs/gitignore">gitignore</a>.
</AlertDescription>
</AlertContent>
</Alert>

### 7\. Crea il file `sendTx.js` {#create-sendtx-js}

Ottimo, ora che abbiamo i nostri dati sensibili protetti in un file `.env`, iniziamo a programmare. Per il nostro esempio di invio di una transazione, invieremo 0,001 ETH a un altro indirizzo che controlli, come un secondo account su MetaMask.

Crea un file `sendTx.js`, che è dove configureremo e invieremo la nostra transazione di esempio, e aggiungici le seguenti righe di codice:

```js
require("dotenv").config({ quiet: true })
const { createPublicClient, createWalletClient, http, parseEther } = require("viem")
const { privateKeyToAccount } = require("viem/accounts")
const { sepolia } = require("viem/chains")

async function main() {
  const { API_URL, PRIVATE_KEY } = process.env
  const account = privateKeyToAccount(
    PRIVATE_KEY.startsWith("0x") ? PRIVATE_KEY : `0x${PRIVATE_KEY}`
  )
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(API_URL),
  })
  const walletClient = createWalletClient({
    account,
    chain: sepolia,
    transport: http(API_URL),
  })

  const nonce = await publicClient.getTransactionCount({
    address: account.address,
    blockTag: "pending",
  }) // il nonce inizia a contare da 0

  const transaction = await walletClient.prepareTransactionRequest({
    to: "0xYourSecondAddress", // TODO: sostituisci con l'indirizzo a cui vuoi inviare ETH
    value: parseEther("0.001"), // 0.001 ETH
    gas: 21000n,
    nonce,
    // campo dati opzionale per inviare un messaggio o eseguire uno smart contract
  })

  const signedTx = await walletClient.signTransaction(transaction)

  try {
    const hash = await walletClient.sendRawTransaction({
      serializedTransaction: signedTx,
    })
    console.log("🎉 The hash of your transaction is:", hash)

    const receipt = await publicClient.waitForTransactionReceipt({ hash })
    console.log(`Transaction ${receipt.status} in block ${receipt.blockNumber}`)
  } catch (error) {
    console.log(
      "❗Something went wrong while submitting your transaction:",
      error.details ?? error.message
    )
  }
}

main()
```

Assicurati di sostituire `0xYourSecondAddress` con l'indirizzo a cui vuoi inviare gli ETH. Lo script deriva il tuo indirizzo (mittente) da `PRIVATE_KEY`, quindi non hai bisogno di inserirlo.

Ora, prima di passare all'esecuzione di questo codice, parliamo di alcuni dei componenti presenti.

- `account`: un account locale creato dalla tua chiave privata con [`privateKeyToAccount`](https://viem.sh/docs/accounts/local/privateKeyToAccount). La firma avviene sulla tua macchina e la chiave privata non viene mai inviata ad Alchemy.
- `publicClient` e `walletClient`: client di Viem che inviano richieste JSON-RPC al tuo URL di Alchemy. Il client pubblico legge dalla catena, mentre il client del portafoglio prepara e firma le transazioni per il tuo account.
- `nonce`: la specifica del nonce è usata per tenere traccia del numero di transazioni inviate dal tuo indirizzo. Ne abbiamo bisogno per scopi di sicurezza e per prevenire attacchi di replay. Per ottenere il numero di transazioni inviate dal tuo indirizzo usiamo [getTransactionCount](https://www.alchemy.com/docs/chains/ethereum/ethereum-api-endpoints/eth-get-transaction-count). Anche Viem lo compilerebbe per te, ma qui lo recuperiamo esplicitamente per mostrare da dove proviene.
- `transaction`: l'oggetto della transazione ha alcuni aspetti che dobbiamo specificare. [`prepareTransactionRequest`](https://viem.sh/docs/actions/wallet/prepareTransactionRequest) compila il resto per noi, inclusi il `chainId` e i campi delle commissioni dell'[EIP-1559](/developers/docs/gas/) `maxFeePerGas` e `maxPriorityFeePerGas`, in base alle condizioni attuali della rete.
  - `to`: questo è l'indirizzo a cui vogliamo inviare gli ETH.
  - `value`: questo è l'importo che desideriamo inviare, specificato in Wei dove 10^18 Wei = 1 ETH. [`parseEther`](https://viem.sh/docs/utilities/parseEther) converte un importo in ETH in Wei per noi. Il tuo account ha bisogno di un po' più di questo, poiché paga anche per il gas.
  - `gas`: ci sono molti modi per determinare la giusta quantità di gas da includere nella tua transazione. Alchemy supporta i [webhook](https://www.alchemy.com/docs/reference/webhooks-overview) che possono notificarti l'attività onchain. Per le transazioni sulla Mainnet, è buona norma controllare le condizioni attuali del gas per determinare la giusta quantità di gas da includere. Un semplice trasferimento di ETH a un indirizzo ordinario usa sempre esattamente 21000 gas, che è il minimo per qualsiasi transazione, quindi qui inseriamo 21000. Se ometti `gas`, Viem lo stima per te.
  - `nonce`: vedi la definizione di nonce sopra. Il nonce inizia a contare da zero.
  - [FACOLTATIVO] data: usato per inviare informazioni aggiuntive con il tuo trasferimento, o per chiamare uno smart contract, non richiesto per i trasferimenti di saldo, dai un'occhiata alla nota di seguito.
- `signedTx`: per firmare il nostro oggetto della transazione useremo il metodo `signTransaction`, che lo firma localmente con l'account creato dalla nostra `PRIVATE_KEY`.
- `sendRawTransaction`: una volta che abbiamo una transazione firmata, possiamo inviarla per essere inclusa in un blocco successivo usando `sendRawTransaction`, che chiama `eth_sendRawTransaction`.
- `waitForTransactionReceipt`: attende finché la transazione non viene inclusa in un blocco e ne restituisce la ricevuta.

**Una nota su data**
Ci sono due tipi principali di transazioni che possono essere inviate su Ethereum.

- Trasferimento di saldo: invia ETH da un indirizzo a un altro. Nessun campo data richiesto, tuttavia, se desideri inviare informazioni aggiuntive insieme alla tua transazione, puoi includere tali informazioni in formato HEX in questo campo.
  - Ad esempio, supponiamo di voler scrivere l'hash di un documento IPFS sulla catena di Ethereum per dargli un timestamp immutabile. Il nostro campo data dovrebbe quindi apparire come `data: toHex("IPFS hash")`, usando [`toHex`](https://viem.sh/docs/utilities/toHex) di Viem. E ora chiunque può interrogare la catena e vedere quando quel documento è stato aggiunto.
- Transazione di smart contract: esegue del codice di uno smart contract sulla catena. In questo caso, il campo data dovrebbe contenere la funzione dello smart contract che desideri eseguire, insieme a eventuali parametri.
  - Per un esempio pratico, dai un'occhiata al [tutorial sullo smart contract Hello World](/developers/tutorials/hello-world-smart-contract/).

### 8\. Esegui il codice usando `node sendTx.js` {#run-the-code-using-node-sendtx-js}

Torna al tuo terminale o riga di comando ed esegui:

```sh
node sendTx.js
```

### 9\. Vedi la tua transazione su un block explorer {#see-your-transaction-in-the-mempool}

Lo script stampa l'hash della transazione non appena il nodo accetta la transazione, quindi attende finché non viene inclusa in un blocco (di solito entro pochi secondi) e stampa il risultato. Per vedere i dettagli, incolla l'hash in un block explorer di Sepolia come [Sepolia Etherscan](https://sepolia.etherscan.io/) o [Blockscout](https://eth-sepolia.blockscout.com/). Lì puoi guardare la transazione passare da in sospeso a inclusa, e vedere l'importo, le commissioni e il blocco in cui è finita.

Se invece vedi un errore `insufficient funds`, il tuo account non ha abbastanza ETH di Sepolia per coprire il valore più il gas. Torna al passaggio 2 e richiedine altri da un faucet.

**Evviva! Hai appena inviato la tua prima transazione Ethereum usando Alchemy 🎉**

_Per feedback e suggerimenti su questa guida, invia un messaggio a Elan sul [Discord](https://discord.gg/gWuC7zB) di Alchemy!_

_Pubblicato originariamente da Alchemy._
