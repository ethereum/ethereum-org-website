---
title: Preuve de travail (PoW)
description: Une explication du protocole de consensus de preuve de travail et de son rôle dans Ethereum.
lang: fr
---

Le réseau [Ethereum](/) a commencé par utiliser un mécanisme de consensus qui impliquait la **[preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow)**. Cela permettait aux nœuds du réseau Ethereum de s'accorder sur l'état de toutes les informations enregistrées sur la chaîne de blocs Ethereum et empêchait certains types d'attaques économiques. Cependant, Ethereum a désactivé la preuve de travail en 2022 et a commencé à utiliser la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos) à la place.

<Alert variant="update">
<AlertEmoji text=":wave:"/>
<AlertContent>
<AlertDescription>
    La preuve de travail est désormais obsolète. Ethereum n'utilise plus la preuve de travail dans le cadre de son mécanisme de consensus. À la place, il utilise la preuve d'enjeu. Pour en savoir plus, consultez les pages sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) et le [staking](/staking/).
</AlertDescription>
</AlertContent>
</Alert>

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord les articles sur les [transactions](/developers/docs/transactions/), les [blocs](/developers/docs/blocks/) et les [mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la preuve de travail (PoW) ? {#what-is-pow}

Le consensus de Nakamoto, qui utilise la preuve de travail, est le mécanisme qui permettait autrefois au réseau Ethereum décentralisé de parvenir à un consensus (c'est-à-dire que tous les nœuds sont d'accord) sur des éléments tels que les soldes des comptes et l'ordre des transactions. Cela empêchait les utilisateurs de « dépenser deux fois » leurs pièces et garantissait que la chaîne Ethereum était extrêmement difficile à attaquer ou à manipuler. Ces propriétés de sécurité proviennent désormais de la preuve d'enjeu qui utilise le mécanisme de consensus connu sous le nom de [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/).

## Preuve de travail et minage {#pow-and-mining}

La preuve de travail est l'algorithme sous-jacent qui définit la difficulté et les règles du travail que les mineurs effectuent sur les chaînes de blocs à preuve de travail. Le minage est le « travail » en lui-même. C'est l'action d'ajouter des blocs valides à la chaîne. C'est important car la longueur de la chaîne aide le réseau à suivre le bon fork de la chaîne de blocs. Plus le « travail » effectué est important, plus la chaîne est longue, et plus le numéro de bloc est élevé, plus le réseau peut être certain de l'état actuel des choses.

[En savoir plus sur le minage](/developers/docs/consensus-mechanisms/pow/mining/)

## Comment fonctionnait la preuve de travail d'Ethereum ? {#how-it-works}

Les transactions Ethereum sont traitées dans des blocs. Dans la version désormais obsolète d'Ethereum basée sur la preuve de travail, chaque bloc contenait :

- la difficulté du bloc – par exemple : 3,324,092,183,262,715
- le mixHash – par exemple : `0x44bca881b07a6a09f83b130798072441705d9a665c5ac8bdf2f39a3cdf3bee29`
- le nonce – par exemple : `0xd3ee432b4fb3d26b`

Ces données de bloc étaient directement liées à la preuve de travail.

### Le travail dans la preuve de travail {#the-work}

Le protocole de preuve de travail, Ethash, obligeait les mineurs à se lancer dans une course intense d'essais et d'erreurs pour trouver le nonce d'un bloc. Seuls les blocs avec un nonce valide pouvaient être ajoutés à la chaîne.

Lors de la course pour créer un bloc, un mineur soumettait de manière répétée un ensemble de données, qui ne pouvait être obtenu qu'en téléchargeant et en exécutant la chaîne complète (comme le fait un mineur), à une fonction mathématique. L'ensemble de données était utilisé pour générer un mixHash inférieur à une cible dictée par la difficulté du bloc. La meilleure façon d'y parvenir est de procéder par essais et erreurs.

La difficulté déterminait la cible pour le hash. Plus la cible était basse, plus l'ensemble des hashs valides était restreint. Une fois généré, il était incroyablement facile pour les autres mineurs et clients de le vérifier. Même si une seule transaction venait à changer, le hash serait complètement différent, signalant ainsi une fraude.

Le hachage permet de repérer facilement la fraude. Mais la preuve de travail en tant que processus était également un moyen de dissuasion majeur contre les attaques sur la chaîne.

### Preuve de travail et sécurité {#security}

Les mineurs étaient incités à effectuer ce travail sur la chaîne principale Ethereum. Il y avait peu d'incitation pour un sous-ensemble de mineurs à démarrer leur propre chaîne — cela fragilise le système. Les chaînes de blocs reposent sur le fait d'avoir un état unique comme source de vérité.

L'objectif de la preuve de travail était d'étendre la chaîne. La chaîne la plus longue était la plus crédible en tant que chaîne valide car elle avait nécessité le plus de travail informatique pour être générée. Dans le système PoW d'Ethereum, il était presque impossible de créer de nouveaux blocs qui effacent des transactions, d'en créer de fausses ou de maintenir une deuxième chaîne. En effet, un mineur malveillant aurait dû toujours résoudre le nonce du bloc plus rapidement que tout le monde.

Pour créer systématiquement des blocs malveillants mais valides, un mineur malveillant aurait eu besoin de plus de 51 % de la puissance de minage du réseau pour battre tous les autres. Cette quantité de « travail » nécessite une puissance de calcul très coûteuse et l'énergie dépensée aurait même pu dépasser les gains réalisés lors d'une attaque.

### Économie de la preuve de travail {#economics}

La preuve de travail était également responsable de l'émission de nouvelle monnaie dans le système et de l'incitation des mineurs à faire le travail.

Depuis la mise à niveau [Constantinople](/ethereum-forks/#constantinople), les mineurs qui créaient un bloc avec succès étaient récompensés par deux ETH fraîchement émis et une partie des frais de transaction. Les blocs oncles (ommer blocks) rapportaient également une compensation de 1,75 ETH. Les blocs oncles étaient des blocs valides créés par un mineur pratiquement en même temps qu'un autre mineur créait le bloc canonique, ce qui était finalement déterminé par la chaîne sur laquelle on construisait en premier. Les blocs oncles se produisaient généralement en raison de la latence du réseau.

## Finalité {#finality}

Une transaction a une « finalité » sur Ethereum lorsqu'elle fait partie d'un bloc qui ne peut pas changer.

Parce que les mineurs travaillaient de manière décentralisée, deux blocs valides pouvaient être minés en même temps. Cela crée un fork temporaire. Finalement, l'une de ces chaînes devenait la chaîne acceptée après que des blocs ultérieurs aient été minés et y aient été ajoutés, la rendant plus longue.

Pour compliquer encore les choses, les transactions rejetées sur le fork temporaire pouvaient ne pas avoir été incluses dans la chaîne acceptée. Cela signifie qu'elles pouvaient être annulées. La finalité fait donc référence au temps que vous devez attendre avant de considérer une transaction comme irréversible. Sous l'ancien Ethereum à preuve de travail, plus il y avait de blocs minés au-dessus d'un bloc spécifique `N`, plus on pouvait avoir confiance dans le fait que les transactions dans `N` avaient réussi et ne seraient pas annulées. Désormais, avec la preuve d'enjeu, la finalisation est une propriété explicite, plutôt que probabiliste, d'un bloc.

## Consommation d'énergie de la preuve de travail {#energy}

Une critique majeure de la preuve de travail est la quantité d'énergie requise pour assurer la sécurité du réseau. Pour maintenir la sécurité et la décentralisation, Ethereum sous preuve de travail consommait de grandes quantités d'énergie. Peu avant de passer à la preuve d'enjeu, les mineurs d'Ethereum consommaient collectivement environ 70 TWh/an (à peu près autant que la République tchèque - selon [digiconomist](https://digiconomist.net/) le 18 juillet 2022).

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                                         | Inconvénients                                                                                                                                         |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| La preuve de travail est neutre. Vous n'avez pas besoin d'ETH pour commencer et les récompenses de bloc vous permettent de passer de 0 ETH à un solde positif. Avec la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/), vous avez besoin d'ETH pour commencer. | La preuve de travail consomme tellement d'énergie qu'elle est mauvaise pour l'environnement.                                                                      |
| La preuve de travail est un mécanisme de consensus éprouvé qui a permis de garder Bitcoin et Ethereum sécurisés et décentralisés pendant de nombreuses années.                                                                                          | Si vous voulez miner, vous avez besoin d'un équipement tellement spécialisé que cela représente un gros investissement de départ.                                                |
| Comparée à la preuve d'enjeu, elle est relativement facile à mettre en œuvre.                                                                                                                                                                | En raison des besoins croissants en calcul, les pools de minage pourraient potentiellement dominer le jeu du minage, entraînant une centralisation et des risques de sécurité. |

## Comparaison avec la preuve d'enjeu {#compared-to-pos}

À un niveau global, la preuve d'enjeu a le même objectif final que la preuve de travail : aider le réseau décentralisé à parvenir à un consensus de manière sécurisée. Mais elle présente quelques différences en termes de processus et d'intervenants :

- La preuve d'enjeu remplace l'importance de la puissance de calcul par des ETH mis en jeu (stakés).
- La preuve d'enjeu remplace les mineurs par des validateurs. Les validateurs stakent leurs ETH pour activer la capacité de créer de nouveaux blocs.
- Les validateurs ne sont pas en concurrence pour créer des blocs, ils sont plutôt choisis au hasard par un algorithme.
- La finalité est plus claire : à certains points de contrôle, si 2/3 des validateurs sont d'accord sur l'état du bloc, il est considéré comme final. Les validateurs doivent parier toute leur mise là-dessus, donc s'ils essaient de s'entendre par la suite, ils perdront toute leur mise.

[En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)

## Vous préférez les explications visuelles ? {#visual-learner}

<VideoWatch slug="proof-of-work-explained" />

## Lectures complémentaires {#further-reading}

- [Attaque majoritaire](https://en.bitcoin.it/wiki/Majority_attack)
- [Sur la finalité du règlement](https://blog.ethereum.org/2016/05/09/on-settlement-finality)

### Vidéos {#videos}

- [Une explication technique des protocoles de preuve de travail](https://youtu.be/9V1bipPkCTU)

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)