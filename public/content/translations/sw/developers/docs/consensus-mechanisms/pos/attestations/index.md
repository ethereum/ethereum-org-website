---
title: Uthibitisho
description: Maelezo ya uthibitisho kwenye uthibitisho wa hisa wa Ethereum.
lang: sw
---

Mthibitishaji anatarajiwa kuunda, kutia sahihi na kutangaza uthibitisho wakati wa kila kipindi. Ukurasa huu unaelezea jinsi uthibitisho huu unavyoonekana na jinsi unavyochakatwa na kuwasilishwa kati ya wateja wa mwafaka.

## Uthibitisho ni nini? {#what-is-an-attestation}

Kila [kipindi](/glossary/#epoch) (dakika 6.4) mthibitishaji hutangaza uthibitisho kwenye mtandao. Uthibitisho ni kwa ajili ya sloti maalum katika kipindi. Kusudi la uthibitisho ni kupiga kura kuunga mkono mtazamo wa mthibitishaji wa mnyororo, hasa kichwa cha mnyororo, kituo cha ukaguzi cha hivi karibuni kilichohalalishwa na kituo cha ukaguzi mwanzoni mwa kipindi cha sasa (kinachojulikana kama vituo vya ukaguzi vya `source` na `target`). Taarifa hii huunganishwa kwa wathibitishaji wote wanaoshiriki, na kuwezesha mtandao kufikia mwafaka kuhusu hali ya mnyororo wa vitalu.

Tangu [sasisho la Pectra](/roadmap/pectra/) ([EIP-7549](https://eips.ethereum.org/EIPS/eip-7549)), uthibitisho kutoka kwa mthibitishaji mmoja na uthibitisho uliokusanywa una miundo tofauti. Uthibitisho wa mthibitishaji mmoja una:

- `committee_index`: kamati ambayo mthibitishaji ni mwanachama katika sloti iliyotolewa
- `attester_index`: faharisi ya mthibitishaji
- `data`: maelezo yanayohusiana na uthibitisho, kama ilivyofafanuliwa hapa chini
- `signature`: sahihi ya BLS ya mthibitishaji juu ya `data`

Kazi ya kwanza kwa mthibitishaji anayethibitisha ni kuunda `data`. `data` ina taarifa zifuatazo:

- `slot`: Nambari ya sloti ambayo uthibitisho unarejelea
- `index`: Imewekwa kuwa `0` tangu Pectra. Kamati inatambulishwa nje ya `data` (kwa `committee_index`, au kwa `committee_bits` katika mkusanyiko) ili kura kutoka kwa kamati tofauti ziwe na `data` zinazofanana na ziweze kukusanywa pamoja. Kabla ya Pectra, uwanja huu ulitambulisha kamati
- `beacon_block_root`: Heshi ya mzizi ya kitalu ambacho mthibitishaji anakiona kwenye kichwa cha mnyororo (matokeo ya kutumia algoriti ya kuchagua mchepuo)
- `source`: Sehemu ya kura ya ukamilifu inayoonyesha kile wathibitishaji wanachokiona kama kituo cha ukaguzi cha hivi karibuni kilichohalalishwa
- `target`: Sehemu ya kura ya ukamilifu inayoonyesha kile wathibitishaji wanachokiona kama kituo cha ukaguzi mwanzoni mwa kipindi cha sasa (kitalu kwenye sloti yake ya kwanza, au kitalu cha hivi karibuni kabla yake ikiwa sloti hiyo ni tupu)

Mara tu `data` inapoundwa, mthibitishaji huitia sahihi na kutangaza uthibitisho kwenye [mtandao mdogo](#aggregated-attestation) kwa ajili ya kamati yake.

### Uthibitisho uliokusanywa {#aggregated-attestation}

Kuna mzigo mkubwa unaohusishwa na kupitisha data hii kwenye mtandao kwa kila mthibitishaji. Kwa hivyo, uthibitisho kutoka kwa wathibitishaji binafsi hukusanywa ndani ya mitandao midogo kabla ya kutangazwa kwa upana zaidi. Hii inajumuisha kukusanya sahihi pamoja ili uthibitisho unaotangazwa ujumuishe `data` ya mwafaka na sahihi moja inayoundwa kwa kuchanganya sahihi za wathibitishaji wote wanaokubaliana na `data` hiyo. Uthibitisho uliokusanywa una:

- `aggregation_bits`: orodha ya biti yenye biti moja kwa kila mwanachama wa kila kamati iliyojumuishwa, ambapo nafasi inalingana na nafasi ya mthibitishaji katika kamati yake; thamani (0/1) inaonyesha ikiwa sahihi ya mthibitishaji huyo imejumuishwa
- `data`: data ya uthibitisho ambayo kila mthibitishaji aliyejumuishwa alitia sahihi
- `signature`: sahihi ya BLS inayokusanya sahihi za wathibitishaji waliojumuishwa
- `committee_bits`: wanachama wa kamati zipi wanashughulikiwa by `aggregation_bits`

Mtu yeyote anaweza kuangalia sahihi iliyokusanywa dhidi ya funguo za umma zilizounganishwa za wathibitishaji ambao biti zao zimewekwa.

Katika kila sloti, takriban wanachama 16 wa kila kamati huchaguliwa kuwa `aggregators` wake (`TARGET_AGGREGATORS_PER_COMMITTEE`). Mthibitishaji hujua ikiwa alichaguliwa kutoka kwa sahihi yake mwenyewe juu ya nambari ya sloti. Wakusanyaji hukusanya uthibitisho wote wanaousikia kwenye mtandao mdogo wa kamati yao ambao una `data` sawa na wao, na kuuchanganya, wakirekodi mtumaji wa kila mmoja katika `aggregation_bits`. Kisha wakusanyaji hutangaza mkusanyiko huo kwenye mtandao mpana zaidi.

Wakati mthibitishaji anachaguliwa kuwa mpendekezaji wa bloku, hujumuisha uthibitisho uliokusanywa kutoka kwa sloti za hivi karibuni katika kitalu kipya. Tangu Pectra, mpendekezaji anaweza kuunganisha mikusanyiko kutoka kwa kamati tofauti zinazoshiriki `data` sawa kuwa uthibitisho mmoja, na kitalu kinaweza kushikilia hadi 8 kati yao.

### Mzunguko wa maisha wa ujumuishaji wa uthibitisho {#attestation-inclusion-lifecycle}

1. Uundaji
2. Uenezaji
3. Ukusanyaji
4. Uenezaji
5. Ujumuishaji

Mzunguko wa maisha wa uthibitisho umeainishwa katika mchoro hapa chini:

<AttestationsDiagram />

## Tuzo {#rewards}

Wathibitishaji hupewa tuzo kwa kuwasilisha uthibitisho. Tuzo ya uthibitisho inategemea bendera za ushiriki (chanzo, lengo na kichwa), tuzo ya msingi na kiwango cha ushiriki.

Kila moja ya bendera za ushiriki inaweza kuwa kweli au si kweli, kulingana na uthibitisho uliowasilishwa na ucheleweshaji wake wa kujumuishwa.

Hali bora zaidi hutokea wakati bendera zote tatu ni za kweli, ambapo mthibitishaji atapata (kwa kila bendera sahihi):

`reward += base reward * flag weight * flag attesting rate / 64`

Kiwango cha uthibitishaji wa bendera hupimwa kwa kutumia jumla ya salio tendaji la wathibitishaji wote wanaothibitisha kwa bendera iliyotolewa ikilinganishwa na jumla ya salio tendaji linalofanya kazi.

### Tuzo ya msingi {#base-reward}

Tuzo ya msingi huhesabiwa kulingana na idadi ya wathibitishaji wanaothibitisha na salio lao tendaji la Etha iliyowekwa dhamana:

`base reward = validator effective balance x 2^6 / SQRT(Effective balance of all active validators)`

#### Ucheleweshaji wa kujumuishwa {#inclusion-delay}

Wakati wathibitishaji walipopiga kura kwenye kichwa cha mnyororo (`block n`), `block n+1` kilikuwa bado hakijapendekezwa. Kwa hivyo uthibitisho kwa asili hujumuishwa **kitalu kimoja baadaye** hivyo uthibitisho wote uliopiga kura kwenye `block n` kuwa kichwa cha mnyororo ulijumuishwa katika `block n+1` na, **ucheleweshaji wa kujumuishwa** ni 1. Ucheleweshaji wa kujumuishwa huamua ni bendera zipi za ushiriki ambazo uthibitisho unapata:

- `head`: tu ikiwa ucheleweshaji wa kujumuishwa ni sloti 1 kamili
- `source`: ikiwa ucheleweshaji wa kujumuishwa ni angalau sloti 5 (kipeo cha pili cha nambari kamili cha sloti 32 katika kipindi)
- `target`: wakati wowote uthibitisho unapojumuishwa (tangu sasisho la Deneb, [EIP-7045](https://eips.ethereum.org/EIPS/eip-7045))

Kwa hivyo uthibitisho uliojumuishwa sloti mbili kwa kuchelewa hupoteza tuzo yake ya kichwa lakini bado hupata tuzo za chanzo na lengo.

### Matukio ya uthibitisho {#attestation-scenarios}

#### Mthibitishaji Anayepiga Kura Aliyekosekana {#missing-voting-validator}

Uthibitisho unaweza kujumuishwa katika kitalu chochote kuanzia sloti baada ya kufanywa hadi mwisho wa kipindi kinachofuata. Ikiwa uthibitisho kutoka kipindi cha 0 haujajumuishwa katika kitalu wakati wa kipindi cha 0, bado unaweza kujumuishwa katika kipindi cha 1, na ucheleweshaji mrefu zaidi wa kujumuishwa.

#### Mkusanyaji Aliyekosekana {#missing-aggregator}

Kila kamati inalenga kuwa na wakusanyaji takriban 16 katika kila sloti, kwa hivyo mkusanyaji mmoja aliyekosekana mara chache huzuia uthibitisho wa kamati kukusanywa. Kando na hayo, kila nodi ya kinara hubaki imejiandikisha kwenye **mitandao midogo miwili kwa vipindi 256** kwa wakati mmoja, iliyochaguliwa kutoka kwa kitambulisho chake cha nodi, ambayo huweka kila mtandao mdogo ukiwa umeunganishwa vizuri.

#### Mpendekezaji wa bloku aliyekosekana {#missing-block-proposer}

Kumbuka kwamba katika baadhi ya matukio mkusanyaji mwenye bahati anaweza pia kuwa mpendekezaji wa bloku. Ikiwa uthibitisho haukujumuishwa kwa sababu mpendekezaji wa bloku amekosekana, mpendekezaji wa bloku anayefuata atachukua uthibitisho uliokusanywa na kuujumuisha katika kitalu kinachofuata. Hata hivyo, **ucheleweshaji wa kujumuishwa** utaongezeka kwa moja.

## Kusoma zaidi {#further-reading}

- [Uthibitisho katika maelezo ya mwafaka yaliyofafanuliwa ya Vitalik](https://github.com/ethereum/annotated-spec/blob/master/phase0/beacon-chain.md#attestationdata)
- [Uthibitisho katika eth2book.info](https://eth2book.info/capella/part3/containers/dependencies/#attestationdata)
- [Uthibitisho katika maelezo ya mwafaka ya Electra](https://github.com/ethereum/consensus-specs/blob/master/specs/electra/beacon-chain.md#attestation)

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_
