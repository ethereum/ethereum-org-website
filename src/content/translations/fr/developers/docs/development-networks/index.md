---
title: Réseaux de développement
description: "Présentation des réseaux de développement et des outils disponibles pour \nconstruire des applications Ethereum."
lang: fr
---

Quand vous construirez une application Ethereum avec des contrats intelligents, vous voudrez l'exécuter sur un réseau local pour vérifier son fonctionnement avant de la déployer.

De la même façon que vous exécuteriez un serveur local sur votre ordinateur pour du développement Web, vous pouvez utiliser un réseau de développement pour créer une occurrence de blockchain locale et tester votre application décentralisée (DApp). Ces réseaux de développement Ethereum fournissent des fonctionnalités permettant une itération beaucoup plus rapide qu'un réseau de test public (par exemple, vous n'avez pas à gérer l'acquisition d'ETH depuis le robinet d'un réseau de test).

## Prérequis {#prerequisites}

Vous devrez comprendre les [bases de la pile Ethereum](/developers/docs/ethereum-stack/) et des [réseaux Ethereum](/developers/docs/networks/) avant de vous plonger dans les réseaux de développement.

## Qu'est-ce qu'un réseau de développement? {#what-is-a-development-network}

Les réseaux de développement sont essentiellement des clients Ethereum (implémentations d'Ethereum) spécifiquement conçus pour le développement local.

**Pourquoi ne pas juste exécuter un nœud Ethereum standard localement ?**

Vous _pourriez_ [ exécuter un nœud](/developers/docs/nodes-and-clients/#running-your-own-node) (tels que Geth, Erigon, ou Nethermind) mais puisque les réseaux de développement sont conçus pour le développement, ils sont souvent fournis avec des fonctionnalités pratiques telles que:

- Alimentation déterminée de votre blockchain locale avec des données (par exemple, des comptes avec des soldes d'ETH)
- Minage instantané de blocs avec chaque transaction reçue, dans l'ordre et sans délai
- Fonctionnalités de débogage et de consignation améliorées

## Outils disponibles {#available-projects}

**Remarque** : La plupart des [frameworks de développement](/developers/docs/frameworks/) incluent un réseau de développement intégré. Nous recommandons de démarrer avec un framework pour [configurer votre environnement de développement local](/developers/local-environment/).

### Ganache {#ganache}

Lance rapidement une blockchain Ethereum personnelle que vous pouvez utiliser pour exécuter des tests et des commandes, et inspecter l'état tout en contrôlant comment la chaîne opère.

Ganache fournit une interface (Ganache UI), ainsi qu'un outil en ligne de commande (`ganache-cli`). C'est un élément de la suite d'outils Truffle.

- [Site Web](https://www.trufflesuite.com/ganache)
- [GitHub](https://github.com/trufflesuite/ganache)
- [Documentation](https://www.trufflesuite.com/docs/ganache/overview)

### Réseau Hardhat {#hardhat-network}

Un réseau Ethereum local conçu pour le développement. Il vous permet de déployer vos contrats, d'effectuer vos tests et de déboguer votre code.

Le réseau Hardhat est intégré avec Hardhat, un environnement de développement Ethereum pour les professionnels.

- [Site Web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Infrastructures de développement](/developers/docs/frameworks/)
- [Configurer un environnement de développement local](/developers/local-environment/)
