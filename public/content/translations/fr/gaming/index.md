---
title: Le jeu sur Ethereum
description: "Découvrez comment Ethereum propulse les jeux onchain avec des règles vérifiables, des actifs appartenant aux joueurs et des écosystèmes ouverts sur lesquels tout le monde peut construire."
lang: fr
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - "Les règles et l'état du jeu peuvent être appliqués par la chaîne de blocs Ethereum, et non par les serveurs d'un studio, ce qui représente un avantage clé des jeux onchain"
  - "N'importe qui peut créer des mods, des bots ou des jeux entièrement nouveaux qui se connectent aux mêmes données onchain ouvertes"
  - "Les l2 spécialement conçues permettent un jeu en temps réel avec des frais réduits, tandis que les frameworks de développement de jeux rendent la création de jeux onchain plus accessible que jamais"
buttons:
  - content: En savoir plus
    toId: gaming-on-ethereum
  - content: Explorer les jeux
    toId: games
    isSecondary: false
---

## Le jeu sur Ethereum {#gaming-on-ethereum}

Le jeu sur Ethereum se présente sous diverses formes, allant des jeux qui utilisent la chaîne de blocs pour des fonctionnalités spécifiques à ceux où le monde entier du jeu vit onchain. La chaîne de blocs Ethereum peut être utilisée avec les jeux à divers titres. Les jeux peuvent stocker leurs devises sous forme de jetons transférables ou d'autres actifs en jeu (personnages, équipement, familiers, etc.) sous la forme de [jetons non fongibles (NFT)](/nft/). Les jeux peuvent également utiliser des contrats intelligents pour héberger leur logique, leurs règles et leur état onchain. Ces jeux sont communément appelés « jeux entièrement onchain ».

L'écosystème Ethereum comprend également des [chaînes de blocs de couche 2 (l2)](/layer-2/learn/) qui héritent des garanties de sécurité du réseau principal Ethereum tout en étendant l'échelle d'Ethereum et en prenant en charge des cas d'utilisation spécialisés. Les réseaux l2 peuvent offrir des avantages supplémentaires pour les jeux onchain et leurs communautés en raison de leurs temps de confirmation plus rapides et de leurs frais réduits, rendant le jeu plus accessible.

À mesure que la [couche 1 (l1) évolue](/roadmap/scaling/), les jeux commencent à revenir sur le réseau principal Ethereum. Un exemple est [Asphodel](https://x.com/asph0d37), un jeu entièrement onchain actuellement en phase de test sur la l1 d'Ethereum. Cependant, la plupart des jeux utilisent encore des solutions l2 pour bénéficier de frais réduits.

## L'essor du jeu sur Ethereum {#rise-of-ethereum-gaming}

Les MMO traditionnels comme EVE Online, World of Warcraft, MapleStory et RuneScape ont prouvé que les économies virtuelles pouvaient générer de la valeur dans le monde réel. Les joueurs farmaient de l'or pour en tirer un revenu, l'économie d'EVE reflétait les systèmes financiers réels, et la culture des mods (Counter-Strike, DotA 2, serveurs Minecraft) a montré que les joueurs voulaient composer à partir de mondes existants. Même la [célèbre frustration de Vitalik face à un nerf dans World of Warcraft](https://youtu.be/Letsfuhpobw?t=140) est devenue un symbole précoce des problèmes liés aux écosystèmes de jeu fermés. Mais les studios contrôlaient tout ; ils pouvaient bannir des comptes, fermer des serveurs ou revendiquer la propriété du contenu créé par les joueurs.

Lors du lancement d'Ethereum, **les concepteurs de jeux ont vu une opportunité de construire des mondes qui ne pourraient pas être fermés**. [Comme l'a dit Ronan Sandford, créateur de Conquest.eth](https://ronan.eth.limo/blog/infinite-games/) : « Dès le jour où je suis tombé sur Ethereum, j'ai été séduit par l'idée de créer des jeux qui fonctionnent et évoluent indépendamment de leur créateur. »

La chaîne de blocs Ethereum a permis de créer des mondes où les règles ne peuvent pas être modifiées arbitrairement, où l'état ne peut pas être supprimé et où n'importe qui peut créer des extensions qui vivent aussi longtemps que le réseau existe. C'est quelque chose qu'Ethereum fournit nativement.

## Aperçu de l'écosystème de jeu d'Ethereum {#ethereums-gaming-ecosystem-overview}

- **Couches 2 (l2) :** Avec des frais moins élevés et des temps de transaction courts, les l2 d'Ethereum sont devenues un endroit courant pour le lancement de jeux. Le paysage des l2 continue d'évoluer, avec des écosystèmes de jeu Web3 de premier plan comme Ronin (à l'origine une chaîne latérale pour Axie Infinity) qui sont récemment passés à l'architecture de couche 2 d'Ethereum, héritant des garanties de sécurité d'Ethereum tout en conservant son infrastructure optimisée pour le jeu. Les l2 actuelles de premier plan pour le jeu incluent : [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/) et [Base](https://www.base.org/).
- **Infrastructure :** Pour faciliter le développement de jeux onchain, un certain nombre de piles d'outils existent ; [Cartridge](https://cartridge.gg/) (offrant des clés de session, des transactions sans gaz via un paymaster et une authentification basée sur WebAuthn via Cartridge Controller), [Dojo](https://dojoengine.org/) (un framework de jeux prouvables avec prise en charge native de l'abstraction de compte), [MUD](https://mud.dev/) (un moteur de jeu onchain basé sur l'EVM). D'autres, comme [Proof of Play](https://proofofplay.com/) et [Thirdweb](https://thirdweb.com/), permettent aux développeurs de créer des jeux avec des expériences utilisateur similaires au Web2.
- **Communautés de jeu :** L'écosystème de jeu d'Ethereum est soutenu par des guildes de jeu, notamment ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx) et [OLAGG](https://x.com/OLAGuildGames)) pour la collaboration entre joueurs, des plateformes de découverte comme [GAM3S.GG](https://games.gg/), et des médias comme [Gaming Daily](https://x.com/GamingDailyx) pour l'analyse des jeux et la couverture de l'écosystème. Certains couvrent tous ces aspects, comme [FOCGERS](https://x.com/FOCGERS).
- **Genres de jeux :** Certains genres de jeux s'alignent naturellement avec les propriétés uniques de la chaîne de blocs Ethereum : **état persistant**, **logique vérifiable** et **économies appartenant aux joueurs**. Les développeurs abordent l'intégration différemment. Certains créent des jeux entièrement onchain où toute la logique et l'état vivent sur la chaîne de blocs, tandis que d'autres utilisent la chaîne de blocs de manière minimale pour la propriété d'actifs comme les cosmétiques NFT. Les développeurs découvrent quels types de gameplay bénéficient le plus de l'architecture onchain, notamment :
   1. **Dungeon Crawlers et Roguelikes :** Les donjons à mort permanente entièrement onchain de Loot Survivor avec des scores élevés vérifiables, le Maze of Gains d'Onchain Heroes ainsi que sa refonte sur le thème d'Axie appelée Axie: Den of Mysteries, qui combinent l'exploration de labyrinthes avec des mécaniques de finance décentralisée (DeFi).
   2. **MMO :** Le MMO saisonnier « risk-to-earn » Gold Rush de Cambria avec des mécaniques de JcJ et d'extraction, où chaque pas en dehors des zones de sécurité comporte de véritables enjeux. Le jeu de stratégie MMO entièrement onchain de ForTheKingdom, proposant des guerres de factions à grande échelle. Axie Infinity: Atia's Legacy, un MMO onchain sur Ronin où les joueurs s'affrontent dans des donjons JcE et des batailles JcJ avec de véritables enjeux. 
   3. **Stratégie 4X et Grande Stratégie :** Conquest.eth, un jeu sans permission de conquête spatiale et de diplomatie où les joueurs stakent des jetons sur des planètes pour produire des flottes et former des alliances, dans un jeu qui fonctionne pour toujours onchain. Realms apporte les mécaniques 4X d'Ethereum dans un cadre fantastique, où les joueurs contrôlent des Royaumes (NFT de terrains) pour extraire des ressources, construire des armées et s'engager dans une diplomatie complexe au sein d'une économie entièrement dirigée par les joueurs. Dark Forest a été le pionnier du genre avec des mécaniques de brouillard de guerre basées sur des preuves à divulgation nulle de connaissance et est actuellement maintenu en tant que fork communautaire par DFArchon.
   4. **Stratégie et Tactique :** Realms inclut les matchs de stratégie intenses d'une heure basés sur des buy-ins de Blitz, et le prochain autobattler Asphodel est en cours de test sur le réseau principal Ethereum.
   5. **Jeux de cartes à collectionner :** Showdown combine la stratégie des jeux de cartes à collectionner avec l'intensité du poker. Axie Infinity Classic est une combinaison d'échecs, de poker et de Pokémon, et le premier jeu Web3 à atteindre des millions de joueurs.
   6. **Arènes compétitives :** La Duel Arena de Cambria, où les joueurs stakent des ETH sur des duels à mort 1v1 au rythme effréné. AveForge, une arène de combat de mechas compétitive où les joueurs pilotent des mechas personnalisables.

## Jeux à essayer {#games}

<CategoryAppsGrid category="gaming" />

## Caractéristiques des jeux onchain {#features-of-onchain-games}

1. **Moyen sécurisé d'échanger des biens numériques**

   Les actifs en jeu négociables peuvent être échangés entre les joueurs contre d'autres actifs en jeu ou des jetons sur cette chaîne. Par le passé, les jeux étaient souvent confrontés au défi de faciliter un commerce équitable entre les joueurs, en particulier pour les objets rares et précieux. Les places de marché tierces et les échanges de pair à pair conduisaient souvent les joueurs à être trompés ou escroqués de leurs biens les plus précieux. Étant donné que les actifs onchain suivent une structure de données établie, ils peuvent être facilement intégrés aux places de marché existantes, offrant aux joueurs une tranquillité d'esprit lors de leurs échanges. Les avancées des teneurs de marché automatisés (AMM) permettent également aux joueurs d'échanger instantanément certains objets sans avoir à attendre qu'une contrepartie (acheteur/vendeur) finalise leur transaction.

2. **Origine transparente des actifs**

   Les faux et les copies d'originaux peuvent être un problème considérable lors de l'évaluation des objets, surtout si la personne n'est pas très familière avec la façon de distinguer un vrai objet d'un faux. Les actifs onchain ont toujours un historique complet de qui (quel portefeuille) les a possédés et de leur adresse d'origine. Même s'il existe une copie parfaite de l'objet onchain, elle se distingue clairement de l'original en fonction de son contrat intelligent d'origine, atténuant ainsi le risque de fraude.

3. **Logique transparente**

   Les jeux entièrement onchain utilisent des contrats intelligents pour leurs fonctionnalités. Cela signifie que n'importe qui peut examiner et vérifier la logique du jeu, s'assurant qu'il fonctionne comme les développeurs l'ont prévu. Cette transparence de la logique permet également à d'autres développeurs de créer de nouveaux contrats intelligents qui peuvent étendre le jeu ou être intégrés à certaines de ses fonctionnalités.

4. **Réalisations prouvables**

   Dans les jeux entièrement onchain, chaque action du joueur est enregistrée sur la chaîne de blocs. Cela permet de vérifier très facilement si un joueur a effectué les actions requises pour une certaine étape/réalisation. En raison de la nature immuable des chaînes de blocs, ces enregistrements de réalisations resteront intacts tant que la chaîne continuera de fonctionner, et pourront être vérifiés par n'importe quelle partie (pas seulement les développeurs, comme c'est souvent le cas dans les jeux traditionnels).

5. **Jeux éternels**

   Les joueurs investissent beaucoup de temps et d'efforts pour construire leur réputation et leurs personnages en jeu, mais ces progrès peuvent facilement être perdus si les développeurs décident de fermer les serveurs (surtout s'il s'agit d'un jeu en ligne). Étant donné que les jeux entièrement onchain stockent leur logique et leur état onchain, les joueurs peuvent toujours interagir avec les contrats intelligents du jeu, même si le développeur principal du jeu cesse le développement. Ces jeux peuvent toujours être joués et continuer à recevoir des mises à jour de leurs communautés car leur logique s'exécute toujours sur la chaîne de blocs.

## Comment les jeux intègrent les chaînes de blocs {#how-games-integrate-blockchains}

Les développeurs de jeux peuvent décider d'intégrer différentes fonctionnalités d'Ethereum dans leurs jeux. Ce n'est pas parce que les fonctionnalités existent que chaque jeu construit sur Ethereum doit toutes les utiliser, car il existe des solutions alternatives (avec leurs propres avantages et inconvénients) que les développeurs peuvent utiliser à la place.

### Se connecter avec Ethereum {#sign-in-with-ethereum}

Les joueurs peuvent utiliser leurs comptes onchain pour se connecter au jeu. Cela est généralement facilité par la signature d'une transaction avec le portefeuille Web3 d'un joueur. Les joueurs peuvent ensuite conserver leurs actifs en jeu et transporter leur réputation de joueur sur un seul compte, à travers tous les jeux auxquels ils se connectent en utilisant le même portefeuille. L'[EVM](/developers/docs/evm/) d'Ethereum est un standard couramment utilisé sur de nombreuses chaînes de blocs, de sorte qu'un joueur peut souvent utiliser le même compte pour se connecter à des jeux sur n'importe quelle chaîne de blocs compatible EVM que le portefeuille prend en charge (remarque : certains portefeuilles Web3 nécessitent une importation RPC manuelle, en particulier pour les chaînes de blocs plus récentes, avant de pouvoir être utilisés pour faire quoi que ce soit sur cette chaîne).

### Jetons fongibles {#fungible-tokens}

Tout comme l'ether, les ressources et les devises fongibles en jeu peuvent être stockées onchain sous forme de jetons fongibles. Les jetons peuvent ensuite être envoyés entre des adresses et utilisés dans des contrats intelligents, permettant aux joueurs d'échanger ou d'offrir des ressources et des devises en jeu sur des marchés ouverts.

### Jetons non fongibles {#non-fungible-tokens}

Les jetons non fongibles représentent des actifs numériques uniques avec des propriétés distinctes et des registres de propriété stockés onchain. Ethereum héberge le plus grand écosystème de NFT, [OpenSea](https://opensea.io/) restant la place de marché généraliste dominante pour l'échange de NFT de jeu à travers les chaînes. Les développements récents montrent que les NFT évoluent au-delà des objets de collection statiques, tels que les Axies d'Axie Infinity, pour devenir des actifs numériques dynamiques et fonctionnels qui peuvent être utilisés pour jouer à des jeux onchain.

Les NFT de Bêtes dans Loot Survivor sur Starknet stockent des métadonnées entièrement onchain, y compris l'espèce, le niveau, la santé, le type de combat et l'historique des défaites. Cela fait de chaque NFT un **enregistrement vérifiable et permanent onchain des événements de jeu**. Lorsqu'un joueur est le premier à vaincre une Bête nommée, il frappe le NFT, et cette Bête continue ensuite d'apparaître dans le donjon de tous les autres joueurs ; chaque mort ultérieure face à cette Bête est enregistrée dans ses métadonnées, créant des interactions entre les joueurs sans nécessiter de serveurs centraux. Les morts des joueurs génèrent des récompenses pour le NFT de la Bête possédée. 

Les NFT ROM de Gigaverse fonctionnent comme des usines, générant des matériaux et des ressources au fil du temps. Au lieu de posséder un seul objet, les joueurs peuvent posséder une infrastructure de fabrication, introduisant **des mécaniques de chaîne d'approvisionnement et une génération de valeur continue dans les économies de jeu**. Les NFT « Core » de Cambria sur Abstract inversent le modèle des microtransactions en permettant aux joueurs de frapper des familiers et des skins. Les détenteurs de Core gagnent des Shards, les brûlent pour créer de nouveaux cosmétiques et les échangent sur des marchés dirigés par les joueurs, tandis que le studio gagne des redevances plutôt que des ventes directes.  


### Contrats intelligents {#smart-contracts}

Les jeux entièrement onchain utilisent des contrats intelligents pour créer une logique de jeu transparente et immuable. Dans de tels cas, la chaîne de blocs sert de backend au jeu, remplaçant la nécessité d'héberger sa logique et le stockage de ses données sur un serveur centralisé. (Remarque : tous les jeux Web3 ne sont pas des jeux entièrement onchain. Comme mentionné précédemment, la quantité de données et de logique du jeu stockée onchain, par rapport à une autre couche de disponibilité des données ou sur un serveur classique, dépend de chaque cas.)

## Évolution des améliorations de l'expérience utilisateur (UX) des joueurs {#evolution-of-player-ux-improvements}

### Interopérabilité et jeu inter-chaîne {#interoperability-and-cross-chain-play}

Les avancées dans les interactions inter-chaînes et les ponts permettent aux joueurs d'accéder aux jeux sur Ethereum de manière plus fluide que jamais. Les jeux peuvent être déployés sur plusieurs chaînes de blocs, et les actifs onchain d'un jeu peuvent être intégrés par un autre jeu. Par le passé, les joueurs devaient généralement utiliser un pont pour transférer leurs fonds vers une autre chaîne avant de pouvoir commencer à les utiliser en jeu. De nos jours, les jeux intègrent couramment des ponts de jetons vers d'autres chaînes pour faciliter l'intégration des joueurs.

### Améliorations de l'évolutivité et des frais de gaz {#scalability-and-gas-fee-improvements}

En 2017, l'engouement autour de CryptoKitties a considérablement augmenté les frais de gaz pour tous les utilisateurs effectuant des transactions sur Ethereum. Depuis lors, de nombreuses propositions d'amélioration d'Ethereum (EIP) ont été déployées avec succès lors des mises à niveau du réseau, augmentant la bande passante du réseau principal Ethereum et réduisant considérablement les frais de transaction moyens. Les l2 augmentent encore le débit disponible, réduisant les frais de transaction à quelques centimes, voire moins. Des frais réduits et un débit plus élevé ont élargi les cas d'utilisation de jeu qui peuvent être construits sur Ethereum, prenant en charge des actions à volume élevé et des microtransactions en jeu qui n'excluent pas les joueurs de tous les jours.

### Connexions sociales {#social-logins}

La connexion avec un compte Ethereum onchain, qui peut être utilisé sur toutes les chaînes de blocs compatibles EVM, est l'une des méthodes d'authentification les plus courantes. Certaines chaînes non-EVM l'utilisent également comme option pour créer un compte. Cependant, si un nouveau joueur n'a pas de compte Ethereum existant et souhaite créer facilement un compte pour se connecter à un jeu, l'[abstraction de compte](/roadmap/account-abstraction/) lui permet de se connecter avec ses comptes sociaux et de créer un compte Ethereum en arrière-plan.

### Paymaster et clés de session {#paymaster-and-session-keys}

Payer des frais de gaz pour envoyer des transactions onchain ou interagir avec des contrats intelligents peut être un point de friction important pour de nombreux nouveaux joueurs. Les comptes paymaster peuvent être financés par le joueur ou subventionnés par le jeu. Les clés de session permettent au joueur de rester connecté au jeu pendant toute la durée de sa session, l'obligeant à signer uniquement le premier message de sa session, les messages suivants étant signés en arrière-plan.

Il existe des philosophies contrastées autour de ces mécaniques. Un exemple de premier plan est Kamigotchi d'Initia, qui traite le gaz payé par les joueurs comme un revenu direct. En revanche, l'écosystème de jeu Realms.World, qui comprend plus de 4 jeux entièrement onchain en direct sur Starknet, adopte l'approche inverse. Tous les jeux de l'écosystème utilisent le paymaster de Cartridge, permettant aux joueurs d'interagir avec les jeux sans aucun coût de gaz. Là où Kamigotchi intègre les frais de gaz dans sa conception économique, les jeux Realms.World considèrent les coûts de gaz principalement comme un obstacle à l'expérience du joueur.

## Démarrer avec le jeu sur Ethereum {#get-started-with-gaming-on-ethereum}

1. **Trouvez un jeu amusant auquel jouer** - Parcourez les jeux listés ci-dessus, ou explorez des plateformes comme [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) et [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configurez votre portefeuille crypto** - Les joueurs ont besoin d'un portefeuille pour gérer les actifs numériques en jeu et (dans certains cas) pour se connecter aux jeux. [Trouvez un portefeuille ici](/wallets/find-wallet/).
3. **Financez votre portefeuille** - Acquérez de l'ether (ETH) ou des jetons pertinents pour le réseau l2 sur lequel vous prévoyez de jouer. [Découvrez où obtenir de l'ETH ici](/get-eth/). 
4. **Jouez** - Commencez à jouer et profitez d'une véritable propriété de votre progression en jeu !