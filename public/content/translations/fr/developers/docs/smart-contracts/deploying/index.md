---
title: "Déployer des contrat intelligents"
description: "Apprenez à déployer des contrats intelligents sur les réseaux Ethereum, y compris les conditions préalables, les outils et les étapes de déploiement."
lang: fr
---

Vous devez déployer votre contrat intelligent afin qu'il soit disponible pour les utilisateurs sur un réseau Ethereum.

Pour déployer un contrat intelligent, il vous suffit d'envoyer une transaction Ethereum contenant le code compilé du contrat intelligent sans spécifier de destinataire.

## Prérequis {#prerequisites}

Vous devriez comprendre les [réseaux Ethereum](/developers/docs/networks/), les [transactions](/developers/docs/transactions/) et l'[anatomie des contrats intelligents](/developers/docs/smart-contracts/anatomy/) avant de déployer des contrats intelligents.

Le déploiement d'un contrat coûte également de l'éther (ETH) puisqu'il est stocké sur la blockchain. Vous devriez donc être familiarisé avec [le gaz et les frais](/developers/docs/gas/) sur Ethereum.

Enfin, vous devrez compiler votre contrat avant de le déployer, alors assurez-vous d'avoir lu la documentation sur la [compilation des contrats intelligents](/developers/docs/smart-contracts/compiling/).

## Comment déployer un contrat intelligent {#how-to-deploy-a-smart-contract}

### Ce dont vous aurez besoin {#what-youll-need}

- Le bytecode de votre contrat – il est généré via la [compilation](/developers/docs/smart-contracts/compiling/)
- Des ethers pour le gaz. Vous fixerez votre limite de gaz comme pour les autres transactions, mais sachez que les déploiements de contrats nécessitent beaucoup plus de gaz qu'un simple transfert d'ethers.
- Un script de déploiement ou un plugin.
- un accès à un [nœud Ethereum](/developers/docs/nodes-and-clients/), soit en exécutant le vôtre, en vous connectant à un nœud public, ou via une clé API en utilisant un [service de nœud](/developers/docs/nodes-and-clients/nodes-as-a-service/)

### Étapes pour déployer un contrat intelligent {#steps-to-deploy}

Les étapes spécifiques dépendent du cadre de développement en question. Par exemple, vous pouvez consulter la [documentation de Hardhat sur le déploiement de vos contrats](https://hardhat.org/docs/tutorial/deploying) ou la [documentation de Foundry sur le déploiement et la vérification d'un contrat intelligent](https://book.getfoundry.sh/forge/deploying). Une fois déployé, votre contrat aura une adresse Ethereum comme les autres [comptes](/developers/docs/accounts/) et pourra être vérifié à l'aide d'[outils de vérification du code source](/developers/docs/smart-contracts/verifying/#source-code-verification-tools).

## Outils connexes {#related-tools}

**Remix - _L'IDE Remix permet le développement, le déploiement et l'administration de contrats intelligents pour des blockchains de type Ethereum_**

- [Remix](https://remix.ethereum.org)

**Tenderly - _Plateforme de développement Web3 qui fournit des outils de débogage, d'observabilité et des blocs de construction d'infrastructure pour le développement, le test, la surveillance et l'exploitation de contrats intelligents_**

- [tenderly.co](https://tenderly.co/)
- [Documentation](https://docs.tenderly.co/)
- [GitHub](https://github.com/Tenderly)
- [Discord](https://discord.gg/eCWjuvt)

**Hardhat - _Un environnement de développement pour compiler, déployer, tester et déboguer vos logiciels Ethereum_**

- [hardhat.org](https://hardhat.org/getting-started/)
- [Documentation sur le déploiement de vos contrats](https://hardhat.org/docs/tutorial/deploying)
- [GitHub](https://github.com/nomiclabs/hardhat)
- [Discord](https://discord.com/invite/TETZs2KK4k)

**thirdweb - _Déployez facilement n'importe quel contrat sur n'importe quelle chaîne compatible EVM, en utilisant une seule commande_**

- [Documentation](https://portal.thirdweb.com/deploy/)

**Crossmint - _Plateforme de développement Web3 de niveau entreprise pour déployer des contrats intelligents, activer les paiements par carte de crédit et inter-chaînes, et utiliser des API pour créer, distribuer, vendre, stocker et modifier des NFT._**

- [crossmint.com](https://www.crossmint.com)
- [Documentation](https://docs.crossmint.com)
- [Discord](https://discord.com/invite/crossmint)
- [Blog](https://blog.crossmint.com)

## Tutoriels connexes {#related-tutorials}

- [Déployer votre premier contrat intelligent](/developers/tutorials/deploying-your-first-smart-contract/) _– Une introduction au déploiement de votre premier contrat intelligent sur un réseau de test Ethereum._
- [Hello World | Tutoriel de contrat intelligent](/developers/tutorials/hello-world-smart-contract/) _– Un tutoriel facile à suivre pour créer et déployer un contrat intelligent de base sur Ethereum._
- [Interagir avec d'autres contrats depuis Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Comment déployer un contrat intelligent à partir d'un contrat existant et interagir avec lui._
- [Comment réduire la taille de votre contrat](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _- Comment réduire la taille de votre contrat pour le maintenir sous la limite et économiser du gaz_

## En savoir plus {#further-reading}

- [https://docs.openzeppelin.com/learn/deploying-and-interacting](https://docs.openzeppelin.com/learn/deploying-and-interacting) - _OpenZeppelin_
- [Déployer vos contrats avec Hardhat](https://hardhat.org/docs/tutorial/deploying) - _Nomic Labs_

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

## Sujets connexes {#related-topics}

- [Frameworks de développement](/developers/docs/frameworks/)
- [Exécuter un nœud Ethereum](/developers/docs/nodes-and-clients/run-a-node/)
- [Nœuds en tant que service](/developers/docs/nodes-and-clients/nodes-as-a-service)
