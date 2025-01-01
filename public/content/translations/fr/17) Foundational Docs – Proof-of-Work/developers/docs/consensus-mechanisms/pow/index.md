---
title: Preuve de travail (PoW)
description: Explication du protocole de consensus « preuve de travail » et de son rôle dans Ethereum.
lang: fr
---

Le réseau Ethereum a commencé par utiliser un mécanisme de consensus basé sur la **[Preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow)**. Cela permet à l'ensemble des nœuds du réseau Ethereum de s'accorder sur l'état de toutes les informations enregistrées sur la blockchain Ethereum, empêchant ainsi certains types d'attaques économiques. Ethereum a néanmoins abandonné la preuve de travail en 2022 et a commencé à utiliser la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos).

<InfoBanner emoji=":wave:">
    La preuve de travail est maintenant obsolète. Ethereum n'utilise plus la preuve de travail dans le cadre de son mécanisme de consensus. En lieu et place, Ethereum utilise la preuve d'enjeu. En savoir plus sur la <a href="/developers/docs/consensus-mechanisms/pos/">preuve d'enjeu</a> et le <a href="/staking/">staking</a>.
</InfoBanner>

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles concernant [les transactions](/developers/docs/transactions/), [les blocs](/developers/docs/blocks/) et [les mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est ce que la preuve de travail (PoW) ? {#what-is-pow}

Le consensus Nakamoto, qui utilise la preuve de travail, est le mécanisme qui a autrefois permis au réseau Ethereum décentralisé de parvenir à un consensus (c.-à-d. que l'ensemble des nœuds sont d'accord) sur des choses telles que les soldes des comptes et l'ordre des transactions. Cela empêche les utilisateurs d'effectuer une « double dépense » et garantit qu'il est extrêmement difficile d'attaquer la chaîne Ethereum ou de la manipuler. Ces propriétés de sécurité proviennent désormais de la preuve d'enjeu, en utilisant le mécanisme de consensus connu sous le nom de [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Preuve de travail et minage {#pow-and-mining}

La preuve de travail est l'algorithme sous-jacent qui définit la difficulté et les règles pour le travail réalisé par les mineurs sur les blockchains de preuve de travail. Le minage est le « travail » en lui-même. C'est l'acte d'ajouter des blocs valides à la chaîne. Ce point est important, dans la mesure où la longueur de la chaîne aide le réseau à suivre la bonne fourche de la blockchain. Plus il y a de « travail » effectué, plus la chaîne est longue, plus le nombre de blocs est élevé, plus le réseau peut être certain de l'état actuel des choses.

[En savoir plus sur le minage](/developers/docs/consensus-mechanisms/pow/mining/)

## Comment fonctionne la preuve de travail pour Ethereum ? {#how-it-works}

Les transactions Ethereum sont traitées en blocs. Avec le processus désormais obsolète de preuve de travail d'Ethereum, chaque bloc contenait :

- une difficulté de bloc (par ex. : 3,324,092,183,262,715) ;
- un mixHash (par ex. : `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`) ;
- un nonce (par ex. : `0xd3ee432b4fb3d26b`).

Ces données de bloc étaient directement liées à la preuve de travail.

### Le travail en preuve de travail {#the-work}

Le protocole de preuve de travail, Ethash, exige des mineurs qu'ils se livrent à une intense course d'essais et d'erreurs pour trouver le nonce d'un bloc. Seuls les blocs avec un nonce valide peuvent être ajoutés à la chaîne.

Lors de la course visant à créer un bloc, un mineur soumet de façon répétée un ensemble de données (qu'il ne peut obtenir qu'en téléchargeant et en exécutant la chaîne complète, comme le fait un mineur) à une fonction mathématique. Le jeu de données est utilisé pour générer un mixHash en dessous d'une cible dictée par la difficulté du bloc. La meilleure façon d'y arriver est de faire des essais et des erreurs.

La difficulté détermine la cible du hachage. Plus la cible est basse, plus l'ensemble de hachages valides est petit. Une fois généré, il est incroyablement facile à vérifier pour les autres mineurs et clients. Même si une transaction devait changer, le hachage serait complètement différent, signalant une fraude.

Le hachage facilite la détection de la fraude. Mais la preuve de travail en tant que processus était aussi un excellent moyen de dissuasion contre les attaques de la chaîne.

### Preuve de travail et sécurité {#security}

Les mineurs étaient encouragés à faire ce travail sur la chaîne principale Ethereum. Il n’y avait guère d’intérêt pour un sous-ensemble de mineurs à démarrer leur propre chaîne. Cela saperait le système. Les blockchains reposent sur un seul état comme source de vérité.

L'objectif de la preuve de travail était d'étendre la chaîne. La chaîne la plus longue était la plus crédible en termes de validité, car elle enregistrait le travail de calcul le plus important pour la générer. Dans le système de preuve de travail Ethereum, il était presque impossible de créer de nouveaux blocs susceptibles d'effacer les transactions, d'en créer de fausses, ou de maintenir une seconde chaîne. C'est parce qu'un mineur malveillant aurait toujours dû résoudre le nonce du bloc plus rapidement que les autres.

Pour créer de manière constante des blocs malveillants mais valides, un mineur malhonnête aurait besoin de plus de 51 % de la puissance de minage du réseau pour battre tout le monde. Cette quantité de « travail » nécessite une énorme et coûteuse puissance informatique et l'énergie dépensée pourrait même dépasser les gains obtenus avec une attaque.

### Économie de la preuve de travail {#economics}

La preuve de travail était également responsable de l'émission de nouvelles devises dans le système et encourageait les mineurs à y travailler.

Depuis [la mise à jour Constantinople](/history/#constantinople), les mineurs ayant réussi à créer un bloc étaient récompensés par deux ETH fraîchement minés et une partie des frais de transaction. Les blocs Ommer étaient également récompensés par 1,75 ETH. Les blocs Ommer étaient des blocs valides créés par un mineur pratiquement en même temps qu'un autre mineur créait le bloc canonique, qui était finalement déterminé par la chaîne construite en premier. Les blocs Ommer apparaissaient généralement en raison de la latence du réseau.

## Finalisation {#finality}

Une transaction était « finalisée » sur Ethereum lorsqu'elle faisait partie d'un bloc qui ne pouvait pas changer.

Dans la mesure où les mineurs travaillaient de manière décentralisée, deux blocs valides pouvaient être minés en même temps. Cela créait une fourche temporaire. Finalement, l'une de ces chaînes devenait la chaîne acceptée après qu'un bloc suivant aura été miné et ajouté, ce qui la rendra plus longue.

Mais pour compliquer davantage les choses, les transactions rejetées sur la fourche temporaire pouvaient ne pas avoir été incluses dans la chaîne acceptée. Cela signifie qu'elle pourrait être inversée. La finalisation fait dont référence au temps que vous devez attendre avant de considérer une transaction comme irréversible. Dans le cadre de la précédente preuve de travail d'Ethereum, plus le nombre de blocs minés au-dessus d'un bloc spécifique `N` était élevé, plus la confiance dans les transactions de `N` était élevée et n'était pas inversée. Désormais, avec la preuve d'enjeu, la finalisation d'un bloc est une propriété explicite, plutôt que probabiliste.

## Consommation d'énergie et preuve de travail {#energy}

Une critique majeure de la preuve de travail est la quantité d'énergie nécessaire pour assurer la sécurité du réseau. Pour maintenir la sécurité et la décentralisation, Ethereum consommait de grandes quantités d'énergie avec la preuve de travail. Peu avant de passer à la preuve d'enjeu, les mineurs d'Ethereum consommaient collectivement environ 70 TWh/an (à peu près autant que la République tchèque - selon le [digiconomist](https://digiconomist.net/) le 18 juillet 2022).

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
- [A propos de l'accord de finalisation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/)

### Vidéos {#videos}

- [Une explication technique des protocoles de preuve de travail](https://youtu.be/9V1bipPkCTU)

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)
