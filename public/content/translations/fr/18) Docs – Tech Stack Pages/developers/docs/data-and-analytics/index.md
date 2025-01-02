---
title: Données et analyses
description: Comment obtenir des analyses et des données en chaîne utiles pour vos dApps
lang: fr
---

## Introduction {#Introduction}

À mesure que l'utilisation du réseau continue de croître, une quantité croissante d'informations précieuses existera dans les données en chaîne. Au fur et à mesure que le volume des données augmente, le calcul et l'assemblage de ces informations pour faire un compte rendu ou faire fonctionner une dApp peut devenir long et nécessiter de gros efforts.

Les fournisseurs de données existants peuvent accélérer le développement, produire des résultats plus précis et réduire les efforts de maintenance. Cela permettra à une équipe de se concentrer sur la fonctionnalité de base que son projet essaie de fournir.

## Pré-requis {#prerequisites}

Vous devez comprendre le concept de base des [Explorateurs de bloc](/developers/docs/data-and-analytics/block-explorers/) afin de mieux comprendre leur utilisation dans le contexte de l'analyse des données. De plus, familiarisez-vous avec le concept d'[indice](/glossary/#index) pour comprendre les avantages qu'ils apportent à la conception d'un système.

En termes de fondamentaux architecturaux, comprendre ce qu'est une [API](https://www.wikipedia.org/wiki/API) et un[REST](https://www.wikipedia.org/wiki/Representational_state_transfer) (Representational state transfer), même en théorie.

## Explorateurs de bloc {#block-explorers}

De nombreux [Explorateurs de bloc](/developers/docs/data-and-analytics/block-explorers/) offrent des passerelles [RESTful](https://www.wikipedia.org/wiki/Representational_state_transfer) [API](https://www.wikipedia.org/wiki/API) qui fournissent une visibilité aux développeurs sur les données en temps réel sur les blocs, les transactions, les validateurs, les comptes et autres activités sur la chaîne.

Les développeurs peuvent alors traiter et transformer ces données afin de leur donner leurs informations d'utilisateurs uniques et leurs interactions avec la [blockchain](/glossary/#blockchain). Par exemple, [Etherscan](https://etherscan.io) fournit des données d'exécution et de consensus pour chaque créneau de 12 secondes.

## Le réseau Graph {#the-graph}

Le [réseau Graph](https://thegraph.com/) est un protocole d'indexation décentralisé pour organiser les données de la blockchain. Au lieu de construire et de gérer des stockages de données hors chaîne et centralisés pour agréger les données sur la chaîne, avec The Graph, les développeurs peuvent construire des applications sans serveur qui fonctionnent entièrement sur une infrastructure publique.

En utilisant [GraphQL](https://graphql.org/), les développeurs peuvent interroger n'importe laquelle des API ouvertes organisées, connues sous le nom de sub-graphe, pour acquérir les informations nécessaires pour faire fonctionner leur dApp. En interrogeant ces subs-graphs indexés, les rapports et les dApps non seulement obtiennent des avantages en termes de performances et d'évolutivité, mais obtiennent aussi la précision intégrée fournie par consensus sur le réseau. Au fur et à mesure que de nouvelles améliorations et/ou sub-graphs sont ajoutées au réseau, vos projets peuvent rapidement se renouveler pour tirer parti de ces améliorations.

## Diversité des clients

[La diversité du client](/developers/docs/nodes-and-clients/client-diversity/) est importante pour la santé globale du réseau Ethereum, car elle fournit de la résilience aux bogues et aux exploitations. Il existe désormais plusieurs tableaux de bord sur la diversité des clients, notamment [clientdiversity.org](https://clientdiversity.org/), [rated.network](https://www.rated.network), [supermajority.info](https://supermajority.info//) and [Ethernodes](https://ethernodes.org/).

## Dune Analytics {#dune-analytics}

[Dune Analytics](https://dune.com/) prétraite les données de la blockchain en tables de base de données relationnelles (DuneSQL), permet aux utilisateurs d'interroger les données de la blockchain en utilisant SQL et de construire des tableaux de bord basés sur les résultats des requêtes. Les données sur la chaîne sont réparties en 4 tables brutes : `blocs`, `transactions`, (événement) `logs` et (appel) `traces`. Les contrats et protocoles populaires ont été décodés et chacun a son propre ensemble de tables d'événements et d'appels. Ces tables d'événements et d'appels sont traitées et organisées en tables d'abstraction par le type de protocoles, par exemple, dex, prêt, stablecoins, etc.

## Réseau SubQuery {#subquery-network}

[SubQuery](https://subquery.network/) est un indexeur de données de premier plan qui offre aux développeurs des API rapides, fiables, décentralisées et personnalisées pour leurs projets web3. Suber permet aux développeurs de plus de 165+ écosystèmes (y compris Ethereum) de disposer de riches données indexées pour construire des expériences intuitives et immersives pour leurs utilisateurs. Le réseau SubQuery alimente votre application inarrêtable avec un réseau d'infrastructures résiliant et décentralisé. Utilisez la boite à outils de développeur blockchain de SubQuery pour construire les applications Web3 du futur, sans passer de temps à concevoir un backend personnalisé pour les activités de traitement de données.

Pour commencer, consultez le [guide de démarrage rapide Ethereum](https://academy.subquery.network/quickstart/quickstart_chains/ethereum-gravatar.html) pour commencer à indexer les données de la blockchain Ethereum en quelques minutes dans un environnement Docker local à des fins de test avant de mettre en ligne sur un [service géré de SubQuery](https://managedservice.subquery.network/) ou sur le [réseau décentralisé de SubQuery](https://app.subquery.network/dashboard).

## Ethernow - Le programme de données de la mempool {#ethernow}
[Blocknative](https://www.blocknative.com/) offre un accès ouvert à son [archive de données historique de la mempool](https://www.ethernow.xyz/mempool-data-archive) Ethereum. Cela permet aux chercheurs et aux bons projets communautaires d'explorer la couche pré-chaîne du réseau principal Ethereum. L'ensemble de données est activement maintenu et constitue l'enregistrement historique le plus complet des événements de transaction de la mempool au sein de l'écosystème Ethereum. En savoir plus sur [Ethernow](https://www.ethernow.xyz/).

## Complément d'information {#further-reading}

- [Présentation du réseau Graph](https://thegraph.com/docs/en/about/network/)
- [Bac à sable de requêtes Graph](https://thegraph.com/explorer/subgraph/graphprotocol/graph-network-mainnet?version=current)
- [Examples de code d'APIs sur EtherScan](https://etherscan.io/apis#contracts)
- [Explorateur de Beacon Chain](https://beaconcha.in)
- [Basiques de Dune](https://docs.dune.com/#dune-basics)
- [Guide de démarrage rapide de SubQuery Ethereum](https://academy.subquery.network/indexer/quickstart/quickstart_chains/ethereum-gravatar.html)
