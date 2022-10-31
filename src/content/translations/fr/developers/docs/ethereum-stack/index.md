---
title: Introduction à la pile Ethereum
description: Présentation étape par étape des différentes couches de la pile Ethereum, et comment elles fonctionnent ensemble.
lang: fr
---

Comme toute pile logicielle, la pile complète Ethereum varie d'un projet à l'autre en fonction de vos objectifs propres.

Il existe cependant des technologies Ethereum de base qui contribuent à fournir un modèle mental de la façon dont les applications logicielles interagissent avec la blockchain Ethereum. Comprendre les couches de la pile vous permettra d'appréhender les différentes façons d'intégrer Ethereum dans les projets logiciels.

## Niveau 1: Machine virtuelle Ethereum {#ethereum-virtual-machine}

La [machine virtuelle Ethereum (EVM)](/developers/docs/evm/) est l'environnement d'exécution des contrats intelligents Ethereum. Tout contrat intelligent et changement d'état sur la blockchain Ethereum sont exécutés par des [transactions](/developers/docs/transactions/). L'EVM gère l'ensemble du traitement des transactions sur le réseau Ethereum.

Comme toute machine virtuelle, l'EVM crée un niveau d'abstraction entre l'exécution du code et la machine qui l'exécute (un nœud Ethereum). Actuellement, l'EVM s'exécute sur des milliers de nœuds répartis à travers le monde.

De façon non visible, l'EVM utilise un ensemble d'instructions de codes d'opérations (opcodes) pour exécuter des tâches spécifiques. Ces 140 opcodes uniques permettent à l'EVM d'être Turing-complet, ce qui signifie qu'elle est capable de calculer à peu près tout, à partir du moment où elle dispose des ressources suffisantes.

En tant que développeur de DApp, vous n'avez pas besoin d'en savoir beaucoup plus sur l'EVM, à part qu'elle existe et qu'elle assure de façon fiable le bon fonctionnement des applications sur Ethereum sans temps d'arrêt.

## Niveau 2 : Contrats intelligents {#smart-contracts}

[Les contrats intelligents](/developers/docs/smart-contracts/) sont les programmes exécutables qui tournent sur la blockchain Ethereum.

Les contrats intelligents sont rédigés avec des [langages de programmation](/developers/docs/smart-contracts/languages/) spécifiques qui se compilent en bytecode EVM (instructions machine de bas niveau appelées codes d'opérations).

Non seulement les contrats intelligents servent de bibliothèques open source, mais ce sont aussi essentiellement des services API ouverts fonctionnant / qui ne peuvent être arrêtés. Les contrats intelligents fournissent des fonctions publiques avec lesquelles les utilisateurs et les applications ([dApps](/developers/docs/dapps/)) peuvent interagir sans nécessiter d'autorisation. Toute application peut s'intégrer à des contrats intelligents déployés pour composer des fonctionnalités, telles que l'ajout de [flux de données](/developers/docs/oracles/) ou la prise en charge des échanges de jetons. N'importe qui peut déployer de nouveaux contrats intelligents sur Ethereum pour ajouter des fonctionnalités personnalisées et répondre aux besoins de son application.

En tant que développeur de dApp, vous n'aurez besoin de rédiger des contrats intelligents que si vous voulez ajouter des fonctionnalités personnalisées sur la blockchain Ethereum. Vous constaterez que vous pouvez réaliser la plupart ou la totalité de vos projets seulement en intégrant des contrats intelligents existants, par exemple si vous voulez encourager les paiements en stablecoins ou faciliter l'échange décentralisé de jetons.

## Niveau 3 : Nœuds Ethereum {#ethereum-nodes}

Afin qu'une application interagisse avec la blockchain Ethereum, elle doit se connecter à un [nœud Ethereum](/developers/docs/nodes-and-clients/). La connexion à un nœud vous permet de lire les données blockchain et/ou d'envoyer des transactions au réseau.

Les nœuds Ethereum sont des ordinateurs exécutant un logiciel : un client Ethereum. Un client est une implémentation d'Ethereum qui vérifie toutes les transactions de chaque bloc, ce qui assure la sécurité du réseau et l'exactitude des données. **Les noeuds Ethereum sont la blockchain Ethereum**. Ils stockent collectivement l'état de la blockchain Ethereum et parviennent à un consensus sur chaque transaction pour faire muter l'état de la blockchain.

En connectant votre application à un nœud Ethereum (via une spécification [RPC JSON](/developers/docs/apis/json-rpc/)), votre application peut lire les données de la blockchain (comme les soldes de compte utilisateur) et diffuser de nouvelles transactions sur le réseau (comme le transfert d'ETH entre comptes utilisateur ou l'exécution de fonctions de contrats intelligents).

## Niveau 4 : API clientes Ethereum {#ethereum-client-apis}

De nombreuses bibliothèques pratiques (construites et maintenues par la communauté Open Source Ethereum) permettent à vos applications utilisateur de se connecter à la blockchain Ethereum et de communiquer avec elle.

Si votre application orientée utilisateur est une application Web, vous pouvez choisir de `npm install` une [API JavaScript](/developers/docs/apis/javascript/) directement sur votre frontend, ou préférerez peut-être implémenter cette fonctionnalité côté serveur, avec une API [Python](/developers/docs/programming-languages/python/) ou [Java](/developers/docs/programming-languages/java/).

Alors que ces API ne sont pas des éléments indispensables de la pile, elles éliminent une grande partie de la complexité d'intéragir directement avec un nœud Ethereum. Elles fournissent également des fonctions utilitaires (par ex. convertir des ETH en gwei) afin que vous puissiez, en tant que développeur, passer moins de temps à gérer les subtilités des clients Ethereum et plus de temps à vous consacrer aux fonctionnalités uniques de votre application.

## Niveau 5 : Applications utilisateur {#end-user-applications}

Au niveau supérieur de la pile se trouvent les applications orientées utilisateurs. Ce sont les applications standards que vous utilisez et développez régulièrement : principalement des applis Web et pour mobiles.

Rien ne change dans la façon de développer ces interfaces utilisateur. Souvent, les utilisateurs n'ont même pas besoin de savoir que l'application dont ils se servent se fonde sur la blockchain.

## Prêt à choisir votre pile ? {#ready-to-choose-your-stack}

Consultez notre guide [Configurer un environnement de développement local](/developers/local-environment/) pour développer votre application Ethereum.

## Complément d'information {#further-reading}

- [L'Architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
