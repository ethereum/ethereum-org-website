---
title: Teangacha conartha cliste
description: Forbhreathnú agus comparáid idir an dá phríomhtheanga conartha cliste - Solidity agus Vyper.
lang: ga
---

Is gné iontach de Ethereum é gur féidir conarthaí cliste a ríomhchlárú le teangacha atá sách éasca do na forbróirí. Má tá taithí agat ar Python nó ar aon [teanga "curly bracket"](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), is féidir leat teacht ar theanga le comhréir aithnidiúil.

Is iad seo an dá theanga is gníomhaí agus is mó cothabhála:

- Solidity
- Vyper

Soláthraíonn Remix IDE timpeallacht chuimsitheach forbartha chun conarthaí a chruthú agus a thástáil i Solidity agus Vyper araon. [Bain triail as an IDE Remix sa bhrabhsálaí](https://remix.ethereum.org) chun an códú a thosú.

Seans gur mhaith le forbróirí a bhfuil níos mó taithí acu Yul a úsáid freisin, teanga idirmheánach don [Ethereum Virtual Machine](/developers/docs/evm/), nó Yul+, síneadh ar Yul.

Má tá tú fiosrach agus fonn ort cabhrú le tástáil a dhéanamh ar theangacha nua atá fós á bhforbairt go mór, is féidir leat triail a bhaint as Fe, teanga chonarthach cliste atá ag teacht chun cinn agus atá fós ina thús.

## Réamhriachtanais {#prerequisites}

Is féidir le heolas atá agat cheana ar theangacha ríomhchlárúcháin, go háirithe ar JavaScript nó Python, cabhrú leat tuiscint a fháil ar dhifríochtaí i dteangacha conartha cliste. Molaimid duit freisin tuiscint a fháil ar choincheap na gconarthaí cliste roimh thochailt go ró-dhomhain isteach sna comparáidí teanga. [Réamhrá ar chonarthaí cliste](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Teanga ardleibhéil atá dírithe ar oibiachtaí chun conarthaí cliste a chur i bhfeidhm.
- Teanga "curly-bracket" atá go mór faoi thionchar C++.
- Scríofa go statach (tá an cineál athróige ar eolas ag am tiomsaithe).
- Tacaíochtaí:
  - Oidhreacht (is féidir leat síneadh a chur le conarthaí eile).
  - Leabharlanna (is féidir leat cód ath-inúsáidte a chruthú ar féidir leat glaoch air ó chonarthaí éagsúla - cosúil le feidhmeanna statacha i rang statach i dteangacha ríomhchláraithe eile atá dírithe ar oibiachtaí).
  - Cineálacha casta atá sainithe ag an úsáideoir.

### Naisc thábhachtacha {#important-links}

- [Doiciméadúchán](https://docs.soliditylang.org/en/latest/)
- [Tairseach Teanga Solidity](https://soliditylang.org/)
- [Solidity trí Shampla](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- Idir [Solidity Gitter Seomra comhrá](https://gitter.im/ethereum/solidity) go [ Solidity Matrix Seomra comhrá](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Bileog leideanna](https://reference.auditless.com/cheatsheet)
- [Blag Solidity](https://blog.soliditylang.org/)
- [Solidity ar Twitter](https://twitter.com/solidity_lang)

### Conradh samplach {#example-contract}

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

Ba chóir go dtabharfadh an sampla seo tuiscint duit ar chomhréir an chonartha Solidity. Tá tuairisc níos mionsonraithe a fháil ar na feidhmeanna agus na hathróga, [sna doiciméid](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Teanga ríomhchlárúcháin Pythonic
- Clóscríobh láidir
- Cód tiomsaitheora beag agus intuigthe
- Giniúint éifeachtach beartchóid
- Tá níos lú gnéithe aige d’aon ghnó ná Solidity agus é d'aidhm aige conarthaí a dhéanamh níos sláine agus níos éasca le hiniúchadh. Ní thacaíonn Vyper le:
  - Mionathraitheoirí
  - Oidhreacht
  - Tionól inlíne
  - Ró-ualú feidhme
  - Ró-ualú oibritheora
  - Glaonna athfhillteacha
  - Lúba fad gan teorainn
  - Pointí seasta dénártha

Le haghaidh tuilleadh faisnéise, [léigh réasúnaíocht Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Naisc thábhachtacha {#important-links-1}

- [Doiciméadúchán](https://vyper.readthedocs.io)
- [Vyper le Sampla](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Níos mó Vyper de réir Sampla](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper comhrá pobail Discord](https://discord.gg/SdvKC79cJk)
- [Bileog leideanna](https://reference.auditless.com/cheatsheet)
- [Creataí agus uirlisí forbartha conartha cliste do Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - foghlaim conas conarthaí cliste Vyper a dhaingniú agus a haiceáil](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples - samplaí leochaileachta Vyper](https://www.vyperexamples.com/reentrancy)
- [Mol forbartha Vyper](https://github.com/zcor/vyper-dev)
- [Samplaí de chonarthaí cliste vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Acmhainní coimeádta iontacha Vyper](https://github.com/spadebuilders/awesome-vyper)

### Sampla {#example}

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

Ba cheart go dtabharfadh an sampla seo tuiscint duit ar chomhréir chonartha Vyper. Le cur síos níos mionsonraithe a fháil ar na feidhmeanna agus na hathróga, [féach na doiciméid](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul agus Yul+ {#yul}

Mura bhfuil taithí agat ar Ethereum agus mura bhfuil aon chódú déanta agat le teangacha conartha cliste go fóill, molaimid duit tosú le Solidity nó Vyper. Ná breathnaigh ar Yul nó Yul+ go dtí go mbíonn tú eolach ar na cleachtais is fearr maidir le slándáil conarthaí cliste agus na sonraí a bhaineann le bheith ag obair leis an EVM.

**Yul**

- Teanga idirmheánach le haghaidh Ethereum.
- Tacaíonn sé le [EVM](/developers/docs/evm) agus [Ewasm](https://github.com/ewasm), WebAssembly ar a bhfuil blas Ethereum, agus tá sé deartha le bheith ina comhainmneoir inúsáidte ar an dá ardán.
- Sprioc mhaith le haghaidh céimeanna optamaithe ardleibhéil ar féidir leo leas a dhéanamh do ardáin EVM agus Ewasm araon.

**Yul+**

- Síneadh íseal-leibhéil, ard-éifeachtach ar Yul.
- Dearadh é ar dtús do chonradh [rolladh dóchasach](/developers/docs/scaling/optimistic-rollups/).
- Is féidir breathnú ar Yul+ mar thogra uasghrádaithe turgnamhach do Yul, ag cur gnéithe nua leis.

### Naisc thábhachtacha {#important-links-2}

- [Doiciméadúchán Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Doiciméadúchán Yul+](https://github.com/fuellabs/yulp)
- [Clós Súgartha Yul+](https://yulp.fuel.sh/)
- [Yul+ Réamhphost](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Conradh samplach {#example-contract-2}

Cuireann an sampla simplí seo a leanas feidhm chumhachta i ngníomh. Is féidir é a thiomsú le `solc --strict-assembly --bin input.yul`. Ba chóir an sampla a stóráil sa chomhad input.yul.

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

Má tá taithí mhaith agat cheana féin ar chonarthaí cliste, is féidir feidhmiú iomlán ERC20 in Yul a fháil [anseo ](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Teanga chlóscríofa go statach do Mheaisín Fíorúil Ethereum (EVM).
- Spreagtha ag Python agus Rust.
- Tá sé mar aidhm leis a bheith éasca le foghlaim - fiú d'fhorbróirí nach bhfuil taithí acu ar éiceachóras Ethereum.
- Tá Fe i dtús forbartha fós, eisíodh alfa don teanga i mí Eanáir 2021.

### Naisc thábhachtacha {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fógra Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Treochlár Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Comhrá Discord Fe](https://discord.com/invite/ywpkAXFjZH)
- [Fe ar Twitter](https://twitter.com/official_fe)

### Conradh samplach {#example-contract-3}

Seo a leanas conradh simplí a cuireadh i bhfeidhm in Fe.

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

## Conas rogha a dhéanamh {#how-to-choose}

Ar nós aon teanga ríomhchlárúcháin eile, baineann sé den chuid is mó leis an uirlis cheart a roghnú don phost ceart chomh maith le roghanna pearsanta.

Seo roinnt rudaí le cur san áireamh mura bhfuil triail bainte agat as aon cheann de na teangacha go fóill:

### Cad atá iontach faoi Solidity? {#solidity-advantages}

- Más tosaitheoir thú, tá go leor ranganna teagaisc agus uirlisí foghlama ar fáil. Féach tuilleadh faoi sin sa rannán [Foghlaim trí Chódú](/developers/learning-tools/).
- Tá uirlisí maithe forbróra ar fáil.
- Tá pobal mór forbróirí ag Solidity, rud a chiallaíonn go bhfaighidh tú freagraí ar do cheisteanna tapa go leor.

### Cad atá iontach faoi Vyper? {#vyper-advatages}

- Bealach iontach le haghaidh forbróirí Python atá ag iarraidh conarthaí cliste a scríobh.
- Tá líon níos lú gnéithe ag Vyper, rud a fhágann go bhfuil sé iontach chun smaointe a fhréamhshamhlú go tapa.
- Tá sé mar aidhm ag Vyper a bheith éasca le hiniúchadh agus an-inléite don duine.

### Cad atá iontach faoi Yul agus Yul+? {#yul-advantages}

- Teanga ísealleibhéil atá simplí agus feidhmiúil.
- Ligeann sé duit dul i bhfad níos gaire do EVM amh, a chuideoidh le húsáid gáis do chonarthaí a bharrfheabhsú.

## Comparáidí teanga {#language-comparisons}

Chun comparáid a dhéanamh idir an chomhréir bhunúsach, saolré an chonartha, comhéadain, oibreoirí, struchtúir sonraí, feidhmeanna, sreabhadh rialaithe, agus tuilleadh seiceáil an [bileog leideanna Auditless](https://reference.auditless.com/cheatsheet/)

## Tuilleadh léitheoireachta {#further-reading}

- [Leabharlann Conarthaí Solidity le OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity trí Shampla](https://solidity-by-example.org)
