---
title: Mécanismes de consensus
description: Explication des protocoles de consensus dans les systèmes distribués et du rôle qu'ils jouent dans Ethereum.
lang: fr
incomplete: true
---

Quand il s'agit de blockchains comme Ethereum, qui sont par essence des bases de données distribuées, les nœuds du réseau doivent pouvoir se mettre d'accord sur l'état actuel du système. Cela se fait par le biais de mécanismes de consensus.

Bien que les mécanismes de consensus ne soient pas directement liés à la construction d'une dApp, les comprendre éclairera des concepts pertinents pour vous et l'expérience de vos utilisateurs, comme les prix du gaz et les temps de transaction.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce que le consensus ? {#what-is-consensus}

Par consensus, nous voulons dire qu'un accord général a été trouvé. Prenons le cas d'un groupe de personnes qui vont au cinéma. S'il n'y a pas de désaccord sur le choix du film, alors un consensus est dégagé. Dans le cas extrême, le groupe finira par se séparer.

En ce qui concerne la blockchain, parvenir à un consensus signifie qu'au moins 51 % des nœuds du réseau sont d'accord sur l'état global suivant du réseau.

## Qu'est-ce qu'un mécanisme de consensus ? {#what-is-a-consensus-mechanism}

Les mécanismes de consensus (aussi appelés protocoles ou algorithmes de consensus) permettent aux systèmes distribués (réseaux d'ordinateurs) de travailler ensemble en toute sécurité.

Pendant des décennies, ces mécanismes ont été utilisés pour établir un consensus entre les nœuds de bases de données, les serveurs d'applications et d'autres infrastructures d'entreprise. Ces dernières années, de nouveaux protocoles consensuels ont été inventés pour permettre aux systèmes de crypto-économie, comme Ethereum, de se mettre d'accord sur l'état du réseau.

Un mécanisme de consensus dans un système crypto-économique aide également à prévenir certains types d'attaques économiques. En théorie, un attaquant peut compromettre le consensus en contrôlant 51 % du réseau. Les mécanismes de consensus sont conçus pour empêcher cette « attaque de 51 % ». Plusieurs mécanismes sont conçus pour résoudre de différentes manières ce problème de sécurité.

<YouTube id="dylgwcPH4EA" />

## Types de mécanismes de consensus {#types-of-consensus-mechanisms}

### Preuve de travail {#proof-of-work}

Ethereum, comme Bitcoin, utilise actuellement un mécanisme de consensus appelé **preuve de travail (PoW)**.

#### Création de blocs {#pow-block-creation}

La preuve de travail est faite par [les mineurs](/developers/docs/consensus-mechanisms/pow/mining/), qui sont en concurrence pour créer des blocs remplis de transactions traitées. Le gagnant partage le nouveau bloc avec le reste du réseau et gagne de l'ETH. La course est gagnée par l'ordinateur de n'importe qui qui peut résoudre un puzzle mathématique le plus rapidement – cela produit le lien cryptographique entre le bloc actuel et le bloc qui s'est déroulé avant. Résoudre ce puzzle est le travail dans la "preuve de travail".

#### Sécurité {#pow-security}

La sécurité du réseau est assurée par le fait qu'il vous faudrait 51 % de la puissance de calcul du réseau pour frauder la chaîne. Cela nécessitant d'énormes investissements en équipement et en énergie, vous risqueriez de dépenser plus que ce que vous pourriez gagner.

En savoir plus sur la [preuve de travail](/developers/docs/consensus-mechanisms/pow/)

### Preuve d'enjeu {#proof-of-stake}

Ethereum a prévu de passer au protocole consensuel de la **preuve d'enjeu (PoS)**.

#### Création de blocs {#pos-block-creation}

La preuve d'enjeu est faite par des validateurs qui ont misé leur ETH pour participer au système. Un validateur est choisi au hasard pour créer des blocs, les partager avec le réseau et gagner des récompenses. Au lieu de devoir effectuer un travail de calcul intense, il vous suffit de miser vos ETH sur le réseau. C'est ce qui incite à adopter un comportement sain sur le réseau.

#### Sécurité {#pos-security}

Le système de preuve d'enjeu permet d'assurer la sécurité du système car vous auriez besoin de 51 % du total des ETH misés pour pouvoir frauder. De plus, en cas de comportement malveillant, une réduction de votre mise est appliquée.

En savoir plus sur la [preuve de travail](/developers/docs/consensus-mechanisms/pos/)

### Un guide visuel {#types-of-consensus-video}

En savoir plus sur les différents types de mécanismes de consensus utilisés sur Ethereum :

<YouTube id="ojxfbN78WFQ" />

### Résistance à l'attaque Sybil et sélection en chaîne {#sybil-chain}

Maintenant techniquement, la preuve de travail et la preuve d'enjeu ne sont pas des protocoles consensuels par eux-mêmes, mais ils sont souvent appelés comme tels par simplicité. Ce sont en fait des mécanismes de résistance à l'attaque Sybil et des sélecteurs d'auteurs de bloc ; ils sont un moyen de décider qui est l'auteur du dernier bloc. C'est ce mécanisme de résistance à l'attaque Sybil combiné à une règle de sélection de chaîne qui constitue un véritable mécanisme de consensus.

**Résistance à l'attaque Sybil** mesure comment un protocole s'oppose contre une [attaque Sybil](https://wikipedia.org/wiki/Sybil_attack). Les attaques Sybil sont quand un utilisateur ou un groupe se fait passer pour plusieurs utilisateurs. La résistance à ce type d'attaque est essentielle pour une blockchain décentralisée et permet aux mineurs et validateurs d'être récompensés sur un pied d'égalité en fonction des ressources mises à disposition. La preuve de travail et la preuve de mise en jeu protègent contre cela en obligeant les utilisateurs à dépenser beaucoup d'énergie ou à mettre beaucoup de garanties. Ces protections sont un moyen de dissuasion économique contre les attaques Sybil.

**Une règle de sélection de la chaîne** est utilisée pour décider quelle chaîne est la chaîne « correcte ». Ethereum et Bitcoin utilisent actuellement la règle de la « plus longue chaîne », ce qui signifie que quelle que soit la chaîne de blocs la plus longue sera celle que les autres nœuds acceptent comme valide et fonctionnent. Pour les chaînes de preuve de travail, la chaîne la plus longue est déterminée par la difficulté cumulative totale de preuve de travail.

Cette combinaison de la preuve de travail et de la règle de la plus longue chaîne est connue sous le nom de « Consensus de Nakamoto ».

La [chaîne phare](/roadmap/beacon-chain/) utilise un mécanisme de consensus appelé [Casper le Gadget de finalité amical](https://arxiv.org/abs/1710.09437), qui est basé sur la preuve de mise en jeu.

## Complément d'information {#further-reading}

- [Qu'est-ce qu'un algorithme de consensus de la blockchain ?](https://academy.binance.com/en/articles/what-is-a-blockchain-consensus-algorithm)
- [Qu'est-ce que le Consensus de Nakamoto ? Guide complet du débutant](https://blockonomi.com/nakamoto-consensus/)
- [Comment fonctionne Casper ?](https://medium.com/unitychain/intro-to-casper-ffg-9ed944d98b2d)
- [À propos de la sécurité et les performances des blockchains de la preuve de travail](https://eprint.iacr.org/2016/555.pdf)

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Thèmes connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
