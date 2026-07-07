---
title: Élection secrète du leader
description: Explication de la façon dont l'élection secrète du leader peut aider à protéger les validateurs contre les attaques
lang: fr
summaryPoints:
  - L'adresse IP des proposeurs de blocs peut être connue à l'avance, ce qui les rend vulnérables aux attaques
  - L'élection secrète du leader masque l'identité des validateurs afin qu'ils ne soient pas connus à l'avance
  - Une extension de cette idée consiste à rendre la sélection des validateurs aléatoire dans chaque créneau.
---

Dans le mécanisme de consensus actuel basé sur la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos), la liste des prochains proposeurs de blocs est publique et il est possible de cartographier leurs adresses IP. Cela signifie que des attaquants pourraient identifier quels validateurs doivent proposer un bloc et les cibler avec une attaque par déni de service (DOS) qui les empêcherait de proposer leur bloc à temps.

Cela pourrait créer des opportunités de profit pour un attaquant. Par exemple, un proposeur de bloc sélectionné pour le créneau `n+1` pourrait lancer une attaque DOS contre le proposant du créneau `n` afin qu'il manque son opportunité de proposer un bloc. Cela permettrait au proposeur de bloc attaquant d'extraire la MEV des deux créneaux, ou de s'emparer de toutes les transactions qui auraient dû être réparties sur deux blocs pour les inclure toutes dans un seul, empochant ainsi tous les frais associés. Cela risque d'affecter les validateurs à domicile plus que les validateurs institutionnels sophistiqués qui peuvent utiliser des méthodes plus avancées pour se protéger des attaques DOS, et pourrait donc constituer une force de centralisation.

Il existe plusieurs solutions à ce problème. L'une d'elles est la [technologie de validateur distribué (DVT)](https://github.com/ethereum/distributed-validator-specs), qui vise à répartir les différentes tâches liées à l'exécution d'un validateur sur plusieurs machines, avec redondance, de sorte qu'il soit beaucoup plus difficile pour un attaquant d'empêcher la proposition d'un bloc dans un créneau particulier. Cependant, la solution la plus robuste est l'**élection secrète d'un leader unique (SSLE)**.

## Élection secrète d'un leader unique {#secret-leader-election}

Dans le SSLE, une cryptographie astucieuse est utilisée pour s'assurer que seul le validateur sélectionné sait qu'il a été sélectionné. Cela fonctionne en demandant à chaque validateur de soumettre un engagement envers un secret qu'ils partagent tous. Les engagements sont mélangés et reconfigurés de sorte que personne ne puisse associer les engagements aux validateurs, mais chaque validateur sait quel engagement lui appartient. Ensuite, un engagement est choisi au hasard. Si un validateur détecte que son engagement a été choisi, il sait que c'est à son tour de proposer un bloc.

L'implémentation principale de cette idée s'appelle [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Elle fonctionne de la manière suivante :

1. Les validateurs s'engagent sur un secret partagé. Le schéma d'engagement est conçu de telle sorte qu'il peut être lié à l'identité d'un validateur, mais aussi rendu aléatoire afin qu'aucun tiers ne puisse faire d'ingénierie inverse sur ce lien et associer un engagement spécifique à un validateur spécifique.
2. Au début d'une époque, un ensemble aléatoire de validateurs est choisi pour échantillonner les engagements de 16 384 validateurs, en utilisant RANDAO.
3. Pour les 8182 créneaux suivants (1 jour), les proposeurs de blocs mélangent et rendent aléatoire un sous-ensemble des engagements en utilisant leur propre entropie privée.
4. Une fois le mélange terminé, RANDAO est utilisé pour créer une liste ordonnée des engagements. Cette liste est associée aux créneaux Ethereum.
5. Les validateurs voient que leur engagement est rattaché à un créneau spécifique, et lorsque ce créneau arrive, ils proposent un bloc.
6. Répétez ces étapes afin que l'attribution des engagements aux créneaux soit toujours très en avance sur le créneau actuel.

Cela empêche les attaquants de savoir à l'avance quel validateur spécifique proposera le prochain bloc, évitant ainsi la possibilité d'attaques DOS.

## Élection secrète de leader non unique (SnSLE) {#secret-non-single-leader-election}

Il existe également une proposition distincte qui vise à créer un scénario dans lequel les validateurs ont chacun une chance aléatoire de proposer un bloc dans chaque créneau, de la même manière que la proposition de bloc était décidée sous la preuve de travail (PoW), connue sous le nom d'**élection secrète de leader non unique (SnSLE)**. Une façon simple de le faire est d'utiliser la fonction RANDAO utilisée pour sélectionner aléatoirement les validateurs dans le protocole actuel. L'idée avec RANDAO est qu'un nombre suffisamment aléatoire est généré en mélangeant les hashs soumis par de nombreux validateurs indépendants. Dans le SnSLE, ces hashs pourraient être utilisés pour choisir le prochain proposeur de bloc, par exemple en choisissant le hash de valeur la plus basse. La plage de hashs valides pourrait être restreinte pour ajuster la probabilité que des validateurs individuels soient sélectionnés dans chaque créneau. En affirmant que le hash doit être inférieur à `2^256 * 5 / N` où `N` = nombre de validateurs actifs, la chance qu'un validateur individuel soit sélectionné dans chaque créneau serait de `5/N`. Dans cet exemple, il y aurait 99,3 % de chances qu'au moins un proposant génère un hash valide dans chaque créneau.

## Progrès actuels {#current-progress}

Le SSLE et le SnSLE sont tous deux en phase de recherche. Il n'y a pas encore de spécification finalisée pour l'une ou l'autre de ces idées. Le SSLE et le SnSLE sont des propositions concurrentes qui ne pourraient pas être implémentées toutes les deux. Avant leur déploiement, elles nécessitent davantage de recherche et développement, de prototypage et d'implémentation sur des réseaux de test publics.

## Complément d'information {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)