---
title: Standards de jetons
description: Explorez les standards de jetons Ethereum, y compris ERC-20, ERC-721 et ERC-1155 pour les jetons fongibles et non fongibles.
lang: fr
incomplete: true
---

## Introduction {#introduction}

De nombreux standards de développement [Ethereum](/) se concentrent sur les interfaces de jetons. Ces standards permettent de s'assurer que les contrats intelligents restent composables, de sorte que lorsqu'un nouveau projet émet un jeton, il reste compatible avec les applications et les échanges décentralisés existants.

Les standards de jetons définissent la manière dont les jetons se comportent et interagissent à travers l'écosystème Ethereum. Ils permettent aux développeurs de construire plus facilement sans réinventer la roue, garantissant que les jetons fonctionnent de manière transparente avec les portefeuilles, les échanges et les plateformes de finance décentralisée (DeFi). Que ce soit dans les jeux, la gouvernance ou d'autres cas d'utilisation, ces standards apportent de la cohérence et rendent Ethereum plus interconnecté.

## Prérequis {#prerequisites}

- [Standards de développement Ethereum](/developers/docs/standards/)
- [Contrats intelligents](/developers/docs/smart-contracts/)

## Standards de jetons {#token-standards}

Voici quelques-uns des standards de jetons les plus populaires sur Ethereum :

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Une interface standard pour les jetons fongibles (interchangeables), comme les jetons de vote, les jetons de staking ou les monnaies virtuelles.

### Standards de NFT {#nft-standards}

- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Une interface standard pour les jetons non fongibles, comme un titre de propriété pour une œuvre d'art ou une chanson.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - L'ERC-1155 permet des échanges plus efficaces et le regroupement de transactions, ce qui permet de réduire les coûts. Ce standard de jeton permet de créer à la fois des jetons utilitaires (tels que le $BNB ou le $BAT) et des jetons non fongibles comme les CryptoPunks.

La liste complète des propositions [ERC](https://eips.ethereum.org/erc).

## Lectures complémentaires {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Tutoriels connexes {#related-tutorials}

- [Liste de contrôle pour l'intégration de jetons](/developers/tutorials/token-integration-checklist/) _– Une liste de contrôle des éléments à prendre en compte lors de l'interaction avec des jetons._
- [Comprendre le contrat intelligent de jeton ERC-20](/developers/tutorials/understand-the-erc-20-token-smart-contract/) _– Une introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum._
- [Transferts et approbation de jetons ERC-20 à partir d'un contrat intelligent Solidity](/developers/tutorials/transfers-and-approval-of-erc-20-tokens-from-a-solidity-smart-contract/) _– Comment utiliser un contrat intelligent pour interagir avec un jeton en utilisant le langage Solidity._
- [Implémenter un marché ERC-721 [un guide pratique]](/developers/tutorials/how-to-implement-an-erc721-market/) _– Comment mettre en vente des articles tokenisés sur un tableau de petites annonces décentralisé._