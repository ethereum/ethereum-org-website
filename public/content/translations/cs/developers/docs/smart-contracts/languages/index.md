---
title: "Jazyk chytrých kontraktů"
description: "Přehled a srovnání dvou hlavních programovacích jazyků pro smart kontrakty – Solidity a Vyper."
lang: cs
---

Jednou z výhod Etherea je, že smart kontrakty lze programovat v relativně uživatelsky přívětivých programovacích jazycích. Pokud máte zkušenosti s Pythonem nebo jakýmkoli [jazykem se složenými závorkami](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), můžete najít jazyk se známou syntaxí.

Dva nejaktivnější a nejvíce udržované jazyky jsou:

- Solidity
- Vyper

Remix IDE poskytuje komplexní vývojové prostředí pro vytváření a testování kontraktů jak v Solidity, tak ve Vyperu. [Vyzkoušejte Remix IDE v prohlížeči](https://remix.ethereum.org) a začněte kódovat.

Zkušenější vývojáři mohou také chtít používat Yul, což je přechodný jazyk pro [Ethereum Virtual Machine](/developers/docs/evm/), nebo Yul+, rozšíření jazyka Yul.

Pokud jste zvědaví a rádi pomáháte testovat nové jazyky, které jsou stále ve fázi intenzivního vývoje, můžete experimentovat s Fe, nově vznikajícím jazykem pro smart kontrakty, který je v současnosti ještě v rané fázi.

## Předpoklady {#prerequisites}

Předchozí znalosti programovacích jazyků, zejména JavaScriptu nebo Pythonu, vám mohou pomoci lépe porozumět rozdílům mezi jazyky pro smart kontrakty. Doporučujeme také, abyste nejprve pochopili koncept smart kontraktů, než se ponoříte do srovnání jazyků. [Úvod do chytrých kontraktů](/developers/docs/smart-contracts/).

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
- [Příklady v Solidity](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Diskusní místnost Solidity na Gitteru](https://gitter.im/ethereum/solidity) přemostěná do [diskusní místnosti Solidity na Matrixu](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Blog Solidity](https://blog.soliditylang.org/)
- [Solidity na Twitteru](https://twitter.com/solidity_lang)

### Příklad kontraktu {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Klíčové slovo "public" zpřístupňuje proměnné
    // z ostatních kontraktů
    address public minter;
    mapping (address => uint) public balances;

    // Události umožňují klientům reagovat na specifické
    // změny kontraktu, které deklarujete
    event Sent(address from, address to, uint amount);

    // Kód konstruktoru se spouští pouze při vytvoření
    // kontraktu
    constructor() {
        minter = msg.sender;
    }

    // Odešle množství nově vytvořených mincí na adresu
    // Může být voláno pouze tvůrcem kontraktu
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Odešle množství existujících mincí
    // od jakéhokoli volajícího na adresu
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Nedostatečný zůstatek.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Tento příklad by vám měl poskytnout představu o tom, jaká je syntaxe kontraktů v Solidity. Podrobnější popis funkcí a proměnných [naleznete v dokumentaci](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonický programovací jazyk
- Silné typování
- Malý a srozumitelný kompilátor
- Efektivní generování bytekódu
- Úmyslně má méně funkcí než Solidity s cílem učinit kontrakty bezpečnějšími a snáze auditovatelnými. Vyper nepodporuje:
  - Modifikátory
  - \#Dědičnost
  - Inline sestavení (assembly)
  - Přetěžování funkcí
  - Přetěžování operátorů
  - Rekurzivní volání
  - Nekonečné smyčky
  - Binární pevné body

Pro více informací si [přečtěte Vyper rationale](https://vyper.readthedocs.io/en/latest/index.html).

### Důležité odkazy {#important-links-1}

- [Dokumentace](https://vyper.readthedocs.io)
- [Příklady ve Vyperu](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Další příklady ve Vyperu](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Komunitní chat Vyperu na Discordu](https://discord.gg/SdvKC79cJk)
- [Tahák](https://reference.auditless.com/cheatsheet)
- [Frameworky a nástroje pro vývoj chytrých kontraktů pro Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk – naučte se zabezpečit a hackovat chytré kontrakty ve Vyperu](https://github.com/SupremacyTeam/VyperPunk)
- [Vyper Hub pro vývoj](https://github.com/zcor/vyper-dev)
- [Vyper – nejlepší příklady chytrých kontraktů](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Awesome Vyper – vybrané zdroje](https://github.com/spadebuilders/awesome-vyper)

### Příklad {#example}

```python
# Otevřená aukce

# Parametry aukce

# Příjemce obdrží peníze od nejvyššího nabízejícího

beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Aktuální stav aukce

highestBidder: public(address)
highestBid: public(uint256)

# Na konci se nastaví na true, zakáže jakoukoli změnu

ended: public(bool)

# Sledujeme vrácené nabídky, abychom mohli použít vzor výběru

pendingReturns: public(HashMap[address, uint256])

# Vytvoří jednoduchou aukci s `_bidding_time`

# sekundami pro přihazování jménem

# adresy příjemce `_beneficiary`.

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Přihodí do aukce s hodnotou zaslanou

# spolu s touto transakcí.

# Hodnota bude vrácena pouze v případě,

# že aukce nebude vyhrána.

@external
@payable
def bid():
    # Zkontroluje, zda období pro přihazování skončilo.
    assert block.timestamp < self.auctionEnd
    # Zkontroluje, zda je nabídka dostatečně vysoká
    assert msg.value > self.highestBid
    # Sleduje vrácení peněz předchozímu nejvyššímu nabízejícímu
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Sleduje novou nejvyšší nabídku
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Vybere dříve vrácenou nabídku. Vzor výběru (withdraw pattern) se

# zde používá k zamezení bezpečnostního problému. Pokud by byly refundace přímo

# odesílány jako součást bid(), mohl by škodlivý kontrakt blokovat

# tyto refundace a tím zabránit příchodu nových vyšších nabídek.

@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Ukončí aukci a pošle nejvyšší nabídku

# příjemci.

@external
def endAuction():
    # Je dobrým zvykem strukturovat funkce, které interagují
    # s jinými kontrakty (tj. volají funkce nebo posílají ether),
    # do tří fází:
    # 1. kontrola podmínek
    # 2. provádění akcí (potenciálně měnících podmínky)
    # 3. interakce s jinými kontrakty
    # Pokud jsou tyto fáze smíchány, jiný kontrakt by mohl volat
    # zpět do aktuálního kontraktu a upravit stav nebo způsobit,
    # že efekty (vyplacení etheru) budou provedeny vícekrát.
    # Pokud interně volané funkce zahrnují interakci s externími
    # kontrakty, musí být také považovány za interakci s
    # externími kontrakty.

    # 1. Podmínky
    # Zkontroluje, zda bylo dosaženo konce aukce
    assert block.timestamp >= self.auctionEnd
    # Zkontroluje, zda tato funkce již byla volána
    assert not self.ended

    # 2. Efekty
    self.ended = True

    # 3. Interakce
    send(self.beneficiary, self.highestBid)
```

Tento příklad by vám měl poskytnout představu o tom, jaká je syntaxe kontraktů ve Vyperu. Podrobnější popis funkcí a proměnných [najdete v dokumentaci](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul a Yul+ {#yul}

Pokud jste v Ethereum nováčkem a ještě jste neprogramovali v jazycích pro smart kontrakty, doporučujeme začít se Solidity nebo Vyperem. Na Yul nebo Yul+ se zaměřte až poté, co si osvojíte osvědčené postupy v oblasti bezpečnosti smart kontraktů a specifika práce s EVM.

**Yul**

- Pokročilý jazyk pro Ethereum.
- Podporuje [EVM](/developers/docs/evm) a [Ewasm](https://github.com/ewasm), což je varianta WebAssembly pro Ethereum, a je navržen tak, aby byl použitelným společným jmenovatelem obou platforem.
- Dobrá volba pro optimalizační fáze na vyšší úrovni, které mohou mít stejný přínos jak pro platformy EVM, tak pro Ewasm.

**Yul+**

- Nízkoúrovňové, vysoce efektivní rozšíření Yulu.
- Původně navrženo pro kontrakt [optimistického rollupu](/developers/docs/scaling/optimistic-rollups/).
- Yul+ lze považovat za experimentální návrh upgradu Yul, který do něj přidává nové funkce.

### Důležité odkazy {#important-links-2}

- [Dokumentace Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Dokumentace Yul+](https://github.com/fuellabs/yulp)
- [Úvodní příspěvek o Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Příklad kontraktu {#example-contract-2}

Následující jednoduchý příklad implementuje funkci mocniny. Lze jej zkompilovat pomocí `solc --strict-assembly --bin input.yul`. Příklad by měl
být uložen v souboru input.yul.

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

Pokud již máte se smart kontrakty bohaté zkušenosti, úplnou implementaci ERC20 v jazyce Yul naleznete [zde](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Staticky typovaný jazyk pro Virtuální stroj Etherea (EVM).
- Inspirován jazyky Python a Rust.
- Cílem je, aby byl snadno naučitelný – i pro vývojáře, kteří jsou v ekosystému Ethereum noví.
- Vývoj Fe je stále v raných fázích, první alfa verze jazyka byla vydána v lednu 2021.

### Důležité odkazy {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Oznámení o Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Plán vývoje Fe na rok 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Chat o Fe na Discordu](https://discord.com/invite/ywpkAXFjZH)
- [Fe na Twitteru](https://twitter.com/official_fe)

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

Stejně jako u jakéhokoli jiného programovacího jazyka jde především o výběr správného nástroje pro daný úkol a o osobní preference.

Uvádíme několik věcí, které byste měli zvážit, pokud jste ještě žádný z jazyků nezkusili:

### Co je skvělé na Solidity? {#solidity-advantages}

- Pokud jste začátečník, najdete mnoho tutoriálů a vzdělávacích nástrojů. Více se o tom dozvíte v sekci [Učte se kódováním](/developers/learning-tools/).
- K dispozici je dobrá sada nástrojů pro vývojáře.
- Solidity má velkou vývojářskou komunitu, což znamená, že na případné otázky pravděpodobně najdete odpovědi poměrně rychle.

### Co je skvělé na Vyperu? {#vyper-advatages}

- Skvělý na začátek pro Python vývojáře, kteří chtějí psát chytré kontrakty.
- Vyper má menší počet funkcí, což ho činí skvělým pro rychlé prototypování nápadů.
- Vyper usiluje o snadnou auditovatelnost a maximální čitelnost pro lidské bytosti.

### Co je skvělé na Yul a Yul+? {#yul-advantages}

- Jednoduchý a funkční nízkoúrovňový jazyk.
- Umožňuje dostat se mnohem blíže k surovému EVM, což vám může pomoci s optimalizací spotřeby paliva vašich kontraktů.

## Srovnání jazyků {#language-comparisons}

Pro srovnání základní syntaxe, životního cyklu kontraktů, rozhraní, operátorů, datových struktur, funkcí, řízení toku a dalšího se podívejte na tento [tahák od Auditless](https://reference.auditless.com/cheatsheet/)

## Další čtení {#further-reading}

- [Knihovna kontraktů v Solidity od OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Příklady v Solidity](https://solidity-by-example.org)
