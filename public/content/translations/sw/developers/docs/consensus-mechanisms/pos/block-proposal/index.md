---
title: Pendekezo la bloku
description: Maelezo ya jinsi bloku zinavyopendekezwa katika uthibitisho wa hisa wa Ethereum.
lang: sw
---

Bloku ndio vitengo vya msingi vya mnyororo wa bloku. Bloku ni vitengo tofauti vya habari vinavyopitishwa kati ya nodi, kukubaliwa na kuongezwa kwenye hifadhidata ya kila nodi. Ukurasa huu unaelezea jinsi zinavyotengenezwa.

## Mahitaji ya awali {#prerequisites}

Pendekezo la bloku ni sehemu ya itifaki ya uthibitisho wa hisa. Ili kusaidia kuelewa ukurasa huu, tunapendekeza usome kuhusu [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/) na [usanifu wa bloku](/developers/docs/blocks/).

## Nani anayetengeneza bloku? {#who-produces-blocks}

Akaunti za wathibitishaji hupendekeza bloku. Akaunti za wathibitishaji husimamiwa na waendeshaji wa nodi wanaoendesha programu ya wathibitishaji kama sehemu ya wateja wao wa utekelezaji na makubaliano na wameweka angalau ETH 32 kwenye mkataba wa amana. Hata hivyo, kila mthibitishaji huwajibika mara kwa mara tu kupendekeza bloku. Ethereum hupima muda katika nafasi na epochs. Kila nafasi ni sekunde kumi na mbili, na nafasi 32 (dakika 6.4) hufanya epoch moja. Kila nafasi ni fursa ya kuongeza bloku mpya kwenye Ethereum.

### Uteuzi nasibu {#random-selection}

Mthibitishaji mmoja huchaguliwa kwa njia isiyo ya kawaida ili kupendekeza bloku katika kila nafasi. Hakuna kitu kama nasibu ya kweli katika mnyororo wa bloku kwa sababu kama kila nodi ingezalisha nambari nasibu kweli, wasingeweza kufikia makubaliano. Badala yake, lengo ni kufanya mchakato wa uteuzi wa mthibitishaji usiweze kutabirika. Unasibu unafikiwa kwenye Ethereum kwa kutumia algoriti inayoitwa RANDAO inayochanganya hashi kutoka kwa mpendekezaji wa bloku na mbegu ambayo husasishwa kila bloku. Thamani hii hutumiwa kuchagua mthibitishaji maalum kutoka kwa seti nzima ya wathibitishaji. Uteuzi wa wathibitishaji umewekwa epochs mbili mapema kama njia ya kujilinda dhidi ya aina fulani za udukuzi wa mbegu.

Ingawa wathibitishaji huongeza kwenye RANDAO katika kila nafasi, thamani ya RANDAO ya kimataifa inasasishwa mara moja tu kwa kila epoch. Ili kukokotoa faharasa ya mpendekezaji wa bloku inayofuata, thamani ya RANDAO huchanganywa na nambari ya nafasi ili kutoa thamani ya kipekee katika kila nafasi. Uwezekano wa mthibitishaji binafsi kuchaguliwa si tu `1/N` (ambapo `N` = jumla ya wathibitishaji wanaofanya kazi). Badala yake, ina uzito kulingana na salio la ETH linalofaa la kila mthibitishaji. Salio la juu zaidi linalofaa ni ETH 32 (hii inamaanisha kuwa `salio < 32 ETH` husababisha uzito wa chini kuliko `salio == 32 ETH`, lakini `salio > 32 ETH` haisababishi uzito wa juu kuliko `salio == 32 ETH`).

Mpendekezaji mmoja tu wa bloku huchaguliwa katika kila nafasi. Katika hali ya kawaida, mtengenezaji mmoja wa bloku hutengeneza na kutoa bloku moja katika nafasi yake maalum. Kuunda bloku mbili kwa nafasi moja ni kosa linaloweza kusababisha kupunguzwa, mara nyingi hujulikana kama "utata".

## Bloku huundwaje? {#how-is-a-block-created}

Mpendekezaji wa bloku anatarajiwa kutangaza bloku ya beacon iliyosainiwa ambayo inajengwa juu ya mkuu wa hivi karibuni wa mnyororo kulingana na mtazamo wa algoriti yao ya kuchagua uma inayoendeshwa ndani. Algoriti ya uteuzi wa uma hutumia uthibitishaji wowote uliowekwa kwenye foleni uliobaki kutoka kwenye nafasi ya awali, kisha hupata bloku yenye uzito mkubwa zaidi uliokusanywa wa uthibitishaji katika historia yake. Bloku hiyo ndiyo mzazi wa bloku mpya iliyoundwa na mpendekezaji.

Mpendekezaji wa bloku hutengeneza bloku kwa kukusanya data kutoka kwenye hifadhidata yake ya ndani na mtazamo wa mnyororo. Yaliyomo kwenye bloku yanaonyeshwa kwenye dondoo hapa chini:

```rust
class BeaconBlockBody(Container):
    randao_reveal: BLSSignature
    eth1_data: Eth1Data
    graffiti: Bytes32
    proposer_slashings: List[ProposerSlashing, MAX_PROPOSER_SLASHINGS]
    attester_slashings: List[AttesterSlashing, MAX_ATTESTER_SLASHINGS]
    attestations: List[Attestation, MAX_ATTESTATIONS]
    deposits: List[Deposit, MAX_DEPOSITS]
    voluntary_exits: List[SignedVoluntaryExit, MAX_VOLUNTARY_EXITS]
    sync_aggregate: SyncAggregate
    execution_payload: ExecutionPayload
```

Sehemu ya `randao_reveal` inachukua thamani nasibu inayoweza kuthibitishwa ambayo mpendekezaji wa bloku huunda kwa kusaini nambari ya epoch ya sasa. `eth1_data` ni kura kwa mtazamo wa mpendekezaji wa bloku wa mkataba wa amana, ikiwa ni pamoja na mzizi wa amana ya Merkle trie na jumla ya idadi ya amana zinazowezesha amana mpya kuthibitishwa. `graffiti` ni sehemu ya hiari ambayo inaweza kutumika kuongeza ujumbe kwenye bloku. `proposer_slashings` na `attester_slashings` ni sehemu zenye uthibitisho kwamba wathibitishaji fulani wamefanya makosa yanayoweza kusababisha kupunguzwa kulingana na mtazamo wa mpendekezaji wa mnyororo. `deposits` ni orodha ya amana mpya za wathibitishaji ambazo mpendekezaji wa bloku anazifahamu, na `voluntary_exits` ni orodha ya wathibitishaji wanaotaka kujiondoa ambayo mpendekezaji wa bloku amesikia kuihusu kwenye mtandao wa porojo wa safu ya makubaliano. `sync_aggregate` ni vekta inayoonyesha ni wathibitishaji gani waliopewa hapo awali kamati ya kusawazisha (kikundi kidogo cha wathibitishaji wanaohudumia data ya mteja mwepesi) na walishiriki katika kusaini data.

`execution_payload` huwezesha taarifa kuhusu miamala kupitishwa kati ya wateja wa utekelezaji na makubaliano. `execution_payload` ni bloku ya data ya utekelezaji ambayo huwekwa ndani ya bloku ya beacon. Sehemu zilizo ndani ya `execution_payload` zinaakisi muundo wa bloku uliobainishwa katika karatasi ya manjano ya Ethereum, isipokuwa hakuna ommers na `prev_randao` ipo badala ya `difficulty`. Mteja wa utekelezaji ana ufikiaji wa hifadhi ya ndani ya miamala ambayo ameisikia kwenye mtandao wake wa porojo. Miamala hii inatekelezwa ndani ya nchi ili kuzalisha trie ya hali iliyosasishwa inayojulikana kama hali ya baada. Miamala imejumuishwa katika `execution_payload` kama orodha inayoitwa `transactions` na hali ya baada inatolewa katika sehemu ya `state-root`.

Data hizi zote hukusanywa katika bloku ya beacon, husainiwa, na kutangazwa kwa wenzao wa mpendekezaji wa bloku, ambao huisambaza kwa wenzao, na kadhalika.

Soma zaidi kuhusu [muundo wa bloku](/developers/docs/blocks).

## Nini kinatokea kwa bloku? {#what-happens-to-blocks}

Bloku huongezwa kwenye hifadhidata ya ndani ya mpendekezaji wa bloku na kutangazwa kwa wenzao kupitia mtandao wa porojo wa safu ya makubaliano. Mthibitishaji anapopokea bloku, huthibitisha data iliyo ndani yake, ikiwa ni pamoja na kuangalia kama bloku ina mzazi sahihi, inalingana na nafasi sahihi, kwamba faharasa ya mpendekezaji ndiyo inayotarajiwa, kwamba ufichuzi wa RANDAO ni halali na kwamba mpendekezaji hajapunguzwa. `execution_payload` imetenganishwa, na mteja wa utekelezaji wa mthibitishaji hutekeleza tena miamala katika orodha ili kuangalia mabadiliko ya hali yaliyopendekezwa. Kwa kudhania bloku inapita ukaguzi huu wote, kila mthibitishaji huongeza bloku kwenye mnyororo wake mkuu. Mchakato huo kisha huanza tena katika nafasi inayofuata.

## Zawadi za Bloku {#block-rewards}

Mpendekezaji wa bloku hupokea malipo kwa kazi yao. Kuna `zawadi ya msingi` inayokokotolewa kama kitendo cha idadi ya wathibitishaji wanaofanya kazi na salio zao zinazofaa. Kisha mpendekezaji wa bloku hupokea sehemu ya `zawadi ya msingi` kwa kila uthibitishaji halali uliojumuishwa kwenye bloku; kadiri wathibitishaji wengi wanavyothibitisha bloku, ndivyo zawadi ya mpendekezaji wa bloku inavyokuwa kubwa. Pia kuna zawadi ya kuripoti wathibitishaji wanaopaswa kupunguzwa, sawa na `1/512 * salio linalofaa` kwa kila mthibitishaji aliyepunguzwa.

[Zaidi kuhusu zawadi na adhabu](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Masomo zaidi {#further-reading}

- [Utangulizi wa bloku](/developers/docs/blocks/)
- Utangulizi wa Uthibitisho wa Rehani
- [Vigezo vya makubaliano vya Ethereum](https://github.com/ethereum/consensus-specs)
- [Utangulizi wa Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Kuboresha Ethereum](https://eth2book.info/)
