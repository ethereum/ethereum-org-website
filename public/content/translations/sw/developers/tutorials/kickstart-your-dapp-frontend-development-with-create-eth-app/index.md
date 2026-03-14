---
title: Anzisha uundaji wako wa mwonekano wa mbele wa mfumo mtawanyo wa kimamlaka kwa kutumia create-eth-app
description: Muhtasari wa jinsi ya kutumia create-eth-app na vipengele vyake
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
lang: sw
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Mara ya mwisho tuliangalia [picha kubwa ya Solidity](https://soliditydeveloper.com/solidity-overview-2020) na tayari tulitaja [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Sasa utagundua jinsi ya kuitumia, ni vipengele vipi vimeunganishwa na mawazo ya ziada kuhusu jinsi ya kuipanua. Ilianzishwa na Paul Razvan Berg, mwanzilishi wa [Sablier](http://sablier.com/), programu hii itaanzisha uundaji wako wa mwonekano wa mbele na inakuja na miunganisho kadhaa ya hiari ya kuchagua.

## Usakinishaji {#installation}

Usakinishaji unahitaji Yarn 0.25 au toleo la juu zaidi (`npm install yarn --global`). Ni rahisi kama kuendesha:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Inatumia [create-react-app](https://github.com/facebook/create-react-app) kwa ndani. Ili kuona programu yako, fungua `http://localhost:3000/`. Ukiwa tayari kupeleka kwenye utendakazi, tengeneza kifurushi kidogo kwa kutumia yarn build. Njia moja rahisi ya kuhifadhi hii itakuwa [Netlify](https://www.netlify.com/). Unaweza kuunda repo ya GitHub, kuiongeza kwenye Netlify, kuweka amri ya kujenga na umemaliza! Programu yako itahifadhiwa na itatumika na kila mtu. Na yote hayo bila malipo.

## Vipengele {#features}

### React & create-react-app {#react--create-react-app}

Kwanza kabisa, kiini cha programu: React na vipengele vyote vya ziada vinavyokuja na _create-react-app_. Kutumia hii pekee ni chaguo zuri ikiwa hutaki kuunganisha Ethereum. [React](https://react.dev/) yenyewe hufanya uundaji wa UI ingiliani kuwa rahisi sana. Inaweza isiwe rahisi kwa wanaoanza kama [Vue](https://vuejs.org/), lakini bado inatumika sana, ina vipengele zaidi na muhimu zaidi ina maelfu ya maktaba za ziada za kuchagua. _create-react-app_ hurahisisha sana kuanza nayo pia na inajumuisha:

- Usaidizi wa sintaksia za React, JSX, ES6, TypeScript, Flow.
- Viongezeo vya lugha zaidi ya ES6 kama vile kiendeshaji cha kusambaza object.
- CSS yenye viambishi awali vya kiotomatiki, kwa hivyo huhitaji -webkit- au viambishi vingine.
- Kiendeshaji cha majaribio ya kitengo cha haraka na ingiliani chenye usaidizi uliojengewa ndani kwa ajili ya kuripoti ufikiaji.
- Seva ya uundaji wa moja kwa moja inayoonya kuhusu makosa ya kawaida.
- Hati ya kujenga ya kufunga JS, CSS, na picha kwa ajili ya utendakazi, ikiwa na hashi na ramani za chanzo.

Hasa, _create-eth-app_ inatumia [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) mpya. Njia ya kuandika vipengele vyenye nguvu, lakini vidogo sana vinavyoitwa vipengele vya kufanya kazi. Angalia sehemu hapa chini kuhusu Apollo kwa jinsi zinavyotumika katika _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) hukuruhusu kuwa na vifurushi vingi, lakini kuwa na uwezo wa kuvidhibiti vyote kutoka kwenye folda kuu na kusakinisha vitegemezi kwa vyote mara moja kwa kutumia `yarn install`. Hii ina mantiki hasa kwa vifurushi vidogo vya ziada kama vile usimamizi wa anwani/ABI za mikataba-erevu (taarifa kuhusu wapi ulipeleka mikataba-erevu ipi na jinsi ya kuwasiliana nayo) au muunganisho wa grafu, vyote vikiwa sehemu ya `create-eth-app`.

### ethers.js {#ethersjs}

Ingawa [Web3](https://docs.web3js.org/) bado inatumika sana, [ethers.js](https://docs.ethers.io/) imekuwa ikipata mvuto zaidi kama mbadala katika mwaka uliopita na ndiyo iliyounganishwa kwenye _create-eth-app_. Unaweza kufanya kazi na hii, kuibadilisha iwe Web3 au fikiria kusasisha hadi [ethers.js v5](https://docs.ethers.org/v5/) ambayo karibu itoke kwenye beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) ni njia mbadala ya kushughulikia data ikilinganishwa na [API ya Restful](https://restfulapi.net/). Zina faida kadhaa kuliko API za Restful, hasa kwa data ya mnyororo wa bloku uliogatuliwa. Ikiwa unapenda kujua sababu za hili, angalia [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Kawaida ungepata data kutoka kwa mkataba-erevu wako moja kwa moja. Unataka kusoma muda wa biashara ya hivi karibuni? Ita tu `MyContract.methods.latestTradeTime().call()` ambayo hupata data kutoka kwenye nodi ya Ethereum na kuipeleka kwenye mfumo wako mtawanyo wa kimamlaka. Lakini vipi ikiwa unahitaji mamia ya alama za data tofauti? Hiyo ingesababisha mamia ya upataji data kwenye nodi, kila mara ikihitaji [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) na kufanya mfumo wako mtawanyo wa kimamlaka kuwa wa polepole na usio na ufanisi. Njia moja ya kuepuka hili inaweza kuwa kazi ya wito wa kupata ndani ya mkataba wako inayorudisha data nyingi kwa wakati mmoja. Hata hivyo, hii si bora kila wakati.

Na kisha unaweza kupendezwa na data ya kihistoria pia. Unataka kujua sio tu muda wa biashara ya mwisho, bali nyakati za biashara zote ulizowahi kufanya mwenyewe. Tumia kifurushi cha grafu ndogo cha _create-eth-app_, soma [nyaraka](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) na uibadilishe kulingana na mikataba yako mwenyewe. Ikiwa unatafuta mikataba-erevu maarufu, huenda tayari kuna grafu ndogo. Angalia [kigunduzi cha grafu ndogo](https://thegraph.com/explorer/).

Mara tu unapokuwa na grafu ndogo, inakuruhusu kuandika hoja moja rahisi katika mfumo wako mtawanyo wa kimamlaka inayopata data zote muhimu za mnyororo wa bloku ikiwa ni pamoja na zile za kihistoria unazohitaji, upataji mmoja tu unahitajika.

### Apollo {#apollo}

Shukrani kwa muunganisho wa [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) unaweza kuunganisha grafu kwa urahisi katika mfumo wako mtawanyo wa kimamlaka wa React. Hasa unapotumia [React hooks na Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), kupata data ni rahisi kama kuandika hoja moja ya GraphQl katika kijenzi chako:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Violezo {#templates}

Juu ya hayo unaweza kuchagua kutoka kwa violezo kadhaa tofauti. Kufikia sasa unaweza kutumia muunganisho wa Aave, Compound, UniSwap au Sablier. Zote huongeza anwani muhimu za mikataba-erevu ya huduma pamoja na miunganisho ya grafu ndogo iliyotengenezwa tayari. Ongeza tu kiolezo kwenye amri ya uundaji kama `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) ni soko la kukopesha pesa lililogatuliwa. Waweka amana hutoa ukwasi sokoni ili kupata mapato yasiyotumika, huku wakopaji wakiweza kukopa kwa kutumia dhamana. Kipengele kimoja cha kipekee cha Aave ni [mikopo ya haraka](https://aave.com/docs/developers/flash-loans) inayokuruhusu kukopa pesa bila dhamana yoyote, mradi tu unarejesha mkopo ndani ya muamala mmoja. Hii inaweza kuwa muhimu kwa mfano kwa kukupa pesa za ziada kwenye biashara ya usuluhishi.

Tokeni zinazouzwa na kukupatia riba huitwa _aTokens_.

Unapochagua kuunganisha Aave na _create-eth-app_, utapata [muunganisho wa grafu ndogo](https://docs.aave.com/developers/getting-started/using-graphql). Aave hutumia The Graph na tayari inakupa grafu ndogo kadhaa zilizo tayari kutumika kwenye [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) na [Mtandao Mkuu](https://thegraph.com/explorer/subgraph/aave/protocol) katika fomu [ghafi](https://thegraph.com/explorer/subgraph/aave/protocol-raw) au [iliyopangiliwa](https://thegraph.com/explorer/subgraph/aave/protocol).

![Meme ya Mkopo wa Haraka wa Aave – "Yeahhh, kama ningeweza kuweka mkopo wangu wa haraka kwa muda mrefu zaidi ya muamala 1, ingekuwa vizuri sana"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) inafanana na Aave. Muunganisho tayari unajumuisha [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) mpya. Tokeni zinazopata riba hapa kwa mshangao huitwa _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ni soko la kubadilishana fedha lililogatuliwa (DEX). Watoa ukwasi wanaweza kupata ada kwa kutoa tokeni au ether zinazohitajika kwa pande zote mbili za biashara. Inatumika sana na kwa hivyo ina moja ya viwango vya juu zaidi vya ukwasi kwa anuwai kubwa sana ya tokeni. Unaweza kuiunganisha kwa urahisi katika mfumo wako mtawanyo wa kimamlaka ili, kwa mfano, kuwaruhusu watumiaji kubadilisha ETH zao kwa DAI.

Kwa bahati mbaya, wakati wa kuandika hili muunganisho ni wa Uniswap v1 pekee na sio [v2 iliyotolewa hivi karibuni](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) huwaruhusu watumiaji kutiririsha malipo ya pesa. Badala ya siku moja ya malipo, unapata pesa zako kila wakati bila usimamizi zaidi baada ya usanidi wa awali. Muunganisho unajumuisha [grafu yake ndogo](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Nini kinafuata? {#whats-next}

Ikiwa una maswali kuhusu _create-eth-app_, nenda kwenye [seva ya jamii ya Sablier](https://discord.gg/bsS8T47), ambapo unaweza kuwasiliana na waandishi wa _create-eth-app_. Kama hatua za kwanza zinazofuata unaweza kutaka kuunganisha mfumo wa UI kama [Material UI](https://mui.com/material-ui/), andika hoja za GraphQL kwa data unayohitaji hasa na uweke usanidi wa upelekaji.
