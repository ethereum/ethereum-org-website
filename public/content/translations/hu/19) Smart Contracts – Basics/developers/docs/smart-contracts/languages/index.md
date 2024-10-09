---
title: Okosszerződés nyelvek
description: Áttekintjük és összehasonlítjuk a két fő nyelvet, a Solidity-t és a Vypert, melyen az okosszerződések készülnek.
lang: hu
---

Az Ethereum egyik kiváló jellemzője, hogy az okosszerződéseket viszonylag fejlesztőbarát nyelveken lehet programozni. Ha Ön járatos a Pythonban vagy bármilyen [kerek zárójeles nyelvben](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), akkor találhat olyan nyelvet, melynek a szintaxisa ismerős lesz.

A két legaktívabb és leginkább karbantartott nyelv:

- Solidity
- Vyper

A Remix IDE egy átfogó fejlesztési környezetet nyújt a szerződések létrehozásához és teszteléséhez Solidity és Vyper nyelveken. [Próbálja ki a böngészőben elérhető Remix IDE](https://remix.ethereum.org) használatát a kódoláshoz.

A tapasztaltabb fejlesztők kipróbálhatják a Yul nyelvet, mely egy haladó nyelv az [Ethereum virtuális gépre](/developers/docs/evm/), vagy ennek kiterjesztését, melynek neve Yul+.

Amennyiben Ön kíváncsi típus, és szeret olyan új nyelvek tesztelésében segíteni, amelyek még komoly fejlesztés előtt állnak, akkor fedezze fel a Fe-t, egy kialakulóban lévő okosszerződésnyelvet, amely még gyerekcipőben jár.

## Előfeltételek {#prerequisites}

A programozási nyelvek, különösen a JavaScript vagy a Python korábbi ismerete segíthet az okosszerződés nyelvekben mutatkozó különbségek értelmezésében. Javasoljuk, hogy először értse meg az okosszerződést, mint koncepciót, mielőtt túl mélyre ásna a nyelvi összehasonlításokban. [Bevezetés az okosszerződésekbe](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Objektumorientált, magas szintű nyelv az okosszerződések telepítésére.
- Kerek zárójeles nyelv, amelyet a leginkább a C++ befolyásolt.
- Statikusan típusos (a változó típusa ismert az átfordítási időben).
- A következőket támogatja:
  - Öröklődés (kiterjeszthet más szerződéseket).
  - Könyvtárak (újrafelhasználható kódot írhat, melyet meghívhat különböző szerződésekből – mint a statikus függvényeket statikus osztályokban más objektumorientált programozási nyelveken).
  - Komplex, felhasználó által definiált típusok.

### Fontos linkek {#important-links}

- [Dokumentáció](https://docs.soliditylang.org/en/latest/)
- [Solidity Nyelvportál](https://soliditylang.org/)
- [Solidity példák alapján](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatroom](https://gitter.im/ethereum/solidity) összekötve a [Solidity Matrix Chatroom](https://matrix.to/#/#ethereum_solidity:gitter.im)-mal
- [Puska](https://reference.auditless.com/cheatsheet)
- [Solidity Blog](https://blog.soliditylang.org/)
- [Solidity Twitter](https://twitter.com/solidity_lang)

### Példaszerződés {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // A "public" kulcsszó a változókat
    // elérhetővé teszi más szerződések számára
    address public minter;
    mapping (address => uint) public balances;

    // Az események lehetővé teszik, hogy a kliensek
    // általad deklarált szerződés változásokra reagáljanak
    event Sent(address from, address to, uint amount);

    // A konstruktor csak a szerződés létrehozásakor
    // fut le
    constructor() {
        minter = msg.sender;
    }

    // Az újonnan létrehozott tokeneket elküldi egy címre
    // Csak a szerződés létrehozó hívhatja meg
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Elküld valamennyi létező tokent
    // bármely hívótól egy címre
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Ez a példa azt mutathatja meg Önnek, hogyan néz ki a Solidity szerződés szintaxisa. A függvények és a változók részletesebb leírásáért [tekintse meg a dokumentációt](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonikus programozási nyelv
- Erősen típusos
- Kicsi és érthető fordító kód
- Hatékony bájtkód-generálás
- Szándékosan kevesebb elemmel rendelkezik, mint a Solidity, azzal a céllal, hogy a szerződések biztonságosabbak és könnyebben auditálhatóak legyenek. A Vyper nem támogatja a következőket:
  - Módosítókat (modifier)
  - Öröklést
  - Soron belüli assembly
  - Függvénytúlterhelés
  - Operátortúlterhelés
  - Rekurzív hívás
  - Végtelen hosszú ciklusok
  - Bináris fix pontok

További információkért [tekintse meg a Vyper magyarázatát](https://vyper.readthedocs.io/en/latest/index.html).

### Fontos linkek {#important-links-1}

- [Dokumentáció](https://vyper.readthedocs.io)
- [Vyper példa alapján](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Még több Vyper példák alapján](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [A Vyper-közösség Discord-csevegése](https://discord.gg/SdvKC79cJk)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Okosszerződés-fejlesztési keretrendszerek és eszközök Vyperre](/developers/docs/programming-languages/python/)
- [VyperPunk – tanulja meg a Vyper okosszerződéseket biztosítását és meghackelését](https://github.com/SupremacyTeam/VyperPunk)
- [VyperExamples – Példák a Vyper sebezhetőségére](https://www.vyperexamples.com/reentrancy)
- [Vyper Hub fejlesztéshez](https://github.com/zcor/vyper-dev)
- [Példák a Vyper legjobb okosszerződéseire](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [A Vyper által gondozott kiváló források](https://github.com/spadebuilders/awesome-vyper)

### Példa {#example}

```python
# Nyílt Aukció

# Aukció paraméterek
# A kedvezményezett pénzt kap a legnagyobb licitálótól
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Az aukció jelenlegi állapota
highestBidder: public(address)
highestBid: public(uint256)

# Legyen igaz a végén, bármely változást elutasít
ended: public(bool)

# Számontartja a visszafizetett liciteket, így követni tudjuk a kiutalási mintát
pendingReturns: public(HashMap[address, uint256])

# Egy egyszerű aukció létrehozása `_bidding_time`
# másodpercnyi licit idővel a kedvezményezett cím
# `_beneficiary` nevében.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Licitálás az aukción
# a tranzakcióval küldött értékkel.
# Az érték csak akkor kerül visszautalásra
# ha az aukció nincs megnyerve.
@external
@payable
def bid():
    # Ellenőrzi, hogy a licit idő véget ért-e már.
    assert block.timestamp < self.auctionEnd
    # Ellenőrzi, hogy elég magas-e a licit
    assert msg.value > self.highestBid
    # Nyomonköveti az előző legmagasabb licit visszatérítését
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Nyomonköveti a legmagasabb licitet
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Kiutalja az előzőleg visszatérített licitet. A kiutalási mintát használjuk itt,
# hogy elkerüljünk egy biztonsági rést. Ha a visszatérítés közvetlenül
# a bid() része lenne, egy ártalmas licit szerződés blokkolhatná
# ezeket a visszatérítéseket, így blokkolná a magasabb bejövő liciteket.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Vége az aukciónak és elküldi a legmagasabb licitet
# a kedvezményezettnek.
@external
def endAuction():
    # It is a good guideline to structure functions that interact
    # with other contracts (i.e. they call functions or send ether)
    # into three phases:
    # 1. feltételek ellenőrzése
    # 2. akció végrehajtás (potenciálisan megváltoztatja a feltételeket)
    # 3. interakció más szerződésekkel
    # Ha ezt a sorrendet felcseréljük, akkor más szerződés visszahívhat
    # a jelenlegi szerződésbe és módosíthatja az állapotot vagy
    # többszörösen elvégzett műveletet eredményezhet (ether kifizetés).
    # Ha a belsőleg meghívott függvény külső szerződéssel történő
    # interakciót tartalmaz, akkor azokat is külső szerződéssel történő
    # interakcióként kell kezelni.

    # 1. Feltételek
    # Ellenőrzi, hogy elértük-e az aukció végét
    assert block.timestamp >= self.auctionEnd
    # Ellenőrzi, hogy függvény meg lett-e már hívva
    assert not self.ended

    # 2. Hatások
    self.ended = True

    # 3. Interakció
    send(self.beneficiary, self.highestBid)
```

Ez a példa megmutathatja Önnek, hogyan néz ki a Vyper szerződés szintaxisa. A függvények és a változók részletesebb leírásáért [tekintse meg a dokumentációt](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul és Yul+ {#yul}

Ha Önnek új az Ethereum és nem programozott okosszerződésnyelveken, akkor azt javasoljuk, hogy kezdjen először a Solidity-vel és a Vyperrel. Csak akkor kezdjen bele a Yul vagy Yul+ nyelvekbe, ha már ismeri az okosszerződésre vonatkozó biztonsági gyakorlatokat és az EVM-mel kapcsolatos munka részleteit.

**Yul**

- Haladó nyelv Ethereumra.
- Támogatja az [EVM-et](/developers/docs/evm) és az [Ewasm-ot](https://github.com/ewasm), amely egy Ethereummal fűszerezett WebAssembly, és amelyet a két platform közös nevezőjének terveztek.
- Jó cél a magas szintű optimizációs szinteknek, melyek az EVM és Ewasm platformokból egyaránt tudnak profitálni.

**Yul+**

- A Yul alacsony szintű, nagy hatékonyságú kiterjesztése.
- Eredetileg az [optimista összesítéses](/developers/docs/scaling/optimistic-rollups/) szerződésként fejlesztették ki.
- A Yul+ egy kísérleti fejlesztési javaslatként is tekinthető, melyhez új funkciók tartoznak.

### Fontos linkek {#important-links-2}

- [Yul Dokumentáció](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Dokumentáció](https://github.com/fuellabs/yulp)
- [Yul+ Játszótér](https://yulp.fuel.sh/)
- [Yul+ Bevezető poszt](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Példa szerződés {#example-contract-2}

Az alábbi egyszerű példa egy hatványfüggvényt implementál. A `solc --strict-assembly --bin input.yul` használatával lehet befordítani. Ezt a példát az input.yul fájlnak kell tartalmaznia.

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

Ha már nagy tapasztalatra tett szert az okosszerződésekkel kapcsolatban, akkor a teljes ERC20 implementáció Yul-ban [itt érhető el](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Statikusan típusos nyelv az Ethereum virtuális géphez (EVM).
- A Python és a Rust inspirálta.
- Lényege, hogy könnyen tanulható, még azoknak a fejlesztőknek is, akiknek új az Ethereum ökoszisztémája.
- A Fe fejlesztése még nagyon korai szakaszban tart, az alfa kiadása 2021. januárban történt.

### Fontos linkek {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Fe bejelentés](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Fe 2021-es ütemterv](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Fe Discord-csevegés](https://discord.com/invite/ywpkAXFjZH)
- [Fe Twitter](https://twitter.com/official_fe)

### Példa szerződés {#example-contract-3}

Ez a példa egy egyszerű szerződés Fe nyelven telepítve.

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

## Hogyan válasszunk {#how-to-choose}

Mint minden más programozási nyelvnél, itt is leginkább a megfelelő eszköz kiválasztása a megfelelő munkához, valamint a személyes preferenciák döntenek.

Íme néhány szempont, amelyet érdemes figyelembe venni, ha még nem próbálta egyik nyelvet sem:

### Mi a jó a Solidity-ben? {#solidity-advantages}

- A kezdőknek sok útmutató és tanulási anyag áll rendelkezésükre. További anyagért látogasson el a [Tanulás kódolással](/developers/learning-tools/) című részhez.
- Remek fejlesztői eszközök érhetők el.
- A Solidity-nek kiterjedt a fejlesztői közössége, ami azt jelenti, hogy nagy valószínűséggel gyorsan választ kap a kérdéseire.

### Mi a jó a Vyperben? {#vyper-advatages}

- Nagyszerű módszer a Python fejlesztők számára az első okosszerződések megírására.
- A Vyper kevesebb funkcióval rendelkezik, így kiválóan alkalmas arra, hogy az ötleteiből gyorsan prototípust készítsen.
- A Vyper célja, hogy könnyen auditálható és az emberek számára olvasható legyen.

### Mi a jó a Yul és a Yul+ nyelvekben? {#yul-advantages}

- Egyszerűsített és funkcionális alacsony szintű nyelv.
- Közelebb enged a nyers EVM-hez, így Ön könnyebben tudja a szerződések gázfelhasználását optimalizálni.

## Nyelv-összehasonlítások {#language-comparisons}

Az alapvető szintaxis, szerződés-életciklus, interfészek, operátorok, adatszerkezetek, függvények, control flow és további szempontok alapján történő összehasonlításért olvassa el a [Puska az Auditless-től](https://reference.auditless.com/cheatsheet/) című cikket

## További olvasnivaló {#further-reading}

- [Solidity szerződéskönyvtár az OpenZeppelintől](https://docs.openzeppelin.com/contracts)
- [Solidity egy példa alapján](https://solidity-by-example.org)
