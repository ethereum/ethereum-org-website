---
title: Les chaînes Plasma
description: Une introduction aux chaînes Plasma en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
---

Une chaîne Plasma est une blockchain distincte ancrée au réseau principal d'Ethereum mais exécutant des transactions hors chaîne avec son propre mécanisme de validation des blocs. Les chaînes Plasma sont parfois appelées chaînes « enfant », car elles sont essentiellement des copies plus petites du réseau principal Ethereum. Les chaînes plasma utilisent [des preuves de fraude](/glossary/#fraud-proof) (comme [des rollups optimistes](/developers/docs/scaling/optimistic-rollups/)) pour arbitrer les conflits.

Les arbres de Merkle permettent de créer une pile infinie de ces chaînes qui peuvent fonctionner pour décharger la bande passante des chaînes mères (y compris le réseau principal Ethereum). Cependant, alors que ces chaînes intègrent une partie de la sécurité d'Ethereum (via des preuves de fraude), leur sécurité et leur efficacité sont affectées par plusieurs limitations de conception.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension de haut niveau de la [mise à l'échelle Ethereum](/developers/docs/scaling/).

## Qu'est-ce que Plasma ?

Plasma est un cadre pour améliorer l'évolutivité des blockchains publiques comme Ethereum. Comme décrit dans le [Livre Blanc de Plasma](http://plasma.io/plasma.pdf), les chaînes Plasma sont construites sur d'autres blockchains (qui sont appelées les « chaînes racines »). Chaque « chaîne enfant » s'étend à partir de la chaîne racine et est généralement gérée par un contrat intelligent déployé sur la chaîne mère.

Le contrat Plasma fonctionne, entre autres, comme un [pont](/developers/docs/bridges/) permettant aux utilisateurs de déplacer des actifs entre le réseau principal Ethereum et la chaîne Plasma. Bien que cela les rende similaires à des [chaînes latérales](/developers/docs/scaling/sidechains/), les chaînes plasma bénéficient - du moins, dans une certaine mesure - de la sécurité du réseau principal Ethereum. Ce n'est pas le cas des chaînes latérales qui sont les seules responsables de leur sécurité.

## Comment fonctionne Plasma ?

Les composants de base de Plasma sont :

### Calcul hors chaîne {#off-chain-computation}

La vitesse de traitement actuelle d'Ethereum est limitée à environ 15 à 20 transactions par seconde, ce qui ne permet pas de gérer un fort accroissement du nombre d'utilisateurs sans engorger le réseau. Ce problème existe principalement parce que le [mécanisme de consensus](/developers/docs/consensus-mechanisms/) d'Ethereum nécessite de nombreux nœuds peer-to-peer pour vérifier chaque mise à jour de l'état de la blockchain.

Bien que ce mécanisme de consensus soit nécessaire pour la sécurité du réseau, il peut ne pas s'appliquer pour chaque cas d'utilisation. Par exemple, Alice peut ne pas souhaiter que ses paiements quotidiens à Bob pour l'achat d'une tasse de café soient vérifiés par l'ensemble du réseau Ethereum car une certaine confiance existe entre les deux parties.

Plasma suppose que le réseau principal Ethereum n'a pas besoin de vérifier toutes les transactions. Au lieu de ça, nous pouvons traiter les transactions en dehors du réseau principal, ce qui libère les noeuds d'une certaine charge de travail puisqu'ils n'auront plus à valider toutes les transactions.

Ces calculs réalisés hors chaîne sont nécessaires car les chaînes Plasma peuvent permettre d'optimiser la vitesse et le coût des transactions. Par exemple, une chaîne Plasma peut, et va le plus souvent, utiliser un seul « opérateur » pour gérer l'ordre et l'exécution des transactions. Avec une seule entité vérifiant les transactions, les temps de traitement sur une chaîne Plasma sont plus rapides que sur le réseau principal Ethereum.

### Engagements d'état {#state-commitments}

Bien que Plasma exécute des transactions hors chaîne, celles-ci sont réglées sur la couche d'exécution principale d'Ethereum. Dans le cas contraire, les chaînes Plasma ne peuvent pas bénéficier des garanties de sécurité d'Ethereum. Mais finaliser des transactions hors chaîne sans connaître l'état de la chaîne plasma briserait le modèle de sécurité et permettrait la prolifération de transactions invalides. C'est pourquoi l'opérateur, l'entité responsable de la production des blocs sur la chaîne plasma, est tenu de publier périodiquement des « engagements d'état » sur Ethereum.

Un [schéma d'engagement](https://en.wikipedia.org/wiki/Commitment_scheme) est une technique cryptographique permettant de s'engager sur une valeur ou une déclaration sans la révéler à une autre partie. Les engagements sont « contraignants » dans le sens où vous ne pouvez pas modifier la valeur ou la déclaration une fois que vous vous y êtes engagé. Les engagements d'État dans Plasma prennent la forme de « racines de Merkle » (dérivées d'un [arbre de Merkle](/whitepaper/#merkle-trees)) que l'opérateur envoie à intervalles au contrat Plasma sur la chaîne Ethereum.

Les racines de Merkle sont des primitives cryptographiques qui permettent de compresser de grandes quantités d'informations. Une racine Merkle (également appelée « racine de bloc » dans ce cas) pourrait représenter toutes les transactions d'un bloc. Les racines de Merkle permettent également de vérifier plus facilement qu'un petit élément de données fait partie d'un ensemble de données plus vaste. Par exemple, un utilisateur peut produire une [preuve Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) pour prouver l'inclusion d'une transaction dans un bloc spécifique.

Les racines Merkle sont importantes pour fournir à Ethereum des informations sur l'état de la chaîne externe. Vous pouvez considérer les racines de Merkle comme des « points de sauvegarde » : l'opérateur dit : « Voici l'état de la chaîne Plasma à un moment x, et voici la racine de Merkle comme preuve. » L'opérateur s'engage sur l'_état actuel_ de la chaîne plasma avec une racine de Merkle, c'est pourquoi on parle d'un « engagement d'état ».

### Entrées et sorties {#entries-and-exits}

Pour que les utilisateurs d'Ethereum puisse tirer parti de Plasma, il doit y avoir un mécanisme permettant de déplacer des fonds entre le réseau principal et les chaînes Plasma. Nous ne pouvons pas arbitrairement envoyer des Ethers sur une adresse liée à une chaîne Plasma, les chaînes n'étant pas compatibles, la transaction échouerait ou entraînerait la perte des fonds envoyés.

Plasma utilise un contrat principal fonctionnant sur Ethereum pour traiter les entrées et sorties des utilisateurs. Ce contrat principal est également responsable du suivi des engagements d'état (expliqué précédemment) et de la sanction des comportements malhonnêtes par le biais de preuves de fraude (nous y reviendrons plus tard).

#### Intégrer la chaîne Plasma {#entering-the-plasma-chain}

Pour entrer dans la chaîne Plasma, Alice (l'utilisateur) devra déposer un ETH ou tout jeton ERC-20 dans le contrat Plasma. L'opérateur Plasma, qui surveille les dépôts contractuels, recrée un montant égal au dépôt initial d'Alice et le libère à son adresse sur la chaîne Plasma. Alice doit ensuite attester avoir reçu ses fonds sur la chaîne enfant afin de pouvoir les utiliser dans le cadre de transactions.

#### Sortir de la chaîne Plasma {#exiting-the-plasma-chain}

Sortir de la chaîne Plasma est plus complexe que d'y entrer, et ce, pour plusieurs raisons. Le plus important est que, bien qu'Ethereum dispose d'informations sur l'état de la chaîne Plasma, il ne peut pas vérifier si les informations sont vraies ou non. Un utilisateur malveillant pourrait faire une assertion incorrecte (« J'ai 1000 ETH ») et s'en tirer en fournissant de fausses preuves pour soutenir sa demande.

Pour éviter des retraits malveillants, une « période de défi » est introduite. Pendant la période de défi (habituellement une semaine), tout le monde peut contester une demande de retrait en utilisant une preuve de fraude. Si le défi réussit, alors la demande de retrait est refusée.

Néanmoins, la plupart du temps, les utilisateurs sont honnêtes et font des déclarations correctes sur les fonds qu'ils possèdent. Dans ce scénario, Alice lancera une demande de retrait vers la chaîne racine (Ethereum) en soumettant une transaction au contrat Plasma.

Elle doit également fournir une preuve de Merkle vérifiant qu'une transaction créant ses fonds sur la chaîne Plasma a été incluse dans un bloc. Ceci est nécessaire pour les itérations de Plasma, telles que [Plasma MVP](https://www.learnplasma.org/en/learn/mvp.html), qui utilisent un modèle [Unspent Transaction Output (UTXO)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

D'autres, comme [Plasma Cash](https://www.learnplasma.org/en/learn/cash.html), représentent les fonds sous forme de [jetons non fongibles](/developers/docs/standards/tokens/erc-721/) au lieu d'UTXOs. Le retrait, dans ce cas, nécessite une preuve de propriété des jetons sur la chaîne Plasma. Pour ce faire, il faut soumettre les deux dernières transactions impliquant le jeton et fournir une preuve de Merkle vérifiant l'inclusion de ces transactions dans un bloc.

L'utilisateur doit également ajouter une caution à la demande de retrait comme garantie d'un comportement honnête. Si un challenger prouve que la demande de retrait d'Alice n'est pas valable, sa caution est réduite, et une partie de celle-ci va au challenger en guise de récompense.

Si la période de défi s'écoule sans que personne ne fournisse de preuve de fraude, la demande de retrait d'Alice est considérée comme valide, lui permettant de récupérer des dépôts sur le contrat Plasma vers Ethereum.

### Arbitrage de litige {#dispute-arbitration}

Comme toute blockchain, les chaînes de plasma ont besoin d'un mécanisme pour faire respecter l'intégrité des transactions au cas où les participants agiraient de manière malveillante (par exemple, des fonds à double dépense). À cette fin, les chaînes de plasma utilisent des preuves de fraude pour arbitrer les conflits concernant la validité des transitions d'état et pénaliser les mauvais comportements. Les preuves de fraude sont utilisées comme mécanisme par lequel une chaîne enfant Plasma dépose une plainte auprès de sa chaîne mère ou de la chaîne racine.

Une preuve de fraude est simplement une affirmation selon laquelle une transition d'état particulière est invalide. Par exemple, si un utilisateur (Alice) essaie de dépenser deux fois les mêmes fonds. Elle a peut-être dépensé les UTXO lors d'une transaction avec Bob et veut dépenser les mêmes UTXO (qui appartiennent maintenant à Bob) dans une autre transaction.

Pour empêcher le retrait, Bob construira une preuve de fraude en fournissant la preuve qu'Alice a dépensé ledit UTXO dans une transaction précédente et une preuve de Merkle de l'inclusion de la transaction dans un bloc. Le même processus fonctionne dans Plasma Cash : Bob devra fournir la preuve qu'Alice a transféré auparavant les jetons qu'elle essaie de retirer.

Si le défi de Bob réussit, la demande de retrait d'Alice est annulée. Cependant, cette approche repose sur la capacité de Bob à surveiller la chaîne pour les demandes de retrait. Si Bob est hors ligne, Alice peut traiter le retrait malveillant une fois que la période de défi est écoulée.

## Le problème de la sortie de masse de Plasma {#the-mass-exit-problem-in-plasma}

Le problème de sortie de masse survient lorsqu'un grand nombre d'utilisateurs tentent de se retirer d'une chaîne Plasma en même temps. Ce problème résulte d'une des plus grandes difficultés de Plasma : **l'indisponibilité des données**.

La disponibilité des données est la capacité de vérifier que les informations d'un bloc proposé ont été publiées sur le réseau blockchain. Un bloc est « indisponible » si le producteur publie le bloc lui-même mais refuse de publier les données utilisées pour créer le bloc.

Les blocs doivent être disponibles pour que les nœuds puissent télécharger le bloc et vérifier la validité des transactions. Les Blockchains assurent la disponibilité des données en forçant les producteurs de blocs à afficher toutes les données de transaction sur la chaîne.

La disponibilité des données aide également à sécuriser les protocoles de mise à l'échelle hors chaîne qui s'appuient sur la couche de base d'Ethereum. En forçant les opérateurs de ces chaînes à publier des données de transaction sur Ethereum, n'importe qui peut contester des blocs non valides en construisant des preuves de fraude qui prennent en référence l'état correct de la chaîne.

Les chaînes plasma stockent principalement les données de transaction chez l'opérateur et **ne publient aucune donnée sur le réseau principal** (c'est-à-dire en dehors des engagements périodiques d'état). Cela signifie que les utilisateurs doivent compter sur l'opérateur pour fournir les données des blocs s'ils ont besoin de créer des preuves de fraude contestant des transactions invalides. Si ce système fonctionne, les utilisateurs pourront toujours utiliser des preuves de fraude pour sécuriser leurs fonds.

Le problème commence lorsque l'opérateur, et pas n'importe quel utilisateur, est la partie qui agit de manière malveillante. Comme l'opérateur a le contrôle exclusif de la blockchain, il est davantage incité à favoriser des transitions d'état invalides à plus grande échelle, comme le vol de fonds appartenant à des utilisateurs de la chaîne plasma.

Dans ce cas, l'utilisation du système anti-fraude classique ne fonctionne pas. L'opérateur pourrait facilement effectuer une transaction invalide en transférant les fonds d'Alice et de Bob dans leur portefeuille et cacher les données nécessaires à la création de la preuve de fraude. Ceci est possible parce que l'opérateur n'a pas l'obligation de rendre les données disponibles aux utilisateurs ou sur le réseau principal.

Par conséquent, la solution la plus optimiste consiste à tenter une « sortie massive » des utilisateurs de la chaîne Plasma. Cette sortie massive ralentit le projet de l'opérateur malveillant de voler des fonds et offre une certaine protection aux utilisateurs. Les demandes de retrait sont ordonnées en fonction de la date de création de chaque UTXO (ou jeton), ce qui empêche les opérateurs malveillants de devancer les utilisateurs honnêtes.

Néanmoins, nous avons toujours besoin d'un moyen de vérifier la validité des demandes de retrait lors d'une sortie massive, afin d'éviter que des individus opportunistes ne profitent du chaos engendré par les sorties invalides. La solution est simple : exiger des utilisateurs qu'ils affichent le dernier **état valide de la chaîne** pour sortir leur argent.

Mais cette approche a encore des problèmes. Par exemple, si tous les utilisateurs d'une chaîne Plasma doivent se retirer (ce qui est possible dans le cas d'un opérateur malveillant), l'ensemble de l'état valide de la chaîne Plasma doit être déversé sur la couche de base d'Ethereum en une seule fois. Avec la taille arbitraire des chaînes Plasma (haut débit = plus de données) et les contraintes sur les vitesses de traitement d'Ethereum, ce n'est pas une solution idéale.

Bien que les jeux de sortie soient agréables en théorie, les sorties massives dans la vie réelle risquent de provoquer une congestion du réseau sur Ethereum lui-même. En plus de nuire à la fonctionnalité d'Ethereum, une sortie massive mal coordonnée signifie que les utilisateurs peuvent être incapables de retirer des fonds avant que l'opérateur ne vide tous les comptes de la chaîne Plasma.

## Avantages et inconvénients de Plasma {#pros-and-cons-of-plasma}

| Avantages                                                                                                                                                                                                                                                                                                   | Inconvénients                                                                                                                                                                                                                             |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permet un débit élevé et un faible coût de transaction.                                                                                                                                                                                                                                                     | Ne prend pas en charge le calcul général (ne peut pas exécuter de contrats intelligents). Seuls les transferts de jetons de base, les échanges et quelques autres types de transactions sont pris en charge par la logique des prédicats. |
| Convient aux transactions entre utilisateurs arbitraires (pas de surcharge par paire utilisateur si les deux sont établis sur la chaîne Plasma).                                                                                                                                                            | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour garantir la sécurité de vos fonds.                                                                   |
| Les chaînes Plasma peuvent être adaptées à des cas d'utilisation spécifiques qui ne sont pas liés à la chaîne principale. N'importe qui, y compris les entreprises, peut personnaliser les contrats intelligents Plasma pour fournir une infrastructure évolutive qui fonctionne dans différents contextes. | Se repose sur un ou plusieurs opérateurs pour stocker les données et les utiliser sur demande.                                                                                                                                            |
| Réduit la charge sur le réseau principal Ethereum en déplaçant la charge de calcul et de stockage hors chaîne.                                                                                                                                                                                              | Les retraits sont retardés de plusieurs jours pour permettre les contestations. Pour les actifs fongibles, ce problème peut être atténué par les fournisseurs de liquidités, mais il y a un coût en capital associé.                      |
|                                                                                                                                                                                                                                                                                                             | Si trop d'utilisateurs tentent de quitter simultanément, le réseau principal Ethereum pourrait être congestionné.                                                                                                                         |

## Protocoles de mise à l'échelle du plasma par rapport à la couche 2 {#plasma-vs-layer-2}

Si Plasma était autrefois considéré comme une solution de mise à l'échelle utile pour Ethereum, il a depuis été abandonné au profit de [protocoles de mise à l'échelle de couche 2 (L2)](/layer-2/). Les solutions de mise à l'échelle L2 remédient à plusieurs des problèmes de Plasma :

### Efficacité {#efficiency}

[Les rollups Zero-Knowledge](/developers/docs/scaling/zk-rollups) génèrent des preuves cryptographiques de la validité de chaque lot de transactions traitées hors chaîne. Cela empêche les utilisateurs (et les opérateurs) d'avancer des transitions d'état invalides, éliminant ainsi le besoin de périodes de défi et de jeux de sortie. Cela signifie également que les utilisateurs n'ont pas à surveiller périodiquement la chaîne pour sécuriser leurs fonds.

### Prise en charge des contrats intelligents {#support-for-smart-contracts}

Un autre problème du cadre plasma était [l'incapacité à prendre en charge l'exécution de contrats intelligents Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). En conséquence, la plupart des implémentations de Plasma ont été construites pour des paiements simples ou l'échange de jetons ERC-20.

À l'inverse, les rollups optimistes sont compatibles avec la [machine virtuelle Ethereum](/developers/docs/evm/) et peuvent exécuter des [contrats intelligents](/developers/docs/smart-contracts/) natifs d'Ethereum, ce qui en fait une solution utile et _sûre_ pour la mise à l'échelle des [applications décentralisées](/developers/docs/dapps/). De même, des plans sont en cours pour [créer une mise en œuvre à connaissance zéro de l'EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) qui permettrait aux ZK-rollups de traiter une logique arbitraire et d'exécuter des contrats intelligents.

### Indisponibilité des données {#data-unavailability}

Comme expliqué précédemment, Plasma souffre d'un problème de disponibilité des données. Si un opérateur malveillant pousse une transaction non valide sur la chaîne Plasma, les utilisateurs ne seraient pas en mesure de la contester car l'opérateur peut refuser de fournir les données nécessaires à la constitution de la preuve de fraude. Les rollups résolvent ce problème en obligeant les opérateurs à publier les données des transactions sur Ethereum, ce qui permet à quiconque de vérifier l'état de la chaîne et de créer des preuves de fraude si nécessaire.

### Problème de sortie en masse {#mass-exit-problem}

Les ZK-rollups et les rollups optimistes résolvent tous deux le problème de sortie de masse de Plasma de différentes manières. Par exemple, un ZK-rollup repose sur des mécanismes cryptographiques qui garantissent que les opérateurs ne peuvent pas voler les fonds des utilisateurs, quel que soit le scénario.

De même, les rollups optimistes imposent une période de retard sur les retraits pendant laquelle n'importe qui peut lancer un défi et empêcher les demandes de retrait malveillantes. Bien que ce système soit similaire à Plasma, la différence est que les vérificateurs ont accès aux données nécessaires pour créer des preuves de fraude. Ainsi, les utilisateurs de rollup n'ont pas besoin de s'engager dans une migration frénétique, « premier à sortir », vers le réseau principal Ethereum.

## En quoi Plasma diffère-t-elle des chaînes latérales et des fragmentations ? {#plasma-sidechains-sharding}

Plasma, les chaînes latérales et la fragmentation sont assez similaires car ils se connectent tous au réseau principal Ethereum d'une manière ou d'une autre. Cependant, le niveau et la robustesse de ces connexions varient, ce qui affecte les propriétés de sécurité de chaque solution de mise à l'échelle.

### Plasma vs chaînes latérales {#plasma-vs-sidechains}

Une [chaîne latérale](/developers/docs/scaling/sidechains/) est une blockchain indépendante connectée au réseau principal Ethereum via un pont bidirectionnel. [Les ponts](/bridges/) permettent aux utilisateurs d'échanger des jetons entre les deux blockchains pour effectuer des transactions sur la chaîne latérale, réduisant ainsi la congestion sur le réseau principal Ethereum et améliorant l'évolutivité. Les chaînes latérales utilisent un mécanisme de consensus séparé et sont généralement beaucoup plus petites que le réseau principal Ethereum. Par conséquent, le passage des actifs vers ces chaînes implique un risque accru ; étant donné l'absence de garanties de sécurité héritées du réseau principal Ethereum dans le modèle de la chaîne latérale, les utilisateurs risquent la perte de fonds lors d'une attaque sur la chaîne latérale.

Inversement, les chaînes Plasma tirent leur sécurité du réseau principal. Cela les rend mesurablement plus sûres que les chaînes latérales. Les chaînes latérales et Plasma peuvent avoir des protocoles de consensus différents, mais la différence est que les chaînes Plasma publient les racines Merkle pour chaque bloc sur le réseau principal Ethereum. Les racines des blocs sont des parties d'informations que nous pouvons utiliser pour vérifier celles sur les transactions qui se produisent sur une chaîne Plasma. Si une attaque se produit sur une chaîne Plasma, les utilisateurs peuvent retirer leurs fonds en toute sécurité du réseau principal en utilisant les preuves appropriées.

### Plasma vs fragmentation {#plasma-vs-sharding}

Les chaînes Plasma ainsi que les chaînes fragmentées publient périodiquement des preuves cryptographiques sur le réseau principal Ethereum. Cependant, les deux ont des propriétés de sécurité différentes.

Les chaînes fragmentées commettent des « en-têtes de classement » sur le réseau principal contenant des informations détaillées sur chaque fragment de données. Les nœuds du réseau principal vérifient et appliquent la validité des fragments de données, réduisant ainsi la possibilité de transitions de fragments non valides et protégeant le réseau contre les activités malveillantes.

Plasma est différent car le réseau principal ne reçoit qu'un minimum d'informations sur l'état des chaînes enfants. Cela signifie que le réseau principal ne peut pas vérifier efficacement les transactions effectuées sur les chaînes enfants, ce qui les rend moins sécurisées.

**Notez que** la fragmentation de la blockchain Ethereum n'est plus sur la feuille de route. Il a été remplacé par la mise à l'échelle via des rollups et [Danksharding](/roadmap/danksharding).

### Chaînes Plasma que vous pouvez utiliser {#use-plasma}

Plusieurs projets fournissent des implémentations de Plasma que vous pouvez intégrer dans vos dApps :

- [Réseau OMG](https://omg.network/)
- [Polygon](https://polygon.technology/) (anciennement Matic Network)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Complément d'information {#further-reading}

- [Apprendre Plasma](https://www.learnplasma.org/en/)
- [Un rappel rapide de ce que signifie « sécurité partagée » et pourquoi c'est si important](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Chaînes latérales vs Plasma vs Fragmentation](https://vitalik.ca/general/2019/06/12/plasma_vs_sharding.html)
- [Comprendre Plasma, Partie 1 : Les bases](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [La vie et la mort de Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
