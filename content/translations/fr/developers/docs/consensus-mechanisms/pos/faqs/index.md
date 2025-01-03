---
title: Foire aux questions
description: Foire aux questions à propos de la preuve d'enjeu Ethereum.
lang: fr
---

## Qu'est-ce que la preuve d'enjeu ? {#what-is-proof-of-stake}

La preuve d'enjeu est une classe d'algorithme qui assure la sécurité des blockchains en garantissant que les actifs de valeur sont perdus par les attaquants qui agissent de manière malhonnête. Les systèmes de preuve d'enjeu nécessitent qu'un ensemble de validateurs mette à disposition un actif qui peut être détruit si le validateur se livre à un comportement manifestement malhonnête. Ethereum utilise un mécanisme de preuve d'enjeu pour sécuriser sa blockchain.

## Comment la preuve d'enjeu se compare-t-elle à la preuve de travail ? {#comparison-to-proof-of-work}

La preuve de travail et la preuve d'enjeu sont toutes deux des mécanismes qui dissuadent économiquement les acteurs malveillants de ralentir ou de frauder le réseau. Dans les deux cas, les nœuds qui participent activement au consensus mettent un actif « dans le réseau » qu'ils perdront s'ils se comportent mal.

Dans la preuve de travail, cet actif est l'énergie. Le nœud, appelé mineur, exécute un algorithme qui vise à calculer une valeur plus rapidement que tout autre nœud. Le nœud le plus rapide a le droit de proposer un bloc à la chaîne. Pour changer l'historique de la chaîne ou contrôler la proposition de bloc, un mineur devrait avoir une puissance de calcul si importante qu'il remporterait toujours la course. Cela est excessivement coûteux et difficile à exécuter, protégeant ainsi la chaîne contre les attaques. L'énergie requise pour « miner » en utilisant la preuve de travail est un actif réel que les mineurs paient.

La preuve d'enjeu nécessite que les nœuds, appelés validateurs, soumettent explicitement un actif cryptographique à un contrat intelligent. Si un validateur se comporte mal, cette crypto-monnaie peut être détruite car ils « mettent en jeu » leurs actifs directement dans la chaîne au lieu de le faire indirectement via la dépense d'énergie.

La preuve de travail est beaucoup plus gourmande en énergie car de l'électricité est consommée lors du processus de minage. La preuve d'enjeu, en revanche, ne nécessite qu'une très faible quantité d'énergie - les validateurs Ethereum peuvent même fonctionner sur un appareil à faible puissance tel qu'un Raspberry Pi. Le mécanisme de preuve d'enjeu d'Ethereum est considéré comme plus sûr que la preuve de travail car le coût d'une attaque est plus élevé et les conséquences pour un attaquant sont plus graves.

La comparaison entre la preuve de travail et la preuve d'enjeu est un sujet controversé. Le blog de [Vitalik Buterin](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-are-the-benefits-of-proof-of-stake-as-opposed-to-proof-of-work) et le débat entre Justin Drake et Lyn Alden offrent un bon résumé des arguments.

<YouTube id="1m12zgJ42dI" />

## La preuve d'enjeu est-elle éco-énergétique ? {#is-pos-energy-efficient}

Oui. Les nœuds sur un réseau en preuve d'enjeu utilisent une quantité infime d'énergie. Une étude tierce a conclu que l'ensemble du réseau Ethereum basé sur la preuve d'enjeu consomme environ 0,0026 TWh/an - soit environ 13 000 fois moins que les jeux vidéo aux États-Unis uniquement.

[Plus d'infos sur la consommation d'énergie d'Ethereum](/energy-consumption/).

## La preuve d'enjeu est-elle sécurisée ? {#is-pos-secure}

La preuve d'enjeu d'Ethereum est très sécurisée. Le mécanisme a été recherché, développé et testé rigoureusement pendant huit ans avant d'être mis en service. Les garanties de sécurité sont différentes des blockchains basées sur la preuve de travail. Dans la preuve d'enjeu, les validateurs malveillants peuvent être activement sanctionnés (« évincés ») et expulsés de l'ensemble des validateurs, ce qui coûte une somme importante d'ETH. Sous le régime de la preuve de travail, un attaquant peut continuer à répéter son attaque tant qu'il dispose d'une puissance de hachage suffisante. Il est également plus coûteux de lancer des attaques équivalentes sur Ethereum en preuve d'enjeu qu'en preuve de travail. Pour affecter la validation de la chaîne, au moins 33 % de l'ether total misé sur le réseau sont nécessaires (sauf dans les cas d'attaques très sophistiquées avec une probabilité de succès extrêmement faible). Pour contrôler le contenu des blocs futurs, au moins 51 % de l'ETH total misé est nécessaire, et pour réécrire l'histoire, plus de 66 % de la mise totale est nécessaire. Le protocole Ethereum détruirait ces actifs dans les scénarios d'attaque de 33 % ou 51 % et par consensus social dans le scénario d'attaque de 66 %.

- [Plus d'informations sur la défense contre les attaquants d'Ethereum en preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/attack-and-defense)
- [En savoir plus sur la conception de la preuve d'enjeu](https://medium.com/@VitalikButerin/a-proof-of-stake-design-philosophy-506585978d51)

## Est-ce que la preuve d'enjeu rend Ethereum moins cher à utiliser ? {#does-pos-make-ethereum-cheaper}

Non. Le coût d'envoi d'une transaction (frais de gaz) est déterminé par un marché dynamique des frais qui augmente avec la demande sur le réseau. Le mécanisme de consensus n'influence pas directement cela.

[Plus d'information sur le gaz](/developers/docs/gas).

## Que sont les nœuds, les clients et les validateurs ? {#what-are-nodes-clients-and-validators}

Les nœuds sont des ordinateurs connectés au réseau Ethereum. Les clients sont les logiciels qu'ils exécutent et qui transforment l'ordinateur en un nœud. Il existe deux types de clients : les clients d'exécution et les clients de consensus. Les deux sont nécessaires pour créer un nœud. Un validateur est un complément optionnel à un client de consensus qui permet au nœud de participer à un consensus à preuve d'enjeu. Cela signifie créer et proposer des blocs lorsqu'ils sont sélectionnés et attester des blocs dont ils entendent parler sur le réseau. Pour faire fonctionner un validateur, l'opérateur du nœud doit déposer 32 ETH dans le contrat de dépôt.

- [En savoir plus sur les nœuds et les clients](/developers/docs/nodes-and-clients)
- [Plus d'infos sur la mise en jeu](/staking)

## Est-ce que la preuve d'enjeu est une nouvelle idée ? {#is-pos-new}

Non. Un utilisateur sur BitcoinTalk [a proposé l'idée de base de la preuve d'enjeu](https://bitcointalk.org/index.php?topic=27787.0) comme une mise à niveau pour Bitcoin en 2011. Il a fallu onze ans avant qu'il soit prêt à être mis en œuvre sur le réseau principal d'Ethereum. D'autres chaines ont implémenté la preuve d'enjeu avant Ethereum, mais pas le même mécanisme qu'Ethereum (connus sous le nom de Gasper).

## Qu'est-ce qui est particulier concernant la preuve d'enjeu d'Ethereum ? {#why-is-ethereum-pos-special}

Le mécanisme de preuve d'enjeu d'Ethereum est unique dans sa conception. Ce n'était pas le premier mécanisme de preuve d'enjeu à être conçu et mis en œuvre, mais c'est le plus robuste. Le mécanisme de preuve d'enjeu est connu sous le nom de « Casper ». Casper définit comment les validateurs sont sélectionnés pour proposer des blocs, comment et quand les attestations sont faites, comment les attestations sont comptées, les récompenses et les pénalités données aux validateurs, les conditions de penalisation, les mécanismes de sécurité tels que la pénalité d'inactivité, et les conditions pour la « finalité ». La finalité est la condition selon laquelle, pour qu'un bloc soit considéré comme faisant partie permanente de la chaîne canonique, il doit avoir été voté par au moins 66 % de l'ETH total mis en jeu sur le réseau. Les chercheurs ont développé Casper spécifiquement pour Ethereum, et Ethereum est la première et la seule blockchain à l'avoir mis en œuvre.

En plus de Casper, la preuve d'enjeu d'Ethereum utilise un algorithme de choix de fourche appelé LMD-GHOST. Ceci est nécessaire dans le cas où deux blocs existent pour le même créneau. Cela crée deux fourches de la blockchain. LMD-GHOST choisit celui qui a le plus grand « poids » d'attestations. Le poids correspond au nombre d'attestations pondéré par le solde effectif des validateurs. LMD-GHOST est propre à Ethereum.

La combinaison de Casper et LMD_GHOST est connue sous le nom de Gasper.

[En savoir plus sur Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)

## Qu'est-ce que la « sanction » ? {#what-is-slashing}

La « pénalisation » est le terme donné à la destruction d'une partie de la mise d'un validateur et à l'expulsion du validateur du réseau. La quantité d'ETH perdue lors d'une sanction augmente proportionnellement avec le nombre de validateurs sanctionnés - cela signifie que les validateurs regroupés sont punis plus sévèrement que les individus.

[En savoir plus sur les sanctions](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties#slashing)

## Pourquoi les validateurs ont-ils besoin de 32 ETH ? {#why-32-eth}

Les validateurs doivent mettre en jeu des ETH afin d'avoir quelque chose à perdre s'ils se comportent mal. La raison pour laquelle ils doivent mettre en jeu 32 ETH est spécifiquement pour permettre aux nœuds de fonctionner sur du matériel modeste. Si le montant minimum d'ETH par validateur était inférieur, le nombre de validateurs et donc le nombre de messages à traiter dans chaque créneau augmenteraient, ce qui signifie qu'un matériel plus puissant serait nécessaire pour faire fonctionner un nœud.

## Comment les validateurs sont-ils sélectionnés ? {#how-are-validators-selected}

Un seul validateur est choisi de manière pseudo-aléatoire pour proposer un bloc dans chaque créneau à l'aide d'un algorithme appelé RANDAO qui mélange un hash du proposeur de bloc avec une graine qui est mise à jour à chaque bloc. Cette valeur est utilisée pour sélectionner un validateur spécifique parmi l'ensemble total des validateurs. La sélection du validateur est fixée deux périodes à l'avance.

[En savoir plus sur la sélection des validateurs](/developers/docs/consensus-mechanisms/pos/block-proposal)

## Qu'est-ce-que la manipulation ? {#what-is-stake-grinding}

La « manipulation d'enjeu » est une catégorie d'attaque sur les réseaux de preuve d'enjeu où l'attaquant tente de biaiser l'algorithme de sélection des validateurs en faveur de ses propres validateurs. Les attaques de « manipulation » sur RANDAO nécessitent environ la moitié du total d'ETH mis en jeu.

[En savoir plus sur la manipulation de la mise en jeu](https://eth2book.info/altair/part2/building_blocks/randomness/#randao-biasability)

## Qu'est-ce qu'une sanction communautaire ? {#what-is-social-slashing}

Le « sanction communautaire » est la capacité de la communauté à coordonner une fourche de la blockchain en réponse à une attaque. Elle permet à la communauté de se remettre d'une attaque ayant finalisé une chaîne malhonnête. La répression sociale peut également être utilisée contre les attaques de censure.

- [En savoir plus sur la sanction communautaire](https://ercwl.medium.com/the-case-for-social-slashing-59277ff4d9c7)
- [Vitalik Buterin à propos des sanctions communautaires](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-proof-of-stake)

## Vais-je être sanctionné ? {#will-i-get-slashed}

En tant que validateur, il est très difficile d'être sanctionné à moins de vous engager délibérément dans un comportement malveillant. La sanction n'est mise en œuvre que dans des scénarios très spécifiques où les validateurs proposent plusieurs blocs pour le même créneau ou se contredisent avec leurs attestations - ces situations sont très peu susceptibles de survenir accidentellement.

[En savoir plus sur les conditions entrainant une sanction](https://eth2book.info/altair/part2/incentives/slashing)

## Qu'est-ce que le problème dit de l'absence d'enjeu ? {#what-is-nothing-at-stake-problem}

Le problème de l'absence d'enjeu est un problème conceptuel avec certains mécanismes de preuve d'enjeu où il n'y a que des récompenses et aucune pénalité. Si rien n'est en jeu, un validateur pragmatique est tout aussi heureux d'attester de n'importe quelle fourche, voire de plusieurs fourches, de la blockchain, car cela augmente ses récompenses. Ethereum contourne ce problème en utilisant des conditions de finalité et des sanctions pour garantir une chaîne canonique unique.

[En savoir plus le problème dit de l'absence d'enjeu](https://vitalik.eth.limo/general/2017/12/31/pos_faq.html#what-is-the-nothing-at-stake-problem-and-how-can-it-be-fixed)

## Qu'est-ce que l'algorithme de choix de fourche ? {#what-is-a-fork-choice-algorithm}

Un algorithme de choix de fourche met en œuvre des règles déterminant quelle chaîne est la chaîne canonique. Dans des conditions optimales, il n'est pas nécessaire d'avoir une règle de choix de fourche car il n'y a qu'un seul proposeur de bloc par créneau et donc un seul bloc à choisir. De temps en temps, cependant, plusieurs blocs pour le même créneau ou des informations arrivant en retard conduisent à plusieurs options pour l'organisation des blocs près de la tête de la chaîne. Dans ces cas-là, tous les clients doivent mettre en œuvre certaines règles de manière identique pour s'assurer qu'ils choisissent tous la séquence correcte de blocs. L'algorithme de choix de fourche encode ces règles.

L'algorithme de choix de fourche d'Ethereum s'appelle LMD-GHOST. Il choisit la fourche ayant le plus grand poids d'attestations, c'est-à-dire celle pour laquelle la majorité de l'ETH mis en jeu a voté.

[En savoir plus sur LMD-GHOST](/developers/docs/consensus-mechanisms/pos/gasper/#fork-choice)

## Qu'est-ce que la finalité dans la preuve d'enjeu ? {#what-is-finality}

La finalité dans la preuve d'enjeu est la garantie qu'un bloc donné fait partie de manière permanente de la chaîne canonique et ne peut donc pas être révoqué à moins qu'il n'y ait une défaillance du consensus dans laquelle un attaquant brûle 33 % de l'ether total mis en jeu. Il s'agit de la « finalité crypto-économique », par opposition à la « finalité probabiliste » qui est pertinente pour les blockchains basées sur la preuve de travail. Dans la finalité probabiliste, il n'y a pas d'états explicitement finalisés/non finalisés pour les blocs - il devient simplement de moins en moins probable qu'un bloc puisse être retiré de la chaîne à mesure qu'il vieillit, et les utilisateurs déterminent eux-mêmes quand ils sont suffisamment confiants qu'un bloc est « sûr ». Avec la finalité crypto-économique, des paires de blocs de contrôle doivent être votées par 66 % de l'ether mis en jeu. Si cette condition est satisfaite, les blocs entre ces points de contrôle sont explicitement « finalisés ».

[En savoir plus sur la finalité](/developers/docs/consensus-mechanisms/pos/#finality)

## Qu'est-ce que la « weak subjectivity » ? {#what-is-weak-subjectivity}

La subjectivité faible ou weak subjectivity est une caractéristique des réseaux de preuve d'enjeu où l'information sociale est utilisée pour confirmer l'état actuel de la blockchain. Les nouveaux nœuds ou les nœuds rejoignant le réseau après avoir été hors ligne pendant une longue période peuvent recevoir un état récent afin que le nœud puisse voir immédiatement s'ils sont sur la bonne chaîne. Ces états sont connus sous le nom de « points de contrôle de la faible subjectivité » et peuvent être obtenus auprès d'autres opérateurs de nœuds éloignés, ou auprès d'explorateurs de blocs, ou de plusieurs points de terminaison publics.

[En savoir plus sur la « faible subjectivité »](/developers/docs/consensus-mechanisms/pos/weak-subjectivity)

## Est-ce que la preuve d'enjeu peut résister à la censure ? {#is-pos-censorship-resistant}

La résistance à la censure est actuellement difficile à prouver. Cependant, contrairement à la preuve de travail, la preuve d'enjeu offre la possibilité de coordonner les sanctions pour punir les validateurs pratiquant la censure. Il y a des changements à venir dans le protocole qui séparent les constructeurs de blocs des proposeurs de blocs et mettent en œuvre des listes de transactions que les constructeurs doivent inclure dans chaque bloc. Cette proposition est connue sous le nom de séparation des constructeurs et des proposeurs appropriés et aide à empêcher les validateurs de censurer les transactions.

[En savoir plus sur la séparation des rôles de constructeur et de proposeur](https://notes.ethereum.org/@fradamt/H1TsYRfJc#Original-basic-scheme)

## Est-ce qu'Ethereum en système de preuve d'enjeu peut subir une attaque 51% ? {#pos-51-attack}

Oui. La preuve d'enjeu est vulnérable aux attaques à 51%, tout comme la preuve de travail. Au lieu que l'attaquant nécessite 51% de la puissance de hachage du réseau, l'attaquant nécessite 51 % de l'ETH total mis en jeu. Un attaquant qui accumule 51 % de la mise totale contrôle l'algorithme de choix de la fourche. Cela permet à l'attaquant de censurer certaines transactions, d'effectuer des réorganisations à courte portée et d'extraire de la MEV en réordonnant les blocs à son avantage.

[En savoir plus sur les attaques contre la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/attack-and-defense)

## Qu'est-ce que la coordination communautaire, et pourquoi nous en avons besoin ? {#what-is-social-coordination}

La coordination sociale est la dernière ligne de défense pour Ethereum qui permettrait de récupérer une chaîne honnête à la suite d'une attaque ayant finalisé des blocs malhonnêtes. Dans ce cas, la communauté Ethereum devrait se coordonner « hors chaine » et s'accorder pour utiliser une fourche minoritaire honnête, tout en sanctionnant les validateurs de l'attaquant dans le processus. Cela nécessiterait également que les applications et les plateformes d'échange reconnaissent la fourche honnête.

[En savoir plus sur la coordination communautaire](/developers/docs/consensus-mechanisms/pos/attack-and-defense#people-the-last-line-of-defense)

## Est-ce que les riches deviennent plus riches grâce à la preuve d'enjeu ? {#do-rich-get-richer}

Plus une personne doit miser d’ETH, plus elle peut exécuter de validateurs et plus elle peut accumuler de récompenses. Les récompenses augmentent linéairement par rapport à la quantité d'ETH mis en jeu, et tout le monde obtient le même pourcentage de retour. La preuve de travail enrichit davantage les riches que la preuve d'enjeu car les mineurs les plus riches qui achètent du matériel en grande quantité bénéficient des économies d'échelle, ce qui signifie que la relation entre la richesse et les gains n'est pas linéaire.

## Est-ce que la preuve d'enjeu est plus centralisée que la preuve de travail ? {#is-pos-decentralized}

Non, la preuve de travail tend vers la centralisation car les coûts d'exploitation minière augmentent et évincent les individus, puis évincent les petites entreprises, et ainsi de suite. Le problème actuel avec la preuve d'enjeu est l'influence des produits dérivés de mise en jeu (DSL). Ce sont des jetons représentant de l'ETH mis en jeu par un fournisseur que n'importe qui peut échanger sur les marchés secondaires sans que l'ETH réel ne soit retiré de la mise. Les LSD permettent aux utilisateurs de mettre en jeu moins de 32 ETH, mais ils créent également un risque de centralisation où quelques grandes organisations peuvent finir par contrôler une grande partie de la mise. C'est pourquoi [mettre en jeu ses propres Eth](/staking/solo) est le mieux pour le réseau.

[En savoir plus sur la centralisation des LSD](https://notes.ethereum.org/@djrtwo/risks-of-lsd)

## Pourquoi je ne peux mettre en jeu que des ETH ? {#why-can-i-only-stake-eth}

L'ETH est la monnaie native d'Ethereum. Il est essentiel de disposer d'une monnaie unique libellant l'ensemble des enjeux, à la fois pour des raisons d'efficacité comptable, de pondération des votes et de sécurité. L'ETH lui-même est un composant fondamental d'Ethereum plutôt qu'un contrat intelligent. L'intégration d'autres devises augmenterait considérablement la complexité et diminuerait la sécurité du staking.

## Est-ce qu'Ethereum est la seule blockchain en preuve d'enjeu ? {#is-ethereum-the-only-pos-blockchain}

Non, il existe plusieurs blockchains basées sur la preuve d'enjeu. Aucun n'est identique à Ethereum ; le mécanisme de preuve d'enjeu d'Ethereum est unique.

## Qu'est-ce que La Fusion ? {#what-is-the-merge}

La fusion a été le moment où Ethereum a désactivé son mécanisme de consensus basé sur la preuve de travail et a activé son mécanisme de consensus basé sur la preuve d'enjeu. La Fusion a eu lieu le 15 septembre 2022.

[Plus d'infos sur la fusion](/roadmap/merge)

## Qu'est-ce que la disponibilité et la sécurité ? {#what-are-liveness-and-safety}

La disponibilité et la sécurité sont les deux préoccupations fondamentales en matière de sécurité pour une blockchain. La disponibilité est l'accessibilité à une chaîne finalisée. Si la chaîne cesse de se finaliser ou si les utilisateurs ne peuvent pas y accéder facilement, ce sont des échecs de disponibilité. Un coût d'accès extrêmement élevé pourrait également être considéré comme un échec de disponibilité. La sécurité fait référence à la difficulté d'attaquer la chaîne - c'est-à-dire de finaliser des points de contrôle conflictuels.

[En savoir plus sur Casper](https://arxiv.org/pdf/1710.09437.pdf)
