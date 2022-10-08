---
title: Începeţi dezvoltarea aplicației dvs. dapp de frontend cu create-eth-app
description: O prezentare generală a modului de utilizare a create-eth-app și a funcţionalităţilor sale
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "front-end"
  - "javascript"
  - "ethers.js"
  - "the graph"
  - "aave"
  - "compound"
  - "uniswap"
  - "sablier"
skill: beginner
lang: ro
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Ultima dată am examinat [imaginea Solidity în ansamblu](https://soliditydeveloper.com/solidity-overview-2020) şi am menționat deja [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Acum veţi afla cum să o folosiţi, ce funcţionalităţi sunt integrate şi câteva idei suplimentare despre cum să-i dezvoltaţi utilitatea. Lansat de Paul Răzvan Berg, fondatorul [Sablier](http://sablier.finance/), această aplicație vă va da startul pentru dezvoltarea frontend și pune la dispoziţie mai multe integrări opționale din care să alegeți.

## Instalare {#installation}

Instalarea necesită Yarn 0.25 sau o versiune ulterioară (`npm install yarn --global`). Este la fel de simplu ca și în cazul în care rulați:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Acesta folosește [create-react-app](https://github.com/facebook/create-react-app) în culise. Pentru a vă vedea aplicația, deschideți `http://localhost:3000/`. Când sunteți gată să vă lansați aplicația în producție, creați un pachet micșorat cu yarn build. O modalitate ușoară de a găzdui această aplicație ar fi prin [Netlify](https://www.netlify.com/). You can create a GitHub repo, add it to Netlify, setup the build command and you are finished! Aplicația dvs. va fi găzduită și utilizabilă pentru toată lumea. Și toate acestea sunt gratuite.

## Funcţionalităţi {#features}

### React & create-react-app {#react--create-react-app}

Înainte de toate, esenţa aplicației: React și toate funcțiile adiționale care sunt puse la dispoziţie cu _create-react-app_. Folosirea acesteia este o opțiune excelentă dacă nu doriți să integraţi Ethereum. [React](https://reactjs.org/) în sine facilitează mult construcția interfețelor grafice interactive. Poate că nu este la fel de uşor de utilizat de către începători ca [Vue](https://vuejs.org/), dar este cel mai utilizat, având mai multe funcţionalităţi şi, cel mai important, mii de biblioteci suplimentare din care să alegeți. Comanda _create-react-app_ facilitează mult începerea unui nou proiect, incluzând:

- React, JSX, ES6, TypeScript, suport de sintaxă Flow.
- Suplimente lingvistice mai mari decât ES6, precum operatorul de răspândire a obiectului.
- CSS cu autoprefix, deci nu aveţi nevoie de -webkit- sau alte prefixe.
- Un executor de teste unit rapid și interactiv, cu suport încorporat pentru raportarea acoperirii.
- Un server live de dezvoltare care avertizează cu privire la greșelile obișnuite.
- Un script de build pentru JS, CSS și imagini pentru producție, cu hash-uri și sourcemaps.

În special comanda _create-eth-app_ folosește noul [efect de hooks](https://reactjs.org/docs/hooks-effect.html). O metodă de scriere a unor aşa-numite componente funcționale puternice, dar foarte mici. Uitaţi-vă mai jos la secțiunea despre Apollo pentru a afla cum sunt folosite în _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) vă permite să aveți mai multe pachete, dar fiind în măsură să le gestioneze pe toate din dosarul rădăcină și să instaleze dependențe pentru toate deodată folosind `yarn install`. Acest lucru este util în special pentru pachetele suplimentare mai mici, cum ar fi adresele de contracte inteligente/gestionarea ABI (informații privind locul în care ați implementat contractele inteligente și modul de comunicare cu acestea) sau integrarea graficelor, ambele făcând parte din `create-eth-app`.

### ethers.js {#ethersjs}

Chiar dacă [Web3](https://web3js.readthedocs.io/en/v1.2.7/) este încă utilizat cel mai des, sunt mult mai mulţi cei care au aderat la [ethers.js](https://docs.ethers.io/) ca alternativă în ultimul an și este cel integrat în _create-eth-app_. Puteți lucra cu acesta, să îl schimbați cu Web3 sau să luați în considerare actualizarea la [ethers.js v5](https://docs-beta.ethers.io/), care mai are puţin şi iese din stadiul beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) este o alternativă pentru manipularea datelor comparativ cu [Restful API](https://restfulapi.net/). Are mai multe avantaje față de Restful Apis, în special pentru datele descentralizate ale blockchain-ului. Dacă sunteți interesat de raționamentul ce stă la baza acestuia, aruncați o privire la [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

În mod normal, ați prelua date direct din contractul dvs. inteligent. Doriți să citiți ora ultimei tranzacții? Trebuie doar să apelați `MyContract.methods.latestTradeTime().call()`, care preia datele dintr-un nod Ethereum precum Infura în aplicația dvs. Dapp. Dar dacă aveți nevoie de sute de puncte de date diferite? Acest lucru ar duce la preluarea a sute de date către nod, de fiecare dată fiind nevoie de un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), ceea ce face ca aplicaţia dvs. Dapp să fie înceată și ineficientă. O soluţie ar putea fi o apelare a unei funcții fetcher în cadrul contractului care răspunde prin mai multe date simultan. Totuși, nu este întotdeauna ideal să acţionăm astfel.

În plus, v-ar putea interesa şi nişte date istorice. Vreţi să știți nu numai data ultimei tranzacții, ci și datele pentru toate tranzacțiile pe care le-ați făcut vreodată. Utilizați pachetul subgraph din _create-eth-app_, citiți [documentația](https://thegraph.com/docs/define-a-subgraph) și adaptați-l la propriile contracte. Dacă sunteți în căutarea unor contracte inteligente cunoscute, este posibil să existe deja un subgraf. Accesați [exploratorul de subgrafuri](https://thegraph.com/explorer/).

Odată ce aveți un subgraf, acesta vă permite să scrieți o simplă interogare în aplicația dvs. Dapp, care preia toate datele importante din blockchain, inclusiv cele istorice de care aveți nevoie, fiind necesară doar o preluare.

### Apollo {#apollo}

Datorită integrării [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), puteți integra cu ușurință graful în aplicația dvs. Dapp React. Mai ales când folosiți [React hooks și Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), preluarea datelor este la fel de simplă ca scrierea unei singure interogări GraphQL în componenta dvs.:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Șabloane {#templates}

În plus, puteți alege dintre mai multe șabloane diferite. Până acum puteți folosi integrarea Aave, Compound, UniSwap sau sablier. Toate acestea adaugă adrese importante pentru contractele de servicii inteligente, precum și integrări prefabricate ale subgrafurilor. Trebuie doar să adăugați șablonul la comanda de creare `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) este o piață descentralizată de acordare a împrumuturilor. Depozitarii oferă lichidități pieței pentru a câștiga un venit pasiv, în timp ce debitorii pot lua împrumuturi folosind garanții. O funcţionalitate unică deţinută de Aave o constituie acele [împrumuturi flash](https://docs.aave.com/developers/guides/flash-loans) care vă permit să împrumutați bani fără garanții, atâta timp cât returnați împrumutul printr-o singură tranzacție. Acest lucru poate fi util, de exemplu, oferindu-vă bani în plus pentru tranzacțiile de arbitraj.

Tokenurile tranzacționate de pe urma cărora câştigaţi dobândă se numesc _aTokens_.

Când optaţi să integrați Aave cu _create-eth-app_, veți obține [integrarea de subgrafuri](https://docs.aave.com/developers/getting-started/using-graphql). Aave uses The Graph and already provides you with several ready-to-use subgraphs on [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) and [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) in [raw](https://thegraph.com/explorer/subgraph/aave/protocol-raw) or [formatted](https://thegraph.com/explorer/subgraph/aave/protocol) form.

![Memă de împrumut flash Aave – "Daaa, dacă aș putea să îmi păstrez împrumutul flash mai mult de 1 tranzacție ar fi perfect"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) este similar cu Aave. Integrarea include deja noul [Subgraf-ul Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Tokenurile câştigătoare de dobândă aici se numesc în mod surprinzător _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) este un schimb descentralizat (DEX). Furnizorii de lichidități pot câștiga comisioane prin furnizarea tokenurilor necesare sau ether-ului necesar ambelor părți ale tranzacției. Acesta este utilizat pe scară largă și, prin urmare, are una dintre cele mai mari lichidități pentru o gamă largă de tokenuri. Puteți să îl integrați cu ușurință în aplicația dvs. Dapp, astfel încât aceasta, de exemplu, să permită utilizatorilor să își schimbe ETH-ul în DAI.

Din nefericire, în momentul la care scriem acestea integrarea este doar pentru Uniswap v1, nu și pentru [versiunea v2](https://uniswap.org/blog/uniswap-v2/) recent lansată.

### Sablier {#sablier}

[Sablier](https://sablier.finance/) permite utilizatorilor să acceseze bani în streaming. În loc de o singură plată, primiți banii în mod constant, fără alte necesităţi de administrare după configurarea inițială. Integrarea include [propriul subgraf](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Ce urmează? {#whats-next}

Dacă aveți întrebări despre _create-eth-app_, accesați [server-ul comunității Sablier](https://discord.gg/bsS8T47), unde puteți lua legătura cu autorii _create-eth-app_. Ca primi pași în continuare, ați putea dori integrarea unui framework UI precum [Material UI](https://material-ui.com/), scrierea de interogări GraphQL pentru datele de care aveți chiar nevoie și configurarea implementării.
