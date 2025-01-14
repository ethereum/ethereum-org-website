---
title: A okosszerződések anatómiája
description: Egy részletes betekintés az okosszerződések felépítésébe, beleértve a függvényeket, adatokat és változókat.
lang: hu
---

Az okosszerződés egy olyan program, mely egy cím alatt fut az Ethereumon. Adatokból és függvényekből állnak, melyeket végre lehet hajtani bemenő tranzakciók által. Ez az áttekintés az okosszerződések felépítéséről szól.

## Előfeltételek {#prerequisites}

Először tekintse meg az [okosszerződésekről](/developers/docs/smart-contracts/) szóló cikket. Ez a dokumentum feltételezi, hogy már jártas a programozási nyelvekben, mint a JavaScript vagy a Python.

## Adat {#data}

Minden szerződésadatot hozzá kell rendelni egy lokációhoz, mely lehet a `storage` vagy a `memory`. Költséges a tárhelyet módosítani egy okosszerződésben, tehát érdemes fontolóra venni, hogy hol legyen az adat.

### Tárhely {#storage}

Az állandó adatokat tárolásnak nevezzük, és állapotváltozók reprezentálják őket. Ezeket az értékeket permanensen a blokkláncon tároljuk. Deklarálnia kell a típust, hogy a szerződés számon tudja tartani, hogy mekkora tárhelyre lesz szüksége a blokkláncon az átfordításkor.

```solidity
// Solidity példa
contract SimpleStorage {
    uint storedData; // Állapotváltozó
    // ...
}
```

```python
# Vyper példa
storedData: int128
```

Ha Ön programozott már objektumorientált nyelven, akkor a legtöbb típus valószínűleg ismerős lesz. Ugyanakkor az `address` típus új lesz, ha még csak most ismerkedik az Ethereum fejlesztéssel.

Az `address` típus egy Ethereum címet tud tárolni, mely 20 bájttal vagy 160 bittel egyenlő. Hexadecimális értéket ad vissza vezető 0x-szel.

A többi típus:

- boolean
- egész (integer)
- fixpontos szám
- fix méretű bájttömb
- dinamikus méretű bájttömb
- Racionális és egész szám literálok
- String literálok
- Hexadecimális literálok
- Enum

További magyarázatért tekintse meg az alábbi dokumentumokat:

- [Vyper típusok megtekintése](https://vyper.readthedocs.io/en/v0.1.0-beta.6/types.html#value-types)
- [Solidity típusok megtekintése](https://solidity.readthedocs.io/en/latest/types.html#value-types)

### Memória {#memory}

Memóriaváltozóknak nevezzük azokat az értékeket, melyek csak a szerződésfunkció végrehajtása alatt tárolódnak. Mivel nem kell őket permanensen a blokkláncon tárolni, így sokkal olcsóbb a használatuk.

Tudjon meg többet az EVM adattárolási módszeréről a [Solidity dokumentációból](https://solidity.readthedocs.io/en/latest/introduction-to-smart-contracts.html?highlight=memory#storage-memory-and-the-stack) (a „Storage, Memory and the Stack” szekcióból).

### Környezeti változók {#environment-variables}

A szerződésben meghatározott változók mellett van néhány speciális globális változó is. Elsősorban a blokklánccal vagy az aktuális tranzakcióval kapcsolatos információk nyújtására szolgálnak.

Példák:

| **Tul.**          | **Állapotváltozó** | **Leírás**                          |
| ----------------- | ------------------ | ----------------------------------- |
| `block.timestamp` | uint256            | Jelenlegi blokk korszak időbélyege  |
| `msg.sender`      | address            | Az üzenet küldője (jelenlegi hívás) |

## Függvények {#functions}

A legegyszerűbben megfogalmazva, a függvények információkat kaphatnak vagy információkat állíthatnak be válaszul a bejövő tranzakciókra.

Kétfajta függvényhívás létezik:

- `internal` – ezek nem okoznak EVM hívást
  - A belső (internal) függvényeket és állapotváltozókat csak belülről lehet elérni (vagyis a jelenlegi szerződésből vagy a származtatott szerződésekből)
- `external` – ezek EVM hívást okoznak
  - A külső (external) függvények a szerződés felületének részei, mely azt jelenti, hogy meg lehet őket hívni más szerződésekből vagy tranzakciókon keresztül. Egy külső függvény `f` kódját nem lehet belülről meghívni (vagyis az `f()` nem működik, de a `this.f()` igen).

Ezenkívül lehetnek `public` vagy `private` típusúak is

- a `public` függvényeket belülről lehet meghívni vagy kívülről üzenetek által
- a `private` függvények csak abban a szerződésben láthatóak, amiben definiálták őket, a származtatott szerződésekben nem

A függvények és az állapotváltozók is lehetnek publikusak vagy privátak

Íme egy függvény, mely egy állapotváltozó értékét állítja be egy szerződésben:

```solidity
// Solidity példa
function update_name(string value) public {
    dapp_name = value;
}
```

- A `string` típusú `value` paraméter kerül be a függvénybe: `update_name`
- Ez `public` módon lett deklarálva, így mindenki hozzáfér
- Nem `view` módon lett deklarálva, így módosíthatja a szerződésállapotot

### Nézet (view) függvények {#view-functions}

Ezek a függvények azt ígérik, hogy nem módosítják a szerződés adatainak állapotát. Általános példák a „getter” függvények – ezeket használhatja például egy felhasználó egyenlegének lekérdezésére.

```solidity
// Solidity példa
function balanceOf(address _owner) public view returns (uint256 _balance) {
    return ownerPizzaCount[_owner];
}
```

```python
dappName: public(string)

@view
@public
def readName() -> string:
  return dappName
```

Mi számít állapotmódosításnak:

1. Állapotváltozókba írás.
2. [Események kibocsátása](https://solidity.readthedocs.io/en/v0.7.0/contracts.html#events).
3. [Másik szerződés létrehozás](https://solidity.readthedocs.io/en/v0.7.0/control-structures.html#creating-contracts).
4. A `selfdestruct` használata.
5. Ether küldése hívásokkal.
6. Bármely függvény meghívása, mely nincs `view` vagy `pure` jelöléssel ellátva.
7. Alacsony szintű hívások.
8. Egysoros assembly használata, mely bizonyos opkódot tartalmaz.

### Konstruktor függvények {#constructor-functions}

A `constructor` csak egyszer fut le, amikor a szerződést először telepítik. Mint a `constructor` számos osztályalapú programozási nyelv esetében, ezek a függvények gyakran inicializálják az állapotváltozókat a meghatározott értékeikre.

```solidity
// Solidity példa
// Inicializálja a szerződés adatait, beállítja az 'owner-t'
// a szerződés létrehozó címére.
constructor() public {
    // Minden okosszerződés külső tranzakciókra hagyatkozik a függvényeik végrehajtására.
    // az `msg` globális változó, mely az adott tranzakcióhoz tartozó adatot tartalmaz,
    // mint a küldő címe és az ETH mennyisége a tranzakcióban.
    // Több infó: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Vyper példa

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Beépített függvények {#built-in-functions}

A szerződésben meghatározott függvények és változók mellett van néhány speciális beépített függvény is. A legnyilvánvalóbb példák:

- `address.send()` – Solidity
- `send(address)` – Vyper

Ez lehetőséget ad a szerződéseknek, hogy ETH-t küldjenek más számláknak.

## Függvények írása {#writing-functions}

A függvénynek szüksége van:

- egy paraméterváltozóra és egy típusra (ha elfogad paramétereket)
- a belső/külső deklarációra
- a pure/view/payable deklarációra
- a visszatérítési érték típusára (ha van visszatérítési értéke)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // state variable

    // Called when the contract is deployed and initializes the value
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Get Function
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Set Function
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Egy kész szerződés nagyjából így nézne ki. Itt a `constructor` függvény biztosítja a `dapp_name` változó kezdeti értékét.

## Események és naplózások {#events-and-logs}

Az eseményeken keresztül tud kommunikálni az okosszerződés és a frontend vagy más feliratkozó alkalmazás. Amikor egy tranzakciót validálnak, az okosszerződések eseményeket és naplófájlokat bocsáthatnak ki, melyet a frontend feldolgozhat és hasznosíthat.

## Jegyzetekkel ellátott példák {#annotated-examples}

Íme néhány példa, amelyet Solidity-ben írtak. Ha szeretne megismerkedni a kóddal, akkor kipróbálhatja a [Remixben](http://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// A Solidity verziószámát írja elő szemantikailag.
// Több információ: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Egy `HelloWorld` nevű szerződés definiálása.
// A szerződés egy függvények és adatok (az állapota) gyűjteménye.
// Telepítés után a szerződés egy bizonyos címen él az Ethereum blokkláncon.
//További információ: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Deklarálja a `string` típusú `message` állapotváltozót.
    // Az állapotváltozók olyan változók, melyeknek értékei permanensen tárolódnak a szerződés tárhelyén.
    // A `public` kulcsszó lehetővé teszi a változó szerződésen kívüli elérését
    // és függvényt hoz létre, mellyel más szerződések vagy kliensek le tudják kérdezni az értéket.
    string public message;

    // Más osztály alapú nyelvhez hasonlóan a konstruktor egy
    // speciális függvény, mely csak egyszer fut le a szerződés létrehozáskor.
    // A konstruktorokat az szerződés adatainak inicializálásra lehet használni.
    // További információ: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Az `initMessage` string paramétert fogadja el és beállítja
        // a szerződés `message` tárhely változójába).
        message = initMessage;
    }

    // Egy publikus függvény, mely egy string paramétert fogad el
    // és frissíti a `message` tárhely változót.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Egy `address` olyan, mint egy email cím - az Ethereum számlák beazonosítására szolgál.
    // A címek okosszerződéseket vagy külső (felhasználói) számlákat jelölnek.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // A `mapping` lényegében egy hash tábla adatszerkezet.
    // Ez a `mapping` egy unsigned integert (a token egyenleget) rendel hozzá egy címhez (a token tartóhoz).
    // További információ: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Az eseményekkel lehet tevékenységet logolni a blokkláncon.
    // Az Ethereum kliensek figyelhetik az eseményeket, hogy reagáljanak az szerződés állapotváltozásokra.
    // További információ: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Inicializálja a szerződés adatot, beállítja az `owner`
    // változót a szerződés létrehozó címére.
    constructor() public {
        // Minden okosszerződés külső tranzakciókra hagyatkozik a függvényeik végrehajtására.
        // az `msg` globális változó, mely az adott tranzakcióhoz tartozó adatot tartalmaz,
        // mint a küldő címe és az ETH mennyisége a tranzakcióban.
        //További információ: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Új tokeneket hoz létre és elküldi egy címre.
    function mint(address receiver, uint amount) public {
        // A `require` egy kontrol struktúra, mely bizonyos feltételek betartatására szolgál.
        // Ha a `require` állítás `false` értéket ad, egy kivétel triggerelődik,
        // mely visszaállít minden állapotváltozást a jelenlegi hívás alatt.
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Only the contract owner can call this function
        require(msg.sender == owner, "You are not the owner.");

        // Enforces a maximum amount of tokens
        require(amount < 1e60, "Maximum issuance exceeded");

        // Increases the balance of `receiver` by `amount`
        balances[receiver] += amount;
    }

    // Sends an amount of existing tokens from any caller to an address.
    function transfer(address receiver, uint amount) public {
        // A küldőnek elég tokennel kell rendelkeznie
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Beállítja a token a két cím token mennyiségét
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Kibocsájtja a korábban definiált eseményt
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Egyedi digitális eszköz {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Szimbólumokat importál be más fájlokból a jelenlegi szerződésbe.
// Ebben az esetben egy pár segítő szerződést az OpenZeppelinről.
// További információ: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Az `is` kulcsszót használjuk, hogy külső szerződések függvényeit és kulcsszavait örököltessük.
// Ebben az esetben, `CryptoPizza` örököl az `IERC721` és az `ERC165` szerződésekből.
// További információ: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Az OpenZeppelin SafeMath könyvtárát használja aritmetikai számítások biztonságos elvégzésére.
    // További információ: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // A konstans állapotváltozók a Solidity-ben hasonlóak más nyelvekhez
    // de a fordítás ideje alatt konstans kifejezésből kell hozzárendelni.
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Struct types let you define your own type
    // Learn more: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Creates an empty array of Pizza structs
    Pizza[] public pizzas;

    // Mapping from pizza ID to its owner's address
    mapping(uint256 => address) public pizzaToOwner;

    // Mapping from owner's address to number of owned token
    mapping(address => uint256) public ownerPizzaCount;

    // Mapping from token ID to approved address
    mapping(uint256 => address) pizzaApprovals;

    // You can nest mappings, this example maps owner to operator approvals
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Internal function to create a random Pizza from string (name) and DNA
    function _createPizza(string memory _name, uint256 _dna)
        // The `internal` keyword means this function is only visible
        // within this contract and contracts that derive this contract
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` is a function modifier that checks if the pizza already exists
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Adds Pizza to array of Pizzas and get id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Checks that Pizza owner is the same as current user
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // note that address(0) is the zero address,
        // indicating that pizza[id] is not yet allocated to a particular user.

        assert(pizzaToOwner[id] == address(0));

        // Maps the Pizza to the owner
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Creates a random Pizza from string (name)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Generates random DNA from string (name) and address of the owner (creator)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Functions marked as `pure` promise not to read from or modify the state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Generates random uint from string (name) + address (owner)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Returns array of Pizzas found by owner
    function getPizzasByOwner(address _owner)
        public
        // Functions marked as `view` promise not to modify state
        // Learn more: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Uses the `memory` storage location to store values only for the
        // lifecycle of this function call.
        // További info: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
        uint256[] memory result = new uint256[](ownerPizzaCount[_owner]);
        uint256 counter = 0;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (pizzaToOwner[i] == _owner) {
                result[counter] = i;
                counter++;
            }
        }
        return result;
    }

    // Átadja a Pizza tulajdonjogot és másik címnek
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Kibocsájt egy eseményt, mely az importált IERC721 szerződésben van definiálva
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Biztonságosan átadja a egy adott token ID tulajdonjogát egy másik címnek
     * Ha a cél cím egy szerződés, akkor az `onERC721Received`-nek implementálva kell lennie,
     * mely egy biztonságos átadáskor meghívódik és visszaadja a bűvös értéket
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * ellenkező esetben a transfer visszafordul.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Biztonságosan átadja a egy adott token ID tulajdonjogát egy másik címnek
     * Ha a cél cím egy szerződés, akkor az `onERC721Received`-nek implementálva kell lennie,
     * mely egy biztonságos átadáskor meghívódik és visszaadja a bűvös értéket
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * ellenkező esetben a transfer visszafordul.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Must implement onERC721Received.");
    }

    /**
     * Internal function to invoke `onERC721Received` on a target address
     * The call is not executed if the target address is not a contract
     */
    function _checkOnERC721Received(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) internal returns (bool) {
        if (!isContract(to)) {
            return true;
        }

        bytes4 retval = IERC721Receiver(to).onERC721Received(
            msg.sender,
            from,
            pizzaId,
            _data
        );
        return (retval == _ERC721_RECEIVED);
    }

    // Burns a Pizza - destroys Token completely
    // The `external` function modifier means this function is
    // part of the contract interface and other contracts can call it
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Returns count of Pizzas by address
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Returns owner of the Pizza found by id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Approves other address to transfer ownership of Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Returns approved address for specific Pizza
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Private function to clear current approval of a given token ID
     * Reverts if the given address is not indeed the owner of the token
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Tells whether an operator is approved by a given owner
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Takes ownership of Pizza - only for approved users
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Checks if Pizza exists
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Checks if address is owner or is approved to transfer Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Disable solium check because of
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Check if Pizza is unique and doesn't exist yet
    modifier isUnique(string memory _name, uint256 _dna) {
        bool result = true;
        for (uint256 i = 0; i < pizzas.length; i++) {
            if (
                keccak256(abi.encodePacked(pizzas[i].name)) ==
                keccak256(abi.encodePacked(_name)) &&
                pizzas[i].dna == _dna
            ) {
                result = false;
            }
        }
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Returns whether the target address is a contract
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Currently there is no better way to check if there is a contract in an address
        // than to check the size of the code at that address.
        // Lásd https://ethereum.stackexchange.com/a/14016/36603
        // hogy hogyan működik ez.
        // TODO A Serenity release előtt ellenőrizni, mivel azután minden cím
        // szerződés lesz.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## További olvasnivaló {#further-reading}

Tekintse meg a Solidity és a Vyper dokumentációit az okosszerződések teljesebb áttekintésért:

- [Solidity](https://solidity.readthedocs.io/)
- [Vyper](https://vyper.readthedocs.io/)

## Kapcsolódó témák {#related-topics}

- [Okosszerződések](/developers/docs/smart-contracts/)
- [Ethereum virtuális gép](/developers/docs/evm/)

## Kapcsolódó útmutatók {#related-tutorials}

- [A szerződések méretének csökkentése, hogy ne okozzon gondot a méretkorlát](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Gyakorlati tanácsok az okosszerződés méretének redukálására._
- [Okosszerződések adatnaplózása az események mentén](/developers/tutorials/logging-events-smart-contracts/) _– Bevezetés az okossszerződések eseményeibe, s azok használata az adatnaplózáshoz._
- [Más szerződésekkel való interakció a Solidity által](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Hogyan telepítsen okosszerződést egy létező szerződésből és kapcsolódjon azzal._
