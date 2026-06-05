---
title: "Pourquoi construire sur Ethereum"
description: "La décentralisation, la résistance à la censure, le déploiement sans permission et la composabilité ne sont pas des arguments de vente distincts. Ils se renforcent mutuellement. Un guide pratique expliquant pourquoi les constructeurs devraient choisir Ethereum."
author: "Philip Krause"
team: "EF Builder Growth"
tags:
  - "décentralisation"
  - "résistance à la censure"
  - "composabilité"
published: 2026-05-12
image: /images/developers/blog/latest-post-header-1.png
breadcrumb: Pourquoi construire sur Ethereum
lang: fr
---

Les constructeurs choisissent leur infrastructure en fonction des promesses que leur application doit tenir.

La plupart des promesses logicielles dépendent d'un opérateur. Un fournisseur de cloud maintient le serveur en marche. Une plateforme garde le compte ouvert. Un processeur de paiement maintient l'activation du marchand. Un fournisseur d'API garde la clé valide. Cela convient à de nombreux produits. Ce n'est pas suffisant lorsque la valeur du produit dépend d'un accès neutre, d'un état partagé et d'engagements que les utilisateurs et les autres développeurs peuvent vérifier par eux-mêmes.

Ethereum est conçu pour le second cas, où l'accès neutre et les engagements vérifiables sont le produit. Personne ne le possède. La chaîne fonctionne à travers de nombreux pays, de nombreux opérateurs et de multiples implémentations de clients indépendantes, et aucune entreprise, aucun validateur ni aucune fondation ne peut réécrire discrètement les règles. Pour un constructeur, cela signifie que ce n'est pas seulement un endroit pour héberger du code. C'est un endroit pour prendre des engagements publics. Vous pouvez publier sans demander à personne, les utilisateurs peuvent continuer à accéder à ce que vous déployez, d'autres développeurs peuvent construire dessus sans votre permission, et votre application peut continuer à fonctionner même si l'une des parties, y compris vous-même, cesse de coopérer.

## Décentralisation {#decentralization}

La décentralisation est la fondation sur laquelle reposent ces propriétés. Ethereum l'offre grâce à un réseau d'ordinateurs, appelés nœuds, qui stockent chacun une copie de la chaîne et vérifient chaque transaction. Chaque nœud exécute un logiciel client. Un sous-ensemble de nœuds, appelés validateurs, proposent et confirment à tour de rôle de nouveaux blocs via un processus appelé consensus. Pour participer, les validateurs déposent des ETH en tant que collatéral, appelé mise, qu'ils perdent s'ils enfreignent les règles. Environ 13 700 à 14 000 nœuds ont été recensés dans le traqueur de nœuds d'Etherscan en avril 2026, répartis aux États-Unis, en Allemagne, en Chine, au Royaume-Uni, en Russie, au Japon et dans des dizaines d'autres pays.

La décentralisation est également économique. Environ 32 à 36 millions d'ETH, soit environ 27 à 29 % de l'offre, sont mis en jeu en tant que collatéral que le protocole ampute (slashing) lorsque les validateurs se comportent mal de manière prouvable. Un attaquant devrait acquérir et risquer une fraction significative de cette mise pour corrompre la chaîne. Aux prix de l'ETH d'avril 2026, cela signifie que des dizaines de milliards de dollars seraient en jeu.

L'autre dimension est le logiciel lui-même. Chaque nœud Ethereum exécute deux logiciels côte à côte. Un client d'exécution fait tourner l'EVM et suit l'état du contrat. Un client de consensus gère la preuve d'enjeu (PoS). Il suit quels validateurs proposent des blocs, quels blocs le réseau accepte, et quand un bloc devient final. Une décentralisation saine nécessite de multiples implémentations indépendantes de chacun, afin qu'un bug dans un client ne devienne pas automatiquement un bug dans Ethereum.

La couche d'exécution compte cinq clients majeurs en production. Geth tourne à environ 50 %, Nethermind autour de 25 %, Besu autour de 9 %, Reth autour de 8 % et Erigon autour de 7 %. La couche de consensus fonctionne sur Lighthouse, Prysm, Teku, Nimbus, Lodestar et d'autres clients. Ethereum n'est une chaîne à client unique sur aucune des deux couches.

La part de près de 50 % de Geth est la véritable fragilité. Un bug dans un client minoritaire est douloureux pour ses opérateurs, mais le reste du réseau peut continuer. Un bug sévère dans un client majoritaire est plus dangereux. C'est pourquoi la diversité des clients est une priorité opérationnelle active.

Cette priorité a été testée. Ethereum n'a jamais connu d'arrêt complet de la chaîne depuis sa genèse le 30 juillet 2015. L'incident majeur dont il s'est le plus rapproché a eu lieu les 11 et 12 mai 2023, lorsque la couche de consensus, appelée la chaîne balise, n'a pas réussi à finaliser pendant environ 25 minutes, puis plus tard pendant environ 64 minutes. La cause était un bug du client Prysm. La finalité exige que plus des deux tiers des validateurs attestent, et la part de Prysm à l'époque était suffisamment élevée pour que son problème fasse brièvement passer le réseau en dessous de ce seuil.

Un blocage de la finalité n'est pas la même chose qu'un arrêt de la chaîne. De nouveaux blocs ont continué à être produits, des transactions ont continué à être incluses, et la plupart des utilisateurs et des applications ont continué à fonctionner. Ce qui s'est bloqué, c'est la garantie de règlement la plus forte d'Ethereum. Selon les hypothèses normales de consensus, un bloc vieux de plus d'environ 13 minutes ne peut pas être annulé. Les ponts, les échanges et les autres systèmes qui attendent la finalité avant de créditer les dépôts auraient suspendu ces flux. La chaîne elle-même a récupéré automatiquement une fois que suffisamment de validateurs ont rattrapé leur retard, sans intervention manuelle.

Pour les constructeurs, cette histoire compte. Si d'autres personnes vont détenir des actifs dans vos contrats, acheminer des ordres via votre marché ou construire sur votre primitive, elles ont besoin que la fondation sous-jacente continue de fonctionner malgré les bugs, les défaillances des clients et la pression institutionnelle.

## Résistance à la censure {#censorship-resistance}

La décentralisation est la structure. La résistance à la censure est l'un des avantages pratiques qu'elle apporte. Les utilisateurs ne devraient pas avoir besoin de la permission d'une entreprise, d'un gouvernement, d'un relais, d'un validateur, d'un fournisseur RPC ou d'un opérateur d'application pour envoyer une transaction valide à vos contrats.

Cela ne signifie pas que chaque transaction atterrit dans le bloc suivant. Cela signifie qu'aucune partie unique ne peut empêcher indéfiniment une transaction valide d'être sur la chaîne. Chaque bloc est proposé par un validateur différent, qui travaille avec des parties externes, appelées constructeurs et relais, pour l'assembler. Si l'un d'eux filtre votre transaction, le créneau suivant a un ensemble différent, et finalement l'un d'eux l'inclut. La censure doit persister à travers toute cette distribution tournante, ce qui est beaucoup plus difficile qu'un seul opérateur disant non. La période post-Tornado Cash a montré à quoi cela ressemble sous pression.

Tornado Cash est un contrat de mixage axé sur la confidentialité qui brise le lien onchain entre le dépôt et le retrait. Après que l'OFAC l'a sanctionné en août 2022, plusieurs relais MEV-Boost majeurs ont refusé de transmettre les blocs contenant des transactions provenant d'adresses sanctionnées. La part des blocs construits via ces relais conformes à l'OFAC a culminé à près de 79 % en novembre 2022. Les 21 % restants provenaient de relais et de constructeurs qui ne filtraient pas, de sorte que les transactions Tornado Cash atterrissaient toujours, mais plus lentement. L'attente prévue est passée d'environ 12 secondes à environ une minute.

Cela semblait alarmant, et ça l'était. Puis cette part a chuté. De nouveaux relais ont été lancés explicitement sans filtres, notamment Ultra Sound et Agnostic, et les proposants étaient libres de les ajouter à leur configuration MEV-Boost. Personne ne pouvait forcer chaque proposant à utiliser un relais de filtrage, la part ne pouvait donc pas rester à son apogée. Au début de 2023, elle était inférieure à 50 %, et pendant le reste de 2023, elle a oscillé entre 27 % et 47 %. L'OFAC a retiré Tornado Cash de la liste des sanctions en mars 2025. Cet épisode reste le test de résistance à la censure le plus clair d'Ethereum.

Ethereum intègre également davantage cette garantie dans le protocole lui-même. Une mise à niveau prévue appelée FOCIL (EIP-7805) ajoute des listes d'inclusion. Des validateurs sélectionnés au hasard publient les transactions qu'ils voient dans la mempool publique, et le bloc suivant est censé satisfaire ces listes. Si un bloc les ignore, le reste du réseau peut le rejeter. Ainsi, personne ne peut empêcher vos utilisateurs d'utiliser votre application.

## Sans permission {#permissionless}

La résistance à la censure concerne la capacité des utilisateurs à continuer d'accéder à votre application après son déploiement. Le caractère sans permission concerne la possibilité même de la déployer en premier lieu.

Déployer sur Ethereum ne nécessite aucun partenariat, compte, approbation de référencement, examen par une boutique d'applications ou accord commercial. N'importe qui peut déployer du code, appeler un contrat, exécuter un nœud, indexer des données, construire un portefeuille ou publier une interface. La couche de base ne sait pas si vous êtes une startup, une banque, un développeur solo, un agent, une DAO ou un utilisateur sans aucune entreprise.

Cela change le modèle du constructeur. Sur une plateforme, le propriétaire de la plateforme peut modifier les conditions, révoquer des clés, bloquer des régions, supprimer des applications ou conditionner l'accès à une relation commerciale. Sur Ethereum, le protocole évalue les transactions selon les mêmes règles publiques pour n'importe quel appelant. Un contrat déployé aujourd'hui fonctionne selon ces règles publiques pour chaque adresse tant que la chaîne continue de fonctionner.

Cela ne supprime pas toutes les dépendances. La plupart des utilisateurs n'accèdent pas directement à vos contrats. Ils passent par une interface utilisateur (frontend), un portefeuille et un fournisseur RPC, et n'importe laquelle de ces couches peut tomber en panne ou filtrer. Les interfaces utilisateur peuvent être fermées. Les fournisseurs RPC, les services qui acheminent la plupart des requêtes d'applications et de portefeuilles vers la chaîne, peuvent refuser de transmettre des transactions ou bloquer des régions et des adresses spécifiques. Les portefeuilles peuvent choisir ce qu'ils affichent.

L'environnement d'exécution de base reste ouvert en dessous. Si votre interface utilisateur tombe en panne, un utilisateur peut toujours appeler le contrat directement, et un autre développeur peut construire une nouvelle interface. Si un portefeuille cesse de prendre en charge votre jeton, le contrat fonctionne toujours. Si un fournisseur RPC filtre, une application peut passer par un autre ou exécuter son propre nœud pour atteindre le réseau.

## Composabilité {#composability}

Le caractère sans permission permet à votre code d'arriver sur la chaîne. Une fois qu'il y est, personne ne peut le retirer, de sorte que d'autres développeurs peuvent construire par-dessus vos contrats, et vous pouvez construire sur les leurs.

Le WETH est l'exemple le plus clair. C'est un contrat qui enveloppe l'ETH afin qu'il puisse être utilisé comme un jeton standard dans d'autres contrats. Il se trouve à une adresse Ethereum fixe, détient environ 1,8 million de WETH en mai 2026, compte environ 3,25 millions de détenteurs et agit comme une unité commune à travers les DEX, les marchés de prêt, les coffres-forts et les ponts. C'est du code que des milliers d'autres contrats et applications peuvent utiliser directement.

Ce modèle se répète à travers l'écosystème. De la genèse au début de 2025, Ethereum a connu des dizaines de millions de déploiements de contrats et environ 2,5 millions de bytecodes uniques selon le décompte de Zellic. Des standards comme l'ERC-20 pour les jetons fongibles et l'ERC-721 pour les jetons non fongibles (NFT) sont devenus des couches de coordination. Un jeton émis par votre contrat peut être échangé sur un DEX, utilisé comme garantie pour emprunter sur un marché monétaire, indexé par des outils d'analyse, affiché dans des portefeuilles, et ponté ou enveloppé par d'autres systèmes sans que chaque équipe n'ait à négocier un accord personnalisé.

En mai 2026, environ 46 milliards de dollars se trouvaient dans la finance décentralisée (DeFi) sur Ethereum. Cet argent est verrouillé dans des milliers de protocoles fonctionnels, y compris des actifs, des marchés, des oracles, des portefeuilles, des systèmes de compte, des contrats de gouvernance, des ponts, des analyses et des outils de développement. Tout cela est du code que vous pouvez appeler directement dès le premier jour, au lieu de construire à partir de zéro ou d'attendre des partenariats.

## L'économie des agents {#the-agent-economy}

L'accès sans permission et la résistance à la censure, soutenus par la décentralisation, comptent encore plus pour la prochaine vague d'utilisateurs entrant sur Ethereum. Les agents d'IA constituent cette vague, et ils paient pour des services, détiennent du capital et règlent avec d'autres agents via des transactions et des appels de contrat, le tout sans humain dans la boucle. Un agent n'a pas de carte à débiter, pas de compte de plateforme à suspendre, et aucun humain à appeler lorsqu'un relais refuse de transmettre une transaction. C'est pourquoi ces deux éléments cessent d'être facultatifs pour ce type de logiciel, et les propriétés d'Ethereum correspondent directement à ce dont un agent a réellement besoin. Ethereum est l'endroit où cette économie devrait se développer, et cela pourrait accroître considérablement la base d'utilisateurs.

Que vous déployiez l'agent ou les contrats que l'agent appelle, les mêmes problèmes se posent. Sur une pile hébergée typique, l'identité de l'agent est louée à partir d'un compte de plateforme qui peut être révoqué. Ses paiements dépendent de la carte ou de la clé API d'un humain. Ses règles s'exécutent sur un serveur contrôlé par un opérateur. Sa continuité dépend d'un hôte qui peut disparaître. Chacune de ces dépendances est ce que la couche de base d'Ethereum est conçue pour supprimer.

Sur Ethereum, rien de tout cela ne dépend d'un opérateur. Les clés de l'agent lui appartiennent, et les règles qu'il signe ne peuvent pas être réécrites unilatéralement. Ses transactions passent par la même distribution tournante de validateurs, de constructeurs et de relais qui protège toute autre adresse d'un blocage ciblé. Les transitions d'état se produisent en public, de sorte que les contrats de l'autre côté de l'appel n'ont pas à faire confiance à un opérateur pour rapporter ce qui s'est passé.

Les rails sont déjà en place. Les contrats intelligents, les stablecoins et l'abstraction de compte donnent aujourd'hui à un acteur autonome une adresse fonctionnelle, un solde fonctionnel et des limites de dépenses programmables. Les standards pour l'identité des agents et les paiements natifs des machines rattrapent leur retard. L'ERC-8004 définit des registres onchain pour l'identité, la réputation et la validation des agents. x402 utilise le code d'état HTTP 402 pour permettre aux clients, y compris les agents, de payer des API et des services numériques en stablecoins sans comptes traditionnels. L'adoption en est à ses débuts mais progresse, et la surface d'intégration est petite. Acceptez les paiements x402 à vos points de terminaison, enregistrez ou vérifiez l'identité via l'ERC-8004, et traitez les adresses d'agents comme des utilisateurs de premier ordre dans vos contrats.

Pour tout constructeur choisissant une chaîne sur laquelle déployer, les agents constituent la prochaine classe d'utilisateurs en formation, et les rails sont déjà actifs. Les contrats que vous déployez aujourd'hui pourront les servir demain sans attendre un futur protocole.

## Conclusion {#conclusion}

La décentralisation, la résistance à la censure, le déploiement sans permission et la composabilité ne sont pas des arguments de vente distincts. Ils se renforcent mutuellement. La décentralisation rend la résistance à la censure crédible et permet aux utilisateurs de continuer à accéder à ce qui est déployé. Le déploiement sans permission permet aux constructeurs de publier. La composabilité transforme ces applications en infrastructure partagée. Les agents autonomes peuvent effectuer des transactions à travers elle et personne ne peut les arrêter. Ce que vous déployez est un engagement public. Il continue de fonctionner sans vous.

## Lectures complémentaires {#further-reading}

- [Point de contrôle n°9 de la Fondation Ethereum (avril 2026)](https://blog.ethereum.org/2026/04/10/checkpoint-9)
- [clientdiversity.org](https://clientdiversity.org/)
- [Traqueur de nœuds d'Etherscan](https://etherscan.io/nodetracker)
- [Validateurs beaconcha.in](https://beaconcha.in/charts/validators)
- [Post-mortem : finalité du Réseau principal en mai 2023](https://medium.com/offchainlabs/post-mortem-report-ethereum-mainnet-finality-05-11-2023-95e271dfd8b2)
- [mevwatch.info](https://www.mevwatch.info/)
- [The Block : les blocs conformes à l'OFAC tombent à 27 %](https://www.theblock.co/post/230179/ethereums-ofac-compliant-blocks-fall-to-27-marking-a-drop-in-protocol-level-censorship)
- [Proposition Hegotá Headliner : FOCIL (EIP-7805)](https://ethereum-magicians.org/t/hegota-headliner-proposal-focil-eip-7805/27604)
- [EIP-7805 : Listes d'inclusion appliquées par le choix de fork (FOCIL)](https://eips.ethereum.org/EIPS/eip-7805)
- [EIP-8004 : Identité d'agent onchain](https://eips.ethereum.org/EIPS/eip-8004)
- [GitHub de coinbase/x402](https://github.com/coinbase/x402)
- [CoinDesk : la demande pour x402 ne s'est pas concrétisée](https://www.coindesk.com/markets/2026/03/11/coinbase-backed-ai-payments-protocol-wants-to-fix-micropayment-but-demand-is-just-not-there-yet)
- [WETH sur Etherscan](https://etherscan.io/token/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2)
- [Zellic : Tous les contrats Ethereum](https://www.zellic.io/blog/all-ethereum-contracts/)
- [DefiLlama : chaîne Ethereum](https://defillama.com/chain/ethereum)
- [OpenZeppelin : Évaluation des risques techniques sur les réseaux de chaînes de blocs (avril 2026)](https://openzeppelin.com/hubfs/OpenZeppelin%20%7C%20Technical%20Risk%20Assessment%20on%20Blockchain%20Networks.pdf)