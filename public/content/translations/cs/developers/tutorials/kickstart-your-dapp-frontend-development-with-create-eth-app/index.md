---
title: "Nastartujte vývoj frontendu své dapp pomocí create-eth-app"
description: "Přehled toho, jak používat create-eth-app a jeho funkce"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: cs
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Minule jsme se podívali na [celkový obraz Solidity](https://soliditydeveloper.com/solidity-overview-2020) a už jsme zmínili [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Nyní zjistíte, jak jej používat, jaké funkce jsou v něm integrované a další nápady, jak jej rozšířit. Tato aplikace, kterou vytvořil Paul Razvan Berg, zakladatel projektu [Sablier](https://sablier.com/), nastartuje vývoj vašeho frontendu a přichází s několika volitelnými integracemi, ze kterých si můžete vybrat.

## Instalace {#installation}

Instalace vyžaduje Yarn 0.25 nebo vyšší (`npm install yarn --global`). Je to tak jednoduché jako spuštění:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Interně využívá [create-react-app](https://github.com/facebook/create-react-app). Chcete-li vidět svou aplikaci, otevřete `http://localhost:3000/`. Až budete připraveni na nasazení do produkce, vytvořte minifikovaný balíček pomocí yarn build. Jedním ze snadných způsobů hostování by mohl být [Netlify](https://www.netlify.com/). Můžete vytvořit repozitář na GitHubu, přidat jej do Netlify, nastavit příkaz pro sestavení a máte hotovo! Vaše aplikace bude hostovaná a použitelná pro všechny. A to vše zcela zdarma.

## Funkce {#features}

### React a create-react-app {#react--create-react-app}

V první řadě srdce aplikace: React a všechny další funkce, které přináší _create-react-app_. Použití pouze tohoto nástroje je skvělou volbou, pokud nechcete integrovat Ethereum. Samotný [React](https://react.dev/) velmi usnadňuje tvorbu interaktivních uživatelských rozhraní. Možná není tak přívětivý pro začátečníky jako [Vue](https://vuejs.org/), ale stále je nejpoužívanější, má více funkcí a hlavně tisíce dalších knihoven, ze kterých si můžete vybrat. Nástroj _create-react-app_ také velmi usnadňuje začátky a obsahuje:

- Podporu syntaxe React, JSX, ES6, TypeScript a Flow.
- Jazyková rozšíření nad rámec ES6, jako je operátor rozbalení objektu (object spread operator).
- Automatické předpony CSS, takže nepotřebujete -webkit- ani jiné předpony.
- Rychlý interaktivní nástroj pro spouštění jednotkových testů s vestavěnou podporou pro vykazování pokrytí.
- Živý vývojový server, který upozorňuje na běžné chyby.
- Skript pro sestavení, který spojí JS, CSS a obrázky pro produkci, včetně hashů a zdrojových map (sourcemaps).

Zejména _create-eth-app_ využívá nové [efekty hooků (hooks effects)](https://legacy.reactjs.org/docs/hooks-effect.html). Je to metoda pro psaní výkonných, a přitom velmi malých takzvaných funkcionálních komponent. Podívejte se na níže uvedenou sekci o Apollu, kde se dozvíte, jak se používají v _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) vám umožňují mít více balíčků, ale spravovat je všechny z kořenové složky a instalovat závislosti pro všechny najednou pomocí `yarn install`. To dává smysl zejména u menších doplňkových balíčků, jako je správa adres chytrých kontraktů a ABI (informace o tom, kam jste nasadili které chytré kontrakty a jak s nimi komunikovat) nebo integrace The Graph, obojí je součástí `create-eth-app`.

### ethers.js {#ethersjs}

Zatímco [Web3](https://docs.web3js.org/) se stále většinově používá, [Ethers.js](https://docs.ethers.io/) si v posledním roce získává mnohem větší pozornost jako alternativa a je integrován do _create-eth-app_. Můžete pracovat s ním, změnit jej na Web3 nebo zvážit přechod na [Ethers.js v5](https://docs.ethers.org/v5/), který už brzy opustí beta verzi.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) je alternativní způsob zpracování dat ve srovnání s [RESTful API](https://restfulapi.net/). Oproti RESTful API má několik výhod, zejména pro decentralizovaná blockchainová data. Pokud vás zajímají důvody, podívejte se na článek [GraphQL bude pohánět decentralizovaný web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Obvykle byste data získávali přímo ze svého chytrého kontraktu. Chcete si přečíst čas posledního obchodu? Stačí zavolat `MyContract.methods.latestTradeTime().call()`, což načte data z uzlu Etherea do vaší decentralizované aplikace (dapp). Ale co když potřebujete stovky různých datových bodů? To by vedlo ke stovkám požadavků na data do uzlu, z nichž každý by vyžadoval [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), což by vaši dapp zpomalilo a učinilo neefektivní. Jedním z řešení by mohla být funkce pro načítání uvnitř vašeho kontraktu, která vrátí více dat najednou. To však není vždy ideální.

A pak by vás mohla zajímat i historická data. Chcete znát nejen čas posledního obchodu, ale časy všech obchodů, které jste kdy sami provedli. Použijte balíček podgrafu _create-eth-app_, přečtěte si [dokumentaci](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) a přizpůsobte jej svým vlastním kontraktům. Pokud hledáte populární chytré kontrakty, možná pro ně už podgraf existuje. Podívejte se do [průzkumníka podgrafů](https://thegraph.com/explorer/).

Jakmile máte podgraf, umožňuje vám napsat jeden jednoduchý dotaz ve vaší dapp, který načte všechna důležitá blockchainová data, včetně těch historických, která potřebujete, a to pouze jedním požadavkem.

### Apollo {#apollo}

Díky integraci [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) můžete The Graph snadno integrovat do své React dapp. Zejména při použití [React hooks a Apolla](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) je načítání dat tak jednoduché jako napsání jediného GraphQL dotazu ve vaší komponentě:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Šablony {#templates}

Navíc si můžete vybrat z několika různých šablon. Zatím můžete využít integraci Aave, Compound, Uniswap nebo Sablier. Všechny přidávají důležité adresy chytrých kontraktů služeb spolu s předpřipravenými integracemi podgrafů. Stačí přidat šablonu do příkazu pro vytvoření, například `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) je decentralizovaný trh pro půjčování peněz. Vkladatelé poskytují trhu likviditu, aby získali pasivní příjem, zatímco dlužníci si mohou půjčovat pomocí zajištění. Jednou z unikátních funkcí Aave jsou [bleskové půjčky](https://aave.com/docs/developers/flash-loans), které vám umožňují půjčit si peníze bez jakéhokoli zajištění, pokud půjčku vrátíte v rámci jedné transakce. To může být užitečné například k získání dodatečné hotovosti při arbitrážním obchodování.

Obchodované tokeny, které vám přinášejí úroky, se nazývají _aTokens_.

Když se rozhodnete integrovat Aave pomocí _create-eth-app_, získáte [integraci podgrafu](https://docs.aave.com/developers/getting-started/using-graphql). Aave používá The Graph a již vám poskytuje několik podgrafů připravených k použití v sítích [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) a [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) v [surové (raw)](https://thegraph.com/explorer/subgraph/aave/protocol-raw) nebo [formátované](https://thegraph.com/explorer/subgraph/aave/protocol) podobě.

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) je podobný Aave. Integrace již zahrnuje nový [podgraf Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Tokeny přinášející úroky se zde překvapivě nazývají _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) je decentralizovaná burza (DEX). Poskytovatelé likvidity mohou vydělávat na poplatcích tím, že poskytnou požadované tokeny nebo ether pro obě strany obchodu. Je široce používán, a proto má jednu z nejvyšších likvidit pro velmi širokou škálu tokenů. Můžete jej snadno integrovat do své dapp, abyste například uživatelům umožnili swapovat jejich ETH za DAI.

Bohužel v době psaní tohoto článku je integrace dostupná pouze pro Uniswap v1 a nikoli pro [právě vydanou verzi v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) umožňuje uživatelům streamovat peněžní platby. Místo jednorázové výplaty dostáváte své peníze neustále bez další administrativy po počátečním nastavení. Integrace zahrnuje jeho [vlastní podgraf](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Co dál? {#whats-next}

Pokud máte dotazy ohledně _create-eth-app_, navštivte [komunitní server Sablier](https://discord.gg/bsS8T47), kde se můžete spojit s autory _create-eth-app_. Jako první další kroky byste mohli chtít integrovat framework pro uživatelské rozhraní, jako je [Material UI](https://mui.com/material-ui/), napsat GraphQL dotazy pro data, která skutečně potřebujete, a nastavit nasazení.