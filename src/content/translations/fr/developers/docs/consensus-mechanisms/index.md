---
title: Mécanismes de consensus
description: Explication des protocoles de consensus dans les systèmes distribués et du rôle qu'ils jouent dans Ethereum.
lang: fr
sidebar: true
incomplete: true
---

Quand il s'agit de blockchains comme Ethereum, qui sont par essence des bases de données distribuées, les nœuds du réseau doivent pouvoir se mettre d'accord sur l'état actuel du système. Cela se fait par le biais de mécanismes de consensus.

Bien que cela ne fasse pas partie de la construction d'une DApp, comprendre les mécanismes de consensus révélera des choses pertinentes pour vous et pour l'expérience de vos utilisateurs, comme les prix du carburant et les temps de transaction.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire cette [introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Qu'est-ce qu'un mécanisme de consensus? {#what-is-a-consensus-mechanism}

Les mécanismes de consensus (aussi appelés protocoles ou algorithmes de consensus) permettent aux systèmes distribués (réseaux d'ordinateurs) de travailler ensemble en toute sécurité.

Pendant des décennies, ces mécanismes ont été utilisés pour établir un consensus entre les nœuds de bases de données, les serveurs d'applications et d'autres infrastructures d'entreprise. Ces dernières années, de nouveaux protocoles consensuels ont été inventés pour permettre aux systèmes de crypto-économie, comme Ethereum, de se mettre d'accord sur l'état du réseau.

Un mécanisme de consensus dans un système crypto-économique aide également à prévenir certains types d'attaques économiques. En théorie, un attaquant peut compromettre le consensus en contrôlant 51 % du réseau. Les mécanismes de consensus sont conçus pour empêcher cette "attaque de 51 %". Plusieurs mécanismes sont conçus pour résoudre différemment ce problème de sécurité.

<!-- ### Consensus -->

<!-- Formal requirements for a consensus protocol may include: -->

<!-- - Agreement: All correct processes must agree on the same value. -->
<!-- - Weak validity: For each correct process, its output must be the input of some correct process. -->
<!-- - Strong validity: If all correct processes receive the same input value, then they must all output that value. -->
<!-- - Termination: All processes must eventually decide on an output value -->

<!-- ### Fault tolerance -->
<!-- TODO explain how protocols must be fault tolerant -->

## Types de mécanismes de consensus {#types-of-consensus-mechanisms}

<!-- TODO -->
<!-- Why do different consensus protocols exist? -->
<!-- What are the tradeoffs of each? -->

### Preuve de travail {#proof-of-work}

Ethereum, comme Bitcoin, utilise actuellement la preuve de travail (PoW) comme protocole de consensus.

#### Création de blocs {#pow-block-creation}

La preuve de travail est faite par [les mineurs](/developers/docs/consensus-mechanisms/pow/mining/), qui sont en concurrence pour créer des blocs remplis de transactions traitées. Le gagnant partage le nouveau bloc avec le reste du réseau et gagne de l'ETH. La course est gagnée par l'ordinateur qui peut résoudre un puzzle mathématique le plus rapidement – cela produit le lien cryptographique entre le bloc actuel et le bloc qui s'est déroulé avant. Résoudre ce puzzle est le travail dans la "preuve de travail".

#### Sécurité {#pow-security}

La sécurité du réseau est assurée par le fait qu'il vous faudrait 51 % de la puissance de calcul du réseau pour frauder la chaîne. Cela nécessitant d'énormes investissements en équipement et en énergie, vous risqueriez de dépenser plus que ce que vous pourriez gagner.

En savoir plus sur la [preuve de travail (PoW)](/developers/docs/consensus-mechanisms/pow/)

### Preuve d'enjeu {#proof-of-stake}

Ethereum a prévu de passer au protocole consensuel de la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/).

#### Création de blocs {#pos-block-creation}

La preuve d'enjeu est faite par des validateurs qui ont misé leur ETH pour participer au système. Un validateur est choisi au hasard pour créer des blocs, les partager avec le réseau et gagner des récompenses. Au lieu de devoir effectuer un travail de calcul intense, il vous suffit de miser vos ETH sur le réseau. C'est ce qui incite à adopter un comportement sain sur le réseau.

#### Sécurité {#pos-security}

Le système de preuve d'enjeu permet d'assurer la sécurité du système car vous auriez besoin de 51% du total des ETH misés pour pouvoir frauder. De plus, en cas de comportement malveillant, une réduction de votre mise est appliquée.

En savoir plus sur la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/)

## Complément d'information {#further-reading}

<!-- TODO -->

## Sujets connexes {#related-topics}

- [Preuve de travail](/developers/docs/consensus-mechanisms/pow/)
- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/)
