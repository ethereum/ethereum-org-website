---
title: Jazyk chytrých smluv
description: Přehled a srovnání dvou hlavních programovacích jazyků pro smart kontrakty – Solidity a Vyper.
lang: cs
---

Jednou z výhod Etherea je, že smart kontrakty lze programovat v relativně uživatelsky přívětivých programovacích jazycích. Pokud máte zkušenosti s Pythonem nebo jiným [jazykem používajícím složené závorky](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), můžete si najít jazyk s podobnou syntaxí.

Dva nejaktivnější a nejvíce udržované jazyky jsou:

- Solidity
- Vyper

Remix IDE poskytuje komplexní vývojové prostředí pro vytváření a testování kontraktů jak v Solidity, tak ve Vyperu. [Vyzkoušejte webový Remix IDE](https://remix.ethereum.org), abyste mohli začít kódovat.

Zkušenější vývojáři mohou také chtít používat Yul, což je intermediární jazyk pro [Virtuální stroj Etherea](/developers/docs/evm/), nebo Yul+, rozšíření jazyka Yul.

Pokud jste zvědaví a rádi pomáháte testovat nové jazyky, které jsou stále ve fázi intenzivního vývoje, můžete experimentovat s Fe, nově vznikajícím jazykem pro smart kontrakty, který je v současnosti ještě v rané fázi.

## Předpoklady {#prerequisites}

Předchozí znalosti programovacích jazyků, zejména JavaScriptu nebo Pythonu, vám mohou pomoci lépe porozumět rozdílům mezi jazyky pro smart kontrakty. Doporučujeme také, abyste nejprve pochopili koncept smart kontraktů, než se ponoříte do srovnání jazyků. [Úvod do smart kontraktů](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objektově orientovaný, vysoce úrovňový jazyk pro implementaci chytrých kontraktů.
- Jazyk se složenými závorkami, který je nejvíce ovlivněn jazykem C++.
- Staticky typovaný (typ proměnné je znám v době kompilace).
- Podporuje:
  - Dědičnost (můžete rozšiřovat jiné kontrakty).
  - Knihovny (můžete vytvářet opakovaně použitelný kód, který můžete volat z různých kontraktů – podobně jako statické funkce ve statické třídě v jiných objektově orientovaných programovacích jazycích).
  - Komplexní uživatelem definované typy.

### Důležité odkazy {#important-links}

- [Dokumentace](https://docs.soliditylang.org/en/latest/)
- [Portál jazyka Solidity](https://soliditylang.org/)
- [Solidity by Example](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) propojeno se [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Ukázkový kontrakt {#example-contract}

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

Tento příklad by vám měl poskytnout představu o tom, jaká je syntaxe kontraktů v Solidity. Pro podrobnější popis funkcí a proměnných [si přečtěte dokumentaci](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonický programovací jazyk
- Silné typování
- Malý a srozumitelný kompilátor
- Efektivní generování bytekódu
- Úmyslně má méně funkcí než Solidity s cílem učinit kontrakty bezpečnějšími a snáze auditovatelnými. Vyper nepodporuje:
  - Modifikátory
  - #Dědičnost
  - Inline sestavení (assembly)
  - Přetěžování funkcí
  - Přetěžování operátorů
  - Rekurzivní volání
  - Nekonečné smyčky
  - Binární pevné body

Pro více informací si přečtěte [Vyper rationale](https://vyper.readthedocs.io/en/latest/index.html).

### Důležité odkazy {#important-links-1}

- [Dokumentace](https://vyper.readthedocs.io)
- [Vyper by Example](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [More Vyper by Example](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Discord chat Vyper komunity](https://discord.gg/SdvKC79cJk)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Frameworky a nástroje pro vývoj smart kontraktů v jazyce Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk – naučte se zabezpečit a hackovat smart kontrakty v jazyce Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples – příklady zranitelnosti ve Vyper](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub pro vývojáře](https://github.com/zcor/vyper-dev)
- [Příklady nejlepších chytrých kontraktů na Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Úžasné Vyperem kurátorované zdroje](https://github.com/spadebuilders/awesome-vyper)

### Příklad {#example}

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

Tento příklad by vám měl poskytnout představu o tom, jaká je syntaxe kontraktů ve Vyperu. Pro podrobnější popis funkcí a proměnných [si přečtěte dokumentaci](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul a Yul+ {#yul}

Pokud jste v Ethereum nováčkem a ještě jste neprogramovali v jazycích pro smart kontrakty, doporučujeme začít se Solidity nebo Vyperem. Na Yul nebo Yul+ se zaměřte až poté, co si osvojíte osvědčené postupy v oblasti bezpečnosti smart kontraktů a specifika práce s EVM.

**Yul**

- Pokročilý jazyk pro Ethereum.
- Podporuje [EVM](/developers/docs/evm) i [Ewasm](https://github.com/ewasm), což je varianta WebAssembly přizpůsobená pro Ethereum, a je navržen tak, aby byl použitelným společným základem pro obě platformy.
- Dobrá volba pro optimalizační fáze na vyšší úrovni, které mohou mít stejný přínos jak pro platformy EVM, tak pro Ewasm.

**Yul+**

- Nízkoúrovňové, vysoce efektivní rozšíření Yulu.
- Původně navržen pro kontrakt [optimistického rollupu](/developers/docs/scaling/optimistic-rollups/).
- Yul+ lze považovat za experimentální návrh upgradu Yul, který do něj přidává nové funkce.

### Důležité odkazy {#important-links-2}

- [Dokumentace Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentace Yul+](https://github.com/fuellabs/yulp)
- [Playground Yul+](https://yulp.fuel.sh/)
- [Úvodní příspěvek Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Ukázkový kontrakt {#example-contract-2}

Následující jednoduchý příklad implementuje funkci mocniny. Lze jej zkompilovat pomocí příkazu `solc --strict-assembly --bin input.yul`. Příklad by měl být uložen v souboru input.yul.

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

Pokud již máte se smart kontrakty bohaté zkušenosti, plnou implementaci ERC20 v Yul můžete najít [zde](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Staticky typovaný jazyk pro Virtuální stroj Etherea (EVM).
- Inspirován jazyky Python a Rust.
- Cílem je, aby byl snadno naučitelný – i pro vývojáře, kteří jsou v ekosystému Ethereum noví.
- Vývoj Fe je stále v raných fázích, první alfa verze jazyka byla vydána v lednu 2021.

### Důležité odkazy {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Oznámení Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Plán vylepšení Fe pro rok 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat na Discordu Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Ukázkový kontrakt {#example-contract-3}

Následuje jednoduchý kontrakt implementovaný v jazyce Fe.

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

## Jak si vybrat {#how-to-choose}

Stejně jako u jakéhokoli jiného programovacího jazyka jde především o výběr správného nástroje pro daný úkol a o osobní preference.

Uvádíme několik věcí, které byste měli zvážit, pokud jste ještě žádný z jazyků nezkusili:

### Co je skvělé na Solidity? {#solidity-advantages}

- Pokud jste začátečník, najdete mnoho tutoriálů a vzdělávacích nástrojů. Více se dozvíte v sekci [Learn by Coding](/developers/learning-tools/).
- K dispozici je dobrá sada nástrojů pro vývojáře.
- Solidity má velkou vývojářskou komunitu, což znamená, že na případné otázky pravděpodobně najdete odpovědi poměrně rychle.

### Co je skvělé na Vyperu? {#vyper-advatages}

- Skvělý na začátek pro Python vývojáře, kteří chtějí psát chytré kontrakty.
- Vyper má menší počet funkcí, což ho činí skvělým pro rychlé prototypování nápadů.
- Vyper usiluje o snadnou auditovatelnost a maximální čitelnost pro lidské bytosti.

### Co je skvělé na Yul a Yul+? {#yul-advantages}

- Jednoduchý a funkční nízkoúrovňový jazyk.
- Umožňuje dostat se mnohem blíže k surovému EVM, což vám může pomoci s optimalizací spotřeby paliva vašich kontraktů.

## Porovnání jazyků {#language-comparisons}

Pro srovnání základní syntaxe, životního cyklu kontraktů, rozhraní, operátorů, datových struktur, funkcí, řídicích struktur a dalších rozdílů se podívejte na tento [cheatsheet od Auditless](https://reference.auditless.com/cheatsheet/)

## Další čtení {#further-reading}

- [Knihovna Solidity kontraktů od OpenZeppelin](https://docs.openzeppelin.com/contracts)
- [Solidity by Example](https://solidity-by-example.org)
