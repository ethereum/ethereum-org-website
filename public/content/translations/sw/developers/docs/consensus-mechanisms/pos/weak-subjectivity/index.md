---
title: Upendeleo dhaifu
description: Maelezo ya udhaifu wa mtazamo na jukumu lake katika PoS Ethereum.
lang: sw
---

Mtazamo katika minyororo ya bloku hurejelea utegemezi wa taarifa za kijamii ili kukubaliana kuhusu hali ya sasa. Kunaweza kuwa na uma nyingi halali ambazo huchaguliwa kutoka kulingana na taarifa zilizokusanywa kutoka kwa rika wengine kwenye mtandao. Kinyume chake ni uhalisia usioegemea upande ambao hurejelea minyororo ambapo kuna mnyororo mmoja tu unaowezekana kuwa halali ambao nodi zote lazima zikubaliane nao kwa kutumia sheria zao za msimbo. Pia kuna hali ya tatu, inayojulikana kama udhaifu wa mtazamo. Hii inarejelea mnyororo unaoweza kuendelea kwa uhalisia usioegemea upande baada ya mbegu fulani ya awali ya taarifa kupatikana kijamii.

## Mahitaji ya awali {#prerequisites}

Ili kuelewa ukurasa huu ni muhimu kwanza kuelewa misingi ya [uthibitisho wa hisa](/developers/docs/consensus-mechanisms/pos/).

## Ni matatizo gani udhaifu wa mtazamo hutatua? {#problems-ws-solves}

Mtazamo ni asili ya minyororo ya bloku ya uthibitisho wa hisa kwa sababu kuchagua mnyororo sahihi kutoka kwa uma nyingi hufanywa kwa kuhesabu kura za kihistoria. Hii inaweka mnyororo wa bloku wazi kwa vekta kadhaa za mashambulizi, ikiwa ni pamoja na mashambulizi ya masafa marefu ambapo nodi zilizoshiriki mapema sana kwenye mnyororo hudumisha uma mbadala ambao wanautoa baadaye sana kwa faida yao wenyewe. Vinginevyo, ikiwa 33% ya wathibitishaji watatoa hisa zao lakini wakaendelea kuthibitisha na kutoa bloku, wanaweza kutengeneza uma mbadala unaokinzana na mnyororo halisi. Nodi mpya au nodi ambazo zimekuwa nje ya mtandao kwa muda mrefu huenda zikawa hazifahamu kwamba wathibitishaji hawa washambulizi wametoa fedha zao, hivyo washambulizi wanaweza kuwadanganya ili zifuate mnyororo usio sahihi. Ethereum inaweza kutatua vekta hizi za mashambulizi kwa kuweka vikwazo vinavyopunguza vipengele vya mtazamo vya utaratibu—na hivyo basi dhana za kuaminiana—hadi kiwango cha chini kabisa.

## Vituo vya ukaguzi vya udhaifu wa mtazamo {#ws-checkpoints}

Udhaifu wa mtazamo unatekelezwa katika Ethereum ya uthibitisho wa hisa kwa kutumia "vituo vya ukaguzi vya udhaifu wa mtazamo". Hizi ni mizizi ya hali ambayo nodi zote kwenye mtandao zinakubali ni sehemu ya mnyororo halisi. Zinafanya kazi sawa ya "ukweli wa ulimwengu wote" kama bloku za mwanzo, isipokuwa haziko katika nafasi ya mwanzo katika mnyororo wa bloku. Kanuni ya uchaguzi wa uma inaamini kwamba hali ya mnyororo wa bloku iliyobainishwa katika kituo hicho cha ukaguzi ni sahihi na kwamba inathibitisha mnyororo kwa uhuru na kwa uhalisia usioegemea upande kuanzia hapo na kuendelea. Vituo vya ukaguzi hufanya kazi kama "vikomo vya kurudisha nyuma" kwa sababu bloku zilizoko kabla ya vituo vya ukaguzi vya udhaifu wa mtazamo haziwezi kubadilishwa. Hii inadhoofisha mashambulizi ya masafa marefu kwa kufafanua tu uma za masafa marefu kuwa batili kama sehemu ya muundo wa utaratibu. Kuhakikisha kwamba vituo vya ukaguzi vya udhaifu wa mtazamo vimetenganishwa kwa umbali mdogo kuliko kipindi cha kutoa cha mthibitishaji huhakikisha kwamba mthibitishaji anayetengeneza uma kwenye mnyororo anapunguzwa angalau kiasi fulani cha kizingiti kabla ya kuweza kutoa hisa yake na kwamba waingiaji wapya hawawezi kudanganywa kwenye uma zisizo sahihi na wathibitishaji ambao hisa zao zimetolewa.

## Tofauti kati ya vituo vya ukaguzi vya udhaifu wa mtazamo na bloku zilizokamilishwa {#difference-between-ws-and-finalized-blocks}

Bloku zilizokamilishwa na vituo vya ukaguzi vya udhaifu wa mtazamo hushughulikiwa tofauti na nodi za Ethereum. Ikiwa nodi inagundua bloku mbili zinazoshindana zilizokamilishwa, basi inakuwa katika njia panda kati ya hizo mbili - haina njia ya kutambua kiotomatiki ni upi uma halisi. Hii ni dalili ya kushindwa kwa makubaliano. Kinyume chake, nodi inakataa tu bloku yoyote inayokinzana na kituo chake cha ukaguzi cha udhaifu wa mtazamo. Kwa mtazamo wa nodi, kituo cha ukaguzi cha udhaifu wa mtazamo kinawakilisha ukweli kamili ambao hauwezi kudhoofishwa na maarifa mapya kutoka kwa rika zake.

## Udhaifu wake ni dhaifu kiasi gani? {#how-weak-is-weak}

Kipengele cha mtazamo cha uthibitisho wa hisa wa Ethereum ni hitaji la hali ya hivi karibuni (kituo cha ukaguzi cha udhaifu wa mtazamo) kutoka chanzo cha kuaminika ili kusawazisha kutoka. Hatari ya kupata kituo kibaya cha ukaguzi cha udhaifu wa mtazamo ni ndogo sana kwa sababu vinaweza kukaguliwa dhidi ya vyanzo kadhaa huru vya umma kama vile vichunguzi vya bloku au nodi nyingi. Hata hivyo, daima kuna kiwango fulani cha uaminifu kinachohitajika ili kuendesha programu yoyote ya kompyuta, kwa mfano, kuamini kwamba wasanidi programu wametengeneza programu ya uaminifu.

Kituo cha ukaguzi cha udhaifu wa mtazamo kinaweza hata kuja kama sehemu ya programu ya mteja. Pengine mshambulizi anaweza kuharibu kituo cha ukaguzi katika programu na anaweza kwa urahisi vilevile kuharibu programu yenyewe. Hakuna njia halisi ya kiuchumi ya sarafu ya kidijitali kuzunguka tatizo hili, lakini athari ya wasanidi programu wasioaminika inapunguzwa katika Ethereum kwa kuwa na timu nyingi huru za wateja, kila moja ikitengeneza programu inayofanana katika lugha tofauti, zote zikiwa na nia ya kudumisha mnyororo wa uaminifu. Vichunguzi vya bloku vinaweza pia kutoa vituo vya ukaguzi vya udhaifu wa mtazamo au njia ya kurejelea vituo vya ukaguzi vilivyopatikana kutoka kwingineko dhidi ya chanzo cha ziada.

Hatimaye, vituo vya ukaguzi vinaweza kuombwa kutoka kwa nodi zingine; labda mtumiaji mwingine wa Ethereum anayeendesha nodi kamili anaweza kutoa kituo cha ukaguzi ambacho wathibitishaji wanaweza kisha kuthibitisha dhidi ya data kutoka kwa kichunguzi cha bloku. Kwa ujumla, kuamini mtoa huduma wa kituo cha ukaguzi cha udhaifu wa mtazamo kunaweza kuchukuliwa kuwa na matatizo kama kuamini wasanidi programu wa mteja. Uaminifu wa jumla unaohitajika ni mdogo. Ni muhimu kutambua kwamba mazingatio haya yanakuwa muhimu tu katika tukio lisilowezekana sana kwamba wathibitishaji wengi wanafanya njama za kutengeneza uma mbadala wa mnyororo wa bloku. Chini ya hali nyingine zozote, kuna mnyororo mmoja tu wa Ethereum wa kuchagua.

## Masomo zaidi {#further-reading}

- [Udhaifu wa mtazamo katika Eth2](https://notes.ethereum.org/@adiasg/weak-subjectvity-eth2)
- [Vitalik: Jinsi nilivyojifunza kupenda udhaifu wa mtazamo](https://blog.ethereum.org/2014/11/25/proof-stake-learned-love-weak-subjectivity/)
- [Udhaifu wa mtazamo (nyaraka za Teku)](https://docs.teku.consensys.io/concepts/weak-subjectivity)
- [Mwongozo wa udhaifu wa mtazamo wa Awamu-0](https://github.com/ethereum/consensus-specs/blob/dev/specs/phase0/weak-subjectivity.md)
- [Uchambuzi wa udhaifu wa mtazamo katika Ethereum 2.0](https://github.com/runtimeverification/beacon-chain-verification/blob/master/weak-subjectivity/weak-subjectivity-analysis.pdf)
