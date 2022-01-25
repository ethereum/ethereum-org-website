---
title: Carburant et frais
description:
lang: fr
sidebar: true
incomplete: true
isOutdated: true
---

Le carburant est un élément essentiel du réseau Ethereum. Il lui permet de fonctionner, tout comme une voiture a besoin d'essence pour avancer.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles sur les [transactions](/developers/docs/transactions/) et sur l'[EVM](/developers/docs/evm/).

## Qu'est-ce que le carburant ? {#what-is-gas}

Le carburant est l'unité qui mesure la quantité d'efforts de calculs requis pour exécuter des opérations spécifiques sur le réseau Ethereum.

Comme chaque transaction Ethereum nécessite des ressources informatiques pour s'exécuter, cela implique des frais. Le carburant correspond aux frais requis pour effectuer correctement une transaction sur Ethereum.

![Diagramme indiquant  où le carburant est nécessaire dans les opérations EVM](./gas.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Fondamentalement, les frais de carburant sont payés en ether (ETH), la monnaie native d'Ethereum. Les prix du carburant sont indiqués en gwei, qui est une dénomination de l'ETH. Chaque gwei est égal à 0,00000001 ETH (10<sup>-9</sup> ETH). Par exemple, au lieu de dire que votre carburant coûte 0,000000001 Ether, vous pouvez dire qu'il coûte 1 gwei.

Cette vidéo offre une présentation concise du carburant et des raisons de son existence :

<YouTube id="AJvzNICwcwc" />

## Pourquoi existe-t-il des frais de carburant ? {#why-do-gas-fees-exist}

En résumé, les frais de carburant aident à sécuriser le réseau Ethereum. En exigeant des frais pour chaque calcul exécuté sur le réseau, nous empêchons les acteurs de le polluer. Afin d'éviter les boucles infinies accidentelles ou hostiles, ou d'autres gaspillages de calcul dans le code, il est nécessaire que chaque transaction limite le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le "carburant".

Même si chaque transaction comprend une limite, tout carburant non utilisé dans une transaction est rendu à l'utilisateur.

![Diagramme montrant comment le carburant non utilisé est remboursé](../transactions/gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Complément d'information {#further-reading}

- [Comprendre le carburant, les blocs et le marché des frais Ethereum](https://medium.com/@eric.conner/understanding-ethereum-gas-blocks-and-the-fee-market-d5e268bf0a0e)
- [Explication du carburant Ethereum](https://defiprime.com/gas)

## Outils connexes {#related-tools}

- [ETH Gas Station](https://ethgasstation.info/) _- Indicateurs orientés consommateurs concernant le marché du carburant Ethereum_
- [Etherscan Gas Tracker](https://etherscan.io/gastracker) _- Évaluateur du prix du carburant pour une transaction_
- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _- Statistiques concernant le carburant du réseau Ethereum_

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
