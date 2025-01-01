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

Étant donné que l'exécution de chaque transaction Ethereum nécessite des ressources informatiques, ces ressources doivent être payées pour garantir qu'Ethereum ne soit pas vulnérable au spam et ne reste pas bloqué dans des boucles de calcul infinies. Le paiement concernant le calcul se fait sous forme de frais de gaz.

Les frais de gaz** correspondent à la somme de gaz utilisé pour effectuer une opération, multiplié au coût par unité de gaz**. Les frais sont payés, que la transaction réussisse ou échoue.

![Diagramme indiquant où le gaz est nécessaire dans les opérations EVM](./gas.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Les frais de gaz doivent être payés dans la monnaie native d'Ethereum, l'éther (ETH). Le prix du gaz est généralement indiqué en gwei, qui est une dénomination de l'ETH. Chaque gwei est égal à un milliardième d'ETH (0,000000001 ETH ou 10<sup>-9</sup> ETH).

Par exemple, au lieu de dire que votre gaz coûte 0,000000001 Ether, vous pouvez dire qu'il coûte 1 gwei.

Le mot "gwei" est une contraction de "giga-wei", qui signifie "milliard de wei". Un gwei est égal à un milliard de wei. « Wei » (qui porte le nom de [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), le créateur de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)), est la plus petite unité d'ETH.

## Comment sont calculées les frais de gaz ? {#how-are-gas-fees-calculated}

Vous pouvez fixer le montant du gaz que vous êtes prêt à payer lorsque vous soumettez une transaction. En choissisant une certaine quantité de gaz, vous faites une offre pour que votre transaction soit incluse dans le bloc suivant. Si votre offre est insuffisante, les validateurs seront moins enclins à choisir votre transaction pour l'inclure, ce qui signifie que votre transaction risque d'être exécutée tardivement ou de ne pas être exécutée du tout. Si vous en offrez trop, vous risquez de gaspiller de l'ETH. Alors, comment savoir combien payer ?

Le montant total du gaz que vous payez est divisé en deux parties : `frais de base` et `frais de priorité` (pourboire).

Les `frais de base` sont fixés par le protocole - vous devez payer au moins ce montant pour que votre transaction soit considérée comme valide. Les `frais de priorité ` sont un pourboire que vous ajoutez aux frais de base pour rendre votre transaction attrayante aux yeux des validateurs afin qu'ils la choisissent pour l'inclure dans le bloc suivant.

Une transaction qui ne paie que les `frais de base` est techniquement valable, mais il est peu probable qu'elle soit incluse parce qu'elle n'incite pas les validateurs à la choisir plutôt qu'une autre transaction. Les frais de `priority` (priorité) "corrects" sont déterminés par l'utilisation du réseau au moment où vous émettez votre transaction. Si la demande est importante, vous devrez peut-être augmenter vos frais de `priority` ; dans le cas contraire, vous pourriez payer moins.

Par exemple, disons que Jordan doit payer 1 ETH à Taylor. Un transfert d'ETH nécessite 21 000 unités de gaz et les frais de base sont de 10 gwei. Jordan y ajoute un pourboire de 2 gwei.

Le montant total des frais s'élèverait alors à :

`unités de gaz utilisées * ( frais de base + frais de priorité)`

où les `frais de base` sont une valeur fixée par le protocole et les `frais de priorité` sont une valeur fixée par l'utilisateur en guise de pourboire au validateur.

ex. `21,000 * (10 + 2) = 252,000 gwei` (0.000252 ETH).

Lorsque Jordan enverra de l'argent, 1,000252 ETH sera déduit du compte de Jordan. Thierry sera crédité de 1,0000 ETH. Le validateur reçoit un pourboire de 0,000042 ETH. Les `frais de base` de 0,00021 ETH sont brûlés.

### Frais de base {#base-fee}

Chaque bloc a des frais de base qui servent de prix de réserve. Pour être éligible à l'inclusion dans un bloc, le prix proposé en gaz doit être au moins égal aux frais de base. Les frais de base sont calculés indépendamment du bloc actuel et sont déterminés par les blocs qui le précèdent, ce qui rend les frais de transaction plus prévisibles pour les utilisateurs. Lors de la création du bloc, les **frais de base sont "brûlés"**, ce qui les retire de la circulation.

Les frais de base sont calculés par une formule qui compare la taille du bloc précédent (la quantité de gaz utilisée pour toutes les transactions) avec la taille cible. Les frais de base augmenteront d'un maximum de 12,5 % par bloc si la taille du bloc cible est dépassée. D'un point de vue économique, cette croissance exponentielle ne permet pas de garder indéfiniment des blocs de grande taille.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ----------:| ----------------------:| ---------------------:|
| 1              |       15 M |                    0 % |              100 gwei |
| 2              |        30M |                    0 % |              100 gwei |
| 3              |       30 M |                 12,5 % |            112,5 gwei |
| 4              |       30 M |                 12,5 % |            126,6 gwei |
| 5              |       30 M |                 12,5 % |            142,4 gwei |
| 6              |       30 M |                 12,5 % |            160,2 gwei |
| 7              |       30 M |                 12,5 % |            180,2 gwei |
| 8              |       30 M |                 12,5 % |            202,7 gwei |

D'apres la table ci-dessus - afin de créer une transaction sur le bloc numéro 9, un portefeuille pourra faire savoir à l'utilisateur avec certitude que les **frais de base maximum** à ajouter au bloc suivant sont `les frais de base actuels * 112,5 %` ou `202,8 gwei * 112,5 % = 228,1 gwei`.

Il est également important de noter qu'il est peu probable que nous assistions à des pics prolongés de blocs complets en raison de la vitesse à laquelle les frais de base augmentent avant un bloc complet.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ----------:| ----------------------:| ---------------------:|
| 30             |       30 M |                 12,5 % |          2 705,6 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 50             |       30 M |                 12,5 % |         28 531,3 gwei |
| ...            |        ... |                 12,5 % |                   ... |
| 100            |       30 M |                 12,5 % |     10 302 608,6 gwei |

### Frais de priorité (pourboires) {#priority-fee}

Les frais de priorité (pourboire) incitent les validateurs à inclure une transaction dans le bloc. En l'absence de pourboires, les validateurs trouveraient économiquement viable de miner des blocs vides, puisqu'ils recevraient la même récompense pour les blocs. Les petits pourboires n'incitent que très peu les validateurs à inclure une transaction. Pour que les transactions soient exécutées de préférence à d'autres transactions dans le même bloc, un pourboire plus élevé peut être ajouté pour tenter de surenchérir sur les transactions concurrentes.

### Frais maximums {#maxfee}

Pour exécuter une transaction sur le réseau, les utilisateurs peuvent spécifier une limite maximale qu'ils sont prêts à payer pour que leur transaction soit exécutée. Ce paramètre optionnel est connu sous le nom de `maxFeePerGas`. Pour qu'une transaction soit exécutée, les frais max doivent dépasser la somme des frais de base et du pourboire. La différence entre les frais maximums et la somme des frais de base et du pourboire est remboursée à l'émetteur de la transaction.

### Taille des blocs {#block-size}

Chaque bloc vise une taille cible de 15 millions de gaz, mais leur taille s'adapte aux exigences du réseau, jusqu'à une limite de 30 millions de gaz (deux fois la taille cible de bloc). Le protocole atteint une taille d'équilibre de bloc de 15 millions en moyenne grâce au processus de _tâtonnement_. Cela signifie que si la taille du bloc est plus importante que la taille cible du bloc, le protocole augmentera les frais de base pour le bloc suivant. De même, le protocole diminuera les frais de base si la taille du bloc est inférieure à la taille cible du bloc. Le montant par lequel les frais de base sont ajustés est proportionnel à l'écart entre la taille actuelle et la taille cible du bloc. [En savoir plus sur les blocs](/developers/docs/blocks/).

### Calculer les frais de gaz dans la pratique {#calculating-fees-in-practice}

Vous pouvez indiquer explicitement le montant que vous êtes prêt à payer pour que votre transaction soit exécutée. Cependant, la plupart des fournisseurs de portefeuilles fixent automatiquement des frais de transaction recommandés (frais de base + frais de priorité recommandés) afin de réduire la complexité imposée à leurs utilisateurs.

## Pourquoi les frais de gaz existent-ils ? {#why-do-gas-fees-exist}

En résumé, les frais de gaz aident à sécuriser le réseau Ethereum. En exigeant des frais pour chaque calcul exécuté sur le réseau, nous empêchons les acteurs malveillants de spammer le réseau. Afin d'éviter les boucles infinies accidentelles ou hostiles ou d'autres gaspillages de calcul dans le code, chaque transaction doit limiter le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le « gaz ».

Bien qu'une transaction comprenne une limite, tout gaz inutilisé dans une transaction est retourné à l'utilisateur (ex. `Frais maximum - (frais de base + pourboire)` est retourné).

![Diagramme montrant comment le gaz non utilisé est remboursé](../transactions/gas-tx.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qu'est-ce que la limite de gaz ? {#what-is-gas-limit}

La limite de gaz correspond à la quantité maximale de gaz que vous êtes prêt à consommer lors d'une transaction. Les transactions plus compliquées impliquant des [contrats intelligents](/developers/docs/smart-contracts/) nécessitent plus de travail de calcul, et donc une limite de gaz supérieure à celle d'un simple paiement. Un transfert standard d'ETH nécessite une limite de gaz de 21 000 unités de gaz.

Par exemple, si vous définissez votre limite de gaz à 50 000 pour un simple transfert ETH, l'EVM en consommera 21 000 et vous récupérerez les 29 000 restants. Cependant, si vous fixez un montant de gaz trop faible, par exemple une limite de gaz de 20 000 pour un simple transfert ETH, l'EVM consommera vos 20 000 unités de gaz en essayant de réaliser la transaction, mais celle-ci ne sera pas complète. L'EVM annule alors toute modification, mais comme le validateur a déjà effectué un travail d'une valeur de 20 000 unités de gaz, ce gaz est consommé.

## Pourquoi les frais de gaz peuvent-ils devenir si élevés ? {#why-can-gas-fees-get-so-high}

Les frais élevés de gaz sont le fruit de la popularité d'Ethereum. Si la demande est trop forte, les utilisateurs doivent proposer des pourboires plus élevés pour tenter de surenchérir sur les transactions des autres utilisateurs. Un pourboire plus élevé augmentera la possibilité que votre transaction soit intégrée au prochain bloc. De plus, les applications de contrats intelligents plus complexes peuvent effectuer de nombreuses opérations pour assurer leurs fonctions, ce qui leur fait consommer beaucoup de gaz.

## Initiatives mises en œuvre pour réduire les coûts du gaz {#initiatives-to-reduce-gas-costs}

[Les mises à jour d'évolutivité](/roadmap/) d'Ethereum devraient en fin de compte résoudre certains problèmes liés aux frais de gaz et permettra à la plate-forme de traiter des milliers de transactions par seconde et à l'échelle mondiale.

La mise à l'échelle de la couche 2 est une initiative primordiale pour améliorer considérablement les coûts de gaz, l'expérience utilisateur et l'évolutivité. [En savoir plus sur la mise à l'échelle de la couche 2](/developers/docs/scaling/#layer-2-scaling).

## Suivi des frais de gaz {#monitoring-gas-fees}

Si vous voulez surveiller les prix du gaz et pouvoir envoyer votre ETH à moindre coût, vous pouvez utiliser différents outils comme :

- [Etherscan](https://etherscan.io/gastracker) _- Évaluateur du prix du gaz pour une transaction_
- [Suivi du gaz ETH](https://www.ethgastracker.com/) _Surveillez et suivez les prix du gaz sur Ethereum et des solutions de niveau 2 pour réduire les frais de transaction et économiser de l'argent_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extension Chrome pour estimer le gaz à la fois pour les transactions de Type 0 et les transactions de Type 2 EIP-1559 ._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculez les frais de gaz dans votre devise locale pour différents types de transaction sur le réseau principal, Arbitrum et Polygon._

## Outils connexes {#related-tools}

- [Blocknative's Gas Platform](https://www.blocknative.com/gas) _API d'estimation de gaz propulsé par la plate-forme globale Blocknative de données mempool_

## Complément d'information {#further-reading}

- [Explication du gaz sur Ethereum](https://defiprime.com/gas)
- [Réduire la consommation de gaz de vos contrats intelligents](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Preuve d'enjeu contre preuve de travail](https://blockgeeks.com/guides/proof-of-work-vs-proof-of-stake/)
- [Des Stratégies pour Optimiser la Consommation de Gas, pour les Développeurs](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [documentation EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Ressources EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources).
