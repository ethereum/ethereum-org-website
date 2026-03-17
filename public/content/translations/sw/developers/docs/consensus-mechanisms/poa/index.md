---
title: Uthibitisho wa mamlaka (PoA)
description: Maelezo ya itifaki ya makubaliano ya uthibitisho wa mamlaka na jukumu lake katika mfumo ikolojia wa mnyororo wa bloku.
lang: sw
---

**Uthibitisho wa mamlaka (PoA)** ni kanuni ya makubaliano inayotegemea sifa ambayo ni toleo lililorekebishwa la [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/). Hutumika zaidi na minyororo ya kibinafsi, testnet, na mitandao ya usanidi wa ndani. PoA ni kanuni ya makubaliano inayotegemea sifa ambayo inahitaji kuamini seti ya watiaji saini walioidhinishwa ili kutoa bloku, badala ya utaratibu unaotegemea hisa katika PoS.

## Mahitaji ya awali {#prerequisites}

Ili kuielewa ukurasa huu vizuri, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/), [bloku](/developers/docs/blocks/), na [taratibu za makubaliano](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa mamlaka (PoA) ni nini? {#what-is-poa}

Uthibitisho wa mamlaka ni toleo lililorekebishwa la **[uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/) (PoS)** ambalo ni kanuni ya makubaliano inayotegemea sifa badala ya utaratibu unaotegemea hisa katika PoS. Istilahi hii ilianzishwa kwa mara ya kwanza mnamo 2017 na Gavin Wood, na kanuni hii ya makubaliano imekuwa ikitumika zaidi na minyororo ya kibinafsi, testnet na mitandao ya usanidi wa ndani, kwani inashinda hitaji la rasilimali za hali ya juu kama PoW, na inashinda masuala ya kuongezeka kwa PoS kwa kuwa na seti ndogo ya nodi zinazohifadhi mnyororo wa bloku na kutoa bloku.

Uthibitisho wa mamlaka unahitaji kuamini seti ya watiaji saini walioidhinishwa ambao wamewekwa katika [bloku ya mwanzo](/glossary/#genesis-block). Katika utekelezaji mwingi wa sasa, watiaji saini wote walioidhinishwa huhifadhi nguvu na mapendeleo sawa wakati wa kuamua makubaliano ya mnyororo. Wazo la kusimamisha sifa ni kwamba kila mthibitishaji aliyeidhinishwa anajulikana vyema kwa kila mtu kupitia mambo kama vile mjue mteja wako (KYC), au kwa kuwa na shirika linalojulikana kuwa ndiye mthibitishaji pekee—kwa njia hii ikiwa mthibitishaji atafanya kosa lolote, utambulisho wake unajulikana.

Kuna utekelezaji mwingi wa PoA, lakini utekelezaji wa kawaida wa Ethereum ni **clique**, ambayo inatekeleza [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique ni rafiki kwa wasanidi programu na ni kiwango rahisi kutekeleza, kinachoauni aina zote za ulandanishi wa mteja. Utekelezaji mwingine unajumuisha [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) na [Aura](https://openethereum.github.io/Chain-specification).

## Inavyofanya kazi {#how-it-works}

Katika PoA, seti ya watiaji saini walioidhinishwa huchaguliwa ili kuunda bloku mpya. Watiaji saini huchaguliwa kulingana na sifa zao, na wao ndio pekee wanaoruhusiwa kuunda bloku mpya. Watiaji saini huchaguliwa kwa mtindo wa mzunguko, na kila mtiaji saini anaruhusiwa kuunda bloku katika muda maalum. Muda wa uundaji wa bloku umewekwa, na watiaji saini wanatakiwa kuunda bloku ndani ya muda huo.

Sifa katika muktadha huu si jambo linaloweza kupimika bali ni sifa ya mashirika yanayojulikana kama Microsoft na Google, hivyo basi njia ya kuchagua watiaji saini wanaoaminika si ya kikanuni bali ni kitendo cha kawaida cha binadamu cha _kuamini_ ambapo chombo, tuseme kwa mfano Microsoft, huunda mtandao wa kibinafsi wa PoA kati ya mamia au maelfu ya kampuni zinazoanza na jukumu lenyewe kama mtiaji saini pekee anayeaminika na uwezekano wa kuongeza watiaji saini wengine wanaojulikana kama Google katika siku zijazo, kampuni zinazoanza, bila shaka, zingeamini Microsoft kutenda kwa uaminifu kila wakati na kutumia mtandao. Hii hutatua hitaji la kuweka hisa katika mitandao tofauti midogo/ya kibinafsi ambayo ilijengwa kwa madhumuni tofauti ili kuiweka ikiwa imegatuliwa na kufanya kazi, pamoja na hitaji la wachimbaji, ambalo hutumia nguvu na rasilimali nyingi. Baadhi ya mitandao ya kibinafsi hutumia kiwango cha PoA kama vile VeChain, na baadhi huirekebisha kama vile Binance ambayo hutumia [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) ambayo ni toleo la kawaida lililorekebishwa la PoA na PoS.

Mchakato wa kupiga kura unafanywa na watiaji saini wenyewe. Kila mtiaji saini hupiga kura kwa ajili ya kuongeza au kumwondoa mtiaji saini katika bloku yao wanapounda bloku mpya. Kura huhesabiwa na nodi, na watiaji saini huongezwa au kuondolewa kulingana na kura kufikia kiwango fulani cha `SIGNER_LIMIT`.

Kunaweza kuwa na hali ambapo nyuma ndogo hutokea, ugumu wa bloku hutegemea kama bloku ilitiwa saini kwa zamu au nje ya zamu. Bloku za “kwa zamu” zina ugumu wa 2, na bloku za “nje ya zamu” zina ugumu wa 1. Katika kisa cha nyuma ndogo, mnyororo wenye watiaji saini wengi wanaofunga bloku “kwa zamu” utakusanya ugumu mwingi zaidi na kushinda.

## Vekta za mashambulizi {#attack-vectors}

### Watiaji saini hasidi {#malicious-signers}

Mtumiaji hasidi anaweza kuongezwa kwenye orodha ya watiaji saini, au ufunguo/mashine ya kutia saini inaweza kuathiriwa. Katika hali kama hiyo itifaki inahitaji kuwa na uwezo wa kujilinda dhidi ya upangaji upya na barua taka. Suluhisho lililopendekezwa ni kwamba kwa orodha fulani ya watiaji saini N walioidhinishwa, mtiaji saini yeyote anaweza tu kutengeneza bloku 1 kati ya kila K. Hii inahakikisha kwamba uharibifu ni mdogo, na wathibitishaji waliosalia wanaweza kumpigia kura kumtoa mtumiaji hasidi.

### Udhibiti {#censorship-attack}

Vekta nyingine ya mashambulizi ya kuvutia ni ikiwa mtiaji saini (au kikundi cha watiaji saini) anajaribu kudhibiti bloku zinazopiga kura kuwaondoa kwenye orodha ya uidhinishaji. Ili kukabiliana na hili, marudio ya kutengeneza yanayoruhusiwa ya watiaji saini yamezuiliwa kwa 1 kati ya N/2. Hii inahakikisha kwamba watiaji saini hasidi wanahitaji kudhibiti angalau 51% ya akaunti za kutia saini, ambapo kwa wakati huo watakuwa chanzo kipya cha ukweli kwa mnyororo.

### Barua taka {#spam-attack}

Vekta nyingine ndogo ya mashambulizi ni watiaji saini hasidi wanaoanzisha mapendekezo mapya ya kura ndani ya kila bloku wanayotengeneza. Kwa kuwa nodi zinahitaji kuhesabu kura zote ili kuunda orodha halisi ya watiaji saini walioidhinishwa, ni lazima zirekodi kura zote kwa muda. Bila kuweka kikomo kwenye dirisha la kura, hii inaweza kukua polepole, lakini bila kikomo. Suluhisho ni kuweka dirisha _linalosonga_ la bloku W baada ya hapo kura huchukuliwa kuwa zimepitwa na wakati. _Dirisha linalofaa linaweza kuwa epoch 1-2._

### Bloku za wakati mmoja {#concurrent-blocks}

Katika mtandao wa PoA, kunapokuwa na watiaji saini N walioidhinishwa, kila mtiaji saini anaruhusiwa kutengeneza bloku 1 kati ya K, ambayo ina maana kwamba wathibitishaji N-K+1 wanaruhusiwa kutengeneza kwa wakati wowote. Ili kuzuia wathibitishaji hawa kushindania bloku, kila mtiaji saini anapaswa kuongeza "tofauti" ndogo ya nasibu kwenye muda anaotoa bloku mpya. Ingawa mchakato huu unahakikisha kwamba nyuma ndogo ni nadra, nyuma za mara kwa mara bado zinaweza kutokea, kama vile Mtandao Mkuu. Ikiwa mtiaji saini atapatikana akitumia vibaya mamlaka yake na kusababisha fujo, watiaji saini wengine wanaweza kumpigia kura kumtoa.

Ikiwa kwa mfano kuna watiaji saini 10 walioidhinishwa na kila mtiaji saini anaruhusiwa kuunda bloku 1 kati ya 20, basi wakati wowote, wathibitishaji 11 wanaweza kuunda bloku. Ili kuwazuia wasishindane kuunda bloku, kila mtiaji saini huongeza "tofauti" ndogo ya nasibu kwenye muda wanaotoa bloku mpya. Hii inapunguza kutokea kwa nyuma ndogo lakini bado inaruhusu nyuma za mara kwa mara, kama inavyoonekana kwenye Mtandao Mkuu wa Ethereum. Ikiwa mtiaji saini atatumia vibaya mamlaka yake na kusababisha usumbufu, anaweza kupigiwa kura kuondolewa kwenye mtandao.

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                           | Hasara                                                                                                                                                                   |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Inaweza kuongezeka zaidi kuliko mifumo mingine maarufu kama PoS na PoW, kwani inategemea idadi ndogo ya watiaji saini wa bloku                                  | Mitandao ya PoA kwa kawaida huwa na idadi ndogo ya nodi za kuthibitisha. Hii hufanya mtandao wa PoA kuwa wa kati zaidi.                  |
| Minyororo ya bloku ya PoA ni nafuu sana kuendesha na kudumisha                                                                                                  | Kuwa mtiaji saini aliyeidhinishwa kwa kawaida huwa ni vigumu kwa mtu wa kawaida, kwa sababu mnyororo wa bloku unahitaji vyombo vyenye sifa iliyoimarika. |
| Miamala inathibitishwa haraka sana kwani inaweza kufikia chini ya sekunde 1 kwa sababu ni idadi ndogo tu ya watiaji saini wanaohitajika kuthibitisha bloku mpya | Watiaji saini hasidi wanaweza kupanga upya, kutumia mara mbili, kudhibiti miamala katika mtandao, mashambulizi hayo yanapunguzwa lakini bado yanawezekana                |

## Masomo zaidi {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Kiwango cha Clique_
- [Utafiti wa Uthibitisho wa Mamlaka](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Uthibitisho wa Mamlaka ni Nini](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Ufafanuzi wa Uthibitisho wa Mamlaka](https://academy.binance.com/en/articles/proof-of-authority-explained) _binance_
- [PoA katika mnyororo wa bloku](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Ufafanuzi wa Clique](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA iliyopitwa na wakati, vipimo vya Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, utekelezaji mwingine wa PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Wewe ni mwanafunzi wa kuona zaidi? {#visual-learner}

Tazama maelezo ya picha ya uthibitisho wa mamlaka:

<YouTube id="Mj10HSEM5_8" />

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uthibitisho wa rehani](/developers/docs/consensus-mechanisms/pos/)

