---
title: "Hotuba Kuu: hali HALISI ya l2"
description: "Mazungumzo kuhusu hali ya sasa ya suluhisho za tabaka la 2 (l2), yakichunguza pengo kati ya ahadi za usalama za rollup na uhalisia na kupendekeza njia kuelekea ugatuaji wa kweli."
lang: sw
youtubeId: "ik2JxmHDmyw"
uploadDate: 2024-11-13
duration: "0:26:15"
educationLevel: advanced
topic:
  - "scaling-and-layer-2"
  - "rollups"
  - "layer-2"
format: presentation
author: Ethereum Foundation
breadcrumb: "Hali ya l2"
---

Hotuba kuu na **Bartek Kiepuszewski**, mwanzilishi wa L2BEAT, katika Devcon SEA inayochunguza hali ya sasa ya suluhisho za tabaka la 2 (l2), pengo kati ya ahadi za usalama za rollup na uhalisia, kategoria mpya za tathmini, na ahadi ya L2BEAT ya kuweka rasilimali muhimu katika kuthibitisha mifumo ya uthibitisho katika mwaka ujao.

*Nakala hii ni nakala inayofikika ya [nakala asili ya video](https://www.youtube.com/watch?v=ik2JxmHDmyw) iliyochapishwa na Taasisi ya Ethereum. Imehaririwa kidogo ili isomeke vizuri.*

#### Utangulizi (0:00) {#introduction-000}

Nikiwa mwanzilishi wa L2BEAT, nina fursa ya kipekee ya kufanya kazi na karibu kila timu ya l2 iliyopo, na tumekuwa tukifanya kazi nao tangu mwanzo kabisa wa nafasi hii — ambayo ni kama miaka minne iliyopita. Hiyo ni ajabu. Wakati unakwenda haraka sana. Tumefanya kazi na waanzilishi wa mapema katika teknolojia ya ZK, tumefanya kazi na Plasma Group ambayo ilibadilisha jina kuwa Optimism, tumefanya kazi na Arbitrum. Na kutoka jukwaa hili ninataka kutambua timu hizi zote, kwa sababu bila msaada wenu hakika tusingekuwa hapa. Kama L2BEAT, tunashukuru sana kwa msaada wote ambao jamii inatupa.

Kwa hivyo hebu tuangalie kile ambacho tumeweza kufikia. Kwanza kabisa, tumeweza kuzindua karibu mikusanyiko 50 na l2 zingine zaidi ya 50. Hilo ni fanikio la kushangaza — ni mifumo mingi, na tuna karibu idadi sawa ya kuzindua katika miezi ijayo. Tumeweka thamani kubwa, jumla ya thamani iliyofungwa (tvl) nyingi, kwenye mifumo hii pia, na ukiangalia chati zote zinapanda juu tu.

Jambo ni kwamba, pamoja na ukuaji huo wote pia inakuja jukumu kubwa. Tunahitaji kuelewa kwamba watumiaji wa mwisho wanaotumia mifumo hii wanaweka pesa kwenye mikusanyiko hii kwa sababu wanaamini kwamba mikusanyiko inarithi usalama wa Ethereum. Kwa utambuzi wa aina hiyo, kwa maoni yangu, tunahitaji kuanza kuwa makini kuhusu usalama.

#### Kuongeza Kiwango cha Ethereum (2:10) {#scaling-ethereum-210}

Pia tumeweza kuongeza kiwango cha Ethereum. Ethereum ilikuwa ikiendelea vizuri kabisa, lakini ilianza kuwa polepole sana kwa mahitaji na ada zilikuwa zikipanda sana. Kwa hivyo hakika tunaongeza kiwango — nambari hizi pia zinapanda. Hii ni ajabu.

Hata hivyo, kuna "lakini." Mnajua, jamani, kila wakati kuna "lakini," sivyo? Na niko hapa tu kuwa mkweli kwenu nyote. Ninataka sana nafasi hii iwe makini, na hii ni fursa yangu ya kuomba msaada wenu ili kuhakikisha kwamba hatushindwi — hatushindwi matarajio ya jamii. Tunahitaji kuanza kuwa makini sana kuhusu usalama wa kile tunachojenga.

Kwa sababu unajua, tumekuwa tukitumia magurudumu ya mafunzo kwa muda mrefu sana. Ikiwa wewe ni mtu mzima unayetumia magurudumu ya mafunzo — na ninarudia, imekuwa miaka minne — basi wewe ni mchanga sana. Ni sawa kutumia magurudumu ya mafunzo ikiwa wewe ni mtoto. Sio sawa kutumia magurudumu ya mafunzo ikiwa wewe ni mtu mzima. Na nadhani ni wakati wa sisi sote kuacha kuona aibu kuhusu hilo. Sote tunapaswa kuzungumza, na hatupaswi kuteseka na ugonjwa wa nguo mpya za mfalme.

#### "Lakini" kubwa: mifumo ya uthibitisho inayokosekana (4:30) {#the-big-but-missing-proof-systems-430}

Kwa hivyo hii "lakini" kubwa ni nini? Kweli, kwanza kabisa, l2 nyingi leo hazina mfumo wa uthibitisho, jambo ambalo linashangaza kwa sababu waanzilishi wa mapema kama StarkNet, kama zkSync, kama Aztec — miaka minne iliyopita walipokuwa wakizindua mikusanyiko yao ya kwanza maalum kwa programu, walikuwa na mifumo ya uthibitisho. Kwa hivyo ndiyo, unaweza kuzindua l2 leo kwa kubofya kitufe kimoja. Hata hivyo, je, hiyo kweli ni l2? Je, hiyo kweli ni rollup? Unachofanya ni kuzindua kitu ambacho kinalindwa na saini-nyingi. Sidhani kama hiyo inatosha.

Hali ya mfumo wa ikolojia leo ni kama hii kwenye mchoro huu. Upande wa kushoto unaweza kuona l2 za sasa zilizo na mfumo wa uthibitisho. Upande wa kulia unaweza kuona l2 za sasa zisizo na mfumo wa uthibitisho. Na ningeweka dau kwamba idadi kubwa ya l2 zijazo hazitakuwa na mfumo wa uthibitisho. Hiyo itajumuisha karibu kila mnyororo wa OP Stack isipokuwa OP Mainnet na Base — na pongezi kwao, kwa njia, wao ni kama mabingwa. Hata hivyo, kila mnyororo mwingine wa OP Stack hauna mfumo wa uthibitisho.

Chati hiyo upande wa kulia pia itajumuisha mrundikano wote wa Orbit, ambao una mfumo wa uthibitisho, hata hivyo kwa kweli uko nyuma ya orodha fupi sana yenye ruhusa. Wakati mwingine orodha hii ni mhusika mmoja tu — ni sawa na mpendekezaji wa hali. Kimsingi ni mpendekezaji wa hali na ni wao tu wanaoweza kujipinga wenyewe. Yaani, nini? Kwa kweli.

#### Mabaraza ya usalama (6:00) {#security-councils-600}

Sasa, l2 nyingi hazitumii mabaraza ya usalama. Tunamaanisha nini kwa baraza la usalama? Baraza la usalama kimsingi ni saini-nyingi inayojumuisha angalau washiriki wanane na inahitaji kiwango cha mwafaka cha 75%. Kwa hivyo unaweza kuifikiria kama saini-nyingi kubwa, lakini sio tu kuhusu ukubwa — ni kuhusu ukweli kwamba tunataka washiriki wawe wamegatuliwa kijiografia. Labda ulisikia jana wasilisho la kushangaza kuhusu hitaji la utofauti wa kijiografia. Hicho ndicho tunachotaka kutoka kwa miundo hii. Na kimsingi, tunataka washiriki muhimu zaidi watoke katika kampuni tofauti na mamlaka tofauti. Hilo ni muhimu sana, na nitakuonyesha baadhi ya mifano ya kwa nini.

Fikiria mabaraza ya usalama kama saini-nyingi hizi zilizoboreshwa sana. Kuna tabaka muhimu sana la kijamii nyuma yao. Kwa hivyo hii ndiyo hali ya sasa ya mambo, na tena, ni mbaya sana. Tuna mabaraza ya usalama tu katika Arbitrum, Optimism, Polygon, zkSync — na ninajua kwamba StarkNet, Scroll, na cha kufurahisha Fuel zinazinduliwa na baraza la usalama. Kila mtu mwingine kimsingi ni saini-nyingi ndogo sana, ya ndani, mara nyingi ya kibinafsi, na kwa kweli ni ngumu sana kutofautisha kati ya saini-nyingi hizi na EOA rahisi.

#### Dhana za uaminifu za upatikanaji wa data (7:25) {#data-availability-trust-assumptions-725}

Jambo la tatu kubwa ambalo tulifanya vibaya ni kwamba l2 nyingi ambazo sio rollup zimewekwa na dhana za uaminifu za upatikanaji wa data mbaya sana. Na ninatumia neno "mbaya sana" — A, kwa sababu ninalipenda, na B, kwa sababu ni mbaya sana, sana.

Angalia mifano hii upande wa kushoto — Arbitrum, StarkEx, Immutable X. Hata hivyo, karibu kila mtu mwingine anachapisha DA kwenye seva yao kwenye chumba cha chini au chochote kile. Hatuna wazo. Hatuna wazo kabisa. Hoja ni kwamba, ni mbaya sana na hawaonekani kujali. Kwa hivyo labda watumiaji hawajali — hatujui. Lakini tunahitaji kuangalia data hiyo kwa kweli na kumwambia kila mtu, hei, hiyo sio kamati ya upatikanaji wa data.

Kamati ya upatikanaji wa data awali iliundwa na kutetewa na StarkWare kwa utekelezaji wa StarkEx na Arbitrum. Lakini hiyo haikuwa hoja — kwamba unaweza kusema "Nina seva moja kwenye chumba changu cha chini, ninaweza kuiita kamati ya upatikanaji wa data." Hiyo haikuwa dhumuni la zoezi hilo.

Kwa hivyo kwa ujumla, nasikitika kusema, lakini kwa sasa katika l2 nyingi, waendeshaji wenye ruhusa wanaweza kuiba au kufungia pesa zako. Tuko hapa kuwafahamisha nyote kuhusu hilo. Samahani kusema hivyo, lakini tunahitaji kubadilisha mtazamo.

#### Kwa nini mifumo ya uthibitisho ni muhimu (8:40) {#why-proof-systems-matter-840}

Kwa nini tunapaswa kujali kuhusu mifumo ya uthibitisho? Kuna angalau sababu tatu nzuri kwa maoni yetu kwa nini sote tunapaswa kuwa na mfumo wa uthibitisho unaofanya kazi.

Moja ni kwamba inaruhusu kujitoa bila ruhusa endapo waendeshaji wote wako chini — na wanaweza kuwa chini kwa sababu yoyote ile. Hivi karibuni tulikuwa na kisa cha dYdX kwenda chini. Waliwaonya watumiaji, watumiaji wengi hawakujitoa. Hata hivyo, ikiwa una mfumo wa uthibitisho, unaweza kufanya mfumo ili kwa njia isiyohitaji ruhusa mtu atachukua udhibiti, au unaweza kujenga njia ya kujitoa kwa dharura ili watumiaji waweze kutoa pesa zao. Hilo ni muhimu sana. Bila mfumo wa uthibitisho huwezi kufanya hivyo — haiwezekani.

Sababu ya pili ni kwamba unaweza kuboresha dhana za uaminifu za baraza la usalama — ukidhani bila shaka unalo. Na sababu ya hilo ni ya kina kidogo. Unachoweza kufanya sasa ni hiki: badala ya hali ambapo mpendekezaji mwenye nia mbaya — na huu ni mchoro unaoonyesha rollup ya optimistic ya kawaida bila mfumo wa uthibitisho, ambayo unaweza kuiona katika OP Stacks nyingi leo — kuna saini-nyingi yenye nguvu sana inayoweza kubatilisha mzizi wa hali, na kuna mpendekezaji anayependekeza mizizi ya hali. Ikiwa pendekezo hilo lina nia mbaya, wanachohitaji kufanya ni kuhonga wachache wa wajumbe wa baraza la usalama ili waangalie pembeni — sio kufanya chochote kibaya, lakini tu kutofanya chochote, ambapo pendekezo lenye nia mbaya litapita na wataiba pesa.

Mara tu unapoanzisha mfumo wa uthibitisho, hali inakuwa ngumu zaidi kwa mpendekezaji mwenye nia mbaya, kwa sababu sasa wanahitaji kuhonga **wengi** wa baraza la usalama. Sio tu kwamba wanapaswa kuhonga wengi, wanapaswa kuwafanya wafanye kitu kibaya — sio tu kuangalia pembeni. Hilo ni pendekezo tofauti sana. Kumfanya mtu aangalie pembeni ni kusema, "Hei, nikikupa dola milioni 10, unapoteza tu funguo zako au unaenda kwa safari ndefu ya ndege ya kimataifa." Ikiwa unataka kumfanya mtu afanye kitu kibaya, hilo ni pendekezo tofauti kabisa. Tunafikiri kwamba hii inabadilisha kimsingi dhana za uaminifu, hasa na baraza la usalama la umma.

Hatimaye, mifumo ya uthibitisho — ikiwa wewe ni Hatua ya 2 — inakuruhusu kuondoa waamuzi wowote wale. Huhitaji baraza la usalama, au ikiwa unalo, ni kwa hali za dharura tu. Kwa hivyo hiyo inaweza kuwa na athari kubwa za udhibiti. Unaweza kutaka kuzindua l2 yako kama mfumo wa Hatua ya 2 tangu mwanzo kabisa. Hilo linawezekana, lakini bila shaka unahitaji kuwa na mfumo wa uthibitisho — kwa hakika unaweza kutaka kuwa na zaidi ya mmoja. Tayari kuna baadhi ya matangazo ya mifumo inayofanya hivyo, kama tangazo la hivi karibuni kutoka kwa timu ya Nethermind inayojenga rollup inayokusudiwa kuwa Hatua ya 2 wakati wa uzinduzi.

#### Kwa nini mabaraza ya usalama, sio saini-nyingi (11:29) {#why-security-councils-not-multisigs-1129}

Hiyo ilikuwa kuhusu mifumo ya uthibitisho. Sasa, kwa nini mabaraza ya usalama na sio tu saini-nyingi rahisi? Sababu ni: usiamini saini-nyingi ni saini-nyingi. Hiyo ndiyo sababu — isipokuwa kuna tabaka la kijamii ambalo linaweza kukushawishi kwamba hizi zimetofautishwa kimsingi.

Tumekuwa na matukio kadhaa makubwa katika historia yetu. Tulikuwa na Multichain ambayo ilidai ilikuwa imegatuliwa sana, na ikawa kwamba hapana, hawakuwa — na hili ni dai ambalo huwezi kuthibitisha kwa uhuru. Shambulio kubwa, au kazi ya ndani, au utapeli — hatuna uhakika.

Kisha tulikuwa na hali na Oasis, ambapo walifikiwa na mahakama ya Uingereza na walilazimika kutumia saini-nyingi kutoa baadhi ya pesa kutoka kwa itifaki. Ingekuwa haiwezekani kufanya hivyo ikiwa ungekuwa na baraza la usalama lililotofautishwa kijiografia, kwa sababu hakuna amri ya mahakama inayoweza kumfikia kila mtu.

Hatimaye, hivi karibuni tulikuwa na shambulio kwenye saini-nyingi. Usifikirie hata kwa sekunde moja kwamba saini-nyingi haziwezi kushambuliwa. Hatimaye tunapaswa kuziondoa zote.

Kwa hivyo kwa muhtasari: ikiwa una rollup ya Hatua ya 0 isiyo na baraza la usalama, kimsingi mwendeshaji mwenye nia mbaya anaweza kufanya chochote anachotaka na pesa zako. Ikiwa wewe ni rollup ya Hatua ya 0 yenye baraza la usalama, basi mshambuliaji anahitaji kuhonga wachache wa baraza la usalama — labda ni jambo gumu kufanya, lakini ni rahisi zaidi kuliko kuhonga wengi wa baraza la usalama, jambo ambalo ungehitaji kufanya ikiwa rollup yako ina mfumo wa uthibitisho. Na hatimaye, hakuna anayeweza kuiba pesa zako ikiwa wewe ni Hatua ya 2. Hiyo ndiyo ahadi ya kufika Hatua ya 2.

#### Uainishaji mpya uliopendekezwa (13:10) {#proposed-reclassification-1310}

Swali ni: je, tuna motisha sahihi kwa miradi kujali kweli? Shida ni kwamba jambo pekee tunaloweza kufanya — sisi kama L2BEAT na sisi kama jamii ya Ethereum — ni kutumia shinikizo la kijamii. Vitalik alisema kwamba kuanzia mwaka ujao atapanga kutaja hadharani tu l2 ambazo ni Hatua ya 1. Hapo awali hata alisema kwamba hataita mifumo mikusanyiko ikiwa sio Hatua ya 1.

Kwa hivyo tulikuwa tunajiuliza tunaweza kufanya nini. Kwa sasa tuna hatua za mikusanyiko. Hatuna hatua za Validium na optimium. Tulikuwa tunajiuliza kwa muda mrefu — labda tungeweza kuanzisha "Hatua ya 0+" kwa mifumo iliyo na mifumo ya uthibitisho lakini bado sio Hatua ya 1. Lakini baada ya miezi ya majadiliano, tuliamua: hapana, ni wakati wa kukua.

Tunachopendekeza kwa jamii — na hii itaenda kwenye jukwaa kwa maoni ya jamii — ni hiki. Kwanza, tunataka kuunda kategoria tofauti kwa mifumo. Tofauti kuu ni kwamba utalazimika kuwa na mfumo wa uthibitisho ili kuwa Hatua ya 0. Kwa hivyo kwa mfano, StarkNet leo itakuwa Hatua ya 0 chini ya uainishaji huu. Minyororo yote ya OP Stack ambayo haina mfumo wa uthibitisho — isipokuwa Base na Optimism — haitaingia katika kategoria hii. Na bila shaka, tutatoa muda kwa mifumo kurekebisha. Hiyo ndiyo kategoria kuu, na hiyo inapaswa kuwa kama ligi kuu ya mifumo.

Kisha una kategoria nyingine ya mifumo ambayo haitumii DA ya Ethereum. Wanatumia dhana za uaminifu za ziada zinazokuja na DA ya nje. Tunaziita "alt-DA" lakini zingejumuisha Validium, optimium, na ujenzi wowote wa mseto unaoweza kuunda. Hata hivyo, lazima zikupe dhamana nzuri za DA — hiyo haiwezi kuwa chumba chako cha chini. Hiyo inapaswa kuwa kamati ya upatikanaji wa data yenye ukubwa unaofaa, au ikiwa unatumia Celestia au Avail, unahitaji kutumia daraja.

#### Kategoria ya "zingine" na ahadi ya L2BEAT (16:05) {#the-others-category-and-l2beats-pledge-1605}

Vipi kuhusu zingine? Tutaziweka katika kategoria ya tatu, ambayo tunaiita — na sasa ninasubiri maoni ya jamii kuhusu jinsi ya kutaja mifumo hii — jina letu la kazi ni "zingine." Hoja ni kwamba zinalindwa na saini-nyingi, na tutafichua saini-nyingi hizi kwa jinsi zilivyo. Hicho ndicho tunachotaka kufanya katika UI yetu.

UI itaonekana takriban hivi: utaona mchanganuo huu — mikusanyiko, Validium na optimium, na zingine. Na upangaji wa msingi utakuwa kwa usalama, sio kwa jumla ya thamani iliyofungwa (tvl). Tusifuate tvl na usalama mbaya — hiyo itaisha vibaya sana.

Tutatetea miradi ya Hatua ya 1 na Hatua ya 2. Tutaangalia miradi ya Hatua ya 0 kama washindani. Kwa "zingine," tunafurahi kuziorodhesha — tutakuwa huru sana. Unahitaji tu kimsingi kuendana na Ethereum na kwa wazi kuwa na daraja linalokuruhusu kuhamisha pesa. Hata hivyo, tutaangalia dhana za uaminifu na saini-nyingi, na tunatumai kwamba polepole lakini kwa hakika mifumo itatoka kwenye "zingine" kwenda kwenye Validium/optimium au kwenye mikusanyiko.

Hivi ndivyo tunavyofikiri kategoria ya "zingine" ingeonekana — hii ndiyo data halisi sasa hivi, mifumo halisi inayoweza kuingia katika kategoria hii ikiwa hawataanzisha mfumo wa uthibitisho. Utaona haswa nani ni mpendekezaji, nani ni mpinzani, na nani ni mboreshaji. Jambo la kuchekesha ni kwamba, unaweza kuona hilo leo kwenye L2BEAT — ni kwamba tu habari hii imefichwa sana katika ukurasa wa maelezo kiasi kwamba ninaweka dau watafiti na wapenzi tu ndio wanaoiangalia. Yote inapatikana leo. Hata hivyo, tunataka kufichua data kwa watumiaji wa mwisho. Tunataka watumiaji wa mwisho wafahamu kweli kile kinachoendelea, ili sote tuwajibike kwa mifumo tunayojenga.

Je, inatosha kusema tu "Nina mfumo wa uthibitisho"? Hapana. Ahadi yetu kwa jamii kama L2BEAT ni kwamba mwaka ujao tutaweka rasilimali muhimu katika kuangalia kwa makini sana na kwa kina sana katika mifumo hii ya uthibitisho ili kuhakikisha kwamba ni thabiti na kamili. Tutachambua ZK na optimistic. Tutaingia kwenye msimbo wa chanzo, tutaangalia jinsi ulivyounda usanidi unaoaminika wako, tutaangalia saketi zako na kuona ni nini hasa kinathibitishwa mnyororoni. Tunataka kufanya kila kitu kiwe wazi sana ili dhana za uaminifu ziwasilishwe wazi — na muhimu zaidi, mfumo wako wa uthibitisho hauwezi kufichwa nyuma ya orodha fupi isiyo na maana.

Tunaajiri watafiti. Tutafanya kazi hiyo yote. Hii ni ahadi yetu kwa mwaka ujao. Natumai mwaka ujao utakuwa mwaka wa l2 na mikusanyiko — hata hivyo, sio kuhusu kuzindua rollup kwa kubofya kitufe kimoja. Hoja ni kwamba unataka kuweza kuzindua mfumo wenye usalama mzuri. Kwa hakika unataka kurithi usalama mwingi iwezekanavyo kutoka kwa Ethereum. Kuna kazi nyingi ya kufanya kwa sisi sote kufikia hilo. Lakini ikiwa hatutafanya hivyo, basi tunachofanya kimsingi ni kuunda maelfu ya minyororo ya kando isiyo salama. Hatutaki hilo, nadhani, kama jamii.

#### Maswali na Majibu (18:45) {#qa-1845}

**Mwenyeji:** Hebu tufanye Maswali na Majibu. Je, ni muhimu kwamba mikusanyiko iwe na mpangaji uliogatuliwa, au mifumo mingine ya usalama inatosha?

**Bartek Kiepuszewski:** Hili ni swali zuri sana na muhimu. Nadhani kuna miundo tofauti ambayo tutaiona. Sidhani kama kugatua mpangaji ni muhimu sana kwa usalama wa pesa za watumiaji, lakini inaweza kuwa muhimu kwa upinzani wa udhibiti wa wakati halisi katika hali fulani. Vitalik alisema wakati wa hotuba yake ya ufunguzi kwamba siku zijazo inaweza kuwa kwamba tunaona mikusanyiko ikienda kulingana na msingi — kutumia miundombinu ya Ethereum kupambana na upinzani wa udhibiti wa wakati halisi — wakati zingine, kama tuseme MegaETH, zinaweza kuwa na mpangaji aliyewekwa kati sana na kutegemea tu njia ya kujitoa kwa dharura. Tunaweza kuona ujenzi wa mseto. Nadhani nafasi ya muundo ni kubwa, na sasa hivi katika L2BEAT tunataka sana kuona nini kitatokea na jinsi hilo litakavyocheza.

**Mwenyeji:** Je, mifumo ya uthibitisho inayotegemea TEE itachukuliwa kama Hatua ya 2 hata kama inamaanisha uaminifu kwa mtengenezaji wa vifaa?

**Bartek Kiepuszewski:** Jibu fupi ni hapana, kwa sababu kwa ujenzi tunaouona leo, ikiwa unatumia SGX, Intel inaweza kuwasilisha uthibitisho na wanaweza kuzuia, kuiba, au kufungia chochote wanachotaka bila mtu yeyote kugundua — na bila Ethereum kugundua. Hata hivyo, pamoja na kazi yote inayowekwa mbele kuunda TEE bila hitaji la uaminifu, bila ruhusa — ninaambiwa kwamba hii kwa kweli ni kazi ya kusisimua sana. Lakini jibu fupi: leo, hapana.

**Mwenyeji:** Kwa nini Optimism imeainishwa kama Hatua ya 1? Kulingana na tathmini, wao sio — Taasisi inadhibiti mchakato wa pendekezo kabisa.

**Bartek Kiepuszewski:** Kimsingi wanakidhi vigezo vyote. Sio kweli kuhusu mchakato wa pendekezo — ni kuhusu nani anadhibiti pesa. Unaweza kuwa na mpendekezaji aliyewekwa kati, hata hivyo kuna mbadala. Wakienda chini, basi mfumo mzima unakuwa bila ruhusa zaidi. Nadhani ni muhimu kutambua jukumu la baraza la usalama ni nini. Tunataka mifumo ya Hatua ya 1 ikuruhusu kujitoa ikiwa mpendekezaji aliyewekwa kati atasimama. Kwa mfano, na dYdX, pendekezo lilikuwa limewekwa kati sana, hata hivyo waliposimama, watu wangeweza kujitoa. Kwa hivyo sio kuhusu kama umewekwa kati au umegatuliwa — ni kuhusu kama unaweza kujitoa kwa njia isiyohitaji ruhusa.

Walikidhi vigezo vyote. Tulikuwa tunaboresha, kwa njia — vigezo sio kitu ambacho kimewekwa kwenye jiwe kwa sababu mifumo hii yote inabadilika, kwa hivyo tunahitaji kubadilika na mifumo hii. Vigezo vinaweza kuwa vinabadilika kidogo, na tunaiangalia kwa karibu sana Optimism na Arbitrum kwa sababu wazi wao ndio viongozi wawili. Kuna mambo mengi madogo ambayo sina muda wa kuyaingia. Lakini sio kama una uteuzi wa hatua milele — ikiwa kuna habari mpya au kitu ambacho labda tuliruka au kukosa, inawezekana kabisa kwamba unaweza kupoteza uteuzi huo.

**Mwenyeji:** Ni zipi sababu kuu za miradi kutojenga kuelekea Hatua ya 1?

**Bartek Kiepuszewski:** Utata, wakati, gharama, talanta. Inagharimu sana kwa kushangaza. Kama nilivyosema, waanzilishi miaka minne iliyopita walikuwa kimsingi wanajenga — dYdX ilikuwa kweli moja ya kwanza, ikiwa sio ya kwanza, rollup ya ZK. Ilikuwa maalum kwa programu, lakini bado ilikuwa ya kwanza. Na kama sio kwa mambo madogo, ingekuwa Hatua ya 2 — kwa kweli, ni mchakato wa utawala ambao tunahitaji kwa Hatua ya 2 ambao unashindwa. Lakini kwa madhumuni na makusudi yote, ni mfumo wa Hatua ya 2. Ilijengwa miaka minne iliyopita, kwa hivyo sio kama haiwezekani.

Nadhani kinachofanya iwe ngumu sana leo kwa mikusanyiko yote kufanya hivi, kwa kweli, ni kwamba idadi kubwa ya mikusanyiko haijengwi na timu — inazinduliwa na watoa huduma wa rollup-kama-huduma, na tunahitaji kuwapa motisha ili wafanye vizuri zaidi. Na ni ngumu. Hakuna aliyesema kwamba itakuwa rahisi.