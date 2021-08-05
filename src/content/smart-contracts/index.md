---
title: What is an Ethereum smart contract?
description: An intro to understanding and developing smart contracts
lang: en
emoji: ":handshake:"
sidebar: true
sidebarDepth: 2
summaryPoints:
  [
    "Smart contracts are computer programs.",
    "Ethereum had smart contracts in mind from the beginning.",
    "It's easy to start building smart contracts.",
  ]
---

## What's a smart contract? {#smart-contract-definition}

A smart contract is a computer program that runs on decentralized networks/computers. 

The creators of Ethereum had smart contracts in mind [from the beginning](/whitepaper/), so this is a good place to learn about them. However, please note that other blockchain projects also have them or are developing them.

## Smart contracts: basic explanation {#basic-information}

Smart contracts are programs. Each smart contract on Ethereum has its own account — this is where the program lives and stores data.

Smart contracts can do anything that other complete-computer programs do. They can perform computations, enter data, send communications and even generate graphics. Here are some popular, real-world examples:

- An automatic, open currency exchange
- A cat-collecting and -breeding game
- A US Dollar coin factory
- A standard that lets people create customized, interoperable currencies

### Smart contracts vs. computer programs {#contracts-vs-programs}

With that in mind, there's a reason that we have this specific term: smart contracts and other computer programs differ. The differences come more from *where* they are and not from *what* they are. 

Ethereum smart contracts live on the blockchain and execute within a worldwide virtual computer called the [Ethereum Virtual Machine](/developers/docs/evm/). Nobody owns this computer, nobody can make unilateral changes, and everybody can see what's happening on it. That means smart contracts have some specific properties:

- Everyone can see the code.
- Programmers can't modify the program once it's published.
- The program behaves the same way for everyone, given the same context.
- The program is limited in terms of data access.

Contrast that with a service running on a traditional cloud company server: 

- You do not see the code.
- The cloud company can modify things at will.
- The program might behave differently depending on various factors.
- The program can access any data the company provides it.

With that in mind, smart contracts on Ethereum are programs that are:

- **Open:** You can access the code. (And, therefore, you can prove that it works the way it's supposed to.)
- **Immutable:** People can't change the code once it's written (but they can change variables). Programmers have to make a new contract if they want to make changes.
- **Deterministic:** The program will behave the same way given the same input and context.
- **Limited in context:** Smart contracts have some restrictions — they can't read data from outside the blockchain [without help](https://en.wikipedia.org/wiki/Blockchain_oracle), for example.

A note about that final point: more isn't always better. Limiting the type of data makes smart contracts more secure — people can't supply fake information if everything is coming from a public blockchain.

### Quick example of smart contract function {#example-code}

Let's look at a quick example before any more explanation: an open auction smart contract on Ethereum. To work as an automatic auction, the program needs to:

- Define important information to store, such as the duration of the sale, the current highest bid, and the current highest bidder
- Supply error messages when users make mistakes
- Accept money from new high bids
- Return money to previous high bids
- Switch the auction off when the time runs out 
- Send the winning bid to the seller

The following code is from a [beginners' smart contract tutorial](https://docs.soliditylang.org/en/v0.8.6/solidity-by-example.html#simple-open-auction). You don't have to be a programmer to follow along — just read the comments that appear in (relatively) plain English after slashes.

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.4;
contract SimpleAuction {
    // Parameters of the auction. Times are either
    // absolute unix timestamps (seconds since 1970-01-01)
    // or time periods in seconds.
    address payable public beneficiary;
    uint public auctionEndTime;

    // Current state of the auction.
    address public highestBidder;
    uint public highestBid;

    // Allowed withdrawals of previous bids
    mapping(address => uint) pendingReturns;

    // Set to true at the end, disallows any change.
    // By default initialized to `false`.
    bool ended;

    // Events that will be emitted on changes.
    event HighestBidIncreased(address bidder, uint amount);
    event AuctionEnded(address winner, uint amount);

    // Errors that describe failures.

    // The triple-slash comments are so-called natspec
    // comments. They will be shown when the user
    // is asked to confirm a transaction or
    // when an error is displayed.

    /// The auction has already ended.
    error AuctionAlreadyEnded();
    /// There is already a higher or equal bid.
    error BidNotHighEnough(uint highestBid);
    /// The auction has not ended yet.
    error AuctionNotYetEnded();
    /// The function auctionEnd has already been called.
    error AuctionEndAlreadyCalled();

    /// Create a simple auction with `_biddingTime`
    /// seconds bidding time on behalf of the
    /// beneficiary address `_beneficiary`.
    constructor(
        uint _biddingTime,
        address payable _beneficiary
    ) {
        beneficiary = _beneficiary;
        auctionEndTime = block.timestamp + _biddingTime;
    }

    /// Bid on the auction with the value sent
    /// together with this transaction.
    /// The value will only be refunded if the
    /// auction is not won.
    function bid() public payable {
        // No arguments are necessary, all
        // information is already part of
        // the transaction. The keyword payable
        // is required for the function to
        // be able to receive Ether.

        // Revert the call if the bidding
        // period is over.
        if (block.timestamp > auctionEndTime)
            revert AuctionAlreadyEnded();

        // If the bid is not higher, send the
        // money back (the revert statement
        // will revert all changes in this
        // function execution including
        // it having received the money).
        if (msg.value <= highestBid)
            revert BidNotHighEnough(highestBid);

        if (highestBid != 0) {
            // Sending back the money by simply using
            // highestBidder.send(highestBid) is a security risk
            // because it could execute an untrusted contract.
            // It is always safer to let the recipients
            // withdraw their money themselves.
            pendingReturns[highestBidder] += highestBid;
        }
        highestBidder = msg.sender;
        highestBid = msg.value;
        emit HighestBidIncreased(msg.sender, msg.value);
    }

    /// Withdraw a bid that was overbid.
    function withdraw() public returns (bool) {
        uint amount = pendingReturns[msg.sender];
        if (amount > 0) {
            // It is important to set this to zero because the recipient
            // can call this function again as part of the receiving call
            // before `send` returns.
            pendingReturns[msg.sender] = 0;

            if (!payable(msg.sender).send(amount)) {
                // No need to call throw here, just reset the amount owing
                pendingReturns[msg.sender] = amount;
                return false;
            }
        }
        return true;
    }

    /// End the auction and send the highest bid
    /// to the beneficiary.
    function auctionEnd() public {
        // It is a good guideline to structure functions that interact
        // with other contracts (i.e. they call functions or send Ether)
        // into three phases:
        // 1. checking conditions
        // 2. performing actions (potentially changing conditions)
        // 3. interacting with other contracts
        // If these phases are mixed up, the other contract could call
        // back into the current contract and modify the state or cause
        // effects (ether payout) to be performed multiple times.
        // If functions called internally include interaction with external
        // contracts, they also have to be considered interaction with
        // external contracts.

        // 1. Conditions
        if (block.timestamp < auctionEndTime)
            revert AuctionNotYetEnded();
        if (ended)
            revert AuctionEndAlreadyCalled();

        // 2. Effects
        ended = true;
        emit AuctionEnded(highestBidder, highestBid);

        // 3. Interaction
        beneficiary.transfer(highestBid);
    }
}
```

And there you have it — a smart contract. This is a well-annotated example with descriptive function names, but there's some technical language in the comments. Don't worry if you don't understand all of it.

## Smart contracts: background information {#background-information}

### Why "smart contract"? {#etymology}

Why not just call smart contracts "blockchain computer programs"? The main reason is that the term "smart contract" predates blockchain by over 10 years. 

Nick Szabo gets the credit for the term in a [1996 paper](https://www.fon.hum.uva.nl/rob/Courses/InformationInSpeech/CDROM/Literature/LOTwinterschool2006/szabo.best.vwh.net/smart_contracts_2.html). He says "A smart contract is a set of promises, specified in digital form, including protocols within which the parties perform on these promises." He goes on to give the example of a vending machine.

### Use cases for smart contracts {#using-smart-contracts}

Not everything has to be on a blockchain. Some things might even work better if they're *not* on-chain. For any given process, the main benefits of using a smart contract are:

- Nobody can arbitrarily change how it works
- Everyone can see how it works
- The software is unstoppable once it's published

So, if you need both of those things, a smart contract is probably your best bet. Actual and potential examples include:

- Currency exchanges
- Auctions
- Publishing
- Mortgages
- Provenance and titles
- Escrow accounts
- Voting
- Games
- Charitable donation
- Data relay
- Art creation

Ethereum currently has some constraints, especially when it comes to data storage and processing power. As a result, there are temporarily some practical limits on the feasibility of demanding applications like file serving, streaming, AI processing, and graphics rendering.

If you want to permanently make a process — any process — available for all Ethereum users to interact with and verify, then a smart contract is the way to go.

## Building smart contracts {#contract-development}

You can start developing smart contracts at any skill level. There are hundreds of tutorials and even a few public test networks where you can test your programs live. [Rinkeby](https://faucet.rinkeby.io), [Ropsten](https://faucet.ropsten.be), and [Goerli](https://faucet.goerli.mudit.blog) are some examples of testnets where you can use fake ETH (found at those links) to deploy your first projects. 

**Do not use the same wallet address for testing as you do for your real money!** Combining testnet and mainnet addresses, while possible, often leads to security breaches and costly mistakes.

In any case, there's plenty of technical information out there — including some very well-maintained documentation. This article will assume want a more basic overview.

### Smart contract languages {#contract-languages}

The main computer programming languages for Ethereum smart contracts are Solidity and Vyper. Solidity uses syntax similar to JavaScript, with C++ and Python influences. Vyper is similar to Python.

Eventually, though, the contract has to be translated to Ethereum Virtual Machine operating codes. After you write your program, you would use a compiler to change it into something the computer can understand.

### Smart contract development environments {#development-environment}

You don't need a lot of fancy stuff to write, test, and deploy an Ethereum smart contract. Most developers use something like the following stack:

- A text editor (e.g. Vim, TextEdit, Atom, Notepad)
- A test blockchain (e.g. Ganache, Hardhat)
- A development environment (e.g. Truffle, Hardhat)
- An Ethereum wallet (e.g. Metamask, WalletConnect-compatible wallets)
- An up-to-date Ethereum node on the target network — or, more commonly, a cloud service (e.g. Infura, Alchemy)
- If applicable, an app front-end framework and Ethereum-specific libraries (e.g. React, Next, and ethers, web3, redux)

The workflow usually looks something like this:
1. Designing your program
2. Writing the code 
3. Compiling to machine code
4. Testing on a local blockchain
5. Possibly testing on a public testnet
6. Publishing to Ethereum mainnet

Again, there are plenty of tutorials out there. Please check some of them out if you want some hands-on learning.

### Upgrading smart contracts {#upgradable-smart-contracts}

Time marches on — and smart contracts have to lock step. However, you can't change a contract once it's published. 

So how do you upgrade? Most major projects do this by migrating. It's a complex process that takes some preparation to do really well.

Essentially, you publish a new contract and direct your users to it. To get an idea of how this works at scale, check out [Uniswap's upgrade story](https://uniswap.org/blog/uniswap-v3/). Another project with multiple versions is [wETH](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), a currency that lets ETH behave more like standardized Ethereum assets.

### Starting a project {#first-projects}

If you're relatively new to programming, here are some basic tips:

- **Never put real money in your test wallet**
- If you get compiler errors, read discussions on developer forums like [StackExchange](https://ethereum.stackexchange.com)
- Read the documentation for the language you're using
- Find and follow a full-stack development tutorial
- Set your credentials as environment or composer variables rather than hard-coding them in your programs
- Read up about known code security risks
- Use accepted standards for common smart contract applications, such as [ERC20 for fungible tokens](https://docs.openzeppelin.com/contracts/2.x/erc20)(sometimes it's OK to copy and paste)

Now is always a good time to start. At the time of writing, people are doing some incredible things: everything from procedurally generated on-chain graphics to automated financial yield optimization. 

Anything is possible. The EVM is a Turing-complete computer. Beyond practical concerns like data storage and processing power, you're only limited by your own creativity and programming skill. 

### Further reading and resources {#further-reading}

- Have fun getting started with smart contracts: [Crypto Zombies](https://cryptozombies.io)
- Online development environment: [Remix](https://remix.ethereum.org)
- More robust discussion on smart contracts: [The Ethereum book](https://github.com/ethereumbook/ethereumbook/blob/develop/07smart-contracts-solidity.asciidoc#what-is-a-smart-contract)

<--

SCRATCH/NOTES/UNDEVELOPED

There's some overlap here. For example, you can write a smart contract to accept commands only from select addresses — essentially making it behave differently for different people. However, the difference is that smart contract will *always* behave the way it's written.

### Are smart contracts open source? {#open-source}

People publish smart contracts under a variety of licenses. Not all are open source.

Just because the code is accessible does not mean the software is free. However, enforcing your intellectual property rights might be a challenge.

If you start poking around, you'll find that there are many instances of people essentially copy-pasting code from successful projects and publishing it as their own. Is this practice ethical? Is it even effective or secure?

-->
