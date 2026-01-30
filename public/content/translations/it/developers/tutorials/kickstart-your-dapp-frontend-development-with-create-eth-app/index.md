---
title: Avvia lo sviluppo del frontend della tua dApp con create-eth-app
description: Una panoramica su come usare create-eth-app e le sue funzionalità
author: "Markus Waas"
tags:
  [
    "frontend",
    "javascript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: it
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

L'ultima volta abbiamo dato uno sguardo [alla panoramica di Solidity](https://soliditydeveloper.com/solidity-overview-2020) e abbiamo già menzionato [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ora scoprirai come usarlo, quali funzionalità sono integrate e idee aggiuntive su come espanderlo. Creata da Paul Razvan Berg, il fondatore di [Sablier](http://sablier.com/), questa app darà il via allo sviluppo del tuo frontend e offre diverse integrazioni opzionali tra cui scegliere.

## Installazione {#installation}

L'installazione richiede Yarn 0.25 o superiore (`npm install yarn --global`). È semplice come eseguire:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Utilizza [create-react-app](https://github.com/facebook/create-react-app) sotto il cofano. Per vedere la tua app, apri `http://localhost:3000/`. Quando sei pronto a eseguire il deploy in produzione, crea un bundle minimizzato con yarn build. Un modo semplice per ospitarlo sarebbe [Netlify](https://www.netlify.com/). Puoi creare un repository GitHub, aggiungerlo a Netlify, configurare il comando di build e il gioco è fatto! La tua app sarà ospitata e utilizzabile da tutti. E tutto gratuitamente.

## Funzionalità {#features}

### React e create-react-app {#react--create-react-app}

Prima di tutto il cuore dell'app: React e tutte le funzionalità aggiuntive che derivano da _create-react-app_. Usare solo questo è un'ottima opzione se non vuoi integrare Ethereum. [React](https://react.dev/) stesso rende la creazione di interfacce utente (UI) interattive molto semplice. Potrebbe non essere così facile per i principianti come [Vue](https://vuejs.org/), ma è comunque il più utilizzato, ha più funzionalità e, soprattutto, migliaia di librerie aggiuntive tra cui scegliere. L'_create-react-app_ rende anche molto facile iniziare e include:

- Supporto della sintassi di React, JSX, ES6, TypeScript e Flow.
- Funzionalità extra del linguaggio oltre a ES6 come l'operatore spread dell'oggetto.
- CSS con prefisso automatico, quindi non sono necessari `-webkit-` o altri prefissi.
- Un veloce esecutore di unit test interattivo con supporto integrato per la segnalazione della copertura.
- Un server di sviluppo in tempo reale che avverte degli errori comuni.
- Uno script di build per creare un bundle di JS, CSS e immagini per la produzione, con hash e sourcemap.

In particolare, _create-eth-app_ fa uso dei nuovi [effetti degli hook](https://legacy.reactjs.org/docs/hooks-effect.html). Un metodo per scrivere i cosiddetti componenti funzionali, potenti ma molto piccoli. Vedi la sezione sottostante su Apollo per scoprire come vengono utilizzati in _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) permette di avere più pacchetti, gestendoli tutti dalla cartella radice e installando le dipendenze per tutti in una volta sola usando `yarn install`. Ciò ha senso soprattutto per pacchetti aggiuntivi più piccoli come la gestione di indirizzi/ABI dei contratti intelligenti (le informazioni su dove hai distribuito quali contratti intelligenti e come comunicare con essi) o l'integrazione di The Graph, entrambi parte di `create-eth-app`.

### ethers.js {#ethersjs}

Anche se [Web3](https://docs.web3js.org/) è ancora il più utilizzato, [ethers.js](https://docs.ethers.io/) ha guadagnato molta più popolarità come alternativa nell'ultimo anno ed è quello integrato in _create-eth-app_. Puoi lavorare con questo, passare a Web3 o considerare l'aggiornamento a [ethers.js v5](https://docs.ethers.org/v5/) che è quasi uscito dalla beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) è un modo alternativo per gestire i dati rispetto a una [API RESTful](https://restfulapi.net/). Presenta diversi vantaggi rispetto alle API RESTful, specialmente per i dati decentralizzati della blockchain. Se sei interessato al ragionamento che c'è dietro, dai un'occhiata a [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Di solito, recupereresti i dati direttamente dal tuo contratto intelligente. Vuoi leggere l'ora dell'ultima operazione? Basta chiamare `MyContract.methods.latestTradeTime().call()`, che recupera i dati da un nodo di Ethereum nella tua dApp. Ma cosa succede se hai bisogno di centinaia di punti dati diversi? Ciò comporterebbe centinaia di recuperi di dati al nodo, ognuno dei quali richiederebbe un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), rendendo la tua dApp lenta e inefficiente. Una soluzione alternativa potrebbe essere una funzione di chiamata fetcher all'interno del tuo contratto che restituisce più dati contemporaneamente. Questa soluzione però non è sempre ideale.

E poi potresti essere interessato anche ai dati storici. Vuoi conoscere non solo l'ora dell'ultima operazione, ma anche gli orari di tutte le operazioni che hai eseguito. Usa il pacchetto subgraph di _create-eth-app_, leggi la [documentazione](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) e adattalo ai tuoi contratti. Se stai cercando contratti intelligenti popolari, potrebbe già esistere un subgraph. Dai un'occhiata all'[esploratore di subgraph](https://thegraph.com/explorer/).

Una volta che hai un subgraph, questo ti permette di scrivere una semplice query nella tua dApp che recupera tutti i dati importanti della blockchain di cui hai bisogno, inclusi quelli storici, con un solo recupero richiesto.

### Apollo {#apollo}

Grazie all'integrazione di [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puoi facilmente integrare The Graph nella tua dApp React. Soprattutto quando si usano gli [hook di React e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), recuperare i dati è semplice come scrivere una singola query GraphQL nel tuo componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelli {#templates}

Inoltre, puoi scegliere tra diversi modelli. Finora puoi usare un'integrazione Aave, Compound, UniSwap o sablier. Tutti aggiungono importanti indirizzi di contratti intelligenti di servizio insieme a integrazioni subgraph pre-realizzate. Basta aggiungere il modello al comando di creazione, ad esempio `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) è un mercato decentralizzato di prestiti monetari. I depositanti forniscono liquidità al mercato per guadagnare un reddito passivo, mentre i mutuatari sono in grado di prendere in prestito usando garanzie. Una caratteristica unica di Aave sono i [prestiti flash](https://aave.com/docs/developers/flash-loans) che ti consentono di prendere in prestito denaro senza alcuna garanzia, a condizione che il prestito venga restituito all'interno di una singola transazione. Questo può essere utile, ad esempio, per darti liquidità extra nel trading di arbitraggio.

I token scambiati che ti fruttano interessi sono chiamati _aTokens_.

Quando scegli di integrare Aave con _create-eth-app_, otterrai un'[integrazione subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave usa The Graph e ti fornisce già diversi subgraph pronti per l'uso su [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e [Rete Principale](https://thegraph.com/explorer/subgraph/aave/protocol) in forma [grezza](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [formattata](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme sui Prestiti Flash di Aave – "Sììì, se potessi tenere il mio prestito flash per più di una transazione, sarebbe fantastico"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) è simile ad Aave. L'integrazione include già il nuovo [Subgraph di Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). I token che generano interessi qui sono sorprendentemente chiamati _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) è una borsa decentralizzata (DEX). I fornitori di liquidità possono guadagnare commissioni fornendo i token o l'ether necessari per entrambe le parti di uno scambio. È ampiamente utilizzato e quindi ha una delle più alte liquidità per una vasta gamma di token. Puoi integrarlo facilmente nella tua dApp per, ad esempio, consentire agli utenti di scambiare i loro ETH con DAI.

Sfortunatamente, al momento della stesura di questo articolo, l'integrazione è solo per Uniswap v1 e non per la [v2 appena rilasciata](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) consente agli utenti lo streaming di pagamenti in denaro. Invece di un singolo giorno di paga, ricevi il tuo denaro costantemente senza ulteriore amministrazione dopo la configurazione iniziale. L'integrazione include il suo [subgraph personale](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Quali sono i prossimi passi? {#whats-next}

Se hai domande su _create-eth-app_, vai al [server della community di Sablier](https://discord.gg/bsS8T47), dove puoi metterti in contatto con gli autori di _create-eth-app_. Come primi passi successivi, potresti voler integrare un framework UI come [Material UI](https://mui.com/material-ui/), scrivere query GraphQL per i dati di cui hai effettivamente bisogno e impostare il deploy.
