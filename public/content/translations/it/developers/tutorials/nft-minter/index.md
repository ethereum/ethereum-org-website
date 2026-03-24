---
title: Tutorial sul minter di NFT
description: In questo tutorial, costruirai un minter di NFT e imparerai come creare una dApp full stack collegando il tuo contratto intelligente a un frontend React utilizzando MetaMask e strumenti Web3.
author: "smudgil"
tags: ["Solidity", "NFT", "Alchemy", "contratti intelligenti", "frontend", "Pinata", "erc-721"]
skill: intermediate
breadcrumb: dApp per coniare NFT
lang: it
published: 2021-10-06
---

Una delle sfide più grandi per gli sviluppatori provenienti da un background Web2 è capire come collegare il proprio contratto intelligente a un progetto frontend e interagirvi.

Costruendo un minter di NFT — una semplice interfaccia utente in cui puoi inserire un link alla tua risorsa digitale, un titolo e una descrizione — imparerai come:

- Connetterti a MetaMask tramite il tuo progetto frontend
- Chiamare i metodi del contratto intelligente dal tuo frontend
- Firmare le transazioni usando MetaMask

In questo tutorial, utilizzeremo [React](https://react.dev/) come nostro framework frontend. Poiché questo tutorial è incentrato principalmente sullo sviluppo Web3, non dedicheremo molto tempo ad analizzare i fondamenti di React. Ci concentreremo invece sull'aggiunta di funzionalità al nostro progetto.

Come prerequisito, dovresti avere una comprensione di livello base di React: sapere come funzionano i componenti, le prop, useState/useEffect e le chiamate di funzioni di base. Se non hai mai sentito nessuno di questi termini prima, potresti voler dare un'occhiata a questo [Tutorial introduttivo a React](https://react.dev/learn/tutorial-tic-tac-toe). Per chi apprende in modo più visivo, consigliamo vivamente questa eccellente serie di video [Full Modern React Tutorial](https://www.youtube.com/playlist?list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d) di Net Ninja.

E se non lo hai già fatto, avrai sicuramente bisogno di un account Alchemy per completare questo tutorial e per costruire qualsiasi cosa sulla blockchain. Registrati per un account gratuito [qui](https://alchemy.com/).

Senza ulteriori indugi, iniziamo!

## Creare NFT 101 {#making-nfts-101}

Prima ancora di iniziare a guardare il codice, è importante capire come funziona la creazione di un NFT. Prevede due passaggi:

### Pubblicare un contratto intelligente per NFT sulla blockchain di Ethereum {#publish-nft}

La più grande differenza tra i due standard di contratti intelligenti per NFT è che l'ERC-1155 è uno standard multi-token e include funzionalità in batch, mentre l'ERC-721 è uno standard a token singolo e pertanto supporta solo il trasferimento di un token alla volta.

### Chiamare la funzione per coniare {#minting-function}

Di solito, questa funzione per coniare richiede di passare due variabili come parametri: primo, il `recipient`, che specifica l'indirizzo che riceverà il tuo NFT appena coniato, e secondo, il `tokenURI` dell'NFT, una stringa che si risolve in un documento JSON che descrive i metadati dell'NFT.

I metadati di un NFT sono in realtà ciò che gli dà vita, consentendogli di avere proprietà, come un nome, una descrizione, un'immagine (o una diversa risorsa digitale) e altri attributi. Ecco [un esempio di tokenURI](https://gateway.pinata.cloud/ipfs/QmSvBcb4tjdFpajGJhbFAWeK3JAxCdNQLQtr6ZdiSi42V2), che contiene i metadati di un NFT.

In questo tutorial, ci concentreremo sulla parte 2, chiamando la funzione per coniare di un contratto intelligente di un NFT esistente utilizzando la nostra interfaccia utente React.

[Ecco un link](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE) al contratto intelligente dell'NFT ERC-721 che chiameremo in questo tutorial. Se desideri imparare come lo abbiamo realizzato, ti consigliamo vivamente di dare un'occhiata al nostro altro tutorial, ["Come creare un NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

Fantastico, ora che abbiamo capito come funziona la creazione di un NFT, cloniamo i nostri file di partenza!

## Clonare i file di partenza {#clone-the-starter-files}

Per prima cosa, vai al [repository GitHub nft-minter-tutorial](https://github.com/alchemyplatform/nft-minter-tutorial) per ottenere i file di partenza per questo progetto. Clona questo repository nel tuo ambiente locale.

Quando apri questo repository `nft-minter-tutorial` clonato, noterai che contiene due cartelle: `minter-starter-files` e `nft-minter`.

- `minter-starter-files` contiene i file di partenza (essenzialmente l'interfaccia utente React) per questo progetto. In questo tutorial, **lavoreremo in questa directory**, mentre impari come dare vita a questa interfaccia utente collegandola al tuo portafoglio Ethereum e a un contratto intelligente per NFT.
- `nft-minter` contiene l'intero tutorial completato ed è lì per te come **riferimento** **se rimani bloccato.**

Successivamente, apri la tua copia di `minter-starter-files` nel tuo editor di codice, e poi naviga nella tua cartella `src`.

Tutto il codice che scriveremo risiederà nella cartella `src`. Modificheremo il componente `Minter.js` e scriveremo file javascript aggiuntivi per dare al nostro progetto funzionalità Web3.

## Passaggio 2: Dai un'occhiata ai nostri file di partenza {#step-2-check-out-our-starter-files}

Prima di iniziare a programmare, è importante dare un'occhiata a ciò che ci è già stato fornito nei file di partenza.

### Avviare il tuo progetto react {#get-your-react-project-running}

Iniziamo eseguendo il progetto React nel nostro browser. Il bello di React è che una volta che abbiamo il nostro progetto in esecuzione nel browser, qualsiasi modifica salvata verrà aggiornata in tempo reale nel browser.

Per avviare il progetto, naviga nella directory principale della cartella `minter-starter-files` ed esegui `npm install` nel tuo terminale per installare le dipendenze del progetto:

```bash
cd minter-starter-files
npm install
```

Una volta terminata l'installazione, esegui `npm start` nel tuo terminale:

```bash
npm start
```

Così facendo dovrebbe aprirsi http://localhost:3000/ nel tuo browser, dove vedrai il frontend per il nostro progetto. Dovrebbe consistere in 3 campi: un posto dove inserire un link alla risorsa del tuo NFT, inserire il nome del tuo NFT e fornire una descrizione.

Se provi a cliccare sui pulsanti "Connect Wallet" o "Mint NFT", noterai che non funzionano: questo perché dobbiamo ancora programmare la loro funzionalità! :\)

### Il componente Minter.js {#minter-js}

**NOTA:** Assicurati di essere nella cartella `minter-starter-files` e non nella cartella `nft-minter`!

Torniamo nella cartella `src` nel nostro editor e apriamo il file `Minter.js`. È importantissimo comprendere tutto in questo file, poiché è il componente React principale su cui lavoreremo.

All'inizio di questo file, abbiamo le nostre variabili di stato che aggiorneremo dopo eventi specifici.

```javascript
// Variabili di stato
const [walletAddress, setWallet] = useState("")
const [status, setStatus] = useState("")
const [name, setName] = useState("")
const [description, setDescription] = useState("")
const [url, setURL] = useState("")
```

Mai sentito parlare di variabili di stato o hook di stato di React? Dai un'occhiata a [questa](https://legacy.reactjs.org/docs/hooks-state.html) documentazione.

Ecco cosa rappresenta ciascuna delle variabili:

- `walletAddress` - una stringa che memorizza l'indirizzo del portafoglio dell'utente
- `status` - una stringa che contiene un messaggio da visualizzare nella parte inferiore dell'interfaccia utente
- `name` - una stringa che memorizza il nome dell'NFT
- `description` - una stringa che memorizza la descrizione dell'NFT
- `url` - una stringa che è un link alla risorsa digitale dell'NFT

Dopo le variabili di stato, vedrai tre funzioni non implementate: `useEffect`, `connectWalletPressed` e `onMintPressed`. Noterai che tutte queste funzioni sono `async`, questo perché effettueremo chiamate API asincrone al loro interno! I loro nomi sono eponimi delle loro funzionalità:

```javascript
useEffect(async () => {
  // TODO: implementare
}, [])

const connectWalletPressed = async () => {
  // TODO: implementare
}

const onMintPressed = async () => {
  // TODO: implementare
}
```

- [`useEffect`](https://legacy.reactjs.org/docs/hooks-effect.html) - questo è un hook di React che viene chiamato dopo il rendering del tuo componente. Poiché gli viene passata una prop array vuota `[]` (vedi riga 3), verrà chiamato solo al _primo_ rendering del componente. Qui chiameremo il nostro listener del portafoglio e un'altra funzione del portafoglio per aggiornare la nostra interfaccia utente in modo da riflettere se un portafoglio è già connesso.
- `connectWalletPressed` - questa funzione verrà chiamata per connettere il portafoglio MetaMask dell'utente alla nostra dApp.
- `onMintPressed` - questa funzione verrà chiamata per coniare l'NFT dell'utente.

Verso la fine di questo file, abbiamo l'interfaccia utente del nostro componente. Se esamini attentamente questo codice, noterai che aggiorniamo le nostre variabili di stato `url`, `name` e `description` quando cambia l'input nei rispettivi campi di testo.

Vedrai anche che `connectWalletPressed` e `onMintPressed` vengono chiamate quando si fa clic rispettivamente sui pulsanti con ID `mintButton` e `walletButton`.

```javascript
// la UI del nostro componente
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
        placeholder="e.g., https://gateway.pinata.cloud/ipfs/<hash>"
        onChange={(event) => setURL(event.target.value)}
      />
      <h2>🤔 Name: </h2>
      <input
        type="text"
        placeholder="e.g., My first NFT!"
        onChange={(event) => setName(event.target.value)}
      />
      <h2>✍️ Description: </h2>
      <input
        type="text"
        placeholder="e.g., Even cooler than cryptokitties ;)"
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

Infine, vediamo dove viene aggiunto questo componente Minter.

Se vai al file `App.js`, che è il componente principale in React che funge da contenitore per tutti gli altri componenti, vedrai che il nostro componente Minter è iniettato alla riga 7.

**In questo tutorial, modificheremo solo il file `Minter.js` e aggiungeremo file nella nostra cartella `src`.**

Ora che abbiamo capito con cosa stiamo lavorando, configuriamo il nostro portafoglio Ethereum!

## Configurare il tuo portafoglio Ethereum {#set-up-your-ethereum-wallet}

Affinché gli utenti possano interagire con il tuo contratto intelligente, dovranno connettere il loro portafoglio Ethereum alla tua dApp.

### Scaricare MetaMask {#download-metamask}

Per questo tutorial, useremo MetaMask, un portafoglio virtuale nel browser utilizzato per gestire l'indirizzo del tuo account Ethereum. Se vuoi capire meglio come funzionano le transazioni su Ethereum, dai un'occhiata a [questa pagina](/developers/docs/transactions/).

Puoi scaricare e creare un account MetaMask gratuitamente [qui](https://metamask.io/download). Quando crei un account, o se ne hai già uno, assicurati di passare alla "Rete di test Ropsten" in alto a destra \(in modo da non avere a che fare con denaro reale\).

### Aggiungere ether da un rubinetto {#add-ether-from-faucet}

Per coniare i nostri NFT (o firmare qualsiasi transazione sulla blockchain di Ethereum), avremo bisogno di alcuni ETH finti. Per ottenere ETH puoi andare al [rubinetto Ropsten](https://faucet.ropsten.be/) e inserire l'indirizzo del tuo account Ropsten, quindi cliccare su "Send Ropsten Eth". Dovresti vedere gli ETH nel tuo account MetaMask poco dopo!

### Controllare il tuo saldo {#check-your-balance}

Per verificare che il nostro saldo sia presente, facciamo una richiesta [eth_getBalance](https://docs.alchemyapi.io/alchemy/documentation/alchemy-api-reference/json-rpc#eth_getbalance) utilizzando lo [strumento composer di Alchemy](https://composer.alchemyapi.io/?composer_state=%7B%22network%22%3A0%2C%22methodName%22%3A%22eth_getBalance%22%2C%22paramValues%22%3A%5B%22%22%2C%22latest%22%5D%7D). Questo restituirà la quantità di ETH nel nostro portafoglio. Dopo aver inserito l'indirizzo del tuo account MetaMask e cliccato su "Send Request", dovresti vedere una risposta come questa:

```text
{"jsonrpc": "2.0", "id": 0, "result": "0xde0b6b3a7640000"}
```

**NOTA:** Questo risultato è in wei, non in eth. Il wei è utilizzato come la più piccola denominazione di ether. La conversione da wei a eth è: 1 eth = 10¹⁸ wei. Quindi, se convertiamo 0xde0b6b3a7640000 in decimale, otteniamo 1\*10¹⁸ che equivale a 1 eth.

Fiuu! I nostri soldi finti ci sono tutti! <Emoji text=":money_mouth_face:" size={1} />

## Connettere MetaMask alla tua interfaccia utente {#connect-metamask-to-your-UI}

Ora che il nostro portafoglio MetaMask è configurato, connettiamo la nostra dApp ad esso!

Poiché vogliamo attenerci al paradigma [MVC](https://it.wikipedia.org/wiki/Model-view-controller), creeremo un file separato che contiene le nostre funzioni per gestire la logica, i dati e le regole della nostra dApp, per poi passare quelle funzioni al nostro frontend (il nostro componente Minter.js).

### La funzione connectWallet {#connect-wallet-function}

Per farlo, creiamo una nuova cartella chiamata `utils` nella tua directory `src` e aggiungiamo un file chiamato `interact.js` al suo interno, che conterrà tutte le nostre funzioni di interazione con il portafoglio e il contratto intelligente.

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Per prima cosa, la nostra funzione controlla se `window.ethereum` è abilitato nel tuo browser.

`window.ethereum` è un'API globale iniettata da MetaMask e da altri provider di portafogli che consente ai siti web di richiedere gli account Ethereum degli utenti. Se approvata, può leggere i dati dalle blockchain a cui l'utente è connesso e suggerire all'utente di firmare messaggi e transazioni. Dai un'occhiata alla [documentazione di MetaMask](https://docs.metamask.io/guide/ethereum-provider.html#table-of-contents) per maggiori informazioni!

Se `window.ethereum` _non è_ presente, significa che MetaMask non è installato. Ciò si traduce nella restituzione di un oggetto JSON, in cui l'`address` restituito è una stringa vuota e l'oggetto JSX `status` comunica che l'utente deve installare MetaMask.

**La maggior parte delle funzioni che scriveremo restituirà oggetti JSON che possiamo usare per aggiornare le nostre variabili di stato e l'interfaccia utente.**

Ora, se `window.ethereum` _è_ presente, è qui che le cose si fanno interessanti.

Utilizzando un blocco try/catch, proveremo a connetterci a MetaMask chiamando [`window.ethereum.request({ method: "eth_requestAccounts" });`](https://docs.metamask.io/guide/rpc-api.html#eth-requestaccounts). La chiamata a questa funzione aprirà MetaMask nel browser, per cui all'utente verrà richiesto di connettere il proprio portafoglio alla tua dApp.

- Se l'utente sceglie di connettersi, `method: "eth_requestAccounts"` restituirà un array che contiene tutti gli indirizzi degli account dell'utente connessi alla dApp. Nel complesso, la nostra funzione `connectWallet` restituirà un oggetto JSON che contiene il _primo_ `address` in questo array \(vedi riga 9\) e un messaggio di `status` che invita l'utente a scrivere un messaggio al contratto intelligente.
- Se l'utente rifiuta la connessione, l'oggetto JSON conterrà una stringa vuota per l'`address` restituito e un messaggio di `status` che riflette il fatto che l'utente ha rifiutato la connessione.

### Aggiungere la funzione connectWallet al tuo componente dell'interfaccia utente Minter.js {#add-connect-wallet}

Ora che abbiamo scritto questa funzione `connectWallet`, connettiamola al nostro componente `Minter.js.`.

Per prima cosa, dovremo importare la nostra funzione nel nostro file `Minter.js` aggiungendo `import { connectWallet } from "./utils/interact.js";` all'inizio del file `Minter.js`. Le tue prime 11 righe di `Minter.js` dovrebbero ora apparire così:

```javascript
import { useEffect, useState } from "react";
import { connectWallet } from "./utils/interact.js";

const Minter = (props) => {

  // Variabili di stato
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setURL] = useState("");
```

Quindi, all'interno della nostra funzione `connectWalletPressed`, chiameremo la nostra funzione `connectWallet` importata, in questo modo:

```javascript
const connectWalletPressed = async () => {
  const walletResponse = await connectWallet()
  setStatus(walletResponse.status)
  setWallet(walletResponse.address)
}
```

Noti come la maggior parte delle nostre funzionalità sia astratta dal nostro componente `Minter.js` nel file `interact.js`? Questo per rispettare il paradigma M-V-C!

In `connectWalletPressed`, effettuiamo semplicemente una chiamata await alla nostra funzione `connectWallet` importata e, utilizzando la sua risposta, aggiorniamo le nostre variabili `status` e `walletAddress` tramite i loro hook di stato.

Ora, salviamo entrambi i file `Minter.js` e `interact.js` e testiamo la nostra interfaccia utente finora.

Apri il tuo browser su localhost:3000 e premi il pulsante "Connect Wallet" in alto a destra nella pagina.

Se hai installato MetaMask, ti dovrebbe essere richiesto di connettere il tuo portafoglio alla tua dApp. Accetta l'invito a connetterti.

Dovresti vedere che il pulsante del portafoglio ora riflette che il tuo indirizzo è connesso.

Successivamente, prova ad aggiornare la pagina... questo è strano. Il nostro pulsante del portafoglio ci chiede di connettere MetaMask, anche se è già connesso...

Non preoccuparti però! Possiamo risolverlo facilmente implementando una funzione chiamata `getCurrentWalletConnected`, che controllerà se un indirizzo è già connesso alla nostra dApp e aggiornerà la nostra interfaccia utente di conseguenza!

### La funzione getCurrentWalletConnected {#get-current-wallet}

Nel tuo file `interact.js`, aggiungi la seguente funzione `getCurrentWalletConnected`:

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
            🦊 <a target="_blank" href={`https://metamask.io/download`}>
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

Questo codice è _molto_ simile alla funzione `connectWallet` che abbiamo appena scritto in precedenza.

La differenza principale è che invece di chiamare il metodo `eth_requestAccounts`, che apre MetaMask affinché l'utente connetta il proprio portafoglio, qui chiamiamo il metodo `eth_accounts`, che restituisce semplicemente un array contenente gli indirizzi MetaMask attualmente connessi alla nostra dApp.

Per vedere questa funzione in azione, chiamiamola nella funzione `useEffect` del nostro componente `Minter.js`.

Come abbiamo fatto per `connectWallet`, dobbiamo importare questa funzione dal nostro file `interact.js` nel nostro file `Minter.js` in questo modo:

```javascript
import { useEffect, useState } from "react"
import {
  connectWallet,
  getCurrentWalletConnected, // importa qui
} from "./utils/interact.js"
```

Ora, la chiamiamo semplicemente nella nostra funzione `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)
}, [])
```

Nota, usiamo la risposta della nostra chiamata a `getCurrentWalletConnected` per aggiornare le nostre variabili di stato `walletAddress` e `status`.

Una volta aggiunto questo codice, prova ad aggiornare la finestra del browser. Il pulsante dovrebbe dire che sei connesso e mostrare un'anteprima dell'indirizzo del tuo portafoglio connesso, anche dopo l'aggiornamento!

### Implementare addWalletListener {#implement-add-wallet-listener}

Il passaggio finale nella configurazione del portafoglio della nostra dApp è l'implementazione del listener del portafoglio in modo che la nostra interfaccia utente si aggiorni quando lo stato del nostro portafoglio cambia, ad esempio quando l'utente si disconnette o cambia account.

Nel tuo file `Minter.js`, aggiungi una funzione `addWalletListener` che assomigli alla seguente:

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
        🦊 <a target="_blank" href={`https://metamask.io/download`}>
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>
    )
  }
}
```

Analizziamo rapidamente cosa sta succedendo qui:

- Per prima cosa, la nostra funzione controlla se `window.ethereum` è abilitato \(cioè, MetaMask è installato\).
  - Se non lo è, impostiamo semplicemente la nostra variabile di stato `status` su una stringa JSX che invita l'utente a installare MetaMask.
  - Se è abilitato, impostiamo il listener `window.ethereum.on("accountsChanged")` alla riga 3 che ascolta i cambiamenti di stato nel portafoglio MetaMask, che includono quando l'utente connette un account aggiuntivo alla dApp, cambia account o disconnette un account. Se c'è almeno un account connesso, la variabile di stato `walletAddress` viene aggiornata come il primo account nell'array `accounts` restituito dal listener. Altrimenti, `walletAddress` viene impostato come una stringa vuota.

Infine, dobbiamo chiamarla nella nostra funzione `useEffect`:

```javascript
useEffect(async () => {
  const { address, status } = await getCurrentWalletConnected()
  setWallet(address)
  setStatus(status)

  addWalletListener()
}, [])
```

E voilà! Abbiamo completato la programmazione di tutte le funzionalità del nostro portafoglio! Ora che il nostro portafoglio è configurato, scopriamo come coniare il nostro NFT!

## Metadati NFT 101 {#nft-metadata-101}

Quindi ricorda i metadati dell'NFT di cui abbiamo appena parlato nel Passaggio 0 di questo tutorial: danno vita a un NFT, consentendogli di avere proprietà, come una risorsa digitale, un nome, una descrizione e altri attributi.

Dovremo configurare questi metadati come un oggetto JSON e memorizzarli, in modo da poterli passare come parametro `tokenURI` quando chiamiamo la funzione `mintNFT` del nostro contratto intelligente.

Il testo nei campi "Link to Asset", "Name", "Description" comprenderà le diverse proprietà dei metadati del nostro NFT. Formatteremo questi metadati come un oggetto JSON, ma ci sono un paio di opzioni su dove possiamo memorizzare questo oggetto JSON:

- Potremmo memorizzarlo sulla blockchain di Ethereum; tuttavia, farlo sarebbe molto costoso.
- Potremmo memorizzarlo su un server centralizzato, come AWS o Firebase. Ma ciò vanificherebbe la nostra etica di decentralizzazione.
- Potremmo usare IPFS, un protocollo decentralizzato e una rete peer-to-peer per l'archiviazione e la condivisione di dati in un file system distribuito. Poiché questo protocollo è decentralizzato e gratuito, è la nostra migliore opzione!

Per memorizzare i nostri metadati su IPFS, useremo [Pinata](https://pinata.cloud/), una comoda API e toolkit IPFS. Nel prossimo passaggio, spiegheremo esattamente come farlo!

## Usare Pinata per fissare i tuoi metadati su IPFS {#use-pinata-to-pin-your-metadata-to-IPFS}

Se non hai un account [Pinata](https://pinata.cloud/), registrati per un account gratuito [qui](https://app.pinata.cloud/auth/signup) e completa i passaggi per verificare la tua email e il tuo account.

### Creare la tua chiave API Pinata {#create-pinata-api-key}

Naviga alla pagina [https://pinata.cloud/keys](https://pinata.cloud/keys), quindi seleziona il pulsante "New Key" in alto, imposta il widget Admin come abilitato e dai un nome alla tua chiave.

Ti verrà quindi mostrato un popup con le informazioni della tua API. Assicurati di metterle in un posto sicuro.

Ora che la nostra chiave è configurata, aggiungiamola al nostro progetto in modo da poterla usare.

### Creare un file .env {#create-a-env}

Possiamo memorizzare in modo sicuro la nostra chiave e il segreto Pinata in un file di ambiente. Installiamo il [pacchetto dotenv](https://www.npmjs.com/package/dotenv) nella directory del tuo progetto.

Apri una nuova scheda nel tuo terminale \(separata da quella che esegue il localhost\) e assicurati di essere nella cartella `minter-starter-files`, quindi esegui il seguente comando nel tuo terminale:

```text
npm install dotenv --save
```

Successivamente, crea un file `.env` nella directory principale dei tuoi `minter-starter-files` inserendo quanto segue nella riga di comando:

```javascript
vim.env
```

Questo aprirà il tuo file `.env` in vim \(un editor di testo\). Per salvarlo premi "esc" + ":" + "q" sulla tua tastiera in quest'ordine.

Successivamente, in VSCode, naviga al tuo file `.env` e aggiungi la tua chiave API e il segreto API Pinata ad esso, in questo modo:

```text
REACT_APP_PINATA_KEY = <pinata-api-key>
REACT_APP_PINATA_SECRET = <pinata-api-secret>
```

Salva il file e poi sei pronto per iniziare a scrivere la funzione per caricare i tuoi metadati JSON su IPFS!

### Implementare pinJSONToIPFS {#pin-json-to-ipfs}

Fortunatamente per noi, Pinata ha un'[API specifica per caricare dati JSON su IPFS](https://docs.pinata.cloud/api-reference/endpoint/ipfs/pin-json-to-ipfs#pin-json) e un comodo esempio JavaScript con axios che possiamo usare, con alcune lievi modifiche.

Nella tua cartella `utils`, creiamo un altro file chiamato `pinata.js` e poi importiamo il nostro segreto e la chiave Pinata dal file .env in questo modo:

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET
```

Successivamente, incolla il codice aggiuntivo qui sotto nel tuo file `pinata.js`. Non preoccuparti, analizzeremo cosa significa tutto!

```javascript
require("dotenv").config()
const key = process.env.REACT_APP_PINATA_KEY
const secret = process.env.REACT_APP_PINATA_SECRET

const axios = require("axios")

export const pinJSONToIPFS = async (JSONBody) => {
  const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
  // effettuando la richiesta POST con axios a Pinata ⬇️
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

Quindi cosa fa esattamente questo codice?

Per prima cosa, importa [axios](https://www.npmjs.com/package/axios), un client HTTP basato su promise per il browser e node.js, che useremo per fare una richiesta a Pinata.

Poi abbiamo la nostra funzione asincrona `pinJSONToIPFS`, che prende un `JSONBody` come input e la chiave e il segreto api Pinata nel suo header, il tutto per fare una richiesta POST alla loro API `pinJSONToIPFS`.

- Se questa richiesta POST ha successo, la nostra funzione restituisce un oggetto JSON con il booleano `success` come true e il `pinataUrl` in cui sono stati fissati i nostri metadati. Useremo questo `pinataUrl` restituito come input `tokenURI` per la funzione per coniare del nostro contratto intelligente.
- Se questa richiesta post fallisce, la nostra funzione restituisce un oggetto JSON con il booleano `success` come false e una stringa `message` che comunica il nostro errore.

Come per i tipi di ritorno della nostra funzione `connectWallet`, stiamo restituendo oggetti JSON in modo da poter usare i loro parametri per aggiornare le nostre variabili di stato e l'interfaccia utente.

## Caricare il tuo contratto intelligente {#load-your-smart-contract}

Ora che abbiamo un modo per caricare i metadati del nostro NFT su IPFS tramite la nostra funzione `pinJSONToIPFS`, avremo bisogno di un modo per caricare un'istanza del nostro contratto intelligente in modo da poter chiamare la sua funzione `mintNFT`.

Come abbiamo menzionato in precedenza, in questo tutorial useremo [questo contratto intelligente per NFT esistente](https://ropsten.etherscan.io/address/0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE); tuttavia, se desideri imparare come lo abbiamo realizzato, o crearne uno tu stesso, ti consigliamo vivamente di dare un'occhiata al nostro altro tutorial, ["Come creare un NFT"](https://www.alchemy.com/docs/how-to-create-an-nft).

### L'ABI del contratto {#contract-abi}

Se hai esaminato attentamente i nostri file, avrai notato che nella nostra directory `src` c'è un file `contract-abi.json`. Un'ABI è necessaria per specificare quale funzione invocherà un contratto, oltre a garantire che la funzione restituirà i dati nel formato che ti aspetti.

Avremo anche bisogno di una chiave API Alchemy e dell'API Alchemy Web3 per connetterci alla blockchain di Ethereum e caricare il nostro contratto intelligente.

### Creare la tua chiave API Alchemy {#create-alchemy-api}

Se non hai già un account Alchemy, [registrati gratuitamente qui.](https://alchemy.com/?a=eth-org-nft-minter)

Una volta creato un account Alchemy, puoi generare una chiave API creando un'app. Questo ci consentirà di fare richieste alla rete di test Ropsten.

Naviga alla pagina "Create App" nella tua Dashboard Alchemy passando il mouse su "Apps" nella barra di navigazione e cliccando su "Create App".

Dai un nome alla tua app, noi abbiamo scelto "My First NFT!", offri una breve descrizione, seleziona "Staging" per l'Ambiente utilizzato per la contabilità della tua app e scegli "Ropsten" per la tua rete.

Clicca su "Create app" e il gioco è fatto! La tua app dovrebbe apparire nella tabella sottostante.

Fantastico, quindi ora che abbiamo creato il nostro URL API HTTP Alchemy, copialo negli appunti...

…e poi aggiungiamolo al nostro file `.env`. Nel complesso, il tuo file .env dovrebbe apparire così:

```text
REACT_APP_PINATA_KEY = <pinata-key>
REACT_APP_PINATA_SECRET = <pinata-secret>
REACT_APP_ALCHEMY_KEY = https: // eth-ropsten.alchemyapi.io/v2/<alchemy-key>
```

Ora che abbiamo l'ABI del nostro contratto e la nostra chiave API Alchemy, siamo pronti per caricare il nostro contratto intelligente utilizzando [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3).

### Configurare il tuo endpoint Alchemy Web3 e il contratto {#setup-alchemy-endpoint}

Per prima cosa, se non lo hai già, dovrai installare [Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) navigando nella directory home: `nft-minter-tutorial` nel terminale:

```text
cd ..
npm install @alch/alchemy-web3
```

Successivamente torniamo al nostro file `interact.js`. All'inizio del file, aggiungi il seguente codice per importare la tua chiave Alchemy dal tuo file .env e configurare il tuo endpoint Alchemy Web3:

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)
```

[Alchemy Web3](https://github.com/alchemyplatform/alchemy-web3) è un wrapper attorno a [Web3.js](https://docs.web3js.org/), che fornisce metodi API migliorati e altri vantaggi cruciali per semplificarti la vita come sviluppatore web3. È progettato per richiedere una configurazione minima in modo da poter iniziare a usarlo subito nella tua app!

Successivamente, aggiungiamo l'ABI del nostro contratto e l'indirizzo del contratto al nostro file.

```javascript
require("dotenv").config()
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)

const contractABI = require("../contract-abi.json")
const contractAddress = "0x4C4a07F737Bf57F6632B6CAB089B78f62385aCaE"
```

Una volta che li abbiamo entrambi, siamo pronti per iniziare a programmare la nostra funzione per coniare!

## Implementare la funzione mintNFT {#implement-the-mintnft-function}

All'interno del tuo file `interact.js`, definiamo la nostra funzione, `mintNFT`, che eponimamente conierà il nostro NFT.

Poiché effettueremo numerose chiamate asincrone \(a Pinata per fissare i nostri metadati su IPFS, ad Alchemy Web3 per caricare il nostro contratto intelligente e a MetaMask per firmare le nostre transazioni\), anche la nostra funzione sarà asincrona.

I tre input per la nostra funzione saranno l'`url` della nostra risorsa digitale, il `name` e la `description`. Aggiungi la seguente firma della funzione sotto la funzione `connectWallet`:

```javascript
export const mintNFT = async (url, name, description) => {}
```

### Gestione degli errori di input {#input-error-handling}

Naturalmente, ha senso avere una sorta di gestione degli errori di input all'inizio della funzione, in modo da uscire da questa funzione se i nostri parametri di input non sono corretti. All'interno della nostra funzione, aggiungiamo il seguente codice:

```javascript
export const mintNFT = async (url, name, description) => {
  // gestione degli errori
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }
}
```

Essenzialmente, se uno qualsiasi dei parametri di input è una stringa vuota, restituiamo un oggetto JSON in cui il booleano `success` è false e la stringa `status` comunica che tutti i campi nella nostra interfaccia utente devono essere completati.

### Caricare i metadati su IPFS {#upload-metadata-to-ipfs}

Una volta che sappiamo che i nostri metadati sono formattati correttamente, il passaggio successivo è racchiuderli in un oggetto JSON e caricarli su IPFS tramite la funzione `pinJSONToIPFS` che abbiamo scritto!

Per farlo, dobbiamo prima importare la funzione `pinJSONToIPFS` nel nostro file `interact.js`. Proprio all'inizio di `interact.js`, aggiungiamo:

```javascript
import { pinJSONToIPFS } from "./pinata.js"
```

Ricorda che `pinJSONToIPFS` accetta un corpo JSON. Quindi, prima di effettuare una chiamata ad essa, dovremo formattare i nostri parametri `url`, `name` e `description` in un oggetto JSON.

Aggiorniamo il nostro codice per creare un oggetto JSON chiamato `metadata` e poi effettuiamo una chiamata a `pinJSONToIPFS` con questo parametro `metadata`:

```javascript
export const mintNFT = async (url, name, description) => {
  // gestione degli errori
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // crea i metadati
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // effettua la chiamata a pinata
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

Nota, memorizziamo la risposta della nostra chiamata a `pinJSONToIPFS(metadata)` nell'oggetto `pinataResponse`. Quindi, analizziamo questo oggetto per eventuali errori.

Se c'è un errore, restituiamo un oggetto JSON in cui il booleano `success` è false e la nostra stringa `status` comunica che la nostra chiamata è fallita. Altrimenti, estraiamo il `pinataURL` dalla `pinataResponse` e lo memorizziamo come nostra variabile `tokenURI`.

Ora è il momento di caricare il nostro contratto intelligente utilizzando l'API Alchemy Web3 che abbiamo inizializzato all'inizio del nostro file. Aggiungi la seguente riga di codice in fondo alla funzione `mintNFT` per impostare il contratto nella variabile globale `window.contract`:

```javascript
window.contract = await new web3.eth.Contract(contractABI, contractAddress)
```

L'ultima cosa da aggiungere nella nostra funzione `mintNFT` è la nostra transazione Ethereum:

```javascript
// imposta la tua transazione Ethereum
const transactionParameters = {
  to: contractAddress, // Obbligatorio tranne durante le pubblicazioni del contratto.
  from: window.ethereum.selectedAddress, // deve corrispondere all'indirizzo attivo dell'utente.
  data: window.contract.methods
    .mintNFT(window.ethereum.selectedAddress, tokenURI)
    .encodeABI(), // effettua la chiamata allo smart contract NFT
}

// firma la transazione tramite MetaMask
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

Se hai già familiarità con le transazioni Ethereum, noterai che la struttura è abbastanza simile a quella che hai visto.

- Per prima cosa, impostiamo i parametri delle nostre transazioni.
  - `to` specifica l'indirizzo del destinatario \(il nostro contratto intelligente\)
  - `from` specifica il firmatario della transazione \(l'indirizzo dell'utente connesso a MetaMask: `window.ethereum.selectedAddress`\)
  - `data` contiene la chiamata al metodo `mintNFT` del nostro contratto intelligente, che riceve il nostro `tokenURI` e l'indirizzo del portafoglio dell'utente, `window.ethereum.selectedAddress`, come input
- Quindi, effettuiamo una chiamata await, `window.ethereum.request,` in cui chiediamo a MetaMask di firmare la transazione. Nota, in questa richiesta, stiamo specificando il nostro metodo eth \(eth_SentTransaction\) e passando i nostri `transactionParameters`. A questo punto, MetaMask si aprirà nel browser e chiederà all'utente di firmare o rifiutare la transazione.
  - Se la transazione ha successo, la funzione restituirà un oggetto JSON in cui il booleano `success` è impostato su true e la stringa `status` invita l'utente a controllare Etherscan per maggiori informazioni sulla sua transazione.
  - Se la transazione fallisce, la funzione restituirà un oggetto JSON in cui il booleano `success` è impostato su false e la stringa `status` comunica il messaggio di errore.

Nel complesso, la nostra funzione `mintNFT` dovrebbe apparire così:

```javascript
export const mintNFT = async (url, name, description) => {
  // gestione degli errori
  if (url.trim() == "" || name.trim() == "" || description.trim() == "") {
    return {
      success: false,
      status: "❗Please make sure all fields are completed before minting.",
    }
  }

  // crea i metadati
  const metadata = new Object()
  metadata.name = name
  metadata.image = url
  metadata.description = description

  // richiesta di pin a pinata
  const pinataResponse = await pinJSONToIPFS(metadata)
  if (!pinataResponse.success) {
    return {
      success: false,
      status: "😢 Something went wrong while uploading your tokenURI.",
    }
  }
  const tokenURI = pinataResponse.pinataUrl

  // carica lo smart contract
  window.contract = await new web3.eth.Contract(contractABI, contractAddress) // loadContract();

  // imposta la tua transazione Ethereum
  const transactionParameters = {
    to: contractAddress, // Obbligatorio tranne durante le pubblicazioni del contratto.
    from: window.ethereum.selectedAddress, // deve corrispondere all'indirizzo attivo dell'utente.
    data: window.contract.methods
      .mintNFT(window.ethereum.selectedAddress, tokenURI)
      .encodeABI(), // effettua la chiamata allo smart contract NFT
  }

  // firma la transazione tramite MetaMask
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

È una funzione gigantesca! Ora, dobbiamo solo connettere la nostra funzione `mintNFT` al nostro componente `Minter.js`...

## Connettere mintNFT al nostro frontend Minter.js {#connect-our-frontend}

Apri il tuo file `Minter.js` e aggiorna la riga `import { connectWallet, getCurrentWalletConnected } from "./utils/interact.js";` in alto in modo che sia:

```javascript
import {
  connectWallet,
  getCurrentWalletConnected,
  mintNFT,
} from "./utils/interact.js"
```

Infine, implementa la funzione `onMintPressed` per effettuare una chiamata await alla tua funzione `mintNFT` importata e aggiornare la variabile di stato `status` per riflettere se la nostra transazione ha avuto successo o è fallita:

```javascript
const onMintPressed = async () => {
  const { status } = await mintNFT(url, name, description)
  setStatus(status)
}
```

## Distribuire il tuo NFT su un sito web live {#deploy-your-NFT}

Pronto a portare il tuo progetto live affinché gli utenti possano interagirvi? Dai un'occhiata a [questo tutorial](https://docs.alchemy.com/alchemy/tutorials/nft-minter/how-do-i-deploy-nfts-online) per distribuire il tuo Minter su un sito web live.

Un ultimo passaggio...

## Prendi d'assalto il mondo della blockchain {#take-the-blockchain-world-by-storm}

Scherzavo, sei arrivato alla fine del tutorial!

Per riassumere, costruendo un minter di NFT, hai imparato con successo come:

- Connetterti a MetaMask tramite il tuo progetto frontend
- Chiamare i metodi del contratto intelligente dal tuo frontend
- Firmare le transazioni usando MetaMask

Presumibilmente, ti piacerebbe poter mostrare gli NFT coniati tramite la tua dApp nel tuo portafoglio — quindi assicurati di dare un'occhiata al nostro rapido tutorial [Come visualizzare il tuo NFT nel tuo portafoglio](https://www.alchemy.com/docs/how-to-view-your-nft-in-your-mobile-wallet)!

E, come sempre, se hai domande, siamo qui per aiutarti nel [Discord di Alchemy](https://discord.gg/gWuC7zB). Non vediamo l'ora di vedere come applicherai i concetti di questo tutorial ai tuoi progetti futuri!