---
title: Stratégies de stockage de données sur la chaîne de blocs
description: Il existe plusieurs façons de stocker des données à l'aide de la chaîne de blocs. Cet article compare les différentes stratégies, leurs coûts et leurs compromis, ainsi que les exigences pour les utiliser en toute sécurité.
lang: fr
---

Il existe de multiples façons de stocker des informations soit directement sur la chaîne de blocs, soit d'une manière sécurisée par la chaîne de blocs :

- Blobs de l'EIP-4844
- Données d'appel
- Hors chaîne avec des mécanismes de la couche 1 (L1)
- « Code » de contrat
- Événements
- Stockage de l'EVM

Le choix de la méthode à utiliser repose sur plusieurs critères :

- La source de l'information. Les informations dans les données d'appel ne peuvent pas provenir directement de la chaîne de blocs elle-même.
- La destination de l'information. Les données d'appel sont uniquement disponibles dans la transaction qui les inclut. Les événements ne sont pas du tout accessibles onchain.
- Quel niveau de contrainte est acceptable ? Les ordinateurs qui exécutent un nœud complet peuvent effectuer plus de traitement qu'un client léger dans une application s'exécutant dans un navigateur.
- Est-il nécessaire de faciliter un accès aisé à l'information depuis chaque nœud ?
- Les exigences de sécurité.

## Les exigences de sécurité {#security-requirements}

En général, la sécurité de l'information repose sur trois attributs :

- _Confidentialité_ : les entités non autorisées ne sont pas autorisées à lire l'information. C'est important dans de nombreux cas, mais pas ici. _Il n'y a pas de secrets sur la chaîne de blocs_. Les chaînes de blocs fonctionnent parce que n'importe qui peut vérifier les transitions d'état, il est donc impossible de les utiliser pour stocker directement des secrets. Il existe des moyens de stocker des informations confidentielles sur la chaîne de blocs, mais ils reposent tous sur un composant hors chaîne pour stocker au moins une clé.

- _Intégrité_ : l'information est correcte, elle ne peut pas être modifiée par des entités non autorisées, ou de manière non autorisée (par exemple, transférer des [jetons ERC-20](https://eips.ethereum.org/EIPS/eip-20#events) sans un événement `Transfer`). Sur la chaîne de blocs, chaque nœud vérifie chaque changement d'état, ce qui garantit l'intégrité.

- _Disponibilité_ : l'information est disponible pour toute entité autorisée. Sur la chaîne de blocs, cela est généralement accompli en rendant l'information disponible sur chaque [nœud complet](https://ethereum.org/developers/docs/nodes-and-clients/#full-node).

Les différentes solutions présentées ici offrent toutes une excellente intégrité, car les hashs sont publiés sur L1. Cependant, elles présentent des garanties de disponibilité différentes.

## Prérequis {#prerequisites}

Vous devriez avoir une bonne compréhension des [fondamentaux de la chaîne de blocs](/developers/docs/intro-to-ethereum/). Cette page suppose également que le lecteur est familier avec les [blocs](/developers/docs/blocks/), les [transactions](/developers/docs/transactions/), et d'autres sujets connexes.

## Blobs de l'EIP-4844 {#eip-4844-blobs}

À partir du [hard fork Dencun](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/beacon-chain.md), la chaîne de blocs Ethereum inclut l'[EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), qui ajoute à Ethereum des blobs de données avec une durée de vie limitée (initialement d'environ [18 jours](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration)). Ces blobs sont tarifés séparément du [gaz d'exécution](/developers/docs/gas), bien qu'ils utilisent un mécanisme similaire. C'est un moyen économique de publier des données temporaires.

Le principal cas d'utilisation des blobs de l'EIP-4844 concerne les rollup pour publier leurs transactions. Les [rollup optimistes](/developers/docs/scaling/optimistic-rollups) ont besoin de publier les transactions sur leurs chaînes de blocs. Ces transactions doivent être accessibles à tous pendant la [période de contestation](https://docs.optimism.io/connect/resources/glossary#challenge-period) afin de permettre aux [validateurs](https://docs.optimism.io/connect/resources/glossary#validator) de corriger l'erreur si le [séquenceur](https://docs.optimism.io/connect/resources/glossary#sequencer) du rollup publie une racine d'état incorrecte.

Cependant, une fois la période de contestation écoulée et la racine d'état finalisée, la seule utilité restante de connaître ces transactions est de répliquer l'état actuel de la chaîne. Cet état est également disponible depuis les nœuds de la chaîne, nécessitant beaucoup moins de puissance de traitement. Ainsi, les informations de transaction doivent tout de même être conservées à quelques endroits, comme les [explorateurs de blocs](/developers/docs/data-and-analytics/block-explorers), mais il n'est pas nécessaire de payer pour le niveau de résistance à la censure qu'offre Ethereum.

Les [rollup à divulgation nulle de connaissance](/developers/docs/scaling/zk-rollups/#data-availability) publient également leurs données de transaction pour permettre à d'autres nœuds de répliquer l'état existant et de vérifier les preuves de validité, mais il s'agit encore une fois d'une exigence à court terme.

Au moment de la rédaction, la publication via l'EIP-4844 coûte un Wei (10<sup>-18</sup> ETH) par octet, ce qui est négligeable comparé aux [21 000 de gaz d'exécution que coûte n'importe quelle transaction, y compris celles publiant des blobs](https://eth.blockscout.com/tx/0xf6cfaf0431c73dd1d96369a5e6707d64f463ccf477a4131265397f1d81466929?tab=index). Vous pouvez consulter le prix actuel de l'EIP-4844 sur [blobscan.com](https://blobscan.com/blocks).

Voici les adresses pour voir les blobs publiés par certains rollup célèbres.

| Rollup                               | Adresse de la boîte de réception                                                                                                        |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://blobscan.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://blobscan.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://blobscan.com/address/0xFF00000000000000000000000000000000008453) |

## Données d'appel {#calldata}

Les données d'appel désignent les octets envoyés dans le cadre de la transaction. Elles sont stockées de façon permanente dans le registre de la chaîne de blocs, au sein du bloc qui inclut cette transaction.

C'est la méthode la moins chère pour inscrire définitivement des données sur la chaîne de blocs. Le coût par octet est de 4 gaz d'exécution (si l'octet est zéro) ou de 16 gaz (toute autre valeur). Si les données sont compressées, ce qui est une pratique courante, alors chaque valeur d'octet a la même probabilité d'apparaître, le coût moyen est donc d'environ 15,95 de gaz par octet.

Au moment de la rédaction de cet article, les prix s'élèvent à 12 gwei/gaz et 2300 $/ETH, ce qui signifie que le coût est d'environ 45 centimes par kilo-octet. Étant donné que c'était la méthode la plus économique avant l'EIP-4844, c'est celle utilisée par les rollup pour stocker les informations de transaction, qui doivent être disponibles pour les [contestations de faille](https://docs.optimism.io/stack/protocol/overview#fault-proofs), mais n'ont pas besoin d'être accessibles directement onchain.

Voici les adresses pour voir les transactions publiées par certains rollup célèbres.

| Rollup                               | Adresse de la boîte de réception                                                                                                               |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| [Optimism](https://www.optimism.io/) | [`0xFF00000000000000000000000000000000000010`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000000010) |
| [Arbitrum](https://arbitrum.io/)     | [`0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6`](https://eth.blockscout.com/address/0x1c479675ad559DC151F6Ec7ed3FbF8ceE79582B6) |
| [Base](https://base.org/)            | [`0xFF00000000000000000000000000000000008453`](https://eth.blockscout.com/address/0xFF00000000000000000000000000000000008453) |

## Hors chaîne avec des mécanismes de la couche 1 (L1) {#offchain-with-l1-mechs}

Selon vos compromis en matière de sécurité, il peut être acceptable de placer l'information ailleurs et d'utiliser un mécanisme qui garantit que les données sont disponibles en cas de besoin. Il y a deux exigences pour que cela fonctionne :

1. Publier un [hash](https://en.wikipedia.org/wiki/Cryptographic_hash_function) des données sur la chaîne de blocs, appelé _engagement d'entrée_. Il peut s'agir d'un simple mot de 32 octets, ce qui n'est pas coûteux. Tant que l'engagement d'entrée est disponible, l'intégrité est assurée car il n'est pas possible de trouver d'autres données dont le hash donnerait la même valeur. Ainsi, si des données incorrectes sont fournies, cela peut être détecté.

2. Avoir un mécanisme qui garantit la disponibilité. Par exemple, dans [Redstone](https://redstone.xyz/docs/what-is-redstone), n'importe quel nœud peut soumettre une contestation de disponibilité. Si le séquenceur ne répond pas onchain avant la date limite, l'engagement d'entrée est rejeté, et l'information est donc considérée comme n'ayant jamais été publiée.

Ceci est acceptable pour un rollup optimiste car nous nous appuyons déjà sur la présence d'au moins un vérificateur honnête pour la racine d'état. Un tel vérificateur honnête s'assurera également de disposer des données pour traiter les blocs, et émettra une contestation de disponibilité si l'information n'est pas disponible hors chaîne. Ce type de rollup optimiste est appelé [Plasma](/developers/docs/scaling/plasma/).

## Code du contrat {#contract-code}

Les informations qui ne doivent être écrites qu'une seule fois, qui ne sont jamais écrasées, et qui doivent être disponibles onchain peuvent être stockées sous forme de code de contrat. Cela signifie que nous créons un « contrat intelligent » contenant les données et utilisons ensuite [`EXTCODECOPY`](https://www.evm.codes/#3c?fork=shanghai) pour lire ces informations. L'avantage est que la copie de code est relativement peu coûteuse.

Hormis le coût d'expansion de la mémoire, `EXTCODECOPY` coûte 2600 de gaz pour le premier accès à un contrat (lorsqu'il est « froid ») et 100 de gaz pour les copies ultérieures issues du même contrat, plus 3 de gaz par mot de 32 octets. Comparé aux données d'appel, qui coûtent 15,95 par octet, cette solution devient plus économique à partir d'environ 200 octets. D'après [la formule des coûts d'expansion de la mémoire](https://www.evm.codes/about#memoryexpansion), tant que vous n'avez pas besoin de plus de 4 Mo de mémoire, le coût d'expansion est inférieur au coût d'ajout de données d'appel.

Bien sûr, il ne s'agit là que du coût de _lecture_ des données. La création du contrat coûte environ 32 000 de gaz + 200 de gaz par octet. Cette méthode n'est rentable que lorsque la même information doit être lue de nombreuses fois au cours de différentes transactions.

Le code du contrat peut n'avoir aucun sens, tant qu'il ne commence pas par `0xEF`. Les contrats commençant par `0xEF` sont interprétés selon le [format d'objet Ethereum (EOF)](https://notes.ethereum.org/@ipsilon/evm-object-format-overview), qui comporte des exigences beaucoup plus strictes.

## Événements {#events}

Les [événements](https://docs.alchemy.com/docs/solidity-events) sont émis par les contrats intelligents, et lus par des logiciels hors chaîne.
Leur avantage est que le code hors chaîne peut écouter les événements. Le coût s'exprime en [gaz](https://www.evm.codes/#a0?fork=cancun) : 375 plus 8 de gaz par octet de données. À 12 gwei/gaz et 2300 $/ETH, cela correspond à un centime plus 22 centimes par kilo-octet.

## Stockage {#storage}

Les contrats intelligents ont accès à un [stockage persistant](https://docs.alchemy.com/docs/smart-contract-storage-layout#what-is-storage-memory). Cependant, ce dernier est très coûteux. L'écriture d'un mot de 32 octets dans un créneau de stockage auparavant vide peut [coûter 22 100 de gaz](https://www.evm.codes/#55?fork=cancun). À 12 gwei/gaz et 2300 $/ETH, cela représente environ 61 centimes par opération d'écriture, ou 19,5 $ par kilo-octet.

Il s'agit de la forme de stockage la plus onéreuse sur Ethereum.

## Résumé {#summary}

Ce tableau résume les différentes options, leurs avantages et leurs inconvénients.

| Type de stockage | Source des données | Garantie de disponibilité | Disponibilité onchain | Limites supplémentaires |
| --------------------------- | ------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Blobs de l'EIP-4844              | Hors chaîne            | Garantie Ethereum pendant [~18 jours](https://github.com/ethereum/consensus-specs/blob/master/specs/deneb/p2p-interface.md#configuration) | Seul le hash est disponible                                           |                                                                         |
| Données d'appel                    | Hors chaîne            | Garantie d'Ethereum pour toujours (partie de la chaîne de blocs)                                                                                | Uniquement disponible si écrites dans un contrat, et lors de cette transaction |
| Hors chaîne avec mécanismes de la couche 1 (L1) | Hors chaîne            | Garantie d'« un vérificateur honnête » pendant la période de contestation                                                                        | Seulement le hash                                                        | Garantie par le mécanisme de contestation, uniquement pendant la période de contestation |
| Code de contrat               | Onchain ou hors chaîne | Garantie d'Ethereum pour toujours (partie de la chaîne de blocs)                                                                                | Oui                                                              | Écrit à une adresse « aléatoire », ne peut pas commencer par `0xEF`                 |
| Événements                      | Onchain             | Garantie d'Ethereum pour toujours (partie de la chaîne de blocs)                                                                                | Non                                                               |
| Stockage                     | Onchain             | Garantie d'Ethereum pour toujours (partie de la chaîne de blocs et de l'état actuel jusqu'à écrasement)                                        | Oui                                                              |