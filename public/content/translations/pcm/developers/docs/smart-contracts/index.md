---
title: Introdukshon to smart kontracts
description: Dis one na ovaview of smart kontracts, wey dey fokus on dem unik ways wetin dey limit dem.
lang: pcm
---

## Wetin bi smart kontract? {#what-is-a-smart-contract}

One "smart kontract" na program wey dey run on di Ethereum blockchain. Na koleshon of code (im funshons) and data (im state) wey dey stay for spesifik address on di Ethereum blockchain.

Smart kontracts na type of [Ethereum akant](/developers/docs/accounts/). Dis mean sey dem get one balans and fit bi di target of transakshons. But nor user dey kontrol dem, insted dem dey deploy to di netwok and dey run as dem program am. User akants fit kome interact wit smart kontract as dem dey submit transakshons wey dey exekute funshon wey dem define on top di smart kontract. Smart kontracts fit define rules, laik regular kontract, and automatikaly forse dem thru di code. Dem nor fit delete smart kontracts normal, and dem nor fit rivarse dem intarakshons.

## Prerequisites {#prerequisites}

If yu just dey start abi dey look for less teknical introdukshon, wi rekomend awa [introdukshon to smart kontracts](/smart-contracts/).

Make sure sey yu don read on [akants](/developers/docs/accounts/), [transakshons](/developers/docs/transactions/) and di [Ethereum virtual machine](/developers/docs/evm/) bifor yu jump enta di world of smart kontracts.

## One digital vending machine {#a-digital-vending-machine}

Maybe di metaphor for smart contract wey betta pass na vending machine, as [Nick Szabo](https://unenumerated.blogspot.com/) take diskribe am. Wit di rite inputs, satain output sure.

To get snack from vending machine:

```
money + snack selection = snack dispensed
```

Dem program dis logik inside di vending machine.

Smart kontract, laik vending machine, get logik wey dem don program inside am. Here na simpol exampol of hau dis vending machine go look if e bi smart kontract wey dem write for Solidity:

```solidity
pragma solidity 0.8.7;

contract VendingMachine {

    // Declare state variables of the contract
    address public owner;
    mapping (address => uint) public cupcakeBalances;

    // When 'VendingMachine' contract is deployed:
    // 1. set the deploying address as the owner of the contract
    // 2. set the deployed smart contract's cupcake balance to 100
    constructor() {
        owner = msg.sender;
        cupcakeBalances[address(this)] = 100;
    }

    // Allow the owner to increase the smart contract's cupcake balance
    function refill(uint amount) public {
        require(msg.sender == owner, "Only the owner can refill.");
        cupcakeBalances[address(this)] += amount;
    }

    // Allow anyone to purchase cupcakes
    function purchase(uint amount) public payable {
        require(msg.value >= amount * 1 ether, "You must pay at least 1 ETH per cupcake");
        require(cupcakeBalances[address(this)] >= amount, "Not enough cupcakes in stock to complete this purchase");
        cupcakeBalances[address(this)] -= amount;
        cupcakeBalances[msg.sender] += amount;
    }
}
```

Just as vending machine dey rimuv di nid for vendor worka, smart kontracts fit riplase midolmen for plenti industris.

## Pamishonless {#permissionless}

Anybody fit write smart kontract and deploy am to di netwok. Yu just nid to learn hau to code for [smart kontract languaj](/developers/docs/smart-contracts/languages/), kon get enuf ETH to deploy yor kontract. To deploy smart kontract na teknikaly one transakshon, so yu nid pay [gas](/developers/docs/gas/) in di same way yu nid to pay gas for simpol ETH transfa. Haueva, gas kost for kontract deployment dey high far-far.

Ethereum get divelopa-friendly languajis wey yu fit yus write smart kontracts:

- Solidity
- Vyper

[More on languajis](/developers/docs/smart-contracts/languages/)

Haueva, dem suppose kompile am bifor dem fit deploy am so dat Ethereum virtual machine go fit interpret and store di kontract. [More on kompilashon](/developers/docs/smart-contracts/compiling/)

## Composability {#composability}

Smart contracts dey public on top Ethereum and you fit think about them like APIs wey dey open. Dis means sey yu fit koll oda kontracts for yor own smart kontract to ekstend wetin dey posibol wella. Kontracts fit even deploy oda kontracts.

Make yu learn more about [smart kontract komposability](/developers/docs/smart-contracts/composability/).

## Limitashon {#limitations}

Smart kontracts alone nor fit get infomashon about di "real-world" events bikos dem nor fit retrieve data from off-chain sorsis. Dis means sey dem nor fit respond to events in di real world. Dis na by disign. To dey rely on ekstanal informashon fit spoil konsensus, wey dey impotant for sekurity and disentralizashon.

Haueva, im dey impotant for blockchain aplikashons to bi abol to yus off-chain data. Di solushon na [oracles](/developers/docs/oracles/) wey bi tools wey dey kolet off-chain data and make am dey afailabol to smart kontracts.

Anoda tin wey dey limit smart kontract na di maximum kontract size. One smart kontract fit bi 24KB max abi im gas go finish. Dem fit kona dis by yusin [Di Diamond Pattern](https://eips.ethereum.org/EIPS/eip-2535).

## Multisig kontracts {#multisig}

Multisig (multipol-signature) kontracts na smart kontract akants wey nid multipol valid signatures to yus run one transakshon. Dis dey very yusful to dey afoid singol points of failure for kontracts to dey hold big-big amounts of ether abi oda tokens. Multisigs dey also divide responsibility for kontract exekushon and key manajment bitwin plenti partis and dey privent di loss of singol private key wey dey lead to loss of funds wey dem nor fit rivarse. For dis rizins, dem fit yus multisig kontracts for simpol DAO governans. Multisigs nid N signatures out of M possibol aseptabol signatures (wia N ≤ M, and M > 1) to execute am. Na `N = 3, M = 5` and `N = 4, M = 7` dem too dey yus. 4/7 multisig nid four out of seven valid signatures wey posibol. Dis one mean sey dem fit retrieve di funds even if dem don lost three signatures. In dis case, im also means sey di majority of key-holdas suppose agree and sign so dat di kontract go fit run.

## Smart kontract risorsis {#smart-contract-resources}

**OpenZeppelin Kontracts -** **_Library for sekure smart kontract divelopment._**

- [openzeppelin.com/contracts/](https://openzeppelin.com/contracts/)
- [GitHub](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [Komunity Forum](https://forum.openzeppelin.com/c/general/16)

## Further reading {#further-reading}

- [Coinbase: Wetin bi smart kontract?](https://www.coinbase.com/learn/crypto-basics/what-is-a-smart-contract)
- [Chainlink: Wetin bi smart kontract?](https://chain.link/education/smart-contracts)
- [Video: Simply Explain - Smart Kontracts](https://youtu.be/ZE2HxTmxfrI)
- [Cyfrin Updraft: Web3 to dey learn and audit platfom](https://updraft.cyfrin.io)
