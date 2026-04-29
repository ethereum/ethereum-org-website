---
title: "Rollups : l'ultime stratégie de mise à l'échelle d'Ethereum ?"
description: "Une exploration détaillée des rollups en tant que stratégie principale de mise à l'échelle d'Ethereum. Cette vidéo explique le fonctionnement des rollups optimistes (Arbitrum, Optimism) et des rollups à divulgation nulle de connaissance."
lang: fr
youtubeId: "7pWxCklcNsU"
uploadDate: 2021-04-14
duration: "0:16:37"
educationLevel: intermediate
topic:
  - "mise à l'échelle"
  - "rollups"
  - "rollups-optimistes"
  - "rollups-zk"
format: explainer
author: Finematics
breadcrumb: "Rollups"
---

Une explication par **Finematics** couvrant les rollups comme stratégie principale de mise à l'échelle d'Ethereum. La vidéo compare les rollups optimistes (Arbitrum, Optimism) avec les rollups ZK, et examine pourquoi les rollups sont devenus la méthode dominante pour la mise à l'échelle d'Ethereum.

*Cette transcription est une copie accessible de la [transcription originale de la vidéo](https://www.youtube.com/watch?v=7pWxCklcNsU) publiée par Finematics. Elle a été légèrement modifiée pour en faciliter la lecture.*

#### Couche 2 (1:17) {#layer-2-117}

La mise à l'échelle d'Ethereum a été l'un des sujets les plus discutés dans la crypto. Le débat sur la mise à l'échelle s'intensifie généralement pendant les périodes de forte activité du réseau, telles que l'engouement pour les CryptoKitties en 2017, l'été de la finance décentralisée (DeFi) en 2020, ou le marché haussier de la crypto au début de 2021. Pendant ces périodes, la demande sans précédent pour le réseau Ethereum a entraîné des frais de gaz extrêmement élevés, rendant le paiement de leurs transactions coûteux pour les utilisateurs quotidiens.

Pour s'attaquer à ce problème, la recherche de l'ultime solution de mise à l'échelle a été l'une des principales priorités pour de nombreuses équipes et pour la communauté Ethereum dans son ensemble.

En général, il existe trois manières principales de mettre à l'échelle Ethereum — ou en fait, la plupart des autres chaînes de blocs : mettre à l'échelle la chaîne de blocs elle-même (mise à l'échelle de la couche 1 (l1)), construire par-dessus la couche 1 (mise à l'échelle de la couche 2 (l2)), et construire à côté de la couche 1 (chaînes latérales).

#### En dehors de la couche 1 (1:58) {#outside-of-layer-1-158}

En ce qui concerne la couche 1, Eth2 est la solution choisie pour la mise à l'échelle de la chaîne de blocs Ethereum. Eth2 fait référence à un ensemble de changements interconnectés tels que la migration vers la preuve d'enjeu (PoS), la fusion de l'état de la chaîne de blocs à preuve de travail (PoW) vers la nouvelle chaîne à preuve d'enjeu, et les fragments. Les fragments, en particulier, peuvent augmenter considérablement le débit du réseau Ethereum, surtout lorsqu'ils sont combinés avec les rollups.

Lorsqu'il s'agit de la mise à l'échelle en dehors de la couche 1, plusieurs solutions de mise à l'échelle différentes ont été essayées avec des résultats mitigés. D'une part, nous avons des solutions de couche 2 telles que les canaux qui sont entièrement sécurisées par Ethereum mais qui ne fonctionnent bien que pour un ensemble spécifique d'applications. Les chaînes latérales, d'autre part, sont généralement compatibles avec l'EVM et peuvent mettre à l'échelle des applications à usage général. L'inconvénient principal est qu'elles sont moins sécurisées que les solutions de couche 2 en ne s'appuyant pas sur la sécurité d'Ethereum et en ayant plutôt leurs propres modèles de consensus.

La plupart des rollups visent à obtenir le meilleur de ces deux mondes en créant une solution de mise à l'échelle à usage général tout en s'appuyant entièrement sur la sécurité d'Ethereum. C'est le Saint Graal de la mise à l'échelle, car cela permet de déployer tous les contrats intelligents existants présents sur Ethereum vers un rollup avec peu ou pas de modifications sans sacrifier la sécurité. Il n'est pas étonnant que les rollups soient probablement la solution de mise à l'échelle la plus attendue de toutes.

Un rollup est un type de solution de mise à l'échelle qui fonctionne en exécutant des transactions en dehors de la couche 1 mais en publiant les données de transaction sur la couche 1. Cela permet au rollup de mettre à l'échelle le réseau tout en tirant sa sécurité du consensus d'Ethereum. Le déplacement du calcul hors chaîne permet essentiellement de traiter plus de transactions au total, car seule une partie des données des transactions du rollup doit tenir dans les blocs Ethereum.

Pour y parvenir, les transactions du rollup sont exécutées sur une chaîne séparée qui peut même exécuter une version de l'EVM spécifique au rollup. L'étape suivante après l'exécution des transactions sur un rollup consiste à les regrouper et à les publier sur la chaîne principale Ethereum. L'ensemble du processus exécute essentiellement les transactions, prend les données, les compresse et les enroule vers la chaîne principale en un seul lot — d'où le nom « rollup ».

Chaque rollup déploie un ensemble de contrats intelligents sur la couche 1 qui sont responsables du traitement des dépôts et des retraits ainsi que de la vérification des preuves. Les preuves sont également là où la distinction principale entre les différents types de rollups entre en jeu. Les rollups optimistes utilisent des preuves de fraude, tandis que les rollups ZK utilisent des preuves de validité.

#### Rollups optimistes (4:26) {#optimistic-rollups-426}

Les rollups optimistes publient des données sur la couche 1 et supposent qu'elles sont correctes — d'où le nom « optimiste ». Si les données publiées sont valides, nous sommes sur la bonne voie et rien d'autre ne doit être fait. Le rollup optimiste bénéficie du fait de ne pas avoir à effectuer de travail supplémentaire dans le scénario optimiste.

En cas de transaction invalide, le système doit être capable de l'identifier, de récupérer l'état correct et de pénaliser la partie qui soumet une telle transaction. Pour y parvenir, les rollups optimistes mettent en œuvre un système de résolution des litiges capable de vérifier les preuves de fraude, de détecter les transactions frauduleuses et de dissuader les acteurs malveillants de soumettre d'autres transactions invalides ou des preuves de fraude incorrectes.

Dans la plupart des implémentations de rollups optimistes, la partie qui est capable de soumettre des lots de transactions à la couche 1 doit fournir une caution, généralement sous forme d'ETH. Tout autre participant au réseau peut soumettre une preuve de fraude s'il repère une transaction incorrecte. Après la soumission d'une preuve de fraude, le système entre en mode de résolution des litiges. Dans ce mode, la transaction suspecte est exécutée à nouveau — cette fois sur la chaîne principale Ethereum. Si l'exécution prouve que la transaction était effectivement frauduleuse, la partie qui a soumis cette transaction est punie, généralement en subissant une réduction de son ETH mis en caution.

Pour empêcher les acteurs malveillants de spammer le réseau avec des preuves de fraude incorrectes, les parties souhaitant soumettre des preuves de fraude doivent généralement aussi fournir une caution qui peut faire l'objet d'une réduction.

Afin de pouvoir exécuter une transaction de rollup sur la couche 1, les rollups optimistes doivent mettre en œuvre un système capable de rejouer une transaction avec l'état exact qui était présent lorsque la transaction a été initialement exécutée sur le rollup. C'est l'une des parties complexes des rollups optimistes et cela est généralement réalisé en créant un contrat gestionnaire séparé qui remplace certains appels de fonction par un état provenant du rollup.

Le système peut fonctionner comme prévu et détecter la fraude même s'il n'y a qu'une seule partie honnête qui surveille l'état du rollup et soumet des preuves de fraude si nécessaire. En raison des incitations correctes au sein du système de rollup, l'entrée dans le processus de résolution des litiges devrait être une situation exceptionnelle et non quelque chose qui se produit tout le temps.

En ce qui concerne les rollups ZK, il n'y a aucune résolution de litige. Cela est possible en tirant parti d'un élément astucieux de cryptographie appelé preuves à divulgation nulle de connaissance — d'où le nom de rollups ZK. Dans ce modèle, chaque lot publié sur la couche 1 inclut une preuve cryptographique appelée ZK-SNARK. La preuve peut être rapidement vérifiée par le contrat de la couche 1 lorsque le lot de transactions est soumis, et les lots invalides peuvent être rejetés immédiatement.

#### Autres différences (7:28) {#other-differences-728}

En raison de la nature du processus de résolution des litiges, les rollups optimistes doivent donner suffisamment de temps à tous les participants du réseau pour soumettre des preuves de fraude avant de finaliser une transaction sur la couche 1. Cette période est généralement assez longue — pour s'assurer que même dans le pire des cas, les transactions frauduleuses peuvent toujours être contestées. Cela rend les retraits des rollups optimistes assez longs, car les utilisateurs doivent attendre jusqu'à une semaine ou deux pour pouvoir retirer leurs fonds vers la couche 1.

Heureusement, quelques projets travaillent à améliorer cette situation en fournissant des « sorties de liquidité » rapides. Ces projets offrent des retraits presque instantanés vers la couche 1, une autre couche 2, ou même une chaîne latérale et facturent de petits frais pour ce service. Le Hop Protocol et Connext sont des projets à surveiller.

Les rollups ZK n'ont pas le problème des retraits longs, car les fonds sont disponibles pour les retraits dès que le lot du rollup, accompagné d'une preuve de validité, est soumis à la couche 1.

Cependant, les rollups ZK présentent leurs propres inconvénients. En raison de la complexité de la technologie, il est beaucoup plus difficile de créer un rollup ZK compatible avec l'EVM, ce qui rend plus difficile la mise à l'échelle d'applications à usage général sans avoir à réécrire la logique de l'application. Cela dit, zkSync fait des progrès significatifs dans ce domaine et ils pourraient être en mesure de lancer un rollup ZK compatible avec l'EVM très bientôt.

Les rollups optimistes ont un peu plus de facilité avec la compatibilité EVM. Ils doivent toujours exécuter leur propre version de l'EVM avec quelques modifications, mais 99 % des contrats peuvent être portés sans apporter de modifications. Les rollups ZK sont également beaucoup plus lourds en calcul que les rollups optimistes, ce qui signifie que les nœuds qui calculent les preuves ZK doivent être des machines très performantes, rendant difficile pour d'autres utilisateurs de les exécuter.

#### Améliorations de la mise à l'échelle (9:32) {#scaling-improvements-932}

En ce qui concerne les améliorations de la mise à l'échelle, les deux types de rollups devraient être capables de mettre à l'échelle Ethereum d'environ 15 à 45 transactions par seconde (selon le type de transaction) jusqu'à 1 000 à 4 000 transactions par seconde. Il convient de noter qu'il est possible de traiter encore plus de transactions par seconde en offrant plus d'espace pour les lots de rollups sur la couche 1.

C'est aussi pourquoi Eth2 peut créer une synergie massive avec les rollups, car il augmente l'espace de disponibilité des données possible en créant de multiples fragments — chacun d'eux étant capable de stocker une quantité importante de données. La combinaison d'Eth2 et des rollups pourrait porter la vitesse de transaction d'Ethereum jusqu'à 100 000 transactions par seconde.

Optimism et Arbitrum sont actuellement les options les plus populaires en ce qui concerne les rollups optimistes. Optimism a été partiellement déployé sur le Réseau principal Ethereum avec un ensemble limité de partenaires tels que Synthetix et Uniswap pour s'assurer que la technologie fonctionne comme prévu avant le lancement complet. Arbitrum a déjà déployé sa version sur le Réseau principal et a commencé l'intégration de différents projets dans son écosystème.

Certains des projets les plus notables lancés sur Arbitrum incluent Uniswap, Sushi, Bancor, Augur, Chainlink, Aave, et bien d'autres. Arbitrum a également annoncé son partenariat avec Reddit, se concentrant sur le lancement d'une chaîne de rollup séparée pour mettre à l'échelle leur système de récompense. Optimism s'associe à MakerDAO pour créer le pont Optimism Dai et permettre des retraits rapides de DAI et d'autres jetons vers la couche 1.

Bien qu'Arbitrum et Optimism essaient tous deux d'atteindre le même objectif — construire des solutions de rollups optimistes compatibles avec l'EVM — il y a quelques différences dans leur conception. Arbitrum a un modèle de résolution des litiges différent. Au lieu de réexécuter une transaction entière sur la couche 1 pour vérifier si la preuve de fraude est valide, ils ont mis au point un modèle interactif à plusieurs tours qui permet de restreindre la portée du litige et d'exécuter potentiellement seulement quelques instructions sur la couche 1 pour vérifier si une transaction suspecte est valide.

Une autre différence majeure est l'approche de la gestion de l'ordre des transactions et de la MEV. Arbitrum exécutera initialement un séquenceur responsable de l'ordre des transactions, mais ils souhaitent le décentraliser à long terme. Optimism préfère une autre approche où l'ordre des transactions — et donc la MEV — peut être mis aux enchères à d'autres parties pour une certaine période de temps.

#### Rollups ZK (13:10) {#zk-rollups-1310}

Bien qu'il semble que la communauté Ethereum se concentre principalement sur les rollups optimistes — du moins à court terme — les projets travaillant sur les rollups ZK progressent également extrêmement rapidement.

Loopring utilise la technologie des rollups ZK pour mettre à l'échelle son protocole d'échange et de paiement. Hermez et ZKTube travaillent sur la mise à l'échelle des paiements en utilisant des rollups ZK, Hermez construisant également un rollup ZK compatible avec l'EVM. Aztec se concentre sur l'apport de fonctionnalités de confidentialité à leur technologie de rollup ZK.

Les rollups basés sur StarkWare sont déjà largement utilisés par des projets tels que DeversiFi, Immutable X et dYdX. Comme mentionné précédemment, zkSync travaille sur une machine virtuelle compatible avec l'EVM qui sera capable de prendre entièrement en charge n'importe quels contrats intelligents arbitraires écrits en Solidity.

#### DeFi (14:02) {#defi-1402}

Les rollups devraient également avoir un impact important sur la DeFi. Les utilisateurs qui n'étaient auparavant pas en mesure d'effectuer des transactions sur Ethereum en raison des frais de transaction élevés pourront rester dans l'écosystème la prochaine fois que l'activité du réseau sera forte. Les rollups permettront également l'émergence d'une nouvelle génération d'applications qui nécessitent des transactions moins chères et un temps de confirmation plus rapide — tout en étant entièrement sécurisées par le consensus d'Ethereum. Il semble que les rollups pourraient déclencher une autre période de forte croissance pour la DeFi.

#### Défis (14:29) {#challenges-1429}

Il y a cependant quelques défis en ce qui concerne les rollups. La composabilité en est un — afin de composer une transaction qui utilise plusieurs protocoles, tous devraient être déployés sur le même rollup.

Un autre défi est la liquidité fracturée. Sans nouvel argent entrant dans l'écosystème Ethereum dans son ensemble, la liquidité existante présente sur la couche 1 dans des protocoles tels qu'Uniswap ou Aave sera partagée entre la couche 1 et de multiples implémentations de rollups. Une liquidité plus faible signifie généralement un glissement plus élevé et une moins bonne exécution des transactions.

Cela signifie également qu'il y aura naturellement des gagnants et des perdants. Pour le moment, l'écosystème Ethereum existant n'est pas assez grand pour utiliser toutes les solutions de mise à l'échelle. Cela pourrait — et va probablement — changer à long terme, mais à court terme, nous pourrions voir certains rollups et d'autres solutions de mise à l'échelle devenir des villes fantômes. À l'avenir, nous pourrions également voir des utilisateurs vivre entièrement au sein d'un seul écosystème de rollup et ne pas interagir avec la chaîne principale Ethereum et d'autres solutions de mise à l'échelle pendant de longues périodes.

#### Menace pour les chaînes latérales (15:44) {#threat-to-sidechains-1544}

Une question qui revient très souvent lors des discussions sur les rollups est de savoir s'ils constituent une menace pour les chaînes latérales. Les chaînes latérales auront toujours leur place dans l'écosystème Ethereum. Bien que le coût des transactions sur la couche 2 soit beaucoup plus bas que sur la couche 1, il sera très probablement encore assez élevé pour exclure certains types d'applications telles que les jeux et d'autres applications à fort volume. Cela pourrait changer lorsqu'Ethereum introduira la création de fragments, mais d'ici là, les chaînes latérales pourraient créer suffisamment d'effet de réseau pour survivre à long terme.

De plus, les frais sur les rollups sont plus élevés que sur les chaînes latérales car chaque lot de rollup doit toujours payer pour l'espace de bloc Ethereum. La communauté Ethereum met énormément l'accent sur les rollups dans la stratégie de mise à l'échelle d'Ethereum — du moins à court et moyen terme, et potentiellement même plus longtemps.