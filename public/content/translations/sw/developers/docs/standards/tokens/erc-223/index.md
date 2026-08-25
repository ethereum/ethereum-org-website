---
title: Kiwango cha Tokeni cha ERC-223
description: Muhtasari wa kiwango cha tokeni zinazoweza kubadilishwa cha ERC-223, jinsi kinavyofanya kazi, na ulinganisho na ERC-20.
lang: sw
---

## Utangulizi {#introduction}

### ERC-223 ni nini? {#what-is-erc223}

ERC-223 ni kiwango cha tokeni zinazoweza kubadilishwa, sawa na kiwango cha ERC-20. Tofauti kuu ni kwamba ERC-223 haifafanui tu API ya tokeni bali pia mantiki ya kuhamisha tokeni kutoka kwa mtumaji kwenda kwa mpokeaji. Inaleta muundo wa mawasiliano unaoruhusu mahamisho ya tokeni kushughulikiwa upande wa mpokeaji.

### Tofauti na ERC-20 {#erc20-differences}

ERC-223 inashughulikia baadhi ya mapungufu ya ERC-20 na inaleta mbinu mpya ya mwingiliano kati ya mkataba wa tokeni na mkataba unaoweza kupokea tokeni. Kuna mambo machache yanayowezekana kwa ERC-223 lakini si kwa ERC-20:

- Ushughulikiaji wa hamisho la tokeni upande wa mpokeaji: Wapokeaji wanaweza kutambua kwamba tokeni ya ERC-223 inawekwa.
- Kukataliwa kwa tokeni zilizotumwa isivyo sahihi: Ikiwa mtumiaji atatuma tokeni za ERC-223 kwenye mkataba ambao haupaswi kupokea tokeni, mkataba unaweza kukataa muamala, na kuzuia upotevu wa tokeni.
- Data fafanuzi katika mahamisho: Tokeni za ERC-223 zinaweza kujumuisha data fafanuzi, na kuruhusu taarifa yoyote kuambatishwa kwenye miamala ya tokeni.

## Masharti ya Awali {#prerequisites}

- [Akaunti](/developers/docs/accounts)
- [Mikataba Mahiri](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Kiini {#body}

ERC-223 ni kiwango cha tokeni kinachotekeleza API kwa ajili ya tokeni ndani ya mikataba mahiri. Pia inatangaza API kwa ajili ya mikataba inayopaswa kupokea tokeni za ERC-223. Mikataba isiyoauni API ya Mpokeaji wa ERC-223 haiwezi kupokea tokeni za ERC-223, hivyo kuzuia makosa ya mtumiaji.

Ikiwa mkataba mahiri unatekeleza mbinu na matukio yafuatayo unaweza kuitwa mkataba wa tokeni unaotangamana na ERC-223. Baada ya kusambazwa, utawajibika kufuatilia tokeni zilizoundwa kwenye Ethereum.

Mkataba haulazimiki kuwa na vipengele hivi pekee na msanidi anaweza kuongeza kipengele kingine chochote kutoka kwenye viwango tofauti vya tokeni kwenye mkataba huu. Kwa mfano, vipengele vya `approve` na `transferFrom` si sehemu ya kiwango cha ERC-223 lakini vipengele hivi vinaweza kutekelezwa ikiwa itahitajika.

Kutoka kwenye [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Mbinu {#methods}

Tokeni ya ERC-223 lazima itekeleze mbinu zifuatazo:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Mkataba unaopaswa kupokea tokeni za ERC-223 lazima utekeleze mbinu ifuatayo:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Ikiwa tokeni za ERC-223 zitatumwa kwenye mkataba ambao hautekelezi kipengele cha `tokenReceived(..)` basi hamisho lazima lifeli na tokeni hazipaswi kuhamishwa kutoka kwenye salio la mtumaji.

### Matukio {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Mifano {#examples}

API ya tokeni ya ERC-223 inafanana na ile ya ERC-20, kwa hivyo kwa mtazamo wa uundaji wa UI hakuna tofauti. Kitu pekee kilicho tofauti hapa ni kwamba tokeni za ERC-223 huenda zisiwe na vipengele vya `approve` + `transferFrom` kwa kuwa hivi ni vya hiari kwa kiwango hiki.

#### Mifano ya Solidity {#solidity-example}

Mfano ufuatao unaonyesha jinsi mkataba wa msingi wa tokeni ya ERC-223 unavyofanya kazi:

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

Sasa tunataka mkataba mwingine ukubali amana za `tokenA` tukichukulia kwamba tokenA ni tokeni ya ERC-223. Mkataba lazima ukubali tokenA pekee na kukataa tokeni nyingine zozote. Mkataba unapopokea tokenA lazima utoe tukio la `Deposit()` na kuongeza thamani ya kigezo cha ndani cha `deposits`.

Hapa kuna msimbo:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Tokeni pekee ambayo tunataka kukubali.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Ni muhimu kuelewa kwamba ndani ya kazi hii
        // msg.sender ni anwani ya tokeni inayopokelewa,
        // msg.value  kila wakati ni 0 kwa kuwa mkataba wa tokeni haumiliki au kutuma Etha katika hali nyingi,
        // _from      ni mtumaji wa hamisho la tokeni,
        // _value     ni kiasi cha tokeni zilizowekwa.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Maswali yanayoulizwa mara kwa mara {#faq}

### Nini kitatokea ikiwa tutatuma baadhi ya tokenB kwenye mkataba? {#sending-tokens}

Muamala utafeli, na hamisho la tokeni halitafanyika. Tokeni zitarudishwa kwenye anwani ya mtumaji.

### Tunawezaje kuweka amana kwenye mkataba huu? {#contract-deposits}

Ita kipengele cha `transfer(address,uint256)` au `transfer(address,uint256,bytes)` cha tokeni ya ERC-223, ukibainisha anwani ya `RecipientContract`.

### Nini kitatokea ikiwa tutahamisha tokeni ya ERC-20 kwenye mkataba huu? {#erc-20-transfers}

Ikiwa tokeni ya ERC-20 itatumwa kwenye `RecipientContract`, tokeni zitahamishwa, lakini hamisho halitatambuliwa (hakuna tukio la `Deposit()` litakalotolewa, na thamani ya amana haitabadilika). Amana za ERC-20 zisizohitajika haziwezi kuchujwa au kuzuiwa.

### Vipi ikiwa tunataka kutekeleza kipengele fulani baada ya amana ya tokeni kukamilika? {#function-execution}

Kuna njia nyingi za kufanya hivyo. Katika mfano huu tutafuata mbinu inayofanya mahamisho ya ERC-223 yafanane na mahamisho ya Etha:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Tokeni pekee ambayo tunataka kukubali.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Shughulikia muamala unaoingia na kutekeleza wito wa kazi unaofuata.
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

Wakati `RecipientContract` itakapopokea tokeni ya ERC-223 mkataba utatekeleza kipengele kilichosimbwa kama kigezo cha `_data` cha muamala wa tokeni, sawa na jinsi miamala ya Etha inavyosimba miito ya vipengele kama `data` ya muamala. Soma [sehemu ya data](/developers/docs/transactions/#the-data-field) kwa taarifa zaidi.

Katika mfano ulio hapo juu tokeni ya ERC-223 lazima ihamishwe kwenye anwani ya `RecipientContract` kwa kutumia kipengele cha `transfer(address,uin256,bytes calldata _data)`. Ikiwa kigezo cha data kitakuwa `0xc2985578` (sahihi ya kipengele cha `foo()`) basi kipengele cha foo() kitaanzishwa baada ya amana ya tokeni kupokelewa na tukio la Foo() litatolewa.

Vigezo vinaweza kusimbwa katika `data` ya hamisho la tokeni pia, kwa mfano tunaweza kuita kipengele cha bar() kikiwa na thamani ya 12345 kwa ajili ya `_someNumber`. Katika hali hii `data` lazima iwe `0x0423a13200000000000000000000000000000000000000000000000000000000000004d2` ambapo `0x0423a132` ni sahihi ya kipengele cha `bar(uint256)` na `00000000000000000000000000000000000000000000000000000000000004d2` ni 12345 kama uint256.

## Mapungufu {#limitations}

Ingawa ERC-223 inashughulikia masuala kadhaa yanayopatikana katika kiwango cha ERC-20, haina budi kuwa na mapungufu yake yenyewe:

- Uidhinishaji na Utangamano: ERC-223 bado haijaidhinishwa kwa upana, jambo ambalo linaweza kuzuia utangamano wake na zana na majukwaa yaliyopo.
- Utangamano wa Nyuma: ERC-223 haitangamani nyuma na ERC-20, ikimaanisha kwamba mikataba na zana zilizopo za ERC-20 hazitafanya kazi na tokeni za ERC-223 bila marekebisho.
- Gharama za Gesi: Ukaguzi na utendaji wa ziada katika mahamisho ya ERC-223 unaweza kusababisha gharama kubwa zaidi za gesi ikilinganishwa na miamala ya ERC-20.

## Usomaji zaidi {#further-reading}

- [EIP-223: Kiwango cha Tokeni cha ERC-223](https://eips.ethereum.org/EIPS/eip-223)
- [Pendekezo la awali la ERC-223](https://github.com/ethereum/eips/issues/223)