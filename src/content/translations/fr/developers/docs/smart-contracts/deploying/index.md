---
title: Déployer des contrat intelligents
description:
lang: fr
sidebar: true
incomplete: true
---

Vous devez déployer vos contrats intelligents afin qu'ils soient disponibles pour les utilisateurs sur un réseau Ethereum.

Déployer un contrat intelligent consiste à envoyer sur la blockchain une transaction contenant le code du contrat intelligent compilé sans spécifier de destinataire.

## Prérequis {#prerequisites}

Il est préférable d'avoir compris en quoi consiste les [réseaux Ethereum](/developers/docs/networks/), les [transactions](/developers/docs/transactions/) et l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/) avant de déployer des contrats intelligents.

Le déploiement d'un contrat coûte également des ethers, nous vous recommandons donc de vous familiariser avec le [carburant et les frais](/developers/docs/gas/) sur Ethereum.

Enfin, comme vous devrez compiler votre contrat avant de le déployer, assurez-vous d'avoir lu la page sur la [compilation des contrats intelligents](/developers/docs/smart-contracts/compiling/).

## Comment déployer un contrat intelligent {#how-to-deploy-a-smart-contract}

Vous devrez payer des frais de transaction, donc assurez-vous de disposer de quelques ethers.

### Ce dont vous aurez besoin {#what-youll-need}

- Le bytecode du contrat, généré par la [compilation](/developers/docs/smart-contracts/compiling/).
- Des ethers pour le carburant. Vous fixerez votre limite de carburant comme pour les autres transactions, mais sachez que les déploiements de contrats nécessitent beaucoup plus de carburant qu'un simple transfert d'ethers.
- Un script de déploiement ou un plugin.
- L'ccès à un [nœud Ethereum](/developers/docs/nodes-and-clients/), soit en exécutant le vôtre, soit en vous connectant à un nœud public, soit avec une clé API via un service comme Infura ou Alchemy.

Une fois déployé, votre contrat aura une adresse Ethereum comme les autres [comptes](/developers/docs/accounts/).

## Outils connexes {#related-tools}

**Remix -** **_L'IDE de Remix permet de développer, de déployer et de gérer les contrats intelligents destinés à Ethereum comme des blockchains._**

- [Remix](https://remix.ethereum.org)

**Tenderly -** **_Plateforme permettant de surveiller facilement vos contrats intelligents, avec suivi des erreurs, alertes, indicateurs de performances et analyses détaillées des contrats_**

- [tenderly.co](https://tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

## Tutoriels connexes {#related-tutorials}

- [Déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/) _– Introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum_
- [Interagir avec d'autres contrats Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec celui-ci_
- [Réduire les contrats pour respecter la limite de taille](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Comment réduire la taille de votre contrat pour le garder sous la limite et économiser du carburant_

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Frameworks de développement](/developers/docs/frameworks/)
