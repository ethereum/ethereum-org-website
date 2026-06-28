---
title: "Démarrez le développement front-end de votre dapp avec create-eth-app"
description: "Un aperçu de l'utilisation de create-eth-app et de ses fonctionnalités"
author: "Markus Waas"
tags:
  ["front-end", "JavaScript", "ethers.js", "the graph", "defi"]
skill: beginner
breadcrumb: create-eth-app
lang: fr
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

La dernière fois, nous avons examiné [la vue d'ensemble de Solidity](https://soliditydeveloper.com/solidity-overview-2020) et avons déjà mentionné [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Maintenant, vous allez découvrir comment l'utiliser, quelles fonctionnalités y sont intégrées et des idées supplémentaires sur la façon de le développer. Lancée par Paul Razvan Berg, le fondateur de [Sablier](https://sablier.com/), cette application donnera un coup de fouet à votre développement front-end et est livrée avec plusieurs intégrations optionnelles parmi lesquelles choisir.

## Installation {#installation}

L'installation nécessite Yarn 0.25 ou une version supérieure (`npm install yarn --global`). Il suffit d'exécuter :

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Il utilise [create-react-app](https://github.com/facebook/create-react-app) en interne. Pour voir votre application, ouvrez `http://localhost:3000/`. Lorsque vous êtes prêt à déployer en production, créez un paquet minifié avec yarn build. Un moyen simple de l'héberger serait [Netlify](https://www.netlify.com/). Vous pouvez créer un dépôt GitHub, l'ajouter à Netlify, configurer la commande de compilation et vous avez terminé ! Votre application sera hébergée et utilisable par tous. Et tout cela gratuitement.

## Fonctionnalités {#features}

### React et create-react-app {#react--create-react-app}

Tout d'abord, le cœur de l'application : React et toutes les fonctionnalités supplémentaires fournies avec _create-react-app_. L'utiliser seul est une excellente option si vous ne souhaitez pas intégrer Ethereum. [React](https://react.dev/) en soi rend la création d'interfaces utilisateur interactives très facile. Il n'est peut-être pas aussi accessible aux débutants que [Vue](https://vuejs.org/), mais il reste le plus utilisé, possède plus de fonctionnalités et surtout des milliers de bibliothèques supplémentaires parmi lesquelles choisir. _create-react-app_ permet également de démarrer très facilement et inclut :

- La prise en charge de la syntaxe React, JSX, ES6, TypeScript et Flow.
- Des ajouts au langage au-delà d'ES6, comme l'opérateur de décomposition d'objet (object spread operator).
- Du CSS auto-préfixé, vous n'avez donc pas besoin de -webkit- ou d'autres préfixes.
- Un exécuteur de tests unitaires interactif et rapide avec prise en charge intégrée des rapports de couverture.
- Un serveur de développement en direct qui avertit des erreurs courantes.
- Un script de compilation pour regrouper le JS, le CSS et les images pour la production, avec des hachages et des sourcemaps.

_create-eth-app_ en particulier utilise les nouveaux [effets de hooks](https://legacy.reactjs.org/docs/hooks-effect.html). Une méthode pour écrire des composants dits fonctionnels, puissants mais très petits. Voir la section ci-dessous sur Apollo pour savoir comment ils sont utilisés dans _create-eth-app_.

### Espaces de travail Yarn (Yarn Workspaces) {#yarn-workspaces}

Les [espaces de travail Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) vous permettent d'avoir plusieurs paquets, tout en pouvant les gérer tous depuis le dossier racine et en installant les dépendances pour tous en une seule fois à l'aide de `yarn install`. Cela prend tout son sens pour les petits paquets supplémentaires comme la gestion des adresses/ABI des contrats intelligents (les informations sur l'endroit où vous avez déployé quels contrats intelligents et comment communiquer avec eux) ou l'intégration de The Graph, qui font tous deux partie de `create-eth-app`.

### Ethers.js {#ethersjs}

Bien que [Web3](https://docs.web3js.org/) soit encore le plus utilisé, [Ethers.js](https://docs.ethers.io/) a gagné beaucoup plus de terrain en tant qu'alternative au cours de la dernière année et c'est celui qui est intégré dans _create-eth-app_. Vous pouvez travailler avec celui-ci, le remplacer par Web3 ou envisager de passer à [Ethers.js v5](https://docs.ethers.org/v5/) qui est presque sorti de sa phase bêta.

### The Graph {#the-graph}

[GraphQL](https://graphql.org/) est une méthode alternative pour gérer les données par rapport à une [API Restful](https://restfulapi.net/). Il présente plusieurs avantages par rapport aux API Restful, en particulier pour les données décentralisées de la chaîne de blocs. Si vous êtes intéressé par le raisonnement qui sous-tend cela, jetez un œil à [GraphQL Will Power the Decentralized Web](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Habituellement, vous récupéreriez les données directement depuis votre contrat intelligent. Vous voulez lire l'heure de la dernière transaction ? Il suffit d'appeler `MyContract.methods.latestTradeTime().call()` qui récupère les données d'un nœud Ethereum dans votre application décentralisée (dapp). Mais que se passe-t-il si vous avez besoin de centaines de points de données différents ? Cela entraînerait des centaines de requêtes de données vers le nœud, nécessitant à chaque fois un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time), ce qui rendrait votre dapp lente et inefficace. Une solution de contournement pourrait être une fonction d'appel de récupération à l'intérieur de votre contrat qui renvoie plusieurs données à la fois. Ce n'est cependant pas toujours idéal.

Et puis vous pourriez également être intéressé par les données historiques. Vous voulez connaître non seulement l'heure de la dernière transaction, mais aussi les heures de toutes les transactions que vous avez vous-même effectuées. Utilisez le paquet de sous-graphe _create-eth-app_, lisez la [documentation](https://thegraph.com/docs/en/subgraphs/developing/creating/starting-your-subgraph) et adaptez-le à vos propres contrats. Si vous recherchez des contrats intelligents populaires, il se peut même qu'il existe déjà un sous-graphe. Consultez l'[explorateur de sous-graphes](https://thegraph.com/explorer/).

Une fois que vous avez un sous-graphe, il vous permet d'écrire une simple requête dans votre dapp qui récupère toutes les données importantes de la chaîne de blocs, y compris les données historiques dont vous avez besoin, en une seule requête.

### Apollo {#apollo}

Grâce à l'intégration d'[Apollo Boost](https://www.apollographql.com/docs/react/get-started/), vous pouvez facilement intégrer The Graph dans votre dapp React. Surtout lors de l'utilisation des [hooks React et d'Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks), la récupération de données est aussi simple que d'écrire une seule requête GraphQL dans votre composant :

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modèles {#templates}

De plus, vous pouvez choisir parmi plusieurs modèles différents. Jusqu'à présent, vous pouvez utiliser une intégration Aave, Compound, Uniswap ou Sablier. Ils ajoutent tous des adresses de contrats intelligents de services importants ainsi que des intégrations de sous-graphes préconçues. Il suffit d'ajouter le modèle à la commande de création comme `yarn create eth-app my-eth-app --with-template aave`.

### Aave {#aave}

[Aave](https://aave.com/) est un marché de prêt d'argent décentralisé. Les déposants fournissent de la liquidité au marché pour gagner un revenu passif, tandis que les emprunteurs peuvent emprunter en utilisant des collatéraux. L'une des caractéristiques uniques d'Aave réside dans ces [prêts éclairs](https://aave.com/docs/developers/flash-loans) qui vous permettent d'emprunter de l'argent sans aucun collatéral, à condition que vous remboursiez le prêt en une seule transaction. Cela peut être utile, par exemple, pour vous donner des liquidités supplémentaires lors d'opérations d'arbitrage.

Les jetons échangés qui vous rapportent des intérêts sont appelés _aTokens_.

Lorsque vous choisissez d'intégrer Aave avec _create-eth-app_, vous obtiendrez une [intégration de sous-graphe](https://docs.aave.com/developers/getting-started/using-graphql). Aave utilise The Graph et vous fournit déjà plusieurs sous-graphes prêts à l'emploi sur [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) et le [Réseau principal](https://thegraph.com/explorer/subgraph/aave/protocol) sous forme [brute](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formatée](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme – "Yeahhh, if I could keep my flash loan longer than 1 transaction, that would be great"](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) est similaire à Aave. L'intégration inclut déjà le nouveau [sous-graphe Compound v2](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Les jetons rapportant des intérêts ici sont étonnamment appelés _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) est un échange décentralisé (DEX). Les fournisseurs de liquidité peuvent gagner des frais en fournissant les jetons ou l'ether requis pour les deux côtés d'un échange. Il est largement utilisé et possède donc l'une des liquidités les plus élevées pour une très large gamme de jetons. Vous pouvez facilement l'intégrer dans votre dapp pour, par exemple, permettre aux utilisateurs d'échanger leurs ETH contre des DAI.

Malheureusement, au moment de la rédaction de cet article, l'intégration ne concerne que Uniswap v1 et non la [v2 qui vient de sortir](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.com/) permet aux utilisateurs de diffuser des paiements en continu. Au lieu d'un seul jour de paie, vous recevez en fait votre argent en continu sans administration supplémentaire après la configuration initiale. L'intégration inclut son [propre sous-graphe](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Et ensuite ? {#whats-next}

Si vous avez des questions sur _create-eth-app_, rendez-vous sur le [serveur communautaire de Sablier](https://discord.gg/bsS8T47), où vous pourrez entrer en contact avec les auteurs de _create-eth-app_. Pour vos prochaines étapes, vous pourriez vouloir intégrer un framework d'interface utilisateur comme [Material UI](https://mui.com/material-ui/), écrire des requêtes GraphQL pour les données dont vous avez réellement besoin et configurer le déploiement.