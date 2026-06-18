---
title: Récompenses et sanctions de la preuve d'enjeu
description: Découvrez les incitations intégrées au protocole dans la preuve d'enjeu d'Ethereum.
lang: fr
---

[Ethereum](/) est sécurisé à l'aide de sa cryptomonnaie native, l'ether (ETH). Les opérateurs de nœuds qui souhaitent participer à la validation des blocs et à l'identification de la tête de la chaîne déposent de l'ether dans le [contrat de dépôt](/staking/deposit-contract/) sur Ethereum. Ils sont ensuite payés en ether pour exécuter un logiciel client de validateur qui vérifie la validité des nouveaux blocs reçus sur le réseau pair à pair et applique l'algorithme de choix de fork pour identifier la tête de la chaîne.

Il y a deux rôles principaux pour un validateur : 1) vérifier les nouveaux blocs et les « attester » s'ils sont valides, 2) proposer de nouveaux blocs lorsqu'il est sélectionné au hasard parmi l'ensemble des validateurs. Si le validateur ne parvient pas à accomplir l'une de ces tâches lorsqu'on le lui demande, il passe à côté d'un paiement en ether. Les validateurs sont également parfois chargés de l'agrégation de signatures et de la participation aux comités de synchronisation.

Il existe également certaines actions qui sont très difficiles à réaliser accidentellement et qui signifient une intention malveillante, comme proposer plusieurs blocs pour le même créneau ou attester de plusieurs blocs pour le même créneau. Ce sont des comportements passibles de « réduction » qui entraînent la destruction d'une certaine quantité d'ether du validateur (jusqu'à 1 ETH) avant que le validateur ne soit retiré du réseau, ce qui prend 36 jours. L'ether du validateur sanctionné s'épuise lentement tout au long de la période de sortie, mais au 18e jour, il reçoit une « pénalité de corrélation » qui est d'autant plus importante que le nombre de validateurs sanctionnés au même moment est élevé. La structure d'incitation du mécanisme de consensus récompense donc l'honnêteté et punit les mauvais acteurs.

Toutes les récompenses et sanctions sont appliquées une fois par époque.

Lisez la suite pour plus de détails...

## Récompenses et sanctions {#rewards}

### Récompenses {#rewards-2}

Les validateurs reçoivent des récompenses lorsqu'ils émettent des votes qui sont cohérents avec la majorité des autres validateurs, lorsqu'ils proposent des blocs et lorsqu'ils participent à des comités de synchronisation. La valeur des récompenses à chaque époque est calculée à partir d'une `base_reward`. Il s'agit de l'unité de base à partir de laquelle les autres récompenses sont calculées. La `base_reward` représente la récompense moyenne reçue par un validateur dans des conditions optimales par époque. Elle est calculée à partir du solde effectif du validateur et du nombre total de validateurs actifs comme suit :

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

où `base_reward_factor` est 64, `base_rewards_per_epoch` est 4 et `sum(active balance)` est le total d'ether mis en jeu par l'ensemble des validateurs actifs.

Cela signifie que la récompense de base est proportionnelle au solde effectif du validateur et inversement proportionnelle au nombre de validateurs sur le réseau. Plus il y a de validateurs, plus l'émission globale est importante (car `sqrt(N)`) mais plus la `base_reward` par validateur est faible (car `1/sqrt(N)`). Ces facteurs influencent l'APR pour un nœud de staking. Lisez la justification de cela dans les [notes de Vitalik](https://notes.ethereum.org/@vbuterin/serenity_design_rationale?type=view#Base-rewards).

La récompense totale est ensuite calculée comme la somme de cinq composantes qui ont chacune une pondération déterminant la contribution de chaque composante à la récompense totale. Les composantes sont :

```
1. vote source : le validateur a voté à temps pour le bon point de contrôle source
2. vote cible : le validateur a voté à temps pour le bon point de contrôle cible
3. vote de tête : le validateur a voté à temps pour le bon bloc de tête
4. récompense du comité de synchronisation : le validateur a participé à un comité de synchronisation
5. récompense du proposeur : le validateur a proposé un bloc dans le bon créneau
```

Les pondérations pour chaque composante sont les suivantes :

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

La somme de ces pondérations est de 64. La récompense est calculée comme la somme des pondérations applicables divisée par 64. Un validateur qui a effectué des votes source, cible et de tête en temps opportun, proposé un bloc et participé à un comité de synchronisation pourrait recevoir `64/64 * base_reward == base_reward`. Cependant, un validateur n'est généralement pas un proposeur de bloc, sa récompense maximale est donc de `64-8 /64 * base_reward == 7/8 * base_reward`. Les validateurs qui ne sont ni des proposeurs de blocs ni dans un comité de synchronisation peuvent recevoir `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Une récompense supplémentaire est ajoutée pour encourager les attestations rapides. Il s'agit de la `inclusion_delay_reward`. Sa valeur est égale à la `base_reward` multipliée par `1/delay` où `delay` est le nombre de créneaux séparant la proposition de bloc et l'attestation. Par exemple, si l'attestation est soumise dans le créneau suivant la proposition de bloc, l'attestateur reçoit `base_reward * 1/1 == base_reward`. Si l'attestation arrive dans le créneau d'après, l'attestateur reçoit `base_reward * 1/2` et ainsi de suite.

Les proposeurs de blocs reçoivent `8 / 64 * base_reward` pour **chaque attestation valide** incluse dans le bloc, de sorte que la valeur réelle de la récompense évolue avec le nombre de validateurs attestant. Les proposeurs de blocs peuvent également augmenter leur récompense en incluant des preuves de mauvais comportement d'autres validateurs dans le bloc qu'ils proposent. Ces récompenses sont les « carottes » qui encouragent l'honnêteté des validateurs. Un proposeur de bloc qui inclut une réduction sera récompensé par la `slashed_validators_effective_balance / 512`.

### Sanctions {#penalties}

Jusqu'à présent, nous avons considéré des validateurs au comportement irréprochable, mais qu'en est-il des validateurs qui n'effectuent pas leurs votes de tête, source et cible à temps ou qui le font lentement ?

Les sanctions pour avoir manqué les votes cible et source sont égales aux récompenses que l'attestateur aurait reçues s'il les avait soumis. Cela signifie qu'au lieu de voir la récompense ajoutée à leur solde, une valeur égale est déduite de leur solde. Il n'y a aucune sanction pour avoir manqué le vote de tête (c'est-à-dire que les votes de tête sont uniquement récompensés, jamais sanctionnés). Il n'y a aucune sanction associée à la `inclusion_delay` - la récompense ne sera tout simplement pas ajoutée au solde du validateur. Il n'y a pas non plus de sanction en cas d'échec de proposition d'un bloc.

Pour en savoir plus sur les récompenses et les sanctions, consultez les [spécifications du consensus](https://github.com/ethereum/consensus-specs/blob/master/specs/altair/beacon-chain.md). Les récompenses et les sanctions ont été ajustées lors de la mise à jour Bellatrix - regardez Danny Ryan et Vitalik en discuter dans cette [vidéo Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Réduction {#slashing}

La réduction est une action plus sévère qui entraîne le retrait forcé d'un validateur du réseau et une perte associée de son ether mis en jeu. Il y a trois façons pour un validateur de subir une réduction, toutes revenant à la proposition ou à l'attestation malhonnête de blocs :

- En proposant et en signant deux blocs différents pour le même créneau
- En attestant d'un bloc qui en « entoure » un autre (modifiant ainsi l'historique)
- En effectuant un « double vote » en attestant de deux candidats pour le même bloc

Si ces actions sont détectées, le validateur subit une réduction. Cela signifie que 0,0078125 ETH sont immédiatement détruits pour un validateur de 32 ETH (mis à l'échelle de façon linéaire avec le solde actif), puis une période de retrait de 36 jours commence. Pendant cette période de retrait, la mise du validateur s'épuise progressivement. À mi-parcours (jour 18), une sanction supplémentaire est appliquée, dont l'ampleur évolue avec le total d'ether mis en jeu par tous les validateurs sanctionnés au cours des 36 jours précédant l'événement de réduction. Cela signifie que lorsque davantage de validateurs sont sanctionnés, l'ampleur de la réduction augmente. La réduction maximale correspond au solde effectif total de tous les validateurs sanctionnés (c'est-à-dire que si de nombreux validateurs sont sanctionnés, ils pourraient perdre l'intégralité de leur mise). En revanche, un événement de réduction unique et isolé ne détruit qu'une petite partie de la mise du validateur. Cette sanction à mi-parcours qui évolue avec le nombre de validateurs sanctionnés est appelée la « pénalité de corrélation ».

## Fuite d'inactivité {#inactivity-leak}

Si la couche de consensus a passé plus de quatre époques sans finaliser, un protocole d'urgence appelé la « fuite d'inactivité » est activé. Le but ultime de la fuite d'inactivité est de créer les conditions requises pour que la chaîne retrouve sa finalité. Comme expliqué ci-dessus, la finalité nécessite qu'une majorité des 2/3 du total de l'ether mis en jeu s'accorde sur les points de contrôle source et cible. Si des validateurs représentant plus d'un tiers du total des validateurs se déconnectent ou ne parviennent pas à soumettre des attestations correctes, il n'est alors pas possible pour une supermajorité des 2/3 de finaliser les points de contrôle. La fuite d'inactivité permet à la mise appartenant aux validateurs inactifs de s'épuiser progressivement jusqu'à ce qu'ils contrôlent moins d'un tiers de la mise totale, permettant aux validateurs actifs restants de finaliser la chaîne. Quelle que soit la taille du groupe de validateurs inactifs, les validateurs actifs restants finiront par contrôler > 2/3 de la mise. La perte de la mise est une forte incitation pour les validateurs inactifs à se réactiver le plus rapidement possible ! Un scénario de fuite d'inactivité a été rencontré sur le réseau de test Medalla lorsque < 66 % des validateurs actifs ont pu parvenir à un consensus sur la tête actuelle de la chaîne de blocs. La fuite d'inactivité a été activée et la finalité a finalement été retrouvée !

La conception des récompenses, des sanctions et des réductions du mécanisme de consensus encourage les validateurs individuels à se comporter correctement. Cependant, de ces choix de conception émerge un système qui incite fortement à une répartition égale des validateurs sur plusieurs clients, et devrait fortement décourager la domination d'un seul client.

## Complément d'information {#further-reading}

- [Mise à niveau d'Ethereum : la couche d'incitation](https://eth2book.info/altair/part2/incentives)
- [Incitations dans le protocole hybride Casper d'Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Spécifications annotées de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Conseils de prévention des réductions sur Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analyse des sanctions de réduction sous l'EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Sources_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_