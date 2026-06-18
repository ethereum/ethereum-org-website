---
title: Validium
description: Une introduction au validium en tant que solution de mise à l'échelle actuellement utilisée par la communauté Ethereum.
lang: fr
sidebarDepth: 3
---

Le validium est une [solution de mise à l'échelle](/developers/docs/scaling/) qui garantit l'intégrité des transactions à l'aide de preuves de validité comme les [ZK-rollups](/developers/docs/scaling/zk-rollups/), mais qui ne stocke pas les données de transaction sur le [réseau principal Ethereum](/). Bien que la disponibilité des données hors chaîne introduise des compromis, elle peut conduire à des améliorations massives de la mise à l'échelle (les validiums peuvent traiter [~9 000 transactions, ou plus, par seconde](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)).

## Prérequis {#prerequisites}

Vous devriez avoir lu et compris notre page sur la [mise à l'échelle d'Ethereum](/developers/docs/scaling/) et la [couche 2 (l2)](/layer-2).

## Qu'est-ce que le validium ? {#what-is-validium}

Les validiums sont des solutions de mise à l'échelle qui utilisent la disponibilité des données et le calcul hors chaîne conçus pour améliorer le débit en traitant les transactions en dehors du réseau principal Ethereum. Comme les rollups à divulgation nulle de connaissance (ZK-rollups), les validiums publient des [preuves à divulgation nulle de connaissance](/glossary/#zk-proof) pour vérifier les transactions hors chaîne sur Ethereum. Cela empêche les transitions d'état invalides et renforce les garanties de sécurité d'une chaîne validium.

Ces « preuves de validité » peuvent prendre la forme de ZK-SNARKs (Zero-Knowledge Succinct Non-Interactive Argument of Knowledge) ou de ZK-STARKs (Zero-Knowledge Scalable Transparent ARgument of Knowledge). En savoir plus sur les [preuves à divulgation nulle de connaissance](https://consensys.net/blog/blockchain-explained/zero-knowledge-proofs-starks-vs-snarks/).

Les fonds appartenant aux utilisateurs de validium sont contrôlés par un contrat intelligent sur Ethereum. Les validiums offrent des retraits quasi instantanés, tout comme les ZK-rollups ; une fois que la preuve de validité d'une demande de retrait a été vérifiée sur le réseau principal, les utilisateurs peuvent retirer des fonds en fournissant des [preuves de Merkle](/developers/tutorials/merkle-proofs-for-offline-data-integrity/). La preuve de Merkle valide l'inclusion de la transaction de retrait de l'utilisateur dans un lot de transactions vérifié, permettant au contrat onchain de traiter le retrait.

Cependant, les utilisateurs de validium peuvent voir leurs fonds gelés et leurs retraits restreints. Cela peut se produire si les gestionnaires de la disponibilité des données sur la chaîne validium cachent les données d'état hors chaîne aux utilisateurs. Sans accès aux données de transaction, les utilisateurs ne peuvent pas calculer la preuve de Merkle requise pour prouver la propriété des fonds et exécuter les retraits.

C'est la différence majeure entre les validiums et les ZK-rollups : leurs positions sur le spectre de la disponibilité des données. Les deux solutions abordent le stockage des données différemment, ce qui a des implications pour la sécurité et l'absence de confiance requise.

## Comment les validiums interagissent-ils avec Ethereum ? {#how-do-validiums-interact-with-ethereum}

Les validiums sont des protocoles de mise à l'échelle construits par-dessus la chaîne Ethereum existante. Bien qu'elle exécute des transactions hors chaîne, une chaîne validium est administrée par un ensemble de contrats intelligents déployés sur le réseau principal, notamment :

1. **Contrat vérificateur** : Le contrat vérificateur vérifie la validité des preuves soumises par l'opérateur du validium lors des mises à jour d'état. Cela inclut les preuves de validité attestant de l'exactitude des transactions hors chaîne et les preuves de disponibilité des données vérifiant l'existence des données de transaction hors chaîne.

2. **Contrat principal** : Le contrat principal stocke les engagements d'état (racines de Merkle) soumis par les producteurs de blocs et met à jour l'état du validium une fois qu'une preuve de validité est vérifiée onchain. Ce contrat traite également les dépôts et les retraits de la chaîne validium.

Les validiums s'appuient également sur la chaîne principale Ethereum pour ce qui suit :

### Règlement {#settlement}

Les transactions exécutées sur un validium ne peuvent pas être entièrement confirmées tant que la chaîne parente n'a pas vérifié leur validité. Toutes les opérations menées sur un validium doivent finalement faire l'objet d'un règlement sur le réseau principal. La chaîne de blocs Ethereum fournit également des « garanties de règlement » pour les utilisateurs de validium, ce qui signifie que les transactions hors chaîne ne peuvent pas être annulées ou modifiées une fois engagées onchain.

### Sécurité {#security}

Ethereum, agissant comme une couche de règlement, garantit également la validité des transitions d'état sur le validium. Les transactions hors chaîne exécutées sur la chaîne validium sont vérifiées via un contrat intelligent sur la couche de base Ethereum.

Si le contrat vérificateur onchain juge la preuve invalide, les transactions sont rejetées. Cela signifie que les opérateurs doivent satisfaire aux conditions de validité imposées par le protocole Ethereum avant de mettre à jour l'état du validium.

## Comment fonctionne le validium ? {#how-does-validium-work}

### Transactions {#transactions}

Les utilisateurs soumettent des transactions à l'opérateur, un nœud responsable de l'exécution des transactions sur la chaîne validium. Certains validiums peuvent utiliser un opérateur unique pour exécuter la chaîne ou s'appuyer sur un mécanisme de [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/) pour la rotation des opérateurs.

L'opérateur agrège les transactions en un lot et l'envoie à un circuit de preuve pour vérification. Le circuit de preuve accepte le lot de transactions (et d'autres données pertinentes) comme entrées et produit une preuve de validité vérifiant que les opérations ont été effectuées correctement.

### Engagements d'état {#state-commitments}

L'état du validium est haché sous forme d'arbre de Merkle avec la racine stockée dans le contrat principal sur Ethereum. La racine de Merkle, également connue sous le nom de racine d'état, agit comme un engagement cryptographique envers l'état actuel des comptes et des soldes sur le validium.

Pour effectuer une mise à jour d'état, l'opérateur doit calculer une nouvelle racine d'état (après avoir exécuté les transactions) et la soumettre au contrat onchain. Si la preuve de validité est confirmée, l'état proposé est accepté et le validium passe à la nouvelle racine d'état.

### Dépôts et retraits {#deposits-and-withdrawals}

Les utilisateurs déplacent des fonds d'Ethereum vers un validium en déposant des ETH (ou tout jeton compatible ERC) dans le contrat onchain. Le contrat relaie l'événement de dépôt au validium hors chaîne, où l'adresse de l'utilisateur est créditée d'un montant égal à son dépôt. L'opérateur inclut également cette transaction de dépôt dans un nouveau lot.

Pour ramener des fonds sur le réseau principal, un utilisateur de validium initie une transaction de retrait et la soumet à l'opérateur qui valide la demande de retrait et l'inclut dans un lot. Les actifs de l'utilisateur sur la chaîne validium sont également détruits avant qu'il ne puisse effectuer une sortie du système. Une fois la preuve de validité associée au lot vérifiée, l'utilisateur peut appeler le contrat principal pour retirer le reste de son dépôt initial.

En tant que mécanisme anti-censure, le protocole validium permet aux utilisateurs de retirer directement depuis le contrat validium sans passer par l'opérateur. Dans ce cas, les utilisateurs doivent fournir une preuve de Merkle au contrat vérificateur montrant l'inclusion d'un compte dans la racine d'état. Si la preuve est acceptée, l'utilisateur peut appeler la fonction de retrait du contrat principal pour sortir ses fonds du validium.

### Soumission de lots {#batch-submission}

Après avoir exécuté un lot de transactions, l'opérateur soumet la preuve de validité associée au contrat vérificateur et propose une nouvelle racine d'état au contrat principal. Si la preuve est valide, le contrat principal met à jour l'état du validium et finalise les résultats des transactions dans le lot.

Contrairement à un ZK-rollup, les producteurs de blocs sur un validium ne sont pas tenus de publier les données de transaction pour les lots de transactions (uniquement les en-têtes de blocs). Cela fait du validium un protocole de mise à l'échelle purement hors chaîne, par opposition aux protocoles de mise à l'échelle « hybrides » (c'est-à-dire la [couche 2 (l2)](/layer-2/)) qui publient des données d'état sur la chaîne principale Ethereum en utilisant des données de blob, `calldata`, ou une combinaison des deux.

### Disponibilité des données {#data-availability}

Comme mentionné, les validiums utilisent un modèle de disponibilité des données hors chaîne, où les opérateurs stockent toutes les données de transaction en dehors du réseau principal Ethereum. La faible empreinte des données onchain du validium améliore la mise à l'échelle (le débit n'est pas limité par la capacité de traitement des données d'Ethereum) et réduit les frais pour les utilisateurs (le coût de publication des données onchain est inférieur).

La disponibilité des données hors chaîne présente cependant un problème : les données nécessaires à la création ou à la vérification des preuves de Merkle peuvent être indisponibles. Cela signifie que les utilisateurs peuvent être incapables de retirer des fonds du contrat onchain si les opérateurs agissent de manière malveillante.

Diverses solutions de validium tentent de résoudre ce problème en décentralisant le stockage des données d'état. Cela implique de forcer les producteurs de blocs à envoyer les données sous-jacentes aux « gestionnaires de disponibilité des données » responsables du stockage des données hors chaîne et de leur mise à disposition des utilisateurs sur demande.

Les gestionnaires de disponibilité des données dans le validium attestent de la disponibilité des données pour les transactions hors chaîne en signant chaque lot de validium. Ces signatures constituent une forme de « preuve de disponibilité » que le contrat vérificateur onchain vérifie avant d'approuver les mises à jour d'état.

Les validiums diffèrent dans leur approche de la gestion de la disponibilité des données. Certains s'appuient sur des tiers de confiance pour stocker les données d'état, tandis que d'autres utilisent des validateurs assignés aléatoirement pour cette tâche.

#### Comité de disponibilité des données (DAC) {#data-availability-committee}

Pour garantir la disponibilité des données hors chaîne, certaines solutions de validium nomment un groupe d'entités de confiance, collectivement connues sous le nom de comité de disponibilité des données (DAC), pour stocker des copies de l'état et fournir une preuve de disponibilité des données. Les DAC sont plus faciles à mettre en œuvre et nécessitent moins de coordination car le nombre de membres est faible.

Cependant, les utilisateurs doivent faire confiance au DAC pour rendre les données disponibles en cas de besoin (par exemple, pour générer des preuves de Merkle). Il est possible que des membres des comités de disponibilité des données [soient compromis par un acteur malveillant](https://notes.ethereum.org/DD7GyItYQ02d0ax_X-UbWg?view) qui peut alors retenir les données hors chaîne.

[En savoir plus sur les comités de disponibilité des données dans les validiums](https://medium.com/starkware/data-availability-e5564c416424).

#### Disponibilité des données avec mise {#bonded-data-availability}

D'autres validiums exigent que les participants chargés de stocker les données hors ligne stakent (c'est-à-dire verrouillent) des jetons dans un contrat intelligent avant d'assumer leurs rôles. Cette mise sert de « caution » pour garantir un comportement honnête parmi les gestionnaires de disponibilité des données et réduit les hypothèses de confiance. Si ces participants ne parviennent pas à prouver la disponibilité des données, la caution subit une réduction.

Dans un système de disponibilité des données avec mise, n'importe qui peut être assigné à la conservation des données hors chaîne une fois qu'il a fourni la mise requise. Cela élargit le bassin de gestionnaires de disponibilité des données éligibles, réduisant la centralisation qui affecte les comités de disponibilité des données (DAC). Plus important encore, cette approche s'appuie sur des incitations cryptoéconomiques pour prévenir les activités malveillantes, ce qui est considérablement plus sûr que de nommer des tiers de confiance pour sécuriser les données hors ligne dans le validium.

[En savoir plus sur la disponibilité des données avec mise dans les validiums](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf).

## Volitions et validium {#volitions-and-validium}

Les validiums offrent de nombreux avantages mais s'accompagnent de compromis (notamment la disponibilité des données). Mais, comme pour de nombreuses solutions de mise à l'échelle, les validiums sont adaptés à des cas d'utilisation spécifiques, c'est pourquoi les volitions ont été créées.

Les volitions combinent un ZK-rollup et une chaîne validium et permettent aux utilisateurs de basculer entre les deux solutions de mise à l'échelle. Avec les volitions, les utilisateurs peuvent tirer parti de la disponibilité des données hors chaîne du validium pour certaines transactions, tout en conservant la liberté de passer à une solution de disponibilité des données onchain (ZK-rollup) si nécessaire. Cela donne essentiellement aux utilisateurs la liberté de choisir les compromis dictés par leur situation unique.

Un échange décentralisé (DEX) peut préférer utiliser l'infrastructure évolutive et privée d'un validium pour les transactions de grande valeur. Il peut également utiliser un ZK-rollup pour les utilisateurs qui souhaitent les garanties de sécurité plus élevées et l'absence de confiance requise d'un ZK-rollup.

## Validiums et compatibilité EVM {#validiums-and-evm-compatibility}

Comme les ZK-rollups, les validiums sont principalement adaptés aux applications simples, telles que les échanges de jetons et les paiements. La prise en charge du calcul général et de l'exécution de contrats intelligents parmi les validiums est difficile à mettre en œuvre, compte tenu de la surcharge considérable liée à la preuve des instructions de l'[EVM](/developers/docs/evm/) dans un circuit de preuve à divulgation nulle de connaissance.

Certains projets de validium tentent de contourner ce problème par la compilation de langages compatibles EVM (par exemple, Solidity, Vyper) pour créer un bytecode personnalisé optimisé pour une preuve efficace. Un inconvénient de cette approche est que les nouvelles machines virtuelles adaptées aux preuves à divulgation nulle de connaissance peuvent ne pas prendre en charge des opcodes EVM importants, et les développeurs doivent écrire directement dans le langage de haut niveau pour une expérience optimale. Cela crée encore plus de problèmes : cela force les développeurs à créer des applications décentralisées (dapps) avec une pile de développement entièrement nouvelle et rompt la compatibilité avec l'infrastructure Ethereum actuelle.

Certaines équipes tentent cependant d'optimiser les opcodes EVM existants pour les circuits de preuve ZK. Cela se traduira par le développement d'une machine virtuelle Ethereum à divulgation nulle de connaissance (zkEVM), une machine virtuelle compatible EVM qui produit des preuves pour vérifier l'exactitude de l'exécution du programme. Avec une zkEVM, les chaînes validium peuvent exécuter des contrats intelligents hors chaîne et soumettre des preuves de validité pour vérifier un calcul hors chaîne (sans avoir à le réexécuter) sur Ethereum.

[En savoir plus sur les zkEVM](https://www.alchemy.com/overviews/zkevm).

## Comment les validiums mettent-ils Ethereum à l'échelle ? {#scaling-ethereum-with-validiums}

### 1. Stockage des données hors chaîne {#offchain-data-storage}

Les projets de mise à l'échelle de couche 2 (l2), tels que les rollups optimistes et les ZK-rollups, échangent la mise à l'échelle infinie des protocoles de mise à l'échelle purement hors chaîne (par exemple, [Plasma](/developers/docs/scaling/plasma/)) contre la sécurité en publiant certaines données de transaction sur la couche 1 (l1). Mais cela signifie que les propriétés de mise à l'échelle des rollups sont limitées par la bande passante des données sur le réseau principal Ethereum (le [partage de données](/roadmap/danksharding/) propose d'améliorer la capacité de stockage des données d'Ethereum pour cette raison).

Les validiums atteignent la mise à l'échelle en gardant toutes les données de transaction hors chaîne et ne publient que les engagements d'état (et les preuves de validité) lors du relais des mises à jour d'état vers la chaîne principale Ethereum. L'existence de preuves de validité donne cependant aux validiums des garanties de sécurité plus élevées que les autres solutions de mise à l'échelle purement hors chaîne, y compris Plasma et les [chaînes latérales](/developers/docs/scaling/sidechains/). En réduisant la quantité de données qu'Ethereum doit traiter avant de valider les transactions hors chaîne, les conceptions de validium augmentent considérablement le débit sur le réseau principal.

### 2. Preuves récursives {#recursive-proofs}

Une preuve récursive est une preuve de validité qui vérifie la validité d'autres preuves. Ces « preuves de preuves » sont générées en agrégeant récursivement plusieurs preuves jusqu'à ce qu'une preuve finale vérifiant toutes les preuves précédentes soit créée. Les preuves récursives mettent à l'échelle les vitesses de traitement de la chaîne de blocs en augmentant le nombre de transactions pouvant être vérifiées par preuve de validité.

Généralement, chaque preuve de validité que l'opérateur du validium soumet à Ethereum pour vérification valide l'intégrité d'un seul bloc. Tandis qu'une seule preuve récursive peut être utilisée pour confirmer la validité de plusieurs blocs de validium en même temps : cela est possible puisque le circuit de preuve peut agréger récursivement plusieurs preuves de blocs en une seule preuve finale. Si le contrat vérificateur onchain accepte la preuve récursive, tous les blocs sous-jacents sont finalisés immédiatement.

## Avantages et inconvénients du validium {#pros-and-cons-of-validium}

| Avantages                                                                                                                                                | Inconvénients                                                                                                                                                        |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Les preuves de validité garantissent l'intégrité des transactions hors chaîne et empêchent les opérateurs de finaliser des mises à jour d'état invalides. | La production de preuves de validité nécessite un matériel spécial, ce qui pose un risque de centralisation.                                                              |
| Augmente l'efficacité du capital pour les utilisateurs (aucun délai pour retirer des fonds vers Ethereum).                                 | Prise en charge limitée du calcul général/des contrats intelligents ; langages spécialisés requis pour le développement.                                             |
| Non vulnérable à certaines attaques économiques auxquelles sont confrontés les systèmes basés sur des preuves de fraude dans les applications de grande valeur.                | Puissance de calcul élevée requise pour générer des preuves ZK ; non rentable pour les applications à faible débit.                                         |
| Réduit les frais de gaz pour les utilisateurs en ne publiant pas de données d'appel sur le réseau principal Ethereum.                                                  | Temps de finalité subjective plus lent (10 à 30 min pour générer une preuve ZK) mais plus rapide vers la finalité complète car il n'y a pas de délai de contestation.               |
| Adapté à des cas d'utilisation spécifiques, comme le trading ou les jeux sur chaîne de blocs qui privilégient la confidentialité des transactions et la mise à l'échelle.  | Les utilisateurs peuvent être empêchés de retirer des fonds car la génération de preuves de Merkle de propriété nécessite que les données hors chaîne soient disponibles à tout moment.      |
| La disponibilité des données hors chaîne offre des niveaux de débit plus élevés et augmente la mise à l'échelle.                              | Le modèle de sécurité repose sur des hypothèses de confiance et des incitations cryptoéconomiques, contrairement aux ZK-rollups, qui s'appuient uniquement sur des mécanismes de sécurité cryptographiques. |

### Utiliser le validium/les volitions {#use-validium-and-volitions}

Plusieurs projets fournissent des implémentations de validium et de volitions que vous pouvez intégrer dans vos dapps :

**StarkWare StarkEx** - _StarkEx est une solution de mise à l'échelle de couche 2 (l2) d'Ethereum basée sur des preuves de validité. Elle peut fonctionner dans les modes de disponibilité des données ZK-Rollup ou Validium._

- [Documentation](https://docs.starkware.co/starkex-v4/starkex-deep-dive/data-availability-modes#validium)
- [Site Web](https://starkware.co/starkex/)

**Matter Labs zkPorter** - _zkPorter est un protocole de mise à l'échelle de couche 2 (l2) abordant la disponibilité des données avec une approche hybride qui combine les idées du zkRollup et de la fragmentation. Il peut prendre en charge un nombre arbitraire de fragments, chacun avec sa propre politique de disponibilité des données._

- [Blog](https://blog.matter-labs.io/zkporter-a-breakthrough-in-l2-scaling-ed5e48842fbf)
- [Documentation](https://docs.zksync.io/zksync-protocol/rollup/data-availability)
- [Site Web](https://zksync.io/)

## Complément d'information {#further-reading}

- [Validium et la couche 2 deux par deux — Numéro 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [ZK-rollups contre Validium](https://blog.matter-labs.io/zkrollup-vs-validium-starkex-5614e38bc263)
- [Volition et le spectre émergent de la disponibilité des données](https://medium.com/starkware/volition-and-the-emerging-data-availability-spectrum-87e8bfa09bb)
- [Le guide pratique des rollups Ethereum](https://web.archive.org/web/20241108192208/https://research.2077.xyz/the-practical-guide-to-ethereum-rollups)