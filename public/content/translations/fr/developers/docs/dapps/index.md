---
title: Introduction technique aux dApps (applications décentralisées)
description:
lang: fr
---

Une application décentralisée (dapp) est une application construite sur un réseau décentralisé qui combine un [contrat intelligent](/developers/docs/smart-contracts/) et une interface utilisateur frontend. Notez que les contrats intelligents Ethereum sont accessibles et transparents, comme les API ouvertes, de sorte que votre dApp peut même inclure un contrat intelligent que quelqu'un d'autre a rédigé.

## Prérequis {#prerequisites}

Avant d'en apprendre plus sur les dapps, vous devriez couvrir les [bases de la blockchain](/developers/docs/intro-to-ethereum/) et vous informer sur le réseau Ethereum et la façon dont il est décentralisé.

## Définition d'une dapp {#definition-of-a-dapp}

Une dApp a son code backend qui s'exécute sur un réseau décentralisé P2P, contrairement aux applications traditionnelles, dont le code du backend est executé sur des serveurs centralisés.

Une dApp peut comporter du code frontend et des interfaces utilisateur rédigées dans n'importe quelle langue (comme une application) qui peuvent passer des appels vers son backend. De plus, son frontend peut être hébergé sur un stockage décentralisé tel que [IPFS](https://ipfs.io/).

- **Décentralisé** - les dapps fonctionnent sur Ethereum, une plateforme publique, ouverte et décentralisée où aucune personne ou aucun groupe n'a le contrôle
- **Déterministe** - les dapps exécutent la même fonction quel que soit l'environnement dans lequel elles sont exécutées
- **Turing-complet** - les dapps peuvent exécuter n'importe quelle action à condition de disposer des ressources nécessaires
- **Isolé** - les dapps sont exécutées dans un environnement virtuel connu sous le nom de machine virtuelle Ethereum (EVM), de sorte que si le contrat intelligent contient un bogue, il n'entravera pas le fonctionnement normal du réseau blockchain

### Sur les contrats intelligents {#on-smart-contracts}

Pour présenter les dApps, nous devons tout d'abord présenter les contrats intelligents (qui sont des dApps du backend, à défaut d'un meilleur terme). Pour un aperçu détaillé, consultez notre section sur les [contrats intelligents](/developers/docs/smart-contracts/).

Un contrat intelligent est un code présent sur la blockchain Ethereum qui fonctionne exactement comme programmé. Une fois les contrats intelligents déployés sur le réseau, vous ne pouvez pas les modifier. Les dApps peuvent être décentralisées car elles sont contrôlées par la logique rédigée dans le contrat, pas par un individu ni une entreprise. Cela signifie que vous devez concevoir vos contrats très soigneusement et les tester de façon approfondie.

## Avantages du développement de dapps {#benefits-of-dapp-development}

- **Aucune interruption de service** – Une fois que le contrat intelligent est déployé sur la blockchain, le réseau dans son ensemble sera toujours en mesure de servir les clients qui cherchent à interagir avec le contrat. Les acteurs malveillants ne peuvent donc pas lancer d'attaques par déni de service ciblées sur les dApps.
- **Confidentialité** – Vous n'avez pas besoin de fournir une identité du monde réel pour déployer une dapp ou interagir avec elle.
- **Résistance à la censure** – Aucune entité unique sur le réseau ne peut empêcher les utilisateurs de soumettre des transactions, de déployer des dapps ou de lire des données de la blockchain.
- **Intégrité totale des données** – Les données stockées sur la blockchain sont immuables et indiscutables, grâce aux primitives cryptographiques. Les acteurs malveillants ne peuvent pas falsifier des transactions ni d'autres données qui ont déjà été rendues publiques.
- **Calcul sans confiance/comportement vérifiable** – Les contrats intelligents peuvent être analysés et leur exécution est garantie de manière prévisible, sans qu'il soit nécessaire de faire confiance à une autorité centrale. Ce n'est pas le cas dans les modèles financiers traditionnels. Par exemple, lorsque nous utilisons des systèmes bancaires en ligne, nous devons avoir confiance dans le fait que les institutions financières n'utiliseront pas nos données financières à mauvais escient, ne falsifieront pas les documents et ne seront pas piratées.

## Inconvénients du développement de dapps {#drawbacks-of-dapp-development}

- **Maintenance** – Les dapps peuvent être plus difficiles à maintenir, car le code et les données publiés sur la blockchain sont plus difficiles à modifier. Il est difficile pour les développeurs de mettre à jour leurs dApps (ou les données sous-jacentes stockées par une dApp) une fois celles-ci déployées , même si des bogues ou des risques de sécurité ont été identifiés dans une version antérieure.
- **Surcharge de performance** – Il y a une énorme surcharge de performance, et la mise à l'échelle est très difficile. Pour atteindre le niveau de sécurité, d'intégrité, de transparence et de fiabilité auquel Ethereum aspire, chaque nœud exécute et stocke chaque transactions. En plus de cela, il faut du temps pour parvenir à un consensus par preuve d'enjeu.
- **Congestion du réseau** – Lorsqu'une dapp utilise trop de ressources de calcul, l'ensemble du réseau est engorgé. Actuellement, le réseau ne peut traiter qu'une dizaine de transactions par seconde. Si les transactions sont envoyées plus rapidement que cela, le groupe de transactions non confirmées peut rapidement augmenter.
- **Expérience utilisateur** – Il peut être plus difficile de concevoir des expériences conviviales, car l'utilisateur final moyen pourrait trouver trop difficile de mettre en place la pile d'outils nécessaire pour interagir avec la blockchain d'une manière vraiment sécurisée.
- **Centralisation** – Les solutions conviviales pour les utilisateurs et les développeurs, construites sur la couche de base d'Ethereum, pourraient de toute façon finir par ressembler à des services centralisés. Par exemple, de tels services peuvent stocker des clés ou d'autres informations sensibles côté serveur, servir un frontend en utilisant un serveur centralisé ou exécutez une logique commerciale importante sur un serveur centralisé avant d'écrire dans la blockchain. La centralisation élimine de nombreux avantages de la blockchain (voir tous) par rapport au modèle traditionnel.

## Davantage qu'un apprenant visuel ? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Outils pour créer des dapps {#dapp-tools}

**Scaffold-ETH _- Expérimentez rapidement avec Solidity en utilisant un frontend qui s'adapte à votre contrat intelligent._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Exemple de dapp](https://punkwallet.io/)

**Create Eth App _- Créez des applications alimentées par Ethereum avec une seule commande._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Outil FOSS pour générer des frontends de dapp à partir d'une [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Outil FOSS pour les développeurs Ethereum pour tester leur nœud, et composer et déboguer les appels RPC depuis le navigateur._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- Des SDK dans tous les langages, des contrats intelligents, des outils et une infrastructure pour le développement web3._**

- [Page d'accueil](https://thirdweb.com/)
- [Documentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Plateforme de développement web3 de niveau entreprise pour déployer des contrats intelligents, permettre les paiements par carte de crédit et inter-chaînes, et utiliser des API pour créer, distribuer, vendre, stocker et modifier des NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## En savoir plus {#further-reading}

- [Explorer les dapps](/apps)
- [L'architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Un guide 2021 des applications décentralisées](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Que sont les applications décentralisées ?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populaires](https://www.alchemy.com/dapps) - _Alchemy_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Introduction à la pile Ethereum](/developers/docs/ethereum-stack/)
- [Frameworks de développement](/developers/docs/frameworks/)
