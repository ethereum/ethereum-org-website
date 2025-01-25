---
title: Smart Kontract Languages
description: Ovaview and komparison of di two main smart kontract languajis - Solidity and Vyper.
lang: pcm
---

One ogbonge part about Ethereum bi sey dem fit program smart kontracts   yusin languajis wey divelopas sabi wella. If yu don sabi Python wella abi any [languaj wey dey yus curly-bracket](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages)bifor, yu fit find one languaj wey get syntax yu sabi.

Di two langusjis wey dey aktive and wey dem dey maintain pass na:

- Solidity
- Vyper

Remis IDE dey provide ogbonge divelopment environment to dey kreate and dey test kontracts for Solidity and Vyper. [Try di in-browsa Remix IDE](https://remix.ethereum.org) to start to dey code.

Divelopas wey sabi pass fit wont make yu yus Yul, one intamediate languaj for di [Ethereum Virtual Machine](/developers/docs/evm/),, abi Yul+, one ekstenshon to Yul.

If yu dey kurios and laik to helep test new languajis wey still dey onda heavy divelopment yu fit eksperiment wit Fe, one smart kontract languaj wey dey emerge wey just dey start.

## Prerequisites {#prerequisites}

Knowlej of programming languaj wey dey bifor, espeshialy of JavaScript abi Python, fit helep yu make sense of difrens in smart kontract languajis. Wi also rekomend make yu ondastand smart kontracts as one konsept bifor diggin deep-deep into di languaj komparisons. [Intro to smart kontracts](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Object-oriented, high-level languaj to dey implement smart kontracts.
- Curly-bracket languaj wey C++ don influens wella.
- Statikally typed (dem don sabi di type of one variabol at kompile taim).
- Supports:
  - Inheritans (wey yu fit ekstend oda kontracts).
  - Libraries (yu fit kreate kode wey yu fit yus again wey yu fit koll from difren kontracts - laik statik funshons for one statik klass in oda programming languajis wey base on object).
  - Komplex user-defined types.

### Important links {#important-links}

- [Dokumentashon](https://docs.soliditylang.org/en/latest/)
- [Solidity Languaj Portal](https://soliditylang.org/)
- [Solidity by Eksampol](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) bridged to [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Solidity Blog](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Kontract Eksampol {#example-contract}

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

Dis eksampol suppose give yu one sense of wetin Solidity kontract syntax bi laik. For more detailed diskripshon of di funshons and variabols, [see di docs]((https://docs.soliditylang.org/en/latest/contracts.html)).

## Vyper {#vyper}

- Pythonic programming languaj
- Strong typing
- Smoll and kompiler code wey dem fit ondastand
- Efficient bytecode generashon
- Deliberately get less feashures pass Solidity wit di aim to dey make kontracts more sekure and izy pass to audit. Vyper nor dey support:
  - Modifiers
  - Inheritans
  - Inline assembly
  - Funshon wey dey ovaload
  - Operator wey dey ovaload
  - Recursive kolling
  - Infinite-length loops
  - Binary fixed points

For more informashon, [read di Vyper rashonale](https://vyper.readthedocs.io/en/latest/index.html).

### Important links {#important-links-1}

- [Dokumentashon](https://vyper.readthedocs.io)
- [Vyper by Eksampol](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Eksampol](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper komunity Discord chat](https://discord.gg/SdvKC79cJk)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Smart kontract divelopment frameworks and tools for Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - learn hau yu fit sekure and hack Vyper smart kontracts](https://github.com/SupremacyTeam/VyperPunk)
- [VyperEksampols - Vyper vulnerability eksampols](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub for divelopment](https://github.com/zcor/vyper-dev)
- [Vyper hits smart kontracts eksampols wey great pass](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper don kurate risorsis](https://github.com/spadebuilders/awesome-vyper)

### Eksampol {#example}

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
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. checking conditions
    # 2. performing actions (potentially changing conditions)
    # 3. interacting with other contracts
    # If these phases are mixed up, the other contract could call
    # back into the current contract and modify the state or cause
    # effects (ether payout) to be performed multiple times.
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

Dis eksampol suppose give yu one sense of wetin Vyper kontract syntax bi laik. For more full diskripshon of di funshons and variabols, [see di docs](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul and Yul+ {#yul}

If yu dey new to Ethereum and neva do any coding wit smart kontract languajis yet, wi rekomend to start wit Solidity abi Vyper. Only look into Yul abi Yul+ wons yu dey familiar wit smart kontract sekurity best praktis and di spesifiks of working wit di EVM.

**Yul**

- Intamediate languaj for Ethereum.
- Make yu support di [EVM](/developers/docs/evm) and [Ewasm](https://github.com/ewasm), one Ethereum flavored WebAssembly, and dey design to bi yusabol komon denonimator of di two platfoms.
- Good target for high-level optimizashon stages wey fit benefit EVM and Ewasm platfoms di same way.

**Yul+**

- One low-level, very effishient ekstenshon to Yul.
- Dem first disign am for [optimistik rollup](/developers/docs/scaling/optimistic-rollups/) kontract.
- Yu fit look Yul+ as eksperimental upgrade proposal to Yul, as dem dey add new tins to am.

### Important links {#important-links-2}

- [Yul Dokumentashon](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Dokumentashon](https://github.com/fuellabs/yulp)
- [Yul+ Playground](https://yulp.fuel.sh/)
- [Yul+ Intro Post](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Kontract Eksampol {#example-contract-2}

Dis simpol eksampol dey show hau to do pawa funshon. Dem fit gada am to dey yus `solc --strict-assembly --bin input.yul`. Yu suppose store di eksampol in di input.yul file.

```
{
    function power(base, exponent) -> result
    {
        switch exponent
        case 0 { result := 1 }
        case 1 { result := base }
        default
        {
            result := power(mul(base, base), div(exponent, 2))
            if mod(exponent, 2) { result := mul(base, result) }
        }
    }
    let res := power(calldataload(0), calldataload(32))
    mstore(0, res)
    return(0, 32)
}
```

If yu don already sabi smart kontracts wella, yu fit find one full ERC20 implimentashon in Yul [here](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Na languaj wey dem statikaly type for di Ethereum Virtual Machine (EVM).
- Python and Rust inspaya am.
- Dem wont make am izy to learn -- even for di divelopas wey just dey enta Ethereum ekosystem.
- Fe divelopment just dey start, di languaj just get im first alpha riliz for January 2021.

### Important links {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe Anounsment](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021 Roadmap](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord Chat](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Kontract Eksampol {#example-contract-3}

Di followin na simpol kontract wey dem put inside Fe.

```
type BookMsg = bytes[100]

contract GuestBook:
    pub guest_book: map<address, BookMsg>

    event Signed:
        book_msg: BookMsg

    pub def sign(book_msg: BookMsg):
        self.guest_book[msg.sender] = book_msg

        emit Signed(book_msg=book_msg)

    pub def get_msg(addr: address) -> BookMsg:
        return self.guest_book[addr].to_mem()

```

## Hau yu fit shuse {#how-to-choose}

Just laik any oda programming languaj, na to dey shuse di koret tool for di koret work and wetin pesin laik.

Here na some tins to tink about if yu neva try any of di languajis:

### Wetin dey great about Solidity? {#solidity-advantages}

- If yu bi otondo, plenti tutorials and tools to yus learn dey. Make yu shek di [Learn by Coding](/developers/learning-tools/) sekshon for more.
- Tools for ogbonge developa dey afailabol.
- Solidity get big divelopa komunity, wey mean sey yu go kwik find ansa to yor kweshon.

### Wetin dey great about Vyper? {#vyper-advatages}

- Na great way to start for Python devs wey wan write smart kontracts.
- Vyper get smoll numba of features wey make am great for idia wey yu fit kopy.
- Vyper dey make am izy to audit and make humans fit read am wella.

### Wetin dey great about Yul and Yul+? {#yul-advantages}

- Na low-level languaj wey simpol and dey funshon.
- E dey allow make pesin dey klose to raw EVM, wey fit helep optimize di gas wey yor kontracts dey yus.

## Languaj komparisons {#language-comparisons}

If yu wan kompia basik syntax, di kontract lifecycle, intafaces, operators, data strukshures, funshons, kontrol flow, and more tins, make yu shek dis [cheatsheet wey Auditless do](https://reference.auditless.com/cheatsheet/)

## Further reading {#further-reading}

- [Solidity Kontracts Library, na OpenZeppelin write am](https://docs.openzeppelin.com/contracts)
- [Solidity by Eksampol](https://solidity-by-example.org)
