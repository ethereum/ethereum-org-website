---
title: Nœuds en tant que service
description: Présentation de base des services de nœuds, de leurs avantages et inconvénients, et des fournisseurs les plus populaires.
lang: fr
sidebarDepth: 2
---

## Introduction {#Introduction}

Exécuter votre propre [nœud Ethereum](/developers/docs/nodes-and-clients/#what-are-nodes-and-clients) peut être difficile, en particulier lorsque vous démarrez ou lors d'une croissance rapide. Il existe un certain [nombre de services](#popular-node-services) qui exécutent des infrastructures de nœuds optimisées pour vous, afin que vous puissiez vous concentrer sur le développement de votre application ou de votre produit. Nous vous expliquerons le fonctionnement des services de nœuds, les avantages et les inconvénients de leur utilisation et vous fournirons une liste de fournisseurs si vous souhaitez vous lancer.

## Pré-requis {#prerequisites}

Si vous ne savez pas encore ce que sont les nœuds et les clients, consultez la page [Nœuds et clients](/developers/docs/nodes-and-clients/).

## Comment fonctionnent les services de nœuds? {#how-do-node-services-work}

Les fournisseurs de services de nœuds exécutent les clients de nœuds distribués en arrière-plan pour vous, afin que vous n'ayez pas à le faire.

Ces services fournissent généralement une clé API que vous pouvez utiliser pour écrire sur la blockchain et pour la lire. Ils incluent souvent un accès aux [réseaux de test Ethereum](/developers/docs/networks/#testnets) en plus du réseau principal.

Certains services vous offrent votre propre nœud dédié qu'ils gèrent pour vous, tandis que d'autres utilisent des équilibreurs de charge pour répartir l'activité entre les nœuds.

Presque tous les services de nœuds sont extrêmement faciles à intégrer, impliquant des modifications d'une ligne dans votre code pour échanger votre nœud auto-hébergé, ou même pour passer d'un service à l'autre.

Souvent, les services de nœuds exécuteront une variété de [nœuds clients](/developers/docs/nodes-and-clients/#execution-clients) et de [types](/developers/docs/nodes-and-clients/#node-types), vous permettant d'accéder aux nœuds complets et d'archives en plus des méthodes spécifiques au client dans une API.

Il est important de noter que les services de nœud ne stockent pas et ne doivent pas stocker vos clés ou informations privées.

## Quels avantages à utiliser un service de nœuds ? {#benefits-of-using-a-node-service}

Le principal avantage est de ne pas avoir à consacrer du temps à la maintenance et à la gestion des nœuds. Cela vous permet donc de vous concentrer sur la construction de votre produit plutôt que d'avoir à vous soucier de la maintenance des infrastructures.

L'exécution de vos propres nœuds peut s'avérer très coûteuse, qu'il s'agisse de stockage, de bande passante ou de temps d'ingénierie. Des opérations telles que l'augmentation du nombre de nœuds lors de la montée en charge, de la mise à niveau des nœuds vers les dernières versions ou la garantie de la cohérence de l'état peuvent vous détourner de votre projet web3 et consommer de précieuses ressources.

## Quels inconvénients à utiliser un service de nœuds ? {#cons-of-using-a-node-service}

En utilisant un service de nœuds, vous centralisez l'aspect infrastructure de votre produit. C'est pourquoi les projets qui accordent la plus haute importance à la décentralisation pourraient préférer des nœuds auto-hébergés plutôt que des nœuds d'origine externe.

En savoir plus sur les [avantages à exécuter votre propre nœud](/developers/docs/nodes-and-clients/#benefits-to-you).

## Services de nœuds populaires {#popular-node-services}

Voici une liste des fournisseurs de nœuds Ethereum les plus populaires. N'hésitez pas à ajouter ceux qui sont manquants ! Chaque service de nœuds offre différents avantages et fonctionnalités en plus des niveaux gratuits ou payants, vous devez déterminer ceux qui correspondent le mieux à vos besoins avant de prendre une décision.

- [**Alchemy**](https://www.alchemy.com/)
  - [Documentation](https://docs.alchemyapi.io/)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
    - Données d'archivage gratuites
    - Outils d'analyse
    - Tableau de bord
    - Points de terminaison d'API uniques
    - lien de rappel
    - Assistance directe
- [**Ankr**](https://www.ankr.com/)
  - [Documentation](https://docs.ankr.com/)
  - Fonctionnalités
    - Protocole Ankr : accès ouvert aux points de terminaison d'API RPC publiques pour plus de 8 chaînes
    - Équilibrage de charge et surveillance des nœuds pour une passerelle rapide et fiable vers le nœud disponible le plus proche
    - Niveau Premium activant le point de terminaison WSS et la limite de débit non plafonnée
    - Déploiement d'un nœud complet en un clic et d'un noeud de validateur pour plus de 40 chaînes
    - Mise à l'échelle progressive
    - Outils d'analyse
    - Tableau de bord
    - Points de terminaison WSS, HTTPS et RPC
    - Assistance directe
- [**BlockDaemon**](https://blockdaemon.com/)
  - [Documentation](https://ubiquity.docs.blockdaemon.com/)
  - Avantages
    - Tableau de bord
    - Base par nœud
    - Analyses
- [**Chainstack**](https://chainstack.com/)
  - [Documentation](https://docs.chainstack.com/)
  - Fonctionnalités
    - Nœuds partagés gratuits
    - Nœuds d'archives partagés
    - Prise en charge de GraphQL
    - RPC et points de terminaison WSS
    - Nœuds dédiés complets et archivés
    - Temps de synchronisation rapide pour les déploiements dédiés
    - Apportez votre cloud
    - Tarification à l'heure
    - Assistance directe 24/7
- [**GetBlock**](https://getblock.io/)
  - [Documentation](https://getblock.io/docs/get-started/authentication-with-api-key/)
  - Fonctionnalités
    - Accès à plus de 40 nœuds blockchain
    - 40 000 requettes quotidiennes gratuites
    - Nombre illimité de clés API
    - Vitesse de connexion élevée à 1Go/sec
    - Trace+Archive
    - Analyses avancées
    - Mises à jour automatisées
    - Support technique
- [**InfStones**](https://infstones.com/)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
    - Analyses
    - Tableau de bord
    - Points de terminaison d'API uniques
    - Nœuds complets dédiés
    - Temps de synchronisation rapide pour les déploiements dédiés
    - Assistance directe 24/7
    - Accès à plus de 50 nœuds blockchain
- [**Infura**](https://infura.io/)
  - [Documentation](https://infura.io/docs)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
    - Données d'archivage gratuites
    - Assistance directe
    - Tableau de bord
- [**Kaleido**](https://kaleido.io/)
  - [Documentation](https://docs.kaleido.io/)
  - Fonctionnalités
    - Offre de démarrage gratuite
    - Déploiement d'un nœud Ethereum en un clic
    - Clients et algorithmes personnalisables (Geth, Quorum & Besu || PoA, IBFT & Raft)
    - Plus de 500 API d'administration et de service
    - Interface REST destinée à soumettre des transactions Ethereum (avec Apache Kafka)
    - Flux d'événements sortants (avec Apache Kafka)
    - Vaste catalogue des services "hors chaîne" et auxiliaires (ex : transport bilatéral de messages chiffrés)
    - Intégration simple au réseau avec gouvernance et contrôle d'accès basé sur les rôles
    - Gestion des utilisateurs sophistiquée pour les administrateurs et les utilisateurs finaux
    - Infrastructure hautement évolutive, résiliente et de qualité professionnelle
    - Gestion de clé privée dans le Cloud HSM
    - Partage du réseau principal d'Ethereum
    - Certifications de type 2 pour ISO 27k et SOC 2
    - Configuration dynamique en cours d'exécution (par exemple ajout d'intégrations dans le cloud, modification des entrées d'un nœud, etc.)
    - Prise en charge des orchestrations de déploiement multi-cloud, multi-région et hybride
    - Tarification à l'heure basée sur le modèle SaaS
    - SLAs et support 24x7
- [**Moralis**](https://moralis.io/)
  - [Documentation](https://docs.moralis.io/)
  - Fonctionnalités
    - Nœuds partagés gratuits
    - Nœuds d'archives partagés gratuits
    - Protection de la vie privée (aucune politique de log)
    - Support de chaîne croisée
    - Mise à l'échelle progressive
    - Tableau de bord
    - SDK Ethereum unique
    - Points de terminaison d'API uniques
    - Assistance technique directe
- [**Pocket Network**](https://www.pokt.network/)
  - [Documentation](https://docs.pokt.network/home/)
  - Fonctionnalités
    - Protocole RPC décentralisé et marché
    - 1M gratuit de requettes par jour (par point de terminaison, max 2)
    - [Points de terminaison publics](https://docs.pokt.network/home/resources/public-rpc-endpoints)
    - Programme Pre-Stake+ (si vous avez besoin de plus de 1 million de requettes par jour)
    - Plus de 15 blockchains pris en charge
    - Plus de 6 400 nœuds POKT gagnés pour les applications en service
    - Nœud d'archivage, nœud d'archivage avec tracage et assistance pour nœuds Testnet
    - Diversité du client du noeud principal Ethereum
    - Aucun point unique d'échec
    - Aucun temps d'arrêt
    - Tokenomics rentables et proches de zéro (mise POKT une fois pour la bande passante)
    - Aucun coût irrécupérable mensuel, transformez votre infrastructure en un actif
    - Équilibrage de charge intégré dans le protocole
    - Échelle infinie du nombre de requêtes par jour et de nœuds par heure
    - L'option la plus privée et la plus résistante à la censure
    - Support pratique pour les développeurs
    - Tableau de bord et outils d'analyse [Pocket Portal](https://bit.ly/ETHorg_POKTportal)
- [**QuikNode**](https://www.quiknode.io/)
  - Fonctionnalités
    - 7 jours d’essai gratuit
    - Assistance variée
    - lien de rappel
    - Tableau de bord
    - Analyses
- [**Rivet**](https://rivet.cloud/)
  - [Documentation](https://rivet.readthedocs.io/en/latest/)
  - Fonctionnalités
    - Option de niveau gratuit
    - Mise à l'échelle progressive
- [**SettleMint**](https://console.settlemint.com/)
  - [Documentation](https://docs.settlemint.com/)
  - Fonctionnalités
    - Essai gratuit
    - Mise à l'échelle progressive
    - Prise en charge de GraphQL
    - RPC et points de terminaison WSS
    - Nœuds complets dédiés
    - Apportez votre cloud
    - Outils d'analyse
    - Tableau de bord
    - Tarification à l'heure
    - Assistance directe
- [**Watchdata**](https://watchdata.io/)
  - [Documentation](https://docs.watchdata.io/)
  - Fonctionnalités
    - Fiabilité des données
    - Connexion continue sans temps d'arrêt
    - Automatisation des processus
    - Gratuité des tarifs
    - Limites élevées convenant à tout utilisateur
    - Prise en charge de différents nœuds
    - Montée en charge des ressources
    - Vitesse de traitement élevée

## Complément d'information {#further-reading}

- [Liste des services de nœuds Ethereum](https://ethereumnodes.com/)

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)

## Tutoriels connexes {#related-tutorials}

- [Commencer le développement Ethereum avec Alchemy](/developers/tutorials/getting-started-with-ethereum-development-using-alchemy/)
- [Guide pour envoyer des transactions avec Web3 et Alchemy](/developers/tutorials/sending-transactions-using-web3-and-alchemy/)
