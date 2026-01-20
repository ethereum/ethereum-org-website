---
title: Ethereum pour les développeurs JavaScript
description: Apprendre à développer pour Ethereum avec des projets et des outils basés sur JavaScript.
lang: fr
---

JavaScript est l'un des langages les plus populaires de l'écosystème Ethereum. En fait, il existe une [équipe](https://github.com/ethereumjs) qui se consacre à porter autant d'Ethereum que possible sur JavaScript.

Il est possible d'écrire du JavaScript (ou un langage approchant) à [tous les niveaux de la pile](/developers/docs/ethereum-stack/).

## Interagir avec Ethereum {#interact-with-ethereum}

### Bibliothèques d'API JavaScript {#javascript-api-libraries}

Si vous souhaitez écrire du JavaScript pour interroger la blockchain, envoyer des transactions et plus encore, la façon la plus pratique est d'utiliser une [bibliothèque d'API JavaScript](/developers/docs/apis/javascript/). Ces API permettent aux développeurs d'interagir facilement avec les [nœuds du réseau Ethereum](/developers/docs/nodes-and-clients/).

Exploitez ces bibliothèques pour interagir avec des contrats intelligents sur Ethereum afin de pouvoir construire une DApp dans laquelle vous utilisez juste JavaScript pour interagir avec des contrats existants.

**Découvrez**

- [Web3.js](https://web3js.readthedocs.io)
- [Ethers.js](https://ethers.org) – _comprend l'implémentation d'un portefeuille Ethereum et des utilitaires en JavaScript et en TypeScript._
- [viem](https://viem.sh) – _une interface TypeScript pour Ethereum qui fournit des primitives de bas niveau sans état pour interagir avec Ethereum._
- [Drift](https://ryangoree.github.io/drift/) – _une méta-bibliothèque TypeScript avec mise en cache, hooks et mocks de test intégrés pour un développement Ethereum sans effort sur les bibliothèques web3._

### Contrats intelligents {#smart-contracts}

Si vous êtes un développeur JavaScript et que vous souhaitez écrire votre propre contrat intelligent, vous voudrez peut-être vous familiariser avec [Solidity](https://solidity.readthedocs.io). Il s'agit du langage de contrat intelligent le plus populaire et il est syntaxiquement similaire à JavaScript, ce qui peut en faciliter l'apprentissage.

En savoir plus sur les [contrats intelligents](/developers/docs/smart-contracts/).

## Comprendre le protocole {#understand-the-protocol}

### La Machine Virtuelle Ethereum {#the-ethereum-virtual-machine}

Il existe une implémentation JavaScript de la [machine virtuelle d'Ethereum](/developers/docs/evm/). Elle prend en charge les dernières règles concernant les fourches. Les règles de fourche sont les modifications apportées à l'EVM suite à de mises à niveau planifiées.

Il existe différents packages JavaScript que vous pouvez consulter pour mieux comprendre :

- Comptes
- Blocs
- Blockchain
- Transactions
- et plus encore...

Cela vous aidera à comprendre des concepts, comme la structure des données d'un compte.

Si vous préférez lire du code, ce extrait JavaScript peut être une excellente alternative à la lecture de notre documentation.

**Découvrez l'EVM**  
[`@ethereumjs/evm`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/evm)

### Nœuds et clients {#nodes-and-clients}

L'un des clients logiciels d'Ethereum se trouve actuellement en phase de test, vous permettant ainsi de découvrir le fonctionnement des clients de test d'Ethereum, dans un langage de programmation qui vous est propre : JavaScript !

**Découvrez le client**  
[`@ethereumjs/client`](https://github.com/ethereumjs/ethereumjs-monorepo/tree/master/packages/client)

## Autres projets {#other-projects}

Plein d'autres choses voient le jour au pays d'Ethereum JavaScript, y compris :

- des bibliothèques d'utilitaires pour les portefeuilles ;
- des outils pour générer, importer et exporter des clés Ethereum ;
- une implémentation du `merkle-patricia-tree` – une structure de données décrite dans le Livre jaune d'Ethereum.

Explorez ce qui vous intéresse le plus sur le [dépôt EthereumJS](https://github.com/ethereumjs)

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
