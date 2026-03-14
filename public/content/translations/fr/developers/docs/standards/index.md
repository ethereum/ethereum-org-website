---
title: "Normes de développement Ethereum"
description: "Découvrez les normes Ethereum, y compris les EIP, les normes de jetons comme ERC-20 et ERC-721, et les conventions de développement."
lang: fr
incomplete: true
---

## Aperçu des normes {#standards-overview}

La communauté Ethereum a adopté de nombreuses normes qui aident à maintenir l'interopérabilité des projets (tels que les [clients Ethereum](/developers/docs/nodes-and-clients/) et les portefeuilles) entre les implémentations, et à garantir que les contrats intelligents et les dapps restent composables.

Les normes sont généralement introduites en tant que [Propositions d'amélioration d'Ethereum](/eips/) (EIP), qui sont discutées par les membres de la communauté via un [processus standard](https://eips.ethereum.org/EIPS/eip-1).

- [Introduction aux EIP](/eips/)
- [Liste des EIP](https://eips.ethereum.org/)
- [Dépôt GitHub des EIP](https://github.com/ethereum/EIPs)
- [Forum de discussion sur les EIP](https://ethereum-magicians.org/c/eips)
- [Introduction à la gouvernance d'Ethereum](/governance/)
- [Aperçu de la gouvernance d'Ethereum](https://web.archive.org/web/20201107234050/https://blog.bmannconsulting.com/ethereum-governance/) _31 mars 2019 - Boris Mann_
- [Gouvernance du développement du protocole Ethereum et coordination de la mise à niveau du réseau](https://hudsonjameson.com/posts/2020-03-23-ethereum-protocol-development-governance-and-network-upgrade-coordination/) _23 mars 2020 - Hudson Jameson_
- [Playlist de toutes les réunions des développeurs principaux d'Ethereum](https://www.youtube.com/@EthereumProtocol) _(Playlist YouTube)_

## Types de normes {#types-of-standards}

Il existe trois types d'EIP :

- Suivi standard : décrit tout changement qui atteint la plupart ou toutes les implémentations d'Ethereum
- [Voie Méta](https://eips.ethereum.org/meta) : décrit un processus relatif à Ethereum ou propose une modification d'un processus
- [Voie informationnelle](https://eips.ethereum.org/informational) : décrit un problème de conception d'Ethereum ou fournit des directives générales ou des informations à la communauté Ethereum

De plus, le Standard Track est subdivisé en 4 catégories :

- [Cœur (Core)](https://eips.ethereum.org/core) : améliorations nécessitant une fourche (fork) de consensus
- [Réseau](https://eips.ethereum.org/networking) : améliorations concernant devp2p et le sous-protocole Light Ethereum, ainsi que les améliorations proposées aux spécifications du protocole de réseau de Whisper et Swarm.
- [Interface](https://eips.ethereum.org/interface) : améliorations des spécifications et des normes d'API/RPC du client, ainsi que de certaines normes au niveau du langage comme les noms de méthode et les ABI de contrat.
- [ERC](https://eips.ethereum.org/erc) : normes et conventions au niveau de l'application

Des informations plus détaillées sur ces différents types et catégories sont disponibles dans [EIP-1](https://eips.ethereum.org/EIPS/eip-1#eip-types)

### Normes de jetons {#token-standards}

- [ERC-20](/developers/docs/standards/tokens/erc-20/) - Une interface standard pour les jetons fongibles (interchangeables), comme les jetons de vote, les jetons de staking ou les monnaies virtuelles.
  - [ERC-223](/developers/docs/standards/tokens/erc-223/) - Une norme de jetons fongibles qui rend les jetons identiques à l'ether et prend en charge la gestion des transferts de jetons du côté des destinataires.
  - [ERC-1363](/developers/docs/standards/tokens/erc-1363/) - Une interface d'extension pour les jetons ERC-20 qui prend en charge l'exécution de rappels (callbacks) sur les contrats destinataires en une seule transaction.
- [ERC-721](/developers/docs/standards/tokens/erc-721/) - Une interface standard pour les jetons non fongibles (NFT), comme un titre de propriété pour une œuvre d'art ou une chanson.
  - [ERC-2309](https://eips.ethereum.org/EIPS/eip-2309) - Un événement normalisé émis lors de la création/du transfert d'un ou de plusieurs jetons non fongibles à l'aide d'identifiants de jetons consécutifs.
  - [ERC-4400](https://eips.ethereum.org/EIPS/eip-4400) - Extension d'interface pour le rôle de consommateur de l'EIP-721.
  - [ERC-4907](https://eips.ethereum.org/EIPS/eip-4907) - Ajoute un rôle à durée limitée avec des autorisations restreintes aux jetons ERC-721.
- [ERC-777](/developers/docs/standards/tokens/erc-777/) - **(NON RECOMMANDÉ)** Une norme de jeton qui améliore l'ERC-20.
- [ERC-1155](/developers/docs/standards/tokens/erc-1155/) - Une norme de jeton qui peut contenir à la fois des actifs fongibles et non fongibles.
- [ERC-4626](/developers/docs/standards/tokens/erc-4626/) - Une norme de coffre-fort tokenisé conçue pour optimiser et unifier les paramètres techniques des coffres-forts à rendement.

En savoir plus sur les [normes de jetons](/developers/docs/standards/tokens/).

## En savoir plus {#further-reading}

- [Propositions d'amélioration d'Ethereum (EIP)](/eips/)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
