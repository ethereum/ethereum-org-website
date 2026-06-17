---
title: Données et analyses
description: Comment obtenir des analyses et des données onchain à utiliser dans vos applications décentralisées (dapps)
lang: fr
---

## Introduction {#introduction}

À mesure que l'utilisation du réseau continue de croître, une quantité croissante d'informations précieuses existera dans les données onchain. Comme le volume de données augmente rapidement, le calcul et l'agrégation de ces informations pour créer des rapports ou piloter une application décentralisée (dapp) peuvent devenir une entreprise lourde en temps et en processus.

L'exploitation des fournisseurs de données existants peut accélérer le développement, produire des résultats plus précis et réduire les efforts de maintenance continus. Cela permettra à une équipe de se concentrer sur la fonctionnalité de base que son projet tente de fournir.

## Prérequis {#prerequisites}

Vous devez comprendre le concept de base des [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers/) afin de mieux comprendre leur utilisation dans le contexte de l'analyse de données. De plus, familiarisez-vous avec le concept d'un [indice](/glossary/#index) pour comprendre les avantages qu'ils ajoutent à la conception d'un système.

En termes de principes fondamentaux d'architecture, il est utile de comprendre ce que sont une [API](https://www.wikipedia.org/wiki/API) et [REST](https://www.wikipedia.org/wiki/Representational_state_transfer), même en théorie.

## Explorateurs de blocs {#block-explorers}

De nombreux [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers/) offrent des passerelles [API](https://www.wikipedia.org/wiki/API) [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) qui fourniront aux développeurs une visibilité sur les données en temps réel concernant les blocs, les transactions, les validateurs, les comptes et d'autres activités onchain.

Les développeurs peuvent ensuite traiter et transformer ces données pour offrir à leurs utilisateurs des informations et des interactions uniques avec la [chaîne de blocs](/glossary/#blockchain). Par exemple, [Etherscan](https://etherscan.io) et [Blockscout](https://eth.blockscout.com) fournissent des données d'exécution et de consensus pour chaque créneau de 12 s.

## The Graph {#the-graph}

[The Graph](https://thegraph.com/) est un protocole d'indexation qui offre un moyen simple d'interroger les données de la chaîne de blocs via des API ouvertes appelées sous-graphes.

Avec The Graph, les développeurs peuvent bénéficier de :

- Indexation décentralisée : permet d'indexer les données de la chaîne de blocs via plusieurs indexeurs, éliminant ainsi tout point de défaillance unique
- Requêtes GraphQL : fournit une interface GraphQL puissante pour interroger les données indexées, rendant la récupération des données extrêmement simple
- Personnalisation : définissez votre propre logique pour transformer et stocker les données de la chaîne de blocs, et réutilisez les sous-graphes publiés par d'autres développeurs sur le réseau The Graph

Suivez ce guide de [démarrage rapide](https://thegraph.com/docs/en/quick-start/) pour créer, déployer et interroger un sous-graphe en 5 minutes.

## Diversité des clients {#client-diversity}

La [diversité des clients](/developers/docs/nodes-and-clients/client-diversity/) est importante pour la santé globale du réseau Ethereum car elle offre une résilience aux bugs et aux failles. Il existe désormais plusieurs tableaux de bord sur la diversité des clients, notamment [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) et [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) prétraite les données de la chaîne de blocs dans des tables de base de données relationnelle (DuneSQL), permet aux utilisateurs d'interroger les données de la chaîne de blocs à l'aide de SQL et de créer des tableaux de bord basés sur les résultats des requêtes. Les données onchain sont organisées en 4 tables brutes : `blocks`, `transactions`, (événements) `logs` et (appels) `traces`. Les contrats et protocoles populaires ont été décodés, et chacun possède son propre ensemble de tables d'événements et d'appels. Ces tables d'événements et d'appels sont ensuite traitées et organisées en tables d'abstraction par type de protocoles, par exemple, dex, prêt, stablecoins, etc.

## SQD {#sqd}

[SQD](https://sqd.dev/) est une plateforme de données hyper-évolutive et décentralisée, optimisée pour fournir un accès efficace et sans permission à de grands volumes de données. Elle sert actuellement des données onchain historiques, y compris les journaux d'événements, les reçus de transaction, les traces et les différences d'état par transaction. SQD offre une puissante boîte à outils pour créer des pipelines personnalisés d'extraction et de traitement de données, atteignant une vitesse d'indexation allant jusqu'à 150 000 blocs par seconde.

Pour commencer, visitez la [documentation](https://docs.sqd.dev/) ou consultez des [exemples EVM](https://github.com/subsquid-labs/squid-evm-examples) de ce que vous pouvez construire avec SQD.

## Réseau SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) est un indexeur de données de premier plan qui offre aux développeurs des API rapides, fiables, décentralisées et personnalisées pour leurs projets Web3. SubQuery permet aux développeurs de plus de 165 écosystèmes (y compris Ethereum) de disposer de riches données indexées pour créer des expériences intuitives et immersives pour leurs utilisateurs. Le réseau SubQuery alimente vos applications inarrêtables avec un réseau d'infrastructure résilient et décentralisé. Utilisez la boîte à outils de développement de chaîne de blocs de SubQuery pour créer les applications Web3 du futur, sans passer de temps à construire un backend personnalisé pour les activités de traitement de données.

Pour commencer, visitez le [guide de démarrage rapide Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) pour commencer à indexer les données de la chaîne de blocs Ethereum en quelques minutes dans un environnement Docker local à des fins de test avant de passer en production sur un [service géré de SubQuery](https://managedservice.subquery.network/) ou sur le [réseau décentralisé de SubQuery](https://app.subquery.network/dashboard).

## Codex {#codex}

[Codex](https://www.codex.io/) est une API de données de chaîne de blocs en temps réel fournissant des données enrichies pour plus de 70 millions de jetons sur plus de 80 réseaux. Les développeurs peuvent accéder à la tarification structurée des jetons, aux soldes des portefeuilles, à l'historique des transactions et aux analyses agrégées (volume, liquidité, portefeuilles uniques) sans maintenir d'infrastructure d'indexation personnalisée. Codex prend en charge la livraison de données en moins d'une seconde via des intégrations WebSocket et webhook.

Pour commencer, visitez la [documentation](https://docs.codex.io), essayez l'[Explorateur](https://docs.codex.io/explore) ou inscrivez-vous sur le [tableau de bord](https://dashboard.codex.io/signup).

## EVM Query Language {#evm-query-language}

EVM Query Language (EQL) est un langage de type SQL conçu pour interroger les chaînes EVM (Machine Virtuelle Ethereum). L'objectif ultime d'EQL est de prendre en charge des requêtes relationnelles complexes sur les citoyens de première classe de la chaîne EVM (blocs, comptes et transactions) tout en fournissant aux développeurs et aux chercheurs une syntaxe ergonomique pour un usage quotidien. Avec EQL, les développeurs peuvent récupérer les données de la chaîne de blocs en utilisant une syntaxe familière de type SQL et éliminer le besoin de code passe-partout complexe. EQL prend en charge les requêtes de données standard de la chaîne de blocs (par exemple, la récupération du nonce et du solde d'un compte sur Ethereum ou la récupération de la taille et de l'horodatage du bloc actuel) et ajoute continuellement la prise en charge de requêtes et d'ensembles de fonctionnalités plus complexes.

## Lectures complémentaires {#further-reading}

- [Explorer les données crypto I : Architectures de flux de données](https://web.archive.org/web/20250125012042/https://research.2077.xyz/exploring-crypto-data-1-data-flow-architectures)
- [Aperçu du réseau The Graph](https://thegraph.com/docs/en/about/)
- [Terrain de jeu de requêtes The Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Exemples de code API sur Etherscan](https://etherscan.io/apis#contracts)
- [Documentation de l'API sur Blockscout](https://docs.blockscout.com/devs/apis)
- [Explorateur de la chaîne balise Beaconcha.in](https://beaconcha.in)
- [Les bases de Dune](https://docs.dune.com/#dune-basics)
- [Guide de démarrage rapide Ethereum de SubQuery](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
- [Aperçu du réseau SQD](https://docs.sqd.dev/)
- [EVM Query Language](https://eql.sh/blog/alpha-release-notes)

## Tutoriels : Données et analyses / SQL sur Ethereum {#tutorials}

- [Apprendre les sujets fondamentaux d'Ethereum avec SQL](/developers/tutorials/learn-foundational-ethereum-topics-with-sql/) _– Interrogez les données Ethereum onchain avec SQL pour comprendre les principes fondamentaux des transactions, des blocs et du gaz._