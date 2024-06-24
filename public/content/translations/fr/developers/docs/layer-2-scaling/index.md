---
title: Évolutivité vers la couche 2
description: Introduction aux différentes options d'évolutivité actuellement en cours de développement par la communauté Ethereum.
lang: fr
incomplete: true
sidebarDepth: 3
isOutdated: true
---

La couche 2 est un terme collectif désignant les solutions conçues pour aider à redimensionner votre application en gérant les transactions hors de la chaîne principale Ethereum (couche 1). La vitesse de transaction est affectée lorsque le réseau est occupé, ce qui peu appauvrir l'expérience utilisateur pour certains types de DApps. Et plus le réseau est fréquenté, plus le prix du carburant augmente, car les expéditeurs de transactions cherchent à surenchérir. Cela peut rendre l'utilisation d'Ethereum très onéreuse.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension de tous les sujets fondamentaux. Les solutions d'implémentation de la couche 2 sont avancées car la technologie a moins fait ses preuves.

## Pourquoi la couche 2 est-elle nécessaire ? {#why-is-layer-2-needed}

- Certains cas d'utilisation, comme les jeux blockchain, n'ont aucun sens avec les temps de transaction actuels
- Utiliser des applications blockchain peut être inutilement onéreux
- Toute mise à jour d'évolutivité ne devrait pas se faire aux dépens de la décentralisation de la sécurité. La couche 2 est construite au niveau supérieur d'Ethereum.

## Types de solution de la couche 2 {#types}

- [Rollups](#rollups)
  - [Rollups ZK](#zk-rollups)
  - [Rollups optimisés](#optimistic-rollups)
- [Canaux d'état](#channels)
- [Plasma](#plasma)
- [Validium](#validium)
- [Chaines latérales ou _sidechains_](#sidechains)
- [Solutions hybrides](#hybrid-solutions)

La plupart des solutions de la couche 2 sont centrées autour d'un serveur ou d'un groupe de serveurs, chacun pouvant être appelé nœud, validateur, opérateur, séquenceur, producteur de blocs ou un terme similaire. Selon l'implémentation, ces nœuds de la couche 2 peuvent être exécutés par les entreprises ou entités qui les utilisent, par un opérateur tiers ou par un grand groupe d'individus (comme sur le réseau principal). De façon générale, les transactions sont soumises à des nœuds de la couche 2 au lieu d'être soumises directement à la couche 1 ([réseau principal](/glossary/#mainnet)). L'instance de la couche 2 les rassemblent ensuite en groupes avant de les sécuriser sur la couch 1. Elles ne peuvent alors plus être modifiées. La façon détaillée dont cela se réalise varie considérablement entre les différentes technologies et implémentations de la couche 2.

Une instance spécifique de la couche 2 peut être ouverte et partagée par de nombreuses applications, ou peut être déployée par une société et dédiée à soutenir uniquement leur application.

## Rollups {#rollups}

Les rollups sont des solutions qui regroupent ou "englobent" les transactions de la chaîne latérale en une seule transaction et qui génèrent une preuve cryptographique, connu sous le nom de SNARK (Succinct Non-interactive Argument of Knowledge, argument de connaissance succinct non interactif). Seule cette preuve est soumise à la chaîne principale.

_Les chaînes latérales sont des blockchains indépendantes compatibles avec Ethereum._

En d’autres termes, les rollups signifient que l'ensemble des états et des exécutions sont gérés dans les chaînes latérales (vérification de la signature, exécution du contrat, etc). La principale chaîne Ethereum (couche 1) stocke uniquement les données de transaction.

Les solutions de rollup nécessitent des relayeurs qui se sont engagés dans le contrat de rollup. Cela les encourage à relayer les rollups avec précision.

**Ceci est utile pour :**

- réduire les frais pour les utilisateurs ;
- ouvrir la participation ;
- bénéficier d'un débit de transaction rapide.

Il existe deux types de rollups avec différents modèles de sécurité :

- Rollup ZK : exécute le calcul hors de la blockchain principale, puis soumet une [**preuve de validité **](/glossary/#validity-proof)
- Rollup optimisé : assume que les transactions sont valides par défaut et exécute uniquement le calcul, via une [**preuve de fraude**](/glossary/#fraud-proof),

### Rollups Zero Knowledge (ZK) {#zk-rollups}

Les rollups Zero Knowledge, également appelés Rollups ZK ou ZK-Rollups, regroupent des centaines de transferts hors chaîne en une seule transaction via un contrat intelligent. À partir des données soumises, le contrat intelligent peut vérifier tous les transferts inclus. C'est ce que l'on appelle une preuve de validité.

Avec un rollup ZK, valider un nouveau bloc est plus rapide et moins coûteux, car moins de données sont incluses. Vous n'avez pas besoin de toutes les données pour vérifier la transaction, juste de la preuve de validation.

La chaîne latérale où se produisent les rollups ZK peut être optimisée pour réduire davantage la taille des transactions. Par exemple, un compte représenté par un index plutôt que par une adresse permet de réduire à seulement 4 octets une transaction de 32 octets. Les transactions étant également écrites sur Ethereum en tant que données d'appel, cela réduit la quantité de carburant.

#### Avantages et inconvénients {#zk-pros-and-cons}

| Avantages                                                                                                          | Inconvénients                                                                                                                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aucun délai car les preuves sont déjà considérées comme valides lorsqu'elles sont soumises à la chaîne principale. | Cela se limite à des transactions simples, non compatibles avec l'EVM.                                                                                                                                                                                            |
| Moindre vulnérabilité aux attaques économiques que les [rollups optimisés](#optimistic-pros-and-cons).             | Les preuves de validité étant intenses à calculer, les rollups ZK ne présentent guère d'intérêt pour les applications peu actives sur la chaîne.                                                                                                                  |
|                                                                                                                    | Délai de [finalisation](/glossary/#finality) subjective plus long (10-30 min pour générer une preuve ZK), mais plus rapide pour une finalisation complète, car il n'existe pas de délai de contestation comme dans les [rollups optimisés](#optimistic-rollups)). |

#### Rollups ZK que vous pouvez utiliser {#use-zk-rollups}

- [Loopring](https://loopring.org/#/)
- [Starkware](https://starkware.co/)
- [Matter Labs ZKsync](https://matter-labs.io/)
- [Aztec 2.0](https://aztec.network/)

### Rollups optimisés {#optimistic-rollups}

Les rollups optimisés utilisent une chaîne latérale positionnée en parallèle à la chaîne principale Ethereum. Ils peuvent offrir des améliorations en matière d'évolutivité, car ils n'effectuent aucun calcul par défaut. Au lieu de cela, après une transaction, ils proposent le nouvel état à la chaîne principal. On dit aussi qu'ils "notarisent" la transaction.

Avec les rollups optimisés, les transactions sont écrites sur la chaîne principale Ethereum en tant que données d'appel, ce qui les optimise davantage en réduisant le coût du carburant.

Le calcul étant la partie lente et coûteuse de l'utilisation d'Ethereum, les rollups optimisés peuvent offrir 10 à 100 fois plus d'évolutivité en fonction de la transaction. Ce nombre augmentera encore plus avec l'introduction de la mise à niveau Eth2 vers les [chaînes de fragments](/roadmap/danksharding). Cela est dû au fait qu'il y aura plus de données disponibles en cas de contestation d'une transaction.

#### Contestation des transactions {#disputing-transactions}

Les rollups optimisés ne calculant pas réellement la transaction, il faut donc implémenter un mécanisme pour garantir que les transactions sont légitimes et non frauduleuses. C'est là que des preuves de fraude entrent en matière. Si quelqu'un remarque une opération frauduleuse, le rollup exécutera une preuve de fraude et effectuera le calcul de la transaction en utilisant les données d'état disponibles. Cela signifie que le délai d'attente pour confirmer une transaction peut être plus élevé avec ce type de rollup plutôt qu'avec un rollup ZK, car elle pourrait être contestée.

![Diagramme montrant ce qui se passe lorsqu'une transaction frauduleuse se produit dans un rollup optimisé sur Ethereum](./optimistic-rollups.png)

Le carburant nécessaire pour effectuer le calcul de la preuve de fraude est remboursé. Chez Optimism, Ben Jones décrit le système de garantie en place :

"_Toute personne susceptible d'entreprendre une action que vous devriez prouver frauduleuse pour garantir vos fonds exige que vous déposiez une caution. Pour résumer, vous bloquez quelques ETH et dites "Je promets de dire la vérité. Si je ne dis pas la vérité et que la fraude est prouvée, je perdrai cet argent. Une partie sera réduite et le reste servira à payer le carburant que les gens ont dépensé pour prouver la fraude_".

Vous êtes donc remboursé pour avoir prouvé la fraude.

#### Avantages et inconvénients {#optimistic-pros-and-cons}

| Avantages                                                                                                                                                | Inconvénients                                                                                                             |
| -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Tout ce que vous pouvez faire sur la couche Ethereum 1, vous pouvez le faire avec les rollups optimisés car ils sont compatibles avec l'EVM et Solidity. | Longs délais d'attente pour les transactions sur la blockchain en raison de potentiels problèmes de fraude.               |
| Toutes les données de transaction étant stockées sur la chaîne de la couche 1, elles sont donc sécurisées et décentralisées.                             | Vulnérabilité potentielle aux attaques si la valeur d'un rollup optimisé dépasse le montant de la caution d'un opérateur. |

#### Rollups optimisés que vous pouvez utiliser {#use-optimistic-rollups}

- [Optimism](https://optimism.io/)
- [Offchain Labs Arbitrum Rollup](https://offchainlabs.com/)
- [Fuel Network](https://fuel.sh/)

## Canaux {#channels}

Les canaux permettent aux participants d'effectuer `x` transactions hors chaîne tout en ne soumettant que deux transactions au réseau sur la chaîne. Cela permet un débit de transaction extrêmement élevé

**Ceci est utile ** :

- pour de nombreuses mises à niveau d'état ;
- lorsque le nombre de participants est connu à l'avance ;
- lorsque les participants sont toujours disponibles.

Les participants doivent verrouiller une partie de l'état d'Ethereum, comme un dépôt d'ETH, dans un contrat multisignature ("multisig"). Un contrat multisig est un type de contrat qui nécessite la signature (et donc l'accord) de plusieurs clés privées pour être exécuté.

Verrouiller l'état de cette façon constitue la première transaction et ouvre le canal. Les participants peuvent alors effectuer des transactions rapidement et librement hors chaîne. Une fois l'interaction terminée, une transaction finale est soumise sur la blockchain, déverrouillant l'état.

### Canaux d'état {#state-channels}

Canal d'état tic-tac-toe :

1. Créez un contrat intelligent multisig "Juge" sur la chaîne principale Ethereum qui comprend les règles du tic-tac-toe, et peut identifier Alice et Marc comme les deux joueurs du jeu. Ce contrat détient un prix de 1 ETH.

2. Alice et Marc commencent à jouer au jeu, ouvrant le canal d'état. Chaque mouvement crée une transaction hors chaîne contenant un "nonce", ce qui signifie simplement que nous pourrons toujours dire plus tard dans quel ordre les mouvements se sont déroulés.

3. Lorsqu'il y a un gagnant (Alice), ils ferment le canal en soumettant l'état final (par ex., une liste de transactions) au contrat Juge, ne payant qu'une fois les frais de transaction. Le juge veille à ce que cet "état final" soit signé par les deux parties, patiente un certain temps pour garantir que personne ne peut légitimement contester le résultat, puis verse à Alice le prix de 1 ETH.

Il existe actuellement deux types de canaux :

- Canaux d'état - Comme décrit ci-dessus
- Canaux de paiement - Canaux d'état simplifiés qui ne traitent que des paiements. Ils permettent des transferts hors chaîne entre deux participants, à condition que la somme nette des transferts ne dépasse pas les jetons déposés.

#### Avantages et inconvénients {#channels-pros-and-cons}

| Avantages                                                                                       | Inconvénients                                                                                                                                                           |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retrait/règlement instantané sur le réseau principal (si les deux parties d'un canal coopèrent) | Délai et coût de configuration et de règlement d'un canal. Peu intéressant pour les transactions ponctuelles entre utilisateurs arbitraires.                            |
| Débits extrêmement élevés possibles                                                             | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour garantir la sécurité de vos fonds. |
| Coût par transaction le plus bas. Intéressant pour le streaming des micropaiements              | Nécessité de verrouiller les fonds sur les canaux de paiement ouverts.                                                                                                  |
|                                                                                                 | Ne prend pas en charge la participation ouverte.                                                                                                                        |

#### Canaux d'état que vous pouvez utiliser {#use-state-channels}

- [Connext](https://connext.network/)
- [Raiden](https://raiden.network/)
- [Perun](https://perun.network/)
- [Statechannels.org](https://statechannels.org/)

## Plasma {#plasma}

Une chaîne plasma est une blockchain séparée qui est ancrée à la chaîne Ethereum principale, et qui utilise des preuves de fraude (comme les [rollups optimisés](#optimistic-rollups)) pour arbitrer les litiges.

| Avantages                                                                                                                                            | Inconvénients                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Débit élevé, faible coût par transaction.                                                                                                            | Ne prend pas en charge le calcul général. Seuls les transferts de jetons de base, les échanges et quelques autres types de transactions sont pris en charge par la logique des prédicats.                     |
| Adaptée pour les transactions entre utilisateurs arbitraires (pas de surcharge par paire utilisateur si les deux sont établis sur la chaîne plasma). | Nécessité de surveiller périodiquement le réseau (exigence de vivacité) ou de déléguer cette responsabilité à quelqu'un d'autre pour garantir la sécurité de vos fonds.                                       |
|                                                                                                                                                      | Se repose sur un ou plusieurs opérateurs pour stocker les données et les utiliser sur demande.                                                                                                                |
|                                                                                                                                                      | Les retraits sont retardés de plusieurs jours pour permettre les contestations. Pour les actifs fongibles, cela peut être atténué par les fournisseurs de liquidités, mais il y a un coût en capital associé. |

### Chaînes Plasma que vous pouvez utiliser {#use-plasma}

- [OMG Network](https://omg.network/)
- [Matic Network](https://matic.network/)
- [Gluon](https://gluon.network/)
- [LeapDAO](https://ipfs.leapdao.org/)

## Validium {#validium}

Utilise les preuves de validité comme les [rollups ZK](#zk-rollups), mais les données ne sont pas stockées sur la chaîne Ethereum de la couche principale 1. Cela peut permettre jusqu'à 10 000 transactions par seconde par chaîne Validium, et plusieurs chaînes peuvent être exécutées en parallèle.

| Avantages                                                                                                                                                            | Inconvénients                                                                                                                                                                                                       |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Aucun délai de retrait (pas de latence sur la blockchain/les chaînes croisées), donc une plus grande efficacité du capital.                                          | Prise en charge limitée des calculs généraux/contrats intelligents, des langages spécialisés sont requis.                                                                                                           |
| Aucune vulnérabilité à certaines attaques économiques auxquelles sont confrontés les systèmes basés sur les preuves de fraude dans des applications à valeur élevée. | Grande puissance de calcul nécessaire pour générer les preuves de validité, donc n'est pas rentable pour les applications à faible débit.                                                                           |
|                                                                                                                                                                      | Délai de finalisation subjective plus long (10-30 min pour générer une preuve ZK), mais plus rapide pour une finalisation complète, car il n'existe pas de délai de contestation comme dans les rollups optimisés). |

### Chaînes Validium que vous pouvez utiliser {#use-validium}

- [Starkware](https://starkware.co/)
- [Matter Labs zkPorter](https://matter-labs.io/)
- [Loopring](https://loopring.org/#/)

## Chaînes latérales {#sidechains}

Une chaîne latérale est une blockchain séparée qui fonctionne en parallèle au réseau principal, de façon indépendante. Elle possède son propre algorithme de consensus ([preuve d'autorité](https://wikipedia.org/wiki/Proof_of_authority), [preuve d'enjeu déléguée](https://en.bitcoinwiki.org/wiki/DPoS), [tolérance aux défauts byzantins](https://decrypt.co/resources/byzantine-fault-tolerance-what-is-it-explained), etc.). Elle est relié à la chaîne principale par un "pont" à deux sens.

| Avantages                                                     | Inconvénients                                                                                                             |
| ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| Technologie établie.                                          | Moins décentralisée.                                                                                                      |
| Prend en charge le calcul général, est compatible avec l'EVM. | Utilise un mécanisme de consensus distinct. Non sécurisée par la couche 1 (techniquement, ce n’est donc pas la couche 2). |
|                                                               | Un quorum de validateurs de la chaîne latérale peut commettre une fraude.                                                 |

### Chaînes latérales que vous pouvez utiliser {#use-sidechains}

- [Skale](https://skale.network/)
- [POA Network](https://www.poa.network/)

## Solutions hybrides {#hybrid-solutions}

Combine les meilleures parties des multiples technologies de couche 2, et peut offrir des compromis configurables.

### Solutions hybrides que vous pouvez utiliser {#use-hybrid-solutions}

- [Celer](https://www.celer.network/)

## Complément d'information {#further-reading}

- [Validium et The Layer 2 Two-By-Two - Numéro 99](https://www.buildblockchain.tech/newsletter/issues/no-99-validium-and-the-layer-2-two-by-two)
- [Evaluating Ethereum layer 2 Scaling Solutions: A Comparison Framework](https://blog.matter-labs.io/evaluating-ethereum-l2-scaling-solutions-a-comparison-framework-b6b2f410f955)
- [Ajout de la chaîne latérale hybride PoS-Rollup à la plateforme Coherent Layer-2 de Celer sur Ethereum](https://medium.com/celer-network/adding-hybrid-pos-rollup-sidechain-to-celers-coherent-layer-2-platform-d1d3067fe593)
- [Évolutivité de la blockchain ZK](https://ethworks.io/assets/download/zero-knowledge-blockchain-scaling-ethworks.pdf)

**Canaux d'états**

- [Making Sense of Ethereum’s Layer 2 Scaling Solutions: State Channels, Plasma, and Truebit](https://medium.com/l4-media/making-sense-of-ethereums-layer-2-scaling-solutions-state-channels-plasma-and-truebit-22cb40dcc2f4) _- Josh Stark, 12 février 2018_
- [State Channels - an explanation](https://www.jeffcoleman.ca/state-channels/) _- Jeff Coleman, 6 novembre 2015 _
- [Basics of State Channels](https://education.district0x.io/general-topics/understanding-ethereum/basics-state-channels/) _District0x_

**Canaux de paiement**

**Rollups ZK**

**Rollups optimisés**

- [OVM Deep Dive](https://medium.com/ethereum-optimism/ovm-deep-dive-a300d1085f52)

**Chaînes latérales**

- [Scaling Ethereum DApps through Sidechains](https://medium.com/loom-network/dappchains-scaling-ethereum-dapps-through-sidechains-f99e51fff447) _- Georgios Konstantopoulos, 8 février 2018_
