---
title: Introduction technique aux dapps
description:
lang: fr
---

Une application décentralisée (dapp) est une application construite sur un réseau décentralisé qui combine un [contrat intelligent](/developers/docs/smart-contracts/) et une interface utilisateur front-end. Sur [Ethereum](/), les contrats intelligents sont accessibles et transparents – comme des API ouvertes – de sorte que votre dapp peut même inclure un contrat intelligent que quelqu'un d'autre a écrit.

## Prérequis {#prerequisites}

Avant d'en apprendre davantage sur les dapps, vous devriez couvrir les [bases de la chaîne de blocs](/developers/docs/intro-to-ethereum/) et vous renseigner sur le réseau Ethereum et la façon dont il est décentralisé.

## Définition d'une dapp {#definition-of-a-dapp}

Le code back-end d'une dapp s'exécute sur un réseau pair à pair décentralisé. Comparez cela à une application dont le code back-end s'exécute sur des serveurs centralisés.

Une dapp peut avoir un code front-end et des interfaces utilisateur écrits dans n'importe quel langage (tout comme une application) pour effectuer des appels vers son back-end. De plus, son front-end peut être hébergé sur un stockage décentralisé tel qu'[IPFS](https://ipfs.io/).

- **Décentralisé** - les dapps fonctionnent sur Ethereum, une plateforme publique ouverte et décentralisée où aucune personne ni aucun groupe n'a le contrôle
- **Déterministe** - les dapps remplissent la même fonction quel que soit l'environnement dans lequel elles sont exécutées
- **Turing-complet** - les dapps peuvent effectuer n'importe quelle action si elles disposent des ressources requises
- **Isolé** - les dapps sont exécutées dans un environnement virtuel connu sous le nom de Machine Virtuelle Ethereum (EVM), de sorte que si le contrat intelligent présente un bogue, cela n'entravera pas le fonctionnement normal du réseau de la chaîne de blocs

### À propos des contrats intelligents {#on-smart-contracts}

Pour présenter les dapps, nous devons introduire les contrats intelligents – le back-end d'une dapp, faute d'un meilleur terme. Pour un aperçu détaillé, rendez-vous dans notre section sur les [contrats intelligents](/developers/docs/smart-contracts/).

Un contrat intelligent est un code qui réside sur la chaîne de blocs Ethereum et s'exécute exactement comme il a été programmé. Une fois les contrats intelligents déployés sur le réseau, vous ne pouvez plus les modifier. Les dapps peuvent être décentralisées car elles sont contrôlées par la logique écrite dans le contrat, et non par un individu ou une entreprise. Cela signifie également que vous devez concevoir vos contrats très soigneusement et les tester de manière approfondie.

## Avantages du développement de dapps {#benefits-of-dapp-development}

- **Aucun temps d'arrêt** – Une fois le contrat intelligent déployé sur la chaîne de blocs, le réseau dans son ensemble sera toujours en mesure de servir les clients cherchant à interagir avec le contrat. Les acteurs malveillants ne peuvent donc pas lancer d'attaques par déni de service ciblées contre des dapps individuelles.
- **Confidentialité** – Vous n'avez pas besoin de fournir votre identité réelle pour déployer ou interagir avec une dapp.
- **Résistance à la censure** – Aucune entité unique sur le réseau ne peut empêcher les utilisateurs de soumettre des transactions, de déployer des dapps ou de lire des données à partir de la chaîne de blocs.
- **Intégrité totale des données** – Les données stockées sur la chaîne de blocs sont immuables et indiscutables, grâce aux primitives cryptographiques. Les acteurs malveillants ne peuvent pas falsifier des transactions ou d'autres données qui ont déjà été rendues publiques.
- **Calcul sans tiers de confiance/comportement vérifiable** – Les contrats intelligents peuvent être analysés et sont garantis de s'exécuter de manière prévisible, sans qu'il soit nécessaire de faire confiance à une autorité centrale. Ce n'est pas le cas dans les modèles traditionnels ; par exemple, lorsque nous utilisons des systèmes bancaires en ligne, nous devons faire confiance aux institutions financières pour qu'elles n'utilisent pas nos données financières à mauvais escient, ne falsifient pas les dossiers ou ne se fassent pas pirater.

## Inconvénients du développement de dapps {#drawbacks-of-dapp-development}

- **Maintenance** – Les dapps peuvent être plus difficiles à maintenir car le code et les données publiés sur la chaîne de blocs sont plus difficiles à modifier. Il est difficile pour les développeurs d'apporter des mises à jour à leurs dapps (ou aux données sous-jacentes stockées par une dapp) une fois qu'elles sont déployées, même si des bogues ou des risques de sécurité sont identifiés dans une ancienne version.
- **Surcharge de performance** – Il y a une énorme surcharge de performance, et la mise à l'échelle est vraiment difficile. Pour atteindre le niveau de sécurité, d'intégrité, de transparence et de fiabilité auquel Ethereum aspire, chaque nœud exécute et stocke chaque transaction. De plus, le consensus par preuve d'enjeu (PoS) prend également du temps.
- **Congestion du réseau** – Lorsqu'une dapp utilise trop de ressources de calcul, l'ensemble du réseau est ralenti. Actuellement, le réseau ne peut traiter qu'environ 10 à 15 transactions par seconde ; si les transactions sont envoyées plus rapidement que cela, le pool de transactions non confirmées peut rapidement gonfler.
- **Expérience utilisateur** – Il peut être plus difficile de concevoir des expériences conviviales car l'utilisateur final moyen pourrait trouver trop difficile de configurer une pile d'outils nécessaire pour interagir avec la chaîne de blocs de manière véritablement sécurisée.
- **Centralisation** – Les solutions conviviales pour les utilisateurs et les développeurs construites au-dessus de la couche de base d'Ethereum pourraient finir par ressembler à des services centralisés de toute façon. Par exemple, de tels services peuvent stocker des clés ou d'autres informations sensibles côté serveur, servir un front-end à l'aide d'un serveur centralisé, ou exécuter une logique métier importante sur un serveur centralisé avant d'écrire sur la chaîne de blocs. La centralisation élimine bon nombre (sinon la totalité) des avantages de la chaîne de blocs par rapport au modèle traditionnel.

## Vous préférez un support visuel ? {#visual-learner}

<VideoWatch slug="what-is-a-dapp" />

## Outils pour créer des dapps {#dapp-tools}

**Scaffold-ETH _- Expérimentez rapidement avec Solidity en utilisant un front-end qui s'adapte à votre contrat intelligent._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)
- [Exemple de dapp](https://punkwallet.io/)

**Create Eth App _- Créez des applications propulsées par Ethereum avec une seule commande._**

- [GitHub](https://github.com/paulrberg/create-eth-app)

**One Click Dapp _- Outil FOSS pour générer des front-ends de dapp à partir d'une [ABI](/glossary/#abi)._**

- [oneclickdapp.com](https://oneclickdapp.com)
- [GitHub](https://github.com/oneclickdapp/oneclickdapp-v1)

**Etherflow _- Outil FOSS pour les développeurs Ethereum afin de tester leur nœud, et de composer et déboguer des appels RPC depuis le navigateur._**

- [etherflow.quiknode.io](https://etherflow.quiknode.io/)
- [GitHub](https://github.com/abunsen/etherflow)

**thirdweb _- SDK dans tous les langages, contrats intelligents, outils et infrastructure pour le développement Web3._**

- [Page d'accueil](https://thirdweb.com/)
- [Documentation](https://portal.thirdweb.com/)
- [GitHub](https://github.com/thirdweb-dev/)

**Crossmint _- Plateforme de développement Web3 de niveau entreprise pour déployer des contrats intelligents, activer les paiements par carte de crédit et inter-chaînes, et utiliser des API pour créer, distribuer, vendre, stocker et modifier des NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

## Lectures complémentaires {#further-reading}

- [Explorer les dapps](/apps)
- [L'architecture d'une application Web 3.0](https://www.preethikasireddy.com/post/the-architecture-of-a-web-3-0-application) - _Preethi Kasireddy_
- [Un guide 2021 des applications décentralisées](https://limechain.tech/blog/what-are-dapps-the-2021-guide/) - _LimeChain_
- [Que sont les applications décentralisées ?](https://www.gemini.com/cryptopedia/decentralized-applications-defi-dapps) - _Gemini_
- [Dapps populaires](https://www.alchemy.com/dapps) - _Alchemy_

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Introduction à la pile Ethereum](/developers/docs/ethereum-stack/)
- [Frameworks de développement](/developers/docs/frameworks/)

## Tutoriels : Créer des applications et des front-ends sur Ethereum {#tutorials}

- [Parcours du contrat Uniswap-v2](/developers/tutorials/uniswap-v2-annotated-code/) _– Un parcours annoté des contrats de base d'Uniswap v2 expliquant le fonctionnement du teneur de marché automatisé (AMM)._
- [Créer une interface utilisateur pour votre contrat](/developers/tutorials/creating-a-wagmi-ui-for-your-contract/) _– Comment créer un front-end moderne React + Wagmi qui se connecte à votre contrat intelligent._
- [Contrat intelligent Hello World pour les débutants – Fullstack](/developers/tutorials/hello-world-smart-contract-fullstack/) _– Tutoriel de bout en bout : écrire, déployer et créer un front-end pour un contrat intelligent simple._
- [Composants serveur et agents pour les applications Web3](/developers/tutorials/server-components/) _– Comment écrire des composants serveur TypeScript qui écoutent les événements de la chaîne de blocs et répondent par des transactions._
- [IPFS pour les interfaces utilisateur décentralisées](/developers/tutorials/ipfs-decentralized-ui/) _– Comment héberger le front-end de votre dapp sur IPFS pour résister à la censure._