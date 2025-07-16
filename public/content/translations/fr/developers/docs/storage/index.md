---
title: Stockage décentralisé
description: Présentation du stockage décentralisé et des outils disponibles à intégrer dans une dApp.
lang: fr
---

Contrairement à un serveur centralisé exploité par une entreprise ou organisation unique, les systèmes de stockage décentralisé se composent d'un réseau de pair à pair d'opérateurs-utilisateurs qui détiennent une partie de l'ensemble des données, créant ainsi un système de partage de fichiers résiliant. Cela peut être via une application basée sur la blockchain ou bien sur n'importe quel réseau basé sur le principe du pair à pair.

Ethereum lui-même peut être utilisé comme un système de stockage décentralisé, c'est d'ailleurs déjà le cas concernant le stockage de code compris dans tous les contrats intelligent. Cependant, lorsqu'il s'agit de grandes quantités de données, Ethereum n'a été conçu pour cela. La chaîne ne cesse de croître, mais au moment d'écrire ces lignes, la chaîne Ethereum est d'environ 500 Go à 1 To ([selon le client](https://etherscan.io/chartsync/chaindefault)), et chaque nœud du réseau doit être en mesure de stocker toutes les données. Si la chaîne devait s'étendre à de grandes quantités de données (disons 5 To par exemple), il serait impossible pour tous les nœuds de continuer à fonctionner. En outre, le coût du déploiement d'une telle quantité de données sur le réseau principal serait prohibitif en raison des frais de [gaz](/developers/docs/gas).

En raison de ces contraintes, nous avons besoin d'une chaîne ou d'une méthodologie différente pour stocker de grandes quantités de données de manière décentralisée.

En se penchant sur la question des options de stockage décentralisé (dStorage), il y a des choses qu'un utilisateur doit garder à l'esprit.

- Mécanisme de persistance / structure d'incitation
- Application de conservation des données
- Décentralisé
- Consensus

## Mécanisme de persistance / structure incitative {#persistence-mechanism}

### Orientation blockchain {#blockchain-based}

Pour qu'une donnée persiste indéfiniment, nous devons utiliser un mécanisme de persistance. Par exemple sur Ethereum, le mécanisme de persistance réside dans le fait que toute la chaîne doit être prise en compte lors de l'exécution d'un nœud. De nouvelles données sont traitées en bout de chaîne et elle ne cesse donc de croître, exigeant que chaque nœud reproduise toutes les données embarquées.

Ce processus est connu sous le nom de : persistance **basée sur la blockchain**.

Le problème avec la persistance basée sur la blockchain est que la chaîne pourrait devenir beaucoup trop grande pour entretenir et stocker toutes les données (ex. [de nombreuses sources](https://healthit.com.au/how-big-is-the-internet-and-how-do-we-measure-it/) estiment que l'Internet nécessite plus de 40 Zetabytes de capacité de stockage).

La blockchain doit également avoir une certaine structure incitative. Pour la persistance basée sur la blockchain, il y a un paiement effectué au validateur. Les validateurs sont payés pour ajouter les données lorsqu'elles sont ajoutées à la chaine.

Plateformes avec persistance basée sur la blockchain :

- Ethereum
- [Arweave](https://www.arweave.org/)

### Orientation contrat {#contract-based}

**La persistance orientée contrat** a l'intuition que les données ne peuvent pas être reproduites par chaque nœud et stockées pour toujours et au lieu de cela, il doit alors être gardé à jour avec des accords contractuels. Ce sont des accords conclus avec plusieurs nœuds qui promettent de conserver une partie de données pendant une certaine période. Ils doivent être remboursés ou renouvelés chaque fois qu'ils sont exécutés pour conserver les données.

Dans la plupart des cas, au lieu de stocker toutes les données en chaîne, le hachage de l'endroit où les données se trouvent sur une chaîne est stocké. Ainsi, l'ensemble de la chaîne n'a pas besoin d'évoluer pour conserver toutes les données.

Les plateformes avec persistance basée sur contrat :

- [Filecoin](https://docs.filecoin.io/about-filecoin/what-is-filecoin/)
- [Skynet](https://siasky.net/)
- [Storj](https://storj.io/)
- [Züs](https://zus.network/)
- [Réseau Crust](https://crust.network)
- [Swarm](https://www.ethswarm.org/)
- [4EVERLAND](https://www.4everland.org/)

### Autres considérations {#additional-consideration}

IPFS est un système distribué pour stocker et accéder aux fichiers, sites Web, applications et données. Il ne dispose pas d'un système d'incitation intégré, mais peut être utilisé avec n'importe quelle solution d'incitation orientée contrat ci-dessus pour une persistance à plus long terme. Une autre façon de maintenir les données sur IPFS est de travailler avec un service d'alerte, qui va « épingler » vos données pour vous. Vous pouvez même exécuter votre propre nœud IPFS et contribuer au réseau pour persister gratuitement vos données et/ou celles d'autres !

- [IPFS](https://docs.ipfs.io/concepts/what-is-ipfs/)
- [Pinata](https://www.pinata.cloud/) _(service d'épinglage IPFS)_
- [web3.storage](https://web3.storage/) _(service d'épinglage IPFS/Filecoin)_
- [Infura](https://infura.io/product/ipfs) _(service d'épinglage IPFS)_
- [IPFS Scan](https://ipfs-scan.io) _(explorateur IPFS pinning)_
- [4EVERLAND](https://www.4everland.org/)_ (service d'épinglage IPFS) _
- [Filebase](https://filebase.com) _(Service d'épinglage IPFS)_
- [Spheron Network](https://spheron.network/) _(service d'épinglage IPFS/Filecoin)_

SWARM est une technologie décentralisée de stockage et de distribution de données avec un système incitatif de stockage et un prix de location de stockage oracle.

## Conservation des données {#data-retention}

Afin de conserver des données, les systèmes doivent disposer d'une sorte de mécanisme pour s'assurer que les données sont bien conservées.

### Mécanisme de défi {#challenge-mechanism}

Un des moyens les plus populaires pour s'assurer que les données sont conservées, est d'utiliser un certain type de défi cryptographique à relever par les nœuds afin de s'assurer qu'ils disposent toujours des données. Un simple moyen est de regarder la preuve d'accès d'Arweav. Ils lancent un défi aux nœuds pour voir s'ils disposent des données du bloc le plus récent et d'un bloc aléatoire dans le passé. Si le nœud ne peut pas trouver la réponse, il est pénalisé.

Types de dStorage avec mécanisme de challenge :

- Züs
- Skynet
- Arweave
- Filecoin
- Réseau Crust
- 4EVERLAND

### Décentralisation {#decentrality}

Il n'existe pas de bons outils pour mesurer le niveau de décentralisation des plates-formes, mais en général, vous voudrez utiliser des outils qui n'ont pas une forme quelconque de KYC pour fournir des preuves qu'ils ne sont pas centralisés.

Outils décentralisés sans KYC :

- Skynet
- Arweave
- Filecoin
- IPFS
- Ethereum
- Réseau Crust
- 4EVERLAND

### Consensus {#consensus}

La plupart de ces outils ont leur propre version de [mécanisme de consensus](/developers/docs/consensus-mechanisms/) mais généralement ils sont basés soit sur une [**Preuve de travail (PoW)**](/developers/docs/consensus-mechanisms/pow/) soit sur une [**Preuve d'enjeu (PoS)**](/developers/docs/consensus-mechanisms/pos/).

Preuve de travail (PoW) :

- Skynet
- Arweave

Preuve d'enjeu (PoS) :

- Ethereum
- Filecoin
- Züs
- Réseau Crust

## Outils connexes {#related-tools}

**IPFS - _Le système de fichier InterPlanetary est un système de stockage décentralisé et de référencement de fichiers pour Ethereum_**

- [Ipfs.io](https://ipfs.io/)
- [Documentation](https://docs.ipfs.io/)
- [GitHub](https://github.com/ipfs/ipfs)

**Storj DCS - _Stockage décentralisé d'objet cloud sécurisé, privé et compatible S3 pour les développeurs._**

- [Storj.io](https://storj.io/)
- [Documentation](https://docs.storj.io/)
- [GitHub](https://github.com/storj/storj)

**Skynet - _Skynet est une chaîne PoW décentralisée dédiée à un Web décentralisé._**

- [Skynet.net](https://siasky.net/)
- [Documentation](https://siasky.net/docs/)
- [GitHub](https://github.com/SkynetLabs/)

**Filecoin - _Filecoin a été créé par la même équipe derrière IPFS. C'est une couche d'incitation au sommet des idéaux IPFS._**

- [Filecoin.io](https://filecoin.io/)
- [Documentation](https://docs.filecoin.io/)
- [GitHub](https://github.com/filecoin-project/)

**Arweave - _Arweave est une plateforme dStorage pour stocker des données._**

- [Arweave.org](https://www.arweave.org/)
- [Documentation](https://docs.arweave.org/info/)
- [Arweave](https://github.com/ArweaveTeam/arweave/)

**Züs - _Züs est une plateforme dStorage basée sur la Preuve d'enjeu avec des fragments et des blobbers._**

- [zus.network](https://zus.network/)
- [Documentation](https://0chaindocs.gitbook.io/zus-docs)
- [GitHub](https://github.com/0chain/)

**Réseau Crust - _Crust est une plateforme dStorage basée sur IPFS_**

- [Crust.network](https://crust.network)
- [Documentation](https://wiki.crust.network)
- [GitHub](https://github.com/crustio)

**Swarm - _Plateforme de stockage distribuée et service de distribution de contenu pour la pile web3 Ethereum_**

- [EthSwarm.org](https://www.ethswarm.org/)
- [Documentation](https://docs.ethswarm.org/docs/)
- [GitHub](https://github.com/ethersphere/)

**OrbitDB - _Base de données décentralisée P2P construite sur IPFS_**

- [OrbitDB.org](https://orbitdb.org/)
- [Documentation](https://github.com/orbitdb/field-manual/)
- [GitHub](https://github.com/orbitdb/orbit-db/)

**Aleph.im - _Projet cloud décentralisé (base de données, stockage de fichiers, calcul et DID). Un mélange unique de technologie hors chaîne et en chaîne P2P. Compatibilité avec IPFS et multi-chaînes._**

- [Aleph.im](https://aleph.im/)
- [Documentation](https://aleph.im/#/developers/)
- [GitHub](https://github.com/aleph-im/)

**Ceramic - _Stockage de base de données IPFS contrôlé par l'utilisateur pour des applications riches en données et engageantes._**

- [Ceramic.network](https://ceramic.network/)
- [Documentation](https://developers.ceramic.network/learn/welcome/)
- [GitHub](https://github.com/ceramicnetwork/js-ceramic/)

**File base - _Stockage décentralisé compatible S3 et service d'épinglage IPFS géo-redondant. Tous les fichiers téléchargés sur IPFS via Filebase sont automatiquement épinglés à l'infrastructure Filebase avec une réplication 3x à travers le monde._**

- [Filebase.com](https://filebase.com/)
- [Documentation](https://docs.filebase.com/)
- [GitHub](https://github.com/filebase)

**4EVERLAND - _Une plateforme de calcul cloud Web 3 qui intègre les capacités de stockage, de calcul et de réseautage de base, est compatible S3 et fournit un stockage de données synchronisé sur les réseaux de stockage décentralisés tels que IPFS et Arweave._**

- [4everland.org](https://www.4everland.org/)
- [Documentation](https://docs.4everland.org/)
- [GitHub](https://github.com/4everland)

**Kaleido - _Une plateforme blockchain-as-a-service avec un bouton clic IPFS Nodes_**

- [Kaleido](https://kaleido.io/)
- [Documentation](https://docs.kaleido.io/kaleido-services/ipfs/)
- [GitHub](https://github.com/kaleido-io)

**Spheron Network - _Spheron est une plateforme-en-tant-que-service (PaaS) conçue pour les dApps cherchant à lancer leurs applications sur un infra décentralisé avec les meilleures performances. Elle fournit des capacités de calcul, de stockage décentralisé, CDN & de l'hébergement web prêt à l'emploi._**

- [spheron.network](https://spheron.network/)
- [Documentation](https://docs.spheron.network/)
- [GitHub](https://github.com/spheronFdn)

## Complément d'information {#further-reading}

- [Qu'est-ce qu'un stockage décentralisé ?](https://coinmarketcap.com/alexandria/article/what-is-decentralized-storage-a-deep-dive-by-filecoin) - _CoinMarketCap_
- [Cinq mythes répandus à propos du stockage décentralisé](https://www.storj.io/blog/busting-five-common-myths-about-decentralized-storage) - _Storj_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Infrastructures de développement](/developers/docs/frameworks/)
