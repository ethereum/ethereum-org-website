---
title: "Diversité des clients"
description: "Une explication de haut niveau sur l'importance de la diversité des clients Ethereum."
lang: fr
sidebarDepth: 2
---

Le comportement d'un nœud Ethereum est contrôlé par le logiciel client qu'il exécute. Il existe plusieurs clients Ethereum de niveau production, chacun développé et mis à jour dans différentes langues par des équipes séparées. Les clients sont créés selon une spécification commune qui garantit que les clients communiquent entre eux de manière transparente, ont les mêmes fonctionnalités et offrent une expérience utilisateur équivalente. Cependant, pour le moment, la répartition des clients entre les nœuds n'est pas assez équilibrée pour réaliser cette fortification du réseau à son plein potentiel. Idéalement, les utilisateurs se divisent à peu près équitablement entre les différents clients pour apporter le plus de diversité possible au réseau.

## Prérequis {#prerequisites}

Si vous ne comprenez pas encore ce que sont les nœuds et les clients, consultez [nœuds et clients](/developers/docs/nodes-and-clients/). Les couches « [exécution](/glossary/#execution-layer) » et « [consensus](/glossary/#consensus-layer) » sont définies dans le glossaire.

## Pourquoi existe-t-il différents clients ? {#why-multiple-clients}

De multiples clients, développés et mis à jour de manière indépendante, existent parce que la diversité des clients rend le réseau plus résistant aux attaques et aux bogues. La multitude de clients est une force propre à Ethereum - d'autres blockchains dépendent de l'infaillibilité d'un seul client. Cependant, il ne suffit pas de disposer de plusieurs clients ; ceux-ci doivent être adoptés par la communauté et l'ensemble des nœuds actifs doit être réparti de manière relativement égale entre eux.

## Pourquoi la diversité des clients est-elle importante ? {#client-diversity-importance}

Disposer de nombreux clients développés et mis à jour de façon indépendante est vital pour la bonne santé d'un réseau décentralisé. Voyons pourquoi.

### Bogues {#bugs}

Un bogue dans un client individualisé est moins risqué pour le réseau lorsqu'il représente une minorité de nœuds Ethereum. Lorsque les nœuds sont répartis de façon à peu près égale entre de nombreux clients, la probabilité que la plupart des clients souffrent d'un problème commun est faible et, par conséquent, le réseau est plus robuste.

### Résilience aux attaques {#resilience}

La diversité des clients offre également une résilience aux attaques. Par exemple, une attaque qui [trompe un client particulier](https://twitter.com/vdWijden/status/1437712249926393858) pour l'attirer sur une branche particulière de la chaîne a peu de chances de réussir, car les autres clients sont peu susceptibles d'être exploitables de la même manière et la chaîne canonique reste non corrompue. La faible diversité des clients augmente le risque associé à un piratage sur le client dominant. La diversité des clients s'est déjà avérée être une défense importante contre les attaques malveillantes sur le réseau ; par exemple, l'attaque par déni de service de Shanghai en 2016 a été possible parce que les attaquants ont pu tromper le client dominant (Geth) en lui faisant exécuter une opération d'E/S disque lente des dizaines de milliers de fois par bloc. Puisque des clients alternatifs étaient également en ligne et ne partageaient pas la vulnérabilité, Ethereum a pu résister à l'attaque et continuer à fonctionner pendant que la vulnérabilité de Geth était corrigée.

### Finalité de la preuve d'enjeu {#finality}

Un bug dans un client de consensus avec plus de 33 % des nœuds Ethereum pourrait empêcher la finalisation couche de consensus, de sorte que les utilisateurs ne pourraient pas avoir confiance dans le fait que les transactions ne seraient pas annulées ou modifiées à un moment donné. Cela serait problématique pour de nombreuses applications basées sur Ethereum, en particulier pour la DeFi.

<Emoji text="🚨" className="me-4" /> Pire encore, un bogue critique dans un client détenant une majorité des deux tiers pourrait provoquer <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">une division et une finalisation incorrectes de la chaîne</a>, bloquant un grand nombre de validateurs sur une chaîne invalide. S'ils souhaitent rejoindre la bonne chaîne, ces validateurs sont confrontés à un délestage ou à un retrait volontaire et à une réactivation lente et coûteuse. La magnitude d'un délestage est proportionnelle au nombre de nœuds impliqués avec une majorité des deux tiers sanctionnée au maximum (32 ETH).

Bien que ces scénarios soient peu probables, l’écosystème Ethereum peut atténuer leurs risques en éliminant la distribution des clients sur les nœuds actifs. Idéalement, aucun client de consensus ne devrait pouvoir atteindre 33 % du total des nœuds.

### Responsabilité partagée {#responsibility}

Le fait d'avoir des clients majoritaires a aussi un coût humain. Il impose une pression et une responsabilité excessives à une petite équipe de développement. Plus la diversité des clients est limitée, plus la charge de responsabilité est importante pour les développeurs qui maintiennent le client majoritaire. La répartition de cette responsabilité entre plusieurs équipes est bénéfique pour la bonne santé du réseau de nœuds d'Ethereum et de son réseau d'utilisateurs.

## Diversité actuelle des clients {#current-client-diversity}

### Clients d'exécution {#execution-clients-breakdown}

<PieChart
data={[
{ name: "Geth", value: 41 },
{ name: "Nethermind", value: 38 },
{ name: "Besu", value: 16 },
{ name: "Erigon", value: 3 },
{ name: "Reth", value: 2 }
]}
/>

### Clients de consensus {#consensus-clients-breakdown}

<PieChart
data={[
{ name: "Lighthouse", value: 42.71 },
{ name: "Prysm", value: 30.91},
{ name: "Teku", value: 13.86},
{ name: "Nimbus", value: 8.74},
{ name: "Lodestar", value: 2.67 },
{ name: "Grandine", value: 1.04 },
{ name: "Autre", value: 0.07 }
]}
/>

Ce diagramme peut être obsolète — rendez-vous sur [ethernodes.org](https://ethernodes.org) et [clientdiversity.org](https://clientdiversity.org) pour obtenir des informations à jour.

Les deux diagrammes circulaires ci-dessus montrent des instantanés de la diversité actuelle des clients pour les couches d'exécution et de consensus (au moment de la rédaction en octobre 2025). La diversité des clients s'est améliorée au fil des ans et la couche d'exécution a vu une réduction de la domination de [Geth](https://geth.ethereum.org/), avec [Nethermind](https://www.nethermind.io/nethermind-client) juste derrière, puis [Besu](https://besu.hyperledger.org/) et [Erigon](https://github.com/ledgerwatch/erigon), les autres clients représentant moins de 3 % du réseau. Le client le plus utilisé sur la couche de consensus — [Lighthouse](https://lighthouse.sigmaprime.io/) — est au coude-à-coude avec le deuxième plus utilisé. [Prysm](https://prysmaticlabs.com/#projects) et [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) représentent respectivement ~31 % et ~14 %, et les autres clients sont rarement utilisés.

Les données de la couche d'exécution ont été obtenues sur [supermajority.info](https://supermajority.info/) le 26 octobre 2025. Les données pour les clients de consensus ont été obtenues auprès de [Michael Sproul](https://github.com/sigp/blockprint). Les données du client du consensus sont plus difficiles à obtenir dans la mesure où les clients de la couche de consensus ne disposent pas toujours de traces claires susceptibles d'être utilisées pour les identifier. Les données ont été générées à l'aide d'un algorithme de classification qui confond parfois certains des clients minoritaires (voir [ici](https://twitter.com/sproulM_/status/1440512518242197516) pour plus de détails). Dans le diagramme ci-dessus, ces classifications ambiguës sont traitées avec une étiquette « soit/soit » (p. ex., Nimbus/Teku). Néanmoins, il est clair que la majorité du réseau utilise Prysm. Bien que ce ne soient que des instantanés, les valeurs du diagramme fournissent un bonne vision générale de l'état actuel de la diversité des clients.

Des données à jour sur la diversité des clients pour la couche de consensus sont désormais disponibles sur [clientdiversity.org](https://clientdiversity.org/).

## Couche d’exécution {#execution-layer}

Jusqu’à présent, la conversation autour de la diversité des clients s’est principalement concentrée sur la couche de consensus. Cependant, le client d'exécution [Geth](https://geth.ethereum.org) représente actuellement environ 85 % de tous les nœuds. Ce pourcentage est problématique pour les mêmes raisons que pour les clients de consensus. Par exemple, un bogue dans Geth affectant la gestion des transactions ou la construction de blocs d'exécution peut conduire les clients de consensus à finaliser des transactions problématiques ou avec des bogues. Ainsi, Ethereum serait plus sain avec une distribution plus uniforme des clients d'exécution, idéalement sans client représentant plus de 33 % du réseau.

## Utiliser un client minoritaire {#use-minority-client}

Assurer la diversité des clients ne se limite pas au choix individuel d’utilisateurs qui optent pour des clients minoritaires : cela nécessite aussi que les pools de validateurs et les institutions, comme les principales dapps et plateformes d’échange, changent également de client. Cependant, tous les utilisateurs peuvent collaborer pour corriger le déséquilibre actuel et normaliser l'utilisation de tous les logiciels Ethereum disponibles. Après La Fusion, tous les opérateurs de nœuds seront requis pour exécuter un client d'exécution et un client de consensus. Le choix des combinaisons de clients suggérées ci-dessous contribuera à accroître la diversité des clients.

### Clients d'exécution {#execution-clients}

- [Besu](https://www.hyperledger.org/use/besu)
- [Nethermind](https://downloads.nethermind.io/)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Go-Ethereum](https://geth.ethereum.org/)
- [Reth](https://reth.rs/)

### Clients de consensus {#consensus-clients}

- [Nimbus](https://nimbus.team/)
- [Lighthouse](https://github.com/sigp/lighthouse)
- [Teku](https://consensys.io/teku)
- [Lodestar](https://github.com/ChainSafe/lodestar)
- [Prysm](https://prysm.offchainlabs.com/docs/)
- [Grandine](https://docs.grandine.io/)

Les utilisateurs techniques peuvent aider à accélérer ce processus en rédigeant plus de tutoriels et de documentation pour les clients minoritaires et ainsi encourager leurs pairs à migrer loin des clients dominants. Des guides pour passer à un client de consensus minoritaire sont disponibles sur [clientdiversity.org](https://clientdiversity.org/).

## Tableaux de bord de la diversité des clients {#client-diversity-dashboards}

Plusieurs tableaux de bord donnent des statistiques en temps réel de la diversité des clients pour la couche d'exécution et la couche de consensus.

**Couche de consensus:**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Couche d’exécution :**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## En savoir plus {#further-reading}

- [La diversité des clients sur la couche de consensus d'Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [La Fusion d'Ethereum : utilisez le client majoritaire à vos risques et périls !](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 mars 2022_
- [L'importance de la diversité des clients](https://our.status.im/the-importance-of-client-diversity/)
- [Liste des services de nœuds Ethereum](https://ethereumnodes.com/)
- [Les « Cinq pourquoi » du problème de la diversité des clients](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [La diversité sur Ethereum et comment la résoudre (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Sujets connexes {#related-topics}

- [Exécuter un nœud Ethereum](/run-a-node/)
- [Nœuds et clients](/developers/docs/nodes-and-clients/)
