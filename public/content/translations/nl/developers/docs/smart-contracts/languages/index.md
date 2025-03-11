---
title: Smart contract talen
description: Een overzicht en vergelijking van de twee belangrijkste smart contract-talen - Solidity en Vyper.
lang: nl
---

Een geweldig aspect van Ethereum is dat smart contracts kunnen worden geprogrammeerd met relatief ontwikkelaarsvriendelijke talen. Als u ervaring hebt met Python of een andere [taal met krullende haakjes](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), dan kunt een taal vinden met een vertrouwde syntaxis.

De twee meest actieve en onderhouden talen zijn:

- Solidity
- Vyper

Remix IDE voorziet in een uitgebreide ontwikkelomgeving voor het maken en testen van contracten in zowel Solidity als Vyper. [Probeer Remix IDE in uw browser](https://remix.ethereum.org) om te beginnen met programmeren.

Meer ervaren ontwikkelaars kunnen misschien ook Yul gebruiken. Dit is een tussentaal voor de [Ethereum Virtual Machine](/developers/docs/evm/), of Yul+, een uitbreiding op Yul.

Bent u nieuwsgierig en wilt u graag helpen bij het testen van nieuwe talen die nog volop in ontwikkeling zijn? Dan kunt u experimenteren met Fe, een opkomende taal voor smart contracts die momenteel nog in de kinderschoenen staat.

## Vereisten {#prerequisites}

Voorkennis van programmeertalen, vooral van JavaScript of Python, kan u helpen om de verschillen tussen smart contract-talen te begrijpen. We raden u ook aan om smart contracts als concept te doorgronden voordat u te diep graaft in de taalvergelijkingen. [Intro tot smart contracts](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objectgeoriënteerde taal op hoog niveau voor het implementeren van smart contracts.
- Taal met krullende haakjes die het meest beïnvloed is door C++.
- Statisch getypt (het type van een variabele is bekend tijdens het compileren).
- Ondersteunt:
  - Overerving (u kunt andere contracten uitbreiden).
  - Bibliotheken (u kunt herbruikbare code maken die u vanuit verschillende contracten kunt aanroepen, zoals statische functies in een statische klasse in andere objectgeoriënteerde programmeertalen).
  - Complexe door gebruikers gedefinieerde types.

### Belangrijke links {#important-links}

- [Documentatie](https://docs.soliditylang.org/en/latest/)
- [Solidity-taalportaal](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [Github](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) overbrugd naar [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Cheat sheet](https://reference.auditless.com/cheatsheet)
- [Solidity-blog](https://blog.soliditylang.org/)
- [Solidity op X (Twitter)](https://twitter.com/solidity_lang)

### Voorbeeldcontract {#example-contract}

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

Dit voorbeeld zou u een idee moeten geven van hoe de contractsyntax van Solidity eruit ziet. Voor een meer gedetailleerde beschrijving van de functies en variabelen, [zie de documentatie](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonische programmeertaal
- Strong typing
- Kleine en begrijpelijke compilercode
- Efficiënte bytecodegeneratie
- Heeft bewust minder mogelijkheden dan Solidity met als doel contracten veiliger en makkelijker te controleren te maken. Vyper ondersteunt geen:
  - Modifiers
  - Overerving
  - Inline assembly
  - Functie-overbelasting
  - Operator-overbelasting
  - Recursieve aanroepen
  - Oneindig lange lussen
  - Binaire vaste punten

Voor meer informatie, [lees de Vyper-rationale](https://vyper.readthedocs.io/en/latest/index.html).

### Belangrijke links {#important-links-1}

- [Documentatie](https://vyper.readthedocs.io)
- [Vyper door voorbeelden](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Meer Vyper door voorbeelden](https://vyper-by-example.org/)
- [Github](https://github.com/vyperlang/vyper)
- [Vyper-gemeenschap Discord-chat](https://discord.gg/SdvKC79cJk)
- [Cheat sheet](https://reference.auditless.com/cheatsheet)
- [Frameworks en tools voor de ontwikkeling van smart contracts voor Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - leer smart contracts van Vyper beveiligen en hacken](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - Vyper-kwetsbaarheidsvoorbeelden](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub voor ontwikkeling](https://github.com/zcor/vyper-dev)
- [Vyper greatest hits, voorbeelden smart contract](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Geweldige door Vyper samengestelde bronnen](https://github.com/spadebuilders/awesome-vyper)

### Voorbeeld {#example}

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

Dit voorbeeld zou u een idee moeten geven van de syntaxis van Vyper-contracten. Voor een meer gedetailleerde beschrijving van de functies en variabelen, [zie de documentatie](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul en Yul+ {#yul}

Bent u nieuw met Ethereum en hebt u nog niet eerder geprogrammeerd met smart contract-talen? Dan raden we u aan om aan de slag te gaan met Solidity of Vyper. Verdiep u pas in Yul of Yul+ als u bekend bent met de best practices voor de beveiliging van smart contracts en de specifieke kenmerken van het werken met de EVM.

**Yul**

- Tussentaal voor Ethereum.
- Ondersteunt de [EVM](/developers/docs/evm) en [Ewasm](https://github.com/ewasm), een WebAssembly met Ethereum-elementen. Het is ontworpen om een bruikbare gemene deler te zijn van beide platformen.
- Goed uitgangspunt voor optimalisatiestappen op hoog niveau waar zowel EVM- als Ewasm-platforms van kunnen profiteren.

**Yul+**

- Een zeer efficiënte uitbreiding op laag niveau voor Yul.
- In eerste instantie ontworpen voor een [optimistisch rollup](/developers/docs/scaling/optimistic-rollups/)-contract.
- Yul+ kan worden gezien als een experimentele upgrade van Yul, waarbij nieuwe functies worden toegevoegd.

### Belangrijke links {#important-links-2}

- [Yul-documentatie](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+-documentatie](https://github.com/fuellabs/yulp)
- [Yul+-speeltuin](https://yulp.fuel.sh/)
- [Yul+ -kennismakingspost](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Voorbeeldcontract {#example-contract-2}

Het volgende eenvoudige voorbeeld implementeert een machtsfunctie. Dit kan worden gecompileerd met `solc --strict-assembly --bin input.yul`. Het voorbeeld moet worden opgeslagen in het input.yul-bestand.

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

Heeft u al ervaring met smart contracts? Dan kunt u [hier](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example) een volledige ERC20-implementatie in Yul vinden.

## Fe {#fe}

- Statisch getypte taal voor de Ethereum Virtual Machine (EVM).
- Geïnspireerd door Python en Rust.
- Streeft ernaar om gemakkelijk te leren te zijn, zelfs voor ontwikkelaars die nieuw zijn in het Ethereum-ecosysteem.
- De ontwikkeling van Fe staat nog in de kinderschoenen, maar de taal had al zijn alpha release in januari 2021.

### Belangrijke links {#important-links-3}

- [Github](https://github.com/ethereum/fe)
- [Fe-aankondiging](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021-routekaart](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord Chat](https://discord.com/invite/ywpkAXFjZH)
- [Fe X (Twitter)](https://twitter.com/official_fe)

### Voorbeeldcontract {#example-contract-3}

Het volgende is een eenvoudig contract dat is geïmplementeerd in Fe.

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

## Hoe te kiezen {#how-to-choose}

Net als bij elke andere programmeertaal gaat het vooral om het kiezen van de juiste toepassing voor de juiste taak en om persoonlijke voorkeuren.

Hier zijn een paar dingen om rekening mee te houden als u nog geen van de talen hebt geprobeerd:

### Wat is er zo geweldig aan Solidity? {#solidity-advantages}

- Bent u een beginner? Dan zijn er veel tutorials en leermiddelen beschikbaar. Lees hier meer over in het gedeelte [Leren door te programmeren](/developers/learning-tools/).
- Goede tools voor ontwikkelaars beschikbaar.
- Solidity heeft een grote gemeenschap van ontwikkelaars, wat betekent dat u waarschijnlijk vrij snel antwoorden op uw vragen zult vinden.

### Wat is er zo geweldig aan Vyper? {#vyper-advatages}

- Geweldige manier voor Python ontwikkelaars die willen beginnen met het schrijven van smart contracts.
- Vyper heeft een kleiner aantal functies waardoor het zeer geschikt is om snel prototypes van ideeën te maken.
- Vyper wil eenvoudig te controleren en maximaal menselijk leesbaar zijn.

### Wat is er zo geweldig aan Yul en Yul+? {#yul-advantages}

- Simplistische en functionele taal op laag niveau.
- Hiermee komt u veel dichter bij de onbewerkte EVM, wat kan helpen om het gasverbruik van uw contracten te optimaliseren.

## Taalvergelijkingen {#language-comparisons}

Bekijk deze [Auditless-cheatsheet](https://reference.auditless.com/cheatsheet/) voor vergelijkingen van basissyntax, de contractlevenscyclus, interfaces, operatoren, gegevensstructuren, functies, besturingsstroom en meer

## Lees verder {#further-reading}

- [Solidity-contractenbibliotheek door OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
