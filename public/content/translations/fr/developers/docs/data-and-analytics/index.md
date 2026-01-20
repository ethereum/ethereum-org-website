---
title: Données et analyses
description: Comment obtenir des analyses et des données en chaîne utiles pour vos dApps
lang: fr
---

## Introduction {#Introduction}

À mesure que l'utilisation du réseau continue de croître, une quantité croissante d'informations précieuses existera dans les données en chaîne. Au fur et à mesure que le volume des données augmente, le calcul et l'assemblage de ces informations pour faire un compte rendu ou faire fonctionner une dApp peut devenir long et nécessiter de gros efforts.

Les fournisseurs de données existants peuvent accélérer le développement, produire des résultats plus précis et réduire les efforts de maintenance. Cela permettra à une équipe de se concentrer sur la fonctionnalité de base que son projet essaie de fournir.

## Prérequis {#prerequisites}

Vous devez comprendre le concept de base des [Explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers/) afin de mieux comprendre leur utilisation dans le contexte de l'analyse des données. De plus, familiarisez-vous avec le concept d'[index](/glossary/#index) pour comprendre les avantages qu'ils apportent à la conception d'un système.

En termes de fondamentaux architecturaux, comprendre ce qu'est une [API](https://www.wikipedia.org/wiki/API) et [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), même en théorie.

## Explorateurs de blocs {#block-explorers}

De nombreux [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers/) proposent des passerelles [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) qui offrent aux développeurs une visibilité sur les données en temps réel des blocs, des transactions, des validateurs, des comptes et d'autres activités en chaîne.

Les développeurs peuvent ensuite traiter et transformer ces données pour offrir à leurs utilisateurs des informations uniques et des interactions avec la [blockchain](/glossary/#blockchain). Par exemple, [Etherscan](https://etherscan.io) et [Blockscout](https://eth.blockscout.com) fournissent des données d'exécution et de consensus pour chaque créneau de 12 s.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) est un protocole d'indexation qui offre un moyen simple d'interroger les données de la blockchain via des API ouvertes appelées sous-graphes.

Avec The Graph, les développeurs peuvent bénéficier de :

- Indexation décentralisée : Permet d’indexer les données de la blockchain via plusieurs indexeurs, éliminant ainsi tout point de défaillance unique
- Requêtes GraphQL : Offre une interface GraphQL puissante pour interroger des données indexées, ce qui rend la récupération des données très simple
- Personnalisation : Définissez votre propre logique pour transformer et stocker les données de la blockchain, et réutilisez les sous-graphes publiés par d'autres développeurs sur The Graph Network.

Suivez ce guide de [démarrage rapide](https://thegraph.com/docs/en/quick-start/) pour créer, déployer et interroger un sous-graphe en moins de 5 minutes.

## Diversité des clients {#client-diversity}

[La diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) est importante pour la santé globale du réseau Ethereum, car elle offre une résilience face aux bogues et aux exploits. Il existe maintenant plusieurs tableaux de bord sur la diversité des clients, notamment [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) et [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) prétraite les données de la blockchain en tables de base de données relationnelles (DuneSQL), permet aux utilisateurs d'interroger les données de la blockchain en utilisant SQL et de construire des tableaux de bord basés sur les résultats des requêtes. Les données en chaîne sont organisées en 4 tables brutes : `blocks`, `transactions`, (événement) `logs` et (appel) `traces`. Les contrats et protocoles populaires ont été décodés et chacun a son propre ensemble de tables d'événements et d'appels. Ces tables d'événements et d'appels sont traitées et organisées en tables d'abstraction par le type de protocoles, par exemple, dex, prêt, stablecoins, etc.

## SQD {#sqd}

[SQD](https://sqd.dev/) est une plateforme de données décentralisée, hyper-scalable, optimisée pour offrir un accès efficace et sans permission à de grands volumes de données. Il fournit actuellement des données historiques on-chain, y compris les journaux d’événements, les reçus de transaction, les traces et les différences d’état par transaction. SQD offre un ensemble d’outils puissants pour créer des pipelines personnalisés d’extraction et de traitement des données, atteignant une vitesse d’indexation allant jusqu’à 150k blocs par seconde.

Pour commencer, consultez la [documentation](https://docs.sqd.dev/) ou regardez des [exemples EVM](https://github.com/subsquid-labs/squid-evm-examples) de ce que vous pouvez construire avec SQD.

## SubQuery Network {#subquery-network}

[SubQuery](https://subquery.network/) est un indexeur de données de premier plan qui offre aux développeurs des API rapides, fiables, décentralisées et personnalisées pour leurs projets web3. Suber permet aux développeurs de plus de 165+ écosystèmes (y compris Ethereum) de disposer de riches données indexées pour construire des expériences intuitives et immersives pour leurs utilisateurs. Le réseau SubQuery alimente votre application inarrêtable avec un réseau d'infrastructures résiliant et décentralisé. Utilisez la boite à outils de développeur blockchain de SubQuery pour construire les applications Web3 du futur, sans passer de temps à concevoir un backend personnalisé pour les activités de traitement de données.

Pour commencer, consultez le [guide de démarrage rapide d'Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) pour commencer à indexer les données de la blockchain Ethereum en quelques minutes dans un environnement Docker local à des fins de test avant la mise en service sur le [service géré de SubQuery](https://managedservice.subquery.network/) ou sur le [réseau décentralisé de SubQuery](https://app.subquery.network/dashboard).

## Langage de requête EVM {#evm-query-language}

Le langage de requête EVM (EQL) est un langage similaire au SQL, conçu pour interroger les chaînes compatibles avec la machine virtuelle Ethereum (EVM). L’objectif principal d’EQL est de prendre en charge des requêtes relationnelles complexes sur les entités principales des chaînes EVM (blocs, comptes et transactions), tout en offrant aux développeurs et chercheurs une syntaxe ergonomique pour une utilisation quotidienne. Avec EQL, les développeurs peuvent récupérer des données de la blockchain en utilisant une syntaxe familière proche du SQL, ce qui leur permet d’éliminer le besoin de code standard complexe. EQL prend en charge les requêtes standards de données blockchain (par exemple, récupérer le nonce et le solde d’un compte sur Ethereum, ou obtenir la taille et l’horodatage du bloc actuel) et ajoute en permanence la prise en charge de requêtes plus complexes et de nouvelles fonctionnalités.

## En savoir plus {#further-reading}

- [Exploration des données cryptographiques I : Architectures de flux de données](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Aperçu du réseau Graph](https://thegraph.com/docs/en/about/)
- [Playground de requêtes Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemples de code d'API sur Etherscan](https://etherscan.io/apis#contracts)
- [Documentation de l'API sur Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorateur de la Chaîne phare Beaconcha.in](https://beaconcha.in)
- [Les bases de Dune](https://docs.dune.com/#dune-basics)
- [Guide de démarrage rapide SubQuery pour Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Aperçu du réseau SQD](https://docs.sqd.dev/)
- [Langage de requête EVM](https://eql.sh/blog/alpha-release-notes)
