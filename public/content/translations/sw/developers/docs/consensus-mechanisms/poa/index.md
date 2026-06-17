---
title: Uthibitisho wa mamlaka (PoA)
description: Maelezo ya itifaki ya mwafaka ya uthibitisho wa mamlaka na jukumu lake katika mfumo wa ikolojia wa mnyororo wa vitalu.
lang: sw
---

**Uthibitisho wa mamlaka (PoA)** ni algoriti ya mwafaka inayotegemea sifa ambayo ni toleo lililobadilishwa la [Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/). Inatumiwa zaidi na minyororo ya kibinafsi, mitandao ya majaribio, na mitandao ya maendeleo ya ndani. PoA ni algoriti ya mwafaka inayotegemea sifa ambayo inahitaji kuamini kundi la wasaini walioidhinishwa ili kuzalisha vitalu, badala ya utaratibu unaotegemea dhamana katika PoS.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa vyema ukurasa huu, tunapendekeza usome kwanza kuhusu [miamala](/developers/docs/transactions/), [vitalu](/developers/docs/blocks/), na [taratibu za mwafaka](/developers/docs/consensus-mechanisms/).

## Uthibitisho wa mamlaka (PoA) ni nini? {#what-is-poa}

Uthibitisho wa mamlaka ni toleo lililobadilishwa la **[Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/) (PoS)** ambalo ni algoriti ya mwafaka inayotegemea sifa badala ya utaratibu unaotegemea dhamana katika PoS. Neno hili lilianzishwa kwa mara ya kwanza mnamo 2017 na Gavin Wood, na algoriti hii ya mwafaka imekuwa ikitumiwa zaidi na minyororo ya kibinafsi, mitandao ya majaribio na mitandao ya maendeleo ya ndani, kwani inashinda hitaji la rasilimali za ubora wa juu kama inavyofanya PoW, na inashinda masuala ya uwezo wa kuongezeka kwa PoS kwa kuwa na kikundi kidogo cha nodi zinazohifadhi mnyororo wa vitalu na kuzalisha vitalu.

Uthibitisho wa mamlaka unahitaji kuamini kundi la wasaini walioidhinishwa ambao wamewekwa kwenye [kitalu cha asili](/glossary/#genesis-block). Katika utekelezaji mwingi wa sasa, wasaini wote walioidhinishwa wanabaki na nguvu na mapendeleo sawa wakati wa kuamua mwafaka wa mnyororo. Wazo nyuma ya uwekaji dhamana wa sifa ni kwamba kila mthibitishaji aliyeidhinishwa anajulikana sana kwa kila mtu kupitia mambo kama vile mjue mteja wako (KYC), au kwa kuwa na shirika linalojulikana sana kuwa mthibitishaji pekee—kwa njia hii ikiwa mthibitishaji atafanya jambo lolote baya, utambulisho wao unajulikana.

Kuna utekelezaji mwingi wa PoA, lakini utekelezaji wa kawaida wa Ethereum ni **clique**, ambao unatekeleza [EIP-225](https://eips.ethereum.org/EIPS/eip-225). Clique ni rafiki kwa wasanidi programu na ni kiwango rahisi kutekeleza, kinachounga mkono aina zote za usawazishaji wa mteja. Utekelezaji mwingine unajumuisha [IBFT 2.0](https://besu.hyperledger.org/private-networks/concepts/poa) na [Aura](https://openethereum.github.io/Chain-specification).

## Jinsi inavyofanya kazi {#how-it-works}

Katika PoA, kundi la wasaini walioidhinishwa huchaguliwa ili kuunda vitalu vipya. Wasaini huchaguliwa kulingana na sifa zao, na wao ndio pekee wanaoruhusiwa kuunda vitalu vipya. Wasaini huchaguliwa kwa mtindo wa mzunguko (round-robin), na kila msaini anaruhusiwa kuunda kitalu katika muda maalum. Muda wa kuunda kitalu umewekwa, na wasaini wanatakiwa kuunda kitalu ndani ya muda huo.

Sifa katika muktadha huu sio kitu kinachoweza kupimwa bali ni sifa ya mashirika yanayojulikana sana kama Microsoft na Google, kwa hivyo njia ya kuchagua wasaini wanaoaminika sio ya kialgoriti bali ni kitendo cha kawaida cha kibinadamu cha _kuamini_ ambapo taasisi tuseme kwa mfano Microsoft inaunda mtandao wa kibinafsi wa PoA kati ya mamia au maelfu ya kampuni zinazoanza na jukumu lenyewe kama msaini pekee anayeaminika na uwezekano wa kuongeza wasaini wengine wanaojulikana kama Google katika siku zijazo, kampuni zinazoanza, bila shaka, zingeiamini Microsoft kutenda kwa uaminifu wakati wote na kutumia mtandao. Hii inatatua hitaji la kuweka dhamana katika mitandao tofauti midogo/ya kibinafsi iliyojengwa kwa madhumuni tofauti ili kuiweka iliyogatuliwa na kufanya kazi, pamoja na hitaji la wachimbaji, ambalo hutumia nguvu na rasilimali nyingi. Baadhi ya mitandao ya kibinafsi hutumia kiwango cha PoA kama kilivyo kama vile VeChain, na baadhi hukibadilisha kama vile Binance ambayo hutumia [PoSA](https://academy.binance.com/en/glossary/proof-of-staked-authority-posa) ambayo ni toleo lililobadilishwa maalum la PoA na PoS.

Mchakato wa kupiga kura unafanywa na wasaini wenyewe. Kila msaini hupiga kura kwa ajili ya kuongeza au kuondoa msaini katika kitalu chao wanapounda kitalu kipya. Kura huhesabiwa na nodi, na wasaini huongezwa au kuondolewa kulingana na kura kufikia kiwango fulani `SIGNER_LIMIT`.

Kunaweza kuwa na hali ambapo migawanyiko midogo inatokea, ugumu wa kitalu unategemea ikiwa kitalu kilisainiwa kwa zamu au nje ya zamu. Vitalu vya “kwa zamu” vina ugumu wa 2, na vitalu vya “nje ya zamu” vina ugumu wa 1. Katika kesi ya migawanyiko midogo, mnyororo wenye wasaini wengi wanaofunga vitalu “kwa zamu” utakusanya ugumu zaidi na kushinda.

## Njia za mashambulizi {#attack-vectors}

### Wasaini wenye nia mbaya {#malicious-signers}

Mtumiaji mwenye nia mbaya anaweza kuongezwa kwenye orodha ya wasaini, au ufunguo wa kusaini/mashine inaweza kudukuliwa. Katika hali kama hiyo itifaki inahitaji kuwa na uwezo wa kujilinda dhidi ya upangaji upya na utumaji taka. Suluhisho lililopendekezwa ni kwamba kutokana na orodha ya wasaini N walioidhinishwa, msaini yeyote anaweza tu kufua kitalu 1 kati ya kila K. Hii inahakikisha kwamba uharibifu ni mdogo, na wathibitishaji waliosalia wanaweza kumpigia kura ya kumwondoa mtumiaji mwenye nia mbaya.

### Udhibiti {#censorship-attack}

Njia nyingine ya kuvutia ya mashambulizi ni ikiwa msaini (au kikundi cha wasaini) anajaribu kudhibiti vitalu vinavyopiga kura ya kuwaondoa kwenye orodha ya uidhinishaji. Ili kutatua hili, mzunguko unaoruhusiwa wa ufuzi wa wasaini umezuiwa kwa 1 kati ya N/2. Hii inahakikisha kwamba wasaini wenye nia mbaya wanahitaji kudhibiti angalau 51% ya akaunti za kusaini, ambapo wangekuwa chanzo kipya cha ukweli kwa mnyororo.

### Taka {#spam-attack}

Njia nyingine ndogo ya mashambulizi ni wasaini wenye nia mbaya kuingiza mapendekezo mapya ya kura ndani ya kila kitalu wanachofua. Kwa kuwa nodi zinahitaji kuhesabu kura zote ili kuunda orodha halisi ya wasaini walioidhinishwa, lazima zirekodi kura zote kwa muda. Bila kuweka kikomo kwenye dirisha la kura, hii inaweza kukua polepole, lakini bila kikomo. Suluhisho ni kuweka dirisha _linalosonga_ la vitalu W ambapo baada ya hapo kura huchukuliwa kuwa zimepitwa na wakati. _Dirisha linalofaa linaweza kuwa enzi 1-2._

### Vitalu vinavyotokea kwa wakati mmoja {#concurrent-blocks}

Katika mtandao wa PoA, Wakati kuna wasaini N walioidhinishwa, kila msaini anaruhusiwa kufua kitalu 1 kati ya K, ambayo inamaanisha kuwa wathibitishaji N-K+1 wanaruhusiwa kufua wakati wowote ule. Ili kuzuia wathibitishaji hawa kushindania vitalu, kila msaini anapaswa kuongeza "kicheleweshaji" kidogo cha nasibu kwa wakati anapotoa kitalu kipya. Ingawa mchakato huu unahakikisha kwamba migawanyiko midogo ni nadra, migawanyiko ya mara kwa mara bado inaweza kutokea, kama tu kwenye Mtandao Mkuu. Ikiwa msaini atapatikana anatumia vibaya mamlaka yake na kusababisha machafuko, wasaini wengine wanaweza kumpigia kura ya kumwondoa.

Ikiwa kwa mfano kuna wasaini 10 walioidhinishwa na kila msaini anaruhusiwa kuunda kitalu 1 kati ya 6, basi wakati wowote, wathibitishaji 5 wanaweza kuunda vitalu. Ili kuwazuia kushindania kuunda vitalu, kila msaini huongeza "kicheleweshaji" kidogo cha nasibu kwa wakati wanaotoa kitalu kipya. Hii inapunguza kutokea kwa migawanyiko midogo lakini bado inaruhusu migawanyiko ya mara kwa mara, kama inavyoonekana kwenye Mtandao Mkuu wa Ethereum. Ikiwa msaini anatumia vibaya mamlaka yake na kusababisha usumbufu, anaweza kupigiwa kura ya kuondolewa kwenye mtandao.

## Faida na hasara {#pros-and-cons}

| Faida                                                                                                                                                                     | Hasara                                                                                                                                                                        |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Ina uwezo wa kuongezeka zaidi kuliko taratibu zingine maarufu kama PoS na PoW, kwani inategemea idadi ndogo ya wasaini wa kitalu                                          | Mitandao ya PoA kwa kawaida ina idadi ndogo ya nodi zinazothibitisha. Hii inafanya mtandao wa PoA kuwa uliowekwa kati zaidi.                                                  |
| Minyororo ya vitalu ya PoA ni ya bei nafuu sana kuendesha na kudumisha                                                                                                    | Kuwa msaini aliyeidhinishwa kwa kawaida ni nje ya uwezo wa mtu wa kawaida, kwa sababu mnyororo wa vitalu unahitaji taasisi zenye sifa zilizothibitishwa.                    |
| Miamala inathibitishwa haraka sana kwani inaweza kufikia chini ya sekunde 1 kwa sababu idadi ndogo tu ya wasaini inahitajika kuthibitisha vitalu vipya                    | Wasaini wenye nia mbaya wanaweza kufanya upangaji upya, matumizi mara mbili, kudhibiti miamala kwenye mtandao, mashambulizi hayo yanapunguzwa lakini bado yanawezekana        |

## Usomaji zaidi {#further-reading}

- [EIP-225](https://eips.ethereum.org/EIPS/eip-225) _Kiwango cha Clique_
- [Utafiti wa Uthibitisho wa Mamlaka](https://github.com/cryptoeconomics-study/website/blob/master/docs/sync/2.4-lecture.md) _Cryptoeconomics_
- [Uthibitisho wa Mamlaka ni nini](https://forum.openzeppelin.com/t/proof-of-authority/3577) _OpenZeppelin_
- [Uthibitisho wa Mamlaka Umefafanuliwa](https://academy.binance.com/en/articles/proof-of-authority-explained) _Binance_
- [PoA katika mnyororo wa vitalu](https://medium.com/techskill-brew/proof-of-authority-or-poa-in-blockchain-part-11-blockchain-series-be15b3321cba)
- [Clique imefafanuliwa](https://medium.com/@Destiner/clique-cross-client-proof-of-authority-algorithm-for-ethereum-8b2a135201d)
- [PoA iliyopitwa na wakati, vipimo vya Aura](https://openethereum.github.io/Chain-specification)
- [IBFT 2.0, utekelezaji mwingine wa PoA](https://besu.hyperledger.org/private-networks/concepts/poa)

### Je, unapendelea kujifunza kwa kuona? {#visual-learner}

Tazama maelezo ya kuona ya uthibitisho wa mamlaka:

<VideoWatch slug="proof-of-authority-explained" />

## Mada zinazohusiana {#related-topics}

- [Uthibitisho wa Kazi](/developers/docs/consensus-mechanisms/pow/)
- [Uthibitisho wa Dau](/developers/docs/consensus-mechanisms/pos/)