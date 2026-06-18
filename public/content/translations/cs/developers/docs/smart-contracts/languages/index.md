---
title: Jazyky pro chytré kontrakty
description: Přehled a srovnání dvou hlavních jazyků pro chytré kontrakty – Solidity a Vyper.
lang: cs
---

Skvělou vlastností [Etherea](/) je, že chytré kontrakty lze programovat pomocí jazyků, které jsou pro vývojáře poměrně přívětivé. Pokud máte zkušenosti s Pythonem nebo jakýmkoli [jazykem se složenými závorkami](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), najdete zde jazyk se známou syntaxí.

Dva nejaktivnější a nejudržovanější jazyky jsou:

- Solidity
- Vyper

Remix IDE poskytuje komplexní vývojové prostředí pro vytváření a testování kontraktů v Solidity i Vyperu. [Vyzkoušejte Remix IDE v prohlížeči](https://remix.ethereum.org) a začněte programovat.

Zkušenější vývojáři mohou také chtít použít Yul, mezijazyk pro [Ethereum Virtual Machine](/developers/docs/evm/), nebo Yul+, což je rozšíření jazyka Yul.

Pokud jste zvědaví a rádi pomáháte testovat nové jazyky, které jsou stále ve fázi intenzivního vývoje, můžete experimentovat s Fe, nově vznikajícím jazykem pro chytré kontrakty, který je v současné době stále v plenkách.

## Předpoklady {#prerequisites}

Předchozí znalost programovacích jazyků, zejména JavaScriptu nebo Pythonu, vám může pomoci pochopit rozdíly v jazycích pro chytré kontrakty. Než se ponoříte příliš hluboko do srovnávání jazyků, doporučujeme vám také porozumět chytrým kontraktům jako konceptu. [Úvod do chytrých kontraktů](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objektově orientovaný vysokoúrovňový jazyk pro implementaci chytrých kontraktů.
- Jazyk se složenými závorkami, který byl nejvíce ovlivněn jazykem C++.
- Staticky typovaný (typ proměnné je znám v době kompilace).
- Podporuje:
  - Dědičnost (můžete rozšiřovat jiné kontrakty).
  - Knihovny (můžete vytvářet znovupoužitelný kód, který lze volat z různých kontraktů – podobně jako statické funkce ve statické třídě v jiných objektově orientovaných programovacích jazycích).
  - Komplexní uživatelsky definované typy.

### Důležité odkazy {#important-links}

- [Dokumentace](https://docs.soliditylang.org/en/latest/)
- [Portál jazyka Solidity](https://soliditylang.org/)
- [Solidity na příkladech](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Chatovací místnost Solidity na Gitteru](https://gitter.im/ethereum/solidity) propojená s [chatovací místností Solidity na Matrixu](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Blog o Solidity](https://blog.soliditylang.org/)
- [Twitter Solidity](https://twitter.com/solidity_lang)

### Příklad kontraktu {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Klíčové slovo "public" činí proměnné
    // přístupnými z jiných kontraktů
    address public minter;
    mapping (address => uint) public balances;

    // Události umožňují klientům reagovat na specifické
    // změny kontraktu, které deklarujete
    event Sent(address from, address to, uint amount);

    // Kód konstruktoru se spustí pouze tehdy, když je kontrakt
    // vytvořen
    constructor() {
        minter = msg.sender;
    }

    // Odešle množství nově vytvořených mincí na adresu
    // Může být zavoláno pouze tvůrcem kontraktu
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Odešle množství existujících mincí
    // od jakéhokoli volajícího na adresu
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Tento příklad by vám měl poskytnout představu o tom, jak vypadá syntaxe kontraktu v Solidity. Podrobnější popis funkcí a proměnných [najdete v dokumentaci](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Programovací jazyk v pythonovském stylu
- Silné typování
- Malý a srozumitelný kód kompilátoru
- Efektivní generování bajtkódu
- Záměrně má méně funkcí než Solidity s cílem učinit kontrakty bezpečnějšími a snáze auditovatelnými. Vyper nepodporuje:
  - Modifikátory
  - Dědičnost
  - Vložený (inline) assembly
  - Přetěžování funkcí
  - Přetěžování operátorů
  - Rekurzivní volání
  - Smyčky nekonečné délky
  - Binární pevnou řádovou čárku

Pro více informací si [přečtěte zdůvodnění návrhu jazyka Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Důležité odkazy {#important-links-1}

- [Dokumentace](https://vyper.readthedocs.io)
- [Vyper na příkladech](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Další příklady ve Vyperu](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Komunitní chat Vyperu na Discordu](https://discord.gg/SdvKC79cJk)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Frameworky a nástroje pro vývoj chytrých kontraktů ve Vyperu](/developers/docs/programming-languages/python/)
- [VyperPunk - naučte se zabezpečit a hackovat chytré kontrakty ve Vyperu](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub pro vývoj](https://github.com/zcor/vyper-dev)
- [Nejlepší příklady chytrých kontraktů ve Vyperu](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – kurátorované zdroje](https://github.com/spadebuilders/awesome-vyper)

### Příklad {#example}

```python
# Otevřená aukce

# Parametry aukce
# Příjemce obdrží peníze od účastníka s nejvyšší nabídkou
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Aktuální stav aukce
highestBidder: public(address)
highestBid: public(uint256)

# Na konci nastaveno na true, znemožní jakoukoli změnu
ended: public(bool)

# Udržuje přehled o vrácených nabídkách, abychom mohli následovat vzor výběru
pendingReturns: public(HashMap[address, uint256])

# Vytvoří jednoduchou aukci s dobou pro podávání nabídek `_bidding_time`
# sekund ve prospěch
# adresy příjemce `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Přihodí v aukci s hodnotou odeslanou
# společně s touto transakcí.
# Hodnota bude vrácena pouze v případě, že
# aukce není vyhrána.
@external
@payable
def bid():
    # Zkontroluje, zda skončilo období pro podávání nabídek.
    assert block.timestamp < self.auctionEnd
    # Zkontroluje, zda je nabídka dostatečně vysoká
    assert msg.value > self.highestBid
    # Zaznamená vrácení peněz pro předchozího účastníka s nejvyšší nabídkou
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Zaznamená novou nejvyšší nabídku
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Vybere dříve vrácenou nabídku. Vzor výběru se
# zde používá k zamezení bezpečnostnímu problému. Pokud by se vrácení peněz posílalo přímo
# jako součást bid(), škodlivý přihazující kontrakt by mohl zablokovat
# tato vrácení peněz a tím zablokovat příchod nových vyšších nabídek.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Ukončí aukci a odešle nejvyšší nabídku
# příjemci.
@external
def endAuction():
    # Je dobrým pravidlem strukturovat funkce, které interagují
    # s jinými kontrakty (tj. volají funkce nebo posílají ether)
    # do tří fází:
    # 1. kontrola podmínek
    # 2. provádění akcí (potenciálně měnící podmínky)
    # 3. interakce s jinými kontrakty
    # Pokud se tyto fáze smíchají, mohl by jiný kontrakt zavolat
    # zpět do aktuálního kontraktu a upravit stav nebo způsobit,
    # že se efekty (výplata etheru) provedou vícekrát.
    # Pokud interně volané funkce zahrnují interakci s externími
    # kontrakty, musí být také považovány za interakci s
    # externími kontrakty.

    # 1. Podmínky
    # Zkontroluje, zda bylo dosaženo času konce aukce
    assert block.timestamp >= self.auctionEnd
    # Zkontroluje, zda již byla tato funkce zavolána
    assert not self.ended

    # 2. Efekty
    self.ended = True

    # 3. Interakce
    send(self.beneficiary, self.highestBid)
```

Tento příklad by vám měl poskytnout představu o tom, jak vypadá syntaxe kontraktu ve Vyperu. Podrobnější popis funkcí a proměnných [najdete v dokumentaci](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul a Yul+ {#yul}

Pokud jste v Ethereu nováčkem a ještě jste neprogramovali v žádném jazyce pro chytré kontrakty, doporučujeme začít se Solidity nebo Vyperem. Yul nebo Yul+ prozkoumejte až tehdy, když budete obeznámeni s osvědčenými postupy zabezpečení chytrých kontraktů a specifiky práce s EVM.

**Yul**

- Mezijazyk pro Ethereum.
- Podporuje [EVM](/developers/docs/evm) a [Ewasm](https://github.com/ewasm), což je WebAssembly přizpůsobené pro Ethereum, a je navržen tak, aby byl použitelným společným jmenovatelem obou platforem.
- Dobrý cíl pro vysokoúrovňové fáze optimalizace, ze kterých mohou těžit platformy EVM i Ewasm stejnou měrou.

**Yul+**

- Nízkoúrovňové, vysoce efektivní rozšíření jazyka Yul.
- Původně navrženo pro kontrakt typu [optimistický rollup](/developers/docs/scaling/optimistic-rollups/).
- Na Yul+ lze pohlížet jako na experimentální návrh upgradu jazyka Yul, který do něj přidává nové funkce.

### Důležité odkazy {#important-links-2}

- [Dokumentace k Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentace k Yul+](https://github.com/fuellabs/yulp)
- [Úvodní článek o Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Příklad kontraktu {#example-contract-2}

Následující jednoduchý příklad implementuje funkci mocniny. Lze jej zkompilovat pomocí `solc --strict-assembly --bin input.yul`. Příklad by měl být uložen v souboru input.yul.

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

Pokud již máte s chytrými kontrakty bohaté zkušenosti, plnou implementaci ERC-20 v jazyce Yul najdete [zde](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Staticky typovaný jazyk pro Ethereum Virtual Machine (EVM).
- Inspirováno jazyky Python a Rust.
- Klade si za cíl být snadno naučitelný – a to i pro vývojáře, kteří jsou v ekosystému Etherea nováčky.
- Vývoj jazyka Fe je stále v rané fázi, jazyk měl svou alfa verzi v lednu 2021.

### Důležité odkazy {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Oznámení o Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Plán vývoje Fe pro rok 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat Fe na Discordu](https://discord.com/invite/ywpkAXFjZH)
- [Twitter Fe](https://twitter.com/official_fe)

### Příklad kontraktu {#example-contract-3}

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

Stejně jako u jakéhokoli jiného programovacího jazyka jde především o výběr správného nástroje pro danou práci a také o osobní preference.

Zde je několik věcí, které byste měli zvážit, pokud jste ještě žádný z těchto jazyků nevyzkoušeli:

### Co je skvělé na Solidity? {#solidity-advantages}

- Pokud jste začátečník, existuje mnoho tutoriálů a výukových nástrojů. Více se o tom dozvíte v sekci [Učte se programováním](/developers/learning-tools/).
- K dispozici jsou dobré vývojářské nástroje.
- Solidity má velkou komunitu vývojářů, což znamená, že s největší pravděpodobností najdete odpovědi na své otázky poměrně rychle.

### Co je skvělé na Vyperu? {#vyper-advatages}

- Skvělý způsob, jak začít pro vývojáře v Pythonu, kteří chtějí psát chytré kontrakty.
- Vyper má menší počet funkcí, což z něj dělá skvělý nástroj pro rychlé prototypování nápadů.
- Vyper si klade za cíl být snadno auditovatelný a maximálně čitelný pro lidi.

### Co je skvělé na Yul a Yul+? {#yul-advantages}

- Zjednodušený a funkční nízkoúrovňový jazyk.
- Umožňuje dostat se mnohem blíže k samotnému EVM, což může pomoci optimalizovat spotřebu gasu vašich kontraktů.

## Srovnání jazyků {#language-comparisons}

Pro srovnání základní syntaxe, životního cyklu kontraktu, rozhraní, operátorů, datových struktur, funkcí, řízení toku a dalších věcí se podívejte na tento [tahák od Auditless](https://reference.auditless.com/cheatsheet/)

## Další čtení {#further-reading}

- [Knihovna kontraktů v Solidity od OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity na příkladech](https://solidity-by-example.org)