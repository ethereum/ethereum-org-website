---
title: Preuve d'enjeu (PoS)
description: Une explication du protocole de consensus de preuve d'enjeu et de son rôle dans Ethereum.
lang: fr
---

La preuve d'enjeu (PoS) sous-tend le [mécanisme de consensus](/developers/docs/consensus-mechanisms/) d'Ethereum. Ethereum a activé son mécanisme de preuve d'enjeu en 2022 car il est plus sécurisé, moins gourmand en énergie et plus adapté à la mise en œuvre de nouvelles solutions de mise à l'échelle par rapport à la précédente architecture de [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow).

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de vous renseigner d'abord sur les [mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Qu'est-ce que la preuve d'enjeu (PoS) ? {#what-is-pos}

La preuve d'enjeu est un moyen de prouver que les validateurs ont injecté quelque chose de valeur dans le réseau qui peut être détruit s'ils agissent de manière malhonnête. Dans la preuve d'enjeu d'[Ethereum](/), les validateurs stakent explicitement du capital sous forme d'ETH dans un contrat intelligent sur Ethereum. Le validateur est ensuite responsable de vérifier que les nouveaux blocs propagés sur le réseau sont valides et, occasionnellement, de créer et de propager lui-même de nouveaux blocs. S'ils tentent de frauder le réseau (par exemple en proposant plusieurs blocs alors qu'ils ne devraient en envoyer qu'un seul, ou en envoyant des attestations contradictoires), une partie ou la totalité de leurs ETH stakés peut être détruite.

## Validateurs {#validators}

Pour participer en tant que validateur, un utilisateur doit déposer 32 ETH dans le contrat de dépôt et exécuter trois logiciels distincts : un client d'exécution, un client de consensus et un client validateur. Lors du dépôt de ses ETH, l'utilisateur rejoint une file d'attente d'activation qui limite le rythme d'arrivée des nouveaux validateurs rejoignant le réseau. Une fois activés, les validateurs reçoivent de nouveaux blocs de la part de leurs pairs sur le réseau Ethereum. Les transactions livrées dans le bloc sont réexécutées pour vérifier que les modifications proposées à l'état d'Ethereum sont valides, et la signature du bloc est vérifiée. Le validateur envoie ensuite un vote (appelé attestation) en faveur de ce bloc à travers le réseau.

Alors que sous la preuve de travail, le timing des blocs est déterminé par la difficulté de minage, dans la preuve d'enjeu, le tempo est fixe. Le temps dans l'Ethereum en preuve d'enjeu est divisé en créneaux (12 secondes) et en époques (32 créneaux). Un validateur est sélectionné aléatoirement pour être un proposeur de bloc à chaque créneau. Ce validateur est responsable de la création d'un nouveau bloc et de son envoi aux autres nœuds du réseau. De plus, à chaque créneau, un comité de validateurs est choisi aléatoirement, dont les votes sont utilisés pour déterminer la validité du bloc proposé. La division de l'ensemble des validateurs en comités est importante pour maintenir la charge du réseau gérable. Les comités divisent l'ensemble des validateurs de sorte que chaque validateur actif atteste à chaque époque, mais pas à chaque créneau.

## Comment une transaction est exécutée dans la PoS d'Ethereum {#transaction-execution-ethereum-pos}

Ce qui suit fournit une explication de bout en bout de la façon dont une transaction est exécutée dans la preuve d'enjeu d'Ethereum.

1. Un utilisateur crée et signe une [transaction](/developers/docs/transactions/) avec sa clé privée. Ceci est généralement géré par un portefeuille ou une bibliothèque telle que [ethers.js](https://docs.ethers.org/v6/), [web3js](https://docs.web3js.org/), [web3py](https://web3py.readthedocs.io/en/v5/), etc., mais en interne, l'utilisateur effectue une requête vers un nœud en utilisant l'[API JSON-RPC](/developers/docs/apis/json-rpc/) d'Ethereum. L'utilisateur définit la quantité de gaz qu'il est prêt à payer comme frais de priorité à un validateur pour l'encourager à inclure la transaction dans un bloc. Les [frais de priorité](/developers/docs/gas/#priority-fee) sont payés au validateur tandis que les [frais de base](/developers/docs/gas/#base-fee) sont brûlés.
2. La transaction est soumise à un [client d'exécution](/developers/docs/nodes-and-clients/#execution-client) Ethereum qui vérifie sa validité. Cela signifie s'assurer que l'expéditeur a suffisamment d'ETH pour effectuer la transaction et qu'il l'a signée avec la bonne clé.
3. Si la transaction est valide, le client d'exécution l'ajoute à sa mempool locale (liste des transactions en attente) et la diffuse également aux autres nœuds sur le réseau de potins (gossip network) de la couche d'exécution. Lorsque d'autres nœuds entendent parler de la transaction, ils l'ajoutent également à leur mempool locale. Les utilisateurs avancés peuvent s'abstenir de diffuser leur transaction et la transmettre plutôt à des constructeurs de blocs spécialisés tels que [Flashbots Auction](https://docs.flashbots.net/flashbots-auction/overview). Cela leur permet d'organiser les transactions dans les blocs à venir pour un profit maximum ([MEV](/developers/docs/mev/#mev-extraction)).
4. L'un des nœuds validateurs sur le réseau est le proposeur de bloc pour le créneau actuel, ayant été préalablement sélectionné de manière pseudo-aléatoire à l'aide de RANDAO. Ce nœud est responsable de la construction et de la diffusion du prochain bloc à ajouter à la chaîne de blocs Ethereum et de la mise à jour de l'état global. Le nœud est composé de trois parties : un client d'exécution, un client de consensus et un client validateur. Le client d'exécution regroupe les transactions de la mempool locale dans une « charge utile d'exécution » et les exécute localement pour générer un changement d'état. Ces informations sont transmises au client de consensus où la charge utile d'exécution est enveloppée dans un « bloc phare » qui contient également des informations sur les récompenses, les pénalités, les réductions, les attestations, etc., qui permettent au réseau de s'accorder sur la séquence de blocs à la tête de la chaîne. La communication entre les clients d'exécution et de consensus est décrite plus en détail dans [Connexion des clients de consensus et d'exécution](/developers/docs/networking-layer/#connecting-clients).
5. D'autres nœuds reçoivent le nouveau bloc phare sur le réseau de potins de la couche de consensus. Ils le transmettent à leur client d'exécution où les transactions sont réexécutées localement pour s'assurer que le changement d'état proposé est valide. Le client validateur atteste ensuite que le bloc est valide et qu'il est le prochain bloc logique dans sa vision de la chaîne (ce qui signifie qu'il s'appuie sur la chaîne avec le plus grand poids d'attestations tel que défini dans les [règles de choix de fork](/developers/docs/consensus-mechanisms/pos/#fork-choice)). Le bloc est ajouté à la base de données locale de chaque nœud qui l'atteste.
6. La transaction peut être considérée comme « finalisée » si elle fait partie d'une chaîne avec un « lien de supermajorité » entre deux points de contrôle. Les points de contrôle se produisent au début de chaque époque et ils existent pour tenir compte du fait que seul un sous-ensemble de validateurs actifs atteste à chaque créneau, mais que tous les validateurs actifs attestent au cours de chaque époque. Par conséquent, ce n'est qu'entre les époques qu'un « lien de supermajorité » peut être démontré (c'est là que 66 % du total des ETH stakés sur le réseau s'accordent sur deux points de contrôle).

Plus de détails sur la finalité peuvent être trouvés ci-dessous.

## Finalité {#finality}

Une transaction a une « finalité » dans les réseaux distribués lorsqu'elle fait partie d'un bloc qui ne peut pas changer sans qu'une grande quantité d'ETH ne soit brûlée. Sur l'Ethereum en preuve d'enjeu, cela est géré à l'aide de blocs « points de contrôle ». Le premier bloc de chaque époque est un point de contrôle. Les validateurs votent pour des paires de points de contrôle qu'ils considèrent comme valides. Si une paire de points de contrôle attire des votes représentant au moins les deux tiers du total des ETH stakés, les points de contrôle sont mis à niveau. Le plus récent des deux (la cible) devient « justifié ». Le plus ancien des deux est déjà justifié car il était la « cible » lors de l'époque précédente. Maintenant, il est mis à niveau vers « finalisé ». Ce processus de mise à niveau des points de contrôle est géré par **[Casper the Friendly Finality Gadget (Casper FFG)](https://arxiv.org/pdf/1710.09437)**. Casper FFG est un outil de finalité de bloc pour le consensus. Une fois qu'un bloc est finalisé, il ne peut pas être annulé ou modifié sans une réduction majoritaire des stakers, ce qui le rend économiquement non viable.

Pour annuler un bloc finalisé, un attaquant s'engagerait à perdre au moins un tiers de l'offre totale d'ETH stakés. La raison exacte de cela est expliquée dans cet [article de blog de la Fondation Ethereum](https://blog.ethereum.org/2016/05/09/on-settlement-finality). Puisque la finalité nécessite une majorité des deux tiers, un attaquant pourrait empêcher le réseau d'atteindre la finalité en votant avec un tiers de la mise totale. Il existe un mécanisme pour se défendre contre cela : la [fuite d'inactivité](https://eth2book.info/bellatrix/part2/incentives/inactivity). Celle-ci s'active chaque fois que la chaîne ne parvient pas à se finaliser pendant plus de quatre époques. La fuite d'inactivité draine les ETH stakés des validateurs votant contre la majorité, permettant à la majorité de retrouver une majorité des deux tiers et de finaliser la chaîne.

## Sécurité crypto-économique {#crypto-economic-security}

Gérer un validateur est un engagement. Le validateur est censé maintenir un matériel et une connectivité suffisants pour participer à la validation de bloc et à la proposition. En retour, le validateur est payé en ETH (son solde staké augmente). D'un autre côté, participer en tant que validateur ouvre également de nouvelles voies aux utilisateurs pour attaquer le réseau à des fins de gain personnel ou de sabotage. Pour éviter cela, les validateurs manquent des récompenses en ETH s'ils ne participent pas lorsqu'ils sont sollicités, et leur mise existante peut être détruite s'ils se comportent de manière malhonnête. Deux comportements principaux peuvent être considérés comme malhonnêtes : proposer plusieurs blocs dans un seul créneau (équivoque) et soumettre des attestations contradictoires.

La quantité d'ETH réduite dépend du nombre de validateurs qui subissent également une réduction à peu près au même moment. C'est ce qu'on appelle la [« pénalité de corrélation »](https://eth2book.info/bellatrix/part2/incentives/slashing#the-correlation-penalty), et elle peut être mineure (~1 % de la mise pour un seul validateur sanctionné isolément) ou peut entraîner la destruction de 100 % de la mise du validateur (événement de réduction massive). Elle est imposée à mi-chemin d'une période de sortie forcée qui commence par une pénalité immédiate (jusqu'à 1 ETH) le jour 1, la pénalité de corrélation le jour 18, et enfin, l'éjection du réseau le jour 36. Ils reçoivent des pénalités d'attestation mineures chaque jour car ils sont présents sur le réseau mais ne soumettent pas de votes. Tout cela signifie qu'une attaque coordonnée serait très coûteuse pour l'attaquant.

## Choix de fork {#fork-choice}

Lorsque le réseau fonctionne de manière optimale et honnête, il n'y a jamais qu'un seul nouveau bloc à la tête de la chaîne, et tous les validateurs l'attestent. Cependant, il est possible que les validateurs aient des vues différentes de la tête de la chaîne en raison de la latence du réseau ou parce qu'un proposeur de bloc a été équivoque. Par conséquent, les clients de consensus nécessitent un algorithme pour décider lequel privilégier. L'algorithme utilisé dans la preuve d'enjeu d'Ethereum s'appelle [LMD-GHOST](https://arxiv.org/pdf/2003.03052.pdf), et il fonctionne en identifiant le fork qui a le plus grand poids d'attestations dans son historique.

## Preuve d'enjeu et sécurité {#pos-and-security}

La menace d'une [attaque des 51 %](https://www.investopedia.com/terms/1/51-attack.asp) existe toujours sur la preuve d'enjeu comme sur la preuve de travail, mais elle est encore plus risquée pour les attaquants. Un attaquant aurait besoin de 51 % des ETH stakés. Il pourrait alors utiliser ses propres attestations pour s'assurer que son fork préféré soit celui avec le plus d'attestations accumulées. Le « poids » des attestations accumulées est ce que les clients de consensus utilisent pour déterminer la bonne chaîne, cet attaquant serait donc en mesure de faire de son fork le fork canonique. Cependant, l'une des forces de la preuve d'enjeu par rapport à la preuve de travail est que la communauté a de la flexibilité pour monter une contre-attaque. Par exemple, les validateurs honnêtes pourraient décider de continuer à construire sur la chaîne minoritaire et d'ignorer le fork de l'attaquant tout en encourageant les applications, les échanges et les pools à faire de même. Ils pourraient également décider de retirer de force l'attaquant du réseau et de détruire ses ETH stakés. Ce sont de solides défenses économiques contre une attaque des 51 %.

Au-delà des attaques des 51 %, les acteurs malveillants pourraient également tenter d'autres types d'activités malveillantes, telles que :

- les attaques à longue portée (bien que l'outil de finalité neutralise ce vecteur d'attaque)
- les « réorganisations » à courte portée (bien que le renforcement du proposant et les délais d'attestation atténuent cela)
- les attaques par rebond et équilibrage (également atténuées par le renforcement du proposant, et ces attaques n'ont de toute façon été démontrées que dans des conditions de réseau idéalisées)
- les attaques par avalanche (neutralisées par la règle des algorithmes de choix de fork consistant à ne considérer que le dernier message)

Dans l'ensemble, il a été démontré que la preuve d'enjeu, telle qu'elle est mise en œuvre sur Ethereum, est plus sûre sur le plan économique que la preuve de travail.

## Avantages et inconvénients {#pros-and-cons}

| Avantages                                                                                                                                                                                                                                                                   | Inconvénients                                                                                             |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| Le staking permet aux individus de participer plus facilement à la sécurisation du réseau, favorisant ainsi la décentralisation. Un nœud validateur peut être exécuté sur un ordinateur portable normal. Les pools de staking permettent aux utilisateurs de staker sans avoir 32 ETH. | La preuve d'enjeu est plus récente et moins éprouvée que la preuve de travail                             |
| Le staking est plus décentralisé. Les économies d'échelle ne s'appliquent pas de la même manière que pour le minage PoW.                                                                                                                                                    | La preuve d'enjeu est plus complexe à mettre en œuvre que la preuve de travail                            |
| La preuve d'enjeu offre une plus grande sécurité crypto-économique que la preuve de travail                                                                                                                                                                                 | Les utilisateurs doivent exécuter trois logiciels pour participer à la preuve d'enjeu d'Ethereum.         |
| Une émission moindre de nouveaux ETH est requise pour inciter les participants au réseau                                                                                                                                                                                    |                                                                                                           |

### Comparaison avec la preuve de travail {#comparison-to-proof-of-work}

Ethereum utilisait à l'origine la preuve de travail, mais est passé à la preuve d'enjeu en septembre 2022. La PoS offre plusieurs avantages par rapport à la PoW, tels que :

- une meilleure efficacité énergétique – il n'est pas nécessaire d'utiliser beaucoup d'énergie pour les calculs de preuve de travail
- des barrières à l'entrée plus faibles, des exigences matérielles réduites – il n'y a pas besoin de matériel d'élite pour avoir une chance de créer de nouveaux blocs
- un risque de centralisation réduit – la preuve d'enjeu devrait conduire à un plus grand nombre de nœuds sécurisant le réseau
- en raison de la faible exigence énergétique, une émission moindre d'ETH est requise pour inciter à la participation
- les pénalités économiques en cas de mauvais comportement rendent les attaques de type 51 % plus coûteuses pour un attaquant par rapport à la preuve de travail
- la communauté peut recourir à la récupération sociale d'une chaîne honnête si une attaque des 51 % venait à surmonter les défenses crypto-économiques.

## Complément d'information {#further-reading}

- [FAQ sur la preuve d'enjeu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html) _Vitalik Buterin_
- [Qu'est-ce que la preuve d'enjeu](https://consensys.net/blog/blockchain-explained/what-is-proof-of-stake/) _ConsenSys_
- [Ce qu'est la preuve d'enjeu et pourquoi elle est importante](https://bitcoinmagazine.com/culture/what-proof-of-stake-is-and-why-it-matters-1377531463) _Vitalik Buterin_
- [Pourquoi la preuve d'enjeu (Nov 2020)](https://vitalik.eth.limo/general/2020/11/06/pos2020.html) _Vitalik Buterin_
- [Preuve d'enjeu : Comment j'ai appris à aimer la subjectivité faible](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity) _Vitalik Buterin_
- [Attaque et défense de l'Ethereum en preuve d'enjeu](https://mirror.xyz/jmcook.eth/YqHargbVWVNRQqQpVpzrqEQ8IqwNUJDIpwRP7SS5FXs)
- [Une philosophie de conception de la preuve d'enjeu](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51) _Vitalik Buterin_
- [Vidéo : Vitalik Buterin explique la preuve d'enjeu à Lex Fridman](https://www.youtube.com/watch?v=3yrqBG-7EVE)

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)