---
title: Nastartujte vývoj frontendu vaší dapp pomocí create-eth-app
description: Přehled použití create-eth-app a jeho funkcí
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
lang: cs
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Minule jsme se podívali na [celkový obraz Solidity](https://soliditydeveloper.com/solidity-overview-2020) a již zmínili [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Nyní se dozvíte, jak jej používat, jaké funkce jsou integrovány a jaké jsou další nápady na jeho rozšíření. Tato aplikace, kterou založil Paul Razvan Berg, zakladatel [Sablier](http://sablier.com/), nastartuje váš vývoj frontendu a přináší několik volitelných integrací, ze kterých si můžete vybrat.

## Instalace {#installation}

Instalace vyžaduje Yarn 0.25 nebo vyšší (`npm install yarn --global`). Je to tak jednoduché jako spuštění:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Pod kapotou používá [create-react-app](https://github.com/facebook/create-react-app). Chcete-li zobrazit svou aplikaci, otevřete `http://localhost:3000/`. Až budete připraveni k nasazení do produkčního prostředí, vytvořte minifikovaný balíček pomocí yarn build. Jedním ze snadných způsobů, jak to hostovat, je [Netlify](https://www.netlify.com/). Můžete si vytvořit repozitář na GitHubu, přidat ho do Netlify, nastavit příkaz pro sestavení a máte hotovo! Vaše aplikace bude hostovaná a použitelná pro všechny. A to vše zdarma.

## Vlastnosti {#features}

### React a create-react-app {#react--create-react-app}

Především srdce aplikace: React a všechny další funkce, které přináší _create-react-app_. Použití pouze tohoto je skvělá volba, pokud nechcete integrovat Ethereum. Samotný [React](https://react.dev/) velmi usnadňuje vytváření interaktivních uživatelských rozhraní. Možná není tak přívětivý pro začátečníky jako [Vue](https://vuejs.org/), ale stále je nejpoužívanější, má více funkcí a hlavně tisíce dalších knihoven, ze kterých si můžete vybrat. _create-react-app_ také velmi usnadňuje začátek a zahrnuje:

- Podporu syntaxe React, JSX, ES6, TypeScript a Flow.
- Jazyková rozšíření nad rámec ES6, jako je operátor rozšiřování objektů (object spread operator).
- Automaticky prefixované CSS, takže nepotřebujete -webkit- ani jiné prefixy.
- Rychlý interaktivní spouštěč jednotkových testů s vestavěnou podporou pro reportování pokrytí.
- Živý vývojový server, který varuje před běžnými chybami.
- Sestavovací skript pro sbalení JS, CSS a obrázků pro produkci, s haši a sourcemapy.

Konkrétně _create-eth-app_ využívá nové [hooks effects](https://legacy.reactjs.org/docs/hooks-effect.html). Metoda pro psaní výkonných, ale velmi malých takzvaných funkcionálních komponent. Jak se používají v _create-eth-app_ se dozvíte níže v sekci o Apollo.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) vám umožňují mít více balíčků, ale spravovat je všechny z kořenového adresáře a instalovat závislosti pro všechny najednou pomocí `yarn install`. To dává smysl zejména pro menší doplňkové balíčky, jako je správa adres/ABI chytrých kontraktů (informace o tom, kde jste nasadili které chytré kontrakty a jak s nimi komunikovat) nebo integrace The Graph, které jsou obě součástí `create-eth-app`.

### ethers.js {#ethersjs}

Zatímco [Web3](https://docs.web3js.org/) se stále používá nejvíce, [ethers.js](https://docs.ethers.io/) se v posledním roce stává stále populárnější alternativou a je integrován do _create-eth-app_. Můžete s ním pracovat, změnit ho na Web3 nebo zvážit upgrade na [ethers.js v5](https://docs.ethers.org/v5/), který je téměř venku z beta verze.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) je alternativní způsob práce s daty ve srovnání s [Restful API](https://restfulapi.net/). Mají několik výhod oproti Restful API, zejména pro decentralizovaná blockchainová data. Pokud vás zajímají důvody, podívejte se na [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Obvykle byste získávali data přímo z vašeho chytrého kontraktu. Chcete si přečíst čas posledního obchodu? Stačí zavolat `MyContract.methods.latestTradeTime().call()`, které získá data z uzlu Ethereum do vaší dapp. Ale co když potřebujete stovky různých datových bodů? To by vedlo ke stovkám načítání dat z uzlu, přičemž každé by vyžadovalo [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), což by vaši dapp zpomalilo a zneefektivnilo. Jedním z řešení může být funkce pro hromadné načítání (fetcher call) uvnitř vašeho kontraktu, která vrací více dat najednou. Ne vždy je to ale ideální.

A pak by vás mohla zajímat i historická data. Chcete znát nejen čas posledního obchodu, ale časy všech obchodů, které jste kdy sami uskutečnili. Použijte balíček subgraphu _create-eth-app_, přečtěte si [dokumentaci](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) a přizpůsobte jej svým vlastním kontraktům. Pokud hledáte oblíbené chytré kontrakty, může pro ně již existovat subgraph. Podívejte se na [průzkumníka subgraphů](https://thegraph.com/explorer/).

Jakmile máte subgraph, můžete ve své dapp napsat jeden jednoduchý dotaz, který načte všechna důležitá blockchainová data, která potřebujete, včetně těch historických, a to pouze jedním načtením.

### Apollo {#apollo}

Díky integraci [Apollo Boost](https://www.apollographql.com/docs/react/get-started/) můžete snadno integrovat The Graph do své React dapp. Zejména při použití [React hooks and Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) je načítání dat tak jednoduché jako napsání jediného dotazu GraphQL ve vaší komponentě:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Šablony {#templates}

Navíc si můžete vybrat z několika různých šablon. Zatím můžete použít integraci Aave, Compound, UniSwap nebo Sablier. Všechny přidávají důležité adresy servisních chytrých kontraktů spolu s předpřipravenými integracemi subgraphů. Stačí přidat šablonu do příkazu pro vytvoření, například `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) je decentralizovaný trh s půjčováním peněz. Vkladatelé poskytují trhu likviditu, aby získali pasivní příjem, zatímco dlužníci si mohou půjčovat pomocí kolaterálu. Jednou z jedinečných funkcí Aave jsou [rychlé půjčky (flash loans)](https://aave.com/docs/developers/flash-loans), které vám umožní půjčit si peníze bez jakéhokoli kolaterálu, pokud půjčku vrátíte v rámci jedné transakce. To může být užitečné například pro získání dodatečné hotovosti při arbitrážním obchodování.

Obchodované tokeny, které vám vydělávají úroky, se nazývají _aTokens_.

Když se rozhodnete integrovat Aave s _create-eth-app_, získáte [integraci subgraphu](https://docs.aave.com/developers/getting-started/using-graphql). Aave používá The Graph a již vám poskytuje několik subgraphů připravených k použití na [Ropstenu](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) a [mainnetu](https://thegraph.com/explorer/subgraph/aave/protocol) v [surové](https://thegraph.com/explorer/subgraph/aave/protocol-raw) nebo [formátované](https://thegraph.com/explorer/subgraph/aave/protocol) podobě.

![Mem o rychlé půjčce Aave – "Jo, kdybych si mohl nechat rychlou půjčku déle než 1 transakci, bylo by to skvělé"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) je podobný Aave. Integrace již zahrnuje nový [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Tokeny, které zde vydělávají úroky, se překvapivě nazývají _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) je decentralizovaná burza (DEX). Poskytovatelé likvidity mohou vydělávat poplatky poskytováním požadovaných tokenů nebo etheru pro obě strany obchodu. Je široce používána a proto má jednu z nejvyšších likvidit pro velmi širokou škálu tokenů. Můžete ji snadno integrovat do své dapp, abyste například umožnili uživatelům směnit jejich ETH za DAI.

Bohužel v době psaní tohoto článku je integrace pouze pro Uniswap v1, a nikoli pro [právě vydanou v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) umožňuje uživatelům streamování plateb. Místo jediné výplaty dostáváte peníze neustále bez další administrace po úvodním nastavení. Integrace zahrnuje [vlastní subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Co dál? {#whats-next}

Pokud máte dotazy ohledně _create-eth-app_, přejděte na [komunitní server Sablier](https://discord.gg/bsS8T47), kde se můžete spojit s autory _create-eth-app_. Jako jedny z prvních dalších kroků můžete chtít integrovat UI framework jako [Material UI](https://mui.com/material-ui/), napsat GraphQL dotazy pro data, která skutečně potřebujete, a nastavit nasazení.
