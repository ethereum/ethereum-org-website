---
title: Infrastructures de développement des dApps
description: Explorez les avantages des frameworks et comparez les options disponibles.
lang: fr
---

## Introduction aux frameworks {#introduction-to-frameworks}

La construction d'une dApp complète nécessite différentes technologies. Les infrastructures logiciels incluent de nombreuses fonctionnalités ou fournissent des systèmes de plugin pour choisir les outils que vous voulez.

Ces infrastructures sont livrés avec de nombreuses fonctionnalités prêtes à l'emploi :

- Fonctionnalités pour faire tourner une instance locale de la blockchain.
- Utilitaires pour compiler et tester vos contrats intelligents.
- Modules de développement client pour construire votre application orientée utilisateur
  au sein du même projet/référentiel.
- Configuration pour se connecter aux réseaux Ethereum et déployer
  des contrats, que ce soit sur une instance exécutée localement ou sur l'un
  des réseaux publics d'Ethereum.
- Distribution d'applications décentralisées : intégrations avec des options de
  stockage comme IPFS.

## Prérequis {#prerequisites}

Avant de plonger dans les frameworks, nous vous recommandons de lire d'abord notre introduction aux [dapps](/developers/docs/dapps/) et à la [pile Ethereum](/developers/docs/ethereum-stack/).

## Frameworks disponibles {#available-frameworks}

**Foundry** - **_Foundry est une boîte à outils ultra-rapide, portable et modulaire pour le développement d'applications Ethereum_**

- [Installer Foundry](https://book.getfoundry.sh/)
- [Livre Foundry](https://book.getfoundry.sh/)
- [Chat de la communauté Foundry sur Telegram](https://t.me/foundry_support)
- [Awesome Foundry](https://github.com/crisgarner/awesome-foundry)

**Hardhat -** **_Environnement de développement Ethereum pour les professionnels._**

- [hardhat.org](https://hardhat.org)
- [GitHub](https://github.com/nomiclabs/hardhat)

**Ape -** **_L'outil de développement de contrats intelligents pour les pythonistes, les data scientists et les professionnels de la sécurité._**

- [Documentation](https://docs.apeworx.io/ape/stable/)
- [GitHub](https://github.com/ApeWorX/ape)

**Web3j -** **_Une plateforme pour développer des applications blockchain sur la JVM._**

- [Page d'accueil](https://www.web3labs.com/web3j-sdk)
- [Documentation](https://docs.web3j.io)
- [GitHub](https://github.com/web3j/web3j)

**ethers-kt -** **_Bibliothèque Kotlin/Java/Android asynchrone et très performante pour les blockchains basées sur l'EVM._**

- [GitHub](https://github.com/Kr1ptal/ethers-kt)
- [Exemples](https://github.com/Kr1ptal/ethers-kt/tree/master/examples)
- [Discord](https://discord.gg/rx35NzQGSb)

**Create Eth App -** **_Créez des applications alimentées par Ethereum avec une seule commande. Fournit un panel d'infrastructures d'interface utilisateur et des modèles DeFi parmi lesquels faire votre choix._**

- [GitHub](https://github.com/paulrberg/create-eth-app)
- [Modèles](https://github.com/PaulRBerg/create-eth-app/tree/develop/templates)

**Scaffold-Eth -** **_Ethers.js + Hardhat + composants et hooks React pour le web3 : tout ce dont vous avez besoin pour commencer à créer des applications décentralisées basées sur des contrats intelligents._**

- [GitHub](https://github.com/scaffold-eth/scaffold-eth-2)

**Tenderly -** **_Plateforme de développement Web3 qui permet aux développeurs blockchain de créer, tester, déboguer, surveiller et exploiter des contrats intelligents et d'améliorer l'UX des dapps._**

- [Site Web](https://tenderly.co/)
- [Documentation](https://docs.tenderly.co/)

**The Graph -** **_The Graph pour interroger efficacement les données de la blockchain._**

- [Site Web](https://thegraph.com/)
- [Tutoriel](/developers/tutorials/the-graph-fixing-web3-data-querying/)

**Alchemy -** **_Plateforme de développement Ethereum._**

- [alchemy.com](https://www.alchemy.com/)
- [GitHub](https://github.com/alchemyplatform)
- [Discord](https://discord.com/invite/alchemyplatform)

**NodeReal -** **_Plateforme de développement Ethereum._**

- [Nodereal.io](https://nodereal.io/)
- [GitHub](https://github.com/node-real)
- [Discord](https://discord.gg/V5k5gsuE)

**thirdweb SDK -** **_Créez des applications web3 qui peuvent interagir avec vos contrats intelligents à l'aide de nos puissants SDK et CLI._**

- [Documentation](https://portal.thirdweb.com/sdk/)
- [GitHub](https://github.com/thirdweb-dev/)

**Chainstack -** **_Plateforme de développement Web3 (Ethereum et autres)._**

- [chainstack.com](https://www.chainstack.com/)
- [GitHub](https://github.com/chainstack)
- [Discord](https://discord.gg/BSb5zfp9AT)

**Crossmint -** **_Plateforme de développement web3 de niveau entreprise, qui vous permet de créer des applications NFT sur toutes les principales chaînes EVM (et autres)._**

- [Site Web](https://www.crossmint.com)
- [Documentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)

**Brownie -** **_Environnement de développement et framework de test basé sur Python._**

- [Documentation](https://eth-brownie.readthedocs.io/en/latest/)
- [GitHub](https://github.com/eth-brownie/brownie)
- **Brownie n'est plus développé actuellement**

**OpenZeppelin SDK -** **_La boîte à outils ultime pour contrats intelligents : une suite d'outils pour vous aider à développer, compiler, mettre à jour, déployer et interagir avec des contrats intelligents._**

- [OpenZeppelin Defender SDK](https://docs.openzeppelin.com/defender/sdk)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-sdk)
- [Forum de la communauté](https://forum.openzeppelin.com/c/support/17)
- **Le développement de OpenZeppelin SDK a été arrêté**

**Catapulta -** **_Outil de déploiement de contrats intelligents multi-chaînes, automatise les vérifications dans les explorateurs de blocs, assure le suivi des contrats intelligents déployés et partage les rapports de déploiement, plug-and-play pour les projets Foundry et Hardhat._**

- [Site Web](https://catapulta.sh/)
- [Documentation](https://catapulta.sh/docs)
- [GitHub](https://github.com/catapulta-sh)

**GoldRush (par Covalent) -** **_GoldRush propose la suite d'API de données blockchain la plus complète pour les développeurs, les analystes et les entreprises. Que vous construisiez un tableau de bord DeFi, un portefeuille, un robot de trading, un agent d'IA ou une plateforme de conformité, les API de données fournissent un accès rapide, précis et convivial pour les développeurs aux données essentielles en chaîne dont vous avez besoin_**

- [Site Web](https://goldrush.dev/)
- [Documentation](https://goldrush.dev/docs/chains/ethereum)
- [GitHub](https://github.com/covalenthq)
- [Discord](https://www.covalenthq.com/discord/)

**Wake -** **_Framework Python tout-en-un pour le test de contrats, le fuzzing, le déploiement, l'analyse de vulnérabilités et la navigation dans le code._**

- [Page d'accueil](https://getwake.io/)
- [Documentation](https://ackeeblockchain.com/wake/docs/latest/)
- [GitHub](https://github.com/Ackee-Blockchain/wake)
- [Extension VS Code](https://marketplace.visualstudio.com/items?itemName=AckeeBlockchain.tools-for-solidity)

**Veramo -** **_Framework open source, modulaire et agnostique qui permet aux développeurs d'applications décentralisées d'intégrer facilement des identités décentralisées et des justificatifs vérifiables dans leurs applications._**

- [Page d'accueil](https://veramo.io/)
- [Documentation](https://veramo.io/docs/basics/introduction)
- [GitHub](https://github.com/uport-project/veramo)
- [Discord](https://discord.com/invite/FRRBdjemHV)
- [Paquet NPM](https://www.npmjs.com/package/@veramo/core)

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Configurer un environnement de développement local](/developers/local-environment/)
