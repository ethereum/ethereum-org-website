---
title: Le Portal Network
description: Un aperçu de Portal Network - un réseau en développement conçu pour soutenir les clients à faibles ressources.
lang: fr
---

Ethereum est un réseau composé d'ordinateurs qui exécutent le logiciel client Ethereum. Chacun de ces ordinateurs est appelé un 'nœud'. Le logiciel client permet à un nœud d'envoyer et de recevoir des données sur le réseau Ethereum et vérifie ces données selon les règles du protocole Ethereum. Les nœuds conservent beaucoup de données historiques dans leur stockage et en ajoutent lorsqu'ils reçoivent de nouveaux paquets d'informations, appelés blocs, venant d'autres nœuds du réseau. Cela est nécessaire pour toujours vérifier qu'un nœud a des informations cohérentes avec le reste du réseau. Cela signifie qu'exécuter un nœud peut nécessiter beaucoup d'espace disque. Certaines opérations du nœud peuvent également nécessiter beaucoup de RAM.

Pour contourner ce problème de stockage disque, des nœuds 'légers' ont été développés qui demandent des informations aux nœuds complets au lieu de tout stocker eux-mêmes. Cependant, cela signifie que le nœud léger ne vérifie pas l'information de manière indépendante et fait confiance à un autre nœud à la place. Cela signifie également que les nœuds complets doivent assumer un travail supplémentaire pour servir ces nœuds légers.

Le réseau Portal est une nouvelle conception de réseau pour Ethereum qui vise à résoudre le problème de disponibilité des données pour les nœuds « légers » sans avoir à faire confiance ou à mettre une pression supplémentaire sur les nœuds complets, en partageant les données nécessaires en petits morceaux à travers le réseau.

En savoir plus sur [les noeuds et les clients](/developers/docs/nodes-and-clients/)

## Pourquoi avons-nous besoin de Portal Network ? {#why-do-we-need-portal-network}

Les nœuds Ethereum stockent leur propre copie complète ou partielle de la blockchain Ethereum. Cette copie locale est utilisée pour valider les transactions et s'assurer que le nœud suit la chaîne correcte. Ces données stockées localement permettent aux nœuds de vérifier indépendamment que les données entrantes sont valides et correctes sans avoir à faire confiance à une autre entité.

Cette copie locale de la blockchain et des données associées, état et reçus, occupe beaucoup d'espace sur le disque dur du nœud. Par exemple, un disque dur de 2 To est recommandé pour exécuter un nœud en utilisant [Geth](https://geth.ethereum.org) associé à un client de consensus. En utilisant la synchronisation instantanée, qui ne stocke les données de la chaîne que d'un ensemble de blocs relativement récents, Geth occupe généralement environ 650 Go d'espace disque mais augmente d'environ 14 Go/semaine (vous pouvez élaguer le nœud pour le ramener à 650 Go périodiquement).

Cela signifie que le fonctionnement d'un nœud peut être coûteux, car une grande quantité d'espace disque doit être dédiée à Ethereum. Il existe plusieurs solutions à ce problème sur la feuille de route d'Ethereum, notamment [l'expiration de l'historique](/roadmap/statelessness/#history-expiry), [l'expiration de l'état](/roadmap/statelessness/#state-expiry) et [l'absence d'état](/roadmap/statelessness/). Cependant, ces solutions sont probablement encore à plusieurs années de leur mise en œuvre. Il existe également des [nœuds légers](/developers/docs/nodes-and-clients/light-clients/) qui ne sauvegardent pas leur propre copie des données de la chaîne, ils demandent les données dont ils ont besoin aux nœuds complets. Cependant, cela signifie que les nœuds légers doivent faire confiance aux nœuds complets pour fournir des données honnêtes et cela sollicite également les nœuds complets qui doivent fournir les données dont les nœuds légers ont besoin.

Le Portal Network vise à fournir une alternative pour que les nœuds légers obtiennent leurs données sans avoir à faire confiance ou à étoffer de manière significative le travail qui doit être effectué par les nœuds complets. La manière dont cela sera réalisé est d'introduire une nouvelle façon pour les nœuds Ethereum de partager des données à travers le réseau.

## Comment fonctionne le Portal Network ? {#how-does-portal-network-work}

Les nœuds Ethereum ont des protocoles stricts qui définissent comment ils communiquent entre eux. Les clients d'exécution communiquent à l'aide d'un ensemble de sous-protocoles connus sous le nom de [DevP2P](/developers/docs/networking-layer/#devp2p), tandis que les clients de consensus utilisent une autre pile de sous-protocoles appelée [libP2P](/developers/docs/networking-layer/#libp2p). Ces définitions déterminent les types de données qui peuvent être échangés entre les nœuds.

![devP2P et libP2P](portal-network-devp2p-libp2p.png)

Les nœuds peuvent également fournir des données spécifiques via l'[API JSON-RPC](/developers/docs/apis/json-rpc/), qui est la manière dont les applications et les portefeuilles échangent des informations avec les nœuds Ethereum. Cependant, aucun de ces protocoles n'est idéal pour fournir des données aux clients légers.

Les clients légers ne peuvent actuellement pas demander des morceaux spécifiques de données de chaîne via DevP2P ou libre car ces protocoles sont uniquement conçus pour permettre la synchronisation de la chaîne et la propagation des blocs et des transactions. Les clients légers ne souhaitent pas télécharger ces informations car cela les empêcherait d'être « légers ».

L'API JSON-RPC n'est pas non plus un choix idéal pour les demandes de données des clients légers, car elle repose sur une connexion à un nœud complet spécifique ou à un fournisseur RPC centralisé pouvant fournir les données. Cela signifie que le client léger doit faire confiance à ce nœud/fournisseur spécifique pour être honnête, et le nœud complet pourrait également devoir gérer de nombreuses demandes de la part de nombreux clients légers, augmentant ainsi leurs besoins en bande passante.

Le but du Portal Network est de repenser l'ensemble de la conception, en se construisant spécifiquement pour la légèreté, en dehors des contraintes de conception des clients Ethereum existants.

L'idée principale du Portal Network est de prendre les meilleurs éléments de la pile réseau actuelle en permettant aux clients légers d'obtenir les informations nécessaires, telles que les données historiques et l'identité de la tête actuelle de la chaîne, via un réseau décentralisé peer-to-peer léger de style DevP2P en utilisant une [DHT](https://en.wikipedia.org/wiki/Distributed_hash_table) (similaire à Bittorrent).

L'idée est d'ajouter de petites parties des données historiques totales d'Ethereum et certaines responsabilités spécifiques à chaque nœud. Ensuite, les demandes sont traitées en recherchant les nœuds stockant les données spécifiques demandées et en les récupérant directement auprès d'eux.

Cela inverse le modèle normal où les nœuds légers trouvent un seul nœud et lui demandent de filtrer et de servir de grands volumes de données ; à la place, ils filtrent rapidement un grand réseau de nœuds qui gèrent chacun de petites quantités de données.

L'objectif est de permettre à un réseau décentralisé de clients Portal légers de :

- suivre la tête de la chaîne
- synchroniser les données récentes et historiques de la chaîne
- récupérer les données d'état
- diffuser les transactions
- exécuter les transactions en utilisant [l'EVM](/developers/docs/evm/)

Les avantages de cette conception de réseau sont :

- réduire la dépendance vis-à-vis des fournisseurs centralisés
- réduire l'utilisation de la bande passante Internet
- synchronisation minimale ou nulle
- Accessible aux appareils à ressources limitées (<1 GB RAM, < 100 MB d'espace disque, 1 CPU)

Le diagramme ci-dessous montre les fonctions des clients existants qui peuvent être fournies par le Portal Network, permettant aux utilisateurs d'accéder à ces fonctions sur des appareils à très faibles ressources.

### Portal Networks

| Client léger de la chaîne phare | Réseau d'état                        | Commutation de transaction | Réseau d'historique |
| ------------------------------- | ------------------------------------ | -------------------------- | ------------------- |
| Chaîne phare légère             | Stockage des comptes et des contrats | Mempool légère             | En-têtes            |
| Données du protocole            |                                      |                            | Corps des blocs     |
|                                 |                                      |                            | Reçus               |

## Diversité des clients par défaut {#client-diversity-as-default}

Les développeurs du Portal Network ont également fait le choix de concevoir trois clients distincts du Portal Network dès le premier jour.

Les clients du Portal Network sont :

- [Trin](https://github.com/ethereum/trin) : écrit en Rust
- [Fluffy](https://nimbus.team/docs/fluffy.html) : écrit en Nim
- [Ultralight](https://github.com/ethereumjs/ultralight) : écrit en Typescript
- [Shisui](https://github.com/optimism-java/shisui) : écrit en Go

Avoir plusieurs implémentations de clients indépendants renforce la résilience et la décentralisation du réseau Ethereum.

Si un client rencontre des problèmes ou des vulnérabilités, d'autres clients peuvent continuer à fonctionner normalement, évitant ainsi un unique point de défaillance. De plus, différentes implémentations de clients encouragent l'innovation et la concurrence, stimulant les améliorations et réduisant le risque de monoculture au sein de l'écosystème.

## Complément d'information {#futher-reading}

- [Le Portal Network (Piper Merriam à Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA).
- [Le discord du Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Le site web de Portal Network](https://www.ethportal.net/)
