---
title: Le Portal Network
description: Un aperçu du Portal Network - un réseau en cours de développement conçu pour prendre en charge les clients disposant de peu de ressources.
lang: fr
---

[Ethereum](/) est un réseau composé d'ordinateurs qui exécutent un logiciel client Ethereum. Chacun de ces ordinateurs est appelé un « nœud ». Le logiciel client permet à un nœud d'envoyer et de recevoir des données sur le réseau Ethereum, et vérifie les données par rapport aux règles du protocole Ethereum. Les nœuds conservent beaucoup de données historiques sur leur espace de stockage et y ajoutent des éléments lorsqu'ils reçoivent de nouveaux paquets d'informations, appelés blocs, provenant d'autres nœuds du réseau. Cela est nécessaire pour toujours vérifier qu'un nœud dispose d'informations cohérentes avec le reste du réseau. Cela signifie que l'exécution d'un nœud peut nécessiter beaucoup d'espace disque. Certaines opérations de nœud peuvent également nécessiter beaucoup de mémoire vive (RAM).

Pour contourner ce problème de stockage sur disque, des nœuds « légers » ont été développés. Ils demandent des informations aux nœuds complets au lieu de tout stocker eux-mêmes. Cependant, cela signifie que le nœud léger ne vérifie pas les informations de manière indépendante et fait plutôt confiance à un autre nœud. Cela signifie également que les nœuds complets doivent assumer un travail supplémentaire pour servir ces nœuds légers.

Le Portal Network est une nouvelle conception de mise en réseau pour Ethereum qui vise à résoudre le problème de disponibilité des données pour les nœuds « légers » sans avoir à faire confiance ou à imposer une charge supplémentaire aux nœuds complets, en partageant les données nécessaires en petits morceaux à travers le réseau.

En savoir plus sur les [nœuds et clients](/developers/docs/nodes-and-clients/)

## Pourquoi avons-nous besoin du Portal Network ? {#why-do-we-need-portal-network}

Les nœuds Ethereum stockent leur propre copie complète ou partielle de la chaîne de blocs Ethereum. Cette copie locale est utilisée pour valider les transactions et s'assurer que le nœud suit la bonne chaîne. Ces données stockées localement permettent aux nœuds de vérifier indépendamment que les données entrantes sont valides et correctes sans avoir besoin de faire confiance à une autre entité.

Cette copie locale de la chaîne de blocs et les données d'état et de reçu associées prennent beaucoup de place sur le disque dur du nœud. Par exemple, un disque dur de 2 To est recommandé pour exécuter un nœud utilisant [Geth](https://geth.ethereum.org) couplé à un client de consensus. En utilisant la synchronisation instantanée (snap sync), qui ne stocke que les données de la chaîne à partir d'un ensemble de blocs relativement récent, Geth occupe généralement environ 650 Go d'espace disque, mais augmente d'environ 14 Go/semaine (vous pouvez élaguer le nœud pour le ramener à 650 Go périodiquement).

Cela signifie que l'exécution de nœuds peut être coûteuse, car une grande quantité d'espace disque doit être dédiée à Ethereum. Il existe plusieurs solutions à ce problème sur la feuille de route d'Ethereum, notamment l'[expiration de l'historique](/roadmap/statelessness/#history-expiry), l'[expiration d'état](/roadmap/statelessness/#state-expiry) et l'[absence d'état](/roadmap/statelessness/). Cependant, il faudra probablement plusieurs années avant qu'elles ne soient mises en œuvre. Il existe également des [nœuds légers](/developers/docs/nodes-and-clients/light-clients/) qui ne sauvegardent pas leur propre copie des données de la chaîne, ils demandent les données dont ils ont besoin aux nœuds complets. Cependant, cela signifie que les nœuds légers doivent faire confiance aux nœuds complets pour fournir des données honnêtes et cela sollicite également les nœuds complets qui doivent fournir les données dont les nœuds légers ont besoin.

Le Portal Network vise à fournir un moyen alternatif pour les nœuds légers d'obtenir leurs données qui ne nécessite pas de faire confiance ou d'ajouter de manière significative au travail qui doit être effectué par les nœuds complets. La façon dont cela sera fait est d'introduire une nouvelle façon pour les nœuds Ethereum de partager des données à travers le réseau.

## Comment fonctionne le Portal Network ? {#how-does-portal-network-work}

Les nœuds Ethereum ont des protocoles stricts qui définissent comment ils communiquent entre eux. Les clients d'exécution communiquent en utilisant un ensemble de sous-protocoles connus sous le nom de [devp2p](/developers/docs/networking-layer/#devp2p), tandis que les clients de consensus utilisent une pile différente de sous-protocoles appelée [libp2p](/developers/docs/networking-layer/#libp2p). Ceux-ci définissent les types de données qui peuvent être transmises entre les nœuds.

![devP2P and libP2P](portal-network-devp2p-libp2p.png)

Les nœuds peuvent également fournir des données spécifiques via l'[API JSON-RPC](/developers/docs/apis/json-rpc/), qui est la façon dont les applications et les portefeuilles échangent des informations avec les nœuds Ethereum. Cependant, aucun de ces protocoles n'est idéal pour fournir des données aux clients légers.

Les clients légers ne peuvent actuellement pas demander des éléments spécifiques de données de la chaîne via devp2p ou libp2p car ces protocoles sont uniquement conçus pour permettre la synchronisation de la chaîne et la diffusion des blocs et des transactions. Les clients légers ne veulent pas télécharger ces informations car cela les empêcherait d'être « légers ».

L'API JSON-RPC n'est pas non plus un choix idéal pour les demandes de données des clients légers, car elle repose sur une connexion à un nœud complet spécifique ou à un fournisseur RPC centralisé qui peut fournir les données. Cela signifie que le client léger doit faire confiance à ce nœud/fournisseur spécifique pour être honnête, et aussi que le nœud complet pourrait avoir à gérer de nombreuses requêtes provenant de nombreux clients légers, ce qui augmente ses besoins en bande passante.

L'objectif du Portal Network est de repenser l'ensemble de la conception, en construisant spécifiquement pour la légèreté, en dehors des contraintes de conception des clients Ethereum existants.

L'idée centrale du Portal Network est de prendre les meilleurs éléments de la pile réseau actuelle en permettant aux informations nécessaires aux clients légers, telles que les données historiques et l'identité de la tête actuelle de la chaîne, d'être fournies via un réseau décentralisé pair à pair léger de style devp2p utilisant une [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (similaire à BitTorrent).

L'idée est d'ajouter de petites parties du total des données historiques d'Ethereum et certaines responsabilités spécifiques de nœud à chaque nœud. Ensuite, les requêtes sont traitées en recherchant les nœuds stockant les données spécifiques qui ont été demandées et en les récupérant auprès d'eux.

Cela inverse le modèle normal des nœuds légers qui trouvent un seul nœud et lui demandent de filtrer et de fournir de grands volumes de données ; au lieu de cela, ils filtrent rapidement un grand réseau de nœuds qui gèrent chacun de petites quantités de données.

L'objectif est de permettre à un réseau décentralisé de clients Portal légers de :

- suivre la tête de la chaîne
- synchroniser les données récentes et historiques de la chaîne
- récupérer les données d'état
- diffuser les transactions
- exécuter des transactions en utilisant l'[EVM](/developers/docs/evm/)

Les avantages de cette conception de réseau sont :

- réduire la dépendance aux fournisseurs centralisés
- Réduire l'utilisation de la bande passante Internet
- Synchronisation minimisée ou nulle
- Accessible aux appareils aux ressources limitées (\<1 Go de RAM, \<100 Mo d'espace disque, 1 processeur)

Le tableau ci-dessous montre les fonctions des clients existants qui peuvent être fournies par le Portal Network, permettant aux utilisateurs d'accéder à ces fonctions sur des appareils à très faibles ressources.

### Les réseaux Portal {#the-portal-networks}

| Client léger Beacon | Réseau d'état                | Diffusion des transactions | Réseau d'historique | Indice canonique des Tx |
| ------------------- | ---------------------------- | -------------------------- | ------------------- | ----------------------- |
| Chaîne Beacon légère| Stockage de compte et contrat| Mempool léger              | En-têtes            | TxHash > Hash, Indice   |
| Données de protocole|                              |                            | Corps de blocs      |                         |
|                     |                              |                            | Reçus               |                         |

## Diversité des clients par défaut {#client-diversity-as-default}

Les développeurs du Portal Network ont également fait le choix de conception de construire quatre clients Portal Network distincts dès le premier jour.

Les clients du Portal Network sont :

- [Trin](https://github.com/ethereum/trin) : écrit en Rust
- [Fluffy](https://fluffy.guide) : écrit en Nim
- [Ultralight](https://github.com/ethereumjs/ultralight) : écrit en TypeScript
- [Shisui](https://github.com/zen-eth/shisui) : écrit en Go

Avoir plusieurs implémentations de clients indépendantes améliore la résilience et la décentralisation du réseau Ethereum.

Si un client rencontre des problèmes ou des vulnérabilités, les autres clients peuvent continuer à fonctionner correctement, évitant ainsi un point de défaillance unique. De plus, la diversité des implémentations de clients favorise l'innovation et la concurrence, stimulant les améliorations et réduisant le risque de monoculture au sein de l'écosystème.

## Complément d'information {#further-reading}

- [Le Portal Network (Piper Merriam à la Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Le Discord du Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Le site web du Portal Network](https://www.ethportal.net/)