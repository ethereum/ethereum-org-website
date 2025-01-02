---
title: ERC-223 tokenszabvány
description: Az ERC-223 helyettesíthető tokenszabvány áttekintése, működése és az ERC-20-szal való összevetése.
lang: hu
---

## Bevezetés {#introduction}

### Mi az az ERC-223? {#what-is-erc223}

ERC-223 a helyettesíthető tokenek szabványa, amely hasonlít az ERC-20-hoz. A fő különbség az, hogy az ERC-223 nemcsak a token API-t adja meg, hanem a küldési logikát is a küldő és a fogadó között. Egy kommunikációs modellt vezet be, amely alapján a fogadó képes kezelni a token fogadását.

### Eltérések az ERC-20-hoz képest {#erc20-differences}

Az ERC-223 kezeli az ERC-20 néhány korlátját, és egy új interakciós módszert vezet be a tokenszerződés és a tokent befogadó szerződés között. Néhány dolog lehetséges az ERC-223-mal, de az ERC-20-szal nem:

- A tokenküldés kezelése a fogadó oldalán: a fogadó fél képes követni, hogy egy ERC-223-as token érkezett.
- A helytelenül küldött tokenek elutasítása: ha a felhasználó ERC-223-as tokent küld egy szerződésnek, amely nem fogad tokeneket, akkor el tudja utasítani azt, így nem veszik el.
- Metaadatok a küldés során: az ERC-223 token metaadatokat is tartalmaz, így bármilyen információt át lehet adni a tokenküldésnél.

## Előfeltételek {#prerequisites}

- [Számlák](/developers/docs/accounts)
- [Okosszerződések](/developers/docs/smart-contracts/)
- [Tokenszabványok](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Törzs {#body}

Az ERC-223 egy tokenszabvány, ami API-t implementál a tokeneknek az okosszerződésekben. Emellett API-t határoz meg azoknak a szerződéseknek, melyek ERC-223 tokent fogadnak be. Azok a szerződések, amelyek nem támogatják az ERC-223-at befogadó API-t, nem fogadhatnak ilyen tokent, így megakadályozzák a hibát.

Ha az okosszerződés implementálja a következő metódusokat és eseményeket, akkor egy ERC-223-kompatibilis tokenszerződésnek nevezhető. Amint telepítve van, trekkelnie kell a létrehozott tokeneket az Ethereumon.

A szerződésnek nem kell csak ilyen funkciókkal bírnia, a fejlesztő más jellemzőket is használhat a többi tokenszabványból is. Például az „approve” és a „transferFrom” függvények nincsenek benne az ERC-223 szabványban, de implementálhatók.

[EIP-223-ból](https://eips.ethereum.org/EIPS/eip-223):

### Metódusok {#methods}

Az ERC-223 tokennek a következő metódusokat kell implementálnia:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

A szerződésnek, mely ERC-223 tokent fogad be, a következő metódusokat kell implementálnia:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Ha ERC-223 tokent küldenek egy olyan szerződésnek, amely nem implementálja a „tokenReceived(..)” függvényt, akkor az átadás elbukik és a token nem hagyja el a küldőt.

### Események {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Példák {#examples}

Az ERC-223 token API-ja hasonlít az ERC-20-ashoz, ezért felhasználóifelület-fejlesztés szempontból nincs különbség. Az egyetlen kivételaz, hogy az ERC-223 tokenek nem ismerik az „approve” + „transferFrom” függvényeket, mert ezek opcionálisak.

#### Solidity-példák {#solidity-example}

A következő példa bemutatja, hogyan működik egy alap ERC-223 tokenszerződés:

```solidity
pragma solidity ^0.8.19;
abstract contract IERC223Recipient {
    function tokenReceived(address _from, uint _value, bytes memory _data) public virtual;
}
contract VeryBasicERC223Token {
    event Transfer(address indexed from, address indexed to, uint value, bytes data);
    string  private _name;
    string  private _symbol;
    uint8   private _decimals;
    uint256 private _totalSupply;
    mapping(address => uint256) private balances;
    function name() public view returns (string memory) { return _name; }
    function symbol() public view returns (string memory) {return _symbol; }
    function decimals() public view returns (uint8) { return _decimals; }
    function totalSupply() public view returns (uint256) { return _totalSupply; }
    function balanceOf(address _owner) public view returns (uint256) { return balances[_owner]; }
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        assembly { size := extcodesize(account) }
        return size > 0;
    }
    function transfer(address _to, uint _value, bytes calldata _data) public returns (bool success){
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _data);
        }
        emit Transfer(msg.sender, _to, _value, _data);
        return true;
    }
    function transfer(address _to, uint _value) public returns (bool success){
        bytes memory _empty = hex"00000000";
        balances[msg.sender] = balances[msg.sender] - _value;
        balances[_to] = balances[_to] + _value;
        if(isContract(_to)) {
            IERC223Recipient(_to).tokenReceived(msg.sender, _value, _empty);
        }
        emit Transfer(msg.sender, _to, _value, _empty);
        return true;
    }
}
```

Szeretnénk, ha egy másik szerződés „tokenA” letétet fogadna el, feltéve, hogy tokenA egy ERC-223 token. A szerződés csak tokenA-t fogadhat el, a többit el kell utasítsa. Amikor a szerződés tokenA-t kap, akkor „Deposit()” eseményt kell kiadnia, és megnöveli a belső „deposits” változót az adott értékkel.

Íme a kód:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // It is important to understand that within this function
        // msg.sender is the address of a token that is being received,
        // msg.value  is always 0 as the token contract does not own or send Ether in most cases,
        // _from      is the sender of the token transfer,
        // _value     is the amount of tokens that was deposited.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Gyakran ismételt kérdések {#faq}

### Mi történik, ha tokenB-t küldünk a szerződésnek? {#sending-tokens}

A tranzakció elbukik, a tokenátadás nem történik meg. A tokenek a küldő címére térnek vissza.

### Hogyan lehet letétet elhelyezni ebbe a szerződésbe? {#contract-deposits}

Meg kell hívni az ERC-223 token „transfer(address,uint256)” vagy „transfer(address,uint256,bytes)” függvényeit, megadva a „RecipientContract” címét.

### Mi történik, ha ERC-20 tokent küldünk egy ilyen szerződésnek? {#erc-20-transfers}

Ha ERC-20 tokent küldenek a „RecipientContract” szerződésnek, akkor az átadás megtörténik, de a szerződés nem ismeri fel (nem lesz „Deposit()” esemény, és az érték sem változik). A nem kívánt ERC-20 letéteket nem lehet kiszűrni vagy megakadályozni.

### Mi van, ha szeretnénk függvényt végrehajtani, miután a token letét végbement? {#function-execution}

Ennek többféle módja van. Ebben a példában megnézzük a metódust, amitől az ERC-223 átadás egyenértékű lesz az ether-küldéssel:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // The only token that we want to accept.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Handle incoming transaction and perform a subsequent function call.
    }
    function foo() public
    {
        emit Foo();
    }
    function bar(uint256 _someNumber) public
    {
        emit Bar(_someNumber);
    }
}
```

Amikor a „RecipientContract” kap egy ERC-223 tokent, a szerződés a token tranzakció „_data” paramétereként kódolt függvényt hajt végre, ugyanúgy, ahogy az ether-tranzakciók kódolják a függvényhívásokat a tranzakció „data” paramétereként. Tekintse meg [az adatmezőt](https://ethereum.org/en/developers/docs/transactions/#the-data-field) további információért.

A fenti példában az ERC-223 tokent a „RecipientContract” címre a „transfer(address,uin256,bytes calldata _data)” függvénnyel kell küldeni. Ha az adatparaméter „0xc2985578” (ami a „foo()” függvény jele), akkor a foo() függvény indul el a token letétbe helyezése után, és a Foo() eseményt adja.

A paramétereket be lehet adni a token átadás „data” részébe is, például meghívhatjuk a bar() függvényt az 12345 értékkel „_someNumber” mezőben. Ekkor a „data” a következő „0x0423a13200000000000000000000000000000000000000000000000000000000000004d2”, ahol a „0x0423a132” a „bar(uint256)” függvény aláírása és „00000000000000000000000000000000000000000000000000000000000004d2” a 12345 érték uint256-ként.

## Korlátok {#limitations}

Miközben az ERC-223 megold néhány gondot az ERC-20 szabvány kapcsán, megvannak a maga korlátai:

- Adaptáció és kompatibilitás: az ERC-223 még nincs széles körben adaptálva, ami miatt behatárolt a meglévő eszközökkel és platformokkal való kompatibilitása.
- Visszafelé ható kompatibilitás: az ERC-223 nem kompatibilis visszafelé az ERC-20-szal, tehát a meglévő ERC-20-as szerződések és eszközök nem fognak működni az ERC-223 tokenekkel változtatás nélkül.
- Gázköltségek: Az ERC-223 küldés extra ellenőrzései és funkciói nagyobb költségeket eredményezhetnek egy ERC-20 tranzakcióhoz képest.

## További olvasnivaló {#further-reading}

- [EIP-223: ERC-223 tokenszabvány](https://eips.ethereum.org/EIPS/eip-223)
- [Eredeti ERC-223 javaslat](https://github.com/ethereum/eips/issues/223)
