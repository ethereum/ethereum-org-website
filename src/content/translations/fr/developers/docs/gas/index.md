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

Lorsque Alice a envoyé l'argent, 1,0042 ETH seront déduits de son compte. Marc sera crédité de 1,0000 ETH. Le mineur recevra 0,0042 ETH.

Cette vidéo offre une présentation concise du gaz et des raisons de son existence :

<YouTube id="AJvzNICwcwc" />

## Après la mise à jour de Londres {#post-london}

[La mise à jour de Londres](/history/#london) a été implémentée le 5 août 2021 pour rendre les transactions sur Ethereum plus prévisibles pour les utilisateurs en remaniant le mécanisme des frais de transactions pour Ethereum. Les avantages de haut niveau introduits par cette modification incluent une meilleure estimation des frais de transaction, de façon générale l'inclusion plus rapide des transactions et la compensation de l'émission d'ETH en saisissant un pourcentage des frais de transaction.

À partir de la mise à jour de Londres du réseau, chaque bloc a des frais de base, le prix minimum par unité de gaz pour l'inclusion dans ce bloc, calculé par le réseau en fonction de la demande d'espace bloc. Comme les frais de base de la transaction sont épuisés, les utilisateurs doivent également fixer un pourboire (frais prioritaires) dans leurs transactions. Le pourboire récompense les mineurs pour l'exécution et la propagation des transactions des utilisateurs dans des blocs et est censé être réglé automatiquement par la plupart des portefeuilles.

Le calcul des frais de transaction totaux fonctionne comme suit : `unités de gaz (limite) * (frais de base + pourboire)`

Disons que Jordan doit payer à Thierry la somme d'1 ETH. Dans la transaction, la limite de gaz est de 21 000 unités et les frais de base sont de 100 gwei. Jordan y ajoute un pourboire de 10 gwei.

En utilisant la formule ci-dessus, nous pouvons calculer que `21 000 * (100 + 10) = 2 310 000 gwei` ou 0,00231 ETH.

Lorsque Jordan enverra de l'argent, 1,00231 ETH sera déduit du compte de Jordan. Thierry sera crédité de 1,0000 ETH. Le mineur reçoit 0,00021 ETH de pourboire. Des frais de base de 0,0021 ETH sont brûlés.

De plus, Jordan peut également fixer des frais maximums (`maxFeePerGas`) pour la transaction. La différence entre les frais max et les frais réels est remboursée a Jordan, c'est à dire `remboursement = frais max - (frais de base + frais de priorité)`. Jordan peut fixer un montant maximum à payer pour l'exécution de la transaction et ne pas s'inquiéter de payer en trop « au-delà » des frais de base lorsque la transaction est exécutée.

### Taille des blocs {#block-size}

Avant la mise à jour de Londres, Ethereum avait des blocs de taille fixe. En période de forte demande du réseau, ces blocs fonctionnaient à la capacité totale. En conséquence, les utilisateurs devaient souvent attendre que la forte demande diminue pour être inclus dans un bloc, ce qui entraînait une mauvaise expérience utilisateur.

La mise à niveau de Londres a introduit sur Ethereum des blocs de taille variable. Chaque bloc vise une taille cible de 15 millions de gaz, mais leur taille s'adapte aux exigences du réseau, jusqu'à la limite de 30 millions de gaz (deux fois la taille cible de bloc). Le protocole atteint une taille équilibre de bloc de 15 millions en moyenne grâce au processus de _tâtonnement_. Cela signifie que si la taille du bloc est plus que la taille cible du bloc, le protocole augmentera les frais de base pour le bloc suivant. De même, le protocole diminuera les frais de base si la taille du bloc est inférieure à la taille cible du bloc. Le montant par lequel les frais de base sont ajustés est proportionnel à l'écart entre la taille actuel et la taille cible du bloc. [En savoir plus sur les blocs](/developers/docs/blocks/).

### Frais de base {#base-fee}

Chaque bloc a des frais de base qui servent de prix de réserve. Pour être éligible à l'inclusion dans un bloc, le prix proposé par montant de gaz doit être au moins égal aux frais de base. Les frais de base sont calculés indépendamment du bloc actuel et sont plutôt déterminés par les blocs qui le précèdent, ce qui rend les frais de transaction plus prévisibles pour les utilisateurs. Lorsque le bloc est miné, ces frais de base sont « brûlés », le retirant de la circulation.

Les frais de base sont calculés par une formule qui compare la taille du bloc précédent (la quantité de gaz utilisée pour toutes les transactions) avec la taille cible. Les frais de base augmenteront d'un maximum de 12,5 % par bloc si la taille du bloc cible est dépassée. D'un point de vue économique, cette croissance exponentielle ne permet pas de garder des blocs de grande taille.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ---------: | ---------------------: | --------------------: |
| 1              |       15 M |                    0 % |              100 gwei |
| 2              |        30M |                    0 % |              100 gwei |
| 3              |        30M |                 12,5 % |            112,5 gwei |
| 4              |        30M |                 12,5 % |            126,6 gwei |
| 5              |        30M |                 12,5 % |            142,4 gwei |
| 6              |        30M |                 12,5 % |            160,2 gwei |
| 7              |        30M |                 12,5 % |            180,2 gwei |
| 8              |        30M |                 12,5 % |            202,7 gwei |

En ce qui concerne le marché aux enchères de gaz pré-Londres, ce changement de mécanisme de frais de transaction permet une meilleure prédiction de ces frais. D'apres la table ci-dessus - afin de créer une transaction sur le bloc numéro 9, un portefeuille pourra faire savoir à l'utilisateur avec certitude que les **frais de base maximum** à ajouter au bloc suivant sont `les frais de base actuels * 112,5%` ou `202,8 gwei * 112,5% = 228,1 gwei`.

Il est important de souligner également qu'il est peu probable que l'on voit des périodes de blocs pleins de manière prolongée, dû à la vitesse à laquelle les frais de base augmentent suivant un bloc plein.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ---------: | ---------------------: | --------------------: |
| 30             |        30M |                 12,5 % |          2 705,6 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 50             |       30 M |                 12,5 % |         28 531,3 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 100            |       30 M |                 12,5 % |     10 302 608,6 gwei |

### Frais prioritaires (pourboires) {#priority-fee}

Avant la mise à niveau de Londres, les mineurs reçoivent tous les frais de gaz, pour chaque transaction incluse dans un bloc.

Comme les nouveaux frais de base sont détruits, la mise à niveau de Londres introduit des frais de priorité (pourboire) afin d'inciter les mineurs à inclure une transaction dans le bloc. Sans pourboires, les mineurs auraient un intérêt économique viable à miner des blocs vides, car ils recevraient la même récompense de bloc. Dans des conditions normales, un petit pourboire incite les mineurs à inclure une transaction. Dans le même bloc, pour que certaines transactions soient exécutées de préférence avant d'autres, un pourboire plus élevé sera nécessaire afin de tenter de surenchérir les autres transactions.

### Frais maximums {#maxfee}

Pour exécuter une transaction sur le réseau, les utilisateurs peuvent spécifier une limite maximale qu'ils sont prêts à payer pour que leur transaction soit exécutée. Ce paramètre optionnel est connu sous le nom de `maxFeePerGas`. Pour qu'une transaction soit exécutée, les frais maximums doivent dépasser la somme des frais de base et du pourboire. La différence entre les frais maximums et la somme des frais de base et du pourboire est remboursée à l'émetteur de la transaction.

### Le calcul des frais {#calculating-fees}

L'un des principaux avantages de la mise à niveau de Londres est l'amélioration de l'expérience utilisateur lors de la définition des frais de transaction. Pour les portefeuilles qui prennent en charge la mise à niveau, au lieu d'indiquer explicitement combien vous êtes prêt à payer pour faire passer votre transaction, les fournisseurs de portefeuilles fixeront automatiquement des frais de transaction recommandés (frais de base + frais de priorité recommandés) pour réduire la complexité qui pèse sur leurs utilisateurs.

## EIP-1559 {#eip-1559}

La mise en œuvre de [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md) dans la mise à niveau de Londres a rendu le mécanisme des frais de transaction plus complexe que les précédentes enchères du prix du gaz, mais il a l'avantage de rendre les frais de gaz plus prévisibles, ce qui donne lieu à un marché des frais de transaction plus efficace. Les utilisateurs peuvent soumettre des transactions avec un `maxFeePerGas` correspondant au montant qu'ils sont prêts à payer pour l'exécution de la transaction, sachant qu'ils ne paieront pas plus que le prix du marché pour le gaz (`baseFeePerGas`), et obtenir un remboursement du supplément, moins leur pourboire.

Cette vidéo explique l'EIP-1559 et les avantages qu'il apporte :

<YouTube id="MGemhK9t44Q" />

Si cela vous intéresse, vous pouvez lire les spécifications exactes [EIP-1559](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-1559.md).

Continuez à suivre le lapin avec ces [Ressources EIP-1559](https://hackmd.io/@timbeiko/1559-resources).

## Pourquoi les frais de gaz existent-ils ? {#why-do-gas-fees-exist}

Pour résumer, les frais de gaz aident à sécuriser le réseau Ethereum. En exigeant des frais pour chaque calcul exécuté sur le réseau, nous empêchons les mauvais acteurs de spammer le réseau. Afin d'éviter les boucles infinies accidentelles ou hostiles ou d'autres gaspillages de calcul dans le code, il est nécessaire que chaque transaction limite le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le « gaz ».

Bien qu'une transaction comprenne une limite, tout gaz inutilisé dans une transaction est retourné à l'utilisateur (ex. `Frais maximum - (frais de base + pourboire)` est retourné).

![Diagramme montrant comment le gaz non utilisé est remboursé](../transactions/gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qu'est-ce que la limite de gaz ? {#what-is-gas-limit}

La limite de gaz correspond à la quantité maximale de gaz que vous êtes prêt à consommer pour une transaction. Les transactions plus compliquées impliquant des [contrats intelligents](/developers/docs/smart-contracts/) nécessitent plus de travail de calcul, donc nécessitent une limite de gaz supérieure à celle d'un simple paiement. Un transfert standard d'ETH nécessite une limite de gaz de 21 000 unités de gaz.

Par exemple, si vous définissez une limite de gaz à 50 000 pour un simple transfert ETH, l'EVM en consommera 21 000 et vous récupérerez les 29 000 restants. Cependant, si vous fixez un montant de gaz trop faible, par exemple une limite de gaz de 20 000 pour un simple transfert ETH, l'EVM consommera vos 20 000 unités de gaz tentant de réaliser la transaction, mais elle ne sera pas terminée. L'EVM annule alors toute modification, mais puisque le mineur a déjà réalisé pour pour 20 000 d'unités de gaz en calculs, ce gaz est consommé.

## Pourquoi les frais de gaz peuvent-ils devenir si élevés ? {#why-can-gas-fees-get-so-high}

Les frais élevés de gaz sont le fruit de la popularité d'Ethereum. Effectuer toute opération sur Ethereum nécessite de consommer du gaz, et l'espace de gaz est limité pour un bloc donné. Les frais comprennent les calculs, le stockage ou la manipulation de données ou le transfert de jetons en consommant différentes quantités d'unités de gaz. Au fur et à mesure que les fonctionnalités offertes par les DApps deviennent plus complexes, le nombre d'opérations réalisées par un contrat intelligent augmente également, ce qui signifie que chaque transaction prend plus de place dans un bloc de taille limitée. S'il y a trop de demandes, les utilisateurs doivent offrir un montant de pourboire plus élevé pour essayer de surenchérir sur les transactions des autres utilisateurs. Un montant de pourboire plus élevé augmentera la possibilité que votre transaction soit intégrée dans le prochain bloc.

Le prix du gaz ne détermine pas à lui seul le montant que nous avons à payer pour une transaction particulière. Pour calculer les frais de transaction, il convient de multiplier le gaz utilisé par les frais de transaction, qui sont mesurés en gwei.

## Initiatives mises en œuvre pour réduire les coûts du gaz {#initiatives-to-reduce-gas-costs}

[Les mises à jour d'évolutivité](/upgrades/) d'Ethereum devraient en fin de compte résoudre certains problèmes liés aux frais de gaz et permettra à la plate-forme de traiter des milliers de transactions par seconde et à l'échelle mondiale.

La montée en charge de la couche 2 est une initiative primordiale pour améliorer considérablement les coûts de gaz, l'expérience utilisateur et l'évolutivité. [En savoir plus sur la montée en charge de la couche 2](/developers/docs/scaling/#layer-2-scaling).

Le nouveau modèle de preuve d'enjeu introduit sur la chaîne phare devrait réduire la consommation d'énergie élevée et la dépendance à l'égard du matériel spécialisé. Cette chaîne permettra au réseau Ethereum décentralisé d'être en accord et de garder le réseau sécurisé, tout en limitant la consommation d'énergie exigeant un engagement financier.

Toute personne ayant au moins 32 ETH peut les miser et devenir un validateur responsable du traitement des transactions, valider les blocs et proposer de nouveaux blocs à ajouter à la chaîne. Les utilisateurs disposant de moins de 32 ETH peuvent rejoindre les groupes de mise en jeu.

## Stratégies permettant de réduire les frais de gaz {#strategies-for-you-to-reduce-gas-costs}

Si vous cherchez à réduire les frais de gaz pour votre ETH, vous pouvez définir un pourboire pour indiquer le niveau de priorité de votre transaction. Les mineurs « travailleront » et exécuteront des transactions qui offrent un pourboire plus élevé par gaz, car ils peuvent conserver les pourboires que vous offrez et seront moins enclins à exécuter des transactions avec des pourboires moins élevés.

Si vous voulez surveiller les prix du gaz et pouvoir envoyer votre ETH pour moins cher, vous pouvez utiliser différents outils comme :

- [Etherscan](https://etherscan.io/gastracker) _- Évaluateur du prix du gaz pour une transaction_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extension Chrome pour estimer le gaz à la fois pour les transactions de Type 0 et les transactions de Type 2 EIP-1559 ._

- [ETH Gas Station](https://ethgasstation.info/) _Indicateur orienté consommateur pour le marché du gaz Ethereum_
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculez les frais de gaz dans votre devise locale pour différents types de transaction sur le réseau principal, Arbitrum et Polygon._

## Outils connexes {#related-tools}

- [Bloxy Gas Analytics](https://stat.bloxy.info/superset/dashboard/gas/?standalone=true) _- Statistiques concernant le gaz du réseau Ethereum_
- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API d'estimation de gaz propulsé par la plate-forme globale Blocknative de données mempool_

## Complément d'information {#further-reading}

- [Explication du gaz sur Ethereum](https://defiprime.com/gas)
- [Est-il plus cher d'utiliser Ethereum en cas de hausse des prix ?](https://docs.ethhub.io/questions-about-ethereum/is-ethereum-more-expensive-to-use-as-price-rises/)
- [Réduire la consommation de gaz de vos contrats intelligents](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Preuve d'enjeu contre preuve de travail](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)

## Sujets connexes {#related-topics}

- [Le minage](/developers/docs/consensus-mechanisms/pow/mining/)
