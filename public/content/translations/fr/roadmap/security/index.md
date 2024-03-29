---
title: Un Ethereum plus sûr
description: Ethereum est la plateforme de contrats intelligents la plus sûre et la plus décentralisée qui existe. Cependant, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tout niveau d'attaque à l'avenir.
lang: fr
image: /roadmap/roadmap-security.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

Ethereum est déjà une plateforme de contrats intelligents décentralisée et très sûre. Néanmoins, des améliorations peuvent encore être apportées pour qu'Ethereum reste résistant à tous les types d'attaques à l'avenir. Il s'agit notamment de modifications subtiles de la manière dont les clients Ethereum traitent les blocs concurrents, ainsi que de l'augmentation de la vitesse à laquelle le réseau considère que les blocs sont [« finalisés »](/developers/docs/consensus-mechanisms/pos/#finality) (ce qui signifie qu'ils ne peuvent pas être modifiés sans entraîner des pertes économiques considérables pour un attaquant).

Il existe également des améliorations qui rendent la censure des transactions beaucoup plus difficile en rendant les auteurs de propositions de blocs aveugles au contenu réel de leurs blocs, ainsi que de nouveaux moyens d'identifier lorsqu'un client censure. L'ensemble de ces améliorations permettra d'améliorer le protocole de preuve d'enjeu afin que les utilisateurs - qu'il s'agisse de particuliers ou d'entreprises - aient une confiance instantanée dans leurs applications, leurs données et leurs actifs sur Ethereum.

## Retraits de la mise en jeu {#staking-withdrawals}

La transition de la preuve de travail à la preuve d'enjeu a commencé avec les pionniers d'Ethereum qui ont « mis en jeu » leur ETH dans un contrat de dépôt. Cet ETH est utilisé pour protéger le réseau. Cependant, cet ETH ne peut pas encore être débloqué et rendu aux utilisateurs. Permettre le retrait d'ETH est un élément essentiel de la mise à niveau de la preuve d'enjeu. En plus d'être un élément essentiel d'un protocole de preuve d'enjeu pleinement fonctionnel, l'autorisation des retraits est également bénéfique pour la sécurité d'Ethereum, car elle permet aux stakers d'utiliser leurs récompenses ETH à d'autres fins que l'enjeu. Cela signifie que les utilisateurs qui veulent de la liquidité n'ont pas besoin de s'appuyer sur les « liquid staking derivatives » (LSD) qui peuvent être une force centralisatrice sur Ethereum. Cette mise à niveau est prévue pour être achevée le 12 avril 2023.

<ButtonLink variant="outline-color" to="/staking/withdrawals/">À propos des retraits</ButtonLink>

## Se défendre contre les attaques {#defending-against-attacks}

Même après l'activation des retraits, des améliorations peuvent être apportées au protocole de [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/) d'Ethereum. L'une est connue sous le nom de [agrégation de points de vue](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - un algorithme de choix de bifurcation plus sécurisé qui rend certains types d'attaques sophistiquées plus difficiles.

Réduire le temps que prend Ethereum pour finaliser les blocs offrirait une meilleure expérience utilisateur et empêcherait les attaques sophistiquées de « reorg » où les attaquants essaient de réorganiser les blocs très récents pour en tirer profit ou censurer certaines transactions. [**Finalité à créneau unique - Single slot finality (SSF)**](/roadmap/single-slot-finality/) est un moyen de minimiser le délai de finalisation. Actuellement, il y a l'équivalent de 15 minutes de blocs qu'un attaquant pourrait théoriquement convaincre d'autres validateurs de reconfigurer. Avec SSF, il y en aurait 0. Les utilisateurs, des individus aux applications jusqu'aux échanges, bénéficient d'une assurance rapide que leurs transactions ne seront pas annulées, et le réseau bénéficie lui de l'élimination d'une catégorie entière d'attaques.

<ButtonLink variant="outline-color" to="/roadmap/single-slot-finality/">En apprendre plus à propos de la finalité à créneau unique</ButtonLink>

## Se défendre contre la censure {#defending-against-censorship}

La décentralisation empêche les individus ou les petits groupes de validateurs de devenir trop influents. Les nouvelles technologies de mise en jeu peuvent aider à garantir que les validateurs d'Ethereum restent aussi décentralisés que possible tout en les protégeant contre les pannes matérielles, logicielles et de réseau. Cela inclut un logiciel qui partage les responsabilités du validateur sur plusieurs nœuds. C'est ce qu'on appelle la **technologie de validation distribuée (DVT)**. Les pools de mise en jeu sont incités à utiliser le DVT car il permet à plusieurs ordinateurs de participer collectivement à la validation, ajoutant ainsi une redondance et une tolérance aux pannes. Cela divise également les clés du validateur entre plusieurs systèmes, plutôt que d'avoir des opérateurs individuels exécutant plusieurs validateurs. Cela rend plus difficile pour les opérateurs malhonnêtes de coordonner des attaques sur Ethereum. Globalement, l'idée est de gagner en matière de sécurité en faisant fonctionner les validateurs en tant que _communautés_ plutôt qu'en tant qu'individus.

<ButtonLink variant="outline-color" to="/staking/dvt/">En apprendre plus à propos de la technologie de validation distribuée</ButtonLink>

La mise en œuvre de la **séparation proposeur-constructeur (PBS)** améliorera considérablement les défenses intégrées d'Ethereum contre la censure. PBS permet à un validateur de créer un bloc et à un autre de le diffuser à travers le réseau Ethereum. Cela garantit que les gains provenant des algorithmes de construction de blocs axés sur la maximisation des profits sont partagés plus équitablement à travers le réseau, **empêchant la concentration ** chez les stakers institutionnels les plus performants au fil du temps. Le proposeur de bloc a la possibilité de sélectionner le bloc le plus rentable qui lui est proposé par un marché de constructeurs de blocs. Pour censurer, un proposeur de bloc devrait souvent choisir un bloc moins rentable, ce qui serait **économiquement irrationnel et également évident pour le reste des validateurs** sur le réseau.

Il existe des ajouts potentiels à PBS, tels que les transactions chiffrées et les listes d'inclusion, qui pourraient améliorer davantage la résistance à la censure d'Ethereum. Ces éléments rendent le constructeur de blocs et le proposeur ignorants des transactions réelles incluses dans leurs blocs.

<ButtonLink variant="outline-color" to="/roadmap/pbs/">En apprendre plus à propos de la séparation entre le constructeur et le proposeur</ButtonLink>

## Protéger les validateurs {#protecting-validators}

Il est possible qu'un attaquant sophistiqué puisse identifier les validateurs imminents et les spammer pour les empêcher de proposer des blocs ; cela s'appelle une **attaque par déni de service (DoS)**. Implémenter [**l'élection secrète du leader (SLE)**](/roadmap/secret-leader-election) protégera contre ce type d'attaque en empêchant les proposants de bloc d'être connus à l'avance. Cela fonctionne en mélangeant continuellement un ensemble d'engagements cryptographiques représentant les candidats proposeurs de blocs et en utilisant leur ordre pour déterminer quel validateur est sélectionné de telle manière que seuls les validateurs eux-mêmes connaissent leur ordre à l'avance.

<ButtonLink variant="outline-color" to="/roadmap/secret-leader-election">En apprendre plus à propos de l'élection d'un leader secret</ButtonLink>

## Progrès actuels {#current-progress}

Les mises à jour de sécurité figurant sur la feuille de route sont à des stades de recherche avancés, mais leur mise en œuvre n'est pas prévue avant un certain temps. Les prochaines étapes pour view-merge, PBS, SSF et SLE consistent à finaliser une spécification et à commencer à construire des prototypes.
