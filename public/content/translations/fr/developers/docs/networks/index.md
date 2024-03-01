---
title: Réseaux
description: Une vue d'ensemble des réseaux Ethereum et où obtenir de l'ether de réseau de test (ETH) pour tester votre application.
lang: fr
---

Les réseaux Ethereum sont des groupes d'ordinateurs connectés qui communiquent à l'aide du protocole Ethereum. Il n'existe qu'un seul réseau principal Ethereum, mais des réseaux indépendants conformes aux mêmes règles de protocole peuvent être créés à des fins de test et de développement. Il existe de nombreux « réseaux » indépendants qui se conforment au protocole sans interagir les uns avec les autres. Vous pouvez même en lancer un localement sur votre propre ordinateur pour tester vos contrats intelligents et vos applications web3.

Votre compte Ethereum fonctionnera sur les différents réseaux, mais le solde de votre compte et votre historique de transactions ne seront pas transférés du réseau Ethereum principal. Pour les tests, il est utile de connaître les réseaux disponibles et la façon d'obtenir de l'ETH de test pour pouvoir vous amuser avec. En général, pour des raisons de sécurité, il n'est pas recommandé de réutiliser les comptes principaux sur les réseaux de test ou vice versa.

## Prérequis {#prerequisites}

Vous devez comprendre les [bases d'Ethereum](/developers/docs/intro-to-ethereum/) avant de lire des informations sur les différents réseaux, car les réseaux de test vous donneront une version bon marché et sûre d'Ethereum avec laquelle vous pourrez vous amuser.

## Réseaux public {#public-networks}

Les réseaux publics sont accessibles à toute personne disposant d'une connexion Internet, partout dans le monde. N'importe qui peut lire ou créer des transactions sur une blockchain publique, et valider les transactions exécutées. Le consensus établi entre les pairs décide de l'inclusion des transactions et de l'état du réseau.

### Réseau principal Ethereum {#ethereum-mainnet}

Le réseau principal Ethereum est la blockchain publique primaire de production, où des transactions de valeur réelle se produisent sur le registre distribué.

Quand on discute des prix de l'ETH dans les échanges, on fait référence à l'ETH du réseau principal.

### Réseaux de test Ethereum {#ethereum-testnets}

En plus du réseau principal, il existe des réseaux de test publics. Il s'agit de réseaux utilisés par les développeurs de protocoles ou de contrats intelligents pour tester, dans un environnement de production, à la fois les mises à niveau de protocoles et les contrats intelligents avant leur déploiement sur le réseau principal. Considérez cela comme une analogie entre les serveurs de production et les serveurs d'essai.

Vous devriez tester tout code de contrat que vous écrivez sur un réseau de test avant de le déployer sur le réseau principal. Parmi les dApps qui s'intègrent aux contrats intelligents existants, la plupart des projets ont des copies déployées sur des réseaux de test.

La plupart des réseaux de test ont commencé par utiliser le mécanisme de consensus de preuve d'autorité. Cela signifie qu'un petit nombre de nœuds sont choisis pour valider les transactions et créer des blocs, en mettant en jeu leur identité dans le processus. Alternativement, certains réseaux de test proposent un mécanisme de consensus ouvert, qui permet à tout le monde de tester un validateur, comme avec le réseau principal Ethereum.

L'ETH sur les réseaux de test est censé n'avoir aucune valeur réelle ; cependant, des marchés ont été créés pour certains types d'ETH testnet qui sont devenus rares ou difficiles à obtenir. Étant donné que vous avez besoin d'ETH pour interagir avec Ethereum (même sur les testnets), la plupart des gens obtiennent l'ETH des testnets gratuitement via des robinets. La plupart des robinets sont des applications Web dans lesquelles vous saisissez l'adresse à laquelle vous demandez l'envoi d'ETH.

#### Quel réseau de test dois-je utiliser ?

Les deux réseaux de test publics que les développeurs de clients conservent actuellement sont Sepolia et Goerli. Sepolia est un réseau dédié aux développeurs de contrats et d'applications qui vise à tester leurs applications. Le réseau Goerli permet aux développeurs de protocoles de tester les mises à jour du réseau, et aux stalkers de tester les validateurs en cours d'exécution.

#### Sepolia {#sepolia}

**Sepolia est le réseau de test recommandé par défaut pour le développement d'applications.**. Le réseau Sepolia utilise un ensemble de validateurs autorisés. Il est assez nouveau, de sorte que son état et son historique sont tous deux assez restreints. Cela signifie que le réseau est rapide à synchroniser et que l'exécution d'un nœud en son sein nécessite moins de stockage. Ceci est utile pour les utilisateurs désireux de faire tourner un nœud rapidement et d'interagir directement avec le réseau.

- Ensemble de validateurs fermés, contrôlé par le client & équipes de test
- Nouveau réseau de test, moins d'applications déployées que sur d'autres réseaus de tests
- La synchronisation rapide et le fonctionnement d'un nœud nécessitent un espace disque minimal

##### Ressources

- [Site Web](https://sepolia.dev/)
- [GitHub](https://github.com/eth-clients/sepolia)
- [Otterscan](https://sepolia.otterscan.io/)
- [Etherscan](https://sepolia.etherscan.io)

##### Robinets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Robinet PoW](https://sepolia-faucet.pk910.de/)
- [Coinbase Wallet Faucet | Sepolia](https://coinbase.com/faucets/ethereum-sepolia-faucet)
- [Alchemy Sepolia faucet](https://sepoliafaucet.com/)
- [Infura Sepolia faucet](https://www.infura.io/faucet)
- [Robinet Sepolia Chainstack](https://faucet.chainstack.com/sepolia-faucet)
- [Robinet pour le réseau de test Sepolia](https://testnet-faucet.com/sepolia/)

#### Goerli _(support à long terme)_ {#goerli}

_Remarque : [le réseau de test Goerli est obsolète](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17) et sera remplacé par [Holesovice](https://github.com/eth-clients/holesovice) en 2023. Veuillez envisager de migrer vos applications vers Sepolia._

Goerli est un réseau de test qui permet de tester, de valider et de mettre en jeu. Le réseau Goerli est ouvert aux utilisateurs souhaitant exécuter un validateur de réseau de test. Les utilisateurs désireux de tester les mises à jour de protocoles avant de les déployer sur le réseau principal sont donc invités à utiliser Goerli.

- Ensemble de validateurs ouvert, les validateurs peuvent tester les mises à jour du réseau
- État diversifié, utile pour tester les interactions des contrats intelligents complexes
- Plus long à synchroniser et nécessite plus de stockage pour exécuter un nœud

##### Ressources

- [Site Web](https://goerli.net/)
- [GitHub](https://github.com/eth-clients/goerli)
- [Etherscan](https://goerli.etherscan.io)

##### Robinets

- [QuickNode Sepolia Faucet](https://faucet.quicknode.com/drip)
- [Grabteeth](https://grabteeth.xyz/)
- [Robinet PoW](https://goerli-faucet.pk910.de/)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)
- [Robinet Alchemy Goerli](https://goerlifaucet.com/)
- [Robinet All That Node Goerli](https://www.allthatnode.com/faucet/ethereum.dsrv)
- [Coinbase Wallet Faucet | Goerli](https://coinbase.com/faucets/ethereum-goerli-faucet)
- [Robinet Goerli Chainstack](https://faucet.chainstack.com/goerli-faucet)

Pour lancer un validateur sur le réseau de test Goerli, utilisez la [plateforme de lancement "validateur goerli bon marché"](https://goerli.launchpad.ethstaker.cc/en/) d'ethstaker.

### Réseaux de test de Couche 2 {#layer-2-testnets}

[La couche 2 (Layer 2 - L2)](/layer-2/) est un terme collectif pour désigner un ensemble spécifique de solutions aptes à faire évoluer Ethereum. Une couche 2 est une blockchaià part entière qui prolonge Ethereum et hérite des garanties de sécurité d'Ethereum. Les réseaux de test de couche 2 sont généralement étroitement couplés aux réseaux publics de test Ethereum.

#### Arbitrum Goerli {#arbitrum-goerli}

Un réseau de test pour [Arbitrum](https://arbitrum.io/).

##### Robinets

- [Robinet Chainlink](https://faucets.chain.link/)

#### Optimistic Goerli {#optimistic-goerli}

Réseau de test pour [Optimism](https://www.optimism.io/).

##### Robinets

- [Robinet Paradigm](https://faucet.paradigm.xyz/)
- [Coinbase Wallet Faucet | Optimism Goerli](https://coinbase.com/faucets/optimism-goerli-faucet)

#### Starknet Goerli {#starknet-goerli}

Un réseau de test pour [Starknet](https://www.starknet.io).

##### Robinets

- [Robinet Starknet](https://faucet.goerli.starknet.io)

## Réseaux privés {#private-networks}

Un réseau Ethereum est un réseau privé si ses nœuds ne sont pas connectés à un réseau public (à savoir réseau principal ou réseau de test). Dans ce contexte, « privé » signifie « réservé » ou « isolé », plutôt que « protégé » ou « sécurisé ».

### Réseaux de développement {#development-networks}

Pour développer une application Ethereum, exécutez-la sur un réseau privé pour vérifier son bon fonctionnement avant de la déployer. De la même façon que vous exécuteriez un serveur local sur votre ordinateur pour du développement Web, vous pouvez créer une occurrence de blockchain locale pour tester votre application décentralisée (dApp). Cela permet une itération beaucoup plus rapide que sur un réseau de test public.

Il existe des projets et des outils dédiés pour vous aider dans cette tâche. En savoir plus sur les [réseaux de développement](/developers/docs/development-networks/).

### Réseaux de consortium {#consortium-networks}

Le processus de consensus est contrôlé par un ensemble prédéfini de nœuds de confiance. Ce peut être un réseau privé d'institutions universitaires connues régissant chacune un seul nœud, où les blocs sont validés par un seuil de signataires au sein du réseau.

Si le réseau public Ethereum peut être assimilé à l'Internet public, vous pouvez considérer un réseau de consortium comme un intranet privé.

## Outils connexes {#related-tools}

- [Chainlist](https://chainlist.org/) _liste de réseaux EVM pour connecter les portefeuilles et les fournisseurs aux ID de chaîne et de réseau appropriés_
- [Chaînes basées sur l'EVM](https://github.com/ethereum-lists/chains) _répertoire GitHub des chaînes de métadonnées qui alimentent la Chainlist_

## Complément d'information {#further-reading}

- [Proposition : Cycle de vie prévisible du réseau de test Ethereum](https://ethereum-magicians.org/t/proposal-predictable-ethereum-testnet-lifecycle/11575/17)
- [L'évolution des réseaux de test Ethereum](https://etherworld.co/2022/08/19/the-evolution-of-ethereum-testnet/)
