---
title: Mécanismes de consensus
description: Explication des protocoles de consensus dans les systèmes distribués et du rôle qu'ils jouent dans Ethereum.
lang: fr
---

Le terme « mécanisme de consensus » est souvent utilisé familièrement pour désigner les protocoles de preuve d'enjeu, de preuve de travail ou de preuve d'autorité. Néanmoins, ceux-ci ne sont que des composantes du mécanisme de consensus qui protègent de façon préventive contre les [attaques de type 'Sybil](/glossary/#sybil-attack). Les mécanismes de consensus désignent la pile complète des idées, protocoles et incitations qui permettent à un ensemble de nœuds distribués de se mettre d'accord sur l'état d'une blockchain.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce que le consensus ? {#what-is-consensus}

Par consensus, nous voulons dire qu'un accord général a été trouvé. Prenons le cas d'un groupe de personnes qui vont au cinéma. S'il n'existe pas de désaccord sur le choix du film, alors un consensus se dégage. En cas de désaccord, le groupe doit avoir les moyens de décider du film à voir. Dans un cas extrême, le groupe finira par se séparer.

En ce qui concerne la blockchain Ethereum, parvenir à un consensus signifie qu'au moins 66 % des nœuds du réseau sont d'accord sur l'état global du réseau.

## Qu'est-ce qu'un mécanisme de consensus ? {#what-is-a-consensus-mechanism}

Le terme de mécanisme de consensus se réfère à toute la pile des protocoles, des incitations et des idées qui permettent à un réseau de nœuds de se mettre d'accord sur l'état d'une blockchain.

Ethereum utilise un mécanisme de consensus basé sur la preuve d'enjeu qui tire sa sécurité crypto-économique d'un ensemble de récompenses et de pénalités appliquées au capital verrouillé par les validateurs. Cette structure incitative encourage les validateurs individuels à opérer avec des validateurs honnêtes, et à punir ceux qui ne le sont pas en générant un coût extrêmement élevé pour attaquer le réseau.

Vient ensuite un protocole qui régit la façon dont les validateurs honnêtes sont sélectionnés pour proposer ou valider des blocs, traiter les transactions et voter pour leur vision de la tête de la chaîne. Dans les situations rares où plusieurs blocs se trouvent dans la même position proches de la tête de la chaîne, un mécanisme de choix de fourche permet de sélectionner les blocs qui composent la chaîne « la plus lourde », mesurée par le nombre de validateurs qui ont voté pour les blocs, pondérés par leur solde d'Ether misé.

Certains concepts sont importants pour des consensus qui ne sont pas explicitement définis dans le code, comme la sécurité supplémentaire offerte par la coordination sociale potentielle hors bande comme dernière ligne de défense contre les attaques sur le réseau.

Ces composantes forment ensemble le mécanisme de consensus.

## Types de mécanismes de consensus {#types-of-consensus-mechanisms}

### Basé sur la preuve de travail {#proof-of-work}

Tout comme Bitcoin, Ethereum a utilisé un protocole de consensus basé sur la **preuve de travail (PoW)**.

#### Création de blocs {#pow-block-creation}

Les mineurs sont en concurrence pour créer de nouveaux blocs remplis de transactions traitées. Le gagnant partage le nouveau bloc avec le reste du réseau et gagne de l'ETH récemment frappé. La course est gagnée par la machine qui est en mesure de résoudre un puzzle mathématique le plus rapidement. Cela produit le lien cryptographique entre le bloc actuel et le bloc qui s'est déroulé avant. Résoudre ce puzzle est le travail dans la « preuve de travail ». La chaîne canonique est alors déterminée par une règle de choix de fourche qui sélectionne l'ensemble des blocs qui ont eu le plus de travail pour les miner.

#### Sécurité {#pow-security}

La sécurité du réseau est assurée par le fait qu'il vous faudrait 51 % de la puissance de calcul du réseau pour frauder la chaîne. Cela nécessitant d'énormes investissements en équipement et en énergie, vous risqueriez de dépenser plus que ce que vous pourriez gagner.

En savoir plus sur la [preuve de travail](/developers/docs/consensus-mechanisms/pow/)

### Basé sur la preuve d'enjeu {#proof-of-stake}

Ethereum utilise désormais un protocole de consensus basé sur la **preuve d'enjeu (PoS)**.

#### Création de blocs {#pos-block-creation}

Les validateurs créent des blocs. Un validateur est sélectionné aléatoirement dans chaque créneau pour être le proposeur de bloc. Leur client de consensus demande alors un paquet de transactions sous forme de « charge utile d'exécution » à leur client d'exécution jumelé. Ils l'enveloppent dans des données de consensus pour former un bloc, qu'ils envoient aux autres nœuds du réseau Ethereum. Cette production de blocs est récompensée en ETH. Dans de rares cas, lorsque plusieurs blocs possibles existent pour un seul créneau, ou que les nœuds entendent parler de blocs à différents moments, l'algorithme de choix de fourche choisit le bloc qui forme la chaîne avec le plus grand poids d'attestations (où le poids est le nombre de validateurs attestant de l'échelle de leur solde ETH).

#### Sécurité {#pos-security}

Un système de preuve d'enjeu est sécurisé économiquement dans la mesure où un attaquant qui tente de prendre le contrôle de la chaîne doit détruire une quantité massive d'ETH. Un système de récompenses encourage les validateurs individuels à se comporter honnêtement et les pénalités dissuadent les validateurs d’agir de manière malveillante.

En savoir plus sur la [preuve de travail](/developers/docs/consensus-mechanisms/pos/)

### Un guide visuel {#types-of-consensus-video}

En savoir plus sur les différents types de mécanismes de consensus utilisés sur Ethereum :

<YouTube id="ojxfbN78WFQ" />

### Résistance à l'attaque Sybil et sélection en chaîne {#sybil-chain}

La preuve de travail et la preuve d’enjeu ne sont pas des protocoles de consensus, mais on les appelle souvent ainsi par souci de simplicité. Ce sont en fait des mécanismes de résistance à l'attaque Sybil et des sélecteurs d'auteurs de bloc ; ils permettent de décider qui est l'auteur du dernier bloc. Un autre composant important est l'algorithme de sélection de chaînes (alias choix de fourche) qui permet aux nœuds de choisir un unique bloc correct en tête de chaîne dans des scénarios où plusieurs blocs se trouveraient dans la même position.

La **Résistance à l'attaque Sybil** mesure l'efficacité d'un protocole face à une attaque Sybil. La résistance à ce type d'attaque est essentielle pour une blockchain décentralisée et permet aux mineurs et validateurs d'être récompensés de manière égale en fonction des ressources mises à disposition. La preuve de travail et la preuve de mise en jeu protègent de ce risque en obligeant les utilisateurs à dépenser beaucoup d'énergie ou à mettre beaucoup de collatérales. Ces protections sont un moyen de dissuasion économique contre les attaques Sybil.

**Une règle de sélection de la chaîne** est utilisée pour décider quelle chaîne est la chaîne « correcte ». Bitcoin utilise actuellement la règle de la « plus longue chaîne », ce qui signifie que quelle que soit la chaîne de blocs la plus longue, elle sera celle que les autres nœuds acceptent comme valide et avec laquelle ils travailleront. Pour les chaînes de preuve de travail, la chaîne la plus longue est déterminée par la difficulté cumulative totale de preuve de travail. Ethereum avait également l'habitude d'utiliser la règle de la chaîne la plus longue ; cependant, maintenant qu'Ethereum fonctionne avec la preuve d'enjeu, il a adopté un algorithme de choix de fourche mis à jour qui mesure le « poids » de la chaîne. Le poids est la somme cumulée des votes de validateur, pondérée par les soldes en Ether misés par les validateurs.

Ethereum utilise un mécanisme de consensus connu sous le nom de [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) qui combine la preuve d'enjeu [Casper FFG](https://arxiv.org/abs/1710.09437) avec la [règle de choix de fourche GHOST](https://arxiv.org/abs/2003.03052).

## Complément d'information {#further-reading}

- [Qu'est-ce qu'un algorithme de consensus de la blockchain ?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Qu'est-ce que le Consensus de Nakamoto ? Guide complet du débutant](https://blockonomi.com/nakamoto-consensus/)
- [Comment fonctionne Casper ?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [À propos de la sécurité et les performances des blockchains de la preuve de travail](https://eprint.iacr.org/2016/555.pdf)
- [Panne Byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Thèmes connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)
