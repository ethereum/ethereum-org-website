---
title: Okos szerződés nyelvek
description: Egy áttekintő és összehasonlítás a két fő okosszerződés nyelvről - Solidity és Vyper.
lang: hu
---

Az Ethereum egyik nagyszerű szempontja, hogy az okosszerződéseket viszonylag fejlesztőbarát nyelveken lehet programozni. Ha már jártas vagy a Python vagy a JavaScript használatában, akkor találhatsz hasonló szintaxisú nyelvet.

A két legaktívabb és leginkább karbantartott nyelv:

- Solidity
- Vyper

A tapasztaltabb fejlesztők kipróbálhatják a Yul nyelvet, mely egy haladó nyelv az [Ethereum Virtuális Gépre](/developers/docs/evm/), vagy a Yul+-t, mely a Yul kiterjesztése.

## Előfeltételek {#prerequisites}

A programozási nyelvek, különösen a JavaScript vagy a Python korábbi ismerete segíthet az okosszerződés nyelvekben mutatkozó különbségek értelmezésében. Azt is javasoljuk, hogy értsd meg az okosszerződést, mint fogalmat, mielőtt túl mélyre ásnál a nyelvi összehasonlításokban. [Bevezetés az okosszerződésekbe](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- A C++, Python és a JavaScript gyakorolt rá hatást.
- Statikusan típusos (a változó típusa ismert a fordítási időben).
- Támogatja:
  - Öröklődés (kiterjeszthetsz más szerződéseket).
  - Könyvtárak (újrafelhasználható kódot írhatsz, melyet meghívhatsz különböző szerződésekből – mint a statikus függvényeket statikus osztályokban más objektumorientált programozási nyelveken).
  - Komplex felhasználó által definiált típusok.

### Fontos linkek {#important-links}

- [Dokumentáció](https://docs.soliditylang.org/en/latest/)
- [Solidity Nyelv Portál](https://soliditylang.org/)
- [Solidity egy példa alapján](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Solidity Gitter Chatszoba](https://gitter.im/ethereum/solidity/)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [Solidity Blog](https://blog.soliditylang.org/)

### Példa szerződés {#example-contract}

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

Ez a példa adhat egy benyomást arról, hogyan néz ki a Solidity szerződés szintaxis. A függvények és a változók részletesebb leírásáért, [nézd meg a dokumentációt](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Pythonikus programozási nyelv
- Erősen típusos
- Kicsi és érthető fordító kód
- Szándékosan kevesebb elemmel rendelkezik, mint a Solidity azzal a céllal, hogy a szerződések biztonságosabbak és könnyebben auditálhatóak legyenek. A Vyper nem támogatja a:
  - Módosítókat (modifier)
  - Öröklést
  - Soron belüli assembly-t
  - Függvény overloading-ot
  - Operátor overloading-ot
  - Rekurzív hívást
  - Végtelen hosszú ciklusokat
  - Bináris fix pontokat

További információért, [olvasd el a Vyper indoklást](https://vyper.readthedocs.io/en/latest/index.html).

### Fontos linkek {#important-links-1}

- [Dokumentáció](https://vyper.readthedocs.io)
- [Vyper egy példa alapján](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [GitHub](https://github.com/vyperlang/vyper)
- [Vyper Gitter Chatszoba](https://gitter.im/vyperlang/community)
- [Cheat Sheet](https://reference.auditless.com/cheatsheet)
- [2020. Január 8. frissítés](https://blog.ethereum.org/2020/01/08/update-on-the-vyper-compiler)

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
    # Jó gyakorlat a szerződéssel interakcióba lépő függvényeket
    # (vagyis függvény hívásokat, vagy küldést végző függvények)
    # három fázisra osztani:
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

Ez a példa adhat egy benyomást arról, hogyan néz ki a Vyper szerződés szintaxis. A függvények és a változók részletesebb leírásáért, [nézd meg a dokumentációt](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul és Yul+ {#yul}

Ha neked még új az Ethereum és nem programoztál okosszerződés nyelveken, akkor azt javasoljuk, hogy kezdj először a Solidity-vel és a Vyper-rel. Csak akkor kezdj bele a Yul-ba vagy a Yul+-ba, ha már ismered az okosszerződés biztonsági praktikákat és az EVM-mel kapcsolatos munka részleteit.

**Yul**

- Haladó nyelv Ethereumra.
- Támogatja az [EVM-et](/developers/docs/evm) és az [eWASM-t](https://github.com/ewasm), ami egy Ethereummal fűszerezett WebAssembly, amit a két platform közös nevezőjének terveztek.
- Jó cél a magas szintű optimizációs szinteknek, melyek az EVM-ből és az eWASM-ból is tudnak profitálni.

**Yul+**

- A Yul egy alacsony szintű, nagy hatékonyságú kiterjesztése.
- Eredetileg az [optimista összegző](/developers/docs/layer-2-scaling/#rollups-and-sidechains) szerződésre lett kifejlesztve.
- A Yul+-ra úgy is tekinthetünk, mint a Yul-nak egy kísérleti fejlesztési javaslatára, melyhez új funkciók tartoznak.

### Fontos linkek {#important-links-2}

- [Yul Dokumentáció](https://docs.soliditylang.org/en/latest/yul.html)
- [Yul+ Dokumentáció](https://github.com/fuellabs/yulp)
- [Yul+ Játszótér](https://yulp.fuel.sh/)
- [Yul+ Bevezető poszt](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Példa szerződés {#example-contract-2}

Az alábbi egyszerű példa egy hatvány függvényt implementál. A `solc --strict-assembly --bin input.yul` használatával lehet befordítani. Ezt a példát az input.yul fájlnak kell tartalmaznia.

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

Ha már sok tapasztalatod van az okosszerződésekkel, akkor a teljes ERC20 implementáció a Yul-ban [itt érhető el](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Hogyan válasszunk {#how-to-choose}

Mint minden más programozási nyelvnél, itt is leginkább a megfelelő eszköz kiválasztása a megfelelő munkához, valamint a személyes preferenciák döntenek.

Íme néhány szempont, amelyet érdemes figyelembe venni, ha még nem próbáltad meg egyik nyelvet sem:

### Mi a jó a Solidity-ben? {#solidity-advantages}

- Ha kezdő vagy, akkor sok útmutató és tanulási anyag áll rendelkezésedre. További anyagért látogasd meg [Tanulás kódolással](/developers/learning-tools/) szekciót.
- Jó fejlesztői eszközök érhetők el.
- A Solidity-nek nagy a fejlesztői közössége, ami azt jelenti, hogy nagy valószínűséggel gyorsan választ kapsz majd a kérdéseidre.

### Mi a jó a Vyper-ben? {#vyper-advatages}

- Nagyszerű módszer az okosszerződéseket írni kívánó Python fejlesztők számára.
- A Vyper kevesebb funkcióval rendelkezik, így nagyszerűen lehet az ötleteidből gyorsan prototípust készíteni.
- A Vyper célja, hogy könnyen auditálható és emberek számára olvasható legyen.

### Mi a jó a Yul-ban és a Yul+-ban? {#yul-advantages}

- Egyszerűsített és funkcionális alacsony szintű nyelv.
- Közelebb enged a nyers EVM-hez, így könnyebben tudod a szerződéseid gáz felhasználását optimálni.

## Nyelv összehasonlítások {#language-comparisons}

Az alapvető szintaxis, szerződés életciklus, interfészek, operátorok, adatszerkezetek, függvények, control flow és további szempontok alapján történő összehasonlításért olvasd el a [cheatsheet by Auditless](https://reference.auditless.com/cheatsheet/) cikket

## További olvasnivaló {#further-reading}

- [Solidity szerződés könyvtár az OpenZeppelintől](https://docs.openzeppelin.com/contracts)
- [Solidity egy példa alapján](https://solidity-by-example.org)
