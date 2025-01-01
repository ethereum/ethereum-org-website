---
title: Introduction aux ponts de blockchain
description: Les ponts permettent aux utilisateurs de déplacer leurs fonds à travers différentes blockchains
lang: fr
---

# Ponts de connexion blockchain {#prerequisites}

_Le Web3 a évolué en un écosystème de solutions blockchain L1 et de mise à l'échelle L2, chacune ayant des avantages et des inconvénients. À mesure qu'augmente le nombre de protocoles blockchain, la demande de déplacement d'actifs entre les chaînes augmente aussi. Pour répondre à cette demande, nous avons besoin de ponts._

<Divider />

## Que sont les ponts ? {#what-are-bridges}

Les ponts blockchain fonctionnent comme les ponts que nous connaissons dans le monde physique. De même qu'un pont physique relie deux lieux physiques, un pont blockchain relie deux écosystèmes blockchain. **Les ponts facilitent la communication entre les blockchains par le transfert d'informations et d'actifs**.

Prenons un exemple :

Vous êtes originaire des États-Unis et vous prévoyez un voyage en Europe. Vous avez des dollars américains, mais vous avez besoin d'euros à dépenser. Pour échanger vos dollars américains contre des euros, vous pouvez utiliser un échangeur de devises moyennant de faibles frais.

Mais, que feriez-vous si vous vouliez faire le même échange pour utiliser une [blockchain](/glossary/#blockchain) différente ? Disons que vous voulez échanger des [ETH](/glossary/#ether) du réseau principal Ethereum contre des ETH d'[Arbitrum](https://arbitrum.io/). À l'instar de l'échange de devises que nous avons effectué pour les euros, nous avons besoin d'un mécanisme pour transférer nos ETH d'Ethereum vers Arbitrum. Les ponts permettent de telles transactions. Dans ce cas, [Arbitrum a un pont natif](https://bridge.arbitrum.io/) qui peut transférer des ETH du Mainnet vers Arbitrum.

## Pourquoi avons-nous besoin de ponts ? {#why-do-we-need-bridges}

Toutes les blockchains ont leurs limites. Pour qu'Ethereum puisse évoluer et répondre à la demande, il a fallu procéder à des [rollups](/glossary/#rollups). Alternativement, des L1 comme Solana ou Avalanche sont conçues différemment pour permettre un débit plus élevé mais au prix de la décentralisation.

Toutes les blockchains se développent néanmoins dans des environnements isolés et ont cependant des règles et des mécanismes de [consensus](/glossary/#consensus) différents. Cela signifie qu'elles ne peuvent pas communiquer de manière native et que les jetons ne peuvent pas circuler librement entre les blockchains.

Les ponts existent pour connecter les blockchains, permettant le transfert d'informations et de jetons entre elles.

**Les ponts permettent** :

- le transfert inter-chaînes d'actifs et d'informations.
- aux [dapps](/glossary/#dapp) d'accéder aux forces de différentes blockchains, renforçant leurs capacités (les protocoles disposant désormais de plus d'espace de conception pour l'innovation).
- aux utilisateurs d'accéder à de nouvelles plateformes et de tirer parti des avantages de différentes chaînes.
- aux développeurs de différents écosystèmes de blockchain de collaborer et de créer de nouvelles plateformes pour les utilisateurs.

[Comment transférer des jetons aux réseaux de secondes couches](/guides/how-to-use-a-bridge/)

<Divider />

## Exemple d'utilisation d'un pont {#bridge-use-cases}

Voici quelques scénarios où vous pouvez utiliser un pont :

### Des frais de transactions moins élevés {#transaction-fees}

Disons que vous avez de l'ETH sur le réseau principal Ethereum mais que vous voulez des frais de transaction moins élevés pour explorer différentes dapps. En transférant votre ETH du réseau principal à un rollup L2 d'Ethereum, vous pouvez bénéficier de frais de transaction moins élevés.

### Dapps sur d'autres blockchains {#dapps-other-chains}

Si vous utilisez Aave sur le réseau principal Ethereum pour prêter des USDT mais que le taux d'intérêt pour prêter des USDT en utilisant Aave sur Polygon est plus élevé.

### Explorer les écosystèmes blockchain {#explore-ecosystems}

Si vous avez des ETH sur le réseau principal Ethereum et que vous voulez explorer un L1 alternatif pour essayer leurs dapps natives. Vous pouvez utilisez un pont pour transférer vos ETH du réseau principal Ethereum vers le L1.

### Posséder des actifs crypto natifs {#own-native}

Disons que vous voulez posséder des bitcoins (BTC) natifs, mais que vous n'avez des fonds que sur le réseau principal Ethereum. Pour vous exposer aux BTC sur Ethereum, vous pouvez acheter des Wrapped Bitcoin (WBTC). Cependant, le WBTC est un jeton [ERC-20](/glossary/#erc-20) natif du réseau Ethereum, ce qui signifie qu'il s'agit d'une version Ethereum de Bitcoin et non de l'actif original sur la blockchain Bitcoin. Pour posséder des BTC natifs, vous devez basculer vos actifs d'Ethereum à Bitcoin en utilisant un pont. Cela permettra de relier votre WBTC et de le convertir en BTC natif. Alternativement, vous pouvez également posséder des BTC et vouloir les utiliser dans les protocoles [DeFi](/glossary/#defi) d'Ethereum. Pour cela, il faudrait faire le pont dans l'autre sens, de BTC à WBTC, qui peut ensuite être utilisé comme actif sur Ethereum.

<InfoBanner shouldCenter emoji=":bulb:">
  Vous pouvez également faire tout ce qui précède en utilisant un <a href="/get-eth/">échange centralisé</a>. Cependant, à moins que vos fonds ne soient déjà mêlés à un échange, cela impliquerait plusieurs étapes et il serait probablement préférable d'utiliser un pont.
</InfoBanner>

<Divider />

## Type de pont {#types-of-bridge}

Les ponts présentent de nombreux types de conceptions et de subtilités. En général, les ponts se divisent en deux catégories : les ponts sans risque et les ponts risqués.

| Ponts sans risque                                                                                                                                                                             | Ponts risqués                                                                                                                                     |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Le fonctionnement des ponts sans risque repose sur une entité ou un système central pour leur fonctionnement.                                                                                 | Le fonctionnement des ponts risqués repose sur des contrats intelligents et des algorithmes.                                                      |
| Ces ponts sont associés à des hypothèses de confiance en ce qui concerne la garde des fonds et la sécurité du pont. Les utilisateurs se fient surtout à la réputation de l'opérateur du pont. | Ils sont risqués, c'est-à-dire que la sécurité du pont est la même que celle de la blockchain sous-jacente.                                       |
| Les utilisateurs doivent renoncer au contrôle de leurs crypto-actifs.                                                                                                                         | Grâce aux [contrats intelligents](/glossary/#smart-contract), les ponts risqués permettent aux utilisateurs de garder le contrôle de leurs fonds. |

Pour résumer, nous pouvons dire que les ponts sans risque reposent sur des hypothèses de confiance, tandis que les ponts risqués minimisent la confiance et ne font pas de nouvelles hypothèses de confiance au-delà de celles des domaines sous-jacents. Voici comment ces termes peuvent être décrits :

- **Risqué** : qui a une sécurité équivalente à celle des domaines sous-jacents. Comme décrit par [Arjun Bhuptani in this article.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Hypothèses de confiance :** s'éloigner de la sécurité des domaines sous-jacents en ajoutant des vérificateurs externes dans le système, ce qui le rend moins sûr sur le plan crypto-économique.

Pour mieux comprendre les principales différences entre les deux approches, prenons un exemple :

Imaginez que vous soyez à un point de contrôle de sécurité dans un aéroport. Il y a deux types de points de contrôle :

1. Les points de contrôle manuels - gérés par des fonctionnaires qui vérifient manuellement tous les détails de votre billet et votre identité avant de vous remettre la carte d'embarquement.
2. L'enregistrement automatique - il s'effectue à l'aide d'une machine où vous indiquez les détails de votre vol et recevez la carte d'embarquement si tout est en ordre.

Un point de contrôle manuel est similaire à un modèle de confiance puisque qu'il dépend d'une tierce partie, par exemple les fonctionnaires, pour leurs opérations. En tant qu'utilisateur, vous faites confiance aux fonctionnaires pour prendre les bonnes décisions et utiliser correctement vos informations privées.

L'enregistrement automatique s'apparente à un modèle risqué car il supprime le rôle de l'opérateur et utilise la technologie pour ses opérations. Les utilisateurs gardent toujours le contrôle de leurs données et ne doivent pas confier leurs informations privées à un tiers.

De nombreuses solutions de transition adoptent des modèles entre ces deux extrêmes, avec des degrés de confiance variables.

<Divider />

## Utiliser des ponts {#use-bridge}

L'utilisation des ponts vous permet de déplacer vos fonds entre différentes blockchains. Voici quelques ressources pour vous aider à trouver et utiliser des ponts :

- **[Liste des ponts L2BEAT](https://l2beat.com/bridges/summary)&[Analyse des risques L2BEAT des ponts](https://l2beat.com/bridges/risk)** : Une liste complète de divers ponts, incluant des détails sur leur part de marché, le type de pont et les chaînes de destination. L2BEAT propose également une analyse des risques des ponts, aidant les utilisateurs à prendre des décisions éclairées lors de la sélection d'un pont.
- **[Liste des ponts de DefiLlama](https://defillama.com/bridges/Ethereum)** : Un résumé des volumes des ponts sur les réseaux Ethereum.

<Divider />

## Risques liés à l'utilisation de ponts {#bridge-risk}

Les ponts en sont aux premiers stades de développement. Il est probable que le design optimal des ponts n'ait pas encore été découvert. Interagir avec n'importe quel type de pont comporte des risques :

- **Risque lié aux contrats intelligents -** le risque d'un bug dans le code peut causer la perte des fonds de l'utilisateur
- **Risque technologique —** une défaillance du logiciel, un code bugé, une erreur humaine, du spam et des attaques malveillantes peuvent éventuellement perturber les opérations des utilisateurs

De plus, comme les ponts de confiance ajoutent des hypothèses de confiance, ils comportent des risques supplémentaires tels que :

- **Risque de censure —** les opérateurs de pont peuvent théoriquement empêcher les utilisateurs de transférer leurs biens en utilisant le pont
- **Risque de garde —** les opérateurs de ponts peuvent s'entendre pour voler les fonds des utilisateurs

Les fonds de l'utilisateur sont en danger si :

- il y a un bug dans le contrat intelligent
- l'utilisateur fait une erreur
- la blockchain sous-jacente est hackée
- les opérateurs du pont ont des intentions malveillantes sur un pont sans risque
- le pont est hacké

Un piratage a récemment eu lieu sur le pont Wormhole de Solana, [où 120k wETH (325 millions d'USD) ont été volé](https://rekt.news/wormhole-rekt/). La plupart des [meilleurs hacks dans les blockchains impliquaient des ponts](https://rekt.news/leaderboard/).

Les ponts sont essentiels pour l'accueil des utilisateurs sur les L2 d'Ethereum, et même pour les utilisateurs qui veulent explorer différents écosystèmes. Cependant, étant donné les risques liés à l'interaction avec les ponts, les utilisateurs doivent comprendre les compromis que font les ponts. Voici [des stratégies pour la sécurité transversale](https://blog.debridge.finance/10-strategies-for-cross-chain-security-8ed5f5879946).

<Divider />

## En savoir plus {#further-reading}

- [EIP-5164 : Exécution en chaines croisées](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) _18 juin 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) _5 juillet 2022 - Bartek Kiepuszewski_
- ["Pourquoi le futur sera multi-chaîne, mais ne sera pas celui des chaînes croisées.](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) _8 janvier 2022 - Vitalik Buterin_
