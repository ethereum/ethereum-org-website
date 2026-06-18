---
title: Mwongozo wa zana za usalama za mkataba mahiri
description: Muhtasari wa mbinu tatu tofauti za majaribio na uchanganuzi wa programu
author: "Trailofbits"
lang: sw
tags: ["solidity", "mikataba mahiri", "usalama"]
skill: intermediate
breadcrumb: Zana za usalama
published: 2020-09-07
source: Building secure contracts
sourceUrl: https://github.com/crytic/building-secure-contracts/tree/master/program-analysis
---

Tutatumia mbinu tatu tofauti za majaribio na uchanganuzi wa programu:

- **Uchanganuzi tuli kwa kutumia [Slither](/developers/tutorials/how-to-use-slither-to-find-smart-contract-bugs/).** Njia zote za programu zinakadiriwa na kuchanganuliwa kwa wakati mmoja, kupitia mawasilisho tofauti ya programu (k.m., grafu ya mtiririko wa udhibiti)
- **Kufanya Fuzzing kwa kutumia [Echidna](/developers/tutorials/how-to-use-echidna-to-test-smart-contracts/).** Msimbo unatekelezwa kwa uzalishaji wa miamala wa kubahatisha. Kifanya fuzzing kitajaribu kutafuta mfuatano wa miamala ili kukiuka sifa fulani.
- **Utekelezaji wa kiishara kwa kutumia [Manticore](/developers/tutorials/how-to-use-manticore-to-find-smart-contract-bugs/).** Mbinu ya uthibitishaji rasmi, ambayo hutafsiri kila njia ya utekelezaji kuwa fomula ya hisabati, ambapo vikwazo vinaweza kukaguliwa.

Kila mbinu ina faida na hasara zake, na itakuwa muhimu katika [kesi maalum](#determining-security-properties):

| Mbinu | Zana | Matumizi | Kasi | Hitilafu zilizokosekana | Kengele za Uongo |
| ------------------ | --------- | ----------------------------- | ------- | ----------- | ------------ |
| Uchanganuzi Tuli | Slither | CLI na hati | sekunde | wastani | chini |
| Fuzzing | Echidna | Sifa za Solidity | dakika | chini | hakuna |
| Utekelezaji wa Kiishara | Manticore | Sifa na hati za Solidity | saa | hakuna\* | hakuna |

\* ikiwa njia zote zitachunguzwa bila kuisha kwa muda

**Slither** huchanganua mikataba ndani ya sekunde chache, hata hivyo, uchanganuzi tuli unaweza kusababisha kengele za uongo na hautafaa sana kwa ukaguzi changamano (k.m., ukaguzi wa hesabu). Endesha Slither kupitia API kwa ufikiaji wa haraka wa vitambuzi vilivyojengewa ndani au kupitia API kwa ukaguzi uliobainishwa na mtumiaji.

**Echidna** inahitaji kufanya kazi kwa dakika kadhaa na itatoa tu matokeo chanya ya kweli. Echidna hukagua sifa za usalama zilizotolewa na mtumiaji, zilizoandikwa katika Solidity. Inaweza kukosa hitilafu kwa kuwa inategemea uchunguzi wa kubahatisha.

**Manticore** hufanya uchanganuzi "mzito zaidi". Kama Echidna, Manticore huthibitisha sifa zilizotolewa na mtumiaji. Itahitaji muda zaidi kufanya kazi, lakini inaweza kuthibitisha uhalali wa sifa na haitaripoti kengele za uongo.

## Mtiririko wa kazi uliopendekezwa {#suggested-workflow}

Anza na vitambuzi vilivyojengewa ndani vya Slither ili kuhakikisha kuwa hakuna hitilafu rahisi zilizopo sasa au zitaletwa baadaye. Tumia Slither kukagua sifa zinazohusiana na urithi, utegemezi wa vigeu, na masuala ya kimuundo. Kadiri msingi wa msimbo unavyokua, tumia Echidna kujaribu sifa changamano zaidi za mashine ya hali. Tembelea tena Slither ili kuunda ukaguzi maalum kwa ajili ya ulinzi ambao haupatikani kutoka kwa Solidity, kama vile kulinda dhidi ya utendakazi kubatilishwa. Hatimaye, tumia Manticore kufanya uthibitishaji unaolengwa wa sifa muhimu za usalama, k.m., shughuli za hesabu.

- Tumia CLI ya Slither kupata masuala ya kawaida
- Tumia Echidna kujaribu sifa za usalama za kiwango cha juu za mkataba wako
- Tumia Slither kuandika ukaguzi tuli maalum
- Tumia Manticore mara tu unapohitaji uhakikisho wa kina wa sifa muhimu za usalama

**Dokezo kuhusu majaribio ya vipengee**. Majaribio ya vipengee ni muhimu ili kuunda programu ya ubora wa juu. Hata hivyo, mbinu hizi si bora zaidi katika kupata dosari za usalama. Kwa kawaida hutumiwa kujaribu tabia chanya za msimbo (yaani, msimbo hufanya kazi kama inavyotarajiwa katika muktadha wa kawaida), huku dosari za usalama zikielekea kuwepo katika hali zisizo za kawaida ambazo wasanidi hawakuzingatia. Katika utafiti wetu wa makumi ya hakiki za usalama za mkataba mahiri, [ufikiaji wa majaribio ya vipengee haukuwa na athari kwa idadi au ukali wa dosari za usalama](https://blog.trailofbits.com/2019/08/08/246-findings-from-our-smart-contract-audits-an-executive-summary/) tulizopata katika msimbo wa mteja wetu.

## Kubainisha Sifa za Usalama {#determining-security-properties}

Ili kujaribu na kuthibitisha msimbo wako kwa ufanisi, lazima utambue maeneo yanayohitaji uangalizi. Kwa kuwa rasilimali zako zinazotumika kwenye usalama ni chache, kuweka upeo wa sehemu dhaifu au zenye thamani ya juu za msingi wa msimbo wako ni muhimu ili kuboresha juhudi zako. Uundaji wa kielelezo cha tishio unaweza kusaidia. Fikiria kukagua:

- [Tathmini za Haraka za Hatari](https://infosec.mozilla.org/guidelines/risk/rapid_risk_assessment.html) (mbinu yetu tunayopendelea wakati muda ni mfupi)
- [Mwongozo wa Uundaji wa Kielelezo cha Tishio la Mfumo Unaozingatia Data](https://csrc.nist.gov/pubs/sp/800/154/ipd) (inayojulikana pia kama NIST 800-154)
- [Uundaji wa kielelezo cha tishio la Shostack](https://www.amazon.com/Threat-Modeling-Designing-Adam-Shostack/dp/1118809998)
- [STRIDE](<https://wikipedia.org/wiki/STRIDE_(security)>) / [DREAD](<https://wikipedia.org/wiki/DREAD_(risk_assessment_model)>)
- [PASTA](https://wikipedia.org/wiki/Threat_model#P.A.S.T.A.)
- [Matumizi ya Madai](https://blog.regehr.org/archives/1091)

### Vipengele {#components}

Kujua unachotaka kukagua pia kutakusaidia kuchagua zana sahihi.

Maeneo mapana ambayo mara nyingi yanafaa kwa mikataba mahiri ni pamoja na:

- **Mashine ya hali.** Mikataba mingi inaweza kuwakilishwa kama mashine ya hali. Fikiria kukagua kwamba (1) Hakuna hali batili inayoweza kufikiwa, (2) ikiwa hali ni halali kwamba inaweza kufikiwa, na (3) hakuna hali inayonasa mkataba.

  - Echidna na Manticore ni zana za kupendelea ili kujaribu vipimo vya mashine ya hali.

- **Vidhibiti vya ufikiaji.** Ikiwa mfumo wako una watumiaji wenye mapendeleo (k.m., mmiliki, wadhibiti, ...) lazima uhakikishe kwamba (1) kila mtumiaji anaweza tu kufanya vitendo vilivyoidhinishwa na (2) hakuna mtumiaji anayeweza kuzuia vitendo kutoka kwa mtumiaji aliye na mapendeleo zaidi.

  - Slither, Echidna na Manticore zinaweza kukagua vidhibiti sahihi vya ufikiaji. Kwa mfano, Slither inaweza kukagua kwamba ni utendakazi ulioidhinishwa pekee ndio unaokosa kirekebishaji cha onlyOwner. Echidna na Manticore ni muhimu kwa udhibiti changamano zaidi wa ufikiaji, kama vile ruhusa inayotolewa tu ikiwa mkataba utafikia hali fulani.

- **Shughuli za hesabu.** Kukagua usahihi wa shughuli za hesabu ni muhimu. Kutumia `SafeMath` kila mahali ni hatua nzuri ya kuzuia mzidio/upungufu, hata hivyo, lazima bado uzingatie dosari zingine za hesabu, ikijumuisha masuala ya ukadiriaji na dosari zinazonasa mkataba.

  - Manticore ndilo chaguo bora hapa. Echidna inaweza kutumika ikiwa hesabu iko nje ya upeo wa mtatuaji wa SMT.

- **Usahihi wa urithi.** Mikataba ya Solidity inategemea sana urithi mwingi. Makosa kama vile utendakazi wa kivuli unaokosa wito wa `super` na mpangilio wa mstari wa c3 uliotafsiriwa vibaya yanaweza kuletwa kwa urahisi.

  - Slither ni zana ya kuhakikisha ugunduzi wa masuala haya.

- **Mawasiliano ya nje.** Mikataba huwasiliana yenyewe kwa yenyewe, na baadhi ya mikataba ya nje haipaswi kuaminiwa. Kwa mfano, ikiwa mkataba wako unategemea oracles za nje, je, utaendelea kuwa salama ikiwa nusu ya oracles zinazopatikana zitaathiriwa?

  - Manticore na Echidna ndizo chaguo bora zaidi kwa kujaribu mawasiliano ya nje na mikataba yako. Manticore ina utaratibu uliojengewa ndani wa kudhibiti mikataba ya nje.

- **Uzingatiaji wa viwango.** Viwango vya Ethereum (k.m., ERC-20) vina historia ya dosari katika muundo wao. Fahamu vikwazo vya kiwango unachojenga juu yake.
  - Slither, Echidna, na Manticore zitakusaidia kugundua mikengeuko kutoka kwa kiwango fulani.

### Mwongozo wa haraka wa uteuzi wa zana {#tool-selection-cheatsheet}

| Kipengele | Zana | Mifano |
| ----------------------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Mashine ya hali | Echidna, Manticore |
| Udhibiti wa ufikiaji | Slither, Echidna, Manticore | [Zoezi la 2 la Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise2.md), [Zoezi la 2 la Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-2.md) |
| Shughuli za hesabu | Manticore, Echidna | [Zoezi la 1 la Echidna](https://github.com/crytic/building-secure-contracts/blob/master/program-analysis/echidna/exercises/Exercise-1.md), [Mazoezi ya 1 - 3 ya Manticore](https://github.com/crytic/building-secure-contracts/tree/master/program-analysis/manticore/exercises) |
| Usahihi wa urithi | Slither | [Zoezi la 1 la Slither](https://github.com/crytic/slither/blob/7f54c8b948c34fb35e1d61adaa1bd568ca733253/docs/src/tutorials/exercise1.md) |
| Mawasiliano ya nje | Manticore, Echidna |
| Uzingatiaji wa viwango | Slither, Echidna, Manticore | [`slither-erc`](https://github.com/crytic/slither/wiki/ERC-Conformance) |

Maeneo mengine yatahitaji kukaguliwa kulingana na malengo yako, lakini maeneo haya mapana ya kuzingatia ni mwanzo mzuri kwa mfumo wowote wa mkataba mahiri.

Ukaguzi wetu wa umma una mifano ya sifa zilizothibitishwa au kujaribiwa. Fikiria kusoma sehemu za `Automated Testing and Verification` za ripoti zifuatazo ili kukagua sifa za usalama za ulimwengu halisi:

- [0x](https://github.com/trailofbits/publications/blob/master/reviews/0x-protocol.pdf)
- [Balancer](https://github.com/trailofbits/publications/blob/master/reviews/BalancerCore.pdf)