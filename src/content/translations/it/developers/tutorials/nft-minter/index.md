---
title: Tutorial del Coniatore di NFT
description: In questo tutorial, creerai un coniatore di NFT e imparerai come creare una dapp in full stack connettendo il tuo smart contract a un frontend di React usando gli strumenti di MetaMask e Web3.
author: "smudgil"
tags:
  - "solidity"
  - "NFT"
  - "alchemy"
  - "contratti intelligenti"
  - "frontend"
  - "Pinata"
skill: intermediate
lang: it
published: 2021-10-06
---

Una delle più grandi sfide per gli sviluppatori provenienti da Web2 è comprendere come connettere il proprio smart contract a un progetto di frontend, e come interagire con esso.

Creando un coniatore di NFT, una semplice UI in cui è possibile inserire un link alla risorsa digitale, un titolo e una descrizione, imparerai come:

- Connetterti a MetaMask tramite il progetto del tuo frontend
- Chiamare i metodi dello smart contract dal tuo frontend
- Firmare le transazioni usando MetaMask

In questo tutorial, utilizzeremo [React](https://reactjs.org/) come framework di frontend. Poiché questo tutorial è incentrato principalmente sullo sviluppo di Web3, non dedicheremo molto tempo ad analizzare i fondamenti di React. Al contrario, ci concentreremo sul portare funzionalità al nostro progetto.

Come prerequisito, dovresti avere conoscenze di base di React e sapere come funzionano i componenti, gli accessori, useState/useEffect e la chiamata delle funzioni di base. Se non hai mai sentito parlare di alcuno di questi termini prima d'ora, è consigliabile dare un'occhiata a questo [tutorial d'introduzione a React](https://reactjs.org/tutorial/tutorial.html). Per chi preferisce l'apprendimento visivo, consigliamo vivamente quest'eccellente serie di video [Tutorial moderno e completo su React](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) di Net Ninja.

E se non lo hai già fatto, necessiterai decisamente di un conto di Alchemy, per completare questo tutorial, nonché per creare qualsiasi cosa sulla blockchain. Registra gratuitamente un conto,[qui](https://alchemy.com/).

Iniziamo quindi!

## Guida alla Creazione di NFT {#making-nfts-101}

Prima ancora d'iniziare ad esaminare qualsiasi codice, è importante comprendere come funziona la creazione di un NFT. Si articola in due fasi:

### Pubblicare lo smart contract di un NFT sulla blockchain di Ethereum {#publish-nft}

La più grande differenza tra i due standard di smart contract di NFT è che ERC-1155 è uno standard multi-token e comprende funzionalità batch, mentre ERC-721 è uno standard a token singolo, supporta dunque solo il trasferimento di un token per volta.

### Chiamare la funzione di conio {#minting-function}

Solitamente, questa funzione di conio richiede di passare due variabili come parametri, prima `recipient`, che specifica l'indirizzo che riceverà il tuo NFT appena coniato e poi il `tokenURI` del NFT, una stringa che si risolve a un documento JSON che descrive i metadati del NFT.

I metadati di un NFT sono davvero ciò che lo porta in vita, consentendogli di avere proprietà, quali nome, descrizione, immagine (o altre risorse digitali) e altri attributi. Ecco [un esempio di un tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), contenente i metadati di un NFT.

In questo tutorial, ci concentreremo sulla parte 2: chiamare una funzione di conio dello smart contract del NFT esistente usando la nostra UI di React.

[Ecco un link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) allo smart contract del NFT dell'ERC-721 che chiameremo in questo tutorial. Se sei interessato a imparare come lo abbiamo creato, consigliamo vivamente di dare un'occhiata al nostro tutorial, ["Come creare un NFT"](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft).

Forte! Ora che sappiamo come funziona la creazione di un NFT, cloniamo i nostri file iniziali!

## Clonare i file iniziali {#clone-the-starter-files}

Prima, vai al [repository di GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) per ottenere i file iniziali per questo progetto. Clona questo repository nel tuo ambiente locale.

Quando apri questo repository `nft-minter-tutorial` clonato, noterai che contiene due cartelle: `minter-starter-files` e `nft-minter`.

- `minter-starter-files` contiene i file iniziali (essenzialmente l'UI di React) per questo progetto. In questo tutorial, **lavoreremo in questa cartella**, mentre impari a dar vita a questa UI connettendola al tuo portafoglio di Ethereum e a uno smart contract di NFT.
- `nft-minter` contiene l'intero tutorial completato e serve come **riferimento** **se dovessi bloccarti.**

Apri quindi la tua copia di `minter-starter-files` nel tuo editor di codice e poi vai alla cartella `src`.

Tutto il codice che scriveremo sarà sotto la cartella `src`. Modificheremo il componente `Minter.js` e scriveremo altri file in JavaScript per dare funzionalità al nostro progetto Web3.

## Fase 2: dai un'occhiata ai nostri file iniziali {#step-2-check-out-our-starter-files}

Prima di iniziare a programmare, è importante dare un'occhiata a ciò che è già disponibile nei file iniziali.

### Metti in funzione il tuo progetto di React {#get-your-react-project-running}

Iniziamo eseguendo il progetto di React nel browser. La bellezza di React è che una volta eseguito il nostro progetto nel browser, ogni modifica che salviamo sarà aggiornata dal vivo nel browser.

Per mettere il progetto in funzione, vai alla cartella di root della cartella `minter-starter-files` ed esegui `npm install` nel terminale per installare le dipendenze del progetto:

```bash
cd minter-starter-files
npm install
```

Una volta terminata l'installazione, esegui `npm start` nel terminale:

```bash
npm start
```

Così facendo, dovrebbe aprirsi http://localhost:3000/ nel browser, dove vedrai il frontend per il nostro progetto. Dovrebbe consistere in 3 campi: un luogo per inserire un link alla tua risorsa NFT, uno per inserire il nome e uno per fornire una descrizione.

Se provi a cliccare i pulsanti "Connetti Portafoglio" o "Conia NFT", noterai che non funzionano, questo perché devi ancora programmarne la funzionalità! :\)

### Il componente Minter.js {#minter-js}

**NOTA:** Assicurati di essere nella cartella `minter-starter-files` e non nella cartella `nft-minter`!

Torniamo alla cartella `src` nell'editor e apriamo il file `Minter.js`. È davvero importante comprendere tutto il contenuto di questo file, che è il componente principale di React su cui lavoreremo.

In cima al nostro file, abbiamo le nostre variabili di stato che aggiorneremo dopo eventi specifici.

```javascript
//State variables
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Mai sentito parlare di variabili di stato di React o di hook di stato? Dai un'occhiata a [questa](https://reactjs.org/docs/hooks-state.html) documentazione.

Ecco cosa rappresenta ognuna delle variabili:

- `walletAddress` - una stringa che memorizza l'indirizzo del portafoglio dell'utente
- `status` - una stringa contenente un messaggio da mostrare in fondo all'UI
- `name` - una stringa che memorizza il nome del NFT
- `description` - una stringa che memorizza la descrizione del NFT
- `url` - una stringa che rappresenta un link alla risorsa digitale del NFT

Dopo le variabili di stato, vedrai tre funzioni non implementate: `useEffect`, `connectWalletPressed` e `onMintPressed`. Noterai che tutte queste funzioni sono `async`, perché al loro interno effettueremo chiamate asincrone all'API! I nomi sono indicativi delle loro funzionalità:

```javascript
useEffect(async () => {
  //TODO: implement
}, [])

const connectWalletPressed = async () => {
  //TODO: implement
}

const onMintPressed = async () => {
  //TODO: implement
}
```

- [`useEffect`](https://reactjs.org/docs/hooks-effect.html) - questo è un hook di React chiamato dopo il rendering del tuo componente. Poiché in essa viene passato un array vuoto `[]` (vedi la riga 3), sarà chiamata solo al _primo_ rendering del componente. Qui chiameremo il listener del nostro portafoglio e un'altra funzione del portafoglio per aggiornare la nostra UI affinché rifletta se un portafoglio è già collegato.
- `connectWalletPressed` - questa funzione sarà chiamata per connettere il portafoglio di MetaMask dell'utente alla nostra dapp.
- `onMintPressed` - questa funzione sarà chiamata per coniare il NFT dell'utente.

Vicino alla fine di questo file, abbiamo l'UI del nostro componente. Se esamini attentamente questo codice, noterai che aggiorniamo le nostre variabili di stato `url`, `name` e `description`, quando l'input nei relativi campi di testo cambia.

Vedrai anche che `connectWalletPressed` e `onMintPressed` vengono chiamate rispettivamente quando viene fatto clic sui pulsanti con ID `mintButton` e `walletButton`.

```javascript
//the UI of our component
return (
  <div className="Minter">
    <button id="walletButton" onClick={connectWalletPressed}>
      {walletAddress.length > 0 ? (
        "Connected: " +
        String(walletAddress).substring(0, 6) +
        "..." +
        String(walletAddress).substring(38)
      ) : (
        <span>Connect Wallet</span>
      )}
    </button>

    <br></br>
    <h1 id="title">🧙‍♂️ Alchemy NFT Minter</h1>
    <p>
      Simply add your asset's link, name, and description, then press "Mint."
    </p>
    <form>
      <h2>🖼 Link to asset: </h2>
      <input
        type="text"
        placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g. My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g. Even cooler than cryptokitties ;)"
        onChange={(event) => setDescription(event.target.value)}
      />
    </form>
    <button id="mintButton" onClick={onMintPressed}>
      Mint NFT
    </button>
    <p id="status">{status}</p>
  </div>
)
```

Infine, vediamo dove viene aggiunto questo componente del Coniatore.

Se vai al file `App.js`, che è il componente principale su React e che agisce come contenitore per tutti gli altri componenti, vedrai che il nostro componente del Coniatore è inserito alla riga 7.

**In questo tutorial, modificheremo solo il file `Minter.js` e aggiungeremo i file alla nostra cartella `src`.**

Ora che ci è chiaro con cosa stiamo lavorando, configuriamo il portafoglio di Ethereum!

## : Configura il tuo portafoglio di Ethereum {#set-up-your-ethereum-wallet}

Per poter interagire con il tuo smart contract, gli utenti dovranno connettere il proprio portafoglio di Ethereum alla tua dapp.

### Scarica MetaMask {#download-metamask}

Per questo tutorial, utilizzeremo MetaMask, un portafoglio virtuale nel browser, utilizzato per gestire l'indirizzo del tuo conto di Ethereum. Se vuoi capire di più su come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/).

Puoi scaricare e creare gratuitamente un conto di MetaMask [qui](https://metamask.io/download.html). Quando stai creando un conto, o se ne hai già uno, assicurati di passare alla "Rete di Prova di Ropsten" in alto a destra \(così da non avere a che fare con denaro reale\).

### Aggiungere ether da un Faucet {#add-ether-from-faucet}

Per coniare i nostri NFT (o firmare qualsiasi transazione sulla blockchain di Ethereum), avremo bisogno di qualche finto Eth. Per ottenere degli Eth puoi andare al [faucet di Ropsten](https://faucet.ropsten.be/) e inserire l'indirizzo del tuo conto di Ropsten, poi cliccare “Invia Eth a Ropsten.” Poco dopo, dovresti vedere gli Eth nel tuo conto di MetaMask!

### Controlla il tuo saldo {#check-your-balance}

Per ricontrollare che ci sia il saldo, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) usando lo [strumento compositore di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà l'importo di Eth nel tuo portafoglio. Dopo aver inserito l'indirizzo del tuo conto di MetaMask e aver cliccato "Invia Richiesta", dovresti visualizzare una risposta simile alla seguente:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Questo risultato è in wei non in eth. Wei è usato come taglio più piccolo dell'ether. La conversione da wei a eth è: 1 eth = 10¹⁸ wei. Quindi se convertiamo 0xde0b6b3a7640000 in decimali, otteniamo 1\*10¹⁸, pari a 1 eth.

Meno male! I nostri soldi finti ci sono tutti! <Emoji text=":money_mouth_face:" size={1} />

## Connettere MetaMask alla UI {#connect-metamask-to-your-UI}

Ora che il nostro portafoglio di MetaMask è configurato, connettiamo la nostra dapp!

Poiché vogliamo prescrivere al paradigma del [MVC](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller), creeremo un file separato che contiene le nostre funzioni per gestire la logica, i dati e le regole della nostra dapp e poi passeremo tali funzioni al nostro frontend (il nostro componente Minter.js).

### La funzione `connectWallet` {#connect-wallet-function}

Per farlo, creiamo una nuova cartella chiamata `utils` nella nostra cartella `src` e aggiungiamo al suo interno un file chiamato `interact.js`, che conterrà tutte le funzioni d'interazione del nostro portafoglio e del nostro smart contract.

Nel nostro file `interact.js`, scriveremo una funzione `connectWallet`, che poi importeremo e chiameremo nel nostro componente `Minter.js`.

Nel tuo file `interact.js`, aggiungi quanto segue

```javascript
export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      })
      const obj = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      }
      return obj
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Analizziamo cosa fa questo codice:

Per prima cosa, la nostra funzione verifica se `window.ethereum` è abilitato nel browser.

`window.ethereum` è un'API globale, iniettata da MetaMask e altri fornitori di portafogli, che consente ai siti web di richiedere i conti di Ethereum degli utenti. Se approvata, può leggere i dati dalle blockchain a cui è connesso l'utente e suggerire all'utente di firmare messaggi e transazioni. Dai un'occhiata alla [documentazione di MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) per ulteriori informazioni!

Se `window.ethereum` _non è_ presente, significa che MetaMask non è installato. Verrà quindi restituito un oggetto JSON in cui l'`address` restituito è una stringa vuota e l'oggetto JSX di `status` indica che l'utente deve installare MetaMask.

**Gran parte delle funzioni che scriveremo restituiranno oggetti JSON che possiamo usare per aggiornare le nostre variabili di stato e l'UI.**

Ora, se `window.ethereum` _è_ presente, le cose cominciano a farsi interessanti.

Utilizzando un ciclo try/catch, proveremo a connetterci a MetaMask chiamando `[window.ethereum.request({ method: "eth_requestAccounts" });](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts)`. Chiamare questa funzione aprirà MetaMask nel browser, dove sarà richiesto all'utente di connettere il proprio portafoglio alla tua dapp.

- Se l'utente sceglie di connettersi, `method: "eth_requestAccounts"` restituirà un insieme contenente tutti gli indirizzi del conto dell'utente, connessi alla dapp. Nel complesso, la nostra funzione `connectWallet` restituirà un oggetto JSON contenente il _primo_ `address` in questo array \(vedi la riga 9\) e un messaggio di `status` che richiede all'utente di scrivere un messaggio nello smart contract.
- Se l'utente rifiuta la connessione, allora l'oggetto JSON conterrà una stringa vuota per l'`address` restituito e un messaggio di `status` che indica che l'utente ha rifiutato la connessione.

### Aggiungi la funzione connectWallet al tuo componente UI Minter.js {#add-connect-wallet}

Ora che abbiamo scritto questa funzione `connectWallet`, connettiamola al nostro componente `Minter.js.`.

Prima, dovremo importare la nostra funzione nel file `Minter.js`, aggiungendo `import { connectWallet } from "./utils/interact.js";` in cima al file `Minter.js`. Le tue prime 11 righe di `Minter.js` dovrebbero somigliare a questo:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  //State variables
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Poi, nella nostra funzione `connectWalletPressed`, chiameremo la funzione `connectWallet` importata, come quella che segue:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Nota come gran parte della nostra funzionalità è esterna al nostro componente `Minter.js` dal file `interact.js`? Questo perché stiamo seguendo il modello M-V-C!

In `connectWalletPressed`, creiamo semplicemente una chiamata d'attesa alla nostra funzione `connectWallet` importata e, usando la sua risposta, aggiorniamo le nostre variabili `status` e `walletAddress` tramite i loro hook di stato.

Ora, salviamo entrambi i file `Minter.js` e `interact.js` e testiamo la nostra UI.

Apri il browser su localhost:3000 e premi il pulsante "Connetti Portafoglio" in alto a destra alla pagina.

Se hai MetaMask installato, ti dovrebbe essere richiesto di connettere il tuo portafoglio alla tua dapp. Accetta l'invito a connetterti.

Dovresti vedere ora che il pulsante del portafoglio indica che l'indirizzo è connesso.

Prova quindi a ricaricare la pagina... questo è strano. Il nostro pulsante del portafoglio ci sta richiedendo di connetterci a MetaMask, anche se è già connesso...

Non preoccuparti! Possiamo risolverlo facilmente implementando una funzione chiamata `getCurrentWalletConnected`, che verificherà se un indirizzo è già connesso alla nostra dapp e aggiornerà l'UI di conseguenza!

### La funzione getCurrentWalletConnected {#get-current-wallet}

Nel file `interact.js`, aggiungi la seguente funzione `getCurrentWalletConnected`:

```javascript
export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      })
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        }
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        }
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      }
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install MetaMask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    }
  }
}
```

Questo codice è _molto_ simile alla funzione `connectWallet` che abbiamo scritto poco fa.

La differenza principale è che, invece di chiamare il metodo `eth_requestAccounts`, che apre MetaMask perché l'utente connetta il proprio portafoglio, qui chiamiamo il metodo `eth_accounts` che, semplicemente, restituisce un insieme contenente gli indirizzi di MetaMask correntemente connessi alla nostra dapp.

Per vedere questa funzione in azione, chiamiamola nella funzione `useEffect` del nostro componente `Minter.js`.

Come abbiamo fatto per `connectWallet`, dobbiamo importare questa funzione dal file `interact.js` al file `Minter.js`, come segue:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, //import here
} from "./utils/interact.js"
```

Ora, semplicemente, chiamiamola nella nostra funzione `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Nota che stiamo usando la risposta alla nostra chiamata a `getCurrentWalletConnected` per aggiornare le nostre variabili di stato `walletAddress` e `status`.

Una volta aggiunto questo codice, prova a ricaricare la nostra finestra del browser. Il pulsante dovrebbe dire che sei connesso e mostrare un'anteprima dell'indirizzo del tuo portafoglio connesso, anche dopo un refresh!

### Implementare addWalletListener {#implement-add-wallet-listener}

Il passaggio finale della configurazione del portafoglio della nostra dapp è implementare l'ascoltatore del portafoglio, così che la nostra UI si aggiorni al cambiamento dello stato del nostro portafoglio, ad esempio, quando l'utente si disconnette o cambia conto.

Nel file `Minter.js`, aggiungi una funzione `addWalletListener`, simile a quanto segue:

```javascript
function addWalletListener() {
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) {
        setWallet(accounts[0])
        setStatus("👆🏽 Write a message in the text-field above.")
      } else {
        setWallet("")
        setStatus("🦊 Connect to MetaMask using the top right button.")
      }
    })
  } else {
    setStatus(
      <p>
        {" "}
        🦊 <a target="_blank" href={`https://metamask.io/download.html`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Esaminiamo rapidamente cosa sta succedendo qui:

- Per prima cosa, la nostra funzione verifica se `window.ethereum` è abilitata \(cioè se MetaMask è installato\).
  - Se non lo è, impostiamo semplicemente la nostra variabile di stato `status`a una stringa JSX che richiede all'utente di installare MetaMask.
  - Se è abilitato, configuriamo l'ascoltatore `window.ethereum.on("accountsChanged")` alla riga 3, affinché ascolti i cambiamenti di stato nel portafoglio di MetaMask, tra cui, quando l'utente connette un ulteriore conto alla dapp, cambia conto, o ne disconnette uno. Se è connesso almeno un conto, la variabile di stato `walletAddress` è aggiornata come primo conto nell'insieme `accounts`, restituito dall'ascoltatore. Altrimenti, `walletAddress` è impostato come una stringa vuota.

Infine, dobbiamo chiamarlo nella nostra funzione `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E voilà! Abbiamo completato la programmazione di tutte le funzionalità del nostro portafoglio! Ora che il nostro portafoglio è configurato, cerchiamo di capire come coniare il nostro NFT!

## Guida di base ai Metadati del NFT {#nft-metadata-101}

Ricorda quindi che i metadati del NFT di cui abbiamo appena parlato al Passaggio 0 di questo tutorial, portano in vita un NFT, consentendogli di avere proprietà quali una risorsa digitale, un nome, una descrizione e altri attributi.

Dovremo configurare questi metadati come un oggetto JSON e memorizzarli, quindi potremo passarli come parametro `tokenURI`, chiamando la nostra funzione `mintNFT` dello smart contract.

Il testo nei campi "Link to Asset", "Name", "Description" comprenderà le diverse proprietà dei metadati del nostro NFT. Formatteremo questi metadati come un oggetto JSON, ma esistono un paio di opzioni per dove possiamo memorizzare questo oggetto:

- Potremmo memorizzarlo sulla blockchain di Ethereum; ma farlo sarebbe molto costoso.
- Potremmo memorizzarlo su un server centralizzato, come AWS o Firebase. Ma questo sarebbe contrario alla nostra etica di decentralizzazione.
- Potremmo usare IPFS, un protocollo decentralizzato e rete peer-to-peer per memorizzare e condividere dati in un sistema di file distribuito. Poiché questo protocollo è decentralizzato e libero, è la nostra opzione preferita!

Per memorizzare i nostri metadati su IPFS, useremo [Pinata](https://pinata.cloud/), una comoda API e un toolkit per IPFS. Al prossimo passaggio, spiegheremo esattamente come farlo!

## Utilizza Pinata per fissare i tuoi metadati su IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Se non hai un conto di [Pinata](https://pinata.cloud/), registrane gratuitamente uno [qui](https://pinata.cloud/signup) e completa i passaggi per verificare la tua email e il tuo conto.

### Crea la tua chiave API di Pinata {#create-pinata-api-key}

Vai alla pagina [https://pinata.cloud/keys](https://pinata.cloud/keys), quindi seleziona il pulsante "Nuova Chiave" in alto, abilita il widget Admin e assegna un nome alla tua chiave.

Ti sarà poi mostrato un popup con le informazioni sulla tua API. Assicurati di conservarle da qualche parte al sicuro.

Ora che la nostra chiave è configurata, aggiungiamola al nostro progetto così da poterla usare.

### Crea un file .env {#create-a-env}

Possiamo memorizzare in sicurezza la nostra chiave e il codice segreto di Pinata in un file di ambiente. Installiamo il [pacchetto dotenv](https://www.npmjs.com/package/dotenv) nella cartella del progetto.

Apri una nuova scheda nel terminale \(separata da quella che sta eseguendo l'host locale\) e assicurati di essere nella cartella `minter-starter-files`, poi esegui il seguente comando nel terminale:

```text
npm install dotenv --save
```

Crea quindi un file `.env` nella cartella di root del tuo `minter-starter-files` inserendo quanto segue a riga di comando:

```javascript
vim.env
```

Questo aprirà il file `.env` in vim \(un editor di testo\). Per salvarlo, clicca "esc" + ":" + "q" sulla tua tastiera in questa sequenza.

Poi, su VSCode, vai al file `.env` e aggiungi al suo interno la tua chiave API di Pinata e il codice segreto dell'API, come segue:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Salva il file: sei pronto ora per scrivere la funzione per caricare i tuoi metadati di JSON su IPFS!

### Implementa pinJSONToIPFS {#pin-json-to-ipfs}

Per nostra fortuna, Pinata ha un'[API specifica per caricare i dati JSON su IPFS](https://pinata.cloud/documentation#PinJSONToIPFS) e un comodo JavaScript con esempio di axios che possiamo usare, con alcune lievi modifiche.

Nella cartella `utils` creiamo un altro file denominato `pinata.js` e poi importiamo il nostro codice segreto di Pinata e la chiave dal file .env, come segue:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Incolla quindi il codice aggiuntivo seguente nel file `pinata.js`. Non preoccuparti, analizzeremo per bene cosa significa!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  //making axios POST request to Pinata ⬇️
  return axios
    .post(url, JSONBody, {
      headers: {
        pinata_api_key: key,
        pinata_secret_api_key: secret,
      },
    })
    .then(function (response) {
      return {
        success: true,
        pinataUrl:
          "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash,
      }
    })
    .catch(function (error) {
      console.log(error)
      return {
        success: false,
        message: error.message,
      }
    })
}
```

Quindi, cosa fa esattamente questo codice?

Prima di tutto, importa [axios](https://www.npmjs.com/package/axios), un client HTTP basato su Promise per il browser e node.js, che useremo per creare una richiesta a Pinata.

Poi abbiamo la nostra funzione asincrona `pinJSONToIPFS`, che prende un `JSONBody` come input e la chiave API e il codice segreto di Pinata nell'intestazione, tutto per creare una richiesta di POST all'API `pinJSONToIPFS`.

- Se questa richiesta di POST riesce, allora la nostra funzione restituisce un oggetto JSON con il booleano `success` impostato a true e il `pinataUrl` in cui i nostri metadati sono stati fissati. Useremo il `pinataUrl` restituito come l'input del `tokenURI` alla funzione di conio del nostro smart contract.
- Se questa richiesta di POST fallisce, allora la nostra funzione restituisce un oggetto JSON con il booleano `success` impostato false e una stringa `message` che comunica l'errore.

Come con i tipi restituiti dalla nostra funzione `connectWallet`, stiamo restituendo oggetti JSON, così da poterne usare i parametri per aggiornare le nostre variabili di stato e l'UI.

## Carica il tuo smart contract {#load-your-smart-contract}

Ora che abbiamo un modo per caricare i metadati del nostro NFT su IPFS tramite la nostra funzione `pinJSONToIPFS`, avremo bisogno di un modo per caricare un'istanza del nostro smart contract, così da poterne chiamare la funzione `mintNFT`.

Come menzionato prima, in questo tutorial useremo [questo smart contract NFT esistente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); se invece sei interessato a sapere come lo abbiamo creato, o se vuoi crearne uno tuo, consigliamo vivamente di dare un'occhiata all'altro nostro tutorial, ["Come Creare un NFT."](https://docs.alchemyapi.io/alchemy/tutorials/how-to-create-an-nft).

### L'ABI del contratto {#contract-abi}

Se hai esaminato attentamente i nostri file, avrai notato che nella nostra cartella `src` si trova un file `contract-abi.json`. Un'ABI serve per specificare quale funzione invocherà un contratto, oltre che per garantire che la funzione restituirà i dati nel formato previsto.

Avremo anche bisogno di una chiave API di Alchemy e dell'API Alchemy Web3 per connetterci alla blockchain di Ethereum e caricare il nostro smart contract.

### Crea la tua chiave API di Alchemy {#create-alchemy-api}

Se non hai già un conto di Alchemy, [registrane gratuitamente uno qui.](https://alchemy.com/?a=eth-org-nft-minter)

Una volta creato un conto di Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di effettuare richieste alla rete di prova di Ropsten.

Vai alla pagina “Crea App” nella tua dashboard di Alchemy passando su “App” nella barra di navigazione e cliccando “Crea App”.

Dai un nome alla tua app (noi abbiamo scelto “Il mio primo NFT!", aggiungi una breve descrizione, seleziona “Staging” come Ambiente) serve per la contabilità della tua app e scegli "Ropsten" come rete.

Clicca “Crea app” ed è tutto! La tua app dovrebbe apparire nella tabella seguente.

Fantastico, ora che abbiamo creato il nostro URL dell'API di Alchemy HTTP, copiamolo negli appunti...

…e poi aggiungiamolo al nostro file `.env`. Nel complesso, il file .env dovrebbe somigliare a questo:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https://eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Ora che abbiamo l'ABI del nostro contratto e la nostra chiave API di Alchemy, siamo pronti a caricare il nostro smart contract usando [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configura l'endpoint e il contratto di Web3 di Alchemy {#setup-alchemy-endpoint}

Prima di tutto, se non lo hai già fatto, dovrai installare [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navigando alla cartella home: `nft-minter-tutorial` nel terminale:

```text
cd ..
npm install @alch/alchemy-web3
```

Torniamo quindi al nostro file `interact.js`. In cima al file, aggiungi il seguente codice per importare la tua chiave di Alchemy dal file .env e configurare il tuo endpoint di Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) è un wrapper intorno a[Web3.js](https://docs.web3js.org/) che fornisce metodi API migliorati e altri benefici fondamentale per semplificare la tua vita a uno sviluppatore web3. È progettato per richiedere una configurazione minima, così da poter iniziare a usarlo immediatamente nella tua app!

In seguito, aggiungiamo l'ABI del nostro contratto e l'indirizzo del contratto al nostro file.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Una volta che abbiamo entrambi, siamo pronti a iniziare a programmare la nostra funzione di conio!

## Implementa la funzione mintNFT {#implement-the-mintnft-function}

Nel file `interact.js`, definiamo la nostra funzione, `mintNFT`, che conierà il nostro omonimo NFT.

Poiché effettueremo numerose chiamate asincrone \(a Pinata per fissare i nostri metadati su IPFS, a Alchemy Web3 per caricare il nostro smart contract e a MetaMask per firmare le nostre transazioni\), anche la nostra funzione sarà asincrona.

I tre input alla nostra funzione saranno l'`url` della nostra risorsa digitale, il `name` e la `description`. Aggiungi la seguente firma della funzione sotto la funzione `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Gestione degli errori d'input {#input-error-handling}

Naturalmente, è utile avere una certa gestione degli errori di input all'inizio della funzione, uscendo dalla funzione se i nostri parametri di input sono errati. Nella nostra funzione, aggiungiamo il seguente codice:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Essenzialmente, se uno qualsiasi dei parametri d'input è una stringa vuota, restituiamo un oggetto JSON in cui il booleano `success` è false e la stringa `status` indica che tutti i campi nella nostra UI devono esser completi.

### Carica i metadati su IPFS {#upload-metadata-to-ipfs}

Una volta che sappiamo che i nostri metadati sono correttamente formattati, il prossimo passaggio è avvolgerli in un oggetto JSON e caricarli su IPFS tramite il `pinJSONToIPFS` che abbiamo scritto!

Per farlo, prima dobbiamo importare la funzione `pinJSONToIPFS` nel nostro file `interact.js`. In cima al `interact.js`, aggiungiamo:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Ricorda che `pinJSONToIPFS` riceve in un body JSON. Quindi, prima di effettuare una chiamata a esso, dovremo formattare i nostri parametri `url`, `name` e `description` in un oggetto JSON.

Aggiorniamo il nostro codice per creare un oggetto JSON chiamato `metadata` e poi effettuiamo una chiamata a `pinJSONToIPFS` con questo parametro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //make pinata call
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl
}
```

Nota che memorizziamo la risposta della nostra chiamata a `pinJSONToIPFS(metadata)` nell'oggetto `pinataResponse`. Analizziamo quindi questo oggetto alla ricerca di eventuali errori.

Se è presente un errore, restituiamo un oggetto JSON in cui il booleano `success` è impostato a false e la nostra stringa `status` indica che la nostra chiamata non è andata a buon fine. Altrimenti, estraiamo `pinataURL` dal `pinataResponse` e lo memorizziamo come la nostra variabile `tokenURI`.

È arrivato il momento di caricare il nostro smart contract usando l'API Alchemy Web3 che abbiamo inizializzato in cima al nostro file. Aggiungi la seguente riga di codice in fondo alla funzione `mintNFT` per impostare il contratto alla variabile globale `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

L'ultima cosa da aggiungere alla nostra funzione `mintNFT` è la nostra transazione di Ethereum:

```javascript
//set up your Ethereum transaction
const transactionParameters = {
  to: contractAddress, // Required except during contract publications.
  from: window.ethereum.selectedAddress, // must match user's active address.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), //make call to NFT smart contract
}

//sign the transaction via MetaMask
try {
  const txHash = await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [transactionParameters],
  })
  return {
    success: true,
    status:
      "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
      txHash,
  }
} catch (error) {
  return {
    success: false,
    status: "😥 Something went wrong: " + error.message,
  }
}
```

Se conosci già le transazioni di Ethereum, noterai che la struttura è abbastanza simile a quella che hai visto.

- Prima, configuriamo i parametri delle nostre transazioni.
  - `to` specifica l'indirizzo del destinatario \(il nostro smart contract\)
  - `from` specifica il firmatario della transazione \(l'indirizzo dell'utente connesso a MetaMask: `window.ethereum.selectedAddress`\)
  - `data` contiene la chiamata al metodo `mintNFT` del nostro smart contract, che riceve come input il nostro `tokenURI` e l'indirizzo del portafoglio dell'utente, `window.ethereum.selectedAddress`.
- Creiamo quindi una chiamata d'attesa, `window.ethereum.request,` in cui chiediamo a MetaMask di firmare la transazione. Nota che, in questa richiesta, stiamo specificando il nostro metodo eth \(eth_SentTransaction\) e passando il nostro `transactionParameters`. A questo punto, MetaMask si aprirà nel browser e richiederà all'utente di firmare o rifiutare la transazione.
  - Se la transazione va a buon fine, la funzione restituirà un oggetto JSON in cui il booleano `success` è impostato a true e la stringa `status` richiede all'utente di controllare Etherscan per ulteriori informazioni sulla sua transazione.
  - Se la transazione non va a buon fine, la funzione restituirà un oggetto JSON in cui il booleano `success` è impostato a false e la stringa `status` trasmette il messaggio d'errore.

Nel complesso, la nostra funzione `mintNFT` dovrebbe somigliare a questa:

```javascript
export const mintNFT = async (url, name, description) => {
  //error handling
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  //make metadata
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  //pinata pin request
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  //load smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) //loadContract();

  //set up your Ethereum transaction
  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), //make call to NFT smart contract
  }

  //sign transaction via MetaMask
  try {
    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [transactionParameters],
    })
    return {
      success: true,
      status:
        "✅ Check out your transaction on Etherscan: https://ropsten.etherscan.io/tx/" +
        txHash,
    }
  } catch (error) {
    return {
      success: false,
      status: "😥 Something went wrong: " + error.message,
    }
  }
}
```

Questa è una funzione gigante! Ora, dobbiamo solo connettere la nostra funzione `mintNFT` al nostro componente `Minter.js`...

## Connetti mintNFT al nostro frontend di Minter.js {#connect-our-frontend}

Apri il file `Minter.js` e aggiorna la riga `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` in alto affinché sia:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Infine, implementa la funzione `onMintPressed` per effettuare la chiamata d'attesa alla tua funzione `mintNFT` importata e aggiornare la variabile di stato `status` affinché rifletta se la nostra transazione è andata o meno a buon fine:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Distribuisci il tuo NFT a un sito web live {#deploy-your-NFT}

Pronto a portare in vita il tuo progetto affinché gli utenti vi interagiscano? Dai un'occhiata a [questo tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) per distribuire il tuo Coniatore su un sito web live.

Un ultimo passaggio...

## Prendi d'assalto il mondo della blockchain {#take-the-blockchain-world-by-storm}

Stiamo scherzando, sei arrivato alla fine del tutorial!

Per ricapitolare, creando un coniatore di NFT, hai imparato correttamente come:

- Connetterti a MetaMask tramite il progetto del tuo frontend
- Chiamare i metodi dello smart contract dal tuo frontend
- Firmare le transazioni usando MetaMask

Molto probabilmente vorrai mostrare gli NFT coniati tramite la tua dapp nel tuo portafoglio, dai quindi un'occhiata al nostro rapido tutorial [Come visualizzare il tuo NFT nel tuo Portafoglio](https://docs.alchemyapi.io/alchemy/tutorials/how-to-write-and-deploy-a-nft-smart-contract/how-to-view-your-nft-in-your-wallet)!

E, come sempre, se hai qualsiasi domanda, siamo qui per aiutare sul [Discord di Alchemy](https://discord.gg/gWuC7zB). Non vediamo l'ora di vedere come applicherai i concetti di questo tutorial ai tuoi progetti futuri!
