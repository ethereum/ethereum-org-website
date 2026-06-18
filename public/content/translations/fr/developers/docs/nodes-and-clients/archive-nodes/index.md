---
title: Nœud d'archive Ethereum
description: Un aperçu des nœuds d'archive
lang: fr
sidebarDepth: 2
---

Un nœud d'archive est une instance d'un client [Ethereum](/) configurée pour construire une archive de tous les états historiques. C'est un outil utile pour certains cas d'utilisation, mais il peut être plus complexe à exécuter qu'un nœud complet.

## Prérequis {#prerequisites}

Vous devriez comprendre le concept d'un [nœud Ethereum](/developers/docs/nodes-and-clients/), [son architecture](/developers/docs/nodes-and-clients/node-architecture/), les [stratégies de synchronisation](/developers/docs/nodes-and-clients/#sync-modes), ainsi que les pratiques pour [les exécuter](/developers/docs/nodes-and-clients/run-a-node/) et [les utiliser](/developers/docs/apis/json-rpc/).

## Qu'est-ce qu'un nœud d'archive {#what-is-an-archive-node}

Pour saisir l'importance d'un nœud d'archive, clarifions le concept d'« état ». Ethereum peut être décrit comme une _machine à états basée sur les transactions_. Il se compose de comptes et d'applications exécutant des transactions qui modifient leur état. Les données globales contenant des informations sur chaque compte et contrat sont stockées dans une base de données de type trie appelée état. Ceci est géré par le client de la couche d'exécution (EL) et comprend :

- Les soldes et les nonces des comptes
- Le code et le stockage des contrats
- Les données liées au consensus, par ex. le contrat de dépôt de staking

Pour interagir avec le réseau, vérifier et produire de nouveaux blocs, les clients Ethereum doivent se tenir au courant des modifications les plus récentes (la tête de la chaîne) et donc de l'état actuel. Un client de la couche d'exécution configuré comme un nœud complet vérifie et suit le dernier état du réseau, mais ne met en cache que les quelques états précédents, par ex. l'état associé aux 128 derniers blocs, afin de pouvoir gérer les réorganisations de la chaîne et fournir un accès rapide aux données récentes. L'état récent est ce dont tous les clients ont besoin pour vérifier les transactions entrantes et utiliser le réseau.

Vous pouvez imaginer l'état comme un instantané momentané du réseau à un bloc donné et l'archive comme une rediffusion de l'historique.

Les états historiques peuvent être élagués en toute sécurité car ils ne sont pas nécessaires au fonctionnement du réseau et il serait inutilement redondant pour le client de conserver toutes les données obsolètes. Les états qui existaient avant un bloc récent (par ex. 128 blocs avant la tête) sont effectivement supprimés. Les nœuds complets ne conservent que les données historiques de la chaîne de blocs (blocs et transactions) et des instantanés historiques occasionnels qu'ils peuvent utiliser pour régénérer des états plus anciens sur demande. Ils le font en réexécutant les transactions passées dans l'EVM, ce qui peut être exigeant en termes de calcul lorsque l'état souhaité est éloigné de l'instantané le plus proche.

Cependant, cela signifie que l'accès à un état historique sur un nœud complet consomme beaucoup de calculs. Le client pourrait avoir besoin d'exécuter toutes les transactions passées et de calculer un état historique depuis la genèse. Les nœuds d'archive résolvent ce problème en stockant non seulement les états les plus récents, mais chaque état historique créé après chaque bloc. Cela fait essentiellement un compromis avec une exigence d'espace disque plus importante.

Il est important de noter que le réseau ne dépend pas des nœuds d'archive pour conserver et fournir toutes les données historiques. Comme mentionné ci-dessus, tous les états intermédiaires historiques peuvent être dérivés sur un nœud complet. Les transactions sont stockées par n'importe quel nœud complet (actuellement moins de 400 Go) et peuvent être rejouées pour construire l'archive entière.

### Cas d'utilisation {#use-cases}

L'utilisation régulière d'Ethereum, comme l'envoi de transactions, le déploiement de contrats, la vérification du consensus, etc., ne nécessite pas d'accéder aux états historiques. Les utilisateurs n'ont jamais besoin d'un nœud d'archive pour une interaction standard avec le réseau.

Le principal avantage de l'archive d'état est un accès rapide aux requêtes concernant les états historiques. Par exemple, un nœud d'archive renverrait rapidement des résultats tels que :

- _Quel était le solde en ETH du compte 0x1337... au bloc 15537393 ?_
- _Quel est le solde du jeton 0x dans le contrat 0x au bloc 1920000 ?_

Comme expliqué ci-dessus, un nœud complet devrait générer ces données par l'exécution de l'EVM, ce qui utilise le processeur et prend du temps. Les nœuds d'archive y accèdent sur le disque et servent les réponses immédiatement. C'est une fonctionnalité utile pour certaines parties de l'infrastructure, par exemple :

- Les fournisseurs de services comme les explorateurs de blocs
- Les chercheurs
- Les analystes en sécurité
- Les développeurs d'applications décentralisées (dapps)
- L'audit et la conformité

Il existe divers [services](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuits qui permettent également d'accéder aux données historiques. Comme il est plus exigeant d'exécuter un nœud d'archive, cet accès est généralement limité et ne fonctionne que pour un accès occasionnel. Si votre projet nécessite un accès constant aux données historiques, vous devriez envisager d'en exécuter un vous-même.

## Implémentations et utilisation {#implementations-and-usage}

Dans ce contexte, un nœud d'archive désigne les données servies par les clients de la couche d'exécution orientés utilisateur, car ils gèrent la base de données d'état et fournissent des points de terminaison JSON-RPC. Les options de configuration, le temps de synchronisation et la taille de la base de données peuvent varier selon le client. Pour plus de détails, veuillez vous référer à la documentation fournie par votre client.

Avant de démarrer votre propre nœud d'archive, renseignez-vous sur les différences entre les clients et en particulier sur les diverses [exigences matérielles](/developers/docs/nodes-and-clients/run-a-node/#requirements). La plupart des clients ne sont pas optimisés pour cette fonctionnalité et leurs archives nécessitent plus de 12 To d'espace. En revanche, des implémentations comme Erigon peuvent stocker les mêmes données dans moins de 3 To, ce qui en fait le moyen le plus efficace d'exécuter un nœud d'archive.

## Pratiques recommandées {#recommended-practices}

Outre les [recommandations générales pour l'exécution d'un nœud](/developers/docs/nodes-and-clients/run-a-node/), un nœud d'archive peut être plus exigeant en matière de matériel et de maintenance. Compte tenu des [fonctionnalités clés](https://github.com/ledgerwatch/erigon#key-features) d'Erigon, l'approche la plus pratique consiste à utiliser l'implémentation du client [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Matériel {#hardware}

Assurez-vous toujours de vérifier les exigences matérielles pour un mode donné dans la documentation d'un client.
La plus grande exigence pour les nœuds d'archive est l'espace disque. Selon le client, cela varie de 3 To à 12 To. Même si le disque dur (HDD) peut être considéré comme une meilleure solution pour de grandes quantités de données, sa synchronisation et la mise à jour constante de la tête de la chaîne nécessiteront des disques SSD. Les disques [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sont suffisants, mais ils doivent être d'une qualité fiable, au moins [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Les disques peuvent être installés dans un ordinateur de bureau ou un serveur avec suffisamment d'emplacements. De tels appareils dédiés sont idéaux pour exécuter un nœud à haute disponibilité. Il est tout à fait possible de l'exécuter sur un ordinateur portable, mais la portabilité aura un coût supplémentaire.

Toutes les données doivent tenir dans un seul volume, par conséquent les disques doivent être joints, par ex. avec [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) ou LVM. Il pourrait également être intéressant d'envisager l'utilisation de [ZFS](https://en.wikipedia.org/wiki/ZFS) car il prend en charge la « copie sur écriture » (Copy-on-write), ce qui garantit que les données sont correctement écrites sur le disque sans aucune erreur de bas niveau.

Pour plus de stabilité et de sécurité afin d'éviter la corruption accidentelle de la base de données, en particulier dans une configuration professionnelle, envisagez d'utiliser la [mémoire ECC](https://en.wikipedia.org/wiki/ECC_memory) si votre système la prend en charge. Il est généralement conseillé que la taille de la RAM soit la même que pour un nœud complet, mais plus de RAM peut aider à accélérer la synchronisation.

Lors de la synchronisation initiale, les clients en mode archive exécuteront chaque transaction depuis la genèse. La vitesse d'exécution est principalement limitée par le processeur, donc un processeur plus rapide peut aider à réduire le temps de synchronisation initiale. Sur un ordinateur grand public moyen, la synchronisation initiale peut prendre jusqu'à un mois.

## Complément d'information {#further-reading}

- [Nœud complet Ethereum vs Nœud d'archive](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, septembre 2022_
- [Construire votre propre nœud d'archive Ethereum](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _Thomas Jay Rush, août 2021_
- [Comment configurer Erigon, le RPC d'Erigon et TrueBlocks (scrape et API) en tant que services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, mis à jour en septembre 2022_

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Exécuter un nœud](/developers/docs/nodes-and-clients/run-a-node/)