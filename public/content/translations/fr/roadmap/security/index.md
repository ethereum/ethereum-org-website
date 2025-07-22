---
title: Un Ethereum plus sûr
description: Ethereum est la plateforme de contrats intelligents la plus sûre et la plus décentralisée qui existe. Cependant, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tout niveau d'attaque à l'avenir.
lang: fr
image: /images/roadmap/roadmap-ux.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**Ethereum est déjà une plateforme très sûre**, décentralisée, de [contrats intelligents](/glossary/#smart-contract). Néanmoins, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tous les types d'attaques à l'avenir. Il s'agit notamment de modifications subtiles de la manière dont les [clients Ethereum](/glossary/#consensus-client) traitent les [blocs](/glossary/#block) concurrents, ainsi que de l'augmentation de la vitesse à laquelle le réseau considère que les blocs sont [« finalisés »](/developers/docs/consensus-mechanisms/pos/#finality) (ce qui signifie qu'ils ne peuvent pas être modifiés sans entraîner des pertes économiques considérables pour un attaquant).

Il existe également des améliorations qui rendent la censure des transactions beaucoup plus difficile en rendant les auteurs de propositions de blocs aveugles au contenu réel de leurs blocs, ainsi que de nouveaux moyens d'identifier lorsqu'un client censure. L'ensemble de ces améliorations permettra d'améliorer le protocole de [preuve d'enjeu](/glossary/#pos) afin que les utilisateurs - qu'il s'agisse de particuliers ou d'entreprises - aient une confiance instantanée dans leurs applications, leurs données et leurs actifs sur Ethereum.

## Retraits de la mise en jeu {#staking-withdrawals}

La transition de la [preuve de travail](/glossary/#pow) à la preuve d'enjeu a commencé avec les pionniers d'Ethereum qui ont « mis en jeu » leur ETH dans un contrat de dépôt. Cet ETH est utilisé pour protéger le réseau. Il y a eu une seconde mise à jour le 12 avril 2023 dans le but d'autoriser le retrait de l'ETH mis en jeu. Depuis lors, les validateurs peuvent librement mettre en jeu ou retirer leurs ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">À propos des retraits</ButtonLink>

## Se défendre contre les attaques {#defending-against-attacks}

Il existe un certain nombre d'améliorations qui peuvent être apportées au protocole de preuve d'enjeu d'Ethereum. L'une est connue sous le nom de [agrégation de points de vue](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - un algorithme de choix de [bifurcation](/glossary/#fork) plus sécurisé qui rend certains types d'attaques sophistiquées plus difficiles.

Réduire le temps que prend Ethereum pour [finaliser](/glossary/#finality) les blocs offrirait une meilleure expérience utilisateur et empêcherait les attaques sophistiquées de « reorg » où les attaquants essaient de réorganiser les blocs très récents pour en tirer profit ou censurer certaines transactions. [**La finalité à créneau unique (SSF)**](/roadmap/single-slot-finality/) est un **moyen de minimiser le délai de finalisation**. Actuellement, il y a l'équivalent de 15 minutes de blocs qu'un attaquant pourrait théoriquement convaincre d'autres validateurs de reconfigurer. Avec SSF, il y en aurait 0. Les utilisateurs, des individus aux applications jusqu'aux échanges, bénéficient d'une assurance rapide que leurs transactions ne seront pas annulées, et le réseau bénéficie lui de l'élimination d'une catégorie entière d'attaques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">En apprendre plus à propos de la finalité à créneau unique</ButtonLink>

## Se défendre contre la censure {#defending-against-censorship}

La décentralisation empêche des individus ou de petits groupes de [validateurs](/glossary/#validator) de devenir trop influents. Les nouvelles technologies de mise en jeu peuvent aider à garantir que les validateurs d'Ethereum restent aussi décentralisés que possible tout en les protégeant contre les pannes matérielles, logicielles et de réseau. Cela inclut un logiciel qui partage les responsabilités du validateur entre plusieurs [nœuds](/glossary/#node). C'est ce qu'on appelle la **technologie de validation distribuée (DVT)**. [Les pools de mise en jeu](/glossary/#staking-pool) sont incités à utiliser le DVT car il permet à plusieurs ordinateurs de participer collectivement à la validation, ajoutant ainsi une redondance et une tolérance aux pannes. Cela divise également les clés du validateur entre plusieurs systèmes, plutôt que d'avoir des opérateurs individuels exécutant plusieurs validateurs. Cela rend plus difficile pour les opérateurs malhonnêtes de coordonner des attaques sur Ethereum. Globalement, l'idée est de gagner en matière de sécurité en faisant fonctionner les validateurs en tant que _communautés_ plutôt qu'en tant qu'individus.

<ButtonLink variant="outline-color" href="/staking/dvt/">En apprendre plus à propos de la technologie de validation distribuée</ButtonLink>

La mise en œuvre de la **séparation proposeur-constructeur (PBS)** améliorera considérablement les défenses intégrées d'Ethereum contre la censure. PBS permet à un validateur de créer un bloc et à un autre de le diffuser à travers le réseau Ethereum. Cela garantit que les gains provenant des algorithmes de construction de blocs axés sur la maximisation des profits sont partagés plus équitablement à travers le réseau, **empêchant la concentration ** chez les stakers institutionnels les plus performants au fil du temps. Le proposeur de bloc a la possibilité de sélectionner le bloc le plus rentable qui lui est proposé par un marché de constructeurs de blocs. Pour censurer, un proposeur de bloc devrait souvent choisir un bloc moins rentable, ce qui serait **économiquement irrationnel et également évident pour le reste des validateurs** sur le réseau.

Il existe des ajouts potentiels à PBS, tels que les transactions chiffrées et les listes d'inclusion, qui pourraient améliorer davantage la résistance à la censure d'Ethereum. Ces éléments rendent le constructeur de blocs et le proposeur ignorants des transactions réelles incluses dans leurs blocs.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">En apprendre plus à propos de la séparation entre le constructeur et le proposeur</ButtonLink>

## Protéger les validateurs {#protecting-validators}

Il est possible qu'un attaquant sophistiqué puisse identifier les validateurs imminents et les spammer pour les empêcher de proposer des blocs ; cela s'appelle une **attaque par déni de service (DoS)**. Implémenter [**l'élection secrète du leader (SLE)**](/roadmap/secret-leader-election) protégera contre ce type d'attaque en empêchant les proposants de bloc d'être connus à l'avance. Cela fonctionne en mélangeant continuellement un ensemble d'engagements cryptographiques représentant les candidats proposeurs de blocs et en utilisant leur ordre pour déterminer quel validateur est sélectionné de telle manière que seuls les validateurs eux-mêmes connaissent leur ordre à l'avance.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">En apprendre plus à propos de l'élection d'un leader secret</ButtonLink>

## Progrès actuels {#current-progress}

**Les mises à niveau de sécurité figurant sur la feuille de route sont à des stades de recherche avancés**, mais leur mise en œuvre n'est pas prévue avant un certain temps. Les prochaines étapes pour view-merge, PBS, SSF et SLE consistent à finaliser une spécification et à commencer à construire des prototypes.
