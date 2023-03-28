---
title: Preuve de travail (PoW)
description: Explication du protocole de consensus « preuve de travail » et de son rôle dans Ethereum.
lang: fr
incomplete: true
---

Ethereum, comme Bitcoin, utilise actuellement un protocole de consensus appelé **[preuve de travail (PoW)](https://wikipedia.org/wiki/Proof_of_work)**. Celui-ci permet à l'ensemble du réseau Ethereum de s'accorder sur l'état de toutes les informations enregistrées sur la blockchain Ethereum, empêchant ainsi certains types d'attaques économiques.

Au cours de la prochaine année, la preuve de travail sera progressivement abandonnée au profit de la **[preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos)**. La transition vers la preuve d'enjeu supprimera également progressivement le minage depuis Ethereum. [En savoir plus sur la fusion.](/upgrades/merge/)

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les transactions](/developers/docs/transactions/), [les blocs](/developers/docs/blocks/) et [les mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est ce que la preuve de travail (PoW) ? {#what-is-pow}

La preuve de travail est le mécanisme qui permet au réseau décentralisé Ethereum de parvenir à un consensus, ou de s'accorder sur les soldes des comptes ainsi que l'ordre des transactions. Cela empêche les utilisateurs d'effectuer une « double dépense » et garantit qu'il est extrêmement difficile d'attaquer la chaîne Ethereum ou de la manipuler.

## Preuve de travail et minage {#pow-and-mining}

La preuve de travail est l'algorithme sous-jacent qui définit la difficulté et les règles pour le travail des mineurs. Le minage est le « travail » en lui-même. C'est l'acte d'ajouter des blocs valides à la chaîne. C'est important car la longueur de chaîne aide le réseau à repérer la chaîne Ethereum valide et à comprendre l'état actuel d'Ethereum. Plus il y a de « travail » effectué, plus la chaîne est longue, plus le nombre de blocs est élevé, plus le réseau peut être certain de l'état actuel des choses.

[En savoir plus sur le minage](/developers/docs/consensus-mechanisms/pow/mining/)

## Comment fonctionne la preuve de travail Ethereum ? {#how-it-works}

Les transactions Ethereum sont traitées en blocs. Chaque bloc possède :

- une difficulté de bloc (par ex. : 3,324,092,183,262,715) ;
- un mixHash (par ex. : `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`) ;
- un nonce (par ex. : `0xd3ee432b4fb3d26b`).

Ces données de bloc sont directement liées à la preuve de travail.

### Le travail en preuve de travail {#the-work}

Le protocole de preuve de travail, Ethash, exige des mineurs qu'ils se livrent à une intense course d'essais et d'erreurs pour trouver le nonce d'un bloc. Seuls les blocs avec un nonce valide peuvent être ajoutés à la chaîne.

Lors de la course pour créer un bloc, un mineur soumet de façon répétée un ensemble de données (qu'il ne peut obtenir qu'en téléchargeant et en exécutant la chaîne complète) à une fonction mathématique. Le jeu de données est utilisé pour générer un mixHash en dessous d'un nonce cible, dicté par la difficulté du bloc. La meilleure façon d'y arriver est de faire des essais et des erreurs.

La difficulté détermine la cible du hachage. Plus la cible est basse, plus l'ensemble de hachages valides est petit. Une fois généré, il est incroyablement facile à vérifier pour les autres mineurs et clients. Même si une transaction devait changer, le hachage serait complètement différent, signalant une fraude.

Le hachage facilite le dépistage de la fraude. Mais la preuve de travail en tant que processus est aussi un excellent moyen de dissuader ceux qui veulent attaquer la chaîne.

### Preuve de travail et sécurité {#security}

Les mineurs sont encouragés à faire ce travail sur la chaîne principale Ethereum. Il n’y a guère d’intérêt pour un sous-ensemble de mineurs à démarrer leur propre chaîne. Cela sape le système. Les blockchains reposent sur un seul état comme source de vérité. Et les utilisateurs choisiront toujours la chaîne la plus longue ou la plus « lourde ».

L'objectif de la preuve de travail est d'étendre la chaîne. La chaîne la plus longue est la plus crédible en terme de validité, car c'est elle qui dispose de plus de travail de calcul. Dans le système de preuve de travail Ethereum, il est presque impossible de créer de nouveaux blocs qui effacent les transactions, en créent de fausses, ou de maintenir une seconde chaîne. C'est parce qu'un mineur malveillant devrait toujours résoudre le bloc plus rapidement que tout le monde.

Pour créer systématiquement des blocs malveillants mais valides, vous auriez besoin de plus de 51 % de la puissance de minage du réseau pour battre tout le monde. Une énorme puissance de calcul serait nécessaire pour pouvoir effectuer cette quantité de « travail ». Et l'énergie dépensée pourrait même l'emporter sur les gains que vous feriez lors d'une attaque.

### Économie de la preuve de travail {#economics}

La preuve de travail est également responsable de l'émission de nouvelles devises dans le système et encourage les mineurs à faire le travail.

Les mineurs qui ont réussi à créer un bloc sont récompensés par deux ETH fraîchement frappés mais ne reçoivent plus tous les frais de transaction puisque les frais de base sont brûlés, tandis que le pourboire et la récompense du bloc vont au mineur. Un mineur peut également obtenir 1,75 ETH pour un bloc « oncle ». Les blocs « oncle » sont des blocs valides créés par un mineur pratiquement en même temps qu'un autre mineur a miné le bloc avec succès. Les blocs « oncle » apparaissent généralement en raison de la latence du réseau.

## Finalisation {#finality}

Une transaction est « finalisée » sur Ethereum lorsqu'elle fait partie d'un bloc qui ne peut pas changer.

Parce que les mineurs travaillent de manière décentralisée, deux blocs valides peuvent être minés en même temps. Cela crée une fourche temporaire. Finalement, l'une de ces chaînes deviendra la chaîne acceptée après qu'un bloc suivant aura été miné et ajouté, ce qui la rendra plus longue.

Mais pour compliquer davantage les choses, les transactions rejetées sur la fourche temporaire auront peut-être été incluses dans la chaîne acceptée. Cela signifie que cela pourrait être inversé. La finalisation fait dont référence au délai que vous devez attendre avant de considérer une transaction comme irréversible. Pour Ethereum, le délai recommandé est de six blocs ou un peu plus d'une minute. Après six blocs, vous pouvez penser avec une relative confiance que la transaction est réussie. Vous pouvez attendre plus longtemps pour que votre assurance soit encore plus grandes.

La finalisation est une chose à garder à l'esprit lors de la conception de dApps. Ce serait une mauvaise expérience utilisateur de dénaturer les informations de transaction à vos utilisateurs, surtout si la transaction est de grande valeur.

N'oubliez pas que ce délai n'inclut pas les temps d'attente pour qu'une transaction soit prise en charge par un mineur.

## Consommation d'énergie et preuve de travail {#energy}

Une critique majeure de la preuve de travail est la quantité d'énergie nécessaire pour assurer la sécurité du réseau. Pour maintenir la sécurité et la décentralisation, Ethereum en preuve de travail consomme chaque année 73,2 TWh, l'équivalent énergétique d'un pays de taille moyenne comme l'Autriche.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                                                                                                       | Inconvénients                                                                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| La preuve de travail est neutre. Vous n'avez pas besoin d'ETH pour commencer et les récompenses de bloc vous permettent de passer de 0 ETH à un solde positif. Avec la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/) vous avez besoin de posséder de l'ETH pour commencer. | La preuve de travail consomme tellement d'énergie que c'est mauvais pour l'environnement.                                                                           |
| La preuve de travail est un mécanisme de consensus éprouvé qui a permis de sécuriser et de décentraliser les Bitcoins et Ethereum depuis de nombreuses années.                                                                                                                                  | Si vous voulez miner, vous avez besoin de tels équipements spécialisés que l'investissement pour commencer est important.                                           |
| Comparé à la preuve d'enjeu, elle est relativement facile à implémenter.                                                                                                                                                                                                                        | En raison des besoins de calcul croissants, les pools de minage pourraient potentiellement dominer le jeu, entraînant des risques de centralisation et de sécurité. |

## Comparaison avec la preuve d'enjeu {#compared-to-pos}

À un niveau élevé, la preuve d'enjeu a le même objectif que la preuve de travail : aider le réseau décentralisé à parvenir à un consensus de façon sécurisée. Mais il existe quelques différences en matière de processus et de personnel :

- La preuve d'enjeu remplace l'importance de la puissance de calcul par l'ETH misé.
- La preuve d'enjeu remplace les mineurs par des validateurs. Les validateurs misent leurs ETH pour activer la possibilité de créer des blocs.
- Les validateurs ne sont pas en concurrence pour créer des blocs. Au lieu de cela, ils sont choisis au hasard par un algorithme.
- La finalisation est plus claire : à certains points de contrôle, si les deux tiers des validateurs s'accordent sur l'état d'un bloc, il est considéré comme définitif. Les validateurs doivent parier la totalité de leur mise sur cela, donc s'ils sont coupables de collusion, ils la perdront.

[En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)

## En savoir plus via un apprenti visuel ? {#visual-learner}

<YouTube id="3EUAcxhuoU4" />

## Complément d'information {#further-reading}

- [Attaque de la majorité](https://en.bitcoin.it/wiki/Majority_attack)
- [Finalisation du règlement](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Vidéos {#videos}

- [Une explication technique des protocoles de preuve de travail](https://youtu.be/9V1bipPkCTU)

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
