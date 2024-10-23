---
title: Blocs
description: Présentation des blocs de la blockchain Ethereum, leur structure de données, pourquoi ils sont nécessaires et comment ils sont créés.
lang: fr
---

Les blocs sont des lots de transactions avec un hachage du bloc précédent dans la chaîne. Ceci relie les blocs ensemble (dans une chaîne) car les hachages sont cryptographiquement dérivés des données des blocs. Cela empêche la fraude, car un changement dans n'importe quel bloc de l'historique invaliderait tous les blocs suivants puisque tous les hachages ultérieurs changeraient et que quiconque exécutant la blockchain le remarquerait.

## Prérequis {#prerequisites}

Les blocs sont un sujet très accessible pour les débutants. Mais pour vous aider à mieux comprendre cette page, nous vous recommandons de commencer par lire les pages [Comptes](/developers/docs/accounts/), [Transactions](/developers/docs/transactions/) et [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Pourquoi les blocs? {#why-blocks}

Afin de s'assurer que tous les participants du réseau Ethereum restent synchronisés et s'accordent sur l'historique exacte des transactions, les transactions sont traitées par blocs. Cela signifie que des dizaines (ou centaines) de transactions sont engagées, acceptées et synchronisées en même temps.

![Un schéma montrant la transaction dans un bloc provoquant des changements d'état](./tx-block.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

En espaçant les engagements, nous donnons à tous les participants du serveur assez de temps pour parvenir à un consensus : même si les demande de transaction se présentent des dizaines de fois par seconde, les blocs sont seulement créés et engagés sur Ethereum toutes les douze secondes.

## Comment fonctionnent les blocs {#how-blocks-work}

Pour préserver l'historique des transactions, les blocs sont strictement ordonnés (chaque nouveau bloc créé contient une référence à son bloc parent), et les transactions au sein des blocs sont également strictement ordonnées. Sauf dans de rares cas, à tout moment, tous les participants au réseau sont d'accord sur le nombre exact et l'historique des blocs, et s'efforcent de regrouper les demandes de transactions en cours dans le bloc suivant.

Une fois qu'un bloc a été lié aux autres blocs par un validateur sélectionné aléatoirement sur le réseau, il est scellé au reste du réseau ; ce bloc ajouté à la chaîne de bloc (blockchain) est lié au précédent, et une copie est transmise à tous les noeuds du réseau, ensuite un autre validateur est sélectionné pour créer le nouveau bloc. Le processus exact d'assemblage de blocs et le processus d'engagement/consensus sont actuellement spécifiés par le protocole de la « preuve d'enjeu » d'Ethereum.

## Protocole de la preuve d'enjeu {#proof-of-work-protocol}

La preuve d'enjeu implique les éléments suivants :

- La validation des nœuds nécessite de miser 32 ETH dans un contrat de dépôt comme collatéral contre les mauvais comportements. Cela aide à protéger le réseau puisque des activités manifestement malhonnêtes mènent à la destruction de tout ou partie des mises.
- Dans chaque créneau (espacés de douze secondes), un validateur est sélectionné aléatoirement pour être le proposant de bloc. Ils regroupent les transactions ensemble, les exécutent et déterminent un nouvel « état ». Ils enveloppent ces informations dans un bloc et les transmettent à d'autres validateurs.
- Les autres validateurs qui entendent parler d'un nouveau bloc exécutent à nouveau les transactions pour s'assurer qu'ils sont d'accord avec le changement proposé d'état global. En supposant que le bloc soit valide, ils l'ajoutent à leur propre base de données.
- Si des validateurs entendent parler de deux blocs en conflit pour le même créneau, ils utilisent leur algorithme de choix de fourche pour choisir celui supporté par le plus grand nombre de mise en jeu d'ETH.

[En savoir plus sur la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos)

## Que contient un bloc ? {#block-anatomy}

Un bloc contient de nombreuses informations. Au plus haut niveau, un bloc contient les champs suivants :

| Champ            | Description                                                    |
|:---------------- |:-------------------------------------------------------------- |
| `Créneau`        | le créneau auquel appartient le bloc                           |
| `proposer_index` | l'ID du validateur proposant le bloc                           |
| `parent_root`    | le hachage du bloc précédent                                   |
| `state_root`     | le hachage racine de l'objet état                              |
| `présentation`   | un objet contenant plusieurs champs, tel que défini ci-dessous |

Le corps `body` du bloc contient plusieurs champs propres :

| Champ                | Description                                                          |
|:-------------------- |:-------------------------------------------------------------------- |
| `randao_reveal`      | une valeur utilisée pour sélectionner le prochain proposant de bloc  |
| `eth1_data`          | informations sur le contrat de dépôt                                 |
| `graffiti`           | données arbitraires utilisées pour étiqueter les blocs               |
| `proposer_slashings` | liste des validateurs à délester                                     |
| `attester_slashings` | liste des validateurs à sanctionner                                  |
| `attestations`       | liste des attestations en faveur du bloc actuel                      |
| `dépôts`             | liste des nouveaux dépôts au contrat de dépôt                        |
| `voluntary_exits`    | liste des validateurs quittant le réseau                             |
| `sync_aggregate`     | sous-ensemble de validateurs utilisés pour servir les clients légers |
| `execution_payload`  | transactions passées depuis le client d'exécution                    |

Le champ `attestations` contient une liste de toutes les attestations dans le bloc. Les attestations ont leur propre type de données, qui contient plusieurs morceaux de données. Chaque attestation contient :

| Champ              | Description                                                   |
|:------------------ |:------------------------------------------------------------- |
| `aggregation_bits` | une liste des validateurs ayant participé à cette attestation |
| `données`          | un conteneur avec plusieurs sous-champs                       |
| `signature`        | agrégat de signature de tous les validateurs attestant        |

Le champ `data` dans `attestation` contient les éléments suivants :

| Champ               | Description                                         |
|:------------------- |:--------------------------------------------------- |
| `Créneau`           | le créneau auquel se rapporte l'attestation         |
| `Index`             | indices pour les validateurs attestant              |
| `beacon_block_root` | le hachage racine du bloc Phare contenant cet objet |
| `source`            | le dernier point de contrôle justifié               |
| `target`            | le dernier bloc limite de l'époque                  |

Exécuter les transactions dans `execution_payload` met à jour l'état global. Tous les clients réexécutent les transactions dans le champ `execution_payload` pour s'assurer que le nouvel état corresponde à celui du champ `state_root` du nouveau bloc. C'est ainsi que les clients peuvent dire qu'un nouveau bloc est valide et sûr afin de l'ajouter à leur blockchain. Le `bloc d'exécution` est lui-même un objet doté de plusieurs champs. Il existe également un `execution_payload_header` qui contient des informations sommaires importantes sur les données d'exécution. Ces structures des données sont organisées de la manière suivante :

`execution_payload_header` contient les champs suivants :

| Champ               | Description                                                                         |
|:------------------- |:----------------------------------------------------------------------------------- |
| `parent_hash`       | hachage du bloc parent                                                              |
| `fee_recipient`     | adresse du compte pour le paiement des frais de transaction                         |
| `state_root`        | hachage racine pour l'état global après avoir appliqué les changements dans ce bloc |
| `receipts_root`     | hachage de la transaction de l'arboresence des reçus                                |
| `logs_bloom`        | structure de données contenant les journaux d'événements                            |
| `prev_randao`       | valeur utilisée dans la sélection aléatoire du validateur                           |
| `block_number`      | le numéro de bloc actuel                                                            |
| `gas_limit`         | gaz maximum autorisé dans ce bloc                                                   |
| `gas_used`          | la quantité de gaz réelle utilisée dans ce bloc                                     |
| `horodatage`        | la durée du bloc                                                                    |
| `extra_data`        | données supplémentaires arbitraires en octets bruts                                 |
| `base_fee_per_gas`  | la valeur des frais de base                                                         |
| `block_hash`        | hachage du bloc d'exécution                                                         |
| `transactions_root` | hachage racine des transactions dans le bloc                                        |
| `withdrawal_root`   | hachage racine des retraits dans le bloc                                            |

`execution_payload` contient lui-même ce qui suit (notez que cela est identique à l'en-tête sauf qu'au lieu du hachage racine des transactions, il inclut la liste réelle des transactions et des informations de retrait) :

| Champ              | Description                                                                       |
|:------------------ |:--------------------------------------------------------------------------------- |
| `parent_hash`      | hachage du bloc parent                                                            |
| `fee_recipient`    | adresse du compte pour le paiement des frais de transaction                       |
| `state_root`       | hachage racine pour l'état global une fois appliqués les changements dans ce bloc |
| `receipts_root`    | hachage de la transaction de l'arborescence des reçus                             |
| `logs_bloom`       | structure de données contenant les journaux d'événements                          |
| `prev_randao`      | valeur utilisée dans la sélection aléatoire du validateur                         |
| `block_number`     | le numéro de bloc actuel                                                          |
| `gas_limit`        | gaz maximum autorisé dans ce bloc                                                 |
| `gas_used`         | la quantité de gaz réelle utilisée dans ce bloc                                   |
| `timestamp`        | le temps de bloc                                                                  |
| `extra_data`       | données supplémentaires arbitraires en octets bruts                               |
| `base_fee_per_gas` | la valeur des frais de base                                                       |
| `block_hash`       | hachage du bloc d'exécution                                                       |
| `des transactions` | liste des transactions à exécuter                                                 |
| `retraits`         | liste des objets de retrait                                                       |

La liste `withdrawals` contient les objets `withdrawal` structurée de la façon suivante :

| Champ            | Description                        |
|:---------------- |:---------------------------------- |
| `address`        | adresse du compte qui s'est retiré |
| `montant`        | montant du retrait                 |
| `Index`          | valeur d'index du retrait          |
| `validatorIndex` | valeur d'index du validateur       |

## Durée de blocage {#block-time}

Le temps de bloc fait référence au temps qui sépare les blocs. Dans Ethereum, le temps est divisé en unités de douze secondes appelées « créneau ». Pour chaque créneau, un validateur est choisi pour proposer un bloc. Si tous les validateurs sont en ligne et complétement opérationnels, il y aura un bloc dans chaque créneau, ce qui signifie que le temps de bloc est de 12 s. Occasionnellement, des validateurs peuvent être hors-ligne lorsqu'ils sont appelés pour valider un bloc, de sorte que les créneaux peuvent parfois être vide.

Cette implémentation diffère des systèmes fondés sur la preuve de travail (PoW), dans lesquels la génération d'un bloc est une occurrence naturelle, compensée par la difficulté de mining du protocole. Le temps moyen de propagation des blocs d'Ethereum [average block time](https://etherscan.io/chart/blocktime) est l'exemple parfait de l'implementation de la preuve d'enjeu, et donc du passage de la preuve de travail (PoW) à la preuve d'enjeu (PoS), rendu possible grâce à un nouvel ajustement du temps de propagation des blocs, qui est passé à 12 secondes.

## Taille des blocs {#block-size}

Une dernière remarque importante : les blocs eux-mêmes sont limités par la taille. Chaque bloc vise une taille cible de 15 millions de gaz, mais leur taille s'adapte aux exigences du réseau, jusqu'à la limite de 30 millions de gaz (deux fois la taille cible de bloc). La limite de gaz d'un bloc peut être ajustée à la hausse ou à la baisse par un facteur de 1/1024 par rapport à la limite de gaz du bloc précédent. Ainsi, les validateurs peuvent modifier la limite de gaz des blocs par consensus. La quantité totale de gaz dépensée par toutes les transactions dans le bloc doit être inférieure à la limite de gaz du bloc. Ce point est important car il garantit que les blocs ne peuvent pas être arbitrairement grands. Si les blocs pouvaient être arbitrairement grands, les nœuds complets moins performants cesseraient progressivement de suivre le réseau à cause des exigences d'espace et de vitesse. Plus le bloc est grand, plus il faut de puissance de calcul pour traiter la transaction à temps pour le prochain créneau. Il s'agit d'un facteur de centralisation, auquel nous nous opposons en plafonnant la taille des blocs.

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Transactions](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
- [Preuve d'enjeu](/developers/docs/consensus-mechanisms/pos)
