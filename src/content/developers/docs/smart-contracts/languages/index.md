---
title: Smart contract languages
description: An overview and comparison of the two main smart contract languages – Solidity and Vyper.
lang: en
sidebar: true
---

One huge advantage of Ethereum is that smart contracts can be programmed using relatively developer-friendly languages. If you're experienced with Python or JavaScript, you should find a language with familiar syntax.

The two most-maintained languages are:

- Solidity
- Vyper

## Prerequisites

You'll need to know some JavaScript or Python to make sense of differences in smart contract languages. We also recommend you understand smart contracts as a concept before digging too deep into the language comparisons. [Intro to smart contracts](/developers/docs/smart-contracts/).

## Solidity

- Influenced by C++, Python and JavaScript.
- Statically typed (the type of a variable is known at compile time)
- Supports:
  - inheritance (you can extend other contracts)
  - libraries (you can create reusable code that you can call from different contracts – like static functions in a static class in other object oriented programming languages)
  - complex user-defined types

### Important links

- [Documentation](https://solidity.readthedocs.io)
- [Solidity by Example](https://solidity.readthedocs.io/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity/)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Solidity blog](https://solidity.ethereum.org/)

<!-- | Pros <Twemoji svg text=":white_check_mark:" />              | Cons <Twemoji svg text=":cross_mark:" /> |
| ----------------------------------------------------------- | ---------------------------------------- |
| A lot of Solidity devs to help you                          |                                          |
| A lot of tutorials/resources use Solidity rather than Vyper |                                          |
 -->

### Example contract

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // The keyword "public" makes variables
    // accessible from other contracts
    address public minter;
    mapping (address => uint) public balances;

    // Events allow clients to react to specific
    // contract changes you declare
    event Sent(address from, address to, uint amount);

    // Constructor code is only run when the contract
    // is created
    constructor() {
        minter = msg.sender;
    }

    // Sends an amount of newly created coins to an address
    // Can only be called by the contract creator
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Sends an amount of existing coins
    // from any caller to an address
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

This example should give you a sense of what Solidity contract syntax is like. For a more detailed description of the functions and variables, [see the docs](https://solidity.readthedocs.io/en/v0.7.1/introduction-to-smart-contracts.html#subcurrency-example).

## Vyper

- Pythonic programming language
- Strong typing
- Small and understandable compiler code
- Deliberately has less features than Solidity with the aim of making contracts more secure and easier to audit. Vyper strips out:
  - Modifiers
  - Inheritance
  - Inline assembly
  - Function overloading
  - Operator overloading
  - Recursive calling
  - Infinite-length loops
  - Binary fixed points

For more information, [read Vyper rationale](https://vyper.readthedocs.io/en/latest/index.html)

### Important links

- [Documentation](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper Gitter Chatroom](https://gitter.im/vyperlang/community)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Update Jan 8, 2020](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

### Example

```python
# Open Auction

# Auction params
# Beneficiary receives money from the highest bidder
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Current state of auction
highestBidder: public(address)
highestBid: public(uint256)

# Set to true at the end, disallows any change
ended: public(bool)

# Keep track of refunded bids so we can follow the withdraw pattern
pendingReturns: public(HashMap[address, uint256])

# Create a simple auction with `_bidding_time`
# seconds bidding time on behalf of the
# beneficiary address `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Bid on the auction with the value sent
# together with this transaction.
# The value will only be refunded if the
# auction is not won.
@external
@payable
def bid():
    # Check if bidding period is over.
    assert block.timestamp < self.auctionEnd
    # Check if bid is high enough
    assert msg.value > self.highestBid
    # Track the refund for the previous high bidder
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Track new high bid
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Withdraw a previously refunded bid. The withdraw pattern is
# used here to avoid a security issue. If refunds were directly
# sent as part of bid(), a malicious bidding contract could block
# those refunds and thus block new higher bids from coming in.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# End the auction and send the highest bid
# to the beneficiary.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send Ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (Ether payout) to be performed multiple times.
    # If functions called internally include interaction with external
    # contracts, they also have to be considered interaction with
    # external contracts.

    # 1. Conditions
    # Check if auction endtime has been reached
    assert block.timestamp >= self.auctionEnd
    # Check if this function has already been called
    assert not self.ended

    # 2. Effects
    self.ended = True

    # 3. Interaction
    send(self.beneficiary, self.highestBid)
```

This example should give you a sense of what Vyper contract syntax is like. For a more detailed description of the functions and variables, [see the docs](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## How to choose

| Choose Solidity if...                                  | Choose Vyper if...                                        |
| ------------------------------------------------------ | --------------------------------------------------------- |
| You want to get up and running as quickly as possible  | You want to prioritise security                           |
| You want to work in a JavaScript-like language         | You want to work in a Pythonic language                   |
| You might need a lot of support (tutorials, questions) | You're a solo learner (there's a smaller Vyper community) |
| You want to work in the Ethereum ecosystem soon        |                                                           |

## Language comparisons

For comparisons of basic syntax, the contract lifecycle, interfaces, operators, data structures, functions, control flow, and more check out this [cheatsheet by Auditless](https://reference.auditless.com/cheatsheet/)

## Further reading

_Know of a community resource that helped you? Edit this page and add it!_
