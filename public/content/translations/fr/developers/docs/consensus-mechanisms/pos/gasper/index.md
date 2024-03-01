---
title: Gasper
description: Explication du mécanisme de preuve d'enjeu Gasper.
lang: fr
---

Gasper est une combinaison de Casper the Friendly Finality Gadget (Casper-FFG) et de l'algorithme de choix de fourche LMD-GHOST. Ensemble, ces composants forment le mécanisme de consensus qui garantit la preuve d'enjeu d'Ethereum. Casper est le mécanisme qui met à niveau certains blocs vers le statut « finalized » afin que les nouveaux entrants sur le réseau puissent être sûrs qu'ils se synchronisent à la chaîne canonique. L'algorithme de choix de fourche utilise des votes cumulés pour s'assurer que les nœuds peuvent facilement sélectionner le bon lorsque des fourches apparaissent dans la blockchain.

**Remarquez** que la définition originale de Casper-FFG a été légèrement mise à jour pour l'inclusion dans Gasper. Sur cette page, nous considérerons la version mise à jour.

## Prérequis

Pour comprendre ce mécanisme, il est nécessaire de lire la page d'introduction sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/).

## Le rôle de Gasper {#role-of-gasper}

Gasper est installé au-dessus d'une blockchain de preuve d'enjeu où les nœuds fournissent un éther comme dépôt de sécurité qui peut être détruit s'ils sont paresseux ou malhonnêtes en proposant ou en validant des blocs. Gasper est le mécanisme qui définit comment les validateurs sont récompensés et punis, décide quels blocs accepter et rejeter, et sur quelle fourche de la blockchain les créer.

## Qu’est-ce que la finalité ? {#what-is-finality}

La finalité est une propriété de certains blocs qui signifie qu'ils ne peuvent pas être inversés à moins qu'il y ait eu un échec critique du consensus et qu'un attaquant ait détruit au moins 1/3 du total des éthers mis en jeu. Les blocs finalisés peuvent être considérés comme des informations dont la blockchain est certaine. Pour qu'un bloc soit finalisé, il doit passer par une procédure de mise à niveau en deux étapes :

1. Deux tiers du total des éthers mis en jeu doivent avoir voté en faveur de l'inclusion de ce bloc dans la chaîne canonique. Cette condition fait passer le bloc à « justifié ». Les blocs justifiés ont peu de chances d'être annulés, mais ils peuvent l'être sous certaines conditions.
2. Lorsqu'un autre bloc est justifié au-dessus d'un bloc justifié, il passe à « finalisé ». La finalisation d'un bloc est un engagement à inclure le bloc dans la chaîne canonique. Il ne peut pas être inversé à moins qu'un attaquant ne détruise des millions d'éther (des milliards de $USD).

Ces améliorations de blocs ne se produisent pas dans tous les emplacements. Au lieu de cela, seuls les blocs à la limite de la période peuvent être justifiés et finalisés. Ces blocs sont appelés « points de contrôle ». La mise à niveau considère des paires de points de contrôle. Un « lien de supermajorité » doit exister entre deux points de contrôle successifs (c'est-à-dire que deux tiers du total de l'éther misé votent que le point de contrôle B est le descendant correct du point de contrôle A) pour faire passer le point de contrôle le moins récent à finalisé et le bloc le plus récent à justifié.

Étant donné que la finalité exige un accord des deux tiers sur le caractère canonique d'un bloc, un attaquant ne peut pas créer une autre chaîne finalisée sans ce qui suit :

1. Posséder ou manipuler les deux tiers de l'éther total mis en jeu.
2. Détruire au moins un tiers de l'éther total mis en jeu.

La première condition découle du fait que les deux tiers de l'éther mis en jeu sont nécessaires pour finaliser une chaîne. La deuxième condition se pose car si deux tiers de la participation totale ont voté en faveur des deux bifurcations, alors un tiers doit avoir voté sur les deux. Le double vote est une condition sournoise qui serait punie au maximum, et un tiers de l'enjeu total serait détruit. En mai 2022, un attaquant devait ainsi brûler environ 10 milliards de dollars d'éther. L'algorithme qui justifie et finalise les blocs dans Gasper est une forme légèrement modifiée de [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incitations et Pénalités {#incentives-and-slashing}

Les validateurs sont récompensés pour avoir proposé et validé honnêtement des blocs. L'éther est récompensé et ajouté à leur mise en jeu. Par contre, les validateurs qui sont absents et qui n'agissent pas lorsqu'ils sont appelés à manquer ces récompenses et perdent parfois une petite partie de leur participation existante. Cependant, les pénalités pour être hors ligne sont modestes et, dans la plupart des cas, s'élèvent au coût d'opportunité des récompenses manquantes. Cependant, certaines actions de validateur sont très difficiles à faire accidentellement et signifient une intention malveillante, comme proposer plusieurs blocs pour le même emplacement, attester plusieurs blocs pour le même emplacement, ou contredire les votes précédents de point de contrôle. Il s'agit de comportements « slashables » qui sont pénalisés de manière plus sévère : le slashing entraîne la destruction d'une partie de l'enjeu du validateur et le validateur est retiré du réseau des validateurs. Ce processus prend 36 jours. Le premier jour, la pénalité initiale peut atteindre 1 ETH. Puis l'éther coupé du validateur s'égoutte lentement sur la période de sortie, mais le jour 18, ils reçoivent une « pénalité de corrélation », qui est plus grande quand plus de validateurs sont coupés à la même heure. La pénalité maximale est l'enjeu entier. Ces récompenses et ces pénalités sont conçues pour encourager les validateurs honnêtes et décourager les attaques sur le réseau.

### Fuite d’inactivité {#inactivity-leak}

En plus de la sécurité, Gasper offre également une « preuve de vie plausible ». C'est la condition que tant que les deux tiers de l'éther total misé votent honnêtement et suivent le protocole, la chaîne sera en mesure de finaliser indépendamment de toute autre activité (comme les attaques, les problèmes de latence ou les slashings). Autrement dit, un tiers du total de l'éther misé doit être compromis d'une manière ou d'une autre pour empêcher la finalisation de la chaîne. En Gasper, il y a une ligne de défense supplémentaire contre une défaillance de la vie, connue sous le nom de « fuite d'inactivité ». Ce mécanisme s'active lorsque la chaîne n'a pas pu être finalisée pour plus de quatre périodes. Les validateurs qui ne témoignent pas activement de la chaîne majoritaire se voient égoutter progressivement leur participation jusqu'à ce que la majorité récupère les deux tiers de l'enjeu total, veiller à ce que les échecs de la vivacité ne soient que temporaires.

### Choix de fourche {#fork-choice}

La définition originale de Casper-FFG incluait un algorithme de choix de fourche qui imposait la règle : `follow the chain containing the justified checkpoint that pas the gréâtes height` où la hauteur est définie comme la plus grande distance par rapport au bloc de genèse. En Gasper, la règle de choix de fourche originale est dépréciée en faveur d'un algorithme plus sophistiqué appelé LMD-GHOST. Il est important de réaliser que dans des conditions normales, une règle de choix de fourche (fork) est inutile - il y a un seul proposeur de bloc pour chaque créneau, et les validateurs honnêtes l'attestent. Ce n'est que dans les cas d'asynchronie du réseau ou quand un auteur de bloc malhonnête a mis en doute la nécessité d'un algorithme de choix de fourche. Cependant, lorsque ces cas se produisent, l'algorithme de choix de fourche est une défense critique qui sécurise la chaîne correcte.

LMD-GHOST signifie « le dernier sous-arbre observé le plus gourmand, alimenté par des messages de messages ». C'est une façon lourde de jargon de définir un algorithme qui sélectionne la bifurcation avec le plus grand poids accumulé d'attestations comme le canonique (sous-arbre le plus gourmand) et que si plusieurs messages sont reçus d'un validateur, seule la dernière est prise en compte (dernière génération de messages). Avant d'ajouter le bloc le plus lourd à sa chaîne canonique, chaque validateur évalue chaque bloc à l'aide de cette règle.

## Complément d'information {#further-reading}

- [Gasper : Combiner GHOST et Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget (Casper-FFG)](https://arxiv.org/pdf/1710.09437.pdf)
