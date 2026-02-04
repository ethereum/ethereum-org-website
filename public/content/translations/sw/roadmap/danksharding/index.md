---
title: Ugawanyikaji wa Dank
description: Jifunze kuhusu Proto-Danksharding na Danksharding - visasisho viwili mfululizo vya kuongeza viwango vya Ethereum.
lang: sw
summaryPoints:
  - Danksharding ni uboreshaji wa awamu nyingi ili kuboresha uimara na uwezo wa Ethereum.
  - Hatua ya kwanza, Proto-Danksharding, inaongeza data kwenye vitalu
  - Blobs za data zinatoa njia rahisi zaidi kwa rollups kutoa machapisho ya Ethereum na gharama hizo zinaweza kupitishwa kwa watumiaji kwa njia ya Gharama Nafuu Ya Miamala.
  - Baadaye, Danksharding kamili itaeneza jukumu la kuthibitisha blobs za data kwenye sehemu ndogo za nodi, na kupanua zaidi Ethereum hadi zaidi ya miamala 100,000 kwa sekunde.
---

# Danksharding {#danksharding}

**Danksharding** ni jinsi Ethereum inavyokuwa blockchain inayoweza kupanuka kikweli, lakini kuna uboreshaji kadhaa wa itifaki unaohitajika ili kufika hapo. **Proto-Danksharding** ni hatua ya kati katika mchakato huo. Zote mbili zinalenga kufanya miamala kwenye Layer 2 iwe nafuu iwezekanavyo kwa watumiaji na zinapaswa kuongeza Ethereum hadi >100,000 ya miamala kwa sekunde.

## Proto-Danksharding ni nini? {#what-is-protodanksharding}

Proto-Danksharding, inayojulikana pia kama [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ni njia kwa [rollups](/layer-2/#rollups) kuongeza data nafuu zaidi kwenye vizuizi. Jina linatokana na watafiti wawili waliopendekeza wazo hilo: Protolambda na Dankrad Feist. Kihistoria, rollups zilikuwa na kikomo katika jinsi zinavyoweza kufanya miamala ya watumiaji kuwa nafuu kwa sababu ya ukweli kwamba zinachapisha miamala yao katika `CALLDATA`.

Hii ni ghali kwa sababu inachakatwa na nodi zote za Ethereum na inabaki kwenye mnyororo milele, ingawa rollups zinahitaji data hiyo kwa muda mfupi tu. Proto-Danksharding inaleta blobs za data ambazo zinaweza kutumwa na kuambatanishwa kwenye vitalu. Data katika blobs hizi haiwezi kufikiwa na EVM na huondolewa moja kwa moja baada ya kipindi maalumu cha muda (kimewekwa kuwa epochs 4096 kwa wakati wa kuandika, au takriban siku 18). Hii inamaanisha kuwa rollups zinaweza kutuma data zao kwa gharama nafuu zaidi na kupeleka akiba hiyo kwa watumiaji wa mwisho kwa njia ya miamala ya bei nafuu.

<ExpandableCard title="Kwa nini blobs hufanya rollups kuwa nafuu zaidi?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Rollups ni njia ya kupanua Ethereum kwa kuunganisha miamala nje ya mnyororo kisha kuchapisha matokeo kwenye Ethereum. Rollup kwa msingi wake unaundwa na sehemu mbili: data na ukaguzi wa utekelezaji. Data ni mfuatano kamili wa miamala iliyochakatwa na rollup ili kutoa mabadiliko ya hali yanayochapishwa kwenye Ethereum. Ukaguzi wa utekelezaji ni utekelezaji upya wa miamala hiyo inayofanywa na mchezaji mwaminifu (anaejulikana kama "prover") ili kuhakikisha kuwa mabadiliko ya hali yaliyopendekezwa ni sahihi. Ili kufanya ukaguzi wa utekelezaji, data ya muamala lazima ipatikane kwa muda wa kutosha ili mtu yeyote apakue na kuangalia. Hii inamaanisha kuwa tabia yoyote isiyo ya kweli ya mpangaji wa rollup inaweza kubainishwa na kupingwa na prover. Hata hivyo, haihitaji kupatikana milele.

</ExpandableCard>

<ExpandableCard title="Kwa nini ni sawa kufuta data za blob?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Rollups huchapisha ahadi za data zao za miamala kwenye mnyororo na pia hufanya data halisi ipatikane katika blobs za data. Hii inamaanisha kuwa provers wanaweza kukagua kama ahadi hizo ni halali au kupinga data wanayodhani ni yenye makosa. Kiwango cha nodi, blobs za data zinashikiliwa na mteja wa makubaliano. Wateja wa makubaliano wanathibitisha kuwa wameona data hiyo na kwamba imeenezwa katika mtandao mzima. Kama data ingehifadhiwa milele, wateja hawa wangekuwa na mzigo mkubwa na kusababisha mahitaji makubwa ya vifaa kwa kuendesha nodi. Badala yake, data huondolewa moja kwa moja kutoka kwenye nodi kila baada ya siku 18. Thibitisho za wateja wa makubaliano zinaonyesha kwamba kulikuwa na nafasi ya kutosha kwa provers kuthibitisha data. Data halisi inaweza kuhifadhiwa nje ya mnyororo na waendeshaji wa rollup, watumiaji, au wengine.

</ExpandableCard>

### Je, data ya blob inathibitishwaje? {#how-are-blobs-verified}

Rollups huchapisha miamala wanayoitekeleza katika blobs za data. Pia huchapisha "ahadi" kwa data hiyo. Hufanya hivi kwa kufananisha kazi ya polynomial na data hiyo. Kazi hii inaweza kisha kutathminiwa kwenye pointi mbalimbali. Kwa mfano, tukifafanua kazi rahisi sana `f(x) = 2x-1` basi tunaweza kutathmini kazi hii kwa `x = 1`, `x = 2`, `x = 3` na kupata matokeo `1, 3, 5`. Prover anatumia kazi ile ile kwenye data na kutathmini kwenye pointi sawa. Iwapo data ya awali itabadilishwa, kazi hiyo haitakuwa ile ile, na kwa hivyo thamani zinazopatikana kwenye kila pointi pia hazitakuwa sawa. Kwenye ukweli, ahadi na uthibitisho ni mgumu zaidi kwa sababu zimefungwa ndani ya kazi za kriptografia.

### KZG ni nini? {#what-is-kzg}

KZG ni kifupi cha Kate-Zaverucha-Goldberg - majina ya [waandishi watatu wa asili](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) wa mpango unaopunguza donge la data na kulifanya liwe ["ahadi" ya kriptografia](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html) ndogo. Blob ya data iliyowasilishwa na rollup lazima ithiibishwe ili kuhakikisha kuwa rollup haijatenda vibaya. Hii inahusisha prover kurudia kutekeleza miamala iliyoko kwenye blob ili kuangalia kuwa ahadi ilikuwa halali. Hii kwa dhana ni sawa na jinsi wateja wa utekelezaji wanavyokagua uhalali wa miamala ya Ethereum kwenye tabaka la 1 kwa kutumia uthibitisho wa Merkle. KZG ni uthibitisho mbadala unaofananisha mlinganyo wa polynomial na data. Ahadi inathibitisha polynomial kwa kutathmini kwenye pointi fulani za siri. Prover atafananisha polynomial ile ile juu ya data na kutathmini kwenye thamani sawa, akikagua kwamba matokeo ni yale yale. Hii ni njia ya kuthibitisha data ambayo inalingana na mbinu za zero-knowledge zinazotumika na baadhi ya rollups na hatimaye sehemu nyingine za itifaki ya Ethereum.

### Sherehe ya KZG ilikuwa nini? {#what-is-a-kzg-ceremony}

Sherehe ya KZG ilikuwa njia ya watu wengi kutoka jamii ya Ethereum kushirikiana kuunda mfuatano wa namba za siri za nasibu ambazo zinaweza kutumika kuthibitisha baadhi ya data. Ni muhimu sana kwamba mfuatano huu wa namba usijulikane na usiweze kuundwa upya na mtu yeyote. Ili kuhakikisha hili, kila mtu aliyeshiriki katika sherehe alipokea mfuatano kutoka kwa mshiriki aliyetangulia kabla yake. Kisha wakatengeneza thamani mpya za nasibu (k.m., kwa kuruhusu kivinjari chao kupima msogeo wa kipanya chao) na kuichanganya na thamani ya awali. Baada ya hapo walituma thamani hiyo kwa mshiriki aliyefuata na kuifuta kutoka kwenye kompyuta yao ya ndani. Iwapo mtu mmoja tu katika sherehe alifanya hivi kwa uaminifu, thamani ya mwisho haitajulikana kwa mshambuliaji.

Sherehe ya KZG ya EIP-4844 ilikuwa wazi kwa umma na maelfu ya watu walishiriki kuongeza usahihi wao wa nasibu (randomness). Kwa jumla kulikuwa na michango zaidi ya 140,000, na kuifanya kuwa sherehe kubwa zaidi ya aina yake duniani. Ili sherehe hiyo kudhuriwa, washiriki 100% wa sherehe hiyo wangehitajika kuwa wa udanganyifu kikamilifu. Kutoka kwa mtazamo wa washiriki, ikiwa wanajua walikuwa waaminifu, hakuna haja ya kumuamini mtu mwingine kwa sababu wanajua kwamba walihakikisha sherehe hiyo salama (kila mmoja alitimiza sharti la mshiriki 1-kati -ya -N kuwa waaminifu).

<ExpandableCard title="Namba ya nasibu kutoka kwenye sherehe ya KZG hutumika kwa nini?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Wakati rollup inachapisha data katika blob, wanatoa "ahadi" ambayo wanachapisha kwenye mnyororo. Ahadi hii ni matokeo ya kutathmini polynomial iliyofanana na data kwenye pointi fulani. Pointi hizi zinafafanuliwa na namba za nasibu zilizotengenezwa katika sherehe ya KZG. Provers kisha wanaweza kutathmini polynomial kwenye pointi zile zile ili kuthibitisha data—ikiwa wanapata thamani sawa basi data ni sahihi.

</ExpandableCard>

<ExpandableCard title="Kwa nini data ya nasibu ya KZG inapaswa kubaki siri?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Iwapo mtu anajua maeneo ya nasibu yaliyotumika kwa ahadi, ni rahisi kwao kuunda polynomial mpya inayofanana na pointi hizo maalum (yaani, "mgongano"). Hii inamaanisha wanaweza kuongeza au kuondoa data kutoka kwenye blob na bado ikatoa uthibitisho halali. Ili kuzuia hili, badala ya kutoa provers maeneo halisi ya siri, wanapokea maeneo hayo yaliyofungwa ndani ya "sanduku jeusi" la kriptografia kwa kutumia mizunguko ya elliptic. Hizi kwa ufanisi huchanganya thamani kwa namna ambayo thamani za awali haziwezi kutengenezwa tena, lakini kwa kutumia algebra mahiri provers na wakaguzi bado wanaweza kutathmini polynomials kwenye pointi wanazowakilisha.

</ExpandableCard>

<Alert variant="warning" className="mb-8">
  Hapana Danksharding wala Proto-Danksharding hawafuati mfano wa kawaida wa "sharding" unaolenga kugawanya kiambajengo katika sehemu nyingi. Mnyororo wa shard sasa si sehemu ya mpango wa utekelezaji. Badala yake, Danksharding inatumia sampuli za data zilizogawanywa kwenye blobs kupanua Ethereum. Hii ni rahisi zaidi kutekeleza. Mfumo huu mara nyingine unaitwa "data-sharding".
</Alert>

## Danksharding ni nini? {#what-is-danksharding}

Danksharding ni utekelezaji kamili wa upanuzi wa rollup ulioanza na Proto-Danksharding. Danksharding italeta nafasi kubwa sana kwenye Ethereum ili rollups waweze kuingiza data zao za miamala zilizokomeshwa. Hii inamaanisha kuwa Ethereum itakuwa na uwezo wa kuunga mkono mamia ya rollups binafsi kwa urahisi na kufanya mamilioni ya miamala kwa sekunde kuwa halisi.

Jinsi hii inavyofanya kazi ni kwa kupanua blobs zinazounganishwa na vitaku kuanzia sita (6) katika Proto-Danksharding, hadi 64 katika Danksharding kamili. Mabadiliko mengine yote yanayohitajika ni masasisho tu ya jinsi wateja wa makubaliano wanavyofanya kazi ili kuwawezesha kushughulikia blobs kubwa mpya. Mabadiliko kadhaa kati ya haya tayari yako kwenye mpango wa utekelezaji kwa madhumuni mengine ambayo hayahusiani na Danksharding. Kwa mfano, Dankharding inahitaji utengano wa wajenzi wa mapendekezo kutekelezwa. Hii ni sasisho linalotofautisha kazi za kujenga vitalu na kupendekeza vitalu kati ya validators tofauti. Vivyo hivyo, sampuli za upatikaji wa data zinahitajika kwa Danksharding, lakini pia zinahitajika kwa maendeleo ya wateja wepesi sana ambao hawahifadhi data nyingi za kihistoria ("stateless clients").

<ExpandableCard title="Kwa nini Danksharding inahitaji utengano wa wapendekezaji na wajenzi?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Utenganisho wa wajenzi wa pendekezo unahitajika ili kuzuia wathibitishaji binafsi kutoa ahadi za gharama kubwa na uthibitisho wa Mb 32 za data ya blob. Hii ingelazimisha stakers wa nyumbani kuathirika sana na kuhitaji kuwekeza kwenye vifaa vyenye nguvu zaidi, jambo ambalo linadhuru mfumo mtawanyiko. Badala yake, wajenzi maalum wa vitalu huchukua jukumu la kazi hii ya gharama kubwa ya hesabu. Kisha, wanafanya vitalu vyao vipatikane kwa wapendekeza vitalu ili zichapishwe kwenye mtandao. Mpendekeza kitalu huchagua kitalu ambacho ni faida zaidi. Kila mtu anaweza kuthibitisha blobs kwa gharama nafuu na kwa haraka, ikimaanisha mthibitishaji yeyote wa kawaida anaweza kuangalia kwamba wajenzi wa vitalu wanatenda kwa uaminifu. Hii inaruhusu blobs kubwa kushughulikiwa bila kuhatarisha mfumo mtawanyo. Wajenzi wa vitalu wasio waaminifu wanaweza tu kuondolewa kwenye mtandao na kupata adhabu ya kupunguzwa – wengine watachukua nafasi yao kwa sababu ujenzi wa vitalu ni shughuli yenye faida.

</ExpandableCard>

<ExpandableCard title="Kwa nini Danksharding inahitaji sampuli za upatikanaji wa data?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Sampuli za upatikaji wa data zinahitajika ili wathibitishaji waweze kuthibitisha data za blob haraka na kwa ufanisi. Kwa kutumia sampuli za upatikaji wa data, validators wanaweza kuwa na uhakika mkubwa kwamba data za blob zilikuwa zinapatikana na ziliwekwa kwa usahihi. Kila validator anaweza kuchagua kwa nasibu pointi chache tu za data na kuunda uthibitisho, ikimaanisha hakuna mthibitishaji anayehitajika kukagua blob nzima. Iwapo data yoyote itakosekana, itatambuliwa haraka na blob hiyo itakataliwa.

</ExpandableCard>

### Maendeleo ya sasa {#current-progress}

Full Danksharding bado ipo mbali kwa miaka kadhaa. Wakati huo huo, sherehe ya KZG imekamilika na zaidi ya michango 140,000, na [EIP](https://eips.ethereum.org/EIPS/eip-4844) ya Proto-Danksharding imekomaa. Pendekezo hili limewekwa kikamilifu kwenye mitandao yote ya majaribio, na liliaanza kutumika kwenye Mainnet kupitia sasisho la mtandao la Cancun-Deneb ("Dencun") mnamo Machi 2024.

### Masomo zaidi {#further-reading}

- [Madokezo ya Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Madokezo ya Dankrad kuhusu Danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto na Vitalik wakijadili Danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Sherehe ya KZG](https://ceremony.ethereum.org/)
- [Hotuba ya Devcon ya Carl Beekhuizen kuhusu mipangilio inayoaminika](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Zaidi kuhusu sampuli za upatikanaji wa data kwa blobs](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist kuhusu ahadi na ithibati za KZG](https://youtu.be/8L2C6RDMV9Q)
- [Ahadi za polinomial za KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)
