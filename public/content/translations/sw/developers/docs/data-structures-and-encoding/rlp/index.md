---
title: Serializesheni ya kiambishi awali cha urefu kinachojirudia (RLP)
description: Ufafanuzi wa usimbaji wa rlp katika safu ya utekelezaji ya Ethereum.
lang: sw
sidebarDepth: 2
---

Serializesheni ya Kiambishi awali cha Urefu Kinachojirudia (RLP) hutumika sana katika programu za utekelezaji za Ethereum. RLP husanifisha uhamisho wa data kati ya nodi katika umbizo linalotumia nafasi vizuri. Madhumuni ya RLP ni kusimba safu zilizopachikwa kiholela za data ya kibinadamu, na RLP ndiyo njia kuu ya usimbaji inayotumika kusanifisha vitu katika safu ya utekelezaji ya Ethereum. Madhumuni makuu ya RLP ni kusimba muundo; isipokuwa nambari kamili chanya, RLP hukabidhi usimbaji wa aina maalum za data (k.m., mifuatano, nambari za desimali) kwa itifaki za kiwango cha juu. Nambari kamili chanya lazima ziwakilishwe katika umbo la kibinadamu la big-endian bila sifuri zinazoongoza (hivyo kufanya thamani kamili ya sifuri kuwa sawa na safu tupu ya baiti). Nambari kamili chanya zilizotenguliwa kwa serializesheni na zenye sifuri zinazoongoza lazima zichukuliwe kuwa si sahihi na itifaki yoyote ya kiwango cha juu inayotumia RLP.

Maelezo zaidi katika [waraka wa manjano wa Ethereum (Kiambatisho B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Ili kutumia RLP kusimba kamusi, maumbo mawili yaliyopendekezwa ya kikanuni ni:

- tumia `[[k1,v1],[k2,v2]...]` na vitufe katika mpangilio wa kileksikografia
- tumia usimbaji wa kiwango cha juu wa Mti wa Patricia kama Ethereum inavyofanya

## Ufafanuzi {#definition}

Kazi ya usimbaji ya RLP huchukua kipengee. Kipengee kinafafanuliwa kama ifuatavyo：

- mfuatano (yaani, safu ya baiti) ni kipengee
- orodha ya vipengee ni kipengee
- nambari kamili chanya ni kipengee

Kwa mfano, vyote vifuatavyo ni vipengee:

- mfuatano mtupu;
- mfuatano wenye neno "paka";
- orodha yenye idadi yoyote ya mifuatano;
- na miundo tata zaidi ya data kama `["paka", ["mbwa mdogo", "ng'ombe"], "farasi", [[]], "nguruwe", [""], "kondoo"]`.
- nambari `100`

Kumbuka kwamba katika muktadha wa ukurasa huu wote, 'mfuatano' unamaanisha "idadi fulani ya baiti za data ya kibinadamu"; hakuna usimbaji maalum unaotumika, na hakuna ufahamu kuhusu maudhui ya mifuatano unaodokezwa (isipokuwa kama inavyotakiwa na sheria dhidi ya nambari kamili chanya zisizo za chini zaidi).

Usimbaji wa RLP unafafanuliwa kama ifuatavyo:

- Kwa nambari kamili chanya, hugeuzwa kuwa safu fupi zaidi ya baiti ambayo tafsiri yake ya big-endian ni nambari kamili, kisha kusimbwa kama mfuatano kulingana na sheria zilizo hapa chini.
- Kwa baiti moja ambayo thamani yake iko katika masafa ya `[0x00, 0x7f]` (desimali `[0, 127]`), baiti hiyo ni usimbaji wake wenyewe wa RLP.
- Vinginevyo, ikiwa mfuatano una urefu wa baiti 0-55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0x80** (des. 128) pamoja na urefu wa mfuatano ukifuatiwa na mfuatano wenyewe. Kwa hiyo masafa ya baiti ya kwanza ni `[0x80, 0xb7]` (des. `[128, 183]`).
- Ikiwa mfuatano una urefu wa zaidi ya baiti 55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xb7** (des. 183) pamoja na urefu katika baiti wa urefu wa mfuatano katika umbo la kibinadamu, ukifuatiwa na urefu wa mfuatano, ukifuatiwa na mfuatano wenyewe. Kwa mfano, mfuatano wenye urefu wa baiti 1024 utasimbwa kama `\xb9\x04\x00` (des. `185, 4, 0`) ukifuatiwa na mfuatano wenyewe. Hapa, `0xb9` (183 + 2 = 185) kama baiti ya kwanza, ikifuatiwa na baiti 2 `0x0400` (des. 1024) zinazoashiria urefu wa mfuatano halisi. Kwa hiyo masafa ya baiti ya kwanza ni `[0xb8, 0xbf]` (des. `[184, 191]`).
- Ikiwa mfuatano una urefu wa baiti 2^64, au mrefu zaidi, huenda usisimbwe.
- Ikiwa shehena jumla ya orodha (yaani, urefu wa pamoja wa vipengee vyake vyote vinavyosimbwa kwa RLP) ni wa baiti 0-55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xc0** pamoja na urefu wa shehena ukifuatiwa na muunganiko wa usimbaji wa RLP wa vipengee. Kwa hiyo masafa ya baiti ya kwanza ni `[0xc0, 0xf7]` (des. `[192, 247]`).
- Ikiwa shehena jumla ya orodha ina urefu wa zaidi ya baiti 55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xf7** pamoja na urefu katika baiti wa urefu wa shehena katika umbo la kibinadamu, ukifuatiwa na urefu wa shehena, ukifuatiwa na muunganiko wa usimbaji wa RLP wa vipengee. Kwa hiyo masafa ya baiti ya kwanza ni `[0xf8, 0xff]` (des. `[248, 255]`).

Katika msimbo, hii ni:

```python
def rlp_encode(input):
    if isinstance(input,str):
        if len(input) == 1 and ord(input) < 0x80:
            return input
        return encode_length(len(input), 0x80) + input
    elif isinstance(input, list):
        output = ''
        for item in input:
            output += rlp_encode(item)
        return encode_length(len(output), 0xc0) + output

def encode_length(L, offset):
    if L < 56:
         return chr(L + offset)
    elif L < 256**8:
         BL = to_binary(L)
         return chr(len(BL) + offset + 55) + BL
    raise Exception("input too long")

def to_binary(x):
    if x == 0:
        return ''
    return to_binary(int(x / 256)) + chr(x % 256)
```

## Mfano {#examples}

- mfuatano "dog" = [ 0x83, 'd', 'o', 'g' ]
- orodha [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- mfuatano mtupu ('null') = `[ 0x80 ]`
- orodha tupu = `[ 0xc0 ]`
- nambari kamili 0 = `[ 0x80 ]`
- baiti '\x00' = `[ 0x00 ]`
- baiti '\x0f' = `[ 0x0f ]`
- baiti '\x04\x00' = `[ 0x82, 0x04, 0x00 ]`
- [uwakilishi wa nadharia ya seti](http://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) ya tatu, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- mfuatano "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ...` , 'e', 'l', 'i', 't' ]`

## Utenguaji usimbaji wa RLP {#rlp-decoding}

Kulingana na sheria na mchakato wa usimbaji wa RLP, ingizo la utenguaji usimbaji wa RLP huchukuliwa kama safu ya data ya kibinadamu. Mchakato wa utenguaji usimbaji wa RLP ni kama ifuatavyo:

1. kulingana na baiti ya kwanza (yaani, kiambishi awali) cha data ya ingizo na kutengua usimbaji wa aina ya data, urefu wa data halisi na mkinzano;

2. kulingana na aina na mkinzano wa data, tengua usimbaji wa data vivyo hivyo, ukizingatia sheria ya usimbaji wa chini zaidi kwa nambari kamili chanya;

3. endelea kutengua usimbaji wa sehemu iliyobaki ya ingizo;

Miongoni mwao, sheria za kutengua usimbaji wa aina za data na mkinzano ni kama zifuatavyo:

1. data ni mfuatano ikiwa masafa ya baiti ya kwanza (yaani, kiambishi awali) ni [0x00, 0x7f], na mfuatano ni baiti yenyewe hasa;

2. data ni mfuatano ikiwa masafa ya baiti ya kwanza ni [0x80, 0xb7], na mfuatano ambao urefu wake ni sawa na baiti ya kwanza kutoa 0x80 hufuata baiti ya kwanza;

3. data ni mfuatano ikiwa masafa ya baiti ya kwanza ni [0xb8, 0xbf], na urefu wa mfuatano ambao urefu wake katika baiti ni sawa na baiti ya kwanza kutoa 0xb7 hufuata baiti ya kwanza, na mfuatano hufuata urefu wa mfuatano;

4. data ni orodha ikiwa masafa ya baiti ya kwanza ni [0xc0, 0xf7], na muunganiko wa usimbaji wa RLP wa vipengee vyote vya orodha ambayo shehena jumla yake ni sawa na baiti ya kwanza kutoa 0xc0 hufuata baiti ya kwanza;

5. data ni orodha ikiwa masafa ya baiti ya kwanza ni [0xf8, 0xff], na shehena jumla ya orodha ambayo urefu wake ni sawa na baiti ya kwanza kutoa 0xf7 hufuata baiti ya kwanza, na muunganiko wa usimbaji wa RLP wa vipengee vyote vya orodha hufuata shehena jumla ya orodha;

Katika msimbo, hii ni:

```python
def rlp_decode(input):
    if len(input) == 0:
        return
    output = ''
    (offset, dataLen, type) = decode_length(input)
    if type is str:
        output = instantiate_str(substr(input, offset, dataLen))
    elif type is list:
        output = instantiate_list(substr(input, offset, dataLen))
    output += rlp_decode(substr(input, offset + dataLen))
    return output

def decode_length(input):
    length = len(input)
    if length == 0:
        raise Exception("input is null")
    prefix = ord(input[0])
    if prefix <= 0x7f:
        return (0, 1, str)
    elif prefix <= 0xb7 and length > prefix - 0x80:
        strLen = prefix - 0x80
        return (1, strLen, str)
    elif prefix <= 0xbf and length > prefix - 0xb7 and length > prefix - 0xb7 + to_integer(substr(input, 1, prefix - 0xb7)):
        lenOfStrLen = prefix - 0xb7
        strLen = to_integer(substr(input, 1, lenOfStrLen))
        return (1 + lenOfStrLen, strLen, str)
    elif prefix <= 0xf7 and length > prefix - 0xc0:
        listLen = prefix - 0xc0;
        return (1, listLen, list)
    elif prefix <= 0xff and length > prefix - 0xf7 and length > prefix - 0xf7 + to_integer(substr(input, 1, prefix - 0xf7)):
        lenOfListLen = prefix - 0xf7
        listLen = to_integer(substr(input, 1, lenOfListLen))
        return (1 + lenOfListLen, listLen, list)
    raise Exception("input does not conform to RLP encoding form")

def to_integer(b):
    length = len(b)
    if length == 0:
        raise Exception("input is null")
    elif length == 1:
        return ord(b[0])
    return ord(substr(b, -1)) + to_integer(substr(b, 0, -1)) * 256
```

## Masomo zaidi {#further-reading}

- [RLP katika Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum kwa ndani: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- Coglio, A. (2020). Kiambishi awali cha Urefu Kinachojirudia cha Ethereum katika ACL2. Nakala ya awali ya arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Mada zinazohusiana {#related-topics}

- [Trie ya Patricia merkle](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)
