---
title: Fragmentation
description: Apprenez-en plus sur la fragmentation - la division et la répartition des données chargées nécessaires pour offrir à Ethereum des capacités supérieures de transaction et faciliter leur exécution.
lang: fr
template: upgrade
image: ../../../../../assets/upgrades/newrings.png
summaryPoint1: La fragmentation est une mise à niveau en plusieurs phases visant à améliorer l'évolutivité et la capacité d'Ethereum.
summaryPoint2: La fragmentation assure une distribution sécurisée des besoins en matière de stockage des données, rendant les rollups encore plus économiques et les nœuds plus faciles à exploiter.
summaryPoint3: Elles permettent aux solutions de couche 2 de proposer de faibles frais de transaction tout en profitant de la sécurité d'Ethereum.
summaryPoint4: Cette mise à niveau est devenue plus importante depuis qu'Ethereum est passé à la preuve d'enjeu.
---

<UpgradeStatus dateKey="page-upgrades-shards-date">
    La fragmentation pourrait intervenir courant 2023. La fragmentation offrira à Ethereum une plus grande capacité à stocker et à accéder aux données, mais elle ne sera pas utilisée pour l'exécution du code.
</UpgradeStatus>

## Qu'est ce que la fragmentation ? {#what-is-sharding}

La fragmentation (sharding) est le processus qui consiste à diviser une base de données horizontalement pour répartir la charge - c'est un concept courant en informatique. Dans le contexte Ethereum, la fragmentation fonctionnera de façon synergique avec les [rollups de couche 2](/layer-2/) en divisant le fardeau de la gestion de la grande quantité de données nécessaire pour les rollups sur l'ensemble du réseau. Cela continuera à réduire la congestion du réseau et à augmenter les transactions par seconde.

C'est important pour des raisons autres que l'évolutivité.

## Caractéristiques de la fragmentation {#features-of-sharding}

### Tout le monde peut exécuter un nœud {#everyone-can-run-a-node}

La fragmentation est un bon moyen de dimensionner si vous souhaitez que les choses restent décentralisées, car l'alternative consiste à mettre à l'échelle en augmentant la taille de la base de données existante. Cela rendrait Ethereum moins accessible aux validateurs de réseau car ils auraient besoin d'ordinateurs puissants et coûteux. Avec la fragmentation, les validateurs ne seront plus tenus de stocker toutes ces données eux-mêmes, mais à la place pourront utiliser des techniques de données pour confirmer que les données ont été rendues disponibles par le réseau dans son ensemble. Cela réduit considérablement le coût de stockage des données sur la couche 1 en réduisant les exigences matérielles.

### Plus de participation au réseau {#more-network-participation}

La fragmentation vous permettra tôt ou tard de faire fonctionner Ethereum sur un ordinateur portable ou un téléphone personnel. Ainsi, un plus grand nombre de personnes devraient pouvoir participer, ou lancer des [clients](/developers/docs/nodes-and-clients/), dans un fragment Ethereum. La sécurité sera renforcée car plus le réseau est décentralisé, plus la surface d'attaque est réduite.

Les exigences en matière de matériel étant moins élevées, la fragmentation permettra plus facilement l'exécution des [clients](/developers/docs/nodes-and-clients/) par vous-même, sans avoir recours à aucun service intermédiaire. Et si vous le pouvez, pensez à exécuter plusieurs clients. Cela peut contribuer à la santé du réseau en réduisant davantage les points de défaillance.

<br />

<InfoBanner isWarning>
  Vous devrez exécuter un client d'exécution en même temps que votre client de consensus. <a href="https://launchpad.ethereum.org" target="_blank">Le tableau de bord</a> vous guidera à travers les exigences matérielles et les processus.
</InfoBanner>

## Chaînes de fragments version 1 : disponibilité des données {#data-availability}

<InfoBanner emoji=":construction:" isWarning>
  <strong>Remarque :</strong> Les plans pour la fragmentation ont évolué au fur et à mesure que des chemins plus efficaces de mise à l'échelle ont été développés. Le « Danksharding » est une nouvelle approche de fragmentation, qui n'utilise pas le concept de « chaînes » fragmentées mais utilise à la place des « blobs » de fragmentation pour séparer les données, avec « l'échantillonnage de données disponibles » pour confirmer que toutes les données ont été rendues disponibles. Ce changement de plan résout le même problème initial.<br/><br/>
  <strong>Les détails ci-dessous peuvent être obsolètes avec les derniers plans de développement.</strong> Pendant les mises à jour, découvrez <a href="https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum">Le Guide du Hitchhiker pour Ethereum</a> pour une excellente découverte de la feuille de route d'Ethereum.
</InfoBanner>

Lorsque les premières chaînes de fragments seront expédiées, elles ne fourniront que des données supplémentaires au réseau. Elles ne traiteront pas les transactions ni les contrats intelligents. Mais elles offriront tout de même des améliorations incroyables en matière de transactions par seconde lorsqu'elles seront combinées avec les rollups.

Les Rollups sont une technologie de "layer 2" qui existe aujourd'hui. Ils permettent aux DApps de regrouper ou de "lancer" des transactions en une seule transaction hors chaîne, de générer une preuve cryptographique et de la soumettre ensuite à la chaîne. Cela réduit les données nécessaires pour une transaction. Combinez ceci avec toutes les données supplémentaires fournies par les fragments et vous obtenez 100 000 transactions par seconde.

## Chaînes de fragments version 2 : exécution de code {#code-execution}

Le plan a toujours été d'ajouter des fonctionnalités supplémentaires aux fragments, pour les rendre plus similaires au réseau principal [Ethereum](/glossary/#mainnet) actuel. Cela leur permettra de stocker et d'exécuter du code et de gérer les transactions, car chaque fragment contiendra un ensemble unique de contrats intelligents et de soldes de comptes. La communication transversale permettra de réaliser des transactions entre les fragments.

Au regard de l'augmentation des transactions par seconde que la version 1 des fragments apporte, cela est-il encore nécessaire ? Cette question est toujours débattue au sein de la communauté et il semble qu'il y ait quelques options.

### Les fragments doivent-ils être exécutés ? {#do-shards-need-code-execution}

Vitalik Buterin, en parlant au Bankless podcast, a présenté 3 options potentielles qui valent la peine d'être discutées.

<YouTube id="-R0j5AMUSzA" start="5841" />

#### 1. Exécution d'état non requise {#state-execution-not-needed}

Cela signifierait que nous ne donnerions pas aux fragments la capacité de gérer des contrats intelligents et que nous les utiliserions seulement comme dépôts de données.

#### 2. Avoir des fragments d'exécution {#some-execution-shards}

Il existe peut-être un compromis où nous n’avons pas besoin de tous les fragments pour être plus intelligents. Nous pourrions simplement ajouter cette fonctionnalité à quelques fragments, et pas aux autres. Cela pourrait accélérer l'implémentation.

#### 3. Attendre de pouvoir faire des snarks Zero Knowledge (ZK) {#wait-for-zk-snarks}

Enfin, peut-être devrions-nous revenir sur ce débat lorsque les pièges de ZK seront renforcés. C'est une technologie qui pourrait contribuer à apporter des transactions véritablement privées au réseau. Il est probable qu’ils auront besoin de fragments plus intelligents, mais ils sont toujours en recherche et développement.

#### Autres sources {#other-sources}

Voici d'autres réflexions qui vont dans le même sens :

- [Phase 1 et terminée : Eth2 comme moteur de disponibilité des données](https://ethresear.ch/t/phase-one-and-done-eth2-as-a-data-availability-engine/5269/8) – _cdetrio, ethresear.ch_

Ce point de discussion reste actif. Nous mettrons à jour ces pages dès que nous aurons plus d’informations.

## Relations entre les mises à niveau {#relationship-between-upgrades}

Les mises à niveau d'Ethereum sont plus ou moins interdépendantes. Récapitulons donc comment les chaînes de fragments sont liées aux autres mises à niveau.

### La fragmentation et la blockchain Ethereum {#shards-and-blockchain}

La logique de sécurisation et de synchronisation des fragments est intégrée dans les clients Ethereum qui construisent la blockchain. Les validateurs du réseau seront assignés aux fragments sur lesquels travailler. Les fragments auront accès à des instantanés d'autres fragments pour qu'ils puissent construire une vue de l'état d'Ethereum pour garder tout à jour.

### En savoir plus {#read-more}

<ShardChainsList />
