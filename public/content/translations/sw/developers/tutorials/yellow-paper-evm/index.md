---
title: Kuelewa Maelezo ya EVM ya Waraka wa Manjano
description: Kuelewa sehemu ya Waraka wa Manjano, maelezo rasmi ya Ethereum, ambayo inaelezea mashine pepe ya Ethereum (EVM).
author: "qbzzt"
tags: ["evm"]
skill: intermediate
breadcrumb: EVM ya Waraka wa Manjano
lang: sw
published: 2022-05-15
---

[Waraka wa Manjano](https://ethereum.github.io/yellowpaper/paper.pdf) ni maelezo rasmi ya Ethereum. Isipokuwa pale ambapo imerekebishwa na [mchakato wa EIP](/eips/), ina maelezo kamili ya jinsi kila kitu kinavyofanya kazi. Imeandikwa kama karatasi ya kihisabati, ambayo inajumuisha istilahi ambazo watengenezaji programu wanaweza wasizizoee. Katika waraka huu unajifunza jinsi ya kuusoma, na kwa ugani nyaraka zingine za kihisabati zinazohusiana.

## Waraka wa Manjano Upi? {#which-yellow-paper}

Kama karibu kila kitu kingine katika Ethereum, Waraka wa Manjano hubadilika kadiri muda unavyopita. Ili kuweza kurejelea toleo mahususi, nilipakia [toleo la sasa wakati wa kuandika](yellow-paper-berlin.pdf). Nambari za sehemu, ukurasa, na mlinganyo ninazotumia zitarejelea toleo hilo. Ni wazo zuri kuwa nayo wazi katika dirisha tofauti wakati unasoma waraka huu.

### Kwa nini EVM? {#why-the-evm}

Waraka wa manjano wa asili uliandikwa mwanzoni kabisa mwa maendeleo ya Ethereum. Inaelezea utaratibu wa makubaliano wa asili unaotegemea Uthibitisho wa Kazi (PoW) ambao ulitumiwa hapo awali kulinda mtandao. Hata hivyo, Ethereum ilizima Uthibitisho wa Kazi (PoW) na kuanza kutumia mwafaka unaotegemea Uthibitisho wa Dau (PoS) mnamo Septemba 2022. Mafunzo haya yataangazia sehemu za waraka wa manjano zinazofafanua Mashine Pepe ya Ethereum (EVM). EVM haikubadilishwa na mpito kwenda kwenye Uthibitisho wa Dau (PoS) (isipokuwa kwa thamani ya kurejesha ya msimbo wa operesheni wa DIFFICULTY).

## 9 Muundo wa utekelezaji {#9-execution-model}

Sehemu hii (uk. 12-14) inajumuisha sehemu kubwa ya ufafanuzi wa EVM.

Neno _hali ya mfumo_ linajumuisha kila kitu unachohitaji kujua kuhusu mfumo ili kuuendesha. Katika kompyuta ya kawaida, hii inamaanisha kumbukumbu, yaliyomo kwenye rejista, n.k.

[Mashine ya Turing](https://en.wikipedia.org/wiki/Turing_machine) ni muundo wa kimahesabu. Kimsingi, ni toleo lililorahisishwa la kompyuta, ambalo limethibitishwa kuwa na uwezo sawa wa kuendesha hesabu ambazo kompyuta ya kawaida inaweza (kila kitu ambacho kompyuta inaweza kuhesabu mashine ya Turing inaweza kuhesabu na kinyume chake). Muundo huu hurahisisha kuthibitisha nadharia mbalimbali kuhusu kile kinachoweza na kisichoweza kuhesabika.

Neno [Turing-kamili](https://en.wikipedia.org/wiki/Turing_completeness) linamaanisha kompyuta inayoweza kuendesha hesabu sawa na mashine ya Turing. Mashine za Turing zinaweza kuingia kwenye vitanzi visivyo na mwisho, na EVM haiwezi kwa sababu itaishiwa na gesi, kwa hivyo ni nusu-Turing-kamili tu.

## 9.1 Mambo ya Msingi {#91-basics}

Sehemu hii inatoa mambo ya msingi ya EVM na jinsi inavyolinganishwa na miundo mingine ya kimahesabu.

[Mashine ya staki](https://en.wikipedia.org/wiki/Stack_machine) ni kompyuta inayohifadhi data za kati si kwenye rejista, bali kwenye [**staki**](<https://en.wikipedia.org/wiki/Stack_(abstract_data_type)>). Huu ndio usanifu unaopendelewa kwa mashine pepe kwa sababu ni rahisi kutekeleza ikimaanisha kuwa hitilafu, na udhaifu wa kiusalama, haziwezekani sana kutokea. Kumbukumbu katika staki imegawanywa katika maneno ya biti 256. Hii ilichaguliwa kwa sababu inafaa kwa shughuli kuu za kificho za Ethereum kama vile uheshiji wa Keccak-256 na hesabu za tao la duaradufu. Ukubwa wa juu zaidi wa staki ni vipengee 1024 (1024 x biti 256). Wakati misimbo ya operesheni inatekelezwa kwa kawaida hupata vigezo vyake kutoka kwenye staki. Kuna misimbo ya operesheni mahususi kwa ajili ya kupanga upya vipengele katika staki kama vile `POP` (huondoa kipengee kutoka juu ya staki), `DUP_N` (hunakili kipengee cha N katika staki), n.k.

EVM pia ina nafasi tete inayoitwa **kumbukumbu** ambayo hutumika kuhifadhi data wakati wa utekelezaji. Kumbukumbu hii imepangwa katika maneno ya baiti 32. Maeneo yote ya kumbukumbu huanzishwa kwa sifuri. Ikiwa utatekeleza msimbo huu wa [Yul](https://docs.soliditylang.org/en/latest/yul.html) ili kuongeza neno kwenye kumbukumbu, itajaza baiti 32 za kumbukumbu kwa kujaza nafasi tupu katika neno na sifuri, yaani, inaunda neno moja - na sifuri katika maeneo 0-29, 0x60 hadi 30, na 0xA7 hadi 31.

```yul
mstore(0, 0x60A7)
```

`mstore` ni mojawapo ya misimbo ya operesheni mitatu ambayo EVM hutoa kwa ajili ya kuingiliana na kumbukumbu - hupakia neno kwenye kumbukumbu. Mengine mawili ni `mstore8` ambayo hupakia baiti moja kwenye kumbukumbu, na `mload` ambayo huhamisha neno kutoka kwenye kumbukumbu hadi kwenye staki.

EVM pia ina muundo tofauti wa **hifadhi** isiyo tete ambayo hudumishwa kama sehemu ya hali ya mfumo - kumbukumbu hii imepangwa katika safu za maneno (kinyume na safu za baiti zinazoweza kushughulikiwa na neno katika staki). Hifadhi hii ndipo mikataba huweka data ya kudumu - mkataba unaweza tu kuingiliana na hifadhi yake yenyewe. Hifadhi imepangwa katika ramani za ufunguo-thamani.

Ingawa haijatajwa katika sehemu hii ya Waraka wa Manjano, ni muhimu pia kujua kuna aina ya nne ya kumbukumbu. **Data za mwito** ni kumbukumbu ya kusoma tu inayoweza kushughulikiwa na baiti inayotumika kuhifadhi thamani iliyopitishwa na kigezo cha `data` cha muamala. EVM ina misimbo ya operesheni mahususi ya kudhibiti `calldata`. `calldatasize` hurejesha ukubwa wa data. `calldataload` hupakia data kwenye staki. `calldatacopy` hunakili data kwenye kumbukumbu.

Usanifu wa kawaida wa [Von Neumann](https://en.wikipedia.org/wiki/Von_Neumann_architecture) huhifadhi msimbo na data katika kumbukumbu sawa. EVM haifuati kiwango hiki kwa sababu za kiusalama - kushiriki kumbukumbu tete hufanya iwezekane kubadilisha msimbo wa programu. Badala yake, msimbo huhifadhiwa kwenye hifadhi.

Kuna matukio mawili tu ambapo msimbo unatekelezwa kutoka kwenye kumbukumbu:

- Wakati mkataba unaunda mkataba mwingine (kwa kutumia [`CREATE`](https://www.evm.codes/#f0) au [`CREATE2`](https://www.evm.codes/#f5)), msimbo wa konstrukta wa mkataba hutoka kwenye kumbukumbu.
- Wakati wa uundaji wa mkataba _wowote_, msimbo wa konstrukta huendeshwa na kisha kurejea na msimbo wa mkataba halisi, pia kutoka kwenye kumbukumbu.

Neno utekelezaji wa kipekee linamaanisha ubaguzi unaosababisha utekelezaji wa mkataba wa sasa kusimama.

## 9.2 Muhtasari wa ada {#92-fees-overview}

Sehemu hii inaelezea jinsi ada za gesi zinavyohesabiwa. Kuna gharama tatu:

### Gharama ya msimbo wa operesheni {#opcode-cost}

Gharama ya asili ya msimbo wa operesheni mahususi. Ili kupata thamani hii, tafuta kikundi cha gharama cha msimbo wa operesheni katika Kiambatisho H (uk. 28, chini ya mlinganyo (327)), na utafute kikundi cha gharama katika mlinganyo (324). Hii inakupa chaguo la kukokotoa gharama, ambalo mara nyingi hutumia vigezo kutoka Kiambatisho G (uk. 27).

Kwa mfano, msimbo wa operesheni [`CALLDATACOPY`](https://www.evm.codes/#37) ni mwanachama wa kikundi _W<sub>copy</sub>_. Gharama ya msimbo wa operesheni kwa kikundi hicho ni _G<sub>verylow</sub>+G<sub>copy</sub>×⌈μ<sub>s</sub>[2]÷32⌉_. Tukiangalia Kiambatisho G, tunaona kwamba viwango vyote viwili ni 3, ambayo inatupa _3+3×⌈μ<sub>s</sub>[2]÷32⌉_.

Bado tunahitaji kufafanua usemi _⌈μ<sub>s</sub>[2]÷32⌉_. Sehemu ya nje kabisa, _⌈ \<value\> ⌉_ ni chaguo la kukokotoa la dari, chaguo la kukokotoa ambalo likipewa thamani hurejesha nambari kamili ndogo zaidi ambayo bado si ndogo kuliko thamani. Kwa mfano, _⌈2.5⌉ = ⌈3⌉ = 3_. Sehemu ya ndani ni _μ<sub>s</sub>[2]÷32_. Tukiangalia sehemu ya 3 (Mikataba) kwenye uk. 3, _μ_ ni hali ya mashine. Hali ya mashine inafafanuliwa katika sehemu ya 9.4.1 kwenye uk. 13. Kulingana na sehemu hiyo, mojawapo ya vigezo vya hali ya mashine ni _s_ kwa ajili ya staki. Tukiweka yote pamoja, inaonekana kwamba _μ<sub>s</sub>[2]_ ni eneo #2 katika staki. Tukiangalia [msimbo wa operesheni](https://www.evm.codes/#37), eneo #2 katika staki ni ukubwa wa data katika baiti. Tukiangalia misimbo mingine ya operesheni katika kikundi W<sub>copy</sub>, [`CODECOPY`](https://www.evm.codes/#39) na [`RETURNDATACOPY`](https://www.evm.codes/#3e), pia zina ukubwa wa data katika eneo sawa. Kwa hivyo _⌈μ<sub>s</sub>[2]÷32⌉_ ni idadi ya maneno ya baiti 32 yanayohitajika kuhifadhi data inayonakiliwa. Tukiweka kila kitu pamoja, gharama ya asili ya [`CALLDATACOPY`](https://www.evm.codes/#37) ni gesi 3 pamoja na 3 kwa kila neno la data inayonakiliwa.

### Gharama ya kuendesha {#running-cost}

Gharama ya kuendesha msimbo tunaouita.

- Katika kesi ya [`CREATE`](https://www.evm.codes/#f0) na [`CREATE2`](https://www.evm.codes/#f5), konstrukta wa mkataba mpya.
- Katika kesi ya [`CALL`](https://www.evm.codes/#f1), [`CALLCODE`](https://www.evm.codes/#f2), [`STATICCALL`](https://www.evm.codes/#fa), au [`DELEGATECALL`](https://www.evm.codes/#f4), mkataba tunaouita.

### Gharama ya kupanua kumbukumbu {#expanding-memory-cost}

Gharama ya kupanua kumbukumbu (ikiwa ni lazima).

Katika mlinganyo wa 324, thamani hii imeandikwa kama _C<sub>mem</sub>(μ<sub>i</sub>')-C<sub>mem</sub>(μ<sub>i</sub>)_. Tukiangalia sehemu ya 9.4.1 tena, tunaona kwamba _μ<sub>i</sub>_ ni idadi ya maneno katika kumbukumbu. Kwa hivyo _μ<sub>i</sub>_ ni idadi ya maneno katika kumbukumbu kabla ya msimbo wa operesheni na _μ<sub>i</sub>'_ ni idadi ya maneno katika kumbukumbu baada ya msimbo wa operesheni.

Chaguo la kukokotoa _C<sub>mem</sub>_ linafafanuliwa katika mlinganyo wa 326: _C<sub>mem</sub>(a) = G<sub>memory</sub> × a + ⌊a<sup>2</sup> ÷ 512⌋_. _⌊x⌋_ ni chaguo la kukokotoa la sakafu, chaguo la kukokotoa ambalo likipewa thamani hurejesha nambari kamili kubwa zaidi ambayo bado si kubwa kuliko thamani. Kwa mfano, _⌊2.5⌋ = ⌊2⌋ = 2._ Wakati _a < √512_, _a<sup>2</sup> < 512_, na matokeo ya chaguo la kukokotoa la sakafu ni sifuri. Kwa hivyo kwa maneno 22 ya kwanza (baiti 704), gharama hupanda kwa mstari na idadi ya maneno ya kumbukumbu yanayohitajika. Zaidi ya hatua hiyo _⌊a<sup>2</sup> ÷ 512⌋_ ni chanya. Wakati kumbukumbu inayohitajika ni ya juu vya kutosha gharama ya gesi inalingana na mraba wa kiasi cha kumbukumbu.

**Kumbuka** kwamba mambo haya huathiri tu gharama ya _asili_ ya gesi - haizingatii soko la ada au vidokezo kwa wathibitishaji ambavyo huamua ni kiasi gani mtumiaji wa mwisho anahitajika kulipa - hii ni gharama ghafi tu ya kuendesha operesheni fulani kwenye EVM.

[Soma zaidi kuhusu gesi](/developers/docs/gas/).

## 9.3 Mazingira ya utekelezaji {#93-execution-env}

Mazingira ya utekelezaji ni tuple, _I_, ambayo inajumuisha maelezo ambayo si sehemu ya hali ya mnyororo wa vitalu au EVM.

| Kigezo          | Msimbo wa operesheni wa kufikia data                                                                                             | Msimbo wa Solidity wa kufikia data                       |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| _I<sub>a</sub>_ | [`ADDRESS`](https://www.evm.codes/#30)                                                                           | `address(this)`                          |
| _I<sub>o</sub>_ | [`ORIGIN`](https://www.evm.codes/#32)                                                                            | `tx.origin`                              |
| _I<sub>p</sub>_ | [`GASPRICE`](https://www.evm.codes/#3a)                                                                          | `tx.gasprice`                            |
| _I<sub>d</sub>_ | [`CALLDATALOAD`](https://www.evm.codes/#35), n.k.                                                                | `msg.data`                               |
| _I<sub>s</sub>_ | [`CALLER`](https://www.evm.codes/#33)                                                                            | `msg.sender`                             |
| _I<sub>v</sub>_ | [`CALLVALUE`](https://www.evm.codes/#34)                                                                         | `msg.value`                              |
| _I<sub>b</sub>_ | [`CODECOPY`](https://www.evm.codes/#39)                                                                          | `address(this).code`                     |
| _I<sub>H</sub>_ | Nyanja za kichwa cha kizuizi, kama vile [`NUMBER`](https://www.evm.codes/#43) na [`DIFFICULTY`](https://www.evm.codes/#44) | `block.number`, `block.difficulty`, n.k. |
| _I<sub>e</sub>_ | Kina cha staki ya mwito kwa miito kati ya mikataba (ikiwa ni pamoja na uundaji wa mkataba)                                       |
| _I<sub>w</sub>_ | Je, EVM inaruhusiwa kubadilisha hali, au inaendeshwa kwa uthabiti                                                                |

Vigezo vingine vichache ni muhimu ili kuelewa sehemu iliyosalia ya 9:

| Kigezo | Imefafanuliwa katika sehemu | Maana                                                                                                                                                                                                                                    |
| ------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _σ_    | 2 (uk. 2, mlinganyo 1)      | Hali ya mnyororo wa vitalu                                                                                                                                                                                                               |
| _g_    | 9.3 (uk. 13)                | Gesi iliyosalia                                                                                                                                                                                                                          |
| _A_    | 6.1 (uk. 8)                 | Hali ndogo iliyokusanywa (mabadiliko yaliyopangwa kwa wakati muamala utakapokamilika)                                                                                                                                                    |
| _o_    | 9.3 (uk. 13)                | Pato - matokeo yaliyorejeshwa katika kesi ya muamala wa ndani (wakati mkataba mmoja unaita mwingine) na miito ya kutazama vipengele (wakati unauliza tu maelezo, kwa hivyo hakuna haja ya kusubiri muamala)                              |

## 9.4 Muhtasari wa utekelezaji {#94-execution-overview}

Sasa kwa kuwa tuna mambo yote ya awali, hatimaye tunaweza kuanza kufanyia kazi jinsi EVM inavyofanya kazi.

Milinganyo 137-142 inatupa masharti ya awali ya kuendesha EVM:

| Alama            | Thamani ya awali | Maana                                                                                                                                                                                                                                                       |
| ---------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| _μ<sub>g</sub>_  | _g_              | Gesi iliyosalia                                                                                                                                                                                                                                             |
| _μ<sub>pc</sub>_ | _0_              | Kihesabu programu, anwani ya maagizo yanayofuata ya kutekeleza                                                                                                                                                                                              |
| _μ<sub>m</sub>_  | _(0, 0, ...)_    | Kumbukumbu, iliyoanzishwa kwa sifuri zote                                                                                                                                                                                                                   |
| _μ<sub>i</sub>_  | _0_              | Eneo la juu zaidi la kumbukumbu lililotumika                                                                                                                                                                                                                |
| _μ<sub>s</sub>_  | _()_             | Staki, hapo awali tupu                                                                                                                                                                                                                                      |
| _μ<sub>o</sub>_  | _∅_              | Pato, seti tupu hadi na isipokuwa tusimame ama na data ya kurejesha ([`RETURN`](https://www.evm.codes/#f3) au [`REVERT`](https://www.evm.codes/#fd)) au bila hiyo ([`STOP`](https://www.evm.codes/#00) au [`SELFDESTRUCT`](https://www.evm.codes/#ff)). |

Mlinganyo wa 143 unatuambia kuna masharti manne yanayowezekana katika kila hatua ya wakati wakati wa utekelezaji, na nini cha kufanya nayo:

1.  `Z(σ,μ,A,I)`. Z inawakilisha chaguo la kukokotoa ambalo hujaribu ikiwa operesheni inaunda mpito wa hali batili (tazama [kusimama kwa kipekee](#942-exceptional-halt)). Ikiwa inatathmini kuwa Kweli, hali mpya inafanana na ya zamani (isipokuwa gesi inachomwa) kwa sababu mabadiliko hayajatekelezwa.
2.  Ikiwa msimbo wa operesheni unaotekelezwa ni [`REVERT`](https://www.evm.codes/#fd), hali mpya ni sawa na hali ya zamani, baadhi ya gesi inapotea.
3.  Ikiwa mlolongo wa shughuli umekamilika, kama inavyoonyeshwa na [`RETURN`](https://www.evm.codes/#f3)), hali inasasishwa hadi hali mpya.
4.  Ikiwa hatuko katika mojawapo ya masharti ya mwisho 1-3, endelea kuendesha.

## 9.4.1 Hali ya Mashine {#941-machine-state}

Sehemu hii inaelezea hali ya mashine kwa undani zaidi. Inabainisha kuwa _w_ ni msimbo wa operesheni wa sasa. Ikiwa _μ<sub>pc</sub>_ ni chini ya _||I<sub>b</sub>||_, urefu wa msimbo, basi baiti hiyo (_I<sub>b</sub>[μ<sub>pc</sub>]_) ni msimbo wa operesheni. Vinginevyo, msimbo wa operesheni unafafanuliwa kama [`STOP`](https://www.evm.codes/#00).

Kwa kuwa hii ni [mashine ya staki](https://en.wikipedia.org/wiki/Stack_machine), tunahitaji kufuatilia idadi ya vipengee vilivyotolewa (_δ_) na kusukumwa ndani (_α_) na kila msimbo wa operesheni.

## 9.4.2 Kusimama kwa Kipekee {#942-exceptional-halt}

Sehemu hii inafafanua chaguo la kukokotoa la _Z_, ambalo hubainisha wakati tuna usitishaji usio wa kawaida. Hili ni chaguo la kukokotoa la [Boolean](https://en.wikipedia.org/wiki/Boolean_data_type), kwa hivyo linatumia [_∨_ kwa mantiki ya au](https://en.wikipedia.org/wiki/Logical_disjunction) na [_∧_ kwa mantiki ya na](https://en.wikipedia.org/wiki/Logical_conjunction).

Tuna usimamishaji wa kipekee ikiwa mojawapo ya masharti haya ni kweli:

- **_μ<sub>g</sub> < C(σ,μ,A,I)_**
  Kama tulivyoona katika sehemu ya 9.2, _C_ ni chaguo la kukokotoa ambalo hubainisha gharama ya gesi. Hakuna gesi ya kutosha iliyosalia kufidia msimbo wa operesheni unaofuata.

- **_δ<sub>w</sub>=∅_**
  Ikiwa idadi ya vipengee vilivyotolewa kwa msimbo wa operesheni haijafafanuliwa, basi msimbo wa operesheni wenyewe haujafafanuliwa.

- **_|| μ<sub>s</sub> || < δ<sub>w</sub>_**
  Upungufu wa staki, hakuna vipengee vya kutosha katika staki kwa msimbo wa operesheni wa sasa.

- **_w = JUMP ∧ μ<sub>s</sub>[0]∉D(I<sub>b</sub>)_**
  Msimbo wa operesheni ni [`JUMP`](https://www.evm.codes/#56) na anwani si [`JUMPDEST`](https://www.evm.codes/#5b). Miruko ni halali _tu_ wakati lengwa ni [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = JUMPI ∧ μ<sub>s</sub>[1]≠0 ∧ μ<sub>s</sub>[0] ∉ D(I<sub>b</sub>)_**
  Msimbo wa operesheni ni [`JUMPI`](https://www.evm.codes/#57), sharti ni kweli (sio sifuri) kwa hivyo mruko unapaswa kutokea, na anwani si [`JUMPDEST`](https://www.evm.codes/#5b). Miruko ni halali _tu_ wakati lengwa ni [`JUMPDEST`](https://www.evm.codes/#5b).

- **_w = RETURNDATACOPY ∧ μ<sub>s</sub>[1]+μ<sub>s</sub>[2]>|| μ<sub>o</sub> ||_**
  Msimbo wa operesheni ni [`RETURNDATACOPY`](https://www.evm.codes/#3e). Katika msimbo huu wa operesheni kipengele cha staki _μ<sub>s</sub>[1]_ ni kigezo cha kusoma kutoka kwenye bafa ya data ya kurejesha, na kipengele cha staki _μ<sub>s</sub>[2]_ ni urefu wa data. Sharti hili hutokea unapojaribu kusoma zaidi ya mwisho wa bafa ya data ya kurejesha. Kumbuka kwamba hakuna sharti sawa kwa data za mwito au kwa msimbo wenyewe. Unapojaribu kusoma zaidi ya mwisho wa bafa hizo unapata sifuri tu.

- **_|| μ<sub>s</sub> || - δ<sub>w</sub> + α<sub>w</sub> > 1024_**

  Mzidio wa staki. Ikiwa kuendesha msimbo wa operesheni kutasababisha staki ya zaidi ya vipengee 1024, sitisha.

- **_¬I<sub>w</sub> ∧ W(w,μ)_**
  Je, tunaendesha kwa uthabiti ([¬ ni ukanushaji](https://en.wikipedia.org/wiki/Negation) na _I<sub>w</sub>_ ni kweli tunaporuhusiwa kubadilisha hali ya mnyororo wa vitalu)? Ikiwa ndivyo, na tunajaribu operesheni ya kubadilisha hali, haiwezi kutokea.

  Chaguo la kukokotoa _W(w,μ)_ linafafanuliwa baadaye katika mlinganyo wa 150. _W(w,μ)_ ni kweli ikiwa mojawapo ya masharti haya ni kweli:

  - **_w ∈ \{CREATE, CREATE2, SSTORE, SELFDESTRUCT}_**
    Misimbo hii ya operesheni hubadilisha hali, ama kwa kuunda mkataba mpya, kuhifadhi thamani, au kuharibu mkataba wa sasa.

  - **_LOG0≤w ∧ w≤LOG4_**
    Ikiwa tunaitwa kwa uthabiti hatuwezi kutoa maingizo ya logi.
    Misimbo ya operesheni ya logi yote iko katika masafa kati ya [`LOG0` (A0)](https://www.evm.codes/#a0) na [`LOG4` (A4)](https://www.evm.codes/#a4).
    Nambari baada ya msimbo wa operesheni wa logi inabainisha ni mada ngapi ingizo la logi lina.
  - **_w=CALL ∧ μ<sub>s</sub>[2]≠0_**
    Unaweza kuita mkataba mwingine unapokuwa thabiti, lakini ukifanya hivyo huwezi kuhamisha ETH kwake.

- **_w = SSTORE ∧ μ<sub>g</sub> ≤ G<sub>callstipend</sub>_**
  Huwezi kuendesha [`SSTORE`](https://www.evm.codes/#55) isipokuwa uwe na gesi zaidi ya G<sub>callstipend</sub> (iliyofafanuliwa kama 2300 katika Kiambatisho G).

## 9.4.3 Uhalali wa Lengwa la Mruko {#943-jump-dest-valid}

Hapa tunafafanua rasmi ni nini misimbo ya operesheni ya [`JUMPDEST`](https://www.evm.codes/#5b). Hatuwezi tu kutafuta thamani ya baiti 0x5B, kwa sababu inaweza kuwa ndani ya PUSH (na kwa hivyo data na sio msimbo wa operesheni).

Katika mlinganyo (153) tunafafanua chaguo la kukokotoa, _N(i,w)_. Kigezo cha kwanza, _i_, ni eneo la msimbo wa operesheni. Cha pili, _w_, ni msimbo wa operesheni wenyewe. Ikiwa _w∈[PUSH1, PUSH32]_ hiyo inamaanisha msimbo wa operesheni ni PUSH (mabano ya mraba yanafafanua masafa yanayojumuisha ncha). Ikiwa hali hiyo msimbo wa operesheni unaofuata uko kwenye _i+2+(w−PUSH1)_. Kwa [`PUSH1`](https://www.evm.codes/#60) tunahitaji kusonga mbele kwa baiti mbili (PUSH yenyewe na thamani ya baiti moja), kwa [`PUSH2`](https://www.evm.codes/#61) tunahitaji kusonga mbele kwa baiti tatu kwa sababu ni thamani ya baiti mbili, n.k. Misimbo mingine yote ya operesheni ya EVM ina urefu wa baiti moja tu, kwa hivyo katika hali zingine zote _N(i,w)=i+1_.

Chaguo hili la kukokotoa linatumika katika mlinganyo (152) kufafanua _D<sub>J</sub>(c,i)_, ambayo ni [seti](<https://en.wikipedia.org/wiki/Set_(mathematics)>) ya malengwa yote halali ya mruko katika msimbo _c_, kuanzia na eneo la msimbo wa operesheni _i_. Chaguo hili la kukokotoa linafafanuliwa kwa kujirudia. Ikiwa _i≥||c||_, hiyo inamaanisha kuwa tuko kwenye au baada ya mwisho wa msimbo. Hatutapata malengwa yoyote zaidi ya mruko, kwa hivyo rejesha tu seti tupu.

Katika hali zingine zote tunaangalia msimbo uliosalia kwa kwenda kwenye msimbo wa operesheni unaofuata na kupata seti kuanzia hapo. _c[i]_ ni msimbo wa operesheni wa sasa, kwa hivyo _N(i,c[i])_ ni eneo la msimbo wa operesheni unaofuata. _D<sub>J</sub>(c,N(i,c[i]))_ kwa hivyo ni seti ya malengwa halali ya mruko inayoanza kwenye msimbo wa operesheni unaofuata. Ikiwa msimbo wa operesheni wa sasa si `JUMPDEST`, rejesha tu seti hiyo. Ikiwa ni `JUMPDEST`, ijumuise katika seti ya matokeo na urejeshe hiyo.

## 9.4.4 Kusimama kwa kawaida {#944-normal-halt}

Chaguo la kukokotoa la kusimama _H_, linaweza kurejesha aina tatu za thamani.

- Ikiwa hatuko katika msimbo wa operesheni wa kusimama, rejesha _∅_, seti tupu. Kwa kawaida, thamani hii inatafsiriwa kama uongo wa Boolean.
- Ikiwa tuna msimbo wa operesheni wa kusimama ambao hautoi pato (ama [`STOP`](https://www.evm.codes/#00) au [`SELFDESTRUCT`](https://www.evm.codes/#ff)), rejesha mlolongo wa baiti za ukubwa wa sifuri kama thamani ya kurejesha. Kumbuka kwamba hii ni tofauti sana na seti tupu. Thamani hii inamaanisha kuwa EVM ilisimama kweli, tu hakuna data ya kurejesha ya kusoma.
- Ikiwa tuna msimbo wa operesheni wa kusimama ambao hutoa pato (ama [`RETURN`](https://www.evm.codes/#f3) au [`REVERT`](https://www.evm.codes/#fd)), rejesha mlolongo wa baiti uliobainishwa na msimbo huo wa operesheni. Mlolongo huu unachukuliwa kutoka kwenye kumbukumbu, thamani iliyo juu ya staki (_μ<sub>s</sub>[0]_) ni baiti ya kwanza, na thamani baada yake (_μ<sub>s</sub>[1]_) ni urefu.

## H.2 Seti ya maagizo {#h2-instruction-set}

Kabla hatujaenda kwenye kifungu kidogo cha mwisho cha EVM, 9.5, hebu tuangalie maagizo yenyewe. Yamefafanuliwa katika Kiambatisho H.2 ambacho kinaanza kwenye uk. 29. Chochote ambacho hakijabainishwa kama kinachobadilika na msimbo huo mahususi wa operesheni kinatarajiwa kubaki sawa. Vigezo vinavyobadilika vinabainishwa na kama \<something\>′.

Kwa mfano, hebu tuangalie msimbo wa operesheni wa [`ADD`](https://www.evm.codes/#01).

| Thamani | Mnemoni | δ   | α   | Maelezo                                                   |
| ------: | ------- | --- | --- | --------------------------------------------------------- |
|    0x01 | ADD     | 2   | 1   | Operesheni ya kujumlisha.                                 |
|         |         |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[0] + μ<sub>s</sub>[1]_ |

_δ_ ni idadi ya thamani tunazotoa kutoka kwenye staki. Katika kesi hii mbili, kwa sababu tunajumlisha thamani mbili za juu.

_α_ ni idadi ya thamani tunazosukuma nyuma. Katika kesi hii moja, jumla.

Kwa hivyo juu ya staki mpya (_μ′<sub>s</sub>[0]_) ni jumla ya juu ya staki ya zamani (_μ<sub>s</sub>[0]_) na thamani ya zamani chini yake (_μ<sub>s</sub>[1]_).

Badala ya kupitia misimbo yote ya operesheni kwa "orodha inayochosha macho", Makala haya yanaelezea tu misimbo hiyo ya operesheni inayoleta kitu kipya.

| Thamani | Mnemoni   | δ   | α   | Maelezo                                                                                                    |
| ------: | --------- | --- | --- | ---------------------------------------------------------------------------------------------------------- |
|    0x20 | KECCAK256 | 2   | 1   | Kokotoa heshi ya Keccak-256.                                                                               |
|         |           |     |     | _μ′<sub>s</sub>[0] ≡ KEC(μ<sub>m</sub>[μ<sub>s</sub>[0] . . . (μ<sub>s</sub>[0] + μ<sub>s</sub>[1] − 1)])_ |
|         |           |     |     | _μ′<sub>i</sub> ≡ M(μ<sub>i</sub>,μ<sub>s</sub>[0],μ<sub>s</sub>[1])_                                      |

Huu ni msimbo wa operesheni wa kwanza unaofikia kumbukumbu (katika kesi hii, kusoma tu). Hata hivyo, inaweza kupanuka zaidi ya mipaka ya sasa ya kumbukumbu, kwa hivyo tunahitaji kusasisha _μ<sub>i</sub>._ Tunafanya hivi kwa kutumia chaguo la kukokotoa la _M_ lililofafanuliwa katika mlinganyo wa 328 kwenye uk. 29.

| Thamani | Mnemoni | δ   | α   | Maelezo                           |
| ------: | ------- | --- | --- | --------------------------------- |
|    0x31 | BALANCE | 1   | 1   | Pata salio la akaunti iliyotolewa. |
|         |         |     |     | ...                               |

Anwani ambayo salio lake tunahitaji kupata ni _μ<sub>s</sub>[0] mod 2<sup>160</sup>_. Juu ya staki ni anwani, lakini kwa sababu anwani ni biti 160 tu, tunakokotoa thamani ya [modulo](https://en.wikipedia.org/wiki/Modulo_operation) 2<sup>160</sup>.

Ikiwa _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] ≠ ∅_, inamaanisha kuwa kuna maelezo kuhusu anwani hii. Katika hali hiyo, _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>]<sub>b</sub>_ ni salio la anwani hiyo. Ikiwa _σ[μ<sub>s</sub>[0] mod 2<sup>160</sup>] = ∅_, inamaanisha kuwa anwani hii haijaanzishwa na salio ni sifuri. Unaweza kuona orodha ya nyanja za maelezo ya akaunti katika sehemu ya 4.1 kwenye uk. 4.

Mlinganyo wa pili, _A'<sub>a</sub> ≡ A<sub>a</sub> ∪ \{μ<sub>s</sub>[0] mod 2<sup>160</sup>}_, unahusiana na tofauti ya gharama kati ya ufikiaji wa hifadhi joto (hifadhi ambayo imefikiwa hivi karibuni na ina uwezekano wa kuwekwa kwenye kache) na hifadhi baridi (hifadhi ambayo haijafikiwa na ina uwezekano wa kuwa katika hifadhi ya polepole ambayo ni ghali zaidi kurejesha). _A<sub>a</sub>_ ni orodha ya anwani zilizofikiwa hapo awali na muamala, ambazo kwa hivyo zinapaswa kuwa nafuu kufikia, kama ilivyofafanuliwa katika sehemu ya 6.1 kwenye uk. 8. Unaweza kusoma zaidi kuhusu mada hii katika [EIP-2929](https://eips.ethereum.org/EIPS/eip-2929).

| Thamani | Mnemoni | δ   | α   | Maelezo                                 |
| ------: | ------- | --- | --- | --------------------------------------- |
|    0x8F | DUP16   | 16  | 17  | Nakili kipengee cha 16 cha staki.       |
|         |         |     |     | _μ′<sub>s</sub>[0] ≡ μ<sub>s</sub>[15]_ |

Kumbuka kwamba ili kutumia kipengee chochote cha staki, tunahitaji kukitoa, ambayo inamaanisha tunahitaji pia kutoa vipengee vyote vya staki vilivyo juu yake. Katika kesi ya [`DUP<n>`](https://www.evm.codes/#8f) na [`SWAP<n>`](https://www.evm.codes/#9f), hii inamaanisha kulazimika kutoa na kisha kusukuma hadi thamani kumi na sita.

## 9.5 Mzunguko wa utekelezaji {#95-exec-cycle}

Sasa kwa kuwa tuna sehemu zote, hatimaye tunaweza kuelewa jinsi mzunguko wa utekelezaji wa EVM unavyorekodiwa.

Mlinganyo (155) unasema kwamba kutokana na hali:

- _σ_ (hali ya kimataifa ya mnyororo wa vitalu)
- _μ_ (hali ya EVM)
- _A_ (hali ndogo, mabadiliko yatakayotokea wakati muamala utakapokamilika)
- _I_ (mazingira ya utekelezaji)

Hali mpya ni _(σ', μ', A', I')_.

Milinganyo (156)-(158) inafafanua staki na mabadiliko ndani yake kutokana na msimbo wa operesheni (_μ<sub>s</sub>_). Mlinganyo (159) ni mabadiliko katika gesi (_μ<sub>g</sub>_). Mlinganyo (160) ni mabadiliko katika kihesabu programu (_μ<sub>pc</sub>_). Hatimaye, milinganyo (161)-(164) inabainisha kwamba vigezo vingine vinabaki sawa, isipokuwa vibadilishwe waziwazi na msimbo wa operesheni.

Kwa hili EVM inafafanuliwa kikamilifu.

## Hitimisho {#conclusion}

Nukuu za kihisabati ni sahihi na zimeruhusu Waraka wa Manjano kubainisha kila undani wa Ethereum. Hata hivyo, ina baadhi ya mapungufu:

- Inaweza kueleweka tu na binadamu, ambayo inamaanisha kwamba [majaribio ya kufuata](https://github.com/ethereum/tests) lazima yaandikwe kwa mikono.
- Watengenezaji programu wanaelewa msimbo wa kompyuta.
  Wanaweza au wasielewe nukuu za kihisabati.

Labda kwa sababu hizi, [maelezo mapya ya tabaka la mwafaka](https://github.com/ethereum/consensus-specs/blob/master/tests/core/pyspec/README.md) yameandikwa katika Python. Kuna [maelezo ya tabaka la utekelezaji katika Python](https://ethereum.github.io/execution-specs), lakini hayajakamilika. Hadi na isipokuwa Waraka wa Manjano wote pia utafsiriwe kwa Python au lugha sawa, Waraka wa Manjano utaendelea kutumika, na inasaidia kuweza kuusoma.