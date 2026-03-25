---
title: "Componenti server e agenti per app web3"
description: "Dopo aver letto questo tutorial, sarai in grado di scrivere server TypeScript che ascoltano gli eventi su una blockchain e rispondono di conseguenza con le proprie transazioni. Questo ti consentirà di scrivere applicazioni centralizzate (poiché il server è un punto di vulnerabilità), ma in grado di interagire con le entità web3. Le stesse tecniche possono essere utilizzate anche per scrivere un agente che risponde agli eventi on-chain senza l'intervento umano."

author: Ori Pomerantz
lang: it
tags: ["agente", "server", "fuori catena", "dApp"]
skill: beginner
breadcrumb: Componenti server
published: 2024-07-15
---

## Introduzione {#introduction}

Nella maggior parte dei casi, un'app decentralizzata utilizza un server per distribuire il software, ma tutta l'interazione effettiva avviene tra il client (in genere, il browser web) e la blockchain.

![Interazione normale tra server web, client e blockchain](./fig-1.svg)

Tuttavia, ci sono alcuni casi in cui un'applicazione trarrebbe vantaggio dall'avere un componente server che viene eseguito in modo indipendente. Un tale server sarebbe in grado di rispondere agli eventi e alle richieste provenienti da altre fonti, come un'API, emettendo transazioni.

![L'interazione con l'aggiunta di un server](./fig-2.svg)

Ci sono diverse possibili attività che un tale server potrebbe svolgere.

- Detentore di uno stato segreto. Nel gaming è spesso utile non avere tutte le informazioni note al gioco a disposizione dei giocatori. Tuttavia, _non ci sono segreti sulla blockchain_, qualsiasi informazione presente nella blockchain è facile da scoprire per chiunque. Pertanto, se parte dello stato del gioco deve essere mantenuta segreta, deve essere archiviata altrove (e possibilmente far verificare gli effetti di tale stato utilizzando [prove a conoscenza-zero](/zero-knowledge-proofs)).

- Oracolo centralizzato. Se la posta in gioco è sufficientemente bassa, un server esterno che legge alcune informazioni online e poi le pubblica sulla catena potrebbe essere sufficiente per essere utilizzato come [oracolo](/developers/docs/oracles/).

- Agente. Non succede nulla sulla blockchain senza una transazione che lo attivi. Un server può agire per conto di un utente per eseguire azioni come l'[arbitraggio](/developers/docs/mev/#mev-examples-dex-arbitrage) quando se ne presenta l'opportunità.

## Programma di esempio {#sample-program}

Puoi vedere un server di esempio [su github](https://github.com/qbzzt/20240715-server-component). Questo server ascolta gli eventi provenienti da [questo contratto](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=contract_code), una versione modificata del Greeter di Hardhat. Quando il saluto viene modificato, lo ripristina.

Per eseguirlo:

1. Clona il repository.

   ```sh copy
   git clone https://github.com/qbzzt/20240715-server-component.git
   cd 20240715-server-component
```

2. Installa i pacchetti necessari. Se non lo hai già fatto, [installa prima Node](https://nodejs.org/en/download/package-manager).

   ```sh copy
   npm install
```

3. Modifica `.env` per specificare la chiave privata di un account che possiede ETH sulla rete di test Holesky. Se non hai ETH su Holesky, puoi [usare questo rubinetto](https://holesky-faucet.pk910.de/).

   ```sh filename=".env" copy
   PRIVATE_KEY=0x <private key goes here>
```

4. Avvia il server.

   ```sh copy
   npm start
```

5. Vai su [un esploratore di blocchi](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract) e, utilizzando un indirizzo diverso da quello che possiede la chiave privata, modifica il saluto. Vedrai che il saluto viene automaticamente ripristinato.

### Come funziona? {#how-it-works}

Il modo più semplice per capire come scrivere un componente server è esaminare l'esempio riga per riga.

#### `src/app.ts` {#src-app-ts}

La stragrande maggioranza del programma è contenuta in [`src/app.ts`](https://github.com/qbzzt/20240715-server-component/blob/main/src/app.ts).

##### Creazione degli oggetti prerequisiti

```typescript
import {
  createPublicClient,
  createWalletClient,
  getContract,
  http,
  Address,
} from "viem"
```

Queste sono le entità di [Viem](https://viem.sh/) di cui abbiamo bisogno, le funzioni e [il tipo `Address`](https://viem.sh/docs/glossary/types#address). Questo server è scritto in [TypeScript](https://www.typescriptlang.org/), che è un'estensione di JavaScript che lo rende [fortemente tipizzato](https://en.wikipedia.org/wiki/Strong_and_weak_typing).

```typescript
import { privateKeyToAccount } from "viem/accounts"
```

[Questa funzione](https://viem.sh/docs/accounts/privateKey) ci consente di generare le informazioni del portafoglio, incluso l'indirizzo, corrispondenti a una chiave privata.

```typescript
import { holesky } from "viem/chains"
```

Per utilizzare una blockchain in Viem è necessario importarne la definizione. In questo caso, vogliamo connetterci alla blockchain di test [Holesky](https://github.com/eth-clients/holesky).

```typescript
// Ecco come aggiungiamo le definizioni in .env a process.env.
import * as dotenv from "dotenv"
dotenv.config()
```

Ecco come leggiamo `.env` nell'ambiente. Ne abbiamo bisogno per la chiave privata (vedi in seguito).

```typescript
const greeterAddress : Address = "0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6"
const greeterABI = [
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
         .
         .
         .
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_greeting",
                "type": "string"
            }
        ],
        "name": "setGreeting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
] as const
```

Per utilizzare un contratto abbiamo bisogno del suo indirizzo e della sua [ABI](/glossary/#abi). Li forniamo entrambi qui.

In JavaScript (e quindi in TypeScript) non puoi assegnare un nuovo valore a una costante, ma _puoi_ modificare l'oggetto in essa memorizzato. Utilizzando il suffisso `as const` stiamo dicendo a TypeScript che l'elenco stesso è costante e non può essere modificato.

```typescript
const publicClient = createPublicClient({
  chain: holesky,
  transport: http(),
})
```

Crea un [client pubblico](https://viem.sh/docs/clients/public.html) Viem. I client pubblici non hanno una chiave privata associata e pertanto non possono inviare transazioni. Possono chiamare [funzioni `view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm), leggere i saldi degli account, ecc.

```typescript
const account = privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`)
```

Le variabili d'ambiente sono disponibili in [`process.env`](https://www.totaltypescript.com/how-to-strongly-type-process-env). Tuttavia, TypeScript è fortemente tipizzato. Una variabile d'ambiente può essere qualsiasi stringa, o vuota, quindi il tipo per una variabile d'ambiente è `string | undefined`. Tuttavia, una chiave è definita in Viem come `0x${string}` (`0x` seguito da una stringa). Qui diciamo a TypeScript che la variabile d'ambiente `PRIVATE_KEY` sarà di quel tipo. In caso contrario, otterremo un errore di runtime.

La funzione [`privateKeyToAccount`](https://viem.sh/docs/accounts/privateKey) utilizza quindi questa chiave privata per creare un oggetto account completo.

```typescript
const walletClient = createWalletClient({
  account,
  chain: holesky,
  transport: http(),
})
```

Successivamente, utilizziamo l'oggetto account per creare un [client portafoglio](https://viem.sh/docs/clients/wallet). Questo client ha una chiave privata e un indirizzo, quindi può essere utilizzato per inviare transazioni.

```typescript
const greeter = getContract({
  address: greeterAddress,
  abi: greeterABI,
  client: { public: publicClient, wallet: walletClient },
})
```

Ora che abbiamo tutti i prerequisiti, possiamo finalmente creare un'[istanza del contratto](https://viem.sh/docs/contract/getContract). Utilizzeremo questa istanza del contratto per comunicare con il contratto on-chain.

##### Lettura dalla blockchain

```typescript
console.log(`Current greeting:`, await greeter.read.greet())
```

Le funzioni del contratto di sola lettura ([`view`](https://www.tutorialspoint.com/solidity/solidity_view_functions.htm) e [`pure`](https://www.tutorialspoint.com/solidity/solidity_pure_functions.htm)) sono disponibili sotto `read`. In questo caso, lo utilizziamo per accedere alla funzione [`greet`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=read_contract#cfae3217), che restituisce il saluto.

JavaScript è a thread singolo, quindi quando avviamo un processo di lunga durata dobbiamo [specificare che lo facciamo in modo asincrono](https://eloquentjavascript.net/11_async.html#h-XvLsfAhtsE). Chiamare la blockchain, anche per un'operazione di sola lettura, richiede un viaggio di andata e ritorno tra il computer e un nodo della blockchain. Questo è il motivo per cui specifichiamo qui che il codice deve attendere (`await`) il risultato.

Se sei interessato a come funziona, puoi [leggerlo qui](https://www.w3schools.com/js/js_promise.asp), ma in termini pratici tutto ciò che devi sapere è che devi usare `await` per i risultati se avvii un'operazione che richiede molto tempo, e che qualsiasi funzione che lo fa deve essere dichiarata come `async`.

##### Emissione di transazioni

```typescript
const setGreeting = async (greeting: string): Promise<any> => {
```

Questa è la funzione che chiami per emettere una transazione che modifica il saluto. Poiché si tratta di un'operazione lunga, la funzione è dichiarata come `async`. A causa dell'implementazione interna, qualsiasi funzione `async` deve restituire un oggetto `Promise`. In questo caso, `Promise<any>` significa che non specifichiamo cosa verrà esattamente restituito nella `Promise`.

```typescript
const txHash = await greeter.write.setGreeting([greeting])
```

Il campo `write` dell'istanza del contratto contiene tutte le funzioni che scrivono nello stato della blockchain (quelle che richiedono l'invio di una transazione), come [`setGreeting`](https://eth-holesky.blockscout.com/address/0xB8f6460Dc30c44401Be26B0d6eD250873d8a50A6?tab=write_contract#a4136862). I parametri, se presenti, vengono forniti come elenco e la funzione restituisce l'hash della transazione.

```typescript
    console.log(`Working on a fix, see https://eth-holesky.blockscout.com/tx/${txHash}`)

    return txHash
}
```

Segnala l'hash della transazione (come parte di un URL all'esploratore di blocchi per visualizzarlo) e restituiscilo.

##### Rispondere agli eventi

```typescript
greeter.watchEvent.SetGreeting({
```

[La funzione `watchEvent`](https://viem.sh/docs/actions/public/watchEvent) ti consente di specificare che una funzione deve essere eseguita quando viene emesso un evento. Se ti interessa solo un tipo di evento (in questo caso, `SetGreeting`), puoi utilizzare questa sintassi per limitarti a quel tipo di evento.

```typescript
    onLogs: logs => {
```

La funzione `onLogs` viene chiamata quando ci sono voci di registro. In Ethereum "log" ed "evento" sono solitamente intercambiabili.

```typescript
console.log(
  `Address ${logs[0].args.sender} changed the greeting to ${logs[0].args.greeting}`
)
```

Potrebbero esserci più eventi, ma per semplicità ci interessa solo il primo. `logs[0].args` sono gli argomenti dell'evento, in questo caso `sender` e `greeting`.

```typescript
        if (logs[0].args.sender != account.address)
            setGreeting(`${account.address} insists on it being Hello!`)
    }
})
```

Se il mittente _non_ è questo server, usa `setGreeting` per cambiare il saluto.

#### `package.json` {#package-json}

[Questo file](https://github.com/qbzzt/20240715-server-component/blob/main/package.json) controlla la configurazione di [Node.js](https://nodejs.org/en). Questo articolo spiega solo le definizioni importanti.

```json
{
  "main": "dist/index.js",
```

Questa definizione specifica quale file JavaScript eseguire.

```json
  "scripts": {
    "start": "tsc && node dist/app.js",
  },
```

Gli script sono varie azioni dell'applicazione. In questo caso, l'unico che abbiamo è `start`, che compila e poi esegue il server. Il comando `tsc` fa parte del pacchetto `typescript` e compila TypeScript in JavaScript. Se vuoi eseguirlo manualmente, si trova in `node_modules/.bin`. Il secondo comando esegue il server.

```json
  "type": "module",
```

Esistono diversi tipi di applicazioni node JavaScript. Il tipo `module` ci consente di avere `await` nel codice di livello superiore, il che è importante quando si eseguono operazioni lente (e quindi asincrone).

```json
  "devDependencies": {
    "@types/node": "^20.14.2",
    "typescript": "^5.4.5"
  },
```

Questi sono pacchetti richiesti solo per lo sviluppo. Qui abbiamo bisogno di `typescript` e, poiché lo stiamo utilizzando con Node.js, stiamo anche ottenendo i tipi per le variabili e gli oggetti di node, come `process`. [La notazione `^<version>`](https://github.com/npm/node-semver?tab=readme-ov-file#caret-ranges-123-025-004) indica quella versione o una versione superiore che non presenta modifiche incompatibili. Vedi [qui](https://semver.org) per maggiori informazioni sul significato dei numeri di versione.

```json
  "dependencies": {
    "dotenv": "^16.4.5",
    "viem": "2.14.1"
  }
}
```

Questi sono pacchetti richiesti in fase di esecuzione, quando si esegue `dist/app.js`.

## Conclusione {#conclusion}

Il server centralizzato che abbiamo creato qui fa il suo lavoro, ovvero agire come agente per un utente. Chiunque altro voglia che la dApp continui a funzionare e sia disposto a spendere il gas può eseguire una nuova istanza del server con il proprio indirizzo.

Tuttavia, questo funziona solo quando le azioni del server centralizzato possono essere facilmente verificate. Se il server centralizzato ha informazioni di stato segrete o esegue calcoli difficili, è un'entità centralizzata di cui devi fidarti per utilizzare l'applicazione, che è esattamente ciò che le blockchain cercano di evitare. In un articolo futuro ho intenzione di mostrare come utilizzare le [prove a conoscenza-zero](/zero-knowledge-proofs) per aggirare questo problema.

[Vedi qui per altri miei lavori](https://cryptodocguy.pro/).