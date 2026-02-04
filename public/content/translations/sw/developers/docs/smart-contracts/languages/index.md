---
title: Lugha za mikataba mahiri
description: "Muhtasari na ulinganisho wa lugha mbili kuu za mikataba-erevu – Solidity na Vyper."
lang: sw
---

Kipengele kikuu kuhusu Ethereum ni kwamba mikataba-erevu inaweza kupangwa kwa kutumia lugha ambazo ni rahisi kwa wasanidi programu. Ikiwa una uzoefu na Python au [lugha yoyote ya mabano](https://wikipedia.org/wiki/List_of_programming_languages_by_type#Curly-bracket_languages), unaweza kupata lugha yenye sintaksia unayoifahamu.

Lugha mbili zinazotumika zaidi na kudumishwa ni:

- Uimara
- Vyper

Remix IDE hutoa mazingira kamili ya uendelezaji kwa ajili ya kuunda na kujaribu mikataba katika Solidity na Vyper. [Jaribu Remix IDE ya kwenye kivinjari](https://remix.ethereum.org) ili kuanza kuandika msimbo.

Wasanidi programu wenye uzoefu zaidi wanaweza pia kutaka kutumia Yul, lugha ya kati ya [Mashine ya mtandaoni ya Ethereum](/developers/docs/evm/), au Yul+, kiendelezi cha Yul.

Ikiwa una hamu ya kujua na unapenda kusaidia kujaribu lugha mpya ambazo bado zinatengenezwa sana, unaweza kujaribu Fe, lugha mpya ya mkataba-erevu ambayo bado iko katika hatua za mwanzo.

## Mahitaji ya awali {#prerequisites}

Ujuzi wa awali wa lugha za programu, hasa JavaScript au Python, unaweza kukusaidia kuelewa tofauti katika lugha za mkataba-erevu. Pia tunapendekeza uelewe mikataba-erevu kama dhana kabla ya kuzama sana katika ulinganisho wa lugha. [Utangulizi wa mikataba-erevu](/developers/docs/smart-contracts/).

## Solidity {#solidity}

- Lugha ya kiwango cha juu, inayolenga vitu kwa ajili ya kutekeleza mikataba-erevu.
- Lugha ya mabano ambayo imeathiriwa pakubwa na C++.
- Aina tuli (aina ya kigezo hujulikana wakati wa kuandaliwa).
- Inasaidia:
  - Urithi (unaweza kupanua mikataba mingine).
  - Maktaba (unaweza kuunda msimbo unaoweza kutumika tena ambao unaweza kuuita kutoka kwa mikataba tofauti - kama vile vitendaji tuli katika darasa tuli katika lugha zingine za programu zinazolenga vitu).
  - Aina changamano zilizofafanuliwa na mtumiaji.

### Viungo muhimu {#important-links}

- [Nyaraka](https://docs.soliditylang.org/en/latest/)
- [Tovuti ya Lugha ya Solidity](https://soliditylang.org/)
- [Solidity kwa Mfano](https://docs.soliditylang.org/en/latest/solidity-by-example.html)
- [GitHub](https://github.com/ethereum/solidity/)
- [Chumba cha Gumzo cha Solidity Gitter](https://gitter.im/ethereum/solidity) kimeunganishwa na [Chumba cha Gumzo cha Solidity Matrix](https://matrix.to/#/#ethereum_solidity:gitter.im)
- [Karatasi ya Kudokezea](https://reference.auditless.com/cheatsheet)
- [Blogu ya Solidity](https://blog.soliditylang.org/)
- [Twitter ya Solidity](https://twitter.com/solidity_lang)

### Mfano wa mkataba {#example-contract}

```solidity
// SPDX-Kitambulisho-Leseni: GPL-3.0
pragma solidity >= 0.7.0;

contract Coin {
    // Neno kuu "public" hufanya vigezo
    // kupatikana kutoka kwa mikataba mingine
    address public minter;
    mapping (address => uint) public balances;

    // Matukio huruhusu wateja kujibu mabadiliko maalum
    // ya mkataba unaotangaza
    event Sent(address from, address to, uint amount);

    // Msimbo wa kiunda huendeshwa tu wakati mkataba
    // unapoundwa
    constructor() {
        minter = msg.sender;
    }

    // Hutuma kiasi cha sarafu mpya zilizoundwa kwa anwani
    // Inaweza kuitwa tu na muundaji wa mkataba
    function mint(address receiver, uint amount) public {
        require(msg.sender == minter);
        require(amount < 1e60);
        balances[receiver] += amount;
    }

    // Hutuma kiasi cha sarafu zilizopo
    // kutoka kwa mpigaji simu yeyote hadi anwani
    function send(address receiver, uint amount) public {
        require(amount <= balances[msg.sender], "Salio halitoshi.");
        balances[msg.sender] -= amount;
        balances[receiver] += amount;
        emit Sent(msg.sender, receiver, amount);
    }
}
```

Mfano huu unapaswa kukupa hisia ya jinsi sintaksia ya mkataba wa Solidity ilivyo. Kwa maelezo ya kina zaidi ya vitendaji na vigezo, [angalia nyaraka](https://docs.soliditylang.org/en/latest/contracts.html).

## Vyper {#vyper}

- Lugha ya programu ya Pythonic
- Uchapaji imara
- Msimbo mdogo na unaoeleweka wa mkusanyaji
- Uundaji bora wa bytecode
- Kwa makusudi ina vipengele vichache kuliko Solidity kwa lengo la kufanya mikataba iwe salama zaidi na rahisi kukagua. Vyper haiungi mkono:
  - Virekebishaji
  - Urithi
  - Mkusanyiko wa ndani
  - Upakiaji mwingi wa kitendaji
  - Upakiaji mwingi wa kiendeshaji
  - Wito unaojirudia
  - Mizunguko ya urefu usio na kikomo
  - Nukta zisizobadilika za mfumo wa namba mbili

Kwa maelezo zaidi, [soma mantiki ya Vyper](https://vyper.readthedocs.io/en/latest/index.html).

### Viungo muhimu {#important-links-1}

- [Nyaraka](https://vyper.readthedocs.io)
- [Vyper kwa Mfano](https://vyper.readthedocs.io/en/latest/vyper-by-example.html)
- [Vyper Zaidi kwa Mfano](https://vyper-by-example.org/)
- [GitHub](https://github.com/vyperlang/vyper)
- [Gumzo la jumuiya ya Vyper Discord](https://discord.gg/SdvKC79cJk)
- [Karatasi ya Kudokezea](https://reference.auditless.com/cheatsheet)
- [Mifumo na zana za ukuzaji wa mkataba-erevu kwa Vyper](/developers/docs/programming-languages/python/)
- [VyperPunk - jifunze kulinda na kudukua mikataba-erevu ya Vyper](https://github.com/SupremacyTeam/VyperPunk)
- [Kitovu cha Vyper kwa ajili ya maendeleo](https://github.com/zcor/vyper-dev)
- [Mifano bora zaidi ya mikataba-erevu ya Vyper](https://github.com/pynchmeister/vyper-greatest-hits/tree/main/contracts)
- [Rasilimali zilizoratibiwa za Awesome Vyper](https://github.com/spadebuilders/awesome-vyper)

### Mfano {#example}

```python
# Mnada Wazi

# Vigezo vya mnada
# Mpokeaji hupokea pesa kutoka kwa mzabuni wa juu zaidi
beneficiary: public(address)
auctionStart: public(uint256)
auctionEnd: public(uint256)

# Hali ya sasa ya mnada
highestBidder: public(address)
highestBid: public(uint256)

# Imewekwa kuwa kweli mwishoni, inazuia mabadiliko yoyote
ended: public(bool)

# Fuatilia zabuni zilizorejeshwa ili tuweze kufuata mtindo wa kutoa pesa
pendingReturns: public(HashMap[address, uint256])

# Unda mnada rahisi na `_bidding_time`
# muda wa sekunde za zabuni kwa niaba ya
# anwani ya mpokeaji `_beneficiary`.
@external
def __init__(_beneficiary: address, _bidding_time: uint256):
    self.beneficiary = _beneficiary
    self.auctionStart = block.timestamp
    self.auctionEnd = self.auctionStart + _bidding_time

# Zabuni kwenye mnada na thamani iliyotumwa
# pamoja na muamala huu.
# Thamani itarejeshwa tu ikiwa
# mnada haujashindwa.
@external
@payable
def bid():
    # Angalia kama muda wa zabuni umeisha.
    assert block.timestamp < self.auctionEnd
    # Angalia kama zabuni ni ya juu vya kutosha
    assert msg.value > self.highestBid
    # Fuatilia urejeshaji wa pesa kwa mzabuni wa awali wa juu
    self.pendingReturns[self.highestBidder] += self.highestBid
    # Fuatilia zabuni mpya ya juu
    self.highestBidder = msg.sender
    self.highestBid = msg.value

# Toa zabuni iliyorejeshwa hapo awali. Mtindo wa kutoa pesa ni
# hutumika hapa kuepuka suala la usalama. Kama urejeshaji fedha ungekuwa moja kwa moja
# zilizotumwa kama sehemu ya bid(), mkataba hasidi wa zabuni ungeweza kuzuia
# urejeshaji huo na hivyo kuzuia zabuni mpya za juu kuingia.
@external
def withdraw():
    pending_amount: uint256 = self.pendingReturns[msg.sender]
    self.pendingReturns[msg.sender] = 0
    send(msg.sender, pending_amount)

# Maliza mnada na tuma zabuni ya juu zaidi
# kwa mpokeaji.
@external
def endAuction():
    # Ni mwongozo mzuri wa kupanga vitendaji vinavyoingiliana
    # na mikataba mingine (yaani, huita vitendaji au hutuma ether)
    # katika awamu tatu:
    # 1. kuangalia masharti
    # 2. kufanya vitendo (vinavyoweza kubadilisha masharti)
    # 3. kuingiliana na mikataba mingine
    # Ikiwa awamu hizi zimechanganywa, mkataba mwingine unaweza kuita
    # tena katika mkataba wa sasa na kurekebisha hali au kusababisha
    # athari (malipo ya ether) kufanywa mara nyingi.
    # Ikiwa vitendaji vinavyoitwa ndani ni pamoja na mwingiliano na nje
    # mikataba, pia inapaswa kuzingatiwa mwingiliano na
    # mikataba ya nje.

    # 1. Masharti
    # Angalia kama muda wa mwisho wa mnada umefikiwa
    assert block.timestamp >= self.auctionEnd
    # Angalia kama kitendaji hiki tayari kimeitwa
    assert not self.ended

    # 2. Athari
    self.ended = True

    # 3. Mwingiliano
    send(self.beneficiary, self.highestBid)
```

Mfano huu unapaswa kukupa hisia ya jinsi sintaksia ya mkataba wa Vyper ilivyo. Kwa maelezo ya kina zaidi ya vitendaji na vigezo, [angalia nyaraka](https://vyper.readthedocs.io/en/latest/vyper-by-example.html#simple-open-auction).

## Yul na Yul+ {#yul}

Ikiwa wewe ni mgeni kwa Ethereum na bado hujafanya uandishi wowote wa msimbo na lugha za mkataba-erevu, tunapendekeza uanze na Solidity au Vyper. Angalia Yul au Yul+ mara tu unapofahamu mbinu bora za usalama wa mkataba-erevu na maelezo mahususi ya kufanya kazi na EVM.

**Yul**

- Lugha ya kati kwa Ethereum.
- Inasaidia [EVM](/developers/docs/evm) na [Ewasm](https://github.com/ewasm), Mkusanyiko wa Wavuti wenye ladha ya Ethereum, na imeundwa kuwa kigawanyiko cha kawaida kinachoweza kutumika cha majukwaa yote mawili.
- Lengo zuri kwa hatua za uboreshaji wa kiwango cha juu ambazo zinaweza kufaidi majukwaa ya EVM na Ewasm kwa usawa.

**Yul+**

- Kiendelezi cha kiwango cha chini, chenye ufanisi mkubwa kwa Yul.
- Hapo awali iliyoundwa kwa ajili ya mkataba wa [optimistic rollup](/developers/docs/scaling/optimistic-rollups/).
- Yul+ inaweza kutazamwa kama pendekezo la majaribio la sasisho kwa Yul, na kuongeza vipengele vipya kwake.

### Viungo muhimu {#important-links-2}

- [Nyaraka za Yul](https://docs.soliditylang.org/en/latest/yul.html)
- [Nyaraka za Yul+](https://github.com/fuellabs/yulp)
- [Chapisho la Utangulizi la Yul+](https://medium.com/@fuellabs/introducing-yul-a-new-low-level-language-for-ethereum-aa64ce89512f)

### Mfano wa mkataba {#example-contract-2}

Mfano rahisi ufuatao unatekeleza kitendaji cha nguvu. Inaweza kuandaliwa kwa kutumia `solc --strict-assembly --bin input.yul`. Mfano unapaswa
kuhifadhiwa katika faili ya input.yul.

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

Ikiwa tayari una uzoefu mzuri na mikataba-erevu, utekelezaji kamili wa ERC20 katika Yul unaweza kupatikana [hapa](https://solidity.readthedocs.io/en/latest/yul.html#complete-erc20-example).

## Fe {#fe}

- Lugha ya aina tuli kwa ajili ya Mashine ya mtandaoni ya Ethereum (EVM).
- Imehamasishwa na Python na Rust.
- Inalenga kuwa rahisi kujifunza -- hata kwa wasanidi programu ambao ni wapya kwenye mfumo ikolojia wa Ethereum.
- Uendelezaji wa Fe bado uko katika hatua za mwanzo, lugha hiyo ilikuwa na toleo lake la alpha mnamo Januari 2021.

### Viungo muhimu {#important-links-3}

- [GitHub](https://github.com/ethereum/fe)
- [Tangazo la Fe](https://snakecharmers.ethereum.org/fe-a-new-language-for-the-ethereum-ecosystem/)
- [Ramani ya Fe 2021](https://notes.ethereum.org/LVhaTF30SJOpkbG1iVw1jg)
- [Gumzo la Fe Discord](https://discord.com/invite/ywpkAXFjZH)
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

Kama ilivyo kwa lugha nyingine yoyote ya programu, mara nyingi ni kuhusu kuchagua zana inayofaa kwa kazi inayofaa na pia mapendeleo ya kibinafsi.

Hapa kuna mambo machache ya kuzingatia ikiwa bado hujajaribu lugha yoyote:

### Ni nini kizuri kuhusu Solidity? {#solidity-advantages}

- Ikiwa wewe ni mwanzilishi, kuna mafunzo na zana nyingi za kujifunza. Angalia zaidi kuhusu hilo katika sehemu ya [Jifunze kwa Kuandika Msimbo](/developers/learning-tools/).
- Zana nzuri za msanidi programu zinapatikana.
- Solidity ina jumuiya kubwa ya wasanidi programu, ambayo inamaanisha kuna uwezekano mkubwa utapata majibu ya maswali yako haraka sana.

### Ni nini kizuri kuhusu Vyper? {#vyper-advatages}

- Njia nzuri ya kuanza kwa wasanidi wa Python wanaotaka kuandika mikataba-erevu.
- Vyper ina idadi ndogo ya vipengele vinavyoifanya kuwa nzuri kwa ajili ya kuunda mifano ya haraka ya mawazo.
- Vyper inalenga kuwa rahisi kukagua na kusomeka kwa urahisi iwezekanavyo kwa binadamu.

### Ni nini kizuri kuhusu Yul na Yul+? {#yul-advantages}

- Lugha rahisi na inayofanya kazi ya kiwango cha chini.
- Inaruhusu kusogea karibu zaidi na EVM mbichi, ambayo inaweza kusaidia kuboresha matumizi ya gesi ya mikataba yako.

## Ulinganisho wa lugha {#language-comparisons}

Kwa ulinganisho wa sintaksia ya msingi, mzunguko wa maisha ya mkataba, violesura, viendeshaji, miundo ya data, vitendaji, mtiririko wa udhibiti, na zaidi angalia [karatasi hii ya kudokezea ya Auditless](https://reference.auditless.com/cheatsheet/)

## Masomo zaidi {#further-reading}

- [Maktaba ya Mikataba ya Solidity na OpenZeppelin](https://docs.openzeppelin.com/contracts/5.x/)
- [Solidity kwa Mfano](https://solidity-by-example.org)
