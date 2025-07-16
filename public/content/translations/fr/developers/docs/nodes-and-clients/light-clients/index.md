---
title: Clients légers
description: Introduction aux clients légers Ethereum.
lang: fr
---

L'exécution d'un nœud complet est le moyen le plus fiable, privé, décentralisé et résistant à la censure d'interagir avec Ethereum. Avec un nœud complet, vous conservez votre propre copie de la blockchain que vous pouvez interroger instantanément, et vous obtenez un accès direct au réseau pair-à-pair Ethereum. Cependant, exécuter un nœud complet nécessite une quantité importante de mémoire, de stockage et de puissance de calcul. Cela signifie qu'exécuter son propre nœud n'est pas réalisable pour tout le monde. Il existe plusieurs solutions à cela sur la feuille de route Ethereum, y compris le « statelessness », mais elles sont à plusieurs années d'être mises en œuvre. La solution à court terme consiste à faire un compromis sur certains avantages de l'exécution d'un nœud complet en échange d'améliorations significatives des performances permettant aux nœuds de fonctionner avec des exigences matérielles très faibles. Les nœuds qui font ce compromis sont appelés des nœuds légers.

## Qu'est-ce qu'un client léger {#what-is-a-light-client}

Un nœud léger est un nœud exécutant un logiciel client léger. Au lieu de conserver des copies locales des données de la blockchain et de vérifier indépendamment toutes les modifications, ils demandent les données nécessaires à un fournisseur. Le fournisseur peut être une connexion directe à un nœud complet ou via un serveur RPC centralisé. Les données sont ensuite vérifiées par le nœud léger, ce qui lui permet de suivre la tête de la chaîne. Le nœud léger traite uniquement les en-têtes de bloc, téléchargeant occasionnellement le contenu réel des blocs. La légèreté des nœuds peut varier en fonction de la combinaison de logiciels clients légers et complets qu'ils exécutent. Par exemple, la configuration la plus légère consisterait à utiliser un client d'exécution léger et un client de consensus léger. Il est également probable que de nombreux nœuds choisiront d'exécuter des clients de consensus léger avec des clients d'exécution complète, ou vice versa.

## Comment fonctionnent les clients légers ? {#how-do-light-clients-work}

Lorsque Ethereum a commencé à utiliser un mécanisme de consensus basé sur la preuve d'enjeu, une nouvelle infrastructure a été introduite spécifiquement pour prendre en charge les clients légers. Le système fonctionne en sélectionnant au hasard un sous-ensemble de 512 validateurs tous les 1,1 jour pour agir en tant que **comité de synchronisation**. Le comité de synchronisation signe l'en-tête des blocs récents. Chaque en-tête de bloc contient la signature agrégée des validateurs du comité de synchronisation et un « champ de bits » qui indique les validateurs qui ont signé et ceux qui n'ont pas signé. Chaque en-tête comprend également une liste de validateurs censés participer à la signature du bloc suivant. Cela signifie qu'un client léger peut rapidement voir que le comité de synchronisation a approuvé les données qu'il reçoit, et il peut également vérifier que le comité de synchronisation est le bon en comparant les données qu'il reçoit à celles qu'on lui a dit d'attendre dans le bloc précédent. De cette façon, le client léger peut continuer à mettre à jour sa connaissance du dernier bloc Ethereum sans télécharger le bloc lui-même, mais seulement l'en-tête contenant des informations sommaires.

Au niveau de la couche d'exécution, il n'existe pas de spécification unique pour un client d'exécution léger. La portée d'un client d'exécution légère peut varier d'un « mode léger » d'un client d'exécution complète qui dispose de toutes les fonctionnalités EVM et réseau d'un nœud complet, mais qui vérifie uniquement les en-têtes de blocs, sans télécharger les données associées, ou il peut s'agir d'un client plus simple qui s'appuie fortement sur la transmission de demandes à un fournisseur RPC pour interagir avec Ethereum.

## Pourquoi les clients légers sont-ils importants ? {#why-are-light-clients-important}

Les clients légers sont importants car ils permettent aux utilisateurs de vérifier les données entrantes plutôt que de faire aveuglément confiance à l'exactitude et à l'honnêteté de leur fournisseur de données, tout en n'utilisant qu'une infime partie des ressources informatiques d'un nœud complet. Les données que les clients légers reçoivent peuvent être vérifiées par rapport à des en-têtes de blocs dont ils savent qu'ils ont été signés par au moins 2/3 d'un ensemble aléatoire de 512 validateurs Ethereum. Cela constitue une preuve très solide que les données sont correctes.

Le client léger n'utilise qu'une quantité minime de puissance de calcul, de mémoire et de stockage, de sorte qu'il peut être exécuté sur un téléphone portable, intégré dans une application ou dans un navigateur. Les clients légers sont un moyen de rendre l'accès à Ethereum avec un niveau de confiance minimal aussi facile que de faire confiance à un fournisseur tiers.

Prenons un exemple simple. Imaginez que vous souhaitiez vérifier le solde de votre compte. Pour ce faire, vous devez adresser une demande à un nœud Ethereum. Ce nœud vérifiera sa copie locale de l'état d'Ethereum pour trouver votre solde et vous le retournera. Si vous n'avez pas d'accès direct à un nœud, il existe des opérateurs centralisés qui fournissent ces données en tant que service. Vous pouvez leur envoyer une demande, ils vérifient leur nœud et vous renvoient le résultat. Le problème est que vous devez alors faire confiance au fournisseur quant à l'exactitude des informations qu'il vous donne. Vous ne pouvez jamais vraiment savoir si les informations sont correctes si vous ne pouvez pas les vérifier par vous-même.

Un client léger permet de résoudre ce problème. Vous demandez toujours des données à un fournisseur externe, mais lorsque vous recevez les données en retour, elles sont accompagnées d'une preuve que votre nœud léger peut vérifier par rapport aux informations qu'il a reçues dans l'en-tête du bloc. Cela signifie qu'Ethereum vérifie l'exactitude de vos données à la place d'un opérateur de confiance.

## Quelles innovations les clients légers permettent-ils ? {#what-innovations-do-light-clients-enable}

L'avantage principal des clients légers est de permettre à un plus grand nombre de personnes d'accéder à Ethereum de manière indépendante, avec des exigences matérielles négligeables et une dépendance minimale à l'égard de tiers. C'est une bonne chose pour les utilisateurs, car ils peuvent vérifier leurs propres données, mais aussi pour le réseau, car cela augmente le nombre et la diversité des nœuds qui vérifient la chaîne.

La possibilité d'exécuter des nœuds Ethereum sur des appareils dotés d'une capacité de stockage, d'une mémoire et d'une puissance de traitement très faibles est l'un des principaux domaines d'innovation rendus possibles par les clients légers. Alors qu'aujourd'hui les nœuds Ethereum nécessitent beaucoup de ressources informatiques, les clients légers pourraient être intégrés dans des navigateurs, fonctionner sur des téléphones portables et peut-être même sur des appareils plus petits tels que des montres intelligentes. Cela signifie que les portefeuilles Ethereum avec des clients intégrés pourraient fonctionner sur un téléphone portable. Les portefeuilles mobiles pourraient donc être beaucoup plus décentralisés, car ils n'auraient pas à faire confiance à des fournisseurs de données centralisés pour leurs données.

L'activation des dispositifs de **l'internet des objets (IoT)** est une extension de ce principe. Un client léger pourrait être utilisé pour rapidement prouver la propriété d'un solde de jetons ou encore d'un NFT, avec toutes les garanties de sécurité fournies par les comités de synchronisation, déclenchant une action sur un réseau IoT. Imaginez un [service de location de vélos](https://youtu.be/ZHNrAXf3RDE?t=929) qui utilise une application avec un client léger embarqué pour vérifier rapidement que vous possédez bien le NFT du service de location, et si c'est le cas, débloque un vélo sur lequel vous pourriez filer !

Les rollups Ethereum bénéficieraient également des clients légers. L'un des grands problèmes pour les rollups a été les attaques ciblant les ponts qui permettent le transfert de fonds d'Ethereum vers un rollup. Une vulnérabilité concerne les oracles que les rollups utilisent pour détecter qu'un utilisateur a effectué un dépôt dans le pont. Si un oracle fournit de mauvaises données, il pourrait tromper le rollup en lui faisant croire qu'il y a eu un dépôt sur le pont et libérer incorrectement des fonds. Un client léger intégré dans le rollup pourrait être utilisé pour se protéger contre les oracles corrompus car le dépôt dans le pont pourrait venir avec une preuve qui peut être vérifiée par le rollup avant de libérer des jetons. Le même concept pourrait également être appliqué à d'autres ponts interchaînes.

Les clients légers pourraient également être utilisés pour mettre les portefeuilles Ethereum à niveau. Au lieu de faire confiance aux données fournies par un fournisseur RPC, votre portefeuille pourrait vérifier directement les données qui vous sont présentées en utilisant un client léger intégré. Cela augmenterait la sécurité de votre portefeuille. Si votre fournisseur RPC était malhonnête et vous fournissait des données incorrectes, le client léger intégré pourrait vous le signaler !

## Quel est l'état actuel du développement des clients légers ? {#current-state-of-development}

Il existe plusieurs clients légers en développement, notamment des clients légers d'exécution, de consensus et des clients légers combinant exécution et consensus. Voici les implémentations de clients légers que nous connaissons au moment de la rédaction de cette page :

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client) : client léger de consensus en TypeScript
- [Helios](https://github.com/a16z/helios) : client léger combinant les tâches d'exécution et de consensus en Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light) : mode léger pour le client d'exécution (en développement) en Go
- [Nimbus](https://nimbus.guide/el-light-client.html) : client léger de consensus en Nim

À notre connaissance, aucun de ces clients n'est encore considéré comme prêt pour être utilisé.

Il y a aussi beaucoup de travail en cours pour améliorer l'accès des clients légers aux données Ethereum. Actuellement, les clients légers s'appuient sur des demandes RPC vers des nœuds complets en utilisant un modèle client/serveur, mais à l'avenir, les données pourraient être demandées de manière plus décentralisée en utilisant un réseau dédié tel que le [Réseau Portal](https://www.ethportal.net/) qui pourrait fournir les données aux clients légers en utilisant un protocole de bavardage pair à pair.

D'autres éléments de la [feuille de route](/roadmap/) tels que les [arbres Verkle](/roadmap/verkle-trees/) et l'[absence d'état](/roadmap/statelessness/) apporteront finalement les garanties de sécurité des clients légers équivalentes à celles des clients complets.

## Complément d'information {#further-reading}

- [Zsolt Felföldi sur les clients légers Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sur le réseau des clients légers](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sur les clients légers après La Fusion](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam : Le chemin sinueux vers les clients légers opérationnels](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)
