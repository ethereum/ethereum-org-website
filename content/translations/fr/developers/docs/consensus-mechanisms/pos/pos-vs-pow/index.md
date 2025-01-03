---
title: Preuve d'enjeu contre preuve de travail
description: Une comparaison entre le mécanisme de consensus basé sur la preuve d'enjeu et la preuve de travail d'Ethereum
lang: fr
---

Lors du lancement d'Ethereum, la preuve d'enjeu avait encore besoin de beaucoup de recherche et développement avant de pouvoir être considérée comme fiable pour sécuriser Ethereum. La preuve de travail était un mécanisme plus simple qui avait déjà été prouvé par Bitcoin, ce qui signifie que les développeurs pouvaient le mettre en œuvre immédiatement pour lancer Ethereum. Il a fallu huit années supplémentaires pour développer la preuve d'enjeu jusqu'à ce qu'elle puisse être mise en œuvre.

Cette page décrit les raisons pour lesquelles Ethereum est passé de la preuve de travail à la preuve d'enjeu, ainsi que les compromis qui en découlent.

## Sécurité {#security}

Les chercheurs d'Ethereum considèrent que la preuve d'enjeu est plus sûre que la preuve de travail. Cependant, elle n'a été mise en œuvre que récemment pour le réseau principal Ethereum et elle est moins éprouvée que la preuve de travail. Les sections suivantes présentent les avantages et les inconvénients du modèle de sécurité de la preuve d'enjeu par rapport à celui de la preuve de travail.

### Coût de l'attaque {#cost-to-attack}

Dans la preuve d'enjeu, les validateurs sont tenus de mettre en dépôt (« mise ») au moins 32 ETH dans un contrat intelligent. Ethereum peut détruire l'éther mis en jeu pour punir les validateurs qui se comportent mal. Pour parvenir à un consensus, il faut qu'au moins 66 % du total d'éthers mis en jeu votent en faveur d'un ensemble particulier de blocs. Les blocs approuvés par >=66 % des participants deviennent « finalisés », ce qui signifie qu'ils ne peuvent pas être supprimés ou réorganisés.

Attaquer le réseau peut signifier empêcher la chaîne de se finaliser ou garantir une certaine organisation des blocs dans la chaîne canonique qui profite d'une manière ou d'une autre à l'attaquant. Pour ce faire, l'attaquant doit détourner la voie d'un consensus honnête, soit en accumulant une grande quantité d'éther et en votant directement avec, soit en trompant les validateurs honnêtes pour qu'ils votent d'une manière particulière. Hormis les attaques sophistiquées et peu probables qui trompent les validateurs honnêtes, le coût d'une attaque contre Ethereum est le coût de l'enjeu qu'un attaquant doit accumuler pour influencer le consensus en sa faveur.

Le coût d'attaque le plus bas est >33 % de l'enjeu total. Un attaquant détenant >33 % de l'enjeu total peut provoquer un retard de finalité simplement en se déconnectant. Il s'agit d'un problème relativement mineur pour le réseau, car il existe un mécanisme connu sous le nom de « fuite d'inactivité » qui fait fuir les enjeux des validateurs hors ligne jusqu'à ce que la majorité en ligne représente 66 % des enjeux et puisse à nouveau finaliser la chaîne. Il est également théoriquement possible pour un attaquant de provoquer une double finalité avec un peu plus de 33 % de l'enjeu total en créant deux blocs au lieu d'un lorsqu'on lui demande d'être producteur de blocs, puis en procédant à un double vote avec tous ses validateurs. Chaque fourche ne nécessite que 50 % des validateurs honnêtes restants pour voir chaque bloc en premier, donc s'ils parviennent à synchroniser correctement leurs messages, ils pourront peut-être finaliser les deux fourches. Cela a peu de chances de réussir, mais si un attaquant parvenait à causer une double-finalité, la communauté Ethereum devrait décider de suivre une des fourches, auquel cas les validateurs de l'attaquant seraient nécessairement sanctionnés sur l'autre.

Avec >33% de la mise totale, un attaquant a une chance d'avoir un effet mineur (retard de finalité) ou plus grave (double finalité) sur le réseau Ethereum. Avec plus de 14 000 000 ETH bloqués sur le réseau et un prix représentatif de 1 000 $/ETH, le coût minimum pour faire ces attaques est de `1000 x 14 000 000 x 0,33 = 4 620 000 000 $`. L'attaquant perdrait son argent à cause des pénalités et serait expulsé du réseau. Pour attaquer à nouveau, ils devraient accumuler >33 % de la mise (encore une fois) et la brûler (encore une fois). Chaque tentative d'attaque du réseau coûterait > 4,6 milliards de dollars (à 1 000 $/ETH et 14M ETH misés). L'attaquant est également expulsé du réseau lorsqu'il est sanctionné, et il doit donc rejoindre la file d'attente d'activation pour revenir. Cela signifie que la fréquence d'une attaque répétée est limitée non seulement par la vitesse à laquelle l'attaquant peut accumuler >33 % de la mise totale, mais aussi par le temps nécessaire pour intégrer tous leurs validateurs sur le réseau. Chaque fois que l'attaquant lance une attaque, il devient beaucoup plus pauvre, et le reste de la communauté s'enrichit, grâce au choc d'offre qui en résulte.

D'autres attaques, telles que les attaques 51 % ou la réversion de la finalité avec 66 % de la mise totale, nécessitent beaucoup plus d'ETH et coûtent beaucoup plus cher à l'attaquant.

Comparons cela avec le mécanisme de preuve de travail. Le coût du lancement d’une attaque contre la preuve de travail Ethereum était le coût de la possession constante de >50 % du taux de hachage total du réseau. Cela équivalait au coût du matériel et aux frais de fonctionnement nécessaires pour disposer d'une puissance de calcul suffisante pour surpasser régulièrement les autres mineurs dans le calcul des solutions de preuve de travail. Ethereum était principalement exploité à l'aide de GPU plutôt que d'ASIC, ce qui permettait de réduire les coûts (même si Ethereum était resté sur une preuve de travail, l'exploitation minière ASIC serait peut-être devenue plus populaire). Un attaquant devrait acheter beaucoup de matériel et payer pour l'électricité nécessaire afin d'attaquer un réseau Ethereum basé sur la preuve de travail, mais le coût total serait inférieur au coût nécessaire pour accumuler suffisamment d'ETH pour lancer une attaque. Une attaque à 51 % est ~[20 fois](https://youtu.be/1m12zgJ42dI?t=1562) moins chère sur la preuve de travail que sur la preuve d'enjeu. Si l'attaque était détectée et que la chaîne effectuait une séparation pour supprimer leurs altérations, l'attaquant pourrait utiliser à nouveau le même matériel pour attaquer la nouvelle fourche.

### Complexité {#complexity}

La preuve d'enjeu est beaucoup plus complexe que la preuve de travail. Cela pourrait être un argument en faveur de la preuve de travail, car il est plus difficile de créer accidentellement des bogues ou des effets non désirés dans des protocoles plus simples. Cependant, des années de recherche et de développement, de simulations et de mises en œuvre de réseaux d'essai ont permis de maîtriser cette complexité. Le protocole de preuve d'enjeu a été mis en œuvre indépendamment par cinq équipes distinctes (sur chacune des couches d'exécution et de consensus) dans cinq langages de programmation, ce qui permet de se prémunir contre les bogues de clients.

Pour développer et tester en toute sécurité la logique de consensus de la preuve d'enjeu, la chaîne Beacon a été lancée deux ans avant que la preuve d'enjeu ne soit mise en œuvre sur le réseau principal Ethereum. La Chaine phare a agi comme un bac à sable pour les tests de preuve d'enjeu, car c'était une blockchain active appliquant la logique de consensus de preuve d'enjeu mais sans toucher aux transactions Ethereum réelles - en faisant seulement consensus avec elle-même. Une fois que cela a été stable et sans bug pendant un temps suffisant, la Chain phare a été « fusionnée » avec le réseau principal d'Ethereum. Tout cela a contribué à maîtriser la complexité de la preuve d'enjeu au point que le risque de conséquences non anticipées ou de bugs du client était très faible.

### Surface d'attaque {#attack-surface}

La preuve d'enjeu est plus complexe que la preuve de travail, ce qui signifie qu'il y a davantage de vecteurs d'attaque potentiels à gérer. Au lieu d'un réseau pair-à-pair reliant les clients, il y en a deux, chacun mettant en œuvre un protocole distinct. Le fait qu'un validateur spécifique soit présélectionné pour proposer un bloc dans chaque créneau crée un risque de déni de service lorsque de grandes quantités de trafic réseau mettent ce validateur spécifique hors ligne.

Les attaquants peuvent également programmer avec soin la publication de leurs blocs ou attestations de manière à ce qu'ils soient reçus par une certaine proportion du réseau honnête, l'incitant ainsi à voter d'une certaine manière. Finalement, un attaquant peut simplement accumuler suffisamment d'ETH en vue de le mettre en jeu et de dominer le mécanisme de consensus. Chacun de ces [vecteurs d'attaque a des défenses associées](/developers/docs/consensus-mechanisms/pos/attack-and-defense), mais ils n'existent pas pour être défendus sous preuve de travail.

## Décentralisation {#decentralization}

La preuve d'enjeu est plus décentralisée que la preuve de travail, car la course au matériel de minage a tendance à exclure les individus et les petites organisations en raison des coûts élevés. Si n'importe qui peut techniquement se lancer dans le minage avec un matériel modeste, ses chances de recevoir une quelconque récompense sont infimes par rapport aux opérations de minage institutionnelles. Avec la preuve d'enjeu, le coût de la mise en jeu et le pourcentage de rendement sur cette mise sont les mêmes pour tout le monde. Les frais de fonctionnement d'un validateur s'élèvent actuellement à 32 ETH.

D'un autre côté, l'invention des produits dérivés de mise en jeu liquide a conduit à des préoccupations sur la centralisation car quelques grands fournisseurs gèrent de grandes quantités d'ETH mis en jeu. C'est problématique et cela doit être corrigé dès que possible, mais c'est aussi plus nuancé qu'il n'y paraît. Les fournisseurs de ces produits centralisés n'ont pas nécessairement un contrôle total des validateurs - souvent, il s'agit simplement d'un moyen de créer un regroupement d'ETH que de nombreux opérateurs de nœuds indépendants peuvent mettre en jeu sans que chaque participant n'ait besoin de ses propres 32 ETH.

Pour Ethereum, la meilleure option consiste à faire fonctionner les validateurs localement, sur des ordinateurs personnels, afin de maximiser la décentralisation. Cela explique pourquoi Ethereum résiste aux changements qui augmentent les exigences matérielles pour le fonctionnement d'un nœud/validateur.

## Développement durable {#sustainability}

La preuve d'enjeu est une manière peu gourmande en carbone de sécuriser la blockchain. Dans le cadre de la preuve de travail, les mineurs sont en concurrence pour obtenir le droit de miner un bloc. Les mineurs sont plus performants lorsqu'ils peuvent effectuer des calculs plus rapidement, ce qui incite à investir dans le matériel et la consommation d'énergie. C'est ce qui a été observé pour Ethereum avant de passer à la preuve d'enjeu. Peu avant le passage à la preuve d'enjeu, Ethereum consommait environ 78 TWh/an, soit autant qu'un petit pays. Cependant, le passage à la preuve d'enjeu a permis de réduire cette dépense énergétique de ~99,98 %. La preuve d'enjeu a fait d'Ethereum une plateforme économe en énergie et à faible émission de carbone.

[En savoir plus sur la consommation d'énergie d'Ethereum](/energy-consumption)

## Émission {#issuance}

L'Ethereum basé sur la preuve d'enjeu peut financer sa sécurité en émettant beaucoup moins de jetons que l'Ethereum basé sur la preuve de travail, car les validateurs n'ont pas à payer des coûts élevés en électricité. Par conséquent, ETH peut réduire son inflation ou même devenir déflationniste lorsque de grandes quantités d'ETH sont brûlées. Les niveaux d'inflation plus faibles signifient que la sécurité d'Ethereum est moins coûteuse qu'elle ne l'était avec la preuve de travail.

## Davantage qu'un apprenant visuel ? {#visual-learner}

Regardez Justin Drake expliquer les avantages de la preuve d'enjeu par rapport à la preuve de travail :

<YouTube id="1m12zgJ42dI" />

## Complément d'information {#further-reading}

- [La philosophie de conception de la preuve d'enjeu par Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [Les FAQ de Vitalik sur la preuve d'enjeu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Vidéo de « Simply Explained » sur pas vs pow](https://www.youtube.com/watch?v=M3EFi_POhps)
