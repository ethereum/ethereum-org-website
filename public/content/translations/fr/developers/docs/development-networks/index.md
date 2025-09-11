---
title: Réseaux de développement
description: "Présentation des réseaux de développement et des outils disponibles pour \nconstruire des applications Ethereum."
lang: fr
---

Quand vous construirez une application Ethereum avec des contrats intelligents, vous voudrez l'exécuter sur un réseau local pour vérifier son fonctionnement avant de la déployer.

De la même façon que vous exécuteriez un serveur local sur votre ordinateur pour du développement Web, vous pouvez utiliser un réseau de développement pour créer une occurrence de blockchain locale et tester votre application décentralisée (dApp). Ces réseaux de développement Ethereum fournissent des fonctionnalités permettant une itération beaucoup plus rapide qu'un réseau de test public (par exemple, vous n'avez pas à gérer l'acquisition d'ETH depuis le robinet d'un réseau de test).

## Prérequis {#prerequisites}

Vous devrez comprendre les [bases de la pile Ethereum](/developers/docs/ethereum-stack/) et des [réseaux Ethereum](/developers/docs/networks/) avant de vous plonger dans les réseaux de développement.

## Qu'est-ce qu'un réseau de développement ? {#what-is-a-development-network}

Les réseaux de développement sont essentiellement des clients Ethereum (implémentations d'Ethereum) spécifiquement conçus pour le développement local.

**Pourquoi ne pas juste exécuter un nœud Ethereum standard localement ?**

Vous _pourriez_ [ exécuter un nœud](/developers/docs/nodes-and-clients/#running-your-own-node) mais puisque les réseaux de développement sont conçus pour le développement, ils sont souvent fournis avec des fonctionnalités pratiques telles que :

- Alimentation déterminée de votre blockchain locale avec des données (par exemple, des comptes avec des soldes d'ETH)
- Production instantanée de blocs avec chaque transaction reçue, dans l'ordre et sans délai
- Fonctionnalités de débogage et de logging améliorées

## Outils disponibles {#available-projects}

**Remarque** : La plupart des [cadres de développement](/developers/docs/frameworks/) incluent un réseau de développement intégré. Nous recommandons de démarrer avec un cadre pour [configurer votre environnement de développement local](/developers/local-environment/).

### Réseau Hardhat {#hardhat-network}

Un réseau Ethereum local conçu pour le développement. Il vous permet de déployer vos contrats, d'effectuer vos tests et de déboguer votre code.

Le réseau Hardhat est intégré avec Hardhat, un environnement de développement Ethereum pour les professionnels.

- [Site Web](https://hardhat.org/)
- [GitHub](https://github.com/nomiclabs/hardhat)

### Chaînes phares locales {#local-beacon-chains}

Certains clients de consensus disposent d'outils intégrés pour faire tourner les chaînes phares locales à des fins de test. Les instructions pour Lighthouse, Nimbus et Lodestar sont disponibles ici :

- [Réseau de test local utilisant Lodestar](https://chainsafe.github.io/lodestar/contribution/advanced-topics/setting-up-a-testnet#post-merge-local-testnet/)
- [Réseau de test local utilisant Lighthouse](https://lighthouse-book.sigmaprime.io/setup.html#local-testnets)

### Chaînes publiques de test pour Ethereum {#public-beacon-testchains}

Il y a aussi deux implémentations de test publiques maintenues d'Ethereum : Sepolia et Hoodi. Sepolia est le réseau de test standard recommandé pour le développement d'applications, avec un ensemble de validateurs fermé pour une synchronisation rapide. Hoodi est un réseau de test pour la validation et la mise en jeu, qui utilise un ensemble de validateurs ouvert et permet potentiellement à tout le monde de valider.

- [Plateforme de lancement de la mise en jeu de Hoodi](https://hoodi.launchpad.ethereum.org/en/)
- [Site Web de Sepolia](https://sepolia.dev/)
- [Site Web de Hoodi](https://hoodi.ethpandaops.io/)

### Pack Ethereum de Kurtosis {#kurtosis}

Kurtosis est un système de construction d'environnements de test multi-conteneurs qui permet aux développeurs de créer localement des instances reproductibles de réseaux de blockchain.

Le pack Ethereum de Kurtosis peut être utilisé pour instancier rapidement un réseau de test Ethereum paramétrable, hautement évolutif, et privé sur Docker ou Kubernetes. Le pack supporte tous les clients majeurs de la couche d'exécution (EL) et de la couche de consensus (CL). Kurtosis gère gracieusement tous les mappages de ports locaux et les connexions de service sur un réseau représentatif à utiliser dans les flux de validation et de test en lien avec l'infrastructure de base d'Ethereum.

- [Pack réseau Ethereum](https://github.com/kurtosis-tech/ethereum-package)
- [Site Web](https://www.kurtosis.com/)
- [GitHub](https://github.com/kurtosis-tech/kurtosis)
- [Documentation](https://docs.kurtosis.com/)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Frameworks de développement](/developers/docs/frameworks/)
- [Configurer un environnement de développement local](/developers/local-environment/)
