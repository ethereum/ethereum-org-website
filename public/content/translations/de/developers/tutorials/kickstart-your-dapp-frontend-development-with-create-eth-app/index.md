---
title: Starte deine Dapp-Frontend-Entwicklung mit create-eth-app
description: "Ein Überblick über die Verwendung und Funktionen von create-eth-app"
author: "Markus Waas"
tags:
  [
    "Frontend",
    "javascript",
    "ethers.js",
    "the graph",
    "defi"
  ]
skill: beginner
lang: de
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

Zuletzt haben wir uns [das große Ganze von Solidity](https://soliditydeveloper.com/solidity-overview-2020) angesehen und bereits [create-eth-app](https://github.com/PaulRBerg/create-eth-app) erwähnt. Jetzt erfährst du, wie du sie verwenden kannst, welche Funktionen integriert sind und wie du sie weiter ausbauen kannst. Diese App, die von Paul Razvan Berg, dem Gründer von [Sablier](http://sablier.com/), gestartet wurde, wird deine Frontend-Entwicklung in Schwung bringen und bietet mehrere optionale Integrationen zur Auswahl.

## Installation {#installation}

Die Installation erfordert Yarn 0.25 oder höher (`npm install yarn --global`). Die Ausführung ist denkbar einfach:

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Es verwendet [create-react-app](https://github.com/facebook/create-react-app) unter der Haube. Um deine App zu sehen, öffne `http://localhost:3000/`. Wenn du bereit für den Einsatz in der Produktion bist, erstelle mit yarn build ein minifiziertes Bundle. Eine einfache Möglichkeit, dies zu hosten, wäre [Netlify](https://www.netlify.com/). Du kannst ein GitHub-Repo erstellen, es zu Netlify hinzufügen, den Build-Befehl einrichten und schon bist du fertig! Deine App wird gehostet und ist für alle nutzbar. Und all das kostenlos.

## Funktionen {#features}

### React & create-react-app {#react--create-react-app}

Zunächst einmal das Herzstück der App: React und all die zusätzlichen Funktionen, die mit _create-react-app_ kommen. Die alleinige Nutzung ist eine gute Option, wenn du Ethereum nicht integrieren möchtest. [React](https://react.dev/) selbst macht die Erstellung interaktiver UIs wirklich einfach. Es mag nicht so einsteigerfreundlich sein wie [Vue](https://vuejs.org/), aber es wird immer noch am häufigsten verwendet, hat mehr Funktionen und, was am wichtigsten ist, es stehen Tausende von zusätzlichen Bibliotheken zur Auswahl. Die _create-react-app_ macht den Einstieg ebenfalls sehr einfach und umfasst:

- Unterstützung für React-, JSX-, ES6-, TypeScript- und Flow-Syntax.
- Spracherweiterungen über ES6 hinaus, wie der Object-Spread-Operator.
- CSS mit automatischen Präfixen, sodass du keine -webkit- oder andere Präfixe benötigst.
- Ein schneller, interaktiver Unit-Test-Runner mit integrierter Unterstützung für Coverage-Reporting.
- Ein Live-Entwicklungsserver, der vor häufigen Fehlern warnt.
- Ein Build-Skript zum Bündeln von JS, CSS und Bildern für die Produktion, mit Hashes und Sourcemaps.

Die _create-eth-app_ macht insbesondere von den neuen [Hooks-Effekten](https://legacy.reactjs.org/docs/hooks-effect.html) Gebrauch. Eine Methode, um leistungsstarke und dennoch sehr kleine sogenannte funktionale Komponenten zu schreiben. Wie sie in _create-eth-app_ verwendet werden, steht im folgenden Abschnitt über Apollo.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) ermöglichen es, mehrere Pakete zu haben, diese aber alle vom Stammverzeichnis aus zu verwalten und die Abhängigkeiten für alle auf einmal mit `yarn install` zu installieren. Dies ist vor allem bei kleineren Zusatzpaketen wie dem Management von Smart-Contract-Adressen/ABIs (die Information darüber, wo man welche Smart Contracts eingesetzt hat und wie man mit ihnen kommuniziert) oder der Graph-Integration sinnvoll, die beide Teil von `create-eth-app` sind.

### ethers.js {#ethersjs}

Obwohl [Web3](https://docs.web3js.org/) immer noch am häufigsten verwendet wird, hat [ethers.js](https://docs.ethers.io/) im letzten Jahr als Alternative viel Anklang gefunden und ist in _create-eth-app_ integriert. Du kannst damit arbeiten, zu Web3 wechseln oder ein Upgrade auf [ethers.js v5](https://docs.ethers.org/v5/) in Erwägung ziehen, das fast die Beta-Phase abgeschlossen hat.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) ist im Vergleich zu einer [RESTful-API](https://restfulapi.net/) eine alternative Methode für den Umgang mit Daten. Sie haben mehrere Vorteile gegenüber RESTful-APIs, insbesondere für dezentrale Blockchain-Daten. Wenn du an der Begründung dafür interessiert bist, schau dir [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a) an.

Normalerweise würdest du Daten direkt von deinem Smart Contract abrufen. Willst du die Zeit des letzten Handels auslesen? Rufe einfach `MyContract.methods.latestTradeTime().call()` auf, was die Daten von einem Ethereum-Node in deine Dapp holt. Aber was ist, wenn du Hunderte verschiedener Datenpunkte benötigst? Das würde zu Hunderten von Datenabrufen beim Node führen, die jedes Mal eine [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) erfordern, was deine Dapp langsam und ineffizient machen würde. Eine Problemumgehung könnte eine Abruffunktion in deinem Contract sein, die mehrere Daten auf einmal zurückgibt. Das ist aber nicht immer ideal.

Und dann bist du vielleicht auch an historischen Daten interessiert. Du willst nicht nur die Zeit des letzten Handels wissen, sondern die Zeiten aller Handelsgeschäfte, die du jemals selbst getätigt hast. Verwende das Subgraph-Paket von _create-eth-app_, lies die [Dokumentation](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) und passe es an deine eigenen Contracts an. Wenn du nach beliebten Smart Contracts suchst, gibt es möglicherweise sogar bereits einen Subgraph. Sieh dir den [Subgraph-Explorer](https://thegraph.com/explorer/) an.

Sobald du einen Subgraph hast, kannst du eine einfache Abfrage in deiner Dapp schreiben, die alle wichtigen Blockchain-Daten, einschließlich historischer Daten, die du benötigst, abruft; dafür ist nur ein Abruf erforderlich.

### Apollo {#apollo}

Dank der [Apollo Boost](https://www.apollographql.com/docs/react/get-started/)-Integration kannst du den Graphen einfach in deine React-Dapp integrieren. Besonders bei der Verwendung von React Hooks und Apollo ist das Abrufen von Daten so einfach wie das Schreiben einer einzigen GraphQL-Abfrage in deiner Komponente:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Vorlagen {#templates}

Darüber hinaus kannst du aus verschiedenen Vorlagen wählen. Bisher kannst du eine Aave-, Compound-, UniSwap- oder Sablier-Integration verwenden. Sie alle fügen wichtige Smart-Contract-Adressen für Dienste zusammen mit vorgefertigten Subgraph-Integrationen hinzu. Füge einfach die Vorlage zum Erstellungsbefehl hinzu, wie `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) ist ein dezentraler Geldleihmarkt. Die Einleger stellen dem Markt Liquidität zur Verfügung, um passives Einkommen zu generieren, während Kreditnehmer sich mithilfe von Sicherheiten Geld leihen können. Eine einzigartige Funktion von Aave sind die [Flash Loans](https://aave.com/docs/developers/flash-loans), die es dir ermöglichen, Geld ohne jegliche Sicherheiten zu leihen, solange du das Darlehen innerhalb einer einzigen Transaktion zurückzahlst. Das kann zum Beispiel nützlich sein, um zusätzliches Geld für das Arbitrage-Trading zu erhalten.

Gehandelte Token, die dir Zinsen einbringen, werden _aTokens_ genannt.

Wenn du dich für die Integration von Aave mit _create-eth-app_ entscheidest, erhältst du eine [Subgraph-Integration](https://docs.aave.com/developers/getting-started/using-graphql). Aave verwendet The Graph und stellt dir bereits mehrere einsatzbereite Subgraphs auf [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) und [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) in [roher](https://thegraph.com/explorer/subgraph/aave/protocol-raw) oder [formatierter](https://thegraph.com/explorer/subgraph/aave/protocol) Form zur Verfügung.

![Aave Flash-Loan-Meme – „Yeahhh, wenn ich meinen Flash Loan länger als eine Transaktion behalten könnte, wäre das großartig“](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) ist ähnlich wie Aave. Die Integration enthält bereits den neuen [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Die zinsbringenden Token werden hier überraschenderweise _cTokens_ genannt.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) ist eine dezentralisierte Börse (DEX). Liquiditätsanbieter können Gebühren verdienen, indem sie die erforderlichen Token oder Ether für beide Seiten eines Handels bereitstellen. Es ist weit verbreitet und hat daher eine der höchsten Liquiditäten für eine sehr breite Palette von Token. Du kannst es einfach in deine Dapp integrieren, um beispielsweise Benutzern zu ermöglichen, ihre ETH gegen DAI zu tauschen.

Leider ist die Integration zum Zeitpunkt der Erstellung dieses Artikels nur für Uniswap v1 und nicht für die [gerade veröffentlichte v2](https://uniswap.org/blog/uniswap-v2/) möglich.

### Sablier {#sablier}

[Sablier](https://sablier.com/) ermöglicht Benutzern das Streamen von Geldzahlungen. Anstelle eines einzelnen Zahltages erhältst du dein Geld nach der anfänglichen Einrichtung kontinuierlich und ohne weitere Verwaltung. Die Integration umfasst einen [eigenen Subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Was kommt als Nächstes? {#whats-next}

Wenn du Fragen zu _create-eth-app_ hast, besuche den [Sablier Community-Server](https://discord.gg/bsS8T47), wo du mit den Autoren von _create-eth-app_ in Kontakt treten kannst. Als erste nächste Schritte könntest du ein UI-Framework wie [Material UI](https://mui.com/material-ui/) integrieren, GraphQL-Abfragen für die Daten schreiben, die du tatsächlich benötigst, und das Deployment einrichten.
