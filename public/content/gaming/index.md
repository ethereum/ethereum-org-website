---
title: Gaming on Ethereum
lang: en
template: use-cases
image: /images/robot-help-bar.png
sidebarDepth: 2
summaryPoint1: Game rules and state can be enforced by the Ethereum blockchain, not a studio's servers, representing a key benefit of onchain games
summaryPoint2: Anyone can build mods, bots, or entirely new games that plug into the same open onchain data
summaryPoint3: Evolving UX improvements have improved gameplay and expanded the onchain gaming landscape, including purpose-built L2s for real-time gameplay and game development frameworks for easy development
buttons:
  - content: Learn more
    toId: gaming-on-ethereum
  - content: Explore games
    toId: games
    isSecondary: false
---

## Gaming on Ethereum {#gaming-on-ethereum}

Gaming on Ethereum comes in various forms, from games that use the blockchain for specific features to those where the entire game world lives onchain. The Ethereum blockchain can be used with games in various capacities. Games can store their currencies as transferable tokens or other in-game assets (characters, equipment, pets, etc.) in the form of [NFTs (non-fungible tokens)](/nft/). Games can also utilize smart contracts to host their logic, rules, and state onchain. Such games are commonly referred to as "fully onchain games."

The Ethereum ecosystem also includes [Layer 2 blockchains (L2s)](/layer-2/learn/) that inherit the security guarantees of Ethereum mainnet while extending Ethereum's scale and supporting specialized use cases. L2 networks can provide additional benefits for onchain games and their communities, because L2s can offer faster confirmation times, higher processing volume, and lower fees, making gameplay faster and more accessible.

## Features of onchain games {#features-of-onchain-games}

1. **Secure way of exchanging digital goods**

   Tradable in-game assets can be exchanged between players for other in-game assets or tokens on that chain. Games in the past commonly faced the challenge of facilitating fair trade between players, especially for scarce and valuable items. 3rd-party marketplaces and peer-to-peer trading often led to players being misled or scammed out of their prized possessions. Because onchain assets follow an established data structure, they can be easily integrated with existing marketplaces, giving players peace of mind when exchanging them. Advancements in AMMs also let players instantly trade certain items without having to wait for a counterparty (buyer/seller) to finalize their trade.

2. **Transparent asset origin**

   Fakes and copies of originals can be a considerable problem when valuing physical items, especially if the person isn't very familiar with the common details to distinguish a real thing from a fake one. Onchain assets always have a complete record history of who (which wallet) owned them and their origin address, so even if a perfect copy of the data exists onchain, it's clearly distinguished from the original, based on its smart contract of origin.

3. **Transparent logic**

   Fully onchain games use smart contracts for their functionality. This means that anyone can review and verify the game's logic, ensuring it runs according to how developers intended it to. This logic transparency also allows other developers to create new smart contracts that can expand the game or be integrated with some of its features.

4. **Provable achievements**

   In fully onchain games, every player action is recorded on the blockchain. This makes it very easy to check and verify if a player made the actions required for a certain milestone/achievement. Due to the immutable nature of blockchains, those achievement records will remain intact as long as the chain keeps running, and can be verified by any party (not just developers, as it's commonly seen in traditional gaming).

5. **Forever games**

   Players invest a lot of time and effort into building their in-game reputation and characters, but that progress can easily be lost if the developers decide to shut down the servers, especially if it's an online game. Since fully onchain games store their logic and state onchain, players can still interact with the game's smart contracts, even if the main developer of the game ceases development. Such games can still be played and continue to receive updates from their communities because their logic still runs on the blockchain.

## How games integrate blockchains {#how-games-integrate-blockchains}

Game developers can decide to incorporate different features of Ethereum into their games. Just because they exist doesn't mean that every game needs to utilize all of them, since there exist alternative solutions with their own pros and cons.

### Sign(-in) with Ethereum {#sign-in-with-ethereum}

Players can use their onchain accounts to sign into the game. These are usually facilitated through signing transactions with a player's web3 wallet. EVM is a commonly used standard on many running chains, so a player can use the same account on any EVM chain that the wallet supports (note: some web3 wallets require a manual RPC import, especially for newer blockchains, before they can be used to do anything on that chain).

### Fungible tokens {#fungible-tokens}

Just like Ether, fungible in-game resources and currencies can be stored onchain as fungible tokens that can be sent between addresses and used in smart contracts.

### Non-fungible tokens {#non-fungible-tokens}

Non-fungible tokens (NFTs) can represent game elements such as characters, items, land, or even save states. With dynamic metadata, NFTs can evolve in response to in-game events, allowing assets to carry history over time. For example, Beast NFTs in Loot Survivor permanently record when a specific player defeats a unique creature, embedding that outcome into the asset itself. This kind of design points toward games where assets are persistent, stateful, and potentially usable across multiple onchain experiences, rather than static collectibles.

### Smart contracts {#smart-contracts}

Fully onchain games use smart contracts to create transparent and immutable game logic. In such cases, the blockchain serves as the game's backend, replacing the need to host its logic and data storage on a centralized server. (Note: not all web3 games are fully onchain games. As mentioned before, it depends on a case by case basis how much of the game's data and logic is stored onchain, on another DA or on a classic server.)

## Ethereum's gaming ecosystem overview {#ethereums-gaming-ecosystem-overview}

- **Layer 2s:** With cheaper fees and short transaction times, layer 2s became a common place for games to launch on. Top layer 2s with games include: Ronin, Starknet, Immutable, Base, Abstract
- **Infrastructure:** To make developing onchain games easier, there exists a number of tool stacks that can be used with your own project: Cartridge, Dojo, Proof of Play, Thirdweb
- **Gaming guilds:** Players who want to be a part of a gaming community can join gaming guilds to strategize and collaborate with other players in the guild. Notable ones include: YGG, WASD, LegacyGG, Gaming Grid, OLAGG, etc.
- **Games:** Ethereum games come in different shapes and sizes, spanning everything from _Realms: Eternum's_ real-time strategy, to _Axie: Atia's Legacy_ MMO, _Fableborn's_ action RPG, and even gamified DeFi platforms like _Ponziland_. With new games launching regularly across different chains, there's always something fresh to explore.

## Games {#games}

<CategoryAppsGrid category="gaming" />

## Evolution of player UX improvements {#evolution-of-player-ux-improvements}

### Interoperability and cross-chain play {#interoperability-and-cross-chain-play}

Advancements in cross-chain interactions and bridging allow players to access games on Ethereum as seamlessly as ever. Games can be deployed across multiple blockchains, and one game's onchain assets can be integrated by another game. In the past, players were usually required to bridge their funds to another chain before they could start using them in-game. Nowadays, games commonly integrate token bridges to other chains to make player onboarding easier.

### Scalability and gas fee improvements {#scalability-and-gas-fee-improvements}

In 2017, the craze around Crypto Kitties dramatically increased gas fees for all users of the chain. Since then, numerous Ethereum Improvement Proposals have been successfully launched, increasing mainnet's bandwidth and significantly reducing average transaction fees. Layer 2s further expanded available throughput, reducing transaction fees to cents or even lower.

### Social logins {#social-logins}

Ethereum login (EVM account) is one of the most common authentication methods, which can be used across all EVM chains. Some non-EVM chains also use it as an option for creating an account. However, if a new player doesn't have one and wants to easily create one, account abstraction allows them to sign in with their social account.

### Paymaster and session keys {#paymaster-and-session-keys}

Paying gas fees to send transactions onchain or interact with smart contracts can be a significant friction to many new players. Paymaster accounts can be funded by the player or subsidized by the game. Session keys allow the player to remain logged into the game for the full duration of their session, requiring them to sign only the first message of their session, with subsequent messages signed in the background.

There are contrasting philosophies around these mechanics. A leading example is Initia's Kamigotchi, which treats player-paid gas as direct revenue. In contrast, the Realms.World game ecosystem, currently comprising 4+ live fully onchain games on Starknet, takes the opposite approach. All games in the ecosystem use the Cartridge Paymaster, enabling players to interact with games at zero gas cost. Where Kamigotchi embraces gas fees as part of the economic design, Realms.World games view gas costs primarily as an obstacle to player experience.

## Get started with gaming on Ethereum {#get-started-with-gaming-on-ethereum}

1. **Find a fun game to play** - Browse the games listed above or explore platforms like [ChainPlay](https://chainplay.gg/chain/ethereum/), [Gam3s.GG](https://gam3s.gg/), and [DappRadar](https://dappradar.com/rankings/protocol/ethereum/category/games).
2. **Set up your crypto wallet** - You'll need a wallet to manage your digital assets and interact with decentralized applications. [Choose a Wallet](/wallets/find-wallet/)
3. **Fund your wallet** - Acquire some Ether (ETH) or tokens relevant to the Layer 2 network you plan to use.
4. **Play** - Start playing and enjoy true ownership of your in-game progress.
