---
title: "Ethereum pour les développeurs JavaScript"
description: "Apprenez à développer pour Ethereum en utilisant des projets et des outils basés sur JavaScript."
lang: fr
---

JavaScript est l'un des langages les plus populaires de l'écosystème Ethereum. En fait, il y a une [équipe](https://github.com/ethereumjs) dédiée à apporter autant d'Ethereum que possible à JavaScript.

Il y a des opportunités d'écrire du JavaScript (ou quelque chose de proche) à [tous les niveaux de la pile](/developers/docs/ethereum-stack/).

## Interagir avec Ethereum {#interact-with-ethereum}

### Bibliothèques d'API JavaScript {#javascript-api-libraries}

Si vous souhaitez écrire du JavaScript pour interroger la chaîne de blocs, envoyer des transactions et plus encore, la façon la plus pratique de le faire est d'utiliser une [bibliothèque d'API JavaScript](/developers/docs/apis/javascript/). Ces API permettent aux développeurs d'interagir facilement avec les [nœuds du réseau Ethereum](/developers/docs/nodes-and-clients/).

Vous pouvez utiliser ces bibliothèques pour interagir avec des contrats intelligents sur Ethereum, il est donc possible de construire une application décentralisée (dapp) où vous utilisez simplement JavaScript pour interagir avec des contrats préexistants.

**Découvrez**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _inclut une implémentation de portefeuille Ethereum et des utilitaires en JavaScript et TypeScript._
- [viem](https://viem.sh) – _une interface TypeScript pour Ethereum qui fournit des primitives sans état de bas niveau pour interagir avec Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _une méta-bibliothèque TypeScript avec mise en cache intégrée, hooks et simulations de test pour un développement Ethereum sans effort à travers les bibliothèques Web3._

### Contrats intelligents {#smart-contracts}

Si vous êtes un développeur JavaScript et que vous souhaitez écrire votre propre contrat intelligent, vous voudrez peut-être vous familiariser avec [Solidity](https://solidity.readthedocs.io). C'est le langage de contrat intelligent le plus populaire et il est syntaxiquement similaire à JavaScript, ce qui peut faciliter son apprentissage.

Plus d'informations sur les [contrats intelligents](/developers/docs/smart-contracts/).

## Comprendre le protocole {#understand-the-protocol}

### La machine virtuelle Ethereum {#the-ethereum-virtual-machine}

Il existe une implémentation JavaScript de la [machine virtuelle d'Ethereum](/developers/docs/evm/). Elle prend en charge les dernières règles de fork. Les règles de fork font référence aux modifications apportées à l'EVM à la suite de mises à niveau planifiées.

Elle est divisée en plusieurs paquets JavaScript que vous pouvez consulter pour mieux comprendre :

- Les comptes
- Les blocs
- La chaîne de blocs elle-même
- Les transactions
- Et plus encore...

Cela vous aidera à comprendre des choses comme « quelle est la structure de données d'un compte ? ».

Si vous préférez lire du code, ce JavaScript pourrait être une excellente alternative à la lecture de notre documentation.

**Découvrez l'EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nœuds et clients {#nodes-and-clients}

Un client EthereumJS est en développement actif et vous permet d'approfondir le fonctionnement des clients Ethereum dans un langage que vous comprenez : JavaScript !

**Découvrez le client**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Autres projets {#other-projects}

Il se passe également beaucoup d'autres choses dans le monde du JavaScript sur Ethereum, notamment :

- des bibliothèques d'utilitaires de portefeuille.
- des outils pour générer, importer et exporter des clés Ethereum.
- une implémentation du `merkle-patricia-tree` – une structure de données décrite dans le livre jaune d'Ethereum.

Plongez dans ce qui vous intéresse le plus sur le [dépôt EthereumJS](https://github.com/ethereumjs)

## Lectures complémentaires {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_