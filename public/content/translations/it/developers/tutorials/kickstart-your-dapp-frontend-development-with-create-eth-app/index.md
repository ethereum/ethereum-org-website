---
title: Avvia lo sviluppo del frontend della tua dApp con create-eth-app
description: "Una panoramica su come usare create-eth-app e le sue funzionalità"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: it
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

L'ultima volta abbiamo dato un'occhiata al [quadro generale di Solidity](https://soliditydeveloper.com/solidity-overview-2020) e abbiamo già menzionato [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ora scoprirai come usarla, quali funzionalità sono integrate e ulteriori idee su come espanderla. Creata da Paul Razvan Berg, il fondatore di [Sablier](http://sablier.com/), questa app avvierà lo sviluppo del tuo frontend e include diverse integrazioni opzionali tra cui scegliere.

## Installazione {#installation}

L'installazione richiede Yarn 0.25 o superiore (`npm install yarn --global`). È semplice come eseguire:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Utilizza [create-react-app](https://github.com/facebook/create-react-app) dietro le quinte. Per vedere la tua app, apri `http://localhost:3000/`. Quando sei pronto per la distribuzione in produzione, crea un pacchetto minimizzato con yarn build. Un modo semplice per ospitarlo sarebbe [Netlify](https://www.netlify.com/). Puoi creare un repository GitHub, aggiungerlo a Netlify, configurare il comando di build e hai finito! La tua app sarà ospitata e utilizzabile da tutti. E tutto questo gratuitamente.

## Funzionalità {#features}

### React e create-react-app {#react--create-react-app}

Prima di tutto il cuore dell'app: React e tutte le funzionalità aggiuntive fornite con _create-react-app_. Usare solo questo è un'ottima opzione se non vuoi integrare Ethereum. [React](https://react.dev/) stesso rende la creazione di interfacce utente interattive davvero semplice. Potrebbe non essere adatto ai principianti quanto [Vue](https://vuejs.org/), ma è comunque il più utilizzato, ha più funzionalità e, cosa più importante, migliaia di librerie aggiuntive tra cui scegliere. Anche _create-react-app_ rende davvero facile iniziare a usarlo e include:

- Supporto per la sintassi di React, JSX, ES6, TypeScript e Flow.
- Extra del linguaggio oltre a ES6 come l'operatore spread per gli oggetti.
- CSS con prefissi automatici, così non hai bisogno di -webkit- o altri prefissi.
- Un esecutore di test unitari interattivo e veloce con supporto integrato per i report di copertura.
- Un server di sviluppo live che avvisa degli errori comuni.
- Uno script di build per raggruppare JS, CSS e immagini per la produzione, con hash e sourcemap.

In particolare, _create-eth-app_ fa uso dei nuovi [effetti degli hook](https://legacy.reactjs.org/docs/hooks-effect.html). Un metodo per scrivere componenti cosiddetti funzionali potenti, ma molto piccoli. Consulta la sezione seguente su Apollo per scoprire come vengono utilizzati in _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) ti consente di avere più pacchetti, ma di poterli gestire tutti dalla cartella principale e di installare le dipendenze per tutti in una volta sola usando `yarn install`. Questo ha particolarmente senso per pacchetti aggiuntivi più piccoli come la gestione degli indirizzi/ABI dei contratti intelligenti (le informazioni su dove hai distribuito quali contratti intelligenti e come comunicare con essi) o l'integrazione di The Graph, entrambi parte di `create-eth-app`.

### ethers.js {#ethersjs}

Sebbene [Web3](https://docs.web3js.org/) sia ancora il più utilizzato, [ethers.js](https://docs.ethers.io/) ha ottenuto molta più trazione come alternativa nell'ultimo anno ed è quello integrato in _create-eth-app_. Puoi lavorare con questo, passare a Web3 o considerare l'aggiornamento a [ethers.js v5](https://docs.ethers.org/v5/) che è quasi fuori dalla fase beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) è un modo alternativo per gestire i dati rispetto a un'[API Restful](https://restfulapi.net/). Hanno diversi vantaggi rispetto alle API Restful, specialmente per i dati decentralizzati della blockchain. Se sei interessato al ragionamento alla base di questo, dai un'occhiata a [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Di solito recupereresti i dati direttamente dal tuo contratto intelligente. Vuoi leggere l'ora dell'ultimo scambio? Basta chiamare `MyContract.methods.latestTradeTime().call()` che recupera i dati da un nodo di Ethereum nella tua dApp. Ma cosa succede se hai bisogno di centinaia di punti dati diversi? Ciò comporterebbe centinaia di recuperi di dati verso il nodo, richiedendo ogni volta un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) che rende la tua dApp lenta e inefficiente. Una soluzione alternativa potrebbe essere una funzione di chiamata di recupero all'interno del tuo contratto che restituisce più dati contemporaneamente. Tuttavia, questo non è sempre l'ideale.

E poi potresti essere interessato anche ai dati storici. Vuoi conoscere non solo l'ora dell'ultimo scambio, ma gli orari di tutti gli scambi che hai mai effettuato tu stesso. Usa il pacchetto subgraph di _create-eth-app_, leggi la [documentazione](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) e adattalo ai tuoi contratti. Se stai cercando contratti intelligenti popolari, potrebbe esserci già un sottografo. Dai un'occhiata all'[esploratore di sottografi](https://thegraph.com/explorer/).

Una volta che hai un sottografo, ti consente di scrivere una semplice query nella tua dApp che recupera tutti i dati importanti della blockchain, inclusi quelli storici di cui hai bisogno, richiedendo un solo recupero.

### Apollo {#apollo}

Grazie all'integrazione di [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) puoi facilmente integrare The Graph nella tua dApp React. Specialmente quando si usano [gli hook di React e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), recuperare i dati è semplice come scrivere una singola query GraphQl nel tuo componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelli {#templates}

Inoltre puoi scegliere tra diversi modelli. Finora puoi usare un'integrazione Aave, Compound, UniSwap o Sablier. Tutti aggiungono importanti indirizzi di contratti intelligenti di servizio insieme a integrazioni di sottografi predefinite. Basta aggiungere il modello al comando di creazione come `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) è un mercato di prestito di denaro decentralizzato. I depositanti forniscono liquidità al mercato per guadagnare un reddito passivo, mentre i mutuatari sono in grado di prendere in prestito utilizzando collaterali. Una caratteristica unica di Aave sono i [prestiti lampo (flash loan)](https://aave.com/docs/developers/flash-loans) che ti consentono di prendere in prestito denaro senza alcun collaterale, a patto di restituire il prestito all'interno di una singola transazione. Questo può essere utile, ad esempio, per darti liquidità extra nel trading di arbitraggio.

I token scambiati che ti fanno guadagnare interessi sono chiamati _aToken_.

Quando scegli di integrare Aave con _create-eth-app_, otterrai un'[integrazione del sottografo](https://docs.aave.com/developers/getting-started/using-graphql). Aave usa The Graph e ti fornisce già diversi sottografi pronti all'uso su [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e sulla [rete principale](https://thegraph.com/explorer/subgraph/aave/protocol) in forma [grezza](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [formattata](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme sui prestiti lampo di Aave – "Sììì, se potessi tenere il mio prestito lampo per più di 1 transazione, sarebbe fantastico"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) è simile ad Aave. L'integrazione include già il nuovo [sottografo Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). I token che guadagnano interessi qui sono sorprendentemente chiamati _cToken_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) è un exchange decentralizzato (DEX). I fornitori di liquidità possono guadagnare commissioni fornendo i token o gli ether richiesti per entrambi i lati di uno scambio. È ampiamente utilizzato e quindi ha una delle liquidità più elevate per una gamma molto ampia di token. Puoi facilmente integrarlo nella tua dApp per, ad esempio, consentire agli utenti di scambiare i loro ETH per DAI.

Sfortunatamente, al momento della stesura di questo articolo l'integrazione è solo per Uniswap v1 e non per la [v2 appena rilasciata](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) consente agli utenti di trasmettere pagamenti in denaro in streaming. Invece di un singolo giorno di paga, ottieni effettivamente i tuoi soldi costantemente senza ulteriore amministrazione dopo la configurazione iniziale. L'integrazione include il suo [sottografo dedicato](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Quali sono i prossimi passi? {#whats-next}

Se hai domande su _create-eth-app_, vai al [server della community di Sablier](https://discord.gg/bsS8T47), dove puoi metterti in contatto con gli autori di _create-eth-app_. Come primi passi successivi potresti voler integrare un framework per l'interfaccia utente come [Material UI](https://mui.com/material-ui/), scrivere query GraphQL per i dati di cui hai effettivamente bisogno e configurare la distribuzione.