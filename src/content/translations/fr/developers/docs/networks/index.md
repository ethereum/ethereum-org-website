---
title: Réseaux
description: Une vue d'ensemble des réseaux Ethereum et où obtenir de l'ether de réseau de test (ETH) pour tester votre application.
lang: fr
---

Ethereum étant un protocole, il peut exister plusieurs « réseaux » indépendants conformes à ce protocole, qui n'interagissent pas entre eux.

Les réseaux sont différents environnements Ethereum auxquels vous pouvez accéder pour du développement, du test ou une utilisation en production. Votre compte Ethereum fonctionnera sur les différents réseaux, mais le solde de votre compte et votre historique de transactions ne seront pas transférés du réseau Ethereum principal. Pour les tests, il est utile de savoir quels réseaux sont disponibles et comment obtenir de l'ETH de réseau de test pour pouvoir vous amuser avec.

## Prérequis {#prerequisites}

Vous devez comprendre les bases d'Ethereum avant de vous renseigner sur les différents réseaux, car les réseaux de test vous donneront une version bon marché et sûre d'Ethereum avec laquelle vous pourrez jouer. Commencez par lire la page [Introduction à Ethereum](/developers/docs/intro-to-ethereum/).

## Réseaux public {#public-networks}

Les réseaux publics sont accessibles à toute personne disposant d'une connexion Internet, partout dans le monde. N'importe qui peut lire ou créer des transactions sur une blockchain publique, et valider les transactions exécutées. L'accord sur les transactions et l'état du réseau est décidé par un consensus des pairs.

### réseau principal {#mainnet}

Le réseau principal Ethereum est la blockchain publique primaire de production, où des transactions de valeur réelle se produisent sur le registre distribué.

Quand on discute des prix de l'ETH dans les échanges, on fait référence à l'ETH du réseau principal.

### Réseaux de test {#testnets}

En plus du réseau principal, il existe des réseaux de test publics. Il s'agit de réseaux utilisés par les développeurs de protocoles ou de contrats intelligents pour tester, dans un environnement de production, à la fois les mises à niveau de protocoles et les contrats intelligents avant leur déploiement sur le réseau principal. Considérez cela comme une analogie entre les serveurs de production et les serveurs d'essai.

Il est généralement important de tester sur un réseau de test tout code de contrat que vous écrivez avant de le déployer sur le réseau principal. Si vous construisez une DApp qui intègre des contrats intelligents existants, la plupart des projets disposent de copies déployées sur les réseaux de test avec lesquels vous pouvez déjà interagir.

La plupart des réseaux de test utilisent un mécanisme de consensus de preuve d'autorité. Cela signifie qu'un petit nombre de nœuds sont choisis pour valider les transactions et créer des blocs, en mettant en jeu leur identité dans le processus. Il est difficile d'encourager le minage sur un réseau de test de preuve de travail qui peut le rendre vulnérable.

L'ETH des réseaux de test n'a pas de valeur réelle, il n'existe donc pas de marché pour celui-ci. Puisque vous avez besoin d'ETH pour interagir avec Ethereum, la plupart des utilisateurs obtiennent de l'ETH de réseau de test via des robinets. La plupart des robinets sont des applications Web dans lesquelles vous saisissez adresse à laquelle vous demandez l'envoi d'ETH.

#### Arbitrum Rinkeby {#arbitrum-rinkeby}

Un réseau de test pour [Arbitrum](https://arbitrum.io/).

##### Arbitrum Rinkeby faucets

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Chainlink](https://faucets.chain.link/)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)

#### Görli {#goerli}

Réseau de test de preuve d'autorité qui fonctionne entre les clients.

##### Robinets Görli

- [Robinet Görli](https://faucet.goerli.mudit.blog/)
- [Robinet Chainlink](https://faucets.chain.link/)
- [Alchemy Goerli Faucet](https://goerlifaucet.com/)

#### Kintsugi {#kintsugi}

Un réseau de test de fusion pour Ethereum.

##### Robinets Kintsugi

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Kintsugi](https://faucet.kintsugi.themerge.dev/)

#### Kovan {#kovan}

Réseau de test de preuve d'autorité pour ceux qui exécutent des clients OpenEthereum.

##### Robinet Kovan

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Kovan](https://faucet.kovan.network/)
- [Robinet Chainlink](https://faucets.chain.link/)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)

#### Optimistic Kovan {#optimistic-kovan}

Un réseau de test pour [Optimism](https://www.optimism.io/).

##### Robinets Optimistic Kovan

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)

#### Rinkeby {#rinkeby}

Réseau de test de preuve d'autorité pour ceux qui exécutent des clients Geth.

##### Robinets Rinkeby

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Alchemy](https://RinkebyFaucet.com)
- [Robinet Chainlink](https://faucets.chain.link/)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)
- [Robinet Rinkeby](https://faucet.rinkeby.io/)

#### Ropsten {#ropsten}

Réseau de test de preuve de travail. Cela signifie qu'il s'agit de la meilleure représentation d'Ethereum à l'identique.

##### Robinets Ropsten

- [FaucETH](https://fauceth.komputing.org)(Robinet multichaînes fonctionnant sans besoin d'un compte sur réseau social)
- [Robinet Paradigm](https://faucet.paradigm.xyz/)

## Réseaux privés {#private-networks}

Un réseau Ethereum est un réseau privé si ses nœuds ne sont pas connectés à un réseau public (c'est-à-dire Réseau principal ou un réseau de test). Dans ce contexte, « privé » signifie « réservé » ou « isolé », plutôt que « protégé » ou « sécurisé ».

### Réseaux de développement {#development-networks}

Quand vous développerez une application Ethereum, vous voudrez l'exécuter sur un réseau local pour vérifier son fonctionnement avant de la déployer. De la même façon que vous exécuteriez un serveur local sur votre ordinateur pour du développement Web, vous pouvez utiliser un réseau de développement pour créer une occurrence de blockchain locale et tester votre application décentralisée (dApp). Cela permet une itération beaucoup plus rapide que sur un réseau de test public.

Il existe des projets et des outils dédiés pour y contribuer. En savoir plus sur les [réseaux de développement](/developers/docs/development-networks/).

### Réseaux de consortium {#consortium-networks}

Le processus de consensus est contrôlé par un ensemble de nœuds prédéfinis qui sont fiables. Par exemple, un réseau privé d'institutions académiques connues régissant chacune un seul nœud, et où les blocs sont validés par un seuil de signataires au sein du réseau.

Si un réseau public Ethereum est comme l'Internet public, vous pouvez considérer un réseau de consortium comme un intranet privé.

## Outils connexes {#related-tools}

- [Liste de chaînes](https://chainlist.org/) _liste de réseaux EVM pour connecter les portefeuilles et les fournisseurs au ID de chaîne et ID de réseau appropriés_
- [Chaînes basées sur EVM](https://github.com/ethereum-lists/chains) _répertoire GitHub des chaînes de métadonnées qui alimentent la liste de chaîne_

## Complément d'information {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_
