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

## What are NFTs? {#what-are-nfts}

NFTs are tokens that are individually unique. Each NFT has different properties (non-fungible) and is provably scarce. This is different from tokens such as ERC-20s where every token in a set is identical and has the same properties ('fungible'). You don't care which specific dollar bill you have in your wallet, because they are all identical and worth the same. However, you _do_ care which specific NFT you own, because they all have individual properties that distinguish them from others ('non-fungible').

The uniqueness of each NFT enables tokenization of things like art, collectibles, or even real estate, where one specific unique NFT represents some specific unique real world or digital item. Ownership of an asset is secured by the Ethereum blockchain – no one can modify the record of ownership or copy/paste a new NFT into existence.

<YouTube id="Xdkkux6OxfM" />

## The internet of assets {#internet-of-assets}

NFTs and Ethereum solve some of the problems that exist on the internet today. As everything becomes more digital, there's a need to replicate the properties of physical items like scarcity, uniqueness, and proof of ownership in a way that isn't controlled by a central organization. For example, with NFTs, you can own a music mp3 that is not specific to one company's specific music app, or you can own a social media handle that you can sell or swap, but can't be arbitrarily taken away from you by a platform provider.

Here's how an internet of NFTs compared to the internet most of us use today looks...

### A comparison {#nft-comparison}

| An NFT internet                                                                                                         | The internet today                                                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| You own your assets! Only you can sell or swap them.                                                                    | You rent an asset from some organization.                                                                                                              |
| NFTs are digitally unique, no two NFTs are the same.                                                                    | A copy of an entity often cannot be distinguished from the original.                                                                                   |
| Ownership of an NFT is stored on the blockchain for anyone to verify.                                                   | Ownership records of digital items are stored on servers controlled by institutions – you must take their word for it.                                 |
| NFTs are smart contracts on Ethereum. This means they can easily be used in other smart contracts and apps on Ethereum! | Companies with digital items usually require their own "walled garden" infrastructure.                                                                 |
| Content creators can sell their work anywhere and can access a global market.                                           | Creators rely on the infrastructure and distribution of the platforms they use. These are often subject to terms of use and geographical restrictions. |
| NFT creators can retain ownership rights over their own work, and program royalties directly into the NFT contract.     | Platforms, such as music streaming services, retain the majority of profits from sales.                                                                |

## How do NFTs work? {#how-nfts-work}

Like any token issued on Ethereum, NFTs are issued by a smart contract. The smart contract conforms to one of several NFT standards (commonly ERC-721 or ERC-1155) that define what functions the contract has. The contract can create ('mint') NFTs and assign them to a specific owner. Ownership is defined in the contract by mapping specific NFTs to specific addresses. The NFT has an ID and typically metadata associated with it that make the specific token unique.

When someone creates or mints an NFT, they are really executing a function in the smart contract that assigns a specific NFT to their address. This information is stored in the contract's storage, which is part of the blockchain. The contract creator can write additional logic into the contract, for example limiting the total supply or defining a royalty to be paid to the creator each time a token is transferred.

## What are NFTs used for? {#nft-use-cases}

NFTs are used for many things, including:

- proving that you attended an event
- certify that you completed a course
- ownable items for games
- digital art
- tokenizing real-world assets
- proving your online identity
- gating access to content
- ticketing
- decentralized internet domain names
- collateral in DeFi

Maybe you are an artist that wants to share their work using NFTs, without losing control and sacrificing your profits to intermediaries. You can create a new contract and specify the number of NFTs, their properties and a link to some specific artwork. As the artist, you can program into the smart contract the royalties you should be paid (e.g. transfer 5% of the sale price to the contract owner each time an NFT is transferred). You can also always prove that you created the NFTs because you own the wallet that deployed the contract. Your buyers can easily prove that they own an authentic NFT from your collection because their wallet address is associated with a token in your smart contract. They can use it across the Ethereum ecosystem, confident in its authenticity.

Or consider a ticket to a sporting event. Just as an organizer of an event can choose how many tickets to sell, the creator of an NFT can decide how many replicas exist. Sometimes these are exact replicas, such as 5000 General Admission tickets. Sometimes several are minted that are very similar, but each slightly different, such as a ticket with an assigned seat. These can be bought and sold peer-to-peer without paying ticket handlers and the buyer always with assurance of the ticket authenticity by checking the contract address.

On ethereum.org, NFTs are used to demonstrate that people have contributed to our Github repository or attended calls, and we've even got our own NFT domain name. If you contribute to ethereum.org, you can claim a POAP NFT. Some crypto meetups have used POAPs as tickets. [More on contributing](/contributing/#poap).

![ethereum.org POAP](./poap.png)

This website also has an alternative domain name powered by NFTs, **ethereum.eth**. Our `.org` address is centrally managed by a domain name system (DNS) provider, whereas ethereum`.eth` is registered on Ethereum via the Ethereum Name Service (ENS). And it's owned and managed by us. [Check our ENS record](https://app.ens.domains/name/ethereum.eth)

[More on ENS](https://app.ens.domains)

<Divider />

### NFT security {#nft-security}

Ethereum's security comes from proof-of-stake. The system is designed to economically disincentivize malicious actions, making Ethereum tamper-proof. This is what makes NFTs possible. Once the block containing your NFT transaction becomes finalized it would cost an attacker millions of ETH to change it. Anyone running Ethereum software would immediately be able to detect dishonest tampering with an NFT, and the bad actor would be economically penalized and ejected.

Security issues relating to NFTs are most often related to phishing scams, smart contract vulnerabilities or user errors (such as inadvertently exposing private keys), making good wallet security critical for NFT owners.

<ButtonLink to="/security/">
  More on security
</ButtonLink>

## Further reading {#further-reading}

- [A beginner's guide to NFTs](https://linda.mirror.xyz/df649d61efb92c910464a4e74ae213c4cab150b9cbcc4b7fb6090fc77881a95d) – _Linda Xie, January 2020_
- [EtherscanNFT tracker](https://etherscan.io/nft-top-contracts)
- [ERC-721 token standard](/developers/docs/standards/tokens/erc-721/)
- [ERC-1155 token standard](/developers/docs/standards/tokens/erc-1155/)

<Divider />

<QuizWidget quizKey="nfts" />
