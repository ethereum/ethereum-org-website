---
title: "Un Ethereum plus sûr"
description: "Ethereum est la plateforme de contrats intelligents la plus sûre et la plus décentralisée qui existe. Cependant, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tout niveau d'attaque à l'avenir."
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**Ethereum est déjà une plateforme de [contrats intelligents](/glossary/#smart-contract) décentralisée et très sécurisée**. Néanmoins, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tous les types d'attaques à l'avenir. Il s'agit notamment de modifications subtiles de la manière dont les [clients Ethereum](/glossary/#consensus-client) traitent les [blocs](/glossary/#block) concurrents, ainsi que de l'augmentation de la vitesse à laquelle le réseau considère que les blocs sont [« finalisés »](/developers/docs/consensus-mechanisms/pos/#finality) (ce qui signifie qu'ils ne peuvent pas être modifiés sans entraîner des pertes économiques considérables pour un attaquant).

Il existe également des améliorations qui rendent la censure des transactions beaucoup plus difficile en rendant les auteurs de propositions de blocs aveugles au contenu réel de leurs blocs, ainsi que de nouveaux moyens d'identifier lorsqu'un client censure. Ensemble, ces améliorations mettront à niveau le protocole de [preuve d'enjeu](/glossary/#pos) afin que les utilisateurs, des particuliers aux entreprises, aient une confiance instantanée dans leurs applications, leurs données et leurs actifs sur Ethereum.

## Retraits de staking {#staking-withdrawals}

La mise à niveau de la [preuve de travail](/glossary/#pow) vers la preuve d'enjeu a commencé avec les pionniers d'Ethereum qui ont « staké » leur ETH dans un contrat de dépôt. Cet ETH est utilisé pour protéger le réseau. Une deuxième mise à jour a eu lieu le 12 avril 2023 pour permettre aux validateurs de retirer l'ETH staké. Depuis lors, les validateurs peuvent librement mettre en jeu ou retirer leurs ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">En savoir plus sur les retraits</ButtonLink>

## Défense contre les attaques {#defending-against-attacks}

Il existe un certain nombre d'améliorations qui peuvent être apportées au protocole de preuve d'enjeu d'Ethereum. L'un est connu sous le nom de [view-merge](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - un algorithme de choix de [fourche](/glossary/#fork) plus sécurisé qui rend plus difficiles certains types d'attaques sophistiquées.

Réduire le temps qu'il faut à Ethereum pour [finaliser](/glossary/#finality) les blocs permettrait d'offrir une meilleure expérience utilisateur et d'empêcher les attaques sophistiquées de « réorganisation » où les attaquants tentent de remanier des blocs très récents pour en extraire des bénéfices ou pour censurer certaines transactions. [**La finalité à slot unique (SSF)**](/roadmap/single-slot-finality/) est un **moyen de minimiser le délai de finalisation**. Actuellement, il y a l'équivalent de 15 minutes de blocs qu'un attaquant pourrait théoriquement convaincre d'autres validateurs de reconfigurer. Avec SSF, il y en aurait 0. Les utilisateurs, des individus aux applications jusqu'aux échanges, bénéficient d'une assurance rapide que leurs transactions ne seront pas annulées, et le réseau bénéficie lui de l'élimination d'une catégorie entière d'attaques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">En savoir plus sur la finalité à slot unique</ButtonLink>

## Défense contre la censure {#defending-against-censorship}

La décentralisation empêche des individus ou des petits groupes de [validateurs](/glossary/#validator) de devenir trop influents. Les nouvelles technologies de mise en jeu peuvent aider à garantir que les validateurs d'Ethereum restent aussi décentralisés que possible tout en les protégeant contre les pannes matérielles, logicielles et de
réseau. Cela inclut des logiciels qui partagent les responsabilités des validateurs sur plusieurs [nœuds](/glossary/#node). Ceci est connu sous le nom de **technologie de validateur distribué (DVT)**. Les [pools de staking](/glossary/#staking-pool) sont incités à utiliser la DVT car elle permet à plusieurs ordinateurs de participer collectivement à la validation, ce qui ajoute de la redondance et de la tolérance aux pannes. Cela divise également les clés du validateur entre plusieurs systèmes, plutôt que d'avoir des opérateurs individuels exécutant plusieurs validateurs. Cela rend plus difficile pour les opérateurs malhonnêtes de coordonner des attaques sur Ethereum. Dans l'ensemble, l'idée est de tirer des avantages en matière de sécurité en faisant fonctionner les validateurs en tant que _communautés_ plutôt qu'en tant qu'individus.

<ButtonLink variant="outline-color" href="/staking/dvt/">En savoir plus sur la technologie de validateur distribué</ButtonLink>

La mise en œuvre de la **séparation proposant-constructeur (PBS)** améliorera considérablement les défenses intégrées d'Ethereum contre la censure. PBS permet à un validateur de créer un bloc et à un autre de le diffuser à travers le réseau Ethereum. Cela garantit que les gains des algorithmes de construction de blocs professionnels optimisant les profits sont partagés plus équitablement sur le réseau, **empêchant la concentration de la participation** au fil du temps entre les stakers institutionnels les plus performants. Le proposeur de bloc a la possibilité de sélectionner le bloc le plus rentable qui lui est proposé par un marché de constructeurs de blocs. Pour censurer, un proposant de bloc devrait souvent choisir un bloc moins rentable, ce qui serait **économiquement irrationnel et également évident pour le reste des validateurs** sur le réseau.

Il existe des ajouts potentiels à PBS, tels que les transactions chiffrées et les listes d'inclusion, qui pourraient améliorer davantage la résistance à la censure d'Ethereum. Ces éléments rendent le constructeur de blocs et le proposeur ignorants des transactions réelles incluses dans leurs blocs.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">En savoir plus sur la séparation proposant-constructeur</ButtonLink>

## Protection des validateurs {#protecting-validators}

Il est possible qu'un attaquant sophistiqué puisse identifier les validateurs à venir et les spammer pour les empêcher de proposer des blocs ; c'est ce que l'on appelle une attaque par **déni de service (DoS)**. La mise en œuvre de l'[**élection secrète du leader (SLE)**](/roadmap/secret-leader-election) protégera contre ce type d'attaque en empêchant les proposants de blocs d'être connus à l'avance. Cela fonctionne en mélangeant continuellement un ensemble d'engagements cryptographiques représentant les candidats proposeurs de blocs et en utilisant leur ordre pour déterminer quel validateur est sélectionné de telle manière que seuls les validateurs eux-mêmes connaissent leur ordre à l'avance.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">En savoir plus sur l'élection secrète du leader</ButtonLink>

## Progrès actuels {#current-progress}

**Les mises à niveau de sécurité sur la feuille de route sont à des stades de recherche avancés**, mais leur mise en œuvre n'est pas attendue avant un certain temps. Les prochaines étapes pour view-merge, PBS, SSF et SLE sont de finaliser une spécification et de commencer à construire des prototypes.
