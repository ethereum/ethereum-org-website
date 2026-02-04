---
title: Vipande
description: Muhtasari wa bloku katika mnyororo wa bloku wa Ethereum – muundo wao wa data, kwa nini zinahitajika, na jinsi zinavyotengenezwa.
lang: sw
---

Bloku ni makundi ya miamala yenye hashi ya bloku iliyotangulia katika mnyororo. Hii inaunganisha bloku pamoja (katika mnyororo) kwa sababu hashi hutokana na usimbaji fiche kutoka kwa data ya bloku. Hii inazuia udanganyifu, kwa sababu badiliko moja katika bloku yoyote katika historia litabatilisha bloku zote zinazofuata kwa kuwa hashi zote zinazofuata zingebadilika na kila mtu anayeendesha mnyororo wa bloku angetambua.

## Mahitaji ya awali {#prerequisites}

Bloku ni mada rahisi sana kwa wanaoanza. Lakini ili kukusaidia kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza [Akaunti](/developers/docs/accounts/), [Miamala](/developers/docs/transactions/), na [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Kwa nini bloku? {#why-blocks}

Ili kuhakikisha kuwa washiriki wote kwenye mtandao wa Ethereum wanadumisha hali iliyosawazishwa na kukubaliana kuhusu historia kamili ya miamala, tunakusanya miamala katika bloku. Hii inamaanisha miamala kadhaa (au mamia) inakamilishwa, inakubaliwa, na kusawazishwa yote kwa wakati mmoja.

![Mchoro unaoonyesha muamala katika bloku ukisababisha mabadiliko ya hali](./tx-block.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Kwa kutenga muda kati ya uthibitisho, tunawapa washiriki wote wa mtandao muda wa kutosha kufikia makubaliano: ingawa maombi ya miamala hutokea mara nyingi kwa sekunde, bloku hutengenezwa na kuthibitishwa kwenye Ethereum mara moja kila sekunde kumi na mbili.

## Jinsi bloku zinavyofanya kazi {#how-blocks-work}

Ili kuhifadhi historia ya miamala, bloku zimepangwa kwa utaratibu mkali (kila bloku mpya inayoundwa huwa na marejeleo ya bloku yake mzazi), na miamala ndani ya bloku pia imepangwa kwa utaratibu mkali. Isipokuwa katika visa nadra, wakati wowote, washiriki wote kwenye mtandao wanakubaliana kuhusu idadi kamili na historia ya bloku, na wanafanya kazi ya kukusanya maombi ya sasa ya miamala katika bloku inayofuata.

Pindi bloku inapokusanywa na mthibitishaji aliyechaguliwa bila mpangilio kwenye mtandao, husambazwa kwa mtandao wote; nodi zote huongeza bloku hii mwishoni mwa mnyororo wao wa bloku, na mthibitishaji mpya huchaguliwa kuunda bloku inayofuata. Mchakato kamili wa kuunganisha bloku na mchakato wa uthibitisho/makubaliano kwa sasa umeainishwa na itifaki ya "Uthibitisho wa Hisa" ya Ethereum.

## Itifaki ya Uthibitisho wa Hisa {#proof-of-stake-protocol}

Uthibitisho wa Hisa inamaanisha yafuatayo:

- Nodi za kuthibitisha zinapaswa kuweka hisa ya ETH 32 katika mkataba wa amana kama dhamana dhidi ya tabia mbaya. Hii husaidia kulinda mtandao kwa sababu shughuli isiyo ya uaminifu inayoweza kuthibitishwa husababisha baadhi au hisa yote hiyo kuharibiwa.
- Katika kila nafasi (yenye muda wa sekunde kumi na mbili) mthibitishaji huchaguliwa bila mpangilio kuwa mpendekezaji wa bloku. Wanakusanya miamala pamoja, wanazitekeleza na kubainisha 'hali' mpya. Wanafunga taarifa hii katika bloku na kuisambaza kwa wathibitishaji wengine.
- Wathibitishaji wengine wanaopata habari kuhusu bloku mpya hutekeleza upya miamala ili kuhakikisha wanakubaliana na mabadiliko yaliyopendekezwa kwa hali ya kimataifa. Ikichukuliwa kuwa bloku ni halali, wanaiongeza kwenye hifadhidata yao.
- Ikiwa mthibitishaji atapata habari kuhusu bloku mbili zinazokinzana kwa nafasi moja, hutumia algoriti yao ya kuchagua uma kuchagua ile inayoungwa mkono na ETH nyingi zaidi zilizowekwa kama hisa.

[Zaidi kuhusu Uthibitisho wa Hisa](/developers/docs/consensus-mechanisms/pos)

## Kuna nini ndani ya bloku? {#block-anatomy}

Kuna taarifa nyingi zilizomo ndani ya bloku. Katika kiwango cha juu kabisa, bloku huwa na sehemu zifuatazo:

| Sehemu           | Maelezo                                                     |
| :--------------- | :---------------------------------------------------------- |
| `yanayopangwa`   | nafasi ambayo bloku ni yake                                 |
| `proposer_index` | kitambulisho cha mthibitishaji anayependekeza bloku         |
| `parent_root`    | hashi ya bloku iliyotangulia                                |
| `state_root`     | hashi ya msingi ya kitu cha hali                            |
| `mwili`          | kitu chenye sehemu kadhaa, kama ilivyofafanuliwa hapa chini |

`Mwili` wa bloku una sehemu zake kadhaa:

| Sehemu               | Maelezo                                                                 |
| :------------------- | :---------------------------------------------------------------------- |
| `randao_reveal`      | thamani inayotumika kuchagua mpendekezaji wa bloku inayofuata           |
| `eth1_data`          | taarifa kuhusu mkataba wa amana                                         |
| `graffiti`           | data yoyote inayotumika kuweka lebo kwenye bloku                        |
| `proposer_slashings` | orodha ya wathibitishaji watakaoadhibiwa                                |
| `attester_slashings` | orodha ya waidhinishaji watakaoadhibiwa                                 |
| `attestations`       | orodha ya uidhinishaji uliofanywa dhidi ya nafasi za awali              |
| `weka`               | orodha ya amana mpya kwenye mkataba wa amana                            |
| `voluntary_exits`    | orodha ya wathibitishaji wanaoondoka kwenye mtandao                     |
| `sync_aggregate`     | kikundi kidogo cha wathibitishaji kinachotumika kuhudumia wateja wepesi |
| `execution_payload`  | miamala iliyopitishwa kutoka kwa programu ya utekelezaji                |

Sehemu ya `attestations` ina orodha ya uidhinishaji wote katika bloku. Uidhinishaji una aina yake ya data ambayo ina vipande kadhaa vya data. Kila uidhinishaji una:

| Sehemu             | Maelezo                                                             |
| :----------------- | :------------------------------------------------------------------ |
| `aggregation_bits` | orodha ya wathibitishaji walioshiriki katika uidhinishaji huu       |
| `data`             | chombo chenye sehemu ndogo nyingi                                   |
| `signature`        | sahihi ya jumla ya seti ya wathibitishaji dhidi ya sehemu ya `data` |

Sehemu ya `data` katika `attestation` ina yafuatayo:

| Sehemu              | Maelezo                                                                  |
| :------------------ | :----------------------------------------------------------------------- |
| `yanayopangwa`      | nafasi ambayo uidhinishaji unahusiana nayo                               |
| `index`             | faharasa za wathibitishaji wanaoidhinisha                                |
| `beacon_block_root` | hashi ya msingi ya bloku ya Beacon inayoonekana kama kichwa cha mnyororo |
| `chanzo`            | kituo cha ukaguzi cha mwisho kilichohalalishwa                           |
| `target`            | bloku ya mpaka wa enzi ya hivi karibuni                                  |

Kutekeleza miamala katika `execution_payload` husasisha hali ya kimataifa. Wateja wote hutekeleza upya miamala katika `execution_payload` ili kuhakikisha hali mpya inalingana na ile katika sehemu ya `state_root` ya bloku mpya. Hivi ndivyo wateja wanaweza kujua kwamba bloku mpya ni halali na salama kuiongeza kwenye mnyororo wao wa bloku. `execution payload` yenyewe ni kitu chenye sehemu kadhaa. Pia kuna `execution_payload_header` ambayo ina taarifa muhimu za muhtasari kuhusu data ya utekelezaji. Miundo hii ya data imepangwa kama ifuatavyo:

`execution_payload_header` ina sehemu zifuatazo:

| Sehemu              | Maelezo                                                                            |
| :------------------ | :--------------------------------------------------------------------------------- |
| `parent_hash`       | hashi ya bloku mzazi                                                               |
| `fee_recipient`     | anwani ya akaunti ya kulipia ada za muamala                                        |
| `state_root`        | hashi ya msingi kwa hali ya kimataifa baada ya kutumia mabadiliko katika bloku hii |
| `receipts_root`     | hashi ya trie ya risiti za miamala                                                 |
| `logs_bloom`        | muundo wa data wenye kumbukumbu za matukio                                         |
| `prev_randao`       | thamani inayotumika katika uteuzi wa mthibitishaji bila mpangilio                  |
| `block_number`      | nambari ya bloku ya sasa                                                           |
| `gas_limit`         | kiwango cha juu cha gesi kinachoruhusiwa katika bloku hii                          |
| `gas_used`          | kiasi halisi cha gesi kilichotumika katika bloku hii                               |
| `timestamp`         | muda wa bloku                                                                      |
| `extra_data`        | data ya ziada yoyote kama baiti ghafi                                              |
| `base_fee_per_gas`  | thamani ya ada ya msingi                                                           |
| `block_hash`        | Hashi ya bloku ya utekelezaji                                                      |
| `transactions_root` | hashi ya msingi ya miamala katika payload                                          |
| `withdrawal_root`   | hashi ya msingi ya utoaji fedha katika payload                                     |

`execution_payload` yenyewe ina yafuatayo (kumbuka hii inafanana na kichwa isipokuwa badala ya hashi ya msingi ya miamala inajumuisha orodha halisi ya miamala na taarifa za utoaji fedha) :

| Sehemu             | Maelezo                                                                            |
| :----------------- | :--------------------------------------------------------------------------------- |
| `parent_hash`      | hashi ya bloku mzazi                                                               |
| `fee_recipient`    | anwani ya akaunti ya kulipia ada za muamala                                        |
| `state_root`       | hashi ya msingi kwa hali ya kimataifa baada ya kutumia mabadiliko katika bloku hii |
| `receipts_root`    | hashi ya trie ya risiti za miamala                                                 |
| `logs_bloom`       | muundo wa data wenye kumbukumbu za matukio                                         |
| `prev_randao`      | thamani inayotumika katika uteuzi wa mthibitishaji bila mpangilio                  |
| `block_number`     | nambari ya bloku ya sasa                                                           |
| `gas_limit`        | kiwango cha juu cha gesi kinachoruhusiwa katika bloku hii                          |
| `gas_used`         | kiasi halisi cha gesi kilichotumika katika bloku hii                               |
| `timestamp`        | muda wa bloku                                                                      |
| `extra_data`       | data ya ziada yoyote kama baiti ghafi                                              |
| `base_fee_per_gas` | thamani ya ada ya msingi                                                           |
| `block_hash`       | Hashi ya bloku ya utekelezaji                                                      |
| `miamala`          | orodha ya miamala itakayotekelezwa                                                 |
| `kutoa`            | orodha ya vitu vya utoaji fedha                                                    |

Orodha ya `withdrawals` ina vitu vya `withdrawal` vilivyopangwa kwa njia ifuatayo:

| Sehemu           | Maelezo                              |
| :--------------- | :----------------------------------- |
| `anwani`         | anwani ya akaunti iliyotoa fedha     |
| `amount`         | kiasi cha utoaji fedha               |
| `index`          | thamani ya faharasa ya utoaji fedha  |
| `validatorIndex` | thamani ya faharasa ya mthibitishaji |

## Muda wa bloku {#block-time}

Muda wa bloku unarejelea muda unaotenganisha bloku. Katika Ethereum, muda umegawanywa katika vipande vya sekunde kumi na mbili vinavyoitwa 'nafasi'. Katika kila nafasi mthibitishaji mmoja huchaguliwa kupendekeza bloku. Ikichukuliwa kuwa wathibitishaji wote wako mtandaoni na wanafanya kazi kikamilifu, kutakuwa na bloku katika kila nafasi, ikimaanisha muda wa bloku ni sekunde 12. Hata hivyo, mara kwa mara wathibitishaji wanaweza kuwa nje ya mtandao wanapoitwa kupendekeza bloku, ikimaanisha nafasi zinaweza kuwa tupu wakati mwingine.

Utekelezaji huu ni tofauti na mifumo inayotegemea uthibitishaji-wa-kazi ambapo muda wa bloku ni wa uwezekano na hurekebishwa na ugumu unaolengwa wa uchimbaji wa itifaki. [Muda wa wastani wa bloku](https://etherscan.io/chart/blocktime) wa Ethereum ni mfano kamili wa hili ambapo mpito kutoka uthibitishaji-wa-kazi kwenda uthibitisho wa hisa unaweza kufahamika wazi kulingana na uthabiti wa muda mpya wa bloku wa sekunde 12.

## Ukubwa wa bloku {#block-size}

Jambo la mwisho muhimu la kuzingatia ni kwamba bloku zenyewe zina ukomo wa ukubwa. Kila bloku ina ukubwa unaolengwa wa gesi milioni 30 lakini ukubwa wa bloku utaongezeka au kupungua kulingana na mahitaji ya mtandao, hadi kufikia kikomo cha bloku cha gesi milioni 60 (mara 2 ya ukubwa unaolengwa wa bloku). Kikomo cha gesi cha bloku kinaweza kurekebishwa juu au chini kwa sababu ya 1/1024 kutoka kwa kikomo cha gesi cha bloku iliyotangulia. Kutokana na hayo, wathibitishaji wanaweza kubadilisha kikomo cha gesi cha bloku kupitia makubaliano. Jumla ya kiasi cha gesi kinachotumiwa na miamala yote katika bloku lazima iwe chini ya kikomo cha gesi cha bloku. Hii ni muhimu kwa sababu inahakikisha kwamba bloku haziwezi kuwa na ukubwa wa kiholela. Kama bloku zingeweza kuwa na ukubwa wa kiholela, basi nodi kamili zenye utendaji duni zingeacha polepole kuweza kwenda sambamba na mtandao kwa sababu ya mahitaji ya nafasi na kasi. Kadiri bloku inavyokuwa kubwa, ndivyo nguvu kubwa zaidi ya kompyuta inavyohitajika kuzichakata kwa wakati kwa ajili ya nafasi inayofuata. Hii ni nguvu ya uwekaji wa mamlaka kati, ambayo inapingwa kwa kuweka ukomo wa ukubwa wa bloku.

## Masomo zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia?_ Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Miamala](/developers/docs/transactions/)
- [Gesi](/developers/docs/gas/)
- [Uthibitisho wa Hisa](/developers/docs/consensus-mechanisms/pos)
