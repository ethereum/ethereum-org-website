---
title: Ramani ya njia ya faragha kwa Ethereum
description: Ethereum inafanya kazi kufanya faragha kuwa sifa ya daraja la kwanza ya mtandao kupitia maboresho yanayolinda faragha ya muamala, kulinda ufikiaji wa data ya mtumiaji, na kuwezesha utambulisho unaoweza kuthibitishwa lakini wa faragha.
lang: sw
image: /images/roadmap/roadmap-security.png
alt: Ramani ya njia ya Ethereum
template: roadmap
---

**Faragha kwenye Ethereum inahama kutoka kuwa nyongeza ya hiari hadi kuwa chaguo-msingi la kiwango cha mtandao.** Ramani za njia za faragha zilizopendekezwa za Ethereum zinalenga sehemu maalum za muunganisho zilizo hatarini ambapo data ya mtumiaji inaweza kuvuja leo. Utafiti kote kwenye mfumo wa ikolojia unalenga kuifanya Ethereum kuwa jukwaa ambapo faragha ni ya kimuundo badala ya kuwa ya hiari.

Watafiti katika Taasisi ya Ethereum wame[kusanya vipaumbele vitatu vya msingi vya ramani ya njia](https://pse.dev/blog/pse-roadmap-2025) kutoka kote kwenye utafiti uliosambazwa wa mfumo wa ikolojia:

- **Usomaji wa faragha** - hoji na uvinjari Ethereum bila kufichua ni anwani, mikataba, au data gani mtumiaji anafikia. Kulinda usomaji kunazuia data isikusanywe kabla hata muamala haujatiwa sahihi.
- **Uandishi wa faragha** - tuma miamala inayostahimili udhibiti na uvujaji wa data fafanuzi, kuanzia kujumuishwa kwenye mempool hadi ukamilishaji wa mwisho. Kulinda uandishi kunahakikisha miamala ya faragha haidhibitiwi au kuhusishwa na asili yake.
- **Uthibitishaji wa faragha** - thibitisha utambulisho, ustahiki, au data bila kufichua taarifa za kibinafsi za msingi, kwa kutumia uthibitisho bora wa sifuri-maarifa. Uthibitishaji wa faragha unaruhusu watumiaji kushiriki kwenye mtandao huku wakichagua kufichua tu taarifa za chini kabisa zinazohitajika (ufichuaji wa kuchagua).

Pamoja, maeneo haya matatu yanaunda muundo wa faragha wa mwanzo hadi mwisho. Lengo ni **mamlaka ya kikokotoo**, kuhakikisha Ethereum ni jukwaa ambapo watu binafsi na taasisi wanaweza kuingiliana, kuratibu, na kufanya miamala ulimwenguni kote bila ukusanyaji wa data usioidhinishwa, ufuatiliaji, au udhibiti uliowekwa kati.

**Kwa nini faragha ni muhimu?** Jifunze kuhusu faragha, jinsi ya kulinda faragha yako mtandaoni, na kulinda faragha yako kwenye Ethereum leo.

<ButtonLink variant="outline" href="/privacy/">Zaidi kuhusu faragha</ButtonLink>

## Usomaji wa faragha hulinda hoji za mtumiaji na data ya ufikiaji {#private-reads}

Kabla muamala haujatiwa sahihi, mtumiaji anahitaji kusoma data kutoka kwenye mnyororo wa vitalu. Ili kuangalia salio, kukadiria gesi, au kuthibitisha hali ya mkataba mahiri, programu ya mkoba hutuma hoji kwa mtoa huduma wa nodi. Hoji hizi za kawaida za **Remote Procedure Call (RPC)** hufichua kiasi kikubwa cha data fafanuzi.

Mtoa huduma wa nodi anaweza kuona anwani ya IP ya mtumiaji, alama ya kidole ya kifaa, anwani maalum zilizohojiwa, na muda na marudio ya shughuli zao. Hata kama mtumiaji kisha atatuma muamala wa faragha, mtoa huduma wa miundombinu tayari ana ufikiaji wa ramani ya kina ya malengo yao.

<VideoWatch slug="ethereum-privacy-stack-andy-guzman" />

Uvujaji wa data fafanuzi kwenye tabaka la ufikiaji ni mojawapo ya matatizo sugu ya faragha katika mifumo yote ya mnyororo wa vitalu. Ethereum inalenga kushughulikia uvujaji wa data fafanuzi kupitia faragha katika asili, au kuficha nani aliyeuliza, faragha katika maudhui, au kuficha kile kilichoulizwa, na kuthibitisha usahihi wa taarifa iliyorudishwa.

**Faragha ya asili** inatumia [RPC isiyojulikana](https://privreads.ethereum.foundation/feed/anon-rpc/) na suluhu za mtandao usiojulikana kuficha huluki inayoomba data, **faragha ya maudhui** inatumia mbinu kama vile urejeshaji wa taarifa za faragha na [oblivious RAM](https://en.wikipedia.org/wiki/Oblivious_RAM) kuficha data inayohojiwa, huku **uthibitishaji wa usahihi** ukitumia wateja wepesi kuthibitisha kuwa data iliyorudishwa ni sahihi.

Kijenzi cha kriptografia nyuma ya faragha ya maudhui ni [**Urejeshaji wa Taarifa za Faragha (PIR)**](https://en.wikipedia.org/wiki/Private_information_retrieval), mbinu ya kriptografia inayoruhusu mteja kuhoji hifadhidata na kurejesha kipande maalum cha taarifa bila kufichua kwa seva ni kipengee kipi kilifikiwa. Seva huchakata ombi bila kuona na kurudisha jibu la usimbaji fiche ambalo ni mkoba unaohoji pekee unaweza kusimbua.

PIR inafanya kazi kwenye tabaka la ufikiaji, ikikaa kati ya programu ya mkoba na watoa huduma wa nodi. Kadiri utekelezaji wa PIR unavyokomaa utaunganishwa kwenye vifaa vya ukuzaji wa programu za mkoba (SDKs) na watoa huduma wa miundombinu, kuruhusu watumiaji kuhoji mtandao bila kufichua shughuli zao kwa waamuzi waliowekwa kati.

Usomaji wa faragha pia hupunguza uwezekano wa kushambuliwa kwa utangulizaji muamala na upangaji wa miamala. Ikiwa mtoa huduma wa miundombinu hawezi kuona ni mkataba mahiri au anwani gani mtumiaji anahoji, hawezi kuuza taarifa hiyo kwa wahusika wanaofaidika kwa kutarajia shughuli mnyororoni.

## Uandishi wa faragha huzuia udhibiti na uvujaji wa muamala {#private-writes}

Mara tu muamala unapotumwa, hupitia miundombinu ya mtandao inayoweza kuutazama au kuuzuia kabla haujarekodiwa mnyororoni. Hapa ndipo itifaki nyingi za faragha hufeli katika utendaji. Wajenga kizuizi wakubwa, waliowekwa kati hufuatilia mempool na wanaweza kuweka kando kimyakimya au kudhibiti miamala inayotoka kwenye zana za faragha. Hata kama kriptografia ya msingi ni thabiti, muamala ambao haujawahi kujumuishwa kwenye kitalu hautoi ulinzi wowote.

Maboresho mawili ya kiwango cha itifaki yanashughulikia tatizo hili kwa pamoja:

[**EIP-8141 (Miamala ya Fremu)**](https://eips.ethereum.org/EIPS/eip-8141) inaleta aina mpya ya muamala inayotenganisha miamala katika sehemu kwa ajili ya uthibitishaji wa sahihi na uidhinishaji wa ada, na kwa ajili ya maagizo halisi ya muamala. Miamala ya fremu inaruhusu [akaunti mahiri](/roadmap/account-abstraction/) kufafanua mifumo yao wenyewe ya sahihi na kutumia mikataba ya nje kulipia ada za gesi. Sheria kali za kutenganisha (sandboxing) kwenye mempool huzuia miamala hii kufungua mtandao kwa mashambulizi ya kunyima huduma (denial-of-service).

Miamala ya fremu inafikiriwa kwa ajili ya [boresho la Hegotá](https://forkcast.org/upgrade/hegota/) la Ethereum, boresho linalofuata la mtandao baada ya [boresho la Glamsterdam](/roadmap/glamsterdam/) linalokuja. Boresho hilo hilo pia litaruhusu akaunti mahiri kupitisha [sahihi salama za kwanta (quantum-safe)](/roadmap/security/quantum-resistance/) kabla ya mpito kamili wa mtandao wa baada ya kwanta kukamilika.

<ExpandableCard title="Je, miamala ya fremu (EIP-8141) inawezeshaje faragha?" eventCategory="/roadmap/privacy" eventName="clicked how do frame transactions enable privacy?">

Miamala ya fremu inaruhusu akaunti kuchagua mbinu yao wenyewe ya uthibitishaji wa sahihi. Kwa faragha, hii inamaanisha watumiaji wanaweza kupitisha mifumo ya sahihi inayohifadhi faragha bila kusubiri uhamiaji mkubwa wa mtandao mzima. Miamala ya fremu pia inaruhusu uondoaji wa ada ya gesi, kuruhusu zana za faragha kulipia gharama za muamala bila kufichua anwani za mtumiaji mnyororoni.

</ExpandableCard>

[**EIP-7805 (Orodha za Ujumuishaji Zinazotekelezwa na Chaguo la Mchepuo, au FOCIL)**](https://eips.ethereum.org/EIPS/eip-7805) inatoa utaratibu wa utekelezaji kwa uandishi wa faragha. Wapendekezaji wa kitalu wanatakiwa na sheria za mwafaka kujumuisha miamala kwenye vitalu vyao kutoka kwenye orodha za ujumuishaji za ndani zilizokusanywa, ambazo hukusanya miamala kutoka vyanzo vingi. Ikiwa mjenga kizuizi atajaribu kudhibiti muamala ulioonekana kwenye orodha za ujumuishaji, nodi zinazothibitisha hukataa kitalu kilichopendekezwa kabisa. FOCIL kwa sasa inafikiriwa kwa ajili ya [boresho la Hegotá](https://forkcast.org/upgrade/hegota/).

Miamala ya fremu inawapa watumiaji unyumbufu wa kujenga miamala inayohifadhi faragha kwa kutumia mifumo maalum ya sahihi, huku FOCIL ikihakikisha miamala hiyo haiwezi kudhibitiwa kwa kuchagua mara tu inapoingia kwenye mempool. Pamoja zinashughulikia pointi mbili tofauti za kufeli: moja inawezesha muundo wa miamala ya faragha, nyingine inahakikisha ujumuishaji wake. Hakuna mhusika mkuu anayeweza kuzuia hamisho halali la faragha.

<VideoWatch slug="eip-7805-focil-explained" />

Sehemu ya pili iliyo hatarini kwa faragha ya mtumiaji ni jinsi Ethereum inavyofuatilia mpangilio wa miamala, unaoitwa mfumo wa nonsi unaofuatana. Katika muundo wa kawaida wa akaunti ya Ethereum, kila akaunti inatumia kihesabu kimoja kinachoongezeka kwa mstari. Ikiwa muamala mmoja wa faragha utacheleweshwa kwenye mempool, miamala yote inayofuata kutoka kwenye akaunti hiyo inakwama nyuma yake. Mfuatano wa nonsi pia unaruhusu waangalizi wa mtandao kuhusisha miamala mingi na akaunti ile ile iliyoanzisha, na kudhoofisha faragha.

[**EIP-8250 (Nonsi Zenye Ufunguo kwa Miamala ya Fremu)**](https://eips.ethereum.org/EIPS/eip-8250), ambayo kwa sasa inafikiriwa kwa ajili ya Hegotá, inasuluhisha hili kwa kuruhusu akaunti moja kudhibiti mifuatano mingi ya miamala sambamba kwa wakati mmoja. Watumiaji wanaweza kutekeleza miamala mingi ya faragha katika miktadha tofauti kwa wakati mmoja, na waangalizi hawawezi tena kuhusisha kwa uhakika shughuli tofauti na akaunti kuu ile ile.

### Malipo ya faragha na hamisho la thamani {#private-payments}

Zaidi ya uelekezaji wa muamala na usimamizi wa nonsi, kulinda uandishi kunahitaji kukinga utambulisho na mali zinazohusika katika hamisho. Hata wakati mtumiaji anahoji kwa faragha na kutangaza muamala bila udhibiti, data ya muamala iliyorekodiwa mnyororoni inasalia kuonekana kwa umma. Mtu yeyote anaweza kuona nani alituma kiasi gani kwa nani, na kampuni za uchambuzi wa mnyororo hukusanya data hii katika wasifu unaoweza kutafutwa ambao hudumu kwa muda usiojulikana.

[**EIP-8182 (Mahamisho ya Faragha ya ETH na ERC-20)**](https://eips.ethereum.org/EIPS/eip-8182), iliyopendekezwa kwa ajili ya boresho la Hegotá, inaleta dimbwi asilia, lililoshirikiwa na kukingwa moja kwa moja kwenye itifaki ya Ethereum kwa ajili ya mahamisho ya ETH na ERC-20. Madimbwi ya faragha hutumia mchanganyiko wa kriptografia kukata kiungo kati ya uwekaji na utoaji, lakini yanapatikana tu kupitia programu za faragha, mikoba, na mitandao ya tabaka la 2 (l2) leo.

Kihistoria, suluhu za faragha za kiwango cha programu zimevunja ukwasi na kuteseka kutokana na seti ndogo za kutojulikana. EIP-8182 inajumuisha mahamisho yaliyokingwa katika kiwango cha itifaki, kuruhusu watumiaji kuelekeza fedha kupitia funguo zilizofichwa za uwasilishaji bila kuhitaji miundo maalum ya mkoba au kuingiliana na programu zilizogawanyika, za hiari.

Mbinu zingine za utafiti zinazoendelezwa kwa ajili ya faragha ya muamala ni pamoja na uthibitisho unaoruhusu watumiaji kuonyesha kuwa kiasi cha muamala ni halali bila kufichua thamani halisi (kama vile bulletproofs na range proofs). Utafiti kuhusu **miamala ya siri** unalenga kuficha kiasi huku bado ukiruhusu mtandao kuthibitisha kuwa hakuna thamani inayoundwa au kuharibiwa.

Suluhu hizi za tabaka la malipo zinajengwa kwenye miundombinu iliyoelezwa hapo awali katika sehemu hii. PIR inalinda awamu ya maandalizi, miamala ya fremu na FOCIL zinahakikisha malipo ya faragha yanafika kwenye mempool bila udhibiti, na zkVMs zinawezesha kriptografia changamano inayohitajika kwa kuficha thamani huku zikidumisha hakikisho la usalama wa mtandao.

## Uthibitishaji wa faragha na ulinzi wa utambulisho {#private-proving}

Faragha haihusu ufichaji kamili. Inahusu **ufichuaji wa kuchagua**, au kuchagua ni taarifa gani ya kufichua, kwa nani, na kwa masharti gani. Ethereum inasaidia ufichuaji wa kuchagua kupitia [**uthibitisho wa sifuri-maarifa (ZKPs)**](/zero-knowledge-proofs/), ambao unaruhusu upande mmoja kuthibitisha kuwa taarifa ni ya kweli bila kufichua data ya msingi. Kwa mfano, kuthibitisha uraia bila kufichua maelezo ya pasipoti, au kuthibitisha kizingiti cha umri bila kufichua tarehe halisi ya kuzaliwa.

Uthibitishaji wa faragha unaunganishwa na ramani ya njia ya faragha kwa kuwezesha utambulisho unaoweza kuthibitishwa bila kufichua data katika kiwango cha itifaki. Wakati usomaji na uandishi wa faragha unalinda data fafanuzi ya muamala, uthibitishaji wa faragha unahakikisha kuwa ukaguzi wa utambulisho na ustahiki unaohitajika kwa ushiriki wa ulimwengu halisi hauhitaji kusalimisha data ya kibinafsi kwa mifumo ya uthibitishaji iliyowekwa kati.

Kwenye ramani ya njia ya faragha ya Ethereum, uthibitishaji wa faragha unasaidiwa na njia za miundombinu zinazokamilishana, moja kwenye tabaka la utekelezaji ili kufanya ukokotoaji wa faragha uwezekane katika kiwango cha itifaki, na moja kwenye tabaka la ufikiaji, ambalo hufanya ukokotoaji wa faragha uwe wa vitendo kwenye vifaa vya watumiaji.

**Mashine pepe za sifuri-maarifa (zkVMs)** zinaruhusu mikataba mahiri kuendesha mantiki yake na kutoa uthibitisho wa kriptografia kwamba kazi ilifanywa kwa usahihi. Wakati uthibitisho huo ni wa sifuri-maarifa kweli, haufichui chochote kuhusu pembejeo, hali ya kati, au matokeo, na kufungua ukokotoaji wa faragha katika kiwango cha mtandao.

Jina la "zkVM" lina maana fiche; mifumo mingi inayoitwa zkVMs leo ni fupi (succinct) badala ya sifuri-maarifa. Uthibitisho wao ni mdogo na wa haraka kuthibitisha, lakini si lazima ufiche data iliyotumika kuuzalisha. Leo, ni mifumo michache tu ya uthibitishaji inayotoa sifa ya kuficha ambayo programu za faragha hutegemea. [Viwango vya Uthibitishaji wa Upande wa Mteja](https://ethproofs.org/csp-benchmarks) hufuatilia ni zkVMs zipi zimechambuliwa kwa sifuri-maarifa halisi katika sifa za mfumo wao. Kuziba pengo hilo ni sehemu ya kazi ya uthibitishaji wa faragha ya ramani ya njia.

Miamala ya fremu (EIP-8141) pia imeunganishwa na utekelezaji wa zkVMs. Inaweza kutumia mifumo maalum ya uthibitishaji kuwasilisha mabadiliko ya hali yaliyothibitishwa, kuruhusu programu kutoa mazingira ya utekelezaji wa faragha na kuwasilisha uthibitisho wa kriptografia kwenye mtandao wa umma wa Ethereum kwamba kitendo kilifanywa kwa usahihi, bila kufichua data ya muamala yenyewe.

Uthibitisho wa sifuri-maarifa ni bora kwa kuruhusu watu binafsi kuthibitisha kuwa data yao ni halali huku wakiiweka faragha, lakini hawawezi kudhibiti kwa urahisi mikataba mahiri ambapo watumiaji wengi wanahitaji kuingiliana na dimbwi lililoshirikiwa la data ya siri kwa wakati mmoja.

Ili kuziba pengo hili, ramani ya njia ya Ethereum inajumuisha **Usimbaji Fiche Kamili wa Homomofiki (FHE)**. FHE inaruhusu mikataba mahiri kuendesha hesabu moja kwa moja kwenye data iliyosimbwa fiche bila kulazimika kusimbua au kufichua taarifa ya msingi. Kuunganisha vijenzi vya FHE na vichakataji saidizi maalum vya kriptografia kwenye Ethereum ni muhimu kwa programu zilizogatuliwa zinazotegemea "hali iliyofichwa" iliyoshirikiwa, kama vile waundaji soko wa kiotomatiki wa faragha (AMMs), madimbwi ya siri ya ukopeshaji, au minada ya zabuni iliyofungwa ambapo pembejeo za kila mtu lazima ziingiliane huku zikisalia kuwa siri kabisa.

**Uthibitishaji wa upande wa mteja** hufanya uzalishaji wa uthibitisho huu wa faragha kuwa wa vitendo kwenye vifaa vya kila siku. Mradi wa Uthibitishaji wa Upande wa Mteja unadumisha kitengo cha viwango vya umma kinacholinganisha mifumo ya uthibitishaji na zkVMs kwenye maunzi ya watumiaji, na kuchapisha matokeo kwenye [ethproofs.org](https://ethproofs.org). Utafiti wa kiufundi unalenga uthibitisho wa wazi, wa [baada ya kwanta](/roadmap/security/quantum-resistance/) wenye uthibitishaji wa moja kwa moja mnyororoni, na kufanya ukokotoaji wa faragha kuwa wa haraka, rahisi kuthibitisha moja kwa moja kwenye mtandao wa Ethereum, na unaowezekana kwenye vifaa vya mkononi.

[**Mpango wa zkID**](https://pse.dev/projects/zk-id) umezalisha miundombinu ya chanzo wazi inayoendana na mifumo ya utambulisho wa kimataifa, ikiwa ni pamoja na mkoba wa Utambulisho wa Kidijitali wa Ulaya (EUDI). Mfumo wa Vitambulisho Wazi Visivyojulikana (OpenAC) unatoa kutohusishwa kwa vitambulisho vilivyotolewa, kuhakikisha kuwa uthibitisho mwingi unaozalishwa na mtumiaji yule yule kwenye majukwaa tofauti hauwezi kuhusishwa na wasifu mmoja.

Katika nafasi ya utawala, itifaki ya [**Miundombinu Ndogo ya Kuzuia Njama (MACI)**](https://maci.pse.dev/) inatoa **kutokuwa na stakabadhi**, na kuifanya iwezekane kwa njia ya kriptografia kuthibitisha jinsi akaunti ilivyopiga kura. Kwa sababu wapiga kura hawawezi kutoa stakabadhi inayoonyesha chaguo lao, ununuzi wa kura na shuruti hupoteza motisha yao ya kiuchumi. MACI imelinda maamuzi ya ufadhili wa ulimwengu halisi tangu 2020 kupitia [clr.fund](https://clr.fund/), ambayo imesambaza mamilioni ya dola katika ufadhili wa kipeo cha pili kwa ajili ya bidhaa za umma za Ethereum.

Upigaji kura unaohifadhi faragha tayari unalinda wapiga kura halisi katika mazingira yenye hatari kubwa. [Zana ya Uhuru ya Rarimo](https://docs.rarimo.com/freedom-tool/) inatumia uthibitishaji wa pasipoti wa sifuri-maarifa kuruhusu raia kuthibitisha kuwa wanastahili kupiga kura bila kufichua wao ni nani. Imewezesha chaguzi za kivuli zisizojulikana na kura za maoni za upinzani katika nchi zikiwemo Urusi (kura ya upinzani ya [Russia2024](https://rarimo.medium.com/russian-opposition-use-rarimos-freedom-tool-to-launch-surveillance-free-voting-app-0d73ebea5e8a)), Georgia (programu ya kupiga kura ya United Space), na Iran (mradi wa Iranians Vote), ambapo usalama wa mpiga kura unategemea usiri wa kura wa kriptografia.

Uthibitishaji wa faragha pia unawezesha **faragha inayozingatia utiifu**. Suluhu za faragha kama vile madimbwi ya faragha hukubali amana kwa uhuru lakini huhitaji watumiaji kutoa uthibitisho wa sifuri-maarifa kwamba fedha zao haziingiliani na anwani zinazojulikana kuwa mbaya kabla ya utoaji. Muundo wa utiifu unaoweza kupangwa hutenganisha kitendo cha kukinga miamala na kitendo cha kuonyesha utiifu wa udhibiti, kuruhusu watumiaji wa kila siku kufanya miamala kwa faragha huku wakitimiza mahitaji ya kitaasisi.

zkEVMs zinaweza kutekeleza ukaguzi huu wa utiifu kwa faragha, kuthibitisha hali ya udhibiti bila kufichua maelezo ya muamala au utambulisho wa mtumiaji.

## Maendeleo ya sasa ya ramani ya njia {#current-progress}

Mwelekeo wa maendeleo ya faragha kwenye Ethereum unaundwa na upatanishi wa mfumo mzima wa ikolojia badala ya shirika lolote moja. Ramani ya njia ya [strawmap.org](https://strawmap.org/) inakusanya maboresho yaliyopendekezwa kutoka kote kwenye mfumo wa ikolojia ili kufuatilia na kupendekeza ambapo jumuiya imefikia mwafaka. Watafiti katika Taasisi ya Ethereum husaidia kusimamia ramani ya njia sambamba ya utafiti na maendeleo kote kwenye mfumo wa ikolojia wa utafiti, inayolenga kuendeleza zana za faragha za tabaka la ufikiaji, miundombinu ya utambulisho, na mifumo inayozingatia utiifu. Mifano yote miwili inaonyesha kipaumbele kile kile cha msingi cha kufanya faragha kwenye Ethereum kuwa ya kimuundo badala ya hiari.

Utafiti na maendeleo katika faragha kwenye Ethereum unahusisha makumi ya timu kote kwenye mfumo wa ikolojia. Kazi inaendelea kwenye maboresho ya itifaki, suluhu za tabaka la ufikiaji, miundombinu ya utambulisho, na zana zinazozingatia utiifu.

**Maboresho ya itifaki**: EIP-8141 (Miamala ya Fremu), EIP-7805 (FOCIL), EIP-8250 (Nonsi Zenye Ufunguo), na EIP-8182 (Madimbwi Yaliyokingwa ya Kiwango cha Itifaki) yako katika maendeleo amilifu na yanafikiriwa kwa ajili ya [boresho la Hegotá](https://forkcast.org/upgrade/hegota/), boresho linalofuata la mtandao baada ya [Glamsterdam](/roadmap/glamsterdam/). EIP-8025 (uthibitisho wa utekelezaji wa hiari) na Miti ya Verkle pia zinalengwa kwa ajili ya Hegotá, zikitoa msingi wa ukokotoaji wa faragha unaotegemea zkEVM kwenye Mtandao Mkuu wa Ethereum. Sambamba na hilo, utafiti unakomaa kuhusu vichakataji saidizi vya FHE ili kuwezesha mikataba mahiri iliyosimbwa fiche ya pande nyingi.

**Tabaka la ufikiaji**: Utafiti wa PIR unaendelea na utekelezaji amilifu ukijaribiwa na timu za miundombinu. SDK ya mkoba wa Kohaku inatengenezwa kama rejeleo la chanzo wazi kwa mikoba inayohifadhi faragha.

**Uthibitishaji wa upande wa mteja**: Timu zinatumia kikamilifu matokeo ya majaribio yanayoendeshwa na viwango ili kuboresha jinsi uthibitisho wa sifuri-maarifa unavyoendeshwa kwenye vifaa vya kawaida. Miradi kama Spartan-WHIR inaendeleza uthibitisho salama, unaostahimili kwanta ambao unaweza kuthibitishwa kwa urahisi moja kwa moja kwenye mtandao wa Ethereum. Mipango ya utafiti kama leanVM inatoa zkVM nyepesi iliyoundwa kuunganisha sahihi nyingi za kriptografia pamoja, ikipunguza ukubwa wa data wa sahihi salama za kwanta kwa mara 250 ili kuokoa nafasi na kupunguza gharama za mtandao.

**Utambulisho na uthibitishaji**: Mpango wa zkID unazalisha mifumo iliyoboreshwa ya uthibitishaji kwa vifaa vya mkononi. MACI inaendelea kulinda raundi za ufadhili wa kipeo cha pili na utawala wa DAO, zana kama Zana ya Uhuru ya Rarimo zinapeleka upigaji kura wa sifuri-maarifa kwenye chaguzi za ulimwengu halisi, na utafiti unaoendelea unaendelea katika viwango vya utambulisho vinavyohifadhi faragha.

Hakuna sehemu ya kazi hii iliyokamilika. Ratiba ni malengo, si hakikisho, na [mchakato wa utawala unaotegemea mwafaka](/governance/) wa Ethereum unamaanisha kuwa ramani ya njia inaweza kubadilika kadiri utafiti unavyoendelea. Lakini upeo wa maendeleo amilifu na idadi ya timu zinazofanya kazi kwenye faragha zinawakilisha dhamira ya wazi ya kuifanya Ethereum istahimili uchimbaji (extraction-resistant) kwa chaguo-msingi.

## Usomaji zaidi {#further-reading}

- [Faragha kwenye Ethereum](/privacy/)
- [Ramani ya Njia ya PSE: 2025 na Kuendelea](https://pse.dev/blog/pse-roadmap-2025)
- [Mamlaka ya Taasisi ya Ethereum](/foundation/mandate/)
- [strawmap.org](https://strawmap.org/)
- [Uthibitisho wa sifuri-maarifa](/zero-knowledge-proofs/)
- [Utambulisho uliogatuliwa](/decentralized-identity/)
- [Ramani ya Njia ya Kohaku](https://notes.ethereum.org/@niard/KohakuRoadmap)
- [Viwango vya Uthibitishaji wa Upande wa Mteja](https://ethproofs.org/csp-benchmarks)
- [zkEVM kwa Nambari](https://zkevm.ethereum.foundation/)