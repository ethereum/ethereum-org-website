---
title: Anatomy ya mikataba smart
description: Uchunguzi wa kina wa anatomia ya mwasiliani mahiri - kazi, data na vigeu.
lang: sw
---

Mkataba mzuri ni mpango unaoendeshwa kwenye anwani kwenye Ethereum. Zinajumuisha data na vipengele vinavyoweza kutekeleza unapopokea muamala. Huu hapa ni muhtasari wa kile kinachounda mkataba mzuri.

## Mahitaji ya awali {#prerequisites}

Hakikisha umesoma kuhusu [mikataba-erevu](/developers/docs/smart-contracts/) kwanza. Hati hii inadhania kuwa tayari unajua lugha za programu kama vile JavaScript au Python.

## Data {#data}

Data yoyote ya mkataba lazima ipewe eneo: ama kwa `storage` au `memory`. Ni gharama kubwa kurekebisha hifadhi katika mkataba mahiri kwa hivyo unahitaji kuzingatia mahali data yako inapaswa kuishi.

### Ghala {#storage}

Data endelevu inajulikana kama hifadhi na inawakilishwa na vigeu vya hali. Thamani hizi huhifadhiwa kabisa kwenye Kiambajengo. Unahitaji kutangaza aina ili mkataba uweze kufuatilia ni kiasi gani cha hifadhi kwenye Kiambajengo inahitaji wakati inapoundwa.

```solidity
// Mfano wa Solidity
contract SimpleStorage {
    uint storedData; // Kigezo cha Hali
    // ...
}
```

```python
# Mfano wa Vyper
storedData: int128
```

Ikiwa tayari umepanga lugha zinazoelekezwa kwa kitu, kuna uwezekano kwamba utafahamu aina nyingi. Hata hivyo, `address` inapaswa kuwa mpya kwako ikiwa wewe ni mgeni katika uendelezaji wa Ethereum.

Aina ya `address` inaweza kushikilia anwani ya Ethereum ambayo ni sawa na baiti 20 au biti 160. Inarudi katika nukuu ya hexadecimal na 0x inayoongoza.

Aina zingine ni pamoja na:

- boolean
- nambari kamili
- nambari za uhakika
- safu za baiti za ukubwa usiobadilika
- safu za baiti zenye ukubwa unaobadilika
- maandishi halisi ya kimantiki na nambari kamili
- maandishi halisi ya string
- maandishi halisi ya heksadesimali
- enums

Kwa maelezo zaidi, angalia hati:

- [Tazama aina za Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Tazama aina za Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Kumbukumbu {#memory}

Thamani ambazo huhifadhiwa kwa muda wote wa utendakazi wa kazi ya mkataba huitwa vigeu vya kumbukumbu. Kwa kuwa hizi hazihifadhiwa kwa kudumu kwenye Kiambajengo, ni nafuu sana kutumia.

Jifunze zaidi kuhusu jinsi EVM inavyohifadhi data (Hifadhi, Kumbukumbu, na Stack) katika [nyaraka za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Vigezo vya mazingira {#environment-variables}

Mbali na vigezo unavyobainisha kwenye mkataba wako, kuna baadhi ya vigezo maalum vya kimataifa.". Zinatumika kimsingi kutoa habari kuhusu blockchain au shughuli ya sasa.

Mifano:

| **Sifa**          | **Kigezo cha Hali** | **Maelezo**                                         |
| ----------------- | ------------------- | --------------------------------------------------- |
| `block.timestamp` | uint256             | Muhuri wa wakati wa kipindi cha kizuizi cha sasa    |
| `msg.sender`      | anuani              | Mtumaji wa ujumbe (simu ya sasa) |

## Kazi {#functions}

Kwa maneno rahisi zaidi, chaguo za kukokotoa zinaweza kupata taarifa au kuweka taarifa kujibu miamala inayoingia.

Kuna aina mbili za simu za kazi:

- `internal` – hizi hazitengenezi simu ya EVM
  - Kazi za ndani na vigezo vya hali vinaweza kufikiwa tu ndani (yaani, kutoka ndani ya mkataba wa sasa au mikataba inayotokana nayo)
- `external` – hizi hutengeneza simu ya EVM
  - Kazi za nje ni sehemu ya kiolesura cha mkataba, ambayo ina maana kwamba zinaweza kuitwa kutoka kwa mikataba mingine na kupitia miamala. Kazi ya nje `f` haiwezi kuitwa ndani (yaani, `f()` haifanyi kazi, lakini `this.f()` inafanya kazi).

Pia zinaweza kuwa za `umma` au `faragha`

- `kazi za umma` zinaweza kuitwa ndani kutoka ndani ya mkataba au nje kupitia ujumbe
- `kazi za faragha` zinaonekana tu kwa mkataba ambapo zimefafanuliwa na si katika mikataba inayotokana

Vipengele vyote viwili vya kukokotoa na vigeZO Hali vinaweza kuwekwa hadharani au kwa faragha

Hapa kuna kazi ya kubadilisha utofauti wa hali kwenye mkataba:

```solidity
// Mfano wa Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Kigezo `value` cha aina ya `string` kinapitishwa kwenye kazi: `update_name`
- Imetangazwa kuwa ya `umma`, ikimaanisha mtu yeyote anaweza kuifikia
- Haijatangazwa `view`, hivyo inaweza kurekebisha hali ya mkataba

### Kazi za kutazama {#view-functions}

Kazi hizi zinaahidi kutorekebisha hali ya data ya mkataba. Mifano ya kawaida ni vitendaji vya "pata" - unaweza kutumia hii kupokea salio la mtumiaji kwa mfano.

```solidity
// Mfano wa Solidity
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

Ni nini kinachozingatiwa hali ya kurekebisha:

1. Kuandika vigezo kwa hali.
2. [Kutoa matukio](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Kuunda mikataba mingine](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Kutumia `selfdestruct`.
5. Inatuma etha kupitia simu.
6. Kuita kazi yoyote ambayo haijawekwa alama ya `view` au `pure`.
7. Kupigia simu chaguo za kukokotoa ambazo hazijawekwa alama <code>tazama</code> au <code>safi</code>.
8. Kutumia mkusanyiko wa ndani ambao una opcodes fulani.

### Kazi za kiunda {#constructor-functions}

`kazi za kiunda` hutekelezwa mara moja tu wakati mkataba unapelekwa kwa mara ya kwanza. Kama `constructor` katika lugha nyingi za programu za msingi wa darasa, kazi hizi mara nyingi huanzisha vigezo vya hali kwa thamani zake zilizoainishwa.

```solidity
// Mfano wa Solidity
// Huanzisha data ya mkataba, ikiweka `owner`
// kwa anwani ya muundaji wa mkataba.
constructor() public {
    // Mikataba-erevu yote hutegemea miamala ya nje ili kuanzisha kazi zake.
    // `msg` ni kigezo cha kimataifa ambacho kinajumuisha data husika kwenye muamala uliopewa,
    // kama vile anwani ya mtumaji na thamani ya ETH iliyojumuishwa kwenye muamala.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
    owner = msg.sender;
}
```

```python
# Mfano wa Vyper

@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time
```

### Kazi zilizojengewa ndani {#built-in-functions}

Kando na vigezo na chaguo za kukokotoa unazofafanua kwenye mkataba wako, kuna vitendaji maalum vilivyojumuishwa. Mfano dhahiri zaidi ni:

- `address.send()` – Solidity
- `send(address)` – Vyper

Hizi huruhusu kandarasi kutuma ETH kwa akaunti zingine.

## Kuandika kazi {#writing-functions}

Utendaji wako unahitaji:

- kutofautisha kwa paramu na aina (ikiwa inakubali vigezo)
- tamko la ndani/nje
- tamko la mtazamo safi/unaoweza kulipwa
- inarudisha aina (ikiwa inarudisha thamani)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // kigezo cha hali

    // Inaitwa wakati mkataba unapelekwa na kuanzisha thamani
    constructor() public {
        dapp_name = "Mfumo wangu mtawanyo wa kimamlaka wa mfano";
    }

    // Kazi ya Kupata
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Kazi ya Kuweka
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Mkataba kamili unaweza kuonekana kama hii. Hapa kazi ya `constructor` inatoa thamani ya awali kwa kigezo cha `dapp_name`.

## Matukio na kumbukumbu {#events-and-logs}

Matukio huwezesha mkataba wako mahiri kuwasiliana na eneo lako la mbele au programu zingine za kujisajili. Baada ya muamala kuthibitishwa na kuongezwa kwenye kizuizi, mikataba mahiri inaweza kutoa matukio na kuweka taarifa, ambayo sehemu ya mbele inaweza kuchakata na kutumia.

## Mifano yenye maelezo {#annotated-examples}

Hii ni baadhi ya mifano iliyoandikwa katika umoja. Ikiwa ungependa kucheza na msimbo, unaweza kuingiliana nao katika [Remix](http://remix.ethereum.org).

### Habari dunia {#hello-world}

```solidity
// Inabainisha toleo la Solidity, kwa kutumia matoleo ya kimantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Inafafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa kazi na data (hali yake).
// Baada ya kupelekwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa bloku wa Ethereum.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Inatangaza kigezo cha hali `message` cha aina ya `string`.
    // Vigezo vya hali ni vigezo ambavyo thamani zake huhifadhiwa kabisa katika hifadhi ya mkataba.
    // Neno muhimu `public` hufanya vigezo viweze kufikiwa kutoka nje ya mkataba
    // na huunda kazi ambayo mikataba mingine au wateja wanaweza kuita ili kufikia thamani.
    string public message;

    // Sawa na lugha nyingi za programu za kuelekeza-vitu zenye msingi wa darasa, kiunda ni
    // kazi maalum ambayo inatekelezwa tu wakati wa uundaji wa mkataba.
    // Viunda hutumika kuanzisha data ya mkataba.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Inakubali hoja ya string `initMessage` na kuweka thamani
        // kwenye kigezo cha hifadhi cha `message` cha mkataba).
        message = initMessage;
    }

    // Kazi ya umma inayokubali hoja ya string
    // na inasasisha kigezo cha hifadhi cha `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Token {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // `Anwani` inalinganishwa na anwani ya barua pepe - inatumika kutambua akaunti kwenye Ethereum.
    // Anwani zinaweza kuwakilisha mkataba-erevu au akaunti za nje (mtumiaji).
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` kimsingi ni muundo wa data wa jedwali la hashi.
    // `mapping` hii inapeana nambari kamili isiyo na alama (salio la tokeni) kwa anwani (mmiliki wa tokeni).
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Matukio huruhusu uwekaji kumbukumbu wa shughuli kwenye mnyororo wa bloku.
    // Wateja wa Ethereum wanaweza kusikiliza matukio ili kujibu mabadiliko ya hali ya mkataba.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Huanzisha data ya mkataba, ikiweka `owner`
    // kwa anwani ya muundaji wa mkataba.
    constructor() public {
        // Mikataba-erevu yote hutegemea miamala ya nje ili kuanzisha kazi zake.
        // `msg` ni kigezo cha kimataifa ambacho kinajumuisha data husika kwenye muamala uliopewa,
        // kama vile anwani ya mtumaji na thamani ya ETH iliyojumuishwa kwenye muamala.
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Huunda kiasi cha tokeni mpya na kuzituma kwa anwani.
    function mint(address receiver, uint amount) public {
        // `require` ni muundo wa udhibiti unaotumika kutekeleza masharti fulani.
        // Ikiwa taarifa ya `require` itatathminiwa kuwa `false`, ubaguzi husababishwa,
        // ambayo hubatilisha mabadiliko yote yaliyofanywa kwa hali wakati wa wito wa sasa.
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Mmiliki wa mkataba pekee ndiye anayeweza kuita kazi hii
        require(msg.sender == owner, "Wewe si mmiliki.");

        // Inatekeleza kiasi cha juu cha tokeni
        require(amount < 1e60, "Utoaji wa juu umezidi");

        // Huongeza salio la `receiver` kwa `amount`
        balances[receiver] += amount;
    }

    // Hutuma kiasi cha tokeni zilizopo kutoka kwa mpigaji simu yeyote kwenda kwa anwani.
    function transfer(address receiver, uint amount) public {
        // Mtumaji lazima awe na tokeni za kutosha kutuma
        require(amount <= balances[msg.sender], "Salio halitoshi.");

        // Hurekebisha salio la tokeni za anwani mbili
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Hutoa tukio lililofafanuliwa mapema
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Mali ya kipekee ya kidijitali {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Huingiza alama kutoka faili zingine kwenye mkataba wa sasa.
// Katika kesi hii, mfululizo wa mikataba msaidizi kutoka OpenZeppelin.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Neno muhimu `is` hutumika kurithi kazi na maneno muhimu kutoka kwa mikataba ya nje.
// Katika kesi hii, `CryptoPizza` inarithi kutoka kwa mikataba ya `IERC721` na `ERC165`.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Hutumia maktaba ya SafeMath ya OpenZeppelin kufanya shughuli za hesabu kwa usalama.
    // Jifunze zaidi: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Vigezo vya hali vya kudumu katika Solidity ni sawa na lugha zingine
    // lakini lazima upeane kutoka kwa usemi ambao ni wa kudumu wakati wa kukusanya.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Aina za muundo hukuruhusu kufafanua aina yako mwenyewe
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Huunda safu tupu ya miundo ya Pizza
    Pizza[] public pizzas;

    // Upangaji kutoka ID ya pizza hadi anwani ya mmiliki wake
    mapping(uint256 => address) public pizzaToOwner;

    // Upangaji kutoka anwani ya mmiliki hadi idadi ya tokeni inayomilikiwa
    mapping(address => uint256) public ownerPizzaCount;

    // Upangaji kutoka ID ya tokeni hadi anwani iliyoidhinishwa
    mapping(uint256 => address) pizzaApprovals;

    // Unaweza kuweka upangaji, mfano huu unapanga mmiliki kwa idhini za mendeshaji
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Kazi ya ndani ya kuunda Pizza nasibu kutoka kwa string (jina) na DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Neno muhimu `internal` linamaanisha kazi hii inaonekana tu
        // ndani ya mkataba huu na mikataba inayotokana na mkataba huu
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ni kirekebishaji cha kazi kinachokagua ikiwa pizza tayari ipo
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Huongeza Pizza kwenye safu ya Piza na kupata id
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Hukagua kwamba mmiliki wa Pizza ni sawa na mtumiaji wa sasa
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // kumbuka kuwa address(0) ni anwani sifuri,
        // ikionyesha kuwa pizza[id] bado haijatengewa mtumiaji fulani.

        assert(pizzaToOwner[id] == address(0));

        // Inapanga Pizza kwa mmiliki
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Huunda Pizza nasibu kutoka kwa string (jina)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Huzalisha DNA nasibu kutoka kwa string (jina) na anwani ya mmiliki (muundaji)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Kazi zilizo na alama ya `pure` huahidi kutosoma au kurekebisha hali
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Huzalisha uint nasibu kutoka kwa string (jina) + anwani (mmiliki)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Hurudisha safu ya Piza zilizopatikana na mmiliki
    function getPizzasByOwner(address _owner)
        public
        // Kazi zilizo na alama ya `view` huahidi kurekebisha hali
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Hutumia eneo la hifadhi la `memory` kuhifadhi thamani tu kwa
        // mzunguko wa maisha wa wito huu wa kazi.
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/introduction-to-smart-contracts.html#storage-memory-and-the-stack
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

    // Huhamisha Pizza na umiliki kwa anwani nyingine
    function transferFrom(address _from, address _to, uint256 _pizzaId) public {
        require(_from != address(0) && _to != address(0), "Anwani batili.");
        require(_exists(_pizzaId), "Pizza haipo.");
        require(_from != _to, "Haiwezi kuhamisha kwa anwani ileile.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Anwani haijaidhinishwa.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Hutoa tukio lililofafanuliwa katika mkataba wa IERC721 ulioingizwa
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Huhamisha umiliki wa ID ya tokeni fulani kwa usalama kwenda kwa anwani nyingine
     * Ikiwa anwani lengwa ni mkataba, lazima itekeleze `onERC721Received`,
     * ambayo inaitwa wakati wa uhamisho salama, na kurudisha thamani ya kichawi
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * vinginevyo, uhamisho unabatilishwa.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Huhamisha umiliki wa ID ya tokeni fulani kwa usalama kwenda kwa anwani nyingine
     * Ikiwa anwani lengwa ni mkataba, lazima itekeleze `onERC721Received`,
     * ambayo inaitwa wakati wa uhamisho salama, na kurudisha thamani ya kichawi
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * vinginevyo, uhamisho unabatilishwa.
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 pizzaId,
        bytes memory _data
    ) public {
        this.transferFrom(from, to, pizzaId);
        require(_checkOnERC721Received(from, to, pizzaId, _data), "Lazima utekeleze onERC721Received.");
    }

    /**
     * Kazi ya ndani ya kuita `onERC721Received` kwenye anwani lengwa
     * Wito hautekelezwi ikiwa anwani lengwa si mkataba
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

    // Huchoma Pizza - huharibu Tokeni kabisa
    // Kirekebishaji cha kazi cha `external` kinamaanisha kazi hii ni
    // sehemu ya kiolesura cha mkataba na mikataba mingine inaweza kuiita
    function burn(uint256 _pizzaId) external {
        require(msg.sender != address(0), "Anwani batili.");
        require(_exists(_pizzaId), "Pizza haipo.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Anwani haijaidhinishwa.");

        ownerPizzaCount[msg.sender] = SafeMath.sub(
            ownerPizzaCount[msg.sender],
            1
        );
        pizzaToOwner[_pizzaId] = address(0);
    }

    // Hurudisha hesabu ya Piza kwa anwani
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Hurudisha mmiliki wa Pizza iliyopatikana kwa id
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "ID ya Pizza batili.");
        return owner;
    }

    // Huidhinisha anwani nyingine kuhamisha umiliki wa Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Lazima uwe mmiliki wa Pizza.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Hurudisha anwani iliyoidhinishwa kwa Pizza maalum
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza haipo.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Kazi ya faragha ya kufuta idhini ya sasa ya ID ya tokeni fulani
     * Hubatilisha ikiwa anwani iliyotolewa si kweli mmiliki wa tokeni
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Lazima uwe mmiliki wa pizza.");
        require(_exists(_pizzaId), "Pizza haipo.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Huweka au huondoa idhini ya mendeshaji fulani
     * Mendeshaji anaruhusiwa kuhamisha tokeni zote za mtumaji kwa niaba yake
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Haiwezi kuidhinisha anwani mwenyewe");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Husema ikiwa mendeshaji ameidhinishwa na mmiliki fulani
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Huchukua umiliki wa Pizza - kwa watumiaji walioidhinishwa pekee
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Anwani haijaidhinishwa.");
        address owner = this.ownerOf(_pizzaId);
        this.transferFrom(owner, msg.sender, _pizzaId);
    }

    // Hukagua ikiwa Pizza ipo
    function _exists(uint256 pizzaId) internal view returns (bool) {
        address owner = pizzaToOwner[pizzaId];
        return owner != address(0);
    }

    // Hukagua ikiwa anwani ni mmiliki au imeidhinishwa kuhamisha Pizza
    function _isApprovedOrOwner(address spender, uint256 pizzaId)
        internal
        view
        returns (bool)
    {
        address owner = pizzaToOwner[pizzaId];
        // Lemaza ukaguzi wa solium kwa sababu ya
        // https://github.com/duaraghav8/Solium/issues/175
        // solium-disable-next-line operator-whitespace
        return (spender == owner ||
            this.getApproved(pizzaId) == spender ||
            this.isApprovedForAll(owner, spender));
    }

    // Kagua ikiwa Pizza ni ya kipekee na bado haipo
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
        require(result, "Pizza yenye jina kama hilo tayari ipo.");
        _;
    }

    // Hurudisha ikiwa anwani lengwa ni mkataba
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Kwa sasa hakuna njia bora ya kuangalia kama kuna mkataba katika anwani
        // kuliko kuangalia ukubwa wa msimbo kwenye anwani hiyo.
        // Tazama https://ethereum.stackexchange.com/a/14016/36603
        // kwa maelezo zaidi kuhusu jinsi hii inavyofanya kazi.
        // TODO Kagua hili tena kabla ya toleo la Serenity, kwa sababu anwani zote zitakuwa
        // mikataba basi.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Masomo zaidi {#further-reading}

Angalia nyaraka za Solidity na Vyper kwa muhtasari kamili zaidi wa mikataba mahiri:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Mada zinazohusiana {#related-topics}

- [Mikataba-erevu](/developers/docs/smart-contracts/)
- [Mashine Halisi ya Ethereum](/developers/docs/evm/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Kupunguza mikataba ili kupambana na kikomo cha ukubwa wa mkataba](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Baadhi ya vidokezo vya vitendo vya kupunguza ukubwa wa mkataba wako mahiri._
- [Kuweka kumbukumbu ya data kutoka kwa mikataba mahiri na matukio](/developers/tutorials/logging-events-smart-contracts/) _– Utangulizi wa matukio ya mkataba mahiri na jinsi unavyoweza kuyatumia kuweka kumbukumbu ya data._
- [Kuingiliana na mikataba mingine kutoka Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jinsi ya kupeleka mkataba mahiri kutoka kwa mkataba uliopo na kuingiliana nao._
