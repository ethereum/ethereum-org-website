---
title: Validium
description: Une introduction au Validium en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Validium est une [solution de mise à l'échelle](/developers/docs/scaling/) qui renforce l'intégrité des transactions à l'aide de preuves de validité telles que des[ ZK-rollups](/developers/docs/scaling/zk-rollups/), mais ne stocke pas les données de transaction sur le réseau principal Ethereum. Alors que la disponibilité des données hors chaîne introduit des compromis, elle peut conduire à des améliorations massives de l'évolutivité (les validiums peuvent traiter [~9 000 transactions ou plus par seconde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prérequis {#prerequisites}

Vous devez avoir lu et compris notre page sur [la mise à l'échelle d'Ethereum](/developers/docs/scaling/) et [la couche 2](/layer-2).

## Qu'est-ce qu'un validium ? {#what-is-validium}

Les validiums sont des solutions de mise à l'échelle qui utilisent la disponibilité et le calcul des données hors chaîne conçus pour améliorer le débit en traitant les transactions à partir du réseau principal Ethereum. Comme les rollups à connaissance nulle (ZK-rollups), les validiums publient [des preuves à connaissance nulle](/glossary/#zk-proof) pour vérifier les transactions hors chaîne sur Ethereum. Cela permet d'éviter les transitions d'état invalides et de renforcer les garanties de sécurité d'une chaîne de validium.

Ces « preuves de validité » peuvent prendre la forme de ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou de ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). Plus d'informations sur [les preuves de zero-knowledge](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Les fonds appartenant aux utilisateurs de Validium sont contrôlés par un contrat intelligent sur Ethereum. Les validiums offrent des retraits quasi-instantanés, un peu comme les ZK-rollups ; une fois que la preuve de validité d'une demande de retrait a été vérifiée sur le réseau principal, les utilisateurs peuvent retirer des fonds en fournissant [des preuves de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La preuve de Merkle valide l'inclusion de la transaction de retrait de l'utilisateur dans un lot de transactions vérifiées, ce qui permet au contrat en chaîne de traiter le retrait.

Cependant, les utilisateurs de validium peuvent voir leurs fonds gelés et leurs retraits restreints. Cela peut se produire si les gestionnaires de la disponibilité des données sur la chaîne de validium retiennent les données d'état hors chaîne pour les utilisateurs. Sans accès aux données de transaction, les utilisateurs ne peuvent pas calculer la preuve de Merkle nécessaire pour prouver la propriété des fonds et exécuter les retraits.

C'est la principale différence entre les validiums et les ZK-rollups : leur position sur le spectre de la disponibilité des données. Les deux solutions abordent le stockage des données de manière différente, ce qui a des répercussions sur la sécurité et la fiabilité.

## Comment les validiums interagissent-ils avec Ethereum ? {#how-do-validiums-interact-with-ethereum}

Les validiums sont des protocoles de mise à l'échelle construits au-dessus de la chaîne Ethereum existante. Bien qu'elle exécute des transactions hors chaîne, une chaîne validium est administrée par un ensemble de contrats intelligents déployés sur le réseau principal, notamment :

1. **Contrat du vérificateur** : Le contrat du vérificateur vérifie la validité des preuves soumises par l'opérateur du validium lors des mises à jour de l'état. Il s'agit de preuves de validité attestant de l'exactitude des transactions hors chaîne et de preuves de disponibilité des données vérifiant l'existence des données des transactions hors chaîne.

2. **Contrat principal** : Le contrat principal stocke les engagements d'état (racines de Merkle) soumis par les producteurs de blocs et met à jour l'état du validium une fois qu'une preuve de validité est vérifiée sur la chaîne. Ce contrat traite également les dépôts et les retraits de la chaîne validium.

Les validiums s'appuient également sur la chaîne principale d'Ethereum pour les éléments suivants :

### Règlement {#settlement}

Les transactions exécutées sur un validium ne peuvent pas être entièrement confirmées tant que la chaîne mère ne vérifie pas leur validité. Toutes les affaires menées sur un validium doivent finalement être réglées sur le réseau principal. La blockchain Ethereum offre également des « garanties de règlement » aux utilisateurs de validium, ce qui signifie que les transactions hors chaîne ne peuvent pas être annulées ou modifiées une fois qu'elles sont engagées sur la chaîne.

### Sécurité {#security}

Ethereum, agissant comme une couche de règlement, garantit également la validité des transitions d'état sur le validium. Les transactions hors chaîne exécutées sur la chaîne validium sont vérifiées via un contrat intelligent sur la couche Ethereum de base.

Si le contrat du vérificateur sur la chaîne juge la preuve invalide, les transactions sont rejetées. Cela signifie que les opérateurs doivent satisfaire aux conditions de validité imposées par le protocole Ethereum avant de mettre à jour l'état du validium.

## Comment fonctionne le validium ? {#how-does-validium-work}

### Transactions {#transactions}

Les utilisateurs soumettent des transactions à l'opérateur, un nœud responsable de l'exécution des transactions sur la chaîne du validium. Certains validiums peuvent utiliser un seul opérateur pour exécuter la chaîne ou s'appuyer sur un [mécanisme de preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/) pour la rotation des opérateurs.

L'opérateur regroupe les transactions en un lot et l'envoie à un circuit de validation pour validation. Le circuit de preuve accepte le lot de transactions (et d'autres données pertinentes) comme entrées et produit une preuve de validité vérifiant que les opérations ont été effectuées correctement.

### Engagements d'état {#state-commitments}

L'état du validium est haché sous la forme d'un arbre de Merkle dont la racine est stockée dans le contrat principal sur Ethereum. La racine Merkle, également connue sous le nom de racine d'état, agit comme un engagement cryptographique de l'état actuel des comptes et des soldes sur le validium.

Pour effectuer une mise à jour d'état, l'opérateur doit calculer une nouvelle racine d'état (après avoir exécuté des transactions) et la soumettre au contrat en chaîne. Si la preuve de validité est vérifiée, l'état proposé est accepté et le validium passe à la racine du nouvel état.

### Dépôts et retraits {#deposits-and-withdrawals}

Les utilisateurs transfèrent des fonds d'Ethereum vers un validium en déposant de l'ETH (ou tout jeton compatible avec l'ERC) dans le contrat en chaîne. Le contrat transmet l'événement de dépôt au validium hors chaîne, où l'adresse de l'utilisateur est créditée d'un montant égal à son dépôt. L'opérateur inclut également cette opération de dépôt dans un nouveau lot.

Pour transférer des fonds sur le Mainnet, un utilisateur de validium initie une transaction de retrait et la soumet à l'opérateur qui valide la demande de retrait et l'inclut dans un lot. Les actifs de l'utilisateur sur la chaîne du validium sont également détruits avant qu'il ne puisse sortir du système. Une fois que la preuve de validité associée au lot est vérifiée, l'utilisateur peut appeler le contrat principal pour retirer le reste de son dépôt initial.

Comme mécanisme anti-censure, le protocole validium permet aux utilisateurs de se retirer directement du contrat validium sans passer par l'opérateur. Dans ce cas, les utilisateurs doivent fournir au contrat du vérificateur une preuve de Merkle montrant l'inclusion d'un compte dans la racine de l'état. Si la preuve est acceptée, l'utilisateur peut appeler la fonction de retrait du contrat principal pour sortir ses fonds du validium.

### Soumission par lot {#batch-submission}

Après avoir exécuté un lot de transactions, l'opérateur soumet la preuve de validité associée au contrat du vérificateur et propose une nouvelle racine d'état au contrat principal. Si la preuve est valide, le contrat principal met à jour l'état du validium et finalise les résultats des transactions du lot.

Contrairement à un rollup ZK les producteurs de blocs sur un validium ne sont pas tenus de publier les données de transaction pour les lots de transactions (seulement les en-têtes de blocs). Cela fait de Validium un protocole de mise à l'échelle purement hors chaîne, par opposition aux protocoles de mise à l'échelle « hybrides » (c'est-à-dire de [layer 2](/layer-2/)) qui publient des données d'état sur la chaîne principale d'Ethereum en tant que `calldata`.

### Disponibilité des données {#data-availability}

Comme nous l'avons mentionné, les validiums utilisent un modèle de disponibilité des données hors chaîne, dans lequel les opérateurs stockent toutes les données de transaction hors du réseau principal Ethereum. La faible empreinte des données sur la chaîne de Validium améliore l'évolutivité (le débit n'est pas limité par la capacité de traitement des données d'Ethereum) et réduit les frais d'utilisation (le coût de publication des `calldata` est plus faible).

La disponibilité des données hors chaîne pose toutefois un problème : les données nécessaires à la création ou à la vérification des preuves de Merkle peuvent être indisponibles. Cela signifie que les utilisateurs peuvent être incapables de retirer des fonds du contrat sur la chaîne si les opérateurs agissent de manière malveillante.

Diverses solutions de validium tentent de résoudre ce problème en décentralisant le stockage des données d'état. Il s'agit d'obliger les producteurs de blocs à envoyer les données sous-jacentes à des « gestionnaires de disponibilité des données » chargés de stocker les données hors chaîne et de les mettre à la disposition des utilisateurs sur demande.

Les gestionnaires de la disponibilité des données de Validium attestent de la disponibilité des données pour les transactions hors chaîne en signant chaque lot de Validium. Ces signatures constituent une forme de « preuve de disponibilité » que le contrat du vérificateur de la chaîne vérifie avant d'approuver les mises à jour d'état.

Les validiums diffèrent dans leur approche de la gestion de la disponibilité des données. Certains s'appuient sur des parties de confiance pour stocker les données d'état, tandis que d'autres utilisent des validateurs désignés de manière aléatoire pour cette tâche.

#### Comité de disponibilité des données (DAC) {#data-availability-committee}

Pour garantir la disponibilité des données hors chaîne, certaines solutions de validium désignent un groupe d'entités de confiance, appelé collectivement comité de disponibilité des données (DAC), pour stocker des copies de l'état et fournir une preuve de la disponibilité des données. Les DAC sont plus faciles à mettre en œuvre et nécessitent moins de coordination car le nombre de membres est faible.

Cependant, les utilisateurs doivent faire confiance au DAC pour rendre les données disponibles en cas de besoin (par exemple, pour générer des preuves de Merkle). Il y a la possibilité que les membres des comités de disponibilité des données [soient compromis par un acteur malveillant](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) qui peut alors retenir les données hors chaîne.

[Plus d'informations sur les comités de disponibilité des données dans les validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilité des données liées {#bonded-data-availability}

D'autres validiums exigent que les participants chargés de stocker des données hors ligne mettent en jeu (c'est-à-dire verrouillent) des jetons dans un contrat intelligent avant d'assumer leur rôle. Cet enjeu sert de « lien » pour garantir un comportement honnête entre les gestionnaires de la disponibilité des données et réduit les hypothèses de confiance. Si ces participants ne parviennent pas à prouver la disponibilité des données, la caution est réduite.

Dans un système de mise à disposition des données sous caution, n'importe qui peut être désigné pour détenir des données hors chaîne dès lors qu'il fournit la mise requise. Cela élargit le groupe de gestionnaires de la disponibilité des données éligibles, réduisant ainsi la centralisation qui affecte les comités de disponibilité des données (DAC). Plus important encore, cette approche s'appuie sur des incitations cryptoéconomiques pour prévenir les activités malveillantes, ce qui est considérablement plus sûr que de désigner des parties de confiance pour sécuriser les données hors ligne dans le validium.

[Plus d'informations sur la disponibilité des données cautionnées dans les validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions et validium {#volitions-and-validium}

Les validiums offrent de nombreux avantages mais s'accompagnent de contreparties (notamment la disponibilité des données). Mais, comme pour de nombreuses solutions de mise à l'échelle, les validiums sont adaptés à des cas d'utilisation spécifiques - c'est pourquoi les volitions ont été créées.

Les volitions combinent un rollup ZK et une chaîne validium et permettent aux utilisateurs de basculer entre les deux solutions d'échelonnement. Avec volitions, les utilisateurs peuvent profiter de la disponibilité des données hors chaîne de Validium pour certaines transactions, tout en gardant la liberté de passer à une solution de disponibilité des données en chaîne (rollup ZK) si nécessaire. Cela donne essentiellement aux utilisateurs la liberté de choisir des compromis en fonction de leur situation particulière.

Une bourse décentralisée (DEX) peut préférer utiliser l'infrastructure évolutive et privée d'un validium pour les transactions de grande valeur. Elle peut également utiliser un rollup ZK pour les utilisateurs qui souhaitent bénéficier des garanties de sécurité plus élevées et de la fiabilité d'un rollup ZK.

## Validiums et compatibilité EVM {#validiums-and-evm-compatibility}

Comme les rollups ZK, les validiums sont surtout adaptés à des applications simples, comme les échanges de jetons et les paiements. La prise en charge du calcul général et de l'exécution de contrats intelligents parmi les validiums est difficile à mettre en œuvre, compte tenu de la surcharge considérable que représente la preuve des instructions [EVM](/developers/docs/evm/) dans un circuit de preuve à connaissance nulle (ZK).

Certains projets de validium tentent de contourner ce problème en compilant des langages compatibles avec l'EVM (par exemple, Solidity, Vyper) pour créer un bytecode personnalisé optimisé pour une preuve efficace. L'inconvénient de cette approche est que les nouvelles VM respectueuses de la preuve de connaissance zéro peuvent ne pas prendre en charge des codes d'opérations EVM importants, et les développeurs doivent écrire directement dans le langage de haut niveau pour une expérience optimale. Cela crée encore plus de problèmes : cela oblige les développeurs à construire des dApps avec une pile de développement entièrement nouvelle et rompt la compatibilité avec l'infrastructure Ethereum actuelle.

Certaines équipes tentent toutefois d'optimiser les codes d'opérations EVM existants pour les circuits de preuve de connaissance zéro. Cela aboutira au développement d'une machine virtuelle Ethereum à connaissance zéro (zkEVM), une VM compatible avec l'EVM qui produit des preuves pour vérifier l'exactitude de l'exécution des programmes. Avec une zkEVM, les chaînes validium peuvent exécuter des contrats intelligents hors chaîne et soumettre des preuves de validité pour vérifier un calcul hors chaîne (sans avoir à l'exécuter à nouveau) sur Ethereum.

[Plus d'informations sur les zkEVM](https://www.alchemy.com/overviews/zkevm).

## Comment les validiums font-ils évoluer Ethereum ? {#scaling-ethereum-with-validiums}

### 1. Stockage de données hors chaîne {#off-chain-data-storage}

Les projets de mise à l'échelle de la couche 2, tels que les rollups optimistes et les rollups ZK, échangent l'extensibilité infinie des protocoles de mise à l'échelle hors chaîne purs (par exemple, [Plasma](/developers/docs/scaling/plasma/)) contre la sécurité en publiant certaines données de transaction sur L1. Mais cela signifie que les propriétés d'évolutivité des rollups sont limitées par la bande passante des données sur le réseau principal d'Ethereum ([la fragementation des données](/roadmap/danksharding/) propose d'améliorer la capacité de stockage des données d'Ethereum pour cette raison).

Les validiums atteignent l'évolutivité en conservant toutes les données de transaction hors chaîne et en ne publiant que les engagements d'état (et les preuves de validité) lorsqu'ils relaient les mises à jour d'état à la chaîne Ethereum principale. L'existence de preuves de validité donne toutefois aux validiums des garanties de sécurité plus élevées que d'autres solutions de mise à l'échelle hors chaîne pures, notamment Plasma et [les chaînes latérales](/developers/docs/scaling/sidechains/). En réduisant la quantité de données qu'Ethereum doit traiter avant de valider les transactions hors chaîne, les conceptions de validium augmentent considérablement le débit sur le réseau principal.

### 2. Preuves récursives {#recursive-proofs}

Une preuve récursive est une preuve de validité qui vérifie la validité d'autres preuves. Ces « preuves de preuves » sont générées par l'agrégation récursive de plusieurs preuves jusqu'à ce qu'une preuve finale vérifiant toutes les preuves précédentes soit créée. Les preuves récursives augmentent la vitesse de traitement de la blockchain en augmentant le nombre de transactions qui peuvent être vérifiées par preuve de validité.

En général, chaque preuve de validité que l'opérateur de validium soumet à Ethereum pour vérification valide l'intégrité d'un seul bloc. Alors qu'une seule preuve récursive peut être utilisée pour confirmer la validité de plusieurs blocs de validium en même temps - ceci est possible puisque le circuit de preuve peut agréger récursivement plusieurs preuves de blocs en une preuve finale. Si le contrat du vérificateur sur la chaîne accepte la preuve récursive, tous les blocs sous-jacents sont finalisés immédiatement.

## Les avantages et inconvénients du validium {#pros-and-cons-of-validium}

| Avantages                                                                                                                                                            | Inconvénients                                                                                                                                                                                              |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les preuves de validité assurent l'intégrité des transactions hors chaîne et empêchent les opérateurs de finaliser des mises à jour d'état invalides.                | La production de preuves de validité nécessite un matériel spécial, ce qui pose un risque de centralisation.                                                                                               |
| Augmente l'efficacité du capital pour les utilisateurs (pas de retard dans le retrait des fonds vers Ethereum)                                                       | Prise en charge limitée du calcul général et des contrats intelligents ; langages spécialisés requis pour le développement.                                                                                |
| Aucune vulnérabilité à certaines attaques économiques auxquelles sont confrontés les systèmes basés sur les preuves de fraude dans des applications à valeur élevée. | Une puissance de calcul élevée est nécessaire pour générer les preuves ZK ; non rentable pour les applications à faible débit.                                                                             |
| Réduit les frais de gaz pour les utilisateurs en ne publiant pas les données d'appel sur le réseau principal d'Ethereum.                                             | Finalité subjective plus lente (10-30 min pour générer une preuve ZK) mais plus rapide jusqu'à la finalité complète car il n'y a pas de délai de contestation.                                             |
| Adapté à des cas d'utilisation spécifiques, comme le commerce ou les jeux de blockchain, qui privilégient la confidentialité des transactions et l'évolutivité.      | Les utilisateurs peuvent être empêchés de retirer des fonds, car la génération de preuves de propriété Merkle nécessite que les données hors chaîne soient disponibles à tout moment.                      |
| La disponibilité des données hors chaîne offre des niveaux de débit plus élevés et augmente l'évolutivité.                                                           | Le modèle de sécurité repose sur des hypothèses de confiance et des incitations crypto-économiques, contrairement aux rollups ZK, qui reposent uniquement sur des mécanismes de sécurité cryptographiques. |

### Utiliser Validium/Volitions {#use-validium-and-volitions}

De multiples projets fournissent des implémentations de Validium et de volitions que vous pouvez intégrer dans vos dApps :

**StarkWare StarkEx** - _StarkEx est une solution d'évolutivité de la couche 2 (L2) d'Ethereum qui repose sur des preuves de validité. Il peut fonctionner en mode de disponibilité des données Rollup ZK ou Validium._

- [Documentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Site Web](https://starkware.co/starkex/)

**Matter Labs zkPorter**- _zkPorter est un protocole de mise à l'échelle de couche 2 s'attaquant à la disponibilité des données avec une approche hybride qui combine les idées de rollup ZK et de fragmentation. Il peut prendre en charge un nombre arbitraire de fragments, chacun ayant sa propre politique de disponibilité des données._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentation](https://docs.zksync.io/zk-stack/concepts/data-availability)
- [Site Web](https://zksync.io/)

## Complément d'information {#further-reading}

- [Validium et The Layer 2 Two-By-Two - Numéro 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Rollups ZK vs Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition et le spectre émergent de la disponibilité des données](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Rollups, Validiums, et Volitions : Découvrez les solutions de mise à l'échelle d'Ethereum les plus récentes](https://www.defipulse.com/blog/rollups-validiums-and-volitions-learn-about-the-hottest-ethereum-scaling-solutions)
