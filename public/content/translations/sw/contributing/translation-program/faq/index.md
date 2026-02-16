---
title: Maswali yanayoulizwa mara nyingi kwenye progrmu hii ya ufasiri
lang: sw
description: Maswali yanayoulizwa mara nyingi juu ya programu ya ufasiri wa ethereum.org
---

# Mwongozo wa kutafsiri ethereum.org {#translating-ethereum-guide}

Kama wewe ni mpya kwenye programu hii ya ufasiri na unawasiwasi wa kujiunga, kuna miongozo kadhaa itakusaidia kuanza. Tumia muongozo huu upate majibu juu ya maswali yanayopulizwa mara kwa mara.

## Je ninaweza kupata malipo kwa kufasiri ethereum.org? {#compensation}

Ethereum.org ni tovuti ya chanzo-cha-wazi, inamaanisha kwamba mtu yeyote anaweza kujihusisha na kuchangia.

Programu ya ufasirir wa Ethereum.org ni ugani wa tovuti hii na inapangwa na falsafa sawa.

Lengo la programu ya kutafsiri ni kufanya maudhui ya Ethereum kufikia na kupatikana kwa kila mmoja, bila kujali lugha wanayozungumza. Pia hurusu mtu yeyote anaezungumza lugha zaidi ya moja kujihusisha kwenye ikolojia ya Ethereum na kuchangia kwa njia rahisi.

Kwasababu hii, programu ya ufasiri iko wazi na ya hiyari, na ushiriki wako haukupi dhamana ya malipo yoyote. Kama tungekuwa tunalipa wafasiri kwa idadi ya maneno wanayofasiri, tungealika wale wenye sifa nzuri na uzoefu katika kazi ya kutafsiri( wataalamu wa kutafsiri) kujiunga na programu ya ufasiri. Hii ingeifanya Programu ya Tafsiri kuwa ya kibaguzi na kutuzuia kufikia malengo yaliyoainishwa, haswa: kumruhusu kila mtu kushiriki na kujihusisha na mfumo ikolojia.

Tunafanya kila juhudi kuwawezesha wachangiaji wetu kufanikiwa katika mfumo ikolojia wa Ethereum; motisha nyingi zisizo za kifedha zipo kama vile: [kutoa POAPs](/contributing/translation-program/acknowledgements/#poap) na [cheti cha mtafsiri](/contributing/translation-program/acknowledgements/#certificate), pamoja na kuandaa [Bao za wanaoongoza katika Tafsiri](/contributing/translation-program/acknowledgements/) na [kuorodhesha watafsiri wetu wote kwenye tovuti](/contributing/translation-program/contributors/).

## Ninawezaje kutafsiri mifuatano yenye `<HTML tags>`? {#tags}

Sio kila mlolongo umeandikwa kwa maneno halisi. Kuna baadhi ya mifuatano ambayo ina maandishi mchanganyiko kama vile tagi za HTML (`<0>`, `</0>`). Hii kwa kawaida ni kwa ajili ya viungo au mtindo mbadala katikati ya sentensi.

- Tafsiri maneno yalio ndani ya tagi/vitambulisho lakini sio tagi zenyewe. Chochote kilicho ndani ya `<` na `>` hakipaswi kutafsiriwa au kuondolewa.
- Kuacha maneno salama, tushauri ubonyeze kitufe cha "kunakikili chanzo" chini kushoto. Hii itanakili maandishi ya mwanzo na kuyabandika kwenye sanduku la maandishi. Hii inakusaidia kutoa maelezo ni wapi tagi zinapatikana na inakusaidia kuepuka makosa.

![Kiolesura cha Crowdin chenye kitufe cha kunakili chanzo kikiwa kimeangaziwa](./html-tag-strings.png)

Unaweza kuhamsiha sehemu ya tagi ndani ya maandishi kuifanya kuwa halisi kulingana na lugha yako - hakikisha uanhamisha tagi nzima.

Kwa maelezo ya kina zaidi kuhusu kushughulikia tagi na vijisehemu vya msimbo, tafadhali rejelea [Mwongozo wa Mtindo wa Tafsiri wa ethereum.org](/contributing/translation-program/translators-guide/#dealing-with-tags).

## Maandishi yanaishi wapi? {#strings}

Mara nyingi chanzo cha maandishi kinaweza kuwa na uhaba ili uweze kutafsiri ipasavyo.

- Angalia katika "picha" hizi na "muktadha" kwa taarifa zaidi. Kwenye kitengo cha chanzo cha maandishi, utaona picha iliounganishwa itakayokuonyesh jinsi tunavyotumia muktadha wa maandshi.
- Kama bado huna uhakika, inua kibendera kwenye "kitengo cha maoni". [Huna uhakika jinsi ya kuacha maoni?](#comment)

![Inaonyesha jinsi muktadha unavyoweza kutolewa kwa mfuatano wenye picha ya skrini](./source-string.png)

![Mfano wa picha ya skrini iliyoongezwa kwa ajili ya muktadha](./source-string-2.png)

## Nawezaje kuacha maoni au kuuliza maswali? Ningependa kunyanyua kibendera juu ya swala au makosa ya kiuandishi... {#comment}

Kama unataka kunyoosha kibendera juu ya maandishi maalum yanayohitaji umakini, jisikie huru kuwasilisha maoni.

- Bonyeza kitufe cha pili juu kulia kwako. Kichupo kilichofichw kitattokea upande wako wa kulia. Acha maoni mapya na bonyeza kitufe cha "suala" hapo chini. Unaweza kubainisha aina ya suala kwa kuchagua chaguzi kwenye orodha.
- Utakapoiwasilisha, itaripoitwa kwenye timu yetu. Tutataua tatizo na tutakupa taarifa kwa kujibu oni lako na kufunga suala.
- Ukitoa taarifa juu ya tafsiri isio sahihi, tafsiri na pendekezo lako vitafanyiwa uchunguzi na mzawa wa lugha hio kwenye uhakiki ujao.

![Inaonyesha jinsi ya kutoa maoni na masuala](./comment-issue.png)

## Kumbukumbu ya Tasfiri ni nini(KT)? {#translation-memory}

Kumbukumbu ya Tasfiri ni nini(KT) ni huduma inayotolewa na Crowdin inayotunza maneno yaliotafsiriwa hapo awali katika ethereum.org. Pale maandishi yanpotafsiriwa, inatunzwa moja kwa moja kwenye KT. Hiki kinaweza kua kifaa kitakachokufaa na kukusaidia kuoka mda!

- Angalia "mapendekezo ya KT na TK" na utaoina jinsi ambavyo watafsiri wengine wametafsiri kitu hicho hicho. Ukipata pendekezo lenye ufanano wa pointi za juu, jisikia huru kupendekeza tafsiri hio kwa kuibonyeza.
- Kama hama kitu kwenye orodha, unaweza kutafuta kwenye KT kwa tafsiri za nyuma zilizoshafanywa na kuzitumia tena ili kuwe na ufanano.

![Picha ya skrini ya kumbukumbu ya tafsiri](./translation-memory.png)

## Nawezaje kutumia faharasa ya crowdin? {#glossary}

Ethereum ni moja ya maneno yenye utata katika kazi ya kutafsiri kama jinsi maneno mapya ya kiteknolojia hayatawekwa katika lugha zingine hiivi karibuni. Licha ya hilo kuna maneno yenye maana tofauti katika mazingira tofauti. [Zaidi kuhusu kutafsiri istilahi za Ethereum](#terminology)

Maktaba ya Crowdin ndio sehemu nzuri ya kufanya uhakiki wa maneno na maana zake. Kuna namna mbili za kufikia maktaba.

- Kwanza, pale unapokutana na neno lililopigiwa mstari, unaweza kutumia kipanya kuona maana yake kwa ufupi.

![Mfano wa ufafanuzi wa faharasa](./glossary-definition.png)

- Pili, utakapoona neno geni sana kwako lakini halijapigiwa mstari, unaweza kulitafuta kwenye maktaba ( kitufer cha tatu cha safu ya kulia). Utapata maana ya maneno maalum na yale yanayotumika mara nyingi kwenye mradi.

![Picha ya skrini inayoonyesha mahali pa kupata kichupo cha faharasa katika Crowdin](./glossary-tab.png)

- Kama bado hujalipata, ni nafasi yako ya kuongeza neno/maneno mapya! Tunashauri kuangalia neno kwenye injini ya utafutaji na kuongeza maelezoi kwenye maktaba. Itakua msaada mkubwa sana kwa watafsiri wengine ili waweze kuelewa maana kamili ya neno au sentesi ilioandikwa.

![Picha ya skrini inayoonyesha jinsi ya kuongeza neno la faharasa kwa Crowdin](./add-glossary-term.png)

### Sera ya tafsiri ya istilahi {#terminology}

_Kwa majina (chapa, makampuni, watu) na istilahi mpya za teknolojia (Mnyororo Kioleza, shard chains, nk.)_

Ethereum inaleta maneno mapya mengi yaliosarafiwa hivi karibuni. Baadhi ya maneno yatatofautina kati ya mtafsiri mmoja na mwingine kwakua hamna tafsiri halisi ya lugha iliotafsiriwa. Tofauti hizi zinaweza kuleta kutokuelewana na kupunguza usomekaji.

Kwasababu za utofauti tofauti wa kiismu na viwango tofauti katika kila lugha, imekua ngumu sana kukaribia kua na neno moja la muungano wa sera za utafsiri amabazo zinaweza kutumiwa na lugha husika.

Baada ya kuzingatiwa kw umakini, tumeamua kuacha maneno yanayotumika mara kwa mara iwe uamuzi wako wewe, mtafsiri.

Tunapendekeza, pale unapokutana na neno ambalo ni geni kwako:

- Rejelea [Faharasa ya istilahi](#glossary), unaweza kupata jinsi watafsiri wengine walivyotafsiri hapo awali. Kama unafikiri tafsiri ya hapo mwanzo sio sahihi, jisikie huru kutunza tafsri yako kwa kuongeza maneno kwenye maktaba ya Crowdin.
- Iwapo tafsiri kama hiyo ya awali haipo katika Faharasa, tunakuhimiza utafute kwenye injini ya utafutaji au makala ya maudhui ambayo yanaonyesha jinsi neno hili linavyotumika katika jumuiya yako.
- Ikiwa hutapata marejeleo yoyote hata kidogo, jisikie huru kuamini angavu yako na kupendekeza tafsiri mpya kwa lugha yako!
- Iwapo hujiamini kufanya hivyo, liache neno bila kutafsiriwa. Wakati mwingine, maneno ya Kiingereza ni zaidi ya kutosha katika kutoa ufafanuzi sahihi.

Tunapendekeza uache majina ya chapa, makampuni na wafanyakazi bila kutafsiriwa kama tafsiri inaweza kusababisha mkanganyiko usiohitajika na matatizo ya SEO.

## Mchakato wa uhakiki unafanyaje kazi? {#review-process}

Ili kuhakikisha kiwango fulani cha ubora na uthabiti katika tafsiri zetu, tunafanya kazi na [Acolad](https://www.acolad.com/), mmoja wa watoa huduma wakubwa zaidi wa lugha ulimwenguni. Acolad ina wataalamu wa lugha 20,000, ambayo ina maana kwamba wanaweza kutoa wahakiki wa kitaalamu kwa kila lugha na aina ya maudhui tunayohitaji.

Mchakato wa uhakiki ni wa moja kwa moja; pindi seti ya maudhui inapotafsiriwa 100%, tunaagiza uhakiki kwa kundi hilo la maudhui. Mchakato wa uhakiki unafanyika moja kwa moja katika Crowdin. Uhakiki ukikamilika, tunasasisha tovuti na maudhui yaliyotafsiriwa.

## Naongezaje maudhui kwenye lugha yangu? {#adding-foreign-language-content}

Kwa sasa, maudhui yote yasiyo ya kiingereza yanatafsiriwa moja kwa moja kutoka kwenye chanzo kilochondikwa kwa lugha ya kiingereza, na maudhui yoyote amabayo hayapo katika lugha ya kiingereza hayawezi kuongezwa na lugha zingine.

Ili kupendekeza maudhui mapya kwa ajili ya ethereum.org, unaweza [kufungua suala](https://github.com/ethereum/ethereum-org-website/issues) kwenye GitHub. Kama kuna maudhui yalioongezwa, yataandikwa kwa kiingereza na kutafsiriwa kwenda kwenye lugha zingine kwa kutumia Crowdin.

Tunampango wa kuongeza na kuunga mkono maudhui yaongezwe katika kwa kutumia lugha zingine hivi karibuni.

## Wasiliana nasi {#contact}

Asante kwa kusoma haya yote. Tunatumaini hii itakusaidia kuingia kwenye programu yetu. Jisikie huru kujiunga na [chaneli yetu ya tafsiri ya Discord](https://discord.gg/ethereum-org) kuuliza maswali na kushirikiana na watafsiri wengine, au wasiliana nasi kwa translations@ethereum.org!
