---
title: "Récompenses et pénalités de preuve d'enjeu"
description: "Découvrez les incitations intégrées au protocole dans la preuve de mise en jeu d'Ethereum."
lang: fr
---

Ethereum est sécurisé à l'aide de sa cryptomonnaie native, l'ether (ETH). Les opérateurs de nœuds qui souhaitent participer à la validation des blocs et à l'identification de la tête de la chaîne déposent de l'éther dans le [contrat de dépôt](/staking/deposit-contract/) sur Ethereum. Ils sont ensuite payés en ether pour exécuter un logiciel de validateur qui vérifie la validité des nouveaux blocs reçus sur le réseau peer-to-peer et applique l'algorithme de choix de fourche pour identifier la tête de la chaîne.

Il y a deux rôles principaux pour un validateur : 1) vérifier les nouveaux blocs et les « attester » s'ils sont valides, 2) proposer de nouveaux blocs lorsqu'il est sélectionné au hasard dans la réserve de validateur totale. Si le validateur ne parvient pas à faire l'une de ces tâches quand il lui est demandé de ne pas recevoir un paiement par éther. Les validateurs sont aussi parfois chargés d'agréger les signatures et de participer à des comités de synchronisation.

Il existe également certaines actions qui sont très difficiles à réaliser accidentellement et qui signifient une intention malveillante, comme proposer plusieurs blocs pour le même emplacement ou attester de plusieurs blocs pour le même emplacement. Ce sont des comportements « slashable » qui font que le validateur a une certaine quantité d'éther (jusqu'à 1 ETH) brûlé avant que le validateur ne soit retiré du réseau, qui prend 36 jours. L'ether du validateur pénalisé disparait doucement pendant la période de sortie, mais arrivé au jour 18 ils reçoivent une « pénalité de corrélation » qui est d'autant plus importante qu'il y de validateurs pénalisés en même temps. Toutefois, la structure d'incitation à la prise de bénéfices du mécanisme de consensus récompense les acteurs honnêtes et punit les acteurs malhonnêtes.

Les récompenses et les pénalités sont comptabilisées une fois par période.

Continuez pour plus de détails...

## Récompenses et pénalités {#rewards}

### Récompenses {#rewards}

Les validateurs reçoivent des récompenses lorsqu'ils effectuent des votes cohérents avec la majorité des autres validateurs, lorsqu'ils proposent des blocs et lorsqu'ils participent à des comités de synchronisation. La valeur des récompenses à chaque époque est calculée à partir d'une `base_reward`. Il s'agit de l'unité de base à partir de laquelle les autres récompenses sont calculées. La `base_reward` représente la récompense moyenne reçue par un validateur dans des conditions optimales par époque. Ceci est calculé à partir du solde effectif du validateur et du nombre total de validateurs actifs comme suit :

```
base_reward = effective_balance * (base_reward_factor / (base_rewards_per_epoch * sqrt(sum(active_balance))))
```

où `base_reward_factor` est 64, `base_rewards_per_epoch` est 4 et `sum(active balance)` est le total d'ether mis en jeu par l'ensemble des validateurs actifs.

Cela signifie que la récompense de base est proportionnelle au solde effectif du validateur et inversement proportionnelle au nombre de validateurs sur le réseau. Plus il y a de validateurs, plus l'émission globale est importante (en tant que `sqrt(N)`), mais plus la `base_reward` par validateur est petite (en tant que `1/sqrt(N)`). Ces facteurs influencent le Taux de Rendement Annuel (APR) pour un nœud de mise en jeu. Lisez la justification de ceci dans les [notes de Vitalik](https://notes.ethereum.org/@vbuterin/rkhCgQteN?type=view#Base-rewards).

La récompense totale est ensuite calculée comme la somme de cinq composants, chacun ayant un poids qui détermine la contribution de chaque composant à la récompense totale. Les composants sont :

```
1. vote de source : le validateur a voté à temps pour le point de contrôle de source correct
2. vote de cible : le validateur a voté à temps pour le point de contrôle de cible correct
3. vote de tête : le validateur a voté à temps pour le bloc de tête correct
4. récompense du comité de synchronisation : le validateur a participé à un comité de synchronisation
5. récompense du proposant : le validateur a proposé un bloc dans le créneau correct
```

Les pondérations pour chaque composant sont les suivantes :

```
TIMELY_SOURCE_WEIGHT	uint64(14)
TIMELY_TARGET_WEIGHT	uint64(26)
TIMELY_HEAD_WEIGHT	uint64(14)
SYNC_REWARD_WEIGHT	uint64(2)
PROPOSER_WEIGHT	uint64(8)
```

Ces poids s'additionnent pour atteindre 64. La récompense est calculée comme la somme des poids applicables divisée par 64. Un validateur qui a effectué des votes de source, de cible et de tête en temps opportun, proposé un bloc et participé à un comité de synchronisation pourrait recevoir `64/64 * base_reward == base_reward`. Cependant, un validateur n'est généralement pas un proposeur de bloc, donc sa récompense maximale est `64-8 /64 * base_reward == 7/8 * base_reward`. Les validateurs qui ne sont ni des proposeurs de blocs ni dans un comité de synchronisation peuvent recevoir `64-8-2 / 64 * base_reward == 6.75/8 * base_reward`.

Une récompense additionnelle est prévue pour promouvoir les attestations rapides. C'est la `inclusion_delay_reward`. Elle a une valeur égale à la `base_reward` multipliée par `1/delay` où `delay` est le nombre de créneaux séparant la proposition de bloc et l'attestation. Par exemple, si l'attestation est soumise dans un délai d'un créneau après la proposition de bloc, l'attestant reçoit `base_reward * 1/1 == base_reward`. Si l'attestation arrive dans le créneau suivant, l'attestant reçoit `base_reward * 1/2` et ainsi de suite.

Les proposeurs de blocs reçoivent `8 / 64 * base_reward` pour **chaque attestation valide** incluse dans le bloc, donc la valeur réelle de la récompense évolue avec le nombre de validateurs qui attestent. Les proposeurs de blocs peuvent également augmenter leur récompense en incluant des preuves de comportement malhonnête d'autres validateurs dans le bloc qu'ils proposent. Ces récompenses sont les « carottes » qui encouragent l'honnêteté des validateurs. Un proposeur de bloc qui inclut un délestage sera récompensé avec `slashed_validators_effective_balance / 512`.

### Pénalités {#penalties}

Jusqu'à présent, nous avons pris en compte les validateurs qui agissent conformément aux règles, mais qu'en est-il des validateurs qui ne votent pas en temps voulu pour la tête, la source et la cible, ou qui le font lentement ?

Les pénalités pour avoir manqué les votes de cible et de source sont égales aux récompenses que l'attestateur aurait reçues s'il les avait soumis. Cela signifie qu'au lieu d'avoir la récompense ajoutée à leur solde, ils voient une valeur égale retirée de leur solde. Il n'y a pas de pénalité pour avoir manqué le vote de tête (c.-à-d. que les votes de tête sont seulement récompensés, jamais pénalisés). Aucune pénalité n'est associée au `inclusion_delay` : la récompense ne sera tout simplement pas ajoutée au solde du validateur. Il n'y a également aucune pénalité pour ne pas avoir réussi à proposer un bloc.

En savoir plus sur les récompenses et les pénalités dans les [spécifications du consensus](https://github.com/ethereum/consensus-specs/blob/dev/specs/altair/beacon-chain.md). Les récompenses et les pénalités ont été ajustées dans la mise à niveau Bellatrix : regardez Danny Ryan et Vitalik en discuter dans cette [vidéo Peep an EIP](https://www.youtube.com/watch?v=iaAEGs1DMgQ).

## Délestage {#slashing}

Le « slashing » est une action plus sévère qui entraîne la suppression forcée d'un validateur du réseau et la perte associée de leur ether mis en jeu. Il existe trois façons dont un validateur peut être « slashé » (sanctionné), toutes impliquant la proposition ou l'attestation malhonnête de blocs :

- En proposant et signant deux blocs différents pour le même créneau
- En attestant un bloc qui « entoure » un autre bloc (modifiant effectivement l'historique)
- En « votant double » en attestant deux candidats pour le même bloc

Si ces actions sont détectées, le validateur est sanctionné. Cela signifie que 0,0078125 est immédiatement brûlé pour un validateur de 32 ETH (valeur ajustée de manière linéaire en fonction du solde actif), puis une période de retrait de 36 jours commence. Pendant cette période de suppression, la mise du validateur diminue progressivement. À mi-parcours (jour 18), une pénalité supplémentaire est appliquée, dont l'ampleur varie en fonction de l'ether mis en jeu total de tous les validateurs sanctionnés au cours des 36 jours précédant l'événement de « slash ». Cela signifie que lorsque davantage de validateurs sont sanctionnés, l'ampleur de la pénalité augmente. Le délestage maximum est le solde effectif total de tous les validateurs délestés (c.-à-d. que si de nombreux validateurs sont délestés, ils pourraient perdre la totalité de leur mise). D'autre part, un seul événement de « slash » isolé ne brûle qu'une petite partie de la mise du validateur. Cette pénalité intermédiaire qui varie en fonction du nombre de validateurs sanctionnés est appelée « pénalité de corrélation ».

## Fuite d'inactivité {#inactivity-leak}

Si la couche de consensus a passé plus de quatre périodes sans se finaliser, un protocole d'urgence appelé « fuite d'inactivité » est activé. Le but ultime de la fuite d'inactivité est de créer les conditions nécessaires pour que la chaîne retrouve sa finalité. Comme expliqué précédemment, la finalité nécessite une majorité de 2/3 de l'ether mis en jeu total pour s'entendre sur les points de contrôle source et cible. Si les validateurs représentant plus d'1/3 du total des validateurs se déconnectent ou ne soumettent pas les attestations correctes, il n'est pas possible pour une supermajorité des 2/3 de finaliser les points de contrôle. La fuite d'inactivité permet à la mise participant aux validateurs inactifs de s'épuiser progressivement jusqu'à ce qu'ils contrôlent moins d'un tiers de la mise totale, permettant ainsi aux validateurs actifs restants de finaliser la chaîne. Cependant, quelle que soit la taille du groupe de validateurs inactifs, les validateurs actifs restants finiront par contrôler plus de 2/3 des ETH en jeu. La perte d'ETH est une forte incitation pour les validateurs inactifs à se réactiver dès que possible ! Un scénario de fuite d'inactivité a été rencontré sur le réseau de test Medalla lorsque moins de 66 % des validateurs actifs ont pu parvenir à un consensus sur la tête actuelle de la blockchain. La fuite d'inactivité a été activée et la finalité a finalement été retrouvée !

La récompense, la pénalité et le mécanisme de sanction du mécanisme de consensus encouragent les validateurs individuels à se comporter correctement. Cependant, de ces choix de conception émerge un système qui encourage fortement une répartition égale des validateurs entre plusieurs clients, et devrait fortement décourager la domination d’un seul client.

## En savoir plus {#further-reading}

- [Mettre à niveau Ethereum : la couche d'incitation](https://eth2book.info/altair/part2/incentives)
- [Incitatifs dans le protocole hybride Casper d'Ethereum](https://arxiv.org/pdf/1903.04205.pdf)
- [Spécifications annotées de Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#rewards-and-penalties-1)
- [Conseils pour la prévention du délestage sur Eth2](https://medium.com/prysmatic-labs/eth2-slashing-prevention-tips-f6faa5025f50)
- [Analyse des pénalités de délestage dans le cadre de l'EIP-7251](https://ethresear.ch/t/slashing-penalty-analysis-eip-7251/16509)

_Sources_

- _[https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/](https://benjaminion.xyz/eth2-annotated-spec/phase0/beacon-chain/)_
