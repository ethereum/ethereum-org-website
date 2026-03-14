---
title: Mwongozo wa zana za usalama za mkataba-erevu
description: Muhtasari wa mbinu tatu tofauti za upimaji na uchanganuzi wa programu
author: "Trailofbits"
lang: sw
tags: [ "uimara", "mikataba erevu", "usalama" ]
skill: intermediate
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Tutatumia mbinu tatu tofauti za upimaji na uchanganuzi wa programu:

- **Uchanganuzi tuli kwa kutumia [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Njia zote za programu hukadiriwa na kuchanganuliwa kwa wakati mmoja, kupitia uwasilishaji tofauti wa programu (k.m., control-flow-graph)
- **Fuzzing na [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Msimbo unatekelezwa kwa uzalishaji nasibu bandia wa miamala. Fuzzer itajaribu kupata mfuatano wa miamala ili kukiuka sifa fulani.
- **Utekelezaji wa kiishara na [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Mbinu rasmi ya uthibitishaji, ambayo hutafsiri kila njia ya utekelezaji kuwa fomula ya kihisabati, ambayo juu yake vikwazo vinaweza kukaguliwa.

Kila mbinu ina faida na hasara, na itakuwa na manufaa katika [kesi maalum](#determining-security-properties):

| Mbinu                   | Zana      | Matumizi                                    | Kasi    | Hitilafu zilizokosekana | Kengele za Uongo |
| ----------------------- | --------- | ------------------------------------------- | ------- | ----------------------- | ---------------- |
| Uchanganuzi Tuli        | Slither   | CLI & hati              | sekunde | wastani                 | chini            |
| Fuzzing                 | Echidna   | Sifa za Solidity                            | dakika  | chini                   | hakuna           |
| Utekelezaji wa Kiishara | Manticore | Sifa za Solidity & hati | saa     | hakuna\*                | hakuna           |

- ikiwa njia zote zimechunguzwa bila muda kuisha

**Slither** huchanganua mikataba ndani ya sekunde, hata hivyo, uchanganuzi tuli unaweza kusababisha kengele za uongo na hautafaa sana kwa ukaguzi changamano (k.m., ukaguzi wa kihisabati). Tumia Slither kupitia API kwa ufikiaji wa kubofya kitufe kwa vigunduzi vilivyojengewa ndani au kupitia API kwa ukaguzi uliobainishwa na mtumiaji.

**Echidna** inahitaji kufanya kazi kwa dakika kadhaa na itatoa matokeo chanya ya kweli pekee. Echidna hukagua sifa za usalama zinazotolewa na mtumiaji, zilizoandikwa katika Solidity. Inaweza kukosa hitilafu kwani inategemea uchunguzi nasibu.

**Manticore** hufanya uchanganuzi wa "uzito mzito zaidi". Kama Echidna, Manticore inathibitisha sifa zinazotolewa na mtumiaji. Itahitaji muda zaidi kufanya kazi, lakini inaweza kuthibitisha uhalali wa sifa na haitatoa ripoti za kengele za uongo.

## Mtiririko wa kazi unaopendekezwa {#suggested-workflow}

Anza na vigunduzi vilivyojengewa ndani vya Slither ili kuhakikisha kuwa hakuna hitilafu rahisi zilizopo sasa au zitakazoletwa baadaye. Tumia Slither kukagua sifa zinazohusiana na urithi, utegemezi wa vigeu, na masuala ya kimuundo. Msimbo unavyokua, tumia Echidna kupima sifa changamano zaidi za mashine ya hali. Rejelea Slither ili kuunda ukaguzi maalum kwa ajili ya ulinzi usioupata kutoka kwa Solidity, kama vile kulinda dhidi ya kazi kubatilishwa. Mwishowe, tumia Manticore kufanya uthibitishaji unaolengwa wa sifa muhimu za usalama, k.m., shughuli za kihisabati.

- Tumia CLI ya Slither kugundua masuala ya kawaida
- Tumia Echidna kupima sifa za usalama za kiwango cha juu za mkataba wako
- Tumia Slither kuandika ukaguzi maalum tuli
- Tumia Manticore mara tu unapotaka uhakikisho wa kina wa sifa muhimu za usalama

**Dokezo kuhusu majaribio ya kitengo**. Majaribio ya kitengo ni muhimu ili kuunda programu ya ubora wa juu. Hata hivyo, mbinu hizi hazifai zaidi kupata dosari za usalama. Kwa kawaida hutumika kupima tabia chanya za msimbo (yaani, msimbo hufanya kazi kama inavyotarajiwa katika muktadha wa kawaida), huku dosari za usalama zikielekea kukaa katika hali za pembeni ambazo wasanidi programu hawakuzizingatia. Katika utafiti wetu wa hakiki nyingi za usalama za mkataba-erevu, [ufikiaji wa majaribio ya kitengo haukuwa na athari kwa idadi au ukali wa dosari za usalama](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) tulizopata katika msimbo wa wateja wetu.

## Kubainisha Sifa za Usalama {#determining-security-properties}

Ili kupima na kuthibitisha msimbo wako kwa ufanisi, ni lazima utambue maeneo yanayohitaji uangalizi. Kwa kuwa rasilimali zako zinazotumika kwenye usalama ni chache, kupanga sehemu dhaifu au zenye thamani ya juu za msimbo wako ni muhimu ili kuboresha juhudi zako. Uundaji wa vitisho unaweza kusaidia. Fikiria kukagua:

- [Tathmini za Haraka za Hatari](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (mbinu tunayopendelea wakati ni mfupi)
- [Mwongozo wa Uundaji wa Vitisho vya Mfumo Unaozingatia Data](https://csrc.nist.gov/pubs/sp/800/154/ipd) (pia inajulikana kama NIST 800-154)
- [Uundaji wa vitisho wa Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](https://wikipedia.org/wiki/STRIDE_\(security\)) / [DREAD](https://wikipedia.org/wiki/DREAD_\(risk_assessment_model\))
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Matumizi ya Madai](https://blog.regehr.org/archives/1091)

### Vipengele {#components}

Kujua unachotaka kukagua pia kutakusaidia kuchagua zana sahihi.

Maeneo mapana ambayo mara nyingi yanafaa kwa mikataba-erevu ni pamoja na:

- **Mashine ya hali.** Mikataba mingi inaweza kuwakilishwa kama mashine ya hali. Fikiria kukagua kuwa (1) Hakuna hali batili inayoweza kufikiwa, (2) ikiwa hali ni halali inaweza kufikiwa, na (3) hakuna hali inayotega mkataba.

  - Echidna na Manticore ndizo zana za kupendelea kupima vipimo vya mashine ya hali.

- **Vidhibiti vya ufikiaji.** Ikiwa mfumo wako una watumiaji waliopewa fursa (k.m., mmiliki, vidhibiti, ...) lazima uhakikishe kwamba (1) kila mtumiaji anaweza tu kutekeleza vitendo vilivyoidhinishwa na (2) hakuna mtumiaji anayeweza kuzuia vitendo kutoka kwa mtumiaji aliye na fursa zaidi.

  - Slither, Echidna na Manticore zinaweza kuangalia vidhibiti sahihi vya ufikiaji. Kwa mfano, Slither inaweza kuangalia kuwa kazi zilizoidhinishwa tu ndizo zinazokosa kirekebishaji cha onlyOwner. Echidna na Manticore ni muhimu kwa udhibiti changamano zaidi wa ufikiaji, kama vile ruhusa inayotolewa tu ikiwa mkataba utafikia hali fulani.

- **Shughuli za kihisabati.** Kuangalia usahihi wa shughuli za kihisabati ni muhimu sana. Kutumia `SafeMath` kila mahali ni hatua nzuri ya kuzuia kufurika/kupungua (`overflow`/`underflow`), hata hivyo, bado lazima uzingatie dosari zingine za kihisabati, ikiwa ni pamoja na masuala ya kuzungusha na dosari zinazotega mkataba.

  - Manticore ndiyo chaguo bora zaidi hapa. Echidna inaweza kutumika ikiwa hesabu iko nje ya wigo wa SMT solver.

- **Usahihi wa urithi.** Mikataba ya Solidity inategemea sana urithi mwingi. Makosa kama vile kazi ya kufunika inayokosa mwito wa `super` na mpangilio wa uunganishaji wa c3 uliotafsiriwa vibaya unaweza kuletwa kwa urahisi.

  - Slither ndiyo zana ya kuhakikisha ugunduzi wa masuala haya.

- **Mwingiliano wa nje.** Mikataba huingiliana, na baadhi ya mikataba ya nje haipaswi kuaminiwa. Kwa mfano, ikiwa mkataba wako unategemea oracles za nje, je, utabaki salama ikiwa nusu ya oracles zinazopatikana zitahujumiwa?

  - Manticore na Echidna ndio chaguo bora zaidi kwa kupima mwingiliano wa nje na mikataba yako. Manticore ina utaratibu uliojengewa ndani wa kuweka vibadala vya mikataba ya nje.

- **Upatanifu wa viwango.** Viwango vya Ethereum (k.m., ERC20) vina historia ya dosari katika muundo wao. Fahamu mapungufu ya kiwango unachojengea.
  - Slither, Echidna, na Manticore zitakusaidia kugundua mkengeuko kutoka kwa kiwango fulani.

### Karatasi ya kudokezea ya uteuzi wa zana {#tool-selection-cheatsheet}

| Kipengele              | Zana                        | Mifano                                                                                                                                                                                                                                                                              |
| ---------------------- | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mashine ya hali        | Echidna, Manticore          |                                                                                                                                                                                                                                                                                     |
| Udhibiti wa ufikiaji   | Slither, Echidna, Manticore | [Zoezi la 2 la Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Zoezi la 2 la Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Shughuli za kihisabati | Manticore, Echidna          | [Zoezi la 1 la Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Mazoezi 1 - 3 ya Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises)       |
| Usahihi wa urithi      | Slither                     | [Zoezi la 1 la Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md)                                                                                                                                            |
| Mwingiliano wa nje     | Manticore, Echidna          |                                                                                                                                                                                                                                                                                     |
| Upatanifu wa viwango   | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance)                                                                                                                                                                                                             |

Maeneo mengine yatahitaji kukaguliwa kulingana na malengo yako, lakini maeneo haya mapana ya kuzingatia ni mwanzo mzuri kwa mfumo wowote wa mkataba-erevu.

Ukaguzi wetu wa umma una mifano ya sifa zilizothibitishwa au zilizopimwa. Fikiria kusoma sehemu za `Upimaji na Uthibitishaji wa Kiotomatiki` za ripoti zifuatazo ili kukagua sifa halisi za usalama:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)
