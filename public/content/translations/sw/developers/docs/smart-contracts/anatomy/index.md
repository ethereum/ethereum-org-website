---
title: Muundo wa mikataba mahiri
description: "Mtazamo wa kina kuhusu muundo wa mkataba mahiri – vipengele, data, na vigezo."
lang: sw
---

Mkataba mahiri ni programu inayoendeshwa kwenye anwani katika Ethereum. Imeundwa na data na vipengele vinavyoweza kutekelezwa baada ya kupokea muamala. Huu hapa ni muhtasari wa kile kinachounda mkataba mahiri.

## Mahitaji ya awali {#prerequisites}

Hakikisha umesoma kuhusu [mikataba mahiri](/developers/docs/smart-contracts/) kwanza. Hati hii inachukulia kuwa tayari unafahamu lugha za programu kama vile JavaScript au Python.

## Data {#data}

Data yoyote ya mkataba lazima ipewe eneo: iwe kwenye `storage` au `memory`. Ni gharama kubwa kurekebisha hifadhi katika mkataba mahiri kwa hivyo unahitaji kuzingatia mahali ambapo data yako inapaswa kuishi.

### Hifadhi {#storage}

Data ya kudumu inajulikana kama hifadhi na inawakilishwa na vigezo vya hali. Thamani hizi huhifadhiwa kabisa kwenye mnyororo wa vitalu. Unahitaji kutangaza aina ili mkataba uweze kufuatilia kiasi cha hifadhi kwenye mnyororo wa vitalu inachohitaji inapokusanywa.

```solidity
// Mfano wa Solidity
contract SimpleStorage {
    uint storedData; // Kibadilika cha hali
    // ...
}
```

```python
# Mfano wa Vyper
storedData: int128
```

Ikiwa tayari umepanga lugha zinazoelekezwa kwa kitu (object-oriented languages), kuna uwezekano utafahamu aina nyingi. Hata hivyo, `address` inapaswa kuwa mpya kwako ikiwa wewe ni mgeni katika uundaji wa [Ethereum](/).

Aina ya `address` inaweza kushikilia anwani ya Ethereum ambayo ni sawa na baiti 20 au biti 160. Inarudi katika nukuu ya heksadesimali inayoanza na 0x.

Aina zingine ni pamoja na:

- boolean
- nambari kamili (integer)
- nambari za uhakika zisizobadilika (fixed point numbers)
- safu za baiti zenye ukubwa usiobadilika
- safu za baiti zenye ukubwa unaobadilika
- nambari za kimantiki na kamili
- herufi za mfuatano (string literals)
- herufi za heksadesimali
- enums

Kwa maelezo zaidi, angalia hati:

- [Tazama aina za Vyper](https://docs.vyperlang.org/en/v0.1.0-beta.6/types.html#value-types)
- [Tazama aina za Solidity](https://docs.soliditylang.org/en/latest/types.html#value-types)

### Kumbukumbu {#memory}

Thamani ambazo huhifadhiwa tu kwa muda wa utekelezaji wa kipengele cha mkataba huitwa vigezo vya kumbukumbu. Kwa kuwa hizi hazihifadhiwi kabisa kwenye mnyororo wa vitalu, ni nafuu sana kutumia.

Jifunze zaidi kuhusu jinsi EVM inavyohifadhi data (Hifadhi, Kumbukumbu, na Rundo) katika [hati za Solidity](https://docs.soliditylang.org/en/latest/introduction-to-smart-contracts.html#storage-memory-and-the-stack).

### Vigezo vya mazingira {#environment-variables}

Mbali na vigezo unavyofafanua kwenye mkataba wako, kuna baadhi ya vigezo maalum vya kimataifa. Hutumiwa kimsingi kutoa taarifa kuhusu mnyororo wa vitalu au muamala wa sasa.

Mifano:

| **Sifa**          | **Kigezo cha hali** | **Maelezo**                      |
| ----------------- | ------------------ | ------------------------------------ |
| `block.timestamp` | uint256            | Muhuri wa muda wa kipindi cha kitalu cha sasa        |
| `msg.sender`      | anwani            | Mtumaji wa ujumbe (wito wa sasa) |

## Vipengele (Functions) {#functions}

Kwa maneno rahisi zaidi, vipengele vinaweza kupata taarifa au kuweka taarifa kulingana na miamala inayoingia.

Kuna aina mbili za wito wa vipengele:

- `internal` – hizi haziundi wito wa EVM
  - Vipengele vya ndani na vigezo vya hali vinaweza kufikiwa tu kwa ndani (yaani, kutoka ndani ya mkataba wa sasa au mikataba inayotokana nao)
- `external` – hizi huunda wito wa EVM
  - Vipengele vya nje ni sehemu ya kiolesura cha mkataba, ambayo inamaanisha vinaweza kuitwa kutoka kwa mikataba mingine na kupitia miamala. Kipengele cha nje `f` hakiwezi kuitwa kwa ndani (yaani, `f()` haifanyi kazi, lakini `this.f()` inafanya kazi).

Vinaweza pia kuwa `public` au `private`

- Vipengele vya `public` vinaweza kuitwa kwa ndani kutoka ndani ya mkataba au kwa nje kupitia jumbe
- Vipengele vya `private` vinaonekana tu kwa mkataba vilivyofafanuliwa ndani yake na sio katika mikataba inayotokana

Vipengele vyote viwili na vigezo vya hali vinaweza kufanywa vya umma au vya kibinafsi

Hiki hapa ni kipengele cha kusasisha kigezo cha hali kwenye mkataba:

```solidity
// Mfano wa Solidity
function update_name(string value) public {
    dapp_name = value;
}
```

- Kigezo `value` cha aina ya `string` kinapitishwa kwenye kipengele: `update_name`
- Imetangazwa `public`, ikimaanisha mtu yeyote anaweza kuifikia
- Haijatangazwa `view`, kwa hivyo inaweza kurekebisha hali ya mkataba

### Vipengele vya kutazama (View functions) {#view-functions}

Vipengele hivi vinaahidi kutorekebisha hali ya data ya mkataba. Mifano ya kawaida ni vipengele vya "getter" – unaweza kutumia hii kupokea salio la mtumiaji kwa mfano.

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

Nini kinachukuliwa kuwa kurekebisha hali:

1. Kuandika kwenye vigezo vya hali.
2. [Kutoa matukio](https://docs.soliditylang.org/en/v0.7.0/contracts.html#events).
3. [Kuunda mikataba mingine](https://docs.soliditylang.org/en/v0.7.0/control-structures.html#creating-contracts).
4. Kutumia `selfdestruct`.
5. Kutuma Etha kupitia wito.
6. Kuita kipengele chochote ambacho hakijawekwa alama ya `view` au `pure`.
7. Kutumia wito wa kiwango cha chini.
8. Kutumia mkusanyiko wa ndani (inline assembly) ambao una opcodes fulani.

### Vipengele vya konstrukta {#constructor-functions}

Vipengele vya `constructor` hutekelezwa mara moja tu wakati mkataba unaposambazwa kwa mara ya kwanza. Kama `constructor` katika lugha nyingi za programu zinazotegemea darasa (class-based), vipengele hivi mara nyingi huanzisha vigezo vya hali kwa thamani zao zilizobainishwa.

```solidity
// Mfano wa Solidity
// Huanzisha data ya mkataba, na kuweka `owner`
// kwa anwani ya muundaji wa mkataba.
constructor() public {
    // Mikataba mahiri yote inategemea miamala ya nje ili kuanzisha vitendaji vyake.
    // `msg` ni kibadilika cha kimataifa ambacho kinajumuisha data husika kwenye muamala uliopewa,
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

### Vipengele vilivyojengewa ndani {#built-in-functions}

Mbali na vigezo na vipengele unavyofafanua kwenye mkataba wako, kuna baadhi ya vipengele maalum vilivyojengewa ndani. Mfano ulio wazi zaidi ni:

- `address.send()` – Solidity
- `send(address)` – Vyper

Hizi huruhusu mikataba kutuma ETH kwa akaunti zingine.

## Kuandika vipengele {#writing-functions}

Kipengele chako kinahitaji:

- kigezo cha parameta na aina (ikiwa inakubali parameta)
- tamko la ndani/nje
- tamko la pure/view/payable
- aina ya kurejesha (ikiwa inarejesha thamani)

```solidity
pragma solidity >=0.4.0 <=0.6.0;

contract ExampleDapp {
    string dapp_name; // kibadilika cha hali

    // Huitwa wakati mkataba unasambazwa na kuanzisha thamani
    constructor() public {
        dapp_name = "My Example dapp";
    }

    // Kitendaji cha Kupata
    function read_name() public view returns(string) {
        return dapp_name;
    }

    // Kitendaji cha Kuweka
    function update_name(string value) public {
        dapp_name = value;
    }
}
```

Mkataba kamili unaweza kuonekana kama hivi. Hapa kipengele cha `constructor` hutoa thamani ya awali kwa kigezo cha `dapp_name`.

## Matukio na logi {#events-and-logs}

Matukio huwezesha mkataba mahiri wako kuwasiliana na mazingira yako ya mbele (frontend) au programu zingine zinazofuatilia. Pindi muamala unapothibitishwa na kuongezwa kwenye kitalu, mikataba mahiri inaweza kutoa matukio na taarifa za logi, ambazo mazingira ya mbele yanaweza kuchakata na kutumia.

## Mifano iliyofafanuliwa {#annotated-examples}

Hii ni baadhi ya mifano iliyoandikwa katika Solidity. Ikiwa ungependa kucheza na msimbo, unaweza kuingiliana nayo katika [Remix](https://remix.ethereum.org).

### Hello world {#hello-world}

```solidity
// Hubainisha toleo la Solidity, kwa kutumia utoaji wa matoleo wa kisemantiki.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#pragma
pragma solidity ^0.5.10;

// Hufafanua mkataba unaoitwa `HelloWorld`.
// Mkataba ni mkusanyiko wa vitendaji na data (hali yake).
// Baada ya kusambazwa, mkataba hukaa kwenye anwani maalum kwenye mnyororo wa vitalu wa Ethereum.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html
contract HelloWorld {

    // Hutangaza kibadilika cha hali `message` cha aina ya `string`.
    // Vibadilika vya hali ni vibadilika ambavyo thamani zake huhifadhiwa kabisa kwenye hifadhi ya mkataba.
    // Neno kuu `public` hufanya vibadilika kufikiwa kutoka nje ya mkataba
    // na huunda kitendaji ambacho mikataba mingine au wateja wanaweza kuita ili kufikia thamani.
    string public message;

    // Sawa na lugha nyingi zinazoelekezwa kwa vitu kulingana na darasa, konstrukta ni
    // kitendaji maalum ambacho hutekelezwa tu wakati wa kuunda mkataba.
    // Makonstrukta hutumika kuanzisha data ya mkataba.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constructors
    constructor(string memory initMessage) public {
        // Hukubali hoja ya mfuatano `initMessage` na kuweka thamani
        // kwenye kibadilika cha hifadhi cha `message` cha mkataba).
        message = initMessage;
    }

    // Kitendaji cha umma ambacho hukubali hoja ya mfuatano
    // na kusasisha kibadilika cha hifadhi cha `message`.
    function update(string memory newMessage) public {
        message = newMessage;
    }
}
```

### Tokeni {#token}

```solidity
pragma solidity ^0.5.10;

contract Token {
    // Anwani inalinganishwa na anwani ya barua pepe - inatumika kutambua akaunti kwenye Ethereum.
    // Anwani zinaweza kuwakilisha mkataba mahiri au akaunti za nje (za mtumiaji).
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#address
    address public owner;

    // `mapping` kimsingi ni muundo wa data wa jedwali la heshi.
    // `mapping` hii inapeana nambari kamili isiyo na saini (salio la tokeni) kwa anwani (mshikiliaji wa tokeni).
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#mapping-types
    mapping (address => uint) public balances;

    // Matukio huruhusu uwekaji wa logi wa shughuli kwenye mnyororo wa vitalu.
    // Wateja wa Ethereum wanaweza kusikiliza matukio ili kujibu mabadiliko ya hali ya mkataba.
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#events
    event Transfer(address from, address to, uint amount);

    // Huanzisha data ya mkataba, na kuweka `owner`
    // kwa anwani ya muundaji wa mkataba.
    constructor() public {
        // Mikataba mahiri yote inategemea miamala ya nje ili kuanzisha vitendaji vyake.
        // `msg` ni kibadilika cha kimataifa ambacho kinajumuisha data husika kwenye muamala uliopewa,
        // kama vile anwani ya mtumaji na thamani ya ETH iliyojumuishwa kwenye muamala.
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/units-and-global-variables.html#block-and-transaction-properties
        owner = msg.sender;
    }

    // Huunda kiasi cha tokeni mpya na kuzituma kwa anwani.
    function mint(address receiver, uint amount) public {
        // `require` ni muundo wa udhibiti unaotumika kutekeleza masharti fulani.
        // Ikiwa taarifa ya `require` itatathminiwa kuwa `false`, ubaguzi huanzishwa,
        // ambayo hurejesha mabadiliko yote yaliyofanywa kwa hali wakati wa wito wa sasa.
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // Mmiliki wa mkataba pekee ndiye anayeweza kuita kitendaji hiki
        require(msg.sender == owner, "You are not the owner.");

        // Hutekeleza kiasi cha juu zaidi cha tokeni
        require(amount < 1e60, "Maximum issuance exceeded");

        // Huongeza salio la `receiver` kwa `amount`
        balances[receiver] += amount;
    }

    // Hutuma kiasi cha tokeni zilizopo kutoka kwa mpigaji yeyote kwenda kwa anwani.
    function transfer(address receiver, uint amount) public {
        // Mtumaji lazima awe na tokeni za kutosha kutuma
        require(amount <= balances[msg.sender], "Insufficient balance.");

        // Hurekebisha salio la tokeni la anwani zote mbili
        balances[msg.sender] -= amount;
        balances[receiver] += amount;

        // Hutoa tukio lililofafanuliwa hapo awali
        emit Transfer(msg.sender, receiver, amount);
    }
}
```

### Rasilimali ya dijitali ya kipekee {#unique-digital-asset}

```solidity
pragma solidity ^0.5.10;

// Huingiza alama kutoka kwa faili zingine kwenye mkataba wa sasa.
// Katika kesi hii, mfululizo wa mikataba ya usaidizi kutoka OpenZeppelin.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/layout-of-source-files.html#importing-other-source-files

import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "../node_modules/@openzeppelin/contracts/introspection/ERC165.sol";
import "../node_modules/@openzeppelin/contracts/math/SafeMath.sol";

// Neno kuu `is` linatumika kurithi vitendaji na maneno makuu kutoka kwa mikataba ya nje.
// Katika kesi hii, `CryptoPizza` inarithi kutoka kwa mikataba ya `IERC721` na `ERC165`.
// Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#inheritance
contract CryptoPizza is IERC721, ERC165 {
    // Hutumia maktaba ya SafeMath ya OpenZeppelin kufanya shughuli za hesabu kwa usalama.
    // Jifunze zaidi: https://docs.openzeppelin.com/contracts/2.x/api/math#SafeMath
    using SafeMath for uint256;

    // Vibadilika vya hali vya kudumu katika Solidity ni sawa na lugha zingine
    // lakini lazima upeane kutoka kwa usemi ambao ni wa kudumu wakati wa kukusanya (compile time).
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#constant-state-variables
    uint256 constant dnaDigits = 10;
    uint256 constant dnaModulus = 10 ** dnaDigits;
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    // Aina za Struct hukuruhusu kufafanua aina yako mwenyewe
    // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/types.html#structs
    struct Pizza {
        string name;
        uint256 dna;
    }

    // Huunda safu tupu ya struct za Pizza
    Pizza[] public pizzas;

    // Kuweka ramani (Mapping) kutoka kitambulisho cha pizza hadi anwani ya mmiliki wake
    mapping(uint256 => address) public pizzaToOwner;

    // Kuweka ramani kutoka anwani ya mmiliki hadi idadi ya tokeni zinazomilikiwa
    mapping(address => uint256) public ownerPizzaCount;

    // Kuweka ramani kutoka kitambulisho cha tokeni hadi anwani iliyoidhinishwa
    mapping(uint256 => address) pizzaApprovals;

    // Unaweza kuweka ramani ndani ya ramani (nest mappings), mfano huu unaweka ramani ya mmiliki kwa idhini za mhudumu
    mapping(address => mapping(address => bool)) private operatorApprovals;

    // Kitendaji cha ndani cha kuunda Pizza ya nasibu kutoka kwa mfuatano (jina) na DNA
    function _createPizza(string memory _name, uint256 _dna)
        // Neno kuu `internal` linamaanisha kitendaji hiki kinaonekana tu
        // ndani ya mkataba huu na mikataba inayotokana na mkataba huu
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#visibility-and-getters
        internal
        // `isUnique` ni kirekebishaji cha kitendaji ambacho hukagua ikiwa pizza tayari ipo
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/structure-of-a-contract.html#function-modifiers
        isUnique(_name, _dna)
    {
        // Huongeza Pizza kwenye safu ya Pizza na kupata kitambulisho (id)
        uint256 id = SafeMath.sub(pizzas.push(Pizza(_name, _dna)), 1);

        // Hukagua kuwa mmiliki wa Pizza ni sawa na mtumiaji wa sasa
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/control-structures.html#error-handling-assert-require-revert-and-exceptions

        // kumbuka kuwa address(0) ni anwani sifuri,
        // ikionyesha kuwa pizza[id] bado haijatengwa kwa mtumiaji fulani.

        assert(pizzaToOwner[id] == address(0));

        // Huweka ramani ya Pizza kwa mmiliki
        pizzaToOwner[id] = msg.sender;
        ownerPizzaCount[msg.sender] = SafeMath.add(
            ownerPizzaCount[msg.sender],
            1
        );
    }

    // Huunda Pizza ya nasibu kutoka kwa mfuatano (jina)
    function createRandomPizza(string memory _name) public {
        uint256 randDna = generateRandomDna(_name, msg.sender);
        _createPizza(_name, randDna);
    }

    // Huzalisha DNA ya nasibu kutoka kwa mfuatano (jina) na anwani ya mmiliki (muundaji)
    function generateRandomDna(string memory _str, address _owner)
        public
        // Vitendaji vilivyowekwa alama kama `pure` vinaahidi kutosoma au kurekebisha hali
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#pure-functions
        pure
        returns (uint256)
    {
        // Huzalisha uint ya nasibu kutoka kwa mfuatano (jina) + anwani (mmiliki)
        uint256 rand = uint256(keccak256(abi.encodePacked(_str))) +
            uint256(_owner);
        rand = rand % dnaModulus;
        return rand;
    }

    // Hurejesha safu ya Pizza zilizopatikana na mmiliki
    function getPizzasByOwner(address _owner)
        public
        // Vitendaji vilivyowekwa alama kama `view` vinaahidi kutorekebisha hali
        // Jifunze zaidi: https://solidity.readthedocs.io/en/v0.5.10/contracts.html#view-functions
        view
        returns (uint256[] memory)
    {
        // Hutumia eneo la hifadhi la `memory` kuhifadhi thamani tu kwa ajili ya
        // mzunguko wa maisha wa wito huu wa kitendaji.
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
        require(_from != address(0) && _to != address(0), "Invalid address.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        require(_from != _to, "Cannot transfer to the same address.");
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");

        ownerPizzaCount[_to] = SafeMath.add(ownerPizzaCount[_to], 1);
        ownerPizzaCount[_from] = SafeMath.sub(ownerPizzaCount[_from], 1);
        pizzaToOwner[_pizzaId] = _to;

        // Hutoa tukio lililofafanuliwa katika mkataba wa IERC721 ulioingizwa
        emit Transfer(_from, _to, _pizzaId);
        _clearApproval(_to, _pizzaId);
    }

    /**
     * Huhamisha kwa usalama umiliki wa kitambulisho cha tokeni kilichopewa kwa anwani nyingine
     * Ikiwa anwani lengwa ni mkataba, lazima itekeleze `onERC721Received`,
     * ambayo inaitwa wakati wa uhamishaji salama, na kurejesha thamani ya kichawi
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * vinginevyo, uhamishaji unarejeshwa nyuma.
    */
    function safeTransferFrom(address from, address to, uint256 pizzaId)
        public
    {
        // solium-disable-next-line arg-overflow
        this.safeTransferFrom(from, to, pizzaId, "");
    }

    /**
     * Huhamisha kwa usalama umiliki wa kitambulisho cha tokeni kilichopewa kwa anwani nyingine
     * Ikiwa anwani lengwa ni mkataba, lazima itekeleze `onERC721Received`,
     * ambayo inaitwa wakati wa uhamishaji salama, na kurejesha thamani ya kichawi
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`;
     * vinginevyo, uhamishaji unarejeshwa nyuma.
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
     * Kitendaji cha ndani cha kuita `onERC721Received` kwenye anwani lengwa
     * Wito hautekelezwi ikiwa anwani lengwa sio mkataba
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
    // Kirekebishaji cha kitendaji cha `external` kinamaanisha kitendaji hiki ni
    // sehemu ya kiolesura cha mkataba na mikataba mingine inaweza kukiita
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

    // Hurejesha idadi ya Pizza kwa anwani
    function balanceOf(address _owner) public view returns (uint256 _balance) {
        return ownerPizzaCount[_owner];
    }

    // Hurejesha mmiliki wa Pizza iliyopatikana kwa kitambulisho (id)
    function ownerOf(uint256 _pizzaId) public view returns (address _owner) {
        address owner = pizzaToOwner[_pizzaId];
        require(owner != address(0), "Invalid Pizza ID.");
        return owner;
    }

    // Huidhinisha anwani nyingine kuhamisha umiliki wa Pizza
    function approve(address _to, uint256 _pizzaId) public {
        require(msg.sender == pizzaToOwner[_pizzaId], "Must be the Pizza owner.");
        pizzaApprovals[_pizzaId] = _to;
        emit Approval(msg.sender, _to, _pizzaId);
    }

    // Hurejesha anwani iliyoidhinishwa kwa Pizza maalum
    function getApproved(uint256 _pizzaId)
        public
        view
        returns (address operator)
    {
        require(_exists(_pizzaId), "Pizza does not exist.");
        return pizzaApprovals[_pizzaId];
    }

    /**
     * Kitendaji cha kibinafsi cha kufuta idhini ya sasa ya kitambulisho cha tokeni kilichopewa
     * Hurejesha nyuma ikiwa anwani iliyopewa sio mmiliki wa tokeni
     */
    function _clearApproval(address owner, uint256 _pizzaId) private {
        require(pizzaToOwner[_pizzaId] == owner, "Must be pizza owner.");
        require(_exists(_pizzaId), "Pizza does not exist.");
        if (pizzaApprovals[_pizzaId] != address(0)) {
            pizzaApprovals[_pizzaId] = address(0);
        }
    }

    /*
     * Huweka au kuondoa idhini ya mhudumu fulani
     * Mhudumu anaruhusiwa kuhamisha tokeni zote za mtumaji kwa niaba yao
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "Cannot approve own address");
        operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    // Hueleza ikiwa mhudumu ameidhinishwa na mmiliki fulani
    function isApprovedForAll(address owner, address operator)
        public
        view
        returns (bool)
    {
        return operatorApprovals[owner][operator];
    }

    // Huchukua umiliki wa Pizza - kwa watumiaji walioidhinishwa pekee
    function takeOwnership(uint256 _pizzaId) public {
        require(_isApprovedOrOwner(msg.sender, _pizzaId), "Address is not approved.");
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
        // Zima ukaguzi wa solium kwa sababu ya
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
        require(result, "Pizza with such name already exists.");
        _;
    }

    // Hurejesha ikiwa anwani lengwa ni mkataba
    function isContract(address account) internal view returns (bool) {
        uint256 size;
        // Kwa sasa hakuna njia bora ya kukagua ikiwa kuna mkataba katika anwani
        // kuliko kukagua ukubwa wa msimbo kwenye anwani hiyo.
        // Tazama https://ethereum.stackexchange.com/a/14016/36603
        // kwa maelezo zaidi kuhusu jinsi hii inavyofanya kazi.
        // TODO Kagua hii tena kabla ya toleo la Serenity, kwa sababu anwani zote zitakuwa
        // mikataba wakati huo.
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            size := extcodesize(account)
        }
        return size > 0;
    }
}
```

## Usomaji zaidi {#further-reading}

Angalia hati za Solidity na Vyper kwa muhtasari kamili zaidi wa mikataba mahiri:

- [Solidity](https://docs.soliditylang.org/)
- [Vyper](https://docs.vyperlang.org/en/stable/)

## Mada zinazohusiana {#related-topics}

- [Mikataba mahiri](/developers/docs/smart-contracts/)
- [Mashine ya Mtandaoni ya Ethereum (EVM)](/developers/docs/evm/)

## Mafunzo yanayohusiana {#related-tutorials}

- [Kupunguza ukubwa wa mikataba ili kupambana na kikomo cha ukubwa wa mkataba](/developers/tutorials/downsizing-contracts-to-fight-the-contract-size-limit/) _– Baadhi ya vidokezo vya vitendo vya kupunguza ukubwa wa mkataba mahiri wako._
- [Kuweka logi ya data kutoka kwa mikataba mahiri na matukio](/developers/tutorials/logging-events-smart-contracts/) _– Utangulizi wa matukio ya mkataba mahiri na jinsi unavyoweza kuyatumia kuweka logi ya data._
- [Kuingiliana na mikataba mingine kutoka Solidity](/developers/tutorials/interact-with-other-contracts-from-solidity/) _– Jinsi ya kusambaza mkataba mahiri kutoka kwa mkataba uliopo na kuingiliana nao._