---
title: Cancun-Deneb (Dencun)
metaTitle: FAQ sur Cancun-Deneb (Dencun)
description: Foire aux questions concernant la mise à jour du réseau Cancun-Deneb (Dencun)
lang: fr
---

Cancun-Deneb (Dencun) est une mise à jour du réseau Ethereum qui active le **proto-danksharding (EIP-4844)**, introduisant des **blobs** de données temporaires pour un stockage moins cher des rollups de [couche 2 (l2)](/glossary/#layer-2).

Un nouveau type de transaction permet aux fournisseurs de rollups de stocker des données de manière plus rentable dans ce que l'on appelle des « blobs ». Il est garanti que les blobs seront disponibles sur le réseau pendant environ 18 jours (plus précisément, 4096 [époques](/glossary/#epoch)). Après cette période, les blobs sont élagués du réseau, mais les applications peuvent toujours vérifier la validité de leurs données à l'aide de preuves. 

Cela réduit considérablement le coût des rollups, limite la croissance de la chaîne et aide à prendre en charge davantage d'utilisateurs tout en maintenant la sécurité et un ensemble décentralisé d'opérateurs de nœuds.

## Quand s'attend-on à ce que les rollups reflètent des frais réduits grâce au proto-danksharding ? {#when}

- Cette mise à jour a été activée à l'époque 269568, le **13 mars 2024 à 13h55 (UTC)**
- Tous les principaux fournisseurs de rollups, tels qu'Arbitrum ou Optimism, ont signalé que les blobs seraient pris en charge immédiatement après la mise à jour
- Le calendrier de prise en charge de chaque rollup peut varier, car chaque fournisseur doit mettre à jour ses systèmes pour tirer parti du nouvel espace de blobs

## Comment les ETH peuvent-ils être convertis après le hard fork ? {#scam-alert}

- **Aucune action requise pour vos ETH** : Suite à la mise à jour Dencun d'Ethereum, il n'est pas nécessaire de convertir ou de mettre à niveau vos ETH. Les soldes de vos comptes resteront les mêmes, et les ETH que vous détenez actuellement resteront accessibles dans leur forme existante après le hard fork.
- **Attention aux arnaques !** <Emoji text="⚠️" /> **toute personne vous demandant de « mettre à niveau » vos ETH essaie de vous arnaquer.** Vous n'avez rien à faire en rapport avec cette mise à jour. Vos actifs ne seront absolument pas affectés. N'oubliez pas que rester informé est la meilleure défense contre les arnaques.

[En savoir plus sur la reconnaissance et l'évitement des arnaques](/security/)

## Quel problème la mise à jour du réseau Dencun résout-elle ? {#network-impact}

Dencun aborde principalement la **scalabilité** (gérer plus d'utilisateurs et plus de transactions) avec des **frais abordables**, tout en **maintenant la décentralisation** du réseau.

La communauté Ethereum a adopté une approche de sa croissance « centrée sur les rollups », qui place les rollups de couche 2 (l2) comme le principal moyen de prendre en charge davantage d'utilisateurs en toute sécurité.

Les réseaux de rollups gèrent le _traitement_ (ou « l'exécution ») des transactions séparément du Réseau principal, puis publient une preuve cryptographique et/ou des données de transaction compressées des résultats sur le Réseau principal pour l'archivage. Le stockage de ces preuves entraîne des frais (sous forme de [gaz](/glossary/#gas)), qui, avant le proto-danksharding, devaient être stockées de manière permanente par tous les opérateurs de nœuds du réseau, ce qui en faisait une tâche coûteuse.

L'introduction du proto-danksharding dans la mise à jour Dencun ajoute un stockage de données moins cher pour ces preuves en n'exigeant des opérateurs de nœuds qu'ils stockent ces données pendant environ 18 jours, après quoi les données peuvent être supprimées en toute sécurité pour éviter l'augmentation des exigences matérielles. Étant donné que les rollups ont généralement une période de retrait de 7 jours, leur modèle de sécurité reste inchangé tant que les blobs sont disponibles sur la couche 1 (l1) pendant cette durée. La fenêtre d'élagage de 18 jours offre une marge de sécurité importante pour cette période.

[En savoir plus sur la mise à l'échelle d'Ethereum](/roadmap/scaling/)

## Comment accède-t-on aux anciennes données de blobs ? {#historical-access}

Bien que les nœuds Ethereum réguliers conservent toujours l'_état actuel_ du réseau, les données historiques des blobs peuvent être supprimées environ 18 jours après leur introduction. Avant de supprimer ces données, Ethereum s'assure qu'elles ont été mises à la disposition de tous les participants du réseau, laissant le temps pour :

- Aux parties intéressées de télécharger et de stocker les données.
- L'achèvement de toutes les périodes de contestation des rollups.
- La finalisation des transactions des rollups.

Les données _historiques_ des blobs peuvent être souhaitées pour diverses raisons et peuvent être stockées et consultées à l'aide de plusieurs protocoles décentralisés :

- **Les protocoles d'indexation tiers**, tels que The Graph, stockent ces données via un réseau décentralisé d'opérateurs de nœuds incités par des mécanismes crypto-économiques.
- **BitTorrent** est un protocole décentralisé où des bénévoles peuvent conserver et distribuer ces données à d'autres.
- **[Le Portal Network d'Ethereum](/developers/docs/networking-layer/portal-network/)** vise à fournir un accès à toutes les données d'Ethereum via un réseau décentralisé d'opérateurs de nœuds en distribuant les données entre les participants, à l'instar de BitTorrent.
- **Les utilisateurs individuels** sont toujours libres de stocker leurs propres copies de toutes les données qu'ils souhaitent pour référence historique.
- **Les fournisseurs de rollups** sont incités à stocker ces données pour améliorer l'expérience utilisateur de leur rollup.
- **Les explorateurs de blocs** exécutent généralement des nœuds d'archive qui indexent et stockent toutes ces informations pour une référence historique facile, accessible aux utilisateurs via une interface web.

Il est important de noter que la récupération de l'état historique fonctionne sur un **modèle de confiance 1-sur-N**. Cela signifie que vous n'avez besoin des données que d'une _seule source digne de confiance_ pour vérifier leur exactitude à l'aide de l'état actuel du réseau.

## Comment cette mise à jour contribue-t-elle à la feuille de route plus large d'Ethereum ? {#roadmap-impact}

Le proto-danksharding prépare le terrain pour la mise en œuvre complète du [danksharding](/roadmap/danksharding/). Le danksharding est conçu pour distribuer le stockage des données des rollups entre les opérateurs de nœuds, de sorte que chaque opérateur n'ait à gérer qu'une petite partie des données totales. Cette distribution augmentera le nombre de blobs de données par bloc, ce qui est essentiel pour mettre à l'échelle Ethereum afin de gérer plus d'utilisateurs et de transactions.

Cette scalabilité est cruciale pour [prendre en charge des milliards d'utilisateurs sur Ethereum](/roadmap/scaling/) avec des frais abordables et des applications plus avancées, tout en maintenant un réseau décentralisé. Sans ces changements, les exigences matérielles pour les opérateurs de nœuds augmenteraient, entraînant le besoin d'équipements de plus en plus coûteux. Cela pourrait exclure les petits opérateurs, entraînant une concentration du contrôle du réseau entre quelques grands opérateurs, ce qui irait à l'encontre du principe de décentralisation.

## Cette mise à jour affecte-t-elle tous les clients de consensus et de validateurs d'Ethereum ? {#client-impact}

Oui, le proto-danksharding (EIP-4844) nécessite des mises à jour à la fois des clients d'exécution et des clients de consensus. Tous les principaux clients Ethereum ont publié des versions prenant en charge la mise à jour. Pour maintenir la synchronisation avec le réseau Ethereum après la mise à jour, les opérateurs de nœuds doivent s'assurer qu'ils exécutent une version de client prise en charge. Notez que les informations sur les versions des clients sont sensibles au temps, et les utilisateurs doivent se référer aux dernières mises à jour pour obtenir les détails les plus récents. [Voir les détails sur les versions de clients prises en charge](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement#client-releases).

Les clients de consensus gèrent le logiciel _Validateur_, qui a été entièrement mis à jour pour s'adapter à la mise à jour.

## Comment Cancun-Deneb (Dencun) affecte-t-il les réseaux de test d'Ethereum ? {#testnet-impact}

- Les réseaux de développement (devnets), Sepolia et Holesky ont tous subi la mise à jour Dencun et ont le proto-danksharding entièrement fonctionnel
- Les développeurs de rollups peuvent utiliser ces réseaux pour les tests de l'EIP-4844
- La plupart des utilisateurs ne seront absolument pas affectés par ce changement sur chaque réseau de test

## Toutes les transactions sur les L2 utiliseront-elles désormais l'espace de blobs temporaire, ou pourrez-vous choisir ? {#calldata-vs-blobs}

Les transactions de rollups sur la couche 2 (l2) d'Ethereum ont la possibilité d'utiliser deux types de stockage de données : l'espace de blobs temporaire ou les données d'appel (calldata) permanentes des contrats intelligents. L'espace de blobs est un choix économique, offrant un stockage temporaire à moindre coût. Il garantit la disponibilité des données pour toutes les périodes de contestation nécessaires. D'autre part, les données d'appel des contrats intelligents offrent un stockage permanent mais sont plus chères.

La décision d'utiliser l'espace de blobs ou les données d'appel est principalement prise par les fournisseurs de rollups. Ils basent cette décision sur la demande actuelle d'espace de blobs. Si l'espace de blobs est très demandé, les rollups peuvent opter pour les données d'appel afin de s'assurer que les données sont publiées en temps opportun.

Bien qu'il soit théoriquement possible pour les utilisateurs de choisir leur type de stockage préféré, les fournisseurs de rollups gèrent généralement ce choix. Offrir cette option aux utilisateurs ajouterait de la complexité, en particulier dans les transactions de regroupement rentables. Pour des détails spécifiques sur ce choix, les utilisateurs doivent se référer à la documentation fournie par les fournisseurs de rollups individuels.

## L'EIP-4844 réduira-t-il le gaz sur la L1 ? {#l1-fee-impact}

Pas de manière significative. Un nouveau marché du gaz est introduit exclusivement pour l'espace de blobs, à l'usage des fournisseurs de rollups. _Bien que les frais sur la couche 1 (l1) puissent être réduits en déchargeant les données des rollups vers les blobs, cette mise à jour se concentre principalement sur la réduction des frais de la couche 2 (l2). La réduction des frais sur la L1 (Réseau principal) peut se produire comme un effet de second ordre dans une moindre mesure._

- La réduction du gaz sur la L1 sera proportionnelle à l'adoption/l'utilisation des données de blobs par les fournisseurs de rollups
- Le gaz sur la L1 restera probablement compétitif en raison de l'activité non liée aux rollups
- Les rollups qui adoptent l'utilisation de l'espace de blobs demanderont moins de gaz sur la L1, ce qui contribuera à faire baisser les frais de gaz sur la L1 à court terme
- L'espace de blobs est toujours limité, donc si les blobs dans un bloc sont saturés/pleins, les rollups peuvent être tenus de publier leurs données en tant que données permanentes entre-temps, ce qui ferait grimper les prix du gaz sur la L1 et la L2

## Cela réduira-t-il les frais sur d'autres blockchains de couche 1 compatibles EVM ? {#alt-l1-fee-impact}

Non. Les avantages du proto-danksharding sont spécifiques aux rollups de couche 2 (l2) d'Ethereum qui stockent leurs preuves sur la couche 1 (l1) (Réseau principal).

Le simple fait d'être compatible avec la machine virtuelle Ethereum (EVM) ne signifie pas qu'un réseau tirera un quelconque avantage de cette mise à jour. Les réseaux qui fonctionnent indépendamment d'Ethereum (qu'ils soient compatibles EVM ou non) ne stockent pas leurs données sur Ethereum et ne tireront aucun avantage de cette mise à jour.

[En savoir plus sur les rollups de couche 2](/layer-2/)

## Vous préférez un support visuel ? {#visual-learner}

<VideoWatch slug="eip-4844-dencun-explained" />

_Débloquer la mise à l'échelle d'Ethereum, EIP-4844 — Finematics _

<VideoWatch slug="blobspace-101-dencun" />

_L'espace de blobs 101 avec Domothy — Bankless_

## Lectures complémentaires {#further-reading}

- [EIP4844.com](https://www.eip4844.com/)
- [EIP-4844 : Transactions de blobs de fragments (proto-danksharding)](https://eips.ethereum.org/EIPS/eip-4844)
- [Annonce de Dencun sur le Réseau principal](https://blog.ethereum.org/2024/02/27/dencun-mainnet-announcement) - _Blog de la Fondation Ethereum_
- [Le guide du voyageur galactique pour Ethereum : Proto-danksharding](https://members.delphidigital.io/reports/the-hitchhikers-guide-to-ethereum/#proto-danksharding-eip-4844) - _Jon Charbonneau_
- [FAQ sur le proto-danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Une explication approfondie de l'EIP-4844 : Le cœur de la mise à jour Cancun](https://medium.com/@ebunker.io/an-in-depth-explanation-of-eip-4844-the-core-of-the-cancun-upgrade-de7b13761d2c) - _Ebunker_
- [Mise à jour AllCoreDevs 016](https://tim.mirror.xyz/HzH5MpK1dnw7qhBSmzCfdCIxpwpD6DpwlfxtaAwEFro) - _Tim Beiko_