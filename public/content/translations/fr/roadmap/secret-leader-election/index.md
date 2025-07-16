---
title: Élection d'un chef secret
description: Explication sur la manière dont l'élection du leader secret peut aider à protéger les validateurs contre certaines attaques
lang: fr
summaryPoints:
  - L'adresse IP des proposeurs de blocs peut être connue à l'avance, les rendant vulnérables aux attaques.
  - L'élection d'un leader secret dissimule l'identité des validateurs de sorte qu'ils ne peuvent pas être connus à l'avance.
  - Une extension de cette idée est de rendre la sélection des validateurs aléatoire pour chaque créneau.
---

# Élection d'un chef secret {#single-secret-leader-election}

Dans le mécanisme de consensus actuel basé sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos), la liste des futurs proposeurs de blocs est publique et il est possible de cartographier leurs adresses IP. Cela signifie que les attaquants pourraient identifier les validateurs censés proposer un bloc et cibler ces derniers via une attaque par déni de service (DOS) les rendant incapables de proposer leur bloc dans le temps imparti.

Cela pourrait créer des opportunités de profit pour un attaquant. Ainsi, un proposeur de bloc sélectionné pour un créneau `n+1` pourrait attaquer par Déni de service (DOS) un autre proposant lors du même créneau `n`, l'empêchant de proposer un bloc. Ceci permettrait au proposeur de bloc attaquant d'extraire la MEV (Valeur Maximale Extractible) des deux créneaux, ou de rassembler toutes les transactions qui auraient dû être réparties sur deux blocs et de les inclure toutes dans un seul bloc, et ainsi percevoir l'ensemble des frais associés. Ceci affecterait probablement plutôt les validateurs particuliers que les validateurs institutionnels aguerris qui peuvent utiliser des méthodes plus sophistiquées pour se protéger des attaques DOS, et ainsi former une force centralisatrice.

Il y a plusieurs solutions à ce problème. L'une est la [Technologie des Validateurs Distribués](https://github.com/ethereum/distributed-validator-specs) qui vise à répartir plusieurs tâches nécessaires pour faire fonctionner un validateur sur plusieurs machines, avec de la redondance, de sorte qu'il soit bien plus difficile pour un attaquant d'empêcher un bloc d'être proposé sur un créneau particulier. Toutefois, la solution la plus robuste est **L'Élection d'un Leader Secret Unique (SSLE)**.

## Élection d'un leader en secret unique {#secret-leader-election}

Dans le SSLE, la cryptographie est utilisée de manière astucieuse pour assurer que seul le validateur sélectionné sache qu'il a été sélectionné. Pour que cela fonctionne, chaque validateur doit soumettre un engagement pour un secret qu'ils partagent tous. Les engagements sont mélangés et reconfigurés de sorte que personne ne puisse remonter aux validateurs à partir des engagements mais chaque validateur sait quel engagement lui appartient. Un engagement est alors choisi au hasard. Si un validateur détecte que leur engagement a été choisi, il sait que c'est à son tour de proposer un bloc.

L'implémentation dominante de cette idée s'appelle [Whisk](https://ethresear.ch/t/whisk-a-practical-shuffle-based-ssle-protocol-for-ethereum/11763). Elle fonctionne comme ceci :

1. Les validateurs s'engagent sur un secret partagé. Le schéma d'engagement est conçu de telle sorte qu'il peut être attaché à l'identité d'un validateur mais il peut aussi être soumis à un aléa afin qu'aucun tiers ne puisse retrouver par ingénierie inversée l'association et relier un engagement particulier à un validateur particulier.
2. Au début d'une période, un ensemble aléatoire de validateurs est choisi pour échantillonner les engagements de 16 384 validateurs en utilisant RANDAO.
3. Pour les 8 182 créneaux suivants (1 jour), les proposeurs de bloc mélangent aléatoirement un sous-ensemble d'engagements en utilisant leur propre entropie personnelle.
4. À la fin du mélange, RANDAO est utilisé pour créer une liste ordonnée des engagements. Cette liste est cartographiée sur les emplacements Ethereum.
5. Les validateurs voient que leur engagement est attaché à un créneau particulier, et lorsque le créneau arrive, ils proposent un bloc.
6. Ces étapes sont répétées de sorte que l'affectation des engagements aux créneaux est toujours en avance sur le créneau suivant.

Cela empêche les attaquants de connaître à l'avance quel validateur spécifique proposera le bloc suivant, écartant ainsi la possibilité d'attaques DOS.

## Élection secrète d'un leader non-unique (SnSLE) {#secret-non-single-leader-election}

Il existe également une proposition distincte visant à créer un scénario, dans lequel les validateurs possèdent chacun une chance aléatoire de proposer un bloc pour chaque créneau de manière similaire à la façon de proposer un bloc dans le cadre de la preuve de travail, plus connue sous l'appellation d'**élection secrète d'un leader non-unique (SnSLE)**. Une façon assez simple d'agir ainsi est d'utiliser la fonction RANDAO destinée à sélectionner des validateurs de manière aléatoire, au sein du protocole du jour. Le principe de RANDAO est qu'un nombre suffisamment aléatoire est généré en mixant les empreintes soumises par de multiples validateurs indépendants. Avec le protocole SnSLE, ces empreintes peuvent être exploitées pour choisir le proposeur du bloc suivant, par exemple en optant pour l'empreinte de valeur la plus faible. L'éventail des empreintes valides peut être limité, afin d'ajuster l'éventualité de la sélection de validateurs individuels dans chaque créneau. Ainsi, en affirmant que le hachage se doit d'être inférieur à` 2^256 * 5 / N`, où` N` = nombre de validateurs actifs, la probabilité qu'un validateur individuel soit sélectionné dans chaque créneau serait de` 5/N`. Dans cet exemple, il y aurait 99,3 % de chances qu'au moins un proposant génère un hachage valide dans chaque créneau.

## Progrès actuels {#current-progress}

Les protocoles SSLE et SnSLE sont tous deux en phase de recherche. À ce jour, il n'existe pas encore de spécification finalisée pour l'une ou l'autre de ces idées. SSLE et SnSLE sont des propositions concurrentes qui ne peuvent être toutes deux mises en œuvre. Avant d'être déployés, ces derniers doivent faire l'objet d'une recherche et d'un développement plus approfondis, d'un prototypage et d'une mise en œuvre sur des réseaux de test publics.

## Complément d'information {#further-reading}

- [SnSLE](https://ethresear.ch/t/secret-non-single-leader-election/11789)
