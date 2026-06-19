---
title: Stockage décentralisé
description: Aperçu de ce qu'est le stockage décentralisé et des outils disponibles pour l'intégrer dans une application décentralisée (dapp).
lang: fr
authors: ["Patrick Collins"]
---

Contrairement à un serveur centralisé exploité par une seule entreprise ou organisation, les systèmes de stockage décentralisés se composent d'un réseau pair à pair d'utilisateurs-opérateurs qui détiennent une partie des données globales, créant ainsi un système de partage de stockage de fichiers résilient. Ceux-ci peuvent se trouver dans une application basée sur une chaîne de blocs ou dans tout réseau basé sur le pair à pair.

Ethereum lui-même peut être utilisé comme un système de stockage décentralisé, et c'est le cas lorsqu'il s'agit du stockage de code dans tous les contrats intelligents. Cependant, lorsqu'il s'agit de grandes quantités de données, ce n'est pas ce pour quoi Ethereum a été conçu. La chaîne croît régulièrement, mais au moment de la rédaction, la chaîne Ethereum fait environ 500 Go - 1 To ([selon le client](https://etherscan.io/chartsync/chaindefault)), et chaque nœud du réseau doit être capable de stocker toutes les données. Si la chaîne devait s'étendre à de grandes quantités de données (disons 5 To), il ne serait pas faisable pour tous les nœuds de continuer à fonctionner. De plus, le coût de déploiement d'une telle quantité de données sur le Réseau principal serait prohibitif en raison des frais de [gaz](/developers/docs/gas).

En raison de ces contraintes, nous avons besoin d'une chaîne ou d'une méthodologie différente pour stocker de grandes quantités de données de manière décentralisée.

Lors de l'examen des options de stockage décentralisé (dStorage), il y a quelques éléments qu'un utilisateur doit garder à l'esprit.

- Mécanisme de persistance / structure d'incitation
- Application de la conservation des données
- Décentralisation
- Consensus

## Mécanisme de persistance / structure d'incitation {#persistence-mechanism}

### Basé sur une chaîne de blocs {#blockchain-based}

Pour qu'une donnée persiste pour toujours, nous devons utiliser un mécanisme de persistance. Par exemple, sur Ethereum, le mécanisme de persistance est que l'ensemble de la chaîne doit être pris en compte lors de l'exécution d'un nœud. De nouvelles données sont ajoutées à la fin de la chaîne, et celle-ci continue de croître - obligeant chaque nœud à répliquer toutes les données intégrées.

C'est ce qu'on appelle la persistance **basée sur une chaîne de blocs**.

Le problème avec la persistance basée sur une chaîne de blocs est que la chaîne pourrait devenir beaucoup trop grande pour entretenir et stocker toutes les données de manière réalisable (par exemple, [de nombreuses sources](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estiment que l'Internet nécessite plus de 40 zettaoctets de capacité de stockage).

La chaîne de blocs doit également avoir un certain type de structure d'incitation. Pour la persistance basée sur une chaîne de blocs, un paiement est effectué au validateur. Lorsque les données sont ajoutées à la chaîne, les validateurs sont payés pour y ajouter les données.

Plateformes avec persistance basée sur une chaîne de blocs :

- Ethereum
- [Arweave](https://www.arweave.org/)

### Basé sur des contrats {#contract-based}

La persistance **basée sur des contrats** part du principe que les données ne peuvent pas être répliquées par chaque nœud et stockées pour toujours, et doivent plutôt être entretenues par des accords contractuels. Ce sont des accords conclus avec plusieurs nœuds qui ont promis de conserver une donnée pendant une certaine période. Ils doivent être remboursés ou renouvelés à chaque fois qu'ils expirent pour que les données continuent de persister.

Dans la plupart des cas, au lieu de stocker toutes les données onchain, le hash de l'emplacement des données sur une chaîne est stocké. De cette façon, la chaîne entière n'a pas besoin d'évoluer pour conserver toutes les données.

Plateformes avec persistance basée sur des contrats :

- [Filecoin](https://docs.filecoin.io/basics/what-is-filecoin)
- [Skynet](https://sia.tech/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Crust Network](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Considérations supplémentaires {#additional-consideration}

IPFS est un système distribué pour stocker et accéder à des fichiers, des sites web, des applications et des données. Il n'a pas de système d'incitation intégré, mais peut plutôt être utilisé avec n'importe laquelle des solutions d'incitation basées sur des contrats ci-dessus pour une persistance à plus long terme. Une autre façon de faire persister des données sur IPFS est de travailler avec un service d'épinglage (pinning), qui « épinglera » vos données pour vous. Vous pouvez même exécuter votre propre nœud IPFS et contribuer au réseau pour faire persister vos données et/ou celles des autres gratuitement !

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(Service d'épinglage IPFS)_
- [web3.storage](https://web3.storage/) _(Service d'épinglage IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(Service d'épinglage IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(Explorateur d'épinglage IPFS)_
- [4EVERLAND](https://www.4everland.org/)_（Service d'épinglage IPFS）_
- [Filebase](https://filebase.com) _(Service d'épinglage IPFS)_
- [Spheron Network](https://spheron.network/) _(Service d'épinglage IPFS/Filecoin)_

Swarm est une technologie de stockage et de distribution de données décentralisée avec un système d'incitation au stockage et un oracle de prix de location de stockage.

## Conservation des données {#data-retention}

Afin de conserver les données, les systèmes doivent disposer d'une sorte de mécanisme pour s'assurer que les données sont bien conservées.

### Mécanisme de défi {#challenge-mechanism}

L'un des moyens les plus populaires de s'assurer que les données sont conservées est d'utiliser un certain type de défi cryptographique qui est lancé aux nœuds pour s'assurer qu'ils ont toujours les données. Un exemple simple est la preuve d'accès (proof-of-access) d'Arweave. Ils lancent un défi aux nœuds pour voir s'ils ont les données à la fois au bloc le plus récent et à un bloc aléatoire dans le passé. Si le nœud ne peut pas fournir la réponse, il est pénalisé.

Types de dStorage avec un mécanisme de défi :

- Züs
- Skynet
- Arweave
- Filecoin
- Crust Network
- 4EVERLAND

### Décentralisation {#decentrality}

Il n'y a pas d'excellents outils pour mesurer le niveau de décentralisation des plateformes, mais en général, vous voudrez utiliser des outils qui n'ont pas une certaine forme de KYC pour prouver qu'ils ne sont pas centralisés.

Outils décentralisés sans KYC :

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Crust Network
- 4EVERLAND

### Consensus {#consensus}

La plupart de ces outils ont leur propre version d'un [mécanisme de consensus](/developers/docs/consensus-mechanisms/) mais généralement ils sont basés soit sur la [**preuve de travail (PoW)**](/developers/docs/consensus-mechanisms/pow/) soit sur la [**preuve d'enjeu (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Basé sur la preuve de travail :

- Skynet
- Arweave

Basé sur la preuve d'enjeu :

- Ethereum
- Filecoin
- Züs
- Crust Network

## Outils connexes {#related-tools}

**IPFS - _InterPlanetary File System est un système de stockage décentralisé et de référencement de fichiers pour Ethereum._**

- [Ipfs.io](https://ipfs.io/)
- [Documentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Stockage d'objets cloud décentralisé sécurisé, privé et compatible S3 pour les développeurs._**

- [Storj.io](https://storj.io/)
- [Documentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Sia - _Exploite la cryptographie pour créer une place de marché de stockage cloud sans tiers de confiance, permettant aux acheteurs et aux vendeurs de transiger directement._**

- [Skynet.net](https://sia.tech/)
- [Documentation](https://docs.sia.tech/)
- [GitHub](https://github.com/SiaFoundation/)

**Filecoin - _Filecoin a été créé par la même équipe derrière IPFS. C'est une couche d'incitation au-dessus des idéaux d'IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave est une plateforme dStorage pour le stockage de données._**

- [Arweave.org](https://www.arweave.org/)
- [Documentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs est une plateforme dStorage à preuve d'enjeu (PoS) avec des fragments (sharding) et des blobbers._**

- [zus.network](https://zus.network/)
- [Documentation](https://docs.zus.network/zus-docs/)
- [GitHub](https://github.com/0chain/)

**Crust Network - _Crust est une plateforme dStorage au-dessus d'IPFS._**

- [Crust.network](https://crust.network)
- [Documentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Une plateforme de stockage distribué et un service de distribution de contenu pour la pile Web3 d'Ethereum._**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentation](https://docs.ethswarm.org/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Une base de données décentralisée pair à pair au-dessus d'IPFS._**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Projet cloud décentralisé (base de données, stockage de fichiers, calcul et identité décentralisée (DID)). Un mélange unique de technologie pair à pair hors chaîne et onchain. Compatibilité IPFS et multi-chaînes._**

- [Aleph.im](https://aleph.cloud/)
- [Documentation](https://docs.aleph.cloud/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Stockage de base de données IPFS contrôlé par l'utilisateur pour des applications riches en données et engageantes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentation](https://developers.ceramic.network/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**Filebase - _Stockage décentralisé compatible S3 et service d'épinglage IPFS géo-redondant. Tous les fichiers téléchargés sur IPFS via Filebase sont automatiquement épinglés à l'infrastructure Filebase avec une réplication 3x à travers le monde._**

- [Filebase.com](https://filebase.com/)
- [Documentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Une plateforme de cloud computing Web 3.0 qui intègre des capacités de base de stockage, de calcul et de réseau, est compatible S3 et fournit un stockage de données synchrone sur des réseaux de stockage décentralisés tels qu'IPFS et Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Une plateforme de chaîne de blocs en tant que service (BaaS) avec des nœuds IPFS en un clic_**

- [Kaleido](https://kaleido.io/)
- [Documentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron est une plateforme en tant que service (PaaS) conçue pour les applications décentralisées (dapps) cherchant à lancer leurs applications sur une infrastructure décentralisée avec les meilleures performances. Elle fournit du calcul, du stockage décentralisé, un CDN et un hébergement web par défaut._**

- [spheron.network](https://spheron.network/)
- [Documentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

**dweb3 - _Résolveur pour les pages web décentralisées, similaire à eth.limo, prenant en charge tous les types et non limité à ENS et IPFS._**

- [dweb3.wtf](https://dweb3.wtf)

**web3compass - _Moteur de recherche pour les sites web décentralisés soutenus par IPFS + ENS._**

- [web3compass.net](https://www.web3compass.net/)
- [Documentation](https://www.web3compass.net/statistics)

## Complément d'information {#further-reading}

- [Qu'est-ce que le stockage décentralisé ?](https://coinmarketcap.com/academy/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Démystifier cinq mythes courants sur le stockage décentralisé](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Cadres de développement](/developers/docs/frameworks/)