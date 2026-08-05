---
title: Foire aux questions
description: Foire aux questions sur la preuve d'enjeu (PoS) d'Ethereum.
lang: fr
---

## Qu'est-ce que la preuve d'enjeu (PoS) ? {#what-is-proof-of-stake}

La preuve d'enjeu (PoS) est une classe d'algorithmes qui peut assurer la sécurité des chaînes de blocs en garantissant que les actifs de valeur sont perdus par les attaquants qui agissent de manière malhonnête. Les systèmes de preuve d'enjeu nécessitent qu'un ensemble de validateurs mette à disposition un actif qui peut être détruit si le validateur s'engage dans un comportement manifestement malhonnête. Ethereum utilise un mécanisme de consensus par preuve d'enjeu pour sécuriser la chaîne de blocs.

## Comment la preuve d'enjeu se compare-t-elle à la preuve de travail (PoW) ? {#comparison-to-proof-of-work}

La preuve de travail (PoW) et la preuve d'enjeu sont toutes deux des mécanismes qui dissuadent économiquement les acteurs malveillants de spammer ou de frauder le réseau. Dans les deux cas, les nœuds qui participent activement au consensus mettent un actif « dans le réseau » qu'ils perdront s'ils se comportent mal.

Dans la preuve de travail, cet actif est l'énergie. Le nœud, connu sous le nom de mineur, exécute un algorithme qui vise à calculer une valeur plus rapidement que n'importe quel autre nœud. Le nœud le plus rapide a le droit de proposer un bloc à la chaîne. Pour modifier l'historique de la chaîne ou dominer la proposition de bloc, un mineur devrait disposer d'une puissance de calcul telle qu'il gagnerait toujours la course. Ceci est d'un coût prohibitif et difficile à exécuter, ce qui protège la chaîne des attaques. L'énergie requise pour le « minage » en utilisant la preuve de travail est un actif du monde réel que les mineurs paient.

La preuve d'enjeu exige que les nœuds, appelés validateurs, soumettent explicitement un actif crypto à un contrat intelligent. Si un validateur se comporte mal, cette crypto peut être détruite car il « stake » ses actifs directement dans la chaîne au lieu de le faire indirectement via une dépense d'énergie.

La preuve de travail est beaucoup plus gourmande en énergie car l'électricité est brûlée dans le processus de minage. La preuve d'enjeu, en revanche, ne nécessite qu'une très petite quantité d'énergie - les validateurs Ethereum peuvent même fonctionner sur un appareil à faible puissance tel qu'un Raspberry Pi. Le mécanisme de preuve d'enjeu d'Ethereum est considéré comme plus sécurisé que la preuve de travail car le coût d'une attaque est plus élevé et les conséquences pour un attaquant sont plus graves.

Le débat entre la preuve de travail et la preuve d'enjeu est un sujet controversé. Le [blog de Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) et le débat entre Justin Drake et Lyn Alden donnent un bon résumé des arguments.

<VideoWatch slug="pow-vs-pos" />

## La preuve d'enjeu est-elle économe en énergie ? {#is-pos-energy-efficient}

Oui. Les nœuds sur un réseau à preuve d'enjeu utilisent une infime quantité d'énergie. Une étude tierce a conclu que l'ensemble du réseau Ethereum à preuve d'enjeu consomme environ 0,0026 TWh/an, soit environ 13 000 fois moins que les jeux vidéo aux États-Unis seulement.

[En savoir plus sur la consommation d'énergie d'Ethereum](/energy-consumption/).

## La preuve d'enjeu est-elle sécurisée ? {#is-pos-secure}

La preuve d'enjeu d'Ethereum est très sécurisée. Le mécanisme a été recherché, développé et testé rigoureusement pendant huit ans avant d'être mis en ligne. Les garanties de sécurité sont différentes de celles des chaînes de blocs à preuve de travail. Dans la preuve d'enjeu, les validateurs malveillants peuvent être activement punis (« sanctionnés » par une réduction) et éjectés de l'ensemble des validateurs, ce qui leur coûte une quantité substantielle d'ETH. Sous la preuve de travail, un attaquant peut continuer à répéter son attaque tant qu'il dispose d'une puissance de hachage suffisante. Il est également plus coûteux de monter des attaques équivalentes sur l'Ethereum à preuve d'enjeu que sous la preuve de travail. Pour affecter la vivacité de la chaîne, au moins 33 % du total des ethers mis en jeu sur le réseau sont nécessaires (sauf dans les cas d'attaques très sophistiquées avec une probabilité de succès extrêmement faible). Pour contrôler le contenu des futurs blocs, au moins 51 % du total des ETH mis en jeu sont nécessaires, et pour réécrire l'historique, plus de 66 % de la mise totale sont nécessaires. Le protocole Ethereum détruirait ces actifs dans les scénarios d'attaque à 33 % ou 51 % et par consensus social dans le scénario d'attaque à 66 %.

- [En savoir plus sur la défense de la preuve d'enjeu d'Ethereum contre les attaquants](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [En savoir plus sur la conception de la preuve d'enjeu](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## La preuve d'enjeu rend-elle Ethereum moins cher ? {#does-pos-make-ethereum-cheaper}

Non. Le coût d'envoi d'une transaction (frais de gaz) est déterminé par un marché de frais dynamique qui augmente avec la demande du réseau. Le mécanisme de consensus n'influence pas directement cela.

[En savoir plus sur le gaz](/developers/docs/gas).

## Que sont les nœuds, les clients et les validateurs ? {#what-are-nodes-clients-and-validators}

Les nœuds sont des ordinateurs connectés au réseau Ethereum. Les clients sont les logiciels qu'ils exécutent et qui transforment l'ordinateur en nœud. Il existe deux types de clients : les clients d'exécution et les clients de consensus. Les deux sont nécessaires pour créer un nœud. Un validateur est un module complémentaire optionnel à un client de consensus qui permet au nœud de participer au consensus par preuve d'enjeu. Cela signifie créer et proposer des blocs lorsqu'il est sélectionné et attester des blocs dont il entend parler sur le réseau. Pour exécuter un validateur, l'opérateur du nœud doit déposer 32 ETH dans le contrat de dépôt.

- [En savoir plus sur les nœuds et les clients](/developers/docs/nodes-and-clients)
- [En savoir plus sur le staking](/staking)

## La preuve d'enjeu est-elle une idée nouvelle ? {#is-pos-new}

Non. Un utilisateur sur BitcoinTalk [a proposé l'idée de base de la preuve d'enjeu](https://bitcointalk.org/index.php?topic=27787.0) comme mise à niveau de Bitcoin en 2011. Il a fallu onze ans avant qu'elle ne soit prête à être mise en œuvre sur le réseau principal Ethereum. Certaines autres chaînes ont mis en œuvre la preuve d'enjeu plus tôt qu'Ethereum, mais pas le mécanisme spécifique d'Ethereum (connu sous le nom de Gasper).

## Qu'y a-t-il de spécial dans la preuve d'enjeu d'Ethereum ? {#why-is-ethereum-pos-special}

Le mécanisme de preuve d'enjeu d'Ethereum est unique dans sa conception. Ce n'était pas le premier mécanisme de preuve d'enjeu à être conçu et mis en œuvre, mais c'est le plus robuste. Le mécanisme de preuve d'enjeu est connu sous le nom de « Casper ». Casper définit comment les validateurs sont sélectionnés pour proposer des blocs, comment et quand les attestations sont faites, comment les attestations sont comptées, les récompenses et les pénalités accordées aux validateurs, les conditions de réduction, les mécanismes de sécurité tels que la fuite d'inactivité, et les conditions de « finalité ». La finalité est la condition selon laquelle, pour qu'un bloc soit considéré comme une partie permanente de la chaîne canonique, il doit avoir été voté par au moins 66 % du total des ETH mis en jeu sur le réseau. Les chercheurs ont développé Casper spécifiquement pour Ethereum, et Ethereum est la première et la seule chaîne de blocs à l'avoir mis en œuvre.

En plus de Casper, la preuve d'enjeu d'Ethereum utilise un algorithme de choix de fourche appelé LMD-GHOST. Ceci est nécessaire au cas où une condition se présenterait où deux blocs existent pour le même créneau. Cela crée deux forks de la chaîne de blocs. LMD-GHOST choisit celui qui a le plus grand « poids » d'attestations. Le poids est le nombre d'attestations pondéré par le solde effectif des validateurs. LMD-GHOST est unique à Ethereum.

La combinaison de Casper et LMD-GHOST est connue sous le nom de Gasper.

[En savoir plus sur Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Qu'est-ce que la réduction ? {#what-is-slashing}

La réduction est le terme donné à la destruction d'une partie de la mise d'un validateur et à l'éjection du validateur du réseau. La quantité d'ETH perdue lors d'une réduction est proportionnelle au nombre de validateurs sanctionnés - cela signifie que les validateurs de connivence sont punis plus sévèrement que les individus.

[En savoir plus sur la réduction](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Pourquoi les validateurs ont-ils besoin de 32 ETH ? {#why-32-eth}

Les validateurs doivent staker des ETH afin d'avoir quelque chose à perdre s'ils se comportent mal. La raison pour laquelle ils doivent staker 32 ETH spécifiquement est de permettre aux nœuds de fonctionner sur du matériel modeste. Si le minimum d'ETH par validateur était inférieur, le nombre de validateurs et donc le nombre de messages devant être traités dans chaque créneau augmenteraient, ce qui signifierait qu'un matériel plus puissant serait nécessaire pour exécuter un nœud.

## Comment les validateurs sont-ils sélectionnés ? {#how-are-validators-selected}

Un seul validateur est choisi de manière pseudo-aléatoire pour proposer un bloc dans chaque créneau à l'aide d'un algorithme appelé RANDAO qui mélange un hash du proposeur de bloc avec une graine qui est mise à jour à chaque bloc. Cette valeur est utilisée pour sélectionner un validateur spécifique parmi l'ensemble total des validateurs. La sélection des validateurs est fixée deux époques à l'avance.

[En savoir plus sur la sélection des validateurs](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Qu'est-ce que le broyage d'enjeu ? {#what-is-stake-grinding}

Le broyage d'enjeu est une catégorie d'attaque sur les réseaux à preuve d'enjeu où l'attaquant tente de biaiser l'algorithme de sélection des validateurs en faveur de ses propres validateurs. Les attaques de broyage d'enjeu sur RANDAO nécessitent environ la moitié du total des ETH mis en jeu.

[En savoir plus sur le broyage d'enjeu](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Qu'est-ce que la pénalité sociale ? {#what-is-social-slashing}

La pénalité sociale est la capacité de la communauté à coordonner un fork de la chaîne de blocs en réponse à une attaque. Elle permet à la communauté de se remettre d'un attaquant finalisant une chaîne malhonnête. La pénalité sociale peut également être utilisée contre les attaques de censure.

- [En savoir plus sur la pénalité sociale](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin sur la pénalité sociale](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Vais-je subir une réduction ? {#will-i-get-slashed}

En tant que validateur, il est très difficile de subir une réduction à moins de s'engager délibérément dans un comportement malveillant. La réduction n'est mise en œuvre que dans des scénarios très spécifiques où les validateurs proposent plusieurs blocs pour le même créneau ou se contredisent avec leurs attestations - il est très peu probable que cela se produise accidentellement.

[En savoir plus sur les conditions de réduction](https://eth2book.info/altair/part2/incentives/slashing)

## Qu'est-ce que le problème du rien en jeu ? {#what-is-nothing-at-stake-problem}

Le problème du rien en jeu est un problème conceptuel avec certains mécanismes de preuve d'enjeu où il n'y a que des récompenses et aucune pénalité. S'il n'y a rien en jeu, un validateur pragmatique est tout aussi heureux d'attester de n'importe quel fork, ou même de plusieurs forks de la chaîne de blocs, car cela augmente ses récompenses. Ethereum contourne ce problème en utilisant des conditions de finalité et la réduction pour garantir une seule chaîne canonique.

[En savoir plus sur le problème du rien en jeu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Qu'est-ce qu'un algorithme de choix de fourche ? {#what-is-a-fork-choice-algorithm}

Un algorithme de choix de fourche met en œuvre des règles déterminant quelle chaîne est la chaîne canonique. Dans des conditions optimales, il n'y a pas besoin de règle de choix de fourche car il n'y a qu'un seul proposeur de bloc par créneau et un seul bloc parmi lequel choisir. Cependant, il arrive parfois que plusieurs blocs pour le même créneau ou des informations arrivant tardivement conduisent à plusieurs options quant à la façon dont les blocs près de la tête de la chaîne sont organisés. Dans ces cas, tous les clients doivent mettre en œuvre certaines règles de manière identique pour s'assurer qu'ils choisissent tous la bonne séquence de blocs. L'algorithme de choix de fourche encode ces règles.

L'algorithme de choix de fourche d'Ethereum s'appelle LMD-GHOST. Il choisit le fork avec le plus grand poids d'attestations, c'est-à-dire celui pour lequel la majorité des ETH mis en jeu a voté.

[En savoir plus sur LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Qu'est-ce que la finalité dans la preuve d'enjeu ? {#what-is-finality}

La finalité dans la preuve d'enjeu est la garantie qu'un bloc donné est une partie permanente de la chaîne canonique et ne peut pas être annulé à moins qu'il n'y ait un échec de consensus dans lequel un attaquant brûle 33 % du total des ethers mis en jeu. Il s'agit d'une finalité « crypto-économique », par opposition à la « finalité probabiliste » qui s'applique aux chaînes de blocs à preuve de travail. Dans la finalité probabiliste, il n'y a pas d'états finalisés/non finalisés explicites pour les blocs - il devient simplement de moins en moins probable qu'un bloc puisse être retiré de la chaîne à mesure qu'il vieillit, et les utilisateurs déterminent par eux-mêmes quand ils sont suffisamment confiants qu'un bloc est « sûr ». Avec la finalité crypto-économique, des paires de blocs de point de contrôle doivent être votées par 66 % des ethers mis en jeu. Si cette condition est remplie, les blocs entre ces points de contrôle sont explicitement « finalisés ».

[En savoir plus sur la finalité](/developers/docs/consensus-mechanisms/pos/#finality)

## Qu'est-ce que la « subjectivité faible » ? {#what-is-weak-subjectivity}

La subjectivité faible est une caractéristique des réseaux à preuve d'enjeu où les informations sociales sont utilisées pour confirmer l'état actuel de la chaîne de blocs. Les nouveaux nœuds ou les nœuds rejoignant le réseau après avoir été hors ligne pendant une longue période peuvent recevoir un état récent afin que le nœud puisse voir immédiatement s'il se trouve sur la bonne chaîne. Ces états sont connus sous le nom de « points de contrôle de subjectivité faible » et ils peuvent être obtenus auprès d'autres opérateurs de nœuds hors bande, ou à partir d'explorateurs de blocs, ou à partir de plusieurs points de terminaison publics.

[En savoir plus sur la subjectivité faible](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## La preuve d'enjeu est-elle résistante à la censure ? {#is-pos-censorship-resistant}

La résistance à la censure est actuellement difficile à prouver. Cependant, contrairement à la preuve de travail, la preuve d'enjeu offre la possibilité de coordonner des réductions pour punir les validateurs qui censurent. Des modifications à venir du protocole séparent les constructeurs de blocs des proposeurs de blocs et mettent en œuvre des listes de transactions que les constructeurs doivent inclure dans chaque bloc. Cette proposition est connue sous le nom de séparation proposant-constructeur (PBS) et aide à empêcher les validateurs de censurer les transactions.

[En savoir plus sur la séparation proposant-constructeur (PBS)](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Le système de preuve d'enjeu d'Ethereum peut-il subir une attaque des 51 % ? {#pos-51-attack}

Oui. La preuve d'enjeu est vulnérable aux attaques des 51 %, tout comme la preuve de travail. Au lieu que l'attaquant ait besoin de 51 % de la puissance de hachage du réseau, l'attaquant a besoin de 51 % du total des ETH mis en jeu. Un attaquant qui accumule 51 % de la mise totale parvient à contrôler l'algorithme de choix de fourche. Cela permet à l'attaquant de censurer certaines transactions, d'effectuer des réorganisations à courte portée et d'extraire de la MEV en réorganisant les blocs en sa faveur.

[En savoir plus sur les attaques sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Qu'est-ce que la coordination sociale et pourquoi est-elle nécessaire ? {#what-is-social-coordination}

La coordination sociale est une dernière ligne de défense pour Ethereum qui permettrait de récupérer une chaîne honnête après une attaque ayant finalisé des blocs malhonnêtes. Dans ce cas, la communauté Ethereum devrait se coordonner « hors bande » et accepter d'utiliser un fork minoritaire honnête, en sanctionnant les validateurs de l'attaquant par une réduction au passage. Cela nécessiterait que les applications et les plateformes d'échange reconnaissent également le fork honnête.

[En savoir plus sur la coordination sociale](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Les riches s'enrichissent-ils avec la preuve d'enjeu ? {#do-rich-get-richer}

Plus quelqu'un a d'ETH à staker, plus il peut exécuter de validateurs et plus il peut accumuler de récompenses. Les récompenses augmentent de manière linéaire avec la quantité d'ETH mis en jeu, et tout le monde obtient le même pourcentage de rendement. La preuve de travail enrichit davantage les riches que la preuve d'enjeu, car les mineurs plus riches qui achètent du matériel à grande échelle bénéficient d'économies d'échelle, ce qui signifie que la relation entre la richesse et la récompense est non linéaire.

## La preuve d'enjeu est-elle plus centralisée que la preuve de travail ? {#is-pos-decentralized}

Non, la preuve de travail tend vers la centralisation car les coûts de minage augmentent et excluent les individus, puis les petites entreprises, et ainsi de suite. Le problème actuel avec la preuve d'enjeu est l'influence des dérivés de staking liquide (LSD). Ce sont des jetons représentant des ETH mis en jeu par un fournisseur que n'importe qui peut échanger sur les marchés secondaires sans que les ETH réels ne soient retirés du staking. Les LSD permettent aux utilisateurs de staker avec moins de 32 ETH, mais ils créent également un risque de centralisation où quelques grandes organisations peuvent finir par contrôler une grande partie de la mise. C'est pourquoi le [staking en solo](/staking/solo) est la meilleure option pour Ethereum.

[En savoir plus sur la centralisation des mises dans les LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pourquoi puis-je uniquement staker des ETH ? {#why-can-i-only-stake-eth}

L'ETH est la monnaie native d'Ethereum. Il est essentiel d'avoir une monnaie unique dans laquelle toutes les mises sont libellées, à la fois pour comptabiliser les soldes effectifs afin de pondérer les votes et pour la sécurité. L'ETH lui-même est un composant fondamental d'Ethereum plutôt qu'un contrat intelligent. L'intégration d'autres monnaies augmenterait considérablement la complexité et diminuerait la sécurité du staking.

## Ethereum est-elle la seule chaîne de blocs à preuve d'enjeu ? {#is-ethereum-the-only-pos-blockchain}

Non, il existe plusieurs chaînes de blocs à preuve d'enjeu. Aucune n'est identique à Ethereum ; le mécanisme de preuve d'enjeu d'Ethereum est unique.

## Qu'est-ce que La Fusion ? {#what-is-the-merge}

La Fusion a été le moment où Ethereum a désactivé son mécanisme de consensus basé sur la preuve de travail et a activé son mécanisme de consensus basé sur la preuve d'enjeu. La Fusion a eu lieu le 15 septembre 2022.

[En savoir plus sur La Fusion](/roadmap/merge)

## Que sont la vivacité et la sécurité ? {#what-are-liveness-and-safety}

La vivacité et la sécurité sont les deux préoccupations fondamentales en matière de sécurité pour une chaîne de blocs. La vivacité est la disponibilité d'une chaîne qui se finalise. Si la chaîne cesse de se finaliser ou si les utilisateurs ne peuvent pas y accéder facilement, il s'agit de défaillances de vivacité. Un coût d'accès extrêmement élevé pourrait également être considéré comme une défaillance de vivacité. La sécurité fait référence à la difficulté d'attaquer la chaîne, c'est-à-dire de finaliser des points de contrôle conflictuels.

[En savoir plus dans le document sur Casper](https://arxiv.org/pdf/1710.09437.pdf)