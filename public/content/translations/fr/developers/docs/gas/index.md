---
title: Gaz et frais
metaTitle: "Gaz et frais Ethereum : aperçu technique"
description: "En savoir plus sur les frais de gaz Ethereum, comment ils sont calculés et leur rôle dans la sécurité du réseau et le traitement des transactions."
lang: fr
---

Le gaz est un élément essentiel du réseau Ethereum. Il lui permet de fonctionner, tout comme une voiture a besoin d'essence pour avancer.

## Prérequis {#prerequisites}

Pour mieux comprendre cette page, nous vous recommandons de vous informer d'abord sur les [transactions](/developers/docs/transactions/) et [l'EVM](/developers/docs/evm/).

## Qu'est-ce que le gaz ? {#what-is-gas}

Le gaz est l'unité qui mesure la quantité d'efforts de calculs requis pour exécuter des opérations spécifiques sur le réseau Ethereum.

Étant donné que l'exécution de chaque transaction Ethereum nécessite des ressources informatiques, ces ressources doivent être payées pour garantir qu'Ethereum ne soit pas vulnérable au spam et ne reste pas bloqué dans des boucles de calcul infinies. Le paiement concernant le calcul se fait sous forme de frais de gaz.

Les frais de gaz correspondent à **la quantité de gaz utilisée pour effectuer une opération, multipliée par le coût par unité de gaz**. Les frais sont payés, que la transaction réussisse ou échoue.

![Un diagramme montrant où le gaz est nécessaire dans les opérations de l'EVM](./gas.png)
_Diagramme adapté de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Les frais de gaz doivent être payés dans la monnaie native d'Ethereum, l'éther (ETH). Le prix du gaz est généralement indiqué en gwei, qui est une dénomination de l'ETH. Chaque gwei est égal à un milliardième d'ETH (0,000000001 ETH ou 10<sup>-9</sup> ETH).

Par exemple, au lieu de dire que votre gaz coûte 0,000000001 Ether, vous pouvez dire qu'il coûte 1 gwei.

Le mot "gwei" est une contraction de "giga-wei", qui signifie "milliard de wei". Un gwei est égal à un milliard de wei. Le Wei lui-même (nommé d'après [Wei Dai](https://wikipedia.org/wiki/Wei_Dai), créateur de [b-money](https://www.investopedia.com/terms/b/bmoney.asp)) est la plus petite unité d'ETH.

## Comment sont calculées les frais de gaz ? {#how-are-gas-fees-calculated}

Vous pouvez fixer le montant du gaz que vous êtes prêt à payer lorsque vous soumettez une transaction. En choissisant une certaine quantité de gaz, vous faites une offre pour que votre transaction soit incluse dans le bloc suivant. Si votre offre est insuffisante, les validateurs seront moins enclins à choisir votre transaction pour l'inclure, ce qui signifie que votre transaction risque d'être exécutée tardivement ou de ne pas être exécutée du tout. Si vous en offrez trop, vous risquez de gaspiller de l'ETH. Alors, comment savoir combien payer ?

Le gaz total que vous payez est divisé en deux composantes : les `frais de base` et les `frais de priorité` (pourboire).

Les `frais de base` sont définis par le protocole — vous devez payer au moins ce montant pour que votre transaction soit considérée comme valide. Les `frais de priorité` sont un pourboire que vous ajoutez aux frais de base pour rendre votre transaction attrayante pour les validateurs afin qu'ils la choisissent pour l'inclure dans le bloc suivant.

Une transaction qui ne paie que les `frais de base` est techniquement valide, mais il est peu probable qu'elle soit incluse, car elle n'offre aucune incitation aux validateurs pour la choisir par rapport à toute autre transaction. Les frais de `priorité` "corrects" sont déterminés par l'utilisation du réseau au moment où vous envoyez votre transaction — s'il y a beaucoup de demande, vous devrez peut-être fixer vos frais de `priorité` plus haut, mais lorsqu'il y a moins de demande, vous pouvez payer moins.

Par exemple, disons que Jordan doit payer 1 ETH à Taylor. Un transfert d'ETH nécessite 21 000 unités de gaz et les frais de base sont de 10 gwei. Jordan y ajoute un pourboire de 2 gwei.

Le montant total des frais s'élèverait alors à :

`unités de gaz utilisées * ( frais de base + frais de priorité)`

où les `frais de base` sont une valeur définie par le protocole et les `frais de priorité` une valeur définie par l'utilisateur en guise de pourboire au validateur.

par ex., `21,000 * (10 + 2) = 252,000 gwei` (0,000252 ETH).

Lorsque Jordan enverra de l'argent, 1,000252 ETH sera déduit du compte de Jordan. Thierry sera crédité de 1,0000 ETH. Le validateur reçoit un pourboire de 0,000042 ETH. Les `frais de base` de 0,00021 ETH sont brûlés.

### Frais de base {#base-fee}

Chaque bloc a des frais de base qui servent de prix de réserve. Pour être éligible à l'inclusion dans un bloc, le prix proposé en gaz doit être au moins égal aux frais de base. Les frais de base sont calculés indépendamment du bloc actuel et sont plutôt déterminés par les blocs qui le précèdent, ce qui rend les frais de transaction plus prévisibles pour les utilisateurs. Lors de la création du bloc, ces **frais de base sont "brûlés"**, ce qui les retire de la circulation.

Les frais de base sont calculés par une formule qui compare la taille du bloc précédent (la quantité de gaz utilisée pour toutes les transactions) avec la taille cible (la moitié de la limite de gaz). Les frais de base augmenteront ou diminueront d'un maximum de 12,5 % par bloc si la taille du bloc cible est respectivement supérieure ou inférieure à la cible. D'un point de vue économique, cette croissance exponentielle ne permet pas de garder indéfiniment des blocs de grande taille.

| Numéro de bloc | Gaz inclus | Augmentation des frais | Frais de base actuels |
| -------------- | ---------: | ---------------------: | --------------------: |
| 1              |        18M |                    0 % |              100 gwei |
| 2              |        36M |                    0 % |              100 gwei |
| 3              |        36M |                 12,5 % |            112,5 gwei |
| 4              |        36M |                 12,5 % |            126,6 gwei |
| 5              |        36M |                 12,5 % |            142,4 gwei |
| 6              |        36M |                 12,5 % |            160,2 gwei |
| 7              |        36M |                 12,5 % |            180,2 gwei |
| 8              |        36M |                 12,5 % |            202,7 gwei |

Dans le tableau ci-dessus, un exemple est présenté utilisant 36 millions comme limite de gaz. En suivant cet exemple, pour créer une transaction sur le bloc numéro 9, un portefeuille informera l'utilisateur avec certitude que les **frais de base maximum** à ajouter au bloc suivant sont de `frais de base actuels * 112.5%` ou `202.7 gwei * 112.5% = 228.1 gwei`.

Il est également important de noter qu'il est peu probable que nous assistions à des pics prolongés de blocs complets en raison de la vitesse à laquelle les frais de base augmentent avant un bloc complet.

| Numéro de bloc                                      |                                          Gaz inclus | Augmentation des frais |                               Frais de base actuels |
| --------------------------------------------------- | --------------------------------------------------: | ---------------------: | --------------------------------------------------: |
| 30                                                  |                                                 36M |                 12,5 % |                                        2 705,6 gwei |
| ... | ... |                 12,5 % | ... |
| 50                                                  |                                                 36M |                 12,5 % |                                       28 531,3 gwei |
| ... | ... |                 12,5 % | ... |
| 100                                                 |                                                 36M |                 12,5 % |                                   10 302 608,6 gwei |

### Frais de priorité (pourboires) {#priority-fee}

Les frais de priorité (pourboire) incitent les validateurs à maximiser le nombre de transactions dans un bloc, limité uniquement par la limite de gaz du bloc. Sans pourboires, un validateur rationnel pourrait inclure moins — voire aucune — transaction sans aucune pénalité directe de la couche d'exécution ou de la couche de consensus, car les récompenses de staking sont indépendantes du nombre de transactions dans un bloc. De plus, les pourboires permettent aux utilisateurs de surenchérir sur les autres pour la priorité au sein du même bloc, signalant ainsi une urgence.

### Frais maximum {#maxfee}

Pour exécuter une transaction sur le réseau, les utilisateurs peuvent spécifier une limite maximale qu'ils sont prêts à payer pour que leur transaction soit exécutée. Ce paramètre facultatif est connu sous le nom de `maxFeePerGas`. Pour qu'une transaction soit exécutée, les frais max doivent dépasser la somme des frais de base et du pourboire. La différence entre les frais maximums et la somme des frais de base et du pourboire est remboursée à l'émetteur de la transaction.

### Taille de bloc {#block-size}

Chaque bloc a une taille cible correspondant à la moitié de la limite de gaz actuelle, mais la taille des blocs augmentera ou diminuera en fonction de la demande du réseau, jusqu'à ce que la limite du bloc soit atteinte (2x la taille cible du bloc). Le protocole atteint en moyenne une taille de bloc d'équilibre à la cible par le processus de _tâtonnement_. Cela signifie que si la taille du bloc est plus importante que la taille cible du bloc, le protocole augmentera les frais de base pour le bloc suivant. De même, le protocole diminuera les frais de base si la taille du bloc est inférieure à la taille cible du bloc.

Le montant par lequel les frais de base sont ajustés est proportionnel à l'écart entre la taille actuelle et la taille cible du bloc. Il s'agit d'un calcul linéaire de -12,5 % pour un bloc vide, 0 % à la taille cible, jusqu'à +12,5 % pour un bloc atteignant la limite de gaz. La limite de gaz peut fluctuer dans le temps en fonction de la signalisation des validateurs, ainsi que via les mises à niveau du réseau. Vous pouvez [voir l'évolution de la limite de gaz dans le temps ici](https://eth.blockscout.com/stats/averageGasLimit?interval=threeMonths).

[En savoir plus sur les blocs](/developers/docs/blocks/)

### Calculer les frais de gaz en pratique {#calculating-fees-in-practice}

Vous pouvez indiquer explicitement le montant que vous êtes prêt à payer pour que votre transaction soit exécutée. Cependant, la plupart des fournisseurs de portefeuilles fixent automatiquement des frais de transaction recommandés (frais de base + frais de priorité recommandés) afin de réduire la complexité imposée à leurs utilisateurs.

## Pourquoi les frais de gaz existent-ils ? {#why-do-gas-fees-exist}

En résumé, les frais de gaz aident à sécuriser le réseau Ethereum. En exigeant des frais pour chaque calcul exécuté sur le réseau, nous empêchons les acteurs malveillants de spammer le réseau. Afin d'éviter les boucles infinies accidentelles ou hostiles ou d'autres gaspillages de calcul dans le code, chaque transaction doit limiter le nombre d'étapes de calcul dans l'exécution du code. L'unité fondamentale de calcul est le « gaz ».

Bien qu'une transaction comprenne une limite, tout gaz non utilisé dans une transaction est retourné à l'utilisateur (par ex., `frais max - (frais de base + pourboire)` est retourné).

![Diagramme montrant comment le gaz non utilisé est remboursé](../transactions/gas-tx.png)
_Diagramme adapté de [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

## Qu'est-ce que la limite de gaz ? {#what-is-gas-limit}

La limite de gaz correspond à la quantité maximale de gaz que vous êtes prêt à consommer lors d'une transaction. Les transactions plus compliquées impliquant des [contrats intelligents](/developers/docs/smart-contracts/) nécessitent plus de travail de calcul, elles exigent donc une limite de gaz plus élevée qu'un simple paiement. Un transfert standard d'ETH nécessite une limite de gaz de 21 000 unités de gaz.

Par exemple, si vous définissez votre limite de gaz à 50 000 pour un simple transfert ETH, l'EVM en consommera 21 000 et vous récupérerez les 29 000 restants. Cependant, si vous spécifiez trop peu de gaz, par exemple une limite de gaz de 20 000 pour un simple transfert d’ETH, la transaction échouera lors de la phase de validation. Elle sera rejetée avant d’être incluse dans un bloc, et aucun gaz ne sera consommé. En revanche, si une transaction épuise tout son gaz pendant l'exécution (par exemple, un contrat intelligent utilise tout le gaz à mi-parcours), l'EVM
annulera toutes les modifications effectuées, mais tout le gaz fourni sera tout de même consommé pour le travail accompli.

## Pourquoi les frais de gaz peuvent-ils devenir si élevés ? {#why-can-gas-fees-get-so-high}

Les frais élevés de gaz sont le fruit de la popularité d'Ethereum. Si la demande est trop forte, les utilisateurs doivent proposer des pourboires plus élevés pour tenter de surenchérir sur les transactions des autres utilisateurs. Un pourboire plus élevé augmentera la possibilité que votre transaction soit intégrée au prochain bloc. De plus, les applications de contrats intelligents plus complexes peuvent effectuer de nombreuses opérations pour assurer leurs fonctions, ce qui leur fait consommer beaucoup de gaz.

## Initiatives pour réduire les coûts du gaz {#initiatives-to-reduce-gas-costs}

Les [mises à niveau de la scalabilité](/roadmap/) d'Ethereum devraient à terme résoudre certains des problèmes de frais de gaz, ce qui, à son tour, permettra à la plateforme de traiter des milliers de transactions par seconde et de s'adapter à l'échelle mondiale.

La mise à l'échelle de la couche 2 est une initiative primordiale pour améliorer considérablement les coûts de gaz, l'expérience utilisateur et l'évolutivité.

[En savoir plus sur la mise à l'échelle de couche 2](/developers/docs/scaling/#layer-2-scaling)

## Surveillance des frais de gaz {#monitoring-gas-fees}

Si vous voulez surveiller les prix du gaz et pouvoir envoyer votre ETH à moindre coût, vous pouvez utiliser différents outils comme :

- [Etherscan](https://etherscan.io/gastracker) _Estimateur du prix du gaz de transaction_
- [Blockscout](https://eth.blockscout.com/gas-tracker) _Estimateur open source du prix du gaz de transaction_
- [ETH Gas Tracker](https://www.ethgastracker.com/) _Surveillez et suivez les prix du gaz d'Ethereum et de L2 pour réduire les frais de transaction et économiser de l'argent_
- [Blocknative ETH Gas Estimator](https://chrome.google.com/webstore/detail/blocknative-eth-gas-estim/ablbagjepecncofimgjmdpnhnfjiecfm) _Extension Chrome d'estimation du gaz prenant en charge à la fois les transactions héritées de Type 0 et les transactions de Type 2 EIP-1559._
- [Cryptoneur Gas Fees Calculator](https://www.cryptoneur.xyz/gas-fees-calculator) _Calculez les frais de gaz dans votre devise locale pour différents types de transactions sur le réseau principal (Mainnet), Arbitrum et Polygon._

## Outils connexes {#related-tools}

- [Plateforme Gas de Blocknative](https://www.blocknative.com/gas) _API d'estimation du gaz alimentée par la plateforme mondiale de données mempool de Blocknative_
- [Gas Network](https://gas.network) Oracles de gaz en chaîne. Prise en charge de plus de 35 chaînes.

## En savoir plus {#further-reading}

- [Le gaz d'Ethereum expliqué](https://defiprime.com/gas)
- [Réduire la consommation de gaz de vos contrats intelligents](https://medium.com/coinmonks/8-ways-of-reducing-the-gas-consumption-of-your-smart-contracts-9a506b339c0a)
- [Stratégies d'optimisation du gaz pour les développeurs](https://www.alchemy.com/overviews/solidity-gas-optimization)
- [Documentation EIP-1559](https://eips.ethereum.org/EIPS/eip-1559).
- [Ressources EIP-1559 de Tim Beiko](https://hackmd.io/@timbeiko/1559-resources)
- [EIP-1559 : séparer les mécanismes des mèmes](https://web.archive.org/web/20241126205908/https://research.2077.xyz/eip-1559-separating-mechanisms-from-memes)
