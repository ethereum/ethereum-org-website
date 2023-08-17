---
title: How to implement an ERC-721 market
description: How to put tokenized items for sale on a decentralized classifieds board
author: "Alberto Cuesta Cañada"
tags: ["smart contracts", "erc-721", "solidity", "tokens"]
skill: intermediate
lang: en
published: 2020-03-19
source: Hackernoon
sourceUrl: https://hackernoon.com/how-to-implement-an-erc721-market-1e1a32j9
---

In this article, I’m going to show you how to code Craigslist for the Ethereum blockchain.

Before Gumtree, Ebay and Craigslist, classified boards were mostly made of cork or paper. There were classifieds boards in school corridors, newspapers, streetlights, storefronts.

All that changed with the internet. The number of people that could see a specific classified board multiplied by many orders of magnitude. With that, the markets they represent became much more efficient and scaled to global size. Ebay is a massive business which traces its origins to these physical classifieds boards.

With blockchain these markets are set to change once more, let me show you how.

## Monetization {#monetization}

The business model of a public blockchain classifieds board will need to be different from that of Ebay and company.

First, there is [the decentralization angle](/developers/docs/web2-vs-web3/). Existing platforms need to maintain their own servers. A decentralized platform is maintained by its users, so the cost of running the core platform drops to zero for the platform owner.

Then there is the front end, the website or interface that gives access to the platform. Here there are many options. The platform owners can restrict access and force everyone to use their interface, charging a fee. The platform owners can also decide to open access (Power to the People!) and let anyone build interfaces to the platform. Or the owners could decide any approach in the middle of those extremes.

_Business leaders with more vision than I will know how to monetize this. All I see is that this is different from the status quo and probably profitable._

Furthermore, there is the automation and payments angle. Some things can be very [effectively tokenized](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com) and traded in a classifieds board. Tokenized assets are easily transferred in a blockchain. Highly complex payment methods can be easily implemented in a blockchain.

I’m just smelling a business opportunity here. A classifieds board with no running costs can easily be implemented, with complex payment paths included in each transaction. I’m sure someone will come up with an idea about what to use this for.

I’m just happy building it. Let’s have a look at the code.

## Implementation {#implementation}

Some time ago we started an [open source repository](https://github.com/HQ20/contracts?ref=hackernoon.com) with business case example implementations and other goodies, please have a look.

The code for this [Ethereum Classifieds Board](https://github.com/HQ20/contracts/tree/master/contracts/classifieds?ref=hackernoon.com) is there, please use it and abuse it. Just be aware that the code hasn’t been audited and you need to do your own due diligence before letting money go into it.

The basics of the board are not complex. All the adverts in the board will be just a struct with a few fields:

```solidity
struct Trade {
  address poster;
  uint256 item;
  uint256 price;
  bytes32 status; // Open, Executed, Cancelled
}
```

So there is someone posting the advert. An item for sale. A price for the item. The status of the trade which can be open, executed or cancelled.

All these trades will be kept in a mapping. Because everything in Solidity seems to be a mapping. Also because it is convenient.

```solidity
mapping(uint256 => Trade) public trades;
```

Using a mapping just means that we have to come up with an id for each advert before posting it, and we will need to know the id of an advert before we can operate on it. There are multiple ways of dealing with this either in the smart contract or in the front-end. Please ask if you need some pointers.

Next comes the question of what are those items we deal with, and what is this currency that is used to pay for the transaction.

For the items, we are just going to ask that they implement the [ERC-721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/IERC721.sol?ref=hackernoon.com) interface, which really is just a way of representing real world items in a blockchain, although it [works best with digital assets](https://hackernoon.com/tokenization-of-digital-assets-g0ffk3v8s?ref=hackernoon.com). We are going to specify our own ERC721 contract in the constructor, meaning that any assets in our classifieds board need to have been tokenized beforehand.

For the payments, we are going to do something similar. Most blockchain projects define their own [ERC-20](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol?ref=hackernoon.com) cryptocurrency. Some others prefer to use a mainstream one like DAI. In this classifieds board, you just need to decide on construction what your currency will be. Easy.

```solidity
constructor (
  address _currencyTokenAddress, address _itemTokenAddress
) public {
  currencyToken = IERC20(_currencyTokenAddress);
  itemToken = IERC721(_itemTokenAddress);
  tradeCounter = 0;
}
```

We are getting there. We’ve got adverts, items for trade and a currency for payments. To make an advert means to put an item in escrow to show both that you have it and that you haven’t posted it twice, possibly in a different board.

The code below does exactly that. Puts the item in escrow, creates the advert, does some housekeeping.

```solidity
function openTrade(uint256 _item, uint256 _price)
  public
{
  itemToken.transferFrom(msg.sender, address(this), _item);
  trades[tradeCounter] = Trade({
    poster: msg.sender,
    item: _item,
    price: _price,
    status: "Open"
  });
  tradeCounter += 1;
  emit TradeStatusChange(tradeCounter - 1, "Open");
}
```

To accept the trade means to choose an advert (trade), pay the price, receive the item. The code below retrieves a trade. Checks it’s available. Pays the item. Retrieves the item. Updates the advert.

```solidity
function executeTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(trade.status == "Open", "Trade is not Open.");
  currencyToken.transferFrom(msg.sender, trade.poster, trade.price);
  itemToken.transferFrom(address(this), msg.sender, trade.item);
  trades[_trade].status = "Executed";
  emit TradeStatusChange(_trade, "Executed");
}
```

Finally, we have an option for sellers to back out of a trade before a buyer accepts it. In some models, adverts would instead be live for a period of time before they expire. Your choice, depending on the design of your market.

The code is very similar to that used to execute a trade, only that there is no currency changing hands and the item goes back to the advert poster.

```solidity
function cancelTrade(uint256 _trade)
  public
{
  Trade memory trade = trades[_trade];
  require(
    msg.sender == trade.poster,
    "Trade can be cancelled only by poster."
  );
  require(trade.status == "Open", "Trade is not Open.");
  itemToken.transferFrom(address(this), trade.poster, trade.item);
  trades[_trade].status = "Cancelled";
  emit TradeStatusChange(_trade, "Cancelled");
}
```

That’s it. You made it to the end of the implementation. It is quite surprising how compact some business concepts are when expressed in code, and this is one of those cases. Check the complete contract [in our repo](https://github.com/HQ20/contracts/blob/master/contracts/classifieds/Classifieds.sol).

## Conclusion {#conclusion}

Classifieds boards are a common market configuration that scaled massively with the internet, becoming a hugely popular business model with a few monopolistic winners.

Classifieds boards also happen to be an easy tool to replicate in a blockchain environment, with very specific features that will make a challenge to the existing giants possible.

In this article, I made an attempt to bridge the business reality of a classifieds board business with the technological implementation. This knowledge should help you to create a vision and a roadmap for implementation if you have the right skills.

As always, if you are out to build anything fun and would welcome some advice, please [drop me a line](https://albertocuesta.es/)! I’m always happy to help.
