---
title: Preuve d'enjeu (PoS) contre preuve de travail (PoW)
description: "Une comparaison entre les mécanismes de consensus basés sur la preuve d'enjeu et la preuve de travail d'Ethereum"
lang: fr
---

Lors du lancement d'[Ethereum](/), la preuve d'enjeu (PoS) nécessitait encore beaucoup de recherche et de développement avant de pouvoir lui faire confiance pour sécuriser Ethereum. La preuve de travail (PoW) était un mécanisme plus simple qui avait déjà fait ses preuves avec Bitcoin, ce qui signifie que les développeurs principaux pouvaient l'implémenter immédiatement pour lancer Ethereum. Il a fallu huit années supplémentaires pour développer la preuve d'enjeu au point où elle a pu être implémentée.

Cette page explique les raisons du passage d'Ethereum de la preuve de travail à la preuve d'enjeu et les compromis impliqués.

## Sécurité {#security}

Les chercheurs d'Ethereum considèrent la preuve d'enjeu plus sécurisée que la preuve de travail. Cependant, elle n'a été implémentée que récemment sur le véritable réseau principal Ethereum et a moins fait ses preuves dans le temps que la preuve de travail. Les sections suivantes discutent des avantages et des inconvénients du modèle de sécurité de la preuve d'enjeu par rapport à la preuve de travail.

### Coût d'une attaque {#cost-to-attack}

Dans la preuve d'enjeu, les validateurs sont tenus de placer sous séquestre (« staker ») au moins 32 ETH dans un contrat intelligent. Ethereum peut détruire l'ether staké pour punir les validateurs qui se comportent mal. Pour parvenir à un consensus, au moins 66 % du total de l'ether staké doit voter en faveur d'un ensemble particulier de blocs. Les blocs ayant reçu le vote de >= 66 % de la mise deviennent « finalisés », ce qui signifie qu'ils ne peuvent pas être supprimés ou réorganisés.

Attaquer le réseau peut signifier empêcher la chaîne de se finaliser ou assurer une certaine organisation des blocs dans la chaîne canonique qui profite d'une manière ou d'une autre à un attaquant. Cela nécessite que l'attaquant détourne la voie du consensus honnête, soit en accumulant une grande quantité d'ether et en votant directement avec, soit en trompant les validateurs honnêtes pour qu'ils votent d'une manière particulière. Mis à part les attaques sophistiquées et à faible probabilité qui trompent les validateurs honnêtes, le coût pour attaquer Ethereum est le coût de la mise qu'un attaquant doit accumuler pour influencer le consensus en sa faveur.

Le coût d'attaque le plus bas est > 33 % de la mise totale. Un attaquant détenant > 33 % de la mise totale peut causer un retard de finalité simplement en se déconnectant. C'est un problème relativement mineur pour le réseau car il existe un mécanisme connu sous le nom de « fuite d'inactivité » qui draine la mise des validateurs hors ligne jusqu'à ce que la majorité en ligne représente 66 % de la mise et puisse à nouveau finaliser la chaîne. Il est également théoriquement possible pour un attaquant de provoquer une double finalité avec un peu plus de 33 % de la mise totale en créant deux blocs au lieu d'un lorsqu'on lui demande d'être producteur de blocs, puis de voter double avec tous ses validateurs. Chaque fork ne nécessite que 50 % des validateurs honnêtes restants pour voir chaque bloc en premier, donc s'ils parviennent à synchroniser leurs messages de manière parfaite, ils pourraient être en mesure de finaliser les deux forks. Cela a une faible probabilité de succès, mais si un attaquant était capable de provoquer une double finalité, la communauté Ethereum devrait décider de suivre un fork, auquel cas les validateurs de l'attaquant subiraient nécessairement une réduction sur l'autre.

Avec > 33 % de la mise totale, un attaquant a une chance d'avoir un effet mineur (retard de finalité) ou plus sévère (double finalité) sur le réseau Ethereum. Avec plus de 14 000 000 ETH stakés sur le réseau et un prix représentatif de 1 000 $/ETH, le coût minimum pour monter ces attaques est de `1000 x 14,000,000 x 0.33 = $4,620,000,000`. L'attaquant perdrait cet argent par le biais d'une réduction et serait éjecté du réseau. Pour attaquer à nouveau, il devrait accumuler > 33 % de la mise (à nouveau) et la brûler (à nouveau). Chaque tentative d'attaque du réseau coûterait > 4,6 milliards de dollars (à 1 000 $/ETH et 14 millions d'ETH stakés). L'attaquant est également éjecté du réseau lorsqu'il subit une réduction, et il doit rejoindre une file d'attente d'activation pour le réintégrer. Cela signifie que la fréquence d'une attaque répétée est limitée non seulement par la vitesse à laquelle l'attaquant peut accumuler > 33 % de la mise totale, mais aussi par le temps qu'il faut pour intégrer tous ses validateurs sur le réseau. À chaque fois que l'attaquant attaque, il s'appauvrit considérablement, et le reste de la communauté s'enrichit, grâce au choc d'offre qui en résulte.

D'autres attaques, telles que les attaques des 51 % ou la réversion de finalité avec 66 % de la mise totale, nécessitent considérablement plus d'ETH et sont beaucoup plus coûteuses pour l'attaquant.

Comparez cela à la preuve de travail. Le coût du lancement d'une attaque sur l'Ethereum en preuve de travail était le coût de posséder de manière constante > 50 % du taux de hachage total du réseau. Cela correspondait au matériel et aux coûts de fonctionnement d'une puissance de calcul suffisante pour surpasser les autres mineurs afin de calculer de manière constante les solutions de preuve de travail. Ethereum était principalement miné à l'aide de GPU plutôt que d'ASIC, ce qui maintenait les coûts bas (bien que si Ethereum était resté sur la preuve de travail, le minage par ASIC serait peut-être devenu plus populaire). Un adversaire devrait acheter beaucoup de matériel et payer l'électricité pour le faire fonctionner afin d'attaquer un réseau Ethereum en preuve de travail, mais le coût total serait inférieur au coût requis pour accumuler suffisamment d'ETH pour lancer une attaque. Une attaque des 51 % est environ [20 fois moins](https://youtu.be/1m12zgJ42dI?t=1562) coûteuse sur la preuve de travail que sur la preuve d'enjeu. Si l'attaque était détectée et que la chaîne subissait un hard fork pour supprimer ses modifications, l'attaquant pourrait utiliser de manière répétée le même matériel pour attaquer le nouveau fork.

### Complexité {#complexity}

La preuve d'enjeu est beaucoup plus complexe que la preuve de travail. Cela pourrait être un point en faveur de la preuve de travail car il est plus difficile d'introduire accidentellement des bugs ou des effets indésirables dans des protocoles plus simples. Cependant, la complexité a été maîtrisée par des années de recherche et développement, de simulations et d'implémentations sur réseau de test. Le protocole de preuve d'enjeu a été implémenté indépendamment par cinq équipes distinctes (sur chacune des couches d'exécution et de consensus) dans cinq langages de programmation, offrant une résilience contre les bugs des clients.

Pour développer et tester en toute sécurité la logique de consensus de la preuve d'enjeu, la chaîne balise a été lancée deux ans avant que la preuve d'enjeu ne soit implémentée sur le réseau principal Ethereum. La chaîne balise a agi comme un bac à sable pour les tests de la preuve d'enjeu, car il s'agissait d'une chaîne de blocs en direct implémentant la logique de consensus de la preuve d'enjeu mais sans toucher aux véritables transactions Ethereum - parvenant effectivement à un consensus sur elle-même. Une fois que cela a été stable et sans bug pendant un temps suffisant, la chaîne balise a été « fusionnée » avec le réseau principal Ethereum. Tout cela a contribué à maîtriser la complexité de la preuve d'enjeu au point que le risque de conséquences inattendues ou de bugs des clients était très faible.

### Surface d'attaque {#attack-surface}

La preuve d'enjeu est plus complexe que la preuve de travail, ce qui signifie qu'il y a plus de vecteurs d'attaque potentiels à gérer. Au lieu d'un seul réseau pair à pair connectant les clients, il y en a deux, chacun implémentant un protocole distinct. Le fait d'avoir un validateur spécifique présélectionné pour proposer un bloc dans chaque créneau crée un potentiel de déni de service où de grandes quantités de trafic réseau mettent ce validateur spécifique hors ligne.

Il existe également des moyens pour les attaquants de synchroniser soigneusement la publication de leurs blocs ou attestations afin qu'ils soient reçus par une certaine proportion du réseau honnête, les influençant à voter de certaines manières. Enfin, un attaquant peut simplement accumuler suffisamment d'ETH à staker et dominer le mécanisme de consensus. Chacun de ces [vecteurs d'attaque a des défenses associées](/developers/docs/consensus-mechanisms/pos/attack-and-defense), mais ils n'existent pas pour être défendus sous la preuve de travail.

## Décentralisation {#decentralization}

La preuve d'enjeu est plus décentralisée que la preuve de travail car les courses aux armements en matière de matériel de minage ont tendance à exclure les individus et les petites organisations. Bien que n'importe qui puisse techniquement commencer à miner avec un matériel modeste, sa probabilité de recevoir une récompense est infime par rapport aux opérations de minage institutionnelles. Avec la preuve d'enjeu, le coût du staking et le pourcentage de rendement sur cette mise sont les mêmes pour tout le monde. Il en coûte actuellement 32 ETH pour exécuter un validateur.

D'un autre côté, l'invention des dérivés de staking liquide a suscité des inquiétudes en matière de centralisation car quelques grands fournisseurs gèrent de grandes quantités d'ETH stakés. C'est problématique et doit être corrigé dès que possible, mais c'est aussi plus nuancé qu'il n'y paraît. Les fournisseurs de staking centralisés n'ont pas nécessairement un contrôle centralisé des validateurs - c'est souvent juste un moyen de créer un pool central d'ETH que de nombreux opérateurs de nœuds indépendants peuvent staker sans que chaque participant n'ait besoin de 32 ETH en propre.

La meilleure option pour Ethereum est que les validateurs soient exécutés localement sur des ordinateurs personnels, maximisant ainsi la décentralisation. C'est pourquoi Ethereum résiste aux changements qui augmentent les exigences matérielles pour exécuter un nœud/validateur.

## Durabilité {#sustainability}

La preuve d'enjeu est un moyen peu coûteux en carbone de sécuriser la chaîne de blocs. Sous la preuve de travail, les mineurs se font concurrence pour le droit de miner un bloc. Les mineurs ont plus de succès lorsqu'ils peuvent effectuer des calculs plus rapidement, ce qui incite à investir dans le matériel et la consommation d'énergie. Cela a été observé pour Ethereum avant son passage à la preuve d'enjeu. Peu avant la transition vers la preuve d'enjeu, Ethereum consommait environ 78 TWh/an - autant qu'un petit pays. Cependant, le passage à la preuve d'enjeu a réduit cette dépense énergétique d'environ 99,98 %. La preuve d'enjeu a fait d'Ethereum une plateforme économe en énergie et à faible émission de carbone.

[En savoir plus sur la consommation d'énergie d'Ethereum](/energy-consumption)

## Émission {#issuance}

L'Ethereum en preuve d'enjeu peut payer pour sa sécurité en émettant beaucoup moins de pièces que l'Ethereum en preuve de travail car les validateurs n'ont pas à payer des coûts d'électricité élevés. En conséquence, l'ETH peut réduire son inflation ou même devenir déflationniste lorsque de grandes quantités d'ETH sont brûlées. Des niveaux d'inflation plus faibles signifient que la sécurité d'Ethereum est moins chère qu'elle ne l'était sous la preuve de travail.

## Vous préférez un support visuel ? {#visual-learner}


<VideoWatch slug="pow-vs-pos" />

## Complément d'information {#further-reading}

- [Philosophie de conception de la preuve d'enjeu par Vitalik](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)
- [FAQ sur la preuve d'enjeu par Vitalik](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)
- [Vidéo « Simply Explained » sur la PoS contre la PoW](https://www.youtube.com/watch?v=M3EFi_POhps)