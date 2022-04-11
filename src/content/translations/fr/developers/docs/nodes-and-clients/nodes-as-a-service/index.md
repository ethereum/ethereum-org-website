---
title: Les nœuds en tant que service
description: Présentation de base des services de nœuds, de leurs avantages et inconvénients, et des fournisseurs les plus populaires.
lang: fr
sidebar: true
sidebarDepth: 2
isOutdated: true
---

## Introduction {#Introduction}

Exécuter votre propre [nœud Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) peut être difficile, en particulier lorsque vous démarrez ou lors d'une mise à l'échelle rapide. Il existe un certain [nombre de services](#popular-node-services) qui exécutent des infrastructures de nœuds optimisées pour vous, afin que vous puissiez vous concentrer sur le développement de votre application ou de votre produit. Nous vous expliquerons le fonctionnement des services de nœuds, les avantages et les inconvénients de leur utilisation et vous fournirons une liste de fournisseurs si vous souhaitez vous lancer.

## Prérequis {#prerequisites}

Si vous ne savez pas encore ce que sont les nœuds et les clients, consultez la page [Nœuds et clients](/developers/docs/nodes-and-clients/).

## Comment fonctionnent les services de nœuds? {#how-do-node-services-work}

Les fournisseurs de services de nœuds exécutent les clients de nœuds distribués en arrière-plan pour vous, afin que vous n'ayez pas à le faire.

Ces services fournissent généralement une clé API que vous pouvez utiliser pour écrire sur la blockchain et pour la lire. Ils incluent souvent un accès aux [réseaux de test Ethereum](/developers/docs/networks/#testnets) en plus du réseau principal.

Certains services vous offrent votre propre nœud dédié qu'ils gèrent pour vous, tandis que d'autres utilisent des équilibreurs de charge pour répartir l'activité entre les nœuds.

Presque tous les services de nœuds sont extrêmement faciles à intégrer, impliquant des modifications d'une ligne dans votre code pour échanger votre nœud auto-hébergé, ou même pour passer d'un service à l'autre.

Souvent, les services de nœuds exécuteront une variété de [nœuds clients](/developers/docs/nodes-and-clients/#execution-clients) et de [types](/developers/docs/nodes-and-clients/#node-types), vous permettant d'accéder aux nœuds complets et d'archives en plus des méthodes spécifiques au client dans une API.

Il est important de noter que les services de nœud ne stockent pas et ne doivent pas stocker vos clés ou informations privées.

## Quels avantages à utiliser un service de nœuds ? {#benefits-of-using-a-node-service}

Le principal avantage est de ne pas avoir à consacrer du temps à la maintenance et à la gestion des nœuds. Cela vous permet donc de vous concentrer sur la construction de votre produit plutôt que d'avoir à vous soucier de la maintenance des infrastructures.

L'exécution de vos propres nœuds peut s'avérer très coûteuse, qu'il s'agisse de stockage, de bande passante ou de temps d'ingénierie. Faire tourner plus de nœuds lors d'une mise à l'échelle, mettre à niveau les nœuds vers les dernières versions et garantir la cohérence de l'état peut vous empêcher de construire et de consacrer des ressources au produit Web3.

## Quels inconvénients à utiliser un service de nœuds ? {#cons-of-using-a-node-service}

En utilisant un service de nœuds, vous centralisez l'aspect infrastructure de votre produit. C'est pourquoi les projets qui accordent la plus haute importance à la décentralisation pourraient préférer des nœuds auto-hébergés plutôt que des nœuds d'origine externe.

En savoir plus sur les [avantages à exécuter votre propre nœud ](/developers/docs/nodes-and-clients/#benefits-to-you).

## Services de nœuds populaires {#popular-node-services}

Voici une liste des fournisseurs de nœuds Ethereum les plus populaires. N'hésitez pas à ajouter ceux qui sont manquants ! Chaque service de nœuds offre différents avantages et fonctionnalités en plus des niveaux gratuits ou payants, vous devez déterminer ceux qui correspondent le mieux à vos besoins avant de prendre une décision.

- [**Alchemy**](https://alchemyapi.io/)
  - [Documentation](https://docs.alchemyapi.io/)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
    - Données d'archivage gratuites
    - Outils d'analyse
    - Tableau de bord
    - Points de terminaison API uniques
    - Liens de rappel
    - Assistance directe
- [**Infura**](https://infura.io/)
  - [Documentation](https://infura.io/docs)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
    - Données d'archivage gratuites
    - Assistance directe
    - Tableau de bord
- [**QuikNode**](https://www.quiknode.io/)
  - Fonctionnalités
    - 7 jours d’essai gratuit
    - Assistance variée
    - Liens de rappel
    - Tableau de bord
    - Analyses
- [**Rivet**](https://rivet.cloud/)
  - [Documentation](https://rivet.readthedocs.io/en/latest/)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentation](https://ubiquity.docs.blockdaemon.com/)
  - Avantages
    - Tableau de bord
    - Base par nœud
    - Analyses

## Complément d'information {#further-reading}

- [Liste des services de nœuds Ethereum](https://ethereumnodes.com/)

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)

## Tutoriels connexes {#related-tutorials}

- [Commencer le développement Ethereum avec Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
- [Guide pour envoyer des transactions avec Web3 et Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
