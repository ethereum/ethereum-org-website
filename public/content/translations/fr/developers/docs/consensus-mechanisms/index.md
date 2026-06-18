---
title: Mécanismes de consensus
description: Une explication des protocoles de consensus dans les systèmes distribués et de leur rôle dans Ethereum.
lang: fr
authors: ["Patrick Collins"]
---

Le terme « mécanisme de consensus » est souvent utilisé familièrement pour désigner les protocoles de « preuve d'enjeu (PoS) », de « preuve de travail (PoW) » ou de « preuve d'autorité (PoA) ». Cependant, ce ne sont que des composants des mécanismes de consensus qui protègent contre les [attaques Sybil](/glossary/#sybil-attack). Les mécanismes de consensus constituent l'ensemble complet d'idées, de protocoles et d'incitations qui permettent à un ensemble distribué de nœuds de s'accorder sur l'état d'une chaîne de blocs.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de lire d'abord notre [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce que le consensus ? {#what-is-consensus}

Par consensus, nous entendons qu'un accord général a été trouvé. Imaginez un groupe de personnes allant au cinéma. S'il n'y a pas de désaccord sur le choix du film proposé, alors un consensus est atteint. En cas de désaccord, le groupe doit avoir les moyens de décider quel film aller voir. Dans les cas extrêmes, le groupe finira par se séparer.

En ce qui concerne la chaîne de blocs [Ethereum](/), le processus est formalisé, et atteindre un consensus signifie qu'au moins 66 % des nœuds du réseau sont d'accord sur l'état global du réseau.

## Qu'est-ce qu'un mécanisme de consensus ? {#what-is-a-consensus-mechanism}

Le terme mécanisme de consensus fait référence à l'ensemble des protocoles, incitations et idées qui permettent à un réseau de nœuds de s'accorder sur l'état d'une chaîne de blocs.

Ethereum utilise un mécanisme de consensus basé sur la preuve d'enjeu (PoS) qui tire sa sécurité crypto-économique d'un ensemble de récompenses et de pénalités appliquées au capital verrouillé par les stakers. Cette structure d'incitation encourage les stakers individuels à opérer des validateurs honnêtes, punit ceux qui ne le font pas, et crée un coût extrêmement élevé pour attaquer le réseau.

Ensuite, il existe un protocole qui régit la manière dont les validateurs honnêtes sont sélectionnés pour proposer ou valider des blocs, traiter les transactions et voter pour leur vision de la tête de la chaîne. Dans les rares situations où plusieurs blocs se trouvent dans la même position près de la tête de la chaîne, il existe un mécanisme de choix de fourche qui sélectionne les blocs constituant la chaîne la plus « lourde », mesurée par le nombre de validateurs ayant voté pour les blocs, pondéré par le solde de leur mise en ether.

Certains concepts importants pour le consensus ne sont pas explicitement définis dans le code, comme la sécurité supplémentaire offerte par une potentielle coordination sociale hors bande en tant que dernière ligne de défense contre les attaques sur le réseau.

Ces composants forment ensemble le mécanisme de consensus.

## Types de mécanismes de consensus {#types-of-consensus-mechanisms}

### Basé sur la preuve de travail {#proof-of-work}

Tout comme Bitcoin, Ethereum utilisait autrefois un protocole de consensus basé sur la **preuve de travail (PoW)**.

#### Création de blocs {#pow-block-creation}

Les mineurs sont en compétition pour créer de nouveaux blocs remplis de transactions traitées. Le gagnant partage le nouveau bloc avec le reste du réseau et gagne des ETH fraîchement émis. La course est remportée par l'ordinateur capable de résoudre un casse-tête mathématique le plus rapidement. Cela produit le lien cryptographique entre le bloc actuel et le bloc précédent. La résolution de ce casse-tête constitue le travail dans la « preuve de travail ». La chaîne canonique est ensuite déterminée par une règle de choix de fourche qui sélectionne l'ensemble de blocs ayant nécessité le plus de travail pour leur minage.

#### Sécurité {#pow-security}

Le réseau est maintenu sécurisé par le fait qu'il faudrait 51 % de la puissance de calcul du réseau pour frauder la chaîne. Cela nécessiterait des investissements tellement énormes en équipement et en énergie que vous dépenseriez probablement plus que ce que vous gagneriez.

En savoir plus sur la [preuve de travail](/developers/docs/consensus-mechanisms/pow/)

### Basé sur la preuve d'enjeu {#proof-of-stake}

Ethereum utilise désormais un protocole de consensus basé sur la **preuve d'enjeu (PoS)**.

#### Création de blocs {#pos-block-creation}

Les validateurs créent des blocs. Un validateur est sélectionné au hasard dans chaque créneau pour être le proposeur de bloc. Leur client de consensus demande un lot de transactions sous forme de « charge utile d'exécution » à leur client d'exécution associé. Ils l'enveloppent dans des données de consensus pour former un bloc, qu'ils envoient aux autres nœuds du réseau Ethereum. Cette production de blocs est récompensée en ETH. Dans les rares cas où plusieurs blocs possibles existent pour un seul créneau, ou si les nœuds entendent parler des blocs à des moments différents, l'algorithme de choix de fourche choisit le bloc qui forme la chaîne avec le plus grand poids d'attestations (où le poids est le nombre de validateurs attestant, proportionnel à leur solde en ETH).

#### Sécurité {#pos-security}

Un système de preuve d'enjeu est sécurisé sur le plan crypto-économique car un attaquant tentant de prendre le contrôle de la chaîne doit détruire une quantité massive d'ETH. Un système de récompenses incite les stakers individuels à se comporter honnêtement, et des pénalités dissuadent les stakers d'agir de manière malveillante.

En savoir plus sur la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)

### Un guide visuel {#types-of-consensus-video}

Regardez-en plus sur les différents types de mécanismes de consensus utilisés sur Ethereum :

<VideoWatch slug="understanding-consensus-mechanisms" />

### Résistance Sybil et sélection de chaîne {#sybil-chain}

La preuve de travail et la preuve d'enjeu ne sont pas, à elles seules, des protocoles de consensus, mais elles sont souvent désignées comme telles par souci de simplicité. Ce sont en réalité des mécanismes de résistance aux attaques Sybil et des sélecteurs d'auteurs de blocs ; elles constituent un moyen de décider qui est l'auteur du dernier bloc. Un autre composant important est l'algorithme de sélection de chaîne (également appelé choix de fourche) qui permet aux nœuds de choisir un seul bloc correct à la tête de la chaîne dans les scénarios où plusieurs blocs existent dans la même position.

La **résistance Sybil** mesure la façon dont un protocole se comporte face à une attaque Sybil. La résistance à ce type d'attaque est essentielle pour une chaîne de blocs décentralisée et permet aux mineurs et aux validateurs d'être récompensés équitablement en fonction des ressources investies. La preuve de travail et la preuve d'enjeu protègent contre cela en obligeant les utilisateurs à dépenser beaucoup d'énergie ou à fournir un collatéral important. Ces protections constituent une dissuasion économique contre les attaques Sybil.

Une **règle de sélection de chaîne** est utilisée pour décider quelle chaîne est la « bonne » chaîne. Bitcoin utilise la règle de la « chaîne la plus longue », ce qui signifie que la chaîne de blocs la plus longue sera celle que le reste des nœuds acceptera comme valide et avec laquelle ils travailleront. Pour les chaînes à preuve de travail, la chaîne la plus longue est déterminée par la difficulté totale cumulée de la preuve de travail de la chaîne. Ethereum utilisait également la règle de la chaîne la plus longue ; cependant, maintenant qu'Ethereum fonctionne avec la preuve d'enjeu, il a adopté un algorithme de choix de fourche mis à jour qui mesure le « poids » de la chaîne. Le poids est la somme cumulée des votes des validateurs, pondérée par les soldes en ether mis en jeu par les validateurs.

Ethereum utilise un mécanisme de consensus connu sous le nom de [Gasper](/developers/docs/consensus-mechanisms/pos/gasper/) qui combine la [preuve d'enjeu Casper FFG](https://arxiv.org/abs/1710.09437) avec la [règle de choix de fourche GHOST](https://arxiv.org/abs/2003.03052).

## Lectures complémentaires {#further-reading}

- [Qu'est-ce qu'un algorithme de consensus de chaîne de blocs ?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Qu'est-ce que le consensus de Nakamoto ? Guide complet pour débutants](https://blockonomi.com/nakamoto-consensus/)
- [Comment fonctionne Casper ?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [Sur la sécurité et les performances des chaînes de blocs à preuve de travail](https://eprint.iacr.org/2016/555.pdf)
- [Défaillance byzantine](https://en.wikipedia.org/wiki/Byzantine_fault)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
- [Preuve d'autorité](/developers/docs/consensus-mechanisms/poa/)