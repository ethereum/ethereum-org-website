---
title: Normes de développement d'Ethereum
description: Découvrez les normes d'Ethereum, y compris les EIP, les normes de jetons comme l'ERC-20 et l'ERC-721, et les conventions de développement.
lang: fr
incomplete: true
---

## Aperçu des normes {#standards-overview}

La communauté Ethereum a adopté de nombreuses normes qui aident à maintenir les projets (tels que les [clients Ethereum](/developers/docs/nodes-and-clients/) et les portefeuilles) interopérables entre les implémentations, et à garantir que les contrats intelligents et les applications décentralisées (dapps) restent composables.

Généralement, les normes sont introduites sous forme de [propositions d'amélioration d'Ethereum](/eips/) (EIP), qui sont discutées par les membres de la communauté via un [processus standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduction aux EIP](/eips/)
- [Liste des EIP](https://eips.ethereum.org/)
- [Dépôt GitHub des EIP](https://github.com/ethereum/EIPs)
- [Forum de discussion des EIP](https://ethereum-magicians.org/c/eips)
- [Introduction à la gouvernance d'Ethereum](/governance/)
- [Aperçu de la gouvernance d'Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 mars 2019 - Boris Mann_
- [Gouvernance du développement du protocole Ethereum et coordination des mises à niveau du réseau](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 mars 2020 - Hudson Jameson_
- [Liste de lecture de toutes les réunions des développeurs principaux d'Ethereum](https://www.youtube.com/@EthereumProtocol) _(Liste de lecture YouTube)_

## Types de normes {#types-of-standards}

Il existe 3 types d'EIP :

- Standards Track (Voie des normes) : décrit tout changement qui affecte la plupart ou la totalité des implémentations d'Ethereum
- [Meta Track (Voie méta)](https://eips.ethereum.org/meta) : décrit un processus entourant Ethereum ou propose une modification d'un processus
- [Informational Track (Voie informative)](https://eips.ethereum.org/informational) : décrit un problème de conception d'Ethereum ou fournit des directives générales ou des informations à la communauté Ethereum

De plus, la voie des normes (Standard Track) est subdivisée en 4 catégories :

- [Core (Cœur)](https://eips.ethereum.org/core) : améliorations nécessitant un fork de consensus
- [Networking (Réseau)](https://eips.ethereum.org/networking) : améliorations autour de devp2p et du sous-protocole Light Ethereum, ainsi que des propositions d'améliorations des spécifications du protocole réseau de whisper et Swarm.
- [Interface](https://eips.ethereum.org/interface) : améliorations autour des spécifications et normes API/RPC des clients, et de certaines normes au niveau du langage comme les noms de méthodes et les ABI de contrats.
- [ERC](https://eips.ethereum.org/erc) : normes et conventions au niveau de l'application

Des informations plus détaillées sur ces différents types et catégories peuvent être trouvées dans l'[EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Normes de jetons {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Une interface standard pour les jetons fongibles (interchangeables), comme les jetons de vote, les jetons de staking ou les monnaies virtuelles.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Une norme de jetons fongibles qui fait en sorte que les jetons se comportent de manière identique à l'ether et prend en charge la gestion des transferts de jetons du côté des destinataires.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Une interface d'extension pour les jetons ERC-20 qui prend en charge l'exécution de rappels (callbacks) sur les contrats destinataires en une seule transaction.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Une interface standard pour les jetons non fongibles, comme un titre de propriété pour une œuvre d'art ou une chanson.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un événement standardisé émis lors de la création/du transfert d'un ou de plusieurs jetons non fongibles utilisant des identifiants de jetons consécutifs.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Extension d'interface pour le rôle de consommateur de l'EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Ajoute un rôle limité dans le temps avec des autorisations restreintes aux jetons ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NON RECOMMANDÉ)** Une norme de jeton améliorant l'ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Une norme de jeton qui peut contenir à la fois des actifs fongibles et non fongibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Une norme de coffre-fort tokenisé conçue pour optimiser et unifier les paramètres techniques des coffres-forts générateurs de rendement.

En savoir plus sur les [normes de jetons](/developers/docs/standards/tokens/).

## Complément d'information {#further-reading}

- [Propositions d'amélioration d'Ethereum (EIP)](/eips/)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_