---
title: "Chaînes Plasma"
description: "Une introduction aux chaînes Plasma en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum."
lang: fr
incomplete: true
sidebarDepth: 3
---

Une chaîne Plasma est une chaîne de blocs distincte ancrée au [réseau principal Ethereum](/) mais exécutant des transactions hors chaîne avec son propre mécanisme de validation de bloc. Les chaînes Plasma sont parfois appelées chaînes « enfants », qui sont essentiellement des copies plus petites du réseau principal Ethereum. Les chaînes Plasma utilisent des [preuves de fraude](/glossary/#fraud-proof) (comme les [rollups optimistes](/developers/docs/scaling/optimistic-rollups/)) pour arbitrer les litiges.

Les arbres de Merkle permettent la création d'une pile infinie de ces chaînes qui peuvent fonctionner pour décharger la bande passante des chaînes parentes (y compris le réseau principal Ethereum). Cependant, bien que ces chaînes tirent une certaine sécurité d'Ethereum (via les preuves de fraude), leur sécurité et leur efficacité sont affectées par plusieurs limitations de conception.

## Prérequis {#prerequisites}

Vous devriez avoir une bonne compréhension de tous les sujets fondamentaux et une compréhension de haut niveau de la [mise à l'échelle d'Ethereum](/developers/docs/scaling/).

## Qu'est-ce que Plasma ? {#what-is-plasma}

Plasma est un cadre de travail (framework) permettant d'améliorer la mise à l'échelle des chaînes de blocs publiques comme Ethereum. Comme décrit dans le [livre blanc original de Plasma](https://plasma.io/plasma.pdf), les chaînes Plasma sont construites au-dessus d'une autre chaîne de blocs (appelée « chaîne racine »). Chaque « chaîne enfant » s'étend à partir de la chaîne racine et est généralement gérée par un contrat intelligent déployé sur la chaîne parente.

Le contrat Plasma fonctionne, entre autres, comme un [pont](/developers/docs/bridges/) permettant aux utilisateurs de déplacer des actifs entre le réseau principal Ethereum et la chaîne Plasma. Bien que cela les rende similaires aux [chaînes latérales](/developers/docs/scaling/sidechains/), les chaînes Plasma bénéficient — du moins, dans une certaine mesure — de la sécurité du réseau principal Ethereum. Contrairement aux chaînes latérales qui sont seules responsables de leur sécurité.

## Comment fonctionne Plasma ? {#how-does-plasma-work}

Les composants de base du cadre de travail Plasma sont :

### Calcul hors chaîne {#offchain-computation}

La vitesse de traitement actuelle d'Ethereum est limitée à environ 15-20 transactions par seconde, ce qui réduit la possibilité à court terme de mise à l'échelle pour gérer plus d'utilisateurs. Ce problème existe principalement parce que le [mécanisme de consensus](/developers/docs/consensus-mechanisms/) d'Ethereum exige que de nombreux nœuds pair à pair vérifient chaque mise à jour de l'état de la chaîne de blocs.

Bien que le mécanisme de consensus d'Ethereum soit nécessaire pour la sécurité, il peut ne pas s'appliquer à tous les cas d'utilisation. Par exemple, Alice n'a peut-être pas besoin que ses paiements quotidiens à Bob pour une tasse de café soient vérifiés par l'ensemble du réseau Ethereum puisqu'une certaine confiance existe entre les deux parties.

Plasma suppose que le réseau principal Ethereum n'a pas besoin de vérifier toutes les transactions. Au lieu de cela, nous pouvons traiter les transactions hors du Réseau principal, libérant ainsi les nœuds de l'obligation de valider chaque transaction.

Le calcul hors chaîne est nécessaire car les chaînes Plasma peuvent optimiser la vitesse et les coûts. Par exemple, une chaîne Plasma peut — et c'est le plus souvent le cas — utiliser un seul « opérateur » pour gérer l'ordre et l'exécution des transactions. Avec une seule entité vérifiant les transactions, les temps de traitement sur une chaîne Plasma sont plus rapides que sur le réseau principal Ethereum.

### Engagements d'état {#state-commitments}

Bien que Plasma exécute les transactions hors chaîne, elles sont réglées sur la couche d'exécution principale d'Ethereum — sinon, les chaînes Plasma ne pourraient pas bénéficier des garanties de sécurité d'Ethereum. Mais finaliser des transactions hors chaîne sans connaître l'état de la chaîne Plasma briserait le modèle de sécurité et permettrait la prolifération de transactions invalides. C'est pourquoi l'opérateur, l'entité responsable de la production de blocs sur la chaîne Plasma, est tenu de publier périodiquement des « engagements d'état » sur Ethereum.

Un [schéma d'engagement](https://en.wikipedia.org/wiki/Commitment_scheme) est une technique cryptographique permettant de s'engager sur une valeur ou une déclaration sans la révéler à une autre partie. Les engagements sont « contraignants » dans le sens où vous ne pouvez pas modifier la valeur ou la déclaration une fois que vous vous y êtes engagé. Les engagements d'état dans Plasma prennent la forme de « racines de Merkle » (dérivées d'un [arbre de Merkle](/whitepaper/#merkle-trees)) que l'opérateur envoie à intervalles réguliers au contrat Plasma sur la chaîne Ethereum.

Les racines de Merkle sont des primitives cryptographiques qui permettent de compresser de grandes quantités d'informations. Une racine de Merkle (également appelée « racine de bloc » dans ce cas) pourrait représenter toutes les transactions d'un bloc. Les racines de Merkle facilitent également la vérification qu'un petit élément de données fait partie d'un ensemble de données plus vaste. Par exemple, un utilisateur peut produire une [preuve de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/#main-content) pour prouver l'inclusion d'une transaction dans un bloc spécifique.

Les racines de Merkle sont importantes pour fournir des informations sur l'état hors chaîne à Ethereum. Vous pouvez considérer les racines de Merkle comme des « points de sauvegarde » : l'opérateur dit : « Voici l'état de la chaîne Plasma à l'instant x, et voici la racine de Merkle comme preuve. » L'opérateur s'engage sur l'_état actuel_ de la chaîne Plasma avec une racine de Merkle, c'est pourquoi on l'appelle un « engagement d'état ».

### Entrées et sorties {#entries-and-exits}

Pour que les utilisateurs d'Ethereum puissent profiter de Plasma, il doit y avoir un mécanisme permettant de déplacer des fonds entre le Réseau principal et les chaînes Plasma. Nous ne pouvons cependant pas envoyer arbitrairement de l'ether à une adresse sur la chaîne Plasma — ces chaînes sont incompatibles, la transaction échouerait donc ou entraînerait la perte de fonds.

Plasma utilise un contrat maître fonctionnant sur Ethereum pour traiter les entrées et les sorties des utilisateurs. Ce contrat maître est également responsable du suivi des engagements d'état (expliqués précédemment) et de la sanction des comportements malhonnêtes via des preuves de fraude (nous y reviendrons plus tard).

#### Entrer dans la chaîne Plasma {#entering-the-plasma-chain}

Pour entrer dans la chaîne Plasma, Alice (l'utilisatrice) devra déposer des ETH ou tout jeton ERC-20 dans le contrat Plasma. L'opérateur Plasma, qui surveille les dépôts du contrat, recrée un montant égal au dépôt initial d'Alice et le libère à son adresse sur la chaîne Plasma. Alice est tenue d'attester de la réception des fonds sur la chaîne enfant et peut ensuite utiliser ces fonds pour des transactions.

#### Sortir de la chaîne Plasma

Sortir de la chaîne Plasma est plus complexe que d'y entrer pour plusieurs raisons. La principale est que, bien qu'Ethereum dispose d'informations sur l'état de la chaîne Plasma, il ne peut pas vérifier si ces informations sont vraies ou non. Un utilisateur malveillant pourrait faire une affirmation incorrecte (« J'ai 1000 ETH ») et s'en tirer en fournissant de fausses preuves pour étayer sa réclamation.

Pour empêcher les retraits malveillants, une « période de contestation » est introduite. Pendant la période de contestation (généralement une semaine), n'importe qui peut contester une demande de retrait en utilisant une preuve de fraude. Si la contestation réussit, la demande de retrait est alors refusée.

Cependant, il est généralement vrai que les utilisateurs sont honnêtes et font des réclamations correctes concernant les fonds qu'ils possèdent. Dans ce scénario, Alice initiera une demande de retrait sur la chaîne racine (Ethereum) en soumettant une transaction au contrat Plasma.

Elle doit également fournir une preuve de Merkle vérifiant qu'une transaction créant ses fonds sur la chaîne Plasma a été incluse dans un bloc. Cela est nécessaire pour les itérations de Plasma, telles que Plasma MVP, qui utilisent un modèle [UTXO (Unspent Transaction Output)](https://en.wikipedia.org/wiki/Unspent_transaction_output).

D'autres, comme Plasma Cash, représentent les fonds sous forme de [jetons non fongibles](/developers/docs/standards/tokens/erc-721/) au lieu d'UTXO. Le retrait, dans ce cas, nécessite une preuve de propriété des jetons sur la chaîne Plasma. Cela se fait en soumettant les deux dernières transactions impliquant le jeton et en fournissant une preuve de Merkle vérifiant l'inclusion de ces transactions dans un bloc.

L'utilisateur doit également ajouter une caution à la demande de retrait comme garantie d'un comportement honnête. Si un contestataire prouve que la demande de retrait d'Alice est invalide, sa caution subit une réduction, et une partie de celle-ci va au contestataire en guise de récompense.

Si la période de contestation s'écoule sans que personne ne fournisse de preuve de fraude, la demande de retrait d'Alice est considérée comme valide, ce qui lui permet de récupérer ses dépôts du contrat Plasma sur Ethereum.
### Arbitrage des litiges {#dispute-arbitration}

Comme toute chaîne de blocs, les chaînes Plasma ont besoin d'un mécanisme pour faire respecter l'intégrité des transactions au cas où les participants agiraient de manière malveillante (par exemple, une double dépense de fonds). À cette fin, les chaînes Plasma utilisent des preuves de fraude pour arbitrer les litiges concernant la validité des transitions d'état et pénaliser les mauvais comportements. Les preuves de fraude sont utilisées comme un mécanisme par lequel une chaîne enfant Plasma dépose une plainte auprès de sa chaîne parente ou de la chaîne racine.

Une preuve de fraude est simplement une réclamation selon laquelle une transition d'état particulière est invalide. Un exemple est si un utilisateur (Alice) essaie de dépenser les mêmes fonds deux fois. Peut-être a-t-elle dépensé l'UTXO dans une transaction avec Bob et veut dépenser le même UTXO (qui appartient maintenant à Bob) dans une autre transaction.

Pour empêcher le retrait, Bob construira une preuve de fraude en fournissant la preuve qu'Alice a dépensé ledit UTXO dans une transaction précédente et une preuve de Merkle de l'inclusion de la transaction dans un bloc. Le même processus fonctionne dans Plasma Cash — Bob devrait fournir la preuve qu'Alice a précédemment transféré les jetons qu'elle essaie de retirer.

Si la contestation de Bob réussit, la demande de retrait d'Alice est annulée. Cependant, cette approche repose sur la capacité de Bob à surveiller la chaîne pour les demandes de retrait. Si Bob est hors ligne, alors Alice peut traiter le retrait malveillant une fois la période de contestation écoulée.

## Le problème de sortie massive dans Plasma {#the-mass-exit-problem-in-plasma}

Le problème de sortie massive se produit lorsqu'un grand nombre d'utilisateurs tentent de se retirer d'une chaîne Plasma en même temps. La raison de l'existence de ce problème est liée à l'un des plus grands problèmes de Plasma : **l'indisponibilité des données**.

La disponibilité des données est la capacité de vérifier que les informations d'un bloc proposé ont été réellement publiées sur le réseau de la chaîne de blocs. Un bloc est « indisponible » si le producteur publie le bloc lui-même mais retient les données utilisées pour créer le bloc.

Les blocs doivent être disponibles pour que les nœuds puissent télécharger le bloc et vérifier la validité des transactions. Les chaînes de blocs garantissent la disponibilité des données en forçant les producteurs de blocs à publier toutes les données de transaction onchain.

La disponibilité des données aide également à sécuriser les protocoles de mise à l'échelle hors chaîne qui s'appuient sur la couche de base d'Ethereum. En forçant les opérateurs de ces chaînes à publier les données de transaction sur Ethereum, n'importe qui peut contester les blocs invalides en construisant des preuves de fraude faisant référence à l'état correct de la chaîne.

Les chaînes Plasma stockent principalement les données de transaction avec l'opérateur et **ne publient aucune donnée sur le Réseau principal** (c'est-à-dire, en dehors des engagements d'état périodiques). Cela signifie que les utilisateurs doivent compter sur l'opérateur pour fournir les données de bloc s'ils ont besoin de créer des preuves de fraude contestant des transactions invalides. Si ce système fonctionne, alors les utilisateurs peuvent toujours utiliser des preuves de fraude pour sécuriser les fonds.

Le problème commence lorsque l'opérateur, et non un simple utilisateur, est la partie agissant de manière malveillante. Parce que l'opérateur a le contrôle exclusif de la chaîne de blocs, il est davantage incité à faire avancer des transitions d'état invalides à plus grande échelle, comme le vol de fonds appartenant aux utilisateurs sur la chaîne Plasma.

Dans ce cas, l'utilisation du système classique de preuve de fraude ne fonctionne pas. L'opérateur pourrait facilement effectuer une transaction invalide transférant les fonds d'Alice et de Bob vers son portefeuille et cacher les données nécessaires à la création de la preuve de fraude. Cela est possible car l'opérateur n'est pas tenu de rendre les données disponibles aux utilisateurs ou au Réseau principal.

Par conséquent, la solution la plus optimiste est de tenter une « sortie massive » des utilisateurs de la chaîne Plasma. La sortie massive ralentit le plan de l'opérateur malveillant visant à voler des fonds et offre une certaine mesure de protection aux utilisateurs. Les demandes de retrait sont ordonnées en fonction du moment où chaque UTXO (ou jeton) a été créé, empêchant les opérateurs malveillants de faire du front-running sur les utilisateurs honnêtes.

Néanmoins, nous avons toujours besoin d'un moyen de vérifier la validité des demandes de retrait lors d'une sortie massive — pour empêcher les individus opportunistes de profiter du chaos en traitant des sorties invalides. La solution est simple : exiger des utilisateurs qu'ils publient le dernier **état valide de la chaîne** pour retirer leur argent.

Mais cette approche pose toujours des problèmes. Par exemple, si tous les utilisateurs d'une chaîne Plasma doivent sortir (ce qui est possible dans le cas d'un opérateur malveillant), alors l'intégralité de l'état valide de la chaîne Plasma doit être déversée sur la couche de base d'Ethereum en une seule fois. Avec la taille arbitraire des chaînes Plasma (débit élevé = plus de données) et les contraintes sur les vitesses de traitement d'Ethereum, ce n'est pas une solution idéale.

Bien que les jeux de sortie semblent intéressants en théorie, les sorties massives dans la vie réelle déclencheront probablement une congestion à l'échelle du réseau sur Ethereum lui-même. En plus de nuire à la fonctionnalité d'Ethereum, une sortie massive mal coordonnée signifie que les utilisateurs pourraient être incapables de retirer des fonds avant que l'opérateur ne vide chaque compte sur la chaîne Plasma.

## Avantages et inconvénients de Plasma {#pros-and-cons-of-plasma}

| Avantages                                                                                                                                                                                                                                        | Inconvénients                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Offre un débit élevé et un faible coût par transaction.                                                                                                                                                                                          | Ne prend pas en charge le calcul général (ne peut pas exécuter de contrats intelligents). Seuls les transferts de jetons de base, les échanges et quelques autres types de transactions sont pris en charge via la logique des prédicats. |
| Idéal pour les transactions entre utilisateurs arbitraires (pas de frais généraux par paire d'utilisateurs si les deux sont établis sur la chaîne Plasma).                                                                                       | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour assurer la sécurité de vos fonds.                                       |
| Les chaînes Plasma peuvent être adaptées à des cas d'utilisation spécifiques qui ne sont pas liés à la chaîne principale. N'importe qui, y compris les entreprises, peut personnaliser les contrats intelligents Plasma pour fournir une infrastructure évolutive qui fonctionne dans différents contextes. | Repose sur un ou plusieurs opérateurs pour stocker les données et les servir sur demande.                                                                                                    |
| Réduit la charge sur le réseau principal Ethereum en déplaçant le calcul et le stockage hors chaîne.                                                                                                                                             | Les retraits sont retardés de plusieurs jours pour permettre les contestations. Pour les actifs fongibles, cela peut être atténué par les fournisseurs de liquidité, mais il y a un coût en capital associé. |
|                                                                                                                                                                                                                                                  | Si trop d'utilisateurs essaient de sortir simultanément, le réseau principal Ethereum pourrait être congestionné.                                                                                            |

## Plasma vs protocoles de mise à l'échelle de couche 2 {#plasma-vs-layer-2}

Bien que Plasma ait été autrefois considéré comme une solution de mise à l'échelle utile pour Ethereum, il a depuis été abandonné au profit des [protocoles de mise à l'échelle de couche 2 (l2)](/layer-2/). Les solutions de mise à l'échelle l2 remédient à plusieurs problèmes de Plasma :

### Efficacité {#efficiency}

Les [rollups à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups) génèrent des preuves cryptographiques de la validité de chaque lot de transactions traité hors chaîne. Cela empêche les utilisateurs (et les opérateurs) de faire avancer des transitions d'état invalides, éliminant ainsi le besoin de périodes de contestation et de jeux de sortie. Cela signifie également que les utilisateurs n'ont pas à surveiller la chaîne périodiquement pour sécuriser leurs fonds.

### Prise en charge des contrats intelligents {#support-for-smart-contracts}

Un autre problème avec le cadre de travail Plasma était [l'incapacité de prendre en charge l'exécution des contrats intelligents Ethereum](https://ethresear.ch/t/why-smart-contracts-are-not-feasible-on-plasma/2598/4). En conséquence, la plupart des implémentations de Plasma ont été principalement construites pour des paiements simples ou l'échange de jetons ERC-20.

À l'inverse, les rollups optimistes sont compatibles avec la [Machine Virtuelle Ethereum](/developers/docs/evm/) et peuvent exécuter des [contrats intelligents](/developers/docs/smart-contracts/) natifs d'Ethereum, ce qui en fait une solution utile et _sécurisée_ pour la mise à l'échelle des [applications décentralisées](/developers/docs/dapps/). De même, des plans sont en cours pour [créer une implémentation à divulgation nulle de connaissance de l'EVM (zkEVM)](https://ethresear.ch/t/a-zk-evm-specification/11549) qui permettrait aux ZK-rollups de traiter une logique arbitraire et d'exécuter des contrats intelligents.

### Indisponibilité des données {#data-unavailability}

Comme expliqué précédemment, Plasma souffre d'un problème de disponibilité des données. Si un opérateur malveillant faisait avancer une transition invalide sur la chaîne Plasma, les utilisateurs seraient incapables de la contester puisque l'opérateur peut retenir les données nécessaires pour créer la preuve de fraude. Les rollups résolvent ce problème en forçant les opérateurs à publier les données de transaction sur Ethereum, permettant à quiconque de vérifier l'état de la chaîne et de créer des preuves de fraude si nécessaire.

### Problème de sortie massive {#mass-exit-problem}

Les ZK-rollups et les rollups optimistes résolvent tous deux le problème de sortie massive de Plasma de diverses manières. Par exemple, un ZK-rollup s'appuie sur des mécanismes cryptographiques qui garantissent que les opérateurs ne peuvent voler les fonds des utilisateurs sous aucun scénario.

De même, les rollups optimistes imposent une période de délai sur les retraits pendant laquelle n'importe qui peut initier une contestation et empêcher les demandes de retrait malveillantes. Bien que cela soit similaire à Plasma, la différence est que les vérificateurs ont accès aux données nécessaires pour créer des preuves de fraude. Ainsi, il n'est pas nécessaire pour les utilisateurs de rollup de s'engager dans une migration frénétique du type « le premier sorti » vers le réseau principal Ethereum.

## En quoi Plasma diffère-t-il des chaînes latérales et du sharding ? {#plasma-sidechains-sharding}

Plasma, les chaînes latérales et le sharding sont assez similaires car ils se connectent tous au réseau principal Ethereum d'une manière ou d'une autre. Cependant, le niveau et la force de ces connexions varient, ce qui affecte les propriétés de sécurité de chaque solution de mise à l'échelle.

### Plasma vs chaînes latérales {#plasma-vs-sidechains}

Une [chaîne latérale](/developers/docs/scaling/sidechains/) est une chaîne de blocs exploitée indépendamment et connectée au réseau principal Ethereum via un pont bidirectionnel. Les [ponts](/bridges/) permettent aux utilisateurs d'échanger des jetons entre les deux chaînes de blocs pour effectuer des transactions sur la chaîne latérale, réduisant ainsi la congestion sur le réseau principal Ethereum et améliorant la mise à l'échelle.
Les chaînes latérales utilisent un mécanisme de consensus distinct et sont généralement beaucoup plus petites que le réseau principal Ethereum. En conséquence, le transfert d'actifs vers ces chaînes implique un risque accru ; étant donné le manque de garanties de sécurité héritées du réseau principal Ethereum dans le modèle de chaîne latérale, les utilisateurs risquent la perte de fonds lors d'une attaque sur la chaîne latérale.

À l'inverse, les chaînes Plasma tirent leur sécurité du Réseau principal. Cela les rend considérablement plus sûres que les chaînes latérales. Les chaînes latérales et les chaînes Plasma peuvent avoir des protocoles de consensus différents, mais la différence est que les chaînes Plasma publient des racines de Merkle pour chaque bloc sur le réseau principal Ethereum. Les racines de bloc sont de petits éléments d'information que nous pouvons utiliser pour vérifier les informations sur les transactions qui se produisent sur une chaîne Plasma. Si une attaque se produit sur une chaîne Plasma, les utilisateurs peuvent retirer leurs fonds en toute sécurité vers le Réseau principal en utilisant les preuves appropriées.

### Plasma vs sharding {#plasma-vs-sharding}

Les chaînes Plasma et les chaînes de fragments publient périodiquement des preuves cryptographiques sur le réseau principal Ethereum. Cependant, les deux ont des propriétés de sécurité différentes.

Les chaînes de fragments engagent des « en-têtes de collation » sur le Réseau principal contenant des informations détaillées sur chaque fragment de données. Les nœuds sur le Réseau principal vérifient et appliquent la validité des fragments de données, réduisant la possibilité de transitions de fragments invalides et protégeant le réseau contre les activités malveillantes.

Plasma est différent car le Réseau principal ne reçoit que des informations minimales sur l'état des chaînes enfants. Cela signifie que le Réseau principal ne peut pas vérifier efficacement les transactions effectuées sur les chaînes enfants, ce qui les rend moins sécurisées.

**Remarque** : le sharding de la chaîne de blocs Ethereum n'est plus sur la feuille de route. Il a été remplacé par la mise à l'échelle via les rollups et le [danksharding](/roadmap/danksharding).

### Utiliser Plasma {#use-plasma}

Plusieurs projets fournissent des implémentations de Plasma que vous pouvez intégrer dans vos dapps :

- [Polygon](https://polygon.technology/) (anciennement Matic Network)

## Lectures complémentaires

- [Un petit rappel de ce que signifie la « sécurité partagée » et pourquoi elle est si importante](https://old.reddit.com/r/ethereum/comments/sgd3zt/a_quick_reminder_of_what_shared_security_means/)
- [Chaînes latérales vs Plasma vs Sharding](https://vitalik.eth.limo/general/2019/06/12/plasma_vs_sharding.html)
- [Comprendre Plasma, Partie 1 : Les bases](https://www.theblockcrypto.com/amp/post/10793/understanding-plasma-part-1-the-basics)
- [La vie et la mort de Plasma](https://medium.com/dragonfly-research/the-life-and-death-of-plasma-b72c6a59c5ad#)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_
## Tutoriels : Chaînes Plasma sur Ethereum {#tutorials}

- [Écrire un plasma spécifique à une application qui préserve la confidentialité](/developers/tutorials/app-plasma/) _– Construisez une application Plasma préservant la confidentialité en utilisant des preuves à divulgation nulle de connaissance et des composants hors chaîne._
