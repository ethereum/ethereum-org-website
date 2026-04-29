---
title: "Explication de la mise à l'échelle de la couche 2 (l2) d'Ethereum"
description: "Un aperçu des solutions de mise à l'échelle de couche 2 (l2) pour Ethereum, y compris les rollup, Plasma, les canaux d'état et les chaînes latérales."
lang: fr
youtubeId: "BgCgauWVTs0"
uploadDate: 2021-02-03
duration: "0:14:28"
educationLevel: intermediate
topic:
  - "mise à l'échelle"
  - "couche 2"
format: explainer
author: Finematics
breadcrumb: "Mise à l'échelle de la couche 2"
---

Une explication par **Finematics** couvrant les solutions de mise à l'échelle de couche 2 (l2) pour Ethereum — y compris les canaux, Plasma, les chaînes latérales et les rollup, et pourquoi les rollup émergent comme la stratégie de mise à l'échelle dominante. Découvrez comment ces technologies réduisent les coûts et augmentent le débit tout en héritant de la sécurité d'Ethereum.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=BgCgauWVTs0) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Mise à l'échelle d'Ethereum (0:31) {#ethereum-scaling-031}

La mise à l'échelle d'Ethereum a été l'un des sujets les plus discutés pratiquement depuis le lancement du réseau. Le débat sur la mise à l'échelle s'intensifie toujours après une période de congestion majeure du réseau.

L'une des premières périodes de ce type a été le marché haussier des crypto de 2017, où les tristement célèbres CryptoKitties ainsi que les ICO ont pu engorger l'ensemble du réseau Ethereum, provoquant une hausse majeure des frais de gaz. Cette année, la congestion du réseau est revenue encore plus forte, cette fois causée par la popularité de la finance décentralisée (DeFi) et de l'agriculture de rendement. Il y a eu des périodes où même des frais de gaz aussi élevés que 500+ gwei ne permettaient pas de faire vérifier votre transaction pendant un certain temps.

#### Mise à l'échelle des chaînes de blocs (1:20) {#scaling-blockchains-120}

Lorsqu'il s'agit de mettre à l'échelle Ethereum ou les chaînes de blocs en général, il y a deux manières principales de le faire : mettre à l'échelle la couche de base elle-même — la couche 1 (l1) — ou mettre à l'échelle le réseau en déchargeant une partie du travail sur une autre couche — la couche 2 (l2).

La couche 1 (l1) est la couche de consensus de base standard où presque toutes les transactions sont actuellement réglées. Le concept de couches n'est pas spécifique à Ethereum ; d'autres chaînes de blocs telles que Bitcoin ou Zcash l'utilisent également de manière intensive.

La couche 2 (l2) est une autre couche construite au-dessus de la couche 1 (l1). Il y a quelques points importants ici : la couche 2 (l2) ne nécessite aucune modification de la couche 1 (l1) — elle peut simplement être construite au-dessus de la couche 1 (l1) en utilisant ses éléments existants, tels que les contrats intelligents. La couche 2 (l2) tire également parti de la sécurité de la couche 1 (l1) en ancrant son état dans la couche 1 (l1).

Ethereum peut actuellement traiter environ 15 transactions par seconde sur sa couche de base. La mise à l'échelle de la couche 2 (l2) peut augmenter considérablement le nombre de transactions — selon la solution, en traitant entre 2 000 et 4 000 transactions par seconde.

#### Ethereum 2.0 (2:39) {#ethereum-20-239}

Qu'en est-il d'Ethereum 2.0 ? N'était-il pas censé mettre à l'échelle Ethereum ? Oui — Ethereum 2.0 introduit la preuve d'enjeu (PoS) et les chaînes de fragments qui augmenteront considérablement le débit des transactions sur la couche de base.

Cela signifie-t-il que nous n'aurons pas besoin de la mise à l'échelle de la couche 2 (l2) lors du déploiement d'Ethereum 2.0 ? Pas vraiment — même avec les chaînes de fragments, Ethereum aura toujours besoin de la mise à l'échelle de la couche 2 (l2) pour pouvoir gérer des centaines de milliers, voire des millions de transactions par seconde à l'avenir.

#### Le trilemme de la scalabilité (3:15) {#scalability-trilemma-315}

C'est également là qu'entre en jeu le célèbre trilemme de la scalabilité. En théorie, nous pourrions simplement ignorer complètement la couche 2 (l2) et nous concentrer plutôt sur la mise à l'échelle de la couche de base. Cela nécessiterait des nœuds hautement spécialisés pour gérer la charge de travail accrue, ce qui conduirait à une plus grande centralisation et réduirait donc la sécurité et les propriétés de résistance à la censure du réseau.

En gardant à l'esprit que la scalabilité ne devrait jamais se faire au détriment de la sécurité et de la décentralisation, il nous reste une combinaison de mise à l'échelle de la couche 1 (l1) et de la couche 2 (l2) pour l'avenir.

#### Mise à l'échelle de la couche 2 (3:52) {#layer-2-scaling-352}

La mise à l'échelle de la couche 2 (l2) est un terme collectif désignant les solutions qui aident à augmenter les capacités de la couche 1 (l1) en gérant les transactions hors chaîne. Les deux principales capacités qui peuvent être améliorées sont la vitesse des transactions et le débit des transactions. De plus, les solutions de couche 2 (l2) peuvent considérablement réduire les frais de gaz.

En ce qui concerne les solutions de mise à l'échelle réelles, plusieurs options sont disponibles. Certaines de ces options sont disponibles dès maintenant et peuvent augmenter le débit du réseau Ethereum à court ou moyen terme, tandis que d'autres visent un horizon à moyen ou long terme. Certaines solutions sont spécifiques à une application — par exemple, les canaux de paiement — tandis que d'autres, comme les rollup optimistes, peuvent être utilisées pour n'importe quelle exécution de contrat arbitraire.

#### Canaux (5:03) {#channels-503}

Les canaux sont l'une des premières solutions de mise à l'échelle largement discutées. Ils permettent aux participants d'échanger leurs transactions un certain nombre de fois tout en ne soumettant que deux transactions à la couche de base. Les types de canaux les plus populaires sont les canaux d'état et leur sous-type, les canaux de paiement.

Bien que les canaux aient le potentiel de traiter facilement des milliers de transactions par seconde, ils présentent quelques inconvénients. Ils n'offrent pas de participation ouverte — les participants doivent être connus à l'avance, et les utilisateurs doivent verrouiller leurs fonds dans un contrat multisig. De plus, cette solution de mise à l'échelle est spécifique à une application et ne peut pas être utilisée pour mettre à l'échelle des contrats intelligents à usage général.

Le principal projet qui tire parti de la puissance des canaux d'état sur Ethereum est Raiden. Le concept de canaux de paiement est également largement utilisé par le Lightning Network de Bitcoin.

#### Plasma (6:04) {#plasma-604}

Plasma est une solution de mise à l'échelle de couche 2 (l2) qui a été initialement proposée par Joseph Poon et Vitalik Buterin. C'est un cadre de travail pour créer des applications scalables sur Ethereum.

Plasma tire parti de l'utilisation de contrats intelligents et d'arbres de Merkle pour permettre la création d'un nombre illimité de chaînes enfants — des copies de la chaîne de blocs Ethereum parente. Le déchargement des transactions de la chaîne principale vers les chaînes enfants permet des transactions rapides et peu coûteuses.

L'un des inconvénients de Plasma est une longue période d'attente pour les utilisateurs qui souhaitent retirer leurs fonds de la couche 2 (l2). Plasma, tout comme les canaux, ne peut pas être utilisé pour mettre à l'échelle des contrats intelligents à usage général. Le réseau OMG est construit sur sa propre implémentation de Plasma appelée More Viable Plasma. Matic Network est un autre exemple de plateforme utilisant une version adaptée du cadre de travail Plasma.

#### Chaînes latérales (7:08) {#sidechains-708}

Les chaînes latérales sont des chaînes de blocs indépendantes compatibles avec Ethereum, avec leurs propres modèles de consensus et paramètres de bloc. L'interopérabilité avec Ethereum est rendue possible en utilisant la même machine virtuelle Ethereum (EVM), de sorte que les contrats déployés sur la couche de base d'Ethereum peuvent être directement déployés sur la chaîne latérale.

xDai est un exemple d'une telle chaîne latérale.

#### Rollup ZK (8:11) {#zk-rollups-811}

Les rollup offrent une mise à l'échelle en regroupant — ou en « enroulant » — les transactions de la chaîne latérale en une seule transaction et en générant une preuve cryptographique, également connue sous le nom de SNARK (Succinct Non-interactive Argument of Knowledge). Seule cette preuve est soumise à la couche de base. Avec les rollup, tout l'état et l'exécution des transactions sont gérés dans les chaînes latérales ; la chaîne principale Ethereum ne stocke que les données de transaction.

Il existe deux types de rollup : les rollup à divulgation nulle de connaissance (ZK) et les rollup optimistes.

Les rollup ZK, bien qu'ils soient plus rapides et plus efficaces que les rollup optimistes, n'offrent pas de moyen facile pour les contrats intelligents existants de migrer vers la couche 2 (l2).

Les rollup optimistes exécutent une machine virtuelle compatible EVM appelée OVM (Optimistic Virtual Machine), qui permet d'exécuter les mêmes contrats intelligents que ceux qui peuvent être exécutés sur Ethereum. C'est très important car cela permet aux contrats intelligents existants de maintenir plus facilement leur composabilité, ce qui est extrêmement pertinent dans la finance décentralisée (DeFi) où tous les contrats intelligents majeurs ont déjà fait leurs preuves.

L'un des principaux projets travaillant sur les rollup optimistes est Optimism, qui se rapproche de plus en plus du lancement de son Réseau principal. En ce qui concerne les rollup ZK, Loopring et DeversiFi sont de bons exemples d'échanges décentralisés construits sur la couche 2 (l2). De plus, nous avons zkSync qui permet des paiements crypto scalables.

#### Une feuille de route centrée sur les rollup (9:18) {#a-rollup-centric-roadmap-918}

La scalabilité des rollup peut également être amplifiée par Ethereum 2.0. En fait, comme les rollup n'ont besoin que de la mise à l'échelle de la couche de données, ils peuvent déjà bénéficier d'un énorme coup de pouce dans la phase 1 d'Ethereum 2.0, qui concerne les chaînes de fragments de données.

Malgré un éventail de solutions de mise à l'échelle de couche 2 (l2) disponibles, il semble que la communauté Ethereum converge vers l'approche consistant à mettre à l'échelle principalement via les rollup et les chaînes de fragments de données de la phase 1 d'Ethereum 2.0. Cette approche a également été confirmée dans un récent article de Vitalik Buterin intitulé « A Rollup-Centric Ethereum Roadmap ».

Dans de futures vidéos, nous explorerons la mise à l'échelle de la couche de base avec Ethereum 2.0 et comment la mise à l'échelle de la couche 1 (l1) et de la couche 2 (l2) peut aider à rendre la finance décentralisée (DeFi) plus accessible à tous.