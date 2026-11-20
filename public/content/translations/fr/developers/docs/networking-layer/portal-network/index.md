---
title: Le Portal Network
description: "Un aperçu du Portal Network, un réseau pair à pair qui maintient l'historique d'Ethereum disponible alors que les clients cessent de le stocker dans son intégralité."
lang: fr
---

[Ethereum](/) est un réseau composé d'ordinateurs qui exécutent un logiciel client Ethereum. Chacun de ces ordinateurs est appelé un « nœud ». Le logiciel client permet à un nœud d'envoyer et de recevoir des données sur le réseau Ethereum, et vérifie les données par rapport aux règles du protocole Ethereum. Les nœuds conservent beaucoup de données historiques dans leur espace de stockage et y ajoutent des éléments lorsqu'ils reçoivent de nouveaux paquets d'informations, appelés blocs, provenant d'autres nœuds du réseau. Cela est nécessaire pour toujours vérifier qu'un nœud dispose d'informations cohérentes avec le reste du réseau. Cela signifie que l'exécution d'un nœud peut nécessiter beaucoup d'espace disque. Certaines opérations de nœud peuvent également nécessiter beaucoup de mémoire vive (RAM).

Les clients d'exécution n'ont plus besoin de conserver toutes ces données. Depuis juillet 2025, ils peuvent supprimer les corps et les reçus des blocs antérieurs à [La Fusion](/roadmap/merge/), et la feuille de route d'Ethereum prévoit de supprimer davantage de l'historique de la chaîne au fil du temps. Cet historique doit tout de même rester disponible pour quiconque en a besoin, comme les explorateurs de blocs, les indexeurs ou un portefeuille recherchant une ancienne transaction.

Le Portal Network maintient cet historique disponible en le partageant en petits morceaux sur de nombreux nœuds. Aucun nœud n'a besoin de tout stocker, et un nœud peut récupérer n'importe quel morceau et le vérifier par rapport aux données qu'il détient déjà, sans faire confiance au nœud qui l'a envoyé.

En savoir plus sur les [nœuds et clients](/developers/docs/nodes-and-clients/)

## Pourquoi avons-nous besoin du Portal Network {#why-do-we-need-portal-network}

Les nœuds Ethereum stockent leur propre copie complète ou partielle de la chaîne de blocs Ethereum. Cette copie locale est utilisée pour valider les transactions et s'assurer que le nœud suit la bonne chaîne. Ces données stockées localement permettent aux nœuds de vérifier indépendamment que les données entrantes sont valides et correctes sans avoir besoin de faire confiance à une autre entité.

Cette copie locale de la chaîne de blocs et des données d'état et de reçu associées prend beaucoup de place sur le disque dur du nœud. Par exemple, un SSD de 4 To est recommandé pour exécuter un nœud utilisant [Geth](https://geth.ethereum.org) couplé à un client de consensus. Avec l'historique complet de la chaîne, Geth occupe plus de 1,8 To d'espace disque (en date de septembre 2026), et cela continue de croître avec la chaîne.

Cela signifie que l'exécution de nœuds peut être coûteuse, car une grande quantité d'espace disque doit être dédiée à Ethereum. L'[expiration de l'historique](/roadmap/statelessness/#history-expiry) réduit cela en permettant aux clients de supprimer les anciennes données de bloc dont ils n'ont pas besoin pour suivre la chaîne : depuis l'[expiration partielle de l'historique](https://blog.ethereum.org/2025/07/08/partial-history-exp) en juillet 2025, les clients d'exécution peuvent supprimer les corps et les reçus de chaque bloc antérieur à La Fusion. L'[expiration d'état](/roadmap/statelessness/#state-expiry) et l'[absence d'état](/roadmap/statelessness/) sont d'autres solutions qui font encore l'objet de recherches.

Une fois que les nœuds cessent de stocker l'ancien historique, ils ne peuvent plus le fournir aux autres. Les archives, les torrents et les fournisseurs en conservent des copies ; le Portal Network le répartit sur de nombreux nœuds, de sorte qu'il reste disponible sans dépendre d'aucun d'entre eux.

## Comment fonctionne le Portal Network ? {#how-does-portal-network-work}

Les nœuds Ethereum ont des protocoles stricts qui définissent comment ils communiquent entre eux. Les clients d'exécution communiquent en utilisant un ensemble de sous-protocoles connus sous le nom de [devp2p](/developers/docs/networking-layer/#devp2p), tandis que les clients de consensus utilisent une pile différente de sous-protocoles appelée [libp2p](/developers/docs/networking-layer/#libp2p). devp2p permet à un nœud de demander des corps de blocs et des reçus à ses pairs, mais un pair qui a supprimé l'ancien historique ne peut pas le fournir. Les applications et les portefeuilles peuvent également obtenir des données d'un nœud via l'[interface de programmation d'application (API) JSON-RPC](/developers/docs/apis/json-rpc/), mais cela repose sur le fait qu'un seul nœud ou fournisseur stocke les données et qu'on lui fasse confiance pour être honnête.

Le Portal Network est un réseau pair à pair distinct conçu pour partager l'historique. Il fonctionne sur [discv5](https://github.com/ethereum/devp2p/blob/master/discv5/discv5.md), le protocole de découverte de nœuds que les clients de consensus utilisent également pour trouver des pairs, et organise ses nœuds sous forme de [table de hash distribuée (DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table), similaire à celle de BitTorrent. Chaque nœud a un identifiant de nœud, et chaque élément de contenu, comme les reçus d'un bloc, a un identifiant de contenu dans le même espace d'identifiants, dérivé de son numéro de bloc. Chaque nœud stocke le contenu dont les identifiants sont les plus proches de son propre identifiant, jusqu'à une distance qu'il choisit, appelée son rayon. Pour récupérer un élément de contenu, un nœud interroge les pairs qu'il connaît qui sont les plus proches de l'identifiant du contenu. Les pairs qui ne l'ont pas répondent avec des nœuds qui sont encore plus proches, jusqu'à ce que la requête atteigne un nœud qui le stocke.

<PortalHistoryDiagram />

Un nœud n'a jamais à faire confiance aux données qu'il reçoit. Il conserve chaque en-tête de bloc, et chaque en-tête s'engage sur les transactions et les reçus de son bloc par le biais de racines telles que `transactionsRoot` et `receiptsRoot`. Le nœud vérifie le corps d'un bloc ou les reçus d'un bloc par rapport à ces racines avant de les utiliser.

### Les réseaux Portal {#the-portal-networks}

Le Portal Network a d'abord été conçu comme plusieurs sous-réseaux qui permettraient aux clients légers de suivre la chaîne sans faire confiance à un nœud complet : un réseau de clients légers de la chaîne balise, un réseau d'état, un réseau de diffusion de transactions et un réseau d'historique. En 2025, les spécifications de tous ces réseaux, à l'exception d'un seul, ont été classées comme obsolètes, et le développement se concentre désormais sur le **réseau d'historique**, qui stocke les corps et les reçus des blocs passés pour les clients d'exécution qui conservent chaque en-tête de bloc mais ont supprimé le reste de l'historique.

## Clients du Portal Network {#client-diversity-as-default}

Plusieurs équipes ont développé des clients pour le Portal Network :

- [Client Portal Nimbus](https://fluffy.guide) (anciennement Fluffy) : écrit en Nim, et le seul encore en développement actif
- [Trin](https://github.com/ethereum/trin) : écrit en Rust, n'est plus maintenu
- [Ultralight](https://github.com/ethereumjs/ultralight) : écrit en TypeScript, sans mise à jour depuis mi-2025
- [Shisui](https://github.com/zen-eth/shisui) : écrit en Go, sans mise à jour depuis mi-2025

## Complément d'information {#further-reading}

- [Spécifications du Portal Network](https://github.com/ethereum/portal-network-specs)
- [Utilisation du protocole Portal Network pour l'expiration de l'historique](https://ethresear.ch/t/using-portal-network-protocol-for-history-expiry/22658)
- [Expiration partielle de l'historique](https://blog.ethereum.org/2025/07/08/partial-history-exp)
- [Le Portal Network (Piper Merriam à la Devcon Bogota)](https://www.youtube.com/watch?v=0stc9jnQLXA)
- [Le Discord du Portal Network](https://discord.gg/CFFnmE7Hbs)
- [Le site web du Portal Network](https://www.ethportal.net/)
