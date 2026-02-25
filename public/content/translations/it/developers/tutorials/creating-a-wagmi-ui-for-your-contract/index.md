---
title: "Costruzione di un'interfaccia utente per il tuo contratto"
description: Utilizzando componenti moderni come TypeScript, React, Vite e Wagmi, esamineremo un'interfaccia utente moderna ma minimale e impareremo a connettere un portafoglio all'interfaccia utente, a chiamare un contratto intelligente per leggere informazioni, a inviare una transazione a un contratto intelligente e a monitorare gli eventi di un contratto intelligente per identificare le modifiche.
author: Ori Pomerantz
tags: [ "typescript", "react", "vite", "wagmi", "frontend" ]
skill: beginner
published: 2023-11-01
lang: it
sidebarDepth: 3
---

Hai trovato una funzionalità di cui abbiamo bisogno nell'ecosistema di Ethereum. Hai scritto i contratti intelligenti per implementarla e forse anche del codice correlato che viene eseguito off-chain. È fantastico! Purtroppo, senza un'interfaccia utente non avrai nessun utente e l'ultima volta che hai scritto un sito web la gente usava modem dial-up e JavaScript era una novità.

Questo articolo è per te. Presumo che tu sappia programmare e forse un po' di JavaScript e HTML, ma che le tue competenze sull'interfaccia utente siano arrugginite e obsolete. Insieme esamineremo una semplice applicazione moderna, così vedrai come si fa al giorno d'oggi.

## Perché è importante {#why-important}

In teoria, potresti semplicemente fare in modo che le persone usino [Etherscan](https://holesky.etherscan.io/address/0x432d810484add7454ddb3b5311f0ac2e95cecea8#writeContract) o [Blockscout](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=write_contract) per interagire con i tuoi contratti. Sarà fantastico per gli Etherean esperti. Ma stiamo cercando di servire [un altro miliardo di persone](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Ciò non accadrà senza un'ottima esperienza utente, e un'interfaccia utente intuitiva ne è una parte importante.

## Applicazione Greeter {#greeter-app}

C'è molta teoria dietro al funzionamento di un'interfaccia utente moderna e [molti buoni siti](https://react.dev/learn/thinking-in-react) [che la spiegano](https://wagmi.sh/core/getting-started). Invece di ripetere l'ottimo lavoro svolto da quei siti, darò per scontato che tu preferisca imparare facendo e iniziare con un'applicazione con cui puoi sperimentare. Avrai comunque bisogno della teoria per portare a termine le cose e ci arriveremo: analizzeremo semplicemente i file sorgente uno per uno e discuteremo le cose man mano che le incontriamo.

### Installazione {#installation}

1. Se necessario, aggiungi [la blockchain Holesky](https://chainlist.org/?search=holesky&testnets=true) al tuo portafoglio e [ottieni ETH di prova](https://www.holeskyfaucet.io/).

2. Clona la repository di GitHub.

   ```sh
   git clone https://github.com/qbzzt/20230801-modern-ui.git
   ```

3. Installa i pacchetti necessari.

   ```sh
   cd 20230801-modern-ui
   pnpm install
   ```

4. Avvia l'applicazione.

   ```sh
   pnpm dev
   ```

5. Vai all'URL mostrato dall'applicazione. Nella maggior parte dei casi, è [http://localhost:5173/](http://localhost:5173/).

6. Puoi vedere il codice sorgente del contratto, una versione leggermente modificata del Greeter di Hardhat, [su un esploratore di blockchain](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contract).

### Analisi dei file {#file-walk-through}

#### `index.html` {#index-html}

Questo file è un boilerplate HTML standard, ad eccezione di questa riga, che importa il file di script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

L'estensione del file ci dice che questo file è un [componente React](https://www.w3schools.com/react/react_components.asp) scritto in [TypeScript](https://www.typescriptlang.org/), un'estensione di JavaScript che supporta il [controllo dei tipi](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript viene compilato in JavaScript, quindi possiamo usarlo per l'esecuzione lato client.

```tsx
import '@rainbow-me/rainbowkit/styles.css'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
import { WagmiConfig } from 'wagmi'
import { chains, config } from './wagmi'
```

Importa il codice della libreria di cui abbiamo bisogno.

```tsx
import { App } from './App'
```

Importa il componente React che implementa l'applicazione (vedi sotto).

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Crea il componente React radice. Il parametro di `render` è [JSX](https://www.w3schools.com/react/react_jsx.asp), un linguaggio di estensione che utilizza sia HTML che JavaScript/TypeScript. Il punto esclamativo qui dice al componente TypeScript: "non sai che `document.getElementById('root')` sarà un parametro valido per `ReactDOM.createRoot`, ma non preoccuparti: sono io lo sviluppatore e ti dico che ci sarà".

```tsx
  <React.StrictMode>
```

L'applicazione viene inserita in [un componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Questo componente indica alla libreria React di inserire controlli di debug aggiuntivi, utili durante lo sviluppo.

```tsx
    <WagmiConfig config={config}>
```

L'applicazione è anche all'interno di [un componente `WagmiConfig`](https://wagmi.sh/react/api/WagmiProvider). [La libreria wagmi (we are going to make it)](https://wagmi.sh/) collega le definizioni dell'interfaccia utente di React con [la libreria viem](https://viem.sh/) per scrivere un'applicazione decentralizzata Ethereum.

```tsx
      <RainbowKitProvider chains={chains}>
```

E infine, [un componente `RainbowKitProvider`](https://www.rainbowkit.com/). Questo componente gestisce il login e la comunicazione tra il portafoglio e l'applicazione.

```tsx
        <App />
```

Ora possiamo avere il componente per l'applicazione, che implementa effettivamente l'interfaccia utente. Il `/>` alla fine del componente dice a React che questo componente non ha definizioni al suo interno, come da standard XML.

```tsx
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>,
)
```

Naturalmente, dobbiamo chiudere gli altri componenti.

#### `src/App.tsx` {#app-tsx}

```tsx
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'
import { Greeter } from './components/Greeter'

export function App() {
```

Questo è il modo standard per creare un componente React: definire una funzione che viene chiamata ogni volta che deve essere renderizzata. Questa funzione ha in genere del codice TypeScript o JavaScript all'inizio, seguito da un'istruzione `return` che restituisce il codice JSX.

```tsx
  const { isConnected } = useAccount()
```

Qui usiamo [`useAccount`](https://wagmi.sh/react/api/hooks/useAccount) per verificare se siamo connessi a una blockchain tramite un portafoglio o meno.

Per convenzione, in React le funzioni chiamate `use...` sono [hook](https://www.w3schools.com/react/react_hooks.asp) che restituiscono un qualche tipo di dato. Quando si utilizzano tali hook, non solo il componente ottiene i dati, ma quando tali dati cambiano, il componente viene ri-renderizzato con le informazioni aggiornate.

```tsx
  return (
    <>
```

Il JSX di un componente React _deve_ restituire un solo componente. Quando abbiamo più componenti e non abbiamo nulla che li raggruppi "naturalmente", usiamo un componente vuoto (`<> ...` </>`) per trasformarli in un unico componente.

```tsx
      <h1>Greeter</h1>
      <ConnectButton />
```

Otteniamo [il componente `ConnectButton`](https://www.rainbowkit.com/docs/connect-button) da RainbowKit. Quando non siamo connessi, ci fornisce un pulsante `Connect Wallet` che apre una modale che spiega cosa sono i portafogli e ti permette di scegliere quale usare. Quando siamo connessi, visualizza la blockchain che usiamo, l'indirizzo del nostro conto e il nostro saldo in ETH. Possiamo usare queste visualizzazioni per cambiare rete o per disconnetterci.

```tsx
      {isConnected && (
```

Quando dobbiamo inserire JavaScript effettivo (o TypeScript che sarà compilato in JavaScript) in un JSX, usiamo le parentesi graffe (`{}`).

La sintassi `a && b` è l'abbreviazione di [`a ?` b : a`](https://www.w3schools.com/react/react_es6_ternary.asp). Cioè, se `a`è vero, restituisce`b`, altrimenti restituisce `a`(che può essere`false`, `0`, ecc.). Questo è un modo semplice per dire a React che un componente dovrebbe essere visualizzato solo se una certa condizione è soddisfatta.

In questo caso, vogliamo mostrare all'utente `Greeter` solo se l'utente è connesso a una blockchain.

```tsx
          <Greeter />
      )}
    </>
  )
}
```

#### `src/components/Greeter.tsx` {#greeter-tsx}

Questo file contiene la maggior parte delle funzionalità dell'interfaccia utente. Include definizioni che normalmente si troverebbero in più file, ma poiché si tratta di un tutorial, il programma è ottimizzato per essere di facile comprensione la prima volta, piuttosto che per le prestazioni o la facilità di manutenzione.

```tsx
import { useState, ChangeEventHandler } from 'react'
import {  useNetwork,
          useReadContract,
          usePrepareContractWrite,
          useContractWrite,
          useContractEvent
        } from 'wagmi'
```

Usiamo queste funzioni di libreria. Anche in questo caso, vengono spiegate di seguito, dove vengono utilizzate.

```tsx
import { AddressType } from 'abitype'
```

[La libreria `abitype`](https://abitype.dev/) ci fornisce definizioni TypeScript per vari tipi di dati di Ethereum, come [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  .
  .
  .
] as const   // greeterABI
```

L'ABI per il contratto `Greeter`.
Se stai sviluppando i contratti e l'interfaccia utente contemporaneamente, normalmente li metteresti nella stessa repository e useresti l'ABI generata dal compilatore Solidity come file nella tua applicazione. Tuttavia, qui non è necessario perché il contratto è già stato sviluppato e non cambierà.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript è fortemente tipizzato. Usiamo questa definizione per specificare l'indirizzo in cui il contratto `Greeter` è distribuito su diverse catene. La chiave è un numero (il chainId) e il valore è un `AddressType` (un indirizzo).

```tsx
const contractAddrs: AddressPerBlockchainType = {
  // Holesky
  17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',

  // Sepolia
  11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
}
```

L'indirizzo del contratto sulle due reti supportate: [Holesky](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=contact_code) e [Sepolia](https://eth-sepolia.blockscout.com/address/0x7143d5c190F048C8d19fe325b748b081903E3BF0?tab=contact_code).

Nota: in realtà esiste una terza definizione, per Redstone Holesky, che verrà spiegata di seguito.

```tsx
type ShowObjectAttrsType = {
  name: string,
  object: any
}
```

Questo tipo viene utilizzato come parametro per il componente `ShowObject` (spiegato più avanti). Include il nome dell'oggetto e il suo valore, che vengono visualizzati a scopo di debug.

```tsx
type ShowGreetingAttrsType = {
  greeting: string | undefined
}
```

In qualsiasi momento, potremmo sapere qual è il saluto (perché lo abbiamo letto dalla blockchain) o non saperlo (perché non lo abbiamo ancora ricevuto). Quindi è utile avere un tipo che possa essere una stringa o niente.

##### Componente `Greeter` {#greeter-component}

```tsx
const Greeter = () => {
```

Infine, arriviamo a definire il componente.

```tsx
  const { chain } = useNetwork()
```

Informazioni sulla catena che stiamo usando, per gentile concessione di [wagmi](https://wagmi.sh/react/hooks/useNetwork).
Poiché si tratta di un hook (`use...`), ogni volta che questa informazione cambia, il componente viene ridisegnato.

```tsx
  const greeterAddr = chain && contractAddrs[chain.id]
```

L'indirizzo del contratto Greeter, che varia a seconda della catena (e che è `undefined` se non abbiamo informazioni sulla catena o se siamo su una catena senza quel contratto).

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet" , // No arguments
    watch: true
  })
```

[L'hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) legge le informazioni da un contratto. Puoi vedere esattamente quali informazioni restituisce espandendo `readResults` nell'interfaccia utente. In questo caso, vogliamo che continui a cercare in modo da essere informati quando il saluto cambia.

**Nota:** potremmo ascoltare gli [eventi `setGreeting`](https://eth-holesky.blockscout.com/address/0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8?tab=logs) per sapere quando il saluto cambia e aggiornare in quel modo. Tuttavia, sebbene possa essere più efficiente, non si applicherà in tutti i casi. Quando l'utente passa a una catena diversa, anche il saluto cambia, ma tale cambiamento non è accompagnato da un evento. Potremmo avere una parte del codice in ascolto degli eventi e un'altra per identificare i cambi di catena, ma sarebbe più complicato che impostare semplicemente [il parametro `watch`](https://wagmi.sh/react/api/hooks/useReadContract#watch-optional).

```tsx
  const [ newGreeting, setNewGreeting ] = useState("")
```

L'[hook `useState` di React](https://www.w3schools.com/react/react_usestate.asp) ci permette di specificare una variabile di stato, il cui valore persiste da un rendering all'altro del componente. Il valore iniziale è il parametro, in questo caso la stringa vuota.

L'hook `useState` restituisce un elenco con due valori:

1. Il valore corrente della variabile di stato.
2. Una funzione per modificare la variabile di stato quando necessario. Essendo un hook, ogni volta che viene chiamata, il componente viene renderizzato di nuovo.

In questo caso, stiamo usando una variabile di stato per il nuovo saluto che l'utente vuole impostare.

```tsx
  const greetingChange : ChangeEventHandler<HTMLInputElement> = (evt) =>
    setNewGreeting(evt.target.value)
```

Questo è il gestore di eventi per quando il campo di input del nuovo saluto cambia. Il tipo, [`ChangeEventHandler<HTMLInputElement>`](https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/), specifica che si tratta di un gestore per una modifica del valore di un elemento di input HTML. La parte `<HTMLInputElement>` viene utilizzata perché si tratta di un [tipo generico](https://www.w3schools.com/typescript/typescript_basic_generics.php).

```tsx
  const preparedTx = usePrepareContractWrite({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [ newGreeting ]
  })
  const workingTx = useContractWrite(preparedTx.config)
```

Questo è il processo per inviare una transazione blockchain dal punto di vista del client:

1. Invia la transazione a un nodo nella blockchain usando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Attendi una risposta dal nodo.
3. Quando la risposta viene ricevuta, chiedi all'utente di firmare la transazione tramite il portafoglio. Questo passaggio _deve_ avvenire dopo aver ricevuto la risposta del nodo, perché all'utente viene mostrato il costo del gas della transazione prima di firmarla.
4. Attendi l'approvazione dell'utente.
5. Invia di nuovo la transazione, questa volta usando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

Il punto 2 richiederà probabilmente una quantità di tempo percettibile, durante la quale gli utenti si chiederanno se il loro comando è stato realmente ricevuto dall'interfaccia utente e perché non gli è stato ancora chiesto di firmare la transazione. Questo crea una cattiva esperienza utente (UX).

La soluzione è usare gli [hook di preparazione](https://wagmi.sh/react/prepare-hooks). Ogni volta che un parametro cambia, invia immediatamente al nodo la richiesta `eth_estimateGas`. Quindi, quando l'utente vuole effettivamente inviare la transazione (in questo caso premendo **Aggiorna saluto**), il costo del gas è noto e l'utente può vedere immediatamente la pagina del portafoglio.

```tsx
  return (
```

Ora possiamo finalmente creare l'HTML effettivo da restituire.

```tsx
    <>
      <h2>Greeter</h2>
      {
        !readResults.isError && !readResults.isLoading &&
          <ShowGreeting greeting={readResults.data} />
      }
      <hr />
```

Crea un componente `ShowGreeting` (spiegato di seguito), ma solo se il saluto è stato letto con successo dalla blockchain.

```tsx
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />
```

Questo è il campo di testo di input in cui l'utente può impostare un nuovo saluto. Ogni volta che l'utente preme un tasto, chiamiamo `greetingChange` che a sua volta chiama `setNewGreeting`. Poiché `setNewGreeting` proviene dall'hook `useState`, fa sì che il componente `Greeter` venga renderizzato di nuovo. Ciò significa che:

- Dobbiamo specificare `value` per conservare il valore del nuovo saluto, altrimenti tornerebbe al valore predefinito, la stringa vuota.
- `usePrepareContractWrite` viene chiamato ogni volta che `newGreeting` cambia, il che significa che avrà sempre l'ultimo `newGreeting` nella transazione preparata.

```tsx
      <button disabled={!workingTx.write}
              onClick={workingTx.write}
      >
        Aggiorna saluto
      </button>
```

Se non c'è `workingTx.write`, allora stiamo ancora aspettando le informazioni necessarie per inviare l'aggiornamento del saluto, quindi il pulsante è disabilitato. Se c'è un valore `workingTx.write`, allora quella è la funzione da chiamare per inviare la transazione.

```tsx
      <hr />
      <ShowObject name="readResults" object={readResults} />
      <ShowObject name="preparedTx" object={preparedTx} />
      <ShowObject name="workingTx" object={workingTx} />
    </>
  )
}
```

Infine, per aiutarti a vedere cosa stiamo facendo, mostriamo i tre oggetti che usiamo:

- `readResults`
- `preparedTx`
- `workingTx`

##### Componente `ShowGreeting` {#showgreeting-component}

Questo componente mostra

```tsx
const ShowGreeting = (attrs : ShowGreetingAttrsType) => {
```

La funzione di un componente riceve un parametro con tutti gli attributi del componente.

```tsx
  return <b>{attrs.greeting}</b>
}
```

##### Componente `ShowObject` {#showobject-component}

A scopo informativo, usiamo il componente `ShowObject` per mostrare gli oggetti importanti (`readResults` per leggere il saluto e `preparedTx` e `workingTx` per le transazioni che creiamo).

```tsx
const ShowObject = (attrs: ShowObjectAttrsType ) => {
  const keys = Object.keys(attrs.object)
  const funs = keys.filter(k => typeof attrs.object[k] == "function")
  return <>
    <details>
```

Non vogliamo ingombrare l'interfaccia utente con tutte le informazioni, quindi per rendere possibile visualizzarle o chiuderle, usiamo un tag [`details`](https://www.w3schools.com/tags/tag_details.asp).

```tsx
      <summary>{attrs.name}</summary>
      <pre>
        {JSON.stringify(attrs.object, null, 2)}
```

La maggior parte dei campi viene visualizzata usando [`JSON.stringify`](https://www.w3schools.com/js/js_json_stringify.asp).

```tsx
      </pre>
      { funs.length > 0 &&
        <>
          Funzioni:
          <ul>
```

L'eccezione sono le funzioni, che non fanno parte dello [standard JSON](https://www.json.org/json-en.html), quindi devono essere visualizzate separatamente.

```tsx
          {funs.map((f, i) =>
```

All'interno di JSX, il codice tra parentesi graffe `{` `}` viene interpretato come JavaScript. Quindi, il codice all'interno delle parentesi tonde `(` `)`, viene nuovamente interpretato come JSX.

```tsx
           (<li key={i}>{f}</li>)
                )}
```

React richiede che i tag nell'[albero DOM](https://www.w3schools.com/js/js_htmldom.asp) abbiano identificatori distinti. Ciò significa che gli elementi figli dello stesso tag (in questo caso, [l'elenco non ordinato](https://www.w3schools.com/tags/tag_ul.asp)), necessitano di attributi `key` diversi.

```tsx
          </ul>
        </>
      }
    </details>
  </>
}
```

Termina i vari tag HTML.

##### L'`export` finale {#the-final-export}

```tsx
export { Greeter }
```

Il componente `Greeter` è quello che dobbiamo esportare per l'applicazione.

#### `src/wagmi.ts` {#wagmi-ts}

Infine, varie definizioni relative a WAGMI si trovano in `src/wagmi.ts`. Non spiegherò tutto qui, perché la maggior parte è boilerplate che difficilmente avrai bisogno di modificare.

Il codice qui non è esattamente lo stesso di [quello su GitHub](https://github.com/qbzzt/20230801-modern-ui/blob/main/src/wagmi.ts) perché più avanti nell'articolo aggiungiamo un'altra catena ([Redstone Holesky](https://redstone.xyz/docs/network-info)).

```ts
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig } from 'wagmi'
import { holesky, sepolia } from 'wagmi/chains'
```

Importa le blockchain supportate dall'applicazione. Puoi vedere l'elenco delle catene supportate [nel GitHub di viem](https://github.com/wagmi-dev/viem/tree/main/src/chains/definitions).

```ts
import { publicProvider } from 'wagmi/providers/public'

const walletConnectProjectId = 'c96e690bb92b6311e8e9b2a6a22df575'
```

Per poter utilizzare [WalletConnect](https://walletconnect.com/) è necessario un ID di progetto per la propria applicazione. Puoi ottenerlo su [cloud.walletconnect.com](https://cloud.walletconnect.com/sign-in).

```ts
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [ holesky, sepolia ],
  [
    publicProvider(),
  ],
)

const { connectors } = getDefaultWallets({
  appName: 'My wagmi + RainbowKit App',
  chains,
  projectId: walletConnectProjectId,
})

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export { chains }
```

### Aggiungere un'altra blockchain {#add-blockchain}

Oggigiorno ci sono molte [soluzioni di scalabilità di secondo livello](/layer-2/) e potresti volerne supportare alcune che viem non supporta ancora. Per farlo, modifica `src/wagmi.ts`. Queste istruzioni spiegano come aggiungere [Redstone Holesky](https://redstone.xyz/docs/network-info).

1. Importa il tipo `defineChain` da viem.

   ```ts
   import { defineChain } from 'viem'
   ```

2. Aggiungi la definizione della rete.

   ```ts
   const redstoneHolesky = defineChain({
      id: 17_001,
      name: 'Redstone Holesky',
      network: 'redstone-holesky',
      nativeCurrency: {
        decimals: 18,
        name: 'Ether',
        symbol: 'ETH',
      },
      rpcUrls: {
        default: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
      },
      public: {
          http: ['https://rpc.holesky.redstone.xyz'],
          webSocket: ['wss://rpc.holesky.redstone.xyz/ws'],
        },
      },
      blockExplorers: {
        default: { name: 'Explorer', url: 'https://explorer.holesky.redstone.xyz' },
      },
   })
   ```

3. Aggiungi la nuova catena alla chiamata `configureChains`.

   ```ts
    const { chains, publicClient, webSocketPublicClient } = configureChains(
      [ holesky, sepolia, redstoneHolesky ],
      [ publicProvider(), ],
    )
   ```

4. Assicurati che l'applicazione conosca l'indirizzo dei tuoi contratti sulla nuova rete. In questo caso, modifichiamo `src/components/Greeter.tsx`.

    ```ts
    const contractAddrs : AddressPerBlockchainType = {
      // Holesky
      17000: '0x432d810484AdD7454ddb3b5311f0Ac2E95CeceA8',
    
      // Redstone Holesky
      17001: '0x4919517f82a1B89a32392E1BF72ec827ba9986D3',
    
      // Sepolia
      11155111: '0x7143d5c190F048C8d19fe325b748b081903E3BF0'
    }
    ```

## Conclusione {#conclusion}

Naturalmente, non ti interessa molto fornire un'interfaccia utente per `Greeter`. Vuoi creare un'interfaccia utente per i tuoi contratti. Per creare la tua applicazione, esegui questi passaggi:

1. Specifica di creare un'applicazione wagmi.

   ```sh copy
   pnpm create wagmi
   ```

2. Dai un nome all'applicazione.

3. Seleziona il framework **React**.

4. Seleziona la variante **Vite**.

5. Puoi [aggiungere Rainbow Kit](https://www.rainbowkit.com/docs/installation#manual-setup).

Ora vai e rendi i tuoi contratti utilizzabili per il mondo intero.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).

