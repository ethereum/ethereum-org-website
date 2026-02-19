An explainer by **Finematics** covering the mechanics of non-fungible tokens (NFTs) on Ethereum and how they intersect with decentralized finance (DeFi) — including token standards, use cases, and NFT-collateralized lending.

*This transcript is an accessible copy of the [original video transcript](https://www.youtube.com/watch?v=Xdkkux6OxfM) published by Finematics. It has been lightly edited for readability.*

#### Fungible vs. non-fungible (0:00)

Let's start with the word "fungible." Fungible means that individual units of an asset are interchangeable and indistinguishable from each other. A good example of a fungible asset is a currency. A five-dollar bill is always equal in value to any other five-dollar bill. You do not really care which particular five-dollar bill you receive because they are all worth the same amount.

When it comes to non-fungible assets, however, each unit is unique and cannot be directly replaced by another. A good example is a plane ticket. Even though plane tickets may look similar, each carries a different passenger name, destination, departure time, and seat number. Trying to swap one plane ticket for another could lead to some serious problems.

Another example is trading cards. Even though they may look similar, each card has different attributes. Factors such as the year of production or how the card is preserved can make a difference. An extreme example of something non-fungible is a piece of art — a painting, for example, is usually created as only one original copy.

#### Properties of NFTs (2:13)

Now that we know what "non-fungible" means, let's look at the most common properties of NFTs.

- **Unique** — each NFT has different properties that are usually stored in the token's metadata
- **Provably scarce** — there is usually a limited number of NFTs, with an extreme example of having only one copy; the number of tokens can be verified on the blockchain
- **Indivisible** — most NFTs cannot be split into smaller denominations, so you cannot buy or transfer a fraction of your NFT

Similarly to standard tokens, NFTs also guarantee ownership of the asset, are easily transferable, and are fraud-proof.

#### Token standards: ERC-20, ERC-721, and ERC-1155 (3:17)

Although NFTs can be implemented on any blockchain that supports smart contract programming, the most notable standards are ERC-721 and ERC-1155 on Ethereum. Before we dive into the NFT standards, let's quickly recap ERC-20, as it will be useful for comparison.

**ERC-20** is a well-known standard for creating tokens on the Ethereum blockchain. Examples include stablecoins such as USDT or DAI, and DeFi tokens such as LEND, YFI, SNX, and UNI. ERC-20 allows for creating fungible tokens — all tokens created under this standard are completely indistinguishable. It doesn't matter if you receive USDT from a friend or from an exchange; the value of each token is the same.

**ERC-721** is the standard for creating non-fungible tokens. It allows for creating contracts that produce distinguishable tokens with different properties. A common example is the famous CryptoKitties — a game that allows for collecting and breeding virtual kittens.

**ERC-1155** is the next step in non-fungible token creation. This standard allows for creating contracts that support both fungible and non-fungible tokens. It was created by Enjin, a project focusing on blockchain-based gaming. In many games such as World of Warcraft, a player can hold both non-fungible items — swords, shields, armor — and fungible items such as gold or arrows. ERC-1155 allows developers to define both fungible and non-fungible tokens and decide how many of each should exist.

#### NFT use cases (5:28)

Besides CryptoKitties, there are several other popular games leveraging NFTs, such as Gods Unchained and Decentraland. Decentraland is an interesting example because players can buy parcels of digital land that can later be resold or even used as advertising space within the game.

Other examples include marketplaces for digital art, such as Rarible and SuperRare, and even aggregators of marketplaces like OpenSea. Another example of something scarce that can be represented as NFTs is domain names — for instance, Ethereum Name Service with the .eth extension and Unstoppable Domains with the .crypto extension.

Some NFTs can be extremely costly. The most expensive CryptoKitty, Dragon, was sold for 600 ETH at the end of 2017 — worth around one hundred and seventy thousand dollars at the time. Scarce domain names such as exchange.eth can be worth upwards of five hundred thousand dollars.

#### NFTs as collateral in DeFi (6:48)

When it comes to DeFi, NFTs can unlock even more potential for decentralized finance. Currently, the vast majority of DeFi lending protocols are collateralized. One of the most interesting ideas is to use NFTs as collateral. This means you would be able to supply an NFT representing a piece of art, digital land, or even tokenized real estate as collateral, and borrow money against it.

This sounds promising, but there is a problem. In standard DeFi lending and borrowing platforms such as Compound or Aave, the value of supplied collateral can be easily measured by integrating price oracles. These aggregate prices from multiple liquid sources, such as centralized and decentralized exchanges. When it comes to NFTs, the markets for particular tokens are very often illiquid, which makes the price discovery process tricky.

To understand this problem better, imagine someone buys a rare CryptoKitty for 10 ETH. This NFT is later used as collateral, and the borrower draws 1,700 DAI — assuming that 10 ETH is worth 3,500 dollars and this particular NFT has a 50% loan-to-value ratio. After this, if no one else is willing to buy this particular CryptoKitty, the market for this NFT is illiquid or even non-existent. The only assumption is that the NFT is still worth the same amount as it was last sold for — which is not a safe assumption, as the value of NFTs can change quite dramatically.

This is why some projects that offer NFT-collateralized loans use a slightly different model: peer-to-peer loans. In this marketplace model, borrowers can offer their NFTs as collateral, and lenders can choose which NFT they are willing to accept before initializing a loan. The NFT used as collateral is kept in an escrow contract, and if the borrower defaults by not repaying the borrowed amount plus interest on time, the NFT is transferred to the lender. This space is new, but one of the companies that uses this model is NFTfi.

#### NFTs as financial products (9:32)

Besides being used as collateral, NFTs can also represent more complex financial products such as insurance, bonds, or options. Yinsure from Yearn Finance is a good example of NFT usage in the insurance space. In Yinsure, each insurance contract is represented as an NFT that can also be traded on a secondary market such as Rarible.

We have also recently started seeing DeFi-native concepts such as liquidity mining being used by NFT projects. Rarible, for example, started rewarding its users with RARI governance tokens for creating, buying, and selling NFTs on their platform.

#### The growing NFT market (10:30)

With over 100 million dollars worth of NFTs traded and 6 million dollars in the most recent month alone, the NFT space is one of the fastest-growing niches in crypto. It has huge potential ranging from digital kittens to complex financial products.
