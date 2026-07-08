---
title: Pendekezo la kitalu
description: Maelezo ya jinsi vitalu vinavyopendekezwa katika Uthibitisho wa Dau wa Ethereum.
lang: sw
---

Vitalu ni vipengele vya msingi vya mnyororo wa vitalu. Vitalu ni vipengele tofauti vya taarifa ambavyo hupitishwa kati ya nodi, kukubaliwa na kuongezwa kwenye hifadhidata ya kila nodi. Ukurasa huu unaeleza jinsi vinavyozalishwa.

## Mahitaji ya awali {#prerequisites}

Pendekezo la kitalu ni sehemu ya itifaki ya Uthibitisho wa Dau. Ili kusaidia kuelewa ukurasa huu, tunapendekeza usome kuhusu [Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/) na [usanifu wa kitalu](/developers/docs/blocks/).

## Nani anazalisha vitalu? {#who-produces-blocks}

Akaunti za mthibitishaji hupendekeza vitalu. Akaunti za mthibitishaji zinasimamiwa na waendeshaji wa nodi wanaoendesha programu ya mthibitishaji kama sehemu ya viteja vyao vya utekelezaji na mwafaka na wameweka amana ya angalau 32 ETH kwenye mkataba wa amana. Hata hivyo, kila mthibitishaji anawajibika mara chache tu kupendekeza kitalu. [Ethereum](/) hupima muda katika sloti na vipindi. Kila sloti ni sekunde kumi na mbili, na sloti 32 (dakika 6.4) huunda kipindi. Kila sloti ni fursa ya kuongeza kitalu kipya kwenye Ethereum.

### Uteuzi wa nasibu {#random-selection}

Mthibitishaji mmoja huchaguliwa kwa unasibu bandia kupendekeza kitalu katika kila sloti. Hakuna kitu kama unasibu wa kweli katika mnyororo wa vitalu kwa sababu ikiwa kila nodi ingezalisha nambari za nasibu za kweli, hazingeweza kufikia mwafaka. Badala yake, lengo ni kufanya mchakato wa uteuzi wa mthibitishaji usiweze kutabirika. Unasibu unafikiwa kwenye Ethereum kwa kutumia algoriti inayoitwa RANDAO ambayo huchanganya heshi kutoka kwa mpendekezaji wa bloku na mbegu inayosasiswa kila kitalu. Thamani hii inatumika kuchagua mthibitishaji maalum kutoka kwa kundi lote la wathibitishaji. Uteuzi wa mthibitishaji hupangwa vipindi viwili mapema kama njia ya kulinda dhidi ya aina fulani za uchezeshaji wa mbegu.

Ingawa wathibitishaji huongeza kwenye RANDAO katika kila sloti, thamani ya kimataifa ya RANDAO inasasishwa mara moja tu kwa kila kipindi. Ili kukokotoa faharisi ya mpendekezaji wa bloku anayefuata, thamani ya RANDAO inachanganywa na nambari ya sloti ili kutoa thamani ya kipekee katika kila sloti. Uwezekano wa mthibitishaji binafsi kuchaguliwa sio tu `1/N` (ambapo `N` = jumla ya wathibitishaji hai). Badala yake, inapimwa kwa uzito wa salio tendaji la ETH la kila mthibitishaji. Salio tendaji la juu zaidi ni 32 ETH (hii inamaanisha kuwa `balance < 32 ETH` husababisha uzito wa chini kuliko `balance == 32 ETH`, lakini `balance > 32 ETH` haisababishi uzito wa juu kuliko `balance == 32 ETH`).

Mpendekezaji wa bloku mmoja tu ndiye anayechaguliwa katika kila sloti. Chini ya hali ya kawaida, mzalishaji mmoja wa kitalu huunda na kutoa kitalu kimoja katika sloti yake maalum. Kuunda vitalu viwili kwa sloti moja ni kosa la ukataji, ambalo mara nyingi hujulikana kama "kura kinzani".

## Kitalu kinaundwaje? {#how-is-a-block-created}

Mpendekezaji wa bloku anatarajiwa kutangaza kitalu cha kinara kilichosainiwa ambacho kinajengwa juu ya kichwa cha hivi karibuni cha mnyororo kulingana na mtazamo wa algoriti ya kuchagua mchepuko inayoendeshwa ndani ya mfumo wake. Algoriti ya kuchagua mchepuko inatumia uthibitisho wowote uliopangwa kwenye foleni uliobaki kutoka kwenye sloti iliyopita, kisha inatafuta kitalu chenye uzito mkubwa zaidi uliokusanywa wa uthibitisho katika historia yake. Kitalu hicho ndicho mzazi wa kitalu kipya kilichoundwa na mpendekezaji.

Mpendekezaji wa bloku huunda kitalu kwa kukusanya data kutoka kwenye hifadhidata yake ya ndani na mtazamo wa mnyororo. Yaliyomo kwenye kitalu yanaonyeshwa kwenye kijisehemu hapa chini:

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

Uga wa `randao_reveal` huchukua thamani ya nasibu inayoweza kuthibitishwa ambayo mpendekezaji wa bloku huunda kwa kusaini nambari ya kipindi cha sasa. `eth1_data` ni kura kwa mtazamo wa mpendekezaji wa bloku kuhusu mkataba wa amana, ikijumuisha mzizi wa trie ya Merkle ya amana na jumla ya idadi ya amana zinazowezesha amana mpya kuthibitishwa. `graffiti` ni uga wa hiari ambao unaweza kutumika kuongeza ujumbe kwenye kitalu. `proposer_slashings` na `attester_slashings` ni nyanja zinazojumuisha uthibitisho kwamba wathibitishaji fulani wamefanya makosa ya ukataji kulingana na mtazamo wa mpendekezaji wa mnyororo. `deposits` ni orodha ya amana mpya za mthibitishaji ambazo mpendekezaji wa bloku anazifahamu, na `voluntary_exits` ni orodha ya wathibitishaji wanaotaka kujitoa ambayo mpendekezaji wa bloku amesikia kuihusu kwenye mtandao wa porojo wa tabaka la mwafaka. `sync_aggregate` ni vekta inayoonyesha ni wathibitishaji gani walipangiwa hapo awali kwenye kamati ya usawazishaji (kikundi kidogo cha wathibitishaji wanaohudumia data ya kiteja chepesi) na walishiriki katika kusaini data.

`execution_payload` huwezesha taarifa kuhusu miamala kupitishwa kati ya viteja vya utekelezaji na mwafaka. `execution_payload` ni kitalu cha data ya utekelezaji ambacho hupachikwa ndani ya kitalu cha kinara. Nyanja zilizo ndani ya `execution_payload` zinaonyesha muundo wa kitalu ulioainishwa kwenye waraka wa manjano wa Ethereum, isipokuwa kwamba hakuna ommers na `prev_randao` ipo badala ya `difficulty`. Kiteja cha utekelezaji kina ufikiaji wa bwawa la ndani la miamala ambayo kimesikia kuihusu kwenye mtandao wake wa porojo. Miamala hii inatekelezwa ndani ya mfumo ili kuzalisha trie ya hali iliyosasishwa inayojulikana kama hali-baada. Miamala inajumuishwa kwenye `execution_payload` kama orodha inayoitwa `transactions` na hali-baada inatolewa kwenye uga wa `state-root`.

Data hizi zote zinakusanywa katika kitalu cha kinara, kusainiwa, na kutangazwa kwa wenzao wa mpendekezaji wa bloku, ambao huieneza kwa wenzao, n.k.

Soma zaidi kuhusu [anatomia ya vitalu](/developers/docs/blocks).

## Nini kinatokea kwa kitalu? {#what-happens-to-blocks}

Kitalu kinaongezwa kwenye hifadhidata ya ndani ya mpendekezaji wa bloku na kutangazwa kwa wenzao kupitia mtandao wa porojo wa tabaka la mwafaka. Wakati mthibitishaji anapokea kitalu, huthibitisha data iliyo ndani yake, ikijumuisha kuangalia kwamba kitalu kina mzazi sahihi, kinalingana na sloti sahihi, kwamba faharisi ya mpendekezaji ndiyo inayotarajiwa, kwamba ufichuzi wa RANDAO ni halali na kwamba mpendekezaji hajakatwa. `execution_payload` inafunguliwa, na kiteja cha utekelezaji cha mthibitishaji hutekeleza tena miamala kwenye orodha ili kuangalia mabadiliko ya hali yaliyopendekezwa. Kwa kudhani kitalu kinapita ukaguzi huu wote, kila mthibitishaji huongeza kitalu kwenye mnyororo wake rasmi. Mchakato kisha huanza tena katika sloti inayofuata.

## Tuzo za kitalu {#block-rewards}

Mpendekezaji wa bloku hupokea malipo kwa kazi yake. Kuna `base_reward` inayokokotolewa kama utendakazi wa idadi ya wathibitishaji hai na salio lao tendaji. Mpendekezaji wa bloku kisha hupokea sehemu ya `base_reward` kwa kila uthibitisho halali uliojumuishwa kwenye kitalu; kadiri wathibitishaji wengi wanavyothibitisha kitalu, ndivyo tuzo ya mpendekezaji wa bloku inavyokuwa kubwa. Pia kuna tuzo ya kuripoti wathibitishaji wanaopaswa kukatwa, sawa na `1/512 * effective balance` kwa kila mthibitishaji aliyekatwa.

[Zaidi kuhusu tuzo na adhabu](/developers/docs/consensus-mechanisms/pos/rewards-and-penalties)

## Usomaji zaidi {#further-reading}

- [Utangulizi wa vitalu](/developers/docs/blocks/)
- [Utangulizi wa Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/)
- [Vipimo vya mwafaka wa Ethereum](https://github.com/ethereum/consensus-specs)
- [Utangulizi wa Gasper](/developers/docs/consensus-mechanisms/pos/gasper/)
- [Kuboresha Ethereum](https://eth2book.info/)