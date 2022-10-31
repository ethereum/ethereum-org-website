---
title: Les blocs
description: Présentation des blocs de la blockchain Ethereum, leur structure de données, pourquoi ils sont nécessaires et comment ils sont créés.
lang: fr
---

Les blocs sont des lots de transactions avec un hachage du bloc précédent dans la chaîne. Ceci relie les blocs ensemble (dans une chaîne) car les hachages sont cryptographiquement dérivés des données des blocs. Cela empêche la fraude, car un changement dans n'importe quel bloc de l'historique invaliderait tous les blocs suivants puisque tous les hachages ultérieurs changeraient et que quiconque exécutant la blockchain le remarquerait.

## Prérequis {#prerequisites}

Les blocs sont un sujet très accessible pour les débutants. Mais pour vous aider à mieux comprendre cette page, nous vous recommandons de commencer par lire les pages [Comptes](/developers/docs/accounts/), [Transactions](/developers/docs/transactions/) et [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Pourquoi les blocs? {#why-blocks}

Afin de s'assurer que tous les participants du réseau Ethereum restent synchronisés et s'accordent sur l'historique exacte des transactions, les transactions sont traitées par blocs. Cela signifie que des dizaines (ou des centaines) de transactions sont engagées, acceptées et synchronisées en même temps.

![Un schéma montrant la transaction dans un bloc provoquant des changements d'état](./tx-block.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

En espaçant les engagements, nous donnons à tous les participants du réseau suffisamment de temps pour parvenir à un consensus : même si des demandes de transaction se produisent des dizaines de fois par seconde, sur Ethereum les blocs sont engagés environ une fois toutes les quinze secondes.

## Comment fonctionnent les blocs {#how-blocks-work}

Pour préserver l'historique des transactions, les blocs sont strictement ordonnés (chaque nouveau bloc créé contient une référence à son bloc parent), et les transactions au sein des blocs sont également strictement ordonnées. Sauf dans de rares cas, à tout moment, tous les participants au réseau sont d'accord sur le nombre exact et l'historique des blocs, et s'efforcent de regrouper les demandes de transactions en cours dans le bloc suivant.

Une fois qu'un bloc est assemblé (miné) par un mineur sur le réseau, il est propagé au reste du réseau. Tous les nœuds ajoutent ce bloc à la fin de leur blockchain, et le minage continue. Le processus exact d'assemblage de blocs (minage) et le processus d'engagement/de consensus sont actuellement spécifiés par le protocole "Preuve-de-Travail" d'Ethereum.

### Démonstration visuelle {#a-visual-demo}

<YouTube id="_160oMzblY8" />

## Protocole de « preuve de travail » {#proof-of-work-protocol}

La preuve de travail implique les points suivants :

- Les nœuds miniers requièrent une quantité d'énergie, un délai et une puissance de calcul variables mais substantiels pour produire un « certificat de légitimité » pour tout bloc qu’ils proposent au réseau. Cela permet de protéger le réseau contre des attaques par pourriels/déni de service, entre autres, puisque c'est coûteux à produire les certificats.
- Les autres mineurs qui viennent de savoir à propos d'un nouvel bloc avec un certificat de légitimité valide doivent l'accepter comme le bloc prochain canonique sur la blockchain.
- Le délai exact nécessaire à chaque mineur pour produire ce certificat est une variable aléatoire avec d'importants écarts. Cela garantit que deux mineurs ne produisent pas des validations pour le prochain bloc simultanément ; lorsqu'un mineur produit et propage un nouveau bloc certifié, il est presque sûre que le bloc sera accepté par le réseau comme le prochain bloc canonique sur la blockchain sans conflit (toutefois il existe un protocole pour gérer les conflits dans le cas où deux chaînes de blocs certifiés sont produites presque simultanément).

[En savoir plus sur le minage](/developers/docs/consensus-mechanisms/pow/mining/)

## Que contient un bloc ? {#block-anatomy}

- `timestamp` – le moment auquel le bloc a été miné.
- `blockNumber` – la longueur de la blockchain en blocs.
- `baseFeePerGas` - les frais minimums requis par unité de gaz pour qu'une transaction soit enregistrée dans le bloc.
- `difficulty` – l'effort requis pour miner un bloc.
- `mixHash` – un identifiant unique pour ce bloc.
- `parentHash` – un identifiant unique pour le bloc précèdent (c'est ainsi que les blocs sont liés dans une chaîne).
- `transactions` – les transactions incluses dans le bloc.
- `stateRoot` – l'état global du système : les solde des comptes, le stockage du contrat, le code du contrat et les nonces des comptes sont inclues.
- `nonce` – le hachage, qui en combinaison avec mixHash, prouve que le bloc a été passe par la [preuve de travail](/developers/docs/consensus-mechanisms/pow/).

## Durée de blocage {#block-time}

Durée de blocage se réfère au temps mis pour miner un nouvel bloc. Dans l'Ethereum, la durée de blockage moyenne est entre 12 à 14 seconds et l'on l'évalue après chaque bloc. La durée de blockage attendue est définie constante au niveau du protocole et on l'utilisé pour protéger la sécurité du réseau lorsque les mineurs ajoutent plus de puissance de calcul. La durée de blockage moyenne est comparée à la durée de blockage attendu, et si la durée de blockage moyenne est élevée, la difficulté est réduite dans l'en-tête de bloc. Si la durée de blockage moyenne est moins que la durée de blockage attendue, la difficulté sera augmentée.

## Taille des blocs {#block-size}

Une dernière remarque importante : les blocs eux-mêmes ont une taille limitée. Chaque bloc vise une taille cible de 15 millions de gaz, mais leur taille s'adapte aux exigences du réseau, jusqu'à la limite de 30 millions de gaz (deux fois la taille cible de bloc). La quantité totale de gaz dépensée par toutes les transactions dans le bloc doit être moins que la limite de gaz du bloc. C'est important car cela garantit que les blocs ne peuvent pas être arbitrairement grands. Si les blocs pouvaient être arbitrairement grands, les nœuds complets moins performants ne pourraient plus progressivement suivre le réseau en raison des exigences en matière d'espace et de vitesse.

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Minage](/developers/docs/consensus-mechanisms/pow/mining/)
- [Transactions](/developers/docs/transactions/)
- [Gaz](/developers/docs/gas/)
