---
title: "Introduction à la pile Ethereum"
description: "Présentation étape par étape des différentes couches de la pile Ethereum, et comment elles fonctionnent ensemble."
lang: fr
---

Comme toute pile logicielle, la pile complète Ethereum varie d'un projet à l'autre en fonction de vos objectifs propres.

Il existe cependant des composants de base d'Ethereum qui aident à fournir un modèle mental de la façon dont les applications logicielles interagissent avec la blockchain Ethereum. Comprendre les couches de la pile vous permettra d'appréhender les différentes façons d'intégrer Ethereum dans les projets logiciels.

## Niveau 1 : Machine Virtuelle Ethereum {#ethereum-virtual-machine}

La [Machine Virtuelle Ethereum (EVM)](/developers/docs/evm/) est l'environnement d'exécution des contrats intelligents sur Ethereum. Tous les contrats intelligents et les changements d'état sur la blockchain Ethereum sont exécutés par des [transactions](/developers/docs/transactions/). L'EVM gère l'ensemble du traitement des transactions sur le réseau Ethereum.

Comme toute machine virtuelle, l'EVM crée un niveau d'abstraction entre l'exécution du code et la machine qui l'exécute (un nœud Ethereum). Actuellement, l'EVM s'exécute sur des milliers de nœuds répartis à travers le monde.

De façon non visible, l'EVM utilise un ensemble d'instructions de codes d'opérations (opcodes) pour exécuter des tâches spécifiques. Ces (140 uniques) codes d'opérations permettent à l'EVM d'être [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness), ce qui signifie que l'EVM est capable de calculer à peu près n'importe quoi, à condition de disposer de ressources suffisantes.

En tant que développeur de dapp, vous n'avez pas besoin d'en savoir beaucoup sur l'EVM, si ce n'est qu'elle existe et qu'elle alimente de manière fiable toutes les applications sur Ethereum sans temps d'arrêt.

## Niveau 2 : Contrats intelligents {#smart-contracts}

Les [contrats intelligents](/developers/docs/smart-contracts/) sont des programmes exécutables qui s'exécutent sur la blockchain Ethereum.

Les contrats intelligents sont écrits en utilisant des [langages de programmation](/developers/docs/smart-contracts/languages/) spécifiques qui se compilent en bytecode EVM (instructions machine de bas niveau appelées codes d'opérations).

Non seulement les contrats intelligents servent de bibliothèques open source, mais ils sont essentiellement des services d'API ouverts qui fonctionnent en permanence et ne peuvent pas être arrêtés. Les contrats intelligents fournissent des fonctions publiques avec lesquelles les utilisateurs et les applications ([dapps](/developers/docs/dapps/)) peuvent interagir, sans avoir besoin d'autorisation. Toute application peut s'intégrer à des contrats intelligents déployés pour composer des fonctionnalités, telles que l'ajout de [flux de données](/developers/docs/oracles/) ou pour prendre en charge les échanges de jetons. De plus, n'importe qui peut déployer de nouveaux contrats intelligents sur Ethereum afin d'ajouter des fonctionnalités personnalisées pour répondre aux besoins de son application.

En tant que développeur de dApp, vous n'aurez besoin de rédiger des contrats intelligents que si vous voulez ajouter des fonctionnalités personnalisées sur la blockchain Ethereum. Vous constaterez que vous pouvez réaliser la plupart ou la totalité de vos projets seulement en intégrant des contrats intelligents existants, par exemple si vous voulez encourager les paiements en stablecoins ou faciliter l'échange décentralisé de jetons.

## Niveau 3 : Nœuds Ethereum {#ethereum-nodes}

Pour qu'une application puisse interagir avec la blockchain Ethereum, elle doit se connecter à un [nœud Ethereum](/developers/docs/nodes-and-clients/). La connexion à un nœud vous permet de lire les données blockchain et/ou d'envoyer des transactions au réseau.

Les nœuds Ethereum sont des ordinateurs exécutant un logiciel : un client Ethereum. Un client est une implémentation d'Ethereum qui vérifie l'ensemble des transactions de chaque bloc, garantissant la sécurité du réseau et l'exactitude des données. **Les noeuds Ethereum sont la blockchain Ethereum**. Ils stockent collectivement l'état de la blockchain Ethereum et parviennent à un consensus sur chaque transaction pour faire muter l'état de la blockchain.

En connectant votre application à un nœud Ethereum (via [l'API JSON-RPC](/developers/docs/apis/json-rpc/)), votre application peut lire les données de la blockchain (telles que les soldes des comptes utilisateurs) et diffuser de nouvelles transactions sur le réseau (telles que le transfert d'ETH entre les comptes des utilisateurs ou l'exécution de fonctions de contrats intelligents).

## Niveau 4 : API des clients Ethereum {#ethereum-client-apis}

De nombreuses bibliothèques pratiques (créées et maintenues par la communauté open source d'Ethereum) permettent à vos applications de se connecter et de communiquer avec la blockchain Ethereum.

Si votre application destinée aux utilisateurs est une application Web, vous pouvez choisir d'`npm install` une [API JavaScript](/developers/docs/apis/javascript/) directement dans votre frontend. Ou peut-être choisirez-vous d'implémenter cette fonctionnalité côté serveur, en utilisant une API [Python](/developers/docs/programming-languages/python/) ou [Java](/developers/docs/programming-languages/java/).

Alors que ces API ne sont pas des éléments indispensables de la pile, elles éliminent une grande partie de la complexité d'intéragir directement avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex., la conversion d'ETH en Gwei) afin qu'en tant que développeur, vous puissiez passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous concentrer sur la fonctionnalité spécifique à votre application.

## Niveau 5 : Applications pour l'utilisateur final {#end-user-applications}

Au niveau supérieur de la pile se trouvent les applications orientées utilisateurs. Ce sont les applications standards que vous utilisez et développez régulièrement : principalement des applis Web et pour mobiles.

Rien ne change dans la façon de développer ces interfaces utilisateur. Souvent, les utilisateurs n'ont même pas besoin de savoir que l'application dont ils se servent se fonde sur la blockchain.

## Prêt à choisir votre pile ? {#ready-to-choose-your-stack}

Consultez notre guide pour [configurer un environnement de développement local](/developers/local-environment/) pour votre application Ethereum.

## En savoir plus {#further-reading}

- [L'architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
