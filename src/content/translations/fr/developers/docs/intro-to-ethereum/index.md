---
title: Introduction à Ethereum
description: Introduction aux concepts fondamentaux d'Ethereum pour les développeurs de DApp.
lang: fr
sidebar: true
---

## Qu'est-ce qu'une blockchain ? {#what-is-a-blockchain}

Une blockchain est une base de données publique qui est mise à jour et partagée entre les nombreux ordinateurs d'un réseau.

"Block" fait référence au fait que les données et l'état sont stockés dans des lots séquentiels ou "blocs". Si vous envoyez de l'ETH à quelqu'un, les données de la transaction doivent être ajoutées à un bloc pour que cette dernière réussisse.

"Chain" désigne le fait que chaque bloc fait cryptographiquement référence à son parent. Les données d'un bloc ne peuvent pas être modifiées sans changer tous les blocs suivants, ce qui nécessiterait le consensus de l'ensemble du réseau.

Chaque nouveau bloc et la chaîne dans son ensemble doivent faire l'objet d'un accord entre tous les nœuds du réseau. Cela permet à tout le monde d'avoir les mêmes données. Pour que cela fonctionne, les blockchains ont besoin d'un mécanisme de consensus.

Ethereum utilise actuellement un mécanisme de consensus appelé "preuve de travail". Cela signifie que toute personne voulant ajouter de nouveaux blocs à la chaîne doit résoudre un problème difficile, qui nécessite beaucoup de puissance de calcul informatique. Résoudre le problème "prouve" que vous avez dépensé les ressources informatiques. Cette action s'appelle le [minage](/developers/docs/consensus-mechanisms/pow/mining/). Le minage fonctionne par tâtonnements, mais lorsqu'un bloc est correctement ajouté, le mineur est récompensé en ETH. À l'inverse, soumettre des blocs frauduleux est une option sans intérêt compte tenu des ressources que vous avez dépensées pour produire le bloc.

Les nouveaux blocs sont diffusés aux nœuds du réseau, vérifiés et validés, ce qui met à jour l'état pour tout le monde.

Pour résumer, lorsque vous envoyez de l'ETH à quelqu'un, la transaction doit être minée et incluse dans un nouveau bloc. L'état mis à jour est ensuite partagé avec l'ensemble du réseau. Pour plus de détails, voir ci-dessous.

Regardez Austin vous guider à travers les blockchains :

<YouTube id="zcX7OJ-L8XQ" />

## Qu'est-ce qu'Ethereum ? {#what-is-ethereum}

Dans l'univers Ethereum, il existe un ordinateur unique et conforme (appelé EVM, ou Ethereum Virtual Machine) dont l'état est approuvé par tous sur le réseau Ethereum. Quiconque participe au réseau Ethereum (chaque nœud Ethereum) garde une copie de l'état de cet ordinateur. De plus, chaque participant peut diffuser une demande pour que cet ordinateur effectue un calcul arbitraire. Dès lors qu'une telle demande est diffusée, les autres participants sur le réseau vérifient, valident et exécutent le calcul. Cela produit un changement d'état de l'EVM, qui est engagé et propagé sur tout le réseau.

Les demandes de calcul sont appelées demandes de transaction; l'enregistrement de toutes les transactions, de la même façon que l'état actuel de l'EVM, est enregistré sur la blockchain, qui à son tour est stockée et validée par tous les nœuds.

Les mécanismes cryptographiques assurent qu'une fois que les transactions sont validées et ajoutées à la blockchain, elles ne peuvent plus être modifiées. Le même mécanisme assure également que toutes les transactions soient signées et exécutées avec les "autorisations" appropriées (personne n'est censé pouvoir envoyer des actifs numériques depuis le compte d'Alice, excepté Alice elle-même).

## Qu'est-ce-que l'ether ? {#what-is-ether}

Le but de l'Ether, la cryptomonnaie, est de permettre l'existence d'un marché pour le calcul. Un tel marché incite économiquement les participants à vérifier/exécuter les demandes de transaction et à fournir des ressources informatiques au réseau.

Chaque participant qui diffuse une demande de transaction doit également offrir une certaine somme en ether au réseau. Elle constituera une récompense pour celui qui fera le travail de vérifier la transaction, de l'exécuter, de la mettre sur la blockchain et de la diffuser sur le réseau.

Le montant à payer en ether est fonction de la longueur du calcul. Cela empêche également les participants malveillants de bloquer intentionnellement le réseau en demandant l'exécution de boucles infinies ou des scripts gourmands en ressources, vu qu'ils seront alors continuellement facturés.

## Qu'est-ce que les DApps? {#what-are-dapps}

Dans la pratique, les participants n'écrivent pas de code à chaque fois qu'ils veulent faire une demande de calcul sur l'EVM. À la place, les développeurs d'applications téléchargent des programmes (extraits de code réutilisables) dans la mémoire de l'EVM, et les utilisateurs font des demandes pour l'exécution de ces extraits de codes avec des paramètres qui varient. On appelle "contrats intelligents" les programmes téléchargés sur le réseau et exécutés.

Pour faire simple, vous pouvez imaginer qu'un contrat intelligent est une sorte de distributeur automatique : un script qui, lorsqu'il est appelé avec certains paramètres, effectue des actions ou des calculs si certaines conditions sont réunies. Par exemple, un simple contrat intelligent de vendeur pourrait créer et assigner la propriété d'un actif numérique si l'appelant envoie de l'ether à un destinataire spécifique.

N'importe quel développeur peut créer un contrat intelligent et le rendre public sur le réseau, en utilisant la blockchain comme couche de données, moyennant des frais payés au réseau. Tout utilisateur peut alors appeler le contrat intelligent et exécuter son code, encore une fois contre des frais payés au réseau.

Ainsi, avec les contrats intelligents, les développeurs peuvent créer et déployer des applications et des services complexes orientés utilisateurs : des places de marché, des instruments financiers, des jeux, etc.

## Terminologie {#terminology}

### Blockchain {#blockchain}

L'ensemble des blocs engagés sur le réseau Ethereum dans le début de son histoire. Elle est appelée ainsi car chaque bloc contient une référence au bloc précédent, ce qui nous aide à maintenir un ordre entre les blocs (et ce de façon précise).

### ETH {#eth}

La cryptomonnaie native d'Ethereum. Les utilisateurs payent les autres utilisateurs en ether afin que leurs demandes d'exécution de code soient satisfaites.

### EVM {#evm}

La machine virtuelle Ethereum, l’ordinateur virtuel mondial dont chaque participant du réseau Ethereum stocke et approuve l'état. N'importe quel participant peut demander une exécution de code arbitraire sur l'EVM. Une exécution de code modifie l'état de l'EVM.

[Plus d'informations sur l'EVM](/developers/docs/evm/)

### Nœuds {#nodes}

Les machines réelles qui stockent l'état de l'EVM. Les nœuds communiquent les uns avec les autres pour propager les informations sur l'état de l'EVM et les nouveaux changements d'état. N'importe quel utilisateur peut également demander une exécution de code en diffusant une demande d'exécution de code depuis un nœud. Le réseau Ethereum lui-même est le regroupement de tous les nœuds Ethereum et de leurs communications.

[Plus d'infos sur les nœuds](/developers/docs/nodes-and-clients/)

### Comptes {#accounts}

Endroit où l'ether est stocké. Les utilisateurs peuvent initialiser des comptes, y déposer de l'ether et en transférer à d'autres utilisateurs. Les comptes et les soldes des comptes sont stockés dans une grande table au sein de l’EVM. Ils font partie de l’état global de l’EVM.

[Plus d'infos sur les comptes](/developers/docs/accounts/)

### Transactions {#transactions}

Une "demande de transaction" est le terme officiel pour une demande d'exécution de code sur l'EVM, et une "transaction" correspond à une demande de transaction satisfaite et au changement associé dans l'état de l'EVM. N'importe quel utilisateur peut diffuser une demande de transaction sur le réseau depuis un nœud. Pour qu'une demande de transaction affecte réellement l'état convenu de l'EVM, elle doit être validée, exécutée et "engagée sur le réseau" par un autre nœud . L'exécution de n'importe quel code provoque un changement d'état dans l'EVM. En cas d'engagement, ce changement d'état est diffusé à tous les nœuds du réseau. Quelques exemples de transactions :

- Envoyer X ether depuis mon compte sur le compte d'Alice.
- Publier un code de contrat intelligent dans la mémoire de l'EVM.
- Exécuter le code du contrat intelligent à l'adresse X dans l'EVM, avec les arguments Y.

[Plus d'infos sur les transactions](/developers/docs/transactions/)

### Blocs {#blocks}

Le volume des transactions est très élevé, les transactions sont donc "engagées" en lots ou en blocs. Les blocs contiennent généralement des dizaines à des centaines de transactions.

[Plus d'infos sur les nœuds](/developers/docs/blocks/)

### Contrats intelligents {#smart-contracts}

Extraits de code réutilisables (un programme) qu'un développeur publie dans la mémoire de l'EVM. N'importe qui peut demander l'exécution du code d'un contrat intelligent en faisant une demande de transaction. Étant donné que les développeurs peuvent écrire des applications exécutables arbitraires dans l'EVM (jeux, places de marché, instruments financiers, etc.) en publiant des contrats intelligents, ceux-ci sont aussi souvent appelés [DApps, ou Applications décentralisées](/developers/docs/dapps/).

[Plus d'infos sur les contrats intelligents](/developers/docs/smart-contracts/)

## Complément d'information {#further-reading}

- [Livre blanc Ethereum](/whitepaper/)

## Tutoriels connexes {#related-tutorials}

- [A developer's guide to Ethereum, part 1 (en Anglais)](/developers/tutorials/a-developers-guide-to-ethereum-part-one/) _ - Une exploration d'Ethereum utilisant Python et Web3.py pour les grands débutants_
