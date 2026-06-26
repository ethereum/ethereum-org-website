---
title: Usanjari wa kiambishi awali cha urefu wa kujirudia (RLP)
description: Ufafanuzi wa usimbaji wa rlp katika tabaka la utekelezaji la Ethereum.
lang: sw
sidebarDepth: 2
---

Usanjari wa Kiambishi Awali cha Urefu wa Kujirudia (RLP) unatumika sana katika wateja wa utekelezaji wa Ethereum. RLP husawazisha hamisho la data kati ya nodi katika umbizo linalotumia nafasi vizuri. Madhumuni ya RLP ni kusimba safu zilizowekwa kiholela za data ya mfumo wa namba mbili (binary), na RLP ndiyo njia kuu ya usimbaji inayotumika kusanjari vipengee katika tabaka la utekelezaji la Ethereum. Madhumuni makuu ya RLP ni kusimba muundo; isipokuwa kwa nambari kamili chanya, RLP hukabidhi usimbaji wa aina mahususi za data (k.m., mifuatano, nambari zinazoelea) kwa itifaki za daraja la juu. Nambari kamili chanya lazima ziwakilishwe katika mfumo wa namba mbili wa kianzia-kikubwa bila sufuri zinazoongoza (hivyo kufanya thamani ya nambari kamili ya sufuri kuwa sawa na safu tupu ya baiti). Nambari kamili chanya zilizotolewa kwenye usanjari zenye sufuri zinazoongoza lazima zichukuliwe kuwa batili na itifaki yoyote ya daraja la juu inayotumia RLP.

Maelezo zaidi katika [waraka wa manjano wa Ethereum (Kiambatisho B)](https://ethereum.github.io/yellowpaper/paper.pdf#page=19).

Ili kutumia RLP kusimba kamusi, fomu mbili za kikanoniki zilizopendekezwa ni:

- tumia `[[k1,v1],[k2,v2]...]` na funguo katika mpangilio wa kileksikografia
- tumia usimbaji wa kiwango cha juu wa Patricia Tree kama [Ethereum](/) inavyofanya

## Ufafanuzi {#definition}

Chaguo la kukokotoa la usimbaji la RLP huchukua kipengee. Kipengee kinafafanuliwa kama ifuatavyo:

- mfuatano (yaani, safu ya baiti) ni kipengee
- orodha ya vipengee ni kipengee
- nambari kamili chanya ni kipengee

Kwa mfano, yote yafuatayo ni vipengee:

- mfuatano mtupu;
- mfuatano ulio na neno "cat";
- orodha iliyo na idadi yoyote ya mifuatano;
- na miundo changamano zaidi ya data kama `["cat", ["puppy", "cow"], "horse", [[]], "pig", [""], "sheep"]`.
- nambari `100`

Kumbuka kwamba katika muktadha wa ukurasa huu uliosalia, 'mfuatano' unamaanisha "idadi fulani ya baiti za data ya mfumo wa namba mbili"; hakuna usimbaji maalum unaotumika, na hakuna ujuzi kuhusu maudhui ya mifuatano unaodokezwa (isipokuwa kama inavyotakiwa na sheria dhidi ya nambari kamili chanya zisizo za kiwango cha chini).

Usimbaji wa RLP unafafanuliwa kama ifuatavyo:

- Kwa nambari kamili chanya, inabadilishwa kuwa safu fupi zaidi ya baiti ambayo tafsiri yake ya kianzia-kikubwa ni nambari kamili, na kisha kusimbwa kama mfuatano kulingana na sheria zilizo hapa chini.
- Kwa baiti moja ambayo thamani yake iko katika masafa ya `[0x00, 0x7f]` (desimali `[0, 127]`), baiti hiyo ni usimbaji wake wenyewe wa RLP.
- Vinginevyo, ikiwa mfuatano una urefu wa baiti 0-55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0x80** (des. 128) pamoja na urefu wa mfuatano unaofuatwa na mfuatano huo. Masafa ya baiti ya kwanza kwa hivyo ni `[0x80, 0xb7]` (des. `[128, 183]`).
- Ikiwa mfuatano una urefu wa zaidi ya baiti 55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xb7** (des. 183) pamoja na urefu katika baiti wa urefu wa mfuatano katika mfumo wa namba mbili, ikifuatiwa na urefu wa mfuatano, ikifuatiwa na mfuatano huo. Kwa mfano, mfuatano wenye urefu wa baiti 1024 ungesimbwa kama `\xb9\x04\x00` (des. `185, 4, 0`) ikifuatiwa na mfuatano huo. Hapa, `0xb9` (183 + 2 = 185) kama baiti ya kwanza, ikifuatiwa na baiti 2 `0x0400` (des. 1024) zinazoonyesha urefu wa mfuatano halisi. Masafa ya baiti ya kwanza kwa hivyo ni `[0xb8, 0xbf]` (des. `[184, 191]`).
- Ikiwa mfuatano una urefu wa baiti 2^64, au zaidi, huenda usisimbwe.
- Ikiwa jumla ya mzigo wa data wa orodha (yaani, urefu wa pamoja wa vipengee vyake vyote vinavyosimbwa na RLP) una urefu wa baiti 0-55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xc0** pamoja na urefu wa mzigo wa data ikifuatiwa na muunganisho wa usimbaji wa RLP wa vipengee hivyo. Masafa ya baiti ya kwanza kwa hivyo ni `[0xc0, 0xf7]` (des. `[192, 247]`).
- Ikiwa jumla ya mzigo wa data wa orodha una urefu wa zaidi ya baiti 55, usimbaji wa RLP unajumuisha baiti moja yenye thamani ya **0xf7** pamoja na urefu katika baiti wa urefu wa mzigo wa data katika mfumo wa namba mbili, ikifuatiwa na urefu wa mzigo wa data, ikifuatiwa na muunganisho wa usimbaji wa RLP wa vipengee hivyo. Masafa ya baiti ya kwanza kwa hivyo ni `[0xf8, 0xff]` (des. `[248, 255]`).

Kwa ufupi:

| Masafa       | Baiti 1     | Baiti 2     | ...        | Baiti 9                | Baiti 10    | Maana                                   |
| ----------- | ---------- | ---------- | ---------- | --------------------- | ---------- | ----------------------------------------- |
| `0x00-0x7f` | `0ppppppp` |            |            |                       |            | mfuatano wa baiti moja                        |
| `0x80-0xb7` | `10nnnnnn` | `pppppppp` | `...`      |                       |            | mfuatano mfupi (baiti 0-55)                 |
| `0xb8-0xbf` | `10111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | mfuatano mrefu, baiti N+1 za urefu, kisha mzigo wa data |
| `0xc0-0xf7` | `11nnnnnn` | `pppppppp` | `...`      |                       |            | orodha fupi (baiti 0-55)                   |
| `0xf8-0xff` | `11111NNN` | `nnnnnnnn` | `...`      | `nnnnnnnn`/`pppppppp` | `pppppppp` | orodha ndefu, baiti N+1 za urefu, kisha mzigo wa data |

- `p` = mzigo wa data
- `n` = urefu (idadi ya baiti za mzigo wa data)
- `N` = urekebishaji wa urefu-wa-urefu (baiti N+1 za `n` zinafuata)

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

## Mifano {#examples}

- mfuatano "dog" = [ 0x83, 'd', 'o', 'g' ]
- orodha [ "cat", "dog" ] = `[ 0xc8, 0x83, 'c', 'a', 't', 0x83, 'd', 'o', 'g' ]`
- mfuatano mtupu ('null') = `[ 0x80 ]`
- orodha tupu = `[ 0xc0 ]`
- nambari kamili 0 = `[ 0x80 ]`
- baiti '\\x00' = `[ 0x00 ]`
- baiti '\\x0f' = `[ 0x0f ]`
- baiti '\\x04\\x00' = `[ 0x82, 0x04, 0x00 ]`
- [uwakilishi wa kinadharia wa seti](https://en.wikipedia.org/wiki/Set-theoretic_definition_of_natural_numbers) wa tatu, `[ [], [[]], [ [], [[]] ] ] = [ 0xc7, 0xc0, 0xc1, 0xc0, 0xc3, 0xc0, 0xc1, 0xc0 ]`
- mfuatano "Lorem ipsum dolor sit amet, consectetur adipisicing elit" = `[ 0xb8, 0x38, 'L', 'o', 'r', 'e', 'm', ' ', ... , 'e', 'l', 'i', 't' ]`

## Usimbuaji wa RLP {#rlp-decoding}

Kulingana na sheria na mchakato wa usimbaji wa RLP, ingizo la usimbuaji wa RLP linachukuliwa kama safu ya data ya mfumo wa namba mbili. Mchakato wa usimbuaji wa RLP ni kama ifuatavyo:

1.  kulingana na baiti ya kwanza (yaani, kiambishi awali) cha data inayoingizwa na kusimbua aina ya data, urefu wa data halisi na urekebishaji;

2.  kulingana na aina na urekebishaji wa data, simbua data ipasavyo, ukiheshimu sheria ya usimbaji wa kiwango cha chini kwa nambari kamili chanya;

3.  endelea kusimbua ingizo lililosalia;

Miongoni mwao, sheria za kusimbua aina za data na urekebishaji ni kama ifuatavyo:

1.  data ni mfuatano ikiwa masafa ya baiti ya kwanza (yaani, kiambishi awali) ni [0x00, 0x7f], na mfuatano ni baiti ya kwanza yenyewe haswa;

2.  data ni mfuatano ikiwa masafa ya baiti ya kwanza ni [0x80, 0xb7], na mfuatano ambao urefu wake ni sawa na baiti ya kwanza ukiondoa 0x80 unafuata baiti ya kwanza;

3.  data ni mfuatano ikiwa masafa ya baiti ya kwanza ni [0xb8, 0xbf], na urefu wa mfuatano ambao urefu wake katika baiti ni sawa na baiti ya kwanza ukiondoa 0xb7 unafuata baiti ya kwanza, na mfuatano unafuata urefu wa mfuatano;

4.  data ni orodha ikiwa masafa ya baiti ya kwanza ni [0xc0, 0xf7], na muunganisho wa usimbaji wa RLP wa vipengee vyote vya orodha ambayo jumla ya mzigo wa data ni sawa na baiti ya kwanza ukiondoa 0xc0 unafuata baiti ya kwanza;

5.  data ni orodha ikiwa masafa ya baiti ya kwanza ni [0xf8, 0xff], na jumla ya mzigo wa data wa orodha ambayo urefu wake ni sawa na baiti ya kwanza ukiondoa 0xf7 unafuata baiti ya kwanza, na muunganisho wa usimbaji wa RLP wa vipengee vyote vya orodha unafuata jumla ya mzigo wa data wa orodha;

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

## Usomaji zaidi {#further-reading}

- [RLP katika Ethereum](https://medium.com/coinmonks/data-structure-in-ethereum-episode-1-recursive-length-prefix-rlp-encoding-decoding-d1016832f919)
- [Ethereum kiufundi: RLP](https://medium.com/coinmonks/ethereum-under-the-hood-part-3-rlp-decoding-df236dc13e58)
- [Coglio, A. (2020). Kiambishi Awali cha Urefu wa Kujirudia cha Ethereum katika ACL2. arXiv preprint arXiv:2009.13769.](https://arxiv.org/abs/2009.13769)

## Mada zinazohusiana {#related-topics}

- [Patricia merkle trie](/developers/docs/data-structures-and-encoding/patricia-merkle-trie)