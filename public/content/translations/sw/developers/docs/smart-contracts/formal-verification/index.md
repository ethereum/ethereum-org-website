---
title: Uthibitishaji rasmi wa mikataba mahiri
description: Muhtasari wa uthibitishaji rasmi kwa mikataba mahiri ya Ethereum
lang: sw
---

[Mikataba mahiri](/developers/docs/smart-contracts/) inafanya iwezekane kuunda programu zilizogatuliwa, bila hitaji la uaminifu, na thabiti ambazo zinaleta matumizi mapya na kufungua thamani kwa watumiaji. Kwa sababu mikataba mahiri inashughulikia kiasi kikubwa cha thamani, usalama ni jambo muhimu sana kwa wasanidi programu.

Uthibitishaji rasmi ni mojawapo ya mbinu zinazopendekezwa za kuboresha [usalama wa mkataba mahiri](/developers/docs/smart-contracts/security/). Uthibitishaji rasmi, ambao unatumia [mbinu rasmi](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) kubainisha, kusanifu, na kuthibitisha programu, umetumika kwa miaka mingi kuhakikisha usahihi wa mifumo muhimu ya maunzi na programu.

Inapotekelezwa katika mikataba mahiri, uthibitishaji rasmi unaweza kuthibitisha kuwa mantiki ya biashara ya mkataba inakidhi vipimo vilivyobainishwa awali. Ikilinganishwa na mbinu zingine za kutathmini usahihi wa msimbo wa mkataba, kama vile majaribio, uthibitishaji rasmi unatoa hakikisho dhabiti zaidi kwamba mkataba mahiri ni sahihi kiutendaji.

## Uthibitishaji rasmi ni nini? {#what-is-formal-verification}

Uthibitishaji rasmi unarejelea mchakato wa kutathmini usahihi wa mfumo kuhusiana na vipimo rasmi. Kwa maneno rahisi, uthibitishaji rasmi unaturuhusu kuangalia ikiwa tabia ya mfumo inakidhi baadhi ya mahitaji (yaani, inafanya kile tunachotaka).

Tabia zinazotarajiwa za mfumo (mkataba mahiri katika kesi hii) zinaelezwa kwa kutumia uundaji rasmi wa miundo, huku lugha za vipimo zikiwezesha uundaji wa sifa rasmi. Mbinu za uthibitishaji rasmi zinaweza kisha kuthibitisha kwamba utekelezaji wa mkataba unatii vipimo vyake na kupata uthibitisho wa kihisabati wa usahihi wa mkataba huo. Wakati mkataba unakidhi vipimo vyake, unaelezwa kama "sahihi kiutendaji", "sahihi kwa muundo", au "sahihi kwa ujenzi".

### Muundo rasmi ni nini? {#what-is-a-formal-model}

Katika sayansi ya kompyuta, [muundo rasmi](https://en.wikipedia.org/wiki/Model_of_computation) ni maelezo ya kihisabati ya mchakato wa kimahesabu. Programu hufupishwa kuwa vitendaji vya kihisabati (milinganyo), huku muundo ukieleza jinsi matokeo ya vitendaji yanavyokokotolewa kulingana na ingizo.

Miundo rasmi hutoa kiwango cha ufupisho ambacho uchanganuzi wa tabia ya programu unaweza kutathminiwa. Kuwepo kwa miundo rasmi kunaruhusu uundaji wa _vipimo rasmi_, ambavyo vinaelezea sifa zinazohitajika za muundo husika.

Mbinu tofauti hutumiwa kuunda miundo ya mikataba mahiri kwa ajili ya uthibitishaji rasmi. Kwa mfano, baadhi ya miundo hutumiwa kufikiri kuhusu tabia ya kiwango cha juu ya mkataba mahiri. Mbinu hizi za uundaji wa miundo hutumia mtazamo wa kisanduku cheusi (black-box) kwa mikataba mahiri, zikiichukulia kama mifumo inayokubali maingizo na kutekeleza ukokotoaji kulingana na maingizo hayo.

Miundo ya kiwango cha juu inalenga uhusiano kati ya mikataba mahiri na mawakala wa nje, kama vile akaunti zinazomilikiwa na watu wa nje (EOAs), akaunti za mkataba, na mazingira ya mnyororo wa vitalu. Miundo kama hiyo ni muhimu kwa kufafanua sifa zinazobainisha jinsi mkataba unapaswa kufanya kazi kulingana na mwingiliano fulani wa mtumiaji.

Kinyume chake, miundo mingine rasmi inalenga tabia ya kiwango cha chini ya mkataba mahiri. Ingawa miundo ya kiwango cha juu inaweza kusaidia katika kufikiri kuhusu utendaji wa mkataba, inaweza kushindwa kunasa maelezo kuhusu utendaji wa ndani wa utekelezaji. Miundo ya kiwango cha chini hutumia mtazamo wa kisanduku cheupe (white-box) kwenye uchanganuzi wa programu na kutegemea uwakilishi wa kiwango cha chini wa programu za mkataba mahiri, kama vile ufuatiliaji wa programu na [grafu za mtiririko wa udhibiti](https://en.wikipedia.org/wiki/Control-flow_graph), ili kufikiri kuhusu sifa zinazohusiana na utekelezaji wa mkataba.

Miundo ya kiwango cha chini inachukuliwa kuwa bora kwa kuwa inawakilisha utekelezaji halisi wa mkataba mahiri katika mazingira ya utekelezaji ya Ethereum (yaani, [EVM](/developers/docs/evm/)). Mbinu za uundaji wa miundo ya kiwango cha chini ni muhimu sana katika kuanzisha sifa muhimu za usalama katika mikataba mahiri na kugundua udhaifu unaoweza kutokea.

### Vipimo rasmi ni nini? {#what-is-a-formal-specification}

Kipimo ni hitaji la kiufundi ambalo mfumo fulani lazima ukidhi. Katika upangaji programu, vipimo vinawakilisha mawazo ya jumla kuhusu utekelezaji wa programu (yaani, kile ambacho programu inapaswa kufanya).

Katika muktadha wa mikataba mahiri, vipimo rasmi vinarejelea _sifa_—maelezo rasmi ya mahitaji ambayo mkataba lazima ukidhi. Sifa kama hizo zinaelezwa kama "zisizobadilika" (invariants) na zinawakilisha madai ya kimantiki kuhusu utekelezaji wa mkataba ambayo lazima yabaki kuwa kweli chini ya kila hali inayowezekana, bila ubaguzi wowote.

Kwa hivyo, tunaweza kufikiria vipimo rasmi kama mkusanyiko wa taarifa zilizoandikwa katika lugha rasmi zinazoelezea utekelezaji uliokusudiwa wa mkataba mahiri. Vipimo vinashughulikia sifa za mkataba na kufafanua jinsi mkataba unapaswa kufanya kazi katika hali tofauti. Madhumuni ya uthibitishaji rasmi ni kubaini ikiwa mkataba mahiri una sifa hizi (zisizobadilika) na kwamba sifa hizi hazikiukwi wakati wa utekelezaji.

Vipimo rasmi ni muhimu katika kuunda utekelezaji salama wa mikataba mahiri. Mikataba ambayo inashindwa kutekeleza sifa zisizobadilika au ambayo sifa zake zinakiukwa wakati wa utekelezaji inaelekea kuwa na udhaifu ambao unaweza kudhuru utendaji au kusababisha unyonyaji mbaya.

## Aina za vipimo rasmi kwa mikataba mahiri {#formal-specifications-for-smart-contracts}

Vipimo rasmi huwezesha kufikiri kwa kihisabati kuhusu usahihi wa utekelezaji wa programu. Kama ilivyo kwa miundo rasmi, vipimo rasmi vinaweza kunasa sifa za kiwango cha juu au tabia ya kiwango cha chini ya utekelezaji wa mkataba.

Vipimo rasmi vinatokana na kutumia vipengele vya [mantiki ya programu](https://en.wikipedia.org/wiki/Logic_programming), ambavyo vinaruhusu kufikiri rasmi kuhusu sifa za programu. Mantiki ya programu ina sheria rasmi zinazoeleza (katika lugha ya kihisabati) tabia inayotarajiwa ya programu. Mantiki mbalimbali za programu hutumiwa katika kuunda vipimo rasmi, ikiwa ni pamoja na [mantiki ya ufikiaji](https://en.wikipedia.org/wiki/Reachability_problem), [mantiki ya muda](https://en.wikipedia.org/wiki/Temporal_logic), na [mantiki ya Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Vipimo rasmi kwa mikataba mahiri vinaweza kuainishwa kwa upana kama vipimo vya **kiwango cha juu** au **kiwango cha chini**. Bila kujali kipimo ni cha kategoria gani, lazima kieleze kwa kutosha na bila utata sifa ya mfumo unaochanganuliwa.

### Vipimo vya kiwango cha juu {#high-level-specifications}

Kama jina linavyopendekeza, kipimo cha kiwango cha juu (pia kinaitwa "kipimo kinachoelekezwa kwenye muundo") kinaelezea tabia ya kiwango cha juu ya programu. Vipimo vya kiwango cha juu huunda mkataba mahiri kama [mashine ya hali yenye kikomo](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), ambayo inaweza kubadilika kati ya hali kwa kufanya shughuli, huku mantiki ya muda ikitumika kufafanua sifa rasmi kwa muundo wa FSM.

[Mantiki za muda](https://en.wikipedia.org/wiki/Temporal_logic) ni "sheria za kufikiri kuhusu mapendekezo yaliyohitimu kulingana na wakati (k.m., "Mimi nina njaa _kila wakati_" au "_hatimaye_ nitakuwa na njaa")." Zinapotumika kwa uthibitishaji rasmi, mantiki za muda hutumiwa kueleza madai kuhusu tabia sahihi ya mifumo iliyoundwa kama mashine za hali. Hasa, mantiki ya muda inaelezea hali za baadaye ambazo mkataba mahiri unaweza kuwa na jinsi unavyobadilika kati ya hali.

Vipimo vya kiwango cha juu kwa ujumla hunasa sifa mbili muhimu za muda kwa mikataba mahiri: **usalama** na **uhai**. Sifa za usalama zinawakilisha wazo kwamba "hakuna jambo baya linalowahi kutokea" na kwa kawaida huonyesha kutobadilika. Sifa ya usalama inaweza kufafanua mahitaji ya jumla ya programu, kama vile uhuru kutoka kwa [msongamano](https://www.techtarget.com/whatis/definition/deadlock), au kueleza sifa mahususi za kikoa kwa mikataba (k.m., sifa zisizobadilika kwenye udhibiti wa ufikiaji kwa vitendaji, thamani zinazokubalika za vigezo vya hali, au masharti ya hamisho la tokeni).

Chukua kwa mfano hitaji hili la usalama ambalo linashughulikia masharti ya kutumia `transfer()` au `transferFrom()` katika mikataba ya tokeni ya ERC-20: _"Salio la mtumaji haliwezi kuwa chini ya kiasi kilichoombwa cha tokeni kutumwa."_. Maelezo haya ya lugha asilia ya sifa isiyobadilika ya mkataba yanaweza kutafsiriwa kuwa kipimo rasmi (cha kihisabati), ambacho kinaweza kuangaliwa kwa uthabiti ili kuthibitisha uhalali wake.

Sifa za uhai zinathibitisha kwamba "jambo zuri hatimaye hutokea" na zinahusu uwezo wa mkataba kuendelea kupitia hali tofauti. Mfano wa sifa ya uhai ni "ukwasi", ambayo inarejelea uwezo wa mkataba kuhamisha salio lake kwa watumiaji wanapoomba. Ikiwa sifa hii itakiukwa, watumiaji hawataweza kutoa mali zilizohifadhiwa kwenye mkataba, kama kile kilichotokea kwenye [tukio la mkoba wa Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Vipimo vya kiwango cha chini {#low-level-specifications}

Vipimo vya kiwango cha juu huchukua kama hatua ya kuanzia muundo wa hali yenye kikomo wa mkataba na kufafanua sifa zinazohitajika za muundo huu. Kinyume chake, vipimo vya kiwango cha chini (pia vinaitwa "vipimo vinavyoelekezwa kwenye sifa") mara nyingi huunda programu (mikataba mahiri) kama mifumo inayojumuisha mkusanyiko wa vitendaji vya kihisabati na kuelezea tabia sahihi ya mifumo kama hiyo.

Kwa maneno rahisi, vipimo vya kiwango cha chini huchanganua _ufuatiliaji wa programu_ na kujaribu kufafanua sifa za mkataba mahiri juu ya ufuatiliaji huu. Ufuatiliaji unarejelea mfuatano wa utekelezaji wa vitendaji ambao unabadilisha hali ya mkataba mahiri; kwa hivyo, vipimo vya kiwango cha chini husaidia kubainisha mahitaji ya utekelezaji wa ndani wa mkataba.

Vipimo rasmi vya kiwango cha chini vinaweza kutolewa kama sifa za mtindo wa Hoare au sifa zisizobadilika kwenye njia za utekelezaji.

### Sifa za mtindo wa Hoare {#hoare-style-properties}

[Mantiki ya Hoare](https://en.wikipedia.org/wiki/Hoare_logic) hutoa seti ya sheria rasmi za kufikiri kuhusu usahihi wa programu, ikiwa ni pamoja na mikataba mahiri. Sifa ya mtindo wa Hoare inawakilishwa na utatu wa Hoare `{P}c{Q}`, ambapo `c` ni programu na `P` na `Q` ni viarifu kwenye hali ya `c` (yaani, programu), zinazoelezwa rasmi kama _masharti ya awali_ na _masharti ya baadaye_, mtawalia.

Sharti la awali ni kiarifu kinachoelezea masharti yanayohitajika kwa utekelezaji sahihi wa kitendaji; watumiaji wanaopiga simu kwenye mkataba lazima wakidhi hitaji hili. Sharti la baadaye ni kiarifu kinachoelezea hali ambayo kitendaji huanzisha ikiwa kimetekelezwa kwa usahihi; watumiaji wanaweza kutarajia hali hii kuwa kweli baada ya kupiga simu kwenye kitendaji. _Sifa isiyobadilika_ katika mantiki ya Hoare ni kiarifu ambacho kinahifadhiwa na utekelezaji wa kitendaji (yaani, hakibadiliki).

Vipimo vya mtindo wa Hoare vinaweza kuhakikisha _usahihi wa kiasi_ au _usahihi kamili_. Utekelezaji wa kitendaji cha mkataba ni "sahihi kwa kiasi" ikiwa sharti la awali ni kweli kabla ya kitendaji kutekelezwa, na ikiwa utekelezaji utakoma, sharti la baadaye pia ni kweli. Uthibitisho wa usahihi kamili unapatikana ikiwa sharti la awali ni kweli kabla ya kitendaji kutekelezwa, utekelezaji umehakikishwa kukoma na unapofanya hivyo, sharti la baadaye linakuwa kweli.

Kupata uthibitisho wa usahihi kamili ni vigumu kwa kuwa baadhi ya utekelezaji unaweza kuchelewa kabla ya kukoma, au usikome kabisa. Hata hivyo, swali la kama utekelezaji unakoma linaweza kujadiliwa kwa kuwa utaratibu wa gesi wa Ethereum unazuia mizunguko isiyo na mwisho ya programu (utekelezaji unakoma kwa mafanikio au unaisha kutokana na hitilafu ya 'kuishiwa gesi').

Vipimo vya mkataba mahiri vilivyoundwa kwa kutumia mantiki ya Hoare vitakuwa na masharti ya awali, masharti ya baadaye, na sifa zisizobadilika zilizofafanuliwa kwa utekelezaji wa vitendaji na mizunguko katika mkataba. Masharti ya awali mara nyingi hujumuisha uwezekano wa maingizo yenye makosa kwenye kitendaji, huku masharti ya baadaye yakielezea majibu yanayotarajiwa kwa maingizo kama hayo (k.m., kurusha ubaguzi maalum). Kwa njia hii sifa za mtindo wa Hoare zinafaa kwa kuhakikisha usahihi wa utekelezaji wa mkataba.

Mifumo mingi ya uthibitishaji rasmi hutumia vipimo vya mtindo wa Hoare kwa kuthibitisha usahihi wa kisemantiki wa vitendaji. Inawezekana pia kuongeza sifa za mtindo wa Hoare (kama madai) moja kwa moja kwenye msimbo wa mkataba kwa kutumia taarifa za `require` na `assert` katika Solidity.

Taarifa za `require` zinaeleza sharti la awali au sifa isiyobadilika na mara nyingi hutumiwa kuthibitisha maingizo ya mtumiaji, huku `assert` ikinasa sharti la baadaye linalohitajika kwa usalama. Kwa mfano, udhibiti sahihi wa ufikiaji kwa vitendaji (mfano wa sifa ya usalama) unaweza kufikiwa kwa kutumia `require` kama ukaguzi wa sharti la awali kwenye utambulisho wa akaunti inayopiga simu. Vile vile, sifa isiyobadilika kwenye thamani zinazoruhusiwa za vigezo vya hali katika mkataba (k.m., jumla ya idadi ya tokeni zinazosambazwa) inaweza kulindwa dhidi ya ukiukaji kwa kutumia `assert` kuthibitisha hali ya mkataba baada ya utekelezaji wa kitendaji.

### Sifa za kiwango cha ufuatiliaji {#trace-level-properties}

Vipimo vinavyotegemea ufuatiliaji vinaelezea shughuli zinazobadilisha mkataba kati ya hali tofauti na uhusiano kati ya shughuli hizi. Kama ilivyoelezwa hapo awali, ufuatiliaji ni mfuatano wa shughuli zinazobadilisha hali ya mkataba kwa njia fulani.

Mbinu hii inategemea muundo wa mikataba mahiri kama mifumo ya mabadiliko ya hali yenye baadhi ya hali zilizobainishwa awali (zinazoelezwa na vigezo vya hali) pamoja na seti ya mabadiliko yaliyobainishwa awali (yanayoelezwa na vitendaji vya mkataba). Zaidi ya hayo, [grafu ya mtiririko wa udhibiti](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), ambayo ni uwakilishi wa picha wa mtiririko wa utekelezaji wa programu, mara nyingi hutumiwa kuelezea semantiki za uendeshaji za mkataba. Hapa, kila ufuatiliaji unawakilishwa kama njia kwenye grafu ya mtiririko wa udhibiti.

Kimsingi, vipimo vya kiwango cha ufuatiliaji hutumiwa kufikiri kuhusu mifumo ya utekelezaji wa ndani katika mikataba mahiri. Kwa kuunda vipimo vya kiwango cha ufuatiliaji, tunathibitisha njia zinazokubalika za utekelezaji (yaani, mabadiliko ya hali) kwa mkataba mahiri. Kwa kutumia mbinu, kama vile utekelezaji wa kiishara, tunaweza kuthibitisha rasmi kwamba utekelezaji haufuati kamwe njia ambayo haijafafanuliwa katika muundo rasmi.

Hebu tutumie mfano wa mkataba wa [DAO](/dao/) ambao una baadhi ya vitendaji vinavyofikiwa na umma kuelezea sifa za kiwango cha ufuatiliaji. Hapa, tunachukulia mkataba wa DAO unaruhusu watumiaji kufanya shughuli zifuatazo:

- Kuweka fedha

- Kupiga kura kwenye pendekezo baada ya kuweka fedha

- Kudai kurejeshewa fedha ikiwa hawatapiga kura kwenye pendekezo

Mifano ya sifa za kiwango cha ufuatiliaji inaweza kuwa _"watumiaji ambao hawaweki fedha hawawezi kupiga kura kwenye pendekezo"_ au _"watumiaji ambao hawapigi kura kwenye pendekezo wanapaswa kuwa na uwezo wa kudai kurejeshewa fedha kila wakati"_. Sifa zote mbili zinathibitisha mfuatano unaopendelewa wa utekelezaji (kupiga kura hakuwezi kutokea _kabla_ ya kuweka fedha na kudai kurejeshewa fedha hakuwezi kutokea _baada_ ya kupiga kura kwenye pendekezo).

## Mbinu za uthibitishaji rasmi wa mikataba mahiri {#formal-verification-techniques}

### Ukaguzi wa muundo {#model-checking}

Ukaguzi wa muundo ni mbinu ya uthibitishaji rasmi ambapo algoriti hukagua muundo rasmi wa mkataba mahiri dhidi ya vipimo vyake. Katika ukaguzi wa muundo mikataba mahiri mara nyingi inawakilishwa kama mifumo ya mabadiliko ya hali, huku sifa kwenye hali zinazoruhusiwa za mkataba zikifafanuliwa kwa kutumia mantiki ya muda.

Ukaguzi wa muundo unahitaji kuunda uwakilishi dhahania wa kihisabati wa mfumo (yaani, mkataba) na kueleza sifa za mfumo huu kwa kutumia fomula zilizojikita katika [mantiki ya mapendekezo](https://www.baeldung.com/cs/propositional-logic). Hii inarahisisha kazi ya algoriti ya ukaguzi wa muundo, yaani kuthibitisha kwamba muundo wa kihisabati unakidhi fomula fulani ya kimantiki.

Ukaguzi wa muundo katika uthibitishaji rasmi kimsingi hutumiwa kutathmini sifa za muda zinazoelezea tabia ya mkataba kwa muda. Sifa za muda kwa mikataba mahiri zinajumuisha _usalama_ na _uhai_, ambazo tulizielezea hapo awali.

Kwa mfano, sifa ya usalama inayohusiana na udhibiti wa ufikiaji (k.m., _Mmiliki wa mkataba pekee ndiye anayeweza kupiga simu `selfdestruct`_) inaweza kuandikwa katika mantiki rasmi. Baadaye, algoriti ya ukaguzi wa muundo inaweza kuthibitisha ikiwa mkataba unakidhi kipimo hiki rasmi.

Ukaguzi wa muundo hutumia uchunguzi wa nafasi ya hali, ambao unahusisha kuunda hali zote zinazowezekana za mkataba mahiri na kujaribu kupata hali zinazofikika ambazo husababisha ukiukaji wa sifa. Hata hivyo, hii inaweza kusababisha idadi isiyo na mwisho ya hali (inayojulikana kama "tatizo la mlipuko wa hali"), kwa hivyo wakaguzi wa muundo hutegemea mbinu za ufupisho ili kufanya uchanganuzi mzuri wa mikataba mahiri uwezekane.

### Uthibitishaji wa nadharia {#theorem-proving}

Uthibitishaji wa nadharia ni mbinu ya kufikiri kihisabati kuhusu usahihi wa programu, ikiwa ni pamoja na mikataba mahiri. Inahusisha kubadilisha muundo wa mfumo wa mkataba na vipimo vyake kuwa fomula za kihisabati (taarifa za kimantiki).

Lengo la uthibitishaji wa nadharia ni kuthibitisha usawa wa kimantiki kati ya taarifa hizi. "Usawa wa kimantiki" (pia unaitwa "maana mbili za kimantiki") ni aina ya uhusiano kati ya taarifa mbili kiasi kwamba taarifa ya kwanza ni kweli _ikiwa na ikiwa tu_ taarifa ya pili ni kweli.

Uhusiano unaohitajika (usawa wa kimantiki) kati ya taarifa kuhusu muundo wa mkataba na sifa yake unaundwa kama taarifa inayoweza kuthibitishwa (inayoitwa nadharia). Kwa kutumia mfumo rasmi wa makisio, mthibitishaji wa nadharia wa kiotomatiki anaweza kuthibitisha uhalali wa nadharia. Kwa maneno mengine, mthibitishaji wa nadharia anaweza kuthibitisha kwa uhakika kwamba muundo wa mkataba mahiri unalingana kikamilifu na vipimo vyake.

Ingawa ukaguzi wa muundo huunda mikataba kama mifumo ya mabadiliko yenye hali zenye kikomo, uthibitishaji wa nadharia unaweza kushughulikia uchanganuzi wa mifumo ya hali isiyo na mwisho. Hata hivyo, hii inamaanisha mthibitishaji wa nadharia wa kiotomatiki hawezi kujua kila wakati ikiwa tatizo la kimantiki "linaweza kuamuliwa" au la.

Kutokana na hili, usaidizi wa binadamu mara nyingi unahitajika ili kumuongoza mthibitishaji wa nadharia katika kupata uthibitisho wa usahihi. Matumizi ya juhudi za binadamu katika uthibitishaji wa nadharia yanaifanya iwe ghali zaidi kutumia kuliko ukaguzi wa muundo, ambao ni wa kiotomatiki kikamilifu.

### Utekelezaji wa kiishara {#symbolic-execution}

Utekelezaji wa kiishara ni mbinu ya kuchanganua mkataba mahiri kwa kutekeleza vitendaji kwa kutumia _thamani za kiishara_ (k.m., `x > 5`) badala ya _thamani halisi_ (k.m., `x == 5`). Kama mbinu ya uthibitishaji rasmi, utekelezaji wa kiishara hutumiwa kufikiri rasmi kuhusu sifa za kiwango cha ufuatiliaji katika msimbo wa mkataba.

Utekelezaji wa kiishara unawakilisha ufuatiliaji wa utekelezaji kama fomula ya kihisabati juu ya thamani za ingizo za kiishara, ambazo vinginevyo huitwa _kiarifu cha njia_. [Mtatuaji wa SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) hutumiwa kuangalia ikiwa kiarifu cha njia "kinaridhisha" (yaani, kuna thamani inayoweza kukidhi fomula). Ikiwa njia iliyo hatarini inaridhisha, mtatuaji wa SMT atazalisha thamani halisi ambayo huchochea kuelekeza utekelezaji kwenye njia hiyo.

Tuseme kitendaji cha mkataba mahiri kinachukua kama ingizo thamani ya `uint` (`x`) na kurejesha nyuma wakati `x` ni kubwa kuliko `5` na pia chini ya `10`. Kupata thamani ya `x` ambayo inachochea hitilafu kwa kutumia utaratibu wa kawaida wa majaribio kungehitaji kupitia makumi ya kesi za majaribio (au zaidi) bila uhakika wa kupata ingizo linalochochea hitilafu.

Kinyume chake, zana ya utekelezaji wa kiishara ingetekeleza kitendaji kwa thamani ya kiishara: `X > 5 ∧ X < 10` (yaani, `x` ni kubwa kuliko 5 NA `x` ni chini ya 10). Kiarifu cha njia kinachohusiana `x = X > 5 ∧ X < 10` kingepewa mtatuaji wa SMT ili kutatua. Ikiwa thamani fulani inakidhi fomula `x = X > 5 ∧ X < 10`, mtatuaji wa SMT ataikokotoa—kwa mfano, mtatuaji anaweza kutoa `7` kama thamani ya `x`.

Kwa sababu utekelezaji wa kiishara unategemea maingizo kwenye programu, na seti ya maingizo ya kuchunguza hali zote zinazofikika inaweza kuwa isiyo na mwisho, bado ni aina ya majaribio. Hata hivyo, kama inavyoonyeshwa katika mfano, utekelezaji wa kiishara ni mzuri zaidi kuliko majaribio ya kawaida kwa kupata maingizo ambayo yanachochea ukiukaji wa sifa.

Zaidi ya hayo, utekelezaji wa kiishara hutoa chanya za uongo chache kuliko mbinu zingine zinazotegemea sifa (k.m., fuzzing) ambazo huzalisha maingizo kwa kitendaji bila mpangilio. Ikiwa hali ya hitilafu inachochewa wakati wa utekelezaji wa kiishara, basi inawezekana kuzalisha thamani halisi ambayo inachochea hitilafu na kuzalisha tena suala hilo.

Utekelezaji wa kiishara unaweza pia kutoa kiwango fulani cha uthibitisho wa kihisabati wa usahihi. Fikiria mfano ufuatao wa kitendaji cha mkataba chenye ulinzi wa mzidio:

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Ufuatiliaji wa utekelezaji unaosababisha mzidio wa nambari kamili ungehitaji kukidhi fomula: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Fomula kama hiyo haiwezekani kutatuliwa, kwa hivyo inatumika kama uthibitisho wa kihisabati kwamba kitendaji `safe_add` hakipati mzidio kamwe.

### Kwa nini utumie uthibitishaji rasmi kwa mikataba mahiri? {#benefits-of-formal-verification}

#### Uhitaji wa kutegemewa {#need-for-reliability}

Uthibitishaji rasmi hutumiwa kutathmini usahihi wa mifumo muhimu ya usalama ambayo kushindwa kwake kunaweza kuwa na matokeo mabaya, kama vile kifo, majeraha, au uharibifu wa kifedha. Mikataba mahiri ni programu za thamani ya juu zinazodhibiti kiasi kikubwa cha thamani, na makosa rahisi katika muundo yanaweza kusababisha [hasara isiyoweza kurejeshwa kwa watumiaji](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Hata hivyo, kuthibitisha rasmi mkataba kabla ya usambazaji kunaweza kuongeza hakikisho kwamba utafanya kazi kama inavyotarajiwa mara tu utakapokuwa unafanya kazi kwenye mnyororo wa vitalu.

Kutegemewa ni sifa inayohitajika sana katika mkataba mahiri wowote, hasa kwa sababu msimbo uliosambazwa katika Mashine Pepe ya [Ethereum](/) (EVM) kwa kawaida ni isiyobadilika. Kwa kuwa uboreshaji baada ya uzinduzi haupatikani kwa urahisi, hitaji la kuhakikisha kutegemewa kwa mikataba hufanya uthibitishaji rasmi kuwa muhimu. Uthibitishaji rasmi unaweza kugundua masuala magumu, kama vile upungufu na mzidio wa nambari kamili, kuingia tena, na uboreshaji duni wa gesi, ambayo yanaweza kuwapita wakaguzi na wajaribu.

#### Kuthibitisha usahihi wa kiutendaji {#prove-functional-correctness}

Majaribio ya programu ndiyo mbinu ya kawaida zaidi ya kuthibitisha kwamba mkataba mahiri unakidhi baadhi ya mahitaji. Hii inahusisha kutekeleza mkataba na sampuli ya data inayotarajiwa kushughulikia na kuchanganua tabia yake. Ikiwa mkataba unarejesha matokeo yanayotarajiwa kwa data ya sampuli, basi wasanidi programu wana uthibitisho wa lengo wa usahihi wake.

Hata hivyo, mbinu hii haiwezi kuthibitisha utekelezaji sahihi kwa thamani za ingizo ambazo si sehemu ya sampuli. Kwa hivyo, kujaribu mkataba kunaweza kusaidia kugundua hitilafu (yaani, ikiwa baadhi ya njia za msimbo zinashindwa kurejesha matokeo yanayohitajika wakati wa utekelezaji), lakini **haiwezi kuthibitisha kwa uhakika kutokuwepo kwa hitilafu**.

Kinyume chake, uthibitishaji rasmi unaweza kuthibitisha rasmi kwamba mkataba mahiri unakidhi mahitaji kwa anuwai isiyo na mwisho ya utekelezaji _bila_ kuendesha mkataba kabisa. Hii inahitaji kuunda kipimo rasmi ambacho kinaelezea kwa usahihi tabia sahihi za mkataba na kuunda muundo rasmi (wa kihisabati) wa mfumo wa mkataba. Kisha tunaweza kufuata utaratibu rasmi wa uthibitisho ili kuangalia uthabiti kati ya muundo wa mkataba na vipimo vyake.

Kwa uthibitishaji rasmi, swali la kuthibitisha ikiwa mantiki ya biashara ya mkataba inakidhi mahitaji ni pendekezo la kihisabati ambalo linaweza kuthibitishwa au kukanushwa. Kwa kuthibitisha rasmi pendekezo, tunaweza kuthibitisha idadi isiyo na mwisho ya kesi za majaribio kwa idadi yenye kikomo ya hatua. Kwa njia hii uthibitishaji rasmi una matarajio bora ya kuthibitisha mkataba ni sahihi kiutendaji kuhusiana na kipimo.

#### Malengo bora ya uthibitishaji {#ideal-verification-targets}

Lengo la uthibitishaji linaelezea mfumo utakaothibitishwa rasmi. Uthibitishaji rasmi hutumiwa vyema katika "mifumo iliyopachikwa" (vipande vidogo, rahisi vya programu ambavyo huunda sehemu ya mfumo mkubwa zaidi). Pia ni bora kwa vikoa maalum ambavyo vina sheria chache, kwani hii inafanya iwe rahisi kurekebisha zana za kuthibitisha sifa mahususi za kikoa.

Mikataba mahiri—angalau, kwa kiasi fulani—inakidhi mahitaji yote mawili. Kwa mfano, udogo wa mikataba ya Ethereum unaifanya iweze kufanyiwa uthibitishaji rasmi. Vile vile, EVM inafuata sheria rahisi, ambayo inafanya kubainisha na kuthibitisha sifa za kisemantiki kwa programu zinazoendeshwa katika EVM kuwa rahisi.

### Mzunguko wa haraka wa maendeleo {#faster-development-cycle}

Mbinu za uthibitishaji rasmi, kama vile ukaguzi wa muundo na utekelezaji wa kiishara, kwa ujumla ni bora zaidi kuliko uchanganuzi wa kawaida wa msimbo wa mkataba mahiri (unaofanywa wakati wa majaribio au ukaguzi). Hii ni kwa sababu uthibitishaji rasmi unategemea thamani za kiishara ili kujaribu madai ("vipi ikiwa mtumiaji atajaribu kutoa Etha _n_?") tofauti na majaribio ambayo hutumia thamani halisi ("vipi ikiwa mtumiaji atajaribu kutoa Etha 5?").

Vigezo vya ingizo vya kiishara vinaweza kufunika madarasa mengi ya thamani halisi, kwa hivyo mbinu za uthibitishaji rasmi zinaahidi ufunikaji zaidi wa msimbo katika muda mfupi. Inapotumiwa kwa ufanisi, uthibitishaji rasmi unaweza kuharakisha mzunguko wa maendeleo kwa wasanidi programu.

Uthibitishaji rasmi pia unaboresha mchakato wa kuunda programu tumizi zilizogatuliwa (dapps) kwa kupunguza makosa ya gharama kubwa ya muundo. Kuboresha mikataba (inapowezekana) ili kurekebisha udhaifu kunahitaji kuandika upya kwa kina kwa misingi ya msimbo na juhudi zaidi zinazotumiwa kwenye maendeleo. Uthibitishaji rasmi unaweza kugundua makosa mengi katika utekelezaji wa mkataba ambayo yanaweza kuwapita wajaribu na wakaguzi na hutoa fursa ya kutosha ya kurekebisha masuala hayo kabla ya usambazaji wa mkataba.

## Hasara za uthibitishaji rasmi {#drawbacks-of-formal-verification}

### Gharama ya kazi ya mikono {#cost-of-manual-labor}

Uthibitishaji rasmi, hasa uthibitishaji wa nusu-kiotomatiki ambapo binadamu humuongoza mthibitishaji kupata uthibitisho wa usahihi, unahitaji kazi kubwa ya mikono. Zaidi ya hayo, kuunda vipimo rasmi ni shughuli ngumu inayohitaji kiwango cha juu cha ujuzi.

Mambo haya (juhudi na ujuzi) hufanya uthibitishaji rasmi kuwa mgumu zaidi na wa gharama kubwa ikilinganishwa na mbinu za kawaida za kutathmini usahihi katika mikataba, kama vile majaribio na ukaguzi. Hata hivyo, kulipa gharama kwa ukaguzi kamili wa uthibitishaji ni jambo la vitendo, kutokana na gharama ya makosa katika utekelezaji wa mkataba mahiri.

### Hasi za uongo {#false-negatives}

Uthibitishaji rasmi unaweza tu kuangalia ikiwa utekelezaji wa mkataba mahiri unalingana na vipimo rasmi. Kwa hivyo, ni muhimu kuhakikisha kuwa vipimo vinaelezea vizuri tabia zinazotarajiwa za mkataba mahiri.

Ikiwa vipimo vimeandikwa vibaya, ukiukaji wa sifa—ambao unaonyesha utekelezaji ulio hatarini—hauwezi kugunduliwa na ukaguzi wa uthibitishaji rasmi. Katika kesi hii, msanidi programu anaweza kudhani kimakosa kwamba mkataba hauna hitilafu.

### Masuala ya utendaji {#performance-issues}

Uthibitishaji rasmi unakumbana na masuala kadhaa ya utendaji. Kwa mfano, matatizo ya mlipuko wa hali na njia yanayokutana wakati wa ukaguzi wa muundo na ukaguzi wa kiishara, mtawalia, yanaweza kuathiri taratibu za uthibitishaji. Pia, zana za uthibitishaji rasmi mara nyingi hutumia watatuaji wa SMT na watatuaji wengine wa vikwazo katika safu yao ya msingi, na watatuaji hawa wanategemea taratibu kubwa za kimahesabu.

Pia, haiwezekani kila wakati kwa wathibitishaji wa programu kubaini ikiwa sifa (inayoelezwa kama fomula ya kimantiki) inaweza kuridhishwa au la ("[tatizo la uamuzi](https://en.wikipedia.org/wiki/Decision_problem)") kwa sababu programu inaweza isikome kamwe. Kwa hivyo, inaweza kuwa haiwezekani kuthibitisha baadhi ya sifa kwa mkataba hata kama umebainishwa vizuri.

## Zana za uthibitishaji rasmi kwa mikataba mahiri ya Ethereum {#formal-verification-tools}

### Lugha za vipimo kwa kuunda vipimo rasmi {#specification-languages}

**Act**: _*Act inaruhusu ubainishaji wa masasisho ya hifadhi, masharti ya awali/baadaye na sifa zisizobadilika za mkataba. Kundi lake la zana pia lina misingi ya uthibitisho inayoweza kuthibitisha sifa nyingi kupitia Coq, watatuaji wa SMT, au hevm.*_

- [GitHub](https://github.com/ethereum/act)
- [Nyaraka](https://github.com/argotorg/act)

**Scribble** - _*Scribble inabadilisha maelezo ya msimbo katika lugha ya vipimo ya Scribble kuwa madai halisi ambayo hukagua vipimo.*_

- [Nyaraka](https://docs.scribble.codes/)

**Dafny** - _*Dafny ni lugha ya upangaji programu iliyo tayari kwa uthibitishaji ambayo inategemea maelezo ya kiwango cha juu kufikiri kuhusu na kuthibitisha usahihi wa msimbo.*_

- [GitHub](https://github.com/dafny-lang/dafny)

### Wathibitishaji wa programu kwa kuangalia usahihi {#program-verifiers}

**Certora Prover** - _Certora Prover ni zana ya uthibitishaji rasmi ya kiotomatiki ya kuangalia usahihi wa msimbo katika mikataba mahiri. Vipimo vimeandikwa katika CVL (Lugha ya Uthibitishaji ya Certora), huku ukiukaji wa sifa ukigunduliwa kwa kutumia mchanganyiko wa uchanganuzi tuli na utatuzi wa vikwazo._

- [Tovuti](https://www.certora.com/)
- [Nyaraka](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - _*SMTChecker ya Solidity ni mkaguzi wa muundo uliojengewa ndani unaotegemea SMT (Nadharia za Modulo za Kuridhisha) na utatuzi wa Horn. Inathibitisha ikiwa msimbo wa chanzo wa mkataba unalingana na vipimo wakati wa ujumuishaji na hukagua kituli ukiukaji wa sifa za usalama.*_

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - _*solc-verify ni toleo lililopanuliwa la kikusanyaji cha Solidity ambalo linaweza kufanya uthibitishaji rasmi wa kiotomatiki kwenye msimbo wa Solidity kwa kutumia maelezo na uthibitishaji wa programu wa kawaida.*_

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - _*KEVM ni semantiki rasmi ya Mashine Pepe ya Ethereum (EVM) iliyoandikwa katika mfumo wa K. KEVM inatekelezeka na inaweza kuthibitisha madai fulani yanayohusiana na sifa kwa kutumia mantiki ya ufikiaji.*_

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Nyaraka](https://jellopaper.org/)

### Mifumo ya kimantiki kwa uthibitishaji wa nadharia {#theorem-provers}

**Isabelle** - _Isabelle/HOL ni msaidizi wa uthibitisho anayeruhusu fomula za kihisabati kuelezwa katika lugha rasmi na hutoa zana za kuthibitisha fomula hizo. Utumizi mkuu ni urasimishaji wa uthibitisho wa kihisabati na hasa uthibitishaji rasmi, ambao unajumuisha kuthibitisha usahihi wa maunzi au programu za kompyuta na kuthibitisha sifa za lugha na itifaki za kompyuta._

- [GitHub](https://github.com/isabelle-prover)
- [Nyaraka](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq ni mthibitishaji wa nadharia mwingiliano anayekuruhusu kufafanua programu kwa kutumia nadharia na kuzalisha kwa mwingiliano uthibitisho wa usahihi uliokaguliwa na mashine._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Nyaraka](https://rocq-prover.org/docs)

### Zana zinazotegemea utekelezaji wa kiishara kwa kugundua mifumo iliyo hatarini katika mikataba mahiri {#symbolic-execution-tools}

**Manticore** - _*Zana ya kuchanganua msimbo wa baiti wa EVM inayotegemea utekelezaji wa kiishara*._

- [GitHub](https://github.com/trailofbits/manticore)
- [Nyaraka](https://github.com/trailofbits/manticore/wiki)

**hevm** - _*hevm ni injini ya utekelezaji wa kiishara na mkaguzi wa usawa kwa msimbo wa baiti wa EVM.*_

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Zana ya utekelezaji wa kiishara kwa kugundua udhaifu katika mikataba mahiri ya Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Nyaraka](https://mythril-classic.readthedocs.io/en/develop/)

## Usomaji zaidi {#further-reading}

- [Jinsi Uthibitishaji Rasmi wa Mikataba Mahiri Unavyofanya Kazi](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Muhtasari wa Miradi ya Uthibitishaji Rasmi katika Mfumo wa Ikolojia wa Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Uthibitishaji Rasmi wa Mwanzo hadi Mwisho wa Mkataba Mahiri wa Amana wa Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Kuthibitisha Rasmi Mkataba Mahiri Maarufu Zaidi Ulimwenguni](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker na Uthibitishaji Rasmi](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)