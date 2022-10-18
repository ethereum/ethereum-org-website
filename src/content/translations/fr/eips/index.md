---
title: Propositions d'amélioration d'Ethereum (EIP)
description: Informations de base dont vous avez besoin pour comprendre les propositions d'amélioration d'Ethereum (EIP).
lang: fr
---

# Introduction aux propositions d'amélioration d'Ethereum (EIP) {#introduction-to-ethereum-improvement-proposals-eips}

## En quoi consistent les EIP ? {#what-are-eips}

[Les EIP](https://eips.ethereum.org/) sont des normes spécifiant de nouvelles fonctionnalités ou processus potentiels pour Ethereum. Les EIP contiennent les spécifications techniques des modifications proposées et servent de "source de vérité" pour la communauté. Les mises à niveau du réseau et les normes des applications Ethereum sont discutées et développées via le processus des EIP.

N'importe qui dans la communauté Ethereum peut créer une EIP. Les directives pour rédiger des EIP sont incluses dans l'[EIP 1](https://eips.ethereum.org/EIPS/eip-1). L'EIP doit fournir une spécification technique concise de la fonctionnalité et sa justification. L'auteur de l'EIP est chargé d'obtenir un consensus au sein de la communauté et de documenter les opinions divergentes. Le niveau technique étant élevé pour soumettre une EIP bien formulée, la plupart des auteurs d'EIP sont des développeurs d'application ou de protocole.

## Pourquoi les EIP sont-elles importantes ? {#why-do-eips-matter}

Les EIP jouent un rôle central dans la façon dont les modifications sont effectuées et documentées sur Ethereum. Elles permettent aux utilisateurs de proposer, de discuter et d'adopter des modifications. Il existe [différents types d'EIP](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1.md#eip-types), y compris les EIP fondamentales pour les changements de protocole de bas niveau qui affectent le consensus et nécessitent une mise à niveau du réseau, et des ERC pour les normes d'applications. Par exemple, les normes pour créer des jetons, comme [ERC-20](https://eips.ethereum.org/EIPS/eip-20) ou [ERC-721](https://eips.ethereum.org/EIPS/eip-721) permettent aux applications d'interagir avec ces jetons pour traiter tous ceux utilisant les mêmes règles, ce qui facilite la création d'applications interopérables.

Chaque mise à niveau du réseau consiste en un ensemble d'EIP qui doivent être implémentées par chaque [client Ethereum](/learn/#clients-and-nodes) du réseau. Cela implique que pour conserver un consensus avec les autres clients du réseau principal Ethereum, les développeurs de clients doivent s'assurer qu'ils ont tous implémenté les EIP requises.

En plus de fournir les spécifications techniques des modifications, les EIP représentent l'unité de la gouvernance sur Ethereum : n'importe qui est libre d'en proposer une, puis divers parties prenantes de la communauté en discutent pour déterminer si elle doit être adoptée comme norme ou incluse dans une mise à niveau du réseau. Les EIP non fondamentales n'ont pas besoin d'être adoptées par toutes les applications (par exemple, vous pouvez créer un jeton non [ERC-20](https://eips.ethereum.org/EIPS/eip-20)), mais les EIP fondamentales doivent être largement adoptées (car tous les nœuds doivent se mettre à niveau pour continuer de faire partie du même réseau). Les EIP fondamentales nécessitent un consensus plus large au sein de la communauté que les EIP non fondamentales.

## Historique des EIP {#history-of-eips}

Le dépôt [GitHub des EIP](https://github.com/ethereum/EIPs) a été créé en octobre 2015. Le processus des EIP est basé sur celui des [propositions d'amélioration de Bitcoin (BIP)](https://github.com/bitcoin/bips), lui-même basé sur celui des [propositions d'amélioration de Python (PEP)](https://www.python.org/dev/peps/).

Des éditeurs sont chargés de vérifier la solidité technique, l'orthographe/la grammaire et le style du code des EIP. Martin Becze, Vitalik Buterin, Gavin Wood et quelques autres ont été les éditeurs d'origine des EIP de 2015 à fin 2016. Les éditeurs d'EIP actuels sont :

- Alex Beregszaszi (EWASM/Ethereum Foundation)
- Greg Colvin (Communauté)
- Casey Detrio (EWASM/Ethereum Foundation)
- Matt Garnett (Quilt)
- James Hudson (Ethereum Foundation)
- Nick Johnson (ENS)
- Nick Savers (Communauté)
- Micah Zoltu (Communauté)

Les éditeurs d'EIP, avec les membres de la communauté des [Ethereum Cat Herders](https://ethereumcatherders.com/) et des [Ethereum Magicians](https://ethereum-magicians.org/), décident des EIP qui seront implémentées et sont responsables de la facilitation des EIP ainsi que du passage des EIP au stade "Final" ou "Retiré".

Le processus complet de normalisation ainsi que la charte sont détaillés dans le document [EIP-1](https://eips.ethereum.org/EIPS/eip-1)

## En savoir plus {#learn-more}

Si vous souhaitez en savoir plus, consultez le [site dédié aux EIP](https://eips.ethereum.org/), où vous trouverez les informations supplémentaires suivantes :

- [Présentation des différents types d'EIP](https://eips.ethereum.org/)
- [Liste de toutes les EIP créées](https://eips.ethereum.org/all)
- [Statuts des EIP et leur signification](https://eips.ethereum.org/)

## Participer {#participate}

Tout le monde peut créer une EIP ou une ERC, mais il est conseillé de lire [EIP-1](https://eips.ethereum.org/EIPS/eip-1), qui décrit le processus d'EIP, ce qu'est une EIP, les différents types d'EIP, ce que le document EIP doit contenir, le format et le modèle EIP, la liste des éditeurs d'EIP et tout ce que vous devez savoir sur les EIP avant d'en créer une. Votre nouvelle EIP doit définir une nouvelle fonctionnalité qui n'est pas vraiment complexe mais pas super niche et peut être utilisée par des projets dans l'écosystème Ethereum. L'élément le plus difficile est la facilitation : en tant qu'auteur, vous devez rassembler la communauté autour de votre EIP, collecter des commentaires, écrire des articles décrivant les problèmes que votre EIP résout, et collaborer avec des projets pour implémenter votre EIP.

Si vous souhaitez suivre la discussion sur les EIP ou faire part de vos commentaires, consultez le [forum Ethereum Magicians](https://ethereum-magicians.org/), où la communauté discute des EIP.

Voir également :

- [Comment créer une EIP](https://eips.ethereum.org/EIPS/eip-1)

## Références {#references}

<cite class="citation">

Contenu de la page en partie issu de l'article [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/), par Hudson Jameson

</cite>
