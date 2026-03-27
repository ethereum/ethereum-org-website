---
title: "Creare un'interfaccia utente per il tuo contratto"
description: Utilizzando componenti moderni come TypeScript, React, Vite e Wagmi, esamineremo un'interfaccia utente moderna ma minimale e impareremo come connettere un portafoglio all'interfaccia utente, chiamare un contratto intelligente per leggere informazioni, inviare una transazione a un contratto intelligente e monitorare gli eventi da un contratto intelligente per identificare i cambiamenti.
author: Ori Pomerantz
tags: ["TypeScript", "React", "Vite", "Wagmi", "frontend"]
skill: beginner
breadcrumb: UI con WAGMI
published: 2023-11-01
lang: it
sidebarDepth: 3
---

Hai trovato una funzionalità di cui abbiamo bisogno nell'ecosistema di Ethereum. Hai scritto i contratti intelligenti per implementarla, e forse anche del codice correlato che viene eseguito fuori catena. È fantastico! Sfortunatamente, senza un'interfaccia utente non avrai alcun utente, e l'ultima volta che hai scritto un sito web le persone usavano modem dial-up e JavaScript era una novità.

Questo articolo fa per te. Presumo che tu conosca la programmazione, e forse un po' di JavaScript e HTML, ma che le tue competenze in materia di interfacce utente siano arrugginite e obsolete. Insieme esamineremo una semplice applicazione moderna in modo che tu possa vedere come si fa al giorno d'oggi.

## Perché è importante {#why-important}

In teoria, potresti semplicemente far usare alle persone [Etherscan](https://sepolia.etherscan.io/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA#readContract) o [Blockscout](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=read_write_contract) per interagire con i tuoi contratti. Questo è ottimo per gli Ethereani esperti. Ma stiamo cercando di servire [un altro miliardo di persone](https://blog.ethereum.org/2021/05/07/ethereum-for-the-next-billion). Questo non accadrà senza un'ottima esperienza utente, e un'interfaccia utente amichevole ne è una parte importante.

## Applicazione Greeter {#greeter-app}

C'è molta teoria dietro al funzionamento delle moderne interfacce utente, e [molti ottimi siti](https://react.dev/learn/thinking-in-react) [che la spiegano](https://wagmi.sh/core/getting-started). Invece di ripetere l'ottimo lavoro svolto da quei siti, presumerò che tu preferisca imparare facendo e iniziare con un'applicazione con cui puoi giocare. Hai comunque bisogno della teoria per fare le cose, e ci arriveremo: esamineremo semplicemente file sorgente per file sorgente e discuteremo le cose man mano che le incontriamo.

### Installazione {#installation}

1. L'applicazione utilizza la rete di test [Sepolia](https://sepolia.dev/). Se necessario, [ottieni ETH di test di Sepolia](/developers/docs/networks/#sepolia) e [aggiungi Sepolia al tuo portafoglio](https://chainlist.org/chain/11155111).

2. Clona il repository GitHub e installa i pacchetti necessari.

   ```sh
   git clone https://github.com/qbzzt/260301-modern-ui-web3.git
   cd 260301-modern-ui-web3
   npm install
```

3. L'applicazione utilizza punti di accesso gratuiti, che presentano limitazioni di prestazioni. Se desideri utilizzare un fornitore di [Nodi come servizio](/developers/docs/nodes-and-clients/nodes-as-a-service/), sostituisci gli URL in [`src/wagmi.ts`](#wagmi-ts).

4. Avvia l'applicazione.

   ```sh
   npm run dev
```

5. Naviga all'URL mostrato dall'applicazione. Nella maggior parte dei casi, è [http://localhost:5173/](http://localhost:5173/).

6. Puoi vedere il codice sorgente del contratto, una versione modificata del Greeter di Hardhat, [su un esploratore di blocchi](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract_code).

### Analisi dei file {#file-walk-through}

#### `index.html` {#index-html}

Questo file è un boilerplate HTML standard, ad eccezione di questa riga, che importa il file di script.

```html
<script type="module" src="/src/main.tsx"></script>
```

#### `src/main.tsx` {#main-tsx}

L'estensione del file indica che si tratta di un [componente React](https://www.w3schools.com/react/react_components.asp) scritto in [TypeScript](https://www.typescriptlang.org/), un'estensione di JavaScript che supporta il [controllo dei tipi](https://en.wikipedia.org/wiki/Type_system#Type_checking). TypeScript viene compilato in JavaScript, quindi possiamo usarlo lato client.

Questo file è spiegato principalmente nel caso in cui tu sia interessato. Di solito non si modifica questo file, ma [`src/App.tsx`](#app-tsx) e i file che importa.

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
```

Importa il codice della libreria di cui abbiamo bisogno.

```tsx
import App from './App.tsx'
```

Importa il componente React che implementa l'applicazione (vedi sotto).

```tsx
import { config } from './wagmi.ts'
```

Importa la configurazione di [wagmi](https://wagmi.sh/), che include la configurazione della blockchain.

```tsx
const queryClient = new QueryClient()
```

Crea una nuova istanza del gestore della cache di [React Query](https://tanstack.com/query/latest/docs/framework/react/overview). Questo oggetto memorizzerà:

- Chiamate RPC memorizzate nella cache
- Letture del contratto
- Stato di recupero in background

Abbiamo bisogno del gestore della cache perché wagmi v3 utilizza React Query internamente.

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
```

Crea il componente React radice. Il parametro per `render` è [JSX](https://www.w3schools.com/react/react_jsx.asp), un linguaggio di estensione che utilizza sia HTML che JavaScript/TypeScript. Il punto esclamativo qui dice al componente TypeScript: "non sai che `document.getElementById('root')` sarà un parametro valido per `ReactDOM.createRoot`, ma non preoccuparti: sono lo sviluppatore e ti dico che ci sarà".

```tsx
  <React.StrictMode>
```

L'applicazione andrà all'interno di [un componente `React.StrictMode`](https://react.dev/reference/react/StrictMode). Questo componente dice alla libreria React di inserire controlli di debug aggiuntivi, il che è utile durante lo sviluppo.

```tsx
    <WagmiProvider config={config}>
```

L'applicazione è anche all'interno di [un componente `WagmiProvider`](https://wagmi.sh/react/api/WagmiProvider). [La libreria wagmi (we are going to make it)](https://wagmi.sh/) collega le definizioni dell'interfaccia utente React con [la libreria viem](https://viem.sh/) per scrivere un'applicazione decentralizzata su Ethereum.

```tsx
      <QueryClientProvider client={queryClient}>
```

E infine, aggiungi un provider React Query in modo che qualsiasi componente dell'applicazione possa utilizzare le query memorizzate nella cache.

```tsx
        <App />
```

Ora possiamo avere il componente per l'applicazione, che implementa effettivamente l'interfaccia utente. Il `/>` alla fine del componente dice a React che questo componente non ha alcuna definizione al suo interno, secondo lo standard XML.

```tsx
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
```

Naturalmente, dobbiamo chiudere gli altri componenti.

#### `src/App.tsx` {#app-tsx}

```tsx
import {
  useConnect,
  useConnection,
  useDisconnect,
  useSwitchChain
} from 'wagmi'

import { useEffect } from 'react'
import { Greeter } from './Greeter'
```

Importa le librerie di cui abbiamo bisogno, così come [il componente `Greeter`](#greeter-tsx).

```tsx
const SEPOLIA_CHAIN_ID = 11155111
```

L'ID della catena Sepolia.

```
function App() {
```

Questo è il modo standard per creare un componente React: definire una funzione che viene chiamata ogni volta che deve essere renderizzata. Questa funzione contiene in genere codice TypeScript o JavaScript, seguito da un'istruzione `return` che restituisce il codice JSX.

```tsx
  const connection = useConnection()
```

Usa [`useConnection`](https://wagmi.sh/react/api/hooks/useConnection) per ottenere informazioni relative alla connessione corrente, come l'indirizzo e il `chainId`.

Per convenzione, in React le funzioni chiamate `use...` sono [hook](https://www.w3schools.com/react/react_hooks.asp). Queste funzioni non si limitano a restituire dati al componente; assicurano anche che venga renderizzato di nuovo (la funzione del componente viene eseguita di nuovo e il suo output sostituisce quello precedente nell'HTML) quando quei dati cambiano.

```tsx
  const { connectors, connect, status, error } = useConnect()
```

Usa [`useConnect`](https://wagmi.sh/react/api/hooks/useConnect) per ottenere informazioni sulla connessione del portafoglio.

```tsx
  const { disconnect } = useDisconnect()
```

[Questo hook](https://wagmi.sh/react/api/hooks/useDisconnect) ci fornisce la funzione per disconnetterci dal portafoglio.

```tsx
  const { switchChain } = useSwitchChain()
```

[Questo hook](https://wagmi.sh/react/api/hooks/useSwitchChain) ci permette di cambiare catena.

```tsx
  useEffect(() => {
```

L'hook di React [`useEffect`](https://react.dev/reference/react/useEffect) ti consente di eseguire una funzione ogni volta che il valore di una variabile cambia per sincronizzare un sistema esterno.

```tsx
    if (connection.status === 'connected' &&
        connection.chainId !== SEPOLIA_CHAIN_ID
    ) {
      switchChain({ chainId: SEPOLIA_CHAIN_ID })
    }
```

Se siamo connessi, ma non alla blockchain di Sepolia, passa a Sepolia.

```tsx
  }, [connection.status, connection.chainId])
```

Esegui di nuovo la funzione ogni volta che lo stato della connessione o il chainId della connessione cambiano.

```tsx
  return (
    <>
```

Il JSX di un componente React _deve_ restituire un singolo componente HTML. Quando abbiamo più componenti e non abbiamo bisogno di un contenitore per avvolgerli tutti, usiamo un componente vuoto (`<> ... </>`) per combinarli in un singolo componente.

```tsx
      <h2>Connection</h2>
      <div>
        status: {connection.status}
        <br />
        addresses: {JSON.stringify(connection.addresses)}
        <br />
        chainId: {connection.chainId}
</div>
```

Fornisci informazioni sulla connessione corrente. All'interno di JSX, `{<expression>}` significa valutare l'espressione come JavaScript.

```tsx
      {connection.status === 'connected' && (
```

La sintassi `{<condition> && <value>} significa "se la condizione è `true`, valuta il valore; se non lo è, valuta `false`".

Questo è il modo standard per inserire istruzioni if all'interno di JSX.

```tsx
        <div>
          <Greeter />
          <hr />
```

JSX segue lo standard XML, che è più rigoroso dell'HTML. Se un tag non ha un tag di chiusura corrispondente, _deve_ avere una barra (`/`) alla fine per terminarlo.

Qui abbiamo due di questi tag, `<Greeter />` (che in realtà contiene il codice HTML che comunica con il contratto) e [`<hr />` per una linea orizzontale](https://www.w3schools.com/tags/tag_hr.asp).

```tsx
          <button type="button" onClick={disconnect}>
            Disconnect
          </button>
</div>
      )}
```

Se l'utente fa clic su questo pulsante, chiama la funzione `disconnect`.

```tsx
      {connection.status !== 'connected' && (
```

Se _non_ siamo connessi, mostra le opzioni necessarie per connettersi al portafoglio.

```tsx
        <div>
          <h2>Connect</h2>
          {connectors.map((connector) => (
```

In `connectors` abbiamo un elenco di connettori. Usiamo [`map`](https://www.w3schools.com/jsref/jsref_map.asp) per trasformarlo in un elenco di pulsanti JSX da visualizzare.

```tsx
            <button
              key={connector.uid}
```

In JSX è necessario che i tag "fratelli" (tag che discendono dallo stesso genitore) abbiano identificatori diversi.

```tsx
              onClick={() => connect({ connector })}
              type="button"
            >
              {connector.name}
            </button>
          ))}
```

I pulsanti del connettore.

```tsx
          <div>{status}</div>
          <div>{error?.message}</div>
 
</div>
      )}
```

Fornisci informazioni aggiuntive. La sintassi dell'espressione `<variable>?.<field>` dice a JavaScript che se la variabile è definita, valuta quel campo. Se la variabile non è definita, allora questa espressione valuta `undefined`.

L'espressione `error.message`, quando non ci sono errori, solleverebbe un'eccezione. L'uso di `error?.message` ci consente di evitare questo problema.

#### `src/Greeter.tsx` {#greeter-tsx}

Questo file contiene la maggior parte delle funzionalità dell'interfaccia utente. Include definizioni che normalmente si troverebbero in più file, ma poiché si tratta di un tutorial, il programma è ottimizzato per essere facile da comprendere la prima volta, piuttosto che per le prestazioni o la facilità di manutenzione.

```tsx
import {
          useState,
          useEffect,
       } from 'react'
import {  useChainId,
          useAccount,
          useReadContract,
          useWriteContract,
          useWatchContractEvent,
          useSimulateContract
       } from 'wagmi'
```

Usiamo queste funzioni di libreria. Anche in questo caso, sono spiegate di seguito dove vengono utilizzate.

```tsx
import { AddressType } from 'abitype'
```

[La libreria `abitype`](https://abitype.dev/) ci fornisce definizioni TypeScript per vari tipi di dati di Ethereum, come [`AddressType`](https://abitype.dev/config#addresstype).

```tsx
let greeterABI = [
  { "type": "function", "name": "greet", ... },
  { "type": "function", "name": "setGreeting", ... },
  { "type": "event", "name": "SetGreeting", ... },
] as const // greeterABI
```

L'ABI per il contratto `Greeter`.
Se stai sviluppando i contratti e l'interfaccia utente contemporaneamente, normalmente li metteresti nello stesso repository e useresti l'ABI generata dal compilatore Solidity come file nella tua applicazione. Tuttavia, questo non è necessario qui perché il contratto è già sviluppato e non cambierà.

Usiamo [`as const`](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-4.html#const-assertions) per dire a TypeScript che questa è una _vera_ costante. Normalmente, quando specifichi in JavaScript `const x = {"a": 1}`, puoi cambiare il valore in `x`, semplicemente non puoi assegnargli un nuovo valore.

```tsx
type AddressPerBlockchainType = {
  [key: number]: AddressType
}
```

TypeScript è fortemente tipizzato. Usiamo questa definizione per specificare l'indirizzo in cui il contratto `Greeter` è distribuito su diverse catene. La chiave è un numero (il chainId) e il valore è un `AddressType` (un indirizzo).

```tsx
const contractAddrs : AddressPerBlockchainType = {
  // Sepolia
    11155111: '0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA'
}
```

L'indirizzo del contratto su [Sepolia](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

##### Componente Timer {#timer-component}

Il componente `Timer` mostra il numero di secondi trascorsi da un determinato momento. Questo è importante ai fini dell'usabilità. Quando gli utenti fanno qualcosa, si aspettano una reazione immediata. Nelle blockchain, questo è spesso impossibile perché non succede nulla finché una transazione non viene inserita in un blocco. Una soluzione è mostrare quanto tempo è trascorso da quando l'utente ha eseguito l'azione, in modo che l'utente possa decidere se il tempo richiesto è ragionevole.

```tsx
type TimerProps = {
  lastUpdate: Date
}
```

Il componente `Timer` accetta un parametro, `lastUpdate`, che è l'ora dell'ultima azione.

```tsx
const Timer = ({ lastUpdate }: TimerProps) => {
  const [_, setNow] = useState(new Date())
```

Dobbiamo avere uno stato (una variabile legata al componente) e aggiornarlo affinché il componente funzioni correttamente. Ma non abbiamo mai bisogno di leggerlo, quindi non preoccuparti di creare una variabile.

```tsx
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
```

La funzione [`setInterval`](https://www.w3schools.com/jsref/met_win_setinterval.asp) ci consente di programmare l'esecuzione periodica di una funzione. In questo caso, ogni secondo. La funzione chiama `setNow` per aggiornare lo stato, in modo che il componente `Timer` venga renderizzato di nuovo. Avvolgiamo questo all'interno di [`useEffect`](https://react.dev/reference/react/useEffect) con un elenco di dipendenze vuoto in modo che avvenga solo una volta, piuttosto che ogni volta che il componente viene renderizzato.

```tsx
  const secondsSinceUpdate = Math.floor(
    (Date.now() - lastUpdate.getTime()) / 1000
  )

  return (
    <span>{secondsSinceUpdate} seconds ago</span>
  )
}
```

Calcola il numero di secondi dall'ultimo aggiornamento e restituiscilo.

##### Componente Greeter {#greeter-component}

```tsx
const Greeter = () => {
```

Infine, arriviamo a definire il componente.

```tsx
  const chainId = useChainId()
  const account = useAccount()
```

Informazioni sulla catena e sull'account che stiamo utilizzando, per gentile concessione di [wagmi](https://wagmi.sh/). Poiché si tratta di un hook (`use...`), il componente viene renderizzato di nuovo ogni volta che queste informazioni cambiano.

```tsx
  const greeterAddr = chainId && contractAddrs[chainId] 
```

L'indirizzo del contratto Greeter, che è `undefined` se non abbiamo informazioni sulla catena, o se siamo su una catena senza quel contratto.

```tsx
  const readResults = useReadContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: "greet", // Nessun argomento
  })
```

[L'hook `useReadContract`](https://wagmi.sh/react/api/hooks/useReadContract) chiama la funzione `greet` del [contratto](https://eth-sepolia.blockscout.com/address/0xC87506C66c7896366b9E988FE0aA5B6dDE77CFfA?tab=contract).

```tsx
  const [ currentGreeting, setCurrentGreeting ] = 
    useState("Please wait while we fetch the greeting from the blockchain...")
  const [ newGreeting, setNewGreeting ] = useState("")
```

L'hook [`useState`](https://www.w3schools.com/react/react_usestate.asp) di React ci consente di specificare una variabile di stato, il cui valore persiste da un rendering del componente all'altro. Il valore iniziale è il parametro, in questo caso la stringa vuota.

L'hook `useState` restituisce un elenco con due valori:

1. Il valore corrente della variabile di stato.
2. Una funzione per modificare la variabile di stato quando necessario. Poiché si tratta di un hook, ogni volta che viene chiamato il componente viene renderizzato di nuovo.

In questo caso, stiamo utilizzando una variabile di stato per il nuovo saluto che l'utente desidera impostare.

```tsx
  const [ lastSetterAddress, setLastSetterAddress ] = useState("")
```

Se più utenti utilizzano lo stesso contratto contemporaneamente, potrebbero sovrascrivere i saluti degli altri. Questo sembrerebbe agli utenti come se l'applicazione non funzionasse correttamente. Se l'applicazione mostra chi ha impostato il saluto per ultimo, l'utente saprà che è stato qualcun altro e che l'applicazione funziona correttamente.

```tsx
  const [ status, setStatus ] = useState("")
  const [ statusTime, setStatusTime ] = useState(new Date())
```

Agli utenti piace vedere che le loro azioni hanno un effetto immediato. Tuttavia, su una blockchain, non è così. Queste variabili di stato ci consentono almeno di visualizzare qualcosa agli utenti in modo che sappiano che la loro azione è in corso.

```tsx
  useEffect(() => {
    if (readResults.data) {
      setCurrentGreeting(readResults.data)
      setStatus("Greeting fetched from blockchain")
    }
  }, [readResults.data])
```

Se `readResults` sopra modifica i dati e non è impostato su un valore falso (ad esempio `undefined`), aggiorna il saluto corrente a quello letto dalla blockchain. Inoltre, aggiorna lo stato.

```tsx
  useWatchContractEvent({
    address: greeterAddr,
    abi: greeterABI,
    eventName: 'SetGreeting',
    chainId,
```

Ascolta gli eventi `SetGreeting`.

```tsx
    enabled: !!greeterAddr,
```

`!!<value>` significa che se il valore è `false`, o un valore che viene valutato come falso, come `undefined`, `0` o una stringa vuota, l'espressione nel complesso è `false`. Per qualsiasi altro valore, è `true`. È un modo per convertire i valori in booleani, perché se non c'è `greeterAddr`, non vogliamo ascoltare gli eventi.

```tsx
    onLogs: logs => {
      const greetingFromContract = logs[0].args.greeting
      setCurrentGreeting(greetingFromContract)
      setLastSetterAddress(logs[0].args.sender)
      updateStatus("Greeting updated by event")
    },
  })
```

Quando vediamo i log (il che accade quando vediamo un nuovo evento), significa che il saluto è stato modificato. In tal caso, possiamo aggiornare `currentGreeting` e `lastSetterAddress` ai nuovi valori. Inoltre, vogliamo aggiornare la visualizzazione dello stato.

```tsx
  const updateStatus = (newStatus: string) => {
    setStatus(newStatus)
    setStatusTime(new Date())
  }
```

Quando aggiorniamo lo stato vogliamo fare due cose:

1. Aggiornare la stringa di stato (`status`)
2. Aggiornare l'ora dell'ultimo aggiornamento di stato (`statusTime`) ad adesso.

```tsx
  const greetingChange = (evt) =>
    setNewGreeting(evt.target.value)
```

Questo è il gestore di eventi per le modifiche al nuovo campo di input del saluto. Potremmo specificare il tipo del parametro `evt`, ma TypeScript è un linguaggio con tipi opzionali. Poiché questa funzione viene chiamata solo una volta, in un gestore di eventi HTML, non credo sia necessario.

```tsx
  const { writeContractAsync } = useWriteContract()
```

La funzione per scrivere su un contratto. È simile a [`writeContracts`](https://wagmi.sh/core/api/actions/writeContracts#writecontracts), ma consente migliori aggiornamenti di stato.

```tsx
  const simulation = useSimulateContract({
    address: greeterAddr,
    abi: greeterABI,
    functionName: 'setGreeting',
    args: [newGreeting],
    account: account.address    
  })
```

Questo è il processo per inviare una transazione blockchain dalla prospettiva del client:

1. Invia la transazione a un nodo nella blockchain utilizzando [`eth_estimateGas`](https://docs.alchemy.com/reference/eth-estimategas).
2. Attendi una risposta dal nodo.
3. Quando viene ricevuta la risposta, chiedi all'utente di firmare la transazione tramite il portafoglio. Questo passaggio _deve_ avvenire dopo aver ricevuto la risposta del nodo perché all'utente viene mostrato il costo del gas della transazione prima di firmarla.
4. Attendi l'approvazione dell'utente.
5. Invia di nuovo la transazione, questa volta utilizzando [`eth_sendRawTransaction`](https://docs.alchemy.com/reference/eth-sendrawtransaction).

È probabile che il passaggio 2 richieda una quantità di tempo percettibile, durante la quale gli utenti potrebbero chiedersi se il loro comando sia stato ricevuto dall'interfaccia utente e perché non venga ancora chiesto loro di firmare la transazione. Ciò crea una scarsa esperienza utente (UX).

Una soluzione è inviare `eth_estimateGas` ogni volta che un parametro cambia. Quindi, quando l'utente desidera effettivamente inviare la transazione (in questo caso premendo **Update greeting**), il costo del gas è noto e l'utente può vedere immediatamente la pagina del portafoglio.

```tsx
  return (
```

Ora possiamo finalmente creare l'HTML effettivo da restituire.

```tsx
    <>
      <h2>Greeter</h2>
      {currentGreeting}
```

Mostra il saluto corrente.

```tsx
      {lastSetterAddress && (
        <p>Last updated by {
          lastSetterAddress === account.address ? "you" : lastSetterAddress
        }</p>
      )}
```

Se sappiamo chi ha impostato il saluto per ultimo, visualizza tali informazioni. `Greeter` non tiene traccia di queste informazioni e non vogliamo guardare indietro per gli eventi `SetGreeting`, quindi le otteniamo solo una volta che il saluto viene modificato mentre siamo in esecuzione.

```tsx
      <hr />      
      <input type="text"
        value={newGreeting}
        onChange={greetingChange}
      />      
      <br />
```

Questo è il campo di testo di input in cui l'utente può impostare un nuovo saluto. Ogni volta che l'utente preme un tasto, chiamiamo `greetingChange`, che chiama `setNewGreeting`. Poiché `setNewGreeting` proviene da `useState`, fa sì che il componente `Greeter` venga renderizzato di nuovo. Questo significa che:

- Dobbiamo specificare `value` per mantenere il valore del nuovo saluto, perché altrimenti tornerebbe al valore predefinito, la stringa vuota.
- Anche `simulation` viene aggiornato ogni volta che `newGreeting` cambia, il che significa che otterremo una simulazione con il saluto corretto. Questo potrebbe essere rilevante perché il costo del gas dipende dalla dimensione dei dati della chiamata, che dipende dalla lunghezza della stringa.

```tsx
      <button disabled={!simulation.data}
```

Abilita il pulsante solo quando abbiamo le informazioni necessarie per inviare la transazione.

```tsx
        onClick={async () => {
          updateStatus("Please confirm in wallet...")
```

Aggiorna lo stato. A questo punto, l'utente deve confermare nel portafoglio.

```tsx
          await writeContractAsync(simulation.data.request)
          updateStatus("Transaction sent, waiting for greeting to change...")
        }}
      >
        Update greeting
      </button>

```

`writeContractAsync` restituisce un valore solo dopo che la transazione è stata effettivamente inviata. Questo ci consente di mostrare all'utente da quanto tempo la transazione è in attesa di essere inclusa nella blockchain.

```tsx
      <h4>Status: {status}</h4>
      <p>Updated <Timer lastUpdate={statusTime} /> </p>
    </>
  )
}
```

Mostra lo stato e da quanto tempo è stato aggiornato.

```
export {Greeter}
```

Esporta il componente.

#### `src/wagmi.ts` {#wagmi-ts}

Infine, varie definizioni relative a wagmi si trovano in `src/wagmi.ts`. Non spiegherò tutto qui, perché la maggior parte è boilerplate che difficilmente avrai bisogno di cambiare.

```ts
import { http, webSocket, createConfig, fallback } from 'wagmi'
import { sepolia } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

export const config = createConfig({
  chains: [sepolia],
```

La configurazione di wagmi include le catene supportate da questa applicazione. Puoi vedere l'[elenco delle catene disponibili](https://wagmi.sh/core/api/chains).

```ts
  connectors: [
    injected(),
  ],
```

[Questo connettore](https://wagmi.sh/core/api/connectors/injected) ci consente di comunicare con un portafoglio installato nel browser.

```ts
  transports: {
    [sepolia.id]: http()
```

L'endpoint HTTP predefinito fornito con Viem è sufficiente. Se vogliamo un URL diverso, possiamo usare `http("https:// hostname ")` o `webSocket("wss:// hostname ")`.

```ts
  },
  multiInjectedProviderDiscovery: false,
})
```

## Aggiungere un'altra blockchain {#add-blockchain}

Al giorno d'oggi ci sono molte [soluzioni di scalabilità di livello 2](https://ethereum.org/layer-2/), e potresti voler supportarne alcune che viem non supporta ancora. Per farlo, modifica `src/wagmi.ts`. Queste istruzioni spiegano come aggiungere [Optimism Sepolia](https://chainlist.org/chain/11155420).

1.  Modifica `src/wagmi.ts`

    A. Importa il tipo `defineChain` da viem.

          ```ts
          import { defineChain } from 'viem'
```

    B. Aggiungi la definizione della rete. Non hai davvero bisogno di farlo per Optimism Sepolia, [è già in `viem`](https://github.com/wevm/viem/blob/main/src/chains/definitions/optimismSepolia.ts), ma in questo modo impari come aggiungere una blockchain che non è in `viem`.

          ```ts
          const optimismSepolia = defineChain({
              id: 11_155_420,
              name: 'OP Sepolia',
              nativeCurrency: { name: 'Sepolia Ether', symbol: 'ETH', decimals: 18 },
              rpcUrls: {
                default: {
                  http: ['https://sepolia.optimism.io'],
                  webSocket: ['wss://optimism-sepolia.drpc.org'],
                },
              },
              blockExplorers: {
                default: {
                  name: 'Blockscout',
                  url: 'https://optimism-sepolia.blockscout.com',
                  apiUrl: 'https://optimism-sepolia.blockscout.com/api',
                }
              },
          })
```

    C. Aggiungi la nuova catena alla chiamata `createConfig`.

          ```ts
          export const config = createConfig({
            chains: [sepolia, optimismSepolia],
            connectors: [
              injected(),
            ],
            transports: {
              [optimismSepolia.id]: http(),
              [sepolia.id]: http()
            },
            multiInjectedProviderDiscovery: false,
          })
```

2.  Modifica `src/App.tsx` per commentare il passaggio automatico a Sepolia. Su un sistema di produzione, probabilmente mostreresti pulsanti con collegamenti a ciascuna delle blockchain che supporti.

    ```ts
    /* useEffect(() => {
      if (connection.status === 'connected' &&
          connection.chainId !== SEPOLIA_CHAIN_ID
      ) {
        switchChain({ chainId: SEPOLIA_CHAIN_ID })
      }
    }, [connection.status, connection.chainId]) */
    








```

3.  Modifica `src/Greeter.tsx` per assicurarti che l'applicazione conosca l'indirizzo dei tuoi contratti sulla nuova rete.

    ```ts
    const contractAddrs: AddressPerBlockchainType = {
      // Optimism Sepolia
      11155420: "0x4dd85791923E9294E934271522f63875EAe5806f",

      // Sepolia
      11155111: "0x7143d5c190F048C8d19fe325b748b081903E3BF0",
    }
```

4.  Nel tuo browser.

    A. Naviga su [ChainList](https://chainlist.org/chain/11155420?testnets=true) e fai clic su uno dei pulsanti sul lato destro della tabella per aggiungere la catena al tuo portafoglio.

    B. Nell'applicazione, fai clic su **Disconnect** e poi riconnettiti per cambiare la blockchain. Ci sono modi più eleganti per gestirlo, ma richiederebbero modifiche all'applicazione.

## Conclusione {#conclusion}

Naturalmente, non ti interessa davvero fornire un'interfaccia utente per `Greeter`. Vuoi creare un'interfaccia utente per i tuoi contratti. Per creare la tua applicazione, esegui questi passaggi:

1. Specifica di creare un'applicazione wagmi.

   ```sh copy
   npm create wagmi
```

2. Digita `y` per procedere.

3. Dai un nome all'applicazione.

4. Seleziona il framework **React**.

5. Seleziona la variante **Vite**.

Ora vai e rendi i tuoi contratti utilizzabili per il mondo intero.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).