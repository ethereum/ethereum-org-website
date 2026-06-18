---
title: "Diversité des clients"
description: "Une explication de haut niveau de l'importance de la diversité des clients Ethereum."
lang: fr
sidebarDepth: 2
---

Le comportement d'un nœud [Ethereum](/) est contrôlé par le logiciel client qu'il exécute. Il existe plusieurs clients Ethereum de niveau production, chacun étant développé et maintenu dans différents langages par des équipes distinctes. Les clients sont construits selon une spécification commune qui garantit qu'ils communiquent de manière transparente entre eux, possèdent les mêmes fonctionnalités et offrent une expérience utilisateur équivalente. Cependant, pour le moment, la répartition des clients sur les nœuds n'est pas assez équitable pour réaliser le plein potentiel de cette fortification du réseau. Idéalement, les utilisateurs se répartissent de manière à peu près égale entre les différents clients pour apporter autant de diversité des clients que possible au réseau.

## Prérequis {#prerequisites}

Si vous ne comprenez pas encore ce que sont les nœuds et les clients, consultez la page [nœuds et clients](/developers/docs/nodes-and-clients/). Les couches d'[exécution](/glossary/#execution-layer) et de [consensus](/glossary/#consensus-layer) sont définies dans le glossaire.

## Pourquoi y a-t-il plusieurs clients ? {#why-multiple-clients}

Il existe plusieurs clients développés et maintenus indépendamment, car la diversité des clients rend le réseau plus résilient aux attaques et aux bugs. La multiplicité des clients est une force propre à Ethereum - d'autres blockchains s'appuient sur l'infaillibilité d'un seul client. Cependant, il ne suffit pas d'avoir plusieurs clients disponibles, ils doivent être adoptés par la communauté et le total des nœuds actifs doit être réparti de manière relativement uniforme entre eux.

## Pourquoi la diversité des clients est-elle importante ? {#client-diversity-importance}

Avoir de nombreux clients développés et maintenus indépendamment est vital pour la santé d'un réseau décentralisé. Explorons-en les raisons.

### Bugs {#bugs}

Un bug dans un client individuel représente un risque moindre pour le réseau lorsqu'il représente une minorité de nœuds Ethereum. Avec une répartition à peu près égale des nœuds entre de nombreux clients, la probabilité que la plupart des clients souffrent d'un problème commun est faible, et par conséquent, le réseau est plus robuste.

### Résilience aux attaques {#resilience}

La diversité des clients offre également une résilience aux attaques. Par exemple, une attaque qui [trompe un client particulier](https://twitter.com/vdWijden/status/1437712249926393858) sur une branche particulière de la chaîne a peu de chances de réussir, car il est peu probable que d'autres clients soient exploitables de la même manière et la chaîne canonique reste non corrompue. Une faible diversité des clients augmente le risque associé à un piratage sur le client dominant. La diversité des clients s'est déjà avérée être une défense importante contre les attaques malveillantes sur le réseau. Par exemple, l'attaque par déni de service de Shanghai en 2016 a été possible parce que les attaquants ont pu tromper le client dominant (Geth) pour qu'il exécute une opération d'entrée/sortie disque lente des dizaines de milliers de fois par bloc. Parce que des clients alternatifs qui ne partageaient pas la vulnérabilité étaient également en ligne, Ethereum a pu résister à l'attaque et continuer à fonctionner pendant que la vulnérabilité dans Geth était corrigée.

### Finalité de la preuve d'enjeu (PoS) {#finality}

Un bug dans un client de consensus avec plus de 33 % des nœuds Ethereum pourrait empêcher la couche de consensus d'atteindre la finalité, ce qui signifie que les utilisateurs ne pourraient pas être sûrs que les transactions ne seraient pas annulées ou modifiées à un moment donné. Cela serait très problématique pour de nombreuses applications construites sur Ethereum, en particulier la finance décentralisée (DeFi).

<Emoji text="🚨" className="me-4" /> Pire encore, un bug critique dans un client avec une majorité des deux tiers pourrait amener la chaîne à <a href="https://www.symphonious.net/2021/09/23/what-happens-if-beacon-chain-consensus-fails/" target="_blank">se diviser et se finaliser de manière incorrecte</a>, conduisant un grand ensemble de validateurs à rester bloqués sur une chaîne invalide. S'ils veulent rejoindre la chaîne correcte, ces validateurs s'exposent à une réduction ou à un retrait volontaire et une réactivation lents et coûteux. L'ampleur d'une réduction est proportionnelle au nombre de nœuds coupables, une majorité des deux tiers subissant une réduction maximale (32 ETH).

Bien qu'il s'agisse de scénarios improbables, l'écosystème Ethereum peut atténuer leur risque en équilibrant la répartition des clients sur les nœuds actifs. Idéalement, aucun client de consensus n'atteindrait jamais une part de 33 % du total des nœuds.

### Responsabilité partagée {#responsibility}

Il y a aussi un coût humain à avoir des clients majoritaires. Cela fait peser une pression et une responsabilité excessives sur une petite équipe de développement. Moins la diversité des clients est grande, plus le fardeau de la responsabilité est lourd pour les développeurs qui maintiennent le client majoritaire. Répartir cette responsabilité entre plusieurs équipes est bénéfique à la fois pour la santé du réseau de nœuds d'Ethereum et pour son réseau de personnes.

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
{ name: "Other", value: 0.07 }
]}
/>

Ce diagramme peut être obsolète — rendez-vous sur [ethernodes.org](https://ethernodes.org) et [clientdiversity.org](https://clientdiversity.org) pour des informations à jour.

Les deux graphiques circulaires ci-dessus montrent des aperçus de la diversité actuelle des clients pour les couches d'exécution et de consensus (au moment de la rédaction en octobre 2025). La diversité des clients s'est améliorée au fil des ans, et la couche d'exécution a vu une réduction de la domination de [Geth](https://geth.ethereum.org/), avec [Nethermind](https://www.nethermind.io/nethermind-client) de près en deuxième position, [Besu](https://besu.hyperledger.org/) en troisième et [Erigon](https://github.com/ledgerwatch/erigon) en quatrième, les autres clients représentant moins de 3 % du réseau. Le client le plus couramment utilisé sur la couche de consensus — [Lighthouse](https://lighthouse.sigmaprime.io/) — est assez proche du deuxième plus utilisé. [Prysm](https://prysmaticlabs.com/#projects) et [Teku](https://consensys.net/knowledge-base/ethereum-2/teku/) représentent respectivement environ 31 % et 14 %, et les autres clients sont rarement utilisés.

Les données de la couche d'exécution ont été obtenues sur [supermajority.info](https://supermajority.info/) le 26 octobre 2025. Les données pour les clients de consensus ont été obtenues auprès de [Michael Sproul](https://github.com/sigp/blockprint). Les données des clients de consensus sont plus difficiles à obtenir car les clients de la couche de consensus n'ont pas toujours de traces non ambiguës permettant de les identifier. Les données ont été générées à l'aide d'un algorithme de classification qui confond parfois certains des clients minoritaires (voir [ici](https://twitter.com/sproulM_/status/1440512518242197516) pour plus de détails). Dans le diagramme ci-dessus, ces classifications ambiguës sont traitées avec une étiquette de type l'un ou l'autre (par exemple Nimbus/Teku). Néanmoins, il est clair que la majorité du réseau exécute Prysm. Bien qu'il ne s'agisse que d'aperçus, les valeurs du diagramme donnent une bonne idée générale de l'état actuel de la diversité des clients.

Des données à jour sur la diversité des clients pour la couche de consensus sont désormais disponibles sur [clientdiversity.org](https://clientdiversity.org/).

## Couche d'exécution {#execution-layer}

Jusqu'à présent, la conversation autour de la diversité des clients s'est principalement concentrée sur la couche de consensus. Cependant, le client d'exécution [Geth](https://geth.ethereum.org) représente actuellement environ 85 % de tous les nœuds. Ce pourcentage est problématique pour les mêmes raisons que pour les clients de consensus. Par exemple, un bug dans Geth affectant le traitement des transactions ou la construction des charges utiles d'exécution pourrait amener les clients de consensus à finaliser des transactions problématiques ou buggées. Par conséquent, Ethereum serait en meilleure santé avec une répartition plus uniforme des clients d'exécution, idéalement sans qu'aucun client ne représente plus de 33 % du réseau.

## Utiliser un client minoritaire {#use-minority-client}

Résoudre le problème de la diversité des clients nécessite plus que le simple choix de clients minoritaires par des utilisateurs individuels - cela nécessite que les pools de validateurs et les institutions telles que les principales applications décentralisées (dapps) et les plateformes d'échange changent également de clients. Cependant, tous les utilisateurs peuvent faire leur part pour corriger le déséquilibre actuel et normaliser l'utilisation de tous les logiciels Ethereum disponibles. Après La Fusion, tous les opérateurs de nœuds devront exécuter un client d'exécution et un client de consensus. Choisir des combinaisons des clients suggérés ci-dessous aidera à accroître la diversité des clients.

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

Les utilisateurs techniques peuvent aider à accélérer ce processus en rédigeant davantage de tutoriels et de documentation pour les clients minoritaires et en encourageant leurs pairs opérateurs de nœuds à migrer loin des clients dominants. Des guides pour passer à un client de consensus minoritaire sont disponibles sur [clientdiversity.org](https://clientdiversity.org/).

## Tableaux de bord de la diversité des clients {#client-diversity-dashboards}

Plusieurs tableaux de bord fournissent des statistiques en temps réel sur la diversité des clients pour la couche d'exécution et de consensus.

**Couche de consensus :**

- [Rated.network](https://www.rated.network/)
- [clientdiversity.org](https://clientdiversity.org/)

**Couche d'exécution :**

- [supermajority.info](https://supermajority.info//)
- [Ethernodes](https://ethernodes.org/)

## Complément d'information {#further-reading}

- [La diversité des clients sur la couche de consensus d'Ethereum](https://mirror.xyz/jmcook.eth/S7ONEka_0RgtKTZ3-dakPmAHQNPvuj15nh0YGKPFriA)
- [La Fusion d'Ethereum : Exécutez le client majoritaire à vos risques et périls !](https://dankradfeist.de/ethereum/2022/03/24/run-the-majority-client-at-your-own-peril.html) – _Dankrad Fiest, 24 mars 2022_
- [L'importance de la diversité des clients](https://our.status.im/the-importance-of-client-diversity/)
- [Liste des services de nœuds Ethereum](https://ethereumnodes.com/)
- [Les « Cinq Pourquoi » du problème de la diversité des clients](https://notes.ethereum.org/@afhGjrKfTKmksTOtqhB9RQ/BJGj7uh08)
- [La diversité d'Ethereum et comment la résoudre (YouTube)](https://www.youtube.com/watch?v=1hZgCaiqwfU)
- [clientdiversity.org](https://clientdiversity.org/)

## Sujets connexes {#related-topics}

- [Exécuter un nœud Ethereum](/run-a-node/)
- [Nœuds et clients](/developers/docs/nodes-and-clients/)