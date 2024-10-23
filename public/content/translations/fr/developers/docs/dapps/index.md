---
title: Introduction aux dApps
description:
lang: fr
---

Une application décentralisée (dApp) est une application construite sur un réseau décentralisé qui combine un [contrat intelligent](/developers/docs/smart-contracts/) et une interface utilisateur en frontend. Notez que les contrats intelligents Ethereum sont accessibles et transparents, comme les API ouvertes, de sorte que votre dApp peut même inclure un contrat intelligent que quelqu'un d'autre a rédigé.

## Prérequis {#prerequisites}

Avant d'en apprendre plus sur les dApps, vous devriez connaître les [bases de la blockchain](/developers/docs/intro-to-ethereum/) et vous informer sur le réseau Ethereum et la façon dont il est décentralisé.

## Définition d'une dApp {#definition-of-a-dapp}

Une dApp a son code backend qui s'exécute sur un réseau décentralisé P2P, contrairement aux applications traditionnelles, dont le code du backend est executé sur des serveurs centralisés.

Une dApp peut comporter du code frontend et des interfaces utilisateur rédigées dans n'importe quelle langue (comme une application) qui peuvent passer des appels vers son backend. De plus, son frontend peut être hébergé sur un système de stockage décentralisé comme [IPFS](https://ipfs.io/).

- **Décentralisé** - les dApps fonctionnent sur Ethereum, une plateforme publique décentralisée ouverte où personne ni aucun groupe n'a le contrôle
- **Déterministes** - les dApps exécutent la même fonction indépendamment de l'environnement où elles sont exécutées
- **Turing terminé** - les dApps peuvent exécuter n'importe quelle action au regard des ressources requises
- **Isolées** - les dApps s'exécutent dans un environnement virtuel connu sous le nom de Machine Virtuelle Ethereum (EVM en anglais) de sorte que si le contrat intelligent comporte un bogue, cela n'entravera pas le fonctionnement normal du réseau blockchain

### À propos des contrats intelligents {#on-smart-contracts}

Pour présenter les dApps, nous devons tout d'abord présenter les contrats intelligents (qui sont des dApps du backend, à défaut d'un meilleur terme). Pour une vue d'ensemble détaillée, rendez-vous dans notre section sur [Contrats intelligents](/developers/docs/smart-contracts/).

Un contrat intelligent est un code présent sur la blockchain Ethereum qui fonctionne exactement comme programmé. Une fois les contrats intelligents déployés sur le réseau, vous ne pouvez pas les modifier. Les dApps peuvent être décentralisées car elles sont contrôlées par la logique rédigée dans le contrat, pas par un individu ni une entreprise. Cela signifie que vous devez concevoir vos contrats très soigneusement et les tester de façon approfondie.

## Avantages du développement de dApps {#benefits-of-dapp-development}

- **Zéro temps d'arrêt** : une fois que le contrat intelligent au cœur d'une application est déployé et présent sur la blockchain, le réseau dans son ensemble sera toujours en mesure de servir les clients qui cherchent à interagir avec le contrat. Les acteurs malveillants ne peuvent donc pas lancer d'attaques par déni de service ciblées sur les dApps.
- **Confidentialité** : vous n'avez pas à fournir une identité réelle pour déployer ou interagir avec une dApp.
- **Résistance à la censure** : aucune entité du réseau ne peut empêcher les utilisateurs de soumettre des transactions, de déployer des dApps ou de lire des données de la blockchain.
- **Intégrité complète des données** : grâce à des procédés cryptographiques appelés « primitives cryptographiques », les données stockées sur la blockchain sont immuables et indiscutables. Les acteurs malveillants ne peuvent pas falsifier des transactions ni d'autres données qui ont déjà été rendues publiques.
- **Calcul trustless/comportement vérifiable** : les contrats intelligents peuvent être analysés et offrent la garantie d'une exécution prévisible sans avoir besoin de faire confiance à une autorité centrale. Ce n'est pas le cas dans les modèles financiers traditionnels. Par exemple, lorsque nous utilisons des systèmes bancaires en ligne, nous devons avoir confiance dans le fait que les institutions financières n'utiliseront pas nos données financières à mauvais escient, ne falsifieront pas les documents et ne seront pas piratées.

## Inconvénients du développement de dApps {#drawbacks-of-dapp-development}

- **Maintenance** : Les dApps peuvent être plus difficiles à maintenir car les données et le code publiés sur la blockchain sont plus difficiles à modifier. Il est difficile pour les développeurs de mettre à jour leurs dApps (ou les données sous-jacentes stockées par une dApp) une fois celles-ci déployées , même si des bogues ou des risques de sécurité ont été identifiés dans une version antérieure.
- **Impacts sur la performance** : Il y a d'énormes impacts sur la performance et l'évolutivité est vraiment difficile. Pour atteindre le niveau de sécurité, d'intégrité, de transparence et de fiabilité auquel Ethereum aspire, chaque nœud exécute et stocke chaque transactions. En plus de cela, il faut du temps pour parvenir à un consensus par preuve d'enjeu.
- **Congestion du réseau** : dans le modèle actuel, si une dApp utilise trop de ressources de calcul, l'ensemble du réseau est sauvegardé. Actuellement, le réseau ne peut traiter qu'une dizaine de transactions par seconde. Si les transactions sont envoyées plus rapidement que cela, le groupe de transactions non confirmées peut rapidement augmenter.
- **Expérience utilisateur** : il pourrait s'avérer plus difficile de concevoir des expériences conviviales. L'utilisateur moyen pourrait trouver trop difficile de mettre en place la pile d'outils nécessaire pour interagir avec la blockchain de façon réellement sécurisée.
- **Centralisation** : des solutions conviviales pour les utilisateurs et les développeurs basées sur la couche de base d'Ethereum pourraient ressembler à des services centralisés de toute façon. Par exemple, de tels services peuvent stocker des clés ou d'autres informations sensibles côté serveur, servir un frontend en utilisant un serveur centralisé ou exécutez une logique commerciale importante sur un serveur centralisé avant d'écrire dans la blockchain. La centralisation élimine de nombreux avantages de la blockchain (voir tous) par rapport au modèle traditionnel.

## En savoir plus via un apprenti visuel ? {#visual-learner}

<YouTube id="F50OrwV6Uk8" />

## Outils pour créer des dApps {#dapp-tools}

**Scaffold-ETH _- Expérimentez rapidement avec Solidity en utilisant un frontend qui s'adapte à votre contrat intelligent._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Exemple dApp](https://punkwallet.io/)

**Créez une App Eth _- Créez des applications sous Ethereum en une seule commande._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- outil FOSS pour générer des interfaces dapp en frontend à partir d'une [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Outil FOSS permettant aux développeurs Ethereum de tester leur nœud, et de composer et déboguer les appels RPC du navigateur._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDKs dans tous les langages, smart contrats, outils et infrastructure pour le développement web3._**

- [Page d'accueil](https://thirdweb.com/)
- [Documentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint - _ Plateforme de développement web3 de niveau entreprise pour déployer des contrats intelligents, permettre les paiements par carte de crédit et inter-chaîne, et utiliser des API pour créer, distribuer, vendre, stocker et modifier des NFT_**

- [crossmint.com](https://www.crossmint.com)
- [Documentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Complément d'information {#further-reading}

- [Explorez des applications décentralisées](/dapps)
- [L'Architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Le guide 2021 pour les applications décentralisées](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Qu'est-ce que les applications décentralisées ?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populaires](https://www.alchemy.com/dapps) - _Alchemy_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Introduction à la pile Ethereum](/developers/docs/ethereum-stack/)
- [Frameworks de développement](/developers/docs/frameworks/)
