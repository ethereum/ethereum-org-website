---
title: Kuelewa Vigezo vya EVM vya Karatasi ya Njano
description: Kuelewa sehemu ya Karatasi ya Njano, vigezo rasmi vya Ethereum, ambayo inaeleza mashine halisi ya ethereum (EVM).
author: "qbzzt"
tags: [ "evm" ]
skill: intermediate
lang: sw
published: 2022-05-15
---

[Karatasi ya Njano](https://ethereum.github.io/yellowpaper/paper.pdf) ndicho kigezo rasmi cha Ethereum. Isipokuwa pale inapofanyiwa marekebisho na [mchakato wa EIP](/eips/), ina maelezo kamili ya jinsi kila kitu kinavyofanya kazi. Imeandikwa kama karatasi ya kihisabati, ambayo inajumuisha istilahi ambazo waandaaji wa programu wanaweza wasizifahamu. Katika karatasi hii unajifunza jinsi ya kuisoma, na kwa nyongeza karatasi zingine zinazohusiana za kihisabati.

## Karatasi ya Njano ipi? {#which-yellow-paper}

Kama karibu kila kitu kingine katika Ethereum, Karatasi ya Njano hubadilika kadri muda unavyopita. Ili kuweza kurejelea toleo maalum, nilipakia [toleo la sasa wakati wa kuandika](yellow-paper-berlin.pdf). Nambari za sehemu, ukurasa, na milinganyo ninazotumia zitarejelea toleo hilo. Ni wazo zuri kuifungua kwenye dirisha tofauti unaposoma waraka huu.

### Kwa nini EVM? {#why-the-evm}

Karatasi ya njano ya asili iliandikwa mwanzoni kabisa mwa maendeleo ya Ethereum. Inaelezea utaratibu wa makubaliano wa asili unaotegemea uthibitisho-wa-kazi ambao ulitumiwa hapo awali kulinda mtandao. Hata hivyo, Ethereum ilizima uthibitisho-wa-kazi na kuanza kutumia makubaliano yanayotegemea uthibitisho-wa-hisa mnamo Septemba 2022. Mafunzo haya yatazingatia sehemu za karatasi ya njano zinazofafanua Mashine Halisi ya Ethereum. EVM haikubadilika kutokana na mpito wa kwenda kwenye uthibitisho-wa-hisa (isipokuwa kwa thamani ya kurudisha ya opcode ya DIFFICULTY).

## 9 Mfumo wa utekelezaji {#9-execution-model}

Sehemu hii (uk. 12-14) inajumuisha ufafanuzi mwingi wa EVM.

Neno _hali ya mfumo_ linajumuisha kila kitu unachohitaji kujua kuhusu mfumo ili kuuendesha. Katika kompyuta ya kawaida, hii inamaanisha kumbukumbu, maudhui ya rejista, n.k.

[Mashine ya Turing](https://en.wikipedia.org/wiki/Turing_machine) ni mfumo wa kikokotozi. Kimsingi, ni toleo lililorahisishwa la kompyuta, ambalo limethibitishwa kuwa na uwezo sawa wa kufanya makokotoo kama kompyuta ya kawaida (kila kitu ambacho kompyuta inaweza kukokotoa, mashine ya Turing inaweza kukokotoa na kinyume chake). Mfumo huu hurahisisha kuthibitisha nadharia mbalimbali kuhusu kile kinachoweza na kisichoweza kukokotolewa.

Neno [Turing-complete](https://en.wikipedia.org/wiki/Turing_completeness) linamaanisha kompyuta inayoweza kufanya makokotoo sawa na mashine ya Turing. Mashine za Turing zinaweza kuingia kwenye mizunguko isiyo na kikomo, na EVM haiwezi kwa sababu ingeishiwa na gesi, kwa hivyo ni quasi-Turing-complete pekee.

## 9.1 Misingi {#91-basics}

Sehemu hii inatoa misingi ya EVM na jinsi inavyolinganishwa na mifumo mingine ya kikokotozi.

[Mashine ya mrundikano](https://en.wikipedia.org/wiki/Stack_machine) ni kompyuta inayohifadhi data za kati si katika rejista, bali katika [**mrundikano**](https://en.wikipedia.org/wiki/Stack_\(abstract_data_type\)). Huu ndio usanifu unaopendelewa kwa mashine halisi kwa sababu ni rahisi kutekeleza ikimaanisha kuwa hitilafu, na udhaifu wa kiusalama, haviwezekani sana. Kumbukumbu katika mrundikano imegawanywa katika maneno ya biti-256. Hii ilichaguliwa kwa sababu inafaa kwa shughuli za msingi za kriptografia za Ethereum kama vile uhashishaji wa Keccak-256 na makokotoo ya mzingo duaradufu. Ukubwa wa juu wa mrundikano ni vipengee 1024 (biti 1024 x 256). Wakati opcode zinapotekelezwa kwa kawaida hupata vigezo vyao kutoka kwenye mrundikano. Kuna opcode mahususi za kupanga upya vipengele katika mrundikano kama vile `POP` (huondoa kipengee kutoka juu ya mrundikano), `DUP_N` (kipengee cha N' kilichorudiwa katika mrundikano), n.k.

EVM pia ina nafasi tete inayoitwa **kumbukumbu** ambayo hutumika kuhifadhi data wakati wa utekelezaji. Kumbukumbu hii imepangwa katika maneno ya baiti 32. Maeneo yote ya kumbukumbu yanaanzishwa hadi sifuri. Ukiitekeleza msimbo huu wa [Yul](https://docs.soliditylang.org/en/latest/yul.html) ili kuongeza neno kwenye kumbukumbu, itajaza baiti 32 za kumbukumbu kwa kujaza nafasi tupu katika neno na sufuri, yaani, inaunda neno moja - lenye sufuri katika maeneo 0-29, 0x60 hadi 30, na 0xA7 hadi 31.

```yul
mstore(0, 0x60A7)
```

`mstore` ni moja ya opcode tatu ambazo EVM hutoa kwa ajili ya kuingiliana na kumbukumbu - hupakia neno kwenye kumbukumbu. Nyingine mbili ni `mstore8` ambayo hupakia baiti moja kwenye kumbukumbu, na `mload` ambayo huhamisha neno kutoka kwenye kumbukumbu hadi kwenye mrundikano.

EVM pia ina mfumo tofauti wa **hifadhi** isiyo tete ambao hudumishwa kama sehemu ya hali ya mfumo - kumbukumbu hii imepangwa katika safu za maneno (kinyume na safu za baiti zinazoweza kushughulikiwa na maneno kwenye mrundikano). Hifadhi hii ndipo mikataba huhifadhi data za kudumu - mkataba unaweza tu kuingiliana na hifadhi yake yenyewe. Hifadhi imepangwa katika ramani za thamani muhimu.

Ingawa haijatajwa katika sehemu hii ya Karatasi ya Njano, ni muhimu pia kujua kuna aina ya nne ya kumbukumbu. **Calldata** ni kumbukumbu ya kusoma tu inayoweza kushughulikiwa na baiti inayotumiwa kuhifadhi thamani iliyopitishwa na kigezo cha `data` cha muamala. EVM ina opcode maalum za kudhibiti `calldata`. `calldatasize` hurudisha ukubwa wa data. `calldataload` hupakia data kwenye mrundikano. `calldatacopy` hunakili data kwenye kumbukumbu.

Usanifu wa kawaida wa [Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) huhifadhi msimbo na data katika kumbukumbu moja. EVM haifuati kiwango hiki kwa sababu za kiusalama - kushiriki kumbukumbu tete hufanya iwezekane kubadilisha msimbo wa programu. Badala yake, msimbo huhifadhiwa kwenye hifadhi.

Kuna visa viwili tu ambavyo msimbo hutekelezwa kutoka kwa kumbukumbu:

- Wakati mkataba unaunda mkataba mwingine (kwa kutumia [`CREATE`](https://www.evm.codes/#f0) au [`CREATE2`](https://www.evm.codes/#f5)), msimbo wa mjenzi wa mkataba hutoka kwenye kumbukumbu.
- Wakati wa uundaji wa mkataba _wowote_, msimbo wa mjenzi huendeshwa na kisha hurudi na msimbo wa mkataba halisi, pia kutoka kwenye kumbukumbu.

Neno utekelezaji wa kipekee linamaanisha tukio la kipekee linalosababisha utekelezaji wa mkataba wa sasa kusitishwa.

## 9.2 Muhtasari wa ada {#92-fees-overview}

Sehemu hii inaeleza jinsi ada za gesi zinavyokokotolewa. Kuna gharama tatu:

### Gharama ya opcode {#opcode-cost}

Gharama ya asili ya opcode maalum. Ili kupata thamani hii, pata kikundi cha gharama cha opcode katika Kiambatisho H (uk. 28, chini ya mlinganyo (327)), na pata kikundi cha gharama katika mlinganyo (324). Hii inakupa kazi ya gharama, ambayo katika hali nyingi hutumia vigezo kutoka Kiambatisho G (uk. 27).

Kwa mfano, opcode [`CALLDATACOPY`](https://www.evm.codes/#37) ni mwanachama wa kikundi _W<sub>nakala</sub>_. Gharama ya opcode kwa kikundi hicho ni _G<sub>chinichini</sub>+G<sub>nakala</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Tukiangalia Kiambatisho G, tunaona kwamba vibaki vyote viwili ni 3, ambayo inatupa _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Bado tunahitaji kufafanua usemi _⌈μ<sub>s</sub>[2]÷32⌉_. Sehemu ya nje kabisa, _⌈ \<thamani\> ⌉_ ni kazi ya dari, kazi ambayo ikipewa thamani hurudisha nambari kamili ndogo zaidi ambayo bado si ndogo kuliko thamani. Kwa mfano, _⌈2.5⌉ = ⌈3⌉ = 3_. Sehemu ya ndani ni _μ<sub>s</sub>[2]÷32_. Tukiangalia sehemu ya 3 (Mikataba) kwenye uk. 3, _μ_ ni hali ya mashine. Hali ya mashine imefafanuliwa katika sehemu ya 9.4.1 kwenye uk. 13. Kulingana na sehemu hiyo, moja ya vigezo vya hali ya mashine ni _s_ kwa ajili ya mrundikano. Tukiweka yote pamoja, inaonekana kwamba _μ<sub>s</sub>[2]_ ni eneo #2 kwenye mrundikano. Tukiangalia [opcode](https://www.evm.codes/#37), eneo #2 kwenye mrundikano ni ukubwa wa data katika baiti. Tukiangalia opcode zingine katika kikundi W<sub>nakala</sub>, [`CODECOPY`](https://www.evm.codes/#39) na [`RETURNDATACOPY`](https://www.evm.codes/#3e), pia zina ukubwa wa data katika eneo lile lile. Kwa hivyo _⌈μ<sub>s</sub>[2]÷32⌉_ ni idadi ya maneno ya baiti 32 yanayohitajika kuhifadhi data inayakiliwa. Tukiweka kila kitu pamoja, gharama ya asili ya [`CALLDATACOPY`](https://www.evm.codes/#37) ni gesi 3 pamoja na 3 kwa kila neno la data inayakiliwa.

### Gharama ya kuendesha {#running-cost}

Gharama ya kuendesha msimbo tunaouita.

- Katika kisa cha [`CREATE`](https://www.evm.codes/#f0) na [`CREATE2`](https://www.evm.codes/#f5), mjenzi wa mkataba mpya.
- Katika kisa cha [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), au [`DELEGATECALL`](https://www.evm.codes/#f4), mkataba tunaouita.

### Kupanua gharama ya kumbukumbu {#expanding-memory-cost}

Gharama ya kupanua kumbukumbu (ikiwa ni lazima).

Katika mlinganyo wa 324, thamani hii imeandikwa kama _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Tukiangalia tena sehemu ya 9.4.1, tunaona kwamba _μ<sub>i</sub>_ ni idadi ya maneno katika kumbukumbu. Kwa hivyo _μ<sub>i</sub>_ ni idadi ya maneno katika kumbukumbu kabla ya opcode na _μ<sub>i</sub>'_ ni idadi ya maneno katika kumbukumbu baada ya opcode.

Kazi _C<sub>mem</sub>_ imefafanuliwa katika mlinganyo wa 326: _C<sub>mem</sub>(a) = G<sub>kumbukumbu</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ ni kazi ya sakafu, kazi ambayo ikipewa thamani hurudisha nambari kamili kubwa zaidi ambayo bado si kubwa kuliko thamani. Kwa mfano, _⌊2.5⌋ = ⌊2⌋ = 2._ Wakati _a < √512_, _a<sup>2</sup> < 512_, na matokeo ya kazi ya sakafu ni sifuri. Kwa hivyo kwa maneno 22 ya kwanza (baiti 704), gharama huongezeka kwa mstari na idadi ya maneno ya kumbukumbu yanayohitajika. Zaidi ya hapo _⌊a<sup>2</sup> ÷ 512⌋_ ni chanya. Wakati kumbukumbu inayohitajika ni ya juu vya kutosha gharama ya gesi ni sawia na mraba wa kiasi cha kumbukumbu.

**Kumbuka** kwamba vipengele hivi huathiri tu gharama ya gesi ya _asili_ - haizingatii soko la ada au vidokezo kwa wathibitishaji ambavyo huamua ni kiasi gani mtumiaji wa mwisho anahitajika kulipa - hii ni gharama ghafi tu ya kuendesha operesheni fulani kwenye EVM.

[Soma zaidi kuhusu gesi](/developers/docs/gas/).

## 9.3 Mazingira ya utekelezaji {#93-execution-env}

Mazingira ya utekelezaji ni jozi, _I_, inayojumuisha taarifa ambazo si sehemu ya hali ya mnyororo wa bloku au EVM.

| Kigezo          | Opcode ya kufikia data                                                                                                   | Msimbo wa Solidity wa kufikia data                      |
| --------------- | ------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                                   | `anwani(this)`                                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                                    | `tx.origin`                                             |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                                  | `tx.gasprice`                                           |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), nk.                                                         | `msg.data`                                              |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                                    | `msg.sender`                                            |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                                 | `msg.value`                                             |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                                  | `address(this).code`                                    |
| _I<sub>H</sub>_ | Sehemu za kichwa cha bloku, kama vile [`NUMBER`](https://www.evm.codes/#43) na [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, nk. |
| _I<sub>e</sub>_ | Kina cha mrundikano wa simu kwa simu kati ya mikataba (pamoja na uundaji wa mkataba)                  |                                                         |
| _I<sub>w</sub>_ | Je, EVM inaruhusiwa kubadilisha hali, au inaendeshwa kitakwimu                                                           |                                                         |

Vigezo vingine vichache ni muhimu kuelewa salio la sehemu ya 9:

| Kigezo | Imefafanuliwa katika sehemu                                     | Maana                                                                                                                                                                                                                                                  |
| ------ | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| _σ_    | 2 (uk. 2, mlinganyo 1)       | Hali ya mnyororo wa bloku                                                                                                                                                                                                                              |
| _g_    | 9.3 (uk. 13) | Gesi iliyobaki                                                                                                                                                                                                                                         |
| _A_    | 6.1 (uk. 8)  | Hali ndogo iliyokusanywa (mabadiliko yaliyopangwa kwa wakati muamala unapoisha)                                                                                                                                                     |
| _o_    | 9.3 (uk. 13) | Matokeo - matokeo yaliyorudishwa katika kisa cha muamala wa ndani (wakati mkataba mmoja unapopiga simu mwingine) na simu za kutazama kazi (wakati unauliza tu habari, kwa hivyo hakuna haja ya kusubiri muamala) |

## 9.4 Muhtasari wa utekelezaji {#94-execution-overview}

Sasa kwa kuwa tuna matayarisho yote, hatimaye tunaweza kuanza kufanyia kazi jinsi EVM inavyofanya kazi.

Milinganyo 137-142 inatupa hali za awali za kuendesha EVM:

| Alama            | Thamani ya awali                                                                 | Maana                                                                                                                                                                                                                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_                                                                              | Gesi iliyobaki                                                                                                                                                                                                                                                                                                |
| _μ<sub>pc</sub>_ | _0_                                                                              | Kaunta ya programu, anwani ya maagizo yafuatayo ya kutekeleza                                                                                                                                                                                                                                                 |
| _μ<sub>m</sub>_  | _(0, 0, ...)_ | Kumbukumbu, iliyoanzishwa kwa sufuri zote                                                                                                                                                                                                                                                                     |
| _μ<sub>i</sub>_  | _0_                                                                              | Eneo la juu zaidi la kumbukumbu lililotumika                                                                                                                                                                                                                                                                  |
| _μ<sub>s</sub>_  | _()_                                                          | Mrundikano, awali ulikuwa tupu                                                                                                                                                                                                                                                                                |
| _μ<sub>o</sub>_  | _∅_                                                                              | Matokeo, seti tupu hadi na isipokuwa tusimame ama na data ya kurudi ([`RETURN`](https://www.evm.codes/#f3) au [`REVERT`](https://www.evm.codes/#fd)) au bila hiyo ([`STOP`](https://www.evm.codes/#00) au [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Mlinganyo wa 143 unatuambia kuna hali nne zinazowezekana wakati wowote wakati wa utekelezaji, na nini cha kufanya nazo:

1. `Z(σ,μ,A,I)`. Z inawakilisha kazi inayojaribu ikiwa operesheni inaunda mpito wa hali batili (tazama [kusitishwa kwa kipekee](#942-exceptional-halting)). Ikiwa itatathmini kuwa Kweli, hali mpya ni sawa na ile ya zamani (isipokuwa gesi inachomwa) kwa sababu mabadiliko hayajatekelezwa.
2. Ikiwa opcode inayotekelezwa ni [`REVERT`](https://www.evm.codes/#fd), hali mpya ni sawa na hali ya zamani, gesi fulani inapotea.
3. Ikiwa mfuatano wa operesheni umekamilika, kama inavyoonyeshwa na [`RETURN`](https://www.evm.codes/#f3)), hali inasasishwa kuwa hali mpya.
4. Ikiwa hatuko katika mojawapo ya hali za mwisho 1-3, endelea kuendesha.

## 9.4.1 Hali ya Mashine {#941-machine-state}

Sehemu hii inaeleza hali ya mashine kwa undani zaidi. Inabainisha kuwa _w_ ni opcode ya sasa. Ikiwa _μ<sub>pc</sub>_ ni chini ya _||I<sub>b</sub>||_, urefu wa msimbo, basi baiti hiyo (_I<sub>b</sub>[μ<sub>pc</sub>]_) ni opcode. Vinginevyo, opcode inafafanuliwa kama [`STOP`](https://www.evm.codes/#00).

Kwa kuwa hii ni [mashine ya mrundikano](https://en.wikipedia.org/wiki/Stack_machine), tunahitaji kufuatilia idadi ya vipengee vilivyotolewa (_δ_) na kusukumwa ndani (_α_) na kila opcode.

## 9.4.2 Kusitishwa kwa Kipekee {#942-exceptional-halt}

Sehemu hii inafafanua kazi ya _Z_, ambayo inabainisha wakati tuna usitishwaji usio wa kawaida. Hii ni kazi ya [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), kwa hivyo hutumia [_∨_ kwa mantiki au](https://en.wikipedia.org/wiki/Logical_disjunction) na [_∧_ kwa mantiki na](https://en.wikipedia.org/wiki/Logical_conjunction).

Tuna usitishwaji wa kipekee ikiwa mojawapo ya hali hizi ni kweli:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Kama tulivyoona katika sehemu ya 9.2, _C_ ni kazi inayobainisha gharama ya gesi. Hakuna gesi ya kutosha iliyobaki kufunika opcode inayofuata.

- **_δ<sub>w</sub>=∅_**
  Ikiwa idadi ya vipengee vilivyotolewa kwa opcode haijafafanuliwa, basi opcode yenyewe haijafafanuliwa.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Mrundikano chini ya mtiririko, hakuna vipengee vya kutosha katika mrundikano kwa opcode ya sasa.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Opcode ni [`JUMP`](https://www.evm.codes/#56) na anwani si [`JUMPDEST`](https://www.evm.codes/#5b). Miruko ni halali _tu_ wakati lengo ni [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Opcode ni [`JUMPI`](https://www.evm.codes/#57), hali ni kweli (sio sifuri) kwa hivyo mruko unapaswa kutokea, na anwani si [`JUMPDEST`](https://www.evm.codes/#5b). Miruko ni halali _tu_ wakati lengo ni [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Opcode ni [`RETURNDATACOPY`](https://www.evm.codes/#3e). Katika opcode hii kipengele cha mrundikano _μ<sub>s</sub>[1]_ ni kukabiliana na kusoma kutoka kwenye bafa ya data ya kurudi, na kipengele cha mrundikano _μ<sub>s</sub>[2]_ ni urefu wa data. Hali hii hutokea unapojaribu kusoma zaidi ya mwisho wa bafa ya data ya kurudi. Kumbuka kuwa hakuna hali sawa kwa calldata au kwa msimbo wenyewe. Unapojaribu kusoma zaidi ya mwisho wa bafa hizo unapata tu sifuri.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Kufurika kwa mrundikano. Ikiwa kuendesha opcode kutasababisha mrundikano wa zaidi ya vipengee 1024, sitisha.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Je, tunaendesha kitakwimu ([¬ ni ukanushaji](https://en.wikipedia.org/wiki/Negation) na _I<sub>w</sub>_ ni kweli tunaporuhusiwa kubadilisha hali ya mnyororo wa bloku)? Ikiwa ndivyo, na tunajaribu operesheni ya kubadilisha hali, haiwezi kutokea.

  Kazi _W(w,μ)_ imefafanuliwa baadaye katika mlinganyo wa 150. _W(w,μ)_ ni kweli ikiwa mojawapo ya hali hizi ni kweli:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Opcode hizi hubadilisha hali, ama kwa kuunda mkataba mpya, kuhifadhi thamani, au kuharibu mkataba wa sasa.

  - **_LOG0≤w ∧ w≤LOG4_**
    Ikiwa tunaitwa kitakwimu hatuwezi kutoa maingizo ya kumbukumbu.
    Opcode za kumbukumbu zote ziko katika safu kati ya [`LOG0` (A0)](https://www.evm.codes/#a0) na [`LOG4` (A4)](https://www.evm.codes/#a4).
    Nambari baada ya opcode ya kumbukumbu inabainisha ni mada ngapi ingizo la kumbukumbu lina.

  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Unaweza kuita mkataba mwingine ukiwa katika hali tuli, lakini ukifanya hivyo huwezi kuhamisha ETH kwake.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Huwezi kuendesha [`SSTORE`](https://www.evm.codes/#55) isipokuwa uwe na zaidi ya G<sub>callstipend</sub> (iliyofafanuliwa kama 2300 katika Kiambatisho G) gesi.

## 9.4.3 Uhalali wa Lengo la Mruko {#943-jump-dest-valid}

Hapa tunafafanua rasmi ni zipi opcode za [`JUMPDEST`](https://www.evm.codes/#5b). Hatuwezi tu kutafuta thamani ya baiti 0x5B, kwa sababu inaweza kuwa ndani ya PUSH (na kwa hivyo data na si opcode).

Katika mlinganyo (153) tunafafanua kazi, _N(i,w)_. Kigezo cha kwanza, _i_, ni eneo la opcode. Ya pili, _w_, ni opcode yenyewe. Ikiwa _w∈[PUSH1, PUSH32]_ hiyo inamaanisha opcode ni PUSH (mabano ya mraba hufafanua safu inayojumuisha ncha za mwisho). Ikiwa kisa hicho opcode inayofuata iko kwenye _i+2+(w−PUSH1)_. Kwa [`PUSH1`](https://www.evm.codes/#60) tunahitaji kusonga mbele kwa baiti mbili (PUSH yenyewe na thamani ya baiti moja), kwa [`PUSH2`](https://www.evm.codes/#61) tunahitaji kusonga mbele kwa baiti tatu kwa sababu ni thamani ya baiti mbili, nk. Opcode zingine zote za EVM zina urefu wa baiti moja tu, kwa hivyo katika visa vingine vyote _N(i,w)=i+1_.

Kazi hii inatumiwa katika mlinganyo (152) kufafanua _D<sub>J</sub>(c,i)_, ambayo ni [seti](https://en.wikipedia.org/wiki/Set_\(mathematics\)) ya malengo yote halali ya mruko katika msimbo _c_, kuanzia na eneo la opcode _i_. Kazi hii inafafanuliwa kwa kujirudia. Ikiwa _i≥||c||_, hiyo inamaanisha kuwa tuko mwisho au baada ya mwisho wa msimbo. Hatutapata malengo mengine yoyote ya mruko, kwa hivyo rudisha tu seti tupu.

Katika visa vingine vyote tunaangalia salio la msimbo kwa kwenda kwenye opcode inayofuata na kupata seti kuanzia hapo. _c[i]_ ni opcode ya sasa, kwa hivyo _N(i,c[i])_ ni eneo la opcode inayofuata. _D<sub>J</sub>(c,N(i,c[i]))_ kwa hivyo ni seti ya malengo halali ya mruko inayoanzia kwenye opcode inayofuata. Ikiwa opcode ya sasa si `JUMPDEST`, rudisha tu seti hiyo. Ikiwa ni `JUMPDEST`, ijumuishwe kwenye seti ya matokeo na urudishe hiyo.

## 9.4.4 Kusitishwa kwa kawaida {#944-normal-halt}

Kazi ya kusitisha _H_, inaweza kurudisha aina tatu za thamani.

- Ikiwa hatuko katika opcode ya kusitisha, rudisha _∅_, seti tupu. Kwa mkataba, thamani hii inatafsiriwa kama Boolean ya uongo.
- Ikiwa tuna opcode ya kusitisha ambayo haitoi matokeo (ama [`STOP`](https://www.evm.codes/#00) au [`SELFDESTRUCT`](https://www.evm.codes/#ff)), rudisha mfuatano wa baiti za ukubwa sifuri kama thamani ya kurudi. Kumbuka kuwa hii ni tofauti sana na seti tupu. Thamani hii inamaanisha kuwa EVM kweli ilisitisha, ni kwamba tu hakuna data ya kurudi ya kusoma.
- Ikiwa tuna opcode ya kusitisha ambayo inatoa matokeo (ama [`RETURN`](https://www.evm.codes/#f3) au [`REVERT`](https://www.evm.codes/#fd)), rudisha mfuatano wa baiti zilizobainishwa na opcode hiyo. Mfuatano huu unachukuliwa kutoka kwenye kumbukumbu, thamani iliyo juu ya mrundikano (_μ<sub>s</sub>[0]_) ni baiti ya kwanza, na thamani baada yake (_μ<sub>s</sub>[1]_) ni urefu.

## H.2 Seti ya maagizo {#h2-instruction-set}

Kabla ya kwenda kwenye kifungu kidogo cha mwisho cha EVM, 9.5, hebu tuangalie maagizo yenyewe. Yamefafanuliwa katika Kiambatisho H.2 kinachoanzia uk. 29. Chochote ambacho hakijabainishwa kuwa kinabadilika na opcode hiyo maalum kinatarajiwa kubaki vile vile. Vigezo vinavyobadilika vinabainishwa na kama \<something\>′.

Kwa mfano, hebu tuangalie opcode ya [`ADD`](https://www.evm.codes/#01).

| Thamani | Mnemonic | δ | α | Maelezo                                                                                                                                                                                                               |
| ------: | -------- | - | - | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x01 | ADD      | 2 | 1 | Operesheni ya kuongeza.                                                                                                                                                                               |
|         |          |   |   | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ ni idadi ya thamani tunazotoa kutoka kwenye mrundikano. Katika kisa hiki mbili, kwa sababu tunaongeza thamani mbili za juu.

_α_ ni idadi ya thamani tunazosukuma nyuma. Katika kisa hiki moja, jumla.

Kwa hivyo juu mpya ya mrundikano (_μ′<sub>s</sub>[0]_) ni jumla ya juu ya zamani ya mrundikano (_μ<sub>s</sub>[0]_) na thamani ya zamani chini yake (_μ<sub>s</sub>[1]_).

Badala ya kupitia opcode zote kwa "orodha inayochosha macho", makala hii inaeleza tu opcode zinazoanzisha kitu kipya.

| Thamani | Mnemonic  | δ | α | Maelezo                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| ------: | --------- | - | - | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256 | 2 | 1 | Kokotoa hashi ya Keccak-256.                                                                                                                                                                                                                                                                                                                                                                                                                         |
|         |           |   |   | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |           |   |   | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                                                                                                                                                                                                                                                     |

Hii ni opcode ya kwanza inayofikia kumbukumbu (katika kisa hiki, kusoma tu). Hata hivyo, inaweza kupanuka zaidi ya mipaka ya sasa ya kumbukumbu, kwa hivyo tunahitaji kusasisha _μ<sub>i</sub>._ Tunafanya hivi kwa kutumia kazi ya _M_ iliyofafanuliwa katika mlinganyo wa 328 kwenye uk. 29.

| Thamani | Mnemonic | δ | α | Maelezo                                             |
| ------: | -------- | - | - | --------------------------------------------------- |
|    0x31 | BALANCE  | 1 | 1 | Pata salio la akaunti uliyopewa.    |
|         |          |   |   | ... |

Anwani ambayo salio lake tunahitaji kupata ni _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Juu ya mrundikano ni anwani, lakini kwa sababu anwani zina biti 160 tu, tunakokotoa thamani [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Ikiwa _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, inamaanisha kuwa kuna habari kuhusu anwani hii. Katika kisa hicho, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ ni salio la anwani hiyo. Ikiwa _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, inamaanisha kuwa anwani hii haijaanzishwa na salio ni sifuri. Unaweza kuona orodha ya sehemu za habari za akaunti katika sehemu ya 4.1 kwenye uk. 4.

Mlinganyo wa pili, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, unahusiana na tofauti ya gharama kati ya ufikiaji wa hifadhi ya joto (hifadhi ambayo imefikiwa hivi karibuni na inawezekana kuhifadhiwa kwenye kache) na hifadhi ya baridi (hifadhi ambayo haijafikiwa na inawezekana kuwa katika hifadhi ya polepole ambayo ni ghali zaidi kuirejesha). _A<sub>a</sub>_ ni orodha ya anwani zilizofikiwa hapo awali na muamala, ambayo kwa hivyo inapaswa kuwa rahisi kufikia, kama ilivyofafanuliwa katika sehemu ya 6.1 kwenye uk. 8. Unaweza kusoma zaidi kuhusu mada hii katika [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Thamani | Mnemonic | δ  | α  | Maelezo                                                                                                                                         |
| ------: | -------- | -- | -- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
|    0x8F | DUP16    | 16 | 17 | Rudufu kipengee cha 16 cha mrundikano.                                                                                          |
|         |          |    |    | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Kumbuka kuwa ili kutumia kipengee chochote cha mrundikano, tunahitaji kukitoa, ambayo inamaanisha tunahitaji pia kutoa vipengee vyote vya mrundikano vilivyo juu yake. Katika kisa cha [`DUP<n>`](https://www.evm.codes/#8f) na [`SWAP<n>`](https://www.evm.codes/#9f), hii inamaanisha kulazimika kutoa na kisha kusukuma hadi thamani kumi na sita.

## 9.5 Mzunguko wa utekelezaji {#95-exec-cycle}

Sasa kwa kuwa tuna sehemu zote, hatimaye tunaweza kuelewa jinsi mzunguko wa utekelezaji wa EVM unavyoandikwa.

Mlinganyo (155) unasema kwamba ukipewa hali:

- _σ_ (hali ya mnyororo wa bloku wa kimataifa)
- _μ_ (hali ya EVM)
- _A_ (hali ndogo, mabadiliko ya kutokea wakati muamala unapoisha)
- _I_ (mazingira ya utekelezaji)

Hali mpya ni _(σ', μ', A', I')_.

Milinganyo (156)-(158) inafafanua mrundikano na mabadiliko ndani yake kutokana na opcode (_μ<sub>s</sub>_). Mlinganyo (159) ni mabadiliko ya gesi (_μ<sub>g</sub>_). Mlinganyo (160) ni mabadiliko katika kaunta ya programu (_μ<sub>pc</sub>_). Hatimaye, milinganyo (161)-(164) inabainisha kuwa vigezo vingine vinabaki vile vile, isipokuwa vimebadilishwa waziwazi na opcode.

Kwa hili EVM imefafanuliwa kikamilifu.

## Hitimisho {#conclusion}

Nukuu za kihisabati ni sahihi na imeruhusu Karatasi ya Njano kubainisha kila undani wa Ethereum. Hata hivyo, ina hasara kadhaa:

- Inaweza kueleweka tu na wanadamu, ambayo inamaanisha kuwa [majaribio ya kufuata](https://github.com/ethereum/tests) lazima yaandikwe kwa mkono.
- Waandaaji wa programu wanaelewa msimbo wa kompyuta.
  Wanaweza au wasielewe nukuu za kihisabati.

Labda kwa sababu hizi, [vigezo vipya vya safu ya makubaliano](https://github.com/ethereum/consensus-specs/blob/dev/tests/core/pyspec/README.md) vimeandikwa katika Python. Kuna [vigezo vya safu ya utekelezaji katika Python](https://ethereum.github.io/execution-specs), lakini havijakamilika. Hadi na isipokuwa Karatasi nzima ya Njano itafsiriwe pia kwa Python au lugha sawa, Karatasi ya Njano itaendelea kutumika, na ni muhimu kuweza kuisoma.
