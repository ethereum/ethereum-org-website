---
title: Non-fungible tokens (NFT)
description: An overview of NFTs on Ethereum
lang: en
template: use-cases
emoji: ":frame_with_picture:"
sidebarDepth: 2
image: ../../assets/infrastructure_transparent.png
alt: An Eth logo being displayed via hologram.
summaryPoint1: A way to represent anything unique as an Ethereum-based asset.
summaryPoint2: NFTs are giving more power to content creators than ever before.
summaryPoint3: Powered by smart contracts on the Ethereum blockchain.
---

NFTs are currently taking the digital art and collectibles world by storm. Digital artists are seeing their lives change thanks to huge sales to a new crypto-audience. And celebrities are joining in as they spot a new opportunity to connect with fans. But digital art is only one way to use NFTs. Really they can be used to represent ownership of any unique asset, like a deed for an item in the digital or physical realm.

If Andy Warhol had been born in the late 90s, he probably would have minted Campbell's Soup as an NFT. It's only a matter of time before Nike puts a run of Jordans on Ethereum. And one day owning your car might be proved with an NFT.

## What's an NFT? {#what-are-nfts}

NFTs are tokens that we can use to represent ownership of unique items. They let us tokenize things like art, collectibles, even real estate. Ownership of an asset is secured by the Ethereum blockchain – no one can modify the record of ownership or copy/paste a new NFT into existence.

NFT stands for non-fungible token. Non-fungible is an economic term that you could use to describe things like your furniture, a song file, or your computer. These things are not interchangeable for other items because they have unique properties.

Fungible items, on the other hand, can be exchanged because their value defines them rather than their unique properties. For example, ETH or dollars are fungible because 1 ETH / $1 USD is exchangeable for another 1 ETH / $1 USD.

<YouTube id="Xdkkux6OxfM" />

## The internet of assets {#internet-of-assets}

NFTs and Ethereum solve some of the problems that exist in the internet today. As everything becomes more digital, there's a need to replicate the properties of physical items like scarcity, uniqueness, and proof of ownership. Not to mention that digital items often only work in the context of their product. For example you can't re-sell an iTunes mp3 you've purchased, or you can't exchange one company's loyalty points for another platform's credit even if there's a market for it.

Here's how an internet of NFTs compared to the internet most of us use today looks...

### A comparison {#nft-comparison}

| An NFT internet                                                                                                                                                                                             | The internet today                                                                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFTs are digitally unique, no two NFTs are the same.                                                                                                                                                        | A copy of a file, like an .mp3 or .jpg, is the same as the original.                                                                                                       |
| Every NFT must have an owner and this is of public record and easy for anyone to verify.                                                                                                                    | Ownership records of digital items are stored on servers controlled by institutions – you must take their word for it.                                                     |
| NFTs are compatible with anything built using Ethereum. An NFT ticket for an event can be traded on every Ethereum marketplace, for an entirely different NFT. You could trade a piece of art for a ticket! | Companies with digital items must build their own infrastructure. For example an app that issues digital tickets for events would have to build their own ticket exchange. |
| Content creators can sell their work anywhere and can access a global market.                                                                                                                               | Creators rely on the infrastructure and distribution of the platforms they use. These are often subject to terms of use and geographical restrictions.                     |
| Creators can retain ownership rights over their own work, and claim resale royalties directly.                                                                                                              | Platforms, such as music streaming services, retain the majority of profits from sales.                                                                                    |
| Items can be used in surprising ways. For example, you can use digital artwork as collateral in a decentralised loan.                                                                                       |                                                                                                                                                                            |

### NFT examples {#nft-examples}

The NFT world is relatively new. In theory, the scope for NFTs is anything that is unique that needs provable ownership. Here are some examples of NFTs that exist today, to help you get the idea:

- [A unique digital artwork](https://foundation.app/artworks)
- [A unique sneaker in a limited-run fashion line](https://www.metagrail.co/auctions/91cf83fb-3477-4155-aae8-6dcb9b853397)
- [An in-game item](https://market.decentraland.org/)
- [An essay](https://zora.co/0x517bab7661C315C63C6465EEd1b4248e6f7FE183/145)
- [A digital collectible](https://www.larvalabs.com/cryptopunks/details/1)
- [A domain name](https://app.ens.domains/name/ethereum.eth)
- [A ticket that gives you access to an event or a coupon](https://www.yellowheart.io/)
- [Buy real world goods](https://www.tangible.store/)
- [Fractionalized real-estate](https://realt.co/)
- [Degree Certificates](https://www.degreecert.com/)
- [Music royalties via NFTs](https://opulous.org/)
- [Move 2 earn](https://yeticoineth.com/about.html)
- [Digital identity](https://photochromic.io/)

### ethereum.org examples {#ethereum-org-examples}

We use NFTs to give back to our contributors and we've even got our own NFT domain name.

#### POAPs (Proof of attendance protocol) {#poaps}

If you contribute to ethereum.org, you can claim a POAP NFT. These are collectibles that prove you participated in an event. Some crypto meetups have used POAPs as a form of ticket to their events. [More on contributing](/contributing/#poap).

![ethereum.org POAP](./poap.png)

#### ethereum.eth {#ethereum-dot-eth}

This website has an alternative domain name powered by NFTs, **ethereum.eth**. Our `.org` address is centrally managed by a domain name system (DNS) provider, whereas ethereum`.eth` is registered on Ethereum via the Ethereum Name Service (ENS). And its owned and managed by us. [Check our ENS record](https://app.ens.domains/name/ethereum.eth)

[More on ENS](https://app.ens.domains)

## How do NFTs work? {#how-nfts-work}

NFTs are different from ERC-20 tokens, such as DAI or LINK, in that each individual token is completely unique and is not divisible. NFTs give the ability to assign or claim ownership of any unique piece of digital data, trackable by using Ethereum's blockchain as a public ledger. An NFT is minted from digital objects as a representation of digital or non-digital assets. For example, an NFT could represent:

- Digital Art:
  - GIFs
  - Collectibles
  - Music
  - Videos
- Real World Items:
  - Deeds to a car
  - Tickets to a real world event
  - Tokenized invoices
  - Legal documents
  - Signatures
- Lots and lots more options to get creative with!

Ownership of NFTs is managed through the unique ID and metadata that no other token can replicate. NFTs are minted through smart contracts that assign ownership and manage the transferability of the NFT's. When someone creates or mints an NFT, they execute code stored in smart contracts that conform to different standards, such as [ERC-721](/developers/docs/standards/tokens/erc-721/). This information is added to the blockchain where the NFT is being managed. The minting process, from a high level, has the following steps that it goes through:

- Creating a new block
- Validating information
- Recording information into the blockchain

NFT's have some special properties:

- Each token minted has a unique identifier that is directly linked to one Ethereum address.
- They're not directly interchangeable with other tokens 1:1. For example 1 ETH is exactly the same as another ETH. This isn't the case with NFTs.
- Each token has an owner and this information is easily verifiable.
- They live on Ethereum and can be bought and sold on any Ethereum-based NFT market.

In other words, if you _own_ an NFT:

- You can easily prove you own it.
  - Proving you own an NFT is very similar to proving you have ETH in your account.
  - For example, let's say you purchase an NFT, and the ownership of the unique token is transferred to your wallet via your public address.
  - The token proves that your copy of the digital file is the original.
  - Your private key is proof-of-ownership of the original.
  - The content creator's public key serves as a certificate of authenticity for that particular digital artefact.
    - The creators public key is essentially a permanent part of the token's history. The creator's public key can demonstrate that the token you hold was created by a particular individual, thus contributing to its market value (vs a counterfeit).
  - Another way to think about proving you own the NFT is by signing messages to prove you own the private key behind the address.
    - As mentioned above, your private key is proof-of-ownership of the original. This tells us that the private keys behind that address control the NFT.
    - A signed message can be used as proof that you own your private keys without revealing them to anybody and thus proving you own the NFT as well!
- No one can manipulate it in any way.
- You can sell it, and in some cases this will earn the original creator resale royalties.
- Or, you can hold it forever, resting comfortably knowing your asset is secured by your wallet on Ethereum.

And if you _create_ an NFT:

- You can easily prove you're the creator.
- You determine the scarcity.
- You can earn royalties every time it's sold.
- You can sell it on any NFT market or peer-to-peer. You're not locked in to any platform and you don't need anyone to intermediate.

### Scarcity {#scarcity}

The creator of an NFT gets to decide the scarcity of their asset.

For example, consider a ticket to a sporting event. Just as an organizer of an event can choose how many tickets to sell, the creator of an NFT can decide how many replicas exist. Sometimes these are exact replicas, such as 5000 General Admission tickets. Sometimes several are minted that are very similar, but each slightly different, such as a ticket with an assigned seat. In another case, the creator may want to create an NFT where only one is minted as a special rare collectible.

In these cases, each NFT would still have a unique identifier (like a bar code on a traditional "ticket"), with only one owner. The intended scarcity of the NFT matters, and is up to the creator. A creator may intend to make each NFT completely unique to create scarcity, or have reasons to produce several thousand replicas. Remember, this information is all public.

### Royalties {#royalties}

Some NFTs will automatically pay out royalties to their creators when they're sold. This is still a developing concept but it's one of the most powerful. Original owners of [EulerBeats Originals](https://eulerbeats.com/) earn an 8% royalty every time the NFT is sold on. And some platforms, like [Foundation](https://foundation.app) and [Zora](https://zora.co/), support royalties for their artists.

This is completely automatic so creators can just sit back and earn royalties as their work is sold from person to person. At the moment, figuring out royalties is very manual and lacks accuracy – a lot of creators don't get paid what they deserve. If your NFT has a royalty programmed into it, you'll never miss out.

## What are NFTs used for? {#nft-use-cases}

Here's more information of some of the better developed use-cases and visions for NFTs on Ethereum.

- [Digital content](#nfts-for-creators)
- [Gaming items](#nft-gaming)
- [Domain names](#nft-domains)
- [Physical items](#nft-physical-items)
- [Investments and collateral](#nfts-and-defi)
- [Tokengating](#tokengating)

<Divider />

### Maximising earnings for creators {#nfts-for-creators}

The biggest use of NFTs today is in the digital content realm. That's because that industry today is broken. Content creators see their profits and earning potential swallowed by platforms.

An artist publishing work on a social network makes money for the platform who sell ads to the artists followers. They get exposure in return, but exposure doesn't pay the bills.

NFTs power a new creator economy where creators don't hand ownership of their content over to the platforms they use to publicise it. Ownership is baked into the content itself.

When they sell their content, funds go directly to them. If the new owner then sells the NFT, the original creator can even automatically receive royalties. This is guaranteed every time it's sold because the creator's address is part of the token's metadata – metadata which can't be modified.

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Explore, buy or create your own NFT art/collectibles...</div>
  <ButtonLink to="/dapps/?category=collectibles">
    Explore NFT art
  </ButtonLink>
</InfoBanner>

#### The copy/paste problem {#nfts-copy-paste}

Naysayers often bring up the fact that NFTs "are dumb" usually alongside a picture of them screenshotting an NFT artwork. "Look, now I have that image for free!" they say smugly.

Well, yes. But does googling an image of Picasso's Guernica make you the proud new owner of a multi-million dollar piece of art history?

Ultimately owning the real thing is as valuable as the market makes it. The more a piece of content is screen-grabbed, shared, and generally used the more value it gains.

Owning the verifiably real thing will always have more value than not.

<Divider />

### Boosting gaming potential {#nft-gaming}

NFTs have seen a lot of interest from game developers. NFTs can provide records of ownership for in-game items, fuel in-game economies, and bring a host of benefits to the players.

In a lot of regular games you can buy items for you to use in your game. But if that item was an NFT you could recoup your money by selling it on when you're done with the game. You might even make a profit if that item becomes more desirable.

For game developers – as issuers of the NFT – they could earn a royalty every time an item is re-sold in the open marketplace. This creates a more mutually-beneficial business model where both players and developers earn from the secondary NFT market.

This also means that if a game is no longer maintained by the developers, the items you've collected remain yours.

Ultimately the items you grind for in-game can outlive the games themselves. Even if a game is no longer maintained, your items will always be under your control. This means in-game items become digital memorabilia and have a value outside of the game.

Decentraland, a virtual reality game, even lets you buy NFTs representing virtual parcels of land that you can use as you see fit.

<InfoBanner shouldSpaceBetween emoji=":eyes:">
  <div>Check out Ethereum games, powered by NFTs...</div>
  <ButtonLink to="/dapps/?category=gaming">
    Explore NFT games
  </ButtonLink>
</InfoBanner>

<Divider />

### Making Ethereum addresses more memorable {#nft-domains}

The Ethereum Name Service uses NFTs to provide your Ethereum address with an easier-to-remember name like `mywallet.eth`. This means you could ask someone to send you ETH via `mywallet.eth` rather than `0x123456789.....`.

This works in a similar way to a website domain name which makes an IP address more memorable. And like domains, ENS names have value, usually based on length and relevance. With ENS you don't need a domain registry to facilitate the transfer of ownership. Instead, you can trade your ENS names on an NFT marketplace.

Your ENS name can:

- Receive cryptocurrency and other NFTs.
- Point to a decentralized website, like [ethereum.eth](https://ethereum.eth.link). [More on decentralizing your website](https://docs.ipfs.io/how-to/websites-on-ipfs/link-a-domain/#domain-name-service-dns)
- Store any arbitrary information, including profile information like email addresses and Twitter handles.

<Divider />

### Physical items {#nft-physical-items}

The tokenisation of physical items isn't yet as developed as their digital counterparts. But there are plenty of projects exploring the tokenisation of real estate, one-of-a-kind fashion items, and more.

As NFTs are essentially deeds, one day you could buy a car or home using ETH and receive the deed as an NFT in return (in the same transaction). As things become increasingly high-tech, it's not hard to imagine a world where your Ethereum wallet becomes the key to your car or home – your door being unlocked by the cryptographic proof of ownership.

With valuable assets like cars and property representable on Ethereum, you can use NFTs as collateral in decentralized loans. This is particularly helpful if you're not cash or crypto-rich but own physical items of value. [More on DeFi](/defi/)

<Divider />

### NFTs and DeFi {#nfts-and-defi}

The NFT world and the [decentralized finance (DeFi)](/defi/) world are starting to work together in a number of interesting ways.

#### NFT-backed loans {#nft-backed-loans}

There are DeFi applications that let you borrow money by using collateral. For example you collateralise 10 ETH so you can borrow 5000 DAI ([a stablecoin](/stablecoins/)). This guarantees that the lender gets paid back – if the borrower doesn't pay back the DAI, the collateral is sent to the lender. However not everyone has enough crypto to use as collateral.

Projects are beginning to explore using NFTs as collateral instead. Imagine you bought a rare CryptoPunk NFT back in the day – they can fetch $1000s at today's prices. By putting this up as collateral, you can access a loan with the same rule set. If you don't pay back the DAI, your CryptoPunk will be sent to the lender as collateral. This could eventually work with anything you tokenise as an NFT.

And this isn't hard on Ethereum, because both worlds (NFT and DeFi) share the same infrastructure.

#### Fractional ownership {#fractional-ownership}

NFT creators can also create "shares" for their NFT. This gives investors and fans the opportunity to own a part of an NFT without having to buy the whole thing. This adds even more opportunities for NFT minters and collectors alike.

- Fractionalised NFTs can be traded on [DEXs](/defi/#dex) like Uniswap, not just [NFT marketplaces](/dapps?category=collectibles). That means more buyers and sellers.
- An NFT's overall price can be defined by the price of its fractions.
- You have more of an opportunity to own and profit from items you care about. It's harder to be priced out of owning NFTs.

This is still experimental but you can learn more about fractional NFT ownership at the following exchanges:

- [NIFTEX](https://landing.niftex.com/)
- [NFTX](https://gallery.nftx.org/)

In theory, this would unlock the possibility to do things like own a piece of a Picasso. You would become a shareholder in a Picasso NFT, meaning you would have a say in things like revenue sharing. It's very likely that one day soon owning a fraction of an NFT will enter you into a decentralised autonomous organisation (DAO) for managing that asset.

These are Ethereum-powered organisations that allow strangers, like global shareholders of an asset, to coordinate securely without necessarily having to trust the other people. That's because not a single penny can be spent without group approval.

As we mentioned, this is an emerging space. NFTs, DAOs, fractionalised tokens are all developing at different paces. But all their infrastructure exists and can work together easily because they all speak the same language: Ethereum. So watch this space.

[More on DAOs](/dao/)

### Certificates of authenticity {#certificates}

Companies offering fake certificates for university degrees are reportedly a billion-dollar industry that NFTs can help combat. NFTs can be a secure and quick way to verify someone's degree credentials.

[In South Korea, one university is already issuing degree certificates as an NFT](https://forkast.news/headlines/south-korea-nfts-graduates-hoseo/), with the hope that NFTs will improve access to administrative services and prevent forgery or alteration of the degree. [Trinity Business School (TBS) in Ireland is also planning on offering NFTs from 2023](https://trinitynews.ie/2022/04/business-school-to-offer-degree-nfts/).

<Divider />

### Tokengating {#tokengating}

Tokengating is a way of restricting access to something and using NFTs as a way to unlock access. These things can vary hugely based on the platform but popular examples are gated content, private chat servers, and, in the world of ecommerce, exclusive products.

A platform that does tokengating will typically ask you to connect your wallet to prove you own the required NFT. If you have the NFT you need, you'll get access. If not, the thing will remain gated. NFTs are a great way to do this because of their uniqueness – you can't fake ownership to get the thing.

Since NFTs are on Ethereum, they can be used to unlock Ethereum tokengates on any platform that implements them. A single NFT you own could unlock gated content, private chat servers, and exclusive products across completely different websites and applications.

If minting and distributing NFTs is about community-generation or community digitization, tokengating is about community nurturing. It sees NFTs used more as a tool for membership or loyalty – and a great way to reliably deliver the rewards that come with it.

#### Examples

- [Collab.land](https://collab.land/) tokengates Discord chat servers or Telegram groups
- [Unlock protocol](https://unlock-protocol.com/) is a protocol for tokengating
- [Shopify](https://help.shopify.com/en/manual/products/digital-service-product/nfts) has a growing roster of apps that let merchants tokengate access to products and discounts

<Divider />

## Ethereum and NFTs {#ethereum-and-nfts}

Ethereum makes it possible for NFTs to work for a number of reasons:

- Transaction history and token metadata is publicly verifiable – it's simple to prove ownership history.
- Once a transaction is confirmed, it's nearly impossible to manipulate that data to "steal" ownership.
- Trading NFTs can happen peer-to-peer without needing platforms that can take large cuts as compensation.
- All Ethereum products share the same "backend". Put another way, all Ethereum products can easily understand each other – this makes NFTs portable across products. You can buy an NFT on one product and sell it on another easily. As a creator you can list your NFTs on multiple products at the same time – every product will have the most up-to-date ownership information.
- Ethereum never goes down, meaning your tokens will always be available to sell.

## The environmental impact of NFTs {#environmental-impact-nfts}

Creating and transferring NFTs are just Ethereum transactions - minting, buying, swapping or interacting with NFTs does not directly consume energy. Since [The Merge](/upgrades/merge), Ethereum is a low-energy blockchain, meaning the environmental impact of using NFTs is negligible.

[More on Ethereum's energy consumption](/energy-consumption/).

### Don't blame it on the NFTs {#nft-qualities}

The whole NFT ecosystem works because Ethereum is decentralized and secure.

Decentralized meaning you and everyone else can verify you own something. All without trusting or granting custody to a third party who can impose their own rules at will. It also means your NFT is portable across many different products and markets.

Secure meaning no one can copy/paste your NFT or steal it.

These qualities of Ethereum makes digitally owning unique items and getting a fair price for your content possible. Ethereum protects the assets using a decentralized consensus mechanism which involves ['proof-of-stake'](/developers/docs/consensus-mechanisms/pos). This is a low carbon method to determine who can add a block of transactions to the chain, and is considered more secure than the energy-intensive alternative, ['proof-of-work'](/developers/docs/consensus-mechanisms/pow). NFTs have been associated with high energy expenditure because Ethereum used to be secured using proof-of-work. This is no longer true.

#### Minting NFTs {#minting-nfts}

When you mint an NFT, a few things have to happen:

- It needs to be confirmed as an asset on the blockchain.
- The owner's account balance must be updated to include that asset. This makes it possible for it to then be traded or verifiably "owned".
- The transactions that confirm the above need to be added to a block and "immortalized" on the chain.
- The block needs to be confirmed by everyone in the network as "correct". This consensus removes the need for intermediaries because the network agrees that your NFT exists and belongs to you. And it's on chain so anyone can check it. This is one of the ways Ethereum helps NFT creators to maximize their earnings.

All these tasks are done by block producers and validators. Block proposers add your NFT transaction to a block and broadcast it to the rest of the network. Validators check that the transaction is valid and then add it to their databases. There are lots of crypto-economic incentives in place to make sure validators are acting honestly. Otherwise, anyone could just claim that they own the NFT you just minted and fraudulently transfer ownership.

#### NFT security {#nft-security}

Ethereum's security comes from proof-of-stake. The system is designed to economically disincentivize malicious actions, making Ethereum tamper-proof. This is what makes NFTs possible. Once the block containing your NFT transaction becomes finalized it would cost an attacker millions of ETH to change it. Anyone running Ethereum software would immediately be able to detect dishonest tampering with an NFT, and the bad actor would be economically penalized and ejected.

Security issues relating to NFTs are most often related to phishing scams, smart contract vulnerabilities or user errors (such as inadvertently exposing private keys), making good wallet security critical for NFT owners.

<ButtonLink to="/security/">
  More on security
</ButtonLink>

## Build with NFTs {#build-with-nfts}

Most NFTs are built using a consistent standard known as [ERC-721](/developers/docs/standards/tokens/erc-721/). However there are other standards that you might want to look into. The [ERC-1155](https://blog.enjincoin.io/erc-1155-the-crypto-item-standard-ac9cf1c5a226) standard allows for semi-fungible tokens which is particularly useful in the realm of gaming. And more recently, [EIP-2309](https://eips.ethereum.org/EIPS/eip-2309) has been proposed to make minting NFTs a lot more efficient. This standard lets you mint as many as you like in one transaction!

## Further reading {#further-reading}

- [Crypto art data](https://cryptoart.io/data) – Richard Chen, updated automatically
- [OpenSea: the NFT Bible](https://opensea.io/blog/guides/non-fungible-tokens/) – _Devin Fizner, January 10 2020_
- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, January 2020_
- [Everything you need to know about the metaverse](https://foundation.app/blog/enter-the-metaverse) – _Foundation team, foundation.app_
- [No, CryptoArtists Aren’t Harming the Planet](https://medium.com/superrare/no-cryptoartists-arent-harming-the-planet-43182f72fc61)
- [Ethereum's energy consumption](/energy-consumption/)

<QuizWidget quizKey="nfts" />
