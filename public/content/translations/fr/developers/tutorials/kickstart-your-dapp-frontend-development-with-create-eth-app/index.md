---
title: Démarrez le développement de votre interface de dApp avec create-eth-app.
description: Un aperçu de l'utilisation de create-eth-app et de ses fonctionnalités.
author: "Markus Waas"
tags:
  [
    "frontend",
    "javascript",
    "ethers.js",
    "the graph",
    "DeFi"
  ]
skill: beginner
lang: fr
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

La dernière fois, nous avons examiné [la vue d'ensemble de Solidity](https://soliditydeveloper.com/solidity-overview-2020) et déjà mentionné [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Vous allez maintenant découvrir comment l'utiliser, quelles fonctionnalités sont intégrées et des idées supplémentaires sur la façon de l'étendre. Lancée par Paul Razvan Berg, le fondateur de [Sablier](http://sablier.com/), cette application donnera un coup d'envoi à votre développement d'interface et est livrée avec plusieurs intégrations optionnelles au choix.

## Installation {#installation}

L'installation nécessite Yarn 0.25 ou une version ultérieure (`npm install yarn --global`). C'est aussi simple que d'exécuter :

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Elle utilise [create-react-app](https://github.com/facebook/create-react-app) sous le capot. Pour voir votre application, ouvrez `http://localhost:3000/`. Quand vous êtes prêt à déployer en production, créez un paquet minifié avec `yarn build`. Une façon simple de l'héberger serait d'utiliser [Netlify](https://www.netlify.com/). Vous pouvez créer un dépôt GitHub, l'ajouter à Netlify, configurer la commande de construction et le tour est joué ! Votre application sera hébergée et utilisable par tout le monde. Et tout cela, gratuitement.

## Fonctionnalités {#features}

### React et create-react-app {#react--create-react-app}

Tout d'abord, le cœur de l'application : React et toutes les fonctionnalités supplémentaires fournies avec _create-react-app_. Utiliser cette seule application est une excellente option si vous ne souhaitez pas intégrer Ethereum. [React](https://react.dev/) en soi facilite grandement la création d'interfaces utilisateur interactives. Sa prise en main n'est peut-être pas aussi facile qu'avec [Vue](https://vuejs.org/), mais il reste le plus utilisé, il possède plus de fonctionnalités et, surtout, il offre un choix de milliers de bibliothèques supplémentaires. _create-react-app_ facilite également le démarrage et inclut :

- Prise en charge de la syntaxe React, JSX, ES6, TypeScript et Flow.
- Des fonctionnalités de langage au-delà d'ES6, comme l'opérateur de décomposition d'objet.
- CSS avec préfixes automatiques, pour que vous n'ayez pas besoin de `-webkit-` ou d'autres préfixes.
- Un exécuteur de test unitaire interactif rapide avec une prise en charge intégrée pour les rapports de couverture.
- Un serveur de développement en direct qui avertit des erreurs courantes.
- Un script de construction pour empaqueter le JS, le CSS et les images pour la production, avec des hachages et des sourcemaps.

L'application _create-eth-app_ utilise en particulier les nouveaux [effets de hooks](https://legacy.reactjs.org/docs/hooks-effect.html). Une méthode pour écrire de puissants mais très petits composants, dits fonctionnels. Consultez la section ci-dessous sur Apollo pour voir comment ils sont utilisés dans _create-eth-app_.

### Yarn Workspaces {#yarn-workspaces}

[Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/) vous permettent d'avoir plusieurs paquets, tout en pouvant les gérer tous depuis le dossier racine et installer les dépendances pour tous en même temps en utilisant `yarn install`. C'est particulièrement pertinent pour les paquets supplémentaires plus petits, comme la gestion des adresses de contrats intelligents/ABI (les informations sur l'endroit où vous avez déployé quels contrats intelligents et comment communiquer avec eux) ou l'intégration de graphe, qui font tous deux partie de `create-eth-app`.

### ethers.js {#ethersjs}

Bien que [Web3](https://docs.web3js.org/) soit encore majoritairement utilisé, [ethers.js](https://docs.ethers.io/) a gagné en popularité comme alternative au cours de l'année dernière et c'est lui qui est intégré dans _create-eth-app_. Vous pouvez travailler avec celui-ci, le remplacer par Web3 ou envisager de passer à [ethers.js v5](https://docs.ethers.org/v5/) qui est presque sorti de la version bêta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) est une méthode alternative de gestion des données par rapport à une [API RESTful](https://restfulapi.net/). Il présente plusieurs avantages par rapport aux API RESTful, en particulier pour les données de blockchain décentralisées. Si les raisons qui motivent ce choix vous intéressent, consultez [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Habituellement, vous récupérez les données directement depuis votre contrat intelligent. Vous voulez lire l'heure de la dernière transaction ? Il suffit d'appeler `MyContract.methods.latestTradeTime().call()` qui récupère les données d'un nœud Ethereum dans votre dapp. Mais que faire si vous avez besoin de centaines de points de données différents ? Cela entraînerait des centaines de récupérations de données vers le nœud, chacune nécessitant un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), ce qui rendrait votre dapp lente et inefficace. Une solution de contournement pourrait être une fonction d'appel de récupération dans votre contrat qui renvoie plusieurs données à la fois. Ce n'est cependant pas toujours idéal.

Vous pourriez également être intéressé par les données historiques. Vous souhaitez peut-être connaître non seulement le moment de la dernière transaction mais également le moment de chacune des transactions que vous avez réalisées vous-même. Utilisez le paquet subgraph de _create-eth-app_, lisez la [documentation](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) et adaptez-le à vos propres contrats. Si vous recherchez des contrats intelligents populaires, il se peut même qu'un subgraph existe déjà. Consultez l'[explorateur de subgraphs](https://thegraph.com/explorer/).

Une fois que vous disposez d'un subgraph, vous pouvez écrire une simple requête dans votre dapp afin de récupérer toutes les données importantes de la blockchain, y compris les données historiques dont vous avez besoin. Une seule récupération suffit.

### Apollo {#apollo}

Grâce à l'intégration de [Apollo Boost](https://www.apollographql.com/docs/react/get-started/), vous pouvez facilement intégrer The Graph dans votre dapp React. En particulier lorsque vous utilisez les [hooks React et Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), la récupération de données est aussi simple que d'écrire une seule requête GraphQL dans votre composant :

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modèles {#templates}

En plus, vous pouvez choisir parmi plusieurs modèles différents. Pour l'instant, vous pouvez utiliser une intégration Aave, Compound, Uniswap ou Sablier. Ces modèles ajoutent tous des adresses importantes de contrats intelligents de service ainsi que des intégrations pré-construites de subgraph. Il suffit d'ajouter le modèle à la commande de création, comme `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) est un marché de prêt d'argent décentralisé. Les déposants fournissent des liquidités au marché pour gagner un revenu passif, tandis que les emprunteurs peuvent emprunter avec des garanties. Une caractéristique unique d'Aave sont les [prêts flash](https://aave.com/docs/developers/flash-loans) qui vous permettent d'emprunter de l'argent sans aucune garantie, tant que vous remboursez le prêt en une seule transaction. Cela peut être utile, par exemple, pour vous donner des liquidités supplémentaires pour du trading d'arbitrage.

Les jetons échangés qui vous rapportent des intérêts sont appelés _aTokens_.

Lorsque vous choisissez d'intégrer Aave avec _create-eth-app_, vous obtiendrez une [intégration de subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave utilise The Graph et vous fournit déjà plusieurs subgraphs prêts à l'emploi sur [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) et [Mainnet](https://thegraph.com/explorer/subgraph/aave/protocol) sous forme [brute](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formatée](https://thegraph.com/explorer/subgraph/aave/protocol).

![Mème sur les prêts flash d'Aave – « Ouais, si je pouvais garder mon prêt flash plus d'une transaction, ce serait génial »](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) est similaire à Aave. L'intégration inclut déjà le nouveau [subgraph Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094595). De manière surprenante, les jetons qui rapportent des intérêts sont ici appelés _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) est une plateforme d'échange décentralisée (DEX). Les fournisseurs de liquidités peuvent percevoir des commissions en fournissant les jetons ou l'éther requis pour les deux parties d'une transaction. Il est largement utilisé et dispose donc de l'une des plus grandes liquidités pour une très large gamme de jetons. Vous pouvez facilement l'intégrer dans votre dapp pour, par exemple, permettre aux utilisateurs d'échanger leurs ETH contre des DAI.

Malheureusement, au moment de la rédaction, l'intégration n'est disponible que pour Uniswap v1 et non pour la [v2 qui vient de sortir](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) permet aux utilisateurs d'effectuer des paiements d'argent en continu. Au lieu d'un seul versement, vous recevez en fait votre argent en continu sans avoir rien d'autre à faire après la mise en place initiale. L'intégration inclut son [propre subgraph](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Et après ? {#whats-next}

Si vous avez des questions sur _create-eth-app_, rendez-vous sur le [serveur communautaire de Sablier](https://discord.gg/bsS8T47), où vous pourrez contacter les auteurs de _create-eth-app_. Comme premières étapes, vous pourriez vouloir intégrer un framework d'interface utilisateur comme [Material UI](https://mui.com/material-ui/), écrire des requêtes GraphQL pour les données dont vous avez réellement besoin et configurer le déploiement.
