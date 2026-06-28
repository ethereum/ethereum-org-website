---
title: Danksharding
description: Jifunze kuhusu Proto-Danksharding na danksharding - masasisho mawili yanayofuatana kwa ajili ya kuongeza uwezo wa Ethereum.
lang: sw
summaryPoints:
  - Danksharding ni sasisho la awamu nyingi ili kuboresha uwezo wa kuongezeka na uwezo wa Ethereum.
  - Hatua ya kwanza, Proto-Danksharding, inaongeza mablobu ya data kwenye vitalu
  - Mablobu ya data yanatoa njia nafuu kwa mikusanyiko kuchapisha data kwenye Ethereum na gharama hizo zinaweza kupitishwa kwa watumiaji kwa njia ya ada za chini za miamala.
  - Baadaye, danksharding kamili itasambaza jukumu la kuthibitisha mablobu ya data kwenye vikundi vidogo vya nodi, na kuongeza uwezo wa Ethereum zaidi hadi miamala zaidi ya 100,000 kwa sekunde.
---

**Danksharding** ni jinsi [Ethereum](/) inavyokuwa mnyororo wa vitalu wenye uwezo wa kuongezeka kweli, lakini kuna masasisho kadhaa ya itifaki yanayohitajika kufika huko. **Proto-Danksharding** ni hatua ya kati njiani. Zote zinalenga kufanya miamala kwenye tabaka la 2 (l2) kuwa nafuu iwezekanavyo kwa watumiaji na zinapaswa kuongeza uwezo wa Ethereum hadi miamala >100,000 kwa sekunde.

## Proto-Danksharding ni nini? {#what-is-protodanksharding}

Proto-Danksharding, inayojulikana pia kama [EIP-4844](https://eips.ethereum.org/EIPS/eip-4844), ni njia kwa [mikusanyiko](/layer-2/#rollups) kuongeza data nafuu kwenye vitalu. Jina linatokana na watafiti wawili waliopendekeza wazo hilo: Protolambda na Dankrad Feist. Kihistoria, mikusanyiko ilikuwa imezuiwa katika jinsi inavyoweza kufanya miamala ya watumiaji kuwa nafuu kutokana na ukweli kwamba inachapisha miamala yao katika `CALLDATA`.

Hii ni ghali kwa sababu inachakatwa na nodi zote za Ethereum na inakaa mnyororoni milele, ingawa mikusanyiko inahitaji data hiyo kwa muda mfupi tu. Proto-Danksharding inaleta mablobu ya data yanayoweza kutumwa na kuambatishwa kwenye vitalu. Data katika mablobu haya haipatikani kwa EVM na inafutwa kiotomatiki baada ya kipindi maalum cha muda (imewekwa kuwa epoki 4096 wakati wa kuandika, au takriban siku 18). Hii inamaanisha mikusanyiko inaweza kutuma data yao kwa bei nafuu zaidi na kupitisha akiba kwa watumiaji wa mwisho kwa njia ya miamala nafuu zaidi.

<ExpandableCard title="Kwa nini mablobu hufanya mikusanyiko kuwa nafuu zaidi?" eventCategory="/roadmap/danksharding" eventName="clicked why do blocks make rollups cheaper?">

Mikusanyiko ni njia ya kuongeza uwezo wa Ethereum kwa ukusanyaji wa mafungu ya miamala nje ya mnyororo na kisha kuchapisha matokeo kwenye Ethereum. Rollup kimsingi inaundwa na sehemu mbili: data na ukaguzi wa utekelezaji. Data ni mfuatano kamili wa miamala inayochakatwa na rollup ili kuzalisha mabadiliko ya hali yanayochapishwa kwenye Ethereum. Ukaguzi wa utekelezaji ni utekelezaji upya wa miamala hiyo na mhusika mwaminifu ("mthibitishaji") ili kuhakikisha kuwa mabadiliko ya hali yaliyopendekezwa ni sahihi. Ili kufanya ukaguzi wa utekelezaji, data ya muamala inapaswa kupatikana kwa muda wa kutosha kwa mtu yeyote kupakua na kukagua. Hii inamaanisha tabia yoyote isiyo ya uaminifu ya mpangaji wa rollup inaweza kutambuliwa na kupingwa na mthibitishaji. Hata hivyo, haihitaji kupatikana milele.

</ExpandableCard>

<ExpandableCard title="Kwa nini ni sawa kufuta data ya blobu?" eventCategory="/roadmap/danksharding" eventName="clicked why is it OK to delete the blob data?">

Mikusanyiko inachapisha mafungamanisho kwa data yao ya muamala mnyororoni na pia kufanya data halisi ipatikane katika mablobu ya data. Hii inamaanisha wathibitishaji wanaweza kukagua mafungamanisho ni halali au kupinga data wanayofikiri ni makosa. Katika kiwango cha nodi, mablobu ya data yanashikiliwa katika mteja wa mwafaka. Wateja wa mwafaka wanathibitisha kwamba wameona data na kwamba imesambazwa kwenye mtandao. Ikiwa data ingehifadhiwa milele, wateja hawa wangevimba na kusababisha mahitaji makubwa ya maunzi kwa ajili ya kuendesha nodi. Badala yake, data inafutwa kiotomatiki kutoka kwenye nodi kila baada ya siku 18. Uthibitisho wa mteja wa mwafaka unaonyesha kwamba kulikuwa na fursa ya kutosha kwa wathibitishaji kuthibitisha data. Data halisi inaweza kuhifadhiwa nje ya mnyororo na waendeshaji wa rollup, watumiaji au wengine.

</ExpandableCard>

### Data ya blobu inathibitishwaje? {#how-are-blobs-verified}

Mikusanyiko inachapisha miamala inayoitekeleza katika mablobu ya data. Pia inachapisha "ufungamanisho" kwa data. Inafanya hivi kwa kuweka fomula ya polinomiali kwenye data. Fomula hii inaweza kisha kutathminiwa katika pointi mbalimbali. Kwa mfano, ikiwa tunafafanua fomula rahisi sana `f(x) = 2x-1` basi tunaweza kutathmini fomula hii kwa `x = 1`, `x = 2`, `x = 3` na kutoa matokeo `1, 3, 5`. Mthibitishaji anatumia fomula hiyo hiyo kwa data na kuitathmini katika pointi hizo hizo. Ikiwa data asili inabadilishwa, fomula haitakuwa sawa, na kwa hivyo maadili yaliyotathminiwa katika kila pointi hayatakuwa sawa. Kiuhalisia, ufungamanisho na uthibitisho ni ngumu zaidi kwa sababu zimefungwa katika fomula za kifumbaji.

### KZG ni nini? {#what-is-kzg}

KZG inasimama kwa Kate-Zaverucha-Goldberg - majina ya [waandishi asili](https://link.springer.com/chapter/10.1007/978-3-642-17373-8_11) watatu wa mpango unaopunguza blobu ya data hadi kuwa ["ufungamanisho" mdogo wa kifumbaji](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html). Blobu ya data iliyowasilishwa na rollup inapaswa kuthibitishwa ili kuhakikisha rollup haifanyi vibaya. Hii inahusisha mthibitishaji kutekeleza upya miamala katika blobu ili kukagua kwamba ufungamanisho ulikuwa halali. Hii kimsingi ni sawa na jinsi wateja wa utekelezaji wanavyokagua uhalali wa miamala ya Ethereum kwenye tabaka la 1 (l1) kwa kutumia uthibitisho wa Merkle. KZG ni uthibitisho mbadala unaoweka mlinganyo wa polinomiali kwenye data. Ufungamanisho unatathmini polinomiali katika baadhi ya pointi za siri za data. Mthibitishaji angeweka polinomiali hiyo hiyo juu ya data na kuitathmini katika maadili hayo hayo, akikagua kwamba matokeo ni sawa. Hii ni njia ya kuthibitisha data inayoendana na mbinu za sifuri-maarifa zinazotumiwa na baadhi ya mikusanyiko na hatimaye sehemu nyingine za itifaki ya Ethereum.

### Sherehe ya KZG ilikuwa nini? {#what-is-a-kzg-ceremony}

Sherehe ya KZG ilikuwa njia kwa watu wengi kutoka kote katika jamii ya Ethereum kuzalisha kwa pamoja mfuatano wa siri wa nambari za nasibu zinazoweza kutumika kuthibitisha baadhi ya data. Ni muhimu sana kwamba mfuatano huu wa nambari haujulikani na hauwezi kuundwa upya na mtu yeyote. Ili kuhakikisha hili, kila mtu aliyeshiriki katika sherehe alipokea mfuatano kutoka kwa mshiriki aliyetangulia. Kisha waliunda baadhi ya maadili mapya ya nasibu (k.m., kwa kuruhusu kivinjari chao kupima mwendo wa kipanya chao) na kuichanganya na thamani iliyotangulia. Kisha walituma thamani hiyo kwa mshiriki anayefuata na kuiharibu kutoka kwenye mashine yao ya ndani. Ilimradi mtu mmoja katika sherehe alifanya hivi kwa uaminifu, thamani ya mwisho haitajulikana kwa mshambuliaji.

Sherehe ya KZG ya EIP-4844 ilikuwa wazi kwa umma na makumi ya maelfu ya watu walishiriki ili kuongeza Entropi (unasibu) yao wenyewe. Kwa jumla kulikuwa na michango zaidi ya 140,000, na kuifanya kuwa sherehe kubwa zaidi ya aina yake duniani. Ili sherehe hiyo ihujumiwe, 100% ya washiriki hao wangelazimika kuwa wasio waaminifu kikamilifu. Kutoka kwa mtazamo wa washiriki, ikiwa wanajua walikuwa waaminifu, hakuna haja ya kumwamini mtu mwingine yeyote kwa sababu wanajua kwamba walilinda sherehe (walikidhi kibinafsi hitaji la mshiriki mwaminifu 1-kati-ya-N).

<ExpandableCard title="Nambari nasibu kutoka kwenye sherehe ya KZG hutumika kwa nini?" eventCategory="/roadmap/danksharding" eventName="clicked why is the random number from the KZG ceremony used for?">

Wakati rollup inachapisha data katika blobu, inatoa "ufungamanisho" ambao inauchapisha mnyororoni. Ufungamanisho huu ni matokeo ya kutathmini polinomiali iliyowekwa kwenye data katika pointi fulani. Pointi hizi zinafafanuliwa na nambari za nasibu zilizozalishwa katika sherehe ya KZG. Wathibitishaji wanaweza kisha kutathmini polinomiali katika pointi hizo hizo ili kuthibitisha data - ikiwa watafikia maadili sawa basi data ni sahihi.

</ExpandableCard>

<ExpandableCard title="Kwa nini data nasibu ya KZG inapaswa kubaki siri?" eventCategory="/roadmap/danksharding" eventName="clicked why does the KZG random data have to stay secret?">

Ikiwa mtu anajua maeneo ya nasibu yaliyotumika kwa ufungamanisho, ni rahisi kwao kuzalisha polinomiali mpya inayofaa katika pointi hizo maalum (yaani, "mgongano"). Hii inamaanisha wangeweza kuongeza au kuondoa data kutoka kwenye blobu na bado kutoa uthibitisho halali. Ili kuzuia hili, badala ya kuwapa wathibitishaji maeneo halisi ya siri, kwa kweli wanapokea maeneo yaliyofungwa katika "sanduku jeusi" la kifumbaji kwa kutumia mikunjo ya duaradufu. Hizi huchanganya maadili kwa njia ambayo maadili asili hayawezi kubadilishwa, lakini kwa aljebra fulani wajanja wathibitishaji na wakaguzi bado wanaweza kutathmini polinomiali katika pointi wanazowakilisha.

</ExpandableCard>

<Alert variant="warning">
  Wala danksharding wala Proto-Danksharding haifuati mtindo wa jadi wa "sharding" unaolenga kugawanya mnyororo wa vitalu katika sehemu nyingi. Minyororo ya shadi sio tena sehemu ya ramani ya njia. Badala yake, danksharding inatumia uchukuaji sampuli wa data uliosambazwa kwenye mablobu ili kuongeza uwezo wa Ethereum. Hii ni rahisi sana kutekeleza. Mtindo huu wakati mwingine umejulikana kama "data-sharding".
</Alert>

## Danksharding ni nini? {#what-is-danksharding}

Danksharding ni utimilifu kamili wa uongezaji uwezo wa rollup ulioanza na Proto-Danksharding. Danksharding italeta kiasi kikubwa kwenye Ethereum kwa mikusanyiko kutupa data yao ya muamala iliyobanwa. Hii inamaanisha Ethereum itaweza kusaidia mamia ya mikusanyiko binafsi kwa urahisi na kufanya mamilioni ya miamala kwa sekunde kuwa kweli.

Jinsi hii inavyofanya kazi ni kwa kupanua mablobu yaliyoambatishwa kwenye vitalu kutoka sita (6) katika Proto-Danksharding, hadi 64 katika danksharding kamili. Mabadiliko mengine yanayohitajika yote ni masasisho kwa jinsi wateja wa mwafaka wanavyofanya kazi ili kuwawezesha kushughulikia mablobu mapya makubwa. Kadhaa ya mabadiliko haya tayari yapo kwenye ramani ya njia kwa madhumuni mengine huru na danksharding. Kwa mfano, danksharding inahitaji utengano wa mpendekezaji na mjengaji (PBS) uwe umetekelezwa. Hili ni sasisho linalotenganisha kazi za kujenga vitalu na kupendekeza vitalu kwa wathibitishaji tofauti. Vile vile, uchukuaji sampuli wa upatikanaji wa data unahitajika kwa danksharding, lakini pia unahitajika kwa maendeleo ya wateja wepesi sana ambao hawahifadhi data nyingi za kihistoria ("wateja wasio na hali").

<ExpandableCard title="Kwa nini danksharding inahitaji utengano wa mpendekezaji na mjengaji?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require proposer-builder separation?">

Utengano wa mpendekezaji na mjengaji (PBS) unahitajika ili kuzuia wathibitishaji binafsi kulazimika kuzalisha mafungamanisho na uthibitisho wa gharama kubwa kwa 32MB ya data ya blobu. Hii ingeweka mzigo mkubwa kwa waweka hisa wa nyumbani na kuwahitaji kuwekeza katika maunzi yenye nguvu zaidi, ambayo inaumiza ugatuzi. Badala yake, wajengaji maalum wa vitalu wanachukua jukumu la kazi hii ya gharama kubwa ya ukokotoaji. Kisha, wanafanya vitalu vyao vipatikane kwa wapendekezaji wa bloku ili kutangaza. Mpendekezaji wa bloku anachagua tu kitalu chenye faida zaidi. Mtu yeyote anaweza kuthibitisha mablobu kwa bei nafuu na haraka, ikimaanisha mthibitishaji yeyote wa kawaida anaweza kukagua kwamba wajengaji wa vitalu wanafanya kwa uaminifu. Hii inaruhusu mablobu makubwa kuchakatwa bila kutoa dhabihu ugatuzi. Wajengaji wa vitalu wanaofanya vibaya wangeweza tu kutolewa kwenye mtandao na kukatwa - wengine wataingia mahali pao kwa sababu ujenzi wa vitalu ni shughuli yenye faida.

</ExpandableCard>

<ExpandableCard title="Kwa nini danksharding inahitaji usampulishaji wa upatikanaji wa data?" eventCategory="/roadmap/danksharding" eventName="clicked why does danksharding require data availability sampling?">

Uchukuaji sampuli wa upatikanaji wa data unahitajika kwa wathibitishaji kuthibitisha data ya blobu haraka na kwa ufanisi. Kwa kutumia uchukuaji sampuli wa upatikanaji wa data, wathibitishaji wanaweza kuwa na uhakika sana kwamba data ya blobu ilipatikana na kufungamanishwa kwa usahihi. Kila mthibitishaji anaweza kuchukua sampuli ya nasibu ya pointi chache tu za data na kuunda uthibitisho, ikimaanisha hakuna mthibitishaji anayelazimika kukagua blobu nzima. Ikiwa data yoyote inakosekana, itatambuliwa haraka na blobu kukataliwa.

</ExpandableCard>

### Maendeleo ya sasa {#current-progress}

Danksharding kamili iko miaka kadhaa mbele. Wakati huo huo, sherehe ya KZG imehitimishwa na michango zaidi ya 140,000, na [EIP](https://eips.ethereum.org/EIPS/eip-4844) ya Proto-Danksharding imekomaa. Pendekezo hili limetekelezwa kikamilifu katika mitandao yote ya majaribio, na lilianza kutumika kwenye Mtandao Mkuu na sasisho la mtandao la Cancun-Deneb ("Dencun") mnamo Machi 2024.

### Kusoma zaidi {#further-reading}

- [Vidokezo vya Proto-Danksharding](https://notes.ethereum.org/@vbuterin/proto_danksharding_faq) - _Vitalik Buterin_
- [Vidokezo vya Dankrad kuhusu danksharding](https://notes.ethereum.org/@dankrad/new_sharding)
- [Dankrad, Proto na Vitalik wanajadili danksharding](https://www.youtube.com/watch?v=N5p0TB77flM)
- [Sherehe ya KZG](https://ceremony.ethereum.org/)
- [Mazungumzo ya Carl Beekhuizen ya Devcon kuhusu mipangilio inayoaminika](https://archive.devcon.org/archive/watch/6/the-kzg-ceremony-or-how-i-learnt-to-stop-worrying-and-love-trusted-setups/?tab=YouTube)
- [Zaidi kuhusu uchukuaji sampuli wa upatikanaji wa data kwa mablobu](https://hackmd.io/@vbuterin/sharding_proposal#ELI5-data-availability-sampling)
- [Dankrad Feist kuhusu mafungamanisho na uthibitisho wa KZG](https://youtu.be/8L2C6RDMV9Q)
- [Mafungamanisho ya polinomiali ya KZG](https://dankradfeist.de/ethereum/2020/06/16/kate-polynomial-commitments.html)