---
title: Introduction aux ponts de blockchain
description: "Les ponts permettent aux utilisateurs de déplacer leurs fonds à travers différentes blockchains"
lang: fr
---

# Ponts de blockchain {#prerequisites}

_Le Web3 a évolué en un écosystème de solutions blockchain L1 et de mise à l'échelle L2, chacune ayant des avantages et des inconvénients. À mesure qu'augmente le nombre de protocoles blockchain, la demande de déplacement d'actifs entre les chaînes augmente aussi.Pour répondre à cette demande, nous avons besoin de ponts._

<Divider />

## Que sont les ponts ? {#what-are-bridges}

Les ponts blockchain fonctionnent comme les ponts que nous connaissons dans le monde physique. De même qu'un pont physique relie deux lieux physiques, un pont blockchain relie deux écosystèmes blockchain. **Les ponts facilitent la communication entre les blockchains par le transfert d'informations et d'actifs**.

Prenons un exemple :

Vous êtes originaire des États-Unis et vous prévoyez un voyage en Europe. Vous avez des dollars américains, mais vous avez besoin d'euros à dépenser. Pour échanger vos dollars américains contre des euros, vous pouvez utiliser un échangeur de devises moyennant de faibles frais.

Mais, que faites-vous si vous voulez effectuer un échange similaire pour utiliser une [blockchain](/glossary/#blockchain) différente ? Disons que vous voulez échanger des [ETH](/glossary/#ether) sur le réseau principal Ethereum contre des ETH sur [Arbitrum](https://arbitrum.io/). À l'instar de l'échange de devises que nous avons effectué pour les euros, nous avons besoin d'un mécanisme pour transférer nos ETH d'Ethereum vers Arbitrum. Les ponts permettent de telles transactions. Dans ce cas, [Arbitrum dispose d'un pont natif](https://portal.arbitrum.io/bridge) qui peut transférer des ETH du réseau principal vers Arbitrum.

## Pourquoi avons-nous besoin de ponts ? {#why-do-we-need-bridges}

Toutes les blockchains ont leurs limites. Pour qu'Ethereum puisse évoluer et répondre à la demande, il a fallu des [rollups](/glossary/#rollups). Alternativement, des L1 comme Solana ou Avalanche sont conçues différemment pour permettre un débit plus élevé mais au prix de la décentralisation.

Cependant, toutes les blockchains sont développées dans des environnements isolés et ont des règles et des mécanismes de [consensus](/glossary/#consensus) différents. Cela signifie qu'elles ne peuvent pas communiquer de manière native et que les jetons ne peuvent pas circuler librement entre les blockchains.

Les ponts existent pour connecter les blockchains, permettant le transfert d'informations et de jetons entre elles.

Les ponts permettent :

- le transfert inter-chaînes d'actifs et d'informations.
- aux [dapps](/glossary/#dapp) d'accéder aux points forts de diverses blockchains, améliorant ainsi leurs capacités (car les protocoles disposent désormais de plus d'espace de conception pour l'innovation).
- aux utilisateurs d'accéder à de nouvelles plateformes et de tirer parti des avantages de différentes chaînes.
- aux développeurs de différents écosystèmes de blockchain de collaborer et de créer de nouvelles plateformes pour les utilisateurs.

[Comment ponter des jetons vers la couche 2](/guides/how-to-use-a-bridge/)

<Divider />

## Cas d'utilisation des ponts {#bridge-use-cases}

Voici quelques scénarios où vous pouvez utiliser un pont :

### Frais de transaction plus bas {#transaction-fees}

Disons que vous avez de l'ETH sur le réseau principal Ethereum mais que vous voulez des frais de transaction moins élevés pour explorer différentes dapps. En transférant votre ETH du réseau principal à un rollup L2 d'Ethereum, vous pouvez bénéficier de frais de transaction moins élevés.

### Dapps sur d'autres blockchains {#dapps-other-chains}

Si vous utilisez Aave sur le réseau principal Ethereum pour prêter des USDT mais que le taux d'intérêt pour prêter des USDT en utilisant Aave sur Polygon est plus élevé.

### Explorer les écosystèmes de blockchain {#explore-ecosystems}

Si vous avez des ETH sur le réseau principal Ethereum et que vous voulez explorer un L1 alternatif pour essayer leurs dapps natives. Vous pouvez utiliser un pont pour transférer vos ETH du réseau principal Ethereum vers le L1.

### Posséder des actifs de cryptomonnaie natifs {#own-native}

Disons que vous voulez posséder des bitcoins (BTC) natifs, mais que vous n'avez des fonds que sur le réseau principal Ethereum. Pour vous exposer aux BTC sur Ethereum, vous pouvez acheter des Wrapped Bitcoin (WBTC). Cependant, le WBTC est un jeton [ERC-20](/glossary/#erc-20) natif du réseau Ethereum, ce qui signifie qu'il s'agit d'une version Ethereum de Bitcoin et non de l'actif original sur la blockchain Bitcoin. Pour posséder des BTC natifs, vous devez basculer vos actifs d'Ethereum à Bitcoin en utilisant un pont. Cela permettra de relier votre WBTC et de le convertir en BTC natif. Alternativement, vous pouvez posséder des BTC et vouloir les utiliser dans des protocoles [DeFi](/glossary/#defi) Ethereum. Pour cela, il faudrait faire le pont dans l'autre sens, de BTC à WBTC, qui peut ensuite être utilisé comme actif sur Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Vous pouvez également faire tout ce qui précède en utilisant un [échange centralisé](/get-eth). Cependant, à moins que vos fonds ne soient déjà mêlés à un échange, cela impliquerait plusieurs étapes et il serait probablement préférable d'utiliser un pont.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Types de ponts {#types-of-bridge}

Les ponts présentent de nombreux types de conceptions et de subtilités. En général, les ponts se divisent en deux catégories : les ponts de confiance et les ponts sans confiance.

| Ponts de confiance                                                                                                                                                                                                             | Ponts sans confiance                                                                                                                                                            |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Le fonctionnement des ponts de confiance repose sur une entité ou un système central pour leur fonctionnement.                                                                                                 | Le fonctionnement des ponts sans confiance repose sur des contrats intelligents et des algorithmes.                                                             |
| Ces ponts sont associés à des hypothèses de confiance en ce qui concerne la garde des fonds et la sécurité du pont. Les utilisateurs se fient surtout à la réputation de l'opérateur du pont. | Ils sont sans confiance, c'est-à-dire que la sécurité du pont est la même que celle de la blockchain sous-jacente.                                              |
| Les utilisateurs doivent renoncer au contrôle de leurs crypto-actifs.                                                                                                                                         | Grâce aux [contrats intelligents](/glossary/#smart-contract), les ponts sans confiance permettent aux utilisateurs de garder le contrôle de leurs fonds. |

Pour résumer, nous pouvons dire que les ponts de confiance reposent sur des hypothèses de confiance, tandis que les ponts sans confiance minimisent la confiance et ne font pas de nouvelles hypothèses de confiance au-delà de celles des domaines sous-jacents. Voici comment ces termes peuvent être décrits :

- **Sans confiance** : possédant une sécurité équivalente à celle des domaines sous-jacents. Tel que décrit par [Arjun Bhuptani dans cet article.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Hypothèses de confiance :** s'éloigner de la sécurité des domaines sous-jacents en ajoutant des vérificateurs externes au système, le rendant ainsi moins sécurisé sur le plan crypto-économique.

Pour mieux comprendre les principales différences entre les deux approches, prenons un exemple :

Imaginez que vous soyez à un point de contrôle de sécurité dans un aéroport. Il y a deux types de points de contrôle :

1. Les points de contrôle manuels - gérés par des fonctionnaires qui vérifient manuellement tous les détails de votre billet et votre identité avant de vous remettre la carte d'embarquement.
2. L'enregistrement automatique - il s'effectue à l'aide d'une machine où vous indiquez les détails de votre vol et recevez la carte d'embarquement si tout est en ordre.

Un point de contrôle manuel est similaire à un modèle de confiance puisque qu'il dépend d'une tierce partie, par exemple les fonctionnaires, pour leurs opérations. En tant qu'utilisateur, vous faites confiance aux fonctionnaires pour prendre les bonnes décisions et utiliser correctement vos informations privées.

L'enregistrement automatique s'apparente à un modèle sans confiance car il supprime le rôle de l'opérateur et utilise la technologie pour ses opérations. Les utilisateurs gardent toujours le contrôle de leurs données et ne doivent pas confier leurs informations privées à un tiers.

De nombreuses solutions de transition adoptent des modèles entre ces deux extrêmes, avec des degrés de confiance variables.

<Divider />

## Utiliser les ponts {#use-bridge}

L'utilisation des ponts vous permet de déplacer vos fonds entre différentes blockchains. Voici quelques ressources pour vous aider à trouver et utiliser des ponts :

- **[L2BEAT Bridges Summary](https://l2beat.com/bridges/summary) & [L2BEAT Bridges Risk Analysis](https://l2beat.com/bridges/summary)** : un résumé complet de divers ponts, incluant des détails sur la part de marché, le type de pont et les chaînes de destination. L2BEAT propose également une analyse des risques des ponts, aidant les utilisateurs à prendre des décisions éclairées lors de la sélection d'un pont.
- **[DefiLlama Bridge Summary](https://defillama.com/bridges/Ethereum)** : un résumé des volumes des ponts sur les réseaux Ethereum.

<Divider />

## Risques liés à l'utilisation des ponts {#bridge-risk}

Les ponts en sont aux premiers stades de développement. Il est probable que le design optimal des ponts n'ait pas encore été découvert. Interagir avec n'importe quel type de pont comporte des risques :

- **Risque lié au contrat intelligent —** le risque d'un bogue dans le code pouvant entraîner la perte des fonds des utilisateurs
- **Risque technologique —** défaillance logicielle, code bogué, erreur humaine, spam et attaques malveillantes peuvent potentiellement perturber les opérations des utilisateurs

De plus, comme les ponts de confiance ajoutent des hypothèses de confiance, ils comportent des risques supplémentaires tels que :

- **Risque de censure —** les opérateurs de pont peuvent théoriquement empêcher les utilisateurs de transférer leurs actifs via le pont
- **Risque de garde —** les opérateurs de pont peuvent s'entendre pour voler les fonds des utilisateurs

Les fonds de l'utilisateur sont en danger si :

- il y a un bug dans le contrat intelligent
- l'utilisateur fait une erreur
- la blockchain sous-jacente est hackée
- les opérateurs du pont ont des intentions malveillantes sur un pont de confiance
- le pont est hacké

L'un des piratages récents concernait le pont Wormhole de Solana, [où 120k de wETH (325 millions de dollars américains) ont été volés](https://rekt.news/wormhole-rekt/). Bon nombre des [plus grands piratages de blockchains impliquaient des ponts](https://rekt.news/leaderboard/).

Les ponts sont essentiels pour l'accueil des utilisateurs sur les L2 d'Ethereum, et même pour les utilisateurs qui veulent explorer différents écosystèmes. Cependant, étant donné les risques liés à l'interaction avec les ponts, les utilisateurs doivent comprendre les compromis que font les ponts. Voici quelques [stratégies pour la sécurité inter-chaînes](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## En savoir plus {#further-reading}

- [EIP-5164: Cross-Chain Execution](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 juin 2022 - Brendan Asselstine_
- [L2Bridge Risk Framework](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 juillet 2022 - Bartek Kiepuszewski_
- ["Pourquoi l'avenir sera multi-chaînes, mais il ne sera pas inter-chaînes."](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 janvier 2022 - Vitalik Buterin_
- [Harnessing Shared Security For Secure Cross-Chain Interoperability: Lagrange State Committees And Beyond](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 juin 2024 - Emmanuel Awosika_
- [The State Of Rollup Interoperability Solutions](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 juin 2024 - Alex Hook_

