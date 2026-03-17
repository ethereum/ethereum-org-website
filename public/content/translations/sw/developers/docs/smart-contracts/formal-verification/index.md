---
title: Uthibitishaji rasmi wa mikataba-erevu
description: Muhtasari wa uthibitishaji rasmi wa mikataba-erevu ya Ethereum
lang: sw
---

[Mikataba-erevu](/developers/docs/smart-contracts/) inafanya iwezekane kuunda programu zilizogatuliwa, zisizo za kuaminika, na imara ambazo zinaleta visa-matumizi vipya na kufungua thamani kwa watumiaji. Kwa sababu mikataba mahiri hushughulikia kiasi kikubwa cha thamani, usalama ni jambo muhimu sana kwa wasanifu programu.

Uthibitishaji rasmi ni moja ya mbinu zinazopendekezwa za kuboresha [usalama wa mkataba-erevu](/developers/docs/smart-contracts/security/). Uthibitishaji rasmi, ambao unatumia [mbinu rasmi](https://www.brookings.edu/techstream/formal-methods-as-a-path-toward-better-cybersecurity/) za kubainisha, kubuni, na kuthibitisha programu, umetumika kwa miaka mingi kuhakikisha usahihi wa mifumo muhimu ya maunzi na programu.

Inapotekelezwa katika mikataba mahiri, uthibitishaji rasmi unaweza kuthibitisha kuwa mantiki ya biashara ya mkataba inakidhi vipimo vilivyobainishwa awali. Ikilinganishwa na mbinu nyingine za kutathmini usahihi wa msimbo wa mkataba, kama vile kupima, uthibitishaji rasmi hutoa uhakikisho mkubwa zaidi kwamba mkataba mahiri ni sahihi kiutendaji.

## Uthibitishaji rasmi ni nini? {#what-is-formal-verification}

Uthibitishaji rasmi unarejelea mchakato wa kutathmini usahihi wa mfumo kuhusiana na vipimo rasmi. Kwa maneno rahisi, uthibitishaji rasmi huturuhusu kuangalia ikiwa tabia ya mfumo inakidhi mahitaji fulani (yaani, inafanya tunachotaka).

Tabia zinazotarajiwa za mfumo (mkataba mahiri katika kesi hii) hufafanuliwa kwa kutumia uundaji rasmi, huku lugha za ubainishi huwezesha uundaji wa sifa rasmi. Mbinu rasmi za uthibitishaji zinaweza kuthibitisha kwamba utekelezaji wa mkataba unatii vipimo vyake na kupata uthibitisho wa kihisabati wa usahihi wa mkataba wa awali. Wakati mkataba unakidhi maelezo yake, unafafanuliwa kuwa sahihi kiutendaji, sahihi kwa muundo, au "sahihi kwa ujenzi.

### Mfumo rasmi ni nini? {#what-is-a-formal-model}

Katika sayansi ya kompyuta, [mfumo rasmi](https://en.wikipedia.org/wiki/Model_of_computation) ni maelezo ya kihisabati ya mchakato wa kikokotozi. Vipindi vinatolewa katika vitendea kazi vya hisabati (milinganyo), huku kielelezo kikieleza jinsi matokeo ya utendaji kazi yanavyokokotolewa kutokana na ingizo.

Miundo rasmi hutoa kiwango cha ufupisho ambacho uchanganuzi wa tabia ya programu unaweza kutathminiwa. Uwepo wa mifumo rasmi unaruhusu uundaji wa _ainisho rasmi_, ambayo inaelezea sifa zinazohitajika za mfumo husika.

Mbinu tofauti hutumika kuiga mikataba-erevu kwa ajili ya uthibitishaji rasmi. Kwa mfano, baadhi ya mifumo hutumiwa kujadili kuhusu tabia ya kiwango cha juu ya mkataba-erevu. Mbinu hizi za mfano hutumia mwonekano wa kisanduku cheusi kwa mikataba mahiri, na kuziona kama mifumo inayokubali ingizo na kutekeleza hesabu kulingana na ingizo hizo.

Miundo ya kiwango cha juu huzingatia uhusiano kati ya mikataba mahiri na mawakala wa nje, kama vile akaunti zinazomilikiwa za nje (EOAs), akaunti za mikataba na mazingira ya kiambajengo. Miundo kama hii ni muhimu kwa kufafanua sifa zinazobainisha jinsi mkataba unapaswa kutenda kulingana na mwingiliano fulani wa watumiaji.

Kinyume chake, mifumo mingine rasmi hulenga tabia ya kiwango cha chini cha mkataba-erevu. Ingawa miundo ya kiwango cha juu inaweza kusaidia katika hoja kuhusu utendaji kazi wa mkataba, inaweza kushindwa kupata maelezo kuhusu utendakazi wa ndani wa utekelezaji. Mifumo ya kiwango cha chini hutumia mtazamo wa 'sanduku-jeupe' kwa uchanganuzi wa programu na hutegemea uwakilishi wa kiwango cha chini wa programu za mkataba-erevu, kama vile mfuatilio wa programu na [grafu za mtiririko wa udhibiti](https://en.wikipedia.org/wiki/Control-flow_graph), ili kutoa hoja kuhusu sifa zinazohusiana na utekelezaji wa mkataba.

Mifumo ya kiwango cha chini inachukuliwa kuwa bora kwani inawakilisha utekelezaji halisi wa mkataba-erevu katika mazingira ya utekelezaji ya Ethereum (yaani, [EVM](/developers/docs/evm/)). Mbinu za uundaji wa kiwango cha chini ni muhimu sana katika kuanzisha sifa muhimu za usalama katika mikataba mahiri na kugundua udhaifu unaowezekana.

### Ainisho rasmi ni nini? {#what-is-a-formal-specification}

Ainisho ni hitaji la kiufundi tu ambalo mfumo fulani lazima utimize. Katika upangaji, vipimo vinawakilisha mawazo ya jumla kuhusu utekelezaji wa programu (yaani, kile ambacho programu inapaswa kufanya).

Katika muktadha wa mikataba-erevu, mainisho rasmi hurejelea _sifa_—maelezo rasmi ya mahitaji ambayo mkataba lazima utimize. Sifa kama hizo zinafafanuliwa kama "zisizobadilika" na zinawakilisha madai ya kimantiki kuhusu utekelezaji wa mkataba ambayo lazima yabaki kuwa kweli chini ya kila hali iwezekanayo, bila ubaguzi wowote.

Kwa hivyo, tunaweza kufikiria ubainifu rasmi kama mkusanyo wa taarifa zilizoandikwa katika lugha rasmi inayoelezea utekelezaji uliokusudiwa wa mkataba mahiri. Maelezo yanahusu mali ya mkataba na kufafanua jinsi mkataba unapaswa kutenda katika hali tofauti. Madhumuni ya uthibitishaji rasmi ni kubaini ikiwa mkataba mahiri unamiliki sifa hizi (zisizobadilika) na kwamba sifa hizi hazijakiukwa wakati wa utekelezaji.

Mainisho rasmi ni muhimu katika kuunda utekelezaji salama wa mikataba-erevu. Mikataba ambayo inashindwa kubadilika au mali zao kukiukwa wakati wa utekelezaji huathiriwa na udhaifu unaoweza kudhuru utendakazi au kusababisha matumizi mabaya.

## Aina za mainisho rasmi kwa mikataba-erevu {#formal-specifications-for-smart-contracts}

Mainisho rasmi huwezesha utoaji hoja za kihisabati kuhusu usahihi wa utekelezaji wa programu. Kama ilivyo kwa miundo rasmi, vipimo rasmi vinaweza kunasa sifa za kiwango cha juu au tabia ya kiwango cha chini cha utekelezaji wa mkataba.

Mainisho rasmi hutokana na matumizi ya vipengele vya [mantiki ya programu](https://en.wikipedia.org/wiki/Logic_programming), ambavyo huruhusu utoaji hoja rasmi kuhusu sifa za programu. Mantiki ya programu ina sheria rasmi zinazoeleza (katika lugha ya hisabati) tabia inayotarajiwa ya programu. Mantiki mbalimbali za programu hutumika katika kuunda mainisho rasmi, ikiwa ni pamoja na [mantiki ya ufikivu](https://en.wikipedia.org/wiki/Reachability_problem), [mantiki ya muda](https://en.wikipedia.org/wiki/Temporal_logic), na [mantiki ya Hoare](https://en.wikipedia.org/wiki/Hoare_logic).

Mainisho rasmi kwa mikataba-erevu yanaweza kuainishwa kwa upana kama mainisho ya **kiwango cha juu** au **kiwango cha chini**. Bila kujali aina ya vipimo ni vya aina gani, lazima ielezee vya kutosha na bila utata mali ya mfumo unaochambuliwa.

### Mainisho ya kiwango cha juu {#high-level-specifications}

Kama jina linavyopendekeza, vipimo vya kiwango cha juu (pia huitwa vielelezo vyenye mwelekeo wa modeli) hufafanua tabia ya kiwango cha juu cha programu. Mainisho ya kiwango cha juu huiga mkataba-erevu kama [mashine ya hali ya kikomo](https://en.wikipedia.org/wiki/Finite-state_machine) (FSM), ambayo inaweza kubadilika kati ya hali kwa kutekeleza operesheni, huku mantiki ya muda ikitumika kufafanua sifa rasmi za mfumo wa FSM.

[Mantiki za muda](https://en.wikipedia.org/wiki/Temporal_logic) ni "kanuni za kutoa hoja kuhusu mapendekezo yaliyohitimu kulingana na wakati (k.m., "Nina njaa _kila wakati_" au "_Hatimaye_ nitakuwa na njaa")." Inapotumika kwa uthibitishaji rasmi, mantiki ya muda hutumiwa kutaja madai kuhusu tabia sahihi ya mifumo iliyoigwa kama mashine za majimbo. Hasa, mantiki ya muda inaelezea hali za baadaye ambazo mkataba mahiri unaweza kuwa ndani na jinsi unavyobadilika kati ya majimbo.

Mainisho ya kiwango cha juu kwa ujumla hunasa sifa mbili muhimu za muda kwa mikataba-erevu: **usalama** na **uhai**. Sifa za usalama huwakilisha wazo kwamba "hakuna chochote kibaya kinachowahi kutokea" na kwa kawaida huonyesha kutofautiana. Sifa ya usalama inaweza kubainisha mahitaji ya jumla ya programu, kama vile uhuru kutoka kwa [mkwamo](https://www.techtarget.com/whatis/definition/deadlock), au kuelezea sifa maalum za kikoa kwa mikataba (k.m., visivyobadilika kwenye udhibiti wa ufikiaji wa vitendaji, thamani zinazokubalika za vigeu vya hali, au masharti ya uhamishaji wa tokeni).

Chukua kwa mfano hitaji hili la usalama ambalo linashughulikia masharti ya kutumia `transfer()` au `transferFrom()` katika mikataba ya tokeni ya ERC-20: _“Salio la mtumaji kamwe haliwi chini ya kiasi kilichoombwa cha tokeni za kutumwa.”_. Maelezo haya ya lugha asilia ya kipingamizi cha mkataba yanaweza kutafsiriwa katika ubainifu rasmi (wa hisabati), ambao unaweza kuangaliwa kwa umakini ili kubaini uhalali.

Sifa za maisha zinadai kwamba "jambo zuri hatimaye hufanyika" na linahusu uwezo wa mkataba kuendelea kupitia majimbo tofauti. Mfano wa mali hai ni "ukwasi", ambayo inarejelea uwezo wa mkataba wa kuhamisha salio zake kwa watumiaji kwa ombi. Ikiwa sifa hii itakiukwa, watumiaji hawatakuwa na uwezo wa kutoa rasilimali zilizohifadhiwa kwenye mkataba, kama ilivyotokea na [tukio la mkoba wa Parity](https://www.cnbc.com/2017/11/08/accidental-bug-may-have-frozen-280-worth-of-ether-on-parity-wallet.html).

### Mainisho ya kiwango cha chini {#low-level-specifications}

Vipimo vya kiwango cha juu huchukua kama kianzio kielelezo cha hali ya kikomo cha mkataba na kufafanua sifa zinazohitajika za muundo huu. Kinyume chake, vipimo vya kiwango cha chini (pia huitwa "vielelezo vinavyolenga mali") mara nyingi huiga programu (mikataba mahiri) kama mifumo inayojumuisha mkusanyiko wa utendakazi wa hisabati na kuelezea tabia sahihi ya mifumo hiyo.

Kwa maneno rahisi, mainisho ya kiwango cha chini huchanganua _mfuatilio wa programu_ na kujaribu kufafanua sifa za mkataba-erevu juu ya mfuatilio huu. Ufuatiliaji hurejelea mfuatano wa utendakazi ambao hubadilisha hali ya mkataba mahiri; kwa hivyo, vipimo vya kiwango cha chini husaidia kubainisha mahitaji ya utekelezaji wa ndani wa mkataba.

Vipimo rasmi vya kiwango cha chini vinaweza kutolewa kama sifa za mtindo wa Hoare au vibadala kwenye njia za utekelezaji.

### Sifa za mtindo wa Hoare {#hoare-style-properties}

[Mantiki ya Hoare](https://en.wikipedia.org/wiki/Hoare_logic) hutoa seti ya sheria rasmi za kutoa hoja kuhusu usahihi wa programu, ikiwa ni pamoja na mikataba-erevu. Sifa ya mtindo wa Hoare inawakilishwa na utatu wa Hoare `{P}c{Q}`, ambapo `c` ni programu na `P` na `Q` ni viarifu juu ya hali ya `c` (yaani, programu), vinavyoelezewa rasmi kama _masharti-awali_ na _masharti-baada_, mtawalia.

Sharti ni kihusishi kinachoeleza masharti yanayohitajika kwa ajili ya utekelezaji sahihi wa chaguo la kukokotoa; watumiaji wanaoingia kwenye mkataba lazima watimize mahitaji haya. Hali ya baada ni kihusishi kinachoelezea hali ambayo chaguo za kukokotoa huweka ikiwa imetekelezwa kwa usahihi; watumiaji wanaweza kutarajia hali hii kuwa kweli baada ya kupiga simu kwenye chaguo la kukokotoa. _Kisichobadilika_ katika mantiki ya Hoare ni kiarifu ambacho huhifadhiwa na utekelezaji wa kitendaji (yaani, hakibadiliki).

Mainisho ya mtindo wa Hoare yanaweza kuhakikisha ama _usahihi kiasi_ au _usahihi kamili_. Utekelezaji wa kazi ya mkataba ni "sahihi kiasi" ikiwa sharti ni la kweli kabla ya kazi kutekelezwa, na ikiwa utekelezaji utakatizwa, sharti la posta pia ni kweli. Uthibitisho wa usahihi kamili hupatikana ikiwa sharti la awali ni la kweli kabla ya chaguo la kukokotoa kutekelezwa, utekelezaji umehakikishiwa kusitishwa na ukifanya hivyo, sharti la baada litakuwa kweli.

Kupata uthibitisho wa usahihi kamili ni vigumu kwa kuwa baadhi ya utekelezaji unaweza kuchelewa kabla ya kusitishwa, au kamwe kusitisha kabisa. Hiyo ilisema, swali la ikiwa utekelezaji utakoma ni jambo lisilowezekana kwa kuwa utaratibu wa gharama ya muamala wa Ethereum huzuia minyororo isiyo na kikomo ya programu (utekelezaji hukatiza kwa mafanikio au kumalizika kwa sababu ya kosa la 'nje ya gharama ya muamala').

Vipimo vya mikataba mahiri vilivyoundwa kwa kutumia mantiki ya Hoare vitakuwa na masharti, masharti ya baadae na vibadala vilivyobainishwa kwa ajili ya utekelezaji wa majukumu na minyoro katika mkataba. Masharti ya awali mara nyingi hujumuisha uwezekano wa ingizo zenye makosa kwa chaguo za kukokotoa, pamoja na masharti ya baadae yanayoelezea jibu linalotarajiwa kwa ingizo kama hizo (k.m., kutoa ubaguzi maalum). Kwa njia hii sifa za mtindo wa Hoare zinafaa kwa kuhakikisha usahihi wa utekelezaji wa mkataba.

Miundo mingi ya uthibitishaji rasmi hutumia vipimo vya mtindo wa Hoare ili kuthibitisha usahihi wa kisemantiki wa vitendea kazi. Inawezekana pia kuongeza sifa za mtindo wa Hoare (kama madai) moja kwa moja kwenye msimbo wa mkataba kwa kutumia kauli za `require` na `assert` katika Solidity.

Kauli za `require` huelezea sharti-awali au kisichobadilika na mara nyingi hutumika kuhalalisha ingizo la mtumiaji, huku `assert` ikinasa sharti-baada linalohitajika kwa usalama. Kwa mfano, udhibiti sahihi wa ufikiaji kwa vitendaji (mfano wa sifa ya usalama) unaweza kupatikana kwa kutumia `require` kama ukaguzi wa sharti-awali juu ya utambulisho wa akaunti inayopiga simu. Vilevile, kisichobadilika kwenye thamani zinazoruhusiwa za vigeu vya hali katika mkataba (k.m., jumla ya idadi ya tokeni zinazosambazwa) kinaweza kulindwa dhidi ya ukiukaji kwa kutumia `assert` ili kuthibitisha hali ya mkataba baada ya utekelezaji wa kitendaji.

### Sifa za kiwango cha mfuatilio {#trace-level-properties}

Vipimo vinavyotokana na ufuatiliaji hufafanua miamala inayobadilisha mkataba kati ya mataifa tofauti na uhusiano kati ya shughuli hizi. Kama ilivyoelezwa hapo awali, athari ni mfuatano wa shughuli ambazo hubadilisha hali ya mkataba kwa njia fulani.

Mbinu hii inategemea muundo wa mikataba mahiri kama mifumo ya mpito ya serikali iliyo na baadhi ya majimbo yaliyobainishwa awali (yaliyofafanuliwa na vigeu vya hali) pamoja na seti ya mabadiliko yaliyobainishwa mapema (yanayofafanuliwa na utendakazi wa mkataba). Zaidi ya hayo, [grafu ya mtiririko wa udhibiti](https://www.geeksforgeeks.org/software-engineering-control-flow-graph-cfg/) (CFG), ambayo ni uwakilishi wa kielelezo wa mtiririko wa utekelezaji wa programu, mara nyingi hutumika kuelezea semantiki za uendeshaji wa mkataba. Hapa, kila mfuatilio unawakilishwa kama njia kwenye grafu ya mtiririko wa udhibiti.

Kimsingi, vipimo vya kiwango cha ufuatiliaji hutumiwa kwasababu kuhusu mifumo ya utekelezaji wa ndani katika mikataba mahiri. Kwa kuunda vipimo vya kiwango cha ufuatiliaji, tunasisitiza njia zinazokubalika za utekelezaji (yaani, mabadiliko ya hali) kwa mkataba mahiri. Kwa kutumia mbinu, kama vile utekelezaji wa kiishara, tunaweza kuthibitisha rasmi kwamba utekelezaji haufuati kamwe njia ambayo haijafafanuliwa katika muundo rasmi.

Hebu tutumie mfano wa mkataba wa [DAO](/dao/) ambao una baadhi ya vitendaji vinavyopatikana kwa umma ili kuelezea sifa za kiwango cha mfuatilio. Hapa, tunachukulia kwamba mkataba wa DAO unaruhusu watumiaji kutekeleza operesheni zifuatazo:

- Weka fedha

- Piga kura kwenye pendekezo baada ya kuweka fedha

- Dai marejesho kama hawapigi kura kwenye pendekezo

Mfano wa sifa za kiwango cha mfuatilio unaweza kuwa _"watumiaji ambao hawaweki fedha hawawezi kupiga kura kwenye pendekezo"_ au _"watumiaji ambao hawapigi kura kwenye pendekezo wanapaswa daima kuwa na uwezo wa kudai marejesho"_. Sifa zote mbili zinathibitisha mifuatano inayopendelewa ya utekelezaji (upigaji kura hauwezi kutokea _kabla_ ya kuweka fedha na kudai marejesho hakuwezi kutokea _baada_ ya kupiga kura kwenye pendekezo).

## Mbinu za uthibitishaji rasmi wa mikataba-erevu {#formal-verification-techniques}

### Uhakiki wa mfumo {#model-checking}

Kukagua muundo ni mbinu rasmi ya uthibitishaji ambapo algoriti hukagua muundo rasmi wa mkataba mahiri dhidi ya ubainifu wake. Katika modeli za kukagua mikataba mahiri mara nyingi huwakilishwa kama mifumo ya mipito ya serikali, ilhali sifa kwenye hali za mkataba zinazoruhusiwa hufafanuliwa kwa kutumia mantiki ya muda.

Uhakiki wa mfumo unahitaji kuunda uwakilishi dhahania wa kihisabati wa mfumo (yaani, mkataba) na kuelezea sifa za mfumo huu kwa kutumia fomula zinazotokana na [mantiki ya mapendekezo](https://www.baeldung.com/cs/propositional-logic). Hii hurahisisha kazi ya algoriti ya kukagua modeli, yaani kuthibitisha kwamba muundo wa hisabati unakidhi fomula fulani ya kimantiki.

Ukaguaji wa kielelezo katika uthibitishaji rasmi hutumiwa kimsingi kutathmini sifa za muda zinazoelezea tabia ya mkataba baada ya muda. Sifa za muda za mikataba-erevu ni pamoja na _usalama_ na _uhai_, ambazo tulizielezea awali.

Kwa mfano, sifa ya usalama inayohusiana na udhibiti wa ufikiaji (k.m., _Mmiliki wa mkataba pekee ndiye anayeweza kuita `selfdestruct`_) inaweza kuandikwa katika mantiki rasmi. Kwa mfano, usalama unaohusiana na udhibiti wa sifa (k. m., <em x-id="4">Mmiliki wa mkataba pekee ndiye anayeweza kupiga simu <code>selfdestruct</code></em>) inaweza kuandikwa kwa mantiki.

Kukagua muundo hutumia uchunguzi wa nafasi ya majimbo, unaojumuisha kuunda hali zote zinazowezekana za mkataba mzuri na kujaribu kupata hali zinazoweza kufikiwa ambazo husababisha ukiukaji wa mali. Hata hivyo, hii inaweza kusababisha idadi isiyo na kikomo ya majimbo (inayojulikana kama "tatizo la mlipuko wa serikali"), kwa hivyo wakaguzi wa miundo hutegemea mbinu za uondoaji ili kufanya uchanganuzi mzuri wa kandarasi mahiri iwezekanavyo.

### Uthibitishaji wa nadharia {#theorem-proving}

Uthibitishaji wa nadharia ni mbinu ya kisababu kihisabati kuhusu usahihi wa programu, ikijumuisha mikataba mahiri. Inahusisha kubadilisha muundo wa mfumo wa mkataba na vipimo vyake kuwa fomula za hisabati (kauli za mantiki).

Lengo la uthibitishaji wa nadharia ni kuthibitisha usawa wa kimantiki kati ya kauli hizi. “Usawa wa kimantiki” (pia huitwa “bi-implication ya kimantiki”) ni aina ya uhusiano kati ya kauli mbili ambapo kauli ya kwanza ni ya kweli _ikiwa na tu ikiwa_ kauli ya pili ni ya kweli.

Uhusiano unaohitajika (usawa wa kimantiki) kati ya taarifa kuhusu muundo wa mkataba na mali yake umeundwa kama taarifa inayoweza kuthibitishwa (inayoitwa nadharia). Kwa kutumia mfumo rasmi wa makisio, kithibitishi cha nadharia cha kiotomatiki kinaweza kuthibitisha uhalali wa nadharia hiyo. Kwa maneno mengine, mthibitishaji wa nadharia inaweza kuthibitisha kwa uthabiti muundo wa mkataba mahiri unalingana na vipimo vyake.

Wakati modeli za kukagua kandarasi kama mifumo ya mpito yenye hali zenye ukomo, uthibitisho wa nadharia unaweza kushughulikia uchanganuzi wa mifumo ya serikali isiyo na kikomo. Hata hivyo, hii inamaanisha kuwa mtaalamu wa nadharia ya kiotomatiki hawezi kujua kila wakati ikiwa tatizo la mantiki "linaweza kuamuliwa" au la.

Kwa hiyo, msaada wa kibinadamu mara nyingi unahitajika ili kumuongoza mthibitishaji wa nadharia katika kupata uthibitisho wa usahihi. Utumiaji wa juhudi za kibinadamu katika uthibitishaji wa nadharia hufanya iwe ghali zaidi kutumia kuliko ukaguzi wa mfano, ambao umejiendesha kikamilifu.

### Utekelezaji wa kiishara {#symbolic-execution}

Utekelezaji wa kiishara ni mbinu ya kuchanganua mkataba-erevu kwa kutekeleza vitendaji kwa kutumia _thamani za kiishara_ (k.m., `x > 5`) badala ya _thamani halisi_ (k.m., `x == 5`). Kama mbinu rasmi ya uthibitishaji, utekelezaji wa kiishara hutumiwa kusababu rasmi kuhusu kufuatilia sifa za kiwango katika msimbo wa mkataba.

Utekelezaji wa kiishara unawakilisha mfuatilio wa utekelezaji kama fomula ya kihisabati juu ya thamani za ingizo za kiishara, vinginevyo huitwa _kiarifu cha njia_. [Kitatuzi cha SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) hutumika kuangalia kama kiarifu cha njia "kinatosheleza" (yaani, kuna thamani inayoweza kutosheleza fomula). Iwapo njia iliyo katika mazingira magumu inatosheleza, kisuluhishi cha SMT kitatoa thamani madhubuti ambayo itachochea utekelezaji wa waendeshaji kuelekea njia hiyo.

Tuseme kitendaji cha mkataba-erevu kinachukua thamani ya `uint` (`x`) kama ingizo na hurejea nyuma wakati `x` ni kubwa kuliko `5` na pia ndogo kuliko `10`. Kupata thamani ya `x` inayosababisha hitilafu kwa kutumia utaratibu wa kawaida wa majaribio kungehitaji kupitia visa vingi vya majaribio (au zaidi) bila uhakikisho wa kupata ingizo linalosababisha hitilafu.

Kinyume chake, zana ya utekelezaji wa kiishara ingetekeleza kitendaji ikiwa na thamani ya kiishara: `X > 5 ∧ X < 10` (yaani, `x` ni kubwa kuliko 5 NA `x` ni ndogo kuliko 10). Kiarifu cha njia kinachohusiana `x = X > 5 ∧ X < 10` kingepelekwa kwa kitatuzi cha SMT ili kitatuliwe. Ikiwa thamani fulani itatosheleza fomula `x = X > 5 ∧ X < 10`, kitatuzi cha SMT kitaikokotoa—kwa mfano, kitatuzi kinaweza kutoa `7` kama thamani ya `x`.

Kwa sababu utekelezaji wa kiishara unategemea ingizo la programu, na seti ya ingizo ili kuchunguza hali zote zinazoweza kufikiwa kuna uwezekano usio na kikomo, bado ni aina ya majaribio. Hata hivyo, kama inavyoonyeshwa katika mfano, utekelezaji wa kiishara ni mzuri zaidi kuliko majaribio ya mara kwa mara ya kutafuta michango ambayo husababisha ukiukaji wa mali.

Zaidi ya hayo, utekelezaji wa kiishara hutoa chanya chache za uwongo kuliko mbinu zingine zinazotegemea mali (k.m., fuzzing) ambazo hutokeza maingizo kwa chaguo maalum kwa nasibu. Ikiwa hali ya kosa imeanzishwa wakati wa utekelezaji wa ishara, basi inawezekana kutoa thamani halisi ambayo inasababisha kosa na kuzalisha suala hilo tena.

Utekelezaji wa kiishara pia unaweza kutoa kiwango fulani cha uthibitisho wa kihisabati wa usahihi. Fikiria mfano ufuatao wa kitendaji cha mkataba chenye ulinzi wa 'overflow':

```
function safe_add(uint x, uint y) returns(uint z){

  z = x + y;
  require(z>=x);
  require(z>=y);

  return z;
}
```

Mfuatilio wa utekelezaji unaosababisha integer overflow utahitaji kutosheleza fomula: `z = x + y AND (z >= x) AND (z >= y) AND (z < x OR z < y)` Fomula kama hiyo haiwezekani kutatuliwa, kwa hivyo inatumika kama uthibitisho wa kihisabati kwamba kitendaji cha `safe_add` hakipati overflow kamwe.

### Kwa nini utumie uthibitishaji rasmi kwa mikataba-erevu? {#benefits-of-formal-verification}

#### Haja ya uaminifu {#need-for-reliability}

Uthibitishaji rasmi hutumiwa kutathmini usahihi wa mifumo muhimu zaidi ya usalama ambayo kutofaulu kunaweza kusababisha matokeo mabaya, kama vile kifo, majeraha au uharibifu wa kifedha. Mikataba-erevu ni programu za thamani ya juu zinazodhibiti kiasi kikubwa cha thamani, na makosa rahisi katika usanifu yanaweza kusababisha [hasara isiyoweza kurejeshwa kwa watumiaji](https://www.freecodecamp.org/news/a-hacker-stole-31m-of-ether-how-it-happened-and-what-it-means-for-ethereum-9e5dc29e33ce/amp/). Kuthibitisha rasmi mkataba kabla ya kupelekwa, hata hivyo, kunaweza kuongeza hakikisho kwamba itafanya kazi inavyotarajiwa mara tu itakapoendeshwa kwenye kiambajengo.

Kutegemewa ni ubora unaohitajika sana katika mkataba wowote mahiri, hasa kwa sababu msimbo unaotumwa kwenye Mashine ya Mtandaoni ya Ethereum (EVM) kwa kawaida hauwezi kubadilika. Kwa kuwa maboresho ya baada ya uzinduzi hayapatikani kwa urahisi, hitaji la kuhakikisha utegemezi wa mikataba hufanya uthibitishaji rasmi uwe muhimu. Uthibitishaji rasmi unaweza kugundua masuala magumu, kama vile utiririshaji wa kutosha na kufurika, kuingia tena, na uboreshaji duni wa gharama ya muamala, ambayo inaweza kuwakumba wakaguzi na wajaribu waliopita.

#### Thibitisha usahihi wa kiutendaji {#prove-functional-correctness}

Majaribio ya programu ndiyo njia ya kawaida zaidi ya kuthibitisha kwamba mkataba mahiri unakidhi baadhi ya mahitaji. Hii inahusisha kutekeleza mkataba na sampuli ya data inayotarajiwa kushughulikia na kuchanganua tabia yake. Iwapo mkataba utarejesha matokeo yanayotarajiwa kwa data ya sampuli, basi wasanidi programu wana uthibitisho halisi wa usahihi wake.

Hata hivyo, mbinu hii haiwezi kuthibitisha utekelezaji sahihi kwa thamani za pembejeo ambazo si sehemu ya sampuli. Kwa hivyo, kupima mkataba kunaweza kusaidia kugundua hitilafu (yaani, ikiwa baadhi ya njia za msimbo zitashindwa kurudisha matokeo yanayotarajiwa wakati wa utekelezaji), lakini **haiwezi kuthibitisha kwa ukamilifu kutokuwepo kwa hitilafu**.

Kinyume chake, uthibitishaji rasmi unaweza kuthibitisha rasmi kwamba mkataba-erevu unakidhi mahitaji kwa anuwai isiyo na kikomo ya utekelezaji _bila_ kuendesha mkataba hata kidogo. Hili linahitaji kuunda ubainifu rasmi ambao unafafanua kwa usahihi tabia sahihi za mkataba na kuunda muundo rasmi (wa hisabati) wa mfumo wa mkataba. Kisha tunaweza kufuata utaratibu rasmi wa uthibitisho ili kuangalia uthabiti kati ya muundo wa mkataba na maelezo yake.

Kwa uthibitishaji rasmi, swali la kuthibitisha ikiwa mantiki ya biashara ya mkataba inakidhi mahitaji ni pendekezo la hisabati ambalo linaweza kuthibitishwa au kukataliwa. Kwa kuthibitisha pendekezo rasmi, tunaweza kuthibitisha idadi isiyo na kikomo ya kesi za majaribio kwa idadi isiyo na kikomo ya hatua. Kwa namna hii uthibitishaji rasmi una matarajio bora zaidi ya kuthibitisha kuwa mkataba ni sahihi kiutendaji kuhusiana na vipimo.

#### Malengo bora ya uthibitishaji {#ideal-verification-targets}

Lengo la uthibitishaji linaelezea mfumo utakaothibitishwa rasmi. Uthibitishaji rasmi hutumiwa vyema katika "mifumo iliyopachikwa" (vipande vidogo, rahisi vya programu ambavyo vinaunda sehemu ya mfumo mkubwa). Pia ni bora kwa vikoa maalum ambavyo vina sheria chache, kwa kuwa hii hurahisisha kurekebisha zana za kuthibitisha sifa mahususi za kikoa.

Mikataba-erevu—angalau, kwa kiasi fulani—inatimiza mahitaji yote mawili. Kwa mfano, ukubwa mdogo wa mikataba ya Ethereum huifanya iweze kufanyiwa uthibitishaji rasmi. Pia ni bora kwa vikosa maalum vina sheria chache, kwa kuwa hii hurahisisha kurekebisha zana za kuthibitisha sifa mahususi za kikoa.

### Mzunguko wa uundaji wa haraka {#faster-development-cycle}

Mbinu rasmi za uthibitishaji, kama vile ukaguzi wa kielelezo na utekelezaji wa kiishara, kwa ujumla ni bora zaidi kuliko uchanganuzi wa kawaida wa msimbo mahiri wa mkataba (unaotekelezwa wakati wa majaribio au ukaguzi). Hii ni kwa sababu uthibitishaji rasmi unategemea thamani za kiishara kupima madai ("vipi ikiwa mtumiaji atajaribu kutoa ether _n_?") tofauti na upimaji ambao hutumia thamani halisi ("vipi ikiwa mtumiaji atajaribu kutoa ether 5?").

Vigezo vya ishara vinaweza kufunika aina nyingi za thamani halisi, kwa hivyo mbinu rasmi za uthibitishaji huahidi ufunikaji zaidi wa msimbo katika muda mfupi zaidi. Inapotumiwa ipasavyo, uthibitishaji rasmi unaweza kuharakisha mzunguko wa maendeleo kwa wasanidi programu.

Uthibitishaji rasmi pia huboresha mchakato wa kuunda programu zilizotawanywa (dapps) kwa kupunguza hitilafu za muundo wa gharama kubwa. Kuboresha mikataba (inapowezekana) ili kurekebisha udhaifu kunahitaji uandishi wa kina wa misingi ya kanuni na juhudi zaidi zinazotumika katika utayarishaji. Uthibitishaji rasmi unaweza kugundua makosa mengi katika utekelezaji wa mkataba ambao unaweza kuwaacha wakaguzi na wakaguzi wa zamani na kutoa fursa ya kutosha ya kurekebisha masuala hayo kabla ya kupeleka mkataba.

## Hasara za uthibitishaji rasmi {#drawbacks-of-formal-verification}

### Gharama ya kazi ya mikono {#cost-of-manual-labor}

Uthibitishaji rasmi, hasa uthibitishaji wa nusu kiotomatiki ambapo binadamu humwongoza mthibitishaji kupata uthibitisho wa usahihi, huhitaji kazi kubwa ya mikono. Zaidi ya hayo, kuunda ainisho rasmi ni shughuli ngumu inayohitaji kiwango cha juu cha ujuzi.

Mambo haya (juhudi na ustadi) hufanya uthibitishaji rasmi kuwa wa mahitaji zaidi na ghali ikilinganishwa na mbinu za kawaida za kutathmini usahihi katika kandarasi, kama vile majaribio na ukaguzi. Hata hivyo, kulipa gharama ya ukaguzi kamili wa uthibitishaji ni vitendo, kwa kuzingatia gharama ya makosa katika utekelezaji wa mikataba mahiri.

### Hasi za uongo {#false-negatives}

Uthibitishaji rasmi unaweza tu kuangalia ikiwa utekelezaji wa mkataba mahiri unalingana na vipimo rasmi. Kwa hivyo, ni muhimu kuhakikisha kuwa vipimo vinaelezea vizuri tabia zinazotarajiwa za mkataba mzuri.

Ikiwa maelezo hayajaandikwa vyema, ukiukaji wa mali—ambao unaelekeza kwenye unyongaji hatari—hauwezi kutambuliwa na ukaguzi rasmi wa uthibitishaji. Katika kesi hii, msanidi programu anaweza kudhani kimakosa kuwa mkataba hauna hitilafu.

### Masuala ya utendaji {#performance-issues}

Uthibitishaji rasmi hukumbana na masuala kadhaa ya utendaji. Kwa mfano, matatizo ya hali na njia ya mlipuko yanayotokea wakati wa kukagua kielelezo na ukaguzi wa kiishara, kwa mtiririko huo unaweza kuathiri taratibu za uthibitishaji. Pia, zana rasmi za uthibitishaji mara nyingi hutumia vitatuzi vya SMT na vitatuzi vingine vya vikwazo katika safu yao ya msingi, na vitatuzi hivi hutegemea taratibu za kimahesabu.

Pia, si mara zote inawezekana kwa wathibitishaji wa programu kubaini kama sifa (inayoelezewa kama fomula ya kimantiki) inaweza kutoshelezwa au la ("[tatizo la uamuzi](https://en.wikipedia.org/wiki/Decision_problem)") kwa sababu programu inaweza isikome kamwe. Kwa hivyo, inaweza kuwa vigumu kuthibitisha baadhi ya sifa za mkataba hata kama umebainishwa vizuri.

## Zana za uthibitishaji rasmi za mikataba-erevu ya Ethereum {#formal-verification-tools}

### Lugha za uainishaji za kuunda mainisho rasmi {#specification-languages}

**Act**: __Act inaruhusu uainishaji wa masasisho ya hifadhi, masharti-awali/baada na visivyobadilika vya mkataba. Seti yake ya zana pia ina sehemu za nyuma za uthibitisho zinazoweza kuthibitisha sifa nyingi kupitia Coq, vitatuzi vya SMT, au hevm.__

- [GitHub](https://github.com/ethereum/act)
- [Nyaraka](https://github.com/argotorg/act)

**Scribble** - __Scribble hubadilisha ufafanuzi wa msimbo katika lugha ya uainishaji ya Scribble kuwa madai halisi yanayokagua uainishaji.__

- [Nyaraka](https://docs.scribble.codes/)

**Dafny** - __Dafny ni lugha ya upangaji tayari kwa uthibitishaji ambayo inategemea ufafanuzi wa kiwango cha juu ili kutoa hoja na kuthibitisha usahihi wa msimbo.__

- [GitHub](https://github.com/dafny-lang/dafny)

### Wathibitishaji wa programu za kuangalia usahihi {#program-verifiers}

**Certora Prover** - _Certora Prover ni zana ya kiotomatiki ya uthibitishaji rasmi kwa ajili ya kuangalia usahihi wa msimbo katika mikataba-erevu. Vipimo vimeandikwa katika CVL (Lugha ya Uthibitishaji wa Certora), na ukiukaji wa mali umegunduliwa kwa kutumia mchanganyiko wa uchanganuzi tuli na utatuzi wa vikwazo._

- [Tovuti](https://www.certora.com/)
- [Nyaraka](https://docs.certora.com/en/latest/index.html)

**Solidity SMTChecker** - __SMTChecker ya Solidity ni kikagua mfumo kilichojengewa ndani kinachotegemea SMT (Satisfiability Modulo Theories) na utatuzi wa Horn. Inathibitisha ikiwa msimbo wa chanzo wa mkataba unalingana na vipimo wakati wa utungaji na hukagua kwa takwimu kwa ukiukaji wa sifa za usalama.__

- [GitHub](https://github.com/ethereum/solidity)

**solc-verify** - __solc-verify ni toleo lililopanuliwa la mkusanyaji wa Solidity ambalo linaweza kufanya uthibitishaji rasmi wa kiotomatiki kwenye msimbo wa Solidity kwa kutumia ufafanuzi na uthibitishaji wa programu wa moduli.__

- [GitHub](https://github.com/SRI-CSL/solidity)

**KEVM** - __KEVM ni semantiki rasmi ya Mashine ya Mtandaoni ya Ethereum (EVM) iliyoandikwa katika mfumo wa K. KEVM inaweza kutekelezwa na inaweza kuthibitisha madai fulani yanayohusiana na sifa kwa kutumia mantiki ya ufikivu.__

- [GitHub](https://github.com/runtimeverification/evm-semantics)
- [Nyaraka](https://jellopaper.org/)

### Mifumo ya kimantiki ya uthibitishaji wa nadharia {#theorem-provers}

**Isabelle** - _Isabelle/HOL ni msaidizi wa uthibitisho unaoruhusu fomula za kihisabati kuelezwa katika lugha rasmi na hutoa zana za kuthibitisha fomula hizo. Maombi makuu ni kurasimisha uthibitisho wa hisabati na hasa uthibitishaji rasmi, unaojumuisha kuthibitisha usahihi wa vigezo vya kompyuta au programu na kuthibitisha sifa za lugha na itifaki za kompyuta._

- [GitHub](https://github.com/isabelle-prover)
- [Nyaraka](https://isabelle.in.tum.de/documentation.html)

**Rocq** - _Rocq ni kithibitishi cha nadharia shirikishi ambacho hukuruhusu kufafanua programu kwa kutumia nadharia na kutoa uthibitisho wa usahihi uliokaguliwa na mashine._

- [GitHub](https://github.com/rocq-prover/rocq)
- [Nyaraka](https://rocq-prover.org/docs)

### Zana zinazotegemea utekelezaji wa kiishara za kugundua ruwaza zilizo hatarini katika mikataba-erevu {#symbolic-execution-tools}

**Manticore** - __Zana ya kuchanganua bytecode ya EVM inayotegemea utekelezaji wa kiishara.__

- [GitHub](https://github.com/trailofbits/manticore)
- [Nyaraka](https://github.com/trailofbits/manticore/wiki)

**hevm** - __hevm ni injini ya utekelezaji wa kiishara na kikagua usawa cha bytecode ya EVM.__

- [GitHub](https://github.com/dapphub/dapptools/tree/master/src/hevm)

**Mythril** - _Zana ya utekelezaji wa kiishara ya kugundua udhaifu katika mikataba-erevu ya Ethereum_

- [GitHub](https://github.com/ConsenSys/mythril-classic)
- [Nyaraka](https://mythril-classic.readthedocs.io/en/develop/)

## Masomo zaidi {#further-reading}

- [Jinsi Uthibitishaji Rasmi wa Mikataba-erevu Unavyofanya Kazi](https://runtimeverification.com/blog/how-formal-verification-of-smart-contracts-works/)
- [Jinsi Uthibitishaji Rasmi Unavyoweza Kuhakikisha Mikataba-erevu Isiyo na Kasoro](https://media.consensys.net/how-formal-verification-can-ensure-flawless-smart-contracts-cbda8ad99bd1)
- [Muhtasari wa Miradi ya Uthibitishaji Rasmi katika Mfumo Ikolojia wa Ethereum](https://github.com/leonardoalt/ethereum_formal_verification_overview)
- [Uthibitishaji Rasmi wa Mwanzo hadi Mwisho wa Mkataba-erevu wa Amana wa Ethereum 2.0](https://runtimeverification.com/blog/end-to-end-formal-verification-of-ethereum-2-0-deposit-smart-contract/)
- [Kuthibitisha Rasmi Mkataba-erevu Maarufu Zaidi Duniani](https://www.zellic.io/blog/formal-verification-weth)
- [SMTChecker na Uthibitishaji Rasmi](https://docs.soliditylang.org/en/v0.8.15/smtchecker.html)
