---
title: Passerelles
description: "Un aperçu de la passerelle pour les développeurs"
lang: fr
---

Avec la prolifération des blockchains L1 et des solutions de [mise à l'échelle](/developers/docs/scaling/) L2, ainsi qu'un nombre toujours croissant d'applications décentralisées devenant inter-chaînes, le besoin de communication et de mouvement d'actifs entre les chaînes est devenu une partie essentielle de l'infrastructure du réseau. Différents types de passerelles existent pour aider à rendre cela possible.

## Besoin de ponts {#need-for-bridges}

Des ponts existent pour connecter les différentes blockchains. Ils permettent la connectivité et l'interopérabilité entre les blockchains.

Les blockchains existent dans des environnements cloisonnés, ce qui signifie qu'il n'y a aucun moyen pour les blockchains de négocier et de communiquer avec d'autres blockchains naturellement. En conséquence, alors qu'il pourrait y avoir une activité et une innovation significatives au sein d'un écosystème, elle est limitée par le manque de connectivité et d'interopérabilité avec d'autres écosystèmes.

Les ponts offrent un moyen pour des environnements isolés de la blockchain de se connecter entre eux. Ils établissent une voie de transport entre les blockchains où les jetons, les messages, les données arbitraires et même les appels de [contrats intelligents](/developers/docs/smart-contracts/) peuvent être transférés d'une chaîne à l'autre.

## Avantages des ponts {#benefits-of-bridges}

En termes simples, les ponts débloquent de nombreux cas d'utilisation en permettant aux réseaux blockchain d'échanger des données et de déplacer des actifs entre eux.

Les blockchains ont des forces, des faiblesses et des approches uniques pour construire des applications (comme la vitesse, le débit, le coût, etc.). Les ponts contribuent au développement de l'ensemble de l'écosystème cryptographique en permettant aux blockchains de tirer parti des innovations des unes et des autres.

Pour les développeurs, les ponts activent les éléments suivants :

- le transfert de données, d'informations et d'actifs d'une chaîne à l'autre.
- débloquer de nouvelles fonctionnalités et de nouveaux cas d'utilisation pour les protocoles, les ponts élargissant l'espace de conception de ce que les protocoles peuvent offrir. Par exemple, un protocole d'agriculture de rendement déployé à l'origine sur le réseau principal Ethereum peut offrir des pools de liquidité sur toutes les chaînes compatibles EVM.
- la possibilité de tirer parti des atouts des différentes blockchains. Par exemple, les développeurs peuvent bénéficier des frais moins élevés offerts par les différentes solutions L2 en déployant leurs dApps à travers les rollups, et les chaînes latérales et les utilisateurs peuvent faire le pont entre eux.
- la collaboration entre les développeurs de divers écosystèmes de blockchain pour créer de nouveaux produits.
- attirer des utilisateurs et des communautés de divers écosystèmes vers leurs dApps.

## Comment fonctionnent les ponts ? {#how-do-bridges-work}

Bien qu'il existe de nombreux [types de conceptions de ponts](https://li.fi/knowledge-hub/blockchain-bridges-and-classification/), trois manières de faciliter le transfert inter-chaînes d'actifs se distinguent :

- **Verrouiller et frapper –** Verrouiller les actifs sur la chaîne source et frapper les actifs sur la chaîne de destination.
- **Brûler et frapper –** Brûler les actifs sur la chaîne source et frapper les actifs sur la chaîne de destination.
- **Échanges atomiques –** Échanger des actifs sur la chaîne source contre des actifs sur la chaîne de destination avec une autre partie.

## Types de ponts {#bridge-types}

Les ponts peuvent généralement être classés dans l'un des compartiments suivants :

- **Ponts natifs –** Ces ponts sont généralement construits pour amorcer la liquidité sur une blockchain particulière, ce qui permet aux utilisateurs de transférer plus facilement des fonds vers l'écosystème. Par exemple, le [pont Arbitrum](https://bridge.arbitrum.io/) est conçu pour permettre aux utilisateurs de passer facilement du réseau principal Ethereum à Arbitrum. D'autres ponts de ce type incluent le pont PoS de Polygon, [Optimism Gateway](https://app.optimism.io/bridge), etc.
- **Ponts basés sur un validateur ou un oracle –** Ces ponts s'appuient sur un ensemble de validateurs ou d'oracles externes pour valider les transferts inter-chaînes. Exemples : Multichain et Across.
- **Ponts généralisés de transmission de messages –** Ces ponts peuvent transférer des actifs, ainsi que des messages et des données arbitraires entre les chaînes. Exemples : Axelar, LayerZero, et Nomad.
- **Réseaux de liquidités –** Ces ponts se concentrent principalement sur le transfert d'actifs d'une chaîne à une autre via des échanges atomiques. En général, ils ne prennent pas en charge le passage de messages inter-chaînes. Exemples : Connext et Hop.

## Compromis à prendre en compte {#trade-offs}

Avec les ponts, il n'y a pas de solution parfaite. Au contraire, il n'y a que des compromis faits pour remplir un objectif. Les développeurs et les utilisateurs peuvent évaluer les ponts en fonction des facteurs suivants :

- **Sécurité –** Qui vérifie le système ? Les ponts sécurisés par des validateurs externes sont généralement moins sûrs que les ponts qui sont sécurisés localement ou nativement par les validateurs de la blockchain.
- **Commodité –** Combien de temps faut-il pour finaliser une transaction et combien de transactions un utilisateur doit-il signer ? Pour un développeur, combien de temps faut-il pour intégrer un pont, et quelle est la complexité du processus ?
- **Connectivité –** Quelles sont les différentes chaînes de destination qu'un pont peut connecter (p. ex. rollups, chaînes latérales, autres blockchains de couche 1, etc.) et quel est le degré de difficulté pour intégrer une nouvelle blockchain ?
- **Capacité à transmettre des données plus complexes –** Un pont peut-il permettre le transfert de messages et de données arbitraires plus complexes entre les chaînes, ou ne prend-il en charge que les transferts d'actifs inter-chaînes ?
- **Rentabilité –** Combien coûte le transfert d'actifs entre les chaînes via un pont ? En général, les ponts facturent une redevance fixe ou variable en fonction du coût du gaz et de la liquidité de certains itinéraires. Il est également essentiel d'évaluer la rentabilité d'un pont en fonction du capital nécessaire pour assurer sa sécurité.

À un niveau élevé, les ponts peuvent être classés en deux catégories : ceux qui sont fiables et ceux qui ne le sont pas.

- **De confiance –** Les ponts de confiance sont vérifiés de manière externe. Ils utilisent un ensemble externe de vérificateurs (fédérations avec multi-sig, systèmes de calcul multi-parties, réseau d'oracles) pour envoyer des données à travers les chaînes. Par conséquent, ils peuvent offrir une grande connectivité et permettre un passage de messages entièrement généralisé à travers les chaînes. Ils ont également tendance à être performants en termes de rapidité et de rentabilité. Cela se fait au détriment de la sécurité, car les utilisateurs doivent s'en remettre à la sécurité du pont.
- **Sans confiance –** Ces ponts s'appuient sur les blockchains qu'ils connectent et leurs validateurs pour transférer des messages et des jetons. Elles sont « sans confiance » car elles n'ajoutent pas de nouvelles hypothèses de confiance (en plus des blockchains). Par conséquent, les ponts sans confiance sont considérés comme plus sûrs que les ponts avec confiance.

Pour évaluer les ponts sans confiance en fonction d'autres facteurs, nous devons les décomposer en ponts de passage de messages généralisés et en réseaux de liquidité.

- **Ponts généralisés de transmission de messages –** Ces ponts excellent en matière de sécurité et par leur capacité à transférer des données plus complexes entre les chaînes. En général, ils sont également bons en termes de rentabilité. Cependant, ces points forts se font généralement au détriment de la connectivité pour les ponts de clients légers (ex : IBC) et des inconvénients de vitesse pour les ponts optimistes (ex : Nomad) qui utilisent des preuves de fraude.
- **Réseaux de liquidités –** Ces ponts utilisent des échanges atomiques pour transférer des actifs et sont des systèmes vérifiés localement (c'est-à-dire qu'ils utilisent les validateurs des blockchains sous-jacentes pour vérifier les transactions). Par conséquent, ils excellent en matière de sécurité et de rapidité. En outre, ils sont considérés comme comparativement rentables et offrent une bonne connectivité. Toutefois, le principal inconvénient est leur incapacité à transmettre des données plus complexes, car ils ne prennent pas en charge le passage de messages inter-chaînes.

## Risques liés aux ponts {#risk-with-bridges}

Les ponts sont à l'origine des trois plus [grands piratages de la DeFi](https://rekt.news/leaderboard/) et sont encore à un stade précoce de leur développement. L'utilisation de tout pont comporte les risques suivants :

- **Risque lié aux contrats intelligents –** Bien que de nombreux ponts aient passé avec succès des audits, il suffit d'une seule faille dans un contrat intelligent pour que les actifs soient exposés à des piratages (ex. : [le pont Wormhole de Solana](https://rekt.news/wormhole-rekt/)).
- **Risques financiers systémiques –** De nombreux ponts utilisent des actifs enveloppés pour frapper des versions canoniques de l'actif original sur une nouvelle chaîne. Cela expose l'écosystème à un risque systémique, car nous avons vu des versions enveloppées de jetons exploités.
- **Risque de contrepartie –** Certains ponts utilisent une conception de confiance qui exige des utilisateurs qu'ils partent du principe que les validateurs ne s'entendront pas pour voler leurs fonds. La nécessité pour les utilisateurs de faire confiance à ces acteurs tiers les expose à des risques tels que les rabattements, la censure et d'autres activités malveillantes.
- **Questions ouvertes –** Étant donné que les ponts n'en sont qu'aux premiers stades de leur développement, de nombreuses questions restent sans réponse quant à la manière dont ils se comporteront dans différentes conditions de marché, comme les périodes de congestion du réseau et lors d'événements imprévus tels que des attaques au niveau du réseau ou des retours en arrière de l'état. Cette incertitude présente certains risques, dont le degré est encore inconnu.

## Comment les dApps peuvent utiliser les ponts ? {#how-can-dapps-use-bridges}

Voici quelques applications pratiques que les développeurs peuvent envisager à propos des ponts et du passage de leur dApp à travers la chaîne :

### Intégration des ponts {#integrating-bridges}

Pour les développeurs, il existe de nombreuses façons d'ajouter la prise en charge des ponts :

1. **Construire votre propre pont –** Construire un pont sécurisé et fiable n'est pas chose aisée, surtout si vous empruntez une voie qui minimise la confiance. En outre, elle exige des années d'expérience et d'expertise technique liées aux études d'évolutivité et d'interopérabilité. En outre, il faudrait une équipe expérimentée pour maintenir un pont et attirer suffisamment de liquidités pour le rendre réalisable.

2. **Présenter plusieurs options de pont aux utilisateurs –** De nombreuses [dapps](/developers/docs/dapps/) exigent que les utilisateurs disposent de leur jeton natif pour interagir avec elles. Pour permettre aux utilisateurs d'accéder à leurs jetons, ils proposent différentes options de pont sur leur site web. Cependant, cette méthode est une solution rapide au problème car elle éloigne l'utilisateur de l'interface de la dApp et l'oblige à interagir avec d'autres dApps et ponts. Il s'agit d'une expérience d'intégration lourde, avec un risque accru de faire des erreurs.

3. **Intégrer un pont –** Cette solution ne nécessite pas que la dapp envoie les utilisateurs vers le pont externe et les interfaces des DEX. Il permet aux dApps d'améliorer l'expérience d'intégration des utilisateurs. Toutefois, cette approche a ses limites :

   - L'évaluation et l'entretien des ponts sont difficiles et prennent beaucoup de temps.
   - La sélection d'un seul pont crée un point unique de défaillance et de dépendance.
   - La dApp est limitée par les capacités du pont.
   - Les ponts seuls pourraient ne pas suffire. Les dApps pourraient avoir besoin des DEX pour offrir plus de fonctionnalités telles que les échanges inter-chaînes.

4. **Intégrer plusieurs ponts –** Cette solution résout de nombreux problèmes liés à l'intégration d'un seul pont. Cependant, elle présente également des limites, car l'intégration de plusieurs ponts consomme des ressources et crée des frais généraux techniques et de communication pour les développeurs - la ressource la plus rare dans le domaine de la cryptographie.

5. **Intégrer un agrégateur de ponts –** Une autre option pour les dapps consiste à intégrer une solution d'agrégation de ponts qui leur donne accès à plusieurs ponts. Les agrégateurs de ponts héritent des forces de tous les ponts et ne sont donc pas limités par les capacités d'un seul pont. En particulier, les agrégateurs de ponts assurent généralement la maintenance des intégrations de ponts, ce qui évite à la dApp d'avoir à se préoccuper des aspects techniques et opérationnels d'une intégration de pont.

Cela dit, les agrégateurs de ponts ont aussi leurs limites. Par exemple, s'ils peuvent offrir plus d'options de pont, il existe généralement beaucoup plus de ponts sur le marché que ceux proposés sur la plateforme de l'agrégateur. En outre, tout comme les ponts, les agrégateurs de ponts sont également exposés aux risques liés aux contrats intelligents et à la technologie (plus de contrats intelligents = plus de risques).

Si une dapp emprunte la voie de l'intégration d'un pont ou d'un agrégateur, il existe différentes options en fonction du degré d'intégration souhaité. Par exemple, s'il s'agit uniquement d'une intégration frontale visant à améliorer l'expérience d'accueil des utilisateurs, une dApp intégrera le widget. Toutefois, si l'intégration vise à explorer des stratégies inter-chaînes plus approfondies comme le jalonnement, l'agriculture de rendement, etc., la dApp intègre le SDK ou l'API.

### Déployer une dapp sur plusieurs chaînes {#deploying-a-dapp-on-multiple-chains}

Pour déployer une dapp sur plusieurs chaînes, les développeurs peuvent utiliser des plateformes de développement comme [Alchemy](https://www.alchemy.com/), [Hardhat](https://hardhat.org/), [Moralis](https://moralis.io/), etc. En général, ces plateformes sont fournies avec des plugins composables qui permettent aux dApps de passer d'une chaîne à l'autre. Par exemple, les développeurs peuvent utiliser un proxy de déploiement déterministe proposé par le [plugin hardhat-deploy](https://github.com/wighawag/hardhat-deploy).

#### Exemples :

- [Comment créer des dapps inter-chaînes](https://moralis.io/how-to-build-cross-chain-dapps/)
- [Créer une place de marché NFT inter-chaînes](https://youtu.be/WZWCzsB1xUE)
- [Moralis : Créer des dapps NFT inter-chaînes](https://www.youtube.com/watch?v=ehv70kE1QYo)

### Surveiller l'activité des contrats entre les chaînes {#monitoring-contract-activity-across-chains}

Pour surveiller l'activité des contrats dans les chaînes, les développeurs peuvent utiliser des sous-graphes et des plateformes de développement comme Tenderly pour observer les contrats intelligents en temps réel. Ces plateformes disposent également d'outils qui offrent une plus grande fonctionnalité de surveillance des données pour les activités inter-chaînes, comme la vérification des [événements émis par les contrats](https://docs.soliditylang.org/en/v0.8.14/contracts.html?highlight=events#events), etc.

#### Outils

- [The Graph](https://thegraph.com/en/)
- [Tenderly](https://tenderly.co/)

## En savoir plus {#further-reading}

- [Ponts de blockchain](/bridges/) – ethereum.org
- [Cadre de risque des ponts de L2Beat](https://l2beat.com/bridges/summary)
- [Ponts de blockchain : construire des réseaux de cryptoréseaux](https://medium.com/1kxnetwork/blockchain-bridges-5db6afac44f8) - 8 septembre 2021 – Dmitriy Berenzon
- [Le trilemme de l'interopérabilité](https://blog.connext.network/the-interoperability-trilemma-657c2cf69f17) - 1er octobre 2021 – Arjun Bhuptani
- [Clusters : Comment les ponts de confiance et à confiance minimisée façonnent le paysage multichaîne](https://blog.celestia.org/clusters/) - 4 octobre 2021 – Mustafa Al-Bassam
- [LI.FI : Avec les ponts, la confiance est un spectre](https://blog.li.fi/li-fi-with-bridges-trust-is-a-spectrum-354cd5a1a6d8) - 28 avril 2022 – Arjun Chand
- [L'état des solutions d'interopérabilité des rollups](https://web.archive.org/web/20250428015516/https://research.2077.xyz/the-state-of-rollup-interoperability) - 20 juin 2024 – Alex Hook
- [Exploiter la sécurité partagée pour une interopérabilité inter-chaînes sécurisée : les comités d'état de Lagrange et au-delà](https://web.archive.org/web/20250125035123/https://research.2077.xyz/harnessing-shared-security-for-secure-blockchain-interoperability) - 12 juin 2024 – Emmanuel Awosika

De plus, voici quelques présentations pertinentes de [James Prestwich](https://twitter.com/_prestwich) qui peuvent aider à développer une compréhension plus approfondie des ponts :

- [Construire des ponts, pas des jardins clos](https://youtu.be/ZQJWMiX4hT0)
- [Analyse des ponts](https://youtu.be/b0mC-ZqN8Oo)
- [Pourquoi les ponts brûlent-ils](https://youtu.be/c7cm2kd20j8)
