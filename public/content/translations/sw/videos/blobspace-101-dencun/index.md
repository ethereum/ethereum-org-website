---
title: "Maboresho yajayo ya Ethereum: nafasi ya blobu 101"
description: "Domothy anaelezea nafasi ya blobu, tabaka jipya la upatikanaji wa data lililoletwa na maboresho ya Dencun ya Ethereum, akijumuisha jinsi miamala ya blobu inavyofanya kazi, kwa nini ni muhimu kwa kuongeza uwezo wa Ethereum, na nini kinafuata kwa upatikanaji wa data."
lang: sw
youtubeId: "dFjyUY3e53Q"
uploadDate: 2024-02-27
duration: "1:02:31"
educationLevel: intermediate
topic:
  - "scaling"
  - "blobs"
  - "dencun"
  - "upgrades"
format: interview
author: Bankless
breadcrumb: "Nafasi ya blobu 101"
---

Mahojiano haya yanahusu rasilimali ya nafasi ya blobu ya Ethereum, iliyoletwa na [EIP-4844 (Proto-Danksharding)](https://www.eip4844.com/). Mtafiti wa Ethereum Domothy anajiunga na David Hoffman na Ryan Sean Adams kwenye podikasti ya Bankless kuelezea historia ya ramani ya njia inayozingatia rollup, mitambo ya kiufundi ya mablobu, na athari za kiuchumi za kutenganisha nafasi ya kitalu na nafasi ya blobu.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=dFjyUY3e53Q) iliyochapishwa na Bankless. Imehaririwa kidogo ili isomeke kwa urahisi.*

#### Utangulizi wa nafasi ya blobu (0:00) {#introduction-to-blob-space-000}

**Ryan Sean Adams:** Karibu Bankless, ambapo tunachunguza Eneo Jipya la pesa za mtandaoni na fedha za mtandaoni. Hivi ndivyo jinsi ya kuanza, jinsi ya kuwa bora, jinsi ya kutangulia fursa. Niko hapa na David Hoffman, na tuko hapa kukusaidia kuwa bankless zaidi. Unajua jinsi tunavyosema minyororo ya vitalu inauza vitalu? Kweli, hivi karibuni Ethereum itakuwa inauza zaidi ya vitalu tu — itakuwa inauza mablobu pia.

**David Hoffman:** Ni kweli, mablobu. Kwa hivyo tumebakiza miezi michache tu kutoka kwenye toleo kubwa zaidi la Ethereum tangu Unganisho, na nadhani hakuna mtu ambaye amepanga kikamilifu athari za hili, lakini itakuwa kubwa sana. Ethereum inapata bidhaa mpya ya kuuza. Inaitwa nafasi ya blobu, na hiyo ni nyongeza kwa nafasi ya kitalu. Gharama ya miamala kwenye matabaka ya 2 (l2) inakaribia kushuka kuelekea sifuri. Uchumi wa gesi ya ETH na uteketezaji unakaribia kubadilika milele. Tunaita maboresho haya maboresho ya nafasi ya blobu, EIP-4844, Proto-Danksharding. Tunataka kujumuisha kila kitu unachohitaji kujua kuhusu nafasi ya blobu.

**Ryan Sean Adams:** Mambo machache ya kuchukua hapa. Namba moja, tunapitia nafasi ya blobu ni nini. Namba mbili, tunapitia historia ya jinsi tulivyofika hapa — ramani hii ya njia inayozingatia rollup. Namba tatu, tunapitia uchumi. Hii inamaanisha nini kwa uchumi wa Ethereum, kwa ulimbikizaji wa thamani ya ETH, kwa ETH kama rasilimali? David, kwa nini kipindi hiki kilikuwa muhimu kwako?

**David Hoffman:** Nadhani kama kuna sekta yoyote ya mazungumzo ambayo mimi na wewe tunaipenda sana, ni makutano ya kriptografia na uchumi — kama namba na udhihirisho wa kiuchumi. Ninapenda kucheza na itifaki hizi.

**Ryan Sean Adams:** Ndiyo, hiyo ndiyo lugha yetu ya upendo.

**David Hoffman:** Tumezungumza kuhusu EIP-4844, tumezungumza kuhusu Proto-Danksharding. Hivyo ni vitu sawa. Tumeifafanua mara kadhaa katika uwezo tofauti. Lakini hatujawahi kufanya uchunguzi wa kina na kuibuka upande wa pili tukijibu upande wa uchumi. Kwa hivyo tumeongeza uwezo wa upatikanaji wa data kiufundi katika kiwango cha kiufundi — hilo ni uboreshaji wa itifaki. Lakini hiyo inaunganaje na upande wa soko wa Ethereum? Soko moja sasa linagawanywa kuwa mawili: nafasi ya kitalu na nafasi ya blobu sasa ni masoko mawili tofauti yanayojitegemea ambayo yamo ndani ya kitalu cha Ethereum.

Hiyo inamaanisha nini kwa Etha? Hiyo inamaanisha nini kwa masoko yanayoibuka karibu na vitu hivi? Usawa wa usambazaji na mahitaji ya kila moja unasukumana na kuvutana vipi? Hii inafanya nini kwa uwezo wa kuongezeka kwa tabaka la 2 (l2)? Hii inafanya nini kwa matumizi ya kiuchumi juu ya matabaka ya 2 (l2)? Tutaanza na mambo ya msingi, lakini kisha tutaingia kwa kina kwenye upande wa kiuchumi wa mazungumzo haya.

Tumlete mgeni wetu, Dom, anayejulikana pia kama Domothy. Yeye ni mtafiti katika Taasisi ya Ethereum anayefanya kazi kwenye utafiti na maendeleo ya maboresho muhimu ya Ethereum yanayokuja, ikiwa ni pamoja na EIP-4844 (mada ya leo), danksharding kamili, na uteketezaji wa MEV.

#### Historia ya ramani ya njia inayozingatia rollup (10:00) {#the-history-of-the-rollup-centric-roadmap-1000}

**Ryan Sean Adams:** Kwa hivyo Dom, ili kuelewa kikamilifu jinsi tulivyofika kwenye nafasi ya blobu, nadhani inafaa kurudi nyuma kukumbuka ili kuelewa ukamilifu wa ramani ya njia ya Ethereum, kwa sababu ilifikia hitimisho la kimantiki sana la mablobu na nafasi ya blobu. Unaweza kuturudisha nyuma? Kwa sababu wakati fulani, ramani ya njia ya Ethereum inayozingatia rollup haikuwepo. Tulikuwa na kitu hiki kinachoitwa shadi ya utekelezaji, ambacho hatukuwahi kukipata. Ni wapi katika historia ya ramani ya njia ya Ethereum inafaa kuelewa kikamilifu muktadha kamili wa nafasi ya blobu?

**Domothy:** Hakika. Hata kabla ya Ethereum kuzinduliwa, tayari kulikuwa na mawazo kuhusu jinsi ya kuongeza uwezo wake kwa sababu kila mtu alijua hata wakati huo kwamba mnyororo wa vitalu mmoja na kila nodi inayoendesha kila kitu haingetosha. Kwa hivyo mwanzoni kulikuwa na mawazo mengi tofauti ya shadi. Jaribio la kwanza la kuibainisha haswa lilikuwa shadi na utekelezaji ambapo kimsingi unakuwa na, tuseme, minyororo 64 tofauti inayojitegemea na inajaribu kuwasiliana. Ilibainika kuwa hilo ni gumu kufanya — kuna ugumu mwingi unaohusika.

Iligawanywa katika awamu tofauti. Kwanza, tutazindua Mnyororo wa Beacon, kisha tutafute jinsi ya kuiunganisha na tabaka la utekelezaji la sasa. Kisha tutafanya Awamu ya Kwanza, ambayo ni shadi ya data tu — kwa hivyo hakuna utekelezaji, ni minyororo ya vitalu midogo tu iliyo na data. Na kisha tutafute jinsi ya kufanya shadi ya utekelezaji. Ilikuwa ni kutafuta suluhisho tunapoendelea, lakini kwa usalama ili tusifanye kitu ambacho tutajutia baadaye na kuvunja mnyororo wa vitalu mzima, kwa sababu kuna shughuli nyingi za kiuchumi juu yake.

**David Hoffman:** Ili kutoa maelezo juu ya shadi ya utekelezaji — ni uchanganyaji wa wahakiki kwa nasibu kwenye shadi tofauti za mnyororo wa vitalu, huku kila shadi kimsingi ikiwa ni mnyororo wa vitalu wake mdogo unaoendeshwa sambamba na Mnyororo wa Beacon. Inasikika kidogo kama kile tulicho nacho leo na mikusanyiko, lakini tofauti hapa ni kwamba shadi za Ethereum kwa kweli ni sehemu ya itifaki ya tabaka la 1 (l1). Itifaki ya tabaka la 1 (l1) huamua shadi ni nini, wakati mikusanyiko imetenganishwa. Hapo awali, ilikuwa iwe 64 ya shadi hizi zinazoendeshwa, kusimamiwa, na kuzalishwa na itifaki ya tabaka la 1 (l1) ya Ethereum. Je, ninaelezea hili kwa usahihi?

**Domothy:** Ndiyo kabisa. Kupata uwezo wa utekelezaji kwa njia hii ni kwa njia isiyo ya moja kwa moja na mikusanyiko na shadi ya data, lakini ni kama njia ya mkato kutoka kwa mtazamo wa utafiti kwa sababu tabaka la 1 (l1) la Ethereum lina mambo machache sana ya kufanya na kuwa na wasiwasi nayo. Mengine yote yanahamishiwa kwenye mikusanyiko, ambayo kwa maoni yangu ni bora kuliko mpango wa awali. Katika mpango wa awali wa shadi zinazofadhiliwa na hali, kila kitu ni sawa — mnyororo wa vitalu sawa, EVM sawa, mabadilishano sawa. Sasa badala ya hayo, unaweza kuwa na mikusanyiko inayoshindana ili kupata mazingira bora na mabadilishano. Ikiwa unapendelea kasi kubwa kuliko usalama mkubwa, unaweza kwenda kwenye rollup tofauti. Una machaguo, ubunifu, na ushindani kwenye tabaka la 2 (l2).

**Ryan Sean Adams:** Hebu tugusie ulimwengu wa msimu ambao Ethereum ipo. Kuna tabaka la mwafaka, tabaka la upatikanaji wa data, na tabaka la utekelezaji. Tabaka la mwafaka linafafanua kile ambacho ni kweli — mpangilio wa vitalu. Tabaka la upatikanaji wa data ni kile kilichotokea — tabaka la data. Tabaka la nje ni utekelezaji, ambapo shughuli inafanyika sasa hivi. Hapo awali, Ethereum iliunganisha yote matatu kwenye mnyororo mkuu.

Sasa kile tunachofanya na ramani ya njia inayozingatia rollup ni kwamba tunatenganisha utekelezaji kutoka kwenye mnyororo mkuu kwenda kwenye mikusanyiko hii. Lakini ili mikusanyiko iwe salama kikamilifu na dhamana sawa na Mtandao Mkuu wa Ethereum, lazima itume data zake kwenye Mtandao Mkuu wa Ethereum. Wanapofanya hivyo, kwa sasa inagharimu nafasi ya kitalu, na inagharimu pesa nyingi. Sababu ya Proto-Danksharding (EIP-4844) ni mabadiliko ya kiuchumi kwa njia inayopendelea sana rollup. Dom, kuna chochote cha kuongeza hapo?

**Domothy:** Ningeongeza tu kwamba sasa hivi upatikanaji wa data ni wa kudokezwa zaidi na unategemea uhakiki bila hitaji la uaminifu. Tunataka kila mtu aweze kuhakiki mnyororo yeye mwenyewe na asiwe na mtu wa tatu wa "niamini kaka" katikati. Hicho ndicho kikwazo. Unahitaji kuwa na uwezo wa kuhakiki kila kitu, ambayo kwa njia isiyo ya moja kwa moja inamaanisha unahitaji kuwa na data inayopatikana kwako ili kuangalia mabadiliko ya hali.

Mwishoni mwa mwaka 2020, watu waligundua mikusanyiko ilikuwa inaanza kuwa nzuri sana na maarufu, na ilitatua suala letu la kuongeza uwezo wa utekelezaji bila hitaji la shadi ya utekelezaji. Kwa kwenda na mfumo wa ikolojia wa mikusanyiko badala ya kujaribu kuwa msimamo mkali wa tabaka la 1 (l1), mikusanyiko inaweza kufanya mabadilishano yao wenyewe, kuanzisha minyororo yao ya vitalu, na kufanya majaribio ya mambo mapya. Ethereum inashughulikia uhakiki — huo ndio msingi wa mnyororo wa vitalu ni nini.

#### Nafasi ya blobu ni nini? (30:00) {#what-is-blob-space-3000}

**Ryan Sean Adams:** Sasa tupeleke kwenye hali ya sasa, Dom. Tuna mikusanyiko mingi inayotumia nafasi ya kitalu ya tabaka la 1 (l1) la Ethereum, ikilipa ada kubwa za gesi kutuma data zao za hali ili mtu yeyote aweze kuzihakiki. Kwa hivyo, Dom, blobu ni nini?

**Domothy:** Blobu ni kipande tu cha data — haswa safu kubwa, ghafi ya namba kimsingi. Blobu kwenye Ethereum sasa hivi ina ukubwa uliowekwa wa takriban kilobaiti 128. Ni data ghafi tu iliyoambatishwa kwenye muamala, inayojulikana kama muamala unaobeba blobu, ambayo unawasilisha kwenye tabaka la 1 (l1).

Kizuizi muhimu cha muundo hapa ni kwamba EVM (Mashine Pepe ya Ethereum) ya tabaka la 1 (l1) la Ethereum — injini ya utekelezaji — haina ufikiaji wa data iliyo ndani ya blobu. Katika vitalu vya kawaida, data kama data za mwito inahusisha mfumo kuangalia ni kazi gani zinaitwa, ni pesa gani zinahamishwa, na kuhakiki mabadiliko ya hali. EVM inafikia yote hayo. Lakini ikiwa kuongeza uwezo wa tabaka la 2 (l2) kunahusisha kutuma data ya mikusanyiko haswa ili mhakiki wa *nje ya mnyororo* aweze kufanya ukokotoaji, basi *tabaka la 1 (l1)* la Ethereum kiutendaji halihitaji kuiangalia na kuitekeleza.

Kimsingi ni kifurushi kilichofungwa. Tabaka la 1 (l1) linaichukua, linahakikisha kwamba kila mtu ana ufikiaji wa kuangalia ndani ikiwa anataka kuipakua kimwili, lakini tabaka kuu la utekelezaji la uchakataji la Ethereum lenyewe halisomi na kukokotoa data kikamilifu. Kwa sababu halisomi na kukokotoa data katika EVM, inahitaji rasilimali chache sana za uchakataji kutoka kwa nodi. Ndiyo maana ni nafuu sana.

**David Hoffman:** Kwa hivyo kwa muhtasari: Nafasi ya kitalu inajali kuhusu ukokotoaji, utekelezaji wa hali, na uhifadhi wa mantiki. Nafasi ya blobu inajali pekee kuhusu upatikanaji wa data. Tabaka la 1 (l1) halijali nani anatuma nini katika mablobu haya; inachojali tu ni kupokea mablobu haya na kuyashikilia kwa dirisha lililopangwa la upatikanaji ili wahusika wanaovutiwa (kama wapangaji wa rollup na watumiaji) waweze kuyavuta, kuhakiki kwamba data haikuzuiliwa kwa nia mbaya, na kuendelea.

**Domothy:** Ndiyo kabisa. Na sifa nyingine muhimu ya mablobu ni kwamba hupunguzwa kiotomatiki baada ya muda fulani — kwa sasa karibu siku 18. Sababu ya kupunguzwa ni kwamba ili kuhakikisha uhakiki bila hitaji la uaminifu, watu binafsi wanahitaji tu data hiyo ipatikane ili kuthibitisha ukamilifu na mwafaka juu ya hali ya rollup ndani ya dirisha maalum la changamoto. Huhitaji nodi elfu moja zinazoshikilia mablobu kutoka miaka miwili iliyopita ili kuhakiki muamala wako leo. Dirisha linapoisha, hutaipata kutoka kwa nodi ya Ethereum tena; unaipata kutoka kwa watoa huduma wa historia, waorodheshaji, au wachunguzi wa kitalu asili wa rollup. Uhifadhi kwenye Ethereum ni ghali sana milele. Kuondoa hitaji la uhifadhi kunaturuhusu kuongeza uwezo wa upitishaji wa blobu bila kuharibu diski kuu za waendeshaji wa nodi.

#### Uchumi na danksharding kamili (55:00) {#economics-and-full-danksharding-5500}

**Ryan Sean Adams:** Tunajua kwamba 4844 ni hatua ya kwanza — kile tunachokiita Proto-Danksharding. Inaanzisha muundo wa blobu na soko la ada lililotengwa, lakini idadi halisi inayolengwa ya mablobu kwa kila kitalu inazuiwa mwanzoni ili iwe salama kabisa. Hii inaonekanaje ikiongeza uwezo kuelekea danksharding kamili?

**Domothy:** Sasa hivi, chini ya EIP-4844, tunalenga kimsingi mablobu 3 kwa kila kitalu, na kiwango cha juu kabisa cha 6. Hiyo inazuia uwezo wa upitishaji wa data wa juu kabisa kwenye tabaka la 1 (l1) mara tu baada ya maboresho ili kuzuia msongo wowote wa mtandao wakati tunaona jinsi kipengele kinavyofanya kazi katika uzalishaji endelevu.

Danksharding kamili inaongeza uwezo huu kwa kiasi kikubwa. Inaelekea kwenye usampulishaji wa upatikanaji wa data (DAS). Kwa DAS, nodi kamili hazihitaji tena kupakua kila blobu moja moja ili kuhakiki data ilipatikana. Wanaweza kusampulisha kitakwimu vipande vidogo vya data ya blobu. Ikiwa sampuli ya takwimu inathibitika kupatikana, uwezekano wa kihisabati kwamba mshambuliaji anaficha data unakaribia sifuri (kama nafasi moja katika bilioni). Mara tu unapokosa kuhitaji upakuaji kamili wa blobu nzima, unaweza kuongeza uwezo wa blobu hadi tarakimu mbili au zaidi kwa kila kitalu.

**David Hoffman:** Hii inaunda soko la ada lililogawanyika ndani ya kitalu cha Ethereum. Sasa hivi, rollup ya tabaka la 2 (l2) inabidi ishindane na wafanyabiashara wa Uniswap na OpenSea kwa rasilimali sawa za nafasi ya kitalu katika kitalu cha Ethereum. Lakini hizi ni mifumo tofauti kimsingi ya matumizi. Ikiwa kuna kufua kwa NFT kunakoendelea kwa kasi kwenye L1 ya Ethereum, gesi inapanda, na mikusanyiko ya tabaka la 2 (l2) inayojaribu kutuma hali yao ya data ghafla inakabiliwa na gharama za biashara zinazopanda kwa kasi ili tu kufanya majukumu yao muhimu ya usalama.

Kwa soko la ada la pande mbili — kimsingi barabara tofauti iliyotengwa kwa mablobu kupita — kufua huko kwa NFT kwenye L1 ya Ethereum kunapandisha gesi ya utekelezaji kwa njia sawa, lakini hakutumii nafasi ya blobu. Mablobu yanabaki bila msongamano kabisa na kwa ufanisi yanagharimu senti. Kufua kwa NFT kwa mamilioni ya dola kwenye mnyororo mkuu hakuna athari yoyote kwa gharama ya kiuchumi ya kukamilisha miamala kwenye Arbitrum au Optimism.

**Domothy:** Ndiyo, zimetenganishwa kabisa. Na kinyume chake ni kweli. Ikiwa uwezo wa upitishaji wa tabaka la 2 (l2) unapanda sana na maelfu ya mikusanyiko inafanya kazi na kusongamana kwenye nafasi ya blobu, kupanda kwa ada ya msingi ya blobu hakutaathiri gharama ya kufanya muamala rahisi kwenye Mtandao Mkuu wa Ethereum. Ada ya msingi ya blobu inafanya kazi sawa na ada ya msingi ya EIP-1559, lakini kwa mwelekeo wake yenyewe. Na kwa swali lako la awali kuhusu uteketezaji — ndiyo, ada ya blobu inazalisha ETH iliyoteketezwa ili kulipia ujumuishaji wa data ya nafasi ya blobu, tofauti kabisa na uteketezaji wa ada ya msingi ya nafasi ya kitalu.

#### Mustakabali wa uwezo wa kuongezeka kwa Ethereum (75:00) {#the-future-of-ethereum-scalability-7500}

**Ryan Sean Adams:** Nataka kufikia kile kinachotokea haswa wakati wa kutolewa kwa 4844. Mwanzoni, ni wazi kuna matarajio makubwa sana kwamba wakati uwezo wa blobu unapofunguka ghafla, hakutakuwa na mahitaji ya kutosha ya rollup katika sekunde hiyo ndogo ili kuijaza kikamilifu. Nafasi ya blobu itakuwa nafuu sana wakati wa uzinduzi. Lakini je, hakuna sheria ya mahitaji yaliyochochewa? Ikiwa una rasilimali za bei nafuu sana, programu zinazotumia rasilimali hizo zinalipuka kwa kiasi.

**Domothy:** Mpito wa awali utashusha ada za tabaka la 2 (l2) kimsingi karibu na sifuri, kwa sababu mikusanyiko yote iliyopo inayoshindana kwa sasa kwa nafasi ya kitalu ya gharama kubwa itahamia bila mshono kwenye dimbwi kubwa karibu tupu la nafasi ya blobu. Hiyo ni upanuzi mkubwa na wa papo hapo wa faida kwa mitandao ya tabaka la 2 (l2), ambayo itapitishwa moja kwa moja kwa watumiaji wakati wanapounganisha mantiki yao mpya ya kuthibitisha na 4844.

Lakini uko sahihi — nafasi ya kitalu ya bei nafuu inasukuma muundo wa programu wa kasi kubwa. Unapoweza ghafla kujenga mchezo mnyororoni ambao unazalisha mamilioni na mamilioni ya mabadiliko madogo ya hali kwa sehemu ya senti kwa sababu gharama ya ziada ya kudumu kwa data imeondoka, uainishaji mpya kabisa wa programu unakuwa na faida kiuchumi ambao haukuwa chini ya vizuizi vya kawaida.

Hii inaweka mwelekeo wa kiuchumi wa kuvutia katika jinsi ETH inavyolimbikiza thamani. Ikiwa miamala ya tabaka la 2 (l2) inalipuka mara 10 au mara 100 kwa sababu ya programu mpya zinazowezekana zinazoendeshwa kwenye upatikanaji wa data unaokaribia kuwa wa bure, kiasi kilichojumuishwa hatimaye kitaanza kushindana kwa nafasi ya blobu. Kisha ada ya msingi ya blobu ya EIP-1559 inapanda kiasili hadi soko lifikie usawa, na kuunda mzunguko endelevu wa kuteketeza ETH huku ukipanua matumizi ya tabaka la 2 (l2).

**David Hoffman:** Inawakilisha mafanikio na ukomavu wa ramani ya njia inayozingatia rollup. Ethereum kama mazingira ya utekelezaji ya monolithic iligonga ukuta ambapo kuongeza uwezo wa upitishaji kwa mstari kuliharibu agizo lake la ugatuzi. Mikusanyiko ilitoa njia ya kukwepa kikwazo cha utekelezaji lakini bado ilikuwa imefungwa kwenye kikwazo cha data cha tabaka la 1 (l1). Nafasi ya blobu inafungua kikwazo cha data kwa njia sawa na mikusanyiko ilivyofungua kikwazo cha utekelezaji. Maboresho haya yatakaposafirishwa, Ethereum inabadilika kikamilifu kutoka kuchakata miamala moja hadi kuchakata mitandao iliyohakikiwa ya utekelezaji.

**Ryan Sean Adams:** Kwa muhtasari wa ratiba, EIP-4844 inakuja kwa matumaini mwishoni mwa mwaka au mapema mwaka ujao, na danksharding kamili inafuata katika mzunguko unaofuata wa maendeleo. Kwa kweli ni kiunzi cha miundombinu kinachohitajika kwa Ethereum kuingiza sayari, na tuko karibu sana na kufanya kazi katika ulimwengu wa kweli. Dom, asante kwa kututembeza kupitia ufunguzi huu mkubwa kwa mtandao.

**Domothy:** Asante kwa kuwa nami.