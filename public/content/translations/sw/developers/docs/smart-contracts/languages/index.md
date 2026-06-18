---
title: Lugha za mikataba mahiri
description: Muhtasari na ulinganisho wa lugha mbili kuu za mikataba mahiri – Solidity na Vyper.
lang: sw
---

Jambo zuri kuhusu [Ethereum](/) ni kwamba mikataba mahiri inaweza kupangwa kwa kutumia lugha ambazo ni rafiki kwa wasanidi programu. Ikiwa una uzoefu na Python au [lugha yoyote ya mabano yaliyopinda](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), unaweza kupata lugha yenye sintaksia unayoifahamu.

Lugha mbili zinazotumika sana na kudumishwa ni:

- Solidity
- Vyper

Remix IDE hutoa mazingira kamili ya usanidi kwa ajili ya kuunda na kujaribu mikataba katika Solidity na Vyper. [Jaribu Remix IDE iliyo kwenye kivinjari](https://remix.ethereum.org) ili kuanza kuandika msimbo.

Wasanidi programu wenye uzoefu zaidi wanaweza pia kutaka kutumia Yul, lugha ya kati kwa ajili ya [Mashine Pepe ya Ethereum (EVM)](/developers/docs/evm/), au Yul+, kiendelezi cha Yul.

Ikiwa una hamu na ungependa kusaidia kujaribu lugha mpya ambazo bado zinatengenezwa kwa kiasi kikubwa unaweza kufanya majaribio na Fe, lugha inayoibuka ya mikataba mahiri ambayo kwa sasa bado iko katika hatua zake za awali.

## Mahitaji ya awali {#prerequisites}

Ujuzi wa awali wa lugha za programu, hasa JavaScript au Python, unaweza kukusaidia kuelewa tofauti katika lugha za mikataba mahiri. Tunapendekeza pia uelewe mikataba mahiri kama dhana kabla ya kuchimba kwa kina katika ulinganisho wa lugha. [Utangulizi wa mikataba mahiri](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Lugha ya kiwango cha juu, inayolenga vitu (object-oriented) kwa ajili ya kutekeleza mikataba mahiri.
- Lugha ya mabano yaliyopinda ambayo imeathiriwa sana na C++.
- Ina aina tuli (statically typed) (aina ya kigezo inajulikana wakati wa kukusanya msimbo).
- Inasaidia:
  - Urithi (unaweza kupanua mikataba mingine).
  - Maktaba (unaweza kuunda msimbo unaoweza kutumika tena ambao unaweza kuuita kutoka kwa mikataba tofauti – kama vile vitendaji tuli katika darasa tuli katika lugha zingine za programu zinazolenga vitu).
  - Aina changamano zilizofafanuliwa na mtumiaji.

### Viungo muhimu {#important-links}

- [Nyaraka](https://docs.soliditylang.org/en/latest/)
- [Tovuti ya Lugha ya Solidity](https://soliditylang.org/)
- [Solidity kwa Mfano](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Chumba cha Maongezi cha Solidity Gitter](https://gitter.im/ethereum/solidity) kilichounganishwa na [Chumba cha Maongezi cha Solidity Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Karatasi ya Kudanganya (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Blogu ya Solidity](https://blog.soliditylang.org/)
- [Twitter ya Solidity](https://twitter.com/solidity_lang)

### Mfano wa mkataba {#example-contract}

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Neno kuu "public" hufanya vigezo
    // vifikike kutoka kwenye mikataba mingine
    address public minter;
    mapping (address => uint) public balances;

    // Matukio huruhusu wateja kuitikia
    // mabadiliko maalum ya mkataba unayotangaza
    event Sent(address from, address to, uint amount);

    // Msimbo wa kiunda huendeshwa tu wakati mkataba
    // unapoundwa
    constructor() {
        minter = msg.sender;
    }

    // Hutuma kiasi cha sarafu zilizoundwa hivi karibuni kwenye anwani
    // Inaweza tu kuitwa na muundaji wa mkataba
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Hutuma kiasi cha sarafu zilizopo
    // kutoka kwa mpigaji yeyote kwenda kwenye anwani
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Insufficient balance.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Mfano huu unapaswa kukupa wazo la jinsi sintaksia ya mkataba wa Solidity ilivyo. Kwa maelezo ya kina zaidi ya vitendaji na vigezo, [tazama nyaraka](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Lugha ya programu inayofanana na Python
- Uwekaji aina thabiti (Strong typing)
- Msimbo mdogo na unaoeleweka wa kikusanyaji (compiler)
- Uzalishaji mzuri wa msimbo wa baiti
- Kwa makusudi ina vipengele vichache kuliko Solidity kwa lengo la kufanya mikataba kuwa salama zaidi na rahisi kukagua. Vyper haisaidii:
  - Virekebishaji (Modifiers)
  - Urithi (Inheritance)
  - Mkusanyiko wa ndani (Inline assembly)
  - Upakiaji kupita kiasi wa vitendaji (Function overloading)
  - Upakiaji kupita kiasi wa waendeshaji (Operator overloading)
  - Wito wa kujirudia (Recursive calling)
  - Vitanzi vya urefu usio na kikomo (Infinite-length loops)
  - Nambari zisizobadilika za mfumo wa jozi (Binary fixed points)

Kwa maelezo zaidi, [soma mantiki ya Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Viungo muhimu {#important-links-1}

- [Nyaraka](https://vyper.readthedocs.io)
- [Vyper kwa Mfano](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Mifano Zaidi ya Vyper](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Soga ya Discord ya jamii ya Vyper](https://discord.gg/SdvKC79cJk)
- [Karatasi ya Kudanganya (Cheat Sheet)](https://reference.auditless.com/cheatsheet)
- [Mifumo na zana za usanidi wa mikataba mahiri kwa ajili ya Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - jifunze kulinda na kudukua mikataba mahiri ya Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Kitovu cha Vyper kwa ajili ya usanidi](https://github.com/zcor/vyper-dev)
- [Mifano bora zaidi ya mikataba mahiri ya Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Rasilimali zilizoratibiwa za Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Mfano {#example}

```python
# Mnada Wazi

# Vigezo vya mnada
# Mnufaika hupokea pesa kutoka kwa mzabuni wa juu zaidi
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Hali ya sasa ya mnada
highestBidder: public(address)
highestBid: public(uint256)

# Imewekwa kuwa kweli mwishoni, hairuhusu mabadiliko yoyote
ended: public(bool)

# Fuatilia zabuni zilizorejeshwa ili tuweze kufuata muundo wa kutoa
pendingReturns: public(HashMap[address, uint256])

# Unda mnada rahisi na `_bidding_time`
# sekunde za muda wa zabuni kwa niaba ya
# anwani ya mnufaika `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Weka zabuni kwenye mnada na thamani iliyotumwa
# pamoja na muamala huu.
# Thamani itarejeshwa tu ikiwa
# mnada haujashindwa.
@external
@payable
def bid():
    # Angalia ikiwa kipindi cha zabuni kimeisha.
    assert block.timestamp < self.auctionEnd
    # Angalia ikiwa zabuni iko juu vya kutosha
    assert msg.value > self.highestBid
    # Fuatilia urejeshaji kwa mzabuni wa juu wa awali
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Fuatilia zabuni mpya ya juu
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Toa zabuni iliyorejeshwa hapo awali. Muundo wa kutoa
# unatumika hapa kuepuka suala la usalama. Ikiwa marejesho yangekuwa moja kwa moja
# yametumwa kama sehemu ya bid(), mkataba mbaya wa zabuni ungeweza kuzuia
# marejesho hayo na hivyo kuzuia zabuni mpya za juu kuingia.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Maliza mnada na utume zabuni ya juu zaidi
# kwa mnufaika.
@external
def endAuction():
    # Ni mwongozo mzuri kupanga kazi zinazoingiliana
    # na mikataba mingine (yaani, zinaita kazi au kutuma ether)
    # katika awamu tatu:
    # 1. kuangalia masharti
    # 2. kufanya vitendo (kunaweza kubadilisha masharti)
    # 3. kuingiliana na mikataba mingine
    # Ikiwa awamu hizi zitachanganywa, mkataba mwingine unaweza kuita
    # kurudi kwenye mkataba wa sasa na kurekebisha hali au kusababisha
    # athari (malipo ya ether) kufanywa mara nyingi.
    # Ikiwa kazi zinazoitwa kwa ndani zinajumuisha mwingiliano na
    # mikataba ya nje, lazima pia zizingatiwe kama mwingiliano na
    # mikataba ya nje.

    # 1. Masharti
    # Angalia ikiwa muda wa mwisho wa mnada umefika
    assert block.timestamp >= self.auctionEnd
    # Angalia ikiwa kazi hii tayari imeitwa
    assert not self.ended

    # 2. Athari
    self.ended = True

    # 3. Mwingiliano
    send(self.beneficiary, self.highestBid)
```

Mfano huu unapaswa kukupa wazo la jinsi sintaksia ya mkataba wa Vyper ilivyo. Kwa maelezo ya kina zaidi ya vitendaji na vigezo, [tazama nyaraka](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul na Yul+ {#yul}

Ikiwa wewe ni mgeni kwenye Ethereum na bado hujaandika msimbo wowote kwa kutumia lugha za mikataba mahiri, tunapendekeza uanze na Solidity au Vyper. Angalia tu Yul au Yul+ mara tu unapofahamu mbinu bora za usalama wa mikataba mahiri na maelezo mahususi ya kufanya kazi na EVM.

**Yul**

- Lugha ya kati kwa ajili ya Ethereum.
- Inasaidia [EVM](/developers/docs/evm) na [Ewasm](https://github.com/ewasm), WebAssembly yenye ladha ya Ethereum, na imeundwa kuwa kigawanyo cha kawaida kinachoweza kutumika kwa majukwaa yote mawili.
- Lengo zuri kwa hatua za uboreshaji wa kiwango cha juu ambazo zinaweza kunufaisha majukwaa ya EVM na Ewasm kwa usawa.

**Yul+**

- Kiendelezi cha kiwango cha chini, chenye ufanisi mkubwa kwa Yul.
- Hapo awali kiliundwa kwa ajili ya mkataba wa [rollup ya optimistic](/developers/docs/scaling/optimistic-rollups/).
- Yul+ inaweza kutazamwa kama pendekezo la uboreshaji wa majaribio kwa Yul, na kuongeza vipengele vipya kwake.

### Viungo muhimu {#important-links-2}

- [Nyaraka za Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Nyaraka za Yul+](https://github.com/fuellabs/yulp)
- [Chapisho la Utangulizi la Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Mfano wa mkataba {#example-contract-2}

Mfano rahisi ufuatao unatekeleza kitendaji cha nguvu (power function). Inaweza kukusanywa kwa kutumia `solc --strict-assembly --bin input.yul`. Mfano unapaswa
kuhifadhiwa katika faili la input.yul.

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

Ikiwa tayari una uzoefu mzuri na mikataba mahiri, utekelezaji kamili wa ERC-20 katika Yul unaweza kupatikana [hapa](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Lugha yenye aina tuli (statically typed) kwa ajili ya Mashine Pepe ya Ethereum (EVM).
- Imehamasishwa na Python na Rust.
- Inalenga kuwa rahisi kujifunza -- hata kwa wasanidi programu ambao ni wageni kwenye mfumo wa ikolojia wa Ethereum.
- Usanidi wa Fe bado uko katika hatua zake za awali, lugha ilikuwa na toleo lake la alpha mnamo Januari 2021.

### Viungo muhimu {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Tangazo la Fe](https://blog.fe-lang.org/posts/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Ramani ya Njia ya Fe ya 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Soga ya Discord ya Fe](https://discord.com/invite/ywpkAXFjZH)
- [Twitter ya Fe](https://twitter.com/official_fe)

### Mfano wa mkataba {#example-contract-3}

Ufuatao ni mkataba rahisi uliotekelezwa katika Fe.

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

## Jinsi ya kuchagua {#how-to-choose}

Kama ilivyo kwa lugha nyingine yoyote ya programu, mara nyingi inahusu kuchagua zana sahihi kwa kazi sahihi pamoja na mapendeleo ya kibinafsi.

Hapa kuna mambo machache ya kuzingatia ikiwa bado hujajaribu lugha yoyote:

### Nini kizuri kuhusu Solidity? {#solidity-advantages}

- Ikiwa wewe ni mwanzilishi, kuna mafunzo na zana nyingi za kujifunzia huko nje. Tazama zaidi kuhusu hilo katika sehemu ya [Jifunze kwa Kuandika Msimbo](/developers/learning-tools/).
- Zana nzuri za wasanidi programu zinapatikana.
- Solidity ina jamii kubwa ya wasanidi programu, ambayo inamaanisha kuna uwezekano mkubwa wa kupata majibu ya maswali yako haraka sana.

### Nini kizuri kuhusu Vyper? {#vyper-advatages}

- Njia nzuri ya kuanza kwa wasanidi programu wa Python wanaotaka kuandika mikataba mahiri.
- Vyper ina idadi ndogo ya vipengele ambayo inafanya iwe nzuri kwa uundaji wa haraka wa mifano ya mawazo.
- Vyper inalenga kuwa rahisi kukagua na kusomeka kwa urahisi na binadamu.

### Nini kizuri kuhusu Yul na Yul+? {#yul-advantages}

- Lugha rahisi na inayofanya kazi ya kiwango cha chini.
- Inaruhusu kukaribia zaidi EVM ghafi, ambayo inaweza kusaidia kuboresha matumizi ya gesi ya mikataba yako.

## Ulinganisho wa lugha {#language-comparisons}

Kwa ulinganisho wa sintaksia ya msingi, mzunguko wa maisha wa mkataba, miingiliano, waendeshaji, miundo ya data, vitendaji, mtiririko wa udhibiti, na zaidi angalia [karatasi hii ya kudanganya (cheatsheet) na Auditless](https://reference.auditless.com/cheatsheet/)

## Usomaji zaidi {#further-reading}

- [Maktaba ya Mikataba ya Solidity na OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity kwa Mfano](https://solidity-by-example.org)