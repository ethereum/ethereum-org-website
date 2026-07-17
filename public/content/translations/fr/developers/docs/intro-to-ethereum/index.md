---
title: "Introduction technique à Ethereum"
description: "Une introduction aux concepts fondamentaux d'Ethereum pour les développeurs d'applications décentralisées (dapps)."
lang: fr
---

## Qu'est-ce qu'une chaîne de blocs ? {#what-is-a-blockchain}

Une chaîne de blocs est une base de données publique qui est mise à jour et partagée entre de nombreux ordinateurs sur un réseau.

Le terme « bloc » fait référence aux données et à l'état stockés dans des groupes consécutifs appelés « blocs ». Si vous envoyez des ETH à quelqu'un d'autre, les données de la transaction doivent être ajoutées à un bloc pour que celle-ci aboutisse.

Le terme « chaîne » fait référence au fait que chaque bloc référence cryptographiquement son parent. En d'autres termes, les blocs sont enchaînés les uns aux autres. Les données d'un bloc ne peuvent pas être modifiées sans modifier tous les blocs suivants, ce qui nécessiterait le consensus de l'ensemble du réseau.

Chaque ordinateur du réseau doit s'accorder sur chaque nouveau bloc et sur la chaîne dans son ensemble. Ces ordinateurs sont appelés des « nœuds ». Les nœuds garantissent que toute personne interagissant avec la chaîne de blocs dispose des mêmes données. Pour parvenir à cet accord distribué, les chaînes de blocs ont besoin d'un mécanisme de consensus.

[Ethereum](/) utilise un [mécanisme de consensus basé sur la preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos/). Quiconque souhaite ajouter de nouveaux blocs à la chaîne doit staker des ETH - la monnaie native d'Ethereum - comme collatéral et exécuter un logiciel client de validateur. Ces « validateurs » peuvent ensuite être sélectionnés de manière aléatoire pour proposer des blocs que d'autres validateurs vérifient et ajoutent à la chaîne de blocs. Il existe un système de récompenses et de pénalités qui incite fortement les participants à être honnêtes et disponibles en ligne autant que possible.

Si vous souhaitez voir comment les données de la chaîne de blocs sont hachées et ensuite ajoutées à l'historique des références de blocs, n'hésitez pas à consulter [cette démo](https://andersbrownworth.com/blockchain/blockchain) d'Anders Brownworth et à regarder la vidéo d'accompagnement ci-dessous.

Regardez Anders expliquer les hachages dans les chaînes de blocs :

<VideoWatch slug="blockchain-101-visual-demo" />

## Qu'est-ce qu'Ethereum ? {#what-is-ethereum}

Ethereum est une chaîne de blocs intégrant un ordinateur. C'est la fondation permettant de construire des applications et des organisations de manière décentralisée, sans permission et résistante à la censure.

Dans l'univers Ethereum, il existe un ordinateur unique et canonique (appelé la Machine Virtuelle Ethereum, ou EVM) sur l'état duquel tout le monde sur le réseau Ethereum s'accorde. Tous ceux qui participent au réseau Ethereum (chaque nœud Ethereum) conservent une copie de l'état de cet ordinateur. De plus, n'importe quel participant peut diffuser une requête pour que cet ordinateur effectue un calcul arbitraire. Chaque fois qu'une telle requête est diffusée, les autres participants du réseau vérifient, valident et effectuent (« exécutent ») le calcul. Cette exécution provoque un changement d'état dans l'EVM, qui est engagé et propagé à travers l'ensemble du réseau.

Les requêtes de calcul sont appelées requêtes de transaction ; l'enregistrement de toutes les transactions et l'état actuel de l'EVM sont stockés sur la chaîne de blocs, qui est à son tour stockée et approuvée par tous les nœuds.

Des mécanismes cryptographiques garantissent qu'une fois les transactions vérifiées comme valides et ajoutées à la chaîne de blocs, elles ne peuvent plus être falsifiées par la suite. Ces mêmes mécanismes garantissent également que toutes les transactions sont signées et exécutées avec les « permissions » appropriées (personne ne devrait pouvoir envoyer d'actifs numériques depuis le compte d'Alice, à l'exception d'Alice elle-même).

## Qu'est-ce que l'ether ? {#what-is-ether}

L'**ether (ETH)** est la cryptomonnaie native d'Ethereum. L'objectif de l'ETH est de permettre l'existence d'un marché pour le calcul. Un tel marché fournit une incitation économique aux participants pour vérifier et exécuter les requêtes de transaction et fournir des ressources de calcul au réseau.

Tout participant qui diffuse une requête de transaction doit également offrir une certaine quantité d'ETH au réseau sous forme de prime. Le réseau va brûler une partie de la prime et accorder le reste à celui qui finit par faire le travail de vérification de la transaction, de son exécution, de son engagement sur la chaîne de blocs et de sa diffusion sur le réseau.

Le montant d'ETH payé correspond aux ressources nécessaires pour effectuer le calcul. Ces primes empêchent également les participants malveillants d'encombrer intentionnellement le réseau en demandant l'exécution de calculs infinis ou d'autres scripts gourmands en ressources, car ces participants doivent payer pour les ressources de calcul.

L'ETH est également utilisé pour fournir une sécurité crypto-économique au réseau de trois manières principales : 1) il est utilisé comme moyen de récompenser les validateurs qui proposent des blocs ou signalent un comportement malhonnête de la part d'autres validateurs ; 2) il est staké par les validateurs, agissant comme collatéral contre les comportements malhonnêtes — si les validateurs tentent de mal se comporter, leurs ETH peuvent être détruits ; 3) il est utilisé pour pondérer les « votes » pour les nouveaux blocs proposés, alimentant la partie du choix de fork du mécanisme de consensus.

## Que sont les contrats intelligents ? {#what-are-smart-contracts}

En pratique, les participants n'écrivent pas de nouveau code à chaque fois qu'ils souhaitent demander un calcul sur l'EVM. Au lieu de cela, les développeurs d'applications déploient des programmes (des extraits de code réutilisables) dans l'état de l'EVM, et les utilisateurs font des requêtes pour exécuter ces extraits de code avec des paramètres variables. Nous appelons les programmes déployés et exécutés par le réseau des « contrats intelligents ».

À un niveau très basique, vous pouvez considérer un contrat intelligent comme une sorte de distributeur automatique : un script qui, lorsqu'il est appelé avec certains paramètres, effectue certaines actions ou calculs si certaines conditions sont remplies. Par exemple, un simple contrat intelligent de vente pourrait créer et attribuer la propriété d'un actif numérique si l'appelant envoie des ETH à un destinataire spécifique.

N'importe quel développeur peut créer un contrat intelligent et le rendre public sur le réseau, en utilisant la chaîne de blocs comme couche de données, moyennant des frais payés au réseau. N'importe quel utilisateur peut ensuite appeler le contrat intelligent pour exécuter son code, là encore moyennant des frais payés au réseau.

Ainsi, avec les contrats intelligents, les développeurs peuvent construire et déployer des applications et des services destinés aux utilisateurs d'une complexité arbitraire, tels que : des places de marché, des instruments financiers, des jeux, etc.

## Terminologie {#terminology}

### Chaîne de blocs {#blockchain}

La séquence de tous les blocs qui ont été engagés sur le réseau Ethereum dans l'histoire du réseau. Elle est nommée ainsi car chaque bloc contient une référence au bloc précédent, ce qui nous aide à maintenir un ordre sur tous les blocs (et donc sur l'historique précis).

### ETH {#eth}

L'**ether (ETH)** est la cryptomonnaie native d'Ethereum. Les utilisateurs paient des ETH à d'autres utilisateurs pour que leurs requêtes d'exécution de code soient satisfaites.

[Plus d'infos sur l'ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La Machine Virtuelle Ethereum (EVM) est l'ordinateur virtuel mondial dont chaque participant sur le réseau Ethereum stocke et approuve l'état. N'importe quel participant peut demander l'exécution de code arbitraire sur l'EVM ; l'exécution du code modifie l'état de l'EVM.

[Plus d'infos sur l'EVM](/developers/docs/evm/)

### Nœuds {#nodes}

Les machines réelles qui stockent l'état de l'EVM. Les nœuds communiquent entre eux pour propager des informations sur l'état de l'EVM et les nouveaux changements d'état. N'importe quel utilisateur peut également demander l'exécution de code en diffusant une requête d'exécution de code à partir d'un nœud. Le réseau Ethereum lui-même est l'agrégat de tous les nœuds Ethereum et de leurs communications.

[Plus d'infos sur les nœuds](/developers/docs/nodes-and-clients/)

### Comptes {#accounts}

L'endroit où l'ETH est stocké. Les utilisateurs peuvent initialiser des comptes, déposer des ETH sur ces comptes et transférer des ETH de leurs comptes vers d'autres utilisateurs. Les comptes et les soldes des comptes sont stockés dans une grande table au sein de l'EVM ; ils font partie de l'état global de l'EVM.

[Plus d'infos sur les comptes](/developers/docs/accounts/)

### Transactions {#transactions}

Une « requête de transaction » est le terme formel pour une demande d'exécution de code sur l'EVM, et une « transaction » est une requête de transaction satisfaite et le changement associé dans l'état de l'EVM. N'importe quel utilisateur peut diffuser une requête de transaction sur le réseau à partir d'un nœud. Pour que la requête de transaction affecte l'état convenu de l'EVM, elle doit être validée, exécutée et « engagée sur le réseau » par un autre nœud. L'exécution de tout code provoque un changement d'état dans l'EVM ; lors de l'engagement, ce changement d'état est diffusé à tous les nœuds du réseau. Quelques exemples de transactions :

- Envoyer X ETH de mon compte vers le compte d'Alice.
- Publier du code de contrat intelligent dans l'état de l'EVM.
- Exécuter le code du contrat intelligent à l'adresse X dans l'EVM, avec les arguments Y.

[Plus d'infos sur les transactions](/developers/docs/transactions/)

### Blocs {#blocks}

Le volume de transactions est très élevé, les transactions sont donc « engagées » par lots, ou blocs. Les blocs contiennent généralement des dizaines à des centaines de transactions.

[Plus d'infos sur les blocs](/developers/docs/blocks/)

### Contrats intelligents {#smart-contracts}

Un extrait de code réutilisable (un programme) qu'un développeur publie dans l'état de l'EVM. N'importe qui peut demander que le code du contrat intelligent soit exécuté en effectuant une requête de transaction. Étant donné que les développeurs peuvent écrire des applications exécutables arbitraires dans l'EVM (jeux, places de marché, instruments financiers, etc.) en publiant des contrats intelligents, celles-ci sont souvent également appelées [applications décentralisées (dapps)](/developers/docs/dapps/).

[Plus d'infos sur les contrats intelligents](/developers/docs/smart-contracts/)

## Que faire ensuite ? {#where-to-go-next}

La plupart des lecteurs suivent la documentation dans l'ordre, mais le chemin le plus court dépend de ce que vous essayez de construire :

- **Applications décentralisées (dapps) qui interagissent avec Ethereum :** les [comptes](/developers/docs/accounts/) et les [transactions](/developers/docs/transactions/), puis choisissez un [framework](/developers/docs/frameworks/).
- **Développement de contrats intelligents :** les [contrats intelligents](/developers/docs/smart-contracts/) et les [langages de programmation](/developers/docs/programming-languages/).
- **Nœuds et staking :** les [nœuds et clients](/developers/docs/nodes-and-clients/), puis les [mécanismes de consensus](/developers/docs/consensus-mechanisms/).

## Complément d'information {#further-reading}

- [Livre blanc d'Ethereum](/whitepaper/)
- [Comment fonctionne Ethereum, au fait ?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** cette ressource est toujours précieuse mais sachez qu'elle est antérieure à [La Fusion](/roadmap/merge) et fait donc toujours référence au mécanisme de preuve de travail (PoW) d'Ethereum - Ethereum est en fait désormais sécurisé à l'aide de la [preuve d'enjeu (PoS)](/developers/docs/consensus-mechanisms/pos))

### Vous avez plutôt une mémoire visuelle ? {#visual-learner}

Cette série de vidéos propose une exploration approfondie des sujets fondamentaux :

<VideoWatch slug="ethereum-basics-intro" />

[Liste de lecture sur les bases d'Ethereum](https://youtube.com/playlist?list=PLqgutSGloqiJyyoL0zvLVFPS-GMD2wKa5&si=kZTf5I7PKGTXDsOZ)

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Tutoriels connexes {#related-tutorials}

- [Guide d'Ethereum pour les développeurs, partie 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _– Une exploration d'Ethereum très accessible aux débutants utilisant Python et web3.py_