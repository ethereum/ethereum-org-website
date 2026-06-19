---
title: Un Ethereum plus sécurisé
description: Ethereum est la plateforme de contrats intelligents la plus sécurisée et décentralisée qui soit. Cependant, des améliorations peuvent encore être apportées pour qu'Ethereum reste résilient face à tout niveau d'attaque à l'avenir.
lang: fr
image: /images/roadmap/roadmap-security.png
alt: "Feuille de route d'Ethereum"
template: roadmap
---

**Ethereum est déjà une plateforme de [contrats intelligents](/glossary/#smart-contract) très sécurisée** et décentralisée. Cependant, des améliorations peuvent encore être apportées pour qu'Ethereum reste résilient face à toutes sortes d'attaques à l'avenir. Celles-ci incluent des changements subtils dans la façon dont les [clients Ethereum](/glossary/#consensus-client) gèrent les [blocs](/glossary/#block) concurrents, ainsi que l'augmentation de la vitesse à laquelle le réseau considère les blocs comme [« finalisés »](/developers/docs/consensus-mechanisms/pos/#finality) (ce qui signifie qu'ils ne peuvent pas être modifiés sans des pertes économiques extrêmes pour un attaquant).

Il existe également des améliorations qui rendent la censure des transactions beaucoup plus difficile en rendant les proposeurs de blocs aveugles au contenu réel de leurs blocs, ainsi que de nouvelles façons d'identifier lorsqu'un client censure. Ensemble, ces améliorations mettront à niveau le protocole de [preuve d'enjeu (PoS)](/glossary/#pos) afin que les utilisateurs - des particuliers aux entreprises - aient une confiance instantanée dans leurs applications, données et actifs sur Ethereum.

## Retraits de staking {#staking-withdrawals}

La mise à niveau de la [preuve de travail (PoW)](/glossary/#pow) vers la preuve d'enjeu a commencé avec les pionniers d'Ethereum qui ont « staké » leurs ETH dans un contrat de dépôt. Ces ETH sont utilisés pour protéger le réseau. Il y a eu une deuxième mise à jour le 12 avril 2023 pour permettre aux validateurs de retirer les ETH stakés. Depuis lors, les validateurs peuvent librement staker ou retirer des ETH.

<ButtonLink variant="outline-color" href="/staking/withdrawals/">En savoir plus sur les retraits</ButtonLink>

## Se défendre contre les attaques {#defending-against-attacks}

Des améliorations peuvent être apportées au protocole de preuve d'enjeu d'Ethereum. L'une d'elles est connue sous le nom de [fusion de vues (view-merge)](https://ethresear.ch/t/view-merge-as-a-replacement-for-proposer-boost/13739) - un algorithme de choix de [fork](/glossary/#fork) plus sécurisé qui rend certains types d'attaques sophistiquées plus difficiles.

Réduire le temps qu'Ethereum prend pour [finaliser](/glossary/#finality) les blocs offrirait une meilleure expérience utilisateur et empêcherait les attaques sophistiquées de « réorganisation » où les attaquants tentent de remanier des blocs très récents pour en tirer profit ou censurer certaines transactions. La [**finalité à slot unique (SSF)**](/roadmap/single-slot-finality/) est un **moyen de minimiser le délai de finalisation**. Actuellement, il y a l'équivalent de 15 minutes de blocs qu'un attaquant pourrait théoriquement convaincre d'autres validateurs de reconfigurer. Avec la SSF, il y en a 0. Les utilisateurs, des particuliers aux applications et aux échanges, bénéficient de l'assurance rapide que leurs transactions ne seront pas annulées, et le réseau en profite en bloquant toute une catégorie d'attaques.

<ButtonLink variant="outline-color" href="/roadmap/single-slot-finality/">En savoir plus sur la finalité à slot unique</ButtonLink>

## Se défendre contre la censure {#defending-against-censorship}

La décentralisation empêche les individus ou les petits groupes de [validateurs](/glossary/#validator) de devenir trop influents. De nouvelles technologies de staking peuvent aider à garantir que les validateurs d'Ethereum restent aussi décentralisés que possible tout en les défendant contre les pannes matérielles, logicielles et de réseau. Cela inclut des logiciels qui partagent les responsabilités des validateurs sur plusieurs [nœuds](/glossary/#node). C'est ce qu'on appelle la **technologie de validateur distribué (DVT)**. Les [pools de staking](/glossary/#staking-pool) sont incités à utiliser la DVT car elle permet à plusieurs ordinateurs de participer collectivement à la validation, ajoutant ainsi de la redondance et une tolérance aux pannes. Elle répartit également les clés des validateurs sur plusieurs systèmes, plutôt que d'avoir des opérateurs uniques gérant plusieurs validateurs. Cela rend plus difficile pour les opérateurs malhonnêtes de coordonner des attaques sur Ethereum. Dans l'ensemble, l'idée est de tirer des avantages en matière de sécurité en gérant les validateurs en tant que _communautés_ plutôt qu'en tant qu'individus.

<ButtonLink variant="outline-color" href="/staking/dvt/">En savoir plus sur la technologie de validateur distribué</ButtonLink>

La mise en œuvre de la **séparation proposant-constructeur (PBS)** améliorera considérablement les défenses intégrées d'Ethereum contre la censure. La PBS permet à un validateur de créer un bloc et à un autre de le diffuser sur le réseau Ethereum. Cela garantit que les gains issus des algorithmes professionnels de construction de blocs maximisant les profits sont partagés plus équitablement sur le réseau, **empêchant la mise de se concentrer** au fil du temps chez les stakers institutionnels les plus performants. Le proposeur de bloc peut sélectionner le bloc le plus rentable qui lui est offert par un marché de constructeurs de blocs. Pour censurer, un proposeur de bloc devrait souvent choisir un bloc moins rentable, ce qui serait **économiquement irrationnel et également évident pour le reste des validateurs** sur le réseau.

Il existe des ajouts potentiels à la PBS, tels que les transactions chiffrées et les listes d'inclusion, qui pourraient encore améliorer la résistance à la censure d'Ethereum. Ceux-ci rendent le constructeur de blocs et le proposant aveugles aux transactions réelles incluses dans leurs blocs.

<ButtonLink variant="outline-color" href="/roadmap/pbs/">En savoir plus sur la séparation proposant-constructeur</ButtonLink>

## Protéger les validateurs {#protecting-validators}

Il est possible qu'un attaquant sophistiqué puisse identifier les validateurs à venir et les spammer pour les empêcher de proposer des blocs ; c'est ce qu'on appelle une attaque par **déni de service (DoS)**. La mise en œuvre de l'[**élection secrète du leader (SLE)**](/roadmap/secret-leader-election) protégera contre ce type d'attaque en empêchant que les proposeurs de blocs soient connus à l'avance. Cela fonctionne en mélangeant continuellement un ensemble d'engagements cryptographiques représentant les candidats proposeurs de blocs et en utilisant leur ordre pour déterminer quel validateur est sélectionné de telle sorte que seuls les validateurs eux-mêmes connaissent leur ordre à l'avance.

<ButtonLink variant="outline-color" href="/roadmap/secret-leader-election">En savoir plus sur l'élection secrète du leader</ButtonLink>

## Progrès actuels {#current-progress}

**Les mises à niveau de sécurité sur la feuille de route sont à des stades de recherche avancés**, mais elles ne devraient pas être mises en œuvre avant un certain temps. Les prochaines étapes pour la fusion de vues (view-merge), la PBS, la SSF et la SLE consistent à finaliser une spécification et à commencer à construire des prototypes.