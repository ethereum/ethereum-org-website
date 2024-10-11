---
title: Nœud d'archive Ethereum
description: Un aperçu des nœuds d'archive
lang: fr
sidebarDepth: 2
---

Un nœud d'archive est une instance d'un client Ethereum configurée pour créer une archive de tous les états historiques. C'est un outil utile pour certains cas d'utilisation, mais il peut être plus difficile à exécuter qu'un nœud complet.

## Prérequis {#prerequisites}

Vous devriez comprendre le concept d'un [nœud Ethereum](/developers/docs/nodes-and-clients/), [son architecture](/developers/docs/nodes-and-clients/node-architecture/), les [stratégies de synchronisation](/developers/docs/nodes-and-clients/#sync-modes), les pratiques de [mise en fonctionnement](/developers/docs/nodes-and-clients/run-a-node/) et [leur utilisation](/developers/docs/apis/json-rpc/).

## Qu'est-ce qu'un nœud d'archive

Pour saisir l'importance d'un nœud d'archive, clarifions le concept d'« état. » Ethereum peut être désigné comme une _machine à état basée sur les transactions_. Il est composé de comptes et d'applications exécutant des transactions qui modifient leur état. Les données globales contenant des informations sur chaque compte et contrat sont stockées dans une base de données triée appelée état. Cela est géré par le client de la couche d'exécution (EL) et comprend :

- Soldes et nonces des comptes
- Code des contrats et stockage
- Données liées au consensus, par exemple, le contrat de dépôt de mise en jeu

Pour interagir avec le réseau, vérifier et produire de nouveaux blocs, les clients Ethereum doivent suivre les changements les plus récents (le sommet de la chaîne) et donc l'état actuel. Un client de couche d'exécution configuré en tant que nœud complet vérifie et suit le dernier état du réseau, mais ne met en cache que les derniers états, par ex. l'état associé aux 128 derniers blocs, afin qu'il puisse gérer les réorganisations en chaîne et fournir un accès rapide aux données récentes. L'état récent est ce dont tous les clients ont besoin pour vérifier les transactions entrantes et utiliser le réseau.

Vous pouvez imaginer l'état comme un instantané de réseau momentané à un bloc donné et l'archive comme une relecture de l'historique.

Les états historiques peuvent être élagués en toute sécurité car ils ne sont pas nécessaires au fonctionnement du réseau et il serait inutilement redondant pour le client de conserver toutes les données obsolètes. Les états qui existaient avant un certain bloc récent (par exemple, 128 blocs avant la tête) sont effectivement éliminés. Les nœuds complets ne conservent que les données historiques de la blockchain (blocs et transactions) et des instantanés historiques occasionnels qu'ils peuvent utiliser pour régénérer des états plus anciens sur demande. Pour ce faire, ils réexécutent les transactions passées dans l'EVM, ce qui peut être exigeant en termes de calcul lorsque l'état souhaité est éloigné de l'instantané le plus proche.

Cependant, cela signifie que l'accès à un état historique sur un nœud complet nécessite une grande quantité de calcul. Le client peut avoir besoin d'exécuter toutes les transactions passées et de calculer un état historique à partir de la genèse. Les nœuds d'archive résolvent ce problème en stockant non seulement les états les plus récents, mais également tous les états historiques créés après chaque bloc. Cela implique essentiellement un compromis avec l'exigence d'un espace disque plus grand.

Il est important de noter que le réseau ne dépend pas des nœuds d'archive pour conserver et fournir toutes les données historiques. Comme mentionné précédemment, tous les états intermédiaires historiques peuvent être dérivés sur un nœud complet. Les transactions sont stockées par tout nœud complet (actuellement moins de 400 Go) et peuvent être rejouées pour construire l'ensemble des archives.

### Cas d'usage

L'utilisation régulière d'Ethereum, comme l'envoi de transactions, le déploiement de contrats, la vérification du consensus, etc. ne nécessite pas l'accès aux états historiques. Les utilisateurs n'ont jamais besoin d'un nœud d'archive pour une interaction standard avec le réseau.

Le principal avantage des archives d'état est un accès rapide aux requêtes sur les états historiques. Par exemple, le nœud d'archive renverrait rapidement des résultats tels que :

- _Quel était le solde ETH du compte 0x1337... au bloc 15537393 ?_
- _Quel est le solde du jeton 0x dans le contrat 0x au bloc 1920000 ?_

Comme expliqué ci-dessus, un nœud complet aurait besoin de générer ces données par l'exécution de l'EVM, utilisant le CPU et prenant du temps. Les nœuds d'archive y accèdent sur le disque et fournissent les réponses immédiatement. Cette fonctionnalité est utile pour certaines parties de l'infrastructure, par exemple :

- Les fournisseurs de services comme les explorateurs de blocs
- Chercheurs
- Analystes sécurité
- Développeurs de DApp
- Audit et conformité

Il existe divers [services](/developers/docs/nodes-and-clients/nodes-as-a-service/) gratuits qui permettent également d'accéder aux données historiques. Comme il est plus exigeant d'exécuter un nœud d'archive, cet accès est généralement limité et ne fonctionne que pour des accès occasionnels. Si votre projet nécessite un accès constant aux données historiques, vous devriez envisager d'en exécuter un vous-même.

## Implémentations et utilisation

Dans ce contexte, le terme « nœud d'archive » fait référence aux données fournies par les clients de la couche d'exécution orientés utilisateur, car ils gèrent la base de données d'état et fournissent des points de terminaison JSON-RPC. Les options de configuration, le temps de synchronisation et la taille de la base de données peuvent varier selon le client. Pour plus de détails, veuillez vous référer à la documentation fournie par votre client.

Avant de démarrer votre propre nœud d'archive, renseignez-vous sur les différences entre les clients et surtout sur les différentes [exigences matérielles](/developers/docs/nodes-and-clients/run-a-node/#requirements). La plupart des clients ne sont pas optimisés pour cette fonctionnalité et leurs archives nécessitent plus de 12 To d'espace. En revanche, des implémentations telles qu'Erigon peuvent stocker les mêmes données en moins de 3 To, ce qui en fait la méthode la plus efficace pour exécuter un nœud d'archive.

## Pratiques recommandées

Outre les [recommandations générales pour l'exécution d'un nœud](/developers/docs/nodes-and-clients/run-a-node/), un nœud d'archive peut être plus exigeant en termes de matériel et de maintenance. Compte tenu des [fonctionnalités clés](https://github.com/ledgerwatch/erigon#key-features) d'Erigon, l'approche la plus pratique consiste à utiliser l'implémentation client [Erigon](/developers/docs/nodes-and-clients/#erigon).

### Matériel

Assurez-vous toujours de vérifier les exigences matérielles pour un mode spécifique dans la documentation du client. L'espace disque est la principale exigence pour les nœuds d'archive. Selon le client, cela varie de 3 To à 12 To. Même si le disque dur peut être considéré comme une meilleure solution pour de grandes quantités de données, sa synchronisation et la mise à jour constante de la tête de chaîne nécessiteront des disques SSD. Les disques [SATA](https://www.cleverfiles.com/help/sata-hard-drive.html) sont assez bons mais ils doivent être d'une qualité fiable, au moins [TLC](https://blog.synology.com/tlc-vs-qlc-ssds-what-are-the-differences). Les disques peuvent être installés dans un ordinateur de bureau ou un serveur avec suffisamment d'emplacements. Ces appareils dédiés sont idéaux pour exécuter un nœud à haute disponibilité. Il est tout à fait possible de l'exécuter sur un ordinateur portable, mais la portabilité entraînera un coût supplémentaire.

Toutes les données doivent tenir dans un seul volume, donc les disques doivent être joints, par ex. avec [RAID0](https://en.wikipedia.org/wiki/Standard_RAID_levels#RAID_0) ou [LVM](https://web.mit.edu/rhel-doc/5/RHEL-5-manual/Deployment_Guide-en-US/ch-lvm.html). Il pourrait également être utile d'envisager d'utiliser [ZFS](https://en.wikipedia.org/wiki/ZFS) car il prend en charge « Copy-on-write » qui garantit que les données sont correctement écrites sur le disque sans aucune erreur de bas niveau.

Pour plus de stabilité et de sécurité dans la prévention de la corruption accidentelle de la base de données, en particulier dans une configuration professionnelle, envisagez d'utiliser la [mémoire ECC](https://en.wikipedia.org/wiki/ECC_memory) si votre système le prend en charge. Il est généralement conseillé d'avoir la même quantité de RAM que pour un nœud complet, mais davantage de RAM peut accélérer la synchronisation.

Lors de la synchronisation initiale, les clients en mode archive exécuteront chaque transaction depuis la genèse. La vitesse d'exécution est principalement limitée par le CPU, donc un CPU plus rapide peut apporter une aide avec le temps de synchronisation initial. Sur un ordinateur grand public moyen, la synchronisation initiale peut prendre jusqu'à un mois.

## Complément d'information {#further-reading}

- [Nœud complet Ethereum vs Nœud d'archive Ethereum](https://www.quicknode.com/guides/infrastructure/ethereum-full-node-vs-archive-node) - _QuickNode, septembre 2022_
- [Construire votre propre nœud d'archive Ethereum.](https://tjayrush.medium.com/building-your-own-ethereum-archive-node-72c014affc09) - _par Thomas Jay Rush, août 2021_
- [Comment configurer Erigon, le RPC d'Erigon et TrueBlocks (scraping et API) en tant que services](https://magnushansson.xyz/blog_posts/crypto_defi/2022-01-10-Erigon-Trueblocks) _– Magnus Hansson, mis à jour en septembre 2022_

## Sujets connexes {#related-topics}

- [ Nœuds et clients](/developers/docs/nodes-and-clients/)
- [Exécuter un nœud](/developers/docs/nodes-and-clients/run-a-node/)
