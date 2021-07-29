---
title: Blocs
description: Présentation des blocs de la blockchain Ethereum, leur structure de données, pourquoi ils sont nécessaires et comment ils sont créés.
lang: fr
sidebar: true
---

Les blocs sont des lots de transactions avec un hachage du bloc précédent dans la chaîne. Ceci relie les blocs ensemble (dans une chaîne) car les hachages sont cryptographiquement dérivés des données des blocs. Cela empêche la fraude, car un changement dans n'importe quel bloc de l'historique invaliderait tous les blocs suivants puisque tous les hachages ultérieurs changeraient et que quiconque exécutant la blockchain le remarquerait.

## Prérequis {#prerequisites}

Les blocs sont un sujet très accessible pour les débutants. Mais pour vous aider à mieux comprendre cette page, nous vous recommandons de commencer par lire les pages [Comptes](/en/developers/docs/accounts/), [Transactions](/en/developers/docs/transactions/) et [Introduction à Ethereum](/en/developers/docs/intro-to-ethereum/).

<!--The content below was provided by Brian Gu with exception of "what's in a block"-->

## Pourquoi les blocs? {#why-blocks}

Pour garantir que tous les participants au réseau Ethereum maintiennent un état synchronisé et s'accordent sur l'historique précis des transactions, nous regroupons les transactions en blocs. Cela signifie que des dizaines (ou des centaines) de transactions sont engagées, acceptées et synchronisées en même temps.

![Diagramme montrant une transaction dans un bloc qui cause des changements d'état](./tx-block.png) _Schéma adapté à partir du document [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

En espaçant les engagements, nous donnons à tous les participants du réseau suffisamment de temps pour parvenir à un consensus : même si des demandes de transaction se produisent des dizaines de fois par seconde, sur Ethereum les blocs sont engagés environ une fois toutes les quinze secondes.

## Comment fonctionnent les blocs {#how-blocks-work}

Pour préserver l'historique des transactions, les blocs sont strictement ordonnés (chaque nouveau bloc créé contient une référence à son bloc parent), et les transactions au sein des blocs sont également strictement ordonnées. Sauf dans de rares cas, à tout moment, tous les participants au réseau sont d'accord sur le nombre exact et l'historique des blocs, et s'efforcent de regrouper les demandes de transactions en cours dans le bloc suivant.

Une fois qu'un bloc est assemblé (miné) par un mineur sur le réseau, il est propagé au reste du réseau. Tous les nœuds ajoutent ce bloc à la fin de leur blockchain, et le minage continue. Le processus exact d'assemblage de blocs (minage) et le processus d'engagement/de consensus sont actuellement spécifiés par le protocole "Preuve-de-Travail" d'Ethereum.

### Démonstration visuelle {#a-visual-demo} <iframe width="100%" height="315" src="https://www.youtube.com/embed/_160oMzblY8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen mark="crwd-mark"></iframe>

## Protocole de "preuve de travail" {#proof-of-work-protocol}

Preuve de travail signifie ceci :

- Les nœuds miniers requièrent une quantité d'énergie, un délai et une puissance de calcul variables mais substantiels pour produire un "certificat de légitimité" pour tout bloc qu’ils proposent au réseau. Cela aide à protéger ce dernier contre les attaques de spam/déni de service, entre autres, puisque les certificats sont coûteux à produire.
- Les autres mineurs qui entendent parler d'un nouveau bloc avec un certificat de légitimité valide doivent accepter le nouveau bloc en tant que bloc conforme suivant sur la blockchain.
- Le délai exact nécessaire à chaque mineur pour produire ce certificat est une variable aléatoire avec d'importants écarts. Cela garantit qu'il est peu probable* que deux mineurs produisent simultanément des validations pour un bloc proposé en même temps. Lorsqu'un mineur produit et propage un nouveau bloc certifié, il peut être presque certain qu'il sera accepté par le réseau comme le bloc conforme suivant sur la blockchain, sans conflit* (bien qu'il existe également un protocole pour traiter les conflits dans le cas où deux blockchains certifiés sont produites presque simultanément).

[En savoir plus sur le minage](/en/developers/docs/consensus-mechanisms/pow/mining/)

## Que contient un bloc ? {#block-anatomy}

- Horodatage : le moment où le bloc a été miné.
- Numéro de bloc : la longueur de la blockchain en blocs.
- Difficulté : l’effort nécessaire pour miner le bloc.
- mixHash : un identifiant unique pour ce bloc.
- Un hachage parent : l'identifiant unique du bloc précédent (c'est ainsi que les blocs sont liés dans une chaîne).
- Liste des transactions : les transactions incluses dans le bloc.
- Racine de l'état : l’état entier du système. Les soldes du compte, le stockage du contrat, le code du contrat et les nonces de compte sont à l’intérieur.
- Nonce : un hachage qui, lorsqu'il est combiné avec le mixHash, prouve que le bloc a reçu [une preuve de travail](/developers/docs/consensus-mechanisms/pow/).

## Taille des blocs {#block-size}

Une dernière remarque importante : les blocs eux-mêmes ont une taille limitée. Chaque bloc a une limite de carburant qui est fixée par le réseau et les mineurs collectivement : la quantité totale de carburant dépensée pour toutes les transactions du bloc doit être inférieure à la limite fixée. C'est important car cela garantit que les blocs ne peuvent pas être arbitrairement grands. Si les blocs pouvaient être arbitrairement grands, les nœuds complets moins performants ne pourraient plus progressivement suivre le réseau en raison des exigences en matière d'espace et de vitesse. La limite de carburant par bloc a été initialisée à 5 000 au bloc 0. Tout mineur qui exploite un nouveau bloc peut modifier la limite de carburant d'environ 0,1 % maximum dans les deux sens par rapport à la limite de carburant du bloc parent. La limite de carburant définie en novembre 2018 se situe aux alentours de 8 000 000.

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Minage](/en/developers/docs/consensus-mechanisms/pow/mining/)
- [Transactions](/en/developers/docs/transactions/)
- [Gas](/en/developers/docs/gas/)
