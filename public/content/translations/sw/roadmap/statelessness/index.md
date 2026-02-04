---
title: Kutokuwa na Hali, Kuisha kwa Hali na Kuisha kwa Historia
description: Maelezo ya kuisha kwa historia na Ethereum isiyo na hali
lang: sw
---

# Kutokuwa na Hali, Kuisha kwa Hali na Kuisha kwa Historia {#statelessness}

Uwezo wa kuendesha nodi za Ethereum kwenye maunzi ya kawaida ni muhimu kwa ugatuaji wa kweli. Hii ni kwa sababu kuendesha nodi huwapa watumiaji uwezo wa kuthibitisha maelezo kwa kufanya ukaguzi wa kriptografia kwa kujitegemea badala ya kuamini mtu mwingine kuwapa data. Kuendesha nodi huruhusu watumiaji kuwasilisha miamala moja kwa moja kwa mtandao wa wenzao wa Ethereum badala ya kulazimika kumwamini mpatanishi. Ugatuaji hauwezekani ikiwa manufaa haya yanapatikana kwa watumiaji walio na vifaa vyenye gharama kubwa. Badala yake, nodi zinapaswa kuwa na uwezo wa kuendesha kwa mahitaji madogo sana ya usindikaji na kumbukumbu ili ziweze kuendeshwa kwenye simu za mkononi, kompyuta ndogo, au bila kuonekana kwenye kompyuta ya nyumbani.

Leo, mahitaji ya nafasi ya juu ya disk ni kizuizi kikuu cha kuzuia upatikanaji wa nodes zima. Hii inatokana hasa na hitaji la kuhifadhi sehemu kubwa za data ya hali ya Ethereum. Data hii ya serikali ina taarifa muhimu inayohitajika ili kuchakata kwa usahihi vitalu vipya na miamala. Wakati wa kuandika haya, SSD ya haraka ya TB 2 inapendekezwa kwa ajili ya kuendesha nodi kamili ya Ethereum. Kwa nodi ambayo haisafi data za zamani, mahitaji ya uhifadhi yanakua kwa takriban 14GB kwa wiki, na nodi za kumbukumbu ambazo zinahifadhi data zote tangu mwanzo zinafikia takriban 12 TB (wakati wa kuandika, Februari 2023).

Hifadhi ngumu za bei nafuu zinaweza kutumika kuhifadhi data za zamani lakini hizo ni polepole sana kuendelea na vitalu vinavyoingia. Kushikilia mifumo ya sasa ya uhifadhi kwa wateja huku kufanya data iwe rahisi na nafuu kuhifadhi ni suluhisho la muda tu na sehemu tu ya tatizo kwa sababu ukuaji wa hali ya Ethereum ni “bila kikomo,” ikimaanisha kwamba mahitaji ya uhifadhi yanaweza kuendelea kuongezeka daima, na maboresho ya kiteknolojia yatahitaji daima kufuata kasi ya ukuaji huu endelevu wa hali. Badala yake, wateja lazima watafute njia mpya za kuthibitisha vitalu na miamala ambayo haitegemei kutafuta data kutoka kwa hifadhidata za ndani.

## Kupunguza hifadhi kwa nodi {#reducing-storage-for-nodes}

Kuna njia kadhaa za kupunguza kiasi cha data kila nodi inapaswa kuhifadhi, kila moja ikihitaji itifaki ya msingi ya Ethereum kusasishwa kwa kiwango tofauti:

- **Kuisha kwa historia**: huwezesha nodi kutupa data ya hali ambayo ni ya zamani kuliko bloku X, lakini haibadilishi jinsi wateja wa Ethereum wanavyoshughulikia data ya hali.
- **Kuisha kwa hali**: huruhusu data ya hali ambayo haitumiki mara kwa mara kutotumika. Data isiyotumika inaweza kupuuzwa na wateja hadi itakaporejeshwa.
- **Kutokuwa na hali dhaifu**: wazalishaji wa bloku pekee ndio wanahitaji ufikiaji wa data kamili ya hali, nodi zingine zinaweza kuthibitisha bloku bila hifadhidata ya hali ya ndani.
- **Kutokuwa na hali thabiti**: hakuna nodi inayohitaji ufikiaji wa data kamili ya hali.

## Kuisha kwa data {#data-expiry}

### Kuisha kwa historia {#history-expiry}

Muda wa kuisha kwa historia hurejelea wateja wanaopogoa data ya zamani ambayo hawatakiwi kuhitaji, ili tu kuhifadhi kiasi kidogo cha data ya kihistoria, na kuacha data ya zamani data mpya inapofika. Kuna sababu mbili wateja wanahitaji data ya kihistoria: kusawazisha na kutoa maombi ya data. Hapo awali, wateja walilazimika kusawazisha kutoka kwa kitalu cha mwanzo, kuthibitisha kuwa kila kitalu kinachofuata ni sahihi hadi kwenye kichwa cha mnyororo. Leo, wateja hutumia "vituo vya ukaguzi hafifu vya udhabiti" kuweka njia yao hadi kwenye kichwa cha mnyororo. Vituo hivi vya ukaguzi ni sehemu zinazoaminika, kama vile kuwa na kizuizi karibu na sasa badala ya mwanzo wa Ethereum. Hii inamaanisha kuwa wateja wanaweza kuacha maelezo yote kabla ya ukaguzi dhaifu wa hivi majuzi wa udhabiti bila kupoteza uwezo wa kusawazisha kwa mkuu wa msururu. Wateja kwa sasa hutuma maombi (yanayowasili kupitia JSON-RPC) ya data ya kihistoria kwa kuinyakua kutoka kwa hifadhidata zao za karibu. Over, kwa kuisha kwa historia hii haitawezekana ikiwa data iliyoombwa imekatwa. Kutoa data hii ya kihistoria ndipo baadhi ya suluhu za kibunifu zinahitajika.

Chaguo moja ni kwamba wateja waombe data ya kihistoria kutoka kwa wenzao kwa kutumia suluhisho kama vile Mtandao wa Tovuti. Mtandao wa Tovuti ni mtandao unaoendelezwa wa programu kati ya rika-kwa-rika kwa ajili ya kuhudumia data ya kihistoria ambapo kila nodi huhifadhi kipande kidogo cha historia ya Ethereum hivi kwamba historia nzima inapatikana kusambazwa kwenye mtandao. Maombi hutolewa kwa kutafuta wenzao wanaohifadhi data husika na kuiomba kutoka kwao. Vinginevyo, kwa kuwa kwa ujumla ni programu zinazohitaji ufikiaji wa data ya kihistoria, inaweza kuwa jukumu lao kuihifadhi. Kunaweza pia kuwa na watendaji wa kutosha katika nafasi ya Ethereum ambao watakuwa tayari kudumisha kumbukumbu za kihistoria. Inaweza kuwa DAO inayozunguka ili kudhibiti hifadhi ya data ya kihistoria, au kwa hakika itakuwa mchanganyiko wa chaguo hizi zote. Watoa huduma hawa wanaweza kutoa data kwa njia nyingi, kama vile kwenye torrent, FTP, Filecoin au IPFS.

Kuisha kwa historia kuna utata kwa kiasi fulani kwa sababu hadi sasa Ethereum daima imehakikisha kwa uwazi upatikanaji wa data yoyote ya kihistoria. Usawazishaji kamili kutoka kwa genesis umewezekana kila wakati kama kawaida, hata kama inategemea kuunda upya data ya zamani kutoka kwa vijipicha. Kuisha kwa muda wa historia huhamisha jukumu la kutoa dhamana hii nje ya itifaki ya msingi ya Ethereum. Hii inaweza kuanzisha hatari mpya za udhibiti ikiwa ni mashirika ya serikali kuu ambayo mwishowe huingia ili kutoa data ya kihistoria.

EIP-4444 bado haiko tayari kusafirishwa, lakini iko chini ya majadiliano ya kina. Cha kufurahisha, changamoto za EIP-4444 sio za kiufundi sana, lakini zaidi ni usimamizi wa jamii. Ili hii kusafirishwa, kunahitaji kuwa na ununuzi wa jumuiya ambao haujumuishi tu makubaliano bali pia ahadi za kuhifadhi na kutoa data ya kihistoria kutoka kwa huluki zinazoaminika.

Uboreshaji huu haubadilishi jinsi nodi za Ethereum zinavyoshughulikia data ya serikali, inabadilisha tu jinsi data ya kihistoria inavyopatikana.

### Kuisha kwa hali {#state-expiry}

Kuisha kwa serikali kunarejelea kuondoa hali kutoka kwa nodi za kibinafsi ikiwa haijafikiwa hivi karibuni. Kuna njia kadhaa hii inaweza kutekelezwa, ikiwa ni pamoja na:

- **Kuisha kwa kodi**: kutoza "kodi" kwa akaunti na kuzifanya ziishe wakati kodi yao inapofikia sifuri
- **Kuisha kwa wakati**: kufanya akaunti zisitumiwe ikiwa hakuna kusoma/kuandika kwa akaunti hiyo kwa kiasi fulani cha muda

Muda wa kuisha kwa kukodisha unaweza kuwa ukodishaji wa moja kwa moja unaotozwa kwa akaunti ili kuziweka katika hifadhidata ya hali inayotumika. Kuisha kwa wakati kunaweza kuwa kwa kuhesabu kutoka kwa mwingiliano wa mwisho wa akaunti, au inaweza kuwa kuisha kwa akaunti zote mara kwa mara. Kunaweza pia kuwa na mbinu zinazochanganya vipengele vya miundo msingi ya muda na ukodishaji, kwa mfano akaunti za kibinafsi zitaendelea kutumika ikiwa zinalipa ada kidogo kabla ya kuisha kwa muda kulingana na muda. Kwa kuisha kwa hali ni muhimu kuzingatia kwamba hali isiyotumika **haifutwi**, huhifadhiwa tu kando na hali inayotumika. Hali isiyotumika inaweza kurejeshwa kuwa hali inayotumika.

Njia ambayo hii ingefanya kazi labda ni kuwa na mti wa serikali kwa vipindi maalum vya wakati (labda ~ mwaka 1). Wakati wowote kipindi kipya kinapoanza, ndivyo huanza mti mpya kabisa wa hali. Mti wa sasa wa hali pekee ndio unaweza kurekebishwa, mingine yote haibadiliki. Node za Ethereum zinatarajiwa tu kushikilia mti wa hali ya sasa na ijayo ya hivi karibuni zaidi. Hii inahitaji njia ya kuweka stempu ya wakati kwenye anwani na kipindi ambacho ipo. Kuna [njia kadhaa zinazowezekana](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) za kufanya hivi, lakini chaguo kuu linahitaji [anwani kurefushwa](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) ili kukidhi maelezo ya ziada na faida ya ziada kwamba anwani ndefu ni salama zaidi. Kipengee cha ramani ya barabara kinachofanya hivi kinaitwa [upanuzi wa nafasi ya anwani](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Sawa na kuisha kwa historia, chini ya jukumu la kuisha kwa serikali kwa kuhifadhi data ya serikali ya zamani huondolewa kutoka kwa watumiaji binafsi na kusukumwa kwenye vyombo vingine kama vile watoa huduma wa serikali kuu, wanajamii wenye kujitolea au masuluhisho zaidi yaliyogatuliwa ya siku zijazo kama vile Mtandao wa Tovuti.

Kuisha kwa hali bado kiko katika awamu ya utafiti na bado hakiko tayari kusafirishwa. Kuisha kwa serikali kunaweza kutokea baadaye kuliko wateja wasio na uraia na kuisha kwa historia kwa sababu masasisho hayo hufanya saizi kubwa za serikali kudhibitiwa kwa urahisi kwa wathibitishaji wengi.

## Kutokuwa na hali {#statelessness}

Kutokuwa na utaifa ni kosa kidogo kwa sababu haimaanishi kuwa dhana ya "hali" imeondolewa, lakini inahusisha mabadiliko ya jinsi nodi za Ethereum zinashughulikia data ya serikali. Kutokuwa na hali kwenyewe kuna aina mbili: kutokuwa na hali dhaifu na kutokuwa na hali thabiti. Kutokuwa na utaifa hafifu huwezesha nodi nyingi kwenda bila utaifa kwa kuweka jukumu la hifadhi ya serikali kwa chache. Kutokuwa na hali thabiti huondoa kabisa hitaji la nodi yoyote kuhifadhi data kamili ya hali. Kutokuwa na hali dhaifu na thabiti hutoa faida zifuatazo kwa wathibitishaji wa kawaida:

- usawazishaji wa karibu papo hapo
- uwezo wa kuthibitisha bloku bila mpangilio
- nodi zinaweza kufanya kazi na mahitaji ya chini sana ya maunzi (k.m., kwenye simu)
- nodi zinaweza kufanya kazi juu ya diski kuu za bei nafuu kwa sababu hakuna usomaji/uandishi wa diski unaohitajika
- inaoana na masasisho yajayo ya usimbaji fiche wa Ethereum

### Kutokuwa na Hali Dhaifu {#weak-statelessness}

Ukosefu wa utaifa dhaifu unahusisha mabadiliko kwa njia ya nodi za Ethereum kuthibitisha mabadiliko ya hali, lakini haiondoi kabisa hitaji la kuhifadhi hali katika nodi zote kwenye mtandao. Badala yake, kutokuwa na utaifa dhaifu kunaweka jukumu la uhifadhi wa serikali kwa watayarishaji wa vizuizi, wakati nodi zingine zote kwenye mtandao huthibitisha vizuizi bila kuhifadhi data kamili ya serikali.

**Katika hali dhaifu ya kutokuwa na utaifa, kupendekeza vitalu kunahitaji ufikiaji wa data kamili ya serikali lakini uthibitishaji wa vizuizi hauhitaji data ya serikali**

Ili hili litokee, [miti ya Verkle](/roadmap/verkle-trees/) lazima iwe tayari imetekelezwa katika wateja wa Ethereum. Verkle trees ni muundo wa data badala ya kuhifadhi data ya hali ya Ethereum ambayo inaruhusu "mashahidi" wadogo, wa ukubwa usiobadilika kwa data kupitishwa kati ya programu zingine na kutumika kuthibitisha vitalu badala ya kuthibitisha vitalu dhidi ya hifadhidata za ndani. [Utengano wa mpendekezaji-mjengaji](/roadmap/pbs/) pia unahitajika kwa sababu hii inaruhusu wajenzi wa bloku kuwa nodi maalum zenye maunzi yenye nguvu zaidi, na hizo ndizo zinazohitaji ufikiaji wa data kamili ya hali.

<ExpandableCard title="Kwa nini ni sawa kutegemea wapendekezaji wachache wa vizuizi?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Kutokuwa na utaifa kunategemea wajenzi wa vitalu kudumisha nakala ya data kamili ya serikali ili waweze kutoa mashahidi ambao wanaweza kutumika kuthibitisha kizuizi. Nodes nyingine hazihitaji upatikanaji wa data ya serikali, taarifa zote zinazohitajika ili kuthibitisha kuzuia zinapatikana kwa shahidi. Hii inajenga hali ambapo kupendekeza kuzuia ni ghali, lakini kuthibitisha kuzuia ni nafuu, ambayo ina maana waendeshaji wachache wataendesha nodi ya kupendekeza kuzuia. Hata hivyo, ugatuaji wa wapendekeza vitalu sio muhimu mradi washiriki wengi iwezekanavyo wanaweza kuthibitisha kwa uhuru kwamba vitalu wanavyopendekeza ni halali.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Soma zaidi kwenye dondoo za Dankrad</ButtonLink> </ExpandableCard>

Wapendekeza wa kuzuia hutumia data ya serikali kuunda "mashahidi" - seti ndogo ya data ambayo inathibitisha maadili ya serikali ambayo yanabadilishwa na shughuli katika block. Wahalalishaji wengine hawashikilii serikali, wanahifadhi tu mzizi wa serikali (hashi ya jimbo lote). Wanapokea bloku na shahidi na kuzitumia kusasisha mzizi wao wa hali. Hii inafanya nodi ya kuthibitisha kuwa nyepesi sana.

Ukosefu wa utaifa dhaifu uko katika hali ya juu ya utafiti, lakini inategemea utengano wa wajenzi wa mapendekezo na Miti ya Verkle kutekelezwa ili mashahidi wadogo waweze kupitishwa kati ya wenzao. Hii ina maana kutokuwa na hali dhaifu labda ni miaka michache mbali na Mtandao Mkuu wa Ethereum.

### Kutokuwa na hali thabiti {#strong-statelessness}

Kutokuwa na hali thabiti huondoa hitaji la nodi yoyote kuhifadhi data ya hali. Badala yake, miamala hutumwa na mashahidi ambayo yanaweza kujumlishwa na wazalishaji wa bloku. Wazalishaji wa vitalu basi wana jukumu la kuhifadhi tu hali ambayo inahitajika kwa ajili ya kuzalisha mashahidi kwa akaunti husika. Jukumu la serikali linakaribia kuhamishwa kwa watumiaji, wanapotuma mashahidi na 'orodha za ufikiaji' ili kutangaza ni akaunti zipi na funguo za hifadhi wanazotumia. Hii inaweza kuwezesha nodi nyepesi sana, lakini kuna mabadiliko ikiwa ni pamoja na kuifanya iwe ngumu zaidi kushughulikia na mikataba mahiri.

Kutokuwa na utaifa kwa nguvu kumechunguzwa na watafiti lakini kwa sasa haitarajiwi kuwa sehemu ya ramani ya Ethereum - kuna uwezekano mkubwa kwamba kutokuwa na utaifa dhaifu kunatosha kwa mahitaji ya kuongeza ya Ethereum.

## Maendeleo ya sasa {#current-progress}

Kutokuwa na utaifa dhaifu, kuisha kwa historia na kumalizika kwa serikali zote ziko katika awamu ya utafiti na zinatarajiwa kusafirishwa miaka kadhaa kutoka sasa. Hakuna hakikisho kwamba mapendekezo haya yote yatatekelezwa, kwa mfano, ikiwa mwisho wa serikali utatekelezwa kwanza kunaweza kuwa hakuna haja ya kutekeleza kumalizika kwa historia. Pia kuna vipengee vingine vya ramani ya barabara, kama vile [Miti ya Verkle](/roadmap/verkle-trees) na [Utengano wa mpendekezaji-mjengaji](/roadmap/pbs) vinavyohitaji kukamilishwa kwanza.

## Masomo zaidi {#further-reading}

- [Ethereum Isiyo na Hali ni Nini?](https://stateless.fyi/)
- [AMA ya Vitalik kuhusu kutokuwa na hali](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Nadharia ya usimamizi wa ukubwa wa hali](https://hackmd.io/@vbuterin/state_size_management)
- [Uwekaji mipaka wa hali unaopunguza migogoro ya ufufuo](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Njia za kufikia kutokuwa na hali na kuisha kwa hali](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Maelezo ya EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes kuhusu EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Kwa nini ni muhimu sana kutokuwa na hali](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Dondoo za dhana asili ya mteja asiye na hali](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Zaidi kuhusu kuisha kwa hali](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Hata zaidi kuhusu kuisha kwa hali](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Ukurasa wa Taarifa wa Ethereum Isiyo na Hali](https://stateless.fyi)
