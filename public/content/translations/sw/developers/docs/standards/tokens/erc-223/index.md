---
title: ERC-223 ishara kiwango
description: Maelezo ya jumla ya ERC-223 badilishwa ishara ya kiwango, jinsi kufanya kazi, na linganisha na ERC-20.
lang: sw
---

## Utangulizi {#introduction}

### ERC-223 ni nini? {#what-is-erc223}

ERC-223 ni kiwango kwa ishara badilisha, sawa na kiwango ERC-20. Tofauti kuu ni kwamba ERC-223 hufafanua si tu ishara API lakini pia hoja kwa ajili ya kuhamisha ishara kutoka wa tuma kwa mpokeaji. Anzisha mfano wa mawasiliano ambayo kuruhusu uhamisho wa ishara shughulika kwa upande wa mpokeaji.

### Tofauti kutoka ERC-20 {#erc20-differences}

ERC-223 shughulika baadhi ya mapungufu ya ERC-20 na kuanzisha njia mpya ya mwingiliano kati ya mkataba ishara na mkataba ambayo inaweza kupokea ishara. Kuna jambo machache ambayo inawezekana na ERC-223 lakini si na ERC-20:

- Usimamizi wa uhamisho wa ishara kwa upande wa mpokeaji: Wapokeaji wanaweza kugundua kuwa ishara ya ERC-223 imewekwa.
- Kukataliwa kwa ishara vibaya walio tuma: Ikiwa mtumiaji tuma ishara za ERC-223 kwa mkataba ambao hakuna kupokea ishara, mkataba unaweza kukataa shughuli hiyo, kuzuia kupoteza wa ishara.
- Metadata katika uhamisho: ERC-223 ishara inaweza ni pamoja na metadata, kuruhusu taarifa arbitrary kuwa masharti ya ishara shughuli.

## Mahitaji ya awali {#prerequisites}

- Hifadhi ya fedha (/developers/docs/accounts)
- [Mkataba erevu](/developers/docs/smart-contracts/)
- [Viwango vya tokeni](/developers/docs/standards/tokens/)
- [ERC-20](/developers/docs/standards/tokens/erc-20/)

## Mwili {#body}

ERC-223 ni ishara ya kiwango ambacho kutekeleza API kwa ishara ndani ya mikataba erevu. Pia kutangaza API kwa ajili ya mikataba ambayo kuhitaji kupokea ERC-223 ishara. Mikataba ambayo haina msaada ERC-223 mpokeaji API haiwezi kupokea ERC-223 ishara, kuzuia makosa ya mtumiaji.

Kama mkataba erevu kutekeleza mbinu kufuatia na matukio inaweza kuitwa ERC-223 sambamba ishara mkataba. Mara kupelekwa, ni
itakuwa na jukumu la kufuatilia ishara iliyoundwa kwenye Ethereum.

Mkataba si wajibu wa kuwa na kazi hizi tu na muumba unaweza kuongeza kipengele kingine chochote kutoka viwango vya ishara tofauti na mkataba huu. Kwa mfano, `kubali ` na `kuhamisha Kutoka ` kazi si sehemu ya kiwango ERC-223 lakini kazi hizi inaweza kutekelezwa kama ni lazima.

Kutoka [EIP-223](https://eips.ethereum.org/EIPS/eip-223):

### Mbinu {#methods}

ERC-223 ishara lazima kutekeleza mbinu kufuatia:

```solidity
function name() public view returns (string)
function symbol() public view returns (string)
function decimals() public view returns (uint8)
function totalSupply() public view returns (uint256)
function balanceOf(address _owner) public view returns (uint256 balance)
function transfer(address _to, uint256 _value) public returns (bool success)
function transfer(address _to, uint256 _value, bytes calldata _data) public returns (bool success)
```

Mkataba ambayo inadhaniwa kupokea ERC-223 ishara lazima kutekeleza mbinu kufuatia:

```solidity
function tokenReceived(address _from, uint _value, bytes calldata _data)
```

Kama ERC-223 ishara ni alimtuma kwa mkataba kwamba haina kutekeleza `ishara pokewa(..) ` kazi basi uhamisho lazima kushindwa na ishara lazima si kuhamisha kutoka usawa wa alio tuma.

### Matukio {#events}

```solidity
event Transfer(address indexed _from, address indexed _to, uint256 _value, bytes calldata _data)
```

### Mfano {#examples}

API ya ERC-223 ishara ni sawa na ile ya ERC-20, hivyo kutoka UI maendeleo mtazamo hakuna tofauti. Tofauti pekee hapa ni kwamba ERC-223 ishara haiwezi kuwa na 'kubali' + 'uhamisho kutoka' kazi kama haya ni hiari kwa ajili ya kiwango hiki.

#### Mifano ya Solidity {#solidity-example}

Mfano ufuatao unaonyesha jinsi ya msingi ERC-223 ishara mkataba kazi:

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

Sasa tunataka mkataba mwingine kukubali amana ya ishara ya A kwa kudhani kwamba ishara ya A ni ishara ya ERC-223. Mkataba lazima kukubali tu ishara A na kukataa ishara nyingine yoyote. Wakati mkataba anapata ishara A ni lazima kutoa tukio la 'amana()' na kuongeza thamani ya ndani 'amana' kutofautiana.

Hapa ni nambari:

```solidity
contract RecipientContract is IERC223Recipient {
    event Deposit(address whoSentTheTokens);
    uint256 deposits = 0;
    address tokenA; // Tokeni pekee tunayotaka kukubali.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        // Ni muhimu kuelewa kwamba ndani ya utendakazi huu
        // msg.sender ni anwani ya tokeni inayopokewa,
        // msg.value daima ni 0 kwa vile mkataba wa tokeni haumiliki wala kutuma ether katika hali nyingi,
        // _from ni mtumaji wa uhamishaji wa tokeni,
        // _value ni kiasi cha tokeni kilichowekwa.
        require(msg.sender == tokenA);
        deposits += _value;
        emit Deposit(_from);
    }
}
```

## Maswali yanayoulizwa mara kwa mara {#faq}

### Nini kutokea kama sisi tuma baadhi ya ishara B kwa mkataba? {#sending-tokens}

Mkataba utashindwa, na uhamisho wa ishara hakuna kutokea. Ishara kurudi kwenye anwani ya aliye tuma.

### Tunaweza aje kuweka amana kwa mkataba huu? {#contract-deposits}

Wito `uhamisho (anwani,uint256) ` au `uhamisho (anwani,uint256,bytes) ` kazi ya ERC-223 ishara, kutaja anwani ya `Mpokeaji Mkataba`.

### Nini kutokea kama sisi kuhamisha ERC-20 ishara ya mkataba huu? {#erc-20-transfers}

Kama ishara ERC-20 ni alimtuma kwa `Mpokeaji mkataba`, ishara itakuwa na uhamisho, lakini uhamisho itakuwa si kujulikana (hakuna `amana() ` tukio itakuwa ya kutolewa, na amana thamani hakuna badiliko). Hakuna kwenye ERC-20 amana haiwezi kuchuja au kuzuia.

### Nini kama tunataka kutekeleza baadhi ya kazi baada ya amana ishara ni kukamilika? {#function-execution}

Kuna njia nyingi za kufanya hivyo. Katika mfano huu kufuata njia ambayo kufanya ERC-223 uhamisho sawa na uhamisho Ether:

```solidity
contract RecipientContract is IERC223Recipient {
    event Foo();
    event Bar(uint256 someNumber);
    address tokenA; // Tokeni pekee tunayotaka kukubali.
    function tokenReceived(address _from, uint _value, bytes memory _data) public override
    {
        require(msg.sender == tokenA);
        address(this).call(_data); // Shikilia muamala unaoingia na ufanye wito wa utendakazi unaofuata.
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

Wakati `Mpokeaji Mkataba` atapokea ERC-223 ishara ya mkataba elekez kazi mwandiko wa fumbo kama `_takwimu`kigezo ya shughuli ishara, sawa na jinsi shughuli Ether kanuni wito kazi kama shughuli `takwimu`. Soma [sehemu ya data](/developers/docs/transactions/#the-data-field) kwa habari zaidi.

Katika mfano hapo juu ERC-223 ishara lazima uhamisho kwa anwani ya `Mpokeaji Mkataba` na `uhamisho(anwani,uin256,bytes wito takwimu _takwimu) ` kazi. Kama takwimu kigezo itakuwa `0xc2985578` (saini ya `foo() ` kazi) basi kazi foo() itaitwa baada ya amana ishara ni kupokea na tukio Foo() itakuwa kuacha.

Vigezo inaweza mwandiko wa fumbo katika `takwimu ` ya uhamisho ishara kama, kwa mfano tunaweza wito bar () kazi na 12345 thamani kwa `_baadhi Idadi `. Katika kesi hii `takwimu` lazima
`0x0423a13200000000000000000000000000000000000000000000000000000000000004d2' ambapo '0x0423a132` ni saini ya kazi ya `bar(uint256) ` na `00000000000000000000000000000000000000000000000000000000000004d2` ni 12345 kama uint256.

## Vizuizi {#limitations}

Wakati ERC-223 kushughulikia suala kadhaa kupatikana katika kiwango ERC-20, ni si bila mapungufu yake mwenyewe:

- Kupitishwa na tangamano: ERC-223 bado haijatumiwa sana, ambayo inaweza kupunguza tangamano wao na zana na majukwaa yaliyomo.
- Nyuma tangamano: ERC-223 si nyuma sambamba na ERC-20, maana yake ni kwamba kuwa ERC-20 mikataba na zana si kazi na ERC-223 ishara bila marekebisho.
- Gharama za gesi: ukaguzi wa ziada na utendaji katika uhamisho wa ERC-223 unaweza kusababisha gharama za juu za gesi ikilinganishwa na shughuli za ERC-20.

## Masomo zaidi {#further-reading}

- [EIP-223: ERC-223 ishara kiwango](https://eips.ethereum.org/EIPS/eip-223)
- [Pendekezo la awali ERC-223](https://github.com/ethereum/eips/issues/223)
