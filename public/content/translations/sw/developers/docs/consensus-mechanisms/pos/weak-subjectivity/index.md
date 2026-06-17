---
title: Udhanifu dhaifu
description: Maelezo ya udhanifu dhaifu na jukumu lake katika Uthibitisho wa Dau (PoS) wa Ethereum.
lang: sw
---

Udhanifu katika minyororo ya vitalu unarejelea kutegemea taarifa za kijamii ili kukubaliana kuhusu hali ya sasa. Kunaweza kuwa na michepuo halali mingi inayochaguliwa kulingana na taarifa zilizokusanywa kutoka kwa wenza wengine kwenye mtandao. Kinyume chake ni uhalisia ambao unarejelea minyororo ambapo kuna mnyororo mmoja tu unaowezekana kuwa halali ambao nodi zote zitakubaliana nao lazima kwa kutumia sheria zao zilizowekwa kwenye kodi. Pia kuna hali ya tatu, inayojulikana kama udhanifu dhaifu. Hii inarejelea mnyororo unaoweza kuendelea kiuhalisia baada ya mbegu fulani ya awali ya taarifa kupatikana kijamii.

## Mahitaji ya Awali {#prerequisites}

Ili kuelewa ukurasa huu ni lazima kwanza kuelewa misingi ya [Uthibitisho wa Dau (PoS)](/developers/docs/consensus-mechanisms/pos/).

## Udhanifu dhaifu unatatua matatizo gani? {#problems-ws-solves}

Udhanifu ni asili ya minyororo ya vitalu ya Uthibitisho wa Dau kwa sababu kuchagua mnyororo sahihi kutoka kwenye michepuo mingi hufanywa kwa kuhesabu kura za kihistoria. Hii inaweka mnyororo wa vitalu hatarini kwa njia kadhaa za mashambulizi, ikiwa ni pamoja na mashambulizi ya masafa marefu ambapo nodi zilizoshiriki mapema sana kwenye mnyororo hudumisha mchepuo mbadala ambao huutoa baadaye sana kwa faida yao wenyewe. Vinginevyo, ikiwa 33% ya wathibitishaji watafanya utoaji wa dhamana yao lakini wakaendelea kuthibitisha na kuzalisha vitalu, wanaweza kuzalisha mchepuo mbadala unaokinzana na mnyororo unaokubalika. Nodi mpya au nodi ambazo zimekuwa nje ya mtandao kwa muda mrefu zinaweza zisiwe na ufahamu kwamba wathibitishaji hawa wanaoshambulia wametoa fedha zao, hivyo washambuliaji wanaweza kuwahadaa kufuata mnyororo usio sahihi. [Ethereum](/) inaweza kutatua njia hizi za mashambulizi kwa kuweka vikwazo vinavyopunguza vipengele vya udhanifu vya utaratibu—na hivyo dhana za uaminifu—kwa kiwango cha chini kabisa.

## Vituo vya ukaguzi vya udhanifu dhaifu {#ws-checkpoints}

Udhanifu dhaifu unatekelezwa katika Uthibitisho wa Dau wa Ethereum kwa kutumia "vituo vya ukaguzi vya udhanifu dhaifu". Hizi ni mizizi ya hali ambazo nodi zote kwenye mtandao zinakubaliana kuwa ni za mnyororo unaokubalika. Zinafanya kazi sawa ya "ukweli wa ulimwengu wote" kama vitalu vya mwanzo, isipokuwa kwamba hazikai kwenye nafasi ya mwanzo katika mnyororo wa vitalu. Algoriti ya kuchagua mchepuko inaamini kwamba hali ya mnyororo wa vitalu iliyofafanuliwa katika kituo hicho cha ukaguzi ni sahihi na kwamba inathibitisha mnyororo kwa uhuru na kiuhalisia kuanzia hatua hiyo na kuendelea. Vituo vya ukaguzi hufanya kazi kama "mipaka ya kutengua" kwa sababu vitalu vilivyopo kabla ya vituo vya ukaguzi vya udhanifu dhaifu haviwezi kubadilishwa. Hii inadhoofisha mashambulizi ya masafa marefu kwa kufafanua tu michepuo ya masafa marefu kuwa batili kama sehemu ya muundo wa utaratibu. Kuhakikisha kwamba vituo vya ukaguzi vya udhanifu dhaifu vimetenganishwa kwa umbali mdogo kuliko kipindi cha utoaji cha mthibitishaji kunahakikisha kwamba mthibitishaji anayechepusha mnyororo anafanyiwa ukataji wa angalau kiasi fulani cha kikomo kabla ya kuweza kufanya utoaji wa dhamana yao na kwamba washiriki wapya hawawezi kuhadaiwa kuingia kwenye michepuo isiyo sahihi na wathibitishaji ambao dhamana yao imetolewa.

## Tofauti kati ya vituo vya ukaguzi vya udhanifu dhaifu na vitalu vilivyokamilishwa {#difference-between-ws-and-finalized-blocks}

Vitalu vilivyokamilishwa na vituo vya ukaguzi vya udhanifu dhaifu vinachukuliwa tofauti na nodi za Ethereum. Ikiwa nodi itatambua vitalu viwili vilivyokamilishwa vinavyoshindana, basi inachanganyikiwa kati ya hivyo viwili - haina njia ya kutambua kiotomatiki upi ni mchepuo unaokubalika. Hii ni dalili ya kushindwa kwa mwafaka. Kinyume chake, nodi inakataa tu kitalu chochote kinachokinzana na kituo chake cha ukaguzi cha udhanifu dhaifu. Kwa mtazamo wa nodi, kituo cha ukaguzi cha udhanifu dhaifu kinawakilisha ukweli kamili ambao hauwezi kudhoofishwa na maarifa mapya kutoka kwa wenza wake.

## Udhaifu huu ni dhaifu kiasi gani? {#how-weak-is-weak}

Kipengele cha udhanifu cha Uthibitisho wa Dau wa Ethereum ni hitaji la hali ya hivi karibuni (kituo cha ukaguzi cha udhanifu dhaifu) kutoka kwa chanzo kinachoaminika ili kufanya usawazishaji. Hatari ya kupata kituo kibaya cha ukaguzi cha udhanifu dhaifu ni ndogo sana kwa sababu vinaweza kukaguliwa dhidi ya vyanzo kadhaa huru vya umma kama vile vichunguzi vya bloku au nodi nyingi. Hata hivyo, daima kuna kiwango fulani cha uaminifu kinachohitajika kuendesha programu yoyote, kwa mfano, kuamini kwamba watengenezaji wa programu wametengeneza programu ya uaminifu.

Kituo cha ukaguzi cha udhanifu dhaifu kinaweza hata kuja kama sehemu ya programu ya mteja. Inawezekana mshambuliaji akaharibu kituo cha ukaguzi kwenye programu na anaweza kuharibu programu yenyewe kwa urahisi huo huo. Hakuna njia halisi ya kiuchumi ya kripto ya kutatua tatizo hili, lakini athari za watengenezaji wasioaminika hupunguzwa katika Ethereum kwa kuwa na timu nyingi huru za wateja, kila moja ikijenga programu sawa katika lugha tofauti, zote zikiwa na maslahi ya kudumisha mnyororo wa uaminifu. Vichunguzi vya bloku vinaweza pia kutoa vituo vya ukaguzi vya udhanifu dhaifu au njia ya kulinganisha vituo vya ukaguzi vilivyopatikana kwingineko dhidi ya chanzo cha ziada.

Hatimaye, vituo vya ukaguzi vinaweza kuombwa kutoka kwa nodi nyingine; labda mtumiaji mwingine wa Ethereum anayeendesha nodi kamili anaweza kutoa kituo cha ukaguzi ambacho wathibitishaji wanaweza kukithibitisha dhidi ya data kutoka kwenye kichunguzi cha bloku. Kwa ujumla, kumwamini mtoa huduma wa kituo cha ukaguzi cha udhanifu dhaifu kunaweza kuchukuliwa kuwa na matatizo sawa na kuwaamini watengenezaji wa mteja. Uaminifu wa jumla unaohitajika ni mdogo. Ni muhimu kutambua kwamba mambo haya yanakuwa muhimu tu katika tukio lisilowezekana sana kwamba idadi kubwa ya wathibitishaji wanapanga njama kuzalisha mchepuo mbadala wa mnyororo wa vitalu. Katika mazingira mengine yoyote, kuna mnyororo mmoja tu wa Ethereum wa kuchagua.

## Usomaji Zaidi {#further-reading}

- [Udhanifu dhaifu katika Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jinsi nilivyojifunza kupenda udhanifu dhaifu](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity)
- [Udhanifu dhaifu (Nyaraka za Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Mwongozo wa udhanifu dhaifu wa Awamu ya 0](https://github.com/ethereum/consensus-specs/blob/master/specs/phase0/weak-subjectivity.md)
- [Uchambuzi wa udhanifu dhaifu katika Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)