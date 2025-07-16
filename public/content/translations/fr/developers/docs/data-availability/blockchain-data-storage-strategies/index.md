---
title: Stratégies de stockage des données de la Blockchain
description: Il existe plusieurs façons de stocker des données en utilisant la blockchain. Cet article comparera les différentes stratégies, leurs coûts et avantages, ainsi que les conditions requises pour les utiliser en toute sécurité.
lang: fr
---

Il existe de multiples façons de stocker des informations, soit directement sur la blockchain, soit d'une manière sécurisée par la blockchain :

- Blobs EIP-4844
- Données d'appel
- Hors chaîne avec des mécanismes de couche de niveau 1
- "Code" de contrat
- Évènements
- Stockage EVM

Le choix de la méthode à utiliser repose sur plusieurs critères :

- La source de l'information. Les informations dans calldata ne peuvent pas provenir directement de la blockchain elle-même.
- La destination de l'information. Le calldata n'est disponible que dans la transaction qu'il initie. Les événements ne sont pas accessibles sur la chaine.
- Quel niveau de complexité est acceptable ? Les ordinateurs qui exécutent un nœud complet peuvent effectuer plus de traitement qu'un client léger dans une application fonctionnant dans un navigateur.
- Est-il nécessaire de faciliter l'accès aux informations depuis chaque nœud ?
- Les exigences en matière de sécurité.

## Les exigences de sécurité {#security-requirements}

En général, la sécurité de l'information se compose de trois attributs :

- _Confidentialité_, les entités non autorisées n'ont pas le droit de lire les informations. Cela est important dans de nombreux cas, mais pas ici. _Il n'y a pas de secret sur la blockchain_. Les blockchains fonctionnent parce que n'importe qui peut vérifier les transitions d'état, de sorte qu'il est impossible de les utiliser pour stocker directement des secrets. Il existe des moyens de stocker des informations confidentielles sur la blockchain, mais ils reposent tous sur un composant hors blockchain pour stocker au moins une clé.

- _Intégrité_, les informations sont correctes, elles ne peuvent pas être modifiées par des entités non autorisées, ou de manière non autorisée (par exemple, en transférant des [jetons ERC-20] (https://eips.ethereum.org/EIPS/eip-20#events) sans un événement `Transfer`). Sur la blockchain, chaque nœud vérifie chaque changement d'état, ce qui garantit l'intégrité.

- _Disponibilité_, l'information est accessible à toute entité autorisée. Sur la blockchain, cela est généralement réalisé en rendant l'information disponible sur chaque [nœud complet](https://ethereum.org/developers/docs/nodes-and-clients#full-node).

Les différentes solutions présentées ici offrent toutes une excellente intégrité, car les hachages sont publiés sur la couche de niveau 1. Cependant, elles ont des garanties de disponibilité différentes.

## Prérequis {#prerequisites}

Vous devez avoir une bonne compréhension des [fondamentaux de la blockchain](/developers/docs/intro-to-ethereum/). Cette page suppose également que le lecteur est familier avec les [blocs](/developers/docs/blocks/), [les transactions](/developers/docs/transactions/), et d'autres sujets pertinents.

## Blobs EIP-4844 {#eip-4844-blobs}

Depuis la [hardfork Dencun](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/beacon-chain.md), la blockchain Ethereum inclut [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), qui ajoute à Ethereum des blobs de données dotés d'une durée de vie limitée (initialement d'environ [18 jours](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration)). Ces blobs sont tarifés séparément du gaz d'[exécution](/developers/docs/gas), bien qu'utilisant un mécanisme similaire. Ils constituent un moyen économique de publier des données temporaires.

L'utilisation principale des blobs EIP-4844 est la publication par les rollups de leurs transactions. [Les rollups](/developers/docs/scaling/optimistic-rollups) optimistes doivent publier les transactions sur leurs blockchains. Ces transactions doivent être accessibles à tout le monde pendant la [période de contestation](https://docs.optimism.io/connect/resources/glossary#challenge-period), afin de permettre aux [validateurs](https://docs.optimism.io/connect/resources/glossary#validator) de corriger l'erreur si le [séquenceur](https://docs.optimism.io/connect/resources/glossary#sequencer) du rollup publie une racine d'état incorrecte.

Cependant, une fois la période de contestation passée et la racine d'état finalisée, la raison restante de connaître ces transactions est de reproduire l'état actuel de la chaîne. Cet état est également disponible à partir des nœuds de la chaîne, avec beaucoup moins de traitement. Les informations sur les transactions doivent donc être conservées dans certains endroits, comme les [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers), mais il n'est pas nécessaire de payer pour le niveau de résistance à la censure qu'offre Ethereum.

[Les rollups à preuve de connaissance nulle](/developers/docs/scaling/zk-rollups/#data-availability) publient également leurs données de transaction pour permettre à d'autres nœuds de répliquer l'état existant et de vérifier les preuves de validité, mais là encore, il s'agit d'une exigence à court terme.

Au moment de la rédaction, la publication sur EIP-4844 coûte un wei (10<sup>-18</sup> ETH) par octet, ce qui est négligeable par rapport [aux 21 000 unités de gaz d'exécution qu'une transaction, y compris celle qui publie des blobs, coûte](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Vous pouvez voir le prix actuel de l'EIP-4844 sur [blobscan.com](https://blobscan.com/blocks).

Voici les adresses pour voir les blobs publiés par certains rollups célèbres.

| Rollup                               | Adresse                                                                                                                 |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Données d'appel {#calldata}

Le terme de données d'appel fait référence aux octets envoyés dans le cadre d'une transaction. Elles sont stockées dans l'enregistrement permanent de la blockchain dans le bloc qui contient cette transaction.

Il s'agit de la méthode la moins coûteuse pour enregistrer des données de manière permanente sur la blockchain. Le coût par octet est de 4 unités de gaz d'exécution (si l'octet est zéro) ou de 16 unités de gaz (pour toute autre valeur). Si les données sont compressées, ce qui est une pratique courante, alors chaque valeur d'octet a la même probabilité, de sorte que le coût moyen est d'environ 15,95 unités de gaz par octet.

Au moment de la rédaction, les prix sont de 12 gwei/gaz et 2 300 $/ETH, ce qui signifie que le coût est d'environ 45 cents par kilo-octet. Dans la mesure où il s'agissait de la méthode la moins coûteuse avant l'EIP-4844, les rollups l'utilisaient pour stocker les informations de transaction, celles-ci devant être disponibles pour les [contestations de fautes](https://docs.optimism.io/stack/protocol/overview#fault-proofs), mais n'ayant pas besoin d'être accessibles directement sur la chaîne.

Voici les adresses pour voir les transactions publiées par certains rollups célèbres.

| Rollup                               | Adresse                                                                                                                       |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Stockage hors chaîne avec des mécanismes de couche 1 {#offchain-with-l1-mechs}

En fonction de vos compromis en matière de sécurité, il peut être acceptable de placer l'information ailleurs et d'utiliser un mécanisme garantissant que les données sont disponibles en cas de besoin. Deux conditions doivent être remplies pour que cela fonctionne :

1. Publier un [hachage](https://en.wikipedia.org/wiki/Cryptographic_hash_function) des données sur la blockchain, appelé _engagement d'entrée_. Il peut s'agir d'un simple mot de 32 octets, ce qui n'est pas coûteux. Tant que l'engagement d'entrée est disponible, l'intégrité est assurée puisqu'il n'est pas possible de trouver d'autres données qui aboutiraient à la même valeur. Ainsi, si des données incorrectes sont fournies, elles peuvent être détectées.

2. Avoir un mécanisme garantissant la disponibilité. Par exemple, dans [Redstone](https://redstone.xyz/docs/what-is-redstone) n'importe quel nœud peut soumettre un défi de disponibilité. Si le séquenceur ne répond pas sur la chaîne avant la date limite, l'engagement d'entrée est abandonné, de sorte que l'information est considérée comme n'ayant jamais été publiée.

Ceci est acceptable dans le cas d'un rollup optimiste car nous comptons déjà sur la présence d'au moins un vérificateur honnête pour la racine d'état. Un tel vérificateur s'assurera également d'avoir les données nécessaires pour traiter les blocs et émettre un défi de disponibilité si l'information n'est pas disponible hors chaîne. Ce type de rollup optimiste est appelé [plasma](/developers/docs/scaling/plasma/).

## Code du contrat {#contract-code}

Les informations qui ne doivent être écrites qu'une seule fois, qui ne sont jamais écrasées et doivent être disponibles sur la chaîne peuvent être stockées en tant que code de contrat. Cela signifie que nous créons un "contrat intelligent" avec les données, puis utilisons [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) pour lire l'information. L'avantage est que copier du code est relativement peu coûteux.

Outre le coût d'expansion de la mémoire, EXTCODECOPY coûte 2 600 unités de gaz pour le premier accès à un contrat (lorsqu'il est "froid") et 100 unités de gaz pour les copies suivantes du même contrat, plus 3 unités de gaz par mot de 32 octets. Comparé au calldata, qui coûte 15,95 unités de gaz par octet, cette méthode devient moins chère à partir d'environ 200 octets. D'après [la formule des coûts d'expansion de la mémoire](https://www.evm.codes/about#memoryexpansion), tant que vous n'avez pas besoin de plus de 4 Mo de mémoire, le coût d'expansion de la mémoire est inférieur à celui de l'ajout de calldata.

Bien sûr, cela ne concerne que le coût de lecture des données. La création du contrat coûte environ 32 000 unités de gaz + 200 unités de gaz par octet. Cette méthode n'est économique que lorsque la même information doit être lue plusieurs fois dans différentes transactions.

Le code du contrat peut être dépourvu de sens, tant qu'il ne commence pas par 0xEF. Les contrats qui commencent par 0xEF sont interprétés comme un [format d'objet Ethereum](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), qui a des exigences beaucoup plus strictes.

## Événements {#events}

[Les événements](https://docs.alchemy.com/docs/solidity-events) sont émis par des contrats intelligents et sont lus par des logiciels hors chaîne.
Leur avantage est que le code hors chaîne peut écouter les événements. Le coût est en [gaz](https://www.evm.codes/#a0?fork=cancun), 375 unités plus 8 unités de gaz par octet de données. À 12 gwei/gaz et 2 300 $/ETH, cela correspond à un cent plus 22 cents par kilo-octet.

## Stockage {#storage}

Les contrats intelligents ont accès à un [stockage persistant](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Cependant, cela est très coûteux. Écrire un mot de 32 octets dans un créneau de stockage précédemment vide peut [coûter 22 100 unités de gaz](https://www.evm.codes/#55?fork=cancun). À 12 gwei/gaz et 2 300 $/ETH, cela représente environ 61 cents par opération d'écriture, soit 19,5 $ par kilo-octet.

Il s'agit de la forme de stockage la plus coûteuse sur Ethereum.

## Résumé {#summary}

Ce tableau résume les différentes options, leurs avantages et inconvénients.

| Type de stockage                                      | Source des données        | Garantie de disponibilité                                                                                                                               | Disponibilité sur la chaîne                                                  | Limitations supplémentaires                                                            |
| ----------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| Blobs EIP-4844                                        | Hors chaîne               | Garantie sur Ethereum pour [~18 jours](https://github.com/ethereum/consensus-specs/blob/dev/specs/deneb/p2p-interface.md#configuration) | Seul le hachage est disponible                                               |                                                                                        |
| Données d'appel                                       | Hors chaîne               | Garantie perpétuelle sur Ethereum (fait partie de la blockchain)                                                                     | Disponible uniquement si écrit dans un contrat, et lors de cette transaction |                                                                                        |
| Hors chaîne avec des mécanismes de couche de niveau 1 | Hors chaîne               | Garantie d'un "vérificateur honnête" pendant la période de contestation                                                                                 | Hachage uniquement                                                           | Garanti par le mécanisme de contestation, seulement pendant la période de contestation |
| Code contrat                                          | Sur chaîne ou hors chaîne | Garantie perpétuelle sur Ethereum (fait partie de la blockchain)                                                                     | Oui                                                                          | Écrit à une adresse "aléatoire", ne peut pas commencer par `0xEF`                      |
| Évènements                                            | Sur la chaîne             | Garantie perpétuelle sur Ethereum (fait partie de la blockchain)                                                                     | Non                                                                          |                                                                                        |
| Stockage                                              | Sur la chaîne             | Garantie perpétuelle sur Ethereum (fait partie de la blockchain et de l'état actuel jusqu'à écrasement)                              | Oui                                                                          |                                                                                        |
