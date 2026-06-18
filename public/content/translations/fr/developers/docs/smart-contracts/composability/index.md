---
title: Composabilité des contrats intelligents
description: Découvrez comment les contrats intelligents peuvent être combinés comme des blocs Lego pour construire des dapps complexes en réutilisant des composants existants.
lang: fr
incomplete: true
---

## Une brève introduction {#a-brief-introduction}

Les contrats intelligents sont publics sur Ethereum et peuvent être considérés comme des API ouvertes. Vous n'avez pas besoin d'écrire votre propre contrat intelligent pour devenir développeur d'applications décentralisées (dapps), il vous suffit de savoir comment interagir avec eux. Par exemple, vous pouvez utiliser les contrats intelligents existants d'[Uniswap](https://uniswap.exchange/swap), un échange décentralisé, pour gérer toute la logique d'échange de jetons dans votre application – vous n'avez pas besoin de partir de zéro. Consultez certains de leurs contrats [v2](https://github.com/Uniswap/uniswap-v2-core/tree/master/contracts) et [v3](https://github.com/Uniswap/uniswap-v3-core/tree/main/contracts).

## Qu'est-ce que la composabilité ? {#what-is-composability}

La composabilité consiste à combiner des composants distincts pour créer de nouveaux systèmes ou résultats. Dans le développement de logiciels, la composabilité signifie que les développeurs peuvent réutiliser des composants logiciels existants pour créer de nouvelles applications. Une bonne façon de comprendre la composabilité est de considérer les éléments composables comme des blocs Lego. Chaque Lego peut être combiné avec un autre, ce qui vous permet de construire des structures complexes en combinant différents Legos.

Sur Ethereum, chaque contrat intelligent est en quelque sorte un Lego : vous pouvez utiliser les contrats intelligents d'autres projets comme blocs de construction pour votre projet. Cela signifie que vous n'avez pas à passer du temps à réinventer la roue ou à construire à partir de zéro.

## Comment fonctionne la composabilité ? {#how-does-composability-work}

Les contrats intelligents Ethereum sont comme des API publiques, de sorte que n'importe qui peut interagir avec le contrat ou les intégrer dans des dapps pour ajouter des fonctionnalités. La composabilité des contrats intelligents repose généralement sur trois principes : la modularité, l'autonomie et la découvrabilité :

**1. Modularité** : Il s'agit de la capacité des composants individuels à effectuer une tâche spécifique. Sur Ethereum, chaque contrat intelligent a un cas d'utilisation spécifique (comme le montre l'exemple d'Uniswap).

**2. Autonomie** : Les composants composables doivent pouvoir fonctionner de manière indépendante. Chaque contrat intelligent sur Ethereum s'exécute de lui-même et peut fonctionner sans dépendre d'autres parties du système.

**3. Découvrabilité** : Les développeurs ne peuvent pas appeler de contrats externes ou intégrer des bibliothèques logicielles dans des applications si ces premiers ne sont pas accessibles au public. Par conception, les contrats intelligents sont open-source ; n'importe qui peut appeler un contrat intelligent ou faire un fork d'une base de code.

## Avantages de la composabilité {#benefits-of-composability}

### Cycle de développement plus court {#shorter-development-cycle}

La composabilité réduit le travail que les développeurs doivent accomplir lors de la création de [dapps](/apps/#what-are-dapps). [Comme le dit Naval Ravikant :](https://twitter.com/naval/status/1444366754650656770) « L'open source signifie que chaque problème ne doit être résolu qu'une seule fois. »

S'il existe un contrat intelligent qui résout un problème, d'autres développeurs peuvent le réutiliser, de sorte qu'ils n'ont pas à résoudre le même problème. De cette façon, les développeurs peuvent prendre des bibliothèques logicielles existantes et ajouter des fonctionnalités supplémentaires pour créer de nouvelles dapps.

### Plus grande innovation {#greater-innovation}

La composabilité encourage l'innovation et l'expérimentation car les développeurs sont libres de réutiliser, modifier, dupliquer ou intégrer du code open-source pour créer les résultats souhaités. Par conséquent, les équipes de développement passent moins de temps sur les fonctionnalités de base et peuvent allouer plus de temps à l'expérimentation de nouvelles fonctionnalités.

### Meilleure expérience utilisateur {#better-user-experience}

L'interopérabilité entre les composants de l'écosystème Ethereum améliore l'expérience utilisateur. Les utilisateurs peuvent accéder à de plus grandes fonctionnalités lorsque les dapps intègrent des contrats intelligents externes que dans un écosystème fragmenté où les applications ne peuvent pas communiquer.

Nous utiliserons un exemple de trading d'arbitrage pour illustrer les avantages de l'interopérabilité :

Si un jeton se négocie à un prix plus élevé sur `exchange A` que sur `exchange B`, vous pouvez profiter de la différence de prix pour faire des bénéfices. Cependant, vous ne pouvez le faire que si vous disposez de suffisamment de capital pour financer la transaction (c'est-à-dire acheter le jeton sur `exchange B` et le vendre sur `exchange A`).

Dans un scénario où vous n'avez pas assez de fonds pour couvrir la transaction, un prêt éclair pourrait être idéal. Les [prêts éclairs](/defi/#flash-loans) sont très techniques, mais l'idée de base est que vous pouvez emprunter des actifs (sans collatéral) et les rembourser au sein d'une _seule_ transaction.

Pour en revenir à notre exemple initial, un trader d'arbitrage peut contracter un prêt éclair important, acheter des jetons sur `exchange B`, les vendre sur `exchange A`, rembourser le capital + les intérêts, et conserver le bénéfice, au sein de la même transaction. Cette logique complexe nécessite de combiner des appels à plusieurs contrats, ce qui ne serait pas possible si les contrats intelligents manquaient d'interopérabilité.

## Exemples de composabilité sur Ethereum {#composability-in-ethereum}

### Échanges de jetons {#token-swaps}

Si vous créez une dapp qui nécessite que les transactions soient payées en ETH, vous pouvez autoriser les utilisateurs à payer avec d'autres jetons ERC-20 en intégrant une logique d'échange de jetons. Le code convertira automatiquement le jeton de l'utilisateur en ETH avant que le contrat n'exécute la fonction appelée.

### Gouvernance {#governance}

Construire des systèmes de gouvernance sur mesure pour une [DAO](/dao/) peut être coûteux et chronophage. Au lieu de cela, vous pourriez utiliser une boîte à outils de gouvernance open-source, telle qu'[Aragon Client](https://client.aragon.org/), pour amorcer votre DAO afin de créer rapidement un cadre de gouvernance.

### Gestion de l'identité {#identity-management}

Au lieu de créer un système d'authentification personnalisé ou de vous fier à des fournisseurs centralisés, vous pouvez intégrer des outils d'identité décentralisée (DID) pour gérer l'authentification des utilisateurs. Un exemple est [SpruceID](https://www.spruceid.com/), une boîte à outils open-source qui offre une fonctionnalité « Se connecter avec Ethereum » (Sign in with Ethereum) permettant aux utilisateurs d'authentifier leurs identités avec un portefeuille Ethereum.

## Tutoriels connexes {#related-tutorials}

- [Démarrez le développement frontend de votre dapp avec create-eth-app](/developers/tutorials/kickstart-your-dapp-frontend-development-with-create-eth-app/) _– Un aperçu de la façon d'utiliser create-eth-app pour créer des applications avec des contrats intelligents populaires prêts à l'emploi._

## Complément d'information {#further-reading}

_Vous connaissez une ressource communautaire qui vous a aidé ? Modifiez cette page et ajoutez-la !_

- [La composabilité, c'est l'innovation](https://a16zcrypto.com/posts/article/how-composability-unlocks-crypto-and-everything-else/)
- [Pourquoi la composabilité est importante pour le Web3](https://hackernoon.com/why-composability-matters-for-web3)
- [Qu'est-ce que la composabilité ?](https://blog.aragon.org/what-is-composability/#:~:text=Aragon,connect%20to%20every%20other%20piece.)