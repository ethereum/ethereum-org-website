---
title: Ponts de chaîne de blocs
metaTitle: Introduction aux ponts de chaîne de blocs
description: Les ponts permettent aux utilisateurs de déplacer leurs fonds à travers différentes chaînes de blocs
lang: fr
---

_Le Web3 a évolué vers un écosystème de chaînes de blocs de couche 1 (l1) et de solutions de mise à l'échelle de couche 2 (l2), chacune conçue avec des capacités et des compromis uniques. À mesure que le nombre de protocoles de chaîne de blocs augmente, la demande pour déplacer des actifs entre les chaînes augmente également. Pour répondre à cette demande, nous avons besoin de ponts._

<Divider />

## Que sont les ponts ? {#what-are-bridges}

Les ponts de chaîne de blocs fonctionnent exactement comme les ponts que nous connaissons dans le monde physique. Tout comme un pont physique relie deux lieux physiques, un pont de chaîne de blocs relie deux écosystèmes de chaîne de blocs. **Les ponts facilitent la communication entre les chaînes de blocs par le transfert d'informations et d'actifs**.

Prenons un exemple :

Vous venez des États-Unis et prévoyez un voyage en Europe. Vous avez des USD, mais vous avez besoin d'EUR pour vos dépenses. Pour échanger vos USD contre des EUR, vous pouvez utiliser un bureau de change moyennant des frais minimes.

Mais que faire si vous souhaitez effectuer un échange similaire pour utiliser une [chaîne de blocs](/glossary/#blockchain) différente ? Supposons que vous souhaitiez échanger des [ETH](/glossary/#ether) sur le réseau principal [Ethereum](/) contre des ETH sur [Arbitrum](https://arbitrum.io/). Tout comme le bureau de change que nous avons utilisé pour les EUR, nous avons besoin d'un mécanisme pour déplacer nos ETH d'Ethereum vers Arbitrum. Les ponts rendent une telle transaction possible. Dans ce cas, [Arbitrum possède un pont natif](https://portal.arbitrum.io/bridge) qui peut effectuer le transfert d'ETH du réseau principal vers Arbitrum.

## Pourquoi avons-nous besoin de ponts ? {#why-do-we-need-bridges}

Toutes les chaînes de blocs ont leurs limites. Pour qu'Ethereum puisse passer à l'échelle et répondre à la demande, il a eu besoin de [rollups](/glossary/#rollups). D'un autre côté, les l1 comme Solana et Avalanche sont conçues différemment pour permettre un débit plus élevé, mais au prix de la décentralisation.

Cependant, toutes les chaînes de blocs sont développées dans des environnements isolés et ont des règles et des mécanismes de [consensus](/glossary/#consensus) différents. Cela signifie qu'elles ne peuvent pas communiquer de manière native et que les jetons ne peuvent pas circuler librement entre les chaînes de blocs.

Les ponts existent pour connecter les chaînes de blocs, permettant le transfert d'informations et de jetons entre elles.

**Les ponts permettent** :

- le transfert inter-chaîne d'actifs et d'informations.
- aux [applications décentralisées (dapps)](/glossary/#dapp) d'accéder aux forces de diverses chaînes de blocs – améliorant ainsi leurs capacités (car les protocoles disposent désormais de plus d'espace de conception pour l'innovation).
- aux utilisateurs d'accéder à de nouvelles plateformes et de tirer parti des avantages de différentes chaînes.
- aux développeurs de différents écosystèmes de chaîne de blocs de collaborer et de créer de nouvelles plateformes pour les utilisateurs.

[Comment transférer des jetons vers la couche 2 (l2) via un pont](/guides/how-to-use-a-bridge/)

<Divider />

## Cas d'utilisation des ponts {#bridge-use-cases}

Voici quelques scénarios dans lesquels vous pouvez utiliser un pont :

### Frais de transaction réduits {#transaction-fees}

Supposons que vous ayez des ETH sur le réseau principal Ethereum, mais que vous souhaitiez des frais de transaction moins élevés pour explorer différentes applications décentralisées (dapps). En transférant vos ETH du réseau principal vers un rollup l2 d'Ethereum via un pont, vous pouvez profiter de frais de transaction réduits.

### Dapps sur d'autres chaînes de blocs {#dapps-other-chains}

Si vous avez utilisé Aave sur le réseau principal Ethereum pour fournir de l'USDT, mais que le taux d'intérêt que vous pourriez recevoir en fournissant de l'USDT en utilisant Aave sur Polygon est plus élevé.

### Explorer les écosystèmes de chaîne de blocs {#explore-ecosystems}

Si vous avez des ETH sur le réseau principal Ethereum et que vous souhaitez explorer une l1 alternative pour essayer ses dapps natives. Vous pouvez utiliser un pont pour effectuer le transfert de vos ETH du réseau principal Ethereum vers la l1 alternative.

### Posséder des actifs crypto natifs {#own-native}

Supposons que vous souhaitiez posséder du Bitcoin (BTC) natif, mais que vous n'ayez des fonds que sur le réseau principal Ethereum. Pour vous exposer au BTC sur Ethereum, vous pouvez acheter du Wrapped Bitcoin (WBTC). Cependant, le WBTC est un jeton [ERC-20](/glossary/#erc-20) natif du réseau Ethereum, ce qui signifie qu'il s'agit d'une version Ethereum de Bitcoin et non de l'actif original sur la chaîne de blocs Bitcoin. Pour posséder du BTC natif, vous devriez transférer vos actifs d'Ethereum vers Bitcoin à l'aide d'un pont. Cela transférera votre WBTC et le convertira en BTC natif. Alternativement, vous pourriez posséder du BTC et vouloir l'utiliser dans les protocoles de [finance décentralisée (DeFi)](/glossary/#defi) d'Ethereum. Cela nécessiterait de faire le pont dans l'autre sens, du BTC au WBTC, qui peut ensuite être utilisé comme actif sur Ethereum.

<Alert variant="update">
<AlertEmoji text=":bulb:"/>
<AlertContent>
<AlertDescription>
  Vous pouvez également faire tout ce qui précède en utilisant une [plateforme d'échange centralisée](/get-eth). Cependant, à moins que vos fonds ne soient déjà sur une plateforme d'échange, cela impliquerait plusieurs étapes, et il serait probablement préférable d'utiliser un pont.
</AlertDescription>
</AlertContent>
</Alert>

<Divider />

## Types de ponts {#types-of-bridge}

Les ponts ont de nombreux types de conceptions et de subtilités. En général, les ponts se divisent en deux catégories : les ponts de confiance et les ponts sans tiers de confiance.

| Ponts de confiance                                                                                                                                         | Ponts sans tiers de confiance                                                                                      |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Les ponts de confiance dépendent d'une entité ou d'un système central pour leurs opérations.                                                                            | Les ponts sans tiers de confiance fonctionnent à l'aide de contrats intelligents et d'algorithmes.                                        |
| Ils ont des hypothèses de confiance en ce qui concerne la garde des fonds et la sécurité du pont. Les utilisateurs s'en remettent principalement à la réputation de l'opérateur du pont. | Ils sont sans tiers de confiance, c'est-à-dire que la sécurité du pont est la même que celle de la chaîne de blocs sous-jacente. |
| Les utilisateurs doivent céder le contrôle de leurs actifs crypto.                                                                                                   | Grâce aux [contrats intelligents](/glossary/#smart-contract), les ponts sans tiers de confiance permettent aux utilisateurs de garder le contrôle de leurs fonds.           |

En résumé, nous pouvons dire que les ponts de confiance ont des hypothèses de confiance, tandis que les ponts sans tiers de confiance sont à confiance minimisée et ne font pas de nouvelles hypothèses de confiance au-delà de celles des domaines sous-jacents. Voici comment ces termes peuvent être décrits :

- **Sans tiers de confiance** : ayant une sécurité équivalente aux domaines sous-jacents. Tel que décrit par [Arjun Bhuptani dans cet article.](https://medium.com/connext/the-interoperability-trilemma-657c2cf69f17)
- **Hypothèses de confiance :** s'éloigner de la sécurité des domaines sous-jacents en ajoutant des vérificateurs externes dans le système, le rendant ainsi moins sécurisé sur le plan crypto-économique.

Pour mieux comprendre les principales différences entre les deux approches, prenons un exemple :

Imaginez que vous êtes au point de contrôle de sécurité de l'aéroport. Il existe deux types de points de contrôle :

1. Points de contrôle manuels — opérés par des agents qui vérifient manuellement tous les détails de votre billet et de votre identité avant de vous remettre la carte d'embarquement.
2. Enregistrement automatique — opéré par une machine où vous entrez les détails de votre vol et recevez la carte d'embarquement si tout est en ordre.

Un point de contrôle manuel est similaire à un modèle de confiance car il dépend d'un tiers, c'est-à-dire les agents, pour ses opérations. En tant qu'utilisateur, vous faites confiance aux agents pour prendre les bonnes décisions et utiliser correctement vos informations privées.

L'enregistrement automatique est similaire à un modèle sans tiers de confiance car il supprime le rôle de l'opérateur et utilise la technologie pour ses opérations. Les utilisateurs gardent toujours le contrôle de leurs données et n'ont pas à confier leurs informations privées à un tiers.

De nombreuses solutions de pont adoptent des modèles situés entre ces deux extrêmes avec des degrés variables d'absence de confiance requise.

<Divider />

## Utiliser des ponts {#use-bridge}

L'utilisation de ponts vous permet de déplacer vos actifs à travers différentes chaînes de blocs. Voici quelques ressources qui peuvent vous aider à trouver et à utiliser des ponts :

- **[Résumé des ponts L2BEAT](https://l2beat.com/bridges/summary) et [Analyse des risques des ponts L2BEAT](https://l2beat.com/bridges/summary)** : Un résumé complet de divers ponts, y compris des détails sur la part de marché, le type de pont et les chaînes de destination. L2BEAT propose également une analyse des risques pour les ponts, aidant les utilisateurs à prendre des décisions éclairées lors de la sélection d'un pont.
- **[Résumé des ponts DefiLlama](https://defillama.com/bridges/Ethereum)** : Un résumé des volumes des ponts sur les réseaux Ethereum.

<Divider />

## Risques liés à l'utilisation des ponts {#bridge-risk}

Les ponts en sont aux premiers stades de développement. Il est probable que la conception optimale de pont n'ait pas encore été découverte. Interagir avec tout type de pont comporte des risques :

- **Risque lié aux contrats intelligents —** le risque d'un bogue dans le code pouvant entraîner la perte des fonds des utilisateurs
- **Risque technologique —** une défaillance logicielle, un code bogué, une erreur humaine, du spam et des attaques malveillantes peuvent potentiellement perturber les opérations des utilisateurs

De plus, comme les ponts de confiance ajoutent des hypothèses de confiance, ils comportent des risques supplémentaires tels que :

- **Risque de censure —** les opérateurs de pont peuvent théoriquement empêcher les utilisateurs de transférer leurs actifs en utilisant le pont
- **Risque de garde —** les opérateurs de pont peuvent s'entendre pour voler les fonds des utilisateurs

Les fonds de l'utilisateur sont en danger si :

- il y a un bogue dans le contrat intelligent
- l'utilisateur fait une erreur
- la chaîne de blocs sous-jacente est piratée
- les opérateurs de pont ont des intentions malveillantes dans un pont de confiance
- le pont est piraté

Un piratage récent a été celui du pont Wormhole de Solana, [où 120 000 wETH (325 millions de dollars américains) ont été volés lors du piratage](https://rekt.news/wormhole-rekt/). Bon nombre des [principaux piratages de chaînes de blocs impliquaient des ponts](https://rekt.news/leaderboard/).

Les ponts sont cruciaux pour l'intégration des utilisateurs sur les l2 d'Ethereum, et même pour les utilisateurs qui souhaitent explorer différents écosystèmes. Cependant, compte tenu des risques liés à l'interaction avec les ponts, les utilisateurs doivent comprendre les compromis que font les ponts. Voici quelques [stratégies pour la sécurité inter-chaîne](https://debridge.com/learn/blog/10-strategies-for-cross-chain-security/).

<Divider />

## Lectures complémentaires {#further-reading}
- [EIP-5164 : Exécution inter-chaîne](https://ethereum-magicians.org/t/eip-5164-cross-chain-execution/9658) - _18 juin 2022 - Brendan Asselstine_
- [Cadre de risque L2Bridge](https://gov.l2beat.com/t/l2bridge-risk-framework/31) - _5 juillet 2022 - Bartek Kiepuszewski_
- [« Pourquoi l'avenir sera multi-chaîne, mais ne sera pas inter-chaîne. »](https://old.reddit.com/r/ethereum/comments/rwojtk/ama_we_are_the_efs_research_team_pt_7_07_january/hrngyk8/) - _8 janvier 2022 - Vitalik Buterin_
- [Exploiter la sécurité partagée pour une interopérabilité inter-chaîne sécurisée : Comités d'état Lagrange et au-delà](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - _12 juin 2024 - Emmanuel Awosika_
- [L'état des solutions d'interopérabilité des rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - _20 juin 2024 - Alex Hook_