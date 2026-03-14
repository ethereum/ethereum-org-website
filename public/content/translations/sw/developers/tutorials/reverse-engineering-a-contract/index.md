---
title: "Uhandisi wa Nyuma wa Mkataba"
description: Jinsi ya kuelewa mkataba wakati huna msimbo chanzo
author: Ori Pomerantz
lang: sw
tags: [ "evm", "opcodes" ]
skill: advanced
published: 2021-12-30
---

## Utangulizi {#introduction}

_Hakuna siri kwenye blockchain_, kila kitu kinachotokea ni thabiti, kinaweza kuthibitishwa na kinapatikana kwa umma. Kimsingi, [mikataba inapaswa kuwa na msimbo wake chanzo uliochapishwa na kuthibitishwa kwenye Etherscan](https://etherscan.io/address/0xb8901acb165ed027e32754e0ffe830802919727f#code). Hata hivyo, [sio wakati wote ndivyo ilivyo](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#code). Katika makala hii utajifunza jinsi ya kufanya uhandisi wa nyuma wa mikataba kwa kuangalia mkataba bila msimbo chanzo, [`0x2510c039cc3b061d79e564b38836da87e31b342f`](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f).

Kuna vikompaila vya kinyume, lakini sio kila wakati vinatoa [matokeo yanayoweza kutumika](https://etherscan.io/bytecode-decompiler?a=0x2510c039cc3b061d79e564b38836da87e31b342f). Katika makala hii unajifunza jinsi ya kufanya uhandisi wa nyuma na kuelewa mkataba kutoka [kwa opcodes](https://github.com/wolflo/evm-opcodes), pamoja na jinsi ya kutafsiri matokeo ya decompiler.

Ili kuweza kuelewa makala hii unapaswa kuwa unajua misingi ya EVM, na angalau uwe unafahamu kwa kiasi fulani mkusanyaji wa EVM. [Unaweza kusoma kuhusu mada hizi hapa](https://medium.com/mycrypto/the-ethereum-virtual-machine-how-does-it-work-9abac2b7c9e).

## Andaa Msimbo Unaoweza Kutekelezwa {#prepare-the-executable-code}

Unaweza kupata opcodes kwa kwenda Etherscan kwa ajili ya mkataba, kubofya kichupo cha **Contract** na kisha **Switch to Opcodes View**. Unapata mwonekano ambao ni opcode moja kwa kila mstari.

![Mwonekano wa Opcode kutoka Etherscan](opcode-view.png)

Ili kuweza kuelewa miruko, hata hivyo, unahitaji kujua ni wapi katika msimbo kila opcode iko. Ili kufanya hivyo, njia moja ni kufungua Google Spreadsheet na kubandika opcodes katika safu C. [Unaweza kuruka hatua zifuatazo kwa kutengeneza nakala ya jedwali hili lililoandaliwa tayari](https://docs.google.com/spreadsheets/d/1tKmTJiNjUwHbW64wCKOSJxHjmh0bAUapt6btUYE7kDA/edit?usp=sharing).

Hatua inayofuata ni kupata maeneo sahihi ya msimbo ili tuweze kuelewa miruko. Tutaweka ukubwa wa opcode katika safu B, na eneo (katika heksadesimali) katika safu A. Andika chaguo hili la kukokotoa katika seli `B1` na kisha nakili na ubandike kwa safu B iliyobaki, hadi mwisho wa msimbo. Baada ya kufanya hivi unaweza kuficha safu B.

```
=1+IF(REGEXMATCH(C1,"PUSH"),REGEXEXTRACT(C1,"PUSH(\d+)"),0)
```

Kwanza chaguo hili la kukokotoa linaongeza baiti moja kwa opcode yenyewe, na kisha hutafuta `PUSH`. Opcodes za kusukuma ni maalum kwa sababu zinahitaji kuwa na baiti za ziada kwa thamani inayosukumwa. Ikiwa opcode ni `PUSH`, tunatoa idadi ya baiti na kuiongeza.

Katika `A1` weka kukabiliana kwanza, sifuri. Kisha, katika `A2`, weka chaguo hili la kukokotoa na tena nakili na ubandike kwa safu A iliyobaki:

```
=dec2hex(hex2dec(A1)+B1)
```

Tunahitaji chaguo hili la kukokotoa ili kutupa thamani ya heksadesimali kwa sababu thamani zinazosukumwa kabla ya miruko (`JUMP` na `JUMPI`) tunapewa katika heksadesimali.

## Mahali pa Kuingilia (0x00) {#the-entry-point-0x00}

Mikataba daima hutekelezwa kutoka kwa baiti ya kwanza. Hii ni sehemu ya awali ya msimbo:

| Kukabiliana | Opcode       | Rafu (baada ya opcode)      |
| ----------: | ------------ | ---------------------------------------------- |
|           0 | PUSH1 0x80   | 0x80                                           |
|           2 | PUSH1 0x40   | 0x40, 0x80                                     |
|           4 | MSTORE       | Tupu                                           |
|           5 | PUSH1 0x04   | 0x04                                           |
|           7 | CALLDATASIZE | CALLDATASIZE 0x04                              |
|           8 | LT           | CALLDATASIZE\<4      |
|           9 | PUSH2 0x005e | 0x5E CALLDATASIZE\<4 |
|           C | JUMPI        | Tupu                                           |

Msimbo huu hufanya mambo mawili:

1. Andika 0x80 kama thamani ya baiti 32 kwenye maeneo ya kumbukumbu 0x40-0x5F (0x80 huhifadhiwa katika 0x5F, na 0x40-0x5E zote ni sifuri).
2. Soma ukubwa wa calldata. Kwa kawaida data ya simu kwa ajili ya mkataba wa Ethereum hufuata [ABI (kiolesura cha binary cha mfumo)](https://docs.soliditylang.org/en/v0.8.10/abi-spec.html), ambayo kwa kiwango cha chini inahitaji baiti nne kwa kiteuzi cha chaguo la kukokotoa. Ikiwa ukubwa wa data ya simu ni chini ya nne, ruka hadi 0x5E.

![Chati ya mtiririko kwa sehemu hii](flowchart-entry.png)

### Mshughulikiaji katika 0x5E (kwa data ya simu isiyo ya ABI) {#the-handler-at-0x5e-for-non-abi-call-data}

| Kukabiliana | Opcode       |
| ----------: | ------------ |
|          5E | JUMPDEST     |
|          5F | CALLDATASIZE |
|          60 | PUSH2 0x007c |
|          63 | JUMPI        |

Kipande hiki kinaanza na `JUMPDEST`. Programu za EVM (mashine halisi ya ethereum) hutupa ubaguzi ikiwa utaruka hadi opcode ambayo sio `JUMPDEST`. Kisha inaangalia CALLDATASIZE, na ikiwa ni "kweli" (yaani, sio sifuri) inaruka hadi 0x7C. Tutafikia hilo hapo chini.

| Kukabiliana | Opcode     | Rafu (baada ya opcode)                                                      |
| ----------: | ---------- | ---------------------------------------------------------------------------------------------- |
|          64 | CALLVALUE  | [Wei](/glossary/#wei) iliyotolewa na simu. Inaitwa `msg.value` katika Solidity |
|          65 | PUSH1 0x06 | 6 CALLVALUE                                                                                    |
|          67 | PUSH1 0x00 | 0 6 CALLVALUE                                                                                  |
|          69 | DUP3       | CALLVALUE 0 6 CALLVALUE                                                                        |
|          6A | DUP3       | 6 CALLVALUE 0 6 CALLVALUE                                                                      |
|          6B | SLOAD      | Ghala[6] CALLVALUE 0 6 CALLVALUE           |

Kwa hivyo wakati hakuna data ya simu tunasoma thamani ya Ghala[6]. Bado hatujui thamani hii ni nini, lakini tunaweza kutafuta miamala ambayo mkataba ulipokea bila data ya simu. Miamala ambayo huhamisha ETH tu bila data yoyote ya simu (na kwa hivyo hakuna njia) ina njia ya `Transfer` katika Etherscan. Kwa kweli, [muamala wa kwanza kabisa ambao mkataba ulipokea](https://etherscan.io/tx/0xeec75287a583c36bcc7ca87685ab41603494516a0f5986d18de96c8e630762e7) ni uhamisho.

Tukiangalia katika muamala huo na kubofya **Click to see More**, tunaona kwamba data ya simu, inayoitwa data ya ingizo, kwa kweli haina kitu (`0x`). Angalia pia kwamba thamani ni ETH 1.559, hiyo itakuwa muhimu baadaye.

![Data ya simu haina kitu](calldata-empty.png)

Ifuatayo, bofya kichupo cha **Hali** na upanue mkataba tunaofanyia uhandisi wa nyuma (0x2510...). Unaweza kuona kwamba `Ghala[6]` ilibadilika wakati wa muamala, na ukibadilisha Hex kuwa **Nambari**, unaona ikawa 1,559,000,000,000,000,000, thamani iliyohamishwa katika wei (nimeongeza koma kwa uwazi), inayolingana na thamani ya mkataba unaofuata.

![Mabadiliko katika Ghala[6]](storage6.png)

Tukiangalia katika mabadiliko ya hali yaliyosababishwa na [miamala mingine ya `Transfer` kutoka kipindi hicho](https://etherscan.io/tx/0xf708d306de39c422472f43cb975d97b66fd5d6a6863db627067167cbf93d84d1#statechange) tunaona kwamba `Ghala[6]` ilifuatilia thamani ya mkataba kwa muda. Kwa sasa tutaiita `Value*`. Nyota (`*`) inatukumbusha kwamba bado hatu_jui_ kigezo hiki hufanya nini, lakini haiwezi kuwa tu kufuatilia thamani ya mkataba kwa sababu hakuna haja ya kutumia ghala, ambayo ni ghali sana, wakati unaweza kupata salio la akaunti yako ukitumia `ADDRESS BALANCE`. Opcode ya kwanza inasukuma anwani ya mkataba yenyewe. Ya pili inasoma anwani iliyo juu ya rafu na kuibadilisha na salio la anwani hiyo.

| Kukabiliana | Opcode       | Rafu                                          |
| ----------: | ------------ | --------------------------------------------- |
|          6C | PUSH2 0x0075 | 0x75 Thamani\* CALLVALUE 0 6 CALLVALUE        |
|          6F | SWAP2        | CALLVALUE Thamani\* 0x75 0 6 CALLVALUE        |
|          70 | SWAP1        | Thamani\* CALLVALUE 0x75 0 6 CALLVALUE        |
|          71 | PUSH2 0x01a7 | 0x01A7 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE |
|          74 | JUMP         |                                               |

Tutaendelea kufuatilia msimbo huu katika marudio ya mruko.

| Kukabiliana | Opcode     | Rafu                                                          |
| ----------: | ---------- | ------------------------------------------------------------- |
|         1A7 | JUMPDEST   | Thamani\* CALLVALUE 0x75 0 6 CALLVALUE                        |
|         1A8 | PUSH1 0x00 | 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE                   |
|         1AA | DUP3       | CALLVALUE 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE         |
|         1AB | NOT        | 2^256-CALLVALUE-1 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE |

`NOT` ni bitwise, kwa hivyo inabadilisha thamani ya kila biti katika thamani ya simu.

| Kukabiliana | Opcode       | Rafu                                                                                                       |
| ----------: | ------------ | ---------------------------------------------------------------------------------------------------------- |
|         1AC | DUP3         | Thamani\* 2^256-CALLVALUE-1 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|         1AD | GT           | Thamani\*>2^256-CALLVALUE-1 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE                                    |
|         1AE | ISZERO       | Thamani\*\<=2^256-CALLVALUE-1 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE        |
|         1AF | PUSH2 0x01df | 0x01DF Thamani\*\<=2^256-CALLVALUE-1 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE |
|         1B2 | JUMPI        |                                                                                                            |

Tunaruka ikiwa `Value*` ni ndogo kuliko 2^256-CALLVALUE-1 au sawa nayo. Hii inaonekana kama mantiki ya kuzuia kufurika. Na kwa hakika, tunaona kwamba baada ya shughuli chache zisizo na maana (kuandika kwa kumbukumbu kunakaribia kufutwa, kwa mfano) kwa kukabiliana 0x01DE mkataba unarudi nyuma ikiwa kufurika kutagunduliwa, ambayo ni tabia ya kawaida.

Kumbuka kuwa kufurika kama hivyo hakuna uwezekano mkubwa, kwa sababu kungehitaji thamani ya simu pamoja na `Thamani*` kulinganishwa na wei 2^256, takriban ETH 10^59. [Jumla ya usambazaji wa ETH, wakati wa kuandika, ni chini ya milioni mia mbili](https://etherscan.io/stat/supply).

| Kukabiliana | Opcode   | Rafu                                        |
| ----------: | -------- | ------------------------------------------- |
|         1DF | JUMPDEST | 0x00 Thamani\* CALLVALUE 0x75 0 6 CALLVALUE |
|         1E0 | POP      | Thamani\* CALLVALUE 0x75 0 6 CALLVALUE      |
|         1E1 | ADD      | Thamani\*+CALLVALUE 0x75 0 6 CALLVALUE      |
|         1E2 | SWAP1    | 0x75 Thamani\*+CALLVALUE 0 6 CALLVALUE      |
|         1E3 | JUMP     |                                             |

Ikiwa tulifika hapa, pata `Thamani* + CALLVALUE` na uruke ili kukabiliana na 0x75.

| Kukabiliana | Opcode   | Rafu                              |
| ----------: | -------- | --------------------------------- |
|          75 | JUMPDEST | Thamani\*+CALLVALUE 0 6 CALLVALUE |
|          76 | SWAP1    | 0 Thamani\*+CALLVALUE 6 CALLVALUE |
|          77 | SWAP2    | 6 Thamani\*+CALLVALUE 0 CALLVALUE |
|          78 | SSTORE   | 0 CALLVALUE                       |

Tukifika hapa (ambayo inahitaji data ya simu kuwa tupu) tunaongeza kwa `Thamani*` thamani ya simu. Hii inaambatana na kile tunachosema miamala ya `Transfer` hufanya.

| Kukabiliana | Opcode |
| ----------: | ------ |
|          79 | POP    |
|          7A | POP    |
|          7B | STOP   |

Hatimaye, futa rafu (ambayo si lazima) na uashiria mwisho wa mafanikio wa muamala.

Ili kujumlisha yote, hii hapa chati ya mtiririko kwa msimbo wa awali.

![Chati ya mtiririko ya mahali pa kuingilia](flowchart-entry.png)

## Mshughulikiaji katika 0x7C {#the-handler-at-0x7c}

Sikuweka kichwa cha habari kwa makusudi nini mhudumu huyu anafanya. Hoja sio kukufundisha jinsi mkataba huu maalum unavyofanya kazi, lakini jinsi ya kufanya uhandisi wa nyuma wa mikataba. Utajifunza inachofanya kwa njia ile ile niliyoifanya, kwa kufuata msimbo.

Tunafika hapa kutoka sehemu kadhaa:

- Ikiwa kuna data ya simu ya baiti 1, 2, au 3 (kutoka kwa kukabiliana 0x63)
- Ikiwa saini ya mbinu haijulikani (kutoka kwa makabiliano 0x42 na 0x5D)

| Kukabiliana | Opcode       | Rafu                                                                   |
| ----------: | ------------ | ---------------------------------------------------------------------- |
|          7C | JUMPDEST     |                                                                        |
|          7D | PUSH1 0x00   | 0x00                                                                   |
|          7F | PUSH2 0x009d | 0x9D 0x00                                                              |
|          82 | PUSH1 0x03   | 0x03 0x9D 0x00                                                         |
|          84 | SLOAD        | Ghala[3] 0x9D 0x00 |

Hii ni seli nyingine ya ghala, ambayo sikuweza kupata katika miamala yoyote kwa hivyo ni ngumu kujua inamaanisha nini. Msimbo ulio hapa chini utaiweka wazi zaidi.

| Kukabiliana | Opcode                                            | Rafu                                                                                                                                              |
| ----------: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
|          85 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xff....ff Ghala[3] 0x9D 0x00 |
|          9A | AND                                               | Ghala[3]-kama-anwani 0x9D 0x00                                                                |

Opcode hizi hupunguza thamani tunayosoma kutoka kwa Ghala[3] hadi biti 160, urefu wa anwani ya Ethereum.

| Kukabiliana | Opcode | Rafu                                                                               |
| ----------: | ------ | ---------------------------------------------------------------------------------- |
|          9B | SWAP1  | 0x9D Ghala[3]-kama-anwani 0x00 |
|          9C | JUMP   | Ghala[3]-kama-anwani 0x00      |

Mruko huu ni wa ziada, kwani tunaenda kwa opcode inayofuata. Msimbo huu hauna ufanisi wa gesi kama unavyoweza kuwa.

| Kukabiliana | Opcode     | Rafu                                                                                                                                   |
| ----------: | ---------- | -------------------------------------------------------------------------------------------------------------------------------------- |
|          9D | JUMPDEST   | Ghala[3]-kama-anwani 0x00                                                          |
|          9E | SWAP1      | 0x00 Ghala[3]-kama-anwani                                                          |
|          9F | POP        | Ghala[3]-kama-anwani                                                               |
|          A0 | PUSH1 0x40 | 0x40 Ghala[3]-kama-anwani                                                          |
|          A2 | MLOAD      | Mem[0x40] Ghala[3]-kama-anwani |

Mwanzoni kabisa mwa msimbo tuliweka Mem[0x40] kuwa 0x80. Tukiangalia 0x40 baadaye, tunaona kwamba hatuibadilishi - kwa hivyo tunaweza kudhani ni 0x80.

| Kukabiliana | Opcode       | Rafu                                                                                                 |
| ----------: | ------------ | ---------------------------------------------------------------------------------------------------- |
|          A3 | CALLDATASIZE | CALLDATASIZE 0x80 Ghala[3]-kama-anwani           |
|          A4 | PUSH1 0x00   | 0x00 CALLDATASIZE 0x80 Ghala[3]-kama-anwani      |
|          A6 | DUP3         | 0x80 0x00 CALLDATASIZE 0x80 Ghala[3]-kama-anwani |
|          A7 | CALLDATACOPY | 0x80 Ghala[3]-kama-anwani                        |

Nakili data yote ya simu kwenye kumbukumbu, kuanzia 0x80.

| Kukabiliana | Opcode                             | Rafu                                                                                                                                                                                    |
| ----------: | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          A8 | PUSH1 0x00                         | 0x00 0x80 Ghala[3]-kama-anwani                                                                                                      |
|          AA | DUP1                               | 0x00 0x00 0x80 Ghala[3]-kama-anwani                                                                                                 |
|          AB | CALLDATASIZE                       | CALLDATASIZE 0x00 0x00 0x80 Ghala[3]-kama-anwani                                                                                    |
|          AC | DUP4                               | 0x80 CALLDATASIZE 0x00 0x00 0x80 Ghala[3]-kama-anwani                                                                               |
|          AD | DUP6                               | Ghala[3]-kama-anwani 0x80 CALLDATASIZE 0x00 0x00 0x80 Ghala[3]-kama-anwani      |
|          AE | GAS                                | Gesi Ghala[3]-kama-anwani 0x80 CALLDATASIZE 0x00 0x00 0x80 Ghala[3]-kama-anwani |
|          AF | DELEGATE_CALL |                                                                                                                                                                                         |

Sasa mambo ni wazi zaidi. Mkataba huu unaweza kufanya kazi kama [proksi](https://blog.openzeppelin.com/proxy-patterns/), ukiita anwani katika Ghala[3] kufanya kazi halisi. `DELEGATE_CALL` huita mkataba tofauti, lakini hubaki katika ghala moja. Hii inamaanisha kuwa mkataba uliokabidhiwa, ambao sisi ni proksi wake, hufikia nafasi sawa ya ghala. Vigezo vya simu ni:

- _Gesi_: Gesi yote iliyobaki
- _Anwani iliyopigiwa simu_: Ghala[3]-kama-anwani
- _Data ya simu_: baiti za CALLDATASIZE kuanzia 0x80, ambayo ndipo tulipo weka data ya awali ya simu
- _Data ya kurudisha_: Hakuna (0x00 - 0x00) Tutapata data ya kurudisha kwa njia zingine (tazama hapa chini)

| Kukabiliana | Opcode         | Rafu                                                                                                                                                                                                              |
| ----------: | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          B0 | RETURNDATASIZE | RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                          |
|          B1 | DUP1           | RETURNDATASIZE RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani           |
|          B2 | PUSH1 0x00     | 0x00 RETURNDATASIZE RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani      |
|          B4 | DUP5           | 0x80 0x00 RETURNDATASIZE RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani |
|          B5 | RETURNDATACOPY | RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                          |

Hapa tunakili data yote ya kurudi kwenye bafa ya kumbukumbu kuanzia 0x80.

| Kukabiliana | Opcode       | Rafu                                                                                                                                                                                                                                                                                                                                                                             |
| ----------: | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          B6 | DUP2         | (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                                                                                             |
|          B7 | DUP1         | (((mafanikio/kutofaulu kwa simu))) (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani |
|          B8 | ISZERO       | (((simu ilishindwa))) (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani              |
|          B9 | PUSH2 0x00c0 | 0xC0 (((simu ilishindwa))) (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani         |
|          BC | JUMPI        | (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                                                                                             |
|          BD | DUP2         | RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                                                                              |
|          BE | DUP5         | 0x80 RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                                                                         |
|          BF | RETURN       |                                                                                                                                                                                                                                                                                                                                                                                  |

Kwa hivyo baada ya simu tunakili data ya kurudi kwenye bafa 0x80 - 0x80+RETURNDATASIZE, na ikiwa simu imefanikiwa basi `RETURN` na bafa hiyo haswa.

### DELEGATECALL Imeshindwa {#delegatecall-failed}

Tukifika hapa, hadi 0xC0, inamaanisha kwamba mkataba tuliopiga simu ulirudishwa nyuma. Kwa vile sisi ni proksi tu wa mkataba huo, tunataka kurudisha data sawa na pia kurudi nyuma.

| Kukabiliana | Opcode   | Rafu                                                                                                                                                                                                                                                                                                     |
| ----------: | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          C0 | JUMPDEST | (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani                     |
|          C1 | DUP2     | RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani      |
|          C2 | DUP5     | 0x80 RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) RETURNDATASIZE (((mafanikio/kutofaulu kwa simu))) 0x80 Ghala[3]-kama-anwani |
|          C3 | REVERT   |                                                                                                                                                                                                                                                                                                          |

Kwa hivyo sisi `REVERT` na bafa ile ile tuliyotumia kwa `RETURN` hapo awali: 0x80 - 0x80+RETURNDATASIZE

![Chati ya mtiririko ya simu kwa proksi](flowchart-proxy.png)

## Simu za ABI {#abi-calls}

Ikiwa ukubwa wa data ya simu ni baiti nne au zaidi hii inaweza kuwa simu halali ya ABI.

| Kukabiliana | Opcode       | Rafu                                                                                                                             |
| ----------: | ------------ | -------------------------------------------------------------------------------------------------------------------------------- |
|           D | PUSH1 0x00   | 0x00                                                                                                                             |
|           F | CALLDATALOAD | (((Neno la kwanza (biti 256) la data ya simu)))      |
|          10 | PUSH1 0xe0   | 0xE0 (((Neno la kwanza (biti 256) la data ya simu))) |
|          12 | SHR          | (((biti 32 za kwanza (baiti 4) za data ya simu)))    |

Etherscan inatuambia kwamba `1C` ni opcode isiyojulikana, kwa sababu [iliongezwa baada ya Etherscan kuandika kipengele hiki](https://eips.ethereum.org/EIPS/eip-145) na hawajaisasisha. Jedwali la [opcode lililosasishwa](https://github.com/wolflo/evm-opcodes) linatuonyesha kuwa hii ni shift right

| Kukabiliana | Opcode           | Rafu                                                                                                                                                                                                                                                                   |
| ----------: | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|          13 | DUP1             | (((biti 32 za kwanza (baiti 4) za data ya simu))) (((biti 32 za kwanza (baiti 4) za data ya simu)))            |
|          14 | PUSH4 0x3cd8045e | 0x3CD8045E (((biti 32 za kwanza (baiti 4) za data ya simu))) (((biti 32 za kwanza (baiti 4) za data ya simu))) |
|          19 | GT               | 0x3CD8045E>biti-32-za-kwanza-za-data-ya-simu (((biti 32 za kwanza (baiti 4) za data ya simu)))                                                                                             |
|          1A | PUSH2 0x0043     | 0x43 0x3CD8045E>biti-32-za-kwanza-za-data-ya-simu (((biti 32 za kwanza (baiti 4) za data ya simu)))                                                                                        |
|          1D | JUMPI            | (((biti 32 za kwanza (baiti 4) za data ya simu)))                                                                                                                                          |

Kwa kugawanya majaribio ya ulinganishaji wa saini ya mbinu katika mbili kama hii huokoa nusu ya majaribio kwa wastani. Msimbo unaofuata mara moja hii na msimbo katika 0x43 hufuata muundo sawa: `DUP1` biti 32 za kwanza za data ya simu, `PUSH4 (((saini ya mbinu>`, endesha `EQ` ili kuangalia usawa, na kisha `JUMPI` ikiwa saini ya mbinu inalingana. Hapa kuna saini za mbinu, anwani zao, na ikiwa inajulikana [ufafanuzi wa mbinu unaolingana](https://www.4byte.directory/):

| Njia                                                                                                      | Sahihi ya njia | Kukabiliana na kuruka ndani |
| --------------------------------------------------------------------------------------------------------- | -------------- | --------------------------- |
| [splitter()](https://www.4byte.directory/signatures/?bytes4_signature=0x3cd8045e)      | 0x3cd8045e     | 0x0103                      |
| ???                                                                                                       | 0x81e580d3     | 0x0138                      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4) | 0xba0bafb4     | 0x0158                      |
| ???                                                                                                       | 0x1f135823     | 0x00C4                      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)    | 0x2eb4a7ab     | 0x00ED                      |

Ikiwa hakuna mechi inayopatikana, msimbo huruka hadi kwa [mshughulikiaji wa proksi saa 0x7C](#the-handler-at-0x7c), kwa matumaini kwamba mkataba ambao sisi ni proksi wake una mechi.

![Chati ya mtiririko ya simu za ABI](flowchart-abi.png)

## splitter() {#splitter}

| Kukabiliana | Opcode       | Rafu                          |
| ----------: | ------------ | ----------------------------- |
|         103 | JUMPDEST     |                               |
|         104 | CALLVALUE    | CALLVALUE                     |
|         105 | DUP1         | CALLVALUE CALLVALUE           |
|         106 | ISZERO       | CALLVALUE==0 CALLVALUE        |
|         107 | PUSH2 0x010f | 0x010F CALLVALUE==0 CALLVALUE |
|         10A | JUMPI        | CALLVALUE                     |
|         10B | PUSH1 0x00   | 0x00 CALLVALUE                |
|         10D | DUP1         | 0x00 0x00 CALLVALUE           |
|         10E | REVERT       |                               |

Jambo la kwanza ambalo chaguo hili la kukokotoa hufanya ni kuangalia kuwa simu haikutuma ETH yoyote. Chaguo hili la kukokotoa sio [`payable`](https://solidity-by-example.org/payable/). Ikiwa mtu alitutumia ETH hiyo lazima iwe kosa na tunataka `REVERT` ili kuepuka kuwa na ETH hiyo ambapo hawawezi kuirudisha.

| Kukabiliana | Opcode                                            | Rafu                                                                                                                                                                                                                                                          |
| ----------: | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|         10F | JUMPDEST                                          |                                                                                                                                                                                                                                                               |
|         110 | POP                                               |                                                                                                                                                                                                                                                               |
|         111 | PUSH1 0x03                                        | 0x03                                                                                                                                                                                                                                                          |
|         113 | SLOAD                                             | (((Ghala[3] a.k.a mkataba ambao sisi ni proksi)))                                                                |
|         114 | PUSH1 0x40                                        | 0x40 (((Ghala[3] a.k.a mkataba ambao sisi ni proksi)))                                                           |
|         116 | MLOAD                                             | 0x80 (((Ghala[3] a.k.a mkataba ambao sisi ni proksi)))                                                           |
|         117 | PUSH20 0xffffffffffffffffffffffffffffffffffffffff | 0xFF...FF 0x80 (((Ghala[3] a.k.a mkataba ambao sisi ni proksi))) |
|         12C | SWAP1                                             | 0x80 0xFF...FF (((Ghala[3] a.k.a mkataba ambao sisi ni proksi))) |
|         12D | SWAP2                                             | (((Ghala[3] a.k.a mkataba ambao sisi ni proksi))) 0xFF...FF 0x80 |
|         12E | AND                                               | ProxyAddr 0x80                                                                                                                                                                                                                                                |
|         12F | DUP2                                              | 0x80 ProxyAddr 0x80                                                                                                                                                                                                                                           |
|         130 | MSTORE                                            | 0x80                                                                                                                                                                                                                                                          |

Na 0x80 sasa ina anwani ya proksi

| Kukabiliana | Opcode       | Rafu      |
| ----------: | ------------ | --------- |
|         131 | PUSH1 0x20   | 0x20 0x80 |
|         133 | ADD          | 0xA0      |
|         134 | PUSH2 0x00e4 | 0xE4 0xA0 |
|         137 | JUMP         | 0xA0      |

### Msimbo wa E4 {#the-e4-code}

Hii ni mara ya kwanza tunaona mistari hii, lakini inashirikiwa na njia zingine (tazama hapa chini). Kwa hivyo tutaita thamani katika rafu X, na kumbuka tu kwamba katika `splitter()` thamani ya X hii ni 0xA0.

| Kukabiliana | Opcode     | Rafu        |
| ----------: | ---------- | ----------- |
|          E4 | JUMPDEST   | X           |
|          E5 | PUSH1 0x40 | 0x40 X      |
|          E7 | MLOAD      | 0x80 X      |
|          E8 | DUP1       | 0x80 0x80 X |
|          E9 | SWAP2      | X 0x80 0x80 |
|          EA | SUB        | X-0x80 0x80 |
|          EB | SWAP1      | 0x80 X-0x80 |
|          EC | RETURN     |             |

Kwa hivyo msimbo huu hupokea kielekezi cha kumbukumbu kwenye rafu (X), na husababisha mkataba `RETURN` na bafa ambayo ni 0x80 - X.

Katika kesi ya `splitter()`, hii inarudisha anwani ambayo sisi ni proksi. `RETURN` inarudisha bafa katika 0x80-0x9F, ambayo ndipo tuliandika data hii (kukabiliana 0x130 hapo juu).

## currentWindow() {#currentwindow}

Msimbo katika makabiliano 0x158-0x163 ni sawa na tulivyoona katika 0x103-0x10E katika `splitter()` (isipokuwa marudio ya `JUMPI`), kwa hivyo tunajua `currentWindow()` pia haiwezi `kulipwa`.

| Kukabiliana | Opcode       | Rafu                                                                   |
| ----------: | ------------ | ---------------------------------------------------------------------- |
|         164 | JUMPDEST     |                                                                        |
|         165 | POP          |                                                                        |
|         166 | PUSH2 0x00da | 0xDA                                                                   |
|         169 | PUSH1 0x01   | 0x01 0xDA                                                              |
|         16B | SLOAD        | Ghala[1] 0xDA      |
|         16C | DUP2         | 0xDA Ghala[1] 0xDA |
|         16D | JUMP         | Ghala[1] 0xDA      |

### Msimbo wa DA {#the-da-code}

Msimbo huu pia unashirikiwa na njia zingine. Kwa hivyo tutaita thamani katika rafu Y, na kumbuka tu kwamba katika `currentWindow()` thamani ya Y hii ni Ghala[1].

| Kukabiliana | Opcode     | Rafu             |
| ----------: | ---------- | ---------------- |
|          DA | JUMPDEST   | Y 0xDA           |
|          DB | PUSH1 0x40 | 0x40 Y 0xDA      |
|          DD | MLOAD      | 0x80 Y 0xDA      |
|          DE | SWAP1      | Y 0x80 0xDA      |
|          DF | DUP2       | 0x80 Y 0x80 0xDA |
|          E0 | MSTORE     | 0x80 0xDA        |

Andika Y hadi 0x80-0x9F.

| Kukabiliana | Opcode     | Rafu           |
| ----------: | ---------- | -------------- |
|          E1 | PUSH1 0x20 | 0x20 0x80 0xDA |
|          E3 | ADD        | 0xA0 0xDA      |

Na mengine yameelezwa [hapo juu](#the-e4-code). Kwa hivyo miruko hadi 0xDA andika sehemu ya juu ya rafu (Y) hadi 0x80-0x9F, na urudishe thamani hiyo. Katika kesi ya `currentWindow()`, inarudisha Ghala[1].

## merkleRoot() {#merkleroot}

Msimbo katika makabiliano 0xED-0xF8 ni sawa na tulivyoona katika 0x103-0x10E katika `splitter()` (isipokuwa marudio ya `JUMPI`), kwa hivyo tunajua `merkleRoot()` pia haiwezi `kulipwa`.

| Kukabiliana | Opcode       | Rafu                                                                   |
| ----------: | ------------ | ---------------------------------------------------------------------- |
|          F9 | JUMPDEST     |                                                                        |
|          FA | POP          |                                                                        |
|          FB | PUSH2 0x00da | 0xDA                                                                   |
|          FE | PUSH1 0x00   | 0x00 0xDA                                                              |
|         100 | SLOAD        | Ghala[0] 0xDA      |
|         101 | DUP2         | 0xDA Ghala[0] 0xDA |
|         102 | JUMP         | Ghala[0] 0xDA      |

Kinachotokea baada ya mruko [tayari tumegundua](#the-da-code). Kwa hivyo `merkleRoot()` inarudisha Ghala[0].

## 0x81e580d3 {#0x81e580d3}

Msimbo katika makabiliano 0x138-0x143 ni sawa na tulivyoona katika 0x103-0x10E katika `splitter()` (isipokuwa marudio ya `JUMPI`), kwa hivyo tunajua chaguo hili la kukokotoa pia haliwezi `kulipwa`.

| Kukabiliana | Opcode       | Rafu                                                                            |
| ----------: | ------------ | ------------------------------------------------------------------------------- |
|         144 | JUMPDEST     |                                                                                 |
|         145 | POP          |                                                                                 |
|         146 | PUSH2 0x00da | 0xDA                                                                            |
|         149 | PUSH2 0x0153 | 0x0153 0xDA                                                                     |
|         14C | CALLDATASIZE | CALLDATASIZE 0x0153 0xDA                                                        |
|         14D | PUSH1 0x04   | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|         14F | PUSH2 0x018f | 0x018F 0x04 CALLDATASIZE 0x0153 0xDA                                            |
|         152 | JUMP         | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|         18F | JUMPDEST     | 0x04 CALLDATASIZE 0x0153 0xDA                                                   |
|         190 | PUSH1 0x00   | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |
|         192 | PUSH1 0x20   | 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                         |
|         194 | DUP3         | 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                    |
|         195 | DUP5         | CALLDATASIZE 0x04 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                       |
|         196 | SUB          | CALLDATASIZE-4 0x20 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|         197 | SLT          | CALLDATASIZE-4\<32 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|         198 | ISZERO       | CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                           |
|         199 | PUSH2 0x01a0 | 0x01A0 CALLDATASIZE-4>=32 0x00 0x04 CALLDATASIZE 0x0153 0xDA                    |
|         19C | JUMPI        | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                                              |

Inaonekana kama chaguo hili la kukokotoa huchukua angalau baiti 32 (neno moja) la data ya simu.

| Kukabiliana | Opcode | Rafu                                         |
| ----------: | ------ | -------------------------------------------- |
|         19D | DUP1   | 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA      |
|         19E | DUP2   | 0x00 0x00 0x00 0x04 CALLDATASIZE 0x0153 0xDA |
|         19F | REVERT |                                              |

Ikiwa haipati data ya simu, muamala unarudishwa bila data yoyote ya kurudi.

Hebu tuone nini kinatokea ikiwa chaguo la kukokotoa _linapata_ data ya simu inayohitaji.

| Kukabiliana | Opcode       | Rafu                                                        |
| ----------: | ------------ | ----------------------------------------------------------- |
|         1A0 | JUMPDEST     | 0x00 0x04 CALLDATASIZE 0x0153 0xDA                          |
|         1A1 | POP          | 0x04 CALLDATASIZE 0x0153 0xDA                               |
|         1A2 | CALLDATALOAD | calldataload(4) CALLDATASIZE 0x0153 0xDA |

`calldataload(4)` ni neno la kwanza la data ya simu _baada ya_ saini ya mbinu

| Kukabiliana | Opcode       | Rafu                                                                                                                                                                                                               |
| ----------: | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         1A3 | SWAP2        | 0x0153 CALLDATASIZE calldataload(4) 0xDA                                                                                                                                                        |
|         1A4 | SWAP1        | CALLDATASIZE 0x0153 calldataload(4) 0xDA                                                                                                                                                        |
|         1A5 | POP          | 0x0153 calldataload(4) 0xDA                                                                                                                                                                     |
|         1A6 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                            |
|         153 | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                            |
|         154 | PUSH2 0x016e | 0x016E calldataload(4) 0xDA                                                                                                                                                                     |
|         157 | JUMP         | calldataload(4) 0xDA                                                                                                                                                                            |
|         16E | JUMPDEST     | calldataload(4) 0xDA                                                                                                                                                                            |
|         16F | PUSH1 0x04   | 0x04 calldataload(4) 0xDA                                                                                                                                                                       |
|         171 | DUP2         | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                    |
|         172 | DUP2         | 0x04 calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                               |
|         173 | SLOAD        | Ghala[4] calldataload(4) 0x04 calldataload(4) 0xDA                                                                       |
|         174 | DUP2         | calldataload(4) Ghala[4] calldataload(4) 0x04 calldataload(4) 0xDA                                    |
|         175 | LT           | calldataload(4)\<Ghala[4] calldataload(4) 0x04 calldataload(4) 0xDA         |
|         176 | PUSH2 0x017e | 0x017EC calldataload(4)\<Ghala[4] calldataload(4) 0x04 calldataload(4) 0xDA |
|         179 | JUMPI        | calldataload(4) 0x04 calldataload(4) 0xDA                                                                                                                                    |

Ikiwa neno la kwanza si chini ya Ghala[4], chaguo la kukokotoa hushindwa. Inarudi nyuma bila thamani yoyote iliyorejeshwa:

| Kukabiliana | Opcode     | Rafu                                                          |
| ----------: | ---------- | ------------------------------------------------------------- |
|         17A | PUSH1 0x00 | 0x00 ...      |
|         17C | DUP1       | 0x00 0x00 ... |
|         17D | REVERT     |                                                               |

Ikiwa calldataload(4) ni chini ya Ghala[4], tunapata msimbo huu:

| Kukabiliana | Opcode     | Rafu                                                                                      |
| ----------: | ---------- | ----------------------------------------------------------------------------------------- |
|         17E | JUMPDEST   | calldataload(4) 0x04 calldataload(4) 0xDA           |
|         17F | PUSH1 0x00 | 0x00 calldataload(4) 0x04 calldataload(4) 0xDA      |
|         181 | SWAP2      | 0x04 calldataload(4) 0x00 calldataload(4) 0xDA      |
|         182 | DUP3       | 0x00 0x04 calldataload(4) 0x00 calldataload(4) 0xDA |
|         183 | MSTORE     | calldataload(4) 0x00 calldataload(4) 0xDA           |

Na maeneo ya kumbukumbu 0x00-0x1F sasa yana data 0x04 (0x00-0x1E zote ni sifuri, 0x1F ni nne)

| Kukabiliana | Opcode     | Rafu                                                                                                                                                                                                                     |
| ----------: | ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         184 | PUSH1 0x20 | 0x20 calldataload(4) 0x00 calldataload(4) 0xDA                                                                                                                                     |
|         186 | SWAP1      | calldataload(4) 0x20 0x00 calldataload(4) 0xDA                                                                                                                                     |
|         187 | SWAP2      | 0x00 0x20 calldataload(4) calldataload(4) 0xDA                                                                                                                                     |
|         188 | SHA3       | (((SHA3 ya 0x00-0x1F))) calldataload(4) calldataload(4) 0xDA                                                              |
|         189 | ADD        | (((SHA3 ya 0x00-0x1F)))+calldataload(4) calldataload(4) 0xDA                                                              |
|         18A | SLOAD      | Ghala[(((SHA3 ya 0x00-0x1F))) + calldataload(4)] calldataload(4) 0xDA |

Kwa hivyo kuna jedwali la kutafuta katika ghala, ambalo huanza kwenye SHA3 ya 0x000...0004 na lina ingizo kwa kila thamani halali ya data ya simu (thamani iliyo chini ya Ghala[4]).

| Kukabiliana | Opcode | Rafu                                                                                                                                                                                                                     |
| ----------: | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
|         18B | SWAP1  | calldataload(4) Ghala[(((SHA3 ya 0x00-0x1F))) + calldataload(4)] 0xDA |
|         18C | POP    | Ghala[(((SHA3 ya 0x00-0x1F))) + calldataload(4)] 0xDA                                    |
|         18D | DUP2   | 0xDA Ghala[(((SHA3 ya 0x00-0x1F))) + calldataload(4)] 0xDA                               |
|         18E | JUMP   | Ghala[(((SHA3 ya 0x00-0x1F))) + calldataload(4)] 0xDA                                    |

Tayari tunajua [msimbo katika kukabiliana na 0xDA](#the-da-code) unafanya nini, unarudisha thamani ya juu ya rafu kwa mpigaji simu. Kwa hivyo chaguo hili la kukokotoa hurudisha thamani kutoka kwa jedwali la utafutaji hadi kwa mpigaji simu.

## 0x1f135823 {#0x1f135823}

Msimbo katika makabiliano 0xC4-0xCF ni sawa na tulivyoona katika 0x103-0x10E katika `splitter()` (isipokuwa marudio ya `JUMPI`), kwa hivyo tunajua chaguo hili la kukokotoa pia haliwezi `kulipwa`.

| Kukabiliana | Opcode       | Rafu                |
| ----------: | ------------ | ------------------- |
|          D0 | JUMPDEST     |                     |
|          D1 | POP          |                     |
|          D2 | PUSH2 0x00da | 0xDA                |
|          D5 | PUSH1 0x06   | 0x06 0xDA           |
|          D7 | SLOAD        | Thamani\* 0xDA      |
|          D8 | DUP2         | 0xDA Thamani\* 0xDA |
|          D9 | JUMP         | Thamani\* 0xDA      |

Tayari tunajua [msimbo katika kukabiliana na 0xDA](#the-da-code) unafanya nini, unarudisha thamani ya juu ya rafu kwa mpigaji simu. Kwa hivyo chaguo hili la kukokotoa hurudisha `Thamani*`.

### Muhtasari wa Njia {#method-summary}

Je, unahisi unaelewa mkataba katika hatua hii? Mimi sielewi. Kufikia sasa tuna njia hizi:

| Njia                                                 | Maana                                                                                                                                  |
| ---------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hamisha                                              | Kubali thamani iliyotolewa na simu na uongeze `Thamani*` kwa kiasi hicho                                                               |
| [splitter()](#splitter)           | Rudisha Ghala[3], anwani ya proksi                                                 |
| [currentWindow()](#currentwindow) | Rudisha Ghala[1]                                                                   |
| [merkleRoot()](#merkeroot)        | Rudisha Ghala[0]                                                                   |
| [0x81e580d3](#0x81e580d3)                            | Rudisha thamani kutoka kwa jedwali la utafutaji, mradi kigezo ni chini ya Ghala[4] |
| [0x1f135823](#0x1f135823)                            | Rudisha Ghala[6], a.k.a. Thamani\* |

Lakini tunajua utendakazi mwingine wowote hutolewa na mkataba katika Ghala[3]. Labda ikiwa tungejua mkataba huo ni nini utatupa kidokezo. Kwa bahati nzuri, hii ni blockchain na kila kitu kinajulikana, angalau kwa nadharia. Hatukuona njia zozote ambazo zinaweka Ghala[3], kwa hivyo lazima iwe imewekwa na mjenzi.

## Mjenzi {#the-constructor}

Tunapo[angalia mkataba](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f) tunaweza pia kuona muamala ulioiunda.

![Bofya muamala wa kuunda](create-tx.png)

Ikiwa tutabofya muamala huo, na kisha kichupo cha **Hali**, tunaweza kuona thamani za awali za vigezo. Hasa, tunaweza kuona kwamba Ghala[3] ina [0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761](https://etherscan.io/address/0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761). Mkataba huo lazima uwe na utendakazi unaokosekana. Tunaweza kuielewa kwa kutumia zana zile zile tulizotumia kwa mkataba tunaouchunguza.

## Mkataba wa Proksi {#the-proxy-contract}

Kwa kutumia mbinu zile zile tulizotumia kwa mkataba wa asili hapo juu tunaweza kuona kwamba mkataba unarudi nyuma ikiwa:

- Kuna ETH yoyote iliyoambatishwa kwenye simu (0x05-0x0F)
- Ukubwa wa data ya simu ni chini ya nne (0x10-0x19 na 0xBE-0xC2)

Na kwamba mbinu inazotumia ni:

| Njia                                                                                                                                                                                   | Sahihi ya njia               | Kukabiliana na kuruka ndani |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------- |
| [scaleAmountByPercentage(uint256,uint256)](https://www.4byte.directory/signatures/?bytes4_signature=0x8ffb5c97)                                                     | 0x8ffb5c97                   | 0x0135                      |
| [isClaimed(uint256,address)](https://www.4byte.directory/signatures/?bytes4_signature=0xd2ef0795)                                                                   | 0xd2ef0795                   | 0x0151                      |
| [claim(uint256,address,uint256,bytes32[])](https://www.4byte.directory/signatures/?bytes4_signature=0x2e7ba6ef) | 0x2e7ba6ef                   | 0x00F4                      |
| [incrementWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0x338b1d31)                                                                            | 0x338b1d31                   | 0x0110                      |
| ???                                                                                                                                                                                    | 0x3f26479e                   | 0x0118                      |
| ???                                                                                                                                                                                    | 0x1e7df9d3                   | 0x00C3                      |
| [currentWindow()](https://www.4byte.directory/signatures/?bytes4_signature=0xba0bafb4)                                                                              | [0xba0bafb4](#currentwindow) | 0x0148                      |
| [merkleRoot()](https://www.4byte.directory/signatures/?bytes4_signature=0x2eb4a7ab)                                                                                 | [0x2eb4a7ab](#merkleroot)    | 0x0107                      |
| ???                                                                                                                                                                                    | [0x81e580d3](#0x81e580d3)    | 0x0122                      |
| ???                                                                                                                                                                                    | [0x1f135823](#0x1f135823)    | 0x00D8                      |

Tunaweza kupuuza njia nne za chini kwa sababu hatutawahi kuzifikia. Sahihi zao ni kwamba mkataba wetu wa asili unazishughulikia wenyewe (unaweza kubofya sahihi ili kuona maelezo hapo juu), kwa hivyo lazima ziwe [mbinu ambazo zimebatilishwa](https://medium.com/upstate-interactive/solidity-override-vs-virtual-functions-c0a5dfb83aaf).

Moja ya njia zilizobaki ni `claim(<params>)`, na nyingine ni `isClaimed(<params>)`, kwa hivyo inaonekana kama mkataba wa airdrop. Badala ya kupitia opcode zilizobaki kwa opcode, tunaweza [kujaribu decompiler](https://etherscan.io/bytecode-decompiler?a=0x2f81e57ff4f4d83b40a9f719fd892d8e806e0761), ambayo hutoa matokeo yanayoweza kutumika kwa chaguo tatu za kukokotoa kutoka kwa mkataba huu. Uhandisi wa nyuma wa zingine zimeachwa kama zoezi kwa msomaji.

### scaleAmountByPercentage {#scaleamountbypercentage}

Hivi ndivyo decompiler inatupa kwa chaguo hili la kukokotoa:

```python
def unknown8ffb5c97(uint256 _param1, uint256 _param2) payable:
  require calldata.size - 4 >=′ 64
  if _param1 and _param2 > -1 / _param1:
      revert with 0, 17
  return (_param1 * _param2 / 100 * 10^6)
```

Kwanza `require` hujaribu kuwa data ya simu ina, pamoja na baiti nne za saini ya chaguo la kukokotoa, angalau baiti 64, za kutosha kwa vigezo viwili. Ikiwa sivyo basi ni wazi kuna kitu kibaya.

Taarifa ya `if` inaonekana kuangalia kwamba `_param1` sio sifuri, na kwamba `_param1 * _param2` si hasi. Pengine ni kuzuia kesi za kuzunguka.

Hatimaye, chaguo la kukokotoa hurudisha thamani iliyopimwa.

### dai {#claim}

Msimbo ambao decompiler hutengeneza ni mgumu, na sio wote unaofaa kwetu. Nitaruka baadhi yake ili kuzingatia mistari ambayo ninaamini inatoa habari muhimu

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
      revert with 0, 'Akaunti tayari imedai dirisha lililopewa'
```

Kwa hivyo sasa tunajua kuwa Ghala[5] ni safu ya madirisha na anwani, na ikiwa anwani ilidai zawadi kwa dirisha hilo.

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
      revert with 0, 'Uthibitisho batili'
```

Tunajua kwamba `unknown2eb4a7ab` kwa kweli ni chaguo la kukokotoa `merkleRoot()`, kwa hivyo msimbo huu unaonekana kana kwamba unathibitisha [uthibitisho wa merkle](https://medium.com/crypto-0-nite/merkle-proofs-explained-6dd429623dc5). Hii inamaanisha kuwa `_param4` ni uthibitisho wa merkle.

```python
  call addr(_param2) with:
     value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
       gas 30000 wei
```

Hivi ndivyo mkataba unavyohamisha ETH yake kwa anwani nyingine (mkataba au inayomilikiwa nje). Inaiita kwa thamani ambayo ni kiasi cha kuhamishwa. Kwa hivyo inaonekana kama hii ni airdrop ya ETH.

```python
  if not return_data.size:
      if not ext_call.success:
          require ext_code.size(stor2)
          call stor2.deposit() with:
             value unknown81e580d3[_param1] * _param3 / 100 * 10^6 wei
```

Mistari miwili ya chini inatuambia kwamba Ghala[2] pia ni mkataba tunaopiga simu. Tuki[angalia muamala wa mjenzi](https://etherscan.io/tx/0xa1ea0549fb349eb7d3aff90e1d6ce7469fdfdcd59a2fd9b8d1f5e420c0d05b58#statechange) tunaona kwamba mkataba huu ni [0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2), mkataba wa Wrapped Ether [ambao msimbo wake chanzo umepakiwa kwenye Etherscan](https://etherscan.io/address/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2#code).

Kwa hivyo inaonekana kama mikataba inajaribu kutuma ETH kwa `_param2`. Ikiwa inaweza kufanya hivyo, vizuri. Ikiwa sivyo, inajaribu kutuma [WETH](https://weth.tkn.eth.limo/). Ikiwa `_param2` ni akaunti inayomilikiwa nje (EOA) basi inaweza kupokea ETH kila wakati, lakini mikataba inaweza kukataa kupokea ETH. Hata hivyo, WETH ni ERC-20 na mikataba haiwezi kukataa kuikubali.

```python
  ...
  log 0xdbd5389f: addr(_param2), unknown81e580d3[_param1] * _param3 / 100 * 10^6, bool(ext_call.success)
```

Mwishoni mwa chaguo la kukokotoa tunaona ingizo la logi likitengenezwa. [Angalia maingizo ya kumbukumbu yaliyotokana](https://etherscan.io/address/0x2510c039cc3b061d79e564b38836da87e31b342f#events) na uchuje mada inayoanza na `0xdbd5...`. Ikiwa [tutabofya moja ya miamala iliyozalisha ingizo kama hilo](https://etherscan.io/tx/0xe7d3b7e00f645af17dfbbd010478ef4af235896c65b6548def1fe95b3b7d2274) tunaona kwamba kwa hakika inaonekana kama dai - akaunti ilituma ujumbe kwa mkataba tunaoufanyia uhandisi wa nyuma, na kwa malipo ilipata ETH.

![Muamala wa dai](claim-tx.png)

### 1e7df9d3 {#1e7df9d3}

Chaguo hili la kukokotoa linafanana sana na [`claim`](#claim) hapo juu. Pia hukagua uthibitisho wa merkle, hujaribu kuhamisha ETH hadi ya kwanza, na hutoa aina sawa ya ingizo la logi.

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
      revert with 0, 'Uthibitisho batili'
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

Tofauti kuu ni kwamba kigezo cha kwanza, dirisha la kutoa, halipo. Badala yake, kuna kitanzi juu ya madirisha yote ambayo yanaweza kudaiwa.

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

Kwa hivyo inaonekana kama lahaja ya `claim` inayodai madirisha yote.

## Hitimisho {#conclusion}

Kufikia sasa unapaswa kujua jinsi ya kuelewa mikataba ambayo msimbo wake chanzo haupatikani, kwa kutumia opcodes au (inapofanya kazi) decompiler. Kama inavyodhihirika kutokana na urefu wa makala haya, uhandisi wa nyuma wa mkataba si jambo dogo, lakini katika mfumo ambapo usalama ni muhimu ni ujuzi muhimu kuweza kuthibitisha mikataba inavyofanya kazi kama ilivyoahidiwa.

[Tazama hapa kwa kazi zangu zaidi](https://cryptodocguy.pro/).
