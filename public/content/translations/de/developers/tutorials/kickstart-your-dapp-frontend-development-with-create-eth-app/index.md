---
title: Starten Sie Ihre Dapp-Frontend-Entwicklung mit create-eth-app
description: "Ein Überblick über die Verwendung von create-eth-app und seine Funktionen"
author: "Markus Waas"
tags:
  ["frontend", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: de
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Beim letzten Mal haben wir uns [das Gesamtbild von Solidity](https://soliditydeveloper.com/solidity-overview-2020) angesehen und bereits die [create-eth-app](https://github.com/PaulRBerg/create-eth-app) erwähnt. Nun werden Sie herausfinden, wie man sie benutzt, welche Funktionen integriert sind und zusätzliche Ideen erhalten, wie man sie erweitern kann. Gestartet von Paul Razvan Berg, dem Gründer von [Sablier](http://sablier.com/), wird diese App Ihre Frontend-Entwicklung in Schwung bringen und bietet mehrere optionale Integrationen zur Auswahl.

## Installation {#installation}

Die Installation erfordert Yarn 0.25 oder höher (`npm install yarn --global`). Es ist so einfach wie das Ausführen von:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Unter der Haube wird [create-react-app](https://github.com/facebook/create-react-app) verwendet. Um Ihre App zu sehen, öffnen Sie `http://localhost:3000/`. Wenn Sie bereit sind, in die Produktion zu gehen, erstellen Sie ein minimiertes Bundle mit yarn build. Eine einfache Möglichkeit, dies zu hosten, wäre [Netlify](https://www.netlify.com/). Sie können ein GitHub-Repo erstellen, es zu Netlify hinzufügen, den Build-Befehl einrichten und schon sind Sie fertig! Ihre App wird gehostet und ist für jeden nutzbar. Und das alles kostenlos.

## Funktionen {#features}

### React & create-react-app {#react--create-react-app}

Zunächst einmal das Herzstück der App: React und all die zusätzlichen Funktionen, die mit _create-react-app_ einhergehen. Nur dies zu verwenden, ist eine großartige Option, wenn Sie Ethereum nicht integrieren möchten. [React](https://react.dev/) selbst macht das Erstellen interaktiver Benutzeroberflächen (UIs) wirklich einfach. Es ist vielleicht nicht so anfängerfreundlich wie [Vue](https://vuejs.org/), aber es wird immer noch am häufigsten verwendet, hat mehr Funktionen und vor allem Tausende von zusätzlichen Bibliotheken zur Auswahl. Die _create-react-app_ macht den Einstieg ebenfalls sehr einfach und beinhaltet:

- Unterstützung für React, JSX, ES6, TypeScript und Flow-Syntax.
- Sprach-Extras über ES6 hinaus, wie den Object-Spread-Operator.
- Autoprefixed CSS, sodass Sie keine -webkit- oder andere Präfixe benötigen.
- Einen schnellen, interaktiven Unit-Test-Runner mit integrierter Unterstützung für Coverage-Reporting.
- Einen Live-Entwicklungsserver, der vor häufigen Fehlern warnt.
- Ein Build-Skript zum Bündeln von JS, CSS und Bildern für die Produktion, mit Hashes und Sourcemaps.

Insbesondere die _create-eth-app_ nutzt die neuen [Hooks-Effekte](https://legacy.reactjs.org/docs/hooks-effect.html). Eine Methode, um leistungsstarke, aber dennoch sehr kleine sogenannte funktionale Komponenten zu schreiben. Im folgenden Abschnitt über Apollo erfahren Sie, wie sie in der _create-eth-app_ verwendet werden.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) ermöglichen es Ihnen, mehrere Pakete zu haben, diese aber alle aus dem Stammordner zu verwalten und Abhängigkeiten für alle auf einmal mit `yarn install` zu installieren. Dies ist besonders sinnvoll für kleinere Zusatzpakete wie die Verwaltung von Smart Contract-Adressen/ABIs (die Informationen darüber, wo Sie welche Smart Contracts bereitgestellt haben und wie Sie mit ihnen kommunizieren) oder die Graph-Integration, die beide Teil der `create-eth-app` sind.

### ethers.js {#ethersjs}

Während [Web3](https://docs.web3js.org/) immer noch am häufigsten verwendet wird, hat [ethers.js](https://docs.ethers.io/) im letzten Jahr als Alternative stark an Zugkraft gewonnen und ist in die _create-eth-app_ integriert. Sie können damit arbeiten, es auf Web3 umstellen oder ein Upgrade auf [ethers.js v5](https://docs.ethers.org/v5/) in Betracht ziehen, das die Beta-Phase fast verlassen hat.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) ist ein alternativer Weg zur Datenverarbeitung im Vergleich zu einer [Restful API](https://restfulapi.net/). Es bietet mehrere Vorteile gegenüber Restful APIs, insbesondere für dezentralisierte Blockchain-Daten. Wenn Sie an den Gründen dafür interessiert sind, werfen Sie einen Blick auf [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Normalerweise würden Sie Daten direkt von Ihrem Smart Contract abrufen. Möchten Sie die Zeit des letzten Handels auslesen? Rufen Sie einfach `MyContract.methods.latestTradeTime().call()` auf, was die Daten von einem Ethereum-Blockchain-Knoten in Ihre Dapp abruft. Aber was ist, wenn Sie Hunderte von verschiedenen Datenpunkten benötigen? Das würde zu Hunderten von Datenabrufen beim Blockchain-Knoten führen, die jedes Mal eine [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) erfordern und Ihre Dapp langsam und ineffizient machen. Ein Workaround könnte eine Fetcher-Call-Funktion innerhalb Ihres Vertrags sein, die mehrere Daten auf einmal zurückgibt. Dies ist jedoch nicht immer ideal.

Und dann könnten Sie auch an historischen Daten interessiert sein. Sie möchten nicht nur die letzte Handelszeit wissen, sondern die Zeiten für alle Trades, die Sie jemals selbst getätigt haben. Verwenden Sie das Subgraph-Paket der _create-eth-app_, lesen Sie die [Dokumentation](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) und passen Sie es an Ihre eigenen Verträge an. Wenn Sie nach beliebten Smart Contracts suchen, gibt es möglicherweise sogar schon einen Subgraph. Schauen Sie sich den [Subgraph Explorer](https://thegraph.com/explorer/) an.

Sobald Sie einen Subgraph haben, können Sie eine einfache Abfrage in Ihrer Dapp schreiben, die alle wichtigen Blockchain-Daten einschließlich der historischen abruft, die Sie benötigen – es ist nur ein einziger Abruf erforderlich.

### Apollo {#apollo}

Dank der [Apollo Boost](https://www.apollographql.com/docs/react/get-started/)-Integration können Sie The Graph ganz einfach in Ihre React-Dapp integrieren. Besonders bei der Verwendung von [React Hooks und Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks) ist das Abrufen von Daten so einfach wie das Schreiben einer einzigen GraphQL-Abfrage in Ihrer Komponente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Vorlagen {#templates}

Darüber hinaus können Sie aus mehreren verschiedenen Vorlagen wählen. Bisher können Sie eine Integration für Aave, Compound, Uniswap oder Sablier verwenden. Sie alle fügen wichtige Service-Smart Contract-Adressen zusammen mit vorgefertigten Subgraph-Integrationen hinzu. Fügen Sie einfach die Vorlage zum Erstellungsbefehl hinzu, wie z. B. `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) ist ein dezentralisierter Geldleihmarkt. Einleger stellen dem Markt Liquidität zur Verfügung, um ein passives Einkommen zu erzielen, während Kreditnehmer in der Lage sind, Kredite gegen Sicherheiten aufzunehmen. Ein einzigartiges Merkmal von Aave sind die [Flash Loans](https://aave.com/docs/developers/flash-loans) (Blitzkredite), die es Ihnen ermöglichen, Geld ohne Sicherheiten zu leihen, solange Sie den Kredit innerhalb einer einzigen Transaktion zurückzahlen. Dies kann beispielsweise nützlich sein, um Ihnen zusätzliches Kapital für Arbitrage-Handel zu verschaffen.

Gehandelte Token, die Ihnen Zinsen einbringen, werden _aTokens_ genannt.

Wenn Sie sich entscheiden, Aave in die _create-eth-app_ zu integrieren, erhalten Sie eine [Subgraph-Integration](https://docs.aave.com/developers/getting-started/using-graphql). Aave verwendet The Graph und stellt Ihnen bereits mehrere einsatzbereite Subgraphs auf [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) und im [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) in [roher](https://thegraph.com/explorer/subgraph/aave/protocol-raw) oder [formatierter](https://thegraph.com/explorer/subgraph/aave/protocol) Form zur Verfügung.

![Aave Flash Loan Meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) ist ähnlich wie Aave. Die Integration beinhaltet bereits den neuen [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Die zinsbringenden Token werden hier überraschenderweise _cTokens_ genannt.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ist eine dezentralisierte Börse (DEX). Liquiditätsanbieter können Gebühren verdienen, indem sie die erforderlichen Token oder Ether für beide Seiten eines Handels bereitstellen. Sie ist weit verbreitet und weist daher eine der höchsten Liquiditäten für eine sehr breite Palette von Token auf. Sie können sie einfach in Ihre Dapp integrieren, um Benutzern beispielsweise zu ermöglichen, ihre ETH gegen DAI zu tauschen.

Leider ist die Integration zum Zeitpunkt der Erstellung dieses Artikels nur für Uniswap v1 und nicht für das [gerade veröffentlichte v2](https://uniswap.org/blog/uniswap-v2/) verfügbar.

### Sablier {#sablier}

[Sablier](https://sablier.com/) ermöglicht Benutzern das Streamen von Geldzahlungen. Anstelle eines einzigen Zahltags erhalten Sie Ihr Geld nach der anfänglichen Einrichtung kontinuierlich und ohne weiteren Verwaltungsaufwand. Die Integration beinhaltet ihren [eigenen Subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Wie geht es weiter? {#whats-next}

Wenn Sie Fragen zur _create-eth-app_ haben, besuchen Sie den [Sablier-Community-Server](https://discord.gg/bsS8T47), wo Sie mit den Autoren der _create-eth-app_ in Kontakt treten können. Als erste nächste Schritte möchten Sie vielleicht ein UI-Framework wie [Material UI](https://mui.com/material-ui/) integrieren, GraphQL-Abfragen für die Daten schreiben, die Sie tatsächlich benötigen, und das Deployment einrichten.