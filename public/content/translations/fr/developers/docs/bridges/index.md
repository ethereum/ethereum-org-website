---
title: Ponts
description: Un aperçu des ponts pour les développeurs
lang: fr
---

Avec la prolifération des chaînes de blocs de couche 1 (l1) et des solutions de [mise à l'échelle](/developers/docs/scaling/) de couche 2 (l2), ainsi qu'un nombre toujours croissant d'applications décentralisées (dapp) devenant inter-chaînes, le besoin de communication et de mouvement d'actifs entre les chaînes est devenu une partie essentielle de l'infrastructure du réseau. Différents types de ponts existent pour rendre cela possible.

## Besoin de ponts {#need-for-bridges}

Les ponts existent pour connecter les réseaux de chaînes de blocs. Ils permettent la connectivité et l'interopérabilité entre les chaînes de blocs.

Les chaînes de blocs existent dans des environnements cloisonnés, ce qui signifie qu'il n'y a aucun moyen pour les chaînes de blocs d'échanger et de communiquer naturellement avec d'autres chaînes de blocs. Par conséquent, bien qu'il puisse y avoir une activité et une innovation significatives au sein d'un écosystème, celles-ci sont limitées par le manque de connectivité et d'interopérabilité avec d'autres écosystèmes.

Les ponts offrent un moyen aux environnements de chaînes de blocs isolés de se connecter les uns aux autres. Ils établissent une voie de transport entre les chaînes de blocs où les jetons, les messages, les données arbitraires et même les appels de [contrats intelligents](/developers/docs/smart-contracts/) peuvent être transférés d'une chaîne à une autre.

## Avantages des ponts {#benefits-of-bridges}

En termes simples, les ponts débloquent de nombreux cas d'utilisation en permettant aux réseaux de chaînes de blocs d'échanger des données et de déplacer des actifs entre eux.

Les chaînes de blocs ont des forces, des faiblesses et des approches uniques pour créer des applications (telles que la vitesse, le débit, le coût, etc.). Les ponts aident au développement de l'écosystème crypto global en permettant aux chaînes de blocs de tirer parti des innovations des unes et des autres.

Pour les développeurs, les ponts permettent ce qui suit :

- le transfert de toutes données, informations et actifs de manière inter-chaîne.
- le déblocage de nouvelles fonctionnalités et de nouveaux cas d'utilisation pour les protocoles, car les ponts élargissent l'espace de conception de ce que les protocoles peuvent offrir. Par exemple, un protocole d'agriculture de rendement initialement déployé sur le [réseau principal Ethereum](/) peut offrir des pools de liquidité sur toutes les chaînes compatibles EVM.
- l'opportunité de tirer parti des forces de différentes chaînes de blocs. Par exemple, les développeurs peuvent bénéficier des frais réduits offerts par les différentes solutions de couche 2 (l2) en déployant leurs dapps sur des rollups et des chaînes latérales (sidechains), et les utilisateurs peuvent utiliser des ponts pour passer de l'une à l'autre.
- la collaboration entre les développeurs de divers écosystèmes de chaînes de blocs pour créer de nouveaux produits.
- l'attraction d'utilisateurs et de communautés de divers écosystèmes vers leurs dapps.

## Comment fonctionnent les ponts ? {#how-do-bridges-work}

Bien qu'il existe de nombreux [types de conceptions de ponts](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), trois façons de faciliter le transfert inter-chaîne d'actifs se démarquent :

- **Verrouiller et frapper (Lock and mint) –** Verrouiller les actifs sur la chaîne source et frapper les actifs sur la chaîne de destination.
- **Brûler et frapper (Burn and mint) –** Brûler les actifs sur la chaîne source et frapper les actifs sur la chaîne de destination.
- **Échanges atomiques (Atomic swaps) –** Échanger des actifs sur la chaîne source contre des actifs sur la chaîne de destination avec une autre partie.

## Types de ponts {#bridge-types}

Les ponts peuvent généralement être classés dans l'une des catégories suivantes :

- **Ponts natifs –** Ces ponts sont généralement construits pour amorcer la liquidité sur une chaîne de blocs particulière, ce qui permet aux utilisateurs de déplacer plus facilement des fonds vers l'écosystème. Par exemple, le [pont Arbitrum](https://bridge.arbitrum.io/) est conçu pour permettre aux utilisateurs de passer facilement du réseau principal Ethereum à Arbitrum. D'autres ponts de ce type incluent le pont Polygon PoS, la [passerelle Optimism](https://app.optimism.io/bridge), etc.
- **Ponts basés sur des validateurs ou des oracles –** Ces ponts s'appuient sur un ensemble de validateurs externes ou des oracles pour valider les transferts inter-chaînes. Exemples : Multichain et Across.
- **Ponts de transmission de messages généralisés –** Ces ponts peuvent transférer des actifs, ainsi que des messages et des données arbitraires de manière inter-chaîne. Exemples : Axelar, LayerZero et Nomad.
- **Réseaux de liquidité –** Ces ponts se concentrent principalement sur le transfert d'actifs d'une chaîne à une autre via des échanges atomiques. En général, ils ne prennent pas en charge la transmission de messages inter-chaîne. Exemples : Connext et Hop.

## Compromis à prendre en compte {#trade-offs}

Avec les ponts, il n'y a pas de solutions parfaites. Il n'y a plutôt que des compromis faits pour atteindre un objectif. Les développeurs et les utilisateurs peuvent évaluer les ponts en fonction des facteurs suivants :

- **Sécurité –** Qui vérifie le système ? Les ponts sécurisés par des validateurs externes sont généralement moins sécurisés que les ponts qui sont sécurisés localement ou nativement par les validateurs de la chaîne de blocs.
- **Praticité –** Combien de temps faut-il pour effectuer une transaction, et combien de transactions un utilisateur a-t-il dû signer ? Pour un développeur, combien de temps faut-il pour intégrer un pont, et quelle est la complexité du processus ?
- **Connectivité –** Quelles sont les différentes chaînes de destination qu'un pont peut connecter (c.-à-d. les rollups, les chaînes latérales, d'autres chaînes de blocs de couche 1, etc.), et à quel point est-il difficile d'intégrer une nouvelle chaîne de blocs ?
- **Capacité à transmettre des données plus complexes –** Un pont peut-il permettre le transfert de messages et de données arbitraires plus complexes de manière inter-chaîne, ou ne prend-il en charge que les transferts d'actifs inter-chaînes ?
- **Rentabilité –** Combien coûte le transfert d'actifs entre les chaînes via un pont ? En général, les ponts facturent des frais fixes ou variables en fonction des coûts en gaz et de la liquidité d'itinéraires spécifiques. Il est également essentiel d'évaluer la rentabilité d'un pont en fonction du capital requis pour assurer sa sécurité.

À un niveau élevé, les ponts peuvent être classés comme étant de confiance (trusted) et sans tiers de confiance (trustless).

- **De confiance (Trusted) –** Les ponts de confiance sont vérifiés en externe. Ils utilisent un ensemble externe de vérificateurs (fédérations avec multi-signatures, systèmes de calcul multipartite, réseau d'oracles) pour envoyer des données entre les chaînes. Par conséquent, ils peuvent offrir une excellente connectivité et permettre une transmission de messages entièrement généralisée de manière inter-chaîne. Ils ont également tendance à être performants en termes de vitesse et de rentabilité. Cela se fait au détriment de la sécurité, car les utilisateurs doivent s'en remettre à la sécurité du pont.
- **Sans tiers de confiance (Trustless) –** Ces ponts s'appuient sur les chaînes de blocs qu'ils connectent et sur leurs validateurs pour transférer des messages et des jetons. Ils sont « sans tiers de confiance » car ils n'ajoutent pas de nouvelles hypothèses de confiance (en plus des chaînes de blocs). Par conséquent, les ponts sans tiers de confiance sont considérés comme plus sécurisés que les ponts de confiance.

Pour évaluer les ponts sans tiers de confiance en fonction d'autres facteurs, nous devons les diviser en ponts de transmission de messages généralisés et en réseaux de liquidité.

- **Ponts de transmission de messages généralisés –** Ces ponts excellent en matière de sécurité et de capacité à transférer des données plus complexes de manière inter-chaîne. En général, ils sont également bons en termes de rentabilité. Cependant, ces forces se font généralement au détriment de la connectivité pour les ponts de clients légers (ex : IBC) et présentent des inconvénients de vitesse pour les ponts optimistes (ex : Nomad) qui utilisent des preuves de fraude.
- **Réseaux de liquidité –** Ces ponts utilisent des échanges atomiques pour transférer des actifs et sont des systèmes vérifiés localement (c.-à-d. qu'ils utilisent les validateurs des chaînes de blocs sous-jacentes pour vérifier les transactions). Par conséquent, ils excellent en matière de sécurité et de vitesse. De plus, ils sont considérés comme comparativement rentables et offrent une bonne connectivité. Cependant, le compromis majeur est leur incapacité à transmettre des données plus complexes – car ils ne prennent pas en charge la transmission de messages inter-chaîne.

## Risques liés aux ponts {#risk-with-bridges}

Les ponts sont responsables des trois [plus gros piratages de la finance décentralisée (DeFi)](https://rekt.news/leaderboard/) et en sont encore aux premiers stades de développement. L'utilisation de tout pont comporte les risques suivants :

- **Risque lié aux contrats intelligents –** Bien que de nombreux ponts aient passé des audits avec succès, il suffit d'une faille dans un contrat intelligent pour que les actifs soient exposés à des piratages (ex : le [pont Wormhole de Solana](https://rekt.news/wormhole-rekt/)).
- **Risques financiers systémiques** – De nombreux ponts utilisent des actifs enveloppés (wrapped) pour frapper des versions canoniques de l'actif d'origine sur une nouvelle chaîne. Cela expose l'écosystème à un risque systémique, car nous avons vu des versions enveloppées de jetons être exploitées.
- **Risque de contrepartie –** Certains ponts utilisent une conception de confiance qui oblige les utilisateurs à s'appuyer sur l'hypothèse que les validateurs ne s'entendront pas pour voler les fonds des utilisateurs. La nécessité pour les utilisateurs de faire confiance à ces acteurs tiers les expose à des risques tels que les arnaques de type « rug pull », la censure et d'autres activités malveillantes.
- **Problèmes ouverts –** Étant donné que les ponts en sont aux premiers stades de développement, il existe de nombreuses questions sans réponse concernant la façon dont les ponts se comporteront dans différentes conditions de marché, comme les périodes de congestion du réseau et lors d'événements imprévus tels que des attaques au niveau du réseau ou des annulations d'état. Cette incertitude pose certains risques, dont le degré est encore inconnu.

## Comment les dapps peuvent-elles utiliser les ponts ? {#how-can-dapps-use-bridges}

Voici quelques applications pratiques que les développeurs peuvent envisager concernant les ponts et le passage de leur dapp en inter-chaîne :

### Intégrer des ponts {#integrating-bridges}

Pour les développeurs, il existe de nombreuses façons d'ajouter la prise en charge des ponts :

1. **Construire votre propre pont –** Construire un pont sécurisé et fiable n'est pas facile, surtout si vous empruntez une voie à confiance minimisée. De plus, cela nécessite des années d'expérience et d'expertise technique liées aux études d'évolutivité et d'interopérabilité. En outre, cela nécessiterait une équipe de terrain pour maintenir un pont et attirer suffisamment de liquidité pour le rendre viable.

2. **Montrer aux utilisateurs plusieurs options de ponts –** De nombreuses [dapps](/developers/docs/dapps/) exigent que les utilisateurs possèdent leur jeton natif pour interagir avec elles. Pour permettre aux utilisateurs d'accéder à leurs jetons, elles proposent différentes options de ponts sur leur site Web. Cependant, cette méthode est une solution de contournement rapide au problème car elle éloigne l'utilisateur de l'interface de la dapp et l'oblige toujours à interagir avec d'autres dapps et ponts. Il s'agit d'une expérience d'intégration fastidieuse avec un risque accru de faire des erreurs.

3. **Intégrer un pont –** Cette solution ne nécessite pas que la dapp envoie les utilisateurs vers les interfaces externes de ponts et d'échanges décentralisés (DEX). Elle permet aux dapps d'améliorer l'expérience d'intégration des utilisateurs. Cependant, cette approche a ses limites :

   - L'évaluation et la maintenance des ponts sont difficiles et chronophages.
   - La sélection d'un seul pont crée un point de défaillance unique et une dépendance.
   - La dapp est limitée par les capacités du pont.
   - Les ponts seuls peuvent ne pas suffire. Les dapps peuvent avoir besoin de DEX pour offrir plus de fonctionnalités telles que des échanges inter-chaînes.

4. **Intégrer plusieurs ponts –** Cette solution résout de nombreux problèmes associés à l'intégration d'un seul pont. Cependant, elle a également des limites, car l'intégration de plusieurs ponts consomme des ressources et crée des surcoûts techniques et de communication pour les développeurs — la ressource la plus rare dans la crypto.

5. **Intégrer un agrégateur de ponts –** Une autre option pour les dapps consiste à intégrer une solution d'agrégation de ponts qui leur donne accès à plusieurs ponts. Les agrégateurs de ponts héritent des forces de tous les ponts et ne sont donc pas limités par les capacités d'un seul pont. Notamment, les agrégateurs de ponts maintiennent généralement les intégrations de ponts, ce qui évite à la dapp les tracas liés au suivi des aspects techniques et opérationnels d'une intégration de pont.

Cela étant dit, les agrégateurs de ponts ont également leurs limites. Par exemple, bien qu'ils puissent offrir plus d'options de ponts, il y a généralement beaucoup plus de ponts disponibles sur le marché que ceux proposés sur la plateforme de l'agrégateur. De plus, tout comme les ponts, les agrégateurs de ponts sont également exposés aux risques liés aux contrats intelligents et à la technologie (plus de contrats intelligents = plus de risques).

Si une dapp choisit la voie de l'intégration d'un pont ou d'un agrégateur, il existe différentes options en fonction de la profondeur prévue de l'intégration. Par exemple, s'il s'agit uniquement d'une intégration front-end pour améliorer l'expérience d'intégration de l'utilisateur, une dapp intégrera le widget. Cependant, si l'intégration vise à explorer des stratégies inter-chaînes plus approfondies comme le staking, l'agriculture de rendement, etc., la dapp intègre le SDK ou l'API.

### Déployer une dapp sur plusieurs chaînes {#deploying-a-dapp-on-multiple-chains}

Pour déployer une dapp sur plusieurs chaînes, les développeurs peuvent utiliser des plateformes de développement comme [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. En général, ces plateformes sont fournies avec des plugins composables qui peuvent permettre aux dapps de devenir inter-chaînes. Par exemple, les développeurs peuvent utiliser un proxy de déploiement déterministe offert par le [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Exemples : {#examples}

- [Comment construire des dapps inter-chaînes](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Construire une place de marché NFT inter-chaîne](https://youtu.be/WZWCzsB1xUE)
- [Moralis : Construire des dapps NFT inter-chaînes](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Surveiller l'activité des contrats sur plusieurs chaînes {#monitoring-contract-activity-across-chains}

Pour surveiller l'activité des contrats sur plusieurs chaînes, les développeurs peuvent utiliser des sous-graphes (subgraphs) et des plateformes de développement comme Tenderly pour observer les contrats intelligents en temps réel. Ces plateformes disposent également d'outils qui offrent de plus grandes fonctionnalités de surveillance des données pour les activités inter-chaînes, comme la vérification des [événements émis par les contrats](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Outils {#tools}

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## Complément d'information {#further-reading}
- [Ponts de chaînes de blocs](/bridges/) – ethereum.org
- [Cadre de risque des ponts L2BEAT](https://l2beat.com/bridges/summary)
- [Ponts de chaînes de blocs : Construire des réseaux de cryptoréseaux](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 sept. 2021 – Dmitriy Berenzon
- [Le trilemme de l'interopérabilité](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1er oct. 2021 – Arjun Bhuptani
- [Clusters : Comment les ponts de confiance et à confiance minimisée façonnent le paysage multi-chaînes](https://blog.celestia.org/clusters/) - 4 oct. 2021 – Mustafa Al-Bassam
- [LI.FI : Avec les ponts, la confiance est un spectre](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 avr. 2022 – Arjun Chand
- [L'état des solutions d'interopérabilité des rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 juin 2024 – Alex Hook
- [Exploiter la sécurité partagée pour une interopérabilité inter-chaîne sécurisée : Comités d'état Lagrange et au-delà](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 juin 2024 – Emmanuel Awosika

De plus, voici quelques présentations perspicaces de [James Prestwich](https://twitter.com/_prestwich) qui peuvent aider à développer une compréhension plus approfondie des ponts :

- [Construire des ponts, pas des jardins clos](https://youtu.be/ZQJWMiX4hT0)
- [Décomposer les ponts](https://youtu.be/b0mC-ZqN8Oo)
- [Pourquoi les ponts brûlent-ils](https://youtu.be/c7cm2kd20j8)