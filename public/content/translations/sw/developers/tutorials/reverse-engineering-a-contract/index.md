---
title: "Kufanya Uhandisi wa Kinyume wa Mkataba"
description: Jinsi ya kuelewa mkataba wakati huna msimbo wa chanzo
author: Ori Pomerantz
lang: sw
tags: ["evm", "misimbo ya operesheni"]
skill: advanced
breadcrumb: Uhandisi wa kinyume
published: 2021-12-30
---
## Utangulizi {#introduction}

_Hakuna siri kwenye mnyororo wa vitalu_, kila kitu kinachotokea ni thabiti, kinathibitishwa, na kinapatikana kwa umma. Kwa hakika, [mikataba inapaswa kuwa na msimbo wake wa chanzo uliochapishwa na kuthibitishwa kwenye Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Hata hivyo, [sio hivyo kila wakati](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Katika makala haya utajifunza jinsi ya kufanya uhandisi wa kinyume wa mikataba kwa kuangalia mkataba usio na msimbo wa chanzo, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Kuna vikusanyaji vya kinyume, lakini havitoi kila wakati [matokeo yanayoweza kutumika](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Katika makala haya utajifunza jinsi ya kufanya uhandisi wa kinyume kwa mikono na kuelewa mkataba kutoka kwenye [misimbo ya operesheni](https://github.com/wolflo/evm-opcodes), pamoja na jinsi ya kufasiri matokeo ya kikusanyaji cha kinyume.

Ili kuweza kuelewa makala haya unapaswa kuwa tayari unajua misingi ya EVM, na angalau kufahamu kiasi kuhusu kikusanyaji cha EVM. [Unaweza kusoma kuhusu mada hizi hapa](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Andaa Msimbo Unaotekelezeka {#prepare-the-executable-code}

Unaweza kupata misimbo ya operesheni kwa kwenda kwenye Etherscan kwa ajili ya mkataba, kubofya kichupo cha **Mkataba** na kisha **Badilisha hadi Mwonekano wa Misimbo ya Operesheni**. Unapata mwonekano ambao ni msimbo wa operesheni mmoja kwa kila mstari.

![Opcode View from Etherscan](opcode-view.png)

Hata hivyo, ili kuweza kuelewa miruko, unahitaji kujua ni wapi katika msimbo kila msimbo wa operesheni unapatikana. Ili kufanya hivyo, njia moja ni kufungua Lahajedwali ya Google na kubandika misimbo ya operesheni katika safu wima ya C. [Unaweza kuruka hatua zifuatazo kwa kutengeneza nakala ya lahajedwali hii ambayo tayari imeandaliwa](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Hatua inayofuata ni kupata maeneo sahihi ya msimbo ili tuweze kuelewa miruko. Tutaweka ukubwa wa msimbo wa operesheni katika safu wima ya B, na eneo (katika heksadesimali) katika safu wima ya A. Andika kazi hii katika seli `B1` na kisha unakili na kubandika kwa safu wima ya B iliyosalia, hadi mwisho wa msimbo. Baada ya kufanya hivi unaweza kuficha safu wima ya B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Kwanza kazi hii inaongeza baiti moja kwa ajili ya msimbo wa operesheni wenyewe, na kisha inatafuta `PUSH`. Misimbo ya operesheni ya PUSH ni maalum kwa sababu inahitaji kuwa na baiti za ziada kwa ajili ya thamani inayosukumwa. Ikiwa msimbo wa operesheni ni `PUSH`, tunatoa idadi ya baiti na kuongeza hiyo.

Katika `A1` weka ofseti ya kwanza, sifuri. Kisha, katika `A2`, weka kazi hii na unakili na kubandika tena kwa safu wima ya A iliyosalia:

```
=dec2hex(hex2dec(A1)+B1)
```

Tunahitaji kazi hii itupatie thamani ya heksadesimali kwa sababu thamani zinazosukumwa kabla ya miruko (`JUMP` na `JUMPI`) zinapewa kwetu katika heksadesimali.

## Sehemu ya Kuingilia (0x00) {#the-entry-point-0x00}

Mikataba kila wakati hutekelezwa kuanzia baiti ya kwanza. Hii ni sehemu ya awali ya msimbo:

| Offset | Msimbo wa operesheni | Stack (baada ya msimbo wa operesheni) |
| -----: | ------------ | ------------------------ |
|      0 | PUSH1 0x80   | 0x80                     |
|      2 | PUSH1 0x40   | 0x40, 0x80               |
|      4 | MSTORE       | Tupu                    |
|      5 | PUSH1 0x04   | 0x04                     |
|      7 | CALLDATASIZE | CALLDATASIZE 0x04        |
|      8 | LT           | CALLDATASIZE\<4           |
|      9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4      |
|      C | JUMPI        | Tupu                    |

Msimbo huu unafanya mambo mawili:

1. Kuandika 0x80 kama thamani ya baiti 32 kwenye maeneo ya kumbukumbu 0x40-0x5F (0x80 inahifadhiwa katika 0x5F, na 0x40-0x5E zote ni sifuri).
2. Kusoma ukubwa wa data za mwito. Kwa kawaida data za mwito kwa mkataba wa Ethereum hufuata [ABI (kiolesura cha mfumo wa programu)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), ambayo kwa uchache inahitaji baiti nne kwa kiteuzi cha utendaji. Ikiwa ukubwa wa data za mwito ni chini ya nne, ruka hadi 0x5E.

![Flowchart for this portion](flowchart-entry.png)

### Kishughulikiaji katika 0x5E (kwa data za mwito zisizo za ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Offset | Msimbo wa operesheni       |
| -----: | ------------ |
|     5E | JUMPDEST     |
|     5F | CALLDATASIZE |
|     60 | PUSH2 0x007c |
|     63 | JUMPI        |

Kipande hiki kinaanza na `JUMPDEST`. Programu za EVM (mashine pepe ya Ethereum) hurusha hitilafu ikiwa utaruka kwenye msimbo wa operesheni ambao sio `JUMPDEST`. Kisha inaangalia CALLDATASIZE, na ikiwa ni "kweli" (yaani, sio sifuri) inaruka hadi 0x7C. Tutafikia hilo hapa chini.

| Offset | Msimbo wa operesheni     | Stack (baada ya msimbo wa operesheni)                                                       |
| -----: | ---------- | -------------------------------------------------------------------------- |
|     64 | CALLVALUE  | [Wei](/glossary/#wei) iliyotolewa na mwito. Inaitwa `msg.value` katika Solidity |
|     65 | PUSH1 0x06 | 6 CALLVALUE                                                                |
|     67 | PUSH1 0x00 | 0 6 CALLVALUE                                                              |
|     69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                    |
|     6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                  |
|     6B | SLOAD      | Storage[6] CALLVALUE 0 6 CALLVALUE                                         |

Kwa hivyo wakati hakuna data za mwito tunasoma thamani ya Storage[6]. Hatujui thamani hii ni nini bado, lakini tunaweza kutafuta miamala ambayo mkataba ulipokea bila data za mwito. Miamala ambayo inahamisha tu ETH bila data za mwito zozote (na kwa hivyo hakuna mbinu) ina mbinu ya `Transfer` katika Etherscan. Kwa kweli, [muamala wa kwanza kabisa ambao mkataba ulipokea](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) ni hamisho.

Tukitazama katika muamala huo na kubofya **Click to see More**, tunaona kwamba data za mwito, zinazoitwa data za uingizaji, kwa kweli ni tupu (`0x`). Kumbuka pia kwamba thamani ni 1.559 ETH, hiyo itakuwa muhimu baadaye.

![The call data is empty](calldata-empty.png)

Kisha, bofya kichupo cha **State** na upanue mkataba tunaoufanyia uhandisi wa kinyume (0x2510...). Unaweza kuona kwamba `Storage[6]` ilibadilika wakati wa muamala, na ukibadilisha Hex kuwa **Number**, unaona ikawa 1,559,000,000,000,000,000, thamani iliyohamishwa katika wei (nimeongeza koma kwa uwazi), inayolingana na thamani inayofuata ya mkataba.

![Mabadiliko katika Storage[6]](storage6.png)

Tukitazama katika mabadiliko ya hali yaliyosababishwa na [miamala mingine ya `Transfer` kutoka kipindi hicho hicho](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) tunaona kwamba `Storage[6]` ilifuatilia thamani ya mkataba kwa muda. Kwa sasa tutaiita `Value*`. Alama ya nyota (`*`) inatukumbusha kwamba _hatujui_ kigezo hiki kinafanya nini bado, lakini haiwezi kuwa tu kufuatilia thamani ya mkataba kwa sababu hakuna haja ya kutumia hifadhi, ambayo ni ghali sana, wakati unaweza kupata salio la akaunti zako ukitumia `ADDRESS BALANCE`. Msimbo wa operesheni wa kwanza unasukuma anwani ya mkataba wenyewe. Wa pili unasoma anwani iliyo juu ya stack na kuibadilisha na salio la anwani hiyo.

| Offset | Msimbo wa operesheni       | Stack                                       |
| -----: | ------------ | ------------------------------------------- |
|     6C | PUSH2 0x0075 | 0x75 Value\* CALLVALUE 0 6 CALLVALUE        |
|     6F | SWAP2        | CALLVALUE Value\* 0x75 0 6 CALLVALUE        |
|     70 | SWAP1        | Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|     71 | PUSH2 0x01a7 | 0x01A7 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|     74 | JUMP         |

Tutaendelea kufuatilia msimbo huu kwenye kituo cha kuruka.

| Offset | Msimbo wa operesheni     | Stack                                                       |
| -----: | ---------- | ----------------------------------------------------------- |
|    1A7 | JUMPDEST   | Value\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|    1A8 | PUSH1 0x00 | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|    1AA | DUP3       | CALLVALUE 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AB | NOT        | 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` ni ya kibiti, kwa hivyo inageuza thamani ya kila biti katika thamani ya mwito.

| Offset | Msimbo wa operesheni       | Stack                                                                       |
| -----: | ------------ | --------------------------------------------------------------------------- |
|    1AC | DUP3         | Value\* 2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AD | GT           | Value\*>2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE         |
|    1AE | ISZERO       | Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE        |
|    1AF | PUSH2 0x01df | 0x01DF Value\*\<=2^256-CALLVALUE-1 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1B2 | JUMPI        |

Tunaruka ikiwa `Value*` ni ndogo kuliko 2^256-CALLVALUE-1 au sawa nayo. Hii inaonekana kama mantiki ya kuzuia kufurika (overflow). Na kwa kweli, tunaona kwamba baada ya operesheni chache zisizo na maana (kuandika kwenye kumbukumbu kunakaribia kufutwa, kwa mfano) kwenye offset 0x01DE mkataba unatengua ikiwa kufurika kutagunduliwa, ambayo ni tabia ya kawaida.

Kumbuka kwamba kufurika kama huko kuna uwezekano mdogo sana kutokea, kwa sababu itahitaji thamani ya mwito kujumlisha na `Value*` kulinganishwa na wei 2^256, takriban 10^59 ETH. [Jumla ya usambazaji wa ETH, wakati wa kuandika, ni chini ya milioni mia mbili](https://etherscan.io/stat/supply).

| Offset | Msimbo wa operesheni   | Stack                                     |
| -----: | -------- | ----------------------------------------- |
|    1DF | JUMPDEST | 0x00 Value\* CALLVALUE 0x75 0 6 CALLVALUE |
|    1E0 | POP      | Value\* CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E1 | ADD      | Value\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|    1E2 | SWAP1    | 0x75 Value\*+CALLVALUE 0 6 CALLVALUE      |
|    1E3 | JUMP     |

Ikiwa tumefika hapa, pata `Value* + CALLVALUE` na uruke hadi offset 0x75.

| Offset | Msimbo wa operesheni   | Stack                           |
| -----: | -------- | ------------------------------- |
|     75 | JUMPDEST | Value\*+CALLVALUE 0 6 CALLVALUE |
|     76 | SWAP1    | 0 Value\*+CALLVALUE 6 CALLVALUE |
|     77 | SWAP2    | 6 Value\*+CALLVALUE 0 CALLVALUE |
|     78 | SSTORE   | 0 CALLVALUE                     |

Ikiwa tutafika hapa (ambayo inahitaji data za mwito kuwa tupu) tunaongeza kwenye `Value*` thamani ya mwito. Hii inaendana na kile tunachosema miamala ya `Transfer` inafanya.

| Offset | Msimbo wa operesheni |
| -----: | ------ |
|     79 | POP    |
|     7A | POP    |
|     7B | STOP   |

Hatimaye, futa stack (ambayo sio lazima) na uashirie mwisho wa mafanikio wa muamala.

Kwa muhtasari, hapa kuna chati mtiririko ya msimbo wa awali.

![Entry point flowchart](flowchart-entry.png)

## Kishughulikiaji kwenye 0x7C {#the-handler-at-0x7c}

Sikuweka kwa makusudi kwenye kichwa cha habari kile ambacho kishughulikiaji hiki kinafanya. Lengo si kukufundisha jinsi mkataba huu mahususi unavyofanya kazi, bali jinsi ya kufanya uhandisi wa kinyume wa mikataba. Utajifunza kile inachofanya kwa njia ile ile niliyojifunza, kwa kufuata msimbo.

Tunafika hapa kutoka sehemu kadhaa:

- Ikiwa kuna data za mwito za baiti 1, 2, au 3 (kutoka ofseti 0x63)
- Ikiwa sahihi ya mbinu haijulikani (kutoka ofseti 0x42 na 0x5D)

| Ofseti | Msimbo wa operesheni | Staki                |
| -----: | ------------ | -------------------- |
|     7C | JUMPDEST     |
|     7D | PUSH1 0x00   | 0x00                 |
|     7F | PUSH2 0x009d | 0x9D 0x00            |
|     82 | PUSH1 0x03   | 0x03 0x9D 0x00       |
|     84 | SLOAD        | Storage[3] 0x9D 0x00 |

Hiki ni seli nyingine ya hifadhi, ambayo sikuweza kuipata katika miamala yoyote hivyo ni vigumu kujua inamaanisha nini. Msimbo ulio hapa chini utaifanya iwe wazi zaidi.

| Ofseti | Msimbo wa operesheni                                            | Staki                           |
| -----: | ------------------------------------------------- | ------------------------------- |
|     85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Storage[3] 0x9D 0x00 |
|     9A | AND                                               | Storage[3]-kama-anwani 0x9D 0x00 |

Misimbo hii ya operesheni inakata thamani tunayosoma kutoka Storage[3] hadi biti 160, urefu wa anwani ya Ethereum.

| Ofseti | Msimbo wa operesheni | Staki                           |
| -----: | ------ | ------------------------------- |
|     9B | SWAP1  | 0x9D Storage[3]-kama-anwani 0x00 |
|     9C | JUMP   | Storage[3]-kama-anwani 0x00      |

Ruko hili ni la ziada, kwa kuwa tunaenda kwenye msimbo wa operesheni unaofuata. Msimbo huu hauna ufanisi wa gesi kama unavyoweza kuwa.

| Ofseti | Msimbo wa operesheni     | Staki                           |
| -----: | ---------- | ------------------------------- |
|     9D | JUMPDEST   | Storage[3]-kama-anwani 0x00      |
|     9E | SWAP1      | 0x00 Storage[3]-kama-anwani      |
|     9F | POP        | Storage[3]-kama-anwani           |
|     A0 | PUSH1 0x40 | 0x40 Storage[3]-kama-anwani      |
|     A2 | MLOAD      | Mem[0x40] Storage[3]-kama-anwani |

Mwanzoni kabisa mwa msimbo tunaweka Mem[0x40] kuwa 0x80. Ikiwa tutatafuta 0x40 baadaye, tunaona kwamba hatuibadilishi - kwa hivyo tunaweza kudhani ni 0x80.

| Ofseti | Msimbo wa operesheni       | Staki                                             |
| -----: | ------------ | ------------------------------------------------- |
|     A3 | CALLDATASIZE | CALLDATASIZE 0x80 Storage[3]-kama-anwani           |
|     A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Storage[3]-kama-anwani      |
|     A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Storage[3]-kama-anwani |
|     A7 | CALLDATACOPY | 0x80 Storage[3]-kama-anwani                        |

Nakili data zote za mwito kwenye kumbukumbu, kuanzia 0x80.

| Ofseti | Msimbo wa operesheni        | Staki                                                                            |
| -----: | ------------- | -------------------------------------------------------------------------------- |
|     A8 | PUSH1 0x00    | 0x00 0x80 Storage[3]-kama-anwani                                                  |
|     AA | DUP1          | 0x00 0x00 0x80 Storage[3]-kama-anwani                                             |
|     AB | CALLDATASIZE  | CALLDATASIZE 0x00 0x00 0x80 Storage[3]-kama-anwani                                |
|     AC | DUP4          | 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-kama-anwani                           |
|     AD | DUP6          | Storage[3]-kama-anwani 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-kama-anwani     |
|     AE | GAS           | GAS Storage[3]-kama-anwani 0x80 CALLDATASIZE 0x00 0x00 0x80 Storage[3]-kama-anwani |
|     AF | DELEGATE_CALL |

Sasa mambo yako wazi zaidi. Mkataba huu unaweza kufanya kazi kama [uwakilishi](https://blog.openzeppelin.com/proxy-patterns/), ukiita anwani katika Storage[3] kufanya kazi halisi. `DELEGATE_CALL` inaita mkataba tofauti, lakini inabaki katika hifadhi sawa. Hii inamaanisha kuwa mkataba uliokabidhiwa, ule ambao sisi ni uwakilishi wake, unafikia nafasi sawa ya hifadhi. Vigezo vya mwito ni:

- _Gesi_: Gesi yote iliyosalia
- _Anwani iliyoitiwa_: Storage[3]-kama-anwani
- _Data za mwito_: Baiti za CALLDATASIZE kuanzia 0x80, ambapo ndipo tulipoweka data asili za mwito
- _Data za kurejesha_: Hakuna (0x00 - 0x00) Tutapata data za kurejesha kwa njia nyingine (tazama hapa chini)

| Ofseti | Msimbo wa operesheni         | Staki                                                                                         |
| -----: | -------------- | --------------------------------------------------------------------------------------------- |
|     B0 | RETURNDATASIZE | RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani                          |
|     B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani           |
|     B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani      |
|     B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani |
|     B5 | RETURNDATACOPY | RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani                          |

Hapa tunanakili data zote za kurejesha kwenye bafa ya kumbukumbu kuanzia 0x80.

| Ofseti | Msimbo wa operesheni       | Staki                                                                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------------------------------------------------------- |
|     B6 | DUP2         | (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani                              |
|     B7 | DUP1         | (((kufaulu/kufeli kwa mwito))) (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani   |
|     B8 | ISZERO       | (((je mwito ulifeli))) (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani      |
|     B9 | PUSH2 0x00c0 | 0xC0 (((je mwito ulifeli))) (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani |
|     BC | JUMPI        | (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani                              |
|     BD | DUP2         | RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani               |
|     BE | DUP5         | 0x80 RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani          |
|     BF | RETURN       |                                                                                                                              |

Kwa hivyo baada ya mwito tunanakili data za kurejesha kwenye bafa 0x80 - 0x80+RETURNDATASIZE, na ikiwa mwito utafaulu basi tuna `RETURN` na bafa hiyo haswa.

### DELEGATECALL Ilifeli {#delegatecall-failed}

Ikiwa tutafika hapa, kwenye 0xC0, inamaanisha kuwa mkataba tuliouita ulitengua. Kwa kuwa sisi ni uwakilishi tu wa mkataba huo, tunataka kurejesha data sawa na pia kutengua.

| Ofseti | Msimbo wa operesheni   | Staki                                                                                                               |
| -----: | -------- | ------------------------------------------------------------------------------------------------------------------- |
|     C0 | JUMPDEST | (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani                     |
|     C1 | DUP2     | RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani      |
|     C2 | DUP5     | 0x80 RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) RETURNDATASIZE (((kufaulu/kufeli kwa mwito))) 0x80 Storage[3]-kama-anwani |
|     C3 | REVERT   |

Kwa hivyo tuna `REVERT` na bafa sawa tuliyotumia kwa `RETURN` hapo awali: 0x80 - 0x80+RETURNDATASIZE

![Call to proxy flowchart](flowchart-proxy.png)

## Miito ya ABI {#abi-calls}

Ikiwa ukubwa wa data za mwito ni baiti nne au zaidi huu unaweza kuwa mwito halali wa ABI.

| Sogezo | Msimbo wa operesheni | Staki                                             |
| -----: | ------------ | ------------------------------------------------- |
|      D | PUSH1 0x00   | 0x00                                              |
|      F | CALLDATALOAD | (((Neno la kwanza (biti 256) la data za mwito)))      |
|     10 | PUSH1 0xe0   | 0xE0 (((Neno la kwanza (biti 256) la data za mwito))) |
|     12 | SHR          | (((biti 32 za kwanza (baiti 4) za data za mwito)))    |

Etherscan inatuambia kwamba `1C` ni msimbo wa operesheni usiojulikana, kwa sababu [uliongezwa baada ya Etherscan kuandika kipengele hiki](https://eips.ethereum.org/EIPS/eip-145) na hawajasasisha. [Jedwali la kisasa la msimbo wa operesheni](https://github.com/wolflo/evm-opcodes) linatuonyesha kwamba hii ni shift right

| Sogezo | Msimbo wa operesheni | Staki                                                                                                    |
| -----: | ---------------- | -------------------------------------------------------------------------------------------------------- |
|     13 | DUP1             | (((biti 32 za kwanza (baiti 4) za data za mwito))) (((biti 32 za kwanza (baiti 4) za data za mwito)))            |
|     14 | PUSH4 0x3cd8045e | 0x3CD8045E (((biti 32 za kwanza (baiti 4) za data za mwito))) (((biti 32 za kwanza (baiti 4) za data za mwito))) |
|     19 | GT               | 0x3CD8045E>biti-32-za-kwanza-za-data-za-mwito (((biti 32 za kwanza (baiti 4) za data za mwito)))                 |
|     1A | PUSH2 0x0043     | 0x43 0x3CD8045E>biti-32-za-kwanza-za-data-za-mwito (((biti 32 za kwanza (baiti 4) za data za mwito)))            |
|     1D | JUMPI            | (((biti 32 za kwanza (baiti 4) za data za mwito)))                                                           |

Kwa kugawanya majaribio ya kulinganisha sahihi ya mbinu mara mbili kama hivi huokoa nusu ya majaribio kwa wastani. Msimbo unaofuata mara moja baada ya huu na msimbo katika 0x43 unafuata mtindo ule ule: `DUP1` biti 32 za kwanza za data za mwito, `PUSH4 (((method signature>`, endesha `EQ` ili kuangalia usawa, na kisha `JUMPI` ikiwa sahihi ya mbinu inalingana. Hapa kuna sahihi za mbinu, anwani zake, na ikiwa inajulikana [ufafanuzi wa mbinu unaolingana](https://www.4byte.directory/):

| Mbinu                                                                                 | Sahihi ya mbinu | Sogezo la kurukia |
| -------------------------------------------------------------------------------------- | ---------------- | ------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e       | 0x0103              |
| ???                                                                                    | 0x81e580d3       | 0x0138              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4       | 0x0158              |
| ???                                                                                    | 0x1f135823       | 0x00C4              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab       | 0x00ED              |

Ikiwa hakuna ulinganifu uliopatikana, msimbo unaruka hadi kwenye [kidhibiti cha uwakilishi katika 0x7C](#the-handler-at-0x7c), kwa matumaini kwamba mkataba ambao sisi ni wawakilishi wake una ulinganifu.

![ABI calls flowchart](flowchart-abi.png)

## splitter() {#splitter}

| Offset | Msimbo wa operesheni | Staki                         |
| -----: | ------------ | ----------------------------- |
|    103 | JUMPDEST     |
|    104 | CALLVALUE    | CALLVALUE                     |
|    105 | DUP1         | CALLVALUE CALLVALUE           |
|    106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|    107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|    10A | JUMPI        | CALLVALUE                     |
|    10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|    10D | DUP1         | 0x00 0x00 CALLVALUE           |
|    10E | REVERT       |

Kitu cha kwanza ambacho kazi hii inafanya ni kuangalia kuwa mwito haukutuma ETH yoyote. Kazi hii si [`payable`](https://solidity-by-example.org/payable/). Ikiwa mtu alitutumia ETH hilo lazima liwe kosa na tunataka `REVERT` ili kuepuka kuwa na ETH hiyo ambapo hawawezi kuipata tena.

| Offset | Msimbo wa operesheni                              | Staki                                                                       |
| -----: | ------------------------------------------------- | --------------------------------------------------------------------------- |
|    10F | JUMPDEST                                          |
|    110 | POP                                               |
|    111 | PUSH1 0x03                                        | 0x03                                                                        |
|    113 | SLOAD                                             | (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake)))                |
|    114 | PUSH1 0x40                                        | 0x40 (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake)))           |
|    116 | MLOAD                                             | 0x80 (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake)))           |
|    117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake))) |
|    12C | SWAP1                                             | 0x80 0xFF...FF (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake))) |
|    12D | SWAP2                                             | (((Storage[3] inayojulikana pia kama mkataba ambao sisi ni uwakilishi wake))) 0xFF...FF 0x80 |
|    12E | AND                                               | ProxyAddr 0x80                                                              |
|    12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                         |
|    130 | MSTORE                                            | 0x80                                                                        |

Na 0x80 sasa ina anwani ya uwakilishi

| Offset | Msimbo wa operesheni | Staki     |
| -----: | ------------ | --------- |
|    131 | PUSH1 0x20   | 0x20 0x80 |
|    133 | ADD          | 0xA0      |
|    134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|    137 | JUMP         | 0xA0      |

### Msimbo wa E4 {#the-e4-code}

Hii ni mara ya kwanza tunaona mistari hii, lakini inashirikiwa na mbinu zingine (tazama hapa chini). Kwa hivyo tutaita thamani katika staki X, na kumbuka tu kwamba katika `splitter()` thamani ya X hii ni 0xA0.

| Offset | Msimbo wa operesheni | Staki       |
| -----: | ---------- | ----------- |
|     E4 | JUMPDEST   | X           |
|     E5 | PUSH1 0x40 | 0x40 X      |
|     E7 | MLOAD      | 0x80 X      |
|     E8 | DUP1       | 0x80 0x80 X |
|     E9 | SWAP2      | X 0x80 0x80 |
|     EA | SUB        | X-0x80 0x80 |
|     EB | SWAP1      | 0x80 X-0x80 |
|     EC | RETURN     |

Kwa hivyo msimbo huu hupokea kielekezi cha kumbukumbu katika staki (X), na kusababisha mkataba `RETURN` na bafa ambayo ni 0x80 - X.

Katika kesi ya `splitter()`, hii inarejesha anwani ambayo sisi ni uwakilishi wake. `RETURN` inarejesha bafa katika 0x80-0x9F, ambapo ndipo tuliandika data hii (offset 0x130 hapo juu).

## currentWindow() {#currentwindow}

Msimbo katika ofseti za 0x158-0x163 unafanana kabisa na kile tulichokiona katika 0x103-0x10E kwenye `splitter()` (isipokuwa kwa kituo cha `JUMPI`), kwa hivyo tunajua `currentWindow()` pia sio `payable`.

| Ofseti | Msimbo wa operesheni | Staki                |
| -----: | -------------------- | -------------------- |
|    164 | JUMPDEST             |
|    165 | POP                  |
|    166 | PUSH2 0x00da         | 0xDA                 |
|    169 | PUSH1 0x01           | 0x01 0xDA            |
|    16B | SLOAD                | Storage[1] 0xDA      |
|    16C | DUP2                 | 0xDA Storage[1] 0xDA |
|    16D | JUMP                 | Storage[1] 0xDA      |

### Msimbo wa DA {#the-da-code}

Msimbo huu pia unashirikiwa na mbinu zingine. Kwa hivyo tutaita thamani iliyo kwenye staki Y, na kumbuka tu kwamba katika `currentWindow()` thamani ya hii Y ni Storage[1].

| Ofseti | Msimbo wa operesheni | Staki            |
| -----: | -------------------- | ---------------- |
|     DA | JUMPDEST             | Y 0xDA           |
|     DB | PUSH1 0x40           | 0x40 Y 0xDA      |
|     DD | MLOAD                | 0x80 Y 0xDA      |
|     DE | SWAP1                | Y 0x80 0xDA      |
|     DF | DUP2                 | 0x80 Y 0x80 0xDA |
|     E0 | MSTORE               | 0x80 0xDA        |

Andika Y kwenye 0x80-0x9F.

| Ofseti | Msimbo wa operesheni | Staki          |
| -----: | -------------------- | -------------- |
|     E1 | PUSH1 0x20           | 0x20 0x80 0xDA |
|     E3 | ADD                  | 0xA0 0xDA      |

Na iliyosalia tayari imeelezwa [hapo juu](#the-e4-code). Kwa hivyo miruko kwenda 0xDA huandika juu ya staki (Y) kwenye 0x80-0x9F, na kurudisha thamani hiyo. Katika hali ya `currentWindow()`, inarudisha Storage[1].

## merkleRoot() {#merkleroot}

Msimbo katika ofseti za 0xED-0xF8 unafanana kabisa na kile tulichokiona katika 0x103-0x10E kwenye `splitter()` (isipokuwa kwa kikomo cha `JUMPI`), kwa hivyo tunajua `merkleRoot()` pia sio `payable`.

| Ofseti | Msimbo wa operesheni | Staki                |
| -----: | -------------------- | -------------------- |
|     F9 | JUMPDEST             |                      |
|     FA | POP                  |                      |
|     FB | PUSH2 0x00da         | 0xDA                 |
|     FE | PUSH1 0x00           | 0x00 0xDA            |
|    100 | SLOAD                | Storage[0] 0xDA      |
|    101 | DUP2                 | 0xDA Storage[0] 0xDA |
|    102 | JUMP                 | Storage[0] 0xDA      |

Kile kinachotokea baada ya ruko [tayari tumeshakigundua](#the-da-code). Kwa hivyo `merkleRoot()` inarejesha Storage[0].

## 0x81e580d3 {#0x81e580d3}

Msimbo katika ofseti 0x138-0x143 ni sawa kabisa na kile tulichokiona katika 0x103-0x10E kwenye `splitter()` (isipokuwa fikio la `JUMPI`), kwa hivyo tunajua kazi hii pia si `payable`.

| Ofseti | Msimbo wa operesheni | Staki                                                        |
| -----: | ------------ | ------------------------------------------------------------ |
|    144 | JUMPDEST     |
|    145 | POP          |
|    146 | PUSH2 0x00da | 0xDA                                                         |
|    149 | PUSH2 0x0153 | 0x0153 0xDA                                                  |
|    14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                     |
|    14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                         |
|    152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                |
|    190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|    192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                      |
|    194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                 |
|    195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA    |
|    196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA         |
|    198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA        |
|    199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |

Inaonekana kazi hii inachukua angalau baiti 32 (neno moja) za data za mwito.

| Ofseti | Msimbo wa operesheni | Staki                                        |
| -----: | ------ | -------------------------------------------- |
|    19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|    19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|    19F | REVERT |

Kama haipati data za mwito muamala unatenguliwa bila data zozote za kurejesha.

Hebu tuone nini kinatokea ikiwa kazi _inapata_ data za mwito inazohitaji.

| Ofseti | Msimbo wa operesheni | Staki                                    |
| -----: | ------------ | ---------------------------------------- |
|    1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA       |
|    1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA            |
|    1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` ni neno la kwanza la data za mwito _baada_ ya sahihi ya mbinu

| Ofseti | Msimbo wa operesheni | Staki                                                                        |
| -----: | ------------ | ---------------------------------------------------------------------------- |
|    1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                     |
|    1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                     |
|    1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                  |
|    1A6 | JUMP         | calldataload(4) 0xDA                                                         |
|    153 | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                  |
|    157 | JUMP         | calldataload(4) 0xDA                                                         |
|    16E | JUMPDEST     | calldataload(4) 0xDA                                                         |
|    16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                    |
|    171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|    172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                               |
|    173 | SLOAD        | Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA                         |
|    174 | DUP2         | calldataload(4) Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    175 | LT           | calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|    176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Storage[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|    179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                    |

Kama neno la kwanza si dogo kuliko Storage[4], kazi inafeli. Kinatengua bila thamani yoyote iliyorejeshwa:

| Ofseti | Msimbo wa operesheni | Staki         |
| -----: | ---------- | ------------- |
|    17A | PUSH1 0x00 | 0x00 ...      |
|    17C | DUP1       | 0x00 0x00 ... |
|    17D | REVERT     |

Kama calldataload(4) ni ndogo kuliko Storage[4], tunapata msimbo huu:

| Ofseti | Msimbo wa operesheni | Staki                                               |
| -----: | ---------- | --------------------------------------------------- |
|    17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|    17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|    181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|    182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|    183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Na maeneo ya kumbukumbu 0x00-0x1F sasa yana data 0x04 (0x00-0x1E zote ni sifuri, 0x1F ni nne)

| Ofseti | Msimbo wa operesheni | Staki                                                                   |
| -----: | ---------- | ----------------------------------------------------------------------- |
|    184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                          |
|    186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                          |
|    187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                          |
|    188 | SHA3       | (((SHA3 of 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA            |
|    189 | ADD        | (((SHA3 of 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA            |
|    18A | SLOAD      | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Kwa hivyo kuna jedwali la kutafutia katika hifadhi, ambalo linaanzia kwenye SHA3 ya 0x000...0004 na lina ingizo kwa kila thamani halali ya data za mwito (thamani iliyo chini ya Storage[4]).

| Ofseti | Msimbo wa operesheni | Staki                                                                   |
| -----: | ------ | ----------------------------------------------------------------------- |
|    18B | SWAP1  | calldataload(4) Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA |
|    18C | POP    | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |
|    18D | DUP2   | 0xDA Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA            |
|    18E | JUMP   | Storage[(((SHA3 of 0x00-0x1F))) + calldataload(4)] 0xDA                 |

Tayari tunajua kile ambacho [msimbo kwenye ofseti 0xDA](#the-da-code) unafanya, unarejesha thamani ya juu ya staki kwa anayetoa mwito. Kwa hivyo kazi hii inarejesha thamani kutoka kwenye jedwali la kutafutia kwa anayetoa mwito.

## 0x1f135823 {#0x1f135823}

Msimbo katika ofseti za 0xC4-0xCF unafanana na kile tulichokiona katika 0x103-0x10E kwenye `splitter()` (isipokuwa kwa kituo cha `JUMPI`), kwa hivyo tunajua kazi hii pia si `payable`.

| Ofseti | Msimbo wa operesheni | Staki |
| -----: | ------------ | ----------------- |
|     D0 | JUMPDEST     |
|     D1 | POP          |
|     D2 | PUSH2 0x00da | 0xDA              |
|     D5 | PUSH1 0x06   | 0x06 0xDA         |
|     D7 | SLOAD        | Thamani\* 0xDA      |
|     D8 | DUP2         | 0xDA Thamani\* 0xDA |
|     D9 | JUMP         | Thamani\* 0xDA      |

Tayari tunajua kile ambacho [msimbo kwenye ofseti ya 0xDA](#the-da-code) hufanya, inarejesha thamani ya juu ya staki kwa mpigaji. Kwa hivyo kazi hii inarejesha `Value*`.

### Muhtasari wa Mbinu {#method-summary}

Je, unahisi unaelewa mkataba katika hatua hii? Sielewi. Kufikia sasa tuna mbinu hizi:

| Mbinu | Maana |
| --------------------------------- | ------------------------------------------------------------------------------------ |
| Hamisho | Kubali thamani iliyotolewa na mwito na uongeze `Value*` kwa kiasi hicho |
| [splitter()](#splitter) | Rejesha Storage[3], anwani ya uwakilishi |
| [currentWindow()](#currentwindow) | Rejesha Storage[1] |
| [merkleRoot()](#merkleroot) | Rejesha Storage[0] |
| [0x81e580d3](#0x81e580d3) | Rejesha thamani kutoka kwenye jedwali la kutafuta, mradi kigezo ni chini ya Storage[4] |
| [0x1f135823](#0x1f135823) | Rejesha Storage[6], inayojulikana pia kama Thamani\* |

Lakini tunajua utendakazi mwingine wowote hutolewa na mkataba katika Storage[3]. Labda kama tungejua mkataba huo ni nini ungetupa dokezo. Tunashukuru, huu ni mnyororo wa vitalu na kila kitu kinajulikana, angalau kinadharia. Hatukuona mbinu zozote zinazoweka Storage[3], kwa hivyo lazima iwe iliwekwa na konstrukta.

## Konstrukta {#the-constructor}

Tunapo[angalia mkataba](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) tunaweza pia kuona muamala uliouunda.

![Click the create transaction](create-tx.png)

Tukibofya muamala huo, na kisha kichupo cha **Hali**, tunaweza kuona thamani za awali za vigezo. Hasa, tunaweza kuona kwamba Storage[3] ina [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Mkataba huo lazima uwe na utendaji uliokosekana. Tunaweza kuuelewa kwa kutumia zana zilezile tulizotumia kwa mkataba tunaouchunguza.

## Mkataba wa Uwakilishi {#the-proxy-contract}

Kwa kutumia mbinu zilezile tulizotumia kwa mkataba wa asili hapo juu tunaweza kuona kwamba mkataba unatengua ikiwa:

- Kuna ETH yoyote iliyoambatishwa kwenye mwito (0x05-0x0F)
- Ukubwa wa data za mwito ni chini ya nne (0x10-0x19 na 0xBE-0xC2)

Na kwamba mbinu inazounga mkono ni:

| Mbinu                                                                                                          | Sahihi ya mbinu             | Sogezo la kurukia |
| --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)          | 0x8ffb5c97                   | 0x0135              |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)               | 0xd2ef0795                   | 0x0151              |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4              |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                        | 0x338b1d31                   | 0x0110              |
| ???                                                                                                             | 0x3f26479e                   | 0x0118              |
| ???                                                                                                             | 0x1e7df9d3                   | 0x00C3              |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                          | [0xba0bafb4](#currentwindow) | 0x0148              |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                             | [0x2eb4a7ab](#merkleroot)    | 0x0107              |
| ???                                                                                                             | [0x81e580d3](#0x81e580d3)    | 0x0122              |
| ???                                                                                                             | [0x1f135823](#0x1f135823)    | 0x00D8              |

Tunaweza kupuuza mbinu nne za chini kwa sababu hatutawahi kuzifikia. Sahihi zake ziko hivi kwamba mkataba wetu wa asili unazishughulikia wenyewe (unaweza kubofya sahihi ili kuona maelezo hapo juu), kwa hivyo lazima ziwe [mbinu zilizobatilishwa](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Moja ya mbinu zilizosalia ni `claim(<params>)`, na nyingine ni `isClaimed(<params>)`, kwa hivyo inaonekana kama mkataba wa mgao wa bure. Badala ya kupitia zilizosalia msimbo wa operesheni kwa msimbo wa operesheni, tunaweza [kujaribu kitenganisha msimbo (decompiler)](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), ambacho hutoa matokeo yanayoweza kutumika kwa vipengele vitatu kutoka kwenye mkataba huu. Kufanya uhandisi wa kinyume kwa zile nyingine kumeachwa kama zoezi kwa msomaji.

### scaleAmountByPercentage {#scaleamountbypercentage}

Hiki ndicho kitenganisha msimbo kinatupa kwa kipengele hiki:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

`require` ya kwanza inajaribu kwamba data za mwito zina, pamoja na baiti nne za sahihi ya kipengele, angalau baiti 64, za kutosha kwa vigezo viwili. Ikiwa sivyo basi ni wazi kuna kitu kibaya.

Kauli ya `if` inaonekana kuangalia kwamba `_param1` sio sifuri, na kwamba `_param1 * _param2` sio hasi. Pengine ni kuzuia matukio ya mzunguko wa namba (wrap around).

Hatimaye, kipengele kinarudisha thamani iliyopimwa.

### claim {#claim}

Msimbo ambao kitenganisha msimbo kinaunda ni mgumu, na sio wote unaofaa kwetu. Nitaruka baadhi yake ili kuzingatia mistari ambayo ninaamini inatoa taarifa muhimu

```python
def unknown2e7ba6ef(uint256 _param1, uint256 _param2, uint256 _param3, array _param4) payable:
  ...
  require _param2 == addr(_param2)
  ...
  if currentWindow <= _param1:
      revert with 0, 'cannot claim for a future window'
```

Tunaona hapa mambo mawili muhimu:

- `_param2`, ingawa imetangazwa kama `uint256`, kwa kweli ni anwani
- `_param1` ni dirisha linalodaiwa, ambalo linapaswa kuwa `currentWindow` au mapema zaidi.

```python
  ...
  if stor5[_claimWindow][addr(_claimFor)]:
      revert with 0, 'Account already claimed the given window'
```

Kwa hivyo sasa tunajua kwamba Storage[5] ni orodha ya madirisha na anwani, na kama anwani ilidai tuzo kwa dirisha hilo.

```python
  ...
  idx = 0
  s = 0
  while idx < _param4.length:
  ...
      if s + sha3(mem[(32 * _param4.length) + 328 len mem[(32 * _param4.length) + 296]]) > mem[(32 * idx) + 296]:
          mem[mem[64] + 32] = mem[(32 * idx) + 296]
          ...
          s = sha3(mem[_62 + 32 len mem[_62]])
          continue
      ...
      s = sha3(mem[_66 + 32 len mem[_66]])
      continue
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
```

Tunajua kwamba `unknown2eb4a7ab` kwa kweli ni kipengele cha `merkleRoot()`, kwa hivyo msimbo huu unaonekana kama unathibitisha [ushahidi wa Merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Hii inamaanisha kwamba `_param4` ni ushahidi wa Merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Hivi ndivyo mkataba unavyohamisha ETH yake yenyewe kwenda kwenye anwani nyingine (mkataba au inayomilikiwa na nje). Unaiita kwa thamani ambayo ni kiasi kinachopaswa kuhamishwa. Kwa hivyo inaonekana kama huu ni mgao wa bure wa ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Mistari miwili ya chini inatuambia kwamba Storage[2] pia ni mkataba tunaouita. Ikiwa [tutaangalia muamala wa konstrukta](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) tunaona kwamba mkataba huu ni [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), mkataba wa ether iliyofungwa (weth) [ambao msimbo wake wa chanzo umepakiwa kwenye Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Kwa hivyo inaonekana kama mikataba inajaribu kutuma ETH kwa `_param2`. Ikiwa inaweza kufanya hivyo, ni vizuri. Ikiwa sivyo, inajaribu kutuma [WETH](https://weth.tkn.eth.limo/). Ikiwa `_param2` ni akaunti inayomilikiwa na nje (EOA) basi inaweza kupokea ETH kila wakati, lakini mikataba inaweza kukataa kupokea ETH. Hata hivyo, WETH ni ERC-20 na mikataba haiwezi kukataa kuipokea.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Mwishoni mwa kipengele tunaona ingizo la logi likitengenezwa. [Angalia maingizo ya logi yaliyotengenezwa](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) na uchuje kwenye mada inayoanza na `0xdbd5...`. Ikiwa [tutabofya mmoja wa miamala iliyotengeneza ingizo kama hilo](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) tunaona kwamba kwa kweli inaonekana kama dai - akaunti ilituma ujumbe kwenye mkataba tunaoufanyia uhandisi wa kinyume, na kwa malipo ikapata ETH.

![A claim transaction](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Kipengele hiki kinafanana sana na [`claim`](#claim) hapo juu. Pia kinaangalia ushahidi wa Merkle, kinajaribu kuhamisha ETH kwa ya kwanza, na kinazalisha aina ileile ya ingizo la logi.

```python
def unknown1e7df9d3(uint256 _param1, uint256 _param2, array _param3) payable:
  ...
  idx = 0
  s = 0
  while idx < _param3.length:
      if idx >= mem[96]:
          revert with 0, 50
      _55 = mem[(32 * idx) + 128]
      if s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]]) > mem[(32 * idx) + 128]:
          ...
          s = sha3(mem[_58 + 32 len mem[_58]])
          continue
      mem[mem[64] + 32] = s + sha3(mem[(32 * _param3.length) + 160 len mem[(32 * _param3.length) + 128]])
  ...
  if unknown2eb4a7ab != s:
      revert with 0, 'Invalid proof'
  ...
  call addr(_param1) with:
     value s wei
       gas 30000 wei
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value s wei
               gas gas_remaining wei
  ...
  log 0xdbd5389f: addr(_param1), s, bool(ext_call.success)
```

Tofauti kuu ni kwamba kigezo cha kwanza, dirisha la kutoa, halipo. Badala yake, kuna kitanzi (loop) kwenye madirisha yote yanayoweza kudaiwa.

```python
  idx = 0
  s = 0
  while idx < currentWindow:
      ...
      if stor5[mem[0]]:
          if idx == -1:
              revert with 0, 17
          idx = idx + 1
          s = s
          continue
      ...
      stor5[idx][addr(_param1)] = 1
      if idx >= unknown81e580d3.length:
          revert with 0, 50
      mem[0] = 4
      if unknown81e580d3[idx] and _param2 > -1 / unknown81e580d3[idx]:
          revert with 0, 17
      if s > !(unknown81e580d3[idx] * _param2 / 100 * 10^6):
          revert with 0, 17
      if idx == -1:
          revert with 0, 17
      idx = idx + 1
      s = s + (unknown81e580d3[idx] * _param2 / 100 * 10^6)
      continue
```

Kwa hivyo inaonekana kama toleo la `claim` ambalo linadai madirisha yote.

## Hitimisho {#conclusion}

Kufikia sasa unapaswa kujua jinsi ya kuelewa mikataba ambayo msimbo wake wa chanzo haupatikani, kwa kutumia misimbo ya operesheni au (inapofanya kazi) kigeuza msimbo. Kama inavyoonekana kutokana na urefu wa makala haya, kufanya uhandisi wa kinyume wa mkataba si jambo rahisi, lakini katika mfumo ambapo usalama ni muhimu ni ujuzi muhimu kuweza kuthibitisha kuwa mikataba inafanya kazi kama ilivyoahidiwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).