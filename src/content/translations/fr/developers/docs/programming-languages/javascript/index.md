---
title: Ethereum pour les développeurs JavaScript
description: Apprendre à développer pour Ethereum avec des projets et des outils basés sur JavaScript.
lang: fr
---

JavaScript est l'un des langages les plus populaires de l'écosystème Ethereum. Il existe même une [équipe](https://github.com/ethereumjs) dont le but est de développer autant d'Ethereum que possible en JavaScript.

Il est possible de rédiger en JavaScript (ou en quelque chose d'approchant) à [tous les niveaux de la pile](/developers/docs/ethereum-stack/).

## Interagir avec Ethereum {#interact-with-ethereum}

### Bibliothèques d'API JavaScript {#javascript-api-libraries}

Si vous souhaitez rédiger du JavaScript pour interroger la blockchain, envoyer des transactions et plus encore, la façon la plus pratique est d'utiliser une [bibliothèque d'API JavaScript](/developers/docs/apis/javascript/). Ces API permettent aux développeurs d'interagir facilement avec les [nœuds du réseau Ethereum](/developers/docs/nodes-and-clients/).

Exploitez ces bibliothèques pour interagir avec des contrats intelligents sur Ethereum afin de pouvoir construire une DApp dans laquelle vous utilisez juste JavaScript pour interagir avec des contrats existants.

**N'hésitez pas à consulter les ressources suivantes :**

- [Web3.js](https://web3js.readthedocs.io/)
- [Ethers.js](https://docs.ethers.io/) _- Comprend l'implémentation d'un portefeuille Ethereum et des utilitaires en JavaScript et TypeScript._

### Contrats intelligents {#smart-contracts}

Si vous êtes un développeur JavaScript qui souhaite rédiger son propre contrat intelligent, nous vous conseillons de vous familiariser avec [Solidity](https://solidity.readthedocs.io). Il s'agit du langage de contrat intelligent le plus populaire et il est syntaxiquement similaire à JavaScript, ce qui peut en faciliter l'apprentissage.

Plus d'infos sur les [contrats intelligents](/developers/docs/smart-contracts/).

## Comprendre le protocole {#understand-the-protocol}

### La machine virtuelle Ethereum (EVM) {#the-ethereum-virtual-machine}

Il existe une implémentation JavaScript de la [machine virtuelle Ethereum](/developers/docs/evm/). Elle prend en charge les dernières règles concernant les fourches. Les règles de fourche sont les modifications apportées à l'EVM suite à de mises à niveau planifiées.

Il existe différents packages JavaScript que vous pouvez consulter pour mieux comprendre :

- Comptes
- Blocs
- Blockchain
- Transactions
- Et plus encore...

Cela vous aidera à comprendre des concepts, comme la structure des données d'un compte.

Si vous préférez lire du code, ce extrait JavaScript peut être une excellente alternative à la lecture de notre documentation.

**Jetez un œil au monorepo**  
[`ethereumjs`](https://github.com/ethereumjs/ethereumjs-vm)

### Nœuds et clients {#nodes-and-clients}

Il existe un client Ethereumjs en cours de développement. Cela vous permettra de découvrir comment les clients Ethereum fonctionnent dans un langage que vous comprenez.

**Jetez un œil au client**  
[`ethereumjs-client`](https://github.com/ethereumjs/ethereumjs-client)

## Autres projets {#other-projects}

Plein d'autres choses voient le jour au pays d'Ethereum JavaScript, y compris :

- des bibliothèques d'utilitaires pour les portefeuilles ;
- des outils pour générer, importer et exporter des clés Ethereum ;
- une implémentation du `merkle-patricia-tree`, une structure de données décrite dans le Livre jaune Ethereum.

Explorez ce qui vous intéresse le plus dans [EthereumJS](https://github.com/ethereumjs).

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
