---
title: Normes de développement Ethereum
description:
lang: fr
incomplete: true
---

## Vue d'ensemble des normes {#standards-overview}

La communauté Ethereum a adopté de nombreuses normes qui aident à maintenir l'interopérabilité des projets (comme les [clients Ethereum](/developers/docs/nodes-and-clients/) et les portefeuilles) entre les implémentations, et garantir que les contrats intelligents et les DApps restent composables.

Ces normes sont généralement présentées via les [propositions d'amélioration d'Ethereum (EIP)](/eips/), qui sont discutées entre les membres de la communauté selon un [processus standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduction aux EIP](/eips/)
- [Liste des EIP](https://eips.ethereum.org/)
- [Repo GitHub EIP](https://github.com/ethereum/EIPs)
- [Forum de discussions sur les EIP](https://ethereum-magicians.org/c/eips)
- [Introduction à la gouvernance d'Ethereum](/governance/)
- [Ethereum Governance Overview](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _- Boris Mann, 31 mars 2019_
- [Ethereum Protocol Development Governance and Network Upgrade Coordination](https://hudsonjameson.com/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _- Hudson Jameson, 23 mars 2020_
- [Playlist de toutes les rencontres de l'équipe de développement de base Ethereum](https://www.youtube.com/@EthereumProtocol) _(YouTube Playlist)_

## Types de normes {#types-of-standards}

Il existe trois types d'EIP :

- Suivi standard : décrit tout changement qui atteint la plupart ou toutes les implémentations d'Ethereum
- [Meta Track](https://eips.ethereum.org/meta) : décrit un processus entourant Ethereum ou propose une modification d'un processus
- [Piste d'information](https://eips.ethereum.org/informational) : décrit une anomalie de conception Ethereum ou fournit des directives générales ou des informations à la communauté Ethereum

De plus, le Standard Track est subdivisé en 4 catégories :

- [Noyau](https://eips.ethereum.org/core) : améliorations nécessitant un fork de consensus
- [Réseau](https://eips.ethereum.org/networking) : améliorations autour de devp2p et du sous-protocole Ethereum léger, ainsi que des améliorations proposées aux spécifications du protocole réseau de whisper et star.
- [Interface](https://eips.ethereum.org/interface) : améliorations autour des spécifications et des normes API/RPC des clients, et de certaines normes au niveau du langage comme les noms de méthodes et les ABI des contrats.
- [ERC](https://eips.ethereum.org/erc) : normes et conventions au niveau des applications

Des informations plus détaillées sur ces différents types et catégories peuvent être trouvées dans [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Normes de jetons {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Une interface type pour les jetons fongibles (interchangeables) comme les jetons de vote, les jetons d'enjeu ou les monnaies virtuelles.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Une norme de jetons fongibles qui rend les jetons identiques à l'éther et prend en charge la gestion des transferts de jetons du côté des destinataires.
  - [ERC-1363](https://eips.ethereum.org/EIPS/eip-1363) - Définit une interface de jeton pour les jetons ERC-20 qui prend en charge l'exécution du code du destinataire après transfert ou transferFrom, ou du code de l'expéditeur après approbation.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Une interface type pour les jetons non fongibles, comme ceux requis pour les œuvres d'art ou une chanson.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Événement normalisé émis lors de la création/du transfert d'un, ou de plusieurs jetons non fongibles à l'aide d'identifiants de jetons consécutifs.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Extension de l'interface pour le rôle de consommateur EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Ajouter un rôle limité dans le temps avec des autorisations restreintes aux jetons ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NON RECOMMANDÉ)** Une norme de jeton améliorant ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Un type de jeton qui peut contenir des actifs fongibles et non fongibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Un standard de coffre tokenisé conçu pour optimiser et unifier les paramètres techniques des coffres à rendement.

En savoir plus sur les [normes de jetons](/developers/docs/standards/tokens/)

## Complément d'information {#further-reading}

- [Propositions d'amélioration d'Ethereum (EIP)](/eips/)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
