---
title: Glamsterdam
description: "Glamsterdam ni uboreshaji unaofuata wa Ethereum baada ya Fusaka. Jifunze jinsi inavyopanga kuongeza uwezo wa tabaka la 1 kwa uchakataji sambamba, ePBS na upangaji bei wa haki zaidi wa hali."
lang: sw
template: upgrade
---

<Alert variant="update">
<AlertContent>
<AlertDescription>
Uboreshaji wa Glamsterdam ni hatua moja tu katika malengo ya maendeleo ya muda mrefu ya Ethereum. Jifunze zaidi kuhusu [ramani ya njia ya itifaki](/roadmap/) na [maboresho yaliyopita](/ethereum-forks/).
</AlertDescription>
</AlertContent>
</Alert>

Uboreshaji ujao wa Glamsterdam wa [Ethereum](/) umeundwa kusafisha njia kwa kizazi kijacho cha kuongeza uwezo. Glamsterdam imepewa jina kutokana na mchanganyiko wa "Amsterdam" (uboreshaji wa tabaka la utekelezaji, uliopewa jina la eneo la awali la Devconnect) na "Gloas" (uboreshaji wa tabaka la mwafaka, uliopewa jina la nyota).

Kufuatia maendeleo yaliyofanywa katika uboreshaji wa [Fusaka](/roadmap/fusaka/), Glamsterdam inalenga katika kuongeza uwezo wa tabaka la 1 (l1) kwa kupanga upya jinsi mtandao unavyochakata miamala na kusimamia hifadhidata yake inayokua, ikisasisha kimsingi jinsi Ethereum inavyounda na kuthibitisha vitalu.

Wakati Fusaka ililenga katika maboresho ya kimsingi, Glamsterdam inaendeleza malengo ya "Kuongeza Uwezo wa L1" na "Kuongeza Uwezo wa Blobs" kwa kuweka kisheria utengano wa majukumu kati ya washiriki tofauti wa mtandao, na kuanzisha njia bora zaidi za kushughulikia data ili kuandaa [hali](/glossary/#state) kwa usambambishaji wa uwezo wa upitishaji wa juu.

Maboresho haya yanahakikisha Ethereum inasalia kuwa ya haraka, nafuu, na iliyogatuliwa inaposhughulikia shughuli zaidi, huku ikiweka mahitaji ya maunzi yakiwa yanadhibitika kwa watu wanaoendesha [nodi](/glossary/#node) nyumbani.

<VideoWatch slug="ethereum-evolution-glamsterdam" />

## Maboresho katika Glamsterdam {#improvements-in-glamsterdam}

<Alert variant="info">
<AlertContent>
<AlertDescription>
Kumbuka: Makala haya yanaangazia uteuzi wa Mapendekezo ya Kuboresha Ethereum (EIPs) yaliyopangwa kujumuishwa katika Glamsterdam. Mapendekezo ya ziada yaliyopangwa yanayojaribiwa katika mitandao ya majaribio ya wasanidi (devnets) yanajumuisha EIP-7688, EIP-7778, EIP-7843, EIP-7976, EIP-7981, EIP-8024, eth/72 (EIP-8070), EIP-8136, snap/2 (EIP-8189), EIP-8246, na EIP-8282. Upeo umesitishwa lakini bado unaweza kubadilika kabla ya Mtandao Mkuu, kwani meta EIP inasalia katika rasimu. Kwa masasisho ya hivi punde ya hali, tazama [uboreshaji wa Glamsterdam kwenye Forkcast](https://forkcast.org/upgrade/glamsterdam).

Ikiwa unataka kuongeza EIP ambayo inazingatiwa kwa Glamsterdam, lakini haijaongezwa kwenye ukurasa huu bado, [jifunze jinsi ya kuchangia kwenye ethereum.org hapa](/contributing/).
</AlertDescription>
</AlertContent>
</Alert>

Uboreshaji wa Glamsterdam unajikita katika malengo makuu matatu:

- Kuharakisha uchakataji (usambambishaji): Kupanga upya jinsi mtandao unavyorekodi utegemezi wa data, ili uweze kuchakata miamala mingi kwa usalama kwa wakati mmoja badala ya mfuatano wa polepole, mmoja baada ya mwingine.
- Kupanua uwezo: Kugawanya kazi nzito ya kuunda na kuthibitisha vitalu, kuupa mtandao muda zaidi wa kueneza kiasi kikubwa cha data bila kupunguza kasi.
- Kuzuia uvimbe wa hifadhidata (uendelevu): Kurekebisha ada za mtandao ili kuakisi kwa usahihi gharama ya maunzi ya muda mrefu ya kuhifadhi data mpya, kufungulia ongezeko la kikomo cha gesi la siku zijazo huku ukizuia kushuka kwa utendaji wa maunzi.

Kwa ufupi, Glamsterdam itaanzisha mabadiliko ya kimuundo ili kuhakikisha kwamba kadiri mtandao unavyoongeza uwezo, unasalia kuwa endelevu na utendaji unakaa juu.

## Kuongeza Uwezo wa L1 & uchakataji sambamba {#scale-l1}

Uongezaji uwezo wa maana wa tabaka la 1 (l1) unahitaji kuondokana na dhana za uaminifu nje ya itifaki na vikwazo vya utekelezaji wa mfululizo. Glamsterdam inashughulikia hili kwa kuweka kisheria utengano wa majukumu fulani ya ujenzi wa kitalu na kuanzisha miundo mipya ya data inayoruhusu mtandao kujiandaa kwa uchakataji sambamba.

### Kivutio Kikuu: Utengano wa Mpendekezaji na Mjengaji Uliowekwa Kisheria (ePBS) {#epbs}

<EipTag upgrade="glamsterdam" id={7732} />

- Huondoa dhana za uaminifu nje ya itifaki na utegemezi kwa wapitishaji wa wahusika wengine
- Husaidia kuongeza uwezo wa tabaka la 1 (l1) kwa kuruhusu mizigo mikubwa zaidi kupitia madirisha yaliyopanuliwa ya uenezaji
- Huanzisha malipo ya mjenzi bila hitaji la uaminifu moja kwa moja kwenye itifaki 
- Inahitaji masasisho ya kisanifu kwa mabwawa ya uwekaji dhamana ili kuwezesha ufuatiliaji bila hitaji la uaminifu, ingawa uzoefu wa jumla wa mtumiaji wa uwekaji dhamana unaboreshwa na mchakato ulioboreshwa wa uteuzi wa mjenzi

Hivi sasa, mchakato wa kupendekeza na kujenga vitalu unajumuisha makabidhiano kati ya wapendekezaji wa kitalu na wajenzi wa kitalu. Uhusiano kati ya wapendekezaji na wajenzi sio sehemu ya itifaki kuu ya Ethereum, kwa hivyo unategemea programu za kati za wahusika wengine wanaoaminika, programu (wapitishaji), na uaminifu nje ya itifaki kati ya vyombo.

Uhusiano wa nje ya itifaki kati ya wapendekezaji na wajenzi pia unaunda "njia ya moto" wakati wa uthibitishaji wa kitalu ambayo inalazimisha [wathibitishaji](/glossary/#validator) kuharakisha utangazaji na utekelezaji wa muamala katika dirisha finyu la sekunde 2, ikipunguza kiasi cha data ambacho mtandao unaweza kushughulikia.

**Utengano wa Mpendekezaji na Mjengaji Uliowekwa Kisheria (ePBS, au EIP-7732)** hutenganisha rasmi kazi ya mpendekezaji (ambaye huchagua kitalu cha mwafaka) kutoka kwa mjenzi (ambaye hukusanya mzigo wa utekelezaji), ikiweka kisheria makabidhiano haya moja kwa moja kwenye itifaki. 

Kujenga ubadilishanaji bila hitaji la uaminifu wa mzigo wa kitalu kwa malipo moja kwa moja kwenye itifaki huondoa hitaji la programu za kati za wahusika wengine (kama MEV-Boost). Hata hivyo, wajenzi na wapendekezaji bado wanaweza kuchagua kutumia wapitishaji au programu za kati za nje ya itifaki kwa vipengele changamano ambavyo bado si sehemu ya itifaki kuu. 

Ili kushughulikia kikwazo cha "njia ya moto", ePBS pia inaanzisha Kamati ya Uwakati wa Mzigo (PTC) na mantiki ya tarehe ya mwisho mbili, ikiruhusu wathibitishaji kuthibitisha kitalu cha mwafaka na uwakati wa mzigo wa utekelezaji kando ili kuongeza uwezo wa upitishaji.

<VideoWatch slug="proposer-builder-separation" />

Kutenganisha majukumu ya mpendekezaji na mjenzi katika kiwango cha itifaki hupanua dirisha la uenezaji (au muda unaopatikana wa kueneza data kwenye mtandao) kutoka sekunde 2 hadi takriban sekunde 9.

Kwa kubadilisha programu za kati na wapitishaji wa nje ya itifaki na mbinu za ndani ya itifaki, ePBS inapunguza utegemezi wa uaminifu na inaruhusu Ethereum kuchakata kwa usalama kiasi kikubwa zaidi cha data (kama blobs zaidi kwa [tabaka la 2 (l2)](/glossary/#layer-2)) bila kuupa mtandao msongo.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-7732](https://eips.ethereum.org/EIPS/eip-7732)

### Kivutio Kikuu: Orodha za Ufikiaji za Kiwango cha Kitalu (BALs) {#bals}

<EipTag upgrade="glamsterdam" id={7928} />

- Huondoa vikwazo vya uchakataji wa mfululizo kwa kutoa ramani ya mapema ya utegemezi wote wa muamala, ikiweka mazingira kwa wathibitishaji kuchakata miamala mingi sambamba badala ya mmoja baada ya mwingine
- Huruhusu nodi kusasisha rekodi zao kwa kusoma matokeo ya mwisho bila kuhitaji kurudia kila muamala (usawazishaji usio na utekelezaji), na kuifanya iwe haraka sana kusawazisha nodi kwenye mtandao
- Huondoa ubashiri, ikiruhusu wathibitishaji kupakia mapema data yote muhimu kwa wakati mmoja badala ya kuigundua hatua kwa hatua, jambo ambalo hufanya uthibitishaji kuwa wa haraka zaidi

Ethereum ya leo ni kama barabara ya njia moja; kwa sababu mtandao haujui ni data gani muamala utahitaji au kubadilisha (kama ni akaunti zipi muamala utagusa) hadi muamala uendeshwe, wathibitishaji lazima wachakate miamala mmoja baada ya mwingine katika mstari mkali, wa mfululizo. Ikiwa wangejaribu kuchakata miamala yote kwa wakati mmoja, bila kujua utegemezi huu, miamala miwili inaweza kujaribu kwa bahati mbaya kubadilisha data sawa kabisa kwa wakati mmoja, na kusababisha makosa.

**Orodha za Ufikiaji za Kiwango cha Kitalu (BALs, au EIP-7928)** hufanya kazi kama ramani kwa mtandao, ikielezea ni sehemu zipi za hifadhidata zitafikiwa kabla ya kazi kuanza. Tabaka la utekelezaji huhifadhi Orodha kamili ya Ufikiaji wa Kitalu, ikijumuisha kila mabadiliko ya akaunti ambayo miamala itagusa, pamoja na matokeo ya mwisho ya mabadiliko hayo (ufikiaji wote wa hali na thamani za baada ya utekelezaji). Ili kuweka vitalu vikiwa vyepesi, kichwa cha kizuizi kina uwanja mpya wenye alama ya kipekee ya kidijitali (rekodi ya heshi) ya orodha hii.

Kwa sababu zinatoa mwonekano wa papo hapo wa miamala ipi haiingiliani, BALs huruhusu nodi kufanya usomaji sambamba wa diski, zikichukua taarifa kwa miamala mingi kwa wakati mmoja. Mtandao unaweza kupanga kwa usalama miamala isiyohusiana na kuichakata sambamba.

Kwa kuwa BAL inajumuisha matokeo ya mwisho ya miamala (thamani za baada ya utekelezaji), wakati nodi za mtandao zinahitaji kusawazisha kwa hali ya sasa ya mtandao, zinaweza kunakili matokeo hayo ya mwisho ili kusasisha rekodi zao. Wathibitishaji hawahitaji tena kurudia miamala yote changamano kutoka mwanzo ili kujua nini kilitokea, na kuifanya iwe haraka na rahisi kwa nodi mpya kujiunga na mtandao.

Usomaji sambamba wa diski uliowezeshwa na BALs utakuwa hatua muhimu kuelekea siku zijazo ambapo Ethereum inaweza kuchakata miamala mingi kwa wakati mmoja, ikiongeza kwa kiasi kikubwa kasi ya mtandao.

#### eth/71 Ubadilishanaji wa Orodha ya Ufikiaji wa Kitalu {#bale}

<EipTag upgrade="glamsterdam" id={8159} />

Ubadilishanaji wa Orodha ya Ufikiaji wa Kitalu (eth/71 au EIP-8159) ni mshirika wa moja kwa moja wa kimtandao kwa orodha za ufikiaji za kiwango cha kitalu. Wakati BALs zinafungua utekelezaji sambamba, eth/71 inaboresha itifaki ya rika-kwa-rika ili kuruhusu nodi kushiriki orodha hizi kwenye mtandao. Sasa inahitajika kwa wateja wote wa tabaka la utekelezaji, ubadilishanaji wa orodha ya ufikiaji wa kitalu utawezesha usawazishaji wa haraka na kuruhusu nodi kufanya masasisho ya hali yasiyo na utekelezaji.

**Rasilimali**:

- [Uainisho wa kiufundi wa EIP-7928](https://eips.ethereum.org/EIPS/eip-7928)
- [Uainisho wa kiufundi wa EIP-8159](https://eips.ethereum.org/EIPS/eip-8159)

## Uendelevu wa mtandao {#network-sustainability}

Kadiri mtandao wa Ethereum unavyokua kwa kasi, ni muhimu kuhakikisha kwamba gharama ya kuutumia inalingana na uchakavu wa maunzi yanayoendesha Ethereum. Mtandao unahitaji kuongeza vikomo vyake vya uwezo wa jumla ili kuongeza uwezo kwa usalama na kuchakata miamala zaidi.

### Ongezeko la gharama ya gesi ya uundaji wa hali {#state-creation-gas-cost-increase}

<EipTag upgrade="glamsterdam" id={8037} />

- Huhakikisha kwamba ada za kuunda akaunti mpya au mikataba mahiri zinaakisi kwa usahihi mzigo wa muda mrefu zinaoweka kwenye hifadhidata ya Ethereum
- Huweka **gharama isiyobadilika kwa kila baiti ya hali (CPSB)** ikilenga kiwango salama na kinachotabirika cha ukuaji cha 120 GiB/mwaka, ikihakikisha maunzi ya kawaida ya kimwili yanaweza kuendelea kuendesha mtandao
- Hutenganisha uhasibu wa ada hizi maalum kwenye hifadhi mpya, ikiondoa vikomo vya zamani vya muamala na kuruhusu wasanidi kusambaza programu kubwa na changamano zaidi

Kuongeza akaunti mpya, tokeni, na [mikataba mahiri](/glossary/#smart-contract) huunda data ya kudumu (inayojulikana kama "hali") ambayo kila kompyuta inayoendesha mtandao lazima ihifadhi kwa muda usiojulikana. Ada za sasa za kuongeza au kusoma data hii haziendani na si lazima ziakisi mzigo halisi wa muda mrefu wa uhifadhi zinaoweka kwenye maunzi ya mtandao.

Baadhi ya vitendo vinavyounda hali kwenye Ethereum, kama vile kuunda akaunti mpya au kusambaza mikataba mahiri mikubwa, vimekuwa vya gharama ya chini kiasi ikilinganishwa na nafasi ya kudumu ya uhifadhi vinayochukua kwenye nodi za mtandao, kwa mfano, usambazaji wa mkataba ni wa bei nafuu zaidi kwa kila baiti kuliko kuunda nafasi za uhifadhi.

Bila marekebisho, ukuaji wa hali ya Ethereum ungekuwa usio endelevu kadiri mtandao unavyoongeza uwezo kuelekea sakafu ya kikomo cha gesi cha 200M iliyowezeshwa na Glamsterdam (huku wasanidi kwa sasa wakijaribu katika kikomo cha gesi cha kitalu cha marejeleo cha 150M ili kupata upangaji bei sahihi wa hali).

**Ongezeko la gharama ya gesi ya uundaji wa hali (au EIP-8037)** huoanisha gharama kwa kuziunganisha na ukubwa halisi wa data inayoundwa, ikisasisha ada ili zilingane na kiasi cha data ya kudumu ambayo operesheni inaunda au kufikia.

EIP-8037 pia inaanzisha muundo wa hifadhi ili kusimamia gharama hizi kwa kutabirika zaidi; malipo ya gesi ya hali huchota kutoka kwa `state_gas_reservoir` kwanza, na msimbo wa operesheni wa `GAS` hurudisha tu `gas_left`, ikizuia fremu za utekelezaji kukokotoa vibaya gesi inayopatikana. Ili kusaidia hili, kazi muhimu za usuli hupewa kibali cha ziada cha mafuta ambacho huenda moja kwa moja kwenye hifadhi hii maalum, ikihakikisha operesheni muhimu za mtandao hazitashindwa kwa sababu tu kuhifadhi data ya kudumu kunahitaji rasilimali zaidi.

Kabla ya EIP-8037, kazi ya kimahesabu (uchakataji amilifu) na uhifadhi wa data wa kudumu (kuhifadhi mkataba mahiri kwenye hifadhidata ya mtandao) zote zinashiriki kikomo sawa cha gesi. Muundo wa hifadhi hugawanya uhasibu: kikomo cha gesi kwa kazi halisi ya kimahesabu ya muamala (uchakataji) na kwa uhifadhi wa data wa muda mrefu (gesi ya hali). Kutenganisha hizi mbili husaidia kuzuia ukubwa kamili wa data ya programu kufikia kikomo cha gesi; mradi wasanidi wanatoa fedha za kutosha kujaza hifadhi kwa uhifadhi wa data, wanaweza kusambaza mikataba mahiri mikubwa na changamano zaidi.

Kupanga bei ya uhifadhi wa data kwa usahihi na kutabirika zaidi kutasaidia Ethereum kuongeza kasi na uwezo wake kwa usalama bila kuvimbisha hifadhidata. Uendelevu huu utaruhusu waendeshaji wa nodi kuendelea kutumia maunzi ya bei nafuu (kiasi) kwa miaka ijayo, kuweka uwekaji dhamana wa nyumbani ukiendelea kupatikana ili kudumisha ugatuzi wa mtandao.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-8037](https://eips.ethereum.org/EIPS/eip-8037)

### Sasisho la gharama ya gesi ya ufikiaji wa hali {#state-access-gas-cost-update}

<EipTag upgrade="glamsterdam" id={8038} />

- Huongeza gharama za gesi kwa wakati programu zinasoma au kusasisha taarifa iliyohifadhiwa kwa kudumu kwenye Ethereum (misimbo ya operesheni ya ufikiaji wa hali) ili kulingana kwa usahihi na kazi ya kimahesabu ambayo amri hizi zinahitaji
- Huimarisha ustahimilivu wa mtandao kwa kuzuia mashambulizi ya kunyimwa huduma ambayo hutumia vibaya operesheni za kusoma data ambazo ni za bei nafuu isivyo asili

Kadiri hali ya Ethereum imekua, kitendo cha kutafuta na kusoma data ya zamani ("ufikiaji wa hali") kimekuwa kizito na cha polepole kwa nodi kuchakata. Ada za vitendo hivi zimesalia sawa ingawa sasa ni ghali kidogo kutafuta taarifa (kwa upande wa nguvu ya kimahesabu).

Kama matokeo, baadhi ya amri maalum kwa sasa zina bei ya chini kulingana na kazi zinazolazimisha nodi kufanya. `EXTCODESIZE` na `EXTCODECOPY` zina bei ya chini, kwa mfano, kwa sababu zinahitaji usomaji mbili tofauti wa hifadhidata—moja kwa kipengee cha akaunti, na ya pili kwa ukubwa halisi wa msimbo au msimbo wa baiti.

**Sasisho la gharama ya gesi ya ufikiaji wa hali (au EIP-8038)** huongeza viwango vya gesi kwa misimbo ya operesheni ya ufikiaji wa hali, kama vile kutafuta data ya akaunti na mkataba, ili kuoanisha na utendaji wa kisasa wa maunzi na ukubwa wa hali.

Kuoanisha gharama ya ufikiaji wa hali pia husaidia kuifanya Ethereum kuwa stahimilivu zaidi. Kwa sababu vitendo hivi vizito vya kusoma data ni vya bei nafuu isivyo asili, mshambuliaji mwenye nia mbaya anaweza kujaza mtandao na maelfu ya maombi changamano ya data katika kitalu kimoja kabla ya kufikia kikomo cha ada cha mtandao, na uwezekano wa kusababisha mtandao kukwama au kuanguka (shambulio la kunyimwa huduma). Hata bila nia mbaya, wasanidi hawahimizwi kiuchumi kujenga programu bora ikiwa kusoma data ya mtandao ni nafuu sana.

Kwa kupanga bei ya vitendo vya ufikiaji wa hali kwa usahihi zaidi Ethereum inaweza kuwa stahimilivu zaidi dhidi ya kupungua kwa kasi kwa bahati mbaya au kwa makusudi, huku kuoanisha gharama za mtandao na mzigo wa maunzi kunathibitisha msingi endelevu zaidi kwa ongezeko la kikomo cha gesi la siku zijazo.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-8038](https://eips.ethereum.org/EIPS/eip-8038)

## Ustahimilivu wa mtandao {#network-resilience}

Maboresho ya majukumu ya mthibitishaji na michakato ya kujitoa yanahakikisha uthabiti wa mtandao wakati wa matukio ya ukataji wa watu wengi na kuharakisha jinsi waweka dhamana wanavyoweza kuhamisha dhamana yao haraka. Maboresho haya hufanya mtandao kuwa thabiti zaidi na kuhakikisha kwamba washiriki wote, wakubwa na wadogo, wanatendewa kwa haki.

### Kuwatenga wathibitishaji waliokatwa kupendekeza {#exclude-slashed-validators}

<EipTag upgrade="glamsterdam" id={8045} />

- Huzuia wathibitishaji walioadhibiwa (waliokatwa) kuchaguliwa kupendekeza vitalu vya siku zijazo, ikiondoa nafasi zilizokosa zilizohakikishwa
- Huiweka Ethereum ikiendelea vizuri na kwa kutegemewa, ikizuia kukwama kali katika kesi ya tukio la ukataji wa watu wengi

Hivi sasa, hata kama mthibitishaji amekatwa (ameadhibiwa kwa kuvunja sheria au kutofanya kazi kama inavyotarajiwa), mfumo bado unaweza kuwachagua kuongoza kitalu katika siku za usoni unapotengeneza mitazamo ya mbele ya mpendekezaji wa siku zijazo.

Kwa sababu vitalu kutoka kwa wapendekezaji waliokatwa hukataliwa kiotomatiki kama batili, hii husababisha mtandao kukosa nafasi na kuchelewesha urejeshaji wa mtandao wakati wa matukio ya ukataji wa watu wengi.

**Kuwatenga wathibitishaji waliokatwa kupendekeza (au EIP-8045)** huchuja tu wathibitishaji waliokatwa wasichaguliwe kwa majukumu ya siku zijazo. Hii inaboresha ustahimilivu wa mnyororo kwa kuhakikisha wathibitishaji wenye afya pekee ndio wanachaguliwa kupendekeza vitalu, kudumisha ubora wa huduma wakati wa usumbufu wa mtandao.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-8045](https://eips.ethereum.org/EIPS/eip-8045)

### Kuongeza kikomo cha upokezanaji cha kujitoa na uunganishaji {#increase-exit-and-consolidation-churn}

<EipTag upgrade="glamsterdam" id={8061} />

- Hupunguza kwa kiasi kikubwa nyakati za utoaji wa uwekaji dhamana kwa kuruhusu uwezo wa kujitoa uongezeke na kiasi cha jumla cha ETH kilichowekwa dhamana, badala ya kuwekewa kikomo kwa kiwango kisichobadilika
- Hupa uunganishaji wa mthibitishaji uwezo wao wenyewe wa foleni maalum, ikiharakisha mpito kwa wathibitishaji wakubwa, wenye ufanisi zaidi
- Hudumisha usalama wa mtandao kupitia vigezo vya usalama vilivyochambuliwa kwa uangalifu

Kikomo cha upokezanaji cha Ethereum ni kikomo cha usalama kwenye kiwango ambacho wathibitishaji wanaweza kuingia, kujitoa, au kuunganisha ETH yao iliyowekwa dhamana, ili kuhakikisha usalama wa mtandao hauvurugwi kamwe. Leo, kujitoa na uanzishaji hushiriki kikomo kimoja kilichowekwa, kwa hivyo wakati wa vipindi vya mahitaji makubwa waweka dhamana wanaweza kukabiliwa na kusubiri kwa muda mrefu kutoa ETH yao. Uunganishaji, ambapo wathibitishaji huungana kuwa wakubwa zaidi na hadi ETH 2,048 (iliyowezeshwa na [uboreshaji wa Pectra](/roadmap/pectra)), pia hushindania uwezo huu mdogo, ikimaanisha kuunganisha seti kamili ya mthibitishaji itachukua miaka kwa kiwango cha sasa.

**Kuongeza kikomo cha upokezanaji cha kujitoa na uunganishaji (au EIP-8061)** hupanga upya vikomo hivi katika njia tofauti:

- Uanzishaji wa mthibitishaji huweka kikomo chao kilichopo, bila kubadilika
- Kujitoa hakuwekewi kikomo tena na badala yake huongezeka na kiasi cha jumla cha ETH kilichowekwa dhamana
- Uunganishaji hupata uwezo wao wenyewe maalum, takriban nusu ya ukubwa wa kikomo cha pamoja cha uanzishaji-kujitoa

Katika viwango vya sasa vya uwekaji dhamana, hii huongeza uwezo wa kujitoa kwa takriban mara 4 na uwezo wa uunganishaji kwa takriban mara 2, ikimaanisha waweka dhamana wanaweza kutoa ETH yao haraka sana wakati wa vipindi vya mahitaji makubwa na mtandao hubadilika haraka zaidi kwa seti ndogo, yenye ufanisi zaidi ya mthibitishaji.

Kwa sababu dhamana inaweza kuingia na kutoka kwenye mtandao haraka zaidi, mabadiliko hupunguza takriban nusu ya muda ambao nodi inaweza kubaki nje ya mtandao kabla ya kuhitaji kituo cha ukaguzi cha hivi karibuni kinachoaminika ili kujiunga tena na mtandao kwa usalama (kipindi cha udhanifu dhaifu, kutoka takriban siku 15.7 hadi takriban siku 7). Maelewano haya yalichambuliwa kwa uangalifu ili kuhakikisha usalama wa mtandao unadumishwa.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-8061](https://eips.ethereum.org/EIPS/eip-8061)

## Kuboresha uzoefu wa mtumiaji na msanidi {#improve-user-developer-experience}

Uboreshaji wa Glamsterdam wa Ethereum unalenga kuboresha uzoefu wa mtumiaji, kuongeza ugunduzi wa data, na kushughulikia ukubwa wa ujumbe unaoongezeka ili kuzuia kushindwa kwa usawazishaji. Hii inafanya iwe rahisi kufuatilia kile kinachotokea mnyororoni huku ikizuia matatizo ya kiufundi kadiri mtandao unavyoongeza uwezo.

### Kupunguza gharama za gesi za muamala za asili {#reduce-intrinsic-transaction-gas-costs}

<EipTag upgrade="glamsterdam" id={2780} />

- Hushusha ada ya msingi kwa miamala, ikipunguza gharama ya jumla ya malipo rahisi ya asili ya ETH
- Hufanya hamisho ndogo kuwa nafuu zaidi, ikiongeza uwezekano wa Ethereum kama njia ya kawaida ya kubadilishana

Miamala yote ya Ethereum ina ada ya gesi ya msingi isiyobadilika leo, bila kujali ni rahisi au changamano kiasi gani kuchakata. **Kupunguza gesi ya muamala ya asili (au EIP-2780)** inapendekeza kupunguza ada hiyo ya msingi ili kufanya hamisho la kawaida la ETH kati ya akaunti zilizopo kuwa **nafuu kwa hadi 71%**.

Kupunguza gesi ya muamala ya asili hufanya kazi kwa kuvunja ada ya muamala ili kuakisi tu kazi ya msingi, muhimu ambayo kompyuta zinazoendesha mtandao hufanya kweli, kama vile kuthibitisha sahihi ya kidijitali na kusasisha salio. Kwa sababu malipo ya msingi ya ETH hayatekelezi msimbo changamano au kubeba data ya ziada, pendekezo hili lingepunguza ada yake ili kulingana na alama yake nyepesi.

Pendekezo linaanzisha ubaguzi kwa kuunda akaunti mpya kabisa ili kuzuia ada za chini kuzidiwa hali ya mtandao. Ikiwa hamisho linatuma ETH kwa anwani tupu, isiyokuwepo, mtandao lazima uunde rekodi mpya ya kudumu kwa ajili yake. Malipo ya ziada ya gesi huongezwa kwa uundaji huo wa akaunti ili kusaidia kufidia mzigo wake wa uhifadhi wa muda mrefu.

Pamoja, EIP-2780 inalenga kufanya hamisho za kila siku kati ya akaunti zilizopo kuwa nafuu zaidi huku ikihakikisha mtandao bado unalindwa dhidi ya uvimbe wa hifadhidata kwa kupanga bei kwa usahihi ukuaji wa kweli wa hali.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-2780](https://eips.ethereum.org/EIPS/eip-2780)

### Usambazaji wa Mapema wa Kiwanda cha Kuamua {#deterministic-factory-predeploy}

<EipTag upgrade="glamsterdam" id={7997} />

- Hupa wasanidi njia ya asili ya kusambaza programu na mikoba ya mkataba mahiri kwa anwani sawa kabisa kwenye minyororo mingi
- Huruhusu watumiaji kuwa na anwani sawa ya mkoba mahiri kwenye mitandao mingi ya tabaka la 2 (l2), ikipunguza mzigo wa kiakili, kupunguza mkanganyiko, na kupunguza hatari ya upotezaji wa fedha kwa bahati mbaya
- Hubadilisha njia mbadala ambazo wasanidi wanatumia kwa sasa kufikia usawa huu, na kuifanya iwe rahisi na salama zaidi kujenga mikoba na programu za minyororo mingi

Ikiwa mtumiaji ana mkoba wa mkataba mahiri leo wenye akaunti kwenye minyororo mingi inayoendana na Mashine Pepe ya Ethereum (EVM), mara nyingi huishia na anwani tofauti kabisa kwenye mitandao tofauti. Hii sio tu inachanganya, lakini inaweza kusababisha upotezaji wa fedha kwa bahati mbaya.

**Usambazaji wa Mapema wa Kiwanda cha Kuamua (au EIP-7997)** hupa wasanidi njia ya asili, iliyojengwa ndani ya kusambaza programu zao zilizogatuliwa na mikoba ya mkataba mahiri kwa anwani sawa kabisa kwenye minyororo mingi ya EVM, ikijumuisha Mtandao Mkuu wa Ethereum, mitandao ya tabaka la 2 (l2), na zaidi. Ikiwa itapitishwa, itaruhusu mtumiaji kuwa na anwani sawa kabisa kwenye kila mnyororo unaoshiriki, ikipunguza kwa kiasi kikubwa mzigo wa kiakili na uwezekano wa kosa la mtumiaji.

Usambazaji wa Mapema wa Kiwanda cha Kuamua hufanya kazi kwa kuweka kwa kudumu programu ndogo, maalum ya kiwanda katika eneo linalofanana (haswa, anwani 0x12) kwenye kila mnyororo unaoshiriki unaoendana na EVM. Lengo lake ni kutoa mkataba wa kiwanda wa ulimwengu wote, wa kawaida ambao unaweza kupitishwa na mtandao wowote unaoendana na EVM; mradi mnyororo wa EVM unashiriki na kupitisha kiwango hiki, wasanidi wataweza kukitumia kusambaza mikataba yao mahiri kwa anwani sawa kabisa kwenye mtandao huo.

Usanifishaji huu hurahisisha kujenga na kusimamia programu za mtambuko-mnyororo kwa wasanidi na mfumo mpana wa ikolojia. Wasanidi hawahitaji tena kujenga msimbo maalum, wa mnyororo maalum ili kuunganisha programu zao pamoja kwenye mitandao tofauti, badala yake wakitumia kiwanda hiki cha ulimwengu wote kuzalisha anwani sawa kabisa kwa programu yao kila mahali. Kwa kuongezea, wachunguzi wa kitalu, huduma za ufuatiliaji, na mikoba inaweza kutambua na kuunganisha kwa urahisi zaidi programu na akaunti hizi kwenye minyororo mbalimbali, na kuunda mazingira ya minyororo mingi yaliyounganishwa zaidi na yasiyo na mshono kwa washiriki wote wanaotegemea Ethereum.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-7997](https://eips.ethereum.org/EIPS/eip-7997)

### Hamisho na uchomaji wa ETH hutoa logi {#eth-transfers-and-burns-emit-a-log}

<EipTag upgrade="glamsterdam" id={7708} />

- Huzalisha kiotomatiki rekodi ya kudumu (logi) kila wakati ETH inapohamishwa au kuchomwa
- Hurekebisha doa la kihistoria ambalo huruhusu programu, mabadilishano, na madaraja kugundua kwa kutegemewa amana za mtumiaji bila zana za ufuatiliaji za dharura

Tofauti na tokeni (ERC-20s), hamisho za kawaida za ETH kati ya mikataba mahiri hazitoi stakabadhi wazi (logi ya kawaida), na kuzifanya kuwa ngumu kwa mabadilishano na programu kufuatilia.

Hamisho na uchomaji wa ETH hutoa logi (au EIP-7708) hufanya iwe lazima kwa mtandao kutoa tukio la logi ya kawaida kila wakati kiasi kisicho sifuri cha ETH kinapohamishwa au kuchomwa.

Hii itafanya iwe rahisi zaidi na ya kutegemewa zaidi kwa mikoba, mabadilishano, na waendeshaji wa daraja kufuatilia kwa usahihi amana na mienendo bila zana maalum.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-7708](https://eips.ethereum.org/EIPS/eip-7708)

### eth/70 orodha za stakabadhi za kitalu kiasi {#eth-70-partial-block-receipt-lists}

<EipTag upgrade="glamsterdam" id={7975} />

Kadiri tunavyoongeza kiasi cha kazi ambacho Ethereum inaweza kufanya, orodha za stakabadhi za vitendo hivyo (rekodi za data za miamala hii) zinakuwa kubwa sana kiasi kwamba zinaweza kusababisha nodi za mtandao kushindwa wakati wa kujaribu kusawazisha data na kila mmoja.

Sasa ni hitaji kwa wateja wote wa tabaka la utekelezaji, eth/70 orodha za stakabadhi za kitalu kiasi (au EIP-7975) inaanzisha njia mpya kwa nodi kuzungumza na kila mmoja (eth/70) ambayo inaruhusu orodha hizi kubwa kuvunjwa katika vipande vidogo, vinavyodhibitika zaidi. eth/70 inaanzisha mfumo wa kurasa kwa itifaki ya mawasiliano ya mtandao ambayo inaruhusu nodi kuvunja orodha za stakabadhi za kitalu na kuomba data kwa usalama katika vipande vidogo, vinavyodhibitika zaidi.

Mabadiliko haya yangezuia kushindwa kwa usawazishaji wa mtandao wakati wa vipindi vya shughuli nzito. Hatimaye, inafungua njia kwa Ethereum kuongeza uwezo wake wa kitalu, na kuchakata miamala zaidi kwa kila kitalu katika siku zijazo, bila kuzidiwa maunzi ya kimwili yanayosawazisha mnyororo.

**Rasilimali**: [Uainisho wa kiufundi wa EIP-7975](https://eips.ethereum.org/EIPS/eip-7975)

## Usomaji zaidi {#further-reading}

- [Ramani ya njia ya Ethereum](/roadmap/)
- [Forkcast: Glamsterdam](https://forkcast.org/upgrade/glamsterdam)
- [Meta EIP ya Glamsterdam](https://eips.ethereum.org/EIPS/eip-7773)
- [Tangazo la blogu la Sasisho la Vipaumbele vya Itifaki kwa 2026](https://blog.ethereum.org/2026/02/18/protocol-priorities-update-2026)
- [Podikasti ya The Daily Gwei Refuel - Ethereum ya baada ya quantum, Glamsterdam inakuja](https://www.youtube.com/watch?v=qx9sd50uQjQ)

## Maswali Yanayoulizwa Mara kwa Mara {#faq}

### ETH inawezaje kubadilishwa baada ya mchepuo mgumu wa Glamsterdam? {#how-can-eth-be-converted-after-the-hardfork}

- **Hakuna Hatua Inayohitajika kwa ETH Yako**: Hakuna haja ya kubadilisha au kuboresha ETH yako kufuatia uboreshaji wa Glamsterdam. Salio la akaunti yako litasalia sawa, na ETH unayoshikilia kwa sasa itasalia kupatikana katika muundo wake uliopo baada ya mchepuo mgumu.
- **Jihadhari na utapeli!** <Emoji text="⚠️" /> **mtu yeyote anayekuelekeza "kuboresha" ETH yako anajaribu kukutapeli.** Hakuna unachohitaji kufanya kuhusiana na uboreshaji huu. Mali zako zitasalia bila kuathiriwa kabisa. Kumbuka, kukaa na taarifa ni ulinzi bora dhidi ya utapeli.

[Zaidi kuhusu kutambua na kuepuka utapeli](/security/)

### Je, uboreshaji wa Glamsterdam unaathiri nodi na wathibitishaji wote wa Ethereum? {#does-the-glamsterdam-upgrade-affect-all-ethereum-nodes-and-validators}

Ndiyo, uboreshaji wa Glamsterdam unahitaji masasisho kwa [wateja wa utekelezaji na wateja wa mwafaka](/developers/docs/nodes-and-clients/) wote. Kwa sababu uboreshaji huu unaanzisha Utengano wa Mpendekezaji na Mjengaji Uliowekwa Kisheria (ePBS), waendeshaji wa nodi watahitaji kuhakikisha wateja wao wamesasishwa ili kushughulikia njia mpya ambazo vitalu hujengwa, kuthibitishwa, na kushuhudiwa na mtandao.

Wateja wote wakuu wa Ethereum watatoa matoleo yanayounga mkono mchepuo mgumu yaliyowekwa alama kama kipaumbele cha juu. Unaweza kufuatilia wakati matoleo haya yatapatikana katika hazina za GitHub za mteja, [chaneli zao za Discord](https://ethstaker.org/support), [Discord ya EthStaker](https://dsc.gg/ethstaker), au kwa kujiandikisha kwenye blogu ya Ethereum kwa masasisho ya itifaki.

Ili kudumisha usawazishaji na mtandao wa Ethereum baada ya uboreshaji, waendeshaji wa nodi lazima wahakikishe wanaendesha toleo la mteja linaloungwa mkono. Kumbuka kwamba taarifa kuhusu matoleo ya mteja inategemea wakati, na watumiaji wanapaswa kurejelea masasisho ya hivi punde kwa maelezo ya sasa zaidi.

### Kama mweka dhamana, ninahitaji kufanya nini kwa uboreshaji wa Glamsterdam? {#as-a-staker-what-do-i-need-to-do-for-the-glamsterdam-upgrade}

Kama ilivyo kwa kila uboreshaji wa mtandao, hakikisha kusasisha wateja wako kwa matoleo ya hivi punde yaliyowekwa alama ya usaidizi wa Glamsterdam. Fuata masasisho katika orodha ya barua pepe na [Matangazo ya Itifaki kwenye Blogu ya EF](https://blog.ethereum.org/category/protocol) ili kupata taarifa kuhusu matoleo.

Ili kuthibitisha usanidi wako kabla ya Glamsterdam kuanzishwa kwenye Mtandao Mkuu, unaweza kuendesha mthibitishaji kwenye mitandao ya majaribio. Michepuo ya mtandao wa majaribio pia hutangazwa katika orodha ya barua pepe na blogu.

### Ni maboresho gani ambayo Glamsterdam itajumuisha kwa kuongeza uwezo wa L1? {#what-improvements-will-glamsterdam-include-for-l1-scaling}

Kipengele kikuu ni ePBS (EIP-7732), ambayo hutenganisha kazi nzito ya kuthibitisha miamala ya mtandao kutoka kwa kazi ya kufikia mwafaka. Hii hupanua dirisha la uenezaji wa data kutoka sekunde 2 hadi takriban sekunde 9, ikifungulia uwezo wa Ethereum kushughulikia kwa usalama uwezo wa upitishaji wa muamala wa juu zaidi na kuchukua blobs zaidi za data kwa mitandao ya tabaka la 2 (l2).

### Je, Glamsterdam itashusha ada kwenye Ethereum (tabaka la 1)? {#will-glamsterdam-lower-fees-on-ethereum-layer-1}

Ndiyo, Glamsterdam ina uwezekano mkubwa wa kupunguza ada kwa watumiaji wa kila siku! Kupunguza gesi ya muamala ya asili (au EIP-2780) hupunguza ada ya msingi ya kutuma ETH, na kufanya ETH kuwa nafuu zaidi kutumia kwa malipo ya kila siku.

Kwa kuongezea, kwa uendelevu wa muda mrefu, Glamsterdam inaanzisha Orodha za Ufikiaji za Kiwango cha Kitalu (BALs). Hii inawezesha uchakataji sambamba na kuandaa tabaka la 1 (l1) kushughulikia kwa usalama vikomo vya juu vya gesi vya jumla katika siku zijazo, ambayo ina uwezekano wa kupunguza gharama za gesi kwa kila muamala kadiri uwezo unavyokua.

### Je, kutakuwa na mabadiliko yoyote kwa mikataba yangu mahiri iliyopo baada ya Glamsterdam? {#will-my-smart-contracts-change}

Mikataba iliyopo itaendelea kufanya kazi kawaida baada ya Glamsterdam. Wasanidi wana uwezekano wa kupata zana kadhaa mpya na wanapaswa kukagua matumizi yao ya gesi:

- Kuongeza ukubwa wa juu wa mkataba (au EIP-7954) huruhusu wasanidi kusambaza programu kubwa zaidi, ikipandisha kikomo cha ukubwa wa juu wa mkataba kutoka takriban 24KiB hadi 64KiB.
- Usambazaji wa mapema wa kiwanda cha kuamua (au EIP-7997) inaanzisha mkataba wa kiwanda wa ulimwengu wote, uliojengwa ndani. Inaruhusu wasanidi kusambaza programu zao na mikoba ya mkataba mahiri kwa anwani sawa kabisa kwenye minyororo yote inayoshiriki ya EVM.
- Ikiwa programu yako inategemea ufuatiliaji changamano kupata hamisho za ETH, hamisho na uchomaji wa ETH hutoa logi (au EIP-7708) itakuruhusu kubadili kutumia logi kwa uhasibu rahisi na wa kutegemewa zaidi.
- Ongezeko la gharama ya gesi ya uundaji wa hali (au EIP-8037) na sasisho la gharama ya gesi ya ufikiaji wa hali (au EIP-8038) zinaanzisha miundo mipya ya uendelevu ambayo itabadilisha gharama fulani za usambazaji wa mkataba, kwani kuunda akaunti mpya au uhifadhi wa kudumu kutakuwa na ada mpya isiyobadilika iliyosanifiwa kulingana na ukubwa wa data iliyoundwa.

### Je, Glamsterdam itaathiri vipi uhifadhi wa nodi na mahitaji ya maunzi? {#how-will-glamsterdam-affect-node-storage-and-hardware-requirements}

Mapendekezo ya Kuboresha Ethereum (EIPs) mengi yanayozingatiwa kwa Glamsterdam yanashughulikia kikomo cha utendaji cha ukuaji wa hali:

- Ongezeko la gharama ya gesi ya uundaji wa hali (au EIP-8037) inaanzisha mfumo wa gharama isiyobadilika (CPSB) kulenga kiwango cha ukuaji wa hifadhidata ya hali cha 120 GiB/mwaka, ikihakikisha maunzi ya kawaida ya kimwili yanaweza kuendelea kuendesha mtandao kwa ufanisi.
- eth/70 orodha za stakabadhi za kitalu kiasi (au EIP-7975) inaruhusu nodi kuomba stakabadhi za kitalu zenye kurasa, ambayo huvunja orodha za stakabadhi za kitalu zenye data nzito katika vipande vidogo ili kuzuia kuanguka na usawazishaji kadiri Ethereum inavyoongeza uwezo.
