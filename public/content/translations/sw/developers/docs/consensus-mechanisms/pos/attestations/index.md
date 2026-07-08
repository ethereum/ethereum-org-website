---
title: Uthibitisho
description: Maelezo ya uthibitisho kwenye uthibitisho wa hisa wa Ethereum.
lang: sw
---

Mthibitishaji anatarajiwa kuunda, kutia sahihi na kutangaza uthibitisho wakati wa kila kipindi. Ukurasa huu unaelezea jinsi uthibitisho huu unavyoonekana na jinsi unavyochakatwa na kuwasilishwa kati ya wateja wa mwafaka.

## Uthibitisho ni nini? {#what-is-an-attestation}

Kila [kipindi](/glossary/#epoch) (dakika 6.4) mthibitishaji hupendekeza uthibitisho kwenye mtandao. Uthibitisho ni kwa ajili ya sloti maalum katika kipindi. Kusudi la uthibitisho ni kupiga kura kuunga mkono mtazamo wa mthibitishaji wa mnyororo, haswa kitalu cha hivi karibuni kilichohalalishwa na kitalu cha kwanza katika kipindi cha sasa (kinachojulikana kama vituo vya ukaguzi vya `source` na `target`). Taarifa hii hujumuishwa kwa wathibitishaji wote wanaoshiriki, na kuwezesha mtandao kufikia mwafaka kuhusu hali ya mnyororo wa vitalu.

Uthibitisho una vipengele vifuatavyo:

- `aggregation_bits`: orodha ya biti ya wathibitishaji ambapo nafasi inalingana na faharisi ya mthibitishaji katika kamati yao; thamani (0/1) inaonyesha ikiwa mthibitishaji alitia sahihi `data` (yaani, ikiwa wanafanya kazi na wanakubaliana na mpendekezaji wa bloku)
- `data`: maelezo yanayohusiana na uthibitisho, kama ilivyofafanuliwa hapa chini
- `signature`: sahihi ya BLS inayojumuisha sahihi za wathibitishaji binafsi

Kazi ya kwanza kwa mthibitishaji anayethibitisha ni kuunda `data`. `data` ina taarifa zifuatazo:

- `slot`: Nambari ya sloti ambayo uthibitisho unarejelea
- `index`: Nambari inayotambulisha kamati ambayo mthibitishaji ni mwanachama katika sloti fulani
- `beacon_block_root`: Heshi ya mzizi ya kitalu ambacho mthibitishaji anakiona kwenye kichwa cha mnyororo (matokeo ya kutumia algoriti ya uchaguzi wa mchepuo)
- `source`: Sehemu ya kura ya ukamilifu inayoonyesha kile wathibitishaji wanachokiona kama kitalu cha hivi karibuni kilichohalalishwa
- `target`: Sehemu ya kura ya ukamilifu inayoonyesha kile wathibitishaji wanachokiona kama kitalu cha kwanza katika kipindi cha sasa

Mara tu `data` inapoundwa, mthibitishaji anaweza kubadilisha biti katika `aggregation_bits` inayolingana na faharisi yao wenyewe ya mthibitishaji kutoka 0 hadi 1 ili kuonyesha kuwa walishiriki.

Hatimaye, mthibitishaji hutia sahihi uthibitisho na kuutangaza kwenye mtandao.

### Uthibitisho uliojumuishwa {#aggregated-attestation}

Kuna mzigo mkubwa unaohusishwa na kupitisha data hii kwenye mtandao kwa kila mthibitishaji. Kwa hivyo, uthibitisho kutoka kwa wathibitishaji binafsi hujumuishwa ndani ya mitandao midogo kabla ya kutangazwa kwa upana zaidi. Hii inajumuisha kujumuisha sahihi pamoja ili uthibitisho unaotangazwa ujumuishe mwafaka wa `data` na sahihi moja inayoundwa kwa kuchanganya sahihi za wathibitishaji wote wanaokubaliana na `data` hiyo. Hii inaweza kuangaliwa kwa kutumia `aggregation_bits` kwa sababu hii inatoa faharisi ya kila mthibitishaji katika kamati yao (ambayo kitambulisho chake kimetolewa katika `data`) ambayo inaweza kutumika kuulizia sahihi za mtu binafsi.

Katika kila kipindi wathibitishaji 16 katika kila mtandao mdogo huchaguliwa kuwa `aggregators`. Wajumuishaji hukusanya uthibitisho wote wanaousikia kupitia mtandao wa uvumi ambao una `data` sawa na wao. Mtumaji wa kila uthibitisho unaolingana hurekodiwa katika `aggregation_bits`. Kisha wajumuishaji hutangaza mjumuisho wa uthibitisho kwenye mtandao mpana zaidi.

Wakati mthibitishaji anachaguliwa kuwa mpendekezaji wa bloku, hufunga uthibitisho uliojumuishwa kutoka kwenye mitandao midogo hadi kwenye sloti ya hivi karibuni katika kitalu kipya.

### Mzunguko wa maisha wa ujumuishaji wa uthibitisho {#attestation-inclusion-lifecycle}

1. Uundaji
2. Uenezaji
3. Ukusanyaji
4. Uenezaji
5. Ujumuishaji

Mzunguko wa maisha wa uthibitisho umeainishwa katika mchoro hapa chini:

![attestation lifecycle](./attestation_schematic.png)

## Tuzo {#rewards}

Wathibitishaji hupewa tuzo kwa kuwasilisha uthibitisho. Tuzo ya uthibitisho inategemea bendera za ushiriki (chanzo, lengo na kichwa), tuzo ya msingi na kiwango cha ushiriki.

Kila moja ya bendera za ushiriki inaweza kuwa kweli au si kweli, kulingana na uthibitisho uliowasilishwa na ucheleweshaji wake wa ujumuishaji.

Hali bora zaidi hutokea wakati bendera zote tatu ni za kweli, ambapo mthibitishaji atapata (kwa kila bendera sahihi):

`reward += base reward * flag weight * flag attesting rate / 64`

Kiwango cha uthibitishaji wa bendera hupimwa kwa kutumia jumla ya salio tendaji la wathibitishaji wote wanaothibitisha kwa bendera iliyotolewa ikilinganishwa na jumla ya salio tendaji linalofanya kazi.

### Tuzo ya msingi {#base-reward}

Tuzo ya msingi hukokotolewa kulingana na idadi ya wathibitishaji wanaothibitisha na salio lao tendaji la Etha lililowekwa dhamana:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Ucheleweshaji wa ujumuishaji {#inclusion-delay}

Wakati wathibitishaji walipopiga kura kwenye kichwa cha mnyororo (`block n`), `block n+1` kilikuwa bado hakijapendekezwa. Kwa hivyo uthibitisho kwa kawaida hujumuishwa **kitalu kimoja baadaye** kwa hivyo uthibitisho wote uliopiga kura kwenye `block n` kuwa kichwa cha mnyororo ulijumuishwa katika `block n+1` na, **ucheleweshaji wa ujumuishaji** ni 1. Ikiwa ucheleweshaji wa ujumuishaji utaongezeka maradufu hadi sloti mbili, tuzo ya uthibitisho hupungua nusu, kwa sababu ili kukokotoa tuzo ya uthibitisho tuzo ya msingi huzidishwa na kinyume cha ucheleweshaji wa ujumuishaji.

### Matukio ya uthibitisho {#attestation-scenarios}

#### Mthibitishaji Anayepiga Kura Aliyekosekana {#missing-voting-validator}

Wathibitishaji wana kiwango cha juu cha kipindi 1 cha kuwasilisha uthibitisho wao. Ikiwa uthibitisho ulikosekana katika kipindi cha 0, wanaweza kuuwasilisha kwa ucheleweshaji wa ujumuishaji katika kipindi cha 1.

#### Mkusanyaji Aliyekosekana {#missing-aggregator}

Kuna Wakusanyaji 16 kwa kila kipindi kwa jumla. Kwa kuongezea, wathibitishaji wa nasibu hujiandikisha kwenye **mitandao midogo miwili kwa vipindi 256** na hutumika kama mbadala endapo wakusanyaji watakosekana.

#### Mpendekezaji wa bloku aliyekosekana {#missing-block-proposer}

Kumbuka kwamba katika baadhi ya matukio mkusanyaji mwenye bahati anaweza pia kuwa mpendekezaji wa bloku. Ikiwa uthibitisho haukujumuishwa kwa sababu mpendekezaji wa bloku amekosekana, mpendekezaji wa bloku anayefuata atachukua uthibitisho uliokusanywa na kuujumuisha kwenye kitalu kinachofuata. Hata hivyo, **ucheleweshaji wa ujumuishaji** utaongezeka kwa moja.

## Usomaji zaidi {#further-reading}

- [Uthibitisho katika maelezo ya mwafaka yaliyofafanuliwa ya Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Uthibitisho katika eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_