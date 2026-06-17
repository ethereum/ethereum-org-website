---
title: Introduction aux propositions d'amélioration d'Ethereum (EIP)
metaTitle: Propositions d'amélioration d'Ethereum (EIP)
description: Les informations de base dont vous avez besoin pour comprendre les EIP
lang: fr
---

## Que sont les EIP ? {#what-are-eips}

Les [propositions d'amélioration d'Ethereum (EIP)](https://eips.ethereum.org/) sont des normes spécifiant de nouvelles fonctionnalités ou de nouveaux processus potentiels pour Ethereum. Les EIP contiennent les spécifications techniques des modifications proposées et agissent comme la « source de vérité » pour la communauté. Les mises à niveau du réseau et les normes d'application pour [Ethereum](/) sont discutées et développées via le processus des EIP.

N'importe qui au sein de la communauté Ethereum a la possibilité de créer une EIP. Les directives pour la rédaction des EIP sont incluses dans l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Une EIP doit principalement fournir une spécification technique concise avec une brève explication de sa motivation. L'auteur de l'EIP est responsable de l'obtention d'un consensus au sein de la communauté et de la documentation des opinions alternatives. Étant donné la barrière technique élevée pour soumettre une EIP bien formulée, historiquement, la plupart des auteurs d'EIP sont généralement des développeurs d'applications ou de protocoles.

## Pourquoi les EIP sont-elles importantes ? {#why-do-eips-matter}

Les EIP jouent un rôle central dans la façon dont les changements se produisent et sont documentés sur Ethereum. Elles constituent le moyen pour les personnes de proposer, de débattre et d'adopter des changements. Il existe [différents types d'EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types), y compris les EIP de base (core) pour les modifications de protocole de bas niveau qui affectent le consensus et nécessitent une mise à niveau du réseau comme l'[EIP-1559](https://eips.ethereum.org/EIPS/eip-1559), et les ERC pour les normes d'application comme l'[EIP-20](https://eips.ethereum.org/EIPS/eip-20) et l'[EIP-721](https://eips.ethereum.org/EIPS/eip-721).

Chaque mise à niveau du réseau se compose d'un ensemble d'EIP qui doivent être implémentées par chaque [client Ethereum](/learn/#clients-and-nodes) sur le réseau. Cela signifie que pour rester en consensus avec les autres clients sur le réseau principal Ethereum, les développeurs de clients doivent s'assurer qu'ils ont tous implémenté les EIP requises.

En plus de fournir une spécification technique pour les changements, les EIP sont l'unité autour de laquelle s'articule la gouvernance dans Ethereum : n'importe qui est libre d'en proposer une, puis diverses parties prenantes de la communauté débattront pour déterminer si elle doit être adoptée comme norme ou incluse dans une mise à niveau du réseau. Étant donné que les EIP non essentielles (non-core) n'ont pas à être adoptées par toutes les applications (par exemple, il est possible de créer un jeton fongible qui n'implémente pas l'EIP-20), mais que les EIP de base (core) doivent être largement adoptées (car tous les nœuds doivent se mettre à niveau pour continuer à faire partie du même réseau), les EIP de base nécessitent un consensus plus large au sein de la communauté que les EIP non essentielles.

## Historique des EIP {#history-of-eips}

Le [dépôt GitHub des propositions d'amélioration d'Ethereum (EIP)](https://github.com/ethereum/EIPs) a été créé en octobre 2015. Le processus des EIP est basé sur le processus des [propositions d'amélioration de Bitcoin (BIP)](https://github.com/bitcoin/bips), qui est lui-même basé sur le processus des [propositions d'amélioration de Python (PEP)](https://www.python.org/dev/peps/).

Les éditeurs d'EIP sont chargés du processus d'examen des EIP pour vérifier leur solidité technique, les problèmes de formatage et corriger l'orthographe, la grammaire et le style de code. Martin Becze, Vitalik Buterin, Gavin Wood et quelques autres ont été les premiers éditeurs d'EIP de 2015 à fin 2016.

Les éditeurs d'EIP actuels sont :

- Alex Beregszaszi (@axic)
- Gavin John (@Pandapip1)
- Greg Colvin (@gcolvin)
- Matt Garnett (@lightclient)
- Sam Wilson (@SamWilsn)

Les éditeurs d'EIP émérites sont :

- Casey Detrio (@cdetrio)
- Hudson Jameson (@Souptacular)
- Martin Becze (@wanderer)
- Micah Zoltu (@MicahZoltu)
- Nick Johnson (@arachnid)
- Nick Savers (@nicksavers)
- Vitalik Buterin (@vbuterin)

Si vous souhaitez devenir éditeur d'EIP, veuillez consulter l'[EIP-5069](https://eips.ethereum.org/EIPS/eip-5069).

Les éditeurs d'EIP décident quand une proposition est prête à devenir une EIP et aident les auteurs d'EIP à faire avancer leurs propositions. Les [Ethereum Cat Herders](https://www.ethereumcatherders.com/) aident à organiser des réunions entre les éditeurs d'EIP et la communauté (voir [EIPIP](https://github.com/ethereum-cat-herders/EIPIP)).

Le processus de normalisation complet ainsi qu'un diagramme sont décrits dans l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1).

## En savoir plus {#learn-more}

Si vous souhaitez en savoir plus sur les EIP, consultez le [site Web des EIP](https://eips.ethereum.org/) et l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1). Voici quelques liens utiles :

- [Une liste de toutes les propositions d'amélioration d'Ethereum](https://eips.ethereum.org/all)
- [Une description de tous les types d'EIP](https://eips.ethereum.org/EIPS/eip-1#eip-types)
- [Une description de tous les statuts d'EIP](https://eips.ethereum.org/EIPS/eip-1#eip-process)

### Projets éducatifs de la communauté {#community-projects}

- [PEEPanEIP](https://www.youtube.com/playlist?list=PL4cwHXAawZxqu0PKKyMzG_3BJV_xZTi1F) — *PEEPanEIP est une série de vidéos éducatives qui traite des propositions d'amélioration d'Ethereum (EIP) et des principales fonctionnalités des mises à niveau à venir.*
- [EIPs.wtf](https://www.eips.wtf/) — *EIPs.wtf fournit des informations supplémentaires sur les propositions d'amélioration d'Ethereum (EIP), y compris leur statut, les détails de mise en œuvre, les demandes d'extraction (pull requests) associées et les retours de la communauté.* 
- [EIP.Fun](https://eipfun.substack.com/) — *EIP.Fun fournit les dernières nouvelles sur les propositions d'amélioration d'Ethereum (EIP), des mises à jour sur les réunions EIP, et plus encore.*
- [EIPs Insight](https://eipsinsight.com/) — *EIPs Insight est une représentation de l'état du processus des propositions d'amélioration d'Ethereum (EIP) et des statistiques selon les informations recueillies à partir de différentes ressources.*

## Participer {#participate}

N'importe qui peut créer une EIP. Avant de soumettre une proposition, il faut lire l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1) qui décrit le processus des EIP et comment rédiger une EIP, et solliciter des commentaires sur [Ethereum Magicians](https://ethereum-magicians.org/), où les propositions sont d'abord discutées avec la communauté avant qu'un brouillon ne soit soumis.

## Références {#references}

<cite class="citation">

Contenu de la page fourni en partie par [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) de Hudson Jameson

</cite>