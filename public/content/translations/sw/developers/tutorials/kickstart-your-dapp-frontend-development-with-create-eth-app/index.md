---
title: Anzisha uundaji wa sehemu ya mbele ya programu tumizi iliyogatuliwa (dapp) yako kwa create-eth-app
description: Muhtasari wa jinsi ya kutumia create-eth-app na vipengele vyake
author: "Markus Waas"
tags:
  ["sehemu ya mbele", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: sw
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Mara ya mwisho tuliangalia [picha kamili ya Solidity](https://soliditydeveloper.com/solidity-overview-2020) na tayari tulitaja [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Sasa utagundua jinsi ya kuitumia, ni vipengele vipi vilivyounganishwa na mawazo ya ziada kuhusu jinsi ya kuipanua. Ilianzishwa na Paul Razvan Berg, mwanzilishi wa [Sablier](https://sablier.com/), programu hii itaanzisha uundaji wako wa sehemu ya mbele na inakuja na miunganisho kadhaa ya hiari ya kuchagua.

## Usakinishaji {#installation}

Usakinishaji unahitaji Yarn 0.25 au toleo jipya zaidi (`npm install yarn --global`). Ni rahisi kama kuendesha:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Inatumia [create-react-app](https://github.com/facebook/create-react-app) kwa ndani. Ili kuona programu yako, fungua `http://localhost:3000/`. Unapokuwa tayari kusambaza kwenye uzalishaji, tengeneza kifurushi kilichopunguzwa kwa kutumia yarn build. Njia moja rahisi ya kupangisha hii itakuwa [Netlify](https://www.netlify.com/). Unaweza kuunda hazina ya GitHub, kuiongeza kwenye Netlify, kusanidi amri ya ujenzi na umemaliza! Programu yako itapangishwa na kutumika kwa kila mtu. Na yote haya ni bure.

## Vipengele {#features}

### React na create-react-app {#react--create-react-app}

Kwanza kabisa moyo wa programu: React na vipengele vyote vya ziada vinavyokuja na _create-react-app_. Kutumia hii pekee ni chaguo zuri ikiwa hutaki kuunganisha Ethereum. [React](https://react.dev/) yenyewe inafanya ujenzi wa UI zinazoingiliana kuwa rahisi sana. Inaweza isiwe rafiki kwa wanaoanza kama [Vue](https://vuejs.org/), lakini bado inatumika zaidi, ina vipengele vingi na muhimu zaidi maelfu ya maktaba za ziada za kuchagua. _create-react-app_ inafanya iwe rahisi sana kuanza nayo pia na inajumuisha:

- Usaidizi wa sintaksia ya React, JSX, ES6, TypeScript, Flow.
- Ziada za lugha zaidi ya ES6 kama vile opereta ya usambazaji wa kipengee (object spread operator).
- CSS iliyowekwa viambishi awali kiotomatiki, kwa hivyo huhitaji -webkit- au viambishi awali vingine.
- Kiendesha jaribio la kitengo cha haraka kinachoingiliana na usaidizi uliojengewa ndani wa kuripoti ufikiaji.
- Seva ya uundaji ya moja kwa moja inayoonya kuhusu makosa ya kawaida.
- Hati ya ujenzi ya kufunga JS, CSS, na picha kwa ajili ya uzalishaji, pamoja na heshi na ramani za chanzo.

_create-eth-app_ haswa inatumia [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html) mpya. Njia ya kuandika vipengele vyenye nguvu, lakini vidogo sana vinavyoitwa vipengele vya utendaji. Tazama sehemu iliyo hapa chini kuhusu Apollo kwa jinsi zinavyotumika katika _create-eth-app_.

### Nafasi za Kazi za Yarn {#yarn-workspaces}

[Nafasi za Kazi za Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) zinakuruhusu kuwa na vifurushi vingi, lakini kuweza kuvisimamia vyote kutoka kwenye folda kuu na kusakinisha vitegemezi kwa vyote kwa wakati mmoja ukitumia `yarn install`. Hii inaleta maana hasa kwa vifurushi vidogo vya ziada kama vile usimamizi wa anwani za mikataba mahiri/ABI (taarifa kuhusu wapi ulisambaza mikataba mahiri ipi na jinsi ya kuwasiliana nayo) au muunganisho wa grafu, zote zikiwa sehemu ya `create-eth-app`.

### ethers.js {#ethersjs}

Ingawa [Web3](https://docs.web3js.org/) bado inatumika zaidi, [Ethers.js](https://docs.ethers.io/) imekuwa ikipata mvuto zaidi kama mbadala katika mwaka uliopita na ndiyo iliyounganishwa kwenye _create-eth-app_. Unaweza kufanya kazi na hii, kuibadilisha kuwa Web3 au kufikiria kusasisha hadi [Ethers.js v5](https://docs.ethers.org/v5/) ambayo inakaribia kutoka kwenye beta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) ni njia mbadala ya kushughulikia data ikilinganishwa na [API ya Restful](https://restfulapi.net/). Zina faida kadhaa juu ya API za Restful, hasa kwa data ya mnyororo wa vitalu iliyogatuliwa. Ikiwa una nia ya kujua sababu ya hii, angalia [GraphQL Itawasha Wavuti Iliyogatuliwa](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Kawaida ungeleta data kutoka kwenye mkataba mahiri wako moja kwa moja. Unataka kusoma muda wa biashara ya hivi punde? Piga tu `MyContract.methods.latestTradeTime().call()` ambayo inaleta data kutoka kwenye nodi ya Ethereum hadi kwenye programu tumizi iliyogatuliwa (dapp) yako. Lakini vipi ikiwa unahitaji mamia ya pointi tofauti za data? Hiyo itasababisha mamia ya uletaji wa data kwenye nodi, kila wakati ikihitaji [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) na kufanya dapp yako kuwa polepole na isiyofaa. Njia moja mbadala inaweza kuwa kitendakazi cha wito wa kuleta ndani ya mkataba wako ambacho kinarudisha data nyingi kwa wakati mmoja. Hata hivyo, hii si bora kila wakati.

Na kisha unaweza pia kuvutiwa na data ya kihistoria. Unataka kujua si tu muda wa biashara ya mwisho, bali nyakati za biashara zote ambazo umewahi kufanya wewe mwenyewe. Tumia kifurushi cha grafu ndogo cha _create-eth-app_, soma [nyaraka](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) na uibadilishe kulingana na mikataba yako mwenyewe. Ikiwa unatafuta mikataba mahiri maarufu, kunaweza hata kuwa na grafu ndogo tayari. Angalia [kigunduzi cha grafu ndogo](https://thegraph.com/explorer/).

Mara tu unapokuwa na grafu ndogo, inakuruhusu kuandika hoja moja rahisi katika dapp yako ambayo inarejesha data zote muhimu za mnyororo wa vitalu ikiwa ni pamoja na zile za kihistoria unazohitaji, uletaji mmoja tu unahitajika.

### Apollo {#apollo}

Shukrani kwa muunganisho wa [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) unaweza kuunganisha grafu kwa urahisi katika dapp yako ya React. Hasa unapotumia [React hooks na Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), kuleta data ni rahisi kama kuandika hoja moja ya GraphQL katika kipengele chako:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Violezo {#templates}

Zaidi ya hayo unaweza kuchagua kutoka kwa violezo kadhaa tofauti. Kufikia sasa unaweza kutumia muunganisho wa Aave, Compound, Uniswap au Sablier. Zote zinaongeza anwani muhimu za mkataba mahiri wa huduma pamoja na miunganisho ya grafu ndogo iliyotengenezwa tayari. Ongeza tu kiolezo kwenye amri ya kuunda kama `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) ni soko la ukopeshaji pesa lililogatuliwa. Wawekaji amana hutoa ukwasi kwenye soko ili kupata mapato tu, huku wakopaji wakiweza kukopa kwa kutumia dhamana. Kipengele kimoja cha kipekee cha Aave ni hiyo [mikopo ya ghafla](https://aave.com/docs/developers/flash-loans) ambayo inakuruhusu kukopa pesa bila dhamana yoyote, mradi tu urudishe mkopo ndani ya muamala mmoja. Hii inaweza kuwa muhimu kwa mfano kwa kukupa pesa za ziada kwenye biashara ya usuluhishi (arbitrage trading).

Tokeni zinazofanyiwa biashara ambazo zinakupatia riba zinaitwa _aTokens_.

Unapochagua kuunganisha Aave na _create-eth-app_, utapata [muunganisho wa grafu ndogo](https://docs.aave.com/developers/getting-started/using-graphql). Aave inatumia The Graph na tayari inakupa grafu ndogo kadhaa zilizo tayari kutumika kwenye [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) na [Mtandao Mkuu](https://thegraph.com/explorer/subgraph/aave/protocol) katika muundo [ghafi](https://thegraph.com/explorer/subgraph/aave/protocol-raw) au [ulioumbizwa](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) inafanana na Aave. Muunganisho tayari unajumuisha [Grafu ndogo ya Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195) mpya. Tokeni zinazopata riba hapa kwa kushangaza zinaitwa _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ni soko la kubadilishana lililogatuliwa (DEX). Watoa ukwasi wanaweza kupata ada kwa kutoa tokeni zinazohitajika au Etha kwa pande zote mbili za biashara. Inatumika sana na kwa hivyo ina moja ya ukwasi wa juu zaidi kwa anuwai kubwa sana ya tokeni. Unaweza kuiunganisha kwa urahisi katika dapp yako ili, kwa mfano, kuruhusu watumiaji kubadilisha ETH zao kwa DAI.

Kwa bahati mbaya, wakati wa kuandika haya muunganisho ni wa Uniswap v1 pekee na si [v2 iliyotoka hivi karibuni](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) inaruhusu watumiaji kutiririsha malipo ya pesa. Badala ya siku moja ya malipo, kwa kweli unapata pesa zako kila wakati bila usimamizi zaidi baada ya usanidi wa awali. Muunganisho unajumuisha [grafu ndogo yake yenyewe](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Nini kinafuata? {#whats-next}

Ikiwa una maswali kuhusu _create-eth-app_, nenda kwenye [seva ya jamii ya Sablier](https://discord.gg/bsS8T47), ambapo unaweza kuwasiliana na waandishi wa _create-eth-app_. Kama baadhi ya hatua zinazofuata za kwanza unaweza kutaka kuunganisha mfumo wa UI kama [Material UI](https://mui.com/material-ui/), kuandika hoja za GraphQL kwa data unayohitaji haswa na kusanidi usambazaji.