---
title: Uthibitishaji
description: Maelezo ya uthibitishaji kwenye Ethereum ya uthibitisho wa hisa.
lang: sw
---

Mthibitishaji anatarajiwa kuunda, kutia sahihi na kutangaza uthibitishaji wakati wa kila epoch. Ukurasa huu unaelezea jinsi uthibitishaji huu unavyoonekana na jinsi unavyochakatwa na kuwasilishwa kati ya wateja wa makubaliano.

## Uthibitishaji ni nini? {#what-is-an-attestation}

Kila [epoch](/glossary/#epoch) (dakika 6.4) mthibitishaji anapendekeza uthibitishaji kwenye mtandao. Uthibitishaji unahusu yanayopangwa maalum katika epoch. Madhumuni ya uthibitishaji ni kupiga kura kuunga mkono mtazamo wa mthibitishaji wa mnyororo, hasa bloku ya hivi karibuni iliyohalalishwa na bloku ya kwanza katika epoch ya sasa (inayojulikana kama vituo vya ukaguzi vya `chanzo` na `lengo`). Taarifa hii huunganishwa kwa wathibitishaji wote wanaoshiriki, na kuuwezesha mtandao kufikia makubaliano kuhusu hali ya mnyororo wa bloku.

Uthibitishaji una vipengele vifuatavyo:

- `aggregation_bits`: orodha ya biti ya wathibitishaji ambapo nafasi inaonyesha faharasa ya mthibitishaji katika kamati yao; thamani (0/1) inaonyesha kama mthibitishaji alitia sahihi `data` (yaani, kama wanafanya kazi na wanakubaliana na mpendekezaji wa bloku)
- `data`: maelezo yanayohusiana na uthibitishaji, kama ilivyoelezwa hapa chini
- `signature`: sahihi ya BLS inayojumlisha sahihi za wathibitishaji binafsi

Kazi ya kwanza kwa mthibitishaji anayethibitisha ni kuunda `data`. `data` ina taarifa ifuatayo:

- `slot`: Nambari ya yanayopangwa ambayo uthibitishaji unarejelea
- `index`: Nambari inayobainisha kamati gani mthibitishaji yumo katika yanayopangwa fulani
- `beacon_block_root`: Hashi ya mzizi ya bloku ambayo mthibitishaji anaona kwenye kichwa cha mnyororo (matokeo ya kutumia algoriti ya kuchagua uma)
- `source`: Sehemu ya kura ya mwisho inayoonyesha kile wathibitishaji wanachoona kama bloku ya hivi karibuni iliyohalalishwa
- `target`: Sehemu ya kura ya mwisho inayoonyesha kile wathibitishaji wanachoona kama bloku ya kwanza katika epoch ya sasa

Mara tu `data` inapoundwa, mthibitishaji anaweza kugeuza biti katika `aggregation_bits` inayolingana na faharasa yake ya mthibitishaji kutoka 0 hadi 1 kuonyesha kuwa alishiriki.

Mwishowe, mthibitishaji hutia sahihi uthibitishaji na kuutangaza kwenye mtandao.

### Uthibitishaji uliokusanywa {#aggregated-attestation}

Kuna gharama kubwa ya ziada inayohusishwa na kupitisha data hii kwenye mtandao kwa kila mthibitishaji. Kwa hiyo, uthibitishaji kutoka kwa wathibitishaji binafsi hukusanywa ndani ya mitandao midogo kabla ya kutangazwa kwa upana zaidi. Hii inajumuisha kukusanya sahihi pamoja ili uthibitishaji unaotangazwa ujumuishe `data` ya makubaliano na sahihi moja iliyoundwa kwa kuunganisha sahihi za wathibitishaji wote wanaokubaliana na `data` hiyo. Hii inaweza kukaguliwa kwa kutumia `aggregation_bits` kwa sababu hii inatoa faharasa ya kila mthibitishaji katika kamati yao (ambayo ID yake imetolewa katika `data`) ambayo inaweza kutumika kuuliza sahihi za kibinafsi.

Katika kila epoch wathibitishaji 16 katika kila mtandao mdogo huchaguliwa kuwa `wakusanyaji`. Wakusanyaji hukusanya uthibitishaji wote wanaosikia kupitia mtandao wa umbea ambao una `data` sawa na yao. Mtumaji wa kila uthibitishaji unaolingana hurekodiwa katika `aggregation_bits`. Wakusanyaji kisha hutangaza mkusanyiko wa uthibitishaji kwenye mtandao mpana zaidi.

Mthibitishaji anapochaguliwa kuwa mpendekezaji wa bloku, hufunga uthibitishaji uliokusanywa kutoka kwenye mitandao midogo hadi yanayopangwa ya hivi karibuni katika bloku mpya.

### Mzunguko wa maisha ya ujumuishaji wa uthibitishaji {#attestation-inclusion-lifecycle}

1. Uzalishaji
2. Uenezaji
3. Mkusanyiko
4. Uenezaji
5. Ujumuishaji

Mzunguko wa maisha ya uthibitishaji umeelezwa katika mchoro ulio hapa chini:

![mzunguko wa maisha ya uthibitishaji](./attestation_schematic.png)

## Zawadi {#rewards}

Wathibitishaji hupewa zawadi kwa kuwasilisha uthibitishaji. Zawadi ya uthibitishaji inategemea bendera za ushiriki (chanzo, lengo na kichwa), zawadi ya msingi na kiwango cha ushiriki.

Kila moja ya bendera za ushiriki inaweza kuwa ya kweli au ya uongo, kulingana na uthibitishaji uliowasilishwa na ucheleweshaji wake wa ujumuishaji.

Hali bora zaidi hutokea wakati bendera zote tatu ni za kweli, ambapo mthibitishaji angepata (kwa kila bendera sahihi):

`zawadi += zawadi ya msingi * uzito wa bendera * kiwango cha uthibitisho wa bendera / 64`

Kiwango cha uthibitisho wa bendera hupimwa kwa kutumia jumla ya salio faafu za wathibitishaji wote wanaothibitisha kwa bendera husika ikilinganishwa na jumla ya salio faafu linalofanya kazi.

### Zawadi ya msingi {#base-reward}

Zawadi ya msingi huhesabiwa kulingana na idadi ya wathibitishaji wanaothibitisha na salio zao faafu za ether zilizowekwa hisa:

`zawadi ya msingi = salio faafu la mthibitishaji x 2^6 / SQRT(Salio faafu la wathibitishaji wote wanaofanya kazi)`

#### Ucheleweshaji wa ujumuishaji {#inclusion-delay}

Wakati wathibitishaji walipopiga kura kwenye kichwa cha mnyororo (`bloku n`), `bloku n+1` ilikuwa bado haijapendekezwa. Kwa hiyo uthibitishaji kwa kawaida hujumuishwa **bloku moja baadaye** hivyo uthibitishaji wote uliopiga kura kwenye `bloku n` kuwa kichwa cha mnyororo ulijumuishwa katika `bloku n+1` na, **ucheleweshaji wa ujumuishaji** ni 1. Ikiwa ucheleweshaji wa ujumuishaji utaongezeka maradufu hadi yanayopangwa mawili, zawadi ya uthibitishaji hupungua kwa nusu, kwa sababu ili kukokotoa zawadi ya uthibitishaji zawadi ya msingi huzidishwa na kinyume cha ucheleweshaji wa ujumuishaji.

### Matukio ya uthibitishaji {#attestation-scenarios}

#### Mthibitishaji Anayekosekana Kupiga Kura {#missing-voting-validator}

Wathibitishaji wana upeo wa epoch 1 kuwasilisha uthibitishaji wao. Ikiwa uthibitishaji ulikosekana katika epoch 0, wanaweza kuwasilisha kwa ucheleweshaji wa ujumuishaji katika epoch 1.

#### Mkusanyaji Anayekosekana {#missing-aggregator}

Kuna Wakusanyaji 16 kwa kila epoch kwa jumla. Kwa kuongezea, wathibitishaji wa nasibu hujiandikisha kwa **mitandao midogo miwili kwa epoch 256** na hutumika kama hifadhi endapo wakusanyaji watakosekana.

#### Mpendekezaji wa bloku anayekosekana {#missing-block-proposer}

Kumbuka kuwa katika baadhi ya matukio mkusanyaji mwenye bahati anaweza pia kuwa mpendekezaji wa bloku. Ikiwa uthibitishaji haukujumuishwa kwa sababu mpendekezaji wa bloku amekosekana, mpendekezaji wa bloku anayefuata angechukua uthibitishaji uliokusanywa na kuujumuisha katika bloku inayofuata. Hata hivyo, **ucheleweshaji wa ujumuishaji** utaongezeka kwa moja.

## Masomo zaidi {#further-reading}

- [Uthibitishaji katika ufafanuzi wa makubaliano uliotolewa maelezo na Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Uthibitishaji katika eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_
