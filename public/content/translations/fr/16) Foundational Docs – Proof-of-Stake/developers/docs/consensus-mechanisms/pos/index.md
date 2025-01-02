---
title: Preuve d'enjeu (PoS)
description: Explication du protocole de consensus « Preuve d'enjeu » et de son rôle dans Ethereum.
lang: fr
---

La preuve d'enjeu (PoS) sous-tend le [mécanisme de consensus](/developers/docs/consensus-mechanisms/) Ethereum. Ethereum est passé au mécanisme de preuve d'enjeu en 2022 parce que celui-ci est plus sécurisé, moins énergivore, et parfait pour l'implémentation de nouvelles solutions de mise à l'échelle par rapport à la précédente architecture de [preuve de travail](/developers/docs/consensus-mechanisms/pow).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons d'abord de lire la page [Mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la preuve d'enjeu (PoS) ? {#what-is-pos}

La preuve d'enjeu est un moyen de prouver que les validateurs ont procuré dans le réseau une chose de valeur pouvant être détruite s'ils agissent de manière malhonnête. Ethereum utilise la preuve d'enjeu, où les validateurs misent explicitement du capital en ETH via un contrat intelligent sur Ethereum. Le validateur est alors chargé de vérifier la validité des nouveaux blocs propagés sur le réseau et, à l'occasion, de créer et de propager lui-même de nouveaux blocs. S’ils tentent de frauder le réseau (par exemple en proposant plusieurs blocs au lieu d'un seul ou en envoyant des attestations contradictoires), tout ou partie de leurs ETH misés peuvent être détruits.

## Validateurs {#validators}

Pour participer en tant que validateur, un utilisateur doit déposer 32 ETH dans le contrat de dépôt et exécuter trois logiciels distincts : un client d'exécution, un client de consensus, et un validateur. Lors du dépôt de ses ETH, l'utilisateur rejoint une file d'attente d'activation qui limite le taux de nouveaux validateurs rejoignant le réseau. Une fois activés, les validateurs reçoivent de nouveaux blocs de leurs pairs sur le réseau Ethereum. Les transactions incluses dans le bloc sont ré-exécutées pour vérifier que les modifications proposées à l'état d'Ethereum sont valides ainsi que la signature du bloc. Le validateur envoie ensuite un vote (appelé attestation) en faveur de ce bloc à travers le réseau.

Alors qu'avec le consensus de preuve de travail, la fréquence des blocs est déterminée par la difficulté minière, avec la preuve d'enjeu, cette fréquence reste fixe. Dans le consensus de mise en jeu d'Ethereum, le temps est divisé en créneaux (12 secondes) et périodes (32 créneaux). Un validateur est sélectionné aléatoirement pour proposer un bloc dans chaque créneau. Ce validateur est responsable de la création d'un nouveau bloc et de son envoi aux autres nœuds du réseau. De même, dans chaque créneau, un comité de validateurs est choisi au hasard, et leurs votes servent à déterminer la validité du bloc proposé. Il est important de diviser le validateur mis en place en comités pour maintenir la charge du réseau gérable. Les validateurs sont répartis en comités de telle façon que chaque validateur actif atteste à chaque période, mais pas à chaque créneau.

## Comment une transaction est exécutée sur Ethereum PoS {#transaction-execution-ethereum-pos}

Ce qui suit fournit une explication de bout en bout de la façon dont une transaction est exécutée avec la preuve d'enjeu Ethereum (PoS).

1. Un utilisateur crée et signe une [transaction](/developers/docs/transactions/) avec sa clé privée. Ceci est généralement géré par un portefeuille ou une bibliothèque telle que [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/) etc. mais sous le capot l'utilisateur fait une requête à un nœud en utilisant l'API [JSON-RPC](/developers/docs/apis/json-rpc/) d'Ethereum. L'utilisateur définit la quantité de gaz qu'il est prêt à payer comme un pourboire au validateur pour l'encourager à inclure la transaction dans un bloc. Les [pourboires](/developers/docs/gas/#priority-fee) sont payés au validateur alors que les [frais de base](/developers/docs/gas/#base-fee) sont brûlés.
2. La transaction est soumise à un client d'exécution [Ethereum](/developers/docs/nodes-and-clients/#execution-client) qui vérifie sa validité. Cela signifie s'assurer que l'expéditeur a suffisamment d'ETH pour remplir la transaction et qu'il l'a signée avec la bonne clé.
3. Si la transaction est valide, le client d'exécution l'ajoute à son mempool local (liste des transactions en attente) et le transmet également à d'autres nœuds sur le réseau d'informations de la couche d'exécution. Quand d'autres nœuds reçoivent la transaction, ils l'ajoutent également à leur mempool local. Les utilisateurs avancés peuvent s'abstenir de diffuser leur transaction et la transmettre à des créateurs de blocs spécialisés tels que [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Cela leur permet d'organiser les transactions dans les blocs à venir pour un profit maximal ([MEV](/developers/docs/mev/#mev-extraction)).
4. Un des nœuds de validation sur le réseau est le bloc proposé pour le créneau actuel, après avoir été précédemment sélectionné aléatoirement en utilisant la fonction RANDAO. Ce noeud est responsable de la construction et de la diffusion du prochain bloc à ajouter à la blockchain Ethereum et de la mise à jour de l'état global. Le noeud est composé de trois parties : un client d'exécution, un client de consensus et un client validateur. Le client d'exécution relie les transactions depuis le mempool local à une « charge utile d'exécution » et les exécute localement pour générer un changement d'état. Ces informations sont transmises au client de consensus où la charge utile d'exécution est enveloppée dans un « bloc balise » qui contient également des informations sur les récompenses, les pénalités, les réductions, les attestations, etc. qui permettent au réseau de se mettre d'accord sur la séquence de blocs en tête de la chaîne. La communication entre l'exécution et les clients de consensus est décrite plus en détail dans [Connecting the Consensus and Execution Clients](/developers/docs/networking-layer/#connecting-clients).
5. Les autres nœuds reçoivent le nouveau bloc phare sur le réseau d'informations de la couche de consensus. Ils le transmettent à leur client d'exécution où les transactions sont réexécutées localement pour s'assurer que le changement d'état proposé est valide. Le client de validateur atteste ensuite que le bloc est valide et qu'il est le bloc suivant logique dans leur vue de la chaîne (ce qui signifie qu'il se construit sur la chaîne avec le plus grand poids d'attestations tel que défini dans les [règles de choix de fourche](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Le bloc est ajouté à la base de données locale de chaque noeud qui l'atteste.
6. La transaction peut être considérée comme « finalisée » si elle fait partie d’une chaîne avec un « lien de majorité qualifiée » entre deux points de contrôle. Les points de contrôle ont lieu au début de chaque période. Ils existent pour tenir compte du fait que parmi les validateurs actifs, seul un sous-ensemble atteste à chaque créneau alors que tous attestent au cours de chaque période. Par conséquent, ce n’est qu’entre les périodes qu’un « lien de majorité qualifié » peut être démontré (durant lequel 66 % de tous les ETH misés sur le réseau s’accordent sur deux points de contrôle).

Vous trouverez plus de détails sur la finalité ci-dessous.

## Finalisation {#finality}

Une transaction atteint la « finalité » dans les réseaux distribués lorsqu’elle fait partie d’un bloc ne pouvant être modifié sans qu'une grande quantité d’ETH ne soit brûlée. Avec la preuve d'enjeu d'Ethereum, cela est géré via des blocs dits « checkpoint » ou « points de contrôle ». Le premier bloc de chaque période est un point de contrôle. Les validateurs votent pour des paires de blocs « points de contrôle » qu'ils considèrent comme étant valides. Si une paire de points de contrôle regroupe des votes représentant au moins les deux tiers de l'ETH total misé, les points de contrôle sont mis à niveau. La plus récente des deux (cible) devient « justifiée ». La plus ancienne des deux est déjà justifiée en ce qu'elle était la « cible » de la période précédente. Elle est ensuite mise à niveau vers le statut « finalisée ».

Pour annuler un bloc finalisé, un attaquant devrait s'engager à perdre au moins un tiers de l'ETH total mis en jeu. La raison exacte de ce phénomène est expliquée [dans ce post de blog de l'Ethereum Foundation](https://blog.ethereum.org/2016/05/09/on-settlement-finality/). Puisque la finalisation requiert une majorité des deux tiers, un attaquant pourrait empêcher le réseau d'atteindre la finalité en votant avec un tiers de la mise totale. Il existe un mécanisme visant à se défendre contre ce type d'attaque : la [fuite d'inactivité](https://eth2book.info/bellatrix/part2/incentives/inactivity). Ce mécanisme s'active lorsque la chaîne échoue à finaliser plus de quatre périodes. La fuite d'inactivité détruit progressivement les ETH mis en jeu par les validateurs qui votent contre la majorité, permettant à celle -ci de retrouver une majorité des deux tiers et de finaliser la chaîne.

## Sécurité Crypto-économique {#crypto-economic-security}

Faire fonctionner un validateur est un engagement. Il est attendu du validateur qu'il maintienne un matériel et une connectivité suffisants pour participer à la validation et à la proposition de blocs. En retour, le validateur est payé en ETH (le solde misé augmente). D'autre part, la participation en tant que validateur ouvre également de nouvelles possibilités pour les utilisateurs d'attaquer le réseau en vue de réaliser un gain personnel ou un sabotage. Pour éviter cela, les validateurs ratent les récompenses en ETH s'ils ne participent pas quand ils sont appelés, et leur mise actuelle peut être détruite s'ils se comportent de manière malhonnête. Deux principaux comportements peuvent être considérés comme malhonnêtes : proposer plusieurs blocs pour un même créneau (équivoque) et soumettre des attestations contradictoires.

La quantité d'ETH détruite dépend du nombre de validateurs qui sont sanctionnés en même temps. Ce mécanisme est connu sous le nom de [« pénalité de corrélation »](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty) ; il peut être mineur (~1 % de la mise en jeu pour un seul validateur sanctionné) ou entraîner la destruction de 100 % de la mise en jeu du validateur (échec massif). Elle est imposée à mi-chemin d’une période de sortie forcée qui commence par une pénalité immédiate (jusqu’à 1 ETH) le jour 1, la pénalité de corrélation le jour 18 et enfin l’expulsion du réseau le jour 36. Les validateurs reçoivent chaque jour des pénalités d'attestation mineures parce qu'ils sont présents sur le réseau mais ne soumettent pas de votes. Tout cela signifie qu’une attaque coordonnée serait très coûteuse pour l’attaquant.

## Choix de la fourche {#fork-choice}

Lorsque le réseau fonctionne de manière optimale et honnête, il n'y a jamais qu'un nouveau bloc en tête de chaîne, et tous les validateurs l'attestent. Cependant, il est possible pour les validateurs d'avoir des points de vue différents sur le bloc en tête de la chaîne, en raison de la latence du réseau ou parce qu'un validateur a émis des données contradictoires. Par conséquent, les clients de consensus ont besoin d'un algorithme pour décider lequel favoriser. L'algorithme utilisé dans la preuve d'enjeu Ethereum est appelé [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), et il travaille en identifiant la fourche qui a le plus grand poids d'attestations dans son histoire.

## Preuve d'enjeu et sécurité {#pos-and-security}

Avec un consensus de preuve d'enjeu (comme avec la preuve de travail), la menace d'une attaque de [51 %](https://www.investopedia.com/terms/1/51-attack.asp) existe toujours, mais elle est encore plus risquée pour les attaquants. Un attaquant aurait besoin de 51 % de l'ETH mis en jeu. Ils pourraient alors utiliser leurs propres attestations pour s'assurer que leur fourche préférée est celle qui possède le plus d'attestations. Les clients de consensus utilisent le « poids » des attestations cumulées pour déterminer la chaîne correcte, de sorte que cet attaquant serait en mesure de faire de sa fourche la fourche canonique. Toutefois, l'intérêt de la preuve d'enjeu comparé à la preuve de travail est que la communauté a la possibilité de monter une contre-attaque. Par exemple, les validateurs honnêtes pourraient décider de continuer de construire sur la chaîne minoritaire et ignorer totalement la fourche de l'attaquant tout en encourageant les applications, les échanges et les pools à faire de même. Ils pourraient également décider de sortir l'attaquant de force du réseau et de détruire l'ETH misé. Ces possibilités constituent des défenses fortes contre une attaque de type 51 %.

Au-delà des attaques à 51 %, les acteurs mal intentionnés pourraient également tenter d'autres types d'activités malveillantes, telles que :

- attaques de longue portée (bien que le gadget de finalité neutralise ce vecteur d'attaque)
- réorganisations de courte portée (bien que les délais d'accélération et d'attestation de la proposition atténuent ce problème)
- attaques par rebond et par équilibrage (également atténuées par l'augmentation du nombre de propositions, et ces attaques n'ont de toute façon été démontrées que dans des conditions de réseau idéales)
- attaques avalanche (neutralisé par la règle des algorithmes de choix de fourche qui consiste à ne prendre en compte que le dernier message)

Dans l'ensemble, il a été démontré que la preuve d'enjeu, telle qu'elle est implémentée sur Ethereum, est plus sûre économiquement que la preuve de travail.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                                                                                                                            | Inconvénients                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| La mise en jeu rend plus accessible la participation du grand public à la sécurisation du réseau, promouvant ainsi la décentralisation. Un nœud de validateur peut être mis en place sur un ordinateur portable basique. Les pools de staking permettent aux utilisateurs de miser sans pour autant posséder 32 ETH. | La preuve d'enjeu est plus jeune et il existe moins de données concernant sa résilience en cas d'attaque que le consensus de preuve de travail |
| Le système de mise est plus décentralisé. Les économies d’échelle ne s’appliquent pas de la même manière que pour le minage effectué sous un consensus de preuve de travail.                                                                                                                                         | La preuve d'enjeu est plus complexe à mettre en place que la preuve de travail                                                                 |
| La preuve d'enjeu offre une plus grande sécurité crypto-économique que la preuve de travail                                                                                                                                                                                                                          | Les utilisateurs doivent utiliser trois logiciels pour participer à la preuve d'enjeu d'Ethereum.                                              |
| Une émission moindre de nouveaux ETH est nécessaire pour inciter la participation au réseau                                                                                                                                                                                                                          |                                                                                                                                                |

### Comparaison avec la preuve de travail {#comparison-to-proof-of-work}

Initialement, Ethereum utilisait la preuve de travail, mais est passé à la preuve d'enjeu en septembre 2022. Le PoS (Proof of Stake, preuve d'enjeu) offre plusieurs avantages par rapport au PoW (Proof of Work, preuve de travail), tels que :

- Meilleure efficacité énergétique - il n'est plus nécessaire d'utiliser beaucoup d'énergie pour résoudre les calculs liés à la preuve de travail
- Moins de barrières à l'entrée, avec des besoins matériels moindre - il n'est pas nécessaire d'avoir du matériel haut de gamme pour avoir une chance de créer de nouveaux blocs
- Réduction du risque de centralisation - la preuve d'enjeu devrait conduire à une multiplication des nœuds sécurisant le réseau
- Du fait d'un besoin en énergie moindre, il n'est pas nécessaire d'émettre autant ETH pour encourager la participation
- les sanctions économiques en cas de fraude rendent les attaques de type 51% plus onéreuses pour un attaquant que la preuve de travail
- La communauté peut, en dernier recours, voter pour la récupération d'une chaîne viable dans le cas où surviendrait une attaque de type 51% malgré les barrières économiques évoquées ci-dessus.

## Complément d'information {#further-reading}

- [FAQ pour la preuve d'enjeu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html)_Vitalik Buterin_
- [Qu'est-ce qu'une Preuve d'enjeu ?](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Qu'est-ce qu'une preuve d'enjeu et pourquoi c'est important ?](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Pourquoi la preuve d'enjeu (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Preuve d'enjeu : comment j'ai appris à aimer la subjectivité faible ?](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/) _Vitalik Buterin_
- [Attaque et défense des preuves d'enjeu pour Ethereum](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Une philosophie de design pour la Preuve d'enjeu](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Vidéo : Vitalik Buterin explique la preuve d'enjeu à Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)
