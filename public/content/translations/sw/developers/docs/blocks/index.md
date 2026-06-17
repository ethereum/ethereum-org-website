---
title: Vitalu
description: "Muhtasari wa vitalu katika mnyororo wa vitalu wa Ethereum – muundo wao wa data, kwa nini vinahitajika, na jinsi vinavyotengenezwa."
lang: sw
---

Vitalu ni makundi ya miamala yenye heshi ya kitalu kilichotangulia katika mnyororo. Hii inaunganisha vitalu pamoja (katika mnyororo) kwa sababu heshi zinatokana na data ya kitalu kwa njia ya kificho. Hii inazuia udanganyifu, kwa sababu badiliko moja katika kitalu chochote katika historia litabatilisha vitalu vyote vinavyofuata kwa kuwa heshi zote zinazofuata zitabadilika na kila mtu anayeendesha mnyororo wa vitalu atagundua.

## Mahitaji ya awali {#prerequisites}

Vitalu ni mada rahisi sana kwa wanaoanza. Lakini ili kukusaidia kuelewa ukurasa huu vizuri zaidi, tunapendekeza usome kwanza [Akaunti](/developers/docs/accounts/), [Miamala](/developers/docs/transactions/), na [utangulizi wetu wa Ethereum](/developers/docs/intro-to-ethereum/).

## Kwa nini vitalu? {#why-blocks}

Ili kuhakikisha kwamba washiriki wote kwenye mtandao wa [Ethereum](/) wanadumisha hali iliyosawazishwa na kukubaliana juu ya historia sahihi ya miamala, tunaweka miamala katika makundi kwenye vitalu. Hii inamaanisha makumi (au mamia) ya miamala inafungamanishwa, inakubaliwa, na kusawazishwa kwa wakati mmoja.

![A diagram showing transaction in a block causing state changes](./tx-block.png)
_Mchoro umechukuliwa kutoka [Ethereum EVM illustrated](https://takenobu-hs.github.io/downloads/ethereum_evm_illustrated.pdf)_

Kwa kuweka nafasi kati ya ufungamanisho, tunawapa washiriki wote wa mtandao muda wa kutosha kufikia mwafaka: ingawa maombi ya miamala hutokea mara nyingi kwa sekunde, vitalu huundwa na kufungamanishwa kwenye Ethereum mara moja tu kila baada ya sekunde kumi na mbili.

## Jinsi vitalu vinavyofanya kazi {#how-blocks-work}

Ili kuhifadhi historia ya miamala, vitalu hupangwa kwa utaratibu maalum (kila kitalu kipya kinachoundwa kina rejeleo la kitalu chake kikuu), na miamala ndani ya vitalu hupangwa kwa utaratibu maalum pia. Isipokuwa katika matukio machache, wakati wowote ule, washiriki wote kwenye mtandao wanakubaliana juu ya idadi kamili na historia ya vitalu, na wanafanya kazi ya kuweka maombi ya sasa ya miamala katika kitalu kinachofuata.

Pindi kitalu kinapokusanywa na mthibitishaji aliyechaguliwa kwa nasibu kwenye mtandao, kinasambazwa kwa mtandao mzima; nodi zote huongeza kitalu hiki mwishoni mwa mnyororo wao wa vitalu, na mthibitishaji mpya anachaguliwa ili kuunda kitalu kinachofuata. Mchakato kamili wa kuunganisha kitalu na mchakato wa ufungamanisho/mwafaka kwa sasa umebainishwa na itifaki ya Ethereum ya "Uthibitisho wa Dau (PoS)".

## Itifaki ya Uthibitisho wa Dau (PoS) {#proof-of-stake-protocol}

Uthibitisho wa Dau unamaanisha yafuatayo:

- Nodi zinazothibitisha zinapaswa kuweka dhamana ya 32 ETH kwenye mkataba wa amana kama dhamana dhidi ya tabia mbaya. Hii inasaidia kulinda mtandao kwa sababu shughuli zinazothibitishwa kuwa za udanganyifu husababisha baadhi au dhamana yote kuharibiwa.
- Katika kila sloti (zilizotenganishwa kwa sekunde kumi na mbili) mthibitishaji anachaguliwa kwa nasibu kuwa mpendekezaji wa bloku. Wanakusanya miamala pamoja, kuitekeleza na kuamua 'hali' mpya. Wanaweka taarifa hizi kwenye kitalu na kuzipitisha kwa wathibitishaji wengine.
- Wathibitishaji wengine wanaosikia kuhusu kitalu kipya hutekeleza tena miamala ili kuhakikisha wanakubaliana na mabadiliko yaliyopendekezwa kwenye hali ya kimataifa. Kwa kudhani kitalu ni halali, wanakuongeza kwenye hifadhidata yao wenyewe.
- Ikiwa mthibitishaji atasikia kuhusu vitalu viwili vinavyokinzana kwa sloti moja wanatumia algoriti yao ya kuchagua mchepuo ili kuchagua kile kinachoungwa mkono na ETH nyingi zilizowekwa dhamana.

[Zaidi kuhusu Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos)

## Kuna nini ndani ya kitalu? {#block-anatomy}

Kuna taarifa nyingi zilizomo ndani ya kitalu. Katika kiwango cha juu zaidi kitalu kina sehemu zifuatazo:

| Sehemu            | Maelezo                                           |
| :--------------- | :---------------------------------------------------- |
| `slot`           | sloti ambayo kitalu ni chake                         |
| `proposer_index` | kitambulisho cha mthibitishaji anayependekeza kitalu           |
| `parent_root`    | heshi ya kitalu kilichotangulia                       |
| `state_root`     | heshi ya mzizi ya kipengee cha hali                     |
| `body`           | kipengee chenye sehemu kadhaa, kama ilivyofafanuliwa hapa chini |

Kitalu `body` kina sehemu zake kadhaa:

| Sehemu                | Maelezo                                      |
| :------------------- | :----------------------------------------------- |
| `randao_reveal`      | thamani inayotumika kuchagua mpendekezaji wa bloku anayefuata   |
| `eth1_data`          | taarifa kuhusu mkataba wa amana           |
| `graffiti`           | data ya kiholela inayotumika kuweka lebo kwenye vitalu                |
| `proposer_slashings` | orodha ya wathibitishaji watakaofanyiwa ukataji                 |
| `attester_slashings` | orodha ya watoa uthibitisho watakaofanyiwa ukataji                  |
| `attestations`       | orodha ya uthibitisho uliotolewa dhidi ya sloti zilizopita |
| `deposits`           | orodha ya amana mpya kwenye mkataba wa amana     |
| `voluntary_exits`    | orodha ya wathibitishaji wanaoondoka kwenye mtandao           |
| `sync_aggregate`     | kikundi kidogo cha wathibitishaji kinachotumika kuhudumia wateja wepesi |
| `execution_payload`  | miamala iliyopitishwa kutoka kwa kiteja cha utekelezaji    |

Sehemu ya `attestations` ina orodha ya uthibitisho wote katika kitalu. Uthibitisho una aina yake ya data ambayo ina vipande kadhaa vya data. Kila uthibitisho una:

| Sehemu              | Maelezo                                                    |
| :----------------- | :------------------------------------------------------------- |
| `aggregation_bits` | orodha ya wathibitishaji walioshiriki katika uthibitisho huu    |
| `data`             | kontena lenye sehemu ndogo nyingi                            |
| `signature`        | sahihi ya jumla ya kundi la wathibitishaji dhidi ya sehemu ya `data` |

Sehemu ya `data` katika `attestation` ina yafuatayo:

| Sehemu               | Maelezo                                                     |
| :------------------ | :-------------------------------------------------------------- |
| `slot`              | sloti ambayo uthibitisho unahusiana nayo                             |
| `index`             | faharisi za wathibitishaji wanaotoa uthibitisho                                |
| `beacon_block_root` | heshi ya mzizi ya kitalu cha kinara inayoonekana kama kichwa cha mnyororo |
| `source`            | kituo cha ukaguzi cha mwisho kilichohalalishwa                                   |
| `target`            | kitalu cha hivi punde cha mpaka wa kipindi                                 |

Kutekeleza miamala katika `execution_payload` kunasasisha hali ya kimataifa. Wateja wote hutekeleza tena miamala katika `execution_payload` ili kuhakikisha hali mpya inalingana na ile iliyo katika sehemu ya `state_root` ya kitalu kipya. Hivi ndivyo wateja wanaweza kujua kwamba kitalu kipya ni halali na salama kuongezwa kwenye mnyororo wao wa vitalu. `execution payload` yenyewe ni kipengee chenye sehemu kadhaa. Pia kuna `execution_payload_header` ambayo ina taarifa muhimu za muhtasari kuhusu data ya utekelezaji. Miundo hii ya data imepangwa kama ifuatavyo:

`execution_payload_header` ina sehemu zifuatazo:

| Sehemu               | Maelezo                                                         |
| :------------------ | :------------------------------------------------------------------ |
| `parent_hash`       | heshi ya kitalu kikuu                                            |
| `fee_recipient`     | anwani ya akaunti ya kulipia ada za muamala                      |
| `state_root`        | heshi ya mzizi ya hali ya kimataifa baada ya kutumia mabadiliko katika kitalu hiki |
| `receipts_root`     | heshi ya mti wa stakabadhi za muamala                               |
| `logs_bloom`        | muundo wa data ulio na kumbukumbu za matukio                                |
| `prev_randao`       | thamani inayotumika katika uteuzi wa nasibu wa mthibitishaji                            |
| `block_number`      | nambari ya kitalu cha sasa                                     |
| `gas_limit`         | kiwango cha juu cha gesi kinachoruhusiwa katika kitalu hiki                                   |
| `gas_used`          | kiasi halisi cha gesi kilichotumika katika kitalu hiki                         |
| `timestamp`         | muda wa kitalu                                                      |
| `extra_data`        | data ya ziada ya kiholela kama baiti ghafi                              |
| `base_fee_per_gas`  | thamani ya ada ya msingi                                                  |
| `block_hash`        | Heshi ya kitalu cha utekelezaji                                             |
| `transactions_root` | heshi ya mzizi ya miamala katika mzigo                        |
| `withdrawal_root`   | heshi ya mzizi ya utoaji katika mzigo                         |

`execution_payload` yenyewe ina yafuatayo (kumbuka hii inafanana na kichwa isipokuwa kwamba badala ya heshi ya mzizi ya miamala inajumuisha orodha halisi ya miamala na taarifa za utoaji) :

| Sehemu              | Maelezo                                                         |
| :----------------- | :------------------------------------------------------------------ |
| `parent_hash`      | heshi ya kitalu kikuu                                            |
| `fee_recipient`    | anwani ya akaunti ya kulipia ada za muamala                      |
| `state_root`       | heshi ya mzizi ya hali ya kimataifa baada ya kutumia mabadiliko katika kitalu hiki |
| `receipts_root`    | heshi ya mti wa stakabadhi za muamala                               |
| `logs_bloom`       | muundo wa data ulio na kumbukumbu za matukio                                |
| `prev_randao`      | thamani inayotumika katika uteuzi wa nasibu wa mthibitishaji                            |
| `block_number`     | nambari ya kitalu cha sasa                                     |
| `gas_limit`        | kiwango cha juu cha gesi kinachoruhusiwa katika kitalu hiki                                   |
| `gas_used`         | kiasi halisi cha gesi kilichotumika katika kitalu hiki                         |
| `timestamp`        | muda wa kitalu                                                      |
| `extra_data`       | data ya ziada ya kiholela kama baiti ghafi                              |
| `base_fee_per_gas` | thamani ya ada ya msingi                                                  |
| `block_hash`       | Heshi ya kitalu cha utekelezaji                                             |
| `transactions`     | orodha ya miamala itakayotekelezwa                                 |
| `withdrawals`      | orodha ya vipengee vya utoaji                                          |

Orodha ya `withdrawals` ina vipengee vya `withdrawal` vilivyoundwa kwa njia ifuatayo:

| Sehemu            | Maelezo                        |
| :--------------- | :--------------------------------- |
| `address`        | anwani ya akaunti iliyofanya utoaji |
| `amount`         | kiasi cha utoaji                  |
| `index`          | thamani ya faharisi ya utoaji             |
| `validatorIndex` | thamani ya faharisi ya mthibitishaji              |

## Muda wa kitalu {#block-time}

Muda wa kitalu unarejelea muda unaotenganisha vitalu. Katika Ethereum, muda umegawanywa katika vipande vya sekunde kumi na mbili vinavyoitwa 'sloti'. Katika kila sloti mthibitishaji mmoja anachaguliwa kupendekeza kitalu. Kwa kudhani wathibitishaji wote wako mtandaoni na wanafanya kazi kikamilifu kutakuwa na kitalu katika kila sloti, ikimaanisha muda wa kitalu ni sekunde 12. Hata hivyo, mara kwa mara wathibitishaji wanaweza kuwa nje ya mtandao wanapoitwa kupendekeza kitalu, ikimaanisha sloti zinaweza wakati mwingine kuwa tupu.

Utekelezaji huu unatofautiana na mifumo inayotegemea Uthibitisho wa Kazi (PoW) ambapo muda wa kitalu unategemea uwezekano na kurekebishwa na ugumu wa uchimbaji unaolengwa na itifaki. [Wastani wa muda wa kitalu](https://etherscan.io/chart/blocktime) wa Ethereum ni mfano mzuri wa hili ambapo mpito kutoka Uthibitisho wa Kazi hadi Uthibitisho wa Dau unaweza kuonekana wazi kulingana na uthabiti wa muda mpya wa kitalu wa sekunde 12.

## Ukubwa wa kitalu {#block-size}

Jambo la mwisho muhimu ni kwamba vitalu vyenyewe vina kikomo cha ukubwa. Kila kitalu kina ukubwa unaolengwa wa gesi milioni 30 lakini ukubwa wa vitalu utaongezeka au kupungua kulingana na mahitaji ya mtandao, hadi kikomo cha kitalu cha gesi milioni 60 (mara 2 ya ukubwa wa kitalu unaolengwa). Kikomo cha gesi cha kitalu kinaweza kurekebishwa kwenda juu au chini kwa uwiano wa 1/1024 kutoka kwenye kikomo cha gesi cha kitalu kilichotangulia. Kutokana na hili, wathibitishaji wanaweza kubadilisha kikomo cha gesi cha kitalu kupitia mwafaka. Jumla ya kiasi cha gesi kinachotumiwa na miamala yote katika kitalu lazima kiwe chini ya kikomo cha gesi cha kitalu. Hili ni muhimu kwa sababu linahakikisha kwamba vitalu haviwezi kuwa vikubwa kiholela. Ikiwa vitalu vingeweza kuwa vikubwa kiholela, basi nodi kamili zenye uwezo mdogo zingeanza kushindwa kuendana na mtandao kutokana na mahitaji ya nafasi na kasi. Kadiri kitalu kinavyokuwa kikubwa, ndivyo nguvu kubwa ya kompyuta inavyohitajika kuvichakata kwa wakati kwa ajili ya sloti inayofuata. Hii ni nguvu ya kuweka udhibiti kati, ambayo inapingwa kwa kuweka kikomo cha ukubwa wa vitalu.

## Kusoma zaidi {#further-reading}

_Unajua rasilimali ya jamii iliyokusaidia? Hariri ukurasa huu na uiongeze!_

## Mada zinazohusiana {#related-topics}

- [Miamala](/developers/docs/transactions/)
- [Gesi](/developers/docs/gas/)
- [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos)