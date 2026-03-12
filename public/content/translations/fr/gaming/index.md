---
title: Jeux sur Ethereum
lang: fr
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: "Les règles du jeu et l'état peuvent être appliqués par la blockchain Ethereum, et non par les serveurs d'un studio, ce qui représente un avantage clé des jeux sur chaîne"
summaryPoint2: "N'importe qui peut créer des mods, des bots ou des jeux entièrement nouveaux qui se branchent sur les mêmes données ouvertes sur chaîne"
summaryPoint3: "Les L2 spécialement conçus permettent un jeu en temps réel avec des frais moins élevés, tandis que les cadres de développement de jeux rendent la création de jeux sur chaîne plus accessible que jamais"
buttons:
  - content: En savoir plus
    toId: jeux-sur-ethereum
  - content: Explorer les jeux
    toId: jeux
    isSecondary: false
---

## Jeux sur Ethereum {#gaming-on-ethereum}

Les jeux sur Ethereum se présentent sous diverses formes, des jeux qui utilisent la blockchain pour des fonctionnalités spécifiques à ceux où l'ensemble du monde du jeu vit sur chaîne. La blockchain Ethereum peut être utilisée avec les jeux à divers titres. Les jeux peuvent stocker leurs monnaies sous forme de jetons transférables ou d'autres actifs en jeu (personnages, équipements, animaux de compagnie, etc.) sous la forme de [NFT (jetons non fongibles)](/nft/). Les jeux peuvent également utiliser des contrats intelligents pour héberger leur logique, leurs règles et leur état sur chaîne. Ces jeux sont communément appelés « jeux entièrement sur chaîne ».

L'écosystème Ethereum comprend également des [blockchains de couche 2 (L2)](/layer-2/learn/) qui héritent des garanties de sécurité du réseau principal Ethereum tout en étendant l'échelle d'Ethereum et en prenant en charge des cas d'utilisation spécialisés. Les réseaux L2 peuvent offrir des avantages supplémentaires pour les jeux sur chaîne et leurs communautés, car les L2 peuvent offrir des temps de confirmation plus rapides, un volume de traitement plus élevé et des frais moins élevés, ce qui rend le jeu plus rapide et plus accessible.

## Aperçu de l'écosystème de jeu d'Ethereum {#ethereums-gaming-ecosystem-overview}

- **Couches 2 :** Avec des frais moins chers et des temps de transaction courts, les L2 sont devenus un endroit courant pour lancer des jeux. Les principales couches 2 avec des jeux incluent : Starknet, Immutable, Base et Abstract.
- **Infrastructure :** Pour faciliter le développement de jeux sur chaîne, il existe un certain nombre de piles d'outils qui peuvent être utilisées avec votre propre projet, notamment : Cartridge, Dojo, Proof of Play et Thirdweb.
- **Guildes de jeu :** Les joueurs qui souhaitent faire partie d'une communauté de joueurs peuvent rejoindre des guildes de jeu pour élaborer des stratégies et collaborer avec d'autres joueurs de la guilde. Les guildes notables incluent : YGG, WASD, LegacyGG, Gaming Grid, OLAGG, et plus encore.
- **Jeux :** Les jeux Ethereum se présentent sous différentes formes et tailles, allant de la stratégie en temps réel de _Realms: Eternum_, au MMO d'_Axie: Atia's Legacy_, en passant par le RPG d'action de _Fableborn_ et même des plateformes DeFi ludiques comme _Ponziland_. Avec de nouveaux jeux lancés régulièrement sur différentes chaînes, il y a toujours quelque chose de nouveau à explorer.

## Jeux à essayer {#games}

<CategoryAppsGrid category="gaming" />

## Caractéristiques des jeux sur chaîne {#features-of-onchain-games}

1. **Moyen sécurisé d'échanger des biens numériques**

   Les actifs en jeu échangeables peuvent être échangés entre les joueurs contre d'autres actifs en jeu ou des jetons sur cette chaîne. Dans le passé, les jeux étaient souvent confrontés au défi de faciliter des échanges équitables entre les joueurs, en particulier pour les objets rares et de grande valeur. Les places de marché tierces et les échanges de pair à pair ont souvent conduit des joueurs à être trompés ou à se faire escroquer leurs biens les plus précieux. Comme les actifs sur chaîne suivent une structure de données établie, ils peuvent être facilement intégrés aux places de marché existantes, ce qui permet aux joueurs d'avoir l'esprit tranquille lorsqu'ils les échangent. Les progrès des AMM permettent également aux joueurs d'échanger instantanément certains objets sans avoir à attendre qu'une contrepartie (acheteur/vendeur) finalise leur échange.

2. **Origine transparente des actifs**

   Les contrefaçons et les copies d'originaux peuvent être un problème considérable lors de l'évaluation d'objets, surtout si la personne n'est pas très familière avec la façon de distinguer un vrai d'un faux. Les actifs sur chaîne ont toujours un historique complet de qui (quel portefeuille) les a possédés et leur adresse d'origine. Même s'il existe une copie parfaite de l'objet sur chaîne, elle se distingue clairement de l'original en fonction de son contrat intelligent d'origine, ce qui atténue le risque de fraude.

3. **Logique transparente**

   Les jeux entièrement sur chaîne utilisent des contrats intelligents pour leur fonctionnalité. Cela signifie que n'importe qui peut examiner et vérifier la logique du jeu, en s'assurant qu'elle fonctionne comme les développeurs l'ont prévu. Cette transparence de la logique permet également à d'autres développeurs de créer de nouveaux contrats intelligents qui peuvent étendre le jeu ou être intégrés à certaines de ses fonctionnalités.

4. **Succès prouvables**

   Dans les jeux entièrement sur chaîne, chaque action du joueur est enregistrée sur la blockchain. Il est ainsi très facile de vérifier si un joueur a effectué les actions requises pour une certaine étape/un certain succès. En raison de la nature immuable des blockchains, ces enregistrements de succès resteront intacts tant que la chaîne continuera de fonctionner, et pourront être vérifiés par n'importe quelle partie (pas seulement les développeurs, comme c'est le cas dans les jeux traditionnels).

5. **Jeux éternels**

   Les joueurs investissent beaucoup de temps et d'efforts pour construire leur réputation et leurs personnages dans le jeu, mais ces progrès peuvent être facilement perdus si les développeurs décident de fermer les serveurs (surtout s'il s'agit d'un jeu en ligne). Étant donné que les jeux entièrement sur chaîne stockent leur logique et leur état sur chaîne, les joueurs peuvent toujours interagir avec les contrats intelligents du jeu, même si le développeur principal du jeu cesse le développement. De tels jeux peuvent toujours être joués et continuer à recevoir des mises à jour de leurs communautés car leur logique fonctionne toujours sur la blockchain.

## Comment les jeux intègrent les blockchains {#how-games-integrate-blockchains}

Les développeurs de jeux peuvent décider d'intégrer différentes fonctionnalités d'Ethereum dans leurs jeux. Le simple fait que les fonctionnalités existent ne signifie pas que tous les jeux construits sur Ethereum doivent toutes les utiliser, car il existe des solutions alternatives (avec leurs propres avantages et inconvénients) que les développeurs peuvent utiliser à la place.

### Connexion avec Ethereum {#sign-in-with-ethereum}

Les joueurs peuvent utiliser leurs comptes sur chaîne pour se connecter au jeu. Cela se fait généralement en signant une transaction avec le portefeuille web3 d'un joueur. Les joueurs peuvent alors détenir leurs actifs en jeu et conserver leur réputation de joueur dans un seul compte, sur tous les jeux auxquels ils se connectent en utilisant le même portefeuille. L'[EVM](/developers/docs/evm/) d'Ethereum est une norme couramment utilisée sur de nombreuses blockchains, de sorte qu'un joueur peut souvent utiliser le même compte pour se connecter à des jeux sur n'importe quelle blockchain compatible EVM prise en charge par le portefeuille (remarque : certains portefeuilles web3 nécessitent une importation RPC manuelle, en particulier pour les blockchains plus récentes, avant de pouvoir être utilisés pour faire quoi que ce soit sur cette chaîne).

### Jetons fongibles {#fungible-tokens}

Tout comme l'Ether, les ressources et les monnaies fongibles en jeu peuvent être stockées sur chaîne sous forme de jetons fongibles. Les jetons peuvent ensuite être envoyés entre les adresses et utilisés dans des contrats intelligents, permettant aux joueurs d'échanger ou d'offrir des ressources et des monnaies en jeu sur des marchés ouverts.

### Jetons non fongibles {#non-fungible-tokens}

Les jetons non fongibles (NFT) peuvent représenter des éléments de jeu uniques, tels que des personnages, des objets, des terrains ou même des états de sauvegarde. Avec des métadonnées dynamiques, les NFT peuvent évoluer en réponse aux événements du jeu, permettant aux actifs de conserver leur histoire au fil du temps. Par exemple, les NFT de bête dans Loot Survivor enregistrent en permanence lorsqu'un joueur spécifique bat une créature unique, intégrant ce résultat dans l'actif NFT lui-même. Ce type de conception s'oriente vers des jeux où les actifs sont persistants, avec état, et potentiellement utilisables à travers de multiples expériences sur chaîne, plutôt que de simples objets de collection statiques.

### Contrats intelligents {#smart-contracts}

Les jeux entièrement sur chaîne utilisent des contrats intelligents pour créer une logique de jeu transparente et immuable. Dans de tels cas, la blockchain sert de backend au jeu, remplaçant la nécessité d'héberger sa logique et son stockage de données sur un serveur centralisé. (Remarque : tous les jeux web3 ne sont pas des jeux entièrement sur chaîne. Comme mentionné précédemment, cela dépend au cas par cas de la quantité de données et de logique du jeu qui est stockée sur chaîne, par rapport à une autre couche de disponibilité des données ou à un serveur classique.)

## Évolution des améliorations de l'expérience utilisateur des joueurs {#evolution-of-player-ux-improvements}

### Interopérabilité et jeu inter-chaînes {#interoperability-and-cross-chain-play}

Les progrès en matière d'interactions inter-chaînes et de ponts permettent aux joueurs d'accéder aux jeux sur Ethereum de manière plus transparente que jamais. Les jeux peuvent être déployés sur plusieurs blockchains, et les actifs sur chaîne d'un jeu peuvent être intégrés par un autre jeu. Dans le passé, les joueurs devaient généralement ponter leurs fonds vers une autre chaîne avant de pouvoir les utiliser dans le jeu. Aujourd'hui, les jeux intègrent couramment des ponts de jetons vers d'autres chaînes pour faciliter l'intégration des joueurs.

### Améliorations de la mise à l'échelle et des frais de gaz {#scalability-and-gas-fee-improvements}

En 2017, l'engouement autour des CryptoKitties a considérablement augmenté les frais de gaz pour tous les utilisateurs effectuant des transactions sur Ethereum. Depuis lors, de nombreuses propositions d'amélioration d'Ethereum ont été déployées avec succès dans les mises à niveau du réseau, augmentant la bande passante du réseau principal d'Ethereum et réduisant considérablement les frais de transaction moyens. Les couches 2 élargissent encore le débit disponible, réduisant les frais de transaction à quelques centimes, voire moins. Des frais moins élevés et un débit plus élevé ont élargi les cas d'utilisation de jeux qui peuvent être construits sur Ethereum, prenant en charge des actions à grand volume et des microtransactions en jeu qui n'excluent pas les joueurs ordinaires.

### Connexions sociales {#social-logins}

La connexion avec un compte Ethereum sur chaîne, qui peut être utilisé sur toutes les blockchains compatibles EVM, est l'une des méthodes d'authentification les plus courantes. Certaines chaînes non-EVM l'utilisent également comme option pour créer un compte. Cependant, si un nouveau joueur n'a pas de compte Ethereum existant et souhaite créer facilement un compte pour se connecter à un jeu, l'[abstraction de compte](/roadmap/account-abstraction/) lui permet de se connecter avec ses comptes sociaux et de créer un compte Ethereum en arrière-plan.

### Paymaster et clés de session {#paymaster-and-session-keys}

Payer des frais de gaz pour envoyer des transactions sur chaîne ou interagir avec des contrats intelligents peut être un point de friction important pour de nombreux nouveaux joueurs. Les comptes Paymaster peuvent être financés par le joueur ou subventionnés par le jeu. Les clés de session permettent au joueur de rester connecté au jeu pendant toute la durée de sa session, ne lui demandant de signer que le premier message de sa session, les messages suivants étant signés en arrière-plan.

Il existe des philosophies contrastées autour de ces mécanismes. Un exemple de premier plan est le Kamigotchi d'Initia, qui traite le gaz payé par le joueur comme un revenu direct. En revanche, l'écosystème de jeu Realms.World, qui comprend plus de 4 jeux entièrement sur chaîne en direct sur Starknet, adopte l'approche inverse. Tous les jeux de l'écosystème utilisent le Cartridge Paymaster, permettant aux joueurs d'interagir avec les jeux sans frais de gaz. Alors que Kamigotchi intègre les frais de gaz dans la conception économique, les jeux de Realms.World considèrent les coûts de gaz principalement comme un obstacle à l'expérience du joueur.

## Commencez à jouer sur Ethereum {#get-started-with-gaming-on-ethereum}

1. **Trouvez un jeu amusant à jouer** - Parcourez les jeux listés ci-dessus ou explorez des plateformes comme [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/) et [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Configurez votre portefeuille crypto** - Vous aurez besoin d'un portefeuille pour gérer vos actifs numériques en jeu et (dans certains cas) pour vous connecter aux jeux. [Choisissez un portefeuille ici](/wallets/find-wallet/).
3. **Alimentez votre portefeuille** - Acquérez de l'Ether (ETH) ou des jetons pertinents pour le réseau de couche 2 que vous prévoyez d'utiliser.
4. **Jouez** - Commencez à jouer et profitez de la véritable propriété de votre progression dans le jeu.
