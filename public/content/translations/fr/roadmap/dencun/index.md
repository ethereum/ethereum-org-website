---
title: FAQ Cancun-Deneb ("Dencun")
description: Questions fréquemment posées concernant la mise à jour réseau Cancun-Deneb (Dencun)
lang: fr
---

# Cancun-Deneb (Dencun) {#dencun}

Cancun-Deneb (Dencun) est une mise à niveau du réseau Ethereum, qui active le **Proto-Danksharding (EIP-4844)**, introduisant des **blobs** de données temporaires pour un stockage de rollup [seconde couche (L2)](/glossary/#layer-2) moins coûteux.

Un nouveau type de transaction permet aux fournisseurs de rollups de stocker des données de manière plus économique dans ce que l'on appelle des "blobs." Les blobs sont garantis comme étant disponibles pour le réseau pendant environ 18 jours (plus précisément, 4096 [époques](/glossary/#epoch)). Après cette période, les blobs sont effacés du réseau, mais les applications peuvent toujours vérifier la validité de leurs données en utilisant des preuves.

Cela réduit considérablement le coût des rollups, limite la croissance de la chaîne et contribue à soutenir un plus grand nombre d'utilisateurs tout en maintenant la sécurité et un ensemble décentralisé d'opérateurs de nœuds.

## Quand peut-on s'attendre à ce que les rollups aient des frais réduits grâce au Proto-Danksharding ? {#when}

- Cette mise à niveau a été activée à l'époque 269568, le **13-Mar-2024 à 13:55PM (UTC)**
- Tous les principaux fournisseurs de rollups, tels qu'Arbitrum ou Optimism, ont signalé que les blobs seront pris en charge immédiatement après la mise à niveau
- Le calendrier de prise en charge des rollups individuels peut varier, car chaque fournisseur doit mettre à jour ses systèmes pour tirer parti du nouvel espace de blobs

## Comment ETH peut-il être converti après la fourche majeure ? {#scam-alert}

- **Aucune action requise pour vos ETH** : Suite à la mise à niveau Dencun d'Ethereum, il n'est pas nécessaire de convertir ou de mettre à niveau vos ETH. Vos soldes de compte resteront inchangés, et les ETH que vous détenez actuellement resteront accessibles sous leur forme actuelle après la fourche majeure.
- **Attention aux arnaques !** <Emoji text="⚠️" />**quiconque vous demandant de "mettre àniveau" vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en relation avec cette mise à niveau. Vos actifs resteront totalement inchangés. N'oubliez pas, rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur comment reconnaitre et éviter les arnaques](/security/)

## Quel problème la mise à niveau Dencun résout-elle ? {#network-impact}

Dencun s'attaque principalement à la question de l' **extensibilité** (gérer plus d'utilisateurs et plus de transactions) avec des **frais abordables**, tout en **maintenant la décentralisation** du réseau.

La communauté Ethereum adopte une approche "centrée sur les rollups" pour sa croissance, en faisant des rollups de seconde couche le principal moyen de gérer en toute sécurité un plus grand nombre d'utilisateurs.

Les rollups gèrent le _traitement_ (ou "exécution") des transactions séparément du Réseau principal, puis publient une preuve cryptographique et/ou des données de transaction compressées des résultats sur le Réseau principal pour la tenue des registres. Stocker ces preuves entraîne un coût (sous forme de [gas](/glossary/#gas)), qui, avant le Proto-Danksharding, devait être pris en charge de manière permanente par tous les opérateurs de nœuds du réseau, rendant cette tâche coûteuse.

L'introduction du Proto-Danksharding dans la mise à niveau Dencun permet un stockage de données moins coûteux pour ces preuves, en demandant aux opérateurs de nœuds de stocker ces données pendant environ 18 jours, après quoi elles peuvent être supprimées en toute sécurité pour éviter l'expansion des besoins en matériel.  Étant donné que les rollups ont généralement une période de retrait de 7 jours, leur modèle de sécurité reste inchangé tant que les blobs sont disponibles sur la couche de niveau 1 pendant cette période. La fenêtre de suppression de 18 jours offre une marge de sécurité significative pour cette période.

[En savoir plus sur l'évolutivité d'Ethereum](/roadmap/scaling/)

## Comment les anciennes données de blobs sont-elles accessibles ? {#historical-access}

Bien que les nœuds de base d'Ethereum conservent toujours l'_état actuel_ du réseau, les données historiques des blobs peuvent être supprimées environ 18 jours après leur introduction. Avant de supprimer ces données, Ethereum s'assure qu'elles ont été rendues disponibles à tous les participants du réseau, ce qui permet de laisser du temps pour :

- Télécharger et stocker les données (pour les parties intéressées).
- L'achèvement de toutes les périodes de contestation des rollups.
- La finalisation des transactions de rollups.

Les données _historiques_ des blobs peuvent être requises pour diverses raisons et peuvent être stockées et accessibles en utilisant plusieurs protocoles décentralisés :

- **Les protocoles d'indexation tiers**, tels que The Graph, stockent ces données via un réseau décentralisé d'opérateurs de nœuds motivés par des mécanismes crypto-économiques.
- **BitTorrent** est un protocole décentralisé où des volontaires peuvent conserver et distribuer ces données à d'autres.
- **[Le réseau portail d'Ethereum](/developers/docs/networking-layer/portal-network/)** vise à fournir un accès à toutes les données d'Ethereum via un réseau décentralisé d'opérateurs de nœuds en distribuant les données parmi les participants de manière similaire à BitTorrent.
- **Les utilisateurs individuels** sont toujours libres de conserver leurs propres copies de toutes les données souhaitées pour référence historique.
- **Les fournisseurs de rollups** sont incités à stocker ces données pour améliorer l'expérience utilisateur de leur rollup.
- **Les explorateurs de blocs** exécutent généralement des nœuds d'archives qui indexent et stockent toutes ces informations pour une référence historique facile, accessible aux utilisateurs via une interface web.

Il est important de noter que la récupération de l'état historique fonctionne sur un **modèle de confiance 1-sur-N**. Cela signifie que vous n'avez besoin que des données provenant _d'une seule source fiable_ pour en vérifier l'exactitude en utilisant l'état actuel du réseau.

## Comment cette mise à niveau contribue-t-elle à la feuille de route globale d'Ethereum ? {#roadmap-impact}

Le Proto-Danksharding prépare le terrain pour la mise en œuvre complète du [Danksharding](/roadmap/danksharding/). Le Danksharding est conçu pour répartir le stockage des données de rollup entre les opérateurs de nœuds, de sorte que chaque opérateur n'ait à gérer qu'une petite partie des données totales. Cette répartition augmentera le nombre de blobs de données par bloc, ce qui est essentiel pour faire évoluer Ethereum et lui permettre de gérer un plus grand nombre d'utilisateurs et de transactions.

Cette évolutivité est cruciale pour [soutenir des milliards d'utilisateurs sur Ethereum](/roadmap/scaling/) avec des frais abordables et des applications plus avancées, tout en maintenant un réseau décentralisé. Sans ces changements, les exigences matérielles pour les opérateurs de nœuds augmenteraient, nécessitant des équipements de plus en plus coûteux. Cette augmentation des coûts pourrait exclure les petits opérateurs, et entraîner une concentration du contrôle du réseau entre quelques grands opérateurs, ce qui irait à l'encontre du principe de décentralisation.

## Cette mise à niveau affecte-t-elle tous les clients de consensus et de validation d'Ethereum ? {#client-impact}

Oui, le Proto-Danksharding (EIP-4844) nécessite des mises à jour à la fois des clients d'exécution et des clients de consensus. Tous les principaux clients Ethereum ont publié des versions prenant en charge la mise à niveau. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils utilisent une version de client prise en charge. Notez que les informations concernant les versions des clients sont tributaires du temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les derniers détails. [Voir les détails sur les versions des clients pris en charge](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Les clients de consensus gèrent le logiciel du _Validateur_, qui a été entièrement mis à jour pour intégrer la mise à niveau.

## Comment Cancun-Deneb (Dencun) affecte-t-il Goerli ou d'autres réseaux de test d'Ethereum ? {#testnet-impact}

- Devnets, Goerli, Sepolia et Holesky ont tous reçu la mise à jour Dencun et disposent d'un Proto-Danksharding pleinement opérationnel
- Les développeurs de rollups peuvent utiliser ces réseaux pour tester l'EIP-4844
- La plupart des utilisateurs ne seront absolument pas affectés par le changement apporté sur chaque réseau de test

## Les transactions sur les secondes couches utiliseront-elles désormais l'espace temporaire des blobs, ou sera-t-il possible de choisir ? {#calldata-vs-blobs}

Les transactions de rollup sur les secondes couches (L2) d'Ethereum ont le choix entre deux types de stockage de données : l'espace temporaire des blobs ou les calldata des contrats intelligents permanents. L'espace de blobs est un choix économique, offrant un stockage temporaire à un coût inférieur. Il garantit la disponibilité des données pendant toutes les périodes de contestation. D'un autre côté, les calldata des contrats intelligents offrent un stockage permanent, mais sont plus coûteux.

La décision d'utiliser l'espace de blobs ou les calldata des contrats intelligents est principalement prise par les fournisseurs de rollups. Ils prennent cette décision en fonction de la demande actuelle pour l'espace de blobs. Si l'espace de blobs est très demandé, les rollups peuvent opter pour les calldata des contrats intelligents afin de s'assurer que les données sont publiées en temps voulu.

Bien qu'il soit théoriquement possible pour les utilisateurs de choisir leur type de stockage préféré, ce sont généralement les fournisseurs de rollups qui gèrent ce choix. Offrir cette option aux utilisateurs ajouterait de la complexité, en particulier pour regrouper des transactions de manière rentable. Pour des détails spécifiques sur ce choix, les utilisateurs devraient consulter la documentation proposée par les différents fournisseurs de rollups.

## La mise à jour 4844 réduira-t-elle les frais de gaz sur la couche de niveau 1 ? {#l1-fee-impact}

Pas de manière significative. Un nouveau marché du gaz est introduit exclusivement pour l'espace de blobs, destiné à être utilisé par les fournisseurs de rollups. _Bien que les frais sur le réseau principal puissent être réduits en déchargeant les données de rollups vers les blobs, cette mise à niveau se concentre principalement sur la réduction des frais sur les secondes couches. La réduction des frais sur la couche de niveau 1 (Réseau principal) peut constituer un effet secondaire, mais dans une moindre mesure._

- La réduction des frais de gaz sur la couche de niveau 1 sera proportionnelle à l'adoption et à l'utilisation des blobs de données par les fournisseurs de rollups
- Les frais de gaz sur la couche de niveau 1 resteront probablement compétitifs en raison des activités non liées aux rollups
- Les rollups qui utilisent l'espace de blobs demanderont moins de gaz sur la couche de niveau 1, ce qui contribuera à faire baisser les frais de gaz sur la couche de niveau 1 à court terme
- L'espace de blobs étant toujours limité, si les blobs d'un bloc sont saturés ou pleins, les rollups peuvent être amenés à publier leurs données sous forme de données permanentes dans l'intervalle, ce qui ferait augmenter les prix du gaz sur la couche de niveau 1 et la couche de niveau 2

## Cette mise à jour réduira-t-elle les frais sur d'autres blockchains de couche 1 de l'EVM ? {#alt-l1-fee-impact}

Non. Les avantages du Proto-Danksharding sont spécifiques aux rollups de seconde couche d'Ethereum qui stockent leurs preuves sur la couche de niveau 1 (Réseau principal).

Le simple fait d'être compatible avec la Machine Virtuelle d'Ethereum (EVM) ne signifie pas qu'un réseau bénéficiera de cette mise à jour. Les réseaux qui fonctionnent indépendamment d'Ethereum (qu'ils soient compatibles avec l'EVM ou non) ne stockent pas leurs données sur Ethereum et ne bénéficieront donc pas de cette mise à jour.

[En savoir plus sur les rollups de seconde couche](/layer-2/)

## Davantage qu'un apprenant visuel ? {#visual-learner}

<YouTube id="HT9PHWloIiU" />

_Déverrouiller l'évolutivité d'Ethereum, EIP-4844 — Finematics _

<YouTube id="dFjyUY3e53Q" />

_Blobspace 101 with Domothy — Bankless_

## En savoir plus {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844 : Transactions de blobs de shard (Proto-Danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Annonce du Réseau principal Dencun](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog de la Fondation Ethereum_
- [Le Guide du voyageur d'Ethereum : Proto-Danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Une explication approfondie de l'EIP-4844 : le cœur de la mise à jour Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Mise à jour AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_
