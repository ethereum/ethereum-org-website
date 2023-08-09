---
title: Avvia lo sviluppo del frontend della tua dapp con create-eth-app
description: Una panoramica su come usare create-eth-app e le sue funzionalità
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "frontend"
  - "javascript"
  - "ethers.js"
  - "the graph"
  - "defi"
skill: beginner
lang: it
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

L'ultima volta abbiamo dato un'occhiata al [quadro generale di Solidity](https://soliditydeveloper.com/solidity-overview-2020) e abbiamo già accennato a [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Ora scoprirai come usarlo, quali funzionalità sono integrate e alcune idee aggiuntive su come approfondilo. Creata da Paul Razvan Berg, fondatore di [Sablier](http://sablier.com/), quest'app avvierà lo sviluppo del tuo frontend, offrendo diverse integrazioni opzionali tra cui scegliere.

## Installazione {#installation}

L'installazione richiede Yarn 0.25 o superiore (`npm install yarn -- global`). L'esecuzione è semplicissima:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Come sistema sottostante utilizza [create-react-app](https://github.com/facebook/create-react-app). Per vedere la tua app, apri `http://localhost:3000/`. Quando sei pronto a distribuire in produzione, crea un pacchetto minimizzato con yarn build. Un modo facile per ospitarlo sarebbe [Netlify](https://www.netlify.com/). Puoi creare una repo di GitHub, aggiungerla a Netlify, configurare il comando build e hai finito! La tua app sarà ospitata e utilizzabile da tutti. E tutto gratuitamente.

## Caratteristiche {#features}

### React e create-react-app {#react--create-react-app}

Prima di tutto, il cuore dell'app: React e tutte le funzionalità aggiuntive fornite con _create-react-app_. Usare solo questo strumento è un'ottima opzione se non vuoi integrare Ethereum. [React](https://reactjs.org/) stesso rende semplicissima la costruzione di UI interattive. Potrebbe non esser facile per i principianti come [Vue](https://vuejs.org/), ma è comunque molto usato, ha più funzionalità e, soprattutto, ha migliaia di librerie aggiuntive tra cui scegliere. _create-react-app_ è facilissimo per iniziare e include:

- Supporto alla sintassi di React, JSX, ES6, TypeScript, Flow.
- Extra linguistici oltre ES6 come l'operatore di diffusione dell'oggetto.
- CSS auto-prefissato, così da non necessitare -webkit- o altri prefissi.
- Un veloce esecutore di test unitari interattivi con supporto integrato per la segnalazione della copertura.
- Un server di sviluppo live che avverte degli errori comuni.
- Uno script di costruzione per riunire JS, CSS e immagini per la produzione, con hash e mappe sorgente.

_create-eth-app_ in particolare, fa uso dei nuovi [effetti hook](https://reactjs.org/docs/hooks-effect.html). Un metodo per scrivere componenti funzionali potenti ma molto piccoli. Vedi di seguito la sezione su Apollo per capire come vengono usati in _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) ti consente di utilizzare più pacchetti e di gestirli tutti dalla cartella di root e installare le dipendenze per tutti in una volta, usando `yarn install`. Ciò è utile soprattutto per i pacchetti aggiuntivi più piccoli, come la gestione di indirizzi/ABI degli smart contract (le informazioni su dove hai distribuito quali smart contract e come comunicare con essi) o l'integrazione di Graph, entrambi parte di `create-eth-app`.

### ethers.js {#ethersjs}

Mentre [Web3](https://docs.web3js.org/) è ancora molto usato, nell'ultimo anno [ethers.js](https://docs.ethers.io/) ha riscosso molto successo come strumento alternativo ed è integrato in _create-eth-app_. Puoi lavorare con questo strumento, passare a Web3 o considerare di aggiornare a [ethers.js v5](https://docs-beta.ethers.io/), che ha quasi terminato la fase beta.

### Graph {#the-graph}

[GraphQL](https://graphql.org/) è un metodo alternativo per gestire i dati rispetto a un'[API di Restful](https://restfulapi.net/). Ha diversi vantaggi rispetto alle Api di Restful, specialmente per i dati della blockchain decentralizzata. Se sei interessato al ragionamento dietro questo metodo, dai un'occhiata a [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Solitamente recupereresti i dati direttamente dal tuo smart contract. Vuoi leggere l'ora dell'ultima operazione? Basta chiamare `MyContract.methods.latestTradeTime().call()`, che recupera i dati da un nodo di Ethereum come Infura, nella tua dapp. E se ci fossero centinaia di punti di dati diversi? Ciò risulterebbe in centinaia di recuperi di dati al nodo, richiedendo ogni volta un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) e rendendo la tua dapp lenta e inefficace. Una scappatoia potrebbe essere una funzione di chiamata del recuperatore nel tuo contratto, in modo da restituire più dati in una volta. Questa soluzione però non è sempre ideale.

E poi potresti essere interessato anche ai dati storici. Vuoi sapere non solo l'orario dell'ultima operazione, ma gli orari per tutte le operazioni che tu stesso hai mai eseguito? Usa il pacchetto subgraph _create-eth-app_, leggi la [documentazione](https://thegraph.com/docs/define-a-subgraph) e adattalo ai tuoi contratti. Se stai cercando degli smart contract popolari, potrebbe anche esistere già un subgraph. Dai un'occhiata al [subgraph explorer](https://thegraph.com/explorer/).

Una volta che hai un grafico secondario, ti consente di scrivere una semplice richiesta nella tua dapp che recuperi tutti i dati importanti della blockchain, inclusi quelli storici che necessiti, tramite un solo recupero necessario.

### Apollo {#apollo}

Grazie all'integrazione di [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puoi integrare facilmente il grafico nella tua dapp di React. Specialmente quando si utilizzano gli [hook di React e Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), recuperare i dati è tanto facile quanto scrivere una singola query di GraphQL nel tuo componente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modelli {#templates}

Inoltre, puoi scegliere tra diversi modelli. Finora puoi usare un'integrazione di Aave, Compound, Uniswap o Sablier. Aggiungono tutti importanti indirizzi di servizi degli smart contract con integrazioni di subgraph pre-realizzate. Basta aggiungere il modello al comando di creazione come in `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) è un mercato per il prestito di denaro decentralizzato. I depositanti forniscono liquidità al mercato per guadagnare un reddito passivo, mentre i debitori possono prendere in prestito usando garanzie. Una funzionalità unica di Aave sono quei [prestiti flash](https://docs.aave.com/developers/guides/flash-loans) che ti consentono di prendere in prestito denaro senza alcuna garanzia, finché restituisci il prestito entro una transazione. Questo può essere utile, ad esempio, per fornirti denaro extra sul trading d'arbitraggio.

I token scambiati che ti fanno guadagnare interessi si chiamano _aTokens_.

Quando scegli di integrare Aave con _create-eth-app_, otterrai un'[integrazione del subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave usa The Graph e ti fornisce già diversi subgraph pronti all'uso su [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) e sulla [rete principale](https://thegraph.com/explorer/subgraph/aave/protocol) in forma [grezza](https://thegraph.com/explorer/subgraph/aave/protocol-raw) o [formattata](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme sui Prestiti Flash di Aave – "Eh già... se potessi mantenere il mio prestito flash per più di una transazione, sarebbe fantastico"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) è simile ad Aave. L'integrazione include già il nuovo [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). A gran sorpresa, qui i token che guadagnano interessi sono chiamati _cToken_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) è uno scambio decentralizzato (DEX). I fornitori di liquidità possono guadagnare commissioni fornendo i token richiesti o ether per ambe le parti di uno scambio. È ampiamente usato e dunque ha una delle liquidità più elevate per una gamma davvero ampia di token. Puoi integrarla facilmente nella tua dapp, ad esempio, per consentire agli utenti di scambiare i propri ETH per DAI.

Sfortunatamente, al momento della redazione del del presente articolo, l'integrazione è solo per Uniswap v1 e non per [la recente v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) consente agli utenti di trasmettere pagamenti in denaro. Invece di un singolo giorno di pagamento, in realtà puoi ricevere denaro costantemente senza ulteriore amministrazione dopo la configurazione iniziale. L'integrazione include i [propri subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## E poi? {#whats-next}

Se hai domande su _create-eth-app_, vai al [server della community di Sablier](https://discord.gg/bsS8T47), dove puoi contattare gli autori di _create-eth-app_. Come passaggi iniziali, potrebbe essere utile integrare un framework dell'UI come [Material UI](https://material-ui.com/), scrivere query di GraphQL per i dati che ti servono realmente e configurare la distribuzione.
