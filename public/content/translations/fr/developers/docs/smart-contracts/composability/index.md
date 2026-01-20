---
title: "Composabilité des contrats intelligents"
description: "Découvrez comment les contrats intelligents peuvent être combinés comme des blocs Lego pour créer des dapps complexes en réutilisant les composants existants."
lang: fr
incomplete: true
---

## Une brève introduction {#a-brief-introduction}

Sur Ethereum, les contrats intelligents sont publics. Ils peuvent être considérés comme des API ouvertes. Vous n'avez pas besoin de rédiger votre propre contrat intelligent pour devenir développeur de DApps, il vous suffit de savoir comment interagir avec eux. Par exemple, vous pouvez utiliser les contrats intelligents existants d'[Uniswap](https://uniswap.exchange/swap), un échange décentralisé, pour gérer toute la logique d'échange de jetons dans votre application – vous n'avez pas besoin de repartir de zéro. Consultez certains de leurs contrats [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) et [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Qu'est-ce que la composabilité ? {#what-is-composability}

La composabilité combine des composants distincts pour créer de nouveaux systèmes ou sorties. Dans le cadre du développement de logiciels, la composabilité permet aux développeurs de réutiliser des composants logiciels existants pour créer de nouvelles applications. Une bonne façon de comprendre la composabilité est de considérer les éléments composables comme des blocs de Lego. Chaque Lego peut être combiné avec un autre, vous permettant de construire des structures complexes en combinant différents Legos.

Sur Ethereum, chaque contrat intelligent est une sorte de Lego : vous pouvez utiliser les contrats intelligents d'autres projets comme des blocs réutilisables pour votre projet. Cela signifie que vous n'avez pas à passer du temps à réinventer la roue ou à construire à partir de zéro.

## Comment fonctionne la composabilité ? {#how-does-composability-work}

Les contrats intelligents sur Ethereum agissent comme des API publics, ainsi tout le monde peut interagir avec le contrat ou les réutiliser pour y ajouter des fonctionnalités pour un dapps. La composabilité des contrats intelligents repose généralement sur trois principes : la modularité, l'autonomie et la découverte :

**1. Modularité** : C'est la capacité des composants individuels à effectuer une tâche spécifique. Dans Ethereum, chaque contrat intelligent a un cas d'utilisation spécifique (comme indiqué dans l'exemple Uniswap).

**2. Autonomie** : Les composants composables doivent pouvoir fonctionner de manière indépendante. Chaque contrat intelligent dans Ethereum s'exécute automatiquement et peut fonctionner sans compter sur d'autres éléments du système.

**3. Découvrabilité** : Les développeurs ne peuvent pas appeler de contrats externes ou intégrer des bibliothèques logicielles dans des applications si ces derniers ne sont pas publiquement disponibles. Grâce à leur conception, les contrats intelligents sont open-source ; n'importe qui peut appeler un contrat intelligent ou récupérer le code base.

## Avantages de la composabilité {#benefits-of-composability}

### Cycle de développement plus court {#shorter-development-cycle}

La composabilité réduit le travail que les développeurs doivent effectuer lors de la création de [dapps](/apps/#what-are-dapps). [Comme le dit Naval Ravikant :](https://twitter.com/naval/status/1444366754650656770) « L'open source signifie que chaque problème ne doit être résolu qu'une seule fois. »

S'il y a un contrat intelligent qui résout un problème, d'autres développeurs peuvent le réutiliser, de sorte qu'ils n'aient pas à résoudre le même problème. De cette façon, les développeurs peuvent utiliser des bibliothèques logicielles existantes et ajouter des fonctionnalités supplémentaires pour créer de nouvelles DApps.

### Innovation accrue {#greater-innovation}

La composabilité encourage l'innovation et l'expérimentation puisque les développeurs sont libres de réutiliser, modifier, dupliquer ou intégrer du code open-source pour créer les résultats souhaités. En conséquence, les équipes de développement passent moins de temps sur les fonctionnalités de base et peuvent allouer plus de temps à expérimenter de nouvelles fonctionnalités.

### Meilleure expérience utilisateur {#better-user-experience}

L'interopérabilité entre les composants de l'écosystème Ethereum améliore l'expérience utilisateur. Les utilisateurs peuvent accéder à de meilleures fonctionnalités, lorsque les DApps intègrent des contrats intelligents externes, que dans le cadre d'un écosystème fragmenté où les applications ne peuvent pas communiquer.

Nous utiliserons un exemple de négociation d'arbitrage pour illustrer les avantages de l'interopérabilité :

Si un jeton se négocie à un prix plus élevé sur `exchange A` que sur `exchange B`, vous pouvez profiter de la différence de prix pour réaliser un bénéfice. Cependant, vous ne pouvez le faire que si vous disposez de suffisamment de capital pour financer la transaction (c'est-à-dire acheter le jeton sur `exchange B` et le vendre sur `exchange A`).

Dans un scénario où vous ne disposez pas de fonds suffisants pour couvrir la négociation, un prêt flash pourrait être idéal. [Les prêts Flash](/defi/#flash-loans) sont très techniques, mais l'idée de base est que vous pouvez emprunter des actifs (sans garantie) et les restituer au sein d'_une_ seule transaction.

Pour en revenir à notre exemple initial, un trader d'arbitrage peut contracter un important prêt flash, acheter des jetons sur `exchange B`, les vendre sur `exchange A`, rembourser le capital et les intérêts, et conserver le bénéfice, le tout au sein de la même transaction. Cette logique complexe nécessite de combiner des appels à plusieurs contrats, ce qui ne serait pas possible si les contrats intelligents n'avaient pas d'interopérabilité.

## Exemples de composabilité sur Ethereum {#composability-in-ethereum}

### Échanges de jetons {#token-swaps}

Si vous créez une DApp qui requiert que les transactions soient payées en ETH, vous pouvez permettre aux utilisateurs de payer dans d'autres jetons ERC-20 en intégrant la logique d'échange de jetons. Le code convertira automatiquement le jeton de l'utilisateur en ETH avant que le contrat n'exécute la fonction appelée.

### Gouvernance {#governance}

Créer des systèmes de gouvernance sur mesure pour une [DAO](/dao/) peut être coûteux et chronophage. À la place, vous pourriez utiliser une boîte à outils de gouvernance open source, telle qu'[Aragon Client](https://client.aragon.org/), pour lancer votre DAO afin de créer rapidement un cadre de gouvernance.

### Gestion de l'identité {#identity-management}

Au lieu de créer un système personnalisé d'authentification ou de s'appuyer sur des fournisseurs centralisés, vous pouvez intégrer des outils décentralisés d'identité (DID en anglais) pour gérer l'authentification des utilisateurs. Un exemple est [SpruceID](https://www.spruceid.com/), une boîte à outils open source qui offre une fonctionnalité « Se connecter avec Ethereum » qui permet aux utilisateurs d'authentifier leur identité avec un portefeuille Ethereum.

## Tutoriels connexes {#related-tutorials}

- [Démarrez rapidement le développement de votre frontend de dapp avec create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Un aperçu de l'utilisation de create-eth-app pour créer des applications avec des contrats intelligents populaires prêts à l'emploi._

## En savoir plus {#further-reading}

_Une ressource communautaire vous a aidé ? Modifiez cette page et ajoutez-la !_

- [La composabilité, c'est l'innovation](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Pourquoi la composabilité est-elle importante pour le Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Qu'est-ce que la composabilité ?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)
