---
title: Introduction à Ethereum
description: Introduction aux concepts fondamentaux d'Ethereum pour les développeurs de DApp.
lang: fr
---

## Qu'est-ce qu'une blockchain ? {#what-is-a-blockchain}

Une blockchain est une base de données publique qui est mise à jour et partagée entre les nombreux ordinateurs d'un réseau.

« Block » fait référence au fait que les données et l'état sont stockés dans des lots séquentiels ou « blocs ». Si vous envoyez de l'ETH à quelqu'un, les données de la transaction doivent être ajoutées à un bloc pour que cette dernière réussisse.

« Chain » désigne le fait que chaque bloc fait cryptographiquement référence à son parent. En d'autres termes, les blocs sont enchaînés. Les données d'un bloc ne peuvent pas être modifiées sans changer tous les blocs suivants, ce qui nécessiterait le consensus de l'ensemble du réseau.

Chaque ordinateur du réseau doit accepter chaque nouveau bloc, ainsi que la chaîne dans son intégralité. Ces ordinateurs sont appelés des « nœuds ». Les nœuds garantissent que toutes les personnes qui interagissent avec la blockchain disposent des mêmes données. Pour assurer que tous les nœuds soient d'accord, les blockchains ont besoin d'un mécanisme de consensus.

Ethereum utilise un mécanisme de consensus basé sur [la preuve d'enjeu](/developers/docs/consensus-mechanisms/pos/). Quiconque souhaite ajouter de nouveaux blocs à la chaîne, doit staker de l'ETH - la monnaie native d'Ethereum - qui pourra être utilisée en tant que collatéral et logiciel de validation. Ces "validateurs" peuvent ensuite être sélectionnés aléatoirement pour soumettre des blocs, lesquels seront envoyés à d'autres validateurs pour vérification et ajoutés à la chaîne de blocs. Il existe un système de récompenses et de pénalités qui incite fortement les participants à être honnêtes et disponibles en ligne autant que possible.

Si vous souhaitez voir comment les données de la blockchain sont hachées puis ajoutées à l'historique des références des blocs, consultez [cette démo](https://andersbrownworth.com/blockchain/blockchain) d'Anders Brownworth et regardez la vidéo d'accompagnement ci-dessous.

Regardez Anders expliquer le hachage dans les blockchains :

<YouTube id="_160oMzblY8" />

## Qu'est-ce qu'Ethereum ? {#what-is-ethereum}

Ethereum est une blockchain avec un ordinateur intégré. C'est la base pour élaborer des applications et des organisations d'une manière décentralisée, sans demande de permission et en résistant à la censure.

Dans l'univers Ethereum, il existe un ordinateur unique et canonique (appelé EVM, ou Ethereum Virtual Machine) dont l'état est approuvé par tous sur le réseau Ethereum. Quiconque participe au réseau Ethereum (chaque nœud Ethereum) garde une copie de l'état de cet ordinateur. De plus, chaque participant peut diffuser une demande pour que cet ordinateur effectue un calcul arbitraire. Dès lors qu'une telle demande est diffusée, les autres participants sur le réseau vérifient, valident et exécutent le calcul. Cette exécution produit un changement d'état de l'EVM, qui est engagé et propagé sur tout le réseau.

Les demandes de calcul sont appelées « demandes de transaction » ; l'enregistrement de toutes les transactions, de la même façon que l'état actuel de l'EVM, est enregistré sur la blockchain, qui à son tour est stockée et validée par tous les nœuds.

Les mécanismes cryptographiques garantissent qu'une fois que les transactions sont vérifiées comme étant valides et ajoutées à la blockchain, elles ne pourront pas être altérées ultérieurement. Les mêmes mécanismes garantissent également que toutes les transactions sont signées et exécutées avec les « autorisations » appropriées (personne ne devrait pouvoir transmettre des biens numériques depuis le compte d'Alice, sauf Alice elle-même).

## Qu'est-ce-que l'ether ? {#what-is-ether}

**Ether (ETH)** est la cryptomonnaie native d'Ethereum. L'objectif de l'ETH est de créer un marché du calcul. Un tel marché incite économiquement les participants à vérifier/exécuter les demandes de transaction et à fournir des ressources informatiques au réseau.

Tout participant qui diffuse une demande de transaction doit également offrir une certaine quantité d'ETH au réseau comme prime. Le réseau brule une partie de cette prime et versera le reste à quiconque effectuera le travail de vérification de la transaction, l'exécutera, l'enregistrera dans la blockchain et la diffusera sur le réseau.

La quantité d'ETH payée correspond aux ressources nécessaires pour effectuer les calculs. Ces primes empêchent également les participants malveillants de bloquer intentionnellement le réseau en demandant l'exécution de boucles infinies ou d'autres scripts gourmands en ressources, dans la mesure où ces participants doivent payer les ressources de calcul qu'ils réquisitionnent.

L'ETH est également utilisé pour fournir une sécurité crypto-économique au réseau de trois manières principales : 1 - il est utilisé comme moyen de récompenser les validateurs qui proposent des blocs ou encore empêcher des appels aux comportements malhonnêtes par d'autres validateurs ; 2 - il est misé par des validateurs, agissant ainsi comme collatéral contre un comportement malhonnête — si les validateurs tentent de mal se comporter, leur ETH peut être détruit ; 3 - il est utilisé pour pondérer les « votes » pour les blocs nouvellement proposés, en alimentant la partie de fourche du mécanisme de consensus.

## Qu'est-ce qu'un contrat intelligent ? {#what-are-smart-contracts}

En pratique, les participants n'écrivent pas de nouveau code chaque fois qu'ils veulent demander un calcul sur l'EVM. À la place, les développeurs d'applications téléchargent des programmes (extraits de code réutilisables) dans la mémoire de l'EVM et les utilisateurs exécutent des requêtes pour exécuter ces extraits de codes selon des paramètres variables. On appelle « contrats intelligents » les programmes téléchargés sur le réseau et exécutés par celui-ci.

Pour faire simple, vous pouvez imaginer qu'un contrat intelligent est une sorte de distributeur automatique : un script qui, lorsqu'il est appelé selon certains paramètres, effectue des actions ou des calculs si certaines conditions sont réunies. Par exemple, un simple contrat intelligent de vendeur pourrait créer et assigner la propriété d'un actif numérique lorsque l'appelant envoie de l'ETH à un destinataire spécifique.

N'importe quel développeur peut créer un contrat intelligent et le rendre public sur le réseau, en utilisant la blockchain comme couche de données, moyennant des frais payés au réseau. Tout utilisateur peut alors appeler le contrat intelligent et exécuter son code, encore une fois contre des frais payés au réseau.

Avec les contrats intelligents, les développeurs peuvent ainsi créer et déployer des applications et des services complexes orientés utilisateurs, tels que des sites marchands, des outils financiers, des jeux, etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

L'ensemble des blocs engagés sur le réseau Ethereum depuis le début de son histoire. Elle est appelée ainsi car chaque bloc contient une référence au bloc précédent, ce qui nous aide à maintenir un ordre entre les blocs (et donc un historique précis).

### ETH {#eth}

**Ether (ETH)** est la cryptomonnaie native d'Ethereum. Les utilisateurs payent les autres utilisateurs en ETH afin que leurs demandes d'exécution de code soient satisfaites.

[Autres informations sur ETH](/developers/docs/intro-to-ether/)

### EVM {#evm}

La machine virtuelle Ethereum est l’ordinateur virtuel mondial dont chaque participant du réseau Ethereum stocke et approuve l'état. N'importe quel participant peut demander une exécution de code arbitraire sur l'EVM. Une exécution de code modifie l'état de l'EVM.

[Plus d'infos sur l'EVM](/developers/docs/evm/)

### Nœuds {#nodes}

Les machines réelles qui stockent l'état de l'EVM. Les nœuds communiquent les uns avec les autres pour propager les informations sur l'état de l'EVM et les nouveaux changements d'état. N'importe quel utilisateur peut également demander une exécution de code en diffusant une demande d'exécution de code depuis un nœud. Le réseau Ethereum lui-même est le regroupement de tous les nœuds Ethereum et de leurs communications.

[Plus d'infos sur les nœuds](/developers/docs/nodes-and-clients/)

### Comptes {#accounts}

Où est stocké ETH ? Les utilisateurs peuvent initialiser des comptes, y déposer des ETH et en transférer à d'autres utilisateurs. Les comptes et les soldes des comptes sont stockés dans une grande table au sein de l’EVM. Ils font partie de l’état global de l’EVM.

[Plus d'infos sur les comptes](/developers/docs/accounts/)

### Transactions {#transactions}

Une « demande de transaction » est le terme officiel pour une demande d'exécution de code sur l'EVM, et une « transaction » correspond à une demande de transaction satisfaite et au changement associé dans l'état de l'EVM. N'importe quel utilisateur peut diffuser une demande de transaction sur le réseau depuis un nœud. Pour qu'une demande de transaction affecte l'état convenu de l'EVM, elle doit être validée, exécutée et « engagée sur le réseau » par un autre nœud. L'exécution d'un code quel qu'il soit provoque un changement d'état dans l'EVM. En cas d'engagement, ce changement d'état est diffusé à tous les nœuds du réseau. Quelques exemples de transactions :

- Envoyer X ETH depuis mon compte sur le compte d'Alice.
- Publier un code de contrat intelligent dans l'état de l'EVM.
- Exécuter le code du contrat intelligent à l'adresse X dans l'EVM, avec les arguments Y.

[Plus d'infos sur les transactions](/developers/docs/transactions/)

### Blocs {#blocks}

Le volume des transactions est très élevé, les transactions sont donc « engagées » en lots, ou en « blocs ». Les blocs contiennent généralement des dizaines à des centaines de transactions.

[Plus d'infos sur les blocs](/developers/docs/blocks/)

### Contrats intelligents {#smart-contracts}

Extraits de code réutilisables (un programme) qu'un développeur publie dans l'état de l'EVM. N'importe qui peut demander l'exécution du code d'un contrat intelligent en faisant une demande de transaction. Étant donné que les développeurs peuvent écrire des applications exécutables arbitraires dans l'EVM (jeux, places de marché, instruments financiers, etc.) en publiant des contrats intelligents, ceux-ci sont aussi souvent appelés [dApps, ou Applications décentralisées](/developers/docs/dapps/).

[Plus d'infos sur les contrats intelligents](/developers/docs/smart-contracts/)

## Complément d'information {#further-reading}

- [Livre blanc Ethereum](/whitepaper/)
- [Comment fonctionne Ethereum, en fait ?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369) - _Preethi Kasireddy_ (**NB** cette ressource est toujours utile mais sachez qu'elle est antérieure à [La Fusion](/roadmap/merge) et fait donc toujours référence au mécanisme de preuve de travail d'Ethereum - Ethereum est désormais sécurisé par la [preuve d'enjeu](/developers/docs/consensus-mechanisms/pos))

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Tutoriels connexes {#related-tutorials}

- [Guide du développeur pour Ethereum, partie 1](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _ - Une exploration d'Ethereum utilisant Python et Web3.py pour les grands débutants_
