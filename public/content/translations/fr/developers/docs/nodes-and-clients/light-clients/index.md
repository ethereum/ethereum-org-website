---
title: "Clients légers"
description: "Introduction aux clients légers d'Ethereum."
lang: fr
---

Exécuter un nœud complet est le moyen le plus privé, décentralisé, résistant à la censure et sans tiers de confiance d'interagir avec [Ethereum](/). Avec un nœud complet, vous conservez votre propre copie de la chaîne de blocs que vous pouvez interroger instantanément et vous obtenez un accès direct au réseau pair à pair d'Ethereum. Cependant, l'exécution d'un nœud complet nécessite une quantité importante de mémoire, de stockage et de processeur (CPU). Cela signifie qu'il n'est pas possible pour tout le monde d'exécuter son propre nœud. Il existe plusieurs solutions à cela sur la feuille de route d'Ethereum, y compris l'absence d'état, mais leur mise en œuvre prendra encore plusieurs années. La réponse à court terme consiste à sacrifier certains des avantages de l'exécution d'un nœud complet au profit d'importantes améliorations de performances qui permettent aux nœuds de fonctionner avec des exigences matérielles très faibles. Les nœuds qui font ce compromis sont connus sous le nom de nœuds légers.

## Qu'est-ce qu'un client léger {#what-is-a-light-client}

Un nœud léger est un nœud exécutant un logiciel de client léger. Au lieu de conserver des copies locales des données de la chaîne de blocs et de vérifier indépendamment toutes les modifications, ils demandent plutôt les données nécessaires à un fournisseur. Le fournisseur peut être une connexion directe à un nœud complet ou via un serveur RPC centralisé. Les données sont ensuite vérifiées par le nœud léger, ce qui lui permet de rester à jour avec la tête de la chaîne. Le nœud léger ne traite que les en-têtes de bloc, ne téléchargeant qu'occasionnellement le contenu réel des blocs. Les nœuds peuvent varier dans leur légèreté, en fonction des combinaisons de logiciels de clients légers et complets qu'ils exécutent. Par exemple, la configuration la plus légère consisterait à exécuter un client d'exécution léger et un client de consensus léger. Il est également probable que de nombreux nœuds choisiront d'exécuter des clients de consensus légers avec des clients d'exécution complets, ou vice versa.

## Comment fonctionnent les clients légers ? {#how-do-light-clients-work}

Lorsqu'Ethereum a commencé à utiliser un mécanisme de consensus basé sur la preuve d'enjeu (PoS), une nouvelle infrastructure a été introduite spécifiquement pour prendre en charge les clients légers. Son fonctionnement consiste à sélectionner aléatoirement un sous-ensemble de 512 validateurs tous les 1,1 jours pour agir en tant que **comité de synchronisation**. Le comité de synchronisation signe l'en-tête des blocs récents. Chaque en-tête de bloc contient la signature agrégée des validateurs du comité de synchronisation et un « champ de bits » qui indique quels validateurs ont signé et lesquels ne l'ont pas fait. Chaque en-tête comprend également une liste de validateurs censés participer à la signature du bloc suivant. Cela signifie qu'un client léger peut rapidement voir que le comité de synchronisation a approuvé les données qu'il reçoit, et il peut également vérifier que le comité de synchronisation est le bon en comparant celui qu'il reçoit avec celui auquel il devait s'attendre dans le bloc précédent. De cette façon, le client léger peut continuer à mettre à jour sa connaissance du dernier bloc Ethereum sans réellement télécharger le bloc lui-même, juste l'en-tête qui contient des informations résumées.

Sur la couche d'exécution, il n'y a pas de spécification unique pour un client d'exécution léger. La portée d'un client d'exécution léger peut varier d'un « mode léger » d'un client d'exécution complet qui possède toutes les fonctionnalités de l'EVM et de mise en réseau d'un nœud complet mais ne vérifie que les en-têtes de bloc, sans télécharger les données associées, ou il peut s'agir d'un client plus dépouillé qui s'appuie fortement sur le transfert de requêtes à un fournisseur RPC pour interagir avec Ethereum.

## Pourquoi les clients légers sont-ils importants ? {#why-are-light-clients-important}

Les clients légers sont importants car ils permettent aux utilisateurs de vérifier les données entrantes plutôt que de faire aveuglément confiance à l'exactitude et à l'honnêteté de leur fournisseur de données, tout en n'utilisant qu'une infime fraction des ressources de calcul d'un nœud complet. Les données que les clients légers reçoivent peuvent être vérifiées par rapport aux en-têtes de bloc dont ils savent qu'ils ont été signés par au moins 2/3 d'un ensemble aléatoire de 512 validateurs Ethereum. C'est une preuve très solide que les données sont correctes.

Le client léger n'utilise qu'une infime quantité de puissance de calcul, de mémoire et de stockage, de sorte qu'il peut être exécuté sur un téléphone mobile, intégré dans une application ou dans le cadre d'un navigateur. Les clients légers sont un moyen de rendre l'accès à confiance minimisée à Ethereum tout aussi fluide que de faire confiance à un fournisseur tiers.

Prenons un exemple simple. Imaginez que vous souhaitiez vérifier le solde de votre compte. Pour ce faire, vous devez faire une requête à un nœud Ethereum. Ce nœud vérifiera sa copie locale de l'état d'Ethereum pour trouver votre solde et vous le renverra. Si vous n'avez pas d'accès direct à un nœud, il existe des opérateurs centralisés qui fournissent ces données en tant que service. Vous pouvez leur envoyer une requête, ils vérifient leur nœud et vous renvoient le résultat. Le problème avec cela est que vous devez alors faire confiance au fournisseur pour vous donner les bonnes informations. Vous ne pouvez jamais vraiment savoir si les informations sont correctes si vous ne pouvez pas les vérifier par vous-même.

Un client léger résout ce problème. Vous demandez toujours des données à un fournisseur externe, mais lorsque vous recevez les données en retour, elles sont accompagnées d'une preuve que votre nœud léger peut vérifier par rapport aux informations qu'il a reçues dans l'en-tête de bloc. Cela signifie qu'Ethereum vérifie l'exactitude de vos données au lieu d'un opérateur de confiance.

## Quelles innovations les clients légers permettent-ils ? {#what-innovations-do-light-clients-enable}

Le principal avantage des clients légers est de permettre à un plus grand nombre de personnes d'accéder à Ethereum de manière indépendante avec des exigences matérielles négligeables et une dépendance minimale à l'égard de tiers. C'est une bonne chose pour les utilisateurs car ils peuvent vérifier leurs propres données et c'est une bonne chose pour le réseau car cela augmente le nombre et la diversité des nœuds qui vérifient la chaîne.

La capacité d'exécuter des nœuds Ethereum sur des appareils avec très peu de stockage, de mémoire et de puissance de traitement est l'un des principaux domaines d'innovation débloqués par les clients légers. Alors qu'aujourd'hui les nœuds Ethereum nécessitent beaucoup de ressources informatiques, les clients légers pourraient être intégrés dans les navigateurs, exécutés sur des téléphones mobiles et peut-être même sur des appareils plus petits tels que des montres intelligentes. Cela signifie que les portefeuilles Ethereum avec des clients intégrés pourraient fonctionner sur un téléphone mobile. Cela signifie que les portefeuilles mobiles pourraient être beaucoup plus décentralisés car ils n'auraient pas à faire confiance à des fournisseurs de données centralisés pour leurs données.

Une extension de cela est l'activation des appareils de l'**Internet des objets (IoT)**. Un client léger pourrait être utilisé pour prouver rapidement la propriété d'un solde de jetons ou d'un NFT, avec toutes les garanties de sécurité fournies par les comités de synchronisation, déclenchant une action sur un réseau IoT. Imaginez un [service de location de vélos](https://youtu.be/ZHNrAXf3RDE?t=929) qui utilise une application avec un client léger intégré pour vérifier rapidement que vous possédez le NFT du service de location et, si c'est le cas, déverrouille un vélo pour que vous puissiez partir avec !

Les rollups Ethereum bénéficieraient également des clients légers. L'un des grands problèmes pour les rollups a été les piratages ciblant les ponts qui permettent aux fonds d'être transférés du réseau principal Ethereum vers un rollup. Une vulnérabilité réside dans les oracles que les rollups utilisent pour détecter qu'un utilisateur a effectué un dépôt sur le pont. Si un oracle fournit de mauvaises données, il pourrait tromper le rollup en lui faisant croire qu'il y a eu un dépôt sur le pont et libérer des fonds de manière incorrecte. Un client léger intégré dans le rollup pourrait être utilisé pour se protéger contre les oracles corrompus, car le dépôt sur le pont pourrait être accompagné d'une preuve qui peut être vérifiée par le rollup avant de libérer des jetons. Le même concept pourrait également être appliqué à d'autres ponts inter-chaînes.

Les clients légers pourraient également être utilisés pour mettre à niveau les portefeuilles Ethereum. Au lieu de faire confiance aux données fournies par un fournisseur RPC, votre portefeuille pourrait vérifier directement les données qui vous sont présentées à l'aide d'un client léger intégré. Cela ajouterait de la sécurité à votre portefeuille. Si votre fournisseur RPC était malhonnête et vous fournissait des données incorrectes, le client léger intégré pourrait vous le dire !

## Quel est l'état actuel du développement des clients légers ? {#current-state-of-development}

Il y a plusieurs clients légers en cours de développement, y compris des clients d'exécution, de consensus et des clients légers combinés d'exécution/consensus. Voici les implémentations de clients légers dont nous avons connaissance au moment de la rédaction de cette page :

- [Lodestar](https://github.com/ChainSafe/lodestar/tree/unstable/packages/light-client) : client de consensus léger en TypeScript
- [Helios](https://github.com/a16z/helios) : client léger combiné d'exécution et de consensus en Rust
- [Geth](https://github.com/ethereum/go-ethereum/tree/master/beacon/light) : mode léger pour le client d'exécution (en développement) en Go
- [Nimbus](https://nimbus.guide/el-light-client.html) : client de consensus léger en Nim

À notre connaissance, aucun d'entre eux n'est encore considéré comme prêt pour la production.

Beaucoup de travail est également en cours pour améliorer les façons dont les clients légers peuvent accéder aux données d'Ethereum. Actuellement, les clients légers s'appuient sur des requêtes RPC vers des nœuds complets en utilisant un modèle client/serveur, mais à l'avenir, les données pourraient être demandées de manière plus décentralisée en utilisant un réseau dédié tel que le [Portal Network](https://www.ethportal.net/) qui pourrait servir les données aux clients légers en utilisant un protocole de commérage pair à pair.

D'autres éléments de la [feuille de route](/roadmap/) tels que les [arbres Verkle](/roadmap/verkle-trees/) et l'[absence d'état](/roadmap/statelessness/) finiront par rendre les garanties de sécurité des clients légers égales à celles des clients complets.

## Lectures complémentaires {#further-reading}

- [Zsolt Felfodhi sur les clients légers Geth](https://www.youtube.com/watch?v=EPZeFXau-RE)
- [Etan Kissling sur la mise en réseau des clients légers](https://www.youtube.com/watch?v=85MeiMA4dD8)
- [Etan Kissling sur les clients légers après La Fusion](https://www.youtube.com/watch?v=ZHNrAXf3RDE)
- [Piper Merriam : La route sinueuse vers des clients légers fonctionnels](https://snakecharmers.ethereum.org/the-winding-road-to-functional-light-clients/)