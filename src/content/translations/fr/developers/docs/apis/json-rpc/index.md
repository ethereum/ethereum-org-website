---
title: API JSON-RPC
description: Un protocole allégé de procédure à distance (RPC) pour les clients Ethereum.
lang: fr
---

Afin qu'une application logicielle interagisse avec la blockchain Ethereum (en lisant les données de la blockchain et/ou en envoyant des transactions au réseau), il doit se connecter à un nœud Ethereum.

À cet effet, chaque client [Ethereum](/developers/docs/nodes-and-clients/#execution-clients) implémente une spécification [JSON-RPC](http://www.jsonrpc.org/specification), ainsi il existe un ensemble uniforme de méthodes sur lesquelles les applications peuvent compter.

JSON-PRC est un protocole allégé de procédure à distance (RPC). En premier lieu, la spécification définit plusieurs structures de données et les règles autour de leur traitement. C'est un système de transport agnostique en ce sens que les concepts peuvent être utilisés dans le même processus, via les sockets et HTTP, ou dans de nombreux environnements de passage de messages. Il utilise JSON (RFC 4627) comme format de données.

## Ressources JSON-RPC {#json-rpc-resources}

- [Spécification Ethereum JSON-RPC](https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/ethereum/eth1.0-apis/assembled-spec/openrpc.json&uiSchema[appBar][ui:splitView]=true&uiSchema[appBar][ui:input]=false&uiSchema[appBar][ui:examplesDropdown]=false)
- [Dépôt GitHub de la spécification Ethereum JSON-RPC](https://github.com/ethereum/eth1.0-apis)

## Implémentations de client {#client-implementations}

Les clients Ethereum peuvent chacun utiliser différents langages de programmation lors de l'implémentation de la spécification JSON-RPC. Consultez la documentation individuelle [client](/developers/docs/nodes-and-clients/#execution-clients) pour plus de détails concernant des langages de programmation spécifiques. Nous vous recommandons de consulter la documentation de chaque client pour connaître les dernières informations de support de l'API.

## Librairies pratiques {#convenience-libraries}

Bien que vous puissiez choisir d'interagir directement avec les clients Ethereum via l'API JSON-RPC, il y a souvent des options plus faciles pour les développeurs de dapp. De nombreuses librairies [JavaScript](/developers/docs/apis/javascript/#available-libraries) et [backend API](/developers/docs/apis/backend/#available-libraries) existent pour fournir des wrappers sur l'API JSON-RPC. Avec ces bibliothèques, les développeurs peuvent écrire de manières intuitives des méthodes d'une seule ligne pour initialiser les requêtes JSON-RPC (sans avoir besoin d'en voir les détails) qui interagissent avec Ethereum.

## Sujets connexes {#related-topics}

- [Nœuds et clients](/developers/docs/nodes-and-clients/)
- [API JavaScript](/developers/docs/apis/javascript/)
- [API backend](/developers/docs/apis/backend/)
