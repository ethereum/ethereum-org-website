---
title: Preuve d'autorité (PoA)
description: Explication du protocole de consensus « preuve d'autorité » et de son rôle dans l'écosystème blockchain.
lang: fr
---

La **Preuve d'autorité (PoA)** est un algorithme de consensus basé sur la réputation qui est une version modifiée de la [preuve d'enjeu] (/developers/docs/consensus-mechanisms/pos/). Il est principalement utilisé par des chaînes privées, des réseaux de test et des réseaux de développement locaux. Le PoA est un algorithme de consensus basé sur la réputation qui nécessite de faire confiance à un ensemble de signataires autorisés pour produire des blocs, plutôt que de se baser sur un mécanisme d'enjeu comme le PoS.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons d'abord d'en lire plus sur les transactions (/developers/docs/transactions/), les blocs (/developers/docs/blocks/), et les mécanismes de consensus (/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la Preuve d'autorité (PoA) ? {#what-is-poa}

La Preuve d'autorité est une version modifiée de la **[Preuve d'enjeu] (/developers/docs/consensus-mechanisms/pos/) (PoS)** qui est un algorithme de consensus basé sur la réputation plutôt que sur un mécanisme basé sur l'enjeu avec le PoS. Le terme a été introduit pour la première fois en 2017 par Gavin Wood, et cet algorithme de consensus est principalement utilisé par des chaînes privées, des réseaux de test et des réseaux de développement locaux, car il surmonte le besoin de ressources de haute qualité comme le PoW, et résout les problèmes de scalabilité avec le PoS en ayant un petit sous-ensemble de nœuds stockant la blockchain et produisant des blocs.

La Preuve d'autorité nécessite de faire confiance à un ensemble de signataires autorisés qui sont définis dans le [bloc de genèse] (/glossary/#genesis-block). Dans la plupart des implémentations actuelles, tous les signataires autorisés conservent un pouvoir et des privilèges égaux lorsqu'il s'agit de déterminer le consensus de la chaîne. L'idée derrière l'enjeu sur la réputation est que chaque validateur autorisé est bien connu de tous grâce à des éléments tels que la vérification de l'identité des clients (KYC) ou parce qu'il fait partie d'une organisation bien connue qui est le seul validateur. Ainsi, si un validateur commet une erreur, son identité est connue.

Il existe plusieurs implémentations de PoA, mais l'implémentation standard d'Ethereum est **clique**, qui implémente [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique est agréable à utiliser par les développeurs et facilite l'implémentation de normes, prenant en charge tous les types de synchronisation de clients. D'autres implémentations incluent [IBFT 2.0](https://besu.hyperledger.org/stable/private-networks/concepts/poa) and [Aura](https://openethereum.github.io/Chain-specification).

## Comment ça marche {#how-it-works}

Avec le PoA, un ensemble de signataires autorisés est sélectionné pour créer de nouveaux blocs. Les signataires sont sélectionnés en fonction de leur réputation, et ce sont les seuls autorisés à créer de nouveaux blocs. Les signataires sont sélectionnés chacun leur tour, et chaque signataire est autorisé à créer un bloc dans un intervalle de temps spécifique. Le temps de création des blocs est fixe, et les signataires sont tenus de créer un bloc dans cet intervalle de temps.

La réputation dans ce contexte n'est pas une chose quantifiée mais plutôt la réputation de grandes entreprises bien connues comme Microsoft et Google. Ainsi, la manière de sélectionner les signataires de confiance n'est pas algorithmique mais plutôt un rapport humain de confiance, où une entité, comme par exemple Microsoft, crée un réseau privé PoA entre des centaines ou des milliers de startups. Le rôle de Microsoft en tant que seul signataire de confiance, avec la possibilité d'ajouter d'autres signataires bien connus comme Google à l'avenir, fait que les startups feraient sans aucun doute confiance à Microsoft pour agir de manière honnête en tout temps et utiliser le réseau. Cela résout le besoin de mettre un enjeu dans différents réseaux (privés ou de petite taille) qui ont été construits à des fins différentes dans le but de les maintenir décentralisés et fonctionnels, ainsi que le besoin de mineurs qui consomment beaucoup d'énergie et de ressources. Certains réseaux privés utilisent la norme PoA, comme VeChain, et certains la modifient, comme Binance qui utilise [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), une version modifiée et personnalisée de PoA et PoS.

Le processus de vote est effectué par les signataires eux-mêmes. Chaque signataire vote pour l'ajout ou la suppression d'un signataire dans leur bloc lorsqu'ils créent un nouveau bloc. Les votes sont comptabilisés par les nœuds, et les signataires sont ajoutés ou supprimés en fonction des votes atteignant un seuil spécifique `SIGNER_LIMIT`.

Il peut arriver qu'il y ait des petites fourches où la difficulté d'un bloc dépend de savoir si le bloc a été signé pendant un tour ou hors-tour. Les blocs « pendant le tour » ont une difficulté de 2, et les blocs « hors-tour » ont une difficulté de 1. En cas de petites fourches, la chaîne avec la majorité des signataires qui scellent des blocs « pendant le tour » accumulera la plus grande difficulté et l'emportera.

## Vecteurs d'attaque {#attack-vectors}

### Signataires malveillants {#malicious-signers}

Un utilisateur malveillant pourrait être ajouté à la liste des signataires, ou une clé/machine de signature pourrait être compromise. Dans un tel scénario, le protocole doit être capable de se défendre contre les réorganisations et le spam. La solution proposée est que, étant donné une liste de N signataires autorisés, chaque signataire ne peut créer qu'un bloc sur K. Cela permet de limiter les dommages, et le reste des validateurs peut voter pour exclure l'utilisateur malveillant.

### Censure {#censorship-attack}

Un autre vecteur d'attaque intéressant est si un signataire (ou un groupe de signataires) tente de censurer les blocs qui votent pour les supprimer de la liste des autorisations. Pour contourner cela, la fréquence autorisée de création de nouveaux blocs par les signataires est limitée à 1 sur N/2. Cela garantit que les signataires malveillants doivent contrôler au moins 51 % des comptes signataires, auquel cas ils deviendront effectivement la nouvelle source de vérité pour la chaîne.

### Spam {#spam-attack}

Un autre petit vecteur d'attaque serait que les signataires malveillants injectent de nouvelles propositions de vote dans chaque bloc qu'ils créent. Étant donné que les nœuds doivent comptabiliser tous les votes pour créer la liste effective des signataires autorisés, ils doivent enregistrer tous les votes au fil du temps. Sans imposer de limite à la fenêtre de vote, celle-ci pourrait croître lentement, mais sans limite. La solution consiste à mettre en place une fenêtre _mobile_ de blocs W après laquelle les votes sont considérés comme périmés. _Une durée raisonnable serait de 1 à 2 périodes._

### Blocs concurrents {#concurrent-blocks}

Dans un réseau PoA, lorsqu'il y a N signataires autorisés, chaque signataire est autorisé à frapper 1 bloc sur K, ce qui signifie que N-K+1 validateurs sont autorisés à frapper à tout moment. Pour empêcher ces validateurs de se précipiter sur les blocs, il est recommandé à chaque signataire d'ajouter un petit « décalage » aléatoire au moment où il crée un nouveau bloc. Bien que ce processus limite les petites fourches, des fourches occasionnelles peuvent encore se produire, tout comme sur le réseau principal. Si un signataire est découvert en train d'abuser de son pouvoir et cause le chaos, les autres signataires peuvent voter pour l'exclure.

Par exemple, s'il y a 10 signataires autorisés et que chaque signataire est autorisé à créer 1 bloc sur 20, alors 11 validateurs peuvent créer des blocs à tout moment. Pour les empêcher de se précipiter sur la création de blocs, chaque signataire ajoute un petit « décalage » aléatoire au moment où il crée un nouveau bloc. Cela réduit la fréquence des petites fourches mais des fourches occasionnelles peuvent encore survenir, comme on peut le voir sur le réseau principal Ethereum. Si un signataire abuse de son autorité et cause des problèmes, il peut être exclu du réseau à la suite d'un vote.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                          | Inconvénients                                                                                                                                                                                              |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plus scalable que d'autres mécanismes populaires tels que PoS et PoW, car il repose sur un nombre limité de signataires de blocs.                                                                  | Les réseaux PoA ont généralement un nombre relativement restreint de nœuds validateurs. Ce qui rend un réseau PoA plus centralisé.                                         |
| Les blockchains PoA sont incroyablement peu coûteuses à exploiter et à maintenir.                                                                                                                  | Devenir un signataire autorisé est généralement hors de portée pour une personne ordinaire, car la blockchain nécessite des entités avec une réputation déjà établie.                      |
| Les transactions sont confirmées très rapidement, car elles peuvent être validées en moins d'une seconde, car seul un nombre limité de signataires est nécessaire pour valider les nouveaux blocs. | Les signataires malveillants pourraient réorganiser, effectuer des doubles dépenses, censurer des transactions sur le réseau. Ces attaques sont très rares mais possibles. |

## En savoir plus {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Clique standard_
- [Étude Preuve d'autorité](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Qu'est-ce que la Preuve d'autorité](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Explication de la Preuve d'autorité](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA dans la blockchain](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Explication de Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsolète et spécification Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0 et autre implémentation PoA](https://besu.hyperledger.org/stable/private-networks/concepts/poa)

### Davantage qu'un apprenant visuel ? {#visual-learner}

Regardez une explication en vidéo de la preuve d'autorité :

<YouTube id="Mj10HSEM5_8" />

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
