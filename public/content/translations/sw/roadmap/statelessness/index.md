---
title: Ubilahali, ukomo wa hali na ukomo wa historia
description: Maelezo ya ukomo wa historia na Ethereum ya ubilahali
lang: sw
---

Uwezo wa kuendesha nodi za [Ethereum](/) kwenye vifaa vya kawaida ni muhimu kwa ugatuzi wa kweli. Hii ni kwa sababu kuendesha nodi huwapa watumiaji uwezo wa kuthibitisha taarifa kwa kufanya ukaguzi wa kriptografia kwa kujitegemea badala ya kuamini mhusika wa tatu kuwapa data. Kuendesha nodi huruhusu watumiaji kuwasilisha miamala moja kwa moja kwenye mtandao wa rika-kwa-rika wa Ethereum badala ya kulazimika kuamini mpatanishi. Ugatuzi hauwezekani ikiwa manufaa haya yanapatikana tu kwa watumiaji wenye vifaa vya gharama kubwa. Badala yake, nodi zinapaswa kuwa na uwezo wa kufanya kazi zikiwa na mahitaji madogo sana ya uchakataji na kumbukumbu ili ziweze kufanya kazi kwenye simu za mkononi, kompyuta ndogo au bila kutambulika kwenye kompyuta ya nyumbani.

Leo, mahitaji makubwa ya nafasi ya diski ndiyo kikwazo kikuu kinachozuia ufikiaji wa nodi kwa wote. Hii inatokana hasa na hitaji la kuhifadhi vipande vikubwa vya data ya hali ya Ethereum. Data hii ya hali ina taarifa muhimu zinazohitajika ili kuchakata kwa usahihi vitalu na miamala mipya. Wakati wa kuandika haya, SSD ya haraka ya 2TB inapendekezwa kwa kuendesha nodi kamili ya Ethereum. Kwa nodi ambayo haipunguzi data yoyote ya zamani, hitaji la hifadhi hukua kwa takriban 14GB/kwa wiki, na nodi za kumbukumbu zinazohifadhi data zote tangu kitalu cha asili zinakaribia 12 TB (wakati wa kuandika haya, mnamo Feb 2023).

Diski kuu za bei nafuu zinaweza kutumika kuhifadhi data za zamani lakini hizo ni polepole mno kuendana na vitalu vinavyoingia. Kuweka miundo ya sasa ya hifadhi kwa wateja huku ukifanya data iwe nafuu na rahisi kuhifadhi ni suluhisho la muda na la kiasi tu kwa tatizo kwa sababu ukuaji wa hali ya Ethereum 'hauna kikomo', ikimaanisha kuwa mahitaji ya hifadhi yanaweza tu kuongezeka, na maboresho ya kiteknolojia yatalazimika kwenda sambamba na ukuaji endelevu wa hali. Badala yake, wateja lazima watafute njia mpya za kuthibitisha vitalu na miamala ambazo hazitegemei kutafuta data kutoka kwenye hifadhidata za ndani.

## Kupunguza hifadhi kwa nodi {#reducing-storage-for-nodes}

Kuna njia kadhaa za kupunguza kiasi cha data ambacho kila nodi inapaswa kuhifadhi, kila moja ikihitaji itifaki kuu ya Ethereum isasishwe kwa kiwango tofauti:

- **Ukomo wa historia**: huwezesha nodi kutupa data ya hali iliyozeeka zaidi ya vitalu X, lakini haibadilishi jinsi wateja wa Ethereum wanavyoshughulikia data ya hali.
- **Ukomo wa hali**: huruhusu data ya hali ambayo haitumiki mara kwa mara kutofanya kazi. Data isiyofanya kazi inaweza kupuuzwa na wateja hadi itakapofufuliwa.
- **Ubilahali dhaifu**: wazalishaji wa vitalu pekee ndio wanaohitaji ufikiaji wa data kamili ya hali, nodi zingine zinaweza kuthibitisha vitalu bila hifadhidata ya hali ya ndani.
- **Ubilahali thabiti**: hakuna nodi zinazohitaji ufikiaji wa data kamili ya hali.

## Ukomo wa data {#data-expiry}

### Ukomo wa historia {#history-expiry}

Ukomo wa historia unarejelea wateja kupunguza data za zamani ambazo hawana uwezekano wa kuzihitaji, ili wahifadhi tu kiasi kidogo cha data ya kihistoria, na kuacha data za zamani wakati data mpya inapowasili. Kuna sababu mbili zinazofanya wateja wahitaji data ya kihistoria: usawazishaji na kuhudumia maombi ya data. Hapo awali, wateja walilazimika kufanya usawazishaji kutoka kwenye kitalu cha asili, wakithibitisha kuwa kila kitalu kinachofuata ni sahihi hadi kwenye kichwa cha mnyororo. Leo, wateja hutumia "vituo vya ukaguzi vya udhanifu dhaifu" ili kujiongoza hadi kwenye kichwa cha mnyororo. Vituo hivi vya ukaguzi ni sehemu za kuanzia zinazoaminika, kama vile kuwa na kitalu cha asili karibu na sasa badala ya mwanzo kabisa wa Ethereum. Hii inamaanisha kuwa wateja wanaweza kuacha taarifa zote kabla ya kituo cha ukaguzi cha udhanifu dhaifu cha hivi karibuni bila kupoteza uwezo wa kufanya usawazishaji hadi kwenye kichwa cha mnyororo. Wateja kwa sasa wanahudumia maombi (yanayowasili kupitia JSON-RPC) ya data ya kihistoria kwa kuichukua kutoka kwenye hifadhidata zao za ndani. Hata hivyo, kwa ukomo wa historia hii haitawezekana ikiwa data iliyoombwa imepunguzwa. Kuhudumia data hii ya kihistoria ndipo baadhi ya suluhu za kibunifu zinapohitajika.

Chaguo moja ni kwamba wateja wanaomba data ya kihistoria kutoka kwa marika kwa kutumia suluhisho kama vile Potal Netwoki. Potal Netwoki ni mtandao wa rika-kwa-rika unaoendelezwa kwa ajili ya kuhudumia data ya kihistoria ambapo kila nodi huhifadhi kipande kidogo cha historia ya Ethereum kiasi kwamba historia nzima inakuwepo ikisambazwa kwenye mtandao. Maombi yanahudumiwa kwa kutafuta marika wanaohifadhi data husika na kuiomba kutoka kwao. Vinginevyo, kwa kuwa kwa ujumla ni programu zinazohitaji ufikiaji wa data ya kihistoria, inaweza kuwa jukumu lao kuihifadhi. Kunaweza pia kuwa na wahusika wa kutosha wa kujitolea katika nafasi ya Ethereum ambao wangekuwa tayari kudumisha kumbukumbu za kihistoria. Inaweza kuwa DAO inayoundwa ili kudhibiti hifadhi ya data ya kihistoria, au kwa hakika utakuwa mchanganyiko wa chaguzi hizi zote. Watoa huduma havi wanaweza kuhudumia data kwa njia nyingi, kama vile kwenye torrent, FTP, Filecoin au IPFS.

Ukomo wa historia una utata kiasi kwa sababu hadi sasa Ethereum imekuwa ikihakikisha upatikanaji wa data yoyote ya kihistoria kwa njia isiyo ya moja kwa moja. Usawazishaji kamili kutoka kwenye kitalu cha asili umekuwa ukiwezekana kama kiwango, hata kama unategemea kujenga upya baadhi ya data za zamani kutoka kwenye vijipicha. Ukomo wa historia huhamisha jukumu la kutoa hakikisho hili nje ya itifaki kuu ya Ethereum. Hili linaweza kuanzisha hatari mpya za udhibiti ikiwa ni mashirika yaliyowekwa kati ambayo yanaishia kuingilia kati ili kutoa data ya kihistoria.

EIP-4444 bado haiko tayari kusafirishwa, lakini iko chini ya majadiliano yanayoendelea. Jambo la kufurahisha ni kwamba, changamoto za EIP-4444 si za kiufundi sana, bali zaidi ni usimamizi wa jamii. Ili hii isafirishwe, kunahitaji kuwa na ukubalifu wa jamii unaojumuisha sio tu makubaliano bali pia ahadi za kuhifadhi na kuhudumia data ya kihistoria kutoka kwa taasisi zinazoaminika.

Uboreshaji huu haubadilishi kimsingi jinsi nodi za Ethereum zinavyoshughulikia data ya hali, unabadilisha tu jinsi data ya kihistoria inavyofikiwa.

### Ukomo wa hali {#state-expiry}

Ukomo wa hali unarejelea kuondoa hali kutoka kwa nodi binafsi ikiwa haijafikiwa hivi karibuni. Kuna njia kadhaa ambazo hii inaweza kutekelezwa, ikiwa ni pamoja na:

- **Kukoma kwa kodi**: kutoza "kodi" kwa akaunti na kuzikomesha wakati kodi yao inafikia sifuri
- **Kukoma kwa muda**: kufanya akaunti zisifanye kazi ikiwa hakuna usomaji/uandishi kwenye akaunti hiyo kwa muda fulani

Kukoma kwa kodi kunaweza kuwa kodi ya moja kwa moja inayotozwa kwa akaunti ili kuziweka kwenye hifadhidata ya hali inayofanya kazi. Kukoma kwa muda kunaweza kuwa kwa kuhesabu kurudi nyuma kutoka kwenye mwingiliano wa mwisho wa akaunti, au inaweza kuwa ukomo wa mara kwa mara wa akaunti zote. Kunaweza pia kuwa na mifumo inayochanganya vipengele vya miundo inayotegemea muda na kodi, kwa mfano akaunti binafsi huendelea katika hali inayofanya kazi ikiwa zinalipa ada ndogo kabla ya ukomo unaotegemea muda. Kwa ukomo wa hali ni muhimu kutambua kwamba hali isiyofanya kazi **haifutwi**, inahifadhiwa tu tofauti na hali inayofanya kazi. Hali isiyofanya kazi inaweza kufufuliwa na kuwa hali inayofanya kazi.

Njia ambayo hii ingefanya kazi labda ni kuwa na mti wa hali kwa vipindi maalum vya muda (labda ~mwaka 1). Kila kipindi kipya kinapoanza, ndivyo pia mti mpya kabisa wa hali unavyoanza. Mti wa hali wa sasa pekee ndio unaoweza kurekebishwa, mingine yote isiyobadilika. Nodi za Ethereum zinatarajiwa tu kushikilia mti wa hali wa sasa na ule wa hivi karibuni zaidi. Hii inahitaji njia ya kuweka muhuri wa muda kwenye anwani na kipindi inachokuwepo. Kuna [njia kadhaa zinazowezekana](https://ethereum-magicians.org/t/types-of-resurrection-metadata-in-state-expiry/6607) za kufanya hivi, lakini chaguo kuu linahitaji [anwani zirefushwe](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485) ili kushughulikia taarifa za ziada na manufaa ya ziada kwamba anwani ndefu ni salama zaidi. Kipengee cha ramani ya njia kinachofanya hivi kinaitwa [upanuzi wa nafasi ya anwani](https://ethereum-magicians.org/t/increasing-address-size-from-20-to-32-bytes/5485).

Sawa na ukomo wa historia, chini ya ukomo wa hali jukumu la kuhifadhi data ya hali ya zamani linaondolewa kwa watumiaji binafsi na kusukumwa kwa taasisi zingine kama vile watoa huduma waliowekwa kati, wanajamii wanaojitolea au suluhu za ugatuzi za siku zijazo kama vile Potal Netwoki.

Ukomo wa hali bado uko katika awamu ya utafiti na bado hauko tayari kusafirishwa. Ukomo wa hali unaweza kutokea baadaye kuliko wateja wa ubilahali na ukomo wa historia kwa sababu uboreshaji huo hufanya ukubwa mkubwa wa hali kudhibitiwa kwa urahisi kwa idadi kubwa ya wathibitishaji.

## Ubilahali {#statelessness-2}

Ubilahali ni jina lisilo sahihi kidogo kwa sababu haimaanishi dhana ya "hali" imeondolewa, lakini inahusisha mabadiliko ya jinsi nodi za Ethereum zinavyoshughulikia data ya hali. Ubilahali wenyewe unakuja katika ladha mbili: ubilahali dhaifu na ubilahali thabiti. Ubilahali dhaifu huwezesha nodi nyingi kuwa ubilahali kwa kuweka jukumu la hifadhi ya hali kwa wachache. Ubilahali thabiti huondoa kabisa hitaji la nodi yoyote kuhifadhi data kamili ya hali. Ubilahali dhaifu na thabiti hutoa manufaa yafuatayo kwa wathibitishaji wa kawaida:

- usawazishaji wa karibu papo hapo
- uwezo wa kuthibitisha vitalu nje ya utaratibu
- nodi zinazoweza kufanya kazi na mahitaji madogo sana ya vifaa (k.m., kwenye simu)
- nodi zinaweza kufanya kazi juu ya diski kuu za bei nafuu kwa sababu hakuna usomaji/uandishi wa diski unaohitajika
- inaoana na uboreshaji wa siku zijazo wa kriptografia ya Ethereum

### Ubilahali Dhaifu {#weak-statelessness}

Ubilahali dhaifu unahusisha mabadiliko katika njia ambayo nodi za Ethereum huthibitisha mabadiliko ya hali, lakini hauondoi kabisa hitaji la hifadhi ya hali katika nodi zote kwenye mtandao. Badala yake, ubilahali dhaifu huweka jukumu la hifadhi ya hali kwa wapendekezaji wa vitalu, huku nodi zingine zote kwenye mtandao zikithibitisha vitalu bila kuhifadhi data kamili ya hali.

**Katika ubilahali dhaifu kupendekeza vitalu kunahitaji ufikiaji wa data kamili ya hali lakini kuthibitisha vitalu hakuhitaji data ya hali**

Ili hili lifanyike, [Miti ya Verkle](/roadmap/verkle-trees/) lazima iwe tayari imetekelezwa katika wateja wa Ethereum. Miti ya Verkle ni muundo mbadala wa data wa kuhifadhi data ya hali ya Ethereum unaoruhusu "mashahidi" wadogo, wa ukubwa uliowekwa kwa data kupitishwa kati ya marika na kutumika kuthibitisha vitalu badala ya kuthibitisha vitalu dhidi ya hifadhidata za ndani. [Utengano wa mpendekezaji na mjengaji (PBS)](/roadmap/pbs/) pia unahitajika kwa sababu hii inaruhusu wajengaji wa vitalu kuwa nodi maalum zilizo na vifaa vyenye nguvu zaidi, na hizo ndizo zinazohitaji ufikiaji wa data kamili ya hali.

<ExpandableCard title="Kwa nini ni sawa kutegemea wapendekezaji wachache wa kitalu?" eventCategory="/roadmap/statelessness" eventName="clicked why is it OK to rely on fewer block proposers?">

Ubilahali unategemea wajengaji wa vitalu kudumisha nakala ya data kamili ya hali ili waweze kuzalisha mashahidi ambao wanaweza kutumika kuthibitisha kitalu. Nodi zingine hazihitaji ufikiaji wa data ya hali, taarifa zote zinazohitajika kuthibitisha kitalu zinapatikana kwa shahidi. Hii inaunda hali ambapo kupendekeza kitalu ni ghali, lakini kuthibitisha kitalu ni nafuu, ambayo inamaanisha waendeshaji wachache wataendesha nodi ya kupendekeza kitalu. Hata hivyo, ugatuzi wa wapendekezaji wa vitalu sio muhimu mradi tu washiriki wengi iwezekanavyo wanaweza kuthibitisha kwa kujitegemea kwamba vitalu wanavyopendekeza ni halali.

<ButtonLink variant="outline-color" href="https://notes.ethereum.org/WUUUXBKWQXORxpFMlLWy-w#So-why-is-it-ok-to-have-expensive-proposers">Soma zaidi kwenye madokezo ya Dankrad</ButtonLink>
</ExpandableCard>

Wapendekezaji wa vitalu hutumia data ya hali kuunda "mashahidi" - seti ndogo ya data inayothibitisha thamani za hali zinazobadilishwa na miamala katika kitalu. Wathibitishaji wengine hawashikilii hali, wanahifadhi tu mzizi wa hali (heshi ya hali nzima). Wanapokea kitalu na shahidi na kuvitumia kusasisha mzizi wao wa hali. Hii inafanya nodi ya kuthibitisha kuwa nyepesi sana.

Ubilahali dhaifu uko katika hali ya juu ya utafiti, lakini unategemea utengano wa mpendekezaji na mjengaji na Miti ya Verkle kuwa imetekelezwa ili mashahidi wadogo waweze kupitishwa kati ya marika. Hii inamaanisha ubilahali dhaifu labda uko miaka michache kutoka kwenye Mtandao Mkuu wa Ethereum.

[zkEVM kwa uthibitishaji wa tabaka la 1 (l1)](/roadmap/zkevm/) ni teknolojia ya ziada inayoweza kuboresha zaidi uthibitishaji wa ubilahali. Badala ya kuangalia tu mashahidi, wathibitishaji wanaweza kuthibitisha uthibitisho wa maarifa-sifuri kwamba kitalu kizima kilitekelezwa kwa usahihi—kutoa uhakika wa kriptografia bila kutekeleza upya miamala.

### Ubilahali thabiti {#strong-statelessness}

Ubilahali thabiti huondoa hitaji la nodi yoyote kuhifadhi data ya hali. Badala yake, miamala inatumwa na mashahidi ambao wanaweza kujumlishwa na wazalishaji wa vitalu. Wazalishaji wa vitalu kisha wanawajibika kuhifadhi tu hali hiyo inayohitajika kwa kuzalisha mashahidi kwa akaunti husika. Jukumu la hali linahamishiwa karibu kabisa kwa watumiaji, kwani wanatuma mashahidi na 'orodha za ufikiaji' ili kutangaza ni akaunti na funguo zipi za hifadhi wanazoingiliana nazo. Hii itawezesha nodi nyepesi sana, lakini kuna mabadilishano ikiwa ni pamoja na kuifanya iwe vigumu zaidi kufanya miamala na mikataba mahiri.

Ubilahali thabiti umechunguzwa na watafiti lakini kwa sasa hautarajiwi kuwa sehemu ya ramani ya njia ya Ethereum - kuna uwezekano mkubwa kwamba ubilahali dhaifu unatosha kwa mahitaji ya kuongeza ukubwa ya Ethereum.

## Maendeleo ya sasa {#current-progress}

Ubilahali dhaifu, ukomo wa historia na ukomo wa hali zote ziko katika awamu ya utafiti na zinatarajiwa kusafirishwa miaka kadhaa kuanzia sasa. Hakuna hakikisho kwamba mapendekezo haya yote yatatekelezwa, kwa mfano, ikiwa ukomo wa hali utatekelezwa kwanza kunaweza kusiwe na haja ya kutekeleza pia ukomo wa historia. Pia kuna vipengee vingine vya ramani ya njia, kama vile [Miti ya Verkle](/roadmap/verkle-trees) na [Utengano wa mpendekezaji na mjengaji (PBS)](/roadmap/pbs) ambavyo vinahitaji kukamilishwa kwanza.

## Usomaji zaidi {#further-reading}

- [Ethereum ya Ubilahali ni nini?](https://stateless.fyi/)
- [AMA ya ubilahali ya Vitalik](https://www.reddit.com/r/ethereum/comments/o9s15i/impromptu_technical_ama_on_statelessness_and/)
- [Nadharia ya usimamizi wa ukubwa wa hali](https://hackmd.io/@vbuterin/state_size_management)
- [Ufungaji wa hali uliopunguza mzozo wa ufufuo](https://ethresear.ch/t/resurrection-conflict-minimized-state-bounding-take-2/8739)
- [Njia za ubilahali na ukomo wa hali](https://hackmd.io/@vbuterin/state_expiry_paths)
- [Uainishaji wa EIP-4444](https://eips.ethereum.org/EIPS/eip-4444)
- [Alex Stokes kuhusu EIP-4444](https://youtu.be/SfDC_qUZaos)
- [Kwa nini ni muhimu sana kuwa ubilahali](https://dankradfeist.de/ethereum/2021/02/14/why-stateless.html)
- [Madokezo ya asili ya dhana ya mteja wa ubilahali](https://ethresear.ch/t/the-stateless-client-concept/172)
- [Zaidi kuhusu ukomo wa hali](https://hackmd.io/@vbuterin/state_size_management#A-more-moderate-solution-state-expiry)
- [Zaidi sana kuhusu ukomo wa hali](https://hackmd.io/@vbuterin/state_expiry_paths#Option-2-per-epoch-state-expiry)
- [Ukurasa wa Taarifa wa Ethereum ya Ubilahali](https://stateless.fyi)