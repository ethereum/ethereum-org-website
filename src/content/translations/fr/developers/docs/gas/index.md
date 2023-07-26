---
title: Gaz et frais
description:
lang: fr
---

Le gaz est un élément essentiel du réseau Ethereum. Il lui permet de fonctionner, tout comme une voiture a besoin d'essence pour avancer.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de commencer par lire celles sur les [transactions](/developers/docs/transactions/) et sur l'[EVM](/developers/docs/evm/).

## Qu'est-ce que le gaz ? {#what-is-gas}

Le gaz est l'unité qui mesure la quantité d'efforts de calculs requis pour exécuter des opérations spécifiques sur le réseau Ethereum.

Comme chaque transaction Ethereum nécessite des ressources informatiques pour s'exécuter, cela implique des frais. Le gaz correspond aux frais requis pour effectuer correctement une transaction sur Ethereum.

![Diagramme indiquant où le gaz est nécessaire dans les opérations EVM](./gas.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Fondamentalement, les frais de gaz sont payés en ether (ETH), la monnaie native d'Ethereum. Les prix du gaz sont indiqués en gwei, qui est une dénomination de l'ETH. Chaque gwei est égal à 0,00000001 ETH (10<sup>-9</sup> ETH). Par exemple, au lieu de dire que votre gaz coûte 0,000000001 Ether, vous pouvez dire qu'il coûte 1 gwei. Le mot « gwei » signifie « giga-wei », et il est égal à 1 000 000 000 de wei. « Wei » (qui porte le nom de [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), le créateur de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)), est la plus petite unité d'ETH.

## Avant la mise à jour de Londres {#pre-london}

Sur le réseau Ethereum, la façon dont les frais de transaction sont calculés a été modifiée avec [la mise à jour de Londres](/history/#london) d'août 2021. Voici un récapitulatif de la façon dont cela fonctionnait :

Disons qu'Alice devait payer à Marc la somme d'1 ETH. Dans la transaction, la limite de gaz est de 21 000 unités et le prix du gaz est de 200 gwei.

Les frais totaux auraient été : `unités de gaz (limite) * prix de gaz par unité` i. `21 000 * 200 = 4 200 000 gwei` ou 0,0042 ETH

## Après la mise à jour de Londres {#post-london}

Disons que Jordan doit payer à Thierry la somme d'1 ETH. Dans la transaction, la limite de gaz est de 21 000 unités et les frais de base sont de 10 gwei. Jordan y ajoute un pourboire de 2 gwei.

Le coût total serait maintenant : `unités de gaz utilisées x (frais de base + frais de priorité)` où les `frais de base` sont des valeurs définies par le protocole et les `frais de priorité` sont une valeur définie par l'utilisateur comme un pourboire pour le validateur.

Ex. : `21.000 * (10 + 2) = 252 000 gwei` ou 0,000252 ETH.

Lorsque Jordan enverra de l'argent, 1,000252 ETH sera déduit du compte de Jordan. Thierry sera crédité de 1,0000 ETH. Le validateur reçoit un pourboire de 0,000042 ETH. Les frais de base de 0,0021 ETH sont brûlés.

De plus, Jordan peut également fixer des frais maximums (`maxFeePerGas`) pour la transaction. La différence entre les frais max et les frais réels est remboursée à Jordan, c'est-à-dire `remboursement = frais max - (frais de base + frais de priorité)`. Jordan peut fixer un montant maximum à payer pour l'exécution de la transaction et ne pas s'inquiéter de payer trop, « au-delà » des frais de base lorsque la transaction est exécutée.

### Taille des blocs {#block-size}

Avant la mise à jour de Londres, Ethereum avait des blocs de taille fixe. En période de forte demande sur le réseau, ces blocs fonctionnaient à pleine capacité. En conséquence, les utilisateurs devaient souvent attendre que la forte demande diminue pour être inclus dans un bloc, ce qui entraînait une mauvaise expérience utilisateur.

La mise à niveau de Londres a permis d'introduire des blocs de taille variable dans Ethereum. Chaque bloc vise une taille cible de 15 millions de gaz, mais leur taille s'adapte aux exigences du réseau, jusqu'à une limite de 30 millions de gaz (deux fois la taille cible de bloc). Le protocole atteint une taille d'équilibre de bloc de 15 millions en moyenne grâce au processus de _tâtonnement_. Cela signifie que si la taille du bloc est plus importante que la taille cible du bloc, le protocole augmentera les frais de base pour le bloc suivant. De même, le protocole diminuera les frais de base si la taille du bloc est inférieure à la taille cible du bloc. Le montant par lequel les frais de base sont ajustés est proportionnel à l'écart entre la taille actuelle et la taille cible du bloc. [En savoir plus sur les blocs](/developers/docs/blocks/).

### Frais de base {#base-fee}

Chaque bloc a des frais de base qui servent de prix de réserve. Pour être éligible à l'inclusion dans un bloc, le prix proposé en gaz doit être au moins égal aux frais de base. Les frais de base sont calculés indépendamment du bloc actuel et sont déterminés par les blocs qui le précèdent, ce qui rend les frais de transaction plus prévisibles pour les utilisateurs. Lorsque le bloc est miné, ces frais de base sont « brûlés », disparaissant ainsi de la circulation.

Les frais de base sont calculés par une formule qui compare la taille du bloc précédent (la quantité de gaz utilisée pour toutes les transactions) avec la taille cible. Les frais de base augmenteront d'un maximum de 12,5 % par bloc si la taille du bloc cible est dépassée. D'un point de vue économique, cette croissance exponentielle ne permet pas de garder indéfiniment des blocs de grande taille.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ---------: | ---------------------: | --------------------: |
| 1              |       15 M |                    0 % |              100 gwei |
| 2              |        30M |                    0 % |              100 gwei |
| 3              |       30 M |                 12,5 % |            112,5 gwei |
| 4              |       30 M |                 12,5 % |            126,6 gwei |
| 5              |       30 M |                 12,5 % |            142,4 gwei |
| 6              |       30 M |                 12,5 % |            160,2 gwei |
| 7              |       30 M |                 12,5 % |            180,2 gwei |
| 8              |       30 M |                 12,5 % |            202,7 gwei |

Comparativement au marché aux enchères de gaz d'avant la mise à niveau de Londres, ce changement de mécanisme de frais de transaction permet une meilleure prédiction de ces frais. D'apres la table ci-dessus - afin de créer une transaction sur le bloc numéro 9, un portefeuille pourra faire savoir à l'utilisateur avec certitude que les **frais de base maximum** à ajouter au bloc suivant sont `les frais de base actuels * 112,5 %` ou `202,8 gwei * 112,5 % = 228,1 gwei`.

Il faut également souligner qu'il est peu probable d'assister à des pics prolongés de blocs complets, en raison de la vitesse à laquelle les frais de base augmentent en procédant à un bloc complet.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ---------: | ---------------------: | --------------------: |
| 30             |       30 M |                 12,5 % |          2 705,6 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 50             |       30 M |                 12,5 % |         28 531,3 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 100            |       30 M |                 12,5 % |     10 302 608,6 gwei |

### Frais de priorité (pourboires) {#priority-fee}

Avant la mise à niveau de Londres, les mineurs recevaient l'ensemble des frais de gaz pour chaque transaction incluse dans un bloc.

Les nouveaux frais de base étant détruits, la mise à niveau de Londres introduit des frais de priorité (pourboire) afin d'inciter les mineurs à inclure une transaction dans le bloc. Sans pourboires, les mineurs auraient un intérêt économique viable à miner des blocs vides, dans la mesure où ils recevraient la même récompense de bloc. Dans des conditions normales, un petit pourboire incite les mineurs à inclure une transaction. Pour que certaines transactions soient exécutées de préférence avant d'autres Dans le même bloc, un pourboire plus élevé sera nécessaire afin de tenter de surenchérir sur les autres transactions.

### Frais maximums {#maxfee}

Pour exécuter une transaction sur le réseau, les utilisateurs peuvent spécifier une limite maximale qu'ils sont prêts à payer pour que leur transaction soit exécutée. Ce paramètre optionnel est connu sous le nom de `maxFeePerGas`. Pour qu'une transaction soit exécutée, les frais max doivent dépasser la somme des frais de base et du pourboire. La différence entre les frais maximums et la somme des frais de base et du pourboire est remboursée à l'émetteur de la transaction.

### Le calcul des frais {#calculating-fees}

L'un des principaux avantages de la mise à niveau de Londres est l'amélioration de l'expérience utilisateur lors de la définition des frais de transaction. Pour les portefeuilles qui prennent en charge la mise à niveau, au lieu d'indiquer explicitement combien vous êtes prêt à payer pour faire passer votre transaction, les fournisseurs de portefeuilles fixeront automatiquement des frais de transaction recommandés (frais de base + frais de priorité recommandés) pour réduire la complexité pesant sur leurs utilisateurs.

## EIP-1559 {#eip-1559}

L'intégration de [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559) dans la mise à niveau Londres a rendu le mécanisme des frais de transaction plus complexe que les enchères précédentes sur le prix du gaz, mais elle a l'avantage de rendre les frais de gaz plus prévisibles, ce qui se traduit par une plus grande efficacité du marché des frais de transaction. Les utilisateurs peuvent soumettre des transactions avec un `maxFeePerGas` correspondant au montant qu'ils sont prêts à payer pour l'exécution de la transaction, sachant qu'ils ne paieront pas plus que le prix du marché pour le gaz (`baseFeePerGas`), et obtenir un remboursement du supplément, moins leur pourboire.

Cette vidéo explique l'EIP-1559 et les avantages qu'il procure :

<YouTube id="MGemhK9t44Q" />

Si vous êtes intéressé, vous pouvez lire [EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).

Continuez à suivre le lapin avec ces [Ressources EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## Pourquoi les frais de gaz existent-ils ? {#why-do-gas-fees-exist}

En résumé, les frais de gaz aident à sécuriser le réseau Ethereum. En exigeant des frais pour chaque calcul exécuté sur le réseau, nous empêchons les acteurs malveillants de spammer le réseau. Afin d'éviter les boucles infinies accidentelles ou hostiles ou d'autres gaspillages de calcul dans le code, chaque transaction doit limiter le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le « gaz ».

Bien qu'une transaction comprenne une limite, tout gaz inutilisé dans une transaction est retourné à l'utilisateur (ex. `Frais maximum - (frais de base + pourboire)` est retourné).

![Diagramme montrant comment le gaz non utilisé est remboursé](../transactions/gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qu'est-ce que la limite de gaz ? {#what-is-gas-limit}

La limite de gaz correspond à la quantité maximale de gaz que vous êtes prêt à consommer pour une transaction. Les transactions plus compliquées impliquant des [contrats intelligents](/developers/docs/smart-contracts/) nécessitent plus de travail de calcul, et donc une limite de gaz supérieure à celle d'un simple paiement. Un transfert standard d'ETH nécessite une limite de gaz de 21 000 unités de gaz.

Par exemple, si vous définissez votre limite de gaz à 50 000 pour un simple transfert ETH, l'EVM en consommera 21 000 et vous récupérerez les 29 000 restants. Cependant, si vous fixez un montant de gaz trop faible, par exemple une limite de gaz de 20 000 pour un simple transfert ETH, l'EVM consommera vos 20 000 unités de gaz en essayant de réaliser la transaction, mais celle-ci ne sera pas complète. L'EVM annule alors toute modification, mais puisque le mineur a déjà réalisé pour 20 000 unités de gaz en calculs, ce gaz est consommé.

## Pourquoi les frais de gaz peuvent-ils devenir si élevés ? {#why-can-gas-fees-get-so-high}

Les frais élevés de gaz sont le fruit de la popularité d'Ethereum. Effectuer une opération sur Ethereum nécessite de consommer du gaz, et l'espace de gaz est limité pour un bloc donné. Les frais comprennent les calculs, le stockage ou la manipulation de données ou le transfert de jetons, consommant différentes quantités d'unités de gaz. Au fur et à mesure que les fonctionnalités offertes par les dApps deviennent plus complexes, le nombre d'opérations réalisées par un contrat intelligent augmente également, de sorte que chaque transaction prend plus de place dans un bloc de taille limitée. S'il y a trop de demandes, les utilisateurs doivent offrir un montant de pourboire plus élevé pour essayer de surenchérir sur les transactions des autres utilisateurs. Un pourboire plus élevé augmentera la possibilité que votre transaction soit intégrée au prochain bloc.

Le prix du gaz ne détermine pas à lui seul le montant que nous avons à payer pour une transaction particulière. Pour calculer les frais de transaction, il convient de multiplier le gaz utilisé par les frais de base en gaz, qui sont mesurés en gwei.

## Initiatives mises en œuvre pour réduire les coûts du gaz {#initiatives-to-reduce-gas-costs}

[Les mises à jour d'évolutivité](/roadmap/) d'Ethereum devraient en fin de compte résoudre certains problèmes liés aux frais de gaz et permettra à la plate-forme de traiter des milliers de transactions par seconde et à l'échelle mondiale.

La mise à l'échelle de la couche 2 est une initiative primordiale pour améliorer considérablement les coûts de gaz, l'expérience utilisateur et l'évolutivité. [En savoir plus sur la mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling).

## Stratégies permettant de réduire les frais de gaz {#strategies-for-you-to-reduce-gas-costs}

Si vous cherchez à réduire les frais de gaz pour votre ETH, vous pouvez définir un pourboire pour indiquer le niveau de priorité de votre transaction. Les mineurs « travailleront » et exécuteront des transactions qui offrent un pourboire plus élevé en gaz, car ils peuvent conserver les pourboires que vous offrez et seront moins enclins à exécuter des transactions offrant des pourboires moins élevés.

Si vous voulez surveiller les prix du gaz et pouvoir envoyer votre ETH à moindre coût, vous pouvez utiliser différents outils comme :

- [Etherscan](https://etherscan.io/gastracker) _- Évaluateur du prix du gaz pour une transaction_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extension Chrome pour estimer le gaz à la fois pour les transactions de Type 0 et les transactions de Type 2 EIP-1559 ._

- [ETH Gas Station](https://ethgasstation.info/) _Indicateur orienté consommateur pour le marché du gaz Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculez les frais de gaz dans votre devise locale pour différents types de transaction sur le réseau principal, Arbitrum et Polygon._

## Outils connexes {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API d'estimation de gaz propulsé par la plate-forme globale Blocknative de données mempool_

## Complément d'information {#further-reading}

- [Explication du gaz sur Ethereum](https://defiprime.com/gas)
- [Réduire la consommation de gaz de vos contrats intelligents](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Preuve d'enjeu contre preuve de travail](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Sujets connexes {#related-topics}

- [Le minage](/developers/docs/consensus-mechanisms/pow/mining/)
