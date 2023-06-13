---
title: Démarrer le développement de votre interface dApp avec create-eth-app
description: Aperçu de l'utilisation de create-eth-app et de ses fonctionnalités
author: "Markus Waas"
tags:
  - "create-eth-app"
  - "frontend"
  - "javascript"
  - "ethers.js"
  - "the graph"
  - "DeFi"
skill: beginner
lang: fr
published: 2020-04-27
source: soliditydeveloper.com
sourceUrl: https://soliditydeveloper.com/create-eth-app
---

La dernière fois nous nous sommes intéressés à [Solidity](https://soliditydeveloper.com/solidity-overview-2020) et avons mentionné [create-eth-app](https://github.com/PaulRBerg/create-eth-app). Vous allez maintenant découvrir comment l'utiliser, quelles fonctionnalités y sont intégrées et comment l'étendre encore. Initiée par Paul Razvan Berg, fondateur de [Sablier](http://sablier.finance/), cette application livrée avec plusieurs intégrations facultatives au choix va vous permettre de débuter le développement de votre interface.

## Installation {#installation}

L'installation nécessite au minimum Yarn 0.25 (`npm install yarn --global`). L'installation est aussi simple que l'exécution :

```bash
yarn create eth-app my-eth-app
cd my-eth-app
yarn react-app:start
```

Elle s'appuie sur [create-react-app](https://github.com/facebook/create-react-app). Pour voir votre application, ouvrez `http://localhost:3000/`. Lorsque vous êtes prêt à déployer en production, créez un paquet minifié avec le constructeur yarn. Un moyen simple de l'héberger est [Netlify](https://www.netlify.com/). Vous pouvez créer un dépôt GitHub, l'ajouter à Netlify, configurer la commande de construction et le tour est joué ! Votre application sera hébergée et utilisable par tout le monde. Et tout ceci gratuitement.

## Fonctionnalités {#features}

### React & create-react-app {#react--create-react-app}

Premièrement, le coeur de l'application : React et toutes les fonctionnalités additionnelles livrées avec _create-react-app_. Utiliser cette seule application est une excellente option si vous ne souhaitez pas intégrer Ethereum. [React](https://reactjs.org/) rend la construction d'interfaces utilisateur interactives très facile. La prise en main n'est peut-être pas aussi facile qu'avec [Vue](https://vuejs.org/), mais l'application est encore largement utilisée, possède plus de fonctionnalités et surtout offre un choix de plusieurs milliers de bibliothèques supplémentaires. Avec _create-react-app_, le démarrage est très simple. L'application inclut :

- React, JSX, ES6, TypeScript et le support pour Flow syntax.
- Langages complémentaires à ES6 comme l'opérateur de propagation d'objet.
- CSS auto-préfixé, pour se passer de -webkit- ou d'autres préfixes.
- Un exécuteur de test unitaire interactif rapide avec une prise en charge intégrée pour les rapports de couverture.
- Un serveur de développement en direct qui signale les erreurs courantes.
- Un script de construction pour associer du JS, du CSS et des images en vue de la mise en production, avec des hachages et une cartographie du code source.

_create-react-app_, en particulier, fait usage des nouveaux [effets hooks](https://reactjs.org/docs/hooks-effect.html). Une méthode pour écrire de puissants mais très petits composants, dits fonctionnels. Voir ci-dessous la section sur Apollo pour savoir comment ils sont utilisés dans _create-react-app_.

### Espaces de travail Yarn {#yarn-workspaces}

[Les espaces de travail Yarn](https://classic.yarnpkg.com/en/docs/workspaces/) vous permettent de disposer de plusieurs paquets, mais également d'être en mesure de tous les gérer à partir du dossier racine et d'installer toutes leurs dépendances en une fois en utilisant `yarn install`. Ceci est particulièrement adapté pour les petits packs additionnels, tels que les adresses de contrats intelligents/la gestion ABI (les informations sur l'endroit où vous avez déployé tels contrats intelligents et comment communiquer avec eux) ou l'intégration de graphes, les deux parties de `create-eth-app`.

### ethers.js {#ethersjs}

Si [Web3](https://web3js.readthedocs.io/en/v1.2.7/) est encore largement utilisé, [ethers.js](https://docs.ethers.io/) a davantage été employé comme alternative l'année dernière et est intégré à _create-eth-app_. Vous pouvez travailler avec celui-ci, le faire évoluer vers Web3 ou envisager une mise à niveau pour passer à [ethers.js v5](https://docs-beta.ethers.io/) qui n'est pratiquement plus en version bêta.

### Le réseau Graph {#the-graph}

[GraphQL](https://graphql.org/) est un moyen alternatif de gérer les données par rapport à une [API Restful](https://restfulapi.net/). Il offre plusieurs avantages par rapport aux APIs REST, en particulier pour les données décentralisées de la blockchain. Si vous êtes intéressé par le raisonnement qui le sous-tend, jetez un œil à [GraphQL va propulser le Web décentralisé](https://medium.com/graphprotocol/graphql-will-power-the-decentralized-web-d7443a69c69a).

Vous récupérez normalement directement les données de votre contrat intelligent. Vous souhaitez connaître l'instant précis de la dernière transaction ? Appelez simplement `MyContract.methods.latestTradeTime().call()` qui récupère les données d'un nœud Ethereum comme Infura dans votre dApp. Mais que faire si vous avez besoin de centaines de points de données différents ? Il en résulterait des centaines d'extractions de données vers le nœud, nécessitant à chaque fois un [RTT](https://wikipedia.org/wiki/Round-trip_delay_time) qui ralentirait votre dApp et lui ferait perdre son efficacité. Pour éviter cela, une solution pourrait être d'utiliser une fonction d'appel de récupération dans votre contrat qui restitue plusieurs données à la fois. Ce n'est cependant pas toujours idéal.

Vous pourriez également être intéressé par les données historiques. Vous souhaitez peut-être connaître non seulement le moment de la dernière transaction mais également le moment de chacune des transactions que vous avez réalisées vous-même. Utilisez le paquet subgraph de _create-eth-app_, lisez la [documentation](https://thegraph.com/docs/define-a-subgraph) et adaptez-la à vos propres contrats. Si vous êtes à la recherche de contrats intelligents populaires, il se peut même qu'il en existe déjà un avec subgraph. Jetez un œil à [l'explorateur de sous-graphes](https://thegraph.com/explorer/).

Une fois que vous disposez d'un subgraph, vous pouvez écrire une simple requête dans votre dApp afin de récupérer toutes les données importantes de la blockchain, y compris les données historiques dont vous avez besoin. Une seule demande de récupération suffit.

### Apollo {#apollo}

Grâce à l'intégration d'[Apollo Boost](https://www.apollographql.com/docs/react/get-started/), vous pouvez facilement intégrer Graph dans votre dApp React. Surtout lorsque vous utilisez [des hooks React et Apollo](https://www.apollographql.com/blog/apollo-client-now-with-react-hooks-676d116eeae2), récupérer des données est aussi simple que d'écrire une requête GraphQl dans votre composant:

```js
const { loading, error, data } = useQuery(myGraphQlQuery)

React.useEffect(() => {
  if (!loading && !error && data) {
    console.log({ data })
  }
}, [loading, error, data])
```

## Modèles (Templates) {#templates}

En haut, il est possible de choisir parmi différents modèles. À ce jour, vous pouvez utiliser une intégration Aave, Compound, UniSwap ou Sablier. Ces modèles ajoutent tous des adresses importantes de contrats intelligents de service ainsi que des intégrations pré-construites de subgraph. Il suffit d'ajouter le modèle à la commande de création comme `yarn create eth-app my-eth-app --with-template aav`.

### Aave {#aave}

[Aave](https://aave.com/) est un marché décentralisé de prêt d'argent. Les déposants fournissent des liquidités au marché pour gagner un revenu passif, tandis que les emprunteurs peuvent emprunter avec des garanties. Une fonctionnalité exclusive d'Aave réside dans ces [prêts flash](https://docs.aave.com/developers/guides/flash-loans) qui vous permettent d'emprunter de l'argent sans aucune garantie, pour autant que vous remboursiez le prêt en une seule transaction. Cela peut être utile par exemple pour vous donner de l'argent supplémentaire sur l'arbitrage d'échange.

Les jetons échangés qui vous rapportent des intérêts sont appelés _aTokens_.

Si vous choisissez d'intégrer Aave avec _create-eth-app_, vous obtiendrez une [intégration subgraph](https://docs.aave.com/developers/getting-started/using-graphql). Aave utilise The Graph et vous fournit déjà plusieurs Subgraphs prêts à l'emploi sur [Ropsten](https://thegraph.com/explorer/subgraph/aave/protocol-ropsten) et [le réseau principal](https://thegraph.com/explorer/subgraph/aave/protocol) en formulaire [brut](https://thegraph.com/explorer/subgraph/aave/protocol-raw) ou [formaté](https://thegraph.com/explorer/subgraph/aave/protocol).

![Aave Flash Loan meme - "Ouah, si je pouvais garder mon prêt flash plus longtemps qu'une transaction, ce serait génial" ;](./flashloan-meme.png)

### Compound {#compound}

[Compound](https://compound.finance/) est similaire à Aave. L'intégration inclut déjà le nouveau [Compound v2 Subgraph](https://medium.com/graphprotocol/https-medium-com-graphprotocol-compound-v2-subgraph-highlight-a5f38f094195). Les intérêts gagnés des jetons sont ici étonnamment appelés _cTokens_.

### Uniswap {#uniswap}

[Uniswap](https://uniswap.exchange/) est un système d'échange décentralisé (DEX). Les fournisseurs de liquidités peuvent percevoir des commissions en fournissant les jetons ou l'éther requis pour les deux parties d'une transaction. Le protocole est largement utilisé et dispose donc de liquidités très nombreuses pour une très large gamme de jetons. Vous pouvez facilement l'intégrer dans votre dApp pour permettre, par exemple, aux utilisateurs d'échanger leur ETH contre du DAI.

Malheureusement, à l'heure où ces lignes sont écrites, l'intégration est uniquement proposée pour Uniswap v1 et non pour la toute nouvelle version [v2](https://uniswap.org/blog/uniswap-v2/).

### Sablier {#sablier}

[Sablier](https://sablier.finance/) permet aux utilisateurs d'effectuer des paiements en continu. Au lieu d'un seul versement, vous recevez en fait votre argent en continu sans avoir rien d'autre à faire après la mise en place initiale. L'intégration inclut son [propre sous-graphe](https://thegraph.com/explorer/subgraph/sablierhq/sablier).

## Et après ? {#whats-next}

Si vous avez des questions sur _create-eth-app_, allez sur le [serveur de la Communauté Sablier](https://discord.gg/bsS8T47), où vous pouvez entrer en contact avec les auteurs de _create-eth-app_. Dans un premier temps, vous pourriez vouloir intégrer un framework d'interface utilisateur comme [Material UI](https://material-ui.com/), écrire des requêtes GraphQL pour les données dont vous avez réellement besoin et configurer le déploiement.
