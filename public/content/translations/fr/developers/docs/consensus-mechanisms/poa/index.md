---
title: Preuve d'autorité (PoA)
description: Une explication du protocole de consensus de preuve d'autorité et de son rôle dans l'écosystème de la chaîne de blocs.
lang: fr
---

La **preuve d'autorité (PoA)** est un algorithme de consensus basé sur la réputation qui est une version modifiée de la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/). Elle est principalement utilisée par les chaînes privées, les réseaux de test et les réseaux de développement locaux. La PoA est un algorithme de consensus basé sur la réputation qui nécessite de faire confiance à un ensemble de signataires autorisés pour produire des blocs, au lieu d'un mécanisme basé sur la mise dans la PoS.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord nos articles sur les [transactions](/developers/docs/transactions/), les [blocs](/developers/docs/blocks/) et les [mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la preuve d'autorité (PoA) ? {#what-is-poa}

La preuve d'autorité est une version modifiée de la **[preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) (PoS)** qui est un algorithme de consensus basé sur la réputation au lieu du mécanisme basé sur la mise de la PoS. Le terme a été introduit pour la première fois en 2017 par Gavin Wood, et cet algorithme de consensus a été principalement utilisé par les chaînes privées, les réseaux de test et les réseaux de développement locaux, car il surmonte le besoin de ressources de haute qualité comme le fait la preuve de travail (PoW), et résout les problèmes de scalabilité de la PoS en ayant un petit sous-ensemble de nœuds stockant la chaîne de blocs et produisant des blocs.

La preuve d'autorité nécessite de faire confiance à un ensemble de signataires autorisés qui sont définis dans le [bloc genèse](/glossary/#genesis-block). Dans la plupart des implémentations actuelles, tous les signataires autorisés conservent un pouvoir et des privilèges égaux lors de la détermination du consensus de la chaîne. L'idée derrière le staking de réputation est que chaque validateur autorisé est bien connu de tous grâce à des processus tels que la connaissance du client (KYC), ou en ayant une organisation bien connue comme seul validateur — de cette façon, si un validateur fait quelque chose de mal, son identité est connue.

Il existe plusieurs implémentations de la PoA, mais l'implémentation standard d'Ethereum est **clique**, qui implémente l'[EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique est une norme facile à implémenter et conviviale pour les développeurs, prenant en charge tous les types de synchronisation de clients. D'autres implémentations incluent [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) et [Aura](https://openethereum.github.io/Chain-specification).

## Comment ça marche {#how-it-works}

Dans la PoA, un ensemble de signataires autorisés est sélectionné pour créer de nouveaux blocs. Les signataires sont sélectionnés en fonction de leur réputation, et ils sont les seuls autorisés à créer de nouveaux blocs. Les signataires sont sélectionnés à tour de rôle (round-robin), et chaque signataire est autorisé à créer un bloc dans un laps de temps spécifique. Le temps de création de bloc est fixe, et les signataires sont tenus de créer un bloc dans ce laps de temps.

La réputation dans ce contexte n'est pas une chose quantifiée, mais plutôt la réputation d'entreprises bien connues comme Microsoft et Google. Par conséquent, la façon de sélectionner les signataires de confiance n'est pas algorithmique, mais relève plutôt de l'acte humain normal de _confiance_ où une entité, disons par exemple Microsoft, crée un réseau privé PoA entre des centaines ou des milliers de startups et s'attribue le rôle de seul signataire de confiance avec la possibilité d'ajouter d'autres signataires bien connus comme Google à l'avenir. Les startups feraient, sans aucun doute, confiance à Microsoft pour agir de manière honnête en tout temps et utiliseraient le réseau. Cela résout le besoin de staker dans différents petits réseaux privés construits à des fins diverses pour les maintenir décentralisés et fonctionnels, ainsi que le besoin de mineurs, ce qui consomme beaucoup d'énergie et de ressources. Certains réseaux privés utilisent la norme PoA telle quelle, comme VeChain, et d'autres la modifient, comme Binance qui utilise la [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa), une version modifiée personnalisée de la PoA et de la PoS.

Le processus de vote est effectué par les signataires eux-mêmes. Chaque signataire vote pour l'ajout ou la suppression d'un signataire dans son bloc lorsqu'il crée un nouveau bloc. Les votes sont comptabilisés par les nœuds, et les signataires sont ajoutés ou supprimés en fonction des votes atteignant un certain seuil `SIGNER_LIMIT`.

Il peut y avoir une situation où de petites bifurcations (forks) se produisent, la difficulté d'un bloc dépend du fait que le bloc a été signé à son tour ou hors de son tour. Les blocs « à son tour » ont une difficulté de 2, et les blocs « hors de son tour » ont une difficulté de 1. Dans le cas de petites bifurcations, la chaîne avec la plupart des signataires scellant des blocs « à son tour » accumulera le plus de difficulté et l'emportera.

## Vecteurs d'attaque {#attack-vectors}

### Signataires malveillants {#malicious-signers}

Un utilisateur malveillant pourrait être ajouté à la liste des signataires, ou une clé de signature/machine pourrait être compromise. Dans un tel scénario, le protocole doit être capable de se défendre contre les réorganisations et le spam. La solution proposée est qu'étant donné une liste de N signataires autorisés, tout signataire ne peut frapper qu'un seul bloc sur K. Cela garantit que les dommages sont limités, et que le reste des validateurs peut voter pour exclure l'utilisateur malveillant.

### Censure {#censorship-attack}

Un autre vecteur d'attaque intéressant est si un signataire (ou un groupe de signataires) tente de censurer les blocs qui votent pour les retirer de la liste d'autorisation. Pour contourner cela, la fréquence de frappe autorisée des signataires est restreinte à 1 sur N/2. Cela garantit que les signataires malveillants doivent contrôler au moins 51 % des comptes de signature, auquel cas ils deviendraient effectivement la nouvelle source de vérité pour la chaîne.

### Spam {#spam-attack}

Un autre petit vecteur d'attaque est l'injection par des signataires malveillants de nouvelles propositions de vote à l'intérieur de chaque bloc qu'ils frappent. Puisque les nœuds doivent comptabiliser tous les votes pour créer la liste réelle des signataires autorisés, ils doivent enregistrer tous les votes au fil du temps. Sans imposer de limite à la fenêtre de vote, cela pourrait croître lentement, mais sans limite. La solution consiste à placer une fenêtre _glissante_ de W blocs après laquelle les votes sont considérés comme obsolètes. _Une fenêtre raisonnable pourrait être de 1 à 2 époques._

### Blocs simultanés {#concurrent-blocks}

Dans un réseau PoA, lorsqu'il y a N signataires autorisés, chaque signataire est autorisé à frapper 1 bloc sur K, ce qui signifie que N-K+1 validateurs sont autorisés à frapper à tout moment donné. Pour empêcher ces validateurs de faire la course aux blocs, chaque signataire doit ajouter un petit « décalage » aléatoire au moment où il publie un nouveau bloc. Bien que ce processus garantisse que les petites bifurcations sont rares, des bifurcations occasionnelles peuvent toujours se produire, tout comme sur le réseau principal. Si un signataire est surpris à abuser de son pouvoir et à semer le chaos, les autres signataires peuvent voter pour l'exclure.

Si par exemple il y a 10 signataires autorisés et que chaque signataire est autorisé à créer 1 bloc sur 6, alors à tout moment, 5 validateurs peuvent créer des blocs. Pour les empêcher de faire la course pour créer des blocs, chaque signataire ajoute un petit « décalage » aléatoire au moment où il publie un nouveau bloc. Cela réduit l'occurrence de petites bifurcations mais permet toujours des bifurcations occasionnelles, comme on le voit sur le réseau principal Ethereum. Si un signataire abuse de son autorité et provoque des perturbations, il peut être exclu du réseau par un vote.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                 | Inconvénients                                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Plus scalable que d'autres mécanismes populaires tels que la PoS et la PoW, car il est basé sur un nombre limité de signataires de blocs                                                  | Les réseaux PoA ont généralement un nombre relativement restreint de nœuds de validation. Cela rend un réseau PoA plus centralisé.                                                    |
| Les chaînes de blocs PoA sont incroyablement peu coûteuses à exécuter et à maintenir                                                                                                      | Devenir un signataire autorisé est généralement hors de portée pour une personne ordinaire, car la chaîne de blocs nécessite des entités ayant une réputation établie.                |
| Les transactions sont confirmées très rapidement, cela pouvant prendre moins d'une seconde car seul un nombre limité de signataires est requis pour valider de nouveaux blocs             | Des signataires malveillants pourraient provoquer une réorganisation, une double dépense, ou censurer des transactions sur le réseau ; ces attaques sont atténuées mais restent possibles |

## Complément d'information {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Norme Clique_
- [Étude sur la preuve d'autorité](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Qu'est-ce que la preuve d'autorité](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [La preuve d'autorité expliquée](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [La PoA dans la chaîne de blocs](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique expliqué](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA obsolète, spécification Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, une autre implémentation de la PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Vous préférez les explications visuelles ? {#visual-learner}

Regardez une explication visuelle de la preuve d'autorité :

<VideoWatch slug="proof-of-authority-explained" />

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)