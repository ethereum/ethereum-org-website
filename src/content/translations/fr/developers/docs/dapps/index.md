---
title: Introduction aux DApps
description:
lang: fr
sidebar: true
---

Une application décentralisée (DApp) est une application construite sur un réseau décentralisé qui combine un [contrat intelligent](/en/developers/docs/smart-contracts/) et une interface utilisateur en frontend. Notez que les contrats intelligents Ethereum sont accessibles et transparents, comme les API ouvertes, de sorte que votre DApp peut même inclure un contrat intelligent que quelqu'un d'autre a rédigé.

## Prérequis {#prerequisites}

Avant d'en apprendre plus sur les DApps, vous devriez connaître les [bases de la blockchain](/developers/docs/intro-to-ethereum/) et vous informer sur le réseau Ethereum et la façon dont il est décentralisé.

## Définition d'une DApp {#definition-of-a-dapp}

Une DApp a son code backend qui s'exécute sur un réseau décentralisé P2P, contrairement aux applications traditionnelles, dont le code du backend est executé sur des serveurs centralisés.

Une DApp peut comporter du code frontend et des interfaces utilisateur rédigées dans n'importe quelle langue (comme une application) qui peuvent passer des appels vers son backend. De plus, son frontend peut être hébergé sur un système de stockage décentralisé comme [IPFS](https://ipfs.io/).

- **Décentralisées** signifie que les DApps sont indépendantes et ne sont contrôlées par personne.
- **Déterministes**, c'est-à-dire qu'elles exécutent la même fonction indépendamment de l'environnement où elles sont exécutées.
- **Compatibles Turing**, ce qui signifie que si elles disposent des ressources nécessaires, les DApp peuvent effectuer n'importe quelle action.
- **Isolées**, ce qui signifie qu'elles sont exécutées dans un environnement virtuel connu sous le nom d'EVM (Ethereum Virtual Machine) de sorte que si le contrat intelligent comporte un bogue, cela n'entravera pas le fonctionnement normal du réseau blockchain.

### Contrats intelligents {#on-smart-contracts}

Pour présenter les DApps, nous devons tout d'abord présenter les contrats intelligents (qui sont des DApp backend, à défaut d'un meilleur terme). En savoir plus sur les [contrats intelligents](/en/developers/docs/smart-contracts/).

Un contrat intelligent est un code présent sur la blockchain Ethereum qui fonctionne exactement comme programmé. Une fois déployé sur le réseau, vous ne pouvez pas le modifier. Les DApps peuvent être décentralisées car elles sont contrôlées par la logique rédigée dans le contrat, pas par un individu ni une entreprise. Cela signifie que vous devez concevoir vos contrats très soigneusement et les tester de façon approfondie.

<!--Benefits and implications provided by Brian Gu)-->

## Avantages du développement de DApps {#benefits-of-dapp-development}

- **Zéro temps d'arrêt** : une fois que le contrat intelligent au cœur d'une application est déployé et présent sur la blockchain, le réseau dans son ensemble sera toujours en mesure de servir les clients qui cherchent à interagir avec le contrat. Les acteurs malveillants ne peuvent donc pas lancer d'attaques par déni de service ciblées sur les DApps.
- **Confidentialité** : vous n'avez pas à fournir une identité réelle pour déployer ou interagir avec une DApp.
- **Résistance à la censure** : aucune entité du réseau ne peut empêcher les utilisateurs de soumettre des transactions, de déployer des DApps ou de lire des données de la blockchain.
- **Intégrité complète des données** : grâce à des procédés cryptographiques appelés "primitives cryptographiques", les données stockées sur la blockchain sont immuables et indiscutables. Les acteurs malveillants ne peuvent pas falsifier des transactions ni d'autres données qui ont déjà été rendues publiques.
- **Calcul trustless/comportement vérifiable** : les contrats intelligents peuvent être analysés et offrent la garantie d'une exécution prévisible sans qu'il soit nécessaire de faire confiance à une autorité centrale. Ce n'est pas le cas dans les modèles financiers traditionnels. Par exemple, lorsque nous utilisons des systèmes bancaires en ligne, nous devons avoir confiance dans le fait que les institutions financières n'utiliseront pas nos données financières à mauvais escient, ne falsifieront pas les documents et ne seront pas piratées.

## Implications du développement de DApps {#implications-of-dapp-development}

<!-- - Transparency – transactions that trigger dapp functionality are public
- Open source
- Cost of storage – contracts are often only small percentages of the dapp. They are stored on-chain and this storage needs to be paid for, so it can be expensive.
 -->

- **Maintenance** : Les DApps peuvent être plus difficiles à maintenir car les données et le code publiés sur la blockchain sont plus difficiles à modifier. Il est difficile pour les développeurs de mettre à jour leurs DApps (ou les données sous-jacentes stockées par une DApp) une fois qu'elles sont déployées , même si des bogues ou des risques de sécurité sont identifiés dans une version antérieure.
- **Performances exigeantes et coûteuses** : Les exigences et les coûts pour atteindre les performances idéales sont très élevés et toute évolutivité est vraiment difficile. Pour atteindre le niveau de sécurité, d'intégrité, de transparence et de fiabilité auquel Ethereum aspire, chaque nœud exécute et stocke chaque transactions. En plus, la preuve de travail prend aussi du temps. Un rapide calcul permet d'estimer le surcoût à environ 1 000 000 fois celui du calcul standard actuel.
- **Congestion du réseau** : Dans le modèle actuel, si une DApp utilise trop de ressources de calcul, l'ensemble du réseau est sauvegardé. Actuellement, le réseau ne peut traiter qu'une dizaine de transactions par seconde. Si les transactions sont envoyées plus rapidement que cela, le groupe de transactions non confirmées peut rapidement augmenter.
- **Expérience utilisateur** : Il pourrait s'avérer plus difficile de concevoir des expériences conviviales. L'utilisateur moyen pourrait trouver trop difficile de mettre en place la pile d'outils nécessaire pour interagir avec la blockchain de façon réellement sécurisée.

  - **Centralisation** : Les solutions orientées utilisateurs et développeurs basées sur les premières couches d'Ethereum peuvent finir par ressembler à des services centralisés quoiqu'il arrive. Par exemple, ces services peuvent conserver des clés ou toutes autres données sensibles sur un serveur latéral, servir un frontend utilisant un serveur centralisé ou encore exécuter une importante logique métier sur un serveur centralisé avant de l'écrire sur la blockchain. Cela élimine de nombreux avantages de la blockchain (voire tous) par rapport au modèle traditionnel.<!-- ## Types of dapp

- Involving money
- Involving money and something else
- Other, including decentralized autonomous organizations

---==crwdHRulesLBB_2_BBsuleRHdwrc==

The application has to be open-source, operate autonomously, and can not be controlled by any one entity.
All data and record must be cryptographically stored in a public, decentralized blockchain.
The app must use a cryptographic token, also referred to as an App Coin, to access the application.
Tokens must be generated in order to prove the value nodes that contribute to the application.

---==crwdHRulesLBB_2_BBsuleRHdwrc==
-->## Outils pour DApp {#dapp-tools}


**One Click Dapp** **_- Outil FOSS pour générer des interfaces DApp à partir d'une ABI_**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/One-Click-Dapp/one-click-dApp)

**Etherflow** **_- Outil FOSS permettant aux développeurs Ethereum de tester leur nœud, et de composer et déboguer les appels RPC du navigateur._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets associés {#related-topics}

- [Introduction à la pile Ethereum](/en/developers/docs/ethereum-stack/)
- [Frameworks de développement](/en/developers/docs/frameworks/)
