---
title: "Mnyororo wa Vitalu 101: onyesho la kuona"
description: "Onyesho la jinsi teknolojia ya mnyororo wa vitalu inavyofanya kazi, ikijumuisha uheshiji, vitalu, minyororo, leja zilizosambazwa, na tokeni ili kufanya dhana za mnyororo wa vitalu zieleweke na kuwa dhahiri."
lang: sw
youtubeId: "_160oMzblY8"
uploadDate: 2016-11-13
duration: "0:17:49"
educationLevel: beginner
topic:
  - "mnyororo wa vitalu"
  - "kriptografia"
format: presentation
author: Anders Brownworth
breadcrumb: "Mnyororo wa Vitalu 101"
---

Onyesho la kuona la Anders Brownworth la jinsi teknolojia ya mnyororo wa vitalu inavyofanya kazi, ikijumuisha mwongozo unaoangazia uheshiji wa SHA-256, vitalu, uchimbaji, minyororo ya vitalu, leja zilizosambazwa, tokeni, na zaidi.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=_160oMzblY8) iliyochapishwa na Anders Brownworth. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Heshi ya SHA-256 (0:01) {#sha-256-hash-001}

Hili ni onyesho la mnyororo wa vitalu. Tutafanya hivi kwa njia ya kuona sana — tutafanya iwe rahisi sana kueleweka kwa kupitia vipande muhimu vya kile ambacho mnyororo wa vitalu ni.

Kabla hatujaanza, tunahitaji kuangalia kitu hiki kinachoitwa heshi ya SHA-256. Heshi inaonekana kama kundi la nambari za nasibu, na kimsingi ni alama ya vidole ya baadhi ya data za kidijitali. Inatokea tu kuwa ni alama ya vidole ya chochote ninachochapa kwenye kisanduku hiki. Nikichapa jina langu "Anders" kwenye kisanduku hiki, unaona kwamba heshi imebadilika. Kwa kweli, ilibadilika kila wakati nilipochapa herufi.

Kwa hivyo hii ni heshi ya jina "Anders," zote zikiwa herufi ndogo — inaanza na `19ea`. Nikifuta hiyo na kuchapa "Anders" tena, unaweza kuona inaanza na `19ea` — heshi ile ile haswa. Kwa maana hiyo ni alama ya vidole ya kidijitali ya data hii. Data yoyote iliyo hapa, kila wakati unapochapa data sawa haswa unapata heshi sawa haswa.

Naweza kuchapa chochote ninachotaka. Unaweza kuwa huna chochote — `e3b0` — hiyo ni heshi ya kutokuwa na chochote. Au unaweza kuchapa mambo mengi sana. Kwa kweli, unaweza kuweka Maktaba ya Congress hapa na ungepata heshi. Jambo la kufurahisha ni kwamba, bila kujali kama kuna kiasi kidogo cha taarifa, hakuna taarifa, au Maktaba nzima ya Congress, kila wakati utapata heshi ambayo ina urefu huu. Hutaweza kukisia mapema hii ni nini — inabidi uweke data ili kujua heshi ni nini, lakini kila wakati utapata heshi sawa haswa bila kujali ni mara ngapi unaweka taarifa sawa haswa.

#### Kitalu (2:10) {#block-210}

Kile nitakachofanya ni kupanua wazo hili la heshi kuwa kitu ambacho tutakiita kitalu. Kitalu ni sawa haswa na heshi, lakini sehemu ya data imegawanywa katika sehemu tatu: moja inayoitwa "kitalu" — nambari tu, hiki ni kitalu nambari 1 — "nonsi," ambayo ni nambari nyingine tu, na kisha baadhi ya data kama tulivyokuwa nazo hapo awali.

Heshi ya taarifa hii yote iko hapa chini, na inaanza na sufuri nne. Hiyo ni heshi isiyo ya kawaida kiasi — nyingi zao hazitaanza na sufuri nne kama hivyo. Lakini hii inaanza hivyo, na kwa sababu inaanza hivyo, kwa hiari kabisa, nitasema kwamba kitalu hiki "kimesainiwa."

Nini kingetokea ikiwa ningebadilisha kipande chochote cha taarifa hii? Tuseme ninachapa kitu hapa — heshi itabadilika, na kuna uwezekano gani kwamba itaanza na sufuri nne? Ni mdogo sana. Nitasema tu "hi" — angalia hiyo, heshi hii haianzi na sufuri nne, na mandharinyuma yamekuwa mekundu. Kwa hivyo sasa unajua kwamba kitalu hiki chenye taarifa hii ndani yake si kitalu halali au kilichosainiwa.

Hapo ndipo nonsi inapoingia. Nonsi ni nambari tu unayoweza kuweka ili kujaribu kupata thamani inayofanya heshi ianze na sufuri nne tena. Ningeweza kukaa hapa kutwa nzima nikichapa nambari, lakini nina kitufe hiki kidogo cha "Chimba". Kile kitakachotokea ninapokibonyeza ni kwamba kitapitia nambari zote kuanzia 1 kwenda juu ili kujaribu kupata moja ambapo heshi inaanza na sufuri nne. Mchakato huu unaitwa uchimbaji.

Imesimama kwenye 59,396 — na hiyo inatokea tu kuheshi kuwa kitu kinachoanza na sufuri nne. Inakidhi ufafanuzi wangu wa kile ambacho kitalu kilichosainiwa ni.

#### Mnyororo wa vitalu (5:16) {#blockchain-516}

Kwa hivyo unaweza kuniambia mnyororo wa vitalu ni nini? Pengine ni mnyororo tu wa vitalu hivi. Huu hapa mnyororo wangu wa vitalu — kitalu nambari moja kina nonsi kama hapo awali, eneo la data, lakini kisha kina uwanja huu wa "awali" ambao ni kundi la sufuri. Tukiendelea mbele, hiki ni kitalu cha pili, kitalu cha tatu, kitalu cha nne — mnyororo huu wa vitalu una vitalu vitano juu yake.

Uwanja wa "awali" kwa kila kitalu ni heshi ya kitalu kilichotangulia. Unaweza kuona kwamba kila kitalu kinaelekeza nyuma kwenye kile kilichotangulia. Kitalu hicho cha kwanza hakina cha awali, kwa hivyo ni kundi la sufuri tu.

Nini kinatokea nikibadilisha baadhi ya taarifa hapa? Itabadilisha heshi ya kitalu hiki na kukibatilisha. Lakini vipi nikibadilisha kitu katika kitalu cha awali? Itabadilisha heshi hiyo, lakini heshi hiyo inanakiliwa hadi kwenye uwanja wa "awali" wa kitalu kinachofuata, kwa hivyo inaharibu vitalu vyote viwili. Tunaweza kurudi nyuma kadiri tunavyotaka hadi wakati fulani uliopita na kuharibu kitalu hicho, na itaharibu vitalu vyote tangu wakati huo. Kila kitu kabla yake bado ni kijani, lakini kila kitu baada yake kinakuwa chekundu.

Nikienda na kubadilisha kitalu cha mwisho, ninachotakiwa kufanya ni kuchimba tena kitalu hicho kimoja. Nikirudi nyuma sana kwa wakati na kufanya mabadiliko, inabidi nichimbe hiki, hiki, hiki, na hiki. Kadiri vitalu vingi vinavyopita, ndivyo inavyokuwa vigumu zaidi na zaidi kufanya mabadiliko. Hivyo ndivyo mnyororo wa vitalu unavyopinga mabadiliko — unapinga kubadilishwa.

#### Mnyororo wa vitalu uliosambazwa (9:18) {#distributed-blockchain-918}

Kwa hivyo ningejuaje ikiwa mnyororo wangu wa vitalu umechimbwa tena? Sasa tuna mnyororo wa vitalu uliosambazwa. Unaonekana sawa haswa na mnyororo wa vitalu uliopita, lakini huyu ni Mwenza A. Ukienda hapa chini, unaweza kumuona Mwenza B, na ana nakala halisi ya mnyororo wa vitalu. Pia kuna Mwenza C — hii inaweza kuendelea milele. Kuna wenza wengi kwenye intaneti, na wote wana nakala kamili ya mnyororo wa vitalu.

Nikiangalia heshi hii, ni `e4b`. Nikienda chini kwa inayofuata, pia ina `e4b`. Lazima ziwe zinafanana. Sasa nikienda hapa na kuchapa kitu, kuchimba tena kitalu hiki, na kisha kuchimba vitalu vinavyofuata — minyororo yote ni ya kijani. Hata hivyo, mnyororo huu unasema heshi ya mwisho ni `e4b`, ule wa chini unasema `e4b` pia, na huu wa katikati unasema `4cae`.

Kwa hivyo ninajua kwa kutazama tu heshi hii moja ndogo kwamba kuna kitu kibaya katika mnyororo huu wa vitalu. Ingawa heshi zote zinaanza na sufuri nne, hii ni tofauti. Kimsingi ni mbili dhidi ya moja — sisi ni demokrasia ndogo hapa. Kwa hivyo `e4b` inashinda. Hivyo ndivyo kuwa na nakala iliyosambazwa kikamilifu kwenye kompyuta nyingi tofauti kunavyokuruhusu kuona haraka ikiwa vitalu vyote vinafanana.

Minyororo ya vitalu inaweza kuwa na vitalu 400,000 au 500,000 kwa urahisi sana. Badala ya kukagua kupitia vyote, unachotakiwa kufanya haswa ni kuangalia heshi ya kile cha hivi karibuni zaidi, na unaweza kuona ikiwa chochote katika siku za nyuma kilibadilishwa.

#### Tokeni (12:17) {#tokens-1217}

Hilo ndilo jambo zima — hakuna zaidi ya hilo. Lakini kwa namna fulani si muhimu sana kwa sababu hatuna chochote katika eneo la data ambacho kina maana yoyote. Kile tunachotaka haswa ni tokeni.

Sasa nina tokeni hizi — kwa hiari kabisa, ninaziita dola. Tuna dola ishirini na tano kutoka kwa Darcy kwenda kwa Bingley, dola nne na senti ishirini na saba kutoka kwa Elizabeth kwenda kwa Jane — unapata wazo. Kuna miamala hii yote inayofanyika, na nimebadilisha tu data na miamala hii. Kama hapo awali, tukienda chini tunagundua tuna nakala hizi zote zingine za mnyororo wa vitalu ule ule.

Hapa ndipo tabia isiyobadilika inapokuwa muhimu. Nikibadilisha kitu hapa nyuma, heshi itakuwa tofauti na kile kilicho kwenye nakala zingine. Ni muhimu sana kwamba ukirudi nyuma kwa wakati na kubadilisha thamani fulani, tungegundua. Ni muhimu sana kwa pesa kwamba usipoteze mwelekeo, na hiyo ndiyo maana nzima ya kutumia mnyororo wa vitalu — kupinga aina yoyote ya marekebisho kwa mambo ambayo yametokea zamani.

Jambo moja ningetaja: hatuorodheshi "Darcy ana dola mia moja na anampa Bingley 25." Tunakumbuka tu mienendo ya pesa, si salio la akaunti ya benki. Hii inazua swali — je, Darcy ana $25?

#### Muamala wa Coinbase (14:34) {#coinbase-transaction-1434}

Tuna tatizo katika toleo hili la mnyororo wa vitalu: kwa kweli hatujui kama Darcy ana $25. Kwa hivyo hebu tuangalie muamala wa Coinbase. Tunaongeza muamala wa Coinbase kwenye vitalu vyetu — inasema tutabuni dola mia moja kutoka hewani na kumpa Anders. Hakuna miamala mingine katika kitalu hiki kwa sababu hakuna mtu aliyekuwa na pesa yoyote kabla ya hili.

Katika kitalu kinachofuata, dola mia moja nyingine inatoka kusikojulikana na kwenda kwa Anders. Sasa tuna baadhi ya miamala — yote inatoka kwa Anders kwa sababu mimi ndiye pekee niliye na pesa yoyote kwa wakati huu. Ninatuma dola zangu kumi kwa Sophie. Je, nina dola kumi? Ndiyo — ninaangalia nyuma na kuona kwamba muamala wa Coinbase ulinipa mia moja, kwa hivyo nina angalau kumi.

Unajumlisha hizi zote na hazizidi mia moja. Inafuata kanuni ya msingi ya sarafu: huwezi kuunda pesa kutoka hewani, na usambazaji wake unadhibitiwa.

Tukisonga mbele kwa wakati, tunaona kwamba Jackson anampa Alexa dola mbili. Je, Jackson ana dola mbili kweli? Tunarudi nyuma kitalu kimoja na kuona kwamba Emily alikuwa amepata dola kumi kutoka kwa Anders na kumpa Jackson kumi. Kwa hivyo Jackson ana pesa. Tunaweza kurudi nyuma na kujua hilo — hiyo ni moja ya faida za kuwa na uwanja wa "awali".

#### Kufunga (16:30) {#closing-1630}

Huo ni mnyororo wa vitalu wa msingi unaoendesha sarafu juu yake. Kama unavyojua, minyororo ya vitalu ina nakala nyingi — kila mtu ana nakala. Tukibadilisha kitu na kukifanya dola sita, vitalu vinakuwa batili na havikubaliani na nakala zingine. Hii inapinga uchezewaji, ambayo ndiyo unayotaka kwa sarafu. Inafanya kazi vizuri sana kwa mambo ambayo ni madogo na ya kimuamala.

Minyororo ya vitalu ni njia bora sana ya kushughulikia makubaliano juu ya kile kilichotokea zamani — historia hii isiyobadilika ambayo inashuka na wakati. Tunapitia kijuujuu baadhi ya mambo makuu, lakini ukichunguza kwa kina onyesho hili na kubofya kupitia mambo haya na kucheza nayo, utapata wazo zuri zaidi na zaidi la jinsi hii inavyofanya kazi.