---
title: Gaming on Ethereum
description: Learn how Ethereum powers onchain games with verifiable rules, player-owned assets, and open ecosystems that anyone can build on.
lang: en
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoints:
  - "Game rules and state can be enforced by the Ethereum blockchain, not a studio's servers, representing a key benefit of onchain games"
  - "Anyone can build mods, bots, or entirely new games that plug into the same open onchain data"
  - "Purpose-built L2s enable real-time gameplay with lower fees, while game development frameworks make building onchain games more accessible than ever"
buttons:
  - content: Learn more
    toId: gaming-on-ethereum
  - content: Explore games
    toId: games
    isSecondary: false
---

## Gaming on Ethereum {#gaming-on-ethereum}

Gaming on Ethereum comes in various forms, from games that use the blockchain for specific features to those where the entire game world lives onchain. The Ethereum blockchain can be used with games in various capacities. Games can store their currencies as transferable tokens or other in-game assets (characters, equipment, pets, etc.) in the form of [non-fungible tokens (NFTs)](/nft/). Games can also utilize smart contracts to host their logic, rules, and state onchain. Such games are commonly referred to as "fully onchain games."

The Ethereum ecosystem also includes [layer 2 blockchains (L2s)](/layer-2/learn/) that inherit the security guarantees of Ethereum Mainnet while extending Ethereum's scale and supporting specialized use cases. L2 networks can provide additional benefits for onchain games and their communities due to their faster confirmation times and lower fees, making gameplay more accessible.

As [layer 1 (L1) scales](/roadmap/scaling/), games are starting to return to the Ethereum Mainnet. One example is [Asphodel](https://x.com/asph0d37), a fully onchain game currently in playtesting on Ethereum L1. However, most games still utilize L2 solutions to benefit from lower fees.

## Rise of Ethereum gaming {#rise-of-ethereum-gaming}

Traditional MMOs like EVE Online, World of Warcraft, MapleStory and RuneScape proved that virtual economies could generate real-world value. Players farmed gold for income, EVE's economy mirrored real financial systems, and mod culture (Counter-Strike, DotA 2, Minecraft servers) showed players wanted to compose upon existing worlds. Even Vitalik’s [famous frustration over a World of Warcraft nerf](https://youtu.be/Letsfuhpobw?t=140) became an early symbol of the of the problems with closed gaming ecosystems. But studios controlled everything; they could ban accounts, shut down servers, or claim ownership of player-created content.

When Ethereum launched, **game designers saw an opportunity to build worlds that could not be shut down**. [As Ronan Sandford, creator of Conquest.eth, put it](https://ronan.eth.limo/blog/infinite-games/): "From the day I stumbled upon Ethereum, I was hooked on the idea of creating games that run and evolve independently of their creator."

The Ethereum blockchain enabled worlds where rules can't be arbitrarily changed, state can't be deleted, and anyone can build extensions that live as long as the network exists. This is something that Ethereum natively provides.

## Ethereum's gaming ecosystem overview {#ethereums-gaming-ecosystem-overview}

- **Layer 2s:** With cheaper fees and short transaction times, Ethereum L2s became a common place for games to launch. The L2 landscape continues to evolve, with leading web3 gaming ecosystems like Ronin (originally a sidechain for Axie infinity) recently transitioning to Ethereum layer 2 architecture inheriting Ethereum's security guarantees while retaining its gaming-optimized infrastructure. Current leading L2s for gaming include: [Ronin](https://www.roninchain.com/), [Starknet](https://www.starknet.io/), [Abstract](https://abs.xyz/), [Immutable](https://www.immutable.com/), and [Base](https://www.base.org/).
- **Infrastructure:** To make developing onchain games easier, a number of tool stacks exist; [Cartridge](https://cartridge.gg/) (offering session keys, gasless transactions via Paymaster, and WebAuthn-based authentication through Cartridge Controller), [Dojo](https://dojoengine.org/) (a provable games framework with native account abstraction support), [MUD](https://mud.dev/) (an EVM-based onchain game engine). Others, like [Proof of Play](https://proofofplay.com/) and [Thirdweb](https://thirdweb.com/), allow developers to build games with Web2-like user experiences.
- **Gaming communities:** Ethereum's gaming ecosystem is supported by gaming guilds, including ([YGG](https://x.com/YieldGuild), [MANA Gaming](https://x.com/ManaGamingBR), [WASD](https://x.com/WASD_0x), [LegacyGG](https://x.com/Lgc_GG), [Gaming Grid](https://x.com/GamingGridx), and [OLAGG](https://x.com/OLAGuildGames)) for player collaboration, discovery platforms like [GAM3S.GG](https://games.gg/), and media outlets like [Gaming Daily](https://x.com/GamingDailyx) for game analytics and ecosystem coverage. Some span all of these, like [FOCGERS](https://x.com/FOCGERS).
- **Game genres:** Certain game genres naturally align with the Ethereum blockchain's unique properties: **persistent state**, **verifiable logic**, and **player-owned economies**. Developers approach integration differently. Some build fully onchain games where all logic and state live on the blockchain, while others use blockchain minimally for asset ownership like NFT cosmetics. Developers are discovering which types of gameplay benefit most from onchain architecture, including:
   1. **Dungeon Crawlers & Roguelikes:** Loot Survivor's fully onchain permadeath dungeons with verifiable high scores, Onchain Heroes' Maze of Gains as well as its Axie-themed reskin called Axie: Den of Mysteries, which combine maze exploration with DeFi mechanics.
   2. **MMOs:** Cambria's Gold Rush seasonal risk-to-earn MMO with PvP and extraction mechanics, where every step outside safe zones carries real stakes. ForTheKingdom’s fully onchain MMO strategy game, featuring large-scale faction warfare. Axie Infinity: Atia's Legacy, an onchain MMO on Ronin where players battle through PvE dungeons and PvP battles with real stakes. 
   3. **4X Strategy & Grand Strategy:** Conquest.eth, a permissionless game of space conquest and diplomacy where players stake tokens on planets to produce fleets and form alliances, in a game that runs forever onchain. Realms brings Ethereum 4X mechanics to a fantasy setting, where players control Realms (land NFTs) to mine resources, build armies, and engage in complex diplomacy within a fully player-driven economy. Dark Forest pioneered the genre with ZK-proof fog of war mechanics and is currently maintained as a community fork by DFArchon.
   4. **Strategy & Tactical:** Realms includes Blitz's intense 1-hour buy-in based strategy matches, and the upcoming Asphodel autobattler is being playtested on Ethereum Mainnet.
   5. **Trading Card Games:** Showdown combines trading card game strategy with the intensity of poker. Axie Infinity Classic is a combination of chess, poker and Pokemon, and the first web3 game to hit millions of players.
   6. **Competitive Arenas:** Cambria's Duel Arena, where players stake ETH on fast-paced 1v1 duels to the death. AveForge, a competitive mech battle arena where players pilot customizable mechs.

## Games to try {#games}

<CategoryAppsGrid category="gaming" />

## Features of onchain games {#features-of-onchain-games}

1. **Secure way of exchanging digital goods**

   Tradable in-game assets can be exchanged between players for other in-game assets or tokens on that chain. Games in the past commonly faced the challenge of facilitating fair trade between players, especially for scarce and valuable items. Third-party marketplaces and peer-to-peer trading often led to players being misled or scammed out of their prized possessions. Because onchain assets follow an established data structure, they can be easily integrated with existing marketplaces, giving players peace of mind when exchanging them. Advancements in automated market makers (AMMs) also let players instantly trade certain items without having to wait for a counterparty (buyer/seller) to finalize their trade.

2. **Transparent asset origin**

   Fakes and copies of originals can be a considerable problem when valuing items, especially if the person isn't very familiar with how to distinguish a real item from a fake one. Onchain assets always have a complete record history of who (which wallet) owned them and their origin address. Even if a perfect copy of the item exists onchain, it's clearly distinguished from the original based on its smart contract of origin, mitigating the risk of fraud.

3. **Transparent logic**

   Fully onchain games use smart contracts for their functionality. This means that anyone can review and verify the game's logic, ensuring it runs according to how developers intended it to. This logic transparency also allows other developers to create new smart contracts that can expand the game or be integrated with some of its features.

4. **Provable achievements**

   In fully onchain games, every player action is recorded on the blockchain. This makes it very easy to check and verify if a player made the actions required for a certain milestone/achievement. Due to the immutable nature of blockchains, those achievement records will remain intact as long as the chain keeps running, and can be verified by any party (not just developers, as is commonly seen in traditional gaming).

5. **Forever games**

   Players invest a lot of time and effort into building their in-game reputation and characters, but that progress can easily be lost if the developers decide to shut down the servers (especially if it's an online game). Since fully onchain games store their logic and state onchain, players can still interact with the game's smart contracts, even if the main developer of the game ceases development. Such games can still be played and continue to receive updates from their communities because their logic still runs on the blockchain.

## How games integrate blockchains {#how-games-integrate-blockchains}

Game developers can decide to incorporate different Ethereum features into their games. Just because the features exist doesn't mean that every game built on Ethereum needs to use all of them, as alternative solutions exist (with their own pros and cons) that developers can use instead.

### Sign(-in) with Ethereum {#sign-in-with-ethereum}

Players can use their onchain accounts to sign into the game. This is usually facilitated through signing a transaction with a player's web3 wallet. The players can then hold their in-game assets and carry their player reputations in one account, across any games they log into using the same wallet. Ethereum's [EVM](/developers/docs/evm/) is a commonly used standard on many blockchains, so a player can often use the same account to log into games on any EVM-compatible blockchain that the wallet supports (note: some web3 wallets require a manual RPC import, especially for newer blockchains, before they can be used to do anything on that chain).

### Fungible tokens {#fungible-tokens}

Just like Ether, fungible in-game resources and currencies can be stored onchain as fungible tokens. The tokens can then be sent between addresses and used in smart contracts, allowing players to trade or gift in-game resources and currencies on open markets.

### Non-fungible tokens {#non-fungible-tokens}

Non-fungible tokens represent unique digital assets with distinct properties and ownership records stored onchain. Ethereum hosts the largest NFT ecosystem, with [OpenSea](https://opensea.io/) remaining the dominant general-purpose marketplace for trading gaming NFTs across chains. Recent developments show NFTs evolving beyond static collectibles, such as Axie Infinity's Axies, into dynamic, functional digital assets that can be used to play onchain games.

Beast NFTs in Starknet's Loot Survivor store fully onchain metadata, including species, tier, level, health, combat type, and defeat history. This makes each NFT a **verifiable, permanently onchain record of gameplay events**. When a player is the first to defeat a named Beast, they mint the NFT, and that Beast then continues to appear in every other player's dungeon; each subsequent death to that Beast is recorded in its metadata, creating cross-player interactions without requiring central servers. Player deaths drive rewards to the owned Beast NFT. 

Gigaverse's ROM NFTs function as factories, generating materials and resources over time. Instead of owning a single item, players can own manufacturing infrastructure, introducing **supply chain mechanics and ongoing value generation to gaming economies**. Abstract's Cambria 'Core' NFTs flip the microtransaction model by letting players mint pets and skins. Core holders earn Shards, burn them to create new cosmetics, and trade them in player-driven markets while the studio earns from royalties rather than direct sales.  


### Smart contracts {#smart-contracts}

Fully onchain games use smart contracts to create transparent and immutable game logic. In such cases, the blockchain serves as the game's backend, replacing the need to host its logic and data storage on a centralized server. (Note: not all web3 games are fully onchain games. As mentioned before, it depends on a case-by-case basis how much of the game's data and logic is stored onchain, versus on another data availability layer or on a classic server.)

## Evolution of player UX improvements {#evolution-of-player-ux-improvements}

### Interoperability and cross-chain play {#interoperability-and-cross-chain-play}

Advancements in cross-chain interactions and bridging allow players to access games on Ethereum more seamlessly than ever. Games can be deployed across multiple blockchains, and one game's onchain assets can be integrated by another game. In the past, players were usually required to bridge their funds to another chain before they could start using them in-game. Nowadays, games commonly integrate token bridges to other chains to make player onboarding easier.

### Scalability and gas fee improvements {#scalability-and-gas-fee-improvements}

In 2017, the craze around CryptoKitties dramatically increased gas fees for all users transacting on Ethereum. Since then, numerous Ethereum Improvement Proposals have been successfully deployed in network upgrades, increasing Ethereum Mainnet's bandwidth and significantly reducing average transaction fees. Layer 2s further expand available throughput, reducing transaction fees to cents or even lower. Lower fees and higher throughput have expanded the gaming use cases that can be built on Ethereum, supporting high-volume actions and in-game microtransactions that don't price out everyday players.

### Social logins {#social-logins}

Sign-in with an onchain Ethereum account, which can be used across all EVM-compatible blockchains, is one of the most common authentication methods. Some non-EVM chains also use it as an option for creating an account. However, if a new player doesn't have an existing Ethereum account and wants to easily create an account to sign into a game, [account abstraction](/roadmap/account-abstraction/) allows them to sign in with their social accounts and create an Ethereum account in the background.

### Paymaster and session keys {#paymaster-and-session-keys}

Paying gas fees to send transactions onchain or interact with smart contracts can be a significant friction point for many new players. Paymaster accounts can be funded by the player or subsidized by the game. Session keys allow the player to remain logged into the game for the full duration of their session, requiring them to sign only the first message of their session, with subsequent messages signed in the background.

There are contrasting philosophies around these mechanics. A leading example is Initia's Kamigotchi, which treats player-paid gas as direct revenue. In contrast, the Realms.World game ecosystem, which includes 4+ live fully onchain games on Starknet, takes the opposite approach. All games in the ecosystem use the Cartridge Paymaster, enabling players to interact with games at zero gas cost. Where Kamigotchi embraces gas fees as part of the economic design, Realms.World games view gas costs primarily as an obstacle to player experience.

## Get started with gaming on Ethereum {#get-started-with-gaming-on-ethereum}

1. **Find a fun game to play** - Browse the games listed above, or explore platforms like [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/), and [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Set up your crypto wallet** - Players need a wallet to manage digital in-game assets and (in some cases) to log into games. [Find a wallet here](/wallets/find-wallet/).
3. **Fund your wallet** - Acquire some ether (ETH) or tokens relevant to the L2 network you plan to play on. [Learn where to get ETH here(/get-eth/). 
4. **Play** - Start playing and enjoy true ownership of your in-game progress!
