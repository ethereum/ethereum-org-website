---
title: Dai il via allo sviluppo del frontend della tua dapp con create-eth-app
description: "Una panoramica su come utilizzare create-eth-app e le sue funzionalità"
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

La volta scorsa abbiamo dato un'occhiata al [quadro generale di Solidity](https://soliditydeveloper.com/solidity-overview-2020) e abbiamo già menzionato [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ora scoprirai come usarla, quali funzionalità sono integrate e ulteriori idee su come espanderla. Creata da Paul Razvan Berg, il fondatore di [Sablier](https://sablier.com/), questa app darà il via allo sviluppo del tuo frontend e include diverse integrazioni opzionali tra cui scegliere.

## Installazione {#installation}

L'installazione richiede Yarn 0.25 o versioni successive (`npm install yarn --global`). È semplice come eseguire:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Utilizza [create-react-app](https://github.com/facebook/create-react-app) internamente. Per vedere la tua app, apri `http://localhost:3000/`. Quando sei pronto per distribuire in produzione, crea un bundle minimizzato con yarn build. Un modo semplice per ospitarla sarebbe [Netlify](https://www.netlify.com/). Puoi creare una repository su GitHub, aggiungerla a Netlify, configurare il comando di build e hai finito! La tua app sarà ospitata e utilizzabile da tutti. E tutto questo gratuitamente.

## Funzionalità {#features}

### React e create-react-app {#react--create-react-app}

Prima di tutto il cuore dell'app: React e tutte le funzionalità aggiuntive fornite con _create-react-app_. Usare solo questo è un'ottima opzione se non vuoi integrare Ethereum. [React](https://react.dev/) stesso rende la creazione di interfacce utente interattive davvero semplice. Potrebbe non essere così adatto ai principianti come [Vue](https://vuejs.org/), ma è comunque il più utilizzato, ha più funzionalità e, cosa più importante, migliaia di librerie aggiuntive tra cui scegliere. _create-react-app_ rende anche molto facile iniziare a usarlo e include:

- Supporto per la sintassi di React, JSX, ES6, TypeScript e Flow.
- Funzionalità del linguaggio oltre a ES6, come l'operatore spread per gli oggetti.
- CSS con prefissi automatici, in modo da non aver bisogno di -webkit- o altri prefissi.
- Un esecutore di unit test interattivo e veloce con supporto integrato per i report di copertura.
- Un server di sviluppo live che avvisa degli errori comuni.
- Uno script di build per raggruppare JS, CSS e immagini per la produzione, con hash e sourcemap.

_create-eth-app_ in particolare fa uso dei nuovi [hook effect](https://legacy.reactjs.org/docs/hooks-effect.html). Un metodo per scrivere i cosiddetti componenti funzionali, potenti ma molto piccoli. Vedi la sezione seguente su Apollo per scoprire come vengono utilizzati in _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) ti consente di avere più pacchetti, ma di poterli gestire tutti dalla cartella principale e di installare le dipendenze per tutti in una volta sola usando `yarn install`. Questo ha senso soprattutto per pacchetti aggiuntivi più piccoli come la gestione degli indirizzi/ABI degli smart contract (le informazioni su dove hai distribuito quali smart contract e come comunicare con essi) o l'integrazione di The Graph, entrambi parte di `create-eth-app`.

### ethers.js {#ethersjs}

Sebbene [Web3](https://docs.web3js.org/) sia ancora il più utilizzato, [ethers.js](https://docs.ethers.io/) ha ottenuto molta più trazione come alternativa nell'ultimo anno ed è quello integrato in _create-eth-app_. Puoi lavorare con questo, passare a Web3 o considerare l'aggiornamento a [ethers.js v5](https://docs.ethers.org/v5/) che è quasi fuori dalla fase beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) è un modo alternativo per gestire i dati rispetto a un'[API Restful](https://restfulapi.net/). Presenta diversi vantaggi rispetto alle API Restful, specialmente per i dati decentralizzati della blockchain. Se sei interessato al ragionamento alla base di questo, dai un'occhiata a [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Di solito recupereresti i dati direttamente dal tuo smart contract. Vuoi leggere l'ora dell'ultimo scambio? Basta chiamare `MyContract.methods.latestTradeTime().call()` che recupera i dati da un nodo Ethereum nella tua applicazione decentralizzata (dapp). Ma cosa succede se hai bisogno di centinaia di punti dati diversi? Ciò comporterebbe centinaia di recuperi di dati verso il nodo, richiedendo ogni volta un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) che renderebbe la tua dapp lenta e inefficiente. Una soluzione alternativa potrebbe essere una funzione di chiamata di recupero all'interno del tuo contratto che restituisce più dati contemporaneamente. Tuttavia, questo non è sempre l'ideale.

Inoltre, potresti essere interessato anche ai dati storici. Vuoi conoscere non solo l'ora dell'ultimo scambio, ma gli orari di tutti gli scambi che hai mai effettuato. Usa il pacchetto del sottografo di _create-eth-app_, leggi la [documentazione](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) e adattalo ai tuoi contratti. Se stai cercando smart contract popolari, potrebbe esserci già un sottografo. Dai un'occhiata all'[esploratore di sottografi](https://thegraph.com/explorer/).

Una volta che hai un sottografo, ti consente di scrivere una semplice query nella tua dapp che recupera tutti i dati importanti della blockchain, inclusi quelli storici di cui hai bisogno, richiedendo un solo recupero.

### Apollo {#apollo}

Grazie all'integrazione di [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) puoi integrare facilmente The Graph nella tua dapp React. Soprattutto quando si utilizzano gli [hook di React e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), recuperare i dati è semplice come scrivere una singola query GraphQL nel tuo componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelli {#templates}

Inoltre, puoi scegliere tra diversi modelli. Finora puoi utilizzare un'integrazione con Aave, Compound, Uniswap o Sablier. Tutti aggiungono importanti indirizzi di smart contract di servizio insieme a integrazioni di sottografi predefinite. Basta aggiungere il modello al comando di creazione come `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) è un mercato di prestito di denaro decentralizzato. I depositanti forniscono liquidità al mercato per guadagnare un reddito passivo, mentre i mutuatari sono in grado di prendere in prestito utilizzando dei collaterali. Una caratteristica unica di Aave sono i [prestiti lampo](https://aave.com/docs/developers/flash-loans) che ti consentono di prendere in prestito denaro senza alcun collaterale, a patto di restituire il prestito all'interno di una singola transazione. Questo può essere utile, ad esempio, per darti liquidità extra nel trading di arbitraggio.

I token scambiati che ti fanno guadagnare interessi sono chiamati _aToken_.

Quando scegli di integrare Aave con _create-eth-app_, otterrai un'[integrazione del sottografo](https://docs.aave.com/developers/getting-started/using-graphql). Aave utilizza The Graph e ti fornisce già diversi sottografi pronti all'uso su [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) in formato [grezzo](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [formattato](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) è simile ad Aave. L'integrazione include già il nuovo [sottografo di Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). I token che maturano interessi qui sono sorprendentemente chiamati _cToken_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) è un exchange decentralizzato (DEX). I fornitori di liquidità possono guadagnare commissioni fornendo i token o gli ether richiesti per entrambi i lati di uno scambio. È ampiamente utilizzato e pertanto ha una delle liquidità più elevate per una gamma molto ampia di token. Puoi integrarlo facilmente nella tua dapp per consentire agli utenti, ad esempio, di effettuare lo swap dei loro ETH per DAI.

Sfortunatamente, al momento della stesura di questo articolo l'integrazione è solo per Uniswap v1 e non per la [v2 appena rilasciata](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) consente agli utenti di effettuare pagamenti in streaming. Invece di un singolo giorno di paga, ricevi effettivamente i tuoi soldi costantemente senza ulteriore amministrazione dopo la configurazione iniziale. L'integrazione include il [proprio sottografo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Quali sono i prossimi passi? {#whats-next}

Se hai domande su _create-eth-app_, vai al [server della community di Sablier](https://discord.gg/bsS8T47), dove puoi metterti in contatto con gli autori di _create-eth-app_. Come primi passi successivi potresti voler integrare un framework per l'interfaccia utente come [Material UI](https://mui.com/material-ui/), scrivere query GraphQL per i dati di cui hai effettivamente bisogno e configurare la distribuzione.