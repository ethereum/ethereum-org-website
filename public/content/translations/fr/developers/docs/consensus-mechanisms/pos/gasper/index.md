---
title: Gasper
description: Une explication du mécanisme de preuve d'enjeu Gasper.
lang: fr
---

Gasper est une combinaison de Casper the Friendly Finality Gadget (Casper FFG) et de l'algorithme de choix de fourche LMD-GHOST. Ensemble, ces composants forment le mécanisme de consensus sécurisant Ethereum en preuve d'enjeu (PoS). Casper est le mécanisme qui promeut certains blocs au statut « finalisé » afin que les nouveaux entrants sur le réseau puissent être sûrs qu'ils synchronisent la chaîne canonique. L'algorithme de choix de fourche utilise les votes accumulés pour s'assurer que les nœuds peuvent facilement sélectionner la bonne lorsque des forks surviennent dans la chaîne de blocs.

**Remarque** : la définition originale de Casper FFG a été légèrement mise à jour pour être incluse dans Gasper. Sur cette page, nous considérons la version mise à jour.

## Prérequis {#prerequisites}

Pour comprendre ce contenu, il est nécessaire de lire la page d'introduction sur la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Le rôle de Gasper {#role-of-gasper}

Gasper repose sur une chaîne de blocs à preuve d'enjeu où les nœuds fournissent de l'ether comme dépôt de garantie qui peut être détruit s'ils sont paresseux ou malhonnêtes lors de la proposition ou de la validation de blocs. Gasper est le mécanisme définissant comment les validateurs sont récompensés et punis, décident quels blocs accepter et rejeter, et sur quel fork de la chaîne de blocs construire.

## Qu'est-ce que la finalité ? {#what-is-finality}

La finalité est une propriété de certains blocs qui signifie qu'ils ne peuvent pas être annulés à moins qu'il n'y ait eu une défaillance critique du consensus et qu'un attaquant ait détruit au moins 1/3 de l'ether total mis en jeu. Les blocs finalisés peuvent être considérés comme des informations dont la chaîne de blocs est certaine. Un bloc doit passer par une procédure de promotion en deux étapes pour être finalisé :

1. Les deux tiers de l'ether total mis en jeu doivent avoir voté en faveur de l'inclusion de ce bloc dans la chaîne canonique. Cette condition promeut le bloc au statut « justifié ». Il est peu probable que les blocs justifiés soient annulés, mais ils peuvent l'être sous certaines conditions.
2. Lorsqu'un autre bloc est justifié au-dessus d'un bloc justifié, il est promu au statut « finalisé ». Finaliser un bloc est un engagement à inclure le bloc dans la chaîne canonique. Il ne peut pas être annulé à moins qu'un attaquant ne détruise des millions d'ether (des milliards de dollars américains).

Ces promotions de blocs ne se produisent pas à chaque créneau. Au lieu de cela, seuls les blocs de limite d'époque peuvent être justifiés et finalisés. Ces blocs sont connus sous le nom de « points de contrôle ». La promotion prend en compte des paires de points de contrôle. Un « lien de supermajorité » doit exister entre deux points de contrôle successifs (c'est-à-dire que les deux tiers de l'ether total mis en jeu votent que le point de contrôle B est le descendant correct du point de contrôle A) pour promouvoir le point de contrôle le moins récent au statut finalisé et le bloc le plus récent au statut justifié.

Étant donné que la finalité nécessite un accord des deux tiers sur le fait qu'un bloc est canonique, un attaquant ne peut en aucun cas créer une chaîne finalisée alternative sans :

1. Posséder ou manipuler les deux tiers de l'ether total mis en jeu.
2. Détruire au moins un tiers de l'ether total mis en jeu.

La première condition survient parce que les deux tiers de l'ether mis en jeu sont nécessaires pour finaliser une chaîne. La deuxième condition survient parce que si les deux tiers de la mise totale ont voté en faveur des deux forks, alors un tiers doit avoir voté sur les deux. Le double vote est une condition de réduction qui serait punie au maximum, et un tiers de la mise totale serait détruit. En mai 2022, cela nécessite qu'un attaquant brûle environ 10 milliards de dollars d'ether. L'algorithme qui justifie et finalise les blocs dans Gasper est une forme légèrement modifiée de [Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437.pdf).

### Incitations et réduction {#incentives-and-slashing}

Les validateurs sont récompensés pour avoir proposé et validé honnêtement des blocs. De l'ether est récompensé et ajouté à leur mise. D'un autre côté, les validateurs qui sont absents et n'agissent pas lorsqu'ils sont sollicités manquent ces récompenses et perdent parfois une petite partie de leur mise existante. Cependant, les pénalités pour être hors ligne sont faibles et, dans la plupart des cas, se résument à des coûts d'opportunité liés aux récompenses manquées. Toutefois, certaines actions des validateurs sont très difficiles à réaliser accidentellement et signifient une intention malveillante, comme proposer plusieurs blocs pour le même créneau, attester de plusieurs blocs pour le même créneau, ou contredire les votes de points de contrôle précédents. Ce sont des comportements passibles de « réduction » qui sont pénalisés plus sévèrement — la réduction entraîne la destruction d'une partie de la mise du validateur et le retrait du validateur du réseau de validateurs. Ce processus prend 36 jours. Le premier jour, il y a une pénalité initiale pouvant aller jusqu'à 1 ETH. Ensuite, l'ether du validateur sanctionné s'épuise lentement tout au long de la période de sortie, mais le 18e jour, il reçoit une « pénalité de corrélation », qui est plus importante lorsque davantage de validateurs subissent une réduction à peu près au même moment. La pénalité maximale est la totalité de la mise. Ces récompenses et pénalités sont conçues pour inciter les validateurs honnêtes et dissuader les attaques sur le réseau.

### Fuite d'inactivité {#inactivity-leak}

En plus de la sécurité, Gasper fournit également une « vivacité plausible ». C'est la condition selon laquelle tant que les deux tiers de l'ether total mis en jeu votent honnêtement et suivent le protocole, la chaîne sera en mesure de se finaliser indépendamment de toute autre activité (telle que des attaques, des problèmes de latence ou des réductions). Autrement dit, un tiers de l'ether total mis en jeu doit être compromis d'une manière ou d'une autre pour empêcher la chaîne de se finaliser. Dans Gasper, il existe une ligne de défense supplémentaire contre une défaillance de vivacité, connue sous le nom de « fuite d'inactivité ». Ce mécanisme s'active lorsque la chaîne n'a pas réussi à se finaliser pendant plus de quatre époques. Les validateurs qui n'attestent pas activement de la chaîne majoritaire voient leur mise progressivement épuisée jusqu'à ce que la majorité retrouve les deux tiers de la mise totale, garantissant que les défaillances de vivacité ne sont que temporaires.

### Choix de fourche {#fork-choice}

La définition originale de Casper FFG incluait un algorithme de choix de fourche qui imposait la règle : `follow the chain containing the justified checkpoint that has the greatest height` où la hauteur est définie comme la plus grande distance par rapport au bloc genèse. Dans Gasper, la règle de choix de fourche originale est obsolète au profit d'un algorithme plus sophistiqué appelé LMD-GHOST. Il est important de réaliser que dans des conditions normales, une règle de choix de fourche est inutile - il y a un seul proposeur de bloc pour chaque créneau, et les validateurs honnêtes l'attestent. Ce n'est qu'en cas de forte asynchronicité du réseau ou lorsqu'un proposeur de bloc malhonnête a équivoqué qu'un algorithme de choix de fourche est requis. Cependant, lorsque ces cas se présentent, l'algorithme de choix de fourche est une défense critique qui sécurise la bonne chaîne.

LMD-GHOST signifie « latest message-driven greedy heaviest observed sub-tree » (sous-arbre observé le plus lourd et glouton piloté par le dernier message). C'est une façon très technique de définir un algorithme qui sélectionne le fork avec le plus grand poids accumulé d'attestations comme étant le canonique (sous-arbre le plus lourd glouton) et qui, si plusieurs messages sont reçus d'un validateur, ne prend en compte que le dernier (piloté par le dernier message). Avant d'ajouter le bloc le plus lourd à sa chaîne canonique, chaque validateur évalue chaque bloc en utilisant cette règle.

## Complément de lecture {#further-reading}

- [Gasper : Combiner GHOST et Casper](https://arxiv.org/pdf/2003.03052.pdf)
- [Casper the Friendly Finality Gadget](https://arxiv.org/pdf/1710.09437.pdf)