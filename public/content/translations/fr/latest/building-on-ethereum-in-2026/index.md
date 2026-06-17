---
title: "Construire sur Ethereum en 2026 : ce qui a changé"
description: "Trois mises à jour du protocole depuis 2023 ont changé deux choses qui comptent pour les constructeurs : le coût d'utilisation de la couche 1 (l1) et ce que les portefeuilles classiques peuvent faire. Un guide pratique pour construire sur Ethereum en 2026."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "frais de gaz"
  - "abstraction de compte"
  - "mises à jour du protocole"
published: 2026-05-07
image: /images/developers/blog/latest-post-header-3.png
breadcrumb: Construire sur Ethereum en 2026
lang: fr
---

Si votre modèle mental d'Ethereum s'est formé entre 2021 et 2023, il est obsolète. Depuis, trois mises à jour du protocole, [Dencun](/roadmap/dencun/) en mars 2024, [Pectra](/roadmap/pectra/) en mai 2025 et [Fusaka](/roadmap/fusaka/) en décembre 2025, ont changé deux choses qui comptent pour les constructeurs : le coût d'utilisation de la couche 1 (l1) et ce que les portefeuilles classiques peuvent faire.

## Le Réseau principal est de nouveau bon marché {#mainnet-is-cheap-again}

Le régime de frais de 2021 à 2023 n'est plus une hypothèse par défaut sûre.

Au 5 mai 2026, le traqueur de gaz d'Etherscan indique un gaz standard autour de 0,15 gwei, avec des moyennes quotidiennes proches de 0,5 gwei en avril. Un transfert d'ETH de base coûte moins d'un centime à ce niveau, les journées récentes typiques se situant dans les quelques centimes. La tendance est à la baisse à travers chacune des récentes mises à jour, et la prochaine, [Glamsterdam](/roadmap/glamsterdam/), devrait encore faire baisser les frais. Cela rend l'affirmation « le réseau principal Ethereum est trop cher pour la plupart des applications » obsolète comme point de départ.

Si vous voulez une règle empirique simple, utilisez les mathématiques du gaz au lieu des vieilles croyances. À 0,5 gwei, la moyenne récente d'avril, et avec un ETH à environ 2 350 $, les coûts illustratifs ressemblent à ceci.

| Opération       | Gaz utilisé | Coût illustratif |
| :-------------- | :---------- | :---------------- |
| Transfert d'ETH | 21 000      | **0,025 $**       |
| Transfert ERC-20 | \~65 000    | **0,076 $**       |
| Approuver ERC-20 | \~46 000    | **0,054 $**       |
| Échange         | \~180 000   | **0,21 $**        |
| Déployer ERC-20 | \~1 200 000 | **1,41 $**        |

Ce sont des exemples, pas des garanties. Les coûts varient en fonction du prix de l'ETH, du prix du gaz et de la complexité du contrat. Les relevés en gwei peuvent fluctuer considérablement au cours d'un mois normal alors que le coût en dollars bouge à peine, car les rollups traitent désormais environ 95 % des transactions d'Ethereum et la couche 1 (l1) fonctionne généralement bien en dessous de sa cible de blocs. Les frais du Réseau principal sont désormais suffisamment bas pour que de nombreuses applications puissent raisonnablement fonctionner sur le Réseau principal.

### Pourquoi les coûts ont baissé {#why-costs-fell}

Trois mises à jour ont fait la majeure partie du travail.

Dencun (mars 2024) a introduit l'EIP-4844 et a donné aux rollups leur propre voie de données grâce aux blobs, avec un marché des frais séparé. Les rollups ont cessé de concurrencer le trafic d'exécution ordinaire sur le même espace de bloc.

Pectra a été activée le 7 mai 2025. L'EIP-7691 a augmenté le débit des blobs de 3 cibles / 6 blobs maximum par bloc à 6 cibles / 9 maximum, ce qui a élargi la voie de données bon marché qu'utilisent les rollups et a poussé les frais de la couche 2 (l2) à la baisse.

Fusaka a été activée le 3 décembre 2025. Son principal changement de capacité a été PeerDAS, qui permet aux validateurs d'échantillonner les données des blobs au lieu de télécharger chaque blob dans son intégralité, et cet échantillonnage est ce qui rend les nombres de blobs plus élevés sûrs au niveau de la couche réseau. En parallèle, la communauté a augmenté la limite de gaz de la couche 1 (l1) de 30M à 60M au cours de l'année 2025, et l'EIP-7935 de Fusaka a standardisé 60M comme nouvelle valeur par défaut. L'EIP-7825 plafonne toute transaction unique à \~16,78M de gaz, ce que la plupart des applications ne remarqueront jamais, mais les très grands déploiements et les appels multiples (multicalls) monolithiques doivent désormais s'y conformer. L'EIP-7951 a également ajouté la vérification native secp256r1 (P-256) sur le Réseau principal, ce qui rend les signatures par clé d'accès et WebAuthn beaucoup moins chères à vérifier dans les flux de compte.

L'effet net est que le Réseau principal n'est plus tarifé comme une chaîne en congestion permanente.

## Comment l'EIP-7702 change le modèle de compte {#how-eip-7702-changes-the-account-model}

Pectra a également déployé l'EIP-7702, qui donne aux portefeuilles classiques accès au comportement de compte intelligent tel que le traitement par lots, le parrainage de gaz, les clés de session, les flux de récupération et une expérience utilisateur (UX) adaptée aux clés d'accès, sans obliger l'utilisateur à migrer vers un nouveau compte.

Cela fonctionne en ajoutant un nouveau type de transaction (type `0x04`, `SetCode`) qui permet à un compte détenu par un tiers (EOA) de définir un pointeur vers le code d'un contrat déjà déployé. L'utilisateur conserve la même adresse, la clé EOA d'origine garde le contrôle ultime sur le compte, et la délégation peut ultérieurement être modifiée ou réinitialisée à l'adresse nulle.

Pour les constructeurs d'applications, le changement pratique consiste à demander au portefeuille le résultat, et non la configuration de bas niveau de l'EIP-7702. Si un utilisateur a besoin d'approuver et de faire un échange dans un seul flux, demandez un traitement par lots via l'ERC-5792 `wallet_sendCalls`. Le portefeuille peut décider d'utiliser l'EIP-7702, l'ERC-4337 ou un autre système de compte.

Le code délégué constitue une frontière de sécurité. Si un portefeuille pointe un EOA vers un code bogué ou malveillant, ce code peut effectuer des appels en tant qu'utilisateur, y compris des approbations de jetons, des transferts et des interactions avec des applications. Les constructeurs doivent traiter les cibles de délégation comme une infrastructure de portefeuille, en s'appuyant sur des implémentations vérifiées par le portefeuille et en ne demandant pas aux utilisateurs de déléguer à un code contrôlé par l'application à la légère.

## Ce que cela change dans la façon de construire {#what-this-changes-about-how-to-build}

La question par défaut des constructeurs était autrefois « quelle couche 2 (l2) est suffisamment bon marché ? ». Cette question a toujours des réponses, mais ce n'est plus la seule. Avec des frais de la couche 1 (l1) de l'ordre de quelques centimes par transaction en charge normale, et l'EIP-7702 permettant à n'importe quel portefeuille d'exposer l'UX d'un compte intelligent sans migrer les adresses, la question par défaut la plus utile est de savoir si l'application doit résider sur le Réseau principal, ou si une couche 2 (l2) spécifique offre un réel avantage en matière de distribution, de liquidité ou d'UX que la couche 1 (l1) ne peut pas offrir.

L'hypothèse concernant le compte change également. Ne concevez pas de nouvelles applications comme si chaque compte utilisateur était un simple EOA ECDSA qui doit détenir de l'ETH avant de faire quoi que ce soit d'utile. Privilégiez les interfaces de traitement par lots au niveau du portefeuille telles que l'ERC-5792 `wallet_sendCalls`, partez du principe que le parrainage de gaz et les clés de session deviendront des fonctionnalités normales du portefeuille, et traitez les clés d'accès et les flux de récupération comme faisant partie de la surface UX du compte plutôt que comme des astuces d'intégration séparées.

## Et ensuite ? {#whats-next}

La prochaine mise à jour nommée d'Ethereum est Glamsterdam, avec les listes d'accès au niveau du bloc (BAL) et la séparation proposant-constructeur (PBS) intégrée (ePBS) comme éléments phares. Ensemble, ils permettent d'augmenter en toute sécurité la limite de gaz du bloc de 60 millions aujourd'hui à environ 200 millions, laissant plus de capacité sur la couche 1 (l1) avec laquelle les constructeurs peuvent travailler. L'activation est prévue pour le second semestre 2026. Après Glamsterdam, [Hegotá](https://forkcast.org/upgrade/hegota/) devrait suivre, avec les listes d'inclusion appliquées par le choix du fork (FOCIL) sélectionnées comme fonctionnalité principale.

Pour les constructeurs, les éléments qui valent la peine d'être suivis sont une plus grande capacité de la couche 1 (l1) (BAL), une inclusion de transaction plus fiable (FOCIL) et la voie vers une abstraction de compte native. L'ePBS, l'autre titre phare de Glamsterdam, est principalement un changement d'infrastructure qui supprime une dépendance de confiance sous l'inclusion des transactions de la couche 1 (l1). Le changement de surface direct au niveau de l'application est mineur.

Les BAL visent à maintenir la couche 1 (l1) bon marché à mesure que l'utilisation augmente. En clair, un bloc serait accompagné d'une carte des comptes et du stockage qu'il touche. Les clients peuvent utiliser cette carte pour pré-récupérer des données et exécuter des transactions indépendantes en parallèle, ce qui rend plus sûr l'augmentation de la limite de gaz de la couche 1 (l1) sans rendre les blocs trop lents à vérifier. L'effet pratique pour les constructeurs est que davantage d'activités peuvent revenir sur le Réseau principal sans recréer automatiquement le régime de gaz de 2021 à 2023.

FOCIL consiste à intégrer des transactions valides dans des blocs même lorsqu'un producteur de blocs préférerait les omettre. Aujourd'hui, si la partie qui construit un bloc ignore une transaction, le reste du protocole a des moyens limités pour forcer son inclusion. Avec l'EIP-7805, plusieurs validateurs diraient, en effet, « nous avons vu ces transactions valides en attente dans la mempool publique ». Le bloc suivant doit alors les inclure, sinon les validateurs peuvent refuser de soutenir ce bloc. Pour les constructeurs, cela a de l'importance lorsque l'accès fiable à la couche 1 (l1) fait partie du produit, y compris les outils de confidentialité, les passerelles d'accès réglementées ou les applications servant des utilisateurs qui pourraient être filtrés par certains fournisseurs d'infrastructure.

Pour les constructeurs d'applications, l'élément d'Hegotá à surveiller de plus près est l'abstraction de compte. L'EIP-8141, Frame Transactions (Transactions par trames), ajouterait un type de transaction où la validation, l'exécution et le paiement du gaz sont divisés en trames. En pratique, cela signifie qu'un compte intelligent pourrait vérifier une transaction lui-même, définir ses propres règles de signature, approuver qui paie le gaz et exécuter une ou plusieurs actions sans dépendre de l'EntryPoint de l'ERC-4337, des bundlers (regroupeurs) ou des relayeurs gérés par l'application.

Cela modifie les hypothèses du produit. Le parrainage de gaz devient un modèle de compte natif au lieu d'une infrastructure que chaque application doit organiser séparément. Les schémas de signature alternatifs deviennent plus faciles à prendre en charge, y compris les clés d'accès aujourd'hui et une voie d'éloignement de l'ECDSA si une migration post-quantique devient nécessaire. Si l'EIP-8141 ou une conception similaire d'abstraction de compte native aboutit, le modèle du constructeur passe de « un EOA signe une transaction » à « un compte définit comment il valide, paie et exécute une transaction ».

C'est la direction, pas une promesse. L'EIP-8141 est à l'état de brouillon (Draft), et en mai 2026, il est seulement « envisagé pour inclusion » dans Hegotá, ce qui signifie que les équipes clientes en discutent mais ne se sont pas engagées à le livrer dans cette mise à jour. La voie de construction pratique en 2026 pour l'UX des comptes reste l'EIP-7702 plus les flux de portefeuille ERC-4337, mais les constructeurs doivent concevoir comme si les comptes programmables devenaient le modèle de compte par défaut.

## Ce qu'il faut construire différemment maintenant {#what-to-build-differently-now}

Commencez par revérifier les anciennes hypothèses de frais. Si votre guide de déploiement traite toujours le réseau principal Ethereum comme un environnement de 10 à 30 gwei par défaut, il détourne probablement trop de travail de la couche 1 (l1). Le Réseau principal mérite d'être envisagé en premier lorsque votre application dépend d'une liquidité partagée, d'une composabilité avec les protocoles existants, de la neutralité ou d'un état de grande valeur qui devrait résider là où la sécurité et le consensus social d'Ethereum sont les plus forts.

Utilisez les couches 2 (l2) pour les raisons qui comptent toujours, notamment la distribution, un volume de transactions très élevé, des écosystèmes spécifiques aux applications ou des coûts par action qui doivent être aussi proches de zéro que possible. L'idée n'est pas « le Réseau principal pour tout ». L'idée est que « le Réseau principal est trop cher » ne devrait plus être le premier filtre.

Du côté des comptes, construisez en fonction des capacités du portefeuille au lieu des EOA bruts. Votre interface utilisateur (frontend) doit être prête pour les appels traités par lots, le gaz parrainé, les clés de session, les clés d'accès et les flux de récupération qui arrivent via les portefeuilles. L'EIP-7702 et l'ERC-4337 sont les outils pratiques d'aujourd'hui. L'abstraction de compte native est la direction à suivre ensuite.

Arrêtez de traiter le réseau principal Ethereum comme la couche de règlement coûteuse que vous ne touchez qu'à la fin, et arrêtez de traiter les comptes utilisateurs comme des clés ECDSA statiques qui doivent détenir de l'ETH avant de pouvoir faire quoi que ce soit. Ethereum en 2026 s'oriente vers une exécution de la couche 1 (l1) moins chère et des comptes programmables. Construisez pour ce monde.

## Lectures complémentaires {#further-reading}

- [Annonce du Réseau principal Pectra](https://blog.ethereum.org/en/2025/04/23/pectra-mainnet)
- [Annonce du Réseau principal Fusaka](https://blog.ethereum.org/2025/11/06/fusaka-mainnet-announcement)
- [Mise à jour des priorités du protocole pour 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Point de contrôle n° 9 (avr. 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [Lignes directrices Pectra 7702 sur ethereum.org](https://ethereum.org/en/roadmap/pectra/7702/)
- [EIP-7702 : Définir le code pour les EOA](https://eips.ethereum.org/EIPS/eip-7702)
- [EIP-7928 : Listes d'accès au niveau du bloc](https://eips.ethereum.org/EIPS/eip-7928)
- [EIP-7805 : Listes d'inclusion appliquées par le choix du fork (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8141 : Transaction par trames](https://eips.ethereum.org/EIPS/eip-8141)
- [Mise à jour Hegotá sur Forkcast](https://forkcast.org/upgrade/hegota/)
- [Traqueur de gaz d'Etherscan](https://etherscan.io/gastracker)
- [EIP-7773 : Méta du hard fork Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Feuille de route de Glamsterdam sur ethereum.org](https://ethereum.org/roadmap/glamsterdam/)